export function ShopHomepagePremium() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SOFTWAREKING24 - Premium Software Lizenzshop</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                'brand-navy': '#0a1628',
                'brand-navy-light': '#1a2332',
                'brand-gold': '#f5a623',
                'brand-gold-light': '#f7be5f',
              }
            }
          }
        }
      </script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #0a1628 0%, #1a2332 100%);
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
          0%, 100% { box-shadow: 0 0 20px rgba(245, 166, 35, 0.5); }
          50% { box-shadow: 0 0 40px rgba(245, 166, 35, 0.8); }
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
          background: linear-gradient(135deg, #0a1628 0%, #1a2332 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(10, 22, 40, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(245, 166, 35, 0.6);
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
          color: #0a1628;
          border: 2px solid #f5a623;
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
          background: linear-gradient(135deg, #0a1628 0%, #1a2332 100%);
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

        /* Mega Menu Styles - CRITICAL FIX */
        nav {
          position: relative !important;
        }
        
        .mega-menu {
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          right: 0 !important;
          background: white !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1) !important;
          opacity: 0 !important;
          visibility: hidden !important;
          transform: translateY(-10px) !important;
          transition: all 0.3s ease !important;
          z-index: 1000 !important;
          display: none !important; /* Force hidden by default */
          pointer-events: none !important;
          max-height: 600px !important;
          overflow-y: auto !important;
        }

        .menu-item:hover .mega-menu {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translateY(0) !important;
          display: block !important; /* Show on hover */
          pointer-events: auto !important;
        }

        /* Ensure menu item is positioned relatively */
        .menu-item {
          position: relative !important;
          display: inline-block !important;
        }

        /* Additional fix for Tailwind conflicts */
        .hidden {
          display: none !important;
        }

        .mega-menu-column {
          padding: 2rem;
        }

        .mega-menu-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0a1628;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f5a623;
        }

        .mega-menu-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          color: #4b5563;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
          margin-bottom: 0.25rem;
        }

        .mega-menu-item:hover {
          background: #f3f4f6;
          color: #0a1628;
          padding-left: 1.5rem;
        }

        .mega-menu-item i {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a1628 0%, #1a2332 100%);
          border-radius: 8px;
          color: white;
          margin-right: 0.75rem;
          font-size: 0.875rem;
        }

        .mega-menu-featured {
          background: linear-gradient(135deg, #0a1628 0%, #1a2332 100%);
          border-radius: 12px;
          padding: 1.5rem;
          color: white;
        }

        .mega-menu-badge {
          display: inline-block;
          background: #f5a623;
          color: white;
          font-size: 0.625rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
          margin-left: 0.5rem;
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          overflow-y: auto;
          z-index: 999;
        }

        .mobile-menu.active {
          display: block;
        }

        .mobile-menu-item {
          border-bottom: 1px solid #e5e7eb;
        }

        .mobile-submenu {
          display: none;
          background: #f9fafb;
          padding-left: 1rem;
        }

        .mobile-submenu.active {
          display: block;
        }
      </style>
    </head>
    <body>
      
      <!-- Navigation -->
      <nav class="glass-strong fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            
            <!-- Logo -->
            <a href="/" class="flex items-center">
              <img src="/static/logo.png" alt="SOFTWAREKING24 - Premium Software Lizenzen" class="h-12" />
            </a>

            <!-- Desktop Menu -->
            <div class="hidden lg:flex items-center space-x-1">
              
              <!-- Office Menu -->
              <div class="menu-item relative">
                <button class="px-4 py-2 text-gray-700 hover:text-brand-navy font-medium transition-colors flex items-center">
                  <i class="fab fa-microsoft mr-2"></i>
                  Office
                  <i class="fas fa-chevron-down ml-2 text-xs"></i>
                </button>
                <div class="mega-menu">
                  <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-4 gap-0">
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Microsoft Office</h3>
                        <a href="/products/office-2021" class="mega-menu-item">
                          <i class="fab fa-microsoft"></i>
                          <span>Office 2021 Professional</span>
                        </a>
                        <a href="/products/office-2019" class="mega-menu-item">
                          <i class="fab fa-microsoft"></i>
                          <span>Office 2019 Professional</span>
                        </a>
                        <a href="/products/office-365" class="mega-menu-item">
                          <i class="fas fa-cloud"></i>
                          <span>Microsoft 365<span class="mega-menu-badge">Neu</span></span>
                        </a>
                        <a href="/products/office-mac" class="mega-menu-item">
                          <i class="fab fa-apple"></i>
                          <span>Office für Mac</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Einzelanwendungen</h3>
                        <a href="/products/word" class="mega-menu-item">
                          <i class="fas fa-file-word"></i>
                          <span>Microsoft Word</span>
                        </a>
                        <a href="/products/excel" class="mega-menu-item">
                          <i class="fas fa-file-excel"></i>
                          <span>Microsoft Excel</span>
                        </a>
                        <a href="/products/powerpoint" class="mega-menu-item">
                          <i class="fas fa-file-powerpoint"></i>
                          <span>Microsoft PowerPoint</span>
                        </a>
                        <a href="/products/outlook" class="mega-menu-item">
                          <i class="fas fa-envelope"></i>
                          <span>Microsoft Outlook</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Alternativen</h3>
                        <a href="/products/libreoffice" class="mega-menu-item">
                          <i class="fas fa-file-alt"></i>
                          <span>LibreOffice</span>
                        </a>
                        <a href="/products/openoffice" class="mega-menu-item">
                          <i class="fas fa-file"></i>
                          <span>OpenOffice</span>
                        </a>
                        <a href="/products/google-workspace" class="mega-menu-item">
                          <i class="fab fa-google"></i>
                          <span>Google Workspace</span>
                        </a>
                      </div>
                      <div class="mega-menu-column">
                        <div class="mega-menu-featured">
                          <span class="text-yellow-500 text-xs font-bold uppercase tracking-wide">⚡ Top Angebot</span>
                          <h4 class="text-xl font-bold mt-2 mb-3">Office 2021 Pro</h4>
                          <p class="text-white/80 text-sm mb-4">Vollversion mit Word, Excel, PowerPoint, Outlook & mehr</p>
                          <div class="flex items-center justify-between mb-4">
                            <div>
                              <div class="text-white/60 line-through text-sm">€449,00</div>
                              <div class="text-3xl font-bold text-yellow-500">€149,99</div>
                            </div>
                            <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-67%</span>
                          </div>
                          <a href="/products/office-2021" class="block w-full bg-yellow-500 text-brand-navy text-center py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                            Jetzt kaufen
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Antivirus Menu -->
              <div class="menu-item relative">
                <button class="px-4 py-2 text-gray-700 hover:text-brand-navy font-medium transition-colors flex items-center">
                  <i class="fas fa-shield-virus mr-2"></i>
                  Antivirus
                  <i class="fas fa-chevron-down ml-2 text-xs"></i>
                </button>
                <div class="mega-menu">
                  <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-4 gap-0">
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Kaspersky</h3>
                        <a href="/products/kaspersky-total" class="mega-menu-item">
                          <i class="fas fa-shield-check"></i>
                          <span>Kaspersky Total Security</span>
                        </a>
                        <a href="/products/kaspersky-internet" class="mega-menu-item">
                          <i class="fas fa-globe"></i>
                          <span>Kaspersky Internet Security</span>
                        </a>
                        <a href="/products/kaspersky-antivirus" class="mega-menu-item">
                          <i class="fas fa-shield-alt"></i>
                          <span>Kaspersky Anti-Virus</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Norton</h3>
                        <a href="/products/norton-360" class="mega-menu-item">
                          <i class="fas fa-shield"></i>
                          <span>Norton 360 Deluxe</span>
                        </a>
                        <a href="/products/norton-security" class="mega-menu-item">
                          <i class="fas fa-lock"></i>
                          <span>Norton Security Premium</span>
                        </a>
                        <a href="/products/norton-antivirus" class="mega-menu-item">
                          <i class="fas fa-bug"></i>
                          <span>Norton AntiVirus Plus</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Weitere Hersteller</h3>
                        <a href="/products/bitdefender" class="mega-menu-item">
                          <i class="fas fa-user-shield"></i>
                          <span>Bitdefender Total Security</span>
                        </a>
                        <a href="/products/avast" class="mega-menu-item">
                          <i class="fas fa-shield-virus"></i>
                          <span>Avast Premium Security</span>
                        </a>
                        <a href="/products/mcafee" class="mega-menu-item">
                          <i class="fas fa-fire"></i>
                          <span>McAfee Total Protection</span>
                        </a>
                        <a href="/products/eset" class="mega-menu-item">
                          <i class="fas fa-robot"></i>
                          <span>ESET Smart Security</span>
                        </a>
                      </div>
                      <div class="mega-menu-column">
                        <div class="mega-menu-featured">
                          <span class="text-yellow-500 text-xs font-bold uppercase tracking-wide">🔥 Bestseller</span>
                          <h4 class="text-xl font-bold mt-2 mb-3">Kaspersky Total Security</h4>
                          <p class="text-white/80 text-sm mb-4">Premium Schutz für 5 Geräte • 1 Jahr</p>
                          <div class="flex items-center justify-between mb-4">
                            <div>
                              <div class="text-white/60 line-through text-sm">€89,00</div>
                              <div class="text-3xl font-bold text-yellow-500">€39,99</div>
                            </div>
                            <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-55%</span>
                          </div>
                          <a href="/products/kaspersky-total" class="block w-full bg-yellow-500 text-brand-navy text-center py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                            Jetzt kaufen
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Games Menu -->
              <div class="menu-item relative">
                <button class="px-4 py-2 text-gray-700 hover:text-brand-navy font-medium transition-colors flex items-center">
                  <i class="fas fa-gamepad mr-2"></i>
                  Games
                  <i class="fas fa-chevron-down ml-2 text-xs"></i>
                </button>
                <div class="mega-menu">
                  <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-4 gap-0">
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">PC Games</h3>
                        <a href="/products/steam-keys" class="mega-menu-item">
                          <i class="fab fa-steam"></i>
                          <span>Steam Keys</span>
                        </a>
                        <a href="/products/origin-keys" class="mega-menu-item">
                          <i class="fas fa-gamepad"></i>
                          <span>Origin Keys</span>
                        </a>
                        <a href="/products/uplay-keys" class="mega-menu-item">
                          <i class="fas fa-trophy"></i>
                          <span>Uplay Keys</span>
                        </a>
                        <a href="/products/gog-keys" class="mega-menu-item">
                          <i class="fas fa-dragon"></i>
                          <span>GOG Keys</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Konsolen</h3>
                        <a href="/products/playstation" class="mega-menu-item">
                          <i class="fab fa-playstation"></i>
                          <span>PlayStation Network</span>
                        </a>
                        <a href="/products/xbox" class="mega-menu-item">
                          <i class="fab fa-xbox"></i>
                          <span>Xbox Live Gold</span>
                        </a>
                        <a href="/products/nintendo" class="mega-menu-item">
                          <i class="fas fa-gamepad"></i>
                          <span>Nintendo eShop</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Top Games</h3>
                        <a href="/products/gta-v" class="mega-menu-item">
                          <i class="fas fa-car"></i>
                          <span>GTA V<span class="mega-menu-badge">Top</span></span>
                        </a>
                        <a href="/products/minecraft" class="mega-menu-item">
                          <i class="fas fa-cube"></i>
                          <span>Minecraft</span>
                        </a>
                        <a href="/products/fifa" class="mega-menu-item">
                          <i class="fas fa-futbol"></i>
                          <span>EA Sports FC 24</span>
                        </a>
                        <a href="/products/cod" class="mega-menu-item">
                          <i class="fas fa-crosshairs"></i>
                          <span>Call of Duty</span>
                        </a>
                      </div>
                      <div class="mega-menu-column">
                        <div class="mega-menu-featured">
                          <span class="text-yellow-500 text-xs font-bold uppercase tracking-wide">🎮 Gaming Deal</span>
                          <h4 class="text-xl font-bold mt-2 mb-3">Steam Gift Card</h4>
                          <p class="text-white/80 text-sm mb-4">€50 Guthaben für Tausende Games</p>
                          <div class="flex items-center justify-between mb-4">
                            <div>
                              <div class="text-white/60 line-through text-sm">€50,00</div>
                              <div class="text-3xl font-bold text-yellow-500">€44,99</div>
                            </div>
                            <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-10%</span>
                          </div>
                          <a href="/products/steam-50" class="block w-full bg-yellow-500 text-brand-navy text-center py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                            Jetzt kaufen
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Development Menu -->
              <div class="menu-item relative">
                <button class="px-4 py-2 text-gray-700 hover:text-brand-navy font-medium transition-colors flex items-center">
                  <i class="fas fa-code mr-2"></i>
                  Development
                  <i class="fas fa-chevron-down ml-2 text-xs"></i>
                </button>
                <div class="mega-menu">
                  <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-4 gap-0">
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">IDEs & Editoren</h3>
                        <a href="/products/visual-studio" class="mega-menu-item">
                          <i class="fas fa-code"></i>
                          <span>Visual Studio Professional</span>
                        </a>
                        <a href="/products/intellij" class="mega-menu-item">
                          <i class="fas fa-brain"></i>
                          <span>IntelliJ IDEA</span>
                        </a>
                        <a href="/products/pycharm" class="mega-menu-item">
                          <i class="fab fa-python"></i>
                          <span>PyCharm Professional</span>
                        </a>
                        <a href="/products/webstorm" class="mega-menu-item">
                          <i class="fab fa-js"></i>
                          <span>WebStorm</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Design & Prototyping</h3>
                        <a href="/products/adobe-xd" class="mega-menu-item">
                          <i class="fab fa-adobe"></i>
                          <span>Adobe XD</span>
                        </a>
                        <a href="/products/sketch" class="mega-menu-item">
                          <i class="fas fa-pen-nib"></i>
                          <span>Sketch</span>
                        </a>
                        <a href="/products/figma" class="mega-menu-item">
                          <i class="fas fa-layer-group"></i>
                          <span>Figma Professional</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Tools & Frameworks</h3>
                        <a href="/products/github" class="mega-menu-item">
                          <i class="fab fa-github"></i>
                          <span>GitHub Pro</span>
                        </a>
                        <a href="/products/docker" class="mega-menu-item">
                          <i class="fab fa-docker"></i>
                          <span>Docker Desktop</span>
                        </a>
                        <a href="/products/postman" class="mega-menu-item">
                          <i class="fas fa-paper-plane"></i>
                          <span>Postman Team</span>
                        </a>
                      </div>
                      <div class="mega-menu-column">
                        <div class="mega-menu-featured">
                          <span class="text-yellow-500 text-xs font-bold uppercase tracking-wide">💻 Developer</span>
                          <h4 class="text-xl font-bold mt-2 mb-3">Visual Studio Pro</h4>
                          <p class="text-white/80 text-sm mb-4">Professional IDE für Windows & Mac</p>
                          <div class="flex items-center justify-between mb-4">
                            <div>
                              <div class="text-white/60 line-through text-sm">€499,00</div>
                              <div class="text-3xl font-bold text-yellow-500">€199,99</div>
                            </div>
                            <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-60%</span>
                          </div>
                          <a href="/products/visual-studio" class="block w-full bg-yellow-500 text-brand-navy text-center py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                            Jetzt kaufen
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Server Menu -->
              <div class="menu-item relative">
                <button class="px-4 py-2 text-gray-700 hover:text-brand-navy font-medium transition-colors flex items-center">
                  <i class="fas fa-server mr-2"></i>
                  Server
                  <i class="fas fa-chevron-down ml-2 text-xs"></i>
                </button>
                <div class="mega-menu">
                  <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-4 gap-0">
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Windows Server</h3>
                        <a href="/products/windows-server-2022" class="mega-menu-item">
                          <i class="fab fa-windows"></i>
                          <span>Windows Server 2022</span>
                        </a>
                        <a href="/products/windows-server-2019" class="mega-menu-item">
                          <i class="fab fa-windows"></i>
                          <span>Windows Server 2019</span>
                        </a>
                        <a href="/products/windows-server-cal" class="mega-menu-item">
                          <i class="fas fa-users"></i>
                          <span>Server CALs</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Datenbank</h3>
                        <a href="/products/sql-server" class="mega-menu-item">
                          <i class="fas fa-database"></i>
                          <span>SQL Server 2022</span>
                        </a>
                        <a href="/products/oracle" class="mega-menu-item">
                          <i class="fas fa-table"></i>
                          <span>Oracle Database</span>
                        </a>
                        <a href="/products/mysql" class="mega-menu-item">
                          <i class="fas fa-server"></i>
                          <span>MySQL Enterprise</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Virtualisierung</h3>
                        <a href="/products/vmware" class="mega-menu-item">
                          <i class="fas fa-layer-group"></i>
                          <span>VMware vSphere</span>
                        </a>
                        <a href="/products/hyper-v" class="mega-menu-item">
                          <i class="fas fa-cube"></i>
                          <span>Hyper-V Server</span>
                        </a>
                      </div>
                      <div class="mega-menu-column">
                        <div class="mega-menu-featured">
                          <span class="text-yellow-500 text-xs font-bold uppercase tracking-wide">🖥️ Enterprise</span>
                          <h4 class="text-xl font-bold mt-2 mb-3">Windows Server 2022</h4>
                          <p class="text-white/80 text-sm mb-4">Standard Edition + 50 CALs</p>
                          <div class="flex items-center justify-between mb-4">
                            <div>
                              <div class="text-white/60 line-through text-sm">€999,00</div>
                              <div class="text-3xl font-bold text-yellow-500">€499,99</div>
                            </div>
                            <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-50%</span>
                          </div>
                          <a href="/products/windows-server-2022" class="block w-full bg-yellow-500 text-brand-navy text-center py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                            Jetzt kaufen
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- PC Menu -->
              <div class="menu-item relative">
                <button class="px-4 py-2 text-gray-700 hover:text-brand-navy font-medium transition-colors flex items-center">
                  <i class="fas fa-desktop mr-2"></i>
                  PC & Windows
                  <i class="fas fa-chevron-down ml-2 text-xs"></i>
                </button>
                <div class="mega-menu">
                  <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-4 gap-0">
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Windows</h3>
                        <a href="/products/windows-11-pro" class="mega-menu-item">
                          <i class="fab fa-windows"></i>
                          <span>Windows 11 Pro<span class="mega-menu-badge">Neu</span></span>
                        </a>
                        <a href="/products/windows-11-home" class="mega-menu-item">
                          <i class="fab fa-windows"></i>
                          <span>Windows 11 Home</span>
                        </a>
                        <a href="/products/windows-10-pro" class="mega-menu-item">
                          <i class="fab fa-windows"></i>
                          <span>Windows 10 Pro</span>
                        </a>
                        <a href="/products/windows-10-home" class="mega-menu-item">
                          <i class="fab fa-windows"></i>
                          <span>Windows 10 Home</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">System Tools</h3>
                        <a href="/products/ccleaner" class="mega-menu-item">
                          <i class="fas fa-broom"></i>
                          <span>CCleaner Professional</span>
                        </a>
                        <a href="/products/acronis" class="mega-menu-item">
                          <i class="fas fa-hdd"></i>
                          <span>Acronis True Image</span>
                        </a>
                        <a href="/products/partition-magic" class="mega-menu-item">
                          <i class="fas fa-sliders-h"></i>
                          <span>Partition Manager</span>
                        </a>
                      </div>
                      <div class="mega-menu-column border-r">
                        <h3 class="mega-menu-title">Utilities</h3>
                        <a href="/products/winrar" class="mega-menu-item">
                          <i class="fas fa-file-archive"></i>
                          <span>WinRAR</span>
                        </a>
                        <a href="/products/winzip" class="mega-menu-item">
                          <i class="fas fa-file-zipper"></i>
                          <span>WinZip</span>
                        </a>
                        <a href="/products/pdf-creator" class="mega-menu-item">
                          <i class="fas fa-file-pdf"></i>
                          <span>PDF Creator Pro</span>
                        </a>
                      </div>
                      <div class="mega-menu-column">
                        <div class="mega-menu-featured">
                          <span class="text-yellow-500 text-xs font-bold uppercase tracking-wide">⭐ Bestseller</span>
                          <h4 class="text-xl font-bold mt-2 mb-3">Windows 11 Pro</h4>
                          <p class="text-white/80 text-sm mb-4">Vollversion • Lebenslang gültig</p>
                          <div class="flex items-center justify-between mb-4">
                            <div>
                              <div class="text-white/60 line-through text-sm">€259,00</div>
                              <div class="text-3xl font-bold text-yellow-500">€89,99</div>
                            </div>
                            <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-65%</span>
                          </div>
                          <a href="/products/windows-11-pro" class="block w-full bg-yellow-500 text-brand-navy text-center py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                            Jetzt kaufen
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <!-- Right Side Icons -->
            <div class="flex items-center space-x-4">
              
              <!-- Search Icon (Mobile) -->
              <button class="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-all">
                <i class="fas fa-search text-gray-700 text-xl"></i>
              </button>

              <!-- Cart -->
              <button class="relative p-2 hover:bg-gray-100 rounded-full transition-all">
                <i class="fas fa-shopping-cart text-gray-700 text-xl"></i>
                <span class="absolute -top-1 -right-1 bg-brand-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </button>

              <!-- User -->
              <button class="hidden lg:flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-all">
                <div class="w-10 h-10 bg-gradient-to-br from-brand-navy to-brand-gold rounded-full flex items-center justify-center">
                  <i class="fas fa-user text-white"></i>
                </div>
              </button>

              <!-- Mobile Menu Toggle -->
              <button id="mobileMenuToggle" class="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-all">
                <i class="fas fa-bars text-gray-700 text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div id="mobileMenu" class="mobile-menu">
        <div class="p-4">
          <!-- Mobile Search -->
          <div class="mb-4">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Suche nach Software..." 
                class="w-full px-4 py-3 pl-10 rounded-lg border-2 border-gray-200 focus:border-brand-navy focus:outline-none"
              />
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <!-- Mobile Menu Items -->
          <div class="space-y-2">
            <div class="mobile-menu-item">
              <button class="mobile-menu-toggle w-full flex items-center justify-between p-4 text-left text-gray-900 font-medium">
                <span><i class="fab fa-microsoft mr-3"></i>Office</span>
                <i class="fas fa-chevron-down"></i>
              </button>
              <div class="mobile-submenu">
                <a href="/products/office-2021" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Office 2021 Professional</a>
                <a href="/products/office-365" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Microsoft 365</a>
                <a href="/products/word" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Microsoft Word</a>
              </div>
            </div>

            <div class="mobile-menu-item">
              <button class="mobile-menu-toggle w-full flex items-center justify-between p-4 text-left text-gray-900 font-medium">
                <span><i class="fas fa-shield-virus mr-3"></i>Antivirus</span>
                <i class="fas fa-chevron-down"></i>
              </button>
              <div class="mobile-submenu">
                <a href="/products/kaspersky-total" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Kaspersky Total Security</a>
                <a href="/products/norton-360" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Norton 360</a>
                <a href="/products/bitdefender" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Bitdefender</a>
              </div>
            </div>

            <div class="mobile-menu-item">
              <button class="mobile-menu-toggle w-full flex items-center justify-between p-4 text-left text-gray-900 font-medium">
                <span><i class="fas fa-gamepad mr-3"></i>Games</span>
                <i class="fas fa-chevron-down"></i>
              </button>
              <div class="mobile-submenu">
                <a href="/products/steam-keys" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Steam Keys</a>
                <a href="/products/playstation" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">PlayStation Network</a>
                <a href="/products/xbox" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Xbox Live</a>
              </div>
            </div>

            <div class="mobile-menu-item">
              <button class="mobile-menu-toggle w-full flex items-center justify-between p-4 text-left text-gray-900 font-medium">
                <span><i class="fas fa-code mr-3"></i>Development</span>
                <i class="fas fa-chevron-down"></i>
              </button>
              <div class="mobile-submenu">
                <a href="/products/visual-studio" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Visual Studio</a>
                <a href="/products/intellij" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">IntelliJ IDEA</a>
                <a href="/products/github" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">GitHub Pro</a>
              </div>
            </div>

            <div class="mobile-menu-item">
              <button class="mobile-menu-toggle w-full flex items-center justify-between p-4 text-left text-gray-900 font-medium">
                <span><i class="fas fa-server mr-3"></i>Server</span>
                <i class="fas fa-chevron-down"></i>
              </button>
              <div class="mobile-submenu">
                <a href="/products/windows-server-2022" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Windows Server 2022</a>
                <a href="/products/sql-server" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">SQL Server</a>
                <a href="/products/vmware" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">VMware</a>
              </div>
            </div>

            <div class="mobile-menu-item">
              <button class="mobile-menu-toggle w-full flex items-center justify-between p-4 text-left text-gray-900 font-medium">
                <span><i class="fas fa-desktop mr-3"></i>PC & Windows</span>
                <i class="fas fa-chevron-down"></i>
              </button>
              <div class="mobile-submenu">
                <a href="/products/windows-11-pro" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Windows 11 Pro</a>
                <a href="/products/windows-10-pro" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">Windows 10 Pro</a>
                <a href="/products/ccleaner" class="block p-3 pl-12 text-gray-700 hover:bg-gray-100">CCleaner Pro</a>
              </div>
            </div>
          </div>

          <!-- Mobile User Actions -->
          <div class="mt-6 space-y-3">
            <a href="/login" class="block w-full bg-brand-navy text-white text-center py-3 rounded-lg font-bold">
              Anmelden
            </a>
            <a href="/register" class="block w-full border-2 border-brand-navy text-brand-navy text-center py-3 rounded-lg font-bold">
              Registrieren
            </a>
          </div>
        </div>
      </div>

      <script>
        // CRITICAL FIX: Force hide mega menus on page load
        document.addEventListener('DOMContentLoaded', function() {
          const megaMenus = document.querySelectorAll('.mega-menu');
          megaMenus.forEach(menu => {
            menu.style.display = 'none';
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
          });
        });

        // Mobile menu toggle
        document.getElementById('mobileMenuToggle')?.addEventListener('click', function() {
          const menu = document.getElementById('mobileMenu');
          menu?.classList.toggle('active');
        });

        // Mobile submenu toggles
        document.querySelectorAll('.mobile-menu-toggle').forEach(toggle => {
          toggle.addEventListener('click', function() {
            const submenu = this.nextElementSibling;
            const icon = this.querySelector('.fa-chevron-down');
            submenu?.classList.toggle('active');
            icon?.classList.toggle('rotate-180');
          });
        });
      </script>

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
                      <button class="bg-gradient-to-r from-blue-900 to-yellow-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
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
                      <i class="fas fa-infinity text-#1a2332 text-2xl mb-2"></i>
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
                    <div class="text-2xl font-bold text-blue-900">€89,99</div>
                  </div>
                  <button class="bg-gradient-to-r from-blue-900 to-yellow-500 text-white p-3 rounded-xl hover:shadow-lg transition-all">
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
                    <div class="text-2xl font-bold text-blue-900">€149,99</div>
                  </div>
                  <button class="bg-gradient-to-r from-blue-900 to-yellow-500 text-white p-3 rounded-xl hover:shadow-lg transition-all">
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
                    <div class="text-2xl font-bold text-blue-900">€39,99</div>
                  </div>
                  <button class="bg-gradient-to-r from-blue-900 to-yellow-500 text-white p-3 rounded-xl hover:shadow-lg transition-all">
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
                <div class="product-image w-full h-48 bg-gradient-to-br from-#1a2332 to-yellow-500 rounded-xl flex items-center justify-center">
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
                    <div class="text-2xl font-bold text-blue-900">€239,99</div>
                  </div>
                  <button class="bg-gradient-to-r from-blue-900 to-yellow-500 text-white p-3 rounded-xl hover:shadow-lg transition-all">
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
              <div class="w-16 h-16 bg-gradient-to-br from-#1a2332 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
              <div class="inline-block bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-2 rounded-full font-bold mb-4 animate-pulse">
                <i class="fas fa-fire mr-2"></i>
                FLASH SALE - NUR HEUTE!
              </div>
              <h2 class="text-4xl font-bold text-gray-900 mb-4">Heiße Deals</h2>
              <p class="text-gray-600 text-lg">Unschlagbare Angebote - Nur solange der Vorrat reicht!</p>
              
              <!-- Countdown Timer -->
              <div class="flex justify-center gap-4 mt-8">
                <div class="bg-white rounded-xl p-4 shadow-lg min-w-[80px]">
                  <div class="text-3xl font-bold text-blue-900">08</div>
                  <div class="text-sm text-gray-600">Stunden</div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-lg min-w-[80px]">
                  <div class="text-3xl font-bold text-blue-900">45</div>
                  <div class="text-sm text-gray-600">Minuten</div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-lg min-w-[80px]">
                  <div class="text-3xl font-bold text-blue-900">23</div>
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
                  <button class="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
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
                  <button class="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
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
                  <div class="w-24 h-24 bg-gradient-to-br from-#1a2332 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
                  <button class="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
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
                <div class="w-16 h-16 bg-gradient-to-br from-#1a2332 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
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
                <div class="w-16 h-16 bg-gradient-to-br from-#f5a623 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
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
              <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div class="w-24 h-24 bg-gradient-to-br from-#1a2332 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
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
                <i class="fas fa-chevron-down text-blue-900"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Ja! Alle unsere Lizenzen sind 100% original und legal. Wir sind autorisierter Händler und alle Keys sind direkt vom Hersteller.
              </div>
            </div>

            <!-- FAQ 2 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Wie schnell erhalte ich meinen Key?</h3>
                <i class="fas fa-chevron-down text-blue-900"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Sofort! Nach erfolgreicher Zahlung erhältst du deinen Lizenzschlüssel innerhalb von 5-10 Minuten per E-Mail.
              </div>
            </div>

            <!-- FAQ 3 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Welche Zahlungsmethoden akzeptiert ihr?</h3>
                <i class="fas fa-chevron-down text-blue-900"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Wir akzeptieren PayPal, Kreditkarte (Visa, Mastercard), SOFORT Überweisung, Klarna und viele mehr.
              </div>
            </div>

            <!-- FAQ 4 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Kann ich eine Rechnung erhalten?</h3>
                <i class="fas fa-chevron-down text-blue-900"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Selbstverständlich! Du erhältst automatisch eine ordnungsgemäße Rechnung per E-Mail, die du für deine Unterlagen nutzen kannst.
              </div>
            </div>

            <!-- FAQ 5 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Was ist, wenn der Key nicht funktioniert?</h3>
                <i class="fas fa-chevron-down text-blue-900"></i>
              </button>
              <div class="mt-4 text-gray-600">
                Das kommt sehr selten vor, aber falls doch: Unser Support hilft dir sofort weiter und ersetzt den Key kostenlos.
              </div>
            </div>

            <!-- FAQ 6 -->
            <div class="glass-strong rounded-2xl p-6">
              <button class="w-full flex items-center justify-between text-left">
                <h3 class="font-bold text-gray-900 text-lg">Bietet ihr auch Mengenrabatte an?</h3>
                <i class="fas fa-chevron-down text-blue-900"></i>
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
                <div class="w-20 h-20 bg-gradient-to-br from-#1a2332 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-users text-white text-3xl"></i>
                </div>
                <div class="text-4xl font-bold text-blue-900 mb-2">50,000+</div>
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
                  <i class="fas fa-trophy text-blue-900 text-3xl mb-3"></i>
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
            <div class="w-20 h-20 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-envelope text-white text-3xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Exklusive Angebote erhalten</h2>
            <p class="text-gray-600 text-lg mb-8">Melde dich für unseren Newsletter an und erhalte 10% Rabatt auf deine erste Bestellung</p>
            
            <div class="max-w-md mx-auto flex gap-3">
              <input 
                type="email" 
                placeholder="Deine E-Mail Adresse" 
                class="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none"
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
              <img src="/static/logo-footer.png" alt="SOFTWAREKING24" class="h-10 mb-4">
              <p class="text-gray-600 mb-4">Premium Software Lizenzen zum Bestpreis. Original. Sicher. Schnell.</p>
              <div class="flex space-x-3">
                <a href="#" class="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center hover:bg-brand-gold transition-all">
                  <i class="fab fa-facebook-f text-white"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center hover:bg-brand-gold transition-all">
                  <i class="fab fa-twitter text-white"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center hover:bg-brand-gold transition-all">
                  <i class="fab fa-instagram text-white"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 class="font-bold text-gray-900 mb-4">Produkte</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">Windows</a></li>
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">Office</a></li>
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">Antivirus</a></li>
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">Design Software</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-gray-900 mb-4">Unternehmen</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">Über uns</a></li>
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">Kontakt</a></li>
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">Blog</a></li>
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">Karriere</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-gray-900 mb-4">Support</h4>
              <ul class="space-y-2">
                <li><a href="/admin/faq" class="text-gray-600 hover:text-blue-900 transition-colors">FAQ</a></li>
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">Versand</a></li>
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">Rückgabe</a></li>
                <li><a href="#" class="text-gray-600 hover:text-blue-900 transition-colors">AGB</a></li>
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
