import type { FC } from 'hono/jsx'

export const AdminInvoices: FC = () => {
  return (
    <div class="admin-invoices">
      <div class="admin-header">
        <h2><i class="fas fa-file-invoice"></i> Rechnungsverwaltung</h2>
        <select id="status-filter" class="form-control" style="width: 200px;" onchange="loadInvoices()">
          <option value="all">Alle Status</option>
          <option value="draft">Entwurf</option>
          <option value="sent">Versendet</option>
          <option value="paid">Bezahlt</option>
          <option value="overdue">Überfällig</option>
          <option value="cancelled">Storniert</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-file-invoice"></i></div>
          <div class="stat-content">
            <div class="stat-label">Gesamt Rechnungen</div>
            <div class="stat-value" id="total-invoices">0</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-clock"></i></div>
          <div class="stat-content">
            <div class="stat-label">Ausstehend</div>
            <div class="stat-value" id="pending-invoices">0</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
          <div class="stat-content">
            <div class="stat-label">Bezahlt</div>
            <div class="stat-value" id="paid-invoices">0</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-euro-sign"></i></div>
          <div class="stat-content">
            <div class="stat-label">Gesamt Betrag</div>
            <div class="stat-value" id="total-amount">€0</div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div class="admin-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Rechnungsnr.</th>
                <th>Kunde</th>
                <th>Datum</th>
                <th>Fällig</th>
                <th>Betrag</th>
                <th>Status</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody id="invoices-tbody">
              <tr><td colspan="7" style="text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin"></i> Lade Rechnungen...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      <div id="invoice-modal" class="modal">
        <div class="modal-content large">
          <div class="modal-header">
            <h3><i class="fas fa-file-invoice"></i> Rechnungsdetails</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="modal-body" id="invoice-detail"></div>
        </div>
      </div>

      <style>{`
        .admin-invoices { padding: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; gap: 15px; align-items: center; }
        .stat-icon { width: 50px; height: 50px; border-radius: 10px; background: linear-gradient(135deg, #1a2a4e, #d4af37); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; }
        .stat-content { flex: 1; }
        .stat-label { font-size: 13px; color: #666; margin-bottom: 6px; }
        .stat-value { font-size: 26px; font-weight: bold; color: #1a2a4e; }
        .invoice-header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .invoice-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .invoice-items { margin-top: 20px; }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        let invoicesData = [];

        async function loadInvoices() {
          try {
            const status = document.getElementById('status-filter').value;
            const url = status !== 'all' ? \`/api/invoices?status=\${status}\` : '/api/invoices';
            const response = await fetch(url);
            const data = await response.json();
            if (data.success) {
              invoicesData = data.invoices;
              renderInvoices();
              updateStats();
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }

        function updateStats() {
          const total = invoicesData.length;
          const pending = invoicesData.filter(i => i.status === 'sent' || i.status === 'draft').length;
          const paid = invoicesData.filter(i => i.status === 'paid').length;
          const totalAmount = invoicesData.reduce((sum, i) => sum + (i.total || 0), 0);
          
          document.getElementById('total-invoices').textContent = total;
          document.getElementById('pending-invoices').textContent = pending;
          document.getElementById('paid-invoices').textContent = paid;
          document.getElementById('total-amount').textContent = '€' + totalAmount.toFixed(2);
        }

        function renderInvoices() {
          const tbody = document.getElementById('invoices-tbody');
          if (invoicesData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">Keine Rechnungen vorhanden</td></tr>';
            return;
          }
          
          tbody.innerHTML = invoicesData.map(inv => \`
            <tr>
              <td><strong>\${inv.invoice_number}</strong></td>
              <td>\${inv.customer_name || inv.customer_email}</td>
              <td>\${new Date(inv.invoice_date).toLocaleDateString('de-DE')}</td>
              <td>\${inv.due_date ? new Date(inv.due_date).toLocaleDateString('de-DE') : '-'}</td>
              <td><strong>€\${inv.total.toFixed(2)}</strong></td>
              <td><span class="status-badge status-\${inv.status}">\${getStatusLabel(inv.status)}</span></td>
              <td>
                <button class="action-btn btn-view" onclick="viewInvoice(\${inv.id})" title="Anzeigen">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn btn-edit" onclick="changeStatus(\${inv.id}, '\${inv.status}')" title="Status ändern">
                  <i class="fas fa-exchange-alt"></i>
                </button>
                <button class="action-btn btn-delete" onclick="deleteInvoice(\${inv.id})" title="Löschen">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          \`).join('');
        }

        function getStatusLabel(status) {
          const labels = { draft: 'Entwurf', sent: 'Versendet', paid: 'Bezahlt', overdue: 'Überfällig', cancelled: 'Storniert' };
          return labels[status] || status;
        }

        async function viewInvoice(id) {
          try {
            const response = await fetch(\`/api/invoices/\${id}\`);
            const data = await response.json();
            if (data.success) {
              const inv = data.invoice;
              const items = data.items || [];
              document.getElementById('invoice-detail').innerHTML = \`
                <div class="invoice-header">
                  <h2>\${inv.invoice_number}</h2>
                  <p><strong>Status:</strong> <span class="status-badge status-\${inv.status}">\${getStatusLabel(inv.status)}</span></p>
                </div>
                <div class="invoice-info">
                  <div>
                    <h4>Kunde</h4>
                    <p><strong>\${inv.customer_name}</strong><br/>\${inv.customer_email}</p>
                  </div>
                  <div>
                    <h4>Datum</h4>
                    <p><strong>Ausgestellt:</strong> \${new Date(inv.invoice_date).toLocaleDateString('de-DE')}<br/>
                    <strong>Fällig:</strong> \${inv.due_date ? new Date(inv.due_date).toLocaleDateString('de-DE') : '-'}</p>
                  </div>
                </div>
                <div class="invoice-items">
                  <h4>Positionen</h4>
                  <table class="admin-table">
                    <thead>
                      <tr>
                        <th>Beschreibung</th>
                        <th>Menge</th>
                        <th>Preis</th>
                        <th>Gesamt</th>
                      </tr>
                    </thead>
                    <tbody>
                      \${items.map(item => \`
                        <tr>
                          <td>\${item.description}</td>
                          <td>\${item.quantity}</td>
                          <td>€\${item.unit_price.toFixed(2)}</td>
                          <td><strong>€\${item.total.toFixed(2)}</strong></td>
                        </tr>
                      \`).join('')}
                    </tbody>
                  </table>
                  <div style="text-align: right; margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                    <p><strong>Zwischensumme:</strong> €\${inv.subtotal.toFixed(2)}</p>
                    <p><strong>MwSt.:</strong> €\${inv.tax_amount.toFixed(2)}</p>
                    <p><strong>Versand:</strong> €\${inv.shipping_amount.toFixed(2)}</p>
                    <h3 style="margin-top: 10px;"><strong>Gesamt:</strong> €\${inv.total.toFixed(2)}</h3>
                  </div>
                </div>
              \`;
              document.getElementById('invoice-modal').style.display = 'block';
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }

        function closeModal() {
          document.getElementById('invoice-modal').style.display = 'none';
        }

        async function changeStatus(id, currentStatus) {
          const statuses = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];
          const newStatus = prompt('Neuer Status (draft, sent, paid, overdue, cancelled):', currentStatus);
          if (!newStatus || !statuses.includes(newStatus)) return;
          
          try {
            const response = await fetch(\`/api/invoices/\${id}/status\`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: newStatus })
            });
            const result = await response.json();
            if (result.success) {
              alert('Status aktualisiert');
              loadInvoices();
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Fehler beim Aktualisieren');
          }
        }

        async function deleteInvoice(id) {
          if (!confirm('Rechnung wirklich löschen?')) return;
          
          try {
            const response = await fetch(\`/api/invoices/\${id}\`, { method: 'DELETE' });
            const result = await response.json();
            if (result.success) {
              alert('Rechnung gelöscht');
              loadInvoices();
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Fehler beim Löschen');
          }
        }

        loadInvoices();
      ` }} ></script>
    </div>
  )
}
