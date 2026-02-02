import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminAnalyticsConversion() {
  const sidebar = AdminSidebarAdvanced('/admin/analytics/conversion')
  
  // Sample conversion funnel data
  const funnelData = [
    { stage: 'Besucher', count: 15420, percentage: 100, color: '#3b82f6' },
    { stage: 'Produktansichten', count: 8750, percentage: 56.8, color: '#8b5cf6' },
    { stage: 'In Warenkorb', count: 3240, percentage: 21.0, color: '#ec4899' },
    { stage: 'Checkout begonnen', count: 1890, percentage: 12.3, color: '#f59e0b' },
    { stage: 'Zahlung abgeschlossen', count: 1234, percentage: 8.0, color: '#10b981' },
  ]

  const conversionRate = 8.0
  const averageOrderValue = 89.50
  const totalRevenue = 110443
  
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics - Conversion - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .funnel-stage {
            transition: all 0.3s ease;
        }
        .funnel-stage:hover {
            transform: scale(1.02);
        }
    </style>
</head>
<body class="bg-gray-50">
    ${sidebar}
    
    <div style="margin-left: 280px; padding: 2rem;">
        <!-- Header -->
        <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-funnel-dollar mr-3 text-green-600"></i>
                        Conversion Analytics
                    </h1>
                    <p class="text-gray-600">Verkaufstrichter und Conversion-Raten analysieren</p>
                </div>
                <div class="flex space-x-2">
                    <select class="px-4 py-2 border rounded-lg">
                        <option>Letzte 7 Tage</option>
                        <option>Letzte 30 Tage</option>
                        <option>Letzte 90 Tage</option>
                        <option>Dieses Jahr</option>
                    </select>
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        <i class="fas fa-download mr-2"></i>
                        Export
                    </button>
                </div>
            </div>
        </div>

        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-gray-500 text-sm">Conversion Rate</p>
                    <i class="fas fa-chart-line text-2xl text-green-600"></i>
                </div>
                <p class="text-3xl font-bold text-green-600">${conversionRate}%</p>
                <p class="text-sm text-green-600 mt-2">
                    <i class="fas fa-arrow-up"></i>
                    +0.8% vs. Vorwoche
                </p>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-gray-500 text-sm">Ø Bestellwert</p>
                    <i class="fas fa-euro-sign text-2xl text-blue-600"></i>
                </div>
                <p class="text-3xl font-bold text-blue-600">€${averageOrderValue.toFixed(2)}</p>
                <p class="text-sm text-gray-500 mt-2">
                    Letzte 30 Tage
                </p>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-gray-500 text-sm">Abbruchrate</p>
                    <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
                </div>
                <p class="text-3xl font-bold text-red-600">42.0%</p>
                <p class="text-sm text-red-600 mt-2">
                    <i class="fas fa-arrow-down"></i>
                    -2.1% vs. Vorwoche
                </p>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-gray-500 text-sm">Umsatz</p>
                    <i class="fas fa-coins text-2xl text-yellow-600"></i>
                </div>
                <p class="text-3xl font-bold text-yellow-600">€${totalRevenue.toLocaleString()}</p>
                <p class="text-sm text-gray-500 mt-2">
                    1,234 Bestellungen
                </p>
            </div>
        </div>

        <!-- Conversion Funnel -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-lg font-semibold mb-6">Verkaufstrichter</h3>
            <div class="space-y-4">
                ${funnelData.map((stage, index) => {
                    const dropOff = index > 0 ? funnelData[index - 1].count - stage.count : 0
                    const dropOffPercent = index > 0 ? ((dropOff / funnelData[index - 1].count) * 100).toFixed(1) : 0
                    
                    return `
                    <div class="funnel-stage">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background: ${stage.color}20;">
                                    <span class="font-bold" style="color: ${stage.color};">${index + 1}</span>
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-900">${stage.stage}</div>
                                    ${index > 0 ? `<div class="text-xs text-red-600">-${dropOff.toLocaleString()} Benutzer (${dropOffPercent}% Drop-off)</div>` : ''}
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold" style="color: ${stage.color};">${stage.count.toLocaleString()}</div>
                                <div class="text-sm text-gray-500">${stage.percentage.toFixed(1)}%</div>
                            </div>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="h-3 rounded-full" style="width: ${stage.percentage}%; background: ${stage.color};"></div>
                        </div>
                    </div>
                    `
                }).join('')}
            </div>
        </div>

        <!-- Conversion Trends -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">Conversion Rate Trend</h3>
                <canvas id="conversionTrendChart"></canvas>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">Top Exit-Seiten</h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-semibold">/checkout/payment</div>
                            <div class="text-sm text-gray-500">Zahlungsseite</div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-red-600">34%</div>
                            <div class="text-xs text-gray-500">656 Abbrüche</div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-semibold">/cart</div>
                            <div class="text-sm text-gray-500">Warenkorb</div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-red-600">27%</div>
                            <div class="text-xs text-gray-500">1,350 Abbrüche</div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-semibold">/checkout/shipping</div>
                            <div class="text-sm text-gray-500">Versandseite</div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-orange-600">18%</div>
                            <div class="text-xs text-gray-500">340 Abbrüche</div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-semibold">/product/*</div>
                            <div class="text-sm text-gray-500">Produktseiten</div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-yellow-600">15%</div>
                            <div class="text-xs text-gray-500">5,670 Abbrüche</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Conversion by Source -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">Conversion nach Traffic-Quelle</h3>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quelle</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Besucher</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Umsatz</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ø Wert</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-semibold">Direkt</td>
                            <td class="px-6 py-4">5,234</td>
                            <td class="px-6 py-4">467</td>
                            <td class="px-6 py-4"><span class="text-green-600 font-semibold">8.9%</span></td>
                            <td class="px-6 py-4 font-semibold text-green-600">€41,793</td>
                            <td class="px-6 py-4">€89.50</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-semibold">Google</td>
                            <td class="px-6 py-4">6,789</td>
                            <td class="px-6 py-4">542</td>
                            <td class="px-6 py-4"><span class="text-green-600 font-semibold">8.0%</span></td>
                            <td class="px-6 py-4 font-semibold text-green-600">€48,510</td>
                            <td class="px-6 py-4">€89.50</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-semibold">Social Media</td>
                            <td class="px-6 py-4">2,145</td>
                            <td class="px-6 py-4">128</td>
                            <td class="px-6 py-4"><span class="text-orange-600 font-semibold">6.0%</span></td>
                            <td class="px-6 py-4 font-semibold text-green-600">€11,456</td>
                            <td class="px-6 py-4">€89.50</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-semibold">Email</td>
                            <td class="px-6 py-4">1,252</td>
                            <td class="px-6 py-4">97</td>
                            <td class="px-6 py-4"><span class="text-green-600 font-semibold">7.7%</span></td>
                            <td class="px-6 py-4 font-semibold text-green-600">€8,684</td>
                            <td class="px-6 py-4">€89.50</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Conversion Trend Chart
        const ctx = document.getElementById('conversionTrendChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7'],
                datasets: [{
                    label: 'Conversion Rate',
                    data: [7.2, 7.5, 7.8, 8.1, 7.9, 8.3, 8.0],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>`
}
