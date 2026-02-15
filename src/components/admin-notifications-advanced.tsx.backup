import { AdminSidebar } from './admin-sidebar'

export function AdminNotificationsAdvanced() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Benachrichtigungen - Admin - SOFTWAREKING24</title>
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
        
        .notification-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.3s;
            border-left: 4px solid transparent;
        }
        
        .notification-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .notification-card.unread {
            background: #eff6ff;
            border-left-color: #3b82f6;
        }
        
        .notification-card.priority-low {
            border-left-color: #6b7280;
        }
        
        .notification-card.priority-normal {
            border-left-color: #3b82f6;
        }
        
        .notification-card.priority-high {
            border-left-color: #f59e0b;
        }
        
        .notification-card.priority-urgent {
            border-left-color: #ef4444;
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
        
        .badge-order {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .badge-refund {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .badge-license {
            background: #d1fae5;
            color: #065f46;
        }
        
        .badge-system {
            background: #e0e7ff;
            color: #3730a3;
        }
        
        .badge-customer {
            background: #fef3c7;
            color: #92400e;
        }
        
        .badge-low {
            background: #f3f4f6;
            color: #4b5563;
        }
        
        .badge-normal {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .badge-high {
            background: #fef3c7;
            color: #92400e;
        }
        
        .badge-urgent {
            background: #fee2e2;
            color: #991b1b;
        }
    </style>
</head>
<body>
    ${AdminSidebar('/admin/notifications')}
    
    <div class="admin-content">
        <div class="p-8">
            <!-- Header -->
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-bell mr-3"></i>Benachrichtigungen
                    </h1>
                    <p class="text-gray-600">Alle Systemnachrichten im Überblick</p>
                </div>
                <div class="flex gap-3">
                    <button onclick="markAllRead()" class="btn-primary">
                        <i class="fas fa-check-double mr-2"></i>Alle als gelesen markieren
                    </button>
                    <button onclick="clearAll()" class="btn-primary bg-red-600 hover:bg-red-700">
                        <i class="fas fa-trash mr-2"></i>Alle löschen
                    </button>
                </div>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Gesamt</p>
                            <p class="text-3xl font-bold text-gray-800 mt-2" id="total-notifications">0</p>
                        </div>
                        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-bell text-gray-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Ungelesen</p>
                            <p class="text-3xl font-bold text-blue-600 mt-2" id="unread-notifications">0</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-envelope text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Heute</p>
                            <p class="text-3xl font-bold text-green-600 mt-2" id="today-notifications">0</p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-calendar-day text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Dringend</p>
                            <p class="text-3xl font-bold text-red-600 mt-2" id="urgent-notifications">0</p>
                        </div>
                        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Diese Woche</p>
                            <p class="text-3xl font-bold text-purple-600 mt-2" id="week-notifications">0</p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-calendar-week text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Typ</label>
                        <select id="filter-type" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadNotifications()">
                            <option value="">Alle Typen</option>
                            <option value="order">Bestellungen</option>
                            <option value="refund">Rückerstattungen</option>
                            <option value="license">Lizenzen</option>
                            <option value="system">System</option>
                            <option value="customer">Kunden</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Priorität</label>
                        <select id="filter-priority" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadNotifications()">
                            <option value="">Alle Prioritäten</option>
                            <option value="low">Niedrig</option>
                            <option value="normal">Normal</option>
                            <option value="high">Hoch</option>
                            <option value="urgent">Dringend</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select id="filter-status" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadNotifications()">
                            <option value="">Alle Status</option>
                            <option value="unread">Ungelesen</option>
                            <option value="read">Gelesen</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Zeitraum</label>
                        <select id="filter-period" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadNotifications()">
                            <option value="">Alle</option>
                            <option value="today">Heute</option>
                            <option value="yesterday">Gestern</option>
                            <option value="week">Diese Woche</option>
                            <option value="month">Dieser Monat</option>
                        </select>
                    </div>
                </div>
                
                <div class="mt-4">
                    <button onclick="resetFilters()" class="text-sm text-gray-600 hover:text-gray-800">
                        <i class="fas fa-redo mr-1"></i>Filter zurücksetzen
                    </button>
                </div>
            </div>

            <!-- Notifications List -->
            <div id="notifications-list">
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-spinner fa-spin text-3xl mb-4"></i>
                    <p>Lade Benachrichtigungen...</p>
                </div>
            </div>
            
            <!-- Pagination -->
            <div class="mt-6" id="pagination"></div>
        </div>
    </div>

    <script>
        let notifications = [];
        let currentPage = 1;
        let totalPages = 1;

        async function loadNotifications(page = 1) {
            try {
                currentPage = page;
                const type = document.getElementById('filter-type').value;
                const priority = document.getElementById('filter-priority').value;
                const status = document.getElementById('filter-status').value;
                const period = document.getElementById('filter-period').value;
                
                let url = \`/api/admin/notifications?page=\${page}&limit=20\`;
                if (type) url += \`&type=\${type}\`;
                if (priority) url += \`&priority=\${priority}\`;
                if (status === 'unread') url += \`&unread=1\`;
                if (status === 'read') url += \`&read=1\`;
                if (period) url += \`&period=\${period}\`;
                
                const res = await axios.get(url);
                notifications = res.data.data || [];
                totalPages = res.data.pagination?.total_pages || 1;
                
                renderNotifications();
                renderPagination();
                loadStats();
            } catch (error) {
                console.error('Error loading notifications:', error);
                document.getElementById('notifications-list').innerHTML = \`
                    <div class="text-center py-12 text-red-500">
                        <i class="fas fa-exclamation-triangle text-3xl mb-4"></i>
                        <p>Fehler beim Laden der Benachrichtigungen</p>
                    </div>
                \`;
            }
        }

        async function loadStats() {
            try {
                const res = await axios.get('/api/admin/notifications/stats');
                const stats = res.data.data || {};
                
                document.getElementById('total-notifications').textContent = stats.total || 0;
                document.getElementById('unread-notifications').textContent = stats.unread || 0;
                document.getElementById('today-notifications').textContent = stats.today || 0;
                document.getElementById('urgent-notifications').textContent = stats.urgent || 0;
                document.getElementById('week-notifications').textContent = stats.this_week || 0;
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }

        function renderNotifications() {
            const container = document.getElementById('notifications-list');
            
            if (notifications.length === 0) {
                container.innerHTML = \`
                    <div class="text-center py-12 text-gray-500">
                        <i class="fas fa-bell-slash text-5xl mb-4"></i>
                        <p>Keine Benachrichtigungen gefunden</p>
                    </div>
                \`;
                return;
            }
            
            container.innerHTML = notifications.map(notif => {
                const typeClass = \`badge-\${notif.notification_type}\`;
                const priorityClass = \`badge-\${notif.priority}\`;
                const unreadClass = notif.is_read ? '' : 'unread';
                const priorityBorder = \`priority-\${notif.priority}\`;
                
                const typeLabels = {
                    'order': 'Bestellung',
                    'refund': 'Rückerstattung',
                    'license': 'Lizenz',
                    'system': 'System',
                    'customer': 'Kunde'
                };
                
                const priorityLabels = {
                    'low': 'Niedrig',
                    'normal': 'Normal',
                    'high': 'Hoch',
                    'urgent': 'Dringend'
                };
                
                const icon = {
                    'order': 'shopping-cart',
                    'refund': 'undo',
                    'license': 'key',
                    'system': 'cog',
                    'customer': 'user'
                }[notif.notification_type] || 'bell';
                
                const timeAgo = getTimeAgo(notif.created_at);
                
                return \`
                    <div class="notification-card \${unreadClass} \${priorityBorder}">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" 
                                 style="background: \${notif.is_read ? '#f3f4f6' : '#dbeafe'}">
                                <i class="fas fa-\${icon} text-xl" 
                                   style="color: \${notif.is_read ? '#6b7280' : '#3b82f6'}"></i>
                            </div>
                            
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="badge \${typeClass}">\${typeLabels[notif.notification_type] || notif.notification_type}</span>
                                    <span class="badge \${priorityClass}">\${priorityLabels[notif.priority] || notif.priority}</span>
                                    \${!notif.is_read ? '<span class="badge" style="background: #3b82f6; color: white;">Neu</span>' : ''}
                                </div>
                                
                                <h3 class="font-semibold text-lg text-gray-800 mb-1">\${notif.title}</h3>
                                <p class="text-gray-600 mb-2">\${notif.message}</p>
                                
                                <div class="flex items-center gap-4 text-sm text-gray-500">
                                    <span>
                                        <i class="fas fa-clock mr-1"></i>\${timeAgo}
                                    </span>
                                    \${notif.related_entity_type ? \`
                                        <span>
                                            <i class="fas fa-link mr-1"></i>\${notif.related_entity_type} #\${notif.related_entity_id}
                                        </span>
                                    \` : ''}
                                </div>
                            </div>
                            
                            <div class="flex flex-col gap-2">
                                \${!notif.is_read ? \`
                                    <button onclick="markAsRead(\${notif.id})" 
                                            class="px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
                                            title="Als gelesen markieren">
                                        <i class="fas fa-check"></i>
                                    </button>
                                \` : ''}
                                <button onclick="deleteNotification(\${notif.id})" 
                                        class="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                                        title="Löschen">
                                    <i class="fas fa-trash"></i>
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
            
            let html = '<div class="flex items-center justify-center gap-2">';
            
            if (currentPage > 1) {
                html += \`<button onclick="loadNotifications(\${currentPage - 1})" class="btn-primary text-sm py-2">
                    <i class="fas fa-chevron-left"></i> Zurück
                </button>\`;
            }
            
            html += \`<span class="px-4 py-2 text-sm text-gray-600">Seite \${currentPage} von \${totalPages}</span>\`;
            
            if (currentPage < totalPages) {
                html += \`<button onclick="loadNotifications(\${currentPage + 1})" class="btn-primary text-sm py-2">
                    Weiter <i class="fas fa-chevron-right"></i>
                </button>\`;
            }
            
            html += '</div>';
            container.innerHTML = html;
        }

        function getTimeAgo(dateString) {
            const now = new Date();
            const date = new Date(dateString);
            const seconds = Math.floor((now - date) / 1000);
            
            if (seconds < 60) return 'Gerade eben';
            if (seconds < 3600) return \`vor \${Math.floor(seconds / 60)} Minuten\`;
            if (seconds < 86400) return \`vor \${Math.floor(seconds / 3600)} Stunden\`;
            if (seconds < 604800) return \`vor \${Math.floor(seconds / 86400)} Tagen\`;
            
            return date.toLocaleDateString('de-DE');
        }

        async function markAsRead(id) {
            try {
                await axios.patch(\`/api/admin/notifications/\${id}/read\`);
                loadNotifications(currentPage);
            } catch (error) {
                console.error('Error marking as read:', error);
                alert('Fehler beim Markieren');
            }
        }

        async function markAllRead() {
            if (!confirm('Alle Benachrichtigungen als gelesen markieren?')) return;
            
            try {
                await axios.post('/api/admin/notifications/mark-all-read');
                loadNotifications(currentPage);
                alert('Alle Benachrichtigungen als gelesen markiert!');
            } catch (error) {
                console.error('Error marking all as read:', error);
                alert('Fehler beim Markieren');
            }
        }

        async function deleteNotification(id) {
            if (!confirm('Benachrichtigung wirklich löschen?')) return;
            
            try {
                await axios.delete(\`/api/admin/notifications/\${id}\`);
                loadNotifications(currentPage);
            } catch (error) {
                console.error('Error deleting notification:', error);
                alert('Fehler beim Löschen');
            }
        }

        async function clearAll() {
            if (!confirm('Alle Benachrichtigungen wirklich löschen?')) return;
            
            try {
                await axios.delete('/api/admin/notifications/clear-all');
                loadNotifications(currentPage);
                alert('Alle Benachrichtigungen gelöscht!');
            } catch (error) {
                console.error('Error clearing notifications:', error);
                alert('Fehler beim Löschen');
            }
        }

        function resetFilters() {
            document.getElementById('filter-type').value = '';
            document.getElementById('filter-priority').value = '';
            document.getElementById('filter-status').value = '';
            document.getElementById('filter-period').value = '';
            currentPage = 1;
            loadNotifications();
        }

        // Load notifications on page load
        loadNotifications();
        
        // Auto-refresh every 30 seconds
        setInterval(() => {
            loadNotifications(currentPage);
        }, 30000);
    </script>
</body>
</html>`;
}
