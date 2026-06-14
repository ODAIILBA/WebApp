import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminTaxSettings() {
  const sidebar = AdminSidebarAdvanced('/admin/tax-settings')
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Steuereinstellungen – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin:0; font-family:'Segoe UI',sans-serif; background:#f8fafc; }
    .main-content { margin-left:280px; padding:2rem; min-height:100vh; }
    @media(max-width:768px){ .main-content{margin-left:0;} }
    .card { background:white; border-radius:12px; box-shadow:0 1px 4px rgba(0,0,0,.07); margin-bottom:1.5rem; overflow:hidden; }
    .card-header { padding:1rem 1.5rem; border-bottom:1px solid #f3f4f6; display:flex; justify-content:space-between; align-items:center; }
    .card-header h3 { margin:0; font-size:1.05rem; font-weight:700; color:#1a2a4e; }
    table { width:100%; border-collapse:collapse; }
    th { background:#f8fafc; padding:.6rem 1rem; text-align:left; font-size:.75rem; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:.05em; border-bottom:1px solid #e5e7eb; }
    td { padding:.75rem 1rem; border-bottom:1px solid #f3f4f6; font-size:.875rem; color:#374151; vertical-align:middle; }
    tr:last-child td { border-bottom:none; }
    tr:hover td { background:#fafafa; }
    .badge-active { background:#d1fae5; color:#065f46; padding:2px 10px; border-radius:999px; font-size:.75rem; font-weight:600; }
    .badge-inactive { background:#f3f4f6; color:#6b7280; padding:2px 10px; border-radius:999px; font-size:.75rem; font-weight:600; }
    .btn { padding:.5rem 1rem; border-radius:8px; border:none; cursor:pointer; font-size:.875rem; font-weight:600; transition:all .2s; }
    .btn-primary { background:#1a2a4e; color:white; }
    .btn-primary:hover { background:#2a3b5e; }
    .btn-secondary { background:#f3f4f6; color:#374151; }
    .btn-secondary:hover { background:#e5e7eb; }
    .btn-sm { padding:.25rem .6rem; font-size:.8rem; border-radius:6px; border:none; cursor:pointer; }
    .btn-edit { background:#dbeafe; color:#1e40af; }
    .btn-edit:hover { background:#bfdbfe; }
    .btn-delete { background:#fee2e2; color:#991b1b; }
    .btn-delete:hover { background:#fecaca; }
    .btn-toggle { background:#f3f4f6; color:#6b7280; }
    .btn-toggle:hover { background:#e5e7eb; }
    .classes-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:1rem; padding:1.5rem; }
    .class-card { background:#f8fafc; border-radius:10px; padding:1.25rem; border-left:4px solid #1a2a4e; }
    .class-card.default { border-left-color:#d4af37; background:#fffbf0; }
    .class-title { font-size:1rem; font-weight:700; color:#1a2a4e; margin-bottom:.25rem; }
    .class-desc { font-size:.8rem; color:#6b7280; margin-bottom:.75rem; }
    .class-actions { display:flex; gap:.5rem; }
    .settings-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1rem; padding:1.5rem; }
    .setting-item { background:#f8fafc; padding:1rem; border-radius:8px; }
    .setting-label { display:block; font-weight:600; color:#1a2a4e; font-size:.85rem; margin-bottom:.4rem; }
    select.form-control, input.form-control { width:100%; padding:.5rem .75rem; border:1px solid #e5e7eb; border-radius:6px; font-size:.875rem; box-sizing:border-box; }
    .form-group { margin-bottom:1rem; }
    .form-group label { display:block; font-size:.85rem; font-weight:600; color:#374151; margin-bottom:.3rem; }
    .form-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
    @media(max-width:600px){ .form-row{grid-template-columns:1fr;} }
    .modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.4); z-index:100; align-items:center; justify-content:center; }
    .modal-overlay.show { display:flex; }
    .modal-box { background:white; border-radius:12px; padding:2rem; width:90%; max-width:560px; max-height:90vh; overflow-y:auto; }
    .modal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
    .modal-header h3 { margin:0; font-size:1.1rem; font-weight:700; color:#1a2a4e; }
    .modal-close { background:none; border:none; font-size:1.4rem; cursor:pointer; color:#6b7280; }
    .modal-footer { display:flex; justify-content:flex-end; gap:.75rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid #f3f4f6; }
    .toast { position:fixed; bottom:1.5rem; right:1.5rem; padding:.75rem 1.25rem; border-radius:8px; font-size:.875rem; font-weight:600; z-index:9999; transition:all .3s; }
    .toast-success { background:#d1fae5; color:#065f46; }
    .toast-error { background:#fee2e2; color:#991b1b; }
  </style>
</head>
<body>
  ${sidebar}
  <div class="main-content">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-percent text-blue-600 mr-2"></i>Steuereinstellungen</h1>
        <p class="text-gray-500 text-sm mt-1">MwSt.-Sätze, Steuerklassen und globale Steuereinstellungen</p>
      </div>
    </div>

    <!-- Tax Rates -->
    <div class="card">
      <div class="card-header">
        <h3><i class="fas fa-calculator mr-2 text-blue-600"></i>Steuersätze</h3>
        <button class="btn btn-primary" onclick="openAddRateModal()"><i class="fas fa-plus mr-1"></i>Neuer Steuersatz</button>
      </div>
      <div class="overflow-x-auto">
        <table>
          <thead><tr><th>Name</th><th>Land</th><th>Satz (%)</th><th>Priorität</th><th>Status</th><th>Aktionen</th></tr></thead>
          <tbody id="rates-tbody"><tr><td colspan="6" class="text-center py-10 text-gray-400"><i class="fas fa-spinner fa-spin"></i> Lade...</td></tr></tbody>
        </table>
      </div>
    </div>

    <!-- Tax Classes -->
    <div class="card">
      <div class="card-header">
        <h3><i class="fas fa-tags mr-2 text-purple-600"></i>Steuerklassen</h3>
        <button class="btn btn-secondary" onclick="openAddClassModal()"><i class="fas fa-plus mr-1"></i>Neue Klasse</button>
      </div>
      <div class="classes-grid" id="classes-grid">
        <div class="text-center py-10 text-gray-400 col-span-full"><i class="fas fa-spinner fa-spin"></i> Lade...</div>
      </div>
    </div>

    <!-- Global Settings -->
    <div class="card">
      <div class="card-header"><h3><i class="fas fa-cog mr-2 text-gray-600"></i>Globale Einstellungen</h3></div>
      <form id="settings-form">
        <div class="settings-grid">
          <div class="setting-item">
            <label class="setting-label">Preise inkl. Steuern</label>
            <select id="prices-include-tax" class="form-control"><option value="true">Ja</option><option value="false">Nein</option></select>
          </div>
          <div class="setting-item">
            <label class="setting-label">Steuern berechnen basierend auf</label>
            <select id="tax-based-on" class="form-control"><option value="shipping">Lieferadresse</option><option value="billing">Rechnungsadresse</option><option value="shop">Shop-Standort</option></select>
          </div>
          <div class="setting-item">
            <label class="setting-label">Preisanzeige im Shop</label>
            <select id="display-prices-shop" class="form-control"><option value="including">Inkl. MwSt.</option><option value="excluding">Exkl. MwSt.</option></select>
          </div>
          <div class="setting-item">
            <label class="setting-label">Preisanzeige im Checkout</label>
            <select id="display-prices-checkout" class="form-control"><option value="including">Inkl. MwSt.</option><option value="excluding">Exkl. MwSt.</option></select>
          </div>
          <div class="setting-item">
            <label class="setting-label">MwSt.-Zwischensumme anzeigen</label>
            <select id="display-tax-subtotal" class="form-control"><option value="true">Ja</option><option value="false">Nein</option></select>
          </div>
          <div class="setting-item">
            <label class="setting-label">Steuern runden</label>
            <select id="round-tax-subtotal" class="form-control"><option value="false">Nein</option><option value="true">Ja</option></select>
          </div>
        </div>
        <div class="px-6 pb-6">
          <button type="submit" class="btn btn-primary"><i class="fas fa-save mr-1"></i>Einstellungen speichern</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Rate Modal -->
  <div id="rate-modal" class="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <h3><i class="fas fa-calculator mr-2"></i><span id="rate-modal-title">Neuer Steuersatz</span></h3>
        <button class="modal-close" onclick="closeRateModal()">&times;</button>
      </div>
      <form id="rate-form">
        <input type="hidden" id="rate-id" />
        <div class="form-group"><label>Name *</label><input type="text" id="rate-name" class="form-control" required /></div>
        <div class="form-group"><label>Code *</label><input type="text" id="rate-code" class="form-control" required /></div>
        <div class="form-row">
          <div class="form-group"><label>Steuersatz (%) *</label><input type="number" id="rate-rate" class="form-control" step="0.01" required /></div>
          <div class="form-group"><label>Priorität</label><input type="number" id="rate-priority" class="form-control" value="1" /></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Land (ISO Code) *</label><input type="text" id="rate-country" class="form-control" maxlength="2" required /></div>
          <div class="form-group"><label>Bundesland/State</label><input type="text" id="rate-state" class="form-control" /></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>PLZ</label><input type="text" id="rate-zip" class="form-control" /></div>
          <div class="form-group"><label>Stadt</label><input type="text" id="rate-city" class="form-control" /></div>
        </div>
        <div class="form-group">
          <label><input type="checkbox" id="rate-compound" /> Zusammengesetzte Steuer</label>
        </div>
        <div class="form-group">
          <label><input type="checkbox" id="rate-active" checked /> Aktiv</label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="closeRateModal()">Abbrechen</button>
          <button type="submit" class="btn btn-primary">Speichern</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Class Modal -->
  <div id="class-modal" class="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <h3><i class="fas fa-tag mr-2"></i><span id="class-modal-title">Neue Steuerklasse</span></h3>
        <button class="modal-close" onclick="closeClassModal()">&times;</button>
      </div>
      <form id="class-form">
        <input type="hidden" id="class-id" />
        <div class="form-group"><label>Name *</label><input type="text" id="class-name" class="form-control" required /></div>
        <div class="form-group"><label>Beschreibung</label><textarea id="class-description" class="form-control" rows="2" style="resize:vertical"></textarea></div>
        <div class="form-group"><label><input type="checkbox" id="class-default" /> Als Standard markieren</label></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="closeClassModal()">Abbrechen</button>
          <button type="submit" class="btn btn-primary">Speichern</button>
        </div>
      </form>
    </div>
  </div>

  <div id="toast" class="toast" style="display:none"></div>

  <script>
    let ratesData = [], classesData = {}, settingsData = {};

    function showToast(msg, type='success') {
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(() => t.style.display = 'none', 3000);
    }

    async function loadAllData() {
      await Promise.all([loadRates(), loadClasses(), loadSettings()]);
    }

    async function loadRates() {
      try {
        const r = await fetch('/api/tax/rates'); const d = await r.json();
        if (d.success) { ratesData = d.rates; renderRates(); }
      } catch(e) { console.error(e); }
    }

    function renderRates() {
      const tbody = document.getElementById('rates-tbody');
      if (!ratesData.length) { tbody.innerHTML = '<tr><td colspan="6" class="text-center py-10 text-gray-400">Keine Steuersätze vorhanden</td></tr>'; return; }
      tbody.innerHTML = ratesData.map(r => \`
        <tr>
          <td><strong>\${r.name}</strong></td>
          <td>\${r.country_code}\${r.state_code ? ' / '+r.state_code : ''}\${r.city ? ', '+r.city : ''}</td>
          <td><strong>\${r.rate}%</strong></td>
          <td>\${r.priority}</td>
          <td><span class="\${r.is_active ? 'badge-active' : 'badge-inactive'}">\${r.is_active ? 'Aktiv' : 'Inaktiv'}</span></td>
          <td style="display:flex;gap:.4rem">
            <button class="btn-sm btn-toggle" onclick="toggleRate(\${r.id})" title="Toggle"><i class="fas fa-\${r.is_active ? 'check' : 'times'}"></i></button>
            <button class="btn-sm btn-edit" onclick="editRate(\${r.id})" title="Bearbeiten"><i class="fas fa-edit"></i></button>
            <button class="btn-sm btn-delete" onclick="deleteRate(\${r.id})" title="Löschen"><i class="fas fa-trash"></i></button>
          </td>
        </tr>\`).join('');
    }

    async function loadClasses() {
      try {
        const r = await fetch('/api/tax/classes'); const d = await r.json();
        if (d.success) { classesData = d.classes; renderClasses(); }
      } catch(e) { console.error(e); }
    }

    function renderClasses() {
      const grid = document.getElementById('classes-grid');
      if (!classesData.length) { grid.innerHTML = '<div class="col-span-full text-center py-10 text-gray-400">Keine Steuerklassen vorhanden</div>'; return; }
      grid.innerHTML = classesData.map(c => \`
        <div class="class-card \${c.is_default ? 'default' : ''}">
          <div class="class-title">\${c.name}\${c.is_default ? ' <i class="fas fa-star" style="color:#d4af37;font-size:.8rem"></i>' : ''}</div>
          \${c.description ? \`<div class="class-desc">\${c.description}</div>\` : ''}
          <div class="class-actions">
            <button class="btn-sm btn-edit" onclick="editClass(\${c.id})"><i class="fas fa-edit"></i> Bearbeiten</button>
            \${!c.is_default ? \`<button class="btn-sm btn-delete" onclick="deleteClass(\${c.id})"><i class="fas fa-trash"></i></button>\` : ''}
          </div>
        </div>\`).join('');
    }

    async function loadSettings() {
      try {
        const r = await fetch('/api/tax/settings'); const d = await r.json();
        if (d.success) { settingsData = d.settings; renderSettings(); }
      } catch(e) { console.error(e); }
    }

    function renderSettings() {
      ['prices-include-tax','tax-based-on','display-prices-shop','display-prices-checkout','display-tax-subtotal','round-tax-subtotal'].forEach(id => {
        const key = { 'prices-include-tax':'prices_include_tax','tax-based-on':'tax_based_on','display-prices-shop':'display_prices_in_shop','display-prices-checkout':'display_prices_during_checkout','display-tax-subtotal':'display_tax_subtotal','round-tax-subtotal':'round_tax_at_subtotal' }[id];
        const el = document.getElementById(id); if (el && settingsData[key]) el.value = settingsData[key];
      });
    }

    function openAddRateModal() {
      document.getElementById('rate-modal-title').textContent = 'Neuer Steuersatz';
      document.getElementById('rate-form').reset(); document.getElementById('rate-id').value = '';
      document.getElementById('rate-modal').classList.add('show');
    }
    function closeRateModal() { document.getElementById('rate-modal').classList.remove('show'); }

    function editRate(id) {
      const r = ratesData.find(x => x.id === id); if (!r) return;
      document.getElementById('rate-modal-title').textContent = 'Steuersatz bearbeiten';
      document.getElementById('rate-id').value = r.id;
      document.getElementById('rate-name').value = r.name;
      document.getElementById('rate-code').value = r.code;
      document.getElementById('rate-rate').value = r.rate;
      document.getElementById('rate-priority').value = r.priority;
      document.getElementById('rate-country').value = r.country_code;
      document.getElementById('rate-state').value = r.state_code || '';
      document.getElementById('rate-zip').value = r.zip_code || '';
      document.getElementById('rate-city').value = r.city || '';
      document.getElementById('rate-compound').checked = r.is_compound === 1;
      document.getElementById('rate-active').checked = r.is_active === 1;
      document.getElementById('rate-modal').classList.add('show');
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
        const res = await fetch(id ? '/api/tax/rates/'+id : '/api/tax/rates', {
          method: id ? 'PUT' : 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) { showToast(id ? 'Aktualisiert' : 'Erstellt'); closeRateModal(); loadRates(); }
        else showToast(result.error || 'Fehler', 'error');
      } catch(e) { showToast('Fehler', 'error'); }
    });

    async function toggleRate(id) {
      try {
        const r = await fetch('/api/tax/rates/'+id+'/toggle', {method:'PATCH'});
        const d = await r.json(); if (d.success) { showToast('Status geändert'); loadRates(); }
      } catch(e) { showToast('Fehler', 'error'); }
    }

    async function deleteRate(id) {
      if (!confirm('Steuersatz wirklich löschen?')) return;
      try {
        const r = await fetch('/api/tax/rates/'+id, {method:'DELETE'});
        const d = await r.json(); if (d.success) { showToast('Gelöscht'); loadRates(); }
      } catch(e) { showToast('Fehler', 'error'); }
    }

    function openAddClassModal() {
      document.getElementById('class-modal-title').textContent = 'Neue Steuerklasse';
      document.getElementById('class-form').reset(); document.getElementById('class-id').value = '';
      document.getElementById('class-modal').classList.add('show');
    }
    function closeClassModal() { document.getElementById('class-modal').classList.remove('show'); }

    function editClass(id) {
      const c = classesData.find(x => x.id === id); if (!c) return;
      document.getElementById('class-modal-title').textContent = 'Steuerklasse bearbeiten';
      document.getElementById('class-id').value = c.id;
      document.getElementById('class-name').value = c.name;
      document.getElementById('class-description').value = c.description || '';
      document.getElementById('class-default').checked = c.is_default === 1;
      document.getElementById('class-modal').classList.add('show');
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
        const res = await fetch(id ? '/api/tax/classes/'+id : '/api/tax/classes', {
          method: id ? 'PUT' : 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) { showToast(id ? 'Aktualisiert' : 'Erstellt'); closeClassModal(); loadClasses(); }
        else showToast(result.error || 'Fehler', 'error');
      } catch(e) { showToast('Fehler', 'error'); }
    });

    async function deleteClass(id) {
      if (!confirm('Steuerklasse wirklich löschen?')) return;
      try {
        const r = await fetch('/api/tax/classes/'+id, {method:'DELETE'});
        const d = await r.json(); if (d.success) { showToast('Gelöscht'); loadClasses(); }
      } catch(e) { showToast('Fehler', 'error'); }
    }

    document.getElementById('settings-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const pairs = {
        prices_include_tax: document.getElementById('prices-include-tax').value,
        tax_based_on: document.getElementById('tax-based-on').value,
        display_prices_in_shop: document.getElementById('display-prices-shop').value,
        display_prices_during_checkout: document.getElementById('display-prices-checkout').value,
        display_tax_subtotal: document.getElementById('display-tax-subtotal').value,
        round_tax_at_subtotal: document.getElementById('round-tax-subtotal').value
      };
      try {
        await Promise.all(Object.entries(pairs).map(([key, value]) =>
          fetch('/api/tax/settings/'+key, {method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({value})})
        ));
        showToast('Einstellungen gespeichert');
      } catch(e) { showToast('Fehler', 'error'); }
    });

    loadAllData();
  </script>
</body>
</html>`
}
