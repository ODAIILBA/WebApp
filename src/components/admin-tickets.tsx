export function AdminTickets() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Support Tickets - Admin - SOFTWAREKING24</title>
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
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .tickets-table {
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
        .status-open { background: #fef3c7; color: #92400e; }
        .status-in_progress { background: #dbeafe; color: #1e40af; }
        .status-resolved { background: #d1fae5; color: #065f46; }
        .status-closed { background: #e5e7eb; color: #374151; }
        .priority-urgent { color: #dc2626; }
        .priority-high { color: #ea580c; }
        .priority-normal { color: #2563eb; }
        .priority-low { color: #64748b; }
    </style>
</head>
<body>
    <div class="admin-header text-white p-6 mb-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">
                        <i class="fas fa-ticket-alt mr-3"></i>Support Tickets
                    </h1>
                    <p class="text-blue-100">Kundenanfragen und Support-Tickets verwalten</p>
                </div>
                <a href="/admin" class="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                    <i class="fas fa-arrow-left mr-2"></i>Zurück
                </a>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 pb-12">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Offene Tickets</span>
                    <i class="fas fa-envelope-open-text text-yellow-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="openTickets">0</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">In Bearbeitung</span>
                    <i class="fas fa-spinner text-blue-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="inProgressTickets">0</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Gelöst</span>
                    <i class="fas fa-check-circle text-green-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="resolvedTickets">0</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Heute</span>
                    <i class="fas fa-calendar-day" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="todayTickets">0</div>
            </div>
        </div>

        <!-- Tickets Table -->
        <div class="tickets-table">
            <div class="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 class="text-xl font-bold text-gray-800">
                    <i class="fas fa-list mr-2"></i>Alle Tickets
                </h2>
                <div class="flex gap-4">
                    <input type="text" id="searchInput" placeholder="Suchen..." 
                           class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <select id="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Alle Status</option>
                        <option value="open">Offen</option>
                        <option value="in_progress">In Bearbeitung</option>
                        <option value="resolved">Gelöst</option>
                        <option value="closed">Geschlossen</option>
                    </select>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ticket #</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Betreff</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kategorie</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Priorität</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Erstellt</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody id="ticketsBody" class="divide-y divide-gray-200">
                        <tr>
                            <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                                <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                                <p>Lade Tickets...</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Fetch tickets data
        async function loadTickets() {
            try {
                const response = await fetch('/api/admin/tickets');
                const data = await response.json();
                
                if (data.success) {
                    updateStatistics(data.tickets);
                    renderTickets(data.tickets);
                } else {
                    showError('Fehler beim Laden der Tickets');
                }
            } catch (error) {
                console.error('Error loading tickets:', error);
                showError('Fehler beim Laden der Tickets');
            }
        }

        function updateStatistics(tickets) {
            const stats = {
                open: tickets.filter(t => t.status === 'open').length,
                inProgress: tickets.filter(t => t.status === 'in_progress').length,
                resolved: tickets.filter(t => t.status === 'resolved').length,
                today: tickets.filter(t => {
                    const created = new Date(t.created_at);
                    const today = new Date();
                    return created.toDateString() === today.toDateString();
                }).length
            };

            document.getElementById('openTickets').textContent = stats.open;
            document.getElementById('inProgressTickets').textContent = stats.inProgress;
            document.getElementById('resolvedTickets').textContent = stats.resolved;
            document.getElementById('todayTickets').textContent = stats.today;
        }

        function renderTickets(tickets) {
            const tbody = document.getElementById('ticketsBody');
            
            if (tickets.length === 0) {
                tbody.innerHTML = \`
                    <tr>
                        <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                            <i class="fas fa-inbox text-4xl mb-2 text-gray-300"></i>
                            <p class="text-lg">Keine Tickets gefunden</p>
                        </td>
                    </tr>
                \`;
                return;
            }

            tbody.innerHTML = tickets.map(ticket => \`
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-6 py-4">
                        <span class="font-mono text-sm font-semibold text-blue-600">\${ticket.ticket_number}</span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-medium text-gray-900">\${ticket.subject}</div>
                        <div class="text-sm text-gray-500">\${ticket.customer_email || 'N/A'}</div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="text-sm text-gray-600">\${getCategoryLabel(ticket.category)}</span>
                    </td>
                    <td class="px-6 py-4">
                        <span class="status-badge status-\${ticket.status}">\${getStatusLabel(ticket.status)}</span>
                    </td>
                    <td class="px-6 py-4">
                        <i class="fas fa-flag priority-\${ticket.priority}"></i>
                        <span class="text-sm priority-\${ticket.priority} font-medium">\${getPriorityLabel(ticket.priority)}</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                        \${formatDate(ticket.created_at)}
                    </td>
                    <td class="px-6 py-4">
                        <button onclick="viewTicket('\${ticket.id}')" 
                                class="text-blue-600 hover:text-blue-800 mr-3" title="Anzeigen">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="editTicket('\${ticket.id}')" 
                                class="text-green-600 hover:text-green-800" title="Bearbeiten">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            \`).join('');
        }

        function getCategoryLabel(category) {
            const labels = {
                general: 'Allgemein',
                technical: 'Technisch',
                billing: 'Rechnung',
                license: 'Lizenz',
                other: 'Sonstiges'
            };
            return labels[category] || category;
        }

        function getStatusLabel(status) {
            const labels = {
                open: 'Offen',
                in_progress: 'In Bearbeitung',
                waiting_customer: 'Wartet auf Kunde',
                resolved: 'Gelöst',
                closed: 'Geschlossen'
            };
            return labels[status] || status;
        }

        function getPriorityLabel(priority) {
            const labels = {
                urgent: 'Dringend',
                high: 'Hoch',
                normal: 'Normal',
                low: 'Niedrig'
            };
            return labels[priority] || priority;
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

        function viewTicket(id) {
            window.location.href = \`/admin/tickets/\${id}\`;
        }

        function editTicket(id) {
            window.location.href = \`/admin/tickets/edit/\${id}\`;
        }

        function showError(message) {
            const tbody = document.getElementById('ticketsBody');
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
        document.getElementById('searchInput').addEventListener('input', filterTickets);
        document.getElementById('statusFilter').addEventListener('change', filterTickets);

        function filterTickets() {
            // Implementation for filtering
        }

        // Load tickets on page load
        loadTickets();
    </script>
</body>
</html>
  `;
}
