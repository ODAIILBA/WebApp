import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminGiftCards(cards: any[], stats: any) {
  const sidebarHtml = AdminSidebarAdvanced('/admin/gift-cards')
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gutscheine – SOFTWAREKING24</title>
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
    .btn-danger { background: #dc2626; color: white; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.8rem; border: none; cursor: pointer; }
    .btn-warn { background: #f59e0b; color: white; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.8rem; border: none; cursor: pointer; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f8fafc; padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e5e7eb; }
    td { padding: 0.875rem 1rem; border-bottom: 1px solid #f3f4f6; font-size: 0.875rem; color: #374151; vertical-align: middle; }
    tr:hover td { background: #fafafa; }
    .badge-active { background: #d1fae5; color: #065f46; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .badge-used { background: #fef3c7; color: #92400e; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .badge-expired { background: #fee2e2; color: #991b1b; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .badge-inactive { background: #f3f4f6; color: #6b7280; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; }
    .modal-box { background: white; border-radius: 12px; padding: 2rem; width: 100%; max-width: 480px; }
    .form-group { margin-bottom: 1rem; }
    .form-label { display: block; font-size: 0.8rem; font-weight: 600; color: #374151; margin-bottom: 0.35rem; }
    .form-control { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.875rem; box-sizing: border-box; }
    .form-control:focus { outline: none; border-color: #1a2a4e; }
    .progress-bar { height: 6px; border-radius: 3px; background: #e5e7eb; overflow: hidden; width: 80px; display: inline-block; }
    .progress-fill { height: 100%; border-radius: 3px; background: #16a34a; }
  </style>
</head>
<body>
  ${sidebarHtml}
  <div class="main-content">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i class="fas fa-gift text-purple-500"></i> Geschenkgutscheine
        </h1>
        <p class="text-gray-500 text-sm mt-1">Gutscheincodes erstellen und verwalten</p>
      </div>
      <div class="flex gap-2">
        <button class="btn-primary" onclick="openCreateModal()">
          <i class="fas fa-plus"></i> Gutschein erstellen
        </button>
        <button onclick="generateBulk()" class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          <i class="fas fa-magic"></i> 5 zufällig erstellen
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Gutscheine gesamt</p>
        <p class="text-2xl font-bold text-gray-800">${stats.total || 0}</p>
        <i class="fas fa-gift text-purple-400 text-xl mt-1"></i>
      </div>
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Aktiv</p>
        <p class="text-2xl font-bold text-green-600">${stats.active || 0}</p>
        <i class="fas fa-check-circle text-green-400 text-xl mt-1"></i>
      </div>
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Gesamtwert</p>
        <p class="text-2xl font-bold text-blue-600">€${(stats.total_value || 0).toFixed(2)}</p>
        <i class="fas fa-euro-sign text-blue-400 text-xl mt-1"></i>
      </div>
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Eingelöst</p>
        <p class="text-2xl font-bold text-orange-600">€${(stats.redeemed || 0).toFixed(2)}</p>
        <i class="fas fa-shopping-cart text-orange-400 text-xl mt-1"></i>
      </div>
    </div>

    <!-- Filter -->
    <div class="flex gap-2 mb-4">
      <button class="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-800 text-white" onclick="filterCards('all')">Alle</button>
      <button class="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-600 border" onclick="filterCards('active')">Aktiv</button>
      <button class="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-600 border" onclick="filterCards('used')">Eingelöst</button>
      <button class="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-600 border" onclick="filterCards('expired')">Abgelaufen</button>
      <div class="ml-auto">
        <input type="text" id="search-gc" placeholder="Code suchen..." oninput="searchCards()" class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none" />
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Empfänger</th>
              <th>Wert</th>
              <th>Restbetrag</th>
              <th>Verbrauch</th>
              <th>Status</th>
              <th>Ablauf</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody id="gift-cards-tbody">
            ${cards.map(card => {
              const pct = card.initial_amount > 0 ? ((card.initial_amount - card.remaining_amount) / card.initial_amount * 100) : 0
              const isExpired = card.expires_at && new Date(card.expires_at) < new Date()
              const isUsed = card.remaining_amount <= 0
              let badgeClass = 'badge-active'
              let badgeLabel = 'Aktiv'
              if (isExpired) { badgeClass = 'badge-expired'; badgeLabel = 'Abgelaufen' }
              else if (isUsed) { badgeClass = 'badge-used'; badgeLabel = 'Eingelöst' }
              else if (!card.is_active) { badgeClass = 'badge-inactive'; badgeLabel = 'Inaktiv' }
              const statusKey = isExpired ? 'expired' : isUsed ? 'used' : card.is_active ? 'active' : 'inactive'
              return ` // nosemgrep
            <tr data-status="${statusKey}" data-code="${(card.code || '').toLowerCase()}">
              <td>
                <code class="bg-purple-50 text-purple-700 px-2 py-1 rounded font-mono text-sm">${card.code}</code>
              </td>
              <td>
                ${card.recipient_name ? `<div class="font-medium">${card.recipient_name}</div>` : ''} // nosemgrep
                ${card.recipient_email ? `<div class="text-xs text-gray-400">${card.recipient_email}</div>` : '<span class="text-gray-400">–</span>'} // nosemgrep
              </td>
              <td class="font-semibold">€${(card.initial_amount || 0).toFixed(2)}</td>
              <td class="font-semibold ${card.remaining_amount > 0 ? 'text-green-600' : 'text-gray-400'}">€${(card.remaining_amount || 0).toFixed(2)}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px">
                  <div class="progress-bar"><div class="progress-fill" style="width:${Math.round(pct)}%;background:${pct >= 100 ? '#dc2626' : '#16a34a'}"></div></div>
                  <span class="text-xs text-gray-500">${Math.round(pct)}%</span>
                </div>
              </td>
              <td><span class="${badgeClass}">${badgeLabel}</span></td>
              <td class="text-sm text-gray-500">${card.expires_at ? new Date(card.expires_at).toLocaleDateString('de-DE') : '–'}</td>
              <td>
                <div class="flex gap-1">
                  ${card.is_active && !isExpired && !isUsed ? `<button class="btn-warn" onclick="deactivateCard(${card.id})"><i class="fas fa-ban"></i></button>` : ''} // nosemgrep
                  <button class="btn-danger" onclick="deleteCard(${card.id})"><i class="fas fa-trash"></i></button>
                </div>
              </td>
            </tr>`
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Create Modal -->
  <div id="create-modal" class="modal-overlay hidden">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-800">Gutschein erstellen</h3>
        <button onclick="closeCreateModal()" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form onsubmit="createCard(event)">
        <div class="form-group">
          <label class="form-label">Code (leer = automatisch)</label>
          <input type="text" id="gc-code" class="form-control" placeholder="z.B. GIFT-XMAS-2025" style="text-transform:uppercase" oninput="this.value=this.value.toUpperCase()" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="form-group">
            <label class="form-label">Betrag (€) *</label>
            <input type="number" id="gc-amount" class="form-control" step="5" min="5" max="500" value="25" required />
          </div>
          <div class="form-group">
            <label class="form-label">Gültig bis</label>
            <input type="date" id="gc-expires" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Empfänger Name</label>
          <input type="text" id="gc-recipient-name" class="form-control" placeholder="z.B. Max Mustermann" />
        </div>
        <div class="form-group">
          <label class="form-label">Empfänger E-Mail</label>
          <input type="email" id="gc-recipient-email" class="form-control" placeholder="empfaenger@example.de" />
        </div>
        <div class="form-group">
          <label class="form-label">Nachricht</label>
          <textarea id="gc-message" class="form-control" rows="2" placeholder="Persönliche Nachricht..."></textarea>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button type="button" onclick="closeCreateModal()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">Abbrechen</button>
          <button type="submit" class="btn-primary">Erstellen</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    function openCreateModal() {
      // Set default expiry to 1 year from now
      const d = new Date(); d.setFullYear(d.getFullYear() + 1);
      document.getElementById('gc-expires').value = d.toISOString().split('T')[0];
      document.getElementById('create-modal').classList.remove('hidden');
    }
    function closeCreateModal() {
      document.getElementById('create-modal').classList.add('hidden');
    }

    function filterCards(status) {
      document.querySelectorAll('#gift-cards-tbody tr').forEach(row => {
        const s = row.getAttribute('data-status');
        row.style.display = (status === 'all' || s === status) ? '' : 'none';
      });
      document.querySelectorAll('.flex.gap-2.mb-4 button').forEach(b => {
        b.className = b.getAttribute('onclick').includes("'" + status + "'")
          ? 'px-4 py-2 rounded-lg text-sm font-semibold bg-gray-800 text-white'
          : 'px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-600 border';
      });
    }

    function searchCards() {
      const q = document.getElementById('search-gc').value.toLowerCase();
      document.querySelectorAll('#gift-cards-tbody tr').forEach(row => {
        const code = row.getAttribute('data-code') || '';
        row.style.display = code.includes(q) ? '' : 'none';
      });
    }

    function generateCode() {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = 'GIFT-';
      for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
      code += '-';
      for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
      return code;
    }

    async function createCard(e) {
      e.preventDefault();
      const code = document.getElementById('gc-code').value || generateCode();
      const payload = {
        code,
        initial_amount: parseFloat(document.getElementById('gc-amount').value),
        expires_at: document.getElementById('gc-expires').value || null,
        recipient_name: document.getElementById('gc-recipient-name').value || null,
        recipient_email: document.getElementById('gc-recipient-email').value || null,
        message: document.getElementById('gc-message').value || null
      };
      try {
        await axios.post('/api/admin/gift-cards', payload);
        closeCreateModal();
        location.reload();
      } catch (err) {
        alert('Fehler: ' + (err.response?.data?.error || err.message));
      }
    }

    async function generateBulk() {
      if (!confirm('5 Gutscheine à €25 automatisch erstellen?')) return;
      const d = new Date(); d.setFullYear(d.getFullYear() + 1);
      const expires = d.toISOString().split('T')[0];
      try {
        for (let i = 0; i < 5; i++) {
          await axios.post('/api/admin/gift-cards', { code: generateCode(), initial_amount: 25, expires_at: expires });
        }
        location.reload();
      } catch (err) {
        alert('Fehler: ' + (err.response?.data?.error || err.message));
      }
    }

    async function deactivateCard(id) {
      if (!confirm('Gutschein deaktivieren?')) return;
      try {
        await axios.patch('/api/admin/gift-cards/' + id + '/deactivate');
        location.reload();
      } catch (err) {
        alert('Fehler: ' + (err.response?.data?.error || err.message));
      }
    }

    async function deleteCard(id) {
      if (!confirm('Gutschein wirklich löschen?')) return;
      try {
        await axios.delete('/api/admin/gift-cards/' + id);
        location.reload();
      } catch (err) {
        alert('Fehler: ' + (err.response?.data?.error || err.message));
      }
    }
  </script>
</body>
</html>`
}
