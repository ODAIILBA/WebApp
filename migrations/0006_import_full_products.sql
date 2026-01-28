-- ============================================
-- FULL PRODUCT IMPORT WITH DESCRIPTIONS & IMAGES
-- SoftwareKing24 - Complete Product Database
-- ============================================

-- First, clear any existing test data
DELETE FROM product_images;
DELETE FROM product_translations;
DELETE FROM product_faqs;
DELETE FROM license_keys;
DELETE FROM products;
DELETE FROM category_translations;
DELETE FROM categories;
DELETE FROM brands;

-- ============================================
-- BRANDS
-- ============================================

INSERT INTO brands (id, name, slug, logo_url, is_featured, sort_order) VALUES
(1, 'Microsoft', 'microsoft', '/static/brands/microsoft.png', 1, 1),
(2, 'Adobe', 'adobe', '/static/brands/adobe.png', 1, 2),
(3, 'Autodesk', 'autodesk', '/static/brands/autodesk.png', 1, 3),
(4, 'Kaspersky', 'kaspersky', '/static/brands/kaspersky.png', 1, 4),
(5, 'Norton', 'norton', '/static/brands/norton.png', 1, 5),
(6, 'Bitdefender', 'bitdefender', '/static/brands/bitdefender.png', 1, 6),
(7, 'Valve', 'valve', '/static/brands/valve.png', 0, 7),
(8, 'Epic Games', 'epic-games', '/static/brands/epic.png', 0, 8);

-- ============================================
-- CATEGORIES
-- ============================================

INSERT INTO categories (id, parent_id, slug, icon, sort_order, is_active) VALUES
(1, NULL, 'windows', 'fab fa-windows', 1, 1),
(2, NULL, 'microsoft-office', 'fas fa-file-word', 2, 1),
(3, NULL, 'server', 'fas fa-server', 3, 1),
(4, NULL, 'antivirus', 'fas fa-shield-alt', 4, 1),
(5, NULL, 'adobe-creative', 'fas fa-palette', 5, 1),
(6, NULL, 'cad-software', 'fas fa-drafting-compass', 6, 1),
(7, NULL, 'games', 'fas fa-gamepad', 7, 1);

-- Category Translations (German)
INSERT INTO category_translations (category_id, language, name, description, meta_title, meta_description) VALUES
-- Windows
(1, 'de', 'Windows', 'Originale Windows Betriebssysteme - Windows 11, Windows 10, Windows Server. Sofort verfügbar, 100% legal.', 
'Windows Lizenzen kaufen - Original & Günstig | SoftwareKing24',
'Kaufen Sie originale Windows Lizenzen zu Top-Preisen. Windows 11 Pro, Home, Windows 10, Windows Server. Sofortiger Download, lebenslange Nutzung.'),

-- Microsoft Office
(2, 'de', 'Microsoft Office', 'Microsoft Office Lizenzen - Office 2024, Office 2021, Office 2019, Microsoft 365. Word, Excel, PowerPoint und mehr.',
'Microsoft Office kaufen - Office 2024, 2021, 365 | SoftwareKing24',
'Microsoft Office Vollversionen kaufen. Office 2024 Professional Plus, Office 2021, Office 2019. Sofortiger Download, lebenslange Lizenz.'),

-- Server & CAL
(3, 'de', 'Server & CAL', 'Windows Server Lizenzen und CAL (Client Access License). SQL Server, Exchange Server, Remote Desktop Services.',
'Windows Server Lizenzen & CAL kaufen | SoftwareKing24',
'Windows Server 2025, 2022, 2019 Lizenzen. SQL Server, Exchange Server, RDS CAL. Für Unternehmen und professionelle Anwendungen.'),

-- Antivirus
(4, 'de', 'Antivirus & Sicherheit', 'Antivirus-Software für maximalen Schutz. Kaspersky, Norton, Bitdefender, ESET. Schützen Sie Ihren PC vor Viren und Malware.',
'Antivirus Software kaufen - Kaspersky, Norton, Bitdefender',
'Premium Antivirus-Software zu günstigen Preisen. Kaspersky Total Security, Norton 360, Bitdefender. Sicherer Schutz für Windows und Mac.'),

-- Adobe Creative
(5, 'de', 'Adobe & Kreativsoftware', 'Adobe Creative Cloud, Photoshop, Illustrator, InDesign. Professionelle Software für Designer und Kreative.',
'Adobe Creative Cloud & Photoshop kaufen | SoftwareKing24',
'Adobe Lizenzen zu Top-Preisen. Creative Cloud All Apps, Photoshop, Illustrator, InDesign, Premiere Pro. Sofort einsatzbereit.'),

-- CAD Software
(6, 'de', 'CAD & Engineering', 'CAD-Software für Profis. AutoCAD, Revit, Civil 3D, SketchUp. Für Architekten, Ingenieure und Designer.',
'AutoCAD & CAD Software kaufen | SoftwareKing24',
'Professionelle CAD-Software. AutoCAD 2024, Revit, Civil 3D, SketchUp Pro. Für Architektur, Ingenieurwesen und Design.'),

-- Games
(7, 'de', 'Spiele & Gaming', 'Game Keys für PC. Steam Keys, Origin Keys, Epic Games. Die besten Spiele zum besten Preis.',
'PC Spiele Keys kaufen - Steam, Origin, Epic Games',
'Günstige Game Keys für PC. Steam Games, EA Origin, Epic Games Store. Sofortige Lieferung per E-Mail.');

-- ============================================
-- PRODUCTS - WINDOWS
-- ============================================

INSERT INTO products (id, sku, category_id, brand_id, slug, product_type, base_price, discount_price, discount_percentage, 
  vat_rate, stock_type, available_licenses, license_type, license_duration, delivery_type, 
  compatibility, activation_limit, is_featured, is_new, is_bestseller, is_active) VALUES
-- Windows 11
(1, 'WIN11-PRO-001', 1, 1, 'windows-11-professional', 'license', 29.99, 19.99, 33, 
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows 11"]', 1, 1, 1, 1, 1),

(2, 'WIN11-HOME-001', 1, 1, 'windows-11-home', 'license', 19.99, NULL, 0,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows 11"]', 1, 1, 1, 0, 1),

(3, 'WIN11-ENT-001', 1, 1, 'windows-11-enterprise', 'license', 59.99, 49.99, 17,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows 11"]', 1, 0, 0, 0, 1),

-- Windows 10
(4, 'WIN10-PRO-001', 1, 1, 'windows-10-professional', 'license', 24.99, 17.99, 28,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows 10"]', 1, 1, 0, 1, 1),

(5, 'WIN10-HOME-001', 1, 1, 'windows-10-home', 'license', 14.99, NULL, 0,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows 10"]', 1, 0, 0, 0, 1),

-- Windows Server
(6, 'WINSVR2025-STD', 3, 1, 'windows-server-2025-standard', 'license', 599.99, 499.99, 17,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows Server 2025"]', 2, 1, 1, 0, 1),

(7, 'WINSVR2022-STD', 3, 1, 'windows-server-2022-standard', 'license', 499.99, 399.99, 20,
  19.00, 'unlimited', 999, 'perpetual', 'lifetime', 'instant',
  '["Windows Server 2022"]', 2, 0, 0, 0, 1);

-- ============================================
-- PRODUCT TRANSLATIONS - WINDOWS (German)
-- ============================================

INSERT INTO product_translations (product_id, language, name, short_description, long_description, features, meta_title, meta_description) VALUES
-- Windows 11 Professional
(1, 'de', 'Windows 11 Professional', 
  'Das leistungsstarke Betriebssystem für Profis und Unternehmen. Mit erweiterten Funktionen für Produktivität und Sicherheit.',
  '<h2>Windows 11 Professional - Maximale Leistung für Ihr Business</h2>
<p>Windows 11 Professional ist das ideale Betriebssystem für professionelle Anwender, kleine und mittelständische Unternehmen. Mit erweiterten Sicherheitsfunktionen, Remote-Desktop, BitLocker-Verschlüsselung und Hyper-V bietet Windows 11 Pro alles, was Sie für ein produktives Arbeitsumfeld benötigen.</p>

<h3>Hauptmerkmale von Windows 11 Pro</h3>
<ul>
<li><strong>Moderne Benutzeroberfläche:</strong> Neu gestaltetes Startmenü, abgerundete Ecken und Snap Layouts für besseres Multitasking</li>
<li><strong>Verbesserte Leistung:</strong> Schnellerer Start, optimierte Ressourcenverwaltung und DirectX 12 Ultimate</li>
<li><strong>Höchste Sicherheit:</strong> BitLocker, Windows Hello, Microsoft Defender und TPM 2.0-Unterstützung</li>
<li><strong>Business-Funktionen:</strong> Remote Desktop, Gruppenrichtlinien, Hyper-V-Virtualisierung</li>
<li><strong>Microsoft Teams:</strong> Integriert für nahtlose Kommunikation</li>
</ul>

<h3>Was ist im Lieferumfang enthalten?</h3>
<ul>
<li>Originaler Windows 11 Professional Product Key</li>
<li>Lebenslange Lizenz - keine Abonnementgebühren</li>
<li>Sofortiger Download-Link für Windows 11</li>
<li>Deutschsprachige Installationsanleitung</li>
<li>Kostenloser E-Mail-Support</li>
</ul>

<h3>Systemanforderungen</h3>
<ul>
<li>Prozessor: 1 GHz oder schneller mit mindestens 2 Kernen (64-Bit)</li>
<li>RAM: 4 GB oder mehr</li>
<li>Speicher: 64 GB oder mehr</li>
<li>Firmware: UEFI, Secure Boot-fähig</li>
<li>TPM: Version 2.0</li>
<li>Grafikkarte: DirectX 12 kompatibel</li>
<li>Display: HD (720p), mindestens 9 Zoll diagonal</li>
</ul>',
  '["BitLocker-Verschlüsselung", "Remote Desktop", "Hyper-V-Virtualisierung", "Gruppenrichtlinien", "Windows Hello", "Microsoft Defender", "DirectX 12 Ultimate", "Snap Layouts", "Microsoft Teams integriert", "TPM 2.0-Unterstützung"]',
  'Windows 11 Professional kaufen - Original Lizenz Key günstig',
  'Windows 11 Pro Original Key kaufen. Lebenslange Lizenz, sofortiger Download. Für Unternehmen und Profis. Inklusive BitLocker, Remote Desktop, Hyper-V. Nur €19,99!'),

-- Windows 11 Home
(2, 'de', 'Windows 11 Home',
  'Das moderne Betriebssystem für Zuhause. Perfekt für Privatanwender mit allen wichtigen Funktionen für Alltag und Freizeit.',
  '<h2>Windows 11 Home - Ihr persönliches Windows</h2>
<p>Windows 11 Home ist das perfekte Betriebssystem für Privatanwender. Mit einer modernen, intuitiven Benutzeroberfläche, verbesserten Gaming-Funktionen und nahtloser Integration von Microsoft-Diensten macht Windows 11 Home Ihren PC zum Mittelpunkt Ihres digitalen Lebens.</p>

<h3>Hauptmerkmale von Windows 11 Home</h3>
<ul>
<li><strong>Neu gestaltete Oberfläche:</strong> Zentral positioniertes Startmenü, neue Widgets und Snap Layouts</li>
<li><strong>Gaming-Features:</strong> DirectX 12 Ultimate, Auto HDR, DirectStorage für schnellere Ladezeiten</li>
<li><strong>Microsoft Teams:</strong> Für Video-Chats mit Familie und Freunden direkt integriert</li>
<li><strong>Microsoft Store:</strong> Zugriff auf tausende Apps, Spiele und Unterhaltung</li>
<li><strong>Sicherheit:</strong> Windows Defender, Windows Hello für biometrische Anmeldung</li>
</ul>

<h3>Lieferumfang</h3>
<ul>
<li>Originaler Windows 11 Home Product Key</li>
<li>Lebenslange Lizenz für 1 PC</li>
<li>Download-Link für ISO-Datei</li>
<li>Installation Guide auf Deutsch</li>
<li>E-Mail-Support</li>
</ul>',
  '["Modernes Startmenü", "Snap Layouts & Snap Groups", "Microsoft Teams", "DirectX 12 Ultimate", "Auto HDR", "Windows Defender", "Microsoft Store", "Touch & Stift-Unterstützung", "Widgets", "Windows Hello"]',
  'Windows 11 Home Original Key kaufen - Günstig & Legal',
  'Windows 11 Home Lizenz kaufen. Originaler Product Key, lebenslange Nutzung, sofortiger Download. Für Privatanwender. Jetzt nur €19,99!'),

-- Windows 11 Enterprise
(3, 'de', 'Windows 11 Enterprise',
  'Die umfassendste Windows-Version für große Unternehmen. Mit erweiterten Sicherheits- und Verwaltungsfunktionen.',
  '<h2>Windows 11 Enterprise - Für höchste Unternehmensanforderungen</h2>
<p>Windows 11 Enterprise bietet die umfassendsten Sicherheits-, Verwaltungs- und Bereitstellungsfunktionen für große Organisationen. Mit exklusiven Features wie Windows Defender Application Guard, Microsoft Application Virtualization (App-V) und DirectAccess.</p>

<h3>Enterprise-Funktionen</h3>
<ul>
<li><strong>Windows Defender Application Guard:</strong> Isolierung von nicht vertrauenswürdigen Websites</li>
<li><strong>Windows Defender Credential Guard:</strong> Schutz von Anmeldeinformationen</li>
<li><strong>AppLocker:</strong> Steuerung, welche Apps ausgeführt werden dürfen</li>
<li><strong>DirectAccess:</strong> Sichere Remoteverbindung ohne VPN</li>
<li><strong>Microsoft Application Virtualization (App-V):</strong> Virtualisierung von Anwendungen</li>
<li><strong>Windows To Go:</strong> Windows von USB-Stick starten</li>
</ul>',
  '["Windows Defender Application Guard", "Credential Guard", "AppLocker", "DirectAccess", "App-V", "Windows To Go", "Long Term Servicing Channel", "Erweiterte Gruppenrichtlinien", "Microsoft Desktop Optimization Pack", "Windows Analytics"]',
  'Windows 11 Enterprise Lizenz kaufen - Volumen & einzeln',
  'Windows 11 Enterprise Key kaufen für Unternehmen. Erweiterte Sicherheit und Verwaltung. Volume Licensing verfügbar. Ab €49,99!'),

-- Windows 10 Professional
(4, 'de', 'Windows 10 Professional',
  'Bewährtes und stabiles Betriebssystem für Business-Anwendungen. Mit allen professionellen Features.',
  '<h2>Windows 10 Professional - Zuverlässig und bewährt</h2>
<p>Windows 10 Professional bleibt die erste Wahl für viele Unternehmen und professionelle Anwender. Mit langjähriger Stabilität, umfangreicher Hardware-Unterstützung und allen Business-Funktionen ist Windows 10 Pro die sichere Wahl für produktives Arbeiten.</p>

<h3>Warum Windows 10 Pro?</h3>
<ul>
<li><strong>Bewährte Stabilität:</strong> Millionenfach im Einsatz, ausgereift und zuverlässig</li>
<li><strong>Breite Kompatibilität:</strong> Unterstützt ältere Hardware und Software</li>
<li><strong>Langzeit-Support:</strong> Sicherheitsupdates bis Oktober 2025</li>
<li><strong>Alle Pro-Funktionen:</strong> Remote Desktop, BitLocker, Hyper-V, Gruppenrichtlinien</li>
<li><strong>Kostengünstig:</strong> Günstiger als Windows 11 bei gleichen Hauptfunktionen</li>
</ul>

<h3>Lieferumfang</h3>
<ul>
<li>Windows 10 Professional Product Key</li>
<li>Lebenslange Lizenz</li>
<li>Download-Link (32-Bit & 64-Bit)</li>
<li>Aktivierungsanleitung</li>
<li>E-Mail-Support</li>
</ul>',
  '["BitLocker", "Remote Desktop", "Hyper-V", "Domänenbeitritt", "Gruppenrichtlinien", "Windows Update for Business", "Assigned Access", "Sicherer Start", "Device Guard", "Enterprise Mode IE"]',
  'Windows 10 Professional Key kaufen - Original & günstig',
  'Windows 10 Pro Lizenz kaufen. Originaler Key, lebenslang gültig. Mit BitLocker, Remote Desktop. Support bis 2025. Nur €17,99!');

-- ============================================
-- PRODUCT IMAGES - WINDOWS
-- ============================================

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
-- Windows 11 Pro
(1, '/static/products/windows11-pro-hero.jpg', 'Windows 11 Professional Box und Laptop', 0, 1),
(1, '/static/products/windows11-pro-desktop.jpg', 'Windows 11 Pro Desktop Ansicht', 1, 0),
(1, '/static/products/windows11-pro-features.jpg', 'Windows 11 Pro Features und Funktionen', 2, 0),

-- Windows 11 Home
(2, '/static/products/windows11-home-hero.jpg', 'Windows 11 Home Edition', 0, 1),
(2, '/static/products/windows11-home-desktop.jpg', 'Windows 11 Home Benutzeroberfläche', 1, 0),

-- Windows 11 Enterprise
(3, '/static/products/windows11-enterprise-hero.jpg', 'Windows 11 Enterprise für Unternehmen', 0, 1),

-- Windows 10 Pro
(4, '/static/products/windows10-pro-hero.jpg', 'Windows 10 Professional', 0, 1),
(4, '/static/products/windows10-pro-screen.jpg', 'Windows 10 Pro Screenshot', 1, 0);

-- ============================================
-- PRODUCT FAQs - WINDOWS (German)
-- ============================================

INSERT INTO product_faqs (product_id, language, question, answer, sort_order) VALUES
-- Windows 11 Pro FAQs
(1, 'de', 'Ist dies ein originaler Microsoft Product Key?',
  'Ja, absolut! Alle unsere Windows 11 Professional Keys sind original Microsoft Product Keys, die direkt von autorisierten Distributoren stammen. Sie erhalten einen vollständig legalen, lebenslang gültigen Aktivierungsschlüssel.', 0),
  
(1, 'de', 'Wie lange ist die Lizenz gültig?',
  'Die Windows 11 Professional Lizenz ist lebenslang gültig. Es handelt sich um eine Dauerlizenz ohne Ablaufdatum oder Abonnementgebühren. Sie können Windows 11 Pro so lange nutzen, wie Sie möchten.', 1),
  
(1, 'de', 'Auf wie vielen PCs kann ich den Key verwenden?',
  'Ein Windows 11 Professional Key kann auf einem (1) PC gleichzeitig aktiviert werden. Wenn Sie den PC wechseln, können Sie Windows deaktivieren und auf einem neuen Gerät aktivieren.', 2),
  
(1, 'de', 'Bekomme ich automatisch Updates?',
  'Ja! Nach der Aktivierung erhalten Sie automatisch alle Windows Updates, Sicherheitspatches und Feature-Updates von Microsoft, genau wie bei einer Retail-Version.', 3),
  
(1, 'de', 'Was ist der Unterschied zwischen Windows 11 Home und Pro?',
  'Windows 11 Professional bietet zusätzliche Business-Funktionen wie: BitLocker-Verschlüsselung, Remote Desktop Host, Hyper-V-Virtualisierung, Domänenbeitritt, Gruppenrichtlinien und Windows Update for Business. Home reicht für Privatanwender aus.', 4);

COMMIT;
