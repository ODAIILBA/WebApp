-- Migration: Product Management System
-- Description: Tables for product variants, attributes, reviews, and inventory
-- Date: 2026-01-29
-- Batch: 9 - Products Management

-- ============================================
-- PRODUCT ATTRIBUTES
-- ============================================
-- Global product attributes (e.g., Color, Size, RAM, Storage)
CREATE TABLE IF NOT EXISTS product_attributes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'select', -- select, color, text, number
  attribute_values TEXT, -- JSON array of possible values
  is_variant_attribute INTEGER DEFAULT 0, -- Can create variants
  is_required INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PRODUCT ATTRIBUTE VALUES
-- ============================================
-- Specific attribute values for products
CREATE TABLE IF NOT EXISTS product_attribute_values (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  attribute_id INTEGER NOT NULL,
  value TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (attribute_id) REFERENCES product_attributes(id) ON DELETE CASCADE,
  UNIQUE(product_id, attribute_id)
);

-- ============================================
-- PRODUCT VARIANTS
-- ============================================
-- Product variants (e.g., Windows 11 Pro 1-Device, 3-Device, 5-Device)
CREATE TABLE IF NOT EXISTS product_variants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  variant_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  stock_quantity INTEGER DEFAULT 0,
  is_default INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ============================================
-- VARIANT ATTRIBUTE VALUES
-- ============================================
-- Attributes specific to variants
CREATE TABLE IF NOT EXISTS variant_attribute_values (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  variant_id INTEGER NOT NULL,
  attribute_id INTEGER NOT NULL,
  value TEXT NOT NULL,
  FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
  FOREIGN KEY (attribute_id) REFERENCES product_attributes(id) ON DELETE CASCADE,
  UNIQUE(variant_id, attribute_id)
);

-- ============================================
-- PRODUCT REVIEWS
-- ============================================
CREATE TABLE IF NOT EXISTS product_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  user_id INTEGER,
  order_id INTEGER,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  verified_purchase INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  admin_reply TEXT,
  replied_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- ============================================
-- INVENTORY TRANSACTIONS
-- ============================================
-- Track all inventory changes
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  variant_id INTEGER,
  transaction_type TEXT NOT NULL, -- in, out, adjustment, return
  quantity INTEGER NOT NULL,
  quantity_before INTEGER NOT NULL,
  quantity_after INTEGER NOT NULL,
  reference_type TEXT, -- order, purchase, adjustment
  reference_id INTEGER,
  notes TEXT,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================
-- PRICE RULES
-- ============================================
-- Dynamic pricing rules and bulk discounts
CREATE TABLE IF NOT EXISTS price_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  rule_type TEXT NOT NULL, -- percentage, fixed, bulk, tiered
  discount_value DECIMAL(10, 2) NOT NULL,
  min_quantity INTEGER DEFAULT 1,
  max_quantity INTEGER,
  start_date DATETIME,
  end_date DATETIME,
  priority INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PRICE RULE PRODUCTS
-- ============================================
-- Link price rules to products
CREATE TABLE IF NOT EXISTS price_rule_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  price_rule_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (price_rule_id) REFERENCES price_rules(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE(price_rule_id, product_id)
);

-- ============================================
-- BULK IMPORT LOGS
-- ============================================
-- Track product import/export operations
CREATE TABLE IF NOT EXISTS bulk_import_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  operation_type TEXT NOT NULL, -- import, export
  file_name TEXT,
  total_rows INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  error_count INTEGER DEFAULT 0,
  errors TEXT, -- JSON array of errors
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  created_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Product Attributes
CREATE INDEX IF NOT EXISTS idx_product_attributes_type ON product_attributes(type);
CREATE INDEX IF NOT EXISTS idx_product_attributes_active ON product_attributes(is_active);

-- Product Attribute Values
CREATE INDEX IF NOT EXISTS idx_product_attribute_values_product ON product_attribute_values(product_id);
CREATE INDEX IF NOT EXISTS idx_product_attribute_values_attribute ON product_attribute_values(attribute_id);

-- Product Variants
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_product_variants_active ON product_variants(is_active);

-- Variant Attribute Values
CREATE INDEX IF NOT EXISTS idx_variant_attribute_values_variant ON variant_attribute_values(variant_id);
CREATE INDEX IF NOT EXISTS idx_variant_attribute_values_attribute ON variant_attribute_values(attribute_id);

-- Product Reviews
CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_status ON product_reviews(status);
CREATE INDEX IF NOT EXISTS idx_product_reviews_rating ON product_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_product_reviews_verified ON product_reviews(verified_purchase);

-- Inventory Transactions
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_product ON inventory_transactions(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_variant ON inventory_transactions(variant_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_type ON inventory_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_date ON inventory_transactions(created_at);

-- Price Rules
CREATE INDEX IF NOT EXISTS idx_price_rules_active ON price_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_price_rules_dates ON price_rules(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_price_rules_type ON price_rules(rule_type);

-- Price Rule Products
CREATE INDEX IF NOT EXISTS idx_price_rule_products_rule ON price_rule_products(price_rule_id);
CREATE INDEX IF NOT EXISTS idx_price_rule_products_product ON price_rule_products(product_id);

-- Bulk Import Logs
CREATE INDEX IF NOT EXISTS idx_bulk_import_logs_status ON bulk_import_logs(status);
CREATE INDEX IF NOT EXISTS idx_bulk_import_logs_date ON bulk_import_logs(started_at);
CREATE INDEX IF NOT EXISTS idx_bulk_import_logs_user ON bulk_import_logs(created_by);
