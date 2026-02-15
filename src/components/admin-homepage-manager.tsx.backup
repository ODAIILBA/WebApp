import type { FC } from 'hono/jsx'

export const AdminHomepageManager: FC = () => {
  return (
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Homepage Verwaltung - SOFTWAREKING24 Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; }
          .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #001f3f 0%, #003366 100%); color: white; padding: 30px 0; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
          .header h1 { font-size: 32px; font-weight: 800; margin-bottom: 10px; }
          .header p { opacity: 0.9; font-size: 16px; }
          .tabs { background: white; border-radius: 12px; padding: 10px; margin: 30px 0; display: flex; gap: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
          .tab-btn { padding: 12px 24px; border-radius: 8px; border: none; background: transparent; color: #666; font-weight: 600; cursor: pointer; transition: all 0.3s; }
          .tab-btn:hover { background: #f5f7fa; }
          .tab-btn.active { background: #001f3f; color: white; }
          .tab-content { display: none; }
          .tab-content.active { display: block; }
          .card { background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 2px 15px rgba(0,0,0,0.08); }
          .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0; }
          .card-header h2 { font-size: 24px; font-weight: 700; color: #001f3f; }
          .btn { padding: 12px 24px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; }
          .btn-primary { background: #FFC107; color: #001f3f; }
          .btn-primary:hover { background: #FFA000; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(255,193,7,0.3); }
          .btn-secondary { background: #6c757d; color: white; }
          .btn-secondary:hover { background: #5a6268; }
          .btn-danger { background: #dc3545; color: white; }
          .btn-danger:hover { background: #c82333; }
          .btn-success { background: #28a745; color: white; }
          .btn-success:hover { background: #218838; }
          .table { width: 100%; border-collapse: collapse; }
          .table th { background: #f8f9fa; padding: 15px; text-align: left; font-weight: 700; color: #001f3f; border-bottom: 2px solid #dee2e6; }
          .table td { padding: 15px; border-bottom: 1px solid #f0f0f0; }
          .table tr:hover { background: #f8f9fa; }
          .badge { display: inline-block; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
          .badge-success { background: #d4edda; color: #155724; }
          .badge-danger { background: #f8d7da; color: #721c24; }
          .form-group { margin-bottom: 20px; }
          .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #333; }
          .form-control { width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px; transition: all 0.3s; }
          .form-control:focus { outline: none; border-color: #001f3f; box-shadow: 0 0 0 3px rgba(0,31,63,0.1); }
          textarea.form-control { min-height: 100px; resize: vertical; }
          .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 1000; align-items: center; justify-content: center; }
          .modal.active { display: flex; }
          .modal-content { background: white; border-radius: 16px; padding: 40px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; }
          .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0; }
          .modal-header h3 { font-size: 24px; font-weight: 700; color: #001f3f; }
          .close-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #999; }
          .close-btn:hover { color: #333; }
          .color-picker { display: flex; gap: 10px; align-items: center; }
          .color-preview { width: 50px; height: 50px; border-radius: 8px; border: 2px solid #e0e0e0; }
          .sortable-item { cursor: move; transition: all 0.3s; }
          .sortable-item:hover { background: #f8f9fa; }
          .drag-handle { cursor: grab; color: #999; padding: 10px; }
          .drag-handle:active { cursor: grabbing; }
          .action-btns { display: flex; gap: 10px; }
          .icon-btn { width: 36px; height: 36px; border-radius: 8px; border: none; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; justify-content: center; }
          .icon-btn:hover { transform: scale(1.1); }
          .icon-btn-edit { background: #0dcaf0; color: white; }
          .icon-btn-delete { background: #dc3545; color: white; }
          .icon-btn-toggle { background: #6c757d; color: white; }
          .sortable-ghost {
            opacity: 0.4;
            background: #f0f0f0;
          }
          .section-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: all 0.3s;
            border: 2px solid transparent;
          }
          .section-card:hover {
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            border-color: #d4af37;
          }
          .switch input:checked + .slider {
            background-color: #28a745;
          }
          .slider {
            transition: .4s;
            border-radius: 34px;
          }
        `}</style>
      </head>
      <body>
        <div class="header">
          <div class="container">
            <h1><i class="fas fa-home"></i> Homepage Verwaltung</h1>
            <p>Verwalten Sie Hero-Slides, Navigation, Produkt-Sektionen und mehr</p>
          </div>
        </div>

        <div class="container">
          <div class="tabs">
            <button class="tab-btn active" onclick="switchTab('hero')"><i class="fas fa-image"></i> Hero Slides</button>
            <button class="tab-btn" onclick="switchTab('navigation')"><i class="fas fa-bars"></i> Navigation</button>
            <button class="tab-btn" onclick="switchTab('trust')"><i class="fas fa-shield-alt"></i> Trust Badges</button>
            <button class="tab-btn" onclick="switchTab('sections')"><i class="fas fa-th-large"></i> Sections</button>
          </div>

          {/* Hero Slides Tab */}
          <div id="hero-tab" class="tab-content active">
            <div class="card">
              <div class="card-header">
                <h2><i class="fas fa-image"></i> Hero Slides</h2>
                <button class="btn btn-primary" onclick="openHeroModal()">
                  <i class="fas fa-plus"></i> Neuer Slide
                </button>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 50px;"><i class="fas fa-grip-vertical"></i></th>
                    <th>Titel</th>
                    <th>CTA Text</th>
                    <th>Farbe</th>
                    <th>Status</th>
                    <th style="width: 150px;">Aktionen</th>
                  </tr>
                </thead>
                <tbody id="hero-list"></tbody>
              </table>
            </div>
          </div>

          {/* Navigation Tab */}
          <div id="navigation-tab" class="tab-content">
            <div class="card">
              <div class="card-header">
                <h2><i class="fas fa-bars"></i> Navigation Menu</h2>
                <button class="btn btn-primary" onclick="openNavModal()">
                  <i class="fas fa-plus"></i> Neuer Menü-Punkt
                </button>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 50px;"><i class="fas fa-grip-vertical"></i></th>
                    <th>Titel</th>
                    <th>URL</th>
                    <th>Kategorie</th>
                    <th>Mega Menu</th>
                    <th>Status</th>
                    <th style="width: 150px;">Aktionen</th>
                  </tr>
                </thead>
                <tbody id="nav-list"></tbody>
              </table>
            </div>
          </div>

          {/* Trust Badges Tab */}
          <div id="trust-tab" class="tab-content">
            <div class="card">
              <div class="card-header">
                <h2><i class="fas fa-shield-alt"></i> Trust Badges</h2>
                <button class="btn btn-primary" onclick="alert('Coming soon!')">
                  <i class="fas fa-plus"></i> Neues Badge
                </button>
              </div>
              <div id="trust-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;"></div>
            </div>
          </div>

          {/* Sections Tab */}
          <div id="sections-tab" class="tab-content">
            <div class="card">
              <div class="card-header">
                <h2><i class="fas fa-th-large"></i> Homepage Sections</h2>
                <button class="btn btn-primary" onclick="alert('Coming soon!')">
                  <i class="fas fa-plus"></i> Neue Section
                </button>
              </div>
              <div id="sections-list"></div>
            </div>
          </div>
        </div>

        {/* Hero Modal */}
        <div id="hero-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="hero-modal-title">Neuer Hero Slide</h3>
              <button class="close-btn" onclick="closeHeroModal()">&times;</button>
            </div>
            <form id="hero-form">
              <input type="hidden" id="hero-id" />
              <div class="form-group">
                <label>Titel *</label>
                <input type="text" id="hero-title" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Beschreibung</label>
                <textarea id="hero-description" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <label>CTA Text</label>
                <input type="text" id="hero-cta-text" class="form-control" />
              </div>
              <div class="form-group">
                <label>CTA Link</label>
                <input type="text" id="hero-cta-link" class="form-control" />
              </div>
              <div class="form-group">
                <label>Hintergrundfarbe</label>
                <div class="color-picker">
                  <input type="color" id="hero-bg-color" class="form-control" style="width: 80px;" value="#001f3f" />
                  <div class="color-preview" id="hero-bg-preview" style="background: #001f3f;"></div>
                  <input type="text" id="hero-bg-color-text" class="form-control" placeholder="#001f3f" value="#001f3f" />
                </div>
              </div>
              <div class="form-group">
                <label>Textfarbe</label>
                <div class="color-picker">
                  <input type="color" id="hero-text-color" class="form-control" style="width: 80px;" value="#ffffff" />
                  <div class="color-preview" id="hero-text-preview" style="background: #ffffff;"></div>
                  <input type="text" id="hero-text-color-text" class="form-control" placeholder="#ffffff" value="#ffffff" />
                </div>
              </div>
              <div class="form-group">
                <label>
                  <input type="checkbox" id="hero-active" checked /> Aktiv
                </label>
              </div>
              <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 30px;">
                <button type="button" class="btn btn-secondary" onclick="closeHeroModal()">Abbrechen</button>
                <button type="submit" class="btn btn-primary">Speichern</button>
              </div>
            </form>
          </div>
        </div>

        {/* Navigation Modal */}
        <div id="nav-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="nav-modal-title">Neuer Menü-Punkt</h3>
              <button class="close-btn" onclick="closeNavModal()">&times;</button>
            </div>
            <form id="nav-form">
              <input type="hidden" id="nav-id" />
              <div class="form-group">
                <label>Übergeordneter Menü-Punkt</label>
                <select id="nav-parent" class="form-control">
                  <option value="">-- Top-Level --</option>
                </select>
              </div>
              <div class="form-group">
                <label>Titel *</label>
                <input type="text" id="nav-title" class="form-control" required />
              </div>
              <div class="form-group">
                <label>URL</label>
                <input type="text" id="nav-url" class="form-control" />
              </div>
              <div class="form-group">
                <label>Icon (FontAwesome)</label>
                <input type="text" id="nav-icon" class="form-control" placeholder="fas fa-windows" />
              </div>
              <div class="form-group">
                <label>Kategorie</label>
                <select id="nav-category" class="form-control">
                  <option value="">-- Keine --</option>
                  <option value="Windows">Windows</option>
                  <option value="Office">Office</option>
                  <option value="Server">Server</option>
                  <option value="Antivirus">Antivirus</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
              <div class="form-group">
                <label>
                  <input type="checkbox" id="nav-mega-menu" /> Mega Menu aktivieren
                </label>
              </div>
              <div class="form-group">
                <label>
                  <input type="checkbox" id="nav-active" checked /> Aktiv
                </label>
              </div>
              <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 30px;">
                <button type="button" class="btn btn-secondary" onclick="closeNavModal()">Abbrechen</button>
                <button type="submit" class="btn btn-primary">Speichern</button>
              </div>
            </form>
          </div>
        </div>

        <script>{`
          let heroSlides = [];
          let navItems = [];
          let trustBadges = [];

          // Tab Switching
          function switchTab(tab) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            event.target.classList.add('active');
            document.getElementById(tab + '-tab').classList.add('active');
          }

          // Load Hero Slides
          async function loadHeroSlides() {
            try {
              const response = await axios.get('/api/admin/homepage/hero');
              heroSlides = response.data.data;
              renderHeroList();
            } catch (error) {
              console.error('Failed to load hero slides:', error);
            }
          }

          function renderHeroList() {
            const list = document.getElementById('hero-list');
            list.innerHTML = heroSlides.map(slide => \`
              <tr class="sortable-item">
                <td><i class="fas fa-grip-vertical drag-handle"></i></td>
                <td><strong>\${slide.title.substring(0, 50)}...</strong></td>
                <td>\${slide.cta_text || '-'}</td>
                <td><div style="width: 30px; height: 30px; background: \${slide.background_color}; border-radius: 6px; border: 2px solid #ddd;"></div></td>
                <td><span class="badge badge-\${slide.is_active ? 'success' : 'danger'}">\${slide.is_active ? 'Aktiv' : 'Inaktiv'}</span></td>
                <td class="action-btns">
                  <button class="icon-btn icon-btn-edit" onclick="editHeroSlide(\${slide.id})" title="Bearbeiten">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="icon-btn icon-btn-delete" onclick="deleteHeroSlide(\${slide.id})" title="Löschen">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            \`).join('');
          }

          function openHeroModal(id = null) {
            document.getElementById('hero-modal').classList.add('active');
            document.getElementById('hero-form').reset();
            
            if (id) {
              const slide = heroSlides.find(s => s.id === id);
              if (slide) {
                document.getElementById('hero-id').value = slide.id;
                document.getElementById('hero-title').value = slide.title;
                document.getElementById('hero-description').value = slide.description || '';
                document.getElementById('hero-cta-text').value = slide.cta_text || '';
                document.getElementById('hero-cta-link').value = slide.cta_link || '';
                document.getElementById('hero-bg-color').value = slide.background_color;
                document.getElementById('hero-bg-color-text').value = slide.background_color;
                document.getElementById('hero-text-color').value = slide.text_color;
                document.getElementById('hero-text-color-text').value = slide.text_color;
                document.getElementById('hero-active').checked = slide.is_active === 1;
                document.getElementById('hero-modal-title').textContent = 'Hero Slide bearbeiten';
              }
            } else {
              document.getElementById('hero-modal-title').textContent = 'Neuer Hero Slide';
            }
          }

          function closeHeroModal() {
            document.getElementById('hero-modal').classList.remove('active');
          }

          function editHeroSlide(id) {
            openHeroModal(id);
          }

          async function deleteHeroSlide(id) {
            if (!confirm('Möchten Sie diesen Hero Slide wirklich löschen?')) return;
            
            try {
              await axios.delete(\`/api/admin/homepage/hero/\${id}\`);
              alert('Hero Slide gelöscht!');
              loadHeroSlides();
            } catch (error) {
              alert('Fehler beim Löschen: ' + error.message);
            }
          }

          document.getElementById('hero-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const id = document.getElementById('hero-id').value;
            const data = {
              title: document.getElementById('hero-title').value,
              description: document.getElementById('hero-description').value,
              cta_text: document.getElementById('hero-cta-text').value,
              cta_link: document.getElementById('hero-cta-link').value,
              background_color: document.getElementById('hero-bg-color').value,
              text_color: document.getElementById('hero-text-color').value,
              is_active: document.getElementById('hero-active').checked,
              order_position: id ? heroSlides.find(s => s.id == id).order_position : heroSlides.length + 1
            };

            try {
              if (id) {
                await axios.put(\`/api/admin/homepage/hero/\${id}\`, data);
                alert('Hero Slide aktualisiert!');
              } else {
                await axios.post('/api/admin/homepage/hero', data);
                alert('Hero Slide erstellt!');
              }
              closeHeroModal();
              loadHeroSlides();
            } catch (error) {
              alert('Fehler beim Speichern: ' + error.message);
            }
          });

          // Color picker sync
          document.getElementById('hero-bg-color').addEventListener('input', (e) => {
            document.getElementById('hero-bg-color-text').value = e.target.value;
            document.getElementById('hero-bg-preview').style.background = e.target.value;
          });
          
          document.getElementById('hero-text-color').addEventListener('input', (e) => {
            document.getElementById('hero-text-color-text').value = e.target.value;
            document.getElementById('hero-text-preview').style.background = e.target.value;
          });

          // Load Navigation
          async function loadNavigation() {
            try {
              const response = await axios.get('/api/admin/homepage/navigation');
              navItems = response.data.data;
              renderNavList();
              populateParentSelect();
            } catch (error) {
              console.error('Failed to load navigation:', error);
            }
          }

          function renderNavList() {
            const list = document.getElementById('nav-list');
            const topLevel = navItems.filter(item => !item.parent_id);
            list.innerHTML = topLevel.map(item => {
              const children = navItems.filter(child => child.parent_id === item.id);
              return \`
                <tr class="sortable-item">
                  <td><i class="fas fa-grip-vertical drag-handle"></i></td>
                  <td><strong>\${item.title}</strong> \${children.length > 0 ? \`<span class="badge badge-success">\${children.length} Kinder</span>\` : ''}</td>
                  <td>\${item.url || '-'}</td>
                  <td>\${item.category || '-'}</td>
                  <td>\${item.is_mega_menu ? '<i class="fas fa-check text-success"></i>' : '-'}</td>
                  <td><span class="badge badge-\${item.is_active ? 'success' : 'danger'}">\${item.is_active ? 'Aktiv' : 'Inaktiv'}</span></td>
                  <td class="action-btns">
                    <button class="icon-btn icon-btn-edit" onclick="editNavItem(\${item.id})" title="Bearbeiten">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="icon-btn icon-btn-delete" onclick="deleteNavItem(\${item.id})" title="Löschen">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                \${children.map(child => \`
                  <tr class="sortable-item" style="background: #f8f9fa;">
                    <td><i class="fas fa-level-up-alt" style="transform: rotate(90deg); margin-left: 20px;"></i></td>
                    <td style="padding-left: 40px;">\${child.title}</td>
                    <td>\${child.url || '-'}</td>
                    <td>\${child.category || '-'}</td>
                    <td>-</td>
                    <td><span class="badge badge-\${child.is_active ? 'success' : 'danger'}">\${child.is_active ? 'Aktiv' : 'Inaktiv'}</span></td>
                    <td class="action-btns">
                      <button class="icon-btn icon-btn-edit" onclick="editNavItem(\${child.id})" title="Bearbeiten">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="icon-btn icon-btn-delete" onclick="deleteNavItem(\${child.id})" title="Löschen">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                \`).join('')}
              \`;
            }).join('');
          }

          function populateParentSelect() {
            const select = document.getElementById('nav-parent');
            const topLevel = navItems.filter(item => !item.parent_id);
            select.innerHTML = '<option value="">-- Top-Level --</option>' + topLevel.map(item => 
              \`<option value="\${item.id}">\${item.title}</option>\`
            ).join('');
          }

          function openNavModal(id = null) {
            document.getElementById('nav-modal').classList.add('active');
            document.getElementById('nav-form').reset();
            
            if (id) {
              const item = navItems.find(n => n.id === id);
              if (item) {
                document.getElementById('nav-id').value = item.id;
                document.getElementById('nav-parent').value = item.parent_id || '';
                document.getElementById('nav-title').value = item.title;
                document.getElementById('nav-url').value = item.url || '';
                document.getElementById('nav-icon').value = item.icon || '';
                document.getElementById('nav-category').value = item.category || '';
                document.getElementById('nav-mega-menu').checked = item.is_mega_menu === 1;
                document.getElementById('nav-active').checked = item.is_active === 1;
                document.getElementById('nav-modal-title').textContent = 'Menü-Punkt bearbeiten';
              }
            } else {
              document.getElementById('nav-modal-title').textContent = 'Neuer Menü-Punkt';
            }
          }

          function closeNavModal() {
            document.getElementById('nav-modal').classList.remove('active');
          }

          function editNavItem(id) {
            openNavModal(id);
          }

          async function deleteNavItem(id) {
            if (!confirm('Möchten Sie diesen Menü-Punkt wirklich löschen?')) return;
            
            try {
              await axios.delete(\`/api/admin/homepage/navigation/\${id}\`);
              alert('Menü-Punkt gelöscht!');
              loadNavigation();
            } catch (error) {
              alert('Fehler beim Löschen: ' + error.message);
            }
          }

          document.getElementById('nav-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const id = document.getElementById('nav-id').value;
            const data = {
              parent_id: document.getElementById('nav-parent').value || null,
              title: document.getElementById('nav-title').value,
              url: document.getElementById('nav-url').value,
              icon: document.getElementById('nav-icon').value,
              category: document.getElementById('nav-category').value,
              is_mega_menu: document.getElementById('nav-mega-menu').checked,
              is_active: document.getElementById('nav-active').checked,
              order_position: id ? navItems.find(n => n.id == id).order_position : navItems.length + 1
            };

            try {
              if (id) {
                await axios.put(\`/api/admin/homepage/navigation/\${id}\`, data);
                alert('Menü-Punkt aktualisiert!');
              } else {
                await axios.post('/api/admin/homepage/navigation', data);
                alert('Menü-Punkt erstellt!');
              }
              closeNavModal();
              loadNavigation();
            } catch (error) {
              alert('Fehler beim Speichern: ' + error.message);
            }
          });

          // Load Trust Badges
          async function loadTrustBadges() {
            try {
              const response = await axios.get('/api/homepage/trust-badges');
              trustBadges = response.data.data;
              renderTrustList();
            } catch (error) {
              console.error('Failed to load trust badges:', error);
            }
          }

          function renderTrustList() {
            const list = document.getElementById('trust-list');
            list.innerHTML = trustBadges.map(badge => \`
              <div class="card">
                <div style="text-align: center; margin-bottom: 15px;">
                  <i class="\${badge.icon}" style="font-size: 48px; color: #001f3f;"></i>
                </div>
                <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 10px;">\${badge.title}</h3>
                <p style="color: #666; font-size: 14px;">\${badge.description}</p>
                <span class="badge badge-\${badge.is_active ? 'success' : 'danger'}" style="margin-top: 10px;">\${badge.is_active ? 'Aktiv' : 'Inaktiv'}</span>
              </div>
            \`).join('');
          }

          // Load Homepage Sections with Drag & Drop
          let sections = [];
          
          async function loadSections() {
            try {
              const response = await axios.get('/api/admin/homepage/sections');
              sections = response.data.data;
              renderSectionsList();
              initSortable();
            } catch (error) {
              console.error('Failed to load sections:', error);
            }
          }

          function renderSectionsList() {
            const list = document.getElementById('sections-list');
            list.innerHTML = \`
              <div style="margin-bottom: 20px; padding: 15px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
                <h4 style="margin-bottom: 10px; color: #856404;"><i class="fas fa-info-circle"></i> Sections verwalten</h4>
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>Drag & Drop:</strong> Ziehen Sie Sections, um die Reihenfolge zu ändern.<br>
                  <strong>Ein/Aus-Schalter:</strong> Klicken Sie auf den Schalter, um Sections anzuzeigen oder zu verbergen.
                </p>
              </div>
              <div id="sortable-sections">
                \${sections.map(section => \`
                  <div class="section-card sortable-item" data-id="\${section.id}" data-order="\${section.sort_order}">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="display: flex; align-items: center; gap: 15px; flex: 1;">
                        <div class="drag-handle" style="cursor: grab;">
                          <i class="fas fa-grip-vertical" style="font-size: 20px; color: #999;"></i>
                        </div>
                        <div style="flex: 1;">
                          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 5px; color: #001f3f;">
                            \${section.title || section.section_key}
                          </h3>
                          <p style="margin: 0; color: #666; font-size: 13px;">
                            <strong>Type:</strong> \${section.section_type} | 
                            <strong>Key:</strong> \${section.section_key} | 
                            <strong>Order:</strong> \${section.sort_order}
                          </p>
                          \${section.subtitle ? \`<p style="margin: 5px 0 0 0; color: #999; font-size: 12px; font-style: italic;">\${section.subtitle}</p>\` : ''}
                        </div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 15px;">
                        <label class="switch" style="position: relative; display: inline-block; width: 60px; height: 34px;">
                          <input type="checkbox" \${section.is_enabled ? 'checked' : ''} onchange="toggleSection(\${section.id})" style="opacity: 0; width: 0; height: 0;">
                          <span class="slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: \${section.is_enabled ? '#28a745' : '#ccc'}; transition: .4s; border-radius: 34px;">
                            <span style="position: absolute; content: ''; height: 26px; width: 26px; left: \${section.is_enabled ? '30px' : '4px'}; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%;"></span>
                          </span>
                        </label>
                        <span class="badge badge-\${section.is_enabled ? 'success' : 'danger'}">
                          \${section.is_enabled ? 'Aktiv' : 'Inaktiv'}
                        </span>
                      </div>
                    </div>
                  </div>
                \`).join('')}
              </div>
            \`;
          }

          function initSortable() {
            const sortableEl = document.getElementById('sortable-sections');
            if (sortableEl && typeof Sortable !== 'undefined') {
              new Sortable(sortableEl, {
                animation: 200,
                handle: '.drag-handle',
                ghostClass: 'sortable-ghost',
                onEnd: async function(evt) {
                  // Get new order
                  const items = Array.from(sortableEl.children);
                  const reorderedSections = items.map((item, index) => ({
                    id: parseInt(item.dataset.id),
                    sort_order: (index + 1) * 10
                  }));

                  try {
                    await axios.post('/api/admin/homepage/sections/reorder', { sections: reorderedSections });
                    
                    // Show success message
                    const message = document.createElement('div');
                    message.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 15px 25px; border-radius: 8px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
                    message.innerHTML = '<i class="fas fa-check-circle"></i> Reihenfolge gespeichert!';
                    document.body.appendChild(message);
                    setTimeout(() => message.remove(), 3000);
                    
                    // Reload to get fresh data
                    await loadSections();
                  } catch (error) {
                    alert('Fehler beim Speichern der Reihenfolge: ' + error.message);
                  }
                }
              });
            }
          }

          async function toggleSection(id) {
            try {
              await axios.post(\`/api/admin/homepage/sections/\${id}/toggle\`);
              
              // Show success message
              const message = document.createElement('div');
              message.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #17a2b8; color: white; padding: 15px 25px; border-radius: 8px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
              message.innerHTML = '<i class="fas fa-sync-alt"></i> Section aktualisiert!';
              document.body.appendChild(message);
              setTimeout(() => message.remove(), 2000);
              
              // Reload sections
              await loadSections();
            } catch (error) {
              alert('Fehler beim Umschalten: ' + error.message);
            }
          }

          // Initialize
          document.addEventListener('DOMContentLoaded', () => {
            loadHeroSlides();
            loadNavigation();
            loadTrustBadges();
            loadSections();
          });
        `}</script>
      </body>
    </html>
  )
}
