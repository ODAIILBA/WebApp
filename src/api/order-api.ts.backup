/**
 * Order API
 * RESTful API endpoints for order management
 */

import { Hono } from 'hono'
import { OrderService } from '../services/order-service'
import { ShoppingCartService } from '../services/shopping-cart-service'
import { LicenseService } from '../services/license-service'
import { AuditLogService } from '../services/audit-log-service'

const orderAPI = new Hono()

/**
 * POST /api/orders
 * Create order from cart (checkout)
 */
orderAPI.post('/', async (c) => {
  try {
    const { env } = c
    const user = c.get('user') // Optional - can be guest checkout
    
    const { 
      cart_id,
      email, first_name, last_name, phone,
      billing_address, billing_city, billing_postal_code, billing_country,
      shipping_address, shipping_city, shipping_postal_code, shipping_country,
      payment_method, payment_id,
      customer_notes
    } = await c.req.json()

    // Validate required fields
    console.log('[Order API] Received data:', { cart_id, email, first_name, last_name, billing_address, billing_city, billing_postal_code, payment_method })
    
    if (!cart_id) {
      return c.json({ success: false, error: 'Cart ID is required' }, 400)
    }
    
    if (!email || !first_name || !last_name) {
      return c.json({ success: false, error: 'Email, first name, and last name are required' }, 400)
    }

    if (!billing_address) {
      return c.json({ success: false, error: 'Billing address is required' }, 400)
    }
    
    if (!billing_city) {
      return c.json({ success: false, error: 'Billing city is required' }, 400)
    }
    
    if (!billing_postal_code) {
      return c.json({ success: false, error: 'Billing postal code is required' }, 400)
    }

    if (!payment_method) {
      return c.json({ success: false, error: 'Payment method is required' }, 400)
    }

    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)
    const licenseService = new LicenseService(env.DB, auditLog)
    const orderService = new OrderService(env.DB, cartService, licenseService, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'

    const result = await orderService.createOrder(
      cart_id,
      {
        email, first_name, last_name, phone,
        billing_address, billing_city, billing_postal_code, billing_country,
        shipping_address, shipping_city, shipping_postal_code, shipping_country,
        payment_method, payment_id,
        customer_notes
      },
      user?.id,
      ipAddress
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Order created successfully',
      order: result.order
    }, 201)
  } catch (error: any) {
    console.error('[Order API] Create endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/orders/:orderId/payment
 * Process payment for order
 */
orderAPI.post('/:orderId/payment', async (c) => {
  try {
    const { env } = c
    const user = c.get('user')
    const orderId = parseInt(c.req.param('orderId'))
    
    const { transaction_id, amount, currency, gateway_response } = await c.req.json()

    if (!transaction_id || !amount) {
      return c.json({ success: false, error: 'Transaction ID and amount are required' }, 400)
    }

    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)
    const licenseService = new LicenseService(env.DB, auditLog)
    const orderService = new OrderService(env.DB, cartService, licenseService, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'

    const result = await orderService.processPayment(
      orderId,
      { transaction_id, amount, currency, gateway_response },
      user?.id,
      ipAddress
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Payment processed successfully',
      order: result.order,
      licenses: result.licenses
    })
  } catch (error: any) {
    console.error('[Order API] Payment endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * GET /api/orders/:orderId
 * Get order details
 */
orderAPI.get('/:orderId', async (c) => {
  try {
    const { env } = c
    const user = c.get('user')
    const orderId = parseInt(c.req.param('orderId'))

    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)
    const licenseService = new LicenseService(env.DB, auditLog)
    const orderService = new OrderService(env.DB, cartService, licenseService, auditLog)

    const order = await orderService.getOrderById(orderId)

    if (!order) {
      return c.json({ success: false, error: 'Order not found' }, 404)
    }

    // Check authorization - user can only see their own orders unless admin
    if (user && order.user_id !== user.id && user.role !== 'admin') {
      return c.json({ success: false, error: 'Unauthorized' }, 403)
    }

    return c.json({
      success: true,
      order
    })
  } catch (error: any) {
    console.error('[Order API] Get endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * GET /api/orders/number/:orderNumber
 * Get order by order number
 */
orderAPI.get('/number/:orderNumber', async (c) => {
  try {
    const { env } = c
    const user = c.get('user')
    const orderNumber = c.req.param('orderNumber')

    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)
    const licenseService = new LicenseService(env.DB, auditLog)
    const orderService = new OrderService(env.DB, cartService, licenseService, auditLog)

    const order = await orderService.getOrderByNumber(orderNumber)

    if (!order) {
      return c.json({ success: false, error: 'Order not found' }, 404)
    }

    // Check authorization
    if (user && order.user_id !== user.id && user.role !== 'admin') {
      return c.json({ success: false, error: 'Unauthorized' }, 403)
    }

    return c.json({
      success: true,
      order
    })
  } catch (error: any) {
    console.error('[Order API] Get by number endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * GET /api/orders
 * Get user's orders (requires authentication)
 */
orderAPI.get('/', async (c) => {
  try {
    const { env } = c
    const user = c.get('user')

    if (!user) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = (page - 1) * limit

    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)
    const licenseService = new LicenseService(env.DB, auditLog)
    const orderService = new OrderService(env.DB, cartService, licenseService, auditLog)

    const result = await orderService.getUserOrders(user.id, limit, offset)

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 500)
    }

    return c.json({
      success: true,
      orders: result.orders,
      total: result.total,
      page,
      limit,
      pages: Math.ceil((result.total || 0) / limit)
    })
  } catch (error: any) {
    console.error('[Order API] List endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * PUT /api/orders/:orderId/status
 * Update order status (Admin only)
 */
orderAPI.put('/:orderId/status', async (c) => {
  try {
    const { env } = c
    const admin = c.get('user')
    const orderId = parseInt(c.req.param('orderId'))
    
    if (!admin || admin.role !== 'admin') {
      return c.json({ success: false, error: 'Admin access required' }, 403)
    }

    const { status, notes } = await c.req.json()

    if (!status) {
      return c.json({ success: false, error: 'Status is required' }, 400)
    }

    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)
    const licenseService = new LicenseService(env.DB, auditLog)
    const orderService = new OrderService(env.DB, cartService, licenseService, auditLog)

    const result = await orderService.updateOrderStatus(orderId, status, admin.id, notes)

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Order status updated',
      order: result.order
    })
  } catch (error: any) {
    console.error('[Order API] Update status endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * DELETE /api/orders/:orderId
 * Cancel order
 */
orderAPI.delete('/:orderId', async (c) => {
  try {
    const { env } = c
    const user = c.get('user')
    const orderId = parseInt(c.req.param('orderId'))
    
    const { reason } = await c.req.json().catch(() => ({ reason: 'Cancelled by user' }))

    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)
    const licenseService = new LicenseService(env.DB, auditLog)
    const orderService = new OrderService(env.DB, cartService, licenseService, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'

    const result = await orderService.cancelOrder(orderId, reason, user?.id, ipAddress)

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Order cancelled successfully',
      order: result.order
    })
  } catch (error: any) {
    console.error('[Order API] Cancel endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default orderAPI
