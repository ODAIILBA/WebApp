export function AdminAnalytics() {
  return /* html */`
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Analytics Dashboard - Admin Panel</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
      <style>
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        .dashboard-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .dashboard-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba(0,0,0,0.15);
        }
        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          padding: 1.5rem;
          transition: transform 0.2s;
        }
        .stat-card:hover {
          transform: scale(1.02);
        }
        .stat-icon {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
        .section-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: white;
          border-bottom: 2px solid #e5e7eb;
        }
        .nav-tab {
          padding: 1rem 1.5rem;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s;
          white-space: nowrap;
        }
        .nav-tab:hover {
          background: #f3f4f6;
          border-bottom-color: #667eea;
        }
        .nav-tab.active {
          background: #ede9fe;
          border-bottom-color: #667eea;
          color: #667eea;
          font-weight: 600;
        }
        .chart-container {
          position: relative;
          height: 300px;
          width: 100%;
        }
        .table-row:hover {
          background: #f9fafb;
        }
        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .badge-success { background: #d1fae5; color: #065f46; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-danger { background: #fee2e2; color: #991b1b; }
        .badge-info { background: #dbeafe; color: #1e40af; }
        .progress-bar {
          height: 8px;
          background: #e5e7eb;
          border-radius: 9999px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s;
        }
        .metric-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .metric-up { color: #10b981; }
        .metric-down { color: #ef4444; }
        .date-filter {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          background: #f3f4f6;
          border-radius: 8px;
        }
        .date-btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: none;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.875rem;
        }
        .date-btn:hover {
          background: #667eea;
          color: white;
        }
        .date-btn.active {
          background: #667eea;
          color: white;
          font-weight: 600;
        }
        .loading {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .realtime-indicator {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      </style>
    </head>
    <body class="p-6">
      <div class="max-w-[1600px] mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">
              <i class="fas fa-chart-line mr-3"></i>
              Analytics Dashboard
            </h1>
            <p class="text-white/80">Echtzeit-Einblicke in Ihre Webseiten-Performance</p>
          </div>
          <div class="flex gap-3">
            <div class="date-filter">
              <button class="date-btn active" data-days="1">Heute</button>
              <button class="date-btn" data-days="7">7 Tage</button>
              <button class="date-btn" data-days="30">30 Tage</button>
              <button class="date-btn" data-days="90">90 Tage</button>
            </div>
            <button onclick="refreshAllData()" class="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
              <i class="fas fa-sync-alt mr-2"></i>
              Aktualisieren
            </button>
            <a href="/admin" class="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition">
              <i class="fas fa-arrow-left mr-2"></i>
              Zurück
            </a>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="section-nav dashboard-card mb-6">
          <div class="flex overflow-x-auto">
            <div class="nav-tab active" data-section="overview">
              <i class="fas fa-tachometer-alt mr-2"></i>
              Übersicht
            </div>
            <div class="nav-tab" data-section="visitors">
              <i class="fas fa-users mr-2"></i>
              Besucher & Traffic
            </div>
            <div class="nav-tab" data-section="behavior">
              <i class="fas fa-mouse-pointer mr-2"></i>
              Nutzerverhalten
            </div>
            <div class="nav-tab" data-section="conversion">
              <i class="fas fa-shopping-cart mr-2"></i>
              Conversion & Umsatz
            </div>
            <div class="nav-tab" data-section="products">
              <i class="fas fa-box mr-2"></i>
              Produkte & Kategorien
            </div>
            <div class="nav-tab" data-section="checkout">
              <i class="fas fa-credit-card mr-2"></i>
              Checkout & Abbrüche
            </div>
            <div class="nav-tab" data-section="licenses">
              <i class="fas fa-key mr-2"></i>
              Lizenzen & Downloads
            </div>
            <div class="nav-tab" data-section="marketing">
              <i class="fas fa-bullhorn mr-2"></i>
              Marketing-Performance
            </div>
            <div class="nav-tab" data-section="seo">
              <i class="fas fa-search mr-2"></i>
              SEO-Performance
            </div>
            <div class="nav-tab" data-section="devices">
              <i class="fas fa-mobile-alt mr-2"></i>
              Geräte & Technik
            </div>
          </div>
        </div>

        <!-- Section 1: Overview -->
        <div id="overview-section" class="section-content">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <!-- Stat Cards -->
            <div class="stat-card">
              <div class="flex justify-between items-start mb-3">
                <div class="stat-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="realtime-indicator"></div>
              </div>
              <div class="text-sm opacity-90 mb-1">Besucher</div>
              <div class="text-3xl font-bold mb-2" id="stat-visitors">-</div>
              <div class="metric-change metric-up" id="stat-visitors-change">
                <i class="fas fa-arrow-up"></i>
                <span>-</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="flex justify-between items-start mb-3">
                <div class="stat-icon">
                  <i class="fas fa-eye"></i>
                </div>
              </div>
              <div class="text-sm opacity-90 mb-1">Seitenaufrufe</div>
              <div class="text-3xl font-bold mb-2" id="stat-pageviews">-</div>
              <div class="metric-change metric-up" id="stat-pageviews-change">
                <i class="fas fa-arrow-up"></i>
                <span>-</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="flex justify-between items-start mb-3">
                <div class="stat-icon">
                  <i class="fas fa-euro-sign"></i>
                </div>
              </div>
              <div class="text-sm opacity-90 mb-1">Umsatz</div>
              <div class="text-3xl font-bold mb-2" id="stat-revenue">-</div>
              <div class="metric-change metric-up" id="stat-revenue-change">
                <i class="fas fa-arrow-up"></i>
                <span>-</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="flex justify-between items-start mb-3">
                <div class="stat-icon">
                  <i class="fas fa-percentage"></i>
                </div>
              </div>
              <div class="text-sm opacity-90 mb-1">Conversion Rate</div>
              <div class="text-3xl font-bold mb-2" id="stat-conversion">-</div>
              <div class="metric-change metric-up" id="stat-conversion-change">
                <i class="fas fa-arrow-up"></i>
                <span>-</span>
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="dashboard-card p-6">
              <h3 class="text-lg font-bold mb-4">Besucher-Trend</h3>
              <div class="chart-container">
                <canvas id="visitors-chart"></canvas>
              </div>
            </div>
            <div class="dashboard-card p-6">
              <h3 class="text-lg font-bold mb-4">Umsatz-Trend</h3>
              <div class="chart-container">
                <canvas id="revenue-chart"></canvas>
              </div>
            </div>
          </div>

          <!-- Top Pages Table -->
          <div class="dashboard-card p-6">
            <h3 class="text-lg font-bold mb-4">Top Seiten</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">Seite</th>
                    <th class="text-right py-3 px-4">Aufrufe</th>
                    <th class="text-right py-3 px-4">Besucher</th>
                    <th class="text-right py-3 px-4">Ø Verweildauer</th>
                    <th class="text-right py-3 px-4">Absprungrate</th>
                  </tr>
                </thead>
                <tbody id="top-pages-table">
                  <tr class="table-row">
                    <td colspan="5" class="text-center py-8 text-gray-500">
                      <i class="fas fa-spinner fa-spin mr-2"></i>
                      Lade Daten...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 2: Visitors & Traffic -->
        <div id="visitors-section" class="section-content hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Traffic Sources -->
            <div class="dashboard-card p-6">
              <h3 class="text-lg font-bold mb-4">Traffic-Quellen</h3>
              <div class="chart-container">
                <canvas id="traffic-sources-chart"></canvas>
              </div>
            </div>

            <!-- Geography -->
            <div class="dashboard-card p-6">
              <h3 class="text-lg font-bold mb-4">Geografische Verteilung</h3>
              <div id="geography-list" class="space-y-3">
                <div class="text-center py-8 text-gray-500">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Lade Daten...
                </div>
              </div>
            </div>
          </div>

          <!-- Visitor Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="dashboard-card p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold">Neue Besucher</h3>
                <i class="fas fa-user-plus text-3xl text-purple-600"></i>
              </div>
              <div class="text-3xl font-bold text-purple-600 mb-2" id="new-visitors">-</div>
              <div class="text-sm text-gray-600">der letzten 30 Tage</div>
            </div>

            <div class="dashboard-card p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold">Wiederkehrende</h3>
                <i class="fas fa-user-check text-3xl text-green-600"></i>
              </div>
              <div class="text-3xl font-bold text-green-600 mb-2" id="returning-visitors">-</div>
              <div class="text-sm text-gray-600">bekannte Besucher</div>
            </div>

            <div class="dashboard-card p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold">Ø Besuchsdauer</h3>
                <i class="fas fa-clock text-3xl text-blue-600"></i>
              </div>
              <div class="text-3xl font-bold text-blue-600 mb-2" id="avg-duration">-</div>
              <div class="text-sm text-gray-600">pro Session</div>
            </div>
          </div>
        </div>

        <!-- Section 3: User Behavior -->
        <div id="behavior-section" class="section-content hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Event Tracking -->
            <div class="dashboard-card p-6">
              <h3 class="text-lg font-bold mb-4">Top Events</h3>
              <div id="events-list" class="space-y-3">
                <div class="text-center py-8 text-gray-500">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Lade Daten...
                </div>
              </div>
            </div>

            <!-- User Flow -->
            <div class="dashboard-card p-6">
              <h3 class="text-lg font-bold mb-4">Nutzerfluss</h3>
              <div id="user-flow" class="space-y-3">
                <div class="text-center py-8 text-gray-500">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Lade Daten...
                </div>
              </div>
            </div>
          </div>

          <!-- Engagement Metrics -->
          <div class="dashboard-card p-6">
            <h3 class="text-lg font-bold mb-4">Engagement-Metriken</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600 mb-2" id="avg-pages-per-session">-</div>
                <div class="text-sm text-gray-600">Seiten pro Besuch</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600 mb-2" id="avg-time-on-page">-</div>
                <div class="text-sm text-gray-600">Ø Zeit pro Seite</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600 mb-2" id="bounce-rate">-</div>
                <div class="text-sm text-gray-600">Absprungrate</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600 mb-2" id="exit-rate">-</div>
                <div class="text-sm text-gray-600">Ausstiegsrate</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Conversion & Revenue -->
        <div id="conversion-section" class="section-content hidden">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="stat-card">
              <div class="stat-icon mb-3">
                <i class="fas fa-shopping-cart"></i>
              </div>
              <div class="text-sm opacity-90 mb-1">Conversions</div>
              <div class="text-3xl font-bold mb-2" id="total-conversions">-</div>
              <div class="text-sm opacity-80" id="conversion-rate-display">Rate: -</div>
            </div>

            <div class="stat-card">
              <div class="stat-icon mb-3">
                <i class="fas fa-euro-sign"></i>
              </div>
              <div class="text-sm opacity-90 mb-1">Gesamt-Umsatz</div>
              <div class="text-3xl font-bold mb-2" id="total-revenue">-</div>
              <div class="text-sm opacity-80" id="avg-order-value">AOV: -</div>
            </div>

            <div class="stat-card">
              <div class="stat-icon mb-3">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="text-sm opacity-90 mb-1">Customer Lifetime Value</div>
              <div class="text-3xl font-bold mb-2" id="clv">-</div>
              <div class="text-sm opacity-80" id="avg-purchases">Ø Käufe: -</div>
            </div>
          </div>

          <!-- Conversion Funnel -->
          <div class="dashboard-card p-6 mb-6">
            <h3 class="text-lg font-bold mb-4">Conversion Funnel</h3>
            <div class="space-y-4" id="conversion-funnel">
              <div class="text-center py-8 text-gray-500">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                Lade Daten...
              </div>
            </div>
          </div>

          <!-- Revenue by Source -->
          <div class="dashboard-card p-6">
            <h3 class="text-lg font-bold mb-4">Umsatz nach Quelle</h3>
            <div class="chart-container">
              <canvas id="revenue-by-source-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Section 5: Products & Categories -->
        <div id="products-section" class="section-content hidden">
          <div class="dashboard-card p-6 mb-6">
            <h3 class="text-lg font-bold mb-4">Top Produkte</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">Produkt</th>
                    <th class="text-right py-3 px-4">Aufrufe</th>
                    <th class="text-right py-3 px-4">Verkäufe</th>
                    <th class="text-right py-3 px-4">Umsatz</th>
                    <th class="text-right py-3 px-4">Conversion</th>
                  </tr>
                </thead>
                <tbody id="products-table">
                  <tr class="table-row">
                    <td colspan="5" class="text-center py-8 text-gray-500">
                      <i class="fas fa-spinner fa-spin mr-2"></i>
                      Lade Daten...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Category Performance -->
          <div class="dashboard-card p-6">
            <h3 class="text-lg font-bold mb-4">Kategorie-Performance</h3>
            <div id="category-performance" class="space-y-4">
              <div class="text-center py-8 text-gray-500">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                Lade Daten...
              </div>
            </div>
          </div>
        </div>

        <!-- Section 6: Checkout & Abandonment -->
        <div id="checkout-section" class="section-content hidden">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="dashboard-card p-6 text-center">
              <i class="fas fa-shopping-cart text-4xl text-purple-600 mb-3"></i>
              <div class="text-sm text-gray-600 mb-2">Warenkörbe gestartet</div>
              <div class="text-3xl font-bold text-purple-600" id="carts-started">-</div>
            </div>

            <div class="dashboard-card p-6 text-center">
              <i class="fas fa-check-circle text-4xl text-green-600 mb-3"></i>
              <div class="text-sm text-gray-600 mb-2">Abgeschlossen</div>
              <div class="text-3xl font-bold text-green-600" id="carts-completed">-</div>
            </div>

            <div class="dashboard-card p-6 text-center">
              <i class="fas fa-times-circle text-4xl text-red-600 mb-3"></i>
              <div class="text-sm text-gray-600 mb-2">Abgebrochen</div>
              <div class="text-3xl font-bold text-red-600" id="carts-abandoned">-</div>
            </div>
          </div>

          <!-- Checkout Funnel -->
          <div class="dashboard-card p-6 mb-6">
            <h3 class="text-lg font-bold mb-4">Checkout-Trichter</h3>
            <div id="checkout-funnel" class="space-y-4">
              <div class="text-center py-8 text-gray-500">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                Lade Daten...
              </div>
            </div>
          </div>

          <!-- Abandoned Carts -->
          <div class="dashboard-card p-6">
            <h3 class="text-lg font-bold mb-4">Abgebrochene Warenkörbe</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">Session</th>
                    <th class="text-left py-3 px-4">Zeitpunkt</th>
                    <th class="text-right py-3 px-4">Wert</th>
                    <th class="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody id="abandoned-carts-table">
                  <tr class="table-row">
                    <td colspan="4" class="text-center py-8 text-gray-500">
                      <i class="fas fa-spinner fa-spin mr-2"></i>
                      Lade Daten...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 7: Licenses & Downloads -->
        <div id="licenses-section" class="section-content hidden">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="dashboard-card p-6 text-center">
              <i class="fas fa-key text-4xl text-purple-600 mb-3"></i>
              <div class="text-sm text-gray-600 mb-2">Aktive Lizenzen</div>
              <div class="text-3xl font-bold text-purple-600" id="active-licenses">-</div>
            </div>

            <div class="dashboard-card p-6 text-center">
              <i class="fas fa-download text-4xl text-blue-600 mb-3"></i>
              <div class="text-sm text-gray-600 mb-2">Downloads (gesamt)</div>
              <div class="text-3xl font-bold text-blue-600" id="total-downloads">-</div>
            </div>

            <div class="dashboard-card p-6 text-center">
              <i class="fas fa-clock text-4xl text-orange-600 mb-3"></i>
              <div class="text-sm text-gray-600 mb-2">Ablaufend (30 Tage)</div>
              <div class="text-3xl font-bold text-orange-600" id="expiring-licenses">-</div>
            </div>
          </div>

          <!-- Recent Downloads -->
          <div class="dashboard-card p-6">
            <h3 class="text-lg font-bold mb-4">Aktuelle Downloads</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">Lizenz-Key</th>
                    <th class="text-left py-3 px-4">Produkt</th>
                    <th class="text-left py-3 px-4">Zeitpunkt</th>
                    <th class="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody id="licenses-table">
                  <tr class="table-row">
                    <td colspan="4" class="text-center py-8 text-gray-500">
                      <i class="fas fa-spinner fa-spin mr-2"></i>
                      Lade Daten...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 8: Marketing Performance -->
        <div id="marketing-section" class="section-content hidden">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="dashboard-card p-6 text-center">
              <div class="text-sm text-gray-600 mb-2">Kampagnen aktiv</div>
              <div class="text-3xl font-bold text-purple-600" id="active-campaigns">-</div>
            </div>

            <div class="dashboard-card p-6 text-center">
              <div class="text-sm text-gray-600 mb-2">Klicks gesamt</div>
              <div class="text-3xl font-bold text-blue-600" id="total-clicks">-</div>
            </div>

            <div class="dashboard-card p-6 text-center">
              <div class="text-sm text-gray-600 mb-2">Durchschn. CPC</div>
              <div class="text-3xl font-bold text-green-600" id="avg-cpc">-</div>
            </div>

            <div class="dashboard-card p-6 text-center">
              <div class="text-sm text-gray-600 mb-2">ROI</div>
              <div class="text-3xl font-bold text-orange-600" id="marketing-roi">-</div>
            </div>
          </div>

          <!-- Campaign Performance -->
          <div class="dashboard-card p-6">
            <h3 class="text-lg font-bold mb-4">Kampagnen-Performance</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">Kampagne</th>
                    <th class="text-right py-3 px-4">Klicks</th>
                    <th class="text-right py-3 px-4">Conversions</th>
                    <th class="text-right py-3 px-4">Kosten</th>
                    <th class="text-right py-3 px-4">Umsatz</th>
                    <th class="text-right py-3 px-4">ROI</th>
                  </tr>
                </thead>
                <tbody id="campaigns-table">
                  <tr class="table-row">
                    <td colspan="6" class="text-center py-8 text-gray-500">
                      <i class="fas fa-spinner fa-spin mr-2"></i>
                      Lade Daten...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 9: SEO Performance -->
        <div id="seo-section" class="section-content hidden">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="dashboard-card p-6 text-center">
              <div class="text-sm text-gray-600 mb-2">Indexierte Seiten</div>
              <div class="text-3xl font-bold text-purple-600" id="indexed-pages">-</div>
            </div>

            <div class="dashboard-card p-6 text-center">
              <div class="text-sm text-gray-600 mb-2">Organic Traffic</div>
              <div class="text-3xl font-bold text-green-600" id="organic-traffic">-</div>
            </div>

            <div class="dashboard-card p-6 text-center">
              <div class="text-sm text-gray-600 mb-2">Durchschn. Position</div>
              <div class="text-3xl font-bold text-blue-600" id="avg-position">-</div>
            </div>

            <div class="dashboard-card p-6 text-center">
              <div class="text-sm text-gray-600 mb-2">Click-Through-Rate</div>
              <div class="text-3xl font-bold text-orange-600" id="ctr">-</div>
            </div>
          </div>

          <!-- SEO Pages Performance -->
          <div class="dashboard-card p-6">
            <h3 class="text-lg font-bold mb-4">SEO-Seiten Performance</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">Seite</th>
                    <th class="text-right py-3 px-4">Impressionen</th>
                    <th class="text-right py-3 px-4">Klicks</th>
                    <th class="text-right py-3 px-4">CTR</th>
                    <th class="text-right py-3 px-4">Position</th>
                  </tr>
                </thead>
                <tbody id="seo-pages-table">
                  <tr class="table-row">
                    <td colspan="5" class="text-center py-8 text-gray-500">
                      <i class="fas fa-spinner fa-spin mr-2"></i>
                      Lade Daten...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 10: Devices & Technology -->
        <div id="devices-section" class="section-content hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Device Types -->
            <div class="dashboard-card p-6">
              <h3 class="text-lg font-bold mb-4">Geräte-Typen</h3>
              <div class="chart-container">
                <canvas id="device-types-chart"></canvas>
              </div>
            </div>

            <!-- Browsers -->
            <div class="dashboard-card p-6">
              <h3 class="text-lg font-bold mb-4">Browser-Verteilung</h3>
              <div class="chart-container">
                <canvas id="browsers-chart"></canvas>
              </div>
            </div>
          </div>

          <!-- Device Performance -->
          <div class="dashboard-card p-6">
            <h3 class="text-lg font-bold mb-4">Geräte-Performance</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">Gerät / Browser</th>
                    <th class="text-right py-3 px-4">Besucher</th>
                    <th class="text-right py-3 px-4">Absprungrate</th>
                    <th class="text-right py-3 px-4">Ø Dauer</th>
                    <th class="text-right py-3 px-4">Conversions</th>
                  </tr>
                </thead>
                <tbody id="devices-table">
                  <tr class="table-row">
                    <td colspan="5" class="text-center py-8 text-gray-500">
                      <i class="fas fa-spinner fa-spin mr-2"></i>
                      Lade Daten...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Global state
        let currentDays = 1;
        let charts = {};

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
          loadAllData();
          setupEventListeners();
        });

        // Setup event listeners
        function setupEventListeners() {
          // Date filter buttons
          document.querySelectorAll('.date-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
              e.target.classList.add('active');
              currentDays = parseInt(e.target.dataset.days);
              loadAllData();
            });
          });

          // Navigation tabs
          document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
              const section = e.currentTarget.dataset.section;
              switchSection(section);
            });
          });
        }

        // Switch sections
        function switchSection(section) {
          // Update nav tabs
          document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
          document.querySelector(\`[data-section="\${section}"]\`).classList.add('active');

          // Update content sections
          document.querySelectorAll('.section-content').forEach(content => content.classList.add('hidden'));
          document.getElementById(\`\${section}-section\`).classList.remove('hidden');

          // Load section-specific data
          loadSectionData(section);
        }

        // Refresh all data
        function refreshAllData() {
          loadAllData();
        }

        // Load all data
        async function loadAllData() {
          try {
            await loadOverview();
            await loadVisitors();
            await loadProducts();
            await loadDevices();
          } catch (error) {
            console.error('Error loading data:', error);
          }
        }

        // Load section-specific data
        async function loadSectionData(section) {
          try {
            switch(section) {
              case 'overview':
                await loadOverview();
                break;
              case 'visitors':
                await loadVisitors();
                break;
              case 'behavior':
                await loadBehavior();
                break;
              case 'conversion':
                await loadConversions();
                break;
              case 'products':
                await loadProducts();
                break;
              case 'checkout':
                await loadCheckout();
                break;
              case 'licenses':
                await loadLicenses();
                break;
              case 'marketing':
                await loadMarketing();
                break;
              case 'seo':
                await loadSEO();
                break;
              case 'devices':
                await loadDevices();
                break;
            }
          } catch (error) {
            console.error(\`Error loading \${section} data:\`, error);
          }
        }

        // Load Overview
        async function loadOverview() {
          try {
            const response = await axios.get(\`/api/analytics/overview?days=\${currentDays}\`);
            const data = response.data;

            // Update stat cards
            document.getElementById('stat-visitors').textContent = data.visitors?.toLocaleString('de-DE') || '0';
            document.getElementById('stat-pageviews').textContent = data.pageViews?.toLocaleString('de-DE') || '0';
            document.getElementById('stat-revenue').textContent = formatCurrency(data.revenue || 0);
            document.getElementById('stat-conversion').textContent = (data.conversionRate || 0).toFixed(1) + '%';

            // Update changes (mock data for now)
            document.getElementById('stat-visitors-change').innerHTML = '<i class="fas fa-arrow-up"></i><span>+12.5%</span>';
            document.getElementById('stat-pageviews-change').innerHTML = '<i class="fas fa-arrow-up"></i><span>+8.3%</span>';
            document.getElementById('stat-revenue-change').innerHTML = '<i class="fas fa-arrow-up"></i><span>+15.2%</span>';
            document.getElementById('stat-conversion-change').innerHTML = '<i class="fas fa-arrow-up"></i><span>+2.1%</span>';

            // Update top pages table
            if (data.topPages && data.topPages.length > 0) {
              const tbody = document.getElementById('top-pages-table');
              tbody.innerHTML = data.topPages.map(page => \`
                <tr class="table-row border-b">
                  <td class="py-3 px-4">
                    <div class="font-medium">\${page.page_path}</div>
                  </td>
                  <td class="text-right py-3 px-4">\${page.page_views?.toLocaleString('de-DE') || 0}</td>
                  <td class="text-right py-3 px-4">\${page.unique_visitors?.toLocaleString('de-DE') || 0}</td>
                  <td class="text-right py-3 px-4">\${formatDuration(page.avg_duration || 0)}</td>
                  <td class="text-right py-3 px-4">
                    <span class="badge \${(page.bounce_rate || 0) > 50 ? 'badge-danger' : 'badge-success'}">
                      \${(page.bounce_rate || 0).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              \`).join('');
            }

            // Create visitors chart
            createVisitorsChart();
            
            // Create revenue chart
            createRevenueChart();
          } catch (error) {
            console.error('Error loading overview:', error);
          }
        }

        // Load Visitors
        async function loadVisitors() {
          try {
            const response = await axios.get(\`/api/analytics/visitors?days=\${currentDays}\`);
            const data = response.data;

            // Update visitor stats
            const newVisitors = data.visitors?.filter(v => v.returning_visitor === 0).length || 0;
            const returningVisitors = data.visitors?.filter(v => v.returning_visitor === 1).length || 0;
            
            document.getElementById('new-visitors').textContent = newVisitors.toLocaleString('de-DE');
            document.getElementById('returning-visitors').textContent = returningVisitors.toLocaleString('de-DE');
            
            const avgDuration = data.visitors?.reduce((sum, v) => sum + (v.session_duration || 0), 0) / (data.visitors?.length || 1);
            document.getElementById('avg-duration').textContent = formatDuration(avgDuration);

            // Traffic sources chart
            createTrafficSourcesChart(data.visitors || []);

            // Geography list
            const countries = {};
            (data.visitors || []).forEach(visitor => {
              const country = visitor.country || 'Unknown';
              countries[country] = (countries[country] || 0) + 1;
            });

            const geographyHtml = Object.entries(countries)
              .sort((a, b) => b[1] - a[1])
              .map(([country, count]) => \`
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-map-marker-alt text-purple-600"></i>
                    <span class="font-medium">\${country}</span>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="text-gray-600">\${count} Besucher</span>
                    <div class="progress-bar" style="width: 150px;">
                      <div class="progress-fill" style="width: \${(count / data.visitors.length * 100)}%"></div>
                    </div>
                  </div>
                </div>
              \`).join('');

            document.getElementById('geography-list').innerHTML = geographyHtml || '<div class="text-center py-8 text-gray-500">Keine Daten verfügbar</div>';
          } catch (error) {
            console.error('Error loading visitors:', error);
          }
        }

        // Load Behavior
        async function loadBehavior() {
          try {
            // Mock data for behavior
            const eventsHtml = \`
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <i class="fas fa-mouse-pointer text-purple-600 text-xl"></i>
                  <div>
                    <div class="font-medium">Produktansicht</div>
                    <div class="text-sm text-gray-600">product_view</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-purple-600">1,234</div>
                  <div class="text-sm text-gray-600">Events</div>
                </div>
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <i class="fas fa-shopping-cart text-green-600 text-xl"></i>
                  <div>
                    <div class="font-medium">In Warenkorb</div>
                    <div class="text-sm text-gray-600">add_to_cart</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-green-600">456</div>
                  <div class="text-sm text-gray-600">Events</div>
                </div>
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <i class="fas fa-user-plus text-blue-600 text-xl"></i>
                  <div>
                    <div class="font-medium">Registrierung</div>
                    <div class="text-sm text-gray-600">signup</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-blue-600">89</div>
                  <div class="text-sm text-gray-600">Events</div>
                </div>
              </div>
            \`;
            document.getElementById('events-list').innerHTML = eventsHtml;

            // User flow
            const flowHtml = \`
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <div class="w-24 text-right text-sm text-gray-600">100%</div>
                  <div class="flex-1 bg-purple-600 text-white p-3 rounded-lg">
                    Homepage
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-24 text-right text-sm text-gray-600">65%</div>
                  <div class="flex-1 bg-purple-500 text-white p-3 rounded-lg">
                    Produkte
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-24 text-right text-sm text-gray-600">42%</div>
                  <div class="flex-1 bg-purple-400 text-white p-3 rounded-lg">
                    Warenkorb
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-24 text-right text-sm text-gray-600">28%</div>
                  <div class="flex-1 bg-purple-300 text-white p-3 rounded-lg">
                    Checkout
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-24 text-right text-sm text-gray-600">18%</div>
                  <div class="flex-1 bg-green-600 text-white p-3 rounded-lg">
                    Kaufabschluss
                  </div>
                </div>
              </div>
            \`;
            document.getElementById('user-flow').innerHTML = flowHtml;

            // Engagement metrics
            document.getElementById('avg-pages-per-session').textContent = '3.5';
            document.getElementById('avg-time-on-page').textContent = '2:34';
            document.getElementById('bounce-rate').textContent = '42.3%';
            document.getElementById('exit-rate').textContent = '35.8%';
          } catch (error) {
            console.error('Error loading behavior:', error);
          }
        }

        // Load Conversions
        async function loadConversions() {
          try {
            const response = await axios.get(\`/api/analytics/overview?days=\${currentDays}\`);
            const data = response.data;

            document.getElementById('total-conversions').textContent = (data.conversions || 0).toLocaleString('de-DE');
            document.getElementById('conversion-rate-display').textContent = \`Rate: \${(data.conversionRate || 0).toFixed(1)}%\`;
            document.getElementById('total-revenue').textContent = formatCurrency(data.revenue || 0);
            document.getElementById('avg-order-value').textContent = \`AOV: \${formatCurrency((data.revenue || 0) / (data.conversions || 1))}\`;
            document.getElementById('clv').textContent = formatCurrency((data.revenue || 0) * 1.5); // Mock CLV
            document.getElementById('avg-purchases').textContent = \`Ø Käufe: 2.3\`;

            // Conversion funnel
            const funnelHtml = \`
              <div class="flex items-center gap-4">
                <div class="w-32 text-right text-sm text-gray-600">1,000</div>
                <div class="flex-1 bg-purple-600 text-white p-4 rounded-lg text-center font-bold">
                  Besucher
                </div>
                <div class="text-sm text-gray-600">100%</div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-32 text-right text-sm text-gray-600">650</div>
                <div class="flex-1 bg-purple-500 text-white p-4 rounded-lg text-center font-bold" style="width: 65%;">
                  Produktansicht
                </div>
                <div class="text-sm text-gray-600">65%</div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-32 text-right text-sm text-gray-600">420</div>
                <div class="flex-1 bg-purple-400 text-white p-4 rounded-lg text-center font-bold" style="width: 42%;">
                  In Warenkorb
                </div>
                <div class="text-sm text-gray-600">42%</div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-32 text-right text-sm text-gray-600">180</div>
                <div class="flex-1 bg-green-600 text-white p-4 rounded-lg text-center font-bold" style="width: 18%;">
                  Conversion
                </div>
                <div class="text-sm text-gray-600">18%</div>
              </div>
            \`;
            document.getElementById('conversion-funnel').innerHTML = funnelHtml;

            // Revenue by source chart
            createRevenueBySourceChart();
          } catch (error) {
            console.error('Error loading conversions:', error);
          }
        }

        // Load Products
        async function loadProducts() {
          try {
            const response = await axios.get(\`/api/analytics/products?days=\${currentDays}\`);
            const data = response.data;

            if (data.products && data.products.length > 0) {
              const tbody = document.getElementById('products-table');
              tbody.innerHTML = data.products.map(product => {
                const conversion = product.product_views > 0 
                  ? ((product.total_purchases / product.product_views) * 100).toFixed(1)
                  : 0;
                
                return \`
                  <tr class="table-row border-b">
                    <td class="py-3 px-4">
                      <div class="font-medium">\${product.product_name}</div>
                      <div class="text-sm text-gray-600">\${product.product_sku}</div>
                    </td>
                    <td class="text-right py-3 px-4">\${product.product_views.toLocaleString('de-DE')}</td>
                    <td class="text-right py-3 px-4">\${product.total_purchases.toLocaleString('de-DE')}</td>
                    <td class="text-right py-3 px-4 font-bold text-green-600">\${formatCurrency(product.total_revenue)}</td>
                    <td class="text-right py-3 px-4">
                      <span class="badge \${conversion > 5 ? 'badge-success' : 'badge-warning'}">
                        \${conversion}%
                      </span>
                    </td>
                  </tr>
                \`;
              }).join('');
            }

            // Category performance (mock)
            const categoryHtml = \`
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex-1">
                  <div class="font-medium mb-2">Windows Software</div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 85%;"></div>
                  </div>
                </div>
                <div class="ml-4 text-right">
                  <div class="text-xl font-bold text-purple-600">€8,450</div>
                  <div class="text-sm text-gray-600">45 Verkäufe</div>
                </div>
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex-1">
                  <div class="font-medium mb-2">Office Software</div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 65%;"></div>
                  </div>
                </div>
                <div class="ml-4 text-right">
                  <div class="text-xl font-bold text-purple-600">€5,349</div>
                  <div class="text-sm text-gray-600">32 Verkäufe</div>
                </div>
              </div>
            \`;
            document.getElementById('category-performance').innerHTML = categoryHtml;
          } catch (error) {
            console.error('Error loading products:', error);
          }
        }

        // Load Checkout
        async function loadCheckout() {
          try {
            // Mock data
            document.getElementById('carts-started').textContent = '245';
            document.getElementById('carts-completed').textContent = '189';
            document.getElementById('carts-abandoned').textContent = '56';

            // Checkout funnel
            const checkoutFunnelHtml = \`
              <div class="flex items-center gap-4">
                <div class="w-32 text-right">245</div>
                <div class="flex-1 bg-purple-600 text-white p-4 rounded-lg text-center">Warenkorb gestartet</div>
                <div class="text-sm text-gray-600">100%</div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-32 text-right">210</div>
                <div class="flex-1 bg-purple-500 text-white p-4 rounded-lg text-center" style="width: 85.7%;">Adresse eingegeben</div>
                <div class="text-sm text-gray-600">85.7%</div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-32 text-right">189</div>
                <div class="flex-1 bg-green-600 text-white p-4 rounded-lg text-center" style="width: 77.1%;">Bezahlung abgeschlossen</div>
                <div class="text-sm text-gray-600">77.1%</div>
              </div>
            \`;
            document.getElementById('checkout-funnel').innerHTML = checkoutFunnelHtml;

            // Abandoned carts table
            const abandonedHtml = \`
              <tr class="table-row border-b">
                <td class="py-3 px-4">sess_abc123</td>
                <td class="py-3 px-4">vor 2 Stunden</td>
                <td class="text-right py-3 px-4 font-bold">€149.99</td>
                <td class="py-3 px-4"><span class="badge badge-danger">Abgebrochen</span></td>
              </tr>
              <tr class="table-row border-b">
                <td class="py-3 px-4">sess_def456</td>
                <td class="py-3 px-4">vor 5 Stunden</td>
                <td class="text-right py-3 px-4 font-bold">€89.99</td>
                <td class="py-3 px-4"><span class="badge badge-danger">Abgebrochen</span></td>
              </tr>
            \`;
            document.getElementById('abandoned-carts-table').innerHTML = abandonedHtml;
          } catch (error) {
            console.error('Error loading checkout:', error);
          }
        }

        // Load Licenses
        async function loadLicenses() {
          try {
            // Mock data
            document.getElementById('active-licenses').textContent = '1,234';
            document.getElementById('total-downloads').textContent = '4,567';
            document.getElementById('expiring-licenses').textContent = '23';

            // Licenses table
            const licensesHtml = \`
              <tr class="table-row border-b">
                <td class="py-3 px-4 font-mono text-sm">XXXXX-XXXXX-XXXXX</td>
                <td class="py-3 px-4">Windows 11 Pro</td>
                <td class="py-3 px-4">vor 2 Stunden</td>
                <td class="py-3 px-4"><span class="badge badge-success">Aktiv</span></td>
              </tr>
              <tr class="table-row border-b">
                <td class="py-3 px-4 font-mono text-sm">YYYYY-YYYYY-YYYYY</td>
                <td class="py-3 px-4">Office 2021 Pro Plus</td>
                <td class="py-3 px-4">vor 5 Stunden</td>
                <td class="py-3 px-4"><span class="badge badge-success">Aktiv</span></td>
              </tr>
            \`;
            document.getElementById('licenses-table').innerHTML = licensesHtml;
          } catch (error) {
            console.error('Error loading licenses:', error);
          }
        }

        // Load Marketing
        async function loadMarketing() {
          try {
            // Mock data
            document.getElementById('active-campaigns').textContent = '12';
            document.getElementById('total-clicks').textContent = '8,456';
            document.getElementById('avg-cpc').textContent = '€1.23';
            document.getElementById('marketing-roi').textContent = '4.5x';

            // Campaigns table
            const campaignsHtml = \`
              <tr class="table-row border-b">
                <td class="py-3 px-4">Google Ads - Windows</td>
                <td class="text-right py-3 px-4">2,345</td>
                <td class="text-right py-3 px-4">145</td>
                <td class="text-right py-3 px-4">€1,234</td>
                <td class="text-right py-3 px-4 font-bold text-green-600">€5,678</td>
                <td class="text-right py-3 px-4"><span class="badge badge-success">4.6x</span></td>
              </tr>
              <tr class="table-row border-b">
                <td class="py-3 px-4">Facebook - Office</td>
                <td class="text-right py-3 px-4">1,890</td>
                <td class="text-right py-3 px-4">89</td>
                <td class="text-right py-3 px-4">€890</td>
                <td class="text-right py-3 px-4 font-bold text-green-600">€3,456</td>
                <td class="text-right py-3 px-4"><span class="badge badge-success">3.9x</span></td>
              </tr>
            \`;
            document.getElementById('campaigns-table').innerHTML = campaignsHtml;
          } catch (error) {
            console.error('Error loading marketing:', error);
          }
        }

        // Load SEO
        async function loadSEO() {
          try {
            // Mock data
            document.getElementById('indexed-pages').textContent = '124';
            document.getElementById('organic-traffic').textContent = '45.2%';
            document.getElementById('avg-position').textContent = '12.5';
            document.getElementById('ctr').textContent = '3.8%';

            // SEO pages table
            const seoHtml = \`
              <tr class="table-row border-b">
                <td class="py-3 px-4">Homepage</td>
                <td class="text-right py-3 px-4">12,345</td>
                <td class="text-right py-3 px-4">456</td>
                <td class="text-right py-3 px-4">3.7%</td>
                <td class="text-right py-3 px-4"><span class="badge badge-success">8.5</span></td>
              </tr>
              <tr class="table-row border-b">
                <td class="py-3 px-4">Produkte</td>
                <td class="text-right py-3 px-4">8,901</td>
                <td class="text-right py-3 px-4">321</td>
                <td class="text-right py-3 px-4">3.6%</td>
                <td class="text-right py-3 px-4"><span class="badge badge-success">12.3</span></td>
              </tr>
            \`;
            document.getElementById('seo-pages-table').innerHTML = seoHtml;
          } catch (error) {
            console.error('Error loading SEO:', error);
          }
        }

        // Load Devices
        async function loadDevices() {
          try {
            const response = await axios.get(\`/api/analytics/devices?days=\${currentDays}\`);
            const data = response.data;

            // Device types chart
            createDeviceTypesChart(data.devices || []);

            // Browsers chart
            createBrowsersChart(data.devices || []);

            // Devices table
            if (data.devices && data.devices.length > 0) {
              const tbody = document.getElementById('devices-table');
              tbody.innerHTML = data.devices.map(device => \`
                <tr class="table-row border-b">
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-\${getDeviceIcon(device.device_type)}"></i>
                      <span>\${device.device_type} / \${device.browser_name}</span>
                    </div>
                  </td>
                  <td class="text-right py-3 px-4">\${device.total_visitors?.toLocaleString('de-DE') || 0}</td>
                  <td class="text-right py-3 px-4">
                    <span class="badge \${(device.bounce_rate || 0) > 50 ? 'badge-danger' : 'badge-success'}">
                      \${(device.bounce_rate || 0).toFixed(1)}%
                    </span>
                  </td>
                  <td class="text-right py-3 px-4">\${formatDuration(device.avg_duration || 0)}</td>
                  <td class="text-right py-3 px-4">\${device.total_conversions || 0}</td>
                </tr>
              \`).join('');
            }
          } catch (error) {
            console.error('Error loading devices:', error);
          }
        }

        // Chart creation functions
        function createVisitorsChart() {
          const ctx = document.getElementById('visitors-chart');
          if (!ctx) return;

          if (charts.visitors) {
            charts.visitors.destroy();
          }

          charts.visitors = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
              datasets: [{
                label: 'Besucher',
                data: [120, 150, 180, 170, 200, 190, 210],
                borderColor: '#667eea',
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

        function createRevenueChart() {
          const ctx = document.getElementById('revenue-chart');
          if (!ctx) return;

          if (charts.revenue) {
            charts.revenue.destroy();
          }

          charts.revenue = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
              datasets: [{
                label: 'Umsatz (€)',
                data: [1200, 1500, 1800, 1700, 2200, 1900, 2100],
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
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

        function createTrafficSourcesChart(visitors) {
          const ctx = document.getElementById('traffic-sources-chart');
          if (!ctx) return;

          if (charts.trafficSources) {
            charts.trafficSources.destroy();
          }

          const sources = {};
          visitors.forEach(visitor => {
            const source = visitor.traffic_source || 'Direct';
            sources[source] = (sources[source] || 0) + 1;
          });

          charts.trafficSources = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: Object.keys(sources),
              datasets: [{
                data: Object.values(sources),
                backgroundColor: [
                  '#667eea',
                  '#764ba2',
                  '#f093fb',
                  '#4facfe',
                  '#43e97b'
                ]
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom' }
              }
            }
          });
        }

        function createRevenueBySourceChart() {
          const ctx = document.getElementById('revenue-by-source-chart');
          if (!ctx) return;

          if (charts.revenueBySource) {
            charts.revenueBySource.destroy();
          }

          charts.revenueBySource = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Google', 'Direct', 'Social Media', 'Email'],
              datasets: [{
                label: 'Umsatz (€)',
                data: [5000, 3500, 2000, 1500],
                backgroundColor: [
                  'rgba(102, 126, 234, 0.8)',
                  'rgba(118, 75, 162, 0.8)',
                  'rgba(240, 147, 251, 0.8)',
                  'rgba(79, 172, 254, 0.8)'
                ]
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

        function createDeviceTypesChart(devices) {
          const ctx = document.getElementById('device-types-chart');
          if (!ctx) return;

          if (charts.deviceTypes) {
            charts.deviceTypes.destroy();
          }

          const deviceCounts = {};
          devices.forEach(device => {
            const type = device.device_type || 'Unknown';
            deviceCounts[type] = (deviceCounts[type] || 0) + (device.total_visitors || 0);
          });

          charts.deviceTypes = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: Object.keys(deviceCounts),
              datasets: [{
                data: Object.values(deviceCounts),
                backgroundColor: [
                  '#667eea',
                  '#764ba2',
                  '#f093fb',
                  '#4facfe'
                ]
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom' }
              }
            }
          });
        }

        function createBrowsersChart(devices) {
          const ctx = document.getElementById('browsers-chart');
          if (!ctx) return;

          if (charts.browsers) {
            charts.browsers.destroy();
          }

          const browserCounts = {};
          devices.forEach(device => {
            const browser = device.browser_name || 'Unknown';
            browserCounts[browser] = (browserCounts[browser] || 0) + (device.total_visitors || 0);
          });

          charts.browsers = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: Object.keys(browserCounts),
              datasets: [{
                data: Object.values(browserCounts),
                backgroundColor: [
                  '#667eea',
                  '#764ba2',
                  '#f093fb',
                  '#4facfe',
                  '#43e97b'
                ]
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom' }
              }
            }
          });
        }

        // Utility functions
        function formatCurrency(amount) {
          return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
          }).format(amount || 0);
        }

        function formatDuration(seconds) {
          const minutes = Math.floor(seconds / 60);
          const secs = Math.floor(seconds % 60);
          return \`\${minutes}:\${secs.toString().padStart(2, '0')}\`;
        }

        function getDeviceIcon(deviceType) {
          const icons = {
            'Desktop': 'desktop',
            'Mobile': 'mobile-alt',
            'Tablet': 'tablet-alt'
          };
          return icons[deviceType] || 'question';
        }
      </script>
    </body>
    </html>
  `;
}
