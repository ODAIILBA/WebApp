import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminSocialMediaSettings(settings: Record<string, string> = {}) {
  const sidebar = AdminSidebarAdvanced('/admin/social-media')
  const get = (key: string, def = '') => settings[key] || def

  const platforms = [
    { key: 'social_facebook', label: 'Facebook', icon: 'fab fa-facebook-f', color: '#1877f2', bg: '#e7f0fd', placeholder: 'https://facebook.com/ihr-shop' },
    { key: 'social_instagram', label: 'Instagram', icon: 'fab fa-instagram', color: '#e1306c', bg: '#fce4ec', placeholder: 'https://instagram.com/ihr-shop' },
    { key: 'social_twitter', label: 'X (Twitter)', icon: 'fab fa-x-twitter', color: '#000000', bg: '#f3f4f6', placeholder: 'https://x.com/ihr-shop' },
    { key: 'social_linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin-in', color: '#0a66c2', bg: '#e8f0fb', placeholder: 'https://linkedin.com/company/ihr-shop' },
    { key: 'social_youtube', label: 'YouTube', icon: 'fab fa-youtube', color: '#ff0000', bg: '#ffeaea', placeholder: 'https://youtube.com/@ihr-shop' },
    { key: 'social_tiktok', label: 'TikTok', icon: 'fab fa-tiktok', color: '#010101', bg: '#f3f4f6', placeholder: 'https://tiktok.com/@ihr-shop' },
    { key: 'social_pinterest', label: 'Pinterest', icon: 'fab fa-pinterest-p', color: '#e60023', bg: '#fdeaeb', placeholder: 'https://pinterest.de/ihr-shop' },
    { key: 'social_whatsapp', label: 'WhatsApp', icon: 'fab fa-whatsapp', color: '#25d366', bg: '#e8f8ee', placeholder: '+49 123 456789 oder Business-Link' },
    { key: 'social_telegram', label: 'Telegram', icon: 'fab fa-telegram-plane', color: '#229ed9', bg: '#e5f4fd', placeholder: 'https://t.me/ihr-shop' },
    { key: 'social_xing', label: 'XING', icon: 'fab fa-xing', color: '#005a5f', bg: '#e8f3f3', placeholder: 'https://xing.com/company/ihr-shop' },
  ]

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Social Media – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body{margin:0;font-family:'Segoe UI',sans-serif;background:#f8fafc}
    .main{margin-left:280px;padding:2rem;min-height:100vh}
    @media(max-width:768px){.main{margin-left:0}}
    .card{background:white;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.07);margin-bottom:1.5rem;overflow:hidden}
    .platform-row{display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid #f3f4f6;transition:background .15s}
    .platform-row:last-child{border-bottom:none}
    .platform-row:hover{background:#fafafa}
    .platform-icon{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
    .platform-label{font-size:.875rem;font-weight:700;color:#1a2a4e;min-width:100px}
    .platform-input{flex:1;padding:.5rem .85rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.875rem;transition:border-color .2s}
    .platform-input:focus{outline:none;border-color:#6366f1}
    .platform-status{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.8rem;flex-shrink:0}
    .btn{padding:.55rem 1.25rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;display:inline-flex;align-items:center;gap:.4rem;transition:all .2s}
    .btn-primary{background:#1a2a4e;color:white}.btn-primary:hover{background:#2a3b5e}
    .btn-secondary{background:#f3f4f6;color:#374151}.btn-secondary:hover{background:#e5e7eb}
    .preview-card{display:flex;align-items:center;gap:.75rem;padding:.75rem;border:1px solid #e5e7eb;border-radius:10px;transition:all .2s;cursor:pointer;text-decoration:none}
    .preview-card:hover{border-color:#6366f1;background:#fafaff}
    .share-toggle{display:flex;gap:.5rem;flex-wrap:wrap}
    .share-btn{padding:.4rem .9rem;border-radius:20px;border:2px solid transparent;font-size:.78rem;font-weight:600;cursor:pointer;transition:all .2s}
    .share-btn.active{border-color:currentColor}
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
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-share-alt text-blue-600 mr-2"></i>Social Media</h1>
        <p class="text-gray-500 text-sm mt-1">Soziale Netzwerke und Teilen-Einstellungen</p>
      </div>
      <button class="btn btn-primary" onclick="saveAll()"><i class="fas fa-save"></i>Alles speichern</button>
    </div>

    <!-- Profile Links -->
    <div class="card">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:.75rem">
        <i class="fas fa-link text-indigo-500"></i>
        <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:#1a2a4e">Profil-Links</h3>
        <span class="text-xs text-gray-400 ml-auto">Links zum Shop-Profil auf sozialen Netzwerken</span>
      </div>
      ${platforms.map(p => `
      <div class="platform-row">
        <div class="platform-icon" style="background:${p.bg};color:${p.color}">
          <i class="${p.icon}"></i>
        </div>
        <span class="platform-label">${p.label}</span>
        <input type="url" id="${p.key}" class="platform-input" 
          value="${get(p.key)}" placeholder="${p.placeholder}"
          oninput="updateStatus('${p.key}')" />
        <div id="status-${p.key}" class="platform-status" style="background:${get(p.key) ? '#d1fae5' : '#f3f4f6'};color:${get(p.key) ? '#065f46' : '#9ca3af'}">
          <i class="fas fa-${get(p.key) ? 'check' : 'minus'}"></i>
        </div>
        ${get(p.key) ? `<a href="${get(p.key)}" target="_blank" class="text-xs text-blue-500 hover:text-blue-700 flex-shrink-0"> // nosemgrep
          <i class="fas fa-external-link-alt"></i>
        </a>` : '<div style="width:16px"></div>'}
      </div>`).join('')}
    </div>

    <!-- Share Buttons -->
    <div class="card">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid #f3f4f6">
        <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:#1a2a4e"><i class="fas fa-share-square text-purple-500 mr-2"></i>Teilen-Buttons auf Produktseiten</h3>
        <p style="margin:.25rem 0 0;font-size:.82rem;color:#9ca3af">Wähle, welche Teilen-Buttons auf Produktseiten angezeigt werden</p>
      </div>
      <div style="padding:1.25rem">
        <div class="share-toggle">
          ${platforms.slice(0,6).map(p => `
          <button class="share-btn active" id="share-${p.key}" 
            style="background:${p.bg};color:${p.color}"
            onclick="toggleShare('${p.key}', this)">
            <i class="${p.icon} mr-1"></i>${p.label}
          </button>`).join('')}
        </div>
      </div>
    </div>

    <!-- Social Proof -->
    <div class="card">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid #f3f4f6">
        <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:#1a2a4e"><i class="fas fa-users text-green-500 mr-2"></i>Social Proof</h3>
      </div>
      <div style="padding:1.25rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <div>
          <label style="display:block;font-size:.82rem;font-weight:600;color:#374151;margin-bottom:.35rem">Anzeige: "X Personen haben dieses Produkt angesehen"</label>
          <div style="display:flex;align-items:center;gap:.75rem">
            <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer">
              <input type="checkbox" id="social-proof-views" ${get('social_proof_views','true') === 'true' ? 'checked' : ''} style="width:14px;height:14px;accent-color:#6366f1" />
              <span style="font-size:.85rem;color:#374151">Aktiviert</span>
            </label>
          </div>
        </div>
        <div>
          <label style="display:block;font-size:.82rem;font-weight:600;color:#374151;margin-bottom:.35rem">Anzeige: "X Personen haben dieses Produkt gekauft"</label>
          <div style="display:flex;align-items:center;gap:.75rem">
            <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer">
              <input type="checkbox" id="social-proof-sales" ${get('social_proof_sales','true') === 'true' ? 'checked' : ''} style="width:14px;height:14px;accent-color:#6366f1" />
              <span style="font-size:.85rem;color:#374151">Aktiviert</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    function showToast(msg, type='success') {
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(() => t.style.display = 'none', 3200);
    }

    function updateStatus(key) {
      const val = document.getElementById(key).value;
      const el = document.getElementById('status-' + key);
      el.style.background = val ? '#d1fae5' : '#f3f4f6';
      el.style.color = val ? '#065f46' : '#9ca3af';
      el.innerHTML = '<i class="fas fa-' + (val ? 'check' : 'minus') + '"></i>';
    }

    function toggleShare(key, btn) {
      btn.classList.toggle('active');
    }

    async function saveAll() {
      const keys = ${JSON.stringify(platforms.map(p => p.key))};
      const extras = { social_proof_views: document.getElementById('social-proof-views').checked ? 'true' : 'false', social_proof_sales: document.getElementById('social-proof-sales').checked ? 'true' : 'false' };
      const allSettings = {};
      keys.forEach(k => allSettings[k] = document.getElementById(k)?.value || '');
      Object.assign(allSettings, extras);
      try {
        await Promise.all(Object.entries(allSettings).map(([key, value]) =>
          fetch('/api/settings/' + key, {
            method: 'PUT', headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ value, type: 'string' })
          })
        ));
        showToast('Social-Media-Einstellungen gespeichert');
      } catch(e) { showToast('Fehler beim Speichern', 'error'); }
    }
  </script>
</body>
</html>`
}
