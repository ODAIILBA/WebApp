import { AdminSidebar } from './admin-sidebar'

export function AdminProductsAdvanced() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produkte - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
        :root {
            --navy-dark: #1a2a4e;
            --gold: #d4af37;
        }
        
        .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 280px;
            height: 100vh;
            background: var(--navy-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
        }
        
        .admin-content {
            margin-left: 280px;
            min-height: 100vh;
            background: #f5f7fa;
        }
        
        .admin-nav-item {
            display: block;
            padding: 12px 20px;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s;
            border-left: 3px solid transparent;
        }
        
        .admin-nav-item:hover,
        .admin-nav-item.active {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-left-color: var(--gold);
        }
        
        .product-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.3s;
        }
        
        .product-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateY(-2px);
        }
        
        .product-image {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
        }
        
        .stat-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .btn-primary {
            background: var(--navy-dark);
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-primary:hover {
            background: #0f1936;
            transform: translateY(-1px);
        }
        
        .btn-success {
            background: #10b981;
            color: white;
        }
        
        .btn-success:hover {
            background: #059669;
        }
        
        .btn-danger {
            background: #ef4444;
            color: white;
        }
        
        .btn-danger:hover {
            background: #dc2626;
        }
        
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .badge-success {
            background: #d1fae5;
            color: #065f46;
        }
        
        .badge-warning {
            background: #fef3c7;
            color: #92400e;
        }
        
        .badge-danger {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }
        
        .modal.active {
            display: flex;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
        }
        
        .filter-chip {
            display: inline-block;
            padding: 6px 12px;
            background: #e5e7eb;
            border-radius: 16px;
            font-size: 14px;
            margin: 4px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .filter-chip:hover {
            background: var(--navy-dark);
            color: white;
        }
        
        .filter-chip.active {
            background: var(--gold);
            color: var(--navy-dark);
        }
    </style>
</head>
<body>
    ${AdminSidebar('/admin/products')}
    
    <div class="admin-content">
        <div class="p-8">
            <!-- Header -->
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-box-open mr-3"></i>Produkte verwalten
                    </h1>
                    <p class="text-gray-600">Alle Produkte im Überblick und bearbeiten</p>
                </div>
                <div class="flex gap-3">
                    <button onclick="openBulkImport()" class="btn-primary">
                        <i class="fas fa-file-upload mr-2"></i>Bulk Import
                    </button>
                    <button onclick="openAddProduct()" class="btn-success btn-primary">
                        <i class="fas fa-plus mr-2"></i>Neues Produkt
                    </button>
                    <button onclick="exportProducts()" class="btn-primary">
                        <i class="fas fa-download mr-2"></i>Export CSV
                    </button>
                </div>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" id="stats">
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Gesamt Produkte</p>
                            <p class="text-3xl font-bold text-gray-800 mt-2" id="total-products">0</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-box text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Aktiv</p>
                            <p class="text-3xl font-bold text-green-600 mt-2" id="active-products">0</p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Niedrig Lagerbestand</p>
                            <p class="text-3xl font-bold text-orange-600 mt-2" id="low-stock">0</p>
                        </div>
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-exclamation-triangle text-orange-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Gesamtwert</p>
                            <p class="text-3xl font-bold text-purple-600 mt-2" id="total-value">€0</p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-euro-sign text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Kategorie</label>
                        <select id="filter-category" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadProducts()">
                            <option value="">Alle Kategorien</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Marke</label>
                        <select id="filter-brand" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadProducts()">
                            <option value="">Alle Marken</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select id="filter-status" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadProducts()">
                            <option value="">Alle Status</option>
                            <option value="active">Aktiv</option>
                            <option value="inactive">Inaktiv</option>
                            <option value="draft">Entwurf</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Produkttyp</label>
                        <select id="filter-type" class="w-full border border-gray-300 rounded-lg px-4 py-2" onchange="loadProducts()">
                            <option value="">Alle Typen</option>
                            <option value="license">Lizenz</option>
                            <option value="download">Download</option>
                            <option value="physical">Physisch</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Suche</label>
                        <input type="text" id="filter-search" placeholder="Produktname, SKU..." 
                               class="w-full border border-gray-300 rounded-lg px-4 py-2"
                               onkeyup="debounceSearch()">
                    </div>
                </div>
                
                <div class="mt-4 flex gap-2">
                    <button onclick="resetFilters()" class="text-sm text-gray-600 hover:text-gray-800">
                        <i class="fas fa-redo mr-1"></i>Filter zurücksetzen
                    </button>
                </div>
            </div>

            <!-- Bulk Actions -->
            <div class="bg-white rounded-lg shadow p-4 mb-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <input type="checkbox" id="select-all" onchange="toggleSelectAll()" class="w-4 h-4">
                        <span class="text-sm text-gray-600">
                            <span id="selected-count">0</span> ausgewählt
                        </span>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="bulkAction('activate')" class="btn-success btn-primary text-sm py-2">
                            <i class="fas fa-check mr-1"></i>Aktivieren
                        </button>
                        <button onclick="bulkAction('deactivate')" class="btn-primary text-sm py-2">
                            <i class="fas fa-ban mr-1"></i>Deaktivieren
                        </button>
                        <button onclick="bulkAction('delete')" class="btn-danger btn-primary text-sm py-2">
                            <i class="fas fa-trash mr-1"></i>Löschen
                        </button>
                        <button onclick="bulkExport()" class="btn-primary text-sm py-2">
                            <i class="fas fa-download mr-1"></i>Export
                        </button>
                    </div>
                </div>
            </div>

            <!-- Products List -->
            <div class="bg-white rounded-lg shadow">
                <div id="products-list" class="divide-y">
                    <!-- Products will be loaded here -->
                    <div class="p-8 text-center text-gray-500">
                        <i class="fas fa-spinner fa-spin text-3xl mb-4"></i>
                        <p>Lade Produkte...</p>
                    </div>
                </div>
                
                <!-- Pagination -->
                <div class="p-6 border-t" id="pagination">
                    <!-- Pagination will be loaded here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div id="product-modal" class="modal">
        <div class="modal-content">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">
                    <i class="fas fa-box mr-2"></i><span id="modal-title">Neues Produkt</span>
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <form id="product-form" class="space-y-4">
                <input type="hidden" id="product-id">
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Produktname (DE) *</label>
                        <input type="text" id="product-name-de" required
                               class="w-full border border-gray-300 rounded-lg px-4 py-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                        <input type="text" id="product-sku" required
                               class="w-full border border-gray-300 rounded-lg px-4 py-2">
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Kategorie *</label>
                        <select id="product-category" required
                                class="w-full border border-gray-300 rounded-lg px-4 py-2">
                            <option value="">Wählen...</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Marke</label>
                        <select id="product-brand"
                                class="w-full border border-gray-300 rounded-lg px-4 py-2">
                            <option value="">Wählen...</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Produkttyp *</label>
                        <select id="product-type" required
                                class="w-full border border-gray-300 rounded-lg px-4 py-2">
                            <option value="license">Lizenz</option>
                            <option value="download">Download</option>
                            <option value="physical">Physisch</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Beschreibung (DE)</label>
                    <textarea id="product-description-de" rows="3"
                              class="w-full border border-gray-300 rounded-lg px-4 py-2"></textarea>
                </div>
                
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Preis (€) *</label>
                        <input type="number" id="product-price" step="0.01" required
                               class="w-full border border-gray-300 rounded-lg px-4 py-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Alter Preis (€)</label>
                        <input type="number" id="product-old-price" step="0.01"
                               class="w-full border border-gray-300 rounded-lg px-4 py-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Mehrwertsteuer (%)</label>
                        <input type="number" id="product-tax" value="19" step="0.01"
                               class="w-full border border-gray-300 rounded-lg px-4 py-2">
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Lagerbestand</label>
                        <input type="number" id="product-stock" value="999"
                               class="w-full border border-gray-300 rounded-lg px-4 py-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Mindestbestand Warnung</label>
                        <input type="number" id="product-min-stock" value="10"
                               class="w-full border border-gray-300 rounded-lg px-4 py-2">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Produktbild URL</label>
                    <input type="url" id="product-image"
                           class="w-full border border-gray-300 rounded-lg px-4 py-2"
                           placeholder="https://...">
                </div>
                
                <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2">
                        <input type="checkbox" id="product-active" checked class="w-4 h-4">
                        <span class="text-sm text-gray-700">Aktiv</span>
                    </label>
                    
                    <label class="flex items-center gap-2">
                        <input type="checkbox" id="product-featured" class="w-4 h-4">
                        <span class="text-sm text-gray-700">Featured</span>
                    </label>
                </div>
                
                <div class="flex gap-3 pt-4">
                    <button type="submit" class="btn-success btn-primary flex-1">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                    <button type="button" onclick="closeModal()" class="btn-primary flex-1">
                        <i class="fas fa-times mr-2"></i>Abbrechen
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Bulk Import Modal -->
    <div id="bulk-import-modal" class="modal">
        <div class="modal-content">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">
                    <i class="fas fa-file-upload mr-2"></i>Bulk Import
                </h2>
                <button onclick="closeBulkImport()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 class="font-semibold text-blue-900 mb-2">
                        <i class="fas fa-info-circle mr-2"></i>CSV Format
                    </h3>
                    <p class="text-sm text-blue-800">
                        SKU, Name_DE, Description_DE, Category_ID, Brand_ID, Price, Old_Price, Tax_Rate, Stock, Min_Stock, Product_Type, Image_URL, Is_Active, Is_Featured
                    </p>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">CSV Datei auswählen</label>
                    <input type="file" id="import-file" accept=".csv"
                           class="w-full border border-gray-300 rounded-lg px-4 py-2">
                </div>
                
                <div id="import-preview" class="hidden">
                    <h3 class="font-semibold mb-2">Vorschau:</h3>
                    <div class="bg-gray-50 rounded-lg p-4 max-h-60 overflow-auto">
                        <pre id="preview-content" class="text-xs"></pre>
                    </div>
                </div>
                
                <div class="flex gap-3">
                    <button onclick="processImport()" class="btn-success btn-primary flex-1">
                        <i class="fas fa-upload mr-2"></i>Importieren
                    </button>
                    <button onclick="downloadTemplate()" class="btn-primary flex-1">
                        <i class="fas fa-download mr-2"></i>Vorlage herunterladen
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        let products = [];
        let categories = [];
        let brands = [];
        let currentPage = 1;
        let totalPages = 1;
        let selectedProducts = new Set();
        let searchTimeout;

        async function loadData() {
            try {
                // Load categories
                const catRes = await axios.get('/api/categories');
                categories = catRes.data.data || [];
                
                // Load brands
                const brandRes = await axios.get('/api/brands');
                brands = brandRes.data.data || [];
                
                // Populate dropdowns
                populateDropdowns();
                
                // Load products
                await loadProducts();
                await loadStats();
            } catch (error) {
                console.error('Error loading data:', error);
            }
        }

        function populateDropdowns() {
            // Category dropdowns
            const catSelects = ['filter-category', 'product-category'];
            catSelects.forEach(id => {
                const select = document.getElementById(id);
                if (select && categories.length > 0) {
                    categories.forEach(cat => {
                        const option = document.createElement('option');
                        option.value = cat.id;
                        option.textContent = cat.name;
                        select.appendChild(option);
                    });
                }
            });
            
            // Brand dropdowns
            const brandSelects = ['filter-brand', 'product-brand'];
            brandSelects.forEach(id => {
                const select = document.getElementById(id);
                if (select && brands.length > 0) {
                    brands.forEach(brand => {
                        const option = document.createElement('option');
                        option.value = brand.id;
                        option.textContent = brand.name;
                        select.appendChild(option);
                    });
                }
            });
        }

        async function loadProducts() {
            try {
                const category = document.getElementById('filter-category').value;
                const brand = document.getElementById('filter-brand').value;
                const status = document.getElementById('filter-status').value;
                const type = document.getElementById('filter-type').value;
                const search = document.getElementById('filter-search').value;
                
                let url = \`/api/admin/products?page=\${currentPage}&limit=20\`;
                if (category) url += \`&category=\${category}\`;
                if (brand) url += \`&brand=\${brand}\`;
                if (status) url += \`&status=\${status}\`;
                if (type) url += \`&type=\${type}\`;
                if (search) url += \`&search=\${encodeURIComponent(search)}\`;
                
                const res = await axios.get(url);
                products = res.data.data || [];
                totalPages = res.data.pagination?.total_pages || 1;
                
                renderProducts();
                renderPagination();
            } catch (error) {
                console.error('Error loading products:', error);
                document.getElementById('products-list').innerHTML = \`
                    <div class="p-8 text-center text-red-500">
                        <i class="fas fa-exclamation-triangle text-3xl mb-4"></i>
                        <p>Fehler beim Laden der Produkte</p>
                    </div>
                \`;
            }
        }

        async function loadStats() {
            try {
                const res = await axios.get('/api/admin/products/stats');
                const stats = res.data.data || {};
                
                document.getElementById('total-products').textContent = stats.total || 0;
                document.getElementById('active-products').textContent = stats.active || 0;
                document.getElementById('low-stock').textContent = stats.low_stock || 0;
                document.getElementById('total-value').textContent = \`€\${(stats.total_value || 0).toFixed(2)}\`;
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }

        function renderProducts() {
            const container = document.getElementById('products-list');
            
            if (products.length === 0) {
                container.innerHTML = \`
                    <div class="p-8 text-center text-gray-500">
                        <i class="fas fa-box-open text-5xl mb-4"></i>
                        <p>Keine Produkte gefunden</p>
                    </div>
                \`;
                return;
            }
            
            container.innerHTML = products.map(product => {
                const isSelected = selectedProducts.has(product.id);
                const statusBadge = product.is_active ? 
                    '<span class="badge badge-success">Aktiv</span>' : 
                    '<span class="badge badge-danger">Inaktiv</span>';
                const imageUrl = product.image_url || '/static/placeholder.png';
                
                return \`
                    <div class="p-4 hover:bg-gray-50 transition">
                        <div class="flex items-center gap-4">
                            <input type="checkbox" class="w-4 h-4" 
                                   \${isSelected ? 'checked' : ''}
                                   onchange="toggleProduct(\${product.id})">
                            
                            <img src="\${imageUrl}" alt="\${product.name}" 
                                 class="product-image" onerror="this.src='/static/placeholder.png'">
                            
                            <div class="flex-1">
                                <div class="flex items-start justify-between">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">\${product.name}</h3>
                                        <p class="text-sm text-gray-500">SKU: \${product.sku}</p>
                                        <div class="mt-2 flex items-center gap-2">
                                            \${statusBadge}
                                            <span class="text-xs text-gray-500">\${product.category_name || 'N/A'}</span>
                                            <span class="text-xs text-gray-500">|\${product.brand_name || 'N/A'}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="text-right">
                                        <p class="text-2xl font-bold text-gray-800">€\${parseFloat(product.price).toFixed(2)}</p>
                                        \${product.old_price ? \`<p class="text-sm text-gray-400 line-through">€\${parseFloat(product.old_price).toFixed(2)}</p>\` : ''}
                                        <p class="text-sm text-gray-500 mt-1">Lager: \${product.stock_quantity || 0}</p>
                                    </div>
                                </div>
                                
                                <div class="mt-3 flex gap-2">
                                    <button onclick="editProduct(\${product.id})" 
                                            class="text-sm text-blue-600 hover:text-blue-800">
                                        <i class="fas fa-edit mr-1"></i>Bearbeiten
                                    </button>
                                    <button onclick="duplicateProduct(\${product.id})" 
                                            class="text-sm text-green-600 hover:text-green-800">
                                        <i class="fas fa-copy mr-1"></i>Duplizieren
                                    </button>
                                    <button onclick="viewProduct(\${product.id})" 
                                            class="text-sm text-purple-600 hover:text-purple-800">
                                        <i class="fas fa-eye mr-1"></i>Ansehen
                                    </button>
                                    <button onclick="deleteProduct(\${product.id})" 
                                            class="text-sm text-red-600 hover:text-red-800">
                                        <i class="fas fa-trash mr-1"></i>Löschen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                \`;
            }).join('');
            
            updateSelectedCount();
        }

        function renderPagination() {
            const container = document.getElementById('pagination');
            if (totalPages <= 1) {
                container.innerHTML = '';
                return;
            }
            
            let html = '<div class="flex items-center justify-between">';
            html += \`<p class="text-sm text-gray-600">Seite \${currentPage} von \${totalPages}</p>\`;
            html += '<div class="flex gap-2">';
            
            if (currentPage > 1) {
                html += \`<button onclick="goToPage(\${currentPage - 1})" class="btn-primary text-sm py-2">
                    <i class="fas fa-chevron-left"></i> Zurück
                </button>\`;
            }
            
            if (currentPage < totalPages) {
                html += \`<button onclick="goToPage(\${currentPage + 1})" class="btn-primary text-sm py-2">
                    Weiter <i class="fas fa-chevron-right"></i>
                </button>\`;
            }
            
            html += '</div></div>';
            container.innerHTML = html;
        }

        function goToPage(page) {
            currentPage = page;
            loadProducts();
        }

        function debounceSearch() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentPage = 1;
                loadProducts();
            }, 500);
        }

        function resetFilters() {
            document.getElementById('filter-category').value = '';
            document.getElementById('filter-brand').value = '';
            document.getElementById('filter-status').value = '';
            document.getElementById('filter-type').value = '';
            document.getElementById('filter-search').value = '';
            currentPage = 1;
            loadProducts();
        }

        function toggleProduct(id) {
            if (selectedProducts.has(id)) {
                selectedProducts.delete(id);
            } else {
                selectedProducts.add(id);
            }
            updateSelectedCount();
            renderProducts();
        }

        function toggleSelectAll() {
            const checked = document.getElementById('select-all').checked;
            if (checked) {
                products.forEach(p => selectedProducts.add(p.id));
            } else {
                selectedProducts.clear();
            }
            updateSelectedCount();
            renderProducts();
        }

        function updateSelectedCount() {
            document.getElementById('selected-count').textContent = selectedProducts.size;
        }

        function openAddProduct() {
            document.getElementById('product-id').value = '';
            document.getElementById('modal-title').textContent = 'Neues Produkt';
            document.getElementById('product-form').reset();
            document.getElementById('product-active').checked = true;
            document.getElementById('product-modal').classList.add('active');
        }

        async function editProduct(id) {
            try {
                const res = await axios.get(\`/api/admin/products/\${id}\`);
                const product = res.data.data;
                
                document.getElementById('product-id').value = product.id;
                document.getElementById('modal-title').textContent = 'Produkt bearbeiten';
                document.getElementById('product-name-de').value = product.name || '';
                document.getElementById('product-sku').value = product.sku || '';
                document.getElementById('product-category').value = product.category_id || '';
                document.getElementById('product-brand').value = product.brand_id || '';
                document.getElementById('product-type').value = product.product_type || 'license';
                document.getElementById('product-description-de').value = product.description || '';
                document.getElementById('product-price').value = product.price || '';
                document.getElementById('product-old-price').value = product.old_price || '';
                document.getElementById('product-tax').value = product.tax_rate || 19;
                document.getElementById('product-stock').value = product.stock_quantity || 999;
                document.getElementById('product-min-stock').value = product.min_stock_alert || 10;
                document.getElementById('product-image').value = product.image_url || '';
                document.getElementById('product-active').checked = product.is_active;
                document.getElementById('product-featured').checked = product.is_featured;
                
                document.getElementById('product-modal').classList.add('active');
            } catch (error) {
                console.error('Error loading product:', error);
                alert('Fehler beim Laden des Produkts');
            }
        }

        function closeModal() {
            document.getElementById('product-modal').classList.remove('active');
        }

        document.getElementById('product-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const id = document.getElementById('product-id').value;
            const data = {
                name_de: document.getElementById('product-name-de').value,
                sku: document.getElementById('product-sku').value,
                category_id: parseInt(document.getElementById('product-category').value),
                brand_id: document.getElementById('product-brand').value ? parseInt(document.getElementById('product-brand').value) : null,
                product_type: document.getElementById('product-type').value,
                description_de: document.getElementById('product-description-de').value,
                price: parseFloat(document.getElementById('product-price').value),
                old_price: document.getElementById('product-old-price').value ? parseFloat(document.getElementById('product-old-price').value) : null,
                tax_rate: parseFloat(document.getElementById('product-tax').value),
                stock_quantity: parseInt(document.getElementById('product-stock').value),
                min_stock_alert: parseInt(document.getElementById('product-min-stock').value),
                image_url: document.getElementById('product-image').value,
                is_active: document.getElementById('product-active').checked,
                is_featured: document.getElementById('product-featured').checked
            };
            
            try {
                if (id) {
                    await axios.put(\`/api/admin/products/\${id}\`, data);
                } else {
                    await axios.post('/api/admin/products', data);
                }
                
                closeModal();
                loadProducts();
                loadStats();
                alert('Produkt erfolgreich gespeichert!');
            } catch (error) {
                console.error('Error saving product:', error);
                alert('Fehler beim Speichern: ' + (error.response?.data?.error || 'Unbekannter Fehler'));
            }
        });

        async function deleteProduct(id) {
            if (!confirm('Möchten Sie dieses Produkt wirklich löschen?')) return;
            
            try {
                await axios.delete(\`/api/admin/products/\${id}\`);
                loadProducts();
                loadStats();
                alert('Produkt gelöscht!');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Fehler beim Löschen');
            }
        }

        async function duplicateProduct(id) {
            try {
                await axios.post(\`/api/admin/products/\${id}/duplicate\`);
                loadProducts();
                loadStats();
                alert('Produkt dupliziert!');
            } catch (error) {
                console.error('Error duplicating product:', error);
                alert('Fehler beim Duplizieren');
            }
        }

        function viewProduct(id) {
            const product = products.find(p => p.id === id);
            if (product && product.slug) {
                window.open(\`/produkt/\${product.slug}\`, '_blank');
            }
        }

        async function bulkAction(action) {
            if (selectedProducts.size === 0) {
                alert('Bitte wählen Sie mindestens ein Produkt aus');
                return;
            }
            
            if (!confirm(\`Möchten Sie diese Aktion für \${selectedProducts.size} Produkte durchführen?\`)) return;
            
            try {
                await axios.post('/api/admin/products/bulk', {
                    action,
                    product_ids: Array.from(selectedProducts)
                });
                
                selectedProducts.clear();
                loadProducts();
                loadStats();
                alert('Aktion erfolgreich durchgeführt!');
            } catch (error) {
                console.error('Error in bulk action:', error);
                alert('Fehler bei der Aktion');
            }
        }

        async function bulkExport() {
            if (selectedProducts.size === 0) {
                alert('Bitte wählen Sie mindestens ein Produkt aus');
                return;
            }
            
            const ids = Array.from(selectedProducts).join(',');
            window.location.href = \`/api/admin/products/export?ids=\${ids}\`;
        }

        async function exportProducts() {
            window.location.href = '/api/admin/products/export';
        }

        function openBulkImport() {
            document.getElementById('bulk-import-modal').classList.add('active');
        }

        function closeBulkImport() {
            document.getElementById('bulk-import-modal').classList.remove('active');
            document.getElementById('import-file').value = '';
            document.getElementById('import-preview').classList.add('hidden');
        }

        document.getElementById('import-file').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const preview = event.target.result.split('\\n').slice(0, 5).join('\\n');
                    document.getElementById('preview-content').textContent = preview + '\\n...';
                    document.getElementById('import-preview').classList.remove('hidden');
                };
                reader.readAsText(file);
            }
        });

        async function processImport() {
            const file = document.getElementById('import-file').files[0];
            if (!file) {
                alert('Bitte wählen Sie eine Datei aus');
                return;
            }
            
            const formData = new FormData();
            formData.append('file', file);
            
            try {
                const res = await axios.post('/api/admin/products/import', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                
                closeBulkImport();
                loadProducts();
                loadStats();
                alert(\`Import erfolgreich! \${res.data.imported || 0} Produkte importiert.\`);
            } catch (error) {
                console.error('Error importing:', error);
                alert('Fehler beim Import: ' + (error.response?.data?.error || 'Unbekannter Fehler'));
            }
        }

        function downloadTemplate() {
            const template = 'SKU,Name_DE,Description_DE,Category_ID,Brand_ID,Price,Old_Price,Tax_Rate,Stock,Min_Stock,Product_Type,Image_URL,Is_Active,Is_Featured\\n' +
                           'WIN11-PRO-DE,Windows 11 Pro,Vollversion,2,1,79.99,129.99,19,999,10,license,/static/products/win11.jpg,1,1';
            
            const blob = new Blob([template], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'products_import_template.csv';
            a.click();
        }

        // Load data on page load
        loadData();
    </script>
</body>
</html>`;
}
