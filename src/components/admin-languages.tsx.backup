import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export default function AdminLanguages() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sprachen - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <style>
        .stat-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .badge-active {
          background: #10b981;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .badge-inactive {
          background: #6b7280;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .badge-default {
          background: #3b82f6;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          margin-left: 0.5rem;
        }
        
        .language-flag {
          font-size: 2rem;
        }
      </style>
    </head>
    <body class="bg-gray-50">
      <div class="flex">
        ${AdminSidebarAdvanced('/admin/pages/languages')}
        
        <div class="flex-1 ml-64">
          <div class="p-8">
            <!-- Header -->
            <div class="mb-8">
              <div class="flex items-center justify-between">
                <div>
                  <h1 class="text-3xl font-bold" style="color: #132C46;">
                    <i class="fas fa-language mr-3" style="color: #D9A50B;"></i>
                    Sprachen-Verwaltung
                  </h1>
                  <p class="text-gray-600 mt-2">Mehrsprachige Inhalte verwalten und übersetzen</p>
                </div>
                <div class="flex gap-3">
                  <button onclick="exportTranslations()" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    <i class="fas fa-download mr-2"></i>Export
                  </button>
                  <button onclick="showAddLanguageModal()" class="px-4 py-2 text-white rounded-lg hover:opacity-90" style="background: #D9A50B;">
                    <i class="fas fa-plus mr-2"></i>Sprache hinzufügen
                  </button>
                </div>
              </div>
            </div>

            <!-- Loading State -->
            <div id="loading" class="text-center py-12">
              <i class="fas fa-spinner fa-spin text-4xl" style="color: #D9A50B;"></i>
              <p class="text-gray-600 mt-4">Lade Sprachen...</p>
            </div>

            <!-- Statistics (Hidden initially) -->
            <div id="stats" style="display: none;" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-600 text-sm">Verfügbare Sprachen</span>
                  <i class="fas fa-globe text-blue-600"></i>
                </div>
                <div class="text-2xl font-bold" style="color: #132C46;" id="stat-total">0</div>
              </div>
              
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-600 text-sm">Aktive Sprachen</span>
                  <i class="fas fa-check-circle text-green-600"></i>
                </div>
                <div class="text-2xl font-bold text-green-600" id="stat-active">0</div>
              </div>
              
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-600 text-sm">Übersetzungen</span>
                  <i class="fas fa-file-alt text-orange-600"></i>
                </div>
                <div class="text-2xl font-bold text-orange-600" id="stat-translations">0</div>
              </div>
              
              <div class="stat-card">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-600 text-sm">Standard-Sprache</span>
                  <i class="fas fa-star" style="color: #D9A50B;"></i>
                </div>
                <div class="text-xl font-bold" style="color: #132C46;" id="stat-default">-</div>
              </div>
            </div>

            <!-- Languages List (Hidden initially) -->
            <div id="languagesList" style="display: none;" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Will be populated by JavaScript -->
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Language Modal -->
      <div id="languageModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="flex items-center justify-between p-6 border-b">
            <h2 class="text-xl font-bold" style="color: #132C46;" id="modalTitle">Sprache hinzufügen</h2>
            <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form id="languageForm" class="p-6 space-y-4">
            <input type="hidden" id="languageId">
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sprachcode (ISO 639-1)*</label>
              <input type="text" id="languageCode" maxlength="2" required 
                class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="de">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Name (English)*</label>
              <input type="text" id="languageName" required 
                class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="German">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nativer Name*</label>
              <input type="text" id="languageNativeName" required 
                class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Deutsch">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Flagge Emoji</label>
              <input type="text" id="languageFlag" maxlength="2" 
                class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="🇩🇪">
            </div>
            
            <div class="flex items-center gap-4">
              <label class="flex items-center">
                <input type="checkbox" id="languageActive" checked class="mr-2">
                <span class="text-sm text-gray-700">Aktiv</span>
              </label>
              
              <label class="flex items-center">
                <input type="checkbox" id="languageDefault" class="mr-2">
                <span class="text-sm text-gray-700">Standard-Sprache</span>
              </label>
            </div>
            
            <div class="flex gap-3 pt-4">
              <button type="button" onclick="closeModal()" 
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Abbrechen
              </button>
              <button type="submit" 
                class="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style="background: #132C46;">
                Speichern
              </button>
            </div>
          </form>
        </div>
      </div>

      <script>
        let languages = [];
        let translations = [];
        
        // Load data on page load
        document.addEventListener('DOMContentLoaded', () => {
          loadLanguages();
        });
        
        async function loadLanguages() {
          try {
            const response = await axios.get('/api/admin/languages');
            languages = response.data.languages || [];
            translations = response.data.translations || [];
            
            updateStats();
            renderLanguages();
            
            document.getElementById('loading').style.display = 'none';
            document.getElementById('stats').style.display = 'grid';
            document.getElementById('languagesList').style.display = 'grid';
          } catch (error) {
            console.error('Error loading languages:', error);
            document.getElementById('loading').innerHTML = 
              '<p class="text-red-600">Fehler beim Laden der Sprachen</p>';
          }
        }
        
        function updateStats() {
          const activeLanguages = languages.filter(l => l.is_active === 1).length;
          const defaultLanguage = languages.find(l => l.is_default === 1);
          
          document.getElementById('stat-total').textContent = languages.length;
          document.getElementById('stat-active').textContent = activeLanguages;
          document.getElementById('stat-translations').textContent = translations.length;
          document.getElementById('stat-default').textContent = defaultLanguage ? defaultLanguage.native_name : '-';
        }
        
        function renderLanguages() {
          const container = document.getElementById('languagesList');
          
          container.innerHTML = languages.map(lang => \`
            <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <span class="language-flag">\${lang.flag_emoji || '🌐'}</span>
                  <div>
                    <h3 class="text-xl font-bold" style="color: #132C46;">
                      \${lang.native_name}
                      \${lang.is_default ? '<span class="badge-default">Standard</span>' : ''}
                    </h3>
                    <p class="text-sm text-gray-600">\${lang.name} (\${lang.code.toUpperCase()})</p>
                  </div>
                </div>
                <span class="badge-\${lang.is_active ? 'active' : 'inactive'}">
                  \${lang.is_active ? 'Aktiv' : 'Inaktiv'}
                </span>
              </div>
              
              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Übersetzungen:</span>
                  <span class="font-medium">\${translations.filter(t => t.language_code === lang.code).length}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Erstellt:</span>
                  <span class="font-medium">\${new Date(lang.created_at).toLocaleDateString('de-DE')}</span>
                </div>
              </div>
              
              <div class="flex gap-2">
                <button onclick="editLanguage(\${lang.id})" 
                  class="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  <i class="fas fa-edit mr-1"></i> Bearbeiten
                </button>
                <button onclick="manageTranslations('\${lang.code}')" 
                  class="flex-1 px-3 py-2 text-white rounded hover:opacity-90 text-sm" style="background: #D9A50B;">
                  <i class="fas fa-language mr-1"></i> Übersetzungen
                </button>
                \${!lang.is_default ? \`
                  <button onclick="deleteLanguage(\${lang.id})" 
                    class="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                    <i class="fas fa-trash"></i>
                  </button>
                \` : ''}
              </div>
            </div>
          \`).join('');
        }
        
        function showAddLanguageModal() {
          document.getElementById('modalTitle').textContent = 'Sprache hinzufügen';
          document.getElementById('languageForm').reset();
          document.getElementById('languageId').value = '';
          document.getElementById('languageActive').checked = true;
          document.getElementById('languageModal').classList.remove('hidden');
        }
        
        function editLanguage(id) {
          const lang = languages.find(l => l.id === id);
          if (!lang) return;
          
          document.getElementById('modalTitle').textContent = 'Sprache bearbeiten';
          document.getElementById('languageId').value = lang.id;
          document.getElementById('languageCode').value = lang.code;
          document.getElementById('languageName').value = lang.name;
          document.getElementById('languageNativeName').value = lang.native_name;
          document.getElementById('languageFlag').value = lang.flag_emoji || '';
          document.getElementById('languageActive').checked = lang.is_active === 1;
          document.getElementById('languageDefault').checked = lang.is_default === 1;
          document.getElementById('languageModal').classList.remove('hidden');
        }
        
        function closeModal() {
          document.getElementById('languageModal').classList.add('hidden');
        }
        
        document.getElementById('languageForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const id = document.getElementById('languageId').value;
          const data = {
            code: document.getElementById('languageCode').value.toLowerCase(),
            name: document.getElementById('languageName').value,
            native_name: document.getElementById('languageNativeName').value,
            flag_emoji: document.getElementById('languageFlag').value,
            is_active: document.getElementById('languageActive').checked ? 1 : 0,
            is_default: document.getElementById('languageDefault').checked ? 1 : 0
          };
          
          try {
            if (id) {
              await axios.put(\`/api/admin/languages/\${id}\`, data);
            } else {
              await axios.post('/api/admin/languages', data);
            }
            
            closeModal();
            loadLanguages();
          } catch (error) {
            alert('Fehler beim Speichern: ' + (error.response?.data?.error || error.message));
          }
        });
        
        async function deleteLanguage(id) {
          if (!confirm('Möchten Sie diese Sprache wirklich löschen?')) return;
          
          try {
            await axios.delete(\`/api/admin/languages/\${id}\`);
            loadLanguages();
          } catch (error) {
            alert('Fehler beim Löschen: ' + (error.response?.data?.error || error.message));
          }
        }
        
        function manageTranslations(code) {
          window.location.href = \`/admin/pages/translations?lang=\${code}\`;
        }
        
        function exportTranslations() {
          window.location.href = '/api/admin/languages/export';
        }
      </script>
    </body>
    </html>
  `
}
