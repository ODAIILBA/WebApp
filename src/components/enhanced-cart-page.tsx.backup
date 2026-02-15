// Enhanced Shopping Cart Component with full functionality
import type { FC } from 'hono/jsx'

export const EnhancedCartPage: FC = () => {
  return (
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Warenkorb - SoftwareKing24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-50">
        {/* Header */}
        <header class="bg-white shadow-sm border-b">
          <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
              <a href="/" class="text-2xl font-bold text-blue-600">
                <i class="fas fa-shopping-bag mr-2"></i>
                SoftwareKing24
              </a>
              <nav class="hidden md:flex items-center space-x-6">
                <a href="/products" class="text-gray-700 hover:text-blue-600">Produkte</a>
                <a href="/cart" class="text-blue-600 font-semibold">
                  <i class="fas fa-shopping-cart mr-1"></i>
                  Warenkorb
                </a>
                <a href="/login" class="text-gray-700 hover:text-blue-600">Login</a>
              </nav>
            </div>
          </div>
        </header>

        <main class="container mx-auto px-4 py-8">
          <div class="max-w-6xl mx-auto">
            {/* Page Title */}
            <div class="mb-8">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                <i class="fas fa-shopping-cart mr-3 text-blue-600"></i>
                Ihr Warenkorb
              </h1>
              <p class="text-gray-600">
                <span id="cart-item-count">0</span> Artikel in Ihrem Warenkorb
              </p>
            </div>

            {/* Cart Content */}
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div class="lg:col-span-2">
                {/* Empty Cart Message */}
                <div id="empty-cart" class="bg-white rounded-lg shadow-md p-8 text-center">
                  <i class="fas fa-shopping-cart text-gray-300 text-6xl mb-4"></i>
                  <h2 class="text-xl font-semibold text-gray-800 mb-2">Ihr Warenkorb ist leer</h2>
                  <p class="text-gray-600 mb-6">Fügen Sie Produkte hinzu, um mit dem Einkauf zu beginnen</p>
                  <a href="/products" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    <i class="fas fa-shopping-bag mr-2"></i>
                    Produkte entdecken
                  </a>
                </div>

                {/* Cart Items List */}
                <div id="cart-items" class="space-y-4 hidden">
                  {/* Items will be loaded here dynamically */}
                </div>
              </div>

              {/* Order Summary */}
              <div class="lg:col-span-1">
                <div id="order-summary" class="bg-white rounded-lg shadow-md p-6 sticky top-4 hidden">
                  <h2 class="text-xl font-bold text-gray-900 mb-4">Bestellübersicht</h2>
                  
                  <div class="space-y-3 mb-4 pb-4 border-b">
                    <div class="flex justify-between text-gray-700">
                      <span>Zwischensumme:</span>
                      <span id="subtotal">€0.00</span>
                    </div>
                    <div class="flex justify-between text-gray-700">
                      <span>MwSt. (19%):</span>
                      <span id="tax">€0.00</span>
                    </div>
                  </div>
                  
                  <div class="flex justify-between text-xl font-bold text-gray-900 mb-6">
                    <span>Gesamt:</span>
                    <span id="total">€0.00</span>
                  </div>
                  
                  <button id="checkout-btn" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold mb-3">
                    <i class="fas fa-lock mr-2"></i>
                    Zur Kasse gehen
                  </button>
                  
                  <button id="continue-shopping" class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition">
                    <i class="fas fa-arrow-left mr-2"></i>
                    Weiter einkaufen
                  </button>

                  {/* Trust Badges */}
                  <div class="mt-6 pt-6 border-t">
                    <div class="text-sm text-gray-600 space-y-2">
                      <div class="flex items-center">
                        <i class="fas fa-shield-alt text-green-600 mr-2"></i>
                        <span>Sichere Zahlung</span>
                      </div>
                      <div class="flex items-center">
                        <i class="fas fa-truck text-green-600 mr-2"></i>
                        <span>Sofortiger Download</span>
                      </div>
                      <div class="flex items-center">
                        <i class="fas fa-headset text-green-600 mr-2"></i>
                        <span>24/7 Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Cart Item Template */}
        <template id="cart-item-template">
          <div class="cart-item bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4">
            <div class="flex-shrink-0">
              <div class="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <i class="fas fa-box text-gray-400 text-3xl"></i>
              </div>
            </div>
            
            <div class="flex-grow">
              <h3 class="font-semibold text-gray-900 mb-1 item-name">Product Name</h3>
              <p class="text-sm text-gray-600 mb-2">SKU: <span class="item-sku">-</span></p>
              
              <div class="flex items-center gap-4">
                <div class="flex items-center border rounded-lg">
                  <button class="qty-decrease px-3 py-1 hover:bg-gray-100 transition">
                    <i class="fas fa-minus text-sm"></i>
                  </button>
                  <input type="number" class="qty-input w-16 text-center border-x py-1" value="1" min="1" />
                  <button class="qty-increase px-3 py-1 hover:bg-gray-100 transition">
                    <i class="fas fa-plus text-sm"></i>
                  </button>
                </div>
                
                <button class="remove-item text-red-600 hover:text-red-700 transition">
                  <i class="fas fa-trash mr-1"></i>
                  Entfernen
                </button>
              </div>
            </div>
            
            <div class="text-right md:text-left">
              <div class="text-sm text-gray-500 line-through item-original-price"></div>
              <div class="text-xl font-bold text-blue-600 item-price">€0.00</div>
              <div class="text-sm text-green-600 item-discount"></div>
            </div>
          </div>
        </template>

        <script>{`
          // Session ID management
          let sessionId = localStorage.getItem('cartSessionId')
          if (!sessionId) {
            sessionId = 'guest-' + Math.random().toString(36).substr(2, 9)
            localStorage.setItem('cartSessionId', sessionId)
          }

          // Load cart on page load
          document.addEventListener('DOMContentLoaded', () => {
            loadCart()
            
            // Event listeners
            document.getElementById('checkout-btn')?.addEventListener('click', () => {
              window.location.href = '/checkout'
            })
            
            document.getElementById('continue-shopping')?.addEventListener('click', () => {
              window.location.href = '/products'
            })
          })

          async function loadCart() {
            try {
              const response = await fetch('/api/cart', {
                headers: { 'X-Session-ID': sessionId }
              })
              
              const data = await response.json()
              
              if (data.success) {
                renderCart(data.cart)
              } else {
                console.error('Failed to load cart:', data.error)
              }
            } catch (error) {
              console.error('Error loading cart:', error)
            }
          }

          function renderCart(cart) {
            const emptyCart = document.getElementById('empty-cart')
            const cartItems = document.getElementById('cart-items')
            const orderSummary = document.getElementById('order-summary')
            const itemCount = document.getElementById('cart-item-count')
            
            if (cart.items.length === 0) {
              emptyCart.classList.remove('hidden')
              cartItems.classList.add('hidden')
              orderSummary.classList.add('hidden')
            } else {
              emptyCart.classList.add('hidden')
              cartItems.classList.remove('hidden')
              orderSummary.classList.remove('hidden')
              
              // Clear existing items
              cartItems.innerHTML = ''
              
              // Render each item
              cart.items.forEach(item => {
                const itemEl = createCartItem(item)
                cartItems.appendChild(itemEl)
              })
              
              // Update summary
              itemCount.textContent = cart.itemCount
              document.getElementById('subtotal').textContent = '€' + cart.subtotal
              document.getElementById('tax').textContent = '€' + cart.tax
              document.getElementById('total').textContent = '€' + cart.total
            }
          }

          function createCartItem(item) {
            const template = document.getElementById('cart-item-template')
            const clone = template.content.cloneNode(true)
            
            clone.querySelector('.item-name').textContent = item.name
            clone.querySelector('.item-sku').textContent = item.slug
            clone.querySelector('.item-price').textContent = '€' + item.price.toFixed(2)
            clone.querySelector('.qty-input').value = item.quantity
            
            if (item.discount_price && item.discount_price < item.base_price) {
              clone.querySelector('.item-original-price').textContent = '€' + item.base_price.toFixed(2)
              const discount = Math.round(((item.base_price - item.discount_price) / item.base_price) * 100)
              clone.querySelector('.item-discount').textContent = discount + '% Rabatt'
            } else {
              clone.querySelector('.item-original-price').remove()
              clone.querySelector('.item-discount').remove()
            }
            
            // Event listeners
            const qtyInput = clone.querySelector('.qty-input')
            clone.querySelector('.qty-decrease').addEventListener('click', () => {
              const newQty = Math.max(1, parseInt(qtyInput.value) - 1)
              updateQuantity(item.id, newQty)
            })
            
            clone.querySelector('.qty-increase').addEventListener('click', () => {
              const newQty = parseInt(qtyInput.value) + 1
              updateQuantity(item.id, newQty)
            })
            
            qtyInput.addEventListener('change', () => {
              const newQty = Math.max(1, parseInt(qtyInput.value))
              updateQuantity(item.id, newQty)
            })
            
            clone.querySelector('.remove-item').addEventListener('click', () => {
              removeItem(item.id)
            })
            
            return clone
          }

          async function updateQuantity(itemId, quantity) {
            try {
              const response = await fetch(\`/api/cart/update/\${itemId}\`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Session-ID': sessionId
                },
                body: JSON.stringify({ quantity })
              })
              
              const data = await response.json()
              
              if (data.success) {
                loadCart() // Reload cart
              } else {
                alert('Fehler beim Aktualisieren: ' + data.error)
              }
            } catch (error) {
              console.error('Error updating quantity:', error)
              alert('Fehler beim Aktualisieren')
            }
          }

          async function removeItem(itemId) {
            if (!confirm('Möchten Sie diesen Artikel wirklich entfernen?')) {
              return
            }
            
            try {
              const response = await fetch(\`/api/cart/remove/\${itemId}\`, {
                method: 'DELETE',
                headers: { 'X-Session-ID': sessionId }
              })
              
              const data = await response.json()
              
              if (data.success) {
                loadCart() // Reload cart
              } else {
                alert('Fehler beim Entfernen: ' + data.error)
              }
            } catch (error) {
              console.error('Error removing item:', error)
              alert('Fehler beim Entfernen')
            }
          }
        `}</script>
      </body>
    </html>
  )
}
