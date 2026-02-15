// Web Application Firewall (WAF) Middleware
// Endpoint-based firewall with intelligent threat detection

import { Context, Next } from 'hono'

export interface FirewallConfig {
  enabled: boolean
  learningMode: boolean
  bruteForceProtection: boolean
  maxLoginAttempts: number
  lockoutDuration: number
  rateLimitRequests: number
  rateLimitWindow: number
  blockSqlInjection: boolean
  blockXss: boolean
  blockFileUpload: boolean
  blockDirectoryTraversal: boolean
}

// Threat detection patterns
const THREAT_PATTERNS = {
  sql_injection: [
    /(\bunion\b.*\bselect\b|\bselect\b.*\bfrom\b|\binsert\b.*\binto\b|\bdrop\b.*\btable\b)/i,
    /(or\s+1\s*=\s*1|and\s+1\s*=\s*1|'\s*or\s*'1'\s*=\s*'1)/i,
    /(exec\s*\(|execute\s*\(|script\s*\()/i
  ],
  xss: [
    /(<script[^>]*>|javascript:|onerror\s*=|onload\s*=)/i,
    /(eval\s*\(|expression\s*\(|<iframe[^>]*>)/i,
    /(<object|<embed|<applet)/i
  ],
  file_upload: [
    /\.(php|exe|sh|bat|cmd|vbs|js|jar|pif|app)$/i
  ],
  directory_traversal: [
    /(\.\.\/|\.\.\\|%2e%2e%2f|%2e%2e%5c)/i,
    /(etc\/passwd|proc\/self\/environ|\/bin\/sh)/i
  ],
  exploit: [
    /(cmd\.exe|powershell|bash|\/bin\/|system\(|shell_exec)/i,
    /(base64_decode|eval|assert|passthru)/i
  ]
}

/**
 * Main firewall middleware
 */
export async function firewallMiddleware(c: Context, next: Next) {
  const env = c.env
  const db = env.DB
  
  // Skip firewall for admin routes in development
  if (c.req.path.startsWith('/admin') && process.env.NODE_ENV === 'development') {
    return next()
  }

  try {
    // Get firewall settings
    const settings = await getFirewallSettings(db)
    
    if (!settings.enabled) {
      return next()
    }

    const clientIP = getClientIP(c)
    const userAgent = c.req.header('user-agent') || ''
    const requestPath = c.req.path
    const requestMethod = c.req.method

    // 1. Check if IP is blocked
    const isBlocked = await checkBlockedIP(db, clientIP)
    if (isBlocked) {
      await logSecurityEvent(db, {
        event_type: 'attack_blocked',
        severity: 'high',
        ip_address: clientIP,
        user_agent: userAgent,
        request_path: requestPath,
        request_method: requestMethod,
        attack_type: 'ip_blocked',
        details: 'Blocked IP attempted access',
        is_blocked: 1
      })
      return c.json({ error: 'Access denied' }, 403)
    }

    // 2. Rate limiting
    if (await isRateLimited(db, clientIP, settings)) {
      await logSecurityEvent(db, {
        event_type: 'attack_blocked',
        severity: 'medium',
        ip_address: clientIP,
        user_agent: userAgent,
        request_path: requestPath,
        request_method: requestMethod,
        attack_type: 'rate_limit_exceeded',
        details: 'Rate limit exceeded',
        is_blocked: 1
      })
      return c.json({ error: 'Too many requests' }, 429)
    }

    // 3. Threat detection
    const threat = await detectThreats(c, settings)
    if (threat) {
      await logSecurityEvent(db, {
        event_type: 'attack_blocked',
        severity: threat.severity,
        ip_address: clientIP,
        user_agent: userAgent,
        request_path: requestPath,
        request_method: requestMethod,
        attack_type: threat.type,
        details: threat.details,
        is_blocked: !settings.learningMode ? 1 : 0
      })

      // In learning mode, log but don't block
      if (!settings.learningMode) {
        // Auto-block IP if multiple threats detected
        const recentThreats = await db.prepare(`
          SELECT COUNT(*) as count FROM security_events
          WHERE ip_address = ? 
          AND created_at >= datetime('now', '-1 hour')
          AND is_blocked = 1
        `).bind(clientIP).first() as any
        
        if (recentThreats && recentThreats.count >= 3) {
          await blockIP(db, clientIP, 'automatic', 'Multiple threats detected', 3600)
        }

        return c.json({ error: 'Security threat detected' }, 403)
      }
    }

    // 4. Continue to next middleware
    await next()

  } catch (error: any) {
    console.error('Firewall middleware error:', error)
    // Don't block on firewall errors, just log and continue
    await next()
  }
}

/**
 * Get client IP address
 */
function getClientIP(c: Context): string {
  return c.req.header('cf-connecting-ip') || 
         c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ||
         c.req.header('x-real-ip') ||
         '0.0.0.0'
}

/**
 * Get firewall settings from database
 */
async function getFirewallSettings(db: any): Promise<FirewallConfig> {
  const settings = await db.prepare(`
    SELECT setting_key, setting_value FROM firewall_settings
  `).all()

  const config: any = {
    enabled: true,
    learningMode: false,
    bruteForceProtection: true,
    maxLoginAttempts: 5,
    lockoutDuration: 3600,
    rateLimitRequests: 100,
    rateLimitWindow: 60,
    blockSqlInjection: true,
    blockXss: true,
    blockFileUpload: true,
    blockDirectoryTraversal: true
  }

  if (settings.results) {
    for (const row of settings.results) {
      const key = (row as any).setting_key
      const value = (row as any).setting_value
      
      if (key === 'firewall_enabled') config.enabled = value === '1'
      else if (key === 'learning_mode') config.learningMode = value === '1'
      else if (key === 'brute_force_protection') config.bruteForceProtection = value === '1'
      else if (key === 'max_login_attempts') config.maxLoginAttempts = parseInt(value)
      else if (key === 'lockout_duration') config.lockoutDuration = parseInt(value)
      else if (key === 'rate_limit_requests') config.rateLimitRequests = parseInt(value)
      else if (key === 'rate_limit_window') config.rateLimitWindow = parseInt(value)
      else if (key === 'block_sql_injection') config.blockSqlInjection = value === '1'
      else if (key === 'block_xss') config.blockXss = value === '1'
      else if (key === 'block_file_upload') config.blockFileUpload = value === '1'
      else if (key === 'block_directory_traversal') config.blockDirectoryTraversal = value === '1'
    }
  }

  return config
}

/**
 * Check if IP is blocked
 */
async function checkBlockedIP(db: any, ip: string): Promise<boolean> {
  const blocked = await db.prepare(`
    SELECT id FROM blocked_ips
    WHERE ip_address = ?
    AND is_active = 1
    AND (blocked_until IS NULL OR blocked_until > datetime('now'))
  `).bind(ip).first()

  if (blocked) {
    // Update hit count
    await db.prepare(`
      UPDATE blocked_ips 
      SET hit_count = hit_count + 1, updated_at = CURRENT_TIMESTAMP
      WHERE ip_address = ?
    `).bind(ip).run()
    return true
  }

  return false
}

/**
 * Check rate limiting
 */
async function isRateLimited(db: any, ip: string, settings: FirewallConfig): Promise<boolean> {
  const windowStart = new Date(Date.now() - settings.rateLimitWindow * 1000)
  
  const requests = await db.prepare(`
    SELECT COUNT(*) as count FROM security_events
    WHERE ip_address = ?
    AND created_at >= datetime(?)
  `).bind(ip, windowStart.toISOString()).first() as any

  return requests && requests.count > settings.rateLimitRequests
}

/**
 * Detect security threats in request
 */
async function detectThreats(c: Context, settings: FirewallConfig): Promise<any> {
  const url = new URL(c.req.url)
  const queryString = url.search
  const requestPath = url.pathname
  const body = c.req.method === 'POST' ? await c.req.text() : ''

  // Check SQL Injection
  if (settings.blockSqlInjection) {
    for (const pattern of THREAT_PATTERNS.sql_injection) {
      if (pattern.test(queryString) || pattern.test(body)) {
        return {
          type: 'sql_injection',
          severity: 'high',
          details: 'SQL Injection attempt detected'
        }
      }
    }
  }

  // Check XSS
  if (settings.blockXss) {
    for (const pattern of THREAT_PATTERNS.xss) {
      if (pattern.test(queryString) || pattern.test(body)) {
        return {
          type: 'xss',
          severity: 'high',
          details: 'Cross-site scripting attempt detected'
        }
      }
    }
  }

  // Check Directory Traversal
  if (settings.blockDirectoryTraversal) {
    for (const pattern of THREAT_PATTERNS.directory_traversal) {
      if (pattern.test(requestPath) || pattern.test(queryString)) {
        return {
          type: 'directory_traversal',
          severity: 'high',
          details: 'Directory traversal attempt detected'
        }
      }
    }
  }

  // Check File Upload
  if (settings.blockFileUpload) {
    for (const pattern of THREAT_PATTERNS.file_upload) {
      if (pattern.test(requestPath)) {
        return {
          type: 'file_upload',
          severity: 'critical',
          details: 'Malicious file upload attempt detected'
        }
      }
    }
  }

  // Check Exploit Patterns
  for (const pattern of THREAT_PATTERNS.exploit) {
    if (pattern.test(queryString) || pattern.test(body)) {
      return {
        type: 'exploit',
        severity: 'critical',
        details: 'Exploit attempt detected'
      }
    }
  }

  return null
}

/**
 * Log security event
 */
async function logSecurityEvent(db: any, event: any) {
  try {
    await db.prepare(`
      INSERT INTO security_events (
        event_type, severity, ip_address, user_agent,
        request_path, request_method, attack_type, details, is_blocked
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      event.event_type,
      event.severity,
      event.ip_address,
      event.user_agent,
      event.request_path,
      event.request_method,
      event.attack_type,
      event.details,
      event.is_blocked
    ).run()
  } catch (error) {
    console.error('Failed to log security event:', error)
  }
}

/**
 * Block an IP address
 */
export async function blockIP(db: any, ip: string, blockType: string, reason: string, duration?: number) {
  const blockedUntil = duration ? new Date(Date.now() + duration * 1000).toISOString() : null

  await db.prepare(`
    INSERT OR REPLACE INTO blocked_ips (ip_address, reason, block_type, blocked_until, is_active)
    VALUES (?, ?, ?, ?, 1)
  `).bind(ip, reason, blockType, blockedUntil).run()
}

/**
 * Brute force protection for login attempts
 */
export async function checkBruteForce(db: any, ip: string, username: string): Promise<boolean> {
  const settings = await getFirewallSettings(db)
  
  if (!settings.bruteForceProtection) {
    return false
  }

  // Count recent failed attempts
  const attempts = await db.prepare(`
    SELECT COUNT(*) as count FROM login_attempts
    WHERE ip_address = ?
    AND is_success = 0
    AND created_at >= datetime('now', '-15 minutes')
  `).bind(ip).first() as any

  if (attempts && attempts.count >= settings.maxLoginAttempts) {
    // Block IP temporarily
    await blockIP(db, ip, 'brute_force', `Too many failed login attempts for ${username}`, settings.lockoutDuration)
    return true
  }

  return false
}

/**
 * Log login attempt
 */
export async function logLoginAttempt(db: any, ip: string, username: string, success: boolean, userAgent: string) {
  await db.prepare(`
    INSERT INTO login_attempts (ip_address, username, is_success, user_agent)
    VALUES (?, ?, ?, ?)
  `).bind(ip, username, success ? 1 : 0, userAgent).run()
}
