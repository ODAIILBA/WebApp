-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number TEXT UNIQUE NOT NULL,
  order_id INTEGER,
  user_id INTEGER,
  
  -- Customer details (denormalized for historical accuracy)
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_company TEXT,
  customer_tax_id TEXT,
  
  -- Billing address
  billing_address TEXT NOT NULL,
  billing_city TEXT NOT NULL,
  billing_postal_code TEXT NOT NULL,
  billing_country TEXT NOT NULL DEFAULT 'Deutschland',
  
  -- Invoice details
  invoice_date DATE NOT NULL DEFAULT (DATE('now')),
  due_date DATE,
  payment_date DATE,
  
  -- Amounts (in cents to avoid floating point issues)
  subtotal INTEGER NOT NULL DEFAULT 0,
  tax_rate REAL NOT NULL DEFAULT 19.0,
  tax_amount INTEGER NOT NULL DEFAULT 0,
  total_amount INTEGER NOT NULL DEFAULT 0,
  discount_amount INTEGER DEFAULT 0,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'draft', -- draft, sent, paid, overdue, cancelled
  payment_method TEXT,
  payment_reference TEXT,
  
  -- Notes and terms
  notes TEXT,
  terms TEXT DEFAULT 'Zahlbar innerhalb von 14 Tagen ohne Abzug.',
  footer_text TEXT DEFAULT 'Vielen Dank für Ihr Vertrauen!',
  
  -- Metadata
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  sent_at DATETIME,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create invoice_items table
CREATE TABLE IF NOT EXISTS invoice_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER NOT NULL,
  
  -- Item details
  product_id INTEGER,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL DEFAULT 0, -- in cents
  tax_rate REAL NOT NULL DEFAULT 19.0,
  
  -- Calculated amounts (in cents)
  line_total INTEGER NOT NULL DEFAULT 0,
  
  -- Product reference (denormalized for historical accuracy)
  product_name TEXT,
  product_sku TEXT,
  license_key TEXT,
  
  -- Metadata
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Create invoice_payments table (for tracking partial payments)
CREATE TABLE IF NOT EXISTS invoice_payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER NOT NULL,
  
  payment_date DATE NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  payment_method TEXT NOT NULL,
  payment_reference TEXT,
  notes TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_date ON invoices(invoice_date);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoice_items_product_id ON invoice_items(product_id);

CREATE INDEX IF NOT EXISTS idx_invoice_payments_invoice_id ON invoice_payments(invoice_id);

-- Trigger to update updated_at timestamp
CREATE TRIGGER IF NOT EXISTS update_invoices_timestamp 
AFTER UPDATE ON invoices
BEGIN
  UPDATE invoices SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Insert sample invoice for testing
INSERT OR IGNORE INTO invoices (
  id, invoice_number, customer_name, customer_email, customer_company,
  billing_address, billing_city, billing_postal_code, billing_country,
  invoice_date, due_date, subtotal, tax_rate, tax_amount, total_amount, status
) VALUES (
  1, 
  'RE-2026-0001', 
  'Max Mustermann', 
  'max@example.com',
  'Musterfirma GmbH',
  'Musterstraße 123',
  'Berlin',
  '10115',
  'Deutschland',
  DATE('now'),
  DATE('now', '+14 days'),
  8400, -- 84 EUR
  19.0,
  1596, -- 15.96 EUR
  9996, -- 99.96 EUR
  'sent'
);

-- Insert sample invoice items
INSERT OR IGNORE INTO invoice_items (
  invoice_id, description, quantity, unit_price, tax_rate, line_total,
  product_name, product_sku
) VALUES 
  (1, 'Microsoft Office 2021 Professional Plus', 1, 8400, 19.0, 8400, 'Office 2021 Pro Plus', 'OFF-2021-PRO'),
  (1, 'Installation & Aktivierung Support', 1, 0, 19.0, 0, 'Support', 'SUPPORT-01');
