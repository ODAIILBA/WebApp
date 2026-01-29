// Search Autocomplete Component
export const SearchAutocomplete = () => {
  return (
    <html lang="de">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Suche - SoftwareKing24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style>
          {`
          :root {
            --navy-dark: #1a2a4e;
            --navy-medium: #2d3e6f;
            --gold: #d4af37;
            --gold-light: #e8c966;
          }

          /* Autocomplete dropdown */
          .autocomplete-dropdown {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e5e7eb;
            border-top: none;
            border-radius: 0 0 0.5rem 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            margin-top: -1px;
          }

          .autocomplete-dropdown.show {
            display: block;
          }

          .autocomplete-item {
            padding: 0.75rem 1rem;
            cursor: pointer;
            border-bottom: 1px solid #f3f4f6;
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: background-color 0.2s;
          }

          .autocomplete-item:hover {
            background-color: #f9fafb;
          }

          .autocomplete-item:last-child {
            border-bottom: none;
          }

          .autocomplete-item img {
            width: 50px;
            height: 50px;
            object-fit: contain;
            border-radius: 0.25rem;
            background: #f9fafb;
            padding: 0.25rem;
          }

          .autocomplete-item-content {
            flex: 1;
            min-width: 0;
          }

          .autocomplete-item-name {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--navy-dark);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .autocomplete-item-category {
            font-size: 0.75rem;
            color: #6b7280;
            margin-top: 0.125rem;
          }

          .autocomplete-item-price {
            font-size: 0.875rem;
            font-weight: 700;
            color: var(--gold);
            white-space: nowrap;
          }

          .autocomplete-item-price.discounted {
            color: #ef4444;
          }

          .autocomplete-item-price .original {
            text-decoration: line-through;
            color: #9ca3af;
            font-size: 0.75rem;
            font-weight: 400;
            margin-left: 0.5rem;
          }

          .autocomplete-footer {
            padding: 0.75rem 1rem;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            background: #f9fafb;
          }

          .autocomplete-footer a {
            color: var(--gold);
            font-weight: 600;
            text-decoration: none;
            font-size: 0.875rem;
          }

          .autocomplete-footer a:hover {
            color: var(--gold-light);
          }

          .autocomplete-empty {
            padding: 2rem 1rem;
            text-align: center;
            color: #6b7280;
            font-size: 0.875rem;
          }

          /* Search highlight */
          .search-highlight {
            background-color: rgba(212, 175, 55, 0.2);
            font-weight: 600;
          }

          /* Loading spinner */
          .search-loading {
            padding: 1rem;
            text-align: center;
          }

          .spinner {
            display: inline-block;
            width: 24px;
            height: 24px;
            border: 3px solid #f3f4f6;
            border-top-color: var(--gold);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          `}
        </style>
      </head>
      <body>
        {/* Search component is embedded in the header - this is just the script */}
        <script>
          {`
          // Initialize search autocomplete
          let searchTimeout = null;
          let currentSearchQuery = '';

          function initSearch() {
            const searchInput = document.getElementById('search-input');
            const searchDropdown = document.getElementById('search-dropdown');
            
            if (!searchInput || !searchDropdown) {
              console.log('Search elements not found, retrying...');
              setTimeout(initSearch, 500);
              return;
            }

            // Search input handler
            searchInput.addEventListener('input', (e) => {
              const query = e.target.value.trim();
              currentSearchQuery = query;

              // Clear previous timeout
              if (searchTimeout) {
                clearTimeout(searchTimeout);
              }

              // Hide dropdown if query is too short
              if (query.length < 2) {
                searchDropdown.classList.remove('show');
                return;
              }

              // Show loading state
              searchDropdown.classList.add('show');
              searchDropdown.innerHTML = \`
                <div class="search-loading">
                  <div class="spinner"></div>
                </div>
              \`;

              // Debounce search (300ms)
              searchTimeout = setTimeout(() => {
                performSearch(query);
              }, 300);
            });

            // Click outside to close
            document.addEventListener('click', (e) => {
              if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.remove('show');
              }
            });

            // Focus to show recent/popular searches (future enhancement)
            searchInput.addEventListener('focus', () => {
              if (searchInput.value.trim().length >= 2) {
                searchDropdown.classList.add('show');
              }
            });

            // Enter key to view all results
            searchInput.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' && currentSearchQuery.length >= 2) {
                window.location.href = '/produkte?search=' + encodeURIComponent(currentSearchQuery);
              }
            });
          }

          async function performSearch(query) {
            try {
              const response = await axios.get(\`/api/products/search/autocomplete?q=\${encodeURIComponent(query)}&limit=5\`);
              
              if (!response.data.success) {
                throw new Error('Search failed');
              }

              const results = response.data.data || [];
              renderSearchResults(results, query);
            } catch (error) {
              console.error('Search error:', error);
              const searchDropdown = document.getElementById('search-dropdown');
              searchDropdown.innerHTML = \`
                <div class="autocomplete-empty">
                  <i class="fas fa-exclamation-circle"></i>
                  <p>Fehler bei der Suche. Bitte versuchen Sie es erneut.</p>
                </div>
              \`;
            }
          }

          function renderSearchResults(results, query) {
            const searchDropdown = document.getElementById('search-dropdown');
            
            if (results.length === 0) {
              searchDropdown.innerHTML = \`
                <div class="autocomplete-empty">
                  <i class="fas fa-search" style="font-size: 2rem; color: #d1d5db; margin-bottom: 0.5rem;"></i>
                  <p>Keine Ergebnisse für "<strong>\${escapeHtml(query)}</strong>"</p>
                  <p style="font-size: 0.75rem; margin-top: 0.25rem;">Versuchen Sie andere Suchbegriffe</p>
                </div>
              \`;
              return;
            }

            let html = '';
            
            results.forEach(product => {
              const price = product.discount_price || product.base_price;
              const hasDiscount = product.discount_price && product.discount_price < product.base_price;
              const imageUrl = product.image_url || '/static/placeholder.png';
              const category = product.category_name || 'Software';
              
              const priceHtml = hasDiscount 
                ? \`<span class="discounted">\${formatPrice(product.discount_price)} <span class="original">\${formatPrice(product.base_price)}</span></span>\`
                : \`\${formatPrice(price)}\`;

              const highlightedName = highlightMatch(product.name, query);

              html += \`
                <a href="/produkt/\${product.slug}" class="autocomplete-item">
                  <img src="\${imageUrl}" alt="\${escapeHtml(product.name)}" onerror="this.src='/static/placeholder.png'">
                  <div class="autocomplete-item-content">
                    <div class="autocomplete-item-name">\${highlightedName}</div>
                    <div class="autocomplete-item-category">\${escapeHtml(category)}</div>
                  </div>
                  <div class="autocomplete-item-price">\${priceHtml}</div>
                </a>
              \`;
            });

            html += \`
              <div class="autocomplete-footer">
                <a href="/produkte?search=\${encodeURIComponent(query)}">
                  Alle Ergebnisse anzeigen <i class="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            \`;

            searchDropdown.innerHTML = html;
          }

          function formatPrice(price) {
            return new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'EUR'
            }).format(price);
          }

          function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
          }

          function highlightMatch(text, query) {
            if (!query) return escapeHtml(text);
            
            const escapedText = escapeHtml(text);
            const regex = new RegExp(\`(\${query.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})\`, 'gi');
            return escapedText.replace(regex, '<span class="search-highlight">$1</span>');
          }

          // Initialize on DOM ready
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSearch);
          } else {
            initSearch();
          }
          `}
        </script>
      </body>
    </html>
  )
}
