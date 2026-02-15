/**
 * Scheduled Tasks (Cron Jobs)
 * Cloudflare Workers Cron Triggers
 */

import { D1Database } from '@cloudflare/workers-types'
import { LicenseScheduler } from './licenses'
import { AuditLogger } from './audit'

/**
 * Session cleanup job
 * Deletes expired sessions from database
 */
export async function cleanupExpiredSessions(db: D1Database): Promise<number> {
  try {
    // Delete sessions older than expiration time
    const result = await db.prepare(`
      DELETE FROM sessions 
      WHERE expires_at < datetime('now')
    `).run()
    
    const deletedCount = result.meta.changes || 0
    
    if (deletedCount > 0) {
    }
    
    return deletedCount
  } catch (error) {
    console.error('Session cleanup error:', error)
    throw error
  }
}

/**
 * License cleanup job
 * Handles expired licenses and sends notifications
 */
export async function cleanupExpiredLicenses(db: D1Database): Promise<void> {
  const scheduler = new LicenseScheduler(db)
  await scheduler.processExpiringLicenses()
}

/**
 * Order cleanup job
 * Cancels abandoned orders (pending payment for >24 hours)
 */
export async function cleanupAbandonedOrders(db: D1Database): Promise<number> {
  try {
    // Find orders pending payment for more than 24 hours
    const result = await db.prepare(`
      UPDATE orders 
      SET status = 'cancelled',
          payment_status = 'cancelled',
          updated_at = datetime('now')
      WHERE payment_status = 'pending' 
        AND created_at < datetime('now', '-24 hours')
        AND status != 'cancelled'
    `).run()
    
    const cancelledCount = result.meta.changes || 0
    
    if (cancelledCount > 0) {
      
      // Log audit event
      const auditLogger = new AuditLogger(db)
      await auditLogger.log({
        action: 'abandoned_orders_cancelled',
        resourceType: 'order',
        changes: { count: cancelledCount }
      })
    }
    
    return cancelledCount
  } catch (error) {
    console.error('Order cleanup error:', error)
    throw error
  }
}

/**
 * Rate limit cleanup job
 * Clears old rate limit records
 */
export async function cleanupRateLimits(db: D1Database): Promise<number> {
  try {
    // Delete rate limit records older than 1 hour
    const result = await db.prepare(`
      DELETE FROM rate_limits 
      WHERE created_at < datetime('now', '-1 hour')
    `).run()
    
    const deletedCount = result.meta.changes || 0
    
    if (deletedCount > 0) {
    }
    
    return deletedCount
  } catch (error) {
    console.error('Rate limit cleanup error:', error)
    throw error
  }
}

/**
 * Audit log cleanup job
 * Archives old audit logs (keep last 90 days)
 */
export async function cleanupOldAuditLogs(db: D1Database): Promise<number> {
  try {
    // Keep only last 90 days of audit logs
    const result = await db.prepare(`
      DELETE FROM audit_logs 
      WHERE created_at < datetime('now', '-90 days')
    `).run()
    
    const deletedCount = result.meta.changes || 0
    
    if (deletedCount > 0) {
    }
    
    return deletedCount
  } catch (error) {
    console.error('Audit log cleanup error:', error)
    throw error
  }
}

/**
 * Database optimization job
 * Runs VACUUM and ANALYZE on D1 database
 */
export async function optimizeDatabase(db: D1Database): Promise<void> {
  try {
    // Analyze tables for query optimization
    await db.prepare('ANALYZE').run()
    
  } catch (error) {
    console.error('Database optimization error:', error)
    throw error
  }
}

/**
 * Low stock alert job
 * Sends notifications when license stock is low
 */
export async function checkLowStockProducts(db: D1Database): Promise<void> {
  try {
    // Find products with low license stock
    const lowStockProducts = await db.prepare(`
      SELECT 
        p.id,
        p.sku,
        pt.name,
        p.available_licenses,
        COUNT(lk.id) as available_keys
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'en'
      LEFT JOIN license_keys lk ON p.id = lk.product_id AND lk.status = 'available'
      WHERE p.stock_type = 'limited'
        AND p.is_active = 1
      GROUP BY p.id
      HAVING available_keys < 10
      ORDER BY available_keys ASC
    `).all()
    
    if (lowStockProducts.results && lowStockProducts.results.length > 0) {
      
      for (const product of lowStockProducts.results) {
      }
      
      // In production, send email/slack notification to admins
      const auditLogger = new AuditLogger(db)
      await auditLogger.log({
        action: 'low_stock_alert',
        resourceType: 'product',
        changes: {
          count: lowStockProducts.results.length,
          products: lowStockProducts.results.map((p: any) => ({
            id: p.id,
            name: p.name,
            remaining: p.available_keys
          }))
        }
      })
    }
  } catch (error) {
    console.error('Low stock check error:', error)
    throw error
  }
}

/**
 * Main cron handler
 * Called by Cloudflare Workers scheduled trigger
 */
export async function handleScheduledTasks(
  event: ScheduledEvent,
  env: { DB: D1Database }
): Promise<void> {
  const db = env.DB
  const cron = event.cron || 'unknown'
  
  
  try {
    // Every 15 minutes: cleanup sessions and rate limits
    if (cron.includes('*/15') || cron === 'unknown') {
      await cleanupExpiredSessions(db)
      await cleanupRateLimits(db)
    }
    
    // Every hour: check expiring licenses
    if (cron.includes('0 *') || cron === 'unknown') {
      await cleanupExpiredLicenses(db)
    }
    
    // Every 6 hours: cleanup abandoned orders and check low stock
    if (cron.includes('0 */6') || cron === 'unknown') {
      await cleanupAbandonedOrders(db)
      await checkLowStockProducts(db)
    }
    
    // Daily at 3 AM: cleanup old audit logs and optimize database
    if (cron.includes('0 3') || cron === 'unknown') {
      await cleanupOldAuditLogs(db)
      await optimizeDatabase(db)
    }
    
  } catch (error) {
    console.error('Scheduled task error:', error)
    throw error
  }
}

/**
 * Manual trigger for testing
 */
export async function runAllMaintenanceTasks(db: D1Database): Promise<void> {
  
  const sessions = await cleanupExpiredSessions(db)
  const orders = await cleanupAbandonedOrders(db)
  const rateLimits = await cleanupRateLimits(db)
  const auditLogs = await cleanupOldAuditLogs(db)
  
  await cleanupExpiredLicenses(db)
  await checkLowStockProducts(db)
  await optimizeDatabase(db)
  
    sessions_cleaned: sessions,
    orders_cancelled: orders,
    rate_limits_cleaned: rateLimits,
    audit_logs_archived: auditLogs
  })
}
