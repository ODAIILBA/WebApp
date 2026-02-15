import { AdminSidebar } from './admin-sidebar'

export function AdminCustomersAdvanced() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kunden - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
        :root {
            --navy-dark: #1a2a4e;
            --gold: #d4af37;
        }
        
        .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 280px;
            height: 100vh;
            background: var(--navy-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
        }
        
        .admin-content {
            margin-left: 280px;
            min-height: 100vh;
            background: #f5f7fa;
        }
        
        .admin-nav-item {
            display: block;
            padding: 12px 20px;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s;
            border-left: 3px solid transparent;
        }
        
        .admin-nav-item:hover,
        .admin-nav-item.active {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-left-color: var(--gold);
        }
        
        .customer-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.3s;
        }
        
        .customer-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .stat-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .btn-primary {
            background: var(--navy-dark);
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-primary:hover {
            background: #0f1936;
        }
        
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .badge-active {
            background: #d1fae5;
            color: #065f46;
        }
        
        .badge-inactive {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .badge-vip {
            background: #fef3c7;
            color: #92400e;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }
        
        .modal.active {
            display: flex;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 900px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
        }
    </style>
</head>
<body>
    ${AdminSidebar('/admin/customers')}
    
    <div class="admin-content">
        <div class="p-8">
            <!-- Header -->
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-users mr-3"></i>Kunden verwalten
                    </h1>
                    <p class="text-gray-600">Alle Kunden im Überblick</p>
                </div>
                <div class="flex gap-3">
                    <button onclick="exportCustomers()" class="btn-primary">
                        <i class="fas fa-download mr-2"></i>Export CSV
                    </button>
                    <button onclick="window.location.reload()" class="btn-primary">
                        <i class="fas fa-sync-alt mr-2"></i>Aktualisieren
                    </button>
                </div>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Gesamt Kunden</p>
                            <p class="text-3xl font-bold text-gray-800 mt-2" id="total-customers">0</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-users text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Aktiv</p>
                            <p class="text-3xl font-bold text-green-600 mt-2" id="active-customers">0</p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Neue (7 Tage)</p>
                            <p class="text-3xl font-bold text-purple-600 mt-2" id="new-customers">0</p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user-plus text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Gesamtumsatz</p>
                            <p class="text-3xl font-bold text-orange-600 mt-2" id="total-revenue">€0</p>
                        </div>
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-euro-sign text-orange-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select id="filter-status" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadCustomers()">
                            <option value="">Alle Status</option>
                            <option value="active">Aktiv</option>
                            <option value="inactive">Inaktiv</option>
                            <option value="blocked">Blockiert</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Sortieren nach</label>
                        <select id="filter-sort" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadCustomers()">
                            <option value="created_desc">Neueste zuerst</option>
                            <option value="created_asc">Älteste zuerst</option>
                            <option value="orders_desc">Meiste Bestellungen</option>
                            <option value="revenue_desc">Höchster Umsatz</option>
                            <option value="name_asc">Name A-Z</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Min. Bestellungen</label>
                        <input type="number" id="filter-min-orders" min="0"
                               class="w-full border border-gray-300 rounded-lg px-4 py-2"
                               onchange="loadCustomers()">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Suche</label>
                        <input type="text" id="filter-search" placeholder="Name, E-Mail..."
                               class="w-full border border-gray-300 rounded-lg px-4 py-2"
                               onkeyup="debounceSearch()">
                    </div>
                </div>
                
                <div class="mt-4">
                    <button onclick="resetFilters()" class="text-sm text-gray-600 hover:text-gray-800">
                        <i class="fas fa-redo mr-1"></i>Filter zurücksetzen
                    </button>
                </div>
            </div>

            <!-- Customers List -->
            <div class="bg-white rounded-lg shadow">
                <div id="customers-list" class="divide-y">
                    <div class="p-8 text-center text-gray-500">
                        <i class="fas fa-spinner fa-spin text-3xl mb-4"></i>
                        <p>Lade Kunden...</p>
                    </div>
                </div>
                
                <!-- Pagination -->
                <div class="p-6 border-t" id="pagination"></div>
            </div>
        </div>
    </div>

    <!-- Customer Details Modal -->
    <div id="customer-modal" class="modal">
        <div class="modal-content">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">
                    <i class="fas fa-user mr-2"></i><span id="modal-customer-name"></span>
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <div id="customer-details-content">
                <!-- Content will be loaded dynamically -->
            </div>
        </div>
    </div>

    <script>
        let customers = [];
        let currentPage = 1;
        let totalPages = 1;
        let searchTimeout;

        async function loadCustomers() {
            try {
                const status = document.getElementById('filter-status').value;
                const sort = document.getElementById('filter-sort').value;
                const minOrders = document.getElementById('filter-min-orders').value;
                const search = document.getElementById('filter-search').value;
                
                let url = \`/api/admin/customers?page=\${currentPage}&limit=20\`;
                if (status) url += \`&status=\${status}\`;
                if (sort) url += \`&sort=\${sort}\`;
                if (minOrders) url += \`&min_orders=\${minOrders}\`;
                if (search) url += \`&search=\${encodeURIComponent(search)}\`;
                
                const res = await axios.get(url);
                customers = res.data.data || [];
                totalPages = res.data.pagination?.total_pages || 1;
                
                renderCustomers();
                renderPagination();
            } catch (error) {
                console.error('Error loading customers:', error);
                document.getElementById('customers-list').innerHTML = \`
                    <div class="p-8 text-center text-red-500">
                        <i class="fas fa-exclamation-triangle text-3xl mb-4"></i>
                        <p>Fehler beim Laden der Kunden</p>
                    </div>
                \`;
            }
        }

        async function loadStats() {
            try {
                const res = await axios.get('/api/admin/customers/stats');
                const stats = res.data.data || {};
                
                document.getElementById('total-customers').textContent = stats.total || 0;
                document.getElementById('active-customers').textContent = stats.active || 0;
                document.getElementById('new-customers').textContent = stats.new_last_7_days || 0;
                document.getElementById('total-revenue').textContent = \`€\${(stats.total_revenue || 0).toFixed(2)}\`;
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }

        function renderCustomers() {
            const container = document.getElementById('customers-list');
            
            if (customers.length === 0) {
                container.innerHTML = \`
                    <div class="p-8 text-center text-gray-500">
                        <i class="fas fa-users text-5xl mb-4"></i>
                        <p>Keine Kunden gefunden</p>
                    </div>
                \`;
                return;
            }
            
            container.innerHTML = customers.map(customer => {
                const statusBadge = customer.is_active ? 
                    '<span class="badge badge-active">Aktiv</span>' : 
                    '<span class="badge badge-inactive">Inaktiv</span>';
                
                const joinDate = new Date(customer.created_at).toLocaleDateString('de-DE');
                const orderCount = customer.order_count || 0;
                const totalSpent = parseFloat(customer.total_spent || 0).toFixed(2);
                
                return \`
                    <div class="p-4 hover:bg-gray-50 transition">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4 flex-1">
                                <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    \${(customer.first_name?.[0] || '?').toUpperCase()}
                                </div>
                                
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h3 class="font-bold text-lg text-gray-800">
                                            \${customer.first_name || ''} \${customer.last_name || ''}
                                        </h3>
                                        \${statusBadge}
                                        \${customer.is_vip ? '<span class="badge badge-vip"><i class="fas fa-crown mr-1"></i>VIP</span>' : ''}
                                    </div>
                                    
                                    <div class="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p class="text-gray-600">
                                                <i class="fas fa-envelope mr-2"></i>\${customer.email}
                                            </p>
                                            <p class="text-gray-600">
                                                <i class="fas fa-phone mr-2"></i>\${customer.phone || 'N/A'}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p class="text-gray-600">
                                                <i class="fas fa-shopping-cart mr-2"></i>
                                                <strong>\${orderCount}</strong> Bestellungen
                                            </p>
                                            <p class="text-gray-600">
                                                <i class="fas fa-calendar mr-2"></i>Seit \${joinDate}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p class="text-2xl font-bold text-green-600">
                                                €\${totalSpent}
                                            </p>
                                            <p class="text-sm text-gray-500">Gesamtumsatz</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex flex-col gap-2 ml-4">
                                <button onclick="viewCustomer(\${customer.id})" 
                                        class="btn-primary text-sm">
                                    <i class="fas fa-eye mr-1"></i>Details
                                </button>
                                <button onclick="viewOrders(\${customer.id})" 
                                        class="btn-primary text-sm">
                                    <i class="fas fa-shopping-cart mr-1"></i>Bestellungen
                                </button>
                                <button onclick="sendEmail(\${customer.id})" 
                                        class="btn-primary text-sm">
                                    <i class="fas fa-envelope mr-1"></i>E-Mail
                                </button>
                            </div>
                        </div>
                    </div>
                \`;
            }).join('');
        }

        function renderPagination() {
            const container = document.getElementById('pagination');
            if (totalPages <= 1) {
                container.innerHTML = '';
                return;
            }
            
            let html = '<div class="flex items-center justify-between">';
            html += \`<p class="text-sm text-gray-600">Seite \${currentPage} von \${totalPages}</p>\`;
            html += '<div class="flex gap-2">';
            
            if (currentPage > 1) {
                html += \`<button onclick="goToPage(\${currentPage - 1})" class="btn-primary text-sm py-2">
                    <i class="fas fa-chevron-left"></i> Zurück
                </button>\`;
            }
            
            if (currentPage < totalPages) {
                html += \`<button onclick="goToPage(\${currentPage + 1})" class="btn-primary text-sm py-2">
                    Weiter <i class="fas fa-chevron-right"></i>
                </button>\`;
            }
            
            html += '</div></div>';
            container.innerHTML = html;
        }

        function goToPage(page) {
            currentPage = page;
            loadCustomers();
        }

        function debounceSearch() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentPage = 1;
                loadCustomers();
            }, 500);
        }

        function resetFilters() {
            document.getElementById('filter-status').value = '';
            document.getElementById('filter-sort').value = 'created_desc';
            document.getElementById('filter-min-orders').value = '';
            document.getElementById('filter-search').value = '';
            currentPage = 1;
            loadCustomers();
        }

        async function viewCustomer(id) {
            try {
                const res = await axios.get(\`/api/admin/customers/\${id}\`);
                const customer = res.data.data;
                
                document.getElementById('modal-customer-name').textContent = 
                    \`\${customer.first_name} \${customer.last_name}\`;
                
                const statusBadge = customer.is_active ? 
                    '<span class="badge badge-active">Aktiv</span>' : 
                    '<span class="badge badge-inactive">Inaktiv</span>';
                
                let html = \`
                    <div class="grid grid-cols-2 gap-6 mb-6">
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold mb-3">
                                <i class="fas fa-user mr-2"></i>Persönliche Informationen
                            </h3>
                            <p><strong>Name:</strong> \${customer.first_name} \${customer.last_name}</p>
                            <p><strong>E-Mail:</strong> \${customer.email}</p>
                            <p><strong>Telefon:</strong> \${customer.phone || 'N/A'}</p>
                            <p><strong>Status:</strong> \${statusBadge}</p>
                        </div>
                        
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold mb-3">
                                <i class="fas fa-chart-bar mr-2"></i>Statistiken
                            </h3>
                            <p><strong>Bestellungen:</strong> \${customer.order_count || 0}</p>
                            <p><strong>Gesamtumsatz:</strong> €\${parseFloat(customer.total_spent || 0).toFixed(2)}</p>
                            <p><strong>Mitglied seit:</strong> \${new Date(customer.created_at).toLocaleDateString('de-DE')}</p>
                            <p><strong>Letzte Aktivität:</strong> \${customer.last_login ? new Date(customer.last_login).toLocaleDateString('de-DE') : 'N/A'}</p>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="font-semibold mb-3">
                            <i class="fas fa-shopping-cart mr-2"></i>Letzte Bestellungen
                        </h3>
                        <div id="customer-orders-list">
                            <p class="text-gray-500 text-center py-4">Lade Bestellungen...</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-3">
                        <button onclick="toggleCustomerStatus(\${id})" class="btn-primary flex-1">
                            <i class="fas fa-toggle-on mr-2"></i>Status ändern
                        </button>
                        <button onclick="sendEmail(\${id})" class="btn-primary flex-1">
                            <i class="fas fa-envelope mr-2"></i>E-Mail senden
                        </button>
                        <button onclick="viewOrders(\${id})" class="btn-primary flex-1">
                            <i class="fas fa-list mr-2"></i>Alle Bestellungen
                        </button>
                    </div>
                \`;
                
                document.getElementById('customer-details-content').innerHTML = html;
                document.getElementById('customer-modal').classList.add('active');
                
                // Load customer orders
                loadCustomerOrders(id);
            } catch (error) {
                console.error('Error loading customer details:', error);
                alert('Fehler beim Laden der Kundendetails');
            }
        }

        async function loadCustomerOrders(customerId) {
            try {
                const res = await axios.get(\`/api/admin/customers/\${customerId}/orders?limit=5\`);
                const orders = res.data.data || [];
                
                const container = document.getElementById('customer-orders-list');
                if (orders.length === 0) {
                    container.innerHTML = '<p class="text-gray-500 text-center py-4">Keine Bestellungen</p>';
                    return;
                }
                
                container.innerHTML = \`
                    <div class="border rounded-lg overflow-hidden">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-sm font-semibold">Bestellnr.</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold">Datum</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold">Status</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold">Betrag</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                \${orders.map(order => \`
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-4 py-3">#\${order.order_number}</td>
                                        <td class="px-4 py-3">\${new Date(order.created_at).toLocaleDateString('de-DE')}</td>
                                        <td class="px-4 py-3">\${order.order_status}</td>
                                        <td class="px-4 py-3 text-right font-semibold">€\${parseFloat(order.total_amount).toFixed(2)}</td>
                                    </tr>
                                \`).join('')}
                            </tbody>
                        </table>
                    </div>
                \`;
            } catch (error) {
                console.error('Error loading customer orders:', error);
            }
        }

        function closeModal() {
            document.getElementById('customer-modal').classList.remove('active');
        }

        async function toggleCustomerStatus(id) {
            if (!confirm('Möchten Sie den Kundenstatus ändern?')) return;
            
            try {
                await axios.patch(\`/api/admin/customers/\${id}/toggle-status\`);
                closeModal();
                loadCustomers();
                loadStats();
                alert('Status erfolgreich geändert!');
            } catch (error) {
                console.error('Error toggling status:', error);
                alert('Fehler beim Ändern des Status');
            }
        }

        function viewOrders(customerId) {
            window.location.href = \`/admin/orders?customer_id=\${customerId}\`;
        }

        function sendEmail(customerId) {
            alert('E-Mail-Funktion wird geöffnet... (In Entwicklung)');
            // Implement email functionality
        }

        function exportCustomers() {
            const status = document.getElementById('filter-status').value;
            let url = '/api/admin/customers/export?';
            if (status) url += \`status=\${status}&\`;
            window.location.href = url;
        }

        // Load data on page load
        loadCustomers();
        loadStats();
        
        // Auto-refresh every 60 seconds
        setInterval(() => {
            loadCustomers();
            loadStats();
        }, 60000);
    </script>
</body>
</html>`;
}
