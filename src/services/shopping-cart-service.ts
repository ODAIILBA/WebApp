/**
 * Shopping Cart Service
 * Handles all shopping cart operations including add, remove, update, and checkout
 */

import { AuditLogService } from './audit-log-service'

export interface CartItem {
  id: number
  cart_id: number
  product_id: number
  product_sku: string
  product_name: string
  product_image_url?: string
  quantity: number
  price: number
  discount_price?: number
  subtotal: number
  created_at: string
  updated_at: string
}

export interface Cart {
  id: number
  user_id?: number
  session_id?: string
  status: 'active' | 'abandoned' | 'converted'
  items: CartItem[]
  subtotal: number
  total: number
  item_count: number
  created_at: string
  updated_at: string
}

export interface AddToCartData {
  product_id: number
  quantity: number
}

export interface UpdateCartItemData {
  quantity: number
}

export class ShoppingCartService {
  constructor(
    private db: D1Database,
    private auditLog: AuditLogService
  ) {}

  /**
   * Get or create cart for user/session
   */
  async getOrCreateCart(userId?: number, sessionId?: string): Promise<{ success: boolean; cart?: Cart; error?: string }> {
    try {
      console.log('[CartService] getOrCreateCart - userId:', userId, 'sessionId:', sessionId)
      
      if (!userId && !sessionId) {
        return { success: false, error: 'User ID or Session ID is required' }
      }

      // Try to find existing active cart
      let cart: any
      
      if (userId) {
        console.log('[CartService] Looking for cart by userId:', userId)
        cart = await this.db.prepare(`
          SELECT * FROM shopping_carts 
          WHERE user_id = ? AND status = 'active'
          ORDER BY created_at DESC
          LIMIT 1
        `).bind(userId).first()
      } else if (sessionId) {
        console.log('[CartService] Looking for cart by sessionId:', sessionId)
        cart = await this.db.prepare(`
          SELECT * FROM shopping_carts 
          WHERE session_id = ? AND status = 'active'
          ORDER BY created_at DESC
          LIMIT 1
        `).bind(sessionId).first()
      }

      // Create new cart if none exists
      if (!cart) {
        console.log('[CartService] Creating new cart')
        const result = await this.db.prepare(`
          INSERT INTO shopping_carts (user_id, session_id, status)
          VALUES (?, ?, 'active')
        `).bind(userId || null, sessionId || null).run()

        console.log('[CartService] Cart created with ID:', result.meta.last_row_id)

        cart = await this.db.prepare(`
          SELECT * FROM shopping_carts WHERE id = ?
        `).bind(result.meta.last_row_id).first()
      }

      if (!cart) {
        console.error('[CartService] Failed to retrieve cart after creation')
        return { success: false, error: 'Failed to create cart' }
      }

      console.log('[CartService] Cart found/created:', cart.id)

      // Get cart items
      const items = await this.getCartItems(cart.id)
      console.log('[CartService] Cart items:', items.length)
      
      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + parseFloat(item.subtotal.toString()), 0)
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

      console.log('[CartService] Cart totals - subtotal:', subtotal, 'itemCount:', itemCount)

      return {
        success: true,
        cart: {
          ...cart,
          items,
          subtotal,
          total: subtotal,
          item_count: itemCount
        }
      }
    } catch (error: any) {
      console.error('[CartService] Get or create cart error:', error)
      return { success: false, error: error.message || 'Failed to fetch cart' }
    }
  }

  /**
   * Get cart items with product details
   */
  private async getCartItems(cartId: number): Promise<CartItem[]> {
    const items = await this.db.prepare(`
      SELECT 
        ci.id,
        ci.cart_id,
        ci.product_id,
        ci.quantity,
        ci.price,
        ci.discount_price,
        ci.subtotal,
        ci.created_at,
        ci.updated_at,
        p.sku as product_sku,
        p.name as product_name,
        p.image_url as product_image_url
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
      ORDER BY ci.created_at DESC
    `).bind(cartId).all()

    return items.results as CartItem[]
  }

  /**
   * Add item to cart
   */
  async addToCart(
    cartId: number,
    data: AddToCartData,
    userId?: number,
    ipAddress?: string
  ): Promise<{ success: boolean; cart?: Cart; error?: string }> {
    try {
      // Validate quantity
      if (data.quantity < 1) {
        return { success: false, error: 'Quantity must be at least 1' }
      }

      // Get product details
      const product = await this.db.prepare(`
        SELECT id, sku, name, image_url, base_price, discount_price, stock, is_active
        FROM products
        WHERE id = ?
      `).bind(data.product_id).first() as any

      if (!product) {
        return { success: false, error: 'Product not found' }
      }

      if (!product.is_active) {
        return { success: false, error: 'Product is not available' }
      }

      // Check stock
      if (product.stock < data.quantity) {
        return { success: false, error: `Only ${product.stock} items available in stock` }
      }

      // Calculate prices
      const price = product.discount_price || product.base_price
      const subtotal = price * data.quantity

      // Check if item already exists in cart
      const existingItem = await this.db.prepare(`
        SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?
      `).bind(cartId, data.product_id).first() as any

      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + data.quantity
        
        // Check stock for new quantity
        if (product.stock < newQuantity) {
          return { success: false, error: `Only ${product.stock} items available in stock` }
        }

        const newSubtotal = price * newQuantity
        
        await this.db.prepare(`
          UPDATE cart_items 
          SET quantity = ?, subtotal = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(newQuantity, newSubtotal, existingItem.id).run()
      } else {
        // Add new item
        await this.db.prepare(`
          INSERT INTO cart_items (
            cart_id, product_id, quantity, price, discount_price, subtotal
          ) VALUES (?, ?, ?, ?, ?, ?)
        `).bind(
          cartId,
          data.product_id,
          data.quantity,
          product.base_price,
          product.discount_price || null,
          subtotal
        ).run()
      }

      // Update cart timestamp
      await this.db.prepare(`
        UPDATE shopping_carts SET updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).bind(cartId).run()

      // Log action
      if (userId) {
        await this.auditLog.log({
          userId: userId.toString(),
          action: 'cart_add_item',
          module: 'ecommerce',
          details: { cart_id: cartId, product_id: data.product_id, quantity: data.quantity },
          ipAddress: ipAddress || 'unknown'
        })
      }

      // Return updated cart
      const cart = await this.getCartById(cartId)
      return { success: true, cart }
    } catch (error: any) {
      console.error('Add to cart error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(
    cartId: number,
    itemId: number,
    data: UpdateCartItemData,
    userId?: number,
    ipAddress?: string
  ): Promise<{ success: boolean; cart?: Cart; error?: string }> {
    try {
      // Validate quantity
      if (data.quantity < 1) {
        return { success: false, error: 'Quantity must be at least 1' }
      }

      // Get cart item
      const item = await this.db.prepare(`
        SELECT ci.*, p.stock
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.id = ? AND ci.cart_id = ?
      `).bind(itemId, cartId).first() as any

      if (!item) {
        return { success: false, error: 'Cart item not found' }
      }

      // Check stock
      if (item.stock < data.quantity) {
        return { success: false, error: `Only ${item.stock} items available in stock` }
      }

      // Calculate new subtotal
      const price = item.discount_price || item.price
      const newSubtotal = price * data.quantity

      // Update item
      await this.db.prepare(`
        UPDATE cart_items 
        SET quantity = ?, subtotal = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(data.quantity, newSubtotal, itemId).run()

      // Update cart timestamp
      await this.db.prepare(`
        UPDATE shopping_carts SET updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).bind(cartId).run()

      // Log action
      if (userId) {
        await this.auditLog.log({
          userId: userId.toString(),
          action: 'cart_update_item',
          module: 'ecommerce',
          details: { cart_id: cartId, item_id: itemId, quantity: data.quantity },
          ipAddress: ipAddress || 'unknown'
        })
      }

      // Return updated cart
      const cart = await this.getCartById(cartId)
      return { success: true, cart }
    } catch (error: any) {
      console.error('Update cart item error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(
    cartId: number,
    itemId: number,
    userId?: number,
    ipAddress?: string
  ): Promise<{ success: boolean; cart?: Cart; error?: string }> {
    try {
      // Verify item belongs to cart
      const item = await this.db.prepare(`
        SELECT * FROM cart_items WHERE id = ? AND cart_id = ?
      `).bind(itemId, cartId).first()

      if (!item) {
        return { success: false, error: 'Cart item not found' }
      }

      // Delete item
      await this.db.prepare(`
        DELETE FROM cart_items WHERE id = ?
      `).bind(itemId).run()

      // Update cart timestamp
      await this.db.prepare(`
        UPDATE shopping_carts SET updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).bind(cartId).run()

      // Log action
      if (userId) {
        await this.auditLog.log({
          userId: userId.toString(),
          action: 'cart_remove_item',
          module: 'ecommerce',
          details: { cart_id: cartId, item_id: itemId },
          ipAddress: ipAddress || 'unknown'
        })
      }

      // Return updated cart
      const cart = await this.getCartById(cartId)
      return { success: true, cart }
    } catch (error: any) {
      console.error('Remove from cart error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Clear cart
   */
  async clearCart(
    cartId: number,
    userId?: number,
    ipAddress?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Delete all items
      await this.db.prepare(`
        DELETE FROM cart_items WHERE cart_id = ?
      `).bind(cartId).run()

      // Update cart timestamp
      await this.db.prepare(`
        UPDATE shopping_carts SET updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).bind(cartId).run()

      // Log action
      if (userId) {
        await this.auditLog.log({
          userId: userId.toString(),
          action: 'cart_clear',
          module: 'ecommerce',
          details: { cart_id: cartId },
          ipAddress: ipAddress || 'unknown'
        })
      }

      return { success: true }
    } catch (error: any) {
      console.error('Clear cart error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Get cart by ID
   */
  async getCartById(cartId: number): Promise<Cart | null> {
    try {
      const cart = await this.db.prepare(`
        SELECT * FROM shopping_carts WHERE id = ?
      `).bind(cartId).first() as any

      if (!cart) return null

      // Get cart items
      const items = await this.getCartItems(cart.id)
      
      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0)
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...cart,
        items,
        subtotal,
        total: subtotal,
        item_count: itemCount
      }
    } catch (error) {
      console.error('Get cart by ID error:', error)
      return null
    }
  }

  /**
   * Convert cart to order (mark as converted)
   */
  async convertCart(cartId: number): Promise<{ success: boolean; error?: string }> {
    try {
      await this.db.prepare(`
        UPDATE shopping_carts 
        SET status = 'converted', updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).bind(cartId).run()

      return { success: true }
    } catch (error: any) {
      console.error('Convert cart error:', error)
      return { success: false, error: error.message }
    }
  }
}
