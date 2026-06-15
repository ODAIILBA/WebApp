import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminAffiliate(affiliates: any[], stats: any) {
  const sidebarHtml = AdminSidebarAdvanced('/admin/affiliate')
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Affiliate-Marketing – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
  <style>
    body { margin: 0; font-family: 'Segoe UI', sans-serif; background: #f8fafc; }
    .main-content { margin-left: 280px; padding: 2rem; min-height: 100vh; }
    @media (max-width: 768px) { .main-content { margin-left: 0; } }
    .stat-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
    .btn-primary { background: #1a2a4e; color: white; padding: 0.5rem 1.25rem; border-radius: 8px; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn-primary:hover { background: #243660; }
    .btn-success { background: #16a34a; color: white; padding: 0.4rem 0.9rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; border: none; cursor: pointer; }
    .btn-danger { background: #dc2626; color: white; padding: 0.4rem 0.9rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; border: none; cursor: pointer; }
    .btn-edit { background: #f59e0b; color: white; padding: 0.4rem 0.9rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; border: none; cursor: pointer; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f8fafc; padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e5e7eb; }
    td { padding: 0.875rem 1rem; border-bottom: 1px solid #f3f4f6; font-size: 0.875rem; color: #374151; vertical-align: middle; }
    tr:hover td { background: #fafafa; }
    .badge-active { background: #d1fae5; color: #065f46; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .badge-inactive { background: #f3f4f6; color: #6b7280; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; }
    .modal-box { background: white; border-radius: 12px; padding: 2rem; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
    .form-group { margin-bottom: 1rem; }
    .form-label { display: block; font-size: 0.8rem; font-weight: 600; color: #374151; margin-bottom: 0.35rem; }
    .form-control { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.875rem; box-sizing: border-box; }
    .form-control:focus { outline: none; border-color: #1a2a4e; }
  </style>
</head>
<body>
  ${sidebarHtml}
  <div class="main-content">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i class="fas fa-handshake text-green-500"></i> Affiliate-Marketing
        </h1>
        <p class="text-gray-500 text-sm mt-1">Partner und Provisionen verwalten</p>
      </div>
      <button class="btn-primary" onclick="openAddModal()">
        <i class="fas fa-plus"></i> Partner hinzufügen
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Gesamt Partner</p>
        <p class="text-2xl font-bold text-gray-800">${stats.total || 0}</p>
        <i class="fas fa-users text-green-400 text-xl mt-1"></i>
      </div>
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Aktive Partner</p>
        <p class="text-2xl font-bold text-green-600">${stats.active || 0}</p>
        <i class="fas fa-check-circle text-green-400 text-xl mt-1"></i>
      </div>
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Gesamtumsatz</p>
        <p class="text-2xl font-bold text-blue-600">€${(stats.revenue || 0).toFixed(2)}</p>
        <i class="fas fa-chart-line text-blue-400 text-xl mt-1"></i>
      </div>
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Provisionen</p>
        <p class="text-2xl font-bold text-orange-600">€${(stats.commission || 0).toFixed(2)}</p>
        <i class="fas fa-percentage text-orange-400 text-xl mt-1"></i>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 class="font-semibold text-gray-700">Alle Affiliate-Partner</h2>
        <input type="text" id="search-input" placeholder="Partner suchen..." oninput="filterTable()" class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:border-blue-400" />
      </div>
      <div class="overflow-x-auto">
        <table id="affiliates-table">
          <thead>
            <tr>
              <th>Partner</th>
              <th>Code</th>
              <th>Provision</th>
              <th>Klicks</th>
              <th>Conversions</th>
              <th>Umsatz</th>
              <th>Provision (€)</th>
              <th>Status</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody id="affiliates-tbody">
            ${affiliates.map(a => ` // nosemgrep
            <tr data-id="${a.id}" data-name="${(a.name || '').toLowerCase()} ${(a.code || '').toLowerCase()} ${(a.email || '').toLowerCase()}">
              <td>
                <div class="font-semibold text-gray-800">${a.name}</div>
                ${a.email ? `<div class="text-xs text-gray-400">${a.email}</div>` : ''} // nosemgrep
              </td>
              <td><code class="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-green-700">${a.code}</code></td>
              <td class="font-semibold">${a.commission_rate}%</td>
              <td>${a.total_clicks || 0}</td>
              <td>${a.total_conversions || 0}</td>
              <td class="text-blue-600 font-semibold">€${(a.total_revenue || 0).toFixed(2)}</td>
              <td class="text-orange-600 font-semibold">€${(a.total_commission || 0).toFixed(2)}</td>
              <td><span class="${a.is_active ? 'badge-active' : 'badge-inactive'}">${a.is_active ? 'Aktiv' : 'Inaktiv'}</span></td>
              <td>
                <div class="flex items-center gap-1">
                  <button class="btn-edit" onclick="editAffiliate(${a.id})"><i class="fas fa-edit"></i></button>
                  <button class="${a.is_active ? 'btn-danger' : 'btn-success'}" onclick="toggleStatus(${a.id}, ${a.is_active})">${a.is_active ? '<i class="fas fa-ban"></i>' : '<i class="fas fa-check"></i>'}</button>
                  <button class="btn-danger" onclick="deleteAffiliate(${a.id})"><i class="fas fa-trash"></i></button>
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Add/Edit Modal -->
  <div id="modal" class="modal-overlay hidden">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-800" id="modal-title">Partner hinzufügen</h3>
        <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form id="affiliate-form" onsubmit="saveAffiliate(event)">
        <input type="hidden" id="affiliate-id" />
        <div class="grid grid-cols-2 gap-3">
          <div class="form-group col-span-2">
            <label class="form-label">Name *</label>
            <input type="text" id="f-name" class="form-control" required placeholder="z.B. TechReview Pro" />
          </div>
          <div class="form-group">
            <label class="form-label">Affiliate-Code *</label>
            <input type="text" id="f-code" class="form-control" required placeholder="z.B. TECH2024" style="text-transform:uppercase" oninput="this.value=this.value.toUpperCase()" />
          </div>
          <div class="form-group">
            <label class="form-label">Provision (%)</label>
            <input type="number" id="f-rate" class="form-control" step="0.5" min="0" max="50" value="10" />
          </div>
          <div class="form-group">
            <label class="form-label">E-Mail</label>
            <input type="email" id="f-email" class="form-control" placeholder="partner@example.de" />
          </div>
          <div class="form-group">
            <label class="form-label">Website</label>
            <input type="url" id="f-website" class="form-control" placeholder="https://..." />
          </div>
          <div class="form-group col-span-2">
            <label class="form-label">Notizen</label>
            <textarea id="f-notes" class="form-control" rows="2" placeholder="Interne Notizen..."></textarea>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">Abbrechen</button>
          <button type="submit" class="btn-primary">Speichern</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    let allAffiliates = ${JSON.stringify(affiliates)};

    function filterTable() {
      const q = document.getElementById('search-input').value.toLowerCase();
      document.querySelectorAll('#affiliates-tbody tr').forEach(row => {
        const text = row.getAttribute('data-name') || '';
        row.style.display = text.includes(q) ? '' : 'none';
      });
    }

    function openAddModal() {
      document.getElementById('modal-title').textContent = 'Partner hinzufügen';
      document.getElementById('affiliate-id').value = '';
      document.getElementById('affiliate-form').reset();
      document.getElementById('f-rate').value = '10';
      document.getElementById('modal').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('modal').classList.add('hidden');
    }

    async function editAffiliate(id) {
      const a = allAffiliates.find(x => x.id === id);
      if (!a) return;
      document.getElementById('modal-title').textContent = 'Partner bearbeiten';
      document.getElementById('affiliate-id').value = a.id;
      document.getElementById('f-name').value = a.name || '';
      document.getElementById('f-code').value = a.code || '';
      document.getElementById('f-rate').value = a.commission_rate || 10;
      document.getElementById('f-email').value = a.email || '';
      document.getElementById('f-website').value = a.website || '';
      document.getElementById('f-notes').value = a.notes || '';
      document.getElementById('modal').classList.remove('hidden');
    }

    async function saveAffiliate(e) {
      e.preventDefault();
      const id = document.getElementById('affiliate-id').value;
      const payload = {
        name: document.getElementById('f-name').value,
        code: document.getElementById('f-code').value,
        commission_rate: parseFloat(document.getElementById('f-rate').value),
        email: document.getElementById('f-email').value,
        website: document.getElementById('f-website').value,
        notes: document.getElementById('f-notes').value
      };
      try {
        if (id) {
          await axios.put('/api/admin/affiliates/' + id, payload);
        } else {
          await axios.post('/api/admin/affiliates', payload);
        }
        closeModal();
        location.reload();
      } catch (err) {
        alert('Fehler beim Speichern: ' + (err.response?.data?.error || err.message));
      }
    }

    async function toggleStatus(id, current) {
      try {
        await axios.patch('/api/admin/affiliates/' + id + '/toggle');
        location.reload();
      } catch (err) {
        alert('Fehler: ' + (err.response?.data?.error || err.message));
      }
    }

    async function deleteAffiliate(id) {
      if (!confirm('Partner wirklich löschen?')) return;
      try {
        await axios.delete('/api/admin/affiliates/' + id);
        location.reload();
      } catch (err) {
        alert('Fehler: ' + (err.response?.data?.error || err.message));
      }
    }
  </script>
</body>
</html>`
}
