// Admin AdminBusinessIntelligence Module
import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminBusinessIntelligence() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Business Intelligence - Admin</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .admin-content { margin-left: 280px; min-height: 100vh; padding: 2rem; background: #f5f7fa; }
        body.sidebar-collapsed .admin-content { margin-left: 60px; }
        .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1.5rem; }
        .stat-card { padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      </style>
    </head>
    <body>
      ${AdminSidebarAdvanced('/admin/business-intelligence')}
      
      <div class="admin-content">
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            <i class="fas fa-chart-pie mr-3"></i>
            Business Intelligence
          </h1>
          <p class="text-gray-600">BI dashboards and reports</p>
        </div>

        <div class="card">
          <div class="text-center py-12">
            <i class="fas fa-chart-pie text-6xl text-gray-300 mb-4"></i>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Business Intelligence</h2>
            <p class="text-gray-600 mb-6">BI dashboards and reports</p>
            <div class="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
              <i class="fas fa-rocket mr-2"></i>
              Enterprise Feature - Coming Soon
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div class="card text-center">
            <i class="fas fa-cog text-4xl text-gray-400 mb-3"></i>
            <h3 class="font-bold text-gray-800">Feature 1</h3>
            <p class="text-sm text-gray-600 mt-2">Advanced capabilities</p>
          </div>
          <div class="card text-center">
            <i class="fas fa-chart-line text-4xl text-gray-400 mb-3"></i>
            <h3 class="font-bold text-gray-800">Feature 2</h3>
            <p class="text-sm text-gray-600 mt-2">Real-time analytics</p>
          </div>
          <div class="card text-center">
            <i class="fas fa-shield-alt text-4xl text-gray-400 mb-3"></i>
            <h3 class="font-bold text-gray-800">Feature 3</h3>
            <p class="text-sm text-gray-600 mt-2">Enterprise security</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
