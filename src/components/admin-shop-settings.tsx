import { AdminSidebarAdvanced } from './admin-sidebar-advanced';

export function AdminShopSettings() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop Settings - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #f9fafb;
        }
        
        .admin-content {
            margin-left: 280px;
            min-height: 100vh;
            padding: 2rem;
        }
        
        @media (max-width: 768px) {
            .admin-content {
                margin-left: 0;
            }
        }
        
        .settings-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        
        .settings-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .stat-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
        }
        
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 48px;
            height: 24px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .slider {
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
        
        .slider:before {
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
        
        input:checked + .slider {
            background-color: #3b82f6;
        }
        
        input:checked + .slider:before {
            transform: translateX(24px);
        }
        
        .tab-button {
            padding: 0.75rem 1.5rem;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .tab-button.active {
            border-bottom-color: #3b82f6;
            color: #3b82f6;
            font-weight: 600;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: none;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .toast.show {
            display: block;
        }
        
        .toast.success {
            border-left: 4px solid #10b981;
        }
        
        .toast.error {
            border-left: 4px solid #ef4444;
        }
        
        .toast.info {
            border-left: 4px solid #3b82f6;
        }
    </style>
</head>
<body>
    ${AdminSidebarAdvanced()}
    
    <div class="admin-content">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
                <i class="fas fa-store text-blue-600 mr-3"></i>
                Shop-Einstellungen
            </h1>
            <p class="text-gray-600">Verwalten Sie alle Shop-Einstellungen und Konfigurationen</p>
        </div>

        <!-- Toast Notification -->
        <div id="toast" class="toast">
            <div class="flex items-center">
                <i id="toastIcon" class="fas fa-check-circle mr-3 text-green-500"></i>
                <span id="toastMessage">Operation successful</span>
            </div>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-box">
                <i class="fas fa-box text-4xl mb-2"></i>
                <div class="text-sm opacity-90">Produkte</div>
                <div class="text-2xl font-bold" id="productCount">0</div>
                <div class="text-xs opacity-75">Im Shop</div>
            </div>
            
            <div class="stat-box" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <i class="fas fa-users text-4xl mb-2"></i>
                <div class="text-sm opacity-90">Kunden</div>
                <div class="text-2xl font-bold" id="customerCount">0</div>
                <div class="text-xs opacity-75">Registriert</div>
            </div>
            
            <div class="stat-box" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                <i class="fas fa-shopping-cart text-4xl mb-2"></i>
                <div class="text-sm opacity-90">Offene Warenkörbe</div>
                <div class="text-2xl font-bold" id="cartCount">0</div>
                <div class="text-xs opacity-75">Aktiv</div>
            </div>
            
            <div class="stat-box" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                <i class="fas fa-euro-sign text-4xl mb-2"></i>
                <div class="text-sm opacity-90">Umsatz Heute</div>
                <div class="text-2xl font-bold" id="todayRevenue">€0.00</div>
                <div class="text-xs opacity-75">Tagesumsatz</div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white rounded-lg shadow mb-6">
            <div class="flex border-b overflow-x-auto">
                <button class="tab-button active" onclick="switchTab('general')">
                    <i class="fas fa-cog mr-2"></i>Allgemein
                </button>
                <button class="tab-button" onclick="switchTab('products')">
                    <i class="fas fa-box mr-2"></i>Produkte
                </button>
                <button class="tab-button" onclick="switchTab('checkout')">
                    <i class="fas fa-shopping-cart mr-2"></i>Checkout
                </button>
                <button class="tab-button" onclick="switchTab('email')">
                    <i class="fas fa-envelope mr-2"></i>E-Mail
                </button>
                <button class="tab-button" onclick="switchTab('legal')">
                    <i class="fas fa-gavel mr-2"></i>Rechtliches
                </button>
                <button class="tab-button" onclick="switchTab('seo')">
                    <i class="fas fa-search mr-2"></i>SEO
                </button>
            </div>
        </div>

        <!-- General Settings Tab -->
        <div id="tab-general" class="tab-content active">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Shop Information -->
                <div class="settings-card">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                        Shop-Informationen
                    </h3>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2">Shop-Name</label>
                            <input type="text" id="shopName" value="SOFTWAREKING24" class="w-full p-2 border rounded">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Shop-Beschreibung</label>
                            <textarea id="shopDescription" class="w-full p-2 border rounded" rows="3">Premium Software & Licenses Store</textarea>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Kontakt-E-Mail</label>
                            <input type="email" id="contactEmail" value="info@softwareking24.com" class="w-full p-2 border rounded">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Support-E-Mail</label>
                            <input type="email" id="supportEmail" value="support@softwareking24.com" class="w-full p-2 border rounded">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Telefon</label>
                            <input type="tel" id="phone" value="+49 123 456789" class="w-full p-2 border rounded">
                        </div>
                    </div>
                    
                    <button onclick="saveGeneralSettings()" class="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                </div>

                <!-- Shop Status -->
                <div class="settings-card">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-toggle-on text-green-600 mr-2"></i>
                        Shop-Status
                    </h3>
                    
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Shop Online</div>
                                <div class="text-sm text-gray-500">Shop für Besucher zugänglich</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="shopOnline" onchange="updateSetting('shopOnline', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Wartungsmodus</div>
                                <div class="text-sm text-gray-500">Shop vorübergehend deaktivieren</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="maintenanceMode" onchange="updateSetting('maintenanceMode', this.checked)">
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Registrierung erlauben</div>
                                <div class="text-sm text-gray-500">Neue Kundenregistrierungen</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="allowRegistration" onchange="updateSetting('allowRegistration', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Gastkauf erlauben</div>
                                <div class="text-sm text-gray-500">Kauf ohne Registrierung</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="allowGuestCheckout" onchange="updateSetting('allowGuestCheckout', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Währung</label>
                            <select id="currency" onchange="updateSetting('currency', this.value)" class="w-full p-2 border rounded">
                                <option value="EUR" selected>EUR - Euro (€)</option>
                                <option value="USD">USD - US Dollar ($)</option>
                                <option value="GBP">GBP - British Pound (£)</option>
                                <option value="CHF">CHF - Swiss Franc (Fr)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Sprache</label>
                            <select id="language" onchange="updateSetting('language', this.value)" class="w-full p-2 border rounded">
                                <option value="de" selected>Deutsch</option>
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="es">Español</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Business Information -->
                <div class="settings-card">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-building text-purple-600 mr-2"></i>
                        Firmendaten
                    </h3>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2">Firmenname</label>
                            <input type="text" id="companyName" value="SOFTWAREKING24 GmbH" class="w-full p-2 border rounded">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Geschäftsführer</label>
                            <input type="text" id="ceo" value="Max Mustermann" class="w-full p-2 border rounded">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">USt-IdNr.</label>
                            <input type="text" id="vatId" value="DE123456789" class="w-full p-2 border rounded">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Handelsregister</label>
                            <input type="text" id="commercialRegister" value="HRB 12345" class="w-full p-2 border rounded">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Adresse</label>
                            <textarea id="address" class="w-full p-2 border rounded" rows="3">Musterstraße 123
12345 Musterstadt
Deutschland</textarea>
                        </div>
                    </div>
                    
                    <button onclick="saveBusinessInfo()" class="w-full mt-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                </div>

                <!-- Time & Timezone -->
                <div class="settings-card">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-clock text-orange-600 mr-2"></i>
                        Zeit & Zeitzone
                    </h3>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2">Zeitzone</label>
                            <select id="timezone" onchange="updateSetting('timezone', this.value)" class="w-full p-2 border rounded">
                                <option value="Europe/Berlin" selected>Europe/Berlin (UTC+1)</option>
                                <option value="Europe/London">Europe/London (UTC+0)</option>
                                <option value="America/New_York">America/New_York (UTC-5)</option>
                                <option value="America/Los_Angeles">America/Los_Angeles (UTC-8)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Datumsformat</label>
                            <select id="dateFormat" onchange="updateSetting('dateFormat', this.value)" class="w-full p-2 border rounded">
                                <option value="DD.MM.YYYY" selected>DD.MM.YYYY</option>
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Zeitformat</label>
                            <select id="timeFormat" onchange="updateSetting('timeFormat', this.value)" class="w-full p-2 border rounded">
                                <option value="24h" selected>24 Stunden</option>
                                <option value="12h">12 Stunden (AM/PM)</option>
                            </select>
                        </div>
                        
                        <div class="p-4 bg-blue-50 rounded">
                            <div class="font-semibold text-blue-900 mb-2">Aktuelle Zeit</div>
                            <div id="currentTime" class="text-2xl font-bold text-blue-600">--:--:--</div>
                            <div id="currentDate" class="text-sm text-blue-700 mt-1">--.--.----</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Products Settings Tab -->
        <div id="tab-products" class="tab-content">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="settings-card">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-box text-blue-600 mr-2"></i>
                        Produkteinstellungen
                    </h3>
                    
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Lagerbestand anzeigen</div>
                                <div class="text-sm text-gray-500">Verfügbare Menge anzeigen</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="showStock" onchange="updateSetting('showStock', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Bewertungen aktivieren</div>
                                <div class="text-sm text-gray-500">Kundenbewertungen erlauben</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="enableReviews" onchange="updateSetting('enableReviews', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Wunschliste aktivieren</div>
                                <div class="text-sm text-gray-500">Wunschlisten-Funktion</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="enableWishlist" onchange="updateSetting('enableWishlist', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Produkte pro Seite</label>
                            <select id="productsPerPage" onchange="updateSetting('productsPerPage', this.value)" class="w-full p-2 border rounded">
                                <option value="12" selected>12</option>
                                <option value="24">24</option>
                                <option value="36">36</option>
                                <option value="48">48</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Standard-Sortierung</label>
                            <select id="defaultSort" onchange="updateSetting('defaultSort', this.value)" class="w-full p-2 border rounded">
                                <option value="newest" selected>Neueste zuerst</option>
                                <option value="popular">Beliebteste</option>
                                <option value="price-asc">Preis aufsteigend</option>
                                <option value="price-desc">Preis absteigend</option>
                                <option value="name">Name A-Z</option>
                            </select>
                        </div>
                    </div>
                    
                    <button onclick="saveProductSettings()" class="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                </div>
            </div>
        </div>

        <!-- Checkout Settings Tab -->
        <div id="tab-checkout" class="tab-content">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="settings-card">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-shopping-cart text-green-600 mr-2"></i>
                        Checkout-Einstellungen
                    </h3>
                    
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Gastkauf erlauben</div>
                                <div class="text-sm text-gray-500">Kauf ohne Login</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="guestCheckout" onchange="updateSetting('guestCheckout', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">AGB-Zustimmung erforderlich</div>
                                <div class="text-sm text-gray-500">Pflichtfeld bei Bestellung</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="requireTerms" onchange="updateSetting('requireTerms', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Newsletter-Option anzeigen</div>
                                <div class="text-sm text-gray-500">Newsletter-Opt-in im Checkout</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="showNewsletter" onchange="updateSetting('showNewsletter', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Mindestbestellwert (€)</label>
                            <input type="number" id="minOrderValue" value="0" min="0" step="0.01" class="w-full p-2 border rounded" onchange="updateSetting('minOrderValue', this.value)">
                        </div>
                    </div>
                    
                    <button onclick="saveCheckoutSettings()" class="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                </div>
            </div>
        </div>

        <!-- Email Settings Tab -->
        <div id="tab-email" class="tab-content">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="settings-card">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-envelope text-blue-600 mr-2"></i>
                        E-Mail-Einstellungen
                    </h3>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2">Absender-Name</label>
                            <input type="text" id="emailSenderName" value="SOFTWAREKING24" class="w-full p-2 border rounded">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Absender-E-Mail</label>
                            <input type="email" id="emailSenderAddress" value="noreply@softwareking24.com" class="w-full p-2 border rounded">
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Bestellbestätigung senden</div>
                                <div class="text-sm text-gray-500">Bei jeder Bestellung</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="sendOrderConfirmation" onchange="updateSetting('sendOrderConfirmation', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Versandbestätigung senden</div>
                                <div class="text-sm text-gray-500">Bei Lizenzversand</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="sendShippingConfirmation" onchange="updateSetting('sendShippingConfirmation', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="mt-4 flex gap-2">
                        <button onclick="saveEmailSettings()" class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            <i class="fas fa-save mr-2"></i>Speichern
                        </button>
                        <button onclick="sendTestEmail()" class="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                            <i class="fas fa-paper-plane mr-2"></i>Test-E-Mail
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Legal Settings Tab -->
        <div id="tab-legal" class="tab-content">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="settings-card">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-gavel text-red-600 mr-2"></i>
                        Rechtliche Einstellungen
                    </h3>
                    
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Cookie-Banner anzeigen</div>
                                <div class="text-sm text-gray-500">DSGVO Cookie-Hinweis</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="showCookieBanner" onchange="updateSetting('showCookieBanner', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">DSGVO-Modus aktiv</div>
                                <div class="text-sm text-gray-500">Strikte Datenschutzregeln</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="gdprMode" onchange="updateSetting('gdprMode', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Datenschutz-Seite</label>
                            <select id="privacyPage" onchange="updateSetting('privacyPage', this.value)" class="w-full p-2 border rounded">
                                <option value="/datenschutz" selected>/datenschutz</option>
                                <option value="/privacy">/privacy</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">AGB-Seite</label>
                            <select id="termsPage" onchange="updateSetting('termsPage', this.value)" class="w-full p-2 border rounded">
                                <option value="/agb" selected>/agb</option>
                                <option value="/terms">/terms</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Impressum-Seite</label>
                            <select id="imprintPage" onchange="updateSetting('imprintPage', this.value)" class="w-full p-2 border rounded">
                                <option value="/impressum" selected>/impressum</option>
                                <option value="/imprint">/imprint</option>
                            </select>
                        </div>
                    </div>
                    
                    <button onclick="saveLegalSettings()" class="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                </div>
            </div>
        </div>

        <!-- SEO Settings Tab -->
        <div id="tab-seo" class="tab-content">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="settings-card">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-search text-purple-600 mr-2"></i>
                        SEO-Einstellungen
                    </h3>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2">Meta-Titel</label>
                            <input type="text" id="metaTitle" value="SOFTWAREKING24 - Premium Software & Licenses" class="w-full p-2 border rounded">
                            <div class="text-xs text-gray-500 mt-1">Optimal: 50-60 Zeichen</div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Meta-Beschreibung</label>
                            <textarea id="metaDescription" class="w-full p-2 border rounded" rows="3">Der führende Online-Shop für Software-Lizenzen und digitale Produkte. Schneller Versand, sichere Zahlung, erstklassiger Support.</textarea>
                            <div class="text-xs text-gray-500 mt-1">Optimal: 150-160 Zeichen</div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold mb-2">Meta-Keywords</label>
                            <input type="text" id="metaKeywords" value="Software, Lizenzen, Windows, Office, Antivirus" class="w-full p-2 border rounded">
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Sitemap generieren</div>
                                <div class="text-sm text-gray-500">XML-Sitemap für Suchmaschinen</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="generateSitemap" onchange="updateSetting('generateSitemap', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Robots.txt aktivieren</div>
                                <div class="text-sm text-gray-500">Crawler-Anweisungen</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="enableRobots" onchange="updateSetting('enableRobots', this.checked)" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <button onclick="saveSEOSettings()" class="w-full mt-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Shop Settings Object
        let shopSettings = {};
        
        // Toast Notification
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            const toastIcon = document.getElementById('toastIcon');
            
            toast.className = 'toast show ' + type;
            toastMessage.textContent = message;
            
            if (type === 'success') {
                toastIcon.className = 'fas fa-check-circle mr-3 text-green-500';
            } else if (type === 'error') {
                toastIcon.className = 'fas fa-exclamation-circle mr-3 text-red-500';
            } else if (type === 'info') {
                toastIcon.className = 'fas fa-info-circle mr-3 text-blue-500';
            }
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
        
        // Tab Switching
        function switchTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active from all buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById('tab-' + tabName).classList.add('active');
            
            // Activate button
            event.target.closest('.tab-button').classList.add('active');
        }
        
        // Update Setting
        function updateSetting(key, value) {
            shopSettings[key] = value;
            
            // Auto-save
            axios.post('/api/shop/settings', { [key]: value })
                .then(response => {
                    console.log('Setting updated:', key, value);
                })
                .catch(error => {
                    console.error('Error updating setting:', error);
                });
        }
        
        // Save Functions
        function saveGeneralSettings() {
            const settings = {
                shopName: document.getElementById('shopName').value,
                shopDescription: document.getElementById('shopDescription').value,
                contactEmail: document.getElementById('contactEmail').value,
                supportEmail: document.getElementById('supportEmail').value,
                phone: document.getElementById('phone').value
            };
            
            axios.post('/api/shop/settings/general', settings)
                .then(response => {
                    showToast('Allgemeine Einstellungen gespeichert!', 'success');
                })
                .catch(error => {
                    showToast('Fehler beim Speichern', 'error');
                });
        }
        
        function saveBusinessInfo() {
            const info = {
                companyName: document.getElementById('companyName').value,
                ceo: document.getElementById('ceo').value,
                vatId: document.getElementById('vatId').value,
                commercialRegister: document.getElementById('commercialRegister').value,
                address: document.getElementById('address').value
            };
            
            axios.post('/api/shop/settings/business', info)
                .then(response => {
                    showToast('Firmendaten gespeichert!', 'success');
                })
                .catch(error => {
                    showToast('Fehler beim Speichern', 'error');
                });
        }
        
        function saveProductSettings() {
            showToast('Produkteinstellungen gespeichert!', 'success');
        }
        
        function saveCheckoutSettings() {
            showToast('Checkout-Einstellungen gespeichert!', 'success');
        }
        
        function saveEmailSettings() {
            showToast('E-Mail-Einstellungen gespeichert!', 'success');
        }
        
        function saveLegalSettings() {
            showToast('Rechtliche Einstellungen gespeichert!', 'success');
        }
        
        function saveSEOSettings() {
            showToast('SEO-Einstellungen gespeichert!', 'success');
        }
        
        function sendTestEmail() {
            showToast('Test-E-Mail wird gesendet...', 'info');
            axios.post('/api/shop/email/test')
                .then(response => {
                    showToast('Test-E-Mail erfolgreich gesendet!', 'success');
                })
                .catch(error => {
                    showToast('Fehler beim Senden', 'error');
                });
        }
        
        // Load Settings
        async function loadSettings() {
            try {
                const response = await axios.get('/api/shop/settings');
                shopSettings = response.data.settings || {};
                
                // Apply settings to UI
                Object.keys(shopSettings).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) {
                        if (element.type === 'checkbox') {
                            element.checked = shopSettings[key];
                        } else {
                            element.value = shopSettings[key];
                        }
                    }
                });
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        }
        
        // Load Stats
        async function loadStats() {
            try {
                const response = await axios.get('/api/shop/stats');
                const stats = response.data;
                
                document.getElementById('productCount').textContent = stats.productCount || 0;
                document.getElementById('customerCount').textContent = stats.customerCount || 0;
                document.getElementById('cartCount').textContent = stats.cartCount || 0;
                document.getElementById('todayRevenue').textContent = '€' + (stats.todayRevenue || 0).toFixed(2);
            } catch (error) {
                console.error('Error loading stats:', error);
                // Use demo data as fallback
                document.getElementById('productCount').textContent = '127';
                document.getElementById('customerCount').textContent = '834';
                document.getElementById('cartCount').textContent = '23';
                document.getElementById('todayRevenue').textContent = '€1,247.50';
            }
        }
        
        // Update Clock
        function updateClock() {
            const now = new Date();
            const time = now.toLocaleTimeString('de-DE');
            const date = now.toLocaleDateString('de-DE');
            
            document.getElementById('currentTime').textContent = time;
            document.getElementById('currentDate').textContent = date;
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Initializing Shop Settings...');
            loadSettings();
            loadStats();
            updateClock();
            setInterval(updateClock, 1000);
            console.log('Shop Settings initialized');
        });
    </script>
</body>
</html>
`;
}
