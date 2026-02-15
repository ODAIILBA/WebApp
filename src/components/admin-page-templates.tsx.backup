export function AdminPageTemplates({ templates }: { templates: any[] }) {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Seiten-Vorlagen verwalten - Admin Panel</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style>
            body { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .admin-container {
                max-width: 1400px;
                margin: 2rem auto;
                padding: 0 1rem;
            }
            .card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .template-card {
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                padding: 1rem;
                transition: all 0.3s;
                cursor: pointer;
                background: white;
            }
            .template-card:hover {
                border-color: #667eea;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
                transform: translateY(-2px);
            }
            .template-thumbnail {
                width: 100%;
                height: 150px;
                background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                color: #667eea;
                margin-bottom: 0.75rem;
            }
            .badge {
                display: inline-block;
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            .badge-active { background: #10b981; color: white; }
            .badge-inactive { background: #ef4444; color: white; }
            .badge-category { background: #667eea; color: white; }
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }
            .modal.active {
                display: flex;
            }
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 900px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                padding: 2rem;
            }
            .editor-toolbar {
                background: #f3f4f6;
                border-radius: 8px;
                padding: 0.75rem;
                margin-bottom: 1rem;
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            .editor-btn {
                padding: 0.5rem 1rem;
                background: white;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 0.875rem;
            }
            .editor-btn:hover {
                background: #667eea;
                color: white;
                border-color: #667eea;
            }
            .code-editor {
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.5;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                padding: 1rem;
                min-height: 400px;
                background: #1e1e1e;
                color: #d4d4d4;
            }
            .variable-input {
                display: flex;
                gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.75rem;
                padding: 0.75rem;
                background: #f9fafb;
                border-radius: 6px;
            }
            .btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                border: none;
                cursor: pointer;
                transition: transform 0.2s;
            }
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            }
            .btn-secondary {
                background: #6b7280;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                border: none;
                cursor: pointer;
                transition: all 0.2s;
            }
            .btn-secondary:hover {
                background: #4b5563;
            }
            .filter-tabs {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;
            }
            .filter-tab {
                padding: 0.5rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                background: white;
                border: 2px solid #e5e7eb;
                transition: all 0.2s;
                font-weight: 500;
            }
            .filter-tab:hover, .filter-tab.active {
                background: #667eea;
                color: white;
                border-color: #667eea;
            }
            .preview-container {
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                padding: 1rem;
                background: white;
                min-height: 300px;
            }
            .success-message {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 2000;
                display: none;
                animation: slideIn 0.3s;
            }
            .success-message.show {
                display: block;
            }
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        </style>
    </head>
    <body>
        <!-- Success Message -->
        <div id="success-message" class="success-message">
            <i class="fas fa-check-circle mr-2"></i>
            <span id="success-text">Erfolgreich gespeichert!</span>
        </div>

        <div class="admin-container">
            <!-- Header -->
            <div class="card mb-6">
                <div class="p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-800 mb-2">
                                <i class="fas fa-file-code text-purple-600 mr-3"></i>
                                Seiten-Vorlagen verwalten
                            </h1>
                            <p class="text-gray-600">Erstellen und verwalten Sie Seiten-Vorlagen mit dynamischen Variablen</p>
                        </div>
                        <button onclick="showAddTemplateModal()" class="btn-primary">
                            <i class="fas fa-plus mr-2"></i>
                            Neue Vorlage
                        </button>
                    </div>
                </div>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="card p-4">
                    <div class="flex items-center">
                        <div class="bg-blue-100 p-3 rounded-lg mr-3">
                            <i class="fas fa-file-code text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <p class="text-gray-600 text-sm">Alle Vorlagen</p>
                            <p class="text-2xl font-bold text-gray-800" id="stat-total">0</p>
                        </div>
                    </div>
                </div>
                <div class="card p-4">
                    <div class="flex items-center">
                        <div class="bg-green-100 p-3 rounded-lg mr-3">
                            <i class="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <p class="text-gray-600 text-sm">Aktiv</p>
                            <p class="text-2xl font-bold text-green-600" id="stat-active">0</p>
                        </div>
                    </div>
                </div>
                <div class="card p-4">
                    <div class="flex items-center">
                        <div class="bg-yellow-100 p-3 rounded-lg mr-3">
                            <i class="fas fa-layer-group text-yellow-600 text-xl"></i>
                        </div>
                        <div>
                            <p class="text-gray-600 text-sm">Kategorien</p>
                            <p class="text-2xl font-bold text-yellow-600" id="stat-categories">0</p>
                        </div>
                    </div>
                </div>
                <div class="card p-4">
                    <div class="flex items-center">
                        <div class="bg-purple-100 p-3 rounded-lg mr-3">
                            <i class="fas fa-eye text-purple-600 text-xl"></i>
                        </div>
                        <div>
                            <p class="text-gray-600 text-sm">Letzte Woche</p>
                            <p class="text-2xl font-bold text-purple-600" id="stat-recent">0</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filter Tabs -->
            <div class="filter-tabs">
                <div class="filter-tab active" onclick="filterTemplates('all')">
                    <i class="fas fa-th-large mr-2"></i>Alle
                </div>
                <div class="filter-tab" onclick="filterTemplates('landing')">
                    <i class="fas fa-rocket mr-2"></i>Landing Pages
                </div>
                <div class="filter-tab" onclick="filterTemplates('product')">
                    <i class="fas fa-shopping-bag mr-2"></i>Produkt-Seiten
                </div>
                <div class="filter-tab" onclick="filterTemplates('cms')">
                    <i class="fas fa-file-alt mr-2"></i>CMS-Seiten
                </div>
                <div class="filter-tab" onclick="filterTemplates('custom')">
                    <i class="fas fa-magic mr-2"></i>Benutzerdefiniert
                </div>
            </div>

            <!-- Templates Grid -->
            <div class="card">
                <div class="p-6">
                    <div id="templates-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- Templates will be loaded here -->
                    </div>
                    <div id="no-templates" style="display: none;" class="text-center py-12">
                        <i class="fas fa-inbox text-gray-300 text-6xl mb-4"></i>
                        <p class="text-gray-500 text-lg">Keine Vorlagen gefunden</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add/Edit Template Modal -->
        <div id="template-modal" class="modal">
            <div class="modal-content">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800" id="modal-title">
                        <i class="fas fa-file-code text-purple-600 mr-2"></i>
                        Neue Vorlage erstellen
                    </h2>
                    <button onclick="closeTemplateModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>

                <form id="template-form" onsubmit="saveTemplate(event)">
                    <!-- Basic Info -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-3">Basis-Informationen</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Vorlagenname *</label>
                                <input type="text" id="template-name" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="z.B. Landing Page Hero">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">URL-Slug *</label>
                                <input type="text" id="template-slug" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="landing-page-hero">
                            </div>
                        </div>
                    </div>

                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Beschreibung</label>
                        <textarea id="template-description" rows="3"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Kurze Beschreibung der Vorlage..."></textarea>
                    </div>

                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Kategorie</label>
                            <select id="template-category" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option value="landing">Landing Page</option>
                                <option value="product">Produkt-Seite</option>
                                <option value="cms">CMS-Seite</option>
                                <option value="custom">Benutzerdefiniert</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Typ</label>
                            <select id="template-type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option value="html">HTML</option>
                                <option value="markdown">Markdown</option>
                                <option value="json">JSON</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <div class="flex items-center mt-2">
                                <input type="checkbox" id="template-active" checked
                                    class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                                <label for="template-active" class="ml-2 text-sm text-gray-700">Aktiv</label>
                            </div>
                        </div>
                    </div>

                    <!-- Template Content Editor -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-3">Vorlagen-Inhalt</h3>
                        
                        <!-- Editor Toolbar -->
                        <div class="editor-toolbar">
                            <button type="button" class="editor-btn" onclick="insertVariable('{{title}}')">
                                <i class="fas fa-heading"></i> Titel
                            </button>
                            <button type="button" class="editor-btn" onclick="insertVariable('{{content}}')">
                                <i class="fas fa-align-left"></i> Inhalt
                            </button>
                            <button type="button" class="editor-btn" onclick="insertVariable('{{image}}')">
                                <i class="fas fa-image"></i> Bild
                            </button>
                            <button type="button" class="editor-btn" onclick="insertVariable('{{button}}')">
                                <i class="fas fa-mouse-pointer"></i> Button
                            </button>
                            <button type="button" class="editor-btn" onclick="insertVariable('{{price}}')">
                                <i class="fas fa-euro-sign"></i> Preis
                            </button>
                            <button type="button" class="editor-btn" onclick="insertVariable('{{custom}}')">
                                <i class="fas fa-code"></i> Benutzerdefiniert
                            </button>
                            <button type="button" class="editor-btn" onclick="previewTemplate()">
                                <i class="fas fa-eye"></i> Vorschau
                            </button>
                        </div>

                        <textarea id="template-content" rows="15" required
                            class="code-editor w-full"
                            placeholder="HTML-Vorlagencode hier eingeben...&#10;Verwenden Sie {{variable_name}} für dynamische Variablen"></textarea>
                    </div>

                    <!-- Template Variables -->
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-3">
                            <h3 class="text-lg font-semibold text-gray-700">Template-Variablen</h3>
                            <button type="button" onclick="addVariable()" class="text-purple-600 hover:text-purple-700 text-sm font-medium">
                                <i class="fas fa-plus mr-1"></i>Variable hinzufügen
                            </button>
                        </div>
                        <div id="variables-container">
                            <!-- Variables will be added here -->
                        </div>
                    </div>

                    <!-- Meta Data -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-3">SEO & Meta-Daten</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Meta Titel</label>
                                <input type="text" id="template-meta-title"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
                                <input type="text" id="template-meta-keywords"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Meta Beschreibung</label>
                            <textarea id="template-meta-description" rows="2"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="flex gap-3 justify-end">
                        <button type="button" onclick="closeTemplateModal()" class="btn-secondary">
                            <i class="fas fa-times mr-2"></i>Abbrechen
                        </button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save mr-2"></i>Vorlage speichern
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Preview Modal -->
        <div id="preview-modal" class="modal">
            <div class="modal-content">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">
                        <i class="fas fa-eye text-purple-600 mr-2"></i>
                        Vorschau
                    </h2>
                    <button onclick="closePreviewModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <div id="preview-content" class="preview-container">
                    <!-- Preview will be rendered here -->
                </div>
            </div>
        </div>

        <script>
            let templates = ${JSON.stringify(templates)};
            let currentEditId = null;
            let currentFilter = 'all';
            let variableCounter = 0;

            // Initialize
            document.addEventListener('DOMContentLoaded', () => {
                loadTemplates();
                updateStats();
            });

            // Load templates
            async function loadTemplates() {
                try {
                    const response = await axios.get('/api/admin/page-templates');
                    if (response.data.success) {
                        templates = response.data.templates;
                        renderTemplates();
                        updateStats();
                    }
                } catch (error) {
                    console.error('Error loading templates:', error);
                }
            }

            // Render templates
            function renderTemplates() {
                const grid = document.getElementById('templates-grid');
                const noTemplates = document.getElementById('no-templates');
                
                let filteredTemplates = templates;
                if (currentFilter !== 'all') {
                    filteredTemplates = templates.filter(t => t.category === currentFilter);
                }

                if (filteredTemplates.length === 0) {
                    grid.style.display = 'none';
                    noTemplates.style.display = 'block';
                    return;
                }

                grid.style.display = 'grid';
                noTemplates.style.display = 'none';

                grid.innerHTML = filteredTemplates.map(template => \`
                    <div class="template-card" data-category="\${template.category}">
                        <div class="template-thumbnail">
                            <i class="fas \${getCategoryIcon(template.category)}"></i>
                        </div>
                        <div class="mb-3">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-bold text-gray-800 flex-1">\${template.name}</h3>
                                <span class="badge \${template.is_active ? 'badge-active' : 'badge-inactive'}">
                                    \${template.is_active ? 'Aktiv' : 'Inaktiv'}
                                </span>
                            </div>
                            <p class="text-sm text-gray-600 mb-2">\${template.description || 'Keine Beschreibung'}</p>
                            <span class="badge badge-category">\${getCategoryLabel(template.category)}</span>
                        </div>
                        <div class="flex gap-2 mt-3">
                            <button onclick="editTemplate(\${template.id})" 
                                class="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                                title="Bearbeiten">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="duplicateTemplate(\${template.id})" 
                                class="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                                title="Duplizieren">
                                <i class="fas fa-copy"></i>
                            </button>
                            <button onclick="previewTemplateById(\${template.id})" 
                                class="flex-1 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm"
                                title="Vorschau">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="deleteTemplate(\${template.id})" 
                                class="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                                title="Löschen">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                \`).join('');
            }

            // Filter templates
            function filterTemplates(category) {
                currentFilter = category;
                
                // Update active tab
                document.querySelectorAll('.filter-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                event.target.classList.add('active');
                
                renderTemplates();
            }

            // Update statistics
            function updateStats() {
                document.getElementById('stat-total').textContent = templates.length;
                document.getElementById('stat-active').textContent = templates.filter(t => t.is_active).length;
                
                const categories = new Set(templates.map(t => t.category));
                document.getElementById('stat-categories').textContent = categories.size;
                
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                const recent = templates.filter(t => new Date(t.created_at) > weekAgo).length;
                document.getElementById('stat-recent').textContent = recent;
            }

            // Show add template modal
            function showAddTemplateModal() {
                currentEditId = null;
                document.getElementById('modal-title').innerHTML = '<i class="fas fa-file-code text-purple-600 mr-2"></i>Neue Vorlage erstellen';
                document.getElementById('template-form').reset();
                document.getElementById('variables-container').innerHTML = '';
                variableCounter = 0;
                document.getElementById('template-modal').classList.add('active');
            }

            // Edit template
            async function editTemplate(id) {
                try {
                    const response = await axios.get(\`/api/admin/page-templates/\${id}\`);
                    if (response.data.success) {
                        const template = response.data.template;
                        currentEditId = id;
                        
                        document.getElementById('modal-title').innerHTML = '<i class="fas fa-edit text-purple-600 mr-2"></i>Vorlage bearbeiten';
                        document.getElementById('template-name').value = template.name;
                        document.getElementById('template-slug').value = template.slug;
                        document.getElementById('template-description').value = template.description || '';
                        document.getElementById('template-category').value = template.category;
                        document.getElementById('template-type').value = template.template_type;
                        document.getElementById('template-active').checked = template.is_active === 1;
                        document.getElementById('template-content').value = template.content;
                        document.getElementById('template-meta-title').value = template.meta_title || '';
                        document.getElementById('template-meta-keywords').value = template.meta_keywords || '';
                        document.getElementById('template-meta-description').value = template.meta_description || '';
                        
                        // Load variables
                        document.getElementById('variables-container').innerHTML = '';
                        variableCounter = 0;
                        if (response.data.variables && response.data.variables.length > 0) {
                            response.data.variables.forEach(variable => {
                                addVariable(variable);
                            });
                        }
                        
                        document.getElementById('template-modal').classList.add('active');
                    }
                } catch (error) {
                    console.error('Error loading template:', error);
                    alert('Fehler beim Laden der Vorlage');
                }
            }

            // Save template
            async function saveTemplate(event) {
                event.preventDefault();
                
                const templateData = {
                    name: document.getElementById('template-name').value,
                    slug: document.getElementById('template-slug').value,
                    description: document.getElementById('template-description').value,
                    category: document.getElementById('template-category').value,
                    template_type: document.getElementById('template-type').value,
                    is_active: document.getElementById('template-active').checked ? 1 : 0,
                    content: document.getElementById('template-content').value,
                    meta_title: document.getElementById('template-meta-title').value,
                    meta_keywords: document.getElementById('template-meta-keywords').value,
                    meta_description: document.getElementById('template-meta-description').value,
                    variables: getVariables()
                };

                try {
                    let response;
                    if (currentEditId) {
                        response = await axios.put(\`/api/admin/page-templates/\${currentEditId}\`, templateData);
                    } else {
                        response = await axios.post('/api/admin/page-templates', templateData);
                    }

                    if (response.data.success) {
                        showSuccess(currentEditId ? 'Vorlage erfolgreich aktualisiert!' : 'Vorlage erfolgreich erstellt!');
                        closeTemplateModal();
                        loadTemplates();
                    }
                } catch (error) {
                    console.error('Error saving template:', error);
                    alert('Fehler beim Speichern der Vorlage');
                }
            }

            // Duplicate template
            async function duplicateTemplate(id) {
                if (!confirm('Möchten Sie diese Vorlage wirklich duplizieren?')) return;
                
                try {
                    const response = await axios.post(\`/api/admin/page-templates/\${id}/duplicate\`);
                    if (response.data.success) {
                        showSuccess('Vorlage erfolgreich dupliziert!');
                        loadTemplates();
                    }
                } catch (error) {
                    console.error('Error duplicating template:', error);
                    alert('Fehler beim Duplizieren der Vorlage');
                }
            }

            // Delete template
            async function deleteTemplate(id) {
                if (!confirm('Möchten Sie diese Vorlage wirklich löschen?')) return;
                
                try {
                    const response = await axios.delete(\`/api/admin/page-templates/\${id}\`);
                    if (response.data.success) {
                        showSuccess('Vorlage erfolgreich gelöscht!');
                        loadTemplates();
                    }
                } catch (error) {
                    console.error('Error deleting template:', error);
                    alert('Fehler beim Löschen der Vorlage');
                }
            }

            // Add variable
            function addVariable(variableData = null) {
                const container = document.getElementById('variables-container');
                const id = variableData ? variableData.id : variableCounter++;
                
                const variableHtml = \`
                    <div class="variable-input" id="variable-\${id}">
                        <input type="text" placeholder="Variable Name" value="\${variableData ? variableData.variable_name : ''}"
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg" data-var-name>
                        <select class="px-3 py-2 border border-gray-300 rounded-lg" data-var-type>
                            <option value="text" \${variableData && variableData.variable_type === 'text' ? 'selected' : ''}>Text</option>
                            <option value="textarea" \${variableData && variableData.variable_type === 'textarea' ? 'selected' : ''}>Textarea</option>
                            <option value="image" \${variableData && variableData.variable_type === 'image' ? 'selected' : ''}>Bild</option>
                            <option value="url" \${variableData && variableData.variable_type === 'url' ? 'selected' : ''}>URL</option>
                            <option value="number" \${variableData && variableData.variable_type === 'number' ? 'selected' : ''}>Zahl</option>
                        </select>
                        <input type="text" placeholder="Standardwert" value="\${variableData ? variableData.default_value : ''}"
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg" data-var-default>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-1" data-var-required \${variableData && variableData.is_required ? 'checked' : ''}>
                            <span class="text-sm">Erforderlich</span>
                        </label>
                        <button type="button" onclick="removeVariable('\${id}')" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                \`;
                
                container.insertAdjacentHTML('beforeend', variableHtml);
            }

            // Remove variable
            function removeVariable(id) {
                document.getElementById(\`variable-\${id}\`).remove();
            }

            // Get variables
            function getVariables() {
                const variables = [];
                document.querySelectorAll('.variable-input').forEach(input => {
                    const name = input.querySelector('[data-var-name]').value;
                    if (name) {
                        variables.push({
                            variable_name: name,
                            variable_type: input.querySelector('[data-var-type]').value,
                            default_value: input.querySelector('[data-var-default]').value,
                            is_required: input.querySelector('[data-var-required]').checked ? 1 : 0
                        });
                    }
                });
                return variables;
            }

            // Insert variable into editor
            function insertVariable(variable) {
                const editor = document.getElementById('template-content');
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const text = editor.value;
                
                editor.value = text.substring(0, start) + variable + text.substring(end);
                editor.focus();
                editor.selectionStart = editor.selectionEnd = start + variable.length;
            }

            // Preview template
            function previewTemplate() {
                const content = document.getElementById('template-content').value;
                const previewContent = document.getElementById('preview-content');
                
                // Replace variables with sample data
                let preview = content
                    .replace(/{{title}}/g, '<h1>Beispiel Titel</h1>')
                    .replace(/{{content}}/g, '<p>Dies ist ein Beispielinhalt für die Vorschau.</p>')
                    .replace(/{{image}}/g, '<img src="https://via.placeholder.com/600x400" alt="Beispielbild">')
                    .replace(/{{button}}/g, '<button class="btn-primary">Beispiel Button</button>')
                    .replace(/{{price}}/g, '<span class="text-2xl font-bold text-green-600">€99.99</span>')
                    .replace(/{{(\w+)}}/g, '<span class="bg-yellow-100 px-2 py-1 rounded">$1</span>');
                
                previewContent.innerHTML = preview;
                document.getElementById('preview-modal').classList.add('active');
            }

            // Preview template by ID
            async function previewTemplateById(id) {
                try {
                    const response = await axios.get(\`/api/admin/page-templates/\${id}\`);
                    if (response.data.success) {
                        const template = response.data.template;
                        const previewContent = document.getElementById('preview-content');
                        
                        let preview = template.content
                            .replace(/{{title}}/g, '<h1>Beispiel Titel</h1>')
                            .replace(/{{content}}/g, '<p>Dies ist ein Beispielinhalt für die Vorschau.</p>')
                            .replace(/{{image}}/g, '<img src="https://via.placeholder.com/600x400" alt="Beispielbild" class="w-full rounded-lg">')
                            .replace(/{{button}}/g, '<button class="btn-primary">Beispiel Button</button>')
                            .replace(/{{price}}/g, '<span class="text-2xl font-bold text-green-600">€99.99</span>')
                            .replace(/{{(\w+)}}/g, '<span class="bg-yellow-100 px-2 py-1 rounded">$1</span>');
                        
                        previewContent.innerHTML = preview;
                        document.getElementById('preview-modal').classList.add('active');
                    }
                } catch (error) {
                    console.error('Error loading template:', error);
                }
            }

            // Close modals
            function closeTemplateModal() {
                document.getElementById('template-modal').classList.remove('active');
            }

            function closePreviewModal() {
                document.getElementById('preview-modal').classList.remove('active');
            }

            // Show success message
            function showSuccess(message) {
                const successMsg = document.getElementById('success-message');
                document.getElementById('success-text').textContent = message;
                successMsg.classList.add('show');
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 3000);
            }

            // Get category icon
            function getCategoryIcon(category) {
                const icons = {
                    'landing': 'fa-rocket',
                    'product': 'fa-shopping-bag',
                    'cms': 'fa-file-alt',
                    'custom': 'fa-magic'
                };
                return icons[category] || 'fa-file-code';
            }

            // Get category label
            function getCategoryLabel(category) {
                const labels = {
                    'landing': 'Landing Page',
                    'product': 'Produkt-Seite',
                    'cms': 'CMS-Seite',
                    'custom': 'Benutzerdefiniert'
                };
                return labels[category] || category;
            }

            // Auto-generate slug from name
            document.getElementById('template-name')?.addEventListener('input', function() {
                const slug = this.value.toLowerCase()
                    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                document.getElementById('template-slug').value = slug;
            });
        </script>
    </body>
    </html>
  `;
}
