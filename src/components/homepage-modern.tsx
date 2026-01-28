export const HomepageNew = () => {
  return (
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SoftwareKing24 - Original Software zu fairen Preisen</title>
        <meta name="description" content="Kaufen Sie Original Microsoft Software zu unschlagbaren Preisen. Windows, Office, Server - Sofortiger Download und lebenslange Lizenz." />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      </head>
      <body class="bg-gray-50">
        {/* Header */}
        <header class="bg-white shadow-sm sticky top-0 z-50">
          <div class="container mx-auto px-4">
            {/* Top Bar */}
            <div class="border-b border-gray-200 py-2 text-sm">
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                  <span class="text-gray-600"><i class="fas fa-phone mr-2"></i>+49 123 456789</span>
                  <span class="text-gray-600"><i class="fas fa-envelope mr-2"></i>[email protected]</span>
                </div>
                <div class="flex items-center space-x-4">
                  <a href="/warenkorb" class="text-gray-600 hover:text-blue-600 transition">
                    <i class="fas fa-shopping-cart mr-1"></i>Warenkorb <span class="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs ml-1" id="cart-count">0</span>
                  </a>
                  <button class="text-gray-600 hover:text-blue-600">
                    <i class="fas fa-globe mr-1"></i>DE
                  </button>
                </div>
              </div>
            </div>

            {/* Main Navigation */}
            <div class="flex items-center justify-between py-4">
              <a href="/" class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  SK
                </div>
                <div>
                  <span class="text-2xl font-bold text-gray-800">SoftwareKing24</span>
                  <p class="text-xs text-gray-500">Original Software zu fairen Preisen</p>
                </div>
              </a>

              {/* Search Bar */}
              <div class="flex-1 max-w-2xl mx-8">
                <div class="relative">
                  <input 
                    type="text" 
                    id="global-search"
                    placeholder="Suchen Sie nach Windows, Office, Server..." 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
                    <i class="fas fa-search text-lg"></i>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div class="flex items-center space-x-4">
                <a href="/warenkorb" class="px-4 py-2 text-gray-700 hover:text-blue-600 transition">
                  <i class="fas fa-shopping-cart text-xl"></i>
                </a>
                <a href="/konto" class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                  <i class="fas fa-user mr-2"></i>Anmelden
                </a>
              </div>
            </div>

            {/* Category Navigation */}
            <nav class="border-t border-gray-200 py-3">
              <ul class="flex space-x-8 text-sm font-medium">
                <li><a href="/produkte" class="text-gray-700 hover:text-blue-600 transition flex items-center"><i class="fas fa-th mr-2"></i>Alle Produkte</a></li>
                <li><a href="/produkte?category=Microsoft Windows" class="text-gray-700 hover:text-blue-600 transition flex items-center"><i class="fab fa-windows mr-2"></i>Windows</a></li>
                <li><a href="/produkte?category=Microsoft Office" class="text-gray-700 hover:text-blue-600 transition flex items-center"><i class="fas fa-file-alt mr-2"></i>Office</a></li>
                <li><a href="/produkte?category=Microsoft Server" class="text-gray-700 hover:text-blue-600 transition flex items-center"><i class="fas fa-server mr-2"></i>Server</a></li>
                <li><a href="#deals" class="text-red-600 hover:text-red-700 transition flex items-center"><i class="fas fa-tag mr-2"></i>Angebote</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section class="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
          <div class="container mx-auto px-4">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h1 class="text-5xl font-bold mb-6 leading-tight">
                  Original Microsoft<br />
                  Software zu<br />
                  <span class="text-yellow-300">unschlagbaren Preisen</span>
                </h1>
                <p class="text-xl mb-8 text-blue-100">
                  Sofortiger Download • Lebenslange Lizenz • 100% Original
                </p>
                <div class="flex space-x-4">
                  <a href="/produkte" class="px-8 py-4 bg-yellow-400 text-gray-900 rounded-lg font-bold hover:bg-yellow-300 transition text-lg shadow-xl">
                    <i class="fas fa-shopping-bag mr-2"></i>Jetzt einkaufen
                  </a>
                  <a href="#featured" class="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition text-lg">
                    <i class="fas fa-star mr-2"></i>Top Angebote
                  </a>
                </div>
                
                {/* Trust Badges */}
                <div class="flex items-center space-x-8 mt-12">
                  <div class="flex items-center space-x-2">
                    <div class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i class="fas fa-shield-alt text-2xl"></i>
                    </div>
                    <div>
                      <p class="font-semibold">100% Sicher</p>
                      <p class="text-sm text-blue-200">SSL Verschlüsselt</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i class="fas fa-download text-2xl"></i>
                    </div>
                    <div>
                      <p class="font-semibold">Sofort-Download</p>
                      <p class="text-sm text-blue-200">Keine Wartezeit</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i class="fas fa-headset text-2xl"></i>
                    </div>
                    <div>
                      <p class="font-semibold">24/7 Support</p>
                      <p class="text-sm text-blue-200">Wir helfen Ihnen</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex-1 flex justify-center">
                <div class="relative">
                  <div class="w-96 h-96 bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                    <div class="flex flex-col space-y-4">
                      <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-4">
                        <i class="fab fa-windows text-4xl"></i>
                        <div>
                          <p class="font-semibold">Windows 11 Pro</p>
                          <p class="text-sm text-blue-200">ab 19,99 €</p>
                        </div>
                      </div>
                      <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-4">
                        <i class="fas fa-file-word text-4xl"></i>
                        <div>
                          <p class="font-semibold">Office 2024</p>
                          <p class="text-sm text-blue-200">ab 24,99 €</p>
                        </div>
                      </div>
                      <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-4">
                        <i class="fas fa-server text-4xl"></i>
                        <div>
                          <p class="font-semibold">Server 2022</p>
                          <p class="text-sm text-blue-200">ab 39,99 €</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-gray-800 mb-4">
                <i class="fas fa-star text-yellow-500 mr-3"></i>
                Top Angebote
              </h2>
              <p class="text-gray-600 text-lg">Die beliebtesten Produkte unserer Kunden</p>
            </div>

            <div id="featured-products" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Products will be loaded dynamically */}
            </div>

            <div class="text-center mt-10">
              <a href="/produkte" class="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                <i class="fas fa-arrow-right mr-2"></i>Alle Produkte ansehen
              </a>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section class="py-16 bg-gray-50">
          <div class="container mx-auto px-4">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-gray-800 mb-4">Kategorien</h2>
              <p class="text-gray-600 text-lg">Finden Sie die perfekte Software für Ihre Bedürfnisse</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="/produkte?category=Microsoft Windows" class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-8 text-center">
                <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition">
                  <i class="fab fa-windows text-4xl text-blue-600 group-hover:text-white"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Windows</h3>
                <p class="text-gray-600 mb-4">Betriebssysteme für Privat und Business</p>
                <span class="text-blue-600 font-semibold group-hover:text-blue-800">Jetzt entdecken →</span>
              </a>

              <a href="/produkte?category=Microsoft Office" class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-8 text-center">
                <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition">
                  <i class="fas fa-file-alt text-4xl text-orange-600 group-hover:text-white"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Office</h3>
                <p class="text-gray-600 mb-4">Produktivitätssoftware für jeden Einsatz</p>
                <span class="text-orange-600 font-semibold group-hover:text-orange-800">Jetzt entdecken →</span>
              </a>

              <a href="/produkte?category=Microsoft Server" class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-8 text-center">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition">
                  <i class="fas fa-server text-4xl text-green-600 group-hover:text-white"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Server</h3>
                <p class="text-gray-600 mb-4">Enterprise Lösungen für Unternehmen</p>
                <span class="text-green-600 font-semibold group-hover:text-green-800">Jetzt entdecken →</span>
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-lock text-3xl text-blue-600"></i>
                </div>
                <h3 class="font-bold text-lg mb-2">100% Original</h3>
                <p class="text-gray-600 text-sm">Alle Lizenzen sind echt und legal</p>
              </div>

              <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-bolt text-3xl text-green-600"></i>
                </div>
                <h3 class="font-bold text-lg mb-2">Sofortiger Download</h3>
                <p class="text-gray-600 text-sm">Lizenzkey per E-Mail in Minuten</p>
              </div>

              <div class="text-center">
                <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-shield-alt text-3xl text-yellow-600"></i>
                </div>
                <h3 class="font-bold text-lg mb-2">Sichere Zahlung</h3>
                <p class="text-gray-600 text-sm">SSL verschlüsselt mit PayPal & Stripe</p>
              </div>

              <div class="text-center">
                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-headset text-3xl text-purple-600"></i>
                </div>
                <h3 class="font-bold text-lg mb-2">24/7 Support</h3>
                <p class="text-gray-600 text-sm">Wir helfen Ihnen gerne weiter</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section class="py-16 bg-gray-50">
          <div class="container mx-auto px-4">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-gray-800 mb-4">Was unsere Kunden sagen</h2>
              <p class="text-gray-600 text-lg">Über 10.000 zufriedene Kunden</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center mb-4">
                  <div class="flex text-yellow-500">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
                <p class="text-gray-600 mb-4">"Schnelle Lieferung, originale Software und super Preis. Kann ich nur empfehlen!"</p>
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user text-blue-600"></i>
                  </div>
                  <div>
                    <p class="font-semibold">Michael S.</p>
                    <p class="text-sm text-gray-500">Verifizierter Käufer</p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center mb-4">
                  <div class="flex text-yellow-500">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
                <p class="text-gray-600 mb-4">"Top Service! Lizenz kam innerhalb von 5 Minuten. Alles funktioniert einwandfrei."</p>
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user text-blue-600"></i>
                  </div>
                  <div>
                    <p class="font-semibold">Anna M.</p>
                    <p class="text-sm text-gray-500">Verifizierter Käufer</p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center mb-4">
                  <div class="flex text-yellow-500">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
                <p class="text-gray-600 mb-4">"Beste Preise, schnelle Abwicklung. Werde wieder hier kaufen!"</p>
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user text-blue-600"></i>
                  </div>
                  <div>
                    <p class="font-semibold">Thomas K.</p>
                    <p class="text-sm text-gray-500">Verifizierter Käufer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold mb-4">Bereit für Original-Software?</h2>
            <p class="text-xl mb-8 text-blue-100">Starten Sie jetzt und sparen Sie bis zu 70%</p>
            <a href="/produkte" class="inline-block px-10 py-4 bg-yellow-400 text-gray-900 rounded-lg font-bold hover:bg-yellow-300 transition text-lg shadow-xl">
              <i class="fas fa-shopping-bag mr-2"></i>Jetzt einkaufen
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer class="bg-gray-900 text-white py-12">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div class="flex items-center space-x-3 mb-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold">
                    SK
                  </div>
                  <span class="text-xl font-bold">SoftwareKing24</span>
                </div>
                <p class="text-gray-400 text-sm">
                  Ihre vertrauenswürdige Quelle für Original-Software zu fairen Preisen.
                </p>
              </div>

              <div>
                <h4 class="font-bold mb-4">Schnelllinks</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                  <li><a href="/produkte" class="hover:text-white transition">Alle Produkte</a></li>
                  <li><a href="#" class="hover:text-white transition">Über uns</a></li>
                  <li><a href="#" class="hover:text-white transition">Kontakt</a></li>
                  <li><a href="#" class="hover:text-white transition">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold mb-4">Rechtliches</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                  <li><a href="#" class="hover:text-white transition">AGB</a></li>
                  <li><a href="#" class="hover:text-white transition">Datenschutz</a></li>
                  <li><a href="#" class="hover:text-white transition">Impressum</a></li>
                  <li><a href="#" class="hover:text-white transition">Widerruf</a></li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold mb-4">Zahlungsarten</h4>
                <div class="flex space-x-3 text-3xl text-gray-400 mb-4">
                  <i class="fab fa-cc-paypal"></i>
                  <i class="fab fa-cc-visa"></i>
                  <i class="fab fa-cc-mastercard"></i>
                </div>
                <h4 class="font-bold mb-2 mt-6">Kontakt</h4>
                <p class="text-sm text-gray-400">
                  <i class="fas fa-envelope mr-2"></i>[email protected]<br />
                  <i class="fas fa-phone mr-2"></i>+49 123 456789
                </p>
              </div>
            </div>

            <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2026 SoftwareKing24. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>

        {/* JavaScript */}
        <script dangerouslySetInnerHTML={{__html: `
          // Format price
          function formatPrice(cents) {
            return (cents / 100).toFixed(2).replace('.', ',') + ' €';
          }

          // Load featured products
          async function loadFeaturedProducts() {
            try {
              const response = await axios.get('/api/products/featured');
              const products = response.data.data;

              const container = document.getElementById('featured-products');
              container.innerHTML = products.slice(0, 8).map(product => {
                const price = formatPrice(product.price);
                const salePrice = product.sale_price ? formatPrice(product.sale_price) : null;
                const savings = salePrice ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;

                return \`
                  <div class="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                    <div class="relative">
                      <div class="aspect-square bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-6">
                        <i class="fas fa-box text-5xl text-gray-300 group-hover:text-blue-400 transition"></i>
                      </div>
                      \${savings > 0 ? \`
                        <div class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -\${savings}%
                        </div>
                      \` : ''}
                    </div>
                    
                    <div class="p-4">
                      <span class="text-xs text-gray-500 font-medium">\${product.category}</span>
                      <h3 class="font-semibold text-gray-800 mt-1 mb-2 text-sm line-clamp-2 group-hover:text-blue-600 transition">
                        \${product.name}
                      </h3>
                      
                      <div class="mb-3">
                        \${salePrice ? \`
                          <div class="flex items-center space-x-2">
                            <span class="text-xl font-bold text-red-600">\${salePrice}</span>
                            <span class="text-xs text-gray-400 line-through">\${price}</span>
                          </div>
                        \` : \`
                          <span class="text-xl font-bold text-gray-800">\${price}</span>
                        \`}
                      </div>

                      <button 
                        onclick="addToCart(\${product.id})" 
                        class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                      >
                        <i class="fas fa-cart-plus mr-1"></i>In den Warenkorb
                      </button>
                    </div>
                  </div>
                \`;
              }).join('');
            } catch (error) {
              console.error('Error loading featured products:', error);
            }
          }

          // Add to cart
          async function addToCart(productId) {
            try {
              const response = await axios.post('/api/cart/add', {
                productId,
                quantity: 1,
                licenseType: 'single'
              });

              if (response.data.success) {
                alert('Produkt wurde zum Warenkorb hinzugefügt!');
                // Update cart count
                const countEl = document.getElementById('cart-count');
                if (countEl) {
                  countEl.textContent = parseInt(countEl.textContent) + 1;
                }
              }
            } catch (error) {
              console.error('Error adding to cart:', error);
              alert('Fehler beim Hinzufügen zum Warenkorb');
            }
          }

          // Search
          document.getElementById('global-search').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
              const query = e.target.value;
              window.location.href = '/produkte?search=' + encodeURIComponent(query);
            }
          });

          // Load on page load
          loadFeaturedProducts();
        `}} />
      </body>
    </html>
  );
};
