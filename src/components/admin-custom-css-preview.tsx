import { html } from 'hono/html'

export function AdminCustomCSSPreview(cssData: any) {
  const cssCode = cssData?.css_code || ''
  const cssName = cssData?.name || 'CSS Preview'
  
  return html`<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Preview: ${cssName} - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy-ultra-dark: #0a1628;
            --navy-dark: #1a2a4e;
            --navy-medium: #2d3e6f;
            --navy-light: #435991;
            --gold: #d4af37;
            --gold-light: #e8c966;
            --gold-dark: #b8941f;
        }

        body {
            background: linear-gradient(135deg, var(--navy-ultra-dark) 0%, var(--navy-dark) 100%);
            min-height: 100vh;
        }

        .product-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .product-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }

        .btn-primary {
            background: var(--gold);
            color: var(--navy-dark);
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background: var(--gold-light);
            transform: translateY(-2px);
        }

        .gradient-luxury {
            background: linear-gradient(135deg, var(--navy-ultra-dark) 0%, var(--navy-dark) 50%, var(--navy-medium) 100%);
        }

        /* Animation utilities */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
            animation: fadeIn 0.6s ease;
        }
    </style>
    
    <!-- CUSTOM CSS FROM DATABASE -->
    <style id="custom-preview-css">
        ${cssCode}
    </style>
</head>
<body class="font-sans">
    <!-- Preview Header Banner -->
    <div class="bg-yellow-500 text-navy-dark py-3 px-4 text-center font-bold sticky top-0 z-50 shadow-lg">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fas fa-eye"></i>
                <span>CSS Preview Mode: <strong>${cssName}</strong></span>
            </div>
            <div class="flex gap-2">
                <button onclick="window.close()" class="bg-navy-dark hover:bg-navy-medium text-white px-4 py-1 rounded transition">
                    <i class="fas fa-times mr-1"></i> Schließen
                </button>
                <button onclick="window.history.back()" class="bg-navy-dark hover:bg-navy-medium text-white px-4 py-1 rounded transition">
                    <i class="fas fa-arrow-left mr-1"></i> Zurück
                </button>
            </div>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="bg-navy-dark border-b border-navy-light sticky top-12 z-40">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold text-gold">
                    <i class="fas fa-crown mr-2"></i>
                    SOFTWAREKING24
                </div>
                <div class="hidden md:flex items-center gap-6">
                    <a href="#" class="text-gray-300 hover:text-white transition">Produkte</a>
                    <a href="#" class="text-gray-300 hover:text-white transition">Angebote</a>
                    <a href="#" class="text-gray-300 hover:text-white transition">Support</a>
                    <a href="#" class="text-gray-300 hover:text-white transition">Kontakt</a>
                </div>
                <div class="flex items-center gap-3">
                    <button class="btn-primary">
                        <i class="fas fa-shopping-cart mr-2"></i>
                        Warenkorb (0)
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="gradient-luxury py-20 animate-fadeIn">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h1 class="text-5xl font-bold text-white mb-6">
                Original Software Lizenzen
                <span class="text-gold">bis zu 70% günstiger</span>
            </h1>
            <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Windows 11, Office 2024, Antivirus & mehr – sofort verfügbar, 100% legal und deutlich günstiger
            </p>
            <div class="flex gap-4 justify-center">
                <button class="btn-primary">
                    <i class="fas fa-shopping-bag mr-2"></i>
                    Jetzt einkaufen
                </button>
                <button class="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-navy-dark px-6 py-3 rounded-lg font-bold transition">
                    Top Angebote
                </button>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="text-center p-6 bg-gray-50 rounded-lg">
                    <div class="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-certificate text-gold text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-navy-dark mb-2">100% Original</h3>
                    <p class="text-gray-600 text-sm">Nur echte Lizenzen direkt vom Hersteller</p>
                </div>
                <div class="text-center p-6 bg-gray-50 rounded-lg">
                    <div class="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-bolt text-gold text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-navy-dark mb-2">Sofort-Download</h3>
                    <p class="text-gray-600 text-sm">Lizenzschlüssel per E-Mail innerhalb von Minuten</p>
                </div>
                <div class="text-center p-6 bg-gray-50 rounded-lg">
                    <div class="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-shield-alt text-gold text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-navy-dark mb-2">14 Tage Geld-zurück</h3>
                    <p class="text-gray-600 text-sm">Volle Garantie bei Problemen</p>
                </div>
                <div class="text-center p-6 bg-gray-50 rounded-lg">
                    <div class="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-headset text-gold text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-navy-dark mb-2">24/7 Support</h3>
                    <p class="text-gray-600 text-sm">Kostenloser deutscher Kundensupport</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Products Section -->
    <section class="py-16 gradient-luxury">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-white mb-4">
                    <i class="fas fa-fire text-gold mr-3"></i>
                    Bestseller – Die beliebtesten Produkte
                </h2>
                <p class="text-gray-300 text-lg">Die meistverkauften Software-Lizenzen unserer Kunden</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Product Card 1 -->
                <div class="product-card">
                    <div class="relative">
                        <img src="https://placehold.co/400x300/1a2a4e/d4af37?text=Windows+11+Pro" alt="Windows 11 Pro" class="w-full h-48 object-cover">
                        <span class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            -88%
                        </span>
                        <span class="absolute top-4 right-4 bg-gold text-navy-dark px-3 py-1 rounded-full text-sm font-bold">
                            NEU
                        </span>
                    </div>
                    <div class="p-6">
                        <div class="text-sm text-gray-500 mb-2">Microsoft</div>
                        <h3 class="text-xl font-bold text-navy-dark mb-2">Windows 11 Pro</h3>
                        <p class="text-gray-600 text-sm mb-4">Vollversion mit allen Features. Lebenslange Lizenz.</p>
                        <div class="flex items-center gap-2 mb-4">
                            <div class="flex text-yellow-500">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <span class="text-sm text-gray-600">(4.8) 245 Bewertungen</span>
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <span class="text-gray-400 line-through text-sm">159,99 €</span>
                                <span class="text-3xl font-bold text-green-600 ml-2">19,99 €</span>
                            </div>
                        </div>
                        <button class="btn-primary w-full">
                            <i class="fas fa-cart-plus mr-2"></i>
                            In den Warenkorb
                        </button>
                    </div>
                </div>

                <!-- Product Card 2 -->
                <div class="product-card">
                    <div class="relative">
                        <img src="https://placehold.co/400x300/d4af37/1a2a4e?text=Office+2024" alt="Office 2024" class="w-full h-48 object-cover">
                        <span class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            -88%
                        </span>
                        <span class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            <i class="fas fa-fire mr-1"></i> HOT
                        </span>
                    </div>
                    <div class="p-6">
                        <div class="text-sm text-gray-500 mb-2">Microsoft</div>
                        <h3 class="text-xl font-bold text-navy-dark mb-2">Office 2024 Professional Plus</h3>
                        <p class="text-gray-600 text-sm mb-4">Word, Excel, PowerPoint, Outlook & mehr</p>
                        <div class="flex items-center gap-2 mb-4">
                            <div class="flex text-yellow-500">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <span class="text-sm text-gray-600">(4.9) 389 Bewertungen</span>
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <span class="text-gray-400 line-through text-sm">199,99 €</span>
                                <span class="text-3xl font-bold text-green-600 ml-2">24,99 €</span>
                            </div>
                        </div>
                        <button class="btn-primary w-full">
                            <i class="fas fa-cart-plus mr-2"></i>
                            In den Warenkorb
                        </button>
                    </div>
                </div>

                <!-- Product Card 3 -->
                <div class="product-card">
                    <div class="relative">
                        <img src="https://placehold.co/400x300/2d3e6f/d4af37?text=Kaspersky" alt="Kaspersky" class="w-full h-48 object-cover">
                        <span class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            -67%
                        </span>
                    </div>
                    <div class="p-6">
                        <div class="text-sm text-gray-500 mb-2">Kaspersky</div>
                        <h3 class="text-xl font-bold text-navy-dark mb-2">Kaspersky Total Security</h3>
                        <p class="text-gray-600 text-sm mb-4">Kompletter Schutz für bis zu 10 Geräte</p>
                        <div class="flex items-center gap-2 mb-4">
                            <div class="flex text-yellow-500">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <span class="text-sm text-gray-600">(4.7) 312 Bewertungen</span>
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <span class="text-gray-400 line-through text-sm">89,99 €</span>
                                <span class="text-3xl font-bold text-green-600 ml-2">29,99 €</span>
                            </div>
                        </div>
                        <button class="btn-primary w-full">
                            <i class="fas fa-cart-plus mr-2"></i>
                            In den Warenkorb
                        </button>
                    </div>
                </div>
            </div>

            <div class="text-center mt-12">
                <button class="bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-lg transition shadow-lg">
                    Alle Produkte anzeigen
                    <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold text-navy-dark mb-6">
                Bereit für Ihre Software-Lizenz?
            </h2>
            <p class="text-xl text-gray-600 mb-8">
                Über 50.000 zufriedene Kunden vertrauen auf unsere Qualität
            </p>
            <div class="flex gap-4 justify-center">
                <button class="btn-primary text-lg">
                    <i class="fas fa-shopping-bag mr-2"></i>
                    Jetzt kaufen
                </button>
                <button class="bg-navy-dark hover:bg-navy-medium text-white px-8 py-4 rounded-lg font-bold transition">
                    <i class="fas fa-phone mr-2"></i>
                    Kontakt
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-navy-ultra-dark py-12">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 class="text-gold font-bold text-xl mb-4">SOFTWAREKING24</h3>
                    <p class="text-gray-400 text-sm">
                        Ihr zuverlässiger Partner für Software-Lizenzen seit 2020
                    </p>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Produkte</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" class="hover:text-gold transition">Windows Lizenzen</a></li>
                        <li><a href="#" class="hover:text-gold transition">Office Lizenzen</a></li>
                        <li><a href="#" class="hover:text-gold transition">Antivirus Software</a></li>
                        <li><a href="#" class="hover:text-gold transition">Adobe Software</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Support</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" class="hover:text-gold transition">FAQ</a></li>
                        <li><a href="#" class="hover:text-gold transition">Kontakt</a></li>
                        <li><a href="#" class="hover:text-gold transition">Versand & Zahlung</a></li>
                        <li><a href="#" class="hover:text-gold transition">Rückgabe</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Rechtliches</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" class="hover:text-gold transition">Impressum</a></li>
                        <li><a href="#" class="hover:text-gold transition">Datenschutz</a></li>
                        <li><a href="#" class="hover:text-gold transition">AGB</a></li>
                        <li><a href="#" class="hover:text-gold transition">Widerrufsrecht</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-navy-light pt-8 text-center text-gray-400 text-sm">
                <p>&copy; 2024 SOFTWAREKING24. Alle Rechte vorbehalten.</p>
            </div>
        </div>
    </footer>

    <script>
        // Add smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Log preview info
    </script>
</body>
</html>`
}
