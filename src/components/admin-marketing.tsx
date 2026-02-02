export function AdminMarketing() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketing - Admin - SOFTWAREKING24</title>
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
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .marketing-card {
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
                        <i class="fas fa-bullhorn mr-3"></i>Marketing
                    </h1>
                    <p class="text-blue-100">Marketing-Übersicht und Kampagnen</p>
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
                    <span class="text-gray-600 text-sm">Newsletter Abos</span>
                    <i class="fas fa-envelope text-blue-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="newsletterCount">0</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +12% diese Woche
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
                    <span class="text-gray-600 text-sm">Ø Bestellwert</span>
                    <i class="fas fa-euro-sign" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">€87.50</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +€12 vs. Vormonat
                </div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">ROI</span>
                    <i class="fas fa-percentage text-purple-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800">285%</div>
                <div class="text-sm text-green-600 mt-1">
                    <i class="fas fa-arrow-up"></i> +15% vs. Vormonat
                </div>
            </div>
        </div>

        <!-- Marketing Channels -->
        <div class="marketing-card">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
                <i class="fas fa-chart-pie mr-2"></i>Marketing-Kanäle
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <canvas id="channelsChart"></canvas>
                </div>
                <div>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div class="w-3 h-3 rounded-full mr-3" style="background: #132C46"></div>
                                <span class="font-medium text-gray-700">Organische Suche</span>
                            </div>
                            <span class="font-bold text-gray-900">42%</span>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div class="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                                <span class="font-medium text-gray-700">Social Media</span>
                            </div>
                            <span class="font-bold text-gray-900">28%</span>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div class="w-3 h-3 rounded-full mr-3" style="background: #D9A50B"></div>
                                <span class="font-medium text-gray-700">E-Mail Marketing</span>
                            </div>
                            <span class="font-bold text-gray-900">18%</span>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div class="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                                <span class="font-medium text-gray-700">Direktzugriff</span>
                            </div>
                            <span class="font-bold text-gray-900">12%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Active Campaigns -->
        <div class="marketing-card">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
                <i class="fas fa-rocket mr-2"></i>Aktive Kampagnen
            </h3>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kampagne</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kanal</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Impressionen</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Klicks</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Conversions</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kosten</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody id="campaignsBody" class="divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-medium text-gray-900">Winter Sale 2026</td>
                            <td class="px-6 py-4 text-gray-600">Social Media</td>
                            <td class="px-6 py-4 text-gray-600">45,234</td>
                            <td class="px-6 py-4 text-gray-600">3,456</td>
                            <td class="px-6 py-4 text-gray-600">234</td>
                            <td class="px-6 py-4 text-gray-600">€1,250</td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Aktiv</span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-medium text-gray-900">Newsletter Februar</td>
                            <td class="px-6 py-4 text-gray-600">E-Mail</td>
                            <td class="px-6 py-4 text-gray-600">12,543</td>
                            <td class="px-6 py-4 text-gray-600">1,876</td>
                            <td class="px-6 py-4 text-gray-600">123</td>
                            <td class="px-6 py-4 text-gray-600">€350</td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Aktiv</span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-medium text-gray-900">Google Ads Q1</td>
                            <td class="px-6 py-4 text-gray-600">Paid Search</td>
                            <td class="px-6 py-4 text-gray-600">98,765</td>
                            <td class="px-6 py-4 text-gray-600">5,432</td>
                            <td class="px-6 py-4 text-gray-600">345</td>
                            <td class="px-6 py-4 text-gray-600">€2,800</td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Aktiv</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Newsletter Subscribers -->
        <div class="marketing-card">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
                <i class="fas fa-users mr-2"></i>Newsletter-Abonnenten
            </h3>
            <canvas id="subscribersChart" height="80"></canvas>
        </div>
    </div>

    <script>
        // Load newsletter count
        async function loadNewsletterCount() {
            try {
                const response = await fetch('/api/newsletter/count');
                const data = await response.json();
                if (data.success) {
                    document.getElementById('newsletterCount').textContent = data.count.toLocaleString();
                }
            } catch (error) {
                console.error('Error loading newsletter count:', error);
            }
        }

        // Channels Chart
        const channelsCtx = document.getElementById('channelsChart').getContext('2d');
        new Chart(channelsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Organische Suche', 'Social Media', 'E-Mail Marketing', 'Direktzugriff'],
                datasets: [{
                    data: [42, 28, 18, 12],
                    backgroundColor: ['#132C46', '#2563eb', '#D9A50B', '#10b981']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });

        // Subscribers Chart
        const subscribersCtx = document.getElementById('subscribersChart').getContext('2d');
        new Chart(subscribersCtx, {
            type: 'line',
            data: {
                labels: Array.from({length: 30}, (_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (29 - i));
                    return d.toLocaleDateString('de-DE', { month: 'short', day: 'numeric' });
                }),
                datasets: [{
                    label: 'Neue Abonnenten',
                    data: Array.from({length: 30}, () => Math.floor(Math.random() * 50) + 20),
                    borderColor: '#132C46',
                    backgroundColor: 'rgba(19, 44, 70, 0.1)',
                    tension: 0.4,
                    fill: true
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

        // Load data
        loadNewsletterCount();
    </script>
</body>
</html>
  `;
}
