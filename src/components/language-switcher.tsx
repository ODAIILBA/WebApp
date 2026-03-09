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
          
          // Load translations for the new language
          const translationsResponse = await axios.get(\`/api/translations/\${code}\`);
          if (translationsResponse.data.success) {
            // Store translations in localStorage
            localStorage.setItem('translations', JSON.stringify(translationsResponse.data.translations));
            localStorage.setItem('currentLanguage', code);
          }
          
          // Update UI
          document.getElementById('currentLangFlag').textContent = flag;
          document.getElementById('currentLangName').textContent = name;
          currentLanguage = code;
          
          // Close dropdown
          document.getElementById('languageDropdown').style.display = 'none';
          
          // Show notification
          const messages = {
            de: 'Sprache geändert zu',
            en: 'Language changed to',
            fr: 'Langue changée en',
            es: 'Idioma cambiado a',
            it: 'Lingua cambiata in',
            pt: 'Idioma alterado para'
          };
          const message = \`\${messages[code] || messages.de} \${name}\`;
          
          if (typeof showToast === 'function') {
            showToast(message, 'success');
          }
          
          // Apply translations immediately
          applyTranslations(translationsResponse.data.translations);
          
          // Reload page after short delay to fully apply language
          setTimeout(() => {
            window.location.reload();
          }, 800);
        } catch (error) {
          console.error('Error changing language:', error);
          const errorMessages = {
            de: 'Fehler beim Ändern der Sprache',
            en: 'Error changing language',
            fr: 'Erreur lors du changement de langue',
            es: 'Error al cambiar el idioma',
            it: 'Errore durante il cambio lingua',
            pt: 'Erro ao alterar idioma'
          };
          if (typeof showToast === 'function') {
            showToast(errorMessages[currentLanguage] || errorMessages.de, 'error');
          }
        }
      }
      
      // Apply translations to current page
      function applyTranslations(translations) {
        // Translate all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
          const key = element.getAttribute('data-i18n');
          if (translations[key]) {
            element.textContent = translations[key];
          }
        });
        
        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
          const key = element.getAttribute('data-i18n-placeholder');
          if (translations[key]) {
            element.setAttribute('placeholder', translations[key]);
          }
        });
        
        // Translate titles
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
          const key = element.getAttribute('data-i18n-title');
          if (translations[key]) {
            element.setAttribute('title', translations[key]);
          }
        });
      }
      
      // Load Current Language on Init
      async function loadCurrentLanguage() {
        try {
          const savedLang = localStorage.getItem('selectedLanguage') || 'de';
          
          // Load translations from API
          const translationsResponse = await axios.get(\`/api/translations/\${savedLang}\`);
          if (translationsResponse.data.success) {
            localStorage.setItem('translations', JSON.stringify(translationsResponse.data.translations));
            localStorage.setItem('currentLanguage', savedLang);
            
            // Apply translations to current page
            applyTranslations(translationsResponse.data.translations);
          }
          
          // Load language info
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
