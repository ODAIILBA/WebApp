export const CartPage = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Warenkorb - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
        <style>
          :root {
            --navy-dark: #1a2a4e;
            --navy-medium: #2d3e6f;
            --gold: #d4af37;
          }
          .cart-item-enter {
            animation: slideIn 0.3s ease-out;
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
      </head>
      <body class="bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow-sm sticky top-0 z-50">
          <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
              <a href="/" class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <i class="fas fa-shopping-bag text-white text-xl"></i>
                </div>
                <span class="text-2xl font-bold" style="color: var(--navy-dark);">SOFTWAREKING24</span>
              </a>
              <div class="flex items-center space-x-4">
                <a href="/produkte" class="text-gray-600 hover:text-blue-600 flex items-center">
                  <i class="fas fa-arrow-left mr-2"></i>Weiter einkaufen
                </a>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold mb-8" style="color: var(--navy-dark);">
            <i class="fas fa-shopping-cart mr-3"></i>Ihr Warenkorb
          </h1>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Cart Items -->
            <div class="lg:col-span-2">
              <div id="cart-items" class="space-y-4">
                <!-- Loading -->
                <div class="bg-white rounded-lg shadow-sm p-8 text-center">
                  <i class="fas fa-spinner fa-spin text-3xl text-blue-600 mb-4"></i>
                  <p class="text-gray-600">Lade Warenkorb...</p>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 class="text-xl font-bold mb-4" style="color: var(--navy-dark);">Bestellübersicht</h2>
                
                <!-- Coupon Input -->
                <div class="mb-6 pb-6 border-b border-gray-200">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Gutscheincode
                  </label>
                  <div class="flex space-x-2">
                    <input 
                      type="text" 
                      id="coupon-input"
                      placeholder="z.B. SAVE10"
                      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onclick="applyCoupon()"
                      class="px-4 py-2 text-white rounded-lg transition font-semibold"
                      style="background-color: var(--gold);"
                    >
                      OK
                    </button>
                  </div>
                  <div id="coupon-message" class="mt-2 text-sm"></div>
                  <div class="mt-3 flex flex-wrap gap-2">
                    <button onclick="quickCoupon('SAVE10')" class="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition">
                      SAVE10 (-10%)
                    </button>
                    <button onclick="quickCoupon('SAVE20')" class="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition">
                      SAVE20 (-20%)
                    </button>
                    <button onclick="quickCoupon('WELCOME')" class="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition">
                      WELCOME (-15%)
                    </button>
                  </div>
                </div>

                <div id="order-summary" class="space-y-3 mb-6">
                  <!-- Summary will be populated by JS -->
                </div>

                <button 
                  onclick="proceedToCheckout()"
                  id="checkout-button"
                  class="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled
                >
                  <i class="fas fa-lock mr-2"></i>
                  <span>Zur Kasse gehen</span>
                </button>

                <!-- Trust Badges -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <div class="space-y-3 text-sm text-gray-600">
                    <div class="flex items-center">
                      <i class="fas fa-shield-alt text-green-600 mr-3 text-lg"></i>
                      <span>Sichere SSL-Verschlüsselung</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-download text-blue-600 mr-3 text-lg"></i>
                      <span>Sofortiger Download</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-undo text-orange-600 mr-3 text-lg"></i>
                      <span>14 Tage Rückgaberecht</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white mt-16 py-8">
          <div class="container mx-auto px-4 text-center">
            <p>&copy; 2026 SOFTWAREKING24. Alle Rechte vorbehalten.</p>
          </div>
        </footer>

        <script>
          // Wait for cart manager to be ready
          function initCart() {
            if (!window.cartManager) {
              setTimeout(initCart, 100);
              return;
            }

            loadCart();
            
            // Listen for cart updates
            window.addEventListener('storage', (e) => {
              if (e.key === 'cart') {
                loadCart();
              }
            });
          }

          // Load cart from cart manager
          function loadCart() {
            const cart = window.cartManager.cart;
            renderCart(cart);
            updateSummary(cart);
          }

          // Render cart items
          function renderCart(cart) {
            const container = document.getElementById('cart-items');
            
            if (!cart || cart.items.length === 0) {
              container.innerHTML = \`
                <div class="bg-white rounded-lg shadow-sm p-12 text-center">
                  <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                  <h2 class="text-2xl font-bold text-gray-800 mb-2">Ihr Warenkorb ist leer</h2>
                  <p class="text-gray-600 mb-6">Fügen Sie Produkte hinzu, um mit dem Einkauf zu beginnen</p>
                  <a href="/" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    <i class="fas fa-shopping-bag mr-2"></i>Produkte entdecken
                  </a>
                </div>
              \`;
              document.getElementById('checkout-button').disabled = true;
              return;
            }

            container.innerHTML = cart.items.map((item, index) => {
              const product = item.product;
              const price = product.discount_price || product.base_price;
              const originalPrice = product.base_price;
              const hasDiscount = product.discount_price && product.discount_price < product.base_price;
              const subtotal = price * item.quantity;
              const discountPercent = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

              return \`
                <div class="bg-white rounded-lg shadow-sm p-6 cart-item-enter">
                  <div class="flex items-start space-x-4">
                    <!-- Product Image -->
                    <div class="w-24 h-24 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      \${product.image_url ? 
                        \`<img src="\${product.image_url}" alt="\${product.name}" class="w-full h-full object-cover" />\` :
                        \`<i class="fas fa-box text-3xl text-gray-300"></i>\`
                      }
                    </div>
                    
                    <!-- Product Details -->
                    <div class="flex-1 min-w-0">
                      <h3 class="text-lg font-bold text-gray-800 mb-1 truncate">\${product.name}</h3>
                      <p class="text-sm text-gray-600 mb-2">
                        <i class="fas fa-tag mr-1"></i>SKU: \${product.sku || 'N/A'}
                      </p>
                      
                      <!-- Price -->
                      <div class="flex items-center space-x-2 mb-3">
                        \${hasDiscount ? \`
                          <span class="text-sm text-gray-500 line-through">€\${(originalPrice).toFixed(2)}</span>
                          <span class="text-xl font-bold text-green-600">€\${(price).toFixed(2)}</span>
                          <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">-\${discountPercent}%</span>
                        \` : \`
                          <span class="text-xl font-bold text-gray-800">€\${(price).toFixed(2)}</span>
                        \`}
                      </div>

                      <!-- Quantity Controls -->
                      <div class="flex items-center space-x-4">
                        <div class="flex items-center border border-gray-300 rounded-lg">
                          <button 
                            onclick="updateQuantity(\${index}, \${item.quantity - 1})"
                            class="px-3 py-2 hover:bg-gray-100 transition"
                            \${item.quantity <= 1 ? 'disabled class="opacity-50 cursor-not-allowed"' : ''}
                          >
                            <i class="fas fa-minus text-sm"></i>
                          </button>
                          <span class="px-4 py-2 font-semibold min-w-[3rem] text-center">\${item.quantity}</span>
                          <button 
                            onclick="updateQuantity(\${index}, \${item.quantity + 1})"
                            class="px-3 py-2 hover:bg-gray-100 transition"
                          >
                            <i class="fas fa-plus text-sm"></i>
                          </button>
                        </div>
                        
                        <button 
                          onclick="removeItem(\${index})"
                          class="text-red-600 hover:text-red-700 transition"
                          title="Entfernen"
                        >
                          <i class="fas fa-trash mr-1"></i>Entfernen
                        </button>
                      </div>
                    </div>

                    <!-- Subtotal -->
                    <div class="text-right">
                      <p class="text-sm text-gray-600 mb-1">Zwischensumme</p>
                      <p class="text-xl font-bold text-gray-800">€\${subtotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              \`;
            }).join('');

            document.getElementById('checkout-button').disabled = false;
          }

          // Update summary
          function updateSummary(cart) {
            if (!cart || cart.items.length === 0) {
              document.getElementById('order-summary').innerHTML = '';
              return;
            }

            const subtotal = cart.subtotal || 0;
            const discount = cart.discount || 0;
            const vat = cart.vat || 0;
            const total = cart.total || 0;

            let summaryHTML = \`
              <div class="flex justify-between text-gray-700">
                <span>Zwischensumme:</span>
                <span class="font-semibold">€\${(subtotal / 100).toFixed(2)}</span>
              </div>
            \`;

            if (discount > 0 && cart.coupon) {
              summaryHTML += \`
                <div class="flex justify-between text-green-600">
                  <span>Rabatt (\${cart.coupon.code}):</span>
                  <span class="font-semibold">-€\${(discount / 100).toFixed(2)}</span>
                </div>
              \`;
            }

            summaryHTML += \`
              <div class="flex justify-between text-gray-700">
                <span>MwSt. (19%):</span>
                <span class="font-semibold">€\${(vat / 100).toFixed(2)}</span>
              </div>
              <div class="pt-3 border-t border-gray-200"></div>
              <div class="flex justify-between text-lg font-bold" style="color: var(--navy-dark);">
                <span>Gesamt:</span>
                <span>€\${(total / 100).toFixed(2)}</span>
              </div>
            \`;

            document.getElementById('order-summary').innerHTML = summaryHTML;
          }

          // Update quantity
          function updateQuantity(index, newQuantity) {
            if (newQuantity < 1) {
              if (confirm('Möchten Sie dieses Produkt aus dem Warenkorb entfernen?')) {
                removeItem(index);
              }
              return;
            }

            window.cartManager.updateQuantity(index, newQuantity);
            loadCart();
          }

          // Remove item
          function removeItem(index) {
            if (confirm('Möchten Sie dieses Produkt wirklich entfernen?')) {
              window.cartManager.removeItem(index);
              loadCart();
            }
          }

          // Apply coupon
          function applyCoupon() {
            const input = document.getElementById('coupon-input');
            const code = input.value.trim().toUpperCase();
            const messageEl = document.getElementById('coupon-message');

            if (!code) {
              messageEl.innerHTML = '<span class="text-red-600"><i class="fas fa-exclamation-circle mr-1"></i>Bitte geben Sie einen Gutscheincode ein</span>';
              return;
            }

            const success = window.cartManager.applyCoupon(code);
            
            if (success) {
              messageEl.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Gutschein wurde angewendet!</span>';
              input.value = '';
              loadCart();
            } else {
              messageEl.innerHTML = '<span class="text-red-600"><i class="fas fa-times-circle mr-1"></i>Ungültiger Gutscheincode</span>';
            }

            setTimeout(() => {
              messageEl.innerHTML = '';
            }, 3000);
          }

          // Quick coupon
          function quickCoupon(code) {
            document.getElementById('coupon-input').value = code;
            applyCoupon();
          }

          // Proceed to checkout
          function proceedToCheckout() {
            const cart = window.cartManager.cart;
            if (!cart || cart.items.length === 0) {
              alert('Ihr Warenkorb ist leer');
              return;
            }

            window.location.href = '/checkout';
          }

          // Initialize on load
          window.addEventListener('DOMContentLoaded', initCart);
        </script>
      </body>
    </html>
  `;
};
