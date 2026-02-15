export const AdminCertificateSettings = () => {
  return (
    <div class="certificate-settings-page">
      <style>{`
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
        .admin-content {
          margin-left: 280px;
          min-height: 100vh;
        }
        .settings-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .checkbox-label:hover {
          background: #f3f4f6;
        }
        .checkbox-input {
          width: 20px;
          height: 20px;
        }
      `}</style>

      <div class="max-w-5xl mx-auto p-8">
            
            <div class="mb-8">
              <h1 class="text-4xl font-bold" style="color: #1a2a4e">
                <i class="fas fa-cog mr-3" style="color: #d4af37"></i>
                Zertifikat-Einstellungen
              </h1>
              <p class="text-gray-600 mt-2">Automatische Generierung von Lizenz-Zertifikaten konfigurieren</p>
            </div>

            
            <div class="settings-card">
              <h2 class="text-2xl font-bold mb-4" style="color: #1a2a4e">
                <i class="fas fa-magic mr-2" style="color: #d4af37"></i>
                Automatische Generierung
              </h2>
              <p class="text-gray-600 mb-6">Wählen Sie aus, wann Zertifikate automatisch erstellt werden sollen</p>
              
              <div class="space-y-3">
                <label class="checkbox-label">
                  <input type="checkbox" id="auto-paid" class="checkbox-input" />
                  <div>
                    <div class="font-semibold">Bei Bestellstatus "Bezahlt"</div>
                    <div class="text-sm text-gray-500">Zertifikat wird automatisch generiert, sobald die Zahlung eingegangen ist</div>
                  </div>
                </label>

                <label class="checkbox-label">
                  <input type="checkbox" id="auto-completed" class="checkbox-input" />
                  <div>
                    <div class="font-semibold">Bei Bestellstatus "Abgeschlossen"</div>
                    <div class="text-sm text-gray-500">Zertifikat wird generiert, wenn die Bestellung komplett abgeschlossen ist</div>
                  </div>
                </label>

                <label class="checkbox-label">
                  <input type="checkbox" id="auto-processing" class="checkbox-input" />
                  <div>
                    <div class="font-semibold">Bei Bestellstatus "In Bearbeitung"</div>
                    <div class="text-sm text-gray-500">Zertifikat wird sofort bei Bestelleingang erstellt</div>
                  </div>
                </label>

                <label class="checkbox-label">
                  <input type="checkbox" id="manual-only" class="checkbox-input" />
                  <div>
                    <div class="font-semibold">Nur manuell</div>
                    <div class="text-sm text-gray-500">Zertifikate müssen manuell vom Admin generiert werden</div>
                  </div>
                </label>
              </div>
            </div>

            
            <div class="settings-card">
              <h2 class="text-2xl font-bold mb-4" style="color: #1a2a4e">
                <i class="fas fa-trademark mr-2" style="color: #d4af37"></i>
                Aktivierte Marken
              </h2>
              <p class="text-gray-600 mb-6">Wählen Sie, für welche Marken Zertifikate generiert werden sollen</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label class="checkbox-label border-2 border-gray-200">
                  <input type="checkbox" id="brand-microsoft" class="checkbox-input" />
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                      <i class="fab fa-microsoft text-2xl text-blue-600"></i>
                    </div>
                    <div>
                      <div class="font-bold">Microsoft</div>
                      <div class="text-xs text-gray-500">Partner ID: 7027901</div>
                    </div>
                  </div>
                </label>

                <label class="checkbox-label border-2 border-gray-200">
                  <input type="checkbox" id="brand-adobe" class="checkbox-input" />
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                      <i class="fas fa-file-pdf text-2xl text-red-600"></i>
                    </div>
                    <div>
                      <div class="font-bold">Adobe</div>
                      <div class="text-xs text-gray-500">Partner ID: ADOBE-ID</div>
                    </div>
                  </div>
                </label>

                <label class="checkbox-label border-2 border-gray-200">
                  <input type="checkbox" id="brand-kaspersky" class="checkbox-input" />
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-green-100 rounded flex items-center justify-center">
                      <i class="fas fa-shield-alt text-2xl text-green-600"></i>
                    </div>
                    <div>
                      <div class="font-bold">Kaspersky</div>
                      <div class="text-xs text-gray-500">Partner ID: KASPERSKY-ID</div>
                    </div>
                  </div>
                </label>

                <label class="checkbox-label border-2 border-gray-200">
                  <input type="checkbox" id="brand-other" class="checkbox-input" />
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <i class="fas fa-box text-2xl text-gray-600"></i>
                    </div>
                    <div>
                      <div class="font-bold">Andere Marken</div>
                      <div class="text-xs text-gray-500">Generisches Template</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            
            <div class="settings-card">
              <h2 class="text-2xl font-bold mb-4" style="color: #1a2a4e">
                <i class="fas fa-envelope mr-2" style="color: #d4af37"></i>
                E-Mail Automation
              </h2>
              <p class="text-gray-600 mb-6">Konfigurieren Sie den automatischen Versand von Zertifikaten</p>
              
              <div class="space-y-3">
                <label class="checkbox-label">
                  <input type="checkbox" id="auto-email" class="checkbox-input" />
                  <div>
                    <div class="font-semibold">Zertifikat automatisch per E-Mail versenden</div>
                    <div class="text-sm text-gray-500">Sendet das Zertifikat sofort nach der Generierung an den Kunden</div>
                  </div>
                </label>

                <label class="checkbox-label">
                  <input type="checkbox" id="attach-order-email" class="checkbox-input" />
                  <div>
                    <div class="font-semibold">An Bestellbestätigung anhängen</div>
                    <div class="text-sm text-gray-500">Fügt das Zertifikat der Bestellbestätigungs-E-Mail hinzu</div>
                  </div>
                </label>

                <label class="checkbox-label">
                  <input type="checkbox" id="include-download-link" class="checkbox-input" />
                  <div>
                    <div class="font-semibold">Download-Link einfügen</div>
                    <div class="text-sm text-gray-500">Fügt einen Link zum Herunterladen des Zertifikats ein</div>
                  </div>
                </label>
              </div>

              <div class="mt-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">E-Mail Betreff</label>
                  <input type="text" id="email-subject" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent" 
                    value="Ihre Lizenz-Zertifikate von SoftwareKing24" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">E-Mail Text</label>
                  <textarea id="email-body" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >Sehr geehrte(r) {customer_name},

anbei erhalten Sie Ihre Lizenz-Zertifikate für {product_name}.

Ihr Lizenzschlüssel: {license_key}

Mit freundlichen Grüßen
Ihr SoftwareKing24 Team</textarea>
                  <p class="text-xs text-gray-500 mt-2">
                    Verfügbare Platzhalter: {customer_name}, {product_name}, {license_key}, {order_number}, {invoice_number}
                  </p>
                </div>
              </div>
            </div>

            
            <div class="settings-card">
              <h2 class="text-2xl font-bold mb-4" style="color: #1a2a4e">
                <i class="fas fa-hashtag mr-2" style="color: #d4af37"></i>
                Zertifikat-Nummerierung
              </h2>
              <p class="text-gray-600 mb-6">Legen Sie das Format für Zertifikat-Nummern fest</p>
              
              <div class="space-y-3">
                <label class="checkbox-label">
                  <input type="radio" name="numbering" id="numbering-auto" class="checkbox-input" checked />
                  <div>
                    <div class="font-semibold">Automatische Nummerierung</div>
                    <div class="text-sm text-gray-500">Format: CERT-2026-0001, CERT-2026-0002, ...</div>
                  </div>
                </label>

                <label class="checkbox-label">
                  <input type="radio" name="numbering" id="numbering-order" class="checkbox-input" />
                  <div>
                    <div class="font-semibold">Bestellnummer verwenden</div>
                    <div class="text-sm text-gray-500">Verwendet die Bestellnummer als Zertifikat-Nummer</div>
                  </div>
                </label>

                <label class="checkbox-label">
                  <input type="radio" name="numbering" id="numbering-invoice" class="checkbox-input" />
                  <div>
                    <div class="font-semibold">Rechnungsnummer verwenden</div>
                    <div class="text-sm text-gray-500">Verwendet die Rechnungsnummer als Zertifikat-Nummer</div>
                  </div>
                </label>
              </div>

              <div class="mt-4">
                <label class="block text-sm font-medium mb-2">Nächste Zertifikat-Nummer</label>
                <input type="number" id="next-cert-number" class="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent" value="1" />
                <p class="text-xs text-gray-500 mt-2">Wird nur bei automatischer Nummerierung verwendet</p>
              </div>
            </div>

            
            <div class="flex justify-end gap-4">
              <button onclick="resetSettings()" class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold">
                <i class="fas fa-undo mr-2"></i>Zurücksetzen
              </button>
              <button onclick="saveSettings()" class="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90" style="background: #d4af37">
                <i class="fas fa-save mr-2"></i>Einstellungen speichern
              </button>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
          // Load settings on page load
          loadSettings();

          async function loadSettings() {
            { path: '/admin/sliders', icon: 'fas fa-images', label: 'Slider' },
            { path: '/admin/homepage-sections', icon: 'fas fa-th-large', label: 'Homepage' },
            { path: '/admin/pages', icon: 'fas fa-file-alt', label: 'Seiten' },
            { path: '/admin/settings', icon: 'fas fa-cog', label: 'Einstellungen' }
          ];

          sidebar.innerHTML = \`
            <div class="p-6 border-b border-gray-700">
              <h2 class="text-xl font-bold" style="color: #d4af37">SOFTWAREKING24</h2>
              <p class="text-sm text-gray-400">Admin Panel</p>
            </div>
            <nav class="p-4">
              \${items.map(item => \`
                <a href="\${item.path}" class="block px-4 py-3 rounded-lg mb-1 hover:bg-gray-700 \${item.active ? 'bg-gray-700' : ''}">
                  <i class="\${item.icon} mr-3"></i>
                  <span>\${item.label}</span>
                </a>
              \`).join('')}
            </nav>
          \`;
        }

        async function loadSettings() {
          try {
            const response = await axios.get('/api/admin/certificate-settings');
            if (response.data.success) {
              const settings = response.data.data;
              
              // Auto-generation triggers
              document.getElementById('auto-paid').checked = settings.auto_generate_on_paid === 1;
              document.getElementById('auto-completed').checked = settings.auto_generate_on_completed === 1;
              document.getElementById('auto-processing').checked = settings.auto_generate_on_processing === 1;
              document.getElementById('manual-only').checked = settings.manual_only === 1;
              
              // Enabled brands
              const enabledBrands = JSON.parse(settings.enabled_brands || '[]');
              document.getElementById('brand-microsoft').checked = enabledBrands.includes('Microsoft');
              document.getElementById('brand-adobe').checked = enabledBrands.includes('Adobe');
              document.getElementById('brand-kaspersky').checked = enabledBrands.includes('Kaspersky');
              document.getElementById('brand-other').checked = enabledBrands.includes('Other');
              
              // Email automation
              document.getElementById('auto-email').checked = settings.auto_email_customer === 1;
              document.getElementById('attach-order-email').checked = settings.attach_to_order_email === 1;
              document.getElementById('include-download-link').checked = settings.include_download_link === 1;
              document.getElementById('email-subject').value = settings.email_subject || '';
              document.getElementById('email-body').value = settings.email_body || '';
              
              // Certificate numbering
              if (settings.use_order_number === 1) {
                document.getElementById('numbering-order').checked = true;
              } else if (settings.use_invoice_number === 1) {
                document.getElementById('numbering-invoice').checked = true;
              } else {
                document.getElementById('numbering-auto').checked = true;
              }
              document.getElementById('next-cert-number').value = settings.next_certificate_number || 1;
            }
          } catch (error) {
            console.error('Error loading settings:', error);
          }
        }

        async function saveSettings() {
          const enabledBrands = [];
          if (document.getElementById('brand-microsoft').checked) enabledBrands.push('Microsoft');
          if (document.getElementById('brand-adobe').checked) enabledBrands.push('Adobe');
          if (document.getElementById('brand-kaspersky').checked) enabledBrands.push('Kaspersky');
          if (document.getElementById('brand-other').checked) enabledBrands.push('Other');

          const settings = {
            auto_generate_on_paid: document.getElementById('auto-paid').checked ? 1 : 0,
            auto_generate_on_completed: document.getElementById('auto-completed').checked ? 1 : 0,
            auto_generate_on_processing: document.getElementById('auto-processing').checked ? 1 : 0,
            manual_only: document.getElementById('manual-only').checked ? 1 : 0,
            enabled_brands: JSON.stringify(enabledBrands),
            auto_email_customer: document.getElementById('auto-email').checked ? 1 : 0,
            attach_to_order_email: document.getElementById('attach-order-email').checked ? 1 : 0,
            include_download_link: document.getElementById('include-download-link').checked ? 1 : 0,
            email_subject: document.getElementById('email-subject').value,
            email_body: document.getElementById('email-body').value,
            use_order_number: document.getElementById('numbering-order').checked ? 1 : 0,
            use_invoice_number: document.getElementById('numbering-invoice').checked ? 1 : 0,
            next_certificate_number: parseInt(document.getElementById('next-cert-number').value)
          };

          try {
            const response = await axios.post('/api/admin/certificate-settings', settings);
            if (response.data.success) {
              alert('Einstellungen erfolgreich gespeichert!');
            }
          } catch (error) {
            console.error('Error saving settings:', error);
            alert('Fehler beim Speichern der Einstellungen');
          }
        }

        function resetSettings() {
          if (confirm('Möchten Sie wirklich alle Einstellungen auf die Standardwerte zurücksetzen?')) {
            loadSettings();
          }
        }
      `}} />
    </div>
  );
};
