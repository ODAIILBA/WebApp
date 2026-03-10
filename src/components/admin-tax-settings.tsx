import type { FC } from 'hono/jsx'

export const AdminTaxSettings: FC = () => {
  return (
    <div class="admin-tax">
      <div class="admin-header">
        <h2><i class="fas fa-percent"></i> Steuereinstellungen</h2>
      </div>

      {/* Tax Rates Section */}
      <div class="admin-card">
        <div class="card-header">
          <h3><i class="fas fa-calculator"></i> Steuersätze</h3>
          <button class="btn-primary" onclick="openAddRateModal()">
            <i class="fas fa-plus"></i> Neuer Steuersatz
          </button>
        </div>
        
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Land</th>
                <th>Satz (%)</th>
                <th>Priorität</th>
                <th>Status</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody id="rates-tbody">
              <tr>
                <td colspan="6" style="text-align: center; padding: 40px;">
                  <i class="fas fa-spinner fa-spin"></i> Lade Steuersätze...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Classes Section */}
      <div class="admin-card">
        <div class="card-header">
          <h3><i class="fas fa-tags"></i> Steuerklassen</h3>
          <button class="btn-secondary" onclick="openAddClassModal()">
            <i class="fas fa-plus"></i> Neue Klasse
          </button>
        </div>
        
        <div class="classes-grid" id="classes-grid">
          <div style="text-align: center; padding: 40px;">
            <i class="fas fa-spinner fa-spin"></i> Lade Steuerklassen...
          </div>
        </div>
      </div>

      {/* Global Settings Section */}
      <div class="admin-card">
        <h3><i class="fas fa-cog"></i> Globale Einstellungen</h3>
        
        <form id="settings-form">
          <div class="settings-grid">
            <div class="setting-item">
              <label class="setting-label">Preise inkl. Steuern</label>
              <select id="prices-include-tax" class="form-control">
                <option value="true">Ja</option>
                <option value="false">Nein</option>
              </select>
            </div>
            
            <div class="setting-item">
              <label class="setting-label">Steuern berechnen basierend auf</label>
              <select id="tax-based-on" class="form-control">
                <option value="shipping">Lieferadresse</option>
                <option value="billing">Rechnungsadresse</option>
                <option value="shop">Shop-Standort</option>
              </select>
            </div>
            
            <div class="setting-item">
              <label class="setting-label">Preisanzeige im Shop</label>
              <select id="display-prices-shop" class="form-control">
                <option value="including">Inkl. MwSt.</option>
                <option value="excluding">Exkl. MwSt.</option>
              </select>
            </div>
            
            <div class="setting-item">
              <label class="setting-label">Preisanzeige im Checkout</label>
              <select id="display-prices-checkout" class="form-control">
                <option value="including">Inkl. MwSt.</option>
                <option value="excluding">Exkl. MwSt.</option>
              </select>
            </div>
            
            <div class="setting-item">
              <label class="setting-label">MwSt.-Zwischensumme anzeigen</label>
              <select id="display-tax-subtotal" class="form-control">
                <option value="true">Ja</option>
                <option value="false">Nein</option>
              </select>
            </div>
            
            <div class="setting-item">
              <label class="setting-label">Steuern auf Zwischensumme runden</label>
              <select id="round-tax-subtotal" class="form-control">
                <option value="true">Ja</option>
                <option value="false">Nein</option>
              </select>
            </div>
          </div>
          
          <div style="margin-top: 20px;">
            <button type="submit" class="btn-primary">
              <i class="fas fa-save"></i> Einstellungen speichern
            </button>
          </div>
        </form>
      </div>

      {/* Add/Edit Rate Modal */}
      <div id="rate-modal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3><i class="fas fa-plus"></i> <span id="rate-modal-title">Neuer Steuersatz</span></h3>
            <button class="modal-close" onclick="closeRateModal()">&times;</button>
          </div>
          <div class="modal-body">
            <form id="rate-form">
              <input type="hidden" id="rate-id" />
              
              <div class="form-group">
                <label>Name *</label>
                <input type="text" id="rate-name" class="form-control" required />
              </div>
              
              <div class="form-group">
                <label>Code *</label>
                <input type="text" id="rate-code" class="form-control" required />
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Steuersatz (%) *</label>
                  <input type="number" id="rate-rate" class="form-control" step="0.01" required />
                </div>
                <div class="form-group">
                  <label>Priorität</label>
                  <input type="number" id="rate-priority" class="form-control" value="1" />
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Land (ISO Code) *</label>
                  <input type="text" id="rate-country" class="form-control" maxlength="2" required />
                </div>
                <div class="form-group">
                  <label>Bundesland/State</label>
                  <input type="text" id="rate-state" class="form-control" />
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>PLZ</label>
                  <input type="text" id="rate-zip" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Stadt</label>
                  <input type="text" id="rate-city" class="form-control" />
                </div>
              </div>
              
              <div class="form-group">
                <label>
                  <input type="checkbox" id="rate-compound" />
                  Zusammengesetzte Steuer (Steuer auf Steuer)
                </label>
              </div>
              
              <div class="form-group">
                <label>
                  <input type="checkbox" id="rate-active" checked />
                  Aktiv
                </label>
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn-secondary" onclick="closeRateModal()">Abbrechen</button>
                <button type="submit" class="btn-primary">Speichern</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add/Edit Class Modal */}
      <div id="class-modal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3><i class="fas fa-plus"></i> <span id="class-modal-title">Neue Steuerklasse</span></h3>
            <button class="modal-close" onclick="closeClassModal()">&times;</button>
          </div>
          <div class="modal-body">
            <form id="class-form">
              <input type="hidden" id="class-id" />
              
              <div class="form-group">
                <label>Name *</label>
                <input type="text" id="class-name" class="form-control" required />
              </div>
              
              <div class="form-group">
                <label>Beschreibung</label>
                <textarea id="class-description" class="form-control" rows="2"></textarea>
              </div>
              
              <div class="form-group">
                <label>
                  <input type="checkbox" id="class-default" />
                  Als Standard markieren
                </label>
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn-secondary" onclick="closeClassModal()">Abbrechen</button>
                <button type="submit" class="btn-primary">Speichern</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .admin-tax {
          padding: 20px;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .card-header h3 {
          margin: 0;
          color: #1a2a4e;
        }
        .classes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }
        .class-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          border-left: 4px solid #1a2a4e;
          transition: all 0.2s;
        }
        .class-card:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        .class-card.default {
          border-left-color: #d4af37;
          background: #fffbf0;
        }
        .class-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a2a4e;
          margin-bottom: 8px;
        }
        .class-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
          line-height: 1.4;
        }
        .class-actions {
          display: flex;
          gap: 10px;
        }
        .class-actions button {
          flex: 1;
          padding: 6px;
        }
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .setting-item {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
        }
        .setting-label {
          display: block;
          font-weight: 600;
          color: #1a2a4e;
          margin-bottom: 8px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        @media (max-width: 768px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        let ratesData = [];
        let classesData = [];
        let settingsData = {};

        // Load all data
        async function loadAllData() {
          await Promise.all([loadRates(), loadClasses(), loadSettings()]);
        }

        // Load tax rates
        async function loadRates() {
          try {
            const response = await fetch('/api/tax/rates');
            const data = await response.json();
            if (data.success) {
              ratesData = data.rates;
              renderRates();
            }
          } catch (error) {
            console.error('Error loading rates:', error);
          }
        }

        function renderRates() {
          const tbody = document.getElementById('rates-tbody');
          if (ratesData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;">Keine Steuersätze vorhanden</td></tr>';
            return;
          }
          
          tbody.innerHTML = ratesData.map(r => \`
            <tr>
              <td><strong>\${r.name}</strong></td>
              <td>\${r.country_code}\${r.state_code ? ' / ' + r.state_code : ''}\${r.city ? ', ' + r.city : ''}</td>
              <td><strong>\${r.rate}%</strong></td>
              <td>\${r.priority}</td>
              <td>
                <span class="status-badge status-\${r.is_active ? 'active' : 'inactive'}">
                  \${r.is_active ? 'Aktiv' : 'Inaktiv'}
                </span>
              </td>
              <td>
                <button class="action-btn btn-toggle" onclick="toggleRate(\${r.id})" title="Status ändern">
                  <i class="fas fa-\${r.is_active ? 'check' : 'times'}"></i>
                </button>
                <button class="action-btn btn-edit" onclick="editRate(\${r.id})" title="Bearbeiten">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn btn-delete" onclick="deleteRate(\${r.id})" title="Löschen">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          \`).join('');
        }

        // Load tax classes
        async function loadClasses() {
          try {
            const response = await fetch('/api/tax/classes');
            const data = await response.json();
            if (data.success) {
              classesData = data.classes;
              renderClasses();
            }
          } catch (error) {
            console.error('Error loading classes:', error);
          }
        }

        function renderClasses() {
          const grid = document.getElementById('classes-grid');
          if (classesData.length === 0) {
            grid.innerHTML = '<div style="text-align: center; padding: 40px;">Keine Steuerklassen vorhanden</div>';
            return;
          }
          
          grid.innerHTML = classesData.map(c => \`
            <div class="class-card \${c.is_default ? 'default' : ''}">
              <div class="class-title">
                \${c.name}
                \${c.is_default ? '<i class="fas fa-star" style="color: #d4af37; font-size: 14px; margin-left: 5px;"></i>' : ''}
              </div>
              \${c.description ? \`<div class="class-description">\${c.description}</div>\` : ''}
              <div class="class-actions">
                <button class="action-btn btn-edit" onclick="editClass(\${c.id})" title="Bearbeiten">
                  <i class="fas fa-edit"></i> Bearbeiten
                </button>
                \${!c.is_default ? \`
                  <button class="action-btn btn-delete" onclick="deleteClass(\${c.id})" title="Löschen">
                    <i class="fas fa-trash"></i> Löschen
                  </button>
                \` : ''}
              </div>
            </div>
          \`).join('');
        }

        // Load settings
        async function loadSettings() {
          try {
            const response = await fetch('/api/tax/settings');
            const data = await response.json();
            if (data.success) {
              settingsData = data.settings;
              renderSettings();
            }
          } catch (error) {
            console.error('Error loading settings:', error);
          }
        }

        function renderSettings() {
          document.getElementById('prices-include-tax').value = settingsData.prices_include_tax || 'true';
          document.getElementById('tax-based-on').value = settingsData.tax_based_on || 'shipping';
          document.getElementById('display-prices-shop').value = settingsData.display_prices_in_shop || 'including';
          document.getElementById('display-prices-checkout').value = settingsData.display_prices_during_checkout || 'including';
          document.getElementById('display-tax-subtotal').value = settingsData.display_tax_subtotal || 'true';
          document.getElementById('round-tax-subtotal').value = settingsData.round_tax_at_subtotal || 'false';
        }

        // Rate CRUD
        function openAddRateModal() {
          document.getElementById('rate-modal-title').textContent = 'Neuer Steuersatz';
          document.getElementById('rate-form').reset();
          document.getElementById('rate-id').value = '';
          document.getElementById('rate-modal').style.display = 'block';
        }

        function closeRateModal() {
          document.getElementById('rate-modal').style.display = 'none';
        }

        function editRate(id) {
          const rate = ratesData.find(r => r.id === id);
          if (!rate) return;
          
          document.getElementById('rate-modal-title').textContent = 'Steuersatz bearbeiten';
          document.getElementById('rate-id').value = rate.id;
          document.getElementById('rate-name').value = rate.name;
          document.getElementById('rate-code').value = rate.code;
          document.getElementById('rate-rate').value = rate.rate;
          document.getElementById('rate-priority').value = rate.priority;
          document.getElementById('rate-country').value = rate.country_code;
          document.getElementById('rate-state').value = rate.state_code || '';
          document.getElementById('rate-zip').value = rate.zip_code || '';
          document.getElementById('rate-city').value = rate.city || '';
          document.getElementById('rate-compound').checked = rate.is_compound === 1;
          document.getElementById('rate-active').checked = rate.is_active === 1;
          document.getElementById('rate-modal').style.display = 'block';
        }

        document.getElementById('rate-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const id = document.getElementById('rate-id').value;
          const data = {
            name: document.getElementById('rate-name').value,
            code: document.getElementById('rate-code').value,
            rate: parseFloat(document.getElementById('rate-rate').value),
            priority: parseInt(document.getElementById('rate-priority').value),
            country_code: document.getElementById('rate-country').value.toUpperCase(),
            state_code: document.getElementById('rate-state').value || null,
            zip_code: document.getElementById('rate-zip').value || null,
            city: document.getElementById('rate-city').value || null,
            is_compound: document.getElementById('rate-compound').checked,
            is_active: document.getElementById('rate-active').checked
          };
          
          try {
            const url = id ? \`/api/tax/rates/\${id}\` : '/api/tax/rates';
            const method = id ? 'PUT' : 'POST';
            const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
              showToast(id ? 'Steuersatz aktualisiert' : 'Steuersatz erstellt', 'success');
              closeRateModal();
              loadRates();
            } else {
              showToast(result.error || 'Fehler beim Speichern', 'error');
            }
          } catch (error) {
            console.error('Error saving rate:', error);
            showToast('Fehler beim Speichern', 'error');
          }
        });

        async function toggleRate(id) {
          try {
            const response = await fetch(\`/api/tax/rates/\${id}/toggle\`, { method: 'PATCH' });
            const result = await response.json();
            if (result.success) {
              showToast('Status geändert', 'success');
              loadRates();
            }
          } catch (error) {
            console.error('Error toggling rate:', error);
            showToast('Fehler beim Ändern', 'error');
          }
        }

        async function deleteRate(id) {
          if (!confirm('Steuersatz wirklich löschen?')) return;
          
          try {
            const response = await fetch(\`/api/tax/rates/\${id}\`, { method: 'DELETE' });
            const result = await response.json();
            if (result.success) {
              showToast('Steuersatz gelöscht', 'success');
              loadRates();
            }
          } catch (error) {
            console.error('Error deleting rate:', error);
            showToast('Fehler beim Löschen', 'error');
          }
        }

        // Class CRUD
        function openAddClassModal() {
          document.getElementById('class-modal-title').textContent = 'Neue Steuerklasse';
          document.getElementById('class-form').reset();
          document.getElementById('class-id').value = '';
          document.getElementById('class-modal').style.display = 'block';
        }

        function closeClassModal() {
          document.getElementById('class-modal').style.display = 'none';
        }

        function editClass(id) {
          const cls = classesData.find(c => c.id === id);
          if (!cls) return;
          
          document.getElementById('class-modal-title').textContent = 'Steuerklasse bearbeiten';
          document.getElementById('class-id').value = cls.id;
          document.getElementById('class-name').value = cls.name;
          document.getElementById('class-description').value = cls.description || '';
          document.getElementById('class-default').checked = cls.is_default === 1;
          document.getElementById('class-modal').style.display = 'block';
        }

        document.getElementById('class-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const id = document.getElementById('class-id').value;
          const data = {
            name: document.getElementById('class-name').value,
            description: document.getElementById('class-description').value,
            is_default: document.getElementById('class-default').checked
          };
          
          try {
            const url = id ? \`/api/tax/classes/\${id}\` : '/api/tax/classes';
            const method = id ? 'PUT' : 'POST';
            const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
              showToast(id ? 'Steuerklasse aktualisiert' : 'Steuerklasse erstellt', 'success');
              closeClassModal();
              loadClasses();
            } else {
              showToast(result.error || 'Fehler beim Speichern', 'error');
            }
          } catch (error) {
            console.error('Error saving class:', error);
            showToast('Fehler beim Speichern', 'error');
          }
        });

        async function deleteClass(id) {
          if (!confirm('Steuerklasse wirklich löschen?')) return;
          
          try {
            const response = await fetch(\`/api/tax/classes/\${id}\`, { method: 'DELETE' });
            const result = await response.json();
            if (result.success) {
              showToast('Steuerklasse gelöscht', 'success');
              loadClasses();
            }
          } catch (error) {
            console.error('Error deleting class:', error);
            showToast('Fehler beim Löschen', 'error');
          }
        }

        // Save settings
        document.getElementById('settings-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const settings = {
            prices_include_tax: document.getElementById('prices-include-tax').value,
            tax_based_on: document.getElementById('tax-based-on').value,
            display_prices_in_shop: document.getElementById('display-prices-shop').value,
            display_prices_during_checkout: document.getElementById('display-prices-checkout').value,
            display_tax_subtotal: document.getElementById('display-tax-subtotal').value,
            round_tax_at_subtotal: document.getElementById('round-tax-subtotal').value
          };
          
          try {
            const promises = Object.entries(settings).map(([key, value]) =>
              fetch(\`/api/tax/settings/\${key}\`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value })
              })
            );
            
            await Promise.all(promises);
            showToast('Einstellungen gespeichert', 'success');
          } catch (error) {
            console.error('Error saving settings:', error);
            showToast('Fehler beim Speichern', 'error');
          }
        });

        function showToast(message, type = 'info') {
          if (window.showToast) {
            window.showToast(message, type);
          } else {
            alert(message);
          }
        }

        // Initialize
        loadAllData();
      ` }} ></script>
    </div>
  )
}
