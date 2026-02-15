export const OrderSuccessPage = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bestellung erfolgreich - SoftwareKing24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style>
          :root {
            --navy-dark: #1a2a4e;
            --gold: #d4af37;
          }
          @keyframes checkmark {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
          }
          .checkmark-circle {
            animation: checkmark 0.6s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in {
            animation: fadeIn 0.6s ease-out 0.3s both;
          }
        </style>
      </head>
      <body class="bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow-sm">
          <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
              <a href="/" class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <i class="fas fa-shopping-bag text-white text-xl"></i>
                </div>
                <span class="text-2xl font-bold" style="color: var(--navy-dark);">SoftwareKing24</span>
              </a>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-16">
          <div class="max-w-3xl mx-auto">
            <!-- Success Message -->
            <div class="bg-white rounded-lg shadow-lg p-12 text-center">
              <!-- Success Icon -->
              <div class="checkmark-circle mb-6 inline-block">
                <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <i class="fas fa-check text-5xl text-green-600"></i>
                </div>
              </div>

              <h1 class="text-3xl font-bold mb-4" style="color: var(--navy-dark);">
                Vielen Dank für Ihre Bestellung!
              </h1>
              
              <p class="text-lg text-gray-600 mb-8">
                Ihre Bestellung wurde erfolgreich aufgegeben und wird verarbeitet.
              </p>

              <!-- Order Number -->
              <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8 fade-in">
                <p class="text-sm text-gray-600 mb-1">Ihre Bestellnummer</p>
                <p class="text-2xl font-bold" style="color: var(--navy-dark);" id="order-number">
                  <i class="fas fa-spinner fa-spin mr-2"></i>Lädt...
                </p>
              </div>

              <!-- What Happens Next -->
              <div class="text-left mb-8 fade-in">
                <h2 class="text-xl font-bold mb-4" style="color: var(--navy-dark);">
                  <i class="fas fa-info-circle mr-2"></i>Was passiert als Nächstes?
                </h2>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <i class="fas fa-envelope text-blue-600"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">1. Bestätigungs-E-Mail</h3>
                      <p class="text-gray-600 text-sm">Sie erhalten in wenigen Minuten eine Bestätigung an Ihre E-Mail-Adresse.</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <i class="fas fa-key text-green-600"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">2. Lizenzschlüssel</h3>
                      <p class="text-gray-600 text-sm">Nach Zahlungseingang erhalten Sie Ihre Lizenzschlüssel per E-Mail.</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <i class="fas fa-download text-orange-600"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">3. Download & Installation</h3>
                      <p class="text-gray-600 text-sm">Laden Sie Ihre Software herunter und aktivieren Sie diese mit Ihrem Lizenzschlüssel.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order Details -->
              <div id="order-details" class="text-left mb-8 fade-in">
                <!-- Will be populated by JS -->
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 fade-in">
                <a 
                  href="/" 
                  class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold text-center"
                >
                  <i class="fas fa-home mr-2"></i>Zur Startseite
                </a>
                <a 
                  href="/konto" 
                  class="flex-1 text-white px-6 py-3 rounded-lg transition font-semibold text-center"
                  style="background-color: var(--gold);"
                >
                  <i class="fas fa-user mr-2"></i>Zu Ihrem Konto
                </a>
              </div>

              <!-- Support Info -->
              <div class="mt-8 pt-8 border-t border-gray-200">
                <p class="text-sm text-gray-600">
                  <i class="fas fa-headset mr-2"></i>
                  Fragen? Kontaktieren Sie unseren Support: 
                  <a href="mailto:support@softwareking24.de" class="text-blue-600 hover:underline">
                    support@softwareking24.de
                  </a>
                </p>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div class="bg-white rounded-lg shadow p-6 text-center">
                <i class="fas fa-shield-alt text-4xl text-green-600 mb-3"></i>
                <h3 class="font-semibold mb-2">100% Sicher</h3>
                <p class="text-sm text-gray-600">SSL-verschlüsselte Übertragung</p>
              </div>
              <div class="bg-white rounded-lg shadow p-6 text-center">
                <i class="fas fa-certificate text-4xl text-blue-600 mb-3"></i>
                <h3 class="font-semibold mb-2">Original Lizenzen</h3>
                <p class="text-sm text-gray-600">Direkt vom Hersteller</p>
              </div>
              <div class="bg-white rounded-lg shadow p-6 text-center">
                <i class="fas fa-headphones text-4xl text-orange-600 mb-3"></i>
                <h3 class="font-semibold mb-2">24/7 Support</h3>
                <p class="text-sm text-gray-600">Wir sind für Sie da</p>
              </div>
            </div>
          </div>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white mt-16 py-8">
          <div class="container mx-auto px-4 text-center">
            <p>&copy; 2026 SoftwareKing24. Alle Rechte vorbehalten.</p>
          </div>
        </footer>

        <script>
          async function loadOrderDetails() {
            // Get order number from URL
            const urlParams = new URLSearchParams(window.location.search);
            const orderNumber = urlParams.get('order');

            if (!orderNumber) {
              document.getElementById('order-number').textContent = 'Nicht verfügbar';
              return;
            }

            // Display order number
            document.getElementById('order-number').textContent = orderNumber;

            try {
              // Fetch order details
              const response = await axios.get('/api/orders/' + orderNumber);
              
              if (response.data.success) {
                const order = response.data.data;
                displayOrderDetails(order);
              }
            } catch (error) {
              console.error('Error loading order details:', error);
            }
          }

          function displayOrderDetails(order) {
            const detailsEl = document.getElementById('order-details');
            
            if (!order) return;

            const total = order.total || 0;
            
            detailsEl.innerHTML = \`
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="font-semibold text-lg mb-4" style="color: var(--navy-dark);">
                  Ihre Bestellung
                </h3>
                <div class="space-y-2 text-sm">
                  \${order.items ? order.items.map(item => \`
                    <div class="flex justify-between">
                      <span>\${item.quantity}x \${item.product_name}</span>
                      <span class="font-semibold">€\${(item.price * item.quantity / 100).toFixed(2)}</span>
                    </div>
                  \`).join('') : ''}
                  <div class="pt-2 border-t flex justify-between font-bold">
                    <span>Gesamt:</span>
                    <span>€\${(total / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            \`;
          }

          // Load order details on page load
          window.addEventListener('DOMContentLoaded', loadOrderDetails);
        </script>
      </body>
    </html>
  `;
};
