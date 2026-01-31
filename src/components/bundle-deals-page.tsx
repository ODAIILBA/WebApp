// Bundle Deals Calculator Component
export const BundleDealsPage = () => {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bundle-Angebote - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="/static/cart-manager-enhanced.js"></script>
    
    <style>
        :root {
            --navy: #001f3f;
            --navy-medium: #003366;
            --gold: #FFC107;
        }
        
        .bundle-card {
            transition: all 0.3s;
        }
        
        .bundle-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .savings-badge {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header style="background: var(--navy); color: white; padding: 15px 0;">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between">
                <a href="/" style="font-size: 1.5rem; font-weight: bold; color: white; text-decoration: none;">
                    <span style="color: white;">SOFTWARE</span><span style="color: var(--gold);">KING24</span>
                </a>
                <nav class="flex gap-6">
                    <a href="/produkte" style="color: white; text-decoration: none;">Produkte</a>
                    <a href="/bundles" style="color: var(--gold); font-weight: bold; text-decoration: none;">Bundles</a>
                    <a href="/warenkorb" style="color: white; text-decoration: none;">
                        <i class="fas fa-shopping-cart"></i>
                        <span id="cart-count" style="background: var(--gold); color: var(--navy); padding: 2px 8px; border-radius: 50%; margin-left: 5px;">0</span>
                    </a>
                </nav>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8">
        <!-- Page Title -->
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4" style="color: var(--navy);">
                <i class="fas fa-boxes mr-3" style="color: var(--gold);"></i>
                Bundle-Angebote
            </h1>
            <p class="text-xl text-gray-600">Sparen Sie mehr mit unseren vorbereiteten Software-Paketen</p>
        </div>

        <!-- Popular Bundles -->
        <div id="bundles-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <!-- Bundle cards will be loaded here -->
        </div>

        <!-- Custom Bundle Builder -->
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 class="text-3xl font-bold mb-6" style="color: var(--navy);">
                <i class="fas fa-magic mr-3" style="color: var(--gold);"></i>
                Eigenes Bundle erstellen
            </h2>
            
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Product Selection -->
                <div>
                    <h3 class="text-xl font-semibold mb-4">Produkte auswählen</h3>
                    <div id="product-selection" class="space-y-3">
                        <!-- Product checkboxes will be loaded here -->
                    </div>
                </div>
                
                <!-- Bundle Calculator -->
                <div>
                    <div class="sticky top-4">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                            <h3 class="text-xl font-semibold mb-4" style="color: var(--navy);">Bundle-Kalkulator</h3>
                            
                            <div class="space-y-3 mb-4">
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Ausgewählte Produkte:</span>
                                    <span id="selected-count" class="font-bold">0</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Einzelpreis gesamt:</span>
                                    <span id="original-total" class="text-gray-500 line-through">€0.00</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Bundle-Rabatt:</span>
                                    <span id="bundle-discount" style="color: var(--gold);" class="font-bold">0%</span>
                                </div>
                            </div>
                            
                            <div class="border-t-2 border-blue-300 pt-4 mb-4">
                                <div class="flex justify-between items-center">
                                    <span class="text-xl font-bold" style="color: var(--navy);">Bundle-Preis:</span>
                                    <span id="bundle-total" class="text-3xl font-bold" style="color: var(--gold);">€0.00</span>
                                </div>
                                <div class="mt-2 text-center">
                                    <span id="savings-amount" class="text-green-600 font-semibold">Sie sparen: €0.00</span>
                                </div>
                            </div>
                            
                            <button id="add-bundle-to-cart" class="w-full py-3 rounded-lg font-bold text-white transition" style="background: var(--gold); color: var(--navy);" onmouseover="this.style.background='#FFD54F'" onmouseout="this.style.background='var(--gold)'">
                                <i class="fas fa-shopping-cart mr-2"></i>
                                Bundle in den Warenkorb
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bundle Benefits -->
        <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center p-6 bg-white rounded-xl shadow-md">
                <i class="fas fa-percentage text-4xl mb-4" style="color: var(--gold);"></i>
                <h3 class="font-bold text-lg mb-2">Bis zu 30% sparen</h3>
                <p class="text-gray-600">Je mehr Produkte, desto höher der Rabatt</p>
            </div>
            <div class="text-center p-6 bg-white rounded-xl shadow-md">
                <i class="fas fa-box-open text-4xl mb-4" style="color: var(--gold);"></i>
                <h3 class="font-bold text-lg mb-2">Alles in einem</h3>
                <p class="text-gray-600">Perfekt abgestimmte Software-Pakete</p>
            </div>
            <div class="text-center p-6 bg-white rounded-xl shadow-md">
                <i class="fas fa-bolt text-4xl mb-4" style="color: var(--gold);"></i>
                <h3 class="font-bold text-lg mb-2">Sofort verfügbar</h3>
                <p class="text-gray-600">Alle Lizenzen direkt per E-Mail</p>
            </div>
        </div>
    </main>

    <script>
        // Bundle discount tiers
        const DISCOUNT_TIERS = [
            { min: 5, discount: 0.30 },  // 30% off for 5+ items
            { min: 4, discount: 0.25 },  // 25% off for 4 items
            { min: 3, discount: 0.20 },  // 20% off for 3 items
            { min: 2, discount: 0.15 }   // 15% off for 2 items
        ];

        // Predefined bundles
        const POPULAR_BUNDLES = [
            {
                name: 'Home Office Starter',
                description: 'Windows 11 + Office 2024 + Kaspersky',
                products: ['Windows 11 Pro', 'Office 2024 Home & Business', 'Kaspersky Total Security'],
                originalPrice: 299.90,
                bundlePrice: 189.90,
                savings: 110.00,
                icon: 'fa-home'
            },
            {
                name: 'Business Pro',
                description: 'Windows 11 Pro + Office Pro Plus + Server',
                products: ['Windows 11 Pro', 'Office 2024 Pro Plus', 'Windows Server 2022'],
                originalPrice: 899.90,
                bundlePrice: 649.90,
                savings: 250.00,
                icon: 'fa-briefcase'
            },
            {
                name: 'Creative Suite',
                description: 'Adobe Creative Cloud + CorelDRAW',
                products: ['Adobe Creative Cloud All Apps', 'CorelDRAW 2024'],
                originalPrice: 759.90,
                bundlePrice: 599.90,
                savings: 160.00,
                icon: 'fa-palette'
            }
        ];

        let selectedProducts = [];
        let availableProducts = [];

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', async () => {
            updateCartCount();
            await loadPopularBundles();
            await loadAvailableProducts();
            
            document.getElementById('add-bundle-to-cart').addEventListener('click', addBundleToCart);
        });

        // Load popular bundles
        function loadPopularBundles() {
            const container = document.getElementById('bundles-container');
            container.innerHTML = POPULAR_BUNDLES.map(bundle => \`
                <div class="bundle-card bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-16 h-16 rounded-full flex items-center justify-center" style="background: linear-gradient(135deg, var(--navy) 0%, var(--navy-medium) 100%);">
                                <i class="fas \${bundle.icon} text-2xl" style="color: var(--gold);"></i>
                            </div>
                            <div class="savings-badge text-right">
                                <div class="text-sm text-gray-500">Sie sparen</div>
                                <div class="text-2xl font-bold text-green-600">€\${bundle.savings.toFixed(2)}</div>
                            </div>
                        </div>
                        
                        <h3 class="text-xl font-bold mb-2" style="color: var(--navy);">\${bundle.name}</h3>
                        <p class="text-gray-600 text-sm mb-4">\${bundle.description}</p>
                        
                        <div class="mb-4">
                            <div class="text-sm text-gray-500 mb-2">Enthält:</div>
                            <ul class="space-y-1">
                                \${bundle.products.map(p => \`<li class="text-sm"><i class="fas fa-check text-green-500 mr-2"></i>\${p}</li>\`).join('')}
                            </ul>
                        </div>
                        
                        <div class="flex items-end justify-between mb-4">
                            <div>
                                <div class="text-sm text-gray-500 line-through">€\${bundle.originalPrice.toFixed(2)}</div>
                                <div class="text-3xl font-bold" style="color: var(--gold);">€\${bundle.bundlePrice.toFixed(2)}</div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm text-gray-500">Rabatt</div>
                                <div class="text-xl font-bold text-green-600">\${Math.round((bundle.savings / bundle.originalPrice) * 100)}%</div>
                            </div>
                        </div>
                        
                        <button onclick="addPresetBundleToCart('\${bundle.name}')" class="w-full py-3 rounded-lg font-bold text-white transition" style="background: var(--navy);" onmouseover="this.style.background='var(--navy-medium)'" onmouseout="this.style.background='var(--navy)'">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Jetzt kaufen
                        </button>
                    </div>
                </div>
            \`).join('');
        }

        // Load available products for custom bundle
        async function loadAvailableProducts() {
            try {
                const response = await fetch('/api/products?limit=20&sort=bestseller');
                const data = await response.json();
                
                if (data.success) {
                    availableProducts = data.data;
                    renderProductSelection();
                }
            } catch (error) {
                console.error('Error loading products:', error);
            }
        }

        // Render product selection checkboxes
        function renderProductSelection() {
            const container = document.getElementById('product-selection');
            container.innerHTML = availableProducts.map(product => {
                const finalPrice = product.discount_price || product.base_price;
                return \`
                    <label class="flex items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition">
                        <input type="checkbox" value="\${product.id}" data-price="\${finalPrice}" class="product-checkbox mr-3 w-5 h-5" onchange="updateBundleCalculator()">
                        <div class="flex-grow">
                            <div class="font-semibold">\${product.name}</div>
                            <div class="text-sm text-gray-600">\${product.brand_name || ''}</div>
                        </div>
                        <div class="text-right">
                            <div class="font-bold" style="color: var(--navy);">€\${finalPrice.toFixed(2)}</div>
                        </div>
                    </label>
                \`;
            }).join('');
        }

        // Update bundle calculator
        function updateBundleCalculator() {
            const checkboxes = document.querySelectorAll('.product-checkbox:checked');
            const count = checkboxes.length;
            let originalTotal = 0;
            
            checkboxes.forEach(cb => {
                originalTotal += parseFloat(cb.dataset.price);
            });
            
            // Find applicable discount
            let discount = 0;
            for (const tier of DISCOUNT_TIERS) {
                if (count >= tier.min) {
                    discount = tier.discount;
                    break;
                }
            }
            
            const bundleTotal = originalTotal * (1 - discount);
            const savings = originalTotal - bundleTotal;
            
            // Update UI
            document.getElementById('selected-count').textContent = count;
            document.getElementById('original-total').textContent = '€' + originalTotal.toFixed(2);
            document.getElementById('bundle-discount').textContent = Math.round(discount * 100) + '%';
            document.getElementById('bundle-total').textContent = '€' + bundleTotal.toFixed(2);
            document.getElementById('savings-amount').textContent = 'Sie sparen: €' + savings.toFixed(2);
            
            // Enable/disable button
            const button = document.getElementById('add-bundle-to-cart');
            button.disabled = count < 2;
            button.style.opacity = count < 2 ? '0.5' : '1';
        }

        // Add bundle to cart
        function addBundleToCart() {
            const checkboxes = document.querySelectorAll('.product-checkbox:checked');
            if (checkboxes.length < 2) {
                alert('Bitte wählen Sie mindestens 2 Produkte aus');
                return;
            }
            
            // Add each product to cart
            let addedCount = 0;
            checkboxes.forEach(cb => {
                const productId = parseInt(cb.value);
                const product = availableProducts.find(p => p.id === productId);
                if (product) {
                    const finalPrice = product.discount_price || product.base_price;
                    addToCart(product.id, product.name, finalPrice);
                    addedCount++;
                }
            });
            
            showNotification('Bundle hinzugefügt', \`\${addedCount} Produkte wurden zum Warenkorb hinzugefügt\`, 'success');
            
            // Clear selections
            checkboxes.forEach(cb => cb.checked = false);
            updateBundleCalculator();
        }

        // Add preset bundle to cart
        function addPresetBundleToCart(bundleName) {
            showNotification('Bundle hinzugefügt', \`\${bundleName} wurde zum Warenkorb hinzugefügt\`, 'success');
            updateCartCount();
        }

        // Helper functions
        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            document.getElementById('cart-count').textContent = cart.length;
        }

        function addToCart(productId, productName, price) {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({ id: productId, name: productName, price: price, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }

        function showNotification(title, message, type) {
            const notification = document.createElement('div');
            notification.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                background: \${type === 'success' ? '#28a745' : '#dc3545'};
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
            \`;
            notification.innerHTML = \`
                <div style="font-weight: bold; margin-bottom: 5px;">\${title}</div>
                <div style="font-size: 14px;">\${message}</div>
            \`;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    </script>
</body>
</html>
  `;
}
