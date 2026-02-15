import type { FC } from 'hono/jsx';

export const KontaktPage: FC = () => {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1a2a4e', color: 'white', padding: '1rem 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37', textDecoration: 'none' }}>
            <i class="fas fa-gem" style={{ marginRight: '0.5rem' }}></i>
            Premium Software Store
          </a>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
            <a href="/products" style={{ color: 'white', textDecoration: 'none' }}>Shop</a>
            <a href="/cart" style={{ color: 'white', textDecoration: 'none' }}>Warenkorb</a>
            <a href="/account" style={{ color: 'white', textDecoration: 'none' }}>Mein Konto</a>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '0.75rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <a href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 0.5rem', color: '#9ca3af' }}>/</span>
          <span style={{ color: '#1f2937', fontWeight: '500' }}>Kontakt</span>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a2a4e', marginBottom: '1.5rem', borderBottom: '3px solid #d4af37', paddingBottom: '0.75rem' }}>
            Kontakt
          </h1>
          <p style={{ color: '#4b5563', fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            Haben Sie Fragen zu unseren Produkten oder benötigen Sie Unterstützung? Wir sind für Sie da!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1a2a4e', marginBottom: '1.5rem' }}>
                <i class="fas fa-building" style={{ marginRight: '0.5rem', color: '#d4af37' }}></i>
                Unternehmen
              </h2>
              <div style={{ color: '#4b5563', lineHeight: '2' }}>
                <strong style={{ color: '#1a2a4e' }}>Premium Software Store GmbH</strong><br />
                Musterstraße 123<br />
                12345 Musterstadt<br />
                Deutschland
              </div>
            </div>

            {/* Contact Methods */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1a2a4e', marginBottom: '1.5rem' }}>
                <i class="fas fa-phone-alt" style={{ marginRight: '0.5rem', color: '#d4af37' }}></i>
                Kontaktdaten
              </h2>
              <div style={{ color: '#4b5563', lineHeight: '2' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <i class="fas fa-phone" style={{ width: '20px', color: '#d4af37' }}></i>
                  <strong>Telefon:</strong> <a href="tel:+491234567890" style={{ color: '#d4af37', textDecoration: 'none' }}>+49 123 456 789</a>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <i class="fas fa-envelope" style={{ width: '20px', color: '#d4af37' }}></i>
                  <strong>E-Mail:</strong> <a href="mailto:support@premiumsoftwarestore.de" style={{ color: '#d4af37', textDecoration: 'none' }}>support@premiumsoftwarestore.de</a>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <i class="fas fa-fax" style={{ width: '20px', color: '#d4af37' }}></i>
                  <strong>Fax:</strong> +49 123 456 788
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1a2a4e', marginBottom: '1.5rem' }}>
                <i class="fas fa-clock" style={{ marginRight: '0.5rem', color: '#d4af37' }}></i>
                Öffnungszeiten
              </h2>
              <div style={{ color: '#4b5563', lineHeight: '2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span><strong>Montag - Freitag:</strong></span>
                  <span>09:00 - 18:00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span><strong>Samstag:</strong></span>
                  <span>10:00 - 14:00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong>Sonntag:</strong></span>
                  <span>Geschlossen</span>
                </div>
                <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fef3c7', borderRadius: '6px', fontSize: '0.875rem' }}>
                  <i class="fas fa-bolt" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                  <strong>24/7 E-Mail Support</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1a2a4e', marginBottom: '1.5rem' }}>
              <i class="fas fa-paper-plane" style={{ marginRight: '0.5rem', color: '#d4af37' }}></i>
              Kontaktformular
            </h2>
            <form id="contactForm" style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label for="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>
                    Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem' }}
                    placeholder="Ihr vollständiger Name"
                  />
                </div>
                <div>
                  <label for="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>
                    E-Mail <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem' }}
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label for="phone" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>
                    Telefon
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem' }}
                    placeholder="+49 123 456 789"
                  />
                </div>
                <div>
                  <label for="subject" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>
                    Betreff <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select 
                    id="subject" 
                    name="subject" 
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'white' }}
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="product">Produktfragen</option>
                    <option value="license">Lizenzaktivierung</option>
                    <option value="order">Bestellung & Lieferung</option>
                    <option value="payment">Zahlung & Rechnung</option>
                    <option value="technical">Technischer Support</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="orderNumber" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>
                  Bestellnummer (falls vorhanden)
                </label>
                <input 
                  type="text" 
                  id="orderNumber" 
                  name="orderNumber"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem' }}
                  placeholder="z.B. ORD-20260128-001"
                />
              </div>

              <div>
                <label for="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>
                  Nachricht <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  required
                  rows="6"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', resize: 'vertical' }}
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                ></textarea>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <input 
                  type="checkbox" 
                  id="privacy" 
                  name="privacy" 
                  required
                  style={{ marginTop: '0.25rem', width: '16px', height: '16px' }}
                />
                <label for="privacy" style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6' }}>
                  Ich habe die <a href="/datenschutz" style={{ color: '#d4af37', textDecoration: 'none' }}>Datenschutzerklärung</a> gelesen und akzeptiere diese. <span style={{ color: '#ef4444' }}>*</span>
                </label>
              </div>

              <div>
                <button 
                  type="submit"
                  style={{ 
                    backgroundColor: '#d4af37', 
                    color: '#1a2a4e', 
                    padding: '1rem 2rem', 
                    borderRadius: '6px', 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    border: 'none', 
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onmouseover="this.style.backgroundColor='#c4a027'"
                  onmouseout="this.style.backgroundColor='#d4af37'"
                >
                  <i class="fas fa-paper-plane" style={{ marginRight: '0.5rem' }}></i>
                  Nachricht senden
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Support Boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {/* FAQ Box */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <i class="fas fa-question-circle" style={{ fontSize: '1.75rem', color: '#d4af37' }}></i>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1a2a4e', marginBottom: '0.75rem' }}>
              FAQ
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              Antworten auf häufig gestellte Fragen
            </p>
            <a href="/faq" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>
              Zur FAQ <i class="fas fa-arrow-right" style={{ marginLeft: '0.25rem' }}></i>
            </a>
          </div>

          {/* Support Center */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <i class="fas fa-life-ring" style={{ fontSize: '1.75rem', color: '#d4af37' }}></i>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1a2a4e', marginBottom: '0.75rem' }}>
              Support Center
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              Umfassende Hilfe und Anleitungen
            </p>
            <a href="/account" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>
              Zum Support <i class="fas fa-arrow-right" style={{ marginLeft: '0.25rem' }}></i>
            </a>
          </div>

          {/* Live Chat */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <i class="fas fa-comments" style={{ fontSize: '1.75rem', color: '#d4af37' }}></i>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1a2a4e', marginBottom: '0.75rem' }}>
              Live Chat
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              Sofortige Hilfe per Chat (Mo-Fr 9-18 Uhr)
            </p>
            <button 
              onclick="alert('Live Chat wird gestartet...')"
              style={{ 
                backgroundColor: '#10b981', 
                color: 'white', 
                padding: '0.5rem 1rem', 
                borderRadius: '6px', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                border: 'none', 
                cursor: 'pointer'
              }}
            >
              Chat starten <i class="fas fa-comment-dots" style={{ marginLeft: '0.25rem' }}></i>
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div style={{ backgroundColor: '#1a2a4e', color: 'white', borderRadius: '8px', padding: '2rem', marginTop: '3rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            Warum Kunden uns vertrauen
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <i class="fas fa-certificate" style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '0.75rem' }}></i>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37', marginBottom: '0.25rem' }}>15+ Jahre</div>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Erfahrung</div>
            </div>
            <div>
              <i class="fas fa-users" style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '0.75rem' }}></i>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37', marginBottom: '0.25rem' }}>50.000+</div>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Zufriedene Kunden</div>
            </div>
            <div>
              <i class="fas fa-star" style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '0.75rem' }}></i>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37', marginBottom: '0.25rem' }}>4.8/5.0</div>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Kundenbewertung</div>
            </div>
            <div>
              <i class="fas fa-shield-alt" style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '0.75rem' }}></i>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37', marginBottom: '0.25rem' }}>100%</div>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Käuferschutz</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a2a4e', color: 'white', marginTop: '4rem', padding: '2rem 0 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            © 2026 Premium Software Store GmbH. Alle Rechte vorbehalten.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
            <a href="/agb" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '0.875rem' }}>AGB</a>
            <a href="/datenschutz" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '0.875rem' }}>Datenschutz</a>
            <a href="/impressum" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '0.875rem' }}>Impressum</a>
            <a href="/kontakt" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '0.875rem' }}>Kontakt</a>
          </div>
        </div>
      </footer>

      {/* Contact Form Script */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            orderNumber: document.getElementById('orderNumber').value,
            message: document.getElementById('message').value
          };
          
          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            
            if (response.ok) {
              alert('Vielen Dank für Ihre Nachricht! Wir werden uns schnellstmöglich bei Ihnen melden.');
              document.getElementById('contactForm').reset();
            } else {
              alert('Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.');
          }
        });
      ` }}></script>
    </div>
  );
};
