-- Add performance indexes for products table
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_bestseller ON products(is_bestseller);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_base_price ON products(base_price);

-- Add indexes for translations
CREATE INDEX IF NOT EXISTS idx_category_translations_category_id ON category_translations(category_id);
CREATE INDEX IF NOT EXISTS idx_category_translations_language_code ON category_translations(language_code);
CREATE INDEX IF NOT EXISTS idx_brand_translations_brand_id ON brand_translations(brand_id);
CREATE INDEX IF NOT EXISTS idx_product_translations_product_id ON product_translations(product_id);
CREATE INDEX IF NOT EXISTS idx_product_translations_language ON product_translations(language);

-- Add composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_products_active_featured ON products(is_active, is_featured);
CREATE INDEX IF NOT EXISTS idx_products_active_category ON products(is_active, category_id);
CREATE INDEX IF NOT EXISTS idx_products_active_brand ON products(is_active, brand_id);
