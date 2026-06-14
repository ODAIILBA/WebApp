-- Certificates table for license certificates
CREATE TABLE IF NOT EXISTS certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  certificate_number TEXT NOT NULL UNIQUE,
  order_id INTEGER,
  product_id INTEGER,
  user_id INTEGER,
  brand TEXT DEFAULT 'Microsoft',
  customer_name TEXT,
  customer_email TEXT,
  product_name TEXT,
  license_key TEXT,
  status TEXT NOT NULL DEFAULT 'generated',
  issued_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  emailed_at DATETIME,
  pdf_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Certificate settings table
CREATE TABLE IF NOT EXISTS certificate_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  auto_generate_on_paid INTEGER DEFAULT 1,
  auto_generate_on_completed INTEGER DEFAULT 0,
  auto_generate_on_processing INTEGER DEFAULT 0,
  enabled_brands TEXT DEFAULT '["Microsoft","Adobe","Kaspersky"]',
  auto_email_customer INTEGER DEFAULT 1,
  email_subject TEXT DEFAULT 'Ihre Lizenzbescheinigung für {product_name}',
  email_body TEXT DEFAULT 'Sehr geehrte(r) {customer_name},\n\nim Anhang finden Sie Ihre Lizenzbescheinigung.\n\nMit freundlichen Grüßen\nIhr SoftwareKing24 Team',
  certificate_numbering_format TEXT DEFAULT 'CERT-{year}-{number}',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings row
INSERT OR IGNORE INTO certificate_settings (id) VALUES (1);
