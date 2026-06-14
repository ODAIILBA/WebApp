-- ============================================
-- AFFILIATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS affiliates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  email TEXT,
  website TEXT,
  commission_rate REAL DEFAULT 10.0,
  total_clicks INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_revenue REAL DEFAULT 0,
  total_commission REAL DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_affiliates_code ON affiliates(code);
CREATE INDEX IF NOT EXISTS idx_affiliates_is_active ON affiliates(is_active);

INSERT OR IGNORE INTO affiliates (name, code, email, website, commission_rate, total_clicks, total_conversions, total_revenue, total_commission, is_active) VALUES
('TechReview Pro', 'TECH2024', 'partner@techreview.de', 'https://techreview.de', 12.0, 342, 18, 3240.50, 388.86, 1),
('SoftwareBlog DE', 'SWBLOG', 'info@softwareblog.de', 'https://softwareblog.de', 10.0, 187, 9, 1620.30, 162.03, 1),
('DealHunter', 'DEAL10', 'deals@dealhunter.de', NULL, 8.0, 95, 4, 712.40, 56.99, 1),
('Windows Expert', 'WINEXP', 'contact@windows-expert.de', 'https://windows-expert.de', 15.0, 521, 27, 4850.75, 727.61, 1),
('Office Tipps', 'OFFICE15', 'hallo@officetipps.de', NULL, 10.0, 63, 2, 358.20, 35.82, 0);

-- ============================================
-- WISHLISTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS wishlists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_product_id ON wishlists(product_id);

INSERT OR IGNORE INTO wishlists (user_id, product_id, created_at) VALUES
(3, 1, datetime('now', '-5 days')),
(3, 2, datetime('now', '-3 days')),
(3, 3, datetime('now', '-1 days')),
(4, 1, datetime('now', '-7 days')),
(4, 4, datetime('now', '-2 days')),
(5, 2, datetime('now', '-4 days')),
(5, 3, datetime('now', '-6 days')),
(6, 1, datetime('now', '-8 days')),
(6, 5, datetime('now', '-1 days'));

-- ============================================
-- GIFT CARDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS gift_cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  initial_amount REAL NOT NULL,
  remaining_amount REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  is_active INTEGER DEFAULT 1,
  expires_at DATETIME,
  created_by_user_id INTEGER,
  used_by_user_id INTEGER,
  used_at DATETIME,
  recipient_email TEXT,
  recipient_name TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gift_cards_code ON gift_cards(code);
CREATE INDEX IF NOT EXISTS idx_gift_cards_is_active ON gift_cards(is_active);

INSERT OR IGNORE INTO gift_cards (code, initial_amount, remaining_amount, currency, is_active, expires_at, used_by_user_id, used_at, recipient_email, recipient_name) VALUES
('GIFT-XMAS-2024-A', 50.00, 50.00, 'EUR', 1, datetime('now', '+365 days'), NULL, NULL, 'max.mustermann@example.de', 'Max Mustermann'),
('GIFT-BDAY-2025-B', 25.00, 0.00, 'EUR', 0, datetime('now', '+180 days'), 3, datetime('now', '-10 days'), 'lisa.braun@example.de', 'Lisa Braun'),
('GIFT-PROMO-100-C', 100.00, 75.50, 'EUR', 1, datetime('now', '+90 days'), 4, datetime('now', '-2 days'), 'thomas.weber@example.de', 'Thomas Weber'),
('GIFT-WELCOME-D', 10.00, 10.00, 'EUR', 1, datetime('now', '+200 days'), NULL, NULL, 'anna.schmidt@example.de', 'Anna Schmidt'),
('GIFT-SPECIAL-E', 200.00, 200.00, 'EUR', 1, datetime('now', '+500 days'), NULL, NULL, NULL, NULL),
('GIFT-EXPIRED-F', 30.00, 30.00, 'EUR', 0, datetime('now', '-30 days'), NULL, NULL, 'test@example.de', 'Test User');
