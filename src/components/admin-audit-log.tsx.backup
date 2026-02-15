export function AdminAuditLog() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Audit Log - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
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
            .log-item {
                background: white;
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 1rem;
                border-left: 4px solid var(--gold);
                transition: all 0.2s;
            }
            .log-item:hover {
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .badge {
                padding: 0.25rem 0.75rem;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            .badge-info { background: #dbeafe; color: #1e40af; }
            .badge-success { background: #d1fae5; color: #065f46; }
            .badge-warning { background: #fef3c7; color: #92400e; }
            .badge-error { background: #fee2e2; color: #991b1b; }
            .filter-button {
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.875rem;
                border: 2px solid #e5e7eb;
                background: white;
                transition: all 0.2s;
            }
            .filter-button:hover {
                border-color: var(--gold);
                background: #fef3c7;
            }
            .filter-button.active {
                background: var(--navy-dark);
                border-color: var(--navy-dark);
                color: white;
            }
        </style>
    </head>
    <body>
        ${AdminSidebarAdvanced('/admin/audit-log')}
        
        <div class="ml-80 p-8">
            <div class="max-w-7xl mx-auto">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold" style="color: var(--navy-dark);">
                        <i class="fas fa-clipboard-list mr-3"></i>Audit Log
                    </h1>
                    <p class="text-gray-600 mt-2">System-Aktivitäten und Änderungen nachverfolgen</p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-4 gap-6 mb-8">
                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Gesamt Einträge</p>
                                <p class="text-3xl font-bold mt-1" style="color: var(--navy-dark);">5</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(19, 44, 70, 0.1);">
                                <i class="fas fa-list text-xl" style="color: var(--navy-dark);"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Kritische Events</p>
                                <p class="text-3xl font-bold mt-1 text-red-600">1</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-red-100">
                                <i class="fas fa-exclamation-triangle text-xl text-red-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Warnungen</p>
                                <p class="text-3xl font-bold mt-1 text-yellow-600">1</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-100">
                                <i class="fas fa-exclamation-circle text-xl text-yellow-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Aktive Benutzer</p>
                                <p class="text-3xl font-bold mt-1 text-green-600">3</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                                <i class="fas fa-users text-xl text-green-600"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="stat-card mb-8">
                    <div class="flex gap-4 flex-wrap">
                        <button class="filter-button active">
                            <i class="fas fa-list mr-2"></i>Alle
                        </button>
                        <button class="filter-button">
                            <i class="fas fa-exclamation-triangle mr-2"></i>Kritisch
                        </button>
                        <button class="filter-button">
                            <i class="fas fa-exclamation-circle mr-2"></i>Warnungen
                        </button>
                        <button class="filter-button">
                            <i class="fas fa-info-circle mr-2"></i>Info
                        </button>
                        <button class="filter-button">
                            <i class="fas fa-sign-in-alt mr-2"></i>Login
                        </button>
                        <button class="filter-button">
                            <i class="fas fa-edit mr-2"></i>Änderungen
                        </button>
                    </div>
                </div>

                <!-- Activity Log -->
                <div class="stat-card">
                    <h2 class="text-xl font-bold mb-6" style="color: var(--navy-dark);">
                        <i class="fas fa-history mr-2"></i>Letzte Aktivitäten
                    </h2>

                    <div class="space-y-4">
                        <!-- Log Entry 1 -->
                        <div class="log-item">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="badge badge-info">UPDATE</span>
                                        <span class="badge badge-info">Product</span>
                                        <span class="text-sm text-gray-600">2026-02-02 14:32:15</span>
                                    </div>
                                    <p class="font-semibold mb-1">Produkt aktualisiert: Windows 11 Pro</p>
                                    <p class="text-sm text-gray-600 mb-2">Preis geändert von €89.99 auf €79.99</p>
                                    <div class="flex gap-4 text-sm">
                                        <span><i class="fas fa-user mr-1"></i>admin@softwareking24.de</span>
                                        <span><i class="fas fa-network-wired mr-1"></i>192.168.1.100</span>
                                        <span><i class="fas fa-tag mr-1"></i>PRD-001</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Log Entry 2 -->
                        <div class="log-item">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="badge badge-success">CREATE</span>
                                        <span class="badge badge-info">Order</span>
                                        <span class="text-sm text-gray-600">2026-02-02 14:15:45</span>
                                    </div>
                                    <p class="font-semibold mb-1">Neue Bestellung erstellt</p>
                                    <p class="text-sm text-gray-600 mb-2">Bestellung ORD-1234 für Kunde angelegt</p>
                                    <div class="flex gap-4 text-sm">
                                        <span><i class="fas fa-user mr-1"></i>support@softwareking24.de</span>
                                        <span><i class="fas fa-network-wired mr-1"></i>192.168.1.105</span>
                                        <span><i class="fas fa-tag mr-1"></i>ORD-1234</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Log Entry 3 -->
                        <div class="log-item">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="badge badge-warning">DELETE</span>
                                        <span class="badge badge-info">User</span>
                                        <span class="text-sm text-gray-600">2026-02-02 13:48:22</span>
                                    </div>
                                    <p class="font-semibold mb-1">Benutzer gelöscht</p>
                                    <p class="text-sm text-gray-600 mb-2">Inaktives Benutzerkonto entfernt</p>
                                    <div class="flex gap-4 text-sm">
                                        <span><i class="fas fa-user mr-1"></i>admin@softwareking24.de</span>
                                        <span><i class="fas fa-network-wired mr-1"></i>192.168.1.100</span>
                                        <span><i class="fas fa-tag mr-1"></i>USR-567</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Log Entry 4 -->
                        <div class="log-item" style="border-left-color: #ef4444;">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="badge badge-error">LOGIN_FAILED</span>
                                        <span class="badge badge-error">Auth</span>
                                        <span class="text-sm text-gray-600">2026-02-02 12:20:10</span>
                                    </div>
                                    <p class="font-semibold mb-1">Fehlgeschlagener Login-Versuch</p>
                                    <p class="text-sm text-gray-600 mb-2">Login-Versuch für admin@softwareking24.de</p>
                                    <div class="flex gap-4 text-sm">
                                        <span><i class="fas fa-user mr-1"></i>system</span>
                                        <span><i class="fas fa-network-wired mr-1"></i>103.45.67.89</span>
                                        <span class="text-red-600"><i class="fas fa-shield-alt mr-1"></i>Verdächtig</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Log Entry 5 -->
                        <div class="log-item">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="badge badge-success">LOGIN</span>
                                        <span class="badge badge-info">Auth</span>
                                        <span class="text-sm text-gray-600">2026-02-02 11:55:33</span>
                                    </div>
                                    <p class="font-semibold mb-1">Erfolgreicher Admin-Login</p>
                                    <p class="text-sm text-gray-600 mb-2">Administrator hat sich erfolgreich angemeldet</p>
                                    <div class="flex gap-4 text-sm">
                                        <span><i class="fas fa-user mr-1"></i>admin@softwareking24.de</span>
                                        <span><i class="fas fa-network-wired mr-1"></i>192.168.1.100</span>
                                        <span class="text-green-600"><i class="fas fa-check mr-1"></i>Autorisiert</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <div class="flex justify-between items-center mt-6 pt-6 border-t">
                        <p class="text-sm text-gray-600">Zeige 5 von 5 Einträgen</p>
                        <div class="flex gap-2">
                            <button class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
                                <i class="fas fa-chevron-left mr-1"></i>Zurück
                            </button>
                            <button class="px-4 py-2 border rounded-lg" style="background: var(--navy-dark); color: white;">
                                1
                            </button>
                            <button class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
                                Weiter<i class="fas fa-chevron-right ml-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `.trim();
}

import { AdminSidebarAdvanced } from './admin-sidebar-advanced';

