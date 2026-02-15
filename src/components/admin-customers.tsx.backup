import type { FC } from 'hono/jsx'

interface Customer {
  id: number
  email: string
  name: string
  total_spent: number
  orders_count: number
  created_at: string
  last_login?: string
  status: 'active' | 'inactive' | 'blocked'
}

export const AdminCustomers: FC = () => {
  return (
    <div class="admin-customers">
      <div class="admin-header">
        <h2><i class="fas fa-users"></i> Customer Management</h2>
        <button class="btn-primary" onclick="exportCustomers()">
          <i class="fas fa-download"></i> Export Customers
        </button>
      </div>

      {/* Filters */}
      <div class="admin-card" style="margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
          <div>
            <input 
              type="text" 
              id="search-customer" 
              placeholder="Search by name or email..." 
              class="form-control"
              onkeyup="filterCustomers()"
            />
          </div>
          <div>
            <select id="filter-status" class="form-control" onchange="filterCustomers()">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div>
            <select id="sort-by" class="form-control" onchange="sortCustomers()">
              <option value="created_desc">Newest First</option>
              <option value="created_asc">Oldest First</option>
              <option value="spent_desc">Highest Spending</option>
              <option value="spent_asc">Lowest Spending</option>
              <option value="orders_desc">Most Orders</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <div class="stat-card">
          <div class="stat-value" id="total-customers">0</div>
          <div class="stat-label">Total Customers</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="active-customers">0</div>
          <div class="stat-label">Active Customers</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="total-customer-value">€0</div>
          <div class="stat-label">Total Customer Value</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="avg-customer-value">€0</div>
          <div class="stat-label">Avg. Customer Value</div>
        </div>
      </div>

      {/* Customers Table */}
      <div class="admin-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Registered</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="customers-tbody">
              <tr>
                <td colspan="9" style="text-align: center; padding: 40px;">
                  <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: #1a2a4e;"></i>
                  <p style="margin-top: 10px;">Loading customers...</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      <div id="customer-modal" class="modal">
        <div class="modal-content" style="max-width: 800px;">
          <div class="modal-header">
            <h3><i class="fas fa-user"></i> Customer Details</h3>
            <button class="modal-close" onclick="closeCustomerModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div id="customer-details"></div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-customers {
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
        .btn-primary {
          background: #d4af37;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
        }
        .btn-primary:hover {
          background: #b8941f;
        }
        .status-badge {
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-active {
          background: #d4edda;
          color: #155724;
        }
        .status-inactive {
          background: #f8d7da;
          color: #721c24;
        }
        .status-blocked {
          background: #f5c6cb;
          color: #721c24;
        }
        .action-btn {
          padding: 5px 10px;
          margin: 0 2px;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        }
        .btn-view {
          background: #007bff;
          color: white;
        }
        .btn-edit {
          background: #28a745;
          color: white;
        }
        .btn-block {
          background: #dc3545;
          color: white;
        }
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 1000;
        }
        .modal-content {
          background: white;
          margin: 50px auto;
          padding: 0;
          border-radius: 8px;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #ddd;
        }
        .modal-header h3 {
          margin: 0;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        .modal-body {
          padding: 20px;
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        let customersData = [];
        
        async function loadCustomers() {
          try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/admin/customers', {
              headers: token ? { 'Authorization': 'Bearer ' + token } : {}
            });
            
            if (response.ok) {
              const data = await response.json();
              customersData = data.customers || [];
              renderCustomers(customersData);
              updateCustomerStats(customersData);
            } else {
              // Demo data for testing
              customersData = generateDemoCustomers();
              renderCustomers(customersData);
              updateCustomerStats(customersData);
            }
          } catch (error) {
            console.error('Error loading customers:', error);
            // Demo data fallback
            customersData = generateDemoCustomers();
            renderCustomers(customersData);
            updateCustomerStats(customersData);
          }
        }
        
        function generateDemoCustomers() {
          const statuses = ['active', 'active', 'active', 'inactive', 'blocked'];
          const names = [
            'Max Mustermann', 'Anna Schmidt', 'Peter Müller', 'Lisa Weber',
            'Thomas Fischer', 'Sarah Schneider', 'Michael Wagner', 'Julia Becker',
            'Daniel Hoffmann', 'Laura Schulz', 'Christian Koch', 'Sophie Richter',
            'Sebastian Bauer', 'Nina Klein', 'Markus Wolf'
          ];
          
          return names.map((name, i) => ({
            id: i + 1,
            email: name.toLowerCase().replace(' ', '.') + '@example.com',
            name: name,
            total_spent: Math.floor(Math.random() * 2000) + 50,
            orders_count: Math.floor(Math.random() * 15) + 1,
            created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            last_login: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: statuses[Math.floor(Math.random() * statuses.length)]
          }));
        }
        
        function renderCustomers(customers) {
          const tbody = document.getElementById('customers-tbody');
          if (!customers || customers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 40px;">No customers found</td></tr>';
            return;
          }
          
          tbody.innerHTML = customers.map(customer => \`
            <tr>
              <td>#\${customer.id}</td>
              <td><strong>\${customer.name}</strong></td>
              <td>\${customer.email}</td>
              <td>\${customer.orders_count}</td>
              <td>€\${customer.total_spent.toFixed(2)}</td>
              <td><span class="status-badge status-\${customer.status}">\${customer.status.toUpperCase()}</span></td>
              <td>\${new Date(customer.created_at).toLocaleDateString('de-DE')}</td>
              <td>\${customer.last_login ? new Date(customer.last_login).toLocaleDateString('de-DE') : 'Never'}</td>
              <td>
                <button class="action-btn btn-view" onclick="viewCustomer(\${customer.id})">
                  <i class="fas fa-eye"></i> View
                </button>
                <button class="action-btn btn-edit" onclick="editCustomer(\${customer.id})">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn btn-block" onclick="toggleCustomerStatus(\${customer.id})">
                  <i class="fas fa-ban"></i> \${customer.status === 'blocked' ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          \`).join('');
        }
        
        function updateCustomerStats(customers) {
          const total = customers.length;
          const active = customers.filter(c => c.status === 'active').length;
          const totalValue = customers.reduce((sum, c) => sum + c.total_spent, 0);
          const avgValue = total > 0 ? totalValue / total : 0;
          
          document.getElementById('total-customers').textContent = total;
          document.getElementById('active-customers').textContent = active;
          document.getElementById('total-customer-value').textContent = '€' + totalValue.toFixed(2);
          document.getElementById('avg-customer-value').textContent = '€' + avgValue.toFixed(2);
        }
        
        function filterCustomers() {
          const search = document.getElementById('search-customer').value.toLowerCase();
          const status = document.getElementById('filter-status').value;
          
          let filtered = customersData.filter(customer => {
            const matchesSearch = !search || 
              customer.name.toLowerCase().includes(search) ||
              customer.email.toLowerCase().includes(search);
            const matchesStatus = !status || customer.status === status;
            return matchesSearch && matchesStatus;
          });
          
          renderCustomers(filtered);
        }
        
        function sortCustomers() {
          const sortBy = document.getElementById('sort-by').value;
          let sorted = [...customersData];
          
          switch(sortBy) {
            case 'created_desc':
              sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
              break;
            case 'created_asc':
              sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
              break;
            case 'spent_desc':
              sorted.sort((a, b) => b.total_spent - a.total_spent);
              break;
            case 'spent_asc':
              sorted.sort((a, b) => a.total_spent - b.total_spent);
              break;
            case 'orders_desc':
              sorted.sort((a, b) => b.orders_count - a.orders_count);
              break;
          }
          
          renderCustomers(sorted);
        }
        
        function viewCustomer(id) {
          const customer = customersData.find(c => c.id === id);
          if (!customer) return;
          
          const details = \`
            <div style="display: grid; gap: 15px;">
              <div>
                <strong>Name:</strong> \${customer.name}
              </div>
              <div>
                <strong>Email:</strong> \${customer.email}
              </div>
              <div>
                <strong>Status:</strong> <span class="status-badge status-\${customer.status}">\${customer.status.toUpperCase()}</span>
              </div>
              <div>
                <strong>Total Orders:</strong> \${customer.orders_count}
              </div>
              <div>
                <strong>Total Spent:</strong> €\${customer.total_spent.toFixed(2)}
              </div>
              <div>
                <strong>Average Order Value:</strong> €\${(customer.total_spent / customer.orders_count).toFixed(2)}
              </div>
              <div>
                <strong>Registered:</strong> \${new Date(customer.created_at).toLocaleString('de-DE')}
              </div>
              <div>
                <strong>Last Login:</strong> \${customer.last_login ? new Date(customer.last_login).toLocaleString('de-DE') : 'Never'}
              </div>
            </div>
          \`;
          
          document.getElementById('customer-details').innerHTML = details;
          document.getElementById('customer-modal').style.display = 'block';
        }
        
        function closeCustomerModal() {
          document.getElementById('customer-modal').style.display = 'none';
        }
        
        function editCustomer(id) {
          alert('Edit customer #' + id + ' - Feature coming soon!');
        }
        
        function toggleCustomerStatus(id) {
          const customer = customersData.find(c => c.id === id);
          if (!customer) return;
          
          const newStatus = customer.status === 'blocked' ? 'active' : 'blocked';
          if (confirm(\`Are you sure you want to \${newStatus === 'blocked' ? 'block' : 'unblock'} this customer?\`)) {
            customer.status = newStatus;
            renderCustomers(customersData);
            updateCustomerStats(customersData);
          }
        }
        
        function exportCustomers() {
          const csv = [
            ['ID', 'Name', 'Email', 'Orders', 'Total Spent', 'Status', 'Registered', 'Last Login'].join(','),
            ...customersData.map(c => [
              c.id,
              c.name,
              c.email,
              c.orders_count,
              c.total_spent.toFixed(2),
              c.status,
              new Date(c.created_at).toLocaleDateString('de-DE'),
              c.last_login ? new Date(c.last_login).toLocaleDateString('de-DE') : 'Never'
            ].join(','))
          ].join('\\n');
          
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'customers-' + new Date().toISOString().split('T')[0] + '.csv';
          a.click();
        }
        
        // Load customers on page load
        loadCustomers();
      ` }} ></script>
    </div>
  )
}
