-- Seed data for SoftwareKing24 E-Commerce Platform
-- Compatible with existing database schema

-- Clear existing data
DELETE FROM products;
DELETE FROM categories;

-- Insert categories (with all required fields)
INSERT INTO categories (id, parent_id, name, slug, description, icon, sort_order, is_active) VALUES
(1, NULL, 'Security Software', 'security-software', 'Protect your devices from threats', 'fas fa-shield-alt', 1, 1),
(2, NULL, 'Office Software', 'office-software', 'Productivity tools for work', 'fas fa-briefcase', 2, 1),
(3, NULL, 'Operating Systems', 'operating-systems', 'Windows and other OS licenses', 'fas fa-desktop', 3, 1),
(4, NULL, 'Antivirus', 'antivirus', 'Comprehensive antivirus solutions', 'fas fa-virus-slash', 4, 1),
(5, NULL, 'Design Software', 'design-software', 'Creative tools for designers', 'fas fa-palette', 5, 1),
(6, NULL, 'Development Tools', 'development-tools', 'IDEs and developer software', 'fas fa-code', 6, 1);

-- Insert products (matching actual schema)
INSERT INTO products (
  name, slug, description, short_description, price, sale_price, 
  category, stock, sku, image_url, is_active, is_featured, 
  rating, review_count, sold_count, views
) VALUES
(
  'Microsoft Office 2021 Professional Plus',
  'microsoft-office-2021-pro',
  'Complete office suite with Word, Excel, PowerPoint, Outlook, and more. Lifetime license for 1 PC.',
  'Professional office suite with all essential applications',
  299.99,
  249.99,
  'Office Software',
  100,
  'MS-OFF-2021-PRO',
  'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800',
  1,
  1,
  4.8,
  256,
  1250,
  5600
),
(
  'Windows 11 Pro',
  'windows-11-pro',
  'Latest Windows operating system with enhanced security and productivity features. Digital license key.',
  'Most advanced Windows OS for professionals',
  199.99,
  179.99,
  'Operating Systems',
  150,
  'WIN-11-PRO',
  'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800',
  1,
  1,
  4.7,
  412,
  2300,
  8900
),
(
  'Norton 360 Deluxe',
  'norton-360-deluxe',
  'Complete protection for up to 5 devices. Includes VPN, password manager, and cloud backup.',
  'Award-winning antivirus and security suite',
  89.99,
  69.99,
  'Antivirus',
  200,
  'NORTON-360-DLX',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
  1,
  1,
  4.6,
  892,
  3400,
  12000
),
(
  'Adobe Creative Cloud All Apps',
  'adobe-creative-cloud',
  'Complete creative suite with Photoshop, Illustrator, Premiere Pro, and 20+ apps. 1-year subscription.',
  'Professional creative tools for designers',
  599.99,
  549.99,
  'Design Software',
  80,
  'ADOBE-CC-ALL',
  'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=800',
  1,
  1,
  4.9,
  1523,
  4200,
  15600
),
(
  'Kaspersky Total Security',
  'kaspersky-total-security',
  'Advanced protection for all devices. Anti-malware, VPN, parental controls, and privacy tools.',
  'Comprehensive security for families',
  79.99,
  59.99,
  'Security Software',
  120,
  'KASP-TOTAL-SEC',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
  1,
  1,
  4.7,
  678,
  2800,
  9500
),
(
  'Microsoft Visual Studio Professional 2022',
  'visual-studio-2022-pro',
  'Professional IDE for .NET and C++ developers. Includes advanced debugging and testing tools.',
  'Complete development environment',
  449.99,
  399.99,
  'Development Tools',
  60,
  'VS-2022-PRO',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
  1,
  1,
  4.8,
  234,
  890,
  3200
),
(
  'Windows 10 Professional',
  'windows-10-pro',
  'Reliable Windows OS for business. Includes BitLocker, Remote Desktop, and domain join.',
  'Proven professional operating system',
  149.99,
  129.99,
  'Operating Systems',
  180,
  'WIN-10-PRO',
  'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800',
  1,
  0,
  4.6,
  567,
  5600,
  18000
),
(
  'Bitdefender Internet Security',
  'bitdefender-internet-security',
  'Multi-layered protection against ransomware, phishing, and online threats. 3 devices.',
  'Top-rated internet security suite',
  69.99,
  49.99,
  'Security Software',
  140,
  'BITDEF-INT-SEC',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
  1,
  0,
  4.7,
  445,
  1900,
  6700
);

-- Reset auto-increment counters
DELETE FROM sqlite_sequence WHERE name IN ('products', 'categories');
INSERT INTO sqlite_sequence (name, seq) VALUES ('products', 8), ('categories', 6);
