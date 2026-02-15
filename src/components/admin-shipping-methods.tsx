export function AdminShippingMethods() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Versandmethoden - Admin - SOFTWAREKING24</title>
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
            .shipping-card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                border-left: 4px solid var(--gold);
                transition: all 0.2s;
            }
            .shipping-card:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.2s;
            }
            .btn-primary:hover {
                background: #0f1f33;
                transform: translateY(-1px);
            }
            .btn-success {
                background: #10b981;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.875rem;
            }
            .btn-danger {
                background: #ef4444;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.875rem;
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
        ${AdminSidebarAdvanced('/admin/shipping-methods')}
        
        <div class="ml-80 p-8">
            <div class="max-w-7xl mx-auto">
                <!-- Header -->
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-3xl font-bold" style="color: var(--navy-dark);">
                            <i class="fas fa-shipping-fast mr-3"></i>Versandmethoden
                        </h1>
                        <p class="text-gray-600 mt-2">Verwalten Sie Versandoptionen, Kosten und Lieferzeiten</p>
                    </div>
                    <button onclick="addShippingMethod()" class="btn-primary">
                        <i class="fas fa-plus mr-2"></i>Neue Versandmethode
                    </button>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-4 gap-6 mb-8">
                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Aktive Methoden</p>
                                <p class="text-3xl font-bold mt-1" style="color: var(--navy-dark);">6</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(19, 44, 70, 0.1);">
                                <i class="fas fa-truck text-xl" style="color: var(--navy-dark);"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Sendungen (30d)</p>
                                <p class="text-3xl font-bold mt-1" style="color: var(--navy-dark);">456</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(217, 165, 11, 0.1);">
                                <i class="fas fa-box text-xl" style="color: var(--gold);"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Versandkosten (30d)</p>
                                <p class="text-2xl font-bold mt-1" style="color: var(--navy-dark);">€2,345</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                                <i class="fas fa-euro-sign text-xl text-green-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Ø Lieferzeit</p>
                                <p class="text-3xl font-bold mt-1" style="color: var(--navy-dark);">2.3 Tage</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100">
                                <i class="fas fa-clock text-xl text-blue-600"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Shipping Methods List -->
                <div class="space-y-4">
                    <!-- DHL Standard -->
                    <div class="shipping-card">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-4 flex-1">
                                <div class="w-16 h-16 rounded-lg bg-yellow-100 flex items-center justify-center">
                                    <i class="fas fa-truck text-3xl text-yellow-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h3 class="font-bold text-xl">DHL Standard</h3>
                                        <span class="badge badge-success">Aktiv</span>
                                        <span class="badge badge-warning">Beliebt</span>
                                    </div>
                                    <p class="text-gray-600 mb-2">Standard-Versand innerhalb Deutschlands</p>
                                    <div class="grid grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p class="text-gray-600">Preis</p>
                                            <p class="font-bold">€4.99</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Kostenlos ab</p>
                                            <p class="font-bold">€50.00</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Lieferzeit</p>
                                            <p class="font-bold">2-3 Werktage</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Tracking</p>
                                            <p class="font-bold text-green-600"><i class="fas fa-check mr-1"></i>Ja</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="toggle-switch">
                                    <input type="checkbox" checked onchange="toggleMethod('dhl-standard')">
                                    <span class="toggle-slider"></span>
                                </label>
                                <button onclick="editMethod('dhl-standard')" class="btn-success">
                                    <i class="fas fa-edit mr-1"></i>Bearbeiten
                                </button>
                                <button onclick="deleteMethod('dhl-standard')" class="btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex gap-2 text-sm">
                            <span class="px-3 py-1 bg-gray-100 rounded-full">Deutschland</span>
                            <span class="px-3 py-1 bg-gray-100 rounded-full">Österreich</span>
                        </div>
                    </div>

                    <!-- DHL Express -->
                    <div class="shipping-card">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-4 flex-1">
                                <div class="w-16 h-16 rounded-lg bg-red-100 flex items-center justify-center">
                                    <i class="fas fa-bolt text-3xl text-red-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h3 class="font-bold text-xl">DHL Express</h3>
                                        <span class="badge badge-success">Aktiv</span>
                                    </div>
                                    <p class="text-gray-600 mb-2">Express-Versand für schnelle Lieferung</p>
                                    <div class="grid grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p class="text-gray-600">Preis</p>
                                            <p class="font-bold">€9.99</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Kostenlos ab</p>
                                            <p class="font-bold">€100.00</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Lieferzeit</p>
                                            <p class="font-bold">1 Werktag</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Tracking</p>
                                            <p class="font-bold text-green-600"><i class="fas fa-check mr-1"></i>Ja</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="toggle-switch">
                                    <input type="checkbox" checked onchange="toggleMethod('dhl-express')">
                                    <span class="toggle-slider"></span>
                                </label>
                                <button onclick="editMethod('dhl-express')" class="btn-success">
                                    <i class="fas fa-edit mr-1"></i>Bearbeiten
                                </button>
                                <button onclick="deleteMethod('dhl-express')" class="btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex gap-2 text-sm">
                            <span class="px-3 py-1 bg-gray-100 rounded-full">Deutschland</span>
                        </div>
                    </div>

                    <!-- UPS Standard -->
                    <div class="shipping-card">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-4 flex-1">
                                <div class="w-16 h-16 rounded-lg bg-yellow-100 flex items-center justify-center">
                                    <i class="fas fa-box text-3xl text-yellow-700"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h3 class="font-bold text-xl">UPS Standard</h3>
                                        <span class="badge badge-success">Aktiv</span>
                                    </div>
                                    <p class="text-gray-600 mb-2">UPS Standard-Versand</p>
                                    <div class="grid grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p class="text-gray-600">Preis</p>
                                            <p class="font-bold">€5.49</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Kostenlos ab</p>
                                            <p class="font-bold">€60.00</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Lieferzeit</p>
                                            <p class="font-bold">2-4 Werktage</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Tracking</p>
                                            <p class="font-bold text-green-600"><i class="fas fa-check mr-1"></i>Ja</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="toggle-switch">
                                    <input type="checkbox" checked onchange="toggleMethod('ups-standard')">
                                    <span class="toggle-slider"></span>
                                </label>
                                <button onclick="editMethod('ups-standard')" class="btn-success">
                                    <i class="fas fa-edit mr-1"></i>Bearbeiten
                                </button>
                                <button onclick="deleteMethod('ups-standard')" class="btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex gap-2 text-sm">
                            <span class="px-3 py-1 bg-gray-100 rounded-full">EU-weit</span>
                        </div>
                    </div>

                    <!-- Hermes -->
                    <div class="shipping-card">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-4 flex-1">
                                <div class="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <i class="fas fa-shipping-fast text-3xl text-blue-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h3 class="font-bold text-xl">Hermes Standard</h3>
                                        <span class="badge badge-success">Aktiv</span>
                                    </div>
                                    <p class="text-gray-600 mb-2">Günstiger Versand mit Hermes</p>
                                    <div class="grid grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p class="text-gray-600">Preis</p>
                                            <p class="font-bold">€3.99</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Kostenlos ab</p>
                                            <p class="font-bold">€40.00</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Lieferzeit</p>
                                            <p class="font-bold">3-5 Werktage</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Tracking</p>
                                            <p class="font-bold text-green-600"><i class="fas fa-check mr-1"></i>Ja</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="toggle-switch">
                                    <input type="checkbox" checked onchange="toggleMethod('hermes')">
                                    <span class="toggle-slider"></span>
                                </label>
                                <button onclick="editMethod('hermes')" class="btn-success">
                                    <i class="fas fa-edit mr-1"></i>Bearbeiten
                                </button>
                                <button onclick="deleteMethod('hermes')" class="btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex gap-2 text-sm">
                            <span class="px-3 py-1 bg-gray-100 rounded-full">Deutschland</span>
                        </div>
                    </div>

                    <!-- International -->
                    <div class="shipping-card">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-4 flex-1">
                                <div class="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <i class="fas fa-globe text-3xl text-purple-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h3 class="font-bold text-xl">DHL International</h3>
                                        <span class="badge badge-success">Aktiv</span>
                                    </div>
                                    <p class="text-gray-600 mb-2">Internationaler Versand weltweit</p>
                                    <div class="grid grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p class="text-gray-600">Preis</p>
                                            <p class="font-bold">€14.99</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Kostenlos ab</p>
                                            <p class="font-bold">€200.00</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Lieferzeit</p>
                                            <p class="font-bold">5-10 Werktage</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Tracking</p>
                                            <p class="font-bold text-green-600"><i class="fas fa-check mr-1"></i>Ja</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="toggle-switch">
                                    <input type="checkbox" checked onchange="toggleMethod('international')">
                                    <span class="toggle-slider"></span>
                                </label>
                                <button onclick="editMethod('international')" class="btn-success">
                                    <i class="fas fa-edit mr-1"></i>Bearbeiten
                                </button>
                                <button onclick="deleteMethod('international')" class="btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex gap-2 text-sm">
                            <span class="px-3 py-1 bg-gray-100 rounded-full">Weltweit</span>
                        </div>
                    </div>

                    <!-- Self Pickup -->
                    <div class="shipping-card">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-4 flex-1">
                                <div class="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center">
                                    <i class="fas fa-store text-3xl text-green-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h3 class="font-bold text-xl">Selbstabholung</h3>
                                        <span class="badge badge-success">Aktiv</span>
                                    </div>
                                    <p class="text-gray-600 mb-2">Abholung im Ladengeschäft</p>
                                    <div class="grid grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p class="text-gray-600">Preis</p>
                                            <p class="font-bold text-green-600">Kostenlos</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Verfügbarkeit</p>
                                            <p class="font-bold">Sofort</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Öffnungszeiten</p>
                                            <p class="font-bold">Mo-Fr 9-18</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-600">Tracking</p>
                                            <p class="font-bold text-gray-600"><i class="fas fa-times mr-1"></i>Nein</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="toggle-switch">
                                    <input type="checkbox" checked onchange="toggleMethod('self-pickup')">
                                    <span class="toggle-slider"></span>
                                </label>
                                <button onclick="editMethod('self-pickup')" class="btn-success">
                                    <i class="fas fa-edit mr-1"></i>Bearbeiten
                                </button>
                                <button onclick="deleteMethod('self-pickup')" class="btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex gap-2 text-sm">
                            <span class="px-3 py-1 bg-gray-100 rounded-full">Lokal</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            function addShippingMethod() {
                alert('Neue Versandmethode hinzufügen...');
            }

            function toggleMethod(id) {
                alert(\`Versandmethode "\${id}" wurde \${event.target.checked ? 'aktiviert' : 'deaktiviert'}\`);
            }

            function editMethod(id) {
                alert(\`Versandmethode "\${id}" bearbeiten...\`);
            }

            function deleteMethod(id) {
                if (confirm(\`Möchten Sie diese Versandmethode wirklich löschen?\`)) {
                    alert(\`Versandmethode "\${id}" gelöscht\`);
                }
            }
        </script>
    </body>
    </html>
  `.trim();
}

import { AdminSidebarAdvanced } from './admin-sidebar-advanced';
