import type { FC } from 'hono/jsx'

export const AdminReports: FC = () => {
  return (
    <div class="admin-reports">
      <div class="admin-header">
        <h2><i class="fas fa-chart-line"></i> Reports & Analytics</h2>
        <div>
          <select id="report-range" class="form-control" style="display: inline-block; width: 200px; margin-right: 10px;" onchange="updateReports()">
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month" selected>Last 30 Days</option>
            <option value="year">Last 12 Months</option>
          </select>
          <button class="btn-primary" onclick="exportReports()">
            <i class="fas fa-download"></i> Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <div class="stat-card">
          <div class="stat-icon" style="background: #28a745;">
            <i class="fas fa-euro-sign"></i>
          </div>
          <div>
            <div class="stat-value" id="total-revenue">€0</div>
            <div class="stat-label">Total Revenue</div>
            <div class="stat-change positive" id="revenue-change">+0%</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #007bff;">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <div>
            <div class="stat-value" id="total-orders">0</div>
            <div class="stat-label">Total Orders</div>
            <div class="stat-change positive" id="orders-change">+0%</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #ffc107;">
            <i class="fas fa-box"></i>
          </div>
          <div>
            <div class="stat-value" id="products-sold">0</div>
            <div class="stat-label">Products Sold</div>
            <div class="stat-change positive" id="products-change">+0%</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #17a2b8;">
            <i class="fas fa-users"></i>
          </div>
          <div>
            <div class="stat-value" id="new-customers">0</div>
            <div class="stat-label">New Customers</div>
            <div class="stat-change positive" id="customers-change">+0%</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 30px;">
        <div class="admin-card">
          <h3>Revenue Overview</h3>
          <canvas id="revenue-chart" height="300"></canvas>
        </div>
        <div class="admin-card">
          <h3>Sales by Category</h3>
          <canvas id="category-chart" height="300"></canvas>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
        <div class="admin-card">
          <h3>Orders Timeline</h3>
          <canvas id="orders-chart" height="250"></canvas>
        </div>
        <div class="admin-card">
          <h3>Customer Growth</h3>
          <canvas id="customers-chart" height="250"></canvas>
        </div>
      </div>

      {/* Top Products */}
      <div class="admin-card">
        <h3>Top Selling Products</h3>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product</th>
                <th>Category</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody id="top-products-tbody"></tbody>
          </table>
        </div>
      </div>

      {/* Export Modal */}
      <div id="export-modal" class="modal">
        <div class="modal-content" style="max-width: 600px;">
          <div class="modal-header">
            <h3><i class="fas fa-download"></i> Export Reports</h3>
            <button class="modal-close" onclick="closeExportModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Report Type</label>
              <select id="export-type" class="form-control">
                <option value="revenue">Revenue Report</option>
                <option value="orders">Orders Report</option>
                <option value="products">Products Report</option>
                <option value="customers">Customers Report</option>
                <option value="full">Full Analytics Report</option>
              </select>
            </div>
            <div class="form-group">
              <label>Date Range</label>
              <select id="export-range" class="form-control">
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">Last 12 Months</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div class="form-group">
              <label>Format</label>
              <select id="export-format" class="form-control">
                <option value="csv">CSV</option>
                <option value="excel">Excel (XLSX)</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <div style="margin-top: 20px;">
              <button class="btn-primary" onclick="performExport()">
                <i class="fas fa-download"></i> Download Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-reports {
          padding: 20px;
        }
        .stat-card {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }
        .stat-change {
          font-size: 14px;
          font-weight: 600;
          margin-top: 5px;
        }
        .stat-change.positive {
          color: #28a745;
        }
        .stat-change.negative {
          color: #dc3545;
        }
        .stat-change::before {
          content: '↑ ';
        }
        .stat-change.negative::before {
          content: '↓ ';
        }
      `}</style>

      <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
      <script dangerouslySetInnerHTML={{ __html: `
        let charts = {};
        
        function generateDemoData() {
          const labels = [];
          const revenueData = [];
          const ordersData = [];
          const customersData = [];
          
          for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('de-DE', { month: 'short', day: 'numeric' }));
            revenueData.push(Math.floor(Math.random() * 5000) + 1000);
            ordersData.push(Math.floor(Math.random() * 50) + 10);
            customersData.push(Math.floor(Math.random() * 20) + 5);
          }
          
          return { labels, revenueData, ordersData, customersData };
        }
        
        function initializeCharts() {
          const data = generateDemoData();
          
          // Revenue Chart
          const revenueCtx = document.getElementById('revenue-chart').getContext('2d');
          charts.revenue = new Chart(revenueCtx, {
            type: 'line',
            data: {
              labels: data.labels,
              datasets: [{
                label: 'Revenue (€)',
                data: data.revenueData,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value) {
                      return '€' + value.toLocaleString();
                    }
                  }
                }
              }
            }
          });
          
          // Category Chart
          const categoryCtx = document.getElementById('category-chart').getContext('2d');
          charts.category = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
              labels: ['Windows', 'Office', 'Server', 'Bundles', 'Gaming'],
              datasets: [{
                data: [35, 25, 15, 15, 10],
                backgroundColor: [
                  '#1a2a4e',
                  '#d4af37',
                  '#007bff',
                  '#28a745',
                  '#ffc107'
                ]
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }
          });
          
          // Orders Chart
          const ordersCtx = document.getElementById('orders-chart').getContext('2d');
          charts.orders = new Chart(ordersCtx, {
            type: 'bar',
            data: {
              labels: data.labels,
              datasets: [{
                label: 'Orders',
                data: data.ordersData,
                backgroundColor: '#007bff'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
          
          // Customers Chart
          const customersCtx = document.getElementById('customers-chart').getContext('2d');
          charts.customers = new Chart(customersCtx, {
            type: 'line',
            data: {
              labels: data.labels,
              datasets: [{
                label: 'New Customers',
                data: data.customersData,
                borderColor: '#17a2b8',
                backgroundColor: 'rgba(23, 162, 184, 0.1)',
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }
        
        function updateMetrics() {
          // Demo metrics
          document.getElementById('total-revenue').textContent = '€' + (85430.50).toLocaleString('de-DE');
          document.getElementById('total-orders').textContent = '1,234';
          document.getElementById('products-sold').textContent = '2,456';
          document.getElementById('new-customers').textContent = '345';
          
          document.getElementById('revenue-change').textContent = '+12.5%';
          document.getElementById('orders-change').textContent = '+8.3%';
          document.getElementById('products-change').textContent = '+15.7%';
          document.getElementById('customers-change').textContent = '+22.1%';
        }
        
        function loadTopProducts() {
          const products = [
            { rank: 1, name: 'Microsoft Office 2021 Professional Plus', category: 'Office', units: 456, revenue: 68340, growth: 15.3 },
            { rank: 2, name: 'Windows 11 Pro', category: 'Windows', units: 389, revenue: 58350, growth: 12.7 },
            { rank: 3, name: 'Microsoft Office 2019 Home & Business', category: 'Office', units: 312, revenue: 31200, growth: 8.9 },
            { rank: 4, name: 'Windows 10 Pro', category: 'Windows', units: 267, revenue: 26700, growth: -2.3 },
            { rank: 5, name: 'Office 365 Bundle', category: 'Bundles', units: 234, revenue: 35100, growth: 18.5 }
          ];
          
          const tbody = document.getElementById('top-products-tbody');
          tbody.innerHTML = products.map(p => \`
            <tr>
              <td><strong>#\${p.rank}</strong></td>
              <td>\${p.name}</td>
              <td><span class="status-badge status-active">\${p.category}</span></td>
              <td>\${p.units}</td>
              <td>€\${p.revenue.toLocaleString('de-DE')}</td>
              <td>
                <span class="stat-change \${p.growth >= 0 ? 'positive' : 'negative'}">
                  \${p.growth >= 0 ? '+' : ''}\${p.growth}%
                </span>
              </td>
            </tr>
          \`).join('');
        }
        
        function updateReports() {
          const range = document.getElementById('report-range').value;
          console.log('Updating reports for range:', range);
          // In production, fetch new data based on range
          updateMetrics();
        }
        
        function exportReports() {
          document.getElementById('export-modal').style.display = 'block';
        }
        
        function closeExportModal() {
          document.getElementById('export-modal').style.display = 'none';
        }
        
        function performExport() {
          const type = document.getElementById('export-type').value;
          const range = document.getElementById('export-range').value;
          const format = document.getElementById('export-format').value;
          
          alert('Exporting ' + type + ' report for ' + range + ' as ' + format.toUpperCase() + '\\n\\nDownload will start shortly...');
          closeExportModal();
        }
        
        // Initialize everything
        setTimeout(() => {
          initializeCharts();
          updateMetrics();
          loadTopProducts();
        }, 100);
      ` }} ></script>
    </div>
  )
}
