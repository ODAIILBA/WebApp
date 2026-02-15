export function AdminAutomations() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Automatisierungen - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .glass {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        .automation-card {
          transition: all 0.3s ease;
        }

        .automation-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 52px;
          height: 28px;
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
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        input:checked + .toggle-slider:before {
          transform: translateX(24px);
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border: 1px solid rgba(102, 126, 234, 0.2);
        }
      </style>
    </head>
    <body class="min-h-screen">
      
      <div class="container mx-auto px-4 py-8 max-w-7xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-4xl font-bold text-white mb-2">
              <i class="fas fa-robot mr-3"></i>
              Automatisierungen
            </h1>
            <p class="text-white/80">Automatisiere wiederkehrende Aufgaben und spare Zeit</p>
          </div>
          <a href="/admin/dashboard" class="bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all">
            <i class="fas fa-arrow-left mr-2"></i>
            Zurück zum Dashboard
          </a>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="glass rounded-2xl p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm mb-1">Aktive Regeln</p>
                <p class="text-3xl font-bold text-purple-600">12</p>
              </div>
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <i class="fas fa-check-circle text-white text-2xl"></i>
              </div>
            </div>
          </div>

          <div class="glass rounded-2xl p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm mb-1">Heute ausgeführt</p>
                <p class="text-3xl font-bold text-blue-600">234</p>
              </div>
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <i class="fas fa-play-circle text-white text-2xl"></i>
              </div>
            </div>
          </div>

          <div class="glass rounded-2xl p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm mb-1">Zeitersparnis</p>
                <p class="text-3xl font-bold text-green-600">18h</p>
              </div>
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <i class="fas fa-clock text-white text-2xl"></i>
              </div>
            </div>
          </div>

          <div class="glass rounded-2xl p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm mb-1">Fehlerrate</p>
                <p class="text-3xl font-bold text-orange-600">0.2%</p>
              </div>
              <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <i class="fas fa-exclamation-triangle text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="glass rounded-2xl p-6 mb-8">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900">
              <i class="fas fa-bolt mr-2 text-yellow-500"></i>
              Schnellaktionen
            </h2>
            <button class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
              <i class="fas fa-plus mr-2"></i>
              Neue Automatisierung
            </button>
          </div>
        </div>

        <!-- Automation Categories -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          <!-- Email Automations -->
          <div class="glass rounded-2xl p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-900">
                <i class="fas fa-envelope mr-2 text-blue-500"></i>
                E-Mail Automatisierungen
              </h3>
              <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">5 Aktiv</span>
            </div>

            <div class="space-y-4">
              <!-- Automation 1 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-user-check text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Willkommens-E-Mail</h4>
                      <p class="text-sm text-gray-600">Bei Registrierung</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-paper-plane mr-1"></i>
                    Heute: 23 gesendet
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>

              <!-- Automation 2 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-shopping-cart text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Bestellbestätigung</h4>
                      <p class="text-sm text-gray-600">Nach Kauf</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-paper-plane mr-1"></i>
                    Heute: 45 gesendet
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>

              <!-- Automation 3 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-clock text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Lizenz läuft ab</h4>
                      <p class="text-sm text-gray-600">7 Tage vorher</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-paper-plane mr-1"></i>
                    Heute: 12 gesendet
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Automations -->
          <div class="glass rounded-2xl p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-900">
                <i class="fas fa-box mr-2 text-purple-500"></i>
                Bestellungs-Automatisierungen
              </h3>
              <span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-bold">4 Aktiv</span>
            </div>

            <div class="space-y-4">
              <!-- Automation 1 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-key text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Auto-Lizenzversand</h4>
                      <p class="text-sm text-gray-600">Bei Zahlungseingang</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-check-circle mr-1"></i>
                    Heute: 45 versendet
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>

              <!-- Automation 2 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-star text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Bewertungs-Anfrage</h4>
                      <p class="text-sm text-gray-600">Nach 3 Tagen</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-paper-plane mr-1"></i>
                    Heute: 18 gesendet
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>

              <!-- Automation 3 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-shopping-cart text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Warenkorb-Erinnerung</h4>
                      <p class="text-sm text-gray-600">Nach 24 Stunden</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-paper-plane mr-1"></i>
                    Heute: 31 gesendet
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- License Automations -->
          <div class="glass rounded-2xl p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-900">
                <i class="fas fa-shield-alt mr-2 text-green-500"></i>
                Lizenz-Automatisierungen
              </h3>
              <span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold">3 Aktiv</span>
            </div>

            <div class="space-y-4">
              <!-- Automation 1 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-sync text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Auto-Verlängerung</h4>
                      <p class="text-sm text-gray-600">Bei Ablauf</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-check-circle mr-1"></i>
                    Heute: 8 verlängert
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>

              <!-- Automation 2 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-bell text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Status-Benachrichtigung</h4>
                      <p class="text-sm text-gray-600">Bei Änderung</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-paper-plane mr-1"></i>
                    Heute: 15 gesendet
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- System Automations -->
          <div class="glass rounded-2xl p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-900">
                <i class="fas fa-cogs mr-2 text-orange-500"></i>
                System-Automatisierungen
              </h3>
              <span class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">3 Aktiv</span>
            </div>

            <div class="space-y-4">
              <!-- Automation 1 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                      <i class="fas fa-database text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Datenbank-Backup</h4>
                      <p class="text-sm text-gray-600">Täglich um 2:00</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-clock mr-1"></i>
                    Letztes Backup: 2h
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>

              <!-- Automation 2 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-trash text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Alte Logs löschen</h4>
                      <p class="text-sm text-gray-600">Wöchentlich</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-check-circle mr-1"></i>
                    Letzte Ausführung: 3 Tage
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>

              <!-- Automation 3 -->
              <div class="automation-card bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-chart-line text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">Analytics-Report</h4>
                      <p class="text-sm text-gray-600">Montags um 9:00</p>
                    </div>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">
                    <i class="fas fa-paper-plane mr-1"></i>
                    Letzter Report: 1 Tag
                  </span>
                  <button class="text-purple-600 hover:text-purple-800 font-medium">
                    <i class="fas fa-cog mr-1"></i>
                    Bearbeiten
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Recent Activity -->
        <div class="glass rounded-2xl p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-6">
            <i class="fas fa-history mr-2 text-purple-500"></i>
            Letzte Aktivitäten
          </h3>

          <div class="space-y-3">
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <i class="fas fa-check text-white"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Willkommens-E-Mail gesendet</p>
                  <p class="text-sm text-gray-600">An: neuer.kunde@example.com</p>
                </div>
              </div>
              <span class="text-gray-500 text-sm">vor 2 Min.</span>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <i class="fas fa-key text-white"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Lizenzschlüssel automatisch versendet</p>
                  <p class="text-sm text-gray-600">Bestellung #ORD-2026-001234</p>
                </div>
              </div>
              <span class="text-gray-500 text-sm">vor 5 Min.</span>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <i class="fas fa-clock text-white"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Ablauf-Benachrichtigung gesendet</p>
                  <p class="text-sm text-gray-600">Lizenz läuft in 7 Tagen ab</p>
                </div>
              </div>
              <span class="text-gray-500 text-sm">vor 12 Min.</span>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <i class="fas fa-sync text-white"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Lizenz automatisch verlängert</p>
                  <p class="text-sm text-gray-600">Office 2021 Pro - 1 Jahr</p>
                </div>
              </div>
              <span class="text-gray-500 text-sm">vor 18 Min.</span>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <i class="fas fa-star text-white"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Bewertungs-Anfrage gesendet</p>
                  <p class="text-sm text-gray-600">An: zufriedener.kunde@example.com</p>
                </div>
              </div>
              <span class="text-gray-500 text-sm">vor 25 Min.</span>
            </div>
          </div>
        </div>

      </div>

      <script>
        // Toggle switch functionality
        document.querySelectorAll('.toggle-switch input').forEach(toggle => {
          toggle.addEventListener('change', function() {
            const card = this.closest('.automation-card');
            if (this.checked) {
              card.style.opacity = '1';
            } else {
              card.style.opacity = '0.6';
            }
          });
        });

        // Add hover effects
        document.querySelectorAll('.automation-card').forEach(card => {
          card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
          });
          card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
          });
        });
      </script>

    </body>
    </html>
  `;
}
