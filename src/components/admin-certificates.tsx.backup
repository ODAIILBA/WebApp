export const AdminCertificates = () => {
  return (
    <div class="certificate-management">
      <style>{`
        .certificate-management {
          padding: 30px;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        
        .page-header h1 {
          font-size: 24px;
          color: #1a2b5e;
          margin: 0;
        }
        
        .header-actions {
          display: flex;
          gap: 10px;
        }
        
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }
        
        .btn-primary {
          background: #1a2b5e;
          color: white;
        }
        
        .btn-primary:hover {
          background: #2a3b6e;
        }
        
        .btn-secondary {
          background: #6c757d;
          color: white;
        }
        
        .btn-secondary:hover {
          background: #5a6268;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .stat-label {
          color: #666;
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: bold;
          color: #1a2b5e;
        }
        
        .stat-icon {
          float: right;
          font-size: 24px;
          color: #f7b500;
        }
        
        .filters-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }
        
        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        
        .filter-group label {
          margin-bottom: 5px;
          font-weight: 600;
          color: #333;
        }
        
        .filter-group input,
        .filter-group select {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .certificates-table-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .table-header {
          padding: 15px 20px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .table-header h3 {
          margin: 0;
          color: #1a2b5e;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        thead {
          background: #f8f9fa;
        }
        
        th {
          padding: 12px 15px;
          text-align: left;
          font-weight: 600;
          color: #1a2b5e;
          font-size: 14px;
        }
        
        tbody tr {
          border-bottom: 1px solid #e0e0e0;
          transition: background 0.2s;
        }
        
        tbody tr:hover {
          background: #f8f9fa;
        }
        
        td {
          padding: 12px 15px;
          font-size: 14px;
        }
        
        .brand-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .brand-microsoft {
          background: #e7f3ff;
          color: #00a4ef;
        }
        
        .brand-adobe {
          background: #fff8f8;
          color: #ff0000;
        }
        
        .brand-kaspersky {
          background: #f0faf5;
          color: #00a651;
        }
        
        .brand-generic {
          background: #f8f9fa;
          color: #6c757d;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .status-sent {
          background: #d4edda;
          color: #155724;
        }
        
        .status-generated {
          background: #fff3cd;
          color: #856404;
        }
        
        .actions {
          display: flex;
          gap: 8px;
        }
        
        .btn-icon {
          padding: 6px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          background: #f8f9fa;
          color: #333;
        }
        
        .btn-icon:hover {
          background: #e9ecef;
        }
        
        .btn-view {
          color: #007bff;
        }
        
        .btn-view:hover {
          background: #e7f3ff;
        }
        
        .btn-download {
          color: #28a745;
        }
        
        .btn-download:hover {
          background: #d4edda;
        }
        
        .btn-email {
          color: #6f42c1;
        }
        
        .btn-email:hover {
          background: #f3e5ff;
        }
        
        .btn-delete {
          color: #dc3545;
        }
        
        .btn-delete:hover {
          background: #f8d7da;
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }
        
        .empty-state i {
          font-size: 48px;
          color: #ddd;
          margin-bottom: 15px;
        }
        
        .loading {
          text-align: center;
          padding: 40px;
          color: #666;
        }
      `}</style>
      
      <div class="page-header">
        <h1>📜 Zertifikatsverwaltung</h1>
        <div class="header-actions">
          <button class="btn btn-secondary" onclick="window.location.href='/admin/certificate-settings'">
            <i class="fas fa-cog"></i> Einstellungen
          </button>
          <button class="btn btn-primary" onclick="generateCertificate()">
            <i class="fas fa-plus"></i> Zertifikat erstellen
          </button>
        </div>
      </div>
      
      <div class="stats-grid" id="stats-container">
        <div class="stat-card">
          <i class="fas fa-certificate stat-icon"></i>
          <div class="stat-label">Gesamt</div>
          <div class="stat-value" id="stat-total">0</div>
        </div>
        <div class="stat-card">
          <i class="fas fa-paper-plane stat-icon"></i>
          <div class="stat-label">Versendet</div>
          <div class="stat-value" id="stat-sent">0</div>
        </div>
        <div class="stat-card">
          <i class="fas fa-clock stat-icon"></i>
          <div class="stat-label">Ausstehend</div>
          <div class="stat-value" id="stat-unsent">0</div>
        </div>
        <div class="stat-card">
          <i class="fas fa-windows stat-icon"></i>
          <div class="stat-label">Microsoft</div>
          <div class="stat-value" id="stat-microsoft">0</div>
        </div>
      </div>
      
      <div class="filters-section">
        <div class="filters-grid">
          <div class="filter-group">
            <label>Marke</label>
            <select id="filter-brand" onchange="loadCertificates()">
              <option value="all">Alle Marken</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Adobe">Adobe</option>
              <option value="Kaspersky">Kaspersky</option>
              <option value="Generic">Andere</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Status</label>
            <select id="filter-status" onchange="loadCertificates()">
              <option value="">Alle Status</option>
              <option value="generated">Erstellt</option>
              <option value="sent">Versendet</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Kunde suchen</label>
            <input type="text" id="filter-customer" placeholder="Name oder E-Mail" onkeyup="loadCertificates()" />
          </div>
          <div class="filter-group">
            <label>Datum von</label>
            <input type="date" id="filter-date-from" onchange="loadCertificates()" />
          </div>
          <div class="filter-group">
            <label>Datum bis</label>
            <input type="date" id="filter-date-to" onchange="loadCertificates()" />
          </div>
        </div>
      </div>
      
      <div class="certificates-table-container">
        <div class="table-header">
          <h3>Zertifikate</h3>
          <button class="btn btn-secondary btn-sm" onclick="loadCertificates()">
            <i class="fas fa-sync-alt"></i> Aktualisieren
          </button>
        </div>
        <div id="table-container">
          <div class="loading">
            <i class="fas fa-spinner fa-spin"></i> Lade Zertifikate...
          </div>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        async function loadStats() {
          try {
            const response = await axios.get('/api/admin/certificates/stats');
            if (response.data.success) {
              const stats = response.data.data;
              document.getElementById('stat-total').textContent = stats.total || 0;
              document.getElementById('stat-sent').textContent = stats.sent || 0;
              document.getElementById('stat-unsent').textContent = stats.unsent || 0;
              document.getElementById('stat-microsoft').textContent = stats.microsoft_count || 0;
            }
          } catch (error) {
            console.error('Error loading stats:', error);
          }
        }
        
        async function loadCertificates() {
          try {
            const brand = document.getElementById('filter-brand').value;
            const status = document.getElementById('filter-status').value;
            const customer = document.getElementById('filter-customer').value;
            const dateFrom = document.getElementById('filter-date-from').value;
            const dateTo = document.getElementById('filter-date-to').value;
            
            const params = new URLSearchParams();
            if (brand !== 'all') params.append('brand', brand);
            if (status) params.append('status', status);
            if (customer) params.append('customer', customer);
            if (dateFrom) params.append('date_from', dateFrom);
            if (dateTo) params.append('date_to', dateTo);
            
            const response = await axios.get('/api/admin/certificates?' + params.toString());
            
            if (response.data.success) {
              const certificates = response.data.data;
              renderTable(certificates);
            }
          } catch (error) {
            console.error('Error loading certificates:', error);
            document.getElementById('table-container').innerHTML = \`
              <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Fehler beim Laden der Zertifikate</p>
              </div>
            \`;
          }
        }
        
        function renderTable(certificates) {
          if (certificates.length === 0) {
            document.getElementById('table-container').innerHTML = \`
              <div class="empty-state">
                <i class="fas fa-certificate"></i>
                <p>Keine Zertifikate gefunden</p>
              </div>
            \`;
            return;
          }
          
          const rows = certificates.map(cert => \`
            <tr>
              <td>\${cert.certificate_number || '-'}</td>
              <td>
                <span class="brand-badge brand-\${(cert.brand || 'generic').toLowerCase()}">
                  \${cert.brand || 'Generic'}
                </span>
              </td>
              <td>\${cert.product_name || '-'}</td>
              <td>\${cert.customer_name || '-'}</td>
              <td>\${cert.order_number || '-'}</td>
              <td>\${formatDate(cert.generated_at)}</td>
              <td>
                <span class="status-badge status-\${cert.status}">
                  \${cert.status === 'sent' ? 'Versendet' : 'Erstellt'}
                </span>
              </td>
              <td>
                <div class="actions">
                  <button class="btn-icon btn-view" onclick="viewCertificate(\${cert.id})" title="Ansehen">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn-icon btn-download" onclick="downloadCertificate(\${cert.id})" title="PDF">
                    <i class="fas fa-download"></i>
                  </button>
                  <button class="btn-icon btn-email" onclick="emailCertificate(\${cert.id})" title="E-Mail">
                    <i class="fas fa-envelope"></i>
                  </button>
                  <button class="btn-icon btn-delete" onclick="deleteCertificate(\${cert.id})" title="Löschen">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          \`).join('');
          
          document.getElementById('table-container').innerHTML = \`
            <table>
              <thead>
                <tr>
                  <th>Zertifikat-Nr.</th>
                  <th>Marke</th>
                  <th>Produkt</th>
                  <th>Kunde</th>
                  <th>Bestellung</th>
                  <th>Erstellt</th>
                  <th>Status</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                \${rows}
              </tbody>
            </table>
          \`;
        }
        
        function formatDate(dateString) {
          if (!dateString) return '-';
          const date = new Date(dateString);
          return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
        
        function viewCertificate(id) {
          window.open(\`/admin/certificates/\${id}/preview\`, '_blank');
        }
        
        function downloadCertificate(id) {
          window.open(\`/api/admin/certificates/\${id}/pdf\`, '_blank');
        }
        
        async function emailCertificate(id) {
          if (!confirm('Zertifikat per E-Mail versenden?')) return;
          
          try {
            const response = await axios.post(\`/api/admin/certificates/\${id}/email\`);
            if (response.data.success) {
              alert('Zertifikat wurde versendet!');
              loadCertificates();
              loadStats();
            }
          } catch (error) {
            console.error('Error emailing certificate:', error);
            alert('Fehler beim Versenden des Zertifikats');
          }
        }
        
        async function deleteCertificate(id) {
          if (!confirm('Zertifikat wirklich löschen?')) return;
          
          try {
            const response = await axios.delete(\`/api/admin/certificates/\${id}\`);
            if (response.data.success) {
              alert('Zertifikat gelöscht!');
              loadCertificates();
              loadStats();
            }
          } catch (error) {
            console.error('Error deleting certificate:', error);
            alert('Fehler beim Löschen des Zertifikats');
          }
        }
        
        function generateCertificate() {
          alert('Zertifikat-Generierung: Diese Funktion wird in Kürze verfügbar sein!');
          // TODO: Open modal for manual certificate generation
        }
        
        // Load data on page load
        loadStats();
        loadCertificates();
      `}} />
    </div>
  );
};
