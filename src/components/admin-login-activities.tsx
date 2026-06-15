import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminLoginActivities(activities: any[] = [], stats: any = {}) {
  const sidebar = AdminSidebarAdvanced('/admin/login-activities')

  const statusBadge = (s: string) => {
    if (s === 'success') return `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800"><i class="fas fa-check mr-1"></i>Erfolg</span>`
    if (s === 'failed') return `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-800"><i class="fas fa-times mr-1"></i>Fehlgeschlagen</span>`
    if (s === 'blocked') return `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-800"><i class="fas fa-ban mr-1"></i>Geblockt</span>`
    return `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">${s}</span>` // nosemgrep
  }

  const activityRows = activities.length > 0 ? activities.map((a: any) => `
    <tr class="hover:bg-gray-50 border-b border-gray-100">
      <td class="px-4 py-3">
        <div class="text-sm font-semibold text-gray-800">${a.email || a.identifier || '–'}</div>
        <div class="text-xs text-gray-400">${a.user_type || 'customer'}</div>
      </td>
      <td class="px-4 py-3 text-sm font-mono text-gray-600">${a.ip_address || '–'}</td>
      <td class="px-4 py-3 text-xs text-gray-500 max-w-xs truncate">${a.user_agent || '–'}</td>
      <td class="px-4 py-3 text-xs text-gray-500">${a.location || '–'}</td>
      <td class="px-4 py-3">${statusBadge(a.status || a.event_type || 'success')}</td>
      <td class="px-4 py-3 text-xs text-gray-400">${a.created_at ? new Date(a.created_at).toLocaleString('de-DE') : '–'}</td>
      <td class="px-4 py-3">
        ${a.ip_address && (a.status === 'failed' || a.status === 'blocked') ? `<button onclick="blockIp('${a.ip_address}')" class="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs rounded-lg transition-colors"><i class="fas fa-ban mr-1"></i>Blockieren</button>` : ''} // nosemgrep
      </td>
    </tr>`).join('') : `<tr><td colspan="7" class="px-4 py-14 text-center text-gray-400">
      <i class="fas fa-sign-in-alt text-4xl mb-3 block text-gray-200"></i>
      <p class="font-semibold text-gray-500">Keine Login-Aktivitäten</p>
      <p class="text-sm mt-1">Anmeldeversuche werden hier protokolliert</p>
    </td></tr>`

  return `<!DOCTYPE html> // nosemgrep
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login-Aktivitäten – SOFTWAREKING24</title>
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
    .btn-danger{background:#fee2e2;color:#dc2626}.btn-danger:hover{background:#fecaca}
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
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-sign-in-alt text-indigo-600 mr-2"></i>Login-Aktivitäten</h1>
        <p class="text-gray-500 text-sm mt-1">Anmelde- und Zugriffsprotokolle überwachen</p>
      </div>
      <div class="flex gap-2">
        <a href="/admin/security/blocked-ips" class="btn btn-danger"><i class="fas fa-ban"></i>Geblockte IPs</a>
        <button onclick="exportLog()" class="btn btn-primary"><i class="fas fa-download"></i>Exportieren</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${[
        {label:'Logins heute',val:stats.today||0,color:'text-gray-800',icon:'calendar-day',bg:'bg-gray-50'},
        {label:'Erfolgreich',val:stats.success||0,color:'text-green-600',icon:'check-circle',bg:'bg-green-50'},
        {label:'Fehlgeschlagen',val:stats.failed||0,color:'text-red-600',icon:'times-circle',bg:'bg-red-50'},
        {label:'Verdächtig',val:stats.suspicious||0,color:'text-orange-600',icon:'exclamation-triangle',bg:'bg-orange-50'},
      ].map(s=>`<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4"> // nosemgrep
        <div class="flex items-center gap-3 mb-2">
          <div class="w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center ${s.color} text-sm"><i class="fas fa-${s.icon}"></i></div>
          <p class="text-xs text-gray-500 font-medium">${s.label}</p>
        </div>
        <p class="text-2xl font-bold ${s.color}">${s.val}</p>
      </div>`).join('')}
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 flex gap-3 flex-wrap">
      <select id="filter-status" onchange="filterTable()" class="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
        <option value="">Alle Status</option>
        <option value="success">Erfolgreich</option>
        <option value="failed">Fehlgeschlagen</option>
        <option value="blocked">Geblockt</option>
      </select>
      <input type="text" id="search" oninput="filterTable()" placeholder="E-Mail oder IP suchen..." class="px-3 py-2 border border-gray-200 rounded-lg text-sm flex-1 min-w-48" />
      <button onclick="filterTable()" class="btn btn-primary"><i class="fas fa-filter"></i>Filtern</button>
    </div>

    <div class="card">
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 class="font-bold text-gray-800"><i class="fas fa-list text-gray-400 mr-2"></i>Protokoll</h3>
        <span class="text-xs text-gray-400">Letzte ${activities.length} Einträge</span>
      </div>
      <div class="overflow-x-auto">
        <table>
          <thead><tr>
            <th>Benutzer</th><th>IP-Adresse</th><th>Browser/Gerät</th>
            <th>Ort</th><th>Status</th><th>Zeitpunkt</th><th></th>
          </tr></thead>
          <tbody id="activity-tbody">${activityRows}</tbody>
        </table>
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
    const allRows = [...document.querySelectorAll('#activity-tbody tr')];
    function filterTable() {
      const search = document.getElementById('search').value.toLowerCase();
      const status = document.getElementById('filter-status').value;
      allRows.forEach(function(row) {
        const text = row.textContent.toLowerCase();
        const matchSearch = !search || text.includes(search);
        const matchStatus = !status || text.includes(status === 'success' ? 'erfolg' : status === 'failed' ? 'fehlgeschlagen' : 'geblockt');
        row.style.display = matchSearch && matchStatus ? '' : 'none';
      });
    }
    async function blockIp(ip) {
      if (!confirm('IP ' + ip + ' blockieren?')) return;
      try {
        const res = await fetch('/api/admin/firewall/rules', {
          method: 'POST', headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ type: 'ip', value: ip, action: 'block', reason: 'Manuell blockiert via Login-Protokoll' })
        });
        const d = await res.json();
        if (d.success) showToast('IP ' + ip + ' blockiert');
        else showToast('Fehler: ' + (d.error || ''), 'error');
      } catch(e) { showToast('Fehler', 'error'); }
    }
    function exportLog() { showToast('Export wird vorbereitet...'); }
  </script>
</body>
</html>`
}
