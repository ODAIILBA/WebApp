---
name: adminPageConfigs pattern for DB-backed pages
description: How to add real DB data to pages served by the wildcard handler via adminPageConfigs.
---

## File: src/admin-page-configs.ts

## Key fields for real DB data
- `dbQuery` — SQL query, results rendered as table rows
- `statsCards[].query` — SQL query; result key is `count` (or `sum` for currency format)
- `tableColumns[].format` — `badge` (1→Aktiv/0→Inaktiv), `currency`, `date`, `percentage`

## DB tables confirmed in D1
- `translations` (translation_key, translated_text, language_code) — 332 rows, 4 langs (DE/EN/ES/FR)
- `tax_rates` (id, name, code, rate, country_code, is_active) — 8 rows
- `settings` (id, key, value, type, description, updated_at) — 5 rows
- `email_templates` (id, name, subject, body_html, category, is_active) — 2 rows
- `license_keys` (id, license_key, status, product_id, order_id) — 0 rows currently
- `pages` (id, title, slug, content, template, is_published) — 1 row
- `footer_settings` — 3 rows (migration 0043)
- `homepage_sections`, `hero_sliders`, `custom_scripts` — exist, may be empty
