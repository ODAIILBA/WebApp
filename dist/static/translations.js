// Translation helper script for frontend
// This script should be included in all frontend pages
const TranslationHelper = {
  translations: {},
  currentLang: 'de',
  
  async loadTranslations(lang = 'de') {
    try {
      const response = await fetch(`/api/translations/${lang}`);
      this.translations = await response.json();
      this.currentLang = lang;
      this.updatePageTranslations();
      
      // Store preference
      localStorage.setItem('preferred_language', lang);
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  },
  
  t(key, fallback = key) {
    return this.translations[key] || fallback;
  },
  
  updatePageTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    });
  },
  
  async init() {
    // Check for preferred language
    const savedLang = localStorage.getItem('preferred_language');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = savedLang || browserLang || 'de';
    
    await this.loadTranslations(defaultLang);
  }
};

// Auto-initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => TranslationHelper.init());
} else {
  TranslationHelper.init();
}
