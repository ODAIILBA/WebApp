-- Admin Panel Translations
-- Add comprehensive translation keys for all admin pages

-- Insert admin translation keys for German (de)
INSERT INTO translations (language_code, translation_key, translated_text) VALUES
-- Common UI elements
('de', 'admin.save', 'Speichern'),
('de', 'admin.cancel', 'Abbrechen'),
('de', 'admin.delete', 'Löschen'),
('de', 'admin.edit', 'Bearbeiten'),
('de', 'admin.add', 'Hinzufügen'),
('de', 'admin.create', 'Erstellen'),
('de', 'admin.update', 'Aktualisieren'),
('de', 'admin.search', 'Suchen'),
('de', 'admin.filter', 'Filtern'),
('de', 'admin.export', 'Exportieren'),
('de', 'admin.import', 'Importieren'),
('de', 'admin.refresh', 'Aktualisieren'),
('de', 'admin.close', 'Schließen'),
('de', 'admin.view', 'Ansehen'),
('de', 'admin.configure', 'Konfigurieren'),
('de', 'admin.test', 'Testen'),
('de', 'admin.active', 'Aktiv'),
('de', 'admin.inactive', 'Inaktiv'),
('de', 'admin.status', 'Status'),
('de', 'admin.actions', 'Aktionen'),
('de', 'admin.all', 'Alle'),

-- Dashboard
('de', 'admin.dashboard', 'Dashboard'),
('de', 'admin.overview', 'Übersicht'),
('de', 'admin.statistics', 'Statistiken'),

-- Integrations
('de', 'admin.integrations', 'Integrationen'),
('de', 'admin.integrations.title', 'Integrationen'),
('de', 'admin.integrations.description', 'Verbinden Sie Drittanbieter-Services mit Ihrem Shop'),
('de', 'admin.integrations.active_count', 'Aktive Integrationen'),
('de', 'admin.integrations.payment', 'Zahlungsanbieter'),
('de', 'admin.integrations.email', 'E-Mail Services'),
('de', 'admin.integrations.available', 'Verfügbar'),
('de', 'admin.integrations.configure', 'Konfigurieren'),
('de', 'admin.integrations.api_key', 'API Key'),
('de', 'admin.integrations.api_secret', 'API Secret (optional)'),
('de', 'admin.integrations.webhook_url', 'Webhook URL (optional)'),
('de', 'admin.integrations.additional_config', 'Zusätzliche Konfiguration (JSON, optional)'),
('de', 'admin.integrations.test_connection', 'Verbindung testen'),
('de', 'admin.integrations.configured', 'Konfiguriert'),
('de', 'admin.integrations.not_configured', 'Nicht konfiguriert'),

-- Coupons
('de', 'admin.coupons', 'Gutscheine'),
('de', 'admin.coupons.title', 'Gutscheine verwalten'),
('de', 'admin.coupons.create', 'Gutschein erstellen'),
('de', 'admin.coupons.code', 'Gutschein-Code'),
('de', 'admin.coupons.discount', 'Rabatt'),
('de', 'admin.coupons.type', 'Typ'),
('de', 'admin.coupons.usage', 'Verwendungen'),

-- Reports
('de', 'admin.reports', 'Berichte'),
('de', 'admin.reports.title', 'Verkaufsberichte'),
('de', 'admin.reports.sales', 'Umsatz'),
('de', 'admin.reports.orders', 'Bestellungen'),
('de', 'admin.reports.revenue', 'Einnahmen'),

-- Tracking
('de', 'admin.tracking', 'Sendungsverfolgung'),
('de', 'admin.tracking.title', 'Sendungsverfolgung'),
('de', 'admin.tracking.number', 'Tracking-Nummer'),
('de', 'admin.tracking.carrier', 'Versanddienstleister'),

-- Shipping
('de', 'admin.shipping', 'Versandmethoden'),
('de', 'admin.shipping.title', 'Versandmethoden'),
('de', 'admin.shipping.methods', 'Versandmethoden'),

-- Tax
('de', 'admin.tax', 'Steuern'),
('de', 'admin.tax.title', 'Steuereinstellungen'),
('de', 'admin.tax.rates', 'Steuersätze'),

-- Analytics
('de', 'admin.analytics', 'Analytics'),
('de', 'admin.analytics.behavior', 'Nutzerverhalten'),
('de', 'admin.analytics.conversion', 'Conversion'),
('de', 'admin.analytics.devices', 'Geräte'),
('de', 'admin.analytics.traffic', 'Traffic-Quellen'),

-- Email Marketing
('de', 'admin.email', 'E-Mail Marketing'),
('de', 'admin.email.campaigns', 'Kampagnen'),

-- FAQ
('de', 'admin.faq', 'FAQ'),
('de', 'admin.faq.title', 'FAQ Verwaltung'),

-- Invoices
('de', 'admin.invoices', 'Rechnungen'),
('de', 'admin.invoices.title', 'Rechnungen'),

-- Import/Export
('de', 'admin.import_export', 'Import/Export'),
('de', 'admin.import_export.title', 'Daten Import/Export');

-- Insert admin translations for English (en)
INSERT INTO translations (language_code, translation_key, translated_text) VALUES
-- Common UI elements
('en', 'admin.save', 'Save'),
('en', 'admin.cancel', 'Cancel'),
('en', 'admin.delete', 'Delete'),
('en', 'admin.edit', 'Edit'),
('en', 'admin.add', 'Add'),
('en', 'admin.create', 'Create'),
('en', 'admin.update', 'Update'),
('en', 'admin.search', 'Search'),
('en', 'admin.filter', 'Filter'),
('en', 'admin.export', 'Export'),
('en', 'admin.import', 'Import'),
('en', 'admin.refresh', 'Refresh'),
('en', 'admin.close', 'Close'),
('en', 'admin.view', 'View'),
('en', 'admin.configure', 'Configure'),
('en', 'admin.test', 'Test'),
('en', 'admin.active', 'Active'),
('en', 'admin.inactive', 'Inactive'),
('en', 'admin.status', 'Status'),
('en', 'admin.actions', 'Actions'),
('en', 'admin.all', 'All'),

-- Dashboard
('en', 'admin.dashboard', 'Dashboard'),
('en', 'admin.overview', 'Overview'),
('en', 'admin.statistics', 'Statistics'),

-- Integrations
('en', 'admin.integrations', 'Integrations'),
('en', 'admin.integrations.title', 'Integrations'),
('en', 'admin.integrations.description', 'Connect third-party services to your shop'),
('en', 'admin.integrations.active_count', 'Active Integrations'),
('en', 'admin.integrations.payment', 'Payment Providers'),
('en', 'admin.integrations.email', 'Email Services'),
('en', 'admin.integrations.available', 'Available'),
('en', 'admin.integrations.configure', 'Configure'),
('en', 'admin.integrations.api_key', 'API Key'),
('en', 'admin.integrations.api_secret', 'API Secret (optional)'),
('en', 'admin.integrations.webhook_url', 'Webhook URL (optional)'),
('en', 'admin.integrations.additional_config', 'Additional Configuration (JSON, optional)'),
('en', 'admin.integrations.test_connection', 'Test Connection'),
('en', 'admin.integrations.configured', 'Configured'),
('en', 'admin.integrations.not_configured', 'Not Configured'),

-- Coupons
('en', 'admin.coupons', 'Coupons'),
('en', 'admin.coupons.title', 'Manage Coupons'),
('en', 'admin.coupons.create', 'Create Coupon'),
('en', 'admin.coupons.code', 'Coupon Code'),
('en', 'admin.coupons.discount', 'Discount'),
('en', 'admin.coupons.type', 'Type'),
('en', 'admin.coupons.usage', 'Usage'),

-- Reports
('en', 'admin.reports', 'Reports'),
('en', 'admin.reports.title', 'Sales Reports'),
('en', 'admin.reports.sales', 'Sales'),
('en', 'admin.reports.orders', 'Orders'),
('en', 'admin.reports.revenue', 'Revenue'),

-- Tracking
('en', 'admin.tracking', 'Tracking'),
('en', 'admin.tracking.title', 'Shipment Tracking'),
('en', 'admin.tracking.number', 'Tracking Number'),
('en', 'admin.tracking.carrier', 'Carrier'),

-- Shipping
('en', 'admin.shipping', 'Shipping'),
('en', 'admin.shipping.title', 'Shipping Methods'),
('en', 'admin.shipping.methods', 'Shipping Methods'),

-- Tax
('en', 'admin.tax', 'Tax'),
('en', 'admin.tax.title', 'Tax Settings'),
('en', 'admin.tax.rates', 'Tax Rates'),

-- Analytics
('en', 'admin.analytics', 'Analytics'),
('en', 'admin.analytics.behavior', 'User Behavior'),
('en', 'admin.analytics.conversion', 'Conversion'),
('en', 'admin.analytics.devices', 'Devices'),
('en', 'admin.analytics.traffic', 'Traffic Sources'),

-- Email Marketing
('en', 'admin.email', 'Email Marketing'),
('en', 'admin.email.campaigns', 'Campaigns'),

-- FAQ
('en', 'admin.faq', 'FAQ'),
('en', 'admin.faq.title', 'FAQ Management'),

-- Invoices
('en', 'admin.invoices', 'Invoices'),
('en', 'admin.invoices.title', 'Invoices'),

-- Import/Export
('en', 'admin.import_export', 'Import/Export'),
('en', 'admin.import_export.title', 'Data Import/Export');

-- Insert admin translations for French (fr)
INSERT INTO translations (language_code, translation_key, translated_text) VALUES
-- Common UI elements
('fr', 'admin.save', 'Enregistrer'),
('fr', 'admin.cancel', 'Annuler'),
('fr', 'admin.delete', 'Supprimer'),
('fr', 'admin.edit', 'Modifier'),
('fr', 'admin.add', 'Ajouter'),
('fr', 'admin.create', 'Créer'),
('fr', 'admin.update', 'Mettre à jour'),
('fr', 'admin.search', 'Rechercher'),
('fr', 'admin.filter', 'Filtrer'),
('fr', 'admin.export', 'Exporter'),
('fr', 'admin.import', 'Importer'),
('fr', 'admin.refresh', 'Actualiser'),
('fr', 'admin.close', 'Fermer'),
('fr', 'admin.view', 'Voir'),
('fr', 'admin.configure', 'Configurer'),
('fr', 'admin.test', 'Tester'),
('fr', 'admin.active', 'Actif'),
('fr', 'admin.inactive', 'Inactif'),
('fr', 'admin.status', 'Statut'),
('fr', 'admin.actions', 'Actions'),
('fr', 'admin.all', 'Tous'),

-- Dashboard
('fr', 'admin.dashboard', 'Tableau de bord'),
('fr', 'admin.overview', 'Aperçu'),
('fr', 'admin.statistics', 'Statistiques'),

-- Integrations
('fr', 'admin.integrations', 'Intégrations'),
('fr', 'admin.integrations.title', 'Intégrations'),
('fr', 'admin.integrations.description', 'Connectez des services tiers à votre boutique'),
('fr', 'admin.integrations.active_count', 'Intégrations actives'),
('fr', 'admin.integrations.payment', 'Fournisseurs de paiement'),
('fr', 'admin.integrations.email', 'Services Email'),
('fr', 'admin.integrations.available', 'Disponible'),
('fr', 'admin.integrations.configure', 'Configurer'),
('fr', 'admin.integrations.api_key', 'Clé API'),
('fr', 'admin.integrations.api_secret', 'Secret API (optionnel)'),
('fr', 'admin.integrations.webhook_url', 'URL Webhook (optionnel)'),
('fr', 'admin.integrations.additional_config', 'Configuration supplémentaire (JSON, optionnel)'),
('fr', 'admin.integrations.test_connection', 'Tester la connexion'),
('fr', 'admin.integrations.configured', 'Configuré'),
('fr', 'admin.integrations.not_configured', 'Non configuré'),

-- Coupons
('fr', 'admin.coupons', 'Coupons'),
('fr', 'admin.coupons.title', 'Gérer les coupons'),
('fr', 'admin.coupons.create', 'Créer un coupon'),
('fr', 'admin.coupons.code', 'Code coupon'),
('fr', 'admin.coupons.discount', 'Réduction'),
('fr', 'admin.coupons.type', 'Type'),
('fr', 'admin.coupons.usage', 'Utilisation'),

-- Reports
('fr', 'admin.reports', 'Rapports'),
('fr', 'admin.reports.title', 'Rapports de ventes'),
('fr', 'admin.reports.sales', 'Ventes'),
('fr', 'admin.reports.orders', 'Commandes'),
('fr', 'admin.reports.revenue', 'Revenus'),

-- Tracking
('fr', 'admin.tracking', 'Suivi'),
('fr', 'admin.tracking.title', 'Suivi des colis'),
('fr', 'admin.tracking.number', 'Numéro de suivi'),
('fr', 'admin.tracking.carrier', 'Transporteur'),

-- Shipping
('fr', 'admin.shipping', 'Expédition'),
('fr', 'admin.shipping.title', 'Méthodes d''expédition'),
('fr', 'admin.shipping.methods', 'Méthodes d''expédition'),

-- Tax
('fr', 'admin.tax', 'Taxes'),
('fr', 'admin.tax.title', 'Paramètres de taxes'),
('fr', 'admin.tax.rates', 'Taux de taxes'),

-- Analytics
('fr', 'admin.analytics', 'Analytique'),
('fr', 'admin.analytics.behavior', 'Comportement utilisateur'),
('fr', 'admin.analytics.conversion', 'Conversion'),
('fr', 'admin.analytics.devices', 'Appareils'),
('fr', 'admin.analytics.traffic', 'Sources de trafic'),

-- Email Marketing
('fr', 'admin.email', 'Marketing Email'),
('fr', 'admin.email.campaigns', 'Campagnes'),

-- FAQ
('fr', 'admin.faq', 'FAQ'),
('fr', 'admin.faq.title', 'Gestion FAQ'),

-- Invoices
('fr', 'admin.invoices', 'Factures'),
('fr', 'admin.invoices.title', 'Factures'),

-- Import/Export
('fr', 'admin.import_export', 'Import/Export'),
('fr', 'admin.import_export.title', 'Import/Export de données');

-- Insert admin translations for Spanish (es)
INSERT INTO translations (language_code, translation_key, translated_text) VALUES
-- Common UI elements
('es', 'admin.save', 'Guardar'),
('es', 'admin.cancel', 'Cancelar'),
('es', 'admin.delete', 'Eliminar'),
('es', 'admin.edit', 'Editar'),
('es', 'admin.add', 'Añadir'),
('es', 'admin.create', 'Crear'),
('es', 'admin.update', 'Actualizar'),
('es', 'admin.search', 'Buscar'),
('es', 'admin.filter', 'Filtrar'),
('es', 'admin.export', 'Exportar'),
('es', 'admin.import', 'Importar'),
('es', 'admin.refresh', 'Actualizar'),
('es', 'admin.close', 'Cerrar'),
('es', 'admin.view', 'Ver'),
('es', 'admin.configure', 'Configurar'),
('es', 'admin.test', 'Probar'),
('es', 'admin.active', 'Activo'),
('es', 'admin.inactive', 'Inactivo'),
('es', 'admin.status', 'Estado'),
('es', 'admin.actions', 'Acciones'),
('es', 'admin.all', 'Todos'),

-- Dashboard
('es', 'admin.dashboard', 'Panel'),
('es', 'admin.overview', 'Resumen'),
('es', 'admin.statistics', 'Estadísticas'),

-- Integrations
('es', 'admin.integrations', 'Integraciones'),
('es', 'admin.integrations.title', 'Integraciones'),
('es', 'admin.integrations.description', 'Conecte servicios de terceros a su tienda'),
('es', 'admin.integrations.active_count', 'Integraciones activas'),
('es', 'admin.integrations.payment', 'Proveedores de pago'),
('es', 'admin.integrations.email', 'Servicios de correo'),
('es', 'admin.integrations.available', 'Disponible'),
('es', 'admin.integrations.configure', 'Configurar'),
('es', 'admin.integrations.api_key', 'Clave API'),
('es', 'admin.integrations.api_secret', 'Secret API (opcional)'),
('es', 'admin.integrations.webhook_url', 'URL Webhook (opcional)'),
('es', 'admin.integrations.additional_config', 'Configuración adicional (JSON, opcional)'),
('es', 'admin.integrations.test_connection', 'Probar conexión'),
('es', 'admin.integrations.configured', 'Configurado'),
('es', 'admin.integrations.not_configured', 'No configurado'),

-- Coupons
('es', 'admin.coupons', 'Cupones'),
('es', 'admin.coupons.title', 'Administrar cupones'),
('es', 'admin.coupons.create', 'Crear cupón'),
('es', 'admin.coupons.code', 'Código de cupón'),
('es', 'admin.coupons.discount', 'Descuento'),
('es', 'admin.coupons.type', 'Tipo'),
('es', 'admin.coupons.usage', 'Uso'),

-- Reports
('es', 'admin.reports', 'Informes'),
('es', 'admin.reports.title', 'Informes de ventas'),
('es', 'admin.reports.sales', 'Ventas'),
('es', 'admin.reports.orders', 'Pedidos'),
('es', 'admin.reports.revenue', 'Ingresos'),

-- Tracking
('es', 'admin.tracking', 'Seguimiento'),
('es', 'admin.tracking.title', 'Seguimiento de envíos'),
('es', 'admin.tracking.number', 'Número de seguimiento'),
('es', 'admin.tracking.carrier', 'Transportista'),

-- Shipping
('es', 'admin.shipping', 'Envío'),
('es', 'admin.shipping.title', 'Métodos de envío'),
('es', 'admin.shipping.methods', 'Métodos de envío'),

-- Tax
('es', 'admin.tax', 'Impuestos'),
('es', 'admin.tax.title', 'Configuración de impuestos'),
('es', 'admin.tax.rates', 'Tasas de impuestos'),

-- Analytics
('es', 'admin.analytics', 'Analítica'),
('es', 'admin.analytics.behavior', 'Comportamiento del usuario'),
('es', 'admin.analytics.conversion', 'Conversión'),
('es', 'admin.analytics.devices', 'Dispositivos'),
('es', 'admin.analytics.traffic', 'Fuentes de tráfico'),

-- Email Marketing
('es', 'admin.email', 'Marketing por correo'),
('es', 'admin.email.campaigns', 'Campañas'),

-- FAQ
('es', 'admin.faq', 'FAQ'),
('es', 'admin.faq.title', 'Gestión de FAQ'),

-- Invoices
('es', 'admin.invoices', 'Facturas'),
('es', 'admin.invoices.title', 'Facturas'),

-- Import/Export
('es', 'admin.import_export', 'Importar/Exportar'),
('es', 'admin.import_export.title', 'Importar/Exportar datos');
