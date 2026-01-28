// Warenkorb (Shopping Cart) Component - German First
import type { FC } from 'hono/jsx'

export const Cart: FC = () => {
  return (
    <div class="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          <i class="fas fa-shopping-cart mr-3 text-blue-600"></i>
          Warenkorb
        </h1>
        <p class="text-gray-600">Überprüfen Sie Ihre ausgewählten Produkte vor der Bestellung</p>
      </div>

      {/* Cart Content */}
      <div class="grid lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Side (2/3 width) */}
        <div class="lg:col-span-2">
          {/* Empty Cart State */}
          <div id="empty-cart-state" class="hidden bg-white rounded-lg shadow-md p-12 text-center">
            <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
            <h2 class="text-2xl font-semibold text-gray-700 mb-2">Ihr Warenkorb ist leer</h2>
            <p class="text-gray-500 mb-6">Fügen Sie Produkte hinzu, um mit dem Einkauf fortzufahren</p>
            <a href="/produkte" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <i class="fas fa-arrow-left mr-2"></i>
              Weiter einkaufen
            </a>
          </div>

          {/* Cart Items List */}
          <div id="cart-items-list" class="bg-white rounded-lg shadow-md">
            {/* Cart Header */}
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-800">
                  Artikel im Warenkorb (<span id="cart-item-count">0</span>)
                </h2>
                <button 
                  id="clear-cart-btn"
                  class="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  <i class="fas fa-trash-alt mr-1"></i>
                  Warenkorb leeren
                </button>
              </div>
            </div>

            {/* Cart Items Container */}
            <div id="cart-items-container" class="divide-y divide-gray-200">
              {/* Items will be dynamically inserted here */}
            </div>
          </div>

          {/* Continue Shopping Button */}
          <div class="mt-6">
            <a 
              href="/produkte" 
              class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Weiter einkaufen
            </a>
          </div>
        </div>

        {/* Order Summary - Right Side (1/3 width) */}
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Zusammenfassung</h2>

            {/* Coupon Code Input */}
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-tag mr-2"></i>
                Gutscheincode
              </label>
              <div class="flex gap-2">
                <input
                  type="text"
                  id="coupon-code"
                  placeholder="Code eingeben"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  id="apply-coupon-btn"
                  class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Anwenden
                </button>
              </div>
              <div id="coupon-message" class="mt-2 text-sm"></div>
            </div>

            {/* Price Breakdown */}
            <div class="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div class="flex justify-between text-gray-600">
                <span>Zwischensumme:</span>
                <span id="cart-subtotal">€0,00</span>
              </div>
              
              <div id="discount-row" class="hidden flex justify-between text-green-600">
                <span>Rabatt (<span id="discount-label"></span>):</span>
                <span id="cart-discount">-€0,00</span>
              </div>

              <div class="flex justify-between text-gray-600">
                <span>MwSt. (19%):</span>
                <span id="cart-vat">€0,00</span>
              </div>

              <div class="flex justify-between text-gray-600">
                <span>
                  <i class="fas fa-shipping-fast mr-1"></i>
                  Versand:
                </span>
                <span class="text-green-600 font-medium">Kostenlos</span>
              </div>
            </div>

            {/* Total */}
            <div class="flex justify-between text-xl font-bold text-gray-900 mb-6">
              <span>Gesamt:</span>
              <span id="cart-total">€0,00</span>
            </div>

            {/* Checkout Button */}
            <button
              id="checkout-btn"
              class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl mb-4"
            >
              <i class="fas fa-lock mr-2"></i>
              Zur Kasse
            </button>

            {/* Security Badges */}
            <div class="space-y-3 pt-6 border-t border-gray-200">
              <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-shield-alt text-green-500 mr-2"></i>
                <span>SSL-verschlüsselte Übertragung</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-undo text-blue-500 mr-2"></i>
                <span>30 Tage Widerrufsrecht</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-download text-purple-500 mr-2"></i>
                <span>Sofortiger Download nach Zahlung</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div class="mt-6 pt-6 border-t border-gray-200">
              <p class="text-sm text-gray-600 mb-3 text-center">Sichere Zahlungsmethoden:</p>
              <div class="flex items-center justify-center gap-3 flex-wrap">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" class="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="PayPal" class="h-6" />
                <i class="fab fa-cc-visa text-3xl text-blue-600"></i>
                <i class="fab fa-cc-mastercard text-3xl text-red-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Item Template (Hidden) */}
      <template id="cart-item-template">
        <div class="p-6 cart-item" data-product-id="">
          <div class="flex gap-6">
            {/* Product Image */}
            <div class="flex-shrink-0">
              <img 
                src="" 
                alt="" 
                class="w-32 h-32 object-cover rounded-lg product-image"
              />
            </div>

            {/* Product Details */}
            <div class="flex-1">
              <div class="flex justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 product-name mb-1"></h3>
                  <p class="text-sm text-gray-600 product-category mb-2"></p>
                  
                  {/* License Type */}
                  <div class="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-3">
                    <i class="fas fa-key mr-2"></i>
                    <span class="license-type">Standard Lizenz</span>
                  </div>

                  {/* Product Features */}
                  <ul class="text-sm text-gray-600 space-y-1 mb-4">
                    <li><i class="fas fa-check text-green-500 mr-2"></i>Lebenslange Lizenz</li>
                    <li><i class="fas fa-check text-green-500 mr-2"></i>Sofortiger Download</li>
                    <li><i class="fas fa-check text-green-500 mr-2"></i>Kostenlose Updates</li>
                  </ul>
                </div>

                {/* Remove Button */}
                <button class="remove-item-btn text-gray-400 hover:text-red-600 transition-colors h-8">
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Quantity and Price Controls */}
              <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                {/* Quantity Controls */}
                <div class="flex items-center gap-3">
                  <span class="text-sm text-gray-600 font-medium">Menge:</span>
                  <div class="flex items-center border border-gray-300 rounded-lg">
                    <button class="quantity-decrease px-3 py-1 hover:bg-gray-50 transition-colors">
                      <i class="fas fa-minus text-sm"></i>
                    </button>
                    <input 
                      type="text" 
                      class="quantity-input w-12 text-center border-x border-gray-300 py-1 focus:outline-none" 
                      value="1" 
                      readonly
                    />
                    <button class="quantity-increase px-3 py-1 hover:bg-gray-50 transition-colors">
                      <i class="fas fa-plus text-sm"></i>
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div class="text-right">
                  <div class="text-2xl font-bold text-gray-900 item-total-price">€0,00</div>
                  <div class="text-sm text-gray-500">
                    <span class="item-unit-price">€0,00</span> pro Stück
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      {/* Cart JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        // Cart state
        let cart = {
          items: [],
          coupon: null,
          subtotal: 0,
          discount: 0,
          vat: 0,
          total: 0
        };

        const VAT_RATE = 0.19;

        // Load cart from localStorage
        function loadCart() {
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            cart.items = JSON.parse(savedCart);
          }
          
          // Add demo items if cart is empty (for testing)
          if (cart.items.length === 0) {
            cart.items = [
              {
                id: 1,
                name: 'Microsoft Office 2024 Professional Plus',
                category: 'Office Software',
                price: 89.99,
                quantity: 1,
                image: 'https://via.placeholder.com/400x300?text=Office+2024',
                licenseType: 'Standard Lizenz'
              },
              {
                id: 2,
                name: 'Adobe Creative Cloud All Apps',
                category: 'Creative Software',
                price: 149.99,
                quantity: 1,
                image: 'https://via.placeholder.com/400x300?text=Adobe+CC',
                licenseType: 'Premium Lizenz'
              }
            ];
          }
          
          renderCart();
        }

        // Save cart to localStorage
        function saveCart() {
          localStorage.setItem('cart', JSON.stringify(cart.items));
        }

        // Calculate cart totals
        function calculateTotals() {
          cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          
          // Apply discount if coupon exists
          if (cart.coupon) {
            if (cart.coupon.type === 'percentage') {
              cart.discount = cart.subtotal * (cart.coupon.value / 100);
            } else {
              cart.discount = cart.coupon.value;
            }
          } else {
            cart.discount = 0;
          }
          
          const afterDiscount = cart.subtotal - cart.discount;
          cart.vat = afterDiscount * VAT_RATE;
          cart.total = afterDiscount + cart.vat;
        }

        // Format price
        function formatPrice(price) {
          return '€' + price.toFixed(2).replace('.', ',');
        }

        // Render cart
        function renderCart() {
          calculateTotals();
          
          const container = document.getElementById('cart-items-container');
          const emptyState = document.getElementById('empty-cart-state');
          const itemsList = document.getElementById('cart-items-list');
          
          // Show empty state if no items
          if (cart.items.length === 0) {
            emptyState.classList.remove('hidden');
            itemsList.classList.add('hidden');
            return;
          }
          
          emptyState.classList.add('hidden');
          itemsList.classList.remove('hidden');
          
          // Clear container
          container.innerHTML = '';
          
          // Render each item
          const template = document.getElementById('cart-item-template');
          cart.items.forEach((item, index) => {
            const clone = template.content.cloneNode(true);
            const itemDiv = clone.querySelector('.cart-item');
            
            itemDiv.dataset.productId = item.id;
            itemDiv.dataset.index = index;
            
            itemDiv.querySelector('.product-image').src = item.image;
            itemDiv.querySelector('.product-image').alt = item.name;
            itemDiv.querySelector('.product-name').textContent = item.name;
            itemDiv.querySelector('.product-category').textContent = item.category;
            itemDiv.querySelector('.license-type').textContent = item.licenseType;
            itemDiv.querySelector('.quantity-input').value = item.quantity;
            itemDiv.querySelector('.item-unit-price').textContent = formatPrice(item.price);
            itemDiv.querySelector('.item-total-price').textContent = formatPrice(item.price * item.quantity);
            
            container.appendChild(clone);
          });
          
          // Update summary
          document.getElementById('cart-item-count').textContent = cart.items.length;
          document.getElementById('cart-subtotal').textContent = formatPrice(cart.subtotal);
          document.getElementById('cart-vat').textContent = formatPrice(cart.vat);
          document.getElementById('cart-total').textContent = formatPrice(cart.total);
          
          // Show/hide discount row
          const discountRow = document.getElementById('discount-row');
          if (cart.discount > 0) {
            discountRow.classList.remove('hidden');
            document.getElementById('discount-label').textContent = cart.coupon.code;
            document.getElementById('cart-discount').textContent = '-' + formatPrice(cart.discount);
          } else {
            discountRow.classList.add('hidden');
          }
          
          // Attach event listeners
          attachCartItemListeners();
        }

        // Attach event listeners to cart items
        function attachCartItemListeners() {
          // Quantity decrease
          document.querySelectorAll('.quantity-decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const itemDiv = e.target.closest('.cart-item');
              const index = parseInt(itemDiv.dataset.index);
              if (cart.items[index].quantity > 1) {
                cart.items[index].quantity--;
                saveCart();
                renderCart();
              }
            });
          });
          
          // Quantity increase
          document.querySelectorAll('.quantity-increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const itemDiv = e.target.closest('.cart-item');
              const index = parseInt(itemDiv.dataset.index);
              if (cart.items[index].quantity < 10) {
                cart.items[index].quantity++;
                saveCart();
                renderCart();
              }
            });
          });
          
          // Remove item
          document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const itemDiv = e.target.closest('.cart-item');
              const index = parseInt(itemDiv.dataset.index);
              
              if (confirm('Möchten Sie diesen Artikel wirklich aus dem Warenkorb entfernen?')) {
                cart.items.splice(index, 1);
                saveCart();
                renderCart();
              }
            });
          });
        }

        // Clear cart
        document.getElementById('clear-cart-btn').addEventListener('click', () => {
          if (confirm('Möchten Sie wirklich alle Artikel aus dem Warenkorb entfernen?')) {
            cart.items = [];
            cart.coupon = null;
            saveCart();
            renderCart();
          }
        });

        // Apply coupon
        document.getElementById('apply-coupon-btn').addEventListener('click', async () => {
          const code = document.getElementById('coupon-code').value.trim().toUpperCase();
          const messageDiv = document.getElementById('coupon-message');
          
          if (!code) {
            messageDiv.innerHTML = '<span class="text-red-600"><i class="fas fa-times-circle mr-1"></i>Bitte geben Sie einen Code ein</span>';
            return;
          }
          
          // Demo coupons
          const coupons = {
            'SAVE10': { code: 'SAVE10', type: 'percentage', value: 10 },
            'SAVE20': { code: 'SAVE20', type: 'percentage', value: 20 },
            'WELCOME': { code: 'WELCOME', type: 'fixed', value: 15 }
          };
          
          if (coupons[code]) {
            cart.coupon = coupons[code];
            messageDiv.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Gutschein erfolgreich angewendet!</span>';
            renderCart();
          } else {
            messageDiv.innerHTML = '<span class="text-red-600"><i class="fas fa-times-circle mr-1"></i>Ungültiger Gutscheincode</span>';
          }
        });

        // Checkout button
        document.getElementById('checkout-btn').addEventListener('click', () => {
          if (cart.items.length === 0) {
            alert('Ihr Warenkorb ist leer');
            return;
          }
          
          // Save cart and redirect to checkout
          saveCart();
          window.location.href = '/kasse';
        });

        // Initialize cart on page load
        loadCart();
      `}} />
    </div>
  )
}
