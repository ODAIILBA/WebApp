// ============================================
// ADVANCED FIREWALL SYSTEM - API ENDPOINTS
// ============================================

import { Hono } from 'hono'

export function registerFirewallAPI(app: Hono<{ Bindings: { DB: D1Database } }>) {

// Get all firewall rules with analytics
app.get('/api/admin/firewall/rules', async (c) => {
  try {
    const { env } = c
    const rules = await env.DB.prepare(`
      SELECT fr.*, 
             COUNT(DISTINCT fe.id) as hit_count,
             MAX(fe.created_at) as last_triggered
      FROM firewall_rules fr
      LEFT JOIN (
        SELECT id, rule_id, created_at 
        FROM firewall_audit 
        WHERE action_type = 'rule_triggered'
      ) fe ON fr.id = fe.rule_id
      WHERE fr.is_active = 1
      GROUP BY fr.id
      ORDER BY fr.priority ASC, fr.created_at DESC
    `).all()
    
    return c.json({ success: true, rules: rules.results || [] })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Create new firewall rule
app.post('/api/admin/firewall/rules', async (c) => {
  try {
    const { env } = c
    const body = await c.req.json()
    
    // Get max priority
    const maxPriority = await env.DB.prepare('SELECT MAX(priority) as max FROM firewall_rules').first() as any
    const newPriority = (maxPriority?.max || 0) + 1
    
    const result = await env.DB.prepare(`
      INSERT INTO firewall_rules (
        rule_name, rule_type, target_type, target_value, 
        action, priority, conditions, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `).bind(
      body.rule_name,
      body.rule_type || 'block',
      body.target_type,
      body.target_value,
      body.action || 'block',
      newPriority,
      JSON.stringify(body.conditions || {})
    ).run()
    
    // Audit log
    await env.DB.prepare(`
      INSERT INTO firewall_audit (rule_id, action_type, old_value, new_value, changed_by)
      VALUES (?, 'rule_created', NULL, ?, 'admin')
    `).bind(result.meta.last_row_id, JSON.stringify(body)).run()
    
    return c.json({ success: true, ruleId: result.meta.last_row_id })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update rule priority (for drag-and-drop)
app.post('/api/admin/firewall/rules/reorder', async (c) => {
  try {
    const { env } = c
    const { rules } = await c.req.json() // Array of {id, priority}
    
    for (const rule of rules) {
      await env.DB.prepare('UPDATE firewall_rules SET priority = ? WHERE id = ?')
        .bind(rule.priority, rule.id)
        .run()
    }
    
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Toggle rule active status
app.post('/api/admin/firewall/rules/:id/toggle', async (c) => {
  try {
    const { env } = c
    const id = c.req.param('id')
    
    await env.DB.prepare(`
      UPDATE firewall_rules 
      SET is_active = NOT is_active, updated_at = datetime('now')
      WHERE id = ?
    `).bind(id).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Duplicate rule
app.post('/api/admin/firewall/rules/:id/duplicate', async (c) => {
  try {
    const { env } = c
    const id = c.req.param('id')
    
    const original = await env.DB.prepare('SELECT * FROM firewall_rules WHERE id = ?').bind(id).first()
    if (!original) {
      return c.json({ success: false, error: 'Rule not found' }, 404)
    }
    
    const result = await env.DB.prepare(`
      INSERT INTO firewall_rules (
        rule_name, rule_type, target_type, target_value, action, 
        priority, conditions, is_active
      ) SELECT 
        rule_name || ' (Kopie)', rule_type, target_type, target_value, action,
        priority + 1, conditions, 0
      FROM firewall_rules WHERE id = ?
    `).bind(id).run()
    
    return c.json({ success: true, ruleId: result.meta.last_row_id })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete rule
app.delete('/api/admin/firewall/rules/:id', async (c) => {
  try {
    const { env } = c
    const id = c.req.param('id')
    
    await env.DB.prepare('UPDATE firewall_rules SET is_active = 0, updated_at = datetime(\'now\') WHERE id = ?')
      .bind(id).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Test rule simulation
app.post('/api/admin/firewall/rules/test', async (c) => {
  try {
    const { env } = c
    const { rule, testRequest } = await c.req.json()
    
    // Simulate rule evaluation
    let matched = false
    let reason = ''
    
    const conditions = typeof rule.conditions === 'string' 
      ? JSON.parse(rule.conditions) 
      : rule.conditions || {}
    
    // Check each condition
    if (rule.target_type === 'ip_address' && testRequest.ip === rule.target_value) {
      matched = true
      reason = 'IP-Adresse stimmt überein'
    } else if (rule.target_type === 'country' && testRequest.country === rule.target_value) {
      matched = true
      reason = 'Land stimmt überein'
    } else if (rule.target_type === 'url_path' && testRequest.path?.includes(rule.target_value)) {
      matched = true
      reason = 'URL-Pfad stimmt überein'
    } else if (rule.target_type === 'http_method' && testRequest.method === rule.target_value) {
      matched = true
      reason = 'HTTP-Methode stimmt überein'
    } else if (rule.target_type === 'user_agent' && testRequest.userAgent?.includes(rule.target_value)) {
      matched = true
      reason = 'User-Agent stimmt überein'
    }
    
    return c.json({
      success: true,
      matched,
      action: matched ? rule.action : 'allow',
      reason: matched ? reason : 'Keine Übereinstimmung',
      rule: rule.rule_name
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get live attack analytics
app.get('/api/admin/firewall/analytics', async (c) => {
  try {
    const { env } = c
    
    const [stats, topIPs, topCountries, attackTypes, timeline] = await Promise.all([
      // Today's stats
      (async () => {
        const [blocked, suspicious, topIP, requests] = await Promise.all([
          env.DB.prepare(`SELECT COUNT(*) as count FROM security_events 
            WHERE DATE(created_at) = DATE('now') AND is_blocked = 1`).first(),
          env.DB.prepare(`SELECT COUNT(*) as count FROM security_events 
            WHERE DATE(created_at) = DATE('now') AND threat_score > 50`).first(),
          env.DB.prepare(`SELECT ip_address, COUNT(*) as count FROM security_events 
            WHERE DATE(created_at) = DATE('now') 
            GROUP BY ip_address ORDER BY count DESC LIMIT 1`).first(),
          env.DB.prepare(`SELECT COUNT(*) as count FROM security_events 
            WHERE created_at >= datetime('now', '-1 hour')`).first()
        ])
        return {
          blockedToday: (blocked as any)?.count || 0,
          suspiciousToday: (suspicious as any)?.count || 0,
          topBlockedIP: (topIP as any)?.ip_address || 'N/A',
          topBlockedCount: (topIP as any)?.count || 0,
          requestsPerMinute: Math.round(((requests as any)?.count || 0) / 60)
        }
      })(),
      
      // Top blocked IPs (last 24h)
      env.DB.prepare(`
        SELECT ip_address, COUNT(*) as count, MAX(created_at) as last_seen
        FROM security_events
        WHERE created_at >= datetime('now', '-24 hours') AND is_blocked = 1
        GROUP BY ip_address
        ORDER BY count DESC
        LIMIT 10
      `).all().then(r => r.results || []),
      
      // Top countries (if available)
      env.DB.prepare(`
        SELECT country_code, COUNT(*) as count
        FROM security_events
        WHERE created_at >= datetime('now', '-24 hours') AND country_code IS NOT NULL
        GROUP BY country_code
        ORDER BY count DESC
        LIMIT 10
      `).all().then(r => r.results || []),
      
      // Attack types distribution
      env.DB.prepare(`
        SELECT attack_type, COUNT(*) as count
        FROM security_events
        WHERE created_at >= datetime('now', '-24 hours')
        GROUP BY attack_type
        ORDER BY count DESC
        LIMIT 10
      `).all().then(r => r.results || []),
      
      // Requests timeline (last 24 hours, grouped by hour)
      env.DB.prepare(`
        SELECT 
          strftime('%H:00', created_at) as hour,
          COUNT(*) as total,
          SUM(CASE WHEN is_blocked = 1 THEN 1 ELSE 0 END) as blocked
        FROM security_events
        WHERE created_at >= datetime('now', '-24 hours')
        GROUP BY hour
        ORDER BY hour ASC
      `).all().then(r => r.results || [])
    ])
    
    return c.json({
      success: true,
      stats,
      topIPs,
      topCountries,
      attackTypes,
      timeline
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get rule logs
app.get('/api/admin/firewall/logs', async (c) => {
  try {
    const { env } = c
    const limit = parseInt(c.req.query('limit') || '50')
    
    const logs = await env.DB.prepare(`
      SELECT 
        se.id,
        se.ip_address,
        se.country_code,
        se.request_path,
        se.attack_type,
        se.is_blocked,
        se.created_at,
        fr.rule_name
      FROM security_events se
      LEFT JOIN firewall_rules fr ON se.rule_id = fr.id
      ORDER BY se.created_at DESC
      LIMIT ?
    `).bind(limit).all()
    
    return c.json({ success: true, logs: logs.results || [] })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Apply security preset
app.post('/api/admin/firewall/presets/:name/apply', async (c) => {
  try {
    const { env } = c
    const presetName = c.req.param('name')
    
    const preset = await env.DB.prepare('SELECT * FROM security_presets WHERE preset_name = ?')
      .bind(presetName).first()
    
    if (!preset) {
      return c.json({ success: false, error: 'Preset nicht gefunden' }, 404)
    }
    
    const config = JSON.parse((preset as any).config)
    
    // Apply preset settings
    for (const setting of config.settings || []) {
      await env.DB.prepare(`
        INSERT OR REPLACE INTO firewall_settings (category, setting_key, setting_value)
        VALUES (?, ?, ?)
      `).bind('preset', setting.key, setting.value).run()
    }
    
    // Audit
    await env.DB.prepare(`
      INSERT INTO firewall_audit (action_type, new_value, changed_by)
      VALUES ('preset_applied', ?, 'admin')
    `).bind(presetName).run()
    
    return c.json({ success: true, preset: presetName })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Emergency lockdown toggle
app.post('/api/admin/firewall/emergency-lockdown', async (c) => {
  try {
    const { env } = c
    const { enabled } = await c.req.json()
    
    if (enabled) {
      // Enable lockdown
      await env.DB.prepare(`
        INSERT OR REPLACE INTO firewall_settings (category, setting_key, setting_value)
        VALUES 
          ('emergency', 'lockdown_enabled', '1'),
          ('emergency', 'lockdown_started', datetime('now')),
          ('emergency', 'rate_limit_strict', '10')
      `).run()
      
      // Block all except admin IP
      const adminIP = c.req.header('CF-Connecting-IP') || '127.0.0.1'
      
      await env.DB.prepare(`
        INSERT INTO firewall_rules (rule_name, rule_type, target_type, target_value, action, priority)
        VALUES ('EMERGENCY LOCKDOWN', 'allow', 'ip_address', ?, 'allow', 0)
      `).bind(adminIP).run()
      
      await env.DB.prepare(`
        INSERT INTO firewall_rules (rule_name, rule_type, target_type, target_value, action, priority)
        VALUES ('EMERGENCY LOCKDOWN - BLOCK ALL', 'block', 'all', '*', 'block', 1)
      `).run()
    } else {
      // Disable lockdown
      await env.DB.prepare(`DELETE FROM firewall_settings WHERE category = 'emergency'`).run()
      await env.DB.prepare(`DELETE FROM firewall_rules WHERE rule_name LIKE '%EMERGENCY LOCKDOWN%'`).run()
    }
    
    // Audit
    await env.DB.prepare(`
      INSERT INTO firewall_audit (action_type, new_value, changed_by)
      VALUES ('emergency_lockdown', ?, 'admin')
    `).bind(enabled ? 'enabled' : 'disabled').run()
    
    return c.json({ success: true, lockdown: enabled })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get AI security suggestions
app.get('/api/admin/firewall/ai-suggestions', async (c) => {
  try {
    const { env } = c
    
    const suggestions = []
    
    // Detect brute force attempts
    const bruteForce = await env.DB.prepare(`
      SELECT ip_address, COUNT(*) as attempts
      FROM security_events
      WHERE created_at >= datetime('now', '-1 hour')
        AND attack_type LIKE '%brute%force%'
      GROUP BY ip_address
      HAVING attempts > 5
    `).all()
    
    for (const ip of (bruteForce.results || [])) {
      suggestions.push({
        type: 'brute_force',
        severity: 'high',
        title: 'Brute-Force-Angriff erkannt',
        description: `IP ${(ip as any).ip_address} hat ${(ip as any).attempts} fehlgeschlagene Login-Versuche`,
        suggestedAction: {
          type: 'block_ip',
          value: (ip as any).ip_address,
          duration: '24h'
        }
      })
    }
    
    // Detect traffic spikes
    const recentTraffic = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM security_events 
      WHERE created_at >= datetime('now', '-5 minutes')
    `).first() as any
    
    const normalTraffic = await env.DB.prepare(`
      SELECT AVG(count) as avg FROM (
        SELECT COUNT(*) as count 
        FROM security_events 
        WHERE created_at >= datetime('now', '-1 hour')
        GROUP BY strftime('%Y-%m-%d %H:%M', created_at)
      )
    `).first() as any
    
    if (recentTraffic?.count > (normalTraffic?.avg || 0) * 3) {
      suggestions.push({
        type: 'traffic_spike',
        severity: 'medium',
        title: 'Ungewöhnlicher Traffic-Anstieg',
        description: `Traffic ist ${Math.round(recentTraffic.count / (normalTraffic?.avg || 1))}x höher als normal`,
        suggestedAction: {
          type: 'enable_rate_limit',
          value: '100',
          duration: '1h'
        }
      })
    }
    
    // Detect scanning behavior
    const scanning = await env.DB.prepare(`
      SELECT ip_address, COUNT(DISTINCT request_path) as paths
      FROM security_events
      WHERE created_at >= datetime('now', '-10 minutes')
      GROUP BY ip_address
      HAVING paths > 20
    `).all()
    
    for (const ip of (scanning.results || [])) {
      suggestions.push({
        type: 'scanning',
        severity: 'medium',
        title: 'Port-Scanning erkannt',
        description: `IP ${(ip as any).ip_address} hat ${(ip as any).paths} verschiedene Pfade gescannt`,
        suggestedAction: {
          type: 'block_ip',
          value: (ip as any).ip_address,
          duration: '12h'
        }
      })
    }
    
    return c.json({ success: true, suggestions })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

}
