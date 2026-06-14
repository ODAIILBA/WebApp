import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminShippingMethods() {
  const sidebar = AdminSidebarAdvanced('/admin/shipping-methods')
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Versandmethoden – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin:0; font-family:'Segoe UI',sans-serif; background:#f8fafc; }
    .main-content { margin-left:280px; padding:2rem; min-height:100vh; }
    @media(max-width:768px){ .main-content{margin-left:0;} }
    .methods-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:1.25rem; }
    .method-card { background:white; border-radius:12px; padding:1.5rem; box-shadow:0 1px 4px rgba(0,0,0,.07); border-left:4px solid #1a2a4e; transition:all .2s; }
    .method-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.1); transform:translateY(-2px); }
    .method-card.inactive { opacity:.6; border-left-color:#ccc; }
    .method-icon { width:46px; height:46px; border-radius:10px; background:linear-gradient(135deg,#1a2a4e,#d4af37); display:flex; align-items:center; justify-content:center; color:white; font-size:1.25rem; }
    .method-title { font-size:1.05rem; font-weight:700; color:#1a2a4e; }
    .method-carrier { display:inline-block; padding:2px 10px; background:#f3f4f6; border-radius:12px; font-size:.75rem; font-weight:600; color:#6b7280; margin-bottom:.5rem; }
    .method-desc { font-size:.85rem; color:#6b7280; margin-bottom:.75rem; }
    .method-price { font-size:1.5rem; font-weight:700; color:#1a2a4e; margin-bottom:.5rem; }
    .free-badge { display:inline-block; padding:2px 10px; background:#d1fae5; color:#065f46; border-radius:12px; font-size:.75rem; font-weight:600; margin-bottom:.5rem; }
    .method-info { display:grid; grid-template-columns:1fr 1fr; gap:.5rem; font-size:.82rem; color:#6b7280; margin-bottom:.75rem; }
    .info-item { display:flex; align-items:center; gap:.4rem; }
    .info-item i { color:#d4af37; width:14px; }
    .method-actions { display:flex; gap:.5rem; padding-top:.75rem; border-top:1px solid #f3f4f6; }
    .method-actions button { flex:1; padding:.45rem; border:none; border-radius:6px; cursor:pointer; font-size:.8rem; font-weight:600; transition:all .2s; }
    .btn-toggle-active { background:#d1fae5; color:#065f46; }
    .btn-toggle-inactive { background:#f3f4f6; color:#6b7280; }
    .btn-edit { background:#dbeafe; color:#1e40af; }
    .btn-edit:hover { background:#bfdbfe; }
    .btn-delete { background:#fee2e2; color:#991b1b; }
    .btn-delete:hover { background:#fecaca; }
    .btn { padding:.5rem 1rem; border-radius:8px; border:none; cursor:pointer; font-size:.875rem; font-weight:600; transition:all .2s; }
    .btn-primary { background:#1a2a4e; color:white; }
    .btn-primary:hover { background:#2a3b5e; }
    .btn-secondary { background:#f3f4f6; color:#374151; }
    .btn-secondary:hover { background:#e5e7eb; }
    .form-group { margin-bottom:1rem; }
    .form-group label { display:block; font-size:.85rem; font-weight:600; color:#374151; margin-bottom:.3rem; }
    input.form-control, select.form-control, textarea.form-control { width:100%; padding:.5rem .75rem; border:1px solid #e5e7eb; border-radius:6px; font-size:.875rem; box-sizing:border-box; }
    .form-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
    @media(max-width:600px){ .form-row{grid-template-columns:1fr;} }
    .modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.4); z-index:100; align-items:center; justify-content:center; }
    .modal-overlay.show { display:flex; }
    .modal-box { background:white; border-radius:12px; padding:2rem; width:90%; max-width:580px; max-height:90vh; overflow-y:auto; }
    .modal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
    .modal-header h3 { margin:0; font-size:1.1rem; font-weight:700; color:#1a2a4e; }
    .modal-close { background:none; border:none; font-size:1.4rem; cursor:pointer; color:#6b7280; }
    .modal-footer { display:flex; justify-content:flex-end; gap:.75rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid #f3f4f6; }
    .toast { position:fixed; bottom:1.5rem; right:1.5rem; padding:.75rem 1.25rem; border-radius:8px; font-size:.875rem; font-weight:600; z-index:9999; }
    .toast-success { background:#d1fae5; color:#065f46; }
    .toast-error { background:#fee2e2; color:#991b1b; }
  </style>
</head>
<body>
  ${sidebar}
  <div class="main-content">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-shipping-fast text-blue-600 mr-2"></i>Versandmethoden</h1>
        <p class="text-gray-500 text-sm mt-1">Liefermethoden, Preise und Einstellungen verwalten</p>
      </div>
      <button class="btn btn-primary" onclick="openAddMethodModal()"><i class="fas fa-plus mr-1"></i>Neue Methode</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-sm text-gray-500">Gesamt</p>
        <p class="text-2xl font-bold text-gray-800" id="stat-total">–</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-sm text-gray-500">Aktiv</p>
        <p class="text-2xl font-bold text-green-600" id="stat-active">–</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-sm text-gray-500">Kostenloser Versand ab</p>
        <p class="text-lg font-bold text-blue-600" id="stat-free">–</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-sm text-gray-500">Günstigste Option</p>
        <p class="text-lg font-bold text-orange-600" id="stat-cheapest">–</p>
      </div>
    </div>

    <div class="methods-grid" id="methods-grid">
      <div class="col-span-full text-center py-16 text-gray-400"><i class="fas fa-spinner fa-spin text-3xl"></i><p class="mt-2">Lade Versandmethoden...</p></div>
    </div>
  </div>

  <!-- Method Modal -->
  <div id="method-modal" class="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <h3><i class="fas fa-truck mr-2"></i><span id="modal-title">Neue Versandmethode</span></h3>
        <button class="modal-close" onclick="closeMethodModal()">&times;</button>
      </div>
      <form id="method-form">
        <input type="hidden" id="method-id" />
        <div class="form-row">
          <div class="form-group"><label>Name *</label><input type="text" id="method-name" class="form-control" required /></div>
          <div class="form-group"><label>Code *</label><input type="text" id="method-code" class="form-control" required /></div>
        </div>
        <div class="form-group"><label>Beschreibung</label><textarea id="method-description" class="form-control" rows="2" style="resize:vertical"></textarea></div>
        <div class="form-row">
          <div class="form-group">
            <label>Versanddienstleister</label>
            <select id="method-carrier" class="form-control">
              <option value="">Bitte wählen...</option>
              <option value="DHL">DHL</option><option value="DPD">DPD</option>
              <option value="UPS">UPS</option><option value="FedEx">FedEx</option>
              <option value="Hermes">Hermes</option><option value="GLS">GLS</option>
              <option value="self">Selbstabholung</option>
            </select>
          </div>
          <div class="form-group"><label>Lieferzeit</label><input type="text" id="method-delivery-time" class="form-control" placeholder="z.B. 1-2 Werktage" /></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Grundpreis (€) *</label><input type="number" id="method-base-price" class="form-control" step="0.01" required /></div>
          <div class="form-group"><label>Kostenloser Versand ab (€)</label><input type="number" id="method-free-threshold" class="form-control" step="0.01" /></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Icon (FontAwesome)</label><input type="text" id="method-icon" class="form-control" placeholder="fas fa-box" /></div>
          <div class="form-group"><label>Sortierung</label><input type="number" id="method-sort" class="form-control" value="0" /></div>
        </div>
        <div class="form-group">
          <label><input type="checkbox" id="method-weight-based" onchange="toggleWeightOptions(this.checked)" /> Gewichtsbasierte Preisgestaltung</label>
        </div>
        <div id="weight-options" style="display:none">
          <div class="form-row">
            <div class="form-group"><label>Preis pro kg (€)</label><input type="number" id="method-price-per-kg" class="form-control" step="0.01" value="0" /></div>
            <div class="form-group"><label>Max. Gewicht (kg)</label><input type="number" id="method-max-weight" class="form-control" step="0.1" value="999999" /></div>
          </div>
        </div>
        <div class="form-group"><label><input type="checkbox" id="method-tracking" checked /> Sendungsverfolgung aktiviert</label></div>
        <div class="form-group"><label><input type="checkbox" id="method-active" checked /> Aktiv</label></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="closeMethodModal()">Abbrechen</button>
          <button type="submit" class="btn btn-primary">Speichern</button>
        </div>
      </form>
    </div>
  </div>

  <div id="toast" style="display:none" class="toast"></div>

  <script>
    let methodsData = [];

    function showToast(msg, type='success') {
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(() => t.style.display = 'none', 3000);
    }

    function toggleWeightOptions(checked) {
      document.getElementById('weight-options').style.display = checked ? 'block' : 'none';
    }

    async function loadMethods() {
      try {
        const r = await fetch('/api/shipping-methods'); const d = await r.json();
        if (d.success) { methodsData = d.methods; renderMethods(); updateStats(); }
      } catch(e) { console.error(e); }
    }

    function updateStats() {
      const active = methodsData.filter(m => m.is_active).length;
      document.getElementById('stat-total').textContent = methodsData.length;
      document.getElementById('stat-active').textContent = active;
      const freeThresholds = methodsData.filter(m => m.free_shipping_threshold > 0).map(m => m.free_shipping_threshold);
      document.getElementById('stat-free').textContent = freeThresholds.length ? 'ab €' + Math.min(...freeThresholds) : '–';
      const prices = methodsData.filter(m => m.is_active && m.base_price >= 0).map(m => m.base_price);
      document.getElementById('stat-cheapest').textContent = prices.length ? (Math.min(...prices) === 0 ? 'Kostenlos' : '€' + Math.min(...prices).toFixed(2)) : '–';
    }

    function renderMethods() {
      const grid = document.getElementById('methods-grid');
      if (!methodsData.length) {
        grid.innerHTML = '<div class="col-span-full text-center py-16 text-gray-400"><i class="fas fa-truck text-4xl mb-2 block"></i>Keine Versandmethoden</div>';
        return;
      }
      grid.innerHTML = methodsData.map(m => \`
        <div class="method-card \${m.is_active ? '' : 'inactive'}">
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">
            <div class="method-icon"><i class="\${m.icon || 'fas fa-box'}"></i></div>
            <div>
              <div class="method-title">\${m.name}</div>
              \${m.carrier ? \`<span class="method-carrier">\${m.carrier}</span>\` : ''}
            </div>
          </div>
          \${m.description ? \`<div class="method-desc">\${m.description}</div>\` : ''}
          <div class="method-price">
            \${m.base_price === 0 ? 'Kostenlos' : '€' + parseFloat(m.base_price).toFixed(2)}
            \${m.weight_based ? \`<span style="font-size:.85rem;color:#6b7280"> + €\${m.price_per_kg}/kg</span>\` : ''}
          </div>
          \${m.free_shipping_threshold ? \`<div class="free-badge"><i class="fas fa-gift mr-1"></i>Kostenlos ab €\${m.free_shipping_threshold}</div>\` : ''}
          <div class="method-info">
            \${m.delivery_time ? \`<div class="info-item"><i class="fas fa-clock"></i><span>\${m.delivery_time}</span></div>\` : ''}
            \${m.tracking_enabled ? \`<div class="info-item"><i class="fas fa-map-marker-alt"></i><span>Tracking</span></div>\` : ''}
          </div>
          <div class="method-actions">
            <button class="\${m.is_active ? 'btn-toggle-active' : 'btn-toggle-inactive'}" onclick="toggleMethod(\${m.id})">
              <i class="fas fa-\${m.is_active ? 'check' : 'times'}"></i> \${m.is_active ? 'Aktiv' : 'Inaktiv'}
            </button>
            <button class="btn-edit" onclick="editMethod(\${m.id})"><i class="fas fa-edit"></i></button>
            <button class="btn-delete" onclick="deleteMethod(\${m.id})"><i class="fas fa-trash"></i></button>
          </div>
        </div>\`).join('');
    }

    function openAddMethodModal() {
      document.getElementById('modal-title').textContent = 'Neue Versandmethode';
      document.getElementById('method-form').reset(); document.getElementById('method-id').value = '';
      document.getElementById('weight-options').style.display = 'none';
      document.getElementById('method-modal').classList.add('show');
    }
    function closeMethodModal() { document.getElementById('method-modal').classList.remove('show'); }

    function editMethod(id) {
      const m = methodsData.find(x => x.id === id); if (!m) return;
      document.getElementById('modal-title').textContent = 'Versandmethode bearbeiten';
      document.getElementById('method-id').value = m.id;
      document.getElementById('method-name').value = m.name;
      document.getElementById('method-code').value = m.code;
      document.getElementById('method-description').value = m.description || '';
      document.getElementById('method-carrier').value = m.carrier || '';
      document.getElementById('method-delivery-time').value = m.delivery_time || '';
      document.getElementById('method-base-price').value = m.base_price;
      document.getElementById('method-free-threshold').value = m.free_shipping_threshold || '';
      document.getElementById('method-icon').value = m.icon || '';
      document.getElementById('method-sort').value = m.sort_order || 0;
      document.getElementById('method-weight-based').checked = m.weight_based === 1;
      document.getElementById('method-price-per-kg').value = m.price_per_kg || 0;
      document.getElementById('method-max-weight').value = m.max_weight || 999999;
      document.getElementById('method-tracking').checked = m.tracking_enabled === 1;
      document.getElementById('method-active').checked = m.is_active === 1;
      document.getElementById('weight-options').style.display = m.weight_based === 1 ? 'block' : 'none';
      document.getElementById('method-modal').classList.add('show');
    }

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
        max_weight: parseFloat(document.getElementById('method-max-weight').value) || 999999,
        tracking_enabled: document.getElementById('method-tracking').checked,
        is_active: document.getElementById('method-active').checked,
        available_countries: '["DE","AT","CH"]'
      };
      try {
        const res = await fetch(id ? '/api/shipping-methods/'+id : '/api/shipping-methods', {
          method: id ? 'PUT' : 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) { showToast(id ? 'Methode aktualisiert' : 'Methode erstellt'); closeMethodModal(); loadMethods(); }
        else showToast(result.error || 'Fehler', 'error');
      } catch(e) { showToast('Fehler', 'error'); }
    });

    async function toggleMethod(id) {
      try {
        const r = await fetch('/api/shipping-methods/'+id+'/toggle', {method:'PATCH'});
        const d = await r.json(); if (d.success) { showToast('Status geändert'); loadMethods(); }
      } catch(e) { showToast('Fehler', 'error'); }
    }

    async function deleteMethod(id) {
      if (!confirm('Versandmethode wirklich löschen?')) return;
      try {
        const r = await fetch('/api/shipping-methods/'+id, {method:'DELETE'});
        const d = await r.json(); if (d.success) { showToast('Gelöscht'); loadMethods(); }
      } catch(e) { showToast('Fehler', 'error'); }
    }

    loadMethods();
  </script>
</body>
</html>`
}
