/**
 * Homepage Products Dynamic Loader
 * Fetches and displays products from the database
 */

class HomepageProductsLoader {
  constructor() {
    this.productsCache = {
      bestsellers: null,
      featured: null,
      new: null
    }
    this.init()
  }
  
  async init() {
    // Load all product sections
    await Promise.all([
      this.loadBestsellers(),
      this.loadFeaturedProducts(),
      this.loadNewProducts()
    ])
  }
  
  async loadBestsellers() {
    try {
      const response = await fetch('/api/homepage/products?section=bestsellers')
      const data = await response.json()
      
      if (data.success && data.data.length > 0) {
        this.productsCache.bestsellers = data.data
        this.renderBestsellers(data.data)
      }
    } catch (error) {
      console.error('Error loading bestsellers:', error)
    }
  }
  
  async loadFeaturedProducts() {
    try {
      const response = await fetch('/api/homepage/products?section=featured')
      const data = await response.json()
      
      if (data.success && data.data.length > 0) {
        this.productsCache.featured = data.data
        this.renderFeaturedProducts(data.data)
      }
    } catch (error) {
      console.error('Error loading featured products:', error)
    }
  }
  
  async loadNewProducts() {
    try {
      const response = await fetch('/api/homepage/products?section=new')
      const data = await response.json()
      
      if (data.success && data.data.length > 0) {
        this.productsCache.new = data.data
        this.renderNewProducts(data.data)
      }
    } catch (error) {
      console.error('Error loading new products:', error)
    }
  }
  
  renderBestsellers(products) {
    const container = document.getElementById('bestsellers-container')
    if (!container) return
    
    container.innerHTML = products.map(product => this.createProductCard(product, 'bestseller')).join('')
  }
  
  renderFeaturedProducts(products) {
    const container = document.getElementById('featured-products-container')
    if (!container) return
    
    container.innerHTML = products.map(product => this.createProductCard(product, 'featured')).join('')
  }
  
  renderNewProducts(products) {
    const container = document.getElementById('new-products-container')
    if (!container) return
    
    container.innerHTML = products.map(product => this.createProductCard(product, 'new')).join('')
  }
  
  createProductCard(product, type = '') {
    const discountBadge = product.discount_percentage > 0 ? `
      <div class="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
        -${product.discount_percentage}%
      </div>
    ` : ''
    
    const newBadge = product.is_new ? `
      <div class="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
        <i class="fas fa-star mr-1"></i>NEU
      </div>
    ` : ''
    
    const bestseller Badge = product.is_bestseller ? `
      <div class="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
        <i class="fas fa-fire mr-1"></i>BESTSELLER
      </div>
    ` : ''
    
    const rating = product.rating ? `
      <div class="flex items-center gap-2 mb-2">
        <div class="flex text-gold">
          ${this.renderStars(product.rating)}
        </div>
        <span class="text-sm text-gray-600">(${product.review_count || 0})</span>
      </div>
    ` : ''
    
    const priceDisplay = product.discount_price ? `
      <div class="mb-3">
        <span class="text-2xl font-bold text-gray-900">${this.formatPrice(product.discount_price)}</span>
        <span class="text-lg text-gray-500 line-through ml-2">${this.formatPrice(product.base_price)}</span>
      </div>
    ` : `
      <div class="mb-3">
        <span class="text-2xl font-bold text-gray-900">${this.formatPrice(product.base_price)}</span>
      </div>
    `
    
    return `
      <div class="product-card hover-enhanced bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
        <a href="/produkte/${product.slug}" class="block">
          <div class="relative overflow-hidden" style="padding-top: 66.67%;">
            ${discountBadge}
            ${type === 'new' ? newBadge : type === 'bestseller' ? bestsellerBadge : ''}
            <img 
              src="${product.image_url || 'https://placehold.co/600x400/1a2a4e/d4af37?text=' + encodeURIComponent(product.name)}" 
              alt="${product.name}"
              class="absolute inset-0 w-full h-full object-cover lazy-image"
              loading="lazy"
            />
          </div>
          
          <div class="p-6">
            ${product.brand_name ? `
              <div class="text-sm text-gray-500 mb-2 font-medium">${product.brand_name}</div>
            ` : ''}
            
            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              ${product.name}
            </h3>
            
            ${product.short_description ? `
              <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                ${product.short_description}
              </p>
            ` : ''}
            
            ${rating}
            ${priceDisplay}
            
            <button 
              onclick="addToCart(${product.id}, 1); event.preventDefault(); event.stopPropagation();"
              class="w-full bg-gold hover:bg-gold-light text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover-lift">
              <i class="fas fa-shopping-cart"></i>
              In den Warenkorb
            </button>
          </div>
        </a>
      </div>
    `
  }
  
  renderStars(rating) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    
    let stars = ''
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>'
    }
    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>'
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>'
    }
    return stars
  }
  
  formatPrice(price) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new HomepageProductsLoader()
  })
} else {
  new HomepageProductsLoader()
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HomepageProductsLoader
}
