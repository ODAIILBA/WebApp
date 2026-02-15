export function AdminSupportStaff() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Support Staff - Admin - SOFTWAREKING24</title>
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
    </style>
</head>
<body>
    <div class="admin-header text-white p-6 mb-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">
                        <i class="fas fa-user-headset mr-3"></i>Support Staff
                    </h1>
                    <p class="text-blue-100">Support-Mitarbeiter verwalten</p>
                </div>
                <div class="flex gap-4">
                    <button onclick="addStaff()" class="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                        <i class="fas fa-plus mr-2"></i>Mitarbeiter hinzufügen
                    </button>
                    <a href="/admin" class="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                        <i class="fas fa-arrow-left mr-2"></i>Zurück
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Gesamt Mitarbeiter</span>
                    <i class="fas fa-users text-blue-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">5</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Online</span>
                    <i class="fas fa-circle text-green-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">3</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Offene Tickets</span>
                    <i class="fas fa-ticket-alt" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">12</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Ø Bearbeitungszeit</span>
                    <i class="fas fa-clock text-purple-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">2.5h</div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-6">Support-Team</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border rounded-lg p-6">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                            AM
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-900">Anna Müller</h3>
                            <p class="text-sm text-gray-500">Senior Support</p>
                        </div>
                        <span class="ml-auto px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p class="text-2xl font-bold" style="color: var(--navy)">45</p>
                            <p class="text-xs text-gray-500">Tickets</p>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-green-600">98%</p>
                            <p class="text-xs text-gray-500">Zufriedenheit</p>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-purple-600">2.1h</p>
                            <p class="text-xs text-gray-500">Ø Zeit</p>
                        </div>
                    </div>
                </div>

                <div class="border rounded-lg p-6">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                            MS
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-900">Max Schmidt</h3>
                            <p class="text-sm text-gray-500">Support</p>
                        </div>
                        <span class="ml-auto px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p class="text-2xl font-bold" style="color: var(--navy)">38</p>
                            <p class="text-xs text-gray-500">Tickets</p>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-green-600">96%</p>
                            <p class="text-xs text-gray-500">Zufriedenheit</p>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-purple-600">2.8h</p>
                            <p class="text-xs text-gray-500">Ø Zeit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function addStaff() {
            alert('Mitarbeiter hinzufügen - Funktion wird bald verfügbar sein');
        }
    </script>
</body>
</html>
  `;
}
