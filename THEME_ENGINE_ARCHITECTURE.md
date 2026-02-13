# 🏗️ Theme Engine - Technical Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐    ┌──────────────────┐   ┌────────────┐│
│  │  Admin UI        │    │  Public Website  │   │  Mobile    ││
│  │  (Theme Editor)  │    │  (Theme Consumer)│   │  App       ││
│  └──────────────────┘    └──────────────────┘   └────────────┘│
│           │                       │                      │      │
│           └───────────────────────┼──────────────────────┘      │
│                                   │                             │
└───────────────────────────────────┼─────────────────────────────┘
                                    │
                        ┌───────────▼───────────┐
                        │   /theme.css CDN      │
                        │   (Cached 5 min)      │
                        └───────────┬───────────┘
                                    │
┌───────────────────────────────────┼─────────────────────────────┐
│                          API LAYER                              │
├───────────────────────────────────┼─────────────────────────────┤
│  ┌────────────────────────────────▼──────────────────────────┐ │
│  │              Hono HTTP Server (Workers)                   │ │
│  │                                                            │ │
│  │  POST /api/theme/save          GET /theme.css            │ │
│  │  POST /api/theme/activate      GET /api/theme/active     │ │
│  │  GET /api/theme/preset/:id     POST /api/theme/create    │ │
│  │  POST /api/theme/preset/create POST /api/theme/duplicate │ │
│  └────────────────────────────────┬──────────────────────────┘ │
└───────────────────────────────────┼─────────────────────────────┘
                                    │
┌───────────────────────────────────┼─────────────────────────────┐
│                        BUSINESS LOGIC LAYER                      │
├───────────────────────────────────┼─────────────────────────────┤
│  ┌────────────────┐  ┌────────────▼───────────┐  ┌───────────┐│
│  │ Theme Manager  │  │ CSS Generator          │  │ Validator ││
│  │ - CRUD Ops     │  │ - Dynamic CSS          │  │ - Schema  ││
│  │ - Activation   │  │ - CSS Variables        │  │ - Colors  ││
│  │ - Versioning   │  │ - Caching              │  │ - Fonts   ││
│  └────────┬───────┘  └────────────┬───────────┘  └─────┬─────┘│
└───────────┼──────────────────────┼──────────────────────┼───────┘
            │                      │                      │
┌───────────▼──────────────────────▼──────────────────────▼───────┐
│                        DATA LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Cloudflare D1 Database (SQLite)             │  │
│  │                                                          │  │
│  │  ┌──────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │ themes   │  │ theme_       │  │ theme_          │  │  │
│  │  │          │  │ configs      │  │ presets         │  │  │
│  │  └──────────┘  └──────────────┘  └─────────────────┘  │  │
│  │                                                          │  │
│  │  ┌──────────────┐  ┌───────────────┐  ┌─────────────┐ │  │
│  │  │ theme_       │  │ user_theme_   │  │ theme_      │ │  │
│  │  │ assignments  │  │ preferences   │  │ history     │ │  │
│  │  └──────────────┘  └───────────────┘  └─────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        CACHING LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐│
│  │ Browser     │  │ Cloudflare   │  │ Database Query Cache  ││
│  │ Cache       │  │ CDN Cache    │  │                        ││
│  │ (CSS vars)  │  │ (theme.css)  │  │ (Active theme lookup) ││
│  └─────────────┘  └──────────────┘  └────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### 1. Theme Customization Flow

```
┌──────────┐
│  Admin   │
│  User    │
└─────┬────┘
      │
      │ 1. Opens /admin/themes
      ▼
┌─────────────────┐
│  Theme Engine   │
│  Admin Page     │
└─────┬───────────┘
      │
      │ 2. Loads active theme & presets
      │    GET /api/theme/active
      ▼
┌──────────────────┐
│  D1 Database     │
│  - themes        │
│  - theme_configs │
└─────┬────────────┘
      │
      │ 3. Returns theme JSON
      ▼
┌─────────────────┐
│  Admin UI       │
│  - Color pickers│
│  - Font selects │
│  - Live preview │
└─────┬───────────┘
      │
      │ 4. User makes changes
      │    (real-time CSS updates)
      ▼
┌─────────────────┐
│  JavaScript     │
│  - Updates      │
│    CSS vars     │
│  - Updates      │
│    preview      │
└─────┬───────────┘
      │
      │ 5. User clicks "Save"
      │    POST /api/theme/save
      ▼
┌──────────────────┐
│  API Handler     │
│  - Validates     │
│  - Updates DB    │
│  - Logs history  │
└─────┬────────────┘
      │
      │ 6. Saves to database
      ▼
┌──────────────────┐
│  D1 Database     │
│  UPDATE theme_   │
│  configs         │
└─────┬────────────┘
      │
      │ 7. Success response
      ▼
┌──────────────────┐
│  Admin UI        │
│  "Theme saved!"  │
└──────────────────┘
```

### 2. Frontend Theme Loading Flow

```
┌──────────┐
│  User    │
│  Visits  │
│  Website │
└─────┬────┘
      │
      │ 1. Loads page
      ▼
┌─────────────────┐
│  HTML Document  │
│  <link href=    │
│   "/theme.css"> │
└─────┬───────────┘
      │
      │ 2. Requests CSS
      │    GET /theme.css
      ▼
┌──────────────────┐
│  CDN Cache?      │
│  Check cache     │
└─────┬────────────┘
      │
      ├─Yes─→ [Return cached CSS]
      │
      └─No──→ Generate CSS
              │
              ▼
        ┌────────────────┐
        │  API Handler   │
        │  - Get active  │
        │    theme       │
        │  - Load config │
        │  - Generate    │
        │    CSS         │
        └────┬───────────┘
             │
             │ 3. Query database
             ▼
        ┌────────────────┐
        │  D1 Database   │
        │  SELECT * FROM │
        │  themes WHERE  │
        │  is_active=1   │
        └────┬───────────┘
             │
             │ 4. Parse JSON configs
             ▼
        ┌────────────────┐
        │  CSS Generator │
        │  - Build CSS   │
        │    string      │
        │  - Apply vars  │
        └────┬───────────┘
             │
             │ 5. Return CSS
             │    with cache headers
             ▼
        ┌────────────────┐
        │  CDN Cache     │
        │  Cache for     │
        │  5 minutes     │
        └────┬───────────┘
             │
             │ 6. Deliver to browser
             ▼
        ┌────────────────┐
        │  Browser       │
        │  Applies CSS   │
        │  variables     │
        └────────────────┘
```

### 3. Multi-Theme Assignment Resolution

```
┌──────────┐
│  User    │
│  Requests│
│  /about  │
└─────┬────┘
      │
      │ 1. Page request
      ▼
┌─────────────────────┐
│  Routing Handler    │
│  - Parse URL        │
│  - Identify page    │
└─────┬───────────────┘
      │
      │ 2. Resolve theme
      │    Based on priority
      ▼
┌─────────────────────┐
│  Theme Resolver     │
│  Priority:          │
│  1. Seasonal        │
│  2. Page-specific   │
│  3. Category        │
│  4. Global/Default  │
└─────┬───────────────┘
      │
      │ 3. Query assignments
      │    SELECT * FROM theme_assignments
      │    WHERE (target_slug = 'about'
      │       OR assignment_type = 'global')
      │    AND is_active = 1
      │    ORDER BY priority DESC
      ▼
┌─────────────────────┐
│  D1 Database        │
│  Returns matches    │
└─────┬───────────────┘
      │
      │ 4. Apply highest priority
      ▼
┌─────────────────────┐
│  Selected Theme     │
│  theme_id = X       │
└─────┬───────────────┘
      │
      │ 5. Load theme config
      │    GET /api/theme/active?id=X
      ▼
┌─────────────────────┐
│  Theme Config       │
│  colors, fonts, etc │
└─────┬───────────────┘
      │
      │ 6. Generate CSS
      │    GET /theme.css?theme=X
      ▼
┌─────────────────────┐
│  Dynamic CSS        │
│  Delivered to user  │
└─────────────────────┘
```

---

## Component Architecture

### 1. Theme Manager Module

**Responsibilities:**
- CRUD operations for themes
- Theme activation/deactivation
- Preset management
- Version control

**Key Methods:**
```typescript
class ThemeManager {
  async getActiveTheme(): Promise<Theme>
  async activateTheme(themeId: number): Promise<void>
  async saveTheme(config: ThemeConfig): Promise<void>
  async duplicateTheme(themeId: number, newName: string): Promise<Theme>
  async deleteTheme(themeId: number): Promise<void>
  async exportTheme(themeId: number): Promise<string>
  async importTheme(json: string): Promise<Theme>
}
```

### 2. CSS Generator Module

**Responsibilities:**
- Dynamic CSS generation
- CSS variable creation
- Caching and optimization

**Key Methods:**
```typescript
class CSSGenerator {
  async generateCSS(theme: Theme): Promise<string>
  buildColorVariables(colors: ColorConfig): string
  buildTypographyRules(typography: TypographyConfig): string
  buildLayoutRules(layout: LayoutConfig): string
  buildComponentRules(components: ComponentConfig): string
  minifyCSS(css: string): string
}
```

### 3. Theme Resolver Module

**Responsibilities:**
- Multi-theme assignment resolution
- Priority calculation
- Caching resolved themes

**Key Methods:**
```typescript
class ThemeResolver {
  async resolveTheme(context: RequestContext): Promise<Theme>
  calculatePriority(assignments: ThemeAssignment[]): ThemeAssignment
  async getCachedResolution(key: string): Promise<Theme | null>
  async cacheResolution(key: string, theme: Theme): Promise<void>
}
```

### 4. Validator Module

**Responsibilities:**
- Input validation
- Schema validation
- Security checks

**Key Methods:**
```typescript
class ThemeValidator {
  validateColor(color: string): boolean
  validateFontFamily(font: string): boolean
  validateCSS(css: string): ValidationResult
  sanitizeInput(input: string): string
  checkPermissions(userId: number, action: string): boolean
}
```

---

## Database Optimization Strategies

### 1. Query Optimization

**Active Theme Lookup (Hot Path):**
```sql
-- Optimized with index on is_active
SELECT * FROM themes WHERE is_active = 1 LIMIT 1;

-- With config joins (single round-trip)
SELECT 
  t.*,
  tc.config_type,
  tc.config_data
FROM themes t
LEFT JOIN theme_configs tc ON tc.theme_id = t.id
WHERE t.is_active = 1;
```

**Assignment Resolution:**
```sql
-- Optimized with composite index
CREATE INDEX idx_assignments_lookup 
ON theme_assignments(target_slug, assignment_type, is_active, priority);

-- Query uses index effectively
SELECT * FROM theme_assignments
WHERE (target_slug = ? OR assignment_type = 'global')
  AND is_active = 1
ORDER BY priority DESC
LIMIT 1;
```

### 2. Caching Strategy

**Multi-Layer Caching:**

1. **Browser Cache** (CSS Variables)
   - Duration: Until page reload
   - Strategy: CSS custom properties persist in memory

2. **CDN Cache** (/theme.css)
   - Duration: 5 minutes
   - Strategy: Cache-Control headers
   - Invalidation: Version parameter or purge API

3. **Application Cache** (Theme Objects)
   - Duration: 5 minutes
   - Strategy: In-memory LRU cache or Redis
   - Key: `theme:active:${tenantId}`

4. **Database Query Cache**
   - Duration: Automatic (SQLite page cache)
   - Strategy: Prepared statements
   - Size: Configurable via PRAGMA

**Example Caching Implementation:**
```typescript
const CACHE_TTL = 300; // 5 minutes

async function getActiveTheme(tenantId: number): Promise<Theme> {
  const cacheKey = `theme:active:${tenantId}`;
  
  // Check memory cache
  let theme = memoryCache.get(cacheKey);
  if (theme) return theme;
  
  // Query database
  theme = await db.query('SELECT...');
  
  // Store in cache
  memoryCache.set(cacheKey, theme, CACHE_TTL);
  
  return theme;
}
```

### 3. Write Optimization

**Batch Updates:**
```typescript
async function saveTheme(themeId: number, config: ThemeConfig) {
  // Use transaction for atomicity
  await db.transaction(async (tx) => {
    // Update theme timestamp
    await tx.execute(
      'UPDATE themes SET updated_at = ? WHERE id = ?',
      [new Date(), themeId]
    );
    
    // Batch upsert configurations
    for (const [type, data] of Object.entries(config)) {
      await tx.execute(`
        INSERT INTO theme_configs (theme_id, config_type, config_data)
        VALUES (?, ?, ?)
        ON CONFLICT(theme_id, config_type)
        DO UPDATE SET config_data = excluded.config_data
      `, [themeId, type, JSON.stringify(data)]);
    }
    
    // Log history
    await tx.execute(
      'INSERT INTO theme_history (...) VALUES (...)',
      [...]
    );
  });
  
  // Invalidate caches
  await invalidateThemeCache(themeId);
}
```

---

## Scalability Considerations

### Horizontal Scaling

**Stateless Design:**
- All state in database or cache
- No server-side sessions
- Round-robin load balancing works

**Database Sharding:**
```sql
-- Shard by tenant_id
tenant_id % num_shards = shard_id

-- Route queries to appropriate shard
const shard = tenantId % NUM_SHARDS;
const db = shards[shard];
```

**Read Replicas:**
```typescript
const readDB = selectReadReplica();
const theme = await readDB.query('SELECT...');

const writeDB = getPrimaryDatabase();
await writeDB.execute('UPDATE...');
```

### Vertical Scaling

**Connection Pooling:**
```typescript
const pool = createConnectionPool({
  min: 10,
  max: 100,
  idleTimeout: 30000
});
```

**Query Parallelization:**
```typescript
const [theme, presets, assignments] = await Promise.all([
  getActiveTheme(),
  getPresets(),
  getAssignments()
]);
```

### Performance Benchmarks

**Target Metrics:**
- Theme Lookup: < 10ms (cached)
- Theme Lookup: < 50ms (uncached)
- CSS Generation: < 100ms
- Theme Save: < 200ms
- Page Load Impact: < 50ms

**Load Testing:**
```bash
# Simulate 1000 concurrent users
artillery run theme-load-test.yml

# Results (expected):
# - RPS: 5000+
# - P95 Latency: < 100ms
# - Error Rate: < 0.1%
```

---

## Security Architecture

### Authentication & Authorization

**Admin Access Control:**
```typescript
// Middleware for theme endpoints
async function requireThemePermission(c: Context, permission: string) {
  const user = await getAuthenticatedUser(c);
  
  if (!user || !user.isAdmin) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  const hasPermission = await checkPermission(user.id, permission);
  
  if (!hasPermission) {
    return c.json({ error: 'Forbidden' }, 403);
  }
  
  return next();
}

// Usage
app.post('/api/theme/save', 
  requireThemePermission('theme.edit'),
  handleSaveTheme
);
```

**Input Validation:**
```typescript
function validateColorInput(color: string): boolean {
  // Allow hex colors only
  return /^#[0-9A-F]{6}$/i.test(color);
}

function validateFontFamily(font: string): boolean {
  // Whitelist approach
  const allowedFonts = [
    'Inter', 'Roboto', 'Open Sans', 
    'Poppins', 'Montserrat', 'Playfair Display'
  ];
  return allowedFonts.includes(font);
}

function sanitizeCSS(css: string): string {
  // Remove potentially dangerous CSS
  return css
    .replace(/@import/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/<script/gi, '');
}
```

**SQL Injection Prevention:**
```typescript
// Always use parameterized queries
const theme = await db.prepare(
  'SELECT * FROM themes WHERE id = ?'
).bind(themeId).first();

// Never concatenate user input
// ❌ BAD
const query = `SELECT * FROM themes WHERE name = '${userInput}'`;

// ✅ GOOD
const query = db.prepare('SELECT * FROM themes WHERE name = ?');
const result = await query.bind(userInput).first();
```

**XSS Prevention:**
```typescript
// Escape user-generated content
function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Use in templates
const safeName = escapeHTML(theme.name);
```

### Content Security Policy

```typescript
app.use('*', async (c, next) => {
  await next();
  
  c.header('Content-Security-Policy', [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com",
    "font-src 'self' https://fonts.gstatic.com",
    "script-src 'self' https://cdn.tailwindcss.com",
    "img-src 'self' data: https:",
  ].join('; '));
});
```

---

## Monitoring & Observability

### Logging Strategy

```typescript
interface ThemeLog {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  event: string;
  userId?: number;
  themeId?: number;
  details?: Record<string, any>;
}

function logThemeEvent(log: ThemeLog) {
  console.log(JSON.stringify({
    ...log,
    service: 'theme-engine',
    environment: process.env.NODE_ENV
  }));
}

// Usage
logThemeEvent({
  timestamp: new Date().toISOString(),
  level: 'info',
  event: 'theme.activated',
  userId: 123,
  themeId: 45,
  details: { themeName: 'Dark Mode' }
});
```

### Metrics Collection

**Key Metrics:**
```typescript
// Performance metrics
metrics.timing('theme.css.generation_time', duration);
metrics.timing('theme.db.query_time', queryDuration);
metrics.increment('theme.cache.hits');
metrics.increment('theme.cache.misses');

// Business metrics
metrics.increment('theme.activations');
metrics.increment('theme.customizations');
metrics.gauge('theme.active_themes', count);
```

### Error Tracking

```typescript
try {
  await saveTheme(config);
} catch (error) {
  // Log to error tracking service
  Sentry.captureException(error, {
    tags: {
      service: 'theme-engine',
      operation: 'save_theme'
    },
    extra: {
      themeId,
      userId,
      config: JSON.stringify(config)
    }
  });
  
  throw error;
}
```

---

## Disaster Recovery

### Backup Strategy

**Automated Backups:**
```bash
# Daily full backup
0 2 * * * /usr/local/bin/backup-themes.sh

# Hourly incremental backup
0 * * * * /usr/local/bin/backup-themes-incremental.sh
```

**Backup Script:**
```bash
#!/bin/bash
# backup-themes.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/themes"
DB_FILE="/path/to/webapp-production.db"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup database
sqlite3 "$DB_FILE" ".backup '$BACKUP_DIR/themes_$DATE.db'"

# Backup as SQL
sqlite3 "$DB_FILE" ".dump" | gzip > "$BACKUP_DIR/themes_$DATE.sql.gz"

# Upload to cloud storage
aws s3 cp "$BACKUP_DIR/themes_$DATE.db" \
  s3://backups/themes/

# Keep only last 30 days locally
find "$BACKUP_DIR" -name "themes_*.db" -mtime +30 -delete
```

### Recovery Procedures

**Theme Recovery:**
```sql
-- Restore from backup
sqlite3 webapp-production.db < themes_backup.sql

-- Or point-in-time recovery
ATTACH DATABASE 'backup.db' AS backup;

INSERT INTO themes SELECT * FROM backup.themes 
WHERE id NOT IN (SELECT id FROM themes);

DETACH DATABASE backup;
```

**Rollback Feature:**
```sql
-- Rollback to previous version
UPDATE themes 
SET is_active = 0 
WHERE id = ?;

UPDATE themes 
SET is_active = 1, updated_at = CURRENT_TIMESTAMP
WHERE id = (
  SELECT theme_id FROM theme_history 
  WHERE change_type = 'activated'
  ORDER BY created_at DESC 
  LIMIT 1 OFFSET 1
);
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] Run migration: `npx wrangler d1 migrations apply`
- [ ] Test theme engine locally
- [ ] Verify all API endpoints work
- [ ] Check CSS generation
- [ ] Run security audit
- [ ] Load test theme endpoints
- [ ] Backup existing database

### Deployment
- [ ] Deploy to staging
- [ ] Test in staging environment
- [ ] Monitor error logs
- [ ] Verify CSS caching
- [ ] Test multi-theme assignments
- [ ] Deploy to production
- [ ] Monitor metrics

### Post-Deployment
- [ ] Smoke test all features
- [ ] Check error rates
- [ ] Monitor performance
- [ ] Verify CDN caching
- [ ] Test theme changes
- [ ] Document any issues

---

## Version History

- **v1.0.0** (2026-02-13): Initial release
  - Global color management
  - Dark/light mode
  - Typography controls
  - Layout customization
  - Component styling
  - Live preview
  - Theme presets
  - Multi-theme support

---

**Maintained by:** SOFTWAREKING24 Engineering Team  
**Last Updated:** 2026-02-13  
**License:** MIT
