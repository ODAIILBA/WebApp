-- Add missing product columns
ALTER TABLE products ADD COLUMN is_bestseller INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN is_new INTEGER DEFAULT 0;

-- Update some products to be bestsellers and new
UPDATE products SET is_bestseller = 1 WHERE id IN (9, 10, 11); -- Top 3 products
UPDATE products SET is_new = 1 WHERE id IN (13, 14, 15, 16); -- Last 4 products
UPDATE products SET is_featured = 1 WHERE id IN (9, 10, 11, 12, 13, 14); -- 6 featured

-- Also check if category_translations has correct column name
