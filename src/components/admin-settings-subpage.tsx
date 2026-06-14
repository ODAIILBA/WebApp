import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

type SubpageType = 'general' | 'address' | 'contact' | 'legal' | 'slogan' | 'system' | 'timezone' | 'import-export' | 'languages' | 'payment' | 'currency'

const pageConfig: Record<SubpageType, { title: string; icon: string; iconColor: string; desc: string }> = {
  'general':         { title: 'Allgemeine Einstellungen', icon: 'cog', iconColor: 'text-gray-600', desc: 'Grundlegende Shop-Konfiguration' },
  'address':         { title: 'Firmenadresse', icon: 'map-marker-alt', iconColor: 'text-red-500', desc: 'Anschrift und Firmendaten' },
  'contact':         { title: 'Kontaktdaten', icon: 'address-card', iconColor: 'text-blue-500', desc: 'Telefon, E-Mail und Kontaktformular' },
  'legal':           { title: 'Rechtliche Texte', icon: 'balance-scale', iconColor: 'text-indigo-600', desc: 'AGB, Impressum und Datenschutz' },
  'slogan':          { title: 'Slogan & Branding', icon: 'bullhorn', iconColor: 'text-purple-500', desc: 'Slogan und Marketing-Texte' },
  'system':          { title: 'System-Einstellungen', icon: 'server', iconColor: 'text-orange-500', desc: 'Wartungsmodus und System-Optionen' },
  'timezone':        { title: 'Zeitzone & Datum', icon: 'clock', iconColor: 'text-green-500', desc: 'Zeitzone, Datum- und Uhrzeitformat' },
  'import-export':   { title: 'Import & Export', icon: 'exchange-alt', iconColor: 'text-teal-500', desc: 'Daten importieren und exportieren' },
  'languages':       { title: 'Sprachen & Lokalisierung', icon: 'globe', iconColor: 'text-blue-600', desc: 'Verfügbare Sprachen verwalten' },
  'payment':         { title: 'Zahlungseinstellungen', icon: 'credit-card', iconColor: 'text-green-600', desc: 'Standard-Zahlungsoptionen' },
  'currency':        { title: 'Währungseinstellungen', icon: 'euro-sign', iconColor: 'text-yellow-600', desc: 'Standard-Währung und Anzeigeformat' },
}

type FieldOpts = { placeholder?: string; options?: {v:string;l:string}[]; hint?: string; defVal?: string }

function makeField(get: (k: string, d?: string) => string, id: string, label: string, type: string, opts: FieldOpts = {}): string {
  const val = get(id, opts.defVal || '')
  if (type === 'textarea') {
    return `<div class="fg"><label>${label}</label><textarea id="${id}" rows="5">${val}</textarea>${opts.hint ? `<div class="hint">${opts.hint}</div>` : ''}</div>`
  }
  if (type === 'select') {
    const optHtml = (opts.options || []).map(o => `<option value="${o.v}" ${val === o.v ? 'selected' : ''}>${o.l}</option>`).join('')
    return `<div class="fg"><label>${label}</label><select id="${id}">${optHtml}</select>${opts.hint ? `<div class="hint">${opts.hint}</div>` : ''}</div>`
  }
  if (type === 'toggle') {
    return `<div class="fg fg-toggle"><div><label style="margin:0">${label}</label>${opts.hint ? `<div class="hint">${opts.hint}</div>` : ''}</div><label class="toggle"><input type="checkbox" id="${id}" ${val === 'true' ? 'checked' : ''}/><span class="slider"></span></label></div>`
  }
  return `<div class="fg"><label>${label}</label><input type="${type}" id="${id}" value="${val}" placeholder="${opts.placeholder || ''}" />${opts.hint ? `<div class="hint">${opts.hint}</div>` : ''}</div>`
}

function row(...fields: string[]): string {
  return `<div class="frow">${fields.join('')}</div>`
}

function getFields(page: SubpageType, s: Record<string, string>): string {
  const get = (k: string, d = '') => s[k] || d
  const f = (id: string, label: string, type: string, opts: FieldOpts = {}) => makeField(get, id, label, type, opts)

  if (page === 'general') return `
    ${row(
      f('site_name', 'Shop-Name', 'text', { placeholder: 'SOFTWAREKING24', defVal: 'SOFTWAREKING24' }),
      f('site_tagline', 'Slogan', 'text', { placeholder: 'Ihr Slogan' })
    )}
    ${f('site_description', 'Shop-Beschreibung', 'textarea', { placeholder: 'Kurze Beschreibung Ihres Shops...', hint: 'Wird für SEO und Meta-Tags verwendet' })}
    ${row(
      f('admin_email', 'Admin-E-Mail', 'email', { placeholder: 'admin@shop.de' }),
      f('support_email', 'Support-E-Mail', 'email', { placeholder: 'support@shop.de' })
    )}
    ${row(
      f('site_logo', 'Logo-URL', 'text', { placeholder: 'https://...' }),
      f('favicon', 'Favicon-URL', 'text', { placeholder: 'https://...' })
    )}
    ${f('maintenance_message', 'Wartungsnachricht', 'textarea', { placeholder: 'Wir sind kurz offline für Wartungsarbeiten...' })}
    ${f('maintenance_mode', 'Wartungsmodus', 'toggle', { hint: 'Bei Aktivierung sehen nur Admins den Shop' })}`

  if (page === 'address') return `
    ${f('company_name', 'Firmenname *', 'text', { placeholder: 'Muster GmbH', defVal: 'SOFTWAREKING24' })}
    ${row(
      f('company_street', 'Straße & Hausnummer', 'text', { placeholder: 'Musterstraße 1' }),
      f('company_zip', 'PLZ', 'text', { placeholder: '10115' })
    )}
    ${row(
      f('company_city', 'Stadt', 'text', { placeholder: 'Berlin' }),
      f('company_country', 'Land', 'select', { options: [{v:'DE',l:'Deutschland'},{v:'AT',l:'Österreich'},{v:'CH',l:'Schweiz'},{v:'LU',l:'Luxemburg'}], defVal: 'DE' })
    )}
    ${row(
      f('vat_id', 'USt-IdNr.', 'text', { placeholder: 'DE123456789' }),
      f('tax_number', 'Steuernummer', 'text', { placeholder: '12/345/67890' })
    )}
    ${row(
      f('company_register', 'Handelsregisternummer', 'text', { placeholder: 'HRB 12345' }),
      f('company_register_court', 'Amtsgericht', 'text', { placeholder: 'Amtsgericht Berlin' })
    )}
    ${f('company_description', 'Geschäftsbeschreibung', 'textarea', { placeholder: 'Kurze Beschreibung...', hint: 'Für Impressum und rechtliche Dokumente' })}`

  if (page === 'contact') return `
    ${row(
      f('contact_phone', 'Telefon', 'tel', { placeholder: '+49 30 12345678' }),
      f('contact_fax', 'Fax', 'tel', { placeholder: '+49 30 12345679' })
    )}
    ${row(
      f('contact_email', 'Kontakt-E-Mail', 'email', { placeholder: 'info@shop.de' }),
      f('contact_hours', 'Geschäftszeiten', 'text', { placeholder: 'Mo-Fr 9-17 Uhr' })
    )}
    ${f('contact_address_display', 'Adresse für Kunden (Anzeige)', 'textarea', { placeholder: 'SOFTWAREKING24\nMusterstraße 1\n10115 Berlin', hint: 'Wird auf der Kontaktseite angezeigt' })}
    ${f('contact_form_email', 'Formular-Empfänger', 'email', { placeholder: 'kontakt@shop.de', hint: 'Diese E-Mail empfängt alle Kontaktformular-Nachrichten' })}
    ${f('contact_form_enabled', 'Kontaktformular aktivieren', 'toggle', { hint: 'Aktiviert oder deaktiviert das Kontaktformular' })}`

  if (page === 'legal') return `
    <div style="background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:.85rem 1rem;margin-bottom:1.25rem;font-size:.83rem;color:#856404">
      <i class="fas fa-exclamation-triangle mr-2"></i>Rechtliche Texte müssen von einem Rechtsanwalt geprüft werden.
    </div>
    ${f('legal_imprint', 'Impressum', 'textarea', { hint: 'Vollständiges Impressum gemäß §5 TMG' })}
    ${f('legal_privacy', 'Datenschutzerklärung', 'textarea', { hint: 'Datenschutzerklärung gemäß DSGVO' })}
    ${f('legal_terms', 'Allgemeine Geschäftsbedingungen (AGB)', 'textarea', { hint: 'AGB für den Kauf in Ihrem Shop' })}
    ${f('legal_withdrawal', 'Widerrufsbelehrung', 'textarea', { hint: 'Gesetzlich vorgeschriebene Widerrufsbelehrung' })}
    ${row(
      f('legal_imprint_page', 'Impressum-Seite URL', 'text', { placeholder: '/impressum' }),
      f('legal_privacy_page', 'Datenschutz-URL', 'text', { placeholder: '/datenschutz' })
    )}`

  if (page === 'slogan') return `
    ${f('slogan_main', 'Hauptslogan', 'text', { placeholder: 'z.B. Die günstigsten Software-Lizenzen', hint: 'Wird im Header und auf der Startseite angezeigt' })}
    ${f('slogan_sub', 'Unterslogan', 'text', { placeholder: 'z.B. Original, schnell, günstig' })}
    ${f('slogan_cta', 'Call-to-Action Text', 'text', { placeholder: 'z.B. Jetzt kaufen', defVal: 'Jetzt kaufen' })}
    ${row(
      f('brand_color_primary', 'Primärfarbe', 'text', { placeholder: '#1a2a4e', defVal: '#1a2a4e' }),
      f('brand_color_accent', 'Akzentfarbe', 'text', { placeholder: '#6366f1', defVal: '#6366f1' })
    )}
    ${f('tagline_homepage', 'Startseiten-Tagline', 'textarea', { placeholder: 'Willkommenstexte und Beschreibungstexte...', hint: 'Wird als Hero-Text auf der Startseite angezeigt' })}`

  if (page === 'system') return `
    ${f('maintenance_mode', 'Wartungsmodus', 'toggle', { hint: 'Shop für Besucher sperren – nur Admins haben Zugriff' })}
    ${f('debug_mode', 'Debug-Modus', 'toggle', { hint: 'Detaillierte Fehlermeldungen anzeigen (nur im Test)' })}
    ${f('cache_enabled', 'Caching aktivieren', 'toggle', { hint: 'Seiten-Cache für bessere Performance' })}
    ${row(
      f('items_per_page', 'Artikel pro Seite', 'number', { placeholder: '12', defVal: '12' }),
      f('max_upload_size', 'Max. Upload-Größe (MB)', 'number', { placeholder: '10', defVal: '10' })
    )}
    ${f('admin_notification_email', 'Admin-Benachrichtigungs-E-Mail', 'email', { placeholder: 'admin@shop.de', hint: 'Erhält Systemmeldungen und Alarme' })}
    ${row(
      f('log_level', 'Log-Level', 'select', { options: [{v:'error',l:'Nur Fehler'},{v:'warn',l:'Warnungen'},{v:'info',l:'Info'},{v:'debug',l:'Debug'}], defVal: 'error' }),
      f('session_timeout', 'Session-Timeout (Min)', 'number', { placeholder: '60', defVal: '60' })
    )}`

  if (page === 'timezone') {
    const tzOptions = [
      {v:'Europe/Berlin',l:'Europa/Berlin (CET/CEST)'},
      {v:'Europe/Vienna',l:'Europa/Wien (CET/CEST)'},
      {v:'Europe/Zurich',l:'Europa/Zürich (CET/CEST)'},
      {v:'Europe/London',l:'Europa/London (GMT/BST)'},
      {v:'America/New_York',l:'Amerika/New York (EST/EDT)'},
      {v:'America/Los_Angeles',l:'Amerika/Los Angeles (PST/PDT)'},
      {v:'Asia/Tokyo',l:'Asien/Tokio (JST)'},
      {v:'UTC',l:'UTC'},
    ]
    return `
    ${f('timezone', 'Zeitzone', 'select', { options: tzOptions, defVal: 'Europe/Berlin', hint: 'Alle Zeit- und Datumsangaben werden in dieser Zeitzone angezeigt' })}
    ${row(
      f('date_format', 'Datumsformat', 'select', { options: [{v:'DD.MM.YYYY',l:'TT.MM.JJJJ (Deutsch)'},{v:'YYYY-MM-DD',l:'JJJJ-MM-TT (ISO)'},{v:'MM/DD/YYYY',l:'MM/TT/JJJJ (US)'}], defVal: 'DD.MM.YYYY' }),
      f('time_format', 'Zeitformat', 'select', { options: [{v:'24h',l:'24 Stunden (14:30)'},{v:'12h',l:'12 Stunden (2:30 PM)'}], defVal: '24h' })
    )}
    ${row(
      f('first_day_of_week', 'Erster Wochentag', 'select', { options: [{v:'monday',l:'Montag'},{v:'sunday',l:'Sonntag'}], defVal: 'monday' }),
      f('locale', 'Locale/Sprache', 'select', { options: [{v:'de-DE',l:'Deutsch (DE)'},{v:'de-AT',l:'Deutsch (AT)'},{v:'de-CH',l:'Deutsch (CH)'},{v:'en-US',l:'English (US)'},{v:'en-GB',l:'English (GB)'}], defVal: 'de-DE' })
    )}`
  }

  if (page === 'import-export') return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
      <div>
        <h4 style="font-size:.95rem;font-weight:700;color:#1a2a4e;margin:0 0 1rem"><i class="fas fa-download text-blue-500 mr-2"></i>Daten exportieren</h4>
        ${['Produkte (CSV)','Bestellungen (CSV)','Kunden (CSV)','Rechnungen (PDF-ZIP)','Alle Einstellungen (JSON)'].map(label =>
          `<div style="display:flex;justify-content:space-between;align-items:center;padding:.6rem 0;border-bottom:1px solid #f3f4f6">
            <span style="font-size:.85rem;color:#374151"><i class="fas fa-file-csv text-gray-400 mr-2"></i>${label}</span>
            <button onclick="exportData('${label}')" style="padding:.3rem .75rem;background:#dbeafe;color:#1e40af;border:none;border-radius:6px;font-size:.78rem;font-weight:600;cursor:pointer">Export</button>
          </div>`
        ).join('')}
      </div>
      <div>
        <h4 style="font-size:.95rem;font-weight:700;color:#1a2a4e;margin:0 0 1rem"><i class="fas fa-upload text-green-500 mr-2"></i>Daten importieren</h4>
        <div style="border:2px dashed #e5e7eb;border-radius:10px;padding:2rem;text-align:center;cursor:pointer;transition:all .2s"
          onmouseover="this.style.borderColor='#6366f1'" onmouseout="this.style.borderColor='#e5e7eb'"
          onclick="document.getElementById('import-file').click()">
          <i class="fas fa-cloud-upload-alt" style="font-size:2rem;color:#d1d5db;display:block;margin-bottom:.5rem"></i>
          <p style="font-size:.85rem;color:#6b7280;margin:0">CSV oder JSON-Datei hier ablegen oder klicken</p>
          <input type="file" id="import-file" accept=".csv,.json" style="display:none" onchange="handleImport(this)" />
        </div>
        <div style="margin-top:.75rem">
          <select id="import-type" style="width:100%;padding:.5rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.85rem">
            <option>Produkte importieren</option>
            <option>Bestellungen importieren</option>
            <option>Kunden importieren</option>
          </select>
        </div>
      </div>
    </div>`

  if (page === 'languages') return `
    <div class="fg">
      <label>Standardsprache</label>
      <select id="default_language">
        <option value="de" selected>Deutsch</option>
        <option value="en">Englisch</option>
        <option value="fr">Französisch</option>
        <option value="es">Spanisch</option>
        <option value="it">Italienisch</option>
        <option value="pl">Polnisch</option>
      </select>
    </div>
    <p class="text-sm text-gray-500 mt-2">Weitere Sprachen können unter <a href="/admin/languages" class="text-indigo-600 hover:underline">Sprachverwaltung</a> hinzugefügt werden.</p>`

  if (page === 'payment') return `
    ${f('default_payment_method', 'Standard-Zahlungsmethode', 'select', { options: [{v:'paypal',l:'PayPal'},{v:'stripe',l:'Stripe/Kreditkarte'},{v:'bank_transfer',l:'Banküberweisung'},{v:'invoice',l:'Rechnung'},{v:'klarna',l:'Klarna'}], defVal: 'paypal' })}
    ${row(
      f('invoice_enabled', 'Zahlung auf Rechnung', 'toggle', { hint: 'Kunden können auf Rechnung kaufen' }),
      f('bank_transfer_enabled', 'Banküberweisung', 'toggle', { hint: 'SEPA-Überweisung aktivieren' })
    )}
    ${f('bank_iban', 'IBAN', 'text', { placeholder: 'DE89370400440532013000' })}
    ${row(
      f('bank_bic', 'BIC', 'text', { placeholder: 'COBADEFFXXX' }),
      f('bank_name', 'Bankname', 'text', { placeholder: 'Commerzbank' })
    )}
    ${f('payment_instructions', 'Zahlungshinweise', 'textarea', { placeholder: 'Bitte überweisen Sie den Betrag innerhalb von 14 Tagen...', hint: 'Wird auf der Bestellbestätigungsseite angezeigt' })}`

  if (page === 'currency') return `
    ${f('currency', 'Standardwährung', 'select', { options: [{v:'EUR',l:'Euro (€)'},{v:'USD',l:'US Dollar ($)'},{v:'GBP',l:'Britisches Pfund (£)'},{v:'CHF',l:'Schweizer Franken (Fr)'}], defVal: 'EUR' })}
    ${f('currency_position', 'Währungszeichen-Position', 'select', { options: [{v:'before',l:'Vor dem Betrag (€ 12,99)'},{v:'after',l:'Nach dem Betrag (12,99 €)'}], defVal: 'after' })}
    ${row(
      f('decimal_separator', 'Dezimaltrennzeichen', 'select', { options: [{v:',',l:'Komma (12,99)'},{v:'.',l:'Punkt (12.99)'}], defVal: ',' }),
      f('thousands_separator', 'Tausendertrenner', 'select', { options: [{v:'.',l:'Punkt (1.000)'},{v:',',l:'Komma (1,000)'},{v:' ',l:'Leerzeichen (1 000)'}], defVal: '.' })
    )}
    ${row(
      f('decimal_places', 'Nachkommastellen', 'number', { placeholder: '2', defVal: '2' }),
      f('currency_show_symbol', 'Symbol anzeigen', 'toggle', { hint: 'Zeigt das Währungssymbol vor/nach dem Betrag' })
    )}
    <p style="font-size:.82rem;color:#6b7280;margin-top:.75rem">Für Wechselkurse → <a href="/admin/currencies" style="color:#6366f1;text-decoration:none;font-weight:600">Währungsverwaltung</a></p>`

  return `<p style="color:#9ca3af;text-align:center;padding:2rem">Seite nicht konfiguriert</p>`
}

function getPageKeys(page: SubpageType): string[] {
  const keyMap: Record<SubpageType, string[]> = {
    'general': ['site_name','site_tagline','site_description','admin_email','support_email','site_logo','favicon','maintenance_message','maintenance_mode'],
    'address': ['company_name','company_street','company_zip','company_city','company_country','vat_id','tax_number','company_register','company_register_court','company_description'],
    'contact': ['contact_phone','contact_fax','contact_email','contact_hours','contact_address_display','contact_form_email','contact_form_enabled'],
    'legal': ['legal_imprint','legal_privacy','legal_terms','legal_withdrawal','legal_imprint_page','legal_privacy_page'],
    'slogan': ['slogan_main','slogan_sub','slogan_cta','brand_color_primary','brand_color_accent','tagline_homepage'],
    'system': ['maintenance_mode','debug_mode','cache_enabled','items_per_page','max_upload_size','admin_notification_email','log_level','session_timeout'],
    'timezone': ['timezone','date_format','time_format','first_day_of_week','locale'],
    'import-export': [],
    'languages': ['default_language'],
    'payment': ['default_payment_method','invoice_enabled','bank_transfer_enabled','bank_iban','bank_bic','bank_name','payment_instructions'],
    'currency': ['currency','currency_position','decimal_separator','thousands_separator','decimal_places','currency_show_symbol'],
  }
  return keyMap[page] || []
}

export function AdminSettingsSubpage(page: SubpageType, settings: Record<string, string> = {}) {
  const cfg = pageConfig[page]
  const sidebar = AdminSidebarAdvanced(`/admin/settings/${page}`)
  const keys = getPageKeys(page)
  const isImportExport = page === 'import-export'

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${cfg.title} – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body{margin:0;font-family:'Segoe UI',sans-serif;background:#f8fafc}
    .main{margin-left:280px;padding:2rem;min-height:100vh}
    @media(max-width:768px){.main{margin-left:0}}
    .card{background:white;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.07);padding:1.5rem;margin-bottom:1.5rem}
    .fg{margin-bottom:1.1rem}
    .fg label{display:block;font-size:.83rem;font-weight:600;color:#374151;margin-bottom:.35rem}
    .fg .hint{font-size:.75rem;color:#9ca3af;margin-top:.2rem}
    .fg-toggle{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}
    input[type=text],input[type=email],input[type=tel],input[type=number],select,textarea{
      width:100%;padding:.55rem .85rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.875rem;box-sizing:border-box;transition:border-color .2s}
    input:focus,select:focus,textarea:focus{outline:none;border-color:#6366f1}
    textarea{resize:vertical;min-height:100px}
    .frow{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem}
    @media(max-width:640px){.frow{grid-template-columns:1fr}}
    .btn{padding:.55rem 1.25rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;display:inline-flex;align-items:center;gap:.4rem;transition:all .2s}
    .btn-primary{background:#1a2a4e;color:white}.btn-primary:hover{background:#2a3b5e}
    .toggle{position:relative;width:46px;height:24px;flex-shrink:0}
    .toggle input{opacity:0;width:0;height:0}
    .slider{position:absolute;cursor:pointer;inset:0;background:#e5e7eb;border-radius:999px;transition:.2s}
    .slider:before{content:'';position:absolute;height:18px;width:18px;left:3px;bottom:3px;background:white;border-radius:50%;transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
    input:checked+.slider{background:#6366f1}
    input:checked+.slider:before{transform:translateX(22px)}
    .breadcrumb{display:flex;align-items:center;gap:.4rem;font-size:.82rem;color:#9ca3af;margin-bottom:1.25rem}
    .breadcrumb a{color:#6366f1;text-decoration:none}.breadcrumb a:hover{text-decoration:underline}
    .toast{position:fixed;bottom:1.5rem;right:1.5rem;padding:.75rem 1.25rem;border-radius:8px;font-size:.875rem;font-weight:600;z-index:9999;display:none}
    .toast-success{background:#d1fae5;color:#065f46}
    .toast-error{background:#fee2e2;color:#991b1b}
  </style>
</head>
<body>
  ${sidebar}
  <div class="main">
    <div class="breadcrumb">
      <a href="/admin/settings">Einstellungen</a>
      <i class="fas fa-chevron-right" style="font-size:.65rem"></i>
      <span>${cfg.title}</span>
    </div>
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:.75rem">
      <div>
        <h1 style="font-size:1.4rem;font-weight:800;color:#1a2a4e;margin:0">
          <i class="fas fa-${cfg.icon} ${cfg.iconColor} mr-2"></i>${cfg.title}
        </h1>
        <p style="font-size:.85rem;color:#6b7280;margin:.25rem 0 0">${cfg.desc}</p>
      </div>
      ${!isImportExport ? `<button class="btn btn-primary" onclick="saveAll()"><i class="fas fa-save"></i>Speichern</button>` : ''}
    </div>
    <div class="card">
      ${getFields(page, settings)}
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    function showToast(msg, type) {
      if (!type) type = 'success';
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(function() { t.style.display = 'none'; }, 3200);
    }

    async function saveAll() {
      const keys = ${JSON.stringify(keys)};
      const updates = {};
      keys.forEach(function(key) {
        const el = document.getElementById(key);
        if (!el) return;
        if (el.type === 'checkbox') updates[key] = el.checked ? 'true' : 'false';
        else updates[key] = el.value;
      });
      try {
        await Promise.all(Object.entries(updates).map(function(entry) {
          const key = entry[0]; const value = entry[1];
          return fetch('/api/settings/' + key, {
            method: 'PUT', headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ value: value, type: 'string' })
          });
        }));
        showToast('Einstellungen gespeichert');
      } catch(e) { showToast('Fehler beim Speichern', 'error'); }
    }

    function exportData(label) { showToast('Export wird vorbereitet: ' + label); }
    function handleImport(input) { if (input.files[0]) showToast('Datei: ' + input.files[0].name); }
  </script>
</body>
</html>`
}
