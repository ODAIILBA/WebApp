export const AdminFooterSettings = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Footer-Einstellungen - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --gold: #d4af37;
        }
        .section-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .link-item {
          background: #f9fafb;
          padding: 12px;
          margin-bottom: 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
      </style>
    </head>
    <body class="bg-gray-100">
      <div class="flex min-h-screen">
        ${AdminSidebar('/admin/footer')}
        
        <div class="flex-1 ml-64 p-8">
          <div class="max-w-6xl mx-auto">
            <div class="flex justify-between items-center mb-8">
              <h1 class="text-3xl font-bold" style="color: var(--navy-dark)">
                <i class="fas fa-shoe-prints mr-3"></i>
                Footer-Einstellungen
              </h1>
              <button onclick="saveAll()" class="px-6 py-2 rounded-lg text-white font-semibold" style="background: var(--gold)">
                <i class="fas fa-save mr-2"></i>Alle speichern
              </button>
            </div>
            
            <div id="sections-container">
              <div class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl" style="color: var(--gold)"></i>
                <p class="mt-4 text-gray-600">Lade Footer-Einstellungen...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        let sections = [];
        
        async function loadSections() {
          try {
            const response = await axios.get('/api/admin/footer-settings');
            sections = response.data.data || [];
            renderSections();
          } catch (error) {
            console.error('Error loading sections:', error);
            alert('Fehler beim Laden der Footer-Einstellungen');
          }
        }
        
        function renderSections() {
          const container = document.getElementById('sections-container');
          if (sections.length === 0) {
            container.innerHTML = '<div class="section-card text-center py-12"><p class="text-gray-600">Keine Footer-Sektionen gefunden</p></div>';
            return;
          }
          
          container.innerHTML = sections.map(section => {
            const links = section.links ? JSON.parse(section.links) : [];
            return \`
              <div class="section-card">
                <div class="flex justify-between items-start mb-4">
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Sektion Titel</label>
                    <input 
                      type="text" 
                      value="\${section.section_title}" 
                      onchange="updateSection(\${section.id}, 'section_title', this.value)"
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div class="ml-4">
                    <label class="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        \${section.is_active ? 'checked' : ''}
                        onchange="updateSection(\${section.id}, 'is_active', this.checked ? 1 : 0)"
                        class="w-4 h-4"
                      />
                      <span class="text-sm">Aktiv</span>
                    </label>
                  </div>
                </div>
                
                \${section.content ? \`
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Beschreibung</label>
                    <textarea 
                      onchange="updateSection(\${section.id}, 'content', this.value)"
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="2"
                    >\${section.content}</textarea>
                  </div>
                \` : ''}
                
                \${links.length > 0 ? \`
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Links</label>
                    \${links.map((link, idx) => \`
                      <div class="link-item">
                        \${link.icon ? \`<i class="fas fa-\${link.icon} text-gray-400"></i>\` : ''}
                        <input 
                          type="text" 
                          value="\${link.text}" 
                          onchange="updateLink(\${section.id}, \${idx}, 'text', this.value)"
                          class="flex-1 px-3 py-1 border rounded"
                          placeholder="Link Text"
                        />
                        <input 
                          type="text" 
                          value="\${link.url || ''}" 
                          onchange="updateLink(\${section.id}, \${idx}, 'url', this.value)"
                          class="flex-1 px-3 py-1 border rounded"
                          placeholder="URL"
                        />
                      </div>
                    \`).join('')}
                  </div>
                \` : ''}
              </div>
            \`;
          }).join('');
        }
        
        function updateSection(id, field, value) {
          const section = sections.find(s => s.id === id);
          if (section) {
            section[field] = value;
          }
        }
        
        function updateLink(sectionId, linkIndex, field, value) {
          const section = sections.find(s => s.id === sectionId);
          if (section && section.links) {
            const links = JSON.parse(section.links);
            if (links[linkIndex]) {
              links[linkIndex][field] = value;
              section.links = JSON.stringify(links);
            }
          }
        }
        
        async function saveAll() {
          try {
            for (const section of sections) {
              await axios.patch(\`/api/admin/footer-settings/\${section.id}\`, section);
            }
            alert('Alle Änderungen gespeichert!');
          } catch (error) {
            console.error('Error saving:', error);
            alert('Fehler beim Speichern');
          }
        }
        
        // Load on page load
        loadSections();
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
