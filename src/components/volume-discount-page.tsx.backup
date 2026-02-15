// Volume Discount System Component
export const VolumeDiscountPage = () => {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mengenrabatt - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <style>
        :root {
            --navy: #001f3f;
            --navy-medium: #003366;
            --gold: #FFC107;
        }
        
        .volume-tier {
            transition: all 0.3s;
            cursor: pointer;
        }
        
        .volume-tier:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .volume-tier.selected {
            border: 3px solid var(--gold);
            background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);
        }
        
        .calculator-input {
            border: 2px solid #e0e0e0;
            transition: all 0.3s;
        }
        
        .calculator-input:focus {
            border-color: var(--gold);
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.2);
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
                    <a href="/bundles" style="color: white; text-decoration: none;">Bundles</a>
                    <a href="/mengenrabatt" style="color: var(--gold); font-weight: bold; text-decoration: none;">Mengenrabatt</a>
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
                <i class="fas fa-layer-group mr-3" style="color: var(--gold);"></i>
                Mengenrabatt-System
            </h1>
            <p class="text-xl text-gray-600">Je mehr Sie kaufen, desto mehr sparen Sie!</p>
        </div>

        <!-- Volume Discount Tiers -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div class="volume-tier bg-white rounded-xl shadow-lg p-6 text-center border-2 border-gray-200" data-quantity="5" data-discount="10">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);">
                    <i class="fas fa-box text-2xl text-blue-600"></i>
                </div>
                <div class="text-3xl font-bold mb-2" style="color: var(--navy);">5-9 Lizenzen</div>
                <div class="text-4xl font-bold mb-2" style="color: var(--gold);">10%</div>
                <div class="text-gray-600">Rabatt</div>
                <div class="mt-4 text-sm text-gray-500">Ideal für kleine Teams</div>
            </div>

            <div class="volume-tier bg-white rounded-xl shadow-lg p-6 text-center border-2 border-gray-200" data-quantity="10" data-discount="15">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);">
                    <i class="fas fa-boxes text-2xl text-green-600"></i>
                </div>
                <div class="text-3xl font-bold mb-2" style="color: var(--navy);">10-24 Lizenzen</div>
                <div class="text-4xl font-bold mb-2" style="color: var(--gold);">15%</div>
                <div class="text-gray-600">Rabatt</div>
                <div class="mt-4 text-sm text-gray-500">Beliebt bei Mittelstand</div>
            </div>

            <div class="volume-tier bg-white rounded-xl shadow-lg p-6 text-center border-2 border-gray-200" data-quantity="25" data-discount="20">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);">
                    <i class="fas fa-warehouse text-2xl text-orange-600"></i>
                </div>
                <div class="text-3xl font-bold mb-2" style="color: var(--navy);">25-49 Lizenzen</div>
                <div class="text-4xl font-bold mb-2" style="color: var(--gold);">20%</div>
                <div class="text-gray-600">Rabatt</div>
                <div class="mt-4 text-sm text-gray-500">Großer Unternehmensrabatt</div>
            </div>

            <div class="volume-tier bg-white rounded-xl shadow-lg p-6 text-center border-2 border-gray-200" data-quantity="50" data-discount="25">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);">
                    <i class="fas fa-building text-2xl text-purple-600"></i>
                </div>
                <div class="text-3xl font-bold mb-2" style="color: var(--navy);">50+ Lizenzen</div>
                <div class="text-4xl font-bold mb-2" style="color: var(--gold);">25%</div>
                <div class="text-gray-600">Rabatt</div>
                <div class="mt-4 text-sm text-gray-500">Enterprise-Preis</div>
            </div>
        </div>

        <!-- Volume Calculator -->
        <div class="grid md:grid-cols-2 gap-8 mb-12">
            <!-- Product Selection & Calculator -->
            <div class="bg-white rounded-2xl shadow-xl p-8">
                <h2 class="text-2xl font-bold mb-6" style="color: var(--navy);">
                    <i class="fas fa-calculator mr-3" style="color: var(--gold);"></i>
                    Mengenrabatt Rechner
                </h2>
                
                <div class="space-y-6">
                    <!-- Product Selection -->
                    <div>
                        <label class="block text-sm font-semibold mb-2 text-gray-700">Produkt auswählen</label>
                        <select id="product-select" class="calculator-input w-full px-4 py-3 rounded-lg">
                            <option value="">Laden...</option>
                        </select>
                    </div>

                    <!-- Quantity Input -->
                    <div>
                        <label class="block text-sm font-semibold mb-2 text-gray-700">
                            Anzahl Lizenzen
                            <span class="text-gray-500 font-normal">(Min: 5)</span>
                        </label>
                        <input type="number" id="quantity-input" class="calculator-input w-full px-4 py-3 rounded-lg" 
                               min="5" value="10" onchange="calculateVolume()">
                    </div>

                    <!-- Price Display -->
                    <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-700">Einzelpreis:</span>
                            <span id="unit-price" class="text-lg font-bold" style="color: var(--navy);">€0.00</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-700">Anzahl:</span>
                            <span id="display-quantity" class="text-lg font-bold">0</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-700">Zwischensumme:</span>
                            <span id="subtotal" class="text-lg text-gray-500 line-through">€0.00</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-700">Mengenrabatt:</span>
                            <span id="volume-discount" class="text-lg font-bold text-green-600">-0%</span>
                        </div>
                        <div class="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                            <span class="text-xl font-bold" style="color: var(--navy);">Gesamtpreis:</span>
                            <span id="total-price" class="text-3xl font-bold" style="color: var(--gold);">€0.00</span>
                        </div>
                        <div class="text-center mt-2">
                            <span id="total-savings" class="text-green-600 font-semibold">Sie sparen: €0.00</span>
                        </div>
                    </div>

                    <button id="add-volume-to-cart" class="w-full py-4 rounded-lg font-bold text-white transition" 
                            style="background: var(--gold); color: var(--navy);" 
                            onmouseover="this.style.background='#FFD54F'" 
                            onmouseout="this.style.background='var(--gold)'">
                        <i class="fas fa-shopping-cart mr-2"></i>
                        Zum Warenkorb hinzufügen
                    </button>
                </div>
            </div>

            <!-- Savings Chart -->
            <div class="bg-white rounded-2xl shadow-xl p-8">
                <h2 class="text-2xl font-bold mb-6" style="color: var(--navy);">
                    <i class="fas fa-chart-line mr-3" style="color: var(--gold);"></i>
                    Ersparnis-Übersicht
                </h2>
                <canvas id="savingsChart" height="300"></canvas>
                
                <div class="mt-8 grid grid-cols-2 gap-4">
                    <div class="text-center p-4 bg-blue-50 rounded-lg">
                        <div class="text-sm text-gray-600 mb-1">Ersparnis pro Lizenz</div>
                        <div id="per-license-savings" class="text-2xl font-bold text-blue-600">€0.00</div>
                    </div>
                    <div class="text-center p-4 bg-green-50 rounded-lg">
                        <div class="text-sm text-gray-600 mb-1">Gesamt Ersparnis</div>
                        <div id="total-savings-display" class="text-2xl font-bold text-green-600">€0.00</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Popular Products for Volume -->
        <div class="mb-12">
            <h2 class="text-2xl font-bold mb-6" style="color: var(--navy);">
                <i class="fas fa-fire mr-3" style="color: var(--gold);"></i>
                Beliebt für Mengenbestellungen
            </h2>
            <div id="popular-products" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Products will be loaded here -->
            </div>
        </div>

        <!-- Benefits -->
        <div class="grid md:grid-cols-4 gap-6">
            <div class="text-center p-6 bg-white rounded-xl shadow-md">
                <i class="fas fa-percentage text-4xl mb-4" style="color: var(--gold);"></i>
                <h3 class="font-bold text-lg mb-2">Bis zu 25% sparen</h3>
                <p class="text-gray-600 text-sm">Automatischer Mengenrabatt</p>
            </div>
            <div class="text-center p-6 bg-white rounded-xl shadow-md">
                <i class="fas fa-bolt text-4xl mb-4" style="color: var(--gold);"></i>
                <h3 class="font-bold text-lg mb-2">Sofort verfügbar</h3>
                <p class="text-gray-600 text-sm">Alle Lizenzen direkt</p>
            </div>
            <div class="text-center p-6 bg-white rounded-xl shadow-md">
                <i class="fas fa-shield-alt text-4xl mb-4" style="color: var(--gold);"></i>
                <h3 class="font-bold text-lg mb-2">100% Original</h3>
                <p class="text-gray-600 text-sm">Authentische Lizenzen</p>
            </div>
            <div class="text-center p-6 bg-white rounded-xl shadow-md">
                <i class="fas fa-headset text-4xl mb-4" style="color: var(--gold);"></i>
                <h3 class="font-bold text-lg mb-2">Support inklusiv</h3>
                <p class="text-gray-600 text-sm">Persönliche Betreuung</p>
            </div>
        </div>
    </main>

    <script>
        // Volume discount tiers
        const VOLUME_TIERS = [
            { min: 50, discount: 0.25, label: '50+ Lizenzen' },
            { min: 25, discount: 0.20, label: '25-49 Lizenzen' },
            { min: 10, discount: 0.15, label: '10-24 Lizenzen' },
            { min: 5, discount: 0.10, label: '5-9 Lizenzen' }
        ];

        let availableProducts = [];
        let currentProduct = null;
        let savingsChart = null;

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', async () => {
            updateCartCount();
            initializeChart();
            initializeVolumeCards();
            await loadProducts();
            
            document.getElementById('add-volume-to-cart').addEventListener('click', addVolumeToCart);
            document.getElementById('product-select').addEventListener('change', onProductChange);
        });

        // Load products
        async function loadProducts() {
            try {
                const response = await fetch('/api/products?limit=50&sort=bestseller');
                const data = await response.json();
                
                if (data.success) {
                    availableProducts = data.data;
                    renderProductSelect();
                    renderPopularProducts();
                    
                    // Select first product by default
                    if (availableProducts.length > 0) {
                        document.getElementById('product-select').value = availableProducts[0].id;
                        onProductChange();
                    }
                }
            } catch (error) {
                console.error('Error loading products:', error);
            }
        }

        // Render product selection dropdown
        function renderProductSelect() {
            const select = document.getElementById('product-select');
            select.innerHTML = '<option value="">Produkt wählen...</option>' + 
                availableProducts.map(p => {
                    const price = p.discount_price || p.base_price;
                    return \`<option value="\${p.id}">\${p.name} - €\${price.toFixed(2)}</option>\`;
                }).join('');
        }

        // Render popular products
        function renderPopularProducts() {
            const container = document.getElementById('popular-products');
            const popular = availableProducts.slice(0, 6);
            
            container.innerHTML = popular.map(product => {
                const price = product.discount_price || product.base_price;
                return \`
                    <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer" onclick="selectProduct(\${product.id})">
                        <div class="flex items-center justify-between mb-4">
                            <i class="fas fa-box text-3xl" style="color: var(--gold);"></i>
                            <span class="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800">Ab 5 Stück</span>
                        </div>
                        <h3 class="font-bold mb-2 text-sm" style="color: var(--navy);">\${product.name}</h3>
                        <div class="flex items-baseline gap-2 mb-3">
                            <span class="text-2xl font-bold" style="color: var(--gold);">€\${price.toFixed(2)}</span>
                            <span class="text-sm text-gray-500">/ Lizenz</span>
                        </div>
                        <button class="w-full py-2 rounded-lg text-sm font-semibold transition" style="background: var(--navy); color: white;">
                            <i class="fas fa-calculator mr-2"></i>
                            Rabatt berechnen
                        </button>
                    </div>
                \`;
            }).join('');
        }

        // Product selection change
        function onProductChange() {
            const select = document.getElementById('product-select');
            const productId = parseInt(select.value);
            
            if (productId) {
                currentProduct = availableProducts.find(p => p.id === productId);
                calculateVolume();
            }
        }

        // Select product from popular
        function selectProduct(productId) {
            document.getElementById('product-select').value = productId;
            onProductChange();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Calculate volume discount
        function calculateVolume() {
            if (!currentProduct) return;
            
            const quantity = parseInt(document.getElementById('quantity-input').value) || 0;
            const unitPrice = currentProduct.discount_price || currentProduct.base_price;
            
            // Find applicable discount tier
            let discount = 0;
            let tierLabel = 'Kein Rabatt';
            for (const tier of VOLUME_TIERS) {
                if (quantity >= tier.min) {
                    discount = tier.discount;
                    tierLabel = tier.label;
                    break;
                }
            }
            
            const subtotal = unitPrice * quantity;
            const discountAmount = subtotal * discount;
            const total = subtotal - discountAmount;
            const perLicenseSavings = discountAmount / quantity;
            
            // Update UI
            document.getElementById('unit-price').textContent = '€' + unitPrice.toFixed(2);
            document.getElementById('display-quantity').textContent = quantity;
            document.getElementById('subtotal').textContent = '€' + subtotal.toFixed(2);
            document.getElementById('volume-discount').textContent = '-' + Math.round(discount * 100) + '% (' + tierLabel + ')';
            document.getElementById('total-price').textContent = '€' + total.toFixed(2);
            document.getElementById('total-savings').textContent = 'Sie sparen: €' + discountAmount.toFixed(2);
            document.getElementById('per-license-savings').textContent = '€' + perLicenseSavings.toFixed(2);
            document.getElementById('total-savings-display').textContent = '€' + discountAmount.toFixed(2);
            
            // Update chart
            updateChart(unitPrice);
            
            // Highlight active tier
            updateActiveTier(quantity);
        }

        // Initialize volume cards
        function initializeVolumeCards() {
            document.querySelectorAll('.volume-tier').forEach(card => {
                card.addEventListener('click', () => {
                    const quantity = parseInt(card.dataset.quantity);
                    document.getElementById('quantity-input').value = quantity;
                    calculateVolume();
                });
            });
        }

        // Update active tier highlight
        function updateActiveTier(quantity) {
            document.querySelectorAll('.volume-tier').forEach(card => {
                const tierQty = parseInt(card.dataset.quantity);
                card.classList.remove('selected');
                
                // Check if this tier applies
                for (const tier of VOLUME_TIERS) {
                    if (quantity >= tier.min && tierQty === tier.min) {
                        card.classList.add('selected');
                        break;
                    }
                }
            });
        }

        // Initialize savings chart
        function initializeChart() {
            const ctx = document.getElementById('savingsChart').getContext('2d');
            savingsChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['5', '10', '25', '50', '100'],
                    datasets: [{
                        label: 'Ersparnis in €',
                        data: [0, 0, 0, 0, 0],
                        borderColor: '#FFC107',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '€' + value;
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Anzahl Lizenzen'
                            }
                        }
                    }
                }
            });
        }

        // Update chart with current product pricing
        function updateChart(unitPrice) {
            if (!savingsChart) return;  // Guard clause
            
            const quantities = [5, 10, 25, 50, 100];
            const savings = quantities.map(qty => {
                let discount = 0;
                for (const tier of VOLUME_TIERS) {
                    if (qty >= tier.min) {
                        discount = tier.discount;
                        break;
                    }
                }
                return (unitPrice * qty * discount).toFixed(2);
            });
            
            savingsChart.data.datasets[0].data = savings;
            savingsChart.update();
        }

        // Add to cart
        function addVolumeToCart() {
            if (!currentProduct) {
                showNotification('Fehler', 'Bitte wählen Sie ein Produkt aus', 'error');
                return;
            }
            
            const quantity = parseInt(document.getElementById('quantity-input').value);
            
            if (quantity < 5) {
                showNotification('Fehler', 'Mindestmenge: 5 Lizenzen', 'error');
                return;
            }
            
            const unitPrice = currentProduct.discount_price || currentProduct.base_price;
            
            // Calculate discount
            let discount = 0;
            for (const tier of VOLUME_TIERS) {
                if (quantity >= tier.min) {
                    discount = tier.discount;
                    break;
                }
            }
            
            const discountedPrice = unitPrice * (1 - discount);
            
            // Add to cart
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({
                id: currentProduct.id,
                name: currentProduct.name + ' (Mengenrabatt)',
                price: discountedPrice,
                quantity: quantity,
                originalPrice: unitPrice,
                discount: Math.round(discount * 100)
            });
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            showNotification('Hinzugefügt!', \`\${quantity}x \${currentProduct.name} mit \${Math.round(discount * 100)}% Mengenrabatt\`, 'success');
        }

        // Helper functions
        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            document.getElementById('cart-count').textContent = cart.length;
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
