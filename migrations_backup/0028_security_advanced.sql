-- ============================================================================
-- MIGRATION 0028: ADVANCED SECURITY FEATURES
-- ============================================================================
-- Created: 2026-01-29
-- Description: Comprehensive security tables for firewall, IP blocking, 
--              2FA, login protection, API security, and system scans
-- ============================================================================

-- ============================================================================
-- 1. FIREWALL RULES
-- ============================================================================
CREATE TABLE IF NOT EXISTS firewall_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rule_name TEXT NOT NULL,
  rule_type TEXT NOT NULL CHECK(rule_type IN ('allow', 'deny', 'rate_limit')),
  priority INTEGER NOT NULL DEFAULT 100,
  
  -- Target specification
  ip_range TEXT, -- e.g., "192.168.1.0/24" or "10.0.0.1"
  country_code TEXT, -- ISO 3166-1 alpha-2 country code
  user_agent_pattern TEXT,
  path_pattern TEXT, -- e.g., "/api/*", "/admin/*"
  
  -- Rate limiting (when rule_type = 'rate_limit')
  rate_limit_requests INTEGER, -- requests per time window
  rate_limit_window INTEGER, -- time window in seconds
  
  -- Action details
  action TEXT NOT NULL CHECK(action IN ('allow', 'block', 'challenge', 'throttle')),
  response_code INTEGER DEFAULT 403,
  
  -- Status and metadata
  is_active INTEGER NOT NULL DEFAULT 1,
  description TEXT,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE INDEX idx_firewall_rules_active ON firewall_rules(is_active, priority);
CREATE INDEX idx_firewall_rules_type ON firewall_rules(rule_type);

-- ============================================================================
-- 2. BLOCKED IPS
-- ============================================================================
CREATE TABLE IF NOT EXISTS blocked_ips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_address TEXT NOT NULL UNIQUE,
  block_type TEXT NOT NULL CHECK(block_type IN ('manual', 'automatic', 'temporary', 'permanent')),
  
  -- Block reason
  reason TEXT NOT NULL,
  severity TEXT DEFAULT 'medium' CHECK(severity IN ('low', 'medium', 'high', 'critical')),
  
  -- Auto-block trigger info
  failed_login_count INTEGER DEFAULT 0,
  suspicious_activity_count INTEGER DEFAULT 0,
  
  -- Duration (NULL = permanent)
  blocked_until DATETIME,
  
  -- Metadata
  blocked_by INTEGER, -- User ID who blocked this IP
  notes TEXT,
  country_code TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (blocked_by) REFERENCES users(id)
);

CREATE INDEX idx_blocked_ips_active ON blocked_ips(is_active, ip_address);
CREATE INDEX idx_blocked_ips_expiry ON blocked_ips(blocked_until);

-- ============================================================================
-- 3. LOGIN PROTECTION SETTINGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS login_protection_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Brute force protection
  max_failed_attempts INTEGER NOT NULL DEFAULT 5,
  lockout_duration INTEGER NOT NULL DEFAULT 900, -- seconds (15 min)
  reset_window INTEGER NOT NULL DEFAULT 300, -- seconds (5 min)
  
  -- IP-based protection
  ip_tracking_enabled INTEGER NOT NULL DEFAULT 1,
  auto_block_after_attempts INTEGER DEFAULT 10,
  auto_block_duration INTEGER DEFAULT 3600, -- seconds (1 hour)
  
  -- CAPTCHA settings
  captcha_enabled INTEGER NOT NULL DEFAULT 0,
  captcha_after_attempts INTEGER DEFAULT 3,
  
  -- Geographic restrictions
  geo_blocking_enabled INTEGER NOT NULL DEFAULT 0,
  allowed_countries TEXT, -- JSON array of country codes
  blocked_countries TEXT, -- JSON array of country codes
  
  -- Session security
  session_timeout INTEGER NOT NULL DEFAULT 3600, -- seconds
  max_sessions_per_user INTEGER DEFAULT 5,
  require_password_change_days INTEGER DEFAULT 90,
  
  -- Notification settings
  notify_on_failed_login INTEGER NOT NULL DEFAULT 0,
  notify_on_new_location INTEGER NOT NULL DEFAULT 1,
  notify_on_suspicious_activity INTEGER NOT NULL DEFAULT 1,
  
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT OR IGNORE INTO login_protection_settings (id) VALUES (1);

-- ============================================================================
-- 4. TWO-FACTOR AUTHENTICATION (2FA)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_2fa (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  
  -- 2FA method
  method TEXT NOT NULL CHECK(method IN ('totp', 'sms', 'email', 'backup_codes')),
  is_enabled INTEGER NOT NULL DEFAULT 0,
  
  -- TOTP settings
  totp_secret TEXT, -- Base32 encoded secret
  totp_verified INTEGER DEFAULT 0,
  
  -- Backup codes (hashed)
  backup_codes TEXT, -- JSON array of hashed backup codes
  backup_codes_used TEXT, -- JSON array tracking used codes
  
  -- Recovery
  recovery_email TEXT,
  recovery_phone TEXT,
  
  -- Metadata
  enabled_at DATETIME,
  last_verified_at DATETIME,
  verification_failures INTEGER DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_2fa_user ON user_2fa(user_id);
CREATE INDEX idx_user_2fa_enabled ON user_2fa(is_enabled);

-- ============================================================================
-- 5. 2FA VERIFICATION LOG
-- ============================================================================
CREATE TABLE IF NOT EXISTS twofa_verification_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  
  verification_method TEXT NOT NULL,
  verification_status TEXT NOT NULL CHECK(verification_status IN ('success', 'failed', 'expired')),
  
  ip_address TEXT,
  user_agent TEXT,
  location TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_twofa_log_user ON twofa_verification_log(user_id);
CREATE INDEX idx_twofa_log_created ON twofa_verification_log(created_at);

-- ============================================================================
-- 6. FILE & SYSTEM PROTECTION
-- ============================================================================
CREATE TABLE IF NOT EXISTS file_scans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- File info
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_hash TEXT, -- SHA-256 hash
  mime_type TEXT,
  
  -- Scan results
  scan_status TEXT NOT NULL CHECK(scan_status IN ('pending', 'scanning', 'clean', 'infected', 'suspicious', 'error')),
  scan_engine TEXT, -- e.g., 'clamav', 'virustotal', 'custom'
  
  -- Threat details
  threats_found INTEGER DEFAULT 0,
  threat_names TEXT, -- JSON array
  threat_severity TEXT CHECK(threat_severity IN ('low', 'medium', 'high', 'critical')),
  
  -- Action taken
  action_taken TEXT CHECK(action_taken IN ('none', 'quarantine', 'delete', 'clean')),
  
  -- Upload context
  uploaded_by INTEGER,
  upload_ip TEXT,
  
  scan_started_at DATETIME,
  scan_completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE INDEX idx_file_scans_status ON file_scans(scan_status);
CREATE INDEX idx_file_scans_hash ON file_scans(file_hash);

-- ============================================================================
-- 7. SYSTEM PROTECTION SETTINGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS system_protection_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- File upload protection
  scan_uploads_enabled INTEGER NOT NULL DEFAULT 1,
  max_file_size INTEGER NOT NULL DEFAULT 10485760, -- 10 MB in bytes
  allowed_file_types TEXT, -- JSON array
  quarantine_infected_files INTEGER NOT NULL DEFAULT 1,
  
  -- XSS & Injection protection
  xss_protection_enabled INTEGER NOT NULL DEFAULT 1,
  sql_injection_protection_enabled INTEGER NOT NULL DEFAULT 1,
  
  -- CSRF protection
  csrf_protection_enabled INTEGER NOT NULL DEFAULT 1,
  csrf_token_timeout INTEGER DEFAULT 3600,
  
  -- Content Security Policy
  csp_enabled INTEGER NOT NULL DEFAULT 1,
  csp_policy TEXT,
  
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT OR IGNORE INTO system_protection_settings (id) VALUES (1);

-- ============================================================================
-- 8. API KEYS & TOKENS
-- ============================================================================
CREATE TABLE IF NOT EXISTS api_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Key identification
  key_name TEXT NOT NULL,
  key_token TEXT NOT NULL UNIQUE, -- Hashed API key
  key_prefix TEXT NOT NULL, -- First 8 chars for display (e.g., "sk_live_...")
  
  -- Owner
  user_id INTEGER,
  
  -- Permissions
  permissions TEXT NOT NULL, -- JSON array of permissions
  rate_limit INTEGER DEFAULT 1000, -- requests per hour
  
  -- Restrictions
  allowed_ips TEXT, -- JSON array of allowed IPs
  allowed_domains TEXT, -- JSON array of allowed domains
  
  -- Status
  is_active INTEGER NOT NULL DEFAULT 1,
  expires_at DATETIME,
  
  -- Usage tracking
  last_used_at DATETIME,
  request_count INTEGER DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_api_keys_token ON api_keys(key_token);
CREATE INDEX idx_api_keys_user ON api_keys(user_id);
CREATE INDEX idx_api_keys_active ON api_keys(is_active);

-- ============================================================================
-- 9. WEBHOOKS
-- ============================================================================
CREATE TABLE IF NOT EXISTS webhooks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Webhook identification
  webhook_name TEXT NOT NULL,
  webhook_url TEXT NOT NULL,
  
  -- Events to listen to
  events TEXT NOT NULL, -- JSON array of event types
  
  -- Security
  secret_token TEXT, -- For signature verification
  
  -- Configuration
  is_active INTEGER NOT NULL DEFAULT 1,
  retry_failed INTEGER NOT NULL DEFAULT 1,
  max_retries INTEGER DEFAULT 3,
  timeout_seconds INTEGER DEFAULT 30,
  
  -- Status tracking
  last_triggered_at DATETIME,
  last_success_at DATETIME,
  last_failure_at DATETIME,
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0,
  
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE INDEX idx_webhooks_active ON webhooks(is_active);
CREATE INDEX idx_webhooks_user ON webhooks(created_by);

-- ============================================================================
-- 10. WEBHOOK DELIVERY LOG
-- ============================================================================
CREATE TABLE IF NOT EXISTS webhook_deliveries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  webhook_id INTEGER NOT NULL,
  
  -- Request details
  event_type TEXT NOT NULL,
  payload TEXT NOT NULL, -- JSON payload
  
  -- Response details
  status_code INTEGER,
  response_body TEXT,
  response_time_ms INTEGER,
  
  -- Result
  delivery_status TEXT NOT NULL CHECK(delivery_status IN ('success', 'failed', 'pending', 'retry')),
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (webhook_id) REFERENCES webhooks(id) ON DELETE CASCADE
);

CREATE INDEX idx_webhook_deliveries_webhook ON webhook_deliveries(webhook_id);
CREATE INDEX idx_webhook_deliveries_status ON webhook_deliveries(delivery_status);
CREATE INDEX idx_webhook_deliveries_created ON webhook_deliveries(created_at);

-- ============================================================================
-- 11. EMAIL SECURITY SETTINGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS email_security_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- SPF (Sender Policy Framework)
  spf_enabled INTEGER NOT NULL DEFAULT 1,
  spf_record TEXT,
  spf_status TEXT CHECK(spf_status IN ('valid', 'invalid', 'not_configured')),
  
  -- DKIM (DomainKeys Identified Mail)
  dkim_enabled INTEGER NOT NULL DEFAULT 1,
  dkim_selector TEXT,
  dkim_public_key TEXT,
  dkim_status TEXT CHECK(dkim_status IN ('valid', 'invalid', 'not_configured')),
  
  -- DMARC (Domain-based Message Authentication)
  dmarc_enabled INTEGER NOT NULL DEFAULT 1,
  dmarc_policy TEXT CHECK(dmarc_policy IN ('none', 'quarantine', 'reject')),
  dmarc_record TEXT,
  dmarc_status TEXT CHECK(dmarc_status IN ('valid', 'invalid', 'not_configured')),
  
  -- Anti-spam settings
  spam_filter_enabled INTEGER NOT NULL DEFAULT 1,
  spam_score_threshold REAL DEFAULT 5.0,
  
  -- Content filtering
  scan_attachments INTEGER NOT NULL DEFAULT 1,
  block_executable_attachments INTEGER NOT NULL DEFAULT 1,
  
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT OR IGNORE INTO email_security_settings (id) VALUES (1);

-- ============================================================================
-- 12. SECURITY SCANS
-- ============================================================================
CREATE TABLE IF NOT EXISTS security_scans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Scan configuration
  scan_name TEXT NOT NULL,
  scan_type TEXT NOT NULL CHECK(scan_type IN ('vulnerability', 'malware', 'compliance', 'penetration', 'configuration')),
  
  -- Scan targets
  target_type TEXT CHECK(target_type IN ('system', 'files', 'database', 'api', 'network', 'all')),
  target_details TEXT, -- JSON with specific targets
  
  -- Scan status
  scan_status TEXT NOT NULL CHECK(scan_status IN ('scheduled', 'running', 'completed', 'failed', 'cancelled')),
  progress_percentage INTEGER DEFAULT 0,
  
  -- Results
  vulnerabilities_found INTEGER DEFAULT 0,
  critical_issues INTEGER DEFAULT 0,
  high_issues INTEGER DEFAULT 0,
  medium_issues INTEGER DEFAULT 0,
  low_issues INTEGER DEFAULT 0,
  
  -- Detailed results
  scan_results TEXT, -- JSON with detailed findings
  
  -- Timing
  scheduled_at DATETIME,
  started_at DATETIME,
  completed_at DATETIME,
  duration_seconds INTEGER,
  
  -- Automation
  is_automated INTEGER DEFAULT 0,
  schedule_cron TEXT, -- Cron expression for recurring scans
  next_run_at DATETIME,
  
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE INDEX idx_security_scans_status ON security_scans(scan_status);
CREATE INDEX idx_security_scans_type ON security_scans(scan_type);
CREATE INDEX idx_security_scans_scheduled ON security_scans(next_run_at);

-- ============================================================================
-- 13. SECURITY SCAN FINDINGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS security_scan_findings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scan_id INTEGER NOT NULL,
  
  -- Finding details
  finding_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK(severity IN ('info', 'low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  description TEXT,
  
  -- Location
  affected_component TEXT,
  file_path TEXT,
  line_number INTEGER,
  
  -- Remediation
  recommendation TEXT,
  cve_id TEXT, -- Common Vulnerabilities and Exposures ID
  cvss_score REAL, -- Common Vulnerability Scoring System score
  
  -- Status
  status TEXT DEFAULT 'open' CHECK(status IN ('open', 'in_progress', 'resolved', 'false_positive', 'accepted_risk')),
  resolved_at DATETIME,
  resolved_by INTEGER,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (scan_id) REFERENCES security_scans(id) ON DELETE CASCADE,
  FOREIGN KEY (resolved_by) REFERENCES users(id)
);

CREATE INDEX idx_scan_findings_scan ON security_scan_findings(scan_id);
CREATE INDEX idx_scan_findings_severity ON security_scan_findings(severity);
CREATE INDEX idx_scan_findings_status ON security_scan_findings(status);

-- ============================================================================
-- 14. USER ROLES & PERMISSIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT NOT NULL UNIQUE,
  role_display_name TEXT NOT NULL,
  description TEXT,
  
  -- Permission flags
  is_system_role INTEGER DEFAULT 0, -- Cannot be deleted
  permissions TEXT NOT NULL, -- JSON array of permission strings
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT OR IGNORE INTO roles (id, role_name, role_display_name, description, is_system_role, permissions) VALUES
(1, 'super_admin', 'Super Administrator', 'Full system access', 1, '["*"]'),
(2, 'admin', 'Administrator', 'Administrative access', 1, '["users.*", "products.*", "orders.*", "content.*", "security.view"]'),
(3, 'manager', 'Manager', 'Management access', 1, '["products.view", "products.edit", "orders.*", "users.view"]'),
(4, 'support', 'Support Staff', 'Customer support access', 1, '["orders.view", "users.view", "tickets.*"]'),
(5, 'customer', 'Customer', 'Standard customer access', 1, '["profile.*", "orders.view"]');

CREATE TABLE IF NOT EXISTS user_role_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  
  assigned_by INTEGER,
  assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_by) REFERENCES users(id),
  
  UNIQUE(user_id, role_id)
);

CREATE INDEX idx_user_roles_user ON user_role_assignments(user_id);
CREATE INDEX idx_user_roles_role ON user_role_assignments(role_id);

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
