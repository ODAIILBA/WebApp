// Add to Cart Button Component - Include this in product pages
export const AddToCartScript = () => `
<script>
  // Session ID management
  let sessionId = localStorage.getItem('cartSessionId')
  if (!sessionId) {
    sessionId = 'guest-' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('cartSessionId', sessionId)
  }

  // Add to cart function
  async function addToCart(productId, quantity = 1, event = null) {
    // Get button from event or window.event (for onclick handlers)
    const target = event?.target || window.event?.target
    const button = target?.tagName === 'BUTTON' ? target : target?.closest('button')
    
    if (button) {
      button.disabled = true
      button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wird hinzugefügt...'
    }

    try {
      const response = await fetch('/api/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity
        })
      })

      const data = await response.json()

      if (data.success) {
        // Show success message
        showNotification('✓ ' + (data.product_name || 'Produkt') + ' wurde zum Warenkorb hinzugefügt!', 'success')
        
        // Update cart count in header
        updateCartCount()
        
        // Reset button
        if (button) {
          button.disabled = false
          button.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb'
        }
      } else {
        showNotification('❌ Fehler: ' + data.error, 'error')
        if (button) {
          button.disabled = false
          button.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb'
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      showNotification('❌ Fehler beim Hinzufügen zum Warenkorb', 'error')
      if (button) {
        button.disabled = false
        button.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb'
      }
    }
  }

  // Update cart count in header
  async function updateCartCount() {
    try {
      const response = await fetch('/api/cart', {
        headers: { 'X-Session-ID': sessionId }
      })
      const data = await response.json()
      
      if (data.success) {
        const cartCount = document.querySelector('.cart-count')
        if (cartCount) {
          cartCount.textContent = data.cart.item_count || data.cart.itemCount || 0
          if ((data.cart.item_count || data.cart.itemCount || 0) > 0) {
            cartCount.classList.remove('hidden')
          }
        }
      }
    } catch (error) {
      console.error('Error updating cart count:', error)
    }
  }

  // Show notification
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.cart-notification').forEach(el => el.remove())

    const notification = document.createElement('div')
    notification.className = 'cart-notification fixed top-4 right-4 z-50 max-w-md animate-fade-in'
    
    const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    
    notification.innerHTML = \`
      <div class="\${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between">
        <span>\${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
          <i class="fas fa-times"></i>
        </button>
      </div>
    \`
    
    document.body.appendChild(notification)
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.remove()
    }, 5000)
  }

  // Initialize cart count on page load
  document.addEventListener('DOMContentLoaded', updateCartCount)
</script>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
</style>
`
