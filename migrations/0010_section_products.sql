-- Migration: Add Manual Product Selection for Homepage Sections
-- Created: 2026-01-28

-- Section Products Junction Table
CREATE TABLE IF NOT EXISTS section_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (section_id) REFERENCES homepage_sections(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE(section_id, product_id)
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_section_products_section ON section_products(section_id);
CREATE INDEX IF NOT EXISTS idx_section_products_product ON section_products(product_id);
CREATE INDEX IF NOT EXISTS idx_section_products_order ON section_products(sort_order);
