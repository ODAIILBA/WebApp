import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export default function AdminSupportHistory() {
  const sampleHistory = [
    {
      id: 'TICKET-1234',
      customer: 'Max Mustermann',
      email: 'max@example.com',
      subject: 'Problem mit Lizenzaktivierung',
      status: 'closed',
      priority: 'high',
      created_at: '2026-02-02 10:30:00',
      closed_at: '2026-02-02 14:45:00',
      response_time: '15 Minuten',
      resolution_time: '4 Stunden 15 Minuten',
      agent: 'support@softwareking24.de',
      messages_count: 5,
      satisfaction_rating: 5
    },
    {
      id: 'TICKET-1233',
      customer: 'Anna Schmidt',
      email: 'anna@example.com',
      subject: 'Rechnung nicht erhalten',
      status: 'closed',
      priority: 'medium',
      created_at: '2026-02-02 09:15:00',
      closed_at: '2026-02-02 10:30:00',
      response_time: '5 Minuten',
      resolution_time: '1 Stunde 15 Minuten',
      agent: 'support@softwareking24.de',
      messages_count: 3,
      satisfaction_rating: 5
    },
    {
      id: 'TICKET-1232',
      customer: 'Peter Weber',
      email: 'peter@example.com',
      subject: 'Produktschlüssel funktioniert nicht',
      status: 'closed',
      priority: 'high',
      created_at: '2026-02-01 16:20:00',
      closed_at: '2026-02-01 18:45:00',
      response_time: '10 Minuten',
      resolution_time: '2 Stunden 25 Minuten',
      agent: 'admin@softwareking24.de',
      messages_count: 7,
      satisfaction_rating: 4
    },
    {
      id: 'TICKET-1231',
      customer: 'Lisa Müller',
      email: 'lisa@example.com',
      subject: 'Frage zu Volumenlizenz',
      status: 'closed',
      priority: 'low',
      created_at: '2026-02-01 14:00:00',
      closed_at: '2026-02-01 15:30:00',
      response_time: '20 Minuten',
      resolution_time: '1 Stunde 30 Minuten',
      agent: 'support@softwareking24.de',
      messages_count: 4,
      satisfaction_rating: 5
    },
    {
      id: 'TICKET-1230',
      customer: 'Thomas Klein',
      email: 'thomas@example.com',
      subject: 'Download-Link abgelaufen',
      status: 'closed',
      priority: 'medium',
      created_at: '2026-02-01 11:30:00',
      closed_at: '2026-02-01 12:00:00',
      response_time: '8 Minuten',
      resolution_time: '30 Minuten',
      agent: 'support@softwareking24.de',
      messages_count: 2,
      satisfaction_rating: 5
    }
  ];

  const stats = {
    total_tickets: 245,
    closed_tickets: 238,
    avg_response_time: '12 Minuten',
    avg_resolution_time: '2 Stunden 45 Minuten',
    satisfaction_score: 4.7,
    tickets_today: 8,
    tickets_week: 42,
    tickets_month: 245
  };

  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Support-Historie - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        .stat-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .badge-closed {
          background: #10b981;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .badge-high {
          background: #ef4444;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .badge-medium {
          background: #f59e0b;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .badge-low {
          background: #3b82f6;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .rating-stars {
          color: #fbbf24;
        }
      </style>
    </head>
    <body class="bg-gray-50">
      <div class="flex">
        ${AdminSidebarAdvanced('/admin/support-history')}
        
        <div class="flex-1 ml-64">
          <div class="p-8">
            <!-- Header -->
            <div class="mb-8">
              <div class="flex items-center justify-between">
                <div>
                  <h1 class="text-3xl font-bold" style="color: #132C46;">
                    <i class="fas fa-history mr-3" style="color: #D9A50B;"></i>
                    Support-Historie
                  </h1>
                  <p class="text-gray-600 mt-2">Übersicht aller abgeschlossenen Support-Tickets</p>
                </div>
                <div class="flex gap-3">
                  <a href="/admin/tickets" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    <i class="fas fa-arrow-left mr-2"></i>Aktive Tickets
                  </a>
                  <button class="px-4 py-2 text-white rounded-lg hover:opacity-90" style="background: #D9A50B;">
                    <i class="fas fa-download mr-2"></i>Export
                  </button>
                </div>
              </div>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-600 text-sm">Gesamt Tickets</span>
                  <i class="fas fa-ticket-alt text-blue-600"></i>
                </div>
                <div class="text-2xl font-bold" style="color: #132C46;">${stats.total_tickets}</div>
                <div class="text-sm text-gray-500 mt-1">Diese Monat</div>
              </div>
              
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-600 text-sm">Abgeschlossen</span>
                  <i class="fas fa-check-circle text-green-600"></i>
                </div>
                <div class="text-2xl font-bold text-green-600">${stats.closed_tickets}</div>
                <div class="text-sm text-gray-500 mt-1">${((stats.closed_tickets / stats.total_tickets) * 100).toFixed(1)}% Lösungsrate</div>
              </div>
              
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-600 text-sm">Ø Reaktionszeit</span>
                  <i class="fas fa-clock text-orange-600"></i>
                </div>
                <div class="text-2xl font-bold text-orange-600">${stats.avg_response_time}</div>
                <div class="text-sm text-gray-500 mt-1">Durchschnitt</div>
              </div>
              
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-600 text-sm">Zufriedenheit</span>
                  <i class="fas fa-star" style="color: #D9A50B;"></i>
                </div>
                <div class="text-2xl font-bold" style="color: #D9A50B;">${stats.satisfaction_score}</div>
                <div class="text-sm text-gray-500 mt-1">von 5 Sternen</div>
              </div>
            </div>

            <!-- Filters -->
            <div class="bg-white rounded-lg shadow mb-6 p-4">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Zeitraum</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Letzte 7 Tage</option>
                    <option>Letzte 30 Tage</option>
                    <option selected>Letzte 90 Tage</option>
                    <option>Dieses Jahr</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Priorität</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option selected>Alle Prioritäten</option>
                    <option>Hoch</option>
                    <option>Mittel</option>
                    <option>Niedrig</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Agent</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option selected>Alle Agents</option>
                    <option>support@softwareking24.de</option>
                    <option>admin@softwareking24.de</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Suche</label>
                  <input type="text" placeholder="Ticket-ID oder Kunde..." class="w-full border border-gray-300 rounded-lg px-3 py-2">
                </div>
              </div>
            </div>

            <!-- Tickets History Table -->
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold" style="color: #132C46;">Abgeschlossene Tickets</h2>
              </div>
              
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket-ID</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kunde</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Betreff</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorität</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reaktionszeit</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lösungszeit</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bewertung</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    ${sampleHistory.map(ticket => `
                      <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <i class="fas fa-ticket-alt text-gray-400 mr-2"></i>
                            <span class="text-sm font-medium" style="color: #132C46;">${ticket.id}</span>
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <div class="text-sm font-medium text-gray-900">${ticket.customer}</div>
                          <div class="text-sm text-gray-500">${ticket.email}</div>
                        </td>
                        <td class="px-6 py-4">
                          <div class="text-sm text-gray-900 max-w-xs truncate">${ticket.subject}</div>
                          <div class="text-xs text-gray-500 mt-1">${ticket.messages_count} Nachrichten</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="badge-${ticket.priority}">${ticket.priority === 'high' ? 'Hoch' : ticket.priority === 'medium' ? 'Mittel' : 'Niedrig'}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${ticket.agent}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${ticket.response_time}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${ticket.resolution_time}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center rating-stars">
                            ${Array(5).fill(0).map((_, i) => 
                              `<i class="fas fa-star text-xs ${i < ticket.satisfaction_rating ? '' : 'text-gray-300'}"></i>`
                            ).join('')}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="badge-closed">Geschlossen</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                          <button class="text-blue-600 hover:text-blue-900 mr-3" title="Details anzeigen">
                            <i class="fas fa-eye"></i>
                          </button>
                          <button class="text-gray-600 hover:text-gray-900" title="Erneut öffnen">
                            <i class="fas fa-redo"></i>
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
              
              <!-- Pagination -->
              <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div class="text-sm text-gray-500">
                  Zeige 1 bis 5 von 238 Einträgen
                </div>
                <div class="flex gap-2">
                  <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50" disabled>
                    <i class="fas fa-chevron-left text-gray-400"></i>
                  </button>
                  <button class="px-3 py-1 border rounded text-white" style="background: #132C46; border-color: #132C46;">1</button>
                  <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
                  <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
                  <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Performance Metrics -->
            <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4" style="color: #132C46;">
                  <i class="fas fa-chart-line mr-2" style="color: #D9A50B;"></i>
                  Tickets nach Zeitraum
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Heute:</span>
                    <span class="font-semibold" style="color: #132C46;">${stats.tickets_today}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Diese Woche:</span>
                    <span class="font-semibold" style="color: #132C46;">${stats.tickets_week}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Dieser Monat:</span>
                    <span class="font-semibold" style="color: #132C46;">${stats.tickets_month}</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4" style="color: #132C46;">
                  <i class="fas fa-users mr-2" style="color: #D9A50B;"></i>
                  Top Agents
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">support@softwareking24.de</span>
                    <span class="font-semibold text-green-600">189</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">admin@softwareking24.de</span>
                    <span class="font-semibold text-green-600">49</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4" style="color: #132C46;">
                  <i class="fas fa-tags mr-2" style="color: #D9A50B;"></i>
                  Häufige Kategorien
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Lizenzaktivierung</span>
                    <span class="font-semibold" style="color: #132C46;">98</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Technischer Support</span>
                    <span class="font-semibold" style="color: #132C46;">76</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Rechnungsfragen</span>
                    <span class="font-semibold" style="color: #132C46;">64</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
