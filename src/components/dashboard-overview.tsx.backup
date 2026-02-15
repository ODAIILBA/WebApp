export const UserDashboard = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mein Konto - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
        <style>
            .dashboard-card {
                transition: all 0.3s ease;
            }
            .dashboard-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
        </style>
    </head>
    <body class="bg-gray-50">
        
        <!-- Header -->
        <header class="bg-white shadow-md sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex items-center justify-between py-4">
                    <a href="/" class="flex items-center space-x-3">
                        <img src="/static/logo.png" alt="SOFTWAREKING24" class="h-16" />
                    </a>
                    <nav class="flex items-center space-x-6">
                        <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
                        <a href="/produkte" class="text-gray-700 hover:text-blue-600">Produkte</a>
                        <a href="/warenkorb" class="text-gray-700 hover:text-blue-600 relative">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" data-cart-count>0</span>
                        </a>
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
                            <a href="/konto" class="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg mb-2 font-semibold">
                                <i class="fas fa-home w-5"></i>
                                <span>Dashboard</span>
                            </a>
                            <a href="/konto/bestellungen" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2">
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
                    
                    <!-- Welcome Banner -->
                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
                        <h1 class="text-3xl font-bold mb-2">Willkommen zurück!</h1>
                        <p class="text-blue-100">Verwalten Sie Ihre Bestellungen, Lizenzen und Kontoeinstellungen</p>
                    </div>

                    <!-- Stats Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div class="dashboard-card bg-white rounded-xl shadow-lg p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-shopping-bag text-blue-600 text-xl"></i>
                                </div>
                                <span class="text-3xl font-bold text-gray-800" id="total-orders">0</span>
                            </div>
                            <h3 class="text-gray-600 font-semibold">Gesamt Bestellungen</h3>
                            <a href="/konto/bestellungen" class="text-blue-600 text-sm hover:underline mt-2 inline-block">
                                Alle ansehen <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>

                        <div class="dashboard-card bg-white rounded-xl shadow-lg p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-key text-green-600 text-xl"></i>
                                </div>
                                <span class="text-3xl font-bold text-gray-800" id="total-licenses">0</span>
                            </div>
                            <h3 class="text-gray-600 font-semibold">Aktive Lizenzen</h3>
                            <a href="/konto/lizenzen" class="text-blue-600 text-sm hover:underline mt-2 inline-block">
                                Alle ansehen <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>

                        <div class="dashboard-card bg-white rounded-xl shadow-lg p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-euro-sign text-purple-600 text-xl"></i>
                                </div>
                                <span class="text-3xl font-bold text-gray-800" id="total-spent">€0</span>
                            </div>
                            <h3 class="text-gray-600 font-semibold">Gesamt ausgegeben</h3>
                            <p class="text-gray-500 text-sm mt-2">Lebenszeitwert</p>
                        </div>
                    </div>

                    <!-- Recent Orders -->
                    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-800">
                                <i class="fas fa-shopping-bag text-blue-600 mr-2"></i>Letzte Bestellungen
                            </h2>
                            <a href="/konto/bestellungen" class="text-blue-600 font-semibold hover:underline">
                                Alle ansehen
                            </a>
                        </div>
                        <div id="recent-orders">
                            <div class="text-center py-8 text-gray-500">
                                <i class="fas fa-shopping-bag text-4xl mb-3 text-gray-300"></i>
                                <p>Keine Bestellungen gefunden</p>
                                <a href="/produkte" class="text-blue-600 hover:underline mt-2 inline-block">
                                    Jetzt einkaufen
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a href="/produkte" class="dashboard-card bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:from-blue-600 hover:to-blue-700">
                            <i class="fas fa-shopping-cart text-3xl mb-3"></i>
                            <h3 class="text-xl font-bold mb-2">Weiter einkaufen</h3>
                            <p class="text-blue-100">Entdecken Sie unsere neuesten Produkte</p>
                        </a>

                        <a href="/support" class="dashboard-card bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:from-purple-600 hover:to-purple-700">
                            <i class="fas fa-headset text-3xl mb-3"></i>
                            <h3 class="text-xl font-bold mb-2">Support kontaktieren</h3>
                            <p class="text-purple-100">Wir helfen Ihnen gerne weiter</p>
                        </a>
                    </div>

                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-8 mt-12">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <p class="text-gray-400">&copy; 2026 SOFTWAREKING24. Alle Rechte vorbehalten.</p>
            </div>
        </footer>

        <script>
            // Check authentication
            document.addEventListener('DOMContentLoaded', async () => {
                const token = localStorage.getItem('authToken');
                
                if (!token) {
                    window.location.href = '/login?redirect=/konto';
                    return;
                }

                try {
                    // Get user info
                    const response = await axios.get('/api/auth/me', {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });

                    if (response.data.success) {
                        const user = response.data.user;
                        document.getElementById('user-name').textContent = user.name;
                        document.getElementById('user-email').textContent = user.email;
                        
                        // Load dashboard data
                        loadDashboardData();
                    } else {
                        throw new Error('Authentication failed');
                    }
                } catch (error) {
                    console.error('Auth error:', error);
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login?redirect=/konto';
                }

                // Update cart count
                if (typeof CartManager !== 'undefined') {
                    CartManager.updateCartCount();
                }
            });

            async function loadDashboardData() {
                try {
                    const token = localStorage.getItem('authToken');
                    
                    // For now, show sample data
                    // In production, this would fetch from API
                    document.getElementById('total-orders').textContent = '0';
                    document.getElementById('total-licenses').textContent = '0';
                    document.getElementById('total-spent').textContent = '€0.00';
                    
                    // Load recent orders (placeholder)
                    const ordersContainer = document.getElementById('recent-orders');
                    ordersContainer.innerHTML = \`
                        <div class="text-center py-8 text-gray-500">
                            <i class="fas fa-shopping-bag text-4xl mb-3 text-gray-300"></i>
                            <p>Keine Bestellungen gefunden</p>
                            <a href="/produkte" class="text-blue-600 hover:underline mt-2 inline-block">
                                Jetzt einkaufen <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    \`;
                } catch (error) {
                    console.error('Error loading dashboard data:', error);
                }
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
