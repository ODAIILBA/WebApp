-- Migration: Add missing translation tables
-- Date: 2026-01-29
-- Description: Add category_translations and brand_translations tables that were missing

-- Category Translations
CREATE TABLE IF NOT EXISTS category_translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  language TEXT NOT NULL DEFAULT 'de',
  name TEXT NOT NULL,
  description TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE(category_id, language)
);

CREATE INDEX IF NOT EXISTS idx_category_translations_category ON category_translations(category_id);
CREATE INDEX IF NOT EXISTS idx_category_translations_language ON category_translations(language);

-- Brand Translations (if brands need multilingual names/descriptions)
CREATE TABLE IF NOT EXISTS brand_translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand_id INTEGER NOT NULL,
  language TEXT NOT NULL DEFAULT 'de',
  name TEXT NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  UNIQUE(brand_id, language)
);

CREATE INDEX IF NOT EXISTS idx_brand_translations_brand ON brand_translations(brand_id);
CREATE INDEX IF NOT EXISTS idx_brand_translations_language ON brand_translations(language);

-- Insert sample translations for existing categories (if any)
INSERT OR IGNORE INTO category_translations (category_id, language, name, description)
VALUES 
  (1, 'de', 'Software', 'Software Produkte'),
  (1, 'en', 'Software', 'Software Products'),
  (2, 'de', 'Hardware', 'Hardware Produkte'),
  (2, 'en', 'Hardware', 'Hardware Products');

-- Insert sample translations for existing brands (if any)
INSERT OR IGNORE INTO brand_translations (brand_id, language, name, description)
VALUES
  (1, 'de', 'Microsoft', 'Microsoft Produkte'),
  (1, 'en', 'Microsoft', 'Microsoft Products'),
  (2, 'de', 'Adobe', 'Adobe Produkte'),
  (2, 'en', 'Adobe', 'Adobe Products');
