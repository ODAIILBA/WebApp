export const AdminInvoices = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Rechnungsverwaltung - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --gold: #d4af37;
        }
        .admin-sidebar {
          width: 260px;
          background: #1a2a4e;
          color: white;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 40;
        }
        .admin-content {
          margin-left: 260px;
          min-height: 100vh;
        }
        .invoice-preview {
          background: white;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        .invoice-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid var(--gold);
        }
        .invoice-section {
          margin-bottom: 30px;
        }
        .invoice-table {
          width: 100%;
          border-collapse: collapse;
        }
        .invoice-table th {
          background: var(--navy-dark);
          color: white;
          padding: 12px;
          text-align: left;
        }
        .invoice-table td {
          padding: 10px 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .invoice-table tfoot td {
          font-weight: bold;
          border-top: 2px solid var(--navy-dark);
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-draft { background: #f3f4f6; color: #6b7280; }
        .status-sent { background: #dbeafe; color: #1e40af; }
        .status-paid { background: #d1fae5; color: #065f46; }
        .status-overdue { background: #fee2e2; color: #991b1b; }
        .status-cancelled { background: #f3f4f6; color: #374151; }
        
        @media print {
          .no-print { display: none; }
          .admin-sidebar { display: none; }
          .admin-content { margin-left: 0; }
        }
      </style>
    </head>
    <body class="bg-gray-100">
      <div class="flex min-h-screen">
        ${AdminSidebar('/admin/invoices')}
        
        <div class="admin-content flex-1 p-8">
          <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="flex justify-between items-center mb-8">
              <div>
                <h1 class="text-3xl font-bold" style="color: var(--navy-dark)">
                  <i class="fas fa-file-invoice mr-3"></i>
                  Rechnungsverwaltung
                </h1>
                <p class="text-gray-600 mt-2">Verwalten Sie Ihre Rechnungen und Zahlungen</p>
              </div>
              <button onclick="showInvoiceEditor()" class="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all" style="background: var(--gold)">
                <i class="fas fa-plus mr-2"></i>Neue Rechnung
              </button>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div class="bg-white rounded-xl p-6 shadow-md">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm">Gesamt</p>
                    <p class="text-2xl font-bold" style="color: var(--navy-dark)" id="total-invoices">0</p>
                  </div>
                  <div class="bg-blue-100 p-3 rounded-lg">
                    <i class="fas fa-file-invoice text-blue-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-md">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm">Bezahlt</p>
                    <p class="text-2xl font-bold text-green-600" id="paid-count">0</p>
                  </div>
                  <div class="bg-green-100 p-3 rounded-lg">
                    <i class="fas fa-check-circle text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-md">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm">Überfällig</p>
                    <p class="text-2xl font-bold text-red-600" id="overdue-count">0</p>
                  </div>
                  <div class="bg-red-100 p-3 rounded-lg">
                    <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-md">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm">Gesamtwert</p>
                    <p class="text-2xl font-bold" style="color: var(--gold)" id="total-revenue">€0</p>
                  </div>
                  <div style="background: rgba(212, 175, 55, 0.1)" class="p-3 rounded-lg">
                    <i class="fas fa-euro-sign text-xl" style="color: var(--gold)"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Filters -->
            <div class="bg-white rounded-xl p-6 shadow-md mb-6">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select id="filter-status" onchange="loadInvoices()" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                    <option value="">Alle Status</option>
                    <option value="draft">Entwurf</option>
                    <option value="sent">Versendet</option>
                    <option value="paid">Bezahlt</option>
                    <option value="overdue">Überfällig</option>
                    <option value="cancelled">Storniert</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Suche</label>
                  <input type="text" id="search-query" onkeyup="loadInvoices()" placeholder="Rechnungsnummer, Kunde..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Von</label>
                  <input type="date" id="filter-date-from" onchange="loadInvoices()" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bis</label>
                  <input type="date" id="filter-date-to" onchange="loadInvoices()" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                </div>
              </div>
            </div>

            <!-- Invoices List -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
              <table class="w-full">
                <thead style="background: var(--navy-dark); color: white;">
                  <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Rechnungs-Nr.</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Kunde</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Datum</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Fällig am</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Betrag</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Aktionen</th>
                  </tr>
                </thead>
                <tbody id="invoices-list">
                  <tr>
                    <td colspan="7" class="px-6 py-8 text-center">
                      <i class="fas fa-spinner fa-spin text-3xl" style="color: var(--gold)"></i>
                      <p class="text-gray-500 mt-2">Lade Rechnungen...</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Invoice Editor Modal -->
      <div id="invoice-editor-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div class="min-h-screen px-4 py-8">
          <div class="bg-white rounded-2xl max-w-6xl mx-auto shadow-2xl">
            <div class="p-6 border-b flex justify-between items-center" style="background: var(--navy-dark); color: white;">
              <h2 class="text-2xl font-bold">
                <i class="fas fa-edit mr-2"></i>
                <span id="editor-title">Neue Rechnung</span>
              </h2>
              <button onclick="closeInvoiceEditor()" class="text-white hover:text-gray-300">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              <!-- Left: Form -->
              <div class="space-y-6">
                <input type="hidden" id="invoice-id">

                <!-- Customer Information -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-bold text-lg mb-4" style="color: var(--navy-dark)">
                    <i class="fas fa-user mr-2"></i>Kundeninformationen
                  </h3>
                  
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium mb-1">Name *</label>
                      <input type="text" id="customer-name" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold" placeholder="Max Mustermann">
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium mb-1">E-Mail *</label>
                      <input type="email" id="customer-email" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold" placeholder="max@example.com">
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium mb-1">Firma</label>
                      <input type="text" id="customer-company" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold" placeholder="Musterfirma GmbH">
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium mb-1">Steuernummer</label>
                      <input type="text" id="customer-tax-id" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold" placeholder="DE123456789">
                    </div>
                  </div>
                </div>

                <!-- Billing Address -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-bold text-lg mb-4" style="color: var(--navy-dark)">
                    <i class="fas fa-map-marker-alt mr-2"></i>Rechnungsadresse
                  </h3>
                  
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium mb-1">Straße & Hausnummer *</label>
                      <input type="text" id="billing-address" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold" placeholder="Musterstraße 123">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-sm font-medium mb-1">PLZ *</label>
                        <input type="text" id="billing-postal-code" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold" placeholder="10115">
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1">Stadt *</label>
                        <input type="text" id="billing-city" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold" placeholder="Berlin">
                      </div>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium mb-1">Land *</label>
                      <input type="text" id="billing-country" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold" value="Deutschland">
                    </div>
                  </div>
                </div>

                <!-- Invoice Details -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-bold text-lg mb-4" style="color: var(--navy-dark)">
                    <i class="fas fa-file-invoice mr-2"></i>Rechnungsdetails
                  </h3>
                  
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium mb-1">Rechnungsnummer *</label>
                      <input type="text" id="invoice-number" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold" placeholder="RE-2026-0001">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-sm font-medium mb-1">Rechnungsdatum *</label>
                        <input type="date" id="invoice-date" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold">
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1">Fälligkeitsdatum</label>
                        <input type="date" id="due-date" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold">
                      </div>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium mb-1">Status</label>
                      <select id="invoice-status" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold">
                        <option value="draft">Entwurf</option>
                        <option value="sent">Versendet</option>
                        <option value="paid">Bezahlt</option>
                        <option value="overdue">Überfällig</option>
                        <option value="cancelled">Storniert</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Invoice Items -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold text-lg" style="color: var(--navy-dark)">
                      <i class="fas fa-list mr-2"></i>Positionen
                    </h3>
                    <button onclick="addInvoiceItem()" class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      <i class="fas fa-plus mr-1"></i>Position
                    </button>
                  </div>
                  
                  <div id="invoice-items" class="space-y-2">
                    <!-- Items will be added here dynamically -->
                  </div>
                </div>

                <!-- Notes -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-bold text-lg mb-4" style="color: var(--navy-dark)">
                    <i class="fas fa-sticky-note mr-2"></i>Notizen & Bedingungen
                  </h3>
                  
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium mb-1">Interne Notizen</label>
                      <textarea id="invoice-notes" rows="2" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold" placeholder="Interne Bemerkungen..."></textarea>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium mb-1">Zahlungsbedingungen</label>
                      <textarea id="invoice-terms" rows="2" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold">Zahlbar innerhalb von 14 Tagen ohne Abzug.</textarea>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3">
                  <button onclick="saveInvoice('draft')" class="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold">
                    <i class="fas fa-save mr-2"></i>Als Entwurf speichern
                  </button>
                  <button onclick="saveInvoice('sent')" class="flex-1 px-4 py-3 text-white rounded-lg font-semibold hover:opacity-90" style="background: var(--gold)">
                    <i class="fas fa-paper-plane mr-2"></i>Speichern & Versenden
                  </button>
                </div>
              </div>

              <!-- Right: Live Preview -->
              <div class="bg-gray-100 p-4 rounded-lg" style="max-height: 800px; overflow-y: auto;">
                <div class="invoice-preview" id="invoice-preview">
                  <!-- Preview will be generated here -->
                  <div class="text-center text-gray-400 py-20">
                    <i class="fas fa-file-invoice text-6xl mb-4"></i>
                    <p>Fülle das Formular aus, um eine Vorschau zu sehen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="/static/auth.js"></script>
      <script>
        ${AdminSidebarScript()}
        
        let invoiceItems = [];

        // Load invoices on page load
        document.addEventListener('DOMContentLoaded', () => {
          ${AdminSidebar('/admin/invoices')}
          loadInvoices();
          loadStats();
          
          // Set default dates
          document.getElementById('invoice-date').value = new Date().toISOString().split('T')[0];
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 14);
          document.getElementById('due-date').value = dueDate.toISOString().split('T')[0];
          
          // Auto-update preview on input changes
          const formInputs = ['customer-name', 'customer-email', 'customer-company', 'billing-address', 'billing-city', 'billing-postal-code', 'invoice-number', 'invoice-date', 'due-date'];
          formInputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
              el.addEventListener('input', updatePreview);
              el.addEventListener('change', updatePreview);
            }
          });
        });

        function generateNextInvoiceNumber() {
          const year = new Date().getFullYear();
          const random = Math.floor(Math.random() * 9000) + 1000;
          return \`RE-\${year}-\${random}\`;
        }

        async function loadStats() {
          try {
            const response = await axios.get('/api/admin/invoices/stats');
            if (response.data.success) {
              const stats = response.data.data;
              document.getElementById('total-invoices').textContent = stats.total || 0;
              document.getElementById('paid-count').textContent = stats.paid || 0;
              document.getElementById('overdue-count').textContent = stats.overdue || 0;
              document.getElementById('total-revenue').textContent = \`€\${((stats.total_revenue || 0) / 100).toFixed(2)}\`;
            }
          } catch (error) {
            console.error('Error loading stats:', error);
          }
        }

        async function loadInvoices() {
          const status = document.getElementById('filter-status').value;
          const search = document.getElementById('search-query').value;
          const dateFrom = document.getElementById('filter-date-from').value;
          const dateTo = document.getElementById('filter-date-to').value;

          try {
            const params = new URLSearchParams();
            if (status) params.append('status', status);
            if (search) params.append('search', search);
            if (dateFrom) params.append('date_from', dateFrom);
            if (dateTo) params.append('date_to', dateTo);

            const response = await axios.get(\`/api/admin/invoices?\${params.toString()}\`);
            
            if (response.data.success) {
              renderInvoices(response.data.data);
            }
          } catch (error) {
            console.error('Error loading invoices:', error);
            document.getElementById('invoices-list').innerHTML = \`
              <tr>
                <td colspan="7" class="px-6 py-4 text-center text-red-600">
                  Fehler beim Laden der Rechnungen
                </td>
              </tr>
            \`;
          }
        }

        function renderInvoices(invoices) {
          const tbody = document.getElementById('invoices-list');
          
          if (invoices.length === 0) {
            tbody.innerHTML = \`
              <tr>
                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                  <i class="fas fa-inbox text-4xl mb-2"></i>
                  <p>Keine Rechnungen gefunden</p>
                </td>
              </tr>
            \`;
            return;
          }

          tbody.innerHTML = invoices.map(invoice => {
            const statusClass = \`status-\${invoice.status}\`;
            const statusText = {
              draft: 'Entwurf',
              sent: 'Versendet',
              paid: 'Bezahlt',
              overdue: 'Überfällig',
              cancelled: 'Storniert'
            }[invoice.status] || invoice.status;

            return \`
              <tr class="border-b hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <span class="font-semibold" style="color: var(--navy-dark)">\${invoice.invoice_number}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="font-medium">\${invoice.customer_name}</div>
                  <div class="text-sm text-gray-500">\${invoice.customer_email}</div>
                </td>
                <td class="px-6 py-4 text-sm">\${new Date(invoice.invoice_date).toLocaleDateString('de-DE')}</td>
                <td class="px-6 py-4 text-sm">\${invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('de-DE') : '-'}</td>
                <td class="px-6 py-4">
                  <span class="font-semibold" style="color: var(--gold)">€\${(invoice.total_amount / 100).toFixed(2)}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="status-badge \${statusClass}">\${statusText}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button onclick="viewInvoice(\${invoice.id})" class="text-blue-600 hover:text-blue-800" title="Ansehen">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="editInvoice(\${invoice.id})" class="text-yellow-600 hover:text-yellow-800" title="Bearbeiten">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="downloadInvoice(\${invoice.id})" class="text-green-600 hover:text-green-800" title="PDF Rechnung">
                      <i class="fas fa-file-pdf"></i>
                    </button>
                    <button onclick="viewCertificate(\${invoice.id})" class="text-purple-600 hover:text-purple-800" title="Lizenz-Zertifikat">
                      <i class="fas fa-certificate"></i>
                    </button>
                    <button onclick="deleteInvoice(\${invoice.id})" class="text-red-600 hover:text-red-800" title="Löschen">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            \`;
          }).join('');
        }

        function showInvoiceEditor() {
          // Reset form
          document.getElementById('invoice-id').value = '';
          document.getElementById('editor-title').textContent = 'Neue Rechnung';
          document.getElementById('invoice-number').value = generateNextInvoiceNumber();
          invoiceItems = [];
          addInvoiceItem(); // Add one default item
          
          document.getElementById('invoice-editor-modal').classList.remove('hidden');
          updatePreview();
        }

        function closeInvoiceEditor() {
          document.getElementById('invoice-editor-modal').classList.add('hidden');
        }

        async function editInvoice(id) {
          try {
            const response = await axios.get(\`/api/admin/invoices/\${id}\`);
            if (response.data.success) {
              const invoice = response.data.data;
              
              // Fill form
              document.getElementById('invoice-id').value = invoice.id;
              document.getElementById('editor-title').textContent = \`Rechnung bearbeiten: \${invoice.invoice_number}\`;
              document.getElementById('customer-name').value = invoice.customer_name;
              document.getElementById('customer-email').value = invoice.customer_email;
              document.getElementById('customer-company').value = invoice.customer_company || '';
              document.getElementById('customer-tax-id').value = invoice.customer_tax_id || '';
              document.getElementById('billing-address').value = invoice.billing_address;
              document.getElementById('billing-city').value = invoice.billing_city;
              document.getElementById('billing-postal-code').value = invoice.billing_postal_code;
              document.getElementById('billing-country').value = invoice.billing_country;
              document.getElementById('invoice-number').value = invoice.invoice_number;
              document.getElementById('invoice-date').value = invoice.invoice_date;
              document.getElementById('due-date').value = invoice.due_date || '';
              document.getElementById('invoice-status').value = invoice.status;
              document.getElementById('invoice-notes').value = invoice.notes || '';
              document.getElementById('invoice-terms').value = invoice.terms || '';
              
              // Load items
              invoiceItems = invoice.items || [];
              renderInvoiceItems();
              
              document.getElementById('invoice-editor-modal').classList.remove('hidden');
              updatePreview();
            }
          } catch (error) {
            console.error('Error loading invoice:', error);
            alert('Fehler beim Laden der Rechnung');
          }
        }

        function addInvoiceItem() {
          invoiceItems.push({
            description: '',
            quantity: 1,
            unit_price: 0,
            tax_rate: 19
          });
          renderInvoiceItems();
          updatePreview();
        }

        function removeInvoiceItem(index) {
          invoiceItems.splice(index, 1);
          renderInvoiceItems();
          updatePreview();
        }

        function renderInvoiceItems() {
          const container = document.getElementById('invoice-items');
          container.innerHTML = invoiceItems.map((item, index) => \`
            <div class="border rounded-lg p-3 bg-white">
              <div class="flex justify-between items-start mb-2">
                <span class="font-medium text-sm">Position \${index + 1}</span>
                <button onclick="removeInvoiceItem(\${index})" class="text-red-600 hover:text-red-800">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="col-span-2">
                  <input type="text" value="\${item.description}" onchange="invoiceItems[\${index}].description = this.value; updatePreview()" class="w-full px-2 py-1 border rounded text-sm" placeholder="Beschreibung">
                </div>
                <div>
                  <input type="number" value="\${item.quantity}" onchange="invoiceItems[\${index}].quantity = parseFloat(this.value); updatePreview()" class="w-full px-2 py-1 border rounded text-sm" placeholder="Menge" min="1" step="1">
                </div>
                <div>
                  <input type="number" value="\${item.unit_price / 100}" onchange="invoiceItems[\${index}].unit_price = Math.round(parseFloat(this.value) * 100); updatePreview()" class="w-full px-2 py-1 border rounded text-sm" placeholder="Preis (€)" min="0" step="0.01">
                </div>
              </div>
            </div>
          \`).join('');
        }

        function updatePreview() {
          const customerName = document.getElementById('customer-name').value;
          const customerEmail = document.getElementById('customer-email').value;
          const customerCompany = document.getElementById('customer-company').value;
          const billingAddress = document.getElementById('billing-address').value;
          const billingCity = document.getElementById('billing-city').value;
          const billingPostalCode = document.getElementById('billing-postal-code').value;
          const invoiceNumber = document.getElementById('invoice-number').value;
          const invoiceDate = document.getElementById('invoice-date').value;
          const dueDate = document.getElementById('due-date').value;

          let subtotal = 0;
          const itemsHtml = invoiceItems.map(item => {
            const lineTotal = item.quantity * item.unit_price;
            subtotal += lineTotal;
            return \`
              <tr>
                <td>\${item.description}</td>
                <td class="text-center">\${item.quantity}</td>
                <td class="text-right">€\${(item.unit_price / 100).toFixed(2)}</td>
                <td class="text-right">€\${(lineTotal / 100).toFixed(2)}</td>
              </tr>
            \`;
          }).join('');

          const taxAmount = Math.round(subtotal * 0.19);
          const total = subtotal + taxAmount;

          const preview = document.getElementById('invoice-preview');
          preview.innerHTML = \`
            <div class="invoice-header">
              <div>
                <h1 class="text-3xl font-bold" style="color: var(--navy-dark)">SOFTWAREKING24</h1>
                <p class="text-sm text-gray-600">Software & Lizenzen</p>
              </div>
              <div class="text-right">
                <h2 class="text-2xl font-bold" style="color: var(--gold)">RECHNUNG</h2>
                <p class="text-sm">\${invoiceNumber}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 class="font-bold mb-2" style="color: var(--navy-dark)">Rechnungsempfänger:</h3>
                <p class="font-semibold">\${customerName}</p>
                \${customerCompany ? \`<p>\${customerCompany}</p>\` : ''}
                <p>\${billingAddress}</p>
                <p>\${billingPostalCode} \${billingCity}</p>
                \${customerEmail ? \`<p class="text-sm text-gray-600 mt-2">\${customerEmail}</p>\` : ''}
              </div>
              <div class="text-right">
                <p><strong>Rechnungsdatum:</strong> \${invoiceDate ? new Date(invoiceDate).toLocaleDateString('de-DE') : ''}</p>
                \${dueDate ? \`<p><strong>Fällig am:</strong> \${new Date(dueDate).toLocaleDateString('de-DE')}</p>\` : ''}
              </div>
            </div>

            <table class="invoice-table mb-8">
              <thead>
                <tr>
                  <th>Beschreibung</th>
                  <th class="text-center">Menge</th>
                  <th class="text-right">Einzelpreis</th>
                  <th class="text-right">Gesamt</th>
                </tr>
              </thead>
              <tbody>
                \${itemsHtml || '<tr><td colspan="4" class="text-center text-gray-400 py-4">Keine Positionen</td></tr>'}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right">Zwischensumme:</td>
                  <td class="text-right">€\${(subtotal / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right">MwSt. (19%):</td>
                  <td class="text-right">€\${(taxAmount / 100).toFixed(2)}</td>
                </tr>
                <tr style="background: var(--navy-dark); color: white;">
                  <td colspan="3" class="text-right font-bold">Gesamtbetrag:</td>
                  <td class="text-right font-bold">€\${(total / 100).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <div class="text-sm text-gray-600 border-t pt-4">
              <p><strong>Zahlungsbedingungen:</strong> \${document.getElementById('invoice-terms').value}</p>
              <p class="mt-4 text-center" style="color: var(--gold); font-weight: 600;">Vielen Dank für Ihr Vertrauen!</p>
            </div>
          \`;
        }

        async function saveInvoice(status) {
          const invoiceData = {
            invoice_number: document.getElementById('invoice-number').value,
            customer_name: document.getElementById('customer-name').value,
            customer_email: document.getElementById('customer-email').value,
            customer_company: document.getElementById('customer-company').value,
            customer_tax_id: document.getElementById('customer-tax-id').value,
            billing_address: document.getElementById('billing-address').value,
            billing_city: document.getElementById('billing-city').value,
            billing_postal_code: document.getElementById('billing-postal-code').value,
            billing_country: document.getElementById('billing-country').value,
            invoice_date: document.getElementById('invoice-date').value,
            due_date: document.getElementById('due-date').value,
            status: status || document.getElementById('invoice-status').value,
            notes: document.getElementById('invoice-notes').value,
            terms: document.getElementById('invoice-terms').value,
            items: invoiceItems
          };

          // Validation
          if (!invoiceData.invoice_number || !invoiceData.customer_name || !invoiceData.customer_email) {
            alert('Bitte füllen Sie alle Pflichtfelder aus');
            return;
          }

          try {
            const invoiceId = document.getElementById('invoice-id').value;
            let response;

            if (invoiceId) {
              response = await axios.put(\`/api/admin/invoices/\${invoiceId}\`, invoiceData);
            } else {
              response = await axios.post('/api/admin/invoices', invoiceData);
            }

            if (response.data.success) {
              alert('Rechnung erfolgreich gespeichert!');
              closeInvoiceEditor();
              loadInvoices();
              loadStats();
            }
          } catch (error) {
            console.error('Error saving invoice:', error);
            alert('Fehler beim Speichern der Rechnung');
          }
        }

        async function viewInvoice(id) {
          window.open(\`/admin/invoices/\${id}/preview\`, '_blank');
        }

        async function downloadInvoice(id) {
          window.open(\`/admin/invoices/\${id}/preview\`, '_blank');
        }

        async function viewCertificate(id) {
          window.open(\`/admin/invoices/\${id}/certificate\`, '_blank');
        }

        async function deleteInvoice(id) {
          if (!confirm('Möchten Sie diese Rechnung wirklich löschen?')) return;

          try {
            const response = await axios.delete(\`/api/admin/invoices/\${id}\`);
            if (response.data.success) {
              alert('Rechnung gelöscht');
              loadInvoices();
              loadStats();
            }
          } catch (error) {
            console.error('Error deleting invoice:', error);
            alert('Fehler beim Löschen der Rechnung');
          }
        }
      </script>
    </body>
    </html>
  `
}

// Helper function for admin sidebar
const AdminSidebar = (currentPath: string) => {
  const items = [
    { path: '/admin', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { path: '/admin/products', icon: 'fas fa-box', label: 'Produkte' },
    { path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Bestellungen' },
    { path: '/admin/customers', icon: 'fas fa-users', label: 'Kunden' },
    { path: '/admin/invoices', icon: 'fas fa-file-invoice', label: 'Rechnungen' },
    { path: '/admin/licenses', icon: 'fas fa-key', label: 'Lizenzen' },
    { path: '/admin/sliders', icon: 'fas fa-images', label: 'Slider' },
    { path: '/admin/homepage-sections', icon: 'fas fa-home', label: 'Homepage' },
    { path: '/admin/pages', icon: 'fas fa-file-alt', label: 'Seiten' },
    { path: '/admin/footer', icon: 'fas fa-shoe-prints', label: 'Footer' },
    { path: '/admin/email-templates', icon: 'fas fa-envelope', label: 'E-Mail-Vorlagen' },
    { path: '/admin/cookies', icon: 'fas fa-cookie-bite', label: 'Cookies' },
    { path: '/admin/contact-messages', icon: 'fas fa-comments', label: 'Kontakt' },
    { path: '/admin/settings', icon: 'fas fa-cog', label: 'Einstellungen' }
  ]

  return `
    <div class="admin-sidebar">
      <div class="p-6 border-b border-gray-700">
        <h2 class="text-xl font-bold" style="color: var(--gold)">SOFTWAREKING24</h2>
        <p class="text-sm text-gray-400">Admin Panel</p>
      </div>
      <nav class="p-4" id="sidebar-nav">
        ${items.map(item => `
          <a href="${item.path}" class="admin-nav-item ${currentPath === item.path ? 'active' : ''}">
            <i class="${item.icon} w-5"></i>
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
    </div>
  `
}

const AdminSidebarScript = () => {
  return `
    // Reinject sidebar to ensure it's always present
    document.addEventListener('DOMContentLoaded', () => {
      const sidebarNav = document.getElementById('sidebar-nav');
      if (sidebarNav) {
        sidebarNav.innerHTML = \`
          <a href="/admin" class="admin-nav-item"><i class="fas fa-tachometer-alt w-5"></i><span>Dashboard</span></a>
          <a href="/admin/products" class="admin-nav-item"><i class="fas fa-box w-5"></i><span>Produkte</span></a>
          <a href="/admin/orders" class="admin-nav-item"><i class="fas fa-shopping-cart w-5"></i><span>Bestellungen</span></a>
          <a href="/admin/customers" class="admin-nav-item"><i class="fas fa-users w-5"></i><span>Kunden</span></a>
          <a href="/admin/invoices" class="admin-nav-item active"><i class="fas fa-file-invoice w-5"></i><span>Rechnungen</span></a>
          <a href="/admin/licenses" class="admin-nav-item"><i class="fas fa-key w-5"></i><span>Lizenzen</span></a>
          <a href="/admin/sliders" class="admin-nav-item"><i class="fas fa-images w-5"></i><span>Slider</span></a>
          <a href="/admin/homepage-sections" class="admin-nav-item"><i class="fas fa-home w-5"></i><span>Homepage</span></a>
          <a href="/admin/pages" class="admin-nav-item"><i class="fas fa-file-alt w-5"></i><span>Seiten</span></a>
          <a href="/admin/footer" class="admin-nav-item"><i class="fas fa-shoe-prints w-5"></i><span>Footer</span></a>
          <a href="/admin/email-templates" class="admin-nav-item"><i class="fas fa-envelope w-5"></i><span>E-Mail-Vorlagen</span></a>
          <a href="/admin/cookies" class="admin-nav-item"><i class="fas fa-cookie-bite w-5"></i><span>Cookies</span></a>
          <a href="/admin/contact-messages" class="admin-nav-item"><i class="fas fa-comments w-5"></i><span>Kontakt</span></a>
          <a href="/admin/settings" class="admin-nav-item"><i class="fas fa-cog w-5"></i><span>Einstellungen</span></a>
        \`;
      }
    });
  `
}
