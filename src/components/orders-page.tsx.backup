import type { FC } from 'hono/jsx'

export const OrdersPage: FC = () => {
  return (
    <div>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-primary mb-6">
          <i class="fas fa-shopping-bag mr-2 text-gold"></i>
          Order History
        </h2>

        <div id="orders-list">
          <div class="text-center py-12">
            <i class="fas fa-spinner fa-spin text-4xl text-gold mb-4"></i>
            <p class="text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>

      <script>{`
        async function loadOrders() {
          const token = localStorage.getItem('auth_token');
          if (!token) {
            window.location.href = '/login?redirect=/account/orders';
            return;
          }

          try {
            const response = await fetch('/api/account/orders', {
              headers: { 'Authorization': 'Bearer ' + token }
            });

            const result = await response.json();
            
            if (result.success && result.data.length > 0) {
              displayOrders(result.data);
            } else {
              document.getElementById('orders-list').innerHTML = \`
                <div class="text-center py-12 text-gray-500">
                  <i class="fas fa-shopping-bag text-6xl mb-4 opacity-50"></i>
                  <p class="text-xl mb-2">No orders yet</p>
                  <p class="mb-4">Start shopping to see your order history here</p>
                  <a href="/" class="btn-gold inline-block px-6 py-3 rounded-lg">
                    Browse Products
                  </a>
                </div>
              \`;
            }
          } catch (error) {
            console.error('Error loading orders:', error);
            document.getElementById('orders-list').innerHTML = \`
              <div class="text-center py-12 text-red-500">
                <i class="fas fa-exclamation-circle text-4xl mb-4"></i>
                <p>Error loading orders. Please try again.</p>
              </div>
            \`;
          }
        }

        function displayOrders(orders) {
          const container = document.getElementById('orders-list');
          container.innerHTML = \`
            <div class="space-y-4">
              \${orders.map(order => \`
                <div class="border-2 rounded-lg p-6 hover:border-gold transition">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <h3 class="text-xl font-bold text-primary">Order #\${order.order_number}</h3>
                      <p class="text-sm text-gray-600">
                        <i class="far fa-calendar mr-1"></i>
                        \${new Date(order.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-gold">€\${order.total.toFixed(2)}</div>
                      <span class="px-3 py-1 rounded-full text-sm \${
                        order.payment_status === 'completed' ? 'bg-green-100 text-green-700' :
                        order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }">
                        \${order.payment_status}
                      </span>
                    </div>
                  </div>

                  <div class="bg-gray-50 rounded-lg p-4 mb-4">
                    <div class="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div class="text-gray-600">Payment Method</div>
                        <div class="font-semibold">
                          \${order.payment_method === 'credit_card' ? '<i class="fas fa-credit-card mr-1"></i> Credit Card' :
                            order.payment_method === 'paypal' ? '<i class="fab fa-paypal mr-1"></i> PayPal' :
                            '<i class="fas fa-university mr-1"></i> Bank Transfer'}
                        </div>
                      </div>
                      <div>
                        <div class="text-gray-600">Order Status</div>
                        <div class="font-semibold">\${order.status}</div>
                      </div>
                      <div>
                        <div class="text-gray-600">Items</div>
                        <div class="font-semibold">\${order.item_count || 1} Product(s)</div>
                      </div>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <button 
                      onclick="viewOrderDetails('\${order.order_number}')"
                      class="btn-gold px-6 py-2 rounded-lg"
                    >
                      <i class="fas fa-eye mr-2"></i>View Details
                    </button>
                    \${order.payment_status === 'completed' ? \`
                      <a 
                        href="/account/orders/\${order.order_number}/invoice" 
                        class="border-2 border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition"
                      >
                        <i class="fas fa-file-invoice mr-2"></i>Download Invoice
                      </a>
                    \` : ''}
                  </div>
                </div>
              \`).join('')}
            </div>
          \`;
        }

        function viewOrderDetails(orderNumber) {
          window.location.href = '/account/orders/' + orderNumber;
        }

        // Initialize
        loadOrders();
      `}</script>
    </div>
  )
}
