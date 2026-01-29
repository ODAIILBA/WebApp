-- Migration: Add CMS pages and footer settings
-- ========================================================================

-- Create footer settings table
CREATE TABLE IF NOT EXISTS footer_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key TEXT UNIQUE NOT NULL,
  section_title TEXT NOT NULL,
  content TEXT,
  links TEXT, -- JSON array of {text, url, icon}
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert footer sections
INSERT INTO footer_settings (section_key, section_title, content, links, sort_order) VALUES
('company_info', 'SOFTWAREKING24', 'Ihr vertrauensvoller Partner für Original-Software-Lizenzen zu fairen Preisen.', null, 1),
('quick_links', 'Schnellzugriff', null, '[
  {"text": "Startseite", "url": "/"},
  {"text": "Produkte", "url": "/produkte"},
  {"text": "Über uns", "url": "/ueber-uns"},
  {"text": "Kontakt", "url": "/kontakt"}
]', 2),
('customer_service', 'Kundenservice', null, '[
  {"text": "FAQ", "url": "/faq"},
  {"text": "Versand & Lieferung", "url": "/versand"},
  {"text": "Rückgabe & Widerruf", "url": "/widerruf"},
  {"text": "Zahlungsmethoden", "url": "/zahlung"}
]', 3),
('legal', 'Rechtliches', null, '[
  {"text": "AGB", "url": "/agb"},
  {"text": "Datenschutz", "url": "/datenschutz"},
  {"text": "Impressum", "url": "/impressum"},
  {"text": "Cookie-Einstellungen", "url": "/cookies"}
]', 4),
('contact_info', 'Kontakt', null, '[
  {"text": "E-Mail: info@softwareking24.de", "url": "mailto:info@softwareking24.de", "icon": "envelope"},
  {"text": "Tel: +49 (0) 123 456789", "url": "tel:+491234567890", "icon": "phone"},
  {"text": "Mo-Fr: 9:00-18:00 Uhr", "url": null, "icon": "clock"}
]', 5),
('social_media', 'Social Media', null, '[
  {"text": "Facebook", "url": "https://facebook.com/softwareking24", "icon": "facebook"},
  {"text": "Twitter", "url": "https://twitter.com/softwareking24", "icon": "twitter"},
  {"text": "Instagram", "url": "https://instagram.com/softwareking24", "icon": "instagram"}
]', 6);

-- Insert CMS pages
INSERT INTO pages (slug, page_type, is_active) VALUES
('ueber-uns', 'cms', 1),
('faq', 'cms', 1),
('versand', 'cms', 1),
('widerruf', 'cms', 1),
('zahlung', 'cms', 1),
('agb', 'legal', 1),
('datenschutz', 'legal', 1),
('impressum', 'legal', 1),
('cookies', 'cms', 1)
ON CONFLICT(slug) DO NOTHING;

-- Insert page translations (German)
INSERT INTO page_translations (page_id, language, title, content, meta_description) 
SELECT 
  p.id,
  'de',
  CASE 
    WHEN p.slug = 'ueber-uns' THEN 'Über uns'
    WHEN p.slug = 'faq' THEN 'Häufig gestellte Fragen'
    WHEN p.slug = 'versand' THEN 'Versand & Lieferung'
    WHEN p.slug = 'widerruf' THEN 'Rückgabe & Widerruf'
    WHEN p.slug = 'zahlung' THEN 'Zahlungsmethoden'
    WHEN p.slug = 'agb' THEN 'Allgemeine Geschäftsbedingungen'
    WHEN p.slug = 'datenschutz' THEN 'Datenschutzerklärung'
    WHEN p.slug = 'impressum' THEN 'Impressum'
    WHEN p.slug = 'cookies' THEN 'Cookie-Einstellungen'
  END,
  CASE 
    WHEN p.slug = 'ueber-uns' THEN '<h1>Über SOFTWAREKING24</h1><p>SOFTWAREKING24 ist Ihr vertrauensvoller Partner für Original-Software-Lizenzen. Wir bieten eine große Auswahl an Windows, Office, Antivirus und weiterer Software zu fairen Preisen.</p><h2>Unsere Mission</h2><p>Wir möchten jedem den Zugang zu legaler und Original-Software ermöglichen - schnell, sicher und zu erschwinglichen Preisen.</p>'
    WHEN p.slug = 'faq' THEN '<h1>Häufig gestellte Fragen</h1><h2>Wie erhalte ich meine Lizenz?</h2><p>Nach dem Kauf erhalten Sie Ihre Lizenz sofort per E-Mail.</p><h2>Sind die Lizenzen original?</h2><p>Ja, alle unsere Lizenzen sind 100% original und legal.</p>'
    WHEN p.slug = 'versand' THEN '<h1>Versand & Lieferung</h1><p>Alle Lizenzen werden digital per E-Mail verschickt. Sie erhalten Ihren Produktschlüssel innerhalb von Minuten nach Zahlungseingang.</p>'
    WHEN p.slug = 'widerruf' THEN '<h1>Rückgabe & Widerruf</h1><p>Da es sich um digitale Produkte handelt, gelten besondere Bedingungen für Widerruf und Rückgabe.</p>'
    WHEN p.slug = 'zahlung' THEN '<h1>Zahlungsmethoden</h1><p>Wir akzeptieren: PayPal, Kreditkarte, SOFORT, Vorkasse</p>'
    WHEN p.slug = 'agb' THEN '<h1>Allgemeine Geschäftsbedingungen</h1><p>Hier finden Sie unsere AGB...</p>'
    WHEN p.slug = 'datenschutz' THEN '<h1>Datenschutzerklärung</h1><p>Der Schutz Ihrer Daten ist uns wichtig...</p>'
    WHEN p.slug = 'impressum' THEN '<h1>Impressum</h1><p>SOFTWAREKING24 GmbH<br>Musterstraße 123<br>12345 Musterstadt<br>Deutschland</p>'
    WHEN p.slug = 'cookies' THEN '<h1>Cookie-Einstellungen</h1><p>Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.</p>'
  END,
  'SOFTWAREKING24'
FROM pages p
WHERE p.slug IN ('ueber-uns', 'faq', 'versand', 'widerruf', 'zahlung', 'agb', 'datenschutz', 'impressum', 'cookies')
ON CONFLICT(page_id, language) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_footer_settings_active ON footer_settings(is_active, sort_order);
