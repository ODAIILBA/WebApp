export function AdminAnalyticsTraffic() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics - Traffic - Admin - SOFTWAREKING24</title>
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
                        <i class="fas fa-chart-line mr-3"></i>Analytics - Traffic
                    </h1>
                    <p class="text-blue-100">Webseitenbesucher und Traffic-Statistiken</p>
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
                    <span class="text-gray-600 text-sm">Gesamtbesucher</span>
                    <i class="fas fa-users text-blue-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="totalVisitors">0</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +12% vs. Vormonat
                </div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Seitenaufrufe</span>
                    <i class="fas fa-eye text-purple-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="pageViews">0</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +8% vs. Vormonat
                </div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Bounce Rate</span>
                    <i class="fas fa-percentage" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="bounceRate">0%</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-down"></i> -3% vs. Vormonat
                </div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Verweildauer</span>
                    <i class="fas fa-clock text-green-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="avgDuration">0m</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +5% vs. Vormonat
                </div>
            </div>
        </div>

        <!-- Traffic Chart -->
        <div class="chart-container">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Traffic Verlauf (30 Tage)</h3>
            <canvas id="trafficChart" height="80"></canvas>
        </div>

        <!-- Top Pages -->
        <div class="chart-container">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Top Seiten</h3>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Seite</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Besucher</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Seitenaufrufe</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Verweildauer</th>
                        </tr>
                    </thead>
                    <tbody id="topPagesBody" class="divide-y divide-gray-200">
                        <tr>
                            <td colspan="4" class="px-6 py-4 text-center text-gray-500">Lade Daten...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Sample data - in production, fetch from API
        const trafficData = {
            visitors: 12543,
            pageViews: 45876,
            bounceRate: 42.5,
            avgDuration: 3.2
        };

        document.getElementById('totalVisitors').textContent = trafficData.visitors.toLocaleString();
        document.getElementById('pageViews').textContent = trafficData.pageViews.toLocaleString();
        document.getElementById('bounceRate').textContent = trafficData.bounceRate + '%';
        document.getElementById('avgDuration').textContent = trafficData.avgDuration.toFixed(1) + 'm';

        // Traffic Chart
        const ctx = document.getElementById('trafficChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 30}, (_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (29 - i));
                    return d.toLocaleDateString('de-DE', { month: 'short', day: 'numeric' });
                }),
                datasets: [{
                    label: 'Besucher',
                    data: Array.from({length: 30}, () => Math.floor(Math.random() * 500) + 300),
                    borderColor: '#132C46',
                    backgroundColor: 'rgba(19, 44, 70, 0.1)',
                    tension: 0.4
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

        // Top Pages
        const topPages = [
            { page: '/', visitors: 5432, views: 8765, duration: '4:23' },
            { page: '/products', visitors: 3245, views: 6543, duration: '3:45' },
            { page: '/cart', visitors: 2134, views: 3456, duration: '2:15' },
            { page: '/contact', visitors: 1876, views: 2543, duration: '5:32' },
            { page: '/faq', visitors: 1543, views: 2234, duration: '3:12' }
        ];

        const tbody = document.getElementById('topPagesBody');
        tbody.innerHTML = topPages.map(p => \`
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-900">\${p.page}</td>
                <td class="px-6 py-4 text-gray-600">\${p.visitors.toLocaleString()}</td>
                <td class="px-6 py-4 text-gray-600">\${p.views.toLocaleString()}</td>
                <td class="px-6 py-4 text-gray-600">\${p.duration}</td>
            </tr>
        \`).join('');
    </script>
</body>
</html>
  `;
}
