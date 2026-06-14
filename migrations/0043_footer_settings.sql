CREATE TABLE IF NOT EXISTS footer_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key TEXT UNIQUE NOT NULL,
  section_title TEXT NOT NULL,
  content TEXT,
  links TEXT DEFAULT '[]',
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO footer_settings (section_key, section_title, content, links, is_active, sort_order) VALUES
('company', 'Unternehmen', 'SOFTWAREKING24 - Ihr zuverlässiger Partner für Software-Lizenzen.', '[]', 1, 1),
('links', 'Schnelllinks', NULL, '[{"label":"Home","url":"/"},{"label":"Produkte","url":"/products"},{"label":"Über uns","url":"/about"},{"label":"Kontakt","url":"/contact"}]', 1, 2),
('legal', 'Rechtliches', NULL, '[{"label":"Impressum","url":"/impressum"},{"label":"Datenschutz","url":"/datenschutz"},{"label":"AGB","url":"/agb"},{"label":"Widerrufsrecht","url":"/widerruf"}]', 1, 3);
