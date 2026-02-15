/**
 * License Key Generator
 * Generates secure, unique license keys for software products
 */

import type { D1Database } from '@cloudflare/workers-types'

export interface LicenseKey {
  id: number
  product_id: number
  license_key: string
  status: 'available' | 'assigned' | 'activated' | 'expired' | 'revoked'
  order_id?: number
  user_id?: number
  activation_count: number
  max_activations: number
  expires_at?: string
  created_at: string
}

export interface LicenseActivation {
  id: number
  license_key_id: number
  device_id: string
  device_name?: string
  ip_address?: string
  activated_at: string
}

/**
 * Generate a secure license key
 * Format: XXXX-XXXX-XXXX-XXXX-XXXX (5 groups of 4 alphanumeric characters)
 */
export function generateLicenseKey(prefix: string = 'SK24'): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const groups = 5
  const groupLength = 4
  
  const parts: string[] = []
  
  for (let i = 0; i < groups; i++) {
    let group = ''
    const randomValues = new Uint8Array(groupLength)
    crypto.getRandomValues(randomValues)
    
    for (let j = 0; j < groupLength; j++) {
      group += chars[randomValues[j] % chars.length]
    }
    
    parts.push(group)
  }
  
  return `${prefix}-${parts.join('-')}`
}

/**
 * Validate license key format
 */
export function isValidLicenseKeyFormat(key: string): boolean {
  // Format: PREFIX-XXXX-XXXX-XXXX-XXXX-XXXX
  const pattern = /^[A-Z0-9]+-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/
  return pattern.test(key)
}

/**
 * License Generator Service
 */
export class LicenseGenerator {
  constructor(private db: D1Database, private prefix: string = 'SK24') {}
  
  /**
   * Generate a batch of license keys for a product
   */
  async generateBatch(
    productId: number,
    count: number,
    maxActivations: number = 1,
    expiresInDays?: number
  ): Promise<{ success: boolean; keys?: string[]; error?: string }> {
    try {
      const keys: string[] = []
      const expiresAt = expiresInDays 
        ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
        : null
      
      for (let i = 0; i < count; i++) {
        let licenseKey: string
        let attempts = 0
        const maxAttempts = 10
        
        // Generate unique key
        do {
          licenseKey = generateLicenseKey(this.prefix)
          attempts++
          
          // Check if key already exists
          const existing = await this.db
            .prepare('SELECT id FROM license_keys WHERE license_key = ?')
            .bind(licenseKey)
            .first()
          
          if (!existing) {
            break
          }
          
          if (attempts >= maxAttempts) {
            return { success: false, error: 'Failed to generate unique license key' }
          }
        } while (true)
        
        // Insert license key
        await this.db
          .prepare(`
            INSERT INTO license_keys (
              product_id, license_key, status, max_activations, expires_at
            ) VALUES (?, ?, 'available', ?, ?)
          `)
          .bind(productId, licenseKey, maxActivations, expiresAt)
          .run()
        
        keys.push(licenseKey)
      }
      
      return { success: true, keys }
    } catch (error) {
      console.error('License generation error:', error)
      return { success: false, error: 'Failed to generate license keys' }
    }
  }
  
  /**
   * Assign a license key to an order
   */
  async assignToOrder(
    productId: number,
    orderId: number,
    userId: number
  ): Promise<{ success: boolean; licenseKey?: string; error?: string }> {
    try {
      // Get an available license key for this product
      const license = await this.db
        .prepare(`
          SELECT id, license_key, max_activations, expires_at
          FROM license_keys
          WHERE product_id = ? AND status = 'available'
            AND (expires_at IS NULL OR expires_at > datetime('now'))
          LIMIT 1
        `)
        .bind(productId)
        .first<LicenseKey>()
      
      if (!license) {
        return { success: false, error: 'No available license keys for this product' }
      }
      
      // Update license key
      await this.db
        .prepare(`
          UPDATE license_keys
          SET status = 'assigned',
              order_id = ?,
              user_id = ?
          WHERE id = ?
        `)
        .bind(orderId, userId, license.id)
        .run()
      
      return { success: true, licenseKey: license.license_key }
    } catch (error) {
      console.error('License assignment error:', error)
      return { success: false, error: 'Failed to assign license key' }
    }
  }
  
  /**
   * Activate a license key
   */
  async activateLicense(
    licenseKey: string,
    deviceId: string,
    deviceName?: string,
    ipAddress?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get license
      const license = await this.db
        .prepare(`
          SELECT id, status, activation_count, max_activations, expires_at
          FROM license_keys
          WHERE license_key = ?
        `)
        .bind(licenseKey)
        .first<LicenseKey>()
      
      if (!license) {
        return { success: false, error: 'Invalid license key' }
      }
      
      // Check if license is valid
      if (license.status === 'revoked') {
        return { success: false, error: 'License key has been revoked' }
      }
      
      if (license.status === 'available') {
        return { success: false, error: 'License key must be assigned before activation' }
      }
      
      // Check expiration
      if (license.expires_at && new Date(license.expires_at) < new Date()) {
        await this.db
          .prepare('UPDATE license_keys SET status = ? WHERE id = ?')
          .bind('expired', license.id)
          .run()
        
        return { success: false, error: 'License key has expired' }
      }
      
      // Check if device is already activated
      const existingActivation = await this.db
        .prepare('SELECT id FROM license_activations WHERE license_key_id = ? AND device_id = ?')
        .bind(license.id, deviceId)
        .first()
      
      if (existingActivation) {
        return { success: true } // Already activated on this device
      }
      
      // Check activation limit
      if (license.activation_count >= license.max_activations) {
        return { success: false, error: 'Maximum activation limit reached' }
      }
      
      // Create activation record
      await this.db
        .prepare(`
          INSERT INTO license_activations (
            license_key_id, device_id, device_name, ip_address
          ) VALUES (?, ?, ?, ?)
        `)
        .bind(license.id, deviceId, deviceName, ipAddress)
        .run()
      
      // Update activation count and status
      await this.db
        .prepare(`
          UPDATE license_keys
          SET activation_count = activation_count + 1,
              status = CASE 
                WHEN activation_count + 1 >= max_activations THEN 'activated'
                ELSE status
              END
          WHERE id = ?
        `)
        .bind(license.id)
        .run()
      
      return { success: true }
    } catch (error) {
      console.error('License activation error:', error)
      return { success: false, error: 'Failed to activate license' }
    }
  }
  
  /**
   * Deactivate a license on a specific device
   */
  async deactivateLicense(
    licenseKey: string,
    deviceId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get license
      const license = await this.db
        .prepare('SELECT id FROM license_keys WHERE license_key = ?')
        .bind(licenseKey)
        .first<{ id: number }>()
      
      if (!license) {
        return { success: false, error: 'Invalid license key' }
      }
      
      // Delete activation
      const result = await this.db
        .prepare('DELETE FROM license_activations WHERE license_key_id = ? AND device_id = ?')
        .bind(license.id, deviceId)
        .run()
      
      if (result.meta.changes === 0) {
        return { success: false, error: 'License not activated on this device' }
      }
      
      // Update activation count
      await this.db
        .prepare(`
          UPDATE license_keys
          SET activation_count = activation_count - 1,
              status = CASE
                WHEN status = 'activated' AND activation_count - 1 < max_activations THEN 'assigned'
                ELSE status
              END
          WHERE id = ?
        `)
        .bind(license.id)
        .run()
      
      return { success: true }
    } catch (error) {
      console.error('License deactivation error:', error)
      return { success: false, error: 'Failed to deactivate license' }
    }
  }
  
  /**
   * Get license information
   */
  async getLicenseInfo(licenseKey: string): Promise<LicenseKey | null> {
    try {
      const license = await this.db
        .prepare(`
          SELECT * FROM license_keys WHERE license_key = ?
        `)
        .bind(licenseKey)
        .first<LicenseKey>()
      
      return license
    } catch (error) {
      console.error('Get license info error:', error)
      return null
    }
  }
  
  /**
   * Get license activations
   */
  async getLicenseActivations(licenseKey: string): Promise<LicenseActivation[]> {
    try {
      const license = await this.db
        .prepare('SELECT id FROM license_keys WHERE license_key = ?')
        .bind(licenseKey)
        .first<{ id: number }>()
      
      if (!license) {
        return []
      }
      
      const activations = await this.db
        .prepare(`
          SELECT * FROM license_activations 
          WHERE license_key_id = ? 
          ORDER BY activated_at DESC
        `)
        .bind(license.id)
        .all()
      
      return activations.results as LicenseActivation[]
    } catch (error) {
      console.error('Get license activations error:', error)
      return []
    }
  }
}
