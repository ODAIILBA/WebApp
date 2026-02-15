import { AdminSidebar } from './admin-sidebar'

export const AdminSettingsAdvanced = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Einstellungen - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --gold: #d4af37;
        }
        .admin-sidebar {
          width: 280px;
          background: #1a2a4e;
          color: white;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 40;
        }
        .admin-nav-item {
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .admin-nav-item:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
        }
        .admin-nav-item.active {
          background: rgba(212, 175, 55, 0.2);
          color: #d4af37;
          border-left: 4px solid #d4af37;
        }
        .settings-tab {
          padding: 12px 24px;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          color: #6b7280;
          font-weight: 600;
        }
        .settings-tab:hover {
          color: var(--navy-dark);
          background: rgba(212, 175, 55, 0.1);
        }
        .settings-tab.active {
          color: var(--navy-dark);
          border-bottom-color: var(--gold);
        }
        .tab-content {
          display: none;
        }
        .tab-content.active {
          display: block;
        }
        .settings-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          font-weight: 600;
          color: var(--navy-dark);
          margin-bottom: 8px;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }
        .smtp-provider {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          margin-right: 12px;
          margin-bottom: 12px;
        }
        .smtp-provider:hover {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.05);
        }
        .smtp-provider.active {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.1);
          color: var(--navy-dark);
        }
        .btn-save {
          background: var(--navy-dark);
          color: white;
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .btn-save:hover {
          background: #0f1829;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26, 42, 78, 0.3);
        }
        .btn-test {
          background: var(--gold);
          color: white;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .btn-test:hover {
          background: #c19b2d;
          transform: translateY(-1px);
        }
        .toggle-switch {
          position: relative;
          width: 60px;
          height: 30px;
          background: #d1d5db;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .toggle-switch.active {
          background: var(--gold);
        }
        .toggle-slider {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 12px;
          transition: all 0.3s;
        }
        .toggle-switch.active .toggle-slider {
          left: 33px;
        }
        .info-box {
          background: #eff6ff;
          border-left: 4px solid #3b82f6;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .success-box {
          background: #f0fdf4;
          border-left: 4px solid #10b981;
          padding: 16px;
          border-radius: 8px;
          margin-top: 20px;
          display: none;
        }
      </style>
    </head>
    <body class="bg-gray-100">
      <div class="flex min-h-screen">
        ${AdminSidebar('/admin/settings')}
        
        <div class="flex-1 ml-64 p-8">
          <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="flex justify-between items-center mb-8">
              <div>
                <h1 class="text-3xl font-bold" style="color: var(--navy-dark)">
                  <i class="fas fa-cogs mr-3"></i>
                  Einstellungen
                </h1>
                <p class="text-gray-600 mt-2">Verwalten Sie alle Shop-Einstellungen und Konfigurationen</p>
              </div>
              <button onclick="saveAllSettings()" class="btn-save">
                <i class="fas fa-save mr-2"></i>
                Alle speichern
              </button>
            </div>
            
            <!-- Tabs Navigation -->
            <div class="bg-white rounded-lg shadow-sm mb-6 flex overflow-x-auto">
              <div class="settings-tab active" onclick="switchTab('general')">
                <i class="fas fa-store mr-2"></i>Allgemein
              </div>
              <div class="settings-tab" onclick="switchTab('smtp')">
                <i class="fas fa-envelope mr-2"></i>SMTP & E-Mail
              </div>
              <div class="settings-tab" onclick="switchTab('store')">
                <i class="fas fa-shopping-bag mr-2"></i>Shop
              </div>
              <div class="settings-tab" onclick="switchTab('payment')">
                <i class="fas fa-credit-card mr-2"></i>Zahlung
              </div>
              <div class="settings-tab" onclick="switchTab('security')">
                <i class="fas fa-shield-alt mr-2"></i>Sicherheit
              </div>
              <div class="settings-tab" onclick="switchTab('advanced')">
                <i class="fas fa-sliders-h mr-2"></i>Erweitert
              </div>
            </div>
            
            <!-- General Tab -->
            <div id="tab-general" class="tab-content active">
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fas fa-info-circle mr-2"></i>Shop-Informationen
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="form-group">
                    <label class="form-label">Shop-Name</label>
                    <input type="text" id="store_name" class="form-input" value="SOFTWAREKING24" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Shop-Slogan</label>
                    <input type="text" id="store_slogan" class="form-input" value="Ihre Premium-Software-Quelle" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Kontakt E-Mail</label>
                    <input type="email" id="contact_email" class="form-input" value="info@softwareking24.de" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Support E-Mail</label>
                    <input type="email" id="support_email" class="form-input" value="support@softwareking24.de" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Telefon</label>
                    <input type="tel" id="store_phone" class="form-input" value="+49 30 12345678" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">WhatsApp</label>
                    <input type="tel" id="store_whatsapp" class="form-input" value="+49 176 12345678" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Shop-Adresse</label>
                  <textarea id="store_address" class="form-textarea" rows="3">SOFTWAREKING24 GmbH
Musterstraße 123
12345 Berlin, Deutschland</textarea>
                </div>
              </div>
              
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fas fa-globe mr-2"></i>Lokalisierung
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="form-group">
                    <label class="form-label">Standard-Sprache</label>
                    <select id="default_language" class="form-select">
                      <option value="de" selected>Deutsch</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Währung</label>
                    <select id="currency" class="form-select">
                      <option value="EUR" selected>EUR (€)</option>
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Zeitzone</label>
                    <select id="timezone" class="form-select">
                      <option value="Europe/Berlin" selected>Europe/Berlin</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- SMTP Tab -->
            <div id="tab-smtp" class="tab-content">
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fas fa-server mr-2"></i>SMTP-Konfiguration
                </h3>
                
                <div class="info-box mb-6">
                  <p class="text-sm text-blue-900">
                    <i class="fas fa-info-circle mr-2"></i>
                    Wählen Sie einen E-Mail-Anbieter oder konfigurieren Sie einen benutzerdefinierten SMTP-Server.
                  </p>
                </div>
                
                <!-- SMTP Provider Selection -->
                <div class="mb-6">
                  <label class="form-label">SMTP-Anbieter wählen</label>
                  <div class="flex flex-wrap">
                    <div class="smtp-provider active" onclick="selectProvider('custom')" id="provider-custom">
                      <i class="fas fa-cog"></i>
                      <span>Benutzerdefiniert</span>
                    </div>
                    <div class="smtp-provider" onclick="selectProvider('gmail')" id="provider-gmail">
                      <i class="fab fa-google"></i>
                      <span>Gmail</span>
                    </div>
                    <div class="smtp-provider" onclick="selectProvider('outlook')" id="provider-outlook">
                      <i class="fab fa-microsoft"></i>
                      <span>Outlook</span>
                    </div>
                    <div class="smtp-provider" onclick="selectProvider('sendgrid')" id="provider-sendgrid">
                      <i class="fas fa-paper-plane"></i>
                      <span>SendGrid</span>
                    </div>
                    <div class="smtp-provider" onclick="selectProvider('mailgun')" id="provider-mailgun">
                      <i class="fas fa-envelope-open"></i>
                      <span>Mailgun</span>
                    </div>
                  </div>
                </div>
                
                <!-- SMTP Settings -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="form-group">
                    <label class="form-label">SMTP Host</label>
                    <input type="text" id="smtp_host" class="form-input" placeholder="smtp.gmail.com" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">SMTP Port</label>
                    <select id="smtp_port" class="form-select">
                      <option value="587">587 (TLS/STARTTLS)</option>
                      <option value="465">465 (SSL)</option>
                      <option value="25">25 (Standard)</option>
                      <option value="2525">2525 (Alternative)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">SMTP Benutzername / E-Mail</label>
                    <input type="text" id="smtp_username" class="form-input" placeholder="your-email@gmail.com" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">SMTP Passwort</label>
                    <input type="password" id="smtp_password" class="form-input" placeholder="••••••••" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Verschlüsselung</label>
                    <select id="smtp_encryption" class="form-select">
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                      <option value="none">Keine</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Von Name</label>
                    <input type="text" id="smtp_from_name" class="form-input" value="SOFTWAREKING24" />
                  </div>
                  <div class="form-group md:col-span-2">
                    <label class="form-label">Von E-Mail-Adresse</label>
                    <input type="email" id="smtp_from_email" class="form-input" placeholder="noreply@softwareking24.de" />
                  </div>
                </div>
                
                <!-- Test Email -->
                <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-semibold text-gray-900">SMTP-Verbindung testen</h4>
                      <p class="text-sm text-gray-600">Senden Sie eine Test-E-Mail, um die Konfiguration zu überprüfen</p>
                    </div>
                    <button onclick="testSMTP()" class="btn-test">
                      <i class="fas fa-paper-plane mr-2"></i>
                      Test senden
                    </button>
                  </div>
                  <div id="smtp-test-result" class="success-box">
                    <i class="fas fa-check-circle text-green-600 mr-2"></i>
                    <span id="smtp-test-message"></span>
                  </div>
                </div>
              </div>
              
              <!-- Email Templates -->
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fas fa-file-alt mr-2"></i>E-Mail-Vorlagen
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Bestellbestätigung</h4>
                      <p class="text-sm text-gray-600">Wird nach Bestellabschluss versendet</p>
                    </div>
                    <button onclick="editTemplate('order_confirmation')" class="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-gold">
                      <i class="fas fa-edit mr-2"></i>Bearbeiten
                    </button>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Lizenzschlüssel-Lieferung</h4>
                      <p class="text-sm text-gray-600">Enthält die gekauften Lizenzschlüssel</p>
                    </div>
                    <button onclick="editTemplate('license_delivery')" class="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-gold">
                      <i class="fas fa-edit mr-2"></i>Bearbeiten
                    </button>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Passwort zurücksetzen</h4>
                      <p class="text-sm text-gray-600">Link zum Zurücksetzen des Passworts</p>
                    </div>
                    <button onclick="editTemplate('password_reset')" class="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-gold">
                      <i class="fas fa-edit mr-2"></i>Bearbeiten
                    </button>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Willkommens-E-Mail</h4>
                      <p class="text-sm text-gray-600">Begrüßung für neue Kunden</p>
                    </div>
                    <button onclick="editTemplate('welcome')" class="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-gold">
                      <i class="fas fa-edit mr-2"></i>Bearbeiten
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Store Tab -->
            <div id="tab-store" class="tab-content">
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fas fa-shopping-bag mr-2"></i>Shop-Einstellungen
                </h3>
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Wartungsmodus</h4>
                      <p class="text-sm text-gray-600">Shop für Kunden vorübergehend deaktivieren</p>
                    </div>
                    <div class="toggle-switch" id="toggle-maintenance" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Registrierung erlauben</h4>
                      <p class="text-sm text-gray-600">Neue Kundenregistrierungen zulassen</p>
                    </div>
                    <div class="toggle-switch active" id="toggle-registration" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Gast-Checkout</h4>
                      <p class="text-sm text-gray-600">Bestellungen ohne Registrierung erlauben</p>
                    </div>
                    <div class="toggle-switch active" id="toggle-guest-checkout" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Mindestbestellwert (€)</label>
                    <input type="number" id="minimum_order_amount" class="form-input" value="0" min="0" step="0.01" />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Produkte pro Seite</label>
                    <select id="products_per_page" class="form-select">
                      <option value="12" selected>12</option>
                      <option value="24">24</option>
                      <option value="36">36</option>
                      <option value="48">48</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fas fa-percentage mr-2"></i>Steuern & MwSt.
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="form-group">
                    <label class="form-label">Standard-MwSt. (%)</label>
                    <input type="number" id="default_vat_rate" class="form-input" value="19" min="0" max="100" step="0.01" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Ermäßigter Satz (%)</label>
                    <input type="number" id="reduced_vat_rate" class="form-input" value="7" min="0" max="100" step="0.01" />
                  </div>
                  <div class="form-group md:col-span-2">
                    <label class="form-label">Umsatzsteuer-ID</label>
                    <input type="text" id="vat_number" class="form-input" placeholder="DE123456789" />
                  </div>
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg md:col-span-2">
                    <div>
                      <h4 class="font-semibold">Preise inkl. MwSt. anzeigen</h4>
                      <p class="text-sm text-gray-600">MwSt. in den angezeigten Preisen einschließen</p>
                    </div>
                    <div class="toggle-switch active" id="toggle-prices-include-vat" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Payment Tab -->
            <div id="tab-payment" class="tab-content">
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fab fa-stripe mr-2"></i>Stripe-Konfiguration
                </h3>
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Stripe aktivieren</h4>
                      <p class="text-sm text-gray-600">Stripe als Zahlungsmethode anbieten</p>
                    </div>
                    <div class="toggle-switch active" id="toggle-stripe" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Stripe Publishable Key</label>
                    <input type="text" id="stripe_publishable_key" class="form-input" placeholder="pk_test_..." />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Stripe Secret Key</label>
                    <input type="password" id="stripe_secret_key" class="form-input" placeholder="sk_test_..." />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Webhook Secret</label>
                    <input type="password" id="stripe_webhook_secret" class="form-input" placeholder="whsec_..." />
                  </div>
                </div>
              </div>
              
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fab fa-paypal mr-2"></i>PayPal-Konfiguration
                </h3>
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">PayPal aktivieren</h4>
                      <p class="text-sm text-gray-600">PayPal als Zahlungsmethode anbieten</p>
                    </div>
                    <div class="toggle-switch active" id="toggle-paypal" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">PayPal Client ID</label>
                    <input type="text" id="paypal_client_id" class="form-input" placeholder="..." />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">PayPal Secret</label>
                    <input type="password" id="paypal_secret" class="form-input" placeholder="..." />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Modus</label>
                    <select id="paypal_mode" class="form-select">
                      <option value="sandbox">Sandbox (Test)</option>
                      <option value="live">Live (Produktion)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Security Tab -->
            <div id="tab-security" class="tab-content">
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fas fa-shield-alt mr-2"></i>Sicherheitseinstellungen
                </h3>
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">2-Faktor-Authentifizierung</h4>
                      <p class="text-sm text-gray-600">Zusätzliche Sicherheit für Admin-Konten</p>
                    </div>
                    <div class="toggle-switch" id="toggle-2fa" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">HTTPS erzwingen</h4>
                      <p class="text-sm text-gray-600">Alle Anfragen auf HTTPS umleiten</p>
                    </div>
                    <div class="toggle-switch active" id="toggle-https" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Session-Timeout (Minuten)</label>
                    <input type="number" id="session_timeout" class="form-input" value="60" min="5" max="1440" />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Max. Login-Versuche</label>
                    <input type="number" id="max_login_attempts" class="form-input" value="5" min="3" max="10" />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">IP-Whitelist (eine IP pro Zeile)</label>
                    <textarea id="ip_whitelist" class="form-textarea" rows="4" placeholder="192.168.1.1
10.0.0.1"></textarea>
                  </div>
                </div>
              </div>
              
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fas fa-database mr-2"></i>Daten & Backup
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Automatische Backups</h4>
                      <p class="text-sm text-gray-600">Tägliche Datenbanksicherung</p>
                    </div>
                    <div class="toggle-switch active" id="toggle-auto-backup" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div class="flex items-center gap-2">
                        <h4 class="font-semibold">Letztes Backup:</h4>
                        <span class="text-sm text-gray-600">Vor 2 Stunden</span>
                      </div>
                      <p class="text-sm text-gray-600">Größe: 45.2 MB</p>
                    </div>
                    <button onclick="createBackup()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <i class="fas fa-download mr-2"></i>Jetzt sichern
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Advanced Tab -->
            <div id="tab-advanced" class="tab-content">
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4" style="color: var(--navy-dark)">
                  <i class="fas fa-code mr-2"></i>Erweiterte Einstellungen
                </h3>
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Debug-Modus</h4>
                      <p class="text-sm text-gray-600">Detaillierte Fehlerprotokolle aktivieren</p>
                    </div>
                    <div class="toggle-switch" id="toggle-debug" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 class="font-semibold">Cache aktivieren</h4>
                      <p class="text-sm text-gray-600">Seiten-Caching für bessere Performance</p>
                    </div>
                    <div class="toggle-switch active" id="toggle-cache" onclick="toggleSetting(this)">
                      <div class="toggle-slider"></div>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Cache-Dauer (Minuten)</label>
                    <input type="number" id="cache_duration" class="form-input" value="60" min="0" max="1440" />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">API Rate Limit (Anfragen/Minute)</label>
                    <input type="number" id="api_rate_limit" class="form-input" value="60" min="10" max="1000" />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Custom CSS</label>
                    <textarea id="custom_css" class="form-textarea" rows="6" placeholder="/* Ihre CSS-Anpassungen */"></textarea>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Custom JavaScript</label>
                    <textarea id="custom_js" class="form-textarea" rows="6" placeholder="// Ihre JS-Anpassungen"></textarea>
                  </div>
                </div>
              </div>
              
              <div class="settings-card">
                <h3 class="text-xl font-bold mb-4 text-red-600">
                  <i class="fas fa-exclamation-triangle mr-2"></i>Gefahrenzone
                </h3>
                <div class="space-y-4">
                  <div class="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <h4 class="font-semibold text-red-900">Cache leeren</h4>
                    <p class="text-sm text-red-700 mb-3">Alle gecachten Daten löschen (kann Performance vorübergehend beeinträchtigen)</p>
                    <button onclick="clearCache()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <i class="fas fa-trash mr-2"></i>Cache leeren
                    </button>
                  </div>
                  
                  <div class="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <h4 class="font-semibold text-red-900">Alle Einstellungen zurücksetzen</h4>
                    <p class="text-sm text-red-700 mb-3">Setzt alle Einstellungen auf Standardwerte zurück (nicht rückgängig machbar!)</p>
                    <button onclick="resetAllSettings()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <i class="fas fa-undo mr-2"></i>Zurücksetzen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        let currentTab = 'general';
        let currentProvider = 'custom';
        
        // Load all settings on page load
        async function loadAllSettings() {
          try {
            const response = await axios.get('/api/admin/settings');
            if (response.data.success) {
              const settings = response.data.data;
              settings.forEach(setting => {
                const element = document.getElementById(setting.setting_key);
                if (element) {
                  if (element.type === 'checkbox') {
                    element.checked = setting.setting_value === 'true';
                  } else {
                    element.value = setting.setting_value;
                  }
                  
                  // Handle toggle switches
                  const toggle = document.getElementById('toggle-' + setting.setting_key.replace(/_/g, '-'));
                  if (toggle && setting.setting_value === 'true') {
                    toggle.classList.add('active');
                  }
                }
              });
            }
          } catch (error) {
            console.error('Error loading settings:', error);
          }
        }
        
        // Switch tabs
        function switchTab(tabName) {
          // Hide all tabs
          document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
          });
          document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.classList.remove('active');
          });
          
          // Show selected tab
          document.getElementById('tab-' + tabName).classList.add('active');
          event.target.closest('.settings-tab').classList.add('active');
          currentTab = tabName;
        }
        
        // Select SMTP provider
        function selectProvider(provider) {
          currentProvider = provider;
          
          // Update UI
          document.querySelectorAll('.smtp-provider').forEach(el => {
            el.classList.remove('active');
          });
          document.getElementById('provider-' + provider).classList.add('active');
          
          // Set provider-specific values
          const configs = {
            gmail: {
              host: 'smtp.gmail.com',
              port: '587',
              encryption: 'tls'
            },
            outlook: {
              host: 'smtp-mail.outlook.com',
              port: '587',
              encryption: 'tls'
            },
            sendgrid: {
              host: 'smtp.sendgrid.net',
              port: '587',
              encryption: 'tls'
            },
            mailgun: {
              host: 'smtp.mailgun.org',
              port: '587',
              encryption: 'tls'
            },
            custom: {
              host: '',
              port: '587',
              encryption: 'tls'
            }
          };
          
          if (configs[provider]) {
            document.getElementById('smtp_host').value = configs[provider].host;
            document.getElementById('smtp_port').value = configs[provider].port;
            document.getElementById('smtp_encryption').value = configs[provider].encryption;
          }
        }
        
        // Toggle settings
        function toggleSetting(element) {
          element.classList.toggle('active');
        }
        
        // Test SMTP
        async function testSMTP() {
          const testEmail = prompt('Geben Sie eine Test-E-Mail-Adresse ein:', 'test@example.com');
          if (!testEmail) return;
          
          try {
            const button = event.target;
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sende...';
            
            const response = await axios.post('/api/admin/settings/test-smtp', {
              test_email: testEmail,
              smtp_host: document.getElementById('smtp_host').value,
              smtp_port: document.getElementById('smtp_port').value,
              smtp_username: document.getElementById('smtp_username').value,
              smtp_password: document.getElementById('smtp_password').value,
              smtp_encryption: document.getElementById('smtp_encryption').value,
              smtp_from_name: document.getElementById('smtp_from_name').value,
              smtp_from_email: document.getElementById('smtp_from_email').value
            });
            
            const resultBox = document.getElementById('smtp-test-result');
            const messageBox = document.getElementById('smtp-test-message');
            
            if (response.data.success) {
              resultBox.style.display = 'block';
              resultBox.className = 'success-box';
              resultBox.style.background = '#f0fdf4';
              resultBox.style.borderLeft = '4px solid #10b981';
              messageBox.textContent = 'Test-E-Mail erfolgreich versendet an ' + testEmail;
            } else {
              resultBox.style.display = 'block';
              resultBox.style.background = '#fef2f2';
              resultBox.style.borderLeft = '4px solid #ef4444';
              messageBox.textContent = 'Fehler: ' + (response.data.error || 'Unbekannter Fehler');
            }
            
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Test senden';
          } catch (error) {
            console.error('SMTP test error:', error);
            alert('Fehler beim Senden der Test-E-Mail: ' + (error.response?.data?.error || error.message));
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Test senden';
          }
        }
        
        // Save all settings
        async function saveAllSettings() {
          try {
            const button = event.target;
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Speichere...';
            
            // Collect all settings
            const settings = [];
            const inputs = document.querySelectorAll('input[id], select[id], textarea[id]');
            
            inputs.forEach(input => {
              if (input.id && !input.id.startsWith('toggle-') && !input.id.startsWith('provider-')) {
                settings.push({
                  key: input.id,
                  value: input.value,
                  type: input.type === 'number' ? 'number' : 'string'
                });
              }
            });
            
            // Add toggle states
            document.querySelectorAll('.toggle-switch[id^="toggle-"]').forEach(toggle => {
              const key = toggle.id.replace('toggle-', '').replace(/-/g, '_');
              settings.push({
                key: key,
                value: toggle.classList.contains('active') ? 'true' : 'false',
                type: 'boolean'
              });
            });
            
            const response = await axios.post('/api/admin/settings', { settings });
            
            if (response.data.success) {
              button.innerHTML = '<i class="fas fa-check mr-2"></i>Gespeichert!';
              setTimeout(() => {
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-save mr-2"></i>Alle speichern';
              }, 2000);
            }
          } catch (error) {
            console.error('Error saving settings:', error);
            alert('Fehler beim Speichern: ' + (error.response?.data?.error || error.message));
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-save mr-2"></i>Alle speichern';
          }
        }
        
        // Edit email template
        function editTemplate(template) {
          // Redirect to email templates editor
          window.location.href = '/admin/email-templates';
        }
        
        // Create backup
        async function createBackup() {
          if (!confirm('Möchten Sie jetzt ein Backup erstellen?')) return;
          
          try {
            const response = await axios.post('/api/admin/backup');
            if (response.data.success) {
              alert('Backup erfolgreich erstellt!');
            }
          } catch (error) {
            console.error('Backup error:', error);
            alert('Fehler beim Erstellen des Backups');
          }
        }
        
        // Clear cache
        async function clearCache() {
          if (!confirm('Möchten Sie wirklich den gesamten Cache leeren?')) return;
          
          try {
            const response = await axios.post('/api/admin/cache/clear');
            if (response.data.success) {
              alert('Cache erfolgreich geleert!');
            }
          } catch (error) {
            console.error('Cache clear error:', error);
            alert('Fehler beim Leeren des Caches');
          }
        }
        
        // Reset all settings
        async function resetAllSettings() {
          if (!confirm('WARNUNG: Dies setzt alle Einstellungen auf die Standardwerte zurück! Fortfahren?')) return;
          if (!confirm('Sind Sie ABSOLUT sicher? Dies kann nicht rückgängig gemacht werden!')) return;
          
          try {
            const response = await axios.post('/api/admin/settings/reset');
            if (response.data.success) {
              alert('Einstellungen zurückgesetzt! Seite wird neu geladen...');
              location.reload();
            }
          } catch (error) {
            console.error('Reset error:', error);
            alert('Fehler beim Zurücksetzen');
          }
        }
        
        // Load settings on page load
        document.addEventListener('DOMContentLoaded', () => {
          loadAllSettings();
        });
      </script>
    </body>
    </html>
  `
}
