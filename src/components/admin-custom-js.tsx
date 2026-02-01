import { html } from 'hono/html'

export function AdminCustomJS() {
  return html`<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom JavaScript verwalten - Admin Panel</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
        :root {
            --navy-ultra-dark: #0a1628;
            --navy-dark: #1a2a4e;
            --navy-medium: #2d3e6f;
            --navy-light: #435991;
            --gold: #d4af37;
            --gold-light: #e8c966;
            --gold-dark: #b8941f;
        }

        body {
            background: linear-gradient(135deg, var(--navy-ultra-dark) 0%, var(--navy-dark) 100%);
            min-height: 100vh;
        }

        .admin-sidebar {
            background: rgba(26, 42, 78, 0.95);
            backdrop-filter: blur(10px);
        }

        .code-editor {
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 14px;
            line-height: 1.6;
            background: #1e1e1e;
            color: #d4d4d4;
            border-radius: 8px;
            padding: 16px;
            min-height: 400px;
            resize: vertical;
            tab-size: 2;
        }

        .code-editor::placeholder {
            color: #6a737d;
        }

        .preview-panel {
            background: #fff;
            border-radius: 8px;
            padding: 20px;
            min-height: 300px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .js-line-numbers {
            color: #858585;
            user-select: none;
            margin-right: 12px;
            font-family: monospace;
            text-align: right;
            padding-right: 8px;
            border-right: 1px solid #3e3e3e;
        }

        .syntax-comment { color: #6a9955; }
        .syntax-string { color: #ce9178; }
        .syntax-keyword { color: #569cd6; }
        .syntax-function { color: #dcdcaa; }
        .syntax-number { color: #b5cea8; }

        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .animate-slideIn {
            animation: slideIn 0.3s ease;
        }
    </style>
</head>
<body class="font-sans">
    <!-- Admin Sidebar -->
    <div class="admin-sidebar fixed left-0 top-0 w-64 h-full p-6 overflow-y-auto z-40">
        <div class="mb-8">
            <h1 class="text-2xl font-bold text-gold mb-2">
                <i class="fas fa-cog mr-2"></i>
                Admin Panel
            </h1>
            <p class="text-gray-300 text-sm">SOFTWAREKING24</p>
        </div>

        <nav class="space-y-2">
            <a href="/admin" class="flex items-center px-4 py-3 text-gray-300 hover:bg-navy-medium hover:text-white rounded-lg transition">
                <i class="fas fa-dashboard w-5"></i>
                <span class="ml-3">Dashboard</span>
            </a>
            <a href="/admin/products" class="flex items-center px-4 py-3 text-gray-300 hover:bg-navy-medium hover:text-white rounded-lg transition">
                <i class="fas fa-box w-5"></i>
                <span class="ml-3">Produkte</span>
            </a>
            <a href="/admin/homepage/slider" class="flex items-center px-4 py-3 text-gray-300 hover:bg-navy-medium hover:text-white rounded-lg transition">
                <i class="fas fa-images w-5"></i>
                <span class="ml-3">Hero Slider</span>
            </a>
            <a href="/admin/custom-css" class="flex items-center px-4 py-3 text-gray-300 hover:bg-navy-medium hover:text-white rounded-lg transition">
                <i class="fas fa-palette w-5"></i>
                <span class="ml-3">Custom CSS</span>
            </a>
            <a href="/admin/custom-js" class="flex items-center px-4 py-3 bg-navy-medium text-white rounded-lg">
                <i class="fas fa-code w-5"></i>
                <span class="ml-3">Custom JS</span>
            </a>
        </nav>
    </div>

    <!-- Main Content -->
    <div class="ml-64 p-8">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-4xl font-bold text-white mb-2">
                            <i class="fas fa-code text-gold mr-3"></i>
                            Custom JavaScript verwalten
                        </h1>
                        <p class="text-gray-300">Fügen Sie benutzerdefiniertes JavaScript hinzu: Analytics, Widgets, Tracking & mehr</p>
                    </div>
                    <button onclick="showAddJSModal()" class="bg-gold hover:bg-gold-light text-navy-dark font-bold px-6 py-3 rounded-lg transition shadow-lg">
                        <i class="fas fa-plus mr-2"></i>
                        Neues JS hinzufügen
                    </button>
                </div>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" id="stats-cards">
                <div class="bg-navy-dark p-6 rounded-lg border border-navy-light">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Gesamt Scripts</p>
                            <p class="text-3xl font-bold text-white" id="total-scripts">0</p>
                        </div>
                        <div class="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-code text-gold text-xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-navy-dark p-6 rounded-lg border border-navy-light">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Aktive Scripts</p>
                            <p class="text-3xl font-bold text-green-400" id="active-scripts">0</p>
                        </div>
                        <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-check-circle text-green-400 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-navy-dark p-6 rounded-lg border border-navy-light">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Header Scripts</p>
                            <p class="text-3xl font-bold text-blue-400" id="header-scripts">0</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-arrow-up text-blue-400 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-navy-dark p-6 rounded-lg border border-navy-light">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Footer Scripts</p>
                            <p class="text-3xl font-bold text-purple-400" id="footer-scripts">0</p>
                        </div>
                        <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-arrow-down text-purple-400 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- JS Scripts List -->
            <div class="bg-navy-dark rounded-lg border border-navy-light overflow-hidden">
                <div class="p-6 border-b border-navy-light">
                    <h2 class="text-xl font-bold text-white">
                        <i class="fas fa-list mr-2"></i>
                        JavaScript Snippets
                    </h2>
                </div>

                <div id="js-list" class="divide-y divide-navy-light">
                    <!-- JS scripts will be loaded here -->
                    <div class="p-8 text-center text-gray-400">
                        <i class="fas fa-spinner fa-spin text-3xl mb-3"></i>
                        <p>Lade JavaScript Snippets...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit JS Modal -->
    <div id="js-modal" class="fixed inset-0 bg-black/70 backdrop-blur-sm hidden z-50 overflow-y-auto">
        <div class="min-h-screen flex items-center justify-center p-4">
            <div class="bg-navy-dark rounded-lg shadow-2xl max-w-6xl w-full border border-navy-light">
                <div class="p-6 border-b border-navy-light flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-white">
                        <i class="fas fa-code mr-2 text-gold"></i>
                        <span id="modal-title">Neues JavaScript hinzufügen</span>
                    </h2>
                    <button onclick="closeJSModal()" class="text-gray-400 hover:text-white transition">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>

                <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Left: Editor -->
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                            <input type="text" id="js-name" class="w-full px-4 py-2 bg-navy-ultra-dark border border-navy-light rounded-lg text-white focus:border-gold focus:outline-none" placeholder="z.B. Google Analytics Tracking">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Beschreibung</label>
                            <input type="text" id="js-description" class="w-full px-4 py-2 bg-navy-ultra-dark border border-navy-light rounded-lg text-white focus:border-gold focus:outline-none" placeholder="Was macht dieses Script?">
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Platzierung</label>
                                <select id="js-placement" class="w-full px-4 py-2 bg-navy-ultra-dark border border-navy-light rounded-lg text-white focus:border-gold focus:outline-none">
                                    <option value="header">Header (vor </head>)</option>
                                    <option value="footer" selected>Footer (vor </body>)</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Ausführung</label>
                                <select id="js-execution" class="w-full px-4 py-2 bg-navy-ultra-dark border border-navy-light rounded-lg text-white focus:border-gold focus:outline-none">
                                    <option value="immediate">Sofort</option>
                                    <option value="domready">DOMContentLoaded</option>
                                    <option value="load">Window Load</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Priorität (1-100)</label>
                                <input type="number" id="js-priority" min="1" max="100" value="50" class="w-full px-4 py-2 bg-navy-ultra-dark border border-navy-light rounded-lg text-white focus:border-gold focus:outline-none">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
                                <label class="flex items-center cursor-pointer">
                                    <input type="checkbox" id="js-active" checked class="sr-only peer">
                                    <div class="relative w-14 h-7 bg-gray-700 rounded-full peer peer-checked:bg-green-500 transition">
                                        <div class="absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition peer-checked:translate-x-7"></div>
                                    </div>
                                    <span class="ml-3 text-sm text-gray-300">Aktiv</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                JavaScript Code *
                                <span class="text-xs text-gray-500 ml-2">(ohne &lt;script&gt; Tags)</span>
                            </label>
                            <textarea id="js-code" class="code-editor w-full" rows="15" placeholder="// Ihr JavaScript Code hier...
console.log('Hello World!');"></textarea>
                        </div>

                        <!-- Template Buttons -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Vorlagen:</label>
                            <div class="flex flex-wrap gap-2">
                                <button onclick="loadTemplate('analytics')" class="px-3 py-1 bg-navy-medium hover:bg-navy-light text-sm text-white rounded transition">
                                    <i class="fas fa-chart-line mr-1"></i> Analytics
                                </button>
                                <button onclick="loadTemplate('notification')" class="px-3 py-1 bg-navy-medium hover:bg-navy-light text-sm text-white rounded transition">
                                    <i class="fas fa-bell mr-1"></i> Benachrichtigung
                                </button>
                                <button onclick="loadTemplate('modal')" class="px-3 py-1 bg-navy-medium hover:bg-navy-light text-sm text-white rounded transition">
                                    <i class="fas fa-window-maximize mr-1"></i> Modal
                                </button>
                                <button onclick="loadTemplate('scroll')" class="px-3 py-1 bg-navy-medium hover:bg-navy-light text-sm text-white rounded transition">
                                    <i class="fas fa-arrows-alt-v mr-1"></i> Scroll Effect
                                </button>
                                <button onclick="loadTemplate('form')" class="px-3 py-1 bg-navy-medium hover:bg-navy-light text-sm text-white rounded transition">
                                    <i class="fas fa-wpforms mr-1"></i> Form Handler
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Preview -->
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-eye mr-1"></i>
                                Live Vorschau
                            </label>
                            <div class="preview-panel">
                                <div class="text-center py-8">
                                    <i class="fas fa-desktop text-navy-dark text-5xl mb-4"></i>
                                    <h3 class="text-xl font-bold text-navy-dark mb-2">JavaScript Vorschau</h3>
                                    <p class="text-gray-600 mb-4">Test-Bereich für Ihr JavaScript</p>
                                    
                                    <button onclick="testJS()" class="bg-gold hover:bg-gold-light text-navy-dark font-bold px-6 py-2 rounded-lg transition shadow">
                                        <i class="fas fa-play mr-2"></i>
                                        Code testen
                                    </button>

                                    <div id="preview-output" class="mt-6 p-4 bg-gray-100 rounded-lg text-left hidden">
                                        <h4 class="font-bold text-sm text-navy-dark mb-2">Console Output:</h4>
                                        <pre id="console-output" class="text-xs text-gray-700 font-mono"></pre>
                                    </div>
                                </div>

                                <!-- Test Elements -->
                                <div id="test-elements" class="space-y-4 hidden">
                                    <button class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Test Button</button>
                                    <input type="text" placeholder="Test Input" class="w-full px-4 py-2 border rounded">
                                    <div class="p-4 bg-gray-100 rounded">Test Element</div>
                                </div>
                            </div>
                        </div>

                        <!-- Info Box -->
                        <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <h4 class="font-bold text-blue-400 mb-2">
                                <i class="fas fa-info-circle mr-2"></i>
                                Tipps:
                            </h4>
                            <ul class="text-sm text-gray-300 space-y-1">
                                <li>• <strong>Header:</strong> Lädt vor Seiteninhalt (Analytics, Meta-Tags)</li>
                                <li>• <strong>Footer:</strong> Lädt nach Seiteninhalt (UI-Widgets, Tracking)</li>
                                <li>• <strong>Sofort:</strong> Wird direkt ausgeführt</li>
                                <li>• <strong>DOMReady:</strong> Wartet auf HTML-Parsing</li>
                                <li>• <strong>Load:</strong> Wartet auf alle Ressourcen</li>
                                <li>• Keine &lt;script&gt; Tags nötig</li>
                                <li>• console.log() für Debugging verwenden</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="p-6 border-t border-navy-light flex justify-end gap-3">
                    <button onclick="closeJSModal()" class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition">
                        Abbrechen
                    </button>
                    <button onclick="saveJS()" class="px-6 py-2 bg-gold hover:bg-gold-light text-navy-dark font-bold rounded-lg transition">
                        <i class="fas fa-save mr-2"></i>
                        Speichern
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentEditId = null;
        const templates = {
            analytics: \`// Google Analytics 4
(function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
  console.log('✅ Google Analytics initialized');
})();\`,
            notification: \`// Toast Notification System
window.showNotification = function(message, type = 'success') {
  const toast = document.createElement('div');
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  };
  
  toast.className = \\\`fixed top-4 right-4 \\\${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50\\\`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 3000);
  console.log('✅ Notification shown:', message);
};\`,
            modal: \`// Simple Modal System
window.openModal = function(title, content) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
  modal.innerHTML = \\\`
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <h3 class="text-xl font-bold mb-4">\\\${title}</h3>
      <div class="mb-4">\\\${content}</div>
      <button onclick="this.closest('.fixed').remove()" class="bg-blue-500 text-white px-4 py-2 rounded">
        Schließen
      </button>
    </div>
  \\\`;
  document.body.appendChild(modal);
  console.log('✅ Modal opened:', title);
};\`,
            scroll: \`// Smooth Scroll to Top
document.addEventListener('DOMContentLoaded', function() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'fixed bottom-8 right-8 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg hidden hover:bg-blue-600 transition';
  scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(scrollBtn);
  
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('hidden', window.scrollY < 300);
  });
  
  console.log('✅ Scroll to top button initialized');
});\`,
            form: \`// Form Validation Helper
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = form.querySelectorAll('input[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('border-red-500');
          isValid = false;
        } else {
          input.classList.remove('border-red-500');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Bitte füllen Sie alle erforderlichen Felder aus.');
      }
    });
  });
  
  console.log('✅ Form validation initialized for', forms.length, 'forms');
});\`
        };

        // Load all JS scripts
        async function loadJSScripts() {
            try {
                const response = await axios.get('/api/admin/custom-js');
                if (response.data.success) {
                    const scripts = response.data.data;
                    updateStats(scripts);
                    renderJSList(scripts);
                }
            } catch (error) {
                console.error('Error loading JS scripts:', error);
                document.getElementById('js-list').innerHTML = \`
                    <div class="p-8 text-center text-red-400">
                        <i class="fas fa-exclamation-triangle text-3xl mb-3"></i>
                        <p>Fehler beim Laden der Scripte</p>
                    </div>
                \`;
            }
        }

        // Update stats cards
        function updateStats(scripts) {
            const total = scripts.length;
            const active = scripts.filter(s => s.is_active === 1).length;
            const header = scripts.filter(s => s.placement === 'header').length;
            const footer = scripts.filter(s => s.placement === 'footer').length;

            document.getElementById('total-scripts').textContent = total;
            document.getElementById('active-scripts').textContent = active;
            document.getElementById('header-scripts').textContent = header;
            document.getElementById('footer-scripts').textContent = footer;
        }

        // Render JS list
        function renderJSList(scripts) {
            const container = document.getElementById('js-list');
            
            if (scripts.length === 0) {
                container.innerHTML = \`
                    <div class="p-8 text-center text-gray-400">
                        <i class="fas fa-code text-5xl mb-4 text-gray-600"></i>
                        <p class="text-lg mb-2">Keine JavaScript Snippets gefunden</p>
                        <p class="text-sm">Klicken Sie auf "Neues JS hinzufügen" um zu starten</p>
                    </div>
                \`;
                return;
            }

            container.innerHTML = scripts.map(script => \`
                <div class="p-6 hover:bg-navy-medium/30 transition">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-2">
                                <h3 class="text-lg font-bold text-white">\${script.name}</h3>
                                <span class="px-2 py-1 text-xs rounded \${script.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}">
                                    <i class="fas fa-\${script.is_active ? 'check-circle' : 'times-circle'} mr-1"></i>
                                    \${script.is_active ? 'Aktiv' : 'Inaktiv'}
                                </span>
                                <span class="px-2 py-1 text-xs rounded \${script.placement === 'header' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}">
                                    <i class="fas fa-arrow-\${script.placement === 'header' ? 'up' : 'down'} mr-1"></i>
                                    \${script.placement === 'header' ? 'Header' : 'Footer'}
                                </span>
                                <span class="px-2 py-1 text-xs rounded bg-gold/20 text-gold">
                                    Priorität: \${script.priority}
                                </span>
                                <span class="px-2 py-1 text-xs rounded bg-indigo-500/20 text-indigo-400">
                                    \${script.execution_type}
                                </span>
                            </div>
                            <p class="text-gray-400 text-sm mb-3">\${script.description || 'Keine Beschreibung'}</p>
                            <div class="bg-navy-ultra-dark rounded p-3">
                                <pre class="text-xs text-gray-400 overflow-x-auto">\${script.js_code.substring(0, 150)}\${script.js_code.length > 150 ? '...' : ''}</pre>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 ml-4">
                            <label class="relative inline-block w-12 h-6 cursor-pointer">
                                <input type="checkbox" \${script.is_active ? 'checked' : ''} onchange="toggleJS(\${script.id})" class="sr-only peer">
                                <div class="w-12 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 transition"></div>
                                <div class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-6"></div>
                            </label>
                            <button onclick="editJS(\${script.id})" class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteJS(\${script.id})" class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            \`).join('');
        }

        // Show add modal
        function showAddJSModal() {
            currentEditId = null;
            document.getElementById('modal-title').textContent = 'Neues JavaScript hinzufügen';
            document.getElementById('js-name').value = '';
            document.getElementById('js-description').value = '';
            document.getElementById('js-code').value = '';
            document.getElementById('js-placement').value = 'footer';
            document.getElementById('js-execution').value = 'immediate';
            document.getElementById('js-priority').value = '50';
            document.getElementById('js-active').checked = true;
            document.getElementById('js-modal').classList.remove('hidden');
        }

        // Edit JS
        async function editJS(id) {
            try {
                const response = await axios.get(\`/api/admin/custom-js/\${id}\`);
                if (response.data.success) {
                    const script = response.data.data;
                    currentEditId = id;
                    document.getElementById('modal-title').textContent = 'JavaScript bearbeiten';
                    document.getElementById('js-name').value = script.name;
                    document.getElementById('js-description').value = script.description || '';
                    document.getElementById('js-code').value = script.js_code;
                    document.getElementById('js-placement').value = script.placement;
                    document.getElementById('js-execution').value = script.execution_type;
                    document.getElementById('js-priority').value = script.priority;
                    document.getElementById('js-active').checked = script.is_active === 1;
                    document.getElementById('js-modal').classList.remove('hidden');
                }
            } catch (error) {
                alert('Fehler beim Laden des Scripts');
            }
        }

        // Save JS
        async function saveJS() {
            const name = document.getElementById('js-name').value.trim();
            const code = document.getElementById('js-code').value.trim();

            if (!name || !code) {
                alert('Bitte Name und Code eingeben');
                return;
            }

            const data = {
                name,
                description: document.getElementById('js-description').value.trim(),
                js_code: code,
                placement: document.getElementById('js-placement').value,
                execution_type: document.getElementById('js-execution').value,
                priority: parseInt(document.getElementById('js-priority').value),
                is_active: document.getElementById('js-active').checked ? 1 : 0
            };

            try {
                if (currentEditId) {
                    await axios.put(\`/api/admin/custom-js/\${currentEditId}\`, data);
                } else {
                    await axios.post('/api/admin/custom-js', data);
                }
                closeJSModal();
                loadJSScripts();
            } catch (error) {
                alert('Fehler beim Speichern');
            }
        }

        // Toggle JS active status
        async function toggleJS(id) {
            try {
                await axios.patch(\`/api/admin/custom-js/\${id}/toggle\`);
                loadJSScripts();
            } catch (error) {
                alert('Fehler beim Umschalten');
            }
        }

        // Delete JS
        async function deleteJS(id) {
            if (!confirm('Wirklich löschen?')) return;
            
            try {
                await axios.delete(\`/api/admin/custom-js/\${id}\`);
                loadJSScripts();
            } catch (error) {
                alert('Fehler beim Löschen');
            }
        }

        // Close modal
        function closeJSModal() {
            document.getElementById('js-modal').classList.add('hidden');
        }

        // Load template
        function loadTemplate(type) {
            if (templates[type]) {
                document.getElementById('js-code').value = templates[type];
            }
        }

        // Test JS
        function testJS() {
            const code = document.getElementById('js-code').value.trim();
            if (!code) {
                alert('Bitte Code eingeben');
                return;
            }

            const output = document.getElementById('preview-output');
            const consoleOutput = document.getElementById('console-output');
            output.classList.remove('hidden');

            // Capture console.log
            const logs = [];
            const originalLog = console.log;
            console.log = function(...args) {
                logs.push(args.join(' '));
                originalLog.apply(console, args);
            };

            try {
                eval(code);
                consoleOutput.textContent = logs.length > 0 ? logs.join('\\n') : '✅ Code executed successfully (no console output)';
                consoleOutput.className = 'text-xs text-green-700 font-mono';
            } catch (error) {
                consoleOutput.textContent = '❌ Error: ' + error.message;
                consoleOutput.className = 'text-xs text-red-700 font-mono';
            } finally {
                console.log = originalLog;
            }
        }

        // Load on page load
        loadJSScripts();
    </script>
</body>
</html>`
}
