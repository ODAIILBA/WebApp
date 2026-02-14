import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminCustomersFunctional() {
  const sidebar = AdminSidebarAdvanced('/admin/customers')
  
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kundenverwaltung - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="/static/admin-notifications.js"></script>
    <script src="/static/admin-utils.js"></script>
</head>
<body class="bg-gray-50">
    ${sidebar}
    
    <div class="ml-64 p-8">
        <!-- Header -->
        <div class="mb-8 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">
                    <i class="fas fa-users mr-3 text-purple-600"></i>
                    Kundenverwaltung
                </h1>
                <p class="text-gray-600 mt-2">Verwalten Sie alle Kundendaten</p>
            </div>
            <button onclick="showAddCustomerModal()" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <i class="fas fa-plus mr-2"></i>Neuer Kunde
            </button>
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
                            placeholder="Name, E-Mail, ID..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Rolle</label>
                    <select id="roleFilter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        <option value="">Alle Rollen</option>
                        <option value="customer">Kunden</option>
                        <option value="admin">Administratoren</option>
                        <option value="staff">Mitarbeiter</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select id="statusFilter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        <option value="">Alle Status</option>
                        <option value="1">Aktiv</option>
                        <option value="0">Inaktiv</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Aktionen</label>
                    <div class="flex space-x-2">
                        <button onclick="resetFilters()" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            <i class="fas fa-undo mr-2"></i>Zurücksetzen
                        </button>
                        <button onclick="exportCustomers()" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <i class="fas fa-file-export mr-2"></i>Export
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Customers Table -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <input type="checkbox" id="selectAll" class="rounded border-gray-300" />
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kunde</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-Mail</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rolle</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registriert</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody id="customersTableBody" class="bg-white divide-y divide-gray-200">
                        <!-- Customers will be loaded here -->
                    </tbody>
                </table>
            </div>
            
            <!-- Pagination -->
            <div id="paginationContainer" class="px-6 py-4 bg-gray-50 border-t border-gray-200"></div>
        </div>
    </div>

    <!-- Add/Edit Customer Modal -->
    <div id="customerModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 id="modalTitle" class="text-xl font-bold text-gray-900">Neuer Kunde</h2>
                <button onclick="closeCustomerModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <form id="customerForm" class="p-6 space-y-6">
                <input type="hidden" id="customerId" />
                
                <!-- Personal Information -->
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Persönliche Informationen</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Vorname *</label>
                            <input type="text" id="firstName" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nachname *</label>
                            <input type="text" id="lastName" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                        </div>
                    </div>
                </div>

                <!-- Account Information -->
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Kontoinformationen</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">E-Mail *</label>
                            <input type="email" id="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Passwort <span id="passwordHint" class="text-xs text-gray-500">(leer lassen für kein Update)</span></label>
                            <input type="password" id="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Rolle *</label>
                                <select id="role" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                    <option value="customer">Kunde</option>
                                    <option value="staff">Mitarbeiter</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <label class="flex items-center space-x-3 mt-3">
                                    <input type="checkbox" id="isActive" checked class="rounded border-gray-300" />
                                    <span class="text-sm text-gray-700">Aktiv</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-end space-x-3 pt-6 border-t">
                    <button type="button" onclick="closeCustomerModal()" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Abbrechen
                    </button>
                    <button type="submit" id="saveCustomerBtn" class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Speichern
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- View Customer Modal -->
    <div id="viewCustomerModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-900">Kundendetails</h2>
                <button onclick="closeViewModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div id="customerDetailContent" class="p-6"></div>
        </div>
    </div>

    <script>
        let currentPage = 1;
        let allCustomers = [];
        let editMode = false;

        document.addEventListener('DOMContentLoaded', () => {
            loadStats();
            loadCustomers();
            setupEventListeners();
        });

        function setupEventListeners() {
            document.getElementById('searchInput').addEventListener('input', AdminUtils.debounce(() => {
                currentPage = 1;
                loadCustomers();
            }, 500));

            document.getElementById('roleFilter').addEventListener('change', () => {
                currentPage = 1;
                loadCustomers();
            });
            
            document.getElementById('statusFilter').addEventListener('change', () => {
                currentPage = 1;
                loadCustomers();
            });

            document.getElementById('selectAll').addEventListener('change', (e) => {
                document.querySelectorAll('.customer-checkbox').forEach(cb => {
                    cb.checked = e.target.checked;
                });
            });

            document.getElementById('customerForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                await saveCustomer();
            });
        }

        async function loadStats() {
            try {
                const response = await AdminUtils.get('/api/admin/dashboard/stats');
                if (response.success && response.data) {
                    const stats = [
                        {
                            title: 'Alle Kunden',
                            value: response.data.customers?.total || 0,
                            icon: 'fa-users',
                            color: 'purple'
                        },
                        {
                            title: 'Aktive Kunden',
                            value: response.data.customers?.active || 0,
                            icon: 'fa-user-check',
                            color: 'green'
                        },
                        {
                            title: 'Neue (30 Tage)',
                            value: 0,
                            icon: 'fa-user-plus',
                            color: 'blue'
                        },
                        {
                            title: 'Gesamtumsatz',
                            value: AdminUtils.formatCurrency(response.data.orders?.total_revenue || 0),
                            icon: 'fa-euro-sign',
                            color: 'yellow'
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
                purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
                green: { bg: 'bg-green-100', text: 'text-green-600' },
                blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
                yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' }
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

        async function loadCustomers() {
            try {
                const search = document.getElementById('searchInput').value;
                const role = document.getElementById('roleFilter').value;
                const status = document.getElementById('statusFilter').value;

                const params = new URLSearchParams({
                    page: currentPage,
                    limit: 20
                });

                if (search) params.append('search', search);
                if (role) params.append('role', role);
                if (status) params.append('is_active', status);

                const response = await AdminUtils.get(\`/api/admin/customers?\${params.toString()}\`);
                
                if (response.success) {
                    allCustomers = response.data || [];
                    renderCustomers(allCustomers);
                    if (response.pagination) {
                        renderPagination(response.pagination);
                    }
                } else {
                    AdminNotify.error(response.error || 'Fehler beim Laden der Kunden');
                }
            } catch (error) {
                console.error('Failed to load customers:', error);
                AdminNotify.error('Fehler beim Laden der Kunden');
            }
        }

        function renderCustomers(customers) {
            const tbody = document.getElementById('customersTableBody');
            
            if (!customers || customers.length === 0) {
                tbody.innerHTML = \`
                    <tr>
                        <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                            <i class="fas fa-users text-4xl mb-3"></i>
                            <p>Keine Kunden gefunden</p>
                        </td>
                    </tr>
                \`;
                return;
            }

            tbody.innerHTML = customers.map(customer => \`
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                        <input type="checkbox" class="customer-checkbox rounded border-gray-300" data-id="\${customer.id}" />
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                        #\${customer.id}
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <span class="text-purple-600 font-semibold">\${getInitials(customer.first_name, customer.last_name)}</span>
                            </div>
                            <div class="ml-3">
                                <div class="font-medium text-gray-900">\${customer.first_name || ''} \${customer.last_name || ''}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                        \${customer.email || ''}
                    </td>
                    <td class="px-6 py-4">
                        \${getRoleBadge(customer.role)}
                    </td>
                    <td class="px-6 py-4">
                        \${getActiveBadge(customer.is_active)}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                        \${AdminUtils.formatDate(customer.created_at)}
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex space-x-2">
                            <button onclick="viewCustomer(\${customer.id})" class="text-blue-600 hover:text-blue-700" title="Details ansehen">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="editCustomer(\${customer.id})" class="text-green-600 hover:text-green-700" title="Bearbeiten">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteCustomer(\${customer.id})" class="text-red-600 hover:text-red-700" title="Löschen">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            \`).join('');
        }

        function getInitials(firstName, lastName) {
            const first = (firstName || '').charAt(0).toUpperCase();
            const last = (lastName || '').charAt(0).toUpperCase();
            return first + last || 'U';
        }

        function getRoleBadge(role) {
            const badges = {
                'customer': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Kunde</span>',
                'staff': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Mitarbeiter</span>',
                'admin': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Administrator</span>'
            };
            return badges[role] || badges.customer;
        }

        function getActiveBadge(isActive) {
            return isActive 
                ? '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"><i class="fas fa-check mr-1"></i>Aktiv</span>'
                : '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"><i class="fas fa-times mr-1"></i>Inaktiv</span>';
        }

        function renderPagination(pagination) {
            if (!pagination) return;
            
            const html = AdminUtils.createPagination(
                pagination.page,
                pagination.totalPages,
                (page) => {
                    currentPage = page;
                    loadCustomers();
                }
            );
            
            document.getElementById('paginationContainer').innerHTML = html;
        }

        function showAddCustomerModal() {
            editMode = false;
            document.getElementById('modalTitle').textContent = 'Neuer Kunde';
            document.getElementById('customerForm').reset();
            document.getElementById('customerId').value = '';
            document.getElementById('password').required = true;
            document.getElementById('passwordHint').textContent = '(erforderlich)';
            document.getElementById('customerModal').classList.remove('hidden');
        }

        function editCustomer(customerId) {
            const customer = allCustomers.find(c => c.id === customerId);
            if (!customer) return;

            editMode = true;
            document.getElementById('modalTitle').textContent = 'Kunde bearbeiten';
            document.getElementById('customerId').value = customer.id;
            document.getElementById('firstName').value = customer.first_name || '';
            document.getElementById('lastName').value = customer.last_name || '';
            document.getElementById('email').value = customer.email || '';
            document.getElementById('role').value = customer.role || 'customer';
            document.getElementById('isActive').checked = customer.is_active === 1;
            document.getElementById('password').required = false;
            document.getElementById('password').value = '';
            document.getElementById('passwordHint').textContent = '(leer lassen für kein Update)';
            
            document.getElementById('customerModal').classList.remove('hidden');
        }

        function closeCustomerModal() {
            document.getElementById('customerModal').classList.add('hidden');
            document.getElementById('customerForm').reset();
        }

        async function saveCustomer() {
            const customerId = document.getElementById('customerId').value;
            const data = {
                first_name: document.getElementById('firstName').value,
                last_name: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                role: document.getElementById('role').value,
                is_active: document.getElementById('isActive').checked ? 1 : 0
            };

            const password = document.getElementById('password').value;
            if (password) {
                data.password = password;
            }

            const saveBtn = document.getElementById('saveCustomerBtn');
            AdminUtils.showLoading(saveBtn, 'Speichern...');

            try {
                const response = customerId 
                    ? await AdminUtils.put(\`/api/admin/customers/\${customerId}\`, data)
                    : await AdminUtils.post('/api/admin/customers', data);

                if (response.success) {
                    AdminNotify.success(\`Kunde erfolgreich \${customerId ? 'aktualisiert' : 'erstellt'}\`);
                    closeCustomerModal();
                    loadCustomers();
                    loadStats();
                } else {
                    AdminNotify.error(response.error || 'Fehler beim Speichern');
                }
            } catch (error) {
                console.error('Failed to save customer:', error);
                AdminNotify.error('Fehler beim Speichern des Kunden');
            } finally {
                AdminUtils.hideLoading(saveBtn);
            }
        }

        async function viewCustomer(customerId) {
            try {
                const response = await AdminUtils.get(\`/api/admin/customers/\${customerId}\`);
                
                if (response.success && response.data) {
                    showCustomerDetail(response.data);
                } else {
                    AdminNotify.error('Fehler beim Laden der Kundendetails');
                }
            } catch (error) {
                console.error('Failed to load customer details:', error);
                AdminNotify.error('Fehler beim Laden der Kundendetails');
            }
        }

        function showCustomerDetail(customer) {
            const content = \`
                <div class="space-y-6">
                    <!-- Customer Info -->
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center">
                            <span class="text-purple-600 font-bold text-2xl">\${getInitials(customer.first_name, customer.last_name)}</span>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold text-gray-900">\${customer.first_name || ''} \${customer.last_name || ''}</h3>
                            <p class="text-gray-600">\${customer.email || ''}</p>
                            <div class="flex space-x-3 mt-2">
                                \${getRoleBadge(customer.role)}
                                \${getActiveBadge(customer.is_active)}
                            </div>
                        </div>
                    </div>

                    <!-- Account Details -->
                    <div class="border-t pt-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Kontoinformationen</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500">Kunden-ID</p>
                                <p class="mt-1 font-medium">#\${customer.id}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Rolle</p>
                                <p class="mt-1 font-medium">\${customer.role || 'customer'}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Registriert am</p>
                                <p class="mt-1 font-medium">\${AdminUtils.formatDate(customer.created_at, 'long')}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">E-Mail verifiziert</p>
                                <p class="mt-1 font-medium">\${customer.email_verified ? 'Ja' : 'Nein'}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="border-t pt-6 flex space-x-3">
                        <button onclick="editCustomer(\${customer.id}); closeViewModal();" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            <i class="fas fa-edit mr-2"></i>Bearbeiten
                        </button>
                        <button onclick="closeViewModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            Schließen
                        </button>
                    </div>
                </div>
            \`;

            document.getElementById('customerDetailContent').innerHTML = content;
            document.getElementById('viewCustomerModal').classList.remove('hidden');
        }

        function closeViewModal() {
            document.getElementById('viewCustomerModal').classList.add('hidden');
        }

        async function deleteCustomer(customerId) {
            const confirmed = await AdminUtils.confirm(
                'Möchten Sie diesen Kunden wirklich löschen? Alle zugehörigen Bestellungen bleiben erhalten.',
                'Kunde löschen'
            );

            if (!confirmed) return;

            try {
                const response = await AdminUtils.delete(\`/api/admin/customers/\${customerId}\`);
                
                if (response.success) {
                    AdminNotify.success('Kunde erfolgreich gelöscht');
                    loadCustomers();
                    loadStats();
                } else {
                    AdminNotify.error(response.error || 'Fehler beim Löschen');
                }
            } catch (error) {
                console.error('Failed to delete customer:', error);
                AdminNotify.error('Fehler beim Löschen des Kunden');
            }
        }

        function resetFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('roleFilter').value = '';
            document.getElementById('statusFilter').value = '';
            currentPage = 1;
            loadCustomers();
            AdminNotify.info('Filter zurückgesetzt');
        }

        function exportCustomers() {
            const customers = allCustomers.map(customer => ({
                'ID': customer.id,
                'Vorname': customer.first_name,
                'Nachname': customer.last_name,
                'E-Mail': customer.email,
                'Rolle': customer.role,
                'Status': customer.is_active ? 'Aktiv' : 'Inaktiv',
                'Registriert': AdminUtils.formatDate(customer.created_at)
            }));
            
            AdminUtils.exportToCSV(customers, \`customers_\${new Date().toISOString().split('T')[0]}.csv\`);
            AdminNotify.success('Kunden erfolgreich exportiert');
        }
    </script>
</body>
</html>
  `;
}
