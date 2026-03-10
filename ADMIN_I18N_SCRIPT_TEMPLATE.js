/**
 * Admin Panel i18n Script Template
 * 
 * This script should be embedded at the bottom of each admin component
 * before the closing </script> tag.
 * 
 * Usage:
 * 1. Copy this entire script into your admin component
 * 2. Replace hardcoded text with <span data-i18n="admin.key">Fallback Text</span>
 * 3. The script will automatically load and apply translations
 */

// Admin i18n Manager
const AdminI18n = {
  currentLang: 'de',
  translations: {},
  
  // Initialize i18n system
  async init() {
    // Get language from localStorage or default to 'de'
    this.currentLang = localStorage.getItem('language') || 'de';
    
    // Load translations for current language
    await this.loadTranslations(this.currentLang);
    
    // Apply translations to page
    this.applyTranslations();
    
    // Listen for language changes
    window.addEventListener('languageChanged', async (e) => {
      const newLang = e.detail.language;
      if (newLang !== this.currentLang) {
        this.currentLang = newLang;
        await this.loadTranslations(newLang);
        this.applyTranslations();
      }
    });
    
    console.log(`Admin i18n initialized for language: ${this.currentLang}`);
  },
  
  // Load translations from API
  async loadTranslations(lang) {
    try {
      const response = await fetch(`/api/admin/translations/${lang}`);
      const data = await response.json();
      
      if (data.success) {
        this.translations = data.translations;
        console.log(`Loaded ${data.count} admin translations for ${lang}`);
      } else {
        console.error('Failed to load translations:', data.error);
      }
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  },
  
  // Apply translations to all elements with data-i18n attribute
  applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.translations[key];
      
      if (translation) {
        // Check if element has a placeholder attribute
        if (element.hasAttribute('placeholder')) {
          element.setAttribute('placeholder', translation);
        }
        // Check if element has a title attribute
        else if (element.hasAttribute('title')) {
          element.setAttribute('title', translation);
        }
        // Check if element has a value attribute (for buttons/inputs)
        else if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
          if (element.value) {
            element.value = translation;
          } else {
            element.textContent = translation;
          }
        }
        // Default: update text content
        else {
          element.textContent = translation;
        }
      }
    });
    
    console.log(`Applied translations to ${elements.length} elements`);
  },
  
  // Get translation by key (for dynamic content)
  t(key, fallback = '') {
    return this.translations[key] || fallback;
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AdminI18n.init());
} else {
  AdminI18n.init();
}

// Export for global access
window.AdminI18n = AdminI18n;
