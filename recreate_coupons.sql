-- Complete Coupon System Tables

CREATE TABLE IF NOT EXISTS coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Discount type and value
  discount_type TEXT NOT NULL,
  discount_value REAL NOT NULL,
  
  -- Validity
  starts_at DATETIME,
  expires_at DATETIME,
  
  -- Usage limits
  max_uses INTEGER,
  max_uses_per_customer INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  
  -- Minimum requirements
  minimum_order_value REAL,
  
  -- Product/Category restrictions (JSON arrays)
  applicable_products TEXT,
  excluded_products TEXT,
  applicable_categories TEXT,
  excluded_categories TEXT,
  
  -- Customer restrictions
  applicable_customers TEXT,
  first_order_only INTEGER DEFAULT 0,
  
  -- Stackability
  is_stackable INTEGER DEFAULT 0,
  
  -- Status
  is_active INTEGER DEFAULT 1,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER
);

CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupons_expires ON coupons(expires_at);

CREATE TABLE IF NOT EXISTS coupon_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  coupon_id INTEGER NOT NULL,
  order_id INTEGER,
  customer_id INTEGER,
  customer_email TEXT,
  discount_amount REAL NOT NULL,
  used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (coupon_id) REFERENCES coupons(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon ON coupon_usage(coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_customer ON coupon_usage(customer_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_email ON coupon_usage(customer_email);
