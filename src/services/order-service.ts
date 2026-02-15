/**
 * Order Processing Service
 * Handles complete order lifecycle: creation, validation, payment, license assignment
 */

import { ShoppingCartService, Cart } from './shopping-cart-service'
import { LicenseService } from './license-service'
import { AuditLogService } from './audit-log-service'

export interface OrderData {
  // Customer info
  email: string
  first_name: string
  last_name: string
  phone?: string
  
  // Billing address
  billing_address: string
  billing_city: string
  billing_postal_code: string
  billing_country?: string
  
  // Shipping address (optional, defaults to billing)
  shipping_address?: string
  shipping_city?: string
  shipping_postal_code?: string
  shipping_country?: string
  
  // Payment
  payment_method: 'stripe' | 'paypal' | 'bank_transfer' | 'credit_card'
  payment_id?: string
  
  // Notes
  customer_notes?: string
}

export interface Order {
  id: number
  order_number: string
  user_id?: number
  cart_id?: number
  
  // Customer info
  email: string
  first_name: string
  last_name: string
  phone?: string
  
  // Addresses
  billing_address: string
  billing_city: string
  billing_postal_code: string
  billing_country: string
  
  shipping_address?: string
  shipping_city?: string
  shipping_postal_code?: string
  shipping_country?: string
  
  // Totals
  subtotal: number
  discount_amount: number
  shipping_cost: number
  tax_amount: number
  total: number
  
  // Status
  order_status: string
  payment_status: string
  
  // Payment
  payment_method: string
  payment_id?: string
  payment_details?: string
  
  // Timestamps
  created_at: string
  updated_at: string
  paid_at?: string
  
  // Notes
  customer_notes?: string
  admin_notes?: string
  
  // Items
  items?: OrderItem[]
}

export interface OrderItem {
  id: number
  order_id: number
  product_id?: number
  product_sku: string
  product_name: string
  product_image_url?: string
  quantity: number
  unit_price: number
  discount_price?: number
  subtotal: number
  license_key?: string
  license_assigned_at?: string
}

export class OrderService {
  constructor(
    private db: D1Database,
    private cartService: ShoppingCartService,
    private licenseService: LicenseService,
    private auditLog: AuditLogService
  ) {}

  /**
   * Create order from cart
   */
  async createOrder(
    cartId: number,
    orderData: OrderData,
    userId?: number,
    ipAddress?: string
  ): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {

      // 1. Get cart and validate
      const cart = await this.cartService.getCartById(cartId)
      if (!cart) {
        return { success: false, error: 'Cart not found' }
      }

      if (cart.items.length === 0) {
        return { success: false, error: 'Cart is empty' }
      }

      // 2. Validate stock availability for all items
      for (const item of cart.items) {
        const product = await this.db.prepare(`
          SELECT id, stock FROM products WHERE id = ?
        `).bind(item.product_id).first() as any

        if (!product || product.stock < item.quantity) {
          return { 
            success: false, 
            error: `Insufficient stock for ${item.product_name}. Available: ${product?.stock || 0}` 
          }
        }
      }

      // 3. Calculate totals
      const subtotal = cart.subtotal
      const shipping_cost = this.calculateShipping(cart, orderData)
      const tax_amount = this.calculateTax(subtotal, orderData)
      const discount_amount = 0 // TODO: Apply discount codes
      const total = subtotal + shipping_cost + tax_amount - discount_amount

      // 4. Generate order number
      const orderNumber = await this.generateOrderNumber()

      // 5. Create order
      const orderResult = await this.db.prepare(`
        INSERT INTO orders (
          order_number, user_id, cart_id,
          email, first_name, last_name, phone,
          billing_address, billing_city, billing_postal_code, billing_country,
          shipping_address, shipping_city, shipping_postal_code, shipping_country,
          subtotal, discount_amount, shipping_cost, tax_amount, total,
          order_status, payment_status,
          payment_method, payment_id,
          customer_notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        orderNumber,
        userId || null,
        cartId,
        orderData.email,
        orderData.first_name,
        orderData.last_name,
        orderData.phone || null,
        orderData.billing_address,
        orderData.billing_city,
        orderData.billing_postal_code,
        orderData.billing_country || 'DE',
        orderData.shipping_address || orderData.billing_address,
        orderData.shipping_city || orderData.billing_city,
        orderData.shipping_postal_code || orderData.billing_postal_code,
        orderData.shipping_country || orderData.billing_country || 'DE',
        subtotal,
        discount_amount,
        shipping_cost,
        tax_amount,
        total,
        'pending',
        'pending',
        orderData.payment_method,
        orderData.payment_id || null,
        orderData.customer_notes || null
      ).run()

      const orderId = orderResult.meta.last_row_id

      // 6. Create order items from cart items
      for (const item of cart.items) {
        await this.db.prepare(`
          INSERT INTO order_items (
            order_id, product_id, product_sku, product_name, product_image_url,
            quantity, unit_price, discount_price, subtotal
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          orderId,
          item.product_id,
          item.product_sku,
          item.product_name,
          item.product_image_url || null,
          item.quantity,
          item.price,
          item.discount_price || null,
          item.subtotal
        ).run()
      }

      // 7. Update stock quantities
      for (const item of cart.items) {
        await this.db.prepare(`
          UPDATE products 
          SET stock = stock - ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(item.quantity, item.product_id).run()
      }

      // 8. Mark cart as converted
      await this.cartService.convertCart(cartId)

      // 9. Log order creation
      await this.logOrderStatusChange(orderId, null, 'pending', userId, ipAddress, 'Order created')

      // 10. Audit log
      await this.auditLog.log({
        userId: userId?.toString() || 'guest',
        action: 'order_created',
        module: 'orders',
        details: { order_id: orderId, order_number: orderNumber, total, items: cart.items.length },
        ipAddress: ipAddress || 'unknown'
      })

      // 11. Get created order
      const order = await this.getOrderById(orderId)

      return { success: true, order: order! }
    } catch (error: any) {
      console.error('[OrderService] Create order error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Process payment and assign licenses
   */
  async processPayment(
    orderId: number,
    paymentData: {
      transaction_id: string
      amount: number
      currency?: string
      gateway_response?: any
    },
    userId?: number,
    ipAddress?: string
  ): Promise<{ success: boolean; order?: Order; licenses?: any[]; error?: string }> {
    try {

      // 1. Get order
      const order = await this.getOrderById(orderId)
      if (!order) {
        return { success: false, error: 'Order not found' }
      }

      if (order.payment_status === 'completed') {
        return { success: false, error: 'Payment already processed' }
      }

      // 2. Validate payment amount
      if (Math.abs(paymentData.amount - order.total) > 0.01) {
        return { success: false, error: 'Payment amount mismatch' }
      }

      // 3. Record payment transaction
      await this.db.prepare(`
        INSERT INTO payment_transactions (
          order_id, transaction_id, payment_method, amount, currency,
          status, gateway_response, completed_at
        ) VALUES (?, ?, ?, ?, ?, 'completed', ?, CURRENT_TIMESTAMP)
      `).bind(
        orderId,
        paymentData.transaction_id,
        order.payment_method,
        paymentData.amount,
        paymentData.currency || 'EUR',
        JSON.stringify(paymentData.gateway_response || {})
      ).run()

      // 4. Update order status
      await this.db.prepare(`
        UPDATE orders 
        SET payment_status = 'completed',
            order_status = 'paid',
            paid_at = CURRENT_TIMESTAMP,
            payment_id = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(paymentData.transaction_id, orderId).run()

      // 5. Assign licenses to order items
      const assignedLicenses: any[] = []
      
      if (order.items) {
        for (const item of order.items) {
          // Assign licenses for this order item
          const licenseResult = await this.licenseService.assignLicenseToOrder(
            orderId,
            item.id,
            item.product_id!,
            item.quantity,
            userId,
            ipAddress
          )

          if (licenseResult.success && licenseResult.licenses) {
            assignedLicenses.push(...licenseResult.licenses)
          }
        }
      }

      // 6. Log status change
      await this.logOrderStatusChange(
        orderId, 
        'pending', 
        'paid', 
        userId, 
        ipAddress, 
        `Payment completed: ${paymentData.transaction_id}`
      )

      // 7. Audit log
      await this.auditLog.log({
        userId: userId?.toString() || 'system',
        action: 'payment_completed',
        module: 'orders',
        details: { 
          order_id: orderId, 
          transaction_id: paymentData.transaction_id, 
          amount: paymentData.amount,
          licenses_assigned: assignedLicenses.length
        },
        ipAddress: ipAddress || 'unknown'
      })

      // 8. Get updated order
      const updatedOrder = await this.getOrderById(orderId)

      return { 
        success: true, 
        order: updatedOrder!, 
        licenses: assignedLicenses 
      }
    } catch (error: any) {
      console.error('[OrderService] Process payment error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(
    orderId: number,
    newStatus: string,
    adminId?: number,
    notes?: string
  ): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {
      const order = await this.getOrderById(orderId)
      if (!order) {
        return { success: false, error: 'Order not found' }
      }

      const oldStatus = order.order_status

      // Update status
      await this.db.prepare(`
        UPDATE orders 
        SET order_status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(newStatus, orderId).run()

      // Log status change
      await this.logOrderStatusChange(orderId, oldStatus, newStatus, adminId, 'admin', notes)

      const updatedOrder = await this.getOrderById(orderId)
      return { success: true, order: updatedOrder! }
    } catch (error: any) {
      console.error('[OrderService] Update status error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Cancel order
   */
  async cancelOrder(
    orderId: number,
    reason?: string,
    userId?: number,
    ipAddress?: string
  ): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {
      const order = await this.getOrderById(orderId)
      if (!order) {
        return { success: false, error: 'Order not found' }
      }

      if (['cancelled', 'refunded', 'shipped', 'delivered'].includes(order.order_status)) {
        return { success: false, error: `Cannot cancel order with status: ${order.order_status}` }
      }

      // Restore stock
      if (order.items) {
        for (const item of order.items) {
          if (item.product_id) {
            await this.db.prepare(`
              UPDATE products 
              SET stock = stock + ?, updated_at = CURRENT_TIMESTAMP
              WHERE id = ?
            `).bind(item.quantity, item.product_id).run()
          }
        }
      }

      // Update order
      await this.db.prepare(`
        UPDATE orders 
        SET order_status = 'cancelled',
            payment_status = 'cancelled',
            updated_at = CURRENT_TIMESTAMP,
            admin_notes = ?
        WHERE id = ?
      `).bind(reason || 'Order cancelled', orderId).run()

      // Log cancellation
      await this.logOrderStatusChange(
        orderId, 
        order.order_status, 
        'cancelled', 
        userId, 
        ipAddress, 
        reason || 'Order cancelled'
      )

      const updatedOrder = await this.getOrderById(orderId)
      return { success: true, order: updatedOrder! }
    } catch (error: any) {
      console.error('[OrderService] Cancel order error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId: number): Promise<Order | null> {
    try {
      const order = await this.db.prepare(`
        SELECT * FROM orders WHERE id = ?
      `).bind(orderId).first() as Order | null

      if (!order) return null

      // Get order items
      const items = await this.db.prepare(`
        SELECT * FROM order_items WHERE order_id = ?
      `).bind(orderId).all()

      order.items = items.results as OrderItem[]

      return order
    } catch (error) {
      console.error('[OrderService] Get order error:', error)
      return null
    }
  }

  /**
   * Get order by order number
   */
  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    try {
      const order = await this.db.prepare(`
        SELECT * FROM orders WHERE order_number = ?
      `).bind(orderNumber).first() as Order | null

      if (!order) return null

      // Get order items
      const items = await this.db.prepare(`
        SELECT * FROM order_items WHERE order_id = ?
      `).bind(order.id).all()

      order.items = items.results as OrderItem[]

      return order
    } catch (error) {
      console.error('[OrderService] Get order by number error:', error)
      return null
    }
  }

  /**
   * Get user orders
   */
  async getUserOrders(
    userId: number,
    limit: number = 20,
    offset: number = 0
  ): Promise<{ success: boolean; orders?: Order[]; total?: number; error?: string }> {
    try {
      const orders = await this.db.prepare(`
        SELECT * FROM orders 
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `).bind(userId, limit, offset).all()

      const countResult = await this.db.prepare(`
        SELECT COUNT(*) as count FROM orders WHERE user_id = ?
      `).bind(userId).first() as any

      return { 
        success: true, 
        orders: orders.results as Order[], 
        total: countResult.count 
      }
    } catch (error: any) {
      console.error('[OrderService] Get user orders error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Generate unique order number
   */
  private async generateOrderNumber(): Promise<string> {
    const prefix = 'ORD'
    const timestamp = Date.now().toString().slice(-8)
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${prefix}-${timestamp}-${random}`
  }

  /**
   * Calculate shipping cost
   */
  private calculateShipping(cart: Cart, orderData: OrderData): number {
    // Simple shipping calculation
    // TODO: Implement real shipping rates based on location and weight
    if (cart.total > 100) return 0 // Free shipping over 100
    return 5.99
  }

  /**
   * Calculate tax amount
   */
  private calculateTax(subtotal: number, orderData: OrderData): number {
    // Simple tax calculation
    const taxRates: Record<string, number> = {
      'DE': 0.19, // Germany VAT
      'AT': 0.20, // Austria VAT
      'CH': 0.077, // Switzerland VAT
      'US': 0.00  // US tax varies by state
    }
    
    const country = orderData.billing_country || 'DE'
    const taxRate = taxRates[country] || 0.19
    
    return Number((subtotal * taxRate).toFixed(2))
  }

  /**
   * Log order status change
   */
  private async logOrderStatusChange(
    orderId: number,
    oldStatus: string | null,
    newStatus: string,
    userId?: number,
    ipAddress?: string,
    notes?: string
  ): Promise<void> {
    try {
      await this.db.prepare(`
        INSERT INTO order_status_history (
          order_id, from_status, to_status, changed_by, notes
        ) VALUES (?, ?, ?, ?, ?)
      `).bind(
        orderId,
        oldStatus || null,
        newStatus,
        userId || null,
        notes || null
      ).run()
    } catch (error) {
      console.error('[OrderService] Log status change error:', error)
    }
  }
}
