// Audit Logging System
// Tracks all admin actions, security events, and data changes

import type { D1Database } from '@cloudflare/workers-types'
import type { Context } from 'hono'

export interface AuditLog {
  id: number
  user_id?: number
  action: string
  resource_type: string
  resource_id?: number
  changes?: string // JSON
  ip_address?: string
  user_agent?: string
  created_at: string
}

export interface AuditLogEntry {
  action: string
  resourceType: string
  resourceId?: number
  changes?: Record<string, any>
  userId?: number
  ipAddress?: string
  userAgent?: string
}

// ============================================
// AUDIT LOGGER
// ============================================

export class AuditLogger {
  constructor(private db: D1Database) {}

  /**
   * Log an action
   */
  async log(entry: AuditLogEntry): Promise<void> {
    try {
      await this.db.prepare(`
        INSERT INTO audit_logs (
          user_id,
          action,
          resource_type,
          resource_id,
          changes,
          ip_address,
          user_agent,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `).bind(
        entry.userId || null,
        entry.action,
        entry.resourceType,
        entry.resourceId || null,
        entry.changes ? JSON.stringify(entry.changes) : null,
        entry.ipAddress || null,
        entry.userAgent || null
      ).run()
    } catch (error) {
      console.error('Failed to write audit log:', error)
      // Don't throw - audit logging should not break application
    }
  }

  /**
   * Get audit logs with filtering
   */
  async getLogs(filters: {
    userId?: number
    action?: string
    resourceType?: string
    resourceId?: number
    startDate?: string
    endDate?: string
    limit?: number
    offset?: number
  }): Promise<{ logs: AuditLog[]; total: number }> {
    let query = 'SELECT * FROM audit_logs WHERE 1=1'
    const params: any[] = []

    if (filters.userId) {
      query += ' AND user_id = ?'
      params.push(filters.userId)
    }

    if (filters.action) {
      query += ' AND action = ?'
      params.push(filters.action)
    }

    if (filters.resourceType) {
      query += ' AND resource_type = ?'
      params.push(filters.resourceType)
    }

    if (filters.resourceId) {
      query += ' AND resource_id = ?'
      params.push(filters.resourceId)
    }

    if (filters.startDate) {
      query += ' AND created_at >= ?'
      params.push(filters.startDate)
    }

    if (filters.endDate) {
      query += ' AND created_at <= ?'
      params.push(filters.endDate)
    }

    query += ' ORDER BY created_at DESC'

    if (filters.limit) {
      query += ' LIMIT ?'
      params.push(filters.limit)
    }

    if (filters.offset) {
      query += ' OFFSET ?'
      params.push(filters.offset)
    }

    const results = await this.db.prepare(query).bind(...params).all()

    // Get total count
    let countQuery = 'SELECT COUNT(*) as count FROM audit_logs WHERE 1=1'
    const countParams: any[] = []

    if (filters.userId) {
      countQuery += ' AND user_id = ?'
      countParams.push(filters.userId)
    }

    if (filters.action) {
      countQuery += ' AND action = ?'
      countParams.push(filters.action)
    }

    if (filters.resourceType) {
      countQuery += ' AND resource_type = ?'
      countParams.push(filters.resourceType)
    }

    const countResult = await this.db.prepare(countQuery).bind(...countParams).first()

    return {
      logs: (results.results || []) as AuditLog[],
      total: (countResult?.count as number) || 0
    }
  }

  /**
   * Get recent activity for a user
   */
  async getUserActivity(userId: number, limit: number = 50): Promise<AuditLog[]> {
    const results = await this.db.prepare(`
      SELECT * FROM audit_logs
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(userId, limit).all()

    return (results.results || []) as AuditLog[]
  }

  /**
   * Get admin activity summary
   */
  async getAdminActivitySummary(days: number = 7): Promise<{
    totalActions: number
    actionsByType: Record<string, number>
    topAdmins: Array<{ user_id: number; action_count: number }>
  }> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Total actions
    const totalResult = await this.db.prepare(`
      SELECT COUNT(*) as count
      FROM audit_logs
      WHERE created_at >= ?
    `).bind(startDate.toISOString()).first()

    const totalActions = (totalResult?.count as number) || 0

    // Actions by type
    const typeResults = await this.db.prepare(`
      SELECT action, COUNT(*) as count
      FROM audit_logs
      WHERE created_at >= ?
      GROUP BY action
      ORDER BY count DESC
    `).bind(startDate.toISOString()).all()

    const actionsByType: Record<string, number> = {}
    for (const row of typeResults.results || []) {
      actionsByType[row.action as string] = row.count as number
    }

    // Top admins
    const adminResults = await this.db.prepare(`
      SELECT user_id, COUNT(*) as action_count
      FROM audit_logs
      WHERE created_at >= ? AND user_id IS NOT NULL
      GROUP BY user_id
      ORDER BY action_count DESC
      LIMIT 10
    `).bind(startDate.toISOString()).all()

    const topAdmins = (adminResults.results || []) as Array<{ user_id: number; action_count: number }>

    return {
      totalActions,
      actionsByType,
      topAdmins
    }
  }
}

// ============================================
// AUDIT MIDDLEWARE
// ============================================

export const auditMiddleware = (db: D1Database) => {
  const logger = new AuditLogger(db)

  return async (c: Context, next: any) => {
    const startTime = Date.now()
    
    // Capture request details
    const method = c.req.method
    const path = c.req.path
    const ipAddress = c.req.header('x-forwarded-for') || 
                     c.req.header('cf-connecting-ip') || 
                     'unknown'
    const userAgent = c.req.header('user-agent') || 'unknown'
    const currentUser = c.get('currentUser')

    // Continue with request
    await next()

    // Log after response
    const duration = Date.now() - startTime
    const status = c.res.status

    // Only log state-changing operations and admin actions
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method) || path.startsWith('/admin')) {
      try {
        await logger.log({
          action: `${method} ${path}`,
          resourceType: path.split('/')[2] || 'unknown',
          userId: currentUser?.id,
          ipAddress,
          userAgent,
          changes: {
            status,
            duration_ms: duration
          }
        })
      } catch (error) {
        console.error('Audit logging failed:', error)
      }
    }
  }
}

// ============================================
// SECURITY EVENT LOGGER
// ============================================

export class SecurityLogger {
  constructor(private db: D1Database) {}

  /**
   * Log failed login attempt
   */
  async logFailedLogin(email: string, ipAddress: string, reason: string): Promise<void> {
    const logger = new AuditLogger(this.db)
    await logger.log({
      action: 'failed_login',
      resourceType: 'security',
      changes: { email, reason },
      ipAddress
    })
  }

  /**
   * Log successful login
   */
  async logSuccessfulLogin(userId: number, ipAddress: string): Promise<void> {
    const logger = new AuditLogger(this.db)
    await logger.log({
      action: 'successful_login',
      resourceType: 'security',
      userId,
      ipAddress
    })
  }

  /**
   * Log password change
   */
  async logPasswordChange(userId: number, ipAddress: string): Promise<void> {
    const logger = new AuditLogger(this.db)
    await logger.log({
      action: 'password_changed',
      resourceType: 'security',
      userId,
      ipAddress
    })
  }

  /**
   * Log suspicious activity
   */
  async logSuspiciousActivity(
    description: string,
    ipAddress: string,
    userId?: number
  ): Promise<void> {
    const logger = new AuditLogger(this.db)
    await logger.log({
      action: 'suspicious_activity',
      resourceType: 'security',
      userId,
      changes: { description },
      ipAddress
    })
  }

  /**
   * Log security event (generic)
   */
  async logSecurityEvent(
    eventType: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    details: Record<string, any>,
    ipAddress?: string,
    userId?: number
  ): Promise<void> {
    const logger = new AuditLogger(this.db)
    await logger.log({
      action: `security_${eventType}`,
      resourceType: 'security',
      userId,
      changes: { severity, ...details },
      ipAddress
    })
  }

  /**
   * Get security events
   */
  async getSecurityEvents(days: number = 30): Promise<AuditLog[]> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const results = await this.db.prepare(`
      SELECT * FROM audit_logs
      WHERE resource_type = 'security'
        AND created_at >= ?
      ORDER BY created_at DESC
      LIMIT 1000
    `).bind(startDate.toISOString()).all()

    return (results.results || []) as AuditLog[]
  }
}

// ============================================
// DATA CHANGE TRACKER
// ============================================

export class DataChangeTracker {
  constructor(private db: D1Database) {}

  /**
   * Track data changes with before/after snapshots
   */
  async trackChange(
    userId: number,
    resourceType: string,
    resourceId: number,
    action: 'create' | 'update' | 'delete',
    before: Record<string, any> | null,
    after: Record<string, any> | null
  ): Promise<void> {
    const logger = new AuditLogger(this.db)

    const changes: Record<string, any> = {
      action
    }

    if (action === 'update' && before && after) {
      // Calculate diff
      const diff: Record<string, { old: any; new: any }> = {}
      
      for (const key in after) {
        if (before[key] !== after[key]) {
          diff[key] = {
            old: before[key],
            new: after[key]
          }
        }
      }

      changes.diff = diff
    } else if (action === 'create') {
      changes.data = after
    } else if (action === 'delete') {
      changes.data = before
    }

    await logger.log({
      action: `${action}_${resourceType}`,
      resourceType,
      resourceId,
      userId,
      changes
    })
  }

  /**
   * Get change history for a resource
   */
  async getChangeHistory(
    resourceType: string,
    resourceId: number
  ): Promise<AuditLog[]> {
    const results = await this.db.prepare(`
      SELECT * FROM audit_logs
      WHERE resource_type = ?
        AND resource_id = ?
      ORDER BY created_at DESC
      LIMIT 100
    `).bind(resourceType, resourceId).all()

    return (results.results || []) as AuditLog[]
  }
}

// ============================================
// AUDIT REPORT GENERATOR
// ============================================

export class AuditReportGenerator {
  constructor(private db: D1Database) {}

  /**
   * Generate compliance report
   */
  async generateComplianceReport(startDate: string, endDate: string): Promise<{
    period: { start: string; end: string }
    summary: {
      totalActions: number
      uniqueUsers: number
      criticalActions: number
    }
    topActions: Array<{ action: string; count: number }>
    securityEvents: number
    dataChanges: number
  }> {
    // Total actions
    const totalResult = await this.db.prepare(`
      SELECT COUNT(*) as count
      FROM audit_logs
      WHERE created_at BETWEEN ? AND ?
    `).bind(startDate, endDate).first()

    // Unique users
    const usersResult = await this.db.prepare(`
      SELECT COUNT(DISTINCT user_id) as count
      FROM audit_logs
      WHERE created_at BETWEEN ? AND ? AND user_id IS NOT NULL
    `).bind(startDate, endDate).first()

    // Critical actions
    const criticalResult = await this.db.prepare(`
      SELECT COUNT(*) as count
      FROM audit_logs
      WHERE created_at BETWEEN ? AND ?
        AND action IN ('delete_product', 'revoke_license', 'delete_user', 'change_permissions')
    `).bind(startDate, endDate).first()

    // Top actions
    const topActionsResult = await this.db.prepare(`
      SELECT action, COUNT(*) as count
      FROM audit_logs
      WHERE created_at BETWEEN ? AND ?
      GROUP BY action
      ORDER BY count DESC
      LIMIT 10
    `).bind(startDate, endDate).all()

    // Security events
    const securityResult = await this.db.prepare(`
      SELECT COUNT(*) as count
      FROM audit_logs
      WHERE created_at BETWEEN ? AND ?
        AND resource_type = 'security'
    `).bind(startDate, endDate).first()

    // Data changes
    const changesResult = await this.db.prepare(`
      SELECT COUNT(*) as count
      FROM audit_logs
      WHERE created_at BETWEEN ? AND ?
        AND action LIKE '%update%' OR action LIKE '%delete%' OR action LIKE '%create%'
    `).bind(startDate, endDate).first()

    return {
      period: { start: startDate, end: endDate },
      summary: {
        totalActions: (totalResult?.count as number) || 0,
        uniqueUsers: (usersResult?.count as number) || 0,
        criticalActions: (criticalResult?.count as number) || 0
      },
      topActions: (topActionsResult.results || []) as Array<{ action: string; count: number }>,
      securityEvents: (securityResult?.count as number) || 0,
      dataChanges: (changesResult?.count as number) || 0
    }
  }

  /**
   * Export audit logs to CSV
   */
  async exportToCSV(startDate: string, endDate: string): Promise<string> {
    const logs = await this.db.prepare(`
      SELECT * FROM audit_logs
      WHERE created_at BETWEEN ? AND ?
      ORDER BY created_at DESC
    `).bind(startDate, endDate).all()

    const csv: string[] = [
      'ID,User ID,Action,Resource Type,Resource ID,IP Address,Created At'
    ]

    for (const log of logs.results || []) {
      const row = [
        log.id,
        log.user_id || '',
        log.action,
        log.resource_type,
        log.resource_id || '',
        log.ip_address || '',
        log.created_at
      ].join(',')
      csv.push(row)
    }

    return csv.join('\n')
  }
}
