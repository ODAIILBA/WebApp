import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

interface PaymentStats {
  total: number
  successful: number
  failed: number
  pending: number
  total_amount: number
  byMethod: any[]
}

export function AdminPaymentsOverview(stats: PaymentStats, transactions: any[], orderPayments: any[]) {
  const sidebar = AdminSidebarAdvanced('/admin/payments')
  const fmt = (n: number) => `€${parseFloat(String(n || 0)).toFixed(2)}`

  const methodMap: Record<string, string> = {
    paypal: 'PayPal', stripe: 'Stripe', credit_card: 'Kreditkarte',
    bank_transfer: 'Überweisung', invoice: 'Rechnung', klarna: 'Klarna',
    sofort: 'Sofort', sepa: 'SEPA', cash: 'Bar', crypto: 'Krypto'
  }

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      completed: 'bg-green-100 text-green-800', pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800', refunded: 'bg-gray-100 text-gray-700'
    }
    const labels: Record<string, string> = {
      completed: 'Abgeschlossen', pending: 'Ausstehend', failed: 'Fehlgeschlagen', refunded: 'Erstattet'
    }
    return `<span class="px-2 py-1 text-xs font-semibold rounded-full ${map[s] || 'bg-gray-100 text-gray-700'}">${labels[s] || s}</span>`
  }

  const orderRows = orderPayments.length > 0 ? orderPayments.map((o: any) => `
    <tr class="hover:bg-gray-50 border-b border-gray-100">
      <td class="px-4 py-3 text-sm font-mono font-semibold text-gray-800">#${o.id || o.order_number || '–'}</td>
      <td class="px-4 py-3 text-sm text-gray-600">${o.email || '–'}</td>
      <td class="px-4 py-3 text-sm">${methodMap[o.payment_method] || o.payment_method || '–'}</td>
      <td class="px-4 py-3 text-sm font-semibold text-gray-800">${fmt(o.total)}</td>
      <td class="px-4 py-3">${statusBadge(o.payment_status || 'pending')}</td>
      <td class="px-4 py-3 text-xs text-gray-500">${o.created_at ? new Date(o.created_at).toLocaleDateString('de-DE') : '–'}</td>
      <td class="px-4 py-3">
        <a href="/admin/orders/${o.id}" class="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded transition-colors">
          <i class="fas fa-eye"></i>
        </a>
      </td>
    </tr>`).join('') : `<tr><td colspan="7" class="px-4 py-12 text-center text-gray-400">
      <i class="fas fa-credit-card text-4xl mb-3 block text-gray-300"></i>
      <p>Keine Zahlungen vorhanden</p>
    </td></tr>`

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zahlungen – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body{margin:0;font-family:'Segoe UI',sans-serif;background:#f8fafc}
    .main{margin-left:280px;padding:2rem;min-height:100vh}
    @media(max-width:768px){.main{margin-left:0}}
    .card{background:white;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.07);overflow:hidden}
    table{width:100%;border-collapse:collapse}
    th{background:#f8fafc;padding:.65rem 1rem;text-align:left;font-size:.72rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb}
    td{padding:.75rem 1rem;vertical-align:middle}
    tr:last-child td{border-bottom:none}
    .stat-card{background:white;border-radius:12px;padding:1.25rem;box-shadow:0 1px 4px rgba(0,0,0,.07)}
    .method-bar{display:flex;align-items:center;gap:.75rem;padding:.6rem 0;border-bottom:1px solid #f3f4f6}
    .method-bar:last-child{border-bottom:none}
    .bar-fill{height:8px;border-radius:4px;transition:width .5s}
  </style>
</head>
<body>
  ${sidebar}
  <div class="main">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-credit-card text-indigo-600 mr-2"></i>Zahlungen</h1>
        <p class="text-gray-500 text-sm mt-1">Zahlungsübersicht und Transaktionen</p>
      </div>
      <div class="flex gap-2">
        <select id="filter-status" onchange="filterTable()" class="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
          <option value="">Alle Status</option>
          <option value="completed">Abgeschlossen</option>
          <option value="pending">Ausstehend</option>
          <option value="failed">Fehlgeschlagen</option>
          <option value="refunded">Erstattet</option>
        </select>
        <button onclick="window.print()" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">
          <i class="fas fa-print mr-1"></i>Drucken
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div class="stat-card">
        <p class="text-xs text-gray-500 font-medium mb-1">Gesamt</p>
        <p class="text-2xl font-bold text-gray-800">${stats.total}</p>
        <p class="text-xs text-gray-400 mt-1">Transaktionen</p>
      </div>
      <div class="stat-card">
        <p class="text-xs text-gray-500 font-medium mb-1">Erfolgreich</p>
        <p class="text-2xl font-bold text-green-600">${stats.successful}</p>
        <p class="text-xs text-gray-400 mt-1">abgeschlossen</p>
      </div>
      <div class="stat-card">
        <p class="text-xs text-gray-500 font-medium mb-1">Ausstehend</p>
        <p class="text-2xl font-bold text-yellow-600">${stats.pending}</p>
        <p class="text-xs text-gray-400 mt-1">warten auf Zahlung</p>
      </div>
      <div class="stat-card">
        <p class="text-xs text-gray-500 font-medium mb-1">Fehlgeschlagen</p>
        <p class="text-2xl font-bold text-red-600">${stats.failed}</p>
        <p class="text-xs text-gray-400 mt-1">nicht bezahlt</p>
      </div>
      <div class="stat-card">
        <p class="text-xs text-gray-500 font-medium mb-1">Gesamtumsatz</p>
        <p class="text-xl font-bold text-indigo-600">${fmt(stats.total_amount)}</p>
        <p class="text-xs text-gray-400 mt-1">bezahlte Bestellungen</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Payment Methods Breakdown -->
      <div class="card p-5">
        <h3 class="font-bold text-gray-800 mb-4"><i class="fas fa-chart-pie text-indigo-500 mr-2"></i>Nach Zahlungsart</h3>
        ${stats.byMethod.length > 0 ? stats.byMethod.map((m: any) => {
          const pct = stats.total > 0 ? Math.round((m.cnt / stats.total) * 100) : 0
          const colors: Record<string, string> = {
            paypal:'#0070ba',stripe:'#635bff',credit_card:'#1a2a4e',bank_transfer:'#059669',
            invoice:'#d97706',klarna:'#ffb3c7',sofort:'#ef9b1c',sepa:'#2563eb'
          }
          const color = colors[m.payment_method] || '#6b7280'
          return `<div class="method-bar">
            <div style="width:90px;font-size:.8rem;color:#374151;font-weight:600">${methodMap[m.payment_method] || m.payment_method}</div>
            <div style="flex:1">
              <div class="bar-fill" style="width:${pct}%;background:${color}"></div>
            </div>
            <div style="font-size:.8rem;color:#6b7280;min-width:40px;text-align:right">${pct}%</div>
            <div style="font-size:.8rem;font-weight:700;color:#374151;min-width:30px;text-align:right">${m.cnt}</div>
          </div>`
        }).join('') : '<div class="text-sm text-gray-400 text-center py-6">Keine Daten</div>'}
      </div>

      <!-- Quick Actions -->
      <div class="card p-5 lg:col-span-2">
        <h3 class="font-bold text-gray-800 mb-4"><i class="fas fa-bolt text-yellow-500 mr-2"></i>Schnellaktionen</h3>
        <div class="grid grid-cols-2 gap-3">
          <a href="/admin/payment-methods" class="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><i class="fas fa-credit-card"></i></div>
            <div><div class="text-sm font-semibold text-gray-800">Zahlungsmethoden</div><div class="text-xs text-gray-500">Verwalten & konfigurieren</div></div>
          </a>
          <a href="/admin/payment-providers" class="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"><i class="fas fa-plug"></i></div>
            <div><div class="text-sm font-semibold text-gray-800">Provider</div><div class="text-xs text-gray-500">PayPal, Stripe & Co.</div></div>
          </a>
          <a href="/admin/refunds" class="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600"><i class="fas fa-undo"></i></div>
            <div><div class="text-sm font-semibold text-gray-800">Erstattungen</div><div class="text-xs text-gray-500">Rückzahlungen verwalten</div></div>
          </a>
          <a href="/admin/invoices" class="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600"><i class="fas fa-file-invoice"></i></div>
            <div><div class="text-sm font-semibold text-gray-800">Rechnungen</div><div class="text-xs text-gray-500">Alle Rechnungen</div></div>
          </a>
        </div>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="card">
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 class="font-bold text-gray-800"><i class="fas fa-list text-gray-500 mr-2"></i>Bestellungen nach Zahlungsstatus</h3>
        <input type="text" id="search" oninput="filterTable()" placeholder="Suchen..." class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm w-48" />
      </div>
      <div class="overflow-x-auto">
        <table id="payments-table">
          <thead>
            <tr>
              <th>Bestell-Nr.</th><th>Kunde</th><th>Methode</th>
              <th>Betrag</th><th>Status</th><th>Datum</th><th></th>
            </tr>
          </thead>
          <tbody id="table-body">
            ${orderRows}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    const allRows = [...document.querySelectorAll('#table-body tr')];
    function filterTable() {
      const search = document.getElementById('search').value.toLowerCase();
      const status = document.getElementById('filter-status').value;
      allRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matchSearch = !search || text.includes(search);
        const matchStatus = !status || text.includes(status === 'completed' ? 'abgeschlossen' : status === 'pending' ? 'ausstehend' : status === 'failed' ? 'fehlgeschlagen' : 'erstattet');
        row.style.display = matchSearch && matchStatus ? '' : 'none';
      });
    }
  </script>
</body>
</html>`
}
