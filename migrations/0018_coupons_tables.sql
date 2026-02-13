-- SOFTWAREKING24 - Coupons and Promotions Tables
-- Migration: 0018_coupons_tables.sql

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    discount_type TEXT CHECK(discount_type IN ('percentage', 'fixed')) DEFAULT 'percentage',
    discount_value REAL NOT NULL,
    minimum_order_value REAL DEFAULT 0,
    maximum_discount REAL,
    usage_limit INTEGER,
    usage_per_customer INTEGER DEFAULT 1,
    is_active INTEGER DEFAULT 1,
    starts_at DATETIME,
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Coupon usage tracking
CREATE TABLE IF NOT EXISTS coupon_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coupon_id INTEGER NOT NULL,
    user_id INTEGER,
    order_id INTEGER NOT NULL,
    discount_amount REAL NOT NULL,
    used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon_id ON coupon_usage(coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_user_id ON coupon_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_order_id ON coupon_usage(order_id);

-- Sample data
INSERT OR IGNORE INTO coupons (code, description, discount_type, discount_value, min_purchase_amount, usage_limit, is_active, valid_until) VALUES
('WELCOME10', '10% Rabatt für Neukunden', 'percentage', 10.00, 50.00, 100, 1, datetime('now', '+30 days')),
('SAVE20', '20 EUR Rabatt ab 100 EUR', 'fixed', 20.00, 100.00, 50, 1, datetime('now', '+14 days')),
('WINTER2026', '15% Winter Sale', 'percentage', 15.00, 0, NULL, 1, datetime('now', '+60 days'));
