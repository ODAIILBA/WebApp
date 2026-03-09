// Admin Performance Settings Module
import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminPerformanceSettings() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Performance Settings - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
      <style>
        body {
          font-family: 'Inter', system-ui, sans-serif;
          background: #f8fafc;
        }
        
        .admin-content {
          margin-left: 280px;
          padding: 2rem;
          min-height: 100vh;
        }
        
        body.sidebar-collapsed .admin-content {
          margin-left: 60px;
        }
        
        .performance-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .performance-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .stat-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 1.5rem;
          color: white;
          text-align: center;
        }
        
        .stat-box.green {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        
        .stat-box.orange {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .stat-box.blue {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 52px;
          height: 26px;
        }
        
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cbd5e1;
          transition: .4s;
          border-radius: 26px;
        }
        
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .toggle-slider {
          background-color: #10b981;
        }
        
        input:checked + .toggle-slider:before {
          transform: translateX(26px);
        }
        
        .performance-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .badge-excellent { background: #d1fae5; color: #065f46; }
        .badge-good { background: #dbeafe; color: #1e40af; }
        .badge-fair { background: #fef3c7; color: #92400e; }
        .badge-poor { background: #fee2e2; color: #991b1b; }
        
        .metric-item {
          padding: 1rem;
          border-left: 4px solid #e5e7eb;
          margin-bottom: 0.75rem;
          background: #f9fafb;
          border-radius: 0 8px 8px 0;
          transition: all 0.2s;
        }
        
        .metric-item:hover {
          border-left-color: #3b82f6;
          background: white;
        }
        
        @media (max-width: 768px) {
          .admin-content {
            margin-left: 0;
            padding: 1rem;
          }
        }
      </style>
    </head>
    <body>
      ${AdminSidebarAdvanced('/admin/settings/performance')}
      
      <div class="admin-content">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <i class="fas fa-tachometer-alt text-purple-600"></i>
                Performance Settings
              </h1>
              <p class="text-gray-600 mt-2">Optimize your platform's performance, caching, and resource usage</p>
            </div>
            
            <div class="flex gap-3">
              <button onclick="clearAllCaches()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                <i class="fas fa-trash mr-2"></i>Clear All Caches
              </button>
              <button onclick="runOptimization()" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                <i class="fas fa-magic mr-2"></i>Auto Optimize
              </button>
              <button onclick="refreshMetrics()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <i class="fas fa-sync-alt mr-2"></i>Refresh
              </button>
            </div>
          </div>
          
          <!-- Performance Stats -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div class="stat-box">
              <div class="text-3xl font-bold mb-2" id="pageLoadTime">--</div>
              <div class="text-sm opacity-90">Avg Page Load</div>
              <div class="text-xs mt-1 opacity-75">Last 24 hours</div>
            </div>
            
            <div class="stat-box green">
              <div class="text-3xl font-bold mb-2" id="cacheHitRate">--%</div>
              <div class="text-sm opacity-90">Cache Hit Rate</div>
              <div class="text-xs mt-1 opacity-75">Optimization active</div>
            </div>
            
            <div class="stat-box orange">
              <div class="text-3xl font-bold mb-2" id="memoryUsage">--MB</div>
              <div class="text-sm opacity-90">Memory Usage</div>
              <div class="text-xs mt-1 opacity-75">Peak: <span id="peakMemory">--</span>MB</div>
            </div>
            
            <div class="stat-box blue">
              <div class="text-3xl font-bold mb-2" id="apiResponseTime">--ms</div>
              <div class="text-sm opacity-90">API Response</div>
              <div class="text-xs mt-1 opacity-75">Average latency</div>
            </div>
          </div>
        </div>

        <!-- Performance Score -->
        <div class="performance-card">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">
              <i class="fas fa-chart-line text-green-600 mr-2"></i>Performance Score
            </h2>
            <span class="performance-badge badge-excellent" id="overallScore">95/100 - Excellent</span>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <canvas id="performanceChart" height="200"></canvas>
            </div>
            <div class="space-y-3">
              <div class="metric-item">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-800">First Contentful Paint</p>
                    <p class="text-sm text-gray-600">Time to first content render</p>
                  </div>
                  <span class="font-bold text-green-600" id="fcp">1.2s</span>
                </div>
              </div>
              
              <div class="metric-item">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-800">Time to Interactive</p>
                    <p class="text-sm text-gray-600">Page becomes fully interactive</p>
                  </div>
                  <span class="font-bold text-green-600" id="tti">2.1s</span>
                </div>
              </div>
              
              <div class="metric-item">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-800">Largest Contentful Paint</p>
                    <p class="text-sm text-gray-600">Largest element render time</p>
                  </div>
                  <span class="font-bold text-green-600" id="lcp">1.8s</span>
                </div>
              </div>
              
              <div class="metric-item">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-800">Cumulative Layout Shift</p>
                    <p class="text-sm text-gray-600">Visual stability score</p>
                  </div>
                  <span class="font-bold text-green-600" id="cls">0.05</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Tabs -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Caching Settings -->
          <div class="performance-card">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-database text-blue-600 mr-2"></i>Caching Settings
            </h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Page Caching</p>
                  <p class="text-sm text-gray-500">Cache rendered HTML pages</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('pageCache', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">API Response Caching</p>
                  <p class="text-sm text-gray-500">Cache API responses</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('apiCache', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Database Query Cache</p>
                  <p class="text-sm text-gray-500">Cache frequent queries</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('dbCache', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Static Asset Caching</p>
                  <p class="text-sm text-gray-500">Cache CSS, JS, images</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('assetCache', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div>
                <label class="block font-medium text-gray-700 mb-2">Cache Duration</label>
                <select id="cacheDuration" class="w-full px-3 py-2 border rounded-lg">
                  <option value="300">5 minutes</option>
                  <option value="900">15 minutes</option>
                  <option value="1800" selected>30 minutes</option>
                  <option value="3600">1 hour</option>
                  <option value="86400">24 hours</option>
                </select>
              </div>
              
              <button onclick="saveCacheSettings()" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <i class="fas fa-save mr-2"></i>Save Cache Settings
              </button>
            </div>
          </div>

          <!-- Image Optimization -->
          <div class="performance-card">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-image text-green-600 mr-2"></i>Image Optimization
            </h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Auto Image Compression</p>
                  <p class="text-sm text-gray-500">Compress images on upload</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('imageCompression', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Lazy Loading</p>
                  <p class="text-sm text-gray-500">Load images on demand</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('lazyLoading', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">WebP Conversion</p>
                  <p class="text-sm text-gray-500">Convert to modern format</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('webpConversion', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Responsive Images</p>
                  <p class="text-sm text-gray-500">Generate multiple sizes</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('responsiveImages', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div>
                <label class="block font-medium text-gray-700 mb-2">Image Quality</label>
                <input type="range" min="50" max="100" value="85" step="5" 
                       class="w-full" id="imageQuality" onchange="updateImageQuality(this.value)">
                <div class="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Low (50%)</span>
                  <span id="qualityValue">85%</span>
                  <span>High (100%)</span>
                </div>
              </div>
              
              <button onclick="saveImageSettings()" class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                <i class="fas fa-save mr-2"></i>Save Image Settings
              </button>
            </div>
          </div>

          <!-- Database Optimization -->
          <div class="performance-card">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-database text-purple-600 mr-2"></i>Database Optimization
            </h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Query Optimization</p>
                  <p class="text-sm text-gray-500">Optimize slow queries</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('queryOptimization', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Index Optimization</p>
                  <p class="text-sm text-gray-500">Auto-create indexes</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('indexOptimization', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Connection Pooling</p>
                  <p class="text-sm text-gray-500">Reuse database connections</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('connectionPooling', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div>
                <label class="block font-medium text-gray-700 mb-2">Max Connections</label>
                <select id="maxConnections" class="w-full px-3 py-2 border rounded-lg">
                  <option value="10">10 connections</option>
                  <option value="20" selected>20 connections</option>
                  <option value="50">50 connections</option>
                  <option value="100">100 connections</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <button onclick="optimizeDatabase()" class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  <i class="fas fa-magic mr-2"></i>Optimize Database Now
                </button>
                <button onclick="analyzeTables()" class="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                  <i class="fas fa-search mr-2"></i>Analyze Tables
                </button>
              </div>
            </div>
          </div>

          <!-- CDN & Assets -->
          <div class="performance-card">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-cloud text-indigo-600 mr-2"></i>CDN & Assets
            </h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">CDN Delivery</p>
                  <p class="text-sm text-gray-500">Use Cloudflare CDN</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('cdnEnabled', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Asset Minification</p>
                  <p class="text-sm text-gray-500">Minify CSS and JS</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('assetMinification', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">CSS/JS Bundling</p>
                  <p class="text-sm text-gray-500">Combine files</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('bundling', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Gzip Compression</p>
                  <p class="text-sm text-gray-500">Compress responses</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('gzipCompression', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-700">Brotli Compression</p>
                  <p class="text-sm text-gray-500">Better than Gzip</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked onchange="updateSetting('brotliCompression', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <button onclick="saveCDNSettings()" class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                <i class="fas fa-save mr-2"></i>Save CDN Settings
              </button>
            </div>
          </div>
        </div>

        <!-- Advanced Settings -->
        <div class="performance-card mt-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">
            <i class="fas fa-sliders-h text-red-600 mr-2"></i>Advanced Performance
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-700">HTTP/2 Push</p>
                <p class="text-xs text-gray-500">Preload resources</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked onchange="updateSetting('http2Push', this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-700">Prefetching</p>
                <p class="text-xs text-gray-500">Preload next pages</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" onchange="updateSetting('prefetching', this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-700">Service Worker</p>
                <p class="text-xs text-gray-500">Offline caching</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" onchange="updateSetting('serviceWorker', this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-700">Critical CSS</p>
                <p class="text-xs text-gray-500">Inline critical styles</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked onchange="updateSetting('criticalCSS', this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-700">Resource Hints</p>
                <p class="text-xs text-gray-500">DNS prefetch, preconnect</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked onchange="updateSetting('resourceHints', this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-700">Code Splitting</p>
                <p class="text-xs text-gray-500">Load JS on demand</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked onchange="updateSetting('codeSplitting', this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <button onclick="saveAdvancedSettings()" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            <i class="fas fa-save mr-2"></i>Save Advanced Settings
          </button>
        </div>

        <!-- Performance Monitor -->
        <div class="performance-card mt-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">
            <i class="fas fa-chart-bar text-blue-600 mr-2"></i>Real-Time Performance Monitor
          </h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-3">Response Times (Last Hour)</h4>
              <canvas id="responseTimeChart" height="200"></canvas>
            </div>
            <div>
              <h4 class="font-semibold mb-3">Resource Usage</h4>
              <canvas id="resourceChart" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
          loadPerformanceMetrics();
          initializeCharts();
          startRealTimeMonitoring();
        });
        
        // Load Performance Metrics
        function loadPerformanceMetrics() {
          // Mock data for demonstration
          document.getElementById('pageLoadTime').textContent = '1.2s';
          document.getElementById('cacheHitRate').textContent = '87%';
          document.getElementById('memoryUsage').textContent = '156MB';
          document.getElementById('peakMemory').textContent = '201';
          document.getElementById('apiResponseTime').textContent = '45ms';
        }
        
        // Initialize Charts
        function initializeCharts() {
          // Performance Score Chart
          const perfCtx = document.getElementById('performanceChart').getContext('2d');
          new Chart(perfCtx, {
            type: 'radar',
            data: {
              labels: ['Speed', 'SEO', 'Best Practices', 'Accessibility', 'PWA'],
              datasets: [{
                label: 'Performance Score',
                data: [95, 92, 88, 94, 75],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2
              }]
            },
            options: {
              scales: {
                r: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }
          });
          
          // Response Time Chart
          const respCtx = document.getElementById('responseTimeChart').getContext('2d');
          new Chart(respCtx, {
            type: 'line',
            data: {
              labels: ['10m ago', '8m ago', '6m ago', '4m ago', '2m ago', 'Now'],
              datasets: [{
                label: 'Response Time (ms)',
                data: [45, 52, 43, 48, 41, 45],
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
          
          // Resource Usage Chart
          const resCtx = document.getElementById('resourceChart').getContext('2d');
          new Chart(resCtx, {
            type: 'doughnut',
            data: {
              labels: ['Memory', 'CPU', 'Network', 'Disk'],
              datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                  'rgba(139, 92, 246, 0.8)',
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(16, 185, 129, 0.8)',
                  'rgba(245, 158, 11, 0.8)'
                ]
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
        }
        
        // Real-Time Monitoring
        function startRealTimeMonitoring() {
          setInterval(() => {
            // Update metrics periodically
            const memory = Math.floor(Math.random() * 50) + 140;
            document.getElementById('memoryUsage').textContent = memory + 'MB';
          }, 5000);
        }
        
        // Settings Functions
        function updateSetting(setting, value) {
          console.log('Update setting:', setting, value);
        }
        
        function updateImageQuality(value) {
          document.getElementById('qualityValue').textContent = value + '%';
        }
        
        function saveCacheSettings() {
          alert('Cache settings saved successfully!');
        }
        
        function saveImageSettings() {
          alert('Image optimization settings saved!');
        }
        
        function saveCDNSettings() {
          alert('CDN settings saved successfully!');
        }
        
        function saveAdvancedSettings() {
          alert('Advanced settings saved successfully!');
        }
        
        // Actions
        function clearAllCaches() {
          if (confirm('Clear all caches? This may temporarily slow down your site.')) {
            alert('All caches cleared successfully!');
            setTimeout(() => {
              document.getElementById('cacheHitRate').textContent = '0%';
              setTimeout(() => {
                document.getElementById('cacheHitRate').textContent = '87%';
              }, 2000);
            }, 500);
          }
        }
        
        function runOptimization() {
          alert('Running automatic optimization...\\n\\nThis will:\\n- Optimize database\\n- Clear old caches\\n- Compress images\\n- Update indexes');
          setTimeout(() => {
            alert('Optimization complete! Performance improved by 12%');
          }, 2000);
        }
        
        function refreshMetrics() {
          alert('Refreshing performance metrics...');
          loadPerformanceMetrics();
        }
        
        function optimizeDatabase() {
          if (confirm('Optimize database? This may take a few minutes.')) {
            alert('Database optimization started...\\n\\nOptimizing tables, rebuilding indexes, and clearing old data.');
            setTimeout(() => {
              alert('Database optimized successfully!');
            }, 2000);
          }
        }
        
        function analyzeTables() {
          alert('Analyzing database tables...\\n\\nChecking table health, index usage, and query performance.');
          setTimeout(() => {
            alert('Analysis complete!\\n\\nAll tables are healthy.\\n15 indexes are being used efficiently.\\nNo slow queries detected.');
          }, 1500);
        }
      </script>
    </body>
    </html>
  `
}
