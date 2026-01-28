/**
 * Global Cart Manager for SoftwareKing24
 * Handles cart operations across all pages
 */

class CartManager {
  constructor() {
    this.VAT_RATE = 0.19;
    this.cart = this.loadCart();
    this.initializeCartCounters();
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (e) {
      console.error('Error loading cart:', e);
    }
    return {
      items: [],
      subtotal: 0,
      vat: 0,
      total: 0,
      discount: 0,
      coupon: null
    };
  }

  // Save cart to localStorage
  saveCart() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateCartCounters();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  // Get session ID
  getSessionId() {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substring(7);
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  // Calculate totals
  calculateTotals() {
    this.cart.subtotal = this.cart.items.reduce((sum, item) => {
      const price = item.product.sale_price || item.product.price;
      return sum + (price * item.quantity);
    }, 0);

    // Apply discount
    if (this.cart.coupon) {
      this.cart.discount = Math.round((this.cart.subtotal * this.cart.coupon.discount) / 100);
    } else {
      this.cart.discount = 0;
    }

    const afterDiscount = this.cart.subtotal - this.cart.discount;
    this.cart.vat = Math.round(afterDiscount * this.VAT_RATE);
    this.cart.total = afterDiscount + this.cart.vat;
  }

  // Add product to cart
  async addToCart(productId, quantity = 1, licenseType = 'single') {
    try {
      // Fetch product details using the ID-specific endpoint
      const response = await axios.get('/api/products/id/' + productId);
      if (!response.data.success) {
        this.showNotification('Produkt konnte nicht geladen werden', 'error');
        return false;
      }

      const product = response.data.data;

      // Check if product already in cart
      const existingIndex = this.cart.items.findIndex(
        item => item.product.id === productId && item.licenseType === licenseType
      );

      if (existingIndex >= 0) {
        // Update quantity
        this.cart.items[existingIndex].quantity += quantity;
      } else {
        // Add new item
        this.cart.items.push({
          product: product,
          quantity: quantity,
          licenseType: licenseType
        });
      }

      this.calculateTotals();
      this.saveCart();
      this.showNotification('Produkt wurde zum Warenkorb hinzugefügt!', 'success');
      return true;

    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showNotification('Fehler beim Hinzufügen zum Warenkorb', 'error');
      return false;
    }
  }

  // Update quantity
  updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
      this.removeItem(index);
      return;
    }

    this.cart.items[index].quantity = newQuantity;
    this.calculateTotals();
    this.saveCart();
  }

  // Remove item
  removeItem(index) {
    this.cart.items.splice(index, 1);
    this.calculateTotals();
    this.saveCart();
  }

  // Apply coupon
  applyCoupon(code) {
    const validCoupons = {
      'SAVE10': { code: 'SAVE10', discount: 10 },
      'SAVE20': { code: 'SAVE20', discount: 20 },
      'WELCOME': { code: 'WELCOME', discount: 15 }
    };

    if (validCoupons[code.toUpperCase()]) {
      this.cart.coupon = validCoupons[code.toUpperCase()];
      this.calculateTotals();
      this.saveCart();
      return true;
    }
    return false;
  }

  // Remove coupon
  removeCoupon() {
    this.cart.coupon = null;
    this.cart.discount = 0;
    this.calculateTotals();
    this.saveCart();
  }

  // Clear cart
  clearCart() {
    this.cart = {
      items: [],
      subtotal: 0,
      vat: 0,
      total: 0,
      discount: 0,
      coupon: null
    };
    this.saveCart();
  }

  // Get cart item count
  getItemCount() {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Update cart counters in UI
  updateCartCounters() {
    const count = this.getItemCount();
    const elements = document.querySelectorAll('[data-cart-count]');
    elements.forEach(el => {
      el.textContent = count;
      if (count > 0) {
        el.classList.remove('hidden');
      }
    });
  }

  // Initialize cart counters
  initializeCartCounters() {
    this.updateCartCounters();
  }

  // Show notification
  showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.cart-notification');
    existing.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `cart-notification fixed top-20 right-4 px-6 py-4 rounded-lg shadow-2xl text-white z-[9999] animate-slide-in ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.style.animation = 'slideInRight 0.3s ease-out';
    
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} text-2xl"></i>
        <div>
          <p class="font-bold">${type === 'success' ? 'Erfolg!' : 'Fehler'}</p>
          <p class="text-sm">${message}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Format price
  static formatPrice(cents) {
    return (cents / 100).toFixed(2).replace('.', ',') + ' €';
  }
}

// Create global cart manager instance
window.cartManager = new CartManager();

// Global helper functions
window.addToCart = async function(productId, quantity = 1, licenseType = 'single') {
  return await window.cartManager.addToCart(productId, quantity, licenseType);
};

window.formatPrice = CartManager.formatPrice;

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

console.log('✅ CartManager initialized');
