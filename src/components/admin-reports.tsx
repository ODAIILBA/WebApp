import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminReports() {
  const sidebar = AdminSidebarAdvanced('/admin/reports')

  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reports - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-50">
    ${sidebar}
    
    <div style="margin-left: 280px; padding: 2rem;">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                    <i class="fas fa-chart-line mr-3 text-blue-600"></i>
                    Berichte & Analytics
                </h1>
                <p class="text-gray-600">Verkaufs- und Umsatzberichte</p>
            </div>
            <div class="flex space-x-2">
                <select id="rangeSelect" onchange="changeRange()" class="px-4 py-2 border rounded-lg">
                    <option value="today">Heute</option>
                    <option value="week">Letzte 7 Tage</option>
                    <option value="month" selected>Letzte 30 Tage</option>
                    <option value="year">Letztes Jahr</option>
                </select>
                <button onclick="exportReports()" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    <i class="fas fa-download mr-2"></i>Exportieren
                </button>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" id="statsCards">
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>

        <!-- Charts Row 1 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">Umsatz im Zeitverlauf</h3>
                <canvas id="revenueChart" height="250"></canvas>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">Verkäufe nach Kategorie</h3>
                <canvas id="categoryChart" height="250"></canvas>
            </div>
        </div>

        <!-- Charts Row 2 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">Bestellstatus</h3>
                <canvas id="statusChart" height="250"></canvas>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">Top Produkte</h3>
                <div id="topProductsList" class="space-y-2">
                    <div class="animate-pulse h-8 bg-gray-200 rounded"></div>
                    <div class="animate-pulse h-8 bg-gray-200 rounded"></div>
                    <div class="animate-pulse h-8 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>

        <!-- Top Customers -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">Top Kunden</h3>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kunde</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-Mail</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bestellungen</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gesamtumsatz</th>
                        </tr>
                    </thead>
                    <tbody id="topCustomersTable" class="divide-y divide-gray-200">
                        <tr>
                            <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                                <i class="fas fa-spinner fa-spin mr-2"></i>Lädt...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        let currentRange = 'month';
        let dashboardStats = null;
        let revenueChart = null;
        let categoryChart = null;
        let statusChart = null;

        // Load all data
        async function loadData() {
            try {
                await Promise.all([
                    loadDashboardStats(),
                    loadRevenueTimeline(),
                    loadSalesByCategory(),
                    loadTopProducts(),
                    loadOrderStatus(),
                    loadCustomerStats()
                ]);
            } catch (error) {
                console.error('Error loading data:', error);
                showToast('Fehler beim Laden der Daten', 'error');
            }
        }

        // Load dashboard stats
        async function loadDashboardStats() {
            try {
                const response = await axios.get(\`/api/reports/dashboard?range=\${currentRange}\`);
                if (response.data.success) {
                    dashboardStats = response.data.stats;
                    renderDashboardStats();
                }
            } catch (error) {
                console.error('Error loading dashboard stats:', error);
            }
        }

        // Render dashboard stats
        function renderDashboardStats() {
            if (!dashboardStats) return;

            const changeColor = dashboardStats.revenue_change >= 0 ? 'text-green-600' : 'text-red-600';
            const changeIcon = dashboardStats.revenue_change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';

            document.getElementById('statsCards').innerHTML = \`
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Gesamtumsatz</p>
                        <i class="fas fa-euro-sign text-2xl text-green-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-green-600">€\${(dashboardStats.total_revenue || 0).toFixed(2)}</p>
                    <p class="text-sm \${changeColor} mt-2">
                        <i class="fas \${changeIcon} mr-1"></i>\${Math.abs(dashboardStats.revenue_change)}%
                    </p>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Bestellungen</p>
                        <i class="fas fa-shopping-cart text-2xl text-blue-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-blue-600">\${dashboardStats.total_orders || 0}</p>
                    <p class="text-sm text-gray-500 mt-2">Gesamt Bestellungen</p>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Verkaufte Produkte</p>
                        <i class="fas fa-box text-2xl text-yellow-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-yellow-600">\${dashboardStats.products_sold || 0}</p>
                    <p class="text-sm text-gray-500 mt-2">Stück verkauft</p>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Neue Kunden</p>
                        <i class="fas fa-users text-2xl text-purple-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-purple-600">\${dashboardStats.new_customers || 0}</p>
                    <p class="text-sm text-gray-500 mt-2">Neukunden</p>
                </div>
            \`;
        }

        // Load revenue timeline
        async function loadRevenueTimeline() {
            try {
                const response = await axios.get(\`/api/reports/revenue-timeline?range=\${currentRange}\`);
                if (response.data.success) {
                    renderRevenueChart(response.data.data);
                }
            } catch (error) {
                console.error('Error loading revenue timeline:', error);
            }
        }

        // Render revenue chart
        function renderRevenueChart(data) {
            if (revenueChart) revenueChart.destroy();

            const ctx = document.getElementById('revenueChart').getContext('2d');
            revenueChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(d => d.date),
                    datasets: [{
                        label: 'Umsatz (€)',
                        data: data.map(d => d.revenue),
                        borderColor: 'rgb(34, 197, 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { display: true }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '€' + value.toFixed(2);
                                }
                            }
                        }
                    }
                }
            });
        }

        // Load sales by category
        async function loadSalesByCategory() {
            try {
                const response = await axios.get(\`/api/reports/sales-by-category?range=\${currentRange}\`);
                if (response.data.success) {
                    renderCategoryChart(response.data.data);
                }
            } catch (error) {
                console.error('Error loading sales by category:', error);
            }
        }

        // Render category chart
        function renderCategoryChart(data) {
            if (categoryChart) categoryChart.destroy();

            const ctx = document.getElementById('categoryChart').getContext('2d');
            categoryChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: data.map(d => d.category || 'Unbekannt'),
                    datasets: [{
                        data: data.map(d => d.revenue),
                        backgroundColor: [
                            'rgb(59, 130, 246)',
                            'rgb(34, 197, 94)',
                            'rgb(234, 179, 8)',
                            'rgb(168, 85, 247)',
                            'rgb(239, 68, 68)',
                            'rgb(20, 184, 166)',
                            'rgb(249, 115, 22)',
                            'rgb(236, 72, 153)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { position: 'right' }
                    }
                }
            });
        }

        // Load top products
        async function loadTopProducts() {
            try {
                const response = await axios.get(\`/api/reports/top-products?range=\${currentRange}&limit=5\`);
                if (response.data.success) {
                    renderTopProducts(response.data.data);
                }
            } catch (error) {
                console.error('Error loading top products:', error);
            }
        }

        // Render top products
        function renderTopProducts(data) {
            const container = document.getElementById('topProductsList');
            
            if (data.length === 0) {
                container.innerHTML = '<p class="text-gray-500">Keine Daten verfügbar</p>';
                return;
            }

            container.innerHTML = data.map((product, index) => \`
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <span class="text-2xl font-bold text-gray-400">\${index + 1}</span>
                        <div>
                            <p class="font-semibold text-gray-800">\${product.name}</p>
                            <p class="text-sm text-gray-500">\${product.quantity_sold} verkauft</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-green-600">€\${product.revenue.toFixed(2)}</p>
                        <p class="text-xs text-gray-500">\${product.orders_count} Bestellungen</p>
                    </div>
                </div>
            \`).join('');
        }

        // Load order status
        async function loadOrderStatus() {
            try {
                const response = await axios.get(\`/api/reports/order-status?range=\${currentRange}\`);
                if (response.data.success) {
                    renderStatusChart(response.data.data);
                }
            } catch (error) {
                console.error('Error loading order status:', error);
            }
        }

        // Render status chart
        function renderStatusChart(data) {
            if (statusChart) statusChart.destroy();

            const ctx = document.getElementById('statusChart').getContext('2d');
            statusChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(d => d.status),
                    datasets: [{
                        label: 'Anzahl Bestellungen',
                        data: data.map(d => d.count),
                        backgroundColor: 'rgb(59, 130, 246)'
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
        }

        // Load customer stats
        async function loadCustomerStats() {
            try {
                const response = await axios.get(\`/api/reports/customers?range=\${currentRange}\`);
                if (response.data.success) {
                    renderTopCustomers(response.data.data.top_customers);
                }
            } catch (error) {
                console.error('Error loading customer stats:', error);
            }
        }

        // Render top customers
        function renderTopCustomers(customers) {
            const table = document.getElementById('topCustomersTable');
            
            if (customers.length === 0) {
                table.innerHTML = \`
                    <tr><td colspan="4" class="px-6 py-4 text-center text-gray-500">
                        Keine Daten verfügbar
                    </td></tr>
                \`;
                return;
            }

            table.innerHTML = customers.map(customer => \`
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                        <div class="font-semibold text-gray-800">\${customer.customer_name || 'N/A'}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-600">\${customer.customer_email}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-semibold">\${customer.order_count}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-bold text-green-600">€\${customer.total_spent.toFixed(2)}</div>
                    </td>
                </tr>
            \`).join('');
        }

        // Change range
        function changeRange() {
            currentRange = document.getElementById('rangeSelect').value;
            loadData();
        }

        // Export reports
        async function exportReports() {
            try {
                const response = await axios.get(\`/api/reports/export?range=\${currentRange}&format=csv\`, {
                    responseType: 'blob'
                });
                
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', \`reports-\${currentRange}-\${new Date().toISOString().split('T')[0]}.csv\`);
                document.body.appendChild(link);
                link.click();
                link.remove();
                
                showToast('Report exportiert', 'success');
            } catch (error) {
                console.error('Error exporting reports:', error);
                showToast('Fehler beim Exportieren', 'error');
            }
        }

        // Toast notification
        function showToast(message, type = 'info') {
            const colors = {
                success: 'bg-green-500',
                error: 'bg-red-500',
                info: 'bg-blue-500'
            };
            
            const toast = document.createElement('div');
            toast.className = \`fixed bottom-4 right-4 \${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50\`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => toast.remove(), 3000);
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            loadData();
        });
    </script>
</body>
</html>`;
}
