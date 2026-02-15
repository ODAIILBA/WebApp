export function AdminCoupons() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coupons - Admin - SOFTWAREKING24</title>
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
        .coupons-table {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .status-active { background: #d1fae5; color: #065f46; }
        .status-expired { background: #fee2e2; color: #991b1b; }
        .status-used { background: #e5e7eb; color: #374151; }
    </style>
</head>
<body>
    <div class="admin-header text-white p-6 mb-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">
                        <i class="fas fa-tags mr-3"></i>Coupons
                    </h1>
                    <p class="text-blue-100">Rabattcodes und Gutscheine verwalten</p>
                </div>
                <div class="flex gap-4">
                    <button onclick="addCoupon()" class="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                        <i class="fas fa-plus mr-2"></i>Coupon erstellen
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
                    <span class="text-gray-600 text-sm">Gesamt Coupons</span>
                    <i class="fas fa-tags text-blue-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">48</div>
                <div class="text-sm text-gray-500 mt-1">12 aktiv</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Eingelöst</span>
                    <i class="fas fa-check-circle text-green-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">1,234</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +15% diese Woche
                </div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Rabatt Gesamt</span>
                    <i class="fas fa-euro-sign" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">€12,450</div>
                <div class="text-sm text-gray-500 mt-1">Diesen Monat</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Ø Rabatt</span>
                    <i class="fas fa-percentage text-purple-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">15%</div>
                <div class="text-sm text-gray-500 mt-1">Pro Bestellung</div>
            </div>
        </div>

        <!-- Coupons Table -->
        <div class="coupons-table">
            <div class="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 class="text-xl font-bold text-gray-800">
                    <i class="fas fa-list mr-2"></i>Alle Coupons
                </h2>
                <div class="flex gap-4">
                    <input type="text" id="searchInput" placeholder="Suchen..." 
                           class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <select id="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Alle Status</option>
                        <option value="active">Aktiv</option>
                        <option value="expired">Abgelaufen</option>
                        <option value="used">Verwendet</option>
                    </select>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Code</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Typ</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Wert</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Verwendet</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Limit</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gültig bis</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody id="couponsBody" class="divide-y divide-gray-200">
                        <!-- Coupons will be loaded here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        function generateSampleCoupons() {
            const sampleCoupons = [
                { code: 'WINTER2026', type: 'Prozent', value: '20%', used: 145, limit: 500, expires: '2026-03-31', status: 'active' },
                { code: 'NEUKUNDE', type: 'Prozent', value: '15%', used: 89, limit: 'Unbegrenzt', expires: '2026-12-31', status: 'active' },
                { code: 'SAVE50', type: 'Betrag', value: '€50', used: 234, limit: 1000, expires: '2026-06-30', status: 'active' },
                { code: 'XMAS2025', type: 'Prozent', value: '25%', used: 456, limit: 500, expires: '2025-12-31', status: 'expired' },
                { code: 'FLASH10', type: 'Prozent', value: '10%', used: 78, limit: 100, expires: '2026-02-28', status: 'active' }
            ];

            return sampleCoupons.map(coupon => {
                const statusClass = coupon.status === 'active' ? 'status-active' : 
                                  coupon.status === 'expired' ? 'status-expired' : 'status-used';
                const statusText = coupon.status === 'active' ? 'Aktiv' : 
                                 coupon.status === 'expired' ? 'Abgelaufen' : 'Verwendet';

                return \`
                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4">
                            <span class="font-mono font-semibold text-blue-600">\${coupon.code}</span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">\${coupon.type}</td>
                        <td class="px-6 py-4">
                            <span class="font-semibold" style="color: var(--gold)">\${coupon.value}</span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">\${coupon.used}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">\${coupon.limit}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">\${formatDate(coupon.expires)}</td>
                        <td class="px-6 py-4">
                            <span class="status-badge \${statusClass}">\${statusText}</span>
                        </td>
                        <td class="px-6 py-4">
                            <button onclick="editCoupon('\${coupon.code}')" 
                                    class="text-blue-600 hover:text-blue-800 mr-3" title="Bearbeiten">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteCoupon('\${coupon.code}')" 
                                    class="text-red-600 hover:text-red-800" title="Löschen">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                \`;
            }).join('');
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('de-DE', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit'
            });
        }

        function addCoupon() {
            alert('Coupon erstellen - Diese Funktion wird bald verfügbar sein.\\n\\nHinweis: Die Coupons-Tabelle muss in der Datenbank erstellt werden.');
        }

        function editCoupon(code) {
            alert('Coupon bearbeiten: ' + code + '\\n\\nDiese Funktion wird bald verfügbar sein.');
        }

        function deleteCoupon(code) {
            if (confirm('Möchten Sie den Coupon "' + code + '" wirklich löschen?')) {
                alert('Löschen-Funktion wird bald verfügbar sein.');
            }
        }

        // Render coupons
        document.getElementById('couponsBody').innerHTML = generateSampleCoupons();

        // Search and filter functionality
        document.getElementById('searchInput').addEventListener('input', filterCoupons);
        document.getElementById('statusFilter').addEventListener('change', filterCoupons);

        function filterCoupons() {
            // Filter implementation
        }
    </script>
</body>
</html>
  `;
}
