-- Shop Settings table for storing configurable shop settings as JSON
CREATE TABLE IF NOT EXISTS shop_settings (
  id INTEGER PRIMARY KEY,
  settings_data TEXT NOT NULL DEFAULT '{}',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default empty settings if not exists
INSERT OR IGNORE INTO shop_settings (id, settings_data) VALUES (1, '{}');
