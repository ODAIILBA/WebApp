import { AdminSidebar } from './admin-sidebar'

export const AdminDashboardAdvanced = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dashboard - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --gold: #d4af37;
        }
        .admin-sidebar {
          width: 260px;
          background: #1a2a4e;
          color: white;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 40;
        }
        .admin-nav-item {
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .admin-nav-item:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
        }
        .admin-nav-item.active {
          background: rgba(212, 175, 55, 0.2);
          color: #d4af37;
          border-left: 4px solid #d4af37;
        }
        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .notification-item {
          padding: 16px;
          border-left: 4px solid;
          margin-bottom: 12px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.2s;
        }
        .notification-item:hover {
          transform: translateX(4px);
        }
        .notification-high { border-color: #dc2626; }
        .notification-normal { border-color: #3b82f6; }
        .notification-low { border-color: #10b981; }
        .notification-unread { background: #f0f9ff; }
      </style>
    </head>
    <body class="bg-gray-100">
      <div class="flex min-h-screen">
        ${AdminSidebar('/admin')}
        
        <div class="flex-1 ml-64 p-8">
          <div class="max-w-7xl mx-auto">
            <!-- Header with notifications -->
            <div class="flex justify-between items-center mb-8">
              <div>
                <h1 class="text-3xl font-bold" style="color: var(--navy-dark)">
                  <i class="fas fa-tachometer-alt mr-3"></i>
                  Dashboard
                </h1>
                <p class="text-gray-600 mt-2">Willkommen zurück! Hier ist Ihre Übersicht.</p>
              </div>
              <div class="flex items-center gap-4">
                <button onclick="loadDashboard()" class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                  <i class="fas fa-sync-alt mr-2"></i>Aktualisieren
                </button>
                <div class="relative">
                  <button onclick="toggleNotifications()" class="relative px-4 py-2 rounded-lg" style="background: var(--gold); color: white;">
                    <i class="fas fa-bell"></i>
                    <span id="notif-badge" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                  </button>
                  <div id="notif-dropdown" class="hidden absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    <div class="p-4 border-b">
                      <h3 class="font-bold">Benachrichtigungen</h3>
                    </div>
                    <div id="notif-list" class="p-4"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Statistics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <div class="text-sm text-gray-600">Bestellungen (Heute)</div>
                  <i class="fas fa-shopping-cart text-2xl" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold" style="color: var(--navy-dark)" id="stat-orders-today">0</div>
                <div class="text-sm text-green-600 mt-2">
                  <i class="fas fa-arrow-up"></i>
                  <span id="stat-orders-change">0%</span> vs. gestern
                </div>
              </div>
              
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <div class="text-sm text-gray-600">Umsatz (Heute)</div>
                  <i class="fas fa-euro-sign text-2xl" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold" style="color: var(--navy-dark)" id="stat-revenue-today">€0</div>
                <div class="text-sm text-green-600 mt-2">
                  <i class="fas fa-arrow-up"></i>
                  <span id="stat-revenue-change">0%</span> vs. gestern
                </div>
              </div>
              
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <div class="text-sm text-gray-600">Verfügbare Lizenzen</div>
                  <i class="fas fa-key text-2xl" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold" style="color: var(--navy-dark)" id="stat-licenses">0</div>
                <div class="text-sm text-yellow-600 mt-2">
                  <i class="fas fa-exclamation-triangle"></i>
                  <span id="stat-low-stock">0</span> niedrig
                </div>
              </div>
              
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <div class="text-sm text-gray-600">Neue Kunden (7 Tage)</div>
                  <i class="fas fa-users text-2xl" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold" style="color: var(--navy-dark)" id="stat-customers">0</div>
                <div class="text-sm text-blue-600 mt-2">
                  <i class="fas fa-user-plus"></i>
                  <span id="stat-customers-total">0</span> total
                </div>
              </div>
            </div>
            
            <!-- Quick Actions / Shortcuts -->
            <div class="bg-white rounded-lg p-6 shadow mb-8">
              <h3 class="text-lg font-bold mb-4" style="color: var(--navy-dark)">
                <i class="fas fa-bolt mr-2"></i>
                Schnellzugriff
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <a href="/admin/orders" class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-all">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2" style="background: rgba(212, 175, 55, 0.1);">
                    <i class="fas fa-shopping-cart text-xl" style="color: var(--gold)"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Bestellungen</span>
                </a>
                
                <a href="/admin/invoices" class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-all">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2" style="background: rgba(59, 130, 246, 0.1);">
                    <i class="fas fa-file-invoice text-xl text-blue-600"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Rechnungen</span>
                </a>
                
                <a href="/admin/certificates" class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-all">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2" style="background: rgba(16, 185, 129, 0.1);">
                    <i class="fas fa-certificate text-xl text-green-600"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Zertifikate</span>
                </a>
                
                <a href="/admin/licenses" class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-all">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2" style="background: rgba(139, 92, 246, 0.1);">
                    <i class="fas fa-key text-xl text-purple-600"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Lizenzen</span>
                </a>
                
                <a href="/admin/products" class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-all">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2" style="background: rgba(239, 68, 68, 0.1);">
                    <i class="fas fa-box-open text-xl text-red-600"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Produkte</span>
                </a>
                
                <a href="/admin/customers" class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-all">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2" style="background: rgba(236, 72, 153, 0.1);">
                    <i class="fas fa-users text-xl text-pink-600"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Kunden</span>
                </a>
              </div>
            </div>
            
            <!-- Charts Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div class="bg-white rounded-lg p-6 shadow">
                <h3 class="text-lg font-bold mb-4" style="color: var(--navy-dark)">Umsatz (7 Tage)</h3>
                <canvas id="revenueChart"></canvas>
              </div>
              
              <div class="bg-white rounded-lg p-6 shadow">
                <h3 class="text-lg font-bold mb-4" style="color: var(--navy-dark)">Beliebte Produkte</h3>
                <canvas id="productsChart"></canvas>
              </div>
            </div>
            
            <!-- Recent Orders & Activities -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-bold" style="color: var(--navy-dark)">Neueste Bestellungen</h3>
                  <a href="/admin/orders" class="text-sm" style="color: var(--gold)">Alle anzeigen →</a>
                </div>
                <div id="recent-orders">
                  <div class="text-center py-8 text-gray-400">
                    <i class="fas fa-spinner fa-spin text-2xl"></i>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-bold" style="color: var(--navy-dark)">Aktivitätsprotokoll</h3>
                  <button onclick="clearLogs()" class="text-sm text-red-600 hover:text-red-800">Löschen</button>
                </div>
                <div id="activity-log" class="space-y-3 max-h-96 overflow-y-auto">
                  <div class="text-center py-8 text-gray-400">
                    <i class="fas fa-spinner fa-spin text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        let revenueChart, productsChart;
        let notificationsOpen = false;
        
        async function loadDashboard() {
          try {
            // Load statistics
            const statsResponse = await axios.get('/api/admin/dashboard/stats');
            const stats = statsResponse.data.data;
            
            document.getElementById('stat-orders-today').textContent = stats.orders_today || 0;
            document.getElementById('stat-revenue-today').textContent = '€' + (stats.revenue_today || 0).toFixed(2);
            document.getElementById('stat-licenses').textContent = stats.available_licenses || 0;
            document.getElementById('stat-customers').textContent = stats.new_customers_7d || 0;
            document.getElementById('stat-customers-total').textContent = stats.total_customers || 0;
            document.getElementById('stat-low-stock').textContent = stats.low_stock_count || 0;
            
            // Load charts
            loadCharts();
            
            // Load recent orders
            loadRecentOrders();
            
            // Load activity log
            loadActivityLog();
            
            // Load notifications
            loadNotifications();
            
          } catch (error) {
            console.error('Error loading dashboard:', error);
          }
        }
        
        async function loadCharts() {
          try {
            const response = await axios.get('/api/admin/dashboard/charts');
            const data = response.data.data;
            
            // Revenue Chart
            const revenueCtx = document.getElementById('revenueChart').getContext('2d');
            if (revenueChart) revenueChart.destroy();
            revenueChart = new Chart(revenueCtx, {
              type: 'line',
              data: {
                labels: data.revenue_labels || [],
                datasets: [{
                  label: 'Umsatz (€)',
                  data: data.revenue_data || [],
                  borderColor: '#d4af37',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  tension: 0.4
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: false } }
              }
            });
            
            // Products Chart
            const productsCtx = document.getElementById('productsChart').getContext('2d');
            if (productsChart) productsChart.destroy();
            productsChart = new Chart(productsCtx, {
              type: 'bar',
              data: {
                labels: data.product_labels || [],
                datasets: [{
                  label: 'Verkäufe',
                  data: data.product_data || [],
                  backgroundColor: '#1a2a4e'
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: false } }
              }
            });
          } catch (error) {
            console.error('Error loading charts:', error);
          }
        }
        
        async function loadRecentOrders() {
          try {
            const response = await axios.get('/api/admin/orders?limit=5&sort=created_at&order=desc');
            const orders = response.data.data || [];
            
            const html = orders.length > 0 ? orders.map(order => \`
              <div class="flex items-center justify-between py-3 border-b">
                <div class="flex-1">
                  <div class="font-medium">\${order.order_number}</div>
                  <div class="text-sm text-gray-600">\${order.customer_email}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold">€\${order.total_amount.toFixed(2)}</div>
                  <div class="text-xs text-gray-600">\${new Date(order.created_at).toLocaleDateString('de-DE')}</div>
                </div>
              </div>
            \`).join('') : '<div class="text-center py-8 text-gray-400">Keine Bestellungen</div>';
            
            document.getElementById('recent-orders').innerHTML = html;
          } catch (error) {
            console.error('Error loading orders:', error);
          }
        }
        
        async function loadActivityLog() {
          try {
            const response = await axios.get('/api/admin/activity-log?limit=10');
            const activities = response.data.data || [];
            
            const html = activities.length > 0 ? activities.map(activity => \`
              <div class="flex items-start gap-3 text-sm">
                <i class="fas fa-\${getActivityIcon(activity.action)} text-gray-400 mt-1"></i>
                <div class="flex-1">
                  <div class="text-gray-800">\${activity.description}</div>
                  <div class="text-xs text-gray-500">\${new Date(activity.created_at).toLocaleString('de-DE')}</div>
                </div>
              </div>
            \`).join('') : '<div class="text-center py-8 text-gray-400">Keine Aktivitäten</div>';
            
            document.getElementById('activity-log').innerHTML = html;
          } catch (error) {
            console.error('Error loading activity log:', error);
          }
        }
        
        async function loadNotifications() {
          try {
            const response = await axios.get('/api/admin/notifications?unread=1');
            const notifications = response.data.data || [];
            
            document.getElementById('notif-badge').textContent = notifications.length;
            
            const html = notifications.length > 0 ? notifications.map(notif => \`
              <div class="notification-item notification-\${notif.priority} notification-\${notif.is_read ? 'read' : 'unread'}" onclick="markAsRead(\${notif.id})">
                <div class="font-medium mb-1">\${notif.title}</div>
                <div class="text-sm text-gray-600 mb-2">\${notif.message}</div>
                <div class="text-xs text-gray-400">\${new Date(notif.created_at).toLocaleString('de-DE')}</div>
              </div>
            \`).join('') : '<div class="text-center py-4 text-gray-400">Keine Benachrichtigungen</div>';
            
            document.getElementById('notif-list').innerHTML = html;
          } catch (error) {
            console.error('Error loading notifications:', error);
          }
        }
        
        function toggleNotifications() {
          const dropdown = document.getElementById('notif-dropdown');
          notificationsOpen = !notificationsOpen;
          dropdown.classList.toggle('hidden');
        }
        
        async function markAsRead(id) {
          try {
            await axios.patch(\`/api/admin/notifications/\${id}/read\`);
            loadNotifications();
          } catch (error) {
            console.error('Error marking notification:', error);
          }
        }
        
        function getActivityIcon(action) {
          const icons = {
            'create': 'plus-circle',
            'update': 'edit',
            'delete': 'trash',
            'login': 'sign-in-alt',
            'export': 'download',
            'import': 'upload'
          };
          return icons[action] || 'circle';
        }
        
        async function clearLogs() {
          if (!confirm('Aktivitätsprotokoll wirklich löschen?')) return;
          try {
            await axios.delete('/api/admin/activity-log');
            loadActivityLog();
          } catch (error) {
            console.error('Error clearing logs:', error);
          }
        }
        
        // Load dashboard on page load
        loadDashboard();
        
        // Refresh every 30 seconds
        setInterval(loadDashboard, 30000);
      </script>
    </body>
    </html>
  `;
};
