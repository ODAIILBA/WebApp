/**
 * Settings Manager Service
 * Handles configuration persistence and runtime updates
 */

import { D1Database } from '@cloudflare/workers-types'
import { AuditLogService } from './audit-log-service'

export interface SettingValue {
  key: string
  value: any
  type: 'string' | 'number' | 'boolean' | 'json'
  category: string
  description?: string
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export class SettingsManagerService {
  private db: D1Database
  private auditLog: AuditLogService
  private cache: Map<string, any> = new Map()

  constructor(db: D1Database, auditLog: AuditLogService) {
    this.db = db
    this.auditLog = auditLog
  }

  /**
   * Get a setting value
   */
  async get(key: string, category?: string): Promise<any> {
    // Check cache first
    const cacheKey = category ? `${category}:${key}` : key
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      const query = category
        ? `SELECT config_value, value_type FROM system_monitor_config WHERE config_key = ? AND category = ?`
        : `SELECT config_value, value_type FROM system_monitor_config WHERE config_key = ?`

      const params = category ? [key, category] : [key]
      const result = await this.db.prepare(query).bind(...params).first() as {
        config_value: string
        value_type: string
      } | null

      if (!result) return null

      const value = this.parseValue(result.config_value, result.value_type)
      this.cache.set(cacheKey, value)
      return value
    } catch (error) {
      console.error(`Failed to get setting ${key}:`, error)
      return null
    }
  }

  /**
   * Set a setting value with validation
   */
  async set(
    key: string,
    value: any,
    category: string,
    userId: string,
    description?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Validate the value
      const validation = this.validateSetting(key, value, category)
      if (!validation.valid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        }
      }

      // Get old value for audit log
      const oldValue = await this.get(key, category)

      // Determine value type
      const valueType = this.getValueType(value)
      const stringValue = this.stringifyValue(value, valueType)

      // Update or insert
      await this.db.prepare(`
        INSERT INTO system_monitor_config (config_key, config_value, value_type, category, description)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(config_key, category) DO UPDATE SET
          config_value = excluded.config_value,
          value_type = excluded.value_type,
          description = excluded.description,
          updated_at = CURRENT_TIMESTAMP
      `).bind(key, stringValue, valueType, category, description || null).run()

      // Update cache
      const cacheKey = `${category}:${key}`
      this.cache.set(cacheKey, value)

      // Apply runtime configuration
      await this.applyRuntimeConfig(key, value, category)

      // Log the change
      await this.auditLog.log({
        userId,
        action: 'update_setting',
        module: 'settings',
        details: {
          key,
          category,
          oldValue,
          newValue: value
        },
        ipAddress: 'system'
      })

      return { success: true }
    } catch (error: any) {
      console.error(`Failed to set setting ${key}:`, error)
      return {
        success: false,
        error: error.message || 'Failed to save setting'
      }
    }
  }

  /**
   * Get all settings in a category
   */
  async getCategory(category: string): Promise<Record<string, any>> {
    try {
      const results = await this.db.prepare(`
        SELECT config_key, config_value, value_type
        FROM system_monitor_config
        WHERE category = ?
        ORDER BY config_key
      `).bind(category).all()

      const settings: Record<string, any> = {}
      for (const row of results.results as any[]) {
        settings[row.config_key] = this.parseValue(row.config_value, row.value_type)
      }

      return settings
    } catch (error) {
      console.error(`Failed to get category ${category}:`, error)
      return {}
    }
  }

  /**
   * Bulk update settings
   */
  async bulkUpdate(
    settings: Array<{ key: string; value: any; category: string }>,
    userId: string
  ): Promise<{ success: boolean; errors: string[] }> {
    const errors: string[] = []

    for (const setting of settings) {
      const result = await this.set(
        setting.key,
        setting.value,
        setting.category,
        userId
      )

      if (!result.success) {
        errors.push(`${setting.key}: ${result.error}`)
      }
    }

    return {
      success: errors.length === 0,
      errors
    }
  }

  /**
   * Validate setting value
   */
  private validateSetting(key: string, value: any, category: string): ValidationResult {
    const errors: string[] = []

    // Category-specific validation
    switch (category) {
      case 'monitoring':
        if (key.includes('threshold')) {
          if (typeof value !== 'number' || value < 0 || value > 100) {
            errors.push('Threshold must be a number between 0 and 100')
          }
        }
        if (key === 'refresh_interval') {
          if (typeof value !== 'number' || value < 1 || value > 60) {
            errors.push('Refresh interval must be between 1 and 60 seconds')
          }
        }
        break

      case 'security':
        if (key === 'max_login_attempts') {
          if (typeof value !== 'number' || value < 1 || value > 10) {
            errors.push('Max login attempts must be between 1 and 10')
          }
        }
        if (key === 'session_timeout') {
          if (typeof value !== 'number' || value < 5 || value > 1440) {
            errors.push('Session timeout must be between 5 and 1440 minutes')
          }
        }
        break

      case 'firewall':
        if (key === 'rate_limit') {
          if (typeof value !== 'number' || value < 10 || value > 10000) {
            errors.push('Rate limit must be between 10 and 10000 requests')
          }
        }
        break
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * Apply runtime configuration changes
   */
  private async applyRuntimeConfig(key: string, value: any, category: string) {
    // Special handling for certain settings
    switch (category) {
      case 'monitoring':
        if (key === 'auto_refresh_enabled') {
          // Could trigger/stop monitoring service
        }
        break

      case 'security':
        if (key === 'firewall_enabled') {
          // Enable/disable firewall
          await this.toggleFirewall(value)
        }
        break

      case 'cache':
        if (key === 'cache_enabled') {
          if (!value) {
            this.cache.clear()
          }
        }
        break
    }
  }

  /**
   * Toggle firewall state
   */
  private async toggleFirewall(enabled: boolean) {
    try {
      await this.db.prepare(`
        UPDATE firewall_rules
        SET is_active = ?
      `).bind(enabled ? 1 : 0).run()

    } catch (error) {
      console.error('Failed to toggle firewall:', error)
    }
  }

  /**
   * Clear cache
   */
  clearCache(pattern?: string) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key)
        }
      }
    } else {
      this.cache.clear()
    }
  }

  /**
   * Parse value from string storage
   */
  private parseValue(stringValue: string, type: string): any {
    switch (type) {
      case 'number':
        return parseFloat(stringValue)
      case 'boolean':
        return stringValue === 'true' || stringValue === '1'
      case 'json':
        try {
          return JSON.parse(stringValue)
        } catch {
          return null
        }
      default:
        return stringValue
    }
  }

  /**
   * Stringify value for storage
   */
  private stringifyValue(value: any, type: string): string {
    switch (type) {
      case 'json':
        return JSON.stringify(value)
      case 'boolean':
        return value ? 'true' : 'false'
      default:
        return String(value)
    }
  }

  /**
   * Get value type
   */
  private getValueType(value: any): 'string' | 'number' | 'boolean' | 'json' {
    if (typeof value === 'number') return 'number'
    if (typeof value === 'boolean') return 'boolean'
    if (typeof value === 'object') return 'json'
    return 'string'
  }

  /**
   * Reset to defaults
   */
  async resetToDefaults(category: string, userId: string): Promise<boolean> {
    try {
      await this.db.prepare(`
        DELETE FROM system_monitor_config
        WHERE category = ?
      `).bind(category).run()

      this.clearCache(category)

      await this.auditLog.log({
        userId,
        action: 'reset_settings',
        module: 'settings',
        details: { category },
        ipAddress: 'system'
      })

      return true
    } catch (error) {
      console.error(`Failed to reset category ${category}:`, error)
      return false
    }
  }

  /**
   * Export settings
   */
  async export(category?: string): Promise<Record<string, any>> {
    try {
      const query = category
        ? `SELECT config_key, config_value, value_type, category, description 
           FROM system_monitor_config WHERE category = ?`
        : `SELECT config_key, config_value, value_type, category, description 
           FROM system_monitor_config`

      const results = category
        ? await this.db.prepare(query).bind(category).all()
        : await this.db.prepare(query).all()

      const exported: Record<string, any> = {}
      for (const row of results.results as any[]) {
        const key = `${row.category}:${row.config_key}`
        exported[key] = {
          value: this.parseValue(row.config_value, row.value_type),
          type: row.value_type,
          description: row.description
        }
      }

      return exported
    } catch (error) {
      console.error('Failed to export settings:', error)
      return {}
    }
  }

  /**
   * Import settings
   */
  async import(
    settings: Record<string, { value: any; type: string; description?: string }>,
    userId: string
  ): Promise<{ success: boolean; imported: number; failed: number }> {
    let imported = 0
    let failed = 0

    for (const [fullKey, setting] of Object.entries(settings)) {
      const [category, key] = fullKey.split(':')
      
      const result = await this.set(
        key,
        setting.value,
        category,
        userId,
        setting.description
      )

      if (result.success) {
        imported++
      } else {
        failed++
      }
    }

    return { success: failed === 0, imported, failed }
  }
}
