-- Add simple columns to products table for easier import
ALTER TABLE products ADD COLUMN name TEXT;
ALTER TABLE products ADD COLUMN description TEXT;
ALTER TABLE products ADD COLUMN short_description TEXT;
ALTER TABLE products ADD COLUMN price INTEGER;
ALTER TABLE products ADD COLUMN sale_price INTEGER;
ALTER TABLE products ADD COLUMN category TEXT;
ALTER TABLE products ADD COLUMN image_url TEXT;
ALTER TABLE products ADD COLUMN in_stock INTEGER DEFAULT 1;
ALTER TABLE products ADD COLUMN stock_quantity INTEGER DEFAULT 999;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
