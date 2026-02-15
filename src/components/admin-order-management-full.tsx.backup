import type { FC } from 'hono/jsx'

export const AdminOrderManagement: FC = () => {
  return (
    <div class="admin-order-management">
      <div class="admin-header">
        <h2><i class="fas fa-shopping-cart"></i> Order Management</h2>
        <div class="header-actions">
          <button class="btn-success" onclick="createManualOrder()">
            <i class="fas fa-plus"></i> Neue Bestellung
          </button>
          <button class="btn-primary" onclick="exportOrders()">
            <i class="fas fa-download"></i> Exportieren
          </button>
          <button class="btn-secondary" onclick="bulkActions()">
            <i class="fas fa-tasks"></i> Bulk-Aktionen
          </button>
        </div>
      </div>

      {/* Real-Time Stats */}
      <div class="stats-row">
        <div class="stat-box primary">
          <div class="stat-icon"><i class="fas fa-shopping-bag"></i></div>
          <div class="stat-info">
            <div class="stat-value" id="total-orders-today">0</div>
            <div class="stat-label">Bestellungen heute</div>
            <div class="stat-change positive">+12.5%</div>
          </div>
        </div>
        <div class="stat-box success">
          <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
          <div class="stat-info">
            <div class="stat-value" id="completed-orders">0</div>
            <div class="stat-label">Abgeschlossen</div>
            <div class="stat-change positive">+8.3%</div>
          </div>
        </div>
        <div class="stat-box warning">
          <div class="stat-icon"><i class="fas fa-clock"></i></div>
          <div class="stat-info">
            <div class="stat-value" id="pending-orders">0</div>
            <div class="stat-label">In Bearbeitung</div>
            <div class="stat-change neutral">3 neu</div>
          </div>
        </div>
        <div class="stat-box info">
          <div class="stat-icon"><i class="fas fa-euro-sign"></i></div>
          <div class="stat-info">
            <div class="stat-value" id="revenue-today">€0</div>
            <div class="stat-label">Umsatz heute</div>
            <div class="stat-change positive">+15.7%</div>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div class="filters-panel">
        <div class="filters-row">
          <div class="filter-group">
            <label>Suche</label>
            <input 
              type="text" 
              id="search-orders" 
              class="form-control" 
              placeholder="Bestellung, Kunde, E-Mail..."
              onkeyup="filterOrders()"
            />
          </div>
          <div class="filter-group">
            <label>Status</label>
            <select id="filter-status" class="form-control" onchange="filterOrders()">
              <option value="">Alle Status</option>
              <option value="pending">Ausstehend</option>
              <option value="processing">In Bearbeitung</option>
              <option value="completed">Abgeschlossen</option>
              <option value="cancelled">Storniert</option>
              <option value="refunded">Erstattet</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Zahlung</label>
            <select id="filter-payment" class="form-control" onchange="filterOrders()">
              <option value="">Alle</option>
              <option value="paid">Bezahlt</option>
              <option value="pending">Ausstehend</option>
              <option value="failed">Fehlgeschlagen</option>
              <option value="refunded">Erstattet</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Zeitraum</label>
            <select id="filter-period" class="form-control" onchange="filterOrders()">
              <option value="today">Heute</option>
              <option value="week" selected>Letzte 7 Tage</option>
              <option value="month">Letzte 30 Tage</option>
              <option value="year">Letztes Jahr</option>
              <option value="custom">Benutzerdefiniert</option>
            </select>
          </div>
          <div class="filter-group">
            <button class="btn-secondary" onclick="resetFilters()">
              <i class="fas fa-redo"></i> Zurücksetzen
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table with Real-Time Status */}
      <div class="admin-card">
        <div class="table-actions">
          <div class="bulk-select">
            <input type="checkbox" id="select-all" onchange="toggleSelectAll()" />
            <label for="select-all">Alle auswählen</label>
          </div>
          <div class="table-controls">
            <button class="btn-sm" onclick="bulkStatusUpdate()">
              <i class="fas fa-edit"></i> Status ändern
            </button>
            <button class="btn-sm" onclick="bulkExport()">
              <i class="fas fa-file-export"></i> Exportieren
            </button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Bestellung</th>
                <th>Kunde</th>
                <th>Artikel</th>
                <th>Betrag</th>
                <th>Zahlung</th>
                <th>Status</th>
                <th>Lieferung</th>
                <th>Datum</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody id="orders-tbody"></tbody>
          </table>
        </div>
        <div class="table-pagination">
          <div class="pagination-info">
            Zeige <span id="showing-from">1</span>-<span id="showing-to">10</span> von <span id="total-orders">0</span> Bestellungen
          </div>
          <div class="pagination-controls">
            <button class="btn-page" onclick="prevPage()"><i class="fas fa-chevron-left"></i></button>
            <span class="page-numbers" id="page-numbers"></span>
            <button class="btn-page" onclick="nextPage()"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <div id="order-detail-modal" class="modal">
        <div class="modal-content large">
          <div class="modal-header">
            <h3><i class="fas fa-file-alt"></i> Bestelldetails</h3>
            <button class="modal-close" onclick="closeOrderDetail()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="order-detail-grid">
              {/* Left Column */}
              <div class="order-section">
                <h4>Kundeninformationen</h4>
                <div id="customer-info"></div>
              </div>
              
              {/* Middle Column */}
              <div class="order-section">
                <h4>Bestellartikel</h4>
                <div id="order-items"></div>
              </div>
              
              {/* Right Column */}
              <div class="order-section">
                <h4>Zahlung & Lieferung</h4>
                <div id="payment-delivery-info"></div>
              </div>
            </div>
            
            {/* Status Timeline */}
            <div class="order-section full-width">
              <h4>Bestellverlauf</h4>
              <div class="status-timeline" id="order-timeline"></div>
            </div>
            
            {/* Actions */}
            <div class="order-actions">
              <button class="btn-primary" onclick="updateOrderStatus()">
                <i class="fas fa-edit"></i> Status aktualisieren
              </button>
              <button class="btn-success" onclick="resendEmail()">
                <i class="fas fa-envelope"></i> E-Mail erneut senden
              </button>
              <button class="btn-warning" onclick="refundOrder()">
                <i class="fas fa-undo"></i> Erstattung
              </button>
              <button class="btn-secondary" onclick="printInvoice()">
                <i class="fas fa-print"></i> Rechnung drucken
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-order-management {
          padding: 20px;
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-box {
          background: white;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          gap: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-left: 4px solid;
        }
        .stat-box.primary { border-left-color: #1a2a4e; }
        .stat-box.success { border-left-color: #28a745; }
        .stat-box.warning { border-left-color: #ffc107; }
        .stat-box.info { border-left-color: #17a2b8; }
        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }
        .stat-box.primary .stat-icon { background: #1a2a4e; }
        .stat-box.success .stat-icon { background: #28a745; }
        .stat-box.warning .stat-icon { background: #ffc107; }
        .stat-box.info .stat-icon { background: #17a2b8; }
        .stat-info {
          flex: 1;
        }
        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #1a2a4e;
          margin-bottom: 5px;
        }
        .stat-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }
        .stat-change {
          font-size: 13px;
          font-weight: 600;
        }
        .stat-change.positive { color: #28a745; }
        .stat-change.negative { color: #dc3545; }
        .stat-change.neutral { color: #6c757d; }
        .filters-panel {
          background: white;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .filters-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 15px;
          align-items: end;
        }
        .filter-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          margin-bottom: 8px;
        }
        .table-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
        }
        .bulk-select {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bulk-select input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        .table-controls {
          display: flex;
          gap: 10px;
        }
        .table-pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-top: 1px solid #eee;
        }
        .pagination-info {
          font-size: 14px;
          color: #666;
        }
        .pagination-controls {
          display: flex;
          gap: 5px;
          align-items: center;
        }
        .btn-page {
          width: 32px;
          height: 32px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-page:hover {
          background: #f8f9fa;
        }
        .page-numbers {
          display: flex;
          gap: 5px;
        }
        .page-number {
          width: 32px;
          height: 32px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
        }
        .page-number.active {
          background: #1a2a4e;
          color: white;
          border-color: #1a2a4e;
        }
        .modal.large .modal-content {
          max-width: 1200px;
        }
        .order-detail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        .order-section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
        }
        .order-section.full-width {
          grid-column: 1 / -1;
        }
        .order-section h4 {
          color: #1a2a4e;
          font-size: 16px;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #ddd;
        }
        .status-timeline {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .timeline-step {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }
        .timeline-marker {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #28a745;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .timeline-marker.pending {
          background: #ffc107;
        }
        .timeline-info {
          flex: 1;
        }
        .timeline-title {
          font-weight: 600;
          color: #1a2a4e;
          margin-bottom: 3px;
        }
        .timeline-time {
          font-size: 13px;
          color: #999;
        }
        .order-actions {
          display: flex;
          gap: 10px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
        .btn-warning {
          background: #ffc107;
          color: #1a2a4e;
        }
        @media (max-width: 1024px) {
          .filters-row {
            grid-template-columns: 1fr;
          }
          .order-detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        let ordersData = [];
        let currentPage = 1;
        let itemsPerPage = 10;
        
        function loadOrders() {
          // Demo orders
          ordersData = Array.from({length: 50}, (_, i) => ({
            id: 'ORD-2024-' + String(1000 + i).padStart(4, '0'),
            customer: {
              name: ['Max Mustermann', 'Anna Schmidt', 'Peter Müller', 'Lisa Weber'][i % 4],
              email: ['max@example.com', 'anna@example.com', 'peter@example.com', 'lisa@example.com'][i % 4]
            },
            items: Math.floor(Math.random() * 5) + 1,
            amount: (Math.random() * 500 + 50).toFixed(2),
            paymentStatus: ['paid', 'pending', 'failed'][Math.floor(Math.random() * 3)],
            orderStatus: ['pending', 'processing', 'completed', 'cancelled'][Math.floor(Math.random() * 4)],
            deliveryStatus: ['delivered', 'pending', 'failed'][Math.floor(Math.random() * 3)],
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
          }));
          
          renderOrders();
          updateStats();
        }
        
        function renderOrders() {
          const start = (currentPage - 1) * itemsPerPage;
          const end = start + itemsPerPage;
          const pageOrders = ordersData.slice(start, end);
          
          const tbody = document.getElementById('orders-tbody');
          tbody.innerHTML = pageOrders.map(order => \`
            <tr>
              <td><input type="checkbox" class="order-select" value="\${order.id}" /></td>
              <td><strong>\${order.id}</strong></td>
              <td>
                <div>\${order.customer.name}</div>
                <div style="font-size: 12px; color: #666;">\${order.customer.email}</div>
              </td>
              <td>\${order.items}</td>
              <td>€\${order.amount}</td>
              <td><span class="status-badge status-\${order.paymentStatus}">\${order.paymentStatus.toUpperCase()}</span></td>
              <td><span class="status-badge status-\${order.orderStatus}">\${order.orderStatus.toUpperCase()}</span></td>
              <td><span class="status-badge status-\${order.deliveryStatus}">\${order.deliveryStatus.toUpperCase()}</span></td>
              <td>\${new Date(order.date).toLocaleDateString('de-DE')}</td>
              <td>
                <button class="action-btn btn-view" onclick="viewOrderDetail('\${order.id}')">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn btn-edit" onclick="editOrder('\${order.id}')">
                  <i class="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          \`).join('');
          
          updatePagination();
        }
        
        function updateStats() {
          const today = new Date().toDateString();
          const todayOrders = ordersData.filter(o => new Date(o.date).toDateString() === today);
          const completed = ordersData.filter(o => o.orderStatus === 'completed');
          const pending = ordersData.filter(o => o.orderStatus === 'processing' || o.orderStatus === 'pending');
          const revenue = todayOrders.reduce((sum, o) => sum + parseFloat(o.amount), 0);
          
          document.getElementById('total-orders-today').textContent = todayOrders.length;
          document.getElementById('completed-orders').textContent = completed.length;
          document.getElementById('pending-orders').textContent = pending.length;
          document.getElementById('revenue-today').textContent = '€' + revenue.toFixed(2);
        }
        
        function updatePagination() {
          const totalPages = Math.ceil(ordersData.length / itemsPerPage);
          document.getElementById('showing-from').textContent = (currentPage - 1) * itemsPerPage + 1;
          document.getElementById('showing-to').textContent = Math.min(currentPage * itemsPerPage, ordersData.length);
          document.getElementById('total-orders').textContent = ordersData.length;
          
          const pageNumbers = document.getElementById('page-numbers');
          pageNumbers.innerHTML = Array.from({length: Math.min(totalPages, 5)}, (_, i) => {
            const page = i + 1;
            return \`<div class="page-number \${page === currentPage ? 'active' : ''}" onclick="goToPage(\${page})">\${page}</div>\`;
          }).join('');
        }
        
        function goToPage(page) {
          currentPage = page;
          renderOrders();
        }
        
        function prevPage() {
          if (currentPage > 1) {
            currentPage--;
            renderOrders();
          }
        }
        
        function nextPage() {
          const totalPages = Math.ceil(ordersData.length / itemsPerPage);
          if (currentPage < totalPages) {
            currentPage++;
            renderOrders();
          }
        }
        
        function filterOrders() {
          console.log('Filtering orders...');
          // Implement filtering logic
        }
        
        function resetFilters() {
          document.getElementById('search-orders').value = '';
          document.getElementById('filter-status').value = '';
          document.getElementById('filter-payment').value = '';
          document.getElementById('filter-period').value = 'week';
          filterOrders();
        }
        
        function toggleSelectAll() {
          const checked = document.getElementById('select-all').checked;
          document.querySelectorAll('.order-select').forEach(cb => cb.checked = checked);
        }
        
        function viewOrderDetail(orderId) {
          document.getElementById('order-detail-modal').style.display = 'block';
          // Load order details
        }
        
        function closeOrderDetail() {
          document.getElementById('order-detail-modal').style.display = 'none';
        }
        
        function editOrder(orderId) {
          alert('Bestellung bearbeiten: ' + orderId);
        }
        
        function createManualOrder() {
          alert('Neue manuelle Bestellung erstellen');
        }
        
        function exportOrders() {
          alert('Bestellungen exportieren als CSV/Excel');
        }
        
        function bulkActions() {
          alert('Bulk-Aktionen: Status ändern, Löschen, Exportieren');
        }
        
        function bulkStatusUpdate() {
          alert('Status für ausgewählte Bestellungen ändern');
        }
        
        function bulkExport() {
          alert('Ausgewählte Bestellungen exportieren');
        }
        
        function updateOrderStatus() {
          alert('Bestellstatus aktualisieren');
        }
        
        function resendEmail() {
          alert('Bestätigungs-E-Mail erneut senden');
        }
        
        function refundOrder() {
          if (confirm('Bestellung erstatten?')) {
            alert('Erstattung wird verarbeitet...');
          }
        }
        
        function printInvoice() {
          alert('Rechnung drucken/herunterladen');
        }
        
        // Initialize
        loadOrders();
        
        // Auto-refresh every 30 seconds
        setInterval(loadOrders, 30000);
      ` }} ></script>
    </div>
  )
}
