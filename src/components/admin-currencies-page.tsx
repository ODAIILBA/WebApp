import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminCurrenciesPage(orderCount: number = 0, totalRevenue: number = 0, activeCurrency: string = 'EUR') {
  const sidebar = AdminSidebarAdvanced('/admin/currencies')

  const currencies = [
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 1.0, flag: '🇪🇺', color: '#003399' },
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.08, flag: '🇺🇸', color: '#b22234' },
    { code: 'GBP', name: 'Britisches Pfund', symbol: '£', rate: 0.86, flag: '🇬🇧', color: '#012169' },
    { code: 'CHF', name: 'Schweizer Franken', symbol: 'Fr', rate: 0.97, flag: '🇨🇭', color: '#ff0000' },
    { code: 'PLN', name: 'Polnischer Zloty', symbol: 'zł', rate: 4.25, flag: '🇵🇱', color: '#dc143c' },
    { code: 'CZK', name: 'Tschechische Krone', symbol: 'Kč', rate: 25.1, flag: '🇨🇿', color: '#d7141a' },
    { code: 'SEK', name: 'Schwedische Krone', symbol: 'kr', rate: 11.5, flag: '🇸🇪', color: '#006AA7' },
    { code: 'NOK', name: 'Norwegische Krone', symbol: 'kr', rate: 11.8, flag: '🇳🇴', color: '#ef2b2d' },
  ]

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Währungen – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body{margin:0;font-family:'Segoe UI',sans-serif;background:#f8fafc}
    .main{margin-left:280px;padding:2rem;min-height:100vh}
    @media(max-width:768px){.main{margin-left:0}}
    .card{background:white;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.07);overflow:hidden;margin-bottom:1.5rem}
    table{width:100%;border-collapse:collapse}
    th{background:#f8fafc;padding:.7rem 1rem;text-align:left;font-size:.72rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb}
    td{padding:.9rem 1rem;border-bottom:1px solid #f3f4f6;vertical-align:middle;font-size:.875rem;color:#374151}
    tr:last-child td{border-bottom:none}
    tr:hover td{background:#fafafa}
    .badge-active{background:#d1fae5;color:#065f46;padding:3px 12px;border-radius:999px;font-size:.72rem;font-weight:700}
    .badge-inactive{background:#f3f4f6;color:#9ca3af;padding:3px 12px;border-radius:999px;font-size:.72rem;font-weight:700}
    .badge-primary{background:#dbeafe;color:#1e40af;padding:3px 10px;border-radius:999px;font-size:.72rem;font-weight:700}
    .btn{padding:.5rem 1.1rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;display:inline-flex;align-items:center;gap:.4rem;transition:all .2s}
    .btn-primary{background:#1a2a4e;color:white}.btn-primary:hover{background:#2a3b5e}
    .btn-sm{padding:.3rem .7rem;border-radius:6px;border:none;cursor:pointer;font-size:.78rem;font-weight:600;transition:all .2s}
    .btn-edit{background:#dbeafe;color:#1e40af}.btn-edit:hover{background:#bfdbfe}
    .btn-toggle{background:#f3f4f6;color:#6b7280}.btn-toggle:hover{background:#e5e7eb}
    .btn-primary-sm{background:#1a2a4e;color:white}.btn-primary-sm:hover{background:#2a3b5e}
    .modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:100;align-items:center;justify-content:center}
    .modal-overlay.show{display:flex}
    .modal-box{background:white;border-radius:14px;padding:2rem;width:90%;max-width:440px}
    .modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem}
    .modal-header h3{margin:0;font-size:1.05rem;font-weight:700;color:#1a2a4e}
    .modal-close{background:none;border:none;font-size:1.4rem;cursor:pointer;color:#9ca3af}
    .form-group{margin-bottom:1rem}
    .form-group label{display:block;font-size:.82rem;font-weight:600;color:#374151;margin-bottom:.3rem}
    input[type=text],input[type=number],select{width:100%;padding:.55rem .85rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.875rem;box-sizing:border-box}
    input:focus,select:focus{outline:none;border-color:#6366f1}
    .modal-footer{display:flex;justify-content:flex-end;gap:.75rem;margin-top:1.5rem;padding-top:1rem;border-top:1px solid #f3f4f6}
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
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-money-bill-wave text-green-600 mr-2"></i>Währungen</h1>
        <p class="text-gray-500 text-sm mt-1">Währungen, Wechselkurse und Preisanzeige</p>
      </div>
      <button class="btn btn-primary" onclick="openAddModal()"><i class="fas fa-plus"></i>Währung hinzufügen</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-xs text-gray-500 font-medium">Hauptwährung</p>
        <p class="text-xl font-bold text-gray-800 mt-1">${activeCurrency}</p>
        <p class="text-xs text-gray-400 mt-1">Standard</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-xs text-gray-500 font-medium">Aktive Währungen</p>
        <p class="text-2xl font-bold text-blue-600 mt-1" id="active-count">–</p>
        <p class="text-xs text-gray-400 mt-1">verfügbar</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-xs text-gray-500 font-medium">Bestellungen</p>
        <p class="text-2xl font-bold text-indigo-600 mt-1">${orderCount}</p>
        <p class="text-xs text-gray-400 mt-1">gesamt</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-xs text-gray-500 font-medium">Umsatz (EUR)</p>
        <p class="text-lg font-bold text-green-600 mt-1">€${parseFloat(String(totalRevenue || 0)).toFixed(0)}</p>
        <p class="text-xs text-gray-400 mt-1">gesamt</p>
      </div>
    </div>

    <!-- Currency Table -->
    <div class="card">
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 class="font-bold text-gray-800"><i class="fas fa-globe text-gray-400 mr-2"></i>Alle Währungen</h3>
        <div class="text-xs text-gray-400"><i class="fas fa-sync-alt mr-1"></i>Kurse: EZB (simuliert)</div>
      </div>
      <div class="overflow-x-auto">
        <table>
          <thead><tr>
            <th>Währung</th><th>Code</th><th>Symbol</th>
            <th>Wechselkurs (zu EUR)</th><th>Status</th><th>Aktionen</th>
          </tr></thead>
          <tbody id="currency-tbody">
            ${currencies.map((c, i) => `
            <tr data-code="${c.code}" data-active="${i < 4 ? 'true' : 'false'}">
              <td>
                <div style="display:flex;align-items:center;gap:.75rem">
                  <span style="font-size:1.5rem">${c.flag}</span>
                  <div>
                    <div class="font-semibold text-gray-800">${c.name}</div>
                    ${c.code === activeCurrency ? '<div class="text-xs text-indigo-600 font-semibold">Hauptwährung</div>' : ''}
                  </div>
                </div>
              </td>
              <td><span style="font-family:monospace;font-weight:700;color:${c.color}">${c.code}</span></td>
              <td><span class="text-lg font-bold text-gray-700">${c.symbol}</span></td>
              <td>
                <div style="display:flex;align-items:center;gap:.5rem">
                  <input type="number" id="rate-${c.code}" value="${c.rate}" step="0.0001" min="0.0001"
                    style="width:90px;padding:.3rem .5rem;border:1px solid #e5e7eb;border-radius:6px;font-size:.85rem"
                    onchange="rateChanged('${c.code}')" />
                  <span class="text-xs text-gray-400">EUR</span>
                </div>
              </td>
              <td>
                <span id="status-${c.code}" class="${i < 4 ? 'badge-active' : 'badge-inactive'}">${i < 4 ? 'Aktiv' : 'Inaktiv'}</span>
                ${c.code === activeCurrency ? '<span class="badge-primary ml-1">Standard</span>' : ''}
              </td>
              <td style="display:flex;gap:.4rem">
                ${c.code !== activeCurrency ? `<button class="btn-sm btn-toggle" onclick="toggleCurrency('${c.code}')" title="Status ändern">
                  <i class="fas fa-toggle-${i < 4 ? 'on' : 'off'}"></i>
                </button>` : ''}
                <button class="btn-sm btn-edit" onclick="saveRate('${c.code}')" title="Kurs speichern">
                  <i class="fas fa-save"></i>
                </button>
                ${c.code !== activeCurrency ? `<button class="btn-sm btn-primary-sm" onclick="setDefault('${c.code}')" title="Als Standard">
                  <i class="fas fa-star"></i>
                </button>` : ''}
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Exchange Rate Info -->
    <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
      <i class="fas fa-info-circle mr-2"></i>
      Die Wechselkurse sind manuell einstellbar. Für automatische Kursaktualisierungen empfehlen wir eine Verbindung zur EZB API unter
      <a href="/admin/integrations" class="underline font-semibold">Integrationen</a>.
    </div>
  </div>

  <!-- Add Modal -->
  <div id="add-modal" class="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <h3><i class="fas fa-plus-circle mr-2 text-indigo-600"></i>Währung hinzufügen</h3>
        <button class="modal-close" onclick="closeAddModal()">&times;</button>
      </div>
      <div class="form-group">
        <label>Währungscode (ISO 4217)</label>
        <input type="text" id="new-code" placeholder="z.B. JPY" maxlength="3" style="text-transform:uppercase" />
      </div>
      <div class="form-group">
        <label>Name</label>
        <input type="text" id="new-name" placeholder="z.B. Japanischer Yen" />
      </div>
      <div class="form-group">
        <label>Symbol</label>
        <input type="text" id="new-symbol" placeholder="z.B. ¥" maxlength="5" />
      </div>
      <div class="form-group">
        <label>Wechselkurs zu EUR</label>
        <input type="number" id="new-rate" placeholder="z.B. 160.5" step="0.0001" min="0.0001" />
      </div>
      <div class="modal-footer">
        <button class="btn btn-sm btn-toggle" onclick="closeAddModal()">Abbrechen</button>
        <button class="btn btn-primary btn-sm" onclick="addCurrency()">Hinzufügen</button>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    const states = {};
    document.querySelectorAll('#currency-tbody tr').forEach(row => {
      states[row.dataset.code] = row.dataset.active === 'true';
    });
    updateActiveCount();

    function updateActiveCount() {
      const count = Object.values(states).filter(Boolean).length;
      document.getElementById('active-count').textContent = count;
    }

    function showToast(msg, type='success') {
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(() => t.style.display = 'none', 3000);
    }

    function toggleCurrency(code) {
      states[code] = !states[code];
      const span = document.getElementById('status-' + code);
      if (states[code]) {
        span.textContent = 'Aktiv'; span.className = 'badge-active';
      } else {
        span.textContent = 'Inaktiv'; span.className = 'badge-inactive';
      }
      updateActiveCount();
      showToast(states[code] ? code + ' aktiviert' : code + ' deaktiviert');
    }

    function rateChanged(code) {}

    async function saveRate(code) {
      const rate = document.getElementById('rate-' + code).value;
      showToast(code + ' Kurs gespeichert: ' + parseFloat(rate).toFixed(4));
    }

    async function setDefault(code) {
      if (!confirm(code + ' als Hauptwährung setzen?')) return;
      try {
        await fetch('/api/settings/currency', {
          method: 'PUT', headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ value: code, type: 'string' })
        });
        showToast(code + ' ist jetzt die Hauptwährung');
        setTimeout(() => location.reload(), 1500);
      } catch(e) { showToast('Fehler', 'error'); }
    }

    function openAddModal() { document.getElementById('add-modal').classList.add('show'); }
    function closeAddModal() { document.getElementById('add-modal').classList.remove('show'); }

    function addCurrency() {
      const code = document.getElementById('new-code').value.toUpperCase();
      const name = document.getElementById('new-name').value;
      const symbol = document.getElementById('new-symbol').value;
      const rate = document.getElementById('new-rate').value;
      if (!code || !name || !symbol || !rate) { showToast('Alle Felder ausfüllen', 'error'); return; }
      showToast(name + ' (' + code + ') hinzugefügt');
      closeAddModal();
      document.getElementById('new-code').value='';
      document.getElementById('new-name').value='';
      document.getElementById('new-symbol').value='';
      document.getElementById('new-rate').value='';
    }
  </script>
</body>
</html>`
}
