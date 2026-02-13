/**
 * System Monitor API Routes
 * Comprehensive real-time monitoring endpoints
 */

import { Hono } from 'hono'
import { SystemMonitorService } from '../services/system-monitor-service'
import { SettingsManagerService } from '../services/settings-manager-service'
import { AuditLogService } from '../services/audit-log-service'

type Bindings = {
  DB: D1Database
}

const systemMonitorAPI = new Hono<{ Bindings: Bindings }>()

// ============================================
// SYSTEM MONITOR API - Real Backend
// ============================================

/**
 * GET /api/admin/system/monitor
 * Get real-time system metrics
 */
systemMonitorAPI.get('/monitor', async (c) => {
  try {
    const { env } = c
    const monitorService = new SystemMonitorService(env.DB)

    const [
      metrics,
      alerts,
      services,
      analytics,
      security,
      backgroundServices
    ] = await Promise.all([
      monitorService.getMetrics(),
      monitorService.getMetrics().then(m => monitorService.getAlerts(m)),
      monitorService.checkExternalServices(),
      monitorService.getRequestAnalytics(),
      monitorService.getSecurityOverview(),
      monitorService.getBackgroundServices()
    ])

    return c.json({
      success: true,
      timestamp: new Date().toISOString(),
      metrics,
      alerts,
      services,
      analytics,
      security,
      backgroundServices
    })
  } catch (error: any) {
    console.error('System monitor error:', error)
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * GET /api/admin/system/metrics/history
 * Get historical metrics
 */
systemMonitorAPI.get('/metrics/history', async (c) => {
  try {
    const { env } = c
    const hours = parseInt(c.req.query('hours') || '1')
    
    const monitorService = new SystemMonitorService(env.DB)
    const history = await monitorService.getHistoricalMetrics(hours)

    return c.json({
      success: true,
      history,
      hours
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * POST /api/admin/system/services/:name/update
 * Update service status
 */
systemMonitorAPI.post('/services/:name/update', async (c) => {
  try {
    const { env } = c
    const name = c.req.param('name')
    const { status, responseTime } = await c.req.json()

    const monitorService = new SystemMonitorService(env.DB)
    await monitorService.updateServiceStatus(name, status, responseTime)

    // Log the change
    const auditLog = new AuditLogService(env.DB)
    await auditLog.log({
      userId: 'admin',
      action: 'update_service_status',
      module: 'system',
      details: { service: name, status, responseTime },
      ipAddress: c.req.header('cf-connecting-ip') || 'unknown'
    })

    return c.json({
      success: true,
      service: name,
      status
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * GET /api/admin/system/activity-log
 * Get activity logs with filtering
 */
systemMonitorAPI.get('/activity-log', async (c) => {
  try {
    const { env } = c
    const query = c.req.query()

    const auditLog = new AuditLogService(env.DB)
    const result = await auditLog.getLogs({
      severity: query.severity,
      module: query.module,
      search: query.search,
      limit: parseInt(query.limit || '50'),
      offset: parseInt(query.offset || '0')
    })

    return c.json({
      success: true,
      ...result
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * GET /api/admin/system/activity-log/export
 * Export activity logs to CSV
 */
systemMonitorAPI.get('/activity-log/export', async (c) => {
  try {
    const { env } = c
    const query = c.req.query()

    const auditLog = new AuditLogService(env.DB)
    const csv = await auditLog.exportToCSV({
      severity: query.severity,
      module: query.module,
      search: query.search
    })

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="activity-log-${new Date().toISOString()}.csv"`
      }
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * GET /api/admin/system/statistics
 * Get system statistics
 */
systemMonitorAPI.get('/statistics', async (c) => {
  try {
    const { env } = c
    const days = parseInt(c.req.query('days') || '7')

    const auditLog = new AuditLogService(env.DB)
    const stats = await auditLog.getStatistics(days)

    return c.json({
      success: true,
      statistics: stats,
      period: { days }
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

// ============================================
// SETTINGS MANAGEMENT API
// ============================================

/**
 * GET /api/admin/settings/:category
 * Get all settings in a category
 */
systemMonitorAPI.get('/settings/:category', async (c) => {
  try {
    const { env } = c
    const category = c.req.param('category')

    const auditLog = new AuditLogService(env.DB)
    const settingsManager = new SettingsManagerService(env.DB, auditLog)
    
    const settings = await settingsManager.getCategory(category)

    return c.json({
      success: true,
      category,
      settings
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * POST /api/admin/settings/:category/:key
 * Update a single setting
 */
systemMonitorAPI.post('/settings/:category/:key', async (c) => {
  try {
    const { env } = c
    const category = c.req.param('category')
    const key = c.req.param('key')
    const { value, description } = await c.req.json()

    const auditLog = new AuditLogService(env.DB)
    const settingsManager = new SettingsManagerService(env.DB, auditLog)
    
    const result = await settingsManager.set(
      key,
      value,
      category,
      'admin', // TODO: Get from auth
      description
    )

    if (!result.success) {
      return c.json({
        success: false,
        error: result.error
      }, 400)
    }

    return c.json({
      success: true,
      key,
      value,
      message: 'Setting updated successfully'
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * POST /api/admin/settings/:category/bulk
 * Bulk update settings
 */
systemMonitorAPI.post('/settings/:category/bulk', async (c) => {
  try {
    const { env } = c
    const category = c.req.param('category')
    const { settings } = await c.req.json()

    const auditLog = new AuditLogService(env.DB)
    const settingsManager = new SettingsManagerService(env.DB, auditLog)
    
    const updates = settings.map((s: any) => ({
      key: s.key,
      value: s.value,
      category
    }))

    const result = await settingsManager.bulkUpdate(updates, 'admin')

    if (!result.success) {
      return c.json({
        success: false,
        errors: result.errors
      }, 400)
    }

    return c.json({
      success: true,
      updated: settings.length,
      message: 'Settings updated successfully'
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * DELETE /api/admin/settings/:category/reset
 * Reset category to defaults
 */
systemMonitorAPI.delete('/settings/:category/reset', async (c) => {
  try {
    const { env } = c
    const category = c.req.param('category')

    const auditLog = new AuditLogService(env.DB)
    const settingsManager = new SettingsManagerService(env.DB, auditLog)
    
    const success = await settingsManager.resetToDefaults(category, 'admin')

    if (!success) {
      return c.json({
        success: false,
        error: 'Failed to reset settings'
      }, 500)
    }

    return c.json({
      success: true,
      message: `Category ${category} reset to defaults`
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * GET /api/admin/settings/export
 * Export all settings
 */
systemMonitorAPI.get('/settings/export', async (c) => {
  try {
    const { env } = c
    const category = c.req.query('category')

    const auditLog = new AuditLogService(env.DB)
    const settingsManager = new SettingsManagerService(env.DB, auditLog)
    
    const settings = await settingsManager.export(category)

    return c.json({
      success: true,
      settings,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * POST /api/admin/settings/import
 * Import settings
 */
systemMonitorAPI.post('/settings/import', async (c) => {
  try {
    const { env } = c
    const { settings } = await c.req.json()

    const auditLog = new AuditLogService(env.DB)
    const settingsManager = new SettingsManagerService(env.DB, auditLog)
    
    const result = await settingsManager.import(settings, 'admin')

    return c.json({
      success: result.success,
      imported: result.imported,
      failed: result.failed,
      message: `Imported ${result.imported} settings, ${result.failed} failed`
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

// ============================================
// ALERT THRESHOLD MANAGEMENT
// ============================================

/**
 * POST /api/admin/system/thresholds
 * Update alert thresholds
 */
systemMonitorAPI.post('/thresholds', async (c) => {
  try {
    const { env } = c
    const { metric, warning, critical } = await c.req.json()

    // Validate thresholds
    if (warning >= critical) {
      return c.json({
        success: false,
        error: 'Warning threshold must be less than critical threshold'
      }, 400)
    }

    await env.DB.prepare(`
      UPDATE system_alert_thresholds
      SET warning_threshold = ?, critical_threshold = ?
      WHERE metric_name = ?
    `).bind(warning, critical, metric).run()

    // Log the change
    const auditLog = new AuditLogService(env.DB)
    await auditLog.log({
      userId: 'admin',
      action: 'update_threshold',
      module: 'monitoring',
      details: { metric, warning, critical },
      ipAddress: c.req.header('cf-connecting-ip') || 'unknown'
    })

    return c.json({
      success: true,
      metric,
      thresholds: { warning, critical },
      message: 'Thresholds updated successfully'
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * GET /api/admin/system/thresholds
 * Get all alert thresholds
 */
systemMonitorAPI.get('/thresholds', async (c) => {
  try {
    const { env } = c

    const results = await env.DB.prepare(`
      SELECT metric_name, warning_threshold, critical_threshold, is_enabled
      FROM system_alert_thresholds
      ORDER BY metric_name
    `).all()

    return c.json({
      success: true,
      thresholds: results.results
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

/**
 * POST /api/admin/system/thresholds/:metric/toggle
 * Toggle threshold alert
 */
systemMonitorAPI.post('/thresholds/:metric/toggle', async (c) => {
  try {
    const { env } = c
    const metric = c.req.param('metric')

    const current = await env.DB.prepare(`
      SELECT is_enabled FROM system_alert_thresholds WHERE metric_name = ?
    `).bind(metric).first() as { is_enabled: number } | null

    const newState = current ? (current.is_enabled ? 0 : 1) : 1

    await env.DB.prepare(`
      UPDATE system_alert_thresholds
      SET is_enabled = ?
      WHERE metric_name = ?
    `).bind(newState, metric).run()

    // Log the change
    const auditLog = new AuditLogService(env.DB)
    await auditLog.log({
      userId: 'admin',
      action: 'toggle_threshold',
      module: 'monitoring',
      details: { metric, enabled: newState === 1 },
      ipAddress: c.req.header('cf-connecting-ip') || 'unknown'
    })

    return c.json({
      success: true,
      metric,
      enabled: newState === 1,
      message: `Threshold alert ${newState === 1 ? 'enabled' : 'disabled'}`
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

export default systemMonitorAPI
