# Language Switcher Issue in Admin Panel

## Problem
The language switcher in the admin panel:
- ✅ Changes language successfully
- ✅ Shows "Language changed" message
- ✅ Stores selection in localStorage
- ❌ **BUT admin pages don't actually translate**

## Root Cause
Admin pages are **server-rendered with hardcoded German text**, not using the i18n translation system.

## Why It Doesn't Work
1. Admin pages use hardcoded strings like `"Integrationen"`, `"Dashboard"`, etc.
2. They don't have `data-i18n` attributes
3. The translation API returns translations but admin HTML is already rendered
4. Page reload doesn't help because server always sends German HTML

## Current Admin Page Structure
```typescript
// Example: AdminIntegrations component
export function AdminIntegrations() {
  return `
    <h1>Integrationen</h1>  // ❌ Hardcoded
    <p>Verbinden Sie Drittanbieter-Services</p>  // ❌ Hardcoded
  `
}
```

## Solution Options

### Option 1: Server-Side Language Detection (Recommended)
Update all admin components to accept language parameter:
```typescript
export function AdminIntegrations(lang = 'de') {
  const t = translations[lang];
  return `
    <h1>${t.integrations}</h1>
    <p>${t.connect_services}</p>
  `
}
```

### Option 2: Client-Side Translation Attributes
Add data-i18n to all text elements:
```typescript
return `
  <h1 data-i18n="integrations">Integrationen</h1>
  <p data-i18n="connect_services">Verbinden Sie...</p>
`
```

### Option 3: Disable Language Switcher in Admin
Only show language switcher on customer-facing pages.

## What Works Currently
- ✅ Customer-facing pages (homepage, products, etc.) - These use i18n
- ✅ Language switcher UI
- ✅ Language storage
- ❌ Admin panel translation

## Quick Fix
For now, the language switcher **works correctly on customer pages** but has no effect on admin pages since they're designed in German only.

If you need multilingual admin panel, all 160+ admin components would need to be refactored to use the translation system.
