-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  certificate_number TEXT UNIQUE NOT NULL,
  order_id INTEGER,
  invoice_id INTEGER,
  
  -- Product & Brand Info
  brand TEXT NOT NULL, -- Microsoft, Adobe, Kaspersky, etc.
  product_id INTEGER,
  product_name TEXT NOT NULL,
  product_sku TEXT,
  license_key TEXT,
  
  -- Customer Info (denormalized)
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_company TEXT,
  customer_address TEXT,
  customer_city TEXT,
  customer_postal_code TEXT,
  customer_phone TEXT,
  
  -- Partner Info
  partner_id TEXT,
  mpn_id TEXT,
  
  -- Status & Tracking
  status TEXT NOT NULL DEFAULT 'generated', -- generated, sent, downloaded, revoked
  generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  sent_at DATETIME,
  downloaded_at DATETIME,
  
  -- File storage
  file_url TEXT,
  
  -- Metadata
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE SET NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Create certificate_settings table
CREATE TABLE IF NOT EXISTS certificate_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Auto-generation triggers
  auto_generate_on_paid INTEGER DEFAULT 1, -- 0 = off, 1 = on
  auto_generate_on_completed INTEGER DEFAULT 0,
  auto_generate_on_processing INTEGER DEFAULT 0,
  manual_only INTEGER DEFAULT 0,
  
  -- Enabled brands (stored as JSON array)
  enabled_brands TEXT DEFAULT '["Microsoft","Adobe","Kaspersky"]',
  
  -- Email automation
  auto_email_customer INTEGER DEFAULT 1,
  attach_to_order_email INTEGER DEFAULT 1,
  include_download_link INTEGER DEFAULT 1,
  
  -- Email template
  email_subject TEXT DEFAULT 'Ihre Lizenz-Zertifikate von SoftwareKing24',
  email_body TEXT DEFAULT 'Sehr geehrte(r) {customer_name},\n\nanbei erhalten Sie Ihre Lizenz-Zertifikate.\n\nMit freundlichen Grüßen\nIhr SoftwareKing24 Team',
  
  -- Certificate numbering
  certificate_numbering_format TEXT DEFAULT 'CERT-{YYYY}-{####}',
  use_order_number INTEGER DEFAULT 0,
  use_invoice_number INTEGER DEFAULT 0,
  next_certificate_number INTEGER DEFAULT 1,
  
  -- Partner IDs by brand (JSON)
  partner_ids TEXT DEFAULT '{"Microsoft":"7027901","Adobe":"ADOBE-ID","Kaspersky":"KASPERSKY-ID"}',
  
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_certificates_order_id ON certificates(order_id);
CREATE INDEX IF NOT EXISTS idx_certificates_invoice_id ON certificates(invoice_id);
CREATE INDEX IF NOT EXISTS idx_certificates_brand ON certificates(brand);
CREATE INDEX IF NOT EXISTS idx_certificates_status ON certificates(status);
CREATE INDEX IF NOT EXISTS idx_certificates_customer_email ON certificates(customer_email);
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_number ON certificates(certificate_number);

-- Trigger to update updated_at
CREATE TRIGGER IF NOT EXISTS update_certificates_timestamp 
AFTER UPDATE ON certificates
BEGIN
  UPDATE certificates SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_certificate_settings_timestamp 
AFTER UPDATE ON certificate_settings
BEGIN
  UPDATE certificate_settings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Insert default settings
INSERT OR IGNORE INTO certificate_settings (id) VALUES (1);
