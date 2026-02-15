// Enhanced Navigation Header with Mega Menu, Search, and Shopping Features
import type { FC } from 'hono/jsx'
import { LanguageSwitcher } from './language-switcher'

interface NavigationHeaderProps {
  currentLang?: 'de' | 'en'
  currentPath?: string
}

export const NavigationHeader: FC<NavigationHeaderProps> = ({ 
  currentLang = 'de',
  currentPath = '/'
}) => {
  return (
    <header class="site-header">
      {/* Top Bar */}
      <div class="bg-gray-900 text-white">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between py-2 text-sm">
            <div class="flex items-center gap-6">
              <a href={currentLang === 'de' ? '/kontakt' : '/en/contact'} class="hover:text-blue-400 transition-colors">
                <i class="fas fa-envelope mr-2"></i>
                {currentLang === 'de' ? 'Kontakt' : 'Contact'}
              </a>
              <a href={currentLang === 'de' ? '/faq' : '/en/faq'} class="hover:text-blue-400 transition-colors">
                <i class="fas fa-question-circle mr-2"></i>
                {currentLang === 'de' ? 'Hilfe' : 'Help'}
              </a>
              <span class="text-gray-400">
                <i class="fas fa-phone mr-2"></i>
                +49 (0) 123 456789
              </span>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-gray-400">
                <i class="fas fa-truck mr-2"></i>
                {currentLang === 'de' ? 'Kostenloser Download' : 'Free Download'}
              </span>
              <LanguageSwitcher currentLang={currentLang} currentPath={currentPath} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div class="bg-white border-b border-gray-200">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between py-4">
            
            {/* Logo */}
            <a href={currentLang === 'de' ? '/' : '/en'} class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <i class="fas fa-shopping-bag text-white text-xl"></i>
              </div>
              <div>
                <div class="text-xl font-bold text-gray-900">Premium Software</div>
                <div class="text-xs text-gray-500">{currentLang === 'de' ? 'Ihr Software-Shop' : 'Your Software Store'}</div>
              </div>
            </a>

            {/* Search Bar */}
            <div class="flex-1 max-w-2xl mx-8">
              <div class="relative">
                <input 
                  type="search" 
                  id="main-search"
                  placeholder={currentLang === 'de' ? 'Produkte durchsuchen...' : 'Search products...'}
                  class="w-full px-6 py-3 pl-12 pr-32 border-2 border-gray-300 rounded-full focus:border-blue-600 focus:outline-none transition-colors"
                />
                <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-semibold">
                  {currentLang === 'de' ? 'Suchen' : 'Search'}
                </button>
              </div>
              
              {/* Search Suggestions Dropdown */}
              <div id="search-suggestions" class="hidden absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 z-50 max-h-96 overflow-y-auto">
                {/* Suggestions will be loaded dynamically */}
              </div>
            </div>

            {/* Right Actions */}
            <div class="flex items-center gap-4">
              {/* Account */}
              <a href={currentLang === 'de' ? '/konto' : '/en/account'} class="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <i class="fas fa-user text-xl"></i>
                <div class="text-sm hidden lg:block">
                  <div class="font-medium">{currentLang === 'de' ? 'Mein Konto' : 'My Account'}</div>
                  <div class="text-xs text-gray-500">{currentLang === 'de' ? 'Anmelden' : 'Sign In'}</div>
                </div>
              </a>

              {/* Wishlist */}
              <a href={currentLang === 'de' ? '/wunschliste' : '/en/wishlist'} class="relative text-gray-700 hover:text-blue-600 transition-colors">
                <i class="far fa-heart text-2xl"></i>
                <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold" id="wishlist-count">0</span>
              </a>

              {/* Cart */}
              <a href={currentLang === 'de' ? '/warenkorb' : '/en/cart'} class="relative flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
                <i class="fas fa-shopping-cart text-xl"></i>
                <div class="text-sm hidden lg:block">
                  <div class="font-semibold" id="cart-total">€0,00</div>
                  <div class="text-xs opacity-90"><span id="cart-count">0</span> {currentLang === 'de' ? 'Artikel' : 'Items'}</div>
                </div>
                <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-semibold" id="cart-badge">0</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav class="bg-gray-50 border-b border-gray-200">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between">
            
            {/* Main Menu */}
            <ul class="flex items-center">
              {/* Categories Mega Menu */}
              <li class="group relative">
                <button class="flex items-center gap-2 px-6 py-4 font-semibold text-gray-700 hover:text-blue-600 hover:bg-white transition-colors">
                  <i class="fas fa-bars"></i>
                  {currentLang === 'de' ? 'Kategorien' : 'Categories'}
                  <i class="fas fa-chevron-down text-xs"></i>
                </button>
                
                {/* Mega Menu Dropdown */}
                <div class="mega-menu absolute top-full left-0 w-screen max-w-6xl bg-white border border-gray-200 rounded-b-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div class="grid grid-cols-4 gap-6 p-8">
                    
                    {/* Category 1: Office Software */}
                    <div>
                      <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fas fa-briefcase text-blue-600"></i>
                        {currentLang === 'de' ? 'Office Software' : 'Office Software'}
                      </h3>
                      <ul class="space-y-2 text-sm">
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Microsoft Office</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">LibreOffice</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">WPS Office</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Adobe Acrobat</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors font-semibold text-blue-600">
                          {currentLang === 'de' ? 'Alle anzeigen' : 'View All'} →
                        </a></li>
                      </ul>
                    </div>

                    {/* Category 2: Creative Software */}
                    <div>
                      <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fas fa-palette text-purple-600"></i>
                        {currentLang === 'de' ? 'Kreativ-Software' : 'Creative Software'}
                      </h3>
                      <ul class="space-y-2 text-sm">
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Adobe Creative Cloud</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">CorelDRAW</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Affinity Suite</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Canva Pro</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors font-semibold text-blue-600">
                          {currentLang === 'de' ? 'Alle anzeigen' : 'View All'} →
                        </a></li>
                      </ul>
                    </div>

                    {/* Category 3: Operating Systems */}
                    <div>
                      <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fas fa-desktop text-green-600"></i>
                        {currentLang === 'de' ? 'Betriebssysteme' : 'Operating Systems'}
                      </h3>
                      <ul class="space-y-2 text-sm">
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Windows 11 Pro</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Windows 10 Pro</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Windows Server</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">macOS</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors font-semibold text-blue-600">
                          {currentLang === 'de' ? 'Alle anzeigen' : 'View All'} →
                        </a></li>
                      </ul>
                    </div>

                    {/* Category 4: Security Software */}
                    <div>
                      <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fas fa-shield-alt text-red-600"></i>
                        {currentLang === 'de' ? 'Sicherheit' : 'Security'}
                      </h3>
                      <ul class="space-y-2 text-sm">
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Antivirus Software</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">VPN Services</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Password Manager</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Backup Solutions</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors font-semibold text-blue-600">
                          {currentLang === 'de' ? 'Alle anzeigen' : 'View All'} →
                        </a></li>
                      </ul>
                    </div>
                  </div>

                  {/* Featured Banner */}
                  <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-b-lg">
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="text-lg font-bold mb-1">{currentLang === 'de' ? '🎉 Sonderangebote' : '🎉 Special Offers'}</h4>
                        <p class="text-sm opacity-90">{currentLang === 'de' ? 'Bis zu 80% Rabatt auf ausgewählte Produkte' : 'Up to 80% off on selected products'}</p>
                      </div>
                      <a href={currentLang === 'de' ? '/angebote' : '/en/deals'} class="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                        {currentLang === 'de' ? 'Jetzt sparen' : 'Save Now'}
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              {/* Other Menu Items */}
              <li>
                <a href={currentLang === 'de' ? '/angebote' : '/en/deals'} class="block px-6 py-4 font-semibold text-gray-700 hover:text-blue-600 hover:bg-white transition-colors">
                  <i class="fas fa-tag mr-2"></i>
                  {currentLang === 'de' ? 'Angebote' : 'Deals'}
                </a>
              </li>
              
              <li>
                <a href={currentLang === 'de' ? '/marken' : '/en/brands'} class="block px-6 py-4 font-semibold text-gray-700 hover:text-blue-600 hover:bg-white transition-colors">
                  <i class="fas fa-star mr-2"></i>
                  {currentLang === 'de' ? 'Marken' : 'Brands'}
                </a>
              </li>
              
              <li>
                <a href={currentLang === 'de' ? '/neuheiten' : '/en/new'} class="block px-6 py-4 font-semibold text-gray-700 hover:text-blue-600 hover:bg-white transition-colors">
                  <i class="fas fa-sparkles mr-2"></i>
                  {currentLang === 'de' ? 'Neuheiten' : 'New'} <span class="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">NEU</span>
                </a>
              </li>
            </ul>

            {/* Right Side Quick Links */}
            <div class="flex items-center gap-4 text-sm">
              <a href={currentLang === 'de' ? '/vergleichen' : '/en/compare'} class="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                <i class="fas fa-balance-scale"></i>
                {currentLang === 'de' ? 'Vergleichen' : 'Compare'}
                <span class="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold" id="compare-count">0</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button (Hidden on Desktop) */}
      <button id="mobile-menu-btn" class="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-blue-700 transition-colors">
        <i class="fas fa-bars text-xl"></i>
      </button>

      {/* Mobile Menu Overlay */}
      <div id="mobile-menu" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
        <div class="fixed inset-y-0 right-0 w-80 bg-white shadow-xl overflow-y-auto">
          {/* Mobile Menu Header */}
          <div class="bg-blue-600 text-white p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold">{currentLang === 'de' ? 'Menü' : 'Menu'}</h2>
              <button id="mobile-menu-close" class="text-white hover:text-gray-200">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <i class="fas fa-user"></i>
              </div>
              <div>
                <p class="font-semibold">{currentLang === 'de' ? 'Gast' : 'Guest'}</p>
                <a href={currentLang === 'de' ? '/anmelden' : '/en/login'} class="text-sm opacity-90">
                  {currentLang === 'de' ? 'Anmelden' : 'Sign In'} →
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Content */}
          <div class="p-6">
            {/* Search */}
            <div class="mb-6">
              <input 
                type="search" 
                placeholder={currentLang === 'de' ? 'Suchen...' : 'Search...'}
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Categories */}
            <div class="space-y-2">
              <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span class="flex items-center gap-3">
                  <i class="fas fa-briefcase text-blue-600 w-5"></i>
                  <span class="font-medium">Office Software</span>
                </span>
                <i class="fas fa-chevron-right text-gray-400"></i>
              </a>
              
              <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span class="flex items-center gap-3">
                  <i class="fas fa-palette text-purple-600 w-5"></i>
                  <span class="font-medium">{currentLang === 'de' ? 'Kreativ-Software' : 'Creative Software'}</span>
                </span>
                <i class="fas fa-chevron-right text-gray-400"></i>
              </a>
              
              <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span class="flex items-center gap-3">
                  <i class="fas fa-desktop text-green-600 w-5"></i>
                  <span class="font-medium">{currentLang === 'de' ? 'Betriebssysteme' : 'Operating Systems'}</span>
                </span>
                <i class="fas fa-chevron-right text-gray-400"></i>
              </a>
              
              <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span class="flex items-center gap-3">
                  <i class="fas fa-shield-alt text-red-600 w-5"></i>
                  <span class="font-medium">{currentLang === 'de' ? 'Sicherheit' : 'Security'}</span>
                </span>
                <i class="fas fa-chevron-right text-gray-400"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Header JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        // Initialize header functionality
        function initHeader() {
          updateCartBadge();
          setupSearch();
          setupMobileMenu();
        }

        // Update cart badge
        function updateCartBadge() {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          const count = cart.reduce((sum, item) => sum + item.quantity, 0);
          const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          
          document.getElementById('cart-count').textContent = count;
          document.getElementById('cart-badge').textContent = count;
          document.getElementById('cart-total').textContent = '€' + total.toFixed(2).replace('.', ',');
        }

        // Setup search functionality
        function setupSearch() {
          const searchInput = document.getElementById('main-search');
          const suggestions = document.getElementById('search-suggestions');
          
          searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            if (query.length >= 2) {
              // Show suggestions
              suggestions.classList.remove('hidden');
              // In production: fetch suggestions from API
              loadSearchSuggestions(query);
            } else {
              suggestions.classList.add('hidden');
            }
          });
          
          // Close suggestions when clicking outside
          document.addEventListener('click', (e) => {
            if (!e.target.closest('#main-search') && !e.target.closest('#search-suggestions')) {
              suggestions.classList.add('hidden');
            }
          });
        }

        // Load search suggestions (demo)
        function loadSearchSuggestions(query) {
          const suggestions = document.getElementById('search-suggestions');
          
          // Demo suggestions
          const demoProducts = [
            { name: 'Microsoft Office 2024', category: 'Office Software', price: 89.99 },
            { name: 'Adobe Creative Cloud', category: 'Creative Software', price: 149.99 },
            { name: 'Windows 11 Pro', category: 'Operating System', price: 59.99 }
          ];
          
          suggestions.innerHTML = \`
            <div class="p-4">
              <p class="text-xs text-gray-500 uppercase font-semibold mb-3">Suchergebnisse für "\${query}"</p>
              <div class="space-y-2">
                \${demoProducts.map(product => \`
                  <a href="/produkt/1" class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div class="w-12 h-12 bg-gray-200 rounded"></div>
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">\${product.name}</p>
                      <p class="text-xs text-gray-500">\${product.category}</p>
                    </div>
                    <p class="font-bold text-blue-600">€\${product.price.toFixed(2).replace('.', ',')}</p>
                  </a>
                \`).join('')}
              </div>
              <a href="/suche?q=\${query}" class="block mt-3 text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                Alle Ergebnisse anzeigen →
              </a>
            </div>
          \`;
        }

        // Setup mobile menu
        function setupMobileMenu() {
          const menuBtn = document.getElementById('mobile-menu-btn');
          const menu = document.getElementById('mobile-menu');
          const closeBtn = document.getElementById('mobile-menu-close');
          
          if (menuBtn && menu && closeBtn) {
            menuBtn.addEventListener('click', () => {
              menu.classList.remove('hidden');
              document.body.style.overflow = 'hidden';
            });
            
            closeBtn.addEventListener('click', () => {
              menu.classList.add('hidden');
              document.body.style.overflow = '';
            });
            
            // Close on overlay click
            menu.addEventListener('click', (e) => {
              if (e.target === menu) {
                menu.classList.add('hidden');
                document.body.style.overflow = '';
              }
            });
          }
        }

        // Initialize on page load
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initHeader);
        } else {
          initHeader();
        }
      `}} />

      <style dangerouslySetInnerHTML={{__html: `
        .mega-menu {
          transform: translateY(-10px);
        }
        
        .group:hover .mega-menu {
          transform: translateY(0);
        }
        
        @media (max-width: 1024px) {
          .mega-menu {
            display: none !important;
          }
        }
      `}} />
    </header>
  )
}
