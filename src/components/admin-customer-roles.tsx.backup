export function AdminCustomerRoles() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Roles - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #132C46;
            --gold: #D9A50B;
        }
        body {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .admin-header {
            background: linear-gradient(135deg, var(--navy) 0%, #1a3a54 100%);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            border-left: 4px solid var(--gold);
        }
        .role-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .role-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="admin-header text-white p-6 mb-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">
                        <i class="fas fa-user-tag mr-3"></i>Customer Roles
                    </h1>
                    <p class="text-blue-100">Kundenrollen und Berechtigungen verwalten</p>
                </div>
                <div class="flex gap-4">
                    <button onclick="addRole()" class="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                        <i class="fas fa-plus mr-2"></i>Rolle erstellen
                    </button>
                    <a href="/admin" class="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                        <i class="fas fa-arrow-left mr-2"></i>Zurück
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 pb-12">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Gesamt Rollen</span>
                    <i class="fas fa-users-cog text-blue-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">4</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Standard</span>
                    <i class="fas fa-user text-green-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">1,234</div>
                <div class="text-sm text-gray-500 mt-1">Kunden</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">VIP</span>
                    <i class="fas fa-crown" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">45</div>
                <div class="text-sm text-gray-500 mt-1">Kunden</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Business</span>
                    <i class="fas fa-building text-purple-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">89</div>
                <div class="text-sm text-gray-500 mt-1">Kunden</div>
            </div>
        </div>

        <!-- Roles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Standard Customer Role -->
            <div class="role-card">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-user text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Standard Kunde</h3>
                            <p class="text-sm text-gray-500">Normale Kundenrechte</p>
                        </div>
                    </div>
                    <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">Produkte kaufen</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">Support-Tickets erstellen</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">Bestellhistorie einsehen</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-times text-gray-400 mr-2"></i>
                        <span class="text-gray-400">Rabatte / Sonderpreise</span>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Kunden:</span>
                        <span class="font-semibold text-gray-900">1,234</span>
                    </div>
                </div>
            </div>

            <!-- VIP Customer Role -->
            <div class="role-card" style="border-left: 4px solid var(--gold)">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-crown" style="color: var(--gold); font-size: 1.5rem;"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">VIP Kunde</h3>
                            <p class="text-sm text-gray-500">Erweiterte Privilegien</p>
                        </div>
                    </div>
                    <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">Alle Standard-Rechte</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">10% Rabatt auf alle Produkte</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">Vorrangiger Support</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">Früher Zugang zu neuen Produkten</span>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Kunden:</span>
                        <span class="font-semibold text-gray-900">45</span>
                    </div>
                </div>
            </div>

            <!-- Business Customer Role -->
            <div class="role-card" style="border-left: 4px solid #9333ea">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-building text-purple-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Business Kunde</h3>
                            <p class="text-sm text-gray-500">Für Unternehmen</p>
                        </div>
                    </div>
                    <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">Volumenlizenzen kaufen</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">15% Geschäftsrabatt</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">Rechnungskauf möglich</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">Dedizierter Account Manager</span>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Kunden:</span>
                        <span class="font-semibold text-gray-900">89</span>
                    </div>
                </div>
            </div>

            <!-- Reseller Role -->
            <div class="role-card" style="border-left: 4px solid #10b981">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-handshake text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Reseller</h3>
                            <p class="text-sm text-gray-500">Wiederverkäufer</p>
                        </div>
                    </div>
                    <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">Großhandelspreise</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">25% Partner-Rabatt</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">API-Zugang</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check text-green-600 mr-2"></i>
                        <span class="text-gray-700">White-Label Optionen</span>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Kunden:</span>
                        <span class="font-semibold text-gray-900">12</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Permissions Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-6 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-800">
                    <i class="fas fa-shield-alt mr-2"></i>Berechtigungen-Übersicht
                </h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Berechtigung</th>
                            <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Standard</th>
                            <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">VIP</th>
                            <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Business</th>
                            <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Reseller</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 text-sm text-gray-900">Produkte kaufen</td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-check text-green-600"></i></td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-check text-green-600"></i></td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-check text-green-600"></i></td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-check text-green-600"></i></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 text-sm text-gray-900">Rabatte</td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-times text-gray-300"></i></td>
                            <td class="px-6 py-4 text-center"><span class="text-sm font-medium" style="color: var(--gold)">10%</span></td>
                            <td class="px-6 py-4 text-center"><span class="text-sm font-medium text-purple-600">15%</span></td>
                            <td class="px-6 py-4 text-center"><span class="text-sm font-medium text-green-600">25%</span></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 text-sm text-gray-900">Volumenlizenzen</td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-times text-gray-300"></i></td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-times text-gray-300"></i></td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-check text-green-600"></i></td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-check text-green-600"></i></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 text-sm text-gray-900">API-Zugang</td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-times text-gray-300"></i></td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-times text-gray-300"></i></td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-times text-gray-300"></i></td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-check text-green-600"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        function addRole() {
            alert('Neue Rolle erstellen - Funktion wird bald verfügbar sein');
        }
    </script>
</body>
</html>
  `;
}
