-- System Monitoring Tables

-- Historical metrics storage
CREATE TABLE IF NOT EXISTS system_metrics_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metric_type TEXT NOT NULL,  -- 'cpu', 'memory', 'db_load', 'requests'
    value REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    metadata TEXT  -- JSON for additional info
);

CREATE INDEX idx_metrics_type_time ON system_metrics_history(metric_type, timestamp DESC);

-- Alert thresholds configuration
CREATE TABLE IF NOT EXISTS system_alert_thresholds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metric_type TEXT NOT NULL UNIQUE,
    warning_threshold INTEGER NOT NULL,
    critical_threshold INTEGER NOT NULL,
    enabled INTEGER DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_by TEXT
);

-- System services status
CREATE TABLE IF NOT EXISTS system_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_name TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,  -- 'connected', 'slow', 'disconnected'
    last_check DATETIME DEFAULT CURRENT_TIMESTAMP,
    response_time INTEGER,  -- ms
    metadata TEXT  -- JSON
);

-- System uptime tracking
CREATE TABLE IF NOT EXISTS system_uptime (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    downtime_reason TEXT,
    duration_seconds INTEGER
);

-- Activity logs with full audit trail
CREATE TABLE IF NOT EXISTS system_activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    log_type TEXT NOT NULL,  -- 'info', 'warning', 'error', 'security'
    module TEXT NOT NULL,
    action TEXT NOT NULL,
    user_id INTEGER,
    ip_address TEXT,
    user_agent TEXT,
    details TEXT,  -- JSON
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_type_time ON system_activity_log(log_type, created_at DESC);
CREATE INDEX idx_activity_module ON system_activity_log(module);

-- Monitoring configuration
CREATE TABLE IF NOT EXISTS system_monitor_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key TEXT NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_by TEXT
);

-- Insert default alert thresholds
INSERT OR IGNORE INTO system_alert_thresholds (metric_type, warning_threshold, critical_threshold) VALUES
('cpu', 80, 90),
('memory', 85, 95),
('db_load', 70, 85),
('db_connections', 80, 95);

-- Insert default services to monitor
INSERT OR IGNORE INTO system_services (service_name, status) VALUES
('cloudflare', 'connected'),
('api', 'connected'),
('smtp', 'connected'),
('payment_gateway', 'connected'),
('license_server', 'connected'),
('storage_s3', 'connected'),
('redis', 'connected'),
('queue_worker', 'connected');

-- Insert initial uptime record (system start)
INSERT INTO system_uptime (start_time) VALUES (datetime('now'));

-- Insert default monitoring configuration
INSERT OR IGNORE INTO system_monitor_config (config_key, config_value) VALUES
('auto_refresh_enabled', '1'),
('refresh_interval_seconds', '5'),
('metrics_retention_days', '30'),
('alert_email_enabled', '0'),
('alert_email_recipients', '');

-- Insert sample activity logs
INSERT INTO system_activity_log (log_type, module, action, details) VALUES
('info', 'system', 'startup', '{"version": "1.0.0", "environment": "production"}'),
('info', 'database', 'backup_created', '{"size_mb": 45, "duration_seconds": 12}'),
('info', 'maintenance', 'routine_check', '{"tasks_completed": 8, "issues_found": 0}');
