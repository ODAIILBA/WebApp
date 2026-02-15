export function HomepagePremium() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SoftwareKing24 - Premium Software Lizenzen</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #f8fafc;
          overflow-x: hidden;
        }
        
        /* Premium Navbar */
        .premium-navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
        }
        
        /* Hero Section with Gradient */
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
          padding: 100px 0;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
          animation: rotate 30s linear infinite;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Glass Card Effect */
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        
        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }
        
        /* Product Card */
        .product-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
          position: relative;
        }
        
        .product-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .product-card:hover::before {
          opacity: 1;
        }
        
        .product-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
          border-color: #667eea;
        }
        
        .product-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .product-card:hover .product-image {
          transform: scale(1.1);
        }
        
        /* Premium Buttons */
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .btn-primary:hover::before {
          left: 100%;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
        }
        
        .btn-secondary {
          background: white;
          color: #667eea;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 600;
          border: 2px solid #667eea;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }
        
        /* Badge Styles */
        .badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 10;
        }
        
        .badge-new {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }
        
        .badge-sale {
          background: linear-gradient(135deg, #f093fb, #f5576c);
        }
        
        /* Price Display */
        .price-display {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 16px 0;
        }
        
        .current-price {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .old-price {
          font-size: 18px;
          text-decoration: line-through;
          color: #9ca3af;
        }
        
        /* Category Pills */
        .category-pill {
          background: white;
          padding: 16px 32px;
          border-radius: 50px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }
        
        .category-pill:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);
          border-color: #667eea;
        }
        
        .category-pill.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
        }
        
        /* Feature Icons */
        .feature-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
          position: relative;
        }
        
        .feature-icon::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 24px;
          background: inherit;
          opacity: 0.3;
          filter: blur(16px);
          z-index: -1;
        }
        
        /* Testimonial Card */
        .testimonial-card {
          background: white;
          padding: 32px;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          position: relative;
          transition: all 0.3s ease;
        }
        
        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: -20px;
          left: 20px;
          font-size: 100px;
          color: #667eea;
          opacity: 0.1;
          font-family: Georgia, serif;
        }
        
        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(102, 126, 234, 0.15);
        }
        
        /* Stats Counter */
        .stat-number {
          font-size: 48px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Search Bar */
        .search-bar {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .search-input {
          width: 100%;
          padding: 20px 60px 20px 24px;
          border-radius: 16px;
          border: 2px solid #e5e7eb;
          font-size: 16px;
          transition: all 0.3s ease;
          background: white;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }
        
        .search-button {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .search-button:hover {
          transform: translateY(-50%) scale(1.05);
        }
        
        /* Floating Animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Fade In Animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        /* Newsletter Section */
        .newsletter-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 32px;
          padding: 60px;
          position: relative;
          overflow: hidden;
        }
        
        .newsletter-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        }
        
        /* Footer */
        .premium-footer {
          background: #1a1a2e;
          color: white;
          padding: 60px 0 30px;
        }
        
        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .footer-link:hover {
          color: white;
          transform: translateX(4px);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 0;
          }
          
          .current-price {
            font-size: 24px;
          }
          
          .stat-number {
            font-size: 32px;
          }
        }
      </style>
    </head>
    <body>
      <!-- Premium Navbar -->
      <nav class="premium-navbar">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <i class="fas fa-crown text-white text-xl"></i>
              </div>
              <div>
                <div class="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SoftwareKing24
                </div>
                <div class="text-xs text-gray-500">Premium Software Lizenzen</div>
              </div>
            </div>
            
            <!-- Navigation Links -->
            <div class="hidden md:flex items-center gap-8">
              <a href="/" class="text-gray-700 hover:text-purple-600 font-medium transition">Home</a>
              <a href="/products" class="text-gray-700 hover:text-purple-600 font-medium transition">Produkte</a>
              <a href="/categories" class="text-gray-700 hover:text-purple-600 font-medium transition">Kategorien</a>
              <a href="/support" class="text-gray-700 hover:text-purple-600 font-medium transition">Support</a>
            </div>
            
            <!-- Right Side -->
            <div class="flex items-center gap-4">
              <button class="hidden md:block text-gray-700 hover:text-purple-600 transition">
                <i class="fas fa-search text-xl"></i>
              </button>
              <button class="text-gray-700 hover:text-purple-600 transition relative">
                <i class="fas fa-shopping-cart text-xl"></i>
                <span class="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
              </button>
              <button class="btn-primary text-sm">
                <i class="fas fa-user mr-2"></i>
                Anmelden
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="max-w-7xl mx-auto px-6 relative z-10">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <!-- Left Content -->
            <div class="text-white fade-in-up">
              <div class="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🎉 Bis zu 50% Rabatt auf ausgewählte Produkte
              </div>
              <h1 class="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Premium Software<br/>
                <span class="text-yellow-300">Zum besten Preis</span>
              </h1>
              <p class="text-xl mb-8 text-white/90 leading-relaxed">
                Originale Microsoft Windows & Office Lizenzen<br/>
                Sofortige Lieferung • Lebenslange Gültigkeit • 100% Legal
              </p>
              <div class="flex gap-4">
                <button class="btn-primary">
                  <i class="fas fa-shopping-bag mr-2"></i>
                  Jetzt einkaufen
                </button>
                <button class="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-purple-600">
                  <i class="fas fa-play-circle mr-2"></i>
                  Mehr erfahren
                </button>
              </div>
              
              <!-- Trust Badges -->
              <div class="flex gap-8 mt-12">
                <div>
                  <div class="text-3xl font-black">50K+</div>
                  <div class="text-sm text-white/70">Zufriedene Kunden</div>
                </div>
                <div>
                  <div class="text-3xl font-black">98%</div>
                  <div class="text-sm text-white/70">Positive Bewertungen</div>
                </div>
                <div>
                  <div class="text-3xl font-black">24/7</div>
                  <div class="text-sm text-white/70">Support</div>
                </div>
              </div>
            </div>
            
            <!-- Right Content - Product Showcase -->
            <div class="hidden md:block float">
              <div class="glass-card p-8 relative">
                <div class="badge badge-sale">-35% Rabatt</div>
                <img src="https://via.placeholder.com/400x300/667eea/ffffff?text=Windows+11+Pro" alt="Windows 11 Pro" class="w-full rounded-xl mb-4">
                <h3 class="text-2xl font-bold mb-2">Windows 11 Pro</h3>
                <p class="text-gray-600 mb-4">Original Microsoft Lizenz • Lebenslang gültig</p>
                <div class="price-display">
                  <span class="current-price">€79.99</span>
                  <span class="old-price">€122.99</span>
                </div>
                <button class="btn-primary w-full">
                  <i class="fas fa-cart-plus mr-2"></i>
                  In den Warenkorb
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-20 bg-gradient-to-b from-white to-gray-50">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-black mb-4">Beliebte Kategorien</h2>
            <p class="text-xl text-gray-600">Finden Sie die perfekte Software für Ihre Bedürfnisse</p>
          </div>
          
          <div class="flex flex-wrap justify-center gap-4 mb-16">
            <div class="category-pill active">
              <i class="fas fa-star mr-2"></i>
              Bestseller
            </div>
            <div class="category-pill">
              <i class="fab fa-windows mr-2"></i>
              Windows
            </div>
            <div class="category-pill">
              <i class="fas fa-file-word mr-2"></i>
              Office
            </div>
            <div class="category-pill">
              <i class="fas fa-shield-alt mr-2"></i>
              Antivirus
            </div>
            <div class="category-pill">
              <i class="fas fa-paint-brush mr-2"></i>
              Design
            </div>
          </div>
          
          <!-- Products Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Product Card 1 -->
            <div class="product-card fade-in-up">
              <div class="badge badge-new">Neu</div>
              <div class="overflow-hidden">
                <img src="https://via.placeholder.com/400x280/667eea/ffffff?text=Windows+11+Pro" alt="Windows 11 Pro" class="product-image">
              </div>
              <div class="p-6">
                <div class="text-sm text-purple-600 font-semibold mb-2">BETRIEBSSYSTEM</div>
                <h3 class="text-xl font-bold mb-2">Windows 11 Pro</h3>
                <div class="flex items-center gap-2 mb-3">
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <span class="text-sm text-gray-500">(245 Bewertungen)</span>
                </div>
                <p class="text-gray-600 mb-4 text-sm">Original Microsoft Lizenz • Lebenslang • 1 PC</p>
                <div class="price-display">
                  <span class="current-price">€79.99</span>
                  <span class="old-price">€122.99</span>
                </div>
                <button class="btn-primary w-full">
                  <i class="fas fa-shopping-cart mr-2"></i>
                  Kaufen
                </button>
              </div>
            </div>

            <!-- Product Card 2 -->
            <div class="product-card fade-in-up" style="animation-delay: 0.1s">
              <div class="badge badge-sale">-40%</div>
              <div class="overflow-hidden">
                <img src="https://via.placeholder.com/400x280/764ba2/ffffff?text=Office+2021" alt="Office 2021" class="product-image">
              </div>
              <div class="p-6">
                <div class="text-sm text-purple-600 font-semibold mb-2">PRODUKTIVITÄT</div>
                <h3 class="text-xl font-bold mb-2">Office 2021 Pro Plus</h3>
                <div class="flex items-center gap-2 mb-3">
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                  <span class="text-sm text-gray-500">(189 Bewertungen)</span>
                </div>
                <p class="text-gray-600 mb-4 text-sm">Word, Excel, PowerPoint, Outlook & mehr</p>
                <div class="price-display">
                  <span class="current-price">€59.99</span>
                  <span class="old-price">€99.99</span>
                </div>
                <button class="btn-primary w-full">
                  <i class="fas fa-shopping-cart mr-2"></i>
                  Kaufen
                </button>
              </div>
            </div>

            <!-- Product Card 3 -->
            <div class="product-card fade-in-up" style="animation-delay: 0.2s">
              <div class="overflow-hidden">
                <img src="https://via.placeholder.com/400x280/f093fb/ffffff?text=Windows+10" alt="Windows 10" class="product-image">
              </div>
              <div class="p-6">
                <div class="text-sm text-purple-600 font-semibold mb-2">BETRIEBSSYSTEM</div>
                <h3 class="text-xl font-bold mb-2">Windows 10 Pro</h3>
                <div class="flex items-center gap-2 mb-3">
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <span class="text-sm text-gray-500">(456 Bewertungen)</span>
                </div>
                <p class="text-gray-600 mb-4 text-sm">Bewährtes System • Stabil • Leistungsstark</p>
                <div class="price-display">
                  <span class="current-price">€49.99</span>
                  <span class="old-price">€89.99</span>
                </div>
                <button class="btn-primary w-full">
                  <i class="fas fa-shopping-cart mr-2"></i>
                  Kaufen
                </button>
              </div>
            </div>

            <!-- Product Card 4 -->
            <div class="product-card fade-in-up" style="animation-delay: 0.3s">
              <div class="badge badge-sale">-25%</div>
              <div class="overflow-hidden">
                <img src="https://via.placeholder.com/400x280/4facfe/ffffff?text=Office+365" alt="Office 365" class="product-image">
              </div>
              <div class="p-6">
                <div class="text-sm text-purple-600 font-semibold mb-2">PRODUKTIVITÄT</div>
                <h3 class="text-xl font-bold mb-2">Microsoft 365</h3>
                <div class="flex items-center gap-2 mb-3">
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                  <span class="text-sm text-gray-500">(312 Bewertungen)</span>
                </div>
                <p class="text-gray-600 mb-4 text-sm">1TB OneDrive • Premium Apps • Updates</p>
                <div class="price-display">
                  <span class="current-price">€74.99</span>
                  <span class="old-price">€99.99</span>
                </div>
                <button class="btn-primary w-full">
                  <i class="fas fa-shopping-cart mr-2"></i>
                  Kaufen
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-black mb-4">Warum SoftwareKing24?</h2>
            <p class="text-xl text-gray-600">Ihre Vorteile bei uns</p>
          </div>
          
          <div class="grid md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="feature-icon mx-auto mb-6">
                <i class="fas fa-shield-check"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">100% Original</h3>
              <p class="text-gray-600">Alle Lizenzen sind original und legal von Microsoft autorisiert</p>
            </div>
            
            <div class="text-center">
              <div class="feature-icon mx-auto mb-6">
                <i class="fas fa-bolt"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Sofort-Lieferung</h3>
              <p class="text-gray-600">Erhalten Sie Ihren Key innerhalb von 5-30 Minuten per E-Mail</p>
            </div>
            
            <div class="text-center">
              <div class="feature-icon mx-auto mb-6">
                <i class="fas fa-infinity"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Lebenslang gültig</h3>
              <p class="text-gray-600">Einmalige Zahlung, lebenslange Nutzung ohne Abo</p>
            </div>
            
            <div class="text-center">
              <div class="feature-icon mx-auto mb-6">
                <i class="fas fa-headset"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">24/7 Support</h3>
              <p class="text-gray-600">Unser Expertenteam hilft Ihnen rund um die Uhr</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-6">
          <div class="newsletter-section relative z-10">
            <div class="text-center text-white max-w-2xl mx-auto">
              <div class="text-5xl mb-6">📧</div>
              <h2 class="text-4xl font-black mb-4">Exklusive Angebote erhalten</h2>
              <p class="text-xl mb-8 text-white/90">
                Melden Sie sich an und erhalten Sie bis zu 20% Rabatt auf Ihre erste Bestellung
              </p>
              <div class="search-bar">
                <input type="email" class="search-input" placeholder="Ihre E-Mail-Adresse eingeben...">
                <button class="search-button">Anmelden</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="premium-footer">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <i class="fas fa-crown text-white text-xl"></i>
                </div>
                <div class="text-xl font-bold">SoftwareKing24</div>
              </div>
              <p class="text-gray-400 mb-4">
                Ihr vertrauenswürdiger Partner für Original-Software-Lizenzen seit 2020.
              </p>
              <div class="flex gap-3">
                <a href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-purple-600 transition">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-purple-600 transition">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-purple-600 transition">
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 class="font-bold mb-4">Produkte</h4>
              <ul class="space-y-2">
                <li><a href="#" class="footer-link block">Windows 11</a></li>
                <li><a href="#" class="footer-link block">Windows 10</a></li>
                <li><a href="#" class="footer-link block">Office 2021</a></li>
                <li><a href="#" class="footer-link block">Microsoft 365</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-bold mb-4">Support</h4>
              <ul class="space-y-2">
                <li><a href="#" class="footer-link block">FAQ</a></li>
                <li><a href="#" class="footer-link block">Kontakt</a></li>
                <li><a href="#" class="footer-link block">Aktivierungshilfe</a></li>
                <li><a href="#" class="footer-link block">Downloads</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-bold mb-4">Rechtliches</h4>
              <ul class="space-y-2">
                <li><a href="#" class="footer-link block">AGB</a></li>
                <li><a href="#" class="footer-link block">Datenschutz</a></li>
                <li><a href="#" class="footer-link block">Impressum</a></li>
                <li><a href="#" class="footer-link block">Widerruf</a></li>
              </ul>
            </div>
          </div>
          
          <div class="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>© 2026 SoftwareKing24. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>

      <script>
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });

        // Category pills activation
        document.querySelectorAll('.category-pill').forEach(pill => {
          pill.addEventListener('click', function() {
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
          });
        });
      </script>
    </body>
    </html>
  `;
}
