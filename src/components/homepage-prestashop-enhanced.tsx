export const HomepagePrestaShopEnhanced = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Günstige Software Lizenzen kaufen – Original & Sofort verfügbar | SoftwareKing24</title>
        <meta name="description" content="Bei SoftwareKing24.de finden Sie hochwertige digitale Softwarelösungen für Arbeit, Sicherheit und Produktivität – sofort verfügbar und rechtssicher. Windows 11, Microsoft Office 2024, Antivirus-Programme, Server, CAD-Software zu Top-Preisen."/>
        <meta name="keywords" content="Windows 11, Office 2024, Antivirus, Server Lizenzen, CAD Software, ESD Lizenzen, Software kaufen, Microsoft Lizenzen"/>
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
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            /* Color Utilities */
            .bg-navy-dark { background-color: var(--navy-dark); }
            .bg-navy-medium { background-color: var(--navy-medium); }
            .bg-navy-light { background-color: var(--navy-light); }
            .text-navy-dark { color: var(--navy-dark); }
            .text-gold { color: var(--gold); }
            .bg-gold { background-color: var(--gold); }
            .bg-gold-light { background-color: var(--gold-light); }
            .border-gold { border-color: var(--gold); }
            
            /* Animations */
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes pulse-gold {
                0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
                50% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
            }
            
            @keyframes shine {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes scaleIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            @keyframes shimmer {
                0% { background-position: -1000px 0; }
                100% { background-position: 1000px 0; }
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes zoomIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .animate-slideDown { animation: slideDown 0.3s ease-out; }
            .animate-fadeIn { animation: fadeIn 0.5s ease-in; }
            .animate-slideUp { animation: slideUp 0.6s ease-out; }
            .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
            .animate-bounce { animation: bounce 2s ease-in-out infinite; }
            .animate-float { animation: float 3s ease-in-out infinite; }
            .pulse-gold { animation: pulse-gold 2s infinite; }
            
            /* Scroll Animations */
            .scroll-fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .scroll-fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Hover Effects */
            .hover-lift {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .hover-lift:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(212, 175, 55, 0.4);
            }
            
            .hover-scale {
                transition: transform 0.3s ease;
            }
            .hover-scale:hover {
                transform: scale(1.05);
            }
            
            .hover-grow {
                transition: transform 0.3s ease;
            }
            .hover-grow:hover {
                transform: scale(1.1);
            }
            
            /* Image Zoom on Hover */
            .image-zoom-container {
                overflow: hidden;
                position: relative;
            }
            
            .image-zoom {
                transition: transform 0.5s ease;
            }
            
            .image-zoom-container:hover .image-zoom {
                transform: scale(1.15);
            }
            
            /* Glassmorphism */
            .glass-effect {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            /* Shimmer Loading Effect */
            .skeleton-loader {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
            }
            
            /* Gradient Backgrounds */
            .gradient-gold {
                background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
            }
            
            .gradient-navy {
                background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy-medium) 100%);
            }
            
            .gradient-hero {
                background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy-medium) 50%, var(--navy-light) 100%);
            }
            
            /* Mega Menu Styles */
            .mega-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                min-width: 800px;
                background: white;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                z-index: 1000;
                border-top: 3px solid var(--gold);
                border-radius: 0 0 8px 8px;
                padding: 1.5rem;
            }
            
            .mega-menu-trigger {
                position: relative;
            }
            
            .mega-menu-trigger:hover .mega-menu {
                display: block;
                animation: slideDown 0.3s ease-out;
            }
            
            .mega-menu h3 {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .mega-menu ul li a {
                display: block;
                padding: 0.5rem 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            /* Trust Badge */
            .trust-badge {
                display: inline-flex;
                align-items: center;
                padding: 0.5rem 1rem;
                background: white;
                border: 2px solid var(--gold);
                border-radius: 50px;
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--navy-dark);
                transition: all 0.3s ease;
            }
            
            .trust-badge:hover {
                background: var(--gold);
                color: white;
                transform: scale(1.05);
            }
            
            /* Product Card */
            .product-card {
                background: white;
                border-radius: 16px;
                overflow: hidden;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border: 2px solid transparent;
                position: relative;
            }
            
            .product-card:hover {
                border-color: var(--gold);
                box-shadow: 0 20px 50px rgba(212, 175, 55, 0.3);
                transform: translateY(-10px);
            }
            
            .product-card-image {
                position: relative;
                overflow: hidden;
                background: #f8f9fa;
            }
            
            .product-card-image img {
                transition: transform 0.5s ease;
                width: 100%;
                height: auto;
            }
            
            .product-card:hover .product-card-image img {
                transform: scale(1.1);
            }
            
            .product-badge {
                position: absolute;
                top: 12px;
                left: 12px;
                z-index: 10;
            }
            
            .badge-sale {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                padding: 6px 12px;
                border-radius: 8px;
                font-weight: bold;
                font-size: 0.875rem;
                box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);
                animation: pulse-gold 2s infinite;
            }
            
            .badge-new {
                background: linear-gradient(135deg, var(--gold), var(--gold-dark));
                color: var(--navy-dark);
                padding: 6px 12px;
                border-radius: 8px;
                font-weight: bold;
                font-size: 0.875rem;
                box-shadow: 0 4px 10px rgba(212, 175, 55, 0.4);
            }
            
            .badge-bestseller {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 6px 12px;
                border-radius: 8px;
                font-weight: bold;
                font-size: 0.875rem;
                box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);
            }
            
            .wishlist-btn {
                position: absolute;
                top: 12px;
                right: 12px;
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                z-index: 10;
            }
            
            .wishlist-btn:hover {
                background: var(--gold);
                color: white;
                transform: scale(1.1);
            }
            
            .quick-view-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(to top, rgba(26, 42, 78, 0.95), transparent);
                padding: 20px;
                transform: translateY(100%);
                transition: transform 0.3s ease;
            }
            
            .product-card:hover .quick-view-overlay {
                transform: translateY(0);
            }
            
            .product-rating {
                display: flex;
                align-items: center;
                gap: 4px;
                color: var(--gold);
                font-size: 0.875rem;
            }
            
            .price-wrapper {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 12px 0;
            }
            
            .old-price {
                text-decoration: line-through;
                color: #9ca3af;
                font-size: 1rem;
            }
            
            .new-price {
                color: var(--navy-dark);
                font-size: 1.5rem;
                font-weight: bold;
            }
            
            .add-to-cart-btn {
                width: 100%;
                background: var(--navy-dark);
                color: white;
                padding: 12px;
                border-radius: 8px;
                font-weight: bold;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                border: none;
                cursor: pointer;
            }
            
            .add-to-cart-btn:hover {
                background: var(--gold);
                color: var(--navy-dark);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
            }
            
            .stock-indicator {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                font-size: 0.875rem;
                color: #10b981;
                font-weight: 600;
            }
            
            .stock-indicator.low-stock {
                color: #f59e0b;
            }
            
            .stock-indicator.out-of-stock {
                color: #ef4444;
            }
            
            /* Shine Effect */
            .shine-effect {
                position: relative;
                overflow: hidden;
            }
            
            .shine-effect::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 50%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: shine 3s infinite;
            }
            
            /* Testimonial Card */
            .testimonial-card {
                background: white;
                border-left: 4px solid var(--gold);
                padding: 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            
            /* Category Badge */
            .category-badge {
                background: var(--navy-dark);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
                border: 2px solid var(--gold);
            }
            
            /* Responsive Grid */
            .grid-products {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;
            }
            
            /* Product Slider */
            .product-slider {
                display: flex;
                overflow-x: auto;
                scroll-behavior: smooth;
                gap: 1.5rem;
                padding: 1rem 0;
                scrollbar-width: thin;
                scrollbar-color: var(--gold) var(--navy-dark);
            }
            
            .product-slider::-webkit-scrollbar {
                height: 8px;
            }
            
            .product-slider::-webkit-scrollbar-track {
                background: var(--navy-dark);
                border-radius: 4px;
            }
            
            .product-slider::-webkit-scrollbar-thumb {
                background: var(--gold);
                border-radius: 4px;
            }
            
            .product-slider::-webkit-scrollbar-thumb:hover {
                background: var(--gold-light);
            }
            
            .slider-item {
                flex: 0 0 300px;
                scroll-snap-align: start;
            }
            
            .slider-controls {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
                margin-top: 1rem;
            }
            
            .slider-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: var(--navy-dark);
                color: var(--gold);
                border: 2px solid var(--gold);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .slider-btn:hover {
                background: var(--gold);
                color: var(--navy-dark);
                transform: scale(1.1);
            }
            
            /* Review Stars */
            .review-stars {
                color: var(--gold);
                font-size: 1.25rem;
            }
            
            .review-card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                border-left: 4px solid var(--gold);
            }
            
            @media (max-width: 768px) {
                .mega-menu {
                    position: fixed;
                    left: 0;
                    right: 0;
                    max-height: 80vh;
                    overflow-y: auto;
                }
                
                .grid-products {
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 1rem;
                }
            }
        </style>
    </head>
    <body class="bg-gray-50">
        
        <!-- Top Announcement Bar -->
        <div class="bg-gold text-navy-dark py-2 text-center font-bold text-sm">
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
        <header class="bg-white shadow-lg sticky top-0 z-50">
            <div class="w-full px-8 py-3">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <a href="/" class="flex items-center hover-scale">
                        <img src="/static/logo.png" alt="SoftwareKing24 - Original Software Lizenzen" class="h-16" />
                    </a>

                    <!-- Search Bar -->
                    <div class="flex-1 max-w-2xl mx-8">
                        <div class="relative">
                            <input 
                                type="text" 
                                id="global-search"
                                placeholder="Suchen Sie nach Windows, Office, Server, Antivirus..." 
                                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold transition-colors"
                                onkeyup="if(event.key==='Enter') performSearch()"
                            />
                            <button 
                                onclick="performSearch()"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold hover:bg-gold-light text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Header Actions -->
                    <div class="flex items-center space-x-4">
                        <a href="/login" class="flex items-center text-navy-dark hover:text-gold transition-colors">
                            <i class="fas fa-user text-2xl"></i>
                            <div class="ml-2">
                                <div class="text-xs text-gray-600">Anmelden</div>
                                <div class="font-semibold">Mein Konto</div>
                            </div>
                        </a>
                        
                        <a href="/warenkorb" class="relative flex items-center bg-navy-dark hover:bg-navy-medium text-white px-4 py-3 rounded-lg transition-all hover-lift">
                            <i class="fas fa-shopping-cart text-xl"></i>
                            <span class="ml-2 font-semibold">Warenkorb</span>
                            <span class="absolute -top-2 -right-2 bg-gold text-navy-dark w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" id="cart-badge" data-cart-count="0">0</span>
                        </a>
                        
                        <div class="flex items-center space-x-2">
                            <button class="w-8 h-8 rounded-full overflow-hidden border-2 border-gold">
                                <img src="https://flagcdn.com/w40/de.png" alt="Deutsch" class="w-full h-full object-cover" />
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
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fab fa-windows mr-2 text-gold"></i>Windows 11
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows 11 Professional" class="text-gray-700 hover:text-gold transition-colors">Windows 11 Professional</a></li>
                                                <li><a href="/produkte?search=Windows 11 Home" class="text-gray-700 hover:text-gold transition-colors">Windows 11 Home</a></li>
                                                <li><a href="/produkte?search=Windows 11 Enterprise" class="text-gray-700 hover:text-gold transition-colors">Windows 11 Enterprise</a></li>
                                                <li><a href="/produkte?search=Windows 11 Education" class="text-gray-700 hover:text-gold transition-colors">Windows 11 Education</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fab fa-windows mr-2 text-gold"></i>Windows 10
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows 10 Professional" class="text-gray-700 hover:text-gold transition-colors">Windows 10 Professional</a></li>
                                                <li><a href="/produkte?search=Windows 10 Home" class="text-gray-700 hover:text-gold transition-colors">Windows 10 Home</a></li>
                                                <li><a href="/produkte?search=Windows 10 Enterprise" class="text-gray-700 hover:text-gold transition-colors">Windows 10 Enterprise</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-server mr-2 text-gold"></i>Windows Server
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows Server 2025" class="text-gray-700 hover:text-gold transition-colors">Windows Server 2025</a></li>
                                                <li><a href="/produkte?search=Windows Server 2022" class="text-gray-700 hover:text-gold transition-colors">Windows Server 2022</a></li>
                                                <li><a href="/produkte?search=Windows Server 2019" class="text-gray-700 hover:text-gold transition-colors">Windows Server 2019</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-history mr-2 text-gold"></i>Retro Windows
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows 8.1" class="text-gray-700 hover:text-gold transition-colors">Windows 8.1</a></li>
                                                <li><a href="/produkte?search=Windows 7" class="text-gray-700 hover:text-gold transition-colors">Windows 7</a></li>
                                                <li><a href="/produkte?search=Windows Vista" class="text-gray-700 hover:text-gold transition-colors">Windows Vista</a></li>
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
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-star mr-2 text-gold"></i>Office 2024
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Office 2024 Professional Plus" class="text-gray-700 hover:text-gold transition-colors">Professional Plus 2024</a></li>
                                                <li><a href="/produkte?search=Office 2024 Home" class="text-gray-700 hover:text-gold transition-colors">Home & Business 2024</a></li>
                                                <li><a href="/produkte?search=Office 2024 Standard" class="text-gray-700 hover:text-gold transition-colors">Standard 2024</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-box mr-2 text-gold"></i>Office 2021
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Office 2021 Professional Plus" class="text-gray-700 hover:text-gold transition-colors">Professional Plus 2021</a></li>
                                                <li><a href="/produkte?search=Office 2021 Home" class="text-gray-700 hover:text-gold transition-colors">Home & Business 2021</a></li>
                                                <li><a href="/produkte?search=Office 2021 Standard" class="text-gray-700 hover:text-gold transition-colors">Standard 2021</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-cloud mr-2 text-gold"></i>Microsoft 365
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Microsoft 365 Business" class="text-gray-700 hover:text-gold transition-colors">Microsoft 365 Business</a></li>
                                                <li><a href="/produkte?search=Microsoft 365 Family" class="text-gray-700 hover:text-gold transition-colors">Microsoft 365 Family</a></li>
                                                <li><a href="/produkte?search=Microsoft 365 Personal" class="text-gray-700 hover:text-gold transition-colors">Microsoft 365 Personal</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-puzzle-piece mr-2 text-gold"></i>Einzelanwendungen
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Word 2024" class="text-gray-700 hover:text-gold transition-colors">Word 2024</a></li>
                                                <li><a href="/produkte?search=Excel 2024" class="text-gray-700 hover:text-gold transition-colors">Excel 2024</a></li>
                                                <li><a href="/produkte?search=PowerPoint 2024" class="text-gray-700 hover:text-gold transition-colors">PowerPoint 2024</a></li>
                                                <li><a href="/produkte?search=Outlook 2024" class="text-gray-700 hover:text-gold transition-colors">Outlook 2024</a></li>
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
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-server mr-2 text-gold"></i>Windows Server
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows Server 2025 Standard" class="text-gray-700 hover:text-gold transition-colors">Server 2025 Standard</a></li>
                                                <li><a href="/produkte?search=Windows Server 2025 Datacenter" class="text-gray-700 hover:text-gold transition-colors">Server 2025 Datacenter</a></li>
                                                <li><a href="/produkte?search=Windows Server 2022" class="text-gray-700 hover:text-gold transition-colors">Server 2022</a></li>
                                                <li><a href="/produkte?search=Windows Server 2019" class="text-gray-700 hover:text-gold transition-colors">Server 2019</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-database mr-2 text-gold"></i>SQL Server
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=SQL Server 2022 Standard" class="text-gray-700 hover:text-gold transition-colors">SQL Server 2022 Standard</a></li>
                                                <li><a href="/produkte?search=SQL Server 2022 Enterprise" class="text-gray-700 hover:text-gold transition-colors">SQL Server 2022 Enterprise</a></li>
                                                <li><a href="/produkte?search=SQL Server 2019" class="text-gray-700 hover:text-gold transition-colors">SQL Server 2019</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-users mr-2 text-gold"></i>CAL Lizenzen
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Windows Server CAL 2025" class="text-gray-700 hover:text-gold transition-colors">Server CAL 2025</a></li>
                                                <li><a href="/produkte?search=RDS CAL 2025" class="text-gray-700 hover:text-gold transition-colors">RDS CAL 2025</a></li>
                                                <li><a href="/produkte?search=Exchange Server CAL" class="text-gray-700 hover:text-gold transition-colors">Exchange Server CAL</a></li>
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
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-shield-virus mr-2 text-gold"></i>Antivirus Premium
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Kaspersky Total Security" class="text-gray-700 hover:text-gold transition-colors">Kaspersky Total Security</a></li>
                                                <li><a href="/produkte?search=Norton 360 Premium" class="text-gray-700 hover:text-gold transition-colors">Norton 360 Premium</a></li>
                                                <li><a href="/produkte?search=Bitdefender Total Security" class="text-gray-700 hover:text-gold transition-colors">Bitdefender Total Security</a></li>
                                                <li><a href="/produkte?search=ESET Internet Security" class="text-gray-700 hover:text-gold transition-colors">ESET Internet Security</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-building mr-2 text-gold"></i>Business Security
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Kaspersky Endpoint Security" class="text-gray-700 hover:text-gold transition-colors">Kaspersky Endpoint Security</a></li>
                                                <li><a href="/produkte?search=Bitdefender GravityZone" class="text-gray-700 hover:text-gold transition-colors">Bitdefender GravityZone</a></li>
                                                <li><a href="/produkte?search=ESET Endpoint Protection" class="text-gray-700 hover:text-gold transition-colors">ESET Endpoint Protection</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-home mr-2 text-gold"></i>Home Security
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Avast Premium Security" class="text-gray-700 hover:text-gold transition-colors">Avast Premium Security</a></li>
                                                <li><a href="/produkte?search=AVG Internet Security" class="text-gray-700 hover:text-gold transition-colors">AVG Internet Security</a></li>
                                                <li><a href="/produkte?search=McAfee Total Protection" class="text-gray-700 hover:text-gold transition-colors">McAfee Total Protection</a></li>
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
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-paint-brush mr-2 text-gold"></i>Adobe Creative Cloud
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=Adobe Creative Cloud All Apps" class="text-gray-700 hover:text-gold transition-colors">CC All Apps</a></li>
                                                <li><a href="/produkte?search=Adobe Photoshop" class="text-gray-700 hover:text-gold transition-colors">Photoshop</a></li>
                                                <li><a href="/produkte?search=Adobe Illustrator" class="text-gray-700 hover:text-gold transition-colors">Illustrator</a></li>
                                                <li><a href="/produkte?search=Adobe Premiere Pro" class="text-gray-700 hover:text-gold transition-colors">Premiere Pro</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-drafting-compass mr-2 text-gold"></i>Autodesk CAD
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=AutoCAD 2024" class="text-gray-700 hover:text-gold transition-colors">AutoCAD 2024</a></li>
                                                <li><a href="/produkte?search=AutoCAD LT 2024" class="text-gray-700 hover:text-gold transition-colors">AutoCAD LT 2024</a></li>
                                                <li><a href="/produkte?search=Revit 2024" class="text-gray-700 hover:text-gold transition-colors">Revit 2024</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-navy-dark font-bold mb-3 border-b-2 border-gold pb-2">
                                                <i class="fas fa-cube mr-2 text-gold"></i>3D & Design
                                            </h3>
                                            <ul class="space-y-2">
                                                <li><a href="/produkte?search=3ds Max" class="text-gray-700 hover:text-gold transition-colors">3ds Max</a></li>
                                                <li><a href="/produkte?search=Maya" class="text-gray-700 hover:text-gold transition-colors">Maya</a></li>
                                                <li><a href="/produkte?search=SketchUp Pro" class="text-gray-700 hover:text-gold transition-colors">SketchUp Pro</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                        <li><a href="/produkte?tag=angebote" class="px-4 py-4 hover:bg-navy-medium transition-colors block flex items-center"><i class="fas fa-fire mr-2 text-gold"></i>Angebote <span class="bg-gold text-navy-dark px-2 py-1 rounded-full text-xs ml-2 pulse-gold">-70%</span></a></li>
                        <li><a href="/kontakt" class="px-4 py-4 hover:bg-navy-medium transition-colors block"><i class="fas fa-envelope mr-2"></i>Kontakt</a></li>
                    </ul>
                </div>
            </nav>
        </header>

        <!-- Hero Section -->
        <section class="gradient-hero text-white py-24 relative overflow-hidden">
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
                            <span class="bg-gold text-navy-dark px-4 py-2 rounded-full text-sm font-bold inline-flex items-center">
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
                            <a href="/produkte" class="bg-gold hover:bg-gold-light text-navy-dark px-10 py-4 rounded-xl font-bold text-lg transition-all hover-lift inline-flex items-center shadow-2xl">
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
                                    <img src="https://i.pravatar.cc/40?img=1" alt="Customer" class="w-10 h-10 rounded-full border-2 border-white" />
                                    <img src="https://i.pravatar.cc/40?img=2" alt="Customer" class="w-10 h-10 rounded-full border-2 border-white" />
                                    <img src="https://i.pravatar.cc/40?img=3" alt="Customer" class="w-10 h-10 rounded-full border-2 border-white" />
                                    <div class="w-10 h-10 rounded-full border-2 border-white bg-gold text-navy-dark flex items-center justify-center font-bold text-xs">50k+</div>
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
                            <div class="absolute -bottom-6 -right-6 bg-gradient-to-br from-gold to-gold-dark text-navy-dark px-8 py-6 rounded-2xl shadow-2xl font-bold pulse-gold">
                                <div class="text-4xl">Bis zu 70%</div>
                                <div class="text-lg">Günstiger</div>
                            </div>
                        </div>
                        
                        <!-- Floating Stats -->
                        <div class="absolute top-10 -left-6 bg-white text-navy-dark px-6 py-4 rounded-xl shadow-xl animate-float">
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
        <section class="bg-white py-6 shadow-md">
            <div class="w-full px-6">
                <div class="grid grid-cols-5 gap-6 text-center">
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-certificate text-gold text-2xl"></i>
                        </div>
                        <div class="font-bold text-navy-dark">100% Original</div>
                        <div class="text-sm text-gray-600">Echte Lizenzen</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-bolt text-gold text-2xl"></i>
                        </div>
                        <div class="font-bold text-navy-dark">Sofortversand</div>
                        <div class="text-sm text-gray-600">Per E-Mail</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-lock text-gold text-2xl"></i>
                        </div>
                        <div class="font-bold text-navy-dark">SSL-Verschlüsselung</div>
                        <div class="text-sm text-gray-600">Sichere Zahlung</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-headset text-gold text-2xl"></i>
                        </div>
                        <div class="font-bold text-navy-dark">24/7 Support</div>
                        <div class="text-sm text-gray-600">Kundenservice</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-star text-gold text-2xl"></i>
                        </div>
                        <div class="font-bold text-navy-dark">Über 50.000</div>
                        <div class="text-sm text-gray-600">Zufriedene Kunden</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Google & Trustpilot Reviews Section -->
        <section class="py-12 bg-gray-50">
            <div class="w-full px-8">
                <div class="text-center mb-10">
                    <h2 class="text-3xl font-bold text-navy-dark mb-4">
                        <i class="fas fa-star text-gold mr-3"></i>
                        Vertraut von Tausenden zufriedenen Kunden
                    </h2>
                    <p class="text-gray-600 text-lg">Sehen Sie, was unsere Kunden über uns sagen</p>
                </div>
                
                <div class="grid grid-cols-2 gap-8 mb-8">
                    <!-- Google Reviews -->
                    <div class="bg-white rounded-xl shadow-lg p-8 border-2 border-gold">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center">
                                <img src="https://www.google.com/favicon.ico" alt="Google" class="w-12 h-12 mr-4" />
                                <div>
                                    <h3 class="text-2xl font-bold text-navy-dark">Google Bewertungen</h3>
                                    <p class="text-gray-600">Verifizierte Kundenbewertungen</p>
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
                                <p class="text-sm text-gray-600 mt-1">4.523 Bewertungen</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-5 gap-2">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gold">5★</div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-gold h-2 rounded-full" style="width: 92%"></div>
                                </div>
                                <div class="text-xs text-gray-600 mt-1">92%</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gold">4★</div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-gold h-2 rounded-full" style="width: 6%"></div>
                                </div>
                                <div class="text-xs text-gray-600 mt-1">6%</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-400">3★</div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-gray-400 h-2 rounded-full" style="width: 1%"></div>
                                </div>
                                <div class="text-xs text-gray-600 mt-1">1%</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-400">2★</div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-gray-400 h-2 rounded-full" style="width: 0.5%"></div>
                                </div>
                                <div class="text-xs text-gray-600 mt-1">0.5%</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-400">1★</div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-gray-400 h-2 rounded-full" style="width: 0.5%"></div>
                                </div>
                                <div class="text-xs text-gray-600 mt-1">0.5%</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Trustpilot Reviews -->
                    <div class="bg-white rounded-xl shadow-lg p-8 border-2 border-gold">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-star text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold text-navy-dark">Trustpilot</h3>
                                    <p class="text-gray-600">Hervorragend bewertet</p>
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
                                <p class="text-sm text-gray-600 mt-1">3.892 Bewertungen</p>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold">Hervorragend</span>
                                <div class="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                                    <div class="bg-green-600 h-3 rounded-full" style="width: 89%"></div>
                                </div>
                                <span class="text-sm font-bold text-green-600">89%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold">Gut</span>
                                <div class="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                                    <div class="bg-green-500 h-3 rounded-full" style="width: 8%"></div>
                                </div>
                                <span class="text-sm font-bold">8%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold">Durchschnittlich</span>
                                <div class="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                                    <div class="bg-yellow-500 h-3 rounded-full" style="width: 2%"></div>
                                </div>
                                <span class="text-sm font-bold">2%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold">Schlecht</span>
                                <div class="flex-1 mx-4 bg-gray-200 rounded-full h-3">
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
        <section class="py-16 bg-white">
            <div class="w-full px-8">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-navy-dark mb-2">
                            <i class="fas fa-fire text-gold mr-3"></i>
                            Bestseller – Top-Produkte
                        </h2>
                        <p class="text-gray-600">Die meistverkauften Produkte unserer Kunden</p>
                    </div>
                    <a href="/produkte?sort=bestsellers" class="bg-gold hover:bg-gold-light text-navy-dark px-6 py-3 rounded-lg font-bold transition-all hover-lift">
                        Alle Bestseller <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="product-slider" id="bestseller-slider">
                    <!-- Products will be loaded here -->
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
        <section class="py-16 bg-gray-50">
            <div class="w-full px-8">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-navy-dark mb-2">
                            <i class="fas fa-heart text-gold mr-3"></i>
                            Favoriten – Meist gewünscht
                        </h2>
                        <p class="text-gray-600">Die beliebtesten Produkte auf der Wunschliste</p>
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
        <section class="py-16 bg-white">
            <div class="w-full px-8">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-navy-dark mb-2">
                            <i class="fas fa-gamepad text-gold mr-3"></i>
                            Gaming & Spiele
                        </h2>
                        <p class="text-gray-600">Game Keys, Gaming-Software und mehr</p>
                    </div>
                    <a href="/produkte?category=Games" class="bg-gold hover:bg-gold-light text-navy-dark px-6 py-3 rounded-lg font-bold transition-all hover-lift">
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
                            <i class="fas fa-users text-navy-dark text-2xl"></i>
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
                            <i class="fas fa-handshake text-navy-dark text-2xl"></i>
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
                            <i class="fas fa-file-invoice text-navy-dark text-2xl"></i>
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
                    <a href="/kontakt?type=business" class="inline-block bg-gold hover:bg-gold-light text-navy-dark px-10 py-4 rounded-lg font-bold text-lg transition-all hover-lift">
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
        <section class="py-16 bg-gray-50">
            <div class="w-full px-6">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-navy-dark mb-2">
                            <i class="fas fa-fire text-gold mr-3"></i>
                            Flash Sale – Heute bis zu 70% sparen!
                        </h2>
                        <p class="text-gray-600">Unsere besten Angebote – nur für kurze Zeit!</p>
                    </div>
                    <a href="/produkte?tag=angebote" class="bg-gold hover:bg-gold-light text-navy-dark px-6 py-3 rounded-lg font-bold transition-all hover-lift">
                        Alle Angebote <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div id="flash-deals" class="grid-products"></div>
            </div>
        </section>

        <!-- Product Categories Grid -->
        <section class="py-16 bg-white">
            <div class="w-full px-6">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-navy-dark mb-4">
                        <i class="fas fa-th-large text-gold mr-3"></i>
                        Unsere Produktkategorien
                    </h2>
                    <p class="text-gray-600 text-lg">Finden Sie die perfekte Software für Ihre Bedürfnisse</p>
                </div>
                
                <div class="grid grid-cols-3 gap-6 mb-12">
                    <!-- Windows Category -->
                    <a href="/produkte?category=Windows" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fab fa-windows text-navy-dark text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-navy-dark mb-2">Windows</h3>
                        <p class="text-gray-600 mb-4">Windows 11, 10, Server & mehr</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle Windows Produkte →</span>
                    </a>
                    
                    <!-- Office Category -->
                    <a href="/produkte?category=Microsoft Office" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fas fa-file-word text-navy-dark text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-navy-dark mb-2">Microsoft Office</h3>
                        <p class="text-gray-600 mb-4">Office 2024, 2021, Microsoft 365</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle Office Produkte →</span>
                    </a>
                    
                    <!-- Server Category -->
                    <a href="/produkte?category=Server" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fas fa-server text-navy-dark text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-navy-dark mb-2">Server & CAL</h3>
                        <p class="text-gray-600 mb-4">Windows Server, SQL Server, CAL</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle Server Produkte →</span>
                    </a>
                    
                    <!-- Antivirus Category -->
                    <a href="/produkte?category=Antivirus" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fas fa-shield-virus text-navy-dark text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-navy-dark mb-2">Antivirus</h3>
                        <p class="text-gray-600 mb-4">Kaspersky, Norton, Bitdefender</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle Antivirus Produkte →</span>
                    </a>
                    
                    <!-- Adobe Category -->
                    <a href="/produkte?category=Adobe" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fas fa-paint-brush text-navy-dark text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-navy-dark mb-2">Adobe & Design</h3>
                        <p class="text-gray-600 mb-4">Photoshop, Illustrator, Creative Cloud</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle Adobe Produkte →</span>
                    </a>
                    
                    <!-- CAD Category -->
                    <a href="/produkte?category=CAD" class="product-card p-6 text-center group">
                        <div class="w-24 h-24 bg-navy-dark bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:bg-opacity-10 transition-all">
                            <i class="fas fa-drafting-compass text-navy-dark text-5xl group-hover:text-gold transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-navy-dark mb-2">CAD Software</h3>
                        <p class="text-gray-600 mb-4">AutoCAD, Revit, 3ds Max</p>
                        <span class="text-gold font-semibold group-hover:underline">Alle CAD Produkte →</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- Bestsellers -->
        <section class="py-16 bg-gray-50">
            <div class="w-full px-6">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-navy-dark mb-2">
                            <i class="fas fa-star text-gold mr-3"></i>
                            Bestseller – Die beliebtesten Produkte
                        </h2>
                        <p class="text-gray-600">Von unseren Kunden am häufigsten gekauft</p>
                    </div>
                    <a href="/produkte" class="bg-navy-dark hover:bg-navy-medium text-white px-6 py-3 rounded-lg font-bold transition-all hover-lift">
                        Alle Produkte <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div id="bestsellers" class="grid-products"></div>
            </div>
        </section>

        <!-- SEO Content Section: Wer wir sind -->
        <section class="py-16 bg-white">
            <div class="w-full px-6">
                <div class="grid grid-cols-2 gap-12">
                    <div>
                        <h2 class="text-3xl font-bold text-navy-dark mb-6">
                            <i class="fas fa-info-circle text-gold mr-3"></i>
                            Wer wir sind und was wir machen
                        </h2>
                        <div class="prose prose-lg text-gray-700">
                            <p class="mb-4">
                                <strong>SoftwareKing24.de</strong> ist Ihr vertrauenswürdiger Online-Shop für <strong>Original-Softwarelizenzen</strong> 
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
                            <p class="font-semibold text-navy-dark">
                                Alle unsere Lizenzen sind <strong>100% legal</strong>, <strong>sofort einsetzbar</strong> 
                                und werden mit vollständiger <strong>Dokumentation und Rechnung</strong> geliefert.
                            </p>
                        </div>
                    </div>
                    
                    <div>
                        <h2 class="text-3xl font-bold text-navy-dark mb-6">
                            <i class="fas fa-question-circle text-gold mr-3"></i>
                            Warum Software online kaufen?
                        </h2>
                        <div class="prose prose-lg text-gray-700">
                            <p class="mb-4">
                                Der Kauf von Software über das Internet bietet zahlreiche Vorteile gegenüber dem stationären Handel:
                            </p>
                            
                            <div class="bg-navy-dark bg-opacity-5 rounded-lg p-6 mb-4 border-l-4 border-gold">
                                <h3 class="text-xl font-bold text-navy-dark mb-3">
                                    <i class="fas fa-euro-sign text-gold mr-2"></i>
                                    Günstigere Preise
                                </h3>
                                <p>
                                    Online-Shops haben deutlich geringere Betriebskosten als Ladengeschäfte. Diese Ersparnis geben wir direkt an Sie weiter. 
                                    Bei SoftwareKing24.de sparen Sie oft <strong>bis zu 70% gegenüber dem Neupreis</strong>.
                                </p>
                            </div>
                            
                            <div class="bg-navy-dark bg-opacity-5 rounded-lg p-6 mb-4 border-l-4 border-gold">
                                <h3 class="text-xl font-bold text-navy-dark mb-3">
                                    <i class="fas fa-bolt text-gold mr-2"></i>
                                    Sofortige Verfügbarkeit
                                </h3>
                                <p>
                                    Nach Zahlungseingang erhalten Sie Ihre Lizenz <strong>innerhalb von Minuten per E-Mail</strong>. 
                                    Keine Wartezeiten, keine Versandkosten, keine physischen Datenträger – Sie können sofort mit der Installation beginnen.
                                </p>
                            </div>
                            
                            <div class="bg-navy-dark bg-opacity-5 rounded-lg p-6 mb-4 border-l-4 border-gold">
                                <h3 class="text-xl font-bold text-navy-dark mb-3">
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
                            <i class="fas fa-key text-navy-dark text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Digitaler Produktschlüssel</h3>
                        <p class="text-gray-300">
                            Sie erhalten einen <strong>25-stelligen Lizenzkey</strong>, den Sie bei der Installation eingeben. 
                            Dieser aktiviert Ihre Software dauerhaft und rechtskonform.
                        </p>
                    </div>
                    
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover-lift">
                        <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
                            <i class="fas fa-download text-navy-dark text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Download vom Hersteller</h3>
                        <p class="text-gray-300">
                            Die Installationsdateien laden Sie <strong>kostenlos direkt vom Softwarehersteller</strong> (Microsoft, Adobe etc.) herunter. 
                            Wir liefern Ihnen die Download-Links gleich mit.
                        </p>
                    </div>
                    
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover-lift">
                        <div class="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
                            <i class="fas fa-infinity text-navy-dark text-2xl"></i>
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
        <section class="py-16 bg-gray-50">
            <div class="max-w-4xl mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-navy-dark mb-4">
                        <i class="fas fa-question-circle text-gold mr-3"></i>
                        Häufig gestellte Fragen
                    </h2>
                    <p class="text-gray-600">Alles, was Sie über den Kauf von Software bei SoftwareKing24 wissen müssen</p>
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
                            <p class="text-gray-700">
                                Wir akzeptieren alle gängigen Zahlungsmethoden für Ihre Bequemlichkeit:
                            </p>
                            <ul class="list-disc list-inside mt-3 space-y-2 text-gray-700">
                                <li><strong>PayPal</strong> – Schnell, sicher und mit Käuferschutz</li>
                                <li><strong>Kreditkarte</strong> (Visa, Mastercard, American Express)</li>
                                <li><strong>Sofortüberweisung</strong> – Direkte Banküberweisung</li>
                                <li><strong>Klarna</strong> – Kauf auf Rechnung oder Ratenzahlung</li>
                                <li><strong>Giropay</strong> – Sicheres Bezahlverfahren deutscher Banken</li>
                            </ul>
                            <p class="mt-3 text-gray-700">
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
                            <p class="text-gray-700">
                                Unser <strong>deutschsprachiger Support</strong> hilft Ihnen gerne weiter:
                            </p>
                            <ul class="list-disc list-inside mt-3 space-y-2 text-gray-700">
                                <li><strong>E-Mail-Support</strong>: [email protected] (Antwort innerhalb von 24 Stunden)</li>
                                <li><strong>Telefon-Hotline</strong>: +49 (0) 123 456789 (Mo-Fr: 9-18 Uhr)</li>
                                <li><strong>Live-Chat</strong>: Direkte Hilfe über unsere Website</li>
                                <li><strong>Installationsanleitungen</strong>: Ausführliche PDF-Guides für jedes Produkt</li>
                            </ul>
                            <p class="mt-3 text-gray-700">
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
                            <p class="text-gray-700 mb-3">
                                Als <strong>Unternehmen, Behörde oder Bildungseinrichtung</strong> profitieren Sie von zusätzlichen Vorteilen:
                            </p>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-gold bg-opacity-10 rounded-lg p-4 border-l-4 border-gold">
                                    <h4 class="font-bold text-navy-dark mb-2">Mengenrabatte</h4>
                                    <p class="text-gray-700 text-sm">
                                        Sparen Sie zusätzlich bei Sammelbestellungen – ab 10 Lizenzen bis zu 15% Extra-Rabatt
                                    </p>
                                </div>
                                <div class="bg-gold bg-opacity-10 rounded-lg p-4 border-l-4 border-gold">
                                    <h4 class="font-bold text-navy-dark mb-2">Kauf auf Rechnung</h4>
                                    <p class="text-gray-700 text-sm">
                                        Zahlungsziel 30 Tage nach Erhalt der Rechnung für verifizierte Geschäftskunden
                                    </p>
                                </div>
                                <div class="bg-gold bg-opacity-10 rounded-lg p-4 border-l-4 border-gold">
                                    <h4 class="font-bold text-navy-dark mb-2">Volumen-Lizenzierung</h4>
                                    <p class="text-gray-700 text-sm">
                                        Microsoft-Volumenlizenzprogramme (Open, Select, Enterprise Agreement)
                                    </p>
                                </div>
                                <div class="bg-gold bg-opacity-10 rounded-lg p-4 border-l-4 border-gold">
                                    <h4 class="font-bold text-navy-dark mb-2">Persönlicher Ansprechpartner</h4>
                                    <p class="text-gray-700 text-sm">
                                        Ihr fester Ansprechpartner für alle Fragen rund um Ihre Softwarelizenzierung
                                    </p>
                                </div>
                            </div>
                            <p class="mt-4 text-gray-700">
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
                            <p class="text-gray-700 mb-3">
                                <strong>Windows 11</strong> bietet zahlreiche Verbesserungen gegenüber Windows 10:
                            </p>
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div class="flex items-start">
                                    <i class="fas fa-check-circle text-gold text-xl mr-3 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-navy-dark">Moderne Benutzeroberfläche</h4>
                                        <p class="text-gray-700 text-sm">Aufgeräumtes Design mit abgerundeten Ecken und zentrierter Taskleiste</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-check-circle text-gold text-xl mr-3 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-navy-dark">Bessere Performance</h4>
                                        <p class="text-gray-700 text-sm">Schnellerer Start, optimierte Speicherverwaltung, verbesserte Gaming-Leistung</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-check-circle text-gold text-xl mr-3 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-navy-dark">DirectStorage & Auto HDR</h4>
                                        <p class="text-gray-700 text-sm">Deutlich schnellere Ladezeiten und verbesserte Grafik in Spielen</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-check-circle text-gold text-xl mr-3 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-navy-dark">Sicherheitsfeatures</h4>
                                        <p class="text-gray-700 text-sm">TPM 2.0, Secure Boot, Windows Hello, verbesserte Verschlüsselung</p>
                                    </div>
                                </div>
                            </div>
                            <p class="text-gray-700">
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
                            <p class="text-gray-700 mb-4">
                                Die Installation Ihrer gekauften Software ist denkbar einfach:
                            </p>
                            <div class="space-y-4">
                                <div class="flex items-start">
                                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <span class="text-navy-dark font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-navy-dark mb-1">Download der Software</h4>
                                        <p class="text-gray-700">
                                            Klicken Sie auf den Download-Link in Ihrer Bestätigungs-E-Mail und laden Sie die Installationsdatei 
                                            direkt vom Hersteller herunter (z.B. Microsoft, Adobe).
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <span class="text-navy-dark font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-navy-dark mb-1">Installation starten</h4>
                                        <p class="text-gray-700">
                                            Doppelklicken Sie auf die heruntergeladene Datei und folgen Sie dem Installationsassistenten. 
                                            Dieser führt Sie Schritt für Schritt durch den Prozess.
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <span class="text-navy-dark font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-navy-dark mb-1">Lizenzkey eingeben</h4>
                                        <p class="text-gray-700">
                                            Geben Sie bei der Aktivierung den 25-stelligen Produktkey ein, den Sie per E-Mail erhalten haben. 
                                            Die Software wird dadurch dauerhaft freigeschaltet.
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <span class="text-navy-dark font-bold">4</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-navy-dark mb-1">Sofort loslegen</h4>
                                        <p class="text-gray-700">
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
        <section class="py-16 bg-white">
            <div class="w-full px-6">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-navy-dark mb-4">
                        <i class="fas fa-comments text-gold mr-3"></i>
                        Das sagen unsere Kunden
                    </h2>
                    <p class="text-gray-600">Über 50.000 zufriedene Kunden vertrauen auf SoftwareKing24</p>
                </div>
                
                <div class="grid grid-cols-3 gap-6">
                    <div class="testimonial-card">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy-dark font-bold text-xl mr-3">
                                MK
                            </div>
                            <div>
                                <div class="font-bold text-navy-dark">Michael K.</div>
                                <div class="text-sm text-gray-600">Verified Purchase</div>
                            </div>
                        </div>
                        <div class="flex mb-3">
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                        </div>
                        <p class="text-gray-700 italic">
                            "Sehr schnelle Lieferung des Lizenzkeys! Installation von Windows 11 hat einwandfrei geklappt. 
                            Preis-Leistung ist unschlagbar. Gerne wieder!"
                        </p>
                        <div class="text-sm text-gray-500 mt-3">
                            <i class="fas fa-shopping-bag mr-1"></i>Windows 11 Professional
                        </div>
                    </div>
                    
                    <div class="testimonial-card">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy-dark font-bold text-xl mr-3">
                                SB
                            </div>
                            <div>
                                <div class="font-bold text-navy-dark">Sandra B.</div>
                                <div class="text-sm text-gray-600">Verified Purchase</div>
                            </div>
                        </div>
                        <div class="flex mb-3">
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                        </div>
                        <p class="text-gray-700 italic">
                            "Als Geschäftskunde mehrere Office-Lizenzen bestellt. Alles top! Rechnung kam sofort, Keys funktionierten 
                            alle auf Anhieb. Support war auch sehr hilfsbereit."
                        </p>
                        <div class="text-sm text-gray-500 mt-3">
                            <i class="fas fa-shopping-bag mr-1"></i>Office 2024 Professional Plus
                        </div>
                    </div>
                    
                    <div class="testimonial-card">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy-dark font-bold text-xl mr-3">
                                TR
                            </div>
                            <div>
                                <div class="font-bold text-navy-dark">Thomas R.</div>
                                <div class="text-sm text-gray-600">Verified Purchase</div>
                            </div>
                        </div>
                        <div class="flex mb-3">
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                            <i class="fas fa-star text-gold"></i>
                        </div>
                        <p class="text-gray-700 italic">
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
                            <div class="text-navy-dark font-semibold">Basierend auf 8.247 Bewertungen</div>
                            <div class="text-sm text-gray-600">Trustpilot & Google Reviews</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- New Arrivals -->
        <section class="py-16 bg-gray-50">
            <div class="w-full px-6">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold text-navy-dark mb-2">
                            <i class="fas fa-sparkles text-gold mr-3"></i>
                            Neu eingetroffen
                        </h2>
                        <p class="text-gray-600">Die neuesten Produkte in unserem Sortiment</p>
                    </div>
                </div>
                <div id="new-arrivals" class="grid-products"></div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-navy-dark text-white py-12">
            <div class="w-full px-6">
                <div class="grid grid-cols-4 gap-8 mb-8">
                    <div>
                        <img src="/static/logo.png" alt="SoftwareKing24" class="h-12 mb-4" />
                        <p class="text-gray-300 text-sm mb-4">
                            Ihr vertrauenswürdiger Partner für Original-Software zu unschlagbaren Preisen. 
                            Seit über 10 Jahren am Markt.
                        </p>
                        <div class="flex space-x-3">
                            <a href="#" class="w-10 h-10 bg-gold bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-all">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-gold bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-all">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-gold bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-all">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-gold bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-all">
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
                            © 2026 SoftwareKing24.de – Alle Rechte vorbehalten
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
                    console.warn('CartManager not available:', error);
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
                    console.log('🔄 Loading products from homepage sections API...');
                    
                    // Load homepage sections with products
                    const sectionsResponse = await axios.get('/api/homepage-sections?language=de');
                    console.log('📦 Sections response:', sectionsResponse.data);
                    
                    if (sectionsResponse.data.success) {
                        const sections = sectionsResponse.data.data;
                        console.log(\`✅ Found \${sections.length} sections\`);
                        
                        // Find and render each section
                        sections.forEach(section => {
                            console.log(\`🔍 Processing section: \${section.section_key}, products: \${section.products.length}\`);
                            
                            // Map API product format to expected format
                            const mappedProducts = section.products.map(p => ({
                                ...p,
                                price: Math.round((p.base_price || 0) * 100),
                                sale_price: p.discount_price ? Math.round(p.discount_price * 100) : null,
                                description: p.short_description || '',
                                image: p.image_url
                            }));
                            
                            if (section.section_key === 'featured_products' && mappedProducts.length > 0) {
                                console.log(\`✅ Rendering \${mappedProducts.length} products for featured_products (bestsellers)\`);
                                renderBestsellers(mappedProducts.slice(0, 6));
                            } else if (section.section_key === 'new_products' && mappedProducts.length > 0) {
                                console.log(\`✅ Rendering \${mappedProducts.length} products for new_products\`);
                                renderNewArrivals(mappedProducts.slice(0, 4));
                            } else {
                                console.log(\`⚠️ Skipping section: \${section.section_key}\`);
                            }
                        });
                    }
                    
                    // Fallback: Load Flash Deals (lowest prices) - not managed by sections
                    console.log('🔄 Loading flash deals...');
                    const flashResponse = await axios.get('/api/products?limit=4&sort=price-asc');
                    if (flashResponse.data.success) {
                        console.log(\`✅ Rendering \${flashResponse.data.data.length} flash deals\`);
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
                                    <span class="bg-gold text-navy-dark px-3 py-1 rounded-full text-sm font-bold pulse-gold">
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
                                <h3 class="font-bold text-navy-dark text-lg mb-2 hover:text-gold transition-colors cursor-pointer" onclick="window.location.href='/produkt/\${product.slug}'">
                                    \${product.name}
                                </h3>
                                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                                    \${product.description || product.short_description || 'Original Lizenz – Sofort verfügbar'}
                                </p>
                                <div class="flex items-center justify-between mb-4">
                                    <div>
                                        \${hasDiscount ? \`
                                            <div class="text-sm text-gray-500 line-through">€\${originalPriceEur}</div>
                                            <div class="text-2xl font-bold text-gold">€\${priceEur}</div>
                                        \` : \`
                                            <div class="text-2xl font-bold text-navy-dark">€\${priceEur}</div>
                                        \`}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        <i class="fas fa-box mr-1"></i>\${product.stock_quantity || 999}
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button 
                                        onclick="addToCart(\${product.id}, '\${product.name.replace(/'/g, "\\'")}', \${displayPrice})"
                                        class="flex-1 bg-gold hover:bg-gold-light text-navy-dark px-4 py-2 rounded-lg font-bold transition-all hover-lift"
                                    >
                                        <i class="fas fa-cart-plus mr-2"></i>In den Warenkorb
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
                                <span class="absolute top-2 left-2 bg-gold text-navy-dark px-3 py-1 rounded-full text-xs font-bold">
                                    <i class="fas fa-star mr-1"></i>Bestseller
                                </span>
                            </div>
                            <div class="p-4">
                                <span class="category-badge mb-2">\${product.category || 'Software'}</span>
                                <h3 class="font-bold text-navy-dark text-lg mb-2 hover:text-gold transition-colors cursor-pointer" onclick="window.location.href='/produkt/\${product.slug}'">
                                    \${product.name}
                                </h3>
                                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                                    \${product.description || product.short_description || 'Original Lizenz – Sofort verfügbar'}
                                </p>
                                <div class="flex items-center justify-between mb-4">
                                    <div class="text-2xl font-bold text-navy-dark">€\${priceEur}</div>
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
                                        class="flex-1 bg-gold hover:bg-gold-light text-navy-dark px-4 py-2 rounded-lg font-bold transition-all hover-lift"
                                    >
                                        <i class="fas fa-cart-plus mr-2"></i>In den Warenkorb
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
                                <h3 class="font-bold text-navy-dark text-lg mb-2 hover:text-gold transition-colors cursor-pointer" onclick="window.location.href='/produkt/\${product.slug}'">
                                    \${product.name}
                                </h3>
                                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                                    \${product.description || product.short_description || 'Original Lizenz – Sofort verfügbar'}
                                </p>
                                <div class="flex items-center justify-between mb-4">
                                    <div class="text-2xl font-bold text-navy-dark">€\${priceEur}</div>
                                </div>
                                <div class="flex space-x-2">
                                    <button 
                                        onclick="addToCart(\${product.id}, '\${product.name.replace(/'/g, "\\'")}', \${displayPrice})"
                                        class="flex-1 bg-gold hover:bg-gold-light text-navy-dark px-4 py-2 rounded-lg font-bold transition-all hover-lift"
                                    >
                                        <i class="fas fa-cart-plus mr-2"></i>In den Warenkorb
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
                        console.log('Product added to cart:', productId, productName);
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
            });
        </script>
    </body>
    </html>
  `;
};
