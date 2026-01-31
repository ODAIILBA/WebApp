-- Seed default homepage sections for SOFTWAREKING24

-- Hero Section
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(1, 'hero_slider', 'hero', 1, 1, '{"autoplay": true, "interval": 5000, "title": "Hero Slider"}');

-- Trust Bar
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(2, 'trust_bar', 'trust_bar', 2, 1, '{"title": "Vertrauenssymbole", "items": [{"icon": "shield-alt", "text": "100% Original"}, {"icon": "bolt", "text": "Sofort verfügbar"}, {"icon": "lock", "text": "Sichere Bezahlung"}, {"icon": "headset", "text": "24/7 Support"}]}');

-- Featured Products
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(3, 'featured_products', 'product_slider', 3, 1, '{"title": "Top Angebote", "limit": 8, "filter": "featured"}');

-- Windows Section
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(4, 'windows_products', 'product_slider', 4, 1, '{"title": "Windows Lizenzen", "limit": 6, "category": "windows"}');

-- Office Section  
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(5, 'office_products', 'product_slider', 5, 1, '{"title": "Microsoft Office", "limit": 6, "category": "office"}');

-- Antivirus Section
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(6, 'antivirus_products', 'product_slider', 6, 1, '{"title": "Antivirus Software", "limit": 6, "category": "antivirus"}');

-- License Availability
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(7, 'license_availability', 'info', 7, 1, '{"title": "Lizenz-Verfügbarkeit", "showStock": true}');

-- Price Comparison
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(8, 'price_comparison', 'info', 8, 1, '{"title": "Preis-Vergleich", "showSavings": true}');

-- Why Choose Us
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(9, 'why_choose_us', 'feature', 9, 1, '{"title": "Warum SOFTWAREKING24?", "features": [{"icon": "certificate", "title": "Original", "text": "100% Originale Software"}, {"icon": "euro-sign", "title": "Günstig", "text": "Bis zu 80% sparen"}, {"icon": "clock", "title": "Sofort", "text": "Per E-Mail in Minuten"}, {"icon": "shield-alt", "title": "Sicher", "text": "SSL & Käuferschutz"}]}');

-- Customer Reviews
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(10, 'customer_reviews', 'widget', 10, 1, '{"title": "Kundenbewertungen", "limit": 6, "showRating": true}');

-- FAQ Section
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(11, 'faq', 'static', 11, 1, '{"title": "Häufige Fragen", "items": [{"q": "Sind die Lizenzen original?", "a": "Ja, 100% Original von Microsoft"}, {"q": "Wie schnell erhalte ich die Lizenz?", "a": "Sofort per E-Mail nach Zahlungseingang"}]}');

-- Newsletter
INSERT OR IGNORE INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled, config) VALUES 
(12, 'newsletter', 'widget', 12, 1, '{"title": "Newsletter", "buttonText": "Anmelden", "discount": "10%"}');
