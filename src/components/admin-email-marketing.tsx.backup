import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminEmailMarketing() {
  const sidebar = AdminSidebarAdvanced('/admin/email-marketing')
  
  // Sample email campaigns data
  const campaigns = [
    { 
      id: 1, 
      name: 'Willkommens-Serie', 
      subject: 'Willkommen bei SOFTWAREKING24',
      status: 'active',
      sent: 1245,
      opened: 687,
      clicked: 234,
      revenue: 12450.00,
      created_at: '2026-01-15'
    },
    { 
      id: 2, 
      name: 'Produkt-Updates', 
      subject: 'Neue Software-Angebote',
      status: 'active',
      sent: 2340,
      opened: 1089,
      clicked: 445,
      revenue: 8900.00,
      created_at: '2026-01-20'
    },
    { 
      id: 3, 
      name: 'Rabatt-Aktion 20%', 
      subject: '20% Rabatt auf alle Lizenzen',
      status: 'completed',
      sent: 3500,
      opened: 2100,
      clicked: 980,
      revenue: 45600.00,
      created_at: '2026-01-25'
    },
    { 
      id: 4, 
      name: 'Verlassener Warenkorb', 
      subject: 'Ihre Artikel warten noch',
      status: 'active',
      sent: 567,
      opened: 289,
      clicked: 123,
      revenue: 4560.00,
      created_at: '2026-01-28'
    },
  ]

  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0)
  const totalOpened = campaigns.reduce((sum, c) => sum + c.opened, 0)
  const totalClicked = campaigns.reduce((sum, c) => sum + c.clicked, 0)
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0)
  
  const openRate = ((totalOpened / totalSent) * 100).toFixed(1)
  const clickRate = ((totalClicked / totalSent) * 100).toFixed(1)

  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Marketing - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .campaign-card {
            transition: all 0.3s ease;
        }
        .campaign-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body class="bg-gray-50">
    ${sidebar}
    
    <div style="margin-left: 280px; padding: 2rem;">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                    <i class="fas fa-envelope mr-3 text-blue-600"></i>
                    Email Marketing
                </h1>
                <p class="text-gray-600">Kampagnen verwalten und Performance überwachen</p>
            </div>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
                <i class="fas fa-plus mr-2"></i>
                Neue Kampagne
            </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-gray-500 text-sm">Versendete E-Mails</p>
                    <i class="fas fa-paper-plane text-2xl text-blue-600"></i>
                </div>
                <p class="text-3xl font-bold text-blue-600">${totalSent.toLocaleString()}</p>
                <p class="text-sm text-gray-500 mt-2">Letzte 30 Tage</p>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-gray-500 text-sm">Öffnungsrate</p>
                    <i class="fas fa-envelope-open text-2xl text-green-600"></i>
                </div>
                <p class="text-3xl font-bold text-green-600">${openRate}%</p>
                <p class="text-sm text-gray-500 mt-2">${totalOpened.toLocaleString()} geöffnet</p>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-gray-500 text-sm">Klickrate</p>
                    <i class="fas fa-mouse-pointer text-2xl text-purple-600"></i>
                </div>
                <p class="text-3xl font-bold text-purple-600">${clickRate}%</p>
                <p class="text-sm text-gray-500 mt-2">${totalClicked.toLocaleString()} Klicks</p>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-gray-500 text-sm">Generierter Umsatz</p>
                    <i class="fas fa-euro-sign text-2xl text-yellow-600"></i>
                </div>
                <p class="text-3xl font-bold text-yellow-600">€${totalRevenue.toLocaleString()}</p>
                <p class="text-sm text-gray-500 mt-2">ROI: ${((totalRevenue / totalSent) * 100).toFixed(0)}%</p>
            </div>
        </div>

        <!-- Performance Chart -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-lg font-semibold mb-4">Kampagnen-Performance</h3>
            <canvas id="performanceChart" height="80"></canvas>
        </div>

        <!-- Campaigns List -->
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b flex justify-between items-center">
                <h2 class="text-xl font-semibold">Alle Kampagnen</h2>
                <div class="flex space-x-2">
                    <select class="px-4 py-2 border rounded-lg">
                        <option>Alle Status</option>
                        <option>Aktiv</option>
                        <option>Abgeschlossen</option>
                        <option>Entwurf</option>
                    </select>
                    <input type="text" placeholder="Kampagne suchen..." class="px-4 py-2 border rounded-lg">
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kampagne</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Versendet</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Geöffnet</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Klicks</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Umsatz</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${campaigns.map(campaign => {
                            const openRate = ((campaign.opened / campaign.sent) * 100).toFixed(1)
                            const clickRate = ((campaign.clicked / campaign.sent) * 100).toFixed(1)
                            const statusColor = campaign.status === 'active' ? 'green' : 'gray'
                            const statusText = campaign.status === 'active' ? 'Aktiv' : 'Abgeschlossen'
                            
                            return `
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4">
                                    <div>
                                        <div class="font-semibold text-gray-900">${campaign.name}</div>
                                        <div class="text-sm text-gray-500">${campaign.subject}</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-${statusColor}-100 text-${statusColor}-800 text-xs rounded-full">
                                        ${statusText}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="font-semibold">${campaign.sent.toLocaleString()}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div>
                                        <div class="font-semibold">${campaign.opened.toLocaleString()}</div>
                                        <div class="text-xs text-gray-500">${openRate}%</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div>
                                        <div class="font-semibold">${campaign.clicked.toLocaleString()}</div>
                                        <div class="text-xs text-gray-500">${clickRate}%</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="font-semibold text-green-600">€${campaign.revenue.toLocaleString()}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <button class="text-blue-600 hover:text-blue-800">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="text-green-600 hover:text-green-800">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="text-purple-600 hover:text-purple-800">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                        <button class="text-red-600 hover:text-red-800">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            `
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Performance Chart
        const ctx = document.getElementById('performanceChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(campaigns.map(c => c.name))},
                datasets: [
                    {
                        label: 'Geöffnet',
                        data: ${JSON.stringify(campaigns.map(c => ((c.opened / c.sent) * 100).toFixed(1)))},
                        backgroundColor: 'rgba(34, 197, 94, 0.5)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Geklickt',
                        data: ${JSON.stringify(campaigns.map(c => ((c.clicked / c.sent) * 100).toFixed(1)))},
                        backgroundColor: 'rgba(168, 85, 247, 0.5)',
                        borderColor: 'rgba(168, 85, 247, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
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
