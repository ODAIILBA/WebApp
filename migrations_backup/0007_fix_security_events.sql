-- Drop and recreate security_events table with proper schema
DROP TABLE IF EXISTS security_events;

CREATE TABLE security_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  request_path TEXT,
  request_method TEXT,
  attack_type TEXT,
  details TEXT,
  is_blocked INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_security_events_type ON security_events(event_type);
CREATE INDEX idx_security_events_ip ON security_events(ip_address);
CREATE INDEX idx_security_events_created ON security_events(created_at);
