// API Routes for Products, Cart, Checkout
import { Hono } from 'hono'
import type { CloudflareBindings } from '../types'
import seedProducts from '../data/seed-products.json'

type Env = {
  Bindings: CloudflareBindings
}

const api = new Hono<Env>()

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

// Create order
api.post('/checkout', async (c) => {
  const orderData = await c.req.json()
  
  try {
    // Validate order data
    if (!orderData.items || orderData.items.length === 0) {
      return c.json({ success: false, error: 'Cart is empty' }, 400)
    }
    
    // In production, create order in database
    const orderNumber = `ORD-${Date.now()}`
    
    return c.json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderNumber,
        status: 'pending',
        total: orderData.total
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
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

export default api
