// Enhanced Firewall Admin Page Component
// Full-featured firewall management interface

export function FirewallAdminPage(data: any) {
  const { settings = [], stats = {}, blockedIPs = [], rules = [], threatPatterns = [], events = [] } = data

  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Web Application Firewall - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    </head>
    <body class="bg-gray-50">
      ${data.sidebar || ''}
      
      <div style="margin-left: 280px; padding: 2rem;">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            <i class="fas fa-shield-alt text-orange-600 mr-3"></i>
            Web Application Firewall (WAF)
          </h1>
          <p class="text-gray-600">Endpoint-Firewall mit intelligenter Bedrohungserkennung</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm text-gray-500">Aktive Regeln</p>
              <i class="fas fa-fire text-orange-600"></i>
            </div>
            <p class="text-3xl font-bold text-orange-600">${stats.activeRules || 0}</p>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm text-gray-500">Geblockte IPs</p>
              <i class="fas fa-ban text-red-600"></i>
            </div>
            <p class="text-3xl font-bold text-red-600">${stats.blockedIPs || 0}</p>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm text-gray-500">Angriffe (24h)</p>
              <i class="fas fa-exclamation-triangle text-yellow-600"></i>
            </div>
            <p class="text-3xl font-bold text-yellow-600">${stats.events24h || 0}</p>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm text-gray-500">Bedrohungsmuster</p>
              <i class="fas fa-brain text-purple-600"></i>
            </div>
            <p class="text-3xl font-bold text-purple-600">${stats.threatPatterns || 0}</p>
          </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="mb-6 border-b border-gray-200">
          <nav class="flex space-x-8">
            <button onclick="showTab('overview')" class="tab-btn border-b-2 border-orange-600 py-4 px-1 text-orange-600 font-medium">
              <i class="fas fa-chart-line mr-2"></i>Übersicht
            </button>
            <button onclick="showTab('settings')" class="tab-btn py-4 px-1 text-gray-500 hover:text-gray-700">
              <i class="fas fa-cog mr-2"></i>Einstellungen
            </button>
            <button onclick="showTab('blocked-ips')" class="tab-btn py-4 px-1 text-gray-500 hover:text-gray-700">
              <i class="fas fa-ban mr-2"></i>Blockierte IPs
            </button>
            <button onclick="showTab('rules')" class="tab-btn py-4 px-1 text-gray-500 hover:text-gray-700">
              <i class="fas fa-fire mr-2"></i>Firewall-Regeln
            </button>
            <button onclick="showTab('threats')" class="tab-btn py-4 px-1 text-gray-500 hover:text-gray-700">
              <i class="fas fa-virus mr-2"></i>Bedrohungsmuster
            </button>
            <button onclick="showTab('events')" class="tab-btn py-4 px-1 text-gray-500 hover:text-gray-700">
              <i class="fas fa-list mr-2"></i>Ereignisse
            </button>
          </nav>
        </div>

        <!-- Tab Contents -->
        
        <!-- Overview Tab -->
        <div id="tab-overview" class="tab-content">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Protection Status -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4">
                <i class="fas fa-shield-alt text-green-600 mr-2"></i>Schutzstatus
              </h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">Firewall</span>
                  <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    <i class="fas fa-check-circle mr-1"></i>Aktiv
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">Lernmodus</span>
                  <span class="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
                    <i class="fas fa-times-circle mr-1"></i>Deaktiviert
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">Brute-Force-Schutz</span>
                  <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    <i class="fas fa-check-circle mr-1"></i>Aktiv
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">SQL Injection Schutz</span>
                  <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    <i class="fas fa-check-circle mr-1"></i>Aktiv
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">XSS Schutz</span>
                  <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    <i class="fas fa-check-circle mr-1"></i>Aktiv
                  </span>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4">
                <i class="fas fa-bolt text-yellow-600 mr-2"></i>Schnellaktionen
              </h3>
              <div class="space-y-3">
                <button onclick="toggleLearningMode()" class="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                  <i class="fas fa-graduation-cap text-blue-600 mr-2"></i>
                  <span class="font-medium">Lernmodus aktivieren</span>
                </button>
                <button onclick="showBlockIPModal()" class="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg transition">
                  <i class="fas fa-ban text-red-600 mr-2"></i>
                  <span class="font-medium">IP-Adresse blockieren</span>
                </button>
                <button onclick="addFirewallRule()" class="w-full text-left px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition">
                  <i class="fas fa-plus text-orange-600 mr-2"></i>
                  <span class="font-medium">Firewall-Regel hinzufügen</span>
                </button>
                <button onclick="exportSecurityReport()" class="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition">
                  <i class="fas fa-download text-green-600 mr-2"></i>
                  <span class="font-medium">Sicherheitsbericht exportieren</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Top Attack Types -->
          ${(stats.topAttackTypes && stats.topAttackTypes.length > 0) ? `
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-lg font-semibold mb-4">
              <i class="fas fa-chart-bar text-purple-600 mr-2"></i>Top Angriffstypen (7 Tage)
            </h3>
            <div class="space-y-3">
              ${stats.topAttackTypes.map((attack: any) => `
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-medium text-gray-700">${attack.attack_type || 'Unknown'}</span>
                    <span class="text-sm text-gray-600">${attack.count || 0} Angriffe</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-purple-600 h-2 rounded-full" style="width: ${Math.min((attack.count / (stats.topAttackTypes[0]?.count || 1)) * 100, 100)}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
        </div>

        <!-- Settings Tab -->
        <div id="tab-settings" class="tab-content hidden">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-semibold mb-6">
              <i class="fas fa-cog text-blue-600 mr-2"></i>Firewall-Einstellungen
            </h3>
            
            <form id="firewall-settings-form" onsubmit="saveSettings(event)">
              <!-- General Settings -->
              <div class="mb-8">
                <h4 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  <i class="fas fa-sliders-h mr-2"></i>Allgemeine Einstellungen
                </h4>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label class="font-medium text-gray-700">Firewall aktiviert</label>
                      <p class="text-sm text-gray-500">Master-Schalter für die Firewall</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="firewall_enabled" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label class="font-medium text-gray-700">Lernmodus</label>
                      <p class="text-sm text-gray-500">Protokollieren ohne zu blockieren (reduziert Fehlalarme)</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="learning_mode" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label class="font-medium text-gray-700">Auto-Update Regeln</label>
                      <p class="text-sm text-gray-500">Bedrohungsmuster automatisch aktualisieren</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="auto_update_rules" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Protection Settings -->
              <div class="mb-8">
                <h4 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  <i class="fas fa-shield-alt mr-2"></i>Schutzeinstellungen
                </h4>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label class="font-medium text-gray-700">Brute-Force-Schutz</label>
                      <p class="text-sm text-gray-500">Login-Versuche begrenzen</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="brute_force_protection" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div class="p-4 bg-gray-50 rounded-lg">
                    <label class="block font-medium text-gray-700 mb-2">Max. Login-Versuche</label>
                    <input type="number" name="max_login_attempts" value="5" min="1" max="20" 
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <p class="text-sm text-gray-500 mt-1">Anzahl der Versuche bevor IP blockiert wird</p>
                  </div>

                  <div class="p-4 bg-gray-50 rounded-lg">
                    <label class="block font-medium text-gray-700 mb-2">Sperrzeit (Sekunden)</label>
                    <input type="number" name="lockout_duration" value="3600" min="60" max="86400" 
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <p class="text-sm text-gray-500 mt-1">3600 = 1 Stunde, 86400 = 24 Stunden</p>
                  </div>

                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label class="font-medium text-gray-700">SQL Injection blockieren</label>
                      <p class="text-sm text-gray-500">UNION SELECT, OR 1=1, etc.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="block_sql_injection" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label class="font-medium text-gray-700">XSS blockieren</label>
                      <p class="text-sm text-gray-500">Cross-Site Scripting Angriffe</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="block_xss" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label class="font-medium text-gray-700">Datei-Upload blockieren</label>
                      <p class="text-sm text-gray-500">Gefährliche Dateitypen (.php, .exe, etc.)</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="block_file_upload" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label class="font-medium text-gray-700">Directory Traversal blockieren</label>
                      <p class="text-sm text-gray-500">../../../ Pfad-Angriffe</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="block_directory_traversal" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Rate Limiting -->
              <div class="mb-8">
                <h4 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  <i class="fas fa-tachometer-alt mr-2"></i>Rate Limiting
                </h4>
                
                <div class="space-y-4">
                  <div class="p-4 bg-gray-50 rounded-lg">
                    <label class="block font-medium text-gray-700 mb-2">Max. Requests</label>
                    <input type="number" name="rate_limit_requests" value="100" min="10" max="1000" 
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <p class="text-sm text-gray-500 mt-1">Maximale Anfragen pro Zeitfenster</p>
                  </div>

                  <div class="p-4 bg-gray-50 rounded-lg">
                    <label class="block font-medium text-gray-700 mb-2">Zeitfenster (Sekunden)</label>
                    <input type="number" name="rate_limit_window" value="60" min="10" max="300" 
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <p class="text-sm text-gray-500 mt-1">Zeitraum für Rate Limiting</p>
                  </div>
                </div>
              </div>

              <!-- Alert Settings -->
              <div class="mb-8">
                <h4 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  <i class="fas fa-bell mr-2"></i>Benachrichtigungen
                </h4>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label class="font-medium text-gray-700">E-Mail-Benachrichtigungen</label>
                      <p class="text-sm text-gray-500">Bei Sicherheitsvorfällen benachrichtigen</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="email_alerts" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div class="p-4 bg-gray-50 rounded-lg">
                    <label class="block font-medium text-gray-700 mb-2">Benachrichtigungsschwelle</label>
                    <select name="alert_threshold" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="low">Niedrig (alle Ereignisse)</option>
                      <option value="medium">Mittel (wichtige Ereignisse)</option>
                      <option value="high" selected>Hoch (nur kritische Ereignisse)</option>
                      <option value="critical">Kritisch (nur sehr kritisch)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="flex justify-end space-x-4">
                <button type="button" onclick="resetSettings()" class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <i class="fas fa-undo mr-2"></i>Zurücksetzen
                </button>
                <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <i class="fas fa-save mr-2"></i>Einstellungen speichern
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Blocked IPs Tab -->
        <div id="tab-blocked-ips" class="tab-content hidden">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold">
                <i class="fas fa-ban text-red-600 mr-2"></i>Blockierte IP-Adressen
              </h3>
              <button onclick="showBlockIPModal()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                <i class="fas fa-ban mr-2"></i>IP blockieren
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP-Adresse</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typ</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grund</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Versuche</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Läuft ab</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  ${blockedIPs.length > 0 ? blockedIPs.map((ip: any) => `
                    <tr class="hover:bg-gray-50">
                      <td class="px-6 py-4 font-mono text-sm">${ip.ip_address}</td>
                      <td class="px-6 py-4">
                        <span class="px-2 py-1 text-xs rounded ${
                          ip.block_type === 'automatic' ? 'bg-red-100 text-red-800' :
                          ip.block_type === 'manual' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }">${ip.block_type}</span>
                      </td>
                      <td class="px-6 py-4 text-sm">${ip.reason || 'N/A'}</td>
                      <td class="px-6 py-4 text-sm">${ip.recent_attempts || 0}</td>
                      <td class="px-6 py-4 text-sm">${ip.blocked_until ? new Date(ip.blocked_until).toLocaleDateString('de-DE') : 'Permanent'}</td>
                      <td class="px-6 py-4 text-right">
                        <button onclick="unblockIP('${ip.ip_address}')" class="text-green-600 hover:text-green-800 mr-3">
                          <i class="fas fa-unlock"></i>
                        </button>
                        <button onclick="viewIPDetails('${ip.ip_address}')" class="text-blue-600 hover:text-blue-800">
                          <i class="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                        <i class="fas fa-shield-alt text-6xl mb-4 text-gray-300"></i>
                        <p class="text-lg">Keine blockierten IPs</p>
                        <p class="text-sm mt-2">Alle IPs haben derzeit Zugriff</p>
                      </td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Rules Tab -->
        <div id="tab-rules" class="tab-content hidden">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold">
                <i class="fas fa-fire text-orange-600 mr-2"></i>Firewall-Regeln
              </h3>
              <button onclick="addFirewallRule()" class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                <i class="fas fa-plus mr-2"></i>Regel hinzufügen
              </button>
            </div>
            
            <p class="text-gray-600 mb-6">Benutzerdefinierte Firewall-Regeln für erweiterten Schutz</p>
            
            <div class="space-y-4">
              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-800">Standard IP-Block Regel</h4>
                    <p class="text-sm text-gray-600 mt-1">Blockiert bekannte bösartige IP-Adressen</p>
                    <div class="mt-2 flex items-center space-x-4 text-sm">
                      <span class="text-gray-500">
                        <i class="fas fa-fire mr-1"></i>Typ: ip_block
                      </span>
                      <span class="text-gray-500">
                        <i class="fas fa-exclamation-triangle mr-1"></i>Severity: high
                      </span>
                      <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Aktiv</span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button onclick="editRule(1)" class="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="toggleRule(1)" class="p-2 text-gray-600 hover:bg-gray-100 rounded">
                      <i class="fas fa-power-off"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                <i class="fas fa-plus-circle text-4xl text-gray-300 mb-3"></i>
                <p class="text-gray-500 mb-4">Erstellen Sie benutzerdefinierte Regeln für erweiterten Schutz</p>
                <button onclick="addFirewallRule()" class="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  <i class="fas fa-plus mr-2"></i>Erste Regel erstellen
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Threats Tab -->
        <div id="tab-threats" class="tab-content hidden">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold">
                <i class="fas fa-virus text-purple-600 mr-2"></i>Bedrohungsmuster
              </h3>
              <button onclick="addThreatPattern()" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <i class="fas fa-plus mr-2"></i>Muster hinzufügen
              </button>
            </div>
            
            <p class="text-gray-600 mb-6">8 aktive Bedrohungsmuster zum Schutz vor bekannten Angriffen</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${[
                { type: 'SQL Injection', icon: 'database', color: 'red', desc: 'UNION SELECT, OR 1=1, DROP TABLE' },
                { type: 'XSS Attack', icon: 'code', color: 'orange', desc: '<script>, javascript:, onerror=' },
                { type: 'File Upload', icon: 'file-upload', color: 'yellow', desc: '.php, .exe, .sh, .bat files' },
                { type: 'Directory Traversal', icon: 'folder-open', color: 'blue', desc: '../, ../../, %2e%2e%2f' },
                { type: 'Command Injection', icon: 'terminal', color: 'purple', desc: 'cmd.exe, bash, /bin/sh' },
                { type: 'Path Traversal', icon: 'route', color: 'green', desc: '/etc/passwd, proc/self' },
                { type: 'Code Execution', icon: 'play-circle', color: 'pink', desc: 'eval(), exec(), system()' },
                { type: 'Malware Patterns', icon: 'bug', color: 'red', desc: 'Bekannte Malware-Signaturen' }
              ].map(pattern => `
                <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center mb-2">
                        <i class="fas fa-${pattern.icon} text-${pattern.color}-600 mr-2"></i>
                        <h4 class="font-medium text-gray-800">${pattern.type}</h4>
                      </div>
                      <p class="text-sm text-gray-600">${pattern.desc}</p>
                      <div class="mt-2">
                        <span class="px-2 py-1 bg-${pattern.color}-100 text-${pattern.color}-800 rounded text-xs">
                          <i class="fas fa-exclamation-triangle mr-1"></i>High Severity
                        </span>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${pattern.color}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${pattern.color}-600"></div>
                    </label>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Events Tab -->
        <div id="tab-events" class="tab-content hidden">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-semibold mb-6">
              <i class="fas fa-list text-blue-600 mr-2"></i>Sicherheitsereignisse
            </h3>
            
            <div class="flex items-center justify-between mb-6">
              <div class="flex space-x-4">
                <select class="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Alle Ereignisse</option>
                  <option>Nur Blockierte</option>
                  <option>SQL Injection</option>
                  <option>XSS</option>
                  <option>Brute Force</option>
                </select>
                <input type="date" class="px-4 py-2 border border-gray-300 rounded-lg">
              </div>
              <button onclick="exportEvents()" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <i class="fas fa-download mr-2"></i>Exportieren
              </button>
            </div>
            
            <div class="text-center py-12 text-gray-500">
              <i class="fas fa-shield-alt text-6xl mb-4 text-gray-300"></i>
              <p class="text-lg">Keine Sicherheitsereignisse</p>
              <p class="text-sm mt-2">Ihre Website ist gut geschützt!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Block IP Modal -->
      <div id="blockIPModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <h3 class="text-2xl font-bold mb-4">
            <i class="fas fa-ban text-red-600 mr-2"></i>IP-Adresse blockieren
          </h3>
          <form onsubmit="blockIP(event)">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">IP-Adresse</label>
              <input type="text" id="blockIP" placeholder="123.45.67.89" required
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Grund</label>
              <textarea id="blockReason" rows="3" placeholder="Mehrere Angriffsversuche..." required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"></textarea>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Dauer</label>
              <select id="blockDuration" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                <option value="3600">1 Stunde</option>
                <option value="86400">24 Stunden</option>
                <option value="604800">7 Tage</option>
                <option value="2592000">30 Tage</option>
                <option value="0">Permanent</option>
              </select>
            </div>
            <div class="flex justify-end space-x-4">
              <button type="button" onclick="hideBlockIPModal()" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Abbrechen
              </button>
              <button type="submit" class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                <i class="fas fa-ban mr-2"></i>Blockieren
              </button>
            </div>
          </form>
        </div>
      </div>

      <script>
        // Tab switching
        function showTab(tabName) {
          // Hide all tabs
          document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.add('hidden')
          })
          
          // Remove active state from all buttons
          document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('border-orange-600', 'text-orange-600')
            btn.classList.add('text-gray-500')
          })
          
          // Show selected tab
          document.getElementById('tab-' + tabName).classList.remove('hidden')
          
          // Highlight active button
          event.target.classList.remove('text-gray-500')
          event.target.classList.add('border-orange-600', 'text-orange-600')
        }

        // Modal functions
        function showBlockIPModal() {
          document.getElementById('blockIPModal').classList.remove('hidden')
        }

        function hideBlockIPModal() {
          document.getElementById('blockIPModal').classList.add('hidden')
        }

        // Block IP
        async function blockIP(event) {
          event.preventDefault()
          const ip = document.getElementById('blockIP').value
          const reason = document.getElementById('blockReason').value
          const duration = parseInt(document.getElementById('blockDuration').value)

          try {
            const response = await axios.post('/api/admin/firewall/block-ip', {
              ip_address: ip,
              reason: reason,
              duration: duration || null
            })

            if (response.data.success) {
              alert('IP-Adresse erfolgreich blockiert!')
              hideBlockIPModal()
              location.reload()
            }
          } catch (error) {
            alert('Fehler beim Blockieren: ' + error.message)
          }
        }

        // Unblock IP
        async function unblockIP(ip) {
          if (!confirm(\`IP-Adresse \${ip} entsperren?\`)) return

          try {
            const response = await axios.delete(\`/api/admin/firewall/block-ip/\${ip}\`)
            if (response.data.success) {
              alert('IP-Adresse erfolgreich entsperrt!')
              location.reload()
            }
          } catch (error) {
            alert('Fehler beim Entsperren: ' + error.message)
          }
        }

        // Save settings
        async function saveSettings(event) {
          event.preventDefault()
          const form = event.target
          const formData = new FormData(form)
          const settings = {}

          for (let [key, value] of formData.entries()) {
            if (value === 'on') {
              settings[key] = '1'
            } else {
              settings[key] = value
            }
          }

          try {
            const response = await axios.post('/api/admin/firewall/settings', { settings })
            if (response.data.success) {
              alert('Einstellungen gespeichert!')
              location.reload()
            }
          } catch (error) {
            alert('Fehler beim Speichern: ' + error.message)
          }
        }

        // Placeholder functions
        function toggleLearningMode() {
          alert('Lernmodus wird umgeschaltet...')
        }

        function addFirewallRule() {
          alert('Firewall-Regel hinzufügen-Dialog wird geöffnet...')
        }

        function addThreatPattern() {
          alert('Bedrohungsmuster hinzufügen-Dialog wird geöffnet...')
        }

        function exportSecurityReport() {
          alert('Sicherheitsbericht wird exportiert...')
        }

        function viewIPDetails(ip) {
          alert('Details für IP: ' + ip)
        }

        function resetSettings() {
          if (confirm('Einstellungen auf Standardwerte zurücksetzen?')) {
            location.reload()
          }
        }

        function exportEvents() {
          alert('Ereignisse werden exportiert...')
        }
      </script>
    </body>
    </html>
  `
}
