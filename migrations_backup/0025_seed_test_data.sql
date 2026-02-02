-- ============================================
-- SEED TEST DATA FOR CRUD TESTING
-- ============================================

-- Categories
INSERT OR IGNORE INTO categories (id, slug, parent_id, icon, sort_order, is_active) VALUES
(1, 'microsoft-office', NULL, 'fa-file-word', 1, 1),
(2, 'windows', NULL, 'fa-windows', 2, 1),
(3, 'antivirus', NULL, 'fa-shield-alt', 3, 1),
(4, 'adobe', NULL, 'fa-palette', 4, 1),
(5, 'server', NULL, 'fa-server', 5, 1);

-- Category Translations (German)
INSERT OR IGNORE INTO category_translations (category_id, language, name, description) VALUES
(1, 'de', 'Microsoft Office', 'Office-Anwendungen und Produktivitätssoftware'),
(2, 'de', 'Windows', 'Windows Betriebssysteme'),
(3, 'de', 'Antivirus & Sicherheit', 'Sicherheitssoftware und Antivirus-Programme'),
(4, 'de', 'Adobe Creative Cloud', 'Kreative Software für Design und Multimedia'),
(5, 'de', 'Server Software', 'Server-Lizenzen und Enterprise-Software');

-- Category Translations (English)
INSERT OR IGNORE INTO category_translations (category_id, language, name, description) VALUES
(1, 'en', 'Microsoft Office', 'Office applications and productivity software'),
(2, 'en', 'Windows', 'Windows operating systems'),
(3, 'en', 'Antivirus & Security', 'Security software and antivirus programs'),
(4, 'en', 'Adobe Creative Cloud', 'Creative software for design and multimedia'),
(5, 'en', 'Server Software', 'Server licenses and enterprise software');

-- Brands
INSERT OR IGNORE INTO brands (id, name, slug, logo_url, is_featured, sort_order) VALUES
(1, 'Microsoft', 'microsoft', '/images/brands/microsoft.png', 1, 1),
(2, 'Adobe', 'adobe', '/images/brands/adobe.png', 1, 2),
(3, 'Kaspersky', 'kaspersky', '/images/brands/kaspersky.png', 1, 3),
(4, 'Norton', 'norton', '/images/brands/norton.png', 0, 4),
(5, 'Autodesk', 'autodesk', '/images/brands/autodesk.png', 0, 5);

-- Sample Products
INSERT OR IGNORE INTO products (id, sku, category_id, brand_id, slug, product_type, base_price, discount_price, discount_percentage, stock_type, available_licenses, is_featured, is_new, is_active) VALUES
(1, 'MS-OFF-2021-PRO', 1, 1, 'microsoft-office-2021-professional', 'license', 89.99, 79.99, 11, 'unlimited', 0, 1, 0, 1),
(2, 'MS-OFF-365-BUS', 1, 1, 'microsoft-365-business-premium', 'license', 12.99, NULL, 0, 'unlimited', 0, 1, 1, 1),
(3, 'WIN-11-PRO', 2, 1, 'windows-11-professional', 'license', 199.99, 149.99, 25, 'unlimited', 0, 1, 1, 1),
(4, 'WIN-10-HOME', 2, 1, 'windows-10-home', 'license', 139.99, 99.99, 29, 'unlimited', 0, 0, 0, 1),
(5, 'KASP-TOTAL-2024', 3, 3, 'kaspersky-total-security-2024', 'license', 49.99, 39.99, 20, 'unlimited', 0, 1, 1, 1),
(6, 'ADOBE-CC-ALL', 4, 2, 'adobe-creative-cloud-all-apps', 'license', 59.99, NULL, 0, 'unlimited', 0, 1, 0, 1),
(7, 'WIN-SERVER-2022', 5, 1, 'windows-server-2022-standard', 'license', 899.99, NULL, 0, 'limited', 50, 0, 1, 1);

-- Product Translations (German)
INSERT OR IGNORE INTO product_translations (product_id, language, name, short_description, long_description) VALUES
(1, 'de', 'Microsoft Office 2021 Professional Plus', 'Vollversion für Windows', 'Microsoft Office 2021 Professional Plus - Die komplette Office-Suite mit Word, Excel, PowerPoint, Outlook, Access und Publisher.'),
(2, 'de', 'Microsoft 365 Business Premium', 'Cloud-Abo mit allen Apps', 'Microsoft 365 Business Premium - Alle Office-Apps plus Cloud-Speicher und erweiterte Sicherheitsfunktionen.'),
(3, 'de', 'Windows 11 Professional', 'Neuestes Windows-Betriebssystem', 'Windows 11 Pro - Das neueste Betriebssystem von Microsoft mit verbesserter Sicherheit und Produktivitätsfunktionen.'),
(4, 'de', 'Windows 10 Home', 'Bewährtes Windows-Betriebssystem', 'Windows 10 Home - Zuverlässiges Betriebssystem für den privaten Gebrauch.'),
(5, 'de', 'Kaspersky Total Security 2024', 'Umfassender Schutz für alle Geräte', 'Kaspersky Total Security 2024 - Vollständiger Schutz vor Viren, Malware, Ransomware und Online-Bedrohungen.'),
(6, 'de', 'Adobe Creative Cloud All Apps', 'Alle Adobe-Programme', 'Adobe Creative Cloud All Apps - Zugriff auf alle Adobe-Programme wie Photoshop, Illustrator, InDesign und mehr.'),
(7, 'de', 'Windows Server 2022 Standard', 'Server-Betriebssystem', 'Windows Server 2022 Standard - Enterprise-Server-Lösung für kleine bis mittlere Unternehmen.');

-- Sample Users (Customers)
INSERT OR IGNORE INTO users (id, email, password_hash, first_name, last_name, role, status, email_verified, language_preference) VALUES
(1, 'admin@softwareking24.com', '$2a$10$abcdefghijklmnopqrstuv', 'Admin', 'User', 'admin', 'active', 1, 'de'),
(2, 'max.mustermann@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'Max', 'Mustermann', 'customer', 'active', 1, 'de'),
(3, 'anna.schmidt@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'Anna', 'Schmidt', 'customer', 'active', 1, 'de'),
(4, 'john.doe@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'John', 'Doe', 'customer', 'active', 1, 'en'),
(5, 'maria.garcia@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'Maria', 'Garcia', 'customer', 'active', 1, 'de');

-- Sample Orders
INSERT OR IGNORE INTO orders (id, user_id, order_number, status, total, subtotal, tax_amount, discount_amount, payment_status, payment_method, email, first_name, last_name, country) VALUES
(1, 2, 'ORD-2024-00001', 'completed', 79.99, 79.99, 0, 0, 'paid', 'credit_card', 'max.mustermann@example.com', 'Max', 'Mustermann', 'DE'),
(2, 3, 'ORD-2024-00002', 'completed', 149.99, 149.99, 0, 0, 'paid', 'paypal', 'anna.schmidt@example.com', 'Anna', 'Schmidt', 'DE'),
(3, 4, 'ORD-2024-00003', 'processing', 59.99, 59.99, 0, 0, 'paid', 'credit_card', 'john.doe@example.com', 'John', 'Doe', 'US'),
(4, 5, 'ORD-2024-00004', 'pending', 99.99, 99.99, 0, 0, 'unpaid', 'bank_transfer', 'maria.garcia@example.com', 'Maria', 'Garcia', 'DE');

-- Sample Order Items
INSERT OR IGNORE INTO order_items (order_id, product_id, product_name, product_sku, quantity, unit_price, tax_rate, tax_amount, total) VALUES
(1, 1, 'Microsoft Office 2021 Professional Plus', 'MS-OFF-2021-PRO', 1, 79.99, 19.00, 12.79, 79.99),
(2, 3, 'Windows 11 Professional', 'WIN-11-PRO', 1, 149.99, 19.00, 23.98, 149.99),
(3, 6, 'Adobe Creative Cloud All Apps', 'ADOBE-CC-ALL', 1, 59.99, 19.00, 9.60, 59.99),
(4, 4, 'Windows 10 Home', 'WIN-10-HOME', 1, 99.99, 19.00, 15.99, 99.99);

-- Note: License table will be created separately
