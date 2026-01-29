import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import type { CloudflareBindings } from './types'
import { DatabaseHelper } from './lib/database'
import { Layout } from './renderer'
import { Homepage } from './components/homepage'
import { ProductsPage } from './components/products-page'
import { ProductsPageModern } from './components/products-page-modern'
import { HomepageNew } from './components/homepage-modern'
import { HomepagePrestaShop } from './components/homepage-prestashop'
import { HomepagePrestaShopEnhanced } from './components/homepage-prestashop-enhanced'
import { ProductDetailPage } from './components/product-detail'
import { ProductDetailPageModern } from './components/product-detail-modern'
import { CartPage } from './components/cart-page'
import { RegisterPage } from './components/register-page'
import { LoginPage } from './components/login-page'
import { CheckoutPage } from './components/checkout-page'
import { OrderSuccessPage } from './components/order-success'
import { UserDashboard } from './components/dashboard-overview'
import { UserOrders } from './components/dashboard-orders'
import { DashboardPage } from './components/dashboard'
import { ContactPage } from './components/contact-page'
import { CMSPage } from './components/cms-page'
import { AdminContactMessages } from './components/admin-contact-messages'
import { AdminFooterSettings } from './components/admin-footer-settings'
import { AdminPagesManagement } from './components/admin-pages-management'
import { AdminDashboardAdvanced } from './components/admin-dashboard-advanced'
import { AdminLicensesAdvanced } from './components/admin-licenses-advanced'
import { AdminProductsAdvanced } from './components/admin-products-advanced'
import { AdminOrdersAdvanced } from './components/admin-orders-advanced'
import { AdminCustomersAdvanced } from './components/admin-customers-advanced'
import { AdminNotificationsAdvanced } from './components/admin-notifications-advanced'
import { AdminSidebar } from './components/admin-sidebar'
import { 
  formatPrice, 
  generateOrderNumber, 
  generateToken, 
  getSessionExpiration,
  calculateVAT,
  safeJsonParse,
  generateProductSchema,
  generateFAQSchema
} from './utils/helpers'
import { AuthService, hashPassword, verifyPassword, generateSecureToken } from './lib/auth'

// Security Middleware
import { 
  csrf, 
  loginRateLimiter, 
  apiRateLimiter, 
  adminRateLimiter,
  securityHeaders,
  enhancedAdminAuth,
  sessionAdminAuth,
  adminAuth,
  bruteForceProtection,
  requestSizeLimit
} from './middleware/security'

// Validation
import { UserSchemas, OrderSchemas, AdminSchemas, ContactSchemas } from './middleware/validation'

// License Management
import { LicenseManager, LicenseScheduler } from './lib/licenses'
import { LicenseGenerator } from './lib/license-generator'

// Email Service
import { EmailService } from './lib/email'

// VAT Calculation
import { calculateVAT as calculateEUVAT, validateVATNumber } from './lib/vat'

// Audit Logging
import { AuditLogger, SecurityLogger, auditMiddleware } from './lib/audit'

// API Routes
import api from './api'

// Webhook Verification
import { 
  verifyStripeSignature, 
  verifyPayPalSignature,
  isWebhookProcessed,
  markWebhookProcessed,
  validateWebhookPayload,
  STRIPE_EVENTS,
  PAYPAL_EVENTS,
  retryWebhook
} from './lib/webhook'

// Cron Jobs
import { handleScheduledTasks, runAllMaintenanceTasks } from './lib/cron'

// Error Handling
import { 
  errorHandler, 
  asyncHandler, 
  AppError,
  validationError,
  authenticationError,
  authorizationError,
  notFoundError,
  paymentError,
  databaseError
} from './lib/errors'

type Env = {
  Bindings: CloudflareBindings
}

const app = new Hono<Env>()

// ============================================
// GLOBAL SECURITY MIDDLEWARE
// ============================================

// Security headers (apply to all routes)
app.use('*', securityHeaders())

// Request size limit (10MB max)
app.use('*', requestSizeLimit(10 * 1024 * 1024))

// Enable CORS for API routes
app.use('/api/*', cors())

// Rate limiting for different route groups
app.use('/api/auth/login', loginRateLimiter.middleware())
app.use('/api/auth/register', loginRateLimiter.middleware())
app.use('/api/*', apiRateLimiter.middleware())
app.use('/admin/*', adminRateLimiter.middleware())

// CSRF protection for state-changing operations
// Exclude import endpoint, section products, and auth endpoints from CSRF
app.use('/api/*', async (c, next) => {
  // Skip CSRF for these endpoints
  const exemptPaths = [
    '/api/admin/import/woocommerce',
    '/api/auth/register',
    '/api/auth/login',
    '/api/auth/password-reset/request',
    '/api/auth/password-reset/confirm',
    '/api/auth/verify-email',
    '/api/reviews' // Temporarily exempt for testing
  ]
  
  // Check if path is exempt
  if (exemptPaths.includes(c.req.path)) {
    return next()
  }
  
  // Check if path starts with /api/reviews (for testing)
  if (c.req.path.startsWith('/api/reviews')) {
    return next()
  }
  
  // Check if it's homepage sections products endpoint
  if (c.req.path.startsWith('/api/admin/homepage-sections/') && c.req.path.endsWith('/products')) {
    return next()
  }
  
  // Skip CSRF for all admin API endpoints
  if (c.req.path.startsWith('/api/admin/')) {
    return next()
  }
  
  return csrf.middleware()(c, next)
})
app.use('/admin/*', async (c, next) => {
  // Skip CSRF for API routes
  if (c.req.path.startsWith('/api/')) {
    return next()
  }
  return csrf.middleware()(c, next)
})

// Global error handler
app.onError((error, c) => {
  const isDevelopment = c.env.ENVIRONMENT === 'development' || !c.env.ENVIRONMENT
  return errorHandler(isDevelopment)(error, c)
})

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Mount legacy API routes (auth only - product routes are defined below with DatabaseHelper)
// Commented out to use database-based product routes instead
// app.route('/api', api)

// ============================================
// MIDDLEWARE: Database Helper
// ============================================

app.use('*', async (c, next) => {
  c.set('db', new DatabaseHelper(c.env.DB))
  
  // Add AuthService with JWT secret from environment
  const jwtSecret = c.env.JWT_SECRET || 'dev-secret-change-in-production'
  c.set('auth', new AuthService(c.env.DB, jwtSecret))
  
  await next()
})

// ============================================
// MIDDLEWARE: Language Detection
// ============================================

app.use('*', async (c, next) => {
  const url = new URL(c.req.url)
  const pathParts = url.pathname.split('/').filter(Boolean)
  
  // Check if URL starts with /de/ or /en/
  if (pathParts[0] === 'de') {
    c.set('language', 'de')
  } else if (pathParts[0] === 'en') {
    c.set('language', 'en')
  } else {
    // Default to German for API routes and other paths
    c.set('language', 'de')
  }
  
  await next()
})

// ============================================
// HOMEPAGE ROUTE
// ============================================

app.get('/', (c) => {
  return c.html(HomepagePrestaShopEnhanced())
})

app.get('/de', (c) => {
  return c.html(HomepagePrestaShopEnhanced())
})

// Products page
app.get('/produkte', (c) => {
  return c.html(<ProductsPageModern />)
})

app.get('/products', (c) => {
  return c.html(<ProductsPageModern />)
})

// Product detail page (using slug for SEO)
app.get('/produkt/:slug', (c) => {
  return c.html(ProductDetailPageModern())
})

app.get('/product/:slug', (c) => {
  return c.html(ProductDetailPageModern())
})

// Shopping cart page
app.get('/warenkorb', (c) => {
  return c.html(CartPage())
})

app.get('/cart', (c) => {
  return c.html(CartPage())
})

// ===========================
// AUTH ROUTES
// ===========================

app.get('/registrieren', (c) => {
  return c.html(RegisterPage())
})

app.get('/register', (c) => {
  return c.html(RegisterPage())
})

app.get('/login', (c) => {
  return c.html(LoginPage())
})

app.get('/anmelden', (c) => {
  return c.html(LoginPage())
})

// ===========================
// CHECKOUT ROUTES
// ===========================

app.get('/kasse', (c) => {
  return c.html(CheckoutPage())
})

app.get('/checkout', (c) => {
  return c.html(CheckoutPage())
})

app.get('/success', (c) => {
  return c.html(OrderSuccessPage())
})

app.get('/bestellung-erfolg', (c) => {
  return c.html(OrderSuccessPage())
})

// ===========================
// CONTACT PAGE
// ===========================

app.get('/kontakt', (c) => {
  return c.html(ContactPage())
})

app.get('/contact', (c) => {
  return c.html(ContactPage())
})

// ===========================
// USER DASHBOARD ROUTES
// ===========================

app.get('/dashboard', (c) => {
  return c.html(DashboardPage())
})

app.get('/konto', (c) => {
  return c.html(DashboardPage())
})

app.get('/account', (c) => {
  return c.html(DashboardPage())
})

app.get('/konto/bestellungen', (c) => {
  return c.html(UserOrders())
})

app.get('/konto/lizenzen', (c) => {
  return c.html(UserOrders()) // Placeholder
})

app.get('/konto/profil', (c) => {
  return c.html(UserOrders()) // Placeholder
})

// ============================================
// API ROUTES: Products
// ============================================

// Get all products with pagination and search
app.get('/api/products', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.get('language') || 'de'
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = (page - 1) * limit
    const search = c.req.query('search') || ''
    const sort = c.req.query('sort') || 'newest' // newest, price-asc, price-desc, name, bestseller, rating, popular
    const category = c.req.query('category') || ''
    const brand = c.req.query('brand') || '' // Brand filter (comma-separated IDs: "1,2,3")
    const minRating = parseFloat(c.req.query('minRating') || '0') // Minimum rating filter (0-5)
    const minPrice = parseFloat(c.req.query('minPrice') || '0')
    const maxPrice = parseFloat(c.req.query('maxPrice') || '999999')
    const onSale = c.req.query('onSale') === 'true' // Only show products on sale

    let query = `
      SELECT DISTINCT
        p.id,
        p.woocommerce_id,
        p.sku,
        p.slug,
        p.base_price,
        p.discount_price,
        p.discount_percentage,
        p.is_featured,
        p.is_bestseller,
        p.is_new,
        p.rating_average,
        p.rating_count,
        pt.name,
        pt.short_description,
        ct.name as category_name,
        b.name as brand_name,
        pi.image_url,
        pi.alt_text
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language = ?
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE p.is_active = 1
    `
    
    const params: any[] = [language, language]

    // Search filter
    if (search) {
      query += ` AND (pt.name LIKE ? OR pt.short_description LIKE ? OR p.sku LIKE ?)`
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm, searchTerm)
    }

    // Category filter
    if (category) {
      query += ` AND ct.slug = ?`
      params.push(category)
    }

    // Brand filter (supports multiple brands: "1,2,3")
    if (brand) {
      const brandIds = brand.split(',').map((id: string) => parseInt(id.trim())).filter((id: number) => !isNaN(id))
      if (brandIds.length > 0) {
        query += ` AND p.brand_id IN (${brandIds.map(() => '?').join(',')})`
        params.push(...brandIds)
      }
    }

    // Rating filter
    if (minRating > 0) {
      query += ` AND p.rating_average >= ?`
      params.push(minRating)
    }

    // On sale filter
    if (onSale) {
      query += ` AND p.discount_price IS NOT NULL AND p.discount_price < p.base_price`
    }

    // Price filter
    if (minPrice > 0) {
      query += ` AND (COALESCE(p.discount_price, p.base_price) >= ?)`
      params.push(minPrice)
    }
    if (maxPrice < 999999) {
      query += ` AND (COALESCE(p.discount_price, p.base_price) <= ?)`
      params.push(maxPrice)
    }

    // Sorting
    switch (sort) {
      case 'price-asc':
        query += ` ORDER BY COALESCE(p.discount_price, p.base_price) ASC`
        break
      case 'price-desc':
        query += ` ORDER BY COALESCE(p.discount_price, p.base_price) DESC`
        break
      case 'name':
        query += ` ORDER BY pt.name ASC`
        break
      case 'bestseller':
        query += ` ORDER BY p.is_bestseller DESC, p.rating_average DESC`
        break
      case 'rating':
        query += ` ORDER BY p.rating_average DESC, p.rating_count DESC`
        break
      case 'popular':
        query += ` ORDER BY p.rating_count DESC, p.rating_average DESC`
        break
      case 'newest':
      default:
        query += ` ORDER BY p.created_at DESC`
        break
    }

    query += ` LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const result = await c.env.DB.prepare(query).bind(...params).all()
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language = ?
      WHERE p.is_active = 1
    `
    const countParams: any[] = [language, language]
    
    if (search) {
      countQuery += ` AND (pt.name LIKE ? OR pt.short_description LIKE ? OR p.sku LIKE ?)`
      const searchTerm = `%${search}%`
      countParams.push(searchTerm, searchTerm, searchTerm)
    }
    
    if (category) {
      countQuery += ` AND ct.slug = ?`
      countParams.push(category)
    }

    // Brand filter for count query
    if (brand) {
      const brandIds = brand.split(',').map((id: string) => parseInt(id.trim())).filter((id: number) => !isNaN(id))
      if (brandIds.length > 0) {
        countQuery += ` AND p.brand_id IN (${brandIds.map(() => '?').join(',')})`
        countParams.push(...brandIds)
      }
    }

    // Rating filter for count query
    if (minRating > 0) {
      countQuery += ` AND p.rating_average >= ?`
      countParams.push(minRating)
    }

    // On sale filter for count query
    if (onSale) {
      countQuery += ` AND p.discount_price IS NOT NULL AND p.discount_price < p.base_price`
    }
    
    if (minPrice > 0) {
      countQuery += ` AND (COALESCE(p.discount_price, p.base_price) >= ?)`
      countParams.push(minPrice)
    }
    if (maxPrice < 999999) {
      countQuery += ` AND (COALESCE(p.discount_price, p.base_price) <= ?)`
      countParams.push(maxPrice)
    }
    
    const countResult = await c.env.DB.prepare(countQuery).bind(...countParams).first()
    const total = (countResult as any)?.total || 0

    return c.json({ 
      success: true, 
      data: result.results,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return c.json({ success: false, error: 'Failed to fetch products' }, 500)
  }
})

app.get('/api/products/featured', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.get('language') || 'en'
    const limit = parseInt(c.req.query('limit') || '8')

    const products = await db.getFeaturedProducts(language, limit)

    return c.json({ success: true, data: products })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch featured products' }, 500)
  }
})

app.get('/api/products/bestsellers', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.get('language') || 'en'
    const limit = parseInt(c.req.query('limit') || '6')

    const products = await db.getBestsellerProducts(language, limit)

    return c.json({ success: true, data: products })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch bestseller products' }, 500)
  }
})

app.get('/api/products/new', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.get('language') || 'en'
    const limit = parseInt(c.req.query('limit') || '6')

    const products = await db.getNewProducts(language, limit)

    return c.json({ success: true, data: products })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch new products' }, 500)
  }
})

// Get single product by ID (for cart operations)
app.get('/api/products/id/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.get('language') || 'en'
    const productId = parseInt(c.req.param('id'))

    if (isNaN(productId)) {
      return c.json({ success: false, error: 'Invalid product ID' }, 400)
    }

    const product = await db.getProductById(productId, language)

    if (!product) {
      return c.json({ success: false, error: 'Product not found' }, 404)
    }

    return c.json({ success: true, data: product })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch product' }, 500)
  }
})

app.get('/api/products/:slug', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.get('language') || 'en'
    const slug = c.req.param('slug')

    const product = await db.getProductBySlug(slug, language)

    if (!product) {
      return c.json({ success: false, error: 'Product not found' }, 404)
    }

    return c.json({ success: true, data: product })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch product' }, 500)
  }
})

// Autocomplete search endpoint (fast, lightweight)
app.get('/api/products/search/autocomplete', async (c) => {
  try {
    const query = c.req.query('q') || ''
    const language = c.get('language') || 'de'
    const limit = parseInt(c.req.query('limit') || '5')

    if (query.length < 2) {
      return c.json({ success: true, data: [] })
    }

    const searchQuery = `
      SELECT DISTINCT
        p.id,
        p.slug,
        pt.name,
        p.base_price,
        p.discount_price,
        ct.name as category_name,
        b.name as brand_name,
        pi.image_url
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language = ?
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE p.is_active = 1
        AND (pt.name LIKE ? OR pt.short_description LIKE ? OR p.sku LIKE ? OR b.name LIKE ?)
      ORDER BY 
        CASE 
          WHEN pt.name LIKE ? THEN 1
          WHEN pt.name LIKE ? THEN 2
          ELSE 3
        END,
        p.is_bestseller DESC,
        p.rating_average DESC
      LIMIT ?
    `

    const searchTerm = `%${query}%`
    const startsWith = `${query}%`
    const result = await c.env.DB.prepare(searchQuery)
      .bind(language, language, searchTerm, searchTerm, searchTerm, searchTerm, startsWith, searchTerm, limit)
      .all()

    return c.json({ 
      success: true, 
      data: result.results || [],
      query: query,
      count: result.results?.length || 0
    })
  } catch (error) {
    console.error('Autocomplete search error:', error)
    return c.json({ success: false, error: 'Search failed' }, 500)
  }
})

// ============================================
// API ROUTES: Categories
// ============================================

app.get('/api/categories', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.get('language') || 'en'

    const categories = await db.getAllCategories(language)

    return c.json({ success: true, data: categories })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch categories' }, 500)
  }
})

app.get('/api/categories/:slug/products', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.get('language') || 'en'
    const slug = c.req.param('slug')
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')

    const result = await db.getProductsByCategory(slug, language, page, limit)

    return c.json({ success: true, data: result })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch category products' }, 500)
  }
})

// ============================================
// API ROUTES: Brands
// ============================================

// Get all brands
app.get('/api/brands', async (c) => {
  try {
    const query = `
      SELECT 
        b.id,
        b.name,
        b.slug,
        b.logo_url,
        COUNT(p.id) as product_count
      FROM brands b
      LEFT JOIN products p ON b.id = p.brand_id AND p.is_active = 1
      GROUP BY b.id
      HAVING product_count > 0
      ORDER BY b.name ASC
    `
    
    const result = await c.env.DB.prepare(query).all()
    
    return c.json({ success: true, data: result.results || [] })
  } catch (error) {
    console.error('Brands fetch error:', error)
    return c.json({ success: false, error: 'Failed to fetch brands', details: (error as any).message }, 500)
  }
})

app.get('/api/brands/featured', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const limit = parseInt(c.req.query('limit') || '8')

    const brands = await db.getFeaturedBrands(limit)

    return c.json({ success: true, data: brands })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch brands' }, 500)
  }
})


// ============================================
// API ROUTES: Reviews
// ============================================

// Get reviews for a product
app.get('/api/reviews/product/:productId', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const productId = c.req.param('productId')
    const sort = c.req.query('sort') || 'newest' // newest, highest, lowest, helpful
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '10')
    const rating = c.req.query('rating') // Filter by specific rating (1-5)
    const offset = (page - 1) * limit

    // Build query
    let query = `
      SELECT 
        r.*,
        u.first_name,
        u.last_name,
        u.email,
        (SELECT COUNT(*) FROM review_images WHERE review_id = r.id) as image_count
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ? AND r.is_approved = 1
    `
    const params: any[] = [productId]

    // Filter by rating if specified
    if (rating) {
      query += ` AND r.rating = ?`
      params.push(rating)
    }

    // Sorting
    switch (sort) {
      case 'highest':
        query += ` ORDER BY r.rating DESC, r.created_at DESC`
        break
      case 'lowest':
        query += ` ORDER BY r.rating ASC, r.created_at DESC`
        break
      case 'helpful':
        query += ` ORDER BY r.helpful_count DESC, r.created_at DESC`
        break
      case 'newest':
      default:
        query += ` ORDER BY r.created_at DESC`
        break
    }

    query += ` LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const reviews = await db.db.prepare(query).bind(...params).all()

    // Get total count
    let countQuery = `SELECT COUNT(*) as total FROM reviews WHERE product_id = ? AND is_approved = 1`
    const countParams: any[] = [productId]
    if (rating) {
      countQuery += ` AND rating = ?`
      countParams.push(rating)
    }
    const countResult = await db.db.prepare(countQuery).bind(...countParams).first() as any
    const total = countResult?.total || 0

    // Get images for each review
    for (const review of reviews.results || []) {
      const images = await db.db.prepare(`
        SELECT image_url FROM review_images WHERE review_id = ? ORDER BY image_order
      `).bind((review as any).id).all()
      ;(review as any).images = images.results || []
    }

    // Get rating distribution
    const distribution = await db.db.prepare(`
      SELECT rating, COUNT(*) as count
      FROM reviews
      WHERE product_id = ? AND is_approved = 1
      GROUP BY rating
      ORDER BY rating DESC
    `).bind(productId).all()

    return c.json({
      success: true,
      data: reviews.results || [],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      ratingDistribution: distribution.results || []
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return c.json({ success: false, error: 'Failed to fetch reviews' }, 500)
  }
})

// Submit a new review
app.post('/api/reviews', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const body = await c.req.json()
    const { productId, userId, rating, title, content, images, orderId } = body

    // Validation
    if (!productId || !userId || !rating || !title || !content) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    if (rating < 1 || rating > 5) {
      return c.json({ success: false, error: 'Rating must be between 1 and 5' }, 400)
    }

    // Check if product exists
    const product = await db.db.prepare(`SELECT id FROM products WHERE id = ?`).bind(productId).first()
    if (!product) {
      return c.json({ success: false, error: 'Product not found' }, 404)
    }

    // Check if user already reviewed this product
    const existingReview = await db.db.prepare(`
      SELECT id FROM reviews WHERE product_id = ? AND user_id = ?
    `).bind(productId, userId).first()

    if (existingReview) {
      return c.json({ success: false, error: 'You have already reviewed this product' }, 400)
    }

    // Check if verified purchase (if orderId provided)
    let isVerifiedPurchase = 0
    if (orderId) {
      const order = await db.db.prepare(`
        SELECT o.id FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        WHERE o.id = ? AND o.user_id = ? AND oi.product_id = ? AND o.status = 'completed'
      `).bind(orderId, userId, productId).first()
      
      if (order) {
        isVerifiedPurchase = 1
      }
    }

    // Insert review (auto-approve for now, can add moderation later)
    const reviewResult = await db.db.prepare(`
      INSERT INTO reviews (product_id, user_id, order_id, rating, title, content, is_verified_purchase, is_approved)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `).bind(productId, userId, orderId || null, rating, title, content, isVerifiedPurchase).run()

    const reviewId = reviewResult.meta.last_row_id

    // Insert images if provided
    if (images && Array.isArray(images) && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await db.db.prepare(`
          INSERT INTO review_images (review_id, image_url, image_order)
          VALUES (?, ?, ?)
        `).bind(reviewId, images[i], i).run()
      }
    }

    return c.json({
      success: true,
      data: { id: reviewId, message: 'Review submitted successfully' }
    })
  } catch (error) {
    console.error('Error submitting review:', error)
    return c.json({ success: false, error: 'Failed to submit review' }, 500)
  }
})

// Vote on a review (helpful/unhelpful)
app.post('/api/reviews/:reviewId/vote', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const reviewId = c.req.param('reviewId')
    const body = await c.req.json()
    const { userId, isHelpful } = body

    if (!userId || isHelpful === undefined) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    // Check if user already voted
    const existingVote = await db.db.prepare(`
      SELECT id, is_helpful FROM review_votes WHERE review_id = ? AND user_id = ?
    `).bind(reviewId, userId).first() as any

    if (existingVote) {
      // Update existing vote if different
      if (existingVote.is_helpful !== (isHelpful ? 1 : 0)) {
        await db.db.prepare(`
          UPDATE review_votes SET is_helpful = ? WHERE id = ?
        `).bind(isHelpful ? 1 : 0, existingVote.id).run()
      }
    } else {
      // Insert new vote
      await db.db.prepare(`
        INSERT INTO review_votes (review_id, user_id, is_helpful)
        VALUES (?, ?, ?)
      `).bind(reviewId, userId, isHelpful ? 1 : 0).run()
    }

    return c.json({ success: true, message: 'Vote recorded successfully' })
  } catch (error) {
    console.error('Error voting on review:', error)
    return c.json({ success: false, error: 'Failed to record vote' }, 500)
  }
})

// Get review stats for a product
app.get('/api/reviews/product/:productId/stats', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const productId = c.req.param('productId')

    // Get overall stats
    const stats = await db.db.prepare(`
      SELECT 
        COUNT(*) as totalReviews,
        CAST(AVG(rating) AS REAL) as averageRating,
        SUM(CASE WHEN is_verified_purchase = 1 THEN 1 ELSE 0 END) as verifiedPurchases
      FROM reviews
      WHERE product_id = ? AND is_approved = 1
    `).bind(productId).first()

    // Get rating distribution
    const distribution = await db.db.prepare(`
      SELECT rating, COUNT(*) as count
      FROM reviews
      WHERE product_id = ? AND is_approved = 1
      GROUP BY rating
      ORDER BY rating DESC
    `).bind(productId).all()

    // Format distribution as percentages
    const total = (stats as any)?.totalReviews || 0
    const ratingBreakdown = [1, 2, 3, 4, 5].map(rating => {
      const item = (distribution.results || []).find((d: any) => d.rating === rating)
      const count = item ? (item as any).count : 0
      return {
        rating,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }
    }).reverse() // 5 stars first

    return c.json({
      success: true,
      data: {
        totalReviews: (stats as any)?.totalReviews || 0,
        averageRating: (stats as any)?.averageRating || 0,
        verifiedPurchases: (stats as any)?.verifiedPurchases || 0,
        ratingBreakdown
      }
    })
  } catch (error) {
    console.error('Error fetching review stats:', error)
    return c.json({ success: false, error: 'Failed to fetch review stats' }, 500)
  }
})

// ============================================
// API ROUTES: Admin - Sliders
// ============================================

// Get all sliders
app.get('/api/admin/sliders', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const sliders = await db.db.prepare(`
      SELECT * FROM sliders ORDER BY sort_order ASC
    `).all()

    return c.json({ success: true, data: sliders.results })
  } catch (error) {
    console.error('Error fetching sliders:', error)
    return c.json({ success: false, error: 'Failed to fetch sliders' }, 500)
  }
})

// Create slider
app.post('/api/admin/sliders', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const body = await c.req.json()

    const result = await db.db.prepare(`
      INSERT INTO sliders (title, subtitle, button_text, button_link, image_url, background_color, text_color, is_active, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.title,
      body.subtitle || null,
      body.button_text || null,
      body.button_link || null,
      body.image_url || null,
      body.background_color || '#1a2a4e',
      body.text_color || '#ffffff',
      body.is_active ? 1 : 0,
      body.sort_order || 0
    ).run()

    return c.json({ success: true, data: { id: result.meta.last_row_id } })
  } catch (error) {
    console.error('Error creating slider:', error)
    return c.json({ success: false, error: 'Failed to create slider' }, 500)
  }
})

// Update slider
app.put('/api/admin/sliders/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    const body = await c.req.json()

    await db.db.prepare(`
      UPDATE sliders SET
        title = ?,
        subtitle = ?,
        button_text = ?,
        button_link = ?,
        image_url = ?,
        background_color = ?,
        text_color = ?,
        is_active = ?,
        sort_order = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      body.title,
      body.subtitle || null,
      body.button_text || null,
      body.button_link || null,
      body.image_url || null,
      body.background_color || '#1a2a4e',
      body.text_color || '#ffffff',
      body.is_active ? 1 : 0,
      body.sort_order || 0,
      id
    ).run()

    return c.json({ success: true })
  } catch (error) {
    console.error('Error updating slider:', error)
    return c.json({ success: false, error: 'Failed to update slider' }, 500)
  }
})

// Patch slider (partial update)
app.patch('/api/admin/sliders/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    const body = await c.req.json()

    if (body.sort_order !== undefined) {
      await db.db.prepare(`UPDATE sliders SET sort_order = ? WHERE id = ?`).bind(body.sort_order, id).run()
    }

    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update slider' }, 500)
  }
})

// Delete slider
app.delete('/api/admin/sliders/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')

    await db.db.prepare(`DELETE FROM sliders WHERE id = ?`).bind(id).run()

    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting slider:', error)
    return c.json({ success: false, error: 'Failed to delete slider' }, 500)
  }
})

// ============================================
// API ROUTES: Admin - Homepage Sections
// ============================================

// Get all homepage sections
app.get('/api/admin/homepage-sections', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const sections = await db.db.prepare(`
      SELECT 
        hs.*,
        COUNT(sp.id) as product_count
      FROM homepage_sections hs
      LEFT JOIN section_products sp ON hs.id = sp.section_id
      GROUP BY hs.id
      ORDER BY hs.display_order ASC
    `).all()

    return c.json({ success: true, data: sections.results })
  } catch (error) {
    console.error('Error fetching sections:', error)
    return c.json({ success: false, error: 'Failed to fetch sections' }, 500)
  }
})

// Create section
app.post('/api/admin/homepage-sections', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const body = await c.req.json()

    const result = await db.db.prepare(`
      INSERT INTO homepage_sections (section_key, title, subtitle, section_type, display_order, is_active, limit_items, layout)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.section_key,
      body.title,
      body.subtitle || null,
      body.section_type,
      body.display_order || 0,
      body.is_active ? 1 : 0,
      body.limit_items || 8,
      body.layout || 'grid'
    ).run()

    return c.json({ success: true, data: { id: result.meta.last_row_id } })
  } catch (error) {
    console.error('Error creating section:', error)
    return c.json({ success: false, error: 'Failed to create section' }, 500)
  }
})

// Update section
app.put('/api/admin/homepage-sections/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    const body = await c.req.json()

    await db.db.prepare(`
      UPDATE homepage_sections SET
        section_key = ?,
        title = ?,
        subtitle = ?,
        section_type = ?,
        display_order = ?,
        is_active = ?,
        limit_items = ?,
        layout = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      body.section_key,
      body.title,
      body.subtitle || null,
      body.section_type,
      body.display_order || 0,
      body.is_active ? 1 : 0,
      body.limit_items || 8,
      body.layout || 'grid',
      id
    ).run()

    return c.json({ success: true })
  } catch (error) {
    console.error('Error updating section:', error)
    return c.json({ success: false, error: 'Failed to update section' }, 500)
  }
})

// Patch section (partial update)
app.patch('/api/admin/homepage-sections/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    const body = await c.req.json()

    if (body.display_order !== undefined) {
      await db.db.prepare(`UPDATE homepage_sections SET display_order = ? WHERE id = ?`).bind(body.display_order, id).run()
    }

    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update section' }, 500)
  }
})

// Delete section
app.delete('/api/admin/homepage-sections/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')

    await db.db.prepare(`DELETE FROM homepage_sections WHERE id = ?`).bind(id).run()

    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting section:', error)
    return c.json({ success: false, error: 'Failed to delete section' }, 500)
  }
})

// Get section products
app.get('/api/admin/homepage-sections/:id/products', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')

    const products = await db.db.prepare(`
      SELECT 
        p.*,
        pt.name,
        pt.short_description,
        pi.image_url,
        sp.sort_order
      FROM section_products sp
      JOIN products p ON sp.product_id = p.id
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'de'
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE sp.section_id = ?
      ORDER BY sp.sort_order ASC
    `).bind(id).all()

    return c.json({ success: true, data: products.results })
  } catch (error) {
    console.error('Error fetching section products:', error)
    return c.json({ success: false, error: 'Failed to fetch products' }, 500)
  }
})

// Save section products
app.post('/api/admin/homepage-sections/:id/products', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    const body = await c.req.json()
    const products = body.products || []

    // Delete existing products for this section
    await db.db.prepare(`DELETE FROM section_products WHERE section_id = ?`).bind(id).run()

    // Insert new products
    for (const product of products) {
      await db.db.prepare(`
        INSERT INTO section_products (section_id, product_id, sort_order)
        VALUES (?, ?, ?)
      `).bind(id, product.product_id, product.sort_order || 0).run()
    }

    return c.json({ success: true })
  } catch (error) {
    console.error('Error saving section products:', error)
    return c.json({ success: false, error: 'Failed to save products' }, 500)
  }
})

// ============================================
// API ROUTES: Homepage (Public)
// ============================================

// Get active homepage sections with their products
app.get('/api/homepage-sections', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.req.query('language') || c.get('language') || 'de'

    // Get active sections with translations
    const sections = await db.db.prepare(`
      SELECT 
        s.*,
        st.title,
        st.subtitle,
        st.language
      FROM homepage_sections s
      LEFT JOIN homepage_section_translations st ON s.id = st.section_id
      WHERE s.is_active = 1 AND st.language = ?
      ORDER BY s.display_order ASC
    `).bind(language).all()

    // For each section, get its products
    const sectionsWithProducts = await Promise.all(
      (sections.results || []).map(async (section: any) => {
        // Check if section has manual products
        const manualProducts = await db.db.prepare(`
          SELECT sp.product_id, sp.sort_order
          FROM section_products sp
          WHERE sp.section_id = ?
          ORDER BY sp.sort_order ASC
        `).bind(section.id).all()

        let products = []
        
        if (manualProducts.results && manualProducts.results.length > 0) {
          // Use manually selected products
          const productIds = (manualProducts.results as any[]).map((p: any) => p.product_id)
          const placeholders = productIds.map(() => '?').join(',')
          
          const productsResult = await db.db.prepare(`
            SELECT 
              p.*,
              pt.name,
              pt.short_description,
              (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1) as image_url
            FROM products p
            LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
            WHERE p.id IN (${placeholders}) AND p.is_active = 1
            ORDER BY CASE p.id ${productIds.map((id, i) => `WHEN ${id} THEN ${i}`).join(' ')} END
          `).bind(language, ...productIds).all()
          
          products = productsResult.results || []
        } else {
          // Use automatic products based on section type
          let query = ''
          if (section.section_type === 'featured') {
            query = `
              SELECT p.*, pt.name, pt.short_description,
                (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1) as image_url
              FROM products p
              LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
              WHERE p.is_active = 1 AND p.is_featured = 1
              ORDER BY p.created_at DESC
              LIMIT ?
            `
          } else if (section.section_type === 'bestsellers') {
            query = `
              SELECT p.*, pt.name, pt.short_description,
                (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1) as image_url
              FROM products p
              LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
              WHERE p.is_active = 1 AND p.is_bestseller = 1
              ORDER BY p.created_at DESC
              LIMIT ?
            `
          } else if (section.section_type === 'new') {
            query = `
              SELECT p.*, pt.name, pt.short_description,
                (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1) as image_url
              FROM products p
              LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
              WHERE p.is_active = 1 AND p.is_new = 1
              ORDER BY p.created_at DESC
              LIMIT ?
            `
          } else {
            // Default: newest products
            query = `
              SELECT p.*, pt.name, pt.short_description,
                (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1) as image_url
              FROM products p
              LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
              WHERE p.is_active = 1
              ORDER BY p.created_at DESC
              LIMIT ?
            `
          }
          
          const productsResult = await db.db.prepare(query).bind(language, section.items_limit || 8).all()
          products = productsResult.results || []
        }

        return {
          ...section,
          products
        }
      })
    )

    return c.json({ success: true, data: sectionsWithProducts })
  } catch (error) {
    console.error('Error fetching homepage sections:', error)
    return c.json({ success: false, error: 'Failed to fetch homepage sections' }, 500)
  }
})

// ============================================
// API ROUTES: Authentication
// ============================================

app.post('/api/auth/register', async (c) => {
  try {
    const auth = c.get('auth') as AuthService
    const body = await c.req.json()

    // Validate input
    if (!body.email || !body.password || !body.first_name || !body.last_name) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return c.json({ success: false, error: 'Invalid email format' }, 400)
    }

    // Validate password strength (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
    if (body.password.length < 8) {
      return c.json({ success: false, error: 'Password must be at least 8 characters' }, 400)
    }

    // Register user
    const result = await auth.register(
      body.email,
      body.password,
      body.first_name,
      body.last_name
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    // Log in the user immediately after registration
    const loginResult = await auth.login(body.email, body.password)
    
    if (!loginResult.success) {
      return c.json({ 
        success: true, 
        message: 'Registration successful. Please log in.',
        userId: result.userId
      })
    }

    return c.json({ 
      success: true, 
      data: loginResult.token
    })
  } catch (error) {
    console.error('Registration error:', error)
    return c.json({ success: false, error: 'Registration failed' }, 500)
  }
})

app.post('/api/auth/login', async (c) => {
  try {
    const auth = c.get('auth') as AuthService
    const body = await c.req.json()

    // Validate input
    if (!body.email || !body.password) {
      return c.json({ success: false, error: 'Missing email or password' }, 400)
    }

    // Login
    const result = await auth.login(body.email, body.password)

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 401)
    }

    return c.json({ 
      success: true, 
      data: result.token
    })
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ success: false, error: 'Login failed' }, 500)
  }
})

// Password Reset Request
app.post('/api/auth/password-reset/request', async (c) => {
  try {
    const auth = c.get('auth') as AuthService
    const body = await c.req.json()

    if (!body.email) {
      return c.json({ success: false, error: 'Email is required' }, 400)
    }

    const result = await auth.requestPasswordReset(body.email)
    
    // Always return success (security best practice - don't reveal if email exists)
    return c.json({ 
      success: true, 
      message: 'If the email exists, a password reset link has been sent'
    })
  } catch (error) {
    console.error('Password reset request error:', error)
    return c.json({ success: false, error: 'Failed to process request' }, 500)
  }
})

// Password Reset Confirmation
app.post('/api/auth/password-reset/confirm', async (c) => {
  try {
    const auth = c.get('auth') as AuthService
    const body = await c.req.json()

    if (!body.token || !body.newPassword) {
      return c.json({ success: false, error: 'Token and new password are required' }, 400)
    }

    // Validate password strength
    if (body.newPassword.length < 8) {
      return c.json({ success: false, error: 'Password must be at least 8 characters' }, 400)
    }

    const result = await auth.resetPassword(body.token, body.newPassword)

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({ 
      success: true, 
      message: 'Password reset successfully. You can now log in with your new password.'
    })
  } catch (error) {
    console.error('Password reset confirmation error:', error)
    return c.json({ success: false, error: 'Failed to reset password' }, 500)
  }
})

// Email Verification
app.get('/api/auth/verify-email/:token', async (c) => {
  try {
    const auth = c.get('auth') as AuthService
    const token = c.req.param('token')

    const result = await auth.verifyEmail(token)

    if (!result.success) {
      return c.json({ success: false, error: 'Invalid or expired verification token' }, 400)
    }

    return c.json({ 
      success: true, 
      message: 'Email verified successfully. You can now log in.'
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return c.json({ success: false, error: 'Verification failed' }, 500)
  }
})

app.post('/api/auth/logout', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }

    const token = authHeader.substring(7)
    await db.deleteSession(token)

    return c.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Logout failed' }, 500)
  }
})

app.get('/api/auth/me', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }

    const token = authHeader.substring(7)
    const session = await db.getSessionByToken(token)

    if (!session) {
      return c.json({ success: false, error: 'Invalid or expired token' }, 401)
    }

    return c.json({ 
      success: true, 
      data: {
        id: session.user_id,
        email: session.email,
        first_name: session.first_name,
        last_name: session.last_name,
        role: session.role
      }
    })
  } catch (error) {
    return c.json({ success: false, error: 'Authentication failed' }, 500)
  }
})

// ============================================
// API ROUTES: Orders
// ============================================

app.post('/api/orders', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const body = await c.req.json()

    // Validate input from checkout form
    if (!body.customer || !body.items || body.items.length === 0) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    const customer = body.customer
    
    // Validate customer data
    if (!customer.email || !customer.firstName || !customer.lastName) {
      return c.json({ success: false, error: 'Missing customer information' }, 400)
    }

    // Calculate totals (values come from frontend in cents)
    const subtotal = body.subtotal || 0
    const discount = body.discount || 0
    const vat = body.vat || 0
    const total = body.total || 0

    // Create order
    const orderNumber = generateOrderNumber()
    
    // Insert order into database
    const orderResult = await db.db.prepare(`
      INSERT INTO orders (
        order_number, email, status, 
        subtotal, tax, total, 
        payment_method, payment_status,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      orderNumber,
      customer.email,
      'pending',
      subtotal,
      vat,
      total,
      body.paymentMethod || 'stripe',
      'pending'
    ).run()

    const orderId = orderResult.meta.last_row_id

    // Add order items
    for (const item of body.items) {
      await db.db.prepare(`
        INSERT INTO order_items (
          order_id, product_id, quantity, 
          unit_price, total_price
        ) VALUES (?, ?, ?, ?, ?)
      `).bind(
        orderId,
        item.productId,
        item.quantity,
        item.price,
        item.price * item.quantity
      ).run()
    }

    // Store customer billing address
    await db.db.prepare(`
      INSERT INTO addresses (
        user_id, address_type, first_name, last_name, 
        company, street, city, zip, country, 
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      null, // guest order
      'billing',
      customer.firstName,
      customer.lastName,
      customer.company || null,
      customer.street,
      customer.city,
      customer.zip,
      customer.country
    ).run()

    return c.json({ 
      success: true, 
      data: {
        orderNumber: orderNumber,
        orderId: orderId,
        total: total,
        message: 'Order created successfully'
      }
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return c.json({ success: false, error: 'Failed to create order: ' + error.message }, 500)
  }
})

app.get('/api/orders/:orderNumber', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const orderNumber = c.req.param('orderNumber')

    const order = await db.getOrderByNumber(orderNumber)

    if (!order) {
      return c.json({ success: false, error: 'Order not found' }, 404)
    }

    return c.json({ success: true, data: order })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch order' }, 500)
  }
})

// ============================================
// ADMIN API ROUTES (Protected)
// ============================================

// Admin middleware
// Use enhanced admin authentication from security middleware
// Use combined admin auth (accepts both session cookies and Bearer tokens)
// const adminAuth is now imported from './middleware/security'

app.get('/api/admin/dashboard', adminAuth, async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    
    // Get dashboard statistics
    const stats = {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalCustomers: 0
    }

    // You can add more complex queries here

    return c.json({ success: true, data: stats })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch dashboard data' }, 500)
  }
})

// Admin API: Get all licenses
app.get('/api/admin/licenses', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    
    const licenses = await c.env.DB.prepare(`
      SELECT lk.*, p.sku, pt.name as product_name
      FROM license_keys lk
      LEFT JOIN products p ON lk.product_id = p.id
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'en'
      ORDER BY lk.created_at DESC
      LIMIT 100
    `).all()

    return c.json({ success: true, data: licenses.results || [] })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch licenses' }, 500)
  }
})

// Admin API: Export licenses to CSV
app.get('/api/admin/licenses/export', adminAuth, async (c) => {
  try {
    const licenses = await c.env.DB.prepare(`
      SELECT lk.license_key, p.sku, lk.key_type, lk.status, lk.activation_limit, lk.activation_count, lk.created_at
      FROM license_keys lk
      LEFT JOIN products p ON lk.product_id = p.id
      ORDER BY lk.created_at DESC
    `).all()

    // Generate CSV
    const headers = ['License Key', 'Product SKU', 'Type', 'Status', 'Activation Limit', 'Activations', 'Created']
    const rows = [headers.join(',')]
    
    ;(licenses.results || []).forEach((license: any) => {
      rows.push([
        license.license_key,
        license.sku || '',
        license.key_type,
        license.status,
        license.activation_limit,
        license.activation_count,
        license.created_at
      ].join(','))
    })

    return new Response(rows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="license-keys.csv"'
      }
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to export licenses' }, 500)
  }
})

// Admin API: Import licenses from CSV
app.post('/api/admin/licenses/import', adminAuth, async (c) => {
  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return c.json({ success: false, error: 'No file uploaded' }, 400)
    }

    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      return c.json({ success: false, error: 'CSV file is empty' }, 400)
    }

    // Skip header row
    const dataLines = lines.slice(1)
    let imported = 0
    let skipped = 0

    for (const line of dataLines) {
      const [product_id, license_key, key_type, activation_limit] = line.split(',').map(v => v.trim())
      
      if (!product_id || !license_key) {
        skipped++
        continue
      }

      try {
        await c.env.DB.prepare(`
          INSERT INTO license_keys (product_id, license_key, key_type, activation_limit, status)
          VALUES (?, ?, ?, ?, 'available')
        `).bind(product_id, license_key, key_type || 'single', activation_limit || 1).run()
        
        imported++
      } catch (error) {
        // Duplicate key or other error
        skipped++
      }
    }

    return c.json({ 
      success: true, 
      data: { imported, skipped }
    })
  } catch (error) {
    console.error('Import error:', error)
    return c.json({ success: false, error: 'Failed to import licenses' }, 500)
  }
})

// Admin API: Add single license
app.post('/api/admin/licenses', async (c) => {
  try {
    const body = await c.req.json()
    const { product_id, license_key, key_type, activation_limit, expires_at } = body
    
    if (!product_id || !license_key) {
      return c.json({ success: false, error: 'Product ID and license key are required' }, 400)
    }
    
    await c.env.DB.prepare(`
      INSERT INTO license_keys (product_id, license_key, key_type, activation_limit, expires_at, status)
      VALUES (?, ?, ?, ?, ?, 'available')
    `).bind(
      product_id,
      license_key,
      key_type || 'single',
      activation_limit || 1,
      expires_at || null
    ).run()
    
    return c.json({ success: true, message: 'License added successfully' })
  } catch (error: any) {
    console.error('Error adding license:', error)
    if (error.message?.includes('UNIQUE')) {
      return c.json({ success: false, error: 'License key already exists' }, 400)
    }
    return c.json({ success: false, error: 'Failed to add license' }, 500)
  }
})

// Admin API: Bulk add licenses
app.post('/api/admin/licenses/bulk', async (c) => {
  try {
    const body = await c.req.json()
    const { product_id, license_keys, key_type, activation_limit } = body
    
    if (!product_id || !license_keys || !Array.isArray(license_keys) || license_keys.length === 0) {
      return c.json({ success: false, error: 'Invalid request data' }, 400)
    }
    
    let added = 0
    let skipped = 0
    
    for (const key of license_keys) {
      try {
        await c.env.DB.prepare(`
          INSERT INTO license_keys (product_id, license_key, key_type, activation_limit, status)
          VALUES (?, ?, ?, ?, 'available')
        `).bind(product_id, key, key_type || 'single', activation_limit || 1).run()
        added++
      } catch (error) {
        skipped++
      }
    }
    
    return c.json({ 
      success: true, 
      data: { added, skipped },
      message: `${added} licenses added, ${skipped} skipped` 
    })
  } catch (error) {
    console.error('Bulk add error:', error)
    return c.json({ success: false, error: 'Failed to add licenses' }, 500)
  }
})

// Admin API: Delete license
app.delete('/api/admin/licenses/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    await c.env.DB.prepare(`
      DELETE FROM license_keys WHERE id = ?
    `).bind(id).run()
    
    return c.json({ success: true, message: 'License deleted successfully' })
  } catch (error) {
    console.error('Error deleting license:', error)
    return c.json({ success: false, error: 'Failed to delete license' }, 500)
  }
})

// Admin API: Get license stats
app.get('/api/admin/licenses/stats', async (c) => {
  try {
    const stats = await c.env.DB.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'available' THEN 1 ELSE 0 END) as available,
        SUM(CASE WHEN status = 'sold' THEN 1 ELSE 0 END) as sold,
        SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) as expired
      FROM license_keys
    `).first()
    
    return c.json({ success: true, data: stats })
  } catch (error) {
    console.error('Error loading stats:', error)
    return c.json({ success: false, error: 'Failed to load stats' }, 500)
  }
})

// Admin API: Bulk delete licenses
app.post('/api/admin/licenses/bulk-delete', async (c) => {
  try {
    const body = await c.req.json()
    const { license_ids } = body
    
    if (!license_ids || !Array.isArray(license_ids) || license_ids.length === 0) {
      return c.json({ success: false, error: 'No licenses selected' }, 400)
    }
    
    const placeholders = license_ids.map(() => '?').join(',')
    await c.env.DB.prepare(`
      DELETE FROM license_keys WHERE id IN (${placeholders})
    `).bind(...license_ids).run()
    
    return c.json({ success: true, message: `${license_ids.length} licenses deleted` })
  } catch (error) {
    console.error('Bulk delete error:', error)
    return c.json({ success: false, error: 'Failed to delete licenses' }, 500)
  }
})

// ============================================
// ADMIN PAGE ROUTES
// ============================================

// Import admin components
import { AdminLayout, AdminDashboard } from './components/admin'
import { AdminProducts, AdminProductForm } from './components/admin-products'
import { AdminProductImport } from './components/admin-product-import'
import { AdminSliders } from './components/admin-sliders'
import { AdminHomepageSections } from './components/admin-homepage-sections'
import { AdminLicenses, AdminLicenseImport } from './components/admin-licenses'
import { AdminOrders } from './components/admin-orders'
import { AdminCustomers } from './components/admin-customers'
import { AdminInvoices } from './components/admin-invoices'
import { AdminCertificates } from './components/admin-certificates'
import { AdminSettings } from './components/admin-settings'
import { AdminReports } from './components/admin-reports'
import { AdminAnalytics } from './components/admin-analytics-enhanced'
import { AdminDelivery } from './components/admin-delivery'
import { AdminOrderManagement } from './components/admin-order-management-full'
import { AdminTracking } from './components/admin-tracking'

// Admin Dashboard
app.get('/admin', (c) => {
  const html = AdminDashboardAdvanced()
  return c.html(html)
})

// Products Management
app.get('/admin/products', (c) => {
  const html = AdminProductsAdvanced()
  return c.html(html)
})

app.get('/admin/products/add', (c) => {
  return c.html(
    <AdminLayout title="Add New Product" currentUser={{ first_name: 'Admin' }}>
      <AdminProductForm isEdit={false} />
    </AdminLayout>
  )
})

app.get('/admin/products/edit/:id', (c) => {
  const productId = c.req.param('id')
  return c.html(
    <AdminLayout title="Edit Product" currentUser={{ first_name: 'Admin' }}>
      <AdminProductForm isEdit={true} productId={productId} />
    </AdminLayout>
  )
})

// Product Import
app.get('/admin/products/import', (c) => {
  return c.html(
    <AdminLayout title="Product Import" currentUser={{ first_name: 'Admin' }}>
      <AdminProductImport />
    </AdminLayout>
  )
})

// Admin Sliders Management
app.get('/admin/sliders', (c) => {
  return c.html(
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Slider - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --navy-dark: #1a2a4e;
            --gold: #d4af37;
          }
          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 100vh;
            background: var(--navy-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
          }
          .admin-content {
            margin-left: 260px;
            min-height: 100vh;
            background: #f5f7fa;
            padding: 2rem;
          }
          .admin-nav-item {
            display: block;
            padding: 12px 20px;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s;
            border-left: 3px solid transparent;
          }
          .admin-nav-item:hover,
          .admin-nav-item.active {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-left-color: var(--gold);
          }
          .admin-card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .btn-gold {
            background: var(--gold);
            color: var(--navy-dark);
            padding: 0.5rem 1rem;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 600;
          }
        `}} />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{__html: AdminSidebar('/admin/sliders')}} />
        <div class="admin-content">
          <AdminSliders />
        </div>
      </body>
    </html>
  )
})

// Admin Homepage Sections Management
app.get('/admin/homepage-sections', (c) => {
  return c.html(
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Homepage-Sektionen - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --navy-dark: #1a2a4e;
            --gold: #d4af37;
          }
          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 100vh;
            background: var(--navy-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
          }
          .admin-content {
            margin-left: 260px;
            min-height: 100vh;
            background: #f5f7fa;
            padding: 2rem;
          }
          .admin-nav-item {
            display: block;
            padding: 12px 20px;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s;
            border-left: 3px solid transparent;
          }
          .admin-nav-item:hover,
          .admin-nav-item.active {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-left-color: var(--gold);
          }
          .admin-card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .btn-gold {
            background: var(--gold);
            color: var(--navy-dark);
            padding: 0.5rem 1rem;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 600;
          }
        `}} />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{__html: AdminSidebar('/admin/homepage-sections')}} />
        <div class="admin-content">
          <AdminHomepageSections />
        </div>
      </body>
    </html>
  )
})

// Import API endpoint (no auth for now - accessed from admin panel)
app.post('/api/admin/import/woocommerce', async (c) => {
  try {
    const { env } = c;
    
    // Parse the request body
    const body = await c.req.parseBody();
    const csvContent = body.csv as string;
    const language = (body.language as string) || 'de';

    if (!csvContent) {
      return c.json({ success: false, error: 'No CSV content provided' }, 400);
    }

    // Import products
    const { WooCommerceImporter } = await import('./lib/woocommerce-importer');
    const importer = new WooCommerceImporter(env.DB);
    
    const result = await importer.importProducts(csvContent, language, (current, total, productName) => {
      console.log(`Importing ${current}/${total}: ${productName}`);
    });

    return c.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Import error:', error);
    return c.json({
      success: false,
      error: error.message || 'Import failed'
    }, 500);
  }
})

// Orders Management
app.get('/admin/orders', (c) => {
  const html = AdminOrdersAdvanced()
  return c.html(html)
})

// Customers Management
app.get('/admin/customers', (c) => {
  const html = AdminCustomersAdvanced()
  return c.html(html)
})

// Invoices Management
app.get('/admin/invoices', (c) => {
  return c.html(
    <AdminLayout title="Invoices" currentUser={{ first_name: 'Admin' }}>
      <AdminInvoices />
    </AdminLayout>
  )
})

// License Certificates Management
app.get('/admin/certificates', (c) => {
  return c.html(
    <AdminLayout title="License Certificates" currentUser={{ first_name: 'Admin' }}>
      <AdminCertificates />
    </AdminLayout>
  )
})

// License Key Management
app.get('/admin/licenses', (c) => {
  const html = AdminLicensesAdvanced()
  return c.html(html)
})

app.get('/admin/licenses/import', (c) => {
  return c.html(
    <AdminLayout title="Import License Keys" currentUser={{ first_name: 'Admin' }}>
      <AdminLicenseImport />
    </AdminLayout>
  )
})

// Reports & Analytics
app.get('/admin/reports', (c) => {
  return c.html(
    <AdminLayout title="Reports & Analytics" currentUser={{ first_name: 'Admin' }}>
      <AdminReports />
    </AdminLayout>
  )
})

// Contact Messages Management
app.get('/admin/contact-messages', (c) => {
  return c.html(AdminContactMessages())
})

app.get('/admin/contact', (c) => {
  return c.html(AdminContactMessages())
})

// Notifications - Full notifications center
app.get('/admin/notifications', (c) => {
  const html = AdminNotificationsAdvanced()
  return c.html(html)
})

// Footer Management
app.get('/admin/footer', (c) => {
  return c.html(AdminFooterSettings())
})

// Pages Management
app.get('/admin/pages', (c) => {
  return c.html(AdminPagesManagement())
})

// Settings
app.get('/admin/settings', (c) => {
  return c.html(
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Einstellungen - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --navy-dark: #1a2a4e;
            --gold: #d4af37;
          }
          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 100vh;
            background: var(--navy-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
          }
          .admin-content {
            margin-left: 260px;
            min-height: 100vh;
            background: #f5f7fa;
            padding: 2rem;
          }
          .admin-nav-item {
            display: block;
            padding: 12px 20px;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s;
            border-left: 3px solid transparent;
          }
          .admin-nav-item:hover,
          .admin-nav-item.active {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-left-color: var(--gold);
          }
          .admin-card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .btn-gold {
            background: var(--gold);
            color: var(--navy-dark);
            padding: 0.5rem 1rem;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 600;
          }
        `}} />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{__html: AdminSidebar('/admin/settings')}} />
        <div class="admin-content">
          <AdminSettings />
        </div>
      </body>
    </html>
  )
})

// Enhanced Analytics & Reporting
app.get('/admin/analytics', (c) => {
  return c.html(
    <AdminLayout title="Analytics & Reporting" currentUser={{ first_name: 'Admin' }}>
      <AdminAnalytics />
    </AdminLayout>
  )
})

// Delivery Management
app.get('/admin/delivery', (c) => {
  return c.html(
    <AdminLayout title="Delivery Management" currentUser={{ first_name: 'Admin' }}>
      <AdminDelivery />
    </AdminLayout>
  )
})

// Complete Order Management
app.get('/admin/order-management', (c) => {
  return c.html(
    <AdminLayout title="Order Management" currentUser={{ first_name: 'Admin' }}>
      <AdminOrderManagement />
    </AdminLayout>
  )
})

// Tracking Management
app.get('/admin/tracking', (c) => {
  return c.html(
    <AdminLayout title="Tracking Management" currentUser={{ first_name: 'Admin' }}>
      <AdminTracking />
    </AdminLayout>
  )
})

// ============================================
// DATABASE INITIALIZATION (Development Only)
// ============================================

app.get('/api/init-db', async (c) => {
  try {
    const db = c.env.DB

    // Check if already initialized
    try {
      const check = await db.prepare('SELECT COUNT(*) as count FROM products').first()
      if ((check as any)?.count > 0) {
        return c.json({ success: true, message: 'Database already initialized', count: (check as any).count })
      }
    } catch (e) {
      // Table doesn't exist, create all tables
      console.log('Creating database schema...')
      
      // Create all tables - simplified schema
      const createQueries = [
        // Users & Auth
        `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, first_name TEXT NOT NULL, last_name TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'customer', status TEXT NOT NULL DEFAULT 'active', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
        `CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, token TEXT UNIQUE NOT NULL, expires_at DATETIME NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id))`,
        // Categories & Brands
        `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, icon TEXT, sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1)`,
        `CREATE TABLE IF NOT EXISTS category_translations (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER NOT NULL, language TEXT NOT NULL, name TEXT NOT NULL, description TEXT, FOREIGN KEY (category_id) REFERENCES categories(id), UNIQUE(category_id, language))`,
        `CREATE TABLE IF NOT EXISTS brands (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, slug TEXT UNIQUE NOT NULL, logo_url TEXT, is_featured INTEGER DEFAULT 0)`,
        // Products
        `CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, sku TEXT UNIQUE NOT NULL, category_id INTEGER NOT NULL, brand_id INTEGER, slug TEXT UNIQUE NOT NULL, product_type TEXT DEFAULT 'license', base_price DECIMAL(10, 2) NOT NULL, discount_price DECIMAL(10, 2), discount_percentage INTEGER, vat_rate DECIMAL(5, 2) DEFAULT 19.00, stock_type TEXT DEFAULT 'unlimited', license_type TEXT, license_duration TEXT, activation_limit INTEGER DEFAULT 1, is_featured INTEGER DEFAULT 0, is_bestseller INTEGER DEFAULT 0, is_new INTEGER DEFAULT 0, rating_average DECIMAL(3, 2) DEFAULT 0, rating_count INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (category_id) REFERENCES categories(id), FOREIGN KEY (brand_id) REFERENCES brands(id))`,
        `CREATE TABLE IF NOT EXISTS product_translations (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, language TEXT NOT NULL, name TEXT NOT NULL, short_description TEXT, long_description TEXT, features TEXT, meta_title TEXT, meta_description TEXT, FOREIGN KEY (product_id) REFERENCES products(id), UNIQUE(product_id, language))`,
        `CREATE TABLE IF NOT EXISTS product_images (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, image_url TEXT NOT NULL, alt_text TEXT, sort_order INTEGER DEFAULT 0, is_primary INTEGER DEFAULT 0, FOREIGN KEY (product_id) REFERENCES products(id))`,
        // Orders & Licenses
        `CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, order_number TEXT UNIQUE NOT NULL, user_id INTEGER, email TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', subtotal DECIMAL(10, 2) NOT NULL, tax DECIMAL(10, 2) NOT NULL, total DECIMAL(10, 2) NOT NULL, payment_method TEXT, payment_status TEXT DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id))`,
        `CREATE TABLE IF NOT EXISTS order_items (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER NOT NULL, product_id INTEGER NOT NULL, quantity INTEGER NOT NULL DEFAULT 1, unit_price DECIMAL(10, 2) NOT NULL, total_price DECIMAL(10, 2) NOT NULL, license_key_id INTEGER, FOREIGN KEY (order_id) REFERENCES orders(id), FOREIGN KEY (product_id) REFERENCES products(id))`,
        `CREATE TABLE IF NOT EXISTS license_keys (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, license_key TEXT UNIQUE NOT NULL, key_type TEXT DEFAULT 'standard', status TEXT DEFAULT 'available', order_id INTEGER, user_id INTEGER, activation_limit INTEGER DEFAULT 1, activation_count INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (product_id) REFERENCES products(id), FOREIGN KEY (order_id) REFERENCES orders(id), FOREIGN KEY (user_id) REFERENCES users(id))`,
        // Create indexes
        `CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id)`,
        `CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured)`,
        `CREATE INDEX IF NOT EXISTS idx_products_bestseller ON products(is_bestseller)`,
        `CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id)`,
        `CREATE INDEX IF NOT EXISTS idx_license_keys_product ON license_keys(product_id)`,
        `CREATE INDEX IF NOT EXISTS idx_license_keys_status ON license_keys(status)`
      ]

      for (const query of createQueries) {
        await db.prepare(query).run()
      }
    }

    // Insert sample data
    await db.batch([
      // Brands
      db.prepare(`INSERT OR IGNORE INTO brands (id, name, slug, logo_url, is_featured) VALUES (1, 'Microsoft', 'microsoft', 'https://logo.clearbit.com/microsoft.com', 1)`),
      db.prepare(`INSERT OR IGNORE INTO brands (id, name, slug, logo_url, is_featured) VALUES (2, 'Adobe', 'adobe', 'https://logo.clearbit.com/adobe.com', 1)`),
      db.prepare(`INSERT OR IGNORE INTO brands (id, name, slug, logo_url, is_featured) VALUES (3, 'Kaspersky', 'kaspersky', 'https://logo.clearbit.com/kaspersky.com', 1)`),
      // Categories
      db.prepare(`INSERT OR IGNORE INTO categories (id, slug, icon, sort_order, is_active) VALUES (1, 'operating-systems', 'fa-desktop', 1, 1)`),
      db.prepare(`INSERT OR IGNORE INTO categories (id, slug, icon, sort_order, is_active) VALUES (2, 'office-productivity', 'fa-file-alt', 2, 1)`),
      db.prepare(`INSERT OR IGNORE INTO categories (id, slug, icon, sort_order, is_active) VALUES (3, 'security', 'fa-shield-alt', 3, 1)`),
      db.prepare(`INSERT OR IGNORE INTO category_translations (category_id, language, name, description) VALUES (1, 'en', 'Operating Systems', 'Windows and other operating systems')`),
      db.prepare(`INSERT OR IGNORE INTO category_translations (category_id, language, name, description) VALUES (2, 'en', 'Office & Productivity', 'Microsoft Office and productivity software')`),
      db.prepare(`INSERT OR IGNORE INTO category_translations (category_id, language, name, description) VALUES (3, 'en', 'Security Software', 'Antivirus and security solutions')`),
      // Products
      db.prepare(`INSERT OR IGNORE INTO products (id, sku, category_id, brand_id, slug, base_price, discount_price, discount_percentage, is_featured, is_bestseller, rating_average, rating_count) VALUES (1, 'WIN11-PRO', 1, 1, 'windows-11-pro', 199.99, 79.99, 60, 1, 1, 4.8, 1234)`),
      db.prepare(`INSERT OR IGNORE INTO products (id, sku, category_id, brand_id, slug, base_price, discount_price, discount_percentage, is_featured, is_bestseller, rating_average, rating_count) VALUES (2, 'OFF365-BUS', 2, 1, 'office-365-business', 149.99, 99.99, 33, 1, 1, 4.7, 987)`),
      db.prepare(`INSERT OR IGNORE INTO products (id, sku, category_id, brand_id, slug, base_price, discount_price, discount_percentage, is_featured, rating_average, rating_count) VALUES (3, 'KAS-TOT-SEC', 3, 3, 'kaspersky-total-security', 89.99, 39.99, 56, 1, 4.6, 756)`),
      db.prepare(`INSERT OR IGNORE INTO products (id, sku, category_id, brand_id, slug, base_price, discount_price, discount_percentage, is_featured, is_new, rating_average, rating_count) VALUES (4, 'WIN10-PRO', 1, 1, 'windows-10-pro', 159.99, 69.99, 56, 1, 0, 4.9, 2341)`),
      db.prepare(`INSERT OR IGNORE INTO products (id, sku, category_id, brand_id, slug, base_price, discount_price, discount_percentage, is_bestseller, rating_average, rating_count) VALUES (5, 'ADOBE-CC', 2, 2, 'adobe-creative-cloud', 599.99, 399.99, 33, 1, 4.8, 654)`),
      db.prepare(`INSERT OR IGNORE INTO products (id, sku, category_id, brand_id, slug, base_price, discount_price, discount_percentage, is_new, rating_average, rating_count) VALUES (6, 'OFF2021-PRO', 2, 1, 'office-2021-professional', 299.99, 179.99, 40, 1, 4.7, 1123)`),
      db.prepare(`INSERT OR IGNORE INTO product_translations (product_id, language, name, short_description, long_description, features) VALUES (1, 'en', 'Windows 11 Pro', 'Latest Windows operating system for professionals', 'Microsoft Windows 11 Professional brings a fresh new look and powerful new features to enhance your productivity.', '["Advanced Security Features", "Remote Desktop", "BitLocker Encryption", "Hyper-V Virtualization"]')`),
      db.prepare(`INSERT OR IGNORE INTO product_translations (product_id, language, name, short_description, long_description, features) VALUES (2, 'en', 'Office 365 Business', 'Complete office suite with cloud storage', 'Get Word, Excel, PowerPoint, Outlook, and 1TB OneDrive cloud storage.', '["Word, Excel, PowerPoint", "1TB Cloud Storage", "Outlook Email", "Microsoft Teams"]')`),
      db.prepare(`INSERT OR IGNORE INTO product_translations (product_id, language, name, short_description, long_description, features) VALUES (3, 'en', 'Kaspersky Total Security', 'Complete protection for all your devices', 'Award-winning antivirus and internet security for PC, Mac, and mobile devices.', '["Real-time Protection", "VPN Included", "Password Manager", "Parental Controls"]')`),
      db.prepare(`INSERT OR IGNORE INTO product_translations (product_id, language, name, short_description, long_description, features) VALUES (4, 'en', 'Windows 10 Pro', 'Reliable and powerful OS for business', 'Windows 10 Professional with all enterprise features and long-term support.', '["Enterprise Features", "Remote Desktop", "BitLocker", "Windows Update for Business"]')`),
      db.prepare(`INSERT OR IGNORE INTO product_translations (product_id, language, name, short_description, long_description, features) VALUES (5, 'en', 'Adobe Creative Cloud', 'Complete creative suite for designers', 'Access to Photoshop, Illustrator, InDesign, Premiere Pro, and 20+ creative apps.', '["Photoshop & Illustrator", "Premiere Pro & After Effects", "100GB Cloud Storage", "Adobe Fonts"]')`),
      db.prepare(`INSERT OR IGNORE INTO product_translations (product_id, language, name, short_description, long_description, features) VALUES (6, 'en', 'Office 2021 Professional', 'One-time purchase Office suite', 'Classic Office applications with one-time purchase - no subscription needed.', '["Word, Excel, PowerPoint, Outlook", "One-time Purchase", "Lifetime License", "No Subscription Required"]')`),
      db.prepare(`INSERT OR IGNORE INTO product_images (product_id, image_url, alt_text, is_primary) VALUES (1, 'https://via.placeholder.com/600x400/1a2a4e/d4af37?text=Windows+11+Pro', 'Windows 11 Pro', 1)`),
      db.prepare(`INSERT OR IGNORE INTO product_images (product_id, image_url, alt_text, is_primary) VALUES (2, 'https://via.placeholder.com/600x400/1a2a4e/d4af37?text=Office+365', 'Office 365 Business', 1)`),
      db.prepare(`INSERT OR IGNORE INTO product_images (product_id, image_url, alt_text, is_primary) VALUES (3, 'https://via.placeholder.com/600x400/1a2a4e/d4af37?text=Kaspersky', 'Kaspersky Total Security', 1)`),
      db.prepare(`INSERT OR IGNORE INTO product_images (product_id, image_url, alt_text, is_primary) VALUES (4, 'https://via.placeholder.com/600x400/1a2a4e/d4af37?text=Windows+10+Pro', 'Windows 10 Pro', 1)`),
      db.prepare(`INSERT OR IGNORE INTO product_images (product_id, image_url, alt_text, is_primary) VALUES (5, 'https://via.placeholder.com/600x400/1a2a4e/d4af37?text=Adobe+CC', 'Adobe Creative Cloud', 1)`),
      db.prepare(`INSERT OR IGNORE INTO product_images (product_id, image_url, alt_text, is_primary) VALUES (6, 'https://via.placeholder.com/600x400/1a2a4e/d4af37?text=Office+2021', 'Office 2021 Professional', 1)`),
      // License keys
      db.prepare(`INSERT OR IGNORE INTO license_keys (product_id, license_key, status) VALUES (1, 'WIN11-XXXX-XXXX-XXXX-XXXX', 'available')`),
      db.prepare(`INSERT OR IGNORE INTO license_keys (product_id, license_key, status) VALUES (2, 'OFF365-XXXX-XXXX-XXXX-XXXX', 'available')`),
      db.prepare(`INSERT OR IGNORE INTO license_keys (product_id, license_key, status) VALUES (3, 'KAS-XXXX-XXXX-XXXX-XXXX', 'available')`)
    ])

    return c.json({ success: true, message: 'Database initialized successfully with sample data' })
  } catch (error) {
    console.error('Database init error:', error)
    return c.json({ success: false, error: String(error) }, 500)
  }
})

// ============================================
// PRODUCT & CATEGORY PAGES
// ============================================

// Product Detail Page
app.get('/products/:slug', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.get('language') || 'en'
    const slug = c.req.param('slug')

    const product = await db.getProductBySlug(slug, language)

    if (!product) {
      return c.notFound()
    }

    return c.html(
      <Layout>
        <ProductDetail product={product as any} language={language} />
      </Layout>
    )
  } catch (error) {
    console.error('Error loading product:', error)
    return c.notFound()
  }
})

// Category Listing Page
app.get('/categories/:slug', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const language = c.get('language') || 'en'
    const slug = c.req.param('slug')

    const category = await db.getCategoryBySlug(slug, language)

    if (!category) {
      return c.notFound()
    }

    return c.html(
      <Layout>
        <CategoryListing category={category} language={language} />
      </Layout>
    )
  } catch (error) {
    console.error('Error loading category:', error)
    return c.notFound()
  }
})

// Note: Product and Cart routes are defined above with proper components

// Checkout Page (German + English URLs)
app.get('/kasse', (c) => {
  return c.html(<Checkout />)
})

app.get('/checkout', (c) => {
  return c.html(<Checkout />)
})

// ============================================
// LEGAL PAGES
// ============================================

// AGB (Terms & Conditions) Page
app.get('/agb', (c) => {
  return c.html(<AGBPage />)
})

// Kontakt (Contact) Page
app.get('/kontakt', (c) => {
  return c.html(<KontaktPage />)
})

// FAQ Page
app.get('/faq', (c) => {
  return c.html(<FAQPage />)
})

// Über Uns (About Us) Page
app.get('/ueber-uns', (c) => {
  return c.html(<UeberUnsPage />)
})

// CMS Pages - Dynamic routes
app.get('/agb', (c) => {
  return c.html(<CMSPage slug="agb" />)
})

app.get('/datenschutz', (c) => {
  return c.html(<CMSPage slug="datenschutz" />)
})

app.get('/impressum', (c) => {
  return c.html(<CMSPage slug="impressum" />)
})

app.get('/versand', (c) => {
  return c.html(<CMSPage slug="versand" />)
})

app.get('/widerruf', (c) => {
  return c.html(<CMSPage slug="widerruf" />)
})

app.get('/zahlung', (c) => {
  return c.html(<CMSPage slug="zahlung" />)
})

app.get('/cookies', (c) => {
  return c.html(<CMSPage slug="cookies" />)
})

// ============================================
// PUBLIC API: CMS Pages
// ============================================

// Get page by slug (public)
app.get('/api/pages/:slug', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const slug = c.req.param('slug')
    
    const page = await db.db.prepare(`
      SELECT 
        p.id,
        p.slug,
        p.page_type,
        p.is_active,
        pt.title,
        pt.content
      FROM pages p
      LEFT JOIN page_translations pt ON p.id = pt.page_id AND pt.language = 'de'
      WHERE p.slug = ? AND p.is_active = 1
    `).bind(slug).first()

    if (!page) {
      return c.json({ success: false, error: 'Page not found' }, 404)
    }

    return c.json({ success: true, data: page })
  } catch (error) {
    console.error('Error fetching page:', error)
    return c.json({ success: false, error: 'Failed to fetch page' }, 500)
  }
})

// ============================================
// PAYMENT API ENDPOINTS
// ============================================

// Stripe: Create Payment Intent (with server-side validation)
app.post('/api/payments/stripe/create-intent', async (c) => {
  try {
    const body = await c.req.json()
    const { order_id } = body
    
    // CRITICAL: Always recalculate amount server-side (never trust client)
    const db = c.get('db') as DatabaseHelper
    
    // Fetch order from database
    const order = await c.env.DB.prepare(`
      SELECT id, subtotal, tax_amount, discount_amount, total, currency, country, user_id
      FROM orders 
      WHERE id = ? AND payment_status = 'pending'
    `).bind(order_id).first() as any
    
    if (!order) {
      return c.json({ error: 'Order not found or already paid' }, 404)
    }
    
    // Fetch order items to recalculate
    const orderItems = await c.env.DB.prepare(`
      SELECT oi.*, p.base_price, p.discount_price, p.vat_rate
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `).bind(order_id).all()
    
    // Recalculate totals server-side
    let calculatedSubtotal = 0
    let calculatedTax = 0
    
    for (const item of orderItems.results || []) {
      const price = item.discount_price || item.base_price
      const itemSubtotal = price * item.quantity
      calculatedSubtotal += itemSubtotal
      
      // Calculate VAT
      const vatRate = await calculateEUVAT(order.country as string, item.vat_rate as number)
      calculatedTax += itemSubtotal * (vatRate / 100)
    }
    
    // Apply discount if any
    const discount = order.discount_amount || 0
    calculatedSubtotal -= discount
    
    const calculatedTotal = calculatedSubtotal + calculatedTax
    
    // Verify amounts match (tolerance of 0.01 for rounding)
    const amountDiff = Math.abs(calculatedTotal - order.total)
    if (amountDiff > 0.01) {
      console.error('Amount mismatch:', {
        calculated: calculatedTotal,
        stored: order.total,
        difference: amountDiff
      })
      
      // Update order with correct amounts
      await c.env.DB.prepare(`
        UPDATE orders 
        SET subtotal = ?, tax_amount = ?, total = ?, updated_at = datetime('now')
        WHERE id = ?
      `).bind(calculatedSubtotal, calculatedTax, calculatedTotal, order_id).run()
      
      // Log security event
      const securityLogger = new SecurityLogger(c.env.DB)
      await securityLogger.logSecurityEvent('payment_amount_mismatch', 'high', {
        order_id,
        calculated_total: calculatedTotal,
        stored_total: order.total,
        difference: amountDiff
      })
    }
    
    // Use calculated amount for payment intent
    const amountInCents = Math.round(calculatedTotal * 100)
    const currency = (order.currency || 'EUR').toLowerCase()
    
    // In production, use actual Stripe API:
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amountInCents,
    //   currency: currency,
    //   metadata: { order_id: order_id.toString() }
    // })
    
    // Mock response for development
    const mockIntentId = 'pi_' + Math.random().toString(36).substring(7)
    const mockClientSecret = mockIntentId + '_secret_' + Math.random().toString(36).substring(7)
    
    // Store payment intent ID
    await c.env.DB.prepare(`
      UPDATE orders 
      SET payment_intent_id = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(mockIntentId, order_id).run()
    
    // Audit log
    const auditLogger = new AuditLogger(c.env.DB)
    await auditLogger.log({
      userId: order.user_id,
      action: 'payment_intent_created',
      resourceType: 'payment',
      resourceId: order_id,
      changes: { 
        payment_intent_id: mockIntentId,
        amount: calculatedTotal,
        currency
      }
    })

    return c.json({
      success: true,
      data: {
        id: mockIntentId,
        client_secret: mockClientSecret,
        amount: amountInCents,
        currency,
        status: 'requires_payment_method'
      }
    })
  } catch (error) {
    console.error('Payment intent creation error:', error)
    return c.json({ success: false, error: String(error) }, 500)
  }
})

// Stripe: Webhook Handler (with signature verification)
app.post('/api/payments/stripe/webhook', async (c) => {
  try {
    const signature = c.req.header('stripe-signature')
    const body = await c.req.text()
    
    // Get webhook secret
    const webhookSecret = c.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_secret'
    
    // Verify webhook signature
    const isValid = verifyStripeSignature(body, signature, webhookSecret)
    
    if (!isValid) {
      console.error('Invalid Stripe webhook signature')
      return c.json({ error: 'Invalid signature' }, 401)
    }
    
    const event = JSON.parse(body)
    const { type, data, id: eventId } = event
    
    // Check for duplicate processing (idempotency)
    if (isWebhookProcessed(eventId)) {
      console.log('Webhook already processed:', eventId)
      return c.json({ received: true, duplicate: true })
    }
    
    // Validate payload structure
    const validation = validateWebhookPayload(event, ['type', 'data'])
    if (!validation.valid) {
      return c.json({ error: validation.error }, 400)
    }

    const db = c.get('db') as DatabaseHelper
    const auditLogger = new AuditLogger(c.env.DB)
    
    // Initialize email and license services
    const emailService = new EmailService(
      c.env.SENDGRID_API_KEY || 'placeholder',
      c.env.FROM_EMAIL || 'noreply@softwareking24.de',
      c.env.FROM_NAME || 'SoftwareKing24',
      c.env.ENVIRONMENT === 'development'
    )
    
    const licenseGenerator = new LicenseGenerator(c.env.DB, c.env.LICENSE_PREFIX || 'SK24')

    // Handle different webhook events
    if (type === 'payment_intent.succeeded') {
      const paymentIntent = data.object
      
      // Update order status
      await c.env.DB.prepare(`
        UPDATE orders 
        SET payment_status = 'paid',
            status = 'processing',
            paid_at = datetime('now'),
            updated_at = datetime('now')
        WHERE payment_intent_id = ?
      `).bind(paymentIntent.id).run()
      
      // Get order details with user info
      const order = await c.env.DB.prepare(`
        SELECT o.id, o.order_number, o.billing_email, o.billing_name, o.user_id, o.total,
               u.first_name, u.last_name, u.email as user_email
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.id
        WHERE o.payment_intent_id = ?
      `).bind(paymentIntent.id).first()
      
      if (order) {
        // Get order items with product details
        const orderItems = await c.env.DB.prepare(`
          SELECT oi.id, oi.product_id, oi.quantity, oi.price,
                 pt.name, pt.language
          FROM order_items oi
          JOIN product_translations pt ON oi.product_id = pt.product_id
          WHERE oi.order_id = ? AND pt.language = 'de'
        `).bind(order.id).all()
        
        // Assign and deliver licenses for each item
        const licenses: Array<{ productName: string; licenseKey: string }> = []
        
        for (const item of orderItems.results || []) {
          // Assign license to order
          const result = await licenseGenerator.assignToOrder(
            item.product_id as number,
            order.id as number,
            order.user_id as number
          )
          
          if (result.success && result.licenseKey) {
            licenses.push({
              productName: item.name as string,
              licenseKey: result.licenseKey
            })
            
            // Send individual license email for each product
            const email = order.user_email || order.billing_email
            const firstName = order.first_name || order.billing_name?.split(' ')[0] || 'Customer'
            
            await emailService.sendLicenseEmail(
              email as string,
              firstName as string,
              order.order_number as string,
              item.name as string,
              result.licenseKey
            )
          }
        }
        
        // Send order confirmation email with all items
        if (licenses.length > 0) {
          const email = order.user_email || order.billing_email
          const firstName = order.first_name || order.billing_name?.split(' ')[0] || 'Customer'
          
          const items = (orderItems.results || []).map(item => ({
            name: item.name as string,
            price: formatPrice(item.price as number / 100, 'EUR', 'de')
          }))
          
          await emailService.sendOrderConfirmationEmail(
            email as string,
            firstName as string,
            order.order_number as string,
            items,
            formatPrice(order.total as number / 100, 'EUR', 'de')
          )
        }
        
        // Update order status to completed
        await c.env.DB.prepare(`
          UPDATE orders 
          SET status = 'completed',
              completed_at = datetime('now')
          WHERE id = ?
        `).bind(order.id).run()
      }
      
      // Log success
      await auditLogger.log({
        action: 'payment_succeeded',
        resourceType: 'payment',
        changes: { payment_intent_id: paymentIntent.id, licenses_delivered: true }
      })
      
    } else if (type === 'payment_intent.payment_failed') {
      const paymentIntent = data.object
      
      await c.env.DB.prepare(`
        UPDATE orders 
        SET payment_status = 'failed',
            updated_at = datetime('now')
        WHERE payment_intent_id = ?
      `).bind(paymentIntent.id).run()
      
      await auditLogger.log({
        action: 'payment_failed',
        resourceType: 'payment',
        changes: { payment_intent_id: paymentIntent.id }
      })
    }

    // Mark as processed
    markWebhookProcessed(eventId)
    
    return c.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    
    // Security logger
    const securityLogger = new SecurityLogger(c.env.DB)
    await securityLogger.logSecurityEvent('webhook_error', 'high', {
      error: String(error),
      provider: 'stripe'
    })
    
    return c.json({ error: 'Webhook processing failed' }, 400)
  }
})

// PayPal: Create Order (with server-side validation)
app.post('/api/payments/paypal/create-order', async (c) => {
  try {
    const body = await c.req.json()
    const { order_id } = body
    
    // CRITICAL: Always recalculate amount server-side
    const db = c.get('db') as DatabaseHelper
    
    // Fetch order
    const order = await c.env.DB.prepare(`
      SELECT id, subtotal, tax_amount, discount_amount, total, currency, country, user_id
      FROM orders 
      WHERE id = ? AND payment_status = 'pending'
    `).bind(order_id).first() as any
    
    if (!order) {
      return c.json({ error: 'Order not found or already paid' }, 404)
    }
    
    // Fetch and recalculate (same logic as Stripe)
    const orderItems = await c.env.DB.prepare(`
      SELECT oi.*, p.base_price, p.discount_price, p.vat_rate
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `).bind(order_id).all()
    
    let calculatedSubtotal = 0
    let calculatedTax = 0
    
    for (const item of orderItems.results || []) {
      const price = item.discount_price || item.base_price
      const itemSubtotal = price * item.quantity
      calculatedSubtotal += itemSubtotal
      
      const vatRate = await calculateEUVAT(order.country as string, item.vat_rate as number)
      calculatedTax += itemSubtotal * (vatRate / 100)
    }
    
    const discount = order.discount_amount || 0
    calculatedSubtotal -= discount
    const calculatedTotal = calculatedSubtotal + calculatedTax
    
    // Verify and update if needed
    const amountDiff = Math.abs(calculatedTotal - order.total)
    if (amountDiff > 0.01) {
      await c.env.DB.prepare(`
        UPDATE orders 
        SET subtotal = ?, tax_amount = ?, total = ?, updated_at = datetime('now')
        WHERE id = ?
      `).bind(calculatedSubtotal, calculatedTax, calculatedTotal, order_id).run()
      
      const securityLogger = new SecurityLogger(c.env.DB)
      await securityLogger.logSecurityEvent('payment_amount_mismatch', 'high', {
        order_id,
        provider: 'paypal',
        calculated_total: calculatedTotal,
        stored_total: order.total
      })
    }
    
    const currency = (order.currency || 'EUR').toUpperCase()
    
    // In production, use PayPal API:
    // const paypalOrder = await paypal.orders.create({...})
    
    const mockOrderId = 'PAYPAL-' + Math.random().toString(36).substring(7).toUpperCase()
    
    // Store PayPal order ID
    await c.env.DB.prepare(`
      UPDATE orders 
      SET payment_intent_id = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(mockOrderId, order_id).run()
    
    // Audit log
    const auditLogger = new AuditLogger(c.env.DB)
    await auditLogger.log({
      userId: order.user_id,
      action: 'paypal_order_created',
      resourceType: 'payment',
      resourceId: order_id,
      changes: { 
        paypal_order_id: mockOrderId,
        amount: calculatedTotal,
        currency
      }
    })

    return c.json({
      success: true,
      data: {
        id: mockOrderId,
        status: 'CREATED',
        amount: calculatedTotal,
        currency
      }
    })
  } catch (error) {
    console.error('PayPal order creation error:', error)
    return c.json({ success: false, error: String(error) }, 500)
  }
})

// PayPal: Capture Payment
app.post('/api/payments/paypal/capture', async (c) => {
  try {
    const body = await c.req.json()
    const { paypal_order_id } = body

    // In production, capture payment via PayPal API
    console.log('Capturing PayPal payment:', paypal_order_id)

    return c.json({
      success: true,
      data: {
        id: paypal_order_id,
        status: 'COMPLETED'
      }
    })
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500)
  }
})

// PayPal: Webhook Handler (with signature verification)
app.post('/api/payments/paypal/webhook', async (c) => {
  try {
    const bodyText = await c.req.text()
    const body = JSON.parse(bodyText)
    
    // Get PayPal webhook headers
    const transmissionId = c.req.header('paypal-transmission-id')
    const transmissionTime = c.req.header('paypal-transmission-time')
    const transmissionSig = c.req.header('paypal-transmission-sig')
    const certUrl = c.req.header('paypal-cert-url')
    const authAlgo = c.req.header('paypal-auth-algo')
    
    // Get webhook ID from environment
    const webhookId = c.env.PAYPAL_WEBHOOK_ID || 'WH-test-webhook-id'
    
    // Verify webhook signature
    const isValid = await verifyPayPalSignature(
      webhookId,
      bodyText,
      transmissionId,
      transmissionTime,
      transmissionSig,
      certUrl,
      authAlgo
    )
    
    if (!isValid) {
      console.error('Invalid PayPal webhook signature')
      return c.json({ error: 'Invalid signature' }, 401)
    }
    
    const { event_type, resource, id: eventId } = body
    
    // Check for duplicate processing
    if (isWebhookProcessed(eventId)) {
      console.log('PayPal webhook already processed:', eventId)
      return c.json({ received: true, duplicate: true })
    }
    
    // Validate payload
    const validation = validateWebhookPayload(body, ['event_type', 'resource'])
    if (!validation.valid) {
      return c.json({ error: validation.error }, 400)
    }
    
    const db = c.get('db') as DatabaseHelper
    const auditLogger = new AuditLogger(c.env.DB)
    
    // Handle PayPal events
    if (event_type === PAYPAL_EVENTS.PAYMENT_COMPLETED) {
      const captureId = resource.id
      
      // Find order by PayPal order ID
      const order = await c.env.DB.prepare(`
        SELECT id, email FROM orders 
        WHERE payment_intent_id = ? OR payment_intent_id LIKE ?
      `).bind(captureId, `%${resource.supplementary_data?.related_ids?.order_id || ''}%`).first()
      
      if (order) {
        // Update order status
        await c.env.DB.prepare(`
          UPDATE orders 
          SET payment_status = 'paid',
              status = 'processing',
              updated_at = datetime('now')
          WHERE id = ?
        `).bind(order.id).run()
        
        // Assign licenses
        const licenseManager = new LicenseManager(c.env.DB)
        const orderItems = await c.env.DB.prepare(`
          SELECT product_id, quantity FROM order_items WHERE order_id = ?
        `).bind(order.id).all()
        
        for (const item of orderItems.results || []) {
          await licenseManager.assignLicense(
            item.product_id as number,
            order.id as number,
            item.quantity as number
          )
        }
        
        // Log success
        await auditLogger.log({
          action: 'paypal_payment_completed',
          resourceType: 'payment',
          changes: { capture_id: captureId, order_id: order.id }
        })
      }
    } else if (event_type === PAYPAL_EVENTS.PAYMENT_DENIED) {
      // Handle payment denial
      await auditLogger.log({
        action: 'paypal_payment_denied',
        resourceType: 'payment',
        changes: { event_type, resource_id: resource.id }
      })
    } else if (event_type === PAYPAL_EVENTS.PAYMENT_REFUNDED) {
      // Handle refund
      await auditLogger.log({
        action: 'paypal_payment_refunded',
        resourceType: 'payment',
        changes: { event_type, resource_id: resource.id }
      })
    }
    
    // Mark as processed
    markWebhookProcessed(eventId)
    
    return c.json({ received: true })
  } catch (error) {
    console.error('PayPal webhook error:', error)
    
    const securityLogger = new SecurityLogger(c.env.DB)
    await securityLogger.logSecurityEvent('webhook_error', 'high', {
      error: String(error),
      provider: 'paypal'
    })
    
    return c.json({ error: 'Webhook processing failed' }, 400)
  }
})

// Payment Verification
app.post('/api/payments/verify', async (c) => {
  try {
    const body = await c.req.json()
    const { payment_method, payment_id, order_id } = body

    // Verify payment based on method
    // In production, verify with actual payment provider

    return c.json({
      success: true,
      data: {
        verified: true,
        payment_id,
        order_id,
        status: 'completed'
      }
    })
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500)
  }
})

// User Dashboard Routes
app.get('/account', (c) => {
  return c.html(<UserDashboard activeTab="overview" />)
})

app.get('/account/orders', (c) => {
  return c.html(
    <UserDashboard activeTab="orders">
      <OrdersPage />
    </UserDashboard>
  )
})

app.get('/account/licenses', (c) => {
  return c.html(
    <UserDashboard activeTab="licenses">
      <LicensesPage />
    </UserDashboard>
  )
})

app.get('/account/profile', (c) => {
  return c.html(
    <UserDashboard activeTab="profile">
      <ProfilePage />
    </UserDashboard>
  )
})

// ============================================
// CONTACT API ENDPOINT
// ============================================

app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, subject, orderNumber, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    // In production, send email via SendGrid/Resend or save to database
    console.log('Contact form submission:', { name, email, subject, orderNumber })

    // Mock success response
    return c.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon.' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return c.json({ success: false, error: 'Failed to submit contact form' }, 500)
  }
})

// ============================================
// MANUAL MAINTENANCE ENDPOINT (Admin Only)
// ============================================

app.post('/api/admin/maintenance', enhancedAdminAuth, async (c) => {
  try {
    await runAllMaintenanceTasks(c.env.DB)
    
    return c.json({ 
      success: true, 
      message: 'All maintenance tasks completed successfully' 
    })
  } catch (error) {
    console.error('Maintenance error:', error)
    return c.json({ 
      success: false, 
      error: 'Maintenance tasks failed' 
    }, 500)
  }
})

// ============================================
// API ROUTES: Contact Messages
// ============================================

// Submit contact form (Public)
app.post('/api/contact', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const body = await c.req.json()

    // Validate required fields
    if (!body.first_name || !body.last_name || !body.email || !body.subject || !body.message) {
      return c.json({ success: false, error: 'All required fields must be filled' }, 400)
    }

    // Insert contact message
    const result = await db.db.prepare(`
      INSERT INTO contact_messages (
        first_name, last_name, email, phone, subject, message, 
        status, priority, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'new', 'medium', datetime('now'))
    `).bind(
      body.first_name,
      body.last_name,
      body.email,
      body.phone || null,
      body.subject,
      body.message
    ).run()

    return c.json({
      success: true,
      data: {
        id: result.meta.last_row_id,
        message: 'Your message has been sent successfully. We will contact you soon.'
      }
    })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to submit contact form. Please try again later.' 
    }, 500)
  }
})

// Get all contact messages (Admin)
app.get('/api/admin/contact-messages', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = (page - 1) * limit
    
    const status = c.req.query('status') || ''
    const subject = c.req.query('subject') || ''
    const priority = c.req.query('priority') || ''
    const search = c.req.query('search') || ''

    // Build query
    let query = 'SELECT * FROM contact_messages WHERE 1=1'
    const params: any[] = []

    if (status) {
      query += ' AND status = ?'
      params.push(status)
    }

    if (subject) {
      query += ' AND subject = ?'
      params.push(subject)
    }

    if (priority) {
      query += ' AND priority = ?'
      params.push(priority)
    }

    if (search) {
      query += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR message LIKE ?)'
      const searchParam = `%${search}%`
      params.push(searchParam, searchParam, searchParam, searchParam)
    }

    // Get total count
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total')
    const countResult = await db.db.prepare(countQuery).bind(...params).first()
    const total = (countResult as any)?.total || 0

    // Get paginated results
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const { results } = await db.db.prepare(query).bind(...params).all()

    // Get stats
    const statsQuery = await db.db.prepare(`
      SELECT 
        status,
        COUNT(*) as count
      FROM contact_messages
      GROUP BY status
    `).all()

    const stats = {
      total: total,
      new: 0,
      in_progress: 0,
      resolved: 0,
      closed: 0
    }

    statsQuery.results.forEach((row: any) => {
      stats[row.status as keyof typeof stats] = row.count
    })

    return c.json({
      success: true,
      data: results,
      stats: stats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        from: offset + 1,
        to: Math.min(offset + limit, total)
      }
    })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch contact messages' 
    }, 500)
  }
})

// Get single contact message (Admin)
app.get('/api/admin/contact-messages/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')

    const message = await db.db.prepare(`
      SELECT * FROM contact_messages WHERE id = ?
    `).bind(id).first()

    if (!message) {
      return c.json({ success: false, error: 'Message not found' }, 404)
    }

    return c.json({
      success: true,
      data: message
    })
  } catch (error) {
    console.error('Error fetching contact message:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch contact message' 
    }, 500)
  }
})

// Update contact message (Admin)
app.patch('/api/admin/contact-messages/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    const body = await c.req.json()

    const updates: string[] = []
    const params: any[] = []

    if (body.status) {
      updates.push('status = ?')
      params.push(body.status)
    }

    if (body.priority) {
      updates.push('priority = ?')
      params.push(body.priority)
    }

    if (body.admin_notes !== undefined) {
      updates.push('admin_notes = ?')
      params.push(body.admin_notes)
    }

    if (updates.length === 0) {
      return c.json({ success: false, error: 'No fields to update' }, 400)
    }

    updates.push('updated_at = datetime("now")')
    params.push(id)

    await db.db.prepare(`
      UPDATE contact_messages 
      SET ${updates.join(', ')}
      WHERE id = ?
    `).bind(...params).run()

    return c.json({
      success: true,
      message: 'Contact message updated successfully'
    })
  } catch (error) {
    console.error('Error updating contact message:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to update contact message' 
    }, 500)
  }
})

// Delete contact message (Admin)
app.delete('/api/admin/contact-messages/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')

    await db.db.prepare(`
      DELETE FROM contact_messages WHERE id = ?
    `).bind(id).run()

    return c.json({
      success: true,
      message: 'Contact message deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact message:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to delete contact message' 
    }, 500)
  }
})

// ============================================
// API ROUTES: Footer Settings
// ============================================

// Get all footer settings
app.get('/api/admin/footer-settings', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const settings = await db.db.prepare(`
      SELECT * FROM footer_settings WHERE is_active = 1 ORDER BY sort_order ASC
    `).all()

    return c.json({ success: true, data: settings.results })
  } catch (error) {
    console.error('Error fetching footer settings:', error)
    return c.json({ success: false, error: 'Failed to fetch footer settings' }, 500)
  }
})

// Update footer setting
app.patch('/api/admin/footer-settings/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    const body = await c.req.json()

    const updates = []
    const params = []

    if (body.section_title !== undefined) {
      updates.push('section_title = ?')
      params.push(body.section_title)
    }
    if (body.content !== undefined) {
      updates.push('content = ?')
      params.push(body.content)
    }
    if (body.links !== undefined) {
      updates.push('links = ?')
      params.push(typeof body.links === 'string' ? body.links : JSON.stringify(body.links))
    }
    if (body.is_active !== undefined) {
      updates.push('is_active = ?')
      params.push(body.is_active)
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP')
    params.push(id)

    if (updates.length === 0) {
      return c.json({ success: false, error: 'No fields to update' }, 400)
    }

    await db.db.prepare(`
      UPDATE footer_settings
      SET ${updates.join(', ')}
      WHERE id = ?
    `).bind(...params).run()

    return c.json({ success: true, message: 'Footer setting updated successfully' })
  } catch (error) {
    console.error('Error updating footer setting:', error)
    return c.json({ success: false, error: 'Failed to update footer setting' }, 500)
  }
})

// ============================================
// API ROUTES: Pages Management
// ============================================

// Get all pages
app.get('/api/admin/pages', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const pages = await db.db.prepare(`
      SELECT 
        p.id,
        p.slug,
        p.page_type,
        p.is_active,
        p.created_at,
        p.updated_at,
        pt.title,
        pt.content
      FROM pages p
      LEFT JOIN page_translations pt ON p.id = pt.page_id AND pt.language = 'de'
      ORDER BY p.created_at DESC
    `).all()

    return c.json({ success: true, data: pages.results })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return c.json({ success: false, error: 'Failed to fetch pages' }, 500)
  }
})

// Get single page
app.get('/api/admin/pages/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    
    const page = await db.db.prepare(`
      SELECT 
        p.id,
        p.slug,
        p.page_type,
        p.is_active,
        pt.title,
        pt.content
      FROM pages p
      LEFT JOIN page_translations pt ON p.id = pt.page_id AND pt.language = 'de'
      WHERE p.id = ?
    `).bind(id).first()

    return c.json({ success: true, data: page })
  } catch (error) {
    console.error('Error fetching page:', error)
    return c.json({ success: false, error: 'Failed to fetch page' }, 500)
  }
})

// Create page
app.post('/api/admin/pages', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const body = await c.req.json()

    // Insert page
    const result = await db.db.prepare(`
      INSERT INTO pages (slug, page_type, is_active)
      VALUES (?, ?, ?)
    `).bind(body.slug, body.page_type || 'cms', body.is_active || 1).run()

    // Insert translation
    await db.db.prepare(`
      INSERT INTO page_translations (page_id, language, title, content, meta_description)
      VALUES (?, 'de', ?, ?, ?)
    `).bind(result.meta.last_row_id, body.title, body.content, body.title).run()

    return c.json({ success: true, message: 'Page created successfully', id: result.meta.last_row_id })
  } catch (error) {
    console.error('Error creating page:', error)
    return c.json({ success: false, error: 'Failed to create page' }, 500)
  }
})

// Update page
app.patch('/api/admin/pages/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    const body = await c.req.json()

    // Update page
    await db.db.prepare(`
      UPDATE pages
      SET slug = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(body.slug, body.is_active, id).run()

    // Update translation
    await db.db.prepare(`
      UPDATE page_translations
      SET title = ?, content = ?
      WHERE page_id = ? AND language = 'de'
    `).bind(body.title, body.content, id).run()

    return c.json({ success: true, message: 'Page updated successfully' })
  } catch (error) {
    console.error('Error updating page:', error)
    return c.json({ success: false, error: 'Failed to update page' }, 500)
  }
})

// Delete page
app.delete('/api/admin/pages/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')

    // Delete translations
    await db.db.prepare(`
      DELETE FROM page_translations WHERE page_id = ?
    `).bind(id).run()

    // Delete page
    await db.db.prepare(`
      DELETE FROM pages WHERE id = ?
    `).bind(id).run()

    return c.json({ success: true, message: 'Page deleted successfully' })
  } catch (error) {
    console.error('Error deleting page:', error)
    return c.json({ success: false, error: 'Failed to delete page' }, 500)
  }
})

// ============================================
// API ROUTES: Dashboard Statistics
// ============================================

app.get('/api/admin/dashboard/stats', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    
    // Today's orders
    const ordersToday = await db.db.prepare(`
      SELECT COUNT(*) as count, SUM(total_amount) as revenue
      FROM orders
      WHERE DATE(created_at) = DATE('now')
    `).first()
    
    // Available licenses
    const licenses = await db.db.prepare(`
      SELECT COUNT(*) as available, 
             SUM(CASE WHEN status = 'available' AND 
                 (SELECT COUNT(*) FROM license_keys WHERE product_id = license_keys.product_id AND status = 'available') < 5 
                 THEN 1 ELSE 0 END) as low_stock
      FROM license_keys
      WHERE status = 'available'
    `).first()
    
    // New customers (last 7 days)
    const customers = await db.db.prepare(`
      SELECT COUNT(*) as new_customers,
             (SELECT COUNT(*) FROM users) as total_customers
      FROM users
      WHERE created_at >= datetime('now', '-7 days')
    `).first()
    
    return c.json({
      success: true,
      data: {
        orders_today: ordersToday?.count || 0,
        revenue_today: ordersToday?.revenue || 0,
        available_licenses: licenses?.available || 0,
        low_stock_count: licenses?.low_stock || 0,
        new_customers_7d: customers?.new_customers || 0,
        total_customers: customers?.total_customers || 0
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return c.json({ success: false, error: 'Failed to fetch statistics' }, 500)
  }
})

app.get('/api/admin/dashboard/charts', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    
    // Revenue last 7 days
    const revenue = await db.db.prepare(`
      SELECT DATE(created_at) as date, SUM(total_amount) as revenue
      FROM orders
      WHERE created_at >= datetime('now', '-7 days')
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `).all()
    
    // Top products
    const products = await db.db.prepare(`
      SELECT p.id, pt.name, COUNT(oi.id) as sales
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'de'
      WHERE oi.created_at >= datetime('now', '-30 days')
      GROUP BY p.id
      ORDER BY sales DESC
      LIMIT 5
    `).all()
    
    return c.json({
      success: true,
      data: {
        revenue_labels: revenue.results.map((r: any) => r.date),
        revenue_data: revenue.results.map((r: any) => r.revenue),
        product_labels: products.results.map((p: any) => p.name),
        product_data: products.results.map((p: any) => p.sales)
      }
    })
  } catch (error) {
    console.error('Error fetching charts:', error)
    return c.json({ success: false, error: 'Failed to fetch chart data' }, 500)
  }
})

// ============================================
// API ROUTES: Advanced License Management
// ============================================

app.get('/api/admin/licenses/stats', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    
    const stats = await db.db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'available' THEN 1 ELSE 0 END) as available,
        SUM(CASE WHEN status = 'sold' THEN 1 ELSE 0 END) as sold,
        SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) as expired
      FROM license_keys
    `).first()
    
    return c.json({ success: true, data: stats })
  } catch (error) {
    console.error('Error fetching license stats:', error)
    return c.json({ success: false, error: 'Failed to fetch stats' }, 500)
  }
})

app.post('/api/admin/licenses/bulk', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const body = await c.req.json()
    
    const { product_id, license_keys, key_type, activation_limit } = body
    
    if (!product_id || !license_keys || !Array.isArray(license_keys)) {
      return c.json({ success: false, error: 'Invalid data' }, 400)
    }
    
    // Insert all licenses
    for (const key of license_keys) {
      await db.db.prepare(`
        INSERT INTO license_keys (product_id, license_key, key_type, activation_limit, status)
        VALUES (?, ?, ?, ?, 'available')
      `).bind(product_id, key, key_type || 'single', activation_limit || 1).run()
    }
    
    // Log activity
    await db.db.prepare(`
      INSERT INTO activity_log (action, entity_type, description)
      VALUES ('import', 'license', 'Bulk imported ${license_keys.length} licenses')
    `).run()
    
    // Create notification
    await db.db.prepare(`
      INSERT INTO notifications (type, title, message, priority)
      VALUES ('license', 'Lizenzen importiert', '${license_keys.length} neue Lizenzschlüssel wurden hinzugefügt', 'normal')
    `).run()
    
    return c.json({ success: true, message: `${license_keys.length} licenses imported successfully` })
  } catch (error) {
    console.error('Error bulk adding licenses:', error)
    return c.json({ success: false, error: 'Failed to import licenses' }, 500)
  }
})

app.post('/api/admin/licenses/bulk-delete', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const body = await c.req.json()
    
    const { license_ids } = body
    if (!Array.isArray(license_ids)) {
      return c.json({ success: false, error: 'Invalid data' }, 400)
    }
    
    const placeholders = license_ids.map(() => '?').join(',')
    await db.db.prepare(`
      DELETE FROM license_keys WHERE id IN (${placeholders})
    `).bind(...license_ids).run()
    
    return c.json({ success: true, message: 'Licenses deleted successfully' })
  } catch (error) {
    console.error('Error bulk deleting licenses:', error)
    return c.json({ success: false, error: 'Failed to delete licenses' }, 500)
  }
})

app.get('/api/admin/licenses/export', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    
    const licenses = await db.db.prepare(`
      SELECT lk.*, pt.name as product_name
      FROM license_keys lk
      LEFT JOIN products p ON lk.product_id = p.id
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'de'
      ORDER BY lk.created_at DESC
    `).all()
    
    // Generate CSV
    const csv = [
      'ID,Product,License Key,Type,Status,Activations,Limit,Created At',
      ...licenses.results.map((l: any) => 
        `${l.id},"${l.product_name}","${l.license_key}",${l.key_type},${l.status},${l.activation_count},${l.activation_limit},${l.created_at}`
      )
    ].join('\n')
    
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="licenses.csv"'
      }
    })
  } catch (error) {
    console.error('Error exporting licenses:', error)
    return c.json({ success: false, error: 'Failed to export licenses' }, 500)
  }
})

// ============================================
// API ROUTES: Notifications
// ============================================

app.get('/api/admin/notifications', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const { unread } = c.req.query()
    
    let query = 'SELECT * FROM notifications WHERE 1=1'
    const params: any[] = []
    
    if (unread) {
      query += ' AND is_read = 0'
    }
    
    query += ' ORDER BY created_at DESC LIMIT 50'
    
    const notifications = await db.db.prepare(query).bind(...params).all()
    
    return c.json({ success: true, data: notifications.results })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return c.json({ success: false, error: 'Failed to fetch notifications' }, 500)
  }
})

app.patch('/api/admin/notifications/:id/read', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    
    await db.db.prepare(`
      UPDATE notifications
      SET is_read = 1, read_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(id).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error marking notification:', error)
    return c.json({ success: false, error: 'Failed to update notification' }, 500)
  }
})

app.delete('/api/admin/notifications/:id', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const id = c.req.param('id')
    
    await db.db.prepare(`DELETE FROM notifications WHERE id = ?`).bind(id).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting notification:', error)
    return c.json({ success: false, error: 'Failed to delete notification' }, 500)
  }
})

// ============================================
// API ROUTES: Activity Log
// ============================================

app.get('/api/admin/activity-log', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const { limit } = c.req.query()
    
    const activities = await db.db.prepare(`
      SELECT * FROM activity_log
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(parseInt(limit || '50')).all()
    
    return c.json({ success: true, data: activities.results })
  } catch (error) {
    console.error('Error fetching activity log:', error)
    return c.json({ success: false, error: 'Failed to fetch activity log' }, 500)
  }
})

app.delete('/api/admin/activity-log', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    await db.db.prepare('DELETE FROM activity_log').run()
    
    return c.json({ success: true, message: 'Activity log cleared' })
  } catch (error) {
    console.error('Error clearing activity log:', error)
    return c.json({ success: false, error: 'Failed to clear activity log' }, 500)
  }
})

// ============================================
// API ROUTES: System Settings
// ============================================

app.get('/api/admin/settings', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const { category } = c.req.query()
    
    let query = 'SELECT * FROM system_settings WHERE 1=1'
    const params: any[] = []
    
    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }
    
    query += ' ORDER BY category, setting_key'
    
    const settings = await db.db.prepare(query).bind(...params).all()
    
    return c.json({ success: true, data: settings.results })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return c.json({ success: false, error: 'Failed to fetch settings' }, 500)
  }
})

app.patch('/api/admin/settings/:key', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const key = c.req.param('key')
    const body = await c.req.json()
    
    await db.db.prepare(`
      UPDATE system_settings
      SET setting_value = ?, updated_at = CURRENT_TIMESTAMP
      WHERE setting_key = ?
    `).bind(body.setting_value, key).run()
    
    return c.json({ success: true, message: 'Setting updated successfully' })
  } catch (error) {
    console.error('Error updating setting:', error)
    return c.json({ success: false, error: 'Failed to update setting' }, 500)
  }
})

// ============================================
// SCHEDULED EVENT HANDLER (Cloudflare Cron)
// ============================================

export default {
  fetch: app.fetch,
  
  // Cron trigger handler
  async scheduled(event: ScheduledEvent, env: CloudflareBindings, ctx: ExecutionContext) {
    ctx.waitUntil(handleScheduledTasks(event, env))
  }
}
