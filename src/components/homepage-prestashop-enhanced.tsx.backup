export const HomepagePrestaShopEnhanced = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Günstige Software Lizenzen kaufen – Original & Sofort verfügbar | SOFTWAREKING24</title>
        <meta name="description" content="Bei SOFTWAREKING24.de finden Sie hochwertige digitale Softwarelösungen für Arbeit, Sicherheit und Produktivität – sofort verfügbar und rechtssicher. Windows 11, Microsoft Office 2024, Antivirus-Programme, Server, CAD-Software zu Top-Preisen."/>
        <meta name="keywords" content="Windows 11, Office 2024, Antivirus, Server Lizenzen, CAD Software, ESD Lizenzen, Software kaufen, Microsoft Lizenzen"/>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
        <link href="/static/search-autocomplete.css" rel="stylesheet" />
        <link href="/static/auth_colors.css" rel="stylesheet" />
        <link href="/static/quick-wins-bundle.css" rel="stylesheet" />
        <link href="/api/custom-css?page=homepage" rel="stylesheet" />
        <script src="/static/search-autocomplete.js" defer></script>
        <script src="/static/quick-wins-bundle.js" defer></script>
        <script src="/static/homepage-products-loader.js" defer></script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
            
            :root {
                --navy-ultra-dark: #0a1628;
                --navy-dark: #1a2a4e;
                --navy-medium: #2d3e6f;
                --navy-light: #435991;
                --gold: #d4af37;
                --gold-light: #e8c966;
                --gold-dark: #b8941f;
                --white: #ffffff;
                --gray-light: #f8f9fa;
                --gray-medium: #e9ecef;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                background: var(--navy-ultra-dark);
                color: var(--white);
                line-height: 1.6;
                overflow-x: hidden;
            }
            
            /* Typography Hierarchy */
            h1 {
                font-size: clamp(2.5rem, 5vw, 4rem);
                font-weight: 800;
                line-height: 1.1;
                letter-spacing: -0.02em;
            }
            
            h2 {
                font-size: clamp(2rem, 4vw, 3rem);
                font-weight: 700;
                line-height: 1.2;
                letter-spacing: -0.01em;
            }
            
            h3 {
                font-size: clamp(1.5rem, 3vw, 2rem);
                font-weight: 600;
                line-height: 1.3;
            }
            
            p {
                font-size: clamp(1rem, 2vw, 1.125rem);
                line-height: 1.7;
                font-weight: 400;
            }
            
            /* Premium Color Utilities */
            .bg-navy-ultra-dark { background-color: var(--navy-ultra-dark); }
            .bg-navy-dark { background-color: var(--navy-dark); }
            .bg-navy-medium { background-color: var(--navy-medium); }
            .bg-navy-light { background-color: var(--navy-light); }
            .text-gold { color: var(--gold); }
            .text-gold-light { color: var(--gold-light); }
            .bg-gold { background-color: var(--gold); }
            .bg-gold-light { background-color: var(--gold-light); }
            .border-gold { border-color: var(--gold); }
            
            /* Gradient Backgrounds */
            .gradient-luxury {
                background: linear-gradient(135deg, var(--navy-ultra-dark) 0%, var(--navy-dark) 50%, var(--navy-medium) 100%);
            }
            
            .gradient-gold {
                background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%);
            }
            
            .gradient-overlay {
                background: linear-gradient(to right, rgba(10, 22, 40, 0.95), rgba(26, 42, 78, 0.85));
            }
            
            /* Premium Animations */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(40px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-40px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes shimmer {
                0% {
                    background-position: -1000px 0;
                }
                100% {
                    background-position: 1000px 0;
                }
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-20px);
                }
            }
            
            @keyframes pulse-glow {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
                }
                50% {
                    box-shadow: 0 0 40px rgba(212, 175, 55, 0.6);
                }
            }
            
            .animate-fadeInUp {
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            .animate-fadeInDown {
                animation: fadeInDown 0.8s ease-out forwards;
            }
            
            .animate-scaleIn {
                animation: scaleIn 0.6s ease-out forwards;
            }
            
            .animate-float {
                animation: float 6s ease-in-out infinite;
            }
            
            .animate-pulse-glow {
                animation: pulse-glow 3s ease-in-out infinite;
            }
            
            /* Scroll Animations */
            .scroll-reveal {
                opacity: 0;
                transform: translateY(40px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .scroll-reveal.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Premium Button Styles */
            .btn-primary {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 1.25rem 3rem;
                background: linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light));
                color: var(--navy-dark);
                font-weight: 700;
                font-size: 1.125rem;
                border: none;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
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
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                transition: left 0.6s ease;
            }
            
            .btn-primary:hover::before {
                left: 100%;
            }
            
            .btn-primary:hover {
                transform: translateY(-4px);
                box-shadow: 0 20px 50px rgba(212, 175, 55, 0.5);
            }
            
            .btn-secondary {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 1.25rem 3rem;
                background: transparent;
                color: var(--gold);
                font-weight: 600;
                font-size: 1.125rem;
                border: 2px solid var(--gold);
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .btn-secondary:hover {
                background: var(--gold);
                color: var(--navy-dark);
                transform: translateY(-4px);
                box-shadow: 0 20px 50px rgba(212, 175, 55, 0.4);
            }
            
            /* Premium Card Styles */
            .premium-card {
                background: rgba(26, 42, 78, 0.6);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 24px;
                padding: 2.5rem;
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }
            
            .premium-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light));
                opacity: 0;
                transition: opacity 0.4s ease;
            }
            
            .premium-card:hover::before {
                opacity: 1;
            }
            
            .premium-card:hover {
                transform: translateY(-12px);
                border-color: var(--gold);
                box-shadow: 0 30px 60px rgba(212, 175, 55, 0.3);
            }
            
            /* Category Card Styles */
            .category-card {
                position: relative;
                border-radius: 24px;
                overflow: hidden;
                height: 400px;
                cursor: pointer;
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .category-card-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .category-card:hover .category-card-image {
                transform: scale(1.1);
            }
            
            .category-card-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(to top, rgba(10, 22, 40, 0.95), transparent);
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding: 2.5rem;
                transition: all 0.5s ease;
            }
            
            .category-card:hover .category-card-overlay {
                background: linear-gradient(to top, rgba(212, 175, 55, 0.95), transparent);
            }
            
            .category-card:hover {
                transform: translateY(-12px);
                box-shadow: 0 30px 60px rgba(212, 175, 55, 0.4);
            }
            
            /* Trust Badge */
            .trust-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem 1.5rem;
                background: rgba(212, 175, 55, 0.1);
                border: 1px solid var(--gold);
                border-radius: 50px;
                font-weight: 600;
                font-size: 0.875rem;
                color: var(--gold);
                backdrop-filter: blur(10px);
            }
            
            /* Mega Menu Styles */
            .mega-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                min-width: 900px;
                background: var(--navy-dark);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 0 0 16px 16px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                z-index: 1000;
                padding: 2rem;
            }
            
            .mega-menu-trigger:hover .mega-menu {
                display: block;
                animation: fadeInDown 0.4s ease-out;
            }
            
            .mega-menu h3 {
                color: var(--gold);
                font-size: 1rem;
                font-weight: 700;
                margin-bottom: 1rem;
                padding-bottom: 0.75rem;
                border-bottom: 2px solid var(--gold);
            }
            
            .mega-menu ul li a {
                display: block;
                padding: 0.75rem 0;
                color: var(--white);
                font-size: 0.9375rem;
                transition: all 0.3s ease;
                border-left: 3px solid transparent;
                padding-left: 0.75rem;
            }
            
            .mega-menu ul li a:hover {
                color: var(--gold);
                border-left-color: var(--gold);
                padding-left: 1.25rem;
            }
            
            /* Hero Section */
            .hero-section {
                position: relative;
                min-height: 100vh;
                display: flex;
                align-items: center;
                overflow: hidden;
            }
            
            .hero-background {
                position: absolute;
                inset: 0;
                z-index: 0;
            }
            
            .hero-background img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .hero-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, rgba(10, 22, 40, 0.95), rgba(26, 42, 78, 0.85));
                z-index: 1;
            }
            
            .hero-content {
                position: relative;
                z-index: 2;
            }
            
            /* Section Spacing */
            .section {
                padding: 8rem 0;
            }
            
            .section-sm {
                padding: 5rem 0;
            }
            
            /* Container */
            .container {
                width: 100%;
                max-width: 1400px;
                margin: 0 auto;
                padding: 0 2rem;
            }
            
            /* Grid Layouts */
            .grid-2 {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 3rem;
            }
            
            .grid-3 {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 2.5rem;
            }
            
            .grid-4 {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
            }
            
            /* Responsive */
            @media (max-width: 1200px) {
                .grid-4 {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (max-width: 768px) {
                .section {
                    padding: 4rem 0;
                }
                
                .grid-2,
                .grid-3,
                .grid-4 {
                    grid-template-columns: 1fr;
                }
                
                .mega-menu {
                    min-width: 100vw;
                    left: 0;
                }
            }
            
            /* Divider */
            .divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, var(--gold), transparent);
                margin: 4rem 0;
            }
            
            /* Icon Styles */
            .icon-box {
                width: 80px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(212, 175, 55, 0.1);
                border: 2px solid var(--gold);
                border-radius: 20px;
                font-size: 2rem;
                color: var(--gold);
                margin-bottom: 1.5rem;
                transition: all 0.4s ease;
            }
            
            .premium-card:hover .icon-box {
                background: var(--gold);
                color: var(--navy-dark);
                transform: scale(1.1);
            }
        </style>
    </head>
    <body class="bg-navy-ultra-dark">
        
        <!-- Top Announcement Bar -->
        <div class="bg-gold text-white py-2 text-center font-bold text-sm">
            <i class="fas fa-bolt mr-2"></i>
            FLASH SALE: Bis zu 70% Rabatt auf ausgewählte Produkte!
            <i class="fas fa-bolt ml-2"></i>
        </div>
        
        <!-- Top Info Bar -->
        <div class="bg-navy-dark text-white py-2 text-xs">
            <div class="w-full px-8 flex flex-wrap items-center justify-between">
                <div class="flex items-center space-x-6">
                    <span><i class="fas fa-phone-alt mr-2 text-gold"></i>+49 (0) 123 456789</span>
                    <span><i class="fas fa-envelope mr-2 text-gold"></i>[email protected]</span>
                    <span><i class="fas fa-clock mr-2 text-gold"></i>Mo-Fr: 9-18 Uhr</span>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="trust-badge">
                        <i class="fas fa-download mr-1"></i>Sofort-Download
                    </span>
                    <span class="trust-badge">
                        <i class="fas fa-shield-check mr-1"></i>100% Legal
                    </span>
                    <span class="trust-badge">
                        <i class="fas fa-undo-alt mr-1"></i>14 Tage Rückgabe
                    </span>
                </div>
            </div>
        </div>

        <!-- Main Header -->
        <header class="bg-navy-dark shadow-2xl sticky top-0 z-50 border-b border-gold/20 backdrop-blur-lg">
            <div class="w-full px-8 py-3">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <a href="/" class="flex items-center hover-scale">
                        <img src="/static/logo-footer.png" alt="SOFTWAREKING24 - Das Original Einfach günstig gut" class="h-20" loading="lazy" />
                    </a>

                    <!-- Search Bar with Autocomplete -->
                    <div class="flex-1 max-w-2xl mx-8">
                        <div class="relative search-container">
                            <input 
                                type="text" 
                                id="search-input"
                                placeholder="Suchen Sie nach Windows, Office, Server, Antivirus..." 
                                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold transition-colors"
                                autocomplete="off"
                            />
                            <button 
                                onclick="if(document.getElementById('search-input').value.length >= 2) window.location.href='/produkte?search=' + encodeURIComponent(document.getElementById('search-input').value)"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold hover:bg-gold-light text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                <i class="fas fa-search"></i>
                            </button>
                            <!-- Autocomplete Dropdown -->
                            <div id="search-dropdown" class="autocomplete-dropdown"></div>
                        </div>
                    </div>

                    <!-- Header Actions -->
                    <div class="flex items-center space-x-4">
                        <!-- Login Button (shown when not logged in) -->
                        <button onclick="authManager.showLoginModal()" data-auth-button="login" class="flex items-center text-white hover:text-gold transition-colors">
                            <i class="fas fa-user text-2xl"></i>
                            <div class="ml-2">
                                <div class="text-xs text-gray-400">Anmelden</div>
                                <div class="font-semibold">Mein Konto</div>
                            </div>
                        </button>
                        
                        <!-- User Menu (shown when logged in) -->
                        <div data-user-menu class="relative" style="display: none;">
                            <button onclick="toggleUserMenu()" class="flex items-center text-white hover:text-gold transition-colors">
                                <i class="fas fa-user-circle text-2xl"></i>
                                <div class="ml-2">
                                    <div class="text-xs text-gray-400">Willkommen</div>
                                    <div class="font-semibold" data-user-name>Benutzer</div>
                                </div>
                                <i class="fas fa-chevron-down ml-2 text-sm"></i>
                            </button>
                            
                            <!-- Dropdown Menu -->
                            <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-navy-dark rounded-lg shadow-lg py-2 z-50">
                                <a href="/dashboard" class="block px-4 py-2 text-white hover:bg-navy-medium">
                                    <i class="fas fa-tachometer-alt mr-2"></i> Dashboard
                                </a>
                                <a href="/konto/bestellungen" class="block px-4 py-2 text-white hover:bg-navy-medium">
                                    <i class="fas fa-shopping-bag mr-2"></i> Bestellungen
                                </a>
                                <a href="/konto/lizenzen" class="block px-4 py-2 text-white hover:bg-navy-medium">
                                    <i class="fas fa-key mr-2"></i> Lizenzen
                                </a>
                                <a href="/konto/profil" class="block px-4 py-2 text-white hover:bg-navy-medium">
                                    <i class="fas fa-user-edit mr-2"></i> Profil
                                </a>
                                <hr class="my-2">
                                <button onclick="authManager.logout()" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                                    <i class="fas fa-sign-out-alt mr-2"></i> Abmelden
                                </button>
                            </div>
                        </div>
                        
                        <a href="/warenkorb" class="relative flex items-center bg-navy-dark hover:bg-navy-medium text-white px-4 py-3 rounded-lg transition-all hover-lift">
                            <i class="fas fa-shopping-cart text-xl"></i>
                            <span class="ml-2 font-semibold">Warenkorb</span>
                            <span class="absolute -top-2 -right-2 bg-gold text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" id="cart-badge" data-cart-count="0">0</span>
                        </a>
                        
                        <div class="flex items-center space-x-2">
                            <button class="w-8 h-8 rounded-full overflow-hidden border-2 border-gold">
                                <img src="https://flagcdn.com/w40/de.png" alt="Deutsch" class="w-full h-full object-cover" loading="lazy" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Advanced Mega Menu Navigation -->
            <nav class="bg-navy-dark">
                <div class="w-full px-8">
                    <ul class="flex items-center justify-center space-x-1 text-white font-semibold">
                        <li><a href="/" class="px-4 py-4 hover:bg-navy-medium transition-colors block"><i class="fas fa-home mr-2"></i>Startseite</a></li>
                        
                        <!-- Windows Mega Menu -->
                        <li class="relative mega-menu-trigger">
                            <a href="/produkte?category=Windows" class="px-4 py-4 hover:bg-navy-medium transition-colors block flex items-center">
                                <i class="fab fa-windows mr-2 text-gold"></i>Windows
                                <i class="fas fa-chevron-down ml-2 text-xs"></i>
                            </a>
                            <div class="mega-menu">
                                <div class="w-full px-6 py-6">
                                    <div class="grid grid-cols-4 gap-6">
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fab fa-windows mr-2 text-gold"></i>Windows 11
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows 11 Professional" class="text-gray-300 hover:text-gold transition-colors">Windows 11 Professional</a></li>
                                                <li><a href="/produkte?search=Windows 11 Home" class="text-gray-300 hover:text-gold transition-colors">Windows 11 Home</a></li>
                                                <li><a href="/produkte?search=Windows 11 Enterprise" class="text-gray-300 hover:text-gold transition-colors">Windows 11 Enterprise</a></li>
                                                <li><a href="/produkte?search=Windows 11 Education" class="text-gray-300 hover:text-gold transition-colors">Windows 11 Education</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fab fa-windows mr-2 text-gold"></i>Windows 10
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows 10 Professional" class="text-gray-300 hover:text-gold transition-colors">Windows 10 Professional</a></li>
                                                <li><a href="/produkte?search=Windows 10 Home" class="text-gray-300 hover:text-gold transition-colors">Windows 10 Home</a></li>
                                                <li><a href="/produkte?search=Windows 10 Enterprise" class="text-gray-300 hover:text-gold transition-colors">Windows 10 Enterprise</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-server mr-2 text-gold"></i>Windows Server
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows Server 2025" class="text-gray-300 hover:text-gold transition-colors">Windows Server 2025</a></li>
                                                <li><a href="/produkte?search=Windows Server 2022" class="text-gray-300 hover:text-gold transition-colors">Windows Server 2022</a></li>
                                                <li><a href="/produkte?search=Windows Server 2019" class="text-gray-300 hover:text-gold transition-colors">Windows Server 2019</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-history mr-2 text-gold"></i>Retro Windows
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows 8.1" class="text-gray-300 hover:text-gold transition-colors">Windows 8.1</a></li>
                                                <li><a href="/produkte?search=Windows 7" class="text-gray-300 hover:text-gold transition-colors">Windows 7</a></li>
                                                <li><a href="/produkte?search=Windows Vista" class="text-gray-300 hover:text-gold transition-colors">Windows Vista</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                        <!-- Microsoft Office Mega Menu -->
                        <li class="relative mega-menu-trigger">
                            <a href="/produkte?category=Microsoft Office" class="px-4 py-4 hover:bg-navy-medium transition-colors block flex items-center">
                                <i class="fas fa-file-word mr-2 text-gold"></i>Microsoft Office
                                <i class="fas fa-chevron-down ml-2 text-xs"></i>
                            </a>
                            <div class="mega-menu">
                                <div class="w-full px-6 py-6">
                                    <div class="grid grid-cols-4 gap-6">
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-star mr-2 text-gold"></i>Office 2024
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Office 2024 Professional Plus" class="text-gray-300 hover:text-gold transition-colors">Professional Plus 2024</a></li>
                                                <li><a href="/produkte?search=Office 2024 Home" class="text-gray-300 hover:text-gold transition-colors">Home & Business 2024</a></li>
                                                <li><a href="/produkte?search=Office 2024 Standard" class="text-gray-300 hover:text-gold transition-colors">Standard 2024</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-box mr-2 text-gold"></i>Office 2021
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Office 2021 Professional Plus" class="text-gray-300 hover:text-gold transition-colors">Professional Plus 2021</a></li>
                                                <li><a href="/produkte?search=Office 2021 Home" class="text-gray-300 hover:text-gold transition-colors">Home & Business 2021</a></li>
                                                <li><a href="/produkte?search=Office 2021 Standard" class="text-gray-300 hover:text-gold transition-colors">Standard 2021</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-cloud mr-2 text-gold"></i>Microsoft 365
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Microsoft 365 Business" class="text-gray-300 hover:text-gold transition-colors">Microsoft 365 Business</a></li>
                                                <li><a href="/produkte?search=Microsoft 365 Family" class="text-gray-300 hover:text-gold transition-colors">Microsoft 365 Family</a></li>
                                                <li><a href="/produkte?search=Microsoft 365 Personal" class="text-gray-300 hover:text-gold transition-colors">Microsoft 365 Personal</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-puzzle-piece mr-2 text-gold"></i>Einzelanwendungen
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Word 2024" class="text-gray-300 hover:text-gold transition-colors">Word 2024</a></li>
                                                <li><a href="/produkte?search=Excel 2024" class="text-gray-300 hover:text-gold transition-colors">Excel 2024</a></li>
                                                <li><a href="/produkte?search=PowerPoint 2024" class="text-gray-300 hover:text-gold transition-colors">PowerPoint 2024</a></li>
                                                <li><a href="/produkte?search=Outlook 2024" class="text-gray-300 hover:text-gold transition-colors">Outlook 2024</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                        <!-- Server & CAL Mega Menu -->
                        <li class="relative mega-menu-trigger">
                            <a href="/produkte?category=Server" class="px-4 py-4 hover:bg-navy-medium transition-colors block flex items-center">
                                <i class="fas fa-server mr-2 text-gold"></i>Server & CAL
                                <i class="fas fa-chevron-down ml-2 text-xs"></i>
                            </a>
                            <div class="mega-menu">
                                <div class="w-full px-6 py-6">
                                    <div class="grid grid-cols-3 gap-6">
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-server mr-2 text-gold"></i>Windows Server
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows Server 2025 Standard" class="text-gray-300 hover:text-gold transition-colors">Server 2025 Standard</a></li>
                                                <li><a href="/produkte?search=Windows Server 2025 Datacenter" class="text-gray-300 hover:text-gold transition-colors">Server 2025 Datacenter</a></li>
                                                <li><a href="/produkte?search=Windows Server 2022" class="text-gray-300 hover:text-gold transition-colors">Server 2022</a></li>
                                                <li><a href="/produkte?search=Windows Server 2019" class="text-gray-300 hover:text-gold transition-colors">Server 2019</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-database mr-2 text-gold"></i>SQL Server
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=SQL Server 2022 Standard" class="text-gray-300 hover:text-gold transition-colors">SQL Server 2022 Standard</a></li>
                                                <li><a href="/produkte?search=SQL Server 2022 Enterprise" class="text-gray-300 hover:text-gold transition-colors">SQL Server 2022 Enterprise</a></li>
                                                <li><a href="/produkte?search=SQL Server 2019" class="text-gray-300 hover:text-gold transition-colors">SQL Server 2019</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-users mr-2 text-gold"></i>CAL Lizenzen
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows Server CAL 2025" class="text-gray-300 hover:text-gold transition-colors">Server CAL 2025</a></li>
                                                <li><a href="/produkte?search=RDS CAL 2025" class="text-gray-300 hover:text-gold transition-colors">RDS CAL 2025</a></li>
                                                <li><a href="/produkte?search=Exchange Server CAL" class="text-gray-300 hover:text-gold transition-colors">Exchange Server CAL</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                        <!-- Antivirus Menu -->
                        <li class="relative mega-menu-trigger">
                            <a href="/produkte?category=Antivirus" class="px-4 py-4 hover:bg-navy-medium transition-colors block flex items-center">
                                <i class="fas fa-shield-virus mr-2 text-gold"></i>Antivirus
                                <i class="fas fa-chevron-down ml-2 text-xs"></i>
                            </a>
                            <div class="mega-menu">
                                <div class="w-full px-6 py-6">
                                    <div class="grid grid-cols-3 gap-6">
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-shield-virus mr-2 text-gold"></i>Antivirus Premium
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Kaspersky Total Security" class="text-gray-300 hover:text-gold transition-colors">Kaspersky Total Security</a></li>
                                                <li><a href="/produkte?search=Norton 360 Premium" class="text-gray-300 hover:text-gold transition-colors">Norton 360 Premium</a></li>
                                                <li><a href="/produkte?search=Bitdefender Total Security" class="text-gray-300 hover:text-gold transition-colors">Bitdefender Total Security</a></li>
                                                <li><a href="/produkte?search=ESET Internet Security" class="text-gray-300 hover:text-gold transition-colors">ESET Internet Security</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-building mr-2 text-gold"></i>Business Security
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Kaspersky Endpoint Security" class="text-gray-300 hover:text-gold transition-colors">Kaspersky Endpoint Security</a></li>
                                                <li><a href="/produkte?search=Bitdefender GravityZone" class="text-gray-300 hover:text-gold transition-colors">Bitdefender GravityZone</a></li>
                                                <li><a href="/produkte?search=ESET Endpoint Protection" class="text-gray-300 hover:text-gold transition-colors">ESET Endpoint Protection</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-home mr-2 text-gold"></i>Home Security
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Avast Premium Security" class="text-gray-300 hover:text-gold transition-colors">Avast Premium Security</a></li>
                                                <li><a href="/produkte?search=AVG Internet Security" class="text-gray-300 hover:text-gold transition-colors">AVG Internet Security</a></li>
                                                <li><a href="/produkte?search=McAfee Total Protection" class="text-gray-300 hover:text-gold transition-colors">McAfee Total Protection</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                        <!-- Adobe & CAD Menu -->
                        <li class="relative mega-menu-trigger">
                            <a href="/produkte?category=Adobe" class="px-4 py-4 hover:bg-navy-medium transition-colors block flex items-center">
                                <i class="fas fa-paint-brush mr-2 text-gold"></i>Adobe & CAD
                                <i class="fas fa-chevron-down ml-2 text-xs"></i>
                            </a>
                            <div class="mega-menu">
                                <div class="w-full px-6 py-6">
                                    <div class="grid grid-cols-3 gap-6">
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-paint-brush mr-2 text-gold"></i>Adobe Creative Cloud
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Adobe Creative Cloud All Apps" class="text-gray-300 hover:text-gold transition-colors">CC All Apps</a></li>
                                                <li><a href="/produkte?search=Adobe Photoshop" class="text-gray-300 hover:text-gold transition-colors">Photoshop</a></li>
                                                <li><a href="/produkte?search=Adobe Illustrator" class="text-gray-300 hover:text-gold transition-colors">Illustrator</a></li>
                                                <li><a href="/produkte?search=Adobe Premiere Pro" class="text-gray-300 hover:text-gold transition-colors">Premiere Pro</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-drafting-compass mr-2 text-gold"></i>Autodesk CAD
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=AutoCAD 2024" class="text-gray-300 hover:text-gold transition-colors">AutoCAD 2024</a></li>
                                                <li><a href="/produkte?search=AutoCAD LT 2024" class="text-gray-300 hover:text-gold transition-colors">AutoCAD LT 2024</a></li>
                                                <li><a href="/produkte?search=Revit 2024" class="text-gray-300 hover:text-gold transition-colors">Revit 2024</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-cube mr-2 text-gold"></i>3D & Design
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=3ds Max" class="text-gray-300 hover:text-gold transition-colors">3ds Max</a></li>
                                                <li><a href="/produkte?search=Maya" class="text-gray-300 hover:text-gold transition-colors">Maya</a></li>
                                                <li><a href="/produkte?search=SketchUp Pro" class="text-gray-300 hover:text-gold transition-colors">SketchUp Pro</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                        <li><a href="/produkte?tag=angebote" class="px-4 py-4 hover:bg-navy-medium transition-colors block flex items-center"><i class="fas fa-fire mr-2 text-gold"></i>Angebote <span class="bg-gold text-white px-2 py-1 rounded-full text-xs ml-2 pulse-gold">-70%</span></a></li>
                        <li><a href="/kontakt" class="px-4 py-4 hover:bg-navy-medium transition-colors block"><i class="fas fa-envelope mr-2"></i>Kontakt</a></li>
                    </ul>
                </div>
            </nav>
        </header>

        <!-- Dynamic Hero Slider (Quick Win 1) -->
        <div id="dynamic-slider-container"></div>

        <!-- Hero Section (Fallback if no dynamic slides) -->
        <section class="gradient-hero text-white py-24 relative overflow-hidden" id="hero-fallback">
            <!-- Animated Background Shapes -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute w-96 h-96 bg-gold opacity-10 rounded-full blur-3xl -top-20 -left-20 animate-float"></div>
                <div class="absolute w-96 h-96 bg-gold opacity-10 rounded-full blur-3xl top-40 right-10 animate-float" style="animation-delay: 1s;"></div>
                <div class="absolute w-64 h-64 bg-white opacity-5 rounded-full blur-3xl bottom-20 left-1/3 animate-float" style="animation-delay: 2s;"></div>
            </div>
            
            <div class="w-full px-8 relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="space-y-8">
                        <div class="inline-block animate-slideDown">
                            <span class="bg-gold text-white px-4 py-2 rounded-full text-sm font-bold inline-flex items-center">
                                <i class="fas fa-star mr-2"></i>
                                Über 50.000 zufriedene Kunden
                            </span>
                        </div>
                        
                        <h1 class="text-5xl lg:text-6xl font-bold leading-tight animate-fadeIn">
                            Original Software Lizenzen
                            <span class="block text-gold mt-2">bis zu 70% günstiger</span>
                        </h1>
                        
                        <p class="text-xl leading-relaxed text-gray-200 animate-fadeIn" style="animation-delay: 0.2s;">
                            Windows 11, Office 2024, Antivirus & mehr – 
                            <strong class="text-white">sofort verfügbar</strong>, 
                            <strong class="text-white">100% legal</strong> und 
                            <strong class="text-white">deutlich günstiger</strong>. 
                            Direkt per E-Mail nach Zahlungseingang.
                        </p>
                        
                        <div class="grid grid-cols-3 gap-4 animate-slideUp" style="animation-delay: 0.4s;">
                            <div class="glass-effect rounded-xl p-4 hover-lift">
                                <i class="fas fa-download text-gold text-3xl mb-2"></i>
                                <div class="font-bold text-sm">Sofort-Download</div>
                                <div class="text-xs text-gray-300">Nach Zahlung</div>
                            </div>
                            <div class="glass-effect rounded-xl p-4 hover-lift">
                                <i class="fas fa-shield-check text-gold text-3xl mb-2"></i>
                                <div class="font-bold text-sm">100% Legal</div>
                                <div class="text-xs text-gray-300">Geprüfte Lizenzen</div>
                            </div>
                            <div class="glass-effect rounded-xl p-4 hover-lift">
                                <i class="fas fa-undo-alt text-gold text-3xl mb-2"></i>
                                <div class="font-bold text-sm">14 Tage</div>
                                <div class="text-xs text-gray-300">Geld-zurück</div>
                            </div>
                        </div>
                        
                        <div class="flex flex-wrap gap-4 animate-slideUp" style="animation-delay: 0.6s;">
                            <a href="/produkte" class="bg-gold hover:bg-gold-light text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover-lift inline-flex items-center shadow-2xl">
                                <i class="fas fa-shopping-bag mr-3 text-xl"></i>
                                Jetzt einkaufen
                            </a>
                            <a href="/produkte?tag=angebote" class="glass-effect hover:bg-white hover:bg-opacity-20 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover-lift inline-flex items-center">
                                <i class="fas fa-fire mr-3 text-gold text-xl"></i>
                                Top Angebote
                            </a>
                        </div>
                        
                        <div class="flex items-center gap-6 text-sm animate-fadeIn" style="animation-delay: 0.8s;">
                            <div class="flex items-center gap-2">
                                <div class="flex -space-x-2">
                                    <img src="https://i.pravatar.cc/40?img=1" alt="Customer" class="w-10 h-10 rounded-full border-2 border-white" loading="lazy" />
                                    <img src="https://i.pravatar.cc/40?img=2" alt="Customer" class="w-10 h-10 rounded-full border-2 border-white" loading="lazy" />
                                    <img src="https://i.pravatar.cc/40?img=3" alt="Customer" class="w-10 h-10 rounded-full border-2 border-white" loading="lazy" />
                                    <div class="w-10 h-10 rounded-full border-2 border-white bg-gold text-white flex items-center justify-center font-bold text-xs">50k+</div>
                                </div>
                                <div>
                                    <div class="font-bold">Zufriedene Kunden</div>
                                    <div class="text-gray-300 text-xs">★★★★★ 4.9/5</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative animate-scaleIn" style="animation-delay: 0.4s;">
                        <div class="relative">
                            <img src="/static/banners/hero_home.jpg" alt="Original Software Lizenzen" class="w-full rounded-2xl shadow-2xl" onerror="this.src='https://via.placeholder.com/600x400/1a2a4e/d4af37?text=Software+Lizenzen'" />
                            <div class="absolute -bottom-6 -right-6 bg-gradient-to-br from-gold to-gold-dark text-white px-8 py-6 rounded-2xl shadow-2xl font-bold pulse-gold">
                                <div class="text-4xl">Bis zu 70%</div>
                                <div class="text-lg">Günstiger</div>
                            </div>
                        </div>
                        
                        <!-- Floating Stats -->
                        <div class="absolute top-10 -left-6 bg-white text-white px-6 py-4 rounded-xl shadow-xl animate-float">
                            <div class="text-2xl font-bold text-gold">2.347+</div>
                            <div class="text-sm">Verkäufe heute</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Scroll Indicator -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <i class="fas fa-chevron-down text-gold text-2xl"></i>
            </div>
        </section>

        <!-- Trust Badges -->
        <section class="bg-navy-dark py-6 shadow-md">
            <div class="w-full px-6">
                <div class="grid grid-cols-5 gap-6 text-center">
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-certificate text-gold text-2xl"></i>
                        </div>
                        <div class="font-bold text-white">100% Original</div>
                        <div class="text-sm text-gray-400">Echte Lizenzen</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-bolt text-gold text-2xl"></i>
                        </div>
                        <div class="font-bold text-white">Sofortversand</div>
                        <div class="text-sm text-gray-400">Per E-Mail</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-lock text-gold text-2xl"></i>
                        </div>
                        <div class="font-bold text-white">SSL-Verschlüsselung</div>
                        <div class="text-sm text-gray-400">Sichere Zahlung</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-headset text-gold text-2xl"></i>
                        </div>
                        <div class="font-bold text-white">24/7 Support</div>
                        <div class="text-sm text-gray-400">Kundenservice</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-star text-gold text-2xl"></i>
                        </div>
                        <div class="font-bold text-white">Über 50.000</div>
                        <div class="text-sm text-gray-400">Zufriedene Kunden</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Google & Trustpilot Reviews Section -->
        <section class="py-12 bg-navy-ultra-dark">
            <div class="w-full px-8">
                <div class="text-center mb-10">
                    <h2 class="text-3xl font-bold text-white mb-4">
                        <i class="fas fa-star text-gold mr-3"></i>
                        Vertraut von Tausenden zufriedenen Kunden
                    </h2>
                    <p class="text-gray-400 text-lg">Sehen Sie, was unsere Kunden über uns sagen</p>
                </div>
                
                <div class="grid grid-cols-2 gap-8 mb-8">
                    <!-- Google Reviews -->
                    <div class="bg-navy-medium rounded-xl shadow-lg p-8 border-2 border-gold">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center">
                                <img src="https://www.google.com/favicon.ico" alt="Google" class="w-12 h-12 mr-4" />
                                <div>
                                    <h3 class="text-2xl font-bold text-white">Google Bewertungen</h3>
                                    <p class="text-gray-400">Verifizierte Kundenbewertungen</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-5xl font-bold text-gold">4.9</div>
                                <div class="review-stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                </div>
                                <p class="text-sm text-gray-400 mt-1">4.523 Bewertungen</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-5 gap-2">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gold">5★</div>
                                <div class="w-full bg-navy-light rounded-full h-2 mt-1">
                                    <div class="bg-gold h-2 rounded-full" style="width: 92%"></div>
                                </div>
                                <div class="text-xs text-gray-400 mt-1">92%</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gold">4★</div>
                                <div class="w-full bg-navy-light rounded-full h-2 mt-1">
                                    <div class="bg-gold h-2 rounded-full" style="width: 6%"></div>
                                </div>
                                <div class="text-xs text-gray-400 mt-1">6%</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-400">3★</div>
                                <div class="w-full bg-navy-light rounded-full h-2 mt-1">
                                    <div class="bg-gold h-2 rounded-full" style="width: 1%"></div>
                                </div>
                                <div class="text-xs text-gray-400 mt-1">1%</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-400">2★</div>
                                <div class="w-full bg-navy-light rounded-full h-2 mt-1">
                                    <div class="bg-gold h-2 rounded-full" style="width: 0.5%"></div>
                                </div>
                                <div class="text-xs text-gray-400 mt-1">0.5%</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-400">1★</div>
                                <div class="w-full bg-navy-light rounded-full h-2 mt-1">
                                    <div class="bg-gold h-2 rounded-full" style="width: 0.5%"></div>
                                </div>
                                <div class="text-xs text-gray-400 mt-1">0.5%</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Trustpilot Reviews -->
                    <div class="bg-navy-medium rounded-xl shadow-lg p-8 border-2 border-gold">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-star text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold text-white">Trustpilot</h3>
                                    <p class="text-gray-400">Hervorragend bewertet</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-5xl font-bold text-green-600">4.8</div>
                                <div class="review-stars text-green-600">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                </div>
                                <p class="text-sm text-gray-400 mt-1">3.892 Bewertungen</p>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold">Hervorragend</span>
                                <div class="flex-1 mx-4 bg-navy-light rounded-full h-3">
                                    <div class="bg-green-600 h-3 rounded-full" style="width: 89%"></div>
                                </div>
                                <span class="text-sm font-bold text-green-600">89%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold">Gut</span>
                                <div class="flex-1 mx-4 bg-navy-light rounded-full h-3">
                                    <div class="bg-green-500 h-3 rounded-full" style="width: 8%"></div>
                                </div>
                                <span class="text-sm font-bold">8%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold">Durchschnittlich</span>
                                <div class="flex-1 mx-4 bg-navy-light rounded-full h-3">
                                    <div class="bg-yellow-500 h-3 rounded-full" style="width: 2%"></div>
                                </div>
                                <span class="text-sm font-bold">2%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold">Schlecht</span>
                                <div class="flex-1 mx-4 bg-navy-light rounded-full h-3">
                                    <div class="bg-red-500 h-3 rounded-full" style="width: 1%"></div>
                                </div>
                                <span class="text-sm font-bold">1%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Bestseller Slider -->
        <section class="py-16 bg-navy-dark">
            <div class="w-full px-8">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-2">
                            <i class="fas fa-fire text-gold mr-3"></i>
                            Bestseller – Top-Produkte
                        </h2>
                        <p class="text-gray-400">Die meistverkauften Produkte unserer Kunden</p>
                    </div>
                    <a href="/produkte?sort=bestsellers" class="bg-gold hover:bg-gold-light text-white px-6 py-3 rounded-lg font-bold transition-all hover-lift">
                        Alle Bestseller <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="product-slider grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="bestsellers-container">
                    <!-- Bestseller products will be loaded here dynamically -->
                    <div class="text-center col-span-full text-gray-400">
                        <i class="fas fa-spinner fa-spin text-3xl mb-2"></i>
                        <p>Lade Bestseller...</p>
                    </div>
                </div>
                <div class="slider-controls">
                    <button class="slider-btn" onclick="scrollSlider('bestseller-slider', -300)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="slider-btn" onclick="scrollSlider('bestseller-slider', 300)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- Favoriten Slider -->
        <section class="py-16 bg-navy-ultra-dark">
            <div class="w-full px-8">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-2">
                            <i class="fas fa-heart text-gold mr-3"></i>
                            Favoriten – Meist gewünscht
                        </h2>
                        <p class="text-gray-400">Die beliebtesten Produkte auf der Wunschliste</p>
                    </div>
                    <a href="/produkte?tag=favoriten" class="bg-navy-dark hover:bg-navy-medium text-white px-6 py-3 rounded-lg font-bold transition-all hover-lift">
                        Alle Favoriten <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="product-slider" id="favorites-slider">
                    <!-- Products will be loaded here -->
                </div>
                <div class="slider-controls">
                    <button class="slider-btn" onclick="scrollSlider('favorites-slider', -300)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="slider-btn" onclick="scrollSlider('favorites-slider', 300)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- Games Slider -->
        <section class="py-16 bg-navy-dark">
            <div class="w-full px-8">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-2">
                            <i class="fas fa-gamepad text-gold mr-3"></i>
                            Gaming & Spiele
                        </h2>
                        <p class="text-gray-400">Game Keys, Gaming-Software und mehr</p>
                    </div>
                    <a href="/produkte?category=Games" class="bg-gold hover:bg-gold-light text-white px-6 py-3 rounded-lg font-bold transition-all hover-lift">
                        Alle Games <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="product-slider" id="games-slider">
                    <!-- Products will be loaded here -->
                </div>
                <div class="slider-controls">
                    <button class="slider-btn" onclick="scrollSlider('games-slider', -300)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="slider-btn" onclick="scrollSlider('games-slider', 300)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- Firma Angebote (Company Offers) -->
        <section class="py-16 gradient-navy text-white">
            <div class="w-full px-8">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold mb-4">
                        <i class="fas fa-building text-gold mr-3"></i>
                        Spezielle Angebote für Unternehmen
                    </h2>
                    <p class="text-xl text-gray-200">Volumenlizenzen, individuelle Beratung und attraktive Konditionen für Ihr Unternehmen</p>
                </div>
                
                <div class="grid grid-cols-3 gap-8 mb-10">
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover-lift border-2 border-gold">
                        <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
                            <i class="fas fa-users text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Volumenlizenzen</h3>
                        <p class="text-gray-200 mb-4">
                            Ab 10 Lizenzen erhalten Sie attraktive Mengenrabatte. 
                            Perfekt für mittelständische und große Unternehmen.
                        </p>
                        <ul class="space-y-2 text-gray-200">
                            <li><i class="fas fa-check text-gold mr-2"></i>Bis zu 25% Rabatt</li>
                            <li><i class="fas fa-check text-gold mr-2"></i>Flexible Zahlungsbedingungen</li>
                            <li><i class="fas fa-check text-gold mr-2"></i>Zentrale Lizenzverwaltung</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover-lift border-2 border-gold">
                        <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
                            <i class="fas fa-handshake text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Persönlicher Ansprechpartner</h3>
                        <p class="text-gray-200 mb-4">
                            Ihr dedizierter Account Manager steht Ihnen für alle Fragen 
                            rund um Softwarelizenzierung zur Verfügung.
                        </p>
                        <ul class="space-y-2 text-gray-200">
                            <li><i class="fas fa-check text-gold mr-2"></i>Direkte Hotline</li>
                            <li><i class="fas fa-check text-gold mr-2"></i>Schnelle Reaktionszeit</li>
                            <li><i class="fas fa-check text-gold mr-2"></i>Individuelle Beratung</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover-lift border-2 border-gold">
                        <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
                            <i class="fas fa-file-invoice text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Kauf auf Rechnung</h3>
                        <p class="text-gray-200 mb-4">
                            Für verifizierte Geschäftskunden bieten wir 
                            bequemen Rechnungskauf mit 30 Tagen Zahlungsziel.
                        </p>
                        <ul class="space-y-2 text-gray-200">
                            <li><i class="fas fa-check text-gold mr-2"></i>30 Tage Zahlungsziel</li>
                            <li><i class="fas fa-check text-gold mr-2"></i>Keine Vorkasse nötig</li>
                            <li><i class="fas fa-check text-gold mr-2"></i>Sammelrechnung möglich</li>
                        </ul>
                    </div>
                </div>
                
                <div class="text-center">
                    <a href="/kontakt?type=business" class="inline-block bg-gold hover:bg-gold-light text-white px-10 py-4 rounded-lg font-bold text-lg transition-all hover-lift">
                        <i class="fas fa-envelope mr-2"></i>
                        Jetzt Unternehmensangebot anfragen
                    </a>
                    <p class="text-gray-300 mt-4">
                        Oder rufen Sie uns an: <a href="tel:+491234567890" class="text-gold font-bold hover:underline">+49 (0) 123 456 7890</a>
                    </p>
                </div>
            </div>
        </section>

        <!-- Featured Products -->
        <section class="py-16 bg-navy-ultra-dark">
            <div class="w-full px-6">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-2">
                            <i class="fas fa-fire text-gold mr-3"></i>
                            Flash Sale – Heute bis zu 70% sparen!
                        </h2>
                        <p class="text-gray-400">Unsere besten Angebote – nur für kurze Zeit!</p>
                    </div>
                    <a href="/produkte?tag=angebote" class="bg-gold hover:bg-gold-light text-white px-6 py-3 rounded-lg font-bold transition-all hover-lift">
                        Alle Angebote <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div id="featured-products-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Featured products will be loaded here dynamically -->
                    <div class="text-center col-span-full text-gray-400">
                        <i class="fas fa-spinner fa-spin text-3xl mb-2"></i>
                        <p>Lade Featured Products...</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Product Categories Grid -->
        <section class="py-16 bg-navy-dark">
            <div class="w-full px-6">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-white mb-4">
                        <i class="fas fa-th-large text-gold mr-3"></i>
                        Unsere Produktkategorien
                    </h2>
                    <p class="text-gray-400 text-lg">Finden Sie die perfekte Software für Ihre Bedürfnisse</p>
                </div>
                
                <div class="grid grid-cols-3 gap-6 mb-12">
                    <!-- Windows Category -->
                    <a href="/produkte?category=Windows" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fab fa-windows text-white text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Windows</h3>
                        <p class="text-gray-400 mb-4">Windows 11, 10, Server & mehr</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle Windows Produkte →</span>
                    </a>
                    
                    <!-- Office Category -->
                    <a href="/produkte?category=Microsoft Office" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fas fa-file-word text-white text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Microsoft Office</h3>
                        <p class="text-gray-400 mb-4">Office 2024, 2021, Microsoft 365</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle Office Produkte →</span>
                    </a>
                    
                    <!-- Server Category -->
                    <a href="/produkte?category=Server" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fas fa-server text-white text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Server & CAL</h3>
                        <p class="text-gray-400 mb-4">Windows Server, SQL Server, CAL</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle Server Produkte →</span>
                    </a>
                    
                    <!-- Antivirus Category -->
                    <a href="/produkte?category=Antivirus" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fas fa-shield-virus text-white text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Antivirus</h3>
                        <p class="text-gray-400 mb-4">Kaspersky, Norton, Bitdefender</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle Antivirus Produkte →</span>
                    </a>
                    
                    <!-- Adobe Category -->
                    <a href="/produkte?category=Adobe" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fas fa-paint-brush text-white text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Adobe & Design</h3>
                        <p class="text-gray-400 mb-4">Photoshop, Illustrator, Creative Cloud</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle Adobe Produkte →</span>
                    </a>
                    
                    <!-- CAD Category -->
                    <a href="/produkte?category=CAD" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fas fa-drafting-compass text-white text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">CAD Software</h3>
                        <p class="text-gray-400 mb-4">AutoCAD, Revit, 3ds Max</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle CAD Produkte →</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- Bestsellers -->
        <section class="py-16 bg-navy-ultra-dark">
            <div class="w-full px-6">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-2">
                            <i class="fas fa-star text-gold mr-3"></i>
                            Bestseller – Die beliebtesten Produkte
                        </h2>
                        <p class="text-gray-400">Von unseren Kunden am häufigsten gekauft</p>
                    </div>
                    <a href="/produkte" class="bg-navy-dark hover:bg-navy-medium text-white px-6 py-3 rounded-lg font-bold transition-all hover-lift">
                        Alle Produkte <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div id="bestsellers" class="grid-products"></div>
            </div>
        </section>

        <!-- SEO Content Section: Wer wir sind -->
        <section class="py-16 bg-navy-dark">
            <div class="w-full px-6">
                <div class="grid grid-cols-2 gap-12">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-6">
                            <i class="fas fa-info-circle text-gold mr-3"></i>
                            Wer wir sind und was wir machen
                        </h2>
                        <div class="prose prose-lg text-gray-300">
                            <p class="mb-4">
                                <strong>SOFTWAREKING24.de</strong> ist Ihr vertrauenswürdiger Online-Shop für <strong>Original-Softwarelizenzen</strong> 
                                zu unschlagbaren Preisen. Wir spezialisieren uns auf den Verkauf von <strong>ESD-Lizenzen</strong> (Electronic Software Distribution) – 
                                digitale Produktkeys, die sofort nach dem Kauf per E-Mail zugestellt werden.
                            </p>
                            <p class="mb-4">
                                Unser Sortiment umfasst alle gängigen Softwarelösungen für <strong>Privatanwender</strong>, <strong>Freelancer</strong> 
                                und <strong>Unternehmen</strong>:
                            </p>
                            <ul class="list-disc list-inside space-y-2 mb-6">
                                <li><strong>Betriebssysteme</strong>: Windows 11, Windows 10, Windows Server</li>
                                <li><strong>Office-Software</strong>: Microsoft Office 2024, Office 2021, Microsoft 365</li>
                                <li><strong>Server-Lösungen</strong>: Windows Server, SQL Server, Exchange Server, CAL-Lizenzen</li>
                                <li><strong>Antivirus & Sicherheit</strong>: Kaspersky, Norton, Bitdefender, ESET</li>
                                <li><strong>CAD & Design</strong>: AutoCAD, Adobe Creative Cloud, Photoshop</li>
                                <li><strong>Retro-Software</strong>: Windows 7, Windows 8.1, ältere Office-Versionen</li>
                            </ul>
                            <p class="font-semibold text-white">
                                Alle unsere Lizenzen sind <strong>100% legal</strong>, <strong>sofort einsetzbar</strong> 
                                und werden mit vollständiger <strong>Dokumentation und Rechnung</strong> geliefert.
                            </p>
                        </div>
                    </div>
                    
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-6">
                            <i class="fas fa-question-circle text-gold mr-3"></i>
                            Warum Software online kaufen?
                        </h2>
                        <div class="prose prose-lg text-gray-300">
                            <p class="mb-4">
                                Der Kauf von Software über das Internet bietet zahlreiche Vorteile gegenüber dem stationären Handel:
                            </p>
                            
                            <div class="bg-navy-dark bg-opacity-5 rounded-lg p-6 mb-4 border-l-4 border-gold">
                                <h3 class="text-xl font-bold text-white mb-3">
                                    <i class="fas fa-euro-sign text-gold mr-2"></i>
                                    Günstigere Preise
                                </h3>
                                <p>
                                    Online-Shops haben deutlich geringere Betriebskosten als Ladengeschäfte. Diese Ersparnis geben wir direkt an Sie weiter. 
                                    Bei SOFTWAREKING24.de sparen Sie oft <strong>bis zu 70% gegenüber dem Neupreis</strong>.
                                </p>
                            </div>
                            
                            <div class="bg-navy-dark bg-opacity-5 rounded-lg p-6 mb-4 border-l-4 border-gold">
                                <h3 class="text-xl font-bold text-white mb-3">
                                    <i class="fas fa-bolt text-gold mr-2"></i>
                                    Sofortige Verfügbarkeit
                                </h3>
                                <p>
                                    Nach Zahlungseingang erhalten Sie Ihre Lizenz <strong>innerhalb von Minuten per E-Mail</strong>. 
                                    Keine Wartezeiten, keine Versandkosten, keine physischen Datenträger – Sie können sofort mit der Installation beginnen.
                                </p>
                            </div>
                            
                            <div class="bg-navy-dark bg-opacity-5 rounded-lg p-6 mb-4 border-l-4 border-gold">
                                <h3 class="text-xl font-bold text-white mb-3">
                                    <i class="fas fa-shield-check text-gold mr-2"></i>
                                    Rechtssicherheit
                                </h3>
                                <p>
                                    Wir verkaufen ausschließlich <strong>Originallizenzen</strong> von Microsoft, Adobe, Kaspersky und anderen renommierten Herstellern. 
                                    Sie erhalten eine <strong>Rechnung</strong> und <strong>vollständige Lizenzunterlagen</strong> – 100% legal und prüfsicher.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ESD Licenses Explanation -->
        <section class="py-16 bg-navy-dark text-white">
            <div class="w-full px-6">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">
                        <i class="fas fa-download text-gold mr-3"></i>
                        Unsere ESD-Lizenzen (Electronic Software Distribution)
                    </h2>
                    <p class="text-xl text-gray-300">Digitale Lizenzen – Sofort verfügbar, dauerhaft gültig, umweltfreundlich</p>
                </div>
                
                <div class="grid grid-cols-3 gap-8">
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover-lift">
                        <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
                            <i class="fas fa-key text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Digitaler Produktschlüssel</h3>
                        <p class="text-gray-300">
                            Sie erhalten einen <strong>25-stelligen Lizenzkey</strong>, den Sie bei der Installation eingeben. 
                            Dieser aktiviert Ihre Software dauerhaft und rechtskonform.
                        </p>
                    </div>
                    
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover-lift">
                        <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
                            <i class="fas fa-download text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Download vom Hersteller</h3>
                        <p class="text-gray-300">
                            Die Installationsdateien laden Sie <strong>kostenlos direkt vom Softwarehersteller</strong> (Microsoft, Adobe etc.) herunter. 
                            Wir liefern Ihnen die Download-Links gleich mit.
                        </p>
                    </div>
                    
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover-lift">
                        <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
                            <i class="fas fa-infinity text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Lebenslange Gültigkeit</h3>
                        <p class="text-gray-300">
                            Unsere Lizenzen sind <strong>dauerhaft gültig</strong> (keine Abonnements bei Kauflizenzen). 
                            Einmal gekauft, können Sie die Software unbegrenzt nutzen.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="py-16 bg-navy-ultra-dark">
            <div class="max-w-4xl mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-white mb-4">
                        <i class="fas fa-question-circle text-gold mr-3"></i>
                        Häufig gestellte Fragen
                    </h2>
                    <p class="text-gray-400">Alles, was Sie über den Kauf von Software bei SOFTWAREKING24 wissen müssen</p>
                </div>
                
                <div class="space-y-4">
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="bg-navy-dark text-white px-6 py-4 cursor-pointer flex items-center justify-between" onclick="toggleFAQ(1)">
                            <h3 class="font-bold text-lg">
                                <i class="fas fa-credit-card text-gold mr-3"></i>
                                Welche Bezahlmöglichkeiten gibt es?
                            </h3>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-1"></i>
                        </div>
                        <div class="px-6 py-4 hidden" id="faq-content-1">
                            <p class="text-gray-300">
                                Wir akzeptieren alle gängigen Zahlungsmethoden für Ihre Bequemlichkeit:
                            </p>
                            <ul class="list-disc list-inside mt-3 space-y-2 text-gray-300">
                                <li><strong>PayPal</strong> – Schnell, sicher und mit Käuferschutz</li>
                                <li><strong>Kreditkarte</strong> (Visa, Mastercard, American Express)</li>
                                <li><strong>Sofortüberweisung</strong> – Direkte Banküberweisung</li>
                                <li><strong>Klarna</strong> – Kauf auf Rechnung oder Ratenzahlung</li>
                                <li><strong>Giropay</strong> – Sicheres Bezahlverfahren deutscher Banken</li>
                            </ul>
                            <p class="mt-3 text-gray-300">
                                Alle Zahlungen sind <strong>SSL-verschlüsselt</strong> und werden über sichere Payment-Gateways abgewickelt.
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="bg-navy-dark text-white px-6 py-4 cursor-pointer flex items-center justify-between" onclick="toggleFAQ(2)">
                            <h3 class="font-bold text-lg">
                                <i class="fas fa-tools text-gold mr-3"></i>
                                Was passiert, wenn Installationsprobleme auftreten?
                            </h3>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-2"></i>
                        </div>
                        <div class="px-6 py-4 hidden" id="faq-content-2">
                            <p class="text-gray-300">
                                Unser <strong>deutschsprachiger Support</strong> hilft Ihnen gerne weiter:
                            </p>
                            <ul class="list-disc list-inside mt-3 space-y-2 text-gray-300">
                                <li><strong>E-Mail-Support</strong>: [email protected] (Antwort innerhalb von 24 Stunden)</li>
                                <li><strong>Telefon-Hotline</strong>: +49 (0) 123 456789 (Mo-Fr: 9-18 Uhr)</li>
                                <li><strong>Live-Chat</strong>: Direkte Hilfe über unsere Website</li>
                                <li><strong>Installationsanleitungen</strong>: Ausführliche PDF-Guides für jedes Produkt</li>
                            </ul>
                            <p class="mt-3 text-gray-300">
                                Sollte Ihre Lizenz aus technischen Gründen nicht funktionieren, erhalten Sie selbstverständlich einen 
                                <strong>kostenlosen Ersatzkey</strong> oder Ihr <strong>Geld zurück</strong>.
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="bg-navy-dark text-white px-6 py-4 cursor-pointer flex items-center justify-between" onclick="toggleFAQ(3)">
                            <h3 class="font-bold text-lg">
                                <i class="fas fa-briefcase text-gold mr-3"></i>
                                Besondere Vorteile für Geschäftskunden
                            </h3>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-3"></i>
                        </div>
                        <div class="px-6 py-4 hidden" id="faq-content-3">
                            <p class="text-gray-300 mb-3">
                                Als <strong>Unternehmen, Behörde oder Bildungseinrichtung</strong> profitieren Sie von zusätzlichen Vorteilen:
                            </p>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-gold bg-opacity-10 rounded-lg p-4 border-l-4 border-gold">
                                    <h4 class="font-bold text-white mb-2">Mengenrabatte</h4>
                                    <p class="text-gray-300 text-sm">
                                        Sparen Sie zusätzlich bei Sammelbestellungen – ab 10 Lizenzen bis zu 15% Extra-Rabatt
                                    </p>
                                </div>
                                <div class="bg-gold bg-opacity-10 rounded-lg p-4 border-l-4 border-gold">
                                    <h4 class="font-bold text-white mb-2">Kauf auf Rechnung</h4>
                                    <p class="text-gray-300 text-sm">
                                        Zahlungsziel 30 Tage nach Erhalt der Rechnung für verifizierte Geschäftskunden
                                    </p>
                                </div>
                                <div class="bg-gold bg-opacity-10 rounded-lg p-4 border-l-4 border-gold">
                                    <h4 class="font-bold text-white mb-2">Volumen-Lizenzierung</h4>
                                    <p class="text-gray-300 text-sm">
                                        Microsoft-Volumenlizenzprogramme (Open, Select, Enterprise Agreement)
                                    </p>
                                </div>
                                <div class="bg-gold bg-opacity-10 rounded-lg p-4 border-l-4 border-gold">
                                    <h4 class="font-bold text-white mb-2">Persönlicher Ansprechpartner</h4>
                                    <p class="text-gray-300 text-sm">
                                        Ihr fester Ansprechpartner für alle Fragen rund um Ihre Softwarelizenzierung
                                    </p>
                                </div>
                            </div>
                            <p class="mt-4 text-gray-300">
                                <strong>Kontaktieren Sie uns</strong> für ein individuelles Angebot: 
                                <a href="mailto:[email protected]" class="text-gold font-semibold hover:underline">[email protected]</a>
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="bg-navy-dark text-white px-6 py-4 cursor-pointer flex items-center justify-between" onclick="toggleFAQ(4)">
                            <h3 class="font-bold text-lg">
                                <i class="fab fa-windows text-gold mr-3"></i>
                                Lohnt sich für mich ein Wechsel zu Windows 11?
                            </h3>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-4"></i>
                        </div>
                        <div class="px-6 py-4 hidden" id="faq-content-4">
                            <p class="text-gray-300 mb-3">
                                <strong>Windows 11</strong> bietet zahlreiche Verbesserungen gegenüber Windows 10:
                            </p>
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div class="flex items-start">
                                    <i class="fas fa-check-circle text-gold text-xl mr-3 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-white">Moderne Benutzeroberfläche</h4>
                                        <p class="text-gray-300 text-sm">Aufgeräumtes Design mit abgerundeten Ecken und zentrierter Taskleiste</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-check-circle text-gold text-xl mr-3 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-white">Bessere Performance</h4>
                                        <p class="text-gray-300 text-sm">Schnellerer Start, optimierte Speicherverwaltung, verbesserte Gaming-Leistung</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-check-circle text-gold text-xl mr-3 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-white">DirectStorage & Auto HDR</h4>
                                        <p class="text-gray-300 text-sm">Deutlich schnellere Ladezeiten und verbesserte Grafik in Spielen</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-check-circle text-gold text-xl mr-3 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-white">Sicherheitsfeatures</h4>
                                        <p class="text-gray-300 text-sm">TPM 2.0, Secure Boot, Windows Hello, verbesserte Verschlüsselung</p>
                                    </div>
                                </div>
                            </div>
                            <p class="text-gray-300">
                                <strong>Wichtig:</strong> Prüfen Sie vor dem Upgrade die 
                                <a href="https://www.microsoft.com/de-de/windows/windows-11-specifications" target="_blank" class="text-gold hover:underline">
                                    Systemanforderungen für Windows 11
                                </a>.
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="bg-navy-dark text-white px-6 py-4 cursor-pointer flex items-center justify-between" onclick="toggleFAQ(5)">
                            <h3 class="font-bold text-lg">
                                <i class="fas fa-rocket text-gold mr-3"></i>
                                Unsere Software ist leicht zu nutzen und schnell installiert
                            </h3>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-5"></i>
                        </div>
                        <div class="px-6 py-4 hidden" id="faq-content-5">
                            <p class="text-gray-300 mb-4">
                                Die Installation Ihrer gekauften Software ist denkbar einfach:
                            </p>
                            <div class="space-y-4">
                                <div class="flex items-start">
                                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <span class="text-white font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-white mb-1">Download der Software</h4>
                                        <p class="text-gray-300">
                                            Klicken Sie auf den Download-Link in Ihrer Bestätigungs-E-Mail und laden Sie die Installationsdatei 
                                            direkt vom Hersteller herunter (z.B. Microsoft, Adobe).
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <span class="text-white font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-white mb-1">Installation starten</h4>
                                        <p class="text-gray-300">
                                            Doppelklicken Sie auf die heruntergeladene Datei und folgen Sie dem Installationsassistenten. 
                                            Dieser führt Sie Schritt für Schritt durch den Prozess.
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <span class="text-white font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-white mb-1">Lizenzkey eingeben</h4>
                                        <p class="text-gray-300">
                                            Geben Sie bei der Aktivierung den 25-stelligen Produktkey ein, den Sie per E-Mail erhalten haben. 
                                            Die Software wird dadurch dauerhaft freigeschaltet.
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <span class="text-white font-bold">4</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-white mb-1">Sofort loslegen</h4>
                                        <p class="text-gray-300">
                                            Nach erfolgreicher Aktivierung können Sie die Software ohne Einschränkungen nutzen. 
                                            Die gesamte Installation dauert in der Regel <strong>nur 15-30 Minuten</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Customer Testimonials -->
        <section class="py-16 bg-navy-dark">
            <div class="w-full px-6">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-white mb-4">
                        <i class="fas fa-comments text-gold mr-3"></i>
                        Das sagen unsere Kunden
                    </h2>
                    <p class="text-gray-400">Über 50.000 zufriedene Kunden vertrauen auf SOFTWAREKING24</p>
                </div>
                
                <div class="grid grid-cols-3 gap-6">
                    <div class="testimonial-card">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                                MK
                            </div>
                            <div>
                                <div class="font-bold text-white">Michael K.</div>
                                <div class="text-sm text-gray-400">Verified Purchase</div>
                            </div>
                        </div>
                        <div class="flex mb-3">
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                        </div>
                        <p class="text-gray-300 italic">
                            "Sehr schnelle Lieferung des Lizenzkeys! Installation von Windows 11 hat einwandfrei geklappt. 
                            Preis-Leistung ist unschlagbar. Gerne wieder!"
                        </p>
                        <div class="text-sm text-gray-500 mt-3">
                            <i class="fas fa-shopping-bag mr-1"></i>Windows 11 Professional
                        </div>
                    </div>
                    
                    <div class="testimonial-card">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                                SB
                            </div>
                            <div>
                                <div class="font-bold text-white">Sandra B.</div>
                                <div class="text-sm text-gray-400">Verified Purchase</div>
                            </div>
                        </div>
                        <div class="flex mb-3">
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                        </div>
                        <p class="text-gray-300 italic">
                            "Als Geschäftskunde mehrere Office-Lizenzen bestellt. Alles top! Rechnung kam sofort, Keys funktionierten 
                            alle auf Anhieb. Support war auch sehr hilfsbereit."
                        </p>
                        <div class="text-sm text-gray-500 mt-3">
                            <i class="fas fa-shopping-bag mr-1"></i>Office 2024 Professional Plus
                        </div>
                    </div>
                    
                    <div class="testimonial-card">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                                TR
                            </div>
                            <div>
                                <div class="font-bold text-white">Thomas R.</div>
                                <div class="text-sm text-gray-400">Verified Purchase</div>
                            </div>
                        </div>
                        <div class="flex mb-3">
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                        </div>
                        <p class="text-gray-300 italic">
                            "Hatte Bedenken wegen günstiger Preise, aber alles ist 100% legal. Microsoft-Aktivierung hat sofort 
                            geklappt. Spare mir hunderte Euro!"
                        </p>
                        <div class="text-sm text-gray-500 mt-3">
                            <i class="fas fa-shopping-bag mr-1"></i>Windows Server 2025 Standard
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-10">
                    <div class="inline-flex items-center bg-gold bg-opacity-10 rounded-lg px-6 py-4 border-2 border-gold">
                        <div class="text-5xl font-bold text-gold mr-4">4.9</div>
                        <div class="text-left">
                            <div class="flex mb-1">
                                <i class="fas fa-star text-gold text-xl"></i>
                                <i class="fas fa-star text-gold text-xl"></i>
                                <i class="fas fa-star text-gold text-xl"></i>
                                <i class="fas fa-star text-gold text-xl"></i>
                                <i class="fas fa-star text-gold text-xl"></i>
                            </div>
                            <div class="text-white font-semibold">Basierend auf 8.247 Bewertungen</div>
                            <div class="text-sm text-gray-400">Trustpilot & Google Reviews</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- New Arrivals -->
        <section class="py-16 bg-navy-ultra-dark">
            <div class="w-full px-6">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-2">
                            <i class="fas fa-sparkles text-gold mr-3"></i>
                            Neu eingetroffen
                        </h2>
                        <p class="text-gray-400">Die neuesten Produkte in unserem Sortiment</p>
                    </div>
                </div>
                <div id="new-products-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- New products will be loaded here dynamically -->
                    <div class="text-center col-span-full text-gray-400">
                        <i class="fas fa-spinner fa-spin text-3xl mb-2"></i>
                        <p>Lade neue Produkte...</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <section class="py-16 bg-gradient-to-br from-navy-dark to-navy-medium">
            <div class="w-full px-6">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="mb-6">
                        <i class="fas fa-envelope-open-text text-6xl text-gold mb-4"></i>
                        <h2 class="text-3xl font-bold text-white mb-3">
                            Newsletter abonnieren
                        </h2>
                        <p class="text-gray-300 text-lg">
                            Erhalten Sie exklusive Angebote, neue Produkte und die besten Deals direkt in Ihr Postfach!
                        </p>
                    </div>
                    
                    <form id="newsletter-form" class="max-w-2xl mx-auto">
                        <div class="flex flex-col md:flex-row gap-3">
                            <div class="flex-1">
                                <input 
                                    type="email" 
                                    id="newsletter-email"
                                    placeholder="Ihre E-Mail-Adresse" 
                                    required
                                    class="w-full px-6 py-4 rounded-lg text-white font-medium focus:outline-none focus:ring-4 focus:ring-gold transition-all"
                                />
                            </div>
                            <button 
                                type="submit"
                                class="bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-lg font-bold transition-all hover-lift flex items-center justify-center whitespace-nowrap"
                            >
                                <i class="fas fa-paper-plane mr-2"></i>
                                Jetzt abonnieren
                            </button>
                        </div>
                        <p class="text-gray-400 text-sm mt-4">
                            <i class="fas fa-shield-alt mr-1"></i>
                            Ihre Daten sind bei uns sicher. Sie können sich jederzeit abmelden.
                        </p>
                    </form>
                    
                    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div class="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                            <i class="fas fa-tag text-gold text-2xl mb-2"></i>
                            <h3 class="font-bold text-white mb-1">Exklusive Rabatte</h3>
                            <p class="text-gray-300 text-sm">Bis zu 20% Rabatt nur für Newsletter-Abonnenten</p>
                        </div>
                        <div class="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                            <i class="fas fa-rocket text-gold text-2xl mb-2"></i>
                            <h3 class="font-bold text-white mb-1">Früher Zugang</h3>
                            <p class="text-gray-300 text-sm">Neue Produkte vor allen anderen entdecken</p>
                        </div>
                        <div class="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                            <i class="fas fa-gift text-gold text-2xl mb-2"></i>
                            <h3 class="font-bold text-white mb-1">Gewinnspiele</h3>
                            <p class="text-gray-300 text-sm">Teilnahme an exklusiven Verlosungen</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-navy-dark text-white py-12">
            <div class="w-full px-6">
                <div class="grid grid-cols-4 gap-8 mb-8">
                    <div>
                        <img src="/static/logo-footer.png" alt="KING24" class="h-16 mb-4" />
                        <p class="text-gray-300 text-sm mb-4">
                            Ihr vertrauenswürdiger Partner für Original-Software zu unschlagbaren Preisen. 
                            Seit über 10 Jahren am Markt.
                        </p>
                        <div class="flex space-x-3">
                            <a href="#" class="w-10 h-10 bg-gold bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-gold bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-gold bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-gold bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="font-bold text-lg mb-4 text-gold">Produktkategorien</h3>
                        <ul class="space-y-2 text-gray-300">
                            <li><a href="/produkte?category=Windows" class="hover:text-gold transition-colors">Windows</a></li>
                            <li><a href="/produkte?category=Microsoft Office" class="hover:text-gold transition-colors">Microsoft Office</a></li>
                            <li><a href="/produkte?category=Server" class="hover:text-gold transition-colors">Server & CAL</a></li>
                            <li><a href="/produkte?category=Antivirus" class="hover:text-gold transition-colors">Antivirus</a></li>
                            <li><a href="/produkte?category=Adobe" class="hover:text-gold transition-colors">Adobe & Design</a></li>
                            <li><a href="/produkte?category=CAD" class="hover:text-gold transition-colors">CAD Software</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="font-bold text-lg mb-4 text-gold">Kundenservice</h3>
                        <ul class="space-y-2 text-gray-300">
                            <li><a href="/kontakt" class="hover:text-gold transition-colors">Kontakt</a></li>
                            <li><a href="/hilfe" class="hover:text-gold transition-colors">Hilfe & FAQ</a></li>
                            <li><a href="/versand" class="hover:text-gold transition-colors">Versandinformationen</a></li>
                            <li><a href="/rueckgabe" class="hover:text-gold transition-colors">Rückgaberecht</a></li>
                            <li><a href="/garantie" class="hover:text-gold transition-colors">Garantiebedingungen</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="font-bold text-lg mb-4 text-gold">Rechtliches</h3>
                        <ul class="space-y-2 text-gray-300">
                            <li><a href="/agb" class="hover:text-gold transition-colors">AGB</a></li>
                            <li><a href="/datenschutz" class="hover:text-gold transition-colors">Datenschutz</a></li>
                            <li><a href="/impressum" class="hover:text-gold transition-colors">Impressum</a></li>
                            <li><a href="/widerruf" class="hover:text-gold transition-colors">Widerrufsrecht</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-700 pt-8 mt-8">
                    <div class="flex items-center justify-between">
                        <div class="text-gray-400 text-sm">
                            © 2026 SOFTWAREKING24.de – Alle Rechte vorbehalten
                        </div>
                        <div class="flex items-center space-x-6">
                            <img src="https://via.placeholder.com/60x40/1a2a4e/d4af37?text=PayPal" alt="PayPal" class="h-8" />
                            <img src="https://via.placeholder.com/60x40/1a2a4e/d4af37?text=VISA" alt="Visa" class="h-8" />
                            <img src="https://via.placeholder.com/60x40/1a2a4e/d4af37?text=MC" alt="Mastercard" class="h-8" />
                            <img src="https://via.placeholder.com/60x40/1a2a4e/d4af37?text=Klarna" alt="Klarna" class="h-8" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <script>
            // Initialize on page load
            document.addEventListener('DOMContentLoaded', () => {
                // Try to update cart count, but don't block product loading if it fails
                try {
                    if (typeof CartManager !== 'undefined' && CartManager.updateCartCount) {
                        CartManager.updateCartCount();
                    }
                } catch (error) {
                }
                
                // Load products
                loadProducts();
            });

            // FAQ Toggle Function
            function toggleFAQ(id) {
                const content = document.getElementById(\`faq-content-\${id}\`);
                const icon = document.getElementById(\`faq-icon-\${id}\`);
                
                if (content.classList.contains('hidden')) {
                    content.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    content.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                }
            }

            // Load Products
            async function loadProducts() {
                try {
                    
                    // Load homepage sections with products
                    const sectionsResponse = await axios.get('/api/homepage-sections?language=de');
                    
                    if (sectionsResponse.data.success) {
                        const sections = sectionsResponse.data.data;
                        
                        // Find and render each section
                        sections.forEach(section => {
                            
                            // Map API product format to expected format
                            const mappedProducts = section.products.map(p => ({
                                ...p,
                                price: Math.round((p.base_price || 0) * 100),
                                sale_price: p.discount_price ? Math.round(p.discount_price * 100) : null,
                                description: p.short_description || '',
                                image: p.image_url
                            }));
                            
                            if (section.section_key === 'featured_products' && mappedProducts.length > 0) {
                                renderBestsellers(mappedProducts.slice(0, 6));
                            } else if (section.section_key === 'new_products' && mappedProducts.length > 0) {
                                renderNewArrivals(mappedProducts.slice(0, 4));
                            } else {
                            }
                        });
                    }
                    
                    // Fallback: Load Flash Deals (lowest prices) - not managed by sections
                    const flashResponse = await axios.get('/api/products?limit=4&sort=price-asc');
                    if (flashResponse.data.success) {
                        renderFlashDeals(flashResponse.data.data.slice(0, 4));
                    }
                } catch (error) {
                    console.error('❌ Error loading products:', error);
                }
            }

            // Render Flash Deals
            function renderFlashDeals(products) {
                const container = document.getElementById('flash-deals');
                if (!container) return;

                container.innerHTML = products.map(product => {
                    const hasDiscount = product.sale_price && product.sale_price < product.price;
                    const discount = hasDiscount ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;
                    const displayPrice = hasDiscount ? product.sale_price : product.price;
                    const priceEur = (displayPrice / 100).toFixed(2);
                    const originalPriceEur = (product.price / 100).toFixed(2);

                    return \`
                        <div class="product-card">
                            \${hasDiscount ? \`
                                <div class="absolute top-2 right-2 z-10">
                                    <span class="bg-gold text-white px-3 py-1 rounded-full text-sm font-bold pulse-gold">
                                        -\${discount}%
                                    </span>
                                </div>
                            \` : ''}
                            <div class="relative">
                                <img 
                                    src="\${product.image_url || product.image || '/static/placeholder.png'}" 
                                    alt="\${product.name}" 
                                    class="w-full h-48 object-cover"
                                    onerror="this.src='/static/placeholder.png'"
                                />
                            </div>
                            <div class="p-4">
                                <span class="category-badge mb-2">\${product.category || 'Software'}</span>
                                <h3 class="font-bold text-white text-lg mb-2 hover:text-gold transition-colors cursor-pointer" onclick="window.location.href='/produkt/\${product.slug}'">
                                    \${product.name}
                                </h3>
                                <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                                    \${product.description || product.short_description || 'Original Lizenz – Sofort verfügbar'}
                                </p>
                                <div class="flex items-center justify-between mb-4">
                                    <div>
                                        \${hasDiscount ? \`
                                            <div class="text-sm text-gray-500 line-through">€\${originalPriceEur}</div>
                                            <div class="text-2xl font-bold text-gold">€\${priceEur}</div>
                                        \` : \`
                                            <div class="text-2xl font-bold text-white">€\${priceEur}</div>
                                        \`}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        <i class="fas fa-box mr-1"></i>\${product.stock_quantity || 999}
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button 
                                        onclick="addToCart(\${product.id}, '\${product.name.replace(/'/g, "\\'")}', \${displayPrice})"
                                        class="flex-1 bg-gold hover:bg-gold-light text-white px-4 py-2 rounded-lg font-bold transition-all hover-lift"
                                    >
                                        <i class="fas fa-shopping-cart mr-2"></i>Jetzt kaufen
                                    </button>
                                    <a 
                                        href="/produkt/\${product.slug}"
                                        class="bg-navy-dark hover:bg-navy-medium text-white px-4 py-2 rounded-lg font-bold transition-all"
                                        title="Details ansehen"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    \`;
                }).join('');
            }

            // Render Bestsellers
            function renderBestsellers(products) {
                const container = document.getElementById('bestsellers');
                if (!container) return;

                container.innerHTML = products.map(product => {
                    const hasDiscount = product.sale_price && product.sale_price < product.price;
                    const displayPrice = hasDiscount ? product.sale_price : product.price;
                    const priceEur = (displayPrice / 100).toFixed(2);

                    return \`
                        <div class="product-card">
                            <div class="relative">
                                <img 
                                    src="\${product.image_url || product.image || '/static/placeholder.png'}" 
                                    alt="\${product.name}" 
                                    class="w-full h-48 object-cover"
                                    onerror="this.src='/static/placeholder.png'"
                                />
                                <span class="absolute top-2 left-2 bg-gold text-white px-3 py-1 rounded-full text-xs font-bold">
                                    <i class="fas fa-star mr-1"></i>Bestseller
                                </span>
                            </div>
                            <div class="p-4">
                                <span class="category-badge mb-2">\${product.category || 'Software'}</span>
                                <h3 class="font-bold text-white text-lg mb-2 hover:text-gold transition-colors cursor-pointer" onclick="window.location.href='/produkt/\${product.slug}'">
                                    \${product.name}
                                </h3>
                                <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                                    \${product.description || product.short_description || 'Original Lizenz – Sofort verfügbar'}
                                </p>
                                <div class="flex items-center justify-between mb-4">
                                    <div class="text-2xl font-bold text-white">€\${priceEur}</div>
                                    <div class="flex">
                                        <i class="fas fa-star text-gold"></i>
                                        <i class="fas fa-star text-gold"></i>
                                        <i class="fas fa-star text-gold"></i>
                                        <i class="fas fa-star text-gold"></i>
                                        <i class="fas fa-star text-gold"></i>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button 
                                        onclick="addToCart(\${product.id}, '\${product.name.replace(/'/g, "\\'")}', \${displayPrice})"
                                        class="flex-1 bg-gold hover:bg-gold-light text-white px-4 py-2 rounded-lg font-bold transition-all hover-lift"
                                    >
                                        <i class="fas fa-shopping-cart mr-2"></i>Jetzt kaufen
                                    </button>
                                    <a 
                                        href="/produkt/\${product.slug}"
                                        class="bg-navy-dark hover:bg-navy-medium text-white px-4 py-2 rounded-lg font-bold transition-all"
                                        title="Details ansehen"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    \`;
                }).join('');
            }

            // Render New Arrivals
            function renderNewArrivals(products) {
                const container = document.getElementById('new-arrivals');
                if (!container) return;

                container.innerHTML = products.map(product => {
                    const hasDiscount = product.sale_price && product.sale_price < product.price;
                    const displayPrice = hasDiscount ? product.sale_price : product.price;
                    const priceEur = (displayPrice / 100).toFixed(2);

                    return \`
                        <div class="product-card">
                            <div class="relative">
                                <img 
                                    src="\${product.image_url || product.image || '/static/placeholder.png'}" 
                                    alt="\${product.name}" 
                                    class="w-full h-48 object-cover"
                                    onerror="this.src='/static/placeholder.png'"
                                />
                                <span class="absolute top-2 left-2 bg-navy-dark text-gold px-3 py-1 rounded-full text-xs font-bold border-2 border-gold">
                                    <i class="fas fa-sparkles mr-1"></i>Neu
                                </span>
                            </div>
                            <div class="p-4">
                                <span class="category-badge mb-2">\${product.category || 'Software'}</span>
                                <h3 class="font-bold text-white text-lg mb-2 hover:text-gold transition-colors cursor-pointer" onclick="window.location.href='/produkt/\${product.slug}'">
                                    \${product.name}
                                </h3>
                                <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                                    \${product.description || product.short_description || 'Original Lizenz – Sofort verfügbar'}
                                </p>
                                <div class="flex items-center justify-between mb-4">
                                    <div class="text-2xl font-bold text-white">€\${priceEur}</div>
                                </div>
                                <div class="flex space-x-2">
                                    <button 
                                        onclick="addToCart(\${product.id}, '\${product.name.replace(/'/g, "\\'")}', \${displayPrice})"
                                        class="flex-1 bg-gold hover:bg-gold-light text-white px-4 py-2 rounded-lg font-bold transition-all hover-lift"
                                    >
                                        <i class="fas fa-shopping-cart mr-2"></i>Jetzt kaufen
                                    </button>
                                    <a 
                                        href="/produkt/\${product.slug}"
                                        class="bg-navy-dark hover:bg-navy-medium text-white px-4 py-2 rounded-lg font-bold transition-all"
                                        title="Details ansehen"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    \`;
                }).join('');
            }

            // Add to Cart Function
            async function addToCart(productId, productName, price) {
                try {
                    // Use the global cart manager instance
                    const success = await window.cartManager.addToCart(productId, 1, 'single');
                    
                    if (success) {
                    }
                } catch (error) {
                    console.error('Error adding to cart:', error);
                    // Show error notification
                    const notification = document.createElement('div');
                    notification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl z-50 animate-slideDown';
                    notification.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-circle text-2xl mr-3"></i>
                            <div>
                                <div class="font-bold">Fehler!</div>
                                <div class="text-sm">Produkt konnte nicht hinzugefügt werden</div>
                            </div>
                        </div>
                    \`;
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.remove();
                    }, 3000);
                }
            }

            // Global Search Function
            function performSearch() {
                const searchInput = document.getElementById('global-search');
                const query = searchInput.value.trim();
                
                if (query.length > 0) {
                    window.location.href = \`/produkte?search=\${encodeURIComponent(query)}\`;
                }
            }
            
            // Scroll Animations
            function initScrollAnimations() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                };
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, observerOptions);
                
                // Observe all elements with scroll-fade-in class
                document.querySelectorAll('.scroll-fade-in').forEach(el => {
                    observer.observe(el);
                });
            }
            
            // Initialize scroll animations on page load
            document.addEventListener('DOMContentLoaded', () => {
                initScrollAnimations();
                
                // Newsletter form handler
                const newsletterForm = document.getElementById('newsletter-form');
                if (newsletterForm) {
                    newsletterForm.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        
                        const emailInput = document.getElementById('newsletter-email');
                        const email = emailInput.value.trim();
                        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
                        const originalText = submitBtn.innerHTML;
                        
                        if (!email) return;
                        
                        // Show loading state
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wird verarbeitet...';
                        
                        try {
                            // Simulate API call (replace with actual endpoint later)
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            
                            // Success notification
                            submitBtn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Erfolgreich!';
                            submitBtn.classList.remove('bg-gold', 'hover:bg-gold-light');
                            submitBtn.classList.add('bg-green-500');
                            
                            emailInput.value = '';
                            
                            // Show success message
                            const successMsg = document.createElement('div');
                            successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center space-x-3 animate-slide-in';
                            successMsg.innerHTML = \`
                                <i class="fas fa-check-circle text-2xl"></i>
                                <div>
                                    <div class="font-bold">Vielen Dank!</div>
                                    <div class="text-sm">Sie wurden erfolgreich angemeldet.</div>
                                </div>
                            \`;
                            document.body.appendChild(successMsg);
                            
                            setTimeout(() => {
                                successMsg.remove();
                                submitBtn.innerHTML = originalText;
                                submitBtn.classList.remove('bg-green-500');
                                submitBtn.classList.add('bg-gold', 'hover:bg-gold-light');
                                submitBtn.disabled = false;
                            }, 3000);
                            
                        } catch (error) {
                            console.error('Newsletter error:', error);
                            
                            // Error notification
                            submitBtn.innerHTML = '<i class="fas fa-times-circle mr-2"></i>Fehler';
                            submitBtn.classList.remove('bg-gold');
                            submitBtn.classList.add('bg-red-500');
                            
                            setTimeout(() => {
                                submitBtn.innerHTML = originalText;
                                submitBtn.classList.remove('bg-red-500');
                                submitBtn.classList.add('bg-gold');
                                submitBtn.disabled = false;
                            }, 2000);
                        }
                    });
                }
            });

            // Toggle user dropdown menu
            function toggleUserMenu() {
                const dropdown = document.getElementById('user-dropdown');
                dropdown.classList.toggle('hidden');
            }

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                const userMenu = document.querySelector('[data-user-menu]');
                const dropdown = document.getElementById('user-dropdown');
                if (userMenu && dropdown && !userMenu.contains(e.target)) {
                    dropdown.classList.add('hidden');
                }
            });
        </script>
        
        <!-- Live Chat Widget -->
        <script src="/static/live-chat-widget.js"></script>
        
        <!-- Load Custom JS from Admin Panel -->
        <script>
            // Load and execute custom JavaScript
            fetch('/api/custom-js')
                .then(r => r.json())
                .then(response => {
                    if (response.success && response.data) {
                        response.data.forEach(script => {
                            const scriptEl = document.createElement('script');
                            scriptEl.textContent = script.js_code;
                            
                            // Execute based on execution_type
                            if (script.execution_type === 'immediate') {
                                document.body.appendChild(scriptEl);
                            } else if (script.execution_type === 'domready') {
                                if (document.readyState === 'loading') {
                                    document.addEventListener('DOMContentLoaded', () => {
                                        document.body.appendChild(scriptEl);
                                    });
                                } else {
                                    document.body.appendChild(scriptEl);
                                }
                            } else if (script.execution_type === 'load') {
                                window.addEventListener('load', () => {
                                    document.body.appendChild(scriptEl);
                                });
                            }
                        });
                        console.log('✅ Custom JS loaded:', response.data.length, 'scripts');
                    }
                })
                .catch(err => console.error('Custom JS load error:', err));
        </script>
        
        <script src="/static/cookie-consent.js"></script>
        <script src="/static/promo-popup.js"></script>
        <script src="/static/auth.js"></script>
        
        <!-- Analytics Tracker - Real-time tracking -->
        <script src="/static/analytics-tracker.js"></script>
    </body>
    </html>
  `;
};
