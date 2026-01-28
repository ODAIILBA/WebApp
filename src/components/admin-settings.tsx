import type { FC } from 'hono/jsx'

export const AdminSettings: FC = () => {
  return (
    <div class="admin-settings">
      <div class="admin-header">
        <h2><i class="fas fa-cogs"></i> Settings</h2>
        <button class="btn-primary" onclick="saveAllSettings()">
          <i class="fas fa-save"></i> Save All Settings
        </button>
      </div>

      {/* Settings Tabs */}
      <div class="settings-tabs">
        <button class="tab-btn active" onclick="switchTab('general')">
          <i class="fas fa-store"></i> General
        </button>
        <button class="tab-btn" onclick="switchTab('payment')">
          <i class="fas fa-credit-card"></i> Payment
        </button>
        <button class="tab-btn" onclick="switchTab('email')">
          <i class="fas fa-envelope"></i> Email
        </button>
        <button class="tab-btn" onclick="switchTab('vat')">
          <i class="fas fa-percentage"></i> VAT & Tax
        </button>
        <button class="tab-btn" onclick="switchTab('security')">
          <i class="fas fa-shield-alt"></i> Security
        </button>
      </div>

      {/* General Settings */}
      <div id="tab-general" class="tab-content active">
        <div class="admin-card">
          <h3>Store Information</h3>
          <div class="form-group">
            <label>Store Name</label>
            <input type="text" id="store-name" class="form-control" value="Premium Software Store" />
          </div>
          <div class="form-group">
            <label>Store Email</label>
            <input type="email" id="store-email" class="form-control" value="info@premium-software.de" />
          </div>
          <div class="form-group">
            <label>Support Email</label>
            <input type="email" id="support-email" class="form-control" value="support@premium-software.de" />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" id="store-phone" class="form-control" value="+49 30 12345678" />
          </div>
          <div class="form-group">
            <label>Store Address</label>
            <textarea id="store-address" class="form-control" rows="3">Musterstraße 123
12345 Berlin
Deutschland</textarea>
          </div>
        </div>

        <div class="admin-card">
          <h3>Localization</h3>
          <div class="form-group">
            <label>Default Language</label>
            <select id="default-language" class="form-control">
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>
          </div>
          <div class="form-group">
            <label>Currency</label>
            <select id="currency" class="form-control">
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Timezone</label>
            <select id="timezone" class="form-control">
              <option value="Europe/Berlin">Europe/Berlin</option>
              <option value="Europe/London">Europe/London</option>
              <option value="America/New_York">America/New_York</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div id="tab-payment" class="tab-content">
        <div class="admin-card">
          <h3>Stripe Settings</h3>
          <div class="form-group">
            <label>Stripe Publishable Key</label>
            <input type="text" id="stripe-public-key" class="form-control" placeholder="pk_test_..." />
          </div>
          <div class="form-group">
            <label>Stripe Secret Key</label>
            <input type="password" id="stripe-secret-key" class="form-control" placeholder="sk_test_..." />
          </div>
          <div class="form-group">
            <label>Stripe Webhook Secret</label>
            <input type="password" id="stripe-webhook-secret" class="form-control" placeholder="whsec_..." />
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" id="stripe-enabled" checked /> Enable Stripe Payments
            </label>
          </div>
        </div>

        <div class="admin-card">
          <h3>PayPal Settings</h3>
          <div class="form-group">
            <label>PayPal Client ID</label>
            <input type="text" id="paypal-client-id" class="form-control" placeholder="AYxxx..." />
          </div>
          <div class="form-group">
            <label>PayPal Client Secret</label>
            <input type="password" id="paypal-client-secret" class="form-control" placeholder="EPxxx..." />
          </div>
          <div class="form-group">
            <label>PayPal Webhook ID</label>
            <input type="text" id="paypal-webhook-id" class="form-control" placeholder="WH-xxx..." />
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" id="paypal-enabled" checked /> Enable PayPal Payments
            </label>
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" id="paypal-sandbox" /> Use PayPal Sandbox (Test Mode)
            </label>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div id="tab-email" class="tab-content">
        <div class="admin-card">
          <h3>Email Provider</h3>
          <div class="form-group">
            <label>Email Provider</label>
            <select id="email-provider" class="form-control">
              <option value="sendgrid">SendGrid</option>
              <option value="resend">Resend</option>
              <option value="smtp">Custom SMTP</option>
            </select>
          </div>
          <div class="form-group">
            <label>API Key</label>
            <input type="password" id="email-api-key" class="form-control" placeholder="SG.xxx..." />
          </div>
          <div class="form-group">
            <label>From Email</label>
            <input type="email" id="email-from" class="form-control" value="noreply@premium-software.de" />
          </div>
          <div class="form-group">
            <label>From Name</label>
            <input type="text" id="email-from-name" class="form-control" value="Premium Software Store" />
          </div>
        </div>

        <div class="admin-card">
          <h3>Email Templates</h3>
          <div class="template-list">
            <div class="template-item">
              <i class="fas fa-envelope"></i>
              <span>Order Confirmation</span>
              <button class="btn-secondary" onclick="editEmailTemplate('order-confirmation')">
                <i class="fas fa-edit"></i> Edit
              </button>
            </div>
            <div class="template-item">
              <i class="fas fa-key"></i>
              <span>License Key Delivery</span>
              <button class="btn-secondary" onclick="editEmailTemplate('license-delivery')">
                <i class="fas fa-edit"></i> Edit
              </button>
            </div>
            <div class="template-item">
              <i class="fas fa-user"></i>
              <span>Welcome Email</span>
              <button class="btn-secondary" onclick="editEmailTemplate('welcome')">
                <i class="fas fa-edit"></i> Edit
              </button>
            </div>
            <div class="template-item">
              <i class="fas fa-lock"></i>
              <span>Password Reset</span>
              <button class="btn-secondary" onclick="editEmailTemplate('password-reset')">
                <i class="fas fa-edit"></i> Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VAT Settings */}
      <div id="tab-vat" class="tab-content">
        <div class="admin-card">
          <h3>VAT Configuration</h3>
          <div class="form-group">
            <label>Company VAT Number</label>
            <input type="text" id="company-vat" class="form-control" placeholder="DE123456789" />
          </div>
          <div class="form-group">
            <label>Default VAT Rate (%)</label>
            <input type="number" id="default-vat-rate" class="form-control" value="19" step="0.01" />
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" id="eu-vat-enabled" checked /> Enable EU VAT Validation
            </label>
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" id="reverse-charge-enabled" checked /> Enable Reverse Charge for B2B
            </label>
          </div>
        </div>

        <div class="admin-card">
          <h3>Country VAT Rates</h3>
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>VAT Rate (%)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="vat-rates-tbody">
                <tr>
                  <td>Deutschland (DE)</td>
                  <td><input type="number" value="19" step="0.01" class="form-control" style="width: 100px;" /></td>
                  <td><button class="btn-secondary">Save</button></td>
                </tr>
                <tr>
                  <td>Österreich (AT)</td>
                  <td><input type="number" value="20" step="0.01" class="form-control" style="width: 100px;" /></td>
                  <td><button class="btn-secondary">Save</button></td>
                </tr>
                <tr>
                  <td>Schweiz (CH)</td>
                  <td><input type="number" value="7.7" step="0.01" class="form-control" style="width: 100px;" /></td>
                  <td><button class="btn-secondary">Save</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div id="tab-security" class="tab-content">
        <div class="admin-card">
          <h3>Authentication</h3>
          <div class="form-group">
            <label>Session Timeout (minutes)</label>
            <input type="number" id="session-timeout" class="form-control" value="60" min="5" />
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" id="require-2fa" /> Require Two-Factor Authentication
            </label>
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" id="password-expiry" /> Require Password Change Every 90 Days
            </label>
          </div>
        </div>

        <div class="admin-card">
          <h3>Rate Limiting</h3>
          <div class="form-group">
            <label>Login Attempts (per 15 min)</label>
            <input type="number" id="login-rate-limit" class="form-control" value="5" min="1" />
          </div>
          <div class="form-group">
            <label>API Requests (per minute)</label>
            <input type="number" id="api-rate-limit" class="form-control" value="100" min="10" />
          </div>
          <div class="form-group">
            <label>Admin Requests (per minute)</label>
            <input type="number" id="admin-rate-limit" class="form-control" value="50" min="10" />
          </div>
        </div>

        <div class="admin-card">
          <h3>Security Logs</h3>
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>User</th>
                  <th>IP Address</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody id="security-logs-tbody">
                <tr>
                  <td><i class="fas fa-sign-in-alt"></i> Admin Login</td>
                  <td>admin@store.de</td>
                  <td>192.168.1.1</td>
                  <td>{new Date().toLocaleString('de-DE')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .admin-settings {
          padding: 20px;
        }
        .settings-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 2px solid #ddd;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 15px 25px;
          cursor: pointer;
          font-size: 14px;
          color: #666;
          border-bottom: 3px solid transparent;
          transition: all 0.3s;
        }
        .tab-btn:hover {
          color: #1a2a4e;
        }
        .tab-btn.active {
          color: #1a2a4e;
          border-bottom-color: #d4af37;
          font-weight: 600;
        }
        .tab-content {
          display: none;
        }
        .tab-content.active {
          display: block;
        }
        .template-list {
          display: grid;
          gap: 15px;
        }
        .template-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 5px;
        }
        .template-item i {
          font-size: 24px;
          color: #1a2a4e;
        }
        .template-item span {
          flex: 1;
          font-weight: 600;
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        function switchTab(tabName) {
          // Hide all tabs
          document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
          });
          document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
          });
          
          // Show selected tab
          document.getElementById('tab-' + tabName).classList.add('active');
          event.target.closest('.tab-btn').classList.add('active');
        }
        
        function saveAllSettings() {
          // Collect all settings
          const settings = {
            general: {
              storeName: document.getElementById('store-name').value,
              storeEmail: document.getElementById('store-email').value,
              supportEmail: document.getElementById('support-email').value,
              storePhone: document.getElementById('store-phone').value,
              storeAddress: document.getElementById('store-address').value,
              defaultLanguage: document.getElementById('default-language').value,
              currency: document.getElementById('currency').value,
              timezone: document.getElementById('timezone').value
            },
            payment: {
              stripePublicKey: document.getElementById('stripe-public-key').value,
              stripeSecretKey: document.getElementById('stripe-secret-key').value,
              stripeWebhookSecret: document.getElementById('stripe-webhook-secret').value,
              stripeEnabled: document.getElementById('stripe-enabled').checked,
              paypalClientId: document.getElementById('paypal-client-id').value,
              paypalClientSecret: document.getElementById('paypal-client-secret').value,
              paypalWebhookId: document.getElementById('paypal-webhook-id').value,
              paypalEnabled: document.getElementById('paypal-enabled').checked,
              paypalSandbox: document.getElementById('paypal-sandbox').checked
            },
            security: {
              sessionTimeout: document.getElementById('session-timeout').value,
              require2FA: document.getElementById('require-2fa').checked,
              passwordExpiry: document.getElementById('password-expiry').checked,
              loginRateLimit: document.getElementById('login-rate-limit').value,
              apiRateLimit: document.getElementById('api-rate-limit').value,
              adminRateLimit: document.getElementById('admin-rate-limit').value
            }
          };
          
          // Save to localStorage for demo
          localStorage.setItem('appSettings', JSON.stringify(settings));
          
          alert('Settings saved successfully!');
        }
        
        function editEmailTemplate(templateName) {
          alert('Edit email template: ' + templateName + '\\n\\nThis will open the email template editor.');
        }
        
        // Load saved settings
        function loadSettings() {
          const saved = localStorage.getItem('appSettings');
          if (saved) {
            const settings = JSON.parse(saved);
            
            // Load general settings
            if (settings.general) {
              if (settings.general.storeName) document.getElementById('store-name').value = settings.general.storeName;
              if (settings.general.storeEmail) document.getElementById('store-email').value = settings.general.storeEmail;
              // ... etc
            }
          }
        }
        
        // Initialize
        loadSettings();
      ` }} ></script>
    </div>
  )
}
