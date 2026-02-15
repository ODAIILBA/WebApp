// Category Listing Page Component
import type { FC } from 'hono/jsx'

interface CategoryListingProps {
  category: any
  language: string
}

export const CategoryListing: FC<CategoryListingProps> = ({ category, language }) => {
  return (
    <div>
      {/* Breadcrumb */}
      <div class="bg-gray-100 py-3">
        <div class="container mx-auto px-4">
          <nav class="text-sm">
            <a href="/" class="text-gray-600 hover:text-primary">Home</a>
            <span class="mx-2 text-gray-400">/</span>
            <span class="text-gray-800">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div class="bg-gradient-to-r from-primary to-blue-900 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="flex items-center gap-4 mb-4">
            {category.icon && (
              <i class={`${category.icon} text-5xl text-gold`}></i>
            )}
            <div>
              <h1 class="text-4xl font-bold mb-2">{category.name}</h1>
              <p class="text-xl opacity-90">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <div class="grid md:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <aside class="md:col-span-1">
            <div class="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 class="font-bold text-lg mb-4 pb-3 border-b">Filters</h3>
              
              {/* Price Range */}
              <div class="mb-6">
                <h4 class="font-semibold mb-3">Price Range</h4>
                <div class="space-y-2">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-price" value="0-50" />
                    <span>Under €50</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-price" value="50-100" />
                    <span>€50 - €100</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-price" value="100-200" />
                    <span>€100 - €200</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-price" value="200-999999" />
                    <span>Over €200</span>
                  </label>
                </div>
              </div>

              {/* License Type */}
              <div class="mb-6">
                <h4 class="font-semibold mb-3">License Type</h4>
                <div class="space-y-2">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-license" value="perpetual" />
                    <span>Perpetual</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-license" value="subscription" />
                    <span>Subscription</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-license" value="trial" />
                    <span>Trial</span>
                  </label>
                </div>
              </div>

              {/* Brands */}
              <div class="mb-6">
                <h4 class="font-semibold mb-3">Brands</h4>
                <div class="space-y-2">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-brand" value="1" />
                    <span>Microsoft</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-brand" value="2" />
                    <span>Adobe</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-brand" value="3" />
                    <span>Kaspersky</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="filter-brand" value="4" />
                    <span>Norton</span>
                  </label>
                </div>
              </div>

              <button class="btn-primary w-full mb-2" onclick="applyFilters()">
                <i class="fas fa-filter mr-2"></i>
                Apply Filters
              </button>
              
              <button class="btn-primary w-full bg-gray-500 hover:bg-gray-600" onclick="clearFilters()">
                <i class="fas fa-redo mr-2"></i>
                Clear All
              </button>
            </div>
          </aside>

          {/* Main Content - Products */}
          <main class="md:col-span-3">
            {/* Toolbar */}
            <div class="flex items-center justify-between mb-6 bg-white rounded-lg shadow p-4">
              <div class="text-gray-600">
                <span id="product-count">Loading...</span>
              </div>
              
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2">
                  <span class="text-sm text-gray-600">Sort by:</span>
                  <select class="form-control w-48" id="sort-select" onchange="loadProducts()">
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="newest">Newest First</option>
                    <option value="bestselling">Best Selling</option>
                  </select>
                </label>
                
                <div class="flex gap-2">
                  <button class="p-2 border rounded hover:bg-gray-100 active" id="view-grid" onclick="setView('grid')">
                    <i class="fas fa-th"></i>
                  </button>
                  <button class="p-2 border rounded hover:bg-gray-100" id="view-list" onclick="setView('list')">
                    <i class="fas fa-list"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div id="products-container" class="grid md:grid-cols-3 gap-6">
              <div class="text-center py-12 col-span-3">
                <i class="fas fa-spinner fa-spin text-4xl text-gold mb-3"></i>
                <p class="text-gray-600">Loading products...</p>
              </div>
            </div>

            {/* Pagination */}
            <div id="pagination" class="mt-8 flex items-center justify-center gap-2">
              {/* Pagination buttons will be inserted here */}
            </div>
          </main>
        </div>
      </div>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        let currentPage = 1;
        let currentView = 'grid';
        const categorySlug = '${category.slug}';

        async function loadProducts() {
          try {
            const sortBy = document.getElementById('sort-select').value;
            const limit = 12;
            
            const response = await fetch(\`/api/categories/\${categorySlug}/products?page=\${currentPage}&limit=\${limit}\`);
            const data = await response.json();
            
            if (data.success) {
              const container = document.getElementById('products-container');
              
              if (data.data.products.length === 0) {
                container.innerHTML = \`
                  <div class="col-span-3 text-center py-12">
                    <i class="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
                    <p class="text-xl text-gray-600">No products found in this category</p>
                  </div>
                \`;
                return;
              }

              // Update count
              document.getElementById('product-count').textContent = \`Showing \${data.data.products.length} of \${data.data.total} products\`;
              
              // Render products
              if (currentView === 'grid') {
                container.className = 'grid md:grid-cols-3 gap-6';
                container.innerHTML = data.data.products.map(product => createProductCard(product)).join('');
              } else {
                container.className = 'space-y-4';
                container.innerHTML = data.data.products.map(product => createProductListItem(product)).join('');
              }
              
              // Render pagination
              renderPagination(data.data.page, data.data.totalPages);
            }
          } catch (error) {
            console.error('Error loading products:', error);
          }
        }

        function createProductCard(product) {
          const discount = product.discount_percentage || 0;
          const price = product.discount_price || product.base_price;
          const originalPrice = product.base_price;
          
          return \`
            <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden gold-border">
              <a href="/products/\${product.slug}" class="block">
                <div class="relative">
                  <img src="\${product.image_url || 'https://via.placeholder.com/400x300'}" 
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
                      <div class="text-xs text-gray-500">incl. VAT</div>
                    </div>
                  </div>
                </div>
              </a>
              <div class="px-4 pb-4">
                <button onclick="addToCart('\${product.slug}')" class="btn-gold w-full py-2 rounded-lg text-sm">
                  <i class="fas fa-shopping-cart mr-2"></i> Add to Cart
                </button>
              </div>
            </div>
          \`;
        }

        function createProductListItem(product) {
          const discount = product.discount_percentage || 0;
          const price = product.discount_price || product.base_price;
          const originalPrice = product.base_price;
          
          return \`
            <div class="bg-white rounded-lg shadow-lg p-4 flex gap-4 items-center gold-border">
              <a href="/products/\${product.slug}" class="w-32 h-32 flex-shrink-0">
                <img src="\${product.image_url || 'https://via.placeholder.com/200'}" 
                     alt="\${product.name}" 
                     class="w-full h-full object-cover rounded"/>
              </a>
              <div class="flex-1">
                <a href="/products/\${product.slug}">
                  <h3 class="font-bold text-xl mb-2 hover:text-primary">\${product.name}</h3>
                </a>
                <p class="text-gray-600 mb-3">\${product.short_description || ''}</p>
                <div class="flex items-center gap-3">
                  <span class="badge badge-info">\${product.category_name || 'Software'}</span>
                  \${product.brand_name ? \`<span class="badge badge-info">\${product.brand_name}</span>\` : ''}
                </div>
              </div>
              <div class="text-right">
                \${discount > 0 ? \`<div class="text-sm text-gray-400 line-through mb-1">€\${originalPrice.toFixed(2)}</div>\` : ''}
                <div class="text-3xl font-bold text-gold mb-2">€\${price.toFixed(2)}</div>
                <button onclick="addToCart('\${product.slug}')" class="btn-gold px-6 py-2 rounded-lg">
                  <i class="fas fa-shopping-cart mr-2"></i> Add to Cart
                </button>
              </div>
            </div>
          \`;
        }

        function renderPagination(currentPage, totalPages) {
          const pagination = document.getElementById('pagination');
          
          if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
          }

          let html = '';
          
          // Previous button
          if (currentPage > 1) {
            html += \`<button onclick="goToPage(\${currentPage - 1})" class="px-4 py-2 border rounded hover:bg-gray-100">
              <i class="fas fa-chevron-left"></i>
            </button>\`;
          }

          // Page numbers
          for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
              html += \`<button class="px-4 py-2 border rounded bg-gold text-primary font-bold">\${i}</button>\`;
            } else {
              html += \`<button onclick="goToPage(\${i})" class="px-4 py-2 border rounded hover:bg-gray-100">\${i}</button>\`;
            }
          }

          // Next button
          if (currentPage < totalPages) {
            html += \`<button onclick="goToPage(\${currentPage + 1})" class="px-4 py-2 border rounded hover:bg-gray-100">
              <i class="fas fa-chevron-right"></i>
            </button>\`;
          }

          pagination.innerHTML = html;
        }

        function goToPage(page) {
          currentPage = page;
          loadProducts();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function setView(view) {
          currentView = view;
          document.getElementById('view-grid').classList.toggle('active', view === 'grid');
          document.getElementById('view-list').classList.toggle('active', view === 'list');
          loadProducts();
        }

        function addToCart(slug) {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          const existingItem = cart.find(item => item.slug === slug);
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({ slug: slug, quantity: 1 });
          }
          
          localStorage.setItem('cart', JSON.stringify(cart));
          alert('Product added to cart!');
        }

        function applyFilters() {
          // Filter logic here
          alert('Filters applied!');
        }

        function clearFilters() {
          document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
          loadProducts();
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', loadProducts);
      `}} />
    </div>
  )
}
