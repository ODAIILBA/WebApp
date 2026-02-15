export const AdminOrders = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bestellungen - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    </head>
    <body class="bg-gray-100">
        
        <!-- Top Bar -->
        <div class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3">
            <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <img src="/static/logo.png" alt="SOFTWAREKING24" class="h-10 brightness-0 invert" />
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
                    <a href="/admin" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2">
                        <i class="fas fa-chart-line w-5"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="/admin/orders" class="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg mb-2 font-semibold">
                        <i class="fas fa-shopping-bag w-5"></i>
                        <span>Bestellungen</span>
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
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 p-8">
                
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">Bestellungen verwalten</h1>
                    <p class="text-gray-600">Alle Bestellungen im Überblick</p>
                </div>

                <!-- Filters -->
                <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Suche</label>
                            <input type="text" id="search-input" placeholder="Bestellung, Kunde..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select id="status-filter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="all">Alle Status</option>
                                <option value="pending">Ausstehend</option>
                                <option value="processing">In Bearbeitung</option>
                                <option value="completed">Abgeschlossen</option>
                                <option value="cancelled">Storniert</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Datum von</label>
                            <input type="date" id="date-from" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Datum bis</label>
                            <input type="date" id="date-to" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div class="mt-4 flex justify-end space-x-2">
                        <button onclick="clearFilters()" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <i class="fas fa-times mr-2"></i>Zurücksetzen
                        </button>
                        <button onclick="applyFilters()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <i class="fas fa-search mr-2"></i>Filter anwenden
                        </button>
                    </div>
                </div>

                <!-- Orders Table -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-gray-50 text-left">
                                    <th class="px-6 py-4 text-sm font-semibold text-gray-700">
                                        <input type="checkbox" class="w-4 h-4" />
                                    </th>
                                    <th class="px-6 py-4 text-sm font-semibold text-gray-700">Bestellung</th>
                                    <th class="px-6 py-4 text-sm font-semibold text-gray-700">Kunde</th>
                                    <th class="px-6 py-4 text-sm font-semibold text-gray-700">Datum</th>
                                    <th class="px-6 py-4 text-sm font-semibold text-gray-700">Produkte</th>
                                    <th class="px-6 py-4 text-sm font-semibold text-gray-700">Betrag</th>
                                    <th class="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                                    <th class="px-6 py-4 text-sm font-semibold text-gray-700">Aktionen</th>
                                </tr>
                            </thead>
                            <tbody id="orders-table">
                                <tr>
                                    <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                                        <i class="fas fa-inbox text-5xl mb-4 text-gray-300"></i>
                                        <p class="text-lg font-semibold mb-2">Keine Bestellungen gefunden</p>
                                        <p class="text-sm">Sobald Kunden Bestellungen aufgeben, werden sie hier angezeigt</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>

        <script>
            document.addEventListener('DOMContentLoaded', async () => {
                const token = localStorage.getItem('authToken');
                
                if (!token) {
                    window.location.href = '/login?redirect=/admin/orders';
                    return;
                }

                try {
                    const response = await axios.get('/api/auth/me', {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });

                    if (response.data.success && response.data.user.role === 'admin') {
                        document.getElementById('admin-name').textContent = response.data.user.name;
                        loadOrders();
                    } else {
                        throw new Error('Access denied');
                    }
                } catch (error) {
                    window.location.href = '/';
                }
            });

            async function loadOrders() {
                // In production, fetch from API
                // For now, show empty state
            }

            function applyFilters() {
                loadOrders();
            }

            function clearFilters() {
                document.getElementById('search-input').value = '';
                document.getElementById('status-filter').value = 'all';
                document.getElementById('date-from').value = '';
                document.getElementById('date-to').value = '';
                loadOrders();
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
