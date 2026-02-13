/**
 * Audit Log Service
 * Tracks all user actions and system events
 */

import { D1Database } from '@cloudflare/workers-types'

export interface AuditLogEntry {
  userId: string
  action: string
  module: string
  details?: any
  ipAddress: string
  userAgent?: string
  severity?: 'info' | 'warning' | 'error' | 'security'
}

export interface AuditLogFilter {
  userId?: string
  action?: string
  module?: string
  severity?: string
  startDate?: string
  endDate?: string
  ipAddress?: string
  search?: string
  limit?: number
  offset?: number
}

export class AuditLogService {
  private db: D1Database

  constructor(db: D1Database) {
    this.db = db
  }

  /**
   * Log an action
   */
  async log(entry: AuditLogEntry): Promise<boolean> {
    try {
      await this.db.prepare(`
        INSERT INTO system_activity_log (
          user_id, action, module, details, 
          ip_address, user_agent, severity, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        entry.userId,
        entry.action,
        entry.module,
        entry.details ? JSON.stringify(entry.details) : null,
        entry.ipAddress,
        entry.userAgent || null,
        entry.severity || 'info'
      ).run()

      return true
    } catch (error) {
      console.error('Failed to write audit log:', error)
      return false
    }
  }

  /**
   * Get logs with filtering
   */
  async getLogs(filter: AuditLogFilter = {}): Promise<{
    logs: any[]
    total: number
    hasMore: boolean
  }> {
    try {
      const conditions: string[] = ['1=1']
      const params: any[] = []

      // Build WHERE clause
      if (filter.userId) {
        conditions.push('user_id = ?')
        params.push(filter.userId)
      }

      if (filter.action) {
        conditions.push('action = ?')
        params.push(filter.action)
      }

      if (filter.module) {
        conditions.push('module = ?')
        params.push(filter.module)
      }

      if (filter.severity) {
        conditions.push('severity = ?')
        params.push(filter.severity)
      }

      if (filter.ipAddress) {
        conditions.push('ip_address = ?')
        params.push(filter.ipAddress)
      }

      if (filter.startDate) {
        conditions.push('created_at >= ?')
        params.push(filter.startDate)
      }

      if (filter.endDate) {
        conditions.push('created_at <= ?')
        params.push(filter.endDate)
      }

      if (filter.search) {
        conditions.push('(action LIKE ? OR module LIKE ? OR details LIKE ?)')
        const searchPattern = `%${filter.search}%`
        params.push(searchPattern, searchPattern, searchPattern)
      }

      const whereClause = conditions.join(' AND ')
      const limit = filter.limit || 50
      const offset = filter.offset || 0

      // Get total count
      const countResult = await this.db.prepare(`
        SELECT COUNT(*) as total
        FROM system_activity_log
        WHERE ${whereClause}
      `).bind(...params).first() as { total: number } | null

      const total = countResult?.total || 0

      // Get logs
      const logs = await this.db.prepare(`
        SELECT 
          id, user_id, action, module, details,
          ip_address, user_agent, severity, created_at
        FROM system_activity_log
        WHERE ${whereClause}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `).bind(...params, limit, offset).all()

      return {
        logs: logs.results.map((log: any) => ({
          ...log,
          details: log.details ? JSON.parse(log.details) : null
        })),
        total,
        hasMore: offset + logs.results.length < total
      }
    } catch (error) {
      console.error('Failed to get audit logs:', error)
      return {
        logs: [],
        total: 0,
        hasMore: false
      }
    }
  }

  /**
   * Get user activity summary
   */
  async getUserActivity(userId: string, days: number = 30): Promise<{
    totalActions: number
    actionsByType: Record<string, number>
    recentActions: any[]
  }> {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      // Total actions
      const totalResult = await this.db.prepare(`
        SELECT COUNT(*) as total
        FROM system_activity_log
        WHERE user_id = ? AND created_at >= ?
      `).bind(userId, startDate.toISOString()).first() as { total: number } | null

      // Actions by type
      const typeResults = await this.db.prepare(`
        SELECT action, COUNT(*) as count
        FROM system_activity_log
        WHERE user_id = ? AND created_at >= ?
        GROUP BY action
        ORDER BY count DESC
      `).bind(userId, startDate.toISOString()).all()

      const actionsByType: Record<string, number> = {}
      for (const row of typeResults.results as any[]) {
        actionsByType[row.action] = row.count
      }

      // Recent actions
      const recentResults = await this.db.prepare(`
        SELECT action, module, created_at, ip_address
        FROM system_activity_log
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT 10
      `).bind(userId).all()

      return {
        totalActions: totalResult?.total || 0,
        actionsByType,
        recentActions: recentResults.results
      }
    } catch (error) {
      console.error('Failed to get user activity:', error)
      return {
        totalActions: 0,
        actionsByType: {},
        recentActions: []
      }
    }
  }

  /**
   * Get security events
   */
  async getSecurityEvents(hours: number = 24): Promise<any[]> {
    try {
      const startTime = new Date()
      startTime.setHours(startTime.getHours() - hours)

      const results = await this.db.prepare(`
        SELECT 
          user_id, action, module, details,
          ip_address, created_at, severity
        FROM system_activity_log
        WHERE 
          severity = 'security'
          AND created_at >= ?
        ORDER BY created_at DESC
        LIMIT 100
      `).bind(startTime.toISOString()).all()

      return results.results.map((log: any) => ({
        ...log,
        details: log.details ? JSON.parse(log.details) : null
      }))
    } catch (error) {
      console.error('Failed to get security events:', error)
      return []
    }
  }

  /**
   * Export logs to CSV
   */
  async exportToCSV(filter: AuditLogFilter = {}): Promise<string> {
    const { logs } = await this.getLogs({ ...filter, limit: 10000 })

    const headers = ['Timestamp', 'User ID', 'Action', 'Module', 'Severity', 'IP Address', 'Details']
    const rows = logs.map(log => [
      log.created_at,
      log.user_id,
      log.action,
      log.module,
      log.severity,
      log.ip_address,
      log.details ? JSON.stringify(log.details) : ''
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    return csv
  }

  /**
   * Clean old logs
   */
  async cleanOldLogs(daysToKeep: number = 90): Promise<number> {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

      const result = await this.db.prepare(`
        DELETE FROM system_activity_log
        WHERE created_at < ?
      `).bind(cutoffDate.toISOString()).run()

      return result.meta.changes || 0
    } catch (error) {
      console.error('Failed to clean old logs:', error)
      return 0
    }
  }

  /**
   * Get action statistics
   */
  async getStatistics(days: number = 7): Promise<{
    totalActions: number
    actionsByDay: Record<string, number>
    topUsers: Array<{ userId: string; count: number }>
    topModules: Array<{ module: string; count: number }>
    severityBreakdown: Record<string, number>
  }> {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      // Total actions
      const totalResult = await this.db.prepare(`
        SELECT COUNT(*) as total
        FROM system_activity_log
        WHERE created_at >= ?
      `).bind(startDate.toISOString()).first() as { total: number } | null

      // Actions by day
      const dayResults = await this.db.prepare(`
        SELECT DATE(created_at) as day, COUNT(*) as count
        FROM system_activity_log
        WHERE created_at >= ?
        GROUP BY DATE(created_at)
        ORDER BY day
      `).bind(startDate.toISOString()).all()

      const actionsByDay: Record<string, number> = {}
      for (const row of dayResults.results as any[]) {
        actionsByDay[row.day] = row.count
      }

      // Top users
      const userResults = await this.db.prepare(`
        SELECT user_id, COUNT(*) as count
        FROM system_activity_log
        WHERE created_at >= ?
        GROUP BY user_id
        ORDER BY count DESC
        LIMIT 10
      `).bind(startDate.toISOString()).all()

      const topUsers = userResults.results.map((row: any) => ({
        userId: row.user_id,
        count: row.count
      }))

      // Top modules
      const moduleResults = await this.db.prepare(`
        SELECT module, COUNT(*) as count
        FROM system_activity_log
        WHERE created_at >= ?
        GROUP BY module
        ORDER BY count DESC
        LIMIT 10
      `).bind(startDate.toISOString()).all()

      const topModules = moduleResults.results.map((row: any) => ({
        module: row.module,
        count: row.count
      }))

      // Severity breakdown
      const severityResults = await this.db.prepare(`
        SELECT severity, COUNT(*) as count
        FROM system_activity_log
        WHERE created_at >= ?
        GROUP BY severity
      `).bind(startDate.toISOString()).all()

      const severityBreakdown: Record<string, number> = {}
      for (const row of severityResults.results as any[]) {
        severityBreakdown[row.severity] = row.count
      }

      return {
        totalActions: totalResult?.total || 0,
        actionsByDay,
        topUsers,
        topModules,
        severityBreakdown
      }
    } catch (error) {
      console.error('Failed to get statistics:', error)
      return {
        totalActions: 0,
        actionsByDay: {},
        topUsers: [],
        topModules: [],
        severityBreakdown: {}
      }
    }
  }
}
