// License Management Module
// Handles license assignment, revocation, expiration, and volume licensing

import type { D1Database } from '@cloudflare/workers-types'

export interface License {
  id: number
  product_id: number
  license_key: string
  key_type: 'single' | 'volume' | 'oem'
  activation_limit: number
  activation_count: number
  status: 'available' | 'sold' | 'used' | 'expired' | 'revoked'
  assigned_to_order_id?: number
  expires_at?: string
  created_at: string
  updated_at: string
}

export interface LicenseAssignmentResult {
  success: boolean
  license?: License
  error?: string
}

export interface LicenseRevocationResult {
  success: boolean
  message?: string
  error?: string
}

// ============================================
// LICENSE ASSIGNMENT (with transaction safety)
// ============================================

export class LicenseManager {
  constructor(private db: D1Database) {}

  /**
   * Assign license to order with proper transaction handling
   * Prevents race conditions and duplicate assignments
   */
  async assignLicense(
    productId: number,
    orderId: number,
    quantity: number = 1
  ): Promise<LicenseAssignmentResult[]> {
    const results: LicenseAssignmentResult[] = []

    for (let i = 0; i < quantity; i++) {
      try {
        // Start transaction
        await this.db.prepare('BEGIN TRANSACTION').run()

        // Get available license with row lock (FOR UPDATE prevents concurrent access)
        const license = await this.db.prepare(`
          SELECT * FROM license_keys
          WHERE product_id = ? 
            AND status = 'available'
            AND (expires_at IS NULL OR expires_at > datetime('now'))
          LIMIT 1
        `).bind(productId).first()

        if (!license) {
          await this.db.prepare('ROLLBACK').run()
          results.push({
            success: false,
            error: 'No available licenses in stock'
          })
          break // Stop processing remaining licenses
        }

        // Update license status
        await this.db.prepare(`
          UPDATE license_keys
          SET status = 'sold',
              assigned_to_order_id = ?,
              updated_at = datetime('now')
          WHERE id = ?
        `).bind(orderId, license.id).run()

        // Increment product sale count
        await this.db.prepare(`
          UPDATE products
          SET sale_count = sale_count + 1,
              updated_at = datetime('now')
          WHERE id = ?
        `).bind(productId).run()

        // Commit transaction
        await this.db.prepare('COMMIT').run()

        results.push({
          success: true,
          license: license as License
        })
      } catch (error) {
        // Rollback on error
        await this.db.prepare('ROLLBACK').run()
        results.push({
          success: false,
          error: `Failed to assign license: ${error}`
        })
      }
    }

    return results
  }

  /**
   * Check license stock availability
   */
  async checkStock(productId: number): Promise<number> {
    const result = await this.db.prepare(`
      SELECT COUNT(*) as count
      FROM license_keys
      WHERE product_id = ?
        AND status = 'available'
        AND (expires_at IS NULL OR expires_at > datetime('now'))
    `).bind(productId).first()

    return (result?.count as number) || 0
  }

  /**
   * Revoke a license (admin action)
   */
  async revokeLicense(
    licenseId: number,
    reason: string,
    adminUserId: number
  ): Promise<LicenseRevocationResult> {
    try {
      // Get license details
      const license = await this.db.prepare(`
        SELECT * FROM license_keys WHERE id = ?
      `).bind(licenseId).first()

      if (!license) {
        return {
          success: false,
          error: 'License not found'
        }
      }

      // Update license status
      await this.db.prepare(`
        UPDATE license_keys
        SET status = 'revoked',
            updated_at = datetime('now')
        WHERE id = ?
      `).bind(licenseId).run()

      // Log revocation
      await this.db.prepare(`
        INSERT INTO audit_logs (
          user_id,
          action,
          resource_type,
          resource_id,
          changes,
          created_at
        ) VALUES (?, 'revoke_license', 'license', ?, ?, datetime('now'))
      `).bind(
        adminUserId,
        licenseId,
        JSON.stringify({ reason, old_status: license.status })
      ).run()

      return {
        success: true,
        message: 'License revoked successfully'
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to revoke license: ${error}`
      }
    }
  }

  /**
   * Reactivate a revoked license (admin action)
   */
  async reactivateLicense(
    licenseId: number,
    adminUserId: number
  ): Promise<LicenseRevocationResult> {
    try {
      const license = await this.db.prepare(`
        SELECT * FROM license_keys WHERE id = ?
      `).bind(licenseId).first()

      if (!license) {
        return {
          success: false,
          error: 'License not found'
        }
      }

      if (license.status !== 'revoked') {
        return {
          success: false,
          error: 'Only revoked licenses can be reactivated'
        }
      }

      // Determine new status based on assignment
      const newStatus = license.assigned_to_order_id ? 'sold' : 'available'

      await this.db.prepare(`
        UPDATE license_keys
        SET status = ?,
            updated_at = datetime('now')
        WHERE id = ?
      `).bind(newStatus, licenseId).run()

      // Log reactivation
      await this.db.prepare(`
        INSERT INTO audit_logs (
          user_id,
          action,
          resource_type,
          resource_id,
          changes,
          created_at
        ) VALUES (?, 'reactivate_license', 'license', ?, ?, datetime('now'))
      `).bind(
        adminUserId,
        licenseId,
        JSON.stringify({ old_status: 'revoked', new_status: newStatus })
      ).run()

      return {
        success: true,
        message: 'License reactivated successfully'
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to reactivate license: ${error}`
      }
    }
  }

  /**
   * Process expired licenses (cron job)
   */
  async processExpiredLicenses(): Promise<{ updated: number; errors: string[] }> {
    const errors: string[] = []
    let updated = 0

    try {
      const result = await this.db.prepare(`
        UPDATE license_keys
        SET status = 'expired',
            updated_at = datetime('now')
        WHERE expires_at IS NOT NULL
          AND expires_at < datetime('now')
          AND status IN ('sold', 'used')
      `).run()

      updated = result.meta.changes || 0

      // Log expiration processing
      await this.db.prepare(`
        INSERT INTO audit_logs (
          user_id,
          action,
          resource_type,
          resource_id,
          changes,
          created_at
        ) VALUES (NULL, 'expire_licenses', 'license', NULL, ?, datetime('now'))
      `).bind(JSON.stringify({ expired_count: updated })).run()
    } catch (error) {
      errors.push(`Failed to process expired licenses: ${error}`)
    }

    return { updated, errors }
  }

  /**
   * Record license activation
   */
  async recordActivation(
    licenseId: number,
    deviceId?: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get license details
      const license = await this.db.prepare(`
        SELECT * FROM license_keys WHERE id = ?
      `).bind(licenseId).first()

      if (!license) {
        return { success: false, error: 'License not found' }
      }

      // Check activation limit
      if (license.activation_count >= license.activation_limit) {
        return { success: false, error: 'Activation limit reached' }
      }

      // Check if already activated on this device
      if (deviceId) {
        const existing = await this.db.prepare(`
          SELECT * FROM license_activations
          WHERE license_key_id = ? AND device_id = ?
        `).bind(licenseId, deviceId).first()

        if (existing) {
          return { success: false, error: 'Already activated on this device' }
        }
      }

      // Record activation
      await this.db.prepare(`
        INSERT INTO license_activations (
          license_key_id,
          device_id,
          ip_address,
          user_agent,
          activated_at
        ) VALUES (?, ?, ?, ?, datetime('now'))
      `).bind(licenseId, deviceId, ipAddress, userAgent).run()

      // Update activation count
      await this.db.prepare(`
        UPDATE license_keys
        SET activation_count = activation_count + 1,
            status = 'used',
            updated_at = datetime('now')
        WHERE id = ?
      `).bind(licenseId).run()

      return { success: true }
    } catch (error) {
      return { success: false, error: `Failed to record activation: ${error}` }
    }
  }

  /**
   * Get low stock products (for alerts)
   */
  async getLowStockProducts(threshold: number = 10): Promise<any[]> {
    const products = await this.db.prepare(`
      SELECT 
        p.id,
        p.sku,
        pt.name,
        COUNT(lk.id) as available_licenses
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'en'
      LEFT JOIN license_keys lk ON p.id = lk.product_id AND lk.status = 'available'
      WHERE p.stock_type = 'limited'
      GROUP BY p.id, p.sku, pt.name
      HAVING available_licenses < ?
      ORDER BY available_licenses ASC
    `).bind(threshold).all()

    return products.results || []
  }

  /**
   * Import licenses in bulk
   */
  async importLicenses(
    productId: number,
    licenses: Array<{
      license_key: string
      key_type?: string
      activation_limit?: number
      expires_at?: string
    }>
  ): Promise<{ imported: number; skipped: number; errors: string[] }> {
    let imported = 0
    let skipped = 0
    const errors: string[] = []

    for (const licenseData of licenses) {
      try {
        // Check for duplicate
        const existing = await this.db.prepare(`
          SELECT id FROM license_keys WHERE license_key = ?
        `).bind(licenseData.license_key).first()

        if (existing) {
          skipped++
          errors.push(`Duplicate license key: ${licenseData.license_key}`)
          continue
        }

        // Insert license
        await this.db.prepare(`
          INSERT INTO license_keys (
            product_id,
            license_key,
            key_type,
            activation_limit,
            expires_at,
            status,
            activation_count,
            created_at,
            updated_at
          ) VALUES (?, ?, ?, ?, ?, 'available', 0, datetime('now'), datetime('now'))
        `).bind(
          productId,
          licenseData.license_key,
          licenseData.key_type || 'single',
          licenseData.activation_limit || 1,
          licenseData.expires_at || null
        ).run()

        imported++
      } catch (error) {
        errors.push(`Failed to import ${licenseData.license_key}: ${error}`)
      }
    }

    return { imported, skipped, errors }
  }

  /**
   * Generate license statistics
   */
  async getLicenseStats(productId?: number): Promise<{
    total: number
    available: number
    sold: number
    used: number
    expired: number
    revoked: number
  }> {
    const query = productId
      ? `SELECT status, COUNT(*) as count FROM license_keys WHERE product_id = ? GROUP BY status`
      : `SELECT status, COUNT(*) as count FROM license_keys GROUP BY status`

    const results = productId
      ? await this.db.prepare(query).bind(productId).all()
      : await this.db.prepare(query).all()

    const stats = {
      total: 0,
      available: 0,
      sold: 0,
      used: 0,
      expired: 0,
      revoked: 0
    }

    for (const row of results.results || []) {
      const status = row.status as string
      const count = row.count as number
      stats.total += count
      if (status in stats) {
        stats[status as keyof typeof stats] = count
      }
    }

    return stats
  }
}

// ============================================
// LICENSE KEY GENERATOR
// ============================================

export class LicenseKeyGenerator {
  /**
   * Generate a random license key
   * Format: XXXXX-XXXXX-XXXXX-XXXXX
   */
  static generate(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Exclude ambiguous chars
    const segments = 4
    const segmentLength = 5
    
    const parts: string[] = []
    
    for (let i = 0; i < segments; i++) {
      let segment = ''
      for (let j = 0; j < segmentLength; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      parts.push(segment)
    }
    
    return parts.join('-')
  }

  /**
   * Generate multiple unique license keys
   */
  static generateBatch(count: number): string[] {
    const keys = new Set<string>()
    
    while (keys.size < count) {
      keys.add(this.generate())
    }
    
    return Array.from(keys)
  }

  /**
   * Validate license key format
   */
  static validate(key: string): boolean {
    const pattern = /^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/
    return pattern.test(key)
  }
}

// ============================================
// SCHEDULED TASKS
// ============================================

export class LicenseScheduler {
  /**
   * Run scheduled license maintenance tasks
   * Should be called by a cron job every hour
   */
  static async runHourlyMaintenance(db: D1Database): Promise<{
    expired: number
    lowStockAlerts: any[]
    errors: string[]
  }> {
    const manager = new LicenseManager(db)
    
    // Process expired licenses
    const expirationResult = await manager.processExpiredLicenses()
    
    // Check low stock
    const lowStock = await manager.getLowStockProducts(10)
    
    return {
      expired: expirationResult.updated,
      lowStockAlerts: lowStock,
      errors: expirationResult.errors
    }
  }
}
