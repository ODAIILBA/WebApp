export const HomepageVIPLuxury = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Official Software Licenses – Enterprise-Grade Solutions | SOFTWAREKING24</title>
        <meta name="description" content="Trusted by professionals worldwide. Secure, official Microsoft Windows, Office, Server, and Enterprise software licenses. Instant delivery. Enterprise-grade support."/>
        <meta name="keywords" content="Enterprise software, Microsoft licenses, Windows 11, Office 2024, Server licenses, Official software, Business solutions"/>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
        <link href="/static/search-autocomplete.css" rel="stylesheet" />
        <link href="/static/auth_colors.css" rel="stylesheet" />
        <script src="/static/search-autocomplete.js" defer></script>
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
    <body>
        <!-- Premium Header -->
        <header class="fixed top-0 left-0 right-0 z-50 bg-navy-dark border-b border-gold/20 backdrop-blur-lg">
            <div class="container">
                <div class="flex items-center justify-between h-24">
                    <!-- Logo -->
                    <a href="/" class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
                            <i class="fas fa-crown text-navy-dark text-2xl"></i>
                        </div>
                        <div>
                            <div class="text-xl font-bold text-white">SOFTWAREKING24</div>
                            <div class="text-xs text-gold font-semibold">Enterprise Solutions</div>
                        </div>
                    </a>
                    
                    <!-- Search Bar -->
                    <div class="flex-1 max-w-2xl mx-8">
                        <div class="relative">
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Search for Windows, Office, Server licenses..."
                                class="w-full px-6 py-4 bg-navy-medium text-white rounded-xl border border-gold/30 focus:border-gold focus:outline-none transition-all"
                            />
                            <button class="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-gold text-navy-dark rounded-lg font-semibold hover:scale-105 transition-transform">
                                <i class="fas fa-search"></i>
                            </button>
                            <div id="search-dropdown" class="autocomplete-dropdown"></div>
                        </div>
                    </div>
                    
                    <!-- Header Actions -->
                    <div class="flex items-center space-x-6">
                        <!-- Login Button -->
                        <button onclick="authManager.showLoginModal()" data-auth-button="login" class="flex items-center space-x-2 text-white hover:text-gold transition-colors">
                            <i class="fas fa-user-circle text-2xl"></i>
                            <div class="text-left">
                                <div class="text-xs text-gray-400">Account</div>
                                <div class="font-semibold">Sign In</div>
                            </div>
                        </button>
                        
                        <!-- User Menu -->
                        <div data-user-menu class="relative" style="display: none;">
                            <button onclick="toggleUserMenu()" class="flex items-center space-x-2 text-white hover:text-gold transition-colors">
                                <i class="fas fa-user-circle text-2xl"></i>
                                <div class="text-left">
                                    <div class="text-xs text-gray-400">Welcome</div>
                                    <div class="font-semibold" data-user-name>User</div>
                                </div>
                                <i class="fas fa-chevron-down text-sm"></i>
                            </button>
                            
                            <div id="user-dropdown" class="hidden absolute right-0 mt-4 w-56 bg-navy-dark rounded-xl shadow-2xl py-2 border border-gold/20">
                                <a href="/dashboard" class="block px-6 py-3 text-white hover:bg-navy-medium hover:text-gold transition-colors">
                                    <i class="fas fa-tachometer-alt mr-3"></i> Dashboard
                                </a>
                                <a href="/konto/bestellungen" class="block px-6 py-3 text-white hover:bg-navy-medium hover:text-gold transition-colors">
                                    <i class="fas fa-shopping-bag mr-3"></i> Orders
                                </a>
                                <a href="/konto/lizenzen" class="block px-6 py-3 text-white hover:bg-navy-medium hover:text-gold transition-colors">
                                    <i class="fas fa-key mr-3"></i> Licenses
                                </a>
                                <hr class="my-2 border-gold/20">
                                <button onclick="authManager.logout()" class="block w-full text-left px-6 py-3 text-red-400 hover:bg-navy-medium transition-colors">
                                    <i class="fas fa-sign-out-alt mr-3"></i> Sign Out
                                </button>
                            </div>
                        </div>
                        
                        <!-- Cart Button -->
                        <a href="/warenkorb" class="relative flex items-center space-x-3 bg-gradient-gold text-navy-dark px-6 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                            <i class="fas fa-shopping-cart text-xl"></i>
                            <span>Cart</span>
                            <span class="absolute -top-2 -right-2 w-7 h-7 bg-navy-dark text-gold rounded-full flex items-center justify-center text-xs font-bold animate-pulse-glow" id="cart-badge" data-cart-count="0">0</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Premium Navigation -->
        <nav class="fixed top-24 left-0 right-0 z-40 bg-navy-ultra-dark border-b border-gold/10">
            <div class="container">
                <ul class="flex items-center justify-center space-x-2 text-white font-semibold">
                    <li><a href="/" class="px-6 py-4 hover:bg-navy-dark hover:text-gold transition-all block"><i class="fas fa-home mr-2"></i>Home</a></li>
                    
                    <!-- Windows Mega Menu -->
                    <li class="relative mega-menu-trigger">
                        <a href="/produkte?category=Windows" class="px-6 py-4 hover:bg-navy-dark hover:text-gold transition-all block flex items-center">
                            <i class="fab fa-windows mr-2"></i>Windows
                            <i class="fas fa-chevron-down ml-2 text-xs"></i>
                        </a>
                        <div class="mega-menu">
                            <div class="grid-4">
                                <div>
                                    <h3><i class="fab fa-windows mr-2"></i>Windows 11</h3>
                                    <ul>
                                        <li><a href="/produkte?search=Windows 11 Professional">Professional</a></li>
                                        <li><a href="/produkte?search=Windows 11 Home">Home</a></li>
                                        <li><a href="/produkte?search=Windows 11 Enterprise">Enterprise</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3><i class="fab fa-windows mr-2"></i>Windows 10</h3>
                                    <ul>
                                        <li><a href="/produkte?search=Windows 10 Professional">Professional</a></li>
                                        <li><a href="/produkte?search=Windows 10 Home">Home</a></li>
                                        <li><a href="/produkte?search=Windows 10 Enterprise">Enterprise</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3><i class="fas fa-server mr-2"></i>Windows Server</h3>
                                    <ul>
                                        <li><a href="/produkte?search=Windows Server 2025">Server 2025</a></li>
                                        <li><a href="/produkte?search=Windows Server 2022">Server 2022</a></li>
                                        <li><a href="/produkte?search=Windows Server 2019">Server 2019</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <!-- Microsoft Office Mega Menu -->
                    <li class="relative mega-menu-trigger">
                        <a href="/produkte?category=Microsoft Office" class="px-6 py-4 hover:bg-navy-dark hover:text-gold transition-all block flex items-center">
                            <i class="fas fa-file-word mr-2"></i>Office
                            <i class="fas fa-chevron-down ml-2 text-xs"></i>
                        </a>
                        <div class="mega-menu">
                            <div class="grid-4">
                                <div>
                                    <h3><i class="fas fa-star mr-2"></i>Office 2024</h3>
                                    <ul>
                                        <li><a href="/produkte?search=Office 2024 Professional Plus">Professional Plus</a></li>
                                        <li><a href="/produkte?search=Office 2024 Home">Home & Business</a></li>
                                        <li><a href="/produkte?search=Office 2024 Standard">Standard</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3><i class="fas fa-box mr-2"></i>Office 2021</h3>
                                    <ul>
                                        <li><a href="/produkte?search=Office 2021 Professional Plus">Professional Plus</a></li>
                                        <li><a href="/produkte?search=Office 2021 Home">Home & Business</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3><i class="fas fa-cloud mr-2"></i>Microsoft 365</h3>
                                    <ul>
                                        <li><a href="/produkte?search=Microsoft 365 Business">Business</a></li>
                                        <li><a href="/produkte?search=Microsoft 365 Family">Family</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <!-- Server & CAL Mega Menu -->
                    <li class="relative mega-menu-trigger">
                        <a href="/produkte?category=Server" class="px-6 py-4 hover:bg-navy-dark hover:text-gold transition-all block flex items-center">
                            <i class="fas fa-server mr-2"></i>Server & CAL
                            <i class="fas fa-chevron-down ml-2 text-xs"></i>
                        </a>
                        <div class="mega-menu">
                            <div class="grid-3">
                                <div>
                                    <h3><i class="fas fa-server mr-2"></i>Windows Server</h3>
                                    <ul>
                                        <li><a href="/produkte?search=Windows Server 2025 Standard">Server 2025 Standard</a></li>
                                        <li><a href="/produkte?search=Windows Server 2025 Datacenter">Server 2025 Datacenter</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3><i class="fas fa-database mr-2"></i>SQL Server</h3>
                                    <ul>
                                        <li><a href="/produkte?search=SQL Server 2022 Standard">SQL Server 2022</a></li>
                                        <li><a href="/produkte?search=SQL Server 2019">SQL Server 2019</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3><i class="fas fa-users mr-2"></i>CAL Licenses</h3>
                                    <ul>
                                        <li><a href="/produkte?search=Windows Server CAL 2025">Server CAL 2025</a></li>
                                        <li><a href="/produkte?search=RDS CAL 2025">RDS CAL 2025</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li><a href="/produkte?category=Antivirus" class="px-6 py-4 hover:bg-navy-dark hover:text-gold transition-all block"><i class="fas fa-shield-virus mr-2"></i>Antivirus</a></li>
                    <li><a href="/kontakt" class="px-6 py-4 hover:bg-navy-dark hover:text-gold transition-all block"><i class="fas fa-envelope mr-2"></i>Contact</a></li>
                </ul>
            </div>
        </nav>
        
        <!-- Spacer for Fixed Header -->
        <div class="h-40"></div>
        
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-background">
                <img src="https://www.genspark.ai/api/files/s/H9pGLH3d" alt="Premium Technology Background" />
            </div>
            <div class="hero-overlay"></div>
            
            <div class="hero-content container">
                <div class="max-w-4xl">
                    <!-- Trust Badges -->
                    <div class="flex flex-wrap gap-4 mb-8 animate-fadeInDown">
                        <span class="trust-badge">
                            <i class="fas fa-shield-check"></i>
                            Verified Official Partner
                        </span>
                        <span class="trust-badge">
                            <i class="fas fa-bolt"></i>
                            Instant Digital Delivery
                        </span>
                        <span class="trust-badge">
                            <i class="fas fa-star"></i>
                            Enterprise-Grade Support
                        </span>
                    </div>
                    
                    <!-- Hero Headline -->
                    <h1 class="text-white mb-6 animate-fadeInUp" style="animation-delay: 0.2s;">
                        Official Software Licenses<br/>
                        <span class="text-gold">Trusted by Professionals</span>
                    </h1>
                    
                    <!-- Hero Subheadline -->
                    <p class="text-2xl text-gray-300 mb-10 max-w-3xl animate-fadeInUp" style="animation-delay: 0.4s;">
                        Secure, authentic Microsoft Windows, Office, Server, and Enterprise solutions. 
                        Delivered instantly to your inbox with lifetime support.
                    </p>
                    
                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap gap-6 animate-fadeInUp" style="animation-delay: 0.6s;">
                        <a href="/produkte" class="btn-primary">
                            <span>Explore Solutions</span>
                            <i class="fas fa-arrow-right ml-3"></i>
                        </a>
                        <a href="/kontakt" class="btn-secondary">
                            <i class="fas fa-comments mr-3"></i>
                            <span>Enterprise Inquiry</span>
                        </a>
                    </div>
                    
                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-8 mt-16 animate-fadeInUp" style="animation-delay: 0.8s;">
                        <div>
                            <div class="text-5xl font-bold text-gold mb-2">15K+</div>
                            <div class="text-gray-400">Satisfied Customers</div>
                        </div>
                        <div>
                            <div class="text-5xl font-bold text-gold mb-2">99.8%</div>
                            <div class="text-gray-400">Customer Satisfaction</div>
                        </div>
                        <div>
                            <div class="text-5xl font-bold text-gold mb-2">24/7</div>
                            <div class="text-gray-400">Professional Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Trust & Authority Section -->
        <section class="section bg-navy-dark">
            <div class="container">
                <div class="text-center mb-16">
                    <h2 class="text-white mb-6 scroll-reveal">Your Trusted Software Provider</h2>
                    <p class="text-xl text-gray-400 max-w-3xl mx-auto scroll-reveal">
                        We provide only official, fully-licensed software from Microsoft and leading technology vendors. 
                        Every license is authentic, secure, and backed by our enterprise-grade guarantee.
                    </p>
                </div>
                
                <div class="grid-2 items-center">
                    <div class="scroll-reveal">
                        <img src="https://www.genspark.ai/api/files/s/vYLQwNs1" alt="Enterprise Security" class="rounded-2xl shadow-2xl" />
                    </div>
                    
                    <div class="space-y-6 scroll-reveal">
                        <div class="premium-card">
                            <div class="icon-box">
                                <i class="fas fa-certificate"></i>
                            </div>
                            <h3 class="text-white mb-4">Official Licensed Partner</h3>
                            <p class="text-gray-400 leading-relaxed">
                                Authorized Microsoft partner with direct access to official software licenses. 
                                Every product is genuine and fully compliant with legal standards.
                            </p>
                        </div>
                        
                        <div class="premium-card">
                            <div class="icon-box">
                                <i class="fas fa-lock"></i>
                            </div>
                            <h3 class="text-white mb-4">Bank-Level Security</h3>
                            <p class="text-gray-400 leading-relaxed">
                                Your transactions are protected with 256-bit SSL encryption and PCI DSS compliance. 
                                We never store sensitive payment information.
                            </p>
                        </div>
                        
                        <div class="premium-card">
                            <div class="icon-box">
                                <i class="fas fa-bolt"></i>
                            </div>
                            <h3 class="text-white mb-4">Instant Digital Delivery</h3>
                            <p class="text-gray-400 leading-relaxed">
                                Receive your license keys immediately via email after purchase. 
                                No waiting, no shipping delays—start using your software in minutes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Product Categories Section -->
        <section class="section bg-navy-ultra-dark">
            <div class="container">
                <div class="text-center mb-16">
                    <h2 class="text-white mb-6 scroll-reveal">Premium Software Solutions</h2>
                    <p class="text-xl text-gray-400 max-w-3xl mx-auto scroll-reveal">
                        Professional software licenses for businesses and individuals. 
                        Choose from our curated collection of industry-leading solutions.
                    </p>
                </div>
                
                <div class="grid-4">
                    <!-- Windows Category -->
                    <a href="/produkte?category=Windows" class="category-card scroll-reveal">
                        <img src="https://www.genspark.ai/api/files/s/vf3QfjBe" alt="Windows" class="category-card-image" />
                        <div class="category-card-overlay">
                            <div class="text-5xl mb-4">
                                <i class="fab fa-windows"></i>
                            </div>
                            <h3 class="text-white font-bold mb-2">Windows</h3>
                            <p class="text-white/80 text-sm">Official OS Licenses</p>
                        </div>
                    </a>
                    
                    <!-- Microsoft Office Category -->
                    <a href="/produkte?category=Microsoft Office" class="category-card scroll-reveal">
                        <img src="https://www.genspark.ai/api/files/s/hTn1fthg" alt="Microsoft Office" class="category-card-image" />
                        <div class="category-card-overlay">
                            <div class="text-5xl mb-4">
                                <i class="fas fa-file-word"></i>
                            </div>
                            <h3 class="text-white font-bold mb-2">Microsoft Office</h3>
                            <p class="text-white/80 text-sm">Productivity Suites</p>
                        </div>
                    </a>
                    
                    <!-- Server Category -->
                    <a href="/produkte?category=Server" class="category-card scroll-reveal">
                        <img src="https://www.genspark.ai/api/files/s/y8gcXlcg" alt="Server" class="category-card-image" />
                        <div class="category-card-overlay">
                            <div class="text-5xl mb-4">
                                <i class="fas fa-server"></i>
                            </div>
                            <h3 class="text-white font-bold mb-2">Server Solutions</h3>
                            <p class="text-white/80 text-sm">Enterprise Infrastructure</p>
                        </div>
                    </a>
                    
                    <!-- Bundles Category -->
                    <a href="/produkte?category=Bundles" class="category-card scroll-reveal">
                        <img src="https://www.genspark.ai/api/files/s/ENwSS7t8" alt="Bundles" class="category-card-image" />
                        <div class="category-card-overlay">
                            <div class="text-5xl mb-4">
                                <i class="fas fa-box-open"></i>
                            </div>
                            <h3 class="text-white font-bold mb-2">Software Bundles</h3>
                            <p class="text-white/80 text-sm">Complete Packages</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
        
        <!-- Why Choose Us Section -->
        <section class="section bg-navy-dark">
            <div class="container">
                <div class="text-center mb-16">
                    <h2 class="text-white mb-6 scroll-reveal">Why Professionals Choose Us</h2>
                    <p class="text-xl text-gray-400 max-w-3xl mx-auto scroll-reveal">
                        Experience the difference of working with a dedicated enterprise software provider.
                    </p>
                </div>
                
                <div class="grid-3">
                    <div class="premium-card text-center scroll-reveal">
                        <div class="icon-box mx-auto">
                            <i class="fas fa-award"></i>
                        </div>
                        <h3 class="text-white mb-4">Lifetime Validity</h3>
                        <p class="text-gray-400">
                            All licenses are perpetual and never expire. 
                            Use your software for as long as you need without recurring fees.
                        </p>
                    </div>
                    
                    <div class="premium-card text-center scroll-reveal">
                        <div class="icon-box mx-auto">
                            <i class="fas fa-headset"></i>
                        </div>
                        <h3 class="text-white mb-4">Expert Support</h3>
                        <p class="text-gray-400">
                            Our certified technicians are available 24/7 to assist with installation, 
                            activation, and any technical questions.
                        </p>
                    </div>
                    
                    <div class="premium-card text-center scroll-reveal">
                        <div class="icon-box mx-auto">
                            <i class="fas fa-sync"></i>
                        </div>
                        <h3 class="text-white mb-4">Free Replacement</h3>
                        <p class="text-gray-400">
                            If any license becomes invalid, we'll replace it immediately at no cost. 
                            Your satisfaction is our guarantee.
                        </p>
                    </div>
                    
                    <div class="premium-card text-center scroll-reveal">
                        <div class="icon-box mx-auto">
                            <i class="fas fa-file-invoice"></i>
                        </div>
                        <h3 class="text-white mb-4">VAT Invoices</h3>
                        <p class="text-gray-400">
                            Receive official invoices for all purchases, 
                            suitable for business expense reporting and tax deduction.
                        </p>
                    </div>
                    
                    <div class="premium-card text-center scroll-reveal">
                        <div class="icon-box mx-auto">
                            <i class="fas fa-shield-check"></i>
                        </div>
                        <h3 class="text-white mb-4">Money-Back Guarantee</h3>
                        <p class="text-gray-400">
                            Not satisfied? Get a full refund within 30 days, 
                            no questions asked. We stand behind every product.
                        </p>
                    </div>
                    
                    <div class="premium-card text-center scroll-reveal">
                        <div class="icon-box mx-auto">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3 class="text-white mb-4">Volume Licensing</h3>
                        <p class="text-gray-400">
                            Special pricing for businesses purchasing multiple licenses. 
                            Contact us for custom enterprise solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- VIP Guarantee Section -->
        <section class="section bg-navy-ultra-dark">
            <div class="container">
                <div class="grid-2 items-center gap-16">
                    <div class="scroll-reveal">
                        <img src="https://www.genspark.ai/api/files/s/GFOIRxDk" alt="Trust & Security" class="rounded-2xl shadow-2xl" />
                    </div>
                    
                    <div class="scroll-reveal">
                        <div class="inline-block px-6 py-2 bg-gold/10 border border-gold rounded-full text-gold font-semibold text-sm mb-6">
                            VIP GUARANTEE
                        </div>
                        
                        <h2 class="text-white mb-6">Your Purchase is Protected</h2>
                        
                        <p class="text-xl text-gray-400 mb-8 leading-relaxed">
                            Every transaction is secured with enterprise-grade encryption and backed by our 
                            comprehensive satisfaction guarantee. We're committed to delivering exceptional 
                            value and professional service at every step.
                        </p>
                        
                        <div class="space-y-4">
                            <div class="flex items-start space-x-4">
                                <div class="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-gold text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-semibold mb-2">Authentic Licenses Only</h4>
                                    <p class="text-gray-400">100% genuine Microsoft and verified vendor licenses</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-gold text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-semibold mb-2">Secure Payment Processing</h4>
                                    <p class="text-gray-400">PCI DSS compliant with SSL encryption</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-gold text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-semibold mb-2">Immediate Activation</h4>
                                    <p class="text-gray-400">License keys delivered to your email instantly</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-gold text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-semibold mb-2">Lifetime Support Included</h4>
                                    <p class="text-gray-400">Expert technical assistance whenever you need it</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-10">
                            <a href="/produkte" class="btn-primary">
                                <span>Browse Our Catalog</span>
                                <i class="fas fa-arrow-right ml-3"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- CTA Section -->
        <section class="section-sm gradient-luxury">
            <div class="container text-center">
                <div class="max-w-3xl mx-auto">
                    <h2 class="text-white mb-6 scroll-reveal">Ready to Get Started?</h2>
                    <p class="text-xl text-gray-300 mb-10 scroll-reveal">
                        Join thousands of satisfied customers who trust SOFTWAREKING24 for their software needs.
                    </p>
                    <div class="flex justify-center gap-6 scroll-reveal">
                        <a href="/produkte" class="btn-primary">
                            <span>View All Products</span>
                            <i class="fas fa-arrow-right ml-3"></i>
                        </a>
                        <a href="/kontakt" class="btn-secondary">
                            <i class="fas fa-phone mr-3"></i>
                            <span>Contact Sales</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Premium Footer -->
        <footer class="bg-navy-dark border-t border-gold/20 pt-16 pb-8">
            <div class="container">
                <div class="grid-4 mb-12">
                    <!-- Company Info -->
                    <div>
                        <div class="flex items-center space-x-3 mb-6">
                            <div class="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
                                <i class="fas fa-crown text-navy-dark text-xl"></i>
                            </div>
                            <div>
                                <div class="text-lg font-bold text-white">SOFTWAREKING24</div>
                                <div class="text-xs text-gold">Enterprise Solutions</div>
                            </div>
                        </div>
                        <p class="text-gray-400 text-sm leading-relaxed mb-6">
                            Your trusted provider of official software licenses. 
                            Serving professionals and businesses worldwide.
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="w-10 h-10 bg-navy-medium hover:bg-gold rounded-lg flex items-center justify-center text-white hover:text-navy-dark transition-all">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-navy-medium hover:bg-gold rounded-lg flex items-center justify-center text-white hover:text-navy-dark transition-all">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-navy-medium hover:bg-gold rounded-lg flex items-center justify-center text-white hover:text-navy-dark transition-all">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Products -->
                    <div>
                        <h4 class="text-white font-bold mb-6">Products</h4>
                        <ul class="space-y-3">
                            <li><a href="/produkte?category=Windows" class="text-gray-400 hover:text-gold transition-colors">Windows Licenses</a></li>
                            <li><a href="/produkte?category=Microsoft Office" class="text-gray-400 hover:text-gold transition-colors">Microsoft Office</a></li>
                            <li><a href="/produkte?category=Server" class="text-gray-400 hover:text-gold transition-colors">Server Solutions</a></li>
                            <li><a href="/produkte?category=Antivirus" class="text-gray-400 hover:text-gold transition-colors">Antivirus Software</a></li>
                        </ul>
                    </div>
                    
                    <!-- Company -->
                    <div>
                        <h4 class="text-white font-bold mb-6">Company</h4>
                        <ul class="space-y-3">
                            <li><a href="/page/ueber-uns" class="text-gray-400 hover:text-gold transition-colors">About Us</a></li>
                            <li><a href="/kontakt" class="text-gray-400 hover:text-gold transition-colors">Contact</a></li>
                            <li><a href="/page/faq" class="text-gray-400 hover:text-gold transition-colors">FAQ</a></li>
                            <li><a href="/page/datenschutz" class="text-gray-400 hover:text-gold transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                    
                    <!-- Support -->
                    <div>
                        <h4 class="text-white font-bold mb-6">Support</h4>
                        <ul class="space-y-3">
                            <li class="text-gray-400"><i class="fas fa-envelope text-gold mr-3"></i>support@softwareking24.de</li>
                            <li class="text-gray-400"><i class="fas fa-phone text-gold mr-3"></i>+49 123 456 789</li>
                            <li class="text-gray-400"><i class="fas fa-clock text-gold mr-3"></i>24/7 Support</li>
                        </ul>
                    </div>
                </div>
                
                <div class="divider my-8"></div>
                
                <div class="flex flex-wrap items-center justify-between text-sm text-gray-400">
                    <p>&copy; 2025 SOFTWAREKING24. All rights reserved.</p>
                    <div class="flex space-x-6">
                        <a href="/page/agb" class="hover:text-gold transition-colors">Terms & Conditions</a>
                        <a href="/page/impressum" class="hover:text-gold transition-colors">Imprint</a>
                        <a href="/page/datenschutz" class="hover:text-gold transition-colors">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
        
        <!-- Scroll Reveal Script -->
        <script>
            // Scroll reveal animation
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
            
            document.querySelectorAll('.scroll-reveal').forEach(el => {
                observer.observe(el);
            });
            
            // User menu toggle
            function toggleUserMenu() {
                const dropdown = document.getElementById('user-dropdown');
                dropdown.classList.toggle('hidden');
            }
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                const userMenu = document.querySelector('[data-user-menu]');
                if (userMenu && !userMenu.contains(e.target)) {
                    document.getElementById('user-dropdown').classList.add('hidden');
                }
            });
        </script>
    </body>
    </html>
  `
}
