import type { FC } from 'hono/jsx'

export const AdminTracking: FC = () => {
  return (
    <div class="admin-tracking">
      <div class="admin-header">
        <h2><i class="fas fa-map-marker-alt"></i> Tracking Management</h2>
        <div class="header-actions">
          <button class="btn-secondary" onclick="openAddTrackingModal()">
            <i class="fas fa-plus"></i> Neue Tracking-Nummer
          </button>
          <button class="btn-primary" onclick="refreshTracking()">
            <i class="fas fa-sync"></i> Aktualisieren
          </button>
        </div>
      </div>

      {/* Real-Time Tracking Stats */}
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

      {/* Filters */}
      <div class="admin-card">
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
          <select id="filter-status" onchange="filterTracking()" class="form-control" style="width: 200px;">
            <option value="all">Alle Status</option>
            <option value="pending">Ausstehend</option>
            <option value="picked_up">Abgeholt</option>
            <option value="in_transit">In Zustellung</option>
            <option value="out_for_delivery">Auslieferung</option>
            <option value="delivered">Zugestellt</option>
            <option value="failed">Fehlgeschlagen</option>
          </select>
          <select id="filter-carrier" onchange="filterTracking()" class="form-control" style="width: 200px;">
            <option value="all">Alle Versanddienstleister</option>
            <option value="DHL">DHL</option>
            <option value="DPD">DPD</option>
            <option value="UPS">UPS</option>
            <option value="FedEx">FedEx</option>
            <option value="Hermes">Hermes</option>
            <option value="GLS">GLS</option>
          </select>
        </div>
      </div>

      {/* Recent Events Timeline */}
      <div class="admin-card">
        <h3><i class="fas fa-stream"></i> Neueste Tracking-Events</h3>
        <div class="events-timeline" id="events-timeline">
          <div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Lade Events...</div>
        </div>
      </div>

      {/* Tracking Table */}
      <div class="admin-card">
        <h3><i class="fas fa-truck"></i> Tracking-Übersicht</h3>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Tracking-Nummer</th>
                <th>Bestellung</th>
                <th>Kunde</th>
                <th>Versanddienstleister</th>
                <th>Status</th>
                <th>Aktueller Standort</th>
                <th>ETA</th>
                <th>Letztes Update</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody id="tracking-tbody">
              <tr>
                <td colspan="9" style="text-align: center; padding: 40px;">
                  <i class="fas fa-spinner fa-spin" style="font-size: 32px; color: #1a2a4e;"></i>
                  <div style="margin-top: 15px;">Lade Tracking-Daten...</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Tracking Modal */}
      <div id="tracking-modal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3><i class="fas fa-plus"></i> <span id="modal-title">Neue Tracking-Nummer</span></h3>
            <button class="modal-close" onclick="closeTrackingModal()">&times;</button>
          </div>
          <div class="modal-body">
            <form id="tracking-form">
              <input type="hidden" id="tracking-id" />
              
              <div class="form-group">
                <label>Bestellung *</label>
                <input type="number" id="tracking-order-id" class="form-control" required />
              </div>
              
              <div class="form-group">
                <label>Tracking-Nummer *</label>
                <input type="text" id="tracking-number" class="form-control" required />
              </div>
              
              <div class="form-group">
                <label>Versanddienstleister *</label>
                <select id="tracking-carrier" class="form-control" required>
                  <option value="">Bitte wählen...</option>
                  <option value="DHL">DHL</option>
                  <option value="DPD">DPD</option>
                  <option value="UPS">UPS</option>
                  <option value="FedEx">FedEx</option>
                  <option value="Hermes">Hermes</option>
                  <option value="GLS">GLS</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Service</label>
                <select id="tracking-service" class="form-control">
                  <option value="standard">Standard</option>
                  <option value="express">Express</option>
                  <option value="economy">Economy</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Status</label>
                <select id="tracking-status" class="form-control">
                  <option value="pending">Ausstehend</option>
                  <option value="picked_up">Abgeholt</option>
                  <option value="in_transit">In Zustellung</option>
                  <option value="out_for_delivery">Auslieferung</option>
                  <option value="delivered">Zugestellt</option>
                  <option value="failed">Fehlgeschlagen</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Aktueller Standort</label>
                <input type="text" id="tracking-location" class="form-control" />
              </div>
              
              <div class="form-group">
                <label>Voraussichtliche Lieferung</label>
                <input type="datetime-local" id="tracking-eta" class="form-control" />
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn-secondary" onclick="closeTrackingModal()">Abbrechen</button>
                <button type="submit" class="btn-primary">Speichern</button>
              </div>
            </form>
          </div>
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
            <div id="tracking-detail-content">
              <div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Lade Details...</div>
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
        .events-timeline {
          max-height: 400px;
          overflow-y: auto;
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
        .event-marker.delivered { background: #28a745; }
        .event-marker.in_transit { background: #17a2b8; }
        .event-marker.pending { background: #ffc107; }
        .event-marker.failed { background: #dc3545; }
        .event-marker.picked_up { background: #6c757d; }
        .event-marker.out_for_delivery { background: #007bff; }
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
        .tracking-link {
          color: #1a2a4e;
          text-decoration: none;
          font-weight: 600;
        }
        .tracking-link:hover {
          text-decoration: underline;
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
        .detail-row {
          padding: 10px 0;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: 600;
          color: #666;
        }
        .detail-value {
          color: #1a2a4e;
        }
        .loading-spinner {
          text-align: center;
          padding: 40px;
          color: #999;
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
        let trackingsData = [];
        let eventsData = [];

        // Load dashboard stats
        async function loadStats() {
          try {
            const response = await fetch('/api/tracking/dashboard');
            const data = await response.json();
            if (data.success) {
              document.getElementById('track-delivered').textContent = data.stats.delivered || 0;
              document.getElementById('track-transit').textContent = data.stats.in_transit + data.stats.out_for_delivery || 0;
              document.getElementById('track-pending').textContent = data.stats.pending + data.stats.picked_up || 0;
              document.getElementById('track-failed').textContent = data.stats.failed || 0;
            }
          } catch (error) {
            console.error('Error loading stats:', error);
          }
        }

        // Load recent events
        async function loadEvents() {
          try {
            const response = await fetch('/api/tracking/events/recent?limit=10');
            const data = await response.json();
            if (data.success) {
              eventsData = data.events;
              renderEvents();
            }
          } catch (error) {
            console.error('Error loading events:', error);
          }
        }

        function renderEvents() {
          const timeline = document.getElementById('events-timeline');
          if (eventsData.length === 0) {
            timeline.innerHTML = '<div style="text-align: center; padding: 20px; color: #999;">Keine Events vorhanden</div>';
            return;
          }
          
          timeline.innerHTML = eventsData.map(event => \`
            <div class="event-item">
              <div class="event-marker \${event.status}">
                <i class="fas fa-\${getEventIcon(event.status)}"></i>
              </div>
              <div class="event-content">
                <div class="event-title">\${event.description}</div>
                <div class="event-meta">
                  <a href="#" class="tracking-link" onclick="viewTrackingById(\${event.tracking_number_id}); return false;">
                    \${event.tracking_number}
                  </a>
                  • \${event.carrier} • \${event.order_number || 'N/A'}
                </div>
                <div class="event-time">\${formatDateTime(event.event_time)}</div>
              </div>
            </div>
          \`).join('');
        }

        function getEventIcon(status) {
          const icons = {
            delivered: 'check',
            in_transit: 'shipping-fast',
            out_for_delivery: 'truck',
            pending: 'clock',
            picked_up: 'box',
            failed: 'times'
          };
          return icons[status] || 'info';
        }

        // Load trackings
        async function loadTrackings() {
          try {
            const status = document.getElementById('filter-status').value;
            const carrier = document.getElementById('filter-carrier').value;
            
            const params = new URLSearchParams();
            if (status !== 'all') params.append('status', status);
            if (carrier !== 'all') params.append('carrier', carrier);
            
            const response = await fetch('/api/tracking?' + params.toString());
            const data = await response.json();
            if (data.success) {
              trackingsData = data.trackings;
              renderTrackings();
            }
          } catch (error) {
            console.error('Error loading trackings:', error);
            showToast('Fehler beim Laden der Tracking-Daten', 'error');
          }
        }

        function renderTrackings() {
          const tbody = document.getElementById('tracking-tbody');
          if (trackingsData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 40px;">Keine Tracking-Daten vorhanden</td></tr>';
            return;
          }
          
          tbody.innerHTML = trackingsData.map(t => \`
            <tr>
              <td><strong>\${t.tracking_number}</strong></td>
              <td>\${t.order_number || 'N/A'}</td>
              <td>\${t.customer_email || 'N/A'}</td>
              <td><span class="badge badge-info">\${t.carrier}</span></td>
              <td><span class="status-badge status-\${t.status}">\${getStatusLabel(t.status)}</span></td>
              <td>\${t.current_location || '-'}</td>
              <td>\${t.estimated_delivery ? formatDateTime(t.estimated_delivery) : '-'}</td>
              <td>\${formatDateTime(t.updated_at)}</td>
              <td>
                <button class="action-btn btn-view" onclick="viewTrackingById(\${t.id})" title="Details anzeigen">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn btn-edit" onclick="editTracking(\${t.id})" title="Bearbeiten">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn btn-delete" onclick="deleteTracking(\${t.id})" title="Löschen">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          \`).join('');
        }

        function getStatusLabel(status) {
          const labels = {
            pending: 'Ausstehend',
            picked_up: 'Abgeholt',
            in_transit: 'In Zustellung',
            out_for_delivery: 'Auslieferung',
            delivered: 'Zugestellt',
            failed: 'Fehlgeschlagen'
          };
          return labels[status] || status;
        }

        // View tracking details
        async function viewTrackingById(id) {
          try {
            const response = await fetch(\`/api/tracking/\${id}\`);
            const data = await response.json();
            if (data.success) {
              showTrackingDetail(data.tracking, data.events);
            }
          } catch (error) {
            console.error('Error loading tracking details:', error);
            showToast('Fehler beim Laden der Details', 'error');
          }
        }

        function showTrackingDetail(tracking, events) {
          const content = document.getElementById('tracking-detail-content');
          content.innerHTML = \`
            <div class="tracking-detail-grid">
              <div class="detail-section">
                <h4>Tracking-Informationen</h4>
                <div class="detail-row">
                  <span class="detail-label">Tracking-Nummer:</span>
                  <span class="detail-value">\${tracking.tracking_number}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Versanddienstleister:</span>
                  <span class="detail-value">\${tracking.carrier}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Service:</span>
                  <span class="detail-value">\${tracking.carrier_service}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Status:</span>
                  <span class="status-badge status-\${tracking.status}">\${getStatusLabel(tracking.status)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Standort:</span>
                  <span class="detail-value">\${tracking.current_location || '-'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">ETA:</span>
                  <span class="detail-value">\${tracking.estimated_delivery ? formatDateTime(tracking.estimated_delivery) : '-'}</span>
                </div>
              </div>
              
              <div class="detail-section">
                <h4>Bestellinformationen</h4>
                <div class="detail-row">
                  <span class="detail-label">Bestellung:</span>
                  <span class="detail-value">\${tracking.order_number || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Kunde:</span>
                  <span class="detail-value">\${tracking.customer_name || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">E-Mail:</span>
                  <span class="detail-value">\${tracking.customer_email || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Betrag:</span>
                  <span class="detail-value">€\${tracking.total || '0.00'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Versand:</span>
                  <span class="detail-value">\${tracking.shipped_at ? formatDateTime(tracking.shipped_at) : '-'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Zugestellt:</span>
                  <span class="detail-value">\${tracking.actual_delivery ? formatDateTime(tracking.actual_delivery) : '-'}</span>
                </div>
              </div>
            </div>
            
            <div class="detail-section" style="margin-top: 20px;">
              <h4>Tracking-Verlauf</h4>
              <div class="events-timeline">
                \${events.map(e => \`
                  <div class="event-item">
                    <div class="event-marker \${e.status}">
                      <i class="fas fa-\${getEventIcon(e.status)}"></i>
                    </div>
                    <div class="event-content">
                      <div class="event-title">\${e.description}</div>
                      <div class="event-meta">\${e.location || '-'}</div>
                      <div class="event-time">\${formatDateTime(e.event_time)}</div>
                    </div>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`;
          document.getElementById('tracking-detail-modal').style.display = 'block';
        }

        function closeTrackingDetail() {
          document.getElementById('tracking-detail-modal').style.display = 'none';
        }

        // Add/Edit tracking
        function openAddTrackingModal() {
          document.getElementById('modal-title').textContent = 'Neue Tracking-Nummer';
          document.getElementById('tracking-form').reset();
          document.getElementById('tracking-id').value = '';
          document.getElementById('tracking-modal').style.display = 'block';
        }

        function closeTrackingModal() {
          document.getElementById('tracking-modal').style.display = 'none';
        }

        async function editTracking(id) {
          const tracking = trackingsData.find(t => t.id === id);
          if (!tracking) return;
          
          document.getElementById('modal-title').textContent = 'Tracking bearbeiten';
          document.getElementById('tracking-id').value = tracking.id;
          document.getElementById('tracking-order-id').value = tracking.order_id;
          document.getElementById('tracking-number').value = tracking.tracking_number;
          document.getElementById('tracking-carrier').value = tracking.carrier;
          document.getElementById('tracking-service').value = tracking.carrier_service;
          document.getElementById('tracking-status').value = tracking.status;
          document.getElementById('tracking-location').value = tracking.current_location || '';
          if (tracking.estimated_delivery) {
            document.getElementById('tracking-eta').value = new Date(tracking.estimated_delivery).toISOString().slice(0, 16);
          }
          document.getElementById('tracking-modal').style.display = 'block';
        }

        document.getElementById('tracking-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const id = document.getElementById('tracking-id').value;
          const data = {
            order_id: document.getElementById('tracking-order-id').value,
            tracking_number: document.getElementById('tracking-number').value,
            carrier: document.getElementById('tracking-carrier').value,
            carrier_service: document.getElementById('tracking-service').value,
            status: document.getElementById('tracking-status').value,
            current_location: document.getElementById('tracking-location').value,
            estimated_delivery: document.getElementById('tracking-eta').value || null
          };
          
          try {
            const url = id ? \`/api/tracking/\${id}\` : '/api/tracking';
            const method = id ? 'PUT' : 'POST';
            const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
              showToast(id ? 'Tracking aktualisiert' : 'Tracking erstellt', 'success');
              closeTrackingModal();
              refreshTracking();
            } else {
              showToast(result.error || 'Fehler beim Speichern', 'error');
            }
          } catch (error) {
            console.error('Error saving tracking:', error);
            showToast('Fehler beim Speichern', 'error');
          }
        });

        async function deleteTracking(id) {
          if (!confirm('Tracking-Nummer wirklich löschen?')) return;
          
          try {
            const response = await fetch(\`/api/tracking/\${id}\`, { method: 'DELETE' });
            const result = await response.json();
            if (result.success) {
              showToast('Tracking gelöscht', 'success');
              refreshTracking();
            }
          } catch (error) {
            console.error('Error deleting tracking:', error);
            showToast('Fehler beim Löschen', 'error');
          }
        }

        function filterTracking() {
          loadTrackings();
        }

        function refreshTracking() {
          loadStats();
          loadEvents();
          loadTrackings();
        }

        function formatDateTime(datetime) {
          if (!datetime) return '-';
          const date = new Date(datetime);
          return date.toLocaleString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          });
        }

        function showToast(message, type = 'info') {
          // Use existing toast system
          if (window.showToast) {
            window.showToast(message, type);
          } else {
            alert(message);
          }
        }

        // Initialize
        refreshTracking();
        
        // Auto-refresh every 30 seconds
        setInterval(() => {
          loadStats();
          loadEvents();
        }, 30000);
      ` }} ></script>
    </div>
  )
}
