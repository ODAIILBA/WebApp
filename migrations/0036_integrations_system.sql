-- Integrations System
-- Store API keys and configuration for third-party integrations

CREATE TABLE IF NOT EXISTS integrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'payment', 'email', 'analytics', 'shipping', 'social'
  description TEXT,
  icon_class TEXT, -- FontAwesome icon class
  icon_color TEXT, -- Icon background color
  is_active INTEGER DEFAULT 0, -- 0=inactive, 1=active
  api_key TEXT, -- Encrypted API key
  api_secret TEXT, -- Encrypted API secret
  webhook_url TEXT,
  config_json TEXT, -- JSON string for additional configuration
  last_sync_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Integration usage statistics
CREATE TABLE IF NOT EXISTS integration_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  integration_id INTEGER NOT NULL,
  metric_name TEXT NOT NULL, -- 'transactions', 'subscribers', 'pageviews', etc.
  metric_value TEXT,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (integration_id) REFERENCES integrations(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_integrations_category ON integrations(category);
CREATE INDEX IF NOT EXISTS idx_integrations_active ON integrations(is_active);
CREATE INDEX IF NOT EXISTS idx_integration_stats_integration ON integration_stats(integration_id);

-- Insert sample integrations (with empty API keys)
INSERT INTO integrations (name, display_name, category, description, icon_class, icon_color, is_active) VALUES
-- Payment
('stripe', 'Stripe', 'payment', 'Kreditkarten & Online-Zahlungen', 'fab fa-stripe', 'indigo', 0),
('paypal', 'PayPal', 'payment', 'Online-Zahlungen & Express Checkout', 'fab fa-paypal', 'blue', 1),
('klarna', 'Klarna', 'payment', 'Kauf auf Rechnung & Ratenzahlung', 'fas fa-credit-card', 'pink', 0),

-- Email Marketing
('mailchimp', 'Mailchimp', 'email', 'Newsletter & Marketing Automation', 'fas fa-envelope', 'purple', 1),
('sendgrid', 'SendGrid', 'email', 'Transaktions-E-Mails', 'fas fa-paper-plane', 'gray', 0),

-- Analytics
('google_analytics', 'Google Analytics', 'analytics', 'Website Analytics & Tracking', 'fab fa-google', 'red', 1),
('facebook_pixel', 'Facebook Pixel', 'analytics', 'Facebook Ads Tracking', 'fab fa-facebook', 'blue', 0),
('hotjar', 'Hotjar', 'analytics', 'Heatmaps & Session Recordings', 'fas fa-chart-area', 'orange', 0),

-- Shipping
('dhl', 'DHL', 'shipping', 'Versandlabels & Tracking', 'fas fa-shipping-fast', 'yellow', 1),
('dpd', 'DPD', 'shipping', 'Paketversand & Tracking', 'fas fa-truck', 'red', 0),
('ups', 'UPS', 'shipping', 'Internationaler Versand', 'fas fa-box', 'brown', 0),

-- Social Media
('instagram', 'Instagram', 'social', 'Social Commerce & Posts', 'fab fa-instagram', 'pink', 0),
('facebook', 'Facebook', 'social', 'Facebook Shop Integration', 'fab fa-facebook', 'blue', 1),
('tiktok', 'TikTok', 'social', 'TikTok Shopping', 'fab fa-tiktok', 'black', 0);

-- Insert sample stats for active integrations
INSERT INTO integration_stats (integration_id, metric_name, metric_value) VALUES
(2, 'transactions_30d', '892'),
(2, 'api_version', 'v2'),
(4, 'subscribers', '3,456'),
(4, 'last_sync', 'vor 5 Min'),
(6, 'pageviews_30d', '125,890'),
(6, 'conversion_rate', '2.8%'),
(9, 'shipments_30d', '456'),
(9, 'avg_delivery_time', '2.3 Tage'),
(12, 'followers', '8,234'),
(12, 'engagement_rate', '4.2%');
