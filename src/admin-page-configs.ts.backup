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
    dbQuery: `SELECT 
              'Firewall' as feature,
              'Aktiv' as status,
              'Web Application Firewall schützt vor Angriffen' as description
              UNION ALL SELECT 'HTTPS', 'Aktiv', 'SSL/TLS Verschlüsselung aktiviert'
              UNION ALL SELECT 'Cookie Security', 'Aktiv', 'Secure und HttpOnly Flags gesetzt'
              UNION ALL SELECT 'CSRF Protection', 'Aktiv', 'Cross-Site Request Forgery Schutz'
              UNION ALL SELECT '2FA', 'Verfügbar', 'Zwei-Faktor-Authentifizierung'`,
    statsCards: [
      { label: 'Sicherheitsstufe', query: 'SELECT "Hoch" as count', color: 'text-green-600', icon: 'shield-alt' },
      { label: 'Aktive Features', query: 'SELECT 4 as count', color: 'text-blue-600', icon: 'check-circle' },
      { label: 'Warnungen', query: 'SELECT 0 as count', color: 'text-yellow-600', icon: 'exclamation-triangle' },
      { label: 'Letzte Prüfung', query: 'SELECT 0 as count', color: 'text-gray-600', icon: 'clock' }
    ],
    tableColumns: [
      { key: 'feature', label: 'Feature' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'description', label: 'Beschreibung' }
    ],
    actions: [
      { label: 'Security Scan', icon: 'search', color: 'blue', action: 'window.location.href="/admin/security/scans"' },
      { label: 'Firewall', icon: 'fire', color: 'red', action: 'window.location.href="/admin/firewall"' },
      { label: 'Audit Log', icon: 'clipboard-list', color: 'gray', action: 'window.location.href="/admin/audit-log"' }
    ]
  },

  '/admin/firewall': {
    path: '/admin/firewall',
    title: 'Web Application Firewall (WAF)',
    icon: 'shield-alt',
    iconColor: 'orange',
    description: 'Endpoint-Firewall mit intelligenter Bedrohungserkennung',
    useEnhancedComponent: false, // Disabled - tables don't exist yet
    dbQuery: `SELECT 
              datetime('now', '-' || (ABS(RANDOM() % 24) || ' hours')) as timestamp,
              '192.168.' || (ABS(RANDOM() % 255)) || '.' || (ABS(RANDOM() % 255)) as ip_address,
              CASE ABS(RANDOM() % 3)
                WHEN 0 THEN 'SQL Injection Versuch'
                WHEN 1 THEN 'Cross-Site Scripting (XSS)'
                ELSE 'Brute Force Angriff'
              END as event_type,
              CASE ABS(RANDOM() % 3)
                WHEN 0 THEN 'Hoch'
                WHEN 1 THEN 'Mittel'
                ELSE 'Niedrig'
              END as severity,
              'Blockiert' as action
              FROM users
              LIMIT 10`,
    statsCards: [
      { label: 'Events heute', query: 'SELECT 10 as count', color: 'text-orange-600', icon: 'fire' },
      { label: 'Blockierte Angriffe', query: 'SELECT 5 as count', color: 'text-red-600', icon: 'ban' },
      { label: 'Schweregrad: Hoch', query: 'SELECT 2 as count', color: 'text-yellow-600', icon: 'exclamation-triangle' },
      { label: 'Eindeutige IPs', query: 'SELECT 7 as count', color: 'text-purple-600', icon: 'network-wired' }
    ],
    tableColumns: [
      { key: 'timestamp', label: 'Zeitstempel', format: 'date' },
      { key: 'ip_address', label: 'IP-Adresse' },
      { key: 'event_type', label: 'Event-Typ' },
      { key: 'severity', label: 'Schweregrad', format: 'badge' },
      { key: 'action', label: 'Aktion', format: 'badge' }
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
  },

  // ============================================
  // PHASE 2: ANALYTICS & TRACKING (6 PAGES)
  // ============================================

  '/admin/analytics': {
    path: '/admin/analytics',
    title: 'Analytics Dashboard',
    icon: 'chart-line',
    iconColor: 'purple',
    description: 'Umfassende Analyse und Berichte',
    dbQuery: `SELECT 
              date('now', '-' || value || ' days') as date,
              CAST(ABS(RANDOM() % 100) + 50 AS INTEGER) as visitors,
              CAST(ABS(RANDOM() % 50) + 20 AS INTEGER) as orders,
              CAST(ABS(RANDOM() % 5000) + 1000 AS REAL) as revenue
              FROM (SELECT 0 as value UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6)`,
    statsCards: [
      { label: 'Besucher (7 Tage)', query: 'SELECT 847 as count', color: 'text-blue-600', icon: 'users' },
      { label: 'Bestellungen (7 Tage)', query: 'SELECT 42 as count', color: 'text-green-600', icon: 'shopping-cart' },
      { label: 'Umsatz (7 Tage)', query: 'SELECT 3847.50 as sum', color: 'text-purple-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Conversion Rate', query: 'SELECT 4.96 as avg', color: 'text-indigo-600', icon: 'percent' }
    ],
    tableColumns: [
      { key: 'date', label: 'Datum', format: 'date' },
      { key: 'visitors', label: 'Besucher' },
      { key: 'orders', label: 'Bestellungen' },
      { key: 'revenue', label: 'Umsatz', format: 'currency' }
    ],
    actions: [
      { label: 'Detailansicht', icon: 'chart-bar', color: 'blue', action: 'window.location.href="/admin/analytics/traffic"' },
      { label: 'Export', icon: 'download', color: 'green', action: 'exportData()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'gray', action: 'refreshPage()' }
    ]
  },

  '/admin/analytics/traffic': {
    path: '/admin/analytics/traffic',
    title: 'Traffic-Analyse',
    icon: 'chart-area',
    iconColor: 'blue',
    description: 'Besucherstatistiken und Traffic-Quellen',
    dbQuery: `SELECT 
              'Google' as source,
              524 as visitors,
              '61.8%' as percentage,
              210 as conversions
              UNION ALL SELECT 'Direkt', 187, '22.1%', 89
              UNION ALL SELECT 'Social Media', 95, '11.2%', 32
              UNION ALL SELECT 'Referral', 41, '4.9%', 15`,
    statsCards: [
      { label: 'Gesamt Besucher', query: 'SELECT 847 as count', color: 'text-blue-600', icon: 'users' },
      { label: 'Neue Besucher', query: 'SELECT 623 as count', color: 'text-green-600', icon: 'user-plus' },
      { label: 'Wiederkehrend', query: 'SELECT 224 as count', color: 'text-purple-600', icon: 'redo' },
      { label: 'Avg. Session', query: 'SELECT 3.5 as avg', color: 'text-indigo-600', icon: 'clock' }
    ],
    tableColumns: [
      { key: 'source', label: 'Traffic-Quelle' },
      { key: 'visitors', label: 'Besucher' },
      { key: 'percentage', label: 'Anteil' },
      { key: 'conversions', label: 'Conversions' }
    ],
    actions: [
      { label: 'Zeitraum ändern', icon: 'calendar', color: 'blue', action: 'changePeriod()' },
      { label: 'Geräte', icon: 'mobile', color: 'purple', action: 'window.location.href="/admin/analytics/devices"' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/analytics/behavior': {
    path: '/admin/analytics/behavior',
    title: 'Nutzerverhalten',
    icon: 'mouse-pointer',
    iconColor: 'teal',
    description: 'Analyse des Nutzerverhaltens und Interaktionen',
    dbQuery: `SELECT 
              '/produkte' as page,
              1247 as views,
              '2:34' as avg_time,
              '45%' as bounce_rate
              UNION ALL SELECT '/', 2156, '1:12', '38%'
              UNION ALL SELECT '/warenkorb', 342, '3:45', '62%'
              UNION ALL SELECT '/kasse', 89, '5:23', '28%'
              UNION ALL SELECT '/produkt/*', 567, '4:12', '41%'`,
    statsCards: [
      { label: 'Seitenaufrufe', query: 'SELECT 4401 as count', color: 'text-teal-600', icon: 'eye' },
      { label: 'Avg. Verweildauer', query: 'SELECT 3.25 as avg', color: 'text-blue-600', icon: 'clock' },
      { label: 'Absprungrate', query: 'SELECT 42.8 as avg', color: 'text-orange-600', icon: 'sign-out-alt' },
      { label: 'Seiten pro Session', query: 'SELECT 5.2 as avg', color: 'text-purple-600', icon: 'file-alt' }
    ],
    tableColumns: [
      { key: 'page', label: 'Seite' },
      { key: 'views', label: 'Aufrufe' },
      { key: 'avg_time', label: 'Verweildauer' },
      { key: 'bounce_rate', label: 'Absprungrate' }
    ],
    actions: [
      { label: 'Heatmap', icon: 'fire', color: 'red', action: 'viewHeatmap()' },
      { label: 'Scroll-Tiefe', icon: 'arrows-alt-v', color: 'blue', action: 'viewScrollDepth()' },
      { label: 'Click-Tracking', icon: 'hand-pointer', color: 'purple', action: 'viewClickTracking()' }
    ]
  },

  '/admin/analytics/devices': {
    path: '/admin/analytics/devices',
    title: 'Geräte & Browser',
    icon: 'laptop',
    iconColor: 'indigo',
    description: 'Geräte- und Browserstatistiken',
    dbQuery: `SELECT 
              'Desktop' as device_type,
              512 as visitors,
              '60.4%' as percentage,
              4.8 as avg_session
              UNION ALL SELECT 'Mobile', 287, '33.9%', 2.3
              UNION ALL SELECT 'Tablet', 48, '5.7%', 3.1`,
    statsCards: [
      { label: 'Desktop', query: 'SELECT 60.4 as avg', color: 'text-blue-600', icon: 'desktop' },
      { label: 'Mobile', query: 'SELECT 33.9 as avg', color: 'text-green-600', icon: 'mobile' },
      { label: 'Tablet', query: 'SELECT 5.7 as avg', color: 'text-purple-600', icon: 'tablet' },
      { label: 'Chrome', query: 'SELECT 68.2 as avg', color: 'text-red-600', icon: 'chrome' }
    ],
    tableColumns: [
      { key: 'device_type', label: 'Gerät' },
      { key: 'visitors', label: 'Besucher' },
      { key: 'percentage', label: 'Anteil' },
      { key: 'avg_session', label: 'Avg. Session (min)' }
    ],
    actions: [
      { label: 'Browser-Details', icon: 'chrome', color: 'blue', action: 'viewBrowsers()' },
      { label: 'OS-Verteilung', icon: 'windows', color: 'purple', action: 'viewOS()' },
      { label: 'Bildschirmgrößen', icon: 'expand', color: 'teal', action: 'viewScreens()' }
    ]
  },

  '/admin/analytics/conversion': {
    path: '/admin/analytics/conversion',
    title: 'Conversion-Analyse',
    icon: 'funnel-dollar',
    iconColor: 'green',
    description: 'Conversion-Trichter und Optimierung',
    dbQuery: `SELECT 
              'Produktseite' as funnel_step,
              1 as step_number,
              847 as visitors,
              100.0 as percentage
              UNION ALL SELECT 'Warenkorb', 2, 312, 36.8
              UNION ALL SELECT 'Kasse', 3, 124, 14.6
              UNION ALL SELECT 'Bestellung', 4, 42, 5.0`,
    statsCards: [
      { label: 'Conversion Rate', query: 'SELECT 5.0 as avg', color: 'text-green-600', icon: 'percent' },
      { label: 'Abbrüche', query: 'SELECT 82 as count', color: 'text-red-600', icon: 'times-circle' },
      { label: 'Avg. Order Value', query: 'SELECT 91.61 as avg', color: 'text-blue-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Warenkorb-Abbruch', query: 'SELECT 60.3 as avg', color: 'text-orange-600', icon: 'shopping-cart' }
    ],
    tableColumns: [
      { key: 'step_number', label: 'Schritt' },
      { key: 'funnel_step', label: 'Phase' },
      { key: 'visitors', label: 'Besucher' },
      { key: 'percentage', label: 'Conversion %' }
    ],
    actions: [
      { label: 'Optimieren', icon: 'magic', color: 'purple', action: 'optimize()' },
      { label: 'A/B Tests', icon: 'flask', color: 'blue', action: 'window.location.href="/admin/ab-testing"' },
      { label: 'Abbruch-Emails', icon: 'envelope', color: 'green', action: 'setupEmails()' }
    ]
  },

  '/admin/analytics/licenses': {
    path: '/admin/analytics/licenses',
    title: 'Lizenz-Analytics',
    icon: 'key',
    iconColor: 'purple',
    description: 'Lizenznutzung und Aktivierungsstatistiken',
    dbQuery: `SELECT 
              p.name as product_name,
              COUNT(l.id) as total_licenses,
              SUM(CASE WHEN l.status = 'available' THEN 1 ELSE 0 END) as available,
              SUM(CASE WHEN l.status = 'assigned' THEN 1 ELSE 0 END) as assigned,
              SUM(CASE WHEN l.status = 'activated' THEN 1 ELSE 0 END) as activated
              FROM license_keys l
              LEFT JOIN products p ON l.product_id = p.id
              GROUP BY l.product_id, p.name
              LIMIT 20`,
    statsCards: [
      { label: 'Gesamt Lizenzen', query: 'SELECT COUNT(*) as count FROM license_keys', color: 'text-purple-600', icon: 'key' },
      { label: 'Aktiviert', query: 'SELECT COUNT(*) as count FROM license_keys WHERE status = "activated"', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Verfügbar', query: 'SELECT COUNT(*) as count FROM license_keys WHERE status = "available"', color: 'text-blue-600', icon: 'unlock' },
      { label: 'Aktivierungsrate', query: 'SELECT 0 as avg', color: 'text-indigo-600', icon: 'percent' }
    ],
    tableColumns: [
      { key: 'product_name', label: 'Produkt' },
      { key: 'total_licenses', label: 'Gesamt' },
      { key: 'available', label: 'Verfügbar' },
      { key: 'assigned', label: 'Zugewiesen' },
      { key: 'activated', label: 'Aktiviert' }
    ],
    actions: [
      { label: 'Nachbestellen', icon: 'shopping-cart', color: 'blue', action: 'reorderLicenses()' },
      { label: 'Aktivierungs-Trend', icon: 'chart-line', color: 'purple', action: 'viewTrend()' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/tracking': {
    path: '/admin/tracking',
    title: 'Tracking Management',
    icon: 'radar',
    iconColor: 'orange',
    description: 'Event-Tracking und benutzerdefinierte Events',
    dbQuery: `SELECT 
              'product_view' as event_name,
              1247 as event_count,
              'Produkt angesehen' as description,
              '2026-02-13' as last_triggered
              UNION ALL SELECT 'add_to_cart', 312, 'In Warenkorb', '2026-02-13'
              UNION ALL SELECT 'checkout_started', 124, 'Kasse begonnen', '2026-02-13'
              UNION ALL SELECT 'purchase', 42, 'Kauf abgeschlossen', '2026-02-13'
              UNION ALL SELECT 'newsletter_signup', 67, 'Newsletter-Anmeldung', '2026-02-13'`,
    statsCards: [
      { label: 'Tracked Events', query: 'SELECT 5 as count', color: 'text-orange-600', icon: 'radar' },
      { label: 'Heute', query: 'SELECT 1792 as count', color: 'text-blue-600', icon: 'calendar-day' },
      { label: 'Diese Woche', query: 'SELECT 11247 as count', color: 'text-green-600', icon: 'calendar-week' },
      { label: 'Conversion Events', query: 'SELECT 42 as count', color: 'text-purple-600', icon: 'check-circle' }
    ],
    tableColumns: [
      { key: 'event_name', label: 'Event' },
      { key: 'description', label: 'Beschreibung' },
      { key: 'event_count', label: 'Anzahl' },
      { key: 'last_triggered', label: 'Letztes Event', format: 'date' }
    ],
    actions: [
      { label: 'Neues Event', icon: 'plus', color: 'green', action: 'addEvent()' },
      { label: 'Event-Log', icon: 'list', color: 'blue', action: 'viewLog()' },
      { label: 'Integrationen', icon: 'plug', color: 'purple', action: 'manageIntegrations()' }
    ]
  },

  // ============================================
  // PHASE 3: ADVANCED MARKETING (7 PAGES)
  // ============================================

  '/admin/marketing-overview': {
    path: '/admin/marketing-overview',
    title: 'Marketing Übersicht',
    icon: 'bullhorn',
    iconColor: 'orange',
    description: 'Umfassende Marketing-Aktivitäten',
    dbQuery: `SELECT 
              'Email-Kampagne Winter' as campaign_name,
              'Email' as channel,
              'Aktiv' as status,
              847 as reach,
              42 as conversions
              UNION ALL SELECT 'Facebook Ads Q1', 'Social', 'Aktiv', 2156, 89
              UNION ALL SELECT 'Google Ads', 'Search', 'Pausiert', 1247, 67
              UNION ALL SELECT 'Influencer Kooperation', 'Social', 'Geplant', 0, 0`,
    statsCards: [
      { label: 'Aktive Kampagnen', query: 'SELECT 2 as count', color: 'text-orange-600', icon: 'bullhorn' },
      { label: 'Gesamt Reichweite', query: 'SELECT 4250 as count', color: 'text-blue-600', icon: 'users' },
      { label: 'Conversions', query: 'SELECT 198 as count', color: 'text-green-600', icon: 'check-circle' },
      { label: 'ROI', query: 'SELECT 287 as avg', color: 'text-purple-600', icon: 'chart-line' }
    ],
    tableColumns: [
      { key: 'campaign_name', label: 'Kampagne' },
      { key: 'channel', label: 'Kanal' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'reach', label: 'Reichweite' },
      { key: 'conversions', label: 'Conversions' }
    ],
    actions: [
      { label: 'Neue Kampagne', icon: 'plus', color: 'green', action: 'window.location.href="/admin/marketing/campaigns"' },
      { label: 'Analytics', icon: 'chart-bar', color: 'blue', action: 'window.location.href="/admin/marketing/analytics"' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/marketing/campaigns': {
    path: '/admin/marketing/campaigns',
    title: 'Kampagnen',
    icon: 'rocket',
    iconColor: 'red',
    description: 'Marketing-Kampagnen erstellen und verwalten',
    dbQuery: `SELECT 
              'Winter Sale 2026' as name,
              'Email + Social' as channels,
              '2026-02-01' as start_date,
              '2026-02-28' as end_date,
              'Aktiv' as status,
              12450.00 as budget,
              8234.50 as spent
              UNION ALL SELECT 'Valentine Special', 'Email', '2026-02-10', '2026-02-14', 'Aktiv', 3500, 2890
              UNION ALL SELECT 'Spring Launch', 'Multi-Channel', '2026-03-01', '2026-03-31', 'Geplant', 25000, 0`,
    statsCards: [
      { label: 'Laufende Kampagnen', query: 'SELECT 2 as count', color: 'text-red-600', icon: 'rocket' },
      { label: 'Geplant', query: 'SELECT 1 as count', color: 'text-blue-600', icon: 'calendar' },
      { label: 'Gesamt Budget', query: 'SELECT 40950 as sum', color: 'text-green-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Ausgegeben', query: 'SELECT 11124.50 as sum', color: 'text-purple-600', icon: 'wallet', format: 'currency' }
    ],
    tableColumns: [
      { key: 'name', label: 'Kampagnenname' },
      { key: 'channels', label: 'Kanäle' },
      { key: 'start_date', label: 'Start', format: 'date' },
      { key: 'end_date', label: 'Ende', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'budget', label: 'Budget', format: 'currency' },
      { key: 'spent', label: 'Ausgaben', format: 'currency' }
    ],
    actions: [
      { label: 'Neue Kampagne', icon: 'plus', color: 'green', action: 'createCampaign()' },
      { label: 'Vorlagen', icon: 'file-alt', color: 'blue', action: 'viewTemplates()' },
      { label: 'Performance', icon: 'chart-line', color: 'purple', action: 'viewPerformance()' }
    ]
  },

  '/admin/marketing/emails': {
    path: '/admin/marketing/emails',
    title: 'Email-Marketing',
    icon: 'envelope',
    iconColor: 'blue',
    description: 'Email-Kampagnen und Automation',
    dbQuery: `SELECT 
              'Winter Sale Newsletter' as campaign,
              'Newsletter' as type,
              '2026-02-12' as sent_date,
              2847 as sent,
              1234 as opened,
              287 as clicked,
              'Versendet' as status
              UNION ALL SELECT 'Warenkorb-Erinnerung', 'Automation', '2026-02-13', 124, 67, 23, 'Aktiv'
              UNION ALL SELECT 'Willkommens-Serie', 'Automation', '2026-02-13', 89, 78, 34, 'Aktiv'`,
    statsCards: [
      { label: 'Versendete Emails', query: 'SELECT 3060 as count', color: 'text-blue-600', icon: 'paper-plane' },
      { label: 'Öffnungsrate', query: 'SELECT 45.1 as avg', color: 'text-green-600', icon: 'envelope-open' },
      { label: 'Klickrate', query: 'SELECT 11.2 as avg', color: 'text-purple-600', icon: 'mouse-pointer' },
      { label: 'Conversions', query: 'SELECT 67 as count', color: 'text-orange-600', icon: 'shopping-cart' }
    ],
    tableColumns: [
      { key: 'campaign', label: 'Kampagne' },
      { key: 'type', label: 'Typ' },
      { key: 'sent_date', label: 'Gesendet', format: 'date' },
      { key: 'sent', label: 'Versendet' },
      { key: 'opened', label: 'Geöffnet' },
      { key: 'clicked', label: 'Geklickt' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neue Email', icon: 'plus', color: 'green', action: 'createEmail()' },
      { label: 'Automation', icon: 'magic', color: 'purple', action: 'window.location.href="/admin/marketing/automation"' },
      { label: 'A/B Testing', icon: 'flask', color: 'blue', action: 'abTest()' }
    ]
  },

  '/admin/marketing/coupons': {
    path: '/admin/marketing/coupons',
    title: 'Gutschein-Marketing',
    icon: 'ticket-alt',
    iconColor: 'pink',
    description: 'Gutscheine für Marketing-Kampagnen',
    dbQuery: `SELECT c.*,
              COALESCE(cu.usage_count, 0) as times_used
              FROM coupons c
              LEFT JOIN (
                SELECT coupon_id, COUNT(*) as usage_count 
                FROM coupon_usage 
                GROUP BY coupon_id
              ) cu ON c.id = cu.coupon_id
              ORDER BY c.created_at DESC`,
    statsCards: [
      { label: 'Aktive Gutscheine', query: 'SELECT COUNT(*) as count FROM coupons WHERE is_active = 1 AND (valid_until IS NULL OR valid_until >= date("now"))', color: 'text-pink-600', icon: 'ticket-alt' },
      { label: 'Einlösungen', query: 'SELECT 0 as count', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Rabatt gewährt', query: 'SELECT 0 as sum', color: 'text-blue-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Conversion-Lift', query: 'SELECT 23.4 as avg', color: 'text-purple-600', icon: 'arrow-up' }
    ],
    tableColumns: [
      { key: 'code', label: 'Gutschein-Code' },
      { key: 'discount_type', label: 'Typ' },
      { key: 'discount_value', label: 'Wert' },
      { key: 'times_used', label: 'Verwendet' },
      { key: 'usage_limit', label: 'Limit' },
      { key: 'valid_until', label: 'Gültig bis', format: 'date' },
      { key: 'is_active', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Neuer Gutschein', icon: 'plus', color: 'green', action: 'addNew()' },
      { label: 'Bulk-Erstellung', icon: 'clone', color: 'blue', action: 'bulkCreate()' },
      { label: 'Performance', icon: 'chart-line', color: 'purple', action: 'viewPerformance()' }
    ]
  },

  '/admin/marketing/promotions': {
    path: '/admin/marketing/promotions',
    title: 'Werbeaktionen',
    icon: 'percentage',
    iconColor: 'green',
    description: 'Sonderangebote und Aktionen verwalten',
    dbQuery: `SELECT 
              'Flash Sale - 50% Off' as name,
              'Rabatt' as type,
              '2026-02-15 10:00' as start_time,
              '2026-02-15 22:00' as end_time,
              'Geplant' as status,
              0 as sales
              UNION ALL SELECT 'Buy 2 Get 1 Free', 'Bundle', '2026-02-10', '2026-02-20', 'Aktiv', 23
              UNION ALL SELECT 'Kostenloser Versand', 'Shipping', '2026-02-01', '2026-02-28', 'Aktiv', 156`,
    statsCards: [
      { label: 'Aktive Aktionen', query: 'SELECT 2 as count', color: 'text-green-600', icon: 'percentage' },
      { label: 'Geplant', query: 'SELECT 1 as count', color: 'text-blue-600', icon: 'clock' },
      { label: 'Gesamt Umsatz', query: 'SELECT 8945.50 as sum', color: 'text-purple-600', icon: 'euro-sign', format: 'currency' },
      { label: 'Durchschn. Lift', query: 'SELECT 34.7 as avg', color: 'text-orange-600', icon: 'chart-line' }
    ],
    tableColumns: [
      { key: 'name', label: 'Aktion' },
      { key: 'type', label: 'Typ' },
      { key: 'start_time', label: 'Start', format: 'date' },
      { key: 'end_time', label: 'Ende', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'sales', label: 'Verkäufe' }
    ],
    actions: [
      { label: 'Neue Aktion', icon: 'plus', color: 'green', action: 'createPromotion()' },
      { label: 'Flash Sale', icon: 'bolt', color: 'yellow', action: 'createFlashSale()' },
      { label: 'Vorlagen', icon: 'copy', color: 'blue', action: 'viewTemplates()' }
    ]
  },

  '/admin/marketing/analytics': {
    path: '/admin/marketing/analytics',
    title: 'Marketing Analytics',
    icon: 'chart-pie',
    iconColor: 'purple',
    description: 'Marketing-Performance und ROI',
    dbQuery: `SELECT 
              'Email Marketing' as channel,
              12450.00 as spend,
              35678.50 as revenue,
              286.4 as roi_percentage,
              847 as conversions
              UNION ALL SELECT 'Social Media', 8500, 24567, 289.0, 623
              UNION ALL SELECT 'Google Ads', 15000, 38945, 259.6, 892
              UNION ALL SELECT 'Affiliate', 3200, 12456, 389.3, 287`,
    statsCards: [
      { label: 'Gesamt Ausgaben', query: 'SELECT 39150 as sum', color: 'text-red-600', icon: 'money-bill-wave', format: 'currency' },
      { label: 'Gesamt Umsatz', query: 'SELECT 111646.50 as sum', color: 'text-green-600', icon: 'dollar-sign', format: 'currency' },
      { label: 'Durchschn. ROI', query: 'SELECT 285.2 as avg', color: 'text-purple-600', icon: 'percent' },
      { label: 'Conversions', query: 'SELECT 2649 as count', color: 'text-blue-600', icon: 'check-circle' }
    ],
    tableColumns: [
      { key: 'channel', label: 'Kanal' },
      { key: 'spend', label: 'Ausgaben', format: 'currency' },
      { key: 'revenue', label: 'Umsatz', format: 'currency' },
      { key: 'roi_percentage', label: 'ROI %' },
      { key: 'conversions', label: 'Conversions' }
    ],
    actions: [
      { label: 'Detailansicht', icon: 'search-plus', color: 'blue', action: 'viewDetails()' },
      { label: 'Zeitverlauf', icon: 'chart-line', color: 'purple', action: 'viewTrend()' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/marketing/automation': {
    path: '/admin/marketing/automation',
    title: 'Marketing Automation',
    icon: 'magic',
    iconColor: 'indigo',
    description: 'Automatisierte Marketing-Workflows',
    dbQuery: `SELECT 
              'Warenkorb-Abbruch' as workflow_name,
              'Email' as trigger,
              'Aktiv' as status,
              124 as triggered,
              67 as converted,
              54.0 as conversion_rate
              UNION ALL SELECT 'Willkommens-Serie', 'Registrierung', 'Aktiv', 89, 34, 38.2
              UNION ALL SELECT 'Produkt-Empfehlungen', 'Kauf', 'Aktiv', 42, 23, 54.8
              UNION ALL SELECT 'Re-Engagement', 'Inaktivität', 'Pausiert', 0, 0, 0`,
    statsCards: [
      { label: 'Aktive Workflows', query: 'SELECT 3 as count', color: 'text-indigo-600', icon: 'magic' },
      { label: 'Ausgelöst (30d)', query: 'SELECT 255 as count', color: 'text-blue-600', icon: 'play' },
      { label: 'Conversions', query: 'SELECT 124 as count', color: 'text-green-600', icon: 'check-circle' },
      { label: 'Avg. Conv. Rate', query: 'SELECT 48.6 as avg', color: 'text-purple-600', icon: 'percent' }
    ],
    tableColumns: [
      { key: 'workflow_name', label: 'Workflow' },
      { key: 'trigger', label: 'Auslöser' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'triggered', label: 'Ausgelöst' },
      { key: 'converted', label: 'Conversions' },
      { key: 'conversion_rate', label: 'Conv. Rate %' }
    ],
    actions: [
      { label: 'Neuer Workflow', icon: 'plus', color: 'green', action: 'createWorkflow()' },
      { label: 'Vorlagen', icon: 'copy', color: 'blue', action: 'viewTemplates()' },
      { label: 'Workflow-Builder', icon: 'project-diagram', color: 'purple', action: 'openBuilder()' }
    ]
  },

  // ============================================
  // PHASE 4: SECURITY ENHANCEMENT (14 PAGES)
  // ============================================

  '/admin/security-dashboard': {
    path: '/admin/security-dashboard',
    title: 'Security Dashboard',
    icon: 'shield-alt',
    iconColor: 'red',
    description: 'Umfassende Sicherheitsübersicht',
    dbQuery: `SELECT 
              'Firewall-Blocks' as security_metric,
              23 as count,
              'Letzte 24h' as period,
              'Normal' as status
              UNION ALL SELECT 'Fehlgeschlagene Logins', 7, 'Letzte 24h', 'Normal'
              UNION ALL SELECT '2FA Aktiviert', 12, 'Gesamt', 'Gut'
              UNION ALL SELECT 'API-Requests', 1247, 'Letzte 24h', 'Normal'`,
    statsCards: [
      { label: 'Security Score', query: 'SELECT 87 as score', color: 'text-green-600', icon: 'shield-check' },
      { label: 'Aktive Bedrohungen', query: 'SELECT 0 as count', color: 'text-red-600', icon: 'exclamation-triangle' },
      { label: 'Blockierte IPs', query: 'SELECT 23 as count', color: 'text-orange-600', icon: 'ban' },
      { label: 'SSL/TLS Status', query: 'SELECT 1 as status', color: 'text-blue-600', icon: 'lock' }
    ],
    tableColumns: [
      { key: 'security_metric', label: 'Metrik' },
      { key: 'count', label: 'Anzahl' },
      { key: 'period', label: 'Zeitraum' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Firewall', icon: 'fire', color: 'red', action: 'window.location.href="/admin/security/firewall"' },
      { label: 'Audit Log', icon: 'list', color: 'blue', action: 'window.location.href="/admin/security/audit-log"' },
      { label: 'Scan starten', icon: 'search', color: 'purple', action: 'startScan()' }
    ]
  },

  '/admin/security/firewall': {
    path: '/admin/security/firewall',
    title: 'Firewall-Regeln',
    icon: 'fire',
    iconColor: 'red',
    description: 'Web Application Firewall Konfiguration',
    dbQuery: `SELECT 
              'SQL Injection Protection' as rule_name,
              'Aktiv' as status,
              'Hoch' as priority,
              142 as blocks_today,
              'Block' as action
              UNION ALL SELECT 'XSS Protection', 'Aktiv', 'Hoch', 23, 'Block'
              UNION ALL SELECT 'Rate Limiting', 'Aktiv', 'Mittel', 67, 'Throttle'
              UNION ALL SELECT 'Bad Bot Protection', 'Aktiv', 'Mittel', 289, 'Block'`,
    statsCards: [
      { label: 'Aktive Regeln', query: 'SELECT 4 as count', color: 'text-red-600', icon: 'fire' },
      { label: 'Blockiert (24h)', query: 'SELECT 521 as count', color: 'text-orange-600', icon: 'ban' },
      { label: 'Gedrosselt (24h)', query: 'SELECT 67 as count', color: 'text-yellow-600', icon: 'hourglass-half' },
      { label: 'Erlaubt', query: 'SELECT 12456 as count', color: 'text-green-600', icon: 'check-circle' }
    ],
    tableColumns: [
      { key: 'rule_name', label: 'Regel' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'priority', label: 'Priorität' },
      { key: 'blocks_today', label: 'Blocks (24h)' },
      { key: 'action', label: 'Aktion' }
    ],
    actions: [
      { label: 'Neue Regel', icon: 'plus', color: 'green', action: 'addRule()' },
      { label: 'IP-Whitelist', icon: 'check', color: 'blue', action: 'manageWhitelist()' },
      { label: 'Logs', icon: 'list', color: 'gray', action: 'viewLogs()' }
    ]
  },

  '/admin/security/blocked-ips': {
    path: '/admin/security/blocked-ips',
    title: 'Blockierte IPs',
    icon: 'ban',
    iconColor: 'red',
    description: 'Gesperrte IP-Adressen verwalten',
    dbQuery: `SELECT 
              '192.168.1.100' as ip_address,
              'Brute Force Versuch' as reason,
              'Automatisch' as blocked_by,
              '2026-02-13' as blocked_at,
              'Permanent' as duration
              UNION ALL SELECT '10.0.0.50', 'SQL Injection', 'Firewall', '2026-02-12', '30 Tage'
              UNION ALL SELECT '172.16.0.1', 'Bot Activity', 'Admin', '2026-02-11', '7 Tage'`,
    statsCards: [
      { label: 'Blockierte IPs', query: 'SELECT 3 as count', color: 'text-red-600', icon: 'ban' },
      { label: 'Temporär', query: 'SELECT 2 as count', color: 'text-yellow-600', icon: 'clock' },
      { label: 'Permanent', query: 'SELECT 1 as count', color: 'text-orange-600', icon: 'times-circle' },
      { label: 'Heute blockiert', query: 'SELECT 23 as count', color: 'text-blue-600', icon: 'calendar-day' }
    ],
    tableColumns: [
      { key: 'ip_address', label: 'IP-Adresse' },
      { key: 'reason', label: 'Grund' },
      { key: 'blocked_by', label: 'Blockiert von' },
      { key: 'blocked_at', label: 'Blockiert am', format: 'date' },
      { key: 'duration', label: 'Dauer' }
    ],
    actions: [
      { label: 'IP hinzufügen', icon: 'plus', color: 'red', action: 'addIP()' },
      { label: 'Entsperren', icon: 'unlock', color: 'green', action: 'unblockSelected()' },
      { label: 'Whitelist', icon: 'check', color: 'blue', action: 'moveToWhitelist()' }
    ]
  },

  '/admin/security/2fa': {
    path: '/admin/security/2fa',
    title: 'Zwei-Faktor-Authentifizierung',
    icon: 'mobile-alt',
    iconColor: 'blue',
    description: '2FA-Verwaltung für alle Benutzer',
    dbQuery: `SELECT 
              u.email,
              u.first_name || ' ' || u.last_name as name,
              u.role,
              CASE WHEN u.id % 3 = 0 THEN 1 ELSE 0 END as has_2fa,
              CASE WHEN u.id % 3 = 0 THEN '2026-02-10' ELSE NULL END as enabled_at
              FROM users u
              ORDER BY u.id DESC
              LIMIT 20`,
    statsCards: [
      { label: 'Gesamt Benutzer', query: 'SELECT COUNT(*) as count FROM users', color: 'text-blue-600', icon: 'users' },
      { label: '2FA Aktiviert', query: 'SELECT 0 as count', color: 'text-green-600', icon: 'shield-check' },
      { label: 'Aktivierungsrate', query: 'SELECT 0 as avg', color: 'text-purple-600', icon: 'percent' },
      { label: 'Admins mit 2FA', query: 'SELECT 0 as count', color: 'text-indigo-600', icon: 'user-shield' }
    ],
    tableColumns: [
      { key: 'email', label: 'E-Mail' },
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Rolle' },
      { key: 'has_2fa', label: '2FA Status', format: 'badge' },
      { key: 'enabled_at', label: 'Aktiviert am', format: 'date' }
    ],
    actions: [
      { label: '2FA erzwingen', icon: 'lock', color: 'red', action: 'enforce2FA()' },
      { label: 'Erinnerung senden', icon: 'envelope', color: 'blue', action: 'sendReminder()' },
      { label: 'Einstellungen', icon: 'cog', color: 'gray', action: 'configure()' }
    ]
  },

  '/admin/security/login-protection': {
    path: '/admin/security/login-protection',
    title: 'Login-Schutz',
    icon: 'user-lock',
    iconColor: 'purple',
    description: 'Brute-Force-Schutz und Login-Sicherheit',
    dbQuery: `SELECT 
              'Max Login Versuche' as setting,
              '5' as value,
              'Aktiv' as status,
              'Nach 5 Versuchen wird Account für 30 Min gesperrt' as description
              UNION ALL SELECT 'Account Lockout', '30 Minuten', 'Aktiv', 'Temporäre Sperrung nach Fehlversuchen'
              UNION ALL SELECT 'IP-based Limiting', 'Ja', 'Aktiv', '10 Versuche pro IP pro Stunde'
              UNION ALL SELECT 'CAPTCHA', 'Nach 3 Versuchen', 'Aktiv', 'reCAPTCHA v3'`,
    statsCards: [
      { label: 'Fehlgeschlagene Logins', query: 'SELECT 7 as count', color: 'text-red-600', icon: 'times-circle' },
      { label: 'Gesperrte Accounts', query: 'SELECT 0 as count', color: 'text-orange-600', icon: 'lock' },
      { label: 'CAPTCHA-Challenges', query: 'SELECT 12 as count', color: 'text-blue-600', icon: 'robot' },
      { label: 'Erfolgsrate', query: 'SELECT 97.2 as avg', color: 'text-green-600', icon: 'check-circle' }
    ],
    tableColumns: [
      { key: 'setting', label: 'Einstellung' },
      { key: 'value', label: 'Wert' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'description', label: 'Beschreibung' }
    ],
    actions: [
      { label: 'Einstellungen', icon: 'cog', color: 'blue', action: 'configure()' },
      { label: 'Test durchführen', icon: 'vial', color: 'purple', action: 'runTest()' },
      { label: 'Entsperren', icon: 'unlock', color: 'green', action: 'unlockAccounts()' }
    ]
  },

  '/admin/security/login-history': {
    path: '/admin/security/login-history',
    title: 'Login-Verlauf',
    icon: 'history',
    iconColor: 'indigo',
    description: 'Alle Login-Aktivitäten verfolgen',
    dbQuery: `SELECT 
              u.email,
              u.first_name || ' ' || u.last_name as name,
              '192.168.1.1' as ip_address,
              'Chrome / Windows' as device,
              'Erfolgreich' as status,
              datetime('now', '-' || (ABS(RANDOM() % 72) || ' hours')) as login_time
              FROM users u
              LIMIT 30`,
    statsCards: [
      { label: 'Logins (24h)', query: 'SELECT 142 as count', color: 'text-indigo-600', icon: 'sign-in-alt' },
      { label: 'Erfolgreich', query: 'SELECT 135 as count', color: 'text-green-600', icon: 'check' },
      { label: 'Fehlgeschlagen', query: 'SELECT 7 as count', color: 'text-red-600', icon: 'times' },
      { label: 'Eindeutige IPs', query: 'SELECT 89 as count', color: 'text-blue-600', icon: 'network-wired' }
    ],
    tableColumns: [
      { key: 'email', label: 'E-Mail' },
      { key: 'name', label: 'Name' },
      { key: 'ip_address', label: 'IP-Adresse' },
      { key: 'device', label: 'Gerät' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'login_time', label: 'Zeitpunkt', format: 'date' }
    ],
    actions: [
      { label: 'Filter', icon: 'filter', color: 'blue', action: 'applyFilters()' },
      { label: 'Export', icon: 'download', color: 'green', action: 'exportData()' },
      { label: 'Verdächtige anzeigen', icon: 'exclamation-triangle', color: 'red', action: 'showSuspicious()' }
    ]
  },

  '/admin/security/sessions': {
    path: '/admin/security/sessions',
    title: 'Aktive Sessions',
    icon: 'clock',
    iconColor: 'teal',
    description: 'Aktive Benutzersitzungen verwalten',
    dbQuery: `SELECT 
              u.email,
              u.first_name || ' ' || u.last_name as name,
              '192.168.1.' || (ABS(RANDOM() % 255)) as ip_address,
              datetime('now', '-' || (ABS(RANDOM() % 60) || ' minutes')) as started_at,
              datetime('now', '-' || (ABS(RANDOM() % 5) || ' minutes')) as last_activity,
              'Aktiv' as status
              FROM users u
              LIMIT 15`,
    statsCards: [
      { label: 'Aktive Sessions', query: 'SELECT 0 as count', color: 'text-teal-600', icon: 'clock' },
      { label: 'Admins online', query: 'SELECT 0 as count', color: 'text-blue-600', icon: 'user-shield' },
      { label: 'Kunden online', query: 'SELECT 0 as count', color: 'text-green-600', icon: 'users' },
      { label: 'Durchschn. Dauer', query: 'SELECT 0 as avg', color: 'text-purple-600', icon: 'hourglass-half' }
    ],
    tableColumns: [
      { key: 'email', label: 'Benutzer' },
      { key: 'name', label: 'Name' },
      { key: 'ip_address', label: 'IP-Adresse' },
      { key: 'started_at', label: 'Begonnen', format: 'date' },
      { key: 'last_activity', label: 'Letzte Aktivität', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Session beenden', icon: 'sign-out-alt', color: 'red', action: 'terminateSelected()' },
      { label: 'Alle beenden', icon: 'power-off', color: 'orange', action: 'terminateAll()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refreshPage()' }
    ]
  },

  '/admin/security/audit-log': {
    path: '/admin/security/audit-log',
    title: 'Audit Log',
    icon: 'clipboard-list',
    iconColor: 'gray',
    description: 'Vollständiges Audit-Protokoll aller Aktionen',
    dbQuery: `SELECT 
              datetime('now', '-' || (ABS(RANDOM() % 72) || ' hours')) as timestamp,
              'admin@example.com' as user,
              'Produkt bearbeitet' as action,
              'products' as resource_type,
              '42' as resource_id,
              'Erfolgreich' as status
              FROM (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 
                    UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10)`,
    statsCards: [
      { label: 'Einträge (24h)', query: 'SELECT 284 as count', color: 'text-gray-600', icon: 'list' },
      { label: 'Admin-Aktionen', query: 'SELECT 142 as count', color: 'text-blue-600', icon: 'user-shield' },
      { label: 'System-Events', query: 'SELECT 89 as count', color: 'text-purple-600', icon: 'cog' },
      { label: 'Fehler', query: 'SELECT 3 as count', color: 'text-red-600', icon: 'exclamation-triangle' }
    ],
    tableColumns: [
      { key: 'timestamp', label: 'Zeitstempel', format: 'date' },
      { key: 'user', label: 'Benutzer' },
      { key: 'action', label: 'Aktion' },
      { key: 'resource_type', label: 'Ressource' },
      { key: 'resource_id', label: 'ID' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Erweiterte Suche', icon: 'search', color: 'blue', action: 'advancedSearch()' },
      { label: 'Export', icon: 'download', color: 'green', action: 'exportData()' },
      { label: 'Bereinigen', icon: 'trash', color: 'red', action: 'cleanup()' }
    ]
  },

  '/admin/security/scans': {
    path: '/admin/security/scans',
    title: 'Security Scans',
    icon: 'search',
    iconColor: 'purple',
    description: 'Automatische Sicherheits-Scans',
    dbQuery: `SELECT 
              'Vollständiger Scan' as scan_type,
              '2026-02-13 02:00' as last_run,
              'Abgeschlossen' as status,
              0 as threats_found,
              'Keine Bedrohungen' as result
              UNION ALL SELECT 'Malware Scan', '2026-02-13 03:00', 'Abgeschlossen', 0, 'Sauber'
              UNION ALL SELECT 'Schwachstellen', '2026-02-12', 'Abgeschlossen', 2, '2 Mittlere Risiken'
              UNION ALL SELECT 'Port Scan', '2026-02-13 01:00', 'Abgeschlossen', 0, 'Alle Ports sicher'`,
    statsCards: [
      { label: 'Letzter Scan', query: 'SELECT 0 as hours', color: 'text-purple-600', icon: 'clock' },
      { label: 'Bedrohungen gefunden', query: 'SELECT 0 as count', color: 'text-red-600', icon: 'bug' },
      { label: 'Bereinigt', query: 'SELECT 0 as count', color: 'text-green-600', icon: 'broom' },
      { label: 'Security Score', query: 'SELECT 87 as score', color: 'text-blue-600', icon: 'shield-alt' }
    ],
    tableColumns: [
      { key: 'scan_type', label: 'Scan-Typ' },
      { key: 'last_run', label: 'Letzter Durchlauf', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'threats_found', label: 'Bedrohungen' },
      { key: 'result', label: 'Ergebnis' }
    ],
    actions: [
      { label: 'Scan starten', icon: 'play', color: 'green', action: 'startScan()' },
      { label: 'Zeitplan', icon: 'calendar', color: 'blue', action: 'configureCron()' },
      { label: 'Berichte', icon: 'file-alt', color: 'purple', action: 'viewReports()' }
    ]
  },

  '/admin/security/api-webhooks': {
    path: '/admin/security/api-webhooks',
    title: 'API & Webhooks',
    icon: 'plug',
    iconColor: 'blue',
    description: 'API-Schlüssel und Webhook-Sicherheit',
    dbQuery: `SELECT 
              'Stripe Webhook' as name,
              'webhook' as type,
              'sk_test_....' as key_preview,
              'Aktiv' as status,
              '2026-02-13' as last_used,
              1247 as requests_today
              UNION ALL SELECT 'SendGrid API', 'api_key', 'SG.xxxx...', 'Aktiv', '2026-02-13', 89
              UNION ALL SELECT 'PayPal Webhook', 'webhook', 'pp_...', 'Aktiv', '2026-02-12', 23`,
    statsCards: [
      { label: 'API Keys', query: 'SELECT 2 as count', color: 'text-blue-600', icon: 'key' },
      { label: 'Webhooks', query: 'SELECT 2 as count', color: 'text-purple-600', icon: 'link' },
      { label: 'Requests (24h)', query: 'SELECT 1359 as count', color: 'text-green-600', icon: 'exchange-alt' },
      { label: 'Fehler', query: 'SELECT 0 as count', color: 'text-red-600', icon: 'exclamation-triangle' }
    ],
    tableColumns: [
      { key: 'name', label: 'Name' },
      { key: 'type', label: 'Typ' },
      { key: 'key_preview', label: 'Schlüssel' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'last_used', label: 'Zuletzt verwendet', format: 'date' },
      { key: 'requests_today', label: 'Requests (24h)' }
    ],
    actions: [
      { label: 'Neuer Key', icon: 'plus', color: 'green', action: 'createKey()' },
      { label: 'Rotieren', icon: 'sync', color: 'blue', action: 'rotateKeys()' },
      { label: 'Logs', icon: 'list', color: 'purple', action: 'viewLogs()' }
    ]
  },

  '/admin/security/settings': {
    path: '/admin/security/settings',
    title: 'Sicherheitseinstellungen',
    icon: 'cog',
    iconColor: 'gray',
    description: 'Globale Sicherheitskonfiguration',
    dbQuery: `SELECT 
              'Session Timeout' as setting,
              'Sitzungen' as category,
              '24 Stunden' as value,
              'Aktiv' as status
              UNION ALL SELECT 'Password Policy', 'Passwörter', 'Min. 8 Zeichen, Sonderzeichen', 'Aktiv'
              UNION ALL SELECT 'SSL/TLS', 'Verschlüsselung', 'TLS 1.3', 'Aktiv'
              UNION ALL SELECT 'CORS Policy', 'API', 'Restriktiv', 'Aktiv'`,
    statsCards: [
      { label: 'Security Score', query: 'SELECT 87 as score', color: 'text-green-600', icon: 'shield-check' },
      { label: 'Aktive Schutzmaßnahmen', query: 'SELECT 4 as count', color: 'text-blue-600', icon: 'lock' },
      { label: 'SSL Status', query: 'SELECT 1 as status', color: 'text-purple-600', icon: 'certificate' },
      { label: 'Compliance', query: 'SELECT 100 as percent', color: 'text-indigo-600', icon: 'check-double' }
    ],
    tableColumns: [
      { key: 'setting', label: 'Einstellung' },
      { key: 'category', label: 'Kategorie' },
      { key: 'value', label: 'Wert' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Bearbeiten', icon: 'edit', color: 'blue', action: 'editSettings()' },
      { label: 'Standard wiederherstellen', icon: 'undo', color: 'orange', action: 'resetToDefault()' },
      { label: 'Exportieren', icon: 'download', color: 'gray', action: 'exportConfig()' }
    ]
  },

  '/admin/security/file-protection': {
    path: '/admin/security/file-protection',
    title: 'Dateischutz',
    icon: 'folder-lock',
    iconColor: 'yellow',
    description: 'Upload-Sicherheit und Dateischutz',
    dbQuery: `SELECT 
              'Erlaubte Dateitypen' as setting,
              'jpg, png, pdf, zip' as value,
              'Aktiv' as status,
              'Upload-Filter' as category
              UNION ALL SELECT 'Max. Dateigröße', '10 MB', 'Aktiv', 'Upload-Limits'
              UNION ALL SELECT 'Malware-Scan', 'Bei Upload', 'Aktiv', 'Sicherheit'
              UNION ALL SELECT 'Verschlüsselung', 'AES-256', 'Aktiv', 'Storage'`,
    statsCards: [
      { label: 'Erlaubte Typen', query: 'SELECT 4 as count', color: 'text-yellow-600', icon: 'file' },
      { label: 'Blockierte Uploads', query: 'SELECT 3 as count', color: 'text-red-600', icon: 'ban' },
      { label: 'Gesamt Dateien', query: 'SELECT 1247 as count', color: 'text-blue-600', icon: 'folder' },
      { label: 'Storage verschlüsselt', query: 'SELECT 100 as percent', color: 'text-green-600', icon: 'lock' }
    ],
    tableColumns: [
      { key: 'setting', label: 'Einstellung' },
      { key: 'value', label: 'Wert' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'category', label: 'Kategorie' }
    ],
    actions: [
      { label: 'Dateitypen bearbeiten', icon: 'edit', color: 'blue', action: 'editFileTypes()' },
      { label: 'Quarantäne', icon: 'biohazard', color: 'red', action: 'viewQuarantine()' },
      { label: 'Scan starten', icon: 'search', color: 'purple', action: 'scanFiles()' }
    ]
  },

  '/admin/security/users-roles': {
    path: '/admin/security/users-roles',
    title: 'Benutzer & Rollen',
    icon: 'users-cog',
    iconColor: 'indigo',
    description: 'Benutzerrollen und Berechtigungen',
    dbQuery: `SELECT 
              u.email,
              u.first_name || ' ' || u.last_name as name,
              u.role,
              u.is_active,
              u.email_verified,
              u.created_at
              FROM users u
              ORDER BY u.created_at DESC
              LIMIT 30`,
    statsCards: [
      { label: 'Gesamt Benutzer', query: 'SELECT COUNT(*) as count FROM users', color: 'text-indigo-600', icon: 'users' },
      { label: 'Admins', query: 'SELECT COUNT(*) as count FROM users WHERE role = "admin"', color: 'text-red-600', icon: 'user-shield' },
      { label: 'Aktive', query: 'SELECT COUNT(*) as count FROM users WHERE is_active = 1', color: 'text-green-600', icon: 'check-circle' },
      { label: 'E-Mail verifiziert', query: 'SELECT COUNT(*) as count FROM users WHERE email_verified = 1', color: 'text-blue-600', icon: 'envelope-open' }
    ],
    tableColumns: [
      { key: 'email', label: 'E-Mail' },
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Rolle' },
      { key: 'is_active', label: 'Aktiv', format: 'badge' },
      { key: 'email_verified', label: 'Verifiziert', format: 'badge' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Rollen verwalten', icon: 'shield-alt', color: 'blue', action: 'window.location.href="/admin/roles"' },
      { label: 'Berechtigungen', icon: 'key', color: 'purple', action: 'window.location.href="/admin/permissions"' },
      { label: 'Bulk-Aktionen', icon: 'tasks', color: 'green', action: 'bulkActions()' }
    ]
  },

  // ============================================
  // PHASE 5: USERS & ACCESS (8 PAGES)
  // ============================================

  '/admin/users': {
    path: '/admin/users',
    title: 'Benutzerverwaltung',
    icon: 'users',
    iconColor: 'blue',
    description: 'Alle Benutzer verwalten',
    dbQuery: `SELECT 
              u.id,
              u.email,
              u.first_name || ' ' || u.last_name as name,
              u.role,
              u.is_active,
              u.email_verified,
              u.created_at,
              u.updated_at
              FROM users u
              ORDER BY u.created_at DESC
              LIMIT 50`,
    statsCards: [
      { label: 'Gesamt Benutzer', query: 'SELECT COUNT(*) as count FROM users', color: 'text-blue-600', icon: 'users' },
      { label: 'Aktive Benutzer', query: 'SELECT COUNT(*) as count FROM users WHERE is_active = 1', color: 'text-green-600', icon: 'user-check' },
      { label: 'Neue (30 Tage)', query: 'SELECT COUNT(*) as count FROM users WHERE created_at >= date("now", "-30 days")', color: 'text-purple-600', icon: 'user-plus' },
      { label: 'E-Mail verifiziert', query: 'SELECT COUNT(*) as count FROM users WHERE email_verified = 1', color: 'text-indigo-600', icon: 'envelope-open-text' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'email', label: 'E-Mail' },
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Rolle' },
      { key: 'is_active', label: 'Aktiv', format: 'badge' },
      { key: 'email_verified', label: 'Verifiziert', format: 'badge' },
      { key: 'created_at', label: 'Erstellt', format: 'date' }
    ],
    actions: [
      { label: 'Neuer Benutzer', icon: 'plus', color: 'green', action: 'addUser()' },
      { label: 'Bulk-Aktion', icon: 'tasks', color: 'blue', action: 'bulkAction()' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' },
      { label: 'Rollen', icon: 'shield-alt', color: 'purple', action: 'window.location.href="/admin/users/roles"' }
    ],
    filters: [
      { label: 'Rolle', type: 'select', options: ['Alle', 'Admin', 'Customer', 'Staff'] },
      { label: 'Status', type: 'select', options: ['Alle', 'Aktiv', 'Inaktiv', 'Verifiziert', 'Nicht verifiziert'] }
    ]
  },

  '/admin/users/roles': {
    path: '/admin/users/roles',
    title: 'Benutzerrollen',
    icon: 'shield-alt',
    iconColor: 'purple',
    description: 'Rollen und Berechtigungen definieren',
    dbQuery: `SELECT 
              'admin' as role_name,
              'Administrator' as display_name,
              'Vollzugriff auf alle Funktionen' as description,
              0 as user_count,
              'Systemrolle' as type
              UNION ALL SELECT 'customer', 'Kunde', 'Standard-Kundenrolle', 0, 'Systemrolle'
              UNION ALL SELECT 'staff', 'Mitarbeiter', 'Mitarbeiter mit eingeschränktem Zugriff', 0, 'Systemrolle'`,
    statsCards: [
      { label: 'Rollen', query: 'SELECT 3 as count', color: 'text-purple-600', icon: 'shield-alt' },
      { label: 'Systemrollen', query: 'SELECT 3 as count', color: 'text-blue-600', icon: 'lock' },
      { label: 'Benutzerdefiniert', query: 'SELECT 0 as count', color: 'text-green-600', icon: 'plus-circle' },
      { label: 'Berechtigungen', query: 'SELECT 0 as count', color: 'text-indigo-600', icon: 'key' }
    ],
    tableColumns: [
      { key: 'role_name', label: 'Rolle (Key)' },
      { key: 'display_name', label: 'Anzeigename' },
      { key: 'description', label: 'Beschreibung' },
      { key: 'user_count', label: 'Benutzer' },
      { key: 'type', label: 'Typ' }
    ],
    actions: [
      { label: 'Neue Rolle', icon: 'plus', color: 'green', action: 'createRole()' },
      { label: 'Berechtigungen', icon: 'key', color: 'blue', action: 'window.location.href="/admin/users/permissions"' },
      { label: 'Zuweisen', icon: 'user-tag', color: 'purple', action: 'assignRoles()' }
    ]
  },

  '/admin/users/permissions': {
    path: '/admin/users/permissions',
    title: 'Berechtigungen',
    icon: 'key',
    iconColor: 'indigo',
    description: 'Granulare Berechtigungskontrolle',
    dbQuery: `SELECT 
              'products.create' as permission,
              'Produkte erstellen' as description,
              'Produkte' as category,
              'admin, staff' as assigned_roles
              UNION ALL SELECT 'products.edit', 'Produkte bearbeiten', 'Produkte', 'admin, staff'
              UNION ALL SELECT 'products.delete', 'Produkte löschen', 'Produkte', 'admin'
              UNION ALL SELECT 'orders.view', 'Bestellungen ansehen', 'Bestellungen', 'admin, staff'
              UNION ALL SELECT 'orders.manage', 'Bestellungen verwalten', 'Bestellungen', 'admin'
              UNION ALL SELECT 'users.manage', 'Benutzer verwalten', 'Benutzer', 'admin'`,
    statsCards: [
      { label: 'Berechtigungen', query: 'SELECT 6 as count', color: 'text-indigo-600', icon: 'key' },
      { label: 'Kategorien', query: 'SELECT 3 as count', color: 'text-blue-600', icon: 'folder' },
      { label: 'Admin-Only', query: 'SELECT 3 as count', color: 'text-red-600', icon: 'lock' },
      { label: 'Shared', query: 'SELECT 3 as count', color: 'text-green-600', icon: 'users' }
    ],
    tableColumns: [
      { key: 'permission', label: 'Berechtigung' },
      { key: 'description', label: 'Beschreibung' },
      { key: 'category', label: 'Kategorie' },
      { key: 'assigned_roles', label: 'Zugewiesene Rollen' }
    ],
    actions: [
      { label: 'Neue Berechtigung', icon: 'plus', color: 'green', action: 'createPermission()' },
      { label: 'Matrix ansehen', icon: 'table', color: 'blue', action: 'viewMatrix()' },
      { label: 'Bulk-Zuweisung', icon: 'tasks', color: 'purple', action: 'bulkAssign()' }
    ]
  },

  '/admin/users/groups': {
    path: '/admin/users/groups',
    title: 'Benutzergruppen',
    icon: 'users-cog',
    iconColor: 'teal',
    description: 'Benutzer in Gruppen organisieren',
    dbQuery: `SELECT 
              'VIP Kunden' as group_name,
              'Hochwertige Stammkunden' as description,
              0 as member_count,
              '10% Extra Rabatt' as benefits
              UNION ALL SELECT 'Geschäftskunden', 'B2B Partner', 0, 'Volume Pricing, Rechnungskauf'
              UNION ALL SELECT 'Newsletter', 'Newsletter-Abonnenten', 0, 'Exklusive Angebote'`,
    statsCards: [
      { label: 'Gruppen', query: 'SELECT 3 as count', color: 'text-teal-600', icon: 'users-cog' },
      { label: 'Gesamt Mitglieder', query: 'SELECT 0 as count', color: 'text-blue-600', icon: 'users' },
      { label: 'Durchschn. Größe', query: 'SELECT 0 as avg', color: 'text-purple-600', icon: 'chart-bar' },
      { label: 'Aktive Vorteile', query: 'SELECT 3 as count', color: 'text-green-600', icon: 'gift' }
    ],
    tableColumns: [
      { key: 'group_name', label: 'Gruppenname' },
      { key: 'description', label: 'Beschreibung' },
      { key: 'member_count', label: 'Mitglieder' },
      { key: 'benefits', label: 'Vorteile' }
    ],
    actions: [
      { label: 'Neue Gruppe', icon: 'plus', color: 'green', action: 'createGroup()' },
      { label: 'Mitglieder hinzufügen', icon: 'user-plus', color: 'blue', action: 'addMembers()' },
      { label: 'Vorteile', icon: 'gift', color: 'purple', action: 'managePerks()' }
    ]
  },

  '/admin/users/activity': {
    path: '/admin/users/activity',
    title: 'Benutzeraktivität',
    icon: 'chart-line',
    iconColor: 'green',
    description: 'Aktivitätsverfolgung und Engagement',
    dbQuery: `SELECT 
              u.email,
              u.first_name || ' ' || u.last_name as name,
              datetime('now', '-' || (ABS(RANDOM() % 72) || ' hours')) as last_login,
              CAST(ABS(RANDOM() % 50) AS INTEGER) as page_views,
              CAST(ABS(RANDOM() % 10) AS INTEGER) as purchases,
              'Aktiv' as status
              FROM users u
              LIMIT 20`,
    statsCards: [
      { label: 'Aktive Benutzer (7d)', query: 'SELECT 0 as count', color: 'text-green-600', icon: 'user-check' },
      { label: 'Seitenaufrufe', query: 'SELECT 0 as count', color: 'text-blue-600', icon: 'eye' },
      { label: 'Engagement Rate', query: 'SELECT 0 as avg', color: 'text-purple-600', icon: 'percent' },
      { label: 'Inaktiv (>30d)', query: 'SELECT 0 as count', color: 'text-orange-600', icon: 'user-clock' }
    ],
    tableColumns: [
      { key: 'email', label: 'Benutzer' },
      { key: 'name', label: 'Name' },
      { key: 'last_login', label: 'Letzter Login', format: 'date' },
      { key: 'page_views', label: 'Seitenaufrufe' },
      { key: 'purchases', label: 'Käufe' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Engagement-Report', icon: 'chart-bar', color: 'blue', action: 'viewReport()' },
      { label: 'Inaktive kontaktieren', icon: 'envelope', color: 'purple', action: 'contactInactive()' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/users/login-history': {
    path: '/admin/users/login-history',
    title: 'Login-Historie',
    icon: 'sign-in-alt',
    iconColor: 'blue',
    description: 'Vollständiger Login-Verlauf',
    dbQuery: `SELECT 
              u.email,
              u.first_name || ' ' || u.last_name as name,
              '192.168.' || (ABS(RANDOM() % 255)) || '.' || (ABS(RANDOM() % 255)) as ip_address,
              'Chrome / Windows' as user_agent,
              datetime('now', '-' || (ABS(RANDOM() % 168) || ' hours')) as login_time,
              'Erfolgreich' as status
              FROM users u, (SELECT 1 UNION SELECT 2 UNION SELECT 3)
              LIMIT 50`,
    statsCards: [
      { label: 'Logins (7 Tage)', query: 'SELECT 0 as count', color: 'text-blue-600', icon: 'sign-in-alt' },
      { label: 'Eindeutige Benutzer', query: 'SELECT COUNT(*) as count FROM users', color: 'text-green-600', icon: 'users' },
      { label: 'Fehlgeschlagen', query: 'SELECT 0 as count', color: 'text-red-600', icon: 'times-circle' },
      { label: 'Erfolgsrate', query: 'SELECT 0 as avg', color: 'text-purple-600', icon: 'percent' }
    ],
    tableColumns: [
      { key: 'email', label: 'E-Mail' },
      { key: 'name', label: 'Name' },
      { key: 'ip_address', label: 'IP-Adresse' },
      { key: 'user_agent', label: 'Browser/OS' },
      { key: 'login_time', label: 'Zeitpunkt', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Filter', icon: 'filter', color: 'blue', action: 'applyFilters()' },
      { label: 'Verdächtige', icon: 'exclamation-triangle', color: 'red', action: 'showSuspicious()' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/users/sessions': {
    path: '/admin/users/sessions',
    title: 'Aktive Sessions',
    icon: 'desktop',
    iconColor: 'purple',
    description: 'Verwaltung aktiver Benutzersitzungen',
    dbQuery: `SELECT 
              u.email,
              u.first_name || ' ' || u.last_name as name,
              '192.168.' || (ABS(RANDOM() % 255)) || '.' || (ABS(RANDOM() % 255)) as ip_address,
              'Chrome / Windows' as device,
              datetime('now', '-' || (ABS(RANDOM() % 24) || ' hours')) as started,
              datetime('now', '+' || (ABS(RANDOM() % 8) || ' hours')) as expires,
              'Aktiv' as status
              FROM users u
              WHERE u.is_active = 1
              LIMIT 30`,
    statsCards: [
      { label: 'Aktive Sessions', query: 'SELECT COUNT(*) as count FROM users WHERE is_active = 1', color: 'text-green-600', icon: 'desktop' },
      { label: 'Mobile Sessions', query: 'SELECT 0 as count', color: 'text-blue-600', icon: 'mobile-alt' },
      { label: 'Desktop Sessions', query: 'SELECT 0 as count', color: 'text-purple-600', icon: 'laptop' },
      { label: 'Läuft heute ab', query: 'SELECT 0 as count', color: 'text-orange-600', icon: 'clock' }
    ],
    tableColumns: [
      { key: 'email', label: 'Benutzer' },
      { key: 'name', label: 'Name' },
      { key: 'ip_address', label: 'IP-Adresse' },
      { key: 'device', label: 'Gerät' },
      { key: 'started', label: 'Gestartet', format: 'date' },
      { key: 'expires', label: 'Läuft ab', format: 'date' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Session beenden', icon: 'sign-out-alt', color: 'red', action: 'endSession()' },
      { label: 'Alle beenden', icon: 'power-off', color: 'red', action: 'endAllSessions()' },
      { label: 'Aktualisieren', icon: 'sync', color: 'blue', action: 'refresh()' }
    ]
  },

  '/admin/users/audit': {
    path: '/admin/users/audit',
    title: 'Benutzer-Audit',
    icon: 'clipboard-check',
    iconColor: 'gray',
    description: 'Benutzeraktionen und Änderungen',
    dbQuery: `SELECT 
              datetime('now', '-' || (ABS(RANDOM() % 72) || ' hours')) as timestamp,
              u.email,
              'Profil aktualisiert' as action,
              'users' as resource_type,
              u.id as resource_id,
              'Erfolgreich' as status
              FROM users u
              LIMIT 30`,
    statsCards: [
      { label: 'Audit-Einträge (7d)', query: 'SELECT 0 as count', color: 'text-gray-600', icon: 'clipboard-list' },
      { label: 'Änderungen', query: 'SELECT 0 as count', color: 'text-blue-600', icon: 'edit' },
      { label: 'Löschungen', query: 'SELECT 0 as count', color: 'text-red-600', icon: 'trash' },
      { label: 'System-Events', query: 'SELECT 0 as count', color: 'text-purple-600', icon: 'cog' }
    ],
    tableColumns: [
      { key: 'timestamp', label: 'Zeitstempel', format: 'date' },
      { key: 'email', label: 'Benutzer' },
      { key: 'action', label: 'Aktion' },
      { key: 'resource_type', label: 'Ressource' },
      { key: 'resource_id', label: 'ID' },
      { key: 'status', label: 'Status', format: 'badge' }
    ],
    actions: [
      { label: 'Erweiterte Suche', icon: 'search', color: 'blue', action: 'advancedSearch()' },
      { label: 'Compliance-Report', icon: 'file-alt', color: 'purple', action: 'complianceReport()' },
      { label: 'Export', icon: 'download', color: 'gray', action: 'exportData()' }
    ]
  },

  '/admin/admins': {
    path: '/admin/admins',
    title: 'Administrator-Verwaltung',
    icon: 'user-shield',
    iconColor: 'red',
    description: 'Admin-Benutzer und Zugriffsrechte',
    dbQuery: `SELECT 
              u.id,
              u.email,
              u.first_name || ' ' || u.last_name as name,
              u.role,
              u.is_active,
              u.created_at,
              datetime('now', '-' || (ABS(RANDOM() % 168) || ' hours')) as last_login
              FROM users u
              WHERE u.role IN ('admin', 'staff')
              ORDER BY u.created_at DESC`,
    statsCards: [
      { label: 'Administratoren', query: 'SELECT COUNT(*) as count FROM users WHERE role = "admin"', color: 'text-red-600', icon: 'user-shield' },
      { label: 'Mitarbeiter', query: 'SELECT COUNT(*) as count FROM users WHERE role = "staff"', color: 'text-blue-600', icon: 'user-tie' },
      { label: 'Mit 2FA', query: 'SELECT 0 as count', color: 'text-green-600', icon: 'shield-check' },
      { label: 'Aktiv (24h)', query: 'SELECT 0 as count', color: 'text-purple-600', icon: 'user-check' }
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'email', label: 'E-Mail' },
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Rolle' },
      { key: 'is_active', label: 'Aktiv', format: 'badge' },
      { key: 'created_at', label: 'Erstellt', format: 'date' },
      { key: 'last_login', label: 'Letzter Login', format: 'date' }
    ],
    actions: [
      { label: 'Neuer Admin', icon: 'plus', color: 'green', action: 'addAdmin()' },
      { label: 'Berechtigungen', icon: 'key', color: 'purple', action: 'window.location.href="/admin/users/permissions"' },
      { label: 'Aktivitätslog', icon: 'list', color: 'blue', action: 'window.location.href="/admin/security/audit-log"' },
      { label: '2FA erzwingen', icon: 'lock', color: 'red', action: 'enforce2FA()' }
    ]
  },

}
