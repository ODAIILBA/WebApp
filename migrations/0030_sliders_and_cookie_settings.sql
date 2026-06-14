-- ============================================
-- SLIDERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS sliders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  mobile_image_url TEXT,
  link_url TEXT,
  link_text TEXT,
  position INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  start_date DATETIME,
  end_date DATETIME,
  background_color TEXT DEFAULT '#1a2a4e',
  text_color TEXT DEFAULT '#ffffff',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sliders_position ON sliders(position);
CREATE INDEX IF NOT EXISTS idx_sliders_is_active ON sliders(is_active);

-- ============================================
-- COOKIE SETTINGS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS cookie_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL DEFAULT 'functional',
  name TEXT NOT NULL,
  description TEXT,
  provider TEXT,
  purpose TEXT,
  expiry TEXT,
  type TEXT DEFAULT 'http',
  is_essential INTEGER DEFAULT 0,
  is_enabled INTEGER DEFAULT 1,
  api_endpoint TEXT,
  api_key_setting TEXT,
  tracking_code TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cookie_settings_category ON cookie_settings(category);

-- Seed default cookie entries
INSERT OR IGNORE INTO cookie_settings (category, name, description, provider, purpose, expiry, type, is_essential, is_enabled) VALUES
('necessary', 'Session Cookie', 'Verwaltet die Benutzersitzung', 'SOFTWAREKING24', 'Authentifizierung', '1 Sitzung', 'http', 1, 1),
('necessary', 'CSRF Token', 'Schutz vor Cross-Site-Request-Forgery', 'SOFTWAREKING24', 'Sicherheit', '1 Sitzung', 'http', 1, 1),
('analytics', 'Google Analytics', 'Webseitenbesucherstatistik', 'Google LLC', 'Analyse', '2 Jahre', 'http', 0, 0),
('marketing', 'Facebook Pixel', 'Conversion-Tracking und Retargeting', 'Meta Platforms', 'Marketing', '90 Tage', 'pixel', 0, 0);
