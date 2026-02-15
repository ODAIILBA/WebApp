export function AdminSidebarAdvanced(currentPath: string = '/admin') {
  // Comprehensive hierarchical menu structure
  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'tachometer-alt',
      path: '/admin',
      children: [
        { path: '/admin', label: 'Übersicht', icon: 'chart-line' },
        { path: '/admin/quick-actions', label: 'Schnellaktionen', icon: 'bolt' },
        { path: '/admin/system-status', label: 'Systemstatus', icon: 'server' },
        { path: '/admin/notifications', label: 'Benachrichtigungen', icon: 'bell' }
      ]
    },
    {
      id: 'products',
      label: 'Produkte',
      icon: 'box-open',
      children: [
        { path: '/admin/products', label: 'Alle Produkte', icon: 'list' },
        { path: '/admin/products/add', label: 'Produkt hinzufügen', icon: 'plus-circle' },
        { path: '/admin/categories', label: 'Kategorien', icon: 'folder-open' },
        { path: '/admin/brands', label: 'Marken / Hersteller', icon: 'trademark' },
        { path: '/admin/attributes', label: 'Attribute & Varianten', icon: 'tags' },
        { path: '/admin/bundles', label: 'Bundles', icon: 'boxes' },
        { path: '/admin/volume-products', label: 'Volumenprodukte', icon: 'layer-group' },
        { path: '/admin/products/import', label: 'Bulk-Import (CSV)', icon: 'file-csv' },
        { path: '/admin/inventory', label: 'Lager & Verfügbarkeit', icon: 'warehouse' },
        { path: '/admin/products/seo', label: 'Produkt-SEO', icon: 'search' }
      ]
    },
    {
      id: 'orders',
      label: 'Bestellungen',
      icon: 'shopping-cart',
      children: [
        { path: '/admin/orders', label: 'Alle Bestellungen', icon: 'list' },
        { path: '/admin/orders?status=pending', label: 'Offen', icon: 'clock' },
        { path: '/admin/orders?status=processing', label: 'In Bearbeitung', icon: 'spinner' },
        { path: '/admin/orders?status=completed', label: 'Abgeschlossen', icon: 'check-circle' },
        { path: '/admin/orders?status=cancelled', label: 'Storniert', icon: 'times-circle' },
        { path: '/admin/refunds', label: 'Rückerstattungen', icon: 'undo' },
        { path: '/admin/invoices', label: 'Rechnungen', icon: 'file-invoice' },
        { path: '/admin/shipping-status', label: 'Versandstatus (Digital)', icon: 'truck' }
      ]
    },
    {
      id: 'licenses',
      label: 'Lizenzen',
      icon: 'key',
      children: [
        { path: '/admin/licenses', label: 'Lizenzschlüssel', icon: 'key' },
        { path: '/admin/volume-licenses', label: 'Volumenlizenzen', icon: 'keys' },
        { path: '/admin/license-assignments', label: 'Schlüssel-Zuweisung', icon: 'user-tag' },
        { path: '/admin/license-usage', label: 'Nutzung & Aktivierungen', icon: 'chart-bar' },
        { path: '/admin/license-expiry', label: 'Ablauf & Verlängerung', icon: 'calendar-alt' },
        { path: '/admin/licenses/import-export', label: 'CSV Import / Export', icon: 'file-csv' },
        { path: '/admin/certificates', label: 'Zertifikate', icon: 'certificate' },
        { path: '/admin/certificate-settings', label: 'Zertifikat-Einstellungen', icon: 'cog' },
        { path: '/admin/license-security', label: 'Sicherheitsstatus', icon: 'shield-alt' }
      ]
    },
    {
      id: 'customers',
      label: 'Kunden',
      icon: 'users',
      children: [
        { path: '/admin/customers', label: 'Alle Kunden', icon: 'list' },
        { path: '/admin/customer-profiles', label: 'Kundenprofile', icon: 'user-circle' },
        { path: '/admin/customer-orders', label: 'Bestellhistorie', icon: 'history' },
        { path: '/admin/customer-licenses', label: 'Lizenzübersicht', icon: 'key' },
        { path: '/admin/customer-roles', label: 'Kundenrollen', icon: 'user-tag' },
        { path: '/admin/support-history', label: 'Support-Historie', icon: 'headset' },
        { path: '/admin/gdpr-requests', label: 'DSGVO-Anfragen', icon: 'user-shield' }
      ]
    },
    {
      id: 'design',
      label: 'Design',
      icon: 'palette',
      children: [
        { path: '/admin/themes', label: 'Themes', icon: 'paint-brush' },
        { 
          label: 'Seiten', 
          icon: 'file-alt',
          children: [
            { path: '/admin/pages', label: 'Alle Seiten', icon: 'list' },
            { path: '/admin/pages/add', label: 'Neue Seite', icon: 'plus-circle' },
            { path: '/admin/page-templates', label: 'Vorlagen', icon: 'layer-group' },
            { path: '/admin/legal-pages', label: 'Rechtliche Seiten', icon: 'gavel' },
            { path: '/admin/pages/languages', label: 'Mehrsprachigkeit', icon: 'language' }
          ]
        },
        {
          label: 'Homepage & Menü',
          icon: 'home',
          children: [
            { path: '/admin/homepage', label: 'Homepage Manager', icon: 'magic' },
            { path: '/admin/sliders', label: 'Slider', icon: 'images' },
            { path: '/admin/homepage-sections', label: 'Sections (Alt)', icon: 'th-large' },
            { path: '/admin/footer', label: 'Footer', icon: 'shoe-prints' }
          ]
        },
        { path: '/admin/email-templates', label: 'E-Mail-Vorlagen', icon: 'envelope' },
        { path: '/admin/custom-css', label: 'Custom CSS', icon: 'css3-alt' },
        { path: '/admin/custom-js', label: 'Custom JS', icon: 'js' }
      ]
    },
    {
      id: 'marketing',
      label: 'Marketing',
      icon: 'bullhorn',
      children: [
        { path: '/admin/marketing', label: 'Übersicht', icon: 'chart-line' },
        { path: '/admin/seo', label: 'SEO', icon: 'search' },
        { path: '/admin/analytics', label: 'Analytics & Tracking', icon: 'chart-bar' },
        { path: '/admin/cro', label: 'Conversion-Optimierung (CRO)', icon: 'chart-line' },
        { path: '/admin/coupons', label: 'Gutscheine & Rabatte', icon: 'ticket-alt' },
        { path: '/admin/email-marketing', label: 'E-Mail-Marketing', icon: 'envelope-open-text' },
        { path: '/admin/automations', label: 'Automationen', icon: 'robot' },
        { path: '/admin/retargeting', label: 'Retargeting & Ads', icon: 'bullseye' },
        {
          label: 'Produkt-Feeds',
          icon: 'rss',
          children: [
            { path: '/admin/google-merchant', label: 'Google Merchant Center', icon: 'google' },
            { path: '/admin/price-comparison', label: 'Preisvergleich', icon: 'balance-scale' }
          ]
        },
        { path: '/admin/reviews', label: 'Bewertungen & Trust', icon: 'star' },
        { path: '/admin/content-blog', label: 'Content & Blog', icon: 'blog' },
        { path: '/admin/social-media', label: 'Social Media', icon: 'share-alt' },
        { path: '/admin/ab-tests', label: 'A/B-Tests', icon: 'flask' },
        { path: '/admin/affiliate', label: 'Affiliate-Marketing', icon: 'handshake' },
        { path: '/admin/marketing/settings', label: 'Erweiterte Einstellungen', icon: 'cog' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'chart-bar',
      children: [
        { path: '/admin/analytics', label: 'Übersicht', icon: 'chart-line' },
        { path: '/admin/analytics/traffic', label: 'Besucher & Traffic', icon: 'users' },
        { path: '/admin/analytics/behavior', label: 'Nutzerverhalten', icon: 'mouse-pointer' },
        { path: '/admin/analytics/conversion', label: 'Conversion & Umsatz', icon: 'euro-sign' },
        { path: '/admin/analytics/products', label: 'Produkte & Kategorien', icon: 'box-open' },
        { path: '/admin/analytics/checkout', label: 'Checkout & Abbrüche', icon: 'shopping-cart' },
        { path: '/admin/analytics/licenses', label: 'Lizenzen & Downloads', icon: 'download' },
        { path: '/admin/analytics/marketing', label: 'Marketing-Performance', icon: 'bullhorn' },
        { path: '/admin/analytics/seo', label: 'SEO-Performance', icon: 'search' },
        { path: '/admin/analytics/devices', label: 'Geräte & Technik', icon: 'mobile-alt' },
        { path: '/admin/analytics/regions', label: 'Länder & Regionen', icon: 'globe' },
        { path: '/admin/analytics/events', label: 'Ereignisse & Ziele', icon: 'flag-checkered' },
        { path: '/admin/analytics/reports', label: 'Berichte & Exporte', icon: 'file-export' },
        { path: '/admin/integrations', label: 'Integrationen', icon: 'plug' },
        { path: '/admin/analytics/gdpr', label: 'Datenschutz & DSGVO', icon: 'user-shield' }
      ]
    },
    {
      id: 'payments',
      label: 'Zahlungen',
      icon: 'credit-card',
      children: [
        { path: '/admin/payments', label: 'Übersicht', icon: 'chart-line' },
        { path: '/admin/payment-providers', label: 'Zahlungsanbieter', icon: 'building' },
        { path: '/admin/payment-methods', label: 'Zahlungsmethoden', icon: 'credit-card' },
        { path: '/admin/checkout-settings', label: 'Checkout-Einstellungen', icon: 'shopping-bag' },
        { path: '/admin/currencies', label: 'Währungen & Preise', icon: 'euro-sign' },
        {
          label: 'Steuern & EU-VAT',
          icon: 'percent',
          children: [
            { path: '/admin/vat/eu-countries', label: 'EU-Länder', icon: 'flag' },
            { path: '/admin/vat/reverse-charge', label: 'Reverse Charge', icon: 'exchange-alt' },
            { path: '/admin/vat/validation', label: 'VAT-ID Prüfung', icon: 'check-circle' },
            { path: '/admin/vat/oss', label: 'OSS', icon: 'landmark' }
          ]
        },
        { path: '/admin/invoices', label: 'Rechnungen & Belege', icon: 'file-invoice' },
        { path: '/admin/refunds', label: 'Rückerstattungen', icon: 'undo' },
        { path: '/admin/subscriptions', label: 'Abonnements (optional)', icon: 'sync-alt' },
        { path: '/admin/webhooks', label: 'Webhooks & Status', icon: 'exchange-alt' },
        { path: '/admin/fraud-prevention', label: 'Betrugsprävention', icon: 'shield-alt' },
        { path: '/admin/payments/settings', label: 'Erweiterte Einstellungen', icon: 'cog' }
      ]
    },
    {
      id: 'cookies',
      label: 'Cookies & Einwilligungen',
      icon: 'cookie-bite',
      children: [
        { path: '/admin/cookies', label: 'Übersicht', icon: 'chart-line' },
        { path: '/admin/cookie-banner', label: 'Cookie-Banner', icon: 'window-maximize' },
        { path: '/admin/cookie-categories', label: 'Cookie-Kategorien', icon: 'folder-open' },
        { path: '/admin/cookie-list', label: 'Cookie-Liste', icon: 'list' },
        { path: '/admin/consent-logs', label: 'Einwilligungs-Logs', icon: 'clipboard-list' },
        { path: '/admin/cookie-services', label: 'Dienste & Skripte', icon: 'code' },
        { path: '/admin/cookie-languages', label: 'Mehrsprachigkeit', icon: 'language' },
        { path: '/admin/cookie-design', label: 'Design & Darstellung', icon: 'paint-brush' },
        { path: '/admin/geo-rules', label: 'Geo-Regeln (EU / Nicht-EU)', icon: 'globe-europe' },
        { path: '/admin/cookie-integrations', label: 'Integrationen', icon: 'plug' },
        { path: '/admin/cookie-ab-tests', label: 'A/B-Tests', icon: 'flask' },
        { path: '/admin/cookie-legal', label: 'Rechtstexte', icon: 'gavel' },
        { path: '/admin/cookies/settings', label: 'Erweiterte Einstellungen', icon: 'cog' }
      ]
    },
    {
      id: 'security',
      label: 'Sicherheit',
      icon: 'shield-alt',
      children: [
        { path: '/admin/security', label: 'Übersicht', icon: 'chart-line' },
        { path: '/admin/security/firewall', label: 'Firewall', icon: 'fire' },
        { path: '/admin/security/blocked-ips', label: 'Blockierte IPs', icon: 'ban' },
        { path: '/admin/security/login-protection', label: 'Login-Schutz', icon: 'lock' },
        { path: '/admin/security/users-roles', label: 'Benutzer & Rollen', icon: 'users-cog' },
        { path: '/admin/security/2fa', label: 'Zwei-Faktor-Authentifizierung (2FA)', icon: 'mobile-alt' },
        { path: '/admin/security/file-protection', label: 'Datei- & Systemschutz', icon: 'folder-open' },
        { path: '/admin/security/api-webhooks', label: 'API & Webhooks', icon: 'exchange-alt' },
        { path: '/admin/security/email-security', label: 'E-Mail-Sicherheit', icon: 'envelope-open-text' },
        { path: '/admin/audit-log', label: 'Aktivitätsprotokoll', icon: 'history' },
        { path: '/admin/security/scans', label: 'Sicherheits-Scans', icon: 'shield-virus' },
        { path: '/admin/security/login-history', label: 'Login-Verlauf', icon: 'sign-in-alt' },
        { path: '/admin/security/sessions', label: 'Aktive Sessions', icon: 'users' },
        { path: '/admin/security/settings', label: 'Sicherheitseinstellungen', icon: 'cog' },
        { path: '/admin/backup', label: 'Backups & Wiederherstellung', icon: 'database' }
      ]
    },
    {
      id: 'users',
      label: 'Benutzer & Rollen',
      icon: 'users-cog',
      children: [
        { path: '/admin/users', label: 'Alle Benutzer', icon: 'list' },
        { path: '/admin/users/add', label: 'Benutzer hinzufügen', icon: 'user-plus' },
        { path: '/admin/roles', label: 'Rollen & Berechtigungen', icon: 'user-shield' },
        { path: '/admin/admins', label: 'Administratoren', icon: 'user-shield' },
        { path: '/admin/managers', label: 'Manager', icon: 'user-tie' },
        { path: '/admin/support-staff', label: 'Support-Mitarbeiter', icon: 'headset' },
        { path: '/admin/login-activities', label: 'Login-Aktivitäten', icon: 'sign-in-alt' },
        { path: '/admin/user-security', label: 'Sicherheitseinstellungen', icon: 'lock' }
      ]
    },
    {
      id: 'support',
      label: 'Support',
      icon: 'headset',
      children: [
        { path: '/admin/tickets', label: 'Tickets', icon: 'ticket-alt' },
        { path: '/admin/live-chat', label: 'Live-Chat', icon: 'comments' },
        {
          label: 'Kontaktformulare',
          icon: 'envelope',
          children: [
            { path: '/admin/contact-messages', label: 'Nachrichten', icon: 'inbox' },
            { path: '/admin/form-editor', label: 'Formular-Editor', icon: 'edit' },
            { path: '/admin/form-templates', label: 'Vorlagen', icon: 'layer-group' },
            { path: '/admin/form-redirects', label: 'Weiterleitungen', icon: 'directions' }
          ]
        },
        { path: '/admin/faq', label: 'FAQ-Verwaltung', icon: 'question-circle' },
        { path: '/admin/support/settings', label: 'Support-Einstellungen', icon: 'cog' }
      ]
    },
    {
      id: 'settings',
      label: 'Einstellungen',
      icon: 'cog',
      children: [
        { path: '/admin/tax-settings', label: 'Steuereinstellungen', icon: 'percentage' },
        { path: '/admin/shipping-methods', label: 'Versandmethoden', icon: 'shipping-fast' },
        {
          label: 'Allgemein',
          icon: 'store',
          children: [
            { path: '/admin/settings/general', label: 'Shop-Name', icon: 'store' },
            { path: '/admin/settings/slogan', label: 'Slogan', icon: 'quote-right' },
            { path: '/admin/settings/address', label: 'Adresse', icon: 'map-marker-alt' },
            { path: '/admin/settings/contact', label: 'Kontakt-Daten', icon: 'phone' }
          ]
        },
        {
          label: 'Lokalisierung',
          icon: 'globe',
          children: [
            { path: '/admin/settings/languages', label: 'Sprachen (EU)', icon: 'language' },
            { path: '/admin/settings/currency', label: 'Währung', icon: 'euro-sign' },
            { path: '/admin/settings/timezone', label: 'Zeitzone', icon: 'clock' }
          ]
        },
        { path: '/admin/settings/email-smtp', label: 'E-Mail & SMTP', icon: 'envelope' },
        { path: '/admin/settings/shop', label: 'Shop-Einstellungen', icon: 'shopping-bag' },
        { path: '/admin/settings/payment', label: 'Zahlungseinstellungen', icon: 'credit-card' },
        { path: '/admin/settings/legal', label: 'Rechtliches', icon: 'gavel' },
        { path: '/admin/settings/performance', label: 'Performance & Cache', icon: 'tachometer-alt' },
        { path: '/admin/settings/import-export', label: 'Import / Export', icon: 'exchange-alt' },
        { path: '/admin/settings/system', label: 'Systemstatus', icon: 'server' }
      ]
    }
  ];

  // Generate hierarchical menu HTML
  function generateMenuHTML(items: any[], level: number = 0, parentId: string = ''): string {
    return items.map((item, index) => {
      const itemId = item.id || `${parentId}-${index}`;
      const hasChildren = item.children && item.children.length > 0;
      const isActive = currentPath === item.path;
      const isParentActive = item.children?.some((child: any) => 
        child.path === currentPath || child.children?.some((subChild: any) => subChild.path === currentPath)
      );

      if (hasChildren) {
        return `
          <div class="menu-section level-${level}" data-section="${itemId}">
            <div class="menu-header ${isParentActive ? 'active' : ''}" onclick="toggleSection('${itemId}')">
              <div class="menu-header-content">
                <i class="fas fa-${item.icon} menu-icon"></i>
                <span class="menu-label">${item.label}</span>
              </div>
              <i class="fas fa-chevron-down toggle-icon"></i>
            </div>
            <div class="menu-children ${isParentActive ? 'expanded' : ''}" id="section-${itemId}">
              ${generateMenuHTML(item.children, level + 1, itemId)}
            </div>
          </div>
        `;
      } else {
        return `
          <a href="${item.path}" class="menu-item level-${level} ${isActive ? 'active' : ''}" data-path="${item.path}">
            <i class="fas fa-${item.icon} menu-icon"></i>
            <span class="menu-label">${item.label}</span>
          </a>
        `;
      }
    }).join('');
  }

  return `
    <div class="admin-sidebar-advanced">
      <div class="sidebar-header">
        <div class="brand">
          <h2 class="brand-name">SOFTWAREKING24</h2>
          <p class="brand-subtitle">Admin Panel</p>
        </div>
        <button class="sidebar-toggle" onclick="toggleSidebar()" title="Sidebar ein-/ausblenden">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <div class="sidebar-search">
        <div class="search-box">
          <i class="fas fa-search search-icon"></i>
          <input 
            type="text" 
            id="sidebar-search-input" 
            placeholder="Suchen... (Strg+K)" 
            onkeyup="filterMenu(this.value)"
            class="search-input"
          />
          <button onclick="clearSearch()" class="clear-search" id="clear-search-btn" style="display: none;">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <nav class="sidebar-nav" id="sidebar-nav-container">
        ${generateMenuHTML(menuStructure)}
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <i class="fas fa-user-circle"></i>
          <span>Administrator</span>
        </div>
        <a href="/logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          <span>Abmelden</span>
        </a>
      </div>

      <style>
        :root {
          --sidebar-width: 280px;
          --sidebar-collapsed-width: 60px;
          --navy-dark: #1a2a4e;
          --navy-light: #2a3b5e;
          --gold: #d4af37;
          --gold-hover: #e5c24d;
        }

        .admin-sidebar-advanced {
          position: fixed;
          left: 0;
          top: 0;
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--navy-dark);
          color: white;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          transition: width 0.3s ease;
          overflow: hidden;
        }

        .admin-sidebar-advanced.collapsed {
          width: var(--sidebar-collapsed-width);
        }

        .admin-sidebar-advanced.collapsed .menu-label,
        .admin-sidebar-advanced.collapsed .brand-subtitle,
        .admin-sidebar-advanced.collapsed .brand-name,
        .admin-sidebar-advanced.collapsed .toggle-icon,
        .admin-sidebar-advanced.collapsed .user-info span {
          opacity: 0;
          width: 0;
          overflow: hidden;
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          flex: 1;
        }

        .brand-name {
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--gold);
          margin: 0;
          white-space: nowrap;
          transition: opacity 0.3s ease;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0.25rem 0 0 0;
          transition: opacity 0.3s ease;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .sidebar-search {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.625rem 2.5rem 0.625rem 2.25rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--gold);
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.1);
        }

        .clear-search {
          position: absolute;
          right: 0.5rem;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .clear-search:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .menu-item.search-hidden,
        .menu-section.search-hidden {
          display: none !important;
        }

        .menu-item.search-highlight {
          background: rgba(212, 175, 55, 0.2);
        }

        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 1rem 0;
        }

        .sidebar-nav::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-nav::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .menu-section {
          margin: 0.25rem 0;
        }

        .menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.2s;
          font-weight: 600;
        }

        .menu-header:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .menu-header.active {
          color: var(--gold);
          background: rgba(212, 175, 55, 0.1);
        }

        .menu-header-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .menu-icon {
          width: 1.25rem;
          text-align: center;
          font-size: 1rem;
        }

        .menu-label {
          transition: opacity 0.3s ease;
          white-space: nowrap;
        }

        .toggle-icon {
          font-size: 0.75rem;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .menu-header.active .toggle-icon,
        .menu-children.expanded + .menu-header .toggle-icon {
          transform: rotate(180deg);
        }

        .menu-children {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: rgba(0, 0, 0, 0.2);
        }

        .menu-children.expanded {
          max-height: 2000px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.625rem 1rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.2s;
          border-left: 3px solid transparent;
        }

        .menu-item.level-1 {
          padding-left: 2.5rem;
        }

        .menu-item.level-2 {
          padding-left: 3.5rem;
          font-size: 0.875rem;
        }

        .menu-item.level-3 {
          padding-left: 4.5rem;
          font-size: 0.875rem;
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border-left-color: rgba(212, 175, 55, 0.5);
        }

        .menu-item.active {
          background: rgba(212, 175, 55, 0.15);
          color: var(--gold);
          border-left-color: var(--gold);
          font-weight: 600;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .user-info i {
          font-size: 1.5rem;
        }

        .user-info span {
          font-size: 0.875rem;
          transition: opacity 0.3s ease;
          white-space: nowrap;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background: rgba(220, 53, 69, 0.2);
          color: #ff6b6b;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .admin-sidebar-advanced {
            transform: translateX(-100%);
          }

          .admin-sidebar-advanced.open {
            transform: translateX(0);
          }
        }
      </style>

      <script>
        // ===== SEARCH FUNCTIONALITY =====
        function filterMenu(searchTerm) {
          const term = searchTerm.toLowerCase().trim();
          const clearBtn = document.getElementById('clear-search-btn');
          
          // Show/hide clear button
          clearBtn.style.display = term ? 'block' : 'none';

          if (!term) {
            // Show all items and collapse sections
            document.querySelectorAll('.menu-item, .menu-section').forEach(el => {
              el.classList.remove('search-hidden', 'search-highlight');
            });
            document.querySelectorAll('.menu-children').forEach(el => {
              el.classList.remove('expanded');
            });
            document.querySelectorAll('.menu-header').forEach(el => {
              el.classList.remove('active');
            });
            return;
          }

          // Filter menu items
          const allItems = document.querySelectorAll('.menu-item');
          const allSections = document.querySelectorAll('.menu-section');
          
          allItems.forEach(item => {
            const label = item.querySelector('.menu-label')?.textContent.toLowerCase() || '';
            if (label.includes(term)) {
              item.classList.remove('search-hidden');
              item.classList.add('search-highlight');
              
              // Expand parent sections
              let parent = item.closest('.menu-children');
              while (parent) {
                parent.classList.add('expanded');
                const header = parent.previousElementSibling;
                if (header?.classList.contains('menu-header')) {
                  header.classList.add('active');
                }
                const parentSection = parent.closest('.menu-section');
                if (parentSection) {
                  parentSection.classList.remove('search-hidden');
                }
                parent = parent.parentElement?.closest('.menu-children');
              }
            } else {
              item.classList.add('search-hidden');
              item.classList.remove('search-highlight');
            }
          });

          // Hide empty sections
          allSections.forEach(section => {
            const visibleItems = section.querySelectorAll('.menu-item:not(.search-hidden)');
            if (visibleItems.length === 0) {
              section.classList.add('search-hidden');
            }
          });
        }

        function clearSearch() {
          const input = document.getElementById('sidebar-search-input');
          input.value = '';
          filterMenu('');
          input.focus();
        }

        // ===== SECTION TOGGLE =====
        function toggleSection(sectionId) {
          const section = document.querySelector(\`[data-section="\${sectionId}"]\`);
          const children = section.querySelector('.menu-children');
          const header = section.querySelector('.menu-header');
          
          if (children.classList.contains('expanded')) {
            children.classList.remove('expanded');
            header.classList.remove('active');
            saveSectionState(sectionId, false);
          } else {
            children.classList.add('expanded');
            header.classList.add('active');
            saveSectionState(sectionId, true);
          }
        }

        // ===== SIDEBAR TOGGLE WITH LOCALSTORAGE =====
        function toggleSidebar() {
          const sidebar = document.querySelector('.admin-sidebar-advanced');
          const isCollapsed = sidebar.classList.toggle('collapsed');
          document.body.classList.toggle('sidebar-collapsed');
          
          // Save state to localStorage
          localStorage.setItem('sidebar-collapsed', isCollapsed ? 'true' : 'false');
        }

        // ===== LOCALSTORAGE PERSISTENCE =====
        function saveSectionState(sectionId, isExpanded) {
          const state = JSON.parse(localStorage.getItem('sidebar-sections') || '{}');
          state[sectionId] = isExpanded;
          localStorage.setItem('sidebar-sections', JSON.stringify(state));
        }

        function loadSectionStates() {
          const state = JSON.parse(localStorage.getItem('sidebar-sections') || '{}');
          Object.keys(state).forEach(sectionId => {
            if (state[sectionId]) {
              const section = document.querySelector(\`[data-section="\${sectionId}"]\`);
              if (section) {
                const children = section.querySelector('.menu-children');
                const header = section.querySelector('.menu-header');
                if (children && header) {
                  children.classList.add('expanded');
                  header.classList.add('active');
                }
              }
            }
          });
        }

        function loadSidebarState() {
          const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
          if (isCollapsed) {
            document.querySelector('.admin-sidebar-advanced').classList.add('collapsed');
            document.body.classList.add('sidebar-collapsed');
          }
        }

        // ===== KEYBOARD SHORTCUTS =====
        document.addEventListener('keydown', (e) => {
          // Ctrl+K or Cmd+K for search
          if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('sidebar-search-input');
            searchInput.focus();
            searchInput.select();
          }

          // ESC to clear search
          if (e.key === 'Escape') {
            const searchInput = document.getElementById('sidebar-search-input');
            if (document.activeElement === searchInput && searchInput.value) {
              clearSearch();
            }
          }

          // Ctrl+B or Cmd+B to toggle sidebar
          if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            toggleSidebar();
          }
        });

        // ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', () => {
          // Load saved sidebar state
          loadSidebarState();
          
          // Load saved section states
          loadSectionStates();
          
          // Auto-expand active sections
          const activePath = window.location.pathname;
          const activeItem = document.querySelector(\`.menu-item[data-path="\${activePath}"]\`);
          
          if (activeItem) {
            let parent = activeItem.closest('.menu-children');
            while (parent) {
              parent.classList.add('expanded');
              const header = parent.previousElementSibling;
              if (header && header.classList.contains('menu-header')) {
                header.classList.add('active');
              }
              parent = parent.parentElement.closest('.menu-children');
            }
          }
        });
      </script>
    </div>
  `;
}

export function AdminHeaderAdvanced(title: string) {
  return `
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        ${title}
      </h1>
    </div>
  `;
}
