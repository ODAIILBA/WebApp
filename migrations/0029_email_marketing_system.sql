-- Migration: Email Marketing System
-- Creates tables for email campaigns, templates, subscribers, and tracking

-- Email Campaigns Table
CREATE TABLE IF NOT EXISTS email_campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  from_name TEXT DEFAULT 'SOFTWAREKING24',
  from_email TEXT DEFAULT 'noreply@softwareking24.com',
  template_id INTEGER,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled')),
  campaign_type TEXT DEFAULT 'promotional' CHECK(campaign_type IN ('promotional', 'transactional', 'welcome', 'abandoned_cart', 'newsletter')),
  segment_filter TEXT, -- JSON filter for targeting
  scheduled_at DATETIME,
  sent_at DATETIME,
  total_recipients INTEGER DEFAULT 0,
  total_sent INTEGER DEFAULT 0,
  total_delivered INTEGER DEFAULT 0,
  total_opened INTEGER DEFAULT 0,
  total_clicked INTEGER DEFAULT 0,
  total_bounced INTEGER DEFAULT 0,
  total_unsubscribed INTEGER DEFAULT 0,
  revenue_generated DECIMAL(10,2) DEFAULT 0.00,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES email_templates(id)
);

-- Email Templates Table
CREATE TABLE IF NOT EXISTS email_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  template_type TEXT DEFAULT 'custom' CHECK(template_type IN ('custom', 'welcome', 'abandoned_cart', 'order_confirmation', 'newsletter', 'promotional')),
  thumbnail_url TEXT,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Email Subscribers Table
CREATE TABLE IF NOT EXISTS email_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'unsubscribed', 'bounced', 'complained')),
  subscription_source TEXT, -- 'checkout', 'newsletter', 'manual', etc.
  tags TEXT, -- JSON array of tags
  user_id INTEGER, -- Link to users table if registered
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME,
  last_activity_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Email Logs Table (tracking individual sends)
CREATE TABLE IF NOT EXISTS email_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id INTEGER,
  subscriber_id INTEGER,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
  sent_at DATETIME,
  delivered_at DATETIME,
  opened_at DATETIME,
  clicked_at DATETIME,
  bounced_at DATETIME,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  error_message TEXT,
  tracking_id TEXT UNIQUE, -- Unique ID for tracking
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES email_campaigns(id),
  FOREIGN KEY (subscriber_id) REFERENCES email_subscribers(id)
);

-- Email Click Tracking Table
CREATE TABLE IF NOT EXISTS email_clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  log_id INTEGER NOT NULL,
  campaign_id INTEGER NOT NULL,
  subscriber_id INTEGER,
  url TEXT NOT NULL,
  clicked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  FOREIGN KEY (log_id) REFERENCES email_logs(id),
  FOREIGN KEY (campaign_id) REFERENCES email_campaigns(id),
  FOREIGN KEY (subscriber_id) REFERENCES email_subscribers(id)
);

-- Email Segments Table (for targeted campaigns)
CREATE TABLE IF NOT EXISTS email_segments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  filter_rules TEXT NOT NULL, -- JSON with filter conditions
  subscriber_count INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_created_at ON email_campaigns(created_at);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_status ON email_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_campaign_id ON email_logs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_subscriber_id ON email_logs(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_tracking_id ON email_logs(tracking_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_clicks_log_id ON email_clicks(log_id);
CREATE INDEX IF NOT EXISTS idx_email_clicks_campaign_id ON email_clicks(campaign_id);

-- Insert default email templates
INSERT OR IGNORE INTO email_templates (name, description, subject, html_content, text_content, template_type) VALUES
('Welcome Email', 'Welcome new subscribers', 'Welcome to SOFTWAREKING24!', 
'<!DOCTYPE html><html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h1 style="color: #1a2a4e;">Welcome to SOFTWAREKING24!</h1><p>Thank you for subscribing to our newsletter.</p><p>We''re excited to have you with us.</p><a href="https://softwareking24.com" style="background: #d4af37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Our Store</a></body></html>',
'Welcome to SOFTWAREKING24! Thank you for subscribing to our newsletter.', 'welcome'),

('Abandoned Cart', 'Remind customers about items in cart', 'Your items are waiting for you!', 
'<!DOCTYPE html><html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h1 style="color: #1a2a4e;">Don''t forget your items!</h1><p>You left some great software licenses in your cart.</p><p>Complete your purchase now and start using them right away.</p><a href="{{cart_url}}" style="background: #d4af37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Complete Purchase</a></body></html>',
'Don''t forget your items! Complete your purchase now.', 'abandoned_cart'),

('Newsletter Template', 'Monthly newsletter', 'SOFTWAREKING24 Monthly Update', 
'<!DOCTYPE html><html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h1 style="color: #1a2a4e;">Monthly Newsletter</h1><p>{{content}}</p><hr><p style="font-size: 12px; color: #666;">Unsubscribe: <a href="{{unsubscribe_url}}">Click here</a></p></body></html>',
'Monthly Newsletter - {{content}}', 'newsletter'),

('Promotional Offer', 'Special offers and discounts', 'Special Offer Just for You!', 
'<!DOCTYPE html><html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h1 style="color: #1a2a4e;">Special Offer!</h1><p>Get {{discount}}% off on all software licenses.</p><p>Use code: <strong>{{coupon_code}}</strong></p><a href="{{shop_url}}" style="background: #d4af37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Shop Now</a></body></html>',
'Special Offer! Get {{discount}}% off with code {{coupon_code}}', 'promotional');

-- Insert sample subscribers for testing
INSERT OR IGNORE INTO email_subscribers (email, first_name, last_name, status, subscription_source) VALUES
('test1@example.com', 'Max', 'Mustermann', 'active', 'newsletter'),
('test2@example.com', 'Anna', 'Schmidt', 'active', 'checkout'),
('test3@example.com', 'Peter', 'Weber', 'active', 'newsletter');

-- Insert sample campaign for demo
INSERT OR IGNORE INTO email_campaigns (name, subject, status, campaign_type, total_recipients, total_sent, total_delivered, total_opened, total_clicked, revenue_generated) VALUES
('Welcome Series', 'Welcome to SOFTWAREKING24', 'sent', 'welcome', 1245, 1245, 1200, 687, 234, 12450.00),
('Product Updates', 'New Software Offers', 'sent', 'promotional', 2340, 2340, 2280, 1089, 445, 8900.00),
('20% Discount Campaign', '20% Off All Licenses', 'sent', 'promotional', 3500, 3500, 3450, 2100, 980, 45600.00),
('Abandoned Cart Recovery', 'Your Items Are Waiting', 'sending', 'abandoned_cart', 567, 567, 550, 289, 123, 4560.00);
