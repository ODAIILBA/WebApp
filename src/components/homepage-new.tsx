import { html } from 'hono/html'

export const SoftwareKing24Homepage = () => html`
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SoftwareKing24 - Premium Software Sofortdownload</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .hero-gradient {
            background: linear-gradient(135deg, #0C2A47 0%, #1e3a5f 50%, #2d4a6f 100%);
        }
        .brand-gold { color: #FFD700; }
        .brand-blue { color: #0C2A47; }
        .hover-lift { transition: transform 0.3s ease; }
        .hover-lift:hover { transform: translateY(-8px); }
        .product-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .product-card:hover {
            box-shadow: 0 12px 24px rgba(0,0,0,0.15);
            transform: translateY(-4px);
        }
        .category-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .category-card:hover {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            transform: translateY(-8px);
            color: white;
        }
        .pulse-badge {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .7; }
        }
    </style>
</head>
<body class="bg-gray-50">

    <!-- Top Bar -->
    <div class="bg-gray-900 text-white text-sm py-2">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <div class="flex items-center space-x-4">
                <span><i class="fas fa-phone mr-2"></i>+49 123 456 789</span>
                <span><i class="fas fa-envelope mr-2"></i>support@softwareking24.de</span>
            </div>
            <div class="flex items-center space-x-4">
                <a href="#" class="hover:text-yellow-400 transition"><i class="fas fa-user mr-1"></i>Anmelden</a>
                <button class="flex items-center space-x-1 hover:text-yellow-400 transition">
                    <img src="https://flagcdn.com/w20/de.png" alt="DE" class="w-5">
                    <span>DE</span>
                    <i class="fas fa-chevron-down text-xs"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Main Header -->
    <header class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <a href="/" class="flex items-center space-x-3">
                    <div class="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg">
                        SK
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold brand-blue">SoftwareKing24</h1>
                        <p class="text-xs text-gray-500">Premium Software Sofortdownload</p>
                    </div>
                </a>

                <!-- Search Bar -->
                <div class="hidden md:flex flex-1 max-w-2xl mx-8">
                    <div class="relative w-full">
                        <input 
                            type="text" 
                            placeholder="Software suchen..." 
                            class="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-yellow-500 focus:outline-none"
                            id="searchInput"
                        >
                        <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>

                <!-- Header Actions -->
                <div class="flex items-center space-x-6">
                    <a href="/wishlist" class="hidden md:flex flex-col items-center text-gray-600 hover:text-yellow-600 transition">
                        <i class="fas fa-heart text-xl"></i>
                        <span class="text-xs mt-1">Wunschliste</span>
                    </a>
                    <a href="/warenkorb" class="flex flex-col items-center text-gray-600 hover:text-yellow-600 transition relative">
                        <i class="fas fa-shopping-cart text-xl"></i>
                        <span class="text-xs mt-1">Warenkorb</span>
                        <span class="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" id="cartCount">0</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="bg-gray-50 border-t">
            <div class="container mx-auto px-4">
                <ul class="flex items-center space-x-8 py-3">
                    <li class="relative group">
                        <a href="#" class="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 font-medium transition">
                            <i class="fas fa-bars"></i>
                            <span>Alle Kategorien</span>
                            <i class="fas fa-chevron-down text-xs"></i>
                        </a>
                        <!-- Mega Menu Dropdown -->
                        <div class="absolute left-0 top-full mt-2 w-screen max-w-4xl bg-white shadow-2xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div class="grid grid-cols-4 gap-6 p-8">
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-3 flex items-center">
                                        <i class="fas fa-desktop text-yellow-500 mr-2"></i>
                                        Windows
                                    </h4>
                                    <ul class="space-y-2">
                                        <li><a href="/category/windows" class="text-gray-600 hover:text-yellow-600 text-sm">Windows 11</a></li>
                                        <li><a href="/category/windows" class="text-gray-600 hover:text-yellow-600 text-sm">Windows 10</a></li>
                                        <li><a href="/category/windows-server" class="text-gray-600 hover:text-yellow-600 text-sm">Windows Server</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-3 flex items-center">
                                        <i class="fas fa-file-alt text-yellow-500 mr-2"></i>
                                        Microsoft Office
                                    </h4>
                                    <ul class="space-y-2">
                                        <li><a href="/category/office-2024" class="text-gray-600 hover:text-yellow-600 text-sm">Office 2024</a></li>
                                        <li><a href="/category/office-2021" class="text-gray-600 hover:text-yellow-600 text-sm">Office 2021</a></li>
                                        <li><a href="/category/office-2019" class="text-gray-600 hover:text-yellow-600 text-sm">Office 2019</a></li>
                                        <li><a href="/category/office-mac" class="text-gray-600 hover:text-yellow-600 text-sm">Office für Mac</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-3 flex items-center">
                                        <i class="fas fa-database text-yellow-500 mr-2"></i>
                                        Server & Datenbanken
                                    </h4>
                                    <ul class="space-y-2">
                                        <li><a href="/category/sql-server" class="text-gray-600 hover:text-yellow-600 text-sm">SQL Server</a></li>
                                        <li><a href="/category/exchange" class="text-gray-600 hover:text-yellow-600 text-sm">Exchange Server</a></li>
                                        <li><a href="/category/windows-server" class="text-gray-600 hover:text-yellow-600 text-sm">Windows Server</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-3 flex items-center">
                                        <i class="fas fa-tools text-yellow-500 mr-2"></i>
                                        Entwickler-Tools
                                    </h4>
                                    <ul class="space-y-2">
                                        <li><a href="/category/visual-studio" class="text-gray-600 hover:text-yellow-600 text-sm">Visual Studio</a></li>
                                        <li><a href="/category/project" class="text-gray-600 hover:text-yellow-600 text-sm">Microsoft Project</a></li>
                                        <li><a href="/category/visio" class="text-gray-600 hover:text-yellow-600 text-sm">Microsoft Visio</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="bg-yellow-50 p-6 rounded-b-lg">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-4">
                                        <i class="fas fa-tags text-yellow-500 text-3xl"></i>
                                        <div>
                                            <h5 class="font-bold text-gray-800">Sonderangebote</h5>
                                            <p class="text-sm text-gray-600">Bis zu 80% Rabatt</p>
                                        </div>
                                    </div>
                                    <a href="/deals" class="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition font-medium">
                                        Jetzt ansehen
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li><a href="/produkte" class="text-gray-700 hover:text-yellow-600 transition">Alle Produkte</a></li>
                    <li><a href="/deals" class="text-yellow-600 font-bold">🔥 Angebote</a></li>
                    <li><a href="/neu" class="text-gray-700 hover:text-yellow-600 transition">Neuheiten</a></li>
                    <li><a href="/marken" class="text-gray-700 hover:text-yellow-600 transition">Top Marken</a></li>
                    <li><a href="/support" class="text-gray-700 hover:text-yellow-600 transition">Support</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero-gradient text-white py-20">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <span class="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-4 pulse-badge">
                        🔥 Bis zu 80% Rabatt
                    </span>
                    <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Premium Software<br>
                        <span class="brand-gold">Sofort verfügbar</span>
                    </h1>
                    <p class="text-xl mb-8 text-gray-200">
                        Original Microsoft Software zum Bestpreis. Legale Lizenzen, sofortiger Download, deutscher Support.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <a href="/produkte" class="bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition inline-flex items-center">
                            Jetzt einkaufen
                            <i class="fas fa-arrow-right ml-3"></i>
                        </a>
                        <a href="#categories" class="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition inline-flex items-center">
                            Kategorien ansehen
                            <i class="fas fa-chevron-down ml-3"></i>
                        </a>
                    </div>
                </div>
                <div class="hidden md:block">
                    <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600" alt="Software" class="rounded-2xl shadow-2xl">
                </div>
            </div>
        </div>
    </section>

    <!-- Trust Badges -->
    <section class="bg-white py-12 shadow-md">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="flex items-center justify-center space-x-3">
                    <i class="fas fa-shield-alt text-green-500 text-3xl"></i>
                    <div>
                        <p class="font-bold text-gray-800">100% Sicher</p>
                        <p class="text-sm text-gray-600">SSL-verschlüsselt</p>
                    </div>
                </div>
                <div class="flex items-center justify-center space-x-3">
                    <i class="fas fa-download text-blue-500 text-3xl"></i>
                    <div>
                        <p class="font-bold text-gray-800">Sofort-Download</p>
                        <p class="text-sm text-gray-600">Nach Zahlungseingang</p>
                    </div>
                </div>
                <div class="flex items-center justify-center space-x-3">
                    <i class="fas fa-certificate text-yellow-500 text-3xl"></i>
                    <div>
                        <p class="font-bold text-gray-800">Original-Lizenzen</p>
                        <p class="text-sm text-gray-600">Direkt von Microsoft</p>
                    </div>
                </div>
                <div class="flex items-center justify-center space-x-3">
                    <i class="fas fa-headset text-purple-500 text-3xl"></i>
                    <div>
                        <p class="font-bold text-gray-800">24/7 Support</p>
                        <p class="text-sm text-gray-600">Deutscher Kundenservice</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section id="categories" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">Beliebte Kategorien</h2>
                <p class="text-xl text-gray-600">Finden Sie die perfekte Software für Ihre Bedürfnisse</p>
            </div>
            <div class="grid md:grid-cols-4 gap-6">
                <div class="category-card hover-lift">
                    <i class="fas fa-desktop text-5xl mb-4 text-blue-500"></i>
                    <h3 class="font-bold text-xl mb-2">Windows</h3>
                    <p class="text-sm text-gray-600 mb-4">Betriebssysteme</p>
                    <a href="/category/windows" class="text-yellow-600 font-semibold hover:text-yellow-700">
                        Entdecken <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="category-card hover-lift">
                    <i class="fas fa-file-word text-5xl mb-4 text-blue-600"></i>
                    <h3 class="font-bold text-xl mb-2">Microsoft Office</h3>
                    <p class="text-sm text-gray-600 mb-4">Produktivität</p>
                    <a href="/category/office" class="text-yellow-600 font-semibold hover:text-yellow-700">
                        Entdecken <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="category-card hover-lift">
                    <i class="fas fa-server text-5xl mb-4 text-gray-700"></i>
                    <h3 class="font-bold text-xl mb-2">Server</h3>
                    <p class="text-sm text-gray-600 mb-4">Enterprise-Lösungen</p>
                    <a href="/category/server" class="text-yellow-600 font-semibold hover:text-yellow-700">
                        Entdecken <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="category-card hover-lift">
                    <i class="fas fa-code text-5xl mb-4 text-green-500"></i>
                    <h3 class="font-bold text-xl mb-2">Entwickler-Tools</h3>
                    <p class="text-sm text-gray-600 mb-4">Visual Studio & mehr</p>
                    <a href="/category/dev-tools" class="text-yellow-600 font-semibold hover:text-yellow-700">
                        Entdecken <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <h2 class="text-4xl font-bold text-gray-800 mb-2">Top Angebote</h2>
                    <p class="text-gray-600">Unsere meistverkauften Produkte</p>
                </div>
                <a href="/produkte" class="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition font-semibold">
                    Alle Produkte ansehen
                </a>
            </div>
            <div id="featuredProducts" class="grid md:grid-cols-4 gap-6">
                <!-- Products will be loaded here via JavaScript -->
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="hero-gradient text-white py-20">
        <div class="container mx-auto px-4 text-center">
            <i class="fas fa-gift text-6xl mb-6 brand-gold"></i>
            <h2 class="text-4xl font-bold mb-6">Erhalten Sie 15€ Rabatt auf Ihre erste Bestellung</h2>
            <p class="text-xl mb-8 text-gray-200">Melden Sie sich für unseren Newsletter an und erhalten Sie exklusive Angebote</p>
            <div class="max-w-md mx-auto flex">
                <input type="email" placeholder="Ihre E-Mail-Adresse" class="flex-1 px-6 py-4 rounded-l-full text-gray-800">
                <button class="bg-yellow-500 text-gray-900 px-8 py-4 rounded-r-full font-bold hover:bg-yellow-400 transition">
                    Anmelden
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h4 class="font-bold text-xl mb-4 brand-gold">SoftwareKing24</h4>
                    <p class="text-gray-400 text-sm mb-4">Ihr vertrauenswürdiger Partner für Original-Software zum Bestpreis.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-yellow-400 transition"><i class="fab fa-facebook text-xl"></i></a>
                        <a href="#" class="text-gray-400 hover:text-yellow-400 transition"><i class="fab fa-twitter text-xl"></i></a>
                        <a href="#" class="text-gray-400 hover:text-yellow-400 transition"><i class="fab fa-instagram text-xl"></i></a>
                    </div>
                </div>
                <div>
                    <h5 class="font-bold mb-4">Produkte</h5>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/category/windows" class="text-gray-400 hover:text-yellow-400 transition">Windows</a></li>
                        <li><a href="/category/office" class="text-gray-400 hover:text-yellow-400 transition">Microsoft Office</a></li>
                        <li><a href="/category/server" class="text-gray-400 hover:text-yellow-400 transition">Server</a></li>
                        <li><a href="/deals" class="text-gray-400 hover:text-yellow-400 transition">Sonderangebote</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="font-bold mb-4">Service</h5>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/support" class="text-gray-400 hover:text-yellow-400 transition">Support</a></li>
                        <li><a href="/faq" class="text-gray-400 hover:text-yellow-400 transition">FAQ</a></li>
                        <li><a href="/kontakt" class="text-gray-400 hover:text-yellow-400 transition">Kontakt</a></li>
                        <li><a href="/ueber-uns" class="text-gray-400 hover:text-yellow-400 transition">Über uns</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="font-bold mb-4">Rechtliches</h5>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/agb" class="text-gray-400 hover:text-yellow-400 transition">AGB</a></li>
                        <li><a href="/datenschutz" class="text-gray-400 hover:text-yellow-400 transition">Datenschutz</a></li>
                        <li><a href="/impressum" class="text-gray-400 hover:text-yellow-400 transition">Impressum</a></li>
                        <li><a href="/widerruf" class="text-gray-400 hover:text-yellow-400 transition">Widerrufsrecht</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2026 SoftwareKing24. Alle Rechte vorbehalten.</p>
            </div>
        </div>
    </footer>

    <script>
        // Load featured products
        async function loadFeaturedProducts() {
            try {
                const response = await fetch('/api/products?limit=4');
                const data = await response.json();
                
                if (data.success && data.data.length > 0) {
                    const container = document.getElementById('featuredProducts');
                    container.innerHTML = data.data.map(product => \`
                        <div class="product-card p-6">
                            <div class="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                <i class="fas fa-box-open text-gray-300 text-5xl"></i>
                            </div>
                            <h3 class="font-bold text-lg mb-2 line-clamp-2">\${product.name}</h3>
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    \${product.sale_price ? \`
                                        <span class="text-gray-400 line-through text-sm">€\${(product.price / 100).toFixed(2)}</span>
                                        <span class="text-2xl font-bold text-yellow-600">€\${(product.sale_price / 100).toFixed(2)}</span>
                                    \` : \`
                                        <span class="text-2xl font-bold text-gray-800">€\${(product.price / 100).toFixed(2)}</span>
                                    \`}
                                </div>
                            </div>
                            <button onclick="addToCart(\${product.id})" class="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                                <i class="fas fa-shopping-cart mr-2"></i>
                                In den Warenkorb
                            </button>
                        </div>
                    \`).join('');
                }
            } catch (error) {
                console.error('Error loading products:', error);
            }
        }

        // Add to cart function
        function addToCart(productId) {
            fetch('/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity: 1 })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Update cart count
                    const cartCount = document.getElementById('cartCount');
                    cartCount.textContent = parseInt(cartCount.textContent) + 1;
                    
                    // Show success message
                    alert('Produkt wurde zum Warenkorb hinzugefügt!');
                }
            })
            .catch(error => console.error('Error:', error));
        }

        // Load products on page load
        document.addEventListener('DOMContentLoaded', loadFeaturedProducts);
    </script>
</body>
</html>
`
