/**
 * License Service
 * Handles license key management: insert, validate, activate, assign
 */

import { AuditLogService } from './audit-log-service'

export interface License {
  id: number
  product_id: number
  order_id?: number
  license_key: string
  key_type: 'retail' | 'volume' | 'standard'
  status: 'available' | 'assigned' | 'used' | 'expired' | 'revoked'
  activation_limit: number
  activation_count: number
  expires_at?: string
  assigned_at?: string
  activated_at?: string
  revoked_at?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface InsertLicenseData {
  product_id: number
  license_key: string
  key_type: 'retail' | 'volume'
  activation_limit?: number
  expires_at?: string
  notes?: string
}

export interface ActivateLicenseData {
  license_key: string
  device_id?: string
  device_name?: string
  device_fingerprint?: string
}

export class LicenseService {
  constructor(
    private db: D1Database,
    private auditLog: AuditLogService
  ) {}

  /**
   * Insert a new license key (retail or volume)
   */
  async insertLicense(
    data: InsertLicenseData,
    adminId?: number,
    ipAddress?: string
  ): Promise<{ success: boolean; license?: License; error?: string }> {
    try {

      // Validate product exists
      const product = await this.db.prepare(`
        SELECT id, name FROM products WHERE id = ?
      `).bind(data.product_id).first()

      if (!product) {
        return { success: false, error: 'Product not found' }
      }

      // Check if license key already exists
      const existing = await this.db.prepare(`
        SELECT id FROM license_keys WHERE license_key = ?
      `).bind(data.license_key).first()

      if (existing) {
        return { success: false, error: 'License key already exists' }
      }

      // Set activation limit based on type
      const activationLimit = data.activation_limit || (data.key_type === 'retail' ? 1 : 50)

      // Insert license
      const result = await this.db.prepare(`
        INSERT INTO license_keys (
          product_id, license_key, key_type, status, 
          activation_limit, activation_count, expires_at, notes
        ) VALUES (?, ?, ?, 'available', ?, 0, ?, ?)
      `).bind(
        data.product_id,
        data.license_key,
        data.key_type,
        activationLimit,
        data.expires_at || null,
        data.notes || null
      ).run()

      const licenseId = result.meta.last_row_id

      // Log action
      await this.logLicenseAction(
        licenseId,
        'inserted',
        null,
        'available',
        { key_type: data.key_type, activation_limit: activationLimit },
        adminId,
        ipAddress
      )

      // Get created license
      const license = await this.getLicenseById(licenseId)

      return { success: true, license: license! }
    } catch (error: any) {
      console.error('[LicenseService] Insert license error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Validate a license key
   */
  async validateLicense(
    licenseKey: string
  ): Promise<{ 
    success: boolean
    valid?: boolean
    license?: License
    reason?: string
    error?: string 
  }> {
    try {

      const license = await this.db.prepare(`
        SELECT * FROM license_keys WHERE license_key = ?
      `).bind(licenseKey).first() as License | null

      if (!license) {
        return { success: true, valid: false, reason: 'License key not found' }
      }

      // Check if revoked
      if (license.status === 'revoked') {
        return { success: true, valid: false, reason: 'License key has been revoked', license }
      }

      // Check if expired
      if (license.expires_at && new Date(license.expires_at) < new Date()) {
        // Update status to expired
        await this.db.prepare(`
          UPDATE license_keys SET status = 'expired', updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(license.id).run()
        
        return { success: true, valid: false, reason: 'License key has expired', license }
      }

      // Check activation limit
      if (license.activation_count >= license.activation_limit) {
        return { success: true, valid: false, reason: 'Activation limit reached', license }
      }

      // License is valid
      return { 
        success: true, 
        valid: true, 
        license,
        reason: 'License is valid'
      }
    } catch (error: any) {
      console.error('[LicenseService] Validate license error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Activate a license key
   */
  async activateLicense(
    data: ActivateLicenseData,
    userId?: number,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{ success: boolean; license?: License; activation?: any; error?: string }> {
    try {

      // First validate the license
      const validation = await this.validateLicense(data.license_key)
      
      if (!validation.success) {
        return { success: false, error: validation.error }
      }

      if (!validation.valid) {
        return { success: false, error: validation.reason }
      }

      const license = validation.license!

      // For retail licenses, check if already activated
      if (license.key_type === 'retail' && license.activation_count > 0) {
        return { success: false, error: 'Retail license already activated' }
      }

      // Increment activation count
      const newCount = license.activation_count + 1
      const newStatus = (newCount >= license.activation_limit) ? 'used' : license.status

      await this.db.prepare(`
        UPDATE license_keys 
        SET activation_count = ?, 
            status = ?,
            activated_at = COALESCE(activated_at, CURRENT_TIMESTAMP),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(newCount, newStatus, license.id).run()

      // Record activation
      const activationResult = await this.db.prepare(`
        INSERT INTO license_activations (
          license_id, device_id, device_name, device_fingerprint, 
          ip_address, user_agent, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, 1)
      `).bind(
        license.id,
        data.device_id || null,
        data.device_name || null,
        data.device_fingerprint || null,
        ipAddress || 'unknown',
        userAgent || 'unknown'
      ).run()

      // Log action
      await this.logLicenseAction(
        license.id,
        'activated',
        license.status,
        newStatus,
        { 
          activation_count: newCount,
          device_id: data.device_id,
          device_name: data.device_name 
        },
        undefined,
        ipAddress
      )

      // Get updated license
      const updatedLicense = await this.getLicenseById(license.id)

      return { 
        success: true, 
        license: updatedLicense!,
        activation: { id: activationResult.meta.last_row_id }
      }
    } catch (error: any) {
      console.error('[LicenseService] Activate license error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Assign license to an order
   */
  async assignLicenseToOrder(
    orderId: number,
    orderItemId: number,
    productId: number,
    quantity: number,
    userId?: number,
    ipAddress?: string
  ): Promise<{ success: boolean; licenses?: License[]; error?: string }> {
    try {

      // Find available licenses for this product
      const availableLicenses = await this.db.prepare(`
        SELECT * FROM license_keys 
        WHERE product_id = ? AND status = 'available'
        ORDER BY created_at ASC
        LIMIT ?
      `).bind(productId, quantity).all()

      if (availableLicenses.results.length < quantity) {
        return { 
          success: false, 
          error: `Not enough licenses available. Required: ${quantity}, Available: ${availableLicenses.results.length}` 
        }
      }

      const assignedLicenses: License[] = []

      // Assign each license
      for (const license of availableLicenses.results as License[]) {
        await this.db.prepare(`
          UPDATE license_keys 
          SET order_id = ?, 
              status = 'assigned',
              assigned_at = CURRENT_TIMESTAMP,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(orderId, license.id).run()

        // Update order_item with license key
        await this.db.prepare(`
          UPDATE order_items 
          SET license_key = ?, license_assigned_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(license.license_key, orderItemId).run()

        // Log action
        await this.logLicenseAction(
          license.id,
          'assigned',
          'available',
          'assigned',
          { order_id: orderId, order_item_id: orderItemId },
          undefined,
          ipAddress
        )

        const updatedLicense = await this.getLicenseById(license.id)
        if (updatedLicense) {
          assignedLicenses.push(updatedLicense)
        }
      }

      // Log to audit
      if (userId) {
        await this.auditLog.log({
          userId: userId.toString(),
          action: 'license_assignment',
          module: 'license',
          details: { order_id: orderId, product_id: productId, quantity, license_ids: assignedLicenses.map(l => l.id) },
          ipAddress: ipAddress || 'unknown'
        })
      }

      return { success: true, licenses: assignedLicenses }
    } catch (error: any) {
      console.error('[LicenseService] Assign license error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Get license by ID
   */
  private async getLicenseById(id: number): Promise<License | null> {
    try {
      const license = await this.db.prepare(`
        SELECT * FROM license_keys WHERE id = ?
      `).bind(id).first() as License | null

      return license
    } catch (error) {
      console.error('[LicenseService] Get license by ID error:', error)
      return null
    }
  }

  /**
   * Log license action to history
   */
  private async logLicenseAction(
    licenseId: number,
    action: string,
    oldStatus: string | null,
    newStatus: string | null,
    details: any,
    adminId?: number,
    ipAddress?: string
  ): Promise<void> {
    try {
      await this.db.prepare(`
        INSERT INTO license_history (
          license_id, action, old_status, new_status, 
          details, performed_by_admin_id, ip_address
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(
        licenseId,
        action,
        oldStatus || null,
        newStatus || null,
        JSON.stringify(details),
        adminId || null,
        ipAddress || 'unknown'
      ).run()
    } catch (error) {
      console.error('[LicenseService] Log action error:', error)
      // Don't throw - logging failure shouldn't block main operation
    }
  }

  /**
   * Get licenses for a product
   */
  async getLicensesForProduct(
    productId: number,
    status?: string
  ): Promise<{ success: boolean; licenses?: License[]; error?: string }> {
    try {
      let query = 'SELECT * FROM license_keys WHERE product_id = ?'
      const bindings: any[] = [productId]

      if (status) {
        query += ' AND status = ?'
        bindings.push(status)
      }

      query += ' ORDER BY created_at DESC'

      const result = await this.db.prepare(query).bind(...bindings).all()

      return { success: true, licenses: result.results as License[] }
    } catch (error: any) {
      console.error('[LicenseService] Get licenses error:', error)
      return { success: false, error: error.message }
    }
  }
}
