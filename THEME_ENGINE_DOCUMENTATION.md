# 🎨 Theme Engine - Enterprise Documentation

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Frontend Implementation](#frontend-implementation)
6. [Configuration Structure](#configuration-structure)
7. [Scalability & SaaS Considerations](#scalability--saas-considerations)
8. [Usage Guide](#usage-guide)

---

## Overview

The Theme Engine is an enterprise-grade, SaaS-ready theme customization system that allows complete visual control over the frontend without requiring code changes or rebuilds. It features real-time preview, multi-theme support, and dynamic CSS generation.

### Key Highlights
- **Zero Rebuild Required**: Changes apply instantly via CSS variables
- **SaaS-Ready**: Multi-tenant support with theme assignments
- **Audit Trail**: Complete history of all theme changes
- **Role-Based Access**: Granular permissions for theme editing
- **Scalable Architecture**: JSON-based configuration storage

---

## Features

### ✅ 1. Global Color Management
- Primary, Secondary, Accent colors
- Background, Surface, Text colors
- Success, Warning, Error status colors
- HTML5 color pickers with hex value display
- Real-time preview of color changes

### ✅ 2. Dark / Light Mode System
- Light mode
- Dark mode
- Auto (system-based detection)
- Separate color configurations for each mode
- User preference persistence

### ✅ 3. Typography Management
- Heading font selection (Google Fonts)
- Body font selection
- Font size scale (small, medium, large)
- Font weight control (300-700)
- Letter spacing (tight, normal, wide)
- Line height configuration

### ✅ 4. Layout Customization
- Layout mode: Full width / Boxed
- Sidebar position: Left / Right
- Sticky header toggle
- Border radius control (none, small, medium, large)
- Content width configuration

### ✅ 5. Component Styling Controls
- Button style: Rounded / Pill / Square
- Card shadow intensity (none, small, medium, large)
- Input field style: Outlined / Filled
- Navbar transparency
- Hover effects: None / Scale / Glow / Lift
- Transition speed: Fast / Normal / Slow

### ✅ 6. Header & Footer Builder
- Logo upload
- Favicon upload
- Header background control
- Footer layout selection
- Social media links
- Drag-and-drop sections (planned)

### ✅ 7. Live Theme Preview
- Split-screen interface
- Real-time preview on the right panel
- No page reload required
- Instant CSS variable updates

### ✅ 8. Theme Presets System
- 5 built-in presets:
  - **Dark Mode**: Modern dark theme
  - **Corporate**: Professional blue theme
  - **Modern**: Purple and pink gradient theme
  - **Neon**: Vibrant neon colors
  - **Minimal**: Clean black and white
- Save current theme as custom preset
- Import/Export themes as JSON
- Duplicate existing themes

### ✅ 9. Multi-Theme Assignment
- Global theme (default for all pages)
- Page-specific themes
- Category-specific themes
- Seasonal themes (with start/end dates)
- Priority-based theme resolution

### ✅ 10. Advanced Controls
- Custom CSS editor (admin only)
- Role-based theme editing permissions
- Theme history and audit log
- White-label mode
- Version control for themes

---

## Database Schema

### Tables Overview

```sql
1. themes                    -- Main theme definitions
2. theme_configs            -- JSON configuration storage
3. theme_presets            -- Saved theme presets
4. theme_assignments        -- Multi-theme assignments
5. user_theme_preferences   -- User-specific preferences
6. theme_history            -- Audit log
```

### 1. `themes` Table

Stores main theme information.

```sql
CREATE TABLE themes (
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
```

**Fields:**
- `is_active`: Only one theme can be active at a time
- `is_default`: Fallback theme if no specific assignment
- `preview_image`: Screenshot/thumbnail URL

### 2. `theme_configs` Table

Stores JSON configuration for each theme aspect.

```sql
CREATE TABLE theme_configs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  theme_id INTEGER NOT NULL,
  config_type TEXT NOT NULL CHECK(config_type IN ('colors', 'typography', 'layout', 'components', 'custom_css')),
  config_data TEXT NOT NULL, -- JSON string
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);
```

**Config Types:**
- `colors`: Color palette configuration
- `typography`: Font and text settings
- `layout`: Page layout options
- `components`: UI component styles
- `custom_css`: Raw CSS overrides

### 3. `theme_presets` Table

Saved theme configurations for quick application.

```sql
CREATE TABLE theme_presets (
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
```

**Preset Types:**
- `system`: Built-in presets (cannot be deleted)
- `custom`: User-created presets
- `seasonal`: Temporary seasonal themes

### 4. `theme_assignments` Table

Enables multi-theme support for different contexts.

```sql
CREATE TABLE theme_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  theme_id INTEGER NOT NULL,
  assignment_type TEXT NOT NULL CHECK(assignment_type IN ('global', 'page', 'category', 'seasonal')),
  target_id INTEGER,
  target_slug TEXT,
  priority INTEGER DEFAULT 0,
  start_date DATETIME,
  end_date DATETIME,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);
```

**Assignment Types:**
- `global`: Default theme for entire site
- `page`: Specific page override
- `category`: Product category theme
- `seasonal`: Time-based themes (Black Friday, Christmas)

**Priority Resolution:**
1. Seasonal (if within date range)
2. Page-specific
3. Category-specific
4. Global/Default

### 5. `user_theme_preferences` Table

Stores user-specific theme customizations.

```sql
CREATE TABLE user_theme_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  session_id TEXT,
  theme_mode TEXT DEFAULT 'auto' CHECK(theme_mode IN ('light', 'dark', 'auto')),
  custom_overrides TEXT, -- JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Use Cases:**
- Remember dark/light mode preference
- Save per-user font size overrides
- Accessibility customizations

### 6. `theme_history` Table

Complete audit trail of theme changes.

```sql
CREATE TABLE theme_history (
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
```

### Indexes

```sql
CREATE INDEX idx_themes_active ON themes(is_active);
CREATE INDEX idx_themes_slug ON themes(slug);
CREATE INDEX idx_theme_configs_theme_id ON theme_configs(theme_id);
CREATE INDEX idx_theme_configs_type ON theme_configs(config_type);
CREATE INDEX idx_theme_assignments_theme_id ON theme_assignments(theme_id);
CREATE INDEX idx_theme_assignments_type ON theme_assignments(assignment_type);
CREATE INDEX idx_theme_assignments_active ON theme_assignments(is_active);
CREATE INDEX idx_user_theme_prefs_user_id ON user_theme_preferences(user_id);
CREATE INDEX idx_user_theme_prefs_session_id ON user_theme_preferences(session_id);
```

---

## API Endpoints

### Base URL: `/api/theme`

### 1. Save Theme Configuration
**POST** `/api/theme/save`

Saves the current theme configuration.

**Request Body:**
```json
{
  "colors": {
    "primary": "#3b82f6",
    "secondary": "#8b5cf6",
    "accent": "#10b981",
    "background": "#ffffff",
    "text": "#111827",
    "success": "#10b981",
    "warning": "#f59e0b",
    "error": "#ef4444"
  },
  "typography": {
    "headingFont": "Inter",
    "bodyFont": "Inter",
    "fontSize": "medium",
    "fontWeight": "normal",
    "letterSpacing": "normal"
  },
  "layout": {
    "layoutMode": "full",
    "sidebarPosition": "left",
    "stickyHeader": true,
    "borderRadius": "medium"
  },
  "components": {
    "buttonStyle": "rounded",
    "cardShadow": "medium",
    "inputStyle": "outlined",
    "hoverEffects": "scale",
    "transitionSpeed": "normal"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Theme saved successfully"
}
```

### 2. Get Preset
**GET** `/api/theme/preset/:id`

Retrieves a specific theme preset.

**Response:**
```json
{
  "success": true,
  "preset": {
    "id": 1,
    "name": "Dark Mode",
    "preset_type": "system",
    "config_json": "{...}",
    "is_system": 1
  }
}
```

### 3. Create Preset
**POST** `/api/theme/preset/create`

Saves current configuration as a new preset.

**Request Body:**
```json
{
  "name": "My Custom Theme",
  "config": {
    "colors": {...},
    "typography": {...}
  }
}
```

**Response:**
```json
{
  "success": true,
  "id": 123
}
```

### 4. Activate Theme
**POST** `/api/theme/activate`

Activates a specific theme.

**Request Body:**
```json
{
  "themeId": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Theme activated successfully"
}
```

### 5. Duplicate Theme
**POST** `/api/theme/duplicate`

Creates a copy of an existing theme.

**Request Body:**
```json
{
  "themeId": 1,
  "name": "My Copy of Default"
}
```

**Response:**
```json
{
  "success": true,
  "id": 456,
  "message": "Theme duplicated successfully"
}
```

### 6. Create New Theme
**POST** `/api/theme/create`

Creates a new theme from scratch.

**Request Body:**
```json
{
  "name": "Brand New Theme",
  "slug": "brand-new-theme"
}
```

**Response:**
```json
{
  "success": true,
  "id": 789,
  "message": "Theme created successfully"
}
```

### 7. Get Active Theme
**GET** `/api/theme/active`

Returns the currently active theme configuration.

**Response:**
```json
{
  "success": true,
  "theme": {
    "id": 1,
    "name": "Default Theme",
    "slug": "default",
    "colors": {...},
    "typography": {...},
    "layout": {...},
    "components": {...}
  }
}
```

### 8. Dynamic CSS Endpoint
**GET** `/theme.css`

Generates and serves dynamic CSS based on active theme.

**Response:** (CSS file)
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --accent-color: #10b981;
  /* ... */
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: var(--body-font);
}

/* ... */
```

**Cache:** 5 minutes (`max-age=300`)

---

## Frontend Implementation

### 1. Include Dynamic Theme CSS

Add to your HTML `<head>`:

```html
<link rel="stylesheet" href="/theme.css">
```

### 2. Use CSS Variables

```css
/* Your custom styles can reference theme variables */
.my-button {
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-speed);
}

.my-button:hover {
  background-color: var(--secondary-color);
}
```

### 3. JavaScript Integration

```javascript
// Fetch current theme
async function loadTheme() {
  const response = await fetch('/api/theme/active');
  const data = await response.json();
  
  if (data.success) {
    // Apply theme to your app
    applyTheme(data.theme);
  }
}

// Apply theme colors programmatically
function applyTheme(theme) {
  document.documentElement.style.setProperty('--primary-color', theme.colors.primary);
  document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary);
  // ...
}

// Watch for theme changes (optional - using polling)
setInterval(loadTheme, 60000); // Check every minute
```

### 4. Dark Mode Toggle

```html
<button onclick="toggleDarkMode()">
  <i class="fas fa-moon"></i>
  Toggle Dark Mode
</button>

<script>
function toggleDarkMode() {
  // Save preference
  localStorage.setItem('themeMode', 'dark');
  
  // Apply dark preset
  fetch('/api/theme/preset/1') // Dark Mode preset ID
    .then(r => r.json())
    .then(data => {
      const preset = JSON.parse(data.preset.config_json);
      applyTheme(preset);
    });
}
</script>
```

---

## Configuration Structure

### Theme Configuration JSON

```json
{
  "colors": {
    "primary": "#3b82f6",
    "secondary": "#8b5cf6",
    "accent": "#10b981",
    "background": "#ffffff",
    "surface": "#f9fafb",
    "text": "#111827",
    "textSecondary": "#6b7280",
    "success": "#10b981",
    "warning": "#f59e0b",
    "error": "#ef4444",
    "border": "#e5e7eb"
  },
  "typography": {
    "headingFont": "Inter",
    "bodyFont": "Inter",
    "fontSize": "medium",
    "fontWeight": "normal",
    "letterSpacing": "normal",
    "lineHeight": "1.5"
  },
  "layout": {
    "layoutMode": "full",
    "sidebarPosition": "left",
    "stickyHeader": true,
    "borderRadius": "medium",
    "contentWidth": "1280px"
  },
  "components": {
    "buttonStyle": "rounded",
    "cardShadow": "medium",
    "inputStyle": "outlined",
    "navbarTransparency": 0,
    "hoverEffects": "scale",
    "transitionSpeed": "normal"
  }
}
```

### Export Format

```json
{
  "theme": {
    "name": "My Exported Theme",
    "version": "1.0.0",
    "author": "SOFTWAREKING24",
    "created": "2026-02-13T20:00:00Z"
  },
  "config": {
    "colors": {...},
    "typography": {...},
    "layout": {...},
    "components": {...}
  }
}
```

---

## Scalability & SaaS Considerations

### Multi-Tenancy Support

1. **Per-Tenant Theme Storage**
```sql
-- Add tenant_id to themes table
ALTER TABLE themes ADD COLUMN tenant_id INTEGER;
CREATE INDEX idx_themes_tenant ON themes(tenant_id);

-- Query themes for specific tenant
SELECT * FROM themes WHERE tenant_id = ? AND is_active = 1;
```

2. **Isolated Theme Assignments**
- Each tenant has their own theme configurations
- No cross-tenant theme visibility
- Shared system presets for all tenants

### Performance Optimization

1. **CSS Caching**
```typescript
// Cache theme CSS for 5 minutes
app.get('/theme.css', async (c) => {
  return c.text(css, 200, {
    'Cache-Control': 'public, max-age=300',
    'ETag': generateETag(themeConfig)
  });
});
```

2. **Database Indexing**
- All foreign keys indexed
- Composite indexes on (theme_id, config_type)
- Query optimization for active theme lookup

3. **CDN Integration**
- Serve `/theme.css` through CDN
- Cache-Control headers for browser caching
- Purge cache on theme updates

### Horizontal Scaling

1. **Stateless Design**
- No server-side sessions
- All state in database
- Any worker can serve any request

2. **Database Replication**
- Read replicas for theme lookups
- Write to primary for theme updates
- Eventual consistency acceptable

3. **Cache Layer**
```typescript
// Example with Redis
const cacheKey = `theme:${tenantId}:active`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const theme = await db.getActiveTheme(tenantId);
await redis.set(cacheKey, JSON.stringify(theme), 'EX', 300);
return theme;
```

### Security Considerations

1. **Role-Based Access Control**
```sql
-- Add permissions table
CREATE TABLE theme_permissions (
  id INTEGER PRIMARY KEY,
  admin_user_id INTEGER,
  can_edit_colors INTEGER DEFAULT 0,
  can_edit_typography INTEGER DEFAULT 0,
  can_edit_layout INTEGER DEFAULT 0,
  can_activate_themes INTEGER DEFAULT 0,
  can_delete_themes INTEGER DEFAULT 0
);
```

2. **Input Validation**
- Sanitize color values (hex validation)
- Whitelist font families
- Validate CSS syntax before saving
- SQL injection prevention (parameterized queries)

3. **XSS Prevention**
- Escape user-generated content
- Content Security Policy headers
- No inline scripts in theme CSS

### Monitoring & Analytics

1. **Theme Usage Tracking**
```sql
CREATE TABLE theme_analytics (
  id INTEGER PRIMARY KEY,
  theme_id INTEGER,
  page_views INTEGER DEFAULT 0,
  unique_users INTEGER DEFAULT 0,
  avg_session_duration INTEGER,
  bounce_rate REAL,
  date DATE
);
```

2. **Performance Metrics**
- CSS generation time
- Database query duration
- Cache hit rate
- API response times

---

## Usage Guide

### For Administrators

#### 1. Accessing Theme Engine

1. Navigate to `/admin/themes`
2. You'll see the Theme Engine dashboard

#### 2. Customizing Colors

1. Click on the **Colors** tab
2. Click on any color picker to open the color selector
3. Choose your desired color
4. Watch the live preview update in real-time
5. Click **Save Changes** when satisfied

#### 3. Changing Typography

1. Click on the **Typography** tab
2. Select heading and body fonts from dropdowns
3. Adjust font size, weight, and letter spacing
4. Preview changes in real-time
5. Click **Save Changes**

#### 4. Applying Presets

1. Click on the **Presets** tab
2. Browse available presets
3. Click on any preset to apply it instantly
4. Modify as needed
5. Save as a custom preset if desired

#### 5. Creating New Theme

1. Click **Create New Theme** card
2. Enter theme name
3. Configure all settings
4. Click **Save Changes**

#### 6. Activating a Theme

1. Scroll to **Theme Management** section
2. Find your desired theme
3. Click **Activate**
4. Theme is now live on the frontend

#### 7. Exporting a Theme

1. Configure your theme
2. Click **Export** button
3. JSON file downloads automatically
4. Share or backup this file

### For Developers

#### 1. Extending Theme Options

Add new color variable:

```typescript
// 1. Update database migration
INSERT INTO theme_configs (theme_id, config_type, config_data)
VALUES (1, 'colors', json_set(config_data, '$.newColor', '#ff0000'));

// 2. Update admin UI (in app.get('/admin/themes'))
<input type="color" id="newColor" value="${activeConfig.colors.newColor || '#ff0000'}" />

// 3. Update CSS generation (in app.get('/theme.css'))
const css = `
  :root {
    --new-color: ${colors.newColor || '#ff0000'};
  }
`;
```

#### 2. Adding Custom Presets

```sql
INSERT INTO theme_presets (name, preset_type, config_json, is_system)
VALUES (
  'My Custom Preset',
  'custom',
  json_object(
    'colors', json_object(
      'primary', '#123456',
      'secondary', '#654321'
    )
  ),
  0
);
```

#### 3. Creating Theme Assignments

```sql
-- Assign theme to specific page
INSERT INTO theme_assignments (
  theme_id,
  assignment_type,
  target_slug,
  priority
) VALUES (
  2,  -- theme ID
  'page',
  'about-us',
  10
);

-- Seasonal theme (Black Friday)
INSERT INTO theme_assignments (
  theme_id,
  assignment_type,
  start_date,
  end_date,
  priority
) VALUES (
  3,
  'seasonal',
  '2026-11-25',
  '2026-11-30',
  100  -- Highest priority
);
```

---

## Best Practices

### 1. Theme Design

- **Accessibility**: Ensure sufficient color contrast (WCAG AA/AAA)
- **Consistency**: Use design tokens from one source of truth
- **Responsiveness**: Test themes on mobile, tablet, desktop
- **Dark Mode**: Test readability in both light and dark modes

### 2. Performance

- **Minimize CSS**: Only include necessary styles
- **Cache Aggressively**: Use long cache times for static assets
- **CDN Distribution**: Serve CSS from edge locations
- **Lazy Loading**: Load theme CSS before interactive content

### 3. Maintenance

- **Version Control**: Track theme changes in git
- **Backup Regularly**: Export themes before major changes
- **Test Thoroughly**: Preview changes before activating
- **Monitor Usage**: Track which themes perform best

---

## Troubleshooting

### Issue: Changes Not Appearing

**Solution:**
1. Clear browser cache (Ctrl+F5)
2. Check if theme is activated
3. Verify CSS is being loaded (`/theme.css`)
4. Check browser console for errors

### Issue: Colors Look Wrong

**Solution:**
1. Verify hex color format (#RRGGBB)
2. Check CSS variable names match
3. Inspect element to see computed styles
4. Test in different browsers

### Issue: Slow Performance

**Solution:**
1. Enable CSS caching
2. Minimize number of CSS variables
3. Use CDN for theme CSS
4. Check database indexes

---

## Future Enhancements

- [ ] Visual drag-and-drop header/footer builder
- [ ] A/B testing for different themes
- [ ] Real-time collaboration (multiple admins editing)
- [ ] Theme marketplace (share/sell themes)
- [ ] Mobile app for theme management
- [ ] AI-powered color palette suggestions
- [ ] Accessibility checker integration
- [ ] Animation/transition builder
- [ ] Custom font upload support

---

## Support

For issues or questions:
- GitHub: [Your Repo]
- Email: support@softwareking24.com
- Documentation: [Your Docs URL]

---

**Version:** 1.0.0  
**Last Updated:** 2026-02-13  
**License:** MIT
