export function FAQPage() {
  return (
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FAQ - Häufig gestellte Fragen | Premium Software Store</title>
        <meta name="description" content="Antworten auf häufig gestellte Fragen zu Softwarelizenzen, Download, Installation und Support." />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          .faq-item {
            border-bottom: 1px solid #e5e7eb;
            transition: all 0.3s ease;
          }
          .faq-item:hover {
            background-color: #f9fafb;
          }
          .faq-question {
            cursor: pointer;
            user-select: none;
          }
          .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
          }
          .faq-answer.active {
            max-height: 1000px;
          }
          .faq-icon {
            transition: transform 0.3s ease;
          }
          .faq-icon.active {
            transform: rotate(180deg);
          }
        `}} />
      </head>
      <body class="bg-gray-50">
        {/* Header */}
        <header class="bg-[#1a2a4e] text-white shadow-lg">
          <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" class="text-2xl font-bold text-[#d4af37]">
              <i class="fas fa-shield-alt mr-2"></i>
              PREMIUM SOFTWARE
            </a>
            <nav class="flex gap-6">
              <a href="/" class="hover:text-[#d4af37] transition">Home</a>
              <a href="/shop" class="hover:text-[#d4af37] transition">Shop</a>
              <a href="/kontakt" class="hover:text-[#d4af37] transition">Kontakt</a>
            </nav>
          </div>
        </header>

        {/* Breadcrumb */}
        <div class="bg-white border-b">
          <div class="container mx-auto px-4 py-3">
            <nav class="flex items-center text-sm text-gray-600">
              <a href="/" class="hover:text-[#d4af37]">Home</a>
              <i class="fas fa-chevron-right mx-2 text-xs"></i>
              <span class="text-gray-900 font-medium">FAQ</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main class="container mx-auto px-4 py-12">
          <div class="max-w-4xl mx-auto">
            {/* Page Header */}
            <div class="text-center mb-12">
              <h1 class="text-4xl font-bold text-[#1a2a4e] mb-4">
                <i class="fas fa-question-circle text-[#d4af37] mr-3"></i>
                Häufig gestellte Fragen (FAQ)
              </h1>
              <p class="text-lg text-gray-600">
                Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Produkten und Services
              </p>
            </div>

            {/* Quick Search */}
            <div class="mb-8">
              <div class="relative">
                <input
                  type="text"
                  placeholder="Suchen Sie nach Ihrer Frage..."
                  class="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-[#d4af37] focus:outline-none text-lg"
                  id="faq-search"
                />
                <i class="fas fa-search absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
              </div>
            </div>

            {/* FAQ Categories */}
            <div class="mb-8">
              <div class="flex flex-wrap gap-3">
                <button class="px-4 py-2 bg-[#1a2a4e] text-white rounded-lg hover:bg-[#d4af37] transition category-btn" data-category="all">
                  Alle
                </button>
                <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-[#d4af37] hover:text-white transition category-btn" data-category="licenses">
                  Lizenzen
                </button>
                <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-[#d4af37] hover:text-white transition category-btn" data-category="download">
                  Download & Installation
                </button>
                <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-[#d4af37] hover:text-white transition category-btn" data-category="payment">
                  Zahlung & Versand
                </button>
                <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-[#d4af37] hover:text-white transition category-btn" data-category="support">
                  Support
                </button>
              </div>
            </div>

            {/* FAQ Sections */}
            <div class="space-y-8">
              {/* Lizenzen */}
              <section data-category="licenses">
                <h2 class="text-2xl font-bold text-[#1a2a4e] mb-4 flex items-center">
                  <i class="fas fa-key text-[#d4af37] mr-3"></i>
                  Lizenzen & Produktschlüssel
                </h2>
                <div class="bg-white rounded-lg shadow-md">
                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Was ist ein Produktschlüssel und wie erhalte ich ihn?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Ein Produktschlüssel (auch Lizenzschlüssel genannt) ist ein eindeutiger alphanumerischer Code, der zur Aktivierung Ihrer Software benötigt wird. Nach erfolgreichem Zahlungseingang erhalten Sie Ihren Produktschlüssel automatisch per E-Mail innerhalb weniger Minuten. Zusätzlich können Sie den Schlüssel jederzeit in Ihrem Kundenkonto unter "Meine Lizenzen" einsehen.
                      </p>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Wie lange ist meine Lizenz gültig?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Alle unsere Lizenzen sind <strong>Vollversionen</strong> ohne zeitliche Begrenzung. Einmal aktiviert, können Sie die Software zeitlich unbegrenzt nutzen. Bei Microsoft 365 Abonnements gilt die jeweilige Laufzeit (z.B. 1 Jahr), die Sie bei der Produktbeschreibung einsehen können. Nach Ablauf können Sie das Abonnement verlängern.
                      </p>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Kann ich meinen Produktschlüssel auf mehreren Geräten verwenden?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Dies hängt von der jeweiligen Lizenz ab. Die meisten Einzellizenzen (z.B. Windows 10 Home, Office 2021) können nur auf einem Gerät aktiviert werden. Office Home & Student sowie Office Home & Business erlauben die Installation auf mehreren Geräten für den privaten Gebrauch eines einzelnen Nutzers. Die genauen Lizenzbedingungen finden Sie in der jeweiligen Produktbeschreibung.
                      </p>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Was mache ich, wenn mein Produktschlüssel nicht funktioniert?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Bitte überprüfen Sie zunächst, ob Sie den Produktschlüssel korrekt eingegeben haben (ohne Leerzeichen, keine Verwechslung von 0/O oder 1/I). Falls der Schlüssel weiterhin nicht akzeptiert wird, kontaktieren Sie bitte unseren Support über das <a href="/kontakt" class="text-[#d4af37] hover:underline">Kontaktformular</a> oder per E-Mail. Wir helfen Ihnen umgehend weiter und liefern bei Bedarf einen Ersatzschlüssel.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Download & Installation */}
              <section data-category="download">
                <h2 class="text-2xl font-bold text-[#1a2a4e] mb-4 flex items-center">
                  <i class="fas fa-download text-[#d4af37] mr-3"></i>
                  Download & Installation
                </h2>
                <div class="bg-white rounded-lg shadow-md">
                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Wo kann ich die Software herunterladen?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Download-Links finden Sie in Ihrer Bestätigungs-E-Mail sowie in Ihrem Kundenkonto unter "Meine Downloads". Für viele Microsoft-Produkte können Sie die Software auch direkt von der offiziellen Microsoft-Website herunterladen. Wir stellen Ihnen ebenfalls direkte Download-Links zu vertrauenswürdigen Quellen zur Verfügung.
                      </p>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Sind die Downloads sicher und virenfrei?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Ja, absolut. Wir verlinken ausschließlich zu offiziellen Herstellerseiten (Microsoft, Adobe, etc.) oder bieten geprüfte ISO-Dateien an. Alle Download-Links sind SSL-verschlüsselt und die Dateien sind virenfrei. Wir empfehlen dennoch, vor der Installation einen aktuellen Virenscanner zu verwenden.
                      </p>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Wie installiere ich die Software?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Nach dem Download führen Sie einfach die Installationsdatei aus und folgen den Anweisungen des Setup-Assistenten. Während oder nach der Installation werden Sie zur Eingabe Ihres Produktschlüssels aufgefordert. Detaillierte Installationsanleitungen finden Sie in Ihrer Bestätigungs-E-Mail sowie in unserem Download-Bereich.
                      </p>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Kann ich die Software auf einem USB-Stick speichern?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Ja, Sie können die Installationsdateien auf einem USB-Stick oder einer externen Festplatte speichern. Dies ermöglicht eine spätere Neuinstallation ohne erneuten Download. Beachten Sie, dass der Produktschlüssel separat aufbewahrt werden sollte.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Zahlung & Versand */}
              <section data-category="payment">
                <h2 class="text-2xl font-bold text-[#1a2a4e] mb-4 flex items-center">
                  <i class="fas fa-credit-card text-[#d4af37] mr-3"></i>
                  Zahlung & Versand
                </h2>
                <div class="bg-white rounded-lg shadow-md">
                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Welche Zahlungsmethoden werden akzeptiert?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed mb-3">
                        Wir akzeptieren folgende Zahlungsmethoden:
                      </p>
                      <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li><i class="fas fa-credit-card text-[#d4af37] mr-2"></i>Kreditkarte (Visa, Mastercard, American Express)</li>
                        <li><i class="fab fa-paypal text-[#d4af37] mr-2"></i>PayPal</li>
                        <li><i class="fas fa-university text-[#d4af37] mr-2"></i>SEPA-Lastschrift</li>
                        <li><i class="fas fa-money-check-alt text-[#d4af37] mr-2"></i>Sofortüberweisung</li>
                        <li><i class="fas fa-shopping-cart text-[#d4af37] mr-2"></i>Kauf auf Rechnung (für Geschäftskunden)</li>
                      </ul>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Wie schnell erhalte ich meine Lizenz nach der Zahlung?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Bei Zahlung per Kreditkarte, PayPal oder Sofortüberweisung erfolgt die Lieferung des Produktschlüssels <strong>sofort nach Zahlungseingang</strong> – in der Regel innerhalb von <strong>5-15 Minuten</strong>. Bei SEPA-Lastschrift und Überweisung kann die Bearbeitung 1-3 Werktage dauern.
                      </p>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Ist die Zahlung sicher?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Ja, alle Zahlungen werden über sichere, SSL-verschlüsselte Verbindungen abgewickelt. Wir speichern keine Kreditkartendaten auf unseren Servern. Die Zahlungsabwicklung erfolgt durch zertifizierte Payment-Provider (Stripe, PayPal), die höchste Sicherheitsstandards (PCI-DSS) erfüllen.
                      </p>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Fallen Versandkosten an?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Nein, da wir ausschließlich <strong>digitale Produkte</strong> anbieten, fallen <strong>keine Versandkosten</strong> an. Sie erhalten Ihren Produktschlüssel per E-Mail direkt nach der Zahlung – schnell, einfach und umweltfreundlich.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Support */}
              <section data-category="support">
                <h2 class="text-2xl font-bold text-[#1a2a4e] mb-4 flex items-center">
                  <i class="fas fa-headset text-[#d4af37] mr-3"></i>
                  Support & Kundenservice
                </h2>
                <div class="bg-white rounded-lg shadow-md">
                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Wie kann ich den Support kontaktieren?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed mb-3">
                        Unser Support-Team ist auf mehreren Wegen erreichbar:
                      </p>
                      <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li><i class="fas fa-envelope text-[#d4af37] mr-2"></i>E-Mail: <a href="mailto:support@premiumsoftwarestore.de" class="text-[#d4af37] hover:underline">support@premiumsoftwarestore.de</a></li>
                        <li><i class="fas fa-phone text-[#d4af37] mr-2"></i>Telefon: +49 123 456 789 (Mo-Fr 09:00-18:00)</li>
                        <li><i class="fas fa-comment-dots text-[#d4af37] mr-2"></i>Live-Chat auf unserer Website (Mo-Fr 09:00-18:00)</li>
                        <li><i class="fas fa-file-alt text-[#d4af37] mr-2"></i><a href="/kontakt" class="text-[#d4af37] hover:underline">Kontaktformular</a></li>
                      </ul>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Wie schnell erhalte ich eine Antwort vom Support?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Wir bemühen uns, alle Anfragen innerhalb von <strong>24 Stunden</strong> zu beantworten. Bei dringenden Problemen empfehlen wir den Live-Chat oder die telefonische Kontaktaufnahme während unserer Öffnungszeiten für eine schnellere Lösung.
                      </p>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Bieten Sie technischen Support für die Software an?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Wir unterstützen Sie gerne bei Fragen zur Lizenzaktivierung, zum Download und zur Installation. Für technischen Support zur Software selbst wenden Sie sich bitte direkt an den Hersteller (z.B. Microsoft Support für Windows/Office). Wir helfen Ihnen aber gerne mit Kontaktinformationen und ersten Lösungsansätzen weiter.
                      </p>
                    </div>
                  </div>

                  <div class="faq-item p-6">
                    <div class="faq-question flex justify-between items-start" onclick="toggleFAQ(this)">
                      <div class="flex-1">
                        <h3 class="font-bold text-lg text-[#1a2a4e] mb-2">
                          Habe ich ein Widerrufsrecht?
                        </h3>
                      </div>
                      <i class="fas fa-chevron-down text-[#d4af37] text-xl faq-icon ml-4"></i>
                    </div>
                    <div class="faq-answer mt-4">
                      <p class="text-gray-700 leading-relaxed">
                        Bei digitalen Inhalten erlischt das Widerrufsrecht gemäß § 356 Abs. 5 BGB, sobald Sie mit dem Herunterladen oder der Verwendung des Produktschlüssels begonnen haben und Sie der vorzeitigen Vertragserfüllung ausdrücklich zugestimmt haben. Details finden Sie in unserer <a href="/widerrufsbelehrung" class="text-[#d4af37] hover:underline">Widerrufsbelehrung</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Still have questions? */}
            <div class="mt-12 bg-gradient-to-r from-[#1a2a4e] to-[#2a3a5e] rounded-lg p-8 text-white text-center">
              <i class="fas fa-comments text-[#d4af37] text-5xl mb-4"></i>
              <h2 class="text-2xl font-bold mb-3">Haben Sie noch Fragen?</h2>
              <p class="text-lg mb-6 opacity-90">
                Unser Support-Team hilft Ihnen gerne weiter!
              </p>
              <a
                href="/kontakt"
                class="inline-block bg-[#d4af37] text-[#1a2a4e] px-8 py-3 rounded-lg font-bold hover:bg-[#f4d03f] transition"
              >
                <i class="fas fa-envelope mr-2"></i>
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer class="bg-[#1a2a4e] text-white mt-16">
          <div class="container mx-auto px-4 py-8">
            <div class="grid md:grid-cols-4 gap-8">
              <div>
                <h3 class="font-bold text-lg mb-4 text-[#d4af37]">Informationen</h3>
                <ul class="space-y-2">
                  <li><a href="/ueber-uns" class="hover:text-[#d4af37] transition">Über Uns</a></li>
                  <li><a href="/agb" class="hover:text-[#d4af37] transition">AGB</a></li>
                  <li><a href="/datenschutz" class="hover:text-[#d4af37] transition">Datenschutz</a></li>
                  <li><a href="/impressum" class="hover:text-[#d4af37] transition">Impressum</a></li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-4 text-[#d4af37]">Service</h3>
                <ul class="space-y-2">
                  <li><a href="/kontakt" class="hover:text-[#d4af37] transition">Kontakt</a></li>
                  <li><a href="/faq" class="hover:text-[#d4af37] transition">FAQ</a></li>
                  <li><a href="/downloads" class="hover:text-[#d4af37] transition">Downloads</a></li>
                  <li><a href="/versand" class="hover:text-[#d4af37] transition">Versand & Zahlung</a></li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-4 text-[#d4af37]">Rechtliches</h3>
                <ul class="space-y-2">
                  <li><a href="/widerrufsbelehrung" class="hover:text-[#d4af37] transition">Widerrufsbelehrung</a></li>
                  <li><a href="/versand" class="hover:text-[#d4af37] transition">Zahlungsbedingungen</a></li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-4 text-[#d4af37]">Kontakt</h3>
                <p class="text-sm opacity-90">
                  <i class="fas fa-phone mr-2"></i>+49 123 456 789<br/>
                  <i class="fas fa-envelope mr-2 mt-2 inline-block"></i>support@premiumsoftwarestore.de
                </p>
              </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-6 text-center text-sm opacity-75">
              © 2026 Premium Software Store GmbH. Alle Rechte vorbehalten.
            </div>
          </div>
        </footer>

        <script dangerouslySetInnerHTML={{ __html: `
          function toggleFAQ(element) {
            const answer = element.nextElementSibling;
            const icon = element.querySelector('.faq-icon');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(a => {
              if (a !== answer) {
                a.classList.remove('active');
              }
            });
            document.querySelectorAll('.faq-icon').forEach(i => {
              if (i !== icon) {
                i.classList.remove('active');
              }
            });
            
            // Toggle current FAQ
            answer.classList.toggle('active');
            icon.classList.toggle('active');
          }

          // Category filtering
          document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
              const category = this.dataset.category;
              
              // Update active button
              document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('bg-[#1a2a4e]', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
              });
              this.classList.remove('bg-gray-200', 'text-gray-700');
              this.classList.add('bg-[#1a2a4e]', 'text-white');
              
              // Filter sections
              document.querySelectorAll('section[data-category]').forEach(section => {
                if (category === 'all' || section.dataset.category === category) {
                  section.style.display = 'block';
                } else {
                  section.style.display = 'none';
                }
              });
            });
          });

          // Search functionality
          document.getElementById('faq-search').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            document.querySelectorAll('.faq-item').forEach(item => {
              const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
              const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
              
              if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
              } else {
                item.style.display = 'none';
              }
            });
          });
        `}} />
      </body>
    </html>
  )
}
