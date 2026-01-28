export const ProductsPage = () => {
  return (
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Produkte - SoftwareKing24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
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
                  <a href="/warenkorb" class="text-gray-600 hover:text-blue-600">
                    <i class="fas fa-shopping-cart mr-1"></i>Warenkorb <span class="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs ml-1">0</span>
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
                <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  SK
                </div>
                <span class="text-2xl font-bold text-gray-800">SoftwareKing24</span>
              </a>

              {/* Search Bar */}
              <div class="flex-1 max-w-2xl mx-8">
                <div class="relative">
                  <input 
                    type="text" 
                    id="search-input"
                    placeholder="Produkte suchen..." 
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div class="flex items-center space-x-4">
                <button class="px-4 py-2 text-gray-700 hover:text-blue-600 transition">
                  <i class="fas fa-user mr-2"></i>Anmelden
                </button>
              </div>
            </div>

            {/* Category Navigation */}
            <nav class="border-t border-gray-200 py-3">
              <ul class="flex space-x-8 text-sm font-medium">
                <li><a href="#" class="text-blue-600 hover:text-blue-800">Alle Produkte</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-600">Microsoft Windows</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-600">Microsoft Office</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-600">Office Mac</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-600">Server</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-600">Angebote</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main class="container mx-auto px-4 py-8">
          <div class="flex gap-8">
            {/* Sidebar Filters */}
            <aside class="w-64 flex-shrink-0">
              <div class="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 class="text-lg font-bold mb-4">Filter</h2>
                
                {/* Categories */}
                <div class="mb-6">
                  <h3 class="font-semibold mb-3 text-gray-700">Kategorien</h3>
                  <div class="space-y-2" id="category-filters">
                    <label class="flex items-center cursor-pointer">
                      <input type="radio" name="category" value="all" checked class="mr-2" />
                      <span class="text-sm">Alle Produkte</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div class="mb-6">
                  <h3 class="font-semibold mb-3 text-gray-700">Preis</h3>
                  <select id="price-filter" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="">Alle Preise</option>
                    <option value="0-20">0 € - 20 €</option>
                    <option value="20-50">20 € - 50 €</option>
                    <option value="50-100">50 € - 100 €</option>
                    <option value="100+">100 € +</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <h3 class="font-semibold mb-3 text-gray-700">Sortieren</h3>
                  <select id="sort-filter" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="name">Name (A-Z)</option>
                    <option value="price-asc">Preis aufsteigend</option>
                    <option value="price-desc">Preis absteigend</option>
                    <option value="newest">Neueste</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div class="flex-1">
              {/* Toolbar */}
              <div class="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
                <div>
                  <span class="text-gray-600" id="result-count">Loading products...</span>
                </div>
                <div class="flex items-center space-x-4">
                  <button class="p-2 hover:bg-gray-100 rounded" title="Grid View">
                    <i class="fas fa-th text-blue-600"></i>
                  </button>
                  <button class="p-2 hover:bg-gray-100 rounded" title="List View">
                    <i class="fas fa-list text-gray-400"></i>
                  </button>
                </div>
              </div>

              {/* Products Container */}
              <div id="products-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Products will be loaded via JavaScript */}
              </div>

              {/* Pagination */}
              <div id="pagination" class="flex justify-center space-x-2">
                {/* Pagination will be generated dynamically */}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer class="bg-gray-900 text-white mt-16 py-12">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 class="font-bold text-lg mb-4">SoftwareKing24</h4>
                <p class="text-gray-400 text-sm">
                  Ihre vertrauenswürdige Quelle für Original-Software zu fairen Preisen.
                </p>
              </div>
              <div>
                <h4 class="font-bold mb-4">Schnelllinks</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                  <li><a href="#" class="hover:text-white">Über uns</a></li>
                  <li><a href="#" class="hover:text-white">Kontakt</a></li>
                  <li><a href="#" class="hover:text-white">Versand</a></li>
                  <li><a href="#" class="hover:text-white">Zahlungsarten</a></li>
                </ul>
              </div>
              <div>
                <h4 class="font-bold mb-4">Rechtliches</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                  <li><a href="#" class="hover:text-white">AGB</a></li>
                  <li><a href="#" class="hover:text-white">Datenschutz</a></li>
                  <li><a href="#" class="hover:text-white">Impressum</a></li>
                  <li><a href="#" class="hover:text-white">Widerruf</a></li>
                </ul>
              </div>
              <div>
                <h4 class="font-bold mb-4">Zahlungsarten</h4>
                <div class="flex space-x-3 text-2xl text-gray-400">
                  <i class="fab fa-cc-paypal"></i>
                  <i class="fab fa-cc-visa"></i>
                  <i class="fab fa-cc-mastercard"></i>
                  <i class="fab fa-cc-stripe"></i>
                </div>
              </div>
            </div>
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2026 SoftwareKing24. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>

        {/* JavaScript */}
        <script dangerouslySetInnerHTML={{__html: `
          let currentPage = 1;
          let currentCategory = 'all';
          let currentSort = 'name';
          let currentSearch = '';

          // Format price in EUR
          function formatPrice(cents) {
            return (cents / 100).toFixed(2).replace('.', ',') + ' €';
          }

          // Load products
          async function loadProducts() {
            try {
              const params = new URLSearchParams({
                page: currentPage,
                limit: 12,
                sort: currentSort
              });

              if (currentCategory && currentCategory !== 'all') {
                params.append('category', currentCategory);
              }

              if (currentSearch) {
                params.append('search', currentSearch);
              }

              const response = await axios.get('/api/products?' + params.toString());
              const { data, pagination } = response.data;

              renderProducts(data);
              renderPagination(pagination);
              updateResultCount(pagination.total);
            } catch (error) {
              console.error('Error loading products:', error);
              document.getElementById('products-container').innerHTML = 
                '<div class="col-span-full text-center text-red-600">Fehler beim Laden der Produkte</div>';
            }
          }

          // Render products
          function renderProducts(products) {
            const container = document.getElementById('products-container');
            
            if (products.length === 0) {
              container.innerHTML = '<div class="col-span-full text-center text-gray-500">Keine Produkte gefunden</div>';
              return;
            }

            container.innerHTML = products.map(product => {
              const price = formatPrice(product.price);
              const salePrice = product.sale_price ? formatPrice(product.sale_price) : null;
              const savings = salePrice ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;

              return \`
                <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                  <div class="relative">
                    <div class="aspect-square bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-6">
                      <i class="fas fa-box text-6xl text-gray-300 group-hover:text-blue-400 transition"></i>
                    </div>
                    \${savings > 0 ? \`
                      <div class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -\${savings}%
                      </div>
                    \` : ''}
                    \${product.is_featured ? \`
                      <div class="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        <i class="fas fa-star mr-1"></i>Featured
                      </div>
                    \` : ''}
                  </div>
                  
                  <div class="p-5">
                    <div class="mb-2">
                      <span class="text-xs text-gray-500 font-medium">\${product.category}</span>
                    </div>
                    <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                      \${product.name}
                    </h3>
                    
                    <div class="flex items-center justify-between mb-4">
                      <div>
                        \${salePrice ? \`
                          <div class="flex items-center space-x-2">
                            <span class="text-2xl font-bold text-red-600">\${salePrice}</span>
                            <span class="text-sm text-gray-400 line-through">\${price}</span>
                          </div>
                        \` : \`
                          <span class="text-2xl font-bold text-gray-800">\${price}</span>
                        \`}
                      </div>
                    </div>

                    <div class="flex items-center justify-between space-x-2">
                      <button 
                        onclick="viewProduct(\${product.id})" 
                        class="flex-1 bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold text-sm"
                      >
                        <i class="fas fa-eye mr-1"></i>Ansehen
                      </button>
                      <button 
                        onclick="addToCart(\${product.id})" 
                        class="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                      >
                        <i class="fas fa-cart-plus mr-1"></i>Warenkorb
                      </button>
                    </div>
                    
                    <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span><i class="fas fa-truck mr-1"></i>Sofortiger Download</span>
                      <span><i class="fas fa-shield-alt mr-1"></i>Original</span>
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

            // Previous button
            if (page > 1) {
              html += \`
                <button onclick="goToPage(\${page - 1})" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <i class="fas fa-chevron-left"></i>
                </button>
              \`;
            }

            // Page numbers
            for (let i = 1; i <= Math.min(totalPages, 5); i++) {
              html += \`
                <button 
                  onclick="goToPage(\${i})" 
                  class="px-4 py-2 border rounded-lg \${i === page ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}"
                >
                  \${i}
                </button>
              \`;
            }

            // Next button
            if (page < totalPages) {
              html += \`
                <button onclick="goToPage(\${page + 1})" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <i class="fas fa-chevron-right"></i>
                </button>
              \`;
            }

            container.innerHTML = html;
          }

          // Update result count
          function updateResultCount(total) {
            document.getElementById('result-count').textContent = \`\${total} Produkte gefunden\`;
          }

          // Load categories
          async function loadCategories() {
            try {
              const response = await axios.get('/api/categories');
              const categories = response.data.data;

              const container = document.getElementById('category-filters');
              container.innerHTML = \`
                <label class="flex items-center cursor-pointer">
                  <input type="radio" name="category" value="all" checked class="mr-2" onchange="filterByCategory('all')" />
                  <span class="text-sm">Alle Produkte</span>
                </label>
              \` + categories.map(cat => \`
                <label class="flex items-center cursor-pointer">
                  <input type="radio" name="category" value="\${cat.category}" class="mr-2" onchange="filterByCategory('\${cat.category}')" />
                  <span class="text-sm">\${cat.category} (\${cat.count})</span>
                </label>
              \`).join('');
            } catch (error) {
              console.error('Error loading categories:', error);
            }
          }

          // Filter functions
          function filterByCategory(category) {
            currentCategory = category;
            currentPage = 1;
            loadProducts();
          }

          function goToPage(page) {
            currentPage = page;
            loadProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          // View product
          function viewProduct(productId) {
            window.location.href = '/produkt/' + productId;
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
                alert('Cart manager not initialized');
              }
            } catch (error) {
              console.error('Error adding to cart:', error);
              alert('Fehler beim Hinzufügen zum Warenkorb');
            }
          }

          // Event listeners
          document.getElementById('sort-filter').addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentPage = 1;
            loadProducts();
          });

          document.getElementById('search-input').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
              currentSearch = e.target.value;
              currentPage = 1;
              loadProducts();
            }
          });

          // Initial load
          loadProducts();
          loadCategories();
        `}} />
      </body>
    </html>
  );
};
