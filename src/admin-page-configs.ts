// Admin Page Configurations
// Complete definitions for all 44 admin pages

export interface AdminPageConfig {
  path: string
  title: string
  icon: string
  iconColor: string
  description: string
  dbQuery?: string
  statsCards?: Array<{
    label: string
    query?: string
    color: string
    icon: string
    format?: 'number' | 'currency' | 'percentage'
  }>
  tableColumns?: Array<{
    key: string
    label: string
    format?: 'date' | 'currency' | 'badge' | 'email' | 'text'
  }>
  actions?: Array<{
    label: string
    icon: string
    color: string
    action: string
  }>
  filters?: Array<{
    label: string
    type: 'search' | 'select' | 'date'
    options?: string[]
  }>
}

export const adminPageConfigs: Record<string, AdminPageConfig> = {
  // ============================================
  // OVERVIEW/PARENT PAGES
  // ============================================
  '/admin/orders': {
    path: '/admin/orders',
    title: 'Bestellungen',
    icon: 'shopping-cart',
    iconColor: 'blue',
    description: 'Übersicht aller Bestellungen',
    dbQuery: `SELECT o.*, u.email as customer_email, u.first_name || ' ' || u.last_name as customer_name 
              FROM orders o LEFT JOIN users u ON o.user_id = u.id 
              ORDER BY o.created_at DESC LIMIT 100`,
    statsCards: [
      { label: 'Gesamt', query: 'SELECT COUNT(*) as count FROM orders', color: 'text-blue-600', icon: 'shopping-cart' },
      { label: 'Ausstehend', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "pending"', color: 'text-yellow-600', icon: 'clock' },
      { label: 'Abgeschlossen', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "completed"', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Umsatz', query: 'SELECT SUM(total_amount) as sum FROM orders WHERE status = "completed"', color: 'text-green-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'customer_email', label: 'E-Mail', format: 'email' },
      { key: 'total_amount', label: 'Betrag', format: 'currency' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Datum', format: 'date' }
    ],
    actions: [
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' },
      { label: 'Exportieren', icon: 'download', color: 'green', action: 'exportData()' }
    ]
  },

  '/admin/licenses': {
    path: '/admin/licenses',
    title: 'Lizenzschlüssel',
    icon: 'key',
    iconColor: 'purple',
    description: 'Verwaltung aller Lizenzschlüssel',
    dbQuery: `SELECT l.*, p.name as product_name, o.order_number
              FROM licenses l
              LEFT JOIN products p ON l.product_id = p.id
              LEFT JOIN orders o ON l.order_id = o.id
              ORDER BY l.created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Gesamt Lizenzen', query: 'SELECT COUNT(*) as count FROM licenses', color: 'text-purple-600', icon: 'key' },
      { label: 'Aktiv', query: 'SELECT COUNT(*) as count FROM licenses WHERE is_active = 1', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Inaktiv', query: 'SELECT COUNT(*) as count FROM licenses WHERE is_active = 0', color: 'text-gray-600', icon: 'times-circle' }
    ],
    tableColumns: [
      { key: 'license_key', label: 'Lizenzschlüssel' },
      { key: 'product_name', label: 'Produkt' },
      { key: 'order_number', label: 'Bestellung' },
      { key: 'is_active', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neue Lizenz', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  '/admin/marketing': {
    path: '/admin/marketing',
    title: 'Marketing',
    icon: 'bullhorn',
    iconColor: 'orange',
    description: 'Marketing-Übersicht und Kampagnen',
    dbQuery: `SELECT c.*, 
              (SELECT COUNT(*) FROM orders WHERE coupon_code = c.code) as usage_count,
              (SELECT SUM(discount_amount) FROM orders WHERE coupon_code = c.code) as total_discount
              FROM coupons c
              ORDER BY c.created_at DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Gutscheine', query: 'SELECT COUNT(*) as count FROM coupons', color: 'text-orange-600', icon: 'ticket-alt' },
      { label: 'Aktive', query: 'SELECT COUNT(*) as count FROM coupons WHERE is_active = 1', color: 'text-green-600', icon: 'check' },
      { label: 'Verwendungen', query: 'SELECT COUNT(*) as count FROM orders WHERE coupon_code IS NOT NULL', color: 'text-blue-600', icon: 'shopping-cart' }
    ],
    tableColumns: [
      { key: 'code', label: 'Gutschein-Code' },
      { key: 'discount_type', label: 'Typ' },
      { key: 'discount_value', label: 'Wert' },
      { key: 'usage_count', label: 'Verwendungen' },
      { key: 'is_active', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neuer Gutschein', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Kampagnen', icon: 'bullhorn', color: 'orange', action: 'window.location.href="/admin/campaigns"' }
    ]
  },

  '/admin/coupons': {
    path: '/admin/coupons',
    title: 'Gutscheine',
    icon: 'ticket-alt',
    iconColor: 'pink',
    description: 'Gutschein- und Rabattcode-Verwaltung',
    dbQuery: `SELECT c.*, 
              (SELECT COUNT(*) FROM orders WHERE coupon_code = c.code) as usage_count
              FROM coupons c
              ORDER BY c.created_at DESC`,
    statsCards: [
      { label: 'Gesamt Gutscheine', query: 'SELECT COUNT(*) as count FROM coupons', color: 'text-pink-600', icon: 'ticket-alt' },
      { label: 'Aktiv', query: 'SELECT COUNT(*) as count FROM coupons WHERE is_active = 1 AND (valid_until IS NULL OR valid_until >= date("now"))', color: 'text-green-600', icon: 'check' },
      { label: 'Abgelaufen', query: 'SELECT COUNT(*) as count FROM coupons WHERE valid_until < date("now")', color: 'text-red-600', icon: 'times' },
      { label: 'Verwendungen', query: 'SELECT COUNT(*) as count FROM orders WHERE coupon_code IS NOT NULL', color: 'text-blue-600', icon: 'shopping-cart' }
    ],
    tableColumns: [
      { key: 'code', label: 'Code' },
      { key: 'discount_type', label: 'Typ' },
      { key: 'discount_value', label: 'Wert' },
      { key: 'usage_count', label: 'Verwendet' },
      { key: 'max_uses', label: 'Max. Nutzung' },
      { key: 'valid_until', label: 'Gültig bis', format: 'date' },
      { key: 'is_active', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neuer Gutschein', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' },
      { label: 'Exportieren', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/seo': {
    path: '/admin/seo',
    title: 'SEO Einstellungen',
    icon: 'search',
    iconColor: 'teal',
    description: 'Suchmaschinenoptimierung und Meta-Tags',
    dbQuery: `SELECT p.id, p.name, p.slug, 
              COALESCE(p.meta_title, '') as meta_title,
              COALESCE(p.meta_description, '') as meta_description,
              COALESCE(p.meta_keywords, '') as meta_keywords
              FROM products p
              ORDER BY p.created_at DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Produkte', query: 'SELECT COUNT(*) as count FROM products', color: 'text-blue-600', icon: 'box' },
      { label: 'Mit Meta-Title', query: 'SELECT COUNT(*) as count FROM products WHERE meta_title IS NOT NULL AND meta_title != ""', color: 'text-green-600', icon: 'check' },
      { label: 'Ohne Meta-Description', query: 'SELECT COUNT(*) as count FROM products WHERE meta_description IS NULL OR meta_description = ""', color: 'text-red-600', icon: 'exclamation-triangle' }
    ],
    tableColumns: [
      { key: 'name', label: 'Produkt' },
      { key: 'slug', label: 'Slug' },
      { key: 'meta_title', label: 'Meta Title' },
      { key: 'meta_description', label: 'Meta Description' }
    ],
    actions: [
      { label: 'Produkt SEO', icon: 'search', color: 'teal', action: 'window.location.href="/admin/products/seo"' },
      { label: 'Bulk Edit', icon: 'edit', color: 'blue', action: 'addNew()' }
    ]
  },

  '/admin/pages': {
    path: '/admin/pages',
    title: 'Seiten',
    icon: 'file-alt',
    iconColor: 'indigo',
    description: 'CMS-Seiten und Inhalte verwalten',
    dbQuery: `SELECT * FROM pages ORDER BY created_at DESC LIMIT 50`,
    statsCards: [
      { label: 'Seiten', query: 'SELECT COUNT(*) as count FROM pages', color: 'text-indigo-600', icon: 'file-alt' },
      { label: 'Veröffentlicht', query: 'SELECT COUNT(*) as count FROM pages WHERE is_published = 1', color: 'text-green-600', icon: 'check' },
      { label: 'Entwürfe', query: 'SELECT COUNT(*) as count FROM pages WHERE is_published = 0', color: 'text-yellow-600', icon: 'edit' }
    ],
    tableColumns: [
      { key: 'title', label: 'Titel' },
      { key: 'slug', label: 'Slug' },
      { key: 'is_published', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neue Seite', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  // ============================================
  // ORDERS SECTION
  // ============================================
  '/admin/orders/pending': {
    path: '/admin/orders/pending',
    title: 'Ausstehende Bestellungen',
    icon: 'clock',
    iconColor: 'yellow',
    description: 'Bestellungen die auf Bearbeitung warten',
    dbQuery: `SELECT o.*, u.email as customer_email, u.first_name || ' ' || u.last_name as customer_name 
              FROM orders o LEFT JOIN users u ON o.user_id = u.id 
              WHERE o.status = 'pending' ORDER BY o.created_at DESC LIMIT 50`,
    statsCards: [
      { label: 'Gesamt Ausstehend', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "pending"', color: 'text-yellow-600', icon: 'clock' },
      { label: 'Heute', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "pending" AND date(created_at) = date("now")', color: 'text-blue-600', icon: 'calendar-day' },
      { label: 'Gesamtwert', query: 'SELECT SUM(total_amount) as sum FROM orders WHERE status = "pending"', color: 'text-green-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'customer_email', label: 'E-Mail', format: 'email' },
      { key: 'total_amount', label: 'Betrag', format: 'currency' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' },
      { label: 'Exportieren', icon: 'download', color: 'green', action: 'exportData()' }
    ]
  },

  '/admin/orders/processing': {
    path: '/admin/orders/processing',
    title: 'Bestellungen in Bearbeitung',
    icon: 'spinner',
    iconColor: 'blue',
    description: 'Bestellungen die derzeit bearbeitet werden',
    dbQuery: `SELECT o.*, u.email as customer_email, u.first_name || ' ' || u.last_name as customer_name 
              FROM orders o LEFT JOIN users u ON o.user_id = u.id 
              WHERE o.status = 'processing' ORDER BY o.updated_at DESC LIMIT 50`,
    statsCards: [
      { label: 'In Bearbeitung', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "processing"', color: 'text-blue-600', icon: 'spinner' },
      { label: 'Durchschn. Zeit', color: 'text-purple-600', icon: 'clock', format: 'text' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'total_amount', label: 'Betrag', format: 'currency' },
      { key: 'updated_at', label: 'Aktualisiert', format: 'date' }
    ],
    actions: [
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  '/admin/orders/completed': {
    path: '/admin/orders/completed',
    title: 'Abgeschlossene Bestellungen',
    icon: 'check-circle',
    iconColor: 'green',
    description: 'Erfolgreich abgeschlossene Bestellungen',
    dbQuery: `SELECT o.*, u.email as customer_email, u.first_name || ' ' || u.last_name as customer_name 
              FROM orders o LEFT JOIN users u ON o.user_id = u.id 
              WHERE o.status = 'completed' ORDER BY o.updated_at DESC LIMIT 100`,
    statsCards: [
      { label: 'Abgeschlossen', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "completed"', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Gesamtumsatz', query: 'SELECT SUM(total_amount) as sum FROM orders WHERE status = "completed"', color: 'text-green-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Heute', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "completed" AND date(updated_at) = date("now")', color: 'text-blue-600', icon: 'calendar-day' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'customer_email', label: 'E-Mail', format: 'email' },
      { key: 'total_amount', label: 'Betrag', format: 'currency' },
      { key: 'updated_at', label: 'Abgeschlossen', format: 'date' }
    ],
    actions: [
      { label: 'Drucken', icon: 'print', color: 'gray', action: 'window.print()' },
      { label: 'Exportieren', icon: 'download', color: 'green', action: 'exportData()' }
    ]
  },

  '/admin/orders/cancelled': {
    path: '/admin/orders/cancelled',
    title: 'Stornierte Bestellungen',
    icon: 'times-circle',
    iconColor: 'red',
    description: 'Bestellungen die storniert wurden',
    dbQuery: `SELECT o.*, u.email as customer_email, u.first_name || ' ' || u.last_name as customer_name 
              FROM orders o LEFT JOIN users u ON o.user_id = u.id 
              WHERE o.status = 'cancelled' ORDER BY o.updated_at DESC LIMIT 50`,
    statsCards: [
      { label: 'Storniert', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "cancelled"', color: 'text-red-600', icon: 'times-circle' },
      { label: 'Verlorener Wert', query: 'SELECT SUM(total_amount) as sum FROM orders WHERE status = "cancelled"', color: 'text-orange-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'total_amount', label: 'Betrag', format: 'currency' },
      { key: 'updated_at', label: 'Storniert am', format: 'date' }
    ],
    actions: [
      { label: 'Exportieren', icon: 'download', color: 'blue', action: 'exportData()' }
    ]
  },

  '/admin/shipping-status': {
    path: '/admin/shipping-status',
    title: 'Versandstatus (Digital)',
    icon: 'shipping-fast',
    iconColor: 'indigo',
    description: 'Übersicht über den digitalen Versandstatus',
    dbQuery: `SELECT o.id, o.order_number, o.status, o.created_at, o.updated_at,
              u.email as customer_email, u.first_name || ' ' || u.last_name as customer_name,
              COUNT(l.id) as license_count
              FROM orders o
              LEFT JOIN users u ON o.user_id = u.id
              LEFT JOIN licenses l ON l.order_id = o.id
              WHERE o.status IN ('completed','processing')
              GROUP BY o.id
              ORDER BY o.updated_at DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Lizenzen versandt', query: 'SELECT COUNT(*) as count FROM licenses WHERE is_active = 1', color: 'text-green-600', icon: 'envelope' },
      { label: 'Ausstehend', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "processing"', color: 'text-yellow-600', icon: 'clock' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'license_count', label: 'Lizenzen' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'updated_at', label: 'Aktualisiert', format: 'date' }
    ],
    actions: [
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  // ============================================
  // LICENSES SECTION
  // ============================================
  '/admin/license-assignments': {
    path: '/admin/license-assignments',
    title: 'Lizenz-Zuweisungen',
    icon: 'link',
    iconColor: 'purple',
    description: 'Verwaltung der Lizenzzuweisungen zu Produkten',
    dbQuery: `SELECT l.*, p.name as product_name, o.order_number
              FROM licenses l
              LEFT JOIN products p ON l.product_id = p.id
              LEFT JOIN orders o ON l.order_id = o.id
              ORDER BY l.created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Zugewiesene Lizenzen', query: 'SELECT COUNT(*) as count FROM licenses WHERE is_active = 1', color: 'text-green-600', icon: 'check' },
      { label: 'Nicht zugewiesen', query: 'SELECT COUNT(*) as count FROM licenses WHERE is_active = 0', color: 'text-yellow-600', icon: 'clock' }
    ],
    tableColumns: [
      { key: 'license_key', label: 'Lizenzschlüssel' },
      { key: 'product_name', label: 'Produkt' },
      { key: 'order_number', label: 'Bestellung' },
      { key: 'is_active', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neue Zuweisung', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  // ============================================
  // CUSTOMERS SECTION
  // ============================================
  '/admin/customers': {
    path: '/admin/customers',
    title: 'Kunden',
    icon: 'users',
    iconColor: 'blue',
    description: 'Kundenverwaltung und Kundeninformationen',
    dbQuery: `SELECT u.*, COUNT(DISTINCT o.id) as order_count, SUM(o.total_amount) as total_spent
              FROM users u
              LEFT JOIN orders o ON o.user_id = u.id
              GROUP BY u.id
              ORDER BY u.created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Gesamt Kunden', query: 'SELECT COUNT(*) as count FROM users', color: 'text-blue-600', icon: 'users' },
      { label: 'Neue (30 Tage)', query: 'SELECT COUNT(*) as count FROM users WHERE created_at >= date("now", "-30 days")', color: 'text-green-600', icon: 'user-plus' },
      { label: 'Mit Bestellungen', query: 'SELECT COUNT(DISTINCT user_id) as count FROM orders', color: 'text-purple-600', icon: 'shopping-cart' }
    ],
    tableColumns: [
      { key: 'email', label: 'E-Mail', format: 'email' },
      { key: 'first_name', label: 'Vorname' },
      { key: 'last_name', label: 'Nachname' },
      { key: 'order_count', label: 'Bestellungen' },
      { key: 'total_spent', label: 'Ausgaben', format: 'currency' },
      { key: 'created_at', label: 'Registriert', format: 'date' }
    ],
    actions: [
      { label: 'Neuer Kunde', icon: 'user-plus', color: 'green', action: 'addNew()' },
      { label: 'Exportieren', icon: 'download', color: 'blue', action: 'exportData()' }
    ],
    filters: [
      { label: 'Suche', type: 'search' }
    ]
  },

  '/admin/customer-groups': {
    path: '/admin/customer-groups',
    title: 'Kundengruppen',
    icon: 'users-cog',
    iconColor: 'indigo',
    description: 'Verwaltung von Kundengruppen und Segmenten',
    statsCards: [
      { label: 'Gruppen', color: 'text-indigo-600', icon: 'layer-group' },
      { label: 'Zugewiesene Kunden', color: 'text-blue-600', icon: 'users' }
    ],
    tableColumns: [
      { key: 'name', label: 'Gruppenname' },
      { key: 'description', label: 'Beschreibung' },
      { key: 'customer_count', label: 'Kunden' },
      { key: 'discount', label: 'Rabatt', format: 'percentage' }
    ],
    actions: [
      { label: 'Neue Gruppe', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  '/admin/customer-reviews': {
    path: '/admin/customer-reviews',
    title: 'Kundenbewertungen',
    icon: 'star',
    iconColor: 'yellow',
    description: 'Verwaltung von Produktbewertungen',
    statsCards: [
      { label: 'Bewertungen', color: 'text-yellow-600', icon: 'star' },
      { label: 'Ausstehend', color: 'text-orange-600', icon: 'clock' },
      { label: 'Durchschn. Bewertung', color: 'text-green-600', icon: 'chart-line' }
    ],
    tableColumns: [
      { key: 'customer', label: 'Kunde' },
      { key: 'product', label: 'Produkt' },
      { key: 'rating', label: 'Bewertung' },
      { key: 'comment', label: 'Kommentar' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Datum', format: 'date' }
    ],
    actions: [
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  // ============================================
  // DESIGN SECTION
  // ============================================
  '/admin/themes': {
    path: '/admin/themes',
    title: 'Themes',
    icon: 'palette',
    iconColor: 'pink',
    description: 'Design-Themes verwalten',
    statsCards: [
      { label: 'Installierte Themes', color: 'text-pink-600', icon: 'palette' },
      { label: 'Aktives Theme', color: 'text-green-600', icon: 'check' }
    ],
    tableColumns: [
      { key: 'name', label: 'Theme-Name' },
      { key: 'version', label: 'Version' },
      { key: 'author', label: 'Autor' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Theme hochladen', icon: 'upload', color: 'blue', action: 'importData()' }
    ]
  },

  '/admin/menus': {
    path: '/admin/menus',
    title: 'Menüs',
    icon: 'bars',
    iconColor: 'gray',
    description: 'Navigation und Menüstrukturen verwalten',
    statsCards: [
      { label: 'Menüs', color: 'text-gray-600', icon: 'bars' },
      { label: 'Menü-Einträge', color: 'text-blue-600', icon: 'list' }
    ],
    tableColumns: [
      { key: 'name', label: 'Menü-Name' },
      { key: 'location', label: 'Position' },
      { key: 'items', label: 'Einträge' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neues Menü', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  // ============================================
  // MARKETING SECTION
  // ============================================
  '/admin/campaigns': {
    path: '/admin/campaigns',
    title: 'Kampagnen',
    icon: 'bullhorn',
    iconColor: 'orange',
    description: 'Marketing-Kampagnen verwalten',
    statsCards: [
      { label: 'Aktive Kampagnen', color: 'text-green-600', icon: 'play' },
      { label: 'Geplante', color: 'text-blue-600', icon: 'calendar' },
      { label: 'Abgeschlossen', color: 'text-gray-600', icon: 'check' }
    ],
    tableColumns: [
      { key: 'name', label: 'Kampagnenname' },
      { key: 'type', label: 'Typ' },
      { key: 'start_date', label: 'Start', format: 'date' },
      { key: 'end_date', label: 'Ende', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neue Kampagne', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  '/admin/newsletter': {
    path: '/admin/newsletter',
    title: 'Newsletter',
    icon: 'envelope',
    iconColor: 'blue',
    description: 'Newsletter-Abonnenten und Kampagnen',
    statsCards: [
      { label: 'Abonnenten', color: 'text-blue-600', icon: 'users' },
      { label: 'Versandt', color: 'text-green-600', icon: 'paper-plane' },
      { label: 'Öffnungsrate', color: 'text-purple-600', icon: 'chart-line', format: 'percentage' }
    ],
    tableColumns: [
      { key: 'email', label: 'E-Mail', format: 'email' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'subscribed_at', label: 'Angemeldet', format: 'date' }
    ],
    actions: [
      { label: 'Newsletter senden', icon: 'paper-plane', color: 'blue', action: 'addNew()' },
      { label: 'Exportieren', icon: 'download', color: 'green', action: 'exportData()' }
    ]
  },

  '/admin/email-templates': {
    path: '/admin/email-templates',
    title: 'E-Mail Vorlagen',
    icon: 'file-alt',
    iconColor: 'teal',
    description: 'E-Mail-Templates verwalten',
    statsCards: [
      { label: 'Templates', color: 'text-teal-600', icon: 'file-alt' },
      { label: 'Aktiv', color: 'text-green-600', icon: 'check' }
    ],
    tableColumns: [
      { key: 'name', label: 'Template-Name' },
      { key: 'subject', label: 'Betreff' },
      { key: 'type', label: 'Typ' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neue Vorlage', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  // ============================================
  // ANALYTICS SECTION
  // ============================================
  '/admin/reports': {
    path: '/admin/reports',
    title: 'Berichte',
    icon: 'chart-bar',
    iconColor: 'purple',
    description: 'Analytische Berichte und Statistiken',
    statsCards: [
      { label: 'Gesamt Umsatz', query: 'SELECT SUM(total_amount) as sum FROM orders WHERE status = "completed"', color: 'text-green-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Bestellungen', query: 'SELECT COUNT(*) as count FROM orders', color: 'text-blue-600', icon: 'shopping-cart' },
      { label: 'Kunden', query: 'SELECT COUNT(*) as count FROM users', color: 'text-purple-600', icon: 'users' }
    ],
    actions: [
      { label: 'PDF Export', icon: 'file-pdf', color: 'red', action: 'exportData()' },
      { label: 'Excel Export', icon: 'file-excel', color: 'green', action: 'exportData()' }
    ]
  },

  // ============================================
  // PAYMENT SECTION (13 pages)
  // ============================================
  '/admin/payments': {
    path: '/admin/payments',
    title: 'Zahlungen Übersicht',
    icon: 'credit-card',
    iconColor: 'green',
    description: 'Übersicht aller Zahlungen und Transaktionen',
    dbQuery: `SELECT o.*, u.email as customer_email, u.first_name || ' ' || u.last_name as customer_name
              FROM orders o
              LEFT JOIN users u ON o.user_id = u.id
              WHERE o.payment_status IS NOT NULL
              ORDER BY o.created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Zahlungen', query: 'SELECT COUNT(*) as count FROM orders WHERE payment_status = "paid"', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Ausstehend', query: 'SELECT COUNT(*) as count FROM orders WHERE payment_status = "pending"', color: 'text-yellow-600', icon: 'clock' },
      { label: 'Gesamt Betrag', query: 'SELECT SUM(total_amount) as sum FROM orders WHERE payment_status = "paid"', color: 'text-green-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellung' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'total_amount', label: 'Betrag', format: 'currency' },
      { key: 'payment_status', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Datum', format: 'date' }
    ],
    actions: [
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' },
      { label: 'Exportieren', icon: 'download', color: 'green', action: 'exportData()' }
    ]
  },

  '/admin/payment-providers': {
    path: '/admin/payment-providers',
    title: 'Zahlungsanbieter',
    icon: 'building',
    iconColor: 'indigo',
    description: 'Konfiguration von Zahlungsanbietern (Stripe, PayPal, etc.)',
    statsCards: [
      { label: 'Aktive Anbieter', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Inaktiv', color: 'text-gray-600', icon: 'times-circle' }
    ],
    tableColumns: [
      { key: 'name', label: 'Anbieter' },
      { key: 'type', label: 'Typ' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'transaction_fee', label: 'Gebühr', format: 'percentage' }
    ],
    actions: [
      { label: 'Anbieter hinzufügen', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  '/admin/payment-methods': {
    path: '/admin/payment-methods',
    title: 'Zahlungsmethoden',
    icon: 'wallet',
    iconColor: 'blue',
    description: 'Verfügbare Zahlungsmethoden verwalten',
    statsCards: [
      { label: 'Aktive Methoden', color: 'text-green-600', icon: 'check' },
      { label: 'Verfügbar', color: 'text-blue-600', icon: 'wallet' }
    ],
    tableColumns: [
      { key: 'name', label: 'Methode' },
      { key: 'type', label: 'Typ' },
      { key: 'provider', label: 'Anbieter' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neue Methode', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  '/admin/checkout-settings': {
    path: '/admin/checkout-settings',
    title: 'Checkout-Einstellungen',
    icon: 'shopping-cart',
    iconColor: 'purple',
    description: 'Konfiguration des Checkout-Prozesses',
    actions: [
      { label: 'Einstellungen speichern', icon: 'save', color: 'green', action: 'alert("Gespeichert!")' }
    ]
  },

  '/admin/currencies': {
    path: '/admin/currencies',
    title: 'Währungen & Preise',
    icon: 'money-bill-wave',
    iconColor: 'green',
    description: 'Währungsverwaltung und Wechselkurse',
    statsCards: [
      { label: 'Aktive Währungen', color: 'text-green-600', icon: 'globe' },
      { label: 'Standard', color: 'text-blue-600', icon: 'star' }
    ],
    tableColumns: [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Währung' },
      { key: 'symbol', label: 'Symbol' },
      { key: 'exchange_rate', label: 'Wechselkurs' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Währung hinzufügen', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Kurse aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  '/admin/taxes': {
    path: '/admin/taxes',
    title: 'Steuern & EU-VAT',
    icon: 'percentage',
    iconColor: 'red',
    description: 'Steuer- und Mehrwertsteuerverwaltung',
    statsCards: [
      { label: 'Steuersätze', color: 'text-red-600', icon: 'percentage' },
      { label: 'EU-Länder', color: 'text-blue-600', icon: 'flag' }
    ],
    tableColumns: [
      { key: 'country', label: 'Land' },
      { key: 'tax_rate', label: 'Steuersatz', format: 'percentage' },
      { key: 'vat_number', label: 'VAT-Nummer' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Steuersatz hinzufügen', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  '/admin/eu-countries': {
    path: '/admin/eu-countries',
    title: 'EU-Länder',
    icon: 'flag',
    iconColor: 'blue',
    description: 'EU-Länderverwaltung für Steuerberechnung',
    statsCards: [
      { label: 'EU-Länder', color: 'text-blue-600', icon: 'flag' },
      { label: 'Mit VAT', color: 'text-green-600', icon: 'check' }
    ],
    tableColumns: [
      { key: 'country_code', label: 'Code' },
      { key: 'country_name', label: 'Land' },
      { key: 'vat_rate', label: 'VAT-Satz', format: 'percentage' },
      { key: 'oss_enabled', label: 'OSS', format: 'badge' }
    ],
    actions: [
      { label: 'Land hinzufügen', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  '/admin/reverse-charge': {
    path: '/admin/reverse-charge',
    title: 'Reverse Charge',
    icon: 'exchange-alt',
    iconColor: 'orange',
    description: 'Reverse-Charge-Verfahren Konfiguration',
    statsCards: [
      { label: 'Aktive Regeln', color: 'text-orange-600', icon: 'exchange-alt' },
      { label: 'B2B-Transaktionen', color: 'text-blue-600', icon: 'handshake' }
    ],
    tableColumns: [
      { key: 'country', label: 'Land' },
      { key: 'rule', label: 'Regel' },
      { key: 'applies_to', label: 'Gilt für' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Regel hinzufügen', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  '/admin/vat-id-validation': {
    path: '/admin/vat-id-validation',
    title: 'VAT-ID Prüfung',
    icon: 'id-card',
    iconColor: 'teal',
    description: 'Automatische VAT-ID Validierung',
    statsCards: [
      { label: 'Geprüfte IDs', color: 'text-teal-600', icon: 'id-card' },
      { label: 'Gültig', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Ungültig', color: 'text-red-600', icon: 'times-circle' }
    ],
    tableColumns: [
      { key: 'vat_id', label: 'VAT-ID' },
      { key: 'company', label: 'Unternehmen' },
      { key: 'country', label: 'Land' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'validated_at', label: 'Geprüft am', format: 'date' }
    ],
    actions: [
      { label: 'ID prüfen', icon: 'search', color: 'blue', action: 'addNew()' }
    ]
  },

  '/admin/oss': {
    path: '/admin/oss',
    title: 'OSS (One-Stop-Shop)',
    icon: 'store',
    iconColor: 'purple',
    description: 'One-Stop-Shop Steuerverfahren',
    statsCards: [
      { label: 'OSS-Länder', color: 'text-purple-600', icon: 'globe' },
      { label: 'Quartalsmeldungen', color: 'text-blue-600', icon: 'calendar' }
    ],
    tableColumns: [
      { key: 'quarter', label: 'Quartal' },
      { key: 'country', label: 'Land' },
      { key: 'sales', label: 'Umsatz', format: 'currency' },
      { key: 'vat_amount', label: 'VAT', format: 'currency' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Meldung erstellen', icon: 'file-alt', color: 'green', action: 'addNew()' },
      { label: 'Export', icon: 'download', color: 'blue', action: 'exportData()' }
    ]
  },

  '/admin/subscriptions': {
    path: '/admin/subscriptions',
    title: 'Abonnements',
    icon: 'sync-alt',
    iconColor: 'blue',
    description: 'Abonnement-Verwaltung (optional)',
    statsCards: [
      { label: 'Aktive Abos', color: 'text-green-600', icon: 'sync-alt' },
      { label: 'Gekündigt', color: 'text-red-600', icon: 'times' },
      { label: 'MRR', color: 'text-blue-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'customer', label: 'Kunde' },
      { key: 'plan', label: 'Plan' },
      { key: 'amount', label: 'Betrag', format: 'currency' },
      { key: 'next_billing', label: 'Nächste Abrechnung', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  '/admin/webhooks': {
    path: '/admin/webhooks',
    title: 'Webhooks & Status',
    icon: 'plug',
    iconColor: 'gray',
    description: 'Webhook-Konfiguration und Status',
    statsCards: [
      { label: 'Aktive Webhooks', color: 'text-green-600', icon: 'plug' },
      { label: 'Events (24h)', color: 'text-blue-600', icon: 'bell' },
      { label: 'Fehler', color: 'text-red-600', icon: 'exclamation-triangle' }
    ],
    tableColumns: [
      { key: 'url', label: 'Webhook URL' },
      { key: 'events', label: 'Events' },
      { key: 'last_triggered', label: 'Letzter Trigger', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Webhook hinzufügen', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Test senden', icon: 'paper-plane', color: 'blue', action: 'alert("Test gesendet")' }
    ]
  },

  '/admin/fraud-prevention': {
    path: '/admin/fraud-prevention',
    title: 'Betrugsprävention',
    icon: 'shield-alt',
    iconColor: 'red',
    description: 'Betrugserkennung und Prävention',
    statsCards: [
      { label: 'Verdächtige', color: 'text-red-600', icon: 'exclamation-triangle' },
      { label: 'Blockiert', color: 'text-orange-600', icon: 'ban' },
      { label: 'Geprüft', color: 'text-green-600', icon: 'check-circle' }
    ],
    tableColumns: [
      { key: 'order', label: 'Bestellung' },
      { key: 'risk_score', label: 'Risiko-Score' },
      { key: 'reason', label: 'Grund' },
      { key: 'action', label: 'Aktion' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Regeln bearbeiten', icon: 'cog', color: 'blue', action: 'addNew()' }
    ]
  },

  // ============================================
  // COOKIES & CONSENT SECTION
  // ============================================
  '/admin/cookie-consent': {
    path: '/admin/cookie-consent',
    title: 'Cookie-Einstellungen',
    icon: 'cookie-bite',
    iconColor: 'brown',
    description: 'Cookie-Banner und Einwilligungsverwaltung',
    statsCards: [
      { label: 'Einwilligungen', color: 'text-green-600', icon: 'check' },
      { label: 'Ablehnungen', color: 'text-red-600', icon: 'times' },
      { label: 'Rate', color: 'text-blue-600', icon: 'chart-line', format: 'percentage' }
    ],
    tableColumns: [
      { key: 'cookie_type', label: 'Cookie-Typ' },
      { key: 'consents', label: 'Zustimmungen' },
      { key: 'rejections', label: 'Ablehnungen' },
      { key: 'consent_rate', label: 'Rate', format: 'percentage' }
    ],
    actions: [
      { label: 'Banner anpassen', icon: 'edit', color: 'blue', action: 'addNew()' }
    ]
  },

  '/admin/gdpr-requests': {
    path: '/admin/gdpr-requests',
    title: 'GDPR-Anfragen',
    icon: 'user-shield',
    iconColor: 'blue',
    description: 'DSGVO-Auskunfts- und Löschanfragen',
    statsCards: [
      { label: 'Offene Anfragen', color: 'text-yellow-600', icon: 'clock' },
      { label: 'Bearbeitet', color: 'text-green-600', icon: 'check' },
      { label: 'Frist < 7 Tage', color: 'text-red-600', icon: 'exclamation' }
    ],
    tableColumns: [
      { key: 'request_type', label: 'Typ' },
      { key: 'user_email', label: 'E-Mail', format: 'email' },
      { key: 'requested_at', label: 'Angefragt', format: 'date' },
      { key: 'deadline', label: 'Frist', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  '/admin/consent-logs': {
    path: '/admin/consent-logs',
    title: 'Einwilligungs-Logs',
    icon: 'clipboard-list',
    iconColor: 'indigo',
    description: 'Protokoll aller Einwilligungen',
    statsCards: [
      { label: 'Log-Einträge', color: 'text-indigo-600', icon: 'list' },
      { label: 'Heute', color: 'text-blue-600', icon: 'calendar-day' }
    ],
    tableColumns: [
      { key: 'user', label: 'Benutzer' },
      { key: 'consent_type', label: 'Typ' },
      { key: 'action', label: 'Aktion' },
      { key: 'ip_address', label: 'IP-Adresse' },
      { key: 'timestamp', label: 'Zeitstempel', format: 'date' }
    ],
    actions: [
      { label: 'Exportieren', icon: 'download', color: 'green', action: 'exportData()' }
    ]
  },

  // ============================================
  // SECURITY SECTION
  // ============================================
  '/admin/security': {
    path: '/admin/security',
    title: 'Sicherheitsübersicht',
    icon: 'shield-alt',
    iconColor: 'red',
    description: 'Übersicht der Sicherheitseinstellungen',
    statsCards: [
      { label: 'Sicherheitsstufe', color: 'text-green-600', icon: 'shield-alt' },
      { label: 'Letzte Prüfung', color: 'text-blue-600', icon: 'clock' },
      { label: 'Warnungen', color: 'text-red-600', icon: 'exclamation-triangle' }
    ],
    actions: [
      { label: 'Security Scan', icon: 'search', color: 'blue', action: 'alert("Scan gestartet")' },
      { label: 'Einstellungen', icon: 'cog', color: 'gray', action: 'addNew()' }
    ]
  },

  '/admin/firewall': {
    path: '/admin/firewall',
    title: 'Web Application Firewall (WAF)',
    icon: 'shield-alt',
    iconColor: 'orange',
    description: 'Endpoint-Firewall mit intelligenter Bedrohungserkennung',
    useEnhancedComponent: true, // Use enhanced firewall page
    dbQuery: `SELECT bi.*, 
              (SELECT COUNT(*) FROM security_events WHERE ip_address = bi.ip_address AND created_at >= datetime('now', '-24 hours')) as recent_attempts
              FROM blocked_ips bi
              WHERE bi.is_active = 1
              ORDER BY bi.created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Aktive Regeln', query: 'SELECT COUNT(*) as count FROM firewall_rules WHERE is_active = 1', color: 'text-orange-600', icon: 'fire' },
      { label: 'Geblockte IPs', query: 'SELECT COUNT(*) as count FROM blocked_ips WHERE is_active = 1', color: 'text-red-600', icon: 'ban' },
      { label: 'Angriffe (24h)', query: 'SELECT COUNT(*) as count FROM security_events WHERE created_at >= datetime("now", "-24 hours") AND is_blocked = 1', color: 'text-yellow-600', icon: 'exclamation-triangle' },
      { label: 'Bedrohungsmuster', query: 'SELECT COUNT(*) as count FROM threat_patterns WHERE is_active = 1', color: 'text-purple-600', icon: 'brain' }
    ],
    tableColumns: [
      { key: 'ip_address', label: 'IP-Adresse' },
      { key: 'block_type', label: 'Typ', format: 'badge' },
      { key: 'reason', label: 'Grund' },
      { key: 'recent_attempts', label: 'Versuche (24h)' },
      { key: 'blocked_until', label: 'Läuft ab', format: 'date' },
      { key: 'is_active', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'IP blockieren', icon: 'ban', color: 'red', action: 'blockIP()' },
      { label: 'Regeln verwalten', icon: 'cog', color: 'blue', action: 'manageRules()' },
      { label: 'Lernmodus', icon: 'graduation-cap', color: 'green', action: 'toggleLearningMode()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'gray', action: 'refreshPage()' }
    ]
  },

  '/admin/two-factor': {
    path: '/admin/two-factor',
    title: 'Zwei-Faktor-Authentifizierung',
    icon: 'mobile-alt',
    iconColor: 'blue',
    description: '2FA-Verwaltung für Benutzer',
    statsCards: [
      { label: 'Aktiviert', color: 'text-green-600', icon: 'check' },
      { label: 'Nicht aktiviert', color: 'text-gray-600', icon: 'times' },
      { label: 'Aktivierungsrate', color: 'text-blue-600', icon: 'chart-line', format: 'percentage' }
    ],
    tableColumns: [
      { key: 'user', label: 'Benutzer' },
      { key: 'method', label: 'Methode' },
      { key: 'enabled_at', label: 'Aktiviert am', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: '2FA erzwingen', icon: 'lock', color: 'blue', action: 'addNew()' }
    ]
  },

  '/admin/email-security': {
    path: '/admin/email-security',
    title: 'E-Mail-Sicherheit',
    icon: 'envelope-open-text',
    iconColor: 'teal',
    description: 'SPF, DKIM, DMARC Konfiguration',
    statsCards: [
      { label: 'SPF Status', color: 'text-green-600', icon: 'check-circle' },
      { label: 'DKIM Status', color: 'text-green-600', icon: 'check-circle' },
      { label: 'DMARC Status', color: 'text-green-600', icon: 'check-circle' }
    ],
    actions: [
      { label: 'DNS prüfen', icon: 'search', color: 'blue', action: 'alert("DNS-Check gestartet")' },
      { label: 'Test-E-Mail', icon: 'envelope', color: 'green', action: 'alert("Test-E-Mail gesendet")' }
    ]
  },

  '/admin/security-scans': {
    path: '/admin/security-scans',
    title: 'Sicherheits-Scans',
    icon: 'search',
    iconColor: 'purple',
    description: 'Automatische Sicherheitsprüfungen',
    statsCards: [
      { label: 'Letzte Prüfung', color: 'text-blue-600', icon: 'clock' },
      { label: 'Gefundene Probleme', color: 'text-red-600', icon: 'exclamation-triangle' },
      { label: 'Behoben', color: 'text-green-600', icon: 'check' }
    ],
    tableColumns: [
      { key: 'scan_type', label: 'Scan-Typ' },
      { key: 'issues_found', label: 'Probleme' },
      { key: 'severity', label: 'Schweregrad' },
      { key: 'scan_date', label: 'Datum', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Scan starten', icon: 'play', color: 'blue', action: 'alert("Scan gestartet")' }
    ]
  },

  // ============================================
  // USERS & ROLES SECTION
  // ============================================
  '/admin/roles': {
    path: '/admin/roles',
    title: 'Rollen verwalten',
    icon: 'user-tag',
    iconColor: 'purple',
    description: 'Benutzerrollen und Zugriffsrechte',
    statsCards: [
      { label: 'Rollen', color: 'text-purple-600', icon: 'user-tag' },
      { label: 'Benutzern zugewiesen', color: 'text-blue-600', icon: 'users' }
    ],
    tableColumns: [
      { key: 'role_name', label: 'Rolle' },
      { key: 'description', label: 'Beschreibung' },
      { key: 'users_count', label: 'Benutzer' },
      { key: 'permissions', label: 'Berechtigungen' }
    ],
    actions: [
      { label: 'Neue Rolle', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  '/admin/permissions': {
    path: '/admin/permissions',
    title: 'Berechtigungen',
    icon: 'key',
    iconColor: 'yellow',
    description: 'Detaillierte Berechtigungsverwaltung',
    statsCards: [
      { label: 'Berechtigungen', color: 'text-yellow-600', icon: 'key' },
      { label: 'Gruppen', color: 'text-blue-600', icon: 'layer-group' }
    ],
    tableColumns: [
      { key: 'permission_name', label: 'Berechtigung' },
      { key: 'module', label: 'Modul' },
      { key: 'description', label: 'Beschreibung' },
      { key: 'roles', label: 'Zugewiesene Rollen' }
    ],
    actions: [
      { label: 'Berechtigung hinzufügen', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  // ============================================
  // SUPPORT SECTION
  // ============================================
  '/admin/support': {
    path: '/admin/support',
    title: 'Support-Tickets',
    icon: 'life-ring',
    iconColor: 'orange',
    description: 'Kundensupport und Ticket-System',
    statsCards: [
      { label: 'Offene Tickets', color: 'text-orange-600', icon: 'envelope-open' },
      { label: 'In Bearbeitung', color: 'text-blue-600', icon: 'spinner' },
      { label: 'Geschlossen (heute)', color: 'text-green-600', icon: 'check' }
    ],
    tableColumns: [
      { key: 'ticket_id', label: 'Ticket #' },
      { key: 'subject', label: 'Betreff' },
      { key: 'customer', label: 'Kunde' },
      { key: 'priority', label: 'Priorität', format: 'badge' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neues Ticket', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  '/admin/knowledge-base': {
    path: '/admin/knowledge-base',
    title: 'Wissensdatenbank',
    icon: 'book',
    iconColor: 'teal',
    description: 'FAQ und Dokumentation verwalten',
    statsCards: [
      { label: 'Artikel', color: 'text-teal-600', icon: 'file-alt' },
      { label: 'Kategorien', color: 'text-blue-600', icon: 'folder' },
      { label: 'Aufrufe (30d)', color: 'text-purple-600', icon: 'eye' }
    ],
    tableColumns: [
      { key: 'title', label: 'Titel' },
      { key: 'category', label: 'Kategorie' },
      { key: 'views', label: 'Aufrufe' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'updated_at', label: 'Aktualisiert', format: 'date' }
    ],
    actions: [
      { label: 'Neuer Artikel', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  },

  // ============================================
  // SETTINGS SECTION
  // ============================================
  '/admin/settings': {
    path: '/admin/settings',
    title: 'Allgemeine Einstellungen',
    icon: 'cog',
    iconColor: 'gray',
    description: 'Systemweite Konfiguration',
    actions: [
      { label: 'Einstellungen speichern', icon: 'save', color: 'green', action: 'alert("Gespeichert!")' }
    ]
  },

  '/admin/settings/general': {
    path: '/admin/settings/general',
    title: 'Grundeinstellungen',
    icon: 'sliders-h',
    iconColor: 'blue',
    description: 'Allgemeine Shop-Einstellungen',
    actions: [
      { label: 'Speichern', icon: 'save', color: 'green', action: 'alert("Gespeichert!")' }
    ]
  },

  '/admin/settings/email': {
    path: '/admin/settings/email',
    title: 'E-Mail-Einstellungen',
    icon: 'envelope',
    iconColor: 'red',
    description: 'SMTP und E-Mail-Konfiguration',
    actions: [
      { label: 'Test-E-Mail senden', icon: 'paper-plane', color: 'blue', action: 'alert("Test-E-Mail gesendet")' },
      { label: 'Speichern', icon: 'save', color: 'green', action: 'alert("Gespeichert!")' }
    ]
  },

  '/admin/settings/api': {
    path: '/admin/settings/api',
    title: 'API-Einstellungen',
    icon: 'code',
    iconColor: 'purple',
    description: 'API-Schlüssel und Webhooks',
    statsCards: [
      { label: 'Aktive API-Keys', color: 'text-purple-600', icon: 'key' },
      { label: 'API-Aufrufe (24h)', color: 'text-blue-600', icon: 'chart-line' }
    ],
    tableColumns: [
      { key: 'key_name', label: 'Key-Name' },
      { key: 'key_value', label: 'Schlüssel' },
      { key: 'permissions', label: 'Berechtigungen' },
      { key: 'created_at', label: 'Erstellt', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neuer API-Key', icon: 'plus', color: 'green', action: 'addNew()' }
    ]
  }
}
