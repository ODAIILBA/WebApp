export function AdminTaxSettings() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Steuereinstellungen - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style>
            :root {
                --navy-dark: #132C46;
                --gold: #D9A50B;
            }
            body {
                background: #f8fafc;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .stat-card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                transition: all 0.3s;
            }
            .stat-card:hover {
                box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                transform: translateY(-2px);
            }
            .tax-rule-card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                border-left: 4px solid var(--gold);
                transition: all 0.2s;
            }
            .tax-rule-card:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .form-group {
                margin-bottom: 1.5rem;
            }
            .form-label {
                display: block;
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: var(--navy-dark);
            }
            .form-input, .form-select {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 1rem;
                transition: all 0.2s;
            }
            .form-input:focus, .form-select:focus {
                outline: none;
                border-color: var(--gold);
            }
            .btn-primary {
                background: var(--navy-dark);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.2s;
            }
            .btn-primary:hover {
                background: #0f1f33;
                transform: translateY(-1px);
            }
            .btn-success {
                background: #10b981;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.875rem;
            }
            .btn-danger {
                background: #ef4444;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.875rem;
            }
            .badge {
                padding: 0.25rem 0.75rem;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            .badge-success { background: #d1fae5; color: #065f46; }
            .badge-warning { background: #fef3c7; color: #92400e; }
            .badge-inactive { background: #f3f4f6; color: #6b7280; }
            .tab-button {
                padding: 0.75rem 1.5rem;
                border-bottom: 3px solid transparent;
                font-weight: 600;
                transition: all 0.2s;
                color: #6b7280;
            }
            .tab-button.active {
                color: var(--navy-dark);
                border-bottom-color: var(--gold);
            }
            .tab-content {
                display: none;
            }
            .tab-content.active {
                display: block;
            }
        </style>
    </head>
    <body>
        ${AdminSidebarAdvanced('/admin/tax-settings')}
        
        <div class="ml-80 p-8">
            <div class="max-w-7xl mx-auto">
                <!-- Header -->
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-3xl font-bold" style="color: var(--navy-dark);">
                            <i class="fas fa-percentage mr-3"></i>Steuereinstellungen
                        </h1>
                        <p class="text-gray-600 mt-2">Verwalten Sie Steuersätze und Steuerregeln für verschiedene Regionen</p>
                    </div>
                    <button onclick="addTaxRule()" class="btn-primary">
                        <i class="fas fa-plus mr-2"></i>Neue Steuerregel
                    </button>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-4 gap-6 mb-8">
                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Aktive Regeln</p>
                                <p class="text-3xl font-bold mt-1" style="color: var(--navy-dark);">8</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(19, 44, 70, 0.1);">
                                <i class="fas fa-file-invoice text-xl" style="color: var(--navy-dark);"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Standard MwSt</p>
                                <p class="text-3xl font-bold mt-1" style="color: var(--navy-dark);">19%</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(217, 165, 11, 0.1);">
                                <i class="fas fa-percentage text-xl" style="color: var(--gold);"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Länder</p>
                                <p class="text-3xl font-bold mt-1" style="color: var(--navy-dark);">12</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                                <i class="fas fa-globe text-xl text-green-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Steuereinnahmen (30d)</p>
                                <p class="text-2xl font-bold mt-1" style="color: var(--navy-dark);">€12,456</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100">
                                <i class="fas fa-euro-sign text-xl text-blue-600"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="stat-card mb-8">
                    <div class="flex border-b mb-6">
                        <button class="tab-button active" onclick="switchTab('tax-rules')">
                            <i class="fas fa-list mr-2"></i>Steuerregeln
                        </button>
                        <button class="tab-button" onclick="switchTab('eu-rules')">
                            <i class="fas fa-flag mr-2"></i>EU-Regeln
                        </button>
                        <button class="tab-button" onclick="switchTab('exemptions')">
                            <i class="fas fa-ban mr-2"></i>Befreiungen
                        </button>
                        <button class="tab-button" onclick="switchTab('reports')">
                            <i class="fas fa-chart-bar mr-2"></i>Berichte
                        </button>
                    </div>

                    <!-- Tax Rules Tab -->
                    <div id="tax-rules" class="tab-content active">
                        <div class="space-y-4">
                            <div class="tax-rule-card">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-2">
                                            <h3 class="font-bold text-lg">Deutschland - Standard MwSt</h3>
                                            <span class="badge badge-success">Aktiv</span>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4 text-sm">
                                            <p><span class="text-gray-600">Steuersatz:</span> <strong>19%</strong></p>
                                            <p><span class="text-gray-600">Land:</span> <strong>Deutschland (DE)</strong></p>
                                            <p><span class="text-gray-600">Typ:</span> <strong>MwSt</strong></p>
                                            <p><span class="text-gray-600">Priorität:</span> <strong>1</strong></p>
                                        </div>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="editTaxRule(1)" class="btn-success">
                                            <i class="fas fa-edit mr-1"></i>Bearbeiten
                                        </button>
                                        <button onclick="deleteTaxRule(1)" class="btn-danger">
                                            <i class="fas fa-trash mr-1"></i>Löschen
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="tax-rule-card">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-2">
                                            <h3 class="font-bold text-lg">Deutschland - Reduzierte MwSt</h3>
                                            <span class="badge badge-success">Aktiv</span>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4 text-sm">
                                            <p><span class="text-gray-600">Steuersatz:</span> <strong>7%</strong></p>
                                            <p><span class="text-gray-600">Land:</span> <strong>Deutschland (DE)</strong></p>
                                            <p><span class="text-gray-600">Typ:</span> <strong>MwSt (Reduziert)</strong></p>
                                            <p><span class="text-gray-600">Priorität:</span> <strong>2</strong></p>
                                        </div>
                                        <p class="text-sm text-gray-600 mt-2">
                                            <i class="fas fa-info-circle mr-1"></i>
                                            Für Bücher, Zeitschriften, Lebensmittel, etc.
                                        </p>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="editTaxRule(2)" class="btn-success">
                                            <i class="fas fa-edit mr-1"></i>Bearbeiten
                                        </button>
                                        <button onclick="deleteTaxRule(2)" class="btn-danger">
                                            <i class="fas fa-trash mr-1"></i>Löschen
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="tax-rule-card">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-2">
                                            <h3 class="font-bold text-lg">Österreich - Standard MwSt</h3>
                                            <span class="badge badge-success">Aktiv</span>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4 text-sm">
                                            <p><span class="text-gray-600">Steuersatz:</span> <strong>20%</strong></p>
                                            <p><span class="text-gray-600">Land:</span> <strong>Österreich (AT)</strong></p>
                                            <p><span class="text-gray-600">Typ:</span> <strong>MwSt</strong></p>
                                            <p><span class="text-gray-600">Priorität:</span> <strong>1</strong></p>
                                        </div>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="editTaxRule(3)" class="btn-success">
                                            <i class="fas fa-edit mr-1"></i>Bearbeiten
                                        </button>
                                        <button onclick="deleteTaxRule(3)" class="btn-danger">
                                            <i class="fas fa-trash mr-1"></i>Löschen
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="tax-rule-card">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-2">
                                            <h3 class="font-bold text-lg">Schweiz - MwSt</h3>
                                            <span class="badge badge-success">Aktiv</span>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4 text-sm">
                                            <p><span class="text-gray-600">Steuersatz:</span> <strong>7.7%</strong></p>
                                            <p><span class="text-gray-600">Land:</span> <strong>Schweiz (CH)</strong></p>
                                            <p><span class="text-gray-600">Typ:</span> <strong>MwSt</strong></p>
                                            <p><span class="text-gray-600">Priorität:</span> <strong>1</strong></p>
                                        </div>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="editTaxRule(4)" class="btn-success">
                                            <i class="fas fa-edit mr-1"></i>Bearbeiten
                                        </button>
                                        <button onclick="deleteTaxRule(4)" class="btn-danger">
                                            <i class="fas fa-trash mr-1"></i>Löschen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- EU Rules Tab -->
                    <div id="eu-rules" class="tab-content">
                        <div class="space-y-6">
                            <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h3 class="font-bold text-lg mb-2" style="color: var(--navy-dark);">
                                    <i class="fas fa-info-circle mr-2"></i>EU-weite MwSt-Regeln
                                </h3>
                                <p class="text-gray-700">
                                    Für Verkäufe innerhalb der EU gelten besondere Regelungen. Ab einem Schwellenwert von €10,000 
                                    muss die MwSt des Bestimmungslandes angewandt werden.
                                </p>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div class="form-group">
                                    <label class="form-label">OSS-Registrierung (One Stop Shop)</label>
                                    <select class="form-select">
                                        <option>Aktiv</option>
                                        <option>Inaktiv</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Schwellenwert</label>
                                    <input type="text" class="form-input" value="€10,000" />
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Umsatz aktuelles Jahr</label>
                                    <input type="text" class="form-input" value="€7,845" readonly />
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Verbleibend bis Schwellenwert</label>
                                    <input type="text" class="form-input" value="€2,155" readonly />
                                </div>
                            </div>

                            <button class="btn-primary">
                                <i class="fas fa-save mr-2"></i>Einstellungen speichern
                            </button>
                        </div>
                    </div>

                    <!-- Exemptions Tab -->
                    <div id="exemptions" class="tab-content">
                        <div class="space-y-4">
                            <p class="text-gray-600">
                                Definieren Sie Steuerbefreiungen für bestimmte Produkte, Kunden oder Regionen.
                            </p>

                            <div class="tax-rule-card">
                                <div class="flex items-start justify-between">
                                    <div>
                                        <h3 class="font-bold text-lg mb-2">B2B-Verkäufe innerhalb EU</h3>
                                        <p class="text-sm text-gray-600">
                                            <i class="fas fa-tag mr-1"></i>
                                            Steuerbefreiung für Verkäufe an Unternehmen mit gültiger USt-IdNr.
                                        </p>
                                        <p class="text-sm mt-2">
                                            <span class="badge badge-success">Aktiv</span>
                                        </p>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="editExemption(1)" class="btn-success">
                                            <i class="fas fa-edit mr-1"></i>Bearbeiten
                                        </button>
                                        <button onclick="deleteExemption(1)" class="btn-danger">
                                            <i class="fas fa-trash mr-1"></i>Löschen
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="tax-rule-card">
                                <div class="flex items-start justify-between">
                                    <div>
                                        <h3 class="font-bold text-lg mb-2">Digitale Produkte - Nicht-EU</h3>
                                        <p class="text-sm text-gray-600">
                                            <i class="fas fa-tag mr-1"></i>
                                            Keine MwSt für Verkäufe digitaler Produkte außerhalb der EU
                                        </p>
                                        <p class="text-sm mt-2">
                                            <span class="badge badge-success">Aktiv</span>
                                        </p>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="editExemption(2)" class="btn-success">
                                            <i class="fas fa-edit mr-1"></i>Bearbeiten
                                        </button>
                                        <button onclick="deleteExemption(2)" class="btn-danger">
                                            <i class="fas fa-trash mr-1"></i>Löschen
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button onclick="addExemption()" class="btn-primary">
                                <i class="fas fa-plus mr-2"></i>Neue Befreiung
                            </button>
                        </div>
                    </div>

                    <!-- Reports Tab -->
                    <div id="reports" class="tab-content">
                        <div class="space-y-6">
                            <div class="grid grid-cols-3 gap-6">
                                <div class="stat-card">
                                    <p class="text-gray-600 text-sm mb-1">Steuereinnahmen (Monat)</p>
                                    <p class="text-3xl font-bold" style="color: var(--navy-dark);">€12,456</p>
                                    <p class="text-sm text-green-600 mt-1">
                                        <i class="fas fa-arrow-up mr-1"></i>+12.5% vs. Vormonat
                                    </p>
                                </div>

                                <div class="stat-card">
                                    <p class="text-gray-600 text-sm mb-1">Durchschn. Steuersatz</p>
                                    <p class="text-3xl font-bold" style="color: var(--navy-dark);">18.2%</p>
                                    <p class="text-sm text-gray-600 mt-1">
                                        <i class="fas fa-equals mr-1"></i>Unverändert
                                    </p>
                                </div>

                                <div class="stat-card">
                                    <p class="text-gray-600 text-sm mb-1">Transaktionen</p>
                                    <p class="text-3xl font-bold" style="color: var(--navy-dark);">1,234</p>
                                    <p class="text-sm text-green-600 mt-1">
                                        <i class="fas fa-arrow-up mr-1"></i>+8.3% vs. Vormonat
                                    </p>
                                </div>
                            </div>

                            <div class="flex gap-4">
                                <button class="btn-primary">
                                    <i class="fas fa-download mr-2"></i>Monatsbericht exportieren
                                </button>
                                <button class="btn-primary">
                                    <i class="fas fa-file-pdf mr-2"></i>UVA erstellen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
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
                document.getElementById(tabName).classList.add('active');
                event.target.classList.add('active');
            }

            function addTaxRule() {
                alert('Neue Steuerregel hinzufügen...');
            }

            function editTaxRule(id) {
                alert(\`Steuerregel \${id} bearbeiten...\`);
            }

            function deleteTaxRule(id) {
                if (confirm('Möchten Sie diese Steuerregel wirklich löschen?')) {
                    alert(\`Steuerregel \${id} gelöscht\`);
                }
            }

            function addExemption() {
                alert('Neue Steuerbefreiung hinzufügen...');
            }

            function editExemption(id) {
                alert(\`Steuerbefreiung \${id} bearbeiten...\`);
            }

            function deleteExemption(id) {
                if (confirm('Möchten Sie diese Steuerbefreiung wirklich löschen?')) {
                    alert(\`Steuerbefreiung \${id} gelöscht\`);
                }
            }
        </script>
    </body>
    </html>
  `.trim();
}

import { AdminSidebarAdvanced } from './admin-sidebar-advanced';
