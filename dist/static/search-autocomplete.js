// Search Autocomplete JavaScript
// This script handles real-time search with autocomplete dropdown

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

  console.log('Search autocomplete initialized!');

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
    searchDropdown.innerHTML = `
      <div class="search-loading">
        <div class="spinner"></div>
      </div>
    `;

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

  // Focus to show dropdown if has value
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length >= 2 && searchDropdown.children.length > 0) {
      searchDropdown.classList.add('show');
    }
  });

  // Enter key to view all results
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && currentSearchQuery.length >= 2) {
      e.preventDefault();
      window.location.href = '/produkte?search=' + encodeURIComponent(currentSearchQuery);
    }
  });

  // ESC key to close dropdown
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchDropdown.classList.remove('show');
      searchInput.blur();
    }
  });
}

async function performSearch(query) {
  try {
    const response = await axios.get(`/api/products/search/autocomplete?q=${encodeURIComponent(query)}&limit=5`);
    
    if (!response.data.success) {
      throw new Error('Search failed');
    }

    const results = response.data.data || [];
    renderSearchResults(results, query);
  } catch (error) {
    console.error('Search error:', error);
    const searchDropdown = document.getElementById('search-dropdown');
    if (searchDropdown) {
      searchDropdown.innerHTML = `
        <div class="autocomplete-empty">
          <i class="fas fa-exclamation-circle"></i>
          <p>Fehler bei der Suche. Bitte versuchen Sie es erneut.</p>
        </div>
      `;
    }
  }
}

function renderSearchResults(results, query) {
  const searchDropdown = document.getElementById('search-dropdown');
  
  if (!searchDropdown) return;

  if (results.length === 0) {
    searchDropdown.innerHTML = `
      <div class="autocomplete-empty">
        <i class="fas fa-search" style="font-size: 2rem; color: #d1d5db; margin-bottom: 0.5rem;"></i>
        <p>Keine Ergebnisse für "<strong>${escapeHtml(query)}</strong>"</p>
        <p style="font-size: 0.75rem; margin-top: 0.25rem;">Versuchen Sie andere Suchbegriffe</p>
      </div>
    `;
    return;
  }

  let html = '';
  
  results.forEach(product => {
    const price = product.discount_price || product.base_price;
    const hasDiscount = product.discount_price && product.discount_price < product.base_price;
    const imageUrl = product.image_url || '/static/placeholder.png';
    const category = product.category_name || 'Software';
    const brand = product.brand_name || '';
    
    const priceHtml = hasDiscount 
      ? `<span class="discounted">${formatPrice(product.discount_price)} <span class="original">${formatPrice(product.base_price)}</span></span>`
      : `${formatPrice(price)}`;

    const highlightedName = highlightMatch(product.name, query);

    html += `
      <a href="/produkt/${product.slug}" class="autocomplete-item">
        <img src="${imageUrl}" alt="${escapeHtml(product.name)}" onerror="this.src='/static/placeholder.png'">
        <div class="autocomplete-item-content">
          <div class="autocomplete-item-name">${highlightedName}</div>
          <div class="autocomplete-item-category">${escapeHtml(category)}${brand ? ' • ' + escapeHtml(brand) : ''}</div>
        </div>
        <div class="autocomplete-item-price">${priceHtml}</div>
      </a>
    `;
  });

  html += `
    <div class="autocomplete-footer">
      <a href="/produkte?search=${encodeURIComponent(query)}">
        Alle Ergebnisse anzeigen <i class="fas fa-arrow-right ml-1"></i>
      </a>
    </div>
  `;

  searchDropdown.innerHTML = html;
}

function formatPrice(price) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  
  const escapedText = escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapedText.replace(regex, '<span class="search-highlight">$1</span>');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearch);
} else {
  initSearch();
}

// Also try to initialize after a short delay (fallback)
setTimeout(initSearch, 100);

console.log('Search autocomplete script loaded');
