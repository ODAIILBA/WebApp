-- Additional tables and indexes for security and audit features
-- Run this migration after the initial schema

-- ============================================
-- AUDIT LOGGING
-- ============================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id INTEGER,
  changes TEXT, -- JSON
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- ============================================
-- PERFORMANCE INDEXES
-- ============================================

-- Orders
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);

-- License Keys
CREATE INDEX IF NOT EXISTS idx_license_status ON license_keys(status);
CREATE INDEX IF NOT EXISTS idx_license_product ON license_keys(product_id);
CREATE INDEX IF NOT EXISTS idx_license_order ON license_keys(assigned_to_order_id);
CREATE INDEX IF NOT EXISTS idx_license_expires ON license_keys(expires_at);

-- Sessions
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- Products
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_bestseller ON products(is_bestseller);

-- Product Translations
CREATE INDEX IF NOT EXISTS idx_product_trans_product ON product_translations(product_id);
CREATE INDEX IF NOT EXISTS idx_product_trans_language ON product_translations(language);

-- Categories
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Category Translations
CREATE INDEX IF NOT EXISTS idx_category_trans_category ON category_translations(category_id);
CREATE INDEX IF NOT EXISTS idx_category_trans_language ON category_translations(language);

-- ============================================
-- INVOICE TRACKING
-- ============================================

CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL UNIQUE,
  invoice_number TEXT UNIQUE NOT NULL,
  invoice_date DATETIME NOT NULL,
  seller_name TEXT NOT NULL,
  seller_vat_number TEXT NOT NULL,
  seller_address TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_vat_number TEXT,
  buyer_address TEXT NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  vat_amount DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  is_reverse_charge INTEGER DEFAULT 0,
  reverse_charge_note TEXT,
  pdf_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_invoices_order ON invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_number ON invoices(invoice_number);

-- ============================================
-- EMAIL QUEUE
-- ============================================

CREATE TABLE IF NOT EXISTS email_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  template TEXT,
  variables TEXT, -- JSON
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  attempts INTEGER DEFAULT 0,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  sent_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);
CREATE INDEX IF NOT EXISTS idx_email_queue_created ON email_queue(created_at);

-- ============================================
-- SECURITY EVENTS
-- ============================================

CREATE TABLE IF NOT EXISTS security_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL, -- 'failed_login', 'suspicious_activity', 'brute_force', etc.
  user_id INTEGER,
  email TEXT,
  ip_address TEXT NOT NULL,
  user_agent TEXT,
  details TEXT, -- JSON
  severity TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_ip ON security_events(ip_address);
CREATE INDEX IF NOT EXISTS idx_security_events_created ON security_events(created_at);

-- ============================================
-- SETTINGS / CONFIGURATION
-- ============================================

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
  description TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT OR IGNORE INTO settings (key, value, type, description) VALUES
  ('site_name', 'Premium Software Store', 'string', 'Website name'),
  ('seller_vat_number', 'DE123456789', 'string', 'Seller VAT number for invoices'),
  ('seller_country', 'DE', 'string', 'Seller country code'),
  ('seller_address', 'Musterstraße 123, 12345 Musterstadt, Germany', 'string', 'Seller address for invoices'),
  ('low_stock_threshold', '10', 'number', 'Alert when stock below this number'),
  ('session_timeout_hours', '24', 'number', 'Session expiration in hours'),
  ('max_login_attempts', '5', 'number', 'Max failed login attempts before lockout'),
  ('lockout_duration_minutes', '15', 'number', 'Account lockout duration'),
  ('enable_email_notifications', 'true', 'boolean', 'Send email notifications'),
  ('enable_audit_logging', 'true', 'boolean', 'Enable audit logging');

-- ============================================
-- ENABLE FOREIGN KEYS
-- ============================================

PRAGMA foreign_keys = ON;
