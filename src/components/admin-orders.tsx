import type { FC } from 'hono/jsx'

export const AdminOrders: FC = () => {
  return (
    <div class="admin-orders">
      <div class="admin-header">
        <h2><i class="fas fa-shopping-cart"></i> Orders Management</h2>
        <button class="btn-primary" onclick="exportOrders()">
          <i class="fas fa-download"></i> Export Orders
        </button>
      </div>

      {/* Filters */}
      <div class="admin-card" style="margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
          <input 
            type="text" 
            id="search-order" 
            placeholder="Search orders..." 
            class="form-control"
            onkeyup="filterOrders()"
          />
          <select id="filter-status" class="form-control" onchange="filterOrders()">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select id="filter-payment" class="form-control" onchange="filterOrders()">
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div class="admin-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="orders-tbody">
              <tr>
                <td colspan="8" style="text-align: center; padding: 40px;">
                  <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: #1a2a4e;"></i>
                  <p style="margin-top: 10px;">Loading orders...</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .admin-orders {
          padding: 20px;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .admin-header h2 {
          margin: 0;
          color: #1a2a4e;
        }
        .table-responsive {
          overflow-x: auto;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th {
          background: #f8f9fa;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
        }
        .admin-table td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .admin-table tr:hover {
          background: #f8f9fa;
        }
        .status-badge {
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-pending {
          background: #fff3cd;
          color: #856404;
        }
        .status-processing {
          background: #d1ecf1;
          color: #0c5460;
        }
        .status-completed {
          background: #d4edda;
          color: #155724;
        }
        .status-cancelled {
          background: #f8d7da;
          color: #721c24;
        }
        .status-paid {
          background: #d4edda;
          color: #155724;
        }
        .status-failed {
          background: #f8d7da;
          color: #721c24;
        }
        .action-btn {
          padding: 5px 10px;
          margin: 0 2px;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
          color: white;
        }
        .btn-view {
          background: #007bff;
        }
        .btn-edit {
          background: #28a745;
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        let ordersData = [];
        
        function loadOrders() {
          // Demo orders
          ordersData = [
            {
              id: 'ORD-2024-001',
              customer: { name: 'Max Mustermann', email: 'max@example.com' },
              items: 2,
              total: 299.98,
              payment_status: 'paid',
              status: 'completed',
              date: '2024-01-15'
            },
            {
              id: 'ORD-2024-002',
              customer: { name: 'Anna Schmidt', email: 'anna@example.com' },
              items: 1,
              total: 149.99,
              payment_status: 'paid',
              status: 'processing',
              date: '2024-01-20'
            },
            {
              id: 'ORD-2024-003',
              customer: { name: 'Peter Müller', email: 'peter@example.com' },
              items: 3,
              total: 449.97,
              payment_status: 'pending',
              status: 'pending',
              date: '2024-01-22'
            }
          ];
          
          renderOrders(ordersData);
        }
        
        function renderOrders(orders) {
          const tbody = document.getElementById('orders-tbody');
          if (!orders || orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px;">No orders found</td></tr>';
            return;
          }
          
          tbody.innerHTML = orders.map(order => \`
            <tr>
              <td><strong>\${order.id}</strong></td>
              <td>
                <div>\${order.customer.name}</div>
                <div style="font-size: 12px; color: #666;">\${order.customer.email}</div>
              </td>
              <td>\${order.items}</td>
              <td>€\${order.total.toFixed(2)}</td>
              <td><span class="status-badge status-\${order.payment_status}">\${order.payment_status.toUpperCase()}</span></td>
              <td><span class="status-badge status-\${order.status}">\${order.status.toUpperCase()}</span></td>
              <td>\${new Date(order.date).toLocaleDateString('de-DE')}</td>
              <td>
                <button class="action-btn btn-view" onclick="viewOrder('\${order.id}')">
                  <i class="fas fa-eye"></i> View
                </button>
                <button class="action-btn btn-edit" onclick="updateOrderStatus('\${order.id}')">
                  <i class="fas fa-edit"></i> Update
                </button>
              </td>
            </tr>
          \`).join('');
        }
        
        function filterOrders() {
          const search = document.getElementById('search-order').value.toLowerCase();
          const status = document.getElementById('filter-status').value;
          const payment = document.getElementById('filter-payment').value;
          
          let filtered = ordersData.filter(order => {
            const matchesSearch = !search || 
              order.id.toLowerCase().includes(search) ||
              order.customer.name.toLowerCase().includes(search) ||
              order.customer.email.toLowerCase().includes(search);
            const matchesStatus = !status || order.status === status;
            const matchesPayment = !payment || order.payment_status === payment;
            return matchesSearch && matchesStatus && matchesPayment;
          });
          
          renderOrders(filtered);
        }
        
        function viewOrder(orderId) {
          alert('View order: ' + orderId);
        }
        
        function updateOrderStatus(orderId) {
          alert('Update order status: ' + orderId);
        }
        
        function exportOrders() {
          alert('Export orders to CSV');
        }
        
        // Initialize
        loadOrders();
      ` }} />
    </div>
  )
}
