/**
 * Global Cart Manager for SoftwareKing24
 * Backend API Integration - Persistent cart storage
 */

class CartManager {
  constructor() {
    this.cart = null;
    this.sessionId = this.getSessionId();
    this.initializeCart();
  }

  // Get or create session ID
  getSessionId() {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2);
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  }

  // Initialize cart from backend
  async initializeCart() {
    try {
      const response = await axios.get('/api/cart', {
        headers: { 'X-Session-ID': this.sessionId }
      });
      
      if (response.data.success) {
        this.cart = response.data.cart;
        this.updateCartCounters();
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      this.cart = {
        items: [],
        subtotal: 0,
        total: 0,
        item_count: 0
      };
    }
  }

  // Add product to cart using backend API
  async addToCart(productId, quantity = 1) {
    try {
      const response = await axios.post('/api/cart/items', {
        product_id: productId,
        quantity: quantity
      }, {
        headers: {
          'X-Session-ID': this.sessionId,
          'Content-Type': 'application/json'
        }
      });

      if (!response.data.success) {
        this.showNotification(response.data.error || 'Fehler beim Hinzufügen zum Warenkorb', 'error');
        return false;
      }

      this.cart = response.data.cart;
      this.updateCartCounters();
      this.showNotification('Produkt wurde zum Warenkorb hinzugefügt!', 'success');
      return true;

    } catch (error) {
      console.error('Error adding to cart:', error);
      const errorMsg = error.response?.data?.error || 'Fehler beim Hinzufügen zum Warenkorb';
      this.showNotification(errorMsg, 'error');
      return false;
    }
  }

  // Update item quantity
  async updateQuantity(itemId, quantity) {
    try {
      const response = await axios.put(`/api/cart/items/${itemId}`, {
        quantity: quantity
      }, {
        headers: {
          'X-Session-ID': this.sessionId,
          'Content-Type': 'application/json'
        }
      });

      if (!response.data.success) {
        this.showNotification('Fehler beim Aktualisieren der Menge', 'error');
        return false;
      }

      this.cart = response.data.cart;
      this.updateCartCounters();
      return true;

    } catch (error) {
      console.error('Error updating quantity:', error);
      this.showNotification('Fehler beim Aktualisieren der Menge', 'error');
      return false;
    }
  }

  // Remove item from cart
  async removeItem(itemId) {
    try {
      const response = await axios.delete(`/api/cart/items/${itemId}`, {
        headers: { 'X-Session-ID': this.sessionId }
      });

      if (!response.data.success) {
        this.showNotification('Fehler beim Entfernen des Produkts', 'error');
        return false;
      }

      this.cart = response.data.cart;
      this.updateCartCounters();
      this.showNotification('Produkt wurde entfernt', 'success');
      return true;

    } catch (error) {
      console.error('Error removing item:', error);
      this.showNotification('Fehler beim Entfernen des Produkts', 'error');
      return false;
    }
  }

  // Clear entire cart
  async clearCart() {
    try {
      const response = await axios.delete('/api/cart', {
        headers: { 'X-Session-ID': this.sessionId }
      });

      if (!response.data.success) {
        this.showNotification('Fehler beim Leeren des Warenkorbs', 'error');
        return false;
      }

      this.cart = response.data.cart;
      this.updateCartCounters();
      this.showNotification('Warenkorb wurde geleert', 'success');
      return true;

    } catch (error) {
      console.error('Error clearing cart:', error);
      this.showNotification('Fehler beim Leeren des Warenkorbs', 'error');
      return false;
    }
  }

  // Get current cart
  async getCart() {
    try {
      const response = await axios.get('/api/cart', {
        headers: { 'X-Session-ID': this.sessionId }
      });
      
      if (response.data.success) {
        this.cart = response.data.cart;
        return this.cart;
      }
      return null;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return null;
    }
  }

  // Update cart counters in UI
  updateCartCounters() {
    const itemCount = this.cart?.item_count || 0;
    const countElements = document.querySelectorAll('#cart-count, #cart-badge, .cart-count');
    countElements.forEach(el => {
      if (el) el.textContent = itemCount;
    });
  }

  // Show notification
  showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.cart-notification');
    existing.forEach(el => el.remove());

    const notification = document.createElement('div');
    notification.className = `cart-notification fixed top-20 right-4 px-6 py-4 rounded-lg shadow-xl text-white z-50 transition-all ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} text-xl"></i>
        <div>
          <p class="font-bold">${type === 'success' ? 'Erfolg!' : 'Fehler'}</p>
          <p class="text-sm">${message}</p>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Initialize cart counters on page load
  initializeCartCounters() {
    this.updateCartCounters();
  }
}

// Global cart manager instance
const cartManager = new CartManager();

// Legacy function for backward compatibility - Make it global
window.addToCart = async function(productId, quantity = 1) {
  return await cartManager.addToCart(productId, quantity);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  cartManager.initializeCart();
});
