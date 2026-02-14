-- Add missing columns that the API expects
ALTER TABLE products ADD COLUMN base_price REAL;
ALTER TABLE products ADD COLUMN discount_price REAL;
ALTER TABLE products ADD COLUMN discount_percentage INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN category_id INTEGER;
ALTER TABLE products ADD COLUMN brand_id INTEGER;

-- Populate the new columns from existing data
UPDATE products SET 
  base_price = price,
  discount_price = sale_price,
  discount_percentage = CASE 
    WHEN sale_price IS NOT NULL AND sale_price > 0 THEN 
      CAST(((price - sale_price) / price * 100) AS INTEGER)
    ELSE 0 
  END;
