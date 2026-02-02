-- Migration: Add Homepage Management Tables
-- Created: 2026-01-28

-- Sliders/Hero Banners Table
CREATE TABLE IF NOT EXISTS sliders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  subtitle TEXT,
  button_text TEXT,
  button_link TEXT,
  image_url TEXT,
  background_color TEXT DEFAULT '#1a2a4e',
  text_color TEXT DEFAULT '#ffffff',
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Slider Translations
CREATE TABLE IF NOT EXISTS slider_translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slider_id INTEGER NOT NULL,
  language TEXT NOT NULL DEFAULT 'de',
  title TEXT NOT NULL,
  subtitle TEXT,
  button_text TEXT,
  FOREIGN KEY (slider_id) REFERENCES sliders(id) ON DELETE CASCADE,
  UNIQUE(slider_id, language)
);

-- Homepage Sections Table
CREATE TABLE IF NOT EXISTS homepage_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  section_type TEXT NOT NULL, -- 'featured', 'bestsellers', 'new', 'categories', 'brands', 'custom'
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  limit_items INTEGER DEFAULT 8,
  layout TEXT DEFAULT 'grid', -- 'grid', 'slider', 'list'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Homepage Section Translations
CREATE TABLE IF NOT EXISTS homepage_section_translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id INTEGER NOT NULL,
  language TEXT NOT NULL DEFAULT 'de',
  title TEXT NOT NULL,
  subtitle TEXT,
  FOREIGN KEY (section_id) REFERENCES homepage_sections(id) ON DELETE CASCADE,
  UNIQUE(section_id, language)
);

-- Insert default homepage sections
INSERT OR IGNORE INTO homepage_sections (section_key, title, subtitle, section_type, display_order, limit_items, layout) VALUES
('featured_products', 'Beliebte Produkte', 'Unsere meistverkauften Software-Lizenzen', 'featured', 1, 8, 'grid'),
('new_products', 'Neu eingetroffen', 'Die neuesten Software-Produkte', 'new', 2, 6, 'slider'),
('bestsellers', 'Bestseller', 'Die beliebtesten Produkte unserer Kunden', 'bestsellers', 3, 6, 'grid'),
('categories', 'Kategorien', 'Durchsuchen Sie nach Kategorie', 'categories', 4, 8, 'grid');

-- Insert default slider
INSERT OR IGNORE INTO sliders (title, subtitle, button_text, button_link, image_url, sort_order) VALUES
('Original Software Lizenzen', 'Günstig, Legal & Sofort verfügbar', 'Jetzt entdecken', '/produkte', '/static/banners/hero_home.jpg', 1);

-- Insert German translations for slider
INSERT OR IGNORE INTO slider_translations (slider_id, language, title, subtitle, button_text) VALUES
(1, 'de', 'Original Software Lizenzen', 'Günstig, Legal & Sofort verfügbar', 'Jetzt entdecken');

-- Insert English translations for slider
INSERT OR IGNORE INTO slider_translations (slider_id, language, title, subtitle, button_text) VALUES
(1, 'en', 'Original Software Licenses', 'Affordable, Legal & Instantly Available', 'Discover Now');

-- Insert German translations for sections
INSERT OR IGNORE INTO homepage_section_translations (section_id, language, title, subtitle) VALUES
(1, 'de', 'Beliebte Produkte', 'Unsere meistverkauften Software-Lizenzen'),
(2, 'de', 'Neu eingetroffen', 'Die neuesten Software-Produkte'),
(3, 'de', 'Bestseller', 'Die beliebtesten Produkte unserer Kunden'),
(4, 'de', 'Kategorien', 'Durchsuchen Sie nach Kategorie');

-- Insert English translations for sections
INSERT OR IGNORE INTO homepage_section_translations (section_id, language, title, subtitle) VALUES
(1, 'en', 'Featured Products', 'Our best-selling software licenses'),
(2, 'en', 'New Arrivals', 'The latest software products'),
(3, 'en', 'Bestsellers', 'Customer favorites'),
(4, 'en', 'Categories', 'Browse by category');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_sliders_active ON sliders(is_active);
CREATE INDEX IF NOT EXISTS idx_sliders_order ON sliders(sort_order);
CREATE INDEX IF NOT EXISTS idx_slider_translations_slider ON slider_translations(slider_id);
CREATE INDEX IF NOT EXISTS idx_slider_translations_language ON slider_translations(language);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_active ON homepage_sections(is_active);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_order ON homepage_sections(display_order);
CREATE INDEX IF NOT EXISTS idx_homepage_section_translations_section ON homepage_section_translations(section_id);
CREATE INDEX IF NOT EXISTS idx_homepage_section_translations_language ON homepage_section_translations(language);
