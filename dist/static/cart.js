// SOFTWAREKING24 - Shopping Cart System
// Handles all cart operations with localStorage persistence

class ShoppingCart {
  constructor() {
    this.cart = this.loadCart();
    this.init();
  }

  // Initialize cart system
  init() {
    this.updateCartBadge();
    this.attachEventListeners();
  }

  // Load cart from localStorage
  loadCart() {
    const saved = localStorage.getItem('softwareking24_cart');
    return saved ? JSON.parse(saved) : [];
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem('softwareking24_cart', JSON.stringify(this.cart));
    this.updateCartBadge();
  }

  // Add item to cart
  addToCart(product) {
    const existing = this.cart.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        image: product.image || '/static/products/default.png',
        quantity: 1
      });
    }
    
    this.saveCart();
    this.showNotification(`${product.name} wurde zum Warenkorb hinzugefügt!`, 'success');
    return true;
  }

  // Remove item from cart
  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.showNotification('Produkt wurde entfernt', 'info');
  }

  // Update item quantity
  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
    }
  }

  // Get cart items
  getCart() {
    return this.cart;
  }

  // Get cart count
  getCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Get cart total
  getTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Clear cart
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // Update cart badge
  updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge, [data-cart-count]');
    const count = this.getCount();
    
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // Show notification
  showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `cart-notification cart-notification-${type}`;
    notification.innerHTML = `
      <div class="cart-notification-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Attach event listeners to "Add to Cart" buttons
  attachEventListeners() {
    document.addEventListener('click', (e) => {
      // Handle add to cart buttons
      if (e.target.closest('[data-add-to-cart]')) {
        e.preventDefault();
        const button = e.target.closest('[data-add-to-cart]');
        const productId = button.dataset.productId || button.dataset.addToCart;
        const productName = button.dataset.productName || 'Produkt';
        const productPrice = parseFloat(button.dataset.productPrice || 0);
        const productOriginalPrice = parseFloat(button.dataset.productOriginalPrice || 0);
        const productDiscount = button.dataset.productDiscount || '';
        
        this.addToCart({
          id: productId,
          name: productName,
          price: productPrice,
          originalPrice: productOriginalPrice,
          discount: productDiscount
        });
      }

      // Handle cart page actions
      if (e.target.closest('[data-remove-item]')) {
        const productId = e.target.closest('[data-remove-item]').dataset.removeItem;
        this.removeFromCart(productId);
        this.renderCartPage();
      }

      if (e.target.closest('[data-quantity-plus]')) {
        const productId = e.target.closest('[data-quantity-plus]').dataset.quantityPlus;
        const item = this.cart.find(i => i.id === productId);
        if (item) {
          this.updateQuantity(productId, item.quantity + 1);
          this.renderCartPage();
        }
      }

      if (e.target.closest('[data-quantity-minus]')) {
        const productId = e.target.closest('[data-quantity-minus]').dataset.quantityMinus;
        const item = this.cart.find(i => i.id === productId);
        if (item && item.quantity > 1) {
          this.updateQuantity(productId, item.quantity - 1);
          this.renderCartPage();
        }
      }
    });
  }

  // Render cart page (if on /cart)
  renderCartPage() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;

    if (this.cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="text-center py-12">
          <i class="fas fa-shopping-cart text-gray-400 text-6xl mb-4"></i>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Dein Warenkorb ist leer</h2>
          <p class="text-gray-600 mb-6">Füge Produkte hinzu, um fortzufahren</p>
          <a href="/" class="btn-primary">Zum Shop</a>
        </div>
      `;
      return;
    }

    const total = this.getTotal();
    const itemsHTML = this.cart.map(item => `
      <div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
        <div class="flex-1">
          <h3 class="font-bold text-gray-900">${item.name}</h3>
          <p class="text-gray-600">€${item.price.toFixed(2)}</p>
        </div>
        <div class="flex items-center gap-2">
          <button data-quantity-minus="${item.id}" class="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300">
            <i class="fas fa-minus"></i>
          </button>
          <span class="w-12 text-center font-bold">${item.quantity}</span>
          <button data-quantity-plus="${item.id}" class="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="text-right">
          <p class="font-bold text-lg">€${(item.price * item.quantity).toFixed(2)}</p>
          <button data-remove-item="${item.id}" class="text-red-600 hover:text-red-800 text-sm">
            <i class="fas fa-trash"></i> Entfernen
          </button>
        </div>
      </div>
    `).join('');

    cartContainer.innerHTML = `
      <div class="space-y-4 mb-8">
        ${itemsHTML}
      </div>
      <div class="bg-gray-50 p-6 rounded-lg">
        <div class="flex justify-between text-xl font-bold mb-4">
          <span>Gesamt:</span>
          <span>€${total.toFixed(2)}</span>
        </div>
        <button onclick="window.location.href='/checkout'" class="btn-primary w-full">
          Zur Kasse
        </button>
      </div>
    `;
  }
}

// Initialize cart system
window.cart = new ShoppingCart();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShoppingCart;
}
