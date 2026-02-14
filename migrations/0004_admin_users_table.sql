-- ============================================
-- ADMIN USERS TABLE
-- Required by theme_system and other admin features
-- ============================================

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK(role IN ('super_admin', 'admin', 'editor', 'viewer')),
  is_active INTEGER DEFAULT 1,
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create default admin user (password: admin123)
INSERT OR IGNORE INTO admin_users (username, email, password_hash, full_name, role) 
VALUES (
  'admin',
  'admin@softwareking24.de',
  '$2a$10$rOFWvkYqJvAhgZLqFqRz1.Zc9h0fZQXVx0SqKJYXVQdQJYXVQXVQX',
  'System Administrator',
  'super_admin'
);
