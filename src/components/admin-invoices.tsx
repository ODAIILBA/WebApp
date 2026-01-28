import type { FC } from 'hono/jsx'

export const AdminInvoices: FC = () => {
  return (
    <div class="admin-invoices">
      <div class="admin-header">
        <h2><i class="fas fa-file-invoice"></i> Invoice Management</h2>
        <button class="btn-primary" onclick="createNewInvoice()">
          <i class="fas fa-plus"></i> Create Invoice
        </button>
      </div>

      {/* Invoice List */}
      <div class="admin-card" style="margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
          <input 
            type="text" 
            id="search-invoice" 
            placeholder="Search invoices..." 
            class="form-control"
            onkeyup="filterInvoices()"
          />
          <select id="filter-status" class="form-control" onchange="filterInvoices()">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="invoices-tbody"></tbody>
          </table>
        </div>
      </div>

      {/* Invoice Editor Modal */}
      <div id="invoice-editor-modal" class="modal">
        <div class="modal-content" style="max-width: 1200px;">
          <div class="modal-header">
            <h3><i class="fas fa-file-invoice"></i> Invoice Editor</h3>
            <button class="modal-close" onclick="closeInvoiceEditor()">&times;</button>
          </div>
          <div class="modal-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
              {/* Left: Invoice Form */}
              <div>
                <h4>Invoice Details</h4>
                <div class="form-group">
                  <label>Invoice Number</label>
                  <input type="text" id="invoice-number" class="form-control" placeholder="INV-2024-001" />
                </div>
                <div class="form-group">
                  <label>Customer Email</label>
                  <input type="email" id="invoice-customer" class="form-control" placeholder="customer@example.com" />
                </div>
                <div class="form-group">
                  <label>Customer Name</label>
                  <input type="text" id="invoice-customer-name" class="form-control" placeholder="Max Mustermann" />
                </div>
                <div class="form-group">
                  <label>Issue Date</label>
                  <input type="date" id="invoice-date" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Due Date</label>
                  <input type="date" id="invoice-due-date" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Items</label>
                  <div id="invoice-items"></div>
                  <button class="btn-secondary" onclick="addInvoiceItem()">
                    <i class="fas fa-plus"></i> Add Item
                  </button>
                </div>
                <div class="form-group">
                  <label>VAT Rate (%)</label>
                  <input type="number" id="invoice-vat" class="form-control" value="19" step="0.01" />
                </div>
                <div class="form-group">
                  <label>Notes</label>
                  <textarea id="invoice-notes" class="form-control" rows="3" placeholder="Payment terms, additional notes..."></textarea>
                </div>
                
                <div style="margin-top: 20px;">
                  <button class="btn-primary" onclick="generateInvoicePreview()">
                    <i class="fas fa-eye"></i> Preview
                  </button>
                  <button class="btn-success" onclick="saveInvoice()">
                    <i class="fas fa-save"></i> Save Invoice
                  </button>
                </div>
              </div>

              {/* Right: Preview */}
              <div>
                <h4>Preview</h4>
                <div id="invoice-preview" style="border: 1px solid #ddd; padding: 20px; background: white; min-height: 500px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HTML Template Editor Modal */}
      <div id="template-editor-modal" class="modal">
        <div class="modal-content" style="max-width: 1400px;">
          <div class="modal-header">
            <h3><i class="fas fa-code"></i> Invoice Template Editor</h3>
            <button class="modal-close" onclick="closeTemplateEditor()">&times;</button>
          </div>
          <div class="modal-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              {/* HTML Editor */}
              <div>
                <h4>HTML Template</h4>
                <p style="font-size: 12px; color: #666; margin-bottom: 10px;">
                  Available variables: {'{'}{'{'} invoiceNumber {'}'}{'}'},  {'{'}{'{'} customerName {'}'}{'}'},  {'{'}{'{'} customerEmail {'}'}{'}'},  {'{'}{'{'} invoiceDate {'}'}{'}'},  {'{'}{'{'} dueDate {'}'}{'}'},  {'{'}{'{'} items {'}'}{'}'},  {'{'}{'{'} subtotal {'}'}{'}'},  {'{'}{'{'} vat {'}'}{'}'},  {'{'}{'{'} total {'}'}{'}'},  {'{'}{'{'} notes {'}'}{'}'} 
                </p>
                <textarea 
                  id="template-html" 
                  class="code-editor"
                  rows="25"
                  spellcheck="false"
                ></textarea>
                <div style="margin-top: 10px;">
                  <button class="btn-primary" onclick="previewTemplate()">
                    <i class="fas fa-eye"></i> Preview Template
                  </button>
                  <button class="btn-success" onclick="saveTemplate()">
                    <i class="fas fa-save"></i> Save Template
                  </button>
                  <button class="btn-secondary" onclick="resetToDefault()">
                    <i class="fas fa-undo"></i> Reset to Default
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div>
                <h4>Template Preview</h4>
                <div id="template-preview" style="border: 1px solid #ddd; padding: 20px; background: white; min-height: 600px; overflow-y: auto;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-invoices {
          padding: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #1a2a4e;
        }
        .form-control {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }
        .btn-secondary {
          background: #6c757d;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }
        .btn-success {
          background: #28a745;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          margin-left: 10px;
        }
        .code-editor {
          width: 100%;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background: #f8f9fa;
        }
        .invoice-item {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap: 10px;
          margin-bottom: 10px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 5px;
        }
        .invoice-item input {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 3px;
        }
        .invoice-item button {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 3px;
          cursor: pointer;
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        let invoicesData = [];
        let currentInvoiceTemplate = '';
        
        // Default invoice HTML template
        const defaultInvoiceTemplate = \`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }
    .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 3px solid #1a2a4e; padding-bottom: 20px; }
    .company-info { color: #1a2a4e; }
    .company-info h1 { margin: 0; color: #d4af37; }
    .invoice-details { text-align: right; }
    .invoice-details h2 { margin: 0; color: #1a2a4e; }
    .customer-info { margin-bottom: 30px; padding: 15px; background: #f8f9fa; border-left: 4px solid #d4af37; }
    table { width: 100%; border-collapse: collapse; margin: 30px 0; }
    th { background: #1a2a4e; color: white; padding: 12px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    .totals { text-align: right; margin-top: 20px; }
    .totals table { width: 300px; margin-left: auto; }
    .total-row { font-weight: bold; font-size: 18px; color: #1a2a4e; }
    .notes { margin-top: 40px; padding: 15px; background: #fff9e6; border-left: 4px solid #d4af37; }
    .footer { margin-top: 60px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="invoice-header">
      <div class="company-info">
        <h1>Premium Software Store</h1>
        <p>Musterstraße 123<br>12345 Berlin, Deutschland<br>Tel: +49 30 12345678<br>Email: info@premium-software.de</p>
      </div>
      <div class="invoice-details">
        <h2>RECHNUNG</h2>
        <p><strong>Rechnungsnummer:</strong> {{invoiceNumber}}<br><strong>Datum:</strong> {{invoiceDate}}<br><strong>Fälligkeitsdatum:</strong> {{dueDate}}</p>
      </div>
    </div>
    
    <div class="customer-info">
      <strong>Rechnungsempfänger:</strong><br>
      {{customerName}}<br>
      {{customerEmail}}
    </div>
    
    <table>
      <thead>
        <tr>
          <th>Artikel</th>
          <th style="text-align: right;">Menge</th>
          <th style="text-align: right;">Einzelpreis</th>
          <th style="text-align: right;">Gesamt</th>
        </tr>
      </thead>
      <tbody>
        {{items}}
      </tbody>
    </table>
    
    <div class="totals">
      <table>
        <tr>
          <td>Zwischensumme:</td>
          <td style="text-align: right;">€{{subtotal}}</td>
        </tr>
        <tr>
          <td>MwSt ({{vatRate}}%):</td>
          <td style="text-align: right;">€{{vat}}</td>
        </tr>
        <tr class="total-row">
          <td>Gesamtbetrag:</td>
          <td style="text-align: right;">€{{total}}</td>
        </tr>
      </table>
    </div>
    
    {{#if notes}}
    <div class="notes">
      <strong>Anmerkungen:</strong><br>
      {{notes}}
    </div>
    {{/if}}
    
    <div class="footer">
      <p>Zahlbar innerhalb von 14 Tagen nach Rechnungsdatum.<br>Vielen Dank für Ihren Einkauf!</p>
    </div>
  </div>
</body>
</html>
\`;
        
        function loadInvoices() {
          // Demo invoices
          invoicesData = [
            {
              id: 1,
              invoiceNumber: 'INV-2024-001',
              customer: 'Max Mustermann',
              email: 'max@example.com',
              date: '2024-01-15',
              dueDate: '2024-01-29',
              amount: 299.99,
              status: 'paid'
            },
            {
              id: 2,
              invoiceNumber: 'INV-2024-002',
              customer: 'Anna Schmidt',
              email: 'anna@example.com',
              date: '2024-01-20',
              dueDate: '2024-02-03',
              amount: 149.99,
              status: 'sent'
            },
            {
              id: 3,
              invoiceNumber: 'INV-2024-003',
              customer: 'Peter Müller',
              email: 'peter@example.com',
              date: '2024-01-10',
              dueDate: '2024-01-24',
              amount: 499.99,
              status: 'overdue'
            }
          ];
          
          renderInvoices(invoicesData);
          currentInvoiceTemplate = localStorage.getItem('invoiceTemplate') || defaultInvoiceTemplate;
        }
        
        function renderInvoices(invoices) {
          const tbody = document.getElementById('invoices-tbody');
          tbody.innerHTML = invoices.map(inv => \`
            <tr>
              <td><strong>\${inv.invoiceNumber}</strong></td>
              <td>\${inv.customer}</td>
              <td>\${new Date(inv.date).toLocaleDateString('de-DE')}</td>
              <td>\${new Date(inv.dueDate).toLocaleDateString('de-DE')}</td>
              <td>€\${inv.amount.toFixed(2)}</td>
              <td><span class="status-badge status-\${inv.status}">\${inv.status.toUpperCase()}</span></td>
              <td>
                <button class="action-btn btn-view" onclick="viewInvoice(\${inv.id})">
                  <i class="fas fa-eye"></i> View
                </button>
                <button class="action-btn btn-edit" onclick="editInvoice(\${inv.id})">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn" style="background: #17a2b8; color: white;" onclick="downloadInvoice(\${inv.id})">
                  <i class="fas fa-download"></i> PDF
                </button>
              </td>
            </tr>
          \`).join('');
        }
        
        function filterInvoices() {
          const search = document.getElementById('search-invoice').value.toLowerCase();
          const status = document.getElementById('filter-status').value;
          
          let filtered = invoicesData.filter(inv => {
            const matchesSearch = !search || 
              inv.invoiceNumber.toLowerCase().includes(search) ||
              inv.customer.toLowerCase().includes(search);
            const matchesStatus = !status || inv.status === status;
            return matchesSearch && matchesStatus;
          });
          
          renderInvoices(filtered);
        }
        
        function createNewInvoice() {
          document.getElementById('invoice-number').value = 'INV-' + new Date().getFullYear() + '-' + String(invoicesData.length + 1).padStart(3, '0');
          document.getElementById('invoice-date').value = new Date().toISOString().split('T')[0];
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 14);
          document.getElementById('invoice-due-date').value = dueDate.toISOString().split('T')[0];
          document.getElementById('invoice-items').innerHTML = '';
          addInvoiceItem();
          document.getElementById('invoice-editor-modal').style.display = 'block';
        }
        
        function addInvoiceItem() {
          const itemsContainer = document.getElementById('invoice-items');
          const itemId = Date.now();
          const itemHtml = \`
            <div class="invoice-item" id="item-\${itemId}">
              <input type="text" placeholder="Description" class="item-desc" />
              <input type="number" placeholder="Qty" class="item-qty" value="1" min="1" />
              <input type="number" placeholder="Price" class="item-price" value="0" step="0.01" />
              <button onclick="removeInvoiceItem(\${itemId})"><i class="fas fa-times"></i></button>
            </div>
          \`;
          itemsContainer.insertAdjacentHTML('beforeend', itemHtml);
        }
        
        function removeInvoiceItem(itemId) {
          document.getElementById('item-' + itemId).remove();
        }
        
        function generateInvoicePreview() {
          const data = collectInvoiceData();
          const html = renderInvoiceTemplate(currentInvoiceTemplate, data);
          document.getElementById('invoice-preview').innerHTML = html;
        }
        
        function collectInvoiceData() {
          const items = [];
          document.querySelectorAll('.invoice-item').forEach(item => {
            const desc = item.querySelector('.item-desc').value;
            const qty = parseFloat(item.querySelector('.item-qty').value) || 0;
            const price = parseFloat(item.querySelector('.item-price').value) || 0;
            if (desc && qty && price) {
              items.push({ description: desc, quantity: qty, price: price, total: qty * price });
            }
          });
          
          const subtotal = items.reduce((sum, item) => sum + item.total, 0);
          const vatRate = parseFloat(document.getElementById('invoice-vat').value) || 0;
          const vat = subtotal * (vatRate / 100);
          const total = subtotal + vat;
          
          return {
            invoiceNumber: document.getElementById('invoice-number').value,
            customerName: document.getElementById('invoice-customer-name').value,
            customerEmail: document.getElementById('invoice-customer').value,
            invoiceDate: new Date(document.getElementById('invoice-date').value).toLocaleDateString('de-DE'),
            dueDate: new Date(document.getElementById('invoice-due-date').value).toLocaleDateString('de-DE'),
            items: items,
            subtotal: subtotal.toFixed(2),
            vatRate: vatRate.toFixed(0),
            vat: vat.toFixed(2),
            total: total.toFixed(2),
            notes: document.getElementById('invoice-notes').value
          };
        }
        
        function renderInvoiceTemplate(template, data) {
          let html = template;
          
          // Replace simple variables
          html = html.replace(/{{invoiceNumber}}/g, data.invoiceNumber);
          html = html.replace(/{{customerName}}/g, data.customerName);
          html = html.replace(/{{customerEmail}}/g, data.customerEmail);
          html = html.replace(/{{invoiceDate}}/g, data.invoiceDate);
          html = html.replace(/{{dueDate}}/g, data.dueDate);
          html = html.replace(/{{subtotal}}/g, data.subtotal);
          html = html.replace(/{{vatRate}}/g, data.vatRate);
          html = html.replace(/{{vat}}/g, data.vat);
          html = html.replace(/{{total}}/g, data.total);
          
          // Replace items
          const itemsHtml = data.items.map(item => \`
            <tr>
              <td>\${item.description}</td>
              <td style="text-align: right;">\${item.quantity}</td>
              <td style="text-align: right;">€\${item.price.toFixed(2)}</td>
              <td style="text-align: right;">€\${item.total.toFixed(2)}</td>
            </tr>
          \`).join('');
          html = html.replace(/{{items}}/g, itemsHtml);
          
          // Handle conditional notes
          if (data.notes) {
            html = html.replace(/{{#if notes}}([\\s\\S]*?){{\/if}}/g, '$1');
            html = html.replace(/{{notes}}/g, data.notes);
          } else {
            html = html.replace(/{{#if notes}}[\\s\\S]*?{{\/if}}/g, '');
          }
          
          return html;
        }
        
        function saveInvoice() {
          const data = collectInvoiceData();
          alert('Invoice saved successfully!\\n\\nInvoice: ' + data.invoiceNumber + '\\nTotal: €' + data.total);
          closeInvoiceEditor();
        }
        
        function closeInvoiceEditor() {
          document.getElementById('invoice-editor-modal').style.display = 'none';
        }
        
        function editInvoice(id) {
          createNewInvoice();
          alert('Editing invoice #' + id);
        }
        
        function viewInvoice(id) {
          alert('View invoice #' + id);
        }
        
        function downloadInvoice(id) {
          alert('Download invoice #' + id + ' as PDF');
        }
        
        // Template Editor Functions
        window.openTemplateEditor = function() {
          document.getElementById('template-html').value = currentInvoiceTemplate;
          document.getElementById('template-editor-modal').style.display = 'block';
          previewTemplate();
        }
        
        function closeTemplateEditor() {
          document.getElementById('template-editor-modal').style.display = 'none';
        }
        
        function previewTemplate() {
          const templateHtml = document.getElementById('template-html').value;
          const sampleData = {
            invoiceNumber: 'INV-2024-001',
            customerName: 'Max Mustermann',
            customerEmail: 'max@example.com',
            invoiceDate: new Date().toLocaleDateString('de-DE'),
            dueDate: new Date(Date.now() + 14*24*60*60*1000).toLocaleDateString('de-DE'),
            items: [
              { description: 'Microsoft Office 2021 Professional', quantity: 1, price: 149.99, total: 149.99 },
              { description: 'Windows 11 Pro', quantity: 1, price: 149.99, total: 149.99 }
            ],
            subtotal: '299.98',
            vatRate: '19',
            vat: '56.99',
            total: '356.97',
            notes: 'Zahlbar innerhalb von 14 Tagen.'
          };
          
          const html = renderInvoiceTemplate(templateHtml, sampleData);
          document.getElementById('template-preview').innerHTML = html;
        }
        
        function saveTemplate() {
          const templateHtml = document.getElementById('template-html').value;
          currentInvoiceTemplate = templateHtml;
          localStorage.setItem('invoiceTemplate', templateHtml);
          alert('Template saved successfully!');
          closeTemplateEditor();
        }
        
        function resetToDefault() {
          if (confirm('Reset to default template? This will discard your changes.')) {
            document.getElementById('template-html').value = defaultInvoiceTemplate;
            previewTemplate();
          }
        }
        
        // Initialize
        loadInvoices();
        
        // Add template editor button to page
        setTimeout(() => {
          const header = document.querySelector('.admin-header');
          if (header) {
            const btn = document.createElement('button');
            btn.className = 'btn-secondary';
            btn.style.marginRight = '10px';
            btn.innerHTML = '<i class="fas fa-code"></i> Edit Template';
            btn.onclick = openTemplateEditor;
            header.appendChild(btn);
          }
        }, 100);
      ` }} ></script>
    </div>
  )
}
