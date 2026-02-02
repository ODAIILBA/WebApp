export function AdminAnalyticsBehavior() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics - Behavior - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
        .chart-container {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            margin-bottom: 1.5rem;
        }
    </style>
</head>
<body>
    <div class="admin-header text-white p-6 mb-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">
                        <i class="fas fa-user-check mr-3"></i>Analytics - Behavior
                    </h1>
                    <p class="text-blue-100">Nutzerverhalten und Interaktionen</p>
                </div>
                <a href="/admin" class="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                    <i class="fas fa-arrow-left mr-2"></i>Zurück
                </a>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 pb-12">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Warenkorbrate</span>
                    <i class="fas fa-shopping-cart text-blue-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">67%</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +5% vs. Vormonat
                </div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Conversion Rate</span>
                    <i class="fas fa-chart-line text-green-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">3.2%</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +0.5% vs. Vormonat
                </div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Warenkorbabbruch</span>
                    <i class="fas fa-times-circle" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">28%</div>
                <div class="text-sm text-red-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +2% vs. Vormonat
                </div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Ø Bestellwert</span>
                    <i class="fas fa-euro-sign text-purple-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">€87.50</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +€12 vs. Vormonat
                </div>
            </div>
        </div>

        <!-- User Flow Chart -->
        <div class="chart-container">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">User Flow</h3>
            <canvas id="userFlowChart" height="80"></canvas>
        </div>

        <!-- Top Products -->
        <div class="chart-container">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Meistbetrachtete Produkte</h3>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Produkt</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Aufrufe</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">In Warenkorb</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gekauft</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Conversion</th>
                        </tr>
                    </thead>
                    <tbody id="productsBody" class="divide-y divide-gray-200">
                        <tr>
                            <td colspan="5" class="px-6 py-4 text-center text-gray-500">Lade Daten...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // User Flow Chart
        const ctx = document.getElementById('userFlowChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Homepage', 'Produktseite', 'In Warenkorb', 'Checkout', 'Bestätigung'],
                datasets: [{
                    label: 'Nutzer',
                    data: [10000, 6700, 4200, 1890, 1340],
                    backgroundColor: [
                        '#132C46',
                        '#1a3a54',
                        '#D9A50B',
                        '#2563eb',
                        '#10b981'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Top Products Data
        const products = [
            { name: 'Windows 11 Pro', views: 3245, cart: 876, bought: 234, conversion: '7.2%' },
            { name: 'Microsoft Office 2024', views: 2987, cart: 743, bought: 198, conversion: '6.6%' },
            { name: 'Windows Server 2022', views: 1876, cart: 456, bought: 123, conversion: '6.6%' },
            { name: 'Kaspersky Total Security', views: 1654, cart: 398, bought: 89, conversion: '5.4%' },
            { name: 'Adobe Creative Cloud', views: 1432, cart: 321, bought: 76, conversion: '5.3%' }
        ];

        const tbody = document.getElementById('productsBody');
        tbody.innerHTML = products.map(p => \`
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-900">\${p.name}</td>
                <td class="px-6 py-4 text-gray-600">\${p.views.toLocaleString()}</td>
                <td class="px-6 py-4 text-gray-600">\${p.cart.toLocaleString()}</td>
                <td class="px-6 py-4 text-gray-600">\${p.bought.toLocaleString()}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        \${p.conversion}
                    </span>
                </td>
            </tr>
        \`).join('');
    </script>
</body>
</html>
  `;
}
