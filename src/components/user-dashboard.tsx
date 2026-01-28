import type { FC } from 'hono/jsx'

interface DashboardProps {
  user?: any
  activeTab?: string
  children?: any
}

export const UserDashboard: FC<DashboardProps> = ({ user, activeTab = 'overview', children }) => {
  return (
    <div>
      {/* Header */}
      <header class="bg-primary text-white">
        <div class="bg-darkblue py-2">
          <div class="container mx-auto px-4 flex justify-between text-sm">
            <div>
              <i class="fas fa-phone mr-2"></i>
              <span>+49 123 456 789</span>
              <span class="mx-4">|</span>
              <i class="fas fa-envelope mr-2"></i>
              <span>support@softwarestore.com</span>
            </div>
            <div>
              <i class="fas fa-shield-alt mr-2"></i>
              <span>Secure Shopping • SSL Encrypted</span>
            </div>
          </div>
        </div>

        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <a href="/" class="flex items-center">
              <div class="text-2xl font-bold">
                <span class="text-gold">PREMIUM</span>
                <span class="text-white"> SOFTWARE</span>
              </div>
            </a>
            <div class="flex items-center space-x-6">
              <a href="/" class="hover:text-gold transition">
                <i class="fas fa-home mr-2"></i>Home
              </a>
              <a href="/cart" class="hover:text-gold transition">
                <i class="fas fa-shopping-cart mr-2"></i>Cart
              </a>
              <a href="/account/logout" class="hover:text-gold transition">
                <i class="fas fa-sign-out-alt mr-2"></i>Logout
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div class="bg-gray-50 min-h-screen py-8">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-primary mb-2">
            <i class="fas fa-user-circle mr-3 text-gold"></i>
            My Account
          </h1>
          <div class="h-1 w-24 bg-gold mb-8"></div>

          <div class="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div class="lg:col-span-1">
              <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="bg-gradient-to-r from-primary to-blue-900 text-white px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-primary font-bold text-2xl mr-4">
                      {user?.first_name?.[0] || 'U'}
                    </div>
                    <div>
                      <div class="font-bold">{user?.first_name || 'User'} {user?.last_name || ''}</div>
                      <div class="text-sm opacity-75">{user?.email || 'user@example.com'}</div>
                    </div>
                  </div>
                </div>

                <nav class="p-2">
                  <a 
                    href="/account" 
                    class={`flex items-center px-4 py-3 rounded-lg mb-1 transition ${activeTab === 'overview' ? 'bg-gold text-primary font-bold' : 'hover:bg-gray-100'}`}
                  >
                    <i class="fas fa-tachometer-alt w-6"></i>
                    <span>Overview</span>
                  </a>
                  <a 
                    href="/account/orders" 
                    class={`flex items-center px-4 py-3 rounded-lg mb-1 transition ${activeTab === 'orders' ? 'bg-gold text-primary font-bold' : 'hover:bg-gray-100'}`}
                  >
                    <i class="fas fa-shopping-bag w-6"></i>
                    <span>My Orders</span>
                  </a>
                  <a 
                    href="/account/licenses" 
                    class={`flex items-center px-4 py-3 rounded-lg mb-1 transition ${activeTab === 'licenses' ? 'bg-gold text-primary font-bold' : 'hover:bg-gray-100'}`}
                  >
                    <i class="fas fa-key w-6"></i>
                    <span>License Keys</span>
                  </a>
                  <a 
                    href="/account/profile" 
                    class={`flex items-center px-4 py-3 rounded-lg mb-1 transition ${activeTab === 'profile' ? 'bg-gold text-primary font-bold' : 'hover:bg-gray-100'}`}
                  >
                    <i class="fas fa-user w-6"></i>
                    <span>Profile</span>
                  </a>
                  <a 
                    href="/account/settings" 
                    class={`flex items-center px-4 py-3 rounded-lg mb-1 transition ${activeTab === 'settings' ? 'bg-gold text-primary font-bold' : 'hover:bg-gray-100'}`}
                  >
                    <i class="fas fa-cog w-6"></i>
                    <span>Settings</span>
                  </a>
                  <hr class="my-2" />
                  <a 
                    href="/support" 
                    class="flex items-center px-4 py-3 rounded-lg mb-1 hover:bg-gray-100 transition"
                  >
                    <i class="fas fa-headset w-6"></i>
                    <span>Support</span>
                  </a>
                  <a 
                    href="/account/logout" 
                    class="flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                  >
                    <i class="fas fa-sign-out-alt w-6"></i>
                    <span>Logout</span>
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div class="lg:col-span-3" id="dashboard-content">
              {children || (activeTab === 'overview' && (
                <div>
                  {/* Statistics Cards */}
                  <div class="grid md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                      <div class="flex items-center justify-between mb-4">
                        <div class="text-3xl font-bold text-primary" id="total-orders">0</div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <i class="fas fa-shopping-bag text-2xl text-blue-600"></i>
                        </div>
                      </div>
                      <div class="text-sm text-gray-600">Total Orders</div>
                    </div>

                    <div class="bg-white rounded-lg shadow-lg p-6">
                      <div class="flex items-center justify-between mb-4">
                        <div class="text-3xl font-bold text-primary" id="active-licenses">0</div>
                        <div class="w-12 h-12 bg-gold bg-opacity-20 rounded-full flex items-center justify-center">
                          <i class="fas fa-key text-2xl text-gold"></i>
                        </div>
                      </div>
                      <div class="text-sm text-gray-600">Active Licenses</div>
                    </div>

                    <div class="bg-white rounded-lg shadow-lg p-6">
                      <div class="flex items-center justify-between mb-4">
                        <div class="text-3xl font-bold text-primary" id="total-spent">€0.00</div>
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <i class="fas fa-euro-sign text-2xl text-green-600"></i>
                        </div>
                      </div>
                      <div class="text-sm text-gray-600">Total Spent</div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div class="flex items-center justify-between mb-6">
                      <h2 class="text-2xl font-bold text-primary">Recent Orders</h2>
                      <a href="/account/orders" class="text-gold hover:underline">View All →</a>
                    </div>
                    <div id="recent-orders">
                      <div class="text-center py-12 text-gray-500">
                        <i class="fas fa-shopping-bag text-4xl mb-4 opacity-50"></i>
                        <p>No orders yet</p>
                        <a href="/" class="btn-gold inline-block mt-4 px-6 py-2 rounded-lg">
                          Start Shopping
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-2xl font-bold text-primary mb-6">Quick Actions</h2>
                    <div class="grid md:grid-cols-2 gap-4">
                      <a href="/" class="flex items-center p-4 border-2 rounded-lg hover:border-gold transition">
                        <i class="fas fa-shopping-cart text-3xl text-gold mr-4"></i>
                        <div>
                          <div class="font-bold">Browse Products</div>
                          <div class="text-sm text-gray-600">Explore our software catalog</div>
                        </div>
                      </a>
                      <a href="/account/licenses" class="flex items-center p-4 border-2 rounded-lg hover:border-gold transition">
                        <i class="fas fa-key text-3xl text-gold mr-4"></i>
                        <div>
                          <div class="font-bold">Download Licenses</div>
                          <div class="text-sm text-gray-600">Access your license keys</div>
                        </div>
                      </a>
                      <a href="/support" class="flex items-center p-4 border-2 rounded-lg hover:border-gold transition">
                        <i class="fas fa-headset text-3xl text-gold mr-4"></i>
                        <div>
                          <div class="font-bold">Contact Support</div>
                          <div class="text-sm text-gray-600">Get help from our team</div>
                        </div>
                      </a>
                      <a href="/account/profile" class="flex items-center p-4 border-2 rounded-lg hover:border-gold transition">
                        <i class="fas fa-user-edit text-3xl text-gold mr-4"></i>
                        <div>
                          <div class="font-bold">Update Profile</div>
                          <div class="text-sm text-gray-600">Manage your account info</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer class="bg-primary text-white py-6">
        <div class="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>© 2024 Premium Software Store. All rights reserved.</p>
        </div>
      </footer>

      <script>{`
        // Load user dashboard data
        async function loadDashboardData() {
          try {
            // Check authentication
            const token = localStorage.getItem('auth_token');
            if (!token) {
              window.location.href = '/login?redirect=/account';
              return;
            }

            // Load user stats
            const statsResponse = await fetch('/api/account/stats', {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            
            if (statsResponse.ok) {
              const stats = await statsResponse.json();
              if (stats.success) {
                document.getElementById('total-orders').textContent = stats.data.orders || 0;
                document.getElementById('active-licenses').textContent = stats.data.licenses || 0;
                document.getElementById('total-spent').textContent = '€' + (stats.data.totalSpent || 0).toFixed(2);
              }
            }

            // Load recent orders
            const ordersResponse = await fetch('/api/account/orders?limit=3', {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            
            if (ordersResponse.ok) {
              const orders = await ordersResponse.json();
              if (orders.success && orders.data.length > 0) {
                displayRecentOrders(orders.data);
              }
            }
          } catch (error) {
            console.error('Error loading dashboard:', error);
          }
        }

        function displayRecentOrders(orders) {
          const container = document.getElementById('recent-orders');
          container.innerHTML = orders.map(order => \`
            <div class="border-b py-4 last:border-b-0">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="font-bold text-primary">\${order.order_number}</div>
                  <div class="text-sm text-gray-600">\${new Date(order.created_at).toLocaleDateString()}</div>
                </div>
                <div class="text-right mr-4">
                  <div class="font-bold text-gold">€\${order.total.toFixed(2)}</div>
                  <div class="text-sm">
                    <span class="px-2 py-1 rounded text-xs \${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }">\${order.status}</span>
                  </div>
                </div>
                <a href="/account/orders/\${order.order_number}" class="btn-gold px-4 py-2 rounded-lg text-sm">
                  View Details
                </a>
              </div>
            </div>
          \`).join('');
        }

        // Initialize on page load
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', loadDashboardData);
        } else {
          loadDashboardData();
        }
      `}</script>
    </div>
  )
}
