-- Simple data migration - just the essentials
-- Categories
INSERT INTO categories (id, slug, parent_id, is_active) VALUES 
  (1, 'software', NULL, 1),
  (2, 'operating-systems', 1, 1),
  (3, 'office-suites', 1, 1),
  (4, 'antivirus', 1, 1);

-- Category Translations
INSERT INTO category_translations (category_id, language, name, description) VALUES
  (1, 'de', 'Software', 'Alle Software Produkte'),
  (2, 'de', 'Betriebssysteme', 'Windows und andere Betriebssysteme'),
  (3, 'de', 'Office-Suiten', 'Microsoft Office und Alternativen'),
  (4, 'de', 'Antivirus', 'Sicherheitssoftware und Antivirus');

-- Brands
INSERT INTO brands (id, name, slug, logo_url, is_featured, sort_order) VALUES
  (1, 'Microsoft', 'microsoft', 'https://via.placeholder.com/150x50?text=Microsoft', 1, 0),
  (2, 'Adobe', 'adobe', 'https://via.placeholder.com/150x50?text=Adobe', 1, 1),
  (3, 'Kaspersky', 'kaspersky', 'https://via.placeholder.com/150x50?text=Kaspersky', 1, 2);

-- Products
INSERT INTO products (
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

-- Product Translations
INSERT INTO product_translations (
  product_id, language, name, short_description, long_description, features
) VALUES
  (1, 'de', 
   'Windows 11 Pro', 
   'Das neueste Betriebssystem von Microsoft',
   'Windows 11 Pro bietet alle Features für professionelle Nutzer.',
   '["BitLocker", "Remote Desktop", "Hyper-V"]'),
   
  (2, 'de',
   'Microsoft Office 2024',
   'Die komplette Office-Suite',
   'Enthält Word, Excel, PowerPoint und mehr.',
   '["Word 2024", "Excel 2024", "PowerPoint 2024"]'),
   
  (3, 'de',
   'Kaspersky Total Security',
   'Umfassender Schutz für 3 Geräte',
   'Erstklassiger Schutz vor Viren und Ransomware.',
   '["Antivirus", "VPN", "Passwort-Manager"]');

-- Product Images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
  (1, 'https://via.placeholder.com/600x400?text=Windows+11', 'Windows 11 Pro', 0, 1),
  (2, 'https://via.placeholder.com/600x400?text=Office+2024', 'Microsoft Office 2024', 0, 1),
  (3, 'https://via.placeholder.com/600x400?text=Kaspersky', 'Kaspersky Total Security', 0, 1);

-- User
INSERT INTO users (
  id, email, password_hash, first_name, last_name, 
  role, status, email_verified
) VALUES
  (1, 'testuser@demo.com', 
   '$2a$10$dummyhashfordevtesting1234567890',
   'Demo', 'User', 'customer', 'active', 1);

-- Homepage Sections
INSERT INTO homepage_sections (id, section_key, section_type, sort_order, is_enabled) VALUES
  (1, 'featured-products', 'featured', 0, 1);
