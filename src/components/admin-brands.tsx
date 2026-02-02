import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminBrands() {
  const sidebar = AdminSidebarAdvanced('/admin/brands')
  
  // Sample brands data
  const brands = [
    { id: 1, name: 'Microsoft', slug: 'microsoft', product_count: 45, is_active: 1, logo_url: '', description: 'Microsoft Windows & Office Software' },
    { id: 2, name: 'Adobe', slug: 'adobe', product_count: 28, is_active: 1, logo_url: '', description: 'Creative Cloud Produkte' },
    { id: 3, name: 'Kaspersky', slug: 'kaspersky', product_count: 12, is_active: 1, logo_url: '', description: 'Antivirus & Security Software' },
    { id: 4, name: 'Autodesk', slug: 'autodesk', product_count: 8, is_active: 1, logo_url: '', description: 'CAD & 3D Software' },
    { id: 5, name: 'Corel', slug: 'corel', product_count: 6, is_active: 1, logo_url: '', description: 'Graphics & Video Software' },
  ]

  const totalProducts = brands.reduce((sum, b) => sum + b.product_count, 0)
  const activeBrands = brands.filter(b => b.is_active === 1).length

  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marken & Hersteller - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .brand-card {
            transition: all 0.3s ease;
        }
        .brand-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body class="bg-gray-50">
    ${sidebar}
    
    <div style="margin-left: 280px; padding: 2rem;">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                    <i class="fas fa-trademark mr-3 text-purple-600"></i>
                    Marken & Hersteller
                </h1>
                <p class="text-gray-600">Produktmarken verwalten</p>
            </div>
            <button class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition">
                <i class="fas fa-plus mr-2"></i>
                Neue Marke
            </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow p-6">
                <p class="text-gray-500 text-sm mb-1">Gesamt Marken</p>
                <p class="text-3xl font-bold text-purple-600">${brands.length}</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <p class="text-gray-500 text-sm mb-1">Aktive Marken</p>
                <p class="text-3xl font-bold text-green-600">${activeBrands}</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <p class="text-gray-500 text-sm mb-1">Gesamt Produkte</p>
                <p class="text-3xl font-bold text-blue-600">${totalProducts}</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <p class="text-gray-500 text-sm mb-1">Ø Produkte</p>
                <p class="text-3xl font-bold text-orange-600">${Math.round(totalProducts / brands.length)}</p>
            </div>
        </div>

        <!-- Brands Grid -->
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b flex justify-between items-center">
                <h2 class="text-xl font-semibold">Alle Marken</h2>
                <div class="flex space-x-2">
                    <input type="text" placeholder="Marke suchen..." class="px-4 py-2 border rounded-lg">
                    <button class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
                        <i class="fas fa-filter"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${brands.map(brand => `
                    <div class="brand-card border rounded-lg p-6">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 bg-purple-100 rounded flex items-center justify-center">
                                    <i class="fas fa-trademark text-purple-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-lg">${brand.name}</h3>
                                    <p class="text-sm text-gray-500">${brand.slug}</p>
                                </div>
                            </div>
                            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                Aktiv
                            </span>
                        </div>
                        
                        <p class="text-gray-600 text-sm mb-4">${brand.description}</p>
                        
                        <div class="flex items-center justify-between pt-4 border-t">
                            <div class="text-sm">
                                <i class="fas fa-box text-gray-400 mr-2"></i>
                                <span class="font-semibold">${brand.product_count}</span>
                                <span class="text-gray-500"> Produkte</span>
                            </div>
                            <div class="flex space-x-2">
                                <button class="text-blue-600 hover:text-blue-800">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="text-red-600 hover:text-red-800">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <!-- Empty State (if needed) -->
        ${brands.length === 0 ? `
        <div class="bg-white rounded-lg shadow p-12 text-center">
            <i class="fas fa-trademark text-6xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">Keine Marken gefunden</h3>
            <p class="text-gray-500 mb-6">Erstellen Sie Ihre erste Marke</p>
            <button class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
                <i class="fas fa-plus mr-2"></i>
                Marke hinzufügen
            </button>
        </div>
        ` : ''}
    </div>
</body>
</html>`
}
