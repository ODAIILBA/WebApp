/**
 * License API
 * RESTful API endpoints for license management
 */

import { Hono } from 'hono'
import { LicenseService } from '../services/license-service'
import { AuditLogService } from '../services/audit-log-service'

const licenseAPI = new Hono()

/**
 * POST /api/admin/licenses
 * Insert a new license key (Admin only)
 */
licenseAPI.post('/', async (c) => {
  try {
    const { env } = c
    const adminUser = c.get('user') // Should be set by auth middleware
    
    const { product_id, license_key, key_type, activation_limit, expires_at, notes } = await c.req.json()

    // Validate input
    if (!product_id || !license_key || !key_type) {
      return c.json({ success: false, error: 'Product ID, license key, and key type are required' }, 400)
    }

    if (!['retail', 'volume'].includes(key_type)) {
      return c.json({ success: false, error: 'Key type must be retail or volume' }, 400)
    }

    const auditLog = new AuditLogService(env.DB)
    const licenseService = new LicenseService(env.DB, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'

    const result = await licenseService.insertLicense(
      { product_id, license_key, key_type, activation_limit, expires_at, notes },
      adminUser?.id,
      ipAddress
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'License inserted successfully',
      license: result.license
    })
  } catch (error: any) {
    console.error('[License API] Insert endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/admin/licenses/bulk
 * Insert multiple license keys (Admin only)
 */
licenseAPI.post('/bulk', async (c) => {
  try {
    const { env } = c
    const adminUser = c.get('user')
    
    const { product_id, licenses, key_type, activation_limit } = await c.req.json()

    if (!product_id || !licenses || !Array.isArray(licenses) || licenses.length === 0) {
      return c.json({ success: false, error: 'Product ID and licenses array are required' }, 400)
    }

    const auditLog = new AuditLogService(env.DB)
    const licenseService = new LicenseService(env.DB, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'
    const results = []
    const errors = []

    for (const license_key of licenses) {
      const result = await licenseService.insertLicense(
        { product_id, license_key, key_type: key_type || 'retail', activation_limit },
        adminUser?.id,
        ipAddress
      )

      if (result.success) {
        results.push(result.license)
      } else {
        errors.push({ license_key, error: result.error })
      }
    }

    return c.json({
      success: true,
      message: `Inserted ${results.length} licenses`,
      inserted: results.length,
      failed: errors.length,
      licenses: results,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (error: any) {
    console.error('[License API] Bulk insert endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/licenses/validate
 * Validate a license key (Public)
 */
licenseAPI.post('/validate', async (c) => {
  try {
    const { env } = c
    const { license_key } = await c.req.json()

    if (!license_key) {
      return c.json({ success: false, error: 'License key is required' }, 400)
    }

    const auditLog = new AuditLogService(env.DB)
    const licenseService = new LicenseService(env.DB, auditLog)

    const result = await licenseService.validateLicense(license_key)

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 500)
    }

    return c.json({
      success: true,
      valid: result.valid,
      reason: result.reason,
      license: result.license ? {
        product_id: result.license.product_id,
        key_type: result.license.key_type,
        status: result.license.status,
        activation_count: result.license.activation_count,
        activation_limit: result.license.activation_limit,
        expires_at: result.license.expires_at
      } : undefined
    })
  } catch (error: any) {
    console.error('[License API] Validate endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/licenses/activate
 * Activate a license key (Public)
 */
licenseAPI.post('/activate', async (c) => {
  try {
    const { env } = c
    const user = c.get('user') // Optional - can be guest

    const { license_key, device_id, device_name, device_fingerprint } = await c.req.json()

    if (!license_key) {
      return c.json({ success: false, error: 'License key is required' }, 400)
    }

    const auditLog = new AuditLogService(env.DB)
    const licenseService = new LicenseService(env.DB, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'
    const userAgent = c.req.header('user-agent') || 'unknown'

    const result = await licenseService.activateLicense(
      { license_key, device_id, device_name, device_fingerprint },
      user?.id,
      ipAddress,
      userAgent
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'License activated successfully',
      license: {
        product_id: result.license!.product_id,
        key_type: result.license!.key_type,
        activation_count: result.license!.activation_count,
        activation_limit: result.license!.activation_limit,
        activated_at: result.license!.activated_at,
        expires_at: result.license!.expires_at
      },
      activation_id: result.activation?.id
    })
  } catch (error: any) {
    console.error('[License API] Activate endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * GET /api/admin/licenses/product/:productId
 * Get all licenses for a product (Admin only)
 */
licenseAPI.get('/product/:productId', async (c) => {
  try {
    const { env } = c
    const productId = parseInt(c.req.param('productId'))
    const status = c.req.query('status') // Optional filter

    const auditLog = new AuditLogService(env.DB)
    const licenseService = new LicenseService(env.DB, auditLog)

    const result = await licenseService.getLicensesForProduct(productId, status)

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 500)
    }

    return c.json({
      success: true,
      licenses: result.licenses,
      count: result.licenses?.length || 0
    })
  } catch (error: any) {
    console.error('[License API] Get licenses endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default licenseAPI
