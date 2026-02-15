export function AdminLicenseAnalytics() {
  return /* html */`
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>License Analytics - Admin Panel</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        /* Glassmorphism Cards */
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }
        
        /* Hero Gradient Cards */
        .hero-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 24px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .hero-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent);
          pointer-events: none;
        }
        
        /* Animated Stat Cards */
        .stat-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover::before {
          transform: scaleX(1);
        }
        
        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
        }
        
        .stat-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          margin-bottom: 1rem;
          position: relative;
        }
        
        .stat-icon::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 18px;
          background: inherit;
          opacity: 0.3;
          filter: blur(12px);
          z-index: -1;
        }
        
        /* Gradient Backgrounds */
        .bg-gradient-blue {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .bg-gradient-green {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        
        .bg-gradient-orange {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .bg-gradient-purple {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        /* Animated Numbers */
        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Progress Bars */
        .progress-ring {
          width: 120px;
          height: 120px;
          position: relative;
        }
        
        .progress-ring svg {
          transform: rotate(-90deg);
        }
        
        .progress-ring-circle {
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
          transition: stroke-dashoffset 1s ease;
        }
        
        /* License Status Badges */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .badge-active {
          background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%);
          color: #1e7e34;
        }
        
        .badge-expired {
          background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
          color: #6c757d;
        }
        
        .badge-revoked {
          background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%);
          color: #721c24;
        }
        
        .badge-pending {
          background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
          color: #856404;
        }
        
        /* Table Styles */
        .modern-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 0.5rem;
        }
        
        .modern-table thead th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .modern-table thead th:first-child {
          border-radius: 12px 0 0 12px;
        }
        
        .modern-table thead th:last-child {
          border-radius: 0 12px 12px 0;
        }
        
        .modern-table tbody tr {
          background: white;
          transition: all 0.3s ease;
        }
        
        .modern-table tbody tr:hover {
          transform: scale(1.01);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .modern-table tbody td {
          padding: 1.25rem 1rem;
          border-top: 1px solid #f0f0f0;
        }
        
        .modern-table tbody tr td:first-child {
          border-radius: 12px 0 0 12px;
        }
        
        .modern-table tbody tr td:last-child {
          border-radius: 0 12px 12px 0;
        }
        
        /* Buttons */
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.875rem;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .btn-secondary {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }
        
        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }
        
        /* Chart Container */
        .chart-container {
          position: relative;
          height: 350px;
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        /* Loading Animation */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .loading {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Hover Effects */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        
        /* Floating Animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .stat-card {
            padding: 1.5rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="container mx-auto px-6 py-8 max-w-7xl">
        <!-- Header -->
        <div class="hero-card mb-8 float-animation">
          <div class="flex justify-between items-center relative z-10">
            <div>
              <h1 class="text-4xl font-bold mb-2">
                <i class="fas fa-key mr-3"></i>
                License Analytics
              </h1>
              <p class="text-white/90 text-lg">Überwachen Sie Lizenznutzung und -aktivierungen in Echtzeit</p>
            </div>
            <div class="flex gap-3">
              <button onclick="refreshData()" class="btn btn-secondary">
                <i class="fas fa-sync-alt"></i>
                Aktualisieren
              </button>
              <a href="/admin" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i>
                Zurück
              </a>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Active Licenses -->
          <div class="stat-card hover-lift">
            <div class="stat-icon bg-gradient-green text-white">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="text-sm text-gray-600 mb-2">Aktive Lizenzen</div>
            <div class="stat-number" id="stat-active">0</div>
            <div class="text-sm text-green-600 font-semibold mt-2">
              <i class="fas fa-arrow-up"></i> +12.5% vs. letztem Monat
            </div>
          </div>

          <!-- Expired Licenses -->
          <div class="stat-card hover-lift">
            <div class="stat-icon bg-gradient-orange text-white">
              <i class="fas fa-clock"></i>
            </div>
            <div class="text-sm text-gray-600 mb-2">Abgelaufene Lizenzen</div>
            <div class="stat-number" id="stat-expired">0</div>
            <div class="text-sm text-orange-600 font-semibold mt-2">
              <i class="fas fa-exclamation-triangle"></i> Erneuerung erforderlich
            </div>
          </div>

          <!-- Total Activations -->
          <div class="stat-card hover-lift">
            <div class="stat-icon bg-gradient-purple text-white">
              <i class="fas fa-bolt"></i>
            </div>
            <div class="text-sm text-gray-600 mb-2">Aktivierungen (30 Tage)</div>
            <div class="stat-number" id="stat-activations">0</div>
            <div class="text-sm text-blue-600 font-semibold mt-2">
              <i class="fas fa-arrow-up"></i> +8.3% Wachstum
            </div>
          </div>

          <!-- Revenue -->
          <div class="stat-card hover-lift">
            <div class="stat-icon bg-gradient-blue text-white">
              <i class="fas fa-euro-sign"></i>
            </div>
            <div class="text-sm text-gray-600 mb-2">Lizenz-Umsatz</div>
            <div class="stat-number" id="stat-revenue">€0</div>
            <div class="text-sm text-purple-600 font-semibold mt-2">
              <i class="fas fa-chart-line"></i> Diesen Monat
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- License Status Distribution -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 flex items-center">
              <i class="fas fa-chart-pie mr-3 text-purple-600"></i>
              Lizenz-Status Verteilung
            </h3>
            <div class="chart-container">
              <canvas id="license-status-chart"></canvas>
            </div>
          </div>

          <!-- Activation Trend -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 flex items-center">
              <i class="fas fa-chart-line mr-3 text-purple-600"></i>
              Aktivierungs-Trend (7 Tage)
            </h3>
            <div class="chart-container">
              <canvas id="activation-trend-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Expiring Soon Alert -->
        <div class="glass-card p-6 mb-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold flex items-center">
              <i class="fas fa-exclamation-circle mr-3 text-orange-600"></i>
              Bald ablaufende Lizenzen (30 Tage)
            </h3>
            <span class="badge badge-pending" id="expiring-count">0 Lizenzen</span>
          </div>
          
          <div class="overflow-x-auto">
            <table class="modern-table">
              <thead>
                <tr>
                  <th>Lizenzschlüssel</th>
                  <th>Produkt</th>
                  <th>Kunde</th>
                  <th>Ablaufdatum</th>
                  <th>Verbleibende Tage</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody id="expiring-licenses">
                <tr>
                  <td colspan="6" class="text-center py-8 text-gray-500">
                    <i class="fas fa-spinner fa-spin mr-2"></i> Lade Daten...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Activations -->
        <div class="glass-card p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold flex items-center">
              <i class="fas fa-history mr-3 text-blue-600"></i>
              Letzte Aktivierungen
            </h3>
            <button class="btn btn-secondary btn-sm">
              <i class="fas fa-download"></i>
              Exportieren
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="modern-table">
              <thead>
                <tr>
                  <th>Zeitstempel</th>
                  <th>Lizenzschlüssel</th>
                  <th>Produkt</th>
                  <th>Gerätename</th>
                  <th>IP-Adresse</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="recent-activations">
                <tr>
                  <td colspan="6" class="text-center py-8 text-gray-500">
                    <i class="fas fa-spinner fa-spin mr-2"></i> Lade Daten...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <script>
        let statusChart, trendChart;

        // Load data on page load
        document.addEventListener('DOMContentLoaded', () => {
          loadStats();
          loadExpiringLicenses();
          loadRecentActivations();
          createCharts();
        });

        async function loadStats() {
          try {
            const response = await axios.get('/api/admin/licenses/stats');
            const data = response.data;
            
            document.getElementById('stat-active').textContent = data.active || 0;
            document.getElementById('stat-expired').textContent = data.expired || 0;
            document.getElementById('stat-activations').textContent = data.activations || 0;
            document.getElementById('stat-revenue').textContent = '€' + (data.revenue || 0).toLocaleString('de-DE');
            
            updateCharts(data);
          } catch (error) {
            console.error('Error loading stats:', error);
          }
        }

        async function loadExpiringLicenses() {
          try {
            const response = await axios.get('/api/admin/licenses/expiring?days=30');
            const licenses = response.data.licenses || [];
            
            document.getElementById('expiring-count').textContent = licenses.length + ' Lizenzen';
            
            const tbody = document.getElementById('expiring-licenses');
            if (licenses.length === 0) {
              tbody.innerHTML = \`
                <tr>
                  <td colspan="6" class="text-center py-8 text-gray-500">
                    <i class="fas fa-check-circle text-green-500 text-4xl mb-3"></i>
                    <p class="font-semibold">Keine ablaufenden Lizenzen</p>
                  </td>
                </tr>
              \`;
              return;
            }
            
            tbody.innerHTML = licenses.map(license => {
              const daysLeft = Math.ceil((new Date(license.expiry_date) - new Date()) / (1000 * 60 * 60 * 24));
              return \`
                <tr>
                  <td><code class="font-mono text-sm">\${license.license_key}</code></td>
                  <td>\${license.product_name || 'Unknown'}</td>
                  <td>\${license.customer_name || 'N/A'}</td>
                  <td>\${new Date(license.expiry_date).toLocaleDateString('de-DE')}</td>
                  <td>
                    <span class="badge \${daysLeft <= 7 ? 'badge-revoked' : daysLeft <= 14 ? 'badge-pending' : 'badge-expired'}">
                      \${daysLeft} Tage
                    </span>
                  </td>
                  <td>
                    <button onclick="renewLicense(\${license.id})" class="btn btn-primary btn-sm">
                      <i class="fas fa-redo"></i> Erneuern
                    </button>
                  </td>
                </tr>
              \`;
            }).join('');
          } catch (error) {
            console.error('Error loading expiring licenses:', error);
          }
        }

        async function loadRecentActivations() {
          try {
            const response = await axios.get('/api/admin/licenses/activations?limit=10');
            const activations = response.data.activations || [];
            
            const tbody = document.getElementById('recent-activations');
            if (activations.length === 0) {
              tbody.innerHTML = \`
                <tr>
                  <td colspan="6" class="text-center py-8 text-gray-500">Keine Aktivierungen gefunden</td>
                </tr>
              \`;
              return;
            }
            
            tbody.innerHTML = activations.map(act => \`
              <tr>
                <td>\${new Date(act.activated_at).toLocaleString('de-DE')}</td>
                <td><code class="font-mono text-sm">\${act.license_key}</code></td>
                <td>\${act.product_name || 'Unknown'}</td>
                <td>\${act.device_name || 'N/A'}</td>
                <td>\${act.ip_address || 'N/A'}</td>
                <td><span class="badge badge-active"><i class="fas fa-check"></i> Aktiv</span></td>
              </tr>
            \`).join('');
          } catch (error) {
            console.error('Error loading activations:', error);
          }
        }

        function createCharts() {
          // License Status Chart
          const statusCtx = document.getElementById('license-status-chart');
          statusChart = new Chart(statusCtx, {
            type: 'doughnut',
            data: {
              labels: ['Aktiv', 'Abgelaufen', 'Widerrufen', 'Ausstehend'],
              datasets: [{
                data: [0, 0, 0, 0],
                backgroundColor: [
                  'rgba(102, 126, 234, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(255, 205, 86, 0.8)'
                ],
                borderWidth: 0
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    padding: 20,
                    font: { size: 12, weight: '600' }
                  }
                }
              }
            }
          });

          // Activation Trend Chart
          const trendCtx = document.getElementById('activation-trend-chart');
          trendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
              labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
              datasets: [{
                label: 'Aktivierungen',
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgb(102, 126, 234)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }
          });
        }

        function updateCharts(data) {
          if (statusChart && data.statusDistribution) {
            statusChart.data.datasets[0].data = [
              data.statusDistribution.active || 0,
              data.statusDistribution.expired || 0,
              data.statusDistribution.revoked || 0,
              data.statusDistribution.pending || 0
            ];
            statusChart.update();
          }

          if (trendChart && data.activationTrend) {
            trendChart.data.datasets[0].data = data.activationTrend;
            trendChart.update();
          }
        }

        async function renewLicense(id) {
          if (!confirm('Möchten Sie diese Lizenz wirklich erneuern?')) return;
          
          try {
            await axios.post(\`/api/admin/licenses/\${id}/renew\`);
            alert('Lizenz erfolgreich erneuert!');
            loadExpiringLicenses();
            loadStats();
          } catch (error) {
            alert('Fehler beim Erneuern der Lizenz');
          }
        }

        function refreshData() {
          loadStats();
          loadExpiringLicenses();
          loadRecentActivations();
        }
      </script>
    </body>
    </html>
  `;
}
