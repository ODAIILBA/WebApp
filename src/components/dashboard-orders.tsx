export const UserOrders = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Meine Bestellungen - SoftwareKing24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    </head>
    <body class="bg-gray-50">
        
        <!-- Header -->
        <header class="bg-white shadow-md sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex items-center justify-between py-4">
                    <a href="/" class="flex items-center space-x-3">
                        <img src="/static/logo.png" alt="SoftwareKing24" class="h-12" />
                    </a>
                    <nav class="flex items-center space-x-6">
                        <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
                        <a href="/produkte" class="text-gray-700 hover:text-blue-600">Produkte</a>
                        <a href="/konto" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <i class="fas fa-user mr-2"></i>Mein Konto
                        </a>
                    </nav>
                </div>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-user text-blue-600 text-3xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-center" id="user-name">Laden...</h3>
                            <p class="text-blue-100 text-sm text-center" id="user-email">Laden...</p>
                        </div>
                        <nav class="p-4">
                            <a href="/konto" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2">
                                <i class="fas fa-home w-5"></i>
                                <span>Dashboard</span>
                            </a>
                            <a href="/konto/bestellungen" class="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg mb-2 font-semibold">
                                <i class="fas fa-shopping-bag w-5"></i>
                                <span>Bestellungen</span>
                            </a>
                            <a href="/konto/lizenzen" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2">
                                <i class="fas fa-key w-5"></i>
                                <span>Meine Lizenzen</span>
                            </a>
                            <a href="/konto/profil" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2">
                                <i class="fas fa-user-cog w-5"></i>
                                <span>Profil bearbeiten</span>
                            </a>
                            <button onclick="logout()" class="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
                                <i class="fas fa-sign-out-alt w-5"></i>
                                <span>Abmelden</span>
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="lg:col-span-3">
                    
                    <div class="bg-white rounded-xl shadow-lg p-8">
                        <h1 class="text-3xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-shopping-bag text-blue-600 mr-3"></i>Meine Bestellungen
                        </h1>

                        <!-- Filter Tabs -->
                        <div class="flex space-x-2 mb-6 border-b">
                            <button onclick="filterOrders('all')" class="px-4 py-2 font-semibold border-b-2 border-blue-600 text-blue-600" id="tab-all">
                                Alle
                            </button>
                            <button onclick="filterOrders('completed')" class="px-4 py-2 font-semibold text-gray-600 hover:text-blue-600" id="tab-completed">
                                Abgeschlossen
                            </button>
                            <button onclick="filterOrders('pending')" class="px-4 py-2 font-semibold text-gray-600 hover:text-blue-600" id="tab-pending">
                                Ausstehend
                            </button>
                        </div>

                        <!-- Orders List -->
                        <div id="orders-list">
                            <div class="text-center py-12">
                                <i class="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
                                <p class="text-gray-600">Bestellungen werden geladen...</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-8 mt-12">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <p class="text-gray-400">&copy; 2026 SoftwareKing24. Alle Rechte vorbehalten.</p>
            </div>
        </footer>

        <script>
            let currentFilter = 'all';
            let allOrders = [];

            document.addEventListener('DOMContentLoaded', async () => {
                const token = localStorage.getItem('authToken');
                
                if (!token) {
                    window.location.href = '/login?redirect=/konto/bestellungen';
                    return;
                }

                try {
                    const response = await axios.get('/api/auth/me', {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });

                    if (response.data.success) {
                        const user = response.data.user;
                        document.getElementById('user-name').textContent = user.name;
                        document.getElementById('user-email').textContent = user.email;
                        
                        loadOrders();
                    } else {
                        throw new Error('Authentication failed');
                    }
                } catch (error) {
                    console.error('Auth error:', error);
                    localStorage.removeItem('authToken');
                    window.location.href = '/login?redirect=/konto/bestellungen';
                }
            });

            async function loadOrders() {
                try {
                    // In production, this would fetch from API
                    // For now, show empty state
                    allOrders = [];
                    
                    renderOrders();
                } catch (error) {
                    console.error('Error loading orders:', error);
                    document.getElementById('orders-list').innerHTML = \`
                        <div class="text-center py-12">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                            <p class="text-gray-600">Fehler beim Laden der Bestellungen</p>
                        </div>
                    \`;
                }
            }

            function renderOrders() {
                const container = document.getElementById('orders-list');
                
                let filteredOrders = allOrders;
                if (currentFilter !== 'all') {
                    filteredOrders = allOrders.filter(o => o.status === currentFilter);
                }

                if (filteredOrders.length === 0) {
                    container.innerHTML = \`
                        <div class="text-center py-12">
                            <i class="fas fa-shopping-bag text-6xl text-gray-300 mb-4"></i>
                            <h3 class="text-xl font-bold text-gray-800 mb-2">Keine Bestellungen gefunden</h3>
                            <p class="text-gray-600 mb-6">Sie haben noch keine Bestellungen aufgegeben</p>
                            <a href="/produkte" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                <i class="fas fa-shopping-cart mr-2"></i>Jetzt einkaufen
                            </a>
                        </div>
                    \`;
                    return;
                }

                container.innerHTML = filteredOrders.map(order => \`
                    <div class="border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-lg transition">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-bold text-lg text-gray-800">Bestellung #\${order.orderNumber}</h3>
                                <p class="text-sm text-gray-600">\${new Date(order.date).toLocaleDateString('de-DE')}</p>
                            </div>
                            <div class="text-right">
                                <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold \${getStatusClass(order.status)}">
                                    \${getStatusText(order.status)}
                                </span>
                                <div class="text-xl font-bold text-gray-800 mt-2">€\${order.total.toFixed(2)}</div>
                            </div>
                        </div>
                        
                        <div class="border-t border-gray-200 pt-4 mt-4">
                            <div class="space-y-2">
                                \${order.items.map(item => \`
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-700">\${item.name} × \${item.quantity}</span>
                                        <span class="text-gray-600">€\${item.price.toFixed(2)}</span>
                                    </div>
                                \`).join('')}
                            </div>
                        </div>

                        <div class="flex space-x-3 mt-4">
                            <a href="/konto/bestellung/\${order.id}" class="flex-1 bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                <i class="fas fa-eye mr-2"></i>Details ansehen
                            </a>
                            <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                                <i class="fas fa-download mr-2"></i>Rechnung
                            </button>
                        </div>
                    </div>
                \`).join('');
            }

            function filterOrders(filter) {
                currentFilter = filter;
                
                // Update tabs
                ['all', 'completed', 'pending'].forEach(f => {
                    const tab = document.getElementById(\`tab-\${f}\`);
                    if (f === filter) {
                        tab.classList.add('border-b-2', 'border-blue-600', 'text-blue-600');
                        tab.classList.remove('text-gray-600');
                    } else {
                        tab.classList.remove('border-b-2', 'border-blue-600', 'text-blue-600');
                        tab.classList.add('text-gray-600');
                    }
                });

                renderOrders();
            }

            function getStatusClass(status) {
                const classes = {
                    'completed': 'bg-green-100 text-green-800',
                    'pending': 'bg-yellow-100 text-yellow-800',
                    'processing': 'bg-blue-100 text-blue-800',
                    'cancelled': 'bg-red-100 text-red-800'
                };
                return classes[status] || 'bg-gray-100 text-gray-800';
            }

            function getStatusText(status) {
                const texts = {
                    'completed': 'Abgeschlossen',
                    'pending': 'Ausstehend',
                    'processing': 'In Bearbeitung',
                    'cancelled': 'Storniert'
                };
                return texts[status] || status;
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
