// Product Detail Page Component
import type { FC } from 'hono/jsx'
import type { ProductWithDetails } from '../types'

interface ProductDetailProps {
  product: ProductWithDetails
  language: string
}

export const ProductDetail: FC<ProductDetailProps> = ({ product, language }) => {
  const features = product.features ? JSON.parse(product.features) : []
  const compatibility = product.compatibility ? JSON.parse(product.compatibility) : []
  
  return (
    <div>
      {/* Breadcrumb */}
      <div class="bg-gray-100 py-3">
        <div class="container mx-auto px-4">
          <nav class="text-sm">
            <a href="/" class="text-gray-600 hover:text-primary">Home</a>
            <span class="mx-2 text-gray-400">/</span>
            <a href={`/categories/${product.category?.slug || ''}`} class="text-gray-600 hover:text-primary">
              {product.category?.name || 'Category'}
            </a>
            <span class="mx-2 text-gray-400">/</span>
            <span class="text-gray-800">{product.name}</span>
          </nav>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <div class="grid md:grid-cols-3 gap-8">
          {/* Left Column - Product Image */}
          <div class="md:col-span-1">
            <div class="sticky top-4">
              <div class="bg-white rounded-lg shadow-lg overflow-hidden gold-border">
                <img 
                  src={product.image_url || `https://via.placeholder.com/400x300/1a2a4e/d4af37?text=${encodeURIComponent(product.name)}`}
                  alt={product.name}
                  class="w-full h-auto"
                />
                
                {product.discount_percentage > 0 && (
                  <div class="absolute top-4 right-4 discount-badge px-4 py-2 rounded-full text-lg font-bold">
                    -{product.discount_percentage}%
                  </div>
                )}
                
                <div class="absolute top-4 left-4 bg-gold text-primary px-3 py-2 rounded-lg font-bold">
                  <i class="fas fa-bolt mr-2"></i>
                  INSTANT DELIVERY
                </div>
              </div>

              {/* Trust Badges */}
              <div class="mt-6 bg-white rounded-lg shadow-lg p-4">
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-shield-alt text-green-500 text-xl"></i>
                    <span class="text-sm">100% Genuine License</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <i class="fas fa-clock text-blue-500 text-xl"></i>
                    <span class="text-sm">Instant Email Delivery</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <i class="fas fa-headset text-purple-500 text-xl"></i>
                    <span class="text-sm">24/7 Customer Support</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <i class="fas fa-infinity text-gold text-xl"></i>
                    <span class="text-sm">Lifetime Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Product Info */}
          <div class="md:col-span-2">
            {/* Product Header */}
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-3">
                {product.brand_name && (
                  <span class="badge badge-info text-sm">{product.brand_name}</span>
                )}
                {product.is_new && (
                  <span class="badge badge-success text-sm">
                    <i class="fas fa-sparkles mr-1"></i> NEW
                  </span>
                )}
                {product.is_bestseller && (
                  <span class="badge badge-warning text-sm">
                    <i class="fas fa-fire mr-1"></i> BESTSELLER
                  </span>
                )}
              </div>
              
              <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                {product.name}
              </h1>
              
              <p class="text-lg text-gray-600 mb-4">
                {product.short_description}
              </p>

              {/* Rating */}
              {product.review_count > 0 && (
                <div class="flex items-center gap-2 mb-4">
                  <div class="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <i class={`fas fa-star ${star <= Math.round(product.rating) ? '' : 'opacity-30'}`}></i>
                    ))}
                  </div>
                  <span class="text-gray-600">
                    {product.rating.toFixed(1)} ({product.review_count} reviews)
                  </span>
                </div>
              )}

              <div class="text-sm text-gray-500 mb-4">
                SKU: <span class="font-mono">{product.sku}</span>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6 gold-border">
              <div class="flex items-center justify-between mb-4">
                <div>
                  {product.discount_price && (
                    <div class="text-lg text-gray-400 line-through mb-1">
                      €{product.base_price.toFixed(2)}
                    </div>
                  )}
                  <div class="text-4xl font-bold text-primary">
                    €{(product.discount_price || product.base_price).toFixed(2)}
                  </div>
                  <div class="text-sm text-gray-600 mt-1">
                    incl. {product.vat_rate}% VAT
                  </div>
                </div>
                
                {product.stock_type === 'unlimited' && (
                  <div class="text-green-600 font-semibold">
                    <i class="fas fa-check-circle mr-2"></i>
                    In Stock
                  </div>
                )}
              </div>

              <button 
                class="btn-gold w-full text-xl py-4 rounded-lg mb-3"
                onclick={`addToCart('${product.slug}')`}
              >
                <i class="fas fa-shopping-cart mr-3"></i>
                Add to Cart
              </button>

              <div class="flex gap-3">
                <button class="flex-1 btn-primary py-3 rounded-lg">
                  <i class="fas fa-heart mr-2"></i>
                  Wishlist
                </button>
                <button class="flex-1 btn-primary py-3 rounded-lg">
                  <i class="fas fa-share-alt mr-2"></i>
                  Share
                </button>
              </div>
            </div>

            {/* Key Features */}
            {features.length > 0 && (
              <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 class="text-2xl font-bold mb-4 flex items-center">
                  <i class="fas fa-star text-gold mr-3"></i>
                  Key Features
                </h2>
                <ul class="grid md:grid-cols-2 gap-3">
                  {features.map((feature: string) => (
                    <li class="flex items-start gap-3">
                      <i class="fas fa-check-circle text-green-500 mt-1"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Details Tabs */}
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div class="border-b border-gray-200 mb-6">
                <nav class="flex gap-6">
                  <button class="tab-btn active pb-3 px-2 border-b-2 border-gold font-semibold" data-tab="description">
                    Description
                  </button>
                  <button class="tab-btn pb-3 px-2 border-b-2 border-transparent font-semibold text-gray-500 hover:text-gray-800" data-tab="requirements">
                    Requirements
                  </button>
                  {product.faqs && product.faqs.length > 0 && (
                    <button class="tab-btn pb-3 px-2 border-b-2 border-transparent font-semibold text-gray-500 hover:text-gray-800" data-tab="faq">
                      FAQ
                    </button>
                  )}
                </nav>
              </div>

              {/* Description Tab */}
              <div class="tab-content" data-tab="description">
                <div class="prose max-w-none">
                  <p class="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.long_description || product.short_description}
                  </p>
                </div>
              </div>

              {/* Requirements Tab */}
              <div class="tab-content hidden" data-tab="requirements">
                <div class="space-y-4">
                  <div>
                    <h3 class="font-bold text-lg mb-2">License Information</h3>
                    <ul class="space-y-2 text-gray-700">
                      <li><strong>Type:</strong> {product.license_type}</li>
                      <li><strong>Duration:</strong> {product.license_duration}</li>
                      <li><strong>Devices:</strong> {product.activation_limit} device(s)</li>
                      <li><strong>Delivery:</strong> {product.delivery_type}</li>
                    </ul>
                  </div>
                  
                  {compatibility.length > 0 && (
                    <div>
                      <h3 class="font-bold text-lg mb-2">Compatibility</h3>
                      <ul class="space-y-1 text-gray-700">
                        {compatibility.map((item: string) => (
                          <li>
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* FAQ Tab */}
              {product.faqs && product.faqs.length > 0 && (
                <div class="tab-content hidden" data-tab="faq">
                  <div class="space-y-4">
                    {product.faqs.map((faq: any, index: number) => (
                      <div class="border-b border-gray-200 pb-4 last:border-0">
                        <button 
                          class="faq-question w-full text-left font-semibold text-lg mb-2 flex items-center justify-between"
                          onclick={`toggleFaq(${index})`}
                        >
                          {faq.question}
                          <i class="fas fa-chevron-down transition-transform" id={`faq-icon-${index}`}></i>
                        </button>
                        <div class="faq-answer hidden text-gray-700" id={`faq-answer-${index}`}>
                          {faq.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* How to Activate */}
            <div class="bg-gradient-to-r from-primary to-blue-900 text-white rounded-lg p-6 mb-6">
              <h2 class="text-2xl font-bold mb-4">
                <i class="fas fa-info-circle mr-3"></i>
                How to Activate Your License
              </h2>
              <ol class="space-y-3">
                <li class="flex items-start gap-3">
                  <span class="bg-gold text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <span>Complete your purchase and receive your license key via email instantly</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="bg-gold text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <span>Download the software from the official website or provided link</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="bg-gold text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <span>Install the software and enter your license key when prompted</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="bg-gold text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</span>
                  <span>Enjoy your fully activated software with lifetime support</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div class="mt-12">
          <h2 class="text-3xl font-bold mb-6">
            <i class="fas fa-th-large text-gold mr-3"></i>
            You May Also Like
          </h2>
          <div id="related-products" class="grid md:grid-cols-4 gap-6">
            <div class="text-center py-8 col-span-4">
              <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* JavaScript for interactivity */}
      <script dangerouslySetInnerHTML={{__html: `
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Update buttons
            document.querySelectorAll('.tab-btn').forEach(b => {
              b.classList.remove('active', 'border-gold', 'text-gray-800');
              b.classList.add('border-transparent', 'text-gray-500');
            });
            this.classList.add('active', 'border-gold', 'text-gray-800');
            this.classList.remove('border-transparent', 'text-gray-500');
            
            // Update content
            document.querySelectorAll('.tab-content').forEach(content => {
              if (content.dataset.tab === tabName) {
                content.classList.remove('hidden');
              } else {
                content.classList.add('hidden');
              }
            });
          });
        });

        // FAQ toggle
        function toggleFaq(index) {
          const answer = document.getElementById('faq-answer-' + index);
          const icon = document.getElementById('faq-icon-' + index);
          
          if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            icon.style.transform = 'rotate(180deg)';
          } else {
            answer.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
          }
        }

        // Add to cart function
        function addToCart(slug) {
          // Get current cart from localStorage
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          
          // Check if product already in cart
          const existingItem = cart.find(item => item.slug === slug);
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({
              slug: slug,
              quantity: 1
            });
          }
          
          // Save cart
          localStorage.setItem('cart', JSON.stringify(cart));
          
          // Update cart count in header
          updateCartCount();
          
          // Show notification
          alert('Product added to cart!');
        }

        function updateCartCount() {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          const count = cart.reduce((sum, item) => sum + item.quantity, 0);
          const badge = document.querySelector('.fa-shopping-cart + span');
          if (badge) {
            badge.textContent = count;
          }
        }

        // Load related products
        async function loadRelatedProducts() {
          try {
            const response = await fetch('/api/products/featured?limit=4');
            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
              const container = document.getElementById('related-products');
              container.innerHTML = data.data.map(product => {
                const discount = product.discount_percentage || 0;
                const price = product.discount_price || product.base_price;
                
                return \`
                  <a href="/products/\${product.slug}" class="product-card bg-white rounded-lg shadow-lg overflow-hidden gold-border block">
                    <div class="relative">
                      <img src="\${product.image_url || 'https://via.placeholder.com/300x200'}" 
                           alt="\${product.name}" 
                           class="w-full h-48 object-cover"/>
                      \${discount > 0 ? \`
                        <div class="discount-badge absolute top-2 right-2 px-3 py-1 rounded-full text-sm">
                          -\${discount}%
                        </div>
                      \` : ''}
                    </div>
                    <div class="p-4">
                      <h3 class="font-bold text-lg mb-2 h-12 overflow-hidden">\${product.name}</h3>
                      <div class="text-2xl font-bold text-gold">€\${price.toFixed(2)}</div>
                    </div>
                  </a>
                \`;
              }).join('');
            }
          } catch (error) {
            console.error('Error loading related products:', error);
          }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
          loadRelatedProducts();
          updateCartCount();
        });
      `}} />
    </div>
  )
}
