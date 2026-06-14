import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminSettingsEmailSmtp(settings: Record<string, string> = {}) {
  const sidebar = AdminSidebarAdvanced('/admin/settings/email-smtp')
  const get = (key: string, def = '') => settings[key] || def

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>E-Mail & SMTP – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body{margin:0;font-family:'Segoe UI',sans-serif;background:#f8fafc}
    .main{margin-left:280px;padding:2rem;min-height:100vh}
    @media(max-width:768px){.main{margin-left:0}}
    .card{background:white;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.07);margin-bottom:1.5rem}
    .card-header{padding:1rem 1.5rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:.75rem}
    .card-header h3{margin:0;font-size:1.05rem;font-weight:700;color:#1a2a4e}
    .card-body{padding:1.5rem}
    .form-group{margin-bottom:1.25rem}
    .form-group label{display:block;font-size:.85rem;font-weight:600;color:#374151;margin-bottom:.4rem}
    .form-group .hint{font-size:.75rem;color:#9ca3af;margin-top:.25rem}
    input[type=text],input[type=number],input[type=email],input[type=password],select,textarea{width:100%;padding:.6rem .85rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.875rem;box-sizing:border-box;transition:border-color .2s}
    input:focus,select:focus,textarea:focus{outline:none;border-color:#6366f1}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}
    @media(max-width:600px){.form-row{grid-template-columns:1fr}}
    .btn{padding:.55rem 1.25rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;transition:all .2s;display:inline-flex;align-items:center;gap:.4rem}
    .btn-primary{background:#1a2a4e;color:white}.btn-primary:hover{background:#2a3b5e}
    .btn-secondary{background:#f3f4f6;color:#374151}.btn-secondary:hover{background:#e5e7eb}
    .btn-success{background:#059669;color:white}.btn-success:hover{background:#047857}
    .badge-section{display:inline-flex;align-items:center;gap:.4rem;padding:.2rem .75rem;border-radius:999px;font-size:.75rem;font-weight:600}
    .badge-active{background:#d1fae5;color:#065f46}
    .badge-inactive{background:#fee2e2;color:#991b1b}
    .toggle-switch{position:relative;width:48px;height:26px}
    .toggle-switch input{opacity:0;width:0;height:0}
    .slider{position:absolute;cursor:pointer;inset:0;background:#e5e7eb;border-radius:999px;transition:.2s}
    .slider:before{content:'';position:absolute;height:20px;width:20px;left:3px;bottom:3px;background:white;border-radius:50%;transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
    input:checked+.slider{background:#6366f1}
    input:checked+.slider:before{transform:translateX(22px)}
    .toast{position:fixed;bottom:1.5rem;right:1.5rem;padding:.75rem 1.25rem;border-radius:8px;font-size:.875rem;font-weight:600;z-index:9999;display:none}
    .toast-success{background:#d1fae5;color:#065f46}
    .toast-error{background:#fee2e2;color:#991b1b}
    .test-result{display:none;margin-top:1rem;padding:1rem;border-radius:8px;font-size:.875rem}
    .test-success{background:#d1fae5;color:#065f46}
    .test-error{background:#fee2e2;color:#991b1b}
  </style>
</head>
<body>
  ${sidebar}
  <div class="main">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-envelope text-indigo-600 mr-2"></i>E-Mail & SMTP</h1>
        <p class="text-gray-500 text-sm mt-1">E-Mail-Versand und SMTP-Konfiguration</p>
      </div>
      <button class="btn btn-primary" onclick="saveAll()"><i class="fas fa-save"></i>Speichern</button>
    </div>

    <!-- Status Card -->
    <div class="card mb-6">
      <div class="card-body" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">
        <div style="display:flex;align-items:center;gap:1rem">
          <div style="width:48px;height:48px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-size:1.25rem">
            <i class="fas fa-paper-plane"></i>
          </div>
          <div>
            <div class="font-bold text-gray-800">SMTP-Verbindung</div>
            <div id="smtp-status-text" class="text-sm text-gray-500">Konfiguration wird geladen...</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:.75rem">
          <label class="toggle-switch">
            <input type="checkbox" id="email-enabled" ${get('email_enabled','true') === 'true' ? 'checked' : ''} onchange="updateStatus()"/>
            <span class="slider"></span>
          </label>
          <span class="text-sm font-semibold text-gray-700">E-Mail-Versand aktiviert</span>
        </div>
      </div>
    </div>

    <!-- SMTP Server Config -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-server text-indigo-500"></i>
        <h3>SMTP-Server-Einstellungen</h3>
      </div>
      <div class="card-body">
        <div class="form-row">
          <div class="form-group">
            <label>SMTP-Server (Host) *</label>
            <input type="text" id="smtp_host" value="${get('smtp_host','smtp.gmail.com')}" placeholder="z.B. smtp.gmail.com" />
            <div class="hint">Hostname des SMTP-Servers</div>
          </div>
          <div class="form-group">
            <label>SMTP-Port *</label>
            <input type="number" id="smtp_port" value="${get('smtp_port','587')}" placeholder="587" />
            <div class="hint">587 (TLS), 465 (SSL), 25 (unverschlüsselt)</div>
          </div>
        </div>
        <div class="form-group">
          <label>Verschlüsselung</label>
          <select id="smtp_encryption">
            <option value="tls" ${get('smtp_encryption','tls') === 'tls' ? 'selected' : ''}>TLS / STARTTLS (empfohlen)</option>
            <option value="ssl" ${get('smtp_encryption','tls') === 'ssl' ? 'selected' : ''}>SSL</option>
            <option value="none" ${get('smtp_encryption','tls') === 'none' ? 'selected' : ''}>Keine Verschlüsselung</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Auth Config -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-key text-yellow-500"></i>
        <h3>Authentifizierung</h3>
      </div>
      <div class="card-body">
        <div class="form-row">
          <div class="form-group">
            <label>SMTP-Benutzername</label>
            <input type="text" id="smtp_user" value="${get('smtp_user','')}" placeholder="ihr@email.com" autocomplete="off" />
          </div>
          <div class="form-group">
            <label>SMTP-Passwort</label>
            <input type="password" id="smtp_password" value="${get('smtp_password','')}" placeholder="••••••••" autocomplete="new-password" />
            <div class="hint">Für Gmail: App-Passwort verwenden</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sender Config -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-user text-green-500"></i>
        <h3>Absender-Einstellungen</h3>
      </div>
      <div class="card-body">
        <div class="form-row">
          <div class="form-group">
            <label>Absender-Name</label>
            <input type="text" id="smtp_from_name" value="${get('smtp_from_name','SOFTWAREKING24')}" placeholder="Shop-Name" />
            <div class="hint">Dieser Name wird als Absender angezeigt</div>
          </div>
          <div class="form-group">
            <label>Absender-E-Mail *</label>
            <input type="email" id="smtp_from_email" value="${get('smtp_from_email','noreply@softwareking24.de')}" placeholder="noreply@ihr-shop.de" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Antwort-E-Mail (Reply-To)</label>
            <input type="email" id="smtp_reply_to" value="${get('smtp_reply_to','')}" placeholder="support@ihr-shop.de" />
            <div class="hint">Optional - Wenn leer, wird Absender-E-Mail verwendet</div>
          </div>
          <div class="form-group">
            <label>BCC-E-Mail</label>
            <input type="email" id="smtp_bcc" value="${get('smtp_bcc','')}" placeholder="archiv@ihr-shop.de" />
            <div class="hint">Optional - Erhält eine Kopie aller E-Mails</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Test Email -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-flask text-blue-500"></i>
        <h3>Verbindung testen</h3>
      </div>
      <div class="card-body">
        <p class="text-sm text-gray-600 mb-4">Senden Sie eine Test-E-Mail, um die SMTP-Konfiguration zu überprüfen.</p>
        <div style="display:flex;gap:.75rem;align-items:flex-end;flex-wrap:wrap">
          <div class="form-group" style="flex:1;min-width:220px;margin:0">
            <label>Test-E-Mail-Adresse</label>
            <input type="email" id="test-email" placeholder="test@beispiel.de" />
          </div>
          <button class="btn btn-success" onclick="sendTestEmail()"><i class="fas fa-paper-plane"></i>Test-E-Mail senden</button>
        </div>
        <div id="test-result" class="test-result"></div>
      </div>
    </div>

    <!-- SMTP Presets -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-magic text-purple-500"></i>
        <h3>Vorkonfigurierte Provider</h3>
      </div>
      <div class="card-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.75rem">
          ${[
            {name:'Gmail',host:'smtp.gmail.com',port:'587',enc:'tls',icon:'fab fa-google',color:'#ea4335'},
            {name:'Outlook',host:'smtp.office365.com',port:'587',enc:'tls',icon:'fab fa-microsoft',color:'#0078d4'},
            {name:'Mailgun',host:'smtp.mailgun.org',port:'587',enc:'tls',icon:'fas fa-mail-bulk',color:'#f06b26'},
            {name:'SendGrid',host:'smtp.sendgrid.net',port:'587',enc:'tls',icon:'fas fa-envelope-open',color:'#1a82e2'},
            {name:'Postmark',host:'smtp.postmarkapp.com',port:'587',enc:'tls',icon:'fas fa-stamp',color:'#ffde00'},
            {name:'Amazon SES',host:'email-smtp.eu-west-1.amazonaws.com',port:'587',enc:'tls',icon:'fab fa-aws',color:'#ff9900'},
          ].map(p => `
            <button onclick="applyPreset('${p.host}','${p.port}','${p.enc}')" 
              style="padding:.75rem;border:2px solid #e5e7eb;border-radius:10px;background:white;cursor:pointer;text-align:center;transition:all .2s;font-size:.8rem;font-weight:600;color:#374151"
              onmouseover="this.style.borderColor='${p.color}';this.style.background='#fafafa'"
              onmouseout="this.style.borderColor='#e5e7eb';this.style.background='white'">
              <i class="${p.icon}" style="display:block;font-size:1.4rem;color:${p.color};margin-bottom:.35rem"></i>
              ${p.name}
            </button>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    function showToast(msg, type='success') {
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(() => t.style.display = 'none', 3500);
    }

    function updateStatus() {
      const enabled = document.getElementById('email-enabled').checked;
      document.getElementById('smtp-status-text').textContent = enabled ? 'E-Mail-Versand ist aktiviert' : 'E-Mail-Versand ist deaktiviert';
    }

    function applyPreset(host, port, enc) {
      document.getElementById('smtp_host').value = host;
      document.getElementById('smtp_port').value = port;
      document.getElementById('smtp_encryption').value = enc;
      showToast('Preset übernommen – bitte Zugangsdaten eingeben', 'success');
    }

    async function saveAll() {
      const settings = {
        email_enabled: document.getElementById('email-enabled').checked ? 'true' : 'false',
        smtp_host: document.getElementById('smtp_host').value,
        smtp_port: document.getElementById('smtp_port').value,
        smtp_encryption: document.getElementById('smtp_encryption').value,
        smtp_user: document.getElementById('smtp_user').value,
        smtp_from_name: document.getElementById('smtp_from_name').value,
        smtp_from_email: document.getElementById('smtp_from_email').value,
        smtp_reply_to: document.getElementById('smtp_reply_to').value,
        smtp_bcc: document.getElementById('smtp_bcc').value,
      };
      const pw = document.getElementById('smtp_password').value;
      if (pw && pw !== '••••••••') settings.smtp_password = pw;

      try {
        await Promise.all(Object.entries(settings).map(([key, value]) =>
          fetch('/api/settings/' + key, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ value, type: 'string' })
          })
        ));
        showToast('Einstellungen gespeichert');
      } catch(e) {
        showToast('Fehler beim Speichern', 'error');
      }
    }

    async function sendTestEmail() {
      const email = document.getElementById('test-email').value;
      if (!email) { showToast('Bitte E-Mail-Adresse eingeben', 'error'); return; }
      const res = document.getElementById('test-result');
      res.className = 'test-result'; res.style.display = 'none';
      try {
        const r = await fetch('/api/settings/test-email', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ email })
        });
        const d = await r.json();
        res.style.display = 'block';
        if (d.success) {
          res.className = 'test-result test-success';
          res.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Test-E-Mail erfolgreich gesendet an ' + email;
        } else {
          res.className = 'test-result test-error';
          res.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>' + (d.error || 'Fehler beim Senden');
        }
      } catch(e) {
        res.style.display = 'block';
        res.className = 'test-result test-error';
        res.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>Verbindungsfehler';
      }
    }

    updateStatus();
  </script>
</body>
</html>`
}
