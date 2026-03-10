// Language Switcher Component - Compact Design
export function LanguageSwitcher(currentLang = 'de') {
  return `
    <div class="language-switcher-container">
      <div class="language-switcher" onclick="toggleLanguageDropdown(event)">
        <button class="lang-btn" title="Change Language">
          <span class="current-flag" id="currentLangFlag">🇩🇪</span>
          <span class="current-code" id="currentLangCode">DE</span>
          <i class="fas fa-chevron-down lang-arrow"></i>
        </button>
        
        <div id="languageDropdown" class="language-dropdown">
          <div id="languageOptions" class="lang-options">
            <div class="loading-lang">
              <i class="fas fa-spinner fa-spin"></i> Loading...
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .language-switcher-container {
        position: sticky;
        bottom: 0;
        background: white;
        padding: 0.5rem 1rem;
        border-top: 1px solid #e5e7eb;
      }
      
      .language-switcher {
        position: relative;
      }
      
      .lang-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        background: #f9fafb;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.875rem;
      }
      
      .lang-btn:hover {
        background: #f3f4f6;
        border-color: #9ca3af;
      }
      
      .current-flag {
        font-size: 1.25rem;
        line-height: 1;
      }
      
      .current-code {
        font-weight: 600;
        color: #374151;
        font-size: 0.875rem;
      }
      
      .lang-arrow {
        margin-left: auto;
        font-size: 0.75rem;
        color: #6b7280;
        transition: transform 0.2s;
      }
      
      .language-switcher.open .lang-arrow {
        transform: rotate(180deg);
      }
      
      .language-dropdown {
        display: none;
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
        margin-bottom: 0.5rem;
        z-index: 9999;
        max-height: 250px;
        overflow-y: auto;
      }
      
      .language-dropdown.show {
        display: block;
      }
      
      .lang-options {
        padding: 0.25rem;
      }
      
      .language-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.15s;
        font-size: 0.875rem;
      }
      
      .language-option:hover {
        background: #f3f4f6;
      }
      
      .language-option.active {
        background: #dbeafe;
        font-weight: 600;
      }
      
      .language-option .flag {
        font-size: 1.25rem;
        line-height: 1;
      }
      
      .language-option .name {
        flex: 1;
        color: #374151;
      }
      
      .language-option .code {
        font-size: 0.75rem;
        color: #9ca3af;
        text-transform: uppercase;
      }
      
      .loading-lang {
        padding: 1rem;
        text-align: center;
        color: #9ca3af;
        font-size: 0.875rem;
      }
      
      /* Scrollbar styling */
      .language-dropdown::-webkit-scrollbar {
        width: 6px;
      }
      
      .language-dropdown::-webkit-scrollbar-track {
        background: #f9fafb;
      }
      
      .language-dropdown::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 3px;
      }
      
      .language-dropdown::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
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
        const switcher = document.querySelector('.language-switcher');
        const isVisible = dropdown.classList.contains('show');
        
        if (isVisible) {
          dropdown.classList.remove('show');
          switcher.classList.remove('open');
        } else {
          dropdown.classList.add('show');
          switcher.classList.add('open');
          loadAvailableLanguages();
        }
      }
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('languageDropdown');
        const switcher = document.querySelector('.language-switcher');
        
        if (dropdown && switcher && !switcher.contains(event.target)) {
          dropdown.classList.remove('show');
          switcher.classList.remove('open');
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
          document.getElementById('languageOptions').innerHTML = '<div class="loading-lang" style="color: #ef4444;"><i class="fas fa-exclamation-circle"></i> Error</div>';
        }
      }
      
      // Render Language Options
      function renderLanguageOptions() {
        const container = document.getElementById('languageOptions');
        
        if (availableLanguages.length === 0) {
          container.innerHTML = '<div class="loading-lang">No languages</div>';
          return;
        }
        
        container.innerHTML = availableLanguages.map(lang => \`
          <div class="language-option \${lang.code === currentLanguage ? 'active' : ''}" 
               onclick="changeLanguage('\${lang.code}', '\${lang.flag_emoji}', '\${lang.native_name}')">
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
            localStorage.setItem('translations', JSON.stringify(translationsResponse.data.translations));
            localStorage.setItem('currentLanguage', code);
          }
          
          // Update UI
          document.getElementById('currentLangFlag').textContent = flag;
          document.getElementById('currentLangCode').textContent = code.toUpperCase();
          currentLanguage = code;
          
          // Close dropdown
          const dropdown = document.getElementById('languageDropdown');
          const switcher = document.querySelector('.language-switcher');
          dropdown.classList.remove('show');
          switcher.classList.remove('open');
          
          // Show notification
          const messages = {
            de: 'Sprache geändert',
            en: 'Language changed',
            fr: 'Langue changée',
            es: 'Idioma cambiado'
          };
          const message = messages[code] || messages.de;
          
          if (typeof showToast === 'function') {
            showToast(message, 'success');
          }
          
          // Apply translations immediately
          applyTranslations(translationsResponse.data.translations);
          
          // Reload page after short delay
          setTimeout(() => {
            window.location.reload();
          }, 600);
        } catch (error) {
          console.error('Error changing language:', error);
          if (typeof showToast === 'function') {
            showToast('Error changing language', 'error');
          }
        }
      }
      
      // Apply translations to current page
      function applyTranslations(translations) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
          const key = element.getAttribute('data-i18n');
          if (translations[key]) {
            element.textContent = translations[key];
          }
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
          const key = element.getAttribute('data-i18n-placeholder');
          if (translations[key]) {
            element.setAttribute('placeholder', translations[key]);
          }
        });
        
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
            applyTranslations(translationsResponse.data.translations);
          }
          
          // Load language info
          const response = await axios.get('/api/languages/active');
          const languages = response.data.languages || [];
          const lang = languages.find(l => l.code === savedLang) || languages.find(l => l.is_default) || languages[0];
          
          if (lang) {
            document.getElementById('currentLangFlag').textContent = lang.flag_emoji || '🇩🇪';
            document.getElementById('currentLangCode').textContent = lang.code.toUpperCase();
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
