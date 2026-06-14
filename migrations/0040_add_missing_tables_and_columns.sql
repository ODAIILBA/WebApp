-- ============================================
-- ADD MISSING COLUMNS TO faq_items (0035 schema lacks these)
-- ============================================

ALTER TABLE faq_items ADD COLUMN tags TEXT;
ALTER TABLE faq_items ADD COLUMN is_featured INTEGER DEFAULT 0;
ALTER TABLE faq_items ADD COLUMN helpful_count INTEGER DEFAULT 0;
ALTER TABLE faq_items ADD COLUMN not_helpful_count INTEGER DEFAULT 0;
ALTER TABLE faq_categories ADD COLUMN updated_at DATETIME;

-- ============================================
-- CREATE MISSING TABLES (IF NOT EXISTS = safe if already present)
-- ============================================

-- Homepage Hero Slides
CREATE TABLE IF NOT EXISTS homepage_hero_slides (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  cta_text TEXT,
  cta_link TEXT,
  background_image TEXT,
  background_color TEXT DEFAULT '#1a2a4e',
  text_color TEXT DEFAULT '#ffffff',
  order_position INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Navigation Menu
CREATE TABLE IF NOT EXISTS navigation_menu (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id INTEGER,
  title TEXT NOT NULL,
  url TEXT,
  icon TEXT,
  category TEXT,
  is_mega_menu INTEGER DEFAULT 0,
  mega_menu_columns INTEGER DEFAULT 4,
  order_position INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Homepage Sections
CREATE TABLE IF NOT EXISTS homepage_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key TEXT UNIQUE,
  title TEXT,
  subtitle TEXT,
  is_enabled INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  config TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Page Templates
CREATE TABLE IF NOT EXISTS page_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'custom',
  template_type TEXT DEFAULT 'html',
  content TEXT,
  is_active INTEGER DEFAULT 1,
  meta_title TEXT,
  meta_keywords TEXT,
  meta_description TEXT,
  usage_count INTEGER DEFAULT 0,
  last_used_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Template Variables
CREATE TABLE IF NOT EXISTS template_variables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template_id INTEGER NOT NULL,
  variable_name TEXT NOT NULL,
  variable_type TEXT DEFAULT 'text',
  default_value TEXT,
  is_required INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Template Usage Tracking
CREATE TABLE IF NOT EXISTS template_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template_id INTEGER,
  page_url TEXT,
  used_by TEXT,
  variables_used TEXT,
  used_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CMS Pages
CREATE TABLE IF NOT EXISTS cms_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template_id INTEGER,
  page_title TEXT NOT NULL,
  page_slug TEXT UNIQUE NOT NULL,
  variables_data TEXT,
  author TEXT DEFAULT 'Admin',
  status TEXT DEFAULT 'draft',
  order_status TEXT DEFAULT 'draft',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Custom JavaScript
CREATE TABLE IF NOT EXISTS custom_js (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  js_code TEXT NOT NULL,
  placement TEXT DEFAULT 'footer',
  execution_type TEXT DEFAULT 'immediate',
  priority INTEGER DEFAULT 50,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Custom CSS
CREATE TABLE IF NOT EXISTS custom_css (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  css_code TEXT NOT NULL,
  apply_to TEXT DEFAULT 'all',
  priority INTEGER DEFAULT 50,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_page_templates_slug ON page_templates(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(page_slug);
CREATE INDEX IF NOT EXISTS idx_template_variables_template ON template_variables(template_id);
CREATE INDEX IF NOT EXISTS idx_custom_js_active ON custom_js(is_active);
CREATE INDEX IF NOT EXISTS idx_custom_css_active ON custom_css(is_active);
