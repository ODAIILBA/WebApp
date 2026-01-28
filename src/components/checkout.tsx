import type { FC } from 'hono/jsx'

export const Checkout: FC = () => {
  return (
    <div>
      <div class="container mx-auto px-4 py-12">
        <h1 class="text-4xl font-bold text-primary mb-2">
          <i class="fas fa-lock mr-3 text-gold"></i>
          Secure Checkout
        </h1>
        <div class="h-1 w-24 bg-gold mb-8"></div>

        <div class="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div class="lg:col-span-2">
            <form id="checkout-form" class="space-y-6">
              {/* Customer Information */}
              <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold text-primary mb-6">
                  <i class="fas fa-user mr-2 text-gold"></i>
                  Customer Information
                </h2>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold mb-2">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      required 
                      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      required 
                      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-semibold mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="your@email.com"
                      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                    />
                    <p class="text-sm text-gray-600 mt-1">
                      <i class="fas fa-info-circle mr-1"></i>
                      Your license key will be sent to this email
                    </p>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-semibold mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="+49 123 456 789"
                      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold text-primary mb-6">
                  <i class="fas fa-map-marker-alt mr-2 text-gold"></i>
                  Billing Address
                </h2>
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-semibold mb-2">Street Address *</label>
                    <input 
                      type="text" 
                      name="address" 
                      required 
                      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2">City *</label>
                    <input 
                      type="text" 
                      name="city" 
                      required 
                      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2">Postal Code *</label>
                    <input 
                      type="text" 
                      name="postalCode" 
                      required 
                      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2">Country *</label>
                    <select 
                      name="country" 
                      required 
                      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select Country</option>
                      <option value="DE">Germany</option>
                      <option value="AT">Austria</option>
                      <option value="CH">Switzerland</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2">VAT Number (Optional)</label>
                    <input 
                      type="text" 
                      name="vatNumber" 
                      placeholder="DE123456789"
                      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold text-primary mb-6">
                  <i class="fas fa-credit-card mr-2 text-gold"></i>
                  Payment Method
                </h2>
                <div class="space-y-3">
                  <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-gold transition">
                    <input type="radio" name="paymentMethod" value="credit_card" checked class="mr-3" />
                    <div class="flex-1">
                      <span class="font-semibold">Credit / Debit Card</span>
                      <div class="text-sm text-gray-600">Pay securely with your card</div>
                    </div>
                    <div class="flex gap-2">
                      <i class="fab fa-cc-visa text-2xl text-blue-600"></i>
                      <i class="fab fa-cc-mastercard text-2xl text-red-600"></i>
                      <i class="fab fa-cc-amex text-2xl text-blue-800"></i>
                    </div>
                  </label>

                  <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-gold transition">
                    <input type="radio" name="paymentMethod" value="paypal" class="mr-3" />
                    <div class="flex-1">
                      <span class="font-semibold">PayPal</span>
                      <div class="text-sm text-gray-600">Fast and secure payment</div>
                    </div>
                    <i class="fab fa-paypal text-3xl text-blue-600"></i>
                  </label>

                  <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-gold transition">
                    <input type="radio" name="paymentMethod" value="bank_transfer" class="mr-3" />
                    <div class="flex-1">
                      <span class="font-semibold">Bank Transfer</span>
                      <div class="text-sm text-gray-600">Direct bank transfer</div>
                    </div>
                    <i class="fas fa-university text-2xl text-primary"></i>
                  </label>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div class="bg-white rounded-lg shadow-lg p-6">
                <label class="flex items-start cursor-pointer">
                  <input type="checkbox" required class="mt-1 mr-3" />
                  <span class="text-sm">
                    I have read and agree to the 
                    <a href="/terms" class="text-gold hover:underline ml-1">Terms & Conditions</a>,
                    <a href="/privacy" class="text-gold hover:underline ml-1">Privacy Policy</a>, and
                    <a href="/right-of-withdrawal" class="text-gold hover:underline ml-1">Right of Withdrawal</a> *
                  </span>
                </label>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 class="text-2xl font-bold text-primary mb-6">Order Summary</h2>
              
              <div id="checkout-items" class="space-y-3 mb-6 max-h-64 overflow-y-auto"></div>

              <div class="border-t pt-4 space-y-3 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-semibold" id="checkout-subtotal">€0.00</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">VAT (19%)</span>
                  <span class="font-semibold" id="checkout-tax">€0.00</span>
                </div>
                <div class="border-t pt-3 flex justify-between text-xl font-bold">
                  <span class="text-primary">Total</span>
                  <span class="text-gold" id="checkout-total">€0.00</span>
                </div>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                class="btn-gold w-full py-4 rounded-lg text-center text-lg"
              >
                <i class="fas fa-lock mr-2"></i>
                Complete Order
              </button>

              <div class="mt-6 pt-6 border-t text-center text-sm text-gray-600">
                <i class="fas fa-shield-alt text-gold mr-2"></i>
                Your payment information is secure and encrypted
              </div>
            </div>
          </div>
        </div>
      </div>

      <script>{`
        // Load cart items
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        if (cart.length === 0) {
          window.location.href = '/cart';
        }

        function displayCheckoutItems() {
          const container = document.getElementById('checkout-items');
          container.innerHTML = cart.map(item => {
            const price = item.discount_price || item.base_price;
            return \`
              <div class="flex items-center gap-3 pb-3 border-b">
                <img 
                  src="\${item.image_url || 'https://via.placeholder.com/60x40'}" 
                  alt="\${item.name}"
                  class="w-16 h-10 object-cover rounded"
                />
                <div class="flex-1">
                  <div class="font-semibold text-sm">\${item.name}</div>
                  <div class="text-xs text-gray-600">Qty: \${item.quantity}</div>
                </div>
                <div class="font-bold text-gold">€\${(price * item.quantity).toFixed(2)}</div>
              </div>
            \`;
          }).join('');

          updateCheckoutTotals();
        }

        function updateCheckoutTotals() {
          let subtotal = 0;
          cart.forEach(item => {
            const price = item.discount_price || item.base_price;
            subtotal += price * item.quantity;
          });
          
          const tax = subtotal * 0.19;
          const total = subtotal + tax;

          document.getElementById('checkout-subtotal').textContent = '€' + subtotal.toFixed(2);
          document.getElementById('checkout-tax').textContent = '€' + tax.toFixed(2);
          document.getElementById('checkout-total').textContent = '€' + total.toFixed(2);
        }

        // Handle form submission
        document.getElementById('checkout-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          const orderData = {
            customer: {
              firstName: formData.get('firstName'),
              lastName: formData.get('lastName'),
              email: formData.get('email'),
              phone: formData.get('phone')
            },
            billing: {
              address: formData.get('address'),
              city: formData.get('city'),
              postalCode: formData.get('postalCode'),
              country: formData.get('country'),
              vatNumber: formData.get('vatNumber')
            },
            paymentMethod: formData.get('paymentMethod'),
            items: cart
          };

          try {
            const response = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(orderData)
            });

            const result = await response.json();
            
            if (result.success) {
              // Clear cart
              localStorage.removeItem('cart');
              // Redirect to success page
              window.location.href = \`/order-success?order=\${result.data.order_number}\`;
            } else {
              alert('Order failed: ' + result.error);
            }
          } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred. Please try again.');
          }
        });

        displayCheckoutItems();
      `}</script>
    </div>
  )
}
