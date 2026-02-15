import type { FC } from 'hono/jsx'

export const AdminAnalytics: FC = () => {
  return (
    <div class="admin-analytics">
      <div class="admin-header">
        <h2><i class="fas fa-chart-line"></i> Analytics & Reporting Management</h2>
        <div class="header-actions">
          <select id="date-range" class="form-control" style="width: 200px; margin-right: 10px;" onchange="updateAllMetrics()">
            <option value="today">Heute</option>
            <option value="yesterday">Gestern</option>
            <option value="week">Letzte 7 Tage</option>
            <option value="month" selected>Letzte 30 Tage</option>
            <option value="quarter">Letztes Quartal</option>
            <option value="year">Letztes Jahr</option>
            <option value="custom">Benutzerdefiniert</option>
          </select>
          <button class="btn-primary" onclick="exportAllReports()">
            <i class="fas fa-download"></i> Alle Berichte exportieren
          </button>
          <button class="btn-secondary" onclick="scheduleReport()">
            <i class="fas fa-clock"></i> Bericht planen
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div class="section-title">
        <h3><i class="fas fa-tachometer-alt"></i> Executive Summary</h3>
      </div>
      <div class="metrics-grid">
        <div class="metric-card primary">
          <div class="metric-icon"><i class="fas fa-euro-sign"></i></div>
          <div class="metric-content">
            <div class="metric-value" id="total-revenue">€0</div>
            <div class="metric-label">Gesamtumsatz</div>
            <div class="metric-change positive" id="revenue-change">
              <i class="fas fa-arrow-up"></i> +0% vs. Vorperiode
            </div>
          </div>
        </div>
        <div class="metric-card success">
          <div class="metric-icon"><i class="fas fa-shopping-cart"></i></div>
          <div class="metric-content">
            <div class="metric-value" id="total-orders">0</div>
            <div class="metric-label">Bestellungen</div>
            <div class="metric-change positive" id="orders-change">
              <i class="fas fa-arrow-up"></i> +0%
            </div>
          </div>
        </div>
        <div class="metric-card warning">
          <div class="metric-icon"><i class="fas fa-chart-line"></i></div>
          <div class="metric-content">
            <div class="metric-value" id="conversion-rate">0%</div>
            <div class="metric-label">Conversion Rate</div>
            <div class="metric-change positive" id="conversion-change">
              <i class="fas fa-arrow-up"></i> +0%
            </div>
          </div>
        </div>
        <div class="metric-card info">
          <div class="metric-icon"><i class="fas fa-euro-sign"></i></div>
          <div class="metric-content">
            <div class="metric-value" id="avg-order-value">€0</div>
            <div class="metric-label">Ø Bestellwert</div>
            <div class="metric-change positive" id="aov-change">
              <i class="fas fa-arrow-up"></i> +0%
            </div>
          </div>
        </div>
      </div>

      {/* Sales Performance */}
      <div class="section-title">
        <h3><i class="fas fa-chart-bar"></i> Sales Performance</h3>
      </div>
      <div class="charts-grid">
        <div class="chart-card large">
          <div class="chart-header">
            <h4>Umsatz & Bestellungen Verlauf</h4>
            <select id="sales-chart-period" class="form-control-sm" onchange="updateSalesChart()">
              <option value="day">Täglich</option>
              <option value="week" selected>Wöchentlich</option>
              <option value="month">Monatlich</option>
            </select>
          </div>
          <canvas id="sales-performance-chart" height="300"></canvas>
        </div>
        <div class="chart-card">
          <div class="chart-header">
            <h4>Umsatz nach Kategorie</h4>
          </div>
          <canvas id="category-revenue-chart" height="300"></canvas>
        </div>
      </div>

      {/* License Analytics */}
      <div class="section-title">
        <h3><i class="fas fa-key"></i> License Analytics</h3>
      </div>
      <div class="metrics-grid">
        <div class="stat-card">
          <div class="stat-value" id="licenses-sold">0</div>
          <div class="stat-label">Lizenzen verkauft</div>
          <div class="stat-trend positive" id="licenses-trend">+0%</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="licenses-active">0</div>
          <div class="stat-label">Aktive Lizenzen</div>
          <div class="stat-trend positive" id="active-trend">+0%</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="licenses-expiring">0</div>
          <div class="stat-label">Ablaufend (30 Tage)</div>
          <div class="stat-trend neutral">-</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="license-revenue">€0</div>
          <div class="stat-label">Lizenz-Umsatz</div>
          <div class="stat-trend positive" id="license-revenue-trend">+0%</div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div class="section-title">
        <h3><i class="fas fa-filter"></i> Conversion Funnel</h3>
      </div>
      <div class="funnel-container">
        <div class="funnel-stage" data-stage="visitors">
          <div class="funnel-bar" style="width: 100%;">
            <span class="funnel-label">Besucher</span>
            <span class="funnel-value" id="funnel-visitors">10,000</span>
          </div>
        </div>
        <div class="funnel-stage" data-stage="product-views">
          <div class="funnel-bar" style="width: 60%;">
            <span class="funnel-label">Produktansichten</span>
            <span class="funnel-value" id="funnel-views">6,000 (60%)</span>
          </div>
        </div>
        <div class="funnel-stage" data-stage="add-to-cart">
          <div class="funnel-bar" style="width: 30%;">
            <span class="funnel-label">In den Warenkorb</span>
            <span class="funnel-value" id="funnel-cart">3,000 (30%)</span>
          </div>
        </div>
        <div class="funnel-stage" data-stage="checkout">
          <div class="funnel-bar" style="width: 15%;">
            <span class="funnel-label">Checkout begonnen</span>
            <span class="funnel-value" id="funnel-checkout">1,500 (15%)</span>
          </div>
        </div>
        <div class="funnel-stage" data-stage="completed">
          <div class="funnel-bar" style="width: 10%;">
            <span class="funnel-label">Kaufabschluss</span>
            <span class="funnel-value" id="funnel-completed">1,000 (10%)</span>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div class="section-title">
        <h3><i class="fas fa-star"></i> Top Produkte nach Umsatz</h3>
      </div>
      <div class="admin-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Rang</th>
                <th>Produkt</th>
                <th>Kategorie</th>
                <th>Verkäufe</th>
                <th>Umsatz</th>
                <th>Ø Preis</th>
                <th>Wachstum</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody id="top-products-tbody"></tbody>
          </table>
        </div>
      </div>

      {/* Customer Insights */}
      <div class="section-title">
        <h3><i class="fas fa-users"></i> Customer Insights</h3>
      </div>
      <div class="charts-grid">
        <div class="chart-card">
          <div class="chart-header">
            <h4>Kundenwachstum</h4>
          </div>
          <canvas id="customer-growth-chart" height="250"></canvas>
        </div>
        <div class="chart-card">
          <div class="chart-header">
            <h4>Customer Lifetime Value</h4>
          </div>
          <canvas id="clv-distribution-chart" height="250"></canvas>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="new-customers">0</div>
          <div class="stat-label">Neue Kunden</div>
          <div class="stat-trend positive">+0%</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="returning-rate">0%</div>
          <div class="stat-label">Wiederkehrrate</div>
          <div class="stat-trend positive">+0%</div>
        </div>
      </div>

      {/* System Performance */}
      <div class="section-title">
        <h3><i class="fas fa-server"></i> System Performance</h3>
      </div>
      <div class="metrics-grid">
        <div class="stat-card">
          <div class="stat-value" id="page-load-time">0ms</div>
          <div class="stat-label">Ø Ladezeit</div>
          <div class="stat-trend positive">-5%</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="uptime">99.9%</div>
          <div class="stat-label">Verfügbarkeit</div>
          <div class="stat-trend positive">↑</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="api-response">0ms</div>
          <div class="stat-label">API Response Time</div>
          <div class="stat-trend positive">-10%</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="error-rate">0.1%</div>
          <div class="stat-label">Fehlerrate</div>
          <div class="stat-trend positive">-15%</div>
        </div>
      </div>

      <style>{`
        .admin-analytics {
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
        .header-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .btn-secondary {
          background: #6c757d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
        }
        .section-title {
          margin: 40px 0 20px 0;
        }
        .section-title h3 {
          color: #1a2a4e;
          font-size: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .metric-card {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          gap: 20px;
          align-items: center;
          border-left: 4px solid;
        }
        .metric-card.primary { border-left-color: #1a2a4e; }
        .metric-card.success { border-left-color: #28a745; }
        .metric-card.warning { border-left-color: #ffc107; }
        .metric-card.info { border-left-color: #17a2b8; }
        .metric-icon {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }
        .metric-card.primary .metric-icon { background: #1a2a4e; }
        .metric-card.success .metric-icon { background: #28a745; }
        .metric-card.warning .metric-icon { background: #ffc107; }
        .metric-card.info .metric-icon { background: #17a2b8; }
        .metric-content {
          flex: 1;
        }
        .metric-value {
          font-size: 32px;
          font-weight: bold;
          color: #1a2a4e;
          line-height: 1;
          margin-bottom: 5px;
        }
        .metric-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        .metric-change {
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .metric-change.positive { color: #28a745; }
        .metric-change.negative { color: #dc3545; }
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .chart-card {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .chart-card.large {
          grid-column: 1 / -1;
        }
        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .chart-header h4 {
          margin: 0;
          color: #1a2a4e;
          font-size: 16px;
          font-weight: 600;
        }
        .form-control-sm {
          padding: 5px 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }
        .stat-card {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }
        .stat-value {
          font-size: 36px;
          font-weight: bold;
          color: #1a2a4e;
          margin-bottom: 10px;
        }
        .stat-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }
        .stat-trend {
          font-size: 14px;
          font-weight: 600;
        }
        .stat-trend.positive { color: #28a745; }
        .stat-trend.negative { color: #dc3545; }
        .stat-trend.neutral { color: #6c757d; }
        .funnel-container {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        .funnel-stage {
          margin-bottom: 15px;
        }
        .funnel-bar {
          background: linear-gradient(to right, #1a2a4e, #d4af37);
          color: white;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          transition: all 0.3s;
        }
        .funnel-bar:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
      <script dangerouslySetInnerHTML={{ __html: `
        let charts = {};
        
        function initializeAnalytics() {
          loadExecutiveSummary();
          initializeSalesChart();
          initializeCategoryChart();
          initializeCustomerCharts();
          loadTopProducts();
          updateFunnel();
        }
        
        function loadExecutiveSummary() {
          // Demo data
          document.getElementById('total-revenue').textContent = '€125,450.00';
          document.getElementById('revenue-change').innerHTML = '<i class="fas fa-arrow-up"></i> +15.3% vs. Vorperiode';
          document.getElementById('total-orders').textContent = '1,842';
          document.getElementById('orders-change').innerHTML = '<i class="fas fa-arrow-up"></i> +12.7%';
          document.getElementById('conversion-rate').textContent = '3.8%';
          document.getElementById('conversion-change').innerHTML = '<i class="fas fa-arrow-up"></i> +0.5%';
          document.getElementById('avg-order-value').textContent = '€68.12';
          document.getElementById('aov-change').innerHTML = '<i class="fas fa-arrow-up"></i> +2.3%';
          
          // License metrics
          document.getElementById('licenses-sold').textContent = '2,456';
          document.getElementById('licenses-trend').textContent = '+18.5%';
          document.getElementById('licenses-active').textContent = '8,932';
          document.getElementById('active-trend').textContent = '+5.2%';
          document.getElementById('licenses-expiring').textContent = '234';
          document.getElementById('license-revenue').textContent = '€98,320';
          document.getElementById('license-revenue-trend').textContent = '+22.1%';
          
          // Customer insights
          document.getElementById('new-customers').textContent = '456';
          document.getElementById('returning-rate').textContent = '34.5%';
          
          // System performance
          document.getElementById('page-load-time').textContent = '428ms';
          document.getElementById('api-response').textContent = '85ms';
        }
        
        function initializeSalesChart() {
          const ctx = document.getElementById('sales-performance-chart').getContext('2d');
          const labels = Array.from({length: 30}, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (29 - i));
            return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
          });
          
          charts.sales = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Umsatz (€)',
                  data: Array.from({length: 30}, () => Math.floor(Math.random() * 5000) + 2000),
                  borderColor: '#1a2a4e',
                  backgroundColor: 'rgba(26, 42, 78, 0.1)',
                  yAxisID: 'y',
                  tension: 0.4,
                  fill: true
                },
                {
                  label: 'Bestellungen',
                  data: Array.from({length: 30}, () => Math.floor(Math.random() * 80) + 40),
                  borderColor: '#d4af37',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  yAxisID: 'y1',
                  tension: 0.4,
                  fill: true
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false,
              },
              scales: {
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  title: {
                    display: true,
                    text: 'Umsatz (€)'
                  }
                },
                y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  title: {
                    display: true,
                    text: 'Bestellungen'
                  },
                  grid: {
                    drawOnChartArea: false,
                  }
                }
              }
            }
          });
        }
        
        function initializeCategoryChart() {
          const ctx = document.getElementById('category-revenue-chart').getContext('2d');
          charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['Windows', 'Office', 'Server & CAL', 'Bundles', 'Gaming'],
              datasets: [{
                data: [35, 28, 18, 12, 7],
                backgroundColor: ['#1a2a4e', '#d4af37', '#007bff', '#28a745', '#ffc107']
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
        }
        
        function initializeCustomerCharts() {
          // Customer growth chart
          const ctx1 = document.getElementById('customer-growth-chart').getContext('2d');
          charts.customerGrowth = new Chart(ctx1, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun'],
              datasets: [{
                label: 'Neue Kunden',
                data: [120, 145, 180, 210, 245, 280],
                borderColor: '#17a2b8',
                backgroundColor: 'rgba(23, 162, 184, 0.1)',
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
          
          // CLV distribution chart
          const ctx2 = document.getElementById('clv-distribution-chart').getContext('2d');
          charts.clv = new Chart(ctx2, {
            type: 'bar',
            data: {
              labels: ['€0-50', '€50-100', '€100-200', '€200-500', '€500+'],
              datasets: [{
                label: 'Kunden',
                data: [450, 320, 280, 180, 90],
                backgroundColor: '#28a745'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
        }
        
        function loadTopProducts() {
          const products = [
            { rank: 1, name: 'Microsoft Office 2021 Professional Plus', category: 'Office', sales: 567, revenue: 85050, avgPrice: 149.99, growth: 18.5 },
            { rank: 2, name: 'Windows 11 Pro', category: 'Windows', sales: 489, revenue: 73350, avgPrice: 149.99, growth: 15.2 },
            { rank: 3, name: 'Microsoft Office 2019 Home & Business', category: 'Office', sales: 423, revenue: 42300, avgPrice: 99.99, growth: 12.8 },
            { rank: 4, name: 'Windows 10 Pro', category: 'Windows', sales: 356, revenue: 35600, avgPrice: 99.99, growth: -3.2 },
            { rank: 5, name: 'Office 365 Bundle', category: 'Bundles', sales: 312, revenue: 46800, avgPrice: 149.99, growth: 22.7 }
          ];
          
          const tbody = document.getElementById('top-products-tbody');
          tbody.innerHTML = products.map(p => \`
            <tr>
              <td><strong>#\${p.rank}</strong></td>
              <td>\${p.name}</td>
              <td><span class="status-badge status-active">\${p.category}</span></td>
              <td>\${p.sales}</td>
              <td>€\${p.revenue.toLocaleString('de-DE')}</td>
              <td>€\${p.avgPrice.toFixed(2)}</td>
              <td>
                <span class="stat-trend \${p.growth >= 0 ? 'positive' : 'negative'}">
                  \${p.growth >= 0 ? '+' : ''}\${p.growth}%
                </span>
              </td>
              <td>
                <div class="progress-bar" style="width: \${Math.abs(p.growth) * 3}%; background: \${p.growth >= 0 ? '#28a745' : '#dc3545'};"></div>
              </td>
            </tr>
          \`).join('');
        }
        
        function updateFunnel() {
          // Funnel is already rendered with demo data in HTML
        }
        
        function updateAllMetrics() {
          const range = document.getElementById('date-range').value;
          console.log('Updating metrics for range:', range);
          // Reload all data
        }
        
        function exportAllReports() {
          alert('Exportiere alle Berichte als Excel/PDF...');
        }
        
        function scheduleReport() {
          alert('Bericht-Planung: Berichte automatisch per E-Mail versenden');
        }
        
        function updateSalesChart() {
          const period = document.getElementById('sales-chart-period').value;
          console.log('Updating sales chart for period:', period);
        }
        
        // Initialize on load
        setTimeout(initializeAnalytics, 100);
      ` }} ></script>
    </div>
  )
}
