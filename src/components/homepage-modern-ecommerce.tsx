// Modern E-Commerce Homepage for SOFTWAREKING24
// Inspired by modern shop designs with brand colors #132C46 (Navy) and #D9A50B (Gold)

export function HomepageModernEcommerce() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SoftwareKing24 – Ihr Partner für günstige Software Lizenzen</title>
      <meta name="description" content="Günstige Software Lizenzen kaufen – Original & Sofort verfügbar. Windows 11, Microsoft Office 2024, Antivirus-Programme, Serverlösungen zu Top-Preisen.">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                'brand-navy': '#132C46',
                'brand-gold': '#D9A50B',
              }
            }
          }
        }
      </script>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Product card hover effects */
        .product-card {
          transition: all 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(19, 44, 70, 0.15);
        }

        /* Category circle hover */
        .category-circle {
          transition: all 0.3s ease;
        }
        
        .category-circle:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 16px rgba(19, 44, 70, 0.2);
        }

        /* Button animations */
        .btn-primary {
          background: #D9A50B;
          color: white;
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background: #c29209;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(217, 165, 11, 0.4);
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid #D9A50B;
          color: #D9A50B;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: #D9A50B;
          color: white;
        }

        /* Countdown timer */
        .countdown-box {
          background: #132C46;
          color: white;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          min-width: 70px;
        }

        /* Sale badge */
        .sale-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #DC2626;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: bold;
          font-size: 14px;
          z-index: 10;
        }

        /* Feature icon */
        .feature-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #D9A50B 0%, #c29209 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin: 0 auto 16px;
        }

        /* Promo banner gradient */
        .promo-banner {
          background: linear-gradient(135deg, #132C46 0%, #1a3a5f 100%);
        }

        /* Star rating */
        .stars {
          color: #D9A50B;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 32px !important;
          }
          
          .category-circle {
            width: 80px !important;
            height: 80px !important;
          }
        }

        /* FAQ Accordion */
        .faq-item {
          border-bottom: 1px solid #e5e7eb;
        }
        
        .faq-question {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .faq-question:hover {
          color: #D9A50B;
        }
        
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .faq-answer.active {
          max-height: 500px;
        }
      </style>
    </head>
    <body class="bg-white">
      
      <!-- Top Bar -->
      <div class="bg-brand-navy text-white py-2 text-sm">
        <div class="container mx-auto px-4 flex justify-between items-center">
          <div class="flex items-center gap-6">
            <span><i class="fas fa-envelope mr-2"></i>support@softwareking24.com</span>
            <span><i class="fas fa-phone mr-2"></i>+49 (0)30 1234 5678</span>
          </div>
          <div class="flex items-center gap-4">
            <span>Willkommen!</span>
            <span>|</span>
            <a href="/account" class="hover:text-brand-gold transition">Mein Konto</a>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <header class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            
            <!-- Logo -->
            <div class="flex items-center">
              <a href="/" class="flex items-center">
                <img src="/static/logo.png" alt="SoftwareKing24" class="h-12">
              </a>
            </div>

            <!-- Search Bar -->
            <div class="flex-1 mx-8 max-w-2xl">
              <div class="relative">
                <input 
                  type="text" 
                  placeholder="Suchen Sie nach Produkten, Kategorien..." 
                  class="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-brand-gold"
                >
                <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-gold text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>

            <!-- Header Icons -->
            <div class="flex items-center gap-6">
              <a href="/account" class="flex flex-col items-center text-brand-navy hover:text-brand-gold transition">
                <i class="fas fa-user text-2xl mb-1"></i>
                <span class="text-xs">Konto</span>
              </a>
              <a href="/wishlist" class="flex flex-col items-center text-brand-navy hover:text-brand-gold transition relative">
                <i class="fas fa-heart text-2xl mb-1"></i>
                <span class="text-xs">Wunschliste</span>
                <span class="absolute -top-2 -right-2 bg-brand-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
              </a>
              <a href="/cart" class="flex flex-col items-center text-brand-navy hover:text-brand-gold transition relative">
                <i class="fas fa-shopping-cart text-2xl mb-1"></i>
                <span class="text-xs">Warenkorb</span>
                <span class="absolute -top-2 -right-2 bg-brand-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Main Navigation -->
        <nav class="bg-brand-navy text-white">
          <div class="container mx-auto px-4">
            <ul class="flex items-center justify-center gap-8 py-3">
              <li><a href="/" class="hover:text-brand-gold transition font-medium"><i class="fas fa-home mr-2"></i>Startseite</a></li>
              <li><a href="/products?category=windows" class="hover:text-brand-gold transition font-medium">Windows</a></li>
              <li><a href="/products?category=office" class="hover:text-brand-gold transition font-medium">Microsoft Office</a></li>
              <li><a href="/products?category=server" class="hover:text-brand-gold transition font-medium">Server</a></li>
              <li><a href="/products?category=antivirus" class="hover:text-brand-gold transition font-medium">Antivirus</a></li>
              <li><a href="/products?category=cad" class="hover:text-brand-gold transition font-medium">CAD Software</a></li>
              <li><a href="/contact" class="hover:text-brand-gold transition font-medium">Kontakt</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <!-- Hero Section -->
      <section class="promo-banner text-white py-20 relative overflow-hidden">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            
            <!-- Left: Text Content -->
            <div class="z-10">
              <span class="text-brand-gold text-lg font-semibold mb-4 block">Günstige Software Lizenzen</span>
              <h1 class="hero-title text-5xl font-bold mb-6">
                Original & Sofort <br>
                <span class="text-brand-gold">verfügbar</span>
              </h1>
              <p class="text-xl text-gray-300 mb-8 leading-relaxed">
                Windows 11, Microsoft Office 2024, Antivirus-Programme, Serverlösungen – 
                direkt per E-Mail geliefert zu Top-Preisen.
              </p>
              <div class="flex gap-4">
                <a href="/products" class="btn-primary px-8 py-4 rounded-full font-semibold inline-flex items-center">
                  Jetzt Einkaufen <i class="fas fa-arrow-right ml-2"></i>
                </a>
                <a href="#about" class="btn-secondary px-8 py-4 rounded-full font-semibold inline-flex items-center">
                  Mehr Erfahren
                </a>
              </div>
            </div>

            <!-- Right: Hero Image Placeholder -->
            <div class="z-10">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div class="aspect-video bg-gradient-to-br from-brand-gold/20 to-brand-navy/20 rounded-xl flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-laptop-code text-8xl text-white/30 mb-4"></i>
                    <p class="text-white/50 text-sm">Hero Image Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/10 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-1/3 h-full bg-brand-gold/5 blur-3xl"></div>
      </section>

      <!-- Trust Badges -->
      <section class="py-8 bg-gray-50 border-y border-gray-200">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            <div class="flex items-center gap-4">
              <div class="feature-icon">
                <i class="fas fa-shipping-fast"></i>
              </div>
              <div>
                <h4 class="font-bold text-brand-navy">Sofortiger Versand</h4>
                <p class="text-sm text-gray-600">Lieferung per E-Mail</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="feature-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <div>
                <h4 class="font-bold text-brand-navy">100% Original</h4>
                <p class="text-sm text-gray-600">Geprüfte Lizenzen</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="feature-icon">
                <i class="fas fa-lock"></i>
              </div>
              <div>
                <h4 class="font-bold text-brand-navy">Sichere Zahlung</h4>
                <p class="text-sm text-gray-600">SSL-verschlüsselt</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="feature-icon">
                <i class="fas fa-headset"></i>
              </div>
              <div>
                <h4 class="font-bold text-brand-navy">24/7 Support</h4>
                <p class="text-sm text-gray-600">Persönlicher Service</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Popular Categories -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-brand-navy mb-4">Beliebte Kategorien</h2>
            <p class="text-gray-600 text-lg">Entdecken Sie unsere Top-Software-Kategorien</p>
          </div>

          <div class="grid grid-cols-3 md:grid-cols-6 gap-8">
            
            <a href="/products?category=windows" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-brand-navy to-brand-navy/80 rounded-full flex items-center justify-center mb-3 group-hover:from-brand-gold group-hover:to-yellow-600 transition-all">
                <i class="fab fa-windows text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-brand-navy group-hover:text-brand-gold transition">Windows</h4>
            </a>

            <a href="/products?category=office" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-brand-navy to-brand-navy/80 rounded-full flex items-center justify-center mb-3 group-hover:from-brand-gold group-hover:to-yellow-600 transition-all">
                <i class="fas fa-file-word text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-brand-navy group-hover:text-brand-gold transition">Office</h4>
            </a>

            <a href="/products?category=server" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-brand-navy to-brand-navy/80 rounded-full flex items-center justify-center mb-3 group-hover:from-brand-gold group-hover:to-yellow-600 transition-all">
                <i class="fas fa-server text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-brand-navy group-hover:text-brand-gold transition">Server</h4>
            </a>

            <a href="/products?category=antivirus" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-brand-navy to-brand-navy/80 rounded-full flex items-center justify-center mb-3 group-hover:from-brand-gold group-hover:to-yellow-600 transition-all">
                <i class="fas fa-shield-virus text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-brand-navy group-hover:text-brand-gold transition">Antivirus</h4>
            </a>

            <a href="/products?category=cad" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-brand-navy to-brand-navy/80 rounded-full flex items-center justify-center mb-3 group-hover:from-brand-gold group-hover:to-yellow-600 transition-all">
                <i class="fas fa-drafting-compass text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-brand-navy group-hover:text-brand-gold transition">CAD</h4>
            </a>

            <a href="/products" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-brand-navy to-brand-navy/80 rounded-full flex items-center justify-center mb-3 group-hover:from-brand-gold group-hover:to-yellow-600 transition-all">
                <i class="fas fa-th text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-brand-navy group-hover:text-brand-gold transition">Alle</h4>
            </a>

          </div>
        </div>
      </section>

      <!-- Deals of the Day -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center mb-12">
            <div>
              <h2 class="text-4xl font-bold text-brand-navy mb-2">Deals des Tages</h2>
              <p class="text-gray-600">Verpassen Sie nicht unsere täglichen Angebote</p>
            </div>
            <div class="flex gap-3">
              <div class="countdown-box">
                <div class="text-3xl font-bold">08</div>
                <div class="text-xs text-gray-300">Std</div>
              </div>
              <div class="countdown-box">
                <div class="text-3xl font-bold">23</div>
                <div class="text-xs text-gray-300">Min</div>
              </div>
              <div class="countdown-box">
                <div class="text-3xl font-bold">45</div>
                <div class="text-xs text-gray-300">Sek</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <!-- Deal Product Card 1 -->
            <div class="product-card bg-white rounded-xl shadow-md overflow-hidden relative">
              <div class="sale-badge">-35%</div>
              <div class="aspect-square bg-gray-100 flex items-center justify-center p-8">
                <i class="fab fa-windows text-8xl text-brand-navy opacity-20"></i>
              </div>
              <div class="p-6">
                <p class="text-sm text-gray-500 mb-2">Betriebssystem</p>
                <h3 class="font-bold text-lg text-brand-navy mb-2 line-clamp-2">Windows 11 Pro</h3>
                <div class="flex items-center gap-1 mb-3">
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <span class="text-sm text-gray-500 ml-2">(127)</span>
                </div>
                <div class="flex items-baseline gap-2 mb-4">
                  <span class="text-2xl font-bold text-brand-gold">€49,90</span>
                  <span class="text-sm text-gray-400 line-through">€76,90</span>
                </div>
                <button class="w-full bg-brand-navy text-white py-3 rounded-lg hover:bg-brand-gold transition font-semibold">
                  <i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb
                </button>
              </div>
            </div>

            <!-- Deal Product Card 2 -->
            <div class="product-card bg-white rounded-xl shadow-md overflow-hidden relative">
              <div class="sale-badge">-40%</div>
              <div class="aspect-square bg-gray-100 flex items-center justify-center p-8">
                <i class="fas fa-file-word text-8xl text-brand-navy opacity-20"></i>
              </div>
              <div class="p-6">
                <p class="text-sm text-gray-500 mb-2">Office Suite</p>
                <h3 class="font-bold text-lg text-brand-navy mb-2 line-clamp-2">Microsoft Office 2021 Pro Plus</h3>
                <div class="flex items-center gap-1 mb-3">
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <span class="text-sm text-gray-500 ml-2">(95)</span>
                </div>
                <div class="flex items-baseline gap-2 mb-4">
                  <span class="text-2xl font-bold text-brand-gold">€39,90</span>
                  <span class="text-sm text-gray-400 line-through">€66,90</span>
                </div>
                <button class="w-full bg-brand-navy text-white py-3 rounded-lg hover:bg-brand-gold transition font-semibold">
                  <i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb
                </button>
              </div>
            </div>

            <!-- Deal Product Card 3 -->
            <div class="product-card bg-white rounded-xl shadow-md overflow-hidden relative">
              <div class="sale-badge">-50%</div>
              <div class="aspect-square bg-gray-100 flex items-center justify-center p-8">
                <i class="fas fa-shield-virus text-8xl text-brand-navy opacity-20"></i>
              </div>
              <div class="p-6">
                <p class="text-sm text-gray-500 mb-2">Sicherheit</p>
                <h3 class="font-bold text-lg text-brand-navy mb-2 line-clamp-2">Norton 360 Deluxe - 5 Geräte</h3>
                <div class="flex items-center gap-1 mb-3">
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star-half-alt stars text-sm"></i>
                  <span class="text-sm text-gray-500 ml-2">(82)</span>
                </div>
                <div class="flex items-baseline gap-2 mb-4">
                  <span class="text-2xl font-bold text-brand-gold">€29,90</span>
                  <span class="text-sm text-gray-400 line-through">€59,90</span>
                </div>
                <button class="w-full bg-brand-navy text-white py-3 rounded-lg hover:bg-brand-gold transition font-semibold">
                  <i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb
                </button>
              </div>
            </div>

            <!-- Deal Product Card 4 -->
            <div class="product-card bg-white rounded-xl shadow-md overflow-hidden relative">
              <div class="sale-badge">-30%</div>
              <div class="aspect-square bg-gray-100 flex items-center justify-center p-8">
                <i class="fas fa-server text-8xl text-brand-navy opacity-20"></i>
              </div>
              <div class="p-6">
                <p class="text-sm text-gray-500 mb-2">Server</p>
                <h3 class="font-bold text-lg text-brand-navy mb-2 line-clamp-2">Windows Server 2022 Standard</h3>
                <div class="flex items-center gap-1 mb-3">
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <i class="fas fa-star stars text-sm"></i>
                  <span class="text-sm text-gray-500 ml-2">(64)</span>
                </div>
                <div class="flex items-baseline gap-2 mb-4">
                  <span class="text-2xl font-bold text-brand-gold">€299,90</span>
                  <span class="text-sm text-gray-400 line-through">€428,90</span>
                </div>
                <button class="w-full bg-brand-navy text-white py-3 rounded-lg hover:bg-brand-gold transition font-semibold">
                  <i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Windows 11 Benefits Section -->
      <section class="py-16 bg-white" id="windows11">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            
            <!-- Left: Image Placeholder -->
            <div>
              <div class="bg-gradient-to-br from-brand-navy to-brand-navy/80 rounded-2xl p-12 aspect-video flex items-center justify-center">
                <div class="text-center">
                  <i class="fab fa-windows text-9xl text-white/20 mb-4"></i>
                  <p class="text-white/50">Windows 11 Image</p>
                </div>
              </div>
            </div>

            <!-- Right: Content -->
            <div>
              <h2 class="text-4xl font-bold text-brand-navy mb-6">
                Lohnt sich für mich ein Wechsel zu Windows 11?
              </h2>
              <div class="space-y-6">
                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center">
                      <i class="fas fa-check text-white text-xl"></i>
                    </div>
                  </div>
                  <div>
                    <h3 class="font-bold text-xl text-brand-navy mb-2">Welche Vorteile bringt das Upgrade wirklich?</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Windows 11 bietet ein modernes Design, verbesserte Performance und neue Funktionen für 
                      produktiveres Arbeiten. Die intuitive Benutzeroberfläche macht die Bedienung noch einfacher.
                    </p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center">
                      <i class="fas fa-info-circle text-white text-xl"></i>
                    </div>
                  </div>
                  <div>
                    <h3 class="font-bold text-xl text-brand-navy mb-2">Welche möglichen Nachteile sollte ich vorher kennen?</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Ältere Hardware könnte nicht kompatibel sein. Prüfen Sie vor dem Upgrade die 
                      Systemanforderungen. Einige Legacy-Programme benötigen möglicherweise Updates.
                    </p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center">
                      <i class="fas fa-microchip text-white text-xl"></i>
                    </div>
                  </div>
                  <div>
                    <h3 class="font-bold text-xl text-brand-navy mb-2">Ist mein PC überhaupt leistungsfähig genug?</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Windows 11 benötigt mindestens 4GB RAM, 64GB Speicher und einen TPM 2.0-Chip. 
                      Überprüfen Sie die Kompatibilität mit dem offiziellen Microsoft PC Health Check Tool.
                    </p>
                  </div>
                </div>

                <div class="mt-8">
                  <a href="/products?category=windows" class="btn-primary px-8 py-4 rounded-lg font-semibold inline-flex items-center">
                    Windows 11 jetzt kaufen <i class="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Promotional Banners Grid -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-3 gap-6">
            
            <!-- Banner 1: Office -->
            <div class="relative rounded-2xl overflow-hidden group cursor-pointer">
              <div class="bg-gradient-to-br from-blue-600 to-blue-800 p-8 h-64 flex flex-col justify-between">
                <div>
                  <span class="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    Bestseller
                  </span>
                  <h3 class="text-3xl font-bold text-white mb-2">Microsoft Office</h3>
                  <p class="text-white/80">Ab €39,90</p>
                </div>
                <a href="/products?category=office" class="inline-flex items-center text-white font-semibold group-hover:gap-4 transition-all">
                  Jetzt Shoppen <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
              <div class="absolute top-0 right-0 w-1/2 h-full">
                <i class="fas fa-file-word text-white/10 text-9xl absolute -top-8 -right-8"></i>
              </div>
            </div>

            <!-- Banner 2: Server -->
            <div class="relative rounded-2xl overflow-hidden group cursor-pointer">
              <div class="bg-gradient-to-br from-brand-navy to-brand-navy/80 p-8 h-64 flex flex-col justify-between">
                <div>
                  <span class="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    Für Unternehmen
                  </span>
                  <h3 class="text-3xl font-bold text-white mb-2">Server Lösungen</h3>
                  <p class="text-white/80">Ab €299,90</p>
                </div>
                <a href="/products?category=server" class="inline-flex items-center text-white font-semibold group-hover:gap-4 transition-all">
                  Jetzt Shoppen <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
              <div class="absolute top-0 right-0 w-1/2 h-full">
                <i class="fas fa-server text-white/10 text-9xl absolute -top-8 -right-8"></i>
              </div>
            </div>

            <!-- Banner 3: Antivirus -->
            <div class="relative rounded-2xl overflow-hidden group cursor-pointer">
              <div class="bg-gradient-to-br from-red-600 to-red-800 p-8 h-64 flex flex-col justify-between">
                <div>
                  <span class="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    Sicherheit
                  </span>
                  <h3 class="text-3xl font-bold text-white mb-2">Antivirus Software</h3>
                  <p class="text-white/80">Ab €29,90</p>
                </div>
                <a href="/products?category=antivirus" class="inline-flex items-center text-white font-semibold group-hover:gap-4 transition-all">
                  Jetzt Shoppen <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
              <div class="absolute top-0 right-0 w-1/2 h-full">
                <i class="fas fa-shield-virus text-white/10 text-9xl absolute -top-8 -right-8"></i>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- About Section - Why Choose Us -->
      <section class="py-16 bg-white" id="about">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-brand-navy mb-4">Warum SoftwareKing24?</h2>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto">
              Unsere Software ist leicht zu nutzen und schnell installiert. 
              Sie suchen zuverlässige Software zu fairen Preisen? Dann sind Sie bei Softwareking24 genau richtig.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 mb-12">
            
            <div class="text-center p-8 bg-gray-50 rounded-xl">
              <div class="feature-icon">
                <i class="fas fa-certificate"></i>
              </div>
              <h3 class="text-xl font-bold text-brand-navy mb-3">100% Original Lizenzen</h3>
              <p class="text-gray-600 leading-relaxed">
                Wir setzen ausschließlich auf geprüfte Software namhafter Hersteller. 
                Dadurch können Sie sicher sein, dass Installation und Aktivierung reibungslos funktionieren.
              </p>
            </div>

            <div class="text-center p-8 bg-gray-50 rounded-xl">
              <div class="feature-icon">
                <i class="fas fa-bolt"></i>
              </div>
              <h3 class="text-xl font-bold text-brand-navy mb-3">Sofortige Lieferung</h3>
              <p class="text-gray-600 leading-relaxed">
                Dank unseres digitalen Lieferprozesses erhalten Sie Ihre Lizenz oft schon innerhalb 
                weniger Minuten per E-Mail. Keine Wartezeit, sofort einsatzbereit.
              </p>
            </div>

            <div class="text-center p-8 bg-gray-50 rounded-xl">
              <div class="feature-icon">
                <i class="fas fa-user-shield"></i>
              </div>
              <h3 class="text-xl font-bold text-brand-navy mb-3">Persönlicher Support</h3>
              <p class="text-gray-600 leading-relaxed">
                Unser Kundenservice unterstützt Sie bei Installation, Aktivierung und Fragen zu Ihrem Produkt. 
                Wir sind für Sie da.
              </p>
            </div>

          </div>

          <!-- ESD License Info -->
          <div class="bg-gradient-to-br from-brand-navy to-brand-navy/90 text-white rounded-2xl p-12">
            <div class="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 class="text-3xl font-bold mb-4">ESD-Lizenzen – Schnell, Sicher, Umweltfreundlich</h3>
                <p class="text-white/90 leading-relaxed mb-6">
                  Unsere ESD-Lizenzen (Electronic Software Delivery) ermöglichen einen schnellen, 
                  umweltfreundlichen und sicheren Erwerb Ihrer Wunschsoftware – ganz ohne Versand. 
                  Sie erhalten den Lizenzschlüssel sofort nach dem Kauf, inklusive Anleitung zur einfachen Aktivierung.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-center gap-3">
                    <i class="fas fa-check-circle text-brand-gold text-xl"></i>
                    <span>Sofort nach Kauf verfügbar</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <i class="fas fa-check-circle text-brand-gold text-xl"></i>
                    <span>Umweltfreundlich ohne physischen Versand</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <i class="fas fa-check-circle text-brand-gold text-xl"></i>
                    <span>Rechtssicher und zertifiziert</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <i class="fas fa-check-circle text-brand-gold text-xl"></i>
                    <span>Inklusive Installationsanleitung</span>
                  </li>
                </ul>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div class="aspect-square bg-brand-gold/20 rounded-xl flex items-center justify-center">
                  <i class="fas fa-download text-9xl text-white/20"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Categories Detail -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="space-y-16">
            
            <!-- Betriebssysteme -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span class="inline-block bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Betriebssysteme
                </span>
                <h2 class="text-4xl font-bold text-brand-navy mb-4">
                  Die Grundlage für Ihren PC
                </h2>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Ein stabiles Betriebssystem ist entscheidend dafür, dass Ihr Computer zuverlässig läuft. 
                  Es verwaltet Ihre Programme, steuert die Hardware und sorgt dafür, dass alles schnell und flüssig funktioniert.
                </p>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Bei Softwareking24 finden Sie moderne Windows-Versionen, die eine einfache Bedienung bieten 
                  und durch hohe Sicherheit überzeugen. Ob privat oder beruflich – mit dem passenden Betriebssystem 
                  schaffen Sie eine solide Basis für Ihren Alltag am PC.
                </p>
                <a href="/products?category=windows" class="btn-primary px-8 py-3 rounded-lg font-semibold inline-flex items-center">
                  Windows Versionen ansehen <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
              <div class="bg-white rounded-2xl p-8 shadow-lg">
                <div class="aspect-video bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-xl flex items-center justify-center">
                  <i class="fab fa-windows text-9xl text-brand-navy/20"></i>
                </div>
              </div>
            </div>

            <!-- Server -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="order-2 md:order-1 bg-white rounded-2xl p-8 shadow-lg">
                <div class="aspect-video bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-xl flex items-center justify-center">
                  <i class="fas fa-server text-9xl text-brand-navy/20"></i>
                </div>
              </div>
              <div class="order-1 md:order-2">
                <span class="inline-block bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Serverbetriebssysteme
                </span>
                <h2 class="text-4xl font-bold text-brand-navy mb-4">
                  Für Ihr Unternehmen
                </h2>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Unternehmen benötigen zuverlässige Serverlösungen, die Sicherheit, Leistung und Skalierbarkeit verbinden. 
                  Genau das bieten unsere Serverbetriebssysteme. Wir führen verschiedene Versionen von Microsoft Windows Server, 
                  ergänzt durch beliebte Dienste wie SQL Server, Exchange oder SharePoint.
                </p>
                <p class="text-gray-600 leading-relaxed mb-6">
                  So können Sie Ihr Netzwerk flexibel aufbauen und für zukünftige Anforderungen problemlos erweitern.
                </p>
                <a href="/products?category=server" class="btn-primary px-8 py-3 rounded-lg font-semibold inline-flex items-center">
                  Server Lösungen ansehen <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            <!-- Microsoft Office -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span class="inline-block bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Microsoft Office
                </span>
                <h2 class="text-4xl font-bold text-brand-navy mb-4">
                  Produktivität auf höchstem Niveau
                </h2>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Ob im Homeoffice, im Studium oder im Unternehmen: Microsoft Office gehört zu den beliebtesten 
                  Programmpaketen weltweit. Word, Excel, PowerPoint und Outlook erleichtern den Arbeitsalltag und 
                  machen viele Aufgaben schneller und übersichtlicher.
                </p>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Bei Softwareking24 erhalten Sie Office-Lizenzen, die sofort einsatzbereit sind. 
                  Zudem profitieren Sie von einer großen Auswahl an Versionen – für jedes Gerät und jedes Budget.
                </p>
                <a href="/products?category=office" class="btn-primary px-8 py-3 rounded-lg font-semibold inline-flex items-center">
                  Office Versionen ansehen <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
              <div class="bg-white rounded-2xl p-8 shadow-lg">
                <div class="aspect-video bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-xl flex items-center justify-center">
                  <i class="fas fa-file-word text-9xl text-brand-navy/20"></i>
                </div>
              </div>
            </div>

            <!-- CAD Software -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="order-2 md:order-1 bg-white rounded-2xl p-8 shadow-lg">
                <div class="aspect-video bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-xl flex items-center justify-center">
                  <i class="fas fa-drafting-compass text-9xl text-brand-navy/20"></i>
                </div>
              </div>
              <div class="order-1 md:order-2">
                <span class="inline-block bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  CAD Software
                </span>
                <h2 class="text-4xl font-bold text-brand-navy mb-4">
                  Effizientes Arbeiten für Profis
                </h2>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Architekten, Ingenieure und Designer finden bei Softwareking24.de leistungsstarke CAD-Programme, 
                  die präzises und effizientes Arbeiten ermöglichen. Unsere CAD-Software bietet durchdachte Werkzeuge, 
                  die auch komplexe Projekte übersichtlich und kontrollierbar machen.
                </p>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Außerdem profitieren Sie von klar strukturierten Funktionen, hoher Kompatibilität und einer einfachen Bedienung. 
                  So arbeiten Sie produktiv, ohne sich lange einarbeiten zu müssen.
                </p>
                <a href="/products?category=cad" class="btn-primary px-8 py-3 rounded-lg font-semibold inline-flex items-center">
                  CAD Software ansehen <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            <!-- Antivirus -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span class="inline-block bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Antivirus Software
                </span>
                <h2 class="text-4xl font-bold text-brand-navy mb-4">
                  Sicherheit für Ihre Daten
                </h2>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Cyberangriffe, Viren und Malware sind heute eine ständige Gefahr. Mit unserer Antivirus-Software 
                  schützen Sie Ihr System zuverlässig und dauerhaft. Wir bieten Lösungen namhafter Sicherheitsanbieter, 
                  die Ihre Daten vor Bedrohungen abschirmen und gefährliche Inhalte rechtzeitig blockieren.
                </p>
                <p class="text-gray-600 leading-relaxed mb-6">
                  So bleibt Ihr Computer geschützt – egal, ob Sie privat surfen oder beruflich arbeiten.
                </p>
                <a href="/products?category=antivirus" class="btn-primary px-8 py-3 rounded-lg font-semibold inline-flex items-center">
                  Antivirus Lösungen ansehen <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
              <div class="bg-white rounded-2xl p-8 shadow-lg">
                <div class="aspect-video bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-xl flex items-center justify-center">
                  <i class="fas fa-shield-virus text-9xl text-brand-navy/20"></i>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4 max-w-4xl">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-brand-navy mb-4">Häufig gestellte Fragen</h2>
            <p class="text-gray-600 text-lg">Alles, was Sie über unsere Software-Lizenzen wissen müssen</p>
          </div>

          <div class="space-y-4">
            
            <!-- FAQ Item 1 -->
            <div class="faq-item bg-gray-50 rounded-xl p-6">
              <div class="faq-question flex justify-between items-center" onclick="toggleFaq(1)">
                <h3 class="font-bold text-lg text-brand-navy">Wie erhalte ich meine Software nach dem Kauf?</h3>
                <i class="fas fa-chevron-down text-brand-gold transition-transform" id="faq-icon-1"></i>
              </div>
              <div class="faq-answer mt-4" id="faq-answer-1">
                <p class="text-gray-600 leading-relaxed">
                  Nach erfolgreichem Zahlungseingang erhalten Sie Ihren Lizenzschlüssel und die Download-Links 
                  automatisch per E-Mail. In der Regel erfolgt die Zustellung innerhalb weniger Minuten. 
                  Zusätzlich finden Sie eine detaillierte Installationsanleitung im Anhang.
                </p>
              </div>
            </div>

            <!-- FAQ Item 2 -->
            <div class="faq-item bg-gray-50 rounded-xl p-6">
              <div class="faq-question flex justify-between items-center" onclick="toggleFaq(2)">
                <h3 class="font-bold text-lg text-brand-navy">Sind die Lizenzen legal und original?</h3>
                <i class="fas fa-chevron-down text-brand-gold transition-transform" id="faq-icon-2"></i>
              </div>
              <div class="faq-answer mt-4" id="faq-answer-2">
                <p class="text-gray-600 leading-relaxed">
                  Ja, absolut! Wir verkaufen ausschließlich legale, originale Software-Lizenzen von autorisierten 
                  Distributoren. Alle unsere Produkte sind rechtssicher und werden gemäß der geltenden 
                  EU-Richtlinien vertrieben. Sie erhalten stets einen gültigen Aktivierungsschlüssel.
                </p>
              </div>
            </div>

            <!-- FAQ Item 3 -->
            <div class="faq-item bg-gray-50 rounded-xl p-6">
              <div class="faq-question flex justify-between items-center" onclick="toggleFaq(3)">
                <h3 class="font-bold text-lg text-brand-navy">Kann ich die Software auf mehreren Geräten nutzen?</h3>
                <i class="fas fa-chevron-down text-brand-gold transition-transform" id="faq-icon-3"></i>
              </div>
              <div class="faq-answer mt-4" id="faq-answer-3">
                <p class="text-gray-600 leading-relaxed">
                  Das hängt von der jeweiligen Lizenz ab. Einige Lizenzen erlauben die Installation auf mehreren 
                  Geräten (z.B. Office 365 Family), während andere nur für ein Gerät gedacht sind. 
                  Die genauen Nutzungsrechte finden Sie in der Produktbeschreibung oder in den mitgelieferten 
                  Lizenzbedingungen.
                </p>
              </div>
            </div>

            <!-- FAQ Item 4 -->
            <div class="faq-item bg-gray-50 rounded-xl p-6">
              <div class="faq-question flex justify-between items-center" onclick="toggleFaq(4)">
                <h3 class="font-bold text-lg text-brand-navy">Was ist der Unterschied zwischen Retail und OEM-Lizenzen?</h3>
                <i class="fas fa-chevron-down text-brand-gold transition-transform" id="faq-icon-4"></i>
              </div>
              <div class="faq-answer mt-4" id="faq-answer-4">
                <p class="text-gray-600 leading-relaxed">
                  Retail-Lizenzen können frei auf verschiedenen Computern installiert werden und beinhalten 
                  meist vollen Support vom Hersteller. OEM-Lizenzen sind hardwaregebunden und in der Regel 
                  günstiger, bieten aber eingeschränkten oder keinen direkten Herstellersupport. 
                  Beide Varianten sind vollwertig und legal.
                </p>
              </div>
            </div>

            <!-- FAQ Item 5 -->
            <div class="faq-item bg-gray-50 rounded-xl p-6">
              <div class="faq-question flex justify-between items-center" onclick="toggleFaq(5)">
                <h3 class="font-bold text-lg text-brand-navy">Bietet ihr auch Support bei der Installation?</h3>
                <i class="fas fa-chevron-down text-brand-gold transition-transform" id="faq-icon-5"></i>
              </div>
              <div class="faq-answer mt-4" id="faq-answer-5">
                <p class="text-gray-600 leading-relaxed">
                  Ja! Unser Kundenservice hilft Ihnen gerne bei Fragen zur Installation und Aktivierung. 
                  Sie erreichen uns per E-Mail oder über unser Kontaktformular. Zusätzlich erhalten Sie mit 
                  jedem Kauf eine ausführliche Schritt-für-Schritt-Anleitung.
                </p>
              </div>
            </div>

            <!-- FAQ Item 6 -->
            <div class="faq-item bg-gray-50 rounded-xl p-6">
              <div class="faq-question flex justify-between items-center" onclick="toggleFaq(6)">
                <h3 class="font-bold text-lg text-brand-navy">Welche Zahlungsmethoden akzeptiert ihr?</h3>
                <i class="fas fa-chevron-down text-brand-gold transition-transform" id="faq-icon-6"></i>
              </div>
              <div class="faq-answer mt-4" id="faq-answer-6">
                <p class="text-gray-600 leading-relaxed">
                  Wir bieten verschiedene sichere Zahlungsmethoden an: PayPal, Kreditkarte (Visa, Mastercard), 
                  Sofortüberweisung, Banküberweisung und weitere gängige Zahlungsarten. Alle Transaktionen 
                  erfolgen SSL-verschlüsselt für maximale Sicherheit.
                </p>
              </div>
            </div>

            <!-- FAQ Item 7 -->
            <div class="faq-item bg-gray-50 rounded-xl p-6">
              <div class="faq-question flex justify-between items-center" onclick="toggleFaq(7)">
                <h3 class="font-bold text-lg text-brand-navy">Was passiert, wenn der Lizenzschlüssel nicht funktioniert?</h3>
                <i class="fas fa-chevron-down text-brand-gold transition-transform" id="faq-icon-7"></i>
              </div>
              <div class="faq-answer mt-4" id="faq-answer-7">
                <p class="text-gray-600 leading-relaxed">
                  In diesem seltenen Fall kontaktieren Sie bitte umgehend unseren Support. Wir prüfen das Problem 
                  und stellen Ihnen bei Bedarf einen Ersatzschlüssel zur Verfügung. Ihre Zufriedenheit und ein 
                  reibungsloser Ablauf haben für uns höchste Priorität.
                </p>
              </div>
            </div>

            <!-- FAQ Item 8 -->
            <div class="faq-item bg-gray-50 rounded-xl p-6">
              <div class="faq-question flex justify-between items-center" onclick="toggleFaq(8)">
                <h3 class="font-bold text-lg text-brand-navy">Kann ich meine Lizenz zurückgeben oder umtauschen?</h3>
                <i class="fas fa-chevron-down text-brand-gold transition-transform" id="faq-icon-8"></i>
              </div>
              <div class="faq-answer mt-4" id="faq-answer-8">
                <p class="text-gray-600 leading-relaxed">
                  Da es sich um digitale Produkte handelt, ist nach Versand des Lizenzschlüssels ein Widerruf 
                  oder Umtausch in der Regel nicht mehr möglich. Sollten Sie jedoch technische Probleme haben oder 
                  das falsche Produkt erhalten haben, finden wir gemeinsam eine Lösung. Kontaktieren Sie einfach 
                  unseren Support.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-16 bg-gradient-to-br from-brand-navy to-brand-navy/90 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-4xl font-bold mb-4">Bleiben Sie auf dem Laufenden</h2>
          <p class="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Melden Sie sich für unseren Newsletter an und erhalten Sie exklusive Angebote, 
            Rabatte und die neuesten Software-News direkt in Ihr Postfach.
          </p>
          <div class="flex justify-center gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Ihre E-Mail-Adresse" 
              class="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            >
            <button class="bg-brand-gold hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold transition">
              Anmelden
            </button>
          </div>
          <p class="text-white/60 text-sm mt-4">
            <i class="fas fa-lock mr-2"></i>Ihre Daten sind bei uns sicher und werden nicht an Dritte weitergegeben.
          </p>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            <!-- Company Info -->
            <div>
              <img src="/static/logo-footer.png" alt="SoftwareKing24" class="h-10 mb-4">
              <p class="text-sm leading-relaxed mb-4">
                Ihr vertrauenswürdiger Partner für Original-Software-Lizenzen zu fairen Preisen. 
                Schnell, sicher und rechtssicher.
              </p>
              <div class="flex gap-4">
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-gold transition">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-gold transition">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-gold transition">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-gold transition">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="font-bold text-white mb-4 text-lg">Schnelllinks</h4>
              <ul class="space-y-2">
                <li><a href="/" class="hover:text-brand-gold transition">Startseite</a></li>
                <li><a href="/products" class="hover:text-brand-gold transition">Alle Produkte</a></li>
                <li><a href="/about" class="hover:text-brand-gold transition">Über uns</a></li>
                <li><a href="/contact" class="hover:text-brand-gold transition">Kontakt</a></li>
                <li><a href="/faq" class="hover:text-brand-gold transition">FAQ</a></li>
              </ul>
            </div>

            <!-- Categories -->
            <div>
              <h4 class="font-bold text-white mb-4 text-lg">Kategorien</h4>
              <ul class="space-y-2">
                <li><a href="/products?category=windows" class="hover:text-brand-gold transition">Windows</a></li>
                <li><a href="/products?category=office" class="hover:text-brand-gold transition">Microsoft Office</a></li>
                <li><a href="/products?category=server" class="hover:text-brand-gold transition">Server Lösungen</a></li>
                <li><a href="/products?category=antivirus" class="hover:text-brand-gold transition">Antivirus</a></li>
                <li><a href="/products?category=cad" class="hover:text-brand-gold transition">CAD Software</a></li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h4 class="font-bold text-white mb-4 text-lg">Kontakt</h4>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <i class="fas fa-map-marker-alt text-brand-gold mt-1"></i>
                  <span class="text-sm">Musterstraße 123<br>10115 Berlin, Deutschland</span>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fas fa-phone text-brand-gold"></i>
                  <span class="text-sm">+49 (0)30 1234 5678</span>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fas fa-envelope text-brand-gold"></i>
                  <span class="text-sm">support@softwareking24.com</span>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fas fa-clock text-brand-gold"></i>
                  <span class="text-sm">Mo-Fr: 9:00 - 18:00 Uhr</span>
                </li>
              </ul>
            </div>

          </div>

          <!-- Bottom Bar -->
          <div class="border-t border-gray-800 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
              <p class="text-sm text-gray-400">
                © 2024 SoftwareKing24. Alle Rechte vorbehalten.
              </p>
              <div class="flex gap-6 text-sm">
                <a href="/privacy" class="hover:text-brand-gold transition">Datenschutz</a>
                <a href="/terms" class="hover:text-brand-gold transition">AGB</a>
                <a href="/impressum" class="hover:text-brand-gold transition">Impressum</a>
                <a href="/widerruf" class="hover:text-brand-gold transition">Widerrufsrecht</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <!-- JavaScript for interactive elements -->
      <script>
        // FAQ Toggle
        function toggleFaq(id) {
          const answer = document.getElementById('faq-answer-' + id);
          const icon = document.getElementById('faq-icon-' + id);
          
          if (answer.classList.contains('active')) {
            answer.classList.remove('active');
            icon.style.transform = 'rotate(0deg)';
          } else {
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(item => {
              item.classList.remove('active');
            });
            document.querySelectorAll('[id^="faq-icon-"]').forEach(icon => {
              icon.style.transform = 'rotate(0deg)';
            });
            
            // Open clicked FAQ
            answer.classList.add('active');
            icon.style.transform = 'rotate(180deg)';
          }
        }

        // Countdown Timer
        function updateCountdown() {
          // Set end time (example: 8 hours from now)
          const endTime = new Date().getTime() + (8 * 60 * 60 * 1000);
          
          setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;
            
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update display (if countdown elements exist)
            const countdownBoxes = document.querySelectorAll('.countdown-box .text-3xl');
            if (countdownBoxes.length >= 3) {
              countdownBoxes[0].textContent = String(hours).padStart(2, '0');
              countdownBoxes[1].textContent = String(minutes).padStart(2, '0');
              countdownBoxes[2].textContent = String(seconds).padStart(2, '0');
            }
          }, 1000);
        }
        
        updateCountdown();

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        });
      </script>
    </body>
    </html>
  `;
}
