// Homepage component for the eCommerce platform
import type { FC } from 'hono/jsx'
import { MegaMenu } from './mega-menu'

export const Homepage: FC = () => {
  return (
    <div>
      {/* Header */}
      <header class="bg-primary text-white">
        {/* Top Bar */}
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

        {/* Main Header */}
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            {/* Logo */}
            <div class="flex items-center">
              <div class="text-2xl font-bold">
                <span class="text-gold">PREMIUM</span>
                <span class="text-white"> SOFTWARE</span>
              </div>
            </div>

            {/* Search Bar */}
            <div class="flex-1 max-w-2xl mx-8">
              <div class="relative">
                <input 
                  type="search" 
                  placeholder="Search for Windows, Office, Antivirus, Games..."
                  class="w-full px-4 py-3 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold text-primary px-4 py-2 rounded-md">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>

            {/* Header Actions */}
            <div class="flex items-center space-x-6">
              {/* Language Switcher */}
              <div class="relative group">
                <button class="flex items-center space-x-2">
                  <i class="fas fa-globe"></i>
                  <span>EN</span>
                  <i class="fas fa-chevron-down text-xs"></i>
                </button>
                <div class="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-lg shadow-lg hidden group-hover:block">
                  <a href="/" class="block px-4 py-2 hover:bg-gray-100">English</a>
                  <a href="/de" class="block px-4 py-2 hover:bg-gray-100">Deutsch</a>
                </div>
              </div>

              {/* Account */}
              <a href="/account" class="flex items-center space-x-2 hover:text-gold transition">
                <i class="fas fa-user"></i>
                <span>Account</span>
              </a>

              {/* Cart */}
              <a href="/cart" class="flex items-center space-x-2 hover:text-gold transition relative">
                <i class="fas fa-shopping-cart text-xl"></i>
                <span class="absolute -top-2 -right-2 bg-gold text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  0
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Menu - Enhanced Mega Menu */}
        <MegaMenu />
      </header>

      {/* Hero Banner */}
      <section class="bg-gradient-to-r from-primary via-blue-900 to-primary py-16">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="text-white">
              <div class="inline-block bg-gold text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
                <i class="fas fa-bolt mr-2"></i>
                MEGA SALE - UP TO 80% OFF
              </div>
              <h1 class="text-5xl font-bold mb-4">
                Premium Software <br/>
                <span class="text-gold">Licenses</span>
              </h1>
              <p class="text-xl mb-6">
                ✓ Instant Digital Delivery<br/>
                ✓ Lifetime Support<br/>
                ✓ Best Prices Guaranteed
              </p>
              <button class="btn-gold px-8 py-4 rounded-lg text-lg">
                Shop Now <i class="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
            <div class="hidden md:block">
              <img src="https://via.placeholder.com/600x400/1a2a4e/d4af37?text=Software+Licenses" alt="Hero" class="rounded-lg shadow-2xl"/>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section class="py-8 bg-white border-b">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="trust-badge flex items-center justify-center p-4 rounded-lg">
              <i class="fas fa-lock text-3xl text-gold mr-3"></i>
              <div>
                <div class="font-bold">SSL Secure</div>
                <div class="text-sm text-gray-600">256-bit Encryption</div>
              </div>
            </div>
            <div class="trust-badge flex items-center justify-center p-4 rounded-lg">
              <i class="fas fa-certificate text-3xl text-gold mr-3"></i>
              <div>
                <div class="font-bold">EHI Certified</div>
                <div class="text-sm text-gray-600">Trusted Shop</div>
              </div>
            </div>
            <div class="trust-badge flex items-center justify-center p-4 rounded-lg">
              <i class="fas fa-bolt text-3xl text-gold mr-3"></i>
              <div>
                <div class="font-bold">Instant Delivery</div>
                <div class="text-sm text-gray-600">Within Minutes</div>
              </div>
            </div>
            <div class="trust-badge flex items-center justify-center p-4 rounded-lg">
              <i class="fas fa-headset text-3xl text-gold mr-3"></i>
              <div>
                <div class="font-bold">24/7 Support</div>
                <div class="text-sm text-gray-600">Expert Help</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container mx-auto px-4 py-12">
        <div class="grid md:grid-cols-12 gap-8">
          {/* Sidebar - Software Deals Menu */}
          <aside class="md:col-span-3">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-gradient-to-r from-primary to-blue-900 text-white px-4 py-3 font-bold">
                <i class="fas fa-fire mr-2"></i>
                SOFTWARE DEALS
              </div>
              <ul class="divide-y">
                <li><a href="/categories/windows" class="block px-4 py-3 hover:bg-gray-50 transition"><i class="fab fa-windows mr-2 text-primary"></i> Windows OS</a></li>
                <li><a href="/categories/office" class="block px-4 py-3 hover:bg-gray-50 transition"><i class="fas fa-file-word mr-2 text-primary"></i> Microsoft Office</a></li>
                <li><a href="/categories/server" class="block px-4 py-3 hover:bg-gray-50 transition"><i class="fas fa-server mr-2 text-primary"></i> Server Licenses</a></li>
                <li><a href="/categories/antivirus" class="block px-4 py-3 hover:bg-gray-50 transition"><i class="fas fa-shield-alt mr-2 text-primary"></i> Antivirus Software</a></li>
                <li><a href="/categories/games" class="block px-4 py-3 hover:bg-gray-50 transition"><i class="fas fa-gamepad mr-2 text-primary"></i> PC Games</a></li>
                <li><a href="/categories/design" class="block px-4 py-3 hover:bg-gray-50 transition"><i class="fas fa-palette mr-2 text-primary"></i> Design & Creative</a></li>
              </ul>
            </div>

            {/* Special Offer Banner */}
            <div class="mt-6 bg-gradient-to-br from-gold to-yellow-500 rounded-lg p-6 text-primary">
              <div class="text-xl font-bold mb-2">🎁 First Order?</div>
              <div class="text-sm mb-4">Get 10% OFF with code:</div>
              <div class="bg-white rounded px-4 py-2 font-mono font-bold text-center">
                WELCOME10
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main class="md:col-span-9">
            {/* Featured Products */}
            <section class="mb-12">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl font-bold text-primary">
                  <i class="fas fa-star text-gold mr-2"></i>
                  Featured Products
                </h2>
                <a href="/products/featured" class="text-gold hover:underline">View All →</a>
              </div>

              <div id="featured-products" class="grid md:grid-cols-3 gap-6">
                {/* Product cards will be loaded via JavaScript */}
                <div class="text-center py-12 col-span-3">
                  <i class="fas fa-spinner fa-spin text-4xl text-gold"></i>
                  <p class="mt-4 text-gray-600">Loading products...</p>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section class="bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-8 mb-12">
              <h2 class="text-2xl font-bold text-center mb-8 text-primary">How It Works</h2>
              <div class="grid md:grid-cols-4 gap-6">
                <div class="text-center">
                  <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 class="font-bold mb-2">Choose Software</h3>
                  <p class="text-sm text-gray-600">Browse and select your desired software license</p>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 class="font-bold mb-2">Secure Payment</h3>
                  <p class="text-sm text-gray-600">Pay securely via PayPal or Credit Card</p>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 class="font-bold mb-2">Instant Delivery</h3>
                  <p class="text-sm text-gray-600">Receive your license key via email instantly</p>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h3 class="font-bold mb-2">Activate & Enjoy</h3>
                  <p class="text-sm text-gray-600">Download and activate your software</p>
                </div>
              </div>
            </section>

            {/* Bestsellers */}
            <section class="mb-12">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl font-bold text-primary">
                  <i class="fas fa-fire text-gold mr-2"></i>
                  Bestsellers
                </h2>
                <a href="/products/bestsellers" class="text-gold hover:underline">View All →</a>
              </div>

              <div id="bestseller-products" class="grid md:grid-cols-3 gap-6">
                <div class="text-center py-12 col-span-3">
                  <i class="fas fa-spinner fa-spin text-4xl text-gold"></i>
                  <p class="mt-4 text-gray-600">Loading bestsellers...</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Partner Logos */}
      <section class="bg-white py-12 border-t border-b">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold text-center mb-8 text-primary">Trusted Partners</h2>
          <div class="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            <div class="flex items-center justify-center grayscale hover:grayscale-0 transition">
              <img src="https://via.placeholder.com/120x60/f3f4f6/1a2a4e?text=Microsoft" alt="Microsoft" class="max-w-full h-12"/>
            </div>
            <div class="flex items-center justify-center grayscale hover:grayscale-0 transition">
              <img src="https://via.placeholder.com/120x60/f3f4f6/1a2a4e?text=Adobe" alt="Adobe" class="max-w-full h-12"/>
            </div>
            <div class="flex items-center justify-center grayscale hover:grayscale-0 transition">
              <img src="https://via.placeholder.com/120x60/f3f4f6/1a2a4e?text=Kaspersky" alt="Kaspersky" class="max-w-full h-12"/>
            </div>
            <div class="flex items-center justify-center grayscale hover:grayscale-0 transition">
              <img src="https://via.placeholder.com/120x60/f3f4f6/1a2a4e?text=Norton" alt="Norton" class="max-w-full h-12"/>
            </div>
            <div class="flex items-center justify-center grayscale hover:grayscale-0 transition">
              <img src="https://via.placeholder.com/120x60/f3f4f6/1a2a4e?text=Google" alt="Google" class="max-w-full h-12"/>
            </div>
            <div class="flex items-center justify-center grayscale hover:grayscale-0 transition">
              <img src="https://via.placeholder.com/120x60/f3f4f6/1a2a4e?text=Oracle" alt="Oracle" class="max-w-full h-12"/>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-primary text-white pt-12 pb-6">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 class="text-xl font-bold mb-4 text-gold">About Us</h3>
              <p class="text-gray-300 text-sm">
                Your trusted source for genuine software licenses. We offer instant delivery, competitive prices, and lifetime support.
              </p>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-gold">Quick Links</h3>
              <ul class="space-y-2 text-sm">
                <li><a href="/about" class="hover:text-gold transition">About Us</a></li>
                <li><a href="/contact" class="hover:text-gold transition">Contact</a></li>
                <li><a href="/faq" class="hover:text-gold transition">FAQ</a></li>
                <li><a href="/delivery" class="hover:text-gold transition">Delivery Information</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-gold">Legal</h3>
              <ul class="space-y-2 text-sm">
                <li><a href="/terms" class="hover:text-gold transition">Terms & Conditions</a></li>
                <li><a href="/privacy" class="hover:text-gold transition">Privacy Policy</a></li>
                <li><a href="/imprint" class="hover:text-gold transition">Imprint</a></li>
                <li><a href="/right-of-withdrawal" class="hover:text-gold transition">Right of Withdrawal</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-gold">Payment Methods</h3>
              <div class="flex flex-wrap gap-3">
                <i class="fab fa-cc-visa text-3xl"></i>
                <i class="fab fa-cc-mastercard text-3xl"></i>
                <i class="fab fa-cc-paypal text-3xl"></i>
                <i class="fab fa-cc-amex text-3xl"></i>
              </div>
              <div class="mt-6">
                <h4 class="font-bold mb-2">Follow Us</h4>
                <div class="flex gap-3">
                  <a href="#" class="hover:text-gold transition"><i class="fab fa-facebook text-2xl"></i></a>
                  <a href="#" class="hover:text-gold transition"><i class="fab fa-twitter text-2xl"></i></a>
                  <a href="#" class="hover:text-gold transition"><i class="fab fa-instagram text-2xl"></i></a>
                  <a href="#" class="hover:text-gold transition"><i class="fab fa-linkedin text-2xl"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2024 Premium Software Store. All rights reserved. Made with ❤️ in Germany</p>
          </div>
        </div>
      </footer>

      {/* JavaScript for Dynamic Content */}
      <script dangerouslySetInnerHTML={{__html: `
        // Load featured products
        async function loadFeaturedProducts() {
          try {
            const response = await fetch('/api/products/featured?limit=6');
            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
              const container = document.getElementById('featured-products');
              container.innerHTML = data.data.map(product => createProductCard(product)).join('');
            }
          } catch (error) {
            console.error('Error loading featured products:', error);
          }
        }

        // Load bestseller products
        async function loadBestsellers() {
          try {
            const response = await fetch('/api/products/bestsellers?limit=3');
            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
              const container = document.getElementById('bestseller-products');
              container.innerHTML = data.data.map(product => createProductCard(product)).join('');
            }
          } catch (error) {
            console.error('Error loading bestsellers:', error);
          }
        }

        // Create product card HTML
        function createProductCard(product) {
          const discount = product.discount_percentage || 0;
          const price = product.discount_price || product.base_price;
          const originalPrice = product.base_price;
          
          return \`
            <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden gold-border">
              <div class="relative">
                <img src="\${product.image_url || 'https://via.placeholder.com/400x300/1a2a4e/d4af37?text='+encodeURIComponent(product.name)}" 
                     alt="\${product.name}" 
                     class="w-full h-48 object-cover"/>
                \${discount > 0 ? \`
                  <div class="discount-badge absolute top-2 right-2 px-3 py-1 rounded-full text-sm">
                    -\${discount}%
                  </div>
                \` : ''}
                <div class="absolute top-2 left-2 bg-gold text-primary px-2 py-1 rounded text-xs font-bold">
                  <i class="fas fa-bolt mr-1"></i> INSTANT
                </div>
              </div>
              <div class="p-4">
                <div class="text-sm text-gray-500 mb-2">\${product.category_name || 'Software'}</div>
                <h3 class="font-bold text-lg mb-2 h-12 overflow-hidden">\${product.name}</h3>
                <p class="text-sm text-gray-600 mb-4 h-10 overflow-hidden">\${product.short_description || ''}</p>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    \${discount > 0 ? \`<div class="text-sm text-gray-400 line-through">€\${originalPrice.toFixed(2)}</div>\` : ''}
                    <div class="text-2xl font-bold text-gold">€\${price.toFixed(2)}</div>
                    <div class="text-xs text-gray-500">incl. 19% VAT</div>
                  </div>
                </div>
                <a href="/products/\${product.slug}" class="btn-gold w-full block text-center px-4 py-3 rounded-lg">
                  View Details <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          \`;
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
          loadFeaturedProducts();
          loadBestsellers();
        });
      `}} />
    </div>
  )
}
