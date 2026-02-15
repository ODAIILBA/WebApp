import { Hono } from 'hono'

/**
 * User Dashboard Page - SoftwareKing24 Theme
 * Navy & Gold color scheme matching the store
 */
export function DashboardPage() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mein Konto - SOFTWAREKING24</title>
  <meta name="description" content="Verwalten Sie Ihr Konto, Bestellungen und Lizenzen bei SOFTWAREKING24">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  
  <!-- Axios -->
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>

  <style>
    :root {
      --navy-dark: #1a2a4e;
      --navy-medium: #2d3e6f;
      --navy-light: #435991;
      --gold: #d4af37;
      --gold-light: #e8c966;
    }

    .dashboard-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .dashboard-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(26, 42, 78, 0.15);
    }
    
    .stat-card {
      background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy-medium) 100%);
      transition: transform 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
    }
    
    .btn-navy {
      background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy-medium) 100%);
      color: white;
      transition: all 0.3s ease;
    }
    
    .btn-navy:hover {
      opacity: 0.9;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
    }
    
    .btn-gold {
      background: var(--gold);
      color: var(--navy-dark);
      transition: all 0.3s ease;
    }
    
    .btn-gold:hover {
      background: var(--gold-light);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
    }
    
    .text-navy { color: var(--navy-dark); }
    .text-gold { color: var(--gold); }
    .border-gold { border-color: var(--gold); }
    
    .order-item {
      border-left: 4px solid var(--gold);
      transition: all 0.2s ease;
    }
    
    .order-item:hover {
      border-left-color: var(--gold-light);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .license-card {
      border: 2px solid #e5e7eb;
      transition: all 0.3s ease;
    }
    
    .license-card:hover {
      border-color: var(--gold);
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
    }

    /* Modal styles */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      align-items: center;
      justify-content: center;
    }
    
    .modal.active {
      display: flex;
    }
    
    .modal-content {
      background: white;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</head>
<body class="bg-gray-50">

  <!-- Navigation -->
  <nav class="bg-white shadow-lg sticky top-0 z-40">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <a href="/" class="text-2xl font-bold flex items-center">
          <i class="fas fa-shopping-cart mr-2 text-gold"></i>
          <span class="text-navy">SOFTWAREKING24</span>
        </a>
        
        <div class="flex items-center space-x-6">
          <a href="/" class="text-gray-700 hover:text-gold transition-colors">
            <i class="fas fa-home mr-1"></i> Home
          </a>
          <a href="/produkte" class="text-gray-700 hover:text-gold transition-colors">
            <i class="fas fa-box mr-1"></i> Produkte
          </a>
          <a href="/warenkorb" class="text-gray-700 hover:text-gold transition-colors">
            <i class="fas fa-shopping-cart mr-1"></i> Warenkorb
          </a>
          <button onclick="handleLogout()" class="text-red-600 hover:text-red-700 transition-colors">
            <i class="fas fa-sign-out-alt mr-1"></i> Abmelden
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Dashboard Container -->
  <div class="container mx-auto px-4 py-8">
    
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-navy mb-2">
        <i class="fas fa-user-circle mr-3 text-gold"></i> Mein Konto
      </h1>
      <p class="text-gray-600 text-lg">Willkommen zurück, <span id="user-name" class="font-semibold text-navy"></span>!</p>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="stat-card text-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white text-opacity-80 text-sm mb-1">Bestellungen</p>
            <p class="text-4xl font-bold" id="total-orders">0</p>
          </div>
          <i class="fas fa-shopping-bag text-5xl opacity-30"></i>
        </div>
      </div>

      <div class="stat-card text-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white text-opacity-80 text-sm mb-1">Aktive Lizenzen</p>
            <p class="text-4xl font-bold" id="total-licenses">0</p>
          </div>
          <i class="fas fa-key text-5xl opacity-30"></i>
        </div>
      </div>

      <div class="stat-card text-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white text-opacity-80 text-sm mb-1">Gesamtausgaben</p>
            <p class="text-4xl font-bold" id="total-spent">€0</p>
          </div>
          <i class="fas fa-euro-sign text-5xl opacity-30"></i>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Left Column: Profile & Settings -->
      <div class="lg:col-span-1 space-y-6">
        
        <!-- Profile Card -->
        <div class="bg-white rounded-lg shadow-md p-6 dashboard-card border-t-4 border-gold">
          <h2 class="text-2xl font-bold mb-6 flex items-center text-navy">
            <i class="fas fa-user mr-3 text-gold"></i>
            Profil
          </h2>
          
          <div class="space-y-4">
            <div>
              <label class="text-sm text-gray-500 uppercase tracking-wide">Name</label>
              <p class="font-semibold text-lg text-navy" id="profile-name">-</p>
            </div>
            
            <div>
              <label class="text-sm text-gray-500 uppercase tracking-wide">E-Mail</label>
              <p class="font-semibold text-navy" id="profile-email">-</p>
            </div>
            
            <div>
              <label class="text-sm text-gray-500 uppercase tracking-wide">Mitglied seit</label>
              <p class="font-semibold text-navy" id="profile-since">-</p>
            </div>
          </div>

          <button onclick="showEditProfile()" class="mt-6 w-full btn-navy py-3 rounded-lg font-semibold">
            <i class="fas fa-edit mr-2"></i> Profil bearbeiten
          </button>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-md p-6 dashboard-card">
          <h2 class="text-xl font-bold mb-6 flex items-center text-navy">
            <i class="fas fa-bolt mr-3 text-gold"></i>
            Schnellzugriff
          </h2>
          
          <div class="space-y-3">
            <a href="/produkte" class="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
              <i class="fas fa-shopping-cart mr-3 text-navy"></i> Produkte durchsuchen
            </a>
            <button onclick="showChangePassword()" class="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
              <i class="fas fa-lock mr-3 text-gold"></i> Passwort ändern
            </button>
            <a href="/warenkorb" class="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
              <i class="fas fa-shopping-cart mr-3 text-navy"></i> Warenkorb ansehen
            </a>
            <button onclick="showDeleteAccount()" class="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg transition-all text-red-600">
              <i class="fas fa-trash mr-3"></i> Konto löschen
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column: Orders & Licenses -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Recent Orders -->
        <div class="bg-white rounded-lg shadow-md p-6 dashboard-card">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold flex items-center text-navy">
              <i class="fas fa-history mr-3 text-gold"></i>
              Letzte Bestellungen
            </h2>
            <button onclick="loadAllOrders()" class="text-gold hover:text-gold-light font-semibold">
              Alle anzeigen →
            </button>
          </div>

          <div id="orders-list">
            <div class="text-center py-12 text-gray-500">
              <i class="fas fa-spinner fa-spin text-4xl mb-3 text-gold"></i>
              <p>Bestellungen werden geladen...</p>
            </div>
          </div>
        </div>

        <!-- Active Licenses -->
        <div class="bg-white rounded-lg shadow-md p-6 dashboard-card">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold flex items-center text-navy">
              <i class="fas fa-key mr-3 text-gold"></i>
              Meine Lizenzen
            </h2>
            <button onclick="refreshLicenses()" class="text-navy hover:text-gold">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>

          <div id="licenses-list">
            <div class="text-center py-12 text-gray-500">
              <i class="fas fa-spinner fa-spin text-4xl mb-3 text-gold"></i>
              <p>Lizenzen werden geladen...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Profile Modal -->
  <div id="edit-profile-modal" class="modal">
    <div class="modal-content">
      <div class="p-6 border-b border-t-4 border-gold">
        <h3 class="text-2xl font-bold text-navy">Profil bearbeiten</h3>
      </div>
      <form id="edit-profile-form" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-semibold text-navy mb-2">Vorname</label>
          <input type="text" id="edit-first-name" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold" required>
        </div>
        <div>
          <label class="block text-sm font-semibold text-navy mb-2">Nachname</label>
          <input type="text" id="edit-last-name" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold" required>
        </div>
        <div>
          <label class="block text-sm font-semibold text-navy mb-2">E-Mail</label>
          <input type="email" id="edit-email" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold" required disabled>
          <p class="text-xs text-gray-500 mt-1">E-Mail kann nicht geändert werden</p>
        </div>
        <div class="flex gap-3 pt-4">
          <button type="submit" class="flex-1 btn-navy py-3 rounded-lg font-semibold">
            <i class="fas fa-save mr-2"></i> Speichern
          </button>
          <button type="button" onclick="closeModal('edit-profile-modal')" class="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-semibold text-navy">
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Change Password Modal -->
  <div id="change-password-modal" class="modal">
    <div class="modal-content">
      <div class="p-6 border-b border-t-4 border-gold">
        <h3 class="text-2xl font-bold text-navy">Passwort ändern</h3>
      </div>
      <form id="change-password-form" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-semibold text-navy mb-2">Aktuelles Passwort</label>
          <input type="password" id="current-password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold" required>
        </div>
        <div>
          <label class="block text-sm font-semibold text-navy mb-2">Neues Passwort</label>
          <input type="password" id="new-password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold" required minlength="8">
          <p class="text-xs text-gray-500 mt-1">Mindestens 8 Zeichen</p>
        </div>
        <div>
          <label class="block text-sm font-semibold text-navy mb-2">Passwort bestätigen</label>
          <input type="password" id="confirm-password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold" required>
        </div>
        <div id="password-error" class="text-red-600 text-sm hidden"></div>
        <div class="flex gap-3 pt-4">
          <button type="submit" class="flex-1 btn-navy py-3 rounded-lg font-semibold">
            <i class="fas fa-lock mr-2"></i> Passwort ändern
          </button>
          <button type="button" onclick="closeModal('change-password-modal')" class="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-semibold text-navy">
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Delete Account Modal -->
  <div id="delete-account-modal" class="modal">
    <div class="modal-content">
      <div class="p-6 border-b border-t-4 border-red-600">
        <h3 class="text-2xl font-bold text-red-600">Konto löschen</h3>
      </div>
      <div class="p-6">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p class="text-red-800 font-semibold mb-2">
            <i class="fas fa-exclamation-triangle mr-2"></i> Warnung!
          </p>
          <p class="text-red-700 text-sm">
            Diese Aktion kann nicht rückgängig gemacht werden. Alle Ihre Daten, Bestellungen und Lizenzen werden permanent gelöscht.
          </p>
        </div>
        <form id="delete-account-form" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-navy mb-2">Passwort zur Bestätigung</label>
            <input type="password" id="delete-password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" required>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="delete-confirm" class="mr-2" required>
            <label for="delete-confirm" class="text-sm">Ich bestätige, dass ich mein Konto löschen möchte</label>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="submit" class="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">
              <i class="fas fa-trash mr-2"></i> Konto endgültig löschen
            </button>
            <button type="button" onclick="closeModal('delete-account-modal')" class="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-semibold text-navy">
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Order Details Modal -->
  <div id="order-details-modal" class="modal">
    <div class="modal-content">
      <div class="p-6 border-b border-t-4 border-gold">
        <h3 class="text-2xl font-bold text-navy">Bestelldetails</h3>
      </div>
      <div id="order-details-content" class="p-6">
        <!-- Order details will be loaded here -->
      </div>
      <div class="p-6 border-t">
        <button onclick="closeModal('order-details-modal')" class="w-full btn-navy py-3 rounded-lg font-semibold">
          Schließen
        </button>
      </div>
    </div>
  </div>

  <!-- Dashboard JavaScript -->
  <script>
    // Configuration
    const API_BASE = '';
    
    // Get auth token
    function getAuthToken() {
      return localStorage.getItem('auth_token');
    }
    
    // API helper
    async function apiCall(endpoint, options = {}) {
      const token = getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers
      };
      
      if (token) {
        headers['Authorization'] = \`Bearer \${token}\`;
      }
      
      try {
        const response = await axios({
          url: \`\${API_BASE}\${endpoint}\`,
          method: options.method || 'GET',
          headers,
          data: options.data
        });
        return response.data;
      } catch (error) {
        console.error('API Error:', error);
        if (error.response?.status === 401) {
          // Token expired, redirect to login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('token_expires_at');
          window.location.href = '/login';
        }
        throw error;
      }
    }
    
    // Load user dashboard data
    async function loadDashboard() {
      try {
        // Check if user is logged in
        if (!getAuthToken()) {
          window.location.href = '/login';
          return;
        }
        
        // Load user profile
        const userData = await apiCall('/api/auth/me');
        if (userData.success && userData.data) {
          const user = userData.data.user;
          document.getElementById('user-name').textContent = \`\${user.first_name} \${user.last_name}\`;
          document.getElementById('profile-name').textContent = \`\${user.first_name} \${user.last_name}\`;
          document.getElementById('profile-email').textContent = user.email;
          document.getElementById('profile-since').textContent = new Date(user.created_at).toLocaleDateString('de-DE');
          
          // Set form values
          document.getElementById('edit-first-name').value = user.first_name;
          document.getElementById('edit-last-name').value = user.last_name;
          document.getElementById('edit-email').value = user.email;
        }
        
        // Load orders
        await loadOrders();
        
        // Load licenses
        await loadLicenses();
        
      } catch (error) {
        console.error('Dashboard load error:', error);
        showNotification('Fehler beim Laden der Daten', 'error');
      }
    }
    
    // Load orders
    async function loadOrders() {
      try {
        const ordersData = await apiCall('/api/orders');
        
        const ordersList = document.getElementById('orders-list');
        
        if (ordersData.success && ordersData.data && ordersData.data.length > 0) {
          const orders = ordersData.data.slice(0, 5); // Show last 5
          
          // Update stats
          document.getElementById('total-orders').textContent = ordersData.data.length;
          
          // Calculate total spent
          const totalSpent = ordersData.data.reduce((sum, order) => sum + (order.total_amount || 0), 0);
          document.getElementById('total-spent').textContent = formatPrice(totalSpent);
          
          ordersList.innerHTML = orders.map(order => \`
            <div class="order-item bg-gray-50 p-4 rounded-lg mb-3 cursor-pointer hover:bg-gray-100" onclick="showOrderDetails('\${order.id}')">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="font-semibold text-navy">Bestellung #\${order.order_number || order.id}</p>
                  <p class="text-sm text-gray-600">\${new Date(order.created_at).toLocaleDateString('de-DE')}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold \${getOrderStatusClass(order.status)}">
                  \${getOrderStatusText(order.status)}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-gray-700">\${order.items_count || 0} Artikel</p>
                <p class="font-bold text-navy">\${formatPrice(order.total_amount)}</p>
              </div>
            </div>
          \`).join('');
        } else {
          ordersList.innerHTML = \`
            <div class="text-center py-12 text-gray-500">
              <i class="fas fa-shopping-bag text-5xl mb-4 text-gray-300"></i>
              <p class="font-semibold mb-2">Noch keine Bestellungen</p>
              <a href="/produkte" class="btn-gold px-6 py-2 rounded-lg inline-block mt-4">
                <i class="fas fa-shopping-cart mr-2"></i> Jetzt einkaufen
              </a>
            </div>
          \`;
        }
      } catch (error) {
        console.error('Orders load error:', error);
        document.getElementById('orders-list').innerHTML = \`
          <div class="text-center py-8 text-red-600">
            <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
            <p>Fehler beim Laden der Bestellungen</p>
          </div>
        \`;
      }
    }
    
    // Load licenses
    async function loadLicenses() {
      try {
        const licensesData = await apiCall('/api/licenses');
        
        const licensesList = document.getElementById('licenses-list');
        
        if (licensesData.success && licensesData.data && licensesData.data.length > 0) {
          document.getElementById('total-licenses').textContent = licensesData.data.length;
          
          licensesList.innerHTML = licensesData.data.map(license => \`
            <div class="license-card bg-white p-4 rounded-lg mb-4">
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <p class="font-bold text-navy mb-1">\${license.product_name || 'Lizenz'}</p>
                  <p class="text-sm text-gray-600">Lizenzschlüssel</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold \${license.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                  \${license.is_active ? 'Aktiv' : 'Inaktiv'}
                </span>
              </div>
              <div class="bg-gray-50 p-3 rounded font-mono text-sm flex justify-between items-center">
                <span id="license-\${license.id}">\${maskLicenseKey(license.license_key)}</span>
                <div class="flex gap-2">
                  <button onclick="toggleLicenseKey('\${license.id}', '\${license.license_key}')" class="text-navy hover:text-gold" title="Anzeigen/Verstecken">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button onclick="copyLicenseKey('\${license.license_key}')" class="text-navy hover:text-gold" title="Kopieren">
                    <i class="fas fa-copy"></i>
                  </button>
                </div>
              </div>
              <div class="mt-3 text-sm text-gray-600">
                <p>Aktiviert: \${new Date(license.created_at).toLocaleDateString('de-DE')}</p>
                \${license.expires_at ? \`<p>Läuft ab: \${new Date(license.expires_at).toLocaleDateString('de-DE')}</p>\` : ''}
              </div>
            </div>
          \`).join('');
        } else {
          licensesList.innerHTML = \`
            <div class="text-center py-12 text-gray-500">
              <i class="fas fa-key text-5xl mb-4 text-gray-300"></i>
              <p class="font-semibold mb-2">Noch keine Lizenzen</p>
              <p class="text-sm">Lizenzen erscheinen hier nach dem Kauf</p>
            </div>
          \`;
        }
      } catch (error) {
        console.error('Licenses load error:', error);
        document.getElementById('licenses-list').innerHTML = \`
          <div class="text-center py-8 text-red-600">
            <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
            <p>Fehler beim Laden der Lizenzen</p>
          </div>
        \`;
      }
    }
    
    // Helper functions
    function formatPrice(cents) {
      const euros = cents / 100;
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
      }).format(euros);
    }
    
    function getOrderStatusClass(status) {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    }
    
    function getOrderStatusText(status) {
      const texts = {
        pending: 'Ausstehend',
        processing: 'In Bearbeitung',
        completed: 'Abgeschlossen',
        cancelled: 'Storniert'
      };
      return texts[status] || status;
    }
    
    function maskLicenseKey(key) {
      if (!key || key.length < 8) return '****-****-****';
      return key.substring(0, 4) + '-****-' + key.substring(key.length - 4);
    }
    
    // Modal functions
    function showEditProfile() {
      document.getElementById('edit-profile-modal').classList.add('active');
    }
    
    function showChangePassword() {
      document.getElementById('change-password-modal').classList.add('active');
    }
    
    function showDeleteAccount() {
      document.getElementById('delete-account-modal').classList.add('active');
    }
    
    function closeModal(modalId) {
      document.getElementById(modalId).classList.remove('active');
    }
    
    // Close modal on background click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
    
    // Edit profile form handler
    document.getElementById('edit-profile-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('edit-first-name').value;
      const lastName = document.getElementById('edit-last-name').value;
      
      try {
        const response = await apiCall('/api/auth/profile', {
          method: 'PUT',
          data: {
            first_name: firstName,
            last_name: lastName
          }
        });
        
        if (response.success) {
          showNotification('Profil erfolgreich aktualisiert', 'success');
          closeModal('edit-profile-modal');
          loadDashboard(); // Reload to show updated data
        }
      } catch (error) {
        showNotification('Fehler beim Aktualisieren des Profils', 'error');
      }
    });
    
    // Change password form handler
    document.getElementById('change-password-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const errorDiv = document.getElementById('password-error');
      
      // Validate
      if (newPassword !== confirmPassword) {
        errorDiv.textContent = 'Passwörter stimmen nicht überein';
        errorDiv.classList.remove('hidden');
        return;
      }
      
      if (newPassword.length < 8) {
        errorDiv.textContent = 'Passwort muss mindestens 8 Zeichen lang sein';
        errorDiv.classList.remove('hidden');
        return;
      }
      
      errorDiv.classList.add('hidden');
      
      try {
        const response = await apiCall('/api/auth/change-password', {
          method: 'POST',
          data: {
            current_password: currentPassword,
            new_password: newPassword
          }
        });
        
        if (response.success) {
          showNotification('Passwort erfolgreich geändert', 'success');
          closeModal('change-password-modal');
          document.getElementById('change-password-form').reset();
        }
      } catch (error) {
        errorDiv.textContent = 'Aktuelles Passwort ist falsch';
        errorDiv.classList.remove('hidden');
      }
    });
    
    // Delete account form handler
    document.getElementById('delete-account-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const password = document.getElementById('delete-password').value;
      const confirmed = document.getElementById('delete-confirm').checked;
      
      if (!confirmed) {
        showNotification('Bitte bestätigen Sie die Löschung', 'error');
        return;
      }
      
      if (confirm('Sind Sie sicher? Diese Aktion kann nicht rückgängig gemacht werden!')) {
        try {
          const response = await apiCall('/api/auth/delete-account', {
            method: 'DELETE',
            data: { password }
          });
          
          if (response.success) {
            showNotification('Konto wurde gelöscht', 'success');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('token_expires_at');
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          }
        } catch (error) {
          showNotification('Fehler beim Löschen des Kontos. Überprüfen Sie Ihr Passwort.', 'error');
        }
      }
    });
    
    // License key functions
    function toggleLicenseKey(id, key) {
      const element = document.getElementById(\`license-\${id}\`);
      if (element.textContent.includes('****')) {
        element.textContent = key;
      } else {
        element.textContent = maskLicenseKey(key);
      }
    }
    
    function copyLicenseKey(key) {
      navigator.clipboard.writeText(key).then(() => {
        showNotification('Lizenzschlüssel kopiert', 'success');
      });
    }
    
    // Show order details
    async function showOrderDetails(orderId) {
      try {
        const response = await apiCall(\`/api/orders/\${orderId}\`);
        
        if (response.success && response.data) {
          const order = response.data;
          const content = document.getElementById('order-details-content');
          
          content.innerHTML = \`
            <div class="space-y-4">
              <div class="flex justify-between items-start pb-4 border-b">
                <div>
                  <h4 class="font-bold text-xl text-navy">Bestellung #\${order.order_number || order.id}</h4>
                  <p class="text-gray-600">\${new Date(order.created_at).toLocaleDateString('de-DE')}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-sm font-semibold \${getOrderStatusClass(order.status)}">
                  \${getOrderStatusText(order.status)}
                </span>
              </div>
              
              <div>
                <h5 class="font-semibold text-navy mb-3">Bestellte Artikel</h5>
                <div class="space-y-2">
                  \${order.items?.map(item => \`
                    <div class="flex justify-between py-2 border-b">
                      <div>
                        <p class="font-medium">\${item.product_name}</p>
                        <p class="text-sm text-gray-600">Menge: \${item.quantity}</p>
                      </div>
                      <p class="font-semibold">\${formatPrice(item.price * item.quantity)}</p>
                    </div>
                  \`).join('') || '<p class="text-gray-500">Keine Artikel</p>'}
                </div>
              </div>
              
              <div class="pt-4 border-t">
                <div class="flex justify-between text-lg font-bold text-navy">
                  <span>Gesamt:</span>
                  <span>\${formatPrice(order.total_amount)}</span>
                </div>
              </div>
            </div>
          \`;
          
          document.getElementById('order-details-modal').classList.add('active');
        }
      } catch (error) {
        showNotification('Fehler beim Laden der Bestelldetails', 'error');
      }
    }
    
    // Load all orders
    function loadAllOrders() {
      window.location.href = '/konto/bestellungen';
    }
    
    // Refresh licenses
    async function refreshLicenses() {
      document.getElementById('licenses-list').innerHTML = \`
        <div class="text-center py-12 text-gray-500">
          <i class="fas fa-spinner fa-spin text-4xl mb-3 text-gold"></i>
          <p>Lizenzen werden aktualisiert...</p>
        </div>
      \`;
      await loadLicenses();
    }
    
    // Logout
    async function handleLogout() {
      if (confirm('Möchten Sie sich wirklich abmelden?')) {
        try {
          await apiCall('/api/auth/logout', { method: 'POST' });
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('token_expires_at');
          window.location.href = '/';
        }
      }
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = \`fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 \${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
      } text-white\`;
      notification.innerHTML = \`
        <div class="flex items-center gap-3">
          <i class="fas fa-\${
            type === 'success' ? 'check-circle' :
            type === 'error' ? 'exclamation-circle' :
            'info-circle'
          } text-xl"></i>
          <span>\${message}</span>
        </div>
      \`;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
    
    // Initialize dashboard on page load
    document.addEventListener('DOMContentLoaded', () => {
      loadDashboard();
    });
  </script>

  <!-- Auth Manager (for logout) -->
  <script src="/static/auth.js"></script>
</body>
</html>
  `;
}
