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
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f7fa;
          }

          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 100vh;
            background: var(--navy-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
          }

          .admin-content {
            margin-left: 260px;
            padding: 2rem;
            min-height: 100vh;
          }

          .nav-item {
            padding: 0.875rem 1.5rem;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.2s;
            border-left: 3px solid transparent;
          }

          .nav-item:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-left-color: var(--gold);
          }

          .nav-item.active {
            background: rgba(212, 175, 55, 0.15);
            color: var(--gold);
            border-left-color: var(--gold);
          }

          .section-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: all 0.3s;
            cursor: move;
            border: 2px solid transparent;
          }

          .section-card:hover {
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            border-color: var(--gold);
          }

          .section-card.dragging {
            opacity: 0.5;
            transform: scale(0.98);
          }

          .section-type-badge {
            display: inline-block;
            padding: 0.35rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
          }

          .badge-hero { background: #e3f2fd; color: #1976d2; }
          .badge-products { background: #f3e5f5; color: #7b1fa2; }
          .badge-features { background: #fff3e0; color: #f57c00; }
          .badge-testimonials { background: #fce4ec; color: #c2185b; }
          .badge-gallery { background: #e8f5e9; color: #388e3c; }
          .badge-cta { background: #fff9c4; color: #f57f17; }
          .badge-blog { background: #e0f2f1; color: #00796b; }

          .btn {
            padding: 0.625rem 1.25rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }

          .btn-primary {
            background: var(--navy-dark);
            color: white;
          }

          .btn-primary:hover {
            background: #0f1936;
            transform: translateY(-2px);
          }

          .btn-secondary {
            background: var(--gold);
            color: var(--navy-dark);
          }

          .btn-secondary:hover {
            background: #c19b2e;
          }

          .btn-danger {
            background: #dc2626;
            color: white;
          }

          .btn-danger:hover {
            background: #b91c1c;
          }

          .btn-sm {
            padding: 0.375rem 0.75rem;
            font-size: 0.875rem;
          }

          .modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
          }

          .modal-content {
            background: white;
            margin: 3% auto;
            padding: 0;
            border-radius: 16px;
            width: 90%;
            max-width: 1200px;
            max-height: 85vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          .modal-header {
            background: linear-gradient(135deg, var(--navy-dark) 0%, #0f1936 100%);
            color: white;
            padding: 1.5rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .modal-body {
            overflow-y: auto;
            flex: 1;
          }

          .split-view {
            display: grid;
            grid-template-columns: 1fr 1fr;
            height: 100%;
          }

          .editor-pane {
            padding: 2rem;
            border-right: 2px solid #e2e8f0;
            overflow-y: auto;
          }

          .preview-pane {
            padding: 2rem;
            background: #f8fafc;
            overflow-y: auto;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--navy-dark);
          }

          .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s;
          }

          .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--gold);
          }

          .form-textarea {
            resize: vertical;
            min-height: 100px;
            font-family: inherit;
          }

          .toggle-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
          }

          .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
          }

          .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
          }

          input:checked + .slider {
            background-color: var(--gold);
          }

          input:checked + .slider:before {
            transform: translateX(26px);
          }

          .drag-handle {
            cursor: grab;
            padding: 0.5rem;
            color: #94a3b8;
          }

          .drag-handle:active {
            cursor: grabbing;
          }

          .preview-section {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 1rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }

          .color-picker-wrapper {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }

          .color-preview {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            border: 2px solid #e2e8f0;
            cursor: pointer;
          }

          .template-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
          }

          .template-card {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.2s;
          }

          .template-card:hover {
            border-color: var(--gold);
            transform: translateY(-2px);
          }

          .template-card.selected {
            border-color: var(--gold);
            background: rgba(212, 175, 55, 0.1);
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
          }

          .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }

          .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: var(--navy-dark);
          }

          .stat-label {
            color: #64748b;
            font-size: 0.875rem;
            margin-top: 0.5rem;
          }

          .image-upload-area {
            border: 2px dashed #e2e8f0;
            border-radius: 8px;
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
          }

          .image-upload-area:hover {
            border-color: var(--gold);
            background: rgba(212, 175, 55, 0.05);
          }

          .image-preview {
            max-width: 100%;
            max-height: 200px;
            border-radius: 8px;
            margin-top: 1rem;
          }
        `}</style>
      </head>
      <body>
        <div class="admin-sidebar">
          <div style="padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <h1 style="color: var(--gold); font-size: 1.25rem; font-weight: bold;">
              <i class="fas fa-crown" style="margin-right: 0.5rem;"></i>
              SOFTWAREKING24
            </h1>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin-top: 0.25rem;">
              Admin Panel
            </p>
          </div>
          <div id="sidebar-nav"></div>
        </div>

        <div class="admin-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <div>
              <h1 style="font-size: 2rem; font-weight: bold; color: var(--navy-dark); display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-th-large"></i>
                Homepage-Verwaltung
              </h1>
              <p style="color: #64748b; margin-top: 0.5rem;">
                Erstellen und verwalten Sie Homepage-Sektionen mit Drag & Drop
              </p>
            </div>
            <button onclick="openAddModal()" class="btn btn-primary">
              <i class="fas fa-plus"></i>
              Neue Sektion
            </button>
          </div>

          {/* Statistics */}
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value" id="total-sections">0</div>
              <div class="stat-label">Gesamt Sektionen</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="active-sections">0</div>
              <div class="stat-label">Aktive Sektionen</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="section-types">0</div>
              <div class="stat-label">Sektionstypen</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="last-updated">-</div>
              <div class="stat-label">Zuletzt aktualisiert</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
            <button onclick="filterSections('all')" class="btn btn-secondary btn-sm" id="filter-all">
              <i class="fas fa-th"></i> Alle
            </button>
            <button onclick="filterSections('hero')" class="btn btn-secondary btn-sm">
              <i class="fas fa-image"></i> Hero
            </button>
            <button onclick="filterSections('products')" class="btn btn-secondary btn-sm">
              <i class="fas fa-box"></i> Produkte
            </button>
            <button onclick="filterSections('features')" class="btn btn-secondary btn-sm">
              <i class="fas fa-star"></i> Features
            </button>
            <button onclick="filterSections('testimonials')" class="btn btn-secondary btn-sm">
              <i class="fas fa-quote-left"></i> Testimonials
            </button>
            <button onclick="saveOrder()" class="btn btn-primary btn-sm" style="margin-left: auto;">
              <i class="fas fa-save"></i> Reihenfolge speichern
            </button>
          </div>

          {/* Sections List with Drag & Drop */}
          <div id="sections-list" class="sortable-container"></div>

          {/* Empty State */}
          <div id="empty-state" style="display: none; text-align: center; padding: 4rem; color: #64748b;">
            <i class="fas fa-th-large" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.3;"></i>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Keine Sektionen vorhanden</h3>
            <p style="margin-bottom: 1.5rem;">Erstellen Sie Ihre erste Homepage-Sektion</p>
            <button onclick="openAddModal()" class="btn btn-primary">
              <i class="fas fa-plus"></i>
              Erste Sektion erstellen
            </button>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <div id="sectionModal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h2 style="font-size: 1.5rem; font-weight: bold;">
                <span id="modal-title">Neue Sektion erstellen</span>
              </h2>
              <button onclick="closeModal()" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <div class="modal-body">
              <div class="split-view">
                {/* Editor Pane */}
                <div class="editor-pane">
                  <form id="sectionForm" onsubmit="saveSection(event)">
                    <input type="hidden" id="section-id" />

                    <div class="form-group">
                      <label class="form-label">Sektionstyp *</label>
                      <select id="section-type" class="form-select" required onchange="updatePreview()">
                        <option value="">-- Wählen Sie einen Typ --</option>
                        <option value="hero">🎯 Hero Banner - Großes Titelbild mit CTA</option>
                        <option value="products_featured">⭐ Featured Produkte - Hervorgehobene Artikel</option>
                        <option value="products_bestsellers">🔥 Bestsellers - Meistverkaufte Produkte</option>
                        <option value="products_new">🆕 Neue Produkte - Neueste Artikel</option>
                        <option value="products_sale">💰 Angebote - Reduzierte Produkte</option>
                        <option value="features">✨ Features - Funktionen & Vorteile</option>
                        <option value="testimonials">💬 Testimonials - Kundenbewertungen</option>
                        <option value="gallery">🖼️ Galerie - Bildergalerie</option>
                        <option value="cta">📢 Call-to-Action - Handlungsaufforderung</option>
                        <option value="blog">📝 Blog Posts - Neueste Artikel</option>
                        <option value="brands">🏷️ Marken - Partner-Logos</option>
                        <option value="custom">🔧 Custom HTML - Eigener Code</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Titel (Deutsch) *</label>
                      <input type="text" id="title-de" class="form-input" required placeholder="z.B. Beliebte Produkte" onkeyup="updatePreview()" />
                    </div>

                    <div class="form-group">
                      <label class="form-label">Untertitel (Deutsch)</label>
                      <input type="text" id="subtitle-de" class="form-input" placeholder="z.B. Unsere meistverkauften Lizenzen" onkeyup="updatePreview()" />
                    </div>

                    <div class="form-group">
                      <label class="form-label">Titel (Englisch)</label>
                      <input type="text" id="title-en" class="form-input" placeholder="e.g. Popular Products" />
                    </div>

                    <div class="form-group">
                      <label class="form-label">Untertitel (Englisch)</label>
                      <input type="text" id="subtitle-en" class="form-input" placeholder="e.g. Our best-selling licenses" />
                    </div>

                    <div id="product-options" style="display: none;">
                      <div class="form-group">
                        <label class="form-label">Produktfilter</label>
                        <select id="product-filter" class="form-select">
                          <option value="category">Nach Kategorie</option>
                          <option value="brand">Nach Marke</option>
                          <option value="manual">Manuell auswählen</option>
                        </select>
                      </div>

                      <div class="form-group">
                        <label class="form-label">Anzahl Produkte</label>
                        <input type="number" id="product-limit" class="form-input" value="8" min="1" max="20" />
                      </div>

                      <div class="form-group">
                        <label class="form-label">Layout</label>
                        <select id="product-layout" class="form-select">
                          <option value="grid-4">Grid (4 Spalten)</option>
                          <option value="grid-3">Grid (3 Spalten)</option>
                          <option value="grid-6">Grid (6 Spalten)</option>
                          <option value="slider">Slider/Carousel</option>
                          <option value="list">Liste</option>
                        </select>
                      </div>
                    </div>

                    <div id="hero-options" style="display: none;">
                      <div class="form-group">
                        <label class="form-label">Hintergrundbild URL</label>
                        <input type="text" id="hero-bg-image" class="form-input" placeholder="https://..." />
                        <div class="image-upload-area" onclick="document.getElementById('hero-image-upload').click()">
                          <i class="fas fa-cloud-upload-alt" style="font-size: 2rem; color: var(--gold); margin-bottom: 0.5rem;"></i>
                          <p style="color: #64748b;">Klicken Sie hier, um ein Bild hochzuladen</p>
                          <input type="file" id="hero-image-upload" style="display: none;" accept="image/*" />
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-label">Button Text</label>
                        <input type="text" id="hero-btn-text" class="form-input" placeholder="z.B. Jetzt entdecken" />
                      </div>

                      <div class="form-group">
                        <label class="form-label">Button Link</label>
                        <input type="text" id="hero-btn-link" class="form-input" placeholder="/produkte" />
                      </div>

                      <div class="form-group">
                        <label class="form-label">Höhe</label>
                        <select id="hero-height" class="form-select">
                          <option value="small">Klein (400px)</option>
                          <option value="medium" selected>Mittel (600px)</option>
                          <option value="large">Groß (800px)</option>
                          <option value="fullscreen">Vollbild</option>
                        </select>
                      </div>
                    </div>

                    <div id="features-options" style="display: none;">
                      <div class="form-group">
                        <label class="form-label">Features (JSON Array)</label>
                        <textarea id="features-json" class="form-textarea" placeholder='[{"icon": "fas fa-shield-alt", "title": "Sicher", "description": "..."}]'></textarea>
                      </div>

                      <div class="form-group">
                        <label class="form-label">Features Layout</label>
                        <select id="features-layout" class="form-select">
                          <option value="grid-3">3 Spalten</option>
                          <option value="grid-4">4 Spalten</option>
                          <option value="grid-2">2 Spalten</option>
                        </select>
                      </div>
                    </div>

                    <div id="custom-options" style="display: none;">
                      <div class="form-group">
                        <label class="form-label">Custom HTML</label>
                        <textarea id="custom-html" class="form-textarea" style="min-height: 200px; font-family: monospace;" placeholder="<div>Ihr HTML Code...</div>"></textarea>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Hintergrundfarbe</label>
                      <div class="color-picker-wrapper">
                        <input type="color" id="bg-color" class="color-preview" value="#ffffff" onchange="updatePreview()" />
                        <input type="text" id="bg-color-hex" class="form-input" value="#ffffff" placeholder="#ffffff" onchange="document.getElementById('bg-color').value=this.value; updatePreview()" />
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">CSS Klassen (Optional)</label>
                      <input type="text" id="css-classes" class="form-input" placeholder="py-8 px-4 container mx-auto" />
                    </div>

                    <div class="form-group" style="display: flex; align-items: center; gap: 1rem;">
                      <label class="toggle-switch">
                        <input type="checkbox" id="is-active" checked />
                        <span class="slider"></span>
                      </label>
                      <label for="is-active" style="cursor: pointer; font-weight: 600;">
                        Sektion ist aktiv
                      </label>
                    </div>

                    <div style="display: flex; gap: 1rem; justify-content: flex-end; padding-top: 1.5rem; border-top: 2px solid #e2e8f0;">
                      <button type="button" onclick="closeModal()" class="btn" style="background: #e2e8f0; color: #475569;">
                        Abbrechen
                      </button>
                      <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i>
                        Speichern
                      </button>
                    </div>
                  </form>
                </div>

                {/* Preview Pane */}
                <div class="preview-pane">
                  <div style="position: sticky; top: 0;">
                    <h3 style="font-size: 1.25rem; font-weight: bold; color: var(--navy-dark); margin-bottom: 1rem;">
                      <i class="fas fa-eye"></i> Vorschau
                    </h3>
                    <div id="preview-container" class="preview-section">
                      <p style="color: #64748b; text-align: center;">
                        Füllen Sie das Formular aus, um eine Vorschau zu sehen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script>{`
          let sections = [];
          let currentFilter = 'all';
          let sortable = null;

          // AdminSidebar Component
          function AdminSidebar(currentPath) {
            const navItems = [
              { path: '/admin', icon: 'fas fa-home', label: 'Dashboard' },
              { path: '/admin/products', icon: 'fas fa-box', label: 'Produkte' },
              { path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Bestellungen' },
              { path: '/admin/customers', icon: 'fas fa-users', label: 'Kunden' },
              { path: '/admin/licenses', icon: 'fas fa-key', label: 'Lizenzen' },
              { path: '/admin/sliders', icon: 'fas fa-images', label: 'Slider' },
              { path: '/admin/homepage-sections', icon: 'fas fa-th-large', label: 'Homepage' },
              { path: '/admin/pages', icon: 'fas fa-file-alt', label: 'Seiten' },
              { path: '/admin/footer', icon: 'fas fa-shoe-prints', label: 'Footer' },
              { path: '/admin/email-templates', icon: 'fas fa-envelope', label: 'E-Mail-Vorlagen' },
              { path: '/admin/cookies', icon: 'fas fa-cookie-bite', label: 'Cookies' },
              { path: '/admin/contact-messages', icon: 'fas fa-comments', label: 'Kontakt' },
              { path: '/admin/settings', icon: 'fas fa-cog', label: 'Einstellungen' }
            ];

            return navItems.map(item => 
              '<a href="' + item.path + '" class="nav-item' + (currentPath === item.path ? ' active' : '') + '">' +
                '<i class="' + item.icon + '"></i>' +
                '<span>' + item.label + '</span>' +
              '</a>'
            ).join('');
          }

          // Initialize
          document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('sidebar-nav').innerHTML = AdminSidebar('/admin/homepage-sections');
            loadSections();
            initSortable();
          });

          function initSortable() {
            const el = document.getElementById('sections-list');
            sortable = Sortable.create(el, {
              animation: 150,
              handle: '.drag-handle',
              onEnd: function() {
                updateOrder();
              }
            });
          }

          async function loadSections() {
            try {
              const response = await axios.get('/api/admin/homepage-sections');
              sections = response.data.data || [];
              updateStats();
              renderSections();
            } catch (error) {
              console.error('Error loading sections:', error);
              alert('Fehler beim Laden der Sektionen');
            }
          }

          function updateStats() {
            const total = sections.length;
            const active = sections.filter(s => s.is_active).length;
            const types = new Set(sections.map(s => s.section_type)).size;
            const lastUpdate = sections.length > 0 
              ? new Date(Math.max(...sections.map(s => new Date(s.updated_at)))).toLocaleDateString('de-DE')
              : '-';

            document.getElementById('total-sections').textContent = total;
            document.getElementById('active-sections').textContent = active;
            document.getElementById('section-types').textContent = types;
            document.getElementById('last-updated').textContent = lastUpdate;
          }

          function filterSections(type) {
            currentFilter = type;
            renderSections();
          }

          function renderSections() {
            const filtered = currentFilter === 'all' 
              ? sections 
              : sections.filter(s => s.section_type.startsWith(currentFilter));

            if (filtered.length === 0) {
              document.getElementById('sections-list').style.display = 'none';
              document.getElementById('empty-state').style.display = 'block';
              return;
            }

            document.getElementById('sections-list').style.display = 'block';
            document.getElementById('empty-state').style.display = 'none';

            const html = filtered.map(section => {
              const typeLabel = section.section_type.split('_')[0];
              return \`
                <div class="section-card" data-id="\${section.id}">
                  <div style="display: flex; align-items: start; gap: 1rem;">
                    <div class="drag-handle">
                      <i class="fas fa-grip-vertical" style="font-size: 1.5rem;"></i>
                    </div>

                    <div style="flex: 1;">
                      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.75rem;">
                        <div>
                          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                            <span class="section-type-badge badge-\${typeLabel}">
                              \${section.section_type}
                            </span>
                            <h3 style="font-size: 1.125rem; font-weight: bold; color: var(--navy-dark);">
                              \${section.title_de || 'Ohne Titel'}
                            </h3>
                          </div>
                          <p style="color: #64748b; font-size: 0.875rem;">
                            \${section.subtitle_de || 'Kein Untertitel'}
                          </p>
                        </div>

                        <label class="toggle-switch">
                          <input type="checkbox" \${section.is_active ? 'checked' : ''} 
                                 onchange="toggleSection(\${section.id}, this.checked)" />
                          <span class="slider"></span>
                        </label>
                      </div>

                      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                        <div style="font-size: 0.875rem; color: #64748b;">
                          <i class="fas fa-sort-amount-up"></i> Reihenfolge: <strong>\${section.display_order || 0}</strong>
                        </div>
                        \${section.config?.product_limit ? \`
                          <div style="font-size: 0.875rem; color: #64748b;">
                            <i class="fas fa-box"></i> <strong>\${section.config.product_limit}</strong> Produkte
                          </div>
                        \` : ''}
                        <div style="font-size: 0.875rem; color: #64748b;">
                          <i class="fas fa-clock"></i> \${new Date(section.updated_at).toLocaleDateString('de-DE')}
                        </div>
                      </div>

                      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        <button onclick="editSection(\${section.id})" class="btn btn-secondary btn-sm">
                          <i class="fas fa-edit"></i>
                          Bearbeiten
                        </button>
                        <button onclick="duplicateSection(\${section.id})" class="btn btn-secondary btn-sm">
                          <i class="fas fa-copy"></i>
                          Duplizieren
                        </button>
                        <button onclick="deleteSection(\${section.id})" class="btn btn-danger btn-sm">
                          <i class="fas fa-trash"></i>
                          Löschen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              \`;
            }).join('');

            document.getElementById('sections-list').innerHTML = html;
          }

          function updateOrder() {
            const cards = document.querySelectorAll('.section-card');
            cards.forEach((card, index) => {
              const id = parseInt(card.dataset.id);
              const section = sections.find(s => s.id === id);
              if (section) {
                section.display_order = index + 1;
              }
            });
          }

          async function saveOrder() {
            try {
              const orderData = sections.map(s => ({ id: s.id, display_order: s.display_order }));
              await axios.post('/api/admin/homepage-sections/reorder', { sections: orderData });
              alert('Reihenfolge gespeichert!');
            } catch (error) {
              console.error('Error saving order:', error);
              alert('Fehler beim Speichern der Reihenfolge');
            }
          }

          async function toggleSection(id, enabled) {
            try {
              await axios.patch(\`/api/admin/homepage-sections/\${id}/toggle\`, { is_active: enabled ? 1 : 0 });
              const section = sections.find(s => s.id === id);
              if (section) section.is_active = enabled ? 1 : 0;
              updateStats();
            } catch (error) {
              console.error('Error toggling section:', error);
              alert('Fehler beim Aktualisieren');
              loadSections();
            }
          }

          function openAddModal() {
            document.getElementById('modal-title').textContent = 'Neue Sektion erstellen';
            document.getElementById('sectionForm').reset();
            document.getElementById('section-id').value = '';
            document.getElementById('sectionModal').style.display = 'block';
            updateSectionOptions();
          }

          async function editSection(id) {
            const section = sections.find(s => s.id === id);
            if (!section) return;

            document.getElementById('modal-title').textContent = 'Sektion bearbeiten';
            document.getElementById('section-id').value = section.id;
            document.getElementById('section-type').value = section.section_type;
            document.getElementById('title-de').value = section.title_de || '';
            document.getElementById('subtitle-de').value = section.subtitle_de || '';
            document.getElementById('title-en').value = section.title_en || '';
            document.getElementById('subtitle-en').value = section.subtitle_en || '';
            document.getElementById('bg-color').value = section.config?.bg_color || '#ffffff';
            document.getElementById('bg-color-hex').value = section.config?.bg_color || '#ffffff';
            document.getElementById('css-classes').value = section.config?.css_classes || '';
            document.getElementById('is-active').checked = section.is_active == 1;

            updateSectionOptions();
            document.getElementById('sectionModal').style.display = 'block';
          }

          function updateSectionOptions() {
            const type = document.getElementById('section-type').value;
            
            // Hide all option groups
            document.getElementById('product-options').style.display = 'none';
            document.getElementById('hero-options').style.display = 'none';
            document.getElementById('features-options').style.display = 'none';
            document.getElementById('custom-options').style.display = 'none';

            // Show relevant options
            if (type.startsWith('products_')) {
              document.getElementById('product-options').style.display = 'block';
            } else if (type === 'hero') {
              document.getElementById('hero-options').style.display = 'block';
            } else if (type === 'features') {
              document.getElementById('features-options').style.display = 'block';
            } else if (type === 'custom') {
              document.getElementById('custom-options').style.display = 'block';
            }

            updatePreview();
          }

          function updatePreview() {
            const type = document.getElementById('section-type').value;
            const titleDe = document.getElementById('title-de').value;
            const subtitleDe = document.getElementById('subtitle-de').value;
            const bgColor = document.getElementById('bg-color').value;

            let preview = '';
            
            if (!type || !titleDe) {
              preview = '<p style="color: #64748b; text-align: center;">Füllen Sie das Formular aus, um eine Vorschau zu sehen</p>';
            } else {
              preview = \`
                <div style="background: \${bgColor}; padding: 2rem; border-radius: 8px;">
                  <h2 style="font-size: 1.75rem; font-weight: bold; color: var(--navy-dark); margin-bottom: 0.5rem;">
                    \${titleDe}
                  </h2>
                  \${subtitleDe ? \`<p style="color: #64748b; font-size: 1rem;">\${subtitleDe}</p>\` : ''}
                  <div style="margin-top: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; border-left: 4px solid var(--gold);">
                    <p style="color: #64748b; font-size: 0.875rem;">
                      <i class="fas fa-info-circle"></i> Typ: <strong>\${type}</strong>
                    </p>
                  </div>
                </div>
              \`;
            }

            document.getElementById('preview-container').innerHTML = preview;
          }

          // Listen to type change
          document.addEventListener('DOMContentLoaded', function() {
            const typeSelect = document.getElementById('section-type');
            if (typeSelect) {
              typeSelect.addEventListener('change', updateSectionOptions);
            }
          });

          async function saveSection(event) {
            event.preventDefault();

            const id = document.getElementById('section-id').value;
            const config = {
              bg_color: document.getElementById('bg-color').value,
              css_classes: document.getElementById('css-classes').value,
            };

            const type = document.getElementById('section-type').value;
            
            // Add type-specific config
            if (type.startsWith('products_')) {
              config.product_filter = document.getElementById('product-filter')?.value;
              config.product_limit = document.getElementById('product-limit')?.value;
              config.product_layout = document.getElementById('product-layout')?.value;
            } else if (type === 'hero') {
              config.bg_image = document.getElementById('hero-bg-image')?.value;
              config.btn_text = document.getElementById('hero-btn-text')?.value;
              config.btn_link = document.getElementById('hero-btn-link')?.value;
              config.height = document.getElementById('hero-height')?.value;
            } else if (type === 'features') {
              config.features = document.getElementById('features-json')?.value;
              config.layout = document.getElementById('features-layout')?.value;
            } else if (type === 'custom') {
              config.html = document.getElementById('custom-html')?.value;
            }

            const data = {
              section_type: type,
              title_de: document.getElementById('title-de').value,
              subtitle_de: document.getElementById('subtitle-de').value,
              title_en: document.getElementById('title-en').value,
              subtitle_en: document.getElementById('subtitle-en').value,
              config: JSON.stringify(config),
              is_active: document.getElementById('is-active').checked ? 1 : 0
            };

            try {
              if (id) {
                await axios.put(\`/api/admin/homepage-sections/\${id}\`, data);
              } else {
                await axios.post('/api/admin/homepage-sections', data);
              }
              
              closeModal();
              loadSections();
              alert(id ? 'Sektion aktualisiert!' : 'Sektion erstellt!');
            } catch (error) {
              console.error('Error saving section:', error);
              alert('Fehler beim Speichern: ' + (error.response?.data?.error || 'Unbekannter Fehler'));
            }
          }

          async function duplicateSection(id) {
            if (!confirm('Sektion duplizieren?')) return;

            try {
              await axios.post(\`/api/admin/homepage-sections/\${id}/duplicate\`);
              loadSections();
              alert('Sektion dupliziert!');
            } catch (error) {
              console.error('Error duplicating section:', error);
              alert('Fehler beim Duplizieren');
            }
          }

          async function deleteSection(id) {
            if (!confirm('Sektion wirklich löschen?')) return;

            try {
              await axios.delete(\`/api/admin/homepage-sections/\${id}\`);
              sections = sections.filter(s => s.id !== id);
              updateStats();
              renderSections();
              alert('Sektion gelöscht!');
            } catch (error) {
              console.error('Error deleting section:', error);
              alert('Fehler beim Löschen');
            }
          }

          function closeModal() {
            document.getElementById('sectionModal').style.display = 'none';
          }

          // Close modal on outside click
          window.onclick = function(event) {
            const modal = document.getElementById('sectionModal');
            if (event.target == modal) {
              closeModal();
            }
          }
        `}</script>
      </body>
    </html>
  )
}
