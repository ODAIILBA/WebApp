export function AdminCategories() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Categories - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
        :root {
            --navy: #132C46;
            --gold: #D9A50B;
        }
        body {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .admin-header {
            background: linear-gradient(135deg, var(--navy) 0%, #1a3a54 100%);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            border-left: 4px solid var(--gold);
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }
        .modal.active {
            display: flex;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <div class="admin-header text-white p-6 mb-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">
                        <i class="fas fa-folder-open mr-3"></i>Categories
                    </h1>
                    <p class="text-blue-100">Produktkategorien verwalten</p>
                </div>
                <div class="flex gap-4">
                    <button onclick="openAddModal()" class="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                        <i class="fas fa-plus mr-2"></i>Neue Kategorie
                    </button>
                    <a href="/admin" class="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                        <i class="fas fa-arrow-left mr-2"></i>Zurück
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 pb-12">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Gesamt</span>
                    <i class="fas fa-folder text-blue-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="totalCategories">0</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Aktiv</span>
                    <i class="fas fa-check-circle text-green-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="activeCategories">0</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Produkte</span>
                    <i class="fas fa-box" style="color: var(--gold)"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="totalProducts">0</div>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Ø Produkte</span>
                    <i class="fas fa-chart-bar text-purple-600 text-xl"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800" id="avgProducts">0</div>
            </div>
        </div>

        <!-- Categories Table -->
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-6">Alle Kategorien</h2>
            <div id="categoriesContainer">
                <div class="text-center py-12">
                    <i class="fas fa-spinner fa-spin text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">Kategorien werden geladen...</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit Category Modal -->
    <div id="categoryModal" class="modal">
        <div class="modal-content">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold" id="modalTitle">Neue Kategorie</h2>
                <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <form id="categoryForm" onsubmit="saveCategory(event)">
                <input type="hidden" id="categoryId">
                
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Name *</label>
                    <input type="text" id="categoryName" required 
                           class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Slug *</label>
                    <input type="text" id="categorySlug" required 
                           class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                           placeholder="z.B. office-software">
                    <p class="text-sm text-gray-500 mt-1">URL-freundlicher Name (nur Kleinbuchstaben, Zahlen und Bindestriche)</p>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Beschreibung</label>
                    <textarea id="categoryDescription" rows="3"
                              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"></textarea>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Icon</label>
                    <input type="text" id="categoryIcon" 
                           class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                           placeholder="z.B. laptop, shield-alt, box">
                    <p class="text-sm text-gray-500 mt-1">FontAwesome Icon Name (ohne "fa-" Präfix)</p>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Sortierung</label>
                    <input type="number" id="categorySortOrder" value="0" 
                           class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                </div>

                <div class="mb-6">
                    <label class="flex items-center">
                        <input type="checkbox" id="categoryIsActive" checked class="mr-2">
                        <span class="text-gray-700 font-semibold">Aktiv</span>
                    </label>
                </div>

                <div class="flex gap-4">
                    <button type="submit" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                    <button type="button" onclick="closeModal()" class="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold">
                        <i class="fas fa-times mr-2"></i>Abbrechen
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        let categories = [];

        // Load categories
        async function loadCategories() {
            try {
                const response = await axios.get('/api/categories');
                if (response.data.success) {
                    categories = response.data.data;
                    renderCategories();
                    updateStats();
                }
            } catch (error) {
                console.error('Error loading categories:', error);
                showNotification('Fehler beim Laden der Kategorien', 'error');
            }
        }

        // Render categories table
        function renderCategories() {
            const container = document.getElementById('categoriesContainer');
            
            if (categories.length === 0) {
                container.innerHTML = \`
                    <div class="text-center py-12 text-gray-500">
                        <i class="fas fa-folder-open text-4xl mb-4 text-gray-300"></i>
                        <p>Keine Kategorien vorhanden</p>
                        <button onclick="openAddModal()" class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            <i class="fas fa-plus mr-2"></i>Erste Kategorie erstellen
                        </button>
                    </div>
                \`;
                return;
            }

            const table = \`
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sortierung</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            \${categories.map(cat => \`
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#\${cat.id}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <i class="fas fa-\${cat.icon || 'folder'} text-blue-600 mr-2"></i>
                                            <span class="text-sm font-medium text-gray-900">\${cat.name}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${cat.slug}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${cat.icon || '-'}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${cat.sort_order}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full \${cat.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                            \${cat.is_active ? 'Aktiv' : 'Inaktiv'}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onclick="editCategory(\${cat.id})" class="text-blue-600 hover:text-blue-900 mr-3">
                                            <i class="fas fa-edit"></i> Bearbeiten
                                        </button>
                                        <button onclick="deleteCategory(\${cat.id})" class="text-red-600 hover:text-red-900">
                                            <i class="fas fa-trash"></i> Löschen
                                        </button>
                                    </td>
                                </tr>
                            \`).join('')}
                        </tbody>
                    </table>
                </div>
            \`;
            
            container.innerHTML = table;
        }

        // Update statistics
        function updateStats() {
            const total = categories.length;
            const active = categories.filter(c => c.is_active).length;
            
            document.getElementById('totalCategories').textContent = total;
            document.getElementById('activeCategories').textContent = active;
            
            // These would need additional API calls for accurate data
            document.getElementById('totalProducts').textContent = '-';
            document.getElementById('avgProducts').textContent = '-';
        }

        // Open add modal
        function openAddModal() {
            document.getElementById('modalTitle').textContent = 'Neue Kategorie';
            document.getElementById('categoryForm').reset();
            document.getElementById('categoryId').value = '';
            document.getElementById('categoryIsActive').checked = true;
            document.getElementById('categoryModal').classList.add('active');
        }

        // Open edit modal
        function editCategory(id) {
            const category = categories.find(c => c.id === id);
            if (!category) return;

            document.getElementById('modalTitle').textContent = 'Kategorie bearbeiten';
            document.getElementById('categoryId').value = category.id;
            document.getElementById('categoryName').value = category.name;
            document.getElementById('categorySlug').value = category.slug;
            document.getElementById('categoryDescription').value = category.description || '';
            document.getElementById('categoryIcon').value = category.icon || '';
            document.getElementById('categorySortOrder').value = category.sort_order || 0;
            document.getElementById('categoryIsActive').checked = category.is_active;
            document.getElementById('categoryModal').classList.add('active');
        }

        // Close modal
        function closeModal() {
            document.getElementById('categoryModal').classList.remove('active');
        }

        // Save category
        async function saveCategory(event) {
            event.preventDefault();

            const id = document.getElementById('categoryId').value;
            const data = {
                name: document.getElementById('categoryName').value,
                slug: document.getElementById('categorySlug').value,
                description: document.getElementById('categoryDescription').value,
                icon: document.getElementById('categoryIcon').value,
                sort_order: parseInt(document.getElementById('categorySortOrder').value) || 0,
                is_active: document.getElementById('categoryIsActive').checked ? 1 : 0
            };

            try {
                let response;
                if (id) {
                    // Update existing
                    response = await axios.put(\`/api/admin/categories/\${id}\`, data);
                } else {
                    // Create new
                    response = await axios.post('/api/admin/categories', data);
                }

                if (response.data.success) {
                    showNotification(id ? 'Kategorie aktualisiert' : 'Kategorie erstellt', 'success');
                    closeModal();
                    loadCategories();
                } else {
                    showNotification(response.data.error || 'Fehler beim Speichern', 'error');
                }
            } catch (error) {
                console.error('Error saving category:', error);
                showNotification(error.response?.data?.error || 'Fehler beim Speichern', 'error');
            }
        }

        // Delete category
        async function deleteCategory(id) {
            if (!confirm('Möchten Sie diese Kategorie wirklich löschen?')) return;

            try {
                const response = await axios.delete(\`/api/admin/categories/\${id}\`);
                if (response.data.success) {
                    showNotification('Kategorie gelöscht', 'success');
                    loadCategories();
                } else {
                    showNotification(response.data.error || 'Fehler beim Löschen', 'error');
                }
            } catch (error) {
                console.error('Error deleting category:', error);
                showNotification(error.response?.data?.error || 'Fehler beim Löschen', 'error');
            }
        }

        // Show notification
        function showNotification(message, type = 'info') {
            const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
            const notification = document.createElement('div');
            notification.className = \`fixed top-4 right-4 \${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in\`;
            notification.innerHTML = \`
                <div class="flex items-center">
                    <i class="fas fa-\${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-3"></i>
                    <span>\${message}</span>
                </div>
            \`;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        }

        // Generate slug from name
        document.getElementById('categoryName').addEventListener('input', function(e) {
            if (!document.getElementById('categoryId').value) { // Only auto-generate for new categories
                const slug = e.target.value
                    .toLowerCase()
                    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                document.getElementById('categorySlug').value = slug;
            }
        });

        // Load categories on page load
        loadCategories();
    </script>
</body>
</html>
  `;
}
