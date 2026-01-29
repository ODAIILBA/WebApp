export const ProductsPageModern = () => {
  return (
    <html lang="de">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Produkte - SOFTWAREKING24 | Original Software günstig kaufen</title>
        <meta name="description" content="Durchsuchen Sie unser komplettes Sortiment an Original-Software. Windows, Office, Antivirus und mehr zu unschlagbaren Preisen." />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
        <link href="/static/search-autocomplete.css" rel="stylesheet" />
        <script src="/static/search-autocomplete.js" defer></script>
        <link href="/static/filters-enhanced.css" rel="stylesheet" />
        <script src="/static/filters-enhanced.js" defer></script>
        <style>
          {`
          :root {
            --navy-dark: #1a2a4e;
            --navy-medium: #2d3e6f;
            --navy-light: #435991;
            --gold: #d4af37;
            --gold-light: #e8c966;
            --gold-dark: #b8941f;
          }

          /* Glassmorphism */
          .glass {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          /* Product card animations */
          .product-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .product-card:hover {
            transform: translateY(-8px);
          }

          .product-card .product-image {
            transition: transform 0.5s ease;
          }

          .product-card:hover .product-image {
            transform: scale(1.1);
          }

          /* Skeleton loading */
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s ease-in-out infinite;
          }

          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          /* Range slider */
          input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: linear-gradient(to right, var(--gold) 0%, var(--gold) 50%, #ddd 50%, #ddd 100%);
            outline: none;
          }

          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--gold);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }

          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--gold);
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }

          /* Filter pill */
          .filter-pill {
            animation: slideIn 0.3s ease-out;
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Scroll animations */
          .scroll-fade {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }

          .scroll-fade.visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* View toggle */
          .view-btn.active {
            background: var(--navy-dark);
            color: white;
          }
          `}
        </style>
      </head>
      <body className="bg-gray-50">
        {/* Flash Sale Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 text-center text-sm font-semibold animate-pulse">
          <i className="fas fa-bolt mr-2"></i>
          FLASH SALE: Bis zu 70% Rabatt auf ausgewählte Produkte!
          <i className="fas fa-bolt ml-2"></i>
        </div>

        {/* Top Info Bar */}
        <div className="bg-navy-dark text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span><i className="fas fa-phone mr-2"></i>+49 123 456789</span>
              <span><i className="fas fa-envelope mr-2"></i>[email protected]</span>
              <span><i className="far fa-clock mr-2"></i>Mo-Fr: 9-18 Uhr</span>
            </div>
            <div className="flex items-center space-x-4">
              <span><i className="fas fa-download mr-2"></i>Sofort-Download</span>
              <span><i className="fas fa-shield-alt mr-2"></i>100% Legal</span>
              <span><i className="fas fa-undo mr-2"></i>14 Tage Rückgabe</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <a href="/" className="flex items-center">
                <img src="/static/logo.png" alt="SOFTWAREKING24" className="h-16" onError={(e) => {
                  e.currentTarget.outerHTML = '<div class="w-12 h-12 bg-gradient-to-br from-navy-dark to-navy-light rounded-lg flex items-center justify-center text-white font-bold text-xl">SK</div>';
                }} />
              </a>

              {/* Navigation */}
              <nav className="hidden lg:flex items-center space-x-6">
                <a href="/" className="text-gray-700 hover:text-gold transition font-medium">
                  <i className="fas fa-home mr-2"></i>Home
                </a>
                <a href="/produkte" className="text-gold font-bold">
                  <i className="fas fa-box-open mr-2"></i>Produkte
                </a>
                <a href="/kontakt" className="text-gray-700 hover:text-gold transition font-medium">
                  <i className="fas fa-envelope mr-2"></i>Kontakt
                </a>
              </nav>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative search-container">
                  <input
                    type="text"
                    id="search-input"
                    placeholder="Suchen Sie nach Windows, Office, Antivirus..."
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gold transition-all"
                    autoComplete="off"
                  />
                  <button onClick={(e) => {
                    const input = document.getElementById('search-input') as HTMLInputElement;
                    if (input && input.value.trim().length >= 2) {
                      window.location.href = `/produkte?search=${encodeURIComponent(input.value)}`;
                    }
                  }} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold text-white px-6 py-2 rounded-full hover:bg-gold-dark transition">
                    <i className="fas fa-search"></i>
                  </button>
                  {/* Autocomplete Dropdown */}
                  <div id="search-dropdown" className="autocomplete-dropdown"></div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-6">
                <a href="/login" className="text-navy-dark hover:text-gold transition">
                  <i className="fas fa-user mr-2"></i>Anmelden
                </a>
                <a href="/warenkorb" className="relative">
                  <button className="bg-gold text-white px-4 py-2 rounded-full hover:bg-gold-dark transition">
                    <i className="fas fa-shopping-cart mr-2"></i>Warenkorb
                    <span id="cart-badge" className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" data-cart-count="0">0</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3">
          <div className="container mx-auto px-6">
            <div className="flex items-center text-sm text-gray-600">
              <a href="/" className="hover:text-gold"><i className="fas fa-home mr-2"></i>Home</a>
              <i className="fas fa-chevron-right mx-3 text-xs"></i>
              <span className="text-navy-dark font-semibold">Produkte</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="w-80 flex-shrink-0 filters-sidebar">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-navy-dark">
                    <i className="fas fa-filter mr-2"></i>Filter
                  </h2>
                  <button id="reset-filters" className="text-sm text-gold hover:text-gold-dark transition">
                    <i className="fas fa-redo mr-1"></i>Zurücksetzen
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-navy-dark flex items-center">
                    <i className="fas fa-th-large mr-2 text-gold"></i>
                    Kategorien
                  </h3>
                  <div id="category-filters" className="space-y-2">
                    {/* Dynamically loaded */}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-navy-dark flex items-center">
                    <i className="fas fa-euro-sign mr-2 text-gold"></i>
                    Preisbereich
                  </h3>
                  <div className="space-y-3">
                    <input type="range" id="price-range" min="0" max="200" step="10" value="200" className="w-full" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0 €</span>
                      <span id="price-value" className="font-semibold text-navy-dark">200 €</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-navy-dark flex items-center">
                    <i className="fas fa-tag mr-2 text-gold"></i>
                    Marken
                  </h3>
                  <div id="brand-filters" className="space-y-2">
                    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                      <input type="checkbox" name="brand" value="Microsoft" className="mr-2 accent-gold" />
                      <span className="text-sm">Microsoft</span>
                    </label>
                    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                      <input type="checkbox" name="brand" value="Adobe" className="mr-2 accent-gold" />
                      <span className="text-sm">Adobe</span>
                    </label>
                    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                      <input type="checkbox" name="brand" value="Kaspersky" className="mr-2 accent-gold" />
                      <span className="text-sm">Kaspersky</span>
                    </label>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-navy-dark flex items-center">
                    <i className="fas fa-star mr-2 text-gold"></i>
                    Features
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                      <input type="checkbox" name="feature" value="featured" className="mr-2 accent-gold" />
                      <span className="text-sm">Featured</span>
                    </label>
                    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                      <input type="checkbox" name="feature" value="bestseller" className="mr-2 accent-gold" />
                      <span className="text-sm">Bestseller</span>
                    </label>
                    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                      <input type="checkbox" name="feature" value="new" className="mr-2 accent-gold" />
                      <span className="text-sm">Neu</span>
                    </label>
                  </div>
                </div>

                {/* Apply Button */}
                <button id="apply-filters" className="w-full bg-navy-dark text-white py-3 rounded-lg hover:bg-navy-medium transition font-semibold">
                  <i className="fas fa-check mr-2"></i>Filter anwenden
                </button>
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1 products-main-content">
              {/* Active Filters */}
              <div id="active-filters" className="mb-6 flex flex-wrap gap-2">
                {/* Dynamically added filter pills */}
              </div>

              {/* Toolbar */}
              <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
                <div className="products-toolbar flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 font-semibold" id="result-count">
                      <i className="fas fa-box-open mr-2"></i>Lädt Produkte...
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Sort */}
                    <select id="sort-filter" className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition hover:border-gold">
                      <option value="newest">Neueste</option>
                      <option value="bestseller">Bestseller</option>
                      <option value="rating">Beste Bewertung</option>
                      <option value="popular">Beliebteste</option>
                      <option value="name">Name (A-Z)</option>
                      <option value="price-asc">Preis aufsteigend</option>
                      <option value="price-desc">Preis absteigend</option>
                    </select>

                    {/* View Toggle */}
                    <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                      <button id="view-grid" className="view-btn active px-4 py-2 transition">
                        <i className="fas fa-th"></i>
                      </button>
                      <button id="view-list" className="view-btn px-4 py-2 transition">
                        <i className="fas fa-list"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div id="products-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Skeleton loaders */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="skeleton h-64 w-full"></div>
                    <div className="p-5 space-y-3">
                      <div className="skeleton h-4 w-1/3"></div>
                      <div className="skeleton h-6 w-full"></div>
                      <div className="skeleton h-8 w-1/2"></div>
                      <div className="skeleton h-10 w-full"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div id="pagination" className="flex justify-center space-x-2">
                {/* Generated dynamically */}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-navy-dark text-white mt-16 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="mb-4">
                  <img src="/static/logo-footer.png" alt="KING24" className="h-12" />
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Ihre vertrauenswürdige Quelle für Original-Software zu fairen Preisen.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-gold transition">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-gold transition">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-gold transition">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-gold">Produktkategorien</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/produkte?category=Windows" className="hover:text-white transition"><i className="fab fa-windows mr-2"></i>Windows</a></li>
                  <li><a href="/produkte?category=Office" className="hover:text-white transition"><i className="fas fa-file-word mr-2"></i>Microsoft Office</a></li>
                  <li><a href="/produkte?category=Antivirus" className="hover:text-white transition"><i className="fas fa-shield-virus mr-2"></i>Antivirus</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-gold">Kundenservice</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Kontakt</a></li>
                  <li><a href="#" className="hover:text-white transition">Hilfe & FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition">Versandinformationen</a></li>
                  <li><a href="#" className="hover:text-white transition">Rückgaberecht</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-gold">Rechtliches</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">AGB</a></li>
                  <li><a href="#" className="hover:text-white transition">Datenschutz</a></li>
                  <li><a href="#" className="hover:text-white transition">Impressum</a></li>
                  <li><a href="#" className="hover:text-white transition">Widerrufsrecht</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 flex justify-between items-center">
              <p className="text-sm text-gray-400">© 2026 SOFTWAREKING24.de - Alle Rechte vorbehalten</p>
              <div className="flex space-x-4">
                <img src="https://placehold.co/60x40/1a2a4e/FFF?text=PayPal" alt="PayPal" className="h-8 opacity-70 hover:opacity-100 transition" />
                <img src="https://placehold.co/60x40/1a2a4e/FFF?text=Visa" alt="Visa" className="h-8 opacity-70 hover:opacity-100 transition" />
                <img src="https://placehold.co/60x40/1a2a4e/FFF?text=MC" alt="Mastercard" className="h-8 opacity-70 hover:opacity-100 transition" />
              </div>
            </div>
          </div>
        </footer>

        {/* JavaScript */}
        <script dangerouslySetInnerHTML={{__html: `
          // State
          let state = {
            page: 1,
            category: 'all',
            sort: 'name',
            search: '',
            priceMax: 200,
            brands: [],
            features: [],
            viewMode: 'grid'
          };

          // Format price
          function formatPrice(cents) {
            return (cents / 100).toFixed(2).replace('.', ',') + ' €';
          }

          // Add filter pill
          function addFilterPill(label, value, type) {
            const container = document.getElementById('active-filters');
            const pill = document.createElement('div');
            pill.className = 'filter-pill flex items-center bg-gold text-white px-4 py-2 rounded-full text-sm font-semibold';
            pill.innerHTML = \`
              \${label}
              <button onclick="removeFilter('\${type}', '\${value}')" class="ml-2 hover:text-navy-dark transition">
                <i class="fas fa-times"></i>
              </button>
            \`;
            container.appendChild(pill);
          }

          // Remove filter pill
          function removeFilter(type, value) {
            if (type === 'category') {
              state.category = 'all';
              document.querySelector('input[name="category"][value="all"]').checked = true;
            } else if (type === 'brand') {
              state.brands = state.brands.filter(b => b !== value);
              document.querySelector(\`input[name="brand"][value="\${value}"]\`).checked = false;
            } else if (type === 'feature') {
              state.features = state.features.filter(f => f !== value);
              document.querySelector(\`input[name="feature"][value="\${value}"]\`).checked = false;
            } else if (type === 'price') {
              state.priceMax = 200;
              document.getElementById('price-range').value = 200;
              document.getElementById('price-value').textContent = '200 €';
            }
            loadProducts();
          }

          // Load products
          async function loadProducts(filterParams = {}) {
            try {
              const container = document.getElementById('products-container');
              
              // Show skeleton
              container.innerHTML = Array(6).fill().map(() => \`
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div class="skeleton h-64 w-full"></div>
                  <div class="p-5 space-y-3">
                    <div class="skeleton h-4 w-1/3"></div>
                    <div class="skeleton h-6 w-full"></div>
                    <div class="skeleton h-8 w-1/2"></div>
                    <div class="skeleton h-10 w-full"></div>
                  </div>
                </div>
              \`).join('');

              const params = new URLSearchParams({
                page: state.page,
                limit: 12,
                sort: state.sort
              });

              if (state.category && state.category !== 'all') params.append('category', state.category);
              if (state.search) params.append('search', state.search);
              
              // Add filter params from FilterManager
              if (filterParams.brand) params.append('brand', filterParams.brand);
              if (filterParams.minRating) params.append('minRating', filterParams.minRating);
              if (filterParams.onSale) params.append('onSale', 'true');
              if (filterParams.maxPrice) params.append('maxPrice', filterParams.maxPrice);

              const response = await axios.get('/api/products?' + params.toString());
              
              // Handle API response format
              let productsData = [];
              let total = 0;
              if (response.data.success && response.data.data) {
                productsData = response.data.data;
                total = response.data.pagination?.total || productsData.length;
              }

              renderProducts(productsData);
              renderPagination({ total: total, page: state.page, limit: 12 });
              updateResultCount(productsData.length);
              updateActiveFilters();
              initScrollAnimations();
            } catch (error) {
              console.error('Error loading products:', error);
              document.getElementById('products-container').innerHTML = 
                '<div class="col-span-full text-center text-red-600 py-12">Fehler beim Laden der Produkte</div>';
            }
          }

          // Render products
          function renderProducts(products) {
            const container = document.getElementById('products-container');
            
            if (!products || products.length === 0) {
              container.innerHTML = \`
                <div class="col-span-full text-center py-16">
                  <div class="max-w-md mx-auto">
                    <i class="fas fa-search text-8xl mb-6 text-gray-300"></i>
                    <h3 class="text-2xl font-bold text-navy-dark mb-3">Keine Produkte gefunden</h3>
                    <p class="text-gray-600 mb-6">
                      Versuchen Sie, Ihre Filter anzupassen oder die Suche zu ändern.
                    </p>
                    <button 
                      onclick="document.getElementById('reset-filters').click()" 
                      class="bg-gold text-white px-6 py-3 rounded-lg hover:bg-gold-dark transition font-semibold inline-flex items-center"
                    >
                      <i class="fas fa-redo mr-2"></i>
                      Filter zurücksetzen
                    </button>
                  </div>
                </div>
              \`;
              return;
            }

            const isListView = state.viewMode === 'list';
            container.className = isListView ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8';

            container.innerHTML = products.map(product => {
              const basePrice = product.base_price || 0;
              const discountPrice = product.discount_price || null;
              const price = discountPrice || basePrice;
              const savings = discountPrice ? Math.round(((basePrice - discountPrice) / basePrice) * 100) : 0;
              const rating = product.rating_average || 4.5;
              const stars = Math.round(rating);
              
              // Format prices (already in euros, not cents)
              const formattedPrice = price.toFixed(2).replace('.', ',') + ' €';
              const formattedBasePrice = basePrice.toFixed(2).replace('.', ',') + ' €';
              
              // For template compatibility
              const salePrice = discountPrice ? formattedPrice : null;
              const priceDisplay = discountPrice ? formattedBasePrice : formattedPrice;

              if (isListView) {
                return \`
                  <div class="scroll-fade bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex">
                    <div class="w-64 h-48 bg-gradient-to-br from-navy-light to-navy-medium flex items-center justify-center relative overflow-hidden">
                      <i class="fas fa-box text-6xl text-white opacity-30"></i>
                      \${savings > 0 ? \`<div class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-\${savings}%</div>\` : ''}
                    </div>
                    <div class="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div class="flex items-center justify-between mb-2">
                          <span class="text-xs font-semibold text-gold uppercase tracking-wide">\${product.category || 'Software'}</span>
                          <div class="flex">
                            \${Array(5).fill().map((_, i) => \`<i class="fas fa-star text-\${i < stars ? 'gold' : 'gray-300'} text-xs"></i>\`).join('')}
                          </div>
                        </div>
                        <h3 class="text-xl font-bold text-navy-dark mb-2">\${product.name}</h3>
                        <p class="text-sm text-gray-600 mb-4">\${product.short_description || 'Original Lizenz • Sofortiger Download • Lifetime Support'}</p>
                      </div>
                      <div class="flex items-center justify-between">
                        <div>
                          \${salePrice ? \`
                            <div class="flex items-center space-x-2">
                              <span class="text-3xl font-bold text-red-600">\${salePrice}</span>
                              <span class="text-lg text-gray-400 line-through">\${priceDisplay}</span>
                            </div>
                          \` : \`
                            <span class="text-3xl font-bold text-navy-dark">\${priceDisplay}</span>
                          \`}
                        </div>
                        <div class="flex space-x-2">
                          <button onclick="viewProduct('\${product.slug}')" class="bg-gray-100 text-navy-dark px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold">
                            <i class="fas fa-eye mr-2"></i>Ansehen
                          </button>
                          <button onclick="addToCart(\${product.id})" class="bg-gold text-white px-6 py-3 rounded-lg hover:bg-gold-dark transition font-semibold">
                            <i class="fas fa-cart-plus mr-2"></i>In den Warenkorb
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                \`;
              }

              return \`
                <div class="scroll-fade product-card bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer group">
                  <div class="relative overflow-hidden h-64 bg-gradient-to-br from-navy-light to-navy-medium flex items-center justify-center">
                    <i class="product-image fas fa-box text-6xl text-white opacity-30 group-hover:opacity-50 transition"></i>
                    \${savings > 0 ? \`
                      <div class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                        -\${savings}%
                      </div>
                    \` : ''}
                    \${product.is_featured ? \`
                      <div class="absolute top-3 left-3 bg-gold text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <i class="fas fa-star mr-1"></i>Featured
                      </div>
                    \` : ''}
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-40 transition"></div>
                  </div>
                  
                  <div class="p-5">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-semibold text-gold uppercase tracking-wide">\${product.category || 'Software'}</span>
                      <div class="flex">
                        \${Array(5).fill().map((_, i) => \`<i class="fas fa-star text-\${i < stars ? 'gold' : 'gray-300'} text-xs"></i>\`).join('')}
                      </div>
                    </div>
                    <h3 class="font-bold text-navy-dark mb-2 line-clamp-2 group-hover:text-gold transition text-lg">
                      \${product.name}
                    </h3>
                    
                    <div class="flex items-center justify-between mb-4">
                      <div>
                        \${salePrice ? \`
                          <div class="flex items-center space-x-2">
                            <span class="text-2xl font-bold text-red-600">\${salePrice}</span>
                            <span class="text-sm text-gray-400 line-through">\${priceDisplay}</span>
                          </div>
                        \` : \`
                          <span class="text-2xl font-bold text-navy-dark">\${priceDisplay}</span>
                        \`}
                      </div>
                    </div>

                    <div class="flex items-center space-x-2 mb-3">
                      <button 
                        onclick="viewProduct('\${product.slug}')" 
                        class="flex-1 bg-gray-100 text-navy-dark px-4 py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold text-sm"
                      >
                        <i class="fas fa-eye mr-1"></i>Ansehen
                      </button>
                      <button 
                        onclick="addToCart(\${product.id})" 
                        class="flex-1 bg-gold text-white px-4 py-2.5 rounded-lg hover:bg-gold-dark transition font-semibold text-sm"
                      >
                        <i class="fas fa-cart-plus mr-1"></i>Warenkorb
                      </button>
                    </div>
                    
                    <div class="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <span><i class="fas fa-download mr-1"></i>Sofort</span>
                      <span><i class="fas fa-shield-alt mr-1"></i>Original</span>
                      <span><i class="fas fa-infinity mr-1"></i>Lifetime</span>
                    </div>
                  </div>
                </div>
              \`;
            }).join('');
          }

          // Render pagination
          function renderPagination(pagination) {
            const container = document.getElementById('pagination');
            const { page, totalPages } = pagination;

            if (totalPages <= 1) {
              container.innerHTML = '';
              return;
            }

            let html = '';

            // Previous
            if (page > 1) {
              html += \`<button onclick="goToPage(\${page - 1})" class="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-gold hover:text-gold transition"><i class="fas fa-chevron-left"></i></button>\`;
            }

            // Pages
            const maxPages = 5;
            let startPage = Math.max(1, page - Math.floor(maxPages / 2));
            let endPage = Math.min(totalPages, startPage + maxPages - 1);

            if (endPage - startPage < maxPages - 1) {
              startPage = Math.max(1, endPage - maxPages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
              html += \`
                <button 
                  onclick="goToPage(\${i})" 
                  class="px-4 py-2 border-2 rounded-lg transition \${i === page ? 'bg-gold text-white border-gold' : 'border-gray-300 hover:border-gold hover:text-gold'}"
                >
                  \${i}
                </button>
              \`;
            }

            // Next
            if (page < totalPages) {
              html += \`<button onclick="goToPage(\${page + 1})" class="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-gold hover:text-gold transition"><i class="fas fa-chevron-right"></i></button>\`;
            }

            container.innerHTML = html;
          }

          // Update result count
          function updateResultCount(total) {
            document.getElementById('result-count').innerHTML = \`<i class="fas fa-box-open mr-2"></i>\${total} Produkte gefunden\`;
          }

          // Update active filters
          function updateActiveFilters() {
            const container = document.getElementById('active-filters');
            container.innerHTML = '';

            if (state.category !== 'all') {
              addFilterPill(state.category, state.category, 'category');
            }

            if (state.priceMax < 200) {
              addFilterPill(\`Bis \${state.priceMax} €\`, state.priceMax, 'price');
            }

            state.brands.forEach(brand => {
              addFilterPill(brand, brand, 'brand');
            });

            state.features.forEach(feature => {
              addFilterPill(feature.charAt(0).toUpperCase() + feature.slice(1), feature, 'feature');
            });
          }

          // Load categories
          async function loadCategories() {
            try {
              const response = await axios.get('/api/categories');
              const categories = response.data.data;

              const container = document.getElementById('category-filters');
              container.innerHTML = \`
                <label class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                  <input type="radio" name="category" value="all" checked class="mr-2 accent-gold" onchange="filterByCategory('all')" />
                  <span class="text-sm font-semibold">Alle Produkte</span>
                </label>
              \` + categories.map(cat => \`
                <label class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                  <input type="radio" name="category" value="\${cat.category}" class="mr-2 accent-gold" onchange="filterByCategory('\${cat.category}')" />
                  <span class="text-sm">\${cat.category} <span class="text-gray-400">(\${cat.count})</span></span>
                </label>
              \`).join('');
            } catch (error) {
              console.error('Error loading categories:', error);
            }
          }

          // Filter by category
          function filterByCategory(category) {
            state.category = category;
            state.page = 1;
            loadProducts();
          }

          // Go to page
          function goToPage(page) {
            state.page = page;
            loadProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          // View product
          function viewProduct(slug) {
            window.location.href = '/produkt/' + slug;
          }

          // Add to cart
          async function addToCart(productId) {
            try {
              if (window.cartManager) {
                const success = await window.cartManager.addToCart(productId, 1, 'single');
                if (success) {
                  // Success notification is shown by cartManager itself
                  console.log('Product added to cart:', productId);
                }
              } else {
                showNotification('Cart manager not initialized', 'error');
              }
            } catch (error) {
              console.error('Error adding to cart:', error);
              showNotification('Fehler beim Hinzufügen zum Warenkorb', 'error');
            }
          }

          // Show notification
          function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = \`live-notification bg-\${type === 'success' ? 'green' : 'red'}-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-3\`;
            notification.innerHTML = \`
              <i class="fas fa-\${type === 'success' ? 'check-circle' : 'exclamation-circle'} text-2xl"></i>
              <span class="font-semibold">\${message}</span>
            \`;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 5000);
          }

          // Init scroll animations
          function initScrollAnimations() {
            const observer = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            }, { threshold: 0.1 });

            document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el));
          }

          // Event listeners
          document.getElementById('sort-filter').addEventListener('change', (e) => {
            state.sort = e.target.value;
            state.page = 1;
            loadProducts();
          });

          document.getElementById('price-range').addEventListener('input', (e) => {
            state.priceMax = parseInt(e.target.value);
            document.getElementById('price-value').textContent = state.priceMax + ' €';
            e.target.style.background = \`linear-gradient(to right, var(--gold) 0%, var(--gold) \${(state.priceMax / 200) * 100}%, #ddd \${(state.priceMax / 200) * 100}%, #ddd 100%)\`;
          });

          document.getElementById('price-range').addEventListener('change', () => {
            state.page = 1;
            loadProducts();
          });

          document.querySelectorAll('input[name="brand"]').forEach(input => {
            input.addEventListener('change', (e) => {
              if (e.target.checked) {
                state.brands.push(e.target.value);
              } else {
                state.brands = state.brands.filter(b => b !== e.target.value);
              }
              state.page = 1;
              loadProducts();
            });
          });

          document.querySelectorAll('input[name="feature"]').forEach(input => {
            input.addEventListener('change', (e) => {
              if (e.target.checked) {
                state.features.push(e.target.value);
              } else {
                state.features = state.features.filter(f => f !== e.target.value);
              }
              state.page = 1;
              loadProducts();
            });
          });

          document.getElementById('apply-filters').addEventListener('click', () => {
            loadProducts();
          });

          document.getElementById('reset-filters').addEventListener('click', () => {
            state = {
              page: 1,
              category: 'all',
              sort: 'name',
              search: '',
              priceMax: 200,
              brands: [],
              features: [],
              viewMode: 'grid'
            };
            document.querySelector('input[name="category"][value="all"]').checked = true;
            document.querySelectorAll('input[name="brand"]').forEach(i => i.checked = false);
            document.querySelectorAll('input[name="feature"]').forEach(i => i.checked = false);
            document.getElementById('price-range').value = 200;
            document.getElementById('price-value').textContent = '200 €';
            document.getElementById('sort-filter').value = 'name';
            loadProducts();
          });

          // View toggle
          document.getElementById('view-grid').addEventListener('click', () => {
            state.viewMode = 'grid';
            document.getElementById('view-grid').classList.add('active');
            document.getElementById('view-list').classList.remove('active');
            loadProducts();
          });

          document.getElementById('view-list').addEventListener('click', () => {
            state.viewMode = 'list';
            document.getElementById('view-list').classList.add('active');
            document.getElementById('view-grid').classList.remove('active');
            loadProducts();
          });

          // Search from URL
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('search')) {
            state.search = urlParams.get('search');
            document.getElementById('global-search').value = state.search;
          }
          if (urlParams.get('category')) {
            state.category = urlParams.get('category');
          }

          // Cart badge update
          if (window.CartManager) {
            CartManager.updateCartBadge();
          }

          // Expose ProductsManager for FilterManager
          window.ProductsManager = {
            loadProducts: loadProducts,
            state: state
          };

          // Initial load
          loadProducts();
          loadCategories();
        `}} />
      </body>
    </html>
  );
};
