-- ============================================
-- License System Migration
-- Created: 2026-02-13
-- Supports: Retail and Volume licenses
-- Updates existing license_keys table
-- ============================================

-- The license_keys table already exists, we'll add missing columns if needed

-- Add missing columns to license_keys if they don't exist
-- SQLite doesn't support IF NOT EXISTS for ALTER TABLE ADD COLUMN, so we'll use CREATE TABLE IF NOT EXISTS for new tables only

-- Add assigned_to_user_id column if it doesn't exist
-- Note: SQLite will fail silently if column already exists, which is fine for our use case

-- Add order_item_id column for tracking which order item this license belongs to
-- ALTER TABLE license_keys ADD COLUMN order_item_id INTEGER REFERENCES order_items(id);

-- Add assigned_to_user_id for tracking user assignment
-- ALTER TABLE license_keys ADD COLUMN assigned_to_user_id INTEGER REFERENCES users(id);

-- Create indexes for existing license_keys table
CREATE INDEX IF NOT EXISTS idx_licenses_key ON license_keys(license_key);
CREATE INDEX IF NOT EXISTS idx_licenses_product ON license_keys(product_id);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON license_keys(status);
CREATE INDEX IF NOT EXISTS idx_licenses_type ON license_keys(key_type);
CREATE INDEX IF NOT EXISTS idx_licenses_order ON license_keys(order_id);

-- License Activations table (tracks individual activations for volume licenses)
CREATE TABLE IF NOT EXISTS license_activations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  license_id INTEGER NOT NULL,
  
  -- Activation details
  device_id TEXT,
  device_name TEXT,
  device_fingerprint TEXT,
  ip_address TEXT,
  user_agent TEXT,
  
  -- Status
  is_active INTEGER DEFAULT 1,
  activated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deactivated_at DATETIME,
  last_verified_at DATETIME,
  
  -- Metadata
  activation_count INTEGER DEFAULT 1, -- How many times this device activated
  notes TEXT,
  
  FOREIGN KEY (license_id) REFERENCES license_keys(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_activations_license ON license_activations(license_id);
CREATE INDEX IF NOT EXISTS idx_activations_device ON license_activations(device_id);
CREATE INDEX IF NOT EXISTS idx_activations_active ON license_activations(is_active);

-- License History / Audit Log
CREATE TABLE IF NOT EXISTS license_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  license_id INTEGER NOT NULL,
  
  -- Action: inserted, assigned, activated, deactivated, revoked, expired
  action TEXT NOT NULL,
  
  -- Who performed the action
  performed_by_user_id INTEGER,
  performed_by_admin_id INTEGER,
  
  -- Details
  old_status TEXT,
  new_status TEXT,
  details TEXT, -- JSON for additional data
  ip_address TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (license_id) REFERENCES license_keys(id) ON DELETE CASCADE,
  FOREIGN KEY (performed_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (performed_by_admin_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_license_history_license ON license_history(license_id);
CREATE INDEX IF NOT EXISTS idx_license_history_action ON license_history(action);
CREATE INDEX IF NOT EXISTS idx_license_history_created ON license_history(created_at DESC);
