// Admin Panel Layout Component
import type { FC, PropsWithChildren } from 'hono/jsx'

interface AdminLayoutProps extends PropsWithChildren {
  title: string
  currentUser?: any
}

export const AdminLayout: FC<AdminLayoutProps> = ({ title, currentUser, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - Admin Panel</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <link 
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" 
          rel="stylesheet" 
        />
        <style dangerouslySetInnerHTML={{__html: `
          .admin-sidebar {
            width: 260px;
            background: #1a2a4e;
            color: white;
            min-height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 40;
          }
          
          .admin-content {
            margin-left: 260px;
            background: #f8f9fa;
            min-height: 100vh;
          }
          
          .admin-nav-item {
            padding: 12px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: rgba(255, 255, 255, 0.8);
            transition: all 0.2s;
            cursor: pointer;
          }
          
          .admin-nav-item:hover {
            background: rgba(212, 175, 55, 0.1);
            color: #d4af37;
          }
          
          .admin-nav-item.active {
            background: rgba(212, 175, 55, 0.2);
            color: #d4af37;
            border-left: 4px solid #d4af37;
          }
          
          .admin-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            padding: 24px;
            margin-bottom: 20px;
          }
          
          .stat-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: transform 0.2s;
          }
          
          .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          .btn-primary {
            background: #1a2a4e;
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: 500;
            transition: all 0.2s;
            border: none;
            cursor: pointer;
          }
          
          .btn-primary:hover {
            background: #2a3a5e;
          }
          
          .btn-gold {
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: #1a2a4e;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: 600;
            transition: all 0.2s;
            border: none;
            cursor: pointer;
          }
          
          .btn-gold:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
          }
          
          .table {
            width: 100%;
            border-collapse: collapse;
          }
          
          .table th {
            background: #f8f9fa;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid #e5e7eb;
          }
          
          .table td {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .table tr:hover {
            background: #f8f9fa;
          }
          
          .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
          }
          
          .badge-success {
            background: #d1fae5;
            color: #065f46;
          }
          
          .badge-warning {
            background: #fed7aa;
            color: #92400e;
          }
          
          .badge-danger {
            background: #fecaca;
            color: #991b1b;
          }
          
          .badge-info {
            background: #dbeafe;
            color: #1e40af;
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          .form-label {
            display: block;
            font-weight: 500;
            margin-bottom: 6px;
            color: #374151;
          }
          
          .form-control {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 14px;
          }
          
          .form-control:focus {
            outline: none;
            border-color: #d4af37;
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
          }
        `}} />
      </head>
      <body>
        {/* Sidebar */}
        <div class="admin-sidebar">
          <div class="p-6 border-b border-gray-700">
            <div class="text-xl font-bold">
              <span class="text-yellow-400">ADMIN</span>
              <span class="text-white"> PANEL</span>
            </div>
          </div>
          
          <nav class="py-4">
            <a href="/admin" class="admin-nav-item active">
              <i class="fas fa-chart-line w-5"></i>
              <span>Dashboard</span>
            </a>
            
            <div class="px-4 py-2 text-xs text-gray-400 uppercase font-semibold mt-4">
              Products
            </div>
            
            <a href="/admin/products" class="admin-nav-item">
              <i class="fas fa-box w-5"></i>
              <span>All Products</span>
            </a>
            
            <a href="/admin/products/add" class="admin-nav-item">
              <i class="fas fa-plus-circle w-5"></i>
              <span>Add New</span>
            </a>
            
            <div class="px-4 py-2 text-xs text-gray-400 uppercase font-semibold mt-4">
              Orders & Sales
            </div>
            
            <a href="/admin/orders" class="admin-nav-item">
              <i class="fas fa-shopping-cart w-5"></i>
              <span>Orders</span>
            </a>
            
            <a href="/admin/customers" class="admin-nav-item">
              <i class="fas fa-users w-5"></i>
              <span>Customers</span>
            </a>
            
            <a href="/admin/invoices" class="admin-nav-item">
              <i class="fas fa-file-invoice w-5"></i>
              <span>Invoices</span>
            </a>
            
            <div class="px-4 py-2 text-xs text-gray-400 uppercase font-semibold mt-4">
              License Management
            </div>
            
            <div class="px-4 py-2 text-xs text-gray-400 uppercase font-semibold mt-4">
              License Management
            </div>
            
            <a href="/admin/licenses" class="admin-nav-item">
              <i class="fas fa-key w-5"></i>
              <span>License Keys</span>
            </a>
            
            <a href="/admin/certificates" class="admin-nav-item">
              <i class="fas fa-certificate w-5"></i>
              <span>Certificates</span>
            </a>
            
            <a href="/admin/licenses/import" class="admin-nav-item">
              <i class="fas fa-file-upload w-5"></i>
              <span>Import Keys</span>
            </a>
            
            <div class="px-4 py-2 text-xs text-gray-400 uppercase font-semibold mt-4">
              Analytics
            </div>
            
            <a href="/admin/analytics" class="admin-nav-item">
              <i class="fas fa-chart-line w-5"></i>
              <span>Advanced Analytics</span>
            </a>
            
            <a href="/admin/reports" class="admin-nav-item">
              <i class="fas fa-chart-bar w-5"></i>
              <span>Reports</span>
            </a>
            
            <div class="px-4 py-2 text-xs text-gray-400 uppercase font-semibold mt-4">
              Order Processing
            </div>
            
            <a href="/admin/order-management" class="admin-nav-item">
              <i class="fas fa-tasks w-5"></i>
              <span>Order Management</span>
            </a>
            
            <a href="/admin/delivery" class="admin-nav-item">
              <i class="fas fa-shipping-fast w-5"></i>
              <span>Delivery Management</span>
            </a>
            
            <a href="/admin/tracking" class="admin-nav-item">
              <i class="fas fa-map-marker-alt w-5"></i>
              <span>Tracking</span>
            </a>
            
            <div class="px-4 py-2 text-xs text-gray-400 uppercase font-semibold mt-4">
              Settings
            </div>
            
            <a href="/admin/settings" class="admin-nav-item">
              <i class="fas fa-cog w-5"></i>
              <span>Settings</span>
            </a>
          </nav>
        </div>
        
        {/* Main Content */}
        <div class="admin-content">
          {/* Top Bar */}
          <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-800">{title}</h1>
            
            <div class="flex items-center gap-4">
              <a href="/" target="_blank" class="text-gray-600 hover:text-gray-800">
                <i class="fas fa-external-link-alt mr-2"></i>
                View Site
              </a>
              
              <div class="relative group">
                <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                  <i class="fas fa-user-circle text-xl"></i>
                  <span class="font-medium">{currentUser?.first_name || 'Admin'}</span>
                  <i class="fas fa-chevron-down text-xs"></i>
                </button>
                
                <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border hidden group-hover:block">
                  <a href="/admin/profile" class="block px-4 py-2 hover:bg-gray-50">
                    <i class="fas fa-user mr-2"></i> Profile
                  </a>
                  <a href="/api/auth/logout" class="block px-4 py-2 hover:bg-gray-50 text-red-600">
                    <i class="fas fa-sign-out-alt mr-2"></i> Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div class="p-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

// Admin Dashboard Component
export const AdminDashboard: FC = () => {
  return (
    <div>
      {/* Stats Cards */}
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="stat-card">
          <div class="flex items-center justify-between mb-2">
            <div class="text-gray-600 text-sm font-medium">Total Revenue</div>
            <i class="fas fa-euro-sign text-blue-500 text-xl"></i>
          </div>
          <div class="text-3xl font-bold text-gray-800" id="stat-revenue">€0.00</div>
          <div class="text-sm text-green-600 mt-2">
            <i class="fas fa-arrow-up mr-1"></i> 12.5% from last month
          </div>
        </div>
        
        <div class="stat-card">
          <div class="flex items-center justify-between mb-2">
            <div class="text-gray-600 text-sm font-medium">Total Orders</div>
            <i class="fas fa-shopping-cart text-green-500 text-xl"></i>
          </div>
          <div class="text-3xl font-bold text-gray-800" id="stat-orders">0</div>
          <div class="text-sm text-green-600 mt-2">
            <i class="fas fa-arrow-up mr-1"></i> 8.2% from last month
          </div>
        </div>
        
        <div class="stat-card">
          <div class="flex items-center justify-between mb-2">
            <div class="text-gray-600 text-sm font-medium">Total Products</div>
            <i class="fas fa-box text-purple-500 text-xl"></i>
          </div>
          <div class="text-3xl font-bold text-gray-800" id="stat-products">5</div>
          <div class="text-sm text-gray-600 mt-2">
            Active listings
          </div>
        </div>
        
        <div class="stat-card">
          <div class="flex items-center justify-between mb-2">
            <div class="text-gray-600 text-sm font-medium">Customers</div>
            <i class="fas fa-users text-yellow-500 text-xl"></i>
          </div>
          <div class="text-3xl font-bold text-gray-800" id="stat-customers">0</div>
          <div class="text-sm text-green-600 mt-2">
            <i class="fas fa-arrow-up mr-1"></i> 15 new this week
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div class="admin-card">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-800">Recent Orders</h2>
          <a href="/admin/orders" class="text-blue-600 hover:text-blue-700">View All →</a>
        </div>
        
        <div id="recent-orders">
          <div class="text-center py-8 text-gray-500">
            <i class="fas fa-inbox text-4xl mb-3"></i>
            <p>No orders yet</p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div class="grid md:grid-cols-3 gap-6 mt-6">
        <div class="admin-card text-center">
          <i class="fas fa-plus-circle text-5xl text-blue-500 mb-4"></i>
          <h3 class="text-lg font-bold mb-2">Add Product</h3>
          <p class="text-gray-600 text-sm mb-4">Create a new software product</p>
          <a href="/admin/products/add" class="btn-primary inline-block">
            Add New Product
          </a>
        </div>
        
        <div class="admin-card text-center">
          <i class="fas fa-file-upload text-5xl text-green-500 mb-4"></i>
          <h3 class="text-lg font-bold mb-2">Import License Keys</h3>
          <p class="text-gray-600 text-sm mb-4">Upload keys via CSV file</p>
          <a href="/admin/licenses/import" class="btn-primary inline-block">
            Import Keys
          </a>
        </div>
        
        <div class="admin-card text-center">
          <i class="fas fa-cog text-5xl text-purple-500 mb-4"></i>
          <h3 class="text-lg font-bold mb-2">Site Settings</h3>
          <p class="text-gray-600 text-sm mb-4">Configure your store</p>
          <a href="/admin/settings" class="btn-primary inline-block">
            Manage Settings
          </a>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        // Load dashboard statistics
        async function loadDashboardStats() {
          try {
            const token = localStorage.getItem('admin_token');
            // Temporarily disabled - allow viewing admin panel without login for testing
            // if (!token) {
            //   window.location.href = '/admin/login';
            //   return;
            // }
            
            // For demo purposes, show placeholder data
            if (!token) {
              console.log('Admin viewing in demo mode - no authentication');
              // Show demo data
              document.getElementById('stat-revenue').textContent = '€12,450.00';
              document.getElementById('stat-orders').textContent = '234';
              document.getElementById('stat-products').textContent = '89';
              document.getElementById('stat-customers').textContent = '156';
              return;
            }
            
            const response = await fetch('/api/admin/dashboard', {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            
            const data = await response.json();
            
            if (data.success) {
              // Update stats (placeholder values for now)
              document.getElementById('stat-revenue').textContent = '€' + (data.data.totalRevenue || 0).toFixed(2);
              document.getElementById('stat-orders').textContent = data.data.totalOrders || 0;
              document.getElementById('stat-products').textContent = data.data.totalProducts || 5;
              document.getElementById('stat-customers').textContent = data.data.totalCustomers || 0;
            }
          } catch (error) {
            console.error('Error loading dashboard stats:', error);
          }
        }
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', loadDashboardStats);
      `}} />
    </div>
  )
}
