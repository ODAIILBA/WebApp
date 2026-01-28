// License key generation and management
import { CloudflareBindings } from '../types'

export interface License {
  id?: number
  key: string
  productId: number
  orderId: number
  userId?: number
  status: 'active' | 'revoked' | 'expired'
  activatedAt?: string
  expiresAt?: string
  createdAt?: string
}

export class LicenseGenerator {
  /**
   * Generate a random license key in format: XXXX-XXXX-XXXX-XXXX
   */
  static generateKey(): string {
    const segments = 4
    const segmentLength = 4
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed ambiguous chars (0,O,1,I)
    
    const generateSegment = () => {
      let segment = ''
      for (let i = 0; i < segmentLength; i++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return segment
    }
    
    const keySegments = []
    for (let i = 0; i < segments; i++) {
      keySegments.push(generateSegment())
    }
    
    return keySegments.join('-')
  }

  /**
   * Generate multiple license keys
   */
  static generateKeys(count: number): string[] {
    const keys = new Set<string>()
    
    while (keys.size < count) {
      keys.add(this.generateKey())
    }
    
    return Array.from(keys)
  }

  /**
   * Validate license key format
   */
  static validateKeyFormat(key: string): boolean {
    const pattern = /^[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/
    return pattern.test(key)
  }

  /**
   * Create license in database
   */
  static async createLicense(
    DB: D1Database,
    data: {
      productId: number
      orderId: number
      userId?: number
      quantity?: number
    }
  ): Promise<License[]> {
    const { productId, orderId, userId, quantity = 1 } = data
    const licenses: License[] = []

    try {
      // Generate unique keys
      const keys = this.generateKeys(quantity)

      // Insert licenses into database
      for (const key of keys) {
        const result = await DB.prepare(
          `INSERT INTO licenses (
            license_key, product_id, order_id, user_id, status, created_at
          ) VALUES (?, ?, ?, ?, 'active', datetime('now'))`
        ).bind(key, productId, orderId, userId || null).run()

        licenses.push({
          id: result.meta.last_row_id,
          key,
          productId,
          orderId,
          userId,
          status: 'active',
          createdAt: new Date().toISOString()
        })
      }

      return licenses
    } catch (error) {
      console.error('Error creating licenses:', error)
      throw new Error('Failed to create licenses')
    }
  }

  /**
   * Get licenses for an order
   */
  static async getLicensesByOrder(
    DB: D1Database,
    orderId: number
  ): Promise<License[]> {
    try {
      const result = await DB.prepare(
        `SELECT l.*, p.name as product_name 
         FROM licenses l
         LEFT JOIN products p ON l.product_id = p.id
         WHERE l.order_id = ?
         ORDER BY l.created_at DESC`
      ).bind(orderId).all()

      return result.results as any[]
    } catch (error) {
      console.error('Error getting licenses:', error)
      throw new Error('Failed to get licenses')
    }
  }

  /**
   * Get licenses for a user
   */
  static async getLicensesByUser(
    DB: D1Database,
    userId: number
  ): Promise<License[]> {
    try {
      const result = await DB.prepare(
        `SELECT l.*, p.name as product_name, o.order_number
         FROM licenses l
         LEFT JOIN products p ON l.product_id = p.id
         LEFT JOIN orders o ON l.order_id = o.id
         WHERE l.user_id = ?
         ORDER BY l.created_at DESC`
      ).bind(userId).all()

      return result.results as any[]
    } catch (error) {
      console.error('Error getting user licenses:', error)
      throw new Error('Failed to get user licenses')
    }
  }

  /**
   * Verify a license key
   */
  static async verifyLicense(
    DB: D1Database,
    key: string
  ): Promise<{ valid: boolean; license?: License; message: string }> {
    try {
      // Validate format
      if (!this.validateKeyFormat(key)) {
        return {
          valid: false,
          message: 'Invalid license key format'
        }
      }

      // Check database
      const license = await DB.prepare(
        `SELECT l.*, p.name as product_name
         FROM licenses l
         LEFT JOIN products p ON l.product_id = p.id
         WHERE l.license_key = ?`
      ).bind(key).first() as any

      if (!license) {
        return {
          valid: false,
          message: 'License key not found'
        }
      }

      if (license.status === 'revoked') {
        return {
          valid: false,
          license,
          message: 'License key has been revoked'
        }
      }

      if (license.status === 'expired') {
        return {
          valid: false,
          license,
          message: 'License key has expired'
        }
      }

      // Check expiration date if set
      if (license.expires_at && new Date(license.expires_at) < new Date()) {
        // Update status to expired
        await DB.prepare(
          `UPDATE licenses SET status = 'expired', updated_at = datetime('now') WHERE id = ?`
        ).bind(license.id).run()

        return {
          valid: false,
          license,
          message: 'License key has expired'
        }
      }

      return {
        valid: true,
        license,
        message: 'License key is valid'
      }
    } catch (error) {
      console.error('Error verifying license:', error)
      throw new Error('Failed to verify license')
    }
  }

  /**
   * Activate a license (record activation)
   */
  static async activateLicense(
    DB: D1Database,
    key: string,
    metadata?: {
      deviceId?: string
      ipAddress?: string
      userAgent?: string
    }
  ): Promise<{ success: boolean; message: string }> {
    try {
      const verification = await this.verifyLicense(DB, key)

      if (!verification.valid) {
        return {
          success: false,
          message: verification.message
        }
      }

      // Update activation timestamp
      await DB.prepare(
        `UPDATE licenses 
         SET activated_at = datetime('now'), 
             updated_at = datetime('now')
         WHERE license_key = ?`
      ).bind(key).run()

      // Log activation (if you have an activations table)
      // await this.logActivation(DB, key, metadata)

      return {
        success: true,
        message: 'License activated successfully'
      }
    } catch (error) {
      console.error('Error activating license:', error)
      throw new Error('Failed to activate license')
    }
  }

  /**
   * Revoke a license
   */
  static async revokeLicense(
    DB: D1Database,
    key: string,
    reason?: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const result = await DB.prepare(
        `UPDATE licenses 
         SET status = 'revoked', updated_at = datetime('now')
         WHERE license_key = ?`
      ).bind(key).run()

      if (result.meta.changes === 0) {
        return {
          success: false,
          message: 'License key not found'
        }
      }

      return {
        success: true,
        message: 'License revoked successfully'
      }
    } catch (error) {
      console.error('Error revoking license:', error)
      throw new Error('Failed to revoke license')
    }
  }
}

export default LicenseGenerator
