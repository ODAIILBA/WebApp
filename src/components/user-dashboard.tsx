export const UserDashboard = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mein Konto - SoftwareKing24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
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
                        <a href="/warenkorb" class="text-gray-700 hover:text-blue-600 relative">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" data-cart-count>0</span>
                        </a>
                        <a href="/konto" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Mein Konto</a>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Breadcrumb -->
        <div class="bg-white border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 py-3">
                <div class="flex items-center text-sm text-gray-600">
                    <a href="/" class="hover:text-blue-600">Home</a>
                    <i class="fas fa-chevron-right mx-2 text-xs"></i>
                    <span class="text-gray-800 font-semibold">Mein Konto</span>
                </div>
            </div>
        </div>

        <!-- Dashboard Content -->
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                        <!-- User Info -->
                        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-user text-blue-600 text-3xl"></i>
                            </div>
                            <h3 class="text-center font-bold text-lg" id="user-name">Laden...</h3>
                            <p class="text-center text-sm text-blue-100" id="user-email">Laden...</p>
                        </div>

                        <!-- Navigation -->
                        <nav class="p-4">
                            <a href="#dashboard" onclick="showSection('dashboard')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition mb-2 dashboard-tab active">
                                <i class="fas fa-th-large mr-3 w-5"></i>Übersicht
                            </a>
                            <a href="#orders" onclick="showSection('orders')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition mb-2 dashboard-tab">
                                <i class="fas fa-shopping-bag mr-3 w-5"></i>Bestellungen
                            </a>
                            <a href="#licenses" onclick="showSection('licenses')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition mb-2 dashboard-tab">
                                <i class="fas fa-key mr-3 w-5"></i>Lizenzschlüssel
                            </a>
                            <a href="#profile" onclick="showSection('profile')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition mb-2 dashboard-tab">
                                <i class="fas fa-user-edit mr-3 w-5"></i>Profil bearbeiten
                            </a>
                            <a href="#password" onclick="showSection('password')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition mb-2 dashboard-tab">
                                <i class="fas fa-lock mr-3 w-5"></i>Passwort ändern
                            </a>
                            <button onclick="logout()" class="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition w-full">
                                <i class="fas fa-sign-out-alt mr-3 w-5"></i>Abmelden
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="lg:col-span-3">
                    
                    <!-- Dashboard Overview -->
                    <div id="dashboard-section" class="dashboard-section">
                        <h1 class="text-3xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-th-large mr-3"></i>Mein Konto
                        </h1>
                        
                        <!-- Stats -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
                                <div class="flex items-center justify-between mb-2">
                                    <i class="fas fa-shopping-bag text-3xl opacity-50"></i>
                                    <span id="total-orders" class="text-3xl font-bold">0</span>
                                </div>
                                <div class="text-blue-100">Gesamtbestellungen</div>
                            </div>
                            <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
                                <div class="flex items-center justify-between mb-2">
                                    <i class="fas fa-key text-3xl opacity-50"></i>
                                    <span id="total-licenses" class="text-3xl font-bold">0</span>
                                </div>
                                <div class="text-purple-100">Aktive Lizenzen</div>
                            </div>
                            <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
                                <div class="flex items-center justify-between mb-2">
                                    <i class="fas fa-euro-sign text-3xl opacity-50"></i>
                                    <span id="total-spent" class="text-3xl font-bold">0</span>
                                </div>
                                <div class="text-green-100">Ausgegeben</div>
                            </div>
                        </div>

                        <!-- Recent Orders -->
                        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                            <h2 class="text-xl font-bold text-gray-800 mb-4">
                                <i class="fas fa-clock mr-2"></i>Letzte Bestellungen
                            </h2>
                            <div id="recent-orders">
                                <p class="text-gray-600 text-center py-8">Keine Bestellungen vorhanden</p>
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <a href="/produkte" class="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl text-white hover:from-blue-600 hover:to-purple-700 transition shadow-lg">
                                <i class="fas fa-shopping-cart text-3xl mb-3"></i>
                                <h3 class="text-xl font-bold mb-2">Weiter einkaufen</h3>
                                <p class="text-blue-100">Entdecken Sie neue Produkte</p>
                            </a>
                            <a href="#licenses" onclick="showSection('licenses')" class="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl text-white hover:from-purple-600 hover:to-pink-700 transition shadow-lg">
                                <i class="fas fa-key text-3xl mb-3"></i>
                                <h3 class="text-xl font-bold mb-2">Meine Lizenzen</h3>
                                <p class="text-purple-100">Verwalten Sie Ihre Lizenzschlüssel</p>
                            </a>
                        </div>
                    </div>

                    <!-- Orders Section -->
                    <div id="orders-section" class="dashboard-section hidden">
                        <h1 class="text-3xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-shopping-bag mr-3"></i>Meine Bestellungen
                        </h1>
                        <div id="orders-list" class="space-y-4">
                            <p class="text-gray-600 text-center py-8">Keine Bestellungen vorhanden</p>
                        </div>
                    </div>

                    <!-- Licenses Section -->
                    <div id="licenses-section" class="dashboard-section hidden">
                        <h1 class="text-3xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-key mr-3"></i>Meine Lizenzschlüssel
                        </h1>
                        <div id="licenses-list" class="space-y-4">
                            <p class="text-gray-600 text-center py-8">Keine Lizenzen vorhanden</p>
                        </div>
                    </div>

                    <!-- Profile Section -->
                    <div id="profile-section" class="dashboard-section hidden">
                        <h1 class="text-3xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-user-edit mr-3"></i>Profil bearbeiten
                        </h1>
                        <div class="bg-white rounded-xl shadow-md p-8">
                            <form id="profile-form" class="space-y-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input type="text" id="profile-name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
                                    <input type="email" id="profile-email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" disabled />
                                </div>
                                <div id="profile-message" class="hidden"></div>
                                <button type="submit" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition">
                                    <i class="fas fa-save mr-2"></i>Änderungen speichern
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- Password Section -->
                    <div id="password-section" class="dashboard-section hidden">
                        <h1 class="text-3xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-lock mr-3"></i>Passwort ändern
                        </h1>
                        <div class="bg-white rounded-xl shadow-md p-8">
                            <form id="password-form" class="space-y-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Aktuelles Passwort</label>
                                    <input type="password" id="current-password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Neues Passwort</label>
                                    <input type="password" id="new-password" required minlength="8" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Neues Passwort bestätigen</label>
                                    <input type="password" id="confirm-password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div id="password-message" class="hidden"></div>
                                <button type="submit" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition">
                                    <i class="fas fa-save mr-2"></i>Passwort ändern
                                </button>
                            </form>
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
            let currentUser = null;

            // Initialize
            document.addEventListener('DOMContentLoaded', async () => {
                await loadUser();
                if (CartManager) CartManager.updateCartCount();
            });

            // Load user data
            async function loadUser() {
                try {
                    const token = localStorage.getItem('authToken');
                    if (!token) {
                        window.location.href = '/login?redirect=/konto';
                        return;
                    }

                    const response = await axios.get('/api/auth/me', {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });

                    if (response.data.success) {
                        currentUser = response.data.user;
                        document.getElementById('user-name').textContent = currentUser.name;
                        document.getElementById('user-email').textContent = currentUser.email;
                        document.getElementById('profile-name').value = currentUser.name;
                        document.getElementById('profile-email').value = currentUser.email;
                        
                        // Load data
                        await Promise.all([
                            loadOrders(),
                            loadLicenses(),
                            loadStats()
                        ]);
                    } else {
                        localStorage.removeItem('authToken');
                        window.location.href = '/login?redirect=/konto';
                    }
                } catch (error) {
                    console.error('Load user error:', error);
                    localStorage.removeItem('authToken');
                    window.location.href = '/login?redirect=/konto';
                }
            }

            // Load orders (mock data for now)
            async function loadOrders() {
                // In production, this would fetch from API
                const mockOrders = [];
                
                const container = document.getElementById('orders-list');
                const recentContainer = document.getElementById('recent-orders');
                
                if (mockOrders.length === 0) {
                    container.innerHTML = '<p class="text-gray-600 text-center py-8">Keine Bestellungen vorhanden</p>';
                    recentContainer.innerHTML = '<p class="text-gray-600 text-center py-8">Keine Bestellungen vorhanden</p>';
                } else {
                    // Render orders
                }
            }

            // Load licenses (mock data for now)
            async function loadLicenses() {
                // In production, this would fetch from API
                const mockLicenses = [];
                
                const container = document.getElementById('licenses-list');
                
                if (mockLicenses.length === 0) {
                    container.innerHTML = '<p class="text-gray-600 text-center py-8">Keine Lizenzen vorhanden</p>';
                }
            }

            // Load stats
            async function loadStats() {
                document.getElementById('total-orders').textContent = '0';
                document.getElementById('total-licenses').textContent = '0';
                document.getElementById('total-spent').textContent = '€0.00';
            }

            // Show section
            function showSection(section) {
                // Hide all sections
                document.querySelectorAll('.dashboard-section').forEach(el => {
                    el.classList.add('hidden');
                });
                
                // Remove active from all tabs
                document.querySelectorAll('.dashboard-tab').forEach(el => {
                    el.classList.remove('active', 'bg-blue-50', 'text-blue-600');
                });
                
                // Show selected section
                document.getElementById(section + '-section').classList.remove('hidden');
                
                // Add active to selected tab
                event.target.closest('.dashboard-tab').classList.add('active', 'bg-blue-50', 'text-blue-600');
            }

            // Logout
            async function logout() {
                try {
                    const token = localStorage.getItem('authToken');
                    await axios.post('/api/auth/logout', {}, {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                }
            }

            // Profile form
            document.getElementById('profile-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                const messageDiv = document.getElementById('profile-message');
                
                try {
                    // In production, this would update via API
                    messageDiv.className = 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg';
                    messageDiv.textContent = 'Profil erfolgreich aktualisiert!';
                    messageDiv.classList.remove('hidden');
                    
                    setTimeout(() => messageDiv.classList.add('hidden'), 3000);
                } catch (error) {
                    messageDiv.className = 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg';
                    messageDiv.textContent = 'Fehler beim Aktualisieren des Profils';
                    messageDiv.classList.remove('hidden');
                }
            });

            // Password form
            document.getElementById('password-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                const messageDiv = document.getElementById('password-message');
                
                const currentPassword = document.getElementById('current-password').value;
                const newPassword = document.getElementById('new-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                
                if (newPassword !== confirmPassword) {
                    messageDiv.className = 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg';
                    messageDiv.textContent = 'Passwörter stimmen nicht überein';
                    messageDiv.classList.remove('hidden');
                    return;
                }
                
                try {
                    const token = localStorage.getItem('authToken');
                    const response = await axios.post('/api/auth/change-password', {
                        currentPassword,
                        newPassword
                    }, {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });
                    
                    if (response.data.success) {
                        messageDiv.className = 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg';
                        messageDiv.textContent = 'Passwort erfolgreich geändert!';
                        messageDiv.classList.remove('hidden');
                        
                        // Clear form
                        e.target.reset();
                        
                        setTimeout(() => messageDiv.classList.add('hidden'), 3000);
                    } else {
                        throw new Error(response.data.error);
                    }
                } catch (error) {
                    messageDiv.className = 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg';
                    messageDiv.textContent = error.response?.data?.error || 'Fehler beim Ändern des Passworts';
                    messageDiv.classList.remove('hidden');
                }
            });
        </script>
    </body>
    </html>
  `;
};
