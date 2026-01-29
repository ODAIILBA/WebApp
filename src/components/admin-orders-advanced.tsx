import { AdminSidebar } from './admin-sidebar'

export function AdminOrdersAdvanced() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bestellungen - Admin - SOFTWAREKING24</title>
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
            width: 260px;
            height: 100vh;
            background: var(--navy-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
        }
        
        .admin-content {
            margin-left: 260px;
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
        
        .order-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.3s;
        }
        
        .order-card:hover {
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
        
        .badge-pending {
            background: #fef3c7;
            color: #92400e;
        }
        
        .badge-processing {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .badge-completed {
            background: #d1fae5;
            color: #065f46;
        }
        
        .badge-cancelled {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .badge-refunded {
            background: #e0e7ff;
            color: #3730a3;
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
        
        .timeline {
            position: relative;
            padding-left: 30px;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #e5e7eb;
        }
        
        .timeline-item {
            position: relative;
            padding-bottom: 20px;
        }
        
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -26px;
            top: 4px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            border: 3px solid var(--navy-dark);
        }
        
        .timeline-item.completed::before {
            background: #10b981;
            border-color: #10b981;
        }
    </style>
</head>
<body>
    ${AdminSidebar('/admin/orders')}
    
    <div class="admin-content">
        <div class="p-8">
            <!-- Header -->
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-shopping-cart mr-3"></i>Bestellungen verwalten
                    </h1>
                    <p class="text-gray-600">Alle Bestellungen im Überblick</p>
                </div>
                <div class="flex gap-3">
                    <button onclick="exportOrders()" class="btn-primary">
                        <i class="fas fa-download mr-2"></i>Export CSV
                    </button>
                    <button onclick="window.location.reload()" class="btn-primary">
                        <i class="fas fa-sync-alt mr-2"></i>Aktualisieren
                    </button>
                </div>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Gesamt</p>
                            <p class="text-3xl font-bold text-gray-800 mt-2" id="total-orders">0</p>
                        </div>
                        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-shopping-cart text-gray-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Ausstehend</p>
                            <p class="text-3xl font-bold text-yellow-600 mt-2" id="pending-orders">0</p>
                        </div>
                        <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-clock text-yellow-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">In Bearbeitung</p>
                            <p class="text-3xl font-bold text-blue-600 mt-2" id="processing-orders">0</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-spinner text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Abgeschlossen</p>
                            <p class="text-3xl font-bold text-green-600 mt-2" id="completed-orders">0</p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Umsatz (Heute)</p>
                            <p class="text-3xl font-bold text-purple-600 mt-2" id="today-revenue">€0</p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-euro-sign text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select id="filter-status" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadOrders()">
                            <option value="">Alle Status</option>
                            <option value="pending">Ausstehend</option>
                            <option value="processing">In Bearbeitung</option>
                            <option value="completed">Abgeschlossen</option>
                            <option value="cancelled">Storniert</option>
                            <option value="refunded">Rückerstattet</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Zeitraum</label>
                        <select id="filter-period" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadOrders()">
                            <option value="">Alle</option>
                            <option value="today">Heute</option>
                            <option value="yesterday">Gestern</option>
                            <option value="week">Diese Woche</option>
                            <option value="month">Dieser Monat</option>
                            <option value="year">Dieses Jahr</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Zahlungsmethode</label>
                        <select id="filter-payment" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadOrders()">
                            <option value="">Alle</option>
                            <option value="paypal">PayPal</option>
                            <option value="stripe">Kreditkarte</option>
                            <option value="bank_transfer">Überweisung</option>
                            <option value="sofort">Sofortüberweisung</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Mindestbetrag</label>
                        <input type="number" id="filter-min-amount" step="0.01"
                               class="w-full border border-gray-300 rounded-lg px-4 py-2"
                               onchange="loadOrders()">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Suche</label>
                        <input type="text" id="filter-search" placeholder="Bestellnr., E-Mail..."
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

            <!-- Orders List -->
            <div class="bg-white rounded-lg shadow">
                <div id="orders-list" class="divide-y">
                    <div class="p-8 text-center text-gray-500">
                        <i class="fas fa-spinner fa-spin text-3xl mb-4"></i>
                        <p>Lade Bestellungen...</p>
                    </div>
                </div>
                
                <!-- Pagination -->
                <div class="p-6 border-t" id="pagination"></div>
            </div>
        </div>
    </div>

    <!-- Order Details Modal -->
    <div id="order-modal" class="modal">
        <div class="modal-content">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">
                    <i class="fas fa-shopping-cart mr-2"></i>Bestellung <span id="modal-order-number"></span>
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <div id="order-details-content">
                <!-- Content will be loaded dynamically -->
            </div>
        </div>
    </div>

    <script>
        let orders = [];
        let currentPage = 1;
        let totalPages = 1;
        let searchTimeout;

        async function loadOrders() {
            try {
                const status = document.getElementById('filter-status').value;
                const period = document.getElementById('filter-period').value;
                const payment = document.getElementById('filter-payment').value;
                const minAmount = document.getElementById('filter-min-amount').value;
                const search = document.getElementById('filter-search').value;
                
                let url = \`/api/admin/orders?page=\${currentPage}&limit=20\`;
                if (status) url += \`&status=\${status}\`;
                if (period) url += \`&period=\${period}\`;
                if (payment) url += \`&payment_method=\${payment}\`;
                if (minAmount) url += \`&min_amount=\${minAmount}\`;
                if (search) url += \`&search=\${encodeURIComponent(search)}\`;
                
                const res = await axios.get(url);
                orders = res.data.data || [];
                totalPages = res.data.pagination?.total_pages || 1;
                
                renderOrders();
                renderPagination();
            } catch (error) {
                console.error('Error loading orders:', error);
                document.getElementById('orders-list').innerHTML = \`
                    <div class="p-8 text-center text-red-500">
                        <i class="fas fa-exclamation-triangle text-3xl mb-4"></i>
                        <p>Fehler beim Laden der Bestellungen</p>
                    </div>
                \`;
            }
        }

        async function loadStats() {
            try {
                const res = await axios.get('/api/admin/orders/stats');
                const stats = res.data.data || {};
                
                document.getElementById('total-orders').textContent = stats.total || 0;
                document.getElementById('pending-orders').textContent = stats.pending || 0;
                document.getElementById('processing-orders').textContent = stats.processing || 0;
                document.getElementById('completed-orders').textContent = stats.completed || 0;
                document.getElementById('today-revenue').textContent = \`€\${(stats.today_revenue || 0).toFixed(2)}\`;
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }

        async function renderOrders() {
            const container = document.getElementById('orders-list');
            
            if (orders.length === 0) {
                container.innerHTML = \`
                    <div class="p-8 text-center text-gray-500">
                        <i class="fas fa-shopping-cart text-5xl mb-4"></i>
                        <p>Keine Bestellungen gefunden</p>
                    </div>
                \`;
                return;
            }
            
            // Fetch certificates for all orders
            const orderIds = orders.map(o => o.id).filter(Boolean);
            let certificatesMap = {};
            
            if (orderIds.length > 0) {
                try {
                    const certResponse = await axios.get('/api/admin/certificates', {
                        params: { order_ids: orderIds.join(',') }
                    });
                    
                    if (certResponse.data.success && certResponse.data.data) {
                        certResponse.data.data.forEach(cert => {
                            if (!certificatesMap[cert.order_id]) {
                                certificatesMap[cert.order_id] = [];
                            }
                            certificatesMap[cert.order_id].push(cert);
                        });
                    }
                } catch (err) {
                    console.error('[Orders] Failed to load certificates:', err);
                }
            }
            
            container.innerHTML = orders.map(order => {
                const statusClass = {
                    'pending': 'badge-pending',
                    'processing': 'badge-processing',
                    'completed': 'badge-completed',
                    'cancelled': 'badge-cancelled',
                    'refunded': 'badge-refunded'
                }[order.order_status] || 'badge-pending';
                
                const statusText = {
                    'pending': 'Ausstehend',
                    'processing': 'In Bearbeitung',
                    'completed': 'Abgeschlossen',
                    'cancelled': 'Storniert',
                    'refunded': 'Rückerstattet'
                }[order.order_status] || order.order_status;
                
                const orderDate = new Date(order.created_at).toLocaleString('de-DE');
                
                // Certificate badge and button
                const orderCertificates = certificatesMap[order.id] || [];
                const hasCertificate = orderCertificates.length > 0;
                const certificateBadge = hasCertificate 
                    ? \`<span class="badge" style="background: #10b981; color: white;">
                         <i class="fas fa-certificate mr-1"></i>Zertifikat
                       </span>\`
                    : '';
                
                const certificateButton = hasCertificate
                    ? \`<button onclick="viewCertificate('\${orderCertificates[0].id}')" 
                               class="btn-primary text-sm" style="background: #10b981;">
                         <i class="fas fa-certificate mr-1"></i>Zertifikat
                       </button>\`
                    : '';
                
                return \`
                    <div class="p-4 hover:bg-gray-50 transition">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center gap-4 mb-2">
                                    <h3 class="font-bold text-lg text-gray-800">#\${order.order_number}</h3>
                                    <span class="badge \${statusClass}">\${statusText}</span>
                                    \${certificateBadge}
                                </div>
                                
                                <div class="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p class="text-gray-600">
                                            <i class="fas fa-user mr-2"></i>
                                            <strong>\${order.first_name} \${order.last_name}</strong>
                                        </p>
                                        <p class="text-gray-600">
                                            <i class="fas fa-envelope mr-2"></i>\${order.email}
                                        </p>
                                        <p class="text-gray-600">
                                            <i class="fas fa-calendar mr-2"></i>\${orderDate}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <p class="text-gray-600">
                                            <i class="fas fa-credit-card mr-2"></i>
                                            \${order.payment_method || 'N/A'}
                                        </p>
                                        <p class="text-gray-600">
                                            <i class="fas fa-box mr-2"></i>
                                            \${order.item_count || 0} Artikel
                                        </p>
                                        <p class="text-2xl font-bold text-gray-800">
                                            €\${parseFloat(order.total_amount).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex flex-col gap-2 ml-4">
                                <button onclick="viewOrder('\${order.order_number}')" 
                                        class="btn-primary text-sm">
                                    <i class="fas fa-eye mr-1"></i>Details
                                </button>
                                <button onclick="updateStatus('\${order.order_number}')" 
                                        class="btn-primary text-sm">
                                    <i class="fas fa-edit mr-1"></i>Status
                                </button>
                                <button onclick="generateInvoice('\${order.order_number}')" 
                                        class="btn-primary text-sm">
                                    <i class="fas fa-file-pdf mr-1"></i>Rechnung
                                </button>
                                \${certificateButton}
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
            loadOrders();
        }

        function debounceSearch() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentPage = 1;
                loadOrders();
            }, 500);
        }

        function resetFilters() {
            document.getElementById('filter-status').value = '';
            document.getElementById('filter-period').value = '';
            document.getElementById('filter-payment').value = '';
            document.getElementById('filter-min-amount').value = '';
            document.getElementById('filter-search').value = '';
            currentPage = 1;
            loadOrders();
        }

        async function viewOrder(orderNumber) {
            try {
                const res = await axios.get(\`/api/admin/orders/\${orderNumber}\`);
                const order = res.data.data;
                
                document.getElementById('modal-order-number').textContent = orderNumber;
                
                const statusClass = {
                    'pending': 'badge-pending',
                    'processing': 'badge-processing',
                    'completed': 'badge-completed',
                    'cancelled': 'badge-cancelled',
                    'refunded': 'badge-refunded'
                }[order.order_status] || 'badge-pending';
                
                const statusText = {
                    'pending': 'Ausstehend',
                    'processing': 'In Bearbeitung',
                    'completed': 'Abgeschlossen',
                    'cancelled': 'Storniert',
                    'refunded': 'Rückerstattet'
                }[order.order_status] || order.order_status;
                
                let html = \`
                    <div class="grid grid-cols-2 gap-6 mb-6">
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold mb-3">
                                <i class="fas fa-user mr-2"></i>Kundeninformationen
                            </h3>
                            <p><strong>Name:</strong> \${order.first_name} \${order.last_name}</p>
                            <p><strong>E-Mail:</strong> \${order.email}</p>
                            <p><strong>Telefon:</strong> \${order.phone || 'N/A'}</p>
                        </div>
                        
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold mb-3">
                                <i class="fas fa-info-circle mr-2"></i>Bestellinformationen
                            </h3>
                            <p><strong>Datum:</strong> \${new Date(order.created_at).toLocaleString('de-DE')}</p>
                            <p><strong>Status:</strong> <span class="badge \${statusClass}">\${statusText}</span></p>
                            <p><strong>Zahlungsmethode:</strong> \${order.payment_method || 'N/A'}</p>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="font-semibold mb-3">
                            <i class="fas fa-box mr-2"></i>Bestellte Artikel
                        </h3>
                        <div class="border rounded-lg overflow-hidden">
                            <table class="w-full">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Produkt</th>
                                        <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Menge</th>
                                        <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">Preis</th>
                                        <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">Gesamt</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y">
                \`;
                
                order.items.forEach(item => {
                    html += \`
                        <tr>
                            <td class="px-4 py-3">
                                <p class="font-medium">\${item.product_name}</p>
                                <p class="text-sm text-gray-500">SKU: \${item.product_sku}</p>
                            </td>
                            <td class="px-4 py-3 text-center">\${item.quantity}</td>
                            <td class="px-4 py-3 text-right">€\${parseFloat(item.price).toFixed(2)}</td>
                            <td class="px-4 py-3 text-right font-semibold">€\${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                        </tr>
                    \`;
                });
                
                html += \`
                                </tbody>
                                <tfoot class="bg-gray-50 font-semibold">
                                    <tr>
                                        <td colspan="3" class="px-4 py-3 text-right">Zwischensumme:</td>
                                        <td class="px-4 py-3 text-right">€\${parseFloat(order.subtotal_amount).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="px-4 py-3 text-right">MwSt (19%):</td>
                                        <td class="px-4 py-3 text-right">€\${parseFloat(order.tax_amount).toFixed(2)}</td>
                                    </tr>
                                    <tr class="text-lg">
                                        <td colspan="3" class="px-4 py-3 text-right">Gesamt:</td>
                                        <td class="px-4 py-3 text-right text-green-600">€\${parseFloat(order.total_amount).toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="font-semibold mb-3">
                            <i class="fas fa-history mr-2"></i>Bestellverlauf
                        </h3>
                        <div class="timeline">
                \`;
                
                if (order.status_history && order.status_history.length > 0) {
                    order.status_history.forEach(history => {
                        html += \`
                            <div class="timeline-item \${history.status === 'completed' ? 'completed' : ''}">
                                <p class="font-medium">\${history.status}</p>
                                <p class="text-sm text-gray-500">\${new Date(history.changed_at).toLocaleString('de-DE')}</p>
                                \${history.note ? \`<p class="text-sm text-gray-600 mt-1">\${history.note}</p>\` : ''}
                            </div>
                        \`;
                    });
                } else {
                    html += \`
                        <div class="timeline-item">
                            <p class="font-medium">Bestellung erstellt</p>
                            <p class="text-sm text-gray-500">\${new Date(order.created_at).toLocaleString('de-DE')}</p>
                        </div>
                    \`;
                }
                
                html += \`
                        </div>
                    </div>
                    
                    <div class="flex gap-3">
                        <button onclick="changeOrderStatus('\${orderNumber}')" class="btn-primary flex-1">
                            <i class="fas fa-edit mr-2"></i>Status ändern
                        </button>
                        <button onclick="sendEmail('\${orderNumber}')" class="btn-primary flex-1">
                            <i class="fas fa-envelope mr-2"></i>E-Mail senden
                        </button>
                        <button onclick="generateInvoice('\${orderNumber}')" class="btn-primary flex-1">
                            <i class="fas fa-file-pdf mr-2"></i>Rechnung erstellen
                        </button>
                    </div>
                \`;
                
                document.getElementById('order-details-content').innerHTML = html;
                document.getElementById('order-modal').classList.add('active');
            } catch (error) {
                console.error('Error loading order details:', error);
                alert('Fehler beim Laden der Bestelldetails');
            }
        }

        function closeModal() {
            document.getElementById('order-modal').classList.remove('active');
        }

        async function changeOrderStatus(orderNumber) {
            const newStatus = prompt('Neuer Status (pending, processing, completed, cancelled, refunded):');
            if (!newStatus) return;
            
            try {
                await axios.patch(\`/api/admin/orders/\${orderNumber}/status\`, { status: newStatus });
                closeModal();
                loadOrders();
                loadStats();
                alert('Status erfolgreich geändert!');
            } catch (error) {
                console.error('Error updating status:', error);
                alert('Fehler beim Ändern des Status');
            }
        }

        async function updateStatus(orderNumber) {
            const newStatus = prompt('Neuer Status (pending, processing, completed, cancelled, refunded):');
            if (!newStatus) return;
            
            try {
                await axios.patch(\`/api/admin/orders/\${orderNumber}/status\`, { status: newStatus });
                loadOrders();
                loadStats();
                alert('Status erfolgreich geändert!');
            } catch (error) {
                console.error('Error updating status:', error);
                alert('Fehler beim Ändern des Status');
            }
        }

        async function sendEmail(orderNumber) {
            const type = prompt('E-Mail Typ (confirmation, shipping, completed):');
            if (!type) return;
            
            try {
                await axios.post(\`/api/admin/orders/\${orderNumber}/email\`, { type });
                alert('E-Mail erfolgreich gesendet!');
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Fehler beim Senden der E-Mail');
            }
        }

        async function viewCertificate(certificateId) {
            try {
                // Open certificate preview in new window
                window.open(\`/admin/certificates/\${certificateId}/preview\`, '_blank');
            } catch (error) {
                console.error('Error viewing certificate:', error);
                alert('Fehler beim Anzeigen des Zertifikats');
            }
        }

        async function generateInvoice(orderNumber) {
            try {
                window.open(\`/api/admin/orders/\${orderNumber}/invoice\`, '_blank');
            } catch (error) {
                console.error('Error generating invoice:', error);
                alert('Fehler beim Erstellen der Rechnung');
            }
        }

        async function exportOrders() {
            const status = document.getElementById('filter-status').value;
            const period = document.getElementById('filter-period').value;
            
            let url = '/api/admin/orders/export?';
            if (status) url += \`status=\${status}&\`;
            if (period) url += \`period=\${period}&\`;
            
            window.location.href = url;
        }

        // Load data on page load
        loadOrders();
        loadStats();
        
        // Auto-refresh every 60 seconds
        setInterval(() => {
            loadOrders();
            loadStats();
        }, 60000);
    </script>
</body>
</html>`;
}
