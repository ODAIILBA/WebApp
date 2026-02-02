export function AdminUsers() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admins - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #132C46;
            --gold: #D9A50B;
        }
        body {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .admin-header {
            background: linear-gradient(135deg, var(--navy) 0%, #1a3a54 100%);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            border-left: 4px solid var(--gold);
        }
        .admins-table {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .status-active { background: #d1fae5; color: #065f46; }
        .status-inactive { background: #fee2e2; color: #991b1b; }
        .role-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .role-superadmin { background: #fef3c7; color: #92400e; }
        .role-admin { background: #dbeafe; color: #1e40af; }
        .role-moderator { background: #e5e7eb; color: #374151; }
    </style>
</head>
<body>
    <div class="admin-header text-white p-6 mb-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">
                        <i class="fas fa-user-shield mr-3"></i>Admins
                    </h1>
                    <p class="text-blue-100">Administrator-Benutzer verwalten</p>
                </div>
                <div class="flex gap-4">
                    <button onclick="addAdmin()" class="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                        <i class="fas fa-plus mr-2"></i>Admin hinzufügen
                    </button>
                    <a href="/admin" class="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                        <i class="fas fa-arrow-left mr-2"></i>Zurück
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 pb-12">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Gesamt Admins</span>
                    <i class="fas fa-users text-blue-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="totalAdmins">0</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Super Admins</span>
                    <i class="fas fa-crown" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="superAdmins">0</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Aktive</span>
                    <i class="fas fa-check-circle text-green-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="activeAdmins">0</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Heute Online</span>
                    <i class="fas fa-signal text-purple-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="onlineToday">0</div>
            </div>
        </div>

        <!-- Admins Table -->
        <div class="admins-table">
            <div class="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 class="text-xl font-bold text-gray-800">
                    <i class="fas fa-list mr-2"></i>Alle Administratoren
                </h2>
                <div class="flex gap-4">
                    <input type="text" id="searchInput" placeholder="Suchen..." 
                           class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <select id="roleFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Alle Rollen</option>
                        <option value="superadmin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">E-Mail</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rolle</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Letzter Login</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Erstellt</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody id="adminsBody" class="divide-y divide-gray-200">
                        <tr>
                            <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                                <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                                <p>Lade Administratoren...</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Fetch admins data
        async function loadAdmins() {
            try {
                const response = await fetch('/api/admin/users');
                const data = await response.json();
                
                if (data.success) {
                    updateStatistics(data.admins);
                    renderAdmins(data.admins);
                } else {
                    showError('Fehler beim Laden der Administratoren');
                }
            } catch (error) {
                console.error('Error loading admins:', error);
                showError('Fehler beim Laden der Administratoren');
            }
        }

        function updateStatistics(admins) {
            const stats = {
                total: admins.length,
                superAdmins: admins.filter(a => a.role === 'superadmin').length,
                active: admins.filter(a => a.is_active).length,
                onlineToday: admins.filter(a => {
                    if (!a.last_login) return false;
                    const lastLogin = new Date(a.last_login);
                    const today = new Date();
                    return lastLogin.toDateString() === today.toDateString();
                }).length
            };

            document.getElementById('totalAdmins').textContent = stats.total;
            document.getElementById('superAdmins').textContent = stats.superAdmins;
            document.getElementById('activeAdmins').textContent = stats.active;
            document.getElementById('onlineToday').textContent = stats.onlineToday;
        }

        function renderAdmins(admins) {
            const tbody = document.getElementById('adminsBody');
            
            if (admins.length === 0) {
                tbody.innerHTML = \`
                    <tr>
                        <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                            <i class="fas fa-inbox text-4xl mb-2 text-gray-300"></i>
                            <p class="text-lg">Keine Administratoren gefunden</p>
                        </td>
                    </tr>
                \`;
                return;
            }

            tbody.innerHTML = admins.map(admin => \`
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mr-3">
                                \${(admin.first_name || admin.email)[0].toUpperCase()}
                            </div>
                            <div>
                                <div class="font-medium text-gray-900">\${admin.first_name || ''} \${admin.last_name || ''}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">\${admin.email}</td>
                    <td class="px-6 py-4">
                        <span class="role-badge role-\${admin.role}">\${getRoleLabel(admin.role)}</span>
                    </td>
                    <td class="px-6 py-4">
                        <span class="status-badge status-\${admin.is_active ? 'active' : 'inactive'}">
                            \${admin.is_active ? 'Aktiv' : 'Inaktiv'}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                        \${admin.last_login ? formatDate(admin.last_login) : 'Nie'}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                        \${formatDate(admin.created_at)}
                    </td>
                    <td class="px-6 py-4">
                        <button onclick="editAdmin('\${admin.id}')" 
                                class="text-blue-600 hover:text-blue-800 mr-3" title="Bearbeiten">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="toggleAdmin('\${admin.id}', \${admin.is_active})" 
                                class="text-\${admin.is_active ? 'red' : 'green'}-600 hover:text-\${admin.is_active ? 'red' : 'green'}-800" 
                                title="\${admin.is_active ? 'Deaktivieren' : 'Aktivieren'}">
                            <i class="fas fa-\${admin.is_active ? 'ban' : 'check'}"></i>
                        </button>
                    </td>
                </tr>
            \`).join('');
        }

        function getRoleLabel(role) {
            const labels = {
                superadmin: 'Super Admin',
                admin: 'Admin',
                moderator: 'Moderator'
            };
            return labels[role] || role;
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('de-DE', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function addAdmin() {
            alert('Admin hinzufügen - Funktion wird implementiert');
        }

        function editAdmin(id) {
            window.location.href = \`/admin/admins/edit/\${id}\`;
        }

        function toggleAdmin(id, isActive) {
            if (confirm(\`Möchten Sie diesen Admin \${isActive ? 'deaktivieren' : 'aktivieren'}?\`)) {
                // API call to toggle admin status
                console.log('Toggle admin', id, !isActive);
            }
        }

        function showError(message) {
            const tbody = document.getElementById('adminsBody');
            tbody.innerHTML = \`
                <tr>
                    <td colspan="7" class="px-6 py-8 text-center text-red-500">
                        <i class="fas fa-exclamation-circle text-4xl mb-2"></i>
                        <p class="text-lg">\${message}</p>
                    </td>
                </tr>
            \`;
        }

        // Search and filter
        document.getElementById('searchInput').addEventListener('input', filterAdmins);
        document.getElementById('roleFilter').addEventListener('change', filterAdmins);

        function filterAdmins() {
            // Implementation for filtering
        }

        // Load admins on page load
        loadAdmins();
    </script>
</body>
</html>
  `;
}
