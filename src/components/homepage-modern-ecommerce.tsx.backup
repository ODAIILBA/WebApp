// Modern E-Commerce Homepage for SOFTWAREKING24 - LIGHT THEME
// CONVERTED TO LIGHT THEME with white background and blue accents

import { AddToCartScript } from './add-to-cart-script'

export function HomepageModernEcommerce() {
  const timestamp = Date.now();
  return `
    <!DOCTYPE html>
    <html lang="de" data-theme="light" data-version="3.0" data-build="${timestamp}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
      <meta http-equiv="Pragma" content="no-cache">
      <meta http-equiv="Expires" content="0">
      <title>SoftwareKing24 – Ihr Partner für günstige Software Lizenzen</title>
      <meta name="description" content="Günstige Software Lizenzen kaufen – Original & Sofort verfügbar. Windows 11, Microsoft Office 2024, Antivirus-Programme, Serverlösungen zu Top-Preisen.">
      <script src="https://cdn.tailwindcss.com?v=${timestamp}"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css?v=${timestamp}" rel="stylesheet">
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
        /* CSS Variables - BRAND COLORS */
        :root {
          /* Background colors */
          --bg-primary: #FFFFFF;
          --bg-secondary: #F8F9FA;
          --bg-tertiary: #F3F4F6;
          
          /* BRAND COLORS - Navy & Gold */
          --brand-navy: #132C46;
          --brand-navy-dark: #0D1F31;
          --brand-navy-light: #1A3A5C;
          
          --brand-gold: #D9A50B;
          --brand-gold-dark: #B8890A;
          --brand-gold-light: #F4C400;
          
          /* Text colors */
          --text-primary: #1A1A1A;
          --text-secondary: #4B5563;
          --text-muted: #6B7280;
          --text-light: #9CA3AF;
          
          /* Border colors */
          --border-light: #E5E7EB;
          --border-medium: #D1D5DB;
          
          /* Shadows */
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
          --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: var(--bg-primary);
          color: var(--text-primary);
        }

        html {
          scroll-behavior: smooth;
        }

        /* Product card hover effects */
        .product-card {
          transition: all 0.3s ease;
          background: white;
          border: 1px solid var(--border-light);
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--brand-navy);
        }

        /* Category circle hover */
        .category-circle {
          transition: all 0.3s ease;
        }
        
        .category-circle:hover {
          transform: scale(1.1);
        }
        
        /* Dropdown Menu Styles */
        .dropdown {
          position: relative;
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          min-width: 200px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          border-radius: 8px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 100;
          margin-top: 10px;
          padding: 20px;
        }
        
        .dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .dropdown-menu a {
          display: block;
          padding: 12px 20px;
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.2s;
          border-radius: 6px;
        }
        
        .dropdown-menu a:hover {
          background: #F3F4F6;
          color: var(--brand-navy);
          padding-left: 25px;
        }
        
        /* MEGA MENU - Wide dropdown with columns */
        .mega-dropdown {
          width: 900px;
          left: 50%;
          transform: translateX(-50%) translateY(-10px);
          padding: 30px;
        }
        
        .dropdown:hover .mega-dropdown {
          transform: translateX(-50%) translateY(0);
        }
        
        .mega-menu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        
        .mega-menu-column h4 {
          color: var(--brand-navy);
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--brand-gold);
        }
        
        .mega-menu-column a {
          padding: 8px 12px;
          font-size: 14px;
        }
        
        .mega-menu-column a:hover {
          padding-left: 16px;
        }
        
        .mega-menu-featured {
          background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        
        .mega-menu-featured i {
          font-size: 48px;
          color: var(--brand-gold);
          margin-bottom: 10px;
        }
        
        .mega-menu-featured h5 {
          color: var(--brand-navy);
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .mega-menu-featured p {
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Button animations */
        .btn-primary {
          background: var(--brand-navy);
          color: white;
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background: var(--brand-navy-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(19, 44, 70, 0.3);
        }

        .btn-gold {
          background: var(--brand-gold);
          color: white;
          transition: all 0.3s ease;
        }
        
        .btn-gold:hover {
          background: var(--brand-gold-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(217, 165, 11, 0.3);
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid var(--brand-navy);
          color: var(--brand-navy);
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: var(--brand-navy);
          color: white;
        }

        /* Countdown timer */
        .countdown-box {
          background: white;
          border: 2px solid var(--border-light);
          color: var(--brand-navy);
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
          background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin: 0 auto 16px;
        }

        /* Hero gradient */
        .hero-gradient {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }

        /* Star rating */
        .stars {
          color: var(--accent-gold);
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
          border-bottom: 1px solid var(--border-light);
          background: white;
        }
        
        .faq-question {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .faq-question:hover {
          color: var(--primary-blue);
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
      
      <!-- Utility Bar -->
      <div class="bg-gray-100 text-gray-700 py-2 text-sm border-b border-gray-200">
        <div class="container mx-auto px-4 flex justify-between items-center">
          <div class="flex items-center gap-6">
            <a href="/download-center" class="hover:text-brand-navy transition flex items-center gap-1" data-i18n="download_center">
              <i class="fas fa-download"></i>
              <span>Download Center</span>
            </a>
            <a href="/faq" class="hover:text-brand-navy transition flex items-center gap-1" data-i18n="faq">
              <i class="fas fa-question-circle"></i>
              <span>FAQ</span>
            </a>
            <a href="/contact" class="hover:text-brand-navy transition flex items-center gap-1" data-i18n="contact">
              <i class="fas fa-envelope"></i>
              <span>Kontakt</span>
            </a>
          </div>
          <div class="flex items-center gap-6">
            <a href="/wishlist" class="hover:text-brand-navy transition flex items-center gap-1" data-i18n="my_wishlist">
              <i class="fas fa-heart"></i>
              <span>Meine Wunschliste</span>
            </a>
            <a href="/manufacturers" class="hover:text-brand-navy transition flex items-center gap-1" data-i18n="manufacturers">
              <i class="fas fa-industry"></i>
              <span>Hersteller</span>
            </a>
            <a href="/about" class="hover:text-brand-navy transition flex items-center gap-1" data-i18n="about_us">
              <i class="fas fa-info-circle"></i>
              <span>Über uns</span>
            </a>
            
            <!-- Language Switcher -->
            <div class="relative dropdown" id="language-switcher">
              <button class="hover:text-brand-navy transition flex items-center gap-2 cursor-pointer">
                <i class="fas fa-globe"></i>
                <span id="current-language-text">Deutsch</span>
                <i class="fas fa-chevron-down text-xs"></i>
              </button>
              <div class="dropdown-menu" style="min-width: 180px; right: 0; left: auto;">
                <a href="#" onclick="switchLanguage('de'); return false;" data-lang="de" class="language-option">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='15'%3E%3Crect width='20' height='5' fill='%23000'/%3E%3Crect y='5' width='20' height='5' fill='%23D00'/%3E%3Crect y='10' width='20' height='5' fill='%23FFCE00'/%3E%3C/svg%3E" class="inline-block w-5 h-4 mr-2" alt="DE">
                  Deutsch
                </a>
                <a href="#" onclick="switchLanguage('en'); return false;" data-lang="en" class="language-option">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='15'%3E%3Crect width='20' height='15' fill='%23012169'/%3E%3Cpath d='M0 0l20 15M20 0L0 15' stroke='%23fff' stroke-width='3'/%3E%3Cpath d='M0 0l20 15M20 0L0 15' stroke='%23C8102E' stroke-width='2'/%3E%3Cpath d='M10 0v15M0 7.5h20' stroke='%23fff' stroke-width='5'/%3E%3Cpath d='M10 0v15M0 7.5h20' stroke='%23C8102E' stroke-width='3'/%3E%3C/svg%3E" class="inline-block w-5 h-4 mr-2" alt="EN">
                  English
                </a>
                <a href="#" onclick="switchLanguage('fr'); return false;" data-lang="fr" class="language-option">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='15'%3E%3Crect width='6.67' height='15' fill='%23002395'/%3E%3Crect x='6.67' width='6.67' height='15' fill='%23fff'/%3E%3Crect x='13.33' width='6.67' height='15' fill='%23ED2939'/%3E%3C/svg%3E" class="inline-block w-5 h-4 mr-2" alt="FR">
                  Français
                </a>
                <a href="#" onclick="switchLanguage('es'); return false;" data-lang="es" class="language-option">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='15'%3E%3Crect width='20' height='15' fill='%23AA151B'/%3E%3Crect y='3.75' width='20' height='7.5' fill='%23F1BF00'/%3E%3C/svg%3E" class="inline-block w-5 h-4 mr-2" alt="ES">
                  Español
                </a>
                <a href="#" onclick="switchLanguage('it'); return false;" data-lang="it" class="language-option">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='15'%3E%3Crect width='6.67' height='15' fill='%23009246'/%3E%3Crect x='6.67' width='6.67' height='15' fill='%23fff'/%3E%3Crect x='13.33' width='6.67' height='15' fill='%23CE2B37'/%3E%3C/svg%3E" class="inline-block w-5 h-4 mr-2" alt="IT">
                  Italiano
                </a>
              </div>
            </div>
            
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
                <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-gold text-white px-6 py-2 rounded-full hover:bg-brand-gold-dark transition">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>

            <!-- Header Icons -->
            <div class="flex items-center gap-6">
              <a href="/account" class="flex flex-col items-center text-gray-700 hover:text-brand-navy transition">
                <i class="fas fa-user text-2xl mb-1"></i>
                <span class="text-xs">Konto</span>
              </a>
              <a href="/wishlist" class="flex flex-col items-center text-gray-700 hover:text-brand-navy transition relative">
                <i class="fas fa-heart text-2xl mb-1"></i>
                <span class="text-xs">Wunschliste</span>
                <span class="absolute -top-2 -right-2 bg-brand-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
              </a>
              <a href="/cart" class="flex flex-col items-center text-gray-700 hover:text-brand-navy transition relative">
                <i class="fas fa-shopping-cart text-2xl mb-1"></i>
                <span class="text-xs">Warenkorb</span>
                <span class="absolute -top-2 -right-2 bg-brand-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Advanced Navigation with Dropdowns -->
        <nav class="bg-brand-navy text-white">
          <div class="container mx-auto px-4">
            <ul class="flex items-center justify-center gap-1 py-0">
              
              <!-- Home -->
              <li class="dropdown">
                <a href="/" class="block px-5 py-4 hover:bg-brand-navy-light transition font-medium">
                  <i class="fas fa-home mr-2"></i>Startseite
                </a>
              </li>
              
              <!-- Office Dropdown - MEGA MENU -->
              <li class="dropdown">
                <a href="/products?category=office" class="block px-5 py-4 hover:bg-brand-navy-light transition font-medium cursor-pointer">
                  <i class="fas fa-file-word mr-2"></i>Office <i class="fas fa-chevron-down ml-1 text-xs"></i>
                </a>
                <div class="dropdown-menu mega-dropdown">
                  <div class="mega-menu-grid">
                    
                    <!-- Column 1: Office Suites -->
                    <div class="mega-menu-column">
                      <h4><i class="fas fa-box-open mr-2"></i>Office Suites</h4>
                      <a href="/products?product=office-2024-professional">Office 2024 Professional Plus</a>
                      <a href="/products?product=office-2024-home">Office 2024 Home & Business</a>
                      <a href="/products?product=office-2021-professional">Office 2021 Professional Plus</a>
                      <a href="/products?product=office-2021-home">Office 2021 Home & Business</a>
                      <a href="/products?product=office-2019-professional">Office 2019 Professional Plus</a>
                      <a href="/products?product=office-2019-home">Office 2019 Home & Business</a>
                    </div>
                    
                    <!-- Column 2: Microsoft 365 & Apps -->
                    <div class="mega-menu-column">
                      <h4><i class="fas fa-cloud mr-2"></i>Microsoft 365</h4>
                      <a href="/products?product=microsoft-365-business">Microsoft 365 Business</a>
                      <a href="/products?product=microsoft-365-family">Microsoft 365 Family</a>
                      <a href="/products?product=microsoft-365-personal">Microsoft 365 Personal</a>
                      <h4 class="mt-6"><i class="fas fa-apple mr-2"></i>Office für Mac</h4>
                      <a href="/products?product=office-mac-2024">Office 2024 für Mac</a>
                      <a href="/products?product=office-mac-2021">Office 2021 für Mac</a>
                      <a href="/products?product=office-mac-2019">Office 2019 für Mac</a>
                    </div>
                    
                    <!-- Column 3: Featured Product -->
                    <div class="mega-menu-column">
                      <div class="mega-menu-featured">
                        <i class="fas fa-star"></i>
                        <h5>Office 2024</h5>
                        <p class="mb-3">Neueste Version mit KI-Features</p>
                        <span class="inline-block bg-brand-gold text-white px-4 py-2 rounded-full text-sm font-semibold">Ab €29,99</span>
                      </div>
                      <a href="/products?category=office" class="block mt-4 text-center bg-gray-100 py-3 rounded-lg font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition">
                        <i class="fas fa-th mr-2"></i>Alle Office Produkte
                      </a>
                    </div>
                    
                  </div>
                </div>
              </li>
              
              <!-- Antivirus Dropdown - MEGA MENU -->
              <li class="dropdown">
                <a href="/products?category=antivirus" class="block px-5 py-4 hover:bg-brand-navy-light transition font-medium cursor-pointer">
                  <i class="fas fa-shield-virus mr-2"></i>Antivirus <i class="fas fa-chevron-down ml-1 text-xs"></i>
                </a>
                <div class="dropdown-menu mega-dropdown">
                  <div class="mega-menu-grid">
                    
                    <!-- Column 1: Premium Brands -->
                    <div class="mega-menu-column">
                      <h4><i class="fas fa-shield-alt mr-2"></i>Premium Schutz</h4>
                      <a href="/products?brand=kaspersky">
                        <i class="fas fa-circle text-brand-gold text-xs mr-2"></i>Kaspersky Total Security
                      </a>
                      <a href="/products?brand=norton">
                        <i class="fas fa-circle text-brand-gold text-xs mr-2"></i>Norton 360 Deluxe
                      </a>
                      <a href="/products?brand=bitdefender">
                        <i class="fas fa-circle text-brand-gold text-xs mr-2"></i>Bitdefender Total Security
                      </a>
                      <a href="/products?brand=eset">
                        <i class="fas fa-circle text-brand-gold text-xs mr-2"></i>ESET Internet Security
                      </a>
                    </div>
                    
                    <!-- Column 2: Business & More -->
                    <div class="mega-menu-column">
                      <h4><i class="fas fa-building mr-2"></i>Business Lösungen</h4>
                      <a href="/products?brand=kaspersky&type=business">Kaspersky Endpoint Security</a>
                      <a href="/products?brand=eset&type=business">ESET Endpoint Protection</a>
                      <a href="/products?brand=mcafee&type=business">McAfee Total Protection</a>
                      <h4 class="mt-6"><i class="fas fa-laptop mr-2"></i>Weitere Optionen</h4>
                      <a href="/products?brand=avast">Avast Premium Security</a>
                      <a href="/products?brand=avg">AVG Internet Security</a>
                    </div>
                    
                    <!-- Column 3: Featured -->
                    <div class="mega-menu-column">
                      <div class="mega-menu-featured">
                        <i class="fas fa-trophy"></i>
                        <h5>Bestseller 2024</h5>
                        <p class="mb-3">Top-bewerteter Virenschutz</p>
                        <span class="inline-block bg-brand-gold text-white px-4 py-2 rounded-full text-sm font-semibold">Ab €19,99</span>
                      </div>
                      <a href="/products?category=antivirus" class="block mt-4 text-center bg-gray-100 py-3 rounded-lg font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition">
                        <i class="fas fa-th mr-2"></i>Alle Antivirus Produkte
                      </a>
                    </div>
                    
                  </div>
                </div>
              </li>
              
              <!-- Games -->
              <li class="dropdown">
                <a href="/products?category=games" class="block px-5 py-4 hover:bg-brand-navy-light transition font-medium">
                  <i class="fas fa-gamepad mr-2"></i>Games
                </a>
              </li>
              
              <!-- Development -->
              <li class="dropdown">
                <a href="/products?category=development" class="block px-5 py-4 hover:bg-brand-navy-light transition font-medium cursor-pointer">
                  <i class="fas fa-code mr-2"></i>Development <i class="fas fa-chevron-down ml-1 text-xs"></i>
                </a>
                <div class="dropdown-menu">
                  <a href="/products?category=development&product=visual-studio">Visual Studio</a>
                  <a href="/products?category=development&product=sql-server">SQL Server</a>
                  <a href="/products?category=development&product=jetbrains">JetBrains Tools</a>
                </div>
              </li>
              
              <!-- Server Dropdown -->
              <li class="dropdown">
                <a href="/products?category=server" class="block px-5 py-4 hover:bg-brand-navy-light transition font-medium cursor-pointer">
                  <i class="fas fa-server mr-2"></i>Server <i class="fas fa-chevron-down ml-1 text-xs"></i>
                </a>
                <div class="dropdown-menu">
                  <a href="/products?category=server&product=windows-server-2022">Windows Server 2022</a>
                  <a href="/products?category=server&product=windows-server-2019">Windows Server 2019</a>
                  <a href="/products?category=server&product=sql-server">SQL Server</a>
                  <a href="/products?category=server&product=exchange-server">Exchange Server</a>
                </div>
              </li>
              
              <!-- PC & Windows Dropdown - MEGA MENU -->
              <li class="dropdown">
                <a href="/products?category=windows" class="block px-5 py-4 hover:bg-brand-navy-light transition font-medium cursor-pointer">
                  <i class="fas fa-windows mr-2"></i>PC & Windows <i class="fas fa-chevron-down ml-1 text-xs"></i>
                </a>
                <div class="dropdown-menu mega-dropdown">
                  <div class="mega-menu-grid">
                    
                    <!-- Column 1: Windows Client -->
                    <div class="mega-menu-column">
                      <h4><i class="fas fa-desktop mr-2"></i>Windows Client</h4>
                      <a href="/products?product=windows-11-pro">Windows 11 Professional</a>
                      <a href="/products?product=windows-11-home">Windows 11 Home</a>
                      <a href="/products?product=windows-10-pro">Windows 10 Professional</a>
                      <a href="/products?product=windows-10-home">Windows 10 Home</a>
                      <a href="/products?product=windows-7-professional">Windows 7 Professional</a>
                    </div>
                    
                    <!-- Column 2: Upgrades & Volume -->
                    <div class="mega-menu-column">
                      <h4><i class="fas fa-arrow-circle-up mr-2"></i>Upgrades</h4>
                      <a href="/products?product=windows-11-upgrade">Windows 11 Upgrade</a>
                      <a href="/products?product=windows-10-upgrade">Windows 10 Upgrade</a>
                      <h4 class="mt-6"><i class="fas fa-users mr-2"></i>Volume Lizenzen</h4>
                      <a href="/products?type=volume">Windows 10/11 Volume (5+)</a>
                      <a href="/products?type=volume">Windows 10/11 Volume (10+)</a>
                      <a href="/contact">Individuelle Angebote</a>
                    </div>
                    
                    <!-- Column 3: Featured -->
                    <div class="mega-menu-column">
                      <div class="mega-menu-featured">
                        <i class="fas fa-rocket"></i>
                        <h5>Windows 11 Pro</h5>
                        <p class="mb-3">Neueste Version für Business</p>
                        <span class="inline-block bg-brand-gold text-white px-4 py-2 rounded-full text-sm font-semibold">Ab €39,99</span>
                      </div>
                      <a href="/products?category=windows" class="block mt-4 text-center bg-gray-100 py-3 rounded-lg font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition">
                        <i class="fas fa-th mr-2"></i>Alle Windows Produkte
                      </a>
                    </div>
                    
                  </div>
                </div>
              </li>
              
            </ul>
          </div>
        </nav>
      </header>

      <!-- Hero Section -->
      <section class="hero-gradient py-20 relative overflow-hidden border-b border-gray-200">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            
            <!-- Left: Text Content -->
            <div class="z-10">
              <span class="text-brand-gold text-lg font-semibold mb-4 block">Günstige Software Lizenzen</span>
              <h1 class="hero-title text-5xl font-bold mb-6 text-gray-900">
                Original & Sofort <br>
                <span class="text-brand-navy">verfügbar</span>
              </h1>
              <p class="text-xl text-gray-600 mb-8 leading-relaxed">
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
              <div class="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <div class="aspect-video bg-gradient-to-br from-blue-50 to-yellow-50 rounded-xl flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-laptop-code text-8xl text-brand-navy opacity-20 mb-4"></i>
                    <p class="text-gray-400 text-sm">Hero Image Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <h4 class="font-bold text-gray-900">Sofortiger Versand</h4>
                <p class="text-sm text-gray-600">Lieferung per E-Mail</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="feature-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-900">100% Original</h4>
                <p class="text-sm text-gray-600">Geprüfte Lizenzen</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="feature-icon">
                <i class="fas fa-lock"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-900">Sichere Zahlung</h4>
                <p class="text-sm text-gray-600">SSL-verschlüsselt</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="feature-icon">
                <i class="fas fa-headset"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-900">24/7 Support</h4>
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
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Beliebte Kategorien</h2>
            <p class="text-gray-600 text-lg">Entdecken Sie unsere Top-Software-Kategorien</p>
          </div>

          <div class="grid grid-cols-3 md:grid-cols-6 gap-8">
            
            <a href="/products?category=windows" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-md group-hover:shadow-xl transition-all">
                <i class="fab fa-windows text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-gray-700 group-hover:text-brand-navy transition">Windows</h4>
            </a>

            <a href="/products?category=office" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-md group-hover:shadow-xl transition-all">
                <i class="fas fa-file-word text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-gray-700 group-hover:text-brand-navy transition">Office</h4>
            </a>

            <a href="/products?category=server" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-md group-hover:shadow-xl transition-all">
                <i class="fas fa-server text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-gray-700 group-hover:text-brand-navy transition">Server</h4>
            </a>

            <a href="/products?category=antivirus" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-md group-hover:shadow-xl transition-all">
                <i class="fas fa-shield-virus text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-gray-700 group-hover:text-brand-navy transition">Antivirus</h4>
            </a>

            <a href="/products?category=cad" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-md group-hover:shadow-xl transition-all">
                <i class="fas fa-drafting-compass text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-gray-700 group-hover:text-brand-navy transition">CAD</h4>
            </a>

            <a href="/products" class="category-circle text-center group">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-md group-hover:shadow-xl transition-all">
                <i class="fas fa-th text-white text-4xl"></i>
              </div>
              <h4 class="font-semibold text-gray-700 group-hover:text-brand-navy transition">Alle</h4>
            </a>

          </div>
        </div>
      </section>

      <!-- Deals of the Day -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center mb-12">
            <div>
              <h2 class="text-4xl font-bold text-gray-900 mb-2">Deals des Tages</h2>
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
                <i class="fab fa-windows text-8xl text-gray-900 opacity-20"></i>
              </div>
              <div class="p-6">
                <p class="text-sm text-gray-500 mb-2">Betriebssystem</p>
                <h3 class="font-bold text-lg text-gray-900 mb-2 line-clamp-2">Windows 11 Pro</h3>
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
                <button onclick="addToCart(1, 1, event)" class="w-full bg-brand-navy text-white py-3 rounded-lg hover:bg-brand-navy-dark transition font-semibold">
                  <i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb
                </button>
              </div>
            </div>

            <!-- Deal Product Card 2 -->
            <div class="product-card bg-white rounded-xl shadow-md overflow-hidden relative">
              <div class="sale-badge">-40%</div>
              <div class="aspect-square bg-gray-100 flex items-center justify-center p-8">
                <i class="fas fa-file-word text-8xl text-gray-900 opacity-20"></i>
              </div>
              <div class="p-6">
                <p class="text-sm text-gray-500 mb-2">Office Suite</p>
                <h3 class="font-bold text-lg text-gray-900 mb-2 line-clamp-2">Microsoft Office 2021 Pro Plus</h3>
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
                <button onclick="addToCart(2, 1, event)" class="w-full bg-brand-navy text-white py-3 rounded-lg hover:bg-brand-gold transition font-semibold">
                  <i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb
                </button>
              </div>
            </div>

            <!-- Deal Product Card 3 -->
            <div class="product-card bg-white rounded-xl shadow-md overflow-hidden relative">
              <div class="sale-badge">-50%</div>
              <div class="aspect-square bg-gray-100 flex items-center justify-center p-8">
                <i class="fas fa-shield-virus text-8xl text-gray-900 opacity-20"></i>
              </div>
              <div class="p-6">
                <p class="text-sm text-gray-500 mb-2">Sicherheit</p>
                <h3 class="font-bold text-lg text-gray-900 mb-2 line-clamp-2">Norton 360 Deluxe - 5 Geräte</h3>
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
                <button onclick="addToCart(3, 1, event)" class="w-full bg-brand-navy text-white py-3 rounded-lg hover:bg-brand-gold transition font-semibold">
                  <i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb
                </button>
              </div>
            </div>

            <!-- Deal Product Card 4 -->
            <div class="product-card bg-white rounded-xl shadow-md overflow-hidden relative">
              <div class="sale-badge">-30%</div>
              <div class="aspect-square bg-gray-100 flex items-center justify-center p-8">
                <i class="fas fa-server text-8xl text-gray-900 opacity-20"></i>
              </div>
              <div class="p-6">
                <p class="text-sm text-gray-500 mb-2">Server</p>
                <h3 class="font-bold text-lg text-gray-900 mb-2 line-clamp-2">Windows Server 2022 Standard</h3>
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
                <button onclick="addToCart(4, 1, event)" class="w-full bg-brand-navy text-white py-3 rounded-lg hover:bg-brand-gold transition font-semibold">
                  <i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- All Products Section - Dynamic from Database -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Alle Produkte</h2>
            <p class="text-xl text-gray-600">Entdecken Sie unser vollständiges Sortiment</p>
          </div>
          
          <div id="all-products-container" class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Products will be loaded here dynamically -->
            <div class="col-span-4 text-center py-12">
              <i class="fas fa-spinner fa-spin text-4xl text-brand-navy mb-4"></i>
              <p class="text-gray-600">Produkte werden geladen...</p>
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
              <h2 class="text-4xl font-bold text-gray-900 mb-6">
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
                    <h3 class="font-bold text-xl text-gray-900 mb-2">Welche Vorteile bringt das Upgrade wirklich?</h3>
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
                    <h3 class="font-bold text-xl text-gray-900 mb-2">Welche möglichen Nachteile sollte ich vorher kennen?</h3>
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
                    <h3 class="font-bold text-xl text-gray-900 mb-2">Ist mein PC überhaupt leistungsfähig genug?</h3>
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
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Warum SoftwareKing24?</h2>
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
              <h3 class="text-xl font-bold text-gray-900 mb-3">100% Original Lizenzen</h3>
              <p class="text-gray-600 leading-relaxed">
                Wir setzen ausschließlich auf geprüfte Software namhafter Hersteller. 
                Dadurch können Sie sicher sein, dass Installation und Aktivierung reibungslos funktionieren.
              </p>
            </div>

            <div class="text-center p-8 bg-gray-50 rounded-xl">
              <div class="feature-icon">
                <i class="fas fa-bolt"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Sofortige Lieferung</h3>
              <p class="text-gray-600 leading-relaxed">
                Dank unseres digitalen Lieferprozesses erhalten Sie Ihre Lizenz oft schon innerhalb 
                weniger Minuten per E-Mail. Keine Wartezeit, sofort einsatzbereit.
              </p>
            </div>

            <div class="text-center p-8 bg-gray-50 rounded-xl">
              <div class="feature-icon">
                <i class="fas fa-user-shield"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Persönlicher Support</h3>
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
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
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
                  <i class="fab fa-windows text-9xl text-gray-900/20"></i>
                </div>
              </div>
            </div>

            <!-- Server -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="order-2 md:order-1 bg-white rounded-2xl p-8 shadow-lg">
                <div class="aspect-video bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-xl flex items-center justify-center">
                  <i class="fas fa-server text-9xl text-gray-900/20"></i>
                </div>
              </div>
              <div class="order-1 md:order-2">
                <span class="inline-block bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Serverbetriebssysteme
                </span>
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
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
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
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
                  <i class="fas fa-file-word text-9xl text-gray-900/20"></i>
                </div>
              </div>
            </div>

            <!-- CAD Software -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="order-2 md:order-1 bg-white rounded-2xl p-8 shadow-lg">
                <div class="aspect-video bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-xl flex items-center justify-center">
                  <i class="fas fa-drafting-compass text-9xl text-gray-900/20"></i>
                </div>
              </div>
              <div class="order-1 md:order-2">
                <span class="inline-block bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  CAD Software
                </span>
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
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
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
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
                  <i class="fas fa-shield-virus text-9xl text-gray-900/20"></i>
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
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Häufig gestellte Fragen</h2>
            <p class="text-gray-600 text-lg">Alles, was Sie über unsere Software-Lizenzen wissen müssen</p>
          </div>

          <div class="space-y-4">
            
            <!-- FAQ Item 1 -->
            <div class="faq-item bg-gray-50 rounded-xl p-6">
              <div class="faq-question flex justify-between items-center" onclick="toggleFaq(1)">
                <h3 class="font-bold text-lg text-gray-900">Wie erhalte ich meine Software nach dem Kauf?</h3>
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
                <h3 class="font-bold text-lg text-gray-900">Sind die Lizenzen legal und original?</h3>
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
                <h3 class="font-bold text-lg text-gray-900">Kann ich die Software auf mehreren Geräten nutzen?</h3>
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
                <h3 class="font-bold text-lg text-gray-900">Was ist der Unterschied zwischen Retail und OEM-Lizenzen?</h3>
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
                <h3 class="font-bold text-lg text-gray-900">Bietet ihr auch Support bei der Installation?</h3>
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
                <h3 class="font-bold text-lg text-gray-900">Welche Zahlungsmethoden akzeptiert ihr?</h3>
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
                <h3 class="font-bold text-lg text-gray-900">Was passiert, wenn der Lizenzschlüssel nicht funktioniert?</h3>
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
                <h3 class="font-bold text-lg text-gray-900">Kann ich meine Lizenz zurückgeben oder umtauschen?</h3>
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

      <!-- Live Support & Contact Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">
              <i class="fas fa-headset text-brand-gold mr-3"></i>
              Brauchen Sie Hilfe? Wir sind für Sie da!
            </h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              Unser Support-Team steht Ihnen jederzeit zur Verfügung. Erstellen Sie ein Support-Ticket 
              oder chatten Sie direkt mit uns.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            <!-- Create Support Ticket Form -->
            <div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-brand-navy/10 rounded-full flex items-center justify-center mr-4">
                  <i class="fas fa-ticket-alt text-brand-navy text-xl"></i>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">Support-Ticket erstellen</h3>
                  <p class="text-gray-600 text-sm">Wir antworten innerhalb von 24 Stunden</p>
                </div>
              </div>

              <form id="ticketForm" class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="ticket_name"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none transition"
                    placeholder="Ihr vollständiger Name"
                  >
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    E-Mail <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="ticket_email"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none transition"
                    placeholder="ihre@email.de"
                  >
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Betreff <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="ticket_subject"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none transition"
                    placeholder="Kurze Beschreibung Ihres Problems"
                  >
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Kategorie <span class="text-red-500">*</span>
                  </label>
                  <select 
                    id="ticket_category"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none transition"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="general">Allgemeine Frage</option>
                    <option value="technical">Technisches Problem</option>
                    <option value="billing">Rechnung / Zahlung</option>
                    <option value="license">Lizenzschlüssel Problem</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Bestellnummer (optional)
                  </label>
                  <input 
                    type="text" 
                    id="ticket_order_id"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none transition"
                    placeholder="z.B. #12345"
                  >
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Nachricht <span class="text-red-500">*</span>
                  </label>
                  <textarea 
                    id="ticket_message"
                    required
                    rows="5"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none transition resize-none"
                    placeholder="Bitte beschreiben Sie Ihr Anliegen so detailliert wie möglich..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  class="w-full bg-brand-navy hover:bg-brand-navy/90 text-white py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <i class="fas fa-paper-plane"></i>
                  Ticket absenden
                </button>

                <div id="ticketStatus" class="hidden mt-4 p-4 rounded-lg"></div>
              </form>
            </div>

            <!-- Quick Contact & Live Chat -->
            <div class="space-y-6">
              
              <!-- Live Chat Card -->
              <div class="bg-gradient-to-br from-brand-navy to-brand-navy/90 rounded-2xl shadow-xl p-8 text-white">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <i class="fas fa-comments text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold">Live Chat</h3>
                    <p class="text-white/80 text-sm">Sofortige Antworten auf Ihre Fragen</p>
                  </div>
                </div>

                <div class="bg-white/10 rounded-xl p-6 mb-6 backdrop-blur-sm">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="relative">
                      <img src="https://ui-avatars.com/api/?name=Support+Team&background=D9A50B&color=fff" 
                           alt="Support" 
                           class="w-12 h-12 rounded-full border-2 border-white/20">
                      <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                      <div class="font-semibold">Support-Team</div>
                      <div class="text-xs text-white/60">● Online</div>
                    </div>
                  </div>
                  <p class="text-white/90 text-sm leading-relaxed">
                    Hallo! 👋 Haben Sie Fragen zu unseren Produkten oder benötigen Sie Hilfe bei einer Bestellung? 
                    Unser Team ist bereit, Ihnen zu helfen!
                  </p>
                </div>

                <button 
                  onclick="openLiveChat()" 
                  class="w-full bg-brand-gold hover:bg-brand-gold-dark text-white py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <i class="fas fa-comment-dots"></i>
                  Chat starten
                </button>
              </div>

              <!-- Contact Methods -->
              <div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
                <h3 class="text-xl font-bold text-gray-900 mb-6">Weitere Kontaktmöglichkeiten</h3>
                
                <div class="space-y-4">
                  <a href="tel:+4930123456789" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-brand-navy/5 transition group">
                    <div class="w-12 h-12 bg-brand-navy/10 rounded-full flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition">
                      <i class="fas fa-phone text-brand-navy group-hover:text-white"></i>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900">Telefon</div>
                      <div class="text-brand-navy">+49 30 123 456 789</div>
                    </div>
                  </a>

                  <a href="mailto:support@softwareking24.de" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-brand-navy/5 transition group">
                    <div class="w-12 h-12 bg-brand-navy/10 rounded-full flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition">
                      <i class="fas fa-envelope text-brand-navy group-hover:text-white"></i>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900">E-Mail</div>
                      <div class="text-brand-navy">support@softwareking24.de</div>
                    </div>
                  </a>

                  <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div class="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                      <i class="fas fa-clock text-brand-gold"></i>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900">Öffnungszeiten</div>
                      <div class="text-gray-600 text-sm">Mo-Fr: 9:00-18:00 Uhr</div>
                    </div>
                  </div>
                </div>
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
            <button class="bg-brand-gold hover:bg-brand-gold-dark text-white px-8 py-4 rounded-full font-semibold transition">
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

        // ============================================
        // SUPPORT TICKET FORM HANDLER
        // ============================================
        const ticketForm = document.getElementById('ticketForm');
        const ticketStatus = document.getElementById('ticketStatus');
        
        if (ticketForm) {
          ticketForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = ticketForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wird gesendet...';
            
            const formData = {
              name: document.getElementById('ticket_name').value,
              email: document.getElementById('ticket_email').value,
              subject: document.getElementById('ticket_subject').value,
              category: document.getElementById('ticket_category').value,
              order_id: document.getElementById('ticket_order_id').value || null,
              message: document.getElementById('ticket_message').value
            };
            
            try {
              const response = await fetch('/api/support/ticket', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
              });
              
              const result = await response.json();
              
              if (response.ok) {
                ticketStatus.className = 'mt-4 p-4 rounded-lg bg-green-50 border-2 border-green-200';
                ticketStatus.innerHTML = \`
                  <div class="flex items-start gap-3">
                    <i class="fas fa-check-circle text-green-600 text-2xl"></i>
                    <div>
                      <div class="font-bold text-green-900 mb-1">Ticket erfolgreich erstellt!</div>
                      <div class="text-green-800 text-sm mb-2">
                        Ihre Ticket-Nummer: <strong>\${result.ticket_number}</strong>
                      </div>
                      <div class="text-green-700 text-sm">
                        Wir haben Ihnen eine Bestätigungs-E-Mail gesendet und werden uns innerhalb von 24 Stunden bei Ihnen melden.
                      </div>
                    </div>
                  </div>
                \`;
                ticketStatus.classList.remove('hidden');
                ticketForm.reset();
                
                // Scroll to status message
                ticketStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              } else {
                throw new Error(result.error || 'Fehler beim Erstellen des Tickets');
              }
            } catch (error) {
              ticketStatus.className = 'mt-4 p-4 rounded-lg bg-red-50 border-2 border-red-200';
              ticketStatus.innerHTML = \`
                <div class="flex items-start gap-3">
                  <i class="fas fa-exclamation-circle text-red-600 text-2xl"></i>
                  <div>
                    <div class="font-bold text-red-900 mb-1">Fehler</div>
                    <div class="text-red-800 text-sm">\${error.message}</div>
                  </div>
                </div>
              \`;
              ticketStatus.classList.remove('hidden');
            } finally {
              submitButton.disabled = false;
              submitButton.innerHTML = originalButtonText;
            }
          });
        }
        
        // ============================================
        // LIVE CHAT HANDLER
        // ============================================
        window.openLiveChat = function() {
          // Show chat widget
          alert('Live Chat wird geöffnet...\\n\\nHinweis: Dies ist eine Basis-Integration. Sie können hier später ein echtes Live-Chat-System wie Tawk.to, Intercom, oder LiveChat integrieren.');
          
          // In production, you would integrate a real chat service like:
          // - Tawk.to (free)
          // - Intercom
          // - LiveChat
          // - Zendesk Chat
          // - Tidio
          
          // Example for Tawk.to integration (you'll need to register and get your widget code):
          /*
          if (!window.Tawk_API) {
            var Tawk_API = Tawk_API || {};
            var Tawk_LoadStart = new Date();
            (function(){
              var s1 = document.createElement("script");
              var s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          }
          Tawk_API.maximize();
          */
        };

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

        // ============================================
        // MULTILINGUAL SUPPORT
        // ============================================
        
        // Translation dictionary
        const translations = {
          de: {
            download_center: 'Download Center',
            faq: 'FAQ',
            contact: 'Kontakt',
            my_wishlist: 'Meine Wunschliste',
            manufacturers: 'Hersteller',
            about_us: 'Über uns',
            account: 'Konto',
            wishlist: 'Wunschliste',
            cart: 'Warenkorb',
            home: 'Startseite',
            search_placeholder: 'Suchen Sie nach Produkten, Kategorien...',
            buy_now: 'Jetzt kaufen',
            add_to_cart: 'In den Warenkorb',
            hero_title: 'Original & Sofort verfügbar',
            hero_subtitle: 'Windows 11, Microsoft Office 2024, Antivirus-Programme, Serverlösungen – direkt per E-Mail geliefert zu Top-Preisen.',
            shop_now: 'Jetzt Einkaufen',
            learn_more: 'Mehr Erfahren'
          },
          en: {
            download_center: 'Download Center',
            faq: 'FAQ',
            contact: 'Contact',
            my_wishlist: 'My Wishlist',
            manufacturers: 'Manufacturers',
            about_us: 'About Us',
            account: 'Account',
            wishlist: 'Wishlist',
            cart: 'Cart',
            home: 'Home',
            search_placeholder: 'Search for products, categories...',
            buy_now: 'Buy Now',
            add_to_cart: 'Add to Cart',
            hero_title: 'Original & Instantly Available',
            hero_subtitle: 'Windows 11, Microsoft Office 2024, Antivirus Programs, Server Solutions – delivered instantly via email at top prices.',
            shop_now: 'Shop Now',
            learn_more: 'Learn More'
          },
          fr: {
            download_center: 'Centre de Téléchargement',
            faq: 'FAQ',
            contact: 'Contact',
            my_wishlist: 'Ma Liste de Souhaits',
            manufacturers: 'Fabricants',
            about_us: 'À Propos',
            account: 'Compte',
            wishlist: 'Liste de Souhaits',
            cart: 'Panier',
            home: 'Accueil',
            search_placeholder: 'Rechercher des produits, catégories...',
            buy_now: 'Acheter Maintenant',
            add_to_cart: 'Ajouter au Panier',
            hero_title: 'Original & Disponible Instantanément',
            hero_subtitle: 'Windows 11, Microsoft Office 2024, Programmes Antivirus, Solutions Serveur – livrés instantanément par email aux meilleurs prix.',
            shop_now: 'Acheter Maintenant',
            learn_more: 'En Savoir Plus'
          },
          es: {
            download_center: 'Centro de Descargas',
            faq: 'FAQ',
            contact: 'Contacto',
            my_wishlist: 'Mi Lista de Deseos',
            manufacturers: 'Fabricantes',
            about_us: 'Sobre Nosotros',
            account: 'Cuenta',
            wishlist: 'Lista de Deseos',
            cart: 'Carrito',
            home: 'Inicio',
            search_placeholder: 'Buscar productos, categorías...',
            buy_now: 'Comprar Ahora',
            add_to_cart: 'Añadir al Carrito',
            hero_title: 'Original y Disponible Instantáneamente',
            hero_subtitle: 'Windows 11, Microsoft Office 2024, Programas Antivirus, Soluciones de Servidor – entregados instantáneamente por correo electrónico a los mejores precios.',
            shop_now: 'Comprar Ahora',
            learn_more: 'Más Información'
          },
          it: {
            download_center: 'Centro Download',
            faq: 'FAQ',
            contact: 'Contatto',
            my_wishlist: 'La Mia Lista dei Desideri',
            manufacturers: 'Produttori',
            about_us: 'Chi Siamo',
            account: 'Account',
            wishlist: 'Lista dei Desideri',
            cart: 'Carrello',
            home: 'Home',
            search_placeholder: 'Cerca prodotti, categorie...',
            buy_now: 'Acquista Ora',
            add_to_cart: 'Aggiungi al Carrello',
            hero_title: 'Originale e Disponibile Subito',
            hero_subtitle: 'Windows 11, Microsoft Office 2024, Programmi Antivirus, Soluzioni Server – consegnati istantaneamente via email ai migliori prezzi.',
            shop_now: 'Acquista Ora',
            learn_more: 'Scopri di Più'
          }
        };

        const languageNames = {
          de: 'Deutsch',
          en: 'English',
          fr: 'Français',
          es: 'Español',
          it: 'Italiano'
        };

        // Get current language from localStorage or default to 'de'
        let currentLanguage = localStorage.getItem('language') || 'de';

        // Function to switch language
        window.switchLanguage = function(lang) {
          currentLanguage = lang;
          localStorage.setItem('language', lang);
          
          // Update language text
          document.getElementById('current-language-text').textContent = languageNames[lang];
          
          // Update all translatable elements
          document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
              // Update the text content of the span inside the element
              const span = element.querySelector('span');
              if (span) {
                span.textContent = translations[lang][key];
              } else {
                element.textContent = translations[lang][key];
              }
            }
          });

          // Update placeholder
          const searchInput = document.querySelector('input[placeholder]');
          if (searchInput && translations[lang].search_placeholder) {
            searchInput.placeholder = translations[lang].search_placeholder;
          }

          // Update hero section
          const heroTitle = document.querySelector('.hero-title span');
          if (heroTitle && translations[lang].hero_title) {
            heroTitle.textContent = translations[lang].hero_title;
          }

          const heroSubtitle = document.querySelector('.hero-gradient p');
          if (heroSubtitle && translations[lang].hero_subtitle) {
            heroSubtitle.textContent = translations[lang].hero_subtitle;
          }

          // Close dropdown
          const langSwitcher = document.getElementById('language-switcher');
          if (langSwitcher) {
            langSwitcher.classList.remove('hover');
          }

          // Reload page to apply language to products (optional)
          // window.location.href = window.location.pathname + '?lang=' + lang;
        };

        // Initialize language on page load
        if (currentLanguage !== 'de') {
          switchLanguage(currentLanguage);
        }
      </script>

      ${AddToCartScript()}

      <script>
        // Load all products dynamically
        async function loadAllProducts() {
          try {
            const response = await fetch('/api/products');
            const data = await response.json();
            
            if (data.success && data.data && data.data.length > 0) {
              const container = document.getElementById('all-products-container');
              container.innerHTML = '';
              
              data.data.forEach(product => {
                const discountBadge = product.discount_percentage > 0 
                  ? \`<div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-\${Math.round(product.discount_percentage)}%</div>\`
                  : '';
                
                const price = product.discount_price > 0 
                  ? \`<div class="flex items-baseline gap-2 mb-4">
                      <span class="text-2xl font-bold text-brand-gold">€\${product.discount_price.toFixed(2)}</span>
                      <span class="text-sm text-gray-400 line-through">€\${product.base_price.toFixed(2)}</span>
                    </div>\`
                  : \`<div class="text-2xl font-bold text-brand-gold mb-4">€\${product.base_price.toFixed(2)}</div>\`;
                
                const productCard = \`
                  <div class="product-card bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-xl transition-all duration-300">
                    \${discountBadge}
                    <div class="aspect-square bg-gray-100 flex items-center justify-center p-8">
                      <img src="\${product.image_url}" alt="\${product.name}" class="max-w-full max-h-full object-contain" 
                           onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                      <i class="fas fa-box text-6xl text-gray-300" style="display:none;"></i>
                    </div>
                    <div class="p-6">
                      <p class="text-sm text-brand-navy font-semibold mb-2">\${product.category_name || 'Software'}</p>
                      <h3 class="font-bold text-lg text-gray-900 mb-2 line-clamp-2">\${product.name}</h3>
                      <p class="text-sm text-gray-600 mb-4 line-clamp-2">\${product.short_description || ''}</p>
                      \${price}
                      <button onclick="addToCart(\${product.id}, 1, event)" 
                              class="w-full bg-brand-navy text-white py-3 rounded-lg hover:bg-brand-navy-dark transition font-semibold">
                        <i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb
                      </button>
                    </div>
                  </div>
                \`;
                
                container.insertAdjacentHTML('beforeend', productCard);
              });
            } else {
              document.getElementById('all-products-container').innerHTML = 
                '<div class="col-span-4 text-center py-12"><p class="text-gray-600">Keine Produkte verfügbar</p></div>';
            }
          } catch (error) {
            console.error('Error loading products:', error);
            document.getElementById('all-products-container').innerHTML = 
              '<div class="col-span-4 text-center py-12"><p class="text-red-600">Fehler beim Laden der Produkte</p></div>';
          }
        }
        
        // Load products when page loads
        document.addEventListener('DOMContentLoaded', loadAllProducts);
      </script>
    </body>
    </html>
  `;
}
