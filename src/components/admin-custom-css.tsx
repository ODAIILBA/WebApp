import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

interface CustomCSS {
  id: number
  name: string
  css_code: string
  is_active: number
  apply_to: string
  priority: number
  created_at: string
  updated_at: string
}

export const AdminCustomCSS = (styles: CustomCSS[]) => {
  const stylesList = styles.map(style => `
    <tr class="hover:bg-gray-50 transition-colors" data-style-id="${style.id}">
      <td class="px-6 py-4">
        <div class="flex items-center">
          <div class="flex-1">
            <div class="font-semibold text-gray-900">${style.name}</div>
            <div class="text-sm text-gray-500 mt-1">
              <i class="fas fa-clock mr-1"></i>
              ${new Date(style.created_at).toLocaleDateString('de-DE')}
            </div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4">
        <code class="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 max-w-xs block truncate">
          ${style.css_code.substring(0, 60)}${style.css_code.length > 60 ? '...' : ''}
        </code>
      </td>
      <td class="px-6 py-4">
        <span class="px-3 py-1 rounded-full text-xs font-medium ${
          style.apply_to === 'all' ? 'bg-purple-100 text-purple-800' :
          style.apply_to === 'homepage' ? 'bg-blue-100 text-blue-800' :
          style.apply_to === 'products' ? 'bg-green-100 text-green-800' :
          style.apply_to === 'admin' ? 'bg-orange-100 text-orange-800' :
          'bg-gray-100 text-gray-800'
        }">
          ${style.apply_to === 'all' ? '🌐 All Pages' :
            style.apply_to === 'homepage' ? '🏠 Homepage' :
            style.apply_to === 'products' ? '🛍️ Products' :
            style.apply_to === 'admin' ? '⚙️ Admin' :
            style.apply_to}
        </span>
      </td>
      <td class="px-6 py-4 text-center">
        <span class="text-sm font-medium text-gray-700">${style.priority}</span>
      </td>
      <td class="px-6 py-4">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" 
                 ${style.is_active ? 'checked' : ''} 
                 onchange="toggleStyleStatus(${style.id}, this.checked)"
                 class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
        </label>
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center gap-2">
          <button onclick="editStyle(${style.id})" 
                  class="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="duplicateStyle(${style.id})" 
                  class="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
                  title="Duplicate">
            <i class="fas fa-copy"></i>
          </button>
          <button onclick="previewStyle(${style.id})" 
                  class="text-purple-600 hover:text-purple-800 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Preview">
            <i class="fas fa-eye"></i>
          </button>
          <button onclick="deleteStyle(${style.id})" 
                  class="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('')

  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Custom CSS - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/monokai.min.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/css/css.min.js"></script>
        <style>
            :root {
                --navy-dark: #1a2a4e;
                --gold: #d4af37;
            }
            
            .admin-sidebar { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            
            .CodeMirror {
                height: 400px;
                border: 1px solid #d1d5db;
                border-radius: 0.5rem;
                font-size: 14px;
            }
            
            .preview-frame {
                border: 2px solid #e5e7eb;
                border-radius: 0.5rem;
                background: white;
            }
        </style>
    </head>
    <body class="bg-gray-50">
        ${AdminSidebarAdvanced('/admin/custom-css')}
        
        <div class="ml-64 p-8">
            <div class="max-w-7xl mx-auto">
                <!-- Header -->
                <div class="mb-8">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900 mb-2">
                                <i class="fas fa-palette text-gold mr-3"></i>
                                Custom CSS Management
                            </h1>
                            <p class="text-gray-600">
                                Add and manage custom CSS styles for your website
                            </p>
                        </div>
                        <div class="flex gap-3">
                            <button onclick="clearCache()" 
                                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                                <i class="fas fa-sync-alt"></i>
                                Clear CSS Cache
                            </button>
                            <button onclick="openAddStyleModal()" 
                                    class="bg-gold hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                                <i class="fas fa-plus"></i>
                                Add Custom CSS
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Total Styles</p>
                                <p class="text-3xl font-bold text-gray-900 mt-1">${styles.length}</p>
                            </div>
                            <div class="bg-blue-100 p-4 rounded-lg">
                                <i class="fas fa-code text-blue-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Active Styles</p>
                                <p class="text-3xl font-bold text-gray-900 mt-1">${styles.filter(s => s.is_active).length}</p>
                            </div>
                            <div class="bg-green-100 p-4 rounded-lg">
                                <i class="fas fa-check-circle text-green-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Global Styles</p>
                                <p class="text-3xl font-bold text-gray-900 mt-1">${styles.filter(s => s.apply_to === 'all').length}</p>
                            </div>
                            <div class="bg-purple-100 p-4 rounded-lg">
                                <i class="fas fa-globe text-purple-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-gold">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Page-Specific</p>
                                <p class="text-3xl font-bold text-gray-900 mt-1">${styles.filter(s => s.apply_to !== 'all').length}</p>
                            </div>
                            <div class="bg-yellow-100 p-4 rounded-lg">
                                <i class="fas fa-file-code text-gold text-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Tips -->
                <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-lg">
                    <div class="flex items-start">
                        <i class="fas fa-lightbulb text-blue-600 text-2xl mr-4 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-blue-900 mb-2">💡 Quick Tips</h3>
                            <ul class="text-blue-800 space-y-1 text-sm">
                                <li>• Use <code class="bg-blue-100 px-2 py-0.5 rounded">:root</code> for global CSS variables</li>
                                <li>• Higher priority numbers load last (override earlier styles)</li>
                                <li>• Test styles on different pages before activating globally</li>
                                <li>• Use <code class="bg-blue-100 px-2 py-0.5 rounded">!important</code> sparingly</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Styles Table -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-gray-200 bg-gray-50">
                        <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <i class="fas fa-list text-gray-600"></i>
                            Custom CSS Styles
                        </h2>
                    </div>
                    
                    ${styles.length > 0 ? `
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CSS Preview</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Apply To</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                ${stylesList}
                            </tbody>
                        </table>
                    </div>
                    ` : `
                    <div class="p-12 text-center">
                        <i class="fas fa-palette text-gray-300 text-6xl mb-4"></i>
                        <p class="text-gray-500 text-lg mb-4">No custom CSS styles yet</p>
                        <button onclick="openAddStyleModal()" 
                                class="bg-gold hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                            Create Your First Style
                        </button>
                    </div>
                    `}
                </div>

                <!-- Preview Button -->
                <div class="mt-6 flex justify-end gap-3">
                    <a href="/" target="_blank" 
                       class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                        <i class="fas fa-external-link-alt"></i>
                        View Live Site
                    </a>
                    <button onclick="exportAllCSS()" 
                            class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                        <i class="fas fa-download"></i>
                        Export All CSS
                    </button>
                </div>
            </div>
        </div>

        <!-- Add/Edit Style Modal -->
        <div id="styleModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50 overflow-y-auto">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-5xl m-4 max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 class="text-2xl font-bold text-gray-900" id="modalTitle">Add Custom CSS</h2>
                </div>
                
                <form id="styleForm" class="p-6 space-y-6">
                    <input type="hidden" id="styleId" name="id" value="">
                    
                    <!-- Name -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-tag mr-2"></i>Style Name *
                        </label>
                        <input type="text" id="styleName" name="name" required
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                               placeholder="e.g., Enhanced Product Cards">
                    </div>
                    
                    <!-- CSS Code Editor -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-code mr-2"></i>CSS Code *
                        </label>
                        <textarea id="cssCode" name="css_code" required
                                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent font-mono text-sm"
                                  rows="10"
                                  placeholder="/* Your custom CSS here */"></textarea>
                    </div>
                    
                    <!-- Settings Grid -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-map-pin mr-2"></i>Apply To
                            </label>
                            <select id="applyTo" name="apply_to"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                                <option value="all">🌐 All Pages</option>
                                <option value="homepage">🏠 Homepage Only</option>
                                <option value="products">🛍️ Products Pages</option>
                                <option value="admin">⚙️ Admin Panel</option>
                                <option value="cart">🛒 Cart & Checkout</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-sort-numeric-up mr-2"></i>Priority (Loading Order)
                            </label>
                            <input type="number" id="priority" name="priority"
                                   value="50"
                                   min="0" max="100"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                            <p class="text-xs text-gray-500 mt-1">Higher = loads later (overrides earlier styles)</p>
                        </div>
                    </div>
                    
                    <!-- Status -->
                    <div>
                        <label class="flex items-center cursor-pointer">
                            <input type="checkbox" id="isActive" name="is_active" checked
                                   class="w-5 h-5 text-gold focus:ring-gold border-gray-300 rounded">
                            <span class="ml-3 text-sm font-semibold text-gray-700">
                                <i class="fas fa-toggle-on mr-2 text-green-600"></i>Activate immediately
                            </span>
                        </label>
                    </div>
                </form>
                
                <div class="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                    <button onclick="closeStyleModal()" 
                            class="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button onclick="saveStyle()" 
                            class="px-6 py-3 bg-gold hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all shadow-lg flex items-center gap-2">
                        <i class="fas fa-save"></i>
                        Save CSS
                    </button>
                </div>
            </div>
        </div>

        <script>
            let cssEditor = null;
            
            // Initialize CodeMirror when modal opens
            function initCodeMirror() {
                if (!cssEditor) {
                    cssEditor = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
                        mode: 'css',
                        theme: 'monokai',
                        lineNumbers: true,
                        autoCloseBrackets: true,
                        matchBrackets: true,
                        indentUnit: 2,
                        tabSize: 2,
                        lineWrapping: true
                    });
                }
            }
            
            // Modal Functions
            function openAddStyleModal() {
                document.getElementById('styleModal').classList.remove('hidden');
                document.getElementById('styleModal').classList.add('flex');
                document.getElementById('modalTitle').textContent = 'Add Custom CSS';
                document.getElementById('styleForm').reset();
                document.getElementById('styleId').value = '';
                initCodeMirror();
                if (cssEditor) cssEditor.setValue('');
            }
            
            function closeStyleModal() {
                document.getElementById('styleModal').classList.add('hidden');
                document.getElementById('styleModal').classList.remove('flex');
            }
            
            async function editStyle(id) {
                try {
                    const response = await axios.get(\`/api/admin/custom-css/\${id}\`);
                    const style = response.data;
                    
                    document.getElementById('modalTitle').textContent = 'Edit Custom CSS';
                    document.getElementById('styleId').value = style.id;
                    document.getElementById('styleName').value = style.name;
                    document.getElementById('applyTo').value = style.apply_to;
                    document.getElementById('priority').value = style.priority;
                    document.getElementById('isActive').checked = style.is_active === 1;
                    
                    openAddStyleModal();
                    if (cssEditor) {
                        cssEditor.setValue(style.css_code);
                    } else {
                        document.getElementById('cssCode').value = style.css_code;
                    }
                } catch (error) {
                    alert('Error loading style: ' + error.message);
                }
            }
            
            async function saveStyle() {
                const id = document.getElementById('styleId').value;
                const name = document.getElementById('styleName').value;
                const cssCode = cssEditor ? cssEditor.getValue() : document.getElementById('cssCode').value;
                const applyTo = document.getElementById('applyTo').value;
                const priority = parseInt(document.getElementById('priority').value);
                const isActive = document.getElementById('isActive').checked ? 1 : 0;
                
                if (!name || !cssCode) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                try {
                    const data = { name, css_code: cssCode, apply_to: applyTo, priority, is_active: isActive };
                    
                    if (id) {
                        await axios.put(\`/api/admin/custom-css/\${id}\`, data);
                    } else {
                        await axios.post('/api/admin/custom-css', data);
                    }
                    
                    alert('CSS style saved successfully!');
                    location.reload();
                } catch (error) {
                    alert('Error saving style: ' + error.message);
                }
            }
            
            async function toggleStyleStatus(id, isActive) {
                try {
                    await axios.patch(\`/api/admin/custom-css/\${id}/toggle\`, { is_active: isActive ? 1 : 0 });
                    // Don't reload, just show success
                    showToast('Status updated successfully');
                } catch (error) {
                    alert('Error toggling status: ' + error.message);
                    location.reload();
                }
            }
            
            async function deleteStyle(id) {
                if (!confirm('Are you sure you want to delete this CSS style?')) return;
                
                try {
                    await axios.delete(\`/api/admin/custom-css/\${id}\`);
                    alert('CSS style deleted!');
                    location.reload();
                } catch (error) {
                    alert('Error deleting style: ' + error.message);
                }
            }
            
            async function duplicateStyle(id) {
                try {
                    const response = await axios.get(\`/api/admin/custom-css/\${id}\`);
                    const style = response.data;
                    
                    const newStyle = {
                        name: style.name + ' (Copy)',
                        css_code: style.css_code,
                        apply_to: style.apply_to,
                        priority: style.priority,
                        is_active: 0
                    };
                    
                    await axios.post('/api/admin/custom-css', newStyle);
                    alert('Style duplicated successfully!');
                    location.reload();
                } catch (error) {
                    alert('Error duplicating style: ' + error.message);
                }
            }
            
            function previewStyle(id) {
                window.open(\`/admin/custom-css/preview/\${id}\`, '_blank');
            }
            
            async function clearCache() {
                if (!confirm('Clear CSS cache and reload all styles?')) return;
                
                try {
                    await axios.post('/api/admin/custom-css/clear-cache');
                    alert('CSS cache cleared successfully!');
                    location.reload();
                } catch (error) {
                    alert('Error clearing cache: ' + error.message);
                }
            }
            
            async function exportAllCSS() {
                try {
                    const response = await axios.get('/api/admin/custom-css/export');
                    const blob = new Blob([response.data], { type: 'text/css' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'custom-styles-' + Date.now() + '.css';
                    a.click();
                } catch (error) {
                    alert('Error exporting CSS: ' + error.message);
                }
            }
            
            function showToast(message) {
                const toast = document.createElement('div');
                toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                toast.textContent = message;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            }
            
            // Close modal on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeStyleModal();
            });
            
            // Close modal on background click
            document.getElementById('styleModal').addEventListener('click', (e) => {
                if (e.target.id === 'styleModal') closeStyleModal();
            });
        </script>
    </body>
    </html>
  `
}
