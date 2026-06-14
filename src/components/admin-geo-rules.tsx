import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminGeoRules(rules: any[] = []) {
  const sidebar = AdminSidebarAdvanced('/admin/geo-rules')

  const actionBadge = (action: string) => {
    const map: Record<string,string> = {
      allow: 'bg-green-100 text-green-800',
      block: 'bg-red-100 text-red-800',
      redirect: 'bg-blue-100 text-blue-800',
      tax_adjust: 'bg-purple-100 text-purple-800',
    }
    const labels: Record<string,string> = {
      allow: 'Erlauben', block: 'Blockieren', redirect: 'Weiterleiten', tax_adjust: 'Steuer anpassen'
    }
    return `<span class="px-2 py-0.5 text-xs font-semibold rounded-full ${map[action]||'bg-gray-100 text-gray-700'}">${labels[action]||action}</span>`
  }

  const demoRules = rules.length > 0 ? rules : [
    { id:1, name:'EU-Länder', type:'region', target:'EU', action:'allow', priority:10, active:true },
    { id:2, name:'DE Standard', type:'country', target:'DE', action:'allow', priority:1, active:true },
    { id:3, name:'CH Weiterleitung', type:'country', target:'CH', action:'redirect', value:'https://softwareking24.ch', priority:5, active:false },
    { id:4, name:'Hochrisiko blockieren', type:'region', target:'High-Risk', action:'block', priority:99, active:false },
  ]

  const rows = demoRules.map((r: any) => `
    <tr class="hover:bg-gray-50 border-b border-gray-100" id="geo-row-${r.id}">
      <td class="px-4 py-3">
        <div class="font-semibold text-sm text-gray-800">${r.name}</div>
        <div class="text-xs text-gray-400">${r.type === 'country' ? 'Land' : r.type === 'region' ? 'Region' : 'IP-Bereich'}</div>
      </td>
      <td class="px-4 py-3">
        <span style="font-family:monospace;font-size:.85rem;font-weight:700;color:#1a2a4e;background:#f3f4f6;padding:.2rem .5rem;border-radius:4px">${r.target}</span>
      </td>
      <td class="px-4 py-3">${actionBadge(r.action)}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${r.value || '–'}</td>
      <td class="px-4 py-3 text-sm text-gray-600">${r.priority}</td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 text-xs font-semibold rounded-full ${r.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}">${r.active ? 'Aktiv' : 'Inaktiv'}</span>
      </td>
      <td class="px-4 py-3">
        <div style="display:flex;gap:.35rem">
          <button onclick="editRule(${r.id})" class="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs rounded-lg"><i class="fas fa-edit"></i></button>
          <button onclick="toggleRule(${r.id})" class="px-2 py-1 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 text-xs rounded-lg"><i class="fas fa-${r.active?'pause':'play'}"></i></button>
          <button onclick="deleteRule(${r.id})" class="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs rounded-lg"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Geo-Regeln – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body{margin:0;font-family:'Segoe UI',sans-serif;background:#f8fafc}
    .main{margin-left:280px;padding:2rem;min-height:100vh}
    @media(max-width:768px){.main{margin-left:0}}
    .card{background:white;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.07);overflow:hidden;margin-bottom:1.5rem}
    table{width:100%;border-collapse:collapse}
    th{background:#f8fafc;padding:.65rem 1rem;text-align:left;font-size:.72rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb}
    td{padding:.75rem 1rem;border-bottom:1px solid #f3f4f6;vertical-align:middle}
    tr:last-child td{border-bottom:none}
    .btn{padding:.55rem 1.25rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;display:inline-flex;align-items:center;gap:.4rem;transition:all .2s}
    .btn-primary{background:#1a2a4e;color:white}.btn-primary:hover{background:#2a3b5e}
    .btn-secondary{background:#f3f4f6;color:#374151}.btn-secondary:hover{background:#e5e7eb}
    .modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100;align-items:center;justify-content:center}
    .modal-overlay.show{display:flex}
    .modal-box{background:white;border-radius:14px;padding:1.75rem;width:90%;max-width:500px}
    .modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem}
    .modal-header h3{margin:0;font-size:1.05rem;font-weight:700;color:#1a2a4e}
    .modal-close{background:none;border:none;font-size:1.5rem;cursor:pointer;color:#9ca3af}
    .fg{margin-bottom:1rem}
    .fg label{display:block;font-size:.82rem;font-weight:600;color:#374151;margin-bottom:.3rem}
    input[type=text],input[type=number],select{width:100%;padding:.55rem .85rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.875rem;box-sizing:border-box}
    input:focus,select:focus{outline:none;border-color:#6366f1}
    .modal-footer{display:flex;justify-content:flex-end;gap:.75rem;margin-top:1.25rem;padding-top:1rem;border-top:1px solid #f3f4f6}
    .toast{position:fixed;bottom:1.5rem;right:1.5rem;padding:.75rem 1.25rem;border-radius:8px;font-size:.875rem;font-weight:600;z-index:9999;display:none}
    .toast-success{background:#d1fae5;color:#065f46}
    .toast-error{background:#fee2e2;color:#991b1b}
  </style>
</head>
<body>
  ${sidebar}
  <div class="main">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-globe-europe text-indigo-600 mr-2"></i>Geo-Regeln</h1>
        <p class="text-gray-500 text-sm mt-1">Geografische Einschränkungen und Weiterleitungen</p>
      </div>
      <button class="btn btn-primary" onclick="openAddModal()"><i class="fas fa-plus"></i>Neue Regel</button>
    </div>

    <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 text-sm text-blue-800">
      <i class="fas fa-info-circle mr-2 text-blue-500"></i>
      Geo-Regeln basieren auf der IP-Adresse des Besuchers. Regeln werden nach Priorität verarbeitet (niedrigere Zahl = höhere Priorität).
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      ${[
        {l:'Regeln gesamt',v:demoRules.length,c:'text-gray-800'},
        {l:'Aktiv',v:demoRules.filter((r:any)=>r.active).length,c:'text-green-600'},
        {l:'Blockierend',v:demoRules.filter((r:any)=>r.action==='block').length,c:'text-red-600'},
        {l:'Weiterleitend',v:demoRules.filter((r:any)=>r.action==='redirect').length,c:'text-blue-600'},
      ].map(s=>`<div style="background:white;border-radius:10px;shadow-sm border border-gray-100;padding:1rem;box-shadow:0 1px 4px rgba(0,0,0,.07)">
        <p style="font-size:.75rem;color:#9ca3af;font-weight:600;margin:0 0 .3rem">${s.l}</p>
        <p style="font-size:1.5rem;font-weight:800;margin:0" class="${s.c}">${s.v}</p>
      </div>`).join('')}
    </div>

    <div class="card">
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 class="font-bold text-gray-800"><i class="fas fa-list text-gray-400 mr-2"></i>Alle Geo-Regeln</h3>
        <span class="text-xs text-gray-400">${demoRules.length} Regeln konfiguriert</span>
      </div>
      <div class="overflow-x-auto">
        <table>
          <thead><tr>
            <th>Name</th><th>Ziel</th><th>Aktion</th><th>Wert</th><th>Priorität</th><th>Status</th><th>Aktionen</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div id="geo-modal" class="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <h3><i class="fas fa-globe-europe mr-2 text-indigo-600"></i><span id="modal-title">Neue Geo-Regel</span></h3>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <input type="hidden" id="rule-id" />
      <div class="fg"><label>Name *</label><input type="text" id="rule-name" placeholder="z.B. EU-Länder" /></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <div class="fg">
          <label>Typ</label>
          <select id="rule-type">
            <option value="country">Land (ISO-Code)</option>
            <option value="region">Region/Kontinent</option>
            <option value="ip_range">IP-Bereich</option>
          </select>
        </div>
        <div class="fg"><label>Ziel *</label><input type="text" id="rule-target" placeholder="z.B. DE, EU, 192.168.0.0/24" /></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <div class="fg">
          <label>Aktion</label>
          <select id="rule-action" onchange="toggleValue()">
            <option value="allow">Erlauben</option>
            <option value="block">Blockieren</option>
            <option value="redirect">Weiterleiten</option>
            <option value="tax_adjust">Steuer anpassen</option>
          </select>
        </div>
        <div class="fg"><label>Priorität</label><input type="number" id="rule-priority" value="10" min="1" max="999" /></div>
      </div>
      <div class="fg" id="value-group" style="display:none">
        <label>Weiterleitungs-URL / Steuersatz</label>
        <input type="text" id="rule-value" placeholder="https://... oder 19" />
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Abbrechen</button>
        <button class="btn btn-primary" onclick="saveRule()">Speichern</button>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    function showToast(msg, type) {
      if (!type) type = 'success';
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(function() { t.style.display = 'none'; }, 3000);
    }
    function toggleValue() {
      const action = document.getElementById('rule-action').value;
      document.getElementById('value-group').style.display = (action === 'redirect' || action === 'tax_adjust') ? '' : 'none';
    }
    function openAddModal() {
      document.getElementById('modal-title').textContent = 'Neue Geo-Regel';
      document.getElementById('rule-id').value = '';
      document.getElementById('rule-name').value = '';
      document.getElementById('rule-target').value = '';
      document.getElementById('rule-priority').value = '10';
      document.getElementById('rule-value').value = '';
      toggleValue();
      document.getElementById('geo-modal').classList.add('show');
    }
    function editRule(id) {
      document.getElementById('modal-title').textContent = 'Regel bearbeiten';
      document.getElementById('rule-id').value = id;
      document.getElementById('geo-modal').classList.add('show');
    }
    function closeModal() { document.getElementById('geo-modal').classList.remove('show'); }
    function saveRule() {
      const name = document.getElementById('rule-name').value;
      const target = document.getElementById('rule-target').value;
      if (!name || !target) { showToast('Name und Ziel erforderlich', 'error'); return; }
      showToast('Regel gespeichert: ' + name);
      closeModal();
    }
    function toggleRule(id) {
      const row = document.getElementById('geo-row-' + id);
      showToast('Status geändert');
    }
    function deleteRule(id) {
      if (!confirm('Regel wirklich löschen?')) return;
      document.getElementById('geo-row-' + id)?.remove();
      showToast('Regel gelöscht');
    }
  </script>
</body>
</html>`
}
