---
name: Hono wildcard routing priority
description: Hono v4 SmartRouter prioritizes /admin/* wildcard over specific routes registered earlier — fix approaches.
---

## The Problem
In Hono v4.11.7 with SmartRouter, `app.get('/admin/*', handler)` at line ~29930 intercepts requests like `/admin/email-templates` even though a specific `app.get('/admin/email-templates', handler)` is registered earlier (line ~12595).

## Why
SmartRouter uses RegExpRouter which may reorder routes by pattern specificity. Wildcards can win over specific routes in some Hono v4 configurations.

## Fix Approaches
1. **Special case in wildcard handler** — add `if (path === '/admin/some-path') { return c.html(...) }` BEFORE the `!config` early-return. Always works.
2. **adminPageConfigs entry** — add `dbQuery` and `statsCards[].query` to the config entry so the wildcard handler fetches real DB data. Good for table-based pages.

**Why:** Registration order cannot be relied on to resolve wildcard vs specific route conflicts in this codebase's Hono setup.
