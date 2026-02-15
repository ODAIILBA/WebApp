import { AdminSidebar } from './admin-sidebar'

export const AdminEmailTemplates = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>E-Mail-Vorlagen - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --gold: #d4af37;
        }
        .admin-sidebar {
          width: 280px;
          background: #1a2a4e;
          color: white;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 40;
        }
        .admin-nav-item {
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .admin-nav-item:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
        }
        .admin-nav-item.active {
          background: rgba(212, 175, 55, 0.2);
          color: #d4af37;
          border-left: 4px solid #d4af37;
        }
        .template-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          border: 2px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s;
        }
        .template-card:hover {
          border-color: var(--gold);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
        }
        .template-card.active {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.05);
        }
        .editor-container {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          z-index: 50;
          padding: 20px;
        }
        .editor-container.active {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .editor-panel {
          background: white;
          border-radius: 12px;
          width: 95%;
          max-width: 1800px;
          height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .editor-header {
          background: var(--navy-dark);
          color: white;
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .editor-body {
          flex: 1;
          display: flex;
          overflow: hidden;
        }
        .code-editor {
          flex: 1;
          display: flex;
          flex-direction: column;
          border-right: 2px solid #e5e7eb;
        }
        .preview-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #f5f7fa;
        }
        .editor-toolbar {
          background: #f8f9fa;
          padding: 15px 20px;
          border-bottom: 2px solid #e5e7eb;
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .editor-content {
          flex: 1;
          overflow: auto;
        }
        .code-textarea {
          width: 100%;
          height: 100%;
          padding: 20px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
          line-height: 1.6;
          border: none;
          resize: none;
          background: #1e1e1e;
          color: #d4d4d4;
        }
        .code-textarea:focus {
          outline: none;
        }
        .preview-frame {
          width: 100%;
          height: 100%;
          border: none;
          background: white;
        }
        .variable-tag {
          display: inline-block;
          background: rgba(212, 175, 55, 0.1);
          color: var(--navy-dark);
          padding: 4px 10px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
          margin: 2px;
          cursor: pointer;
          border: 1px solid var(--gold);
        }
        .variable-tag:hover {
          background: rgba(212, 175, 55, 0.2);
        }
        .btn-editor {
          padding: 8px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .btn-save {
          background: var(--gold);
          color: var(--navy-dark);
        }
        .btn-save:hover {
          background: #c19b2d;
        }
        .btn-close {
          background: #6b7280;
          color: white;
        }
        .btn-close:hover {
          background: #4b5563;
        }
        .btn-preview {
          background: #3b82f6;
          color: white;
        }
        .btn-preview:hover {
          background: #2563eb;
        }
        .info-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        .badge-active {
          background: #d1fae5;
          color: #059669;
        }
        .badge-inactive {
          background: #fee2e2;
          color: #dc2626;
        }
      </style>
    </head>
    <body class="bg-gray-100">
      <div class="flex min-h-screen">
        ${AdminSidebar('/admin/email-templates')}
        
        <div class="flex-1 ml-64 p-8">
          <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="flex justify-between items-center mb-8">
              <div>
                <h1 class="text-3xl font-bold" style="color: var(--navy-dark)">
                  <i class="fas fa-envelope mr-3"></i>
                  E-Mail-Vorlagen verwalten
                </h1>
                <p class="text-gray-600 mt-2">Bearbeiten Sie E-Mail-Vorlagen mit Live-Vorschau</p>
              </div>
            </div>
            
            <!-- Templates List -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="templates-list">
              <!-- Templates will be loaded here -->
            </div>
          </div>
        </div>
      </div>
      
      <!-- Editor Modal -->
      <div id="editor-modal" class="editor-container">
        <div class="editor-panel">
          <div class="editor-header">
            <div>
              <h2 id="editor-title" class="text-2xl font-bold mb-1">Template bearbeiten</h2>
              <p id="editor-description" class="text-sm text-gray-300"></p>
            </div>
            <div class="flex gap-3">
              <button onclick="updatePreview()" class="btn-editor btn-preview">
                <i class="fas fa-eye mr-2"></i>Vorschau aktualisieren
              </button>
              <button onclick="saveTemplate()" class="btn-editor btn-save">
                <i class="fas fa-save mr-2"></i>Speichern
              </button>
              <button onclick="closeEditor()" class="btn-editor btn-close">
                <i class="fas fa-times mr-2"></i>Schließen
              </button>
            </div>
          </div>
          
          <div class="editor-body">
            <!-- Left: Code Editor -->
            <div class="code-editor">
              <div class="editor-toolbar">
                <div class="flex-1">
                  <label class="text-sm font-semibold text-gray-700 mr-3">Betreff:</label>
                  <input type="text" id="template-subject" class="px-3 py-2 border-2 border-gray-300 rounded-lg w-96" placeholder="E-Mail-Betreff">
                </div>
              </div>
              
              <div class="editor-toolbar" style="border-top: 1px solid #e5e7eb;">
                <label class="text-sm font-semibold text-gray-700">Verfügbare Variablen:</label>
                <div id="variables-list" class="flex flex-wrap gap-2">
                  <!-- Variables will be loaded here -->
                </div>
              </div>
              
              <div class="editor-content">
                <textarea id="html-editor" class="code-textarea" placeholder="HTML-Code hier eingeben..."></textarea>
              </div>
            </div>
            
            <!-- Right: Live Preview -->
            <div class="preview-panel">
              <div class="editor-toolbar">
                <h3 class="text-lg font-bold" style="color: var(--navy-dark)">
                  <i class="fas fa-desktop mr-2"></i>Live-Vorschau
                </h3>
              </div>
              <div class="editor-content">
                <iframe id="preview-iframe" class="preview-frame"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        let currentTemplate = null;
        let templates = [];
        
        // Load all templates
        async function loadTemplates() {
          try {
            const response = await axios.get('/api/admin/email-templates');
            if (response.data.success) {
              templates = response.data.data;
              renderTemplates();
            }
          } catch (error) {
            console.error('Error loading templates:', error);
            alert('Fehler beim Laden der Vorlagen');
          }
        }
        
        // Render templates list
        function renderTemplates() {
          const container = document.getElementById('templates-list');
          container.innerHTML = templates.map(template => \`
            <div class="template-card" onclick="editTemplate('\${template.template_key}')">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="text-xl font-bold" style="color: var(--navy-dark)">
                    \${getTemplateIcon(template.template_key)} \${template.template_name}
                  </h3>
                  <p class="text-sm text-gray-600 mt-1">\${template.description}</p>
                </div>
                <span class="info-badge \${template.is_active ? 'badge-active' : 'badge-inactive'}">
                  \${template.is_active ? 'Aktiv' : 'Inaktiv'}
                </span>
              </div>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <div>
                  <i class="fas fa-envelope mr-2"></i>
                  Betreff: \${template.subject.substring(0, 50)}...
                </div>
                <div>
                  <i class="fas fa-code mr-2"></i>
                  \${(template.html_content.length / 1000).toFixed(1)}KB
                </div>
              </div>
            </div>
          \`).join('');
        }
        
        // Get template icon
        function getTemplateIcon(key) {
          const icons = {
            'order_confirmation': '🎉',
            'license_delivery': '🔑',
            'password_reset': '🔒',
            'welcome': '👋'
          };
          return icons[key] || '📧';
        }
        
        // Edit template
        function editTemplate(templateKey) {
          currentTemplate = templates.find(t => t.template_key === templateKey);
          if (!currentTemplate) return;
          
          // Set editor content
          document.getElementById('editor-title').textContent = currentTemplate.template_name;
          document.getElementById('editor-description').textContent = currentTemplate.description;
          document.getElementById('template-subject').value = currentTemplate.subject;
          document.getElementById('html-editor').value = currentTemplate.html_content;
          
          // Render variables
          const variables = currentTemplate.variables ? currentTemplate.variables.split(', ') : [];
          document.getElementById('variables-list').innerHTML = variables.map(v => 
            \`<span class="variable-tag" onclick="insertVariable('\${v}')" title="Klicken zum Einfügen">\${v}</span>\`
          ).join('');
          
          // Show editor
          document.getElementById('editor-modal').classList.add('active');
          
          // Initial preview
          updatePreview();
        }
        
        // Insert variable at cursor
        function insertVariable(variable) {
          const editor = document.getElementById('html-editor');
          const start = editor.selectionStart;
          const end = editor.selectionEnd;
          const text = editor.value;
          const before = text.substring(0, start);
          const after = text.substring(end);
          editor.value = before + variable + after;
          editor.selectionStart = editor.selectionEnd = start + variable.length;
          editor.focus();
          updatePreview();
        }
        
        // Update preview
        function updatePreview() {
          const htmlContent = document.getElementById('html-editor').value;
          const iframe = document.getElementById('preview-iframe');
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          
          // Replace variables with sample data
          let previewHtml = htmlContent
            .replace(/{{customer_name}}/g, 'Max Mustermann')
            .replace(/{{order_number}}/g, 'ORD-2024-001')
            .replace(/{{order_date}}/g, new Date().toLocaleDateString('de-DE'))
            .replace(/{{order_status}}/g, 'Bestätigt')
            .replace(/{{total_amount}}/g, '149.99')
            .replace(/{{order_link}}/g, '#')
            .replace(/{{shop_link}}/g, '#')
            .replace(/{{reset_link}}/g, '#')
            .replace(/{{ip_address}}/g, '192.168.1.1')
            .replace(/{{request_time}}/g, new Date().toLocaleString('de-DE'))
            .replace(/{{order_items}}/g, '<div class="product-item"><strong>Windows 11 Pro</strong> - 1x 89.99€</div>')
            .replace(/{{license_items}}/g, '<div class="license-box"><div class="product-name">Windows 11 Pro</div><div class="license-key">XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</div></div>');
          
          iframeDoc.open();
          iframeDoc.write(previewHtml);
          iframeDoc.close();
        }
        
        // Save template
        async function saveTemplate() {
          if (!currentTemplate) return;
          
          const subject = document.getElementById('template-subject').value;
          const htmlContent = document.getElementById('html-editor').value;
          
          if (!subject || !htmlContent) {
            alert('Bitte füllen Sie alle Felder aus');
            return;
          }
          
          try {
            const response = await axios.put(\`/api/admin/email-templates/\${currentTemplate.template_key}\`, {
              subject,
              html_content: htmlContent
            });
            
            if (response.data.success) {
              alert('Vorlage erfolgreich gespeichert!');
              closeEditor();
              loadTemplates();
            }
          } catch (error) {
            console.error('Error saving template:', error);
            alert('Fehler beim Speichern: ' + (error.response?.data?.error || 'Unbekannter Fehler'));
          }
        }
        
        // Close editor
        function closeEditor() {
          document.getElementById('editor-modal').classList.remove('active');
          currentTemplate = null;
        }
        
        // Auto-update preview on typing (debounced)
        let previewTimeout;
        document.addEventListener('DOMContentLoaded', () => {
          loadTemplates();
          
          const editor = document.getElementById('html-editor');
          editor.addEventListener('input', () => {
            clearTimeout(previewTimeout);
            previewTimeout = setTimeout(updatePreview, 500);
          });
          
          // Close editor on Escape
          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeEditor();
          });
        });
      </script>
    </body>
    </html>
  `
}
