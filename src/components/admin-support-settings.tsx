import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminSupportSettings(settings: Record<string, string> = {}, stats: any = {}) {
  const sidebar = AdminSidebarAdvanced('/admin/support/settings')
  const get = (k: string, d = '') => settings[k] || d

  return `<!DOCTYPE html> // nosemgrep
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Support-Einstellungen – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body{margin:0;font-family:'Segoe UI',sans-serif;background:#f8fafc}
    .main{margin-left:280px;padding:2rem;min-height:100vh}
    @media(max-width:768px){.main{margin-left:0}}
    .card{background:white;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.07);padding:1.5rem;margin-bottom:1.5rem}
    .card-head{font-size:1rem;font-weight:700;color:#1a2a4e;margin:0 0 1.25rem;padding-bottom:.75rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:.6rem}
    .fg{margin-bottom:1.1rem}
    .fg label{display:block;font-size:.83rem;font-weight:600;color:#374151;margin-bottom:.35rem}
    .fg .hint{font-size:.75rem;color:#9ca3af;margin-top:.2rem}
    input[type=text],input[type=email],input[type=number],select,textarea{width:100%;padding:.55rem .85rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.875rem;box-sizing:border-box;transition:border-color .2s}
    input:focus,select:focus,textarea:focus{outline:none;border-color:#6366f1}
    textarea{resize:vertical;min-height:80px}
    .frow{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem}
    @media(max-width:640px){.frow{grid-template-columns:1fr}}
    .btn{padding:.55rem 1.25rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;display:inline-flex;align-items:center;gap:.4rem;transition:all .2s}
    .btn-primary{background:#1a2a4e;color:white}.btn-primary:hover{background:#2a3b5e}
    .toggle-row{display:flex;align-items:center;justify-content:space-between;padding:.75rem;background:#f8fafc;border-radius:10px;margin-bottom:.6rem}
    .toggle-label{font-size:.875rem;font-weight:600;color:#374151}
    .toggle-hint{font-size:.75rem;color:#9ca3af;margin-top:.1rem}
    .toggle-sw{position:relative;width:44px;height:22px;flex-shrink:0}
    .toggle-sw input{opacity:0;width:0;height:0}
    .toggle-sl{position:absolute;cursor:pointer;inset:0;background:#e5e7eb;border-radius:999px;transition:.2s}
    .toggle-sl:before{content:'';position:absolute;width:16px;height:16px;background:white;border-radius:50%;top:3px;left:3px;transition:.2s;box-shadow:0 1px 2px rgba(0,0,0,.2)}
    input:checked+.toggle-sl{background:#6366f1}
    input:checked+.toggle-sl:before{transform:translateX(22px)}
    .toast{position:fixed;bottom:1.5rem;right:1.5rem;padding:.75rem 1.25rem;border-radius:8px;font-size:.875rem;font-weight:600;z-index:9999;display:none}
    .toast-success{background:#d1fae5;color:#065f46}
    .toast-error{background:#fee2e2;color:#991b1b}
  </style>
</head>
<body>
  ${sidebar}
  <div class="main">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:.75rem">
      <div>
        <h1 style="font-size:1.4rem;font-weight:800;color:#1a2a4e;margin:0"><i class="fas fa-headset text-indigo-600 mr-2"></i>Support-Einstellungen</h1>
        <p style="font-size:.85rem;color:#6b7280;margin:.25rem 0 0">Kundenservice und Ticket-System konfigurieren</p>
      </div>
      <button class="btn btn-primary" onclick="saveAll()"><i class="fas fa-save"></i>Speichern</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      ${[
        {l:'Offene Tickets',v:stats.open||0,c:'text-red-600',i:'ticket-alt'},
        {l:'In Bearbeitung',v:stats.in_progress||0,c:'text-yellow-600',i:'spinner'},
        {l:'Gelöst heute',v:stats.resolved_today||0,c:'text-green-600',i:'check-circle'},
        {l:'Ø Antwortzeit',v:(stats.avg_response||0)+'h',c:'text-blue-600',i:'clock'},
      ].map(s=>`<div style="background:white;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,.07);padding:1rem"> // nosemgrep
        <p style="font-size:.75rem;color:#9ca3af;font-weight:600;margin:0 0 .35rem"><i class="fas fa-${s.i} mr-1"></i>${s.l}</p>
        <p style="font-size:1.5rem;font-weight:800;margin:0;color:${s.c.replace('text-','')==='red-600'?'#dc2626':s.c==='text-green-600'?'#059669':s.c==='text-yellow-600'?'#d97706':'#2563eb'}">${s.v}</p>
      </div>`).join('')}
    </div>

    <!-- General Settings -->
    <div class="card">
      <h3 class="card-head"><i class="fas fa-cog text-gray-500"></i>Allgemeine Einstellungen</h3>
      <div class="frow">
        <div class="fg">
          <label>Support-E-Mail</label>
          <input type="email" id="support_email_addr" value="${get('support_email','support@softwareking24.de')}" placeholder="support@shop.de" />
        </div>
        <div class="fg">
          <label>Support-Telefon</label>
          <input type="text" id="support_phone" value="${get('support_phone','')}" placeholder="+49 30 12345678" />
        </div>
      </div>
      <div class="frow">
        <div class="fg">
          <label>Geschäftszeiten</label>
          <input type="text" id="support_hours" value="${get('support_hours','Mo-Fr 9-17 Uhr')}" placeholder="Mo-Fr 9-17 Uhr" />
        </div>
        <div class="fg">
          <label>Maximale Antwortzeit (Stunden)</label>
          <input type="number" id="support_max_response_time" value="${get('support_max_response_time','24')}" placeholder="24" />
          <div class="hint">Ziel-Antwortzeit für SLA-Überwachung</div>
        </div>
      </div>
      <div class="fg">
        <label>Willkommensnachricht</label>
        <textarea id="support_welcome_message" placeholder="Wie können wir Ihnen helfen?">${get('support_welcome_message','')}</textarea>
        <div class="hint">Wird als erste Nachricht im Ticket-System angezeigt</div>
      </div>
    </div>

    <!-- Ticket Settings -->
    <div class="card">
      <h3 class="card-head"><i class="fas fa-ticket-alt text-blue-500"></i>Ticket-System</h3>
      <div class="frow">
        <div class="fg">
          <label>Standard-Priorität</label>
          <select id="support_default_priority">
            <option value="low" ${get('support_default_priority','normal')==='low'?'selected':''}>Niedrig</option>
            <option value="normal" ${get('support_default_priority','normal')==='normal'?'selected':''}>Normal</option>
            <option value="high" ${get('support_default_priority','normal')==='high'?'selected':''}>Hoch</option>
          </select>
        </div>
        <div class="fg">
          <label>Auto-Schließen nach (Tagen)</label>
          <input type="number" id="support_auto_close_days" value="${get('support_auto_close_days','7')}" placeholder="7" />
          <div class="hint">Gelöste Tickets nach X Tagen automatisch schließen</div>
        </div>
      </div>
      <div class="frow">
        <div class="fg">
          <label>Kategorien (kommagetrennt)</label>
          <input type="text" id="support_categories" value="${get('support_categories','Bestellung,Zahlung,Technisch,Lizenz,Sonstiges')}" placeholder="Bestellung, Zahlung, ..." />
        </div>
        <div class="fg">
          <label>Ticket-Präfix</label>
          <input type="text" id="support_ticket_prefix" value="${get('support_ticket_prefix','SK')}" placeholder="SK" />
          <div class="hint">z.B. SK → SK-2024-001</div>
        </div>
      </div>
    </div>

    <!-- Notification Settings -->
    <div class="card">
      <h3 class="card-head"><i class="fas fa-bell text-yellow-500"></i>Benachrichtigungen</h3>
      ${[
        {id:'notif_new_ticket',label:'Neue Tickets',hint:'E-Mail bei jedem neuen Support-Ticket'},
        {id:'notif_customer_reply',label:'Kunden-Antwort',hint:'E-Mail wenn Kunde auf Ticket antwortet'},
        {id:'notif_overdue_ticket',label:'Überfällige Tickets',hint:'Tägliche Zusammenfassung überfälliger Tickets'},
        {id:'notif_high_priority',label:'Hohe Priorität',hint:'Sofort-Benachrichtigung bei dringenden Tickets'},
      ].map(n=>`<div class="toggle-row"> // nosemgrep
        <div><div class="toggle-label">${n.label}</div><div class="toggle-hint">${n.hint}</div></div>
        <label class="toggle-sw"><input type="checkbox" id="${n.id}" ${get(n.id,'true')==='true'?'checked':''}/><span class="toggle-sl"></span></label>
      </div>`).join('')}
    </div>

    <!-- Live Chat -->
    <div class="card">
      <h3 class="card-head"><i class="fas fa-comments text-green-500"></i>Live-Chat</h3>
      <div class="toggle-row">
        <div><div class="toggle-label">Live-Chat aktivieren</div><div class="toggle-hint">Chat-Widget auf der Website anzeigen</div></div>
        <label class="toggle-sw"><input type="checkbox" id="live_chat_enabled" ${get('live_chat_enabled','false')==='true'?'checked':''}/><span class="toggle-sl"></span></label>
      </div>
      <div class="fg" style="margin-top:.75rem">
        <label>Chat-Widget Code / Provider</label>
        <textarea id="live_chat_code" placeholder="<!-- Tawk.to, Intercom, Crisp, etc. Code hier einfügen -->">${get('live_chat_code','')}</textarea>
        <div class="hint">JavaScript-Embed-Code Ihres Chat-Providers</div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    function showToast(msg, type) {
      if (!type) type = 'success';
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(function() { t.style.display = 'none'; }, 3200);
    }
    const saveKeys = [
      'support_email_addr','support_phone','support_hours','support_max_response_time',
      'support_welcome_message','support_default_priority','support_auto_close_days',
      'support_categories','support_ticket_prefix','live_chat_code',
    ];
    const toggleKeys = [
      'notif_new_ticket','notif_customer_reply','notif_overdue_ticket',
      'notif_high_priority','live_chat_enabled',
    ];
    async function saveAll() {
      const updates = {};
      saveKeys.forEach(function(k) {
        const el = document.getElementById(k);
        if (el) updates[k] = el.value;
      });
      toggleKeys.forEach(function(k) {
        const el = document.getElementById(k);
        if (el) updates[k] = el.checked ? 'true' : 'false';
      });
      try {
        await Promise.all(Object.entries(updates).map(function(entry) {
          return fetch('/api/settings/' + entry[0], {
            method: 'PUT', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ value: entry[1], type: 'string' })
          });
        }));
        showToast('Support-Einstellungen gespeichert');
      } catch(e) { showToast('Fehler', 'error'); }
    }
  </script>
</body>
</html>`
}
