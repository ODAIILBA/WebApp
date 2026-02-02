-- Firewall & Security Tables

-- Firewall Rules
CREATE TABLE IF NOT EXISTS firewall_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  rule_type TEXT NOT NULL, -- 'ip_block', 'country_block', 'rate_limit', 'pattern_match'
  pattern TEXT, -- IP, country code, or regex pattern
  action TEXT NOT NULL DEFAULT 'block', -- 'block', 'challenge', 'allow'
  severity TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  is_active INTEGER DEFAULT 1,
  hit_count INTEGER DEFAULT 0,
  last_triggered DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Blocked IPs
CREATE TABLE IF NOT EXISTS blocked_ips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_address TEXT NOT NULL UNIQUE,
  reason TEXT,
  block_type TEXT DEFAULT 'manual', -- 'manual', 'automatic', 'brute_force', 'malicious'
  blocked_until DATETIME, -- NULL = permanent
  is_active INTEGER DEFAULT 1,
  hit_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Security Events Log
CREATE TABLE IF NOT EXISTS security_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL, -- 'attack_blocked', 'login_failed', 'malware_detected', 'suspicious_activity'
  severity TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
  ip_address TEXT,
  user_agent TEXT,
  request_path TEXT,
  request_method TEXT,
  attack_type TEXT, -- 'sql_injection', 'xss', 'brute_force', 'file_upload', 'directory_traversal'
  details TEXT,
  is_blocked INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Brute Force Protection
CREATE TABLE IF NOT EXISTS login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_address TEXT NOT NULL,
  username TEXT,
  is_success INTEGER DEFAULT 0,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Firewall Settings
CREATE TABLE IF NOT EXISTS firewall_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  category TEXT DEFAULT 'general',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default firewall settings
INSERT OR IGNORE INTO firewall_settings (setting_key, setting_value, category) VALUES
  ('firewall_enabled', '1', 'general'),
  ('learning_mode', '0', 'general'),
  ('brute_force_protection', '1', 'protection'),
  ('max_login_attempts', '5', 'protection'),
  ('lockout_duration', '3600', 'protection'),
  ('rate_limit_requests', '100', 'protection'),
  ('rate_limit_window', '60', 'protection'),
  ('block_sql_injection', '1', 'protection'),
  ('block_xss', '1', 'protection'),
  ('block_file_upload', '1', 'protection'),
  ('block_directory_traversal', '1', 'protection'),
  ('auto_update_rules', '1', 'general'),
  ('email_alerts', '1', 'alerts'),
  ('alert_threshold', 'high', 'alerts');

-- Threat Intelligence Database
CREATE TABLE IF NOT EXISTS threat_patterns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pattern_type TEXT NOT NULL, -- 'sql_injection', 'xss', 'exploit', 'malware'
  pattern TEXT NOT NULL,
  description TEXT,
  severity TEXT DEFAULT 'medium',
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert common threat patterns
INSERT OR IGNORE INTO threat_patterns (pattern_type, pattern, description, severity) VALUES
  ('sql_injection', '(union.*select|select.*from|insert.*into|drop.*table)', 'SQL Injection attempt', 'high'),
  ('sql_injection', '(or\s+1\s*=\s*1|and\s+1\s*=\s*1)', 'SQL Injection boolean bypass', 'high'),
  ('xss', '(<script|javascript:|onerror=|onload=)', 'Cross-site scripting attempt', 'high'),
  ('xss', '(eval\(|expression\(|<iframe)', 'XSS code execution', 'high'),
  ('file_upload', '(\.php|\.exe|\.sh|\.bat)$', 'Malicious file upload', 'critical'),
  ('directory_traversal', '(\.\./|\.\.\\|%2e%2e)', 'Directory traversal attempt', 'high'),
  ('exploit', '(etc/passwd|proc/self|/bin/sh)', 'System file access attempt', 'critical'),
  ('exploit', '(cmd\.exe|powershell)', 'Command execution attempt', 'critical');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blocked_ips_ip ON blocked_ips(ip_address);
CREATE INDEX IF NOT EXISTS idx_blocked_ips_active ON blocked_ips(is_active);
CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_ip ON security_events(ip_address);
CREATE INDEX IF NOT EXISTS idx_security_events_created ON security_events(created_at);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS idx_login_attempts_created ON login_attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_firewall_rules_active ON firewall_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_threat_patterns_type ON threat_patterns(pattern_type);
