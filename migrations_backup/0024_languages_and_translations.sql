-- ============================================
-- LANGUAGES AND TRANSLATIONS SYSTEM
-- ============================================

-- Supported languages (EU-wide)
CREATE TABLE IF NOT EXISTS languages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL, -- ISO 639-1 (de, en, fr, es, etc.)
  name TEXT NOT NULL, -- Display name
  native_name TEXT NOT NULL, -- Native display (Deutsch, English, Français)
  flag_emoji TEXT, -- 🇩🇪 🇬🇧 🇫🇷
  is_active INTEGER DEFAULT 1,
  is_default INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- UI translations (system-wide)
CREATE TABLE IF NOT EXISTS translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  language_code TEXT NOT NULL,
  translation_key TEXT NOT NULL,
  translation_value TEXT NOT NULL,
  context TEXT, -- 'ui', 'email', 'seo', 'product', etc.
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_code, translation_key, context)
);

CREATE INDEX IF NOT EXISTS idx_translations_lang_key ON translations(language_code, translation_key);
CREATE INDEX IF NOT EXISTS idx_translations_context ON translations(context);

-- ============================================
-- VAT RATES AND EU TAX SYSTEM
-- ============================================

-- VAT rates for all EU countries
CREATE TABLE IF NOT EXISTS vat_rates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country_code TEXT NOT NULL, -- ISO 3166-1 alpha-2 (DE, FR, ES, etc.)
  country_name TEXT NOT NULL,
  standard_rate REAL NOT NULL, -- Standard VAT rate (19% for DE)
  reduced_rate REAL, -- Reduced rate if applicable
  super_reduced_rate REAL, -- Super reduced rate if applicable
  digital_services_rate REAL, -- Rate for digital services
  is_eu_member INTEGER DEFAULT 1,
  requires_vat_id INTEGER DEFAULT 0, -- B2B requires VAT ID
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(country_code)
);

CREATE INDEX IF NOT EXISTS idx_vat_country ON vat_rates(country_code);

-- VAT validation cache (for EU VAT ID checks)
CREATE TABLE IF NOT EXISTS vat_validations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vat_number TEXT NOT NULL,
  country_code TEXT NOT NULL,
  is_valid INTEGER NOT NULL,
  company_name TEXT,
  company_address TEXT,
  validated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME, -- Cache for 24 hours
  UNIQUE(vat_number)
);

CREATE INDEX IF NOT EXISTS idx_vat_validations_number ON vat_validations(vat_number);
CREATE INDEX IF NOT EXISTS idx_vat_validations_expires ON vat_validations(expires_at);

-- ============================================
-- COUPON AND PROMOTION SYSTEM
-- ============================================

-- Coupon codes
CREATE TABLE IF NOT EXISTS coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Discount type and value
  discount_type TEXT NOT NULL, -- 'percentage', 'fixed', 'free_shipping'
  discount_value REAL NOT NULL, -- Percentage (10 = 10%) or fixed amount
  
  -- Validity
  starts_at DATETIME,
  expires_at DATETIME,
  
  -- Usage limits
  max_uses INTEGER, -- Total uses allowed (NULL = unlimited)
  max_uses_per_customer INTEGER DEFAULT 1, -- Per customer limit
  current_uses INTEGER DEFAULT 0,
  
  -- Minimum requirements
  minimum_order_value REAL, -- Minimum cart value
  
  -- Product/Category restrictions (JSON arrays)
  applicable_products TEXT, -- JSON array of product IDs
  excluded_products TEXT, -- JSON array of product IDs
  applicable_categories TEXT, -- JSON array of category IDs
  excluded_categories TEXT, -- JSON array of category IDs
  
  -- Customer restrictions
  applicable_customers TEXT, -- JSON array of customer IDs (NULL = all)
  first_order_only INTEGER DEFAULT 0,
  
  -- Stackability
  is_stackable INTEGER DEFAULT 0, -- Can combine with other coupons
  
  -- Status
  is_active INTEGER DEFAULT 1,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER -- Admin user ID
);

CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupons_expires ON coupons(expires_at);

-- Coupon usage tracking
CREATE TABLE IF NOT EXISTS coupon_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  coupon_id INTEGER NOT NULL,
  order_id INTEGER,
  customer_id INTEGER,
  customer_email TEXT,
  discount_amount REAL NOT NULL,
  used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (coupon_id) REFERENCES coupons(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon ON coupon_usage(coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_customer ON coupon_usage(customer_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_email ON coupon_usage(customer_email);

-- ============================================
-- LIVE CHAT SYSTEM
-- ============================================

-- Chat conversations
CREATE TABLE IF NOT EXISTS chat_conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT UNIQUE NOT NULL, -- Unique session identifier
  customer_id INTEGER, -- NULL if guest
  customer_name TEXT,
  customer_email TEXT,
  customer_ip TEXT,
  
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'closed', 'waiting'
  assigned_agent_id INTEGER, -- Admin/agent handling the chat
  
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_message_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  closed_at DATETIME,
  
  -- Metadata
  user_agent TEXT,
  referrer TEXT,
  language_code TEXT DEFAULT 'de'
);

CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_customer ON chat_conversations(customer_id);
CREATE INDEX IF NOT EXISTS idx_chat_status ON chat_conversations(status);
CREATE INDEX IF NOT EXISTS idx_chat_agent ON chat_conversations(assigned_agent_id);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  sender_type TEXT NOT NULL, -- 'customer', 'agent', 'system'
  sender_id INTEGER, -- customer_id or agent_id
  sender_name TEXT,
  
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- 'text', 'image', 'file', 'system'
  
  is_read INTEGER DEFAULT 0,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (conversation_id) REFERENCES chat_conversations(id)
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sent ON chat_messages(sent_at);

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================

-- Default languages (EU + major languages)
INSERT OR IGNORE INTO languages (code, name, native_name, flag_emoji, is_active, is_default, sort_order) VALUES
  ('de', 'German', 'Deutsch', '🇩🇪', 1, 1, 1),
  ('en', 'English', 'English', '🇬🇧', 1, 0, 2),
  ('fr', 'French', 'Français', '🇫🇷', 1, 0, 3),
  ('es', 'Spanish', 'Español', '🇪🇸', 1, 0, 4),
  ('it', 'Italian', 'Italiano', '🇮🇹', 1, 0, 5),
  ('nl', 'Dutch', 'Nederlands', '🇳🇱', 1, 0, 6),
  ('pl', 'Polish', 'Polski', '🇵🇱', 1, 0, 7),
  ('pt', 'Portuguese', 'Português', '🇵🇹', 1, 0, 8),
  ('cs', 'Czech', 'Čeština', '🇨🇿', 1, 0, 9),
  ('ro', 'Romanian', 'Română', '🇷🇴', 1, 0, 10),
  ('hu', 'Hungarian', 'Magyar', '🇭🇺', 1, 0, 11),
  ('sv', 'Swedish', 'Svenska', '🇸🇪', 1, 0, 12),
  ('da', 'Danish', 'Dansk', '🇩🇰', 1, 0, 13),
  ('fi', 'Finnish', 'Suomi', '🇫🇮', 1, 0, 14),
  ('el', 'Greek', 'Ελληνικά', '🇬🇷', 1, 0, 15),
  ('bg', 'Bulgarian', 'Български', '🇧🇬', 1, 0, 16),
  ('sk', 'Slovak', 'Slovenčina', '🇸🇰', 1, 0, 17),
  ('hr', 'Croatian', 'Hrvatski', '🇭🇷', 1, 0, 18),
  ('sl', 'Slovenian', 'Slovenščina', '🇸🇮', 1, 0, 19),
  ('et', 'Estonian', 'Eesti', '🇪🇪', 1, 0, 20),
  ('lv', 'Latvian', 'Latviešu', '🇱🇻', 1, 0, 21),
  ('lt', 'Lithuanian', 'Lietuvių', '🇱🇹', 1, 0, 22);

-- VAT rates for all EU countries (2024 rates)
INSERT OR IGNORE INTO vat_rates (country_code, country_name, standard_rate, digital_services_rate, is_eu_member, requires_vat_id) VALUES
  ('AT', 'Austria', 20.0, 20.0, 1, 1),
  ('BE', 'Belgium', 21.0, 21.0, 1, 1),
  ('BG', 'Bulgaria', 20.0, 20.0, 1, 1),
  ('HR', 'Croatia', 25.0, 25.0, 1, 1),
  ('CY', 'Cyprus', 19.0, 19.0, 1, 1),
  ('CZ', 'Czech Republic', 21.0, 21.0, 1, 1),
  ('DK', 'Denmark', 25.0, 25.0, 1, 1),
  ('EE', 'Estonia', 22.0, 22.0, 1, 1),
  ('FI', 'Finland', 25.5, 25.5, 1, 1),
  ('FR', 'France', 20.0, 20.0, 1, 1),
  ('DE', 'Germany', 19.0, 19.0, 1, 1),
  ('GR', 'Greece', 24.0, 24.0, 1, 1),
  ('HU', 'Hungary', 27.0, 27.0, 1, 1),
  ('IE', 'Ireland', 23.0, 23.0, 1, 1),
  ('IT', 'Italy', 22.0, 22.0, 1, 1),
  ('LV', 'Latvia', 21.0, 21.0, 1, 1),
  ('LT', 'Lithuania', 21.0, 21.0, 1, 1),
  ('LU', 'Luxembourg', 17.0, 17.0, 1, 1),
  ('MT', 'Malta', 18.0, 18.0, 1, 1),
  ('NL', 'Netherlands', 21.0, 21.0, 1, 1),
  ('PL', 'Poland', 23.0, 23.0, 1, 1),
  ('PT', 'Portugal', 23.0, 23.0, 1, 1),
  ('RO', 'Romania', 19.0, 19.0, 1, 1),
  ('SK', 'Slovakia', 20.0, 20.0, 1, 1),
  ('SI', 'Slovenia', 22.0, 22.0, 1, 1),
  ('ES', 'Spain', 21.0, 21.0, 1, 1),
  ('SE', 'Sweden', 25.0, 25.0, 1, 1);
