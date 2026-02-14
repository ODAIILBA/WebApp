-- Add German translations for categories
INSERT OR IGNORE INTO category_translations (category_id, language_code, name, description) VALUES
(1, 'de', 'Sicherheitssoftware', 'Schützen Sie Ihre Geräte vor Bedrohungen'),
(2, 'de', 'Office-Software', 'Produktivitätstools für die Arbeit'),
(3, 'de', 'Betriebssysteme', 'Windows und andere OS-Lizenzen'),
(4, 'de', 'Antivirus', 'Umfassende Antivirus-Lösungen'),
(5, 'de', 'Design-Software', 'Kreative Tools für Designer'),
(6, 'de', 'Entwicklungstools', 'IDEs und Entwicklersoftware');
