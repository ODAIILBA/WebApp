// Enhanced Cart Management - Backend API Integration

// Get or create session ID
function getSessionId() {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2);
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
}

// Add to cart using backend API - Make it global
window.addToCart = async function(productId, quantity = 1) {
  try {
    const sessionId = getSessionId();
    
    // Call backend API to add item to cart
    const response = await axios.post('/api/cart/items', {
      product_id: productId,
      quantity: quantity
    }, {
      headers: {
        'X-Session-ID': sessionId,
        'Content-Type': 'application/json'
      }
    });

    if (!response.data.success) {
      showNotification('Fehler beim Hinzufügen zum Warenkorb', 'error');
      return;
    }

    // Update cart counter from API response
    const cart = response.data.cart;
    updateCartCounter(cart.item_count);

    // Show success notification
    showNotification('Produkt wurde zum Warenkorb hinzugefügt!', 'success');

  } catch (error) {
    console.error('Error adding to cart:', error);
    if (error.response?.data?.error) {
      showNotification(error.response.data.error, 'error');
    } else {
      showNotification('Fehler beim Hinzufügen zum Warenkorb', 'error');
    }
  }
}

// Update cart counter
function updateCartCounter(itemCount) {
  const countElements = document.querySelectorAll('#cart-count, #cart-badge, .cart-count');
  countElements.forEach(el => {
    if (el) el.textContent = itemCount || 0;
  });
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed top-20 right-4 px-6 py-4 rounded-lg shadow-xl text-white z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
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
    notification.remove();
  }, 3000);
}

// Load cart from backend and initialize counter
async function initCartCounter() {
  try {
    const sessionId = getSessionId();
    
    const response = await axios.get('/api/cart', {
      headers: {
        'X-Session-ID': sessionId
      }
    });
    
    if (response.data.success) {
      updateCartCounter(response.data.cart.item_count);
    }
  } catch (error) {
    console.error('Error loading cart:', error);
    updateCartCounter(0);
  }
}

// Call on page load
document.addEventListener('DOMContentLoaded', initCartCounter);
