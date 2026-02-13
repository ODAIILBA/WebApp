-- ============================================
-- ADVANCED FIREWALL SYSTEM
-- Enterprise-grade security with AI detection
-- ============================================

-- Firewall rules table
CREATE TABLE IF NOT EXISTS firewall_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  priority INTEGER DEFAULT 100,
  is_active INTEGER DEFAULT 1,
  rule_type TEXT NOT NULL CHECK(rule_type IN ('block', 'allow', 'rate_limit', 'challenge')),
  
  -- Rule conditions (JSON array)
  conditions TEXT NOT NULL, -- [{field: 'ip', operator: 'equals', value: '1.1.1.1', logic: 'AND'}]
  
  -- Action configuration
  action_config TEXT, -- JSON: {rate_limit: 100, duration: 60, block_duration: 300}
  
  -- Statistics
  hits_count INTEGER DEFAULT 0,
  last_hit DATETIME,
  
  -- Metadata
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES admin_users(id)
);

-- Blocked IPs table
CREATE TABLE IF NOT EXISTS blocked_ips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_address TEXT NOT NULL,
  block_type TEXT DEFAULT 'manual' CHECK(block_type IN ('manual', 'auto', 'rate_limit', 'brute_force')),
  reason TEXT,
  blocked_until DATETIME,
  is_permanent INTEGER DEFAULT 0,
  rule_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rule_id) REFERENCES firewall_rules(id)
);

-- Security events log
CREATE TABLE IF NOT EXISTS security_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL CHECK(event_type IN ('block', 'allow', 'rate_limit', 'challenge', 'suspicious')),
  ip_address TEXT NOT NULL,
  country TEXT,
  user_agent TEXT,
  request_path TEXT,
  request_method TEXT,
  rule_id INTEGER,
  is_blocked INTEGER DEFAULT 0,
  threat_score INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rule_id) REFERENCES firewall_rules(id)
);

-- Threat patterns (AI detection)
CREATE TABLE IF NOT EXISTS threat_patterns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pattern_type TEXT NOT NULL CHECK(pattern_type IN ('brute_force', 'sql_injection', 'xss', 'ddos', '404_scan', 'unusual_traffic')),
  pattern_data TEXT NOT NULL, -- JSON
  severity TEXT DEFAULT 'medium' CHECK(severity IN ('low', 'medium', 'high', 'critical')),
  is_active INTEGER DEFAULT 1,
  auto_action TEXT CHECK(auto_action IN ('block', 'challenge', 'notify', 'none')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Rate limit tracking
CREATE TABLE IF NOT EXISTS rate_limits (
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 0,
  window_start DATETIME DEFAULT CURRENT_TIMESTAMP,
  window_end DATETIME,
  is_blocked INTEGER DEFAULT 0,
  PRIMARY KEY (ip_address, endpoint, window_start)
) WITHOUT ROWID;

-- Firewall settings
CREATE TABLE IF NOT EXISTS firewall_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Security presets
CREATE TABLE IF NOT EXISTS security_presets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  preset_type TEXT NOT NULL CHECK(preset_type IN ('strict', 'balanced', 'open', 'api_protection', 'ecommerce')),
  description TEXT,
  config_json TEXT NOT NULL,
  is_system INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Firewall audit log
CREATE TABLE IF NOT EXISTS firewall_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER,
  action_type TEXT NOT NULL,
  rule_id INTEGER,
  old_value TEXT,
  new_value TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admin_users(id),
  FOREIGN KEY (rule_id) REFERENCES firewall_rules(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_firewall_rules_active ON firewall_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_firewall_rules_priority ON firewall_rules(priority);
CREATE INDEX IF NOT EXISTS idx_blocked_ips_address ON blocked_ips(ip_address);
CREATE INDEX IF NOT EXISTS idx_blocked_ips_until ON blocked_ips(blocked_until);
CREATE INDEX IF NOT EXISTS idx_security_events_ip ON security_events(ip_address);
CREATE INDEX IF NOT EXISTS idx_security_events_created ON security_events(created_at);
CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_threat_patterns_active ON threat_patterns(is_active);
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip ON rate_limits(ip_address);

-- Insert default settings
INSERT INTO firewall_settings (setting_key, setting_value) VALUES
  ('lockdown_mode', 'false'),
  ('admin_whitelist', '[]'),
  ('default_action', 'allow'),
  ('log_retention_days', '30'),
  ('auto_block_enabled', 'true'),
  ('rate_limit_global', '1000'),
  ('rate_limit_window', '60')
ON CONFLICT(setting_key) DO NOTHING;

-- Insert system presets
INSERT INTO security_presets (name, preset_type, description, config_json, is_system) VALUES
  (
    'Strict Mode',
    'strict',
    'Maximum security - blocks suspicious traffic aggressively',
    json_object(
      'default_action', 'block',
      'rate_limit', 50,
      'auto_block_brute_force', true,
      'challenge_suspicious', true,
      'block_tor', true,
      'block_proxies', true
    ),
    1
  ),
  (
    'Balanced Mode',
    'balanced',
    'Balanced security and usability',
    json_object(
      'default_action', 'allow',
      'rate_limit', 200,
      'auto_block_brute_force', true,
      'challenge_suspicious', true,
      'block_tor', false,
      'block_proxies', false
    ),
    1
  ),
  (
    'Open Mode',
    'open',
    'Minimal restrictions - only blocks obvious attacks',
    json_object(
      'default_action', 'allow',
      'rate_limit', 1000,
      'auto_block_brute_force', false,
      'challenge_suspicious', false,
      'block_tor', false,
      'block_proxies', false
    ),
    1
  ),
  (
    'API Protection',
    'api_protection',
    'Optimized for API security with strict rate limiting',
    json_object(
      'default_action', 'allow',
      'rate_limit', 100,
      'auto_block_brute_force', true,
      'challenge_suspicious', false,
      'require_api_key', true,
      'block_tor', true
    ),
    1
  ),
  (
    'E-Commerce Mode',
    'ecommerce',
    'Protects checkout and payment flows',
    json_object(
      'default_action', 'allow',
      'rate_limit', 500,
      'auto_block_brute_force', true,
      'challenge_suspicious', true,
      'protect_checkout', true,
      'protect_api', true
    ),
    1
  )
ON CONFLICT DO NOTHING;

-- Insert sample threat patterns
INSERT INTO threat_patterns (pattern_type, pattern_data, severity, auto_action, is_active) VALUES
  (
    'brute_force',
    json_object(
      'max_failed_logins', 5,
      'time_window', 300,
      'action', 'block',
      'block_duration', 3600
    ),
    'high',
    'block',
    1
  ),
  (
    'sql_injection',
    json_object(
      'patterns', json_array('UNION SELECT', 'DROP TABLE', 'OR 1=1', '--'),
      'action', 'block'
    ),
    'critical',
    'block',
    1
  ),
  (
    'xss',
    json_object(
      'patterns', json_array('<script', 'javascript:', 'onerror='),
      'action', 'block'
    ),
    'high',
    'block',
    1
  ),
  (
    'ddos',
    json_object(
      'requests_per_minute', 1000,
      'action', 'challenge'
    ),
    'critical',
    'challenge',
    1
  ),
  (
    '404_scan',
    json_object(
      'max_404s', 20,
      'time_window', 60,
      'action', 'block',
      'block_duration', 1800
    ),
    'medium',
    'block',
    1
  )
ON CONFLICT DO NOTHING;

-- Insert sample firewall rules
INSERT INTO firewall_rules (name, description, priority, rule_type, conditions, action_config) VALUES
  (
    'Block Known Bad IPs',
    'Blocks IPs from known malicious sources',
    1,
    'block',
    json_array(
      json_object('field', 'ip', 'operator', 'in', 'value', json_array('1.2.3.4', '5.6.7.8'), 'logic', 'OR')
    ),
    json_object('reason', 'Known malicious IP')
  ),
  (
    'Rate Limit API Endpoints',
    'Limits API requests to 100 per minute',
    10,
    'rate_limit',
    json_array(
      json_object('field', 'path', 'operator', 'starts_with', 'value', '/api', 'logic', 'AND')
    ),
    json_object('rate_limit', 100, 'window', 60, 'block_duration', 300)
  ),
  (
    'Block Admin Access from Foreign IPs',
    'Only allow admin access from whitelisted countries',
    5,
    'block',
    json_array(
      json_object('field', 'path', 'operator', 'starts_with', 'value', '/admin', 'logic', 'AND'),
      json_object('field', 'country', 'operator', 'not_in', 'value', json_array('US', 'DE', 'GB'), 'logic', 'AND')
    ),
    json_object('reason', 'Admin access restricted by location')
  )
ON CONFLICT DO NOTHING;
