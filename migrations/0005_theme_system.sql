-- ============================================
-- THEME SYSTEM TABLES
-- Enterprise-grade theme management system
-- ============================================

-- Main themes table
CREATE TABLE IF NOT EXISTS themes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active INTEGER DEFAULT 0,
  is_default INTEGER DEFAULT 0,
  preview_image TEXT,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES admin_users(id)
);

-- Theme configuration (JSON stored as TEXT)
CREATE TABLE IF NOT EXISTS theme_configs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  theme_id INTEGER NOT NULL,
  config_type TEXT NOT NULL CHECK(config_type IN ('colors', 'typography', 'layout', 'components', 'custom_css')),
  config_data TEXT NOT NULL, -- JSON string
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);

-- Theme presets (saved configurations)
CREATE TABLE IF NOT EXISTS theme_presets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  preset_type TEXT DEFAULT 'custom' CHECK(preset_type IN ('system', 'custom', 'seasonal')),
  config_json TEXT NOT NULL,
  thumbnail TEXT,
  is_system INTEGER DEFAULT 0,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES admin_users(id)
);

-- Theme assignments (multi-theme support)
CREATE TABLE IF NOT EXISTS theme_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  theme_id INTEGER NOT NULL,
  assignment_type TEXT NOT NULL CHECK(assignment_type IN ('global', 'page', 'category', 'seasonal')),
  target_id INTEGER, -- page_id or category_id
  target_slug TEXT, -- page slug or category slug
  priority INTEGER DEFAULT 0,
  start_date DATETIME,
  end_date DATETIME,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);

-- User theme preferences
CREATE TABLE IF NOT EXISTS user_theme_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  session_id TEXT,
  theme_mode TEXT DEFAULT 'auto' CHECK(theme_mode IN ('light', 'dark', 'auto')),
  custom_overrides TEXT, -- JSON for user-specific customizations
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Theme change history (audit log)
CREATE TABLE IF NOT EXISTS theme_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  theme_id INTEGER NOT NULL,
  changed_by INTEGER,
  change_type TEXT NOT NULL CHECK(change_type IN ('created', 'updated', 'activated', 'deactivated', 'deleted')),
  old_config TEXT,
  new_config TEXT,
  change_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES admin_users(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_themes_active ON themes(is_active);
CREATE INDEX IF NOT EXISTS idx_themes_slug ON themes(slug);
CREATE INDEX IF NOT EXISTS idx_theme_configs_theme_id ON theme_configs(theme_id);
CREATE INDEX IF NOT EXISTS idx_theme_configs_type ON theme_configs(config_type);
CREATE INDEX IF NOT EXISTS idx_theme_assignments_theme_id ON theme_assignments(theme_id);
CREATE INDEX IF NOT EXISTS idx_theme_assignments_type ON theme_assignments(assignment_type);
CREATE INDEX IF NOT EXISTS idx_theme_assignments_active ON theme_assignments(is_active);
CREATE INDEX IF NOT EXISTS idx_user_theme_prefs_user_id ON user_theme_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_theme_prefs_session_id ON user_theme_preferences(session_id);

-- Insert default theme
INSERT INTO themes (name, slug, description, is_active, is_default) 
VALUES ('Default Theme', 'default', 'Standard SOFTWAREKING24 theme', 1, 1)
ON CONFLICT(slug) DO NOTHING;

-- Insert default color configuration
INSERT INTO theme_configs (theme_id, config_type, config_data)
SELECT id, 'colors', json_object(
  'primary', '#3b82f6',
  'secondary', '#8b5cf6',
  'accent', '#10b981',
  'background', '#ffffff',
  'surface', '#f9fafb',
  'text', '#111827',
  'textSecondary', '#6b7280',
  'success', '#10b981',
  'warning', '#f59e0b',
  'error', '#ef4444',
  'border', '#e5e7eb'
) FROM themes WHERE slug = 'default' AND NOT EXISTS (
  SELECT 1 FROM theme_configs WHERE theme_id = (SELECT id FROM themes WHERE slug = 'default') AND config_type = 'colors'
);

-- Insert default typography configuration
INSERT INTO theme_configs (theme_id, config_type, config_data)
SELECT id, 'typography', json_object(
  'headingFont', 'Inter',
  'bodyFont', 'Inter',
  'fontSize', 'medium',
  'fontWeight', 'normal',
  'letterSpacing', 'normal',
  'lineHeight', '1.5'
) FROM themes WHERE slug = 'default' AND NOT EXISTS (
  SELECT 1 FROM theme_configs WHERE theme_id = (SELECT id FROM themes WHERE slug = 'default') AND config_type = 'typography'
);

-- Insert default layout configuration
INSERT INTO theme_configs (theme_id, config_type, config_data)
SELECT id, 'layout', json_object(
  'layoutMode', 'full',
  'sidebarPosition', 'left',
  'stickyHeader', 1,
  'borderRadius', 'medium',
  'contentWidth', '1280px'
) FROM themes WHERE slug = 'default' AND NOT EXISTS (
  SELECT 1 FROM theme_configs WHERE theme_id = (SELECT id FROM themes WHERE slug = 'default') AND config_type = 'layout'
);

-- Insert default component configuration
INSERT INTO theme_configs (theme_id, config_type, config_data)
SELECT id, 'components', json_object(
  'buttonStyle', 'rounded',
  'cardShadow', 'medium',
  'inputStyle', 'outlined',
  'navbarTransparency', 0,
  'hoverEffects', 'scale',
  'transitionSpeed', 'normal'
) FROM themes WHERE slug = 'default' AND NOT EXISTS (
  SELECT 1 FROM theme_configs WHERE theme_id = (SELECT id FROM themes WHERE slug = 'default') AND config_type = 'components'
);

-- Insert system presets
INSERT INTO theme_presets (name, preset_type, config_json, is_system)
VALUES 
  ('Dark Mode', 'system', json_object(
    'colors', json_object(
      'primary', '#60a5fa',
      'secondary', '#a78bfa',
      'accent', '#34d399',
      'background', '#111827',
      'surface', '#1f2937',
      'text', '#f9fafb',
      'textSecondary', '#d1d5db',
      'success', '#34d399',
      'warning', '#fbbf24',
      'error', '#f87171',
      'border', '#374151'
    )
  ), 1),
  ('Corporate', 'system', json_object(
    'colors', json_object(
      'primary', '#1e40af',
      'secondary', '#64748b',
      'accent', '#0891b2',
      'background', '#ffffff',
      'surface', '#f8fafc',
      'text', '#1e293b',
      'textSecondary', '#64748b',
      'success', '#059669',
      'warning', '#d97706',
      'error', '#dc2626',
      'border', '#cbd5e1'
    )
  ), 1),
  ('Modern', 'system', json_object(
    'colors', json_object(
      'primary', '#8b5cf6',
      'secondary', '#ec4899',
      'accent', '#14b8a6',
      'background', '#ffffff',
      'surface', '#faf5ff',
      'text', '#0f172a',
      'textSecondary', '#64748b',
      'success', '#10b981',
      'warning', '#f59e0b',
      'error', '#ef4444',
      'border', '#e9d5ff'
    )
  ), 1),
  ('Neon', 'system', json_object(
    'colors', json_object(
      'primary', '#a855f7',
      'secondary', '#06b6d4',
      'accent', '#f472b6',
      'background', '#0f172a',
      'surface', '#1e293b',
      'text', '#f1f5f9',
      'textSecondary', '#cbd5e1',
      'success', '#22d3ee',
      'warning', '#fbbf24',
      'error', '#fb7185',
      'border', '#334155'
    )
  ), 1),
  ('Minimal', 'system', json_object(
    'colors', json_object(
      'primary', '#000000',
      'secondary', '#525252',
      'accent', '#737373',
      'background', '#ffffff',
      'surface', '#fafafa',
      'text', '#171717',
      'textSecondary', '#737373',
      'success', '#22c55e',
      'warning', '#eab308',
      'error', '#ef4444',
      'border', '#e5e5e5'
    )
  ), 1)
ON CONFLICT DO NOTHING;
