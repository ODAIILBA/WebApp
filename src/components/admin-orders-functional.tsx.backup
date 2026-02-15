import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminOrdersFunctional() {
  const sidebar = AdminSidebarAdvanced('/admin/orders')
  
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bestellverwaltung - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="/static/admin-notifications.js"></script>
    <script src="/static/admin-utils.js"></script>
    <style>
        :root {
            --navy: #0a1628;
            --navy-light: #1a2332;
            --gold: #f5a623;
        }
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-50">
    ${sidebar}
    
    <div class="ml-64 p-8">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">
                <i class="fas fa-shopping-cart mr-3 text-blue-600"></i>
                Bestellverwaltung
            </h1>
            <p class="text-gray-600 mt-2">Verwalten Sie alle Kundenbestellungen</p>
        </div>

        <!-- Stats Cards -->
        <div id="statsCards" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"></div>

        <!-- Filters & Search -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Suche</label>
                    <div class="relative">
                        <input 
                            type="text" 
                            id="searchInput" 
                            placeholder="Bestellnummer, Kunde, E-Mail..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select id="statusFilter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Alle Status</option>
                        <option value="pending">Ausstehend</option>
                        <option value="processing">In Bearbeitung</option>
                        <option value="completed">Abgeschlossen</option>
                        <option value="cancelled">Storniert</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Zahlungsstatus</label>
                    <select id="paymentFilter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Alle</option>
                        <option value="paid">Bezahlt</option>
                        <option value="pending">Ausstehend</option>
                        <option value="failed">Fehlgeschlagen</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Aktionen</label>
                    <div class="flex space-x-2">
                        <button onclick="resetFilters()" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            <i class="fas fa-undo mr-2"></i>Zurücksetzen
                        </button>
                        <button onclick="exportOrders()" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <i class="fas fa-file-export mr-2"></i>Export
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Orders Table -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <input type="checkbox" id="selectAll" class="rounded border-gray-300" />
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bestellnummer</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kunde</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Betrag</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zahlung</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody id="ordersTableBody" class="bg-white divide-y divide-gray-200">
                        <!-- Orders will be loaded here -->
                    </tbody>
                </table>
            </div>
            
            <!-- Pagination -->
            <div id="paginationContainer" class="px-6 py-4 bg-gray-50 border-t border-gray-200"></div>
        </div>
    </div>

    <!-- Order Detail Modal -->
    <div id="orderDetailModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-900">Bestelldetails</h2>
                <button onclick="closeOrderModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div id="orderDetailContent" class="p-6"></div>
        </div>
    </div>

    <!-- Edit Order Status Modal -->
    <div id="editStatusModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-md w-full">
            <div class="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-900">Status ändern</h2>
                <button onclick="closeEditModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <form id="editStatusForm" class="p-6 space-y-4">
                <input type="hidden" id="editOrderId" />
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Bestellstatus</label>
                    <select id="editOrderStatus" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                        <option value="pending">Ausstehend</option>
                        <option value="processing">In Bearbeitung</option>
                        <option value="completed">Abgeschlossen</option>
                        <option value="cancelled">Storniert</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Zahlungsstatus</label>
                    <select id="editPaymentStatus" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                        <option value="pending">Ausstehend</option>
                        <option value="paid">Bezahlt</option>
                        <option value="failed">Fehlgeschlagen</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Notizen (optional)</label>
                    <textarea id="editNotes" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" onclick="closeEditModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Abbrechen
                    </button>
                    <button type="submit" id="saveStatusBtn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Speichern
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        let currentPage = 1;
        let currentFilters = {};
        let allOrders = [];

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
            loadStats();
            loadOrders();
            setupEventListeners();
        });

        function setupEventListeners() {
            // Search with debounce
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', AdminUtils.debounce(() => {
                currentPage = 1;
                loadOrders();
            }, 500));

            // Filter changes
            document.getElementById('statusFilter').addEventListener('change', () => {
                currentPage = 1;
                loadOrders();
            });
            
            document.getElementById('paymentFilter').addEventListener('change', () => {
                currentPage = 1;
                loadOrders();
            });

            // Select all checkbox
            document.getElementById('selectAll').addEventListener('change', (e) => {
                document.querySelectorAll('.order-checkbox').forEach(cb => {
                    cb.checked = e.target.checked;
                });
            });

            // Edit form submission
            document.getElementById('editStatusForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                await updateOrderStatus();
            });
        }

        async function loadStats() {
            try {
                const response = await AdminUtils.get('/api/admin/dashboard/stats');
                if (response.success && response.data) {
                    const stats = [
                        {
                            title: 'Alle Bestellungen',
                            value: response.data.orders?.total || 0,
                            icon: 'fa-shopping-cart',
                            color: 'blue'
                        },
                        {
                            title: 'Ausstehend',
                            value: response.data.orders?.pending || 0,
                            icon: 'fa-clock',
                            color: 'yellow'
                        },
                        {
                            title: 'In Bearbeitung',
                            value: response.data.orders?.processing || 0,
                            icon: 'fa-cog',
                            color: 'purple'
                        },
                        {
                            title: 'Gesamtumsatz',
                            value: AdminUtils.formatCurrency(response.data.orders?.total_revenue || 0),
                            icon: 'fa-euro-sign',
                            color: 'green'
                        }
                    ];

                    renderStats(stats);
                }
            } catch (error) {
                console.error('Failed to load stats:', error);
            }
        }

        function renderStats(stats) {
            const colors = {
                blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
                yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
                purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
                green: { bg: 'bg-green-100', text: 'text-green-600' }
            };

            const html = stats.map(stat => {
                const color = colors[stat.color];
                return \`
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium text-gray-600">\${stat.title}</span>
                            <div class="\${color.bg} p-3 rounded-lg">
                                <i class="fas \${stat.icon} \${color.text} text-xl"></i>
                            </div>
                        </div>
                        <div class="text-2xl font-bold text-gray-900">\${stat.value}</div>
                    </div>
                \`;
            }).join('');

            document.getElementById('statsCards').innerHTML = html;
        }

        async function loadOrders() {
            try {
                const search = document.getElementById('searchInput').value;
                const status = document.getElementById('statusFilter').value;
                const paymentStatus = document.getElementById('paymentFilter').value;

                const params = new URLSearchParams({
                    page: currentPage,
                    limit: 20
                });

                if (search) params.append('search', search);
                if (status) params.append('order_status', status);
                if (paymentStatus) params.append('payment_status', paymentStatus);

                const response = await AdminUtils.get(\`/api/admin/orders?\${params.toString()}\`);
                
                if (response.success) {
                    allOrders = response.data || [];
                    renderOrders(allOrders);
                    renderPagination(response.pagination);
                } else {
                    AdminNotify.error(response.error || 'Fehler beim Laden der Bestellungen');
                }
            } catch (error) {
                console.error('Failed to load orders:', error);
                AdminNotify.error('Fehler beim Laden der Bestellungen');
            }
        }

        function renderOrders(orders) {
            const tbody = document.getElementById('ordersTableBody');
            
            if (!orders || orders.length === 0) {
                tbody.innerHTML = \`
                    <tr>
                        <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                            <i class="fas fa-inbox text-4xl mb-3"></i>
                            <p>Keine Bestellungen gefunden</p>
                        </td>
                    </tr>
                \`;
                return;
            }

            tbody.innerHTML = orders.map(order => \`
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                        <input type="checkbox" class="order-checkbox rounded border-gray-300" data-id="\${order.id}" />
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-medium text-gray-900">\${order.order_number || 'N/A'}</div>
                        <div class="text-xs text-gray-500">ID: \${order.id}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-medium text-gray-900">\${order.first_name || ''} \${order.last_name || ''}</div>
                        <div class="text-sm text-gray-500">\${order.email || ''}</div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                        \${AdminUtils.formatDate(order.created_at, 'long')}
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-medium text-gray-900">\${AdminUtils.formatCurrency(order.total || 0)}</div>
                    </td>
                    <td class="px-6 py-4">
                        \${getStatusBadge(order.order_status)}
                    </td>
                    <td class="px-6 py-4">
                        \${getPaymentBadge(order.payment_status)}
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex space-x-2">
                            <button onclick="viewOrder(\${order.id})" class="text-blue-600 hover:text-blue-700" title="Details ansehen">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="editOrder(\${order.id})" class="text-green-600 hover:text-green-700" title="Bearbeiten">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteOrder(\${order.id})" class="text-red-600 hover:text-red-700" title="Löschen">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            \`).join('');
        }

        function getStatusBadge(status) {
            const badges = {
                'pending': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Ausstehend</span>',
                'processing': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">In Bearbeitung</span>',
                'completed': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Abgeschlossen</span>',
                'cancelled': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Storniert</span>'
            };
            return badges[status] || '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Unbekannt</span>';
        }

        function getPaymentBadge(status) {
            const badges = {
                'paid': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"><i class="fas fa-check mr-1"></i>Bezahlt</span>',
                'pending': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"><i class="fas fa-clock mr-1"></i>Ausstehend</span>',
                'failed': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"><i class="fas fa-times mr-1"></i>Fehlgeschlagen</span>'
            };
            return badges[status] || '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Unbekannt</span>';
        }

        function renderPagination(pagination) {
            if (!pagination) return;
            
            const html = AdminUtils.createPagination(
                pagination.page,
                pagination.totalPages,
                (page) => {
                    currentPage = page;
                    loadOrders();
                }
            );
            
            document.getElementById('paginationContainer').innerHTML = html;
        }

        async function viewOrder(orderId) {
            try {
                const response = await AdminUtils.get(\`/api/admin/orders/\${orderId}\`);
                
                if (response.success && response.data) {
                    showOrderDetail(response.data);
                } else {
                    AdminNotify.error('Fehler beim Laden der Bestelldetails');
                }
            } catch (error) {
                console.error('Failed to load order details:', error);
                AdminNotify.error('Fehler beim Laden der Bestelldetails');
            }
        }

        function showOrderDetail(order) {
            const content = \`
                <div class="space-y-6">
                    <!-- Order Info -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <h3 class="text-sm font-medium text-gray-500">Bestellnummer</h3>
                            <p class="mt-1 text-lg font-semibold text-gray-900">\${order.order_number || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-500">Datum</h3>
                            <p class="mt-1 text-lg font-semibold text-gray-900">\${AdminUtils.formatDate(order.created_at, 'long')}</p>
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-500">Status</h3>
                            <p class="mt-1">\${getStatusBadge(order.order_status)}</p>
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-500">Zahlungsstatus</h3>
                            <p class="mt-1">\${getPaymentBadge(order.payment_status)}</p>
                        </div>
                    </div>

                    <!-- Customer Info -->
                    <div class="border-t pt-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Kundeninformationen</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500">Name</p>
                                <p class="mt-1 font-medium">\${order.first_name || ''} \${order.last_name || ''}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">E-Mail</p>
                                <p class="mt-1 font-medium">\${order.email || ''}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Order Items -->
                    <div class="border-t pt-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Bestellpositionen</h3>
                        <div class="space-y-3">
                            \${(order.items || []).map(item => \`
                                <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p class="font-medium text-gray-900">\${item.product_name || 'Produkt'}</p>
                                        <p class="text-sm text-gray-500">Menge: \${item.quantity || 1}</p>
                                    </div>
                                    <p class="font-semibold text-gray-900">\${AdminUtils.formatCurrency(item.price * item.quantity)}</p>
                                </div>
                            \`).join('') || '<p class="text-gray-500">Keine Positionen</p>'}
                        </div>
                    </div>

                    <!-- Total -->
                    <div class="border-t pt-6">
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-semibold text-gray-900">Gesamtbetrag</span>
                            <span class="text-2xl font-bold text-gray-900">\${AdminUtils.formatCurrency(order.total || 0)}</span>
                        </div>
                    </div>
                </div>
            \`;

            document.getElementById('orderDetailContent').innerHTML = content;
            document.getElementById('orderDetailModal').classList.remove('hidden');
        }

        function closeOrderModal() {
            document.getElementById('orderDetailModal').classList.add('hidden');
        }

        function editOrder(orderId) {
            const order = allOrders.find(o => o.id === orderId);
            if (!order) return;

            document.getElementById('editOrderId').value = orderId;
            document.getElementById('editOrderStatus').value = order.order_status || 'pending';
            document.getElementById('editPaymentStatus').value = order.payment_status || 'pending';
            document.getElementById('editNotes').value = order.notes || '';
            
            document.getElementById('editStatusModal').classList.remove('hidden');
        }

        function closeEditModal() {
            document.getElementById('editStatusModal').classList.add('hidden');
        }

        async function updateOrderStatus() {
            const orderId = document.getElementById('editOrderId').value;
            const orderStatus = document.getElementById('editOrderStatus').value;
            const paymentStatus = document.getElementById('editPaymentStatus').value;
            const notes = document.getElementById('editNotes').value;

            const saveBtn = document.getElementById('saveStatusBtn');
            AdminUtils.showLoading(saveBtn, 'Speichern...');

            try {
                const response = await AdminUtils.put(\`/api/admin/orders/\${orderId}\`, {
                    order_status: orderStatus,
                    payment_status: paymentStatus,
                    notes: notes
                });

                if (response.success) {
                    AdminNotify.success('Bestellstatus erfolgreich aktualisiert');
                    closeEditModal();
                    loadOrders();
                    loadStats();
                } else {
                    AdminNotify.error(response.error || 'Fehler beim Aktualisieren');
                }
            } catch (error) {
                console.error('Failed to update order:', error);
                AdminNotify.error('Fehler beim Aktualisieren des Bestellstatus');
            } finally {
                AdminUtils.hideLoading(saveBtn);
            }
        }

        async function deleteOrder(orderId) {
            const confirmed = await AdminUtils.confirm(
                'Möchten Sie diese Bestellung wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
                'Bestellung löschen'
            );

            if (!confirmed) return;

            try {
                const response = await AdminUtils.delete(\`/api/admin/orders/\${orderId}\`);
                
                if (response.success) {
                    AdminNotify.success('Bestellung erfolgreich gelöscht');
                    loadOrders();
                    loadStats();
                } else {
                    AdminNotify.error(response.error || 'Fehler beim Löschen');
                }
            } catch (error) {
                console.error('Failed to delete order:', error);
                AdminNotify.error('Fehler beim Löschen der Bestellung');
            }
        }

        function resetFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('statusFilter').value = '';
            document.getElementById('paymentFilter').value = '';
            currentPage = 1;
            loadOrders();
            AdminNotify.info('Filter zurückgesetzt');
        }

        function exportOrders() {
            const orders = allOrders.map(order => ({
                'Bestellnummer': order.order_number,
                'Datum': AdminUtils.formatDate(order.created_at),
                'Kunde': order.first_name + ' ' + order.last_name,
                'E-Mail': order.email,
                'Betrag': order.total,
                'Status': order.order_status,
                'Zahlung': order.payment_status
            }));
            
            const today = new Date().toISOString().split('T')[0];
            AdminUtils.exportToCSV(orders, 'orders_' + today + '.csv');
            AdminNotify.success('Bestellungen erfolgreich exportiert');
        }
    </script>
</body>
</html>`;
}
