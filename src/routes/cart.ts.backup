// Shopping Cart API Routes
// Import this in index.tsx with: import { setupCartRoutes } from './routes/cart'

import type { Hono } from 'hono'

export function setupCartRoutes(app: Hono<any>) {
  
  // Get cart for current session
  app.get('/api/cart', async (c) => {
    try {
      const db = c.env.DB
      const sessionId = c.req.header('X-Session-ID') || 'guest-' + Math.random().toString(36).substr(2, 9)
      const userId = c.get('userId')

      // Find or create cart
      let cart = await db.prepare(`
        SELECT * FROM carts 
        WHERE session_id = ? OR (user_id = ? AND user_id IS NOT NULL)
        ORDER BY updated_at DESC 
        LIMIT 1
      `).bind(sessionId, userId || null).first()

      if (!cart) {
        // Create new cart
        const result = await db.prepare(`
          INSERT INTO carts (session_id, user_id, expires_at)
          VALUES (?, ?, datetime('now', '+30 days'))
        `).bind(sessionId, userId || null).run()
        
        cart = { id: result.meta.last_row_id, session_id: sessionId, user_id: userId }
      }

      // Get cart items with product details
      const items = await db.prepare(`
        SELECT 
          ci.*,
          p.name,
          p.slug,
          p.base_price,
          p.discount_price,
          p.stock_quantity,
          (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1) as image_url
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = ?
      `).bind(cart.id).all()

      // Calculate totals
      const subtotal = items.results?.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0) || 0
      const tax = subtotal * 0.19 // 19% VAT
      const total = subtotal + tax

      return c.json({
        success: true,
        cart: {
          id: cart.id,
          session_id: cart.session_id,
          items: items.results || [],
          itemCount: items.results?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0,
          subtotal: subtotal.toFixed(2),
          tax: tax.toFixed(2),
          total: total.toFixed(2)
        }
      })
    } catch (error) {
      console.error('Error fetching cart:', error)
      return c.json({ success: false, error: 'Failed to fetch cart' }, 500)
    }
  })

  // Add item to cart
  app.post('/api/cart/add', async (c) => {
    try {
      const db = c.env.DB
      const sessionId = c.req.header('X-Session-ID') || 'guest-' + Math.random().toString(36).substr(2, 9)
      const userId = c.get('userId')
      const { product_id, quantity = 1 } = await c.req.json()

      if (!product_id) {
        return c.json({ success: false, error: 'Product ID required' }, 400)
      }

      // Get product details
      const product = await db.prepare(`
        SELECT id, name, base_price, discount_price, stock_quantity
        FROM products
        WHERE id = ?
      `).bind(product_id).first()

      if (!product) {
        return c.json({ success: false, error: 'Product not found' }, 404)
      }

      // Check stock
      if (product.stock_quantity < quantity) {
        return c.json({ success: false, error: 'Insufficient stock' }, 400)
      }

      const price = product.discount_price || product.base_price

      // Find or create cart
      let cart = await db.prepare(`
        SELECT * FROM carts 
        WHERE session_id = ? OR (user_id = ? AND user_id IS NOT NULL)
        ORDER BY updated_at DESC 
        LIMIT 1
      `).bind(sessionId, userId || null).first()

      if (!cart) {
        const result = await db.prepare(`
          INSERT INTO carts (session_id, user_id, expires_at)
          VALUES (?, ?, datetime('now', '+30 days'))
        `).bind(sessionId, userId || null).run()
        cart = { id: result.meta.last_row_id }
      }

      // Check if item already exists in cart
      const existingItem = await db.prepare(`
        SELECT * FROM cart_items 
        WHERE cart_id = ? AND product_id = ?
      `).bind(cart.id, product_id).first()

      if (existingItem) {
        // Update quantity
        await db.prepare(`
          UPDATE cart_items 
          SET quantity = quantity + ?, updated_at = datetime('now')
          WHERE id = ?
        `).bind(quantity, existingItem.id).run()
      } else {
        // Add new item
        await db.prepare(`
          INSERT INTO cart_items (cart_id, product_id, quantity, price)
          VALUES (?, ?, ?, ?)
        `).bind(cart.id, product_id, quantity, price).run()
      }

      // Update cart timestamp
      await db.prepare(`
        UPDATE carts SET updated_at = datetime('now') WHERE id = ?
      `).bind(cart.id).run()

      return c.json({
        success: true,
        message: 'Item added to cart',
        product_name: product.name
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
      return c.json({ success: false, error: 'Failed to add item to cart' }, 500)
    }
  })

  // Update cart item quantity
  app.put('/api/cart/update/:itemId', async (c) => {
    try {
      const db = c.env.DB
      const itemId = c.req.param('itemId')
      const { quantity } = await c.req.json()

      if (quantity === undefined || quantity < 0) {
        return c.json({ success: false, error: 'Invalid quantity' }, 400)
      }

      if (quantity === 0) {
        // Remove item if quantity is 0
        await db.prepare(`DELETE FROM cart_items WHERE id = ?`).bind(itemId).run()
      } else {
        await db.prepare(`
          UPDATE cart_items 
          SET quantity = ?, updated_at = datetime('now')
          WHERE id = ?
        `).bind(quantity, itemId).run()
      }

      return c.json({
        success: true,
        message: 'Cart updated'
      })
    } catch (error) {
      console.error('Error updating cart:', error)
      return c.json({ success: false, error: 'Failed to update cart' }, 500)
    }
  })

  // Remove item from cart
  app.delete('/api/cart/remove/:itemId', async (c) => {
    try {
      const db = c.env.DB
      const itemId = c.req.param('itemId')

      await db.prepare(`DELETE FROM cart_items WHERE id = ?`).bind(itemId).run()

      return c.json({
        success: true,
        message: 'Item removed from cart'
      })
    } catch (error) {
      console.error('Error removing from cart:', error)
      return c.json({ success: false, error: 'Failed to remove item' }, 500)
    }
  })

  // Clear entire cart
  app.delete('/api/cart/clear', async (c) => {
    try {
      const db = c.env.DB
      const sessionId = c.req.header('X-Session-ID') || 'guest'
      const userId = c.get('userId')

      const cart = await db.prepare(`
        SELECT id FROM carts 
        WHERE session_id = ? OR (user_id = ? AND user_id IS NOT NULL)
        ORDER BY updated_at DESC 
        LIMIT 1
      `).bind(sessionId, userId || null).first()

      if (cart) {
        await db.prepare(`DELETE FROM cart_items WHERE cart_id = ?`).bind(cart.id).run()
      }

      return c.json({
        success: true,
        message: 'Cart cleared'
      })
    } catch (error) {
      console.error('Error clearing cart:', error)
      return c.json({ success: false, error: 'Failed to clear cart' }, 500)
    }
  })
}
