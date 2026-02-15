export const AdminContactMessages = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kontaktanfragen - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --navy-medium: #2d3e6f;
          --gold: #d4af37;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-new { background: #fee2e2; color: #dc2626; }
        .status-in-progress { background: #fef3c7; color: #d97706; }
        .status-resolved { background: #d1fae5; color: #059669; }
        .status-closed { background: #e5e7eb; color: #6b7280; }

        .message-row {
          transition: all 0.2s ease;
        }

        .message-row:hover {
          background: #f9fafb;
          transform: translateX(4px);
        }

        .priority-high { border-left: 4px solid #dc2626; }
        .priority-medium { border-left: 4px solid #d97706; }
        .priority-low { border-left: 4px solid #059669; }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          align-items: center;
          justify-content: center;
        }

        .modal.active {
          display: flex;
        }
      </style>
    </head>
    <body class="bg-gray-100">
      <!-- Admin Header -->
      <header class="bg-navy-dark text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <a href="/admin" class="flex items-center">
                <img src="/static/logo-footer.png" alt="SOFTWAREKING24" class="h-12">
              </a>
              <div>
                <h1 class="text-2xl font-bold">Admin Dashboard</h1>
                <p class="text-sm text-gray-300">Kontaktanfragen verwalten</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/" class="text-gray-300 hover:text-white transition">
                <i class="fas fa-home mr-2"></i>Zur Website
              </a>
              <a href="/admin" class="text-gray-300 hover:text-white transition">
                <i class="fas fa-tachometer-alt mr-2"></i>Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      <div class="container mx-auto px-6 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <!-- Total Messages -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Gesamt</p>
                <p class="text-3xl font-bold text-navy-dark" id="stat-total">0</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fas fa-envelope text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <!-- New Messages -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Neu</p>
                <p class="text-3xl font-bold text-red-600" id="stat-new">0</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <i class="fas fa-inbox text-red-600 text-xl"></i>
              </div>
            </div>
          </div>

          <!-- In Progress -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">In Bearbeitung</p>
                <p class="text-3xl font-bold text-yellow-600" id="stat-progress">0</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i class="fas fa-clock text-yellow-600 text-xl"></i>
              </div>
            </div>
          </div>

          <!-- Resolved -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Erledigt</p>
                <p class="text-3xl font-bold text-green-600" id="stat-resolved">0</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i class="fas fa-check-circle text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and Actions -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
              <!-- Status Filter -->
              <select id="filter-status" class="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold">
                <option value="">Alle Status</option>
                <option value="new">Neu</option>
                <option value="in_progress">In Bearbeitung</option>
                <option value="resolved">Erledigt</option>
                <option value="closed">Geschlossen</option>
              </select>

              <!-- Subject Filter -->
              <select id="filter-subject" class="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold">
                <option value="">Alle Themen</option>
                <option value="general">Allgemeine Anfrage</option>
                <option value="product">Produktfrage</option>
                <option value="order">Bestellung & Lieferung</option>
                <option value="technical">Technischer Support</option>
                <option value="license">Lizenzaktivierung</option>
                <option value="refund">Rückgabe & Erstattung</option>
                <option value="partnership">Partnerschaft</option>
                <option value="other">Sonstiges</option>
              </select>

              <!-- Priority Filter -->
              <select id="filter-priority" class="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold">
                <option value="">Alle Prioritäten</option>
                <option value="high">Hoch</option>
                <option value="medium">Mittel</option>
                <option value="low">Niedrig</option>
              </select>
            </div>

            <div class="flex items-center space-x-4">
              <!-- Search -->
              <div class="relative">
                <input
                  type="text"
                  id="search-messages"
                  placeholder="Suchen..."
                  class="px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                />
                <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>

              <!-- Refresh -->
              <button
                id="refresh-btn"
                class="px-4 py-2 bg-navy-dark text-white rounded-lg hover:bg-navy-medium transition"
              >
                <i class="fas fa-sync-alt mr-2"></i>Aktualisieren
              </button>
            </div>
          </div>
        </div>

        <!-- Messages Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    <input type="checkbox" id="select-all" class="accent-gold">
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Priorität</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Von</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Betreff</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Datum</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aktionen</th>
                </tr>
              </thead>
              <tbody id="messages-tbody" class="divide-y divide-gray-200">
                <!-- Messages will be loaded here -->
                <tr>
                  <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-spinner fa-spin text-3xl mb-3"></i>
                    <p>Lade Nachrichten...</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-600">
                Zeige <span id="showing-from">0</span> bis <span id="showing-to">0</span> von <span id="total-messages">0</span> Nachrichten
              </div>
              <div id="pagination" class="flex space-x-2">
                <!-- Pagination buttons will be added here -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message Detail Modal -->
      <div id="message-modal" class="modal">
        <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 class="text-xl font-bold text-navy-dark">Nachrichtendetails</h3>
            <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <div id="modal-content" class="p-6">
            <!-- Content will be loaded here -->
          </div>

          <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <div class="flex space-x-2">
              <button onclick="updateStatus('new')" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                <i class="fas fa-inbox mr-2"></i>Neu
              </button>
              <button onclick="updateStatus('in_progress')" class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                <i class="fas fa-clock mr-2"></i>In Bearbeitung
              </button>
              <button onclick="updateStatus('resolved')" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                <i class="fas fa-check mr-2"></i>Erledigt
              </button>
              <button onclick="updateStatus('closed')" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                <i class="fas fa-times mr-2"></i>Geschlossen
              </button>
            </div>
            <button onclick="deleteMessage()" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              <i class="fas fa-trash mr-2"></i>Löschen
            </button>
          </div>
        </div>
      </div>

      <script>
        let currentMessageId = null;
        let currentPage = 1;
        let filters = {
          status: '',
          subject: '',
          priority: '',
          search: ''
        };

        // Load messages
        async function loadMessages(page = 1) {
          try {
            const params = new URLSearchParams({
              page: page,
              limit: 20,
              ...filters
            });

            const response = await axios.get('/api/admin/contact-messages?' + params);
            const data = response.data;

            if (data.success) {
              renderMessages(data.data);
              updateStats(data.stats);
              updatePagination(data.pagination);
            }
          } catch (error) {
            console.error('Error loading messages:', error);
            showError('Fehler beim Laden der Nachrichten');
          }
        }

        // Render messages
        function renderMessages(messages) {
          const tbody = document.getElementById('messages-tbody');
          
          if (messages.length === 0) {
            tbody.innerHTML = \`
              <tr>
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  <i class="fas fa-inbox text-3xl mb-3"></i>
                  <p>Keine Nachrichten gefunden</p>
                </td>
              </tr>
            \`;
            return;
          }

          tbody.innerHTML = messages.map(msg => \`
            <tr class="message-row priority-\${msg.priority} cursor-pointer" onclick="viewMessage(\${msg.id})">
              <td class="px-6 py-4">
                <input type="checkbox" class="accent-gold message-checkbox" data-id="\${msg.id}" onclick="event.stopPropagation()">
              </td>
              <td class="px-6 py-4">
                <span class="status-badge status-\${msg.status}">\${getStatusLabel(msg.status)}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm font-semibold \${getPriorityColor(msg.priority)}">
                  <i class="fas fa-flag mr-1"></i>\${getPriorityLabel(msg.priority)}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="font-semibold text-navy-dark">\${msg.first_name} \${msg.last_name}</div>
                <div class="text-sm text-gray-500">\${msg.email}</div>
              </td>
              <td class="px-6 py-4">
                <div class="font-medium">\${getSubjectLabel(msg.subject)}</div>
                <div class="text-sm text-gray-500 truncate max-w-xs">\${msg.message}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                \${formatDate(msg.created_at)}
              </td>
              <td class="px-6 py-4">
                <button onclick="viewMessage(\${msg.id}); event.stopPropagation();" class="text-blue-600 hover:text-blue-800 mr-2">
                  <i class="fas fa-eye"></i>
                </button>
                <button onclick="deleteMessage(\${msg.id}); event.stopPropagation();" class="text-red-600 hover:text-red-800">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          \`).join('');
        }

        // View message details
        async function viewMessage(id) {
          currentMessageId = id;
          
          try {
            const response = await axios.get('/api/admin/contact-messages/' + id);
            const data = response.data;

            if (data.success) {
              const msg = data.data;
              document.getElementById('modal-content').innerHTML = \`
                <div class="space-y-6">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="text-sm font-semibold text-gray-600">Von</label>
                      <p class="text-lg font-bold text-navy-dark">\${msg.first_name} \${msg.last_name}</p>
                    </div>
                    <div>
                      <label class="text-sm font-semibold text-gray-600">E-Mail</label>
                      <p class="text-lg"><a href="mailto:\${msg.email}" class="text-gold hover:underline">\${msg.email}</a></p>
                    </div>
                    <div>
                      <label class="text-sm font-semibold text-gray-600">Telefon</label>
                      <p class="text-lg">\${msg.phone || 'Nicht angegeben'}</p>
                    </div>
                    <div>
                      <label class="text-sm font-semibold text-gray-600">Datum</label>
                      <p class="text-lg">\${formatDate(msg.created_at)}</p>
                    </div>
                  </div>

                  <div>
                    <label class="text-sm font-semibold text-gray-600">Betreff</label>
                    <p class="text-lg font-semibold text-navy-dark">\${getSubjectLabel(msg.subject)}</p>
                  </div>

                  <div class="flex space-x-4">
                    <div>
                      <label class="text-sm font-semibold text-gray-600">Status</label>
                      <p><span class="status-badge status-\${msg.status}">\${getStatusLabel(msg.status)}</span></p>
                    </div>
                    <div>
                      <label class="text-sm font-semibold text-gray-600">Priorität</label>
                      <p class="font-semibold \${getPriorityColor(msg.priority)}">
                        <i class="fas fa-flag mr-1"></i>\${getPriorityLabel(msg.priority)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label class="text-sm font-semibold text-gray-600">Nachricht</label>
                    <div class="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p class="text-gray-800 whitespace-pre-wrap">\${msg.message}</p>
                    </div>
                  </div>

                  <div>
                    <label class="text-sm font-semibold text-gray-600">Priorität ändern</label>
                    <select id="priority-select" class="mt-2 w-full px-4 py-2 border-2 border-gray-200 rounded-lg" onchange="updatePriority(\${msg.id}, this.value)">
                      <option value="low" \${msg.priority === 'low' ? 'selected' : ''}>Niedrig</option>
                      <option value="medium" \${msg.priority === 'medium' ? 'selected' : ''}>Mittel</option>
                      <option value="high" \${msg.priority === 'high' ? 'selected' : ''}>Hoch</option>
                    </select>
                  </div>

                  <div>
                    <label class="text-sm font-semibold text-gray-600">Admin-Notizen</label>
                    <textarea
                      id="admin-notes"
                      rows="4"
                      class="mt-2 w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                      placeholder="Interne Notizen hinzufügen..."
                    >\${msg.admin_notes || ''}</textarea>
                    <button onclick="saveNotes(\${msg.id})" class="mt-2 px-4 py-2 bg-navy-dark text-white rounded hover:bg-navy-medium">
                      <i class="fas fa-save mr-2"></i>Notizen speichern
                    </button>
                  </div>
                </div>
              \`;

              document.getElementById('message-modal').classList.add('active');
            }
          } catch (error) {
            console.error('Error loading message:', error);
            showError('Fehler beim Laden der Nachricht');
          }
        }

        // Update status
        async function updateStatus(status) {
          if (!currentMessageId) return;

          try {
            const response = await axios.patch('/api/admin/contact-messages/' + currentMessageId, {
              status: status
            });

            if (response.data.success) {
              showSuccess('Status erfolgreich aktualisiert');
              closeModal();
              loadMessages(currentPage);
            }
          } catch (error) {
            console.error('Error updating status:', error);
            showError('Fehler beim Aktualisieren des Status');
          }
        }

        // Update priority
        async function updatePriority(id, priority) {
          try {
            const response = await axios.patch('/api/admin/contact-messages/' + id, {
              priority: priority
            });

            if (response.data.success) {
              showSuccess('Priorität erfolgreich aktualisiert');
              loadMessages(currentPage);
            }
          } catch (error) {
            console.error('Error updating priority:', error);
            showError('Fehler beim Aktualisieren der Priorität');
          }
        }

        // Save admin notes
        async function saveNotes(id) {
          const notes = document.getElementById('admin-notes').value;

          try {
            const response = await axios.patch('/api/admin/contact-messages/' + id, {
              admin_notes: notes
            });

            if (response.data.success) {
              showSuccess('Notizen erfolgreich gespeichert');
            }
          } catch (error) {
            console.error('Error saving notes:', error);
            showError('Fehler beim Speichern der Notizen');
          }
        }

        // Delete message
        async function deleteMessage(id = currentMessageId) {
          if (!id) return;

          if (!confirm('Möchten Sie diese Nachricht wirklich löschen?')) return;

          try {
            const response = await axios.delete('/api/admin/contact-messages/' + id);

            if (response.data.success) {
              showSuccess('Nachricht erfolgreich gelöscht');
              closeModal();
              loadMessages(currentPage);
            }
          } catch (error) {
            console.error('Error deleting message:', error);
            showError('Fehler beim Löschen der Nachricht');
          }
        }

        // Helper functions
        function closeModal() {
          document.getElementById('message-modal').classList.remove('active');
          currentMessageId = null;
        }

        function updateStats(stats) {
          document.getElementById('stat-total').textContent = stats.total || 0;
          document.getElementById('stat-new').textContent = stats.new || 0;
          document.getElementById('stat-progress').textContent = stats.in_progress || 0;
          document.getElementById('stat-resolved').textContent = stats.resolved || 0;
        }

        function updatePagination(pagination) {
          document.getElementById('showing-from').textContent = pagination.from || 0;
          document.getElementById('showing-to').textContent = pagination.to || 0;
          document.getElementById('total-messages').textContent = pagination.total || 0;

          const paginationDiv = document.getElementById('pagination');
          paginationDiv.innerHTML = '';

          for (let i = 1; i <= pagination.totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = 'px-4 py-2 rounded ' + (i === pagination.page ? 'bg-gold text-white' : 'bg-white text-navy-dark hover:bg-gray-100');
            btn.onclick = () => {
              currentPage = i;
              loadMessages(i);
            };
            paginationDiv.appendChild(btn);
          }
        }

        function getStatusLabel(status) {
          const labels = {
            'new': 'Neu',
            'in_progress': 'In Bearbeitung',
            'resolved': 'Erledigt',
            'closed': 'Geschlossen'
          };
          return labels[status] || status;
        }

        function getSubjectLabel(subject) {
          const labels = {
            'general': 'Allgemeine Anfrage',
            'product': 'Produktfrage',
            'order': 'Bestellung & Lieferung',
            'technical': 'Technischer Support',
            'license': 'Lizenzaktivierung',
            'refund': 'Rückgabe & Erstattung',
            'partnership': 'Partnerschaft',
            'other': 'Sonstiges'
          };
          return labels[subject] || subject;
        }

        function getPriorityLabel(priority) {
          const labels = { 'high': 'Hoch', 'medium': 'Mittel', 'low': 'Niedrig' };
          return labels[priority] || priority;
        }

        function getPriorityColor(priority) {
          const colors = { 'high': 'text-red-600', 'medium': 'text-yellow-600', 'low': 'text-green-600' };
          return colors[priority] || 'text-gray-600';
        }

        function formatDate(dateString) {
          const date = new Date(dateString);
          return date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }

        function showSuccess(message) {
          alert(message);
        }

        function showError(message) {
          alert(message);
        }

        // Event listeners
        document.getElementById('filter-status').addEventListener('change', (e) => {
          filters.status = e.target.value;
          loadMessages(1);
        });

        document.getElementById('filter-subject').addEventListener('change', (e) => {
          filters.subject = e.target.value;
          loadMessages(1);
        });

        document.getElementById('filter-priority').addEventListener('change', (e) => {
          filters.priority = e.target.value;
          loadMessages(1);
        });

        document.getElementById('search-messages').addEventListener('input', (e) => {
          filters.search = e.target.value;
          setTimeout(() => loadMessages(1), 300);
        });

        document.getElementById('refresh-btn').addEventListener('click', () => {
          loadMessages(currentPage);
        });

        // Close modal on outside click
        document.getElementById('message-modal').addEventListener('click', (e) => {
          if (e.target.id === 'message-modal') {
            closeModal();
          }
        });

        // Initial load
        loadMessages(1);
      </script>
    </body>
    </html>
  `;
};
