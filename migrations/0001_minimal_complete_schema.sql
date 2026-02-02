-- SOFTWAREKING24 - Complete Minimal Schema
-- This migration creates all essential tables for the e-commerce platform

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT DEFAULT 'customer' CHECK(role IN ('customer', 'admin', 'staff')),
    is_active INTEGER DEFAULT 1,
    email_verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ============================================================================
-- PRODUCTS & CATALOG
-- ============================================================================

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    price REAL NOT NULL DEFAULT 0,
    sale_price REAL,
    cost_price REAL,
    category TEXT NOT NULL,
    stock INTEGER DEFAULT 0,
    sku TEXT UNIQUE,
    image_url TEXT,
    gallery_images TEXT, -- JSON array
    is_active INTEGER DEFAULT 1,
    is_featured INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    tags TEXT, -- JSON array
    rating REAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    sold_count INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- ============================================================================
-- ORDERS & CHECKOUT
-- ============================================================================

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    user_id INTEGER,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    address TEXT,
    city TEXT,
    postcode TEXT,
    country TEXT,
    phone TEXT,
    subtotal REAL NOT NULL DEFAULT 0,
    tax REAL DEFAULT 0,
    shipping REAL DEFAULT 0,
    discount REAL DEFAULT 0,
    total REAL NOT NULL DEFAULT 0,
    payment_method TEXT,
    payment_status TEXT DEFAULT 'pending' CHECK(payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    order_status TEXT DEFAULT 'pending' CHECK(order_status IN ('pending', 'processing', 'completed', 'cancelled')),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER,
    product_name TEXT NOT NULL,
    product_sku TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    price REAL NOT NULL,
    subtotal REAL NOT NULL,
    license_key TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- ============================================================================
-- CART
-- ============================================================================

CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    session_id TEXT,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_session_id ON cart(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_product_id ON cart(product_id);

-- ============================================================================
-- REVIEWS
-- ============================================================================

CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    user_id INTEGER,
    order_id INTEGER,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    is_verified INTEGER DEFAULT 0,
    is_approved INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON reviews(is_approved);

-- ============================================================================
-- ANALYTICS
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_url TEXT NOT NULL,
    user_id INTEGER,
    session_id TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_analytics_page_views_page_url ON analytics_page_views(page_url);
CREATE INDEX IF NOT EXISTS idx_analytics_page_views_created_at ON analytics_page_views(created_at);

CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    event_data TEXT, -- JSON
    user_id INTEGER,
    session_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

-- ============================================================================
-- CMS & CONTENT
-- ============================================================================

CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    template TEXT DEFAULT 'standard',
    meta_title TEXT,
    meta_description TEXT,
    is_published INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_is_published ON pages(is_published);

-- ============================================================================
-- SETTINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    type TEXT DEFAULT 'string',
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

-- ============================================================================
-- SEED INITIAL DATA
-- ============================================================================

-- Insert admin user (password: admin123 - CHANGE THIS!)
INSERT OR IGNORE INTO users (id, email, password_hash, first_name, last_name, role, is_active, email_verified) 
VALUES (1, 'admin@softwareking24.com', '$2a$10$rQZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9v', 'Admin', 'User', 'admin', 1, 1);

-- Insert sample products
INSERT OR IGNORE INTO products (id, name, slug, description, short_description, price, sale_price, category, stock, sku, image_url, is_active, is_featured) VALUES
(1, 'Windows 11 Pro', 'windows-11-pro', 'Vollversion - Lebenslang gültige Lizenz für Windows 11 Professional. Sofortiger Download nach Kauf.', 'Windows 11 Pro Vollversion - Lebenslang', 259.00, 89.99, 'pc-windows', 100, 'WIN11-PRO-001', '/static/products/windows-11-pro.jpg', 1, 1),
(2, 'Office 2021 Professional Plus', 'office-2021-pro', 'Microsoft Office 2021 Professional Plus - Word, Excel, PowerPoint, Outlook und mehr. Lebenslange Lizenz.', 'Office 2021 Pro Plus - Vollversion', 449.00, 149.99, 'office', 100, 'OFF2021-PRO-001', '/static/products/office-2021.jpg', 1, 1),
(3, 'Kaspersky Total Security', 'kaspersky-total', 'Kaspersky Total Security - Premium Antivirus-Schutz für bis zu 5 Geräte. 1 Jahr Laufzeit.', 'Kaspersky Total Security - 5 Geräte', 89.00, 39.99, 'antivirus', 100, 'KAS-TOTAL-001', '/static/products/kaspersky.jpg', 1, 1),
(4, 'Adobe Creative Cloud All Apps', 'adobe-creative', 'Adobe Creative Cloud - Alle Adobe Apps inklusive Photoshop, Illustrator, Premiere Pro. 1 Jahr Lizenz.', 'Adobe Creative Cloud - All Apps', 599.00, 239.99, 'development', 100, 'ADOBE-CC-001', '/static/products/adobe.jpg', 1, 1),
(5, 'Windows Server 2022 Standard', 'windows-server-2022', 'Windows Server 2022 Standard Edition - Perfekt für kleine bis mittlere Unternehmen.', 'Windows Server 2022 Standard', 999.00, 499.99, 'server', 50, 'WINSVR2022-STD', '/static/products/server-2022.jpg', 1, 1),
(6, 'Office 365 Business Premium', 'office-365-business', 'Microsoft 365 Business Premium - Cloud-basiert mit 1TB OneDrive. 1 Jahr Lizenz.', 'Office 365 Business Premium', 159.00, 89.99, 'office', 100, 'OFF365-BUS-001', '/static/products/office-365.jpg', 1, 1),
(7, 'Norton 360 Deluxe', 'norton-360', 'Norton 360 Deluxe - Kompletter Schutz für bis zu 5 Geräte. Inkl. VPN und Cloud-Backup.', 'Norton 360 Deluxe - 5 Geräte', 79.00, 34.99, 'antivirus', 100, 'NOR360-DEL-001', '/static/products/norton.jpg', 1, 0),
(8, 'Steam Gift Card 50€', 'steam-card-50', 'Steam Guthaben 50€ - Sofort per E-Mail. Einlösbar im Steam Store für Spiele und In-Game Käufe.', 'Steam 50€ Gift Card', 50.00, 44.99, 'games', 200, 'STEAM-50-001', '/static/products/steam-50.jpg', 1, 1);

-- Insert default settings
INSERT OR IGNORE INTO settings (key, value, type, description) VALUES
('site_name', 'SOFTWAREKING24', 'string', 'Website name'),
('site_description', 'Premium Software Lizenzshop', 'string', 'Website description'),
('currency', 'EUR', 'string', 'Default currency'),
('tax_rate', '19', 'number', 'Tax rate in percent'),
('shipping_cost', '0', 'number', 'Flat shipping cost');

-- Insert sample page
INSERT OR IGNORE INTO pages (id, title, slug, content, template, is_published) VALUES
(1, 'Über Uns', 'about-us', '<h1>Über SOFTWAREKING24</h1><p>Wir sind Ihr zuverlässiger Partner für Software-Lizenzen.</p>', 'standard', 1);
