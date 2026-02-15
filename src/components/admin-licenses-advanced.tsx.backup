export const AdminLicensesAdvanced = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lizenzschlüssel - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --gold: #d4af37;
        }
        .admin-sidebar {
          width: 280px;
          background: #1a2a4e;
          color: white;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 40;
        }
        .admin-nav-item {
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .admin-nav-item:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
        }
        .admin-nav-item.active {
          background: rgba(212, 175, 55, 0.2);
          color: #d4af37;
          border-left: 4px solid #d4af37;
        }
        .license-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.2s;
        }
        .license-card:hover {
          box-shadow: 0 4px 6px rgba(0,0,0,0.15);
        }
        .status-available { background: #d1fae5; color: #059669; }
        .status-sold { background: #fee2e2; color: #dc2626; }
        .status-expired { background: #e5e7eb; color: #6b7280; }
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 50;
          align-items: center;
          justify-content: center;
        }
      </style>
    </head>
    <body class="bg-gray-100">
      <div class="flex min-h-screen">
        ${AdminSidebar('/admin/licenses')}
        
        <div class="flex-1 ml-64 p-8">
          <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="flex justify-between items-center mb-8">
              <h1 class="text-3xl font-bold" style="color: var(--navy-dark)">
                <i class="fas fa-key mr-3"></i>
                Lizenzschlüssel verwalten
              </h1>
              <div class="flex gap-3">
                <button onclick="showBulkAddModal()" class="px-4 py-2 rounded-lg text-white font-semibold" style="background: var(--navy-dark)">
                  <i class="fas fa-upload mr-2"></i>Bulk Import
                </button>
                <button onclick="showAddModal()" class="px-4 py-2 rounded-lg text-white font-semibold" style="background: var(--gold)">
                  <i class="fas fa-plus mr-2"></i>Einzeln hinzufügen
                </button>
                <button onclick="exportLicenses()" class="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">
                  <i class="fas fa-download mr-2"></i>Export
                </button>
              </div>
            </div>
            
            <!-- Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div class="bg-white rounded-lg p-6 shadow">
                <div class="text-sm text-gray-600 mb-2">Verfügbar</div>
                <div class="text-3xl font-bold text-green-600" id="stat-available">0</div>
              </div>
              <div class="bg-white rounded-lg p-6 shadow">
                <div class="text-sm text-gray-600 mb-2">Verkauft</div>
                <div class="text-3xl font-bold text-red-600" id="stat-sold">0</div>
              </div>
              <div class="bg-white rounded-lg p-6 shadow">
                <div class="text-sm text-gray-600 mb-2">Abgelaufen</div>
                <div class="text-3xl font-bold text-gray-600" id="stat-expired">0</div>
              </div>
              <div class="bg-white rounded-lg p-6 shadow">
                <div class="text-sm text-gray-600 mb-2">Gesamt</div>
                <div class="text-3xl font-bold" style="color: var(--navy-dark)" id="stat-total">0</div>
              </div>
            </div>
            
            <!-- Filters -->
            <div class="bg-white rounded-lg p-6 shadow mb-8">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Produkt</label>
                  <select id="filter-product" onchange="loadLicenses()" class="w-full px-4 py-2 border rounded-lg">
                    <option value="">Alle Produkte</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Status</label>
                  <select id="filter-status" onchange="loadLicenses()" class="w-full px-4 py-2 border rounded-lg">
                    <option value="">Alle Status</option>
                    <option value="available">Verfügbar</option>
                    <option value="sold">Verkauft</option>
                    <option value="expired">Abgelaufen</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Suche</label>
                  <input type="text" id="filter-search" onkeyup="loadLicenses()" placeholder="Lizenzschlüssel suchen..." class="w-full px-4 py-2 border rounded-lg">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Aktion</label>
                  <button onclick="loadLicenses()" class="w-full px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                    <i class="fas fa-sync-alt mr-2"></i>Aktualisieren
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Bulk Actions -->
            <div id="bulk-actions" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 hidden">
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-medium"><span id="selected-count">0</span> Lizenzen ausgewählt</span>
                </div>
                <div class="flex gap-2">
                  <button onclick="bulkDelete()" class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
                    <i class="fas fa-trash mr-2"></i>Löschen
                  </button>
                  <button onclick="bulkExport()" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                    <i class="fas fa-download mr-2"></i>Exportieren
                  </button>
                  <button onclick="clearSelection()" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                    Auswahl aufheben
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Licenses List -->
            <div id="licenses-container">
              <div class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl" style="color: var(--gold)"></i>
              </div>
            </div>
            
            <!-- Pagination -->
            <div id="pagination" class="mt-6 flex justify-center gap-2"></div>
          </div>
        </div>
      </div>
      
      <!-- Add Single License Modal -->
      <div id="addModal" class="modal">
        <div class="bg-white rounded-lg w-full max-w-2xl m-4 p-6">
          <h2 class="text-2xl font-bold mb-4" style="color: var(--navy-dark)">Lizenz hinzufügen</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Produkt *</label>
              <select id="add-product" class="w-full px-4 py-2 border rounded-lg">
                <option value="">Produkt wählen...</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Lizenzschlüssel *</label>
              <input type="text" id="add-key" class="w-full px-4 py-2 border rounded-lg" placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Lizenztyp</label>
                <select id="add-type" class="w-full px-4 py-2 border rounded-lg">
                  <option value="single">Einzel</option>
                  <option value="multi">Multi-Aktivierung</option>
                  <option value="subscription">Abonnement</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Aktivierungslimit</label>
                <input type="number" id="add-limit" value="1" min="1" class="w-full px-4 py-2 border rounded-lg">
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Ablaufdatum (optional)</label>
              <input type="date" id="add-expires" class="w-full px-4 py-2 border rounded-lg">
            </div>
          </div>
          
          <div class="flex gap-4 mt-6">
            <button onclick="addLicense()" class="flex-1 px-6 py-3 rounded-lg text-white font-semibold" style="background: var(--gold)">
              <i class="fas fa-save mr-2"></i>Speichern
            </button>
            <button onclick="closeModal('addModal')" class="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300">
              Abbrechen
            </button>
          </div>
        </div>
      </div>
      
      <!-- Bulk Add Modal -->
      <div id="bulkAddModal" class="modal">
        <div class="bg-white rounded-lg w-full max-w-3xl m-4 p-6">
          <h2 class="text-2xl font-bold mb-4" style="color: var(--navy-dark)">Bulk Import</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Produkt *</label>
              <select id="bulk-product" class="w-full px-4 py-2 border rounded-lg">
                <option value="">Produkt wählen...</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Lizenzschlüssel (einer pro Zeile) *</label>
              <textarea id="bulk-keys" rows="10" class="w-full px-4 py-2 border rounded-lg font-mono text-sm" placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
YYYYY-YYYYY-YYYYY-YYYYY-YYYYY
ZZZZZ-ZZZZZ-ZZZZZ-ZZZZZ-ZZZZZ"></textarea>
              <div class="text-sm text-gray-600 mt-2">
                <span id="bulk-count">0</span> Schlüssel erkannt
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Lizenztyp</label>
                <select id="bulk-type" class="w-full px-4 py-2 border rounded-lg">
                  <option value="single">Einzel</option>
                  <option value="multi">Multi-Aktivierung</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Aktivierungslimit</label>
                <input type="number" id="bulk-limit" value="1" min="1" class="w-full px-4 py-2 border rounded-lg">
              </div>
            </div>
          </div>
          
          <div class="flex gap-4 mt-6">
            <button onclick="bulkAddLicenses()" class="flex-1 px-6 py-3 rounded-lg text-white font-semibold" style="background: var(--navy-dark)">
              <i class="fas fa-upload mr-2"></i>Importieren
            </button>
            <button onclick="closeModal('bulkAddModal')" class="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300">
              Abbrechen
            </button>
          </div>
        </div>
      </div>
      
      <script>
        let licenses = [];
        let products = [];
        let selectedLicenses = new Set();
        let currentPage = 1;
        let totalPages = 1;
        
        async function loadLicenses(page = 1) {
          try {
            currentPage = page;
            const productId = document.getElementById('filter-product').value;
            const status = document.getElementById('filter-status').value;
            const search = document.getElementById('filter-search').value;
            
            let url = \`/api/admin/licenses?page=\${page}&limit=20\`;
            if (productId) url += \`&product_id=\${productId}\`;
            if (status) url += \`&status=\${status}\`;
            if (search) url += \`&search=\${search}\`;
            
            const response = await axios.get(url);
            licenses = response.data.data || [];
            totalPages = response.data.pagination?.pages || 1;
            
            renderLicenses();
            renderPagination();
            updateStats();
          } catch (error) {
            console.error('Error loading licenses:', error);
          }
        }
        
        function renderLicenses() {
          const container = document.getElementById('licenses-container');
          if (licenses.length === 0) {
            container.innerHTML = '<div class="text-center py-12 text-gray-400">Keine Lizenzen gefunden</div>';
            return;
          }
          
          container.innerHTML = licenses.map(lic => \`
            <div class="license-card">
              <div class="flex items-start gap-4">
                <input type="checkbox" onchange="toggleSelection(\${lic.id})" \${selectedLicenses.has(lic.id) ? 'checked' : ''} class="mt-1">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="font-mono font-bold text-lg">\${lic.license_key}</span>
                    <span class="px-3 py-1 rounded-full text-xs font-semibold status-\${lic.status}">\${lic.status}</span>
                  </div>
                  <div class="text-sm text-gray-600 space-y-1">
                    <div><i class="fas fa-box mr-2"></i>\${lic.product_name || 'Unknown Product'}</div>
                    <div><i class="fas fa-info-circle mr-2"></i>Typ: \${lic.key_type} | Aktivierungen: \${lic.activation_count}/\${lic.activation_limit}</div>
                    \${lic.expires_at ? \`<div><i class="fas fa-calendar mr-2"></i>Läuft ab: \${new Date(lic.expires_at).toLocaleDateString('de-DE')}</div>\` : ''}
                    \${lic.assigned_to_order_id ? \`<div><i class="fas fa-shopping-cart mr-2"></i>Bestellung: #\${lic.order_number || lic.assigned_to_order_id}</div>\` : ''}
                  </div>
                </div>
                <div class="flex gap-2">
                  <button onclick="copyToClipboard('\${lic.license_key}')" class="px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600" title="Kopieren">
                    <i class="fas fa-copy"></i>
                  </button>
                  <button onclick="deleteLicense(\${lic.id})" class="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600" title="Löschen">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          \`).join('');
        }
        
        function renderPagination() {
          const pagination = document.getElementById('pagination');
          if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
          }
          
          let html = '';
          for (let i = 1; i <= totalPages; i++) {
            html += \`<button onclick="loadLicenses(\${i})" class="px-4 py-2 rounded \${i === currentPage ? 'bg-navy text-white' : 'bg-gray-200'}">\${i}</button>\`;
          }
          pagination.innerHTML = html;
        }
        
        async function updateStats() {
          try {
            const response = await axios.get('/api/admin/licenses/stats');
            const stats = response.data.data;
            
            document.getElementById('stat-available').textContent = stats.available || 0;
            document.getElementById('stat-sold').textContent = stats.sold || 0;
            document.getElementById('stat-expired').textContent = stats.expired || 0;
            document.getElementById('stat-total').textContent = stats.total || 0;
          } catch (error) {
            console.error('Error loading stats:', error);
          }
        }
        
        async function loadProducts() {
          try {
            const response = await axios.get('/api/products?limit=100');
            products = response.data.data || [];
            
            const selects = ['add-product', 'bulk-product', 'filter-product'];
            selects.forEach(selectId => {
              const select = document.getElementById(selectId);
              const currentValue = select.value;
              select.innerHTML = '<option value="">Produkt wählen...</option>' + 
                products.map(p => \`<option value="\${p.id}">\${p.name}</option>\`).join('');
              select.value = currentValue;
            });
          } catch (error) {
            console.error('Error loading products:', error);
          }
        }
        
        function showAddModal() {
          document.getElementById('addModal').style.display = 'flex';
        }
        
        function showBulkAddModal() {
          document.getElementById('bulkAddModal').style.display = 'flex';
        }
        
        function closeModal(id) {
          document.getElementById(id).style.display = 'none';
        }
        
        async function addLicense() {
          try {
            const data = {
              product_id: document.getElementById('add-product').value,
              license_key: document.getElementById('add-key').value,
              key_type: document.getElementById('add-type').value,
              activation_limit: document.getElementById('add-limit').value,
              expires_at: document.getElementById('add-expires').value || null
            };
            
            if (!data.product_id || !data.license_key) {
              alert('Bitte Produkt und Lizenzschlüssel eingeben');
              return;
            }
            
            await axios.post('/api/admin/licenses', data);
            closeModal('addModal');
            loadLicenses();
            alert('Lizenz erfolgreich hinzugefügt!');
          } catch (error) {
            console.error('Error adding license:', error);
            alert('Fehler beim Hinzufügen: ' + (error.response?.data?.error || 'Unbekannter Fehler'));
          }
        }
        
        async function bulkAddLicenses() {
          try {
            const keys = document.getElementById('bulk-keys').value
              .split('\\n')
              .map(k => k.trim())
              .filter(k => k.length > 0);
            
            if (keys.length === 0) {
              alert('Bitte Lizenzschlüssel eingeben');
              return;
            }
            
            const data = {
              product_id: document.getElementById('bulk-product').value,
              license_keys: keys,
              key_type: document.getElementById('bulk-type').value,
              activation_limit: document.getElementById('bulk-limit').value
            };
            
            if (!data.product_id) {
              alert('Bitte Produkt wählen');
              return;
            }
            
            await axios.post('/api/admin/licenses/bulk', data);
            closeModal('bulkAddModal');
            loadLicenses();
            alert(\`\${keys.length} Lizenzen erfolgreich importiert!\`);
          } catch (error) {
            console.error('Error bulk adding licenses:', error);
            alert('Fehler beim Import: ' + (error.response?.data?.error || 'Unbekannter Fehler'));
          }
        }
        
        async function deleteLicense(id) {
          if (!confirm('Lizenz wirklich löschen?')) return;
          try {
            await axios.delete(\`/api/admin/licenses/\${id}\`);
            loadLicenses();
          } catch (error) {
            console.error('Error deleting license:', error);
            alert('Fehler beim Löschen');
          }
        }
        
        function toggleSelection(id) {
          if (selectedLicenses.has(id)) {
            selectedLicenses.delete(id);
          } else {
            selectedLicenses.add(id);
          }
          updateBulkActions();
        }
        
        function clearSelection() {
          selectedLicenses.clear();
          loadLicenses();
        }
        
        function updateBulkActions() {
          const bulkActions = document.getElementById('bulk-actions');
          document.getElementById('selected-count').textContent = selectedLicenses.size;
          if (selectedLicenses.size > 0) {
            bulkActions.classList.remove('hidden');
          } else {
            bulkActions.classList.add('hidden');
          }
        }
        
        async function bulkDelete() {
          if (!confirm(\`\${selectedLicenses.size} Lizenzen wirklich löschen?\`)) return;
          try {
            await axios.post('/api/admin/licenses/bulk-delete', {
              license_ids: Array.from(selectedLicenses)
            });
            selectedLicenses.clear();
            loadLicenses();
          } catch (error) {
            console.error('Error bulk deleting:', error);
            alert('Fehler beim Löschen');
          }
        }
        
        async function bulkExport() {
          try {
            const response = await axios.post('/api/admin/licenses/bulk-export', {
              license_ids: Array.from(selectedLicenses)
            }, { responseType: 'blob' });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'licenses.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
          } catch (error) {
            console.error('Error exporting:', error);
            alert('Fehler beim Export');
          }
        }
        
        async function exportLicenses() {
          try {
            const response = await axios.get('/api/admin/licenses/export', { responseType: 'blob' });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'all-licenses.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
          } catch (error) {
            console.error('Error exporting:', error);
            alert('Fehler beim Export');
          }
        }
        
        function copyToClipboard(text) {
          navigator.clipboard.writeText(text);
          alert('In Zwischenablage kopiert!');
        }
        
        // Update bulk key count
        document.getElementById('bulk-keys').addEventListener('input', (e) => {
          const keys = e.target.value.split('\\n').filter(k => k.trim().length > 0);
          document.getElementById('bulk-count').textContent = keys.length;
        });
        
        // Load data on page load
        loadProducts();
        loadLicenses();
      </script>
    </body>
    </html>
  `;
};

function AdminSidebar(currentPath: string) {
  const menuItems = [
    { path: '/admin', icon: 'tachometer-alt', label: 'Dashboard' },
    { path: '/admin/products', icon: 'box', label: 'Produkte' },
    { path: '/admin/orders', icon: 'shopping-cart', label: 'Bestellungen' },
    { path: '/admin/customers', icon: 'users', label: 'Kunden' },
    { path: '/admin/licenses', icon: 'key', label: 'Lizenzen' },
    { path: '/admin/sliders', icon: 'images', label: 'Slider' },
    { path: '/admin/homepage-sections', icon: 'th-large', label: 'Homepage' },
    { path: '/admin/pages', icon: 'file-alt', label: 'Seiten' },
    { path: '/admin/footer', icon: 'shoe-prints', label: 'Footer' },
    { path: '/admin/contact-messages', icon: 'envelope', label: 'Kontakt' },
    { path: '/admin/notifications', icon: 'bell', label: 'Benachrichtigungen' },
    { path: '/admin/settings', icon: 'cog', label: 'Einstellungen' },
  ];

  return `
    <div class="admin-sidebar">
      <div class="p-6 border-b border-gray-700">
        <h2 class="text-xl font-bold" style="color: var(--gold)">SOFTWAREKING24</h2>
        <p class="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>
      <nav class="p-4">
        ${menuItems.map(item => `
          <a href="${item.path}" class="admin-nav-item ${currentPath === item.path ? 'active' : ''}">
            <i class="fas fa-${item.icon}"></i>
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
    </div>
  `;
}
