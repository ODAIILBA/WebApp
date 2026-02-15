/**
 * Shopping Cart API
 * RESTful API endpoints for shopping cart operations
 */

import { Hono } from 'hono'
import { ShoppingCartService } from '../services/shopping-cart-service'
import { AuditLogService } from '../services/audit-log-service'

const cartAPI = new Hono()

/**
 * GET /api/cart
 * Get current user's shopping cart
 */
cartAPI.get('/', async (c) => {
  try {
    const { env } = c
    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)

    // Get user ID from session or use session ID
    const userId = c.get('user')?.id
    const sessionId = c.req.header('X-Session-ID') || `session_${Date.now()}`


    const result = await cartService.getOrCreateCart(userId, sessionId)


    if (!result.success) {
      console.error('[Cart API] Failed to get cart:', result.error)
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      cart: result.cart
    })
  } catch (error: any) {
    console.error('[Cart API] Get cart endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/cart/items
 * Add item to cart
 */
cartAPI.post('/items', async (c) => {
  try {
    const { env } = c
    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)

    const { product_id, quantity } = await c.req.json()

    // Validate input
    if (!product_id || !quantity) {
      return c.json({ success: false, error: 'Product ID and quantity are required' }, 400)
    }

    if (quantity < 1) {
      return c.json({ success: false, error: 'Quantity must be at least 1' }, 400)
    }

    // Get user ID from session or use session ID
    const userId = c.get('user')?.id
    const sessionId = c.req.header('X-Session-ID') || `session_${Date.now()}`
    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'

    // Get or create cart
    const cartResult = await cartService.getOrCreateCart(userId, sessionId)
    if (!cartResult.success || !cartResult.cart) {
      return c.json({ success: false, error: 'Failed to get cart' }, 500)
    }

    // Add item to cart
    const result = await cartService.addToCart(
      cartResult.cart.id,
      { product_id, quantity },
      userId,
      ipAddress
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Item added to cart',
      cart: result.cart
    })
  } catch (error: any) {
    console.error('Add to cart endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * PUT /api/cart/items/:itemId
 * Update cart item quantity
 */
cartAPI.put('/items/:itemId', async (c) => {
  try {
    const { env } = c
    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)

    const itemId = parseInt(c.req.param('itemId'))
    const { quantity } = await c.req.json()

    // Validate input
    if (!quantity || quantity < 1) {
      return c.json({ success: false, error: 'Valid quantity is required' }, 400)
    }

    // Get user ID from session or use session ID
    const userId = c.get('user')?.id
    const sessionId = c.req.header('X-Session-ID') || `session_${Date.now()}`
    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'

    // Get or create cart
    const cartResult = await cartService.getOrCreateCart(userId, sessionId)
    if (!cartResult.success || !cartResult.cart) {
      return c.json({ success: false, error: 'Failed to get cart' }, 500)
    }

    // Update item
    const result = await cartService.updateCartItem(
      cartResult.cart.id,
      itemId,
      { quantity },
      userId,
      ipAddress
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Cart updated',
      cart: result.cart
    })
  } catch (error: any) {
    console.error('Update cart item endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * DELETE /api/cart/items/:itemId
 * Remove item from cart
 */
cartAPI.delete('/items/:itemId', async (c) => {
  try {
    const { env } = c
    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)

    const itemId = parseInt(c.req.param('itemId'))

    // Get user ID from session or use session ID
    const userId = c.get('user')?.id
    const sessionId = c.req.header('X-Session-ID') || `session_${Date.now()}`
    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'

    // Get or create cart
    const cartResult = await cartService.getOrCreateCart(userId, sessionId)
    if (!cartResult.success || !cartResult.cart) {
      return c.json({ success: false, error: 'Failed to get cart' }, 500)
    }

    // Remove item
    const result = await cartService.removeFromCart(
      cartResult.cart.id,
      itemId,
      userId,
      ipAddress
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Item removed from cart',
      cart: result.cart
    })
  } catch (error: any) {
    console.error('Remove from cart endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * DELETE /api/cart
 * Clear cart
 */
cartAPI.delete('/', async (c) => {
  try {
    const { env } = c
    const auditLog = new AuditLogService(env.DB)
    const cartService = new ShoppingCartService(env.DB, auditLog)

    // Get user ID from session or use session ID
    const userId = c.get('user')?.id
    const sessionId = c.req.header('X-Session-ID') || `session_${Date.now()}`
    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'

    // Get or create cart
    const cartResult = await cartService.getOrCreateCart(userId, sessionId)
    if (!cartResult.success || !cartResult.cart) {
      return c.json({ success: false, error: 'Failed to get cart' }, 500)
    }

    // Clear cart
    const result = await cartService.clearCart(
      cartResult.cart.id,
      userId,
      ipAddress
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Cart cleared'
    })
  } catch (error: any) {
    console.error('Clear cart endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default cartAPI
