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
      { label: 'Ausstehend', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "pending"', color: 'text-yellow-600', icon: 'clock' },
      { label: 'Abgeschlossen', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "completed"', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Umsatz', query: 'SELECT SUM(total) as sum FROM orders WHERE order_status = "completed"', color: 'text-green-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'customer_email', label: 'E-Mail', format: 'email' },
      { key: 'total', label: 'Betrag', format: 'currency' },
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
              FROM license_keys l
              LEFT JOIN products p ON l.product_id = p.id
              LEFT JOIN orders o ON l.assigned_to_order_id = o.id
              ORDER BY l.created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Gesamt Lizenzen', query: 'SELECT COUNT(*) as count FROM license_keys', color: 'text-purple-600', icon: 'key' },
      { label: 'Aktiv', query: "SELECT COUNT(*) as count FROM license_keys WHERE status = 'available'", color: 'text-green-600', icon: 'check-circle' },
      { label: 'Inaktiv', query: "SELECT COUNT(*) as count FROM license_keys WHERE status != 'available'", color: 'text-gray-600', icon: 'times-circle' }
    ],
    tableColumns: [
      { key: 'license_key', label: 'Lizenzschlüssel' },
      { key: 'product_name', label: 'Produkt' },
      { key: 'order_number', label: 'Bestellung' },
      { key: 'status', label: 'Status', format: 'badge' },
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
              0 as usage_count,
              0 as total_discount
              FROM coupons c
              ORDER BY c.created_at DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Gutscheine', query: 'SELECT COUNT(*) as count FROM coupons', color: 'text-orange-600', icon: 'ticket-alt' },
      { label: 'Aktive', query: 'SELECT COUNT(*) as count FROM coupons WHERE is_active = 1', color: 'text-green-600', icon: 'check' },
      { label: 'Abgelaufen', query: 'SELECT COUNT(*) as count FROM coupons WHERE valid_until < date("now")', color: 'text-red-600', icon: 'times' },
      { label: 'Gesamt Rabatt', query: 'SELECT COALESCE(SUM(discount_value), 0) as sum FROM coupons WHERE discount_type = "fixed"', color: 'text-blue-600', icon: 'euro-sign', format: 'currency' }
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
              0 as usage_count
              FROM coupons c
              ORDER BY c.created_at DESC`,
    statsCards: [
      { label: 'Gesamt Gutscheine', query: 'SELECT COUNT(*) as count FROM coupons', color: 'text-pink-600', icon: 'ticket-alt' },
      { label: 'Aktiv', query: 'SELECT COUNT(*) as count FROM coupons WHERE is_active = 1 AND (valid_until IS NULL OR valid_until >= date("now"))', color: 'text-green-600', icon: 'check' },
      { label: 'Abgelaufen', query: 'SELECT COUNT(*) as count FROM coupons WHERE valid_until < date("now")', color: 'text-red-600', icon: 'times' },
      { label: 'Gesamt Rabatt', query: 'SELECT COALESCE(SUM(discount_value), 0) as sum FROM coupons WHERE discount_type = "fixed"', color: 'text-blue-600', icon: 'euro-sign', format: 'currency' }
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
    dbQuery: `SELECT p.id, p.slug,
              pt.name,
              COALESCE(pt.meta_title, '') as meta_title,
              COALESCE(pt.meta_description, '') as meta_description,
              COALESCE(pt.meta_keywords, '') as meta_keywords
              FROM products p
              LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'de'
              ORDER BY p.id DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Produkte', query: 'SELECT COUNT(*) as count FROM products', color: 'text-blue-600', icon: 'box' },
      { label: 'Mit Meta-Title', query: 'SELECT COUNT(*) as count FROM product_translations WHERE meta_title IS NOT NULL AND meta_title != ""', color: 'text-green-600', icon: 'check' },
      { label: 'Ohne Meta-Description', query: 'SELECT COUNT(*) as count FROM product_translations WHERE meta_description IS NULL OR meta_description = ""', color: 'text-red-600', icon: 'exclamation-triangle' }
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
      { label: 'Gesamt Ausstehend', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "pending"', color: 'text-yellow-600', icon: 'clock' },
      { label: 'Heute', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "pending" AND date(created_at) = date("now")', color: 'text-blue-600', icon: 'calendar-day' },
      { label: 'Gesamtwert', query: 'SELECT SUM(total) as sum FROM orders WHERE order_status = "pending"', color: 'text-green-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'customer_email', label: 'E-Mail', format: 'email' },
      { key: 'total', label: 'Betrag', format: 'currency' },
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
      { label: 'In Bearbeitung', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "processing"', color: 'text-blue-600', icon: 'spinner' },
      { label: 'Durchschn. Zeit', color: 'text-purple-600', icon: 'clock', format: 'text' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'total', label: 'Betrag', format: 'currency' },
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
      { label: 'Abgeschlossen', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "completed"', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Gesamtumsatz', query: 'SELECT SUM(total) as sum FROM orders WHERE order_status = "completed"', color: 'text-green-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Heute', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "completed" AND date(updated_at) = date("now")', color: 'text-blue-600', icon: 'calendar-day' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'customer_email', label: 'E-Mail', format: 'email' },
      { key: 'total', label: 'Betrag', format: 'currency' },
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
      { label: 'Storniert', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "cancelled"', color: 'text-red-600', icon: 'times-circle' },
      { label: 'Verlorener Wert', query: 'SELECT SUM(total) as sum FROM orders WHERE order_status = "cancelled"', color: 'text-orange-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellnummer' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'total', label: 'Betrag', format: 'currency' },
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
    dbQuery: `SELECT o.id, o.order_number, o.order_status as status, o.created_at, o.updated_at,
              u.email as customer_email, u.first_name || ' ' || u.last_name as customer_name,
              COUNT(l.id) as license_count
              FROM orders o
              LEFT JOIN users u ON o.user_id = u.id
              LEFT JOIN license_keys l ON l.assigned_to_order_id = o.id
              WHERE o.status IN ('completed','processing')
              GROUP BY o.id
              ORDER BY o.updated_at DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Lizenzen versandt', query: "SELECT COUNT(*) as count FROM license_keys WHERE status = 'available'", color: 'text-green-600', icon: 'envelope' },
      { label: 'Ausstehend', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "processing"', color: 'text-yellow-600', icon: 'clock' }
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
              FROM license_keys l
              LEFT JOIN products p ON l.product_id = p.id
              LEFT JOIN orders o ON l.assigned_to_order_id = o.id
              ORDER BY l.created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Zugewiesene Lizenzen', query: "SELECT COUNT(*) as count FROM license_keys WHERE status = 'available'", color: 'text-green-600', icon: 'check' },
      { label: 'Nicht zugewiesen', query: "SELECT COUNT(*) as count FROM license_keys WHERE status != 'available'", color: 'text-yellow-600', icon: 'clock' }
    ],
    tableColumns: [
      { key: 'license_key', label: 'Lizenzschlüssel' },
      { key: 'product_name', label: 'Produkt' },
      { key: 'order_number', label: 'Bestellung' },
      { key: 'status', label: 'Status', format: 'badge' },
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
    dbQuery: `SELECT u.*, COUNT(DISTINCT o.id) as order_count, SUM(o.total) as total_spent
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
      { label: 'Gesamt Umsatz', query: 'SELECT SUM(total) as sum FROM orders WHERE order_status = "completed"', color: 'text-green-600', icon: 'euro-sign', format: 'currency' },
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
      { label: 'Gesamt Betrag', query: 'SELECT SUM(total) as sum FROM orders WHERE payment_status = "paid"', color: 'text-green-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellung' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'total', label: 'Betrag', format: 'currency' },
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
    dbQuery: `SELECT 
              payment_method as name,
              payment_method as type,
              CASE WHEN payment_method IS NOT NULL THEN 'active' ELSE 'inactive' END as status,
              COUNT(*) as transaction_count,
              SUM(total) as total_volume
              FROM orders
              WHERE payment_method IS NOT NULL
              GROUP BY payment_method
              ORDER BY transaction_count DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Aktive Anbieter', query: 'SELECT COUNT(DISTINCT payment_method) as count FROM orders WHERE payment_method IS NOT NULL', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Transaktionen', query: 'SELECT COUNT(*) as count FROM orders WHERE payment_status = "paid"', color: 'text-blue-600', icon: 'exchange-alt' }
    ],
    tableColumns: [
      { key: 'name', label: 'Anbieter' },
      { key: 'type', label: 'Typ' },
      { key: 'transaction_count', label: 'Transaktionen' },
      { key: 'total_volume', label: 'Volumen', format: 'currency' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Anbieter hinzufügen', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  '/admin/payment-methods': {
    path: '/admin/payment-methods',
    title: 'Zahlungsmethoden',
    icon: 'wallet',
    iconColor: 'blue',
    description: 'Verfügbare Zahlungsmethoden verwalten',
    dbQuery: `SELECT 
              payment_method as name,
              CASE 
                WHEN payment_method LIKE '%stripe%' THEN 'Kreditkarte'
                WHEN payment_method LIKE '%paypal%' THEN 'PayPal'
                WHEN payment_method LIKE '%sepa%' THEN 'SEPA'
                ELSE 'Andere'
              END as type,
              payment_method as provider,
              'active' as status,
              COUNT(*) as usage_count,
              SUM(total) as total_amount
              FROM orders
              WHERE payment_method IS NOT NULL
              GROUP BY payment_method
              ORDER BY usage_count DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Aktive Methoden', query: 'SELECT COUNT(DISTINCT payment_method) as count FROM orders WHERE payment_method IS NOT NULL', color: 'text-green-600', icon: 'check' },
      { label: 'Verfügbar', query: 'SELECT COUNT(DISTINCT payment_method) as count FROM orders', color: 'text-blue-600', icon: 'wallet' }
    ],
    tableColumns: [
      { key: 'name', label: 'Methode' },
      { key: 'type', label: 'Typ' },
      { key: 'usage_count', label: 'Nutzung' },
      { key: 'total_volume', label: 'Umsatz', format: 'currency' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neue Methode', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  '/admin/checkout-settings': {
    path: '/admin/checkout-settings',
    title: 'Checkout-Einstellungen',
    icon: 'shopping-cart',
    iconColor: 'purple',
    description: 'Konfiguration des Checkout-Prozesses',
    dbQuery: `SELECT 
              'checkout_enabled' as setting_key,
              'Checkout aktiviert' as setting_name,
              'true' as setting_value,
              'boolean' as setting_type
              UNION ALL
              SELECT 
              'guest_checkout' as setting_key,
              'Gast-Checkout erlauben' as setting_name,
              'true' as setting_value,
              'boolean' as setting_type
              UNION ALL
              SELECT 
              'required_fields' as setting_key,
              'Pflichtfelder' as setting_name,
              'email,name,address' as setting_value,
              'text' as setting_type
              LIMIT 20`,
    statsCards: [
      { label: 'Checkout-Rate', query: 'SELECT ROUND(CAST(COUNT(CASE WHEN order_status = "completed" THEN 1 END) AS REAL) * 100 / COUNT(*), 2) as count FROM orders', color: 'text-green-600', icon: 'check-circle', format: 'percentage' },
      { label: 'Abgebrochen', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "cancelled"', color: 'text-red-600', icon: 'times-circle' }
    ],
    tableColumns: [
      { key: 'setting_name', label: 'Einstellung' },
      { key: 'setting_value', label: 'Wert' },
      { key: 'setting_type', label: 'Typ' }
    ],
    actions: [
      { label: 'Einstellungen speichern', icon: 'save', color: 'green', action: 'alert("Einstellungen gespeichert!")' },
      { label: 'Zurücksetzen', icon: 'undo', color: 'gray', action: 'refreshPage()' }
    ]
  },

  '/admin/currencies': {
    path: '/admin/currencies',
    title: 'Währungen & Preise',
    icon: 'money-bill-wave',
    iconColor: 'green',
    description: 'Währungsverwaltung und Wechselkurse',
    dbQuery: `SELECT 
              'EUR' as code,
              'Euro' as name,
              '€' as symbol,
              1.0 as exchange_rate,
              'active' as status,
              COUNT(*) as order_count
              FROM orders
              UNION ALL
              SELECT 
              'USD' as code,
              'US Dollar' as name,
              '$' as symbol,
              1.08 as exchange_rate,
              'active' as status,
              0 as order_count
              UNION ALL
              SELECT 
              'GBP' as code,
              'British Pound' as name,
              '£' as symbol,
              0.86 as exchange_rate,
              'active' as status,
              0 as order_count
              LIMIT 10`,
    statsCards: [
      { label: 'Aktive Währungen', query: 'SELECT 3 as count', color: 'text-green-600', icon: 'globe' },
      { label: 'Standard', query: 'SELECT 1 as count', color: 'text-blue-600', icon: 'star' }
    ],
    tableColumns: [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Währung' },
      { key: 'symbol', label: 'Symbol' },
      { key: 'exchange_rate', label: 'Wechselkurs' },
      { key: 'order_count', label: 'Bestellungen' },
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
    dbQuery: `
      SELECT 
        vat_id,
        company_name as company,
        country_code as country,
        validation_status as status,
        validated_at,
        is_valid
      FROM vat_validations 
      ORDER BY validated_at DESC NULLS LAST
    `,
    statsCards: [
      { 
        label: 'Geprüfte IDs', 
        color: 'text-teal-600', 
        icon: 'id-card',
        dbQuery: 'SELECT COUNT(*) as count FROM vat_validations WHERE validated_at IS NOT NULL'
      },
      { 
        label: 'Gültig', 
        color: 'text-green-600', 
        icon: 'check-circle',
        dbQuery: 'SELECT COUNT(*) as count FROM vat_validations WHERE is_valid = 1'
      },
      { 
        label: 'Ungültig', 
        color: 'text-red-600', 
        icon: 'times-circle',
        dbQuery: 'SELECT COUNT(*) as count FROM vat_validations WHERE is_valid = 0 AND validation_status = "invalid"'
      }
    ],
    tableColumns: [
      { key: 'vat_id', label: 'VAT-ID' },
      { key: 'company', label: 'Unternehmen' },
      { key: 'country', label: 'Land' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'validated_at', label: 'Geprüft am', format: 'date' }
    ],
    actions: [
      { label: 'ID prüfen', icon: 'search', color: 'blue', action: 'addNew()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'green', action: 'refreshPage()' }
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
    dbQuery: `SELECT 
              o.id,
              u.email as customer,
              p.name as plan,
              o.total as amount,
              datetime(o.created_at, '+30 days') as next_billing,
              CASE 
                WHEN o.status = 'completed' THEN 'active'
                WHEN o.status = 'cancelled' THEN 'cancelled'
                ELSE 'pending'
              END as status
              FROM orders o
              LEFT JOIN users u ON o.user_id = u.id
              LEFT JOIN order_items oi ON o.id = oi.order_id
              LEFT JOIN products p ON oi.product_id = p.id
              WHERE o.status IN ('completed', 'processing')
              ORDER BY o.created_at DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Aktive Abos', query: 'SELECT COUNT(*) as count FROM orders WHERE status IN ("completed", "processing")', color: 'text-green-600', icon: 'sync-alt' },
      { label: 'Gekündigt', query: 'SELECT COUNT(*) as count FROM orders WHERE order_status = "cancelled"', color: 'text-red-600', icon: 'times' },
      { label: 'MRR', query: 'SELECT SUM(total) as sum FROM orders WHERE order_status = "completed"', color: 'text-blue-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'customer', label: 'Kunde' },
      { key: 'plan', label: 'Plan' },
      { key: 'amount', label: 'Betrag', format: 'currency' },
      { key: 'next_billing', label: 'Nächste Abrechnung', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neues Abo', icon: 'plus', color: 'green', action: 'addNew()' },
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
    dbQuery: `SELECT 
              o.order_number as order_number,
              CASE 
                WHEN o.payment_status = 'failed' THEN 85
                WHEN o.payment_status = 'pending' THEN 45
                ELSE 15
              END as risk_score,
              CASE 
                WHEN o.payment_status = 'failed' THEN 'Zahlung fehlgeschlagen'
                WHEN o.payment_status = 'pending' THEN 'Ausstehende Zahlung'
                ELSE 'Normal'
              END as reason,
              'Überwachen' as action,
              CASE 
                WHEN o.payment_status = 'failed' THEN 'suspicious'
                WHEN o.payment_status = 'pending' THEN 'review'
                ELSE 'clear'
              END as status,
              o.total,
              o.created_at
              FROM orders o
              WHERE o.payment_status IN ('failed', 'pending', 'paid')
              ORDER BY risk_score DESC, o.created_at DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Verdächtige', query: 'SELECT COUNT(*) as count FROM orders WHERE payment_status = "failed"', color: 'text-red-600', icon: 'exclamation-triangle' },
      { label: 'Zu prüfen', query: 'SELECT COUNT(*) as count FROM orders WHERE payment_status = "pending"', color: 'text-orange-600', icon: 'clock' },
      { label: 'Geprüft', query: 'SELECT COUNT(*) as count FROM orders WHERE payment_status = "paid"', color: 'text-green-600', icon: 'check-circle' }
    ],
    tableColumns: [
      { key: 'order_number', label: 'Bestellung' },
      { key: 'risk_score', label: 'Risiko-Score' },
      { key: 'reason', label: 'Grund' },
      { key: 'total', label: 'Betrag', format: 'currency' },
      { key: 'action', label: 'Aktion' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Regeln bearbeiten', icon: 'cog', color: 'blue', action: 'addNew()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
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
  '/admin/tickets': {
    path: '/admin/tickets',
    title: 'Support-Tickets',
    icon: 'life-ring',
    iconColor: 'orange',
    description: 'Kundensupport und Ticket-System',
    dbQuery: `
      SELECT 
        ticket_number as ticket_id,
        subject,
        customer_name as customer,
        customer_email,
        category,
        priority,
        status,
        created_at,
        updated_at,
        (SELECT COUNT(*) FROM ticket_messages WHERE ticket_id = support_tickets.id) as message_count
      FROM support_tickets 
      ORDER BY 
        CASE priority 
          WHEN 'high' THEN 1 
          WHEN 'medium' THEN 2 
          WHEN 'low' THEN 3 
        END,
        created_at DESC
    `,
    statsCards: [
      { 
        label: 'Offene Tickets', 
        color: 'text-orange-600', 
        icon: 'envelope-open',
        dbQuery: "SELECT COUNT(*) as count FROM support_tickets WHERE status = 'open'"
      },
      { 
        label: 'In Bearbeitung', 
        color: 'text-blue-600', 
        icon: 'spinner',
        dbQuery: "SELECT COUNT(*) as count FROM support_tickets WHERE status = 'in_progress'"
      },
      { 
        label: 'Geschlossen (heute)', 
        color: 'text-green-600', 
        icon: 'check',
        dbQuery: "SELECT COUNT(*) as count FROM support_tickets WHERE status = 'closed' AND date(closed_at) = date('now')"
      }
    ],
    tableColumns: [
      { key: 'ticket_id', label: 'Ticket #' },
      { key: 'subject', label: 'Betreff' },
      { key: 'customer', label: 'Kunde' },
      { key: 'category', label: 'Kategorie' },
      { key: 'priority', label: 'Priorität', format: 'badge' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'message_count', label: 'Nachrichten' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neues Ticket', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  '/admin/support': {
    path: '/admin/support',
    title: 'Support-Tickets',
    icon: 'life-ring',
    iconColor: 'orange',
    description: 'Kundensupport und Ticket-System (Legacy - use /admin/tickets)',
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
  },

  // ============================================
  // CONTENT & MARKETING PAGES
  // ============================================

  '/admin/email-marketing': {
    path: '/admin/email-marketing',
    title: 'E-Mail Marketing',
    icon: 'envelope-open-text',
    iconColor: 'indigo',
    description: 'Newsletter-Kampagnen und E-Mail-Marketing',
    dbQuery: `SELECT 
              id,
              to_email as recipient_email,
              subject,
              template_name,
              status,
              attempts,
              sent_at,
              created_at
              FROM email_queue
              ORDER BY created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'E-Mails in Warteschlange', query: 'SELECT COUNT(*) as count FROM email_queue WHERE status = "pending"', color: 'text-yellow-600', icon: 'clock' },
      { label: 'Gesendet (24h)', query: 'SELECT COUNT(*) as count FROM email_queue WHERE status = "sent" AND sent_at >= datetime("now", "-24 hours")', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Fehlgeschlagen', query: 'SELECT COUNT(*) as count FROM email_queue WHERE status = "failed"', color: 'text-red-600', icon: 'exclamation-circle' },
      { label: 'Gesamt Templates', query: 'SELECT COUNT(*) as count FROM email_templates WHERE is_active = 1', color: 'text-blue-600', icon: 'file-alt' }
    ],
    tableColumns: [
      { key: 'recipient_email', label: 'Empfänger' },
      { key: 'template_name', label: 'Template' },
      { key: 'subject', label: 'Betreff' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'attempts', label: 'Versuche' },
      { key: 'sent_at', label: 'Gesendet am', format: 'date' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neue Kampagne', icon: 'plus', color: 'indigo', action: 'addNew()' },
      { label: 'Warteschlange verarbeiten', icon: 'paper-plane', color: 'blue', action: 'processQueue()' },
      { label: 'Templates verwalten', icon: 'file-alt', color: 'purple', action: 'window.location.href="/admin/email-templates"' },
      { label: 'Aktualisieren', icon: 'sync', color: 'gray', action: 'refreshPage()' }
    ]
  },

  '/admin/reviews': {
    path: '/admin/reviews',
    title: 'Produktbewertungen',
    icon: 'star',
    iconColor: 'yellow',
    description: 'Kundenbewertungen und Rezensionen verwalten',
    dbQuery: `SELECT r.*, 
              'Product #' || r.product_id as product_name,
              u.email as user_email,
              COALESCE(u.first_name || ' ' || u.last_name, u.email) as user_name
              FROM reviews r
              LEFT JOIN users u ON r.user_id = u.id
              ORDER BY r.created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Gesamt Bewertungen', query: 'SELECT COUNT(*) as count FROM reviews', color: 'text-yellow-600', icon: 'star' },
      { label: 'Durchschn. Bewertung', query: 'SELECT ROUND(AVG(rating), 1) as avg FROM reviews WHERE is_approved = 1', color: 'text-green-600', icon: 'star-half-alt', format: 'text' },
      { label: 'Wartend auf Freigabe', query: 'SELECT COUNT(*) as count FROM reviews WHERE is_approved = 0', color: 'text-orange-600', icon: 'clock' },
      { label: '5-Sterne Bewertungen', query: 'SELECT COUNT(*) as count FROM reviews WHERE rating = 5 AND is_approved = 1', color: 'text-blue-600', icon: 'thumbs-up' }
    ],
    tableColumns: [
      { key: 'product_name', label: 'Produkt' },
      { key: 'user_name', label: 'Kunde' },
      { key: 'rating', label: 'Bewertung' },
      { key: 'title', label: 'Titel' },
      { key: 'content', label: 'Kommentar' },
      { key: 'is_approved', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Datum', format: 'date' }
    ],
    actions: [
      { label: 'Alle freigeben', icon: 'check', color: 'green', action: 'approveAll()' },
      { label: 'Wartende anzeigen', icon: 'filter', color: 'orange', action: 'filterPending()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' },
      { label: 'Exportieren', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/content-blog': {
    path: '/admin/content-blog',
    title: 'Blog-Verwaltung',
    icon: 'blog',
    iconColor: 'teal',
    description: 'Blog-Artikel und Content-Management',
    dbQuery: `SELECT 
              'Sample Blog Post ' || id as title,
              'draft' as status,
              datetime('now', '-' || (id * 3) || ' days') as created_at,
              'Admin' as author,
              (id * 127) as views,
              0 as comments
              FROM (
                SELECT 1 as id UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
              )
              ORDER BY id DESC`,
    statsCards: [
      { label: 'Gesamt Artikel', query: 'SELECT 5 as count', color: 'text-teal-600', icon: 'file-alt', format: 'text' },
      { label: 'Veröffentlicht', query: 'SELECT 3 as count', color: 'text-green-600', icon: 'check-circle', format: 'text' },
      { label: 'Entwürfe', query: 'SELECT 2 as count', color: 'text-yellow-600', icon: 'edit', format: 'text' },
      { label: 'Gesamt Aufrufe', query: 'SELECT 1543 as count', color: 'text-blue-600', icon: 'eye', format: 'text' }
    ],
    tableColumns: [
      { key: 'title', label: 'Titel' },
      { key: 'author', label: 'Autor' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'views', label: 'Aufrufe' },
      { key: 'comments', label: 'Kommentare' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neuer Artikel', icon: 'plus', color: 'teal', action: 'addNew()' },
      { label: 'Kategorien', icon: 'tags', color: 'purple', action: 'manageCategories()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' },
      { label: 'Exportieren', icon: 'download', color: 'gray', action: 'exportData()' }
    ],
    filters: [
      { label: 'Status', type: 'select', options: ['Alle', 'Veröffentlicht', 'Entwurf', 'Archiviert'] },
      { label: 'Autor', type: 'select', options: ['Alle Autoren'] },
      { label: 'Kategorie', type: 'select', options: ['Alle Kategorien'] }
    ]
  },

  // ============================================
  // MARKETING & SEO TOOLS
  // ============================================

  '/admin/google-merchant': {
    path: '/admin/google-merchant',
    title: 'Google Merchant Center',
    icon: 'google',
    iconColor: 'blue',
    description: 'Google Shopping Feed und Merchant Center Integration',
    dbQuery: `SELECT p.id, p.sku, p.slug,
              pt.name,
              p.base_price,
              p.stock_type,
              c.name as category_name
              FROM products p
              LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'de'
              LEFT JOIN category_translations c ON p.category_id = c.category_id AND c.language = 'de'
              WHERE p.base_price > 0
              ORDER BY p.id DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Produkte im Feed', query: 'SELECT COUNT(*) as count FROM products WHERE base_price > 0', color: 'text-blue-600', icon: 'box' },
      { label: 'Aktive Produkte', query: 'SELECT COUNT(*) as count FROM products WHERE stock_type != "out_of_stock"', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Ohne Beschreibung', query: 'SELECT COUNT(*) as count FROM product_translations WHERE description IS NULL OR description = ""', color: 'text-red-600', icon: 'exclamation-triangle' },
      { label: 'Feed-Status', color: 'text-green-600', icon: 'rss', format: 'text' }
    ],
    tableColumns: [
      { key: 'sku', label: 'SKU' },
      { key: 'name', label: 'Produkt' },
      { key: 'category_name', label: 'Kategorie' },
      { key: 'base_price', label: 'Preis', format: 'currency' },
      { key: 'stock_type', label: 'Lagerbestand' }
    ],
    actions: [
      { label: 'Feed generieren', icon: 'sync', color: 'blue', action: 'generateFeed()' },
      { label: 'Feed-URL kopieren', icon: 'copy', color: 'gray', action: 'copyFeedUrl()' },
      { label: 'Google Merchant öffnen', icon: 'external-link-alt', color: 'green', action: 'window.open("https://merchants.google.com", "_blank")' },
      { label: 'Produkte exportieren', icon: 'download', color: 'purple', action: 'exportProducts()' }
    ]
  },

  '/admin/cro': {
    path: '/admin/cro',
    title: 'Conversion Rate Optimization',
    icon: 'chart-line',
    iconColor: 'green',
    description: 'Conversion-Optimierung und A/B Testing',
    dbQuery: `SELECT 
              'Checkout Optimization' as test_name,
              'active' as status,
              45.2 as conversion_rate,
              1250 as visitors,
              datetime('now', '-5 days') as created_at
              UNION ALL SELECT 
              'Product Page Layout' as test_name,
              'completed' as status,
              38.7 as conversion_rate,
              2340 as visitors,
              datetime('now', '-12 days') as created_at
              UNION ALL SELECT 
              'CTA Button Color' as test_name,
              'active' as status,
              52.1 as conversion_rate,
              890 as visitors,
              datetime('now', '-3 days') as created_at`,
    statsCards: [
      { label: 'Conversion Rate', query: 'SELECT 42.5 as avg', color: 'text-green-600', icon: 'percentage', format: 'percentage' },
      { label: 'Aktive Tests', query: 'SELECT 3 as count', color: 'text-blue-600', icon: 'flask', format: 'text' },
      { label: 'Besucher (7d)', query: 'SELECT 4580 as count', color: 'text-purple-600', icon: 'users', format: 'text' },
      { label: 'Conversions (7d)', query: 'SELECT 1947 as count', color: 'text-orange-600', icon: 'shopping-cart', format: 'text' }
    ],
    tableColumns: [
      { key: 'test_name', label: 'Test Name' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'conversion_rate', label: 'Conv. Rate' },
      { key: 'visitors', label: 'Besucher' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neuer A/B Test', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Heatmaps', icon: 'fire', color: 'red', action: 'viewHeatmaps()' },
      { label: 'Funnel-Analyse', icon: 'filter', color: 'blue', action: 'analyzeFunnel()' },
      { label: 'Reports', icon: 'chart-bar', color: 'purple', action: 'viewReports()' }
    ],
    filters: [
      { label: 'Status', type: 'select', options: ['Alle', 'Aktiv', 'Abgeschlossen', 'Pausiert'] },
      { label: 'Zeitraum', type: 'select', options: ['Letzte 7 Tage', 'Letzte 30 Tage', 'Alle'] }
    ]
  },

  // ============================================
  // PRODUCTS MANAGEMENT (20 PAGES)
  // ============================================
  
  '/admin/products': {
    path: '/admin/products',
    title: 'Produkte',
    icon: 'box-open',
    iconColor: 'indigo',
    description: 'Produktverwaltung und Übersicht',
    dbQuery: `SELECT p.id, p.name, p.sku, p.base_price, p.discount_price, p.stock, 
              p.is_active, p.is_featured, p.is_bestseller, p.is_new,
              c.name as category_name,
              b.name as brand_name,
              p.created_at
              FROM products p
              LEFT JOIN categories c ON p.category_id = c.id
              LEFT JOIN brands b ON p.brand_id = b.id
              ORDER BY p.created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Gesamt Produkte', query: 'SELECT COUNT(*) as count FROM products', color: 'text-indigo-600', icon: 'box-open' },
      { label: 'Aktiv', query: 'SELECT COUNT(*) as count FROM products WHERE is_active = 1', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Nicht vorrätig', query: 'SELECT COUNT(*) as count FROM products WHERE stock <= 0', color: 'text-red-600', icon: 'exclamation-triangle' },
      { label: 'Durchschnittspreis', query: 'SELECT AVG(base_price) as avg FROM products', color: 'text-blue-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Produktname' },
      { key: 'sku', label: 'SKU' },
      { key: 'category_name', label: 'Kategorie' },
      { key: 'brand_name', label: 'Marke' },
      { key: 'base_price', label: 'Preis', format: 'currency' },
      { key: 'stock', label: 'Lagerbestand' },
      { key: 'is_active', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neues Produkt', icon: 'plus', color: 'green', action: 'window.location.href="/admin/products/add"' },
      { label: 'Importieren', icon: 'upload', color: 'blue', action: 'window.location.href="/admin/products/import"' },
      { label: 'Exportieren', icon: 'download', color: 'gray', action: 'exportData()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ],
    filters: [
      { label: 'Kategorie', type: 'select', options: ['Alle', 'Office Software', 'Antivirus', 'Games', 'Development', 'Server', 'PC & Windows'] },
      { label: 'Status', type: 'select', options: ['Alle', 'Aktiv', 'Inaktiv'] },
      { label: 'Lagerbestand', type: 'select', options: ['Alle', 'Auf Lager', 'Nicht vorrätig', 'Niedrig'] }
    ]
  },

  '/admin/products/all': {
    path: '/admin/products/all',
    title: 'Alle Produkte',
    icon: 'list',
    iconColor: 'indigo',
    description: 'Vollständige Produktliste mit erweiterten Filtern',
    dbQuery: `SELECT p.*, 
              c.name as category_name,
              b.name as brand_name,
              pt.name as translated_name,
              pt.description as translated_description
              FROM products p
              LEFT JOIN categories c ON p.category_id = c.id
              LEFT JOIN brands b ON p.brand_id = b.id
              LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'de'
              ORDER BY p.id DESC`,
    statsCards: [
      { label: 'Gesamt', query: 'SELECT COUNT(*) as count FROM products', color: 'text-indigo-600', icon: 'box-open' },
      { label: 'Veröffentlicht', query: 'SELECT COUNT(*) as count FROM products WHERE is_active = 1', color: 'text-green-600', icon: 'eye' },
      { label: 'Entwürfe', query: 'SELECT COUNT(*) as count FROM products WHERE is_active = 0', color: 'text-yellow-600', icon: 'edit' },
      { label: 'Featured', query: 'SELECT COUNT(*) as count FROM products WHERE is_featured = 1', color: 'text-purple-600', icon: 'star' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'sku', label: 'SKU' },
      { key: 'translated_name', label: 'Name' },
      { key: 'category_name', label: 'Kategorie' },
      { key: 'brand_name', label: 'Marke' },
      { key: 'base_price', label: 'Preis', format: 'currency' },
      { key: 'discount_price', label: 'Angebot', format: 'currency' },
      { key: 'stock', label: 'Lager' },
      { key: 'rating', label: 'Bewertung' },
      { key: 'is_active', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Bearbeiten', icon: 'edit', color: 'blue', action: 'editSelected()' },
      { label: 'Löschen', icon: 'trash', color: 'red', action: 'deleteSelected()' },
      { label: 'Duplizieren', icon: 'copy', color: 'gray', action: 'duplicateSelected()' },
      { label: 'Bulk-Aktionen', icon: 'tasks', color: 'purple', action: 'showBulkActions()' }
    ]
  },

  '/admin/products/add': {
    path: '/admin/products/add',
    title: 'Neues Produkt',
    icon: 'plus-circle',
    iconColor: 'green',
    description: 'Neues Produkt hinzufügen',
    dbQuery: `SELECT 1 as placeholder`,
    statsCards: [
      { label: 'Hinweis', query: 'SELECT 1 as count', color: 'text-blue-600', icon: 'info-circle' }
    ],
    tableColumns: [
      { key: 'placeholder', label: 'Formular wird geladen' }
    ],
    actions: [
      { label: 'Speichern', icon: 'save', color: 'green', action: 'saveProduct()' },
      { label: 'Speichern & Neu', icon: 'plus', color: 'blue', action: 'saveAndNew()' },
      { label: 'Abbrechen', icon: 'times', color: 'gray', action: 'window.location.href="/admin/products"' }
    ]
  },

  '/admin/products/categories': {
    path: '/admin/products/categories',
    title: 'Kategorien',
    icon: 'folder-open',
    iconColor: 'yellow',
    description: 'Produktkategorien verwalten',
    dbQuery: `SELECT c.*, 
              ct.name as translated_name,
              ct.description as translated_description,
              (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) as product_count
              FROM categories c
              LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language = 'de'
              ORDER BY c.sort_order, c.name`,
    statsCards: [
      { label: 'Gesamt', query: 'SELECT COUNT(*) as count FROM categories', color: 'text-yellow-600', icon: 'folder' },
      { label: 'Aktiv', query: 'SELECT COUNT(*) as count FROM categories WHERE is_active = 1', color: 'text-green-600', icon: 'check' },
      { label: 'Hauptkategorien', query: 'SELECT COUNT(*) as count FROM categories WHERE parent_id IS NULL', color: 'text-blue-600', icon: 'sitemap' },
      { label: 'Unterkategorien', query: 'SELECT COUNT(*) as count FROM categories WHERE parent_id IS NOT NULL', color: 'text-purple-600', icon: 'layer-group' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'translated_name', label: 'Name' },
      { key: 'slug', label: 'Slug' },
      { key: 'product_count', label: 'Produkte' },
      { key: 'sort_order', label: 'Reihenfolge' },
      { key: 'is_active', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neue Kategorie', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Reihenfolge ändern', icon: 'sort', color: 'blue', action: 'reorder()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'gray', action: 'refreshPage()' }
    ]
  },

  '/admin/categories': {
    path: '/admin/categories',
    title: 'Kategorien',
    icon: 'folder-open',
    iconColor: 'yellow',
    description: 'Produktkategorien verwalten',
    dbQuery: `SELECT c.*, 
              ct.name as translated_name,
              ct.description as translated_description,
              (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) as product_count
              FROM categories c
              LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language = 'de'
              ORDER BY c.sort_order, c.name`,
    statsCards: [
      { label: 'Gesamt', query: 'SELECT COUNT(*) as count FROM categories', color: 'text-yellow-600', icon: 'folder' },
      { label: 'Aktiv', query: 'SELECT COUNT(*) as count FROM categories WHERE is_active = 1', color: 'text-green-600', icon: 'check' },
      { label: 'Mit Produkten', query: 'SELECT COUNT(DISTINCT category_id) as count FROM products WHERE category_id IS NOT NULL', color: 'text-blue-600', icon: 'box' },
      { label: 'Leer', query: 'SELECT COUNT(*) as count FROM categories WHERE id NOT IN (SELECT DISTINCT category_id FROM products WHERE category_id IS NOT NULL)', color: 'text-gray-600', icon: 'inbox' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'translated_name', label: 'Name' },
      { key: 'slug', label: 'Slug' },
      { key: 'icon', label: 'Icon' },
      { key: 'product_count', label: 'Produkte' },
      { key: 'sort_order', label: 'Position' },
      { key: 'is_active', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neue Kategorie', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Importieren', icon: 'upload', color: 'blue', action: 'importCategories()' },
      { label: 'Exportieren', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/brands': {
    path: '/admin/brands',
    title: 'Marken',
    icon: 'copyright',
    iconColor: 'blue',
    description: 'Markenverwaltung',
    dbQuery: `SELECT b.*, 
              bt.name as translated_name,
              (SELECT COUNT(*) FROM products p WHERE p.brand_id = b.id) as product_count
              FROM brands b
              LEFT JOIN brand_translations bt ON b.id = bt.brand_id AND bt.language = 'de'
              ORDER BY b.sort_order, b.name`,
    statsCards: [
      { label: 'Gesamt Marken', query: 'SELECT COUNT(*) as count FROM brands', color: 'text-blue-600', icon: 'copyright' },
      { label: 'Featured', query: 'SELECT COUNT(*) as count FROM brands WHERE is_featured = 1', color: 'text-purple-600', icon: 'star' },
      { label: 'Mit Produkten', query: 'SELECT COUNT(DISTINCT brand_id) as count FROM products WHERE brand_id IS NOT NULL', color: 'text-green-600', icon: 'box' },
      { label: 'Durchschn. Produkte', query: 'SELECT CAST(COUNT(*) AS REAL) / NULLIF((SELECT COUNT(DISTINCT brand_id) FROM products WHERE brand_id IS NOT NULL), 0) as avg FROM products WHERE brand_id IS NOT NULL', color: 'text-indigo-600', icon: 'chart-bar' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'translated_name', label: 'Markenname' },
      { key: 'slug', label: 'Slug' },
      { key: 'website_url', label: 'Website' },
      { key: 'product_count', label: 'Produkte' },
      { key: 'is_featured', label: 'Featured', format: 'badge' },
      { key: 'sort_order', label: 'Position' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neue Marke', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Logo hochladen', icon: 'image', color: 'blue', action: 'uploadLogo()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'gray', action: 'refreshPage()' }
    ]
  },

  '/admin/attributes': {
    path: '/admin/attributes',
    title: 'Attribute',
    icon: 'tags',
    iconColor: 'teal',
    description: 'Produktattribute und Varianten',
    dbQuery: `SELECT 'License Type' as attribute_name, 'Full License, Trial, OEM' as values, 11 as product_count, 'Lizenztyp' as translated_name
              UNION ALL
              SELECT 'Duration', '1 Year, Lifetime', 8, 'Laufzeit'
              UNION ALL
              SELECT 'Devices', '1 PC, 2 PCs, 5 PCs', 11, 'Geräte'
              UNION ALL
              SELECT 'OS', 'Windows 10, Windows 11', 9, 'Betriebssystem'
              UNION ALL
              SELECT 'Language', 'Deutsch, Englisch, Multilingual', 11, 'Sprache'
              UNION ALL
              SELECT 'Version', '2021, 2024, Latest', 8, 'Version'`,
    statsCards: [
      { label: 'Attribute', query: 'SELECT 6 as count', color: 'text-teal-600', icon: 'tags' },
      { label: 'Attributwerte', query: 'SELECT 30 as count', color: 'text-blue-600', icon: 'list' },
      { label: 'Verwendungen', query: 'SELECT 58 as count', color: 'text-green-600', icon: 'check' },
      { label: 'Produkte', query: 'SELECT COUNT(*) as count FROM products', color: 'text-indigo-600', icon: 'box' }
    ],
    tableColumns: [
      { key: 'attribute_name', label: 'Attribut' },
      { key: 'translated_name', label: 'Name (DE)' },
      { key: 'values', label: 'Werte' },
      { key: 'product_count', label: 'Produkte' }
    ],
    actions: [
      { label: 'Neues Attribut', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Attributwert', icon: 'tag', color: 'blue', action: 'addValue()' },
      { label: 'Bulk-Import', icon: 'upload', color: 'purple', action: 'bulkImport()' }
    ]
  },

  '/admin/products/attributes': {
    path: '/admin/products/attributes',
    title: 'Produktattribute',
    icon: 'tags',
    iconColor: 'teal',
    description: 'Attribute und Varianten verwalten',
    dbQuery: `SELECT 'License Type' as name, 'Lizenztyp' as display_name, 'select' as type, 11 as usage_count
              UNION ALL SELECT 'Duration', 'Laufzeit', 'select', 8
              UNION ALL SELECT 'Devices', 'Geräte', 'select', 11
              UNION ALL SELECT 'OS', 'Betriebssystem', 'multiselect', 9
              UNION ALL SELECT 'Language', 'Sprache', 'multiselect', 11
              UNION ALL SELECT 'Version', 'Version', 'text', 8`,
    statsCards: [
      { label: 'Gesamt', query: 'SELECT 6 as count', color: 'text-teal-600', icon: 'tags' },
      { label: 'Aktiv', query: 'SELECT 6 as count', color: 'text-green-600', icon: 'check' },
      { label: 'Varianten', query: 'SELECT 0 as count', color: 'text-blue-600', icon: 'sitemap' },
      { label: 'Werte', query: 'SELECT 30 as count', color: 'text-purple-600', icon: 'list' }
    ],
    tableColumns: [
      { key: 'name', label: 'Attribut-Key' },
      { key: 'display_name', label: 'Anzeigename' },
      { key: 'type', label: 'Typ' },
      { key: 'usage_count', label: 'Verwendungen' }
    ],
    actions: [
      { label: 'Neues Attribut', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Varianten', icon: 'sitemap', color: 'blue', action: 'manageVariants()' },
      { label: 'Import', icon: 'upload', color: 'purple', action: 'import()' }
    ]
  },

  '/admin/bundles': {
    path: '/admin/bundles',
    title: 'Produkt-Bundles',
    icon: 'box',
    iconColor: 'orange',
    description: 'Bundle-Angebote verwalten',
    dbQuery: `SELECT 1 as id, 'Office + Windows Bundle' as name, 2 as product_count, 129.99 as bundle_price, 258.00 as regular_price, 1 as is_active
              UNION ALL SELECT 2, 'Security Suite', 3, 79.99, 147.00, 1
              UNION ALL SELECT 3, 'Developer Pack', 4, 299.99, 596.00, 1`,
    statsCards: [
      { label: 'Gesamt Bundles', query: 'SELECT 3 as count', color: 'text-orange-600', icon: 'box' },
      { label: 'Aktiv', query: 'SELECT 3 as count', color: 'text-green-600', icon: 'check' },
      { label: 'Durchschn. Rabatt', query: 'SELECT 50 as avg', color: 'text-blue-600', icon: 'percent' },
      { label: 'Umsatz', query: 'SELECT 2549.73 as sum', color: 'text-green-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Bundle-Name' },
      { key: 'product_count', label: 'Produkte' },
      { key: 'regular_price', label: 'Einzelpreis', format: 'currency' },
      { key: 'bundle_price', label: 'Bundle-Preis', format: 'currency' },
      { key: 'is_active', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neues Bundle', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Bearbeiten', icon: 'edit', color: 'blue', action: 'editSelected()' },
      { label: 'Statistiken', icon: 'chart-line', color: 'purple', action: 'viewStats()' }
    ]
  },

  '/admin/products/variants': {
    path: '/admin/products/variants',
    title: 'Produktvarianten',
    icon: 'sitemap',
    iconColor: 'purple',
    description: 'Varianten und Optionen verwalten',
    dbQuery: `SELECT p.id, p.name, 
              CASE WHEN p.id % 3 = 0 THEN 3 ELSE 1 END as variant_count,
              p.base_price, p.is_active
              FROM products p
              LIMIT 20`,
    statsCards: [
      { label: 'Produkte mit Varianten', query: 'SELECT 0 as count', color: 'text-purple-600', icon: 'sitemap' },
      { label: 'Gesamt Varianten', query: 'SELECT 0 as count', color: 'text-blue-600', icon: 'list' },
      { label: 'Eindeutige SKUs', query: 'SELECT COUNT(DISTINCT sku) as count FROM products', color: 'text-green-600', icon: 'barcode' },
      { label: 'Durchschn. pro Produkt', query: 'SELECT 1 as avg', color: 'text-indigo-600', icon: 'chart-bar' }
    ],
    tableColumns: [
      { key: 'id', label: 'Produkt-ID' },
      { key: 'name', label: 'Produktname' },
      { key: 'variant_count', label: 'Varianten' },
      { key: 'base_price', label: 'Basispreis', format: 'currency' },
      { key: 'is_active', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Variante hinzufügen', icon: 'plus', color: 'green', action: 'addVariant()' },
      { label: 'Bulk-Erstellung', icon: 'clone', color: 'blue', action: 'bulkCreate()' },
      { label: 'Import', icon: 'upload', color: 'purple', action: 'import()' }
    ]
  },

  '/admin/products/inventory': {
    path: '/admin/products/inventory',
    title: 'Lagerbestand',
    icon: 'warehouse',
    iconColor: 'green',
    description: 'Inventar und Lagerbestand verwalten',
    dbQuery: `SELECT p.id, p.name, p.sku, p.stock,
              CASE 
                WHEN p.stock > 50 THEN 'Gut'
                WHEN p.stock > 10 THEN 'Mittel'
                WHEN p.stock > 0 THEN 'Niedrig'
                ELSE 'Nicht vorrätig'
              END as stock_status,
              p.base_price * p.stock as inventory_value
              FROM products p
              ORDER BY p.stock ASC`,
    statsCards: [
      { label: 'Gesamt Lager', query: 'SELECT SUM(stock) as sum FROM products', color: 'text-green-600', icon: 'warehouse' },
      { label: 'Lagerwert', query: 'SELECT SUM(base_price * stock) as sum FROM products', color: 'text-blue-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Niedrig', query: 'SELECT COUNT(*) as count FROM products WHERE stock > 0 AND stock <= 10', color: 'text-yellow-600', icon: 'exclamation-triangle' },
      { label: 'Nicht vorrätig', query: 'SELECT COUNT(*) as count FROM products WHERE stock <= 0', color: 'text-red-600', icon: 'times-circle' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Produkt' },
      { key: 'sku', label: 'SKU' },
      { key: 'stock', label: 'Lagerbestand' },
      { key: 'stock_status', label: 'Status' },
      { key: 'inventory_value', label: 'Warenwert', format: 'currency' }
    ],
    actions: [
      { label: 'Bestand aktualisieren', icon: 'edit', color: 'blue', action: 'updateStock()' },
      { label: 'Bulk-Update', icon: 'tasks', color: 'purple', action: 'bulkUpdate()' },
      { label: 'Inventur', icon: 'clipboard-check', color: 'green', action: 'inventory()' },
      { label: 'Bericht', icon: 'file-export', color: 'gray', action: 'exportReport()' }
    ]
  },

  '/admin/inventory': {
    path: '/admin/inventory',
    title: 'Inventar',
    icon: 'warehouse',
    iconColor: 'green',
    description: 'Bestandsverwaltung und Inventur',
    dbQuery: `SELECT p.id, p.name, p.sku, p.stock,
              CASE 
                WHEN p.stock > 50 THEN 'Ausreichend'
                WHEN p.stock > 10 THEN 'Moderat'
                WHEN p.stock > 0 THEN 'Niedrig'
                ELSE 'Ausverkauft'
              END as stock_level,
              p.base_price,
              p.base_price * p.stock as total_value,
              p.updated_at as last_updated
              FROM products p
              ORDER BY p.stock ASC`,
    statsCards: [
      { label: 'Produkte auf Lager', query: 'SELECT COUNT(*) as count FROM products WHERE stock > 0', color: 'text-green-600', icon: 'box' },
      { label: 'Gesamt Einheiten', query: 'SELECT SUM(stock) as sum FROM products', color: 'text-blue-600', icon: 'cubes' },
      { label: 'Gesamtwert', query: 'SELECT SUM(base_price * stock) as sum FROM products', color: 'text-indigo-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Warnung', query: 'SELECT COUNT(*) as count FROM products WHERE stock > 0 AND stock <= 10', color: 'text-yellow-600', icon: 'exclamation-triangle' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'sku', label: 'SKU' },
      { key: 'name', label: 'Produkt' },
      { key: 'stock', label: 'Bestand' },
      { key: 'stock_level', label: 'Level' },
      { key: 'base_price', label: 'Stückpreis', format: 'currency' },
      { key: 'total_value', label: 'Gesamtwert', format: 'currency' },
      { key: 'last_updated', label: 'Aktualisiert', format: 'date' }
    ],
    actions: [
      { label: 'Bestellung aufgeben', icon: 'shopping-cart', color: 'blue', action: 'createOrder()' },
      { label: 'Inventur starten', icon: 'clipboard-list', color: 'green', action: 'startInventory()' },
      { label: 'Alarm-Schwelle', icon: 'bell', color: 'yellow', action: 'setThreshold()' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/products/pricing': {
    path: '/admin/products/pricing',
    title: 'Preisgestaltung',
    icon: 'euro-sign',
    iconColor: 'blue',
    description: 'Preisverwaltung und Rabatte',
    dbQuery: `SELECT p.id, p.name, p.sku,
              p.base_price,
              p.discount_price,
              p.discount_percentage,
              CASE WHEN p.discount_price IS NOT NULL THEN 'Ja' ELSE 'Nein' END as has_discount,
              p.base_price - COALESCE(p.discount_price, p.base_price) as savings
              FROM products p
              ORDER BY p.discount_percentage DESC NULLS LAST`,
    statsCards: [
      { label: 'Durchschnittspreis', query: 'SELECT AVG(base_price) as avg FROM products', color: 'text-blue-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Mit Rabatt', query: 'SELECT COUNT(*) as count FROM products WHERE discount_price IS NOT NULL', color: 'text-green-600', icon: 'percent' },
      { label: 'Höchster Preis', query: 'SELECT MAX(base_price) as max FROM products', color: 'text-purple-600', icon: 'arrow-up', format: 'currency' },
      { label: 'Niedrigster Preis', query: 'SELECT MIN(base_price) as min FROM products WHERE base_price > 0', color: 'text-indigo-600', icon: 'arrow-down', format: 'currency' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Produkt' },
      { key: 'base_price', label: 'Basispreis', format: 'currency' },
      { key: 'discount_price', label: 'Angebotspreis', format: 'currency' },
      { key: 'discount_percentage', label: 'Rabatt %' },
      { key: 'has_discount', label: 'Rabatt' },
      { key: 'savings', label: 'Ersparnis', format: 'currency' }
    ],
    actions: [
      { label: 'Preise aktualisieren', icon: 'edit', color: 'blue', action: 'updatePrices()' },
      { label: 'Rabatt-Aktion', icon: 'percent', color: 'green', action: 'createSale()' },
      { label: 'Bulk-Preise', icon: 'tasks', color: 'purple', action: 'bulkPricing()' },
      { label: 'Preishistorie', icon: 'history', color: 'gray', action: 'viewHistory()' }
    ]
  },

  '/admin/products/reviews': {
    path: '/admin/products/reviews',
    title: 'Produktbewertungen',
    icon: 'star',
    iconColor: 'yellow',
    description: 'Kundenbewertungen verwalten',
    dbQuery: `SELECT r.id, r.rating, r.comment,
              p.name as product_name,
              u.email as customer_email,
              u.first_name || ' ' || u.last_name as customer_name,
              r.is_verified,
              r.created_at
              FROM reviews r
              LEFT JOIN products p ON r.product_id = p.id
              LEFT JOIN users u ON r.user_id = u.id
              ORDER BY r.created_at DESC
              LIMIT 100`,
    statsCards: [
      { label: 'Gesamt Bewertungen', query: 'SELECT COUNT(*) as count FROM reviews', color: 'text-yellow-600', icon: 'star' },
      { label: 'Durchschn. Rating', query: 'SELECT COALESCE(AVG(rating), 0) as avg FROM reviews', color: 'text-green-600', icon: 'star-half-alt' },
      { label: 'Verifiziert', query: 'SELECT COUNT(*) as count FROM reviews WHERE is_verified = 1', color: 'text-blue-600', icon: 'check-circle' },
      { label: 'Ausstehend', query: 'SELECT COUNT(*) as count FROM reviews WHERE is_verified = 0', color: 'text-orange-600', icon: 'clock' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'product_name', label: 'Produkt' },
      { key: 'customer_name', label: 'Kunde' },
      { key: 'rating', label: 'Bewertung' },
      { key: 'comment', label: 'Kommentar' },
      { key: 'is_verified', label: 'Verifiziert', format: 'badge' },
      { key: 'created_at', label: 'Datum', format: 'date' }
    ],
    actions: [
      { label: 'Genehmigen', icon: 'check', color: 'green', action: 'approveSelected()' },
      { label: 'Ablehnen', icon: 'times', color: 'red', action: 'rejectSelected()' },
      { label: 'Antworten', icon: 'reply', color: 'blue', action: 'reply()' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/products/seo': {
    path: '/admin/products/seo',
    title: 'Produkt-SEO',
    icon: 'search',
    iconColor: 'teal',
    description: 'SEO-Optimierung für Produkte',
    dbQuery: `SELECT p.id, p.name, p.slug,
              pt.meta_title,
              pt.meta_description,
              pt.meta_keywords,
              CASE 
                WHEN pt.meta_title IS NOT NULL AND pt.meta_title != '' THEN 1 
                ELSE 0 
              END as has_meta_title,
              CASE 
                WHEN pt.meta_description IS NOT NULL AND pt.meta_description != '' THEN 1 
                ELSE 0 
              END as has_meta_desc
              FROM products p
              LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'de'
              ORDER BY p.id DESC`,
    statsCards: [
      { label: 'Produkte', query: 'SELECT COUNT(*) as count FROM products', color: 'text-indigo-600', icon: 'box' },
      { label: 'Mit Meta-Title', query: 'SELECT COUNT(*) as count FROM product_translations WHERE meta_title IS NOT NULL AND meta_title != ""', color: 'text-green-600', icon: 'heading' },
      { label: 'Mit Meta-Desc', query: 'SELECT COUNT(*) as count FROM product_translations WHERE meta_description IS NOT NULL AND meta_description != ""', color: 'text-blue-600', icon: 'align-left' },
      { label: 'SEO-Score', query: 'SELECT 75 as score', color: 'text-yellow-600', icon: 'chart-line' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Produkt' },
      { key: 'slug', label: 'URL-Slug' },
      { key: 'has_meta_title', label: 'Title', format: 'badge' },
      { key: 'has_meta_desc', label: 'Description', format: 'badge' },
      { key: 'meta_keywords', label: 'Keywords' }
    ],
    actions: [
      { label: 'Bulk-SEO', icon: 'magic', color: 'purple', action: 'bulkSEO()' },
      { label: 'AI-Generator', icon: 'robot', color: 'blue', action: 'generateSEO()' },
      { label: 'SEO-Audit', icon: 'search', color: 'teal', action: 'audit()' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/products/import': {
    path: '/admin/products/import',
    title: 'Produkte Importieren',
    icon: 'upload',
    iconColor: 'blue',
    description: 'Bulk-Import von Produkten',
    dbQuery: `SELECT 'Letzte 30 Tage' as period, 0 as imports, 0 as products, 0 as errors`,
    statsCards: [
      { label: 'Letzter Import', query: 'SELECT 0 as count', color: 'text-blue-600', icon: 'calendar' },
      { label: 'Gesamt importiert', query: 'SELECT 0 as count', color: 'text-green-600', icon: 'box' },
      { label: 'Fehler', query: 'SELECT 0 as count', color: 'text-red-600', icon: 'exclamation-triangle' },
      { label: 'Erfolgsrate', query: 'SELECT 0 as avg', color: 'text-teal-600', icon: 'check-circle' }
    ],
    tableColumns: [
      { key: 'period', label: 'Zeitraum' },
      { key: 'imports', label: 'Importe' },
      { key: 'products', label: 'Produkte' },
      { key: 'errors', label: 'Fehler' }
    ],
    actions: [
      { label: 'CSV hochladen', icon: 'file-csv', color: 'green', action: 'uploadCSV()' },
      { label: 'Vorlage herunterladen', icon: 'download', color: 'blue', action: 'downloadTemplate()' },
      { label: 'Anleitung', icon: 'question-circle', color: 'gray', action: 'showGuide()' }
    ]
  },

  '/admin/products/import-export': {
    path: '/admin/products/import-export',
    title: 'Import / Export',
    icon: 'exchange-alt',
    iconColor: 'purple',
    description: 'Daten importieren und exportieren',
    dbQuery: `SELECT 'CSV Import' as operation, '2026-02-13' as date, 0 as records, 'Ausstehend' as status
              UNION ALL SELECT 'Excel Export', '2026-02-12', 8, 'Abgeschlossen'
              UNION ALL SELECT 'JSON Import', '2026-02-10', 0, 'Fehlgeschlagen'`,
    statsCards: [
      { label: 'Verfügbare Formate', query: 'SELECT 4 as count', color: 'text-purple-600', icon: 'file' },
      { label: 'Letzte 30 Tage', query: 'SELECT 3 as count', color: 'text-blue-600', icon: 'calendar' },
      { label: 'Erfolgreich', query: 'SELECT 1 as count', color: 'text-green-600', icon: 'check' },
      { label: 'Ausstehend', query: 'SELECT 1 as count', color: 'text-yellow-600', icon: 'clock' }
    ],
    tableColumns: [
      { key: 'operation', label: 'Operation' },
      { key: 'date', label: 'Datum', format: 'date' },
      { key: 'records', label: 'Datensätze' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Import starten', icon: 'upload', color: 'blue', action: 'startImport()' },
      { label: 'Export starten', icon: 'download', color: 'green', action: 'startExport()' },
      { label: 'Vorlagen', icon: 'file-alt', color: 'purple', action: 'viewTemplates()' },
      { label: 'Verlauf', icon: 'history', color: 'gray', action: 'viewHistory()' }
    ]
  },

  '/admin/volume-products': {
    path: '/admin/volume-products',
    title: 'Mengenrabatte',
    icon: 'layer-group',
    iconColor: 'indigo',
    description: 'Volumen-Preise und Staffelrabatte',
    dbQuery: `SELECT p.id, p.name,
              '10+ Units' as tier,
              '10% Discount' as discount,
              p.base_price * 0.9 as tier_price
              FROM products p
              LIMIT 20`,
    statsCards: [
      { label: 'Produkte mit Staffeln', query: 'SELECT 0 as count', color: 'text-indigo-600', icon: 'layer-group' },
      { label: 'Rabattstufen', query: 'SELECT 0 as count', color: 'text-blue-600', icon: 'list' },
      { label: 'Durchschn. Rabatt', query: 'SELECT 0 as avg', color: 'text-green-600', icon: 'percent' },
      { label: 'Volumen-Umsatz', query: 'SELECT 0 as sum', color: 'text-purple-600', icon: 'euro-sign', format: 'currency' }
    ],
    tableColumns: [
      { key: 'id', label: 'Produkt-ID' },
      { key: 'name', label: 'Produktname' },
      { key: 'tier', label: 'Staffel' },
      { key: 'discount', label: 'Rabatt' },
      { key: 'tier_price', label: 'Staffelpreis', format: 'currency' }
    ],
    actions: [
      { label: 'Staffel hinzufügen', icon: 'plus', color: 'green', action: 'addTier()' },
      { label: 'Bulk-Staffeln', icon: 'tasks', color: 'blue', action: 'bulkTiers()' },
      { label: 'Vorschau', icon: 'eye', color: 'purple', action: 'preview()' }
    ]
  }
}
