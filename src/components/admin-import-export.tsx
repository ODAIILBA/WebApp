import type { FC } from 'hono/jsx'

export const AdminImportExport: FC = () => {
  return (
    <div class="admin-import-export">
      <div class="admin-header">
        <h2><i class="fas fa-exchange-alt"></i> Import / Export</h2>
      </div>

      {/* Export Section */}
      <div class="admin-card">
        <h3><i class="fas fa-file-export"></i> Daten Exportieren</h3>
        <p style="color: #666; margin-bottom: 20px;">Exportieren Sie Ihre Daten als CSV-Datei</p>
        
        <div class="export-grid">
          <div class="export-card" onclick="exportData('products')">
            <div class="export-icon"><i class="fas fa-box"></i></div>
            <div class="export-title">Produkte</div>
            <div class="export-desc">Alle Produktdaten exportieren</div>
          </div>
          <div class="export-card" onclick="exportData('orders')">
            <div class="export-icon"><i class="fas fa-shopping-cart"></i></div>
            <div class="export-title">Bestellungen</div>
            <div class="export-desc">Alle Bestellungen exportieren</div>
          </div>
          <div class="export-card" onclick="exportData('customers')">
            <div class="export-icon"><i class="fas fa-users"></i></div>
            <div class="export-title">Kunden</div>
            <div class="export-desc">Alle Kundendaten exportieren</div>
          </div>
          <div class="export-card" onclick="exportData('all')">
            <div class="export-icon"><i class="fas fa-database"></i></div>
            <div class="export-title">Alle Daten</div>
            <div class="export-desc">Kompletten Datenexport</div>
          </div>
        </div>
      </div>

      {/* Import Section */}
      <div class="admin-card">
        <h3><i class="fas fa-file-import"></i> Daten Importieren</h3>
        <p style="color: #666; margin-bottom: 20px;">Importieren Sie CSV-Dateien (max. 10 MB)</p>
        
        <div class="import-form">
          <div class="form-group">
            <label>Datentyp</label>
            <select id="import-entity" class="form-control">
              <option value="products">Produkte</option>
              <option value="orders">Bestellungen</option>
              <option value="customers">Kunden</option>
            </select>
          </div>
          <div class="form-group">
            <label>CSV-Datei</label>
            <input type="file" id="import-file" class="form-control" accept=".csv" />
          </div>
          <button class="btn-primary" onclick="importData()">
            <i class="fas fa-upload"></i> Hochladen & Importieren
          </button>
        </div>
      </div>

      {/* Jobs History */}
      <div class="admin-card">
        <h3><i class="fas fa-history"></i> Import/Export Verlauf</h3>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Typ</th>
                <th>Entität</th>
                <th>Dateiname</th>
                <th>Status</th>
                <th>Datensätze</th>
                <th>Erfolg/Fehler</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody id="jobs-tbody">
              <tr><td colspan="7" style="text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin"></i> Lade Verlauf...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .admin-import-export { padding: 20px; }
        .export-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .export-card { background: #f8f9fa; border-radius: 12px; padding: 30px; text-align: center; cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
        .export-card:hover { background: white; border-color: #1a2a4e; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .export-icon { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #1a2a4e, #d4af37); color: white; display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 15px; }
        .export-title { font-size: 18px; font-weight: 600; color: #1a2a4e; margin-bottom: 8px; }
        .export-desc { font-size: 14px; color: #666; }
        .import-form { background: #f8f9fa; padding: 30px; border-radius: 8px; }
        .import-form .form-group { margin-bottom: 20px; }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        let jobsData = [];

        async function loadJobs() {
          try {
            const response = await fetch('/api/import-export/jobs');
            const data = await response.json();
            if (data.success) {
              jobsData = data.jobs;
              renderJobs();
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }

        function renderJobs() {
          const tbody = document.getElementById('jobs-tbody');
          if (jobsData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">Kein Verlauf vorhanden</td></tr>';
            return;
          }
          
          tbody.innerHTML = jobsData.map(job => {
            const typeIcon = job.type === 'export' ? 'fa-file-export' : 'fa-file-import';
            const typeLabel = job.type === 'export' ? 'Export' : 'Import';
            const statusColors = { pending: '#ffc107', processing: '#17a2b8', completed: '#28a745', failed: '#dc3545' };
            const statusLabels = { pending: 'Ausstehend', processing: 'Läuft', completed: 'Fertig', failed: 'Fehler' };
            
            return \`
              <tr>
                <td><i class="fas \${typeIcon}"></i> <strong>\${typeLabel}</strong></td>
                <td><span class="badge badge-info">\${job.entity}</span></td>
                <td>\${job.file_name || '-'}</td>
                <td><span class="status-badge" style="background: \${statusColors[job.status]};">\${statusLabels[job.status]}</span></td>
                <td>\${job.total_records || 0}</td>
                <td>
                  <span style="color: #28a745;"><i class="fas fa-check"></i> \${job.success_count || 0}</span>
                  / 
                  <span style="color: #dc3545;"><i class="fas fa-times"></i> \${job.error_count || 0}</span>
                </td>
                <td>\${new Date(job.created_at).toLocaleString('de-DE')}</td>
              </tr>
            \`;
          }).join('');
        }

        async function exportData(entity) {
          if (!confirm(\`\${entity.toUpperCase()} Daten wirklich exportieren?\`)) return;
          
          try {
            const response = await fetch('/api/import-export/export', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ entity })
            });
            const result = await response.json();
            if (result.success) {
              alert(\`Export-Job wurde erstellt (ID: \${result.id}). Die Datei wird in Kürze verfügbar sein.\`);
              loadJobs();
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Fehler beim Erstellen des Export-Jobs');
          }
        }

        async function importData() {
          const entity = document.getElementById('import-entity').value;
          const fileInput = document.getElementById('import-file');
          const file = fileInput.files[0];
          
          if (!file) {
            alert('Bitte wählen Sie eine Datei aus');
            return;
          }
          
          if (!file.name.endsWith('.csv')) {
            alert('Bitte wählen Sie eine CSV-Datei');
            return;
          }
          
          if (file.size > 10 * 1024 * 1024) {
            alert('Datei ist zu groß (max. 10 MB)');
            return;
          }
          
          if (!confirm(\`Import von \${file.name} starten?\`)) return;
          
          try {
            // In real implementation, upload file first
            const fileUrl = 'https://example.com/uploads/' + file.name;
            
            const response = await fetch('/api/import-export/import', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                entity,
                file_name: file.name,
                file_url: fileUrl
              })
            });
            const result = await response.json();
            if (result.success) {
              alert(\`Import-Job wurde erstellt (ID: \${result.id}). Der Import läuft im Hintergrund.\`);
              fileInput.value = '';
              loadJobs();
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Fehler beim Erstellen des Import-Jobs');
          }
        }

        loadJobs();
      ` }} ></script>
    </div>
  )
}
