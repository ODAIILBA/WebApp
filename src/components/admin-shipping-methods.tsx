import type { FC } from 'hono/jsx'

export const AdminShippingMethods: FC = () => {
  return (
    <div class="admin-shipping">
      <div class="admin-header">
        <h2><i class="fas fa-shipping-fast"></i> Versandmethoden</h2>
        <div class="header-actions">
          <button class="btn-primary" onclick="openAddMethodModal()">
            <i class="fas fa-plus"></i> Neue Methode
          </button>
        </div>
      </div>

      {/* Shipping Methods List */}
      <div class="shipping-methods-grid" id="methods-grid">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin" style="font-size: 32px;"></i>
          <div style="margin-top: 15px;">Lade Versandmethoden...</div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <div id="method-modal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3><i class="fas fa-plus"></i> <span id="modal-title">Neue Versandmethode</span></h3>
            <button class="modal-close" onclick="closeMethodModal()">&times;</button>
          </div>
          <div class="modal-body">
            <form id="method-form">
              <input type="hidden" id="method-id" />
              
              <div class="form-row">
                <div class="form-group">
                  <label>Name *</label>
                  <input type="text" id="method-name" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>Code *</label>
                  <input type="text" id="method-code" class="form-control" required />
                </div>
              </div>
              
              <div class="form-group">
                <label>Beschreibung</label>
                <textarea id="method-description" class="form-control" rows="2"></textarea>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Versanddienstleister</label>
                  <select id="method-carrier" class="form-control">
                    <option value="">Bitte wählen...</option>
                    <option value="DHL">DHL</option>
                    <option value="DPD">DPD</option>
                    <option value="UPS">UPS</option>
                    <option value="FedEx">FedEx</option>
                    <option value="Hermes">Hermes</option>
                    <option value="GLS">GLS</option>
                    <option value="self">Selbstabholung</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Lieferzeit</label>
                  <input type="text" id="method-delivery-time" class="form-control" placeholder="z.B. 1-2 Werktage" />
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Grundpreis (€) *</label>
                  <input type="number" id="method-base-price" class="form-control" step="0.01" required />
                </div>
                <div class="form-group">
                  <label>Kostenloser Versand ab (€)</label>
                  <input type="number" id="method-free-threshold" class="form-control" step="0.01" />
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Icon (FontAwesome)</label>
                  <input type="text" id="method-icon" class="form-control" placeholder="fas fa-box" />
                </div>
                <div class="form-group">
                  <label>Sortierung</label>
                  <input type="number" id="method-sort" class="form-control" value="0" />
                </div>
              </div>
              
              <div class="form-group">
                <label>
                  <input type="checkbox" id="method-weight-based" />
                  Gewichtsbasierte Preisgestaltung
                </label>
              </div>
              
              <div class="form-group" id="weight-options" style="display: none;">
                <div class="form-row">
                  <div class="form-group">
                    <label>Preis pro kg (€)</label>
                    <input type="number" id="method-price-per-kg" class="form-control" step="0.01" value="0" />
                  </div>
                  <div class="form-group">
                    <label>Min. Gewicht (kg)</label>
                    <input type="number" id="method-min-weight" class="form-control" step="0.1" value="0" />
                  </div>
                  <div class="form-group">
                    <label>Max. Gewicht (kg)</label>
                    <input type="number" id="method-max-weight" class="form-control" step="0.1" value="999999" />
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label>
                  <input type="checkbox" id="method-tracking" checked />
                  Sendungsverfolgung aktiviert
                </label>
              </div>
              
              <div class="form-group">
                <label>
                  <input type="checkbox" id="method-active" checked />
                  Aktiv
                </label>
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn-secondary" onclick="closeMethodModal()">Abbrechen</button>
                <button type="submit" class="btn-primary">Speichern</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .admin-shipping {
          padding: 20px;
        }
        .shipping-methods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .method-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border-left: 4px solid #1a2a4e;
          transition: all 0.2s;
          position: relative;
        }
        .method-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        .method-card.inactive {
          opacity: 0.6;
          border-left-color: #ccc;
        }
        .method-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 15px;
        }
        .method-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          background: linear-gradient(135deg, #1a2a4e, #d4af37);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }
        .method-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a2a4e;
          margin-bottom: 5px;
        }
        .method-carrier {
          display: inline-block;
          padding: 4px 12px;
          background: #f3f4f6;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          color: #666;
          margin-bottom: 10px;
        }
        .method-description {
          color: #666;
          font-size: 14px;
          margin-bottom: 15px;
          line-height: 1.4;
        }
        .method-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 15px;
        }
        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #666;
        }
        .info-item i {
          color: #d4af37;
          width: 16px;
        }
        .method-price {
          font-size: 24px;
          font-weight: bold;
          color: #1a2a4e;
          margin-bottom: 10px;
        }
        .method-price .currency {
          font-size: 16px;
          color: #666;
        }
        .free-shipping-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #d1fae5;
          color: #065f46;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        .method-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #f3f4f6;
        }
        .method-actions button {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        .btn-toggle {
          background: #f3f4f6;
          color: #666;
        }
        .btn-toggle:hover {
          background: #e5e7eb;
        }
        .btn-toggle.active {
          background: #d1fae5;
          color: #065f46;
        }
        .loading-spinner {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #999;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        @media (max-width: 768px) {
          .shipping-methods-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        let methodsData = [];

        // Load methods
        async function loadMethods() {
          try {
            const response = await fetch('/api/shipping-methods');
            const data = await response.json();
            if (data.success) {
              methodsData = data.methods;
              renderMethods();
            }
          } catch (error) {
            console.error('Error loading methods:', error);
            showToast('Fehler beim Laden der Versandmethoden', 'error');
          }
        }

        function renderMethods() {
          const grid = document.getElementById('methods-grid');
          if (methodsData.length === 0) {
            grid.innerHTML = '<div class="loading-spinner">Keine Versandmethoden vorhanden</div>';
            return;
          }
          
          grid.innerHTML = methodsData.map(m => \`
            <div class="method-card \${m.is_active ? '' : 'inactive'}">
              <div class="method-header">
                <div style="flex: 1;">
                  <div class="method-icon"><i class="\${m.icon || 'fas fa-box'}"></i></div>
                </div>
                <div style="text-align: right;">
                  <div class="method-title">\${m.name}</div>
                  \${m.carrier ? \`<span class="method-carrier">\${m.carrier}</span>\` : ''}
                </div>
              </div>
              
              \${m.description ? \`<div class="method-description">\${m.description}</div>\` : ''}
              
              <div class="method-price">
                \${m.base_price === 0 ? 'Kostenlos' : \`€\${m.base_price.toFixed(2)}\`}
                \${m.weight_based ? \`<span style="font-size: 14px; color: #666;"> + €\${m.price_per_kg}/kg</span>\` : ''}
              </div>
              
              \${m.free_shipping_threshold ? \`
                <div class="free-shipping-badge">
                  <i class="fas fa-gift"></i> Kostenlos ab €\${m.free_shipping_threshold}
                </div>
              \` : ''}
              
              <div class="method-info">
                \${m.delivery_time ? \`
                  <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <span>\${m.delivery_time}</span>
                  </div>
                \` : ''}
                \${m.tracking_enabled ? \`
                  <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Tracking</span>
                  </div>
                \` : ''}
              </div>
              
              <div class="method-actions">
                <button class="btn-toggle \${m.is_active ? 'active' : ''}" onclick="toggleMethod(\${m.id})">
                  <i class="fas fa-\${m.is_active ? 'check' : 'times'}"></i>
                  \${m.is_active ? 'Aktiv' : 'Inaktiv'}
                </button>
                <button class="action-btn btn-edit" onclick="editMethod(\${m.id})" title="Bearbeiten">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn btn-delete" onclick="deleteMethod(\${m.id})" title="Löschen">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          \`).join('');
        }

        // Toggle weight-based options
        document.getElementById('method-weight-based')?.addEventListener('change', (e) => {
          document.getElementById('weight-options').style.display = e.target.checked ? 'block' : 'none';
        });

        // Add method
        function openAddMethodModal() {
          document.getElementById('modal-title').textContent = 'Neue Versandmethode';
          document.getElementById('method-form').reset();
          document.getElementById('method-id').value = '';
          document.getElementById('weight-options').style.display = 'none';
          document.getElementById('method-modal').style.display = 'block';
        }

        function closeMethodModal() {
          document.getElementById('method-modal').style.display = 'none';
        }

        // Edit method
        function editMethod(id) {
          const method = methodsData.find(m => m.id === id);
          if (!method) return;
          
          document.getElementById('modal-title').textContent = 'Versandmethode bearbeiten';
          document.getElementById('method-id').value = method.id;
          document.getElementById('method-name').value = method.name;
          document.getElementById('method-code').value = method.code;
          document.getElementById('method-description').value = method.description || '';
          document.getElementById('method-carrier').value = method.carrier || '';
          document.getElementById('method-delivery-time').value = method.delivery_time || '';
          document.getElementById('method-base-price').value = method.base_price;
          document.getElementById('method-free-threshold').value = method.free_shipping_threshold || '';
          document.getElementById('method-icon').value = method.icon || '';
          document.getElementById('method-sort').value = method.sort_order || 0;
          document.getElementById('method-weight-based').checked = method.weight_based === 1;
          document.getElementById('method-price-per-kg').value = method.price_per_kg || 0;
          document.getElementById('method-min-weight').value = method.min_weight || 0;
          document.getElementById('method-max-weight').value = method.max_weight || 999999;
          document.getElementById('method-tracking').checked = method.tracking_enabled === 1;
          document.getElementById('method-active').checked = method.is_active === 1;
          document.getElementById('weight-options').style.display = method.weight_based === 1 ? 'block' : 'none';
          document.getElementById('method-modal').style.display = 'block';
        }

        // Save method
        document.getElementById('method-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const id = document.getElementById('method-id').value;
          const data = {
            name: document.getElementById('method-name').value,
            code: document.getElementById('method-code').value,
            description: document.getElementById('method-description').value,
            carrier: document.getElementById('method-carrier').value,
            delivery_time: document.getElementById('method-delivery-time').value,
            base_price: parseFloat(document.getElementById('method-base-price').value),
            free_shipping_threshold: document.getElementById('method-free-threshold').value ? parseFloat(document.getElementById('method-free-threshold').value) : null,
            icon: document.getElementById('method-icon').value || 'fas fa-box',
            sort_order: parseInt(document.getElementById('method-sort').value) || 0,
            weight_based: document.getElementById('method-weight-based').checked,
            price_per_kg: parseFloat(document.getElementById('method-price-per-kg').value) || 0,
            min_weight: parseFloat(document.getElementById('method-min-weight').value) || 0,
            max_weight: parseFloat(document.getElementById('method-max-weight').value) || 999999,
            tracking_enabled: document.getElementById('method-tracking').checked,
            is_active: document.getElementById('method-active').checked,
            available_countries: '["DE","AT","CH"]'
          };
          
          try {
            const url = id ? \`/api/shipping-methods/\${id}\` : '/api/shipping-methods';
            const method = id ? 'PUT' : 'POST';
            const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
              showToast(id ? 'Methode aktualisiert' : 'Methode erstellt', 'success');
              closeMethodModal();
              loadMethods();
            } else {
              showToast(result.error || 'Fehler beim Speichern', 'error');
            }
          } catch (error) {
            console.error('Error saving method:', error);
            showToast('Fehler beim Speichern', 'error');
          }
        });

        // Toggle method
        async function toggleMethod(id) {
          try {
            const response = await fetch(\`/api/shipping-methods/\${id}/toggle\`, { method: 'PATCH' });
            const result = await response.json();
            if (result.success) {
              showToast('Status geändert', 'success');
              loadMethods();
            }
          } catch (error) {
            console.error('Error toggling method:', error);
            showToast('Fehler beim Ändern des Status', 'error');
          }
        }

        // Delete method
        async function deleteMethod(id) {
          if (!confirm('Versandmethode wirklich löschen?')) return;
          
          try {
            const response = await fetch(\`/api/shipping-methods/\${id}\`, { method: 'DELETE' });
            const result = await response.json();
            if (result.success) {
              showToast('Methode gelöscht', 'success');
              loadMethods();
            }
          } catch (error) {
            console.error('Error deleting method:', error);
            showToast('Fehler beim Löschen', 'error');
          }
        }

        function showToast(message, type = 'info') {
          if (window.showToast) {
            window.showToast(message, type);
          } else {
            alert(message);
          }
        }

        // Initialize
        loadMethods();
      ` }} ></script>
    </div>
  )
}
