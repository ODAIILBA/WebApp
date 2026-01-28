export const ProductDetailPageModern = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title id="page-title">Produktdetails - SoftwareKing24</title>
        <meta name="description" id="page-description" content="Kaufen Sie originale Software Lizenzen bei SoftwareKing24. Sofort verfügbar, 100% legal, günstige Preise." />
        <meta name="keywords" id="page-keywords" content="Software kaufen, Windows Lizenz, Office Lizenz, Antivirus" />
        
        <!-- Open Graph -->
        <meta property="og:type" content="product" />
        <meta property="og:title" id="og-title" content="Produktdetails - SoftwareKing24" />
        <meta property="og:description" id="og-description" content="Original Software Lizenzen zu fairen Preisen" />
        <meta property="og:image" id="og-image" content="/static/logo.png" />
        
        <!-- Schema.org -->
        <script type="application/ld+json" id="product-schema"></script>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
        
        <style>
          :root {
            --navy-dark: #1a2a4e;
            --navy-medium: #2d3e6f;
            --navy-light: #435991;
            --gold: #d4af37;
            --gold-light: #e8c966;
            --gold-dark: #b8941f;
          }

          /* Image Gallery */
          .image-gallery {
            position: relative;
          }

          .gallery-main {
            position: relative;
            overflow: hidden;
            border-radius: 16px;
            background: linear-gradient(135deg, var(--navy-light), var(--navy-medium));
          }

          .gallery-main img {
            width: 100%;
            height: 500px;
            object-fit: contain;
            transition: transform 0.5s ease;
          }

          .gallery-main:hover img {
            transform: scale(1.05);
          }

          .gallery-thumbnails {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            gap: 12px;
            margin-top: 16px;
          }

          .gallery-thumb {
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            border: 3px solid transparent;
            transition: all 0.3s ease;
          }

          .gallery-thumb:hover {
            border-color: var(--gold);
          }

          .gallery-thumb.active {
            border-color: var(--gold);
            box-shadow: 0 0 0 1px var(--gold);
          }

          .gallery-thumb img {
            width: 100%;
            height: 80px;
            object-fit: cover;
          }

          /* Zoom Effect */
          .zoom-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: zoom-out;
          }

          .zoom-overlay.active {
            display: flex;
          }

          .zoom-overlay img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
          }

          /* Tabs */
          .tab-button {
            padding: 16px 32px;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
            font-weight: 600;
          }

          .tab-button:hover {
            color: var(--gold);
            background: rgba(212, 175, 55, 0.05);
          }

          .tab-button.active {
            color: var(--gold);
            border-bottom-color: var(--gold);
            background: rgba(212, 175, 55, 0.05);
          }

          .tab-content {
            display: none;
            animation: fadeIn 0.5s ease;
          }

          .tab-content.active {
            display: block;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Sticky Add to Cart */
          .sticky-cart {
            position: sticky;
            top: 100px;
            z-index: 40;
          }

          /* Rating Stars */
          .rating-stars {
            display: inline-flex;
            gap: 4px;
          }

          .rating-star {
            color: var(--gold);
            font-size: 20px;
          }

          .rating-star.empty {
            color: #d1d5db;
          }

          /* Price Animation */
          @keyframes priceGlow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
            }
            50% {
              box-shadow: 0 0 30px rgba(212, 175, 55, 0.6);
            }
          }

          .price-highlight {
            animation: priceGlow 2s ease-in-out infinite;
          }

          /* Trust Badge */
          .trust-badge {
            display: inline-flex;
            align-items: center;
            padding: 12px 20px;
            border-radius: 12px;
            background: rgba(212, 175, 55, 0.1);
            border: 2px solid var(--gold);
            font-weight: 600;
            gap: 8px;
            transition: all 0.3s ease;
          }

          .trust-badge:hover {
            background: var(--gold);
            color: var(--navy-dark);
            transform: translateY(-2px);
          }

          /* Review Card */
          .review-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }

          .review-card:hover {
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            transform: translateY(-4px);
          }

          /* Product Card */
          .product-card-related {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }

          .product-card-related:hover {
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            transform: translateY(-8px);
          }

          /* Quantity Selector */
          .quantity-selector {
            display: flex;
            align-items: center;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
          }

          .quantity-selector button {
            padding: 12px 16px;
            background: #f3f4f6;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .quantity-selector button:hover {
            background: var(--gold);
            color: white;
          }

          .quantity-selector input {
            border: none;
            text-align: center;
            width: 60px;
            font-weight: 600;
            font-size: 18px;
          }

          /* Feature List */
          .feature-item {
            display: flex;
            align-items: start;
            gap: 12px;
            padding: 12px;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .feature-item:hover {
            background: rgba(212, 175, 55, 0.05);
          }

          .feature-icon {
            width: 24px;
            height: 24px;
            background: var(--gold);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          /* Comparison Badge */
          .comparison-badge {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--navy-dark);
            color: white;
            padding: 16px 24px;
            border-radius: 50px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
          }

          .comparison-badge:hover {
            background: var(--gold);
            color: var(--navy-dark);
            transform: scale(1.05);
          }

          /* Wishlist Heart */
          .wishlist-btn {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: white;
            border: 2px solid #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .wishlist-btn:hover {
            border-color: var(--gold);
            background: var(--gold);
            color: white;
            transform: scale(1.1);
          }

          .wishlist-btn.active {
            background: var(--gold);
            border-color: var(--gold);
            color: white;
          }

          /* Skeleton Loading */
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s ease-in-out infinite;
            border-radius: 8px;
          }

          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        </style>
      </head>
      <body class="bg-gray-50">
        <!-- Flash Sale Banner -->
        <div class="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 text-center text-sm font-semibold">
          <i class="fas fa-bolt mr-2"></i>
          FLASH SALE: Bis zu 70% Rabatt auf ausgewählte Produkte!
          <i class="fas fa-bolt ml-2"></i>
        </div>

        <!-- Top Info Bar -->
        <div style="background-color: var(--navy-dark);" class="text-white py-2 px-4">
          <div class="container mx-auto flex justify-between items-center text-sm">
            <div class="flex items-center space-x-6">
              <span><i class="fas fa-phone mr-2"></i>+49 123 456789</span>
              <span><i class="fas fa-envelope mr-2"></i>[email protected]</span>
              <span><i class="far fa-clock mr-2"></i>Mo-Fr: 9-18 Uhr</span>
            </div>
            <div class="flex items-center space-x-4">
              <span><i class="fas fa-download mr-2"></i>Sofort-Download</span>
              <span><i class="fas fa-shield-alt mr-2"></i>100% Legal</span>
              <span><i class="fas fa-undo mr-2"></i>14 Tage Rückgabe</span>
            </div>
          </div>
        </div>

        <!-- Header -->
        <header class="bg-white shadow-md sticky top-0 z-50">
          <div class="container mx-auto px-6">
            <div class="flex items-center justify-between py-4">
              <!-- Logo -->
              <a href="/" class="flex items-center space-x-3">
                <img src="/static/logo.png" alt="SoftwareKing24" class="h-12" onerror="this.outerHTML='<div class=\\'w-12 h-12 bg-gradient-to-br from-navy-dark to-navy-light rounded-lg flex items-center justify-center text-white font-bold text-xl\\' style=\\'background: linear-gradient(135deg, var(--navy-dark), var(--navy-light))\\'>SK</div>';" />
                <div>
                  <div class="text-2xl font-bold" style="color: var(--navy-dark);">SoftwareKing24</div>
                  <div class="text-xs text-gray-500">Original Software Lizenzen</div>
                </div>
              </a>

              <!-- Search Bar -->
              <div class="flex-1 max-w-2xl mx-8">
                <div class="relative">
                  <input
                    type="text"
                    id="global-search"
                    placeholder="Suchen Sie nach Windows, Office, Antivirus..."
                    class="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gold transition-all"
                    style="--gold: #d4af37;"
                  />
                  <button class="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-full transition text-white" style="background-color: var(--gold);">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>

              <!-- Header Actions -->
              <div class="flex items-center space-x-6">
                <a href="/login" class="transition" style="color: var(--navy-dark);">
                  <i class="fas fa-user mr-2"></i>Anmelden
                </a>
                <a href="/warenkorb" class="relative">
                  <button class="text-white px-4 py-2 rounded-full transition" style="background-color: var(--gold);">
                    <i class="fas fa-shopping-cart mr-2"></i>Warenkorb
                    <span id="cart-badge" class="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" data-cart-count="0">0</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </header>

        <!-- Breadcrumb -->
        <div class="bg-gray-100 py-3">
          <div class="container mx-auto px-6">
            <div class="flex items-center text-sm text-gray-600">
              <a href="/" class="hover:text-gold"><i class="fas fa-home mr-2"></i>Home</a>
              <i class="fas fa-chevron-right mx-3 text-xs"></i>
              <a href="/produkte" class="hover:text-gold">Produkte</a>
              <i class="fas fa-chevron-right mx-3 text-xs"></i>
              <span id="breadcrumb-category" class="hover:text-gold">Kategorie</span>
              <i class="fas fa-chevron-right mx-3 text-xs"></i>
              <span id="breadcrumb-product" style="color: var(--navy-dark);" class="font-semibold">Produkt</span>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <main class="container mx-auto px-6 py-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Image Gallery -->
            <div class="lg:col-span-2">
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <!-- Image Gallery -->
                <div class="image-gallery">
                  <div id="gallery-main" class="gallery-main cursor-zoom-in">
                    <div class="skeleton w-full h-[500px]"></div>
                  </div>
                  <div id="gallery-thumbnails" class="gallery-thumbnails">
                    <!-- Thumbnails loaded dynamically -->
                  </div>
                  
                  <!-- Zoom Overlay -->
                  <div id="zoom-overlay" class="zoom-overlay">
                    <img id="zoom-image" src="" alt="Zoomed" />
                  </div>
                </div>

                <!-- Product Info -->
                <div class="mt-8">
                  <div class="flex items-center justify-between mb-4">
                    <span id="product-category" class="text-sm font-semibold uppercase tracking-wide" style="color: var(--gold);">
                      Kategorie
                    </span>
                    <div class="flex items-center space-x-2">
                      <button class="wishlist-btn" id="wishlist-btn" title="Zur Wunschliste hinzufügen">
                        <i class="far fa-heart text-xl"></i>
                      </button>
                      <button class="wishlist-btn" title="Zum Vergleich hinzufügen">
                        <i class="fas fa-balance-scale text-xl"></i>
                      </button>
                      <button class="wishlist-btn" title="Teilen">
                        <i class="fas fa-share-alt text-xl"></i>
                      </button>
                    </div>
                  </div>

                  <h1 id="product-name" class="text-4xl font-bold mb-4" style="color: var(--navy-dark);">
                    <div class="skeleton h-10 w-3/4"></div>
                  </h1>

                  <div class="flex items-center space-x-4 mb-6">
                    <div class="rating-stars" id="product-rating">
                      <!-- Stars loaded dynamically -->
                    </div>
                    <span id="rating-text" class="text-gray-600 text-sm">Lädt...</span>
                    <a href="#reviews" class="text-sm" style="color: var(--gold);">Bewertungen ansehen</a>
                  </div>

                  <div class="flex items-center space-x-4 mb-6">
                    <span class="text-sm text-gray-600">SKU:</span>
                    <span id="product-sku" class="font-mono text-sm font-semibold" style="color: var(--navy-dark);">-</span>
                    <span class="text-sm text-gray-600 ml-4">Marke:</span>
                    <span id="product-brand" class="font-semibold text-sm" style="color: var(--navy-dark);">-</span>
                  </div>

                  <!-- Trust Badges -->
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    <div class="trust-badge">
                      <i class="fas fa-download text-xl" style="color: var(--gold);"></i>
                      <span class="text-sm">Sofort-Download</span>
                    </div>
                    <div class="trust-badge">
                      <i class="fas fa-shield-check text-xl" style="color: var(--gold);"></i>
                      <span class="text-sm">100% Legal</span>
                    </div>
                    <div class="trust-badge">
                      <i class="fas fa-infinity text-xl" style="color: var(--gold);"></i>
                      <span class="text-sm">Lifetime</span>
                    </div>
                    <div class="trust-badge">
                      <i class="fas fa-headset text-xl" style="color: var(--gold);"></i>
                      <span class="text-sm">24/7 Support</span>
                    </div>
                  </div>
                </div>

                <!-- Tabs -->
                <div class="mt-8 border-t border-gray-200">
                  <div class="flex border-b border-gray-200">
                    <button class="tab-button active" data-tab="description">
                      <i class="fas fa-file-alt mr-2"></i>Beschreibung
                    </button>
                    <button class="tab-button" data-tab="features">
                      <i class="fas fa-list-ul mr-2"></i>Features
                    </button>
                    <button class="tab-button" data-tab="requirements">
                      <i class="fas fa-cogs mr-2"></i>Systemanforderungen
                    </button>
                    <button class="tab-button" data-tab="delivery">
                      <i class="fas fa-truck mr-2"></i>Lieferung
                    </button>
                  </div>

                  <div class="py-6">
                    <!-- Description Tab -->
                    <div id="tab-description" class="tab-content active">
                      <div id="product-description" class="prose max-w-none">
                        <div class="skeleton h-4 w-full mb-2"></div>
                        <div class="skeleton h-4 w-5/6 mb-2"></div>
                        <div class="skeleton h-4 w-4/6"></div>
                      </div>
                    </div>

                    <!-- Features Tab -->
                    <div id="tab-features" class="tab-content">
                      <div id="product-features" class="space-y-3">
                        <!-- Features loaded dynamically -->
                      </div>
                    </div>

                    <!-- Requirements Tab -->
                    <div id="tab-requirements" class="tab-content">
                      <div class="bg-gray-50 rounded-xl p-6">
                        <h3 class="font-bold text-lg mb-4" style="color: var(--navy-dark);">Systemanforderungen</h3>
                        <ul class="space-y-2 text-gray-700">
                          <li><i class="fas fa-check-circle mr-2" style="color: var(--gold);"></i>Prozessor: 1 GHz oder schneller</li>
                          <li><i class="fas fa-check-circle mr-2" style="color: var(--gold);"></i>RAM: 2 GB (64-bit)</li>
                          <li><i class="fas fa-check-circle mr-2" style="color: var(--gold);"></i>Festplattenspeicher: 20 GB</li>
                          <li><i class="fas fa-check-circle mr-2" style="color: var(--gold);"></i>Grafikkarte: DirectX 9 oder höher</li>
                          <li><i class="fas fa-check-circle mr-2" style="color: var(--gold);"></i>Internetverbindung für Aktivierung</li>
                        </ul>
                      </div>
                    </div>

                    <!-- Delivery Tab -->
                    <div id="tab-delivery" class="tab-content">
                      <div class="bg-gray-50 rounded-xl p-6">
                        <h3 class="font-bold text-lg mb-4" style="color: var(--navy-dark);">Lieferung & Installation</h3>
                        <div class="space-y-4">
                          <div class="flex items-start space-x-4">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white" style="background-color: var(--gold);">
                              <i class="fas fa-envelope"></i>
                            </div>
                            <div>
                              <h4 class="font-semibold mb-1">1. Sofortiger E-Mail-Versand</h4>
                              <p class="text-sm text-gray-600">Ihre Lizenz wird direkt nach Zahlungseingang per E-Mail verschickt.</p>
                            </div>
                          </div>
                          <div class="flex items-start space-x-4">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white" style="background-color: var(--gold);">
                              <i class="fas fa-download"></i>
                            </div>
                            <div>
                              <h4 class="font-semibold mb-1">2. Download-Link</h4>
                              <p class="text-sm text-gray-600">Erhalten Sie den offiziellen Download-Link direkt von Microsoft/Adobe.</p>
                            </div>
                          </div>
                          <div class="flex items-start space-x-4">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white" style="background-color: var(--gold);">
                              <i class="fas fa-key"></i>
                            </div>
                            <div>
                              <h4 class="font-semibold mb-1">3. Aktivierung</h4>
                              <p class="text-sm text-gray-600">Aktivieren Sie Ihre Software mit dem mitgelieferten Produktschlüssel.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reviews Section -->
              <div id="reviews" class="bg-white rounded-2xl shadow-lg p-6 mt-8">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-2xl font-bold" style="color: var(--navy-dark);">
                    <i class="fas fa-star mr-2" style="color: var(--gold);"></i>
                    Kundenbewertungen
                  </h2>
                  <button class="px-6 py-2 rounded-lg font-semibold transition text-white" style="background-color: var(--gold);">
                    Bewertung schreiben
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                  <div class="text-center">
                    <div class="text-5xl font-bold mb-2" style="color: var(--gold);">4.9</div>
                    <div class="rating-stars justify-center mb-2">
                      <i class="fas fa-star rating-star"></i>
                      <i class="fas fa-star rating-star"></i>
                      <i class="fas fa-star rating-star"></i>
                      <i class="fas fa-star rating-star"></i>
                      <i class="fas fa-star rating-star"></i>
                    </div>
                    <div class="text-sm text-gray-600">Basierend auf 2.347 Bewertungen</div>
                  </div>
                  <div class="col-span-2 space-y-2">
                    <div class="flex items-center space-x-3">
                      <span class="text-sm w-16">5 Sterne</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full" style="width: 85%; background-color: var(--gold);"></div>
                      </div>
                      <span class="text-sm text-gray-600 w-12">85%</span>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-sm w-16">4 Sterne</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full" style="width: 10%; background-color: var(--gold);"></div>
                      </div>
                      <span class="text-sm text-gray-600 w-12">10%</span>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-sm w-16">3 Sterne</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full" style="width: 3%; background-color: var(--gold);"></div>
                      </div>
                      <span class="text-sm text-gray-600 w-12">3%</span>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-sm w-16">2 Sterne</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full" style="width: 1%; background-color: var(--gold);"></div>
                      </div>
                      <span class="text-sm text-gray-600 w-12">1%</span>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-sm w-16">1 Stern</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full" style="width: 1%; background-color: var(--gold);"></div>
                      </div>
                      <span class="text-sm text-gray-600 w-12">1%</span>
                    </div>
                  </div>
                </div>

                <!-- Sample Reviews -->
                <div class="space-y-4">
                  <div class="review-card">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center space-x-3">
                        <img src="https://i.pravatar.cc/48?img=11" alt="User" class="w-12 h-12 rounded-full" />
                        <div>
                          <div class="font-semibold" style="color: var(--navy-dark);">Michael Schmidt</div>
                          <div class="text-sm text-gray-500">vor 2 Tagen</div>
                        </div>
                      </div>
                      <div class="rating-stars">
                        <i class="fas fa-star rating-star"></i>
                        <i class="fas fa-star rating-star"></i>
                        <i class="fas fa-star rating-star"></i>
                        <i class="fas fa-star rating-star"></i>
                        <i class="fas fa-star rating-star"></i>
                      </div>
                    </div>
                    <h4 class="font-semibold mb-2">Sehr gute Erfahrung!</h4>
                    <p class="text-gray-700 mb-3">Schnelle Lieferung, originale Lizenz und günstiger Preis. Aktivierung hat problemlos funktioniert. Sehr zu empfehlen!</p>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <button class="hover:text-gold transition"><i class="far fa-thumbs-up mr-1"></i>Hilfreich (23)</button>
                      <button class="hover:text-gold transition"><i class="far fa-flag mr-1"></i>Melden</button>
                    </div>
                  </div>

                  <div class="review-card">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center space-x-3">
                        <img src="https://i.pravatar.cc/48?img=26" alt="User" class="w-12 h-12 rounded-full" />
                        <div>
                          <div class="font-semibold" style="color: var(--navy-dark);">Sarah Müller</div>
                          <div class="text-sm text-gray-500">vor 1 Woche</div>
                        </div>
                      </div>
                      <div class="rating-stars">
                        <i class="fas fa-star rating-star"></i>
                        <i class="fas fa-star rating-star"></i>
                        <i class="fas fa-star rating-star"></i>
                        <i class="fas fa-star rating-star"></i>
                        <i class="fas fa-star rating-star"></i>
                      </div>
                    </div>
                    <h4 class="font-semibold mb-2">Top Preis-Leistung</h4>
                    <p class="text-gray-700 mb-3">Habe schon mehrmals hier bestellt. Immer zuverlässig und deutlich günstiger als direkt bei Microsoft. Klare Empfehlung!</p>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <button class="hover:text-gold transition"><i class="far fa-thumbs-up mr-1"></i>Hilfreich (18)</button>
                      <button class="hover:text-gold transition"><i class="far fa-flag mr-1"></i>Melden</button>
                    </div>
                  </div>
                </div>

                <div class="text-center mt-6">
                  <button class="px-8 py-3 border-2 rounded-lg font-semibold transition" style="border-color: var(--gold); color: var(--gold);">
                    Alle Bewertungen anzeigen
                  </button>
                </div>
              </div>

              <!-- Related Products -->
              <div class="bg-white rounded-2xl shadow-lg p-6 mt-8">
                <h2 class="text-2xl font-bold mb-6" style="color: var(--navy-dark);">
                  <i class="fas fa-boxes mr-2" style="color: var(--gold);"></i>
                  Ähnliche Produkte
                </h2>
                <div id="related-products" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <!-- Related products loaded dynamically -->
                </div>
              </div>
            </div>

            <!-- Right Column: Sticky Purchase Box -->
            <div class="lg:col-span-1">
              <div class="sticky-cart bg-white rounded-2xl shadow-lg p-6">
                <!-- Price Section -->
                <div class="mb-6">
                  <div class="text-sm text-gray-600 mb-2">Preis:</div>
                  <div id="price-container" class="flex items-baseline space-x-3">
                    <div class="skeleton h-12 w-32"></div>
                  </div>
                  <div id="savings-badge" class="mt-3">
                    <!-- Savings badge loaded dynamically -->
                  </div>
                </div>

                <!-- Stock Status -->
                <div class="mb-6">
                  <div class="flex items-center space-x-2 text-green-600 font-semibold">
                    <i class="fas fa-check-circle"></i>
                    <span>Auf Lager - Sofort lieferbar</span>
                  </div>
                </div>

                <!-- Quantity Selector -->
                <div class="mb-6">
                  <label class="text-sm font-semibold mb-2 block" style="color: var(--navy-dark);">Menge:</label>
                  <div class="quantity-selector">
                    <button id="qty-minus" type="button">
                      <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" id="quantity" value="1" min="1" max="10" readonly />
                    <button id="qty-plus" type="button">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>

                <!-- Add to Cart Button -->
                <button id="add-to-cart-btn" class="w-full text-white py-4 rounded-xl font-bold text-lg transition-all mb-4 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl" style="background-color: var(--gold);">
                  <i class="fas fa-shopping-cart text-xl"></i>
                  <span>In den Warenkorb</span>
                </button>

                <!-- Buy Now Button -->
                <button class="w-full border-2 py-4 rounded-xl font-bold text-lg transition-all mb-6" style="border-color: var(--gold); color: var(--gold);">
                  <i class="fas fa-bolt mr-2"></i>
                  Jetzt kaufen
                </button>

                <!-- Security Features -->
                <div class="border-t border-gray-200 pt-6 space-y-4">
                  <div class="flex items-center space-x-3 text-sm">
                    <i class="fas fa-shield-check text-2xl" style="color: var(--gold);"></i>
                    <div>
                      <div class="font-semibold" style="color: var(--navy-dark);">Käuferschutz</div>
                      <div class="text-gray-600 text-xs">Sichere Zahlung & Datenschutz</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3 text-sm">
                    <i class="fas fa-undo-alt text-2xl" style="color: var(--gold);"></i>
                    <div>
                      <div class="font-semibold" style="color: var(--navy-dark);">14 Tage Rückgaberecht</div>
                      <div class="text-gray-600 text-xs">Geld-zurück-Garantie</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3 text-sm">
                    <i class="fas fa-headset text-2xl" style="color: var(--gold);"></i>
                    <div>
                      <div class="font-semibold" style="color: var(--navy-dark);">24/7 Support</div>
                      <div class="text-gray-600 text-xs">Wir helfen Ihnen gerne</div>
                    </div>
                  </div>
                </div>

                <!-- Payment Methods -->
                <div class="border-t border-gray-200 pt-6 mt-6">
                  <div class="text-sm font-semibold mb-3" style="color: var(--navy-dark);">Sichere Zahlungsarten:</div>
                  <div class="flex flex-wrap gap-2">
                    <img src="https://placehold.co/60x40/1a2a4e/FFF?text=PayPal" alt="PayPal" class="h-8 opacity-70" />
                    <img src="https://placehold.co/60x40/1a2a4e/FFF?text=Visa" alt="Visa" class="h-8 opacity-70" />
                    <img src="https://placehold.co/60x40/1a2a4e/FFF?text=MC" alt="Mastercard" class="h-8 opacity-70" />
                    <img src="https://placehold.co/60x40/1a2a4e/FFF?text=Klarna" alt="Klarna" class="h-8 opacity-70" />
                  </div>
                </div>

                <!-- Trust Seals -->
                <div class="border-t border-gray-200 pt-6 mt-6">
                  <div class="text-sm font-semibold mb-3" style="color: var(--navy-dark);">Zertifiziert & Geprüft:</div>
                  <div class="flex items-center justify-center space-x-4">
                    <div class="text-center">
                      <i class="fas fa-certificate text-3xl mb-1" style="color: var(--gold);"></i>
                      <div class="text-xs text-gray-600">SSL gesichert</div>
                    </div>
                    <div class="text-center">
                      <i class="fas fa-award text-3xl mb-1" style="color: var(--gold);"></i>
                      <div class="text-xs text-gray-600">TÜV geprüft</div>
                    </div>
                    <div class="text-center">
                      <i class="fas fa-star-half-alt text-3xl mb-1" style="color: var(--gold);"></i>
                      <div class="text-xs text-gray-600">Trusted Shops</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <!-- Footer -->
        <footer style="background-color: var(--navy-dark);" class="text-white mt-16 py-12">
          <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div class="flex items-center space-x-3 mb-4">
                  <div class="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl" style="background-color: var(--gold); color: var(--navy-dark);">
                    SK
                  </div>
                  <span class="text-xl font-bold">SoftwareKing24</span>
                </div>
                <p class="text-gray-400 text-sm mb-4">
                  Ihre vertrauenswürdige Quelle für Original-Software zu fairen Preisen.
                </p>
              </div>

              <div>
                <h4 class="font-bold mb-4" style="color: var(--gold);">Produktkategorien</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                  <li><a href="/produkte?category=Windows" class="hover:text-white transition">Windows</a></li>
                  <li><a href="/produkte?category=Office" class="hover:text-white transition">Microsoft Office</a></li>
                  <li><a href="/produkte?category=Antivirus" class="hover:text-white transition">Antivirus</a></li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold mb-4" style="color: var(--gold);">Kundenservice</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                  <li><a href="#" class="hover:text-white transition">Kontakt</a></li>
                  <li><a href="#" class="hover:text-white transition">Hilfe & FAQ</a></li>
                  <li><a href="#" class="hover:text-white transition">Versand</a></li>
                  <li><a href="#" class="hover:text-white transition">Rückgabe</a></li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold mb-4" style="color: var(--gold);">Rechtliches</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                  <li><a href="#" class="hover:text-white transition">AGB</a></li>
                  <li><a href="#" class="hover:text-white transition">Datenschutz</a></li>
                  <li><a href="#" class="hover:text-white transition">Impressum</a></li>
                  <li><a href="#" class="hover:text-white transition">Widerruf</a></li>
                </ul>
              </div>
            </div>

            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>© 2026 SoftwareKing24.de - Alle Rechte vorbehalten</p>
            </div>
          </div>
        </footer>

        <!-- Comparison Badge (floating) -->
        <div id="comparison-badge" class="comparison-badge" style="display: none;">
          <i class="fas fa-balance-scale mr-2"></i>
          <span id="comparison-count">0</span> Produkte vergleichen
        </div>

        <!-- JavaScript -->
        <script>
          // Get product slug from URL
          const urlParts = window.location.pathname.split('/');
          const productSlug = urlParts[urlParts.length - 1];

          let currentProduct = null;
          let quantity = 1;
          let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
          let comparison = JSON.parse(localStorage.getItem('comparison') || '[]');

          // Load product data
          async function loadProduct() {
            try {
              const response = await axios.get('/api/products/' + productSlug);
              if (response.data.success) {
                currentProduct = response.data.data;
                renderProduct(currentProduct);
                loadRelatedProducts(currentProduct.category);
              } else {
                showError('Produkt nicht gefunden');
              }
            } catch (error) {
              console.error('Error loading product:', error);
              showError('Fehler beim Laden des Produkts');
            }
          }

          // Render product
          function renderProduct(product) {
            // Update SEO
            document.getElementById('page-title').textContent = product.name + ' - SoftwareKing24';
            document.getElementById('page-description').content = product.short_description || product.long_description;
            document.getElementById('og-title').content = product.name;
            document.getElementById('og-description').content = product.short_description || product.long_description;

            // Breadcrumb
            document.getElementById('breadcrumb-category').textContent = product.category;
            document.getElementById('breadcrumb-product').textContent = product.name;

            // Image Gallery
            const mainImage = product.images && product.images.length > 0 
              ? product.images.find(img => img.is_primary) || product.images[0]
              : null;
            
            const galleryMain = document.getElementById('gallery-main');
            if (mainImage) {
              galleryMain.innerHTML = \`
                <img src="\${mainImage.image_url}" alt="\${mainImage.alt_text || product.name}" 
                     onerror="this.src='https://via.placeholder.com/600x400/1a2a4e/d4af37?text=\${encodeURIComponent(product.name)}'" />
              \`;
            } else {
              galleryMain.innerHTML = \`
                <div class="w-full h-[500px] flex items-center justify-center bg-gradient-to-br from-navy-light to-navy-medium">
                  <i class="fas fa-box text-8xl text-white opacity-30"></i>
                </div>
              \`;
            }

            // Thumbnails
            if (product.images && product.images.length > 1) {
              document.getElementById('gallery-thumbnails').innerHTML = product.images.map((img, i) => \`
                <div class="gallery-thumb \${i === 0 ? 'active' : ''}" onclick="changeImage('\${img.image_url}', \${i})">
                  <img src="\${img.image_url}" alt="\${img.alt_text || product.name}" 
                       onerror="this.src='https://via.placeholder.com/80x80/1a2a4e/d4af37'" />
                </div>
              \`).join('');
            }

            // Product Info
            document.getElementById('product-category').textContent = product.category || 'Software';
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-sku').textContent = product.sku || '-';
            document.getElementById('product-brand').textContent = product.brand || '-';

            // Rating
            const rating = product.rating_average || 4.9;
            const reviewCount = product.rating_count || 2347;
            const stars = Math.round(rating);
            document.getElementById('product-rating').innerHTML = Array(5).fill().map((_, i) => 
              \`<i class="fas fa-star rating-star\${i >= stars ? ' empty' : ''}"></i>\`
            ).join('');
            document.getElementById('rating-text').textContent = \`\${rating.toFixed(1)} von 5 (\${reviewCount} Bewertungen)\`;

            // Price
            const price = (product.base_price || product.price || 0);
            const salePrice = product.discount_price || product.sale_price;
            const hasDiscount = salePrice && salePrice < price;

            if (hasDiscount) {
              const savings = price - salePrice;
              const savingsPercent = Math.round((savings / price) * 100);
              
              document.getElementById('price-container').innerHTML = \`
                <div class="text-5xl font-bold text-red-600 price-highlight">\${formatPrice(salePrice)}</div>
                <div class="text-2xl text-gray-400 line-through">\${formatPrice(price)}</div>
              \`;
              
              document.getElementById('savings-badge').innerHTML = \`
                <div class="inline-flex items-center px-4 py-2 rounded-full text-white font-semibold" style="background-color: var(--gold);">
                  <i class="fas fa-tag mr-2"></i>
                  Sie sparen \${formatPrice(savings)} (-\${savingsPercent}%)
                </div>
              \`;
            } else {
              document.getElementById('price-container').innerHTML = \`
                <div class="text-5xl font-bold" style="color: var(--navy-dark);">\${formatPrice(price)}</div>
              \`;
            }

            // Description
            document.getElementById('product-description').innerHTML = product.long_description || product.short_description || '<p>Keine Beschreibung verfügbar.</p>';

            // Features
            if (product.features) {
              const featuresArray = typeof product.features === 'string' 
                ? product.features.split('\\n').filter(f => f.trim())
                : product.features;
              
              document.getElementById('product-features').innerHTML = featuresArray.map(feature => \`
                <div class="feature-item">
                  <div class="feature-icon">
                    <i class="fas fa-check text-xs"></i>
                  </div>
                  <span>\${feature}</span>
                </div>
              \`).join('');
            }

            // Check wishlist status
            if (wishlist.includes(product.id)) {
              document.getElementById('wishlist-btn').classList.add('active');
              document.getElementById('wishlist-btn').innerHTML = '<i class="fas fa-heart text-xl"></i>';
            }

            // Update comparison badge
            updateComparisonBadge();
          }

          // Format price
          function formatPrice(price) {
            return '€' + price.toFixed(2).replace('.', ',');
          }

          // Change image
          function changeImage(url, index) {
            document.getElementById('gallery-main').innerHTML = \`
              <img src="\${url}" alt="Product" class="cursor-zoom-in" onclick="zoomImage('\${url}')" />
            \`;
            
            document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
              thumb.classList.toggle('active', i === index);
            });
          }

          // Zoom image
          function zoomImage(url) {
            document.getElementById('zoom-image').src = url;
            document.getElementById('zoom-overlay').classList.add('active');
          }

          document.getElementById('zoom-overlay').addEventListener('click', function() {
            this.classList.remove('active');
          });

          // Tabs
          document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', function() {
              const tabName = this.getAttribute('data-tab');
              
              document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
              document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
              
              this.classList.add('active');
              document.getElementById('tab-' + tabName).classList.add('active');
            });
          });

          // Quantity controls
          document.getElementById('qty-minus').addEventListener('click', () => {
            if (quantity > 1) {
              quantity--;
              document.getElementById('quantity').value = quantity;
            }
          });

          document.getElementById('qty-plus').addEventListener('click', () => {
            if (quantity < 10) {
              quantity++;
              document.getElementById('quantity').value = quantity;
            }
          });

          // Add to cart
          document.getElementById('add-to-cart-btn').addEventListener('click', async () => {
            if (!currentProduct) return;

            try {
              if (window.cartManager) {
                const success = await window.cartManager.addToCart(currentProduct.id, quantity, 'single');
                if (success) {
                  // Success notification is shown by cartManager itself
                  console.log('Product added to cart:', currentProduct.id);
                }
              } else {
                showNotification('✗ Cart manager not initialized', 'error');
              }
            } catch (error) {
              console.error('Error adding to cart:', error);
              showNotification('✗ Fehler beim Hinzufügen zum Warenkorb', 'error');
            }
          });

          // Wishlist
          document.getElementById('wishlist-btn').addEventListener('click', () => {
            if (!currentProduct) return;

            const btn = document.getElementById('wishlist-btn');
            const isInWishlist = wishlist.includes(currentProduct.id);

            if (isInWishlist) {
              wishlist = wishlist.filter(id => id !== currentProduct.id);
              btn.classList.remove('active');
              btn.innerHTML = '<i class="far fa-heart text-xl"></i>';
              showNotification('Aus Wunschliste entfernt', 'info');
            } else {
              wishlist.push(currentProduct.id);
              btn.classList.add('active');
              btn.innerHTML = '<i class="fas fa-heart text-xl"></i>';
              showNotification('Zur Wunschliste hinzugefügt', 'success');
            }

            localStorage.setItem('wishlist', JSON.stringify(wishlist));
          });

          // Update comparison badge
          function updateComparisonBadge() {
            const badge = document.getElementById('comparison-badge');
            const count = comparison.length;
            
            if (count > 0) {
              badge.style.display = 'block';
              document.getElementById('comparison-count').textContent = count;
            } else {
              badge.style.display = 'none';
            }
          }

          // Load related products
          async function loadRelatedProducts(category) {
            try {
              const response = await axios.get('/api/products?category=' + category + '&limit=3');
              if (response.data.success) {
                const products = response.data.data.filter(p => p.id !== currentProduct.id).slice(0, 3);
                renderRelatedProducts(products);
              }
            } catch (error) {
              console.error('Error loading related products:', error);
            }
          }

          // Render related products
          function renderRelatedProducts(products) {
            document.getElementById('related-products').innerHTML = products.map(product => {
              const price = product.base_price || product.price || 0;
              const salePrice = product.discount_price || product.sale_price;
              const hasDiscount = salePrice && salePrice < price;

              return \`
                <div class="product-card-related">
                  <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <i class="fas fa-box text-5xl text-gray-300"></i>
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold mb-2 line-clamp-2" style="color: var(--navy-dark);">\${product.name}</h3>
                    <div class="flex items-baseline space-x-2 mb-3">
                      \${hasDiscount ? \`
                        <span class="text-xl font-bold text-red-600">\${formatPrice(salePrice)}</span>
                        <span class="text-sm text-gray-400 line-through">\${formatPrice(price)}</span>
                      \` : \`
                        <span class="text-xl font-bold" style="color: var(--navy-dark);">\${formatPrice(price)}</span>
                      \`}
                    </div>
                    <a href="/produkt/\${product.slug}" class="block w-full text-center py-2 rounded-lg font-semibold transition text-white" style="background-color: var(--gold);">
                      Ansehen
                    </a>
                  </div>
                </div>
              \`;
            }).join('');
          }

          // Show notification
          function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
            notification.className = \`fixed bottom-20 left-6 \${bgColor} text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-slideUp\`;
            notification.textContent = message;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
          }

          // Show error
          function showError(message) {
            document.querySelector('main').innerHTML = \`
              <div class="text-center py-20">
                <i class="fas fa-exclamation-triangle text-6xl text-gray-300 mb-4"></i>
                <h2 class="text-2xl font-bold text-gray-700 mb-2">\${message}</h2>
                <a href="/produkte" class="inline-block mt-4 px-6 py-3 rounded-lg text-white font-semibold" style="background-color: var(--gold);">
                  Zurück zu den Produkten
                </a>
              </div>
            \`;
          }

          // Cart badge update
          if (window.CartManager) {
            CartManager.updateCartBadge();
          }

          // Initial load
          loadProduct();
        </script>
      </body>
    </html>
  `;
};
