import type { FC } from 'hono/jsx'

export const AdminTracking: FC = () => {
  return (
    <div class="admin-tracking">
      <div class="admin-header">
        <h2><i class="fas fa-map-marker-alt"></i> Tracking Management</h2>
        <div class="header-actions">
          <button class="btn-primary" onclick="refreshTracking()">
            <i class="fas fa-sync"></i> Aktualisieren
          </button>
          <button class="btn-secondary" onclick="exportTrackingReport()">
            <i class="fas fa-file-export"></i> Bericht exportieren
          </button>
        </div>
      </div>

      {/* Real-Time Tracking Overview */}
      <div class="tracking-stats">
        <div class="track-stat delivered">
          <div class="track-icon"><i class="fas fa-check-circle"></i></div>
          <div class="track-info">
            <div class="track-value" id="track-delivered">0</div>
            <div class="track-label">Zugestellt</div>
          </div>
        </div>
        <div class="track-stat in-transit">
          <div class="track-icon"><i class="fas fa-shipping-fast"></i></div>
          <div class="track-info">
            <div class="track-value" id="track-transit">0</div>
            <div class="track-label">In Zustellung</div>
          </div>
        </div>
        <div class="track-stat pending">
          <div class="track-icon"><i class="fas fa-clock"></i></div>
          <div class="track-info">
            <div class="track-value" id="track-pending">0</div>
            <div class="track-label">Ausstehend</div>
          </div>
        </div>
        <div class="track-stat failed">
          <div class="track-icon"><i class="fas fa-exclamation-triangle"></i></div>
          <div class="track-info">
            <div class="track-value" id="track-failed">0</div>
            <div class="track-label">Fehlgeschlagen</div>
          </div>
        </div>
      </div>

      {/* Live Tracking Map */}
      <div class="admin-card">
        <h3><i class="fas fa-map"></i> Live Tracking Overview</h3>
        <div class="tracking-map" id="tracking-map">
          <div class="map-placeholder">
            <i class="fas fa-globe" style="font-size: 48px; color: #ccc;"></i>
            <p>Tracking Map Visualization</p>
            <p style="font-size: 14px; color: #999;">Integration mit Google Maps / Mapbox</p>
          </div>
        </div>
      </div>

      {/* Tracking Events Timeline */}
      <div class="admin-card">
        <h3><i class="fas fa-stream"></i> Recent Tracking Events</h3>
        <div class="events-timeline" id="events-timeline"></div>
      </div>

      {/* Active Deliveries Table */}
      <div class="admin-card">
        <h3><i class="fas fa-truck"></i> Active Deliveries</h3>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Bestellung</th>
                <th>Kunde</th>
                <th>Status</th>
                <th>Fortschritt</th>
                <th>Letztes Update</th>
                <th>ETA</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody id="active-deliveries-tbody"></tbody>
          </table>
        </div>
      </div>

      {/* Tracking Detail Modal */}
      <div id="tracking-detail-modal" class="modal">
        <div class="modal-content large">
          <div class="modal-header">
            <h3><i class="fas fa-info-circle"></i> Tracking Details</h3>
            <button class="modal-close" onclick="closeTrackingDetail()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="tracking-detail-grid">
              <div class="detail-section">
                <h4>Bestellinformationen</h4>
                <div id="order-tracking-info"></div>
              </div>
              <div class="detail-section">
                <h4>Tracking-Verlauf</h4>
                <div id="tracking-history"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-tracking {
          padding: 20px;
        }
        .tracking-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .track-stat {
          background: white;
          border-radius: 10px;
          padding: 25px;
          display: flex;
          gap: 20px;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-left: 4px solid;
        }
        .track-stat.delivered { border-left-color: #28a745; }
        .track-stat.in-transit { border-left-color: #17a2b8; }
        .track-stat.pending { border-left-color: #ffc107; }
        .track-stat.failed { border-left-color: #dc3545; }
        .track-icon {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: white;
        }
        .track-stat.delivered .track-icon { background: #28a745; }
        .track-stat.in-transit .track-icon { background: #17a2b8; }
        .track-stat.pending .track-icon { background: #ffc107; }
        .track-stat.failed .track-icon { background: #dc3545; }
        .track-info {
          flex: 1;
        }
        .track-value {
          font-size: 36px;
          font-weight: bold;
          color: #1a2a4e;
          margin-bottom: 5px;
        }
        .track-label {
          font-size: 14px;
          color: #666;
        }
        .tracking-map {
          height: 400px;
          background: #f8f9fa;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .map-placeholder {
          padding: 40px;
        }
        .map-placeholder p {
          margin: 10px 0;
          color: #666;
        }
        .events-timeline {
          padding: 20px;
        }
        .event-item {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .event-item:last-child {
          border-bottom: none;
        }
        .event-marker {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 18px;
          color: white;
        }
        .event-marker.success { background: #28a745; }
        .event-marker.warning { background: #ffc107; }
        .event-marker.info { background: #17a2b8; }
        .event-marker.danger { background: #dc3545; }
        .event-content {
          flex: 1;
        }
        .event-title {
          font-weight: 600;
          color: #1a2a4e;
          margin-bottom: 5px;
        }
        .event-meta {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }
        .event-time {
          font-size: 12px;
          color: #999;
        }
        .progress-bar-container {
          width: 100%;
          height: 8px;
          background: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #1a2a4e, #d4af37);
          transition: width 0.3s ease;
        }
        .tracking-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .detail-section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
        }
        .detail-section h4 {
          color: #1a2a4e;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #ddd;
        }
        @media (max-width: 768px) {
          .tracking-stats {
            grid-template-columns: 1fr;
          }
          .tracking-detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        function loadTrackingData() {
          // Load stats
          document.getElementById('track-delivered').textContent = '1,456';
          document.getElementById('track-transit').textContent = '87';
          document.getElementById('track-pending').textContent = '23';
          document.getElementById('track-failed').textContent = '5';
          
          // Load events timeline
          const events = [
            {
              type: 'success',
              title: 'Lieferung abgeschlossen',
              meta: 'ORD-2024-1234 • Max Mustermann',
              time: 'Gerade eben'
            },
            {
              type: 'info',
              title: 'E-Mail zugestellt',
              meta: 'ORD-2024-1235 • anna@example.com',
              time: 'Vor 2 Minuten'
            },
            {
              type: 'warning',
              title: 'Wiederholungsversuch',
              meta: 'ORD-2024-1236 • peter@example.com',
              time: 'Vor 5 Minuten'
            },
            {
              type: 'danger',
              title: 'Lieferung fehlgeschlagen',
              meta: 'ORD-2024-1237 • lisa@example.com',
              time: 'Vor 10 Minuten'
            }
          ];
          
          const timeline = document.getElementById('events-timeline');
          timeline.innerHTML = events.map(event => \`
            <div class="event-item">
              <div class="event-marker \${event.type}">
                <i class="fas fa-\${event.type === 'success' ? 'check' : event.type === 'danger' ? 'times' : event.type === 'warning' ? 'exclamation' : 'info'}"></i>
              </div>
              <div class="event-content">
                <div class="event-title">\${event.title}</div>
                <div class="event-meta">\${event.meta}</div>
                <div class="event-time">\${event.time}</div>
              </div>
            </div>
          \`).join('');
          
          // Load active deliveries
          const deliveries = [
            {
              trackingId: 'TRK-2024-0001',
              orderId: 'ORD-2024-1238',
              customer: 'Thomas Fischer',
              status: 'in_transit',
              progress: 75,
              lastUpdate: new Date().toISOString(),
              eta: '2 Minuten'
            },
            {
              trackingId: 'TRK-2024-0002',
              orderId: 'ORD-2024-1239',
              customer: 'Sarah Schneider',
              status: 'pending',
              progress: 25,
              lastUpdate: new Date(Date.now() - 300000).toISOString(),
              eta: '5 Minuten'
            }
          ];
          
          const tbody = document.getElementById('active-deliveries-tbody');
          tbody.innerHTML = deliveries.map(d => \`
            <tr>
              <td><strong>\${d.trackingId}</strong></td>
              <td>\${d.orderId}</td>
              <td>\${d.customer}</td>
              <td><span class="status-badge status-\${d.status}">\${d.status.replace('_', ' ').toUpperCase()}</span></td>
              <td>
                <div class="progress-bar-container">
                  <div class="progress-bar" style="width: \${d.progress}%"></div>
                </div>
                <div style="font-size: 12px; margin-top: 5px;">\${d.progress}%</div>
              </td>
              <td>\${new Date(d.lastUpdate).toLocaleTimeString('de-DE')}</td>
              <td>\${d.eta}</td>
              <td>
                <button class="action-btn btn-view" onclick="viewTrackingDetail('\${d.trackingId}')">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
          \`).join('');
        }
        
        function refreshTracking() {
          loadTrackingData();
          alert('Tracking-Daten aktualisiert');
        }
        
        function exportTrackingReport() {
          alert('Tracking-Bericht wird exportiert...');
        }
        
        function viewTrackingDetail(trackingId) {
          document.getElementById('tracking-detail-modal').style.display = 'block';
          // Load tracking details
        }
        
        function closeTrackingDetail() {
          document.getElementById('tracking-detail-modal').style.display = 'none';
        }
        
        // Initialize
        loadTrackingData();
        
        // Auto-refresh every 15 seconds
        setInterval(loadTrackingData, 15000);
      ` }} ></script>
    </div>
  )
}
