-- Migration: Add sample data for testing
-- Date: 2026-01-29
-- Description: Add categories, brands, products, and translations

-- ============================================
-- CATEGORIES
-- ============================================
INSERT OR REPLACE INTO categories (id, slug, parent_id, is_active) VALUES 
  (1, 'software', NULL, 1),
  (2, 'operating-systems', 1, 1),
  (3, 'office-suites', 1, 1),
  (4, 'antivirus', 1, 1);

-- Category Translations
INSERT OR REPLACE INTO category_translations (category_id, language, name, description) VALUES
  (1, 'de', 'Software', 'Alle Software Produkte'),
  (1, 'en', 'Software', 'All Software Products'),
  (2, 'de', 'Betriebssysteme', 'Windows und andere Betriebssysteme'),
  (2, 'en', 'Operating Systems', 'Windows and other operating systems'),
  (3, 'de', 'Office-Suiten', 'Microsoft Office und Alternativen'),
  (3, 'en', 'Office Suites', 'Microsoft Office and alternatives'),
  (4, 'de', 'Antivirus', 'Sicherheitssoftware und Antivirus'),
  (4, 'en', 'Antivirus', 'Security software and antivirus');

-- ============================================
-- BRANDS
-- ============================================
INSERT OR REPLACE INTO brands (id, name, slug, logo_url, is_featured, sort_order) VALUES
  (1, 'Microsoft', 'microsoft', 'https://via.placeholder.com/150x50?text=Microsoft', 1, 0),
  (2, 'Adobe', 'adobe', 'https://via.placeholder.com/150x50?text=Adobe', 1, 1),
  (3, 'Kaspersky', 'kaspersky', 'https://via.placeholder.com/150x50?text=Kaspersky', 1, 2);

-- Brand Translations
INSERT OR REPLACE INTO brand_translations (brand_id, language, name, description) VALUES
  (1, 'de', 'Microsoft', 'Führender Anbieter von Betriebssystemen und Office-Software'),
  (1, 'en', 'Microsoft', 'Leading provider of operating systems and office software'),
  (2, 'de', 'Adobe', 'Kreative Software für Designer und Fotografen'),
  (2, 'en', 'Adobe', 'Creative software for designers and photographers'),
  (3, 'de', 'Kaspersky', 'Premium Antivirus und Sicherheitslösungen'),
  (3, 'en', 'Kaspersky', 'Premium antivirus and security solutions');

-- ============================================
-- PRODUCTS
-- ============================================
INSERT OR REPLACE INTO products (
  id, sku, category_id, brand_id, slug, product_type,
  base_price, discount_price, discount_percentage, vat_rate,
  stock_type, license_type, license_duration, delivery_type,
  activation_limit, is_featured, is_new, is_bestseller,
  view_count, sale_count, rating, review_count, is_active,
  woocommerce_id
) VALUES
  (1, 'WIN11-PRO', 2, 1, 'windows-11-pro', 'license',
   149.99, 99.99, 33, 19.00,
   'unlimited', 'perpetual', 'lifetime', 'instant',
   1, 1, 1, 1,
   1250, 450, 4.8, 125, 1,
   'WC-123'),
   
  (2, 'OFF2024-HOME', 3, 1, 'microsoft-office-2024-home', 'license',
   129.99, 89.99, 31, 19.00,
   'unlimited', 'perpetual', 'lifetime', 'instant',
   1, 1, 1, 1,
   980, 320, 4.7, 89, 1,
   'WC-124'),
   
  (3, 'KASP-TOTAL-2024', 4, 3, 'kaspersky-total-security-2024', 'license',
   79.99, 49.99, 38, 19.00,
   'unlimited', 'subscription', '1-year', 'instant',
   3, 1, 0, 1,
   670, 180, 4.6, 67, 1,
   'WC-125');

-- ============================================
-- PRODUCT TRANSLATIONS
-- ============================================
INSERT OR REPLACE INTO product_translations (
  product_id, language, name, short_description, long_description, features
) VALUES
  -- Windows 11 Pro
  (1, 'de', 
   'Windows 11 Pro', 
   'Das neueste Betriebssystem von Microsoft mit erweiterten Funktionen für Profis',
   'Windows 11 Pro bietet alle Features von Windows 11 Home plus erweiterte Sicherheits-, Verwaltungs- und Netzwerkfunktionen für professionelle Nutzer.',
   '["BitLocker Verschlüsselung", "Remote Desktop", "Hyper-V Virtualisierung", "Windows Update for Business"]'),
   
  (1, 'en',
   'Windows 11 Pro',
   'Microsoft''s latest operating system with advanced features for professionals',
   'Windows 11 Pro offers all features of Windows 11 Home plus enhanced security, management, and networking capabilities for professional users.',
   '["BitLocker encryption", "Remote Desktop", "Hyper-V virtualization", "Windows Update for Business"]'),
   
  -- Office 2024
  (2, 'de',
   'Microsoft Office 2024 Home & Business',
   'Die komplette Office-Suite mit Word, Excel, PowerPoint und mehr',
   'Microsoft Office 2024 Home & Business enthält alle klassischen Office-Anwendungen für Privatnutzer und kleine Unternehmen.',
   '["Word 2024", "Excel 2024", "PowerPoint 2024", "Outlook 2024", "OneNote", "Lebenslanges Nutzungsrecht"]'),
   
  (2, 'en',
   'Microsoft Office 2024 Home & Business',
   'The complete Office suite with Word, Excel, PowerPoint and more',
   'Microsoft Office 2024 Home & Business includes all classic Office applications for home users and small businesses.',
   '["Word 2024", "Excel 2024", "PowerPoint 2024", "Outlook 2024", "OneNote", "Lifetime license"]'),
   
  -- Kaspersky
  (3, 'de',
   'Kaspersky Total Security 2024',
   'Umfassender Schutz für bis zu 3 Geräte',
   'Kaspersky Total Security 2024 bietet erstklassigen Schutz vor Viren, Ransomware, Phishing und anderen Online-Bedrohungen.',
   '["Antivirus & Anti-Malware", "VPN (300 MB/Tag)", "Passwort-Manager", "Kindersicherung", "Datei-Verschlüsselung"]'),
   
  (3, 'en',
   'Kaspersky Total Security 2024',
   'Comprehensive protection for up to 3 devices',
   'Kaspersky Total Security 2024 provides top-tier protection against viruses, ransomware, phishing, and other online threats.',
   '["Antivirus & Anti-Malware", "VPN (300 MB/day)", "Password Manager", "Parental Controls", "File Encryption"]');

-- ============================================
-- PRODUCT IMAGES
-- ============================================
INSERT OR REPLACE INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
  (1, 'https://via.placeholder.com/600x400?text=Windows+11+Pro', 'Windows 11 Pro', 0, 1),
  (1, 'https://via.placeholder.com/600x400?text=Windows+11+Features', 'Windows 11 Features', 1, 0),
  (2, 'https://via.placeholder.com/600x400?text=Office+2024', 'Microsoft Office 2024', 0, 1),
  (2, 'https://via.placeholder.com/600x400?text=Office+Apps', 'Office Applications', 1, 0),
  (3, 'https://via.placeholder.com/600x400?text=Kaspersky+Total', 'Kaspersky Total Security', 0, 1),
  (3, 'https://via.placeholder.com/600x400?text=Kaspersky+Protection', 'Kaspersky Protection', 1, 0);

-- ============================================
-- USERS
-- ============================================
INSERT OR REPLACE INTO users (
  id, email, password_hash, first_name, last_name, 
  is_active, is_admin, email_verified
) VALUES
  (1, 'testuser@demo.com', 
   '$2a$10$dummyhashfordevtesting1234567890',
   'Demo', 'User', 1, 0, 1);

-- ============================================
-- HOMEPAGE SECTIONS
-- ============================================
INSERT OR REPLACE INTO homepage_sections (
  id, section_type, display_order, is_active
) VALUES
  (1, 'featured', 0, 1),
  (2, 'bestsellers', 1, 1),
  (3, 'new', 2, 1);

INSERT OR REPLACE INTO homepage_section_translations (
  section_id, language, title, subtitle
) VALUES
  (1, 'de', 'Beliebte Produkte', 'Unsere Top-Angebote für Sie'),
  (1, 'en', 'Featured Products', 'Our top offers for you'),
  (2, 'de', 'Bestseller', 'Die meistverkauften Produkte'),
  (2, 'en', 'Bestsellers', 'The most popular products'),
  (3, 'de', 'Neu im Sortiment', 'Entdecken Sie unsere neuesten Produkte'),
  (3, 'en', 'New Arrivals', 'Discover our latest products');
