/**
 * Real-Time System Monitor - Frontend
 * Complete implementation with live charts, alerts, and interactive features
 */

// Configuration
const CONFIG = {
  refreshInterval: 5000, // 5 seconds
  maxDataPoints: 60,     // Keep 60 data points (5 minutes at 5s interval)
  autoRefresh: true
}

// State
const state = {
  isConnected: false,
  lastUpdate: null,
  autoRefreshEnabled: true,
  refreshTimer: null,
  charts: {},
  currentFilter: {
    severity: 'all',
    module: 'all',
    search: ''
  },
  pagination: {
    offset: 0,
    limit: 50,
    total: 0
  }
}

// Data storage
const metricsHistory = {
  cpu: [],
  memory: [],
  dbLoad: [],
  apiRequests: []
}

/**
 * Initialize the system monitor
 */
async function initMonitor() {
  console.log('Initializing system monitor...')
  
  // Initialize charts
  initializeCharts()
  
  // Load initial data
  await loadSystemData()
  
  // Start auto-refresh
  if (state.autoRefreshEnabled) {
    startAutoRefresh()
  }
  
  // Setup event listeners
  setupEventListeners()
  
  console.log('System monitor initialized')
}

/**
 * Load system data from API
 */
async function loadSystemData() {
  try {
    updateConnectionStatus(true)
    
    const response = await axios.get('/api/admin/system/monitor')
    const data = response.data
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to load system data')
    }
    
    // Update UI
    updateMetrics(data.metrics)
    updateCharts(data.metrics)
    updateAlerts(data.alerts)
    updateServices(data.services)
    updateAnalytics(data.analytics)
    updateSecurity(data.security)
    updateBackgroundServices(data.backgroundServices)
    
    // Update timestamp
    state.lastUpdate = new Date()
    updateTimestamp()
    
  } catch (error) {
    console.error('Failed to load system data:', error)
    updateConnectionStatus(false)
    showNotification('Failed to load system data', 'error')
  }
}

/**
 * Update metrics display
 */
function updateMetrics(metrics) {
  // CPU
  document.getElementById('cpu-usage').textContent = `${metrics.cpu.usage}%`
  document.getElementById('cpu-bar').style.width = `${metrics.cpu.usage}%`
  updateBarColor('cpu-bar', metrics.cpu.usage, 70, 85)
  
  // Memory
  document.getElementById('memory-usage').textContent = `${metrics.memory.usage}%`
  document.getElementById('memory-used').textContent = `${metrics.memory.used} MB`
  document.getElementById('memory-total').textContent = `${metrics.memory.total} MB`
  document.getElementById('memory-bar').style.width = `${metrics.memory.usage}%`
  updateBarColor('memory-bar', metrics.memory.usage, 70, 85)
  
  // Database
  document.getElementById('db-connections').textContent = metrics.database.activeConnections
  document.getElementById('db-query-load').textContent = `${metrics.database.queryLoad}%`
  document.getElementById('db-response-time').textContent = `${metrics.database.responseTime}ms`
  document.getElementById('db-bar').style.width = `${metrics.database.queryLoad}%`
  updateBarColor('db-bar', metrics.database.queryLoad, 70, 85)
  
  // API
  document.getElementById('api-requests').textContent = metrics.api.requestsPerMinute
  document.getElementById('api-response-time').textContent = `${metrics.api.responseTime}ms`
  document.getElementById('api-error-rate').textContent = `${metrics.api.errorRate}%`
  
  // Uptime
  const uptimeHours = Math.floor(metrics.uptime.seconds / 3600)
  const uptimeDays = Math.floor(uptimeHours / 24)
  const uptimeRemainingHours = uptimeHours % 24
  document.getElementById('uptime-duration').textContent = `${uptimeDays}d ${uptimeRemainingHours}h`
  document.getElementById('uptime-percentage').textContent = `${metrics.uptime.percentage}%`
  
  // Store for charts
  metricsHistory.cpu.push({ x: new Date(metrics.timestamp), y: metrics.cpu.usage })
  metricsHistory.memory.push({ x: new Date(metrics.timestamp), y: metrics.memory.usage })
  metricsHistory.dbLoad.push({ x: new Date(metrics.timestamp), y: metrics.database.queryLoad })
  metricsHistory.apiRequests.push({ x: new Date(metrics.timestamp), y: metrics.api.requestsPerMinute })
  
  // Keep only recent data
  if (metricsHistory.cpu.length > CONFIG.maxDataPoints) {
    metricsHistory.cpu.shift()
    metricsHistory.memory.shift()
    metricsHistory.dbLoad.shift()
    metricsHistory.apiRequests.shift()
  }
}

/**
 * Update bar color based on threshold
 */
function updateBarColor(elementId, value, warningThreshold, criticalThreshold) {
  const bar = document.getElementById(elementId)
  if (!bar) return
  
  bar.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-red-500')
  
  if (value >= criticalThreshold) {
    bar.classList.add('bg-red-500')
  } else if (value >= warningThreshold) {
    bar.classList.add('bg-yellow-500')
  } else {
    bar.classList.add('bg-green-500')
  }
}

/**
 * Initialize charts
 */
function initializeCharts() {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'minute' },
        display: false
      },
      y: {
        beginAtZero: true,
        max: 100,
        display: false
      }
    },
    elements: {
      line: { tension: 0.4 },
      point: { radius: 0 }
    }
  }
  
  // CPU Chart
  const cpuCtx = document.getElementById('cpu-chart')
  if (cpuCtx) {
    state.charts.cpu = new Chart(cpuCtx, {
      type: 'line',
      data: {
        datasets: [{
          data: metricsHistory.cpu,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true
        }]
      },
      options: commonOptions
    })
  }
  
  // Memory Chart
  const memoryCtx = document.getElementById('memory-chart')
  if (memoryCtx) {
    state.charts.memory = new Chart(memoryCtx, {
      type: 'line',
      data: {
        datasets: [{
          data: metricsHistory.memory,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true
        }]
      },
      options: commonOptions
    })
  }
  
  // DB Load Chart
  const dbCtx = document.getElementById('db-chart')
  if (dbCtx) {
    state.charts.dbLoad = new Chart(dbCtx, {
      type: 'line',
      data: {
        datasets: [{
          data: metricsHistory.dbLoad,
          borderColor: 'rgb(168, 85, 247)',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          fill: true
        }]
      },
      options: commonOptions
    })
  }
  
  // API Requests Chart
  const apiCtx = document.getElementById('api-chart')
  if (apiCtx) {
    state.charts.apiRequests = new Chart(apiCtx, {
      type: 'line',
      data: {
        datasets: [{
          data: metricsHistory.apiRequests,
          borderColor: 'rgb(245, 158, 11)',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          fill: true
        }]
      },
      options: {
        ...commonOptions,
        scales: {
          ...commonOptions.scales,
          y: {
            ...commonOptions.scales.y,
            max: undefined // Let API requests scale automatically
          }
        }
      }
    })
  }
}

/**
 * Update charts with new data
 */
function updateCharts(metrics) {
  if (state.charts.cpu) {
    state.charts.cpu.data.datasets[0].data = metricsHistory.cpu
    state.charts.cpu.update('none') // 'none' mode for performance
  }
  
  if (state.charts.memory) {
    state.charts.memory.data.datasets[0].data = metricsHistory.memory
    state.charts.memory.update('none')
  }
  
  if (state.charts.dbLoad) {
    state.charts.dbLoad.data.datasets[0].data = metricsHistory.dbLoad
    state.charts.dbLoad.update('none')
  }
  
  if (state.charts.apiRequests) {
    state.charts.apiRequests.data.datasets[0].data = metricsHistory.apiRequests
    state.charts.apiRequests.update('none')
  }
}

/**
 * Update alerts display
 */
function updateAlerts(alerts) {
  const warningCount = alerts.filter(a => a.level === 'warning').length
  const criticalCount = alerts.filter(a => a.level === 'critical').length
  
  document.getElementById('warning-count').textContent = warningCount
  document.getElementById('critical-count').textContent = criticalCount
  
  const alertContainer = document.getElementById('alerts-container')
  if (alertContainer) {
    if (alerts.length === 0) {
      alertContainer.innerHTML = '<div class="text-green-600 text-sm">✅ All systems operating normally</div>'
    } else {
      alertContainer.innerHTML = alerts.map(alert => `
        <div class="p-3 rounded-lg ${alert.level === 'critical' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}">
          <div class="flex items-center gap-2">
            <i class="fas fa-${alert.level === 'critical' ? 'exclamation-circle text-red-500' : 'exclamation-triangle text-yellow-500'}"></i>
            <span class="text-sm font-medium ${alert.level === 'critical' ? 'text-red-800' : 'text-yellow-800'}">${alert.message}</span>
          </div>
        </div>
      `).join('')
    }
  }
}

/**
 * Update services display
 */
function updateServices(services) {
  const container = document.getElementById('services-container')
  if (!container) return
  
  container.innerHTML = services.map(service => `
    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div class="flex items-center gap-3">
        <span class="text-2xl">${getServiceIcon(service.status)}</span>
        <div>
          <div class="font-medium text-gray-900">${service.name}</div>
          ${service.responseTime ? `<div class="text-xs text-gray-500">${service.responseTime}ms</div>` : ''}
        </div>
      </div>
      <span class="px-2 py-1 text-xs font-semibold rounded-full ${getServiceBadgeClass(service.status)}">
        ${service.status.toUpperCase()}
      </span>
    </div>
  `).join('')
}

/**
 * Get service icon
 */
function getServiceIcon(status) {
  switch (status) {
    case 'online': return '🟢'
    case 'offline': return '🔴'
    case 'degraded': return '🟡'
    default: return '⚪'
  }
}

/**
 * Get service badge class
 */
function getServiceBadgeClass(status) {
  switch (status) {
    case 'online': return 'bg-green-100 text-green-800'
    case 'offline': return 'bg-red-100 text-red-800'
    case 'degraded': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Update analytics display
 */
function updateAnalytics(analytics) {
  document.getElementById('requests-today').textContent = analytics.requestsToday.toLocaleString()
  document.getElementById('api-calls-today').textContent = analytics.apiCalls.toLocaleString()
  document.getElementById('blocked-requests').textContent = analytics.blockedRequests.toLocaleString()
  document.getElementById('failed-logins').textContent = analytics.failedLogins
  document.getElementById('top-ip').textContent = analytics.topIP
  document.getElementById('top-ip-count').textContent = analytics.topIPCount
}

/**
 * Update security overview
 */
function updateSecurity(security) {
  document.getElementById('active-firewall-rules').textContent = security.activeFirewallRules
  document.getElementById('blocked-ip-count').textContent = security.blockedIPCount
  document.getElementById('failed-logins-24h').textContent = security.failedLogins24h
  document.getElementById('twofa-percentage').textContent = `${security.twoFAEnabledPercentage}%`
  
  if (security.lastSecurityScan) {
    document.getElementById('last-scan-date').textContent = new Date(security.lastSecurityScan.date).toLocaleDateString()
    document.getElementById('last-scan-issues').textContent = security.lastSecurityScan.issuesFound
  }
}

/**
 * Update background services
 */
function updateBackgroundServices(services) {
  const container = document.getElementById('background-services-container')
  if (!container) return
  
  container.innerHTML = services.map(service => `
    <div class="flex items-center justify-between p-2">
      <span class="text-sm text-gray-700">${service.name}</span>
      <span class="text-lg">${service.status === 'online' ? '🟢' : '🔴'}</span>
    </div>
  `).join('')
}

/**
 * Update connection status
 */
function updateConnectionStatus(connected) {
  state.isConnected = connected
  const indicator = document.getElementById('connection-indicator')
  const status = document.getElementById('connection-status')
  
  if (indicator && status) {
    if (connected) {
      indicator.className = 'w-3 h-3 bg-green-500 rounded-full animate-pulse'
      status.textContent = 'Live'
    } else {
      indicator.className = 'w-3 h-3 bg-red-500 rounded-full'
      status.textContent = 'Offline'
    }
  }
}

/**
 * Update timestamp
 */
function updateTimestamp() {
  const element = document.getElementById('last-update-time')
  if (element && state.lastUpdate) {
    element.textContent = state.lastUpdate.toLocaleTimeString()
  }
}

/**
 * Start auto-refresh
 */
function startAutoRefresh() {
  if (state.refreshTimer) {
    clearInterval(state.refreshTimer)
  }
  
  state.refreshTimer = setInterval(() => {
    if (state.autoRefreshEnabled) {
      loadSystemData()
    }
  }, CONFIG.refreshInterval)
}

/**
 * Toggle auto-refresh
 */
function toggleAutoRefresh() {
  state.autoRefreshEnabled = !state.autoRefreshEnabled
  
  const button = document.getElementById('auto-refresh-btn')
  if (button) {
    button.textContent = state.autoRefreshEnabled ? 'Auto-Refresh: ON' : 'Auto-Refresh: OFF'
    button.classList.toggle('bg-blue-500', state.autoRefreshEnabled)
    button.classList.toggle('bg-gray-500', !state.autoRefreshEnabled)
  }
  
  if (state.autoRefreshEnabled) {
    startAutoRefresh()
    showNotification('Auto-refresh enabled', 'success')
  } else {
    if (state.refreshTimer) {
      clearInterval(state.refreshTimer)
    }
    showNotification('Auto-refresh disabled', 'info')
  }
}

/**
 * Load activity logs
 */
async function loadActivityLogs() {
  try {
    const params = new URLSearchParams({
      severity: state.currentFilter.severity === 'all' ? '' : state.currentFilter.severity,
      module: state.currentFilter.module === 'all' ? '' : state.currentFilter.module,
      search: state.currentFilter.search,
      limit: state.pagination.limit.toString(),
      offset: state.pagination.offset.toString()
    })
    
    const response = await axios.get(`/api/admin/system/activity-log?${params}`)
    const data = response.data
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to load logs')
    }
    
    renderActivityLogs(data.logs)
    state.pagination.total = data.total
    updatePagination()
    
  } catch (error) {
    console.error('Failed to load activity logs:', error)
    showNotification('Failed to load activity logs', 'error')
  }
}

/**
 * Render activity logs
 */
function renderActivityLogs(logs) {
  const container = document.getElementById('activity-logs-container')
  if (!container) return
  
  if (logs.length === 0) {
    container.innerHTML = '<div class="text-center text-gray-500 py-8">No logs found</div>'
    return
  }
  
  container.innerHTML = `
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="text-left py-2">Timestamp</th>
          <th class="text-left py-2">User</th>
          <th class="text-left py-2">Action</th>
          <th class="text-left py-2">Module</th>
          <th class="text-left py-2">IP Address</th>
          <th class="text-left py-2">Severity</th>
        </tr>
      </thead>
      <tbody>
        ${logs.map(log => `
          <tr class="border-b hover:bg-gray-50">
            <td class="py-2 text-sm">${new Date(log.created_at).toLocaleString()}</td>
            <td class="py-2 text-sm">${log.user_id}</td>
            <td class="py-2 text-sm">${log.action}</td>
            <td class="py-2 text-sm">${log.module}</td>
            <td class="py-2 text-sm font-mono">${log.ip_address}</td>
            <td class="py-2">
              <span class="px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadgeClass(log.severity)}">
                ${log.severity.toUpperCase()}
              </span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `
}

/**
 * Get severity badge class
 */
function getSeverityBadgeClass(severity) {
  switch (severity) {
    case 'info': return 'bg-blue-100 text-blue-800'
    case 'warning': return 'bg-yellow-100 text-yellow-800'
    case 'error': return 'bg-red-100 text-red-800'
    case 'security': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Update pagination
 */
function updatePagination() {
  const element = document.getElementById('pagination-info')
  if (element) {
    const start = state.pagination.offset + 1
    const end = Math.min(state.pagination.offset + state.pagination.limit, state.pagination.total)
    element.textContent = `Showing ${start}-${end} of ${state.pagination.total}`
  }
}

/**
 * Export logs
 */
async function exportLogs() {
  try {
    const params = new URLSearchParams({
      severity: state.currentFilter.severity === 'all' ? '' : state.currentFilter.severity,
      module: state.currentFilter.module === 'all' ? '' : state.currentFilter.module,
      search: state.currentFilter.search
    })
    
    window.location.href = `/api/admin/system/activity-log/export?${params}`
    showNotification('Exporting logs...', 'success')
    
  } catch (error) {
    console.error('Failed to export logs:', error)
    showNotification('Failed to export logs', 'error')
  }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${getNotificationClass(type)}`
  notification.innerHTML = `
    <div class="flex items-center gap-2">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `
  
  document.body.appendChild(notification)
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

/**
 * Get notification class
 */
function getNotificationClass(type) {
  switch (type) {
    case 'success': return 'bg-green-500 text-white'
    case 'error': return 'bg-red-500 text-white'
    case 'warning': return 'bg-yellow-500 text-white'
    default: return 'bg-blue-500 text-white'
  }
}

/**
 * Get notification icon
 */
function getNotificationIcon(type) {
  switch (type) {
    case 'success': return 'check-circle'
    case 'error': return 'times-circle'
    case 'warning': return 'exclamation-triangle'
    default: return 'info-circle'
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Auto-refresh toggle
  const autoRefreshBtn = document.getElementById('auto-refresh-btn')
  if (autoRefreshBtn) {
    autoRefreshBtn.addEventListener('click', toggleAutoRefresh)
  }
  
  // Manual refresh
  const refreshBtn = document.getElementById('refresh-btn')
  if (refreshBtn) {
    refreshBtn.addEventListener('click', loadSystemData)
  }
  
  // Export logs
  const exportBtn = document.getElementById('export-logs-btn')
  if (exportBtn) {
    exportBtn.addEventListener('click', exportLogs)
  }
  
  // Filter changes
  const severityFilter = document.getElementById('severity-filter')
  if (severityFilter) {
    severityFilter.addEventListener('change', (e) => {
      state.currentFilter.severity = e.target.value
      state.pagination.offset = 0
      loadActivityLogs()
    })
  }
  
  const moduleFilter = document.getElementById('module-filter')
  if (moduleFilter) {
    moduleFilter.addEventListener('change', (e) => {
      state.currentFilter.module = e.target.value
      state.pagination.offset = 0
      loadActivityLogs()
    })
  }
  
  const searchInput = document.getElementById('log-search')
  if (searchInput) {
    let searchTimeout
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(() => {
        state.currentFilter.search = e.target.value
        state.pagination.offset = 0
        loadActivityLogs()
      }, 500)
    })
  }
}

/**
 * Drill down into details
 */
function showDetailView(type) {
  showNotification(`Opening ${type} details...`, 'info')
  
  // TODO: Implement detail views
  switch (type) {
    case 'cpu':
      window.location.href = '/admin/system-status/cpu'
      break
    case 'memory':
      window.location.href = '/admin/system-status/memory'
      break
    case 'database':
      window.location.href = '/admin/system-status/database'
      break
    case 'api':
      window.location.href = '/admin/system-status/api'
      break
    case 'security':
      window.location.href = '/admin/security'
      break
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMonitor)
} else {
  initMonitor()
}
