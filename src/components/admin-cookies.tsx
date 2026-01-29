import type { FC } from 'hono/jsx'

export const AdminCookies: FC = () => {
  return (
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cookie-Verwaltung - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style>{`
          :root {
            --navy-dark: #1a2a4e;
            --gold: #d4af37;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f7fa;
          }

          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 100vh;
            background: var(--navy-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
          }

          .admin-content {
            margin-left: 260px;
            padding: 2rem;
            min-height: 100vh;
          }

          .nav-item {
            padding: 0.875rem 1.5rem;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.2s;
            border-left: 3px solid transparent;
          }

          .nav-item:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-left-color: var(--gold);
          }

          .nav-item.active {
            background: rgba(212, 175, 55, 0.15);
            color: var(--gold);
            border-left-color: var(--gold);
          }

          .cookie-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: all 0.3s;
          }

          .cookie-card:hover {
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            transform: translateY(-2px);
          }

          .category-badge {
            display: inline-block;
            padding: 0.35rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
          }

          .badge-essential {
            background: #e3f2fd;
            color: #1976d2;
          }

          .badge-functional {
            background: #f3e5f5;
            color: #7b1fa2;
          }

          .badge-analytics {
            background: #fff3e0;
            color: #f57c00;
          }

          .badge-marketing {
            background: #fce4ec;
            color: #c2185b;
          }

          .toggle-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
          }

          .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
          }

          .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
          }

          input:checked + .slider {
            background-color: var(--gold);
          }

          input:checked + .slider:before {
            transform: translateX(26px);
          }

          input:disabled + .slider {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
          }

          .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }

          .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: var(--navy-dark);
          }

          .stat-label {
            color: #64748b;
            font-size: 0.875rem;
            margin-top: 0.5rem;
          }

          .btn {
            padding: 0.625rem 1.25rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }

          .btn-primary {
            background: var(--navy-dark);
            color: white;
          }

          .btn-primary:hover {
            background: #0f1936;
          }

          .btn-secondary {
            background: var(--gold);
            color: var(--navy-dark);
          }

          .btn-secondary:hover {
            background: #c19b2e;
          }

          .btn-danger {
            background: #dc2626;
            color: white;
          }

          .btn-danger:hover {
            background: #b91c1c;
          }

          .modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
          }

          .modal-content {
            background: white;
            margin: 5% auto;
            padding: 2rem;
            border-radius: 16px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--navy-dark);
          }

          .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s;
          }

          .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--gold);
          }

          .form-textarea {
            resize: vertical;
            min-height: 100px;
            font-family: monospace;
          }

          .tab-container {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            border-bottom: 2px solid #e2e8f0;
          }

          .tab {
            padding: 0.75rem 1.5rem;
            background: none;
            border: none;
            border-bottom: 3px solid transparent;
            cursor: pointer;
            font-weight: 600;
            color: #64748b;
            transition: all 0.2s;
          }

          .tab:hover {
            color: var(--navy-dark);
          }

          .tab.active {
            color: var(--gold);
            border-bottom-color: var(--gold);
          }

          .consent-stats {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            margin-top: 2rem;
          }

          .consent-bar {
            display: flex;
            height: 40px;
            border-radius: 8px;
            overflow: hidden;
            margin: 1rem 0;
          }

          .consent-segment {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 0.875rem;
          }

          .segment-essential { background: #1976d2; }
          .segment-functional { background: #7b1fa2; }
          .segment-analytics { background: #f57c00; }
          .segment-marketing { background: #c2185b; }
        `}</style>
      </head>
      <body>
        <div class="admin-sidebar">
          <div style="padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <h1 style="color: var(--gold); font-size: 1.25rem; font-weight: bold;">
              <i class="fas fa-crown" style="margin-right: 0.5rem;"></i>
              SOFTWAREKING24
            </h1>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin-top: 0.25rem;">
              Admin Panel
            </p>
          </div>
          <div id="sidebar-nav"></div>
        </div>

        <div class="admin-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <div>
              <h1 style="font-size: 2rem; font-weight: bold; color: var(--navy-dark); display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-cookie-bite"></i>
                Cookie-Verwaltung
              </h1>
              <p style="color: #64748b; margin-top: 0.5rem;">
                GDPR-konforme Cookie-Einstellungen verwalten
              </p>
            </div>
            <button onclick="openAddModal()" class="btn btn-primary">
              <i class="fas fa-plus"></i>
              Neuer Cookie
            </button>
          </div>

          {/* Statistics */}
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value" id="total-cookies">0</div>
              <div class="stat-label">Gesamt Cookies</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="essential-count">0</div>
              <div class="stat-label">Essenzielle</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="active-cookies">0</div>
              <div class="stat-label">Aktive Cookies</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="consent-rate">0%</div>
              <div class="stat-label">Zustimmungsrate</div>
            </div>
          </div>

          {/* Category Tabs */}
          <div class="tab-container">
            <button class="tab active" onclick="filterCategory('all')">Alle</button>
            <button class="tab" onclick="filterCategory('essential')">Essenzielle</button>
            <button class="tab" onclick="filterCategory('functional')">Funktionale</button>
            <button class="tab" onclick="filterCategory('analytics')">Analytics</button>
            <button class="tab" onclick="filterCategory('marketing')">Marketing</button>
          </div>

          {/* Cookie List */}
          <div id="cookie-list"></div>

          {/* Consent Statistics */}
          <div class="consent-stats">
            <h3 style="font-size: 1.25rem; font-weight: bold; color: var(--navy-dark); margin-bottom: 1rem;">
              <i class="fas fa-chart-bar"></i>
              Zustimmungsstatistiken
            </h3>
            <div id="consent-chart"></div>
            <div id="consent-details" style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;"></div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <div id="cookieModal" class="modal">
          <div class="modal-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
              <h2 style="font-size: 1.5rem; font-weight: bold; color: var(--navy-dark);">
                <span id="modal-title">Cookie hinzufügen</span>
              </h2>
              <button onclick="closeModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #64748b;">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <form id="cookieForm" onsubmit="saveCookie(event)">
              <input type="hidden" id="cookie-id" />

              <div class="form-group">
                <label class="form-label">Kategorie *</label>
                <select id="cookie-category" class="form-select" required>
                  <option value="essential">Essenzielle</option>
                  <option value="functional">Funktionale</option>
                  <option value="analytics">Analytics</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Cookie-Name *</label>
                <input type="text" id="cookie-name" class="form-input" required placeholder="z.B. _ga, session_id" />
              </div>

              <div class="form-group">
                <label class="form-label">Beschreibung *</label>
                <textarea id="cookie-description" class="form-textarea" required placeholder="Zweck des Cookies beschreiben..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Anbieter</label>
                <input type="text" id="cookie-provider" class="form-input" placeholder="z.B. Google LLC, Facebook, eigene Website" />
              </div>

              <div class="form-group">
                <label class="form-label">Zweck</label>
                <input type="text" id="cookie-purpose" class="form-input" placeholder="z.B. Analytics, Session-Management" />
              </div>

              <div class="form-group">
                <label class="form-label">Ablaufzeit</label>
                <input type="text" id="cookie-expiry" class="form-input" placeholder="z.B. Session, 1 Jahr, 2 Jahre" />
              </div>

              <div class="form-group">
                <label class="form-label">Cookie-Typ</label>
                <select id="cookie-type" class="form-select">
                  <option value="http">HTTP Cookie</option>
                  <option value="local">Local Storage</option>
                  <option value="session">Session Storage</option>
                  <option value="pixel">Tracking Pixel</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Tracking-Code / Script</label>
                <textarea id="cookie-tracking" class="form-textarea" placeholder="JavaScript-Code für Analytics/Marketing-Tools..."></textarea>
                <small style="color: #64748b;">Wird automatisch geladen, wenn Nutzer zustimmt</small>
              </div>

              <div class="form-group">
                <label class="form-label">API Endpoint</label>
                <input type="text" id="cookie-api" class="form-input" placeholder="https://api.example.com/track" />
              </div>

              <div class="form-group">
                <label class="form-label">API Key Setting</label>
                <input type="text" id="cookie-api-key" class="form-input" placeholder="settings.google_analytics_key" />
                <small style="color: #64748b;">Referenz auf Settings-Key für API-Authentifizierung</small>
              </div>

              <div class="form-group" style="display: flex; align-items: center; gap: 1rem;">
                <label class="toggle-switch">
                  <input type="checkbox" id="cookie-essential" />
                  <span class="slider"></span>
                </label>
                <label for="cookie-essential" style="cursor: pointer;">
                  Als essenzielle Cookie markieren (kann nicht deaktiviert werden)
                </label>
              </div>

              <div class="form-group" style="display: flex; align-items: center; gap: 1rem;">
                <label class="toggle-switch">
                  <input type="checkbox" id="cookie-enabled" checked />
                  <span class="slider"></span>
                </label>
                <label for="cookie-enabled" style="cursor: pointer;">
                  Cookie aktiviert
                </label>
              </div>

              <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                <button type="button" onclick="closeModal()" class="btn" style="background: #e2e8f0; color: #475569;">
                  Abbrechen
                </button>
                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-save"></i>
                  Speichern
                </button>
              </div>
            </form>
          </div>
        </div>

        <script>{`
          let cookies = [];
          let currentFilter = 'all';
          let consentStats = null;

          // AdminSidebar Component
          function AdminSidebar(currentPath) {
            const navItems = [
              { path: '/admin', icon: 'fas fa-home', label: 'Dashboard' },
              { path: '/admin/products', icon: 'fas fa-box', label: 'Produkte' },
              { path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Bestellungen' },
              { path: '/admin/customers', icon: 'fas fa-users', label: 'Kunden' },
              { path: '/admin/licenses', icon: 'fas fa-key', label: 'Lizenzen' },
              { path: '/admin/sliders', icon: 'fas fa-images', label: 'Slider' },
              { path: '/admin/homepage-sections', icon: 'fas fa-th-large', label: 'Homepage' },
              { path: '/admin/pages', icon: 'fas fa-file-alt', label: 'Seiten' },
              { path: '/admin/footer', icon: 'fas fa-shoe-prints', label: 'Footer' },
              { path: '/admin/email-templates', icon: 'fas fa-envelope', label: 'E-Mail-Vorlagen' },
              { path: '/admin/cookies', icon: 'fas fa-cookie-bite', label: 'Cookies' },
              { path: '/admin/contact-messages', icon: 'fas fa-comments', label: 'Kontakt' },
              { path: '/admin/settings', icon: 'fas fa-cog', label: 'Einstellungen' }
            ];

            return navItems.map(item => 
              '<a href="' + item.path + '" class="nav-item' + (currentPath === item.path ? ' active' : '') + '">' +
                '<i class="' + item.icon + '"></i>' +
                '<span>' + item.label + '</span>' +
              '</a>'
            ).join('');
          }

          // Initialize
          document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('sidebar-nav').innerHTML = AdminSidebar('/admin/cookies');
            loadCookies();
            loadConsentStats();
          });

          async function loadCookies() {
            try {
              const response = await axios.get('/api/admin/cookies');
              cookies = response.data.data || [];
              updateStats();
              renderCookies();
            } catch (error) {
              console.error('Error loading cookies:', error);
              alert('Fehler beim Laden der Cookies');
            }
          }

          async function loadConsentStats() {
            try {
              const response = await axios.get('/api/admin/cookies/consent-stats');
              consentStats = response.data.data || {};
              renderConsentStats();
            } catch (error) {
              console.error('Error loading consent stats:', error);
            }
          }

          function updateStats() {
            const total = cookies.length;
            const essential = cookies.filter(c => c.is_essential).length;
            const active = cookies.filter(c => c.is_enabled).length;
            
            document.getElementById('total-cookies').textContent = total;
            document.getElementById('essential-count').textContent = essential;
            document.getElementById('active-cookies').textContent = active;
          }

          function filterCategory(category) {
            currentFilter = category;
            
            // Update active tab
            document.querySelectorAll('.tab').forEach(tab => {
              tab.classList.remove('active');
            });
            event.target.classList.add('active');
            
            renderCookies();
          }

          function renderCookies() {
            const filtered = currentFilter === 'all' 
              ? cookies 
              : cookies.filter(c => c.category === currentFilter);

            const html = filtered.map(cookie => {
              const categoryClass = 'badge-' + cookie.category;
              return \`
                <div class="cookie-card">
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <div>
                      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                        <h3 style="font-size: 1.125rem; font-weight: bold; color: var(--navy-dark);">
                          \${cookie.name}
                        </h3>
                        <span class="category-badge \${categoryClass}">
                          \${cookie.category}
                        </span>
                        \${cookie.is_essential ? '<span style="background: #fef3c7; color: #92400e; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;"><i class="fas fa-exclamation-circle"></i> Essentiell</span>' : ''}
                      </div>
                      <p style="color: #64748b; font-size: 0.875rem;">\${cookie.description || 'Keine Beschreibung'}</p>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" \${cookie.is_enabled ? 'checked' : ''} \${cookie.is_essential ? 'disabled' : ''} 
                             onchange="toggleCookie(\${cookie.id}, this.checked)" />
                      <span class="slider"></span>
                    </label>
                  </div>

                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
                    \${cookie.provider ? \`<div><strong style="color: var(--navy-dark);">Anbieter:</strong><br/><span style="color: #64748b;">\${cookie.provider}</span></div>\` : ''}
                    \${cookie.expiry ? \`<div><strong style="color: var(--navy-dark);">Ablauf:</strong><br/><span style="color: #64748b;">\${cookie.expiry}</span></div>\` : ''}
                    \${cookie.type ? \`<div><strong style="color: var(--navy-dark);">Typ:</strong><br/><span style="color: #64748b;">\${cookie.type}</span></div>\` : ''}
                    \${cookie.purpose ? \`<div><strong style="color: var(--navy-dark);">Zweck:</strong><br/><span style="color: #64748b;">\${cookie.purpose}</span></div>\` : ''}
                  </div>

                  \${cookie.tracking_code ? \`
                    <div style="margin-bottom: 1rem;">
                      <details>
                        <summary style="cursor: pointer; font-weight: 600; color: var(--navy-dark); margin-bottom: 0.5rem;">
                          <i class="fas fa-code"></i> Tracking-Code anzeigen
                        </summary>
                        <pre style="background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: 0.875rem; margin-top: 0.5rem;">\${cookie.tracking_code}</pre>
                      </details>
                    </div>
                  \` : ''}

                  <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                    <button onclick="editCookie(\${cookie.id})" class="btn btn-secondary">
                      <i class="fas fa-edit"></i>
                      Bearbeiten
                    </button>
                    \${!cookie.is_essential ? \`
                      <button onclick="deleteCookie(\${cookie.id})" class="btn btn-danger">
                        <i class="fas fa-trash"></i>
                        Löschen
                      </button>
                    \` : ''}
                  </div>
                </div>
              \`;
            }).join('');

            document.getElementById('cookie-list').innerHTML = html || '<div style="text-align: center; padding: 3rem; color: #64748b;">Keine Cookies gefunden</div>';
          }

          function renderConsentStats() {
            if (!consentStats) return;

            const total = consentStats.total_consents || 0;
            const essential = consentStats.essential || 0;
            const functional = consentStats.functional || 0;
            const analytics = consentStats.analytics || 0;
            const marketing = consentStats.marketing || 0;

            // Update consent rate
            document.getElementById('consent-rate').textContent = 
              total > 0 ? Math.round((analytics / total) * 100) + '%' : '0%';

            // Render consent bar
            const chartHtml = total > 0 ? \`
              <div class="consent-bar">
                <div class="consent-segment segment-essential" style="width: 100%">
                  Essentiell: 100%
                </div>
              </div>
              <div class="consent-bar" style="margin-top: 0.5rem;">
                <div class="consent-segment segment-functional" style="width: \${(functional/total)*100}%">
                  \${functional > 0 ? Math.round((functional/total)*100) + '%' : ''}
                </div>
                <div class="consent-segment segment-analytics" style="width: \${(analytics/total)*100}%">
                  \${analytics > 0 ? Math.round((analytics/total)*100) + '%' : ''}
                </div>
                <div class="consent-segment segment-marketing" style="width: \${(marketing/total)*100}%">
                  \${marketing > 0 ? Math.round((marketing/total)*100) + '%' : ''}
                </div>
              </div>
            \` : '<p style="color: #64748b; text-align: center;">Noch keine Zustimmungsdaten vorhanden</p>';

            document.getElementById('consent-chart').innerHTML = chartHtml;

            // Render details
            const detailsHtml = \`
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: bold; color: #1976d2;">\${essential}</div>
                <div style="color: #64748b; font-size: 0.875rem;">Essentiell</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: bold; color: #7b1fa2;">\${functional}</div>
                <div style="color: #64748b; font-size: 0.875rem;">Funktionale</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: bold; color: #f57c00;">\${analytics}</div>
                <div style="color: #64748b; font-size: 0.875rem;">Analytics</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: bold; color: #c2185b;">\${marketing}</div>
                <div style="color: #64748b; font-size: 0.875rem;">Marketing</div>
              </div>
            \`;

            document.getElementById('consent-details').innerHTML = detailsHtml;
          }

          async function toggleCookie(id, enabled) {
            try {
              await axios.patch(\`/api/admin/cookies/\${id}/toggle\`, { is_enabled: enabled ? 1 : 0 });
              loadCookies();
            } catch (error) {
              console.error('Error toggling cookie:', error);
              alert('Fehler beim Aktualisieren');
              loadCookies();
            }
          }

          function openAddModal() {
            document.getElementById('modal-title').textContent = 'Cookie hinzufügen';
            document.getElementById('cookieForm').reset();
            document.getElementById('cookie-id').value = '';
            document.getElementById('cookieModal').style.display = 'block';
          }

          async function editCookie(id) {
            const cookie = cookies.find(c => c.id === id);
            if (!cookie) return;

            document.getElementById('modal-title').textContent = 'Cookie bearbeiten';
            document.getElementById('cookie-id').value = cookie.id;
            document.getElementById('cookie-category').value = cookie.category;
            document.getElementById('cookie-name').value = cookie.name;
            document.getElementById('cookie-description').value = cookie.description || '';
            document.getElementById('cookie-provider').value = cookie.provider || '';
            document.getElementById('cookie-purpose').value = cookie.purpose || '';
            document.getElementById('cookie-expiry').value = cookie.expiry || '';
            document.getElementById('cookie-type').value = cookie.type || 'http';
            document.getElementById('cookie-tracking').value = cookie.tracking_code || '';
            document.getElementById('cookie-api').value = cookie.api_endpoint || '';
            document.getElementById('cookie-api-key').value = cookie.api_key_setting || '';
            document.getElementById('cookie-essential').checked = cookie.is_essential == 1;
            document.getElementById('cookie-enabled').checked = cookie.is_enabled == 1;

            document.getElementById('cookieModal').style.display = 'block';
          }

          async function saveCookie(event) {
            event.preventDefault();

            const id = document.getElementById('cookie-id').value;
            const data = {
              category: document.getElementById('cookie-category').value,
              name: document.getElementById('cookie-name').value,
              description: document.getElementById('cookie-description').value,
              provider: document.getElementById('cookie-provider').value,
              purpose: document.getElementById('cookie-purpose').value,
              expiry: document.getElementById('cookie-expiry').value,
              type: document.getElementById('cookie-type').value,
              tracking_code: document.getElementById('cookie-tracking').value,
              api_endpoint: document.getElementById('cookie-api').value,
              api_key_setting: document.getElementById('cookie-api-key').value,
              is_essential: document.getElementById('cookie-essential').checked ? 1 : 0,
              is_enabled: document.getElementById('cookie-enabled').checked ? 1 : 0
            };

            try {
              if (id) {
                await axios.put(\`/api/admin/cookies/\${id}\`, data);
              } else {
                await axios.post('/api/admin/cookies', data);
              }
              
              closeModal();
              loadCookies();
              alert(id ? 'Cookie aktualisiert!' : 'Cookie hinzugefügt!');
            } catch (error) {
              console.error('Error saving cookie:', error);
              alert('Fehler beim Speichern: ' + (error.response?.data?.error || 'Unbekannter Fehler'));
            }
          }

          async function deleteCookie(id) {
            if (!confirm('Cookie wirklich löschen?')) return;

            try {
              await axios.delete(\`/api/admin/cookies/\${id}\`);
              loadCookies();
              alert('Cookie gelöscht!');
            } catch (error) {
              console.error('Error deleting cookie:', error);
              alert('Fehler beim Löschen');
            }
          }

          function closeModal() {
            document.getElementById('cookieModal').style.display = 'none';
          }

          // Close modal on outside click
          window.onclick = function(event) {
            const modal = document.getElementById('cookieModal');
            if (event.target == modal) {
              closeModal();
            }
          }
        `}</script>
      </body>
    </html>
  )
}
