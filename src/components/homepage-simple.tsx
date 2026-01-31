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
        
        /* Top Bar */
        .top-bar {
            background: var(--navy);
            color: white;
            padding: 10px 0;
            font-size: 14px;
        }
        
        .top-bar-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .top-bar-left {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .top-bar-link {
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .top-bar-link:hover {
            color: var(--gold);
        }
        
        /* Header */
        .header {
            background: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            color: var(--navy);
            text-decoration: none;
        }
        
        .search-bar {
            flex: 1;
            max-width: 500px;
            display: flex;
            gap: 10px;
        }
        
        .search-input {
            flex: 1;
            padding: 12px 20px;
            border: 2px solid var(--border);
            border-radius: 25px;
            font-size: 14px;
        }
        
        .search-btn {
            padding: 12px 30px;
            background: var(--navy);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
        }
        
        .search-btn:hover {
            background: var(--navy-medium);
        }
        
        .header-actions {
            display: flex;
            gap: 15px;
            align-items: center;
        }
        
        .cart-btn {
            padding: 12px 24px;
            background: var(--navy);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s;
        }
        
        .cart-btn:hover {
            background: var(--navy-medium);
            transform: translateY(-2px);
        }
        
        .cart-count {
            background: var(--gold);
            color: var(--navy);
            border-radius: 50%;
            padding: 2px 8px;
            font-size: 13px;
            font-weight: bold;
        }
        
        /* Navigation */
        .navigation {
            background: var(--light-gray);
            border-bottom: 1px solid var(--border);
        }
        
        .nav-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        #main-navigation {
            display: flex;
            list-style: none;
            gap: 5px;
        }
        
        #main-navigation a {
            color: var(--navy);
            text-decoration: none;
            padding: 15px 20px;
            display: block;
            font-weight: 500;
            transition: all 0.3s;
        }
        
        #main-navigation a:hover {
            background: var(--navy);
            color: white;
        }
        
        /* Dynamic Sections Container */
        #dynamic-sections {
            min-height: 400px;
        }
        
        /* Footer */
        .footer {
            background: var(--navy);
            color: white;
            padding: 40px 0 20px;
            margin-top: 60px;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
            margin-bottom: 30px;
        }
        
        .footer h3 {
            color: var(--gold);
            margin-bottom: 20px;
            font-size: 1.2rem;
        }
        
        .footer ul {
            list-style: none;
        }
        
        .footer a {
            color: white;
            text-decoration: none;
            display: block;
            margin-bottom: 10px;
        }
        
        .footer a:hover {
            color: var(--gold);
        }
        
        .footer-bottom {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
            font-size: 14px;
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
    </style>
</head>
<body>
    <!-- Top Bar -->
    <div class="top-bar">
        <div class="container">
            <div class="top-bar-content">
                <div class="top-bar-left">
                    <a href="tel:+4912345678" class="top-bar-link">
                        <i class="fas fa-phone"></i>
                        +49 (0) 123 456 789
                    </a>
                    <a href="mailto:info@softwareking24.de" class="top-bar-link">
                        <i class="fas fa-envelope"></i>
                        info@softwareking24.de
                    </a>
                </div>
                <div class="top-bar-right">
                    <a href="/login" class="top-bar-link">
                        <i class="fas fa-user"></i>
                        Login
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
        <div class="container">
            <!-- Top Section: Logo and Contact -->
            <div class="footer-top">
                <div class="footer-logo-section">
                    <img src="/static/logo-footer.png" alt="SOFTWAREKING24" style="height: 60px; width: auto; margin-bottom: 20px;">
                    <p style="margin-bottom: 10px;"><strong>24 / 7 EMAIL Support</strong></p>
                    <p style="font-size: 1.5rem; font-weight: bold; margin-bottom: 5px;">0800 000 812 4</p>
                    <p style="font-size: 0.9rem; opacity: 0.8;">Telefonische Beratung unter:</p>
                    <p style="font-size: 0.9rem; opacity: 0.8;">E-Mail Support <strong>24/7</strong></p>
                    
                    <div style="margin-top: 30px;">
                        <a href="/kontakt" style="display: inline-block; background: var(--gold); color: var(--navy); padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin: 5px;">E-Mail</a>
                        <a href="#" style="display: inline-block; background: var(--gold); color: var(--navy); padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin: 5px;">Callback Service</a>
                        <a href="/kontakt" style="display: inline-block; background: var(--gold); color: var(--navy); padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin: 5px;">Kontaktformular</a>
                        <a href="tel:+4908000008124" style="display: inline-block; background: var(--gold); color: var(--navy); padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin: 5px;">Telefon</a>
                    </div>
                </div>
            </div>

            <!-- Main Footer Links -->
            <div class="footer-content">
                <div>
                    <h3>Rechtliches</h3>
                    <ul>
                        <li><a href="/widerruf">Widerrufsrecht</a></li>
                        <li><a href="#" onclick="alert('Geld zurück Garantie'); return false;">Geld zurück Garantie</a></li>
                        <li><a href="/agb">Versand- & Zahlungsbedingungen</a></li>
                        <li><a href="/agb">AGB</a></li>
                        <li><a href="/datenschutz">Datenschutz</a></li>
                        <li><a href="/impressum">Impressum</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Mehr Über..</h3>
                    <ul>
                        <li><a href="/produkte?new=true">Neue Artikel</a></li>
                        <li><a href="/produkte?sale=true">Angebote</a></li>
                        <li><a href="/ueber-uns">Über uns</a></li>
                        <li><a href="#">Sitemap</a></li>
                        <li><a href="#" onclick="alert('Windows-Fehlermeldung Hilfe'); return false;">Windows-Fehlermeldung</a></li>
                        <li><a href="#" onclick="alert('Partnerprogramm - Kontaktieren Sie uns'); return false;">Partnerprogramm</a></li>
                        <li><a href="#" onclick="alert('Bestellstatus prüfen'); return false;">Bestellstatus</a></li>
                        <li><a href="#" onclick="alert('Sonderaktionen - Siehe Angebote'); return false;">Sonderaktionen</a></li>
                        <li><a href="#" onclick="alert('Supportende - Informationen'); return false;">Supportende</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Informationen</h3>
                    <ul>
                        <li><a href="/kontakt">Support & Service</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="#" onclick="alert('Umwelt-Information'); return false;">Umwelt</a></li>
                        <li><a href="#" onclick="alert('Karriere - Jobs verfügbar'); return false;">Karriere & Jobs</a></li>
                        <li><a href="#" onclick="alert('Großhandel - Kontaktieren Sie uns'); return false;">Großhandel</a></li>
                        <li><a href="#" onclick="alert('Händlerregistrierung - Formular'); return false;">Händlerregistrierung</a></li>
                        <li><a href="#">Installationsanleitungen</a></li>
                        <li><a href="#" onclick="alert('Tech Blog - Coming Soon'); return false;">Tech Blog</a></li>
                        <li><a href="#" onclick="alert('Gutschein Karten verfügbar'); return false;">Gutschein Karten</a></li>
                    </ul>
                </div>
            </div>

            <!-- Trust Badges & Certifications - Matching Reference -->
            <div class="footer-badges" style="display: flex; justify-content: center; align-items: center; gap: 20px; margin: 40px 0; flex-wrap: wrap;">
                <div style="background: white; padding: 20px 25px; border-radius: 10px; text-align: center; min-width: 130px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <i class="fas fa-shield-alt" style="font-size: 2.5rem; color: var(--navy); margin-bottom: 8px;"></i>
                    <p style="color: var(--navy); margin: 0; font-size: 0.85rem; font-weight: 600;">Geprüfte Qualität</p>
                </div>
                <div style="background: white; padding: 20px 25px; border-radius: 10px; text-align: center; min-width: 130px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <i class="fas fa-certificate" style="font-size: 2.5rem; color: var(--navy); margin-bottom: 8px;"></i>
                    <p style="color: var(--navy); margin: 0; font-size: 0.85rem; font-weight: 600;">Zertifiziert</p>
                </div>
                <div style="background: white; padding: 20px 25px; border-radius: 10px; text-align: center; min-width: 130px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <i class="fas fa-lock" style="font-size: 2.5rem; color: var(--navy); margin-bottom: 8px;"></i>
                    <p style="color: var(--navy); margin: 0; font-size: 0.85rem; font-weight: 600;">SSL Sicher</p>
                </div>
                <div style="background: white; padding: 20px 25px; border-radius: 10px; text-align: center; min-width: 130px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <i class="fas fa-award" style="font-size: 2.5rem; color: var(--navy); margin-bottom: 8px;"></i>
                    <p style="color: var(--navy); margin: 0; font-size: 0.85rem; font-weight: 600;">Ausgezeichnet</p>
                </div>
                <div style="background: white; padding: 20px 25px; border-radius: 10px; text-align: center; min-width: 130px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <i class="fas fa-star" style="font-size: 2.5rem; color: var(--gold); margin-bottom: 8px;"></i>
                    <p style="color: var(--navy); margin: 0; font-size: 0.85rem; font-weight: 600;">Top bewertet</p>
                </div>
                <div style="background: white; padding: 20px 25px; border-radius: 10px; text-align: center; min-width: 130px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <i class="fas fa-check-circle" style="font-size: 2.5rem; color: #00A859; margin-bottom: 8px;"></i>
                    <p style="color: var(--navy); margin: 0; font-size: 0.85rem; font-weight: 600;">Verifiziert</p>
                </div>
            </div>

            <!-- Windows Activation Buttons -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" onclick="alert('Windows 10 Aktivierung - Kontaktieren Sie den Support'); return false;" style="display: inline-block; background: var(--gold); color: var(--navy); padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin: 5px;">Windows 10 aktivieren</a>
                <a href="#" onclick="alert('Windows 11 Aktivierung - Kontaktieren Sie den Support'); return false;" style="display: inline-block; background: var(--gold); color: var(--navy); padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin: 5px;">Windows 11 aktivieren</a>
            </div>

            <!-- Partner Logos - Matching Reference Style -->
            <div class="footer-partners" style="display: flex; justify-content: center; align-items: center; gap: 30px; margin: 50px 0; flex-wrap: wrap;">
                <div style="background: white; padding: 20px 30px; border-radius: 10px; text-align: center; min-width: 140px;">
                    <i class="fab fa-microsoft" style="font-size: 2.5rem; color: #001f3f; margin-bottom: 10px;"></i>
                    <p style="font-size: 0.75rem; color: #001f3f; font-weight: 600; line-height: 1.3;">Microsoft<br/>Solutions Partner</p>
                </div>
                <div style="background: white; padding: 20px 30px; border-radius: 10px; text-align: center; min-width: 140px;">
                    <i class="fas fa-award" style="font-size: 2.5rem; color: #001f3f; margin-bottom: 10px;"></i>
                    <p style="font-size: 0.75rem; color: #001f3f; font-weight: 600; line-height: 1.3;">Autorisierter<br/>Reseller</p>
                </div>
                <div style="background: white; padding: 20px 30px; border-radius: 10px; text-align: center; min-width: 140px;">
                    <i class="fas fa-shield-virus" style="font-size: 2.5rem; color: #001f3f; margin-bottom: 10px;"></i>
                    <p style="font-size: 0.75rem; color: #001f3f; font-weight: 600; line-height: 1.3;">Bitdefender<br/>Reseller</p>
                </div>
                <div style="background: white; padding: 20px 30px; border-radius: 10px; text-align: center; min-width: 140px;">
                    <i class="fas fa-cloud" style="font-size: 2.5rem; color: #001f3f; margin-bottom: 10px;"></i>
                    <p style="font-size: 0.75rem; color: #001f3f; font-weight: 600; line-height: 1.3;">Cloud<br/>Services</p>
                </div>
                <div style="background: white; padding: 20px 30px; border-radius: 10px; text-align: center; min-width: 140px;">
                    <i class="fas fa-film" style="font-size: 2.5rem; color: #001f3f; margin-bottom: 10px;"></i>
                    <p style="font-size: 0.75rem; color: #001f3f; font-weight: 600; line-height: 1.3;">Wondershare<br/>Partner</p>
                </div>
                <div style="background: white; padding: 20px 30px; border-radius: 10px; text-align: center; min-width: 140px;">
                    <i class="fas fa-server" style="font-size: 2.5rem; color: #001f3f; margin-bottom: 10px;"></i>
                    <p style="font-size: 0.75rem; color: #001f3f; font-weight: 600; line-height: 1.3;">Acronis<br/>Authorized Partner</p>
                </div>
            </div>

            <!-- Reviews & Payment Methods -->
            <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; margin: 10px;">
                    <i class="fas fa-star" style="color: var(--gold);"></i>
                    <i class="fas fa-star" style="color: var(--gold);"></i>
                    <i class="fas fa-star" style="color: var(--gold);"></i>
                    <i class="fas fa-star" style="color: var(--gold);"></i>
                    <i class="fas fa-star" style="color: var(--gold);"></i>
                    <span style="margin-left: 10px; font-weight: bold;">5120 Bewertungen auf ProvenExpert.com</span>
                </div>
            </div>

            <!-- Payment Methods -->
            <div class="footer-payment" style="text-align: center; margin: 30px 0;">
                <p style="margin-bottom: 15px; font-weight: bold;">Zahlungsmöglichkeiten</p>
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; align-items: center;">
                    <i class="fab fa-cc-visa" style="font-size: 2.5rem; opacity: 0.8;"></i>
                    <i class="fab fa-cc-mastercard" style="font-size: 2.5rem; opacity: 0.8;"></i>
                    <i class="fab fa-cc-paypal" style="font-size: 2.5rem; opacity: 0.8;"></i>
                    <i class="fab fa-cc-amex" style="font-size: 2.5rem; opacity: 0.8;"></i>
                    <i class="fas fa-university" style="font-size: 2rem; opacity: 0.8;"></i>
                    <i class="fas fa-money-bill-wave" style="font-size: 2rem; opacity: 0.8;"></i>
                </div>
            </div>

            <!-- Categories Section -->
            <div class="footer-categories" style="margin: 40px 0; padding: 30px 0; border-top: 1px solid rgba(255,255,255,0.2); border-bottom: 1px solid rgba(255,255,255,0.2);">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px;">
                    <div>
                        <h4 style="color: var(--gold); margin-bottom: 15px;">Top-Kategorien</h4>
                        <ul style="list-style: none; padding: 0;">
                            <li><a href="/produkte?category=bitdefender" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Bitdefender</a></li>
                            <li><a href="/produkte?category=windows" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Windows Betriebssysteme</a></li>
                            <li><a href="/produkte?category=office" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Microsoft Office Programme</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: var(--gold); margin-bottom: 15px;">Top-Produkte</h4>
                        <ul style="list-style: none; padding: 0;">
                            <li><a href="/produkte" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Windows 10 Professional</a></li>
                            <li><a href="/produkte" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Windows 11 Professional</a></li>
                            <li><a href="/produkte" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Microsoft Office Professional Plus</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: var(--gold); margin-bottom: 15px;">Bestseller</h4>
                        <ul style="list-style: none; padding: 0;">
                            <li><a href="/produkte?bestseller=true" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Acronis True Image</a></li>
                            <li><a href="/produkte?bestseller=true" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Bitdefender Internet Security</a></li>
                            <li><a href="/produkte?bestseller=true" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Microsoft SQL Server</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: var(--gold); margin-bottom: 15px;">Top-Marken</h4>
                        <ul style="list-style: none; padding: 0;">
                            <li><a href="/produkte?brand=microsoft" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Microsoft</a></li>
                            <li><a href="/produkte?brand=kaspersky" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Kaspersky</a></li>
                            <li><a href="/produkte?brand=bitdefender" style="color: white; opacity: 0.8; text-decoration: none; line-height: 2;">Bitdefender</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Social Media & Copyright -->
            <div class="footer-bottom" style="text-align: center; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.2);">
                <div style="margin-bottom: 25px;">
                    <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.3rem; margin: 5px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='var(--navy)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.3rem; margin: 5px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='var(--navy)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-twitter"></i></a>
                    <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.3rem; margin: 5px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='var(--navy)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-instagram"></i></a>
                    <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.3rem; margin: 5px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='var(--navy)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-youtube"></i></a>
                    <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.3rem; margin: 5px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='var(--navy)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-whatsapp"></i></a>
                    <a href="#" style="display: inline-block; width: 45px; height: 45px; line-height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; color: white; font-size: 1.3rem; margin: 5px; transition: all 0.3s;" onmouseover="this.style.background='var(--gold)'; this.style.color='var(--navy)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'"><i class="fab fa-discord"></i></a>
                </div>
                <p style="opacity: 0.7; font-size: 0.9rem; line-height: 1.6; max-width: 900px; margin: 0 auto 15px;">Alle Preise in Euro inkl. der gesetzlichen Mehrwertsteuer, ggf. zzgl. Versandkosten und ggf. Nachnahmegebühren, wenn nicht anders beschrieben.</p>
                <p style="opacity: 0.7; font-size: 0.9rem; margin: 0 0 20px 0;">Liefergebiet: Deutschland Copyright © 2017 - 2026 SOFTWAREKING24 Support GmbH & Co. KG - Alle Rechte vorbehalten!</p>
                <p style="margin: 0; font-weight: bold; font-size: 0.95rem;">&copy; 2024 SOFTWAREKING24. Alle Rechte vorbehalten.</p>
            </div>
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
                nav.innerHTML = menuItems.map(item => \`
                    <li>
                        <a href="\${item.url}">\${item.title}</a>
                    </li>
                \`).join('');
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
