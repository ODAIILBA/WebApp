export const HomepagePrestaShop = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SoftwareKing24 - Original Software zu unschlagbaren Preisen</title>
        <meta name="description" content="Kaufen Sie Original Microsoft Software günstig. Windows 11, Office 2024, Server - Sofortiger Download, lebenslange Lizenz, 100% legal."/>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
        <style>
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            .hover-lift:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            }
            .gradient-text {
                background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .badge-pulse {
                animation: pulse 2s infinite;
            }
        </style>
    </head>
    <body class="bg-gray-50">
        
        <!-- Top Banner -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 text-center text-sm">
            <div class="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-6">
                <span><i class="fas fa-truck mr-2"></i>Kostenloser Sofort-Download</span>
                <span><i class="fas fa-shield-alt mr-2"></i>100% Original & Legal</span>
                <span><i class="fas fa-headset mr-2"></i>24/7 Support</span>
                <span><i class="fas fa-gift mr-2"></i>Spare bis zu 70% - Nur heute!</span>
            </div>
        </div>

        <!-- Header -->
        <header class="bg-white shadow-md sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4">
                <!-- Top Header -->
                <div class="border-b border-gray-200 py-2">
                    <div class="flex justify-between items-center text-sm">
                        <div class="flex items-center space-x-4 text-gray-600">
                            <span><i class="fas fa-phone mr-1"></i>+49 123 456789</span>
                            <span><i class="fas fa-envelope mr-1"></i>[email protected]</span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <a href="/warenkorb" class="text-gray-600 hover:text-blue-600 transition relative">
                                <i class="fas fa-shopping-cart mr-1"></i>Warenkorb 
                                <span class="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs ml-1" data-cart-count>0</span>
                            </a>
                            <a href="/login" class="text-gray-600 hover:text-blue-600"><i class="fas fa-user mr-1"></i>Anmelden</a>
                            <button class="text-gray-600 hover:text-blue-600"><i class="fas fa-globe mr-1"></i>DE / EN</button>
                        </div>
                    </div>
                </div>

                <!-- Main Header -->
                <div class="flex items-center justify-between py-4">
                    <a href="/" class="flex items-center space-x-3">
                        <img src="/static/logo.png" alt="SoftwareKing24" class="h-16" />
                    </a>

                    <!-- Search Bar -->
                    <div class="flex-1 max-w-2xl mx-8">
                        <div class="relative">
                            <input 
                                type="text" 
                                id="global-search"
                                placeholder="Windows 11, Office 2024, Server, Antivirus..." 
                                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-32"
                            />
                            <button onclick="performSearch()" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-purple-700">
                                <i class="fas fa-search mr-2"></i>Suchen
                            </button>
                        </div>
                    </div>

                    <!-- Cart & User -->
                    <div class="flex items-center space-x-4">
                        <a href="/warenkorb" class="relative">
                            <i class="fas fa-shopping-cart text-3xl text-gray-700 hover:text-blue-600"></i>
                            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold" data-cart-count>0</span>
                        </a>
                        <div class="text-right">
                            <div class="text-xs text-gray-500">Mein Konto</div>
                            <a href="/login" class="text-sm font-semibold text-gray-700 hover:text-blue-600">Anmelden</a>
                        </div>
                    </div>
                </div>

                <!-- Navigation Menu -->
                <nav class="border-t border-gray-200">
                    <ul class="flex items-center space-x-1">
                        <li class="relative group">
                            <a href="/produkte" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-semibold">
                                <i class="fas fa-th-large mr-2"></i>Alle Produkte
                            </a>
                        </li>
                        <li class="relative group">
                            <a href="/produkte?category=Windows" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                                <i class="fab fa-windows mr-2"></i>Windows
                                <i class="fas fa-chevron-down ml-2 text-xs"></i>
                            </a>
                            <div class="absolute left-0 top-full mt-0 w-64 bg-white shadow-xl rounded-lg hidden group-hover:block z-50 border border-gray-200">
                                <div class="p-4 space-y-2">
                                    <a href="/produkte?search=Windows 11" class="block px-3 py-2 hover:bg-blue-50 rounded">Windows 11 Professional</a>
                                    <a href="/produkte?search=Windows 11 Home" class="block px-3 py-2 hover:bg-blue-50 rounded">Windows 11 Home</a>
                                    <a href="/produkte?search=Windows 10" class="block px-3 py-2 hover:bg-blue-50 rounded">Windows 10 Professional</a>
                                    <a href="/produkte?search=Windows Server" class="block px-3 py-2 hover:bg-blue-50 rounded">Windows Server</a>
                                </div>
                            </div>
                        </li>
                        <li class="relative group">
                            <a href="/produkte?category=Office" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                                <i class="fas fa-file-word mr-2"></i>Microsoft Office
                                <i class="fas fa-chevron-down ml-2 text-xs"></i>
                            </a>
                            <div class="absolute left-0 top-full mt-0 w-64 bg-white shadow-xl rounded-lg hidden group-hover:block z-50 border border-gray-200">
                                <div class="p-4 space-y-2">
                                    <a href="/produkte?search=Office 2024" class="block px-3 py-2 hover:bg-blue-50 rounded">Office 2024</a>
                                    <a href="/produkte?search=Office 2021" class="block px-3 py-2 hover:bg-blue-50 rounded">Office 2021</a>
                                    <a href="/produkte?search=Office 2019" class="block px-3 py-2 hover:bg-blue-50 rounded">Office 2019</a>
                                    <a href="/produkte?search=Office 365" class="block px-3 py-2 hover:bg-blue-50 rounded">Microsoft 365</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="/produkte?category=Server" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                                <i class="fas fa-server mr-2"></i>Server
                            </a>
                        </li>
                        <li>
                            <a href="/produkte?category=Antivirus" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                                <i class="fas fa-shield-virus mr-2"></i>Antivirus
                            </a>
                        </li>
                        <li class="ml-auto">
                            <a href="#deals" class="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition font-bold badge-pulse">
                                <i class="fas fa-fire mr-2"></i>Angebote -70%
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

        <!-- Hero Slider -->
        <section class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="text-white">
                        <div class="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                            <i class="fas fa-bolt mr-2"></i>FLASH SALE - Nur heute!
                        </div>
                        <h1 class="text-5xl font-bold mb-6 leading-tight">
                            Original Software<br/>
                            <span class="text-yellow-300">bis zu 70% günstiger</span>
                        </h1>
                        <p class="text-xl mb-8 text-blue-100">
                            Windows 11, Office 2024, Server - Sofortiger Download, lebenslange Lizenz, 100% legal & sicher
                        </p>
                        <div class="flex space-x-4">
                            <a href="/produkte" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition inline-flex items-center">
                                <i class="fas fa-shopping-bag mr-2"></i>Jetzt einkaufen
                            </a>
                            <a href="#bestsellers" class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition inline-flex items-center">
                                <i class="fas fa-star mr-2"></i>Bestseller ansehen
                            </a>
                        </div>
                        <div class="mt-8 flex items-center space-x-8 text-sm">
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-300 mr-2"></i>
                                Sofort-Download
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-300 mr-2"></i>
                                Sichere Zahlung
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-300 mr-2"></i>
                                14 Tage Geld-zurück
                            </div>
                        </div>
                    </div>
                    <div class="relative">
                        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" alt="Software" class="rounded-2xl shadow-2xl" />
                        <div class="absolute -bottom-4 -left-4 bg-yellow-400 text-gray-900 p-6 rounded-xl shadow-xl">
                            <div class="text-3xl font-bold">70%</div>
                            <div class="text-sm font-semibold">RABATT</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Trust Badges -->
        <section class="bg-white py-8 border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-shield-alt text-blue-600 text-2xl"></i>
                        </div>
                        <h4 class="font-bold text-gray-800">100% Original</h4>
                        <p class="text-sm text-gray-600">Direkt vom Hersteller</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-download text-green-600 text-2xl"></i>
                        </div>
                        <h4 class="font-bold text-gray-800">Sofort-Download</h4>
                        <p class="text-sm text-gray-600">Innerhalb von Minuten</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-infinity text-purple-600 text-2xl"></i>
                        </div>
                        <h4 class="font-bold text-gray-800">Lebenslange Lizenz</h4>
                        <p class="text-sm text-gray-600">Keine Abo-Kosten</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-headset text-yellow-600 text-2xl"></i>
                        </div>
                        <h4 class="font-bold text-gray-800">24/7 Support</h4>
                        <p class="text-sm text-gray-600">Immer für Sie da</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Categories -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">Kategorien durchstöbern</h2>
                    <p class="text-gray-600 text-lg">Finden Sie die perfekte Software für Ihre Bedürfnisse</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <a href="/produkte?category=Windows" class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center hover-lift">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fab fa-windows text-blue-600 text-3xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">Windows</h3>
                        <p class="text-sm text-gray-600">15 Produkte</p>
                    </a>
                    <a href="/produkte?category=Office" class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center hover-lift">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-file-word text-green-600 text-3xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">Office</h3>
                        <p class="text-sm text-gray-600">25 Produkte</p>
                    </a>
                    <a href="/produkte?category=Server" class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center hover-lift">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-server text-purple-600 text-3xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">Server</h3>
                        <p class="text-sm text-gray-600">12 Produkte</p>
                    </a>
                    <a href="/produkte?category=Antivirus" class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center hover-lift">
                        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-shield-virus text-red-600 text-3xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">Antivirus</h3>
                        <p class="text-sm text-gray-600">8 Produkte</p>
                    </a>
                    <a href="/produkte?category=Adobe" class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center hover-lift">
                        <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-image text-pink-600 text-3xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">Adobe</h3>
                        <p class="text-sm text-gray-600">10 Produkte</p>
                    </a>
                    <a href="/produkte" class="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-xl shadow-md hover:shadow-xl transition text-center hover-lift text-white">
                        <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-th text-white text-3xl"></i>
                        </div>
                        <h3 class="font-bold mb-2">Alle Kategorien</h3>
                        <p class="text-sm text-blue-100">Alle ansehen</p>
                    </a>
                </div>
            </div>
        </section>

        <!-- Flash Deals Countdown -->
        <section id="deals" class="py-16 bg-gradient-to-r from-red-600 to-pink-600">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center text-white mb-12">
                    <div class="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold mb-4">
                        <i class="fas fa-fire mr-2"></i>FLASH SALE
                    </div>
                    <h2 class="text-4xl font-bold mb-4">Angebote enden in:</h2>
                    <div class="flex justify-center space-x-4 mb-6">
                        <div class="bg-white bg-opacity-20 backdrop-blur px-6 py-4 rounded-lg">
                            <div class="text-4xl font-bold">12</div>
                            <div class="text-sm">Stunden</div>
                        </div>
                        <div class="bg-white bg-opacity-20 backdrop-blur px-6 py-4 rounded-lg">
                            <div class="text-4xl font-bold">34</div>
                            <div class="text-sm">Minuten</div>
                        </div>
                        <div class="bg-white bg-opacity-20 backdrop-blur px-6 py-4 rounded-lg">
                            <div class="text-4xl font-bold">56</div>
                            <div class="text-sm">Sekunden</div>
                        </div>
                    </div>
                    <p class="text-xl text-red-100">Spare bis zu 70% auf ausgewählte Produkte!</p>
                </div>
                <div id="flash-deals" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Flash deal products will be loaded here -->
                </div>
            </div>
        </section>

        <!-- Bestsellers -->
        <section id="bestsellers" class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between items-center mb-12">
                    <div>
                        <h2 class="text-4xl font-bold text-gray-800 mb-2">
                            <i class="fas fa-star text-yellow-500 mr-3"></i>Bestseller
                        </h2>
                        <p class="text-gray-600 text-lg">Die beliebtesten Produkte unserer Kunden</p>
                    </div>
                    <a href="/produkte?sort=bestsellers" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold">
                        Alle ansehen <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div id="bestsellers-products" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Bestseller products will be loaded here -->
                </div>
            </div>
        </section>

        <!-- Why Choose Us -->
        <section class="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">Warum SoftwareKing24?</h2>
                    <p class="text-gray-600 text-lg">Über 50.000 zufriedene Kunden vertrauen uns</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="bg-white p-8 rounded-2xl shadow-lg text-center hover-lift">
                        <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-certificate text-white text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-3">100% Legal & Original</h3>
                        <p class="text-gray-600">Alle unsere Produkte sind zu 100% legal und stammen direkt vom Hersteller. Garantiert!</p>
                    </div>
                    <div class="bg-white p-8 rounded-2xl shadow-lg text-center hover-lift">
                        <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-bolt text-white text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-3">Sofortiger Download</h3>
                        <p class="text-gray-600">Erhalten Sie Ihre Lizenz sofort nach dem Kauf per E-Mail. Keine Wartezeit!</p>
                    </div>
                    <div class="bg-white p-8 rounded-2xl shadow-lg text-center hover-lift">
                        <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-euro-sign text-white text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-3">Beste Preise</h3>
                        <p class="text-gray-600">Sparen Sie bis zu 70% gegenüber dem Hersteller. Garantiert günstigste Preise!</p>
                    </div>
                    <div class="bg-white p-8 rounded-2xl shadow-lg text-center hover-lift">
                        <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-users text-white text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-3">50.000+ Kunden</h3>
                        <p class="text-gray-600">Tausende zufriedene Kunden vertrauen auf unsere Qualität und Service.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- New Arrivals -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between items-center mb-12">
                    <div>
                        <h2 class="text-4xl font-bold text-gray-800 mb-2">
                            <i class="fas fa-sparkles text-purple-600 mr-3"></i>Neu eingetroffen
                        </h2>
                        <p class="text-gray-600 text-lg">Die neuesten Produkte in unserem Sortiment</p>
                    </div>
                    <a href="/produkte?sort=newest" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold">
                        Alle ansehen <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div id="new-arrivals" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- New arrival products will be loaded here -->
                </div>
            </div>
        </section>

        <!-- Newsletter -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <div class="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-12">
                    <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-envelope text-blue-600 text-3xl"></i>
                    </div>
                    <h2 class="text-4xl font-bold text-white mb-4">Bleiben Sie auf dem Laufenden!</h2>
                    <p class="text-xl text-blue-100 mb-8">Abonnieren Sie unseren Newsletter und erhalten Sie exklusive Angebote und 10% Rabatt auf Ihre erste Bestellung!</p>
                    <form class="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                        <input 
                            type="email" 
                            placeholder="Ihre E-Mail-Adresse" 
                            class="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                        />
                        <button type="submit" class="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition">
                            <i class="fas fa-paper-plane mr-2"></i>Abonnieren
                        </button>
                    </form>
                    <p class="text-sm text-blue-100 mt-4">
                        <i class="fas fa-check-circle mr-2"></i>Keine Spam-Mails. Abmeldung jederzeit möglich.
                    </p>
                </div>
            </div>
        </section>

        <!-- Customer Reviews -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">
                        <i class="fas fa-comments text-blue-600 mr-3"></i>Was unsere Kunden sagen
                    </h2>
                    <p class="text-gray-600 text-lg">Über 10.000 begeisterte Bewertungen</p>
                    <div class="flex justify-center items-center space-x-2 mt-4">
                        <div class="flex text-yellow-400 text-2xl">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <span class="text-gray-600 text-xl font-bold">4.9/5.0</span>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg">
                        <div class="flex items-center mb-4">
                            <img src="https://ui-avatars.com/api/?name=Max+Mueller&background=2563eb&color=fff" alt="Max" class="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h4 class="font-bold text-gray-800">Max Müller</h4>
                                <div class="flex text-yellow-400">
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-700 italic">"Schnelle Lieferung, super Preis! Windows 11 Pro funktioniert einwandfrei. Kann ich nur empfehlen!"</p>
                        <p class="text-sm text-gray-500 mt-4">Vor 2 Tagen</p>
                    </div>
                    <div class="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg">
                        <div class="flex items-center mb-4">
                            <img src="https://ui-avatars.com/api/?name=Anna+Schmidt&background=7c3aed&color=fff" alt="Anna" class="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h4 class="font-bold text-gray-800">Anna Schmidt</h4>
                                <div class="flex text-yellow-400">
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-700 italic">"Office 2024 zum halben Preis! Lizenzschlüssel kam sofort per Mail. Alles top!"</p>
                        <p class="text-sm text-gray-500 mt-4">Vor 5 Tagen</p>
                    </div>
                    <div class="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg">
                        <div class="flex items-center mb-4">
                            <img src="https://ui-avatars.com/api/?name=Thomas+Weber&background=059669&color=fff" alt="Thomas" class="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h4 class="font-bold text-gray-800">Thomas Weber</h4>
                                <div class="flex text-yellow-400">
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                    <i class="fas fa-star text-sm"></i>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-700 italic">"Sehr seriöser Shop! Support antwortet schnell. Habe schon mehrfach hier gekauft."</p>
                        <p class="text-sm text-gray-500 mt-4">Vor 1 Woche</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Payment & Security -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800 mb-6">Sichere Zahlung & Datenschutz</h2>
                        <div class="space-y-4">
                            <div class="flex items-start">
                                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                    <i class="fas fa-lock text-green-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="font-bold text-gray-800 mb-1">SSL-Verschlüsselung</h3>
                                    <p class="text-gray-600">Alle Daten werden verschlüsselt übertragen</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                    <i class="fas fa-shield-alt text-blue-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="font-bold text-gray-800 mb-1">DSGVO-konform</h3>
                                    <p class="text-gray-600">Voller Datenschutz nach EU-Recht</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                    <i class="fas fa-credit-card text-purple-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="font-bold text-gray-800 mb-1">Sichere Zahlungsmethoden</h3>
                                    <p class="text-gray-600">Kreditkarte, PayPal, Überweisung</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 class="text-xl font-bold text-gray-800 mb-6">Wir akzeptieren:</h3>
                        <div class="grid grid-cols-3 gap-6">
                            <div class="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg">
                                <i class="fab fa-cc-visa text-5xl text-blue-600"></i>
                            </div>
                            <div class="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg">
                                <i class="fab fa-cc-mastercard text-5xl text-red-600"></i>
                            </div>
                            <div class="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg">
                                <i class="fab fa-cc-amex text-5xl text-blue-700"></i>
                            </div>
                            <div class="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg">
                                <i class="fab fa-cc-paypal text-5xl text-blue-500"></i>
                            </div>
                            <div class="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg">
                                <i class="fas fa-university text-5xl text-gray-600"></i>
                            </div>
                            <div class="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg">
                                <i class="fab fa-stripe text-5xl text-purple-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="py-16 bg-white">
            <div class="max-w-4xl mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">Häufig gestellte Fragen</h2>
                    <p class="text-gray-600 text-lg">Alles, was Sie wissen müssen</p>
                </div>
                <div class="space-y-4">
                    <details class="bg-gray-50 p-6 rounded-xl cursor-pointer">
                        <summary class="font-bold text-gray-800 text-lg">Sind die Lizenzen legal?</summary>
                        <p class="mt-4 text-gray-600">Ja, alle unsere Lizenzen sind 100% legal und stammen direkt vom Hersteller. Wir sind autorisierter Händler.</p>
                    </details>
                    <details class="bg-gray-50 p-6 rounded-xl cursor-pointer">
                        <summary class="font-bold text-gray-800 text-lg">Wie schnell erhalte ich meinen Lizenzschlüssel?</summary>
                        <p class="mt-4 text-gray-600">Nach Zahlungseingang erhalten Sie Ihren Lizenzschlüssel sofort per E-Mail. In der Regel innerhalb weniger Minuten.</p>
                    </details>
                    <details class="bg-gray-50 p-6 rounded-xl cursor-pointer">
                        <summary class="font-bold text-gray-800 text-lg">Kann ich die Software mehrmals installieren?</summary>
                        <p class="mt-4 text-gray-600">Das hängt vom Lizenztyp ab. Retail-Lizenzen können auf einem neuen Gerät reaktiviert werden.</p>
                    </details>
                    <details class="bg-gray-50 p-6 rounded-xl cursor-pointer">
                        <summary class="font-bold text-gray-800 text-lg">Was passiert bei Problemen?</summary>
                        <p class="mt-4 text-gray-600">Unser Support-Team hilft Ihnen gerne weiter. 14 Tage Geld-zurück-Garantie bei Problemen.</p>
                    </details>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <img src="/static/logo.png" alt="SoftwareKing24" class="h-12 mb-4 brightness-0 invert" />
                        <p class="text-gray-400 mb-4">Ihr vertrauenswürdiger Partner für Original-Software zu günstigen Preisen.</p>
                        <div class="flex space-x-3">
                            <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg mb-4">Kategorien</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/produkte?category=Windows" class="hover:text-white transition">Windows</a></li>
                            <li><a href="/produkte?category=Office" class="hover:text-white transition">Microsoft Office</a></li>
                            <li><a href="/produkte?category=Server" class="hover:text-white transition">Server</a></li>
                            <li><a href="/produkte?category=Antivirus" class="hover:text-white transition">Antivirus</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg mb-4">Kundenservice</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/kontakt" class="hover:text-white transition">Kontakt</a></li>
                            <li><a href="/hilfe" class="hover:text-white transition">Hilfe & Support</a></li>
                            <li><a href="/versand" class="hover:text-white transition">Versand & Lieferung</a></li>
                            <li><a href="/retoure" class="hover:text-white transition">Rückgabe</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg mb-4">Rechtliches</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/agb" class="hover:text-white transition">AGB</a></li>
                            <li><a href="/datenschutz" class="hover:text-white transition">Datenschutz</a></li>
                            <li><a href="/impressum" class="hover:text-white transition">Impressum</a></li>
                            <li><a href="/widerruf" class="hover:text-white transition">Widerrufsrecht</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2026 SoftwareKing24. Alle Rechte vorbehalten.</p>
                </div>
            </div>
        </footer>

        <script>
            // Initialize cart counter
            document.addEventListener('DOMContentLoaded', () => {
                if (typeof CartManager !== 'undefined') {
                    CartManager.updateCartCount();
                    loadProducts();
                }
            });

            // Load products
            async function loadProducts() {
                try {
                    // Load flash deals
                    const flashResponse = await axios.get('/api/products?limit=4&sort=price-asc');
                    if (flashResponse.data.success) {
                        renderFlashDeals(flashResponse.data.data);
                    }

                    // Load bestsellers
                    const bestResponse = await axios.get('/api/products/featured');
                    if (bestResponse.data.success) {
                        renderBestsellers(bestResponse.data.data);
                    }

                    // Load new arrivals
                    const newResponse = await axios.get('/api/products?limit=4&sort=newest');
                    if (newResponse.data.success) {
                        renderNewArrivals(newResponse.data.data);
                    }
                } catch (error) {
                    console.error('Error loading products:', error);
                }
            }

            function renderFlashDeals(products) {
                const container = document.getElementById('flash-deals');
                container.innerHTML = products.slice(0, 4).map(product => {
                    const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;
                    const displayPrice = product.sale_price || product.price;
                    
                    return \`
                        <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift">
                            <div class="relative">
                                <img src="\${product.image}" alt="\${product.name}" class="w-full h-48 object-cover" />
                                \${discount > 0 ? \`<div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">-\${discount}%</div>\` : ''}
                            </div>
                            <div class="p-6">
                                <h3 class="font-bold text-gray-800 mb-2">\${product.name}</h3>
                                <div class="flex items-center justify-between mb-4">
                                    <div>
                                        \${product.sale_price ? \`
                                            <span class="text-2xl font-bold text-red-600">€\${displayPrice.toFixed(2)}</span>
                                            <span class="text-sm text-gray-500 line-through ml-2">€\${product.price.toFixed(2)}</span>
                                        \` : \`
                                            <span class="text-2xl font-bold text-gray-800">€\${displayPrice.toFixed(2)}</span>
                                        \`}
                                    </div>
                                </div>
                                <button onclick="addToCart(\${product.id})" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition">
                                    <i class="fas fa-shopping-cart mr-2"></i>In den Warenkorb
                                </button>
                            </div>
                        </div>
                    \`;
                }).join('');
            }

            function renderBestsellers(products) {
                const container = document.getElementById('bestsellers-products');
                container.innerHTML = products.slice(0, 4).map(product => {
                    const displayPrice = product.sale_price || product.price;
                    
                    return \`
                        <div class="bg-white rounded-xl shadow-md overflow-hidden hover-lift">
                            <div class="relative">
                                <img src="\${product.image}" alt="\${product.name}" class="w-full h-48 object-cover" />
                                <div class="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-sm">
                                    <i class="fas fa-star mr-1"></i>Bestseller
                                </div>
                            </div>
                            <div class="p-6">
                                <h3 class="font-bold text-gray-800 mb-2">\${product.name}</h3>
                                <div class="flex items-center mb-3">
                                    <div class="flex text-yellow-400 text-sm">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <span class="text-sm text-gray-600 ml-2">(4.9)</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-2xl font-bold text-blue-600">€\${displayPrice.toFixed(2)}</span>
                                    <button onclick="addToCart(\${product.id})" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                        <i class="fas fa-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    \`;
                }).join('');
            }

            function renderNewArrivals(products) {
                const container = document.getElementById('new-arrivals');
                container.innerHTML = products.slice(0, 4).map(product => {
                    const displayPrice = product.sale_price || product.price;
                    
                    return \`
                        <div class="bg-white rounded-xl shadow-md overflow-hidden hover-lift">
                            <div class="relative">
                                <img src="\${product.image}" alt="\${product.name}" class="w-full h-48 object-cover" />
                                <div class="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                                    <i class="fas fa-sparkles mr-1"></i>Neu
                                </div>
                            </div>
                            <div class="p-6">
                                <h3 class="font-bold text-gray-800 mb-2">\${product.name}</h3>
                                <div class="flex items-center justify-between">
                                    <span class="text-2xl font-bold text-purple-600">€\${displayPrice.toFixed(2)}</span>
                                    <button onclick="addToCart(\${product.id})" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                                        <i class="fas fa-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    \`;
                }).join('');
            }

            async function addToCart(productId) {
                if (typeof CartManager !== 'undefined') {
                    await CartManager.addToCart(productId);
                }
            }

            function performSearch() {
                const query = document.getElementById('global-search').value;
                if (query) {
                    window.location.href = \`/produkte?search=\${encodeURIComponent(query)}\`;
                }
            }
        </script>
    </body>
    </html>
  `;
};
