import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminManagersPage(managers: any[] = [], roles: any[] = []) {
  const sidebar = AdminSidebarAdvanced('/admin/managers')

  const statusBadge = (active: number | boolean) => active
    ? `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">Aktiv</span>`
    : `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-500">Inaktiv</span>`

  const roleColors: Record<string, string> = {
    admin: 'bg-red-100 text-red-800',
    moderator: 'bg-blue-100 text-blue-800',
    support: 'bg-yellow-100 text-yellow-800',
    customer: 'bg-green-100 text-green-800',
  }

  const rows = managers.length > 0 ? managers.map((m: any) => `
    <tr class="hover:bg-gray-50 border-b border-gray-100" id="mgr-row-${m.id}">
      <td class="px-4 py-3">
        <div style="display:flex;align-items:center;gap:.75rem">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:.85rem;flex-shrink:0">
            ${(m.first_name?.[0] || m.email?.[0] || 'A').toUpperCase()}
          </div>
          <div>
            <div class="text-sm font-semibold text-gray-800">${m.first_name || ''} ${m.last_name || ''}</div>
            <div class="text-xs text-gray-400">${m.email || '–'}</div>
          </div>
        </div>
      </td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 text-xs font-semibold rounded-full ${roleColors[m.role] || 'bg-gray-100 text-gray-700'}">${m.role || 'Mitarbeiter'}</span>
      </td>
      <td class="px-4 py-3 text-sm text-gray-600">${m.department || '–'}</td>
      <td class="px-4 py-3">${statusBadge(m.is_active)}</td>
      <td class="px-4 py-3 text-xs text-gray-400">${m.last_login ? new Date(m.last_login).toLocaleDateString('de-DE') : 'Noch nie'}</td>
      <td class="px-4 py-3 text-xs text-gray-400">${m.created_at ? new Date(m.created_at).toLocaleDateString('de-DE') : '–'}</td>
      <td class="px-4 py-3">
        <div style="display:flex;gap:.35rem">
          <button onclick="editManager(${m.id})" class="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs rounded-lg transition-colors"><i class="fas fa-edit mr-1"></i>Bearbeiten</button>
          <button onclick="toggleManager(${m.id}, ${m.is_active ? 0 : 1})" class="px-2 py-1 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 text-xs rounded-lg transition-colors">
            <i class="fas fa-${m.is_active ? 'pause' : 'play'}"></i>
          </button>
          <button onclick="deleteManager(${m.id})" class="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs rounded-lg transition-colors"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('') : `<tr><td colspan="7" class="px-4 py-14 text-center text-gray-400">
      <i class="fas fa-users-cog text-4xl mb-3 block text-gray-200"></i>
      <p class="font-semibold text-gray-500">Noch keine Mitarbeiter</p>
      <p class="text-sm mt-1">Klicken Sie auf "Mitarbeiter hinzufügen" um loszulegen</p>
    </td></tr>`

  const roleOptions = roles.map(r => `<option value="${r.name}">${r.display_name || r.name}</option>`).join('')

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mitarbeiter – SOFTWAREKING24</title>
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
    .modal-box{background:white;border-radius:14px;padding:1.75rem;width:90%;max-width:520px;max-height:90vh;overflow-y:auto}
    .modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem}
    .modal-header h3{margin:0;font-size:1.05rem;font-weight:700;color:#1a2a4e}
    .modal-close{background:none;border:none;font-size:1.5rem;cursor:pointer;color:#9ca3af}
    .fg{margin-bottom:1rem}
    .fg label{display:block;font-size:.82rem;font-weight:600;color:#374151;margin-bottom:.3rem}
    .fg .hint{font-size:.74rem;color:#9ca3af;margin-top:.2rem}
    input[type=text],input[type=email],input[type=password],select{width:100%;padding:.55rem .85rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.875rem;box-sizing:border-box}
    input:focus,select:focus{outline:none;border-color:#6366f1}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
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
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-users-cog text-indigo-600 mr-2"></i>Mitarbeiter & Manager</h1>
        <p class="text-gray-500 text-sm mt-1">${managers.length} Mitarbeiter im System</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary" onclick="window.location='/admin/roles'"><i class="fas fa-user-tag"></i>Rollen</button>
        <button class="btn btn-primary" onclick="openAddModal()"><i class="fas fa-user-plus"></i>Mitarbeiter hinzufügen</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${[
        {label:'Gesamt',val:managers.length,color:'text-gray-800',icon:'users'},
        {label:'Aktiv',val:managers.filter((m:any)=>m.is_active).length,color:'text-green-600',icon:'check-circle'},
        {label:'Admins',val:managers.filter((m:any)=>m.role==='admin').length,color:'text-red-500',icon:'crown'},
        {label:'Support',val:managers.filter((m:any)=>m.role==='support').length,color:'text-yellow-600',icon:'headset'},
      ].map(s=>`<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-xs text-gray-500 font-medium"><i class="fas fa-${s.icon} mr-1"></i>${s.label}</p>
        <p class="text-2xl font-bold ${s.color} mt-1">${s.val}</p>
      </div>`).join('')}
    </div>

    <div class="card">
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 class="font-bold text-gray-800"><i class="fas fa-list text-gray-400 mr-2"></i>Alle Mitarbeiter</h3>
        <div class="flex gap-2">
          <select id="filter-role" onchange="filterTable()" class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white">
            <option value="">Alle Rollen</option>
            ${roles.map(r => `<option value="${r.name}">${r.display_name || r.name}</option>`).join('')}
          </select>
          <input type="text" id="search" oninput="filterTable()" placeholder="Suchen..." class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm w-40" />
        </div>
      </div>
      <div class="overflow-x-auto">
        <table>
          <thead><tr>
            <th>Mitarbeiter</th><th>Rolle</th><th>Abteilung</th><th>Status</th>
            <th>Letzter Login</th><th>Erstellt</th><th>Aktionen</th>
          </tr></thead>
          <tbody id="mgr-tbody">${rows}</tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Add/Edit Modal -->
  <div id="mgr-modal" class="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <h3><i class="fas fa-user-plus mr-2 text-indigo-600"></i><span id="modal-title">Mitarbeiter hinzufügen</span></h3>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <input type="hidden" id="mgr-id" />
      <div class="form-row">
        <div class="fg"><label>Vorname *</label><input type="text" id="mgr-first-name" placeholder="Max" /></div>
        <div class="fg"><label>Nachname *</label><input type="text" id="mgr-last-name" placeholder="Mustermann" /></div>
      </div>
      <div class="fg"><label>E-Mail *</label><input type="email" id="mgr-email" placeholder="max@shop.de" /></div>
      <div class="form-row">
        <div class="fg">
          <label>Rolle *</label>
          <select id="mgr-role">
            <option value="">Rolle wählen...</option>
            ${roleOptions || `<option value="admin">Administrator</option><option value="moderator">Moderator</option><option value="support">Support</option>`}
          </select>
        </div>
        <div class="fg"><label>Abteilung</label><input type="text" id="mgr-department" placeholder="z.B. Kundenservice" /></div>
      </div>
      <div class="fg">
        <label>Passwort <span id="pw-hint" class="text-gray-400 font-normal">(leer lassen = keine Änderung)</span></label>
        <input type="password" id="mgr-password" placeholder="••••••••" autocomplete="new-password" />
        <div class="hint">Mindestens 8 Zeichen</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Abbrechen</button>
        <button class="btn btn-primary" onclick="saveManager()">Speichern</button>
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
    const allRows = [...document.querySelectorAll('#mgr-tbody tr')];
    function filterTable() {
      const search = document.getElementById('search').value.toLowerCase();
      const role = document.getElementById('filter-role').value;
      allRows.forEach(function(row) {
        const text = row.textContent.toLowerCase();
        const matchSearch = !search || text.includes(search);
        const matchRole = !role || text.includes(role);
        row.style.display = matchSearch && matchRole ? '' : 'none';
      });
    }
    function openAddModal() {
      document.getElementById('modal-title').textContent = 'Mitarbeiter hinzufügen';
      document.getElementById('mgr-id').value = '';
      document.getElementById('mgr-first-name').value = '';
      document.getElementById('mgr-last-name').value = '';
      document.getElementById('mgr-email').value = '';
      document.getElementById('mgr-role').value = '';
      document.getElementById('mgr-department').value = '';
      document.getElementById('mgr-password').value = '';
      document.getElementById('pw-hint').style.display = '';
      document.getElementById('mgr-modal').classList.add('show');
    }
    function editManager(id) {
      document.getElementById('modal-title').textContent = 'Mitarbeiter bearbeiten';
      document.getElementById('mgr-id').value = id;
      document.getElementById('pw-hint').style.display = '';
      document.getElementById('mgr-modal').classList.add('show');
    }
    function closeModal() { document.getElementById('mgr-modal').classList.remove('show'); }
    async function saveManager() {
      const fn = document.getElementById('mgr-first-name').value;
      const ln = document.getElementById('mgr-last-name').value;
      const email = document.getElementById('mgr-email').value;
      const role = document.getElementById('mgr-role').value;
      if (!fn || !ln || !email || !role) { showToast('Bitte alle Pflichtfelder ausfüllen', 'error'); return; }
      const id = document.getElementById('mgr-id').value;
      const data = {
        first_name: fn, last_name: ln, email: email, role: role,
        department: document.getElementById('mgr-department').value,
        password: document.getElementById('mgr-password').value,
        is_admin: role === 'admin' ? 1 : 0
      };
      try {
        const url = id ? '/api/admin/users/' + id : '/api/admin/users';
        const res = await fetch(url, {
          method: id ? 'PUT' : 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
          showToast(id ? 'Mitarbeiter aktualisiert' : 'Mitarbeiter erstellt');
          closeModal();
          setTimeout(function() { location.reload(); }, 1000);
        } else { showToast(result.error || 'Fehler', 'error'); }
      } catch(e) { showToast('Fehler beim Speichern', 'error'); }
    }
    async function toggleManager(id, active) {
      try {
        const res = await fetch('/api/admin/users/' + id + '/toggle', {
          method: 'POST', headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ is_active: active })
        });
        const d = await res.json();
        if (d.success) {
          showToast(active ? 'Mitarbeiter aktiviert' : 'Mitarbeiter deaktiviert');
          setTimeout(function() { location.reload(); }, 800);
        }
      } catch(e) { showToast('Fehler', 'error'); }
    }
    async function deleteManager(id) {
      if (!confirm('Mitarbeiter wirklich löschen?')) return;
      try {
        const res = await fetch('/api/admin/users/' + id, { method: 'DELETE' });
        const d = await res.json();
        if (d.success) { document.getElementById('mgr-row-' + id)?.remove(); showToast('Gelöscht'); }
        else showToast(d.error || 'Fehler', 'error');
      } catch(e) { showToast('Fehler', 'error'); }
    }
  </script>
</body>
</html>`
}
