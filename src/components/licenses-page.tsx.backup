import type { FC } from 'hono/jsx'

export const LicensesPage: FC = () => {
  return (
    <div>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-primary mb-6">
          <i class="fas fa-key mr-2 text-gold"></i>
          My License Keys
        </h2>

        <div class="mb-6">
          <p class="text-gray-600 mb-4">
            <i class="fas fa-info-circle text-gold mr-2"></i>
            Keep your license keys safe. You can download them anytime from this page.
          </p>
        </div>

        <div id="licenses-list">
          <div class="text-center py-12">
            <i class="fas fa-spinner fa-spin text-4xl text-gold mb-4"></i>
            <p class="text-gray-600">Loading your licenses...</p>
          </div>
        </div>
      </div>

      <script>{`
        async function loadLicenses() {
          const token = localStorage.getItem('auth_token');
          if (!token) {
            window.location.href = '/login?redirect=/account/licenses';
            return;
          }

          try {
            const response = await fetch('/api/account/licenses', {
              headers: { 'Authorization': 'Bearer ' + token }
            });

            const result = await response.json();
            
            if (result.success && result.data.length > 0) {
              displayLicenses(result.data);
            } else {
              document.getElementById('licenses-list').innerHTML = \`
                <div class="text-center py-12 text-gray-500">
                  <i class="fas fa-key text-6xl mb-4 opacity-50"></i>
                  <p class="text-xl mb-2">No license keys yet</p>
                  <p class="mb-4">Purchase software to receive license keys</p>
                  <a href="/" class="btn-gold inline-block px-6 py-3 rounded-lg">
                    Browse Products
                  </a>
                </div>
              \`;
            }
          } catch (error) {
            console.error('Error loading licenses:', error);
            document.getElementById('licenses-list').innerHTML = \`
              <div class="text-center py-12 text-red-500">
                <i class="fas fa-exclamation-circle text-4xl mb-4"></i>
                <p>Error loading licenses. Please try again.</p>
              </div>
            \`;
          }
        }

        function displayLicenses(licenses) {
          const container = document.getElementById('licenses-list');
          container.innerHTML = \`
            <div class="space-y-4">
              \${licenses.map(license => \`
                <div class="border-2 rounded-lg overflow-hidden hover:border-gold transition">
                  <div class="bg-gradient-to-r from-primary to-blue-900 text-white p-4">
                    <div class="flex items-center justify-between">
                      <div class="flex-1">
                        <h3 class="text-xl font-bold mb-1">\${license.product_name}</h3>
                        <p class="text-sm opacity-75">Order #\${license.order_number}</p>
                      </div>
                      <div class="text-right">
                        <span class="px-3 py-1 rounded-full text-sm \${
                          license.status === 'active' ? 'bg-green-500' :
                          license.status === 'used' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }">
                          \${license.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="p-6">
                    <div class="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label class="text-sm text-gray-600 mb-2 block">License Key</label>
                        <div class="relative">
                          <input 
                            type="text" 
                            value="\${license.license_key}"
                            id="license-\${license.id}"
                            readonly
                            class="w-full px-4 py-3 bg-gray-50 border rounded-lg font-mono text-sm"
                          />
                          <button 
                            onclick="copyLicense('\${license.id}', '\${license.license_key}')"
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gold text-primary rounded hover:bg-yellow-500 transition"
                          >
                            <i class="fas fa-copy mr-1"></i>Copy
                          </button>
                        </div>
                      </div>

                      <div>
                        <label class="text-sm text-gray-600 mb-2 block">Activation Info</label>
                        <div class="bg-gray-50 rounded-lg p-3">
                          <div class="flex justify-between text-sm mb-2">
                            <span>Activation Limit:</span>
                            <span class="font-bold">\${license.activation_limit}</span>
                          </div>
                          <div class="flex justify-between text-sm">
                            <span>Times Activated:</span>
                            <span class="font-bold text-gold">\${license.activation_count}</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              class="bg-gold h-2 rounded-full transition-all"
                              style="width: \${(license.activation_count / license.activation_limit) * 100}%"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
                      <div>
                        <i class="far fa-calendar mr-2 text-gold"></i>
                        Purchased: \${new Date(license.created_at).toLocaleDateString()}
                      </div>
                      <div>
                        <i class="fas fa-shield-alt mr-2 text-gold"></i>
                        Type: \${license.key_type || 'Standard'}
                      </div>
                      <div>
                        <i class="fas fa-infinity mr-2 text-gold"></i>
                        Duration: Lifetime
                      </div>
                    </div>

                    <div class="flex gap-3">
                      <button 
                        onclick="downloadLicense('\${license.id}')"
                        class="btn-gold px-6 py-2 rounded-lg"
                      >
                        <i class="fas fa-download mr-2"></i>Download License
                      </button>
                      <a 
                        href="/products/\${license.product_slug}" 
                        class="border-2 border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition"
                      >
                        <i class="fas fa-info-circle mr-2"></i>Product Info
                      </a>
                      \${license.activation_count < license.activation_limit ? \`
                        <button 
                          onclick="activateLicense('\${license.id}')"
                          class="border-2 border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-600 hover:text-white transition"
                        >
                          <i class="fas fa-check-circle mr-2"></i>Activate
                        </button>
                      \` : ''}
                    </div>
                  </div>
                </div>
              \`).join('')}
            </div>
          \`;
        }

        function copyLicense(id, key) {
          navigator.clipboard.writeText(key).then(() => {
            const btn = event.target.closest('button');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check mr-1"></i>Copied!';
            setTimeout(() => {
              btn.innerHTML = originalHTML;
            }, 2000);
          });
        }

        function downloadLicense(id) {
          const token = localStorage.getItem('auth_token');
          window.location.href = '/api/account/licenses/' + id + '/download?token=' + token;
        }

        function activateLicense(id) {
          if (confirm('Are you sure you want to activate this license?')) {
            const token = localStorage.getItem('auth_token');
            fetch('/api/account/licenses/' + id + '/activate', {
              method: 'POST',
              headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(res => res.json())
            .then(result => {
              if (result.success) {
                alert('License activated successfully!');
                loadLicenses(); // Reload list
              } else {
                alert('Failed to activate license: ' + result.error);
              }
            });
          }
        }

        // Initialize
        loadLicenses();
      `}</script>
    </div>
  )
}
