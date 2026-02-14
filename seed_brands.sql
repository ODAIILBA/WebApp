-- Seed brands data
INSERT OR IGNORE INTO brands (name, slug, description, is_active, sort_order) VALUES
('Microsoft', 'microsoft', 'Leading software and technology company', 1, 1),
('Adobe', 'adobe', 'Creative software solutions', 1, 2),
('Norton', 'norton', 'Cybersecurity and antivirus protection', 1, 3),
('Kaspersky', 'kaspersky', 'Award-winning security software', 1, 4),
('Bitdefender', 'bitdefender', 'Advanced cybersecurity solutions', 1, 5);

-- Populate brand translations
INSERT OR IGNORE INTO brand_translations (brand_id, language_code, name, description)
SELECT id, 'en', name, description FROM brands;
