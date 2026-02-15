export const CheckoutPage = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kasse - SOFTWAREKING24</title>
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
          .step-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            position: relative;
          }
          .step-circle {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #e5e7eb;
            color: #6b7280;
            display: flex;
            align-items: center;
            justify-center;
            font-weight: bold;
            position: relative;
            z-index: 2;
            transition: all 0.3s;
          }
          .step.active .step-circle {
            background: var(--gold);
            color: var(--navy-dark);
            box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
          }
          .step.completed .step-circle {
            background: #10b981;
            color: white;
          }
          .step-line {
            position: absolute;
            top: 24px;
            left: 50%;
            right: -50%;
            height: 2px;
            background: #e5e7eb;
            z-index: 1;
          }
          .step.completed .step-line {
            background: #10b981;
          }
          .step:last-child .step-line {
            display: none;
          }
          .checkout-section {
            display: none;
          }
          .checkout-section.active {
            display: block;
            animation: fadeIn 0.3s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
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
                <a href="/warenkorb" class="text-gray-600 hover:text-blue-600">
                  <i class="fas fa-shopping-cart mr-2"></i>Zurück zum Warenkorb
                </a>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-8">
          <!-- Progress Steps -->
          <div class="mb-8">
            <div class="step-indicator max-w-3xl mx-auto">
              <div class="step active" id="step-indicator-1">
                <div class="step-circle">
                  <i class="fas fa-user"></i>
                </div>
                <span class="text-sm mt-2 font-semibold">Ihre Daten</span>
                <div class="step-line"></div>
              </div>
              <div class="step" id="step-indicator-2">
                <div class="step-circle">
                  <i class="fas fa-credit-card"></i>
                </div>
                <span class="text-sm mt-2">Zahlung</span>
                <div class="step-line"></div>
              </div>
              <div class="step" id="step-indicator-3">
                <div class="step-circle">
                  <i class="fas fa-check"></i>
                </div>
                <span class="text-sm mt-2">Prüfen</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Checkout Form -->
            <div class="lg:col-span-2">
              
              <!-- Step 1: Customer Information -->
              <div id="step-1" class="checkout-section active">
                <div class="bg-white rounded-lg shadow-sm p-6">
                  <h2 class="text-2xl font-bold mb-6" style="color: var(--navy-dark);">
                    <i class="fas fa-user mr-2"></i>Ihre Kontaktdaten
                  </h2>
                  
                  <form id="customer-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Vorname <span class="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="firstName"
                          required
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Max"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Nachname <span class="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="lastName"
                          required
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Mustermann"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        E-Mail-Adresse <span class="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="max@beispiel.de"
                      />
                      <p class="text-sm text-gray-500 mt-1">Ihre Lizenzen werden an diese E-Mail-Adresse gesendet</p>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Firma (optional)
                      </label>
                      <input 
                        type="text" 
                        name="company"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Firmenname"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Straße und Hausnummer <span class="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="street"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Musterstraße 123"
                      />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Postleitzahl <span class="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="zip"
                          required
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="12345"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Stadt <span class="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="city"
                          required
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Berlin"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Land <span class="text-red-500">*</span>
                      </label>
                      <select 
                        name="country"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="DE" selected>Deutschland</option>
                        <option value="AT">Österreich</option>
                        <option value="CH">Schweiz</option>
                        <option value="LU">Luxemburg</option>
                      </select>
                    </div>

                    <div>
                      <label class="flex items-start">
                        <input 
                          type="checkbox" 
                          name="newsletter"
                          class="mt-1 mr-2"
                        />
                        <span class="text-sm text-gray-600">
                          Ja, ich möchte regelmäßig über Angebote und Neuigkeiten informiert werden
                        </span>
                      </label>
                    </div>

                    <div class="pt-4">
                      <button 
                        type="submit"
                        class="w-full text-white px-6 py-3 rounded-lg transition font-bold text-lg flex items-center justify-center"
                        style="background-color: var(--gold);"
                      >
                        <span>Weiter zur Zahlung</span>
                        <i class="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Step 2: Payment Method -->
              <div id="step-2" class="checkout-section">
                <div class="bg-white rounded-lg shadow-sm p-6">
                  <h2 class="text-2xl font-bold mb-6" style="color: var(--navy-dark);">
                    <i class="fas fa-credit-card mr-2"></i>Zahlungsart wählen
                  </h2>

                  <div class="space-y-4">
                    <!-- Stripe Card Payment -->
                    <label class="block border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition">
                      <div class="flex items-center">
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="stripe"
                          checked
                          class="mr-3"
                        />
                        <div class="flex-1">
                          <div class="font-semibold text-gray-800">Kreditkarte / Debitkarte</div>
                          <div class="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                        </div>
                        <div class="flex space-x-2">
                          <i class="fab fa-cc-visa text-3xl text-blue-600"></i>
                          <i class="fab fa-cc-mastercard text-3xl text-red-600"></i>
                        </div>
                      </div>
                    </label>

                    <!-- PayPal -->
                    <label class="block border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition">
                      <div class="flex items-center">
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="paypal"
                          class="mr-3"
                        />
                        <div class="flex-1">
                          <div class="font-semibold text-gray-800">PayPal</div>
                          <div class="text-sm text-gray-500">Schnell und sicher mit PayPal bezahlen</div>
                        </div>
                        <i class="fab fa-paypal text-3xl text-blue-600"></i>
                      </div>
                    </label>

                    <!-- Bank Transfer -->
                    <label class="block border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition">
                      <div class="flex items-center">
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="bank_transfer"
                          class="mr-3"
                        />
                        <div class="flex-1">
                          <div class="font-semibold text-gray-800">Überweisung</div>
                          <div class="text-sm text-gray-500">Bezahlen Sie bequem per Überweisung</div>
                        </div>
                        <i class="fas fa-university text-3xl text-gray-600"></i>
                      </div>
                    </label>
                  </div>

                  <div class="flex space-x-4 mt-6 pt-6 border-t">
                    <button 
                      onclick="goToStep(1)"
                      class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                    >
                      <i class="fas fa-arrow-left mr-2"></i>Zurück
                    </button>
                    <button 
                      onclick="goToStep(3)"
                      class="flex-1 text-white px-6 py-3 rounded-lg transition font-bold"
                      style="background-color: var(--gold);"
                    >
                      Weiter zur Prüfung
                      <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Step 3: Review Order -->
              <div id="step-3" class="checkout-section">
                <div class="bg-white rounded-lg shadow-sm p-6">
                  <h2 class="text-2xl font-bold mb-6" style="color: var(--navy-dark);">
                    <i class="fas fa-check-circle mr-2"></i>Bestellung prüfen
                  </h2>

                  <!-- Customer Info Review -->
                  <div class="mb-6 pb-6 border-b">
                    <h3 class="font-semibold text-lg mb-3">Ihre Daten</h3>
                    <div id="review-customer-info" class="text-gray-700 space-y-1">
                      <!-- Will be populated by JS -->
                    </div>
                    <button onclick="goToStep(1)" class="text-blue-600 hover:underline text-sm mt-2">
                      <i class="fas fa-edit mr-1"></i>Bearbeiten
                    </button>
                  </div>

                  <!-- Payment Method Review -->
                  <div class="mb-6 pb-6 border-b">
                    <h3 class="font-semibold text-lg mb-3">Zahlungsart</h3>
                    <div id="review-payment-method" class="text-gray-700">
                      <!-- Will be populated by JS -->
                    </div>
                    <button onclick="goToStep(2)" class="text-blue-600 hover:underline text-sm mt-2">
                      <i class="fas fa-edit mr-1"></i>Ändern
                    </button>
                  </div>

                  <!-- Cart Items Review -->
                  <div class="mb-6">
                    <h3 class="font-semibold text-lg mb-3">Ihre Bestellung</h3>
                    <div id="review-cart-items" class="space-y-3">
                      <!-- Will be populated by JS -->
                    </div>
                  </div>

                  <!-- Terms and Conditions -->
                  <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <label class="flex items-start">
                      <input 
                        type="checkbox" 
                        id="terms-checkbox"
                        class="mt-1 mr-3"
                        required
                      />
                      <span class="text-sm text-gray-700">
                        Ich habe die <a href="/agb" class="text-blue-600 hover:underline">AGB</a> und 
                        <a href="/datenschutz" class="text-blue-600 hover:underline">Datenschutzbestimmungen</a> gelesen und akzeptiere diese. 
                        Mir ist bekannt, dass ich bei digitalen Produkten kein Widerrufsrecht habe, sobald der Download begonnen hat.
                        <span class="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  <div class="flex space-x-4">
                    <button 
                      onclick="goToStep(2)"
                      class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                    >
                      <i class="fas fa-arrow-left mr-2"></i>Zurück
                    </button>
                    <button 
                      onclick="submitOrder()"
                      id="submit-order-btn"
                      class="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg"
                    >
                      <i class="fas fa-lock mr-2"></i>Jetzt kostenpflichtig bestellen
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <!-- Order Summary Sidebar -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 class="text-xl font-bold mb-4" style="color: var(--navy-dark);">Ihre Bestellung</h2>
                
                <div id="checkout-summary" class="space-y-3 mb-4">
                  <!-- Summary will be populated by JS -->
                </div>

                <div id="checkout-totals" class="space-y-2 pt-4 border-t">
                  <!-- Totals will be populated by JS -->
                </div>

                <!-- Security Badges -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <div class="space-y-3 text-sm text-gray-600">
                    <div class="flex items-center">
                      <i class="fas fa-shield-alt text-green-600 mr-3"></i>
                      <span>SSL-gesicherte Verbindung</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-bolt text-blue-600 mr-3"></i>
                      <span>Sofortiger Lizenzversand</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-headset text-orange-600 mr-3"></i>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <script>
          let currentStep = 1;
          let customerData = {};
          let paymentMethod = 'stripe';

          // Wait for cart manager
          function initCheckout() {
            if (!window.cartManager) {
              setTimeout(initCheckout, 100);
              return;
            }

            const cart = window.cartManager.cart;
            
            // Check if cart is empty
            if (!cart || cart.items.length === 0) {
              alert('Ihr Warenkorb ist leer');
              window.location.href = '/warenkorb';
              return;
            }

            updateSummary();
            setupFormHandlers();
          }

          // Update summary sidebar
          function updateSummary() {
            const cart = window.cartManager.cart;
            const summaryEl = document.getElementById('checkout-summary');
            const totalsEl = document.getElementById('checkout-totals');

            // Cart items
            summaryEl.innerHTML = cart.items.map(item => {
              const price = item.product.discount_price || item.product.base_price;
              return \`
                <div class="flex justify-between text-sm">
                  <span class="flex-1 truncate">\${item.quantity}x \${item.product.name}</span>
                  <span class="font-semibold ml-2">€\${(price * item.quantity).toFixed(2)}</span>
                </div>
              \`;
            }).join('');

            // Totals
            const subtotal = cart.subtotal || 0;
            const discount = cart.discount || 0;
            const vat = cart.vat || 0;
            const total = cart.total || 0;

            let totalsHTML = \`
              <div class="flex justify-between text-gray-700">
                <span>Zwischensumme:</span>
                <span>€\${(subtotal / 100).toFixed(2)}</span>
              </div>
            \`;

            if (discount > 0) {
              totalsHTML += \`
                <div class="flex justify-between text-green-600">
                  <span>Rabatt:</span>
                  <span>-€\${(discount / 100).toFixed(2)}</span>
                </div>
              \`;
            }

            totalsHTML += \`
              <div class="flex justify-between text-gray-700">
                <span>MwSt. (19%):</span>
                <span>€\${(vat / 100).toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-lg font-bold pt-2 border-t" style="color: var(--navy-dark);">
                <span>Gesamt:</span>
                <span>€\${(total / 100).toFixed(2)}</span>
              </div>
            \`;

            totalsEl.innerHTML = totalsHTML;
          }

          // Setup form handlers
          function setupFormHandlers() {
            // Customer form submission
            document.getElementById('customer-form').addEventListener('submit', (e) => {
              e.preventDefault();
              
              const formData = new FormData(e.target);
              customerData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                company: formData.get('company'),
                street: formData.get('street'),
                zip: formData.get('zip'),
                city: formData.get('city'),
                country: formData.get('country'),
                newsletter: formData.get('newsletter') === 'on'
              };

              goToStep(2);
            });

            // Payment method selection
            document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
              radio.addEventListener('change', (e) => {
                paymentMethod = e.target.value;
              });
            });
          }

          // Navigate between steps
          function goToStep(step) {
            // Hide all sections
            document.querySelectorAll('.checkout-section').forEach(section => {
              section.classList.remove('active');
            });

            // Show target section
            document.getElementById('step-' + step).classList.add('active');

            // Update step indicators
            for (let i = 1; i <= 3; i++) {
              const indicator = document.getElementById('step-indicator-' + i);
              indicator.classList.remove('active', 'completed');
              
              if (i < step) {
                indicator.classList.add('completed');
              } else if (i === step) {
                indicator.classList.add('active');
              }
            }

            currentStep = step;

            // Update review section if on step 3
            if (step === 3) {
              updateReviewSection();
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          // Update review section
          function updateReviewSection() {
            // Customer info
            const customerInfoEl = document.getElementById('review-customer-info');
            customerInfoEl.innerHTML = \`
              <p><strong>\${customerData.firstName} \${customerData.lastName}</strong></p>
              \${customerData.company ? \`<p>\${customerData.company}</p>\` : ''}
              <p>\${customerData.street}</p>
              <p>\${customerData.zip} \${customerData.city}</p>
              <p>\${customerData.country}</p>
              <p class="text-blue-600 mt-2"><i class="fas fa-envelope mr-1"></i>\${customerData.email}</p>
            \`;

            // Payment method
            const paymentMethodEl = document.getElementById('review-payment-method');
            const paymentMethods = {
              'stripe': '<i class="fas fa-credit-card mr-2"></i>Kreditkarte / Debitkarte',
              'paypal': '<i class="fab fa-paypal mr-2"></i>PayPal',
              'bank_transfer': '<i class="fas fa-university mr-2"></i>Überweisung'
            };
            paymentMethodEl.innerHTML = paymentMethods[paymentMethod];

            // Cart items
            const cart = window.cartManager.cart;
            const cartItemsEl = document.getElementById('review-cart-items');
            cartItemsEl.innerHTML = cart.items.map(item => {
              const price = item.product.discount_price || item.product.base_price;
              return \`
                <div class="flex justify-between text-sm py-2 border-b">
                  <div class="flex-1">
                    <div class="font-semibold">\${item.product.name}</div>
                    <div class="text-gray-600">Menge: \${item.quantity}</div>
                  </div>
                  <div class="font-semibold">€\${(price * item.quantity).toFixed(2)}</div>
                </div>
              \`;
            }).join('');
          }

          // Submit order
          async function submitOrder() {
            const termsCheckbox = document.getElementById('terms-checkbox');
            
            if (!termsCheckbox.checked) {
              alert('Bitte akzeptieren Sie die AGB und Datenschutzbestimmungen');
              return;
            }

            const submitBtn = document.getElementById('submit-order-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Bestellung wird verarbeitet...';

            try {
              const cart = window.cartManager.cart;
              
              const orderData = {
                customer: customerData,
                paymentMethod: paymentMethod,
                items: cart.items.map(item => ({
                  productId: item.product.id,
                  quantity: item.quantity,
                  licenseType: item.licenseType,
                  price: item.product.discount_price || item.product.base_price
                })),
                subtotal: cart.subtotal,
                discount: cart.discount,
                vat: cart.vat,
                total: cart.total,
                coupon: cart.coupon ? cart.coupon.code : null
              };

              const response = await axios.post('/api/orders', orderData);

              if (response.data.success) {
                // Clear cart
                window.cartManager.clearCart();
                
                // Redirect to success page
                window.location.href = '/success?order=' + response.data.data.orderNumber;
              } else {
                throw new Error(response.data.error || 'Bestellung fehlgeschlagen');
              }
            } catch (error) {
              console.error('Order submission error:', error);
              alert('Fehler beim Absenden der Bestellung: ' + (error.response?.data?.error || error.message));
              
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fas fa-lock mr-2"></i>Jetzt kostenpflichtig bestellen';
            }
          }

          // Initialize on load
          window.addEventListener('DOMContentLoaded', initCheckout);
        </script>
      </body>
    </html>
  `;
};
