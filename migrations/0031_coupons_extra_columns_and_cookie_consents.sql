-- ============================================
-- ADD MISSING COLUMNS TO COUPONS TABLE
-- Only columns not present in 0030_coupons_system.sql
-- ============================================

ALTER TABLE coupons ADD COLUMN first_order_only INTEGER DEFAULT 0;
ALTER TABLE coupons ADD COLUMN is_stackable INTEGER DEFAULT 0;

-- ============================================
-- COOKIE CONSENTS TABLE (GDPR tracking)
-- ============================================

CREATE TABLE IF NOT EXISTS cookie_consents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL UNIQUE,
  ip_address TEXT,
  user_agent TEXT,
  essential INTEGER DEFAULT 1,
  functional INTEGER DEFAULT 0,
  analytics INTEGER DEFAULT 0,
  marketing INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cookie_consents_session_id ON cookie_consents(session_id);
