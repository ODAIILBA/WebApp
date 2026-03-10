export function AdminIntegrations() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Integrationen - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style>
            :root {
                --navy-dark: #132C46;
                --gold: #D9A50B;
            }
            body {
                background: #f8fafc;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .stat-card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                transition: all 0.3s;
            }
            .stat-card:hover {
                box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                transform: translateY(-2px);
            }
            .integration-card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                border: 2px solid #e5e7eb;
                transition: all 0.2s;
            }
            .integration-card:hover {
                border-color: var(--gold);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .integration-card.active {
                border-color: #10b981;
                background: #f0fdf4;
            }
            .badge {
                padding: 0.25rem 0.75rem;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            .badge-success { background: #d1fae5; color: #065f46; }
            .badge-warning { background: #fef3c7; color: #92400e; }
            .badge-inactive { background: #f3f4f6; color: #6b7280; }
            .btn-primary {
                background: var(--navy-dark);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.2s;
            }
            .btn-primary:hover {
                background: #0f1f33;
            }
            .toggle-switch {
                position: relative;
                width: 48px;
                height: 24px;
            }
            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #cbd5e1;
                transition: 0.3s;
                border-radius: 24px;
            }
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: 0.3s;
                border-radius: 50%;
            }
            input:checked + .toggle-slider {
                background-color: #10b981;
            }
            input:checked + .toggle-slider:before {
                transform: translateX(24px);
            }
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
                align-items: center;
                justify-content: center;
            }
            .modal.active {
                display: flex;
            }
            .modal-content {
                background: white;
                border-radius: 16px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            }
        </style>
    </head>
    <body>
        ${AdminSidebarAdvanced()}
        
        <div class="ml-64 p-8">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold mb-2" style="color: var(--navy-dark);">
                    <i class="fas fa-plug mr-3"></i><span data-i18n="admin.integrations.title">Integrationen</span>
                </h1>
                <p class="text-gray-600" data-i18n="admin.integrations.description">Verbinden Sie Drittanbieter-Services mit Ihrem Shop</p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-4 gap-6 mb-8">
                <div class="stat-card">
                    <div class="text-3xl font-bold mb-2" style="color: var(--navy-dark);" id="activeCount">-</div>
                    <div class="text-sm text-gray-600" data-i18n="admin.integrations.active_count">Aktive Integrationen</div>
                </div>
                <div class="stat-card">
                    <div class="text-3xl font-bold mb-2 text-blue-600" id="paymentCount">-</div>
                    <div class="text-sm text-gray-600" data-i18n="admin.integrations.payment">Zahlungsanbieter</div>
                </div>
                <div class="stat-card">
                    <div class="text-3xl font-bold mb-2 text-purple-600" id="emailCount">-</div>
                    <div class="text-sm text-gray-600" data-i18n="admin.integrations.email">E-Mail Services</div>
                </div>
                <div class="stat-card">
                    <div class="text-3xl font-bold mb-2 text-green-600" id="totalCount">-</div>
                    <div class="text-sm text-gray-600" data-i18n="admin.integrations.available">Verfügbar</div>
                </div>
            </div>

            <!-- Filter Tabs -->
            <div class="flex gap-4 mb-6">
                <button onclick="filterCategory('all')" class="filter-btn active px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                    <span data-i18n="admin.all">Alle</span>
                </button>
                <button onclick="filterCategory('payment')" class="filter-btn px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                    <i class="fas fa-credit-card mr-2"></i><span data-i18n="admin.integrations.payment">Zahlungen</span>
                </button>
                <button onclick="filterCategory('email')" class="filter-btn px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                    <i class="fas fa-envelope mr-2"></i><span data-i18n="admin.integrations.email">E-Mail</span>
                </button>
                <button onclick="filterCategory('analytics')" class="filter-btn px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                    <i class="fas fa-chart-line mr-2"></i><span data-i18n="admin.analytics">Analytics</span>
                </button>
                <button onclick="filterCategory('shipping')" class="filter-btn px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                    <i class="fas fa-truck mr-2"></i><span data-i18n="admin.shipping">Versand</span>
                </button>
                <button onclick="filterCategory('social')" class="filter-btn px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                    <i class="fas fa-share-alt mr-2"></i><span>Social Media</span>
                </button>
            </div>

            <!-- Integrations Grid -->
            <div id="integrationsContainer" class="grid grid-cols-2 gap-6">
                <!-- Will be populated by JavaScript -->
            </div>
        </div>

        <!-- Edit Integration Modal -->
        <div id="editModal" class="modal">
            <div class="modal-content">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold" style="color: var(--navy-dark);">
                        <span id="modalIcon"></span>
                        <span id="modalTitle"></span> <span data-i18n="admin.configure">konfigurieren</span>
                    </h2>
                    <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>

                <form id="editForm" class="space-y-4">
                    <input type="hidden" id="editId">
                    
                    <div>
                        <label class="block text-sm font-semibold mb-2" data-i18n="admin.integrations.api_key">API Key</label>
                        <input type="text" id="editApiKey" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Geben Sie Ihren API Key ein">
                        <p class="text-xs text-gray-500 mt-1">Wird sicher verschlüsselt gespeichert</p>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-2" data-i18n="admin.integrations.api_secret">API Secret (optional)</label>
                        <input type="password" id="editApiSecret" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="API Secret falls erforderlich">
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-2" data-i18n="admin.integrations.webhook_url">Webhook URL (optional)</label>
                        <input type="url" id="editWebhookUrl" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://ihre-domain.de/webhook">
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-2" data-i18n="admin.integrations.additional_config">Zusätzliche Konfiguration (JSON, optional)</label>
                        <textarea id="editConfigJson" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder='{"option": "value"}'></textarea>
                    </div>

                    <div class="flex gap-4 pt-4">
                        <button type="submit" class="btn-primary flex-1">
                            <i class="fas fa-save mr-2"></i><span data-i18n="admin.save">Speichern</span>
                        </button>
                        <button type="button" onclick="testConnection()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            <i class="fas fa-plug mr-2"></i><span data-i18n="admin.integrations.test_connection">Verbindung testen</span>
                        </button>
                        <button type="button" onclick="closeModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                            <span data-i18n="admin.cancel">Abbrechen</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <script>
            let integrations = [];
            let currentCategory = 'all';

            // Load integrations on page load
            async function loadIntegrations() {
                try {
                    const response = await axios.get('/api/integrations');
                    integrations = response.data.integrations;
                    updateStats();
                    renderIntegrations();
                } catch (error) {
                    console.error('Error loading integrations:', error);
                    alert('Fehler beim Laden der Integrationen');
                }
            }

            function updateStats() {
                const activeCount = integrations.filter(i => i.is_active).length;
                const paymentCount = integrations.filter(i => i.category === 'payment').length;
                const emailCount = integrations.filter(i => i.category === 'email').length;
                
                document.getElementById('activeCount').textContent = activeCount;
                document.getElementById('paymentCount').textContent = paymentCount;
                document.getElementById('emailCount').textContent = emailCount;
                document.getElementById('totalCount').textContent = integrations.length;
            }

            function filterCategory(category) {
                currentCategory = category;
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
                event.target.classList.add('active', 'bg-blue-600', 'text-white');
                renderIntegrations();
            }

            function renderIntegrations() {
                const filtered = currentCategory === 'all' 
                    ? integrations 
                    : integrations.filter(i => i.category === currentCategory);

                const container = document.getElementById('integrationsContainer');
                container.innerHTML = filtered.map(integration => \`
                    <div class="integration-card \${integration.is_active ? 'active' : ''}">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-lg bg-\${integration.icon_color || 'gray'}-100 flex items-center justify-center">
                                    <i class="\${integration.icon_class} text-2xl text-\${integration.icon_color || 'gray'}-600"></i>
                                </div>
                                <div>
                                    <h3 class="font-bold text-lg">\${integration.display_name}</h3>
                                    <p class="text-sm text-gray-600">\${integration.description}</p>
                                </div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" \${integration.is_active ? 'checked' : ''} onchange="toggleIntegration(\${integration.id})">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="space-y-2 mb-4">
                            <p class="text-sm">
                                <span class="text-gray-600">Status:</span> 
                                <span class="badge \${integration.is_active ? 'badge-success' : 'badge-inactive'}">
                                    \${integration.is_active ? 'Aktiv' : 'Inaktiv'}
                                </span>
                            </p>
                            <p class="text-sm">
                                <span class="text-gray-600">API Key:</span> 
                                <span class="badge \${integration.api_key ? 'badge-success' : 'badge-warning'}">
                                    \${integration.api_key ? 'Konfiguriert' : 'Nicht konfiguriert'}
                                </span>
                            </p>
                            \${Object.entries(integration.stats || {}).map(([key, value]) => \`
                                <p class="text-sm"><span class="text-gray-600">\${formatStatName(key)}:</span> \${value}</p>
                            \`).join('')}
                        </div>
                        <button onclick="configureIntegration(\${integration.id})" class="btn-primary w-full">
                            <i class="fas fa-cog mr-2"></i>Konfigurieren
                        </button>
                    </div>
                \`).join('');
            }

            function formatStatName(key) {
                const names = {
                    'transactions_30d': 'Transaktionen (30d)',
                    'api_version': 'API Version',
                    'subscribers': 'Abonnenten',
                    'last_sync': 'Letzte Sync',
                    'pageviews_30d': 'Pageviews (30d)',
                    'conversion_rate': 'Conversion Rate',
                    'shipments_30d': 'Sendungen (30d)',
                    'avg_delivery_time': 'Ø Lieferzeit',
                    'followers': 'Follower',
                    'engagement_rate': 'Engagement Rate'
                };
                return names[key] || key;
            }

            async function toggleIntegration(id) {
                try {
                    await axios.patch(\`/api/integrations/\${id}/toggle\`);
                    await loadIntegrations();
                } catch (error) {
                    console.error('Error toggling integration:', error);
                    alert('Fehler beim Ändern des Status');
                }
            }

            function configureIntegration(id) {
                const integration = integrations.find(i => i.id === id);
                if (!integration) return;

                document.getElementById('editId').value = integration.id;
                document.getElementById('modalTitle').textContent = integration.display_name;
                document.getElementById('modalIcon').innerHTML = \`<i class="\${integration.icon_class} mr-2"></i>\`;
                document.getElementById('editApiKey').value = integration.api_key || '';
                document.getElementById('editApiSecret').value = integration.api_secret || '';
                document.getElementById('editWebhookUrl').value = integration.webhook_url || '';
                document.getElementById('editConfigJson').value = integration.config_json || '';

                document.getElementById('editModal').classList.add('active');
            }

            function closeModal() {
                document.getElementById('editModal').classList.remove('active');
                document.getElementById('editForm').reset();
            }

            async function testConnection() {
                const id = document.getElementById('editId').value;
                try {
                    const response = await axios.post(\`/api/integrations/\${id}/test\`);
                    if (response.data.success) {
                        alert('✅ Verbindung erfolgreich!');
                    } else {
                        alert('⚠️ ' + response.data.message);
                    }
                } catch (error) {
                    console.error('Error testing connection:', error);
                    alert('❌ Verbindung fehlgeschlagen: ' + (error.response?.data?.error || error.message));
                }
            }

            document.getElementById('editForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const id = document.getElementById('editId').value;
                const data = {
                    api_key: document.getElementById('editApiKey').value,
                    api_secret: document.getElementById('editApiSecret').value,
                    webhook_url: document.getElementById('editWebhookUrl').value,
                    config_json: document.getElementById('editConfigJson').value
                };

                try {
                    await axios.put(\`/api/integrations/\${id}\`, data);
                    alert('✅ Integration erfolgreich gespeichert!');
                    closeModal();
                    await loadIntegrations();
                } catch (error) {
                    console.error('Error saving integration:', error);
                    alert('❌ Fehler beim Speichern: ' + (error.response?.data?.error || error.message));
                }
            });

            // Load integrations on page load
            loadIntegrations();

            // ============================================
            // ADMIN I18N MANAGER
            // ============================================
            const AdminI18n = {
              currentLang: 'de',
              translations: {},
              
              async init() {
                this.currentLang = localStorage.getItem('language') || 'de';
                await this.loadTranslations(this.currentLang);
                this.applyTranslations();
                
                window.addEventListener('languageChanged', async (e) => {
                  const newLang = e.detail.language;
                  if (newLang !== this.currentLang) {
                    this.currentLang = newLang;
                    await this.loadTranslations(newLang);
                    this.applyTranslations();
                  }
                });
                
                console.log(\`Admin i18n initialized for language: \${this.currentLang}\`);
              },
              
              async loadTranslations(lang) {
                try {
                  const response = await fetch(\`/api/admin/translations/\${lang}\`);
                  const data = await response.json();
                  
                  if (data.success) {
                    this.translations = data.translations;
                    console.log(\`Loaded \${data.count} admin translations for \${lang}\`);
                  }
                } catch (error) {
                  console.error('Error loading translations:', error);
                }
              },
              
              applyTranslations() {
                const elements = document.querySelectorAll('[data-i18n]');
                
                elements.forEach(element => {
                  const key = element.getAttribute('data-i18n');
                  const translation = this.translations[key];
                  
                  if (translation) {
                    if (element.hasAttribute('placeholder')) {
                      element.setAttribute('placeholder', translation);
                    } else if (element.hasAttribute('title')) {
                      element.setAttribute('title', translation);
                    } else if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                      if (element.value) {
                        element.value = translation;
                      } else {
                        element.textContent = translation;
                      }
                    } else {
                      element.textContent = translation;
                    }
                  }
                });
                
                console.log(\`Applied translations to \${elements.length} elements\`);
              },
              
              t(key, fallback = '') {
                return this.translations[key] || fallback;
              }
            };

            // Initialize i18n
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', () => AdminI18n.init());
            } else {
              AdminI18n.init();
            }
            
            window.AdminI18n = AdminI18n;
        </script>
    </body>
    </html>
  `.trim();
}

import { AdminSidebarAdvanced } from './admin-sidebar-advanced';
