export const AdminMarketing = () => {
  return `
    <div class="marketing-dashboard" style="padding: 30px;">
      <style>
        .marketing-dashboard {
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .section-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a2a4e;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .stat-box {
          background: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }
        
        .stat-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        
        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #1a2a4e;
        }
        
        .stat-change {
          font-size: 13px;
          margin-top: 4px;
        }
        
        .stat-change.positive { color: #10b981; }
        .stat-change.negative { color: #ef4444; }
        
        .btn-refresh {
          background: #1a2a4e;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }
        
        .btn-refresh:hover {
          background: #0f1936;
          transform: translateY(-1px);
        }
        
        .status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }
        
        .status-connected {
          background: #d1fae5;
          color: #065f46;
        }
        
        .status-disconnected {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }
        
        .metric-chart {
          height: 200px;
          margin: 20px 0;
        }
        
        .integration-card {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 16px;
          border: 2px solid #e2e8f0;
          transition: all 0.3s;
        }
        
        .integration-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }
        
        .oauth-required {
          background: #fffbeb;
          border-left: 4px solid #f59e0b;
          padding: 16px;
          border-radius: 8px;
          margin: 16px 0;
        }
        
        .table-container {
          overflow-x: auto;
          margin-top: 16px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th {
          background: #f8fafc;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #475569;
          border-bottom: 2px solid #e2e8f0;
        }
        
        td {
          padding: 12px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        tr:hover {
          background: #f8fafc;
        }
      </style>
      
      <!-- Page Header -->
      <div style="margin-bottom: 32px;">
        <h1 style="font-size: 32px; font-weight: 700; color: #1a2a4e; margin-bottom: 8px;">
          <i class="fas fa-chart-line" style="color: #d4af37; margin-right: 12px;"></i>
          Marketing Dashboard
        </h1>
        <p style="color: #64748b; font-size: 16px;">
          Performance-Überwachung, Analytics und Integrationen
        </p>
      </div>
      
      <!-- Quick Stats Overview -->
      <div class="stat-grid" style="margin-bottom: 32px;">
        <div class="stat-box" style="border-color: #3b82f6;">
          <div class="stat-label">Performance Score</div>
          <div class="stat-value" id="perf-score">--</div>
          <div class="stat-change positive" id="perf-change">
            <i class="fas fa-arrow-up"></i> Wird geladen...
          </div>
        </div>
        
        <div class="stat-box" style="border-color: #10b981;">
          <div class="stat-label">Seitengeschwindigkeit</div>
          <div class="stat-value" id="page-speed">--s</div>
          <div class="stat-change" id="speed-change">
            <i class="fas fa-clock"></i> Wird gemessen...
          </div>
        </div>
        
        <div class="stat-box" style="border-color: #f59e0b;">
          <div class="stat-label">Traffic Heute</div>
          <div class="stat-value" id="traffic-today">--</div>
          <div class="stat-change positive">
            <i class="fas fa-users"></i> Besucher
          </div>
        </div>
        
        <div class="stat-box" style="border-color: #8b5cf6;">
          <div class="stat-label">Conversion Rate</div>
          <div class="stat-value" id="conversion-rate">--%</div>
          <div class="stat-change">
            <i class="fas fa-shopping-cart"></i> Letzte 7 Tage
          </div>
        </div>
      </div>
      
      <!-- Section 1: Google Search Console -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <i class="fab fa-google" style="color: #4285f4;"></i>
            Google Search Console
          </div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <span class="status-indicator status-pending" id="gsc-status">
              <i class="fas fa-plug"></i> OAuth erforderlich
            </span>
            <button onclick="refreshGSC()" class="btn-refresh">
              <i class="fas fa-sync-alt mr-2"></i>Aktualisieren
            </button>
          </div>
        </div>
        
        <div class="oauth-required">
          <strong><i class="fas fa-info-circle"></i> OAuth-Integration erforderlich</strong>
          <p style="margin: 8px 0 0 0; color: #92400e;">
            Um Google Search Console zu verbinden, müssen Sie OAuth 2.0 einrichten.
            <a href="#" onclick="showGSCSetup()" style="color: #1a2a4e; font-weight: 600; text-decoration: underline;">
              Setup-Anleitung anzeigen
            </a>
          </p>
        </div>
        
        <div class="stat-grid">
          <div class="stat-box">
            <div class="stat-label">Klicks (30 Tage)</div>
            <div class="stat-value" id="gsc-clicks">--</div>
            <div class="stat-change" id="gsc-clicks-change">Noch nicht verbunden</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Impressionen</div>
            <div class="stat-value" id="gsc-impressions">--</div>
            <div class="stat-change">Noch nicht verbunden</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">CTR</div>
            <div class="stat-value" id="gsc-ctr">--%</div>
            <div class="stat-change">Noch nicht verbunden</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Durchschn. Position</div>
            <div class="stat-value" id="gsc-position">--</div>
            <div class="stat-change">Noch nicht verbunden</div>
          </div>
        </div>
        
        <div id="gsc-data-container" style="display: none;">
          <div class="table-container">
            <h4 style="margin: 20px 0 12px 0; font-weight: 600;">Top-Suchanfragen</h4>
            <table id="gsc-queries-table">
              <thead>
                <tr>
                  <th>Suchanfrage</th>
                  <th>Klicks</th>
                  <th>Impressionen</th>
                  <th>CTR</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody id="gsc-queries-body">
                <tr><td colspan="5">Keine Daten verfügbar</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Section 2: Google Merchant Center -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <i class="fab fa-google" style="color: #34a853;"></i>
            Google Merchant Center
          </div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <span class="status-indicator status-pending" id="gmc-status">
              <i class="fas fa-plug"></i> OAuth erforderlich
            </span>
            <button onclick="refreshGMC()" class="btn-refresh">
              <i class="fas fa-sync-alt mr-2"></i>Feed aktualisieren
            </button>
          </div>
        </div>
        
        <div class="oauth-required">
          <strong><i class="fas fa-info-circle"></i> OAuth-Integration erforderlich</strong>
          <p style="margin: 8px 0 0 0; color: #92400e;">
            Um Google Merchant Center zu verbinden, müssen Sie OAuth 2.0 einrichten.
            <a href="#" onclick="showGMCSetup()" style="color: #1a2a4e; font-weight: 600; text-decoration: underline;">
              Setup-Anleitung anzeigen
            </a>
          </p>
        </div>
        
        <div class="stat-grid">
          <div class="stat-box">
            <div class="stat-label">Produkte im Feed</div>
            <div class="stat-value" id="gmc-products">--</div>
            <div class="stat-change">Noch nicht verbunden</div>
          </div>
          
          <div class="stat-box" style="border-color: #10b981;">
            <div class="stat-label">Genehmigt</div>
            <div class="stat-value" id="gmc-approved">--</div>
            <div class="stat-change">Noch nicht verbunden</div>
          </div>
          
          <div class="stat-box" style="border-color: #ef4444;">
            <div class="stat-label">Fehler</div>
            <div class="stat-value" id="gmc-errors">--</div>
            <div class="stat-change">Noch nicht verbunden</div>
          </div>
          
          <div class="stat-box" style="border-color: #f59e0b;">
            <div class="stat-label">Warnungen</div>
            <div class="stat-value" id="gmc-warnings">--</div>
            <div class="stat-change">Noch nicht verbunden</div>
          </div>
        </div>
      </div>
      
      <!-- Section 3: Performance & Statistics -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <i class="fas fa-tachometer-alt" style="color: #3b82f6;"></i>
            Performance & Statistiken
          </div>
          <button onclick="runPerformanceTest()" class="btn-refresh">
            <i class="fas fa-play mr-2"></i>Test starten
          </button>
        </div>
        
        <div class="stat-grid">
          <div class="stat-box">
            <div class="stat-label">Core Web Vitals</div>
            <div class="stat-value" id="cwv-score" style="font-size: 20px;">
              <span style="color: #10b981;">Gut</span>
            </div>
            <div class="stat-change">Wird geladen...</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">First Contentful Paint</div>
            <div class="stat-value" id="fcp-value">--s</div>
            <div class="stat-change" id="fcp-rating">Wird gemessen...</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Largest Contentful Paint</div>
            <div class="stat-value" id="lcp-value">--s</div>
            <div class="stat-change" id="lcp-rating">Wird gemessen...</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Time to Interactive</div>
            <div class="stat-value" id="tti-value">--s</div>
            <div class="stat-change" id="tti-rating">Wird gemessen...</div>
          </div>
        </div>
        
        <div id="performance-details" style="margin-top: 20px;">
          <div id="performance-loading" style="text-align: center; padding: 40px; color: #64748b;">
            <i class="fas fa-spinner fa-spin" style="font-size: 32px; margin-bottom: 16px;"></i>
            <p>Klicken Sie auf "Test starten", um eine Performance-Analyse durchzuführen</p>
          </div>
        </div>
      </div>
      
      <!-- Section 4: Traffic Analysis -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <i class="fas fa-users" style="color: #8b5cf6;"></i>
            Traffic Analytics
          </div>
          <div style="display: flex; gap: 12px;">
            <select id="traffic-period" onchange="loadTraffic()" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px;">
              <option value="today">Heute</option>
              <option value="7days">Letzte 7 Tage</option>
              <option value="30days">Letzte 30 Tage</option>
              <option value="90days">Letzte 90 Tage</option>
            </select>
            <button onclick="loadTraffic()" class="btn-refresh">
              <i class="fas fa-sync-alt mr-2"></i>Aktualisieren
            </button>
          </div>
        </div>
        
        <div class="stat-grid">
          <div class="stat-box">
            <div class="stat-label">Besucher</div>
            <div class="stat-value" id="traffic-visitors">--</div>
            <div class="stat-change positive">
              <i class="fas fa-arrow-up"></i> +12% vs. vorher
            </div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Seitenaufrufe</div>
            <div class="stat-value" id="traffic-pageviews">--</div>
            <div class="stat-change positive">
              <i class="fas fa-arrow-up"></i> +8% vs. vorher
            </div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Durchschn. Sitzungsdauer</div>
            <div class="stat-value" id="traffic-duration">--m</div>
            <div class="stat-change">
              <i class="fas fa-clock"></i> Pro Besuch
            </div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Absprungrate</div>
            <div class="stat-value" id="traffic-bounce">--%</div>
            <div class="stat-change negative">
              <i class="fas fa-arrow-down"></i> -5% (besser)
            </div>
          </div>
        </div>
        
        <div style="margin-top: 24px;">
          <h4 style="margin-bottom: 12px; font-weight: 600;">Traffic-Quellen</h4>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Quelle</th>
                  <th>Besucher</th>
                  <th>Anteil</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody id="traffic-sources-body">
                <tr>
                  <td><i class="fas fa-search"></i> Organische Suche</td>
                  <td id="traffic-organic">--</td>
                  <td id="traffic-organic-percent">--%</td>
                  <td><span class="stat-change positive"><i class="fas fa-arrow-up"></i> +15%</span></td>
                </tr>
                <tr>
                  <td><i class="fas fa-ad"></i> Bezahlte Anzeigen</td>
                  <td id="traffic-paid">--</td>
                  <td id="traffic-paid-percent">--%</td>
                  <td><span class="stat-change positive"><i class="fas fa-arrow-up"></i> +8%</span></td>
                </tr>
                <tr>
                  <td><i class="fas fa-link"></i> Referral</td>
                  <td id="traffic-referral">--</td>
                  <td id="traffic-referral-percent">--%</td>
                  <td><span class="stat-change"><i class="fas fa-minus"></i> ±0%</span></td>
                </tr>
                <tr>
                  <td><i class="fas fa-globe"></i> Direkt</td>
                  <td id="traffic-direct">--</td>
                  <td id="traffic-direct-percent">--%</td>
                  <td><span class="stat-change negative"><i class="fas fa-arrow-down"></i> -3%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <script>
      // Performance Testing with PageSpeed Insights API
      async function runPerformanceTest() {
        const loadingDiv = document.getElementById('performance-loading');
        loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin" style="font-size: 32px;"></i><p>Performance-Test läuft...</p>';
        
        try {
          const response = await axios.get('/api/marketing/performance');
          if (response.data.success) {
            displayPerformanceResults(response.data.data);
          } else {
            loadingDiv.innerHTML = '<p style="color: #ef4444;">Fehler: ' + response.data.error + '</p>';
          }
        } catch (error) {
          console.error('Performance test error:', error);
          loadingDiv.innerHTML = '<p style="color: #ef4444;">Fehler beim Ausführen des Performance-Tests</p>';
        }
      }
      
      function displayPerformanceResults(data) {
        document.getElementById('perf-score').textContent = data.performance_score || '--';
        document.getElementById('fcp-value').textContent = data.fcp + 's';
        document.getElementById('lcp-value').textContent = data.lcp + 's';
        document.getElementById('tti-value').textContent = data.tti + 's';
        
        document.getElementById('performance-loading').innerHTML = 
          '<div style="padding: 20px; background: #d1fae5; border-radius: 8px;">' +
          '<strong style="color: #065f46;"><i class="fas fa-check-circle"></i> Test abgeschlossen!</strong>' +
          '<p style="margin: 8px 0 0 0; color: #065f46;">Ihre Website-Performance wurde erfolgreich analysiert.</p>' +
          '</div>';
      }
      
      async function refreshGSC() {
        alert('Google Search Console: OAuth-Integration erforderlich.\\n\\nBitte richten Sie die OAuth-Authentifizierung ein, um Daten abzurufen.');
      }
      
      async function refreshGMC() {
        alert('Google Merchant Center: OAuth-Integration erforderlich.\\n\\nBitte richten Sie die OAuth-Authentifizierung ein, um Feed-Daten abzurufen.');
      }
      
      function showGSCSetup() {
        alert('Google Search Console Setup:\\n\\n1. Gehen Sie zu console.cloud.google.com\\n2. Erstellen Sie ein Projekt\\n3. Aktivieren Sie die Search Console API\\n4. Erstellen Sie OAuth 2.0 Credentials\\n5. Fügen Sie die Credentials in /admin/settings ein');
      }
      
      function showGMCSetup() {
        alert('Google Merchant Center Setup:\\n\\n1. Gehen Sie zu console.cloud.google.com\\n2. Aktivieren Sie die Content API for Shopping\\n3. Erstellen Sie OAuth 2.0 Credentials\\n4. Verknüpfen Sie Ihr Merchant Center Konto\\n5. Fügen Sie die Credentials in /admin/settings ein');
      }
      
      async function loadTraffic() {
        const period = document.getElementById('traffic-period').value;
        
        try {
          const response = await axios.get('/api/marketing/traffic?period=' + period);
          if (response.data.success) {
            const data = response.data.data;
            document.getElementById('traffic-visitors').textContent = data.visitors || '--';
            document.getElementById('traffic-pageviews').textContent = data.pageviews || '--';
            document.getElementById('traffic-duration').textContent = (data.avgDuration || 0) + 'm';
            document.getElementById('traffic-bounce').textContent = (data.bounceRate || 0) + '%';
            
            document.getElementById('traffic-organic').textContent = data.sources?.organic || '--';
            document.getElementById('traffic-paid').textContent = data.sources?.paid || '--';
            document.getElementById('traffic-referral').textContent = data.sources?.referral || '--';
            document.getElementById('traffic-direct').textContent = data.sources?.direct || '--';
          }
        } catch (error) {
          console.error('Traffic loading error:', error);
        }
      }
      
      // Initial data load
      document.addEventListener('DOMContentLoaded', () => {
        loadTraffic();
      });
    </script>
  `;
};
