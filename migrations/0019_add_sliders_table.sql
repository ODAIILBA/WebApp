-- Migration: Add sliders table for hero banners and promotional sliders
-- ========================================================================

-- Create sliders table
CREATE TABLE IF NOT EXISTS sliders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  mobile_image_url TEXT,
  link_url TEXT,
  link_text TEXT,
  position INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  start_date DATETIME,
  end_date DATETIME,
  background_color TEXT DEFAULT '#1a2a4e',
  text_color TEXT DEFAULT '#ffffff',
  button_style TEXT DEFAULT 'primary',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for active sliders
CREATE INDEX IF NOT EXISTS idx_sliders_active ON sliders(is_active, position);
CREATE INDEX IF NOT EXISTS idx_sliders_dates ON sliders(start_date, end_date);

-- Insert sample sliders
INSERT INTO sliders (title, subtitle, image_url, link_url, link_text, position, is_active, background_color) VALUES
('Top Software zu unschlagbaren Preisen', 'Bis zu 70% Rabatt auf Windows, Office & mehr', '/static/banners/hero_home.jpg', '/produkte', 'Jetzt shoppen', 1, 1, '#1a2a4e'),
('Windows 11 Pro - Jetzt verfügbar', 'Upgrade auf die neueste Version mit exklusivem Rabatt', '/static/banners/windows11_banner.jpg', '/produkt/windows-11-pro', 'Mehr erfahren', 2, 1, '#0078d4'),
('Microsoft Office 2024', 'Produktivität neu definiert - Jetzt vorbestellen', '/static/banners/office2024_banner.jpg', '/produkt/microsoft-office-2024', 'Vorbestellen', 3, 1, '#d83b01');
