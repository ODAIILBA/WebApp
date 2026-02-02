-- Migration: Add notifications system and advanced settings
-- ========================================================================

-- Notifications table for admin and user notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  type TEXT NOT NULL, -- 'order', 'refund', 'license', 'system', 'customer'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data TEXT, -- JSON data for additional context
  is_read INTEGER DEFAULT 0,
  priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  action_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  read_at DATETIME
);

-- Email queue for sending emails
CREATE TABLE IF NOT EXISTS email_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  to_email TEXT NOT NULL,
  to_name TEXT,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  body_text TEXT,
  template TEXT, -- Template name: 'order_confirmation', 'license_delivery', etc.
  template_data TEXT, -- JSON data for template variables
  status TEXT DEFAULT 'pending', -- 'pending', 'sending', 'sent', 'failed'
  priority INTEGER DEFAULT 5, -- 1-10, lower = higher priority
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  error_message TEXT,
  sent_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  scheduled_for DATETIME
);

-- System settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
  category TEXT DEFAULT 'general', -- 'general', 'email', 'payment', 'notifications', 'security'
  description TEXT,
  is_public INTEGER DEFAULT 0, -- Can be accessed by public API
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Activity log for audit trail
CREATE TABLE IF NOT EXISTS activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action TEXT NOT NULL, -- 'create', 'update', 'delete', 'login', 'export', etc.
  entity_type TEXT NOT NULL, -- 'product', 'order', 'user', 'license', etc.
  entity_id INTEGER,
  description TEXT,
  ip_address TEXT,
  user_agent TEXT,
  changes TEXT, -- JSON of what changed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type, created_at);
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status, priority);
CREATE INDEX IF NOT EXISTS idx_email_queue_scheduled ON email_queue(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_activity_log_user ON activity_log(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_log_entity ON activity_log(entity_type, entity_id);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, category, description, is_public) VALUES
-- General Settings
('site_name', 'SOFTWAREKING24', 'string', 'general', 'Website name', 1),
('site_tagline', 'Original Software-Lizenzen zu fairen Preisen', 'string', 'general', 'Website tagline', 1),
('site_email', 'info@softwareking24.de', 'string', 'general', 'Main contact email', 1),
('site_phone', '+49 (0) 123 456789', 'string', 'general', 'Contact phone number', 1),
('currency', 'EUR', 'string', 'general', 'Default currency', 1),
('currency_symbol', '€', 'string', 'general', 'Currency symbol', 1),
('tax_rate', '19', 'number', 'general', 'VAT/Tax rate percentage', 0),
('items_per_page', '12', 'number', 'general', 'Products per page', 1),

-- Email Settings
('smtp_host', '', 'string', 'email', 'SMTP server host', 0),
('smtp_port', '587', 'number', 'email', 'SMTP server port', 0),
('smtp_user', '', 'string', 'email', 'SMTP username', 0),
('smtp_from_email', 'noreply@softwareking24.de', 'string', 'email', 'From email address', 0),
('smtp_from_name', 'SOFTWAREKING24', 'string', 'email', 'From name', 0),
('email_notifications_enabled', '1', 'boolean', 'email', 'Enable email notifications', 0),

-- Order Settings
('order_prefix', 'SK24-', 'string', 'orders', 'Order number prefix', 0),
('auto_send_license', '1', 'boolean', 'orders', 'Automatically send license keys after payment', 0),
('allow_guest_checkout', '1', 'boolean', 'orders', 'Allow checkout without registration', 1),
('min_order_amount', '10', 'number', 'orders', 'Minimum order amount', 1),

-- Notification Settings
('notify_new_order', '1', 'boolean', 'notifications', 'Notify admin on new orders', 0),
('notify_low_stock', '1', 'boolean', 'notifications', 'Notify when license stock is low', 0),
('low_stock_threshold', '5', 'number', 'notifications', 'Low stock threshold', 0),
('notify_refund_request', '1', 'boolean', 'notifications', 'Notify on refund requests', 0),

-- Security Settings
('session_timeout', '3600', 'number', 'security', 'Session timeout in seconds', 0),
('max_login_attempts', '5', 'number', 'security', 'Maximum login attempts before lockout', 0),
('require_email_verification', '1', 'boolean', 'security', 'Require email verification for new accounts', 0),

-- Payment Settings
('paypal_enabled', '0', 'boolean', 'payment', 'Enable PayPal payments', 0),
('stripe_enabled', '0', 'boolean', 'payment', 'Enable Stripe payments', 0),
('bank_transfer_enabled', '1', 'boolean', 'payment', 'Enable bank transfer', 1),

-- Maintenance Settings
('maintenance_mode', '0', 'boolean', 'general', 'Enable maintenance mode', 0),
('maintenance_message', 'Wir führen Wartungsarbeiten durch. Bitte versuchen Sie es später erneut.', 'string', 'general', 'Maintenance mode message', 0)
ON CONFLICT(setting_key) DO NOTHING;

-- Sample notifications
INSERT INTO notifications (user_id, type, title, message, priority, action_url) VALUES
(NULL, 'system', 'Willkommen im Admin-Panel', 'Das Admin-Panel wurde erfolgreich eingerichtet. Alle Funktionen sind einsatzbereit.', 'normal', '/admin'),
(NULL, 'system', 'Neue Features verfügbar', 'Das Benachrichtigungssystem und erweiterte Einstellungen sind jetzt verfügbar.', 'high', '/admin/settings')
ON CONFLICT DO NOTHING;
