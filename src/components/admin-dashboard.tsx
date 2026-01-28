export const AdminDashboard = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Dashboard - SoftwareKing24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <body class="bg-gray-100">
        
        <!-- Top Bar -->
        <div class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3">
            <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <img src="/static/logo.png" alt="SoftwareKing24" class="h-8 brightness-0 invert" />
                    <span class="text-sm font-semibold">Admin Panel</span>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-sm" id="admin-name">Admin</span>
                    <a href="/" class="text-sm hover:text-blue-300"><i class="fas fa-home mr-1"></i>Zur Website</a>
                    <button onclick="logout()" class="text-sm hover:text-red-300"><i class="fas fa-sign-out-alt mr-1"></i>Abmelden</button>
                </div>
            </div>
        </div>

        <div class="flex">
            
            <!-- Sidebar -->
            <aside class="w-64 bg-white shadow-lg min-h-screen">
                <nav class="p-4">
                    <a href="/admin" class="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg mb-2 font-semibold">
                        <i class="fas fa-chart-line w-5"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="/admin/orders" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2">
                        <i class="fas fa-shopping-bag w-5"></i>
                        <span>Bestellungen</span>
                        <span class="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full" id="pending-orders">0</span>
                    </a>
                    <a href="/admin/licenses" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2">
                        <i class="fas fa-key w-5"></i>
                        <span>Lizenzen</span>
                    </a>
                    <a href="/admin/customers" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2">
                        <i class="fas fa-users w-5"></i>
                        <span>Kunden</span>
                    </a>
                    <a href="/admin/products" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2">
                        <i class="fas fa-box w-5"></i>
                        <span>Produkte</span>
                    </a>
                    <a href="/admin/settings" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2">
                        <i class="fas fa-cog w-5"></i>
                        <span>Einstellungen</span>
                    </a>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 p-8">
                
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">Dashboard Übersicht</h1>
                    <p class="text-gray-600">Willkommen im Admin-Bereich</p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-shopping-cart text-blue-600 text-xl"></i>
                            </div>
                            <span class="text-xs text-gray-500">Heute</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800 mb-1" id="today-orders">0</h3>
                        <p class="text-sm text-gray-600">Neue Bestellungen</p>
                        <div class="mt-2 flex items-center text-green-600 text-sm">
                            <i class="fas fa-arrow-up mr-1"></i>
                            <span>+12% vs. gestern</span>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-euro-sign text-green-600 text-xl"></i>
                            </div>
                            <span class="text-xs text-gray-500">Heute</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800 mb-1" id="today-revenue">€0</h3>
                        <p class="text-sm text-gray-600">Umsatz</p>
                        <div class="mt-2 flex items-center text-green-600 text-sm">
                            <i class="fas fa-arrow-up mr-1"></i>
                            <span>+8% vs. gestern</span>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-users text-purple-600 text-xl"></i>
                            </div>
                            <span class="text-xs text-gray-500">Gesamt</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800 mb-1" id="total-customers">0</h3>
                        <p class="text-sm text-gray-600">Kunden</p>
                        <div class="mt-2 flex items-center text-blue-600 text-sm">
                            <i class="fas fa-user-plus mr-1"></i>
                            <span>3 neue heute</span>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-key text-yellow-600 text-xl"></i>
                            </div>
                            <span class="text-xs text-gray-500">Gesamt</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800 mb-1" id="total-licenses">0</h3>
                        <p class="text-sm text-gray-600">Ausgegebene Lizenzen</p>
                        <div class="mt-2 flex items-center text-green-600 text-sm">
                            <i class="fas fa-check mr-1"></i>
                            <span>Alle aktiv</span>
                        </div>
                    </div>

                </div>

                <!-- Charts Row -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    
                    <!-- Revenue Chart -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">Umsatz der letzten 7 Tage</h3>
                        <canvas id="revenueChart" height="200"></canvas>
                    </div>

                    <!-- Orders Chart -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">Bestellungen nach Status</h3>
                        <canvas id="ordersChart" height="200"></canvas>
                    </div>

                </div>

                <!-- Recent Orders -->
                <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-bold text-gray-800">
                            <i class="fas fa-shopping-bag text-blue-600 mr-2"></i>Letzte Bestellungen
                        </h2>
                        <a href="/admin/orders" class="text-blue-600 font-semibold hover:underline">
                            Alle ansehen
                        </a>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-gray-50 text-left">
                                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Bestellung</th>
                                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Kunde</th>
                                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Datum</th>
                                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Betrag</th>
                                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Aktionen</th>
                                </tr>
                            </thead>
                            <tbody id="recent-orders-table">
                                <tr>
                                    <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                                        <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                                        <p>Lade Bestellungen...</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Top Products -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold text-gray-800 mb-6">
                        <i class="fas fa-star text-yellow-500 mr-2"></i>Top Produkte
                    </h2>
                    <div id="top-products" class="space-y-4">
                        <div class="text-center py-8 text-gray-500">
                            <i class="fas fa-box text-4xl mb-2 text-gray-300"></i>
                            <p>Keine Daten verfügbar</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>

        <script>
            document.addEventListener('DOMContentLoaded', async () => {
                const token = localStorage.getItem('authToken');
                
                if (!token) {
                    window.location.href = '/login?redirect=/admin';
                    return;
                }

                try {
                    const response = await axios.get('/api/auth/me', {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });

                    if (response.data.success) {
                        const user = response.data.user;
                        
                        // Check if user is admin
                        if (user.role !== 'admin') {
                            alert('Zugriff verweigert. Nur Administratoren haben Zugriff.');
                            window.location.href = '/';
                            return;
                        }

                        document.getElementById('admin-name').textContent = user.name;
                        
                        loadDashboardData();
                        initCharts();
                    } else {
                        throw new Error('Authentication failed');
                    }
                } catch (error) {
                    console.error('Auth error:', error);
                    localStorage.removeItem('authToken');
                    window.location.href = '/login?redirect=/admin';
                }
            });

            async function loadDashboardData() {
                // Sample data - in production, fetch from API
                document.getElementById('today-orders').textContent = '0';
                document.getElementById('today-revenue').textContent = '€0.00';
                document.getElementById('total-customers').textContent = '0';
                document.getElementById('total-licenses').textContent = '0';
                document.getElementById('pending-orders').textContent = '0';

                // Load recent orders
                const ordersTable = document.getElementById('recent-orders-table');
                ordersTable.innerHTML = \`
                    <tr>
                        <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                            <i class="fas fa-inbox text-4xl mb-2 text-gray-300"></i>
                            <p>Keine Bestellungen gefunden</p>
                        </td>
                    </tr>
                \`;
            }

            function initCharts() {
                // Revenue Chart
                const revenueCtx = document.getElementById('revenueChart').getContext('2d');
                new Chart(revenueCtx, {
                    type: 'line',
                    data: {
                        labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                        datasets: [{
                            label: 'Umsatz (€)',
                            data: [0, 0, 0, 0, 0, 0, 0],
                            borderColor: 'rgb(59, 130, 246)',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return '€' + value;
                                    }
                                }
                            }
                        }
                    }
                });

                // Orders Chart
                const ordersCtx = document.getElementById('ordersChart').getContext('2d');
                new Chart(ordersCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Abgeschlossen', 'In Bearbeitung', 'Ausstehend', 'Storniert'],
                        datasets: [{
                            data: [0, 0, 0, 0],
                            backgroundColor: [
                                'rgb(34, 197, 94)',
                                'rgb(59, 130, 246)',
                                'rgb(234, 179, 8)',
                                'rgb(239, 68, 68)'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }

            function logout() {
                if (confirm('Möchten Sie sich wirklich abmelden?')) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                }
            }
        </script>
    </body>
    </html>
  `;
};
