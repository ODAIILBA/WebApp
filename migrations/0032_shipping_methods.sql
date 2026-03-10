-- Shipping Methods Migration
-- Manages shipping/delivery options

-- Shipping Methods Table
CREATE TABLE IF NOT EXISTS shipping_methods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  carrier TEXT, -- 'DHL', 'DPD', 'UPS', 'self', etc.
  delivery_time TEXT, -- '1-2 Werktage', '3-5 Werktage'
  base_price REAL NOT NULL DEFAULT 0,
  free_shipping_threshold REAL, -- Free shipping above this order amount
  weight_based INTEGER DEFAULT 0, -- 0 = flat rate, 1 = weight-based pricing
  price_per_kg REAL DEFAULT 0,
  min_weight REAL DEFAULT 0,
  max_weight REAL DEFAULT 999999,
  available_countries TEXT, -- JSON array of country codes, e.g., '["DE","AT","CH"]'
  zones TEXT, -- JSON config for zone-based pricing
  is_active INTEGER DEFAULT 1,
  is_default INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  icon TEXT, -- FontAwesome icon class
  tracking_enabled INTEGER DEFAULT 1,
  insurance_available INTEGER DEFAULT 0,
  insurance_cost REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Shipping Zones Table (for more complex pricing)
CREATE TABLE IF NOT EXISTS shipping_zones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  countries TEXT NOT NULL, -- JSON array of country codes
  shipping_method_id INTEGER,
  base_price REAL NOT NULL,
  free_shipping_threshold REAL,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shipping_method_id) REFERENCES shipping_methods(id) ON DELETE CASCADE
);

-- Shipping Rules Table (conditions for special pricing)
CREATE TABLE IF NOT EXISTS shipping_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shipping_method_id INTEGER NOT NULL,
  rule_type TEXT NOT NULL, -- 'weight', 'price', 'quantity', 'product_category'
  condition TEXT NOT NULL, -- 'greater_than', 'less_than', 'between', 'equals'
  value_min REAL,
  value_max REAL,
  adjustment_type TEXT NOT NULL, -- 'fixed', 'percentage'
  adjustment_value REAL NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shipping_method_id) REFERENCES shipping_methods(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_shipping_methods_code ON shipping_methods(code);
CREATE INDEX IF NOT EXISTS idx_shipping_methods_active ON shipping_methods(is_active);
CREATE INDEX IF NOT EXISTS idx_shipping_zones_method ON shipping_zones(shipping_method_id);
CREATE INDEX IF NOT EXISTS idx_shipping_rules_method ON shipping_rules(shipping_method_id);

-- Insert default shipping methods
INSERT OR IGNORE INTO shipping_methods (
  id, name, code, description, carrier, delivery_time,
  base_price, free_shipping_threshold, weight_based, price_per_kg,
  available_countries, is_active, is_default, sort_order, icon, tracking_enabled
) VALUES
(1, 'DHL Express', 'dhl_express', 'Schnellste Lieferung am nächsten Werktag', 'DHL', '1 Werktag',
 12.99, 150.00, 0, 0, '["DE","AT","CH","NL","BE","LU"]', 1, 0, 1, 'fas fa-shipping-fast', 1),

(2, 'DHL Standard', 'dhl_standard', 'Standardversand innerhalb von 2-3 Werktagen', 'DHL', '2-3 Werktage',
 5.99, 50.00, 0, 0, '["DE","AT","CH","NL","BE","LU","FR","IT","ES"]', 1, 1, 2, 'fas fa-box', 1),

(3, 'DPD Economy', 'dpd_economy', 'Günstige Lieferoption 3-5 Werktage', 'DPD', '3-5 Werktage',
 3.99, 30.00, 0, 0, '["DE","AT","CH"]', 1, 0, 3, 'fas fa-truck', 1),

(4, 'Gewichtsbasiert', 'weight_based', 'Preis abhängig vom Paketgewicht', 'DHL', '2-4 Werktage',
 4.99, NULL, 1, 1.50, '["DE"]', 1, 0, 4, 'fas fa-weight', 1),

(5, 'Abholung im Geschäft', 'store_pickup', 'Kostenlose Abholung in unserem Geschäft', 'self', 'Sofort',
 0.00, NULL, 0, 0, '["DE"]', 1, 0, 5, 'fas fa-store', 0),

(6, 'Internationaler Versand', 'international', 'Weltweiter Versand (außerhalb EU)', 'DHL', '5-10 Werktage',
 19.99, 200.00, 1, 2.50, '["US","GB","CA","AU","JP","CN"]', 1, 0, 6, 'fas fa-globe', 1);

-- Insert sample zones for international shipping
INSERT OR IGNORE INTO shipping_zones (id, name, countries, shipping_method_id, base_price, free_shipping_threshold) VALUES
(1, 'EU Zone 1', '["DE","AT","CH","NL","BE","LU"]', 2, 5.99, 50.00),
(2, 'EU Zone 2', '["FR","IT","ES","PT","PL","CZ"]', 2, 8.99, 75.00),
(3, 'EU Zone 3', '["SE","DK","FI","NO","GR","IE"]', 2, 12.99, 100.00),
(4, 'Worldwide', '["US","GB","CA","AU","JP","CN","BR","IN","RU"]', 6, 19.99, 200.00);

-- Insert sample rules
INSERT OR IGNORE INTO shipping_rules (
  shipping_method_id, rule_type, condition, value_min, value_max,
  adjustment_type, adjustment_value, is_active
) VALUES
-- Heavy package surcharge for weight-based shipping
(4, 'weight', 'greater_than', 10.0, NULL, 'fixed', 5.00, 1),
-- Large order discount for standard shipping
(2, 'price', 'greater_than', 100.0, NULL, 'percentage', -10.0, 1),
-- Bulk order free shipping
(3, 'quantity', 'greater_than', 10.0, NULL, 'fixed', -3.99, 1);
