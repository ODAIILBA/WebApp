-- ============================================
-- MISSING ADMIN TABLES
-- homepage_hero_slides, navigation_menu, homepage_sections,
-- faq_categories, faq_items, page_templates, template_variables,
-- template_usage, cms_pages, custom_js, custom_css
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
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES navigation_menu(id) ON DELETE CASCADE
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


-- FAQ Categories
CREATE TABLE IF NOT EXISTS faq_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- FAQ Items
CREATE TABLE IF NOT EXISTS faq_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  tags TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES faq_categories(id) ON DELETE SET NULL
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
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES page_templates(id) ON DELETE CASCADE
);

-- Template Usage Tracking
CREATE TABLE IF NOT EXISTS template_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template_id INTEGER,
  page_url TEXT,
  used_by TEXT,
  variables_used TEXT,
  used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES page_templates(id) ON DELETE SET NULL
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
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES page_templates(id) ON DELETE SET NULL
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
CREATE INDEX IF NOT EXISTS idx_navigation_menu_parent ON navigation_menu(parent_id);
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category_id);
CREATE INDEX IF NOT EXISTS idx_faq_items_published ON faq_items(is_published);
CREATE INDEX IF NOT EXISTS idx_template_variables_template ON template_variables(template_id);
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(page_slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_status ON cms_pages(status);
CREATE INDEX IF NOT EXISTS idx_custom_js_active ON custom_js(is_active);
CREATE INDEX IF NOT EXISTS idx_custom_css_active ON custom_css(is_active);
