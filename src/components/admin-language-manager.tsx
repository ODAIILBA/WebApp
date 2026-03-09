import { AdminSidebarAdvanced } from './admin-sidebar-advanced';

export function AdminLanguageManager() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Language Manager - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #f9fafb;
        }
        
        .admin-content {
            margin-left: 280px;
            min-height: 100vh;
            padding: 2rem;
        }
        
        @media (max-width: 768px) {
            .admin-content {
                margin-left: 0;
            }
        }
        
        .language-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        
        .language-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .language-item {
            display: flex;
            align-items: center;
            padding: 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 0.5rem;
            transition: all 0.3s;
        }
        
        .language-item:hover {
            border-color: #3b82f6;
            background: #eff6ff;
        }
        
        .language-item.active {
            border-color: #10b981;
            background: #d1fae5;
        }
        
        .language-item.default {
            border-color: #f59e0b;
            background: #fef3c7;
        }
        
        .flag-emoji {
            font-size: 2rem;
            margin-right: 1rem;
        }
        
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 48px;
            height: 24px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .slider {
            background-color: #3b82f6;
        }
        
        input:checked + .slider:before {
            transform: translateX(24px);
        }
        
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: none;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .toast.show {
            display: block;
        }
        
        .toast.success {
            border-left: 4px solid #10b981;
        }
        
        .toast.error {
            border-left: 4px solid #ef4444;
        }
        
        .toast.info {
            border-left: 4px solid #3b82f6;
        }
        
        .modal {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        
        .modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    ${AdminSidebarAdvanced()}
    
    <div class="admin-content">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
                <i class="fas fa-language text-blue-600 mr-3"></i>
                Sprachen-Verwaltung
            </h1>
            <p class="text-gray-600">Verwalten Sie verfügbare Sprachen und Übersetzungen</p>
        </div>

        <!-- Toast Notification -->
        <div id="toast" class="toast">
            <div class="flex items-center">
                <i id="toastIcon" class="fas fa-check-circle mr-3 text-green-500"></i>
                <span id="toastMessage">Operation successful</span>
            </div>
        </div>

        <!-- Add Language Modal -->
        <div id="addLanguageModal" class="modal">
            <div class="modal-content">
                <h2 class="text-2xl font-bold mb-4">Neue Sprache hinzufügen</h2>
                <form id="addLanguageForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold mb-2">Sprachcode (ISO 639-1)</label>
                        <input type="text" id="newLangCode" maxlength="2" placeholder="z.B. de, en, fr" class="w-full p-2 border rounded" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold mb-2">Englischer Name</label>
                        <input type="text" id="newLangName" placeholder="z.B. German, English" class="w-full p-2 border rounded" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold mb-2">Nativer Name</label>
                        <input type="text" id="newLangNativeName" placeholder="z.B. Deutsch, English" class="w-full p-2 border rounded" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold mb-2">Flaggen-Emoji</label>
                        <input type="text" id="newLangFlag" placeholder="🇩🇪 🇬🇧 🇫🇷" maxlength="2" class="w-full p-2 border rounded">
                    </div>
                    
                    <div class="flex gap-2">
                        <button type="submit" class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            <i class="fas fa-plus mr-2"></i>Hinzufügen
                        </button>
                        <button type="button" onclick="closeAddModal()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
                            Abbrechen
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="language-card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Verfügbare Sprachen</p>
                        <p class="text-3xl font-bold text-blue-600" id="totalLanguages">0</p>
                    </div>
                    <i class="fas fa-language text-4xl text-blue-200"></i>
                </div>
            </div>
            
            <div class="language-card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Aktive Sprachen</p>
                        <p class="text-3xl font-bold text-green-600" id="activeLanguages">0</p>
                    </div>
                    <i class="fas fa-check-circle text-4xl text-green-200"></i>
                </div>
            </div>
            
            <div class="language-card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Übersetzungen</p>
                        <p class="text-3xl font-bold text-purple-600" id="totalTranslations">0</p>
                    </div>
                    <i class="fas fa-file-alt text-4xl text-purple-200"></i>
                </div>
            </div>
            
            <div class="language-card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Standard-Sprache</p>
                        <p class="text-2xl font-bold text-orange-600" id="defaultLanguage">-</p>
                    </div>
                    <i class="fas fa-star text-4xl text-orange-200"></i>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 mb-6">
            <button onclick="openAddModal()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                <i class="fas fa-plus mr-2"></i>Neue Sprache hinzufügen
            </button>
            <button onclick="initializeDefaultLanguages()" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                <i class="fas fa-database mr-2"></i>Standard-Sprachen initialisieren
            </button>
            <button onclick="loadLanguages()" class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
                <i class="fas fa-sync mr-2"></i>Aktualisieren
            </button>
        </div>

        <!-- Languages List -->
        <div class="language-card">
            <h3 class="text-xl font-bold mb-4">Verfügbare Sprachen</h3>
            <div id="languagesList" class="space-y-2">
                <p class="text-gray-500 text-center py-8">Lade Sprachen...</p>
            </div>
        </div>
    </div>

    <script>
        let languages = [];
        
        // Toast Notification
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            const toastIcon = document.getElementById('toastIcon');
            
            toast.className = 'toast show ' + type;
            toastMessage.textContent = message;
            
            if (type === 'success') {
                toastIcon.className = 'fas fa-check-circle mr-3 text-green-500';
            } else if (type === 'error') {
                toastIcon.className = 'fas fa-exclamation-circle mr-3 text-red-500';
            } else if (type === 'info') {
                toastIcon.className = 'fas fa-info-circle mr-3 text-blue-500';
            }
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
        
        // Modal Functions
        function openAddModal() {
            document.getElementById('addLanguageModal').classList.add('show');
        }
        
        function closeAddModal() {
            document.getElementById('addLanguageModal').classList.remove('show');
            document.getElementById('addLanguageForm').reset();
        }
        
        // Load Languages
        async function loadLanguages() {
            try {
                const response = await axios.get('/api/languages');
                languages = response.data.languages || [];
                
                updateStats();
                renderLanguages();
            } catch (error) {
                console.error('Error loading languages:', error);
                showToast('Fehler beim Laden der Sprachen', 'error');
            }
        }
        
        // Update Statistics
        function updateStats() {
            const total = languages.length;
            const active = languages.filter(l => l.is_active).length;
            const defaultLang = languages.find(l => l.is_default);
            
            document.getElementById('totalLanguages').textContent = total;
            document.getElementById('activeLanguages').textContent = active;
            document.getElementById('defaultLanguage').textContent = defaultLang ? defaultLang.flag_emoji + ' ' + defaultLang.native_name : '-';
        }
        
        // Render Languages List
        function renderLanguages() {
            const container = document.getElementById('languagesList');
            
            if (languages.length === 0) {
                container.innerHTML = '<p class="text-gray-500 text-center py-8">Keine Sprachen vorhanden. Klicken Sie auf "Standard-Sprachen initialisieren".</p>';
                return;
            }
            
            container.innerHTML = languages.map(lang => \`
                <div class="language-item \${lang.is_active ? 'active' : ''} \${lang.is_default ? 'default' : ''}">
                    <div class="flag-emoji">\${lang.flag_emoji || '🏳️'}</div>
                    <div class="flex-1">
                        <div class="font-bold text-lg">\${lang.native_name}</div>
                        <div class="text-sm text-gray-600">\${lang.name} (\${lang.code.toUpperCase()})</div>
                    </div>
                    <div class="flex items-center gap-4">
                        \${lang.is_default ? '<span class="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">STANDARD</span>' : ''}
                        \${lang.is_active ? '<span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">AKTIV</span>' : '<span class="bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-semibold">INAKTIV</span>'}
                        
                        <label class="toggle-switch" title="Aktivieren/Deaktivieren">
                            <input type="checkbox" \${lang.is_active ? 'checked' : ''} onchange="toggleLanguage('\${lang.code}', this.checked)">
                            <span class="slider"></span>
                        </label>
                        
                        <button onclick="setDefaultLanguage('\${lang.code}')" class="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600" title="Als Standard setzen">
                            <i class="fas fa-star"></i>
                        </button>
                        
                        <button onclick="deleteLanguage('\${lang.code}')" class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600" title="Löschen">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            \`).join('');
        }
        
        // Toggle Language Active Status
        async function toggleLanguage(code, isActive) {
            try {
                await axios.post(\`/api/languages/\${code}/toggle\`, { is_active: isActive ? 1 : 0 });
                showToast(\`Sprache \${isActive ? 'aktiviert' : 'deaktiviert'}\`, 'success');
                loadLanguages();
            } catch (error) {
                console.error('Error toggling language:', error);
                showToast('Fehler beim Aktualisieren', 'error');
                loadLanguages();
            }
        }
        
        // Set Default Language
        async function setDefaultLanguage(code) {
            if (!confirm('Diese Sprache als Standard-Sprache setzen?')) return;
            
            try {
                await axios.post(\`/api/languages/\${code}/set-default\`);
                showToast('Standard-Sprache aktualisiert', 'success');
                loadLanguages();
            } catch (error) {
                console.error('Error setting default:', error);
                showToast('Fehler beim Setzen der Standard-Sprache', 'error');
            }
        }
        
        // Delete Language
        async function deleteLanguage(code) {
            if (!confirm(\`Sprache "\${code}" wirklich löschen?\\n\\nAlle zugehörigen Übersetzungen werden ebenfalls gelöscht!\`)) return;
            
            try {
                await axios.delete(\`/api/languages/\${code}\`);
                showToast('Sprache gelöscht', 'success');
                loadLanguages();
            } catch (error) {
                console.error('Error deleting language:', error);
                showToast('Fehler beim Löschen', 'error');
            }
        }
        
        // Add New Language
        document.getElementById('addLanguageForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = {
                code: document.getElementById('newLangCode').value.toLowerCase(),
                name: document.getElementById('newLangName').value,
                native_name: document.getElementById('newLangNativeName').value,
                flag_emoji: document.getElementById('newLangFlag').value
            };
            
            try {
                await axios.post('/api/languages', data);
                showToast('Sprache hinzugefügt', 'success');
                closeAddModal();
                loadLanguages();
            } catch (error) {
                console.error('Error adding language:', error);
                showToast(error.response?.data?.error || 'Fehler beim Hinzufügen', 'error');
            }
        });
        
        // Initialize Default Languages
        async function initializeDefaultLanguages() {
            if (!confirm('Standard-Sprachen initialisieren?\\n\\n6 Sprachen werden hinzugefügt: Deutsch, English, Français, Español, Italiano, Português')) return;
            
            try {
                await axios.post('/api/languages/initialize');
                showToast('Standard-Sprachen initialisiert', 'success');
                loadLanguages();
            } catch (error) {
                console.error('Error initializing:', error);
                showToast('Fehler bei der Initialisierung', 'error');
            }
        }
        
        // Load Translations Count
        async function loadTranslationsCount() {
            try {
                const response = await axios.get('/api/translations/count');
                document.getElementById('totalTranslations').textContent = response.data.count || 0;
            } catch (error) {
                console.error('Error loading translations count:', error);
            }
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Initializing Language Manager...');
            loadLanguages();
            loadTranslationsCount();
            console.log('Language Manager initialized');
        });
    </script>
</body>
</html>
`;
}
