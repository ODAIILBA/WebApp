export const ContactPage = () => {
  return (
    <html lang="de">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kontakt - SOFTWAREKING24 | Wir sind für Sie da</title>
        <meta name="description" content="Kontaktieren Sie SOFTWAREKING24. Unser Support-Team hilft Ihnen gerne bei Fragen zu Software-Lizenzen, Bestellungen und technischem Support." />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
        <style>
          {`
          :root {
            --navy-dark: #1a2a4e;
            --navy-medium: #2d3e6f;
            --navy-light: #435991;
            --gold: #d4af37;
            --gold-light: #e8c966;
            --gold-dark: #b8941f;
          }

          .contact-card {
            transition: all 0.3s ease;
          }

          .contact-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }

          .form-input:focus {
            border-color: var(--gold);
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
          }

          .submit-btn {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
            transition: all 0.3s ease;
          }

          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
          }

          .icon-box {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
            color: white;
            font-size: 24px;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }

          .map-container {
            position: relative;
            height: 400px;
            background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy-medium) 100%);
            border-radius: 20px;
            overflow: hidden;
          }
          `}
        </style>
      </head>
      <body className="bg-gray-50">
        {/* Flash Sale Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 text-center text-sm font-semibold animate-pulse">
          <i className="fas fa-bolt mr-2"></i>
          FLASH SALE: Bis zu 70% Rabatt auf ausgewählte Produkte!
          <i className="fas fa-bolt ml-2"></i>
        </div>

        {/* Top Info Bar */}
        <div className="bg-navy-dark text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span><i className="fas fa-phone mr-2"></i>+49 123 456789</span>
              <span><i className="fas fa-envelope mr-2"></i>[email protected]</span>
              <span><i className="far fa-clock mr-2"></i>Mo-Fr: 9-18 Uhr</span>
            </div>
            <div className="flex items-center space-x-4">
              <span><i className="fas fa-download mr-2"></i>Sofort-Download</span>
              <span><i className="fas fa-shield-alt mr-2"></i>100% Legal</span>
              <span><i className="fas fa-undo mr-2"></i>14 Tage Rückgabe</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <a href="/" className="flex items-center">
                <img src="/static/logo.png" alt="SOFTWAREKING24" className="h-16" />
              </a>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-gray-700 hover:text-gold transition font-medium">
                  <i className="fas fa-home mr-2"></i>Home
                </a>
                <a href="/produkte" className="text-gray-700 hover:text-gold transition font-medium">
                  <i className="fas fa-box-open mr-2"></i>Produkte
                </a>
                <a href="/kontakt" className="text-gold font-bold">
                  <i className="fas fa-envelope mr-2"></i>Kontakt
                </a>
              </nav>

              {/* Header Actions */}
              <div className="flex items-center space-x-6">
                <a href="/konto" className="text-navy-dark hover:text-gold transition">
                  <i className="fas fa-user mr-2"></i>Anmelden
                </a>
                <a href="/warenkorb" className="relative">
                  <button className="bg-gold text-white px-4 py-2 rounded-full hover:bg-gold-dark transition">
                    <i className="fas fa-shopping-cart mr-2"></i>Warenkorb
                    <span id="cart-badge" className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" data-cart-count="0">0</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3">
          <div className="container mx-auto px-6">
            <div className="flex items-center text-sm text-gray-600">
              <a href="/" className="hover:text-gold"><i className="fas fa-home mr-2"></i>Home</a>
              <i className="fas fa-chevron-right mx-3 text-xs"></i>
              <span className="text-navy-dark font-semibold">Kontakt</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy-dark to-navy-medium text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">
              Kontaktieren Sie uns
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up">
              Haben Sie Fragen? Wir sind für Sie da! Unser Support-Team hilft Ihnen gerne weiter.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 -mt-32 relative z-10">
              {/* Phone */}
              <div className="contact-card bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="icon-box mx-auto mb-6">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h3 className="text-xl font-bold text-navy-dark mb-3">Telefon</h3>
                <p className="text-gray-600 mb-4">Mo-Fr: 9:00 - 18:00 Uhr<br/>Sa: 10:00 - 14:00 Uhr</p>
                <a href="tel:+49123456789" className="text-2xl font-bold text-gold hover:text-gold-dark">
                  +49 123 456789
                </a>
              </div>

              {/* Email */}
              <div className="contact-card bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="icon-box mx-auto mb-6">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3 className="text-xl font-bold text-navy-dark mb-3">E-Mail</h3>
                <p className="text-gray-600 mb-4">Antwort innerhalb von 24h<br/>7 Tage die Woche</p>
                <a href="mailto:[email protected]" className="text-xl font-bold text-gold hover:text-gold-dark break-all">
                  [email protected]
                </a>
              </div>

              {/* Live Chat */}
              <div className="contact-card bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="icon-box mx-auto mb-6">
                  <i className="fas fa-comments"></i>
                </div>
                <h3 className="text-xl font-bold text-navy-dark mb-3">Live Chat</h3>
                <p className="text-gray-600 mb-4">Sofortige Hilfe<br/>Online: Mo-Fr 9-18 Uhr</p>
                <button className="text-xl font-bold text-gold hover:text-gold-dark">
                  Chat starten <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-navy-dark mb-4">Schreiben Sie uns</h2>
                <p className="text-gray-600 mb-8">
                  Füllen Sie das Formular aus und wir melden uns so schnell wie möglich bei Ihnen.
                </p>

                <form id="contact-form" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Vorname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        required
                        className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition"
                        placeholder="Max"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nachname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        required
                        className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition"
                        placeholder="Mustermann"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      E-Mail-Adresse <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition"
                      placeholder="[email protected]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefon (optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition"
                      placeholder="+49 123 456789"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Betreff <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      required
                      className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition"
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="general">Allgemeine Anfrage</option>
                      <option value="product">Produktfrage</option>
                      <option value="order">Bestellung & Lieferung</option>
                      <option value="technical">Technischer Support</option>
                      <option value="license">Lizenzaktivierung</option>
                      <option value="refund">Rückgabe & Erstattung</option>
                      <option value="partnership">Partnerschaft</option>
                      <option value="other">Sonstiges</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ihre Nachricht <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition resize-none"
                      placeholder="Beschreiben Sie Ihr Anliegen..."
                    ></textarea>
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1 mr-3 accent-gold"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      Ich habe die <a href="/datenschutz" className="text-gold hover:underline">Datenschutzbestimmungen</a> gelesen und akzeptiere diese. <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="submit-btn w-full py-4 text-white font-bold rounded-lg text-lg"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    Nachricht senden
                  </button>

                  {/* Success/Error Messages */}
                  <div id="form-message" className="hidden"></div>
                </form>
              </div>

              {/* Additional Info */}
              <div className="space-y-8">
                {/* FAQ Box */}
                <div className="bg-gradient-to-br from-navy-dark to-navy-medium text-white rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    <i className="fas fa-question-circle mr-3"></i>
                    Häufig gestellte Fragen
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Bevor Sie uns kontaktieren, schauen Sie in unseren FAQ-Bereich. Viele Fragen werden dort bereits beantwortet.
                  </p>
                  <a href="#faq" className="inline-block bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-dark transition">
                    Zu den FAQs <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>

                {/* Office Hours */}
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-navy-dark mb-6">
                    <i className="fas fa-clock mr-3 text-gold"></i>
                    Öffnungszeiten
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-semibold text-navy-dark">Montag - Freitag</span>
                      <span className="text-gray-600">9:00 - 18:00 Uhr</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-semibold text-navy-dark">Samstag</span>
                      <span className="text-gray-600">10:00 - 14:00 Uhr</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-semibold text-navy-dark">Sonntag</span>
                      <span className="text-red-600 font-semibold">Geschlossen</span>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-navy-dark">
                      Schnelle Antwort garantiert
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Wir antworten in der Regel innerhalb von <span className="font-bold text-green-600">24 Stunden</span> auf alle Anfragen. Dringende Anliegen werden bevorzugt behandelt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy-dark mb-4">Unser Standort</h2>
              <p className="text-gray-600 text-lg">Besuchen Sie uns in unserem Büro in Berlin</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Map Placeholder */}
              <div className="map-container flex items-center justify-center text-white">
                <div className="text-center">
                  <i className="fas fa-map-marker-alt text-6xl mb-4 text-gold"></i>
                  <h3 className="text-2xl font-bold mb-2">SOFTWAREKING24 GmbH</h3>
                  <p className="text-lg">Musterstraße 123<br/>10115 Berlin<br/>Deutschland</p>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center text-white text-xl mr-4 flex-shrink-0">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-dark text-lg mb-2">Adresse</h4>
                      <p className="text-gray-600">
                        SOFTWAREKING24 GmbH<br/>
                        Musterstraße 123<br/>
                        10115 Berlin, Deutschland
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center text-white text-xl mr-4 flex-shrink-0">
                      <i className="fas fa-car"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-dark text-lg mb-2">Anfahrt</h4>
                      <p className="text-gray-600">
                        <strong>Mit dem Auto:</strong> Parkplätze direkt vor dem Gebäude<br/>
                        <strong>Mit der Bahn:</strong> S-Bahn Station "Berlin Mitte" (5 Min. Fußweg)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center text-white text-xl mr-4 flex-shrink-0">
                      <i className="fas fa-info-circle"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-dark text-lg mb-2">Wichtig</h4>
                      <p className="text-gray-600">
                        Termine nach Vereinbarung. Bitte kontaktieren Sie uns vorab per Telefon oder E-Mail.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy-dark text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div>
                <div className="mb-4">
                  <img src="/static/logo-footer.png" alt="KING24" className="h-12"/>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Ihr vertrauenswürdiger Partner für Original-Software zu unschlagbaren Preisen. Seit über 10 Jahren am Markt.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-gold transition">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-gold transition">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-gold transition">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="font-bold mb-4 text-gold">Produktkategorien</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/produkte?category=Windows" className="hover:text-white transition"><i className="fab fa-windows mr-2"></i>Windows</a></li>
                  <li><a href="/produkte?category=Microsoft Office" className="hover:text-white transition"><i className="fas fa-file-word mr-2"></i>Microsoft Office</a></li>
                  <li><a href="/produkte?category=Server" className="hover:text-white transition"><i className="fas fa-server mr-2"></i>Server & CAL</a></li>
                  <li><a href="/produkte?category=Antivirus" className="hover:text-white transition"><i className="fas fa-shield-virus mr-2"></i>Antivirus</a></li>
                  <li><a href="/produkte?category=Adobe" className="hover:text-white transition"><i className="fas fa-palette mr-2"></i>Adobe & Design</a></li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h4 className="font-bold mb-4 text-gold">Kundenservice</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/kontakt" className="hover:text-white transition">Kontakt</a></li>
                  <li><a href="#" className="hover:text-white transition">Hilfe & FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition">Versandinformationen</a></li>
                  <li><a href="#" className="hover:text-white transition">Rückgaberecht</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-bold mb-4 text-gold">Rechtliches</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">AGB</a></li>
                  <li><a href="#" className="hover:text-white transition">Datenschutz</a></li>
                  <li><a href="#" className="hover:text-white transition">Impressum</a></li>
                  <li><a href="#" className="hover:text-white transition">Widerrufsrecht</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-400">© 2026 SOFTWAREKING24.de - Alle Rechte vorbehalten</p>
            </div>
          </div>
        </footer>

        {/* Contact Form Script */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.getElementById('contact-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const messageDiv = document.getElementById('form-message');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wird gesendet...';
            
            try {
              const formData = new FormData(e.target);
              const data = {
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
                phone: formData.get('phone') || null,
                subject: formData.get('subject'),
                message: formData.get('message')
              };
              
              const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
              
              const result = await response.json();
              
              if (response.ok && result.success) {
                // Success message
                messageDiv.className = 'bg-green-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-center';
                messageDiv.innerHTML = '<i class="fas fa-check-circle text-2xl mr-3"></i><div><strong>Vielen Dank!</strong><br/>Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.</div>';
                messageDiv.classList.remove('hidden');
                
                // Reset form
                e.target.reset();
                
                // Scroll to message
                messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                throw new Error(result.error || 'Unbekannter Fehler');
              }
            } catch (error) {
              console.error('Contact form error:', error);
              
              // Error message
              messageDiv.className = 'bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-lg flex items-center';
              messageDiv.innerHTML = '<i class="fas fa-exclamation-circle text-2xl mr-3"></i><div><strong>Fehler!</strong><br/>Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail.</div>';
              messageDiv.classList.remove('hidden');
              
              // Scroll to message
              messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } finally {
              // Re-enable button
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;
            }
          });

          // Initialize cart badge
          if (window.cartManager) {
            window.cartManager.updateCartBadge();
          }
        `}} />
      </body>
    </html>
  );
};
