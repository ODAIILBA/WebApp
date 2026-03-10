-- Blog System with AI Auto-Generation
-- Automated content generation from web searches and AI

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id INTEGER,
  category_id INTEGER,
  status TEXT DEFAULT 'draft', -- draft, published, scheduled
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT 0,
  is_ai_generated BOOLEAN DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Blog categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES blog_categories(id) ON DELETE CASCADE
);

-- Blog tags
CREATE TABLE IF NOT EXISTS blog_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Blog post tags (many-to-many)
CREATE TABLE IF NOT EXISTS blog_post_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE,
  UNIQUE(post_id, tag_id)
);

-- Blog comments
CREATE TABLE IF NOT EXISTS blog_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_website TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, spam
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

-- AI content generation settings
CREATE TABLE IF NOT EXISTS blog_ai_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- AI content generation log
CREATE TABLE IF NOT EXISTS blog_ai_generation_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER,
  search_query TEXT,
  sources_used TEXT, -- JSON array of sources
  generation_status TEXT DEFAULT 'pending', -- pending, success, failed
  error_message TEXT,
  tokens_used INTEGER DEFAULT 0,
  generation_time_ms INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE SET NULL
);

-- Blog post views tracking
CREATE TABLE IF NOT EXISTS blog_post_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  referer TEXT,
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_blog_post_views_post ON blog_post_views(post_id);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description, sort_order) VALUES
  ('Software News', 'software-news', 'Latest news about software and technology', 1),
  ('Product Updates', 'product-updates', 'Updates about our products and services', 2),
  ('Tutorials', 'tutorials', 'How-to guides and tutorials', 3),
  ('Industry Insights', 'industry-insights', 'Insights about the software industry', 4),
  ('Security', 'security', 'Security news and best practices', 5);

-- Insert AI generation settings
INSERT INTO blog_ai_settings (setting_key, setting_value) VALUES
  ('auto_generate_enabled', '1'),
  ('generation_frequency', 'daily'), -- daily, weekly, manual
  ('generation_time', '09:00'), -- Time to generate (HH:MM)
  ('posts_per_generation', '1'),
  ('search_topics', 'software news, technology trends, cybersecurity, cloud computing, AI developments'),
  ('content_style', 'professional'), -- professional, casual, technical
  ('min_word_count', '500'),
  ('max_word_count', '1500'),
  ('auto_publish', '0'), -- 0 = draft, 1 = auto-publish
  ('featured_image_style', 'technology'); -- Style for AI-generated images

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category_id, status, is_ai_generated, published_at, meta_title, meta_description) VALUES
  (
    'Die Zukunft der Software-Lizenzierung: Trends 2026',
    'zukunft-software-lizenzierung-2026',
    'Entdecken Sie die neuesten Trends in der Software-Lizenzierung und wie sie Ihr Geschäft beeinflussen können.',
    '<h2>Einleitung</h2><p>Die Software-Branche entwickelt sich rasant weiter. In diesem Artikel untersuchen wir die wichtigsten Trends für 2026.</p><h2>Cloud-basierte Lizenzen</h2><p>Cloud-Computing verändert die Art und Weise, wie Software lizenziert wird. Immer mehr Unternehmen setzen auf flexible, abonnementbasierte Modelle.</p><h2>Künstliche Intelligenz</h2><p>KI spielt eine zunehmend wichtige Rolle bei der Verwaltung von Software-Lizenzen und der Optimierung von Lizenzkosten.</p><h2>Fazit</h2><p>Die Zukunft der Software-Lizenzierung ist dynamisch und bietet viele Chancen für Innovation.</p>',
    1,
    'published',
    1,
    datetime('now', '-2 days'),
    'Software-Lizenzierung Trends 2026 | SOFTWAREKING24',
    'Erfahren Sie mehr über die neuesten Trends in der Software-Lizenzierung und wie Cloud, KI und flexible Modelle die Branche verändern.'
  ),
  (
    'Windows 11 vs Windows 10: Was ist neu?',
    'windows-11-vs-windows-10',
    'Ein detaillierter Vergleich zwischen Windows 11 und Windows 10 - welches Betriebssystem ist das richtige für Sie?',
    '<h2>Design und Benutzeroberfläche</h2><p>Windows 11 bringt ein komplett überarbeitetes Design mit zentriertem Startmenü und abgerundeten Ecken.</p><h2>Performance</h2><p>Verbesserte Performance durch optimierte Ressourcenverwaltung und DirectStorage-Unterstützung.</p><h2>Sicherheit</h2><p>Enhanced Security Features wie TPM 2.0 Pflicht und Windows Hello.</p><h2>Kompatibilität</h2><p>Wichtige Überlegungen zur Hardware-Kompatibilität vor dem Upgrade.</p>',
    2,
    'published',
    0,
    datetime('now', '-5 days'),
    'Windows 11 vs Windows 10 Vergleich | SOFTWAREKING24',
    'Detaillierter Vergleich von Windows 11 und Windows 10. Design, Performance, Sicherheit und Kompatibilität im Überblick.'
  ),
  (
    'Microsoft Office 365 Tipps für mehr Produktivität',
    'office-365-produktivitaet-tipps',
    '10 praktische Tipps, um Ihre Produktivität mit Microsoft Office 365 zu steigern.',
    '<h2>1. OneDrive optimal nutzen</h2><p>Synchronisieren Sie Ihre Dateien automatisch über alle Geräte hinweg.</p><h2>2. Teams für Zusammenarbeit</h2><p>Microsoft Teams ist das Herzstück der Zusammenarbeit in Office 365.</p><h2>3. Outlook-Tricks</h2><p>Nutzen Sie Quick Steps und Kategorien für effizientes E-Mail-Management.</p><h2>4. Excel Power Query</h2><p>Automatisieren Sie Datenverarbeitung mit Power Query.</p><h2>5. PowerPoint Designer</h2><p>Lassen Sie KI professionelle Präsentationen erstellen.</p>',
    3,
    'published',
    0,
    datetime('now', '-7 days'),
    'Office 365 Produktivitäts-Tipps | SOFTWAREKING24',
    'Steigern Sie Ihre Produktivität mit diesen 10 praktischen Office 365 Tipps. OneDrive, Teams, Outlook, Excel und PowerPoint optimal nutzen.'
  );

-- Insert sample tags
INSERT INTO blog_tags (name, slug) VALUES
  ('Windows', 'windows'),
  ('Microsoft', 'microsoft'),
  ('Office', 'office'),
  ('Cloud', 'cloud'),
  ('AI', 'ai'),
  ('Sicherheit', 'sicherheit'),
  ('Produktivität', 'produktivitaet'),
  ('Lizenzierung', 'lizenzierung');

-- Link posts with tags
INSERT INTO blog_post_tags (post_id, tag_id) VALUES
  (1, 4), (1, 5), (1, 8),
  (2, 1), (2, 2),
  (3, 2), (3, 3), (3, 7);
