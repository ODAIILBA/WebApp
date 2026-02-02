-- Check and add missing column if needed
ALTER TABLE security_events ADD COLUMN is_blocked INTEGER DEFAULT 0;
