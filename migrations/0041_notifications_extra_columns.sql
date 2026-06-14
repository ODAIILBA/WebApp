-- Add missing columns to notifications table
ALTER TABLE notifications ADD COLUMN priority TEXT DEFAULT 'normal';
ALTER TABLE notifications ADD COLUMN read_at DATETIME;
ALTER TABLE notifications ADD COLUMN link_text TEXT;
ALTER TABLE notifications ADD COLUMN icon TEXT;
ALTER TABLE notifications ADD COLUMN metadata TEXT;
