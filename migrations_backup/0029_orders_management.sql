-- Migration 0029: Orders Management Tables
-- Created: 2026-01-29
-- Purpose: Add refunds, invoices, and shipping_status tables for Orders Management module

-- Refunds table
CREATE TABLE IF NOT EXISTS refunds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  refund_number TEXT UNIQUE NOT NULL,
  order_id INTEGER NOT NULL,
  order_item_id INTEGER,
  refund_type TEXT NOT NULL CHECK(refund_type IN ('full', 'partial', 'item')),
  refund_reason TEXT NOT NULL CHECK(refund_reason IN ('customer_request', 'defective_product', 'wrong_item', 'not_as_described', 'duplicate_order', 'fraud', 'other')),
  refund_status TEXT NOT NULL DEFAULT 'pending' CHECK(refund_status IN ('pending', 'approved', 'processing', 'completed', 'rejected', 'failed')),
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  payment_method TEXT,
  payment_transaction_id TEXT,
  refund_transaction_id TEXT,
  customer_note TEXT,
  admin_note TEXT,
  requested_by INTEGER,
  processed_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  processed_at DATETIME,
  completed_at DATETIME,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE,
  FOREIGN KEY (requested_by) REFERENCES users(id),
  FOREIGN KEY (processed_by) REFERENCES users(id)
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number TEXT UNIQUE NOT NULL,
  order_id INTEGER NOT NULL,
  invoice_type TEXT NOT NULL DEFAULT 'standard' CHECK(invoice_type IN ('standard', 'proforma', 'credit_note', 'receipt')),
  invoice_status TEXT NOT NULL DEFAULT 'draft' CHECK(invoice_status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled', 'refunded')),
  invoice_date DATE NOT NULL,
  due_date DATE,
  payment_date DATE,
  
  -- Customer details (snapshot from order)
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_company TEXT,
  customer_vat_number TEXT,
  customer_address TEXT,
  customer_country TEXT NOT NULL,
  
  -- Financial details
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) DEFAULT 0.00,
  discount_amount DECIMAL(10, 2) DEFAULT 0.00,
  total DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  
  -- Payment details
  payment_method TEXT,
  payment_reference TEXT,
  
  -- PDF generation
  pdf_url TEXT,
  pdf_generated_at DATETIME,
  
  -- Additional info
  notes TEXT,
  terms TEXT,
  language TEXT DEFAULT 'de',
  
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Shipping Status table (for digital delivery tracking)
CREATE TABLE IF NOT EXISTS shipping_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  order_item_id INTEGER,
  
  -- Delivery type
  delivery_type TEXT NOT NULL CHECK(delivery_type IN ('license_key', 'download', 'email', 'api', 'manual')),
  delivery_method TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'delivered', 'failed', 'cancelled')),
  
  -- License key delivery
  license_key_id INTEGER,
  license_key_delivered BOOLEAN DEFAULT 0,
  license_key_delivered_at DATETIME,
  
  -- Download delivery
  download_url TEXT,
  download_expires_at DATETIME,
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 5,
  download_first_accessed_at DATETIME,
  download_last_accessed_at DATETIME,
  
  -- Email delivery
  email_sent BOOLEAN DEFAULT 0,
  email_sent_at DATETIME,
  email_opened BOOLEAN DEFAULT 0,
  email_opened_at DATETIME,
  
  -- Tracking
  tracking_code TEXT,
  delivery_attempts INTEGER DEFAULT 0,
  last_delivery_attempt_at DATETIME,
  
  -- Error handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  next_retry_at DATETIME,
  
  -- Notes
  notes TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  delivered_at DATETIME,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE,
  FOREIGN KEY (license_key_id) REFERENCES license_keys(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_refunds_order_id ON refunds(order_id);
CREATE INDEX IF NOT EXISTS idx_refunds_status ON refunds(refund_status);
CREATE INDEX IF NOT EXISTS idx_refunds_created_at ON refunds(created_at);

CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(invoice_status);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_date ON invoices(invoice_date);

CREATE INDEX IF NOT EXISTS idx_shipping_status_order_id ON shipping_status(order_id);
CREATE INDEX IF NOT EXISTS idx_shipping_status_order_item_id ON shipping_status(order_item_id);
CREATE INDEX IF NOT EXISTS idx_shipping_status_status ON shipping_status(status);
CREATE INDEX IF NOT EXISTS idx_shipping_status_license_key_id ON shipping_status(license_key_id);
