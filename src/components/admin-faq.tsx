export function AdminFAQ() {
  return /* html */`
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FAQ Management - Admin Panel</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <style>
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        .container-wrapper {
          max-width: 1600px;
          margin: 0 auto;
          padding: 2rem;
        }
        .dashboard-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.2s;
        }
        .stat-card:hover {
          transform: scale(1.02);
        }
        .stat-icon {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
        .category-card {
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .category-card:hover {
          border-color: #667eea;
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }
        .category-card.active {
          border-color: #667eea;
          background: #ede9fe;
        }
        .faq-item {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .faq-item:hover {
          border-color: #667eea;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
        }
        .faq-question {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .faq-answer {
          color: #6b7280;
          line-height: 1.6;
          display: none;
        }
        .faq-item.expanded .faq-answer {
          display: block;
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid #e5e7eb;
        }
        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .badge-success { background: #d1fae5; color: #065f46; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-danger { background: #fee2e2; color: #991b1b; }
        .badge-info { background: #dbeafe; color: #1e40af; }
        .badge-primary { background: #ede9fe; color: #5b21b6; }
        .btn {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .btn-secondary {
          background: #e5e7eb;
          color: #374151;
        }
        .btn-secondary:hover {
          background: #d1d5db;
        }
        .btn-success {
          background: #10b981;
          color: white;
        }
        .btn-danger {
          background: #ef4444;
          color: white;
        }
        .btn-sm {
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        }
        .search-box {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }
        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .modal.active {
          display: flex;
        }
        .modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-body {
          padding: 1.5rem;
        }
        .modal-footer {
          padding: 1.5rem;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
        }
        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }
        .form-control:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        textarea.form-control {
          min-height: 120px;
          resize: vertical;
        }
        .form-check {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #e5e7eb;
        }
        .tab {
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          color: #6b7280;
          font-weight: 500;
          transition: all 0.2s;
        }
        .tab:hover {
          color: #667eea;
        }
        .tab.active {
          color: #667eea;
          border-bottom-color: #667eea;
        }
        .tag {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #f3f4f6;
          border-radius: 9999px;
          font-size: 0.875rem;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #6b7280;
        }
        .empty-state-icon {
          font-size: 4rem;
          color: #d1d5db;
          margin-bottom: 1rem;
        }
        .loading {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .drag-handle {
          cursor: move;
          color: #9ca3af;
        }
        .drag-handle:hover {
          color: #667eea;
        }
      </style>
    </head>
    <body>
      <div class="container-wrapper">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">
              <i class="fas fa-question-circle mr-3"></i>
              FAQ Management
            </h1>
            <p class="text-white/80">Häufig gestellte Fragen verwalten</p>
          </div>
          <div class="flex gap-3">
            <button onclick="openCategoryModal()" class="btn btn-secondary">
              <i class="fas fa-folder-plus"></i>
              Kategorie hinzufügen
            </button>
            <button onclick="openFAQModal()" class="btn btn-primary">
              <i class="fas fa-plus"></i>
              FAQ hinzufügen
            </button>
            <a href="/admin" class="btn btn-secondary">
              <i class="fas fa-arrow-left"></i>
              Zurück
            </a>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-folder"></i>
            </div>
            <div class="flex-1">
              <div class="text-sm opacity-90 mb-1">Kategorien</div>
              <div class="text-3xl font-bold" id="stat-categories">0</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-question"></i>
            </div>
            <div class="flex-1">
              <div class="text-sm opacity-90 mb-1">FAQ Einträge</div>
              <div class="text-3xl font-bold" id="stat-faqs">0</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-eye"></i>
            </div>
            <div class="flex-1">
              <div class="text-sm opacity-90 mb-1">Gesamt-Aufrufe</div>
              <div class="text-3xl font-bold" id="stat-views">0</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-thumbs-up"></i>
            </div>
            <div class="flex-1">
              <div class="text-sm opacity-90 mb-1">Hilfreich-Bewertungen</div>
              <div class="text-3xl font-bold" id="stat-helpful">0</div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Categories Sidebar -->
          <div class="lg:col-span-1">
            <div class="dashboard-card">
              <h3 class="text-lg font-bold mb-4">
                <i class="fas fa-folder mr-2"></i>
                Kategorien
              </h3>
              
              <div id="categories-list">
                <div class="text-center py-8 text-gray-500">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Lade...
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Items -->
          <div class="lg:col-span-3">
            <div class="dashboard-card">
              <!-- Tabs -->
              <div class="tabs">
                <div class="tab active" data-tab="all" onclick="switchTab('all')">
                  <i class="fas fa-list mr-2"></i>
                  Alle FAQs
                </div>
                <div class="tab" data-tab="featured" onclick="switchTab('featured')">
                  <i class="fas fa-star mr-2"></i>
                  Empfohlen
                </div>
                <div class="tab" data-tab="analytics" onclick="switchTab('analytics')">
                  <i class="fas fa-chart-bar mr-2"></i>
                  Analytics
                </div>
              </div>

              <!-- Search -->
              <div class="search-box">
                <i class="fas fa-search search-icon"></i>
                <input 
                  type="text" 
                  class="search-input" 
                  placeholder="FAQs durchsuchen..." 
                  id="search-input"
                  onkeyup="searchFAQs()"
                >
              </div>

              <!-- FAQ List -->
              <div id="faq-list-container">
                <div id="faq-list">
                  <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Lade FAQs...
                  </div>
                </div>
              </div>

              <!-- Analytics View -->
              <div id="analytics-view" style="display: none;">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div class="text-sm text-blue-600 mb-1">Meistgelesene FAQ</div>
                    <div class="text-2xl font-bold text-blue-900" id="most-viewed-question">-</div>
                    <div class="text-sm text-blue-600 mt-2" id="most-viewed-count">0 Aufrufe</div>
                  </div>
                  
                  <div class="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div class="text-sm text-green-600 mb-1">Hilfreichste FAQ</div>
                    <div class="text-2xl font-bold text-green-900" id="most-helpful-question">-</div>
                    <div class="text-sm text-green-600 mt-2" id="most-helpful-count">0 positive Bewertungen</div>
                  </div>
                </div>

                <h4 class="text-lg font-bold mb-4">Top 10 FAQs nach Aufrufen</h4>
                <div class="space-y-2" id="top-faqs-list">
                  <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Lade Analytics...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Modal -->
      <div id="category-modal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="text-xl font-bold" id="category-modal-title">Kategorie hinzufügen</h3>
            <button onclick="closeCategoryModal()" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
          <div class="modal-body">
            <form id="category-form">
              <input type="hidden" id="category-id">
              
              <div class="form-group">
                <label class="form-label">Name *</label>
                <input type="text" class="form-control" id="category-name" required>
              </div>

              <div class="form-group">
                <label class="form-label">Slug *</label>
                <input type="text" class="form-control" id="category-slug" required>
                <small class="text-gray-500">URL-freundlicher Name (z.B. "general" oder "payment-shipping")</small>
              </div>

              <div class="form-group">
                <label class="form-label">Beschreibung</label>
                <textarea class="form-control" id="category-description"></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Icon (Font Awesome)</label>
                <input type="text" class="form-control" id="category-icon" placeholder="fa-question-circle">
                <small class="text-gray-500">z.B. fa-question-circle, fa-key, fa-download</small>
              </div>

              <div class="form-group">
                <label class="form-label">Anzeigereihenfolge</label>
                <input type="number" class="form-control" id="category-order" value="0">
              </div>

              <div class="form-group">
                <label class="form-check">
                  <input type="checkbox" id="category-active" checked>
                  <span>Aktiv</span>
                </label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button onclick="closeCategoryModal()" class="btn btn-secondary">Abbrechen</button>
            <button onclick="saveCategoryOrUpdate()" class="btn btn-primary">
              <i class="fas fa-save"></i>
              Speichern
            </button>
          </div>
        </div>
      </div>

      <!-- FAQ Modal -->
      <div id="faq-modal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="text-xl font-bold" id="faq-modal-title">FAQ hinzufügen</h3>
            <button onclick="closeFAQModal()" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
          <div class="modal-body">
            <form id="faq-form">
              <input type="hidden" id="faq-id">
              
              <div class="form-group">
                <label class="form-label">Kategorie *</label>
                <select class="form-control" id="faq-category" required>
                  <option value="">Bitte wählen...</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Frage *</label>
                <input type="text" class="form-control" id="faq-question" required>
              </div>

              <div class="form-group">
                <label class="form-label">Antwort *</label>
                <textarea class="form-control" id="faq-answer" required style="min-height: 200px;"></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Tags (durch Komma getrennt)</label>
                <input type="text" class="form-control" id="faq-tags" placeholder="windows, installation, lizenz">
              </div>

              <div class="form-group">
                <label class="form-label">Anzeigereihenfolge</label>
                <input type="number" class="form-control" id="faq-order" value="0">
              </div>

              <div class="form-group">
                <label class="form-check">
                  <input type="checkbox" id="faq-featured">
                  <span>Als empfohlen markieren</span>
                </label>
              </div>

              <div class="form-group">
                <label class="form-check">
                  <input type="checkbox" id="faq-active" checked>
                  <span>Aktiv</span>
                </label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button onclick="closeFAQModal()" class="btn btn-secondary">Abbrechen</button>
            <button onclick="saveFAQOrUpdate()" class="btn btn-primary">
              <i class="fas fa-save"></i>
              Speichern
            </button>
          </div>
        </div>
      </div>

      <script>
        // Global state
        let categories = [];
        let faqs = [];
        let currentCategoryId = null;
        let currentTab = 'all';

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
          loadCategories();
          loadFAQs();
          loadStats();
        });

        // Load categories
        async function loadCategories() {
          try {
            const response = await axios.get('/api/admin/faq/categories');
            categories = response.data.categories || [];
            renderCategories();
            populateCategorySelect();
          } catch (error) {
            console.error('Error loading categories:', error);
          }
        }

        // Render categories
        function renderCategories() {
          const container = document.getElementById('categories-list');
          
          if (categories.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Keine Kategorien vorhanden</p></div>';
            return;
          }

          container.innerHTML = categories
            .sort((a, b) => a.display_order - b.display_order)
            .map(cat => \`
              <div class="category-card \${currentCategoryId === cat.id ? 'active' : ''}" onclick="selectCategory(\${cat.id})">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <i class="fas \${cat.icon || 'fa-folder'}"></i>
                    <span class="font-bold">\${cat.name}</span>
                  </div>
                  <span class="badge badge-primary">\${getFAQCount(cat.id)}</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">\${cat.description || ''}</p>
                <div class="flex gap-2">
                  <button onclick="event.stopPropagation(); editCategory(\${cat.id})" class="btn btn-sm btn-secondary">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button onclick="event.stopPropagation(); deleteCategory(\${cat.id})" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            \`).join('');
        }

        // Get FAQ count for category
        function getFAQCount(categoryId) {
          return faqs.filter(f => f.category_id === categoryId).length;
        }

        // Select category
        function selectCategory(categoryId) {
          currentCategoryId = currentCategoryId === categoryId ? null : categoryId;
          renderCategories();
          renderFAQs();
        }

        // Load FAQs
        async function loadFAQs() {
          try {
            const response = await axios.get('/api/admin/faq/items');
            faqs = response.data.faqs || [];
            renderFAQs();
          } catch (error) {
            console.error('Error loading FAQs:', error);
          }
        }

        // Render FAQs
        function renderFAQs() {
          const container = document.getElementById('faq-list');
          let filteredFAQs = faqs;

          // Filter by category
          if (currentCategoryId) {
            filteredFAQs = filteredFAQs.filter(f => f.category_id === currentCategoryId);
          }

          // Filter by tab
          if (currentTab === 'featured') {
            filteredFAQs = filteredFAQs.filter(f => f.is_featured === 1);
          }

          // Sort by display order
          filteredFAQs.sort((a, b) => a.display_order - b.display_order);

          if (filteredFAQs.length === 0) {
            container.innerHTML = \`
              <div class="empty-state">
                <div class="empty-state-icon">
                  <i class="fas fa-inbox"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Keine FAQs gefunden</h3>
                <p class="mb-4">Fügen Sie Ihre erste FAQ hinzu</p>
                <button onclick="openFAQModal()" class="btn btn-primary">
                  <i class="fas fa-plus"></i>
                  FAQ hinzufügen
                </button>
              </div>
            \`;
            return;
          }

          container.innerHTML = filteredFAQs.map(faq => {
            const category = categories.find(c => c.id === faq.category_id);
            const tags = faq.tags ? faq.tags.split(',') : [];
            
            return \`
              <div class="faq-item" id="faq-\${faq.id}">
                <div class="faq-question" onclick="toggleFAQ(\${faq.id})">
                  <div class="flex items-center gap-3 flex-1">
                    <i class="fas fa-chevron-right text-gray-400" id="icon-\${faq.id}"></i>
                    <span>\${faq.question}</span>
                    \${faq.is_featured ? '<i class="fas fa-star text-yellow-500"></i>' : ''}
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="badge badge-info">\${category?.name || 'Ohne Kategorie'}</span>
                    <span class="badge badge-primary">
                      <i class="fas fa-eye"></i> \${faq.views || 0}
                    </span>
                  </div>
                </div>
                <div class="faq-answer">
                  <p>\${faq.answer}</p>
                  \${tags.length > 0 ? \`
                    <div class="mt-3">
                      \${tags.map(tag => \`<span class="tag"><i class="fas fa-tag text-gray-400"></i> \${tag.trim()}</span>\`).join('')}
                    </div>
                  \` : ''}
                  <div class="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <span class="text-sm text-gray-600">
                      <i class="fas fa-thumbs-up text-green-600"></i> \${faq.helpful_count || 0}
                      <i class="fas fa-thumbs-down text-red-600 ml-2"></i> \${faq.not_helpful_count || 0}
                    </span>
                    <div class="ml-auto flex gap-2">
                      <button onclick="event.stopPropagation(); editFAQ(\${faq.id})" class="btn btn-sm btn-secondary">
                        <i class="fas fa-edit"></i> Bearbeiten
                      </button>
                      <button onclick="event.stopPropagation(); deleteFAQ(\${faq.id})" class="btn btn-sm btn-danger">
                        <i class="fas fa-trash"></i> Löschen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            \`;
          }).join('');
        }

        // Toggle FAQ expansion
        function toggleFAQ(id) {
          const element = document.getElementById(\`faq-\${id}\`);
          const icon = document.getElementById(\`icon-\${id}\`);
          element.classList.toggle('expanded');
          
          if (element.classList.contains('expanded')) {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-down');
          } else {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-right');
          }
        }

        // Load stats
        async function loadStats() {
          try {
            const statsResponse = await axios.get('/api/admin/faq/stats');
            const stats = statsResponse.data;
            
            document.getElementById('stat-categories').textContent = stats.categories || 0;
            document.getElementById('stat-faqs').textContent = stats.faqs || 0;
            document.getElementById('stat-views').textContent = (stats.views || 0).toLocaleString('de-DE');
            document.getElementById('stat-helpful').textContent = (stats.helpful || 0).toLocaleString('de-DE');
          } catch (error) {
            console.error('Error loading stats:', error);
          }
        }

        // Search FAQs
        function searchFAQs() {
          const query = document.getElementById('search-input').value.toLowerCase();
          
          const faqItems = document.querySelectorAll('.faq-item');
          faqItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? 'block' : 'none';
          });
        }

        // Switch tabs
        function switchTab(tab) {
          currentTab = tab;
          
          // Update tab UI
          document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          document.querySelector(\`[data-tab="\${tab}"]\`).classList.add('active');
          
          // Show/hide content
          if (tab === 'analytics') {
            document.getElementById('faq-list-container').style.display = 'none';
            document.getElementById('analytics-view').style.display = 'block';
            loadAnalytics();
          } else {
            document.getElementById('faq-list-container').style.display = 'block';
            document.getElementById('analytics-view').style.display = 'none';
            renderFAQs();
          }
        }

        // Load analytics
        async function loadAnalytics() {
          try {
            const response = await axios.get('/api/admin/faq/analytics');
            const data = response.data;
            
            // Most viewed
            if (data.mostViewed) {
              document.getElementById('most-viewed-question').textContent = data.mostViewed.question;
              document.getElementById('most-viewed-count').textContent = \`\${data.mostViewed.views} Aufrufe\`;
            }
            
            // Most helpful
            if (data.mostHelpful) {
              document.getElementById('most-helpful-question').textContent = data.mostHelpful.question;
              document.getElementById('most-helpful-count').textContent = \`\${data.mostHelpful.helpful_count} positive Bewertungen\`;
            }
            
            // Top FAQs
            const topList = document.getElementById('top-faqs-list');
            topList.innerHTML = (data.topFAQs || []).map((faq, index) => \`
              <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-gray-400">\${index + 1}</div>
                <div class="flex-1">
                  <div class="font-medium">\${faq.question}</div>
                  <div class="text-sm text-gray-600 mt-1">
                    <i class="fas fa-eye"></i> \${faq.views} Aufrufe
                    <i class="fas fa-thumbs-up ml-3"></i> \${faq.helpful_count || 0}
                    <i class="fas fa-thumbs-down ml-2"></i> \${faq.not_helpful_count || 0}
                  </div>
                </div>
              </div>
            \`).join('');
          } catch (error) {
            console.error('Error loading analytics:', error);
          }
        }

        // Category Modal Functions
        function openCategoryModal() {
          document.getElementById('category-id').value = '';
          document.getElementById('category-form').reset();
          document.getElementById('category-modal-title').textContent = 'Kategorie hinzufügen';
          document.getElementById('category-modal').classList.add('active');
        }

        function closeCategoryModal() {
          document.getElementById('category-modal').classList.remove('active');
        }

        function editCategory(id) {
          const category = categories.find(c => c.id === id);
          if (!category) return;
          
          document.getElementById('category-id').value = category.id;
          document.getElementById('category-name').value = category.name;
          document.getElementById('category-slug').value = category.slug;
          document.getElementById('category-description').value = category.description || '';
          document.getElementById('category-icon').value = category.icon || '';
          document.getElementById('category-order').value = category.display_order || 0;
          document.getElementById('category-active').checked = category.is_active === 1;
          document.getElementById('category-modal-title').textContent = 'Kategorie bearbeiten';
          document.getElementById('category-modal').classList.add('active');
        }

        async function saveCategoryOrUpdate() {
          const id = document.getElementById('category-id').value;
          const data = {
            name: document.getElementById('category-name').value,
            slug: document.getElementById('category-slug').value,
            description: document.getElementById('category-description').value,
            icon: document.getElementById('category-icon').value,
            display_order: parseInt(document.getElementById('category-order').value) || 0,
            is_active: document.getElementById('category-active').checked ? 1 : 0
          };

          try {
            if (id) {
              await axios.put(\`/api/admin/faq/categories/\${id}\`, data);
            } else {
              await axios.post('/api/admin/faq/categories', data);
            }
            
            closeCategoryModal();
            loadCategories();
            loadStats();
            alert('Kategorie erfolgreich gespeichert!');
          } catch (error) {
            console.error('Error saving category:', error);
            alert('Fehler beim Speichern der Kategorie');
          }
        }

        async function deleteCategory(id) {
          if (!confirm('Möchten Sie diese Kategorie wirklich löschen? Alle FAQs in dieser Kategorie werden ebenfalls gelöscht.')) {
            return;
          }

          try {
            await axios.delete(\`/api/admin/faq/categories/\${id}\`);
            loadCategories();
            loadFAQs();
            loadStats();
            alert('Kategorie erfolgreich gelöscht!');
          } catch (error) {
            console.error('Error deleting category:', error);
            alert('Fehler beim Löschen der Kategorie');
          }
        }

        // FAQ Modal Functions
        function openFAQModal() {
          document.getElementById('faq-id').value = '';
          document.getElementById('faq-form').reset();
          document.getElementById('faq-modal-title').textContent = 'FAQ hinzufügen';
          
          // Set default category if one is selected
          if (currentCategoryId) {
            document.getElementById('faq-category').value = currentCategoryId;
          }
          
          document.getElementById('faq-modal').classList.add('active');
        }

        function closeFAQModal() {
          document.getElementById('faq-modal').classList.remove('active');
        }

        function editFAQ(id) {
          const faq = faqs.find(f => f.id === id);
          if (!faq) return;
          
          document.getElementById('faq-id').value = faq.id;
          document.getElementById('faq-category').value = faq.category_id;
          document.getElementById('faq-question').value = faq.question;
          document.getElementById('faq-answer').value = faq.answer;
          document.getElementById('faq-tags').value = faq.tags || '';
          document.getElementById('faq-order').value = faq.display_order || 0;
          document.getElementById('faq-featured').checked = faq.is_featured === 1;
          document.getElementById('faq-active').checked = faq.is_active === 1;
          document.getElementById('faq-modal-title').textContent = 'FAQ bearbeiten';
          document.getElementById('faq-modal').classList.add('active');
        }

        async function saveFAQOrUpdate() {
          const id = document.getElementById('faq-id').value;
          const data = {
            category_id: parseInt(document.getElementById('faq-category').value),
            question: document.getElementById('faq-question').value,
            answer: document.getElementById('faq-answer').value,
            tags: document.getElementById('faq-tags').value,
            display_order: parseInt(document.getElementById('faq-order').value) || 0,
            is_featured: document.getElementById('faq-featured').checked ? 1 : 0,
            is_active: document.getElementById('faq-active').checked ? 1 : 0
          };

          try {
            if (id) {
              await axios.put(\`/api/admin/faq/items/\${id}\`, data);
            } else {
              await axios.post('/api/admin/faq/items', data);
            }
            
            closeFAQModal();
            loadFAQs();
            loadStats();
            alert('FAQ erfolgreich gespeichert!');
          } catch (error) {
            console.error('Error saving FAQ:', error);
            alert('Fehler beim Speichern der FAQ');
          }
        }

        async function deleteFAQ(id) {
          if (!confirm('Möchten Sie diese FAQ wirklich löschen?')) {
            return;
          }

          try {
            await axios.delete(\`/api/admin/faq/items/\${id}\`);
            loadFAQs();
            loadStats();
            alert('FAQ erfolgreich gelöscht!');
          } catch (error) {
            console.error('Error deleting FAQ:', error);
            alert('Fehler beim Löschen der FAQ');
          }
        }

        // Populate category select
        function populateCategorySelect() {
          const select = document.getElementById('faq-category');
          select.innerHTML = '<option value="">Bitte wählen...</option>' +
            categories.map(cat => \`
              <option value="\${cat.id}">\${cat.name}</option>
            \`).join('');
        }

        // Auto-generate slug from name
        document.getElementById('category-name')?.addEventListener('input', (e) => {
          const slug = e.target.value
            .toLowerCase()
            .replace(/ä/g, 'ae')
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
          document.getElementById('category-slug').value = slug;
        });
      </script>
    </body>
    </html>
  `;
}
