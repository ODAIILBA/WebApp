// Checkout Page (Kasse) - German First, Multi-step with Guest Checkout
import type { FC } from 'hono/jsx'

export const Checkout: FC = () => {
  return (
    <html lang="de">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kasse - Sichere Bestellung</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link 
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" 
          rel="stylesheet" 
        />
        <style dangerouslySetInnerHTML={{__html: `
          .step-indicator {
            position: relative;
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
          }
          
          .step {
            flex: 1;
            text-align: center;
            position: relative;
          }
          
          .step::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 50%;
            right: -50%;
            height: 2px;
            background: #e5e7eb;
            z-index: 1;
          }
          
          .step:last-child::before {
            display: none;
          }
          
          .step.active::before,
          .step.completed::before {
            background: #10b981;
          }
          
          .step-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #e5e7eb;
            color: #6b7280;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            position: relative;
            z-index: 2;
            margin-bottom: 8px;
          }
          
          .step.active .step-circle {
            background: #3b82f6;
            color: white;
          }
          
          .step.completed .step-circle {
            background: #10b981;
            color: white;
          }
          
          .checkout-section {
            display: none;
          }
          
          .checkout-section.active {
            display: block;
          }
          
          .form-control {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.2s;
          }
          
          .form-control:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .form-control.error {
            border-color: #ef4444;
          }
          
          .error-message {
            color: #ef4444;
            font-size: 12px;
            margin-top: 4px;
          }
        `}} />
      </head>
      <body class="bg-gray-50">
        {/* Header */}
        <header class="bg-white shadow-sm border-b border-gray-200">
          <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
              <a href="/" class="text-2xl font-bold text-gray-900">
                <i class="fas fa-shopping-bag text-blue-600 mr-2"></i>
                Premium Software Store
              </a>
              <div class="flex items-center gap-4">
                <a href="/warenkorb" class="text-gray-600 hover:text-gray-900">
                  <i class="fas fa-arrow-left mr-2"></i>
                  Zurück zum Warenkorb
                </a>
                <div class="flex items-center gap-2 text-green-600">
                  <i class="fas fa-lock"></i>
                  <span class="font-medium">Sichere Verbindung</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div class="container mx-auto px-4 py-8">
          <div class="max-w-6xl mx-auto">
            
            {/* Progress Steps */}
            <div class="step-indicator mb-8">
              <div class="step active" data-step="1">
                <div class="step-circle">1</div>
                <div class="text-sm font-medium">Kundendaten</div>
              </div>
              <div class="step" data-step="2">
                <div class="step-circle">2</div>
                <div class="text-sm font-medium">Rechnungsadresse</div>
              </div>
              <div class="step" data-step="3">
                <div class="step-circle">3</div>
                <div class="text-sm font-medium">Zahlungsmethode</div>
              </div>
              <div class="step" data-step="4">
                <div class="step-circle">4</div>
                <div class="text-sm font-medium">Bestellung prüfen</div>
              </div>
            </div>

            <div class="grid lg:grid-cols-3 gap-8">
              {/* Main Content - Left Side (2/3) */}
              <div class="lg:col-span-2">
                
                {/* Step 1: Customer Type Selection */}
                <div class="checkout-section active" id="step-1">
                  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">
                      <i class="fas fa-user mr-3 text-blue-600"></i>
                      Kundendaten
                    </h2>

                    {/* Guest vs Account Selection */}
                    <div class="grid md:grid-cols-2 gap-4 mb-6">
                      <div class="border-2 border-blue-600 rounded-lg p-6 cursor-pointer hover:bg-blue-50 transition-colors" id="guest-checkout-option">
                        <div class="flex items-center justify-between mb-3">
                          <h3 class="text-lg font-semibold text-gray-900">Als Gast bestellen</h3>
                          <input type="radio" name="checkout-type" value="guest" checked class="w-5 h-5 text-blue-600" />
                        </div>
                        <p class="text-sm text-gray-600">Schnelle Bestellung ohne Registrierung</p>
                        <ul class="mt-3 text-sm text-gray-600 space-y-1">
                          <li><i class="fas fa-check text-green-500 mr-2"></i>Keine Registrierung nötig</li>
                          <li><i class="fas fa-check text-green-500 mr-2"></i>Schneller Checkout</li>
                          <li><i class="fas fa-check text-green-500 mr-2"></i>Sofortiger Zugang</li>
                        </ul>
                      </div>

                      <div class="border-2 border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors" id="account-checkout-option">
                        <div class="flex items-center justify-between mb-3">
                          <h3 class="text-lg font-semibold text-gray-900">Mit Konto bestellen</h3>
                          <input type="radio" name="checkout-type" value="account" class="w-5 h-5 text-blue-600" />
                        </div>
                        <p class="text-sm text-gray-600">Für registrierte Kunden</p>
                        <ul class="mt-3 text-sm text-gray-600 space-y-1">
                          <li><i class="fas fa-check text-green-500 mr-2"></i>Bestellhistorie</li>
                          <li><i class="fas fa-check text-green-500 mr-2"></i>Gespeicherte Adressen</li>
                          <li><i class="fas fa-check text-green-500 mr-2"></i>Lizenzenverwaltung</li>
                        </ul>
                      </div>
                    </div>

                    {/* Guest Checkout Form */}
                    <div id="guest-form">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4">Kontaktinformationen</h3>
                      <div class="grid md:grid-cols-2 gap-4">
                        <div class="form-group">
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            Vorname <span class="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="first-name" 
                            class="form-control" 
                            placeholder="Max"
                            required
                          />
                          <div class="error-message hidden" id="first-name-error"></div>
                        </div>

                        <div class="form-group">
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            Nachname <span class="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="last-name" 
                            class="form-control" 
                            placeholder="Mustermann"
                            required
                          />
                          <div class="error-message hidden" id="last-name-error"></div>
                        </div>
                      </div>

                      <div class="form-group mt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          E-Mail-Adresse <span class="text-red-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          class="form-control" 
                          placeholder="max.mustermann@example.com"
                          required
                        />
                        <p class="text-xs text-gray-500 mt-1">
                          <i class="fas fa-info-circle mr-1"></i>
                          Ihre Lizenzen werden an diese E-Mail-Adresse gesendet
                        </p>
                        <div class="error-message hidden" id="email-error"></div>
                      </div>

                      <div class="form-group mt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Telefonnummer (optional)
                        </label>
                        <input 
                          type="tel" 
                          id="phone" 
                          class="form-control" 
                          placeholder="+49 123 456789"
                        />
                      </div>
                    </div>

                    {/* Login Form (hidden initially) */}
                    <div id="login-form" class="hidden">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4">In Ihr Konto einloggen</h3>
                      <div class="form-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">E-Mail-Adresse</label>
                        <input type="email" class="form-control" placeholder="ihre@email.de" />
                      </div>
                      <div class="form-group mt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Passwort</label>
                        <input type="password" class="form-control" placeholder="••••••••" />
                      </div>
                      <div class="flex items-center justify-between mt-4">
                        <label class="flex items-center">
                          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" />
                          <span class="ml-2 text-sm text-gray-700">Angemeldet bleiben</span>
                        </label>
                        <a href="/passwort-vergessen" class="text-sm text-blue-600 hover:text-blue-700">Passwort vergessen?</a>
                      </div>
                      <button class="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                        Einloggen
                      </button>
                      <p class="text-center text-sm text-gray-600 mt-4">
                        Noch kein Konto? <a href="/registrieren" class="text-blue-600 hover:text-blue-700">Jetzt registrieren</a>
                      </p>
                    </div>

                    <div class="mt-6 flex justify-end">
                      <button id="continue-to-step-2" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Weiter zur Rechnungsadresse
                        <i class="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 2: Billing Address */}
                <div class="checkout-section" id="step-2">
                  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">
                      <i class="fas fa-map-marker-alt mr-3 text-blue-600"></i>
                      Rechnungsadresse
                    </h2>

                    <div class="grid md:grid-cols-2 gap-4">
                      <div class="md:col-span-2 form-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Firma (optional)
                        </label>
                        <input 
                          type="text" 
                          id="company" 
                          class="form-control" 
                          placeholder="Firmenname GmbH"
                        />
                      </div>

                      <div class="form-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Straße <span class="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="street" 
                          class="form-control" 
                          placeholder="Musterstraße"
                          required
                        />
                      </div>

                      <div class="form-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Hausnummer <span class="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="house-number" 
                          class="form-control" 
                          placeholder="123"
                          required
                        />
                      </div>

                      <div class="form-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Postleitzahl <span class="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="postal-code" 
                          class="form-control" 
                          placeholder="12345"
                          required
                        />
                      </div>

                      <div class="form-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Stadt <span class="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="city" 
                          class="form-control" 
                          placeholder="Berlin"
                          required
                        />
                      </div>

                      <div class="md:col-span-2 form-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Land <span class="text-red-500">*</span>
                        </label>
                        <select id="country" class="form-control" required>
                          <option value="DE" selected>Deutschland</option>
                          <option value="AT">Österreich</option>
                          <option value="CH">Schweiz</option>
                          <option value="NL">Niederlande</option>
                          <option value="BE">Belgien</option>
                          <option value="LU">Luxemburg</option>
                          <option value="FR">Frankreich</option>
                          <option value="IT">Italien</option>
                          <option value="ES">Spanien</option>
                          <option value="PL">Polen</option>
                          <option value="CZ">Tschechien</option>
                          <option value="other">Anderes Land</option>
                        </select>
                      </div>

                      {/* VAT ID for businesses */}
                      <div class="md:col-span-2 form-group">
                        <label class="flex items-center mb-2">
                          <input type="checkbox" id="is-business" class="w-4 h-4 text-blue-600 rounded mr-2" />
                          <span class="text-sm font-medium text-gray-700">Ich kaufe als Unternehmen</span>
                        </label>
                        <div id="vat-field" class="hidden mt-2">
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            USt-IdNr. (optional für EU-Unternehmen)
                          </label>
                          <input 
                            type="text" 
                            id="vat-id" 
                            class="form-control" 
                            placeholder="DE123456789"
                          />
                          <p class="text-xs text-gray-500 mt-1">
                            Bei gültiger USt-IdNr. wird die Mehrwertsteuer nicht berechnet (Reverse Charge)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="mt-6 flex justify-between">
                      <button id="back-to-step-1" class="text-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Zurück
                      </button>
                      <button id="continue-to-step-3" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Weiter zur Zahlung
                        <i class="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3: Payment Method */}
                <div class="checkout-section" id="step-3">
                  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">
                      <i class="fas fa-credit-card mr-3 text-blue-600"></i>
                      Zahlungsmethode wählen
                    </h2>

                    <div class="space-y-4">
                      {/* Credit Card */}
                      <div class="border-2 border-blue-600 rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition-colors payment-option" data-method="card">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-4">
                            <input type="radio" name="payment-method" value="card" checked class="w-5 h-5 text-blue-600" />
                            <div>
                              <h3 class="font-semibold text-gray-900">Kreditkarte / Debitkarte</h3>
                              <p class="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                            </div>
                          </div>
                          <div class="flex gap-2">
                            <i class="fab fa-cc-visa text-3xl text-blue-600"></i>
                            <i class="fab fa-cc-mastercard text-3xl text-red-600"></i>
                            <i class="fab fa-cc-amex text-3xl text-blue-400"></i>
                          </div>
                        </div>
                        <div class="mt-4 pl-9 payment-details">
                          <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600 mb-2">
                              <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                              Sie werden zu Stripe weitergeleitet für eine sichere Zahlung
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* PayPal */}
                      <div class="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors payment-option" data-method="paypal">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-4">
                            <input type="radio" name="payment-method" value="paypal" class="w-5 h-5 text-blue-600" />
                            <div>
                              <h3 class="font-semibold text-gray-900">PayPal</h3>
                              <p class="text-sm text-gray-600">Schnell und sicher mit PayPal zahlen</p>
                            </div>
                          </div>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="PayPal" class="h-8" />
                        </div>
                        <div class="mt-4 pl-9 payment-details hidden">
                          <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">
                              <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                              Sie werden zu PayPal weitergeleitet
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* SEPA Direct Debit */}
                      <div class="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors payment-option" data-method="sepa">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-4">
                            <input type="radio" name="payment-method" value="sepa" class="w-5 h-5 text-blue-600" />
                            <div>
                              <h3 class="font-semibold text-gray-900">SEPA-Lastschrift</h3>
                              <p class="text-sm text-gray-600">Zahlung per Bankeinzug</p>
                            </div>
                          </div>
                          <i class="fas fa-university text-3xl text-gray-600"></i>
                        </div>
                        <div class="mt-4 pl-9 payment-details hidden">
                          <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="form-group">
                              <label class="block text-sm font-medium text-gray-700 mb-2">IBAN</label>
                              <input type="text" class="form-control" placeholder="DE89 3704 0044 0532 0130 00" />
                            </div>
                            <div class="form-group mt-3">
                              <label class="block text-sm font-medium text-gray-700 mb-2">Kontoinhaber</label>
                              <input type="text" class="form-control" placeholder="Max Mustermann" />
                            </div>
                            <p class="text-xs text-gray-500 mt-2">
                              <i class="fas fa-shield-alt text-green-500 mr-1"></i>
                              Ihre Bankdaten werden verschlüsselt übertragen
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Klarna */}
                      <div class="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors payment-option" data-method="klarna">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-4">
                            <input type="radio" name="payment-method" value="klarna" class="w-5 h-5 text-blue-600" />
                            <div>
                              <h3 class="font-semibold text-gray-900">Klarna</h3>
                              <p class="text-sm text-gray-600">Jetzt kaufen, später zahlen</p>
                            </div>
                          </div>
                          <div class="text-pink-500 font-bold text-2xl">klarna</div>
                        </div>
                        <div class="mt-4 pl-9 payment-details hidden">
                          <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">
                              <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                              Sie werden zu Klarna weitergeleitet. Zahlen Sie in 30 Tagen oder in Raten.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-6 flex justify-between">
                      <button id="back-to-step-2" class="text-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Zurück
                      </button>
                      <button id="continue-to-step-4" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Bestellung prüfen
                        <i class="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 4: Review Order */}
                <div class="checkout-section" id="step-4">
                  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">
                      <i class="fas fa-check-circle mr-3 text-blue-600"></i>
                      Bestellung prüfen & abschließen
                    </h2>

                    {/* Order Summary */}
                    <div class="space-y-6">
                      {/* Customer Details */}
                      <div class="border-b border-gray-200 pb-4">
                        <h3 class="font-semibold text-gray-900 mb-3">Kundendaten</h3>
                        <div class="text-sm text-gray-600">
                          <p id="review-name"></p>
                          <p id="review-email"></p>
                          <p id="review-phone"></p>
                        </div>
                        <button class="text-sm text-blue-600 hover:text-blue-700 mt-2" onclick="goToStep(1)">
                          <i class="fas fa-edit mr-1"></i>Bearbeiten
                        </button>
                      </div>

                      {/* Billing Address */}
                      <div class="border-b border-gray-200 pb-4">
                        <h3 class="font-semibold text-gray-900 mb-3">Rechnungsadresse</h3>
                        <div class="text-sm text-gray-600">
                          <p id="review-company"></p>
                          <p id="review-address"></p>
                          <p id="review-city"></p>
                          <p id="review-country"></p>
                          <p id="review-vat"></p>
                        </div>
                        <button class="text-sm text-blue-600 hover:text-blue-700 mt-2" onclick="goToStep(2)">
                          <i class="fas fa-edit mr-1"></i>Bearbeiten
                        </button>
                      </div>

                      {/* Payment Method */}
                      <div class="border-b border-gray-200 pb-4">
                        <h3 class="font-semibold text-gray-900 mb-3">Zahlungsmethode</h3>
                        <div class="text-sm text-gray-600">
                          <p id="review-payment"></p>
                        </div>
                        <button class="text-sm text-blue-600 hover:text-blue-700 mt-2" onclick="goToStep(3)">
                          <i class="fas fa-edit mr-1"></i>Bearbeiten
                        </button>
                      </div>

                      {/* GDPR Consents */}
                      <div class="space-y-3">
                        <label class="flex items-start">
                          <input type="checkbox" id="terms-checkbox" class="w-5 h-5 text-blue-600 rounded mt-1 mr-3" required />
                          <span class="text-sm text-gray-700">
                            Ich habe die <a href="/agb" target="_blank" class="text-blue-600 hover:underline">AGB</a> und 
                            <a href="/datenschutz" target="_blank" class="text-blue-600 hover:underline"> Datenschutzerklärung</a> gelesen und akzeptiere diese. 
                            <span class="text-red-500">*</span>
                          </span>
                        </label>

                        <label class="flex items-start">
                          <input type="checkbox" id="withdrawal-checkbox" class="w-5 h-5 text-blue-600 rounded mt-1 mr-3" required />
                          <span class="text-sm text-gray-700">
                            Ich wurde über mein <a href="/widerrufsrecht" target="_blank" class="text-blue-600 hover:underline">Widerrufsrecht</a> informiert und stimme zu, dass die Vertragserfüllung vor Ablauf der Widerrufsfrist beginnt. Mir ist bekannt, dass mein Widerrufsrecht bei vollständiger Vertragserfüllung erlischt. 
                            <span class="text-red-500">*</span>
                          </span>
                        </label>

                        <label class="flex items-start">
                          <input type="checkbox" id="newsletter-checkbox" class="w-5 h-5 text-blue-600 rounded mt-1 mr-3" />
                          <span class="text-sm text-gray-700">
                            Ich möchte den Newsletter mit Angeboten und Neuigkeiten erhalten (optional, jederzeit kündbar)
                          </span>
                        </label>
                      </div>
                    </div>

                    <div class="mt-6 flex justify-between">
                      <button id="back-to-step-3" class="text-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Zurück
                      </button>
                      <button id="place-order-btn" class="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg">
                        <i class="fas fa-lock mr-2"></i>
                        Zahlungspflichtig bestellen
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Order Summary Sidebar - Right Side (1/3) */}
              <div class="lg:col-span-1">
                <div class="bg-white rounded-lg shadow-md p-6 sticky top-6">
                  <h2 class="text-xl font-semibold text-gray-900 mb-4">Bestellübersicht</h2>

                  {/* Cart Items */}
                  <div class="space-y-4 mb-6 pb-6 border-b border-gray-200" id="order-items">
                    {/* Items will be loaded from cart */}
                  </div>

                  {/* Price Summary */}
                  <div class="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div class="flex justify-between text-gray-600">
                      <span>Zwischensumme:</span>
                      <span id="order-subtotal">€0,00</span>
                    </div>
                    
                    <div id="order-discount-row" class="hidden flex justify-between text-green-600">
                      <span>Rabatt:</span>
                      <span id="order-discount">-€0,00</span>
                    </div>

                    <div class="flex justify-between text-gray-600">
                      <span>MwSt. (19%):</span>
                      <span id="order-vat">€0,00</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div class="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                    <span>Gesamt:</span>
                    <span id="order-total">€0,00</span>
                  </div>

                  {/* Security Features */}
                  <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h3 class="font-semibold text-green-900 text-sm mb-2">
                      <i class="fas fa-shield-alt mr-2"></i>
                      Ihre Vorteile
                    </h3>
                    <ul class="text-xs text-green-800 space-y-2">
                      <li><i class="fas fa-check mr-2"></i>Sofortiger Download nach Zahlung</li>
                      <li><i class="fas fa-check mr-2"></i>30 Tage Geld-zurück-Garantie</li>
                      <li><i class="fas fa-check mr-2"></i>SSL-verschlüsselte Zahlung</li>
                      <li><i class="fas fa-check mr-2"></i>Original-Lizenzen vom Hersteller</li>
                      <li><i class="fas fa-check mr-2"></i>Deutscher Kundensupport</li>
                    </ul>
                  </div>

                  {/* Trust Badges */}
                  <div class="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                    <div class="text-center">
                      <i class="fas fa-lock text-2xl text-green-500 mb-1"></i>
                      <p class="text-xs text-gray-600">SSL-Sicher</p>
                    </div>
                    <div class="text-center">
                      <i class="fas fa-shield-alt text-2xl text-blue-500 mb-1"></i>
                      <p class="text-xs text-gray-600">DSGVO</p>
                    </div>
                    <div class="text-center">
                      <i class="fas fa-award text-2xl text-yellow-500 mb-1"></i>
                      <p class="text-xs text-gray-600">Geprüft</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer class="bg-white border-t border-gray-200 mt-12 py-6">
          <div class="container mx-auto px-4">
            <div class="flex items-center justify-between text-sm text-gray-600">
              <p>© 2024 Premium Software Store. Alle Rechte vorbehalten.</p>
              <div class="flex gap-6">
                <a href="/agb" class="hover:text-gray-900">AGB</a>
                <a href="/datenschutz" class="hover:text-gray-900">Datenschutz</a>
                <a href="/impressum" class="hover:text-gray-900">Impressum</a>
                <a href="/widerrufsrecht" class="hover:text-gray-900">Widerrufsrecht</a>
                <a href="/kontakt" class="hover:text-gray-900">Kontakt</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Checkout JavaScript */}
        <script dangerouslySetInnerHTML={{__html: `
          let currentStep = 1;
          let checkoutData = {
            customer: {},
            address: {},
            payment: 'card'
          };
          let cart = { items: [], subtotal: 0, discount: 0, vat: 0, total: 0 };

          const VAT_RATE = 0.19;

          // Initialize checkout
          function initCheckout() {
            loadCartData();
            renderOrderSummary();
            setupEventListeners();
          }

          // Load cart from localStorage
          function loadCartData() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
              cart.items = JSON.parse(savedCart);
            } else {
              // Demo cart for testing
              cart.items = [
                {
                  id: 1,
                  name: 'Microsoft Office 2024 Professional Plus',
                  price: 89.99,
                  quantity: 1,
                  image: 'https://via.placeholder.com/100x100?text=Office'
                },
                {
                  id: 2,
                  name: 'Adobe Creative Cloud All Apps',
                  price: 149.99,
                  quantity: 1,
                  image: 'https://via.placeholder.com/100x100?text=Adobe'
                }
              ];
            }
            
            calculateTotals();
          }

          // Calculate totals
          function calculateTotals() {
            cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const afterDiscount = cart.subtotal - cart.discount;
            cart.vat = afterDiscount * VAT_RATE;
            cart.total = afterDiscount + cart.vat;
          }

          // Format price
          function formatPrice(price) {
            return '€' + price.toFixed(2).replace('.', ',');
          }

          // Render order summary
          function renderOrderSummary() {
            const container = document.getElementById('order-items');
            container.innerHTML = '';
            
            cart.items.forEach(item => {
              const itemDiv = document.createElement('div');
              itemDiv.className = 'flex gap-3';
              itemDiv.innerHTML = \`
                <img src="\${item.image}" alt="\${item.name}" class="w-16 h-16 object-cover rounded" />
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">\${item.name}</p>
                  <p class="text-xs text-gray-600">Menge: \${item.quantity}</p>
                  <p class="text-sm font-semibold text-gray-900 mt-1">\${formatPrice(item.price * item.quantity)}</p>
                </div>
              \`;
              container.appendChild(itemDiv);
            });
            
            document.getElementById('order-subtotal').textContent = formatPrice(cart.subtotal);
            document.getElementById('order-vat').textContent = formatPrice(cart.vat);
            document.getElementById('order-total').textContent = formatPrice(cart.total);
            
            if (cart.discount > 0) {
              document.getElementById('order-discount-row').classList.remove('hidden');
              document.getElementById('order-discount').textContent = '-' + formatPrice(cart.discount);
            }
          }

          // Setup event listeners
          function setupEventListeners() {
            // Step navigation
            document.getElementById('continue-to-step-2').addEventListener('click', () => {
              if (validateStep1()) {
                goToStep(2);
              }
            });
            
            document.getElementById('back-to-step-1').addEventListener('click', () => goToStep(1));
            document.getElementById('continue-to-step-3').addEventListener('click', () => {
              if (validateStep2()) {
                goToStep(3);
              }
            });
            
            document.getElementById('back-to-step-2').addEventListener('click', () => goToStep(2));
            document.getElementById('continue-to-step-4').addEventListener('click', () => {
              updateReviewSection();
              goToStep(4);
            });
            
            document.getElementById('back-to-step-3').addEventListener('click', () => goToStep(3));
            
            // Place order
            document.getElementById('place-order-btn').addEventListener('click', placeOrder);
            
            // Checkout type toggle
            document.getElementById('guest-checkout-option').addEventListener('click', () => {
              document.querySelector('input[name="checkout-type"][value="guest"]').checked = true;
              document.getElementById('guest-form').classList.remove('hidden');
              document.getElementById('login-form').classList.add('hidden');
            });
            
            document.getElementById('account-checkout-option').addEventListener('click', () => {
              document.querySelector('input[name="checkout-type"][value="account"]').checked = true;
              document.getElementById('guest-form').classList.add('hidden');
              document.getElementById('login-form').classList.remove('hidden');
            });
            
            // Business toggle
            document.getElementById('is-business').addEventListener('change', (e) => {
              document.getElementById('vat-field').classList.toggle('hidden', !e.target.checked);
            });
            
            // Payment method selection
            document.querySelectorAll('.payment-option').forEach(option => {
              option.addEventListener('click', function() {
                document.querySelectorAll('.payment-option').forEach(opt => {
                  opt.classList.remove('border-blue-600', 'bg-blue-50');
                  opt.classList.add('border-gray-300');
                  opt.querySelector('.payment-details').classList.add('hidden');
                });
                
                this.classList.remove('border-gray-300');
                this.classList.add('border-blue-600');
                this.querySelector('input[type="radio"]').checked = true;
                this.querySelector('.payment-details').classList.remove('hidden');
                
                checkoutData.payment = this.dataset.method;
              });
            });
          }

          // Go to step
          function goToStep(step) {
            currentStep = step;
            
            // Hide all sections
            document.querySelectorAll('.checkout-section').forEach(section => {
              section.classList.remove('active');
            });
            
            // Show current section
            document.getElementById('step-' + step).classList.add('active');
            
            // Update step indicators
            document.querySelectorAll('.step').forEach((stepEl, index) => {
              stepEl.classList.remove('active', 'completed');
              if (index + 1 < step) {
                stepEl.classList.add('completed');
              } else if (index + 1 === step) {
                stepEl.classList.add('active');
              }
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          // Validate Step 1
          function validateStep1() {
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const email = document.getElementById('email').value.trim();
            
            let isValid = true;
            
            if (!firstName) {
              showError('first-name', 'Bitte geben Sie Ihren Vornamen ein');
              isValid = false;
            }
            
            if (!lastName) {
              showError('last-name', 'Bitte geben Sie Ihren Nachnamen ein');
              isValid = false;
            }
            
            if (!email || !email.includes('@')) {
              showError('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
              isValid = false;
            }
            
            if (isValid) {
              checkoutData.customer = {
                firstName,
                lastName,
                email,
                phone: document.getElementById('phone').value.trim()
              };
            }
            
            return isValid;
          }

          // Validate Step 2
          function validateStep2() {
            const street = document.getElementById('street').value.trim();
            const houseNumber = document.getElementById('house-number').value.trim();
            const postalCode = document.getElementById('postal-code').value.trim();
            const city = document.getElementById('city').value.trim();
            
            if (!street || !houseNumber || !postalCode || !city) {
              alert('Bitte füllen Sie alle Pflichtfelder aus');
              return false;
            }
            
            checkoutData.address = {
              company: document.getElementById('company').value.trim(),
              street,
              houseNumber,
              postalCode,
              city,
              country: document.getElementById('country').value,
              isBusiness: document.getElementById('is-business').checked,
              vatId: document.getElementById('vat-id').value.trim()
            };
            
            return true;
          }

          // Show error
          function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + '-error');
            
            field.classList.add('error');
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
            
            setTimeout(() => {
              field.classList.remove('error');
              errorDiv.classList.add('hidden');
            }, 3000);
          }

          // Update review section
          function updateReviewSection() {
            const { customer, address } = checkoutData;
            
            document.getElementById('review-name').textContent = \`\${customer.firstName} \${customer.lastName}\`;
            document.getElementById('review-email').textContent = customer.email;
            document.getElementById('review-phone').textContent = customer.phone || '-';
            
            document.getElementById('review-company').textContent = address.company || '';
            document.getElementById('review-address').textContent = \`\${address.street} \${address.houseNumber}\`;
            document.getElementById('review-city').textContent = \`\${address.postalCode} \${address.city}\`;
            document.getElementById('review-country').textContent = document.getElementById('country').selectedOptions[0].text;
            document.getElementById('review-vat').textContent = address.vatId ? \`USt-IdNr.: \${address.vatId}\` : '';
            
            const paymentLabels = {
              card: 'Kreditkarte / Debitkarte',
              paypal: 'PayPal',
              sepa: 'SEPA-Lastschrift',
              klarna: 'Klarna'
            };
            document.getElementById('review-payment').textContent = paymentLabels[checkoutData.payment];
          }

          // Place order
          function placeOrder() {
            const termsChecked = document.getElementById('terms-checkbox').checked;
            const withdrawalChecked = document.getElementById('withdrawal-checkbox').checked;
            
            if (!termsChecked || !withdrawalChecked) {
              alert('Bitte akzeptieren Sie die AGB und Widerrufsbelehrung');
              return;
            }
            
            // Prepare order data
            const orderData = {
              ...checkoutData,
              cart: cart.items,
              totals: {
                subtotal: cart.subtotal,
                discount: cart.discount,
                vat: cart.vat,
                total: cart.total
              },
              newsletter: document.getElementById('newsletter-checkbox').checked
            };
            
            console.log('Placing order:', orderData);
            
            // Simulate payment redirect
            alert('Bestellung wird verarbeitet...\\n\\nSie würden jetzt zur Zahlungsseite weitergeleitet.\\n\\nGesamtbetrag: ' + formatPrice(cart.total));
            
            // In production: redirect to payment gateway or submit to backend
            // window.location.href = '/api/orders/create';
          }

          // Initialize on page load
          initCheckout();
        `}} />
      </body>
    </html>
  )
}
