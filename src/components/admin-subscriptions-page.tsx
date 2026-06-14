import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminSubscriptionsPage(stats: any = {}, subscribers: any[] = []) {
  const sidebar = AdminSidebarAdvanced('/admin/subscriptions')
  const fmt = (n: number) => `€${parseFloat(String(n || 0)).toFixed(2)}`

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      paused: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-gray-100 text-gray-500',
    }
    const labels: Record<string, string> = {
      active: 'Aktiv', cancelled: 'Gekündigt', paused: 'Pausiert', expired: 'Abgelaufen'
    }
    return `<span class="px-2 py-0.5 text-xs font-semibold rounded-full ${map[s] || 'bg-gray-100 text-gray-700'}">${labels[s] || s}</span>`
  }

  const subscriberRows = subscribers.length > 0 ? subscribers.map(s => `
    <tr class="hover:bg-gray-50 border-b border-gray-100">
      <td class="px-4 py-3">
        <div class="text-sm font-semibold text-gray-800">${s.email || '–'}</div>
        <div class="text-xs text-gray-400">${s.name || ''}</div>
      </td>
      <td class="px-4 py-3 text-sm text-gray-600">${s.plan || 'Standard'}</td>
      <td class="px-4 py-3 text-sm font-semibold">${fmt(s.amount)}/Monat</td>
      <td class="px-4 py-3">${statusBadge(s.status || 'active')}</td>
      <td class="px-4 py-3 text-xs text-gray-400">${s.next_billing ? new Date(s.next_billing).toLocaleDateString('de-DE') : '–'}</td>
      <td class="px-4 py-3">
        <div style="display:flex;gap:.35rem">
          <button class="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs rounded-lg"><i class="fas fa-eye"></i></button>
          <button class="px-2 py-1 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 text-xs rounded-lg" title="Pausieren"><i class="fas fa-pause"></i></button>
          <button class="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs rounded-lg" title="Kündigen"><i class="fas fa-times"></i></button>
        </div>
      </td>
    </tr>`).join('') : `<tr><td colspan="6" class="px-4 py-14 text-center text-gray-400">
      <i class="fas fa-repeat text-4xl mb-3 block text-gray-200"></i>
      <p class="font-semibold">Keine Abonnements vorhanden</p>
      <p class="text-sm mt-1">Richten Sie Abonnement-Pläne ein, um hier Daten zu sehen</p>
    </td></tr>`

  const plans = [
    { name: 'Starter', price: '9,99', interval: 'Monat', features: ['5 Lizenzen', 'E-Mail-Support', 'Updates inklusive'], color: '#6366f1', active: false },
    { name: 'Professional', price: '24,99', interval: 'Monat', features: ['25 Lizenzen', 'Prioritäts-Support', 'Updates & Upgrades', 'Firmenrechnung'], color: '#059669', active: false },
    { name: 'Enterprise', price: '79,99', interval: 'Monat', features: ['Unbegrenzte Lizenzen', '24/7 Support', 'Dedicated Manager', 'SLA garantiert'], color: '#1a2a4e', active: false },
  ]

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Abonnements – SOFTWAREKING24</title>
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
    .plan-card{background:white;border-radius:14px;border:2px solid #e5e7eb;padding:1.5rem;position:relative;transition:all .2s}
    .plan-card:hover{border-color:#6366f1;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.08)}
    .plan-badge{position:absolute;top:-1px;right:20px;padding:.2rem .85rem;border-radius:0 0 8px 8px;font-size:.72rem;font-weight:700;color:white}
    .tab{padding:.5rem 1.1rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;transition:all .2s;background:transparent;color:#6b7280}
    .tab.active{background:#1a2a4e;color:white}
    .toast{position:fixed;bottom:1.5rem;right:1.5rem;padding:.75rem 1.25rem;border-radius:8px;font-size:.875rem;font-weight:600;z-index:9999;display:none}
    .toast-success{background:#d1fae5;color:#065f46}
  </style>
</head>
<body>
  ${sidebar}
  <div class="main">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-repeat text-indigo-600 mr-2"></i>Abonnements</h1>
        <p class="text-gray-500 text-sm mt-1">Wiederkehrende Abonnements und Pläne verwalten</p>
      </div>
      <button class="btn btn-primary" onclick="showToast('Neuer Plan – Funktion wird bald verfügbar')"><i class="fas fa-plus"></i>Neuer Plan</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      ${[
        {label:'Aktive Abos',val:stats.active||0,color:'text-green-600',icon:'check-circle'},
        {label:'MRR',val:'€'+parseFloat(String(stats.mrr||0)).toFixed(0),color:'text-indigo-600',icon:'chart-line'},
        {label:'Neue (Monat)',val:stats.new_this_month||0,color:'text-blue-600',icon:'user-plus'},
        {label:'Gekündigt',val:stats.cancelled||0,color:'text-red-500',icon:'times-circle'},
        {label:'Churn-Rate',val:(stats.churn_rate||0)+'%',color:'text-orange-500',icon:'arrow-down'},
      ].map(s=>`<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-xs text-gray-500 font-medium">${s.label}</p>
        <p class="text-xl font-bold ${s.color} mt-1">${s.val}</p>
      </div>`).join('')}
    </div>

    <!-- Tabs -->
    <div style="display:flex;gap:.5rem;margin-bottom:1.25rem;background:white;padding:.4rem;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,.06);width:fit-content">
      <button class="tab active" onclick="switchTab('subs')">Abonnenten</button>
      <button class="tab" onclick="switchTab('plans')">Pläne</button>
    </div>

    <!-- Subscribers Tab -->
    <div id="tab-subs">
      <div class="card">
        <div class="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 class="font-bold text-gray-800"><i class="fas fa-users text-gray-400 mr-2"></i>Alle Abonnenten</h3>
          <input type="text" placeholder="Suchen..." class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm w-44" />
        </div>
        <div class="overflow-x-auto">
          <table>
            <thead><tr>
              <th>Kunde</th><th>Plan</th><th>Betrag</th><th>Status</th><th>Nächste Zahlung</th><th>Aktionen</th>
            </tr></thead>
            <tbody>${subscriberRows}</tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Plans Tab -->
    <div id="tab-plans" style="display:none">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem">
        ${plans.map((p,i) => `
        <div class="plan-card">
          ${i === 1 ? `<div class="plan-badge" style="background:${p.color}">Beliebt</div>` : ''}
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem">
            <div style="width:40px;height:40px;background:${p.color}20;border-radius:10px;display:flex;align-items:center;justify-content:center;color:${p.color};font-size:1rem">
              <i class="fas fa-${i===0?'seedling':i===1?'rocket':'building'}"></i>
            </div>
            <div>
              <div class="font-bold text-gray-800">${p.name}</div>
              <div class="text-xs text-gray-400">Abonnement-Plan</div>
            </div>
          </div>
          <div style="font-size:1.75rem;font-weight:800;color:#1a2a4e;margin-bottom:.25rem">€${p.price}<span style="font-size:.9rem;font-weight:500;color:#9ca3af">/${p.interval}</span></div>
          <ul style="list-style:none;padding:0;margin:.75rem 0 1rem">
            ${p.features.map(f => `<li style="display:flex;align-items:center;gap:.5rem;font-size:.83rem;color:#374151;margin-bottom:.35rem">
              <i class="fas fa-check" style="color:${p.color};font-size:.75rem"></i>${f}
            </li>`).join('')}
          </ul>
          <div style="display:flex;gap:.5rem">
            <button onclick="showToast('Plan bearbeiten – kommt bald')" style="flex:1;padding:.45rem;background:${p.color}15;color:${p.color};border:none;border-radius:8px;font-size:.8rem;font-weight:600;cursor:pointer">Bearbeiten</button>
            <button onclick="showToast('Plan aktiviert: ${p.name}')" style="flex:1;padding:.45rem;background:${p.color};color:white;border:none;border-radius:8px;font-size:.8rem;font-weight:600;cursor:pointer">Aktivieren</button>
          </div>
        </div>`).join('')}
        <div class="plan-card" style="border-style:dashed;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.75rem;cursor:pointer;min-height:200px" onclick="showToast('Neuer Plan – Funktion wird bald verfügbar')">
          <div style="width:48px;height:48px;background:#f3f4f6;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem;color:#9ca3af"><i class="fas fa-plus"></i></div>
          <div class="text-sm font-semibold text-gray-400">Neuer Plan</div>
        </div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    function showToast(msg, type='success') {
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(() => t.style.display = 'none', 3000);
    }
    function switchTab(tab) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('tab-subs').style.display = tab === 'subs' ? '' : 'none';
      document.getElementById('tab-plans').style.display = tab === 'plans' ? '' : 'none';
    }
  </script>
</body>
</html>`
}
