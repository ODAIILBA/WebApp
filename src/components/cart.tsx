import type { FC } from 'hono/jsx'

export const ShoppingCart: FC = () => {
  return (
    <div>
      <div class="container mx-auto px-4 py-12">
        <h1 class="text-4xl font-bold text-primary mb-2">
          <i class="fas fa-shopping-cart mr-3 text-gold"></i>
          Shopping Cart
        </h1>
        <div class="h-1 w-24 bg-gold mb-8"></div>

        <div class="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div class="lg:col-span-2">
            <div id="cart-items-container" class="space-y-4">
              <div class="text-center py-12 bg-white rounded-lg shadow">
                <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <p class="text-xl text-gray-600">Your cart is empty</p>
                <a href="/" class="btn-gold inline-block mt-4 px-8 py-3 rounded-lg">
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 class="text-2xl font-bold text-primary mb-6">Order Summary</h2>
              
              <div class="space-y-3 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-semibold" id="cart-subtotal">€0.00</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">VAT (19%)</span>
                  <span class="font-semibold" id="cart-tax">€0.00</span>
                </div>
                <div class="border-t pt-3 flex justify-between text-xl font-bold">
                  <span class="text-primary">Total</span>
                  <span class="text-gold" id="cart-total">€0.00</span>
                </div>
              </div>

              <button 
                id="checkout-btn"
                class="btn-gold w-full py-4 rounded-lg text-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                <i class="fas fa-lock mr-2"></i>
                Proceed to Checkout
              </button>

              <div class="mt-6 pt-6 border-t">
                <h3 class="font-bold mb-3 text-primary">
                  <i class="fas fa-shield-alt mr-2 text-gold"></i>
                  Secure Checkout
                </h3>
                <ul class="text-sm text-gray-600 space-y-2">
                  <li><i class="fas fa-check text-green-500 mr-2"></i>256-bit SSL Encryption</li>
                  <li><i class="fas fa-check text-green-500 mr-2"></i>Instant Digital Delivery</li>
                  <li><i class="fas fa-check text-green-500 mr-2"></i>Money-Back Guarantee</li>
                  <li><i class="fas fa-check text-green-500 mr-2"></i>24/7 Customer Support</li>
                </ul>
              </div>

              <div class="mt-6">
                <img 
                  src="https://via.placeholder.com/300x50/f3f4f6/1a2a4e?text=Payment+Methods" 
                  alt="Payment Methods"
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <section class="mt-12 bg-white rounded-lg shadow p-8">
          <h2 class="text-2xl font-bold text-center mb-6 text-primary">Why Buy From Us?</h2>
          <div class="grid md:grid-cols-4 gap-6">
            <div class="text-center">
              <i class="fas fa-bolt text-4xl text-gold mb-3"></i>
              <h3 class="font-bold mb-2">Instant Delivery</h3>
              <p class="text-sm text-gray-600">Get your license key within minutes via email</p>
            </div>
            <div class="text-center">
              <i class="fas fa-certificate text-4xl text-gold mb-3"></i>
              <h3 class="font-bold mb-2">100% Genuine</h3>
              <p class="text-sm text-gray-600">All licenses are authentic and verified</p>
            </div>
            <div class="text-center">
              <i class="fas fa-headset text-4xl text-gold mb-3"></i>
              <h3 class="font-bold mb-2">24/7 Support</h3>
              <p class="text-sm text-gray-600">Expert help whenever you need it</p>
            </div>
            <div class="text-center">
              <i class="fas fa-undo text-4xl text-gold mb-3"></i>
              <h3 class="font-bold mb-2">Money Back</h3>
              <p class="text-sm text-gray-600">30-day money-back guarantee</p>
            </div>
          </div>
        </section>
      </div>

      <script>{`
        // Shopping Cart Management
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        function updateCartDisplay() {
          const container = document.getElementById('cart-items-container');
          const checkoutBtn = document.getElementById('checkout-btn');
          
          if (cart.length === 0) {
            container.innerHTML = \`
              <div class="text-center py-12 bg-white rounded-lg shadow">
                <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <p class="text-xl text-gray-600">Your cart is empty</p>
                <a href="/" class="btn-gold inline-block mt-4 px-8 py-3 rounded-lg">
                  Continue Shopping
                </a>
              </div>
            \`;
            checkoutBtn.disabled = true;
            updateTotals();
            return;
          }

          checkoutBtn.disabled = false;
          container.innerHTML = cart.map((item, index) => \`
            <div class="bg-white rounded-lg shadow-lg p-6 flex items-center gap-6">
              <img 
                src="\${item.image_url || 'https://via.placeholder.com/120x80/1a2a4e/d4af37?text=Product'}" 
                alt="\${item.name}"
                class="w-32 h-20 object-cover rounded"
              />
              <div class="flex-1">
                <h3 class="text-xl font-bold text-primary mb-1">\${item.name}</h3>
                <p class="text-sm text-gray-600 mb-2">\${item.category_name || 'Software License'}</p>
                <div class="flex items-center gap-4">
                  \${item.discount_price ? \`
                    <span class="text-2xl font-bold text-gold">€\${item.discount_price.toFixed(2)}</span>
                    <span class="text-lg text-gray-400 line-through">€\${item.base_price.toFixed(2)}</span>
                    <span class="discount-badge px-2 py-1 rounded text-xs">
                      -\${item.discount_percentage}%
                    </span>
                  \` : \`
                    <span class="text-2xl font-bold text-primary">€\${item.base_price.toFixed(2)}</span>
                  \`}
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2">
                  <button 
                    onclick="updateQuantity(\${index}, -1)"
                    class="w-8 h-8 bg-white rounded hover:bg-gold transition text-primary font-bold"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="font-bold text-lg w-8 text-center">\${item.quantity}</span>
                  <button 
                    onclick="updateQuantity(\${index}, 1)"
                    class="w-8 h-8 bg-white rounded hover:bg-gold transition text-primary font-bold"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <button 
                  onclick="removeFromCart(\${index})"
                  class="w-10 h-10 bg-red-100 hover:bg-red-500 hover:text-white rounded transition"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          \`).join('');

          updateTotals();
        }

        function updateQuantity(index, change) {
          cart[index].quantity = Math.max(1, cart[index].quantity + change);
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartDisplay();
        }

        function removeFromCart(index) {
          cart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartDisplay();
          updateCartCount();
        }

        function updateTotals() {
          let subtotal = 0;
          cart.forEach(item => {
            const price = item.discount_price || item.base_price;
            subtotal += price * item.quantity;
          });
          
          const tax = subtotal * 0.19;
          const total = subtotal + tax;

          document.getElementById('cart-subtotal').textContent = '€' + subtotal.toFixed(2);
          document.getElementById('cart-tax').textContent = '€' + tax.toFixed(2);
          document.getElementById('cart-total').textContent = '€' + total.toFixed(2);
        }

        function updateCartCount() {
          const count = cart.reduce((sum, item) => sum + item.quantity, 0);
          const badge = document.querySelector('.fa-shopping-cart + span');
          if (badge) {
            badge.textContent = count;
          }
        }

        // Checkout button
        document.getElementById('checkout-btn')?.addEventListener('click', () => {
          window.location.href = '/checkout';
        });

        // Initialize display
        updateCartDisplay();
      `}</script>
    </div>
  )
}
