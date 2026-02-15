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
        </style>
    </head>
    <body>
        ${AdminSidebarAdvanced('/admin/integrations')}
        
        <div class="ml-80 p-8">
            <div class="max-w-7xl mx-auto">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold" style="color: var(--navy-dark);">
                        <i class="fas fa-puzzle-piece mr-3"></i>Integrationen
                    </h1>
                    <p class="text-gray-600 mt-2">Verbinden Sie Ihren Shop mit externen Diensten und APIs</p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-4 gap-6 mb-8">
                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Aktive Integrationen</p>
                                <p class="text-3xl font-bold mt-1 text-green-600">6</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                                <i class="fas fa-check-circle text-xl text-green-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Verfügbar</p>
                                <p class="text-3xl font-bold mt-1" style="color: var(--navy-dark);">12</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(19, 44, 70, 0.1);">
                                <i class="fas fa-plug text-xl" style="color: var(--navy-dark);"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">API Calls (24h)</p>
                                <p class="text-3xl font-bold mt-1" style="color: var(--navy-dark);">1,234</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(217, 165, 11, 0.1);">
                                <i class="fas fa-exchange-alt text-xl" style="color: var(--gold);"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Letzte Sync</p>
                                <p class="text-lg font-bold mt-1" style="color: var(--navy-dark);">vor 5 Min</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100">
                                <i class="fas fa-sync text-xl text-blue-600"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Integration Categories -->
                <div class="space-y-8">
                    <!-- Payment Gateways -->
                    <div>
                        <h2 class="text-xl font-bold mb-4" style="color: var(--navy-dark);">
                            <i class="fas fa-credit-card mr-2"></i>Zahlungsanbieter
                        </h2>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="integration-card active">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                            <i class="fab fa-stripe text-2xl text-blue-600"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-lg">Stripe</h3>
                                            <p class="text-sm text-gray-600">Kreditkarten & Online-Zahlungen</p>
                                        </div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked onchange="toggleIntegration('stripe')">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="space-y-2 mb-4">
                                    <p class="text-sm"><span class="text-gray-600">Status:</span> <span class="badge badge-success">Aktiv</span></p>
                                    <p class="text-sm"><span class="text-gray-600">API Version:</span> 2024-01-01</p>
                                    <p class="text-sm"><span class="text-gray-600">Transaktionen (30d):</span> 1,567</p>
                                </div>
                                <button onclick="configureIntegration('stripe')" class="btn-primary w-full">
                                    <i class="fas fa-cog mr-2"></i>Konfigurieren
                                </button>
                            </div>

                            <div class="integration-card active">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                            <i class="fab fa-paypal text-2xl text-blue-600"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-lg">PayPal</h3>
                                            <p class="text-sm text-gray-600">Online-Zahlungen & Express Checkout</p>
                                        </div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked onchange="toggleIntegration('paypal')">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="space-y-2 mb-4">
                                    <p class="text-sm"><span class="text-gray-600">Status:</span> <span class="badge badge-success">Aktiv</span></p>
                                    <p class="text-sm"><span class="text-gray-600">API Version:</span> v2</p>
                                    <p class="text-sm"><span class="text-gray-600">Transaktionen (30d):</span> 892</p>
                                </div>
                                <button onclick="configureIntegration('paypal')" class="btn-primary w-full">
                                    <i class="fas fa-cog mr-2"></i>Konfigurieren
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Email Services -->
                    <div>
                        <h2 class="text-xl font-bold mb-4" style="color: var(--navy-dark);">
                            <i class="fas fa-envelope mr-2"></i>E-Mail Marketing
                        </h2>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="integration-card active">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                            <i class="fas fa-envelope text-2xl text-purple-600"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-lg">Mailchimp</h3>
                                            <p class="text-sm text-gray-600">Newsletter & Marketing Automation</p>
                                        </div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked onchange="toggleIntegration('mailchimp')">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="space-y-2 mb-4">
                                    <p class="text-sm"><span class="text-gray-600">Status:</span> <span class="badge badge-success">Aktiv</span></p>
                                    <p class="text-sm"><span class="text-gray-600">Abonnenten:</span> 3,456</p>
                                    <p class="text-sm"><span class="text-gray-600">Letzte Sync:</span> vor 5 Min</p>
                                </div>
                                <button onclick="configureIntegration('mailchimp')" class="btn-primary w-full">
                                    <i class="fas fa-cog mr-2"></i>Konfigurieren
                                </button>
                            </div>

                            <div class="integration-card">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                            <i class="fas fa-paper-plane text-2xl text-gray-600"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-lg">SendGrid</h3>
                                            <p class="text-sm text-gray-600">Transaktions-E-Mails</p>
                                        </div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" onchange="toggleIntegration('sendgrid')">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="space-y-2 mb-4">
                                    <p class="text-sm"><span class="text-gray-600">Status:</span> <span class="badge badge-inactive">Inaktiv</span></p>
                                    <p class="text-sm text-gray-600">Nicht konfiguriert</p>
                                </div>
                                <button onclick="configureIntegration('sendgrid')" class="btn-primary w-full">
                                    <i class="fas fa-plus mr-2"></i>Einrichten
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Analytics -->
                    <div>
                        <h2 class="text-xl font-bold mb-4" style="color: var(--navy-dark);">
                            <i class="fas fa-chart-line mr-2"></i>Analytics & Tracking
                        </h2>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="integration-card active">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                                            <i class="fab fa-google text-2xl text-orange-600"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-lg">Google Analytics</h3>
                                            <p class="text-sm text-gray-600">Website-Tracking & Berichte</p>
                                        </div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked onchange="toggleIntegration('google-analytics')">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="space-y-2 mb-4">
                                    <p class="text-sm"><span class="text-gray-600">Status:</span> <span class="badge badge-success">Aktiv</span></p>
                                    <p class="text-sm"><span class="text-gray-600">Property ID:</span> GA-123456789</p>
                                    <p class="text-sm"><span class="text-gray-600">Events (24h):</span> 1,234</p>
                                </div>
                                <button onclick="configureIntegration('google-analytics')" class="btn-primary w-full">
                                    <i class="fas fa-cog mr-2"></i>Konfigurieren
                                </button>
                            </div>

                            <div class="integration-card active">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                            <i class="fab fa-facebook text-2xl text-blue-600"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-lg">Facebook Pixel</h3>
                                            <p class="text-sm text-gray-600">Conversion-Tracking</p>
                                        </div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked onchange="toggleIntegration('facebook-pixel')">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="space-y-2 mb-4">
                                    <p class="text-sm"><span class="text-gray-600">Status:</span> <span class="badge badge-success">Aktiv</span></p>
                                    <p class="text-sm"><span class="text-gray-600">Pixel ID:</span> 123456789012345</p>
                                    <p class="text-sm"><span class="text-gray-600">Events (24h):</span> 567</p>
                                </div>
                                <button onclick="configureIntegration('facebook-pixel')" class="btn-primary w-full">
                                    <i class="fas fa-cog mr-2"></i>Konfigurieren
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Shipping -->
                    <div>
                        <h2 class="text-xl font-bold mb-4" style="color: var(--navy-dark);">
                            <i class="fas fa-shipping-fast mr-2"></i>Versand & Logistik
                        </h2>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="integration-card active">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                                            <i class="fas fa-truck text-2xl text-yellow-600"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-lg">DHL</h3>
                                            <p class="text-sm text-gray-600">Versandlabels & Tracking</p>
                                        </div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked onchange="toggleIntegration('dhl')">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="space-y-2 mb-4">
                                    <p class="text-sm"><span class="text-gray-600">Status:</span> <span class="badge badge-success">Aktiv</span></p>
                                    <p class="text-sm"><span class="text-gray-600">Sendungen (30d):</span> 234</p>
                                    <p class="text-sm"><span class="text-gray-600">API Version:</span> v3</p>
                                </div>
                                <button onclick="configureIntegration('dhl')" class="btn-primary w-full">
                                    <i class="fas fa-cog mr-2"></i>Konfigurieren
                                </button>
                            </div>

                            <div class="integration-card">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                            <i class="fas fa-box text-2xl text-gray-600"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-lg">UPS</h3>
                                            <p class="text-sm text-gray-600">Versandlabels & Tracking</p>
                                        </div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" onchange="toggleIntegration('ups')">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="space-y-2 mb-4">
                                    <p class="text-sm"><span class="text-gray-600">Status:</span> <span class="badge badge-inactive">Inaktiv</span></p>
                                    <p class="text-sm text-gray-600">Nicht konfiguriert</p>
                                </div>
                                <button onclick="configureIntegration('ups')" class="btn-primary w-full">
                                    <i class="fas fa-plus mr-2"></i>Einrichten
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            function toggleIntegration(name) {
                alert(\`Integration "\${name}" wurde \${event.target.checked ? 'aktiviert' : 'deaktiviert'}\`);
            }

            function configureIntegration(name) {
                alert(\`Konfiguration für "\${name}" wird geöffnet...\`);
                // Here you would open a modal or navigate to configuration page
            }
        </script>
    </body>
    </html>
  `.trim();
}

import { AdminSidebarAdvanced } from './admin-sidebar-advanced';
