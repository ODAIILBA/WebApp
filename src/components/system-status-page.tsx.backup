/**
 * Real-Time System Status Page - Complete HTML
 */
export function SystemStatusPage() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Systemstatus - SOFTWAREKING24 Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
        <style>
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            50% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          }
          .alert-pulse { animation: pulse-glow 2s infinite; }
          
          .card-hover:hover {
            transform: translateY(-2px);
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }
          
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <div class="ml-64 p-8">
            <!-- Header -->
            <div class="mb-8 flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">
                        <i class="fas fa-server mr-2 text-green-600"></i>
                        Real-Time System Monitor
                    </h1>
                    <p class="text-gray-600">Live System Health & Performance Monitoring</p>
                </div>
                
                <div class="flex items-center gap-4">
                    <!-- Connection Status -->
                    <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow">
                        <div id="connection-indicator" class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span id="connection-status" class="text-sm font-medium text-green-600">Live</span>
                        <span class="text-xs text-gray-500 ml-2">Last update: <span id="last-update-time">--:--:--</span></span>
                    </div>
                    
                    <!-- Controls -->
                    <button id="auto-refresh-btn" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        <i class="fas fa-sync mr-2"></i>Auto-Refresh: ON
                    </button>
                    <button id="refresh-btn" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                        <i class="fas fa-refresh"></i>
                    </button>
                </div>
            </div>
            
            <!-- Alerts Section -->
            <div class="mb-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-bold text-gray-900">System Alerts</h2>
                        <div class="flex gap-4">
                            <span class="text-sm">
                                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
                                    <span id="warning-count">0</span> Warnings
                                </span>
                            </span>
                            <span class="text-sm">
                                <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full font-semibold">
                                    <span id="critical-count">0</span> Critical
                                </span>
                            </span>
                        </div>
                    </div>
                    <div id="alerts-container" class="space-y-2">
                        <div class="text-green-600 text-sm">✅ All systems operating normally</div>
                    </div>
                </div>
            </div>
            
            <!-- Main Metrics Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <!-- CPU Card -->
                <div class="bg-white rounded-lg shadow-md p-6 card-hover cursor-pointer" onclick="showDetailView('cpu')">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-gray-900">CPU Usage</h3>
                        <i class="fas fa-microchip text-3xl text-blue-500"></i>
                    </div>
                    <div class="mb-2">
                        <div class="flex items-end gap-2">
                            <span id="cpu-usage" class="text-3xl font-bold text-blue-600">--</span>
                            <span class="text-gray-500 mb-1">%</span>
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div id="cpu-bar" class="bg-blue-500 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                    <div class="h-16">
                        <canvas id="cpu-chart"></canvas>
                    </div>
                </div>
                
                <!-- Memory Card -->
                <div class="bg-white rounded-lg shadow-md p-6 card-hover cursor-pointer" onclick="showDetailView('memory')">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-gray-900">Memory Usage</h3>
                        <i class="fas fa-memory text-3xl text-green-500"></i>
                    </div>
                    <div class="mb-2">
                        <div class="flex items-end gap-2">
                            <span id="memory-usage" class="text-3xl font-bold text-green-600">--</span>
                            <span class="text-gray-500 mb-1">%</span>
                        </div>
                        <div class="text-xs text-gray-500">
                            <span id="memory-used">--</span> / <span id="memory-total">--</span> MB
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div id="memory-bar" class="bg-green-500 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                    <div class="h-16">
                        <canvas id="memory-chart"></canvas>
                    </div>
                </div>
                
                <!-- Database Card -->
                <div class="bg-white rounded-lg shadow-md p-6 card-hover cursor-pointer" onclick="showDetailView('database')">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-gray-900">Database</h3>
                        <i class="fas fa-database text-3xl text-purple-500"></i>
                    </div>
                    <div class="space-y-2 mb-3">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Connections:</span>
                            <span id="db-connections" class="font-semibold">--</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Query Load:</span>
                            <span id="db-query-load" class="font-semibold">--</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Response:</span>
                            <span id="db-response-time" class="font-semibold">--</span>
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div id="db-bar" class="bg-purple-500 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                    <div class="h-16">
                        <canvas id="db-chart"></canvas>
                    </div>
                </div>
                
                <!-- API Card -->
                <div class="bg-white rounded-lg shadow-md p-6 card-hover cursor-pointer" onclick="showDetailView('api')">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-gray-900">API Health</h3>
                        <i class="fas fa-plug text-3xl text-amber-500"></i>
                    </div>
                    <div class="space-y-2 mb-3">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Req/min:</span>
                            <span id="api-requests" class="font-semibold">--</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Response:</span>
                            <span id="api-response-time" class="font-semibold">--</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Error Rate:</span>
                            <span id="api-error-rate" class="font-semibold">--</span>
                        </div>
                    </div>
                    <div class="h-16 mt-6">
                        <canvas id="api-chart"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- Uptime Card -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-2xl font-bold mb-2">System Uptime</h3>
                        <div class="flex items-center gap-6">
                            <div>
                                <div class="text-4xl font-bold" id="uptime-percentage">99.98%</div>
                                <div class="text-sm opacity-80">Last 30 days</div>
                            </div>
                            <div class="border-l border-white/30 pl-6">
                                <div class="text-2xl font-bold" id="uptime-duration">12d 4h</div>
                                <div class="text-sm opacity-80">Current uptime</div>
                            </div>
                        </div>
                    </div>
                    <i class="fas fa-clock text-6xl opacity-20"></i>
                </div>
            </div>
            
            <!-- External Services -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-network-wired mr-2 text-blue-600"></i>
                    External Services
                </h2>
                <div id="services-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <!-- Services will be loaded here -->
                </div>
            </div>
            
            <!-- Request Analytics -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-chart-line mr-2 text-green-600"></i>
                    Request Analytics
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div class="text-center p-4 bg-blue-50 rounded-lg">
                        <div class="text-3xl font-bold text-blue-600" id="requests-today">--</div>
                        <div class="text-sm text-gray-600 mt-1">Requests Today</div>
                    </div>
                    <div class="text-center p-4 bg-green-50 rounded-lg">
                        <div class="text-3xl font-bold text-green-600" id="api-calls-today">--</div>
                        <div class="text-sm text-gray-600 mt-1">API Calls</div>
                    </div>
                    <div class="text-center p-4 bg-red-50 rounded-lg">
                        <div class="text-3xl font-bold text-red-600" id="blocked-requests">--</div>
                        <div class="text-sm text-gray-600 mt-1">Blocked</div>
                    </div>
                    <div class="text-center p-4 bg-yellow-50 rounded-lg">
                        <div class="text-3xl font-bold text-yellow-600" id="failed-logins">--</div>
                        <div class="text-sm text-gray-600 mt-1">Failed Logins</div>
                    </div>
                    <div class="col-span-2 p-4 bg-purple-50 rounded-lg">
                        <div class="text-sm text-gray-600 mb-1">Top IP Address</div>
                        <div class="text-xl font-bold text-purple-600 font-mono" id="top-ip">--</div>
                        <div class="text-xs text-gray-500"><span id="top-ip-count">--</span> requests</div>
                    </div>
                </div>
            </div>
            
            <!-- Security Overview -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6 card-hover cursor-pointer" onclick="showDetailView('security')">
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-shield-alt mr-2 text-red-600"></i>
                    Security Overview
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-2xl font-bold text-gray-900" id="active-firewall-rules">--</div>
                        <div class="text-xs text-gray-600 mt-1">Active Rules</div>
                    </div>
                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-2xl font-bold text-gray-900" id="blocked-ip-count">--</div>
                        <div class="text-xs text-gray-600 mt-1">Blocked IPs</div>
                    </div>
                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-2xl font-bold text-gray-900" id="failed-logins-24h">--</div>
                        <div class="text-xs text-gray-600 mt-1">Failed Logins (24h)</div>
                    </div>
                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-2xl font-bold text-gray-900" id="twofa-percentage">--</div>
                        <div class="text-xs text-gray-600 mt-1">2FA Enabled</div>
                    </div>
                </div>
            </div>
            
            <!-- Background Services -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-cogs mr-2 text-gray-600"></i>
                    Background Services
                </h2>
                <div id="background-services-container" class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <!-- Services will be loaded here -->
                </div>
            </div>
            
            <!-- Activity Logs -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-bold text-gray-900">
                        <i class="fas fa-list mr-2 text-blue-600"></i>
                        Activity Logs
                    </h2>
                    <div class="flex gap-2">
                        <select id="severity-filter" class="px-3 py-1 border rounded">
                            <option value="all">All Severities</option>
                            <option value="info">Info</option>
                            <option value="warning">Warning</option>
                            <option value="error">Error</option>
                            <option value="security">Security</option>
                        </select>
                        <select id="module-filter" class="px-3 py-1 border rounded">
                            <option value="all">All Modules</option>
                            <option value="system">System</option>
                            <option value="api">API</option>
                            <option value="security">Security</option>
                            <option value="database">Database</option>
                        </select>
                        <input type="text" id="log-search" placeholder="Search..." class="px-3 py-1 border rounded">
                        <button id="export-logs-btn" class="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                            <i class="fas fa-download mr-1"></i>Export CSV
                        </button>
                    </div>
                </div>
                <div id="activity-logs-container" class="overflow-x-auto">
                    <!-- Logs will be loaded here -->
                </div>
                <div class="mt-4 text-sm text-gray-600 text-center" id="pagination-info">
                    Loading logs...
                </div>
            </div>
        </div>
        
        <script src="/static/system-monitor.js"></script>
    </body>
    </html>
  `
}
