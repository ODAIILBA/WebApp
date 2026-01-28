// API Routes for Products, Cart, Checkout, Auth
import { Hono } from 'hono'
import type { CloudflareBindings } from '../types'
import seedProducts from '../data/seed-products.json'
import authApi from './auth'
import LicenseGenerator from '../lib/license-generator'
import EmailService from '../lib/email-service'

type Env = {
  Bindings: CloudflareBindings
}

const api = new Hono<Env>()

// Mount Auth API
api.route('/auth', authApi)

// Transform seed products to match API format
const transformProduct = (p: any) => ({
  id: p.id,
  sku: p.sku,
  name: p.name,
  description: p.description || `High-quality ${p.name} license. Original software from Microsoft.`,
  price: Math.round(p.price * 100), // Convert to cents
  sale_price: p.salePrice ? Math.round(p.salePrice * 100) : null,
  category: p.category,
  image_url: p.image || p.imageUrl,
  in_stock: p.inStock ? 1 : 0,
  stock_quantity: p.stockQty || 999,
  is_active: 1,
  is_featured: p.category.includes('Office 2024') || p.category.includes('Windows') ? 1 : 0,
  created_at: new Date().toISOString()
})

// Get all transformed products
const getAllProducts = () => seedProducts.map(transformProduct)

// ============================================
// PRODUCTS API
// ============================================

// Get all products with filtering and pagination
api.get('/products', async (c) => {
  const { category, search, page = '1', limit = '24', sort = 'name' } = c.req.query()
  
  try {
    let products = getAllProducts()
    
    // Filter by category
    if (category && category !== 'all') {
      products = products.filter(p => p.category === category)
    }
    
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      )
    }
    
    // Sort
    const sortMap: Record<string, (a: any, b: any) => number> = {
      'name': (a, b) => a.name.localeCompare(b.name),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'newest': (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    
    if (sortMap[sort]) {
      products.sort(sortMap[sort])
    }
    
    // Pagination
    const total = products.length
    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const offset = (pageNum - 1) * limitNum
    const paginatedProducts = products.slice(offset, offset + limitNum)
    
    return c.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get single product
api.get('/products/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  
  try {
    const product = getAllProducts().find(p => p.id === id)
    
    if (!product) {
      return c.json({ success: false, error: 'Product not found' }, 404)
    }
    
    return c.json({ success: true, data: product })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get categories
api.get('/categories', async (c) => {
  try {
    const products = getAllProducts()
    const categoryMap = new Map()
    
    products.forEach(p => {
      const count = categoryMap.get(p.category) || 0
      categoryMap.set(p.category, count + 1)
    })
    
    const categories = Array.from(categoryMap.entries()).map(([category, count]) => ({
      category,
      count
    })).sort((a, b) => a.category.localeCompare(b.category))
    
    return c.json({ success: true, data: categories })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// CART API
// ============================================

// Get cart (from session or create new)
api.get('/cart', async (c) => {
  try {
    // For now, return empty cart structure
    // In production, this would fetch from database
    return c.json({
      success: true,
      data: {
        items: [],
        subtotal: 0,
        vat: 0,
        total: 0,
        discount: 0,
        coupon: null
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Add to cart
api.post('/cart/add', async (c) => {
  const { productId, quantity = 1, licenseType = 'single' } = await c.req.json()
  
  try {
    // Validate product exists
    const product = getAllProducts().find(p => p.id === productId)
    
    if (!product) {
      return c.json({ success: false, error: 'Product not found or out of stock' }, 404)
    }
    
    // In production, save to database or session
    // For now, return success with product data
    return c.json({
      success: true,
      message: 'Product added to cart',
      data: {
        product,
        quantity,
        licenseType
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update cart item
api.put('/cart/update', async (c) => {
  const { productId, quantity } = await c.req.json()
  
  if (quantity < 1) {
    return c.json({ success: false, error: 'Quantity must be at least 1' }, 400)
  }
  
  return c.json({
    success: true,
    message: 'Cart updated',
    data: { productId, quantity }
  })
})

// Remove from cart
api.delete('/cart/remove/:id', async (c) => {
  const productId = c.req.param('id')
  
  return c.json({
    success: true,
    message: 'Product removed from cart',
    data: { productId }
  })
})

// Apply coupon
api.post('/cart/coupon', async (c) => {
  const { code } = await c.req.json()
  
  // Simple coupon validation
  const coupons: Record<string, number> = {
    'SAVE10': 10,
    'SAVE20': 20,
    'WELCOME': 15
  }
  
  const discount = coupons[code?.toUpperCase()]
  
  if (!discount) {
    return c.json({ success: false, error: 'Invalid coupon code' }, 400)
  }
  
  return c.json({
    success: true,
    message: 'Coupon applied successfully',
    data: {
      code,
      discount,
      discountType: 'percentage'
    }
  })
})

// ============================================
// CHECKOUT API
// ============================================

// Create order with license generation and email
api.post('/checkout', async (c) => {
  const orderData = await c.req.json()
  const { DB } = c.env
  
  try {
    // Validate order data
    if (!orderData.items || orderData.items.length === 0) {
      return c.json({ success: false, error: 'Cart is empty' }, 400)
    }

    if (!orderData.customer || !orderData.customer.email) {
      return c.json({ success: false, error: 'Customer email required' }, 400)
    }
    
    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`
    
    // Create order in database
    const orderResult = await DB.prepare(
      `INSERT INTO orders (
        order_number, customer_name, customer_email, customer_phone,
        customer_address, customer_city, customer_zip, customer_country,
        subtotal, vat, discount, total, status, payment_status,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending', datetime('now'))`
    ).bind(
      orderNumber,
      `${orderData.customer.firstName} ${orderData.customer.lastName}`,
      orderData.customer.email,
      orderData.customer.phone || null,
      orderData.customer.address || null,
      orderData.customer.city || null,
      orderData.customer.zip || null,
      orderData.customer.country || 'DE',
      orderData.subtotal,
      orderData.vat,
      orderData.discount || 0,
      orderData.total
    ).run()

    const orderId = orderResult.meta.last_row_id as number

    // Create order items
    for (const item of orderData.items) {
      await DB.prepare(
        `INSERT INTO order_items (
          order_id, product_id, product_name, quantity, price, total
        ) VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(
        orderId,
        item.id,
        item.name,
        item.quantity,
        item.price,
        item.price * item.quantity
      ).run()
    }

    // Generate licenses for each product
    const allLicenses: any[] = []
    for (const item of orderData.items) {
      const licenses = await LicenseGenerator.createLicense(DB, {
        productId: item.id,
        orderId: orderId,
        quantity: item.quantity
      })
      
      allLicenses.push(...licenses.map(license => ({
        productName: item.name,
        key: license.key
      })))
    }

    // Send order confirmation email (if email service is configured)
    try {
      // Note: Email sending requires API keys to be configured in production
      // This is a placeholder for the email sending logic
      /*
      const emailService = new EmailService({
        provider: 'sendgrid', // or 'resend'
        apiKey: c.env.EMAIL_API_KEY,
        fromEmail: '[email protected]',
        fromName: 'SoftwareKing24'
      })

      const emailTemplate = EmailService.generateOrderConfirmation({
        orderNumber,
        customerName: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
        items: orderData.items,
        subtotal: orderData.subtotal,
        vat: orderData.vat,
        total: orderData.total,
        licenses: allLicenses
      })

      await emailService.send({
        to: orderData.customer.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text
      })
      */

      console.log('Order confirmation email would be sent to:', orderData.customer.email)
      console.log('Licenses generated:', allLicenses)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the order if email fails
    }
    
    return c.json({
      success: true,
      message: 'Order created successfully',
      orderNumber,
      orderId,
      licenses: allLicenses,
      data: {
        orderNumber,
        status: 'pending',
        total: orderData.total,
        email: orderData.customer.email
      }
    })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return c.json({ success: false, error: error.message || 'Order creation failed' }, 500)
  }
})

// ============================================
// FEATURED/RECOMMENDED PRODUCTS
// ============================================

api.get('/products/featured', async (c) => {
  try {
    const products = getAllProducts()
      .filter(p => p.is_featured)
      .slice(0, 8)
    
    return c.json({ success: true, data: products })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// LICENSE API
// ============================================

// Get licenses for an order
api.get('/licenses/order/:orderNumber', async (c) => {
  try {
    const { orderNumber } = c.req.param()
    const { DB } = c.env

    // Get order
    const order = await DB.prepare(
      'SELECT id FROM orders WHERE order_number = ?'
    ).bind(orderNumber).first() as any

    if (!order) {
      return c.json({ success: false, error: 'Order not found' }, 404)
    }

    // Get licenses
    const licenses = await LicenseGenerator.getLicensesByOrder(DB, order.id)

    return c.json({ success: true, licenses })
  } catch (error: any) {
    console.error('Get licenses error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Verify a license key
api.post('/licenses/verify', async (c) => {
  try {
    const { key } = await c.req.json()
    const { DB } = c.env

    if (!key) {
      return c.json({ success: false, error: 'License key required' }, 400)
    }

    const result = await LicenseGenerator.verifyLicense(DB, key)

    return c.json({
      success: result.valid,
      valid: result.valid,
      message: result.message,
      license: result.license
    })
  } catch (error: any) {
    console.error('Verify license error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Activate a license key
api.post('/licenses/activate', async (c) => {
  try {
    const { key, deviceId } = await c.req.json()
    const { DB } = c.env

    if (!key) {
      return c.json({ success: false, error: 'License key required' }, 400)
    }

    const result = await LicenseGenerator.activateLicense(DB, key, {
      deviceId,
      ipAddress: c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For'),
      userAgent: c.req.header('User-Agent')
    })

    return c.json(result)
  } catch (error: any) {
    console.error('Activate license error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default api
