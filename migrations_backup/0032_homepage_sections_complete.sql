-- ============================================
-- COMPLETE HOMEPAGE SECTIONS MANAGEMENT
-- All sections with drag & drop ordering
-- ============================================

-- Drop existing homepage_sections if exists and recreate with better structure
DROP TABLE IF EXISTS homepage_sections_old;
ALTER TABLE homepage_sections RENAME TO homepage_sections_old;

-- Create new homepage_sections table with complete structure
CREATE TABLE IF NOT EXISTS homepage_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_key TEXT UNIQUE NOT NULL, -- e.g., 'hero', 'trust_bar', 'products_windows'
    section_type TEXT NOT NULL, -- 'hero', 'trust_bar', 'product_slider', 'feature', etc.
    title TEXT, -- Section title (editable)
    subtitle TEXT, -- Section subtitle
    is_enabled BOOLEAN DEFAULT 1, -- Show/hide section
    sort_order INTEGER DEFAULT 0, -- Drag & drop order
    config TEXT, -- JSON configuration
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert all default sections with proper order
INSERT INTO homepage_sections (id, section_key, section_type, title, subtitle, is_enabled, sort_order, config) VALUES
-- Core sections
(1, 'hero', 'hero', 'Hero Slider', 'Main homepage slider', 1, 10, '{"auto_rotate": true, "interval": 5000}'),
(2, 'trust_bar', 'trust_bar', 'Trust Badges', 'Trust indicators', 1, 20, '{}'),

-- Product sections
(3, 'products_top_deals', 'product_slider', '🔥 Top-Angebote des Tages', 'Unsere besten Deals - Nur für kurze Zeit', 1, 30, '{"category": "deals", "limit": 8, "show_countdown": true}'),
(4, 'products_windows', 'product_slider', 'Windows Betriebssysteme', 'Original Microsoft Windows Lizenzen', 1, 40, '{"category": "Windows", "limit": 8}'),
(5, 'products_office', 'product_slider', 'Microsoft Office Pakete', 'Office 2024, 2021, Microsoft 365', 1, 50, '{"category": "Office", "limit": 8}'),
(6, 'products_server', 'product_slider', 'Server & CAL Lizenzen', 'Windows Server und Client Access Lizenzen', 1, 60, '{"category": "Server", "limit": 8}'),
(7, 'products_antivirus', 'product_slider', 'Antivirus & Sicherheit', 'Schützen Sie Ihre Systeme', 1, 70, '{"category": "Antivirus", "limit": 8}'),

-- New E-Commerce Features
(8, 'price_comparison', 'feature', 'Preisvergleich', 'Warum bei uns kaufen?', 1, 25, '{"show_competitors": true}'),
(9, 'license_availability', 'feature', 'Verfügbarkeit', 'Live Lagerbestand', 1, 15, '{"show_live_counter": true}'),
(10, 'countdown_deals', 'feature', 'Flash Deals', 'Zeitlich begrenzte Angebote', 1, 35, '{"duration_hours": 24}'),
(11, 'license_comparison', 'feature', 'Lizenzvergleich', 'Finden Sie die richtige Lizenz', 1, 45, '{"products": ["Windows 11 Home", "Windows 11 Pro", "Windows 11 Enterprise"]}'),
(12, 'bundle_deals', 'feature', 'Bundle-Angebote', 'Sparen Sie mit unseren Paketen', 1, 55, '{"show_savings": true}'),
(13, 'installation_guide', 'feature', 'Installations-Anleitung', 'So einfach geht''s', 1, 65, '{"show_video": true}'),
(14, 'trust_security', 'feature', 'Vertrauen & Sicherheit', 'Warum Sie uns vertrauen können', 1, 75, '{"show_certificates": true}'),
(15, 'license_preview', 'feature', 'Was Sie erhalten', 'Vorschau auf Ihre Lizenz', 1, 80, '{"show_sample": true}'),
(16, 'volume_calculator', 'feature', 'Volumen-Rechner', 'B2B Mengenrabatte berechnen', 1, 85, '{"min_quantity": 5, "max_quantity": 1000}'),
(17, 'recently_viewed', 'feature', 'Zuletzt angesehen', 'Ihre kürzlich besuchten Produkte', 1, 90, '{"limit": 6}'),
(18, 'customer_reviews', 'feature', 'Kundenbewertungen', 'Was unsere Kunden sagen', 1, 95, '{"limit": 10, "verified_only": true}'),
(19, 'language_support', 'feature', 'Mehrsprachiger Support', 'Unterstützte Sprachen', 1, 100, '{}'),
(20, 'live_chat', 'feature', 'Live Support', 'Wir sind für Sie da', 1, 105, '{"whatsapp": "+491234567890"}'),

-- Existing static sections (from components)
(21, 'faq', 'static', 'Häufig gestellte Fragen', 'Alles, was Sie wissen müssen', 1, 110, '{}'),
(22, 'bekannt_aus', 'static', 'Softwareking24.de bekannt aus', 'Vertrauen Sie auf unsere Erfahrung', 1, 115, '{}'),
(23, 'b2b', 'static', 'Attraktive Angebote für Firmen', 'Geschäftskunden-Konditionen', 1, 120, '{}'),
(24, 'partners', 'static', 'Unsere Partner', 'Autorisierte Partner der führenden Hersteller', 1, 125, '{}'),
(25, 'process_steps', 'static', 'So einfach geht''s', 'In 4 Schritten zu Ihrer Software', 1, 130, '{}'),
(26, 'category_grid', 'static', 'Beliebte Software-Kategorien', 'Entdecken Sie unser Sortiment', 1, 135, '{}'),
(27, 'newsletter', 'static', 'Newsletter abonnieren', 'Exklusive Angebote direkt in Ihr Postfach', 1, 140, '{}');

-- Create index for fast ordering queries
CREATE INDEX IF NOT EXISTS idx_homepage_sections_order ON homepage_sections(is_enabled, sort_order);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_type ON homepage_sections(section_type);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_key ON homepage_sections(section_key);
