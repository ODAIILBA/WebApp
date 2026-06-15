// Language Switcher Component
async function createLanguageSwitcher() {
  try {
    // Fetch available languages
    const response = await fetch('/api/admin/languages');
    const data = await response.json();
    const activeLanguages = data.languages.filter(l => l.is_active === 1);
    
    if (activeLanguages.length === 0) return '';
    
    const currentLang = TranslationHelper.currentLang || 'de';
    const currentLanguage = activeLanguages.find(l => l.code === currentLang) || activeLanguages[0];
    
    const switcherHTML = `
      <div class="language-switcher">
        <div class="language-selector" onclick="toggleLanguageDropdown()">
          <span class="language-flag">${currentLanguage.flag_emoji || '🌐'}</span>
          <span class="language-name">${currentLanguage.code.toUpperCase()}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        
        <div class="language-dropdown" id="languageDropdown">
          ${activeLanguages.map(lang => `
            <div class="language-option ${lang.code === currentLang ? 'active' : ''}" 
                 onclick="changeLanguage('${lang.code}')">
              <span class="flag">${lang.flag_emoji || '🌐'}</span>
              <div class="details">
                <span class="lang-name">${lang.name}</span>
                <span class="lang-native">${lang.native_name}</span>
              </div>
              <i class="fas fa-check checkmark"></i>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    return switcherHTML;
  } catch (error) {
    console.error('Failed to create language switcher:', error);
    return '';
  }
}

function toggleLanguageDropdown() {
  const dropdown = document.getElementById('languageDropdown');
  dropdown.classList.toggle('active');
}

async function changeLanguage(langCode) {
  await TranslationHelper.loadTranslations(langCode);
  
  // Close dropdown
  const dropdown = document.getElementById('languageDropdown');
  if (dropdown) dropdown.classList.remove('active');
  
  // Reload page to apply translations
  window.location.reload();
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const switcher = document.querySelector('.language-switcher');
  const dropdown = document.getElementById('languageDropdown');
  
  if (switcher && !switcher.contains(event.target) && dropdown) {
    dropdown.classList.remove('active');
  }
});

// Initialize language switcher on page load
document.addEventListener('DOMContentLoaded', async () => {
  const languageSwitcherContainer = document.getElementById('languageSwitcherContainer');
  if (languageSwitcherContainer) {
    const html = await createLanguageSwitcher();
    languageSwitcherContainer.innerHTML = html;
  }
});
