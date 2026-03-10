import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminCoupons() {
  const sidebar = AdminSidebarAdvanced('/admin/coupons')

  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coupons - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
        .modal { display: none; position: fixed; z-index: 50; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4); }
        .modal.show { display: flex; align-items: center; justify-content: center; }
        .modal-content { background-color: #fefefe; padding: 2rem; border-radius: 8px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
    </style>
</head>
<body class="bg-gray-50">
    ${sidebar}
    
    <div style="margin-left: 280px; padding: 2rem;">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                    <i class="fas fa-ticket-alt mr-3 text-yellow-600"></i>
                    Rabattcoupons
                </h1>
                <p class="text-gray-600">Erstellen und verwalten Sie Rabattcodes</p>
            </div>
            <button onclick="openCouponModal()" class="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition">
                <i class="fas fa-plus mr-2"></i>Neuer Coupon
            </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" id="statsCards">
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-lg shadow p-4 mb-6">
            <div class="flex space-x-4">
                <select id="statusFilter" onchange="filterCoupons()" class="px-4 py-2 border rounded-lg">
                    <option value="">Alle Status</option>
                    <option value="active">Aktiv</option>
                    <option value="expired">Abgelaufen</option>
                    <option value="inactive">Inaktiv</option>
                </select>
                <select id="typeFilter" onchange="filterCoupons()" class="px-4 py-2 border rounded-lg">
                    <option value="">Alle Typen</option>
                    <option value="percentage">Prozent</option>
                    <option value="fixed_amount">Fester Betrag</option>
                    <option value="free_shipping">Kostenloser Versand</option>
                </select>
                <input type="text" id="searchInput" oninput="filterCoupons()" placeholder="Couponcode suchen..." class="flex-1 px-4 py-2 border rounded-lg">
            </div>
        </div>

        <!-- Coupons Table -->
        <div class="bg-white rounded-lg shadow">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beschreibung</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typ</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rabatt</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verwendet</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gültig bis</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody id="couponsTable" class="divide-y divide-gray-200">
                        <tr>
                            <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                                <i class="fas fa-spinner fa-spin mr-2"></i>Lädt Coupons...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Create/Edit Coupon Modal -->
    <div id="couponModal" class="modal">
        <div class="modal-content">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold" id="modalTitle">Neuer Coupon</h3>
                <button onclick="closeCouponModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <form id="couponForm" onsubmit="saveCoupon(event)">
                <input type="hidden" id="couponId" name="id">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Couponcode *</label>
                        <input type="text" name="code" required class="w-full px-3 py-2 border rounded-lg uppercase">
                        <p class="text-xs text-gray-500 mt-1">Wird automatisch in Großbuchstaben umgewandelt</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                        <textarea name="description" rows="2" class="w-full px-3 py-2 border rounded-lg"></textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Rabatttyp *</label>
                            <select name="discount_type" required class="w-full px-3 py-2 border rounded-lg">
                                <option value="percentage">Prozent (%)</option>
                                <option value="fixed_amount">Fester Betrag (€)</option>
                                <option value="free_shipping">Kostenloser Versand</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Rabattwert *</label>
                            <input type="number" name="discount_value" step="0.01" required class="w-full px-3 py-2 border rounded-lg">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Mindestbestellwert (€)</label>
                            <input type="number" name="minimum_order_amount" step="0.01" value="0" class="w-full px-3 py-2 border rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Max. Rabatt (€)</label>
                            <input type="number" name="maximum_discount_amount" step="0.01" class="w-full px-3 py-2 border rounded-lg">
                            <p class="text-xs text-gray-500 mt-1">Optional, nur für Prozent</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nutzungslimit</label>
                            <input type="number" name="usage_limit" class="w-full px-3 py-2 border rounded-lg">
                            <p class="text-xs text-gray-500 mt-1">Leer = unbegrenzt</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Pro Kunde</label>
                            <input type="number" name="usage_per_customer" value="1" class="w-full px-3 py-2 border rounded-lg">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Gültig ab</label>
                            <input type="datetime-local" name="valid_from" class="w-full px-3 py-2 border rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Gültig bis</label>
                            <input type="datetime-local" name="valid_until" class="w-full px-3 py-2 border rounded-lg">
                        </div>
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input type="checkbox" name="is_active" value="1" checked class="mr-2">
                            <span class="text-sm font-medium text-gray-700">Aktiv</span>
                        </label>
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-2">
                    <button type="button" onclick="closeCouponModal()" class="px-4 py-2 border rounded-lg hover:bg-gray-50">
                        Abbrechen
                    </button>
                    <button type="submit" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        let coupons = [];
        let allCoupons = [];
        let dashboardStats = null;

        // Load all data
        async function loadData() {
            try {
                await Promise.all([
                    loadDashboardStats(),
                    loadCoupons()
                ]);
            } catch (error) {
                console.error('Error loading data:', error);
                showToast('Fehler beim Laden der Daten', 'error');
            }
        }

        // Load dashboard stats
        async function loadDashboardStats() {
            try {
                const response = await axios.get('/api/coupons/stats/dashboard');
                if (response.data.success) {
                    dashboardStats = response.data.stats;
                    renderDashboardStats();
                }
            } catch (error) {
                console.error('Error loading dashboard stats:', error);
            }
        }

        // Render dashboard stats
        function renderDashboardStats() {
            if (!dashboardStats) return;

            document.getElementById('statsCards').innerHTML = \`
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Gesamt Coupons</p>
                        <i class="fas fa-ticket-alt text-2xl text-yellow-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-yellow-600">\${dashboardStats.total_coupons}</p>
                    <p class="text-sm text-gray-500 mt-2">\${dashboardStats.active_coupons} aktiv</p>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Verwendet</p>
                        <i class="fas fa-check-circle text-2xl text-green-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-green-600">\${dashboardStats.total_uses}</p>
                    <p class="text-sm text-gray-500 mt-2">Gesamt Nutzungen</p>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Rabatt gegeben</p>
                        <i class="fas fa-euro-sign text-2xl text-red-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-red-600">€\${(dashboardStats.total_discounts || 0).toFixed(2)}</p>
                    <p class="text-sm text-gray-500 mt-2">Gespart für Kunden</p>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Top Coupon</p>
                        <i class="fas fa-crown text-2xl text-purple-600"></i>
                    </div>
                    <p class="text-xl font-bold text-purple-600">\${dashboardStats.top_coupons[0]?.code || 'N/A'}</p>
                    <p class="text-sm text-gray-500 mt-2">\${dashboardStats.top_coupons[0]?.uses || 0} Nutzungen</p>
                </div>
            \`;
        }

        // Load coupons
        async function loadCoupons() {
            try {
                const response = await axios.get('/api/coupons');
                if (response.data.success) {
                    allCoupons = response.data.coupons;
                    coupons = [...allCoupons];
                    renderCoupons();
                }
            } catch (error) {
                console.error('Error loading coupons:', error);
                document.getElementById('couponsTable').innerHTML = \`
                    <tr><td colspan="8" class="px-6 py-4 text-center text-red-500">
                        <i class="fas fa-exclamation-circle mr-2"></i>Fehler beim Laden
                    </td></tr>
                \`;
            }
        }

        // Render coupons table
        function renderCoupons() {
            const table = document.getElementById('couponsTable');
            
            if (coupons.length === 0) {
                table.innerHTML = \`
                    <tr><td colspan="8" class="px-6 py-4 text-center text-gray-500">
                        Keine Coupons vorhanden
                    </td></tr>
                \`;
                return;
            }

            table.innerHTML = coupons.map(coupon => {
                const now = new Date();
                const validUntil = coupon.valid_until ? new Date(coupon.valid_until) : null;
                const isExpired = validUntil && now > validUntil;
                const isActive = coupon.is_active && !isExpired;
                
                let statusBadge = '';
                if (isExpired) {
                    statusBadge = '<span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Abgelaufen</span>';
                } else if (isActive) {
                    statusBadge = '<span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Aktiv</span>';
                } else {
                    statusBadge = '<span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Inaktiv</span>';
                }
                
                let discountDisplay = '';
                if (coupon.discount_type === 'percentage') {
                    discountDisplay = \`\${coupon.discount_value}%\`;
                } else if (coupon.discount_type === 'fixed_amount') {
                    discountDisplay = \`€\${coupon.discount_value}\`;
                } else {
                    discountDisplay = 'Versand frei';
                }
                
                const usageLimit = coupon.usage_limit || '∞';
                const validUntilStr = validUntil ? validUntil.toLocaleDateString('de-DE') : 'Unbegrenzt';
                
                return \`
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                        <div class="font-semibold text-yellow-600">\${coupon.code}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-600">\${coupon.description || '-'}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm">\${coupon.discount_type === 'percentage' ? 'Prozent' : coupon.discount_type === 'fixed_amount' ? 'Fester Betrag' : 'Versand frei'}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-semibold">\${discountDisplay}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div>\${coupon.total_uses || 0} / \${usageLimit}</div>
                        <div class="text-xs text-gray-500">€\${(coupon.total_discount_given || 0).toFixed(2)} gespart</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm">\${validUntilStr}</div>
                    </td>
                    <td class="px-6 py-4">
                        \${statusBadge}
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex space-x-2">
                            <button onclick="viewCouponUsage(\${coupon.id})" class="text-blue-600 hover:text-blue-800" title="Nutzung ansehen">
                                <i class="fas fa-chart-line"></i>
                            </button>
                            <button onclick="editCoupon(\${coupon.id})" class="text-green-600 hover:text-green-800" title="Bearbeiten">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="toggleCoupon(\${coupon.id})" class="text-purple-600 hover:text-purple-800" title="Aktivieren/Deaktivieren">
                                <i class="fas fa-toggle-\${isActive ? 'on' : 'off'}"></i>
                            </button>
                            <button onclick="deleteCoupon(\${coupon.id})" class="text-red-600 hover:text-red-800" title="Löschen">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                \`;
            }).join('');
        }

        // Filter coupons
        function filterCoupons() {
            const statusFilter = document.getElementById('statusFilter').value;
            const typeFilter = document.getElementById('typeFilter').value;
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
            coupons = allCoupons.filter(coupon => {
                const now = new Date();
                const validUntil = coupon.valid_until ? new Date(coupon.valid_until) : null;
                const isExpired = validUntil && now > validUntil;
                const isActive = coupon.is_active && !isExpired;
                
                let matchesStatus = true;
                if (statusFilter === 'active') matchesStatus = isActive;
                else if (statusFilter === 'expired') matchesStatus = isExpired;
                else if (statusFilter === 'inactive') matchesStatus = !coupon.is_active;
                
                const matchesType = !typeFilter || coupon.discount_type === typeFilter;
                const matchesSearch = !searchTerm || 
                    coupon.code.toLowerCase().includes(searchTerm) ||
                    (coupon.description && coupon.description.toLowerCase().includes(searchTerm));
                
                return matchesStatus && matchesType && matchesSearch;
            });
            
            renderCoupons();
        }

        // Modal functions
        function openCouponModal(couponId = null) {
            document.getElementById('modalTitle').textContent = couponId ? 'Coupon bearbeiten' : 'Neuer Coupon';
            document.getElementById('couponForm').reset();
            
            if (couponId) {
                const coupon = allCoupons.find(c => c.id === couponId);
                if (coupon) {
                    document.getElementById('couponId').value = coupon.id;
                    document.querySelector('[name="code"]').value = coupon.code;
                    document.querySelector('[name="description"]').value = coupon.description || '';
                    document.querySelector('[name="discount_type"]').value = coupon.discount_type;
                    document.querySelector('[name="discount_value"]').value = coupon.discount_value;
                    document.querySelector('[name="minimum_order_amount"]').value = coupon.minimum_order_amount || 0;
                    document.querySelector('[name="maximum_discount_amount"]').value = coupon.maximum_discount_amount || '';
                    document.querySelector('[name="usage_limit"]').value = coupon.usage_limit || '';
                    document.querySelector('[name="usage_per_customer"]').value = coupon.usage_per_customer || 1;
                    
                    if (coupon.valid_from) {
                        document.querySelector('[name="valid_from"]').value = coupon.valid_from.substring(0, 16);
                    }
                    if (coupon.valid_until) {
                        document.querySelector('[name="valid_until"]').value = coupon.valid_until.substring(0, 16);
                    }
                    
                    document.querySelector('[name="is_active"]').checked = coupon.is_active;
                }
            }
            
            document.getElementById('couponModal').classList.add('show');
        }

        function closeCouponModal() {
            document.getElementById('couponModal').classList.remove('show');
        }

        // Save coupon
        async function saveCoupon(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = {};
            
            formData.forEach((value, key) => {
                if (key === 'is_active') {
                    data[key] = 1;
                } else if (value) {
                    data[key] = value;
                }
            });
            
            if (!data.is_active) data.is_active = 0;

            try {
                const couponId = document.getElementById('couponId').value;
                let response;
                
                if (couponId) {
                    response = await axios.put(\`/api/coupons/\${couponId}\`, data);
                } else {
                    response = await axios.post('/api/coupons', data);
                }
                
                if (response.data.success) {
                    showToast(couponId ? 'Coupon aktualisiert' : 'Coupon erstellt', 'success');
                    closeCouponModal();
                    loadData();
                }
            } catch (error) {
                console.error('Error saving coupon:', error);
                showToast(error.response?.data?.error || 'Fehler beim Speichern', 'error');
            }
        }

        // Coupon actions
        function editCoupon(id) {
            openCouponModal(id);
        }

        async function toggleCoupon(id) {
            try {
                const response = await axios.post(\`/api/coupons/\${id}/toggle\`);
                if (response.data.success) {
                    showToast('Coupon-Status geändert', 'success');
                    loadData();
                }
            } catch (error) {
                console.error('Error toggling coupon:', error);
                showToast('Fehler beim Ändern', 'error');
            }
        }

        async function deleteCoupon(id) {
            if (!confirm('Möchten Sie diesen Coupon wirklich löschen?')) return;

            try {
                const response = await axios.delete(\`/api/coupons/\${id}\`);
                if (response.data.success) {
                    showToast('Coupon gelöscht', 'success');
                    loadData();
                }
            } catch (error) {
                console.error('Error deleting coupon:', error);
                showToast('Fehler beim Löschen', 'error');
            }
        }

        async function viewCouponUsage(id) {
            try {
                const response = await axios.get(\`/api/coupons/\${id}/usage\`);
                if (response.data.success) {
                    const usage = response.data.usage;
                    const coupon = allCoupons.find(c => c.id === id);
                    
                    let usageHtml = \`
                        <h3 class="text-lg font-semibold mb-4">Nutzungshistorie: \${coupon.code}</h3>
                        <div class="space-y-2">
                    \`;
                    
                    if (usage.length === 0) {
                        usageHtml += '<p class="text-gray-500">Noch nicht verwendet</p>';
                    } else {
                        usage.forEach(u => {
                            usageHtml += \`
                                <div class="border-b pb-2">
                                    <div class="flex justify-between">
                                        <span class="font-medium">\${u.customer_email}</span>
                                        <span class="text-green-600">-€\${u.discount_amount}</span>
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        Bestellung: €\${u.order_amount} | \${new Date(u.used_at).toLocaleString('de-DE')}
                                    </div>
                                </div>
                            \`;
                        });
                    }
                    
                    usageHtml += '</div>';
                    alert(usageHtml);
                }
            } catch (error) {
                console.error('Error fetching usage:', error);
                showToast('Fehler beim Laden der Nutzung', 'error');
            }
        }

        // Toast notification
        function showToast(message, type = 'info') {
            const colors = {
                success: 'bg-green-500',
                error: 'bg-red-500',
                info: 'bg-blue-500'
            };
            
            const toast = document.createElement('div');
            toast.className = \`fixed bottom-4 right-4 \${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50\`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => toast.remove(), 3000);
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            loadData();
        });
    </script>
</body>
</html>`;
}
