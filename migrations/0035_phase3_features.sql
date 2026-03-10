-- Phase 3 Features Migration
-- FAQ Management, Invoices, Import/Export

-- FAQ Categories Table
CREATE TABLE IF NOT EXISTS faq_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- FAQ Items Table
CREATE TABLE IF NOT EXISTS faq_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  views INTEGER DEFAULT 0,
  helpful_yes INTEGER DEFAULT 0,
  helpful_no INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES faq_categories(id) ON DELETE CASCADE
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number TEXT NOT NULL UNIQUE,
  order_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  invoice_date DATE NOT NULL,
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'sent', 'paid', 'overdue', 'cancelled'
  subtotal REAL NOT NULL,
  tax_amount REAL DEFAULT 0,
  discount_amount REAL DEFAULT 0,
  shipping_amount REAL DEFAULT 0,
  total REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  notes TEXT,
  payment_method TEXT,
  payment_date DATETIME,
  pdf_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Invoice Items Table
CREATE TABLE IF NOT EXISTS invoice_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER NOT NULL,
  product_id INTEGER,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  tax_rate REAL DEFAULT 0,
  total REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Import/Export Jobs Table
CREATE TABLE IF NOT EXISTS import_export_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- 'import', 'export'
  entity TEXT NOT NULL, -- 'products', 'orders', 'customers', 'all'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  file_name TEXT,
  file_url TEXT,
  total_records INTEGER DEFAULT 0,
  processed_records INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  error_count INTEGER DEFAULT 0,
  errors TEXT, -- JSON array of errors
  started_at DATETIME,
  completed_at DATETIME,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category_id);
CREATE INDEX IF NOT EXISTS idx_faq_items_published ON faq_items(is_published);
CREATE INDEX IF NOT EXISTS idx_invoices_order ON invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_user ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_date ON invoices(invoice_date);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice ON invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_import_export_status ON import_export_jobs(status);
CREATE INDEX IF NOT EXISTS idx_import_export_type ON import_export_jobs(type);

-- Insert sample FAQ categories
INSERT OR IGNORE INTO faq_categories (id, name, slug, description, icon, sort_order, is_active) VALUES
(1, 'Allgemein', 'general', 'Allgemeine Fragen zu unserem Service', 'fas fa-question-circle', 1, 1),
(2, 'Bestellung', 'orders', 'Fragen zu Bestellungen und Bezahlung', 'fas fa-shopping-cart', 2, 1),
(3, 'Lieferung', 'shipping', 'Fragen zu Versand und Lieferung', 'fas fa-truck', 3, 1),
(4, 'Rückgabe', 'returns', 'Fragen zu Rückgabe und Umtausch', 'fas fa-undo', 4, 1),
(5, 'Technischer Support', 'technical', 'Technische Fragen und Probleme', 'fas fa-tools', 5, 1);

-- Insert sample FAQ items
INSERT OR IGNORE INTO faq_items (category_id, question, answer, sort_order, is_published, views, helpful_yes, helpful_no) VALUES
(1, 'Wie kann ich ein Konto erstellen?', 'Sie können ein Konto erstellen, indem Sie auf "Registrieren" klicken und das Formular ausfüllen.', 1, 1, 245, 198, 12),
(1, 'Welche Zahlungsmethoden akzeptieren Sie?', 'Wir akzeptieren Kreditkarten, PayPal, Sofortüberweisung und Rechnung.', 2, 1, 312, 287, 8),
(2, 'Wie kann ich meine Bestellung verfolgen?', 'Sie erhalten eine E-Mail mit Tracking-Informationen, sobald Ihre Bestellung versandt wurde.', 1, 1, 456, 423, 15),
(2, 'Kann ich meine Bestellung stornieren?', 'Ja, Sie können Ihre Bestellung innerhalb von 2 Stunden nach Bestellung stornieren.', 2, 1, 189, 145, 23),
(3, 'Wie lange dauert die Lieferung?', 'Die Standardlieferung dauert 2-4 Werktage innerhalb Deutschlands.', 1, 1, 567, 534, 18),
(3, 'Liefern Sie international?', 'Ja, wir liefern in über 30 Länder weltweit.', 2, 1, 234, 198, 12),
(4, 'Wie kann ich einen Artikel zurücksenden?', 'Sie haben 14 Tage Rückgaberecht. Nutzen Sie unser Online-Rückgabeformular.', 1, 1, 298, 267, 14),
(4, 'Wer trägt die Rücksendekosten?', 'Bei Widerruf tragen Sie die Kosten. Bei Mängeln übernehmen wir die Kosten.', 2, 1, 176, 145, 21),
(5, 'Ich habe mein Passwort vergessen', 'Klicken Sie auf "Passwort vergessen" und folgen Sie den Anweisungen in der E-Mail.', 1, 1, 423, 401, 9),
(5, 'Wie kann ich den Kundensupport kontaktieren?', 'Sie erreichen uns per E-Mail, Telefon oder Live-Chat auf unserer Website.', 2, 1, 334, 312, 11);

-- Insert sample invoices (based on existing orders)
INSERT OR IGNORE INTO invoices (id, invoice_number, order_id, user_id, invoice_date, due_date, status, subtotal, tax_amount, discount_amount, shipping_amount, total, payment_method, payment_date) VALUES
(1, 'INV-2024-0001', 1, 1, date('now', '-5 days'), date('now', '+25 days'), 'paid', 149.99, 28.50, 0, 5.99, 184.48, 'credit_card', datetime('now', '-4 days')),
(2, 'INV-2024-0002', 2, 2, date('now', '-3 days'), date('now', '+27 days'), 'sent', 79.99, 15.20, 10.00, 3.99, 89.18, NULL, NULL),
(3, 'INV-2024-0003', 3, 3, date('now', '-1 day'), date('now', '+29 days'), 'paid', 299.99, 57.00, 30.00, 0, 326.99, 'paypal', datetime('now', '-1 day')),
(4, 'INV-2024-0004', 4, 1, date('now'), date('now', '+30 days'), 'draft', 199.99, 38.00, 0, 5.99, 243.98, NULL, NULL);

-- Insert sample invoice items
INSERT OR IGNORE INTO invoice_items (invoice_id, product_id, description, quantity, unit_price, tax_rate, total) VALUES
(1, 1, 'Microsoft Office 2021 Home & Business', 1, 149.99, 19.0, 149.99),
(2, 2, 'Windows 11 Pro', 1, 79.99, 19.0, 79.99),
(3, 3, 'Adobe Creative Cloud', 1, 299.99, 19.0, 299.99),
(4, 1, 'Microsoft Office 2021 Home & Business', 1, 199.99, 19.0, 199.99);

-- Insert sample import/export jobs
INSERT OR IGNORE INTO import_export_jobs (id, type, entity, status, file_name, total_records, processed_records, success_count, error_count, started_at, completed_at, created_by) VALUES
(1, 'export', 'products', 'completed', 'products_export_2024-03-10.csv', 150, 150, 150, 0, datetime('now', '-2 hours'), datetime('now', '-1 hour 55 minutes'), 1),
(2, 'import', 'products', 'completed', 'products_import_2024-03-09.csv', 50, 50, 48, 2, datetime('now', '-1 day'), datetime('now', '-1 day', '+5 minutes'), 1),
(3, 'export', 'orders', 'completed', 'orders_export_2024-03-10.csv', 245, 245, 245, 0, datetime('now', '-3 hours'), datetime('now', '-2 hours 58 minutes'), 1),
(4, 'import', 'customers', 'processing', 'customers_import_2024-03-10.csv', 120, 67, 67, 0, datetime('now', '-10 minutes'), NULL, 1);
