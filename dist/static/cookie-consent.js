// SOFTWAREKING24 - GDPR Cookie Consent Banner
// Advanced Cookie Management with Script Injection

class CookieConsent {
  constructor() {
    this.consent = this.loadConsent();
    this.cookieSettings = [];
    this.init();
  }

  async init() {
    // Load cookie settings from backend
    await this.loadCookieSettings();
    
    // Check if consent was already given
    if (!this.consent) {
      this.showBanner();
    } else {
      // Load scripts based on existing consent
      this.injectScripts();
    }
  }

  async loadCookieSettings() {
    try {
      const response = await fetch('/api/cookies/settings');
      const data = await response.json();
      this.cookieSettings = data.data || [];
    } catch (error) {
      console.error('Error loading cookie settings:', error);
    }
  }

  loadConsent() {
    const consent = localStorage.getItem('cookie_consent');
    return consent ? JSON.parse(consent) : null;
  }

  saveConsent(consent) {
    this.consent = consent;
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    
    // Send consent to backend for statistics
    this.trackConsent(consent);
    
    // Inject scripts based on consent
    this.injectScripts();
  }

  async trackConsent(consent) {
    try {
      await fetch('/api/cookies/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: this.getSessionId(),
          essential: 1,
          functional: consent.functional ? 1 : 0,
          analytics: consent.analytics ? 1 : 0,
          marketing: consent.marketing ? 1 : 0,
          ip_address: '', // Will be filled by backend
          user_agent: navigator.userAgent
        })
      });
    } catch (error) {
      console.error('Error tracking consent:', error);
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  injectScripts() {
    if (!this.consent) return;

    // Inject scripts based on consent
    this.cookieSettings.forEach(cookie => {
      if (!cookie.is_enabled || !cookie.tracking_code) return;

      const categoryConsent = {
        essential: true,
        functional: this.consent.functional,
        analytics: this.consent.analytics,
        marketing: this.consent.marketing
      };

      // Only inject if category has consent
      if (categoryConsent[cookie.category]) {
        this.injectScript(cookie);
      }
    });
  }

  injectScript(cookie) {
    // Check if script already injected
    if (document.querySelector(`[data-cookie="${cookie.name}"]`)) return;

    const script = document.createElement('script');
    script.setAttribute('data-cookie', cookie.name);
    script.setAttribute('data-category', cookie.category);
    
    // Replace placeholders with actual IDs from settings
    let code = cookie.tracking_code;
    
    // Common replacements (these would come from settings in production)
    code = code.replace(/GA_MEASUREMENT_ID/g, 'G-XXXXXXXXXX'); // Would load from settings
    code = code.replace(/FB_PIXEL_ID/g, 'XXXXXXXXXX');
    code = code.replace(/TIKTOK_PIXEL_ID/g, 'XXXXXXXXXX');
    
    script.innerHTML = code;
    document.head.appendChild(script);
    
    console.log(`Injected ${cookie.category} script: ${cookie.name}`);
  }

  showBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
      <style>
        #cookie-consent-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #1a2a4e 0%, #0f1936 100%);
          color: white;
          padding: 1.5rem;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
          z-index: 9999;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .cookie-banner-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .cookie-banner-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .cookie-banner-icon {
          font-size: 1.5rem;
          color: #d4af37;
        }

        .cookie-banner-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: #d4af37;
        }

        .cookie-banner-text {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .cookie-banner-text a {
          color: #d4af37;
          text-decoration: underline;
        }

        .cookie-banner-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cookie-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .cookie-btn-primary {
          background: #d4af37;
          color: #1a2a4e;
        }

        .cookie-btn-primary:hover {
          background: #c19b2e;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .cookie-btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .cookie-btn-secondary:hover {
          border-color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        .cookie-btn-settings {
          background: transparent;
          color: #d4af37;
          border: 2px solid #d4af37;
        }

        .cookie-btn-settings:hover {
          background: rgba(212, 175, 55, 0.1);
        }

        /* Preferences Modal */
        #cookie-preferences-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 10000;
          padding: 2rem;
          overflow-y: auto;
        }

        .cookie-modal-content {
          background: white;
          max-width: 700px;
          margin: 2rem auto;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .cookie-modal-header {
          background: linear-gradient(135deg, #1a2a4e 0%, #0f1936 100%);
          color: white;
          padding: 2rem;
        }

        .cookie-modal-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #d4af37;
          margin-bottom: 0.5rem;
        }

        .cookie-modal-body {
          padding: 2rem;
        }

        .cookie-category {
          margin-bottom: 1.5rem;
          padding: 1.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .cookie-category:hover {
          border-color: #d4af37;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.1);
        }

        .cookie-category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .cookie-category-title {
          font-weight: bold;
          color: #1a2a4e;
          font-size: 1.1rem;
        }

        .cookie-category-description {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .cookie-toggle {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .cookie-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .cookie-toggle-slider {
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

        .cookie-toggle-slider:before {
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

        .cookie-toggle input:checked + .cookie-toggle-slider {
          background-color: #d4af37;
        }

        .cookie-toggle input:checked + .cookie-toggle-slider:before {
          transform: translateX(26px);
        }

        .cookie-toggle input:disabled + .cookie-toggle-slider {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cookie-modal-footer {
          padding: 1.5rem 2rem;
          background: #f8fafc;
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .cookie-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-left: 0.5rem;
        }

        .badge-essential {
          background: #fef3c7;
          color: #92400e;
        }

        @media (max-width: 768px) {
          .cookie-banner-actions {
            flex-direction: column;
          }

          .cookie-btn {
            width: 100%;
          }

          #cookie-preferences-modal {
            padding: 1rem;
          }

          .cookie-modal-content {
            margin: 1rem auto;
          }
        }
      </style>

      <div class="cookie-banner-content">
        <div class="cookie-banner-header">
          <div class="cookie-banner-icon">🍪</div>
          <div class="cookie-banner-title">Cookie-Einstellungen</div>
        </div>
        
        <div class="cookie-banner-text">
          Wir verwenden Cookies und ähnliche Technologien, um Ihnen ein optimales Einkaufserlebnis zu bieten, 
          unsere Website zu verbessern und personalisierte Inhalte anzuzeigen. Mit "Alle akzeptieren" stimmen Sie 
          der Verwendung aller Cookies zu. Sie können Ihre Einstellungen jederzeit anpassen.
          <a href="/datenschutz" target="_blank">Mehr erfahren</a>
        </div>

        <div class="cookie-banner-actions">
          <button class="cookie-btn cookie-btn-primary" onclick="cookieConsent.acceptAll()">
            ✓ Alle akzeptieren
          </button>
          <button class="cookie-btn cookie-btn-secondary" onclick="cookieConsent.acceptEssential()">
            Nur notwendige
          </button>
          <button class="cookie-btn cookie-btn-settings" onclick="cookieConsent.showPreferences()">
            ⚙️ Einstellungen
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    this.createPreferencesModal();
  }

  createPreferencesModal() {
    const modal = document.createElement('div');
    modal.id = 'cookie-preferences-modal';
    modal.innerHTML = `
      <div class="cookie-modal-content">
        <div class="cookie-modal-header">
          <div class="cookie-modal-title">Cookie-Einstellungen anpassen</div>
          <div style="color: rgba(255, 255, 255, 0.8); font-size: 0.95rem; margin-top: 0.5rem;">
            Wählen Sie, welche Cookies Sie zulassen möchten
          </div>
        </div>

        <div class="cookie-modal-body">
          <div class="cookie-category">
            <div class="cookie-category-header">
              <div>
                <div class="cookie-category-title">
                  Notwendige Cookies
                  <span class="cookie-badge badge-essential">ERFORDERLICH</span>
                </div>
              </div>
              <label class="cookie-toggle">
                <input type="checkbox" checked disabled>
                <span class="cookie-toggle-slider"></span>
              </label>
            </div>
            <div class="cookie-category-description">
              Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. 
              Sie werden verwendet für Warenkorbfunktionalität, sichere Anmeldung und CSRF-Schutz.
            </div>
          </div>

          <div class="cookie-category">
            <div class="cookie-category-header">
              <div>
                <div class="cookie-category-title">Funktionale Cookies</div>
              </div>
              <label class="cookie-toggle">
                <input type="checkbox" id="consent-functional">
                <span class="cookie-toggle-slider"></span>
              </label>
            </div>
            <div class="cookie-category-description">
              Funktionale Cookies ermöglichen es der Website, sich an Ihre Präferenzen zu erinnern 
              (z.B. Sprache, Währung, Theme) und erweiterte Funktionen bereitzustellen.
            </div>
          </div>

          <div class="cookie-category">
            <div class="cookie-category-header">
              <div>
                <div class="cookie-category-title">Analytics Cookies</div>
              </div>
              <label class="cookie-toggle">
                <input type="checkbox" id="consent-analytics">
                <span class="cookie-toggle-slider"></span>
              </label>
            </div>
            <div class="cookie-category-description">
              Analytics-Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren. 
              Wir sammeln Informationen anonym und nutzen sie zur Verbesserung unserer Website.
            </div>
          </div>

          <div class="cookie-category">
            <div class="cookie-category-header">
              <div>
                <div class="cookie-category-title">Marketing Cookies</div>
              </div>
              <label class="cookie-toggle">
                <input type="checkbox" id="consent-marketing">
                <span class="cookie-toggle-slider"></span>
              </label>
            </div>
            <div class="cookie-category-description">
              Marketing-Cookies werden verwendet, um Besucher über Websites hinweg zu verfolgen und 
              personalisierte Werbeanzeigen anzuzeigen, die für Sie relevant sind.
            </div>
          </div>
        </div>

        <div class="cookie-modal-footer">
          <button class="cookie-btn cookie-btn-secondary" onclick="cookieConsent.closePreferences()">
            Abbrechen
          </button>
          <button class="cookie-btn cookie-btn-primary" onclick="cookieConsent.savePreferences()">
            Speichern
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closePreferences();
      }
    });
  }

  hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.animation = 'slideDown 0.3s ease-out';
      setTimeout(() => banner.remove(), 300);
    }
  }

  acceptAll() {
    const consent = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    
    this.saveConsent(consent);
    this.hideBanner();
    this.showSuccessMessage('Alle Cookies akzeptiert');
  }

  acceptEssential() {
    const consent = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    
    this.saveConsent(consent);
    this.hideBanner();
    this.showSuccessMessage('Nur notwendige Cookies akzeptiert');
  }

  showPreferences() {
    const modal = document.getElementById('cookie-preferences-modal');
    modal.style.display = 'block';

    // Load current consent
    if (this.consent) {
      document.getElementById('consent-functional').checked = this.consent.functional || false;
      document.getElementById('consent-analytics').checked = this.consent.analytics || false;
      document.getElementById('consent-marketing').checked = this.consent.marketing || false;
    }
  }

  closePreferences() {
    const modal = document.getElementById('cookie-preferences-modal');
    modal.style.display = 'none';
  }

  savePreferences() {
    const consent = {
      essential: true,
      functional: document.getElementById('consent-functional').checked,
      analytics: document.getElementById('consent-analytics').checked,
      marketing: document.getElementById('consent-marketing').checked,
      timestamp: new Date().toISOString()
    };
    
    this.saveConsent(consent);
    this.closePreferences();
    this.hideBanner();
    this.showSuccessMessage('Cookie-Einstellungen gespeichert');
  }

  showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: linear-gradient(135deg, #1a2a4e 0%, #0f1936 100%);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      z-index: 10001;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      animation: slideInRight 0.3s ease-out;
    `;
    
    toast.innerHTML = `
      <style>
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      </style>
      <div style="font-size: 1.25rem; color: #d4af37;">✓</div>
      <div>${message}</div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Public method to open preferences from anywhere (e.g., footer link)
  static openPreferences() {
    if (window.cookieConsent) {
      window.cookieConsent.showPreferences();
    }
  }
}

// Auto-initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
  });
} else {
  window.cookieConsent = new CookieConsent();
}

// Add slideDown animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
`;
document.head.appendChild(style);
