-- Add more diverse products with better images
-- Clean up first
DELETE FROM products WHERE id > 3;

-- Windows Products
INSERT INTO products (id, sku, category_id, brand_id, slug, base_price, discount_price, discount_percentage, is_featured, is_new, is_bestseller, is_active, rating_average, rating_count, review_count, created_at) VALUES
(4, 'WIN10-PRO', 1, 1, 'windows-10-pro', 139.99, 79.99, 43, 1, 0, 1, 1, 4.7, 234, 234, datetime('now', '-30 days')),
(5, 'WIN10-HOME', 1, 1, 'windows-10-home', 119.99, 59.99, 50, 1, 0, 1, 1, 4.6, 189, 189, datetime('now', '-25 days')),
(6, 'WIN-SERVER-2022', 1, 1, 'windows-server-2022-standard', 899.99, 699.99, 22, 0, 1, 0, 1, 4.9, 45, 45, datetime('now', '-5 days'));

-- Office Products
INSERT INTO products (sku, category_id, brand_id, slug, base_price, discount_price, discount_percentage, is_featured, is_new, is_bestseller, is_active, rating_average, rating_count, review_count, created_at) VALUES
('OFF2021-PROF', 2, 1, 'microsoft-office-2021-professional', 249.99, 159.99, 36, 1, 0, 1, 1, 4.8, 312, 312, datetime('now', '-40 days')),
('OFF2021-HOME', 2, 1, 'microsoft-office-2021-home-student', 99.99, 69.99, 30, 1, 0, 1, 1, 4.7, 456, 456, datetime('now', '-35 days')),
('OFF365-PERS', 2, 1, 'microsoft-365-personal-1-year', 69.99, 49.99, 29, 1, 1, 1, 1, 4.9, 678, 678, datetime('now', '-3 days')),
('OFF365-FAM', 2, 1, 'microsoft-365-family-1-year', 99.99, 79.99, 20, 1, 1, 1, 1, 4.8, 523, 523, datetime('now', '-2 days'));

-- Antivirus Products
INSERT INTO products (sku, category_id, brand_id, slug, base_price, discount_price, discount_percentage, is_featured, is_new, is_bestseller, is_active, rating_average, rating_count, review_count, created_at) VALUES
('NORTON-360-DEL', 3, 3, 'norton-360-deluxe-5-devices', 89.99, 44.99, 50, 1, 0, 1, 1, 4.7, 234, 234, datetime('now', '-45 days')),
('BITDEF-TOTAL', 3, 2, 'bitdefender-total-security-5-devices', 79.99, 39.99, 50, 1, 0, 1, 1, 4.8, 189, 189, datetime('now', '-38 days')),
('KASP-INTERNET', 3, 3, 'kaspersky-internet-security-3-devices', 59.99, 34.99, 42, 1, 0, 1, 1, 4.6, 156, 156, datetime('now', '-33 days')),
('ESET-SMART', 3, 2, 'eset-smart-security-premium', 69.99, 44.99, 36, 0, 1, 0, 1, 4.7, 98, 98, datetime('now', '-7 days'));

-- Adobe & Design Products
INSERT INTO products (sku, category_id, brand_id, slug, base_price, discount_price, discount_percentage, is_featured, is_new, is_bestseller, is_active, rating_average, rating_count, review_count, created_at) VALUES
('ADOBE-CC-ALL', 4, 2, 'adobe-creative-cloud-all-apps', 599.99, 499.99, 17, 0, 1, 0, 1, 4.9, 234, 234, datetime('now', '-4 days')),
('ADOBE-PHOTO', 4, 2, 'adobe-photoshop-annual', 299.99, 239.99, 20, 1, 0, 1, 1, 4.9, 567, 567, datetime('now', '-50 days')),
('ADOBE-ILLUS', 4, 2, 'adobe-illustrator-annual', 299.99, 239.99, 20, 0, 0, 0, 1, 4.8, 345, 345, datetime('now', '-48 days')),
('COREL-DRAW', 4, 2, 'coreldraw-graphics-suite-2024', 549.99, 399.99, 27, 0, 1, 0, 1, 4.7, 123, 123, datetime('now', '-6 days'));

-- Product Translations (German)
INSERT INTO product_translations (product_id, language, name, short_description, long_description, features, meta_title, meta_description, meta_keywords) VALUES
-- Windows 10 Pro
(4, 'de', 'Windows 10 Pro', 'Professionelles Betriebssystem für Business', 
'Windows 10 Pro bietet erweiterte Funktionen für Unternehmen und professionelle Anwender. Mit BitLocker-Verschlüsselung, Remotedesktop und Domänenbeitritt ideal für Business-Umgebungen.',
'["BitLocker Verschlüsselung", "Remote Desktop", "Domänenbeitritt", "Hyper-V", "Windows Update for Business", "Assigned Access"]',
'Windows 10 Pro Lizenz kaufen - Original Microsoft', 
'Windows 10 Pro Vollversion günstig kaufen. Sofortiger Download, lebenslange Lizenz, deutscher Support.',
'Windows 10 Pro, Windows Lizenz, Microsoft, Betriebssystem'),

-- Windows 10 Home
(5, 'de', 'Windows 10 Home', 'Das beliebte Betriebssystem für zuhause', 
'Windows 10 Home ist perfekt für Heimanwender. Mit Cortana, Microsoft Edge und Windows Hello bietet es alle Funktionen für den täglichen Gebrauch.',
'["Cortana Sprachassistent", "Microsoft Edge Browser", "Windows Hello", "Virtueller Desktop", "Gaming Features", "OneDrive Integration"]',
'Windows 10 Home Lizenz - Günstig & Original',
'Windows 10 Home günstig kaufen. Sofortiger Download, aktivierbar in wenigen Minuten.',
'Windows 10 Home, Windows, Microsoft, Home Lizenz'),

-- Windows Server 2022
(6, 'de', 'Windows Server 2022 Standard', 'Leistungsstarker Server für Unternehmen',
'Windows Server 2022 Standard bietet erweiterte Sicherheitsfunktionen und Hybrid-Cloud-Integration. Perfekt für mittelständische Unternehmen.',
'["Erweiterte Sicherheit", "Hybrid Cloud", "Container Support", "Storage Migration Service", "Windows Admin Center", "Azure Arc Integration"]',
'Windows Server 2022 Standard Lizenz kaufen',
'Windows Server 2022 Standard günstig kaufen. Sofortige Lieferung, Original Microsoft Lizenz.',
'Windows Server 2022, Server Lizenz, Microsoft Server'),

-- Office 2021 Professional
(7, 'de', 'Microsoft Office 2021 Professional', 'Komplette Office-Suite für Profis',
'Office 2021 Professional beinhaltet Word, Excel, PowerPoint, Outlook, Publisher, Access und Teams. Einmalige Zahlung, keine Abo-Gebühren.',
'["Word", "Excel", "PowerPoint", "Outlook", "Publisher", "Access", "Teams", "OneNote", "Einmalkauf ohne Abo"]',
'Office 2021 Professional Plus Lizenz kaufen',
'Microsoft Office 2021 Professional Plus günstig kaufen. Lifetime Lizenz, alle Programme inklusive.',
'Office 2021, Microsoft Office, Professional Plus'),

-- Office 2021 Home & Student
(8, 'de', 'Microsoft Office 2021 Home & Student', 'Office für Privatanwender und Studenten',
'Office 2021 Home & Student mit Word, Excel und PowerPoint. Ideal für Privatanwender, Schüler und Studenten.',
'["Word", "Excel", "PowerPoint", "OneNote", "Für 1 PC", "Einmalkauf", "Keine Abo-Gebühren"]',
'Office 2021 Home & Student günstig kaufen',
'Microsoft Office 2021 Home & Student Lizenz. Perfekt für Studenten und Privatanwender.',
'Office 2021, Home Student, Microsoft Office'),

-- Microsoft 365 Personal
(9, 'de', 'Microsoft 365 Personal (1 Jahr)', 'Cloud Office mit 1 TB OneDrive',
'Microsoft 365 Personal Jahresabo mit Word, Excel, PowerPoint, Outlook und 1 TB OneDrive Cloud-Speicher.',
'["Alle Office Apps", "1 TB OneDrive", "Premium Support", "Monatliche Updates", "Für 1 Nutzer", "Mobile Apps inklusive"]',
'Microsoft 365 Personal Jahresabo kaufen',
'Microsoft 365 Personal 1 Jahr Abonnement günstig kaufen. Cloud Office mit 1 TB Speicher.',
'Microsoft 365, Office 365, Personal, Cloud Office'),

-- Microsoft 365 Family
(10, 'de', 'Microsoft 365 Family (1 Jahr)', 'Office für bis zu 6 Personen',
'Microsoft 365 Family für bis zu 6 Personen. Jeder erhält 1 TB OneDrive und alle Premium Office-Apps.',
'["Für 6 Nutzer", "6 x 1 TB OneDrive", "Alle Office Apps", "Premium Support", "Familie teilen", "Geräteübergreifend"]',
'Microsoft 365 Family Jahresabo - Für 6 Personen',
'Microsoft 365 Family 1 Jahr günstig kaufen. Office für die ganze Familie mit 6 TB Cloud-Speicher.',
'Microsoft 365 Family, Office Familie, Cloud Office'),

-- Norton 360 Deluxe
(11, 'de', 'Norton 360 Deluxe (5 Geräte)', 'Umfassender Schutz für 5 Geräte',
'Norton 360 Deluxe schützt bis zu 5 PCs, Macs, Smartphones oder Tablets. Mit VPN, Passwort-Manager und 50 GB Cloud-Backup.',
'["Für 5 Geräte", "VPN inklusive", "Passwort-Manager", "50 GB Cloud Backup", "Dark Web Monitoring", "Kindersicherung"]',
'Norton 360 Deluxe Lizenz kaufen - 5 Geräte',
'Norton 360 Deluxe günstig kaufen. Bester Schutz für 5 Geräte mit VPN und Cloud-Backup.',
'Norton 360, Antivirus, Norton Security'),

-- Bitdefender Total Security
(12, 'de', 'Bitdefender Total Security (5 Geräte)', 'Preisgekrönter Rundum-Schutz',
'Bitdefender Total Security - mehrfach ausgezeichnet. Schützt bis zu 5 Windows, Mac, Android oder iOS Geräte.',
'["Multi-Plattform", "Anti-Ransomware", "VPN (200 MB/Tag)", "Kindersicherung", "Passwort-Manager", "Datenschutz"]',
'Bitdefender Total Security kaufen - 5 Geräte',
'Bitdefender Total Security günstig kaufen. Testsieger mit bestem Virenschutz.',
'Bitdefender, Total Security, Antivirus'),

-- Kaspersky Internet Security
(13, 'de', 'Kaspersky Internet Security (3 Geräte)', 'Zuverlässiger Internet-Schutz',
'Kaspersky Internet Security schützt 3 Geräte vor Viren, Ransomware und Phishing-Angriffen. Mit sicherer Zahlung im Internet.',
'["Für 3 Geräte", "Ransomware Schutz", "Sicheres Online-Banking", "Kindersicherung", "Datenschutz", "Webcam-Schutz"]',
'Kaspersky Internet Security Lizenz kaufen',
'Kaspersky Internet Security günstig kaufen. Zuverlässiger Schutz für 3 Geräte.',
'Kaspersky, Internet Security, Virenschutz'),

-- ESET Smart Security Premium
(14, 'de', 'ESET Smart Security Premium', 'Premium Sicherheitslösung',
'ESET Smart Security Premium mit Passwort-Manager und Verschlüsselung. Mehrfach ausgezeichneter Schutz.',
'["Passwort-Manager", "Datenverschlüsselung", "Anti-Theft", "Sicheres Online-Banking", "Kindersicherung", "UEFI Scanner"]',
'ESET Smart Security Premium kaufen',
'ESET Smart Security Premium günstig kaufen. Premium Schutz mit Extras.',
'ESET, Smart Security, Premium Antivirus'),

-- Adobe Creative Cloud All Apps
(15, 'de', 'Adobe Creative Cloud All Apps', 'Über 20 Kreativ-Apps inklusive',
'Adobe Creative Cloud All Apps beinhaltet Photoshop, Illustrator, InDesign, Premiere Pro, After Effects und über 15 weitere Apps.',
'["20+ Desktop Apps", "Mobile Apps", "100 GB Cloud-Speicher", "Adobe Fonts", "Adobe Portfolio", "Adobe Spark"]',
'Adobe Creative Cloud All Apps Abo kaufen',
'Adobe Creative Cloud All Apps Jahresabo günstig kaufen. Alle Adobe Programme.',
'Adobe CC, Creative Cloud, Adobe Abo'),

-- Adobe Photoshop
(16, 'de', 'Adobe Photoshop (Jahresabo)', 'Die weltweit führende Bildbearbeitungssoftware',
'Adobe Photoshop Jahresabo mit allen Updates und 100 GB Cloud-Speicher. Professionelle Bildbearbeitung.',
'["Professionelle Bildbearbeitung", "KI-gestützte Tools", "100 GB Cloud", "Mobile Apps", "Adobe Fonts", "Regelmäßige Updates"]',
'Adobe Photoshop Jahresabo kaufen',
'Adobe Photoshop Jahresabo günstig kaufen. Professionelle Bildbearbeitung.',
'Adobe Photoshop, Bildbearbeitung, Adobe Abo'),

-- Adobe Illustrator
(17, 'de', 'Adobe Illustrator (Jahresabo)', 'Vektorgrafik und Illustration',
'Adobe Illustrator für professionelle Vektorgrafiken und Illustrationen. Jahresabo mit allen Funktionen.',
'["Vektorgrafiken", "Logo Design", "100 GB Cloud", "Mobile Apps", "Adobe Fonts", "Illustrationen erstellen"]',
'Adobe Illustrator Jahresabo kaufen',
'Adobe Illustrator Jahresabo günstig kaufen. Professionelles Vektordesign.',
'Adobe Illustrator, Vektorgrafik, Design Software'),

-- CorelDRAW
(18, 'de', 'CorelDRAW Graphics Suite 2024', 'Professionelle Grafikdesign-Software',
'CorelDRAW Graphics Suite 2024 mit CorelDRAW, Corel PHOTO-PAINT und weiteren Tools. Einmalkauf ohne Abo.',
'["CorelDRAW", "Corel PHOTO-PAINT", "PowerTRACE", "Font Manager", "Keine Abo-Gebühren", "Windows & Mac"]',
'CorelDRAW Graphics Suite 2024 kaufen',
'CorelDRAW Graphics Suite 2024 günstig kaufen. Professionelles Grafikdesign ohne Abo.',
'CorelDRAW, Grafikdesign, Design Software');

-- Product Images with better placeholder images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
-- Windows 10 Pro
(4, 'https://via.placeholder.com/600x400/0078D4/FFFFFF?text=Windows+10+Pro', 'Windows 10 Pro', 1, 1),
(4, 'https://via.placeholder.com/600x400/0078D4/FFFFFF?text=Windows+10+Desktop', 'Windows 10 Desktop', 2, 0),

-- Windows 10 Home
(5, 'https://via.placeholder.com/600x400/0078D4/FFFFFF?text=Windows+10+Home', 'Windows 10 Home', 1, 1),

-- Windows Server 2022
(6, 'https://via.placeholder.com/600x400/0078D4/FFFFFF?text=Windows+Server+2022', 'Windows Server 2022', 1, 1),

-- Office 2021 Professional
(7, 'https://via.placeholder.com/600x400/D83B01/FFFFFF?text=Office+2021+Pro', 'Office 2021 Professional', 1, 1),

-- Office 2021 Home & Student
(8, 'https://via.placeholder.com/600x400/D83B01/FFFFFF?text=Office+2021+Home', 'Office 2021 Home & Student', 1, 1),

-- Microsoft 365 Personal
(9, 'https://via.placeholder.com/600x400/0364B8/FFFFFF?text=Microsoft+365+Personal', 'Microsoft 365 Personal', 1, 1),

-- Microsoft 365 Family
(10, 'https://via.placeholder.com/600x400/0364B8/FFFFFF?text=Microsoft+365+Family', 'Microsoft 365 Family', 1, 1),

-- Norton 360 Deluxe
(11, 'https://via.placeholder.com/600x400/FFCC00/000000?text=Norton+360+Deluxe', 'Norton 360 Deluxe', 1, 1),

-- Bitdefender Total Security
(12, 'https://via.placeholder.com/600x400/EC1C24/FFFFFF?text=Bitdefender+Total', 'Bitdefender Total Security', 1, 1),

-- Kaspersky Internet Security
(13, 'https://via.placeholder.com/600x400/00A88E/FFFFFF?text=Kaspersky+Internet', 'Kaspersky Internet Security', 1, 1),

-- ESET Smart Security
(14, 'https://via.placeholder.com/600x400/009BDF/FFFFFF?text=ESET+Smart+Security', 'ESET Smart Security Premium', 1, 1),

-- Adobe Creative Cloud
(15, 'https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Adobe+Creative+Cloud', 'Adobe Creative Cloud All Apps', 1, 1),

-- Adobe Photoshop
(16, 'https://via.placeholder.com/600x400/31A8FF/FFFFFF?text=Adobe+Photoshop', 'Adobe Photoshop', 1, 1),

-- Adobe Illustrator
(17, 'https://via.placeholder.com/600x400/FF9A00/FFFFFF?text=Adobe+Illustrator', 'Adobe Illustrator', 1, 1),

-- CorelDRAW
(18, 'https://via.placeholder.com/600x400/00A4E4/FFFFFF?text=CorelDRAW+2024', 'CorelDRAW Graphics Suite 2024', 1, 1);
