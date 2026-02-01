export function ShopHomepagePremium() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SOFTWAREKING24 - Premium Software Lizenzshop</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Glassmorphism */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-strong {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
          50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.8); }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .glow-animation {
          animation: glow 2s ease-in-out infinite;
        }

        .slide-in {
          animation: slideInUp 0.6s ease-out forwards;
        }

        /* Product Card Hover Effects */
        .product-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .product-card:hover .product-image {
          transform: scale(1.1);
        }

        .product-image {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Button Effects */
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* Category Pills */
        .category-pill {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .category-pill:hover, .category-pill.active {
          background: rgba(255, 255, 255, 0.95);
          color: #667eea;
          transform: scale(1.05);
        }

        /* Badge Effects */
        .badge {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-sale {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }

        .badge-new {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }

        .badge-bestseller {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          color: white;
        }

        /* Trust Indicators */
        .trust-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
        }

        /* Price Display */
        .price-display {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Hero Background Pattern */
        .hero-pattern {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        }

        /* Stats Counter */
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      </style>
    </head>
    <body>
      
      <!-- Navigation -->
      <nav class="glass-strong fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            
            <!-- Logo -->
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center glow-animation">
                <i class="fas fa-crown text-white text-xl"></i>
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900">SOFTWAREKING24</h1>
                <p class="text-xs text-gray-600">Premium Software Lizenzen</p>
              </div>
            </div>

            <!-- Search Bar -->
            <div class="hidden md:flex flex-1 max-w-2xl mx-8">
              <div class="relative w-full">
                <input 
                  type="text" 
                  placeholder="Suche nach Software, Lizenzen..." 
                  class="w-full px-6 py-3 pl-12 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all"
                />
                <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                  Suchen
                </button>
              </div>
            </div>

            <!-- Nav Links -->
            <div class="flex items-center space-x-6">
              <a href="/products" class="text-gray-700 hover:text-purple-600 font-medium transition-colors">Produkte</a>
              <a href="/categories" class="text-gray-700 hover:text-purple-600 font-medium transition-colors">Kategorien</a>
              
              <!-- Cart -->
              <div class="relative">
                <button class="relative p-3 hover:bg-gray-100 rounded-full transition-all">
                  <i class="fas fa-shopping-cart text-gray-700 text-xl"></i>
                  <span class="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                </button>
              </div>

              <!-- User -->
              <button class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-all">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <i class="fas fa-user text-white"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero-pattern pt-32 pb-20 px-4">
        <div class="max-w-7xl mx-auto">
          
          <!-- Trust Badges -->
          <div class="flex flex-wrap justify-center gap-4 mb-12 slide-in" style="animation-delay: 0.1s">
            <div class="trust-badge">
              <i class="fas fa-shield-alt"></i>
              <span>100% Sicher</span>
            </div>
            <div class="trust-badge">
              <i class="fas fa-truck"></i>
              <span>Sofort-Lieferung</span>
            </div>
            <div class="trust-badge">
              <i class="fas fa-star"></i>
              <span>50.000+ Kunden</span>
            </div>
            <div class="trust-badge">
              <i class="fas fa-headset"></i>
              <span>24/7 Support</span>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-12 items-center">
            
            <!-- Hero Content -->
            <div class="text-white slide-in" style="animation-delay: 0.2s">
              <div class="badge badge-new mb-6">
                <i class="fas fa-bolt mr-2"></i>
                WINTER SALE 2026
              </div>
              
              <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Premium Software
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-300">
                  Lizenzen
                </span>
                zum Bestpreis
              </h1>
              
              <p class="text-xl mb-8 text-white/90 leading-relaxed">
                Spare bis zu <span class="font-bold text-2xl">70%</span> auf Windows, Office, Antivirus & mehr. 
                Originale Lizenzen. Sofortige Lieferung. Lebenslanger Support.
              </p>

              <div class="flex flex-wrap gap-4 mb-8">
                <button class="btn-primary text-lg">
                  <i class="fas fa-shopping-bag mr-2"></i>
                  Jetzt kaufen
                </button>
                <button class="btn-secondary text-lg">
                  <i class="fas fa-play-circle mr-2"></i>
                  Mehr erfahren
                </button>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div class="stat-number">50K+</div>
                  <div class="stat-label">Kunden</div>
                </div>
                <div>
                  <div class="stat-number">200K+</div>
                  <div class="stat-label">Lizenzen</div>
                </div>
                <div>
                  <div class="stat-number">4.9</div>
                  <div class="stat-label">★ Rating</div>
                </div>
              </div>
            </div>

            <!-- Hero Image/Visual -->
            <div class="relative slide-in" style="animation-delay: 0.3s">
              <div class="glass-strong rounded-3xl p-8 float-animation">
                <div class="space-y-4">
                  <!-- Featured Product Card -->
                  <div class="bg-white rounded-2xl p-6 shadow-2xl">
                    <div class="flex items-center justify-between mb-4">
                      <div class="badge badge-bestseller">BESTSELLER</div>
                      <div class="text-green-600 font-bold flex items-center">
                        <i class="fas fa-arrow-down mr-2"></i>
                        -65%
                      </div>
                    </div>
                    <div class="flex items-center space-x-4 mb-4">
                      <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <i class="fab fa-windows text-white text-3xl"></i>
                      </div>
                      <div>
                        <h3 class="font-bold text-gray-900 text-lg">Windows 11 Pro</h3>
                        <p class="text-gray-600 text-sm">Vollversion • Lebenslang</p>
                      </div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="text-gray-400 line-through text-sm">€259,00</div>
                        <div class="price-display">€89,99</div>
                      </div>
                      <button class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                        <i class="fas fa-cart-plus mr-2"></i>
                        Kaufen
                      </button>
                    </div>
                  </div>

                  <!-- Trust Indicators -->
                  <div class="grid grid-cols-3 gap-3">
                    <div class="bg-white rounded-xl p-4 text-center">
                      <i class="fas fa-shield-check text-green-500 text-2xl mb-2"></i>
                      <p class="text-xs font-bold text-gray-900">Original</p>
                    </div>
                    <div class="bg-white rounded-xl p-4 text-center">
                      <i class="fas fa-bolt text-yellow-500 text-2xl mb-2"></i>
                      <p class="text-xs font-bold text-gray-900">Sofort</p>
                    </div>
                    <div class="bg-white rounded-xl p-4 text-center">
                      <i class="fas fa-infinity text-purple-500 text-2xl mb-2"></i>
                      <p class="text-xs font-bold text-gray-900">Lebenslang</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-16 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-white mb-4">Beliebte Kategorien</h2>
            <p class="text-white/80 text-lg">Entdecke unsere Top-Kategorien mit Premium Software</p>
          </div>

          <div class="flex flex-wrap justify-center gap-4 mb-16">
            <div class="category-pill active">
              <i class="fas fa-star mr-2"></i>
              Alle Produkte
            </div>
            <div class="category-pill">
              <i class="fab fa-windows mr-2"></i>
              Windows
            </div>
            <div class="category-pill">
              <i class="fab fa-microsoft mr-2"></i>
              Office
            </div>
            <div class="category-pill">
              <i class="fas fa-shield-virus mr-2"></i>
              Antivirus
            </div>
            <div class="category-pill">
              <i class="fas fa-palette mr-2"></i>
              Design
            </div>
            <div class="category-pill">
              <i class="fas fa-server mr-2"></i>
              Server
            </div>
          </div>

          <!-- Featured Products Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <!-- Product Card 1 -->
            <div class="product-card glass-strong rounded-2xl p-6 slide-in" style="animation-delay: 0.1s">
              <div class="relative mb-4">
                <div class="absolute top-2 right-2 z-10">
                  <div class="badge badge-sale">-70%</div>
                </div>
                <div class="absolute top-2 left-2 z-10">
                  <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-all">
                    <i class="far fa-heart text-gray-600 hover:text-red-500"></i>
                  </button>
                </div>
                <div class="product-image w-full h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center overflow-hidden">
                  <i class="fab fa-windows text-white text-6xl"></i>
                </div>
              </div>
              
              <div class="space-y-3">
                <h3 class="font-bold text-gray-900 text-lg">Windows 11 Pro</h3>
                <p class="text-gray-600 text-sm">Original Lizenzschlüssel • Vollversion</p>
                
                <div class="flex items-center space-x-2">
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <span class="text-gray-600 text-sm">(1,234)</span>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <div class="text-gray-400 line-through text-sm">€259,00</div>
                    <div class="text-2xl font-bold text-purple-600">€89,99</div>
                  </div>
                  <button class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg transition-all">
                    <i class="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Product Card 2 -->
            <div class="product-card glass-strong rounded-2xl p-6 slide-in" style="animation-delay: 0.2s">
              <div class="relative mb-4">
                <div class="absolute top-2 right-2 z-10">
                  <div class="badge badge-bestseller">TOP</div>
                </div>
                <div class="absolute top-2 left-2 z-10">
                  <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-all">
                    <i class="far fa-heart text-gray-600 hover:text-red-500"></i>
                  </button>
                </div>
                <div class="product-image w-full h-48 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <i class="fab fa-microsoft text-white text-6xl"></i>
                </div>
              </div>
              
              <div class="space-y-3">
                <h3 class="font-bold text-gray-900 text-lg">Office 2021 Pro</h3>
                <p class="text-gray-600 text-sm">Word, Excel, PowerPoint & mehr</p>
                
                <div class="flex items-center space-x-2">
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                  <span class="text-gray-600 text-sm">(982)</span>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <div class="text-gray-400 line-through text-sm">€449,00</div>
                    <div class="text-2xl font-bold text-purple-600">€149,99</div>
                  </div>
                  <button class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg transition-all">
                    <i class="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Product Card 3 -->
            <div class="product-card glass-strong rounded-2xl p-6 slide-in" style="animation-delay: 0.3s">
              <div class="relative mb-4">
                <div class="absolute top-2 right-2 z-10">
                  <div class="badge badge-new">NEU</div>
                </div>
                <div class="absolute top-2 left-2 z-10">
                  <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-all">
                    <i class="fas fa-heart text-red-500"></i>
                  </button>
                </div>
                <div class="product-image w-full h-48 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-shield-virus text-white text-6xl"></i>
                </div>
              </div>
              
              <div class="space-y-3">
                <h3 class="font-bold text-gray-900 text-lg">Kaspersky Total</h3>
                <p class="text-gray-600 text-sm">Premium Schutz • 5 Geräte</p>
                
                <div class="flex items-center space-x-2">
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <span class="text-gray-600 text-sm">(756)</span>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <div class="text-gray-400 line-through text-sm">€89,00</div>
                    <div class="text-2xl font-bold text-purple-600">€39,99</div>
                  </div>
                  <button class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg transition-all">
                    <i class="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Product Card 4 -->
            <div class="product-card glass-strong rounded-2xl p-6 slide-in" style="animation-delay: 0.4s">
              <div class="relative mb-4">
                <div class="absolute top-2 right-2 z-10">
                  <div class="badge badge-sale">-60%</div>
                </div>
                <div class="absolute top-2 left-2 z-10">
                  <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-all">
                    <i class="far fa-heart text-gray-600 hover:text-red-500"></i>
                  </button>
                </div>
                <div class="product-image w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <i class="fab fa-adobe text-white text-6xl"></i>
                </div>
              </div>
              
              <div class="space-y-3">
                <h3 class="font-bold text-gray-900 text-lg">Adobe Creative</h3>
                <p class="text-gray-600 text-sm">Photoshop, Illustrator & mehr</p>
                
                <div class="flex items-center space-x-2">
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                  <span class="text-gray-600 text-sm">(543)</span>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <div class="text-gray-400 line-through text-sm">€599,00</div>
                    <div class="text-2xl font-bold text-purple-600">€239,99</div>
                  </div>
                  <button class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg transition-all">
                    <i class="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- View All Button -->
          <div class="text-center mt-12">
            <button class="btn-primary text-lg">
              <i class="fas fa-grid mr-2"></i>
              Alle Produkte anzeigen
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-4 gap-6">
            
            <div class="glass-strong rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-shield-check text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">100% Original</h3>
              <p class="text-gray-600">Alle Lizenzen sind zu 100% original und legal</p>
            </div>

            <div class="glass-strong rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-bolt text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Sofort-Lieferung</h3>
              <p class="text-gray-600">Erhalte deinen Key innerhalb von Minuten per Email</p>
            </div>

            <div class="glass-strong rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-headset text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p class="text-gray-600">Unser Team steht dir rund um die Uhr zur Verfügung</p>
            </div>

            <div class="glass-strong rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all">
              <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-tags text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Beste Preise</h3>
              <p class="text-gray-600">Spare bis zu 70% gegenüber UVP</p>
            </div>

          </div>
        </div>
      </section>

      <!-- Hot Deals / Flash Sale Section -->
      <section class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="glass-strong rounded-3xl p-12">
            <div class="text-center mb-12">
              <div class="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold mb-4 animate-pulse">
                <i class="fas fa-fire mr-2"></i>
                FLASH SALE - NUR HEUTE!
              </div>
              <h2 class="text-4xl font-bold text-gray-900 mb-4">Heiße Deals</h2>
              <p class="text-gray-600 text-lg">Unschlagbare Angebote - Nur solange der Vorrat reicht!</p>
              
              <!-- Countdown Timer -->
              <div class="flex justify-center gap-4 mt-8">
                <div class="bg-white rounded-xl p-4 shadow-lg min-w-[80px]">
                  <div class="text-3xl font-bold text-purple-600">08</div>
                  <div class="text-sm text-gray-600">Stunden</div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-lg min-w-[80px]">
                  <div class="text-3xl font-bold text-purple-600">45</div>
                  <div class="text-sm text-gray-600">Minuten</div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-lg min-w-[80px]">
                  <div class="text-3xl font-bold text-purple-600">23</div>
                  <div class="text-sm text-gray-600">Sekunden</div>
                </div>
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
              <!-- Deal 1 -->
              <div class="bg-white rounded-2xl p-6 relative overflow-hidden hover:transform hover:scale-105 transition-all">
                <div class="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-bl-2xl font-bold">
                  -85%
                </div>
                <div class="text-center mb-4">
                  <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i class="fab fa-windows text-white text-4xl"></i>
                  </div>
                  <h3 class="font-bold text-xl text-gray-900 mb-2">Windows 11 Pro</h3>
                  <p class="text-gray-600 text-sm mb-4">Vollversion • Lifetime</p>
                  <div class="mb-4">
                    <div class="text-gray-400 line-through">€259,00</div>
                    <div class="text-4xl font-bold text-red-600">€38,99</div>
                  </div>
                  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-4">
                    <p class="text-yellow-800 text-sm font-medium">
                      <i class="fas fa-box mr-1"></i>
                      Nur noch 7 auf Lager!
                    </p>
                  </div>
                  <button class="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                    <i class="fas fa-bolt mr-2"></i>
                    Jetzt sichern!
                  </button>
                </div>
              </div>

              <!-- Deal 2 -->
              <div class="bg-white rounded-2xl p-6 relative overflow-hidden hover:transform hover:scale-105 transition-all">
                <div class="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-bl-2xl font-bold">
                  -75%
                </div>
                <div class="text-center mb-4">
                  <div class="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i class="fab fa-microsoft text-white text-4xl"></i>
                  </div>
                  <h3 class="font-bold text-xl text-gray-900 mb-2">Office 2021 Pro</h3>
                  <p class="text-gray-600 text-sm mb-4">Word, Excel, PowerPoint</p>
                  <div class="mb-4">
                    <div class="text-gray-400 line-through">€449,00</div>
                    <div class="text-4xl font-bold text-red-600">€112,99</div>
                  </div>
                  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-4">
                    <p class="text-yellow-800 text-sm font-medium">
                      <i class="fas fa-box mr-1"></i>
                      Nur noch 12 auf Lager!
                    </p>
                  </div>
                  <button class="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                    <i class="fas fa-bolt mr-2"></i>
                    Jetzt sichern!
                  </button>
                </div>
              </div>

              <!-- Deal 3 -->
              <div class="bg-white rounded-2xl p-6 relative overflow-hidden hover:transform hover:scale-105 transition-all">
                <div class="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-bl-2xl font-bold">
                  -80%
                </div>
                <div class="text-center mb-4">
                  <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-layer-group text-white text-4xl"></i>
                  </div>
                  <h3 class="font-bold text-xl text-gray-900 mb-2">Software Bundle</h3>
                  <p class="text-gray-600 text-sm mb-4">Windows + Office + Antivirus</p>
                  <div class="mb-4">
                    <div class="text-gray-400 line-through">€899,00</div>
                    <div class="text-4xl font-bold text-red-600">€179,99</div>
                  </div>
                  <div class="bg-green-50 border border-green-200 rounded-lg p-2 mb-4">
                    <p class="text-green-800 text-sm font-medium">
                      <i class="fas fa-gift mr-1"></i>
                      Spare €719!
                    </p>
                  </div>
                  <button class="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                    <i class="fas fa-bolt mr-2"></i>
                    Jetzt sichern!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">Was unsere Kunden sagen</h2>
            <p class="text-white/80 text-lg">Über 50.000 zufriedene Kunden vertrauen uns</p>
            <div class="flex items-center justify-center gap-2 mt-6">
              <div class="flex text-yellow-400 text-2xl">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <span class="text-white font-bold text-xl">4.9/5.0</span>
              <span class="text-white/80">(12,847 Bewertungen)</span>
            </div>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Testimonial 1 -->
            <div class="glass-strong rounded-2xl p-8">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  MK
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">Michael Klein</h4>
                  <div class="flex text-yellow-400 text-sm">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 mb-4">
                "Absolut top! Lizenz kam innerhalb von 5 Minuten, Installation problemlos. Der beste Preis, den ich online finden konnte. Werde definitiv wieder hier kaufen!"
              </p>
              <div class="text-sm text-gray-500">
                <i class="fas fa-check-circle text-green-500 mr-1"></i>
                Verifizierter Kauf • Windows 11 Pro
              </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="glass-strong rounded-2xl p-8">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  SW
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">Sarah Weber</h4>
                  <div class="flex text-yellow-400 text-sm">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 mb-4">
                "Ich war anfangs skeptisch wegen des günstigen Preises, aber alles ist 100% original. Aktivierung hat sofort funktioniert. Support war auch super freundlich!"
              </p>
              <div class="text-sm text-gray-500">
                <i class="fas fa-check-circle text-green-500 mr-1"></i>
                Verifizierter Kauf • Office 2021 Pro
              </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="glass-strong rounded-2xl p-8">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  TM
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">Thomas Müller</h4>
                  <div class="flex text-yellow-400 text-sm">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 mb-4">
                "Habe für meine Firma 10 Lizenzen gekauft. Alles reibungslos, alle Keys funktionieren einwandfrei. Sehr professioneller Service. Klare Empfehlung!"
              </p>
              <div class="text-sm text-gray-500">
                <i class="fas fa-check-circle text-green-500 mr-1"></i>
                Verifizierter Kauf • Windows 11 Bundle
              </div>
            </div>

            <!-- Testimonial 4 -->
            <div class="glass-strong rounded-2xl p-8">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  LB
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">Laura Bauer</h4>
                  <div class="flex text-yellow-400 text-sm">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 mb-4">
                "Wow, über 200€ gespart! Anfangs dachte ich, das kann nicht seriös sein, aber es ist alles echt. Schnelle Lieferung, echter Key. Danke!"
              </p>
              <div class="text-sm text-gray-500">
                <i class="fas fa-check-circle text-green-500 mr-1"></i>
                Verifizierter Kauf • Adobe Creative Cloud
              </div>
            </div>

            <!-- Testimonial 5 -->
            <div class="glass-strong rounded-2xl p-8">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  DS
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">David Schmidt</h4>
                  <div class="flex text-yellow-400 text-sm">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 mb-4">
                "Perfekt für Studenten! Günstige Preise, originale Lizenzen. Habe schon mehrmals hier bestellt und immer zufrieden gewesen. Top Shop!"
              </p>
              <div class="text-sm text-gray-500">
                <i class="fas fa-check-circle text-green-500 mr-1"></i>
                Verifizierter Kauf • Microsoft 365
              </div>
            </div>

            <!-- Testimonial 6 -->
            <div class="glass-strong rounded-2xl p-8">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  AH
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">Anna Hoffmann</h4>
                  <div class="flex text-yellow-400 text-sm">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 mb-4">
                "Hatte ein kleines Problem bei der Aktivierung, aber der Support hat mir sofort geholfen. Sehr kompetent und freundlich. 5 Sterne!"
              </p>
              <div class="text-sm text-gray-500">
                <i class="fas fa-check-circle text-green-500 mr-1"></i>
                Verifizierter Kauf • Kaspersky Total Security
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">So einfach geht's</h2>
            <p class="text-white/80 text-lg">In 3 einfachen Schritten zur Lizenz</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 relative">
            <!-- Arrow between steps (desktop only) -->
            <div class="hidden md:block absolute top-1/4 left-1/3 w-1/3 h-0.5 bg-white/30"></div>
            <div class="hidden md:block absolute top-1/4 right-1/3 w-1/3 h-0.5 bg-white/30"></div>

            <!-- Step 1 -->
            <div class="glass-strong rounded-2xl p-8 text-center relative">
              <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
                <i class="fas fa-mouse-pointer text-white text-4xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Produkt auswählen</h3>
              <p class="text-gray-600">
                Durchsuche unsere große Auswahl an Software-Lizenzen und wähle das gewünschte Produkt aus.
              </p>
            </div>

            <!-- Step 2 -->
            <div class="glass-strong rounded-2xl p-8 text-center relative">
              <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
                <i class="fas fa-credit-card text-white text-4xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Sicher bezahlen</h3>
              <p class="text-gray-600">
                Wähle deine bevorzugte Zahlungsmethode und schließe deine Bestellung sicher ab.
              </p>
            </div>

            <!-- Step 3 -->
            <div class="glass-strong rounded-2xl p-8 text-center relative">
              <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
                <i class="fas fa-envelope-open-text text-white text-4xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Sofort erhalten</h3>
              <p class="text-gray-600">
                Erhalte deinen Lizenzschlüssel innerhalb von Minuten direkt per E-Mail zugestellt.
              </p>
            </div>
          </div>

          <!-- Additional Benefits -->
          <div class="mt-16 grid md:grid-cols-4 gap-6">
            <div class="glass rounded-xl p-6 text-center">
              <i class="fas fa-shield-check text-white text-3xl mb-3"></i>
              <h4 class="text-white font-bold mb-2">100% Sicher</h4>
              <p class="text-white/80 text-sm">SSL-verschlüsselte Zahlung</p>
            </div>
            <div class="glass rounded-xl p-6 text-center">
              <i class="fas fa-undo text-white text-3xl mb-3"></i>
              <h4 class="text-white font-bold mb-2">Geld-zurück-Garantie</h4>
              <p class="text-white/80 text-sm">30 Tage Rückgaberecht</p>
            </div>
            <div class="glass rounded-xl p-6 text-center">
              <i class="fas fa-certificate text-white text-3xl mb-3"></i>
              <h4 class="text-white font-bold mb-2">Zertifiziert</h4>
              <p class="text-white/80 text-sm">Autorisierter Händler</p>
            </div>
            <div class="glass rounded-xl p-6 text-center">
              <i class="fas fa-users text-white text-3xl mb-3"></i>
              <h4 class="text-white font-bold mb-2">50.000+ Kunden</h4>
              <p class="text-white/80 text-sm">Vertrauen uns bereits</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Partner Logos Section -->
      <section class="py-16 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="glass-strong rounded-3xl p-12">
            <h2 class="text-3xl font-bold text-gray-900 text-center mb-4">Offizielle Partnerschaften</h2>
            <p class="text-gray-600 text-center mb-12">Wir arbeiten mit den größten Namen der Branche zusammen</p>
            
            <div class="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
              <!-- Microsoft -->
              <div class="flex items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all">
                <i class="fab fa-microsoft text-5xl text-gray-700"></i>
              </div>
              <!-- Windows -->
              <div class="flex items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all">
                <i class="fab fa-windows text-5xl text-blue-600"></i>
              </div>
              <!-- Adobe -->
              <div class="flex items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all">
                <i class="fab fa-adobe text-5xl text-red-600"></i>
              </div>
              <!-- Apple -->
              <div class="flex items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all">
                <i class="fab fa-apple text-5xl text-gray-700"></i>
              </div>
              <!-- Google -->
              <div class="flex items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all">
                <i class="fab fa-google text-5xl text-blue-500"></i>
              </div>
              <!-- Amazon -->
              <div class="flex items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all">
                <i class="fab fa-amazon text-5xl text-orange-600"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-20 px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">Häufig gestellte Fragen</h2>
            <p class="text-white/80 text-lg">Alle Antworten auf deine Fragen</p>
          </div>

          <div class="space-y-4">
            <!-- FAQ 1 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Sind die Lizenzen original?</h3>
                <i class="fas fa-chevron-down text-purple-600"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Ja! Alle unsere Lizenzen sind 100% original und legal. Wir sind autorisierter Händler und alle Keys sind direkt vom Hersteller.
              </div>
            </div>

            <!-- FAQ 2 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Wie schnell erhalte ich meinen Key?</h3>
                <i class="fas fa-chevron-down text-purple-600"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Sofort! Nach erfolgreicher Zahlung erhältst du deinen Lizenzschlüssel innerhalb von 5-10 Minuten per E-Mail.
              </div>
            </div>

            <!-- FAQ 3 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Welche Zahlungsmethoden akzeptiert ihr?</h3>
                <i class="fas fa-chevron-down text-purple-600"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Wir akzeptieren PayPal, Kreditkarte (Visa, Mastercard), SOFORT Überweisung, Klarna und viele mehr.
              </div>
            </div>

            <!-- FAQ 4 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Kann ich eine Rechnung erhalten?</h3>
                <i class="fas fa-chevron-down text-purple-600"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Selbstverständlich! Du erhältst automatisch eine ordnungsgemäße Rechnung per E-Mail, die du für deine Unterlagen nutzen kannst.
              </div>
            </div>

            <!-- FAQ 5 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Was ist, wenn der Key nicht funktioniert?</h3>
                <i class="fas fa-chevron-down text-purple-600"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Das kommt sehr selten vor, aber falls doch: Unser Support hilft dir sofort weiter und ersetzt den Key kostenlos.
              </div>
            </div>

            <!-- FAQ 6 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Bietet ihr auch Mengenrabatte an?</h3>
                <i class="fas fa-chevron-down text-purple-600"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Ja! Für Unternehmen und größere Bestellungen bieten wir attraktive Mengenrabatte. Kontaktiere uns für ein individuelles Angebot.
              </div>
            </div>
          </div>

          <div class="text-center mt-12">
            <a href="/admin/faq" class="btn-primary text-lg">
              <i class="fas fa-question-circle mr-2"></i>
              Alle FAQs ansehen
            </a>
          </div>
        </div>
      </section>

      <!-- Stats & Achievements Section -->
      <section class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="glass-strong rounded-3xl p-12">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">Unsere Erfolgsgeschichte</h2>
              <p class="text-gray-600 text-lg">Zahlen, die für sich sprechen</p>
            </div>

            <div class="grid md:grid-cols-4 gap-8">
              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-users text-white text-3xl"></i>
                </div>
                <div class="text-4xl font-bold text-purple-600 mb-2">50,000+</div>
                <div class="text-gray-600 font-medium">Zufriedene Kunden</div>
              </div>

              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-key text-white text-3xl"></i>
                </div>
                <div class="text-4xl font-bold text-blue-600 mb-2">200,000+</div>
                <div class="text-gray-600 font-medium">Verkaufte Lizenzen</div>
              </div>

              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-star text-white text-3xl"></i>
                </div>
                <div class="text-4xl font-bold text-green-600 mb-2">4.9/5.0</div>
                <div class="text-gray-600 font-medium">Kundenbewertung</div>
              </div>

              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-clock text-white text-3xl"></i>
                </div>
                <div class="text-4xl font-bold text-orange-600 mb-2">&lt;5 Min</div>
                <div class="text-gray-600 font-medium">Lieferzeit</div>
              </div>
            </div>

            <div class="mt-12 pt-12 border-t border-gray-200">
              <div class="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <i class="fas fa-trophy text-purple-600 text-3xl mb-3"></i>
                  <h4 class="font-bold text-gray-900 mb-2">Top-Händler 2025</h4>
                  <p class="text-gray-600">Ausgezeichnet für exzellenten Service</p>
                </div>
                <div>
                  <i class="fas fa-award text-blue-600 text-3xl mb-3"></i>
                  <h4 class="font-bold text-gray-900 mb-2">TrustedShops</h4>
                  <p class="text-gray-600">Zertifizierter Trusted Shop</p>
                </div>
                <div>
                  <i class="fas fa-medal text-green-600 text-3xl mb-3"></i>
                  <h4 class="font-bold text-gray-900 mb-2">Kundenwahl 2026</h4>
                  <p class="text-gray-600">Bester Software-Händler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-16 px-4">
        <div class="max-w-4xl mx-auto">
          <div class="glass-strong rounded-3xl p-12 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-envelope text-white text-3xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Exklusive Angebote erhalten</h2>
            <p class="text-gray-600 text-lg mb-8">Melde dich für unseren Newsletter an und erhalte 10% Rabatt auf deine erste Bestellung</p>
            
            <div class="max-w-md mx-auto flex gap-3">
              <input 
                type="email" 
                placeholder="Deine E-Mail Adresse" 
                class="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
              />
              <button class="btn-primary whitespace-nowrap">
                <i class="fas fa-paper-plane mr-2"></i>
                Anmelden
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="glass-strong mt-20 py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            
            <div>
              <h3 class="font-bold text-gray-900 text-lg mb-4">SOFTWAREKING24</h3>
              <p class="text-gray-600 mb-4">Premium Software Lizenzen zum Bestpreis. Original. Sicher. Schnell.</p>
              <div class="flex space-x-3">
                <a href="#" class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all">
                  <i class="fab fa-facebook-f text-white"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all">
                  <i class="fab fa-twitter text-white"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all">
                  <i class="fab fa-instagram text-white"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 class="font-bold text-gray-900 mb-4">Produkte</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Windows</a></li>
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Office</a></li>
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Antivirus</a></li>
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Design Software</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-gray-900 mb-4">Unternehmen</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Über uns</a></li>
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Kontakt</a></li>
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Blog</a></li>
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Karriere</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-gray-900 mb-4">Support</h4>
              <ul class="space-y-2">
                <li><a href="/admin/faq" class="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a></li>
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Versand</a></li>
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Rückgabe</a></li>
                <li><a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">AGB</a></li>
              </ul>
            </div>

          </div>

          <div class="border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>&copy; 2026 SOFTWAREKING24. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>

    </body>
    </html>
  `;
}
