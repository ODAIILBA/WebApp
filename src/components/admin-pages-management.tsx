export const AdminPagesManagement = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Seiten verwalten - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <!-- TinyMCE Editor -->
      <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js"></script>
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --gold: #d4af37;
        }
        .page-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.2s;
        }
        .page-card:hover {
          shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
      </style>
    </head>
    <body class="bg-gray-100">
      <div class="flex min-h-screen">
        ${AdminSidebar('/admin/pages')}
        
        <div class="flex-1 ml-64 p-8">
          <div class="max-w-6xl mx-auto">
            <div class="flex justify-between items-center mb-8">
              <h1 class="text-3xl font-bold" style="color: var(--navy-dark)">
                <i class="fas fa-file-alt mr-3"></i>
                Seiten verwalten
              </h1>
              <button onclick="showCreateModal()" class="px-6 py-2 rounded-lg text-white font-semibold" style="background: var(--gold)">
                <i class="fas fa-plus mr-2"></i>Neue Seite
              </button>
            </div>
            
            <div id="pages-container">
              <div class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl" style="color: var(--gold)"></i>
                <p class="mt-4 text-gray-600">Lade Seiten...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Edit Modal -->
      <div id="editModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" style="display: none;">
        <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
          <div class="p-6 border-b flex justify-between items-center">
            <h2 class="text-2xl font-bold" style="color: var(--navy-dark)">Seite bearbeiten</h2>
            <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div class="p-6">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Titel</label>
              <input 
                type="text" 
                id="pageTitle" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
              <input 
                type="text" 
                id="pageSlug" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Inhalt</label>
              <textarea id="pageContent" rows="12"></textarea>
            </div>
            
            <div class="mb-4">
              <label class="flex items-center gap-2">
                <input type="checkbox" id="pageActive" class="w-4 h-4" />
                <span class="text-sm font-medium">Seite veröffentlichen</span>
              </label>
            </div>
            
            <div class="flex gap-4">
              <button onclick="savePage()" class="flex-1 px-6 py-3 rounded-lg text-white font-semibold" style="background: var(--gold)">
                <i class="fas fa-save mr-2"></i>Speichern
              </button>
              <button onclick="closeModal()" class="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        let pages = [];
        let currentPage = null;
        let editor = null;
        
        async function loadPages() {
          try {
            const response = await axios.get('/api/admin/pages');
            pages = response.data.data || [];
            renderPages();
          } catch (error) {
            console.error('Error loading pages:', error);
            document.getElementById('pages-container').innerHTML = 
              '<div class="page-card text-center py-12"><p class="text-red-600">Fehler beim Laden der Seiten</p></div>';
          }
        }
        
        function renderPages() {
          const container = document.getElementById('pages-container');
          if (pages.length === 0) {
            container.innerHTML = '<div class="page-card text-center py-12"><p class="text-gray-600">Keine Seiten gefunden</p></div>';
            return;
          }
          
          container.innerHTML = pages.map(page => \`
            <div class="page-card">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-2" style="color: var(--navy-dark)">\${page.title}</h3>
                  <p class="text-sm text-gray-600 mb-2">
                    <i class="fas fa-link mr-2"></i>
                    <a href="/\${page.slug}" target="_blank" class="hover:underline">/\${page.slug}</a>
                  </p>
                  <div class="flex gap-2 text-sm">
                    <span class="px-2 py-1 rounded \${page.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
                      \${page.is_active ? '<i class="fas fa-check mr-1"></i>Aktiv' : '<i class="fas fa-times mr-1"></i>Inaktiv'}
                    </span>
                    <span class="px-2 py-1 rounded bg-blue-100 text-blue-700">
                      \${page.page_type}
                    </span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button onclick="editPage(\${page.id})" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                    <i class="fas fa-edit"></i> Bearbeiten
                  </button>
                  <button onclick="deletePage(\${page.id})" class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          \`).join('');
        }
        
        function initEditor() {
          if (editor) {
            editor.remove();
          }
          tinymce.init({
            selector: '#pageContent',
            height: 400,
            menubar: false,
            plugins: ['lists', 'link', 'image', 'code'],
            toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code',
            setup: (ed) => {
              editor = ed;
            }
          });
        }
        
        async function editPage(id) {
          try {
            const response = await axios.get(\`/api/admin/pages/\${id}\`);
            currentPage = response.data.data;
            
            document.getElementById('pageTitle').value = currentPage.title || '';
            document.getElementById('pageSlug').value = currentPage.slug || '';
            document.getElementById('pageActive').checked = currentPage.is_active === 1;
            
            document.getElementById('editModal').style.display = 'flex';
            
            setTimeout(() => {
              initEditor();
              if (editor) {
                editor.setContent(currentPage.content || '');
              } else {
                document.getElementById('pageContent').value = currentPage.content || '';
              }
            }, 100);
          } catch (error) {
            console.error('Error loading page:', error);
            alert('Fehler beim Laden der Seite');
          }
        }
        
        function showCreateModal() {
          currentPage = { id: null, slug: '', title: '', content: '', is_active: 1 };
          document.getElementById('pageTitle').value = '';
          document.getElementById('pageSlug').value = '';
          document.getElementById('pageActive').checked = true;
          document.getElementById('editModal').style.display = 'flex';
          
          setTimeout(() => {
            initEditor();
            if (editor) {
              editor.setContent('');
            } else {
              document.getElementById('pageContent').value = '';
            }
          }, 100);
        }
        
        function closeModal() {
          document.getElementById('editModal').style.display = 'none';
          if (editor) {
            editor.remove();
            editor = null;
          }
        }
        
        async function savePage() {
          const title = document.getElementById('pageTitle').value;
          const slug = document.getElementById('pageSlug').value;
          const isActive = document.getElementById('pageActive').checked ? 1 : 0;
          const content = editor ? editor.getContent() : document.getElementById('pageContent').value;
          
          if (!title || !slug) {
            alert('Bitte Titel und Slug eingeben');
            return;
          }
          
          try {
            if (currentPage.id) {
              await axios.patch(\`/api/admin/pages/\${currentPage.id}\`, {
                title, slug, content, is_active: isActive
              });
            } else {
              await axios.post('/api/admin/pages', {
                title, slug, content, is_active: isActive, page_type: 'cms'
              });
            }
            
            closeModal();
            loadPages();
            alert('Seite gespeichert!');
          } catch (error) {
            console.error('Error saving page:', error);
            alert('Fehler beim Speichern');
          }
        }
        
        async function deletePage(id) {
          if (!confirm('Möchten Sie diese Seite wirklich löschen?')) return;
          
          try {
            await axios.delete(\`/api/admin/pages/\${id}\`);
            loadPages();
            alert('Seite gelöscht!');
          } catch (error) {
            console.error('Error deleting page:', error);
            alert('Fehler beim Löschen');
          }
        }
        
        loadPages();
      </script>
    </body>
    </html>
  `;
};

function AdminSidebar(currentPath: string) {
  const menuItems = [
    { path: '/admin', icon: 'tachometer-alt', label: 'Dashboard' },
    { path: '/admin/products', icon: 'box', label: 'Produkte' },
    { path: '/admin/orders', icon: 'shopping-cart', label: 'Bestellungen' },
    { path: '/admin/customers', icon: 'users', label: 'Kunden' },
    { path: '/admin/sliders', icon: 'images', label: 'Slider' },
    { path: '/admin/homepage-sections', icon: 'th-large', label: 'Homepage' },
    { path: '/admin/pages', icon: 'file-alt', label: 'Seiten' },
    { path: '/admin/footer', icon: 'shoe-prints', label: 'Footer' },
    { path: '/admin/contact-messages', icon: 'envelope', label: 'Kontakt' },
    { path: '/admin/licenses', icon: 'key', label: 'Lizenzen' },
  ];

  return `
    <div class="admin-sidebar">
      <div class="p-6 border-b border-gray-700">
        <h2 class="text-xl font-bold" style="color: var(--gold)">SOFTWAREKING24</h2>
        <p class="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>
      <nav class="p-4">
        ${menuItems.map(item => `
          <a href="${item.path}" class="admin-nav-item ${currentPath === item.path ? 'active' : ''}">
            <i class="fas fa-${item.icon}"></i>
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
    </div>
  `;
}
