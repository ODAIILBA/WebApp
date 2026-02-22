// Admin Workflow Automation - Visual workflow builder
import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminWorkflowAutomation() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Workflow Automation - Admin</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .admin-content { margin-left: 280px; min-height: 100vh; padding: 2rem; background: #f5f7fa; }
        body.sidebar-collapsed .admin-content { margin-left: 60px; }
        .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1.5rem; }
        .workflow-node { background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 1.5rem; width: 200px; position: relative; }
        .workflow-node.trigger { border-color: #10b981; }
        .workflow-node.action { border-color: #3b82f6; }
        .workflow-node.condition { border-color: #f59e0b; }
      </style>
    </head>
    <body>
      ${AdminSidebarAdvanced('/admin/workflow-automation')}
      
      <div class="admin-content">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
              <i class="fas fa-project-diagram mr-3 text-blue-600"></i>
              Workflow Automation
            </h1>
            <p class="text-gray-600">Create automated workflows with visual flow builder</p>
          </div>
          <button class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            <i class="fas fa-plus mr-2"></i>
            New Workflow
          </button>
        </div>

        <!-- Workflow Templates -->
        <div class="card">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            <i class="fas fa-th-large mr-2"></i>
            Workflow Templates
          </h2>
          
          <div class="grid grid-cols-3 gap-4">
            <div class="border rounded-lg p-4 hover:border-blue-600 cursor-pointer">
              <div class="flex items-center mb-3">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-envelope text-green-600 text-xl"></i>
                </div>
                <div class="ml-3">
                  <h3 class="font-bold text-gray-800">Welcome Email</h3>
                  <p class="text-xs text-gray-500">Auto-send on signup</p>
                </div>
              </div>
              <p class="text-sm text-gray-600">Send welcome email to new customers automatically</p>
            </div>

            <div class="border rounded-lg p-4 hover:border-blue-600 cursor-pointer">
              <div class="flex items-center mb-3">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-shopping-cart text-blue-600 text-xl"></i>
                </div>
                <div class="ml-3">
                  <h3 class="font-bold text-gray-800">Order Processing</h3>
                  <p class="text-xs text-gray-500">Payment → Fulfillment</p>
                </div>
              </div>
              <p class="text-sm text-gray-600">Automatically process orders after payment</p>
            </div>

            <div class="border rounded-lg p-4 hover:border-blue-600 cursor-pointer">
              <div class="flex items-center mb-3">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-key text-yellow-600 text-xl"></i>
                </div>
                <div class="ml-3">
                  <h3 class="font-bold text-gray-800">License Delivery</h3>
                  <p class="text-xs text-gray-500">Order → License email</p>
                </div>
              </div>
              <p class="text-sm text-gray-600">Deliver license keys after successful payment</p>
            </div>
          </div>
        </div>

        <!-- Active Workflows -->
        <div class="card">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            <i class="fas fa-list mr-2"></i>
            Active Workflows
          </h2>
          
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Workflow Name</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trigger</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Executions</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-3">
                    <div class="font-semibold text-gray-800">Welcome Email Flow</div>
                    <div class="text-xs text-gray-500">Created 2 days ago</div>
                  </td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">New User</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600">Send Email → Add to List</td>
                  <td class="px-4 py-3 text-sm text-gray-600">1,234</td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Active</span>
                  </td>
                  <td class="px-4 py-3">
                    <button class="text-blue-600 hover:text-blue-800 mr-3"><i class="fas fa-edit"></i></button>
                    <button class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3">
                    <div class="font-semibold text-gray-800">Order Notification</div>
                    <div class="text-xs text-gray-500">Created 1 week ago</div>
                  </td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">Order Placed</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600">Notify Admin → Update Stock</td>
                  <td class="px-4 py-3 text-sm text-gray-600">567</td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Active</span>
                  </td>
                  <td class="px-4 py-3">
                    <button class="text-blue-600 hover:text-blue-800 mr-3"><i class="fas fa-edit"></i></button>
                    <button class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Workflow Stats -->
        <div class="grid grid-cols-4 gap-4">
          <div class="card">
            <div class="text-gray-600 text-sm mb-1">Total Workflows</div>
            <div class="text-3xl font-bold text-gray-800">12</div>
            <div class="text-green-600 text-xs mt-1"><i class="fas fa-arrow-up mr-1"></i> 3 this month</div>
          </div>
          
          <div class="card">
            <div class="text-gray-600 text-sm mb-1">Active</div>
            <div class="text-3xl font-bold text-green-600">8</div>
            <div class="text-gray-500 text-xs mt-1">67% active rate</div>
          </div>
          
          <div class="card">
            <div class="text-gray-600 text-sm mb-1">Executions Today</div>
            <div class="text-3xl font-bold text-blue-600">2,567</div>
            <div class="text-green-600 text-xs mt-1"><i class="fas fa-arrow-up mr-1"></i> 15% vs yesterday</div>
          </div>
          
          <div class="card">
            <div class="text-gray-600 text-sm mb-1">Success Rate</div>
            <div class="text-3xl font-bold text-purple-600">98.5%</div>
            <div class="text-green-600 text-xs mt-1">Excellent performance</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
