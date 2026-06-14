---
name: Admin wildcard handler location and structure
description: Where the active /admin/* wildcard handler lives and how to extend it.
---

## Location
Active wildcard: `app.get('/admin/*', async (c) => {` at line ~29930 in src/index.tsx (file is 36k+ lines and growing). There is also a DISABLED first handler at ~28585 wrapped in `/* DISABLED ... */` comments.

## Structure
```
app.get('/admin/*', async (c) => {
  const path = c.req.path;
  const config = adminPageConfigs[path];

  // SPECIAL CASES (no config needed) — add new ones HERE before !config check:
  if (path === '/admin/pages/add') { ... return c.html(formHtml); }
  if (path === '/admin/design') { ... return c.html(hubHtml); }
  if (path === '/admin/translations') { ... }
  if (path === '/admin/system') { ... }
  if (path === '/admin/licenses/assignments') { ... }

  // If no config → AdminPlaceholder "In Entwicklung"
  if (!config) { return c.html(AdminPlaceholder(path, pageTitle)); }

  try { ... execute dbQuery, statsCards queries, render table ... }
})
```

**Why:** New pages with special rendering (forms, hubs, custom layouts) must be special-cased BEFORE the `!config` check, otherwise they show "In Entwicklung".
