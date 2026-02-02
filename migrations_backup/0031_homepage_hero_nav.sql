-- ============================================
-- DYNAMIC HERO AND NAVIGATION MANAGEMENT
-- ============================================

-- Homepage Hero Slider
CREATE TABLE IF NOT EXISTS homepage_hero_slides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    cta_text TEXT,
    cta_link TEXT,
    background_image TEXT,
    background_color TEXT DEFAULT '#001f3f',
    text_color TEXT DEFAULT '#ffffff',
    order_position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Navigation Menu Items (with Mega Menu support)
CREATE TABLE IF NOT EXISTS navigation_menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER, -- NULL for top-level, ID for submenu items
    title TEXT NOT NULL,
    url TEXT,
    icon TEXT, -- FontAwesome icon class
    category TEXT, -- For product category links
    order_position INTEGER DEFAULT 0,
    is_mega_menu BOOLEAN DEFAULT 0,
    mega_menu_columns INTEGER DEFAULT 4,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES navigation_menu(id) ON DELETE CASCADE
);

-- Mega Menu Featured Products (Topsellers in dropdown)
CREATE TABLE IF NOT EXISTS mega_menu_featured (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    menu_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    order_position INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES navigation_menu(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Trust Badges (Editable)
CREATE TABLE IF NOT EXISTS homepage_trust_badges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    icon TEXT NOT NULL, -- FontAwesome icon
    title TEXT NOT NULL,
    description TEXT,
    order_position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default hero slides (if table was just created)
INSERT OR IGNORE INTO homepage_hero_slides (id, title, description, cta_text, cta_link, background_color, order_position) VALUES
(1, 'Günstige Software Lizenzen kaufen – Original & Sofort verfügbar', 'Hochwertige Original-Lizenzen für Windows, Office, Server und Antivirus-Software. Sofortiger Download, lebenslanger Support, 100% legal und sicher.', 'Jetzt Software Kaufen', '/produkte', '#001f3f', 1),
(2, 'Windows 11 Pro zum Aktionspreis!', 'Sichern Sie sich jetzt Windows 11 Professional zu unschlagbaren Konditionen. Original-Lizenz, sofortiger Download, lebenslanger Support.', 'Mehr Details', '/produkte?category=Windows', '#0078D4', 2),
(3, 'Microsoft Office 2024 NEU!', 'Die neueste Version von Microsoft Office mit allen Premium-Features. Perfekt für Beruf, Studium und Privat.', 'Jetzt Kaufen', '/produkte?category=Office', '#D83B01', 3);

-- Insert default navigation menu
INSERT OR IGNORE INTO navigation_menu (id, parent_id, title, url, category, order_position, is_mega_menu, mega_menu_columns, is_active) VALUES
-- Top level items
(1, NULL, 'Windows Betriebssysteme', '/produkte?category=Windows', 'Windows', 1, 1, 4, 1),
(2, NULL, 'Microsoft Office', '/produkte?category=Office', 'Office', 2, 1, 4, 1),
(3, NULL, 'Server & CAL', '/produkte?category=Server', 'Server', 3, 0, 0, 1),
(4, NULL, 'Antivirus & Sicherheit', '/produkte?category=Antivirus', 'Antivirus', 4, 0, 0, 1),
(5, NULL, 'CAD & Design', '/produkte?category=CAD', 'CAD', 5, 0, 0, 1),
(6, NULL, 'Alle Produkte', '/produkte', NULL, 6, 0, 0, 1),
(7, NULL, 'Kontakt', '/kontakt', NULL, 7, 0, 0, 1),

-- Windows submenu items
(11, 1, 'Windows 11 Home', '/produkte?search=Windows 11 Home', 'Windows', 1, 0, 0, 1),
(12, 1, 'Windows 11 Pro', '/produkte?search=Windows 11 Pro', 'Windows', 2, 0, 0, 1),
(13, 1, 'Windows 11 Enterprise', '/produkte?search=Windows 11 Enterprise', 'Windows', 3, 0, 0, 1),
(14, 1, 'Windows 10 Home', '/produkte?search=Windows 10 Home', 'Windows', 4, 0, 0, 1),
(15, 1, 'Windows 10 Pro', '/produkte?search=Windows 10 Pro', 'Windows', 5, 0, 0, 1),
(16, 1, 'Windows Server 2025', '/produkte?search=Windows Server 2025', 'Server', 6, 0, 0, 1),
(17, 1, 'Windows Server 2022', '/produkte?search=Windows Server 2022', 'Server', 7, 0, 0, 1),

-- Office submenu items
(21, 2, 'Office 2024 Home & Student', '/produkte?search=Office 2024 Home', 'Office', 1, 0, 0, 1),
(22, 2, 'Office 2024 Professional', '/produkte?search=Office 2024 Professional', 'Office', 2, 0, 0, 1),
(23, 2, 'Office 2021 Home & Business', '/produkte?search=Office 2021 Business', 'Office', 3, 0, 0, 1),
(24, 2, 'Microsoft 365 Personal', '/produkte?search=Microsoft 365 Personal', 'Office', 4, 0, 0, 1),
(25, 2, 'Microsoft 365 Family', '/produkte?search=Microsoft 365 Family', 'Office', 5, 0, 0, 1),
(26, 2, 'Microsoft Visio', '/produkte?search=Visio', 'Office', 6, 0, 0, 1),
(27, 2, 'Microsoft Project', '/produkte?search=Project', 'Office', 7, 0, 0, 1);

-- Insert default trust badges
INSERT OR IGNORE INTO homepage_trust_badges (id, icon, title, description, order_position, is_active) VALUES
(1, 'fas fa-bolt', 'Blitzversand per E-Mail', 'Ihre Lizenz erhalten Sie innerhalb weniger Minuten direkt per E-Mail zugestellt.', 1, 1),
(2, 'fas fa-tools', 'Kostenlose Installation', 'Detaillierte Anleitungen und kostenloser Support bei der Einrichtung.', 2, 1),
(3, 'fas fa-shield-alt', '100% Original & Legal', 'Nur echte Software-Lizenzen direkt von autorisierten Partnern.', 3, 1);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_navigation_menu_parent ON navigation_menu(parent_id, order_position);
CREATE INDEX IF NOT EXISTS idx_navigation_menu_active ON navigation_menu(is_active, order_position);
CREATE INDEX IF NOT EXISTS idx_hero_slides_active ON homepage_hero_slides(is_active, order_position);
