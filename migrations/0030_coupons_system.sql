-- Migration: Coupons System
-- Creates tables for discount coupons and usage tracking

-- Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL CHECK(discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),
  discount_value DECIMAL(10,2) NOT NULL,
  minimum_order_amount DECIMAL(10,2) DEFAULT 0.00,
  maximum_discount_amount DECIMAL(10,2),
  usage_limit INTEGER, -- NULL = unlimited
  usage_per_customer INTEGER DEFAULT 1,
  times_used INTEGER DEFAULT 0,
  valid_from DATETIME DEFAULT CURRENT_TIMESTAMP,
  valid_until DATETIME,
  is_active INTEGER DEFAULT 1,
  applicable_products TEXT, -- JSON array of product IDs (NULL = all products)
  applicable_categories TEXT, -- JSON array of category IDs (NULL = all categories)
  excluded_products TEXT, -- JSON array of product IDs to exclude
  excluded_categories TEXT, -- JSON array of category IDs to exclude
  minimum_items INTEGER DEFAULT 1,
  customer_restrictions TEXT, -- JSON array of customer IDs (NULL = all customers)
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES admin_users(id)
);

-- Coupon Usage Tracking Table
CREATE TABLE IF NOT EXISTS coupon_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  coupon_id INTEGER NOT NULL,
  order_id INTEGER,
  user_id INTEGER,
  customer_email TEXT,
  discount_amount DECIMAL(10,2) NOT NULL,
  order_amount DECIMAL(10,2) NOT NULL,
  used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  FOREIGN KEY (coupon_id) REFERENCES coupons(id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupons_valid_dates ON coupons(valid_from, valid_until);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon_id ON coupon_usage(coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_order_id ON coupon_usage(order_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_user_id ON coupon_usage(user_id);

-- Insert sample coupons for testing
INSERT OR IGNORE INTO coupons (code, description, discount_type, discount_value, minimum_order_amount, usage_limit, valid_until, is_active) VALUES
('WELCOME10', '10% off for new customers', 'percentage', 10.00, 0.00, NULL, '2026-12-31 23:59:59', 1),
('SAVE20', '20% off orders over €50', 'percentage', 20.00, 50.00, 1000, '2026-06-30 23:59:59', 1),
('FREESHIP', 'Free shipping on all orders', 'free_shipping', 0.00, 0.00, NULL, '2026-12-31 23:59:59', 1),
('SUPER50', '€50 off orders over €200', 'fixed_amount', 50.00, 200.00, 100, '2026-03-31 23:59:59', 1),
('SPRING25', '25% off spring collection', 'percentage', 25.00, 0.00, 500, '2026-05-31 23:59:59', 1),
('VIP30', '30% VIP exclusive discount', 'percentage', 30.00, 100.00, 50, '2026-12-31 23:59:59', 1),
('EXPIRED', 'Expired test coupon', 'percentage', 15.00, 0.00, NULL, '2025-01-01 23:59:59', 0);

-- Insert sample usage records
INSERT OR IGNORE INTO coupon_usage (coupon_id, order_id, customer_email, discount_amount, order_amount, used_at) VALUES
(1, 1, 'customer1@example.com', 5.00, 50.00, '2026-01-15 10:30:00'),
(2, 2, 'customer2@example.com', 12.00, 60.00, '2026-01-16 14:20:00'),
(4, 3, 'customer3@example.com', 50.00, 250.00, '2026-01-17 16:45:00'),
(1, 4, 'customer4@example.com', 8.00, 80.00, '2026-01-18 11:15:00'),
(5, 5, 'customer5@example.com', 25.00, 100.00, '2026-01-19 09:30:00');
