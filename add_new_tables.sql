-- Add only the NEW tables (languages, translations, vat_rates, chat)

-- Languages table
CREATE TABLE IF NOT EXISTS languages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  flag_emoji TEXT,
  is_active INTEGER DEFAULT 1,
  is_default INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Translations table
CREATE TABLE IF NOT EXISTS translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  language_code TEXT NOT NULL,
  translation_key TEXT NOT NULL,
  translation_value TEXT NOT NULL,
  context TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_code, translation_key, context)
);

CREATE INDEX IF NOT EXISTS idx_translations_lang_key ON translations(language_code, translation_key);

-- VAT rates table
CREATE TABLE IF NOT EXISTS vat_rates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country_code TEXT UNIQUE NOT NULL,
  country_name TEXT NOT NULL,
  standard_rate REAL NOT NULL,
  digital_services_rate REAL,
  is_eu_member INTEGER DEFAULT 1,
  requires_vat_id INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- VAT validation cache
CREATE TABLE IF NOT EXISTS vat_validations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vat_number TEXT UNIQUE NOT NULL,
  country_code TEXT NOT NULL,
  is_valid INTEGER NOT NULL,
  company_name TEXT,
  company_address TEXT,
  validated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  cache_expires_at DATETIME
);

-- Chat conversations
CREATE TABLE IF NOT EXISTS chat_conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT UNIQUE NOT NULL,
  customer_id INTEGER,
  customer_name TEXT,
  customer_email TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  assigned_agent_id INTEGER,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_message_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  closed_at DATETIME
);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  sender_type TEXT NOT NULL,
  sender_id INTEGER,
  sender_name TEXT,
  message TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES chat_conversations(id)
);

-- Insert default languages
INSERT OR IGNORE INTO languages (code, name, native_name, flag_emoji, is_active, is_default, sort_order) VALUES
  ('de', 'German', 'Deutsch', '🇩🇪', 1, 1, 1),
  ('en', 'English', 'English', '🇬🇧', 1, 0, 2),
  ('fr', 'French', 'Français', '🇫🇷', 1, 0, 3),
  ('es', 'Spanish', 'Español', '🇪🇸', 1, 0, 4),
  ('it', 'Italian', 'Italiano', '🇮🇹', 1, 0, 5),
  ('nl', 'Dutch', 'Nederlands', '🇳🇱', 1, 0, 6),
  ('pl', 'Polish', 'Polski', '🇵🇱', 1, 0, 7);

-- Insert VAT rates for EU countries
INSERT OR IGNORE INTO vat_rates (country_code, country_name, standard_rate, digital_services_rate, is_eu_member, requires_vat_id) VALUES
  ('DE', 'Germany', 19.0, 19.0, 1, 1),
  ('AT', 'Austria', 20.0, 20.0, 1, 1),
  ('BE', 'Belgium', 21.0, 21.0, 1, 1),
  ('FR', 'France', 20.0, 20.0, 1, 1),
  ('ES', 'Spain', 21.0, 21.0, 1, 1),
  ('IT', 'Italy', 22.0, 22.0, 1, 1),
  ('NL', 'Netherlands', 21.0, 21.0, 1, 1),
  ('PL', 'Poland', 23.0, 23.0, 1, 1);
