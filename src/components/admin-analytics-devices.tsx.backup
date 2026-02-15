export function AdminAnalyticsDevices() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics - Devices - Admin - SOFTWAREKING24</title>
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
                        <i class="fas fa-mobile-alt mr-3"></i>Analytics - Devices
                    </h1>
                    <p class="text-blue-100">Geräte- und Browser-Statistiken</p>
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
                    <span class="text-gray-600 text-sm">Desktop</span>
                    <i class="fas fa-desktop text-blue-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">62%</div>
                <div class="text-sm text-gray-500 mt-1">7,854 Besucher</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Mobile</span>
                    <i class="fas fa-mobile-alt text-green-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">32%</div>
                <div class="text-sm text-gray-500 mt-1">4,056 Besucher</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Tablet</span>
                    <i class="fas fa-tablet-alt" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">6%</div>
                <div class="text-sm text-gray-500 mt-1">759 Besucher</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Gesamt</span>
                    <i class="fas fa-chart-pie text-purple-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">12,669</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +8% vs. Vormonat
                </div>
            </div>
        </div>

        <!-- Device Distribution Chart -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="chart-container">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Geräteverteilung</h3>
                <canvas id="deviceChart"></canvas>
            </div>
            <div class="chart-container">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Browser-Verteilung</h3>
                <canvas id="browserChart"></canvas>
            </div>
        </div>

        <!-- Device Details Table -->
        <div class="chart-container">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Gerätedetails</h3>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gerät</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Besucher</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Seitenaufrufe</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bounce Rate</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ø Verweildauer</th>
                        </tr>
                    </thead>
                    <tbody id="devicesBody" class="divide-y divide-gray-200">
                        <tr>
                            <td colspan="5" class="px-6 py-4 text-center text-gray-500">Lade Daten...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Device Chart
        const deviceCtx = document.getElementById('deviceChart').getContext('2d');
        new Chart(deviceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Desktop', 'Mobile', 'Tablet'],
                datasets: [{
                    data: [62, 32, 6],
                    backgroundColor: ['#132C46', '#D9A50B', '#2563eb']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });

        // Browser Chart
        const browserCtx = document.getElementById('browserChart').getContext('2d');
        new Chart(browserCtx, {
            type: 'doughnut',
            data: {
                labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Andere'],
                datasets: [{
                    data: [45, 23, 18, 10, 4],
                    backgroundColor: ['#4285F4', '#FF7139', '#000000', '#0078D7', '#9CA3AF']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });

        // Device Details Data
        const devices = [
            { device: 'Windows Desktop', visitors: 5432, views: 15678, bounce: '38%', duration: '4:23' },
            { device: 'Mac Desktop', visitors: 2422, views: 7234, bounce: '35%', duration: '5:12' },
            { device: 'iPhone', visitors: 2876, views: 5432, bounce: '48%', duration: '2:45' },
            { device: 'Android', visitors: 1180, views: 2234, bounce: '52%', duration: '2:12' },
            { device: 'iPad', visitors: 546, views: 1234, bounce: '42%', duration: '3:34' },
            { device: 'Android Tablet', visitors: 213, views: 567, bounce: '45%', duration: '3:12' }
        ];

        const tbody = document.getElementById('devicesBody');
        tbody.innerHTML = devices.map(d => \`
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-900">\${d.device}</td>
                <td class="px-6 py-4 text-gray-600">\${d.visitors.toLocaleString()}</td>
                <td class="px-6 py-4 text-gray-600">\${d.views.toLocaleString()}</td>
                <td class="px-6 py-4 text-gray-600">\${d.bounce}</td>
                <td class="px-6 py-4 text-gray-600">\${d.duration}</td>
            </tr>
        \`).join('');
    </script>
</body>
</html>
  `;
}
