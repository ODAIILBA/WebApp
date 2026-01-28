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
import { UserDashboard } from './components/dashboard-overview'
import { UserOrders } from './components/dashboard-orders'
import { UserDashboard } from './components/user-dashboard'
import { 
  formatPrice, 
  generateOrderNumber, 
  generateToken, 
  getSessionExpiration,
  hashPassword,
  verifyPassword,
  calculateVAT,
  safeJsonParse,
  generateProductSchema,
  generateFAQSchema
} from './utils/helpers'

// Security Middleware
import { 
  csrf, 
  loginRateLimiter, 
  apiRateLimiter, 
  adminRateLimiter,
  securityHeaders,
  enhancedAdminAuth,
  bruteForceProtection,
  requestSizeLimit
} from './middleware/security'

// Validation
import { UserSchemas, OrderSchemas, AdminSchemas, ContactSchemas } from './middleware/validation'

// License Management
import { LicenseManager, LicenseScheduler } from './lib/licenses'

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
app.use('/api/*', csrf.middleware())
app.use('/admin/*', csrf.middleware())

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
  await next()
})

// ============================================
// MIDDLEWARE: Language Detection
// ============================================

app.use('*', async (c, next) => {
  const url = new URL(c.req.url)
  const pathParts = url.pathname.split('/').filter(Boolean)
  const language = pathParts[0] === 'de' ? 'de' : 'en'
  c.set('language', language)
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
  return c.html(<CartPage />)
})

app.get('/cart', (c) => {
  return c.html(<CartPage />)
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

// ===========================
// USER DASHBOARD ROUTES
// ===========================

app.get('/konto', (c) => {
  return c.html(UserDashboard())
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

// ===========================
// USER DASHBOARD ROUTES
// ===========================

app.get('/konto', (c) => {
  return c.html(<UserDashboard />)
})

app.get('/account', (c) => {
  return c.html(<UserDashboard />)
})

// ============================================
// API ROUTES: Products
// ============================================

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
// API ROUTES: Authentication
// ============================================

app.post('/api/auth/register', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const body = await c.req.json()

    // Validate input
    if (!body.email || !body.password || !body.first_name || !body.last_name) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    // Check if user exists
    const existingUser = await db.getUserByEmail(body.email)
    if (existingUser) {
      return c.json({ success: false, error: 'Email already registered' }, 400)
    }

    // Hash password
    const passwordHash = await hashPassword(body.password)

    // Create user
    const userId = await db.createUser({
      email: body.email,
      password_hash: passwordHash,
      first_name: body.first_name,
      last_name: body.last_name,
      role: 'customer',
      language_preference: c.get('language') || 'en'
    })

    // Create session
    const token = generateToken()
    const expiresAt = getSessionExpiration()
    await db.createSession(userId, token, expiresAt)

    return c.json({ 
      success: true, 
      data: { 
        token,
        user: {
          id: userId,
          email: body.email,
          first_name: body.first_name,
          last_name: body.last_name,
          role: 'customer'
        }
      } 
    })
  } catch (error) {
    return c.json({ success: false, error: 'Registration failed' }, 500)
  }
})

app.post('/api/auth/login', async (c) => {
  try {
    const db = c.get('db') as DatabaseHelper
    const body = await c.req.json()

    // Validate input
    if (!body.email || !body.password) {
      return c.json({ success: false, error: 'Missing email or password' }, 400)
    }

    // Get user
    const user = await db.getUserByEmail(body.email)
    if (!user) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401)
    }

    // Verify password
    const isValid = await verifyPassword(body.password, user.password_hash)
    if (!isValid) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401)
    }

    // Create session
    const token = generateToken()
    const expiresAt = getSessionExpiration()
    await db.createSession(user.id, token, expiresAt)

    return c.json({ 
      success: true, 
      data: { 
        token,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        }
      } 
    })
  } catch (error) {
    return c.json({ success: false, error: 'Login failed' }, 500)
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

    // Validate input
    if (!body.email || !body.first_name || !body.last_name || !body.items || body.items.length === 0) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    // Calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of body.items) {
      const product = await db.getProductBySlug(item.slug, c.get('language') || 'en')
      if (!product) {
        return c.json({ success: false, error: `Product not found: ${item.slug}` }, 400)
      }

      const price = product.discount_price || product.base_price
      const quantity = item.quantity || 1
      const itemTotal = price * quantity
      
      subtotal += itemTotal

      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        product_sku: product.sku,
        quantity,
        unit_price: price,
        tax_rate: product.vat_rate,
        tax_amount: calculateVAT(itemTotal, product.vat_rate),
        total: itemTotal
      })
    }

    const taxAmount = calculateVAT(subtotal, 19.0) // Default VAT
    const total = subtotal + taxAmount

    // Create order
    const orderNumber = generateOrderNumber()
    const orderId = await db.createOrder({
      order_number: orderNumber,
      user_id: body.user_id || null,
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      company: body.company,
      vat_number: body.vat_number,
      country: body.country || 'DE',
      subtotal,
      tax_amount: taxAmount,
      discount_amount: 0,
      total,
      currency: 'EUR',
      language: c.get('language') || 'en'
    })

    // Add order items and assign license keys
    for (const item of orderItems) {
      await db.addOrderItem({
        order_id: orderId,
        ...item
      })

      // Assign license key if available
      const licenseKey = await db.getAvailableLicenseKey(item.product_id)
      if (licenseKey) {
        await db.assignLicenseKeyToOrder(licenseKey.id, orderId)
      }
    }

    return c.json({ 
      success: true, 
      data: {
        order_number: orderNumber,
        order_id: orderId,
        total,
        message: 'Order created successfully'
      }
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return c.json({ success: false, error: 'Failed to create order' }, 500)
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
const adminAuth = enhancedAdminAuth

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
app.get('/api/admin/licenses', adminAuth, async (c) => {
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

// ============================================
// ADMIN PAGE ROUTES
// ============================================

// Import admin components
import { AdminLayout, AdminDashboard } from './components/admin'
import { AdminProducts, AdminProductForm } from './components/admin-products'
import { AdminProductImport } from './components/admin-product-import'
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
  return c.html(
    <AdminLayout title="Dashboard" currentUser={{ first_name: 'Admin' }}>
      <AdminDashboard />
    </AdminLayout>
  )
})

// Products Management
app.get('/admin/products', (c) => {
  return c.html(
    <AdminLayout title="Products" currentUser={{ first_name: 'Admin' }}>
      <AdminProducts />
    </AdminLayout>
  )
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

// Import API endpoint
app.post('/api/admin/import/woocommerce', async (c) => {
  try {
    const { env } = c;
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
  return c.html(
    <AdminLayout title="Orders" currentUser={{ first_name: 'Admin' }}>
      <AdminOrders />
    </AdminLayout>
  )
})

// Customers Management
app.get('/admin/customers', (c) => {
  return c.html(
    <AdminLayout title="Customers" currentUser={{ first_name: 'Admin' }}>
      <AdminCustomers />
    </AdminLayout>
  )
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
  return c.html(
    <AdminLayout title="License Keys" currentUser={{ first_name: 'Admin' }}>
      <AdminLicenses />
    </AdminLayout>
  )
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

// Settings
app.get('/admin/settings', (c) => {
  return c.html(
    <AdminLayout title="Settings" currentUser={{ first_name: 'Admin' }}>
      <AdminSettings />
    </AdminLayout>
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

    // Handle different webhook events
    if (type === 'payment_intent.succeeded') {
      const paymentIntent = data.object
      
      // Update order status
      await c.env.DB.prepare(`
        UPDATE orders 
        SET payment_status = 'paid',
            status = 'processing',
            updated_at = datetime('now')
        WHERE payment_intent_id = ?
      `).bind(paymentIntent.id).run()
      
      // Assign licenses
      const order = await c.env.DB.prepare(`
        SELECT id, email FROM orders WHERE payment_intent_id = ?
      `).bind(paymentIntent.id).first()
      
      if (order) {
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
      }
      
      // Log success
      await auditLogger.log({
        action: 'payment_succeeded',
        resourceType: 'payment',
        changes: { payment_intent_id: paymentIntent.id }
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
// SCHEDULED EVENT HANDLER (Cloudflare Cron)
// ============================================

export default {
  fetch: app.fetch,
  
  // Cron trigger handler
  async scheduled(event: ScheduledEvent, env: CloudflareBindings, ctx: ExecutionContext) {
    ctx.waitUntil(handleScheduledTasks(event, env))
  }
}
