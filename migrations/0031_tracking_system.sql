-- Tracking System Migration
-- Adds comprehensive order tracking functionality

-- Tracking Numbers Table
CREATE TABLE IF NOT EXISTS tracking_numbers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  tracking_number TEXT NOT NULL UNIQUE,
  carrier TEXT NOT NULL, -- 'DHL', 'DPD', 'UPS', 'FedEx', 'Hermes', etc.
  carrier_service TEXT, -- 'express', 'standard', 'economy'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'returned'
  current_location TEXT,
  estimated_delivery DATETIME,
  actual_delivery DATETIME,
  shipped_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Tracking Events/History Table
CREATE TABLE IF NOT EXISTS tracking_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tracking_number_id INTEGER NOT NULL,
  event_type TEXT NOT NULL, -- 'created', 'picked_up', 'in_transit', 'arrived_facility', 'out_for_delivery', 'delivered', 'exception', 'failed'
  status TEXT NOT NULL,
  location TEXT,
  description TEXT NOT NULL,
  event_time DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tracking_number_id) REFERENCES tracking_numbers(id) ON DELETE CASCADE
);

-- Carrier Configuration Table
CREATE TABLE IF NOT EXISTS tracking_carriers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE, -- 'DHL', 'DPD', 'UPS', etc.
  code TEXT NOT NULL UNIQUE, -- 'dhl', 'dpd', 'ups'
  tracking_url_template TEXT, -- 'https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode={tracking_number}'
  api_endpoint TEXT,
  api_key TEXT,
  is_active INTEGER DEFAULT 1,
  config TEXT, -- JSON config for carrier-specific settings
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tracking_order ON tracking_numbers(order_id);
CREATE INDEX IF NOT EXISTS idx_tracking_number ON tracking_numbers(tracking_number);
CREATE INDEX IF NOT EXISTS idx_tracking_status ON tracking_numbers(status);
CREATE INDEX IF NOT EXISTS idx_tracking_events_tracking_id ON tracking_events(tracking_number_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_time ON tracking_events(event_time);
CREATE INDEX IF NOT EXISTS idx_carriers_code ON tracking_carriers(code);

-- Insert default carriers
INSERT OR IGNORE INTO tracking_carriers (name, code, tracking_url_template, is_active) VALUES
('DHL', 'dhl', 'https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode={tracking_number}', 1),
('DPD', 'dpd', 'https://www.dpd.com/de/de/empfangen/sendungsverfolgung/?parcelNumber={tracking_number}', 1),
('UPS', 'ups', 'https://www.ups.com/track?tracknum={tracking_number}', 1),
('FedEx', 'fedex', 'https://www.fedex.com/fedextrack/?trknbr={tracking_number}', 1),
('Hermes', 'hermes', 'https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsinformation/#/search/{tracking_number}', 1),
('GLS', 'gls', 'https://gls-group.eu/DE/de/paketverfolgung?match={tracking_number}', 1);

-- Insert sample tracking data for testing
INSERT OR IGNORE INTO tracking_numbers (id, order_id, tracking_number, carrier, carrier_service, status, current_location, estimated_delivery, shipped_at) VALUES
(1, 1, 'DHL123456789DE', 'DHL', 'express', 'in_transit', 'München Verteilzentrum', datetime('now', '+2 days'), datetime('now', '-1 day')),
(2, 2, 'DPD987654321DE', 'DPD', 'standard', 'out_for_delivery', 'Berlin Zustellbasis', datetime('now', '+1 day'), datetime('now', '-2 days')),
(3, 3, 'UPS555666777DE', 'UPS', 'express', 'delivered', 'Hamburg', datetime('now', '-1 hour'), datetime('now', '-3 days')),
(4, 4, 'FDX111222333DE', 'FedEx', 'economy', 'pending', 'Frankfurt Sortierzentrum', datetime('now', '+3 days'), datetime('now')),
(5, 5, 'HER888999000DE', 'Hermes', 'standard', 'in_transit', 'Köln Verteilzentrum', datetime('now', '+2 days'), datetime('now', '-1 day'));

-- Insert sample tracking events
INSERT OR IGNORE INTO tracking_events (tracking_number_id, event_type, status, location, description, event_time) VALUES
-- DHL tracking events
(1, 'created', 'pending', 'Stuttgart Depot', 'Sendung wurde erstellt', datetime('now', '-1 day', '-2 hours')),
(1, 'picked_up', 'picked_up', 'Stuttgart Depot', 'Paket wurde abgeholt', datetime('now', '-1 day', '-1 hour')),
(1, 'in_transit', 'in_transit', 'München Verteilzentrum', 'Paket ist unterwegs', datetime('now', '-3 hours')),

-- DPD tracking events
(2, 'created', 'pending', 'Nürnberg Lager', 'Versandetikette erstellt', datetime('now', '-2 days', '-4 hours')),
(2, 'picked_up', 'picked_up', 'Nürnberg Lager', 'Abholung erfolgt', datetime('now', '-2 days', '-2 hours')),
(2, 'in_transit', 'in_transit', 'Berlin Sortierzentrum', 'In Zustellung', datetime('now', '-1 day')),
(2, 'out_for_delivery', 'out_for_delivery', 'Berlin Zustellbasis', 'Paket wird heute zugestellt', datetime('now', '-2 hours')),

-- UPS tracking events (delivered)
(3, 'created', 'pending', 'Hannover Hub', 'Versand vorbereitet', datetime('now', '-3 days', '-6 hours')),
(3, 'picked_up', 'picked_up', 'Hannover Hub', 'Paket wurde abgeholt', datetime('now', '-3 days', '-4 hours')),
(3, 'in_transit', 'in_transit', 'Hamburg Depot', 'Transport nach Hamburg', datetime('now', '-2 days')),
(3, 'out_for_delivery', 'out_for_delivery', 'Hamburg Zustellung', 'Auslieferung läuft', datetime('now', '-1 hour', '-30 minutes')),
(3, 'delivered', 'delivered', 'Hamburg', 'Zugestellt an Empfänger', datetime('now', '-1 hour')),

-- FedEx tracking events (pending)
(4, 'created', 'pending', 'Frankfurt Sortierzentrum', 'Versandinformationen erhalten', datetime('now', '-1 hour')),

-- Hermes tracking events
(5, 'created', 'pending', 'Dortmund Lager', 'Paket erfasst', datetime('now', '-1 day', '-5 hours')),
(5, 'picked_up', 'picked_up', 'Dortmund Lager', 'Abholung durch Fahrer', datetime('now', '-1 day', '-3 hours')),
(5, 'in_transit', 'in_transit', 'Köln Verteilzentrum', 'Unterwegs zum Ziel', datetime('now', '-4 hours'));
