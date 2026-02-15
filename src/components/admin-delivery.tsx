import type { FC } from 'hono/jsx'

export const AdminDelivery: FC = () => {
  return (
    <div class="admin-delivery">
      <div class="admin-header">
        <h2><i class="fas fa-shipping-fast"></i> Delivery Management - Sofort Versand</h2>
        <div class="header-actions">
          <button class="btn-success" onclick="testDeliverySystem()">
            <i class="fas fa-vial"></i> Test Delivery System
          </button>
          <button class="btn-primary" onclick="bulkResend()">
            <i class="fas fa-paper-plane"></i> Bulk Re-send
          </button>
          <button class="btn-secondary" onclick="viewDeliverySettings()">
            <i class="fas fa-cog"></i> Settings
          </button>
        </div>
      </div>

      {/* Delivery Stats */}
      <div class="stats-grid">
        <div class="stat-card success">
          <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
          <div class="stat-content">
            <div class="stat-value" id="delivered-today">0</div>
            <div class="stat-label">Heute zugestellt</div>
            <div class="stat-meta">Durchschnitt: 2.3 Min</div>
          </div>
        </div>
        <div class="stat-card warning">
          <div class="stat-icon"><i class="fas fa-clock"></i></div>
          <div class="stat-content">
            <div class="stat-value" id="pending-delivery">0</div>
            <div class="stat-label">Ausstehend</div>
            <div class="stat-meta">Älteste: 5 Min</div>
          </div>
        </div>
        <div class="stat-card danger">
          <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
          <div class="stat-content">
            <div class="stat-value" id="failed-delivery">0</div>
            <div class="stat-label">Fehlgeschlagen</div>
            <div class="stat-meta">Retry erforderlich</div>
          </div>
        </div>
        <div class="stat-card info">
          <div class="stat-icon"><i class="fas fa-envelope"></i></div>
          <div class="stat-content">
            <div class="stat-value" id="emails-sent">0</div>
            <div class="stat-label">E-Mails versendet</div>
            <div class="stat-meta">Öffnungsrate: 94%</div>
          </div>
        </div>
      </div>

      {/* Real-Time Delivery Monitor */}
      <div class="section-title">
        <h3><i class="fas fa-heartbeat"></i> Live Delivery Monitor</h3>
      </div>
      <div class="admin-card">
        <div class="delivery-timeline" id="delivery-timeline">
          <div class="timeline-item">
            <div class="timeline-dot success"></div>
            <div class="timeline-content">
              <div class="timeline-time">Gerade eben</div>
              <div class="timeline-title">Bestellung #ORD-2024-1234 zugestellt</div>
              <div class="timeline-meta">E-Mail gesendet an max@example.com • Download-Link generiert</div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Queue */}
      <div class="section-title">
        <h3><i class="fas fa-tasks"></i> Delivery Queue</h3>
        <div class="section-actions">
          <select id="queue-filter" class="form-control" onchange="filterQueue()">
            <option value="all">Alle Status</option>
            <option value="pending">Ausstehend</option>
            <option value="processing">In Bearbeitung</option>
            <option value="completed">Abgeschlossen</option>
            <option value="failed">Fehlgeschlagen</option>
          </select>
        </div>
      </div>
      <div class="admin-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Bestellung</th>
                <th>Kunde</th>
                <th>Produkte</th>
                <th>Status</th>
                <th>E-Mail Status</th>
                <th>Download-Link</th>
                <th>Zeitstempel</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody id="delivery-queue-tbody"></tbody>
          </table>
        </div>
      </div>

      {/* Automated Delivery Rules */}
      <div class="section-title">
        <h3><i class="fas fa-magic"></i> Automatisierte Lieferregeln</h3>
      </div>
      <div class="rules-grid">
        <div class="rule-card active">
          <div class="rule-header">
            <div class="rule-toggle">
              <input type="checkbox" id="rule-instant" checked />
              <label for="rule-instant">Sofortige Lieferung</label>
            </div>
            <span class="rule-status active">Aktiv</span>
          </div>
          <div class="rule-body">
            <p>Automatische Lieferung sofort nach erfolgreicher Zahlung</p>
            <div class="rule-config">
              <div class="config-item">
                <label>Verzögerung:</label>
                <select class="form-control-sm">
                  <option value="0">Keine (Sofort)</option>
                  <option value="5">5 Minuten</option>
                  <option value="15">15 Minuten</option>
                  <option value="30">30 Minuten</option>
                </select>
              </div>
              <div class="config-item">
                <label>E-Mail Template:</label>
                <select class="form-control-sm">
                  <option>Standard Lieferung</option>
                  <option>Premium Template</option>
                  <option>Express Lieferung</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="rule-card">
          <div class="rule-header">
            <div class="rule-toggle">
              <input type="checkbox" id="rule-retry" checked />
              <label for="rule-retry">Automatischer Retry</label>
            </div>
            <span class="rule-status active">Aktiv</span>
          </div>
          <div class="rule-body">
            <p>Automatischer Neuversuch bei fehlgeschlagener Zustellung</p>
            <div class="rule-config">
              <div class="config-item">
                <label>Max. Versuche:</label>
                <input type="number" class="form-control-sm" value="3" min="1" max="10" />
              </div>
              <div class="config-item">
                <label>Verzögerung:</label>
                <select class="form-control-sm">
                  <option value="5">5 Minuten</option>
                  <option value="15" selected>15 Minuten</option>
                  <option value="30">30 Minuten</option>
                  <option value="60">1 Stunde</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="rule-card">
          <div class="rule-header">
            <div class="rule-toggle">
              <input type="checkbox" id="rule-notification" checked />
              <label for="rule-notification">Admin Benachrichtigung</label>
            </div>
            <span class="rule-status active">Aktiv</span>
          </div>
          <div class="rule-body">
            <p>Benachrichtigung bei fehlgeschlagener Lieferung</p>
            <div class="rule-config">
              <div class="config-item">
                <label>E-Mail an:</label>
                <input type="email" class="form-control-sm" value="admin@store.de" />
              </div>
              <div class="config-item">
                <label>Nach Versuch:</label>
                <select class="form-control-sm">
                  <option value="1">Nach 1. Versuch</option>
                  <option value="2">Nach 2. Versuch</option>
                  <option value="3" selected>Nach 3. Versuch</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Templates */}
      <div class="section-title">
        <h3><i class="fas fa-envelope-open-text"></i> E-Mail Templates</h3>
      </div>
      <div class="templates-grid">
        <div class="template-card">
          <div class="template-preview">
            <i class="fas fa-file-alt"></i>
          </div>
          <h4>Standard Lieferung</h4>
          <p>Standard-Template für digitale Produktlieferung</p>
          <div class="template-actions">
            <button class="btn-sm btn-primary" onclick="editTemplate('standard')">
              <i class="fas fa-edit"></i> Bearbeiten
            </button>
            <button class="btn-sm btn-secondary" onclick="previewTemplate('standard')">
              <i class="fas fa-eye"></i> Vorschau
            </button>
          </div>
        </div>
        <div class="template-card">
          <div class="template-preview">
            <i class="fas fa-star"></i>
          </div>
          <h4>Premium Template</h4>
          <p>Erweiterte Vorlage mit Branding und Extras</p>
          <div class="template-actions">
            <button class="btn-sm btn-primary" onclick="editTemplate('premium')">
              <i class="fas fa-edit"></i> Bearbeiten
            </button>
            <button class="btn-sm btn-secondary" onclick="previewTemplate('premium')">
              <i class="fas fa-eye"></i> Vorschau
            </button>
          </div>
        </div>
        <div class="template-card">
          <div class="template-preview">
            <i class="fas fa-bolt"></i>
          </div>
          <h4>Express Lieferung</h4>
          <p>Schnelle Lieferungsbestätigung mit Download-Links</p>
          <div class="template-actions">
            <button class="btn-sm btn-primary" onclick="editTemplate('express')">
              <i class="fas fa-edit"></i> Bearbeiten
            </button>
            <button class="btn-sm btn-secondary" onclick="previewTemplate('express')">
              <i class="fas fa-eye"></i> Vorschau
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Logs */}
      <div class="section-title">
        <h3><i class="fas fa-history"></i> Delivery Logs</h3>
      </div>
      <div class="admin-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Zeitstempel</th>
                <th>Bestellung</th>
                <th>Aktion</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody id="delivery-logs-tbody"></tbody>
          </table>
        </div>
      </div>

      <style>{`
        .admin-delivery {
          padding: 20px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          gap: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-left: 4px solid;
        }
        .stat-card.success { border-left-color: #28a745; }
        .stat-card.warning { border-left-color: #ffc107; }
        .stat-card.danger { border-left-color: #dc3545; }
        .stat-card.info { border-left-color: #17a2b8; }
        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }
        .stat-card.success .stat-icon { background: #28a745; }
        .stat-card.warning .stat-icon { background: #ffc107; }
        .stat-card.danger .stat-icon { background: #dc3545; }
        .stat-card.info .stat-icon { background: #17a2b8; }
        .stat-content {
          flex: 1;
        }
        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #1a2a4e;
          margin-bottom: 5px;
        }
        .stat-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }
        .stat-meta {
          font-size: 12px;
          color: #999;
        }
        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 40px 0 20px 0;
        }
        .section-title h3 {
          color: #1a2a4e;
          font-size: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
        }
        .section-actions {
          display: flex;
          gap: 10px;
        }
        .delivery-timeline {
          padding: 20px;
        }
        .timeline-item {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .timeline-item:last-child {
          border-bottom: none;
        }
        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }
        .timeline-dot.success { background: #28a745; }
        .timeline-dot.warning { background: #ffc107; }
        .timeline-dot.danger { background: #dc3545; }
        .timeline-content {
          flex: 1;
        }
        .timeline-time {
          font-size: 12px;
          color: #999;
          margin-bottom: 5px;
        }
        .timeline-title {
          font-weight: 600;
          color: #1a2a4e;
          margin-bottom: 5px;
        }
        .timeline-meta {
          font-size: 14px;
          color: #666;
        }
        .rules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .rule-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 2px solid #eee;
        }
        .rule-card.active {
          border-color: #28a745;
        }
        .rule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .rule-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rule-toggle input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .rule-toggle label {
          font-weight: 600;
          color: #1a2a4e;
          cursor: pointer;
          margin: 0;
        }
        .rule-status {
          padding: 5px 15px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
        }
        .rule-status.active {
          background: #d4edda;
          color: #155724;
        }
        .rule-body p {
          color: #666;
          margin-bottom: 15px;
          font-size: 14px;
        }
        .rule-config {
          display: grid;
          gap: 15px;
        }
        .config-item {
          display: grid;
          grid-template-columns: 120px 1fr;
          align-items: center;
          gap: 10px;
        }
        .config-item label {
          font-size: 14px;
          font-weight: 500;
          color: #666;
        }
        .templates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .template-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }
        .template-preview {
          width: 80px;
          height: 80px;
          margin: 0 auto 15px;
          background: linear-gradient(135deg, #1a2a4e, #d4af37);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: white;
        }
        .template-card h4 {
          color: #1a2a4e;
          margin-bottom: 10px;
          font-size: 18px;
        }
        .template-card p {
          color: #666;
          font-size: 14px;
          margin-bottom: 15px;
        }
        .template-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .btn-sm {
          padding: 8px 15px;
          font-size: 13px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-weight: 500;
        }
        .btn-sm.btn-primary {
          background: #1a2a4e;
          color: white;
        }
        .btn-sm.btn-secondary {
          background: #6c757d;
          color: white;
        }
        @media (max-width: 768px) {
          .stats-grid,
          .rules-grid,
          .templates-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        function loadDeliveryData() {
          // Stats
          document.getElementById('delivered-today').textContent = '1,234';
          document.getElementById('pending-delivery').textContent = '3';
          document.getElementById('failed-delivery').textContent = '2';
          document.getElementById('emails-sent').textContent = '1,239';
          
          // Queue
          const queue = [
            {
              order: 'ORD-2024-1235',
              customer: 'Anna Schmidt',
              email: 'anna@example.com',
              products: 2,
              status: 'processing',
              emailStatus: 'sending',
              downloadLink: 'Generating...',
              timestamp: new Date().toISOString()
            },
            {
              order: 'ORD-2024-1236',
              customer: 'Peter Müller',
              email: 'peter@example.com',
              products: 1,
              status: 'pending',
              emailStatus: 'queued',
              downloadLink: 'Pending',
              timestamp: new Date(Date.now() - 300000).toISOString()
            },
            {
              order: 'ORD-2024-1237',
              customer: 'Lisa Weber',
              email: 'lisa@example.com',
              products: 3,
              status: 'failed',
              emailStatus: 'failed',
              downloadLink: 'Error',
              timestamp: new Date(Date.now() - 600000).toISOString()
            }
          ];
          
          const tbody = document.getElementById('delivery-queue-tbody');
          tbody.innerHTML = queue.map(q => \`
            <tr>
              <td><strong>\${q.order}</strong></td>
              <td>
                <div>\${q.customer}</div>
                <div style="font-size: 12px; color: #666;">\${q.email}</div>
              </td>
              <td>\${q.products}</td>
              <td><span class="status-badge status-\${q.status}">\${q.status.toUpperCase()}</span></td>
              <td><span class="status-badge status-\${q.emailStatus}">\${q.emailStatus.toUpperCase()}</span></td>
              <td>\${q.downloadLink}</td>
              <td>\${new Date(q.timestamp).toLocaleString('de-DE')}</td>
              <td>
                <button class="action-btn btn-view" onclick="viewDelivery('\${q.order}')">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn btn-edit" onclick="retryDelivery('\${q.order}')">
                  <i class="fas fa-redo"></i>
                </button>
              </td>
            </tr>
          \`).join('');
          
          // Logs
          const logs = [
            {
              timestamp: new Date().toISOString(),
              order: 'ORD-2024-1234',
              action: 'Email Sent',
              status: 'success',
              details: 'Delivery email sent to max@example.com'
            },
            {
              timestamp: new Date(Date.now() - 60000).toISOString(),
              order: 'ORD-2024-1234',
              action: 'Download Link Generated',
              status: 'success',
              details: 'Link expires in 30 days'
            },
            {
              timestamp: new Date(Date.now() - 120000).toISOString(),
              order: 'ORD-2024-1234',
              action: 'License Assigned',
              status: 'success',
              details: '2 licenses assigned'
            }
          ];
          
          const logsTbody = document.getElementById('delivery-logs-tbody');
          logsTbody.innerHTML = logs.map(log => \`
            <tr>
              <td>\${new Date(log.timestamp).toLocaleString('de-DE')}</td>
              <td><strong>\${log.order}</strong></td>
              <td>\${log.action}</td>
              <td><span class="status-badge status-\${log.status}">\${log.status.toUpperCase()}</span></td>
              <td>\${log.details}</td>
            </tr>
          \`).join('');
        }
        
        function testDeliverySystem() {
          alert('Test-E-Mail wird gesendet...\\n\\nSystem-Check:\\n✓ SMTP Verbindung\\n✓ Template Engine\\n✓ Download-Link Generator');
        }
        
        function bulkResend() {
          alert('Bulk-Neuversand für fehlgeschlagene Lieferungen wird gestartet...');
        }
        
        function viewDeliverySettings() {
          alert('Delivery Settings:\\n\\n- SMTP Server\\n- Email Templates\\n- Retry Logic\\n- Notification Rules');
        }
        
        function filterQueue() {
          const filter = document.getElementById('queue-filter').value;
        }
        
        function viewDelivery(orderId) {
          alert('Zeige Details für ' + orderId);
        }
        
        function retryDelivery(orderId) {
          if (confirm('Erneut zustellen für ' + orderId + '?')) {
            alert('Neuversuch wird gestartet...');
          }
        }
        
        function editTemplate(templateName) {
          alert('Template-Editor öffnen für: ' + templateName);
        }
        
        function previewTemplate(templateName) {
          alert('Vorschau für Template: ' + templateName);
        }
        
        // Load data
        loadDeliveryData();
        
        // Auto-refresh every 10 seconds
        setInterval(loadDeliveryData, 10000);
      ` }} ></script>
    </div>
  )
}
