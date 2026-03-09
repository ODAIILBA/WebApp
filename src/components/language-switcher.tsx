// Language Switcher Component
export function LanguageSwitcher(currentLang = 'de') {
  return `
    <div class="language-switcher-container" style="padding: 1rem; border-top: 1px solid #e5e7eb; margin-top: auto;">
      <div class="language-switcher" onclick="toggleLanguageDropdown(event)">
        <div class="current-language" style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; padding: 0.5rem; border-radius: 6px; background: #f3f4f6; transition: background 0.3s;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="current-flag" id="currentLangFlag" style="font-size: 1.5rem;">🇩🇪</span>
            <span class="current-lang-name" id="currentLangName" style="font-weight: 600;">Deutsch</span>
          </div>
          <i class="fas fa-chevron-down" style="font-size: 0.75rem; color: #6b7280;"></i>
        </div>
        
        <div id="languageDropdown" class="language-dropdown" style="display: none; position: absolute; bottom: 100%; left: 0; right: 0; background: white; border-radius: 8px; box-shadow: 0 -4px 12px rgba(0,0,0,0.15); max-height: 300px; overflow-y: auto; margin-bottom: 0.5rem; z-index: 9999;">
          <div class="dropdown-header" style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">
            <i class="fas fa-language mr-2"></i>Sprache wählen
          </div>
          <div id="languageOptions" style="padding: 0.5rem;">
            <!-- Languages will be loaded here -->
            <div style="padding: 1rem; text-align: center; color: #9ca3af;">
              Lade Sprachen...
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .language-option {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        cursor: pointer;
        border-radius: 6px;
        transition: all 0.2s;
      }
      
      .language-option:hover {
        background: #eff6ff;
      }
      
      .language-option.active {
        background: #dbeafe;
        border-left: 3px solid #3b82f6;
      }
      
      .language-option .flag {
        font-size: 1.5rem;
      }
      
      .language-option .name {
        font-weight: 500;
        color: #374151;
      }
      
      .language-option .code {
        margin-left: auto;
        font-size: 0.75rem;
        color: #9ca3af;
        text-transform: uppercase;
      }
      
      .language-switcher-container {
        position: sticky;
        bottom: 0;
        background: white;
      }
    </style>

    <script>
      // Language Switcher Functions
      let availableLanguages = [];
      let currentLanguage = '${currentLang}';
      
      // Toggle Language Dropdown
      function toggleLanguageDropdown(event) {
        event.stopPropagation();
        const dropdown = document.getElementById('languageDropdown');
        const isVisible = dropdown.style.display !== 'none';
        
        if (isVisible) {
          dropdown.style.display = 'none';
        } else {
          dropdown.style.display = 'block';
          loadAvailableLanguages();
        }
      }
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('languageDropdown');
        const switcher = document.querySelector('.language-switcher');
        
        if (dropdown && !switcher.contains(event.target)) {
          dropdown.style.display = 'none';
        }
      });
      
      // Load Available Languages
      async function loadAvailableLanguages() {
        try {
          const response = await axios.get('/api/languages/active');
          availableLanguages = response.data.languages || [];
          renderLanguageOptions();
        } catch (error) {
          console.error('Error loading languages:', error);
          document.getElementById('languageOptions').innerHTML = '<div style="padding: 1rem; text-align: center; color: #ef4444;">Fehler beim Laden</div>';
        }
      }
      
      // Render Language Options
      function renderLanguageOptions() {
        const container = document.getElementById('languageOptions');
        
        if (availableLanguages.length === 0) {
          container.innerHTML = '<div style="padding: 1rem; text-align: center; color: #9ca3af;">Keine Sprachen verfügbar</div>';
          return;
        }
        
        container.innerHTML = availableLanguages.map(lang => \`
          <div class="language-option \${lang.code === currentLanguage ? 'active' : ''}" onclick="changeLanguage('\${lang.code}', '\${lang.flag_emoji}', '\${lang.native_name}')">
            <span class="flag">\${lang.flag_emoji || '🏳️'}</span>
            <span class="name">\${lang.native_name}</span>
            <span class="code">\${lang.code}</span>
          </div>
        \`).join('');
      }
      
      // Change Language
      async function changeLanguage(code, flag, name) {
        try {
          // Save to localStorage
          localStorage.setItem('selectedLanguage', code);
          
          // Save to backend
          await axios.post('/api/user/language', { language_code: code });
          
          // Update UI
          document.getElementById('currentLangFlag').textContent = flag;
          document.getElementById('currentLangName').textContent = name;
          currentLanguage = code;
          
          // Close dropdown
          document.getElementById('languageDropdown').style.display = 'none';
          
          // Show notification
          if (typeof showToast === 'function') {
            showToast(\`Sprache geändert zu \${name}\`, 'success');
          }
          
          // Reload page to apply language
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (error) {
          console.error('Error changing language:', error);
          if (typeof showToast === 'function') {
            showToast('Fehler beim Ändern der Sprache', 'error');
          }
        }
      }
      
      // Load Current Language on Init
      async function loadCurrentLanguage() {
        try {
          const savedLang = localStorage.getItem('selectedLanguage') || 'de';
          const response = await axios.get('/api/languages/active');
          const languages = response.data.languages || [];
          const lang = languages.find(l => l.code === savedLang) || languages.find(l => l.is_default) || languages[0];
          
          if (lang) {
            document.getElementById('currentLangFlag').textContent = lang.flag_emoji || '🇩🇪';
            document.getElementById('currentLangName').textContent = lang.native_name;
            currentLanguage = lang.code;
          }
        } catch (error) {
          console.error('Error loading current language:', error);
        }
      }
      
      // Initialize on page load
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCurrentLanguage);
      } else {
        loadCurrentLanguage();
      }
    </script>
  `;
}
