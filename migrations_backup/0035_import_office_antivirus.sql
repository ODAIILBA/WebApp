-- ============================================
-- ADDITIONAL PRODUCTS - Office, Antivirus, Adobe, Games
-- Part 2 of Product Import
-- ============================================

-- ============================================
-- PRODUCTS - MICROSOFT OFFICE
-- ============================================

INSERT INTO products (id, sku, category_id, brand_id, slug, product_type, base_price, discount_price, discount_percentage, 
  vat_rate, stock_type, available_licenses, license_type, license_duration, delivery_type, 
  compatibility, activation_limit, is_featured, is_new, is_bestseller, is_active) VALUES

-- Office 2024
(10, 'OFF2024-PP-001', 2, 1, 'office-2024-professional-plus', 'license', 49.99, 39.99, 20,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows 11", "Windows 10"]', 2, 1, 1, 1, 1),

(11, 'OFF2024-HB-001', 2, 1, 'office-2024-home-business', 'license', 39.99, 29.99, 25,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows 11", "Windows 10", "macOS"]', 1, 1, 1, 1, 1),

-- Office 2021
(12, 'OFF2021-PP-001', 2, 1, 'office-2021-professional-plus', 'license', 44.99, 34.99, 22,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows 11", "Windows 10"]', 2, 1, 0, 1, 1),

(13, 'OFF2021-HS-001', 2, 1, 'office-2021-home-student', 'license', 24.99, NULL, 0,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows 11", "Windows 10", "macOS"]', 1, 0, 0, 0, 1),

-- Office 2019
(14, 'OFF2019-PP-001', 2, 1, 'office-2019-professional-plus', 'license', 39.99, 29.99, 25,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows 11", "Windows 10"]', 2, 0, 0, 1, 1),

-- Microsoft 365
(15, 'M365-FAM-001', 2, 1, 'microsoft-365-family', 'license', 79.99, 69.99, 13,
  19.00, 'unlimited', 999, 'subscription', '1-year', 'instant',
  '["Windows 11", "Windows 10", "macOS", "iOS", "Android"]', 6, 1, 0, 1, 1);

-- ============================================
-- PRODUCT TRANSLATIONS - MICROSOFT OFFICE
-- ============================================

INSERT INTO product_translations (product_id, language, name, short_description, long_description, features, meta_title, meta_description) VALUES

-- Office 2024 Professional Plus
(10, 'de', 'Office 2024 Professional Plus',
  'Die neueste Microsoft Office Suite mit Word, Excel, PowerPoint, Outlook, Access, Publisher und mehr. Perfekt für professionelle Anwendungen.',
  '<h2>Microsoft Office 2024 Professional Plus - Das Komplettpaket</h2>
<p>Office 2024 Professional Plus ist die umfassendste Version der Microsoft Office Suite. Mit allen klassischen Anwendungen plus erweiterten Business-Tools bietet diese Version alles, was Unternehmen und Power-User benötigen.</p>

<h3>Enthaltene Programme</h3>
<ul>
<li><strong>Word 2024:</strong> Professionelle Textverarbeitung</li>
<li><strong>Excel 2024:</strong> Tabellenkalkulation und Datenanalyse</li>
<li><strong>PowerPoint 2024:</strong> Präsentationssoftware</li>
<li><strong>Outlook 2024:</strong> E-Mail und Kalender</li>
<li><strong>Access 2024:</strong> Datenbankverwaltung</li>
<li><strong>Publisher 2024:</strong> Desktop-Publishing</li>
<li><strong>OneNote:</strong> Notizen und Organisation</li>
</ul>

<h3>Neue Funktionen in Office 2024</h3>
<ul>
<li>AI-gestützte Features mit Microsoft Copilot</li>
<li>Verbesserte Zusammenarbeit und Cloud-Integration</li>
<li>Neue Design-Templates und Themes</li>
<li>Erweiterte Datenanalyse in Excel</li>
<li>Bessere Performance und Stabilität</li>
</ul>

<h3>Lieferumfang</h3>
<ul>
<li>Office 2024 Professional Plus Product Key</li>
<li>Lebenslange Lizenz für 2 PCs</li>
<li>Download-Links für alle Programme</li>
<li>Deutsche Installationsanleitung</li>
<li>Kostenloser E-Mail-Support</li>
</ul>',
  '["Word 2024", "Excel 2024", "PowerPoint 2024", "Outlook 2024", "Access 2024", "Publisher 2024", "OneNote", "Microsoft Copilot", "OneDrive 1TB", "Lebenslange Lizenz"]',
  'Office 2024 Professional Plus kaufen - Vollversion',
  'Microsoft Office 2024 Professional Plus Key kaufen. Word, Excel, PowerPoint, Outlook, Access, Publisher. Lebenslange Lizenz. Nur €39,99!'),

-- Office 2024 Home & Business
(11, 'de', 'Office 2024 Home & Business',
  'Office für Zuhause und kleine Unternehmen. Mit Word, Excel, PowerPoint und Outlook. Für Windows und Mac.',
  '<h2>Office 2024 Home & Business - Für Privatanwender und KMU</h2>
<p>Office 2024 Home & Business bietet die perfekte Balance aus Funktionen für private und geschäftliche Nutzung. Mit den wichtigsten Office-Anwendungen und plattformübergreifender Kompatibilität.</p>

<h3>Enthaltene Anwendungen</h3>
<ul>
<li><strong>Word 2024:</strong> Textverarbeitung</li>
<li><strong>Excel 2024:</strong> Tabellenkalkulation</li>
<li><strong>PowerPoint 2024:</strong> Präsentationen</li>
<li><strong>Outlook 2024:</strong> E-Mail und Kalender</li>
<li><strong>OneNote:</strong> Notizen</li>
</ul>

<h3>Vorteile</h3>
<ul>
<li>Einmalige Zahlung - keine Abo-Gebühren</li>
<li>Für Windows und macOS</li>
<li>Kommerzielle Nutzung erlaubt</li>
<li>OneDrive 5GB inklusive</li>
<li>Regelmäßige Sicherheitsupdates</li>
</ul>',
  '["Word 2024", "Excel 2024", "PowerPoint 2024", "Outlook 2024", "OneNote", "Windows & Mac", "Kommerzielle Nutzung", "Lebenslange Lizenz", "OneDrive 5GB"]',
  'Office 2024 Home & Business kaufen - Windows & Mac',
  'Office 2024 Home & Business Key. Word, Excel, PowerPoint, Outlook. Für Windows und Mac. Kommerzielle Nutzung erlaubt. €29,99!'),

-- Office 2021 Professional Plus
(12, 'de', 'Office 2021 Professional Plus',
  'Bewährte Office Suite mit allen Profi-Tools. Word, Excel, PowerPoint, Outlook, Access, Publisher.',
  '<h2>Office 2021 Professional Plus - Bewährt und zuverlässig</h2>
<p>Office 2021 Professional Plus ist die perfekte Wahl für alle, die ein stabiles, ausgereiftes Office-Paket ohne Abonnement bevorzugen. Alle klassischen Features zu einem günstigen Preis.</p>

<h3>Vollständiges Paket</h3>
<p>Word, Excel, PowerPoint, Outlook, Access, Publisher, OneNote - alle Programme in einer Lizenz.</p>

<h3>Support bis 2026</h3>
<p>Microsoft unterstützt Office 2021 mit Sicherheitsupdates bis Oktober 2026.</p>',
  '["Word 2021", "Excel 2021", "PowerPoint 2021", "Outlook 2021", "Access 2021", "Publisher 2021", "Lebenslange Lizenz", "2 PC Aktivierungen", "Support bis 2026"]',
  'Office 2021 Professional Plus Key kaufen - Günstig',
  'Office 2021 Pro Plus Vollversion. Word, Excel, PowerPoint, Outlook, Access. Lebenslange Lizenz für 2 PCs. Nur €34,99!');

-- ============================================
-- PRODUCTS - ANTIVIRUS & SECURITY
-- ============================================

INSERT INTO products (id, sku, category_id, brand_id, slug, product_type, base_price, discount_price, discount_percentage, 
  vat_rate, stock_type, available_licenses, license_type, license_duration, delivery_type, 
  compatibility, activation_limit, is_featured, is_new, is_bestseller, is_active) VALUES

-- Kaspersky
(20, 'KAS-TS-2024-001', 4, 4, 'kaspersky-total-security-2024', 'license', 39.99, 29.99, 25,
  19.00, 'unlimited', 999, 'subscription', '1-year', 'instant',
  '["Windows 11", "Windows 10", "macOS", "Android", "iOS"]', 5, 1, 1, 1, 1),

(21, 'KAS-AV-2024-001', 4, 4, 'kaspersky-antivirus-2024', 'license', 24.99, 19.99, 20,
  19.00, 'unlimited', 999, 'subscription', '1-year', 'instant',
  '["Windows 11", "Windows 10"]', 3, 0, 0, 1, 1),

-- Norton
(22, 'NOR-360-DLX-001', 4, 5, 'norton-360-deluxe', 'license', 44.99, 34.99, 22,
  19.00, 'unlimited', 999, 'subscription', '1-year', 'instant',
  '["Windows 11", "Windows 10", "macOS", "Android", "iOS"]', 5, 1, 0, 1, 1),

-- Bitdefender
(23, 'BIT-TS-2024-001', 4, 6, 'bitdefender-total-security-2024', 'license', 39.99, 29.99, 25,
  19.00, 'unlimited', 999, 'subscription', '1-year', 'instant',
  '["Windows 11", "Windows 10", "macOS", "Android", "iOS"]', 5, 1, 1, 1, 1);

-- ============================================
-- PRODUCT TRANSLATIONS - ANTIVIRUS
-- ============================================

INSERT INTO product_translations (product_id, language, name, short_description, long_description, features, meta_title, meta_description) VALUES

-- Kaspersky Total Security
(20, 'de', 'Kaspersky Total Security 2024',
  'Umfassender Schutz für alle Ihre Geräte. Antivirus, Firewall, VPN, Passwort-Manager und mehr.',
  '<h2>Kaspersky Total Security 2024 - Rundum-Schutz</h2>
<p>Kaspersky Total Security bietet den umfassendsten Schutz für Ihre digitale Welt. Mit preisgekrönter Antivirus-Technologie, Firewall, VPN, Passwort-Manager und Kindersicherung sind Sie auf allen Geräten sicher.</p>

<h3>Hauptfunktionen</h3>
<ul>
<li><strong>Echtzeit-Schutz:</strong> Blockiert Viren, Malware, Ransomware und Spyware</li>
<li><strong>Secure VPN:</strong> Unbegrenzte Datenübertragung</li>
<li><strong>Passwort-Manager:</strong> Sichere Speicherung Ihrer Passwörter</li>
<li><strong>Firewall:</strong> Schutz vor Netzwerkangriffen</li>
<li><strong>Kindersicherung:</strong> Überwachen Sie die Online-Aktivitäten Ihrer Kinder</li>
<li><strong>Anti-Phishing:</strong> Schutz vor gefälschten Websites</li>
</ul>

<h3>Gerätekompatibilität</h3>
<p>Schützen Sie bis zu 5 Geräte: Windows, Mac, Android und iOS</p>',
  '["Echtzeit-Virenschutz", "Secure VPN Unbegrenzt", "Passwort-Manager", "Firewall", "Kindersicherung", "Anti-Phishing", "Safe Money", "Datei-Verschlüsselung", "5 Geräte", "1 Jahr Laufzeit"]',
  'Kaspersky Total Security 2024 kaufen - 5 Geräte',
  'Kaspersky Total Security 2024 Key für 5 Geräte. Mit VPN, Passwort-Manager, Kindersicherung. 1 Jahr Schutz. Nur €29,99!'),

-- Norton 360 Deluxe
(22, 'de', 'Norton 360 Deluxe',
  'Premium-Sicherheit von Norton. Antivirus, VPN, Dark Web Monitoring, 50GB Cloud-Backup.',
  '<h2>Norton 360 Deluxe - Premium-Sicherheit</h2>
<p>Norton 360 Deluxe bietet mehrschichtigen Schutz für Ihre Geräte und Online-Privatsphäre. Mit preisgekrönter Sicherheitstechnologie von einem der weltweit führenden Anbieter.</p>

<h3>Premium-Features</h3>
<ul>
<li><strong>Echtzeit-Schutz:</strong> Blockiert Online-Bedrohungen</li>
<li><strong>Secure VPN:</strong> Surfen Sie anonym</li>
<li><strong>Dark Web Monitoring:</strong> Überwacht Ihre persönlichen Daten</li>
<li><strong>50GB Cloud-Backup:</strong> Sichern Sie wichtige Dateien</li>
<li><strong>Passwort-Manager:</strong> Erstellen und speichern Sie sichere Passwörter</li>
<li><strong>Kindersicherung:</strong> Schützen Sie Ihre Kinder online</li>
</ul>',
  '["Norton Antivirus", "Secure VPN", "Dark Web Monitoring", "50GB Cloud Backup", "Passwort-Manager", "Kindersicherung", "SafeCam", "5 Geräte", "100% Virus Protection Promise"]',
  'Norton 360 Deluxe kaufen - 5 Geräte 1 Jahr',
  'Norton 360 Deluxe Key. Premium-Schutz für 5 Geräte. Mit VPN, Cloud-Backup, Dark Web Monitoring. Nur €34,99!'),

-- Bitdefender Total Security
(23, 'de', 'Bitdefender Total Security 2024',
  'Testsieger-Schutz für alle Plattformen. Leistungsstarker Antivirus ohne Systemverlangsamung.',
  '<h2>Bitdefender Total Security 2024 - Testsieger</h2>
<p>Bitdefender Total Security ist mehrfacher Testsieger und bietet preisgekrönten Schutz ohne Ihr System zu verlangsamen. Mit fortschrittlicher Bedrohungserkennung und umfangreichen Zusatzfunktionen.</p>

<h3>Ausgezeichneter Schutz</h3>
<ul>
<li><strong>Advanced Threat Defense:</strong> Verhaltensbasierte Erkennung</li>
<li><strong>Multi-Layer Ransomware Protection:</strong> Mehrschichtiger Schutz</li>
<li><strong>Firewall:</strong> Überwacht Netzwerkverbindungen</li>
<li><strong>Anti-Phishing:</strong> Blockiert gefährliche Websites</li>
<li><strong>VPN:</strong> 200MB/Tag oder unbegrenzt (Premium)</li>
<li><strong>Passwort-Manager:</strong> Unbegrenzte Geräte</li>
</ul>

<h3>Minimale Systemlast</h3>
<p>Bitdefender arbeitet im Hintergrund ohne Ihr System zu verlangsamen.</p>',
  '["Advanced Threat Defense", "Ransomware Protection", "Firewall", "Anti-Phishing", "VPN 200MB/Tag", "Passwort-Manager", "Parental Control", "5 Geräte", "Autopilot Modus", "Testsieger 2024"]',
  'Bitdefender Total Security 2024 - Testsieger kaufen',
  'Bitdefender Total Security 2024 Key. Mehrfacher Testsieger. Für 5 Geräte. Mit VPN, Passwort-Manager. Nur €29,99!');

-- ============================================
-- PRODUCT IMAGES - OFFICE
-- ============================================

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
-- Office 2024 Pro Plus
(10, '/static/products/office2024-pp-hero.jpg', 'Office 2024 Professional Plus', 0, 1),
(10, '/static/products/office2024-apps.jpg', 'Office 2024 Anwendungen', 1, 0),

-- Office 2024 Home & Business
(11, '/static/products/office2024-hb-hero.jpg', 'Office 2024 Home & Business', 0, 1),

-- Office 2021 Pro Plus
(12, '/static/products/office2021-pp-hero.jpg', 'Office 2021 Professional Plus', 0, 1),

-- Office 2021 Home & Student
(13, '/static/products/office2021-hs-hero.jpg', 'Office 2021 Home & Student', 0, 1),

-- Office 2019 Pro Plus
(14, '/static/products/office2019-pp-hero.jpg', 'Office 2019 Professional Plus', 0, 1),

-- Microsoft 365 Family
(15, '/static/products/m365-family-hero.jpg', 'Microsoft 365 Family', 0, 1);

-- ============================================
-- PRODUCT IMAGES - ANTIVIRUS
-- ============================================

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
-- Kaspersky
(20, '/static/products/kaspersky-ts-hero.jpg', 'Kaspersky Total Security 2024', 0, 1),
(21, '/static/products/kaspersky-av-hero.jpg', 'Kaspersky Antivirus 2024', 0, 1),

-- Norton
(22, '/static/products/norton360-deluxe-hero.jpg', 'Norton 360 Deluxe', 0, 1),

-- Bitdefender
(23, '/static/products/bitdefender-ts-hero.jpg', 'Bitdefender Total Security 2024', 0, 1);

COMMIT;
