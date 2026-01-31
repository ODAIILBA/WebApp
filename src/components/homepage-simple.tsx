// Simplified Homepage Component - No nested template literals
// Uses external section-renderers.js file for all dynamic rendering

export function HomepageSimple() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Software Lizenzen kaufen – Original & Sofort verfügbar | SOFTWAREKING24</title>
    <meta name="description" content="Günstige Software Lizenzen kaufen bei SOFTWAREKING24. Original Windows, Office, Antivirus & mehr. Sofort per E-Mail. Sichere Bezahlung. Top Support. ✓"/>
    <meta name="keywords" content="software lizenzen kaufen, windows 11, office 2024, esd lizenzen, microsoft lizenzen, server software, antivirus, original software"/>
    
    <!-- External Assets -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    
    <!-- Local Assets -->
    <script src="/static/cart-manager-enhanced.js"></script>
    <link href="/static/search-autocomplete.css" rel="stylesheet">
    <script src="/static/search-autocomplete.js"></script>
    <script src="/static/section-renderers.js?v=3"></script>
    
    <style>
        :root {
            --navy: #001f3f;
            --navy-medium: #003366;
            --navy-light: #003d7a;
            --gold: #FFC107;
            --white: #ffffff;
            --light-gray: #f8f9fa;
            --border: #e0e0e0;
            --text: #333;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            color: var(--text);
            line-height: 1.6;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* ========================================
           PROFESSIONAL ENTERPRISE HEADER SYSTEM
           ======================================== */
        
        /* Utility Bar (Top Bar) - Enterprise Grade */
        .top-bar {
            background: #000814;
            color: white;
            border-bottom: 1px solid rgba(255,193,7,0.2);
            font-size: 0.8rem;
            position: relative;
            z-index: 1002;
        }
        
        .top-bar-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .top-bar-left {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .top-bar-right {
            display: flex;
            align-items: center;
            gap: 18px;
        }
        
        .top-bar-link {
            color: rgba(255,255,255,0.85);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            transition: all 0.3s;
            font-weight: 500;
            padding: 4px 8px;
            border-radius: 4px;
        }
        
        .top-bar-link:hover {
            color: var(--gold);
            background: rgba(255,193,7,0.08);
        }
        
        .top-bar-link i {
            font-size: 0.85rem;
        }
        
        /* Language Selector */
        .lang-selector {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: rgba(255,255,255,0.85);
            cursor: pointer;
            padding: 4px 10px;
            border-radius: 4px;
            transition: all 0.3s;
            font-weight: 500;
        }
        
        .lang-selector:hover {
            color: var(--gold);
            background: rgba(255,193,7,0.08);
        }
        
        .lang-selector img {
            width: 18px;
            height: 13px;
            border-radius: 2px;
        }
        
        .trust-badges {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .trust-badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.75rem;
            color: rgba(255,255,255,0.7);
            padding: 4px 8px;
            border-radius: 4px;
            transition: all 0.3s;
        }
        
        .trust-badge:hover {
            color: rgba(255,255,255,0.95);
            background: rgba(255,193,7,0.05);
        }
        
        .trust-badge i {
            color: var(--gold);
            font-size: 0.95rem;
        }
        
        /* Top Bar Icons */
        .top-bar-icon-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 4px;
            color: rgba(255,255,255,0.85);
            text-decoration: none;
            transition: all 0.3s;
            position: relative;
        }
        
        .top-bar-icon-btn:hover {
            background: rgba(255,193,7,0.1);
            color: var(--gold);
        }
        
        .top-bar-icon-btn i {
            font-size: 1.1rem;
        }
        
        .icon-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            background: var(--gold);
            color: #000814;
            font-size: 0.65rem;
            font-weight: 700;
            padding: 2px 5px;
            border-radius: 10px;
            min-width: 16px;
            text-align: center;
        }
        
        /* Main Header - Professional Layout */
        .header {
            background: linear-gradient(135deg, #001f3f 0%, #002a54 100%);
            box-shadow: 0 4px 20px rgba(0,0,0,0.25);
            position: sticky;
            top: 0;
            z-index: 1001;
            color: white;
            border-bottom: 2px solid rgba(255,193,7,0.15);
        }
        
        .header-content {
            display: grid;
            grid-template-columns: 200px 1fr auto;
            align-items: center;
            padding: 18px 0;
            gap: 50px;
        }
        
        .logo {
            display: flex;
            align-items: center;
            text-decoration: none;
            transition: all 0.3s;
        }
        
        .logo:hover {
            opacity: 0.9;
            transform: scale(1.02);
        }
        
        /* Professional Search Bar */
        .search-bar {
            display: flex;
            max-width: 600px;
            width: 100%;
            position: relative;
        }
        
        .search-input {
            flex: 1;
            padding: 16px 50px 16px 24px;
            border: 2px solid rgba(255,193,7,0.2);
            border-radius: 8px;
            font-size: 0.95rem;
            background: rgba(255,255,255,0.98);
            transition: all 0.3s;
            outline: none;
        }
        
        .search-input:focus {
            border-color: var(--gold);
            box-shadow: 0 0 0 4px rgba(255,193,7,0.1);
            background: white;
        }
        
        .search-btn {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            padding: 10px 16px;
            background: var(--gold);
            color: #001933;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 700;
            transition: all 0.3s;
        }
        
        .search-btn:hover {
            background: #FFD54F;
            transform: translateY(-50%) scale(1.05);
        }
        
        /* Header Actions - Professional Icons */
        .header-actions {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .header-icon-btn {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px 12px;
            color: white;
            text-decoration: none;
            transition: all 0.3s;
            border-radius: 6px;
            font-size: 0.8rem;
        }
        
        .header-icon-btn:hover {
            background: rgba(255,193,7,0.1);
            color: var(--gold);
        }
        
        .header-icon-btn i {
            font-size: 1.4rem;
        }
        
        .cart-btn {
            padding: 12px 24px;
            background: var(--gold);
            color: #001933;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s;
            box-shadow: 0 2px 8px rgba(255,193,7,0.3);
        }
        
        .cart-btn:hover {
            background: #FFD54F;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255,193,7,0.4);
        }
        
        .cart-count {
            background: #001933;
            color: var(--gold);
            border-radius: 50%;
            padding: 4px 10px;
            font-size: 0.85rem;
            font-weight: 800;
            min-width: 26px;
            text-align: center;
        }
        
        /* Professional Mega Menu Navigation */
        .navigation {
            background: linear-gradient(135deg, #001428 0%, #001d38 100%);
            border-bottom: 3px solid rgba(255,193,7,0.25);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            position: relative;
            z-index: 1000;
        }
        
        .nav-container {
            display: flex;
            justify-content: center;
            position: relative;
        }
        
        #main-navigation {
            display: flex;
            list-style: none;
            gap: 0;
            margin: 0;
            padding: 0;
        }
        
        #main-navigation > li {
            position: relative;
        }
        
        #main-navigation > li > a {
            color: rgba(255,255,255,0.92);
            text-decoration: none;
            padding: 18px 26px;
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 600;
            transition: all 0.3s;
            border-bottom: 3px solid transparent;
            font-size: 0.95rem;
            letter-spacing: 0.3px;
            white-space: nowrap;
        }
        
        #main-navigation > li > a:hover,
        #main-navigation > li.active > a {
            background: linear-gradient(180deg, rgba(255,193,7,0.15) 0%, rgba(255,193,7,0.08) 100%);
            color: var(--gold);
            border-bottom-color: var(--gold);
        }
        
        #main-navigation > li > a i {
            font-size: 0.8rem;
            opacity: 0.7;
            transition: all 0.3s;
        }
        
        #main-navigation > li:hover > a i {
            opacity: 1;
            transform: rotate(180deg);
        }
        
        /* Mega Menu Dropdown */
        .mega-menu {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            min-width: 800px;
            max-width: 1100px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            border-radius: 0 0 8px 8px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            margin-top: -3px;
            border-top: 3px solid var(--gold);
            z-index: 999;
        }
        
        #main-navigation > li:hover .mega-menu {
            opacity: 1;
            visibility: visible;
            margin-top: 0;
        }
        
        .mega-menu-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            padding: 35px;
        }
        
        .mega-menu-column h4 {
            color: var(--navy);
            font-size: 0.95rem;
            font-weight: 700;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--gold);
            letter-spacing: 0.3px;
        }
        
        .mega-menu-column ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .mega-menu-column li {
            margin-bottom: 8px;
        }
        
        .mega-menu-column a {
            color: #555;
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 0;
        }
        
        .mega-menu-column a:hover {
            color: var(--navy);
            padding-left: 8px;
        }
        
        .mega-menu-column a i {
            color: var(--gold);
            font-size: 0.75rem;
        }
        
        /* Simple Dropdown (for items without mega-menu) */
        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            min-width: 220px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            border-radius: 0 0 6px 6px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            margin-top: -3px;
            border-top: 3px solid var(--gold);
            z-index: 999;
        }
        
        #main-navigation > li:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
            margin-top: 0;
        }
        
        .dropdown-menu a {
            color: #555;
            text-decoration: none;
            padding: 12px 20px;
            display: block;
            font-size: 0.9rem;
            transition: all 0.3s;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .dropdown-menu a:last-child {
            border-bottom: none;
        }
        
        .dropdown-menu a:hover {
            background: var(--light-gray);
            color: var(--navy);
            padding-left: 28px;
        }
        
        /* Dynamic Sections Container */
        #dynamic-sections {
            min-height: 400px;
            background: #f8f9fa;
        }
        
        /* Section General Styles */
        section {
            transition: all 0.3s;
        }
        
        /* Container */
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Buttons */
        .btn-primary {
            background: var(--gold);
            color: #001933;
            padding: 14px 32px;
            border-radius: 30px;
            border: none;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 2px 8px rgba(255,193,7,0.3);
            text-decoration: none;
            display: inline-block;
        }
        
        .btn-primary:hover {
            background: #FFD54F;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255,193,7,0.4);
        }
        
        .btn-secondary {
            background: #001933;
            color: white;
            padding: 14px 32px;
            border-radius: 30px;
            border: 2px solid rgba(255,193,7,0.3);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn-secondary:hover {
            background: #002244;
            border-color: var(--gold);
            color: var(--gold);
            transform: translateY(-2px);
        }
        
        /* Footer */
        .footer {
            background: #002244;
            color: white;
            padding: 60px 0 0;
            margin-top: 60px;
        }
        
        .footer-top {
            background: #001933;
            padding: 40px 0;
            text-align: center;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 60px;
            margin-bottom: 40px;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            padding: 0 20px;
        }
        
        .footer-content > div {
            text-align: left;
        }
        
        .footer h3 {
            color: white;
            margin-bottom: 20px;
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .footer ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .footer ul li {
            margin-bottom: 12px;
        }
        
        .footer a {
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            display: block;
            font-size: 0.95rem;
            transition: all 0.3s;
        }
        
        .footer a:hover {
            color: var(--gold);
            padding-left: 5px;
        }
        
        .footer-bottom {
            background: #001122;
            padding: 30px 20px;
            text-align: center;
            font-size: 0.85rem;
        }
        
        .footer-badge {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: white;
            color: #002244;
            padding: 20px;
            border-radius: 8px;
            min-width: 100px;
            min-height: 100px;
            margin: 10px;
            text-align: center;
            font-size: 0.75rem;
            font-weight: 600;
            line-height: 1.3;
        }
        
        .footer-badge i {
            font-size: 2rem;
            margin-bottom: 8px;
            color: #002244;
        }
        
        /* Shimmer animation for loading skeletons */
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        
        /* Slide in/out animations for notifications */
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        
        /* ========================================
           RESPONSIVE DESIGN - MOBILE FIRST
           ======================================== */
        
        @media (max-width: 1200px) {
            .header-content {
                grid-template-columns: auto 1fr auto;
                gap: 30px;
            }
            
            .mega-menu {
                min-width: 700px;
            }
            
            .mega-menu-content {
                grid-template-columns: repeat(2, 1fr);
                gap: 25px;
            }
        }
        
        @media (max-width: 992px) {
            .top-bar-content {
                justify-content: center;
            }
            
            .top-bar-left,
            .top-bar-right {
                justify-content: center;
            }
            
            .trust-badges {
                display: none;
            }
            
            .header-content {
                grid-template-columns: 1fr;
                gap: 15px;
                text-align: center;
            }
            
            .logo {
                justify-content: center;
            }
            
            .search-bar {
                max-width: 100%;
            }
            
            .header-actions {
                justify-content: center;
            }
            
            .navigation {
                overflow-x: auto;
            }
            
            #main-navigation {
                justify-content: flex-start;
                padding: 0 20px;
            }
            
            #main-navigation > li > a {
                padding: 16px 20px;
                font-size: 0.9rem;
            }
            
            .mega-menu,
            .dropdown-menu {
                position: fixed;
                left: 0;
                right: 0;
                top: auto;
                transform: none;
                min-width: auto;
                max-width: none;
                border-radius: 0;
            }
            
            .mega-menu-content {
                grid-template-columns: 1fr;
                padding: 25px;
            }
        }
        
        @media (max-width: 768px) {
            .top-bar {
                font-size: 0.75rem;
            }
            
            .top-bar-content {
                gap: 8px;
                padding: 6px 0;
            }
            
            .lang-selector {
                padding: 3px 6px;
            }
            
            .top-bar-icon-btn {
                width: 28px;
                height: 28px;
            }
            
            .cart-btn {
                padding: 10px 18px;
                font-size: 0.85rem;
            }
            
            .cart-count {
                padding: 3px 8px;
                font-size: 0.75rem;
            }
        }
        
        @media (max-width: 576px) {
            .container {
                padding: 0 15px;
            }
            
            .top-bar-link span {
                display: none;
            }
            
            .top-bar-link strong {
                font-size: 0.85rem;
            }
            
            .header-content {
                padding: 15px 0;
            }
            
            .search-input {
                padding: 14px 45px 14px 20px;
                font-size: 0.9rem;
            }
            
            #main-navigation {
                flex-wrap: wrap;
                gap: 0;
            }
            
            #main-navigation > li > a {
                padding: 14px 16px;
                font-size: 0.85rem;
            }
        }
    </style>
</head>
<body>
    <!-- Top Bar - Enterprise Grade -->
    <div class="top-bar">
        <div class="container">
            <div class="top-bar-content">
                <div class="top-bar-left">
                    <!-- Language Selector -->
                    <div class="lang-selector" onclick="alert('Sprachauswahl: Deutsch (DE) | English (EN) | Français (FR)')">
                        <i class="fas fa-globe"></i>
                        <span>DE</span>
                        <i class="fas fa-chevron-down" style="font-size: 0.7rem;"></i>
                    </div>
                    
                    <!-- Hotline -->
                    <a href="tel:+4908000008124" class="top-bar-link">
                        <i class="fas fa-phone-volume"></i>
                        <strong>0800 000 812 4</strong>
                    </a>
                    
                    <!-- Email -->
                    <a href="mailto:support@softwareking24.de" class="top-bar-link">
                        <i class="fas fa-envelope"></i>
                        support@softwareking24.de
                    </a>
                    
                    <!-- Trust Badges -->
                    <div class="trust-badges">
                        <span class="trust-badge">
                            <i class="fas fa-shield-alt"></i>
                            SSL-Sicher
                        </span>
                        <span class="trust-badge">
                            <i class="fas fa-certificate"></i>
                            Zertifiziert
                        </span>
                        <span class="trust-badge">
                            <i class="fas fa-truck"></i>
                            Sofortversand
                        </span>
                    </div>
                </div>
                
                <div class="top-bar-right">
                    <!-- Account -->
                    <a href="/login" class="top-bar-link">
                        <i class="fas fa-user-circle"></i>
                        Mein Konto
                    </a>
                    
                    <!-- Wishlist -->
                    <a href="/wunschliste" class="top-bar-icon-btn" title="Wunschliste">
                        <i class="fas fa-heart"></i>
                        <span class="icon-badge">0</span>
                    </a>
                    
                    <!-- Compare -->
                    <a href="/vergleich" class="top-bar-icon-btn" title="Vergleichen">
                        <i class="fas fa-exchange-alt"></i>
                        <span class="icon-badge">0</span>
                    </a>
                    
                    <!-- Help Center -->
                    <a href="/kontakt" class="top-bar-link">
                        <i class="fas fa-headset"></i>
                        Hilfe
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="/" class="logo">
                    <img src="/static/logo.png" alt="SOFTWAREKING24" style="height: 50px; width: auto;">
                </a>
                
                <div class="search-bar">
                    <input type="text" id="search-input" class="search-input" placeholder="Software suchen...">
                    <button id="search-btn" class="search-btn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                
                <div class="header-actions">
                    <a href="/warenkorb" class="cart-btn">
                        <i class="fas fa-shopping-cart"></i>
                        Warenkorb
                        <span id="cart-count" class="cart-count">0</span>
                    </a>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Navigation -->
    <nav class="navigation">
        <div class="container">
            <div class="nav-container">
                <ul id="main-navigation">
                    <!-- Will be loaded dynamically -->
                </ul>
            </div>
        </div>
    </nav>
    
    <!-- Dynamic Sections -->
    <div id="dynamic-sections">
        <!-- All sections will be loaded dynamically based on database order -->
    </div>
    
    <!-- Footer -->
    <footer class="footer">
        <!-- Top Section: Logo and Contact (Dark Background) -->
        <div class="footer-top">
            <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <img src="/static/logo-footer.png" alt="SOFTWAREKING24" style="height: 60px; width: auto; margin-bottom: 20px;">
                <p style="margin-bottom: 10px; font-size: 1.1rem;"><strong>24 / 7 EMAIL Support</strong></p>
                <p style="font-size: 1.8rem; font-weight: bold; margin: 10px 0;">0800 000 812 4</p>
                <p style="font-size: 0.95rem; opacity: 0.9; margin-bottom: 5px;">Telefonische Beratung unter:</p>
                <p style="font-size: 0.95rem; opacity: 0.9;">E-Mail Support <strong>24/7</strong></p>
                
                <div style="margin-top: 30px; display: flex; justify-content: center; flex-wrap: wrap; gap: 12px;">
                    <a href="/kontakt" style="display: inline-block; background: var(--gold); color: #001933; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-weight: 600; font-size: 0.95rem;">E-Mail</a>
                    <a href="#" style="display: inline-block; background: var(--gold); color: #001933; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-weight: 600; font-size: 0.95rem;">Callback Service</a>
                    <a href="/kontakt" style="display: inline-block; background: var(--gold); color: #001933; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-weight: 600; font-size: 0.95rem;">Kontaktformular</a>
                    <a href="tel:+4908000008124" style="display: inline-block; background: var(--gold); color: #001933; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-weight: 600; font-size: 0.95rem;">Telefon</a>
                </div>
            </div>
        </div>

        <!-- Main Footer Links - Three Columns -->
        <div style="padding: 50px 0;">
            <div class="footer-content">
                <div>
                    <h3>Widerrufsrecht</h3>
                    <ul>
                        <li><a href="/widerruf">Geld zurück Garantie</a></li>
                        <li><a href="/agb">Versand- & Zahlungsbedingungen</a></li>
                        <li><a href="/agb">AGB</a></li>
                        <li><a href="/datenschutz">Datenschutz</a></li>
                        <li><a href="/impressum">Impressum</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Neue Artikel</h3>
                    <ul>
                        <li><a href="/produkte?new=true">Angebote</a></li>
                        <li><a href="/ueber-uns">Über uns</a></li>
                        <li><a href="#">Sitemap</a></li>
                        <li><a href="#" onclick="alert('Windows-Fehlermeldung Hilfe'); return false;">Windows-Fehlermeldung</a></li>
                        <li><a href="#" onclick="alert('Partnerprogramm - Kontaktieren Sie uns'); return false;">Partnerprogramm</a></li>
                        <li><a href="#" onclick="alert('Bestellstatus prüfen'); return false;">Bestellstatus</a></li>
                        <li><a href="#" onclick="alert('Sonderaktionen'); return false;">Sonderaktionen</a></li>
                        <li><a href="#" onclick="alert('Supportende'); return false;">Supportende</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Support & Service</h3>
                    <ul>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="#" onclick="alert('Umwelt-Information'); return false;">Umwelt</a></li>
                        <li><a href="#" onclick="alert('Karriere - Jobs verfügbar'); return false;">Karriere & Jobs</a></li>
                        <li><a href="#" onclick="alert('Großhandel - Kontaktieren Sie uns'); return false;">Großhandel</a></li>
                        <li><a href="#" onclick="alert('Händlerregistrierung'); return false;">Händlerregistrierung</a></li>
                        <li><a href="#">Installationsanleitungen</a></li>
                        <li><a href="#" onclick="alert('Tech Blog - Coming Soon'); return false;">Tech Blog</a></li>
                        <li><a href="#" onclick="alert('Gutschein Karten'); return false;">Gutschein Karten</a></li>
                    </ul>
                </div>
            </div>

            <!-- Trust Badges Row -->
            <div style="text-align: center; margin: 50px 0;">
                <div class="footer-badge">
                    <i class="fas fa-shield-alt"></i>
                    Geprüfte Qualität
                </div>
                <div class="footer-badge">
                    <i class="fas fa-certificate"></i>
                    Zertifiziert
                </div>
                <div class="footer-badge">
                    <i class="fas fa-lock"></i>
                    SSL Gesichert
                </div>
                <div class="footer-badge">
                    <i class="fas fa-award"></i>
                    Ausgezeichnet
                </div>
                <div class="footer-badge">
                    <i class="fas fa-star" style="color: #FFC107;"></i>
                    Top Bewertet
                </div>
                <div class="footer-badge">
                    <i class="fas fa-check-circle" style="color: #00A859;"></i>
                    Verifiziert
                </div>
            </div>

            <!-- Windows Activation Buttons -->
            <div style="text-align: center; margin: 40px 0;">
                <a href="#" onclick="alert('Windows 10 Aktivierung'); return false;" style="display: inline-block; background: var(--gold); color: #001933; padding: 14px 35px; border-radius: 30px; text-decoration: none; font-weight: 600; margin: 8px; font-size: 0.95rem;">Windows 10 aktivieren</a>
                <a href="#" onclick="alert('Windows 11 Aktivierung'); return false;" style="display: inline-block; background: var(--gold); color: #001933; padding: 14px 35px; border-radius: 30px; text-decoration: none; font-weight: 600; margin: 8px; font-size: 0.95rem;">Windows 11 aktivieren</a>
            </div>

            <!-- Partner & Certificate Logos -->
            <div style="text-align: center; margin: 50px 0;">
                <div class="footer-badge">
                    <i class="fab fa-microsoft"></i>
                    Microsoft<br/>Solutions Partner
                </div>
                <div class="footer-badge">
                    <i class="fas fa-certificate"></i>
                    Zertifizierter<br/>Reseller
                </div>
                <div class="footer-badge">
                    <i class="fas fa-shield-virus"></i>
                    Bitdefender<br/>Reseller
                </div>
                <div class="footer-badge">
                    <i class="fas fa-user-shield"></i>
                    Autorisierter<br/>Partner
                </div>
                <div class="footer-badge">
                    <i class="fas fa-film"></i>
                    Wondershare<br/>Partner
                </div>
                <div class="footer-badge">
                    <i class="fas fa-server"></i>
                    Acronis<br/>Partner
                </div>
            </div>

            <!-- Reviews & Payment Methods -->
            <div style="text-align: center; margin: 40px 0;">
                <div style="display: inline-block; margin: 15px 0;">
                    <i class="fas fa-star" style="color: var(--gold); font-size: 1.3rem;"></i>
                    <i class="fas fa-star" style="color: var(--gold); font-size: 1.3rem;"></i>
                    <i class="fas fa-star" style="color: var(--gold); font-size: 1.3rem;"></i>
                    <i class="fas fa-star" style="color: var(--gold); font-size: 1.3rem;"></i>
                    <i class="fas fa-star" style="color: var(--gold); font-size: 1.3rem;"></i>
                    <span style="margin-left: 12px; font-weight: 600; font-size: 1rem;">5120 Bewertungen auf ProvenExpert.com</span>
                </div>
            </div>

            <!-- Payment Methods -->
            <div style="text-align: center; margin: 40px 0;">
                <p style="margin-bottom: 20px; font-weight: 600; font-size: 1rem;">Zahlungsmöglichkeiten</p>
                <div style="display: flex; justify-content: center; gap: 25px; flex-wrap: wrap; align-items: center; opacity: 0.9;">
                    <i class="fab fa-cc-visa" style="font-size: 3rem;"></i>
                    <i class="fab fa-cc-mastercard" style="font-size: 3rem;"></i>
                    <i class="fab fa-cc-paypal" style="font-size: 3rem;"></i>
                    <i class="fab fa-cc-amex" style="font-size: 3rem;"></i>
                    <i class="fas fa-university" style="font-size: 2.5rem;"></i>
                    <i class="fas fa-money-bill-wave" style="font-size: 2.5rem;"></i>
                </div>
            </div>
        </div>

        <!-- Bottom Section: Categories & Info -->
        <div style="background: #001933; padding: 40px 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; margin-bottom: 40px;">
                    <div>
                        <h4 style="color: white; margin-bottom: 15px; font-size: 0.95rem; font-weight: 600;">Top-Kategorien</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 10px;"><a href="/produkte?category=bitdefender" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Bitdefender</a></li>
                            <li style="margin-bottom: 10px;"><a href="/produkte?category=windows" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Windows Betriebssysteme</a></li>
                            <li style="margin-bottom: 10px;"><a href="/produkte?category=office" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Microsoft Office Programme</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: white; margin-bottom: 15px; font-size: 0.95rem; font-weight: 600;">Top-Produkte</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 10px;"><a href="/produkte" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Windows 10 Professional</a></li>
                            <li style="margin-bottom: 10px;"><a href="/produkte" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Windows 11 Professional</a></li>
                            <li style="margin-bottom: 10px;"><a href="/produkte" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Microsoft Office Professional Plus</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: white; margin-bottom: 15px; font-size: 0.95rem; font-weight: 600;">Bestseller</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 10px;"><a href="/produkte?bestseller=true" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Acronis True Image</a></li>
                            <li style="margin-bottom: 10px;"><a href="/produkte?bestseller=true" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Bitdefender Internet Security</a></li>
                            <li style="margin-bottom: 10px;"><a href="/produkte?bestseller=true" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Microsoft SQL Server</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: white; margin-bottom: 15px; font-size: 0.95rem; font-weight: 600;">Top-Marken</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 10px;"><a href="/produkte?brand=microsoft" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Microsoft</a></li>
                            <li style="margin-bottom: 10px;"><a href="/produkte?brand=kaspersky" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Kaspersky</a></li>
                            <li style="margin-bottom: 10px;"><a href="/produkte?brand=bitdefender" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Bitdefender</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Most: Social Media & Copyright -->
        <div class="footer-bottom">
            <div style="margin-bottom: 25px;">
                <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.2rem; margin: 0 8px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='#001933'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-facebook-f"></i></a>
                <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.2rem; margin: 0 8px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='#001933'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-twitter"></i></a>
                <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.2rem; margin: 0 8px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='#001933'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-instagram"></i></a>
                <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.2rem; margin: 0 8px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='#001933'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-youtube"></i></a>
                <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.2rem; margin: 0 8px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='#001933'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-whatsapp"></i></a>
                <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.2rem; margin: 0 8px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='#001933'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-discord"></i></a>
            </div>
            <p style="opacity: 0.7; line-height: 1.6; max-width: 900px; margin: 0 auto 15px;">Alle Preise in Euro inkl. der gesetzlichen Mehrwertsteuer, ggf. zzgl. Versandkosten und ggf. Nachnahmegebühren, wenn nicht anders beschrieben.</p>
            <p style="opacity: 0.7; margin: 0 0 20px 0;">Liefergebiet: Deutschland Copyright © 2017 - 2026 SOFTWAREKING24 Support GmbH & Co. KG - Alle Rechte vorbehalten!</p>
            <p style="margin: 0; font-weight: 600;">&copy; 2024 SOFTWAREKING24. Alle Rechte vorbehalten.</p>
        </div>
    </footer>
    
    <script>
        // Initialize cart count from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        document.getElementById('cart-count').textContent = cart.length;
        
        // Update cart count on storage events
        window.addEventListener('storage', (e) => {
            if (e.key === 'cart') {
                const cart = JSON.parse(e.newValue || '[]');
                document.getElementById('cart-count').textContent = cart.length;
            }
        });
        
        // Search functionality
        document.getElementById('search-btn').addEventListener('click', () => {
            const query = document.getElementById('search-input').value;
            if (query) {
                window.location.href = '/produkte?search=' + encodeURIComponent(query);
            }
        });
        
        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value;
                if (query) {
                    window.location.href = '/produkte?search=' + encodeURIComponent(query);
                }
            }
        });
        
        // Load navigation from API
        async function loadNavigation() {
            try {
                const response = await axios.get('/api/homepage/navigation');
                const menuItems = response.data.data || [];
                
                const nav = document.getElementById('main-navigation');
                
                // Build navigation with dropdown support
                nav.innerHTML = menuItems.map(item => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isMegaMenu = hasChildren && item.children.length > 4;
                    
                    let html = '<li' + (hasChildren ? ' class="has-dropdown"' : '') + '>';
                    html += '<a href="' + item.url + '">';
                    html += item.title;
                    if (hasChildren) {
                        html += ' <i class="fas fa-chevron-down"></i>';
                    }
                    html += '</a>';
                    
                    // Add dropdown or mega menu
                    if (hasChildren) {
                        if (isMegaMenu) {
                            // Mega Menu for items with many children
                            html += '<div class="mega-menu">';
                            html += '<div class="mega-menu-content">';
                            
                            // Group children into columns (5 items per column)
                            const columns = Math.ceil(item.children.length / 5);
                            for (let i = 0; i < columns; i++) {
                                const columnItems = item.children.slice(i * 5, (i + 1) * 5);
                                html += '<div class="mega-menu-column">';
                                html += '<h4>' + item.title + ' ' + (i + 1) + '</h4>';
                                html += '<ul>';
                                columnItems.forEach(child => {
                                    html += '<li><a href="' + child.url + '"><i class="fas fa-angle-right"></i>' + child.title + '</a></li>';
                                });
                                html += '</ul></div>';
                            }
                            
                            html += '</div></div>';
                        } else {
                            // Simple dropdown for fewer items
                            html += '<div class="dropdown-menu">';
                            item.children.forEach(child => {
                                html += '<a href="' + child.url + '">' + child.title + '</a>';
                            });
                            html += '</div>';
                        }
                    }
                    
                    html += '</li>';
                    return html;
                }).join('');
                
                // Add active state based on current URL
                const currentPath = window.location.pathname;
                document.querySelectorAll('#main-navigation a').forEach(link => {
                    if (link.getAttribute('href') === currentPath) {
                        link.closest('li').classList.add('active');
                    }
                });
                
            } catch (error) {
                console.error('Error loading navigation:', error);
            }
        }
        
        // Load all sections from API
        async function loadAllSections() {
            try {
                console.log('[SECTIONS] Loading sections...');
                const response = await axios.get('/api/homepage/sections');
                console.log('[SECTIONS] API response:', response.data);
                
                const sections = (response.data.data || []).filter(s => s.is_enabled);
                console.log('[SECTIONS] Enabled sections:', sections.length);
                
                const container = document.getElementById('dynamic-sections');
                if (!container) {
                    console.error('[SECTIONS] Container not found!');
                    return;
                }
                
                container.innerHTML = '';
                
                for (const section of sections) {
                    console.log('[SECTIONS] Rendering section:', section.section_key);
                    
                    const config = section.config ? JSON.parse(section.config) : {};
                    let html = '';
                    
                    // Route to appropriate renderer based on section type
                    switch (section.section_type) {
                        case 'hero':
                            html = renderHeroSlider(section, config);
                            break;
                        case 'trust_bar':
                            html = renderTrustBar(section, config);
                            break;
                        case 'product_slider':
                            html = renderProductSlider(section, config);
                            break;
                        case 'feature':
                            if (section.section_key === 'license_availability') {
                                html = renderLicenseAvailability(section, config);
                            } else if (section.section_key === 'price_comparison') {
                                html = renderPriceComparison(section, config);
                            } else {
                                html = renderFeatureSection(section, config);
                            }
                            break;
                        case 'static':
                            html = renderStaticSection(section, config);
                            break;
                        case 'widget':
                            html = renderWidgetSection(section, config);
                            break;
                        default:
                            html = renderPlaceholder(section);
                    }
                    
                    if (html) {
                        container.insertAdjacentHTML('beforeend', html);
                        console.log('[SECTIONS] Rendered section HTML length:', html.length);
                    } else {
                        console.warn('[SECTIONS] No HTML returned for section:', section.section_key);
                    }
                }
                
                console.log('[SECTIONS] All sections rendered successfully');
                console.log('[SECTIONS] Container innerHTML length:', container.innerHTML.length);
                
                // Initialize any interactive features
                initializeSectionInteractivity();
                
            } catch (error) {
                console.error('[SECTIONS] Error loading sections:', error);
            }
        }
        
        function initializeSectionInteractivity() {
            // Any additional interactivity initialization
            console.log('[SECTIONS] Initializing section interactivity');
        }
        
        // Load on DOMContentLoaded
        document.addEventListener('DOMContentLoaded', () => {
            loadNavigation();
            loadAllSections();
        });
    </script>
</body>
</html>
`;
}
