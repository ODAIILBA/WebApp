/**
 * Enhanced Filters System for SoftwareKing24
 * Provides dynamic brand loading, rating filters, on-sale toggle, and smart filtering
 */

(function() {
  'use strict';

  // Filter state management
  window.FilterManager = {
    state: {
      brands: [],
      minRating: 0,
      onSale: false,
      minPrice: 0,
      maxPrice: 999,
      category: '',
      search: ''
    },
    
    // Cache for brands API
    brandsCache: null,
    brandsCacheTime: null,
    brandsCacheDuration: 5 * 60 * 1000, // 5 minutes

    /**
     * Initialize filters system
     */
    init: function() {
      this.loadBrandsFromAPI();
      this.setupEventListeners();
      this.renderRatingFilter();
      this.renderOnSaleToggle();
      this.setupMobileDrawer();
    },

    /**
     * Setup mobile filter drawer
     */
    setupMobileDrawer: function() {
      // Create mobile filter button if not exists
      if (!document.getElementById('mobile-filter-toggle')) {
        const mobileBtn = document.createElement('button');
        mobileBtn.id = 'mobile-filter-toggle';
        mobileBtn.innerHTML = '<i class="fas fa-sliders-h text-xl"></i>';
        mobileBtn.setAttribute('aria-label', 'Filter öffnen');
        document.body.appendChild(mobileBtn);

        mobileBtn.addEventListener('click', () => {
          this.openMobileDrawer();
        });
      }

      // Create drawer overlay
      if (!document.querySelector('.filter-drawer-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'filter-drawer-overlay';
        overlay.addEventListener('click', () => {
          this.closeMobileDrawer();
        });
        document.body.appendChild(overlay);
      }

      // Create drawer
      if (!document.querySelector('.filter-drawer')) {
        const sidebar = document.querySelector('aside.filters-sidebar, aside');
        if (sidebar) {
          const drawer = document.createElement('div');
          drawer.className = 'filter-drawer';
          drawer.innerHTML = `
            <div class="filter-drawer-header">
              <h2><i class="fas fa-filter mr-2"></i>Filter</h2>
              <button class="filter-drawer-close" aria-label="Schließen">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="filter-drawer-content">
              ${sidebar.innerHTML}
            </div>
          `;
          document.body.appendChild(drawer);

          // Close button
          drawer.querySelector('.filter-drawer-close').addEventListener('click', () => {
            this.closeMobileDrawer();
          });

          // Re-attach event listeners to drawer content
          this.attachDrawerEventListeners();
        }
      }
    },

    /**
     * Attach event listeners to drawer elements
     */
    attachDrawerEventListeners: function() {
      const drawer = document.querySelector('.filter-drawer');
      if (!drawer) return;

      // Brand checkboxes
      drawer.querySelectorAll('input[name="brand"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          this.updateBrandFilter();
          // Sync with main sidebar
          const mainCheckbox = document.querySelector(`aside input[name="brand"][value="${checkbox.value}"]`);
          if (mainCheckbox) mainCheckbox.checked = checkbox.checked;
        });
      });

      // Price range
      const priceRange = drawer.querySelector('#price-range');
      const priceValue = drawer.querySelector('#price-value');
      if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
          const value = e.target.value;
          priceValue.textContent = value + ' €';
          this.state.maxPrice = parseInt(value);
          // Sync with main sidebar
          const mainRange = document.querySelector('aside #price-range');
          const mainValue = document.querySelector('aside #price-value');
          if (mainRange) mainRange.value = value;
          if (mainValue) mainValue.textContent = value + ' €';
        });

        priceRange.addEventListener('change', () => {
          this.triggerFilterUpdate();
        });
      }

      // Apply button
      const applyBtn = drawer.querySelector('#apply-filters');
      if (applyBtn) {
        applyBtn.addEventListener('click', () => {
          this.applyFilters();
          this.closeMobileDrawer();
        });
      }

      // Reset button
      const resetBtn = drawer.querySelector('#reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.resetFilters();
        });
      }

      // On-sale checkbox
      const onSaleCheckbox = drawer.querySelector('#onsale-checkbox');
      if (onSaleCheckbox) {
        onSaleCheckbox.addEventListener('change', (e) => {
          this.state.onSale = e.target.checked;
          // Sync with main sidebar
          const mainCheckbox = document.querySelector('aside #onsale-checkbox');
          if (mainCheckbox) mainCheckbox.checked = e.target.checked;
          this.triggerFilterUpdate();
        });
      }
    },

    /**
     * Open mobile drawer
     */
    openMobileDrawer: function() {
      const overlay = document.querySelector('.filter-drawer-overlay');
      const drawer = document.querySelector('.filter-drawer');
      
      if (overlay) overlay.classList.add('active');
      if (drawer) {
        drawer.classList.add('active');
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      }
    },

    /**
     * Close mobile drawer
     */
    closeMobileDrawer: function() {
      const overlay = document.querySelector('.filter-drawer-overlay');
      const drawer = document.querySelector('.filter-drawer');
      
      if (overlay) overlay.classList.remove('active');
      if (drawer) drawer.classList.remove('active');
      // Restore body scroll
      document.body.style.overflow = '';
    },

    /**
     * Load brands dynamically from API
     */
    loadBrandsFromAPI: async function() {
      try {
        // Check cache first
        const now = Date.now();
        if (this.brandsCache && this.brandsCacheTime && (now - this.brandsCacheTime < this.brandsCacheDuration)) {
          console.log('Using cached brands data');
          this.renderBrandFilters(this.brandsCache);
          return;
        }

        const response = await axios.get('/api/brands');
        
        if (response.data && response.data.success && response.data.data) {
          const brands = response.data.data;
          
          // Cache the brands data
          this.brandsCache = brands;
          this.brandsCacheTime = now;
          
          this.renderBrandFilters(brands);
        } else {
          console.warn('No brands data available');
        }
      } catch (error) {
        console.error('Error loading brands:', error);
        // Keep static fallback brands
      }
    },

    /**
     * Render brand checkboxes dynamically
     */
    renderBrandFilters: function(brands) {
      const container = document.getElementById('brand-filters');
      if (!container) return;

      if (brands.length === 0) {
        container.innerHTML = '<p class="text-sm text-gray-500">Keine Marken verfügbar</p>';
        return;
      }

      container.innerHTML = brands.map(brand => `
        <label class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition group">
          <input 
            type="checkbox" 
            name="brand" 
            value="${brand.id}" 
            data-brand-name="${brand.name}"
            class="mr-2 accent-gold w-4 h-4 cursor-pointer" 
          />
          <span class="text-sm text-gray-700 group-hover:text-navy-dark transition flex-1">
            ${brand.name}
          </span>
          <span class="text-xs text-gray-400 ml-2">(${brand.product_count})</span>
        </label>
      `).join('');

      // Attach change listeners
      container.querySelectorAll('input[name="brand"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          this.updateBrandFilter();
        });
      });
    },

    /**
     * Render rating filter buttons
     */
    renderRatingFilter: function() {
      const container = document.getElementById('rating-filters');
      if (!container) {
        // Create rating filter section if not exists
        const brandSection = document.querySelector('#brand-filters').closest('.mb-6');
        const ratingSection = document.createElement('div');
        ratingSection.className = 'mb-6';
        ratingSection.innerHTML = `
          <h3 class="font-semibold mb-3 text-navy-dark flex items-center">
            <i class="fas fa-star mr-2 text-gold"></i>
            Bewertung
          </h3>
          <div id="rating-filters" class="space-y-2">
            <!-- Rating buttons will be inserted here -->
          </div>
        `;
        brandSection.insertAdjacentElement('afterend', ratingSection);
      }

      const ratingContainer = document.getElementById('rating-filters');
      ratingContainer.innerHTML = `
        <button 
          data-rating="0" 
          class="rating-btn w-full text-left px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-gold hover:bg-gold/10 transition flex items-center justify-between"
        >
          <span class="text-sm text-gray-700">Alle Bewertungen</span>
          <i class="fas fa-check text-gold hidden"></i>
        </button>
        <button 
          data-rating="4" 
          class="rating-btn w-full text-left px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-gold hover:bg-gold/10 transition flex items-center justify-between"
        >
          <span class="flex items-center text-sm text-gray-700">
            ${this.renderStars(4)} <span class="ml-2">& höher</span>
          </span>
          <i class="fas fa-check text-gold hidden"></i>
        </button>
        <button 
          data-rating="3" 
          class="rating-btn w-full text-left px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-gold hover:bg-gold/10 transition flex items-center justify-between"
        >
          <span class="flex items-center text-sm text-gray-700">
            ${this.renderStars(3)} <span class="ml-2">& höher</span>
          </span>
          <i class="fas fa-check text-gold hidden"></i>
        </button>
      `;

      // Attach click listeners
      ratingContainer.querySelectorAll('.rating-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const rating = parseInt(btn.dataset.rating);
          this.setRatingFilter(rating);
        });
      });
    },

    /**
     * Render on-sale toggle
     */
    renderOnSaleToggle: function() {
      const container = document.getElementById('onsale-toggle');
      if (!container) {
        // Create on-sale section if not exists
        const ratingSection = document.querySelector('#rating-filters').closest('.mb-6');
        const onSaleSection = document.createElement('div');
        onSaleSection.className = 'mb-6';
        onSaleSection.innerHTML = `
          <h3 class="font-semibold mb-3 text-navy-dark flex items-center">
            <i class="fas fa-tags mr-2 text-gold"></i>
            Angebote
          </h3>
          <div id="onsale-toggle">
            <!-- Toggle will be inserted here -->
          </div>
        `;
        ratingSection.insertAdjacentElement('afterend', onSaleSection);
      }

      const onSaleContainer = document.getElementById('onsale-toggle');
      onSaleContainer.innerHTML = `
        <label class="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-3 rounded-lg border-2 border-gray-200 transition group hover:border-gold">
          <span class="flex items-center text-sm text-gray-700 group-hover:text-navy-dark">
            <i class="fas fa-percentage mr-2 text-red-500"></i>
            Nur reduzierte Artikel
          </span>
          <div class="relative inline-block w-12 h-6">
            <input 
              type="checkbox" 
              id="onsale-checkbox" 
              class="sr-only peer"
            />
            <div class="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-gold transition-colors"></div>
            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
          </div>
        </label>
      `;

      // Attach change listener
      document.getElementById('onsale-checkbox').addEventListener('change', (e) => {
        this.state.onSale = e.target.checked;
        this.triggerFilterUpdate();
      });
    },

    /**
     * Update brand filter state
     */
    updateBrandFilter: function() {
      const checkedBoxes = document.querySelectorAll('input[name="brand"]:checked');
      this.state.brands = Array.from(checkedBoxes).map(cb => cb.value);
      this.triggerFilterUpdate();
    },

    /**
     * Set rating filter
     */
    setRatingFilter: function(rating) {
      this.state.minRating = rating;
      
      // Update UI
      document.querySelectorAll('.rating-btn').forEach(btn => {
        const btnRating = parseInt(btn.dataset.rating);
        const checkIcon = btn.querySelector('i.fa-check');
        
        if (btnRating === rating) {
          btn.classList.add('border-gold', 'bg-gold/20');
          checkIcon.classList.remove('hidden');
        } else {
          btn.classList.remove('border-gold', 'bg-gold/20');
          checkIcon.classList.add('hidden');
        }
      });

      this.triggerFilterUpdate();
    },

    /**
     * Render star icons
     */
    renderStars: function(count) {
      return Array(count).fill().map(() => '<i class="fas fa-star text-gold text-xs"></i>').join('');
    },

    /**
     * Setup event listeners for existing filters
     */
    setupEventListeners: function() {
      // Price range
      const priceRange = document.getElementById('price-range');
      const priceValue = document.getElementById('price-value');
      
      if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
          const value = e.target.value;
          priceValue.textContent = value + ' €';
          this.state.maxPrice = parseInt(value);
        });

        priceRange.addEventListener('change', () => {
          this.triggerFilterUpdate();
        });
      }

      // Apply filters button
      const applyBtn = document.getElementById('apply-filters');
      if (applyBtn) {
        applyBtn.addEventListener('click', () => {
          this.applyFilters();
        });
      }

      // Reset filters button
      const resetBtn = document.getElementById('reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.resetFilters();
        });
      }
    },

    /**
     * Trigger filter update (for live filtering)
     */
    triggerFilterUpdate: function() {
      // Debounce if needed
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }

      this.updateTimeout = setTimeout(() => {
        this.applyFilters();
      }, 300);
    },

    /**
     * Apply filters and reload products
     */
    applyFilters: function() {
      // Update active filter pills
      this.renderActiveFilters();

      // Trigger product reload with filter params
      if (window.ProductsManager && typeof window.ProductsManager.loadProducts === 'function') {
        window.ProductsManager.loadProducts(this.getFilterParams());
      } else {
        console.warn('ProductsManager not available');
      }
    },

    /**
     * Get current filter parameters for API
     */
    getFilterParams: function() {
      const params = {};

      if (this.state.brands.length > 0) {
        params.brand = this.state.brands.join(',');
      }

      if (this.state.minRating > 0) {
        params.minRating = this.state.minRating;
      }

      if (this.state.onSale) {
        params.onSale = true;
      }

      if (this.state.maxPrice < 999) {
        params.maxPrice = this.state.maxPrice;
      }

      if (this.state.minPrice > 0) {
        params.minPrice = this.state.minPrice;
      }

      if (this.state.category) {
        params.category = this.state.category;
      }

      if (this.state.search) {
        params.search = this.state.search;
      }

      return params;
    },

    /**
     * Render active filter pills
     */
    renderActiveFilters: function() {
      const container = document.getElementById('active-filters');
      if (!container) return;

      const pills = [];

      // Brand pills
      this.state.brands.forEach(brandId => {
        const checkbox = document.querySelector(`input[name="brand"][value="${brandId}"]`);
        const brandName = checkbox ? checkbox.dataset.brandName : `Brand ${brandId}`;
        pills.push({
          type: 'brand',
          value: brandId,
          label: brandName,
          icon: 'fa-tag'
        });
      });

      // Rating pill
      if (this.state.minRating > 0) {
        pills.push({
          type: 'rating',
          value: this.state.minRating,
          label: `${this.state.minRating}+ Sterne`,
          icon: 'fa-star'
        });
      }

      // On-sale pill
      if (this.state.onSale) {
        pills.push({
          type: 'onsale',
          value: true,
          label: 'Reduziert',
          icon: 'fa-percentage'
        });
      }

      // Price pill
      if (this.state.maxPrice < 999) {
        pills.push({
          type: 'price',
          value: this.state.maxPrice,
          label: `Bis ${this.state.maxPrice} €`,
          icon: 'fa-euro-sign'
        });
      }

      if (pills.length === 0) {
        container.innerHTML = '';
        container.classList.add('hidden');
        return;
      }

      container.classList.remove('hidden');
      container.innerHTML = pills.map(pill => `
        <div class="filter-pill flex items-center bg-gold/20 text-navy-dark px-4 py-2 rounded-full text-sm font-medium border-2 border-gold/50 hover:border-gold transition">
          <i class="fas ${pill.icon} mr-2"></i>
          <span>${pill.label}</span>
          <button 
            onclick="FilterManager.removePill('${pill.type}', '${pill.value}')" 
            class="ml-2 hover:text-red-600 transition"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      `).join('') + `
        <button 
          onclick="FilterManager.resetFilters()" 
          class="text-sm text-gray-600 hover:text-navy-dark transition underline"
        >
          Alle Filter löschen
        </button>
      `;
    },

    /**
     * Remove individual filter pill
     */
    removePill: function(type, value) {
      switch (type) {
        case 'brand':
          const checkbox = document.querySelector(`input[name="brand"][value="${value}"]`);
          if (checkbox) checkbox.checked = false;
          this.state.brands = this.state.brands.filter(b => b !== value);
          break;
        
        case 'rating':
          this.setRatingFilter(0);
          return; // setRatingFilter already triggers update
        
        case 'onsale':
          document.getElementById('onsale-checkbox').checked = false;
          this.state.onSale = false;
          break;
        
        case 'price':
          document.getElementById('price-range').value = 999;
          document.getElementById('price-value').textContent = '999 €';
          this.state.maxPrice = 999;
          break;
      }

      this.applyFilters();
    },

    /**
     * Reset all filters
     */
    resetFilters: function() {
      // Reset state
      this.state = {
        brands: [],
        minRating: 0,
        onSale: false,
        minPrice: 0,
        maxPrice: 999,
        category: '',
        search: ''
      };

      // Reset UI
      document.querySelectorAll('input[name="brand"]').forEach(cb => cb.checked = false);
      document.getElementById('onsale-checkbox').checked = false;
      document.getElementById('price-range').value = 999;
      document.getElementById('price-value').textContent = '999 €';
      
      this.setRatingFilter(0);
      this.applyFilters();
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.FilterManager.init();
    });
  } else {
    window.FilterManager.init();
  }
})();
