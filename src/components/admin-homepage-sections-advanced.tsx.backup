import type { FC } from 'hono/jsx'

export const AdminHomepageSectionsAdvanced: FC = () => {
  return (
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Homepage-Verwaltung - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
        <style>{`
          :root {
            --navy-dark: #1a2a4e;
            --gold: #d4af37;
            --success: #10b981;
            --danger: #ef4444;
            --warning: #f59e0b;
            --info: #3b82f6;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
          }

          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 280px;
            height: 100vh;
            background: linear-gradient(180deg, var(--navy-dark) 0%, #0f1729 100%);
            color: white;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 4px 0 20px rgba(0,0,0,0.2);
          }

          .admin-content {
            margin-left: 280px;
            padding: 2rem;
            min-height: 100vh;
          }

          .section-card {
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: move;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
          }

          .section-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--gold), var(--navy-dark));
            transform: scaleX(0);
            transition: transform 0.3s;
          }

          .section-card:hover::before {
            transform: scaleX(1);
          }

          .section-card:hover {
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            transform: translateY(-2px);
            border-color: var(--gold);
          }

          .section-card.dragging {
            opacity: 0.6;
            transform: scale(0.98) rotate(2deg);
            box-shadow: 0 12px 32px rgba(0,0,0,0.2);
          }

          .section-preview {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            padding: 2rem;
            color: white;
            margin-top: 1rem;
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .section-preview::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }

          .template-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            border: 2px solid #e5e7eb;
            transition: all 0.3s;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .template-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, var(--gold) 0%, var(--navy-dark) 100%);
            opacity: 0;
            transition: opacity 0.3s;
          }

          .template-card:hover {
            border-color: var(--gold);
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          }

          .template-card:hover::before {
            opacity: 0.05;
          }

          .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
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

          .badge-info {
            background: #dbeafe;
            color: #1e40af;
          }

          .stat-card {
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
          }

          .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, var(--gold) 0%, transparent 70%);
            opacity: 0.1;
            transform: translate(30%, -30%);
          }

          .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          }

          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
          }

          @keyframes fadeIn {
            to { opacity: 1; }
          }

          .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            transform: scale(0.9);
            animation: scaleUp 0.3s forwards;
          }

          @keyframes scaleUp {
            to { transform: scale(1); }
          }

          .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 10px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
          }

          .btn-primary {
            background: linear-gradient(135deg, var(--gold) 0%, #b8941f 100%);
            color: var(--navy-dark);
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
          }

          .btn-secondary {
            background: var(--navy-dark);
            color: white;
          }

          .btn-secondary:hover {
            background: #0f1729;
            transform: translateY(-2px);
          }

          .btn-danger {
            background: var(--danger);
            color: white;
          }

          .btn-success {
            background: var(--success);
            color: white;
          }

          .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
          }

          .product-item {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.2s;
          }

          .product-item:hover {
            border-color: var(--gold);
            transform: translateY(-2px);
          }

          .product-item.selected {
            border-color: var(--gold);
            background: rgba(212, 175, 55, 0.05);
          }

          .drag-handle {
            cursor: grab;
            color: #9ca3af;
            font-size: 1.25rem;
          }

          .drag-handle:active {
            cursor: grabbing;
          }

          .section-actions {
            display: flex;
            gap: 0.5rem;
            opacity: 0;
            transition: opacity 0.3s;
          }

          .section-card:hover .section-actions {
            opacity: 1;
          }

          .toggle-switch {
            position: relative;
            width: 50px;
            height: 26px;
            background: #d1d5db;
            border-radius: 13px;
            cursor: pointer;
            transition: background 0.3s;
          }

          .toggle-switch.active {
            background: var(--success);
          }

          .toggle-switch::before {
            content: '';
            position: absolute;
            width: 22px;
            height: 22px;
            background: white;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            transition: transform 0.3s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }

          .toggle-switch.active::before {
            transform: translateX(24px);
          }
        `}</style>
      </head>
      <body>
        <div class="flex">
          {/* Sidebar */}
          <div class="admin-sidebar">
            <div class="p-6 border-b border-gray-700">
              <h2 class="text-2xl font-bold" style="color: var(--gold)">SOFTWAREKING24</h2>
              <p class="text-sm text-gray-400 mt-1">Homepage Editor</p>
            </div>
            <nav class="p-4" id="sidebar-nav">
              {/* Will be populated by JS */}
            </nav>
          </div>

          {/* Main Content */}
          <div class="admin-content">
            {/* Header */}
            <div class="mb-8">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h1 class="text-4xl font-bold text-gray-800 mb-2">
                    <i class="fas fa-th-large mr-3" style="color: var(--gold)"></i>
                    Homepage-Verwaltung
                  </h1>
                  <p class="text-gray-600">Gestalten Sie die Startseite mit Drag & Drop</p>
                </div>
                <div class="flex gap-3">
                  <button onclick="showTemplates()" class="btn btn-secondary">
                    <i class="fas fa-layer-group"></i>
                    Vorlagen
                  </button>
                  <button onclick="showAddSection()" class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    Neue Sektion
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div class="flex gap-3 mb-6">
                <button onclick="enableAll()" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                  <i class="fas fa-check-circle mr-2"></i>Alle aktivieren
                </button>
                <button onclick="disableAll()" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all">
                  <i class="fas fa-times-circle mr-2"></i>Alle deaktivieren
                </button>
                <button onclick="saveOrder()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                  <i class="fas fa-save mr-2"></i>Reihenfolge speichern
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div class="stat-card">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm font-medium">Gesamt</p>
                    <p class="text-3xl font-bold text-gray-800" id="total-sections">0</p>
                  </div>
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-th-large text-blue-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div class="stat-card">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm font-medium">Aktiv</p>
                    <p class="text-3xl font-bold text-green-600" id="active-sections">0</p>
                  </div>
                  <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-check-circle text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div class="stat-card">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm font-medium">Inaktiv</p>
                    <p class="text-3xl font-bold text-gray-400" id="inactive-sections">0</p>
                  </div>
                  <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-pause-circle text-gray-400 text-xl"></i>
                  </div>
                </div>
              </div>

              <div class="stat-card">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm font-medium">Produkte</p>
                    <p class="text-3xl font-bold" style="color: var(--gold)" id="total-products">0</p>
                  </div>
                  <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(212, 175, 55, 0.1)">
                    <i class="fas fa-box text-xl" style="color: var(--gold)"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Sections List */}
            <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 class="text-2xl font-bold mb-4 text-gray-800">
                <i class="fas fa-list mr-2" style="color: var(--gold)"></i>
                Sektionen
              </h2>
              <div id="sections-container">
                <div class="text-center py-12">
                  <i class="fas fa-spinner fa-spin text-5xl mb-4" style="color: var(--gold)"></i>
                  <p class="text-gray-500">Lade Sektionen...</p>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-800">
                  <i class="fas fa-eye mr-2" style="color: var(--gold)"></i>
                  Live-Vorschau
                </h2>
                <button onclick="refreshPreview()" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all">
                  <i class="fas fa-sync-alt mr-2"></i>Aktualisieren
                </button>
              </div>
              <div id="live-preview" class="border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-96">
                <div class="text-center text-gray-400">
                  <i class="fas fa-desktop text-6xl mb-4"></i>
                  <p>Vorschau wird hier angezeigt</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Section Modal */}
        <div id="add-section-modal" class="hidden modal-overlay" onclick="if(event.target === this) hideAddSection()">
          <div class="modal-content" style="max-width: 1200px" onclick="event.stopPropagation()">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-plus-circle mr-2" style="color: var(--gold)"></i>
                Neue Sektion hinzufügen
              </h2>
              <button onclick="hideAddSection()" class="text-gray-400 hover:text-gray-600 text-2xl">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Sektionstyp wählen</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4" id="section-types">
                {/* Will be populated by JS */}
              </div>
            </div>

            <div id="section-form" class="hidden">
              <form onsubmit="saveSection(event)" class="space-y-6">
                <input type="hidden" id="section-id" />
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Titel (Deutsch)</label>
                    <input type="text" id="section-title-de" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent" placeholder="z.B. Beliebte Produkte" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Untertitel</label>
                    <input type="text" id="section-subtitle" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent" placeholder="z.B. Unsere meistverkauften Artikel" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Produkte auswählen</label>
                  <div class="flex gap-2 mb-2">
                    <button type="button" onclick="loadProducts('all')" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">Alle</button>
                    <button type="button" onclick="loadProducts('featured')" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">Featured</button>
                    <button type="button" onclick="loadProducts('new')" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">Neu</button>
                    <button type="button" onclick="loadProducts('sale')" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">Sale</button>
                  </div>
                  <div class="product-grid" id="products-grid">
                    <div class="col-span-full text-center py-8 text-gray-500">
                      Klicken Sie auf eine Kategorie, um Produkte zu laden
                    </div>
                  </div>
                </div>

                <div class="flex gap-3 justify-end">
                  <button type="button" onclick="hideAddSection()" class="btn btn-secondary">
                    <i class="fas fa-times mr-2"></i>Abbrechen
                  </button>
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save mr-2"></i>Speichern
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Templates Modal */}
        <div id="templates-modal" class="hidden modal-overlay" onclick="if(event.target === this) hideTemplates()">
          <div class="modal-content" style="max-width: 1200px" onclick="event.stopPropagation()">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-layer-group mr-2" style="color: var(--gold)"></i>
                Vorlagen
              </h2>
              <button onclick="hideTemplates()" class="text-gray-400 hover:text-gray-600 text-2xl">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="template-card" onclick="applyTemplate('ecommerce')">
                <div class="relative z-10">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <i class="fas fa-shopping-cart text-blue-600 text-xl"></i>
                  </div>
                  <h3 class="font-bold text-lg mb-2">E-Commerce Standard</h3>
                  <p class="text-sm text-gray-600 mb-3">Hero + Featured + Bestsellers + New Products</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="badge badge-info">4 Sektionen</span>
                  </div>
                </div>
              </div>

              <div class="template-card" onclick="applyTemplate('minimal')">
                <div class="relative z-10">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <i class="fas fa-spa text-purple-600 text-xl"></i>
                  </div>
                  <h3 class="font-bold text-lg mb-2">Minimalistisch</h3>
                  <p class="text-sm text-gray-600 mb-3">Hero + Featured Products + Testimonials</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="badge badge-info">3 Sektionen</span>
                  </div>
                </div>
              </div>

              <div class="template-card" onclick="applyTemplate('full')">
                <div class="relative z-10">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <i class="fas fa-layer-group text-green-600 text-xl"></i>
                  </div>
                  <h3 class="font-bold text-lg mb-2">Vollständig</h3>
                  <p class="text-sm text-gray-600 mb-3">Alle Sektionstypen aktiviert</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="badge badge-info">8+ Sektionen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script src="/static/auth.js"></script>
        <script>{`
          let sections = [];
          let products = [];
          let selectedProducts = [];
          let currentSectionType = '';

          // Section type configurations
          const sectionTypes = {
            hero: {
              icon: 'fas fa-image',
              name: 'Hero Banner',
              color: '#3b82f6',
              description: 'Großer Haupt-Banner mit CTA'
            },
            featured: {
              icon: 'fas fa-star',
              name: 'Featured Products',
              color: '#f59e0b',
              description: 'Hervorgehobene Produkte'
            },
            bestsellers: {
              icon: 'fas fa-fire',
              name: 'Bestseller',
              color: '#ef4444',
              description: 'Meistverkaufte Produkte'
            },
            new: {
              icon: 'fas fa-sparkles',
              name: 'Neue Produkte',
              color: '#10b981',
              description: 'Neueste Artikel'
            },
            sale: {
              icon: 'fas fa-tags',
              name: 'Sale Products',
              color: '#ec4899',
              description: 'Reduzierte Produkte'
            },
            categories: {
              icon: 'fas fa-th',
              name: 'Kategorien',
              color: '#8b5cf6',
              description: 'Produkt-Kategorien'
            },
            testimonials: {
              icon: 'fas fa-quote-left',
              name: 'Testimonials',
              color: '#06b6d4',
              description: 'Kundenbewertungen'
            },
            brands: {
              icon: 'fas fa-crown',
              name: 'Marken',
              color: '#f97316',
              description: 'Partner-Marken'
            }
          };

          document.addEventListener('DOMContentLoaded', () => {
            initSidebar();
            loadSections();
            renderSectionTypes();
            
            // ESC key to close modals
            document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape') {
                const templatesModal = document.getElementById('templates-modal');
                const addSectionModal = document.getElementById('add-section-modal');
                
                if (templatesModal && !templatesModal.classList.contains('hidden')) {
                  hideTemplates();
                }
                if (addSectionModal && !addSectionModal.classList.contains('hidden')) {
                  hideAddSection();
                }
              }
            });
          });

          function initSidebar() {
            const sidebar = document.getElementById('sidebar-nav');
            const items = [
              { path: '/admin', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
              { path: '/admin/products', icon: 'fas fa-box', label: 'Produkte' },
              { path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Bestellungen' },
              { path: '/admin/customers', icon: 'fas fa-users', label: 'Kunden' },
              { path: '/admin/invoices', icon: 'fas fa-file-invoice', label: 'Rechnungen' },
              { path: '/admin/licenses', icon: 'fas fa-key', label: 'Lizenzen' },
              { path: '/admin/sliders', icon: 'fas fa-images', label: 'Slider' },
              { path: '/admin/homepage-sections', icon: 'fas fa-th-large', label: 'Homepage', active: true },
              { path: '/admin/pages', icon: 'fas fa-file-alt', label: 'Seiten' },
              { path: '/admin/footer', icon: 'fas fa-shoe-prints', label: 'Footer' },
              { path: '/admin/email-templates', icon: 'fas fa-envelope', label: 'E-Mail' },
              { path: '/admin/cookies', icon: 'fas fa-cookie-bite', label: 'Cookies' },
              { path: '/admin/contact-messages', icon: 'fas fa-comments', label: 'Kontakt' },
              { path: '/admin/settings', icon: 'fas fa-cog', label: 'Einstellungen' }
            ];

            sidebar.innerHTML = items.map(item => \`
              <a href="\${item.path}" class="nav-item \${item.active ? 'active' : ''}">
                <i class="\${item.icon}"></i>
                <span>\${item.label}</span>
              </a>
            \`).join('');
          }

          async function loadSections() {
            try {
              const response = await axios.get('/api/admin/homepage-sections');
              if (response.data.success) {
                sections = response.data.data;
                renderSections();
                updateStats();
              }
            } catch (error) {
              console.error('Error loading sections:', error);
              document.getElementById('sections-container').innerHTML = \`
                <div class="text-center py-12 text-red-600">
                  <i class="fas fa-exclamation-circle text-5xl mb-4"></i>
                  <p>Fehler beim Laden der Sektionen</p>
                </div>
              \`;
            }
          }

          function renderSections() {
            const container = document.getElementById('sections-container');
            
            if (sections.length === 0) {
              container.innerHTML = \`
                <div class="text-center py-12 text-gray-400">
                  <i class="fas fa-inbox text-6xl mb-4"></i>
                  <p class="text-xl mb-4">Keine Sektionen vorhanden</p>
                  <button onclick="showAddSection()" class="btn btn-primary">
                    <i class="fas fa-plus mr-2"></i>Erste Sektion erstellen
                  </button>
                </div>
              \`;
              return;
            }

            container.innerHTML = sections.map((section, index) => {
              const typeConfig = sectionTypes[section.section_type] || {};
              return \`
                <div class="section-card" data-id="\${section.id}">
                  <div class="flex items-start gap-4">
                    <div class="drag-handle">
                      <i class="fas fa-grip-vertical"></i>
                    </div>

                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-2">
                        <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: \${typeConfig.color}15">
                          <i class="\${typeConfig.icon || 'fas fa-square'} text-lg" style="color: \${typeConfig.color}"></i>
                        </div>
                        <div class="flex-1">
                          <h3 class="font-bold text-lg text-gray-800">\${typeConfig.name || section.section_type}</h3>
                          <p class="text-sm text-gray-500">\${section.section_key}</p>
                        </div>
                        <div class="flex items-center gap-3">
                          <span class="badge \${section.is_enabled ? 'badge-success' : 'badge-warning'}">
                            <i class="fas fa-\${section.is_enabled ? 'check' : 'pause'}-circle"></i>
                            \${section.is_enabled ? 'Aktiv' : 'Inaktiv'}
                          </span>
                          <span class="badge badge-info">
                            <i class="fas fa-box"></i>
                            \${section.product_count || 0} Produkte
                          </span>
                        </div>
                      </div>

                      <div class="section-preview" style="background: linear-gradient(135deg, \${typeConfig.color}20 0%, \${typeConfig.color}40 100%)">
                        <div class="relative z-10 text-center">
                          <i class="\${typeConfig.icon} text-5xl mb-2" style="color: \${typeConfig.color}"></i>
                          <p class="text-gray-700 font-semibold">\${typeConfig.description || 'Sektion Vorschau'}</p>
                        </div>
                      </div>

                      <div class="flex items-center justify-between mt-4">
                        <div class="text-sm text-gray-500">
                          <i class="fas fa-sort mr-1"></i>Position: <span class="font-semibold">\${section.sort_order || index + 1}</span>
                        </div>
                        <div class="section-actions flex gap-2">
                          <button onclick="toggleSection(\${section.id}, \${section.is_enabled})" class="px-3 py-1 rounded-lg text-sm font-medium \${section.is_enabled ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}">
                            <i class="fas fa-\${section.is_enabled ? 'pause' : 'play'} mr-1"></i>
                            \${section.is_enabled ? 'Deaktivieren' : 'Aktivieren'}
                          </button>
                          <button onclick="editSection(\${section.id})" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button onclick="duplicateSection(\${section.id})" class="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200">
                            <i class="fas fa-copy"></i>
                          </button>
                          <button onclick="deleteSection(\${section.id})" class="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              \`;
            }).join('');

            // Initialize Sortable
            new Sortable(container, {
              animation: 200,
              handle: '.drag-handle',
              ghostClass: 'dragging',
              onEnd: function(evt) {
                // Update sort order
                const items = Array.from(container.children);
                sections = items.map((item, index) => {
                  const id = parseInt(item.dataset.id);
                  const section = sections.find(s => s.id === id);
                  return { ...section, sort_order: index };
                });
                renderSections();
                updateStats();
              }
            });
          }

          function renderSectionTypes() {
            const container = document.getElementById('section-types');
            container.innerHTML = Object.entries(sectionTypes).map(([type, config]) => \`
              <div class="template-card" onclick="selectSectionType('\${type}')">
                <div class="relative z-10">
                  <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style="background: \${config.color}15">
                    <i class="\${config.icon} text-2xl" style="color: \${config.color}"></i>
                  </div>
                  <h3 class="font-bold text-lg mb-1">\${config.name}</h3>
                  <p class="text-sm text-gray-600">\${config.description}</p>
                </div>
              </div>
            \`).join('');
          }

          function selectSectionType(type) {
            currentSectionType = type;
            document.getElementById('section-form').classList.remove('hidden');
            document.getElementById('section-form').scrollIntoView({ behavior: 'smooth' });
          }

          function updateStats() {
            const total = sections.length;
            const active = sections.filter(s => s.is_enabled).length;
            const inactive = total - active;
            const totalProducts = sections.reduce((sum, s) => sum + (s.product_count || 0), 0);

            document.getElementById('total-sections').textContent = total;
            document.getElementById('active-sections').textContent = active;
            document.getElementById('inactive-sections').textContent = inactive;
            document.getElementById('total-products').textContent = totalProducts;
          }

          function showAddSection() {
            document.getElementById('add-section-modal').classList.remove('hidden');
            document.getElementById('section-form').classList.add('hidden');
            currentSectionType = '';
            selectedProducts = [];
          }

          function hideAddSection() {
            document.getElementById('add-section-modal').classList.add('hidden');
          }

          function showTemplates() {
            document.getElementById('templates-modal').classList.remove('hidden');
          }

          function hideTemplates() {
            document.getElementById('templates-modal').classList.add('hidden');
          }

          async function loadProducts(filter) {
            try {
              const response = await axios.get('/api/products');
              if (response.data.success) {
                products = response.data.data;
                renderProducts(products);
              }
            } catch (error) {
              console.error('Error loading products:', error);
            }
          }

          function renderProducts(productList) {
            const grid = document.getElementById('products-grid');
            grid.innerHTML = productList.map(product => \`
              <div class="product-item \${selectedProducts.includes(product.id) ? 'selected' : ''}" onclick="toggleProduct(\${product.id})">
                <div class="text-center">
                  <div class="w-full h-24 bg-gray-100 rounded mb-2 flex items-center justify-center">
                    <i class="fas fa-box text-2xl text-gray-400"></i>
                  </div>
                  <p class="text-sm font-medium text-gray-800 line-clamp-2">\${product.name}</p>
                  <p class="text-xs text-gray-500 mt-1">€\${(product.base_price / 100).toFixed(2)}</p>
                </div>
              </div>
            \`).join('');
          }

          function toggleProduct(productId) {
            const index = selectedProducts.indexOf(productId);
            if (index > -1) {
              selectedProducts.splice(index, 1);
            } else {
              selectedProducts.push(productId);
            }
            renderProducts(products);
          }

          async function saveSection(event) {
            event.preventDefault();
            
            const data = {
              section_type: currentSectionType,
              section_key: document.getElementById('section-title-de').value.toLowerCase().replace(/\\s+/g, '-'),
              title_de: document.getElementById('section-title-de').value,
              subtitle_de: document.getElementById('section-subtitle').value,
              product_ids: selectedProducts
            };

            try {
              const response = await axios.post('/api/admin/homepage-sections', data);
              if (response.data.success) {
                alert('Sektion erfolgreich gespeichert!');
                hideAddSection();
                loadSections();
              }
            } catch (error) {
              console.error('Error saving section:', error);
              alert('Fehler beim Speichern der Sektion');
            }
          }

          async function toggleSection(id, currentStatus) {
            try {
              const response = await axios.patch(\`/api/admin/homepage-sections/\${id}/toggle\`);
              if (response.data.success) {
                loadSections();
              }
            } catch (error) {
              console.error('Error toggling section:', error);
            }
          }

          async function deleteSection(id) {
            if (!confirm('Möchten Sie diese Sektion wirklich löschen?')) return;

            try {
              const response = await axios.delete(\`/api/admin/homepage-sections/\${id}\`);
              if (response.data.success) {
                alert('Sektion gelöscht');
                loadSections();
              }
            } catch (error) {
              console.error('Error deleting section:', error);
            }
          }

          async function duplicateSection(id) {
            try {
              const response = await axios.post(\`/api/admin/homepage-sections/\${id}/duplicate\`);
              if (response.data.success) {
                alert('Sektion dupliziert!');
                loadSections();
              }
            } catch (error) {
              console.error('Error duplicating section:', error);
            }
          }

          async function saveOrder() {
            try {
              const order = sections.map((s, i) => ({ id: s.id, sort_order: i }));
              const response = await axios.post('/api/admin/homepage-sections/reorder', { sections: order });
              if (response.data.success) {
                alert('Reihenfolge gespeichert!');
              }
            } catch (error) {
              console.error('Error saving order:', error);
            }
          }

          async function enableAll() {
            // Implementation
            alert('Alle Sektionen werden aktiviert...');
            loadSections();
          }

          async function disableAll() {
            // Implementation
            alert('Alle Sektionen werden deaktiviert...');
            loadSections();
          }

          function applyTemplate(template) {
            alert(\`Vorlage "\${template}" wird angewendet...\`);
            hideTemplates();
          }

          function refreshPreview() {
            alert('Vorschau wird aktualisiert...');
          }
        `}</script>
      </body>
    </html>
  )
}
