-- Theme System Tables
-- Migration: 0028_theme_system
-- Date: 2026-02-22
-- Developer: ODAI ILBA | TargoNIX

-- Themes table: Main theme configurations
CREATE TABLE IF NOT EXISTS themes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  version TEXT DEFAULT '1.0.0',
  author TEXT DEFAULT 'ODAI ILBA | TargoNIX',
  preview_image TEXT,
  is_active INTEGER DEFAULT 0,
  is_default INTEGER DEFAULT 0,
  is_system INTEGER DEFAULT 0,
  config_json TEXT, -- Full theme configuration as JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Theme configurations: Detailed settings per theme
CREATE TABLE IF NOT EXISTS theme_configs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  theme_id INTEGER NOT NULL,
  config_type TEXT NOT NULL CHECK(config_type IN ('colors', 'typography', 'layout', 'components', 'spacing', 'borders')),
  config_data TEXT NOT NULL, -- JSON configuration data
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);

-- Theme presets: Pre-configured theme variations
CREATE TABLE IF NOT EXISTS theme_presets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  preview_colors TEXT, -- JSON array of primary colors for preview
  config_json TEXT NOT NULL, -- Full configuration
  is_system INTEGER DEFAULT 1,
  category TEXT DEFAULT 'general' CHECK(category IN ('general', 'ecommerce', 'corporate', 'modern', 'classic')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Theme assignments: User/session specific themes
CREATE TABLE IF NOT EXISTS theme_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  theme_id INTEGER NOT NULL,
  user_id INTEGER,
  session_id TEXT,
  is_active INTEGER DEFAULT 1,
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_themes_active ON themes(is_active);
CREATE INDEX IF NOT EXISTS idx_themes_default ON themes(is_default);
CREATE INDEX IF NOT EXISTS idx_theme_configs_theme_id ON theme_configs(theme_id);
CREATE INDEX IF NOT EXISTS idx_theme_configs_type ON theme_configs(config_type);
CREATE INDEX IF NOT EXISTS idx_theme_assignments_theme_id ON theme_assignments(theme_id);
CREATE INDEX IF NOT EXISTS idx_theme_assignments_user_id ON theme_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_theme_assignments_active ON theme_assignments(is_active);

-- Insert default theme
INSERT OR IGNORE INTO themes (name, display_name, description, is_active, is_default, is_system, config_json) VALUES 
('default', 'SOFTWAREKING24 Default', 'Default theme for SOFTWAREKING24 platform', 1, 1, 1, 
'{
  "colors": {
    "primary": "#3b82f6",
    "secondary": "#8b5cf6",
    "accent": "#10b981",
    "background": "#ffffff",
    "text": "#111827",
    "textSecondary": "#6b7280",
    "border": "#e5e7eb",
    "error": "#ef4444",
    "warning": "#f59e0b",
    "success": "#10b981",
    "info": "#3b82f6"
  },
  "typography": {
    "fontFamily": "Inter, system-ui, sans-serif",
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem"
    },
    "fontWeight": {
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem"
  },
  "borders": {
    "radius": {
      "sm": "0.25rem",
      "md": "0.5rem",
      "lg": "0.75rem",
      "xl": "1rem",
      "full": "9999px"
    }
  }
}');

-- Insert theme configs for default theme
INSERT OR IGNORE INTO theme_configs (theme_id, config_type, config_data) VALUES 
(1, 'colors', '{"primary":"#3b82f6","secondary":"#8b5cf6","accent":"#10b981","background":"#ffffff","text":"#111827","textSecondary":"#6b7280","border":"#e5e7eb","error":"#ef4444","warning":"#f59e0b","success":"#10b981","info":"#3b82f6"}'),
(1, 'typography', '{"fontFamily":"Inter, system-ui, sans-serif","fontSize":{"xs":"0.75rem","sm":"0.875rem","base":"1rem","lg":"1.125rem","xl":"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem"},"fontWeight":{"normal":400,"medium":500,"semibold":600,"bold":700}}'),
(1, 'layout', '{"maxWidth":"1280px","containerPadding":"1rem","headerHeight":"64px","sidebarWidth":"280px"}'),
(1, 'components', '{"button":{"borderRadius":"0.5rem","padding":"0.5rem 1rem"},"card":{"borderRadius":"0.75rem","shadow":"0 1px 3px rgba(0,0,0,0.1)"},"input":{"borderRadius":"0.5rem","height":"40px"}}');

-- Insert theme presets
INSERT OR IGNORE INTO theme_presets (name, display_name, description, preview_colors, config_json, category) VALUES 
('blue-ocean', 'Blue Ocean', 'Professional blue theme', '["#0ea5e9","#06b6d4","#3b82f6"]', 
'{
  "colors": {
    "primary": "#0ea5e9",
    "secondary": "#06b6d4",
    "accent": "#3b82f6",
    "background": "#ffffff",
    "text": "#0f172a"
  }
}', 'corporate'),

('purple-dream', 'Purple Dream', 'Modern purple gradient theme', '["#8b5cf6","#a855f7","#c084fc"]',
'{
  "colors": {
    "primary": "#8b5cf6",
    "secondary": "#a855f7",
    "accent": "#c084fc",
    "background": "#faf5ff",
    "text": "#3f3f46"
  }
}', 'modern'),

('green-nature', 'Green Nature', 'Fresh green eco-friendly theme', '["#10b981","#059669","#34d399"]',
'{
  "colors": {
    "primary": "#10b981",
    "secondary": "#059669",
    "accent": "#34d399",
    "background": "#f0fdf4",
    "text": "#14532d"
  }
}', 'ecommerce'),

('dark-mode', 'Dark Mode', 'Sleek dark theme for night owls', '["#1e293b","#334155","#475569"]',
'{
  "colors": {
    "primary": "#60a5fa",
    "secondary": "#818cf8",
    "accent": "#34d399",
    "background": "#0f172a",
    "text": "#f1f5f9"
  }
}', 'modern'),

('orange-sunset', 'Orange Sunset', 'Warm orange theme', '["#f97316","#fb923c","#fdba74"]',
'{
  "colors": {
    "primary": "#f97316",
    "secondary": "#fb923c",
    "accent": "#fdba74",
    "background": "#fff7ed",
    "text": "#7c2d12"
  }
}', 'ecommerce'),

('red-passion', 'Red Passion', 'Bold red theme', '["#ef4444","#dc2626","#f87171"]',
'{
  "colors": {
    "primary": "#ef4444",
    "secondary": "#dc2626",
    "accent": "#f87171",
    "background": "#fef2f2",
    "text": "#7f1d1d"
  }
}', 'modern');
