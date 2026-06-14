import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminVatOss(settings: Record<string, string> = {}) {
  const sidebar = AdminSidebarAdvanced('/admin/vat/oss')
  const get = (k: string, d = '') => settings[k] || d

  const euCountries = [
    {code:'AT',name:'Österreich',rate:'20',threshold:'10000'},{code:'BE',name:'Belgien',rate:'21',threshold:'10000'},
    {code:'BG',name:'Bulgarien',rate:'20',threshold:'10000'},{code:'CY',name:'Zypern',rate:'19',threshold:'10000'},
    {code:'CZ',name:'Tschechien',rate:'21',threshold:'10000'},{code:'DK',name:'Dänemark',rate:'25',threshold:'10000'},
    {code:'EE',name:'Estland',rate:'22',threshold:'10000'},{code:'FI',name:'Finnland',rate:'25.5',threshold:'10000'},
    {code:'FR',name:'Frankreich',rate:'20',threshold:'10000'},{code:'GR',name:'Griechenland',rate:'24',threshold:'10000'},
    {code:'HR',name:'Kroatien',rate:'25',threshold:'10000'},{code:'HU',name:'Ungarn',rate:'27',threshold:'10000'},
    {code:'IE',name:'Irland',rate:'23',threshold:'10000'},{code:'IT',name:'Italien',rate:'22',threshold:'10000'},
    {code:'LT',name:'Litauen',rate:'21',threshold:'10000'},{code:'LU',name:'Luxemburg',rate:'17',threshold:'10000'},
    {code:'LV',name:'Lettland',rate:'21',threshold:'10000'},{code:'MT',name:'Malta',rate:'18',threshold:'10000'},
    {code:'NL',name:'Niederlande',rate:'21',threshold:'10000'},{code:'PL',name:'Polen',rate:'23',threshold:'10000'},
    {code:'PT',name:'Portugal',rate:'23',threshold:'10000'},{code:'RO',name:'Rumänien',rate:'19',threshold:'10000'},
    {code:'SE',name:'Schweden',rate:'25',threshold:'10000'},{code:'SI',name:'Slowenien',rate:'22',threshold:'10000'},
    {code:'SK',name:'Slowakei',rate:'20',threshold:'10000'},{code:'ES',name:'Spanien',rate:'21',threshold:'10000'},
  ]

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>VAT OSS – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body{margin:0;font-family:'Segoe UI',sans-serif;background:#f8fafc}
    .main{margin-left:280px;padding:2rem;min-height:100vh}
    @media(max-width:768px){.main{margin-left:0}}
    .card{background:white;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.07);padding:1.5rem;margin-bottom:1.5rem;overflow:hidden}
    .card-header{background:none;margin:-1.5rem -1.5rem 1.5rem;padding:1rem 1.5rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:.75rem}
    .card-header h3{margin:0;font-size:1rem;font-weight:700;color:#1a2a4e}
    .fg{margin-bottom:1rem}
    .fg label{display:block;font-size:.82rem;font-weight:600;color:#374151;margin-bottom:.3rem}
    .fg .hint{font-size:.74rem;color:#9ca3af;margin-top:.2rem}
    input[type=text],input[type=number],select{width:100%;padding:.55rem .85rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.875rem;box-sizing:border-box}
    input:focus,select:focus{outline:none;border-color:#6366f1}
    table{width:100%;border-collapse:collapse}
    th{background:#f8fafc;padding:.6rem 1rem;text-align:left;font-size:.72rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb}
    td{padding:.65rem 1rem;border-bottom:1px solid #f3f4f6;vertical-align:middle;font-size:.85rem}
    tr:last-child td{border-bottom:none}
    tr:hover td{background:#fafafa}
    .btn{padding:.55rem 1.25rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;display:inline-flex;align-items:center;gap:.4rem;transition:all .2s}
    .btn-primary{background:#1a2a4e;color:white}.btn-primary:hover{background:#2a3b5e}
    .toggle{display:flex;align-items:center;gap:.75rem;cursor:pointer}
    .toggle input[type=checkbox]{width:0;height:0;opacity:0;position:absolute}
    .toggle-track{width:44px;height:22px;background:#e5e7eb;border-radius:999px;position:relative;transition:.2s;flex-shrink:0;cursor:pointer}
    .toggle-track.on{background:#6366f1}
    .toggle-track::after{content:'';position:absolute;width:16px;height:16px;background:white;border-radius:50%;top:3px;left:3px;transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
    .toggle-track.on::after{left:25px}
    .toast{position:fixed;bottom:1.5rem;right:1.5rem;padding:.75rem 1.25rem;border-radius:8px;font-size:.875rem;font-weight:600;z-index:9999;display:none}
    .toast-success{background:#d1fae5;color:#065f46}
  </style>
</head>
<body>
  ${sidebar}
  <div class="main">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-euro-sign text-indigo-600 mr-2"></i>VAT OSS (One-Stop-Shop)</h1>
        <p class="text-gray-500 text-sm mt-1">EU-weite Mehrwertsteuer-Meldung vereinfachen</p>
      </div>
      <button class="btn btn-primary" onclick="saveSettings()"><i class="fas fa-save"></i>Speichern</button>
    </div>

    <!-- Info Box -->
    <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 text-sm text-blue-800">
      <i class="fas fa-info-circle mr-2 text-blue-500"></i>
      <strong>OSS vereinfacht die EU-MwSt-Pflichten:</strong> Statt in jedem EU-Land zu registrieren, melden Sie alle B2C-Umsätze über eine zentrale Meldestelle in Deutschland. 
      Schwellenwert: <strong>€10.000 netto</strong> grenzüberschreitende B2C-Umsätze pro Jahr.
    </div>

    <!-- OSS Settings -->
    <div class="card">
      <div class="card-header"><i class="fas fa-cog text-indigo-500"></i><h3>OSS-Konfiguration</h3></div>
      <div class="fg">
        <label>OSS-Registrierungsnummer</label>
        <input type="text" id="oss_registration_number" value="${get('oss_registration_number')}" placeholder="OSS-DE-123456" />
        <div class="hint">Vom Bundeszentralamt für Steuern (BZSt) zugeteilte Nummer</div>
      </div>
      <div class="fg">
        <label>Steuerberater / Ansprechpartner</label>
        <input type="text" id="oss_contact" value="${get('oss_contact')}" placeholder="Mustermann & Partner Steuerberatung" />
      </div>
      <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:#f8fafc;border-radius:10px">
        <div id="oss-track" class="toggle-track ${get('oss_enabled','false') === 'true' ? 'on' : ''}" onclick="toggleOss()"></div>
        <div>
          <div class="font-semibold text-gray-800 text-sm">OSS aktivieren</div>
          <div class="text-xs text-gray-500">EU-Umsätze automatisch mit Landessteuersatz berechnen</div>
        </div>
      </div>
    </div>

    <!-- EU Countries Rate Table -->
    <div class="card" style="padding:0">
      <div class="card-header" style="margin:0;border-radius:12px 12px 0 0"><i class="fas fa-globe text-blue-500"></i><h3>EU-Steuersätze nach Land</h3><span class="text-xs text-gray-400 ml-auto">26 EU-Länder</span></div>
      <div class="overflow-x-auto">
        <table>
          <thead><tr>
            <th>Land</th><th>Code</th><th>Normaler Steuersatz</th><th>Schwellenwert</th><th>Status</th>
          </tr></thead>
          <tbody>
            ${euCountries.map(c => `
            <tr>
              <td class="font-semibold text-gray-800">${c.name}</td>
              <td class="font-mono text-gray-500">${c.code}</td>
              <td>
                <div style="display:flex;align-items:center;gap:.4rem">
                  <input type="number" id="rate-${c.code}" value="${c.rate}" min="0" max="50" step="0.1"
                    style="width:70px;padding:.3rem .5rem;border:1px solid #e5e7eb;border-radius:6px;font-size:.83rem" />
                  <span class="text-gray-400 text-sm">%</span>
                </div>
              </td>
              <td class="text-gray-500">€${parseInt(c.threshold).toLocaleString('de-DE')}</td>
              <td><span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">Aktiv</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Reporting -->
    <div class="card">
      <div class="card-header"><i class="fas fa-file-alt text-purple-500"></i><h3>OSS-Meldungen</h3></div>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
        ${['Q1 2024','Q2 2024','Q3 2024','Q4 2024','Q1 2025','Q2 2025'].map((q, i) => `
        <div style="border:1px solid #e5e7eb;border-radius:10px;padding:1rem;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div class="text-sm font-semibold text-gray-800">${q}</div>
            <div class="text-xs text-gray-400">${i < 4 ? 'Eingereicht' : i === 4 ? 'Fällig: 31.07.2025' : 'Offen'}</div>
          </div>
          <span class="px-2 py-0.5 text-xs font-semibold rounded-full ${i < 4 ? 'bg-green-100 text-green-800' : i === 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'}">
            ${i < 4 ? 'Erledigt' : i === 4 ? 'Bald fällig' : 'Offen'}
          </span>
        </div>`).join('')}
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
    let ossEnabled = ${get('oss_enabled','false') === 'true'};
    function toggleOss() {
      ossEnabled = !ossEnabled;
      const track = document.getElementById('oss-track');
      if (ossEnabled) track.classList.add('on');
      else track.classList.remove('on');
    }
    async function saveSettings() {
      const saves = [
        fetch('/api/settings/oss_registration_number', { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({value: document.getElementById('oss_registration_number').value, type:'string'}) }),
        fetch('/api/settings/oss_contact', { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({value: document.getElementById('oss_contact').value, type:'string'}) }),
        fetch('/api/settings/oss_enabled', { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({value: ossEnabled ? 'true' : 'false', type:'boolean'}) }),
      ];
      try { await Promise.all(saves); showToast('OSS-Einstellungen gespeichert'); }
      catch(e) { showToast('Fehler beim Speichern', 'error'); }
    }
  </script>
</body>
</html>`
}
