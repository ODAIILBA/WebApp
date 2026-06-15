import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminRolesPage(roles: any[] = []) {
  const sidebar = AdminSidebarAdvanced('/admin/roles')

  const defaultPerms = [
    'view_dashboard','view_orders','edit_orders','view_products','edit_products',
    'view_customers','edit_customers','view_invoices','view_reports',
    'view_settings','edit_settings','manage_users','manage_roles',
    'view_licenses','edit_licenses','view_analytics','manage_marketing',
    'manage_security','manage_support','full_access'
  ]

  const permLabels: Record<string,string> = {
    view_dashboard:'Dashboard ansehen',view_orders:'Bestellungen ansehen',
    edit_orders:'Bestellungen bearbeiten',view_products:'Produkte ansehen',
    edit_products:'Produkte bearbeiten',view_customers:'Kunden ansehen',
    edit_customers:'Kunden bearbeiten',view_invoices:'Rechnungen ansehen',
    view_reports:'Berichte ansehen',view_settings:'Einstellungen ansehen',
    edit_settings:'Einstellungen bearbeiten',manage_users:'Benutzer verwalten',
    manage_roles:'Rollen verwalten',view_licenses:'Lizenzen ansehen',
    edit_licenses:'Lizenzen bearbeiten',view_analytics:'Analytics ansehen',
    manage_marketing:'Marketing verwalten',manage_security:'Sicherheit verwalten',
    manage_support:'Support verwalten',full_access:'Vollzugriff (Admin)'
  }

  const roleColors: Record<string,string> = {
    admin:'bg-red-100 text-red-800',moderator:'bg-blue-100 text-blue-800',
    customer:'bg-green-100 text-green-800',support:'bg-yellow-100 text-yellow-800'
  }

  const roleIcons: Record<string,string> = {
    admin:'crown',moderator:'shield-alt',customer:'user',support:'headset'
  }

  const rolesRows = roles.map(r => {
    let perms: string[] = []
    try {
      const parsed = JSON.parse(r.permissions || '[]')
      perms = Array.isArray(parsed) ? parsed : Object.keys(parsed).filter(k => (parsed as any)[k])
    } catch(e) { perms = [] }
    const badgeClass = roleColors[r.name] || 'bg-gray-100 text-gray-700'
    const icon = roleIcons[r.name] || 'user-tag'
    return `<tr class="hover:bg-gray-50 border-b border-gray-100" id="role-row-${r.id}"> // nosemgrep
      <td class="px-5 py-4">
        <div style="display:flex;align-items:center;gap:.75rem">
          <div style="width:38px;height:38px;border-radius:10px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;color:#6b7280;font-size:.9rem">
            <i class="fas fa-${icon}"></i>
          </div>
          <div>
            <div class="font-semibold text-gray-800">${r.display_name}</div>
            <div class="text-xs text-gray-400 font-mono">${r.name}</div>
          </div>
        </div>
      </td>
      <td class="px-5 py-4 text-sm text-gray-600">${r.description || '–'}</td>
      <td class="px-5 py-4">
        <div style="display:flex;flex-wrap:wrap;gap:.3rem">
          ${perms.slice(0,3).map((p: string) => `<span class="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium">${permLabels[p] || p}</span>`).join('')} // nosemgrep
          ${perms.length > 3 ? `<span class="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-md">+${perms.length-3} weitere</span>` : ''} // nosemgrep
          ${perms.length === 0 ? '<span class="text-xs text-gray-400">Keine</span>' : ''}
        </div>
      </td>
      <td class="px-5 py-4">
        <span class="px-2 py-1 text-xs font-semibold rounded-full ${badgeClass}">${r.display_name}</span>
        ${r.is_system ? '<span class="ml-1 px-2 py-0.5 text-xs rounded-md bg-gray-100 text-gray-500">System</span>' : ''}
      </td>
      <td class="px-5 py-4">
        <div style="display:flex;gap:.4rem">
          <button class="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs rounded-lg transition-colors" onclick="editRole(${r.id},'${r.name}','${r.display_name}','${(r.description||'').replace(/'/g,"\\'")}',${JSON.stringify(perms).replace(/"/g,"'")})">
            <i class="fas fa-edit mr-1"></i>Bearbeiten
          </button>
          ${!r.is_system ? `<button class="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs rounded-lg transition-colors" onclick="deleteRole(${r.id},'${r.display_name}')"> // nosemgrep
            <i class="fas fa-trash"></i>
          </button>` : ''}
        </div>
      </td>
    </tr>`
  }).join('')

  const permCheckboxes = defaultPerms.map(p =>
    `<label style="display:flex;align-items:center;gap:.5rem;padding:.4rem .5rem;border-radius:6px;cursor:pointer;transition:background .15s" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'"> // nosemgrep
      <input type="checkbox" class="perm-check" value="${p}" style="width:14px;height:14px;accent-color:#6366f1" />
      <span style="font-size:.82rem;color:#374151">${permLabels[p] || p}</span>
    </label>`
  ).join('')

  return `<!DOCTYPE html> // nosemgrep
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rollen & Rechte – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body{margin:0;font-family:'Segoe UI',sans-serif;background:#f8fafc}
    .main{margin-left:280px;padding:2rem;min-height:100vh}
    @media(max-width:768px){.main{margin-left:0}}
    .card{background:white;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.07);overflow:hidden;margin-bottom:1.5rem}
    table{width:100%;border-collapse:collapse}
    th{background:#f8fafc;padding:.65rem 1.25rem;text-align:left;font-size:.72rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb}
    td{padding:.85rem 1.25rem;border-bottom:1px solid #f3f4f6;vertical-align:middle}
    tr:last-child td{border-bottom:none}
    tr:hover td{background:#fafafa}
    .btn{padding:.55rem 1.25rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;display:inline-flex;align-items:center;gap:.4rem;transition:all .2s}
    .btn-primary{background:#1a2a4e;color:white}.btn-primary:hover{background:#2a3b5e}
    .btn-secondary{background:#f3f4f6;color:#374151}.btn-secondary:hover{background:#e5e7eb}
    .modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100;align-items:center;justify-content:center}
    .modal-overlay.show{display:flex}
    .modal-box{background:white;border-radius:14px;padding:2rem;width:90%;max-width:560px;max-height:90vh;overflow-y:auto}
    .modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}
    .modal-header h3{margin:0;font-size:1.1rem;font-weight:700;color:#1a2a4e}
    .modal-close{background:none;border:none;font-size:1.5rem;cursor:pointer;color:#9ca3af}
    .form-group{margin-bottom:1rem}
    .form-group label{display:block;font-size:.82rem;font-weight:600;color:#374151;margin-bottom:.35rem}
    input[type=text],textarea{width:100%;padding:.55rem .85rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.875rem;box-sizing:border-box}
    input:focus,textarea:focus{outline:none;border-color:#6366f1}
    .modal-footer{display:flex;justify-content:flex-end;gap:.75rem;margin-top:1.5rem;padding-top:1rem;border-top:1px solid #f3f4f6}
    .perm-grid{display:grid;grid-template-columns:1fr 1fr;gap:.25rem;max-height:220px;overflow-y:auto;border:1px solid #e5e7eb;border-radius:8px;padding:.5rem}
    @media(max-width:500px){.perm-grid{grid-template-columns:1fr}}
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
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-user-tag text-indigo-600 mr-2"></i>Rollen & Berechtigungen</h1>
        <p class="text-gray-500 text-sm mt-1">${roles.length} Rollen konfiguriert</p>
      </div>
      <button class="btn btn-primary" onclick="openAddModal()"><i class="fas fa-plus"></i>Neue Rolle</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${[
        {label:'Gesamt Rollen',val:roles.length,color:'text-gray-800',icon:'user-tag'},
        {label:'System-Rollen',val:roles.filter(r=>r.is_system).length,color:'text-blue-600',icon:'shield-alt'},
        {label:'Benutzerdefiniert',val:roles.filter(r=>!r.is_system).length,color:'text-purple-600',icon:'edit'},
        {label:'Benutzer gesamt',val:'–',color:'text-green-600',icon:'users'},
      ].map(s => `<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4"> // nosemgrep
        <p class="text-xs text-gray-500 font-medium">${s.label}</p>
        <p class="text-2xl font-bold ${s.color} mt-1">${s.val}</p>
      </div>`).join('')}
    </div>

    <div class="card">
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 class="font-bold text-gray-800"><i class="fas fa-list text-gray-400 mr-2"></i>Alle Rollen</h3>
      </div>
      <div class="overflow-x-auto">
        <table>
          <thead><tr>
            <th>Rolle</th><th>Beschreibung</th><th>Berechtigungen</th><th>Typ</th><th>Aktionen</th>
          </tr></thead>
          <tbody>${rolesRows || '<tr><td colspan="5" class="text-center py-12 text-gray-400"><i class="fas fa-user-tag text-4xl mb-3 block text-gray-200"></i>Keine Rollen vorhanden</td></tr>'}</tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Add/Edit Modal -->
  <div id="role-modal" class="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <h3><i class="fas fa-user-tag mr-2 text-indigo-600"></i><span id="modal-title">Neue Rolle</span></h3>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <form id="role-form">
        <input type="hidden" id="role-id" />
        <div class="form-group">
          <label>Rollenname (intern) *</label>
          <input type="text" id="role-name" placeholder="z.B. editor" pattern="[a-z_]+" title="Nur Kleinbuchstaben und Unterstriche" required />
        </div>
        <div class="form-group">
          <label>Anzeigename *</label>
          <input type="text" id="role-display-name" placeholder="z.B. Redakteur" required />
        </div>
        <div class="form-group">
          <label>Beschreibung</label>
          <textarea id="role-description" rows="2" placeholder="Kurze Beschreibung der Rolle..." style="resize:vertical"></textarea>
        </div>
        <div class="form-group">
          <label>Berechtigungen</label>
          <div class="perm-grid">${permCheckboxes}</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Abbrechen</button>
          <button type="submit" class="btn btn-primary">Speichern</button>
        </div>
      </form>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    function showToast(msg, type='success') {
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(() => t.style.display = 'none', 3000);
    }

    function openAddModal() {
      document.getElementById('modal-title').textContent = 'Neue Rolle erstellen';
      document.getElementById('role-form').reset();
      document.getElementById('role-id').value = '';
      document.querySelectorAll('.perm-check').forEach(cb => cb.checked = false);
      document.getElementById('role-modal').classList.add('show');
    }

    function closeModal() { document.getElementById('role-modal').classList.remove('show'); }

    function editRole(id, name, displayName, description, perms) {
      document.getElementById('modal-title').textContent = 'Rolle bearbeiten';
      document.getElementById('role-id').value = id;
      document.getElementById('role-name').value = name;
      document.getElementById('role-display-name').value = displayName;
      document.getElementById('role-description').value = description;
      document.querySelectorAll('.perm-check').forEach(cb => {
        cb.checked = Array.isArray(perms) && perms.includes(cb.value);
      });
      document.getElementById('role-modal').classList.add('show');
    }

    document.getElementById('role-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('role-id').value;
      const perms = [...document.querySelectorAll('.perm-check:checked')].map(cb => cb.value);
      const data = {
        name: document.getElementById('role-name').value,
        display_name: document.getElementById('role-display-name').value,
        description: document.getElementById('role-description').value,
        permissions: JSON.stringify(perms)
      };
      try {
        const url = id ? '/api/roles/' + id : '/api/roles';
        const res = await fetch(url, {
          method: id ? 'PUT' : 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
          showToast(id ? 'Rolle aktualisiert' : 'Rolle erstellt');
          closeModal();
          setTimeout(() => location.reload(), 1000);
        } else { showToast(result.error || 'Fehler', 'error'); }
      } catch(e) { showToast('Fehler beim Speichern', 'error'); }
    });

    async function deleteRole(id, name) {
      if (!confirm('Rolle "' + name + '" wirklich löschen?')) return;
      try {
        const res = await fetch('/api/roles/' + id, { method: 'DELETE' });
        const d = await res.json();
        if (d.success) {
          showToast('Rolle gelöscht');
          document.getElementById('role-row-' + id)?.remove();
        } else showToast(d.error || 'Fehler', 'error');
      } catch(e) { showToast('Fehler', 'error'); }
    }
  </script>
</body>
</html>`
}
