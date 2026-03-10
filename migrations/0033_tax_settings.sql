-- Tax Settings Migration
-- Manages tax rates and rules

-- Tax Rates Table
CREATE TABLE IF NOT EXISTS tax_rates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  rate REAL NOT NULL, -- Tax rate as percentage (e.g., 19.0 for 19%)
  country_code TEXT NOT NULL, -- ISO 3166-1 alpha-2 country code (e.g., 'DE', 'AT')
  state_code TEXT, -- State/province code (for US/CA)
  zip_code TEXT, -- Specific ZIP/postal code
  city TEXT, -- Specific city
  is_compound INTEGER DEFAULT 0, -- Compound tax (tax on tax)
  priority INTEGER DEFAULT 1, -- Order of application
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tax Classes Table (for different product types)
CREATE TABLE IF NOT EXISTS tax_classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_default INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tax Rate to Class Mapping
CREATE TABLE IF NOT EXISTS tax_rate_classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tax_rate_id INTEGER NOT NULL,
  tax_class_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tax_rate_id) REFERENCES tax_rates(id) ON DELETE CASCADE,
  FOREIGN KEY (tax_class_id) REFERENCES tax_classes(id) ON DELETE CASCADE,
  UNIQUE(tax_rate_id, tax_class_id)
);

-- Tax Settings Table (global settings)
CREATE TABLE IF NOT EXISTS tax_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tax_rates_country ON tax_rates(country_code);
CREATE INDEX IF NOT EXISTS idx_tax_rates_active ON tax_rates(is_active);
CREATE INDEX IF NOT EXISTS idx_tax_rate_classes_rate ON tax_rate_classes(tax_rate_id);
CREATE INDEX IF NOT EXISTS idx_tax_rate_classes_class ON tax_rate_classes(tax_class_id);

-- Insert default tax classes
INSERT OR IGNORE INTO tax_classes (id, name, description, is_default) VALUES
(1, 'Standard', 'Regulärer Mehrwertsteuersatz', 1),
(2, 'Ermäßigt', 'Ermäßigter Mehrwertsteuersatz (z.B. Lebensmittel, Bücher)', 0),
(3, 'Null', 'Steuerfreie Produkte', 0),
(4, 'Digital', 'Digitale Produkte und Dienstleistungen', 0);

-- Insert default tax rates (Germany)
INSERT OR IGNORE INTO tax_rates (id, name, code, rate, country_code, priority, is_active) VALUES
(1, 'Deutsche MwSt. (Standard)', 'DE_STANDARD', 19.0, 'DE', 1, 1),
(2, 'Deutsche MwSt. (Ermäßigt)', 'DE_REDUCED', 7.0, 'DE', 1, 1),
(3, 'Österreich MwSt. (Standard)', 'AT_STANDARD', 20.0, 'AT', 1, 1),
(4, 'Österreich MwSt. (Ermäßigt)', 'AT_REDUCED', 10.0, 'AT', 1, 1),
(5, 'Schweiz MwSt. (Standard)', 'CH_STANDARD', 7.7, 'CH', 1, 1),
(6, 'Schweiz MwSt. (Ermäßigt)', 'CH_REDUCED', 2.5, 'CH', 1, 1),
(7, 'EU Digital Services', 'EU_DIGITAL', 19.0, 'DE', 2, 1),
(8, 'Reverse Charge (B2B EU)', 'EU_REVERSE_CHARGE', 0.0, 'DE', 3, 1);

-- Map tax rates to classes
INSERT OR IGNORE INTO tax_rate_classes (tax_rate_id, tax_class_id) VALUES
(1, 1), -- DE Standard -> Standard class
(2, 2), -- DE Reduced -> Reduced class
(3, 1), -- AT Standard -> Standard class
(4, 2), -- AT Reduced -> Reduced class
(5, 1), -- CH Standard -> Standard class
(6, 2), -- CH Reduced -> Reduced class
(7, 4), -- EU Digital -> Digital class
(8, 1); -- Reverse Charge -> Standard class

-- Insert default tax settings
INSERT OR IGNORE INTO tax_settings (key, value) VALUES
('prices_include_tax', 'true'),
('tax_based_on', 'shipping'), -- 'shipping', 'billing', or 'shop'
('shipping_tax_class', '1'),
('display_prices_in_shop', 'including'), -- 'including' or 'excluding'
('display_prices_during_checkout', 'including'),
('display_tax_subtotal', 'true'),
('round_tax_at_subtotal', 'false');
