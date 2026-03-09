# 🗄️ Database Setup Guide - Local Development

## Problem: "no such table: license_keys"

This error occurs because the D1 database hasn't been initialized with the required tables. Follow the steps below to set up your local database.

---

## 🚀 Quick Setup (Recommended)

### **Option 1: Using the Initialization Script**

```bash
cd /home/tool/Tools/webapp

# Run the initialization script
./init-db-local.sh
```

This script will:
- ✅ Check your configuration
- ✅ Apply all database migrations
- ✅ Create all required tables
- ✅ Verify the setup

---

### **Option 2: Manual Setup**

```bash
cd /home/tool/Tools/webapp

# Apply all migrations to local database
npx wrangler d1 migrations apply webapp-production --local

# Verify tables were created
npx wrangler d1 execute webapp-production --local --command="SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"
```

---

## 📋 What Tables Get Created?

The migrations create 40+ tables including:

**Core Tables:**
- `users` - User accounts
- `products` - Product catalog
- `orders` - Order management
- `license_keys` - License management
- `carts` - Shopping carts
- `categories` - Product categories

**Admin Tables:**
- `admin_users` - Admin accounts
- `admin_settings` - System settings
- `themes` - Theme configurations
- `notifications` - System notifications

**Security Tables:**
- `firewall_rules` - Security rules
- `blocked_ips` - IP blacklist
- `auth_tokens` - Authentication tokens
- `rate_limits` - Rate limiting

And many more...

---

## 🔍 Verify Setup

After running the migrations, verify the database:

```bash
# Check if license_keys table exists
npx wrangler d1 execute webapp-production --local --command="SELECT sql FROM sqlite_master WHERE name='license_keys';"

# Count how many tables were created
npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) as table_count FROM sqlite_master WHERE type='table';"

# List all tables
npx wrangler d1 execute webapp-production --local --command="SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"
```

---

## 📁 Database Location

Your local D1 database is stored at:
```
.wrangler/state/v3/d1/miniflare-D1DatabaseObject/
```

This is a SQLite database file that persists between development sessions.

---

## 🧹 Reset Database (If Needed)

If you need to start fresh:

```bash
# Delete the local database
rm -rf .wrangler/state/v3/d1/

# Re-apply migrations
npx wrangler d1 migrations apply webapp-production --local
```

---

## 🚀 Start Development Server

After database setup:

```bash
# Option 1: Vite dev server (recommended)
npm run dev

# Option 2: Wrangler Pages dev
npm run dev:sandbox

# Option 3: PM2 (for background process)
pm2 start ecosystem.config.cjs
```

Access your app at: **http://localhost:5173**

---

## ⚠️ Common Issues

### Issue 1: "wrangler: command not found"
```bash
# Install wrangler
npm install

# Or install globally
npm install -g wrangler
```

### Issue 2: "database is locked"
```bash
# Stop any running development servers
pkill -f "wrangler"
pkill -f "vite"
pm2 delete all

# Try again
npx wrangler d1 migrations apply webapp-production --local
```

### Issue 3: Migrations already applied
```bash
# Check migration status
npx wrangler d1 migrations list webapp-production --local

# If you need to re-apply, delete and recreate
rm -rf .wrangler/state/v3/d1/
npx wrangler d1 migrations apply webapp-production --local
```

### Issue 4: Permission denied
```bash
# Fix permissions
sudo chown -R $USER:$USER .wrangler/
chmod -R 755 .wrangler/
```

---

## 📊 Database Schema Overview

**Total Tables:** 40+
**Total Migrations:** 28 files
**Database Engine:** SQLite (via Cloudflare D1)
**Size:** ~50-100 KB (empty), ~10-50 MB (with data)

**Key Features:**
- ✅ Multi-language support
- ✅ E-commerce functionality
- ✅ License management system
- ✅ Admin panel with advanced features
- ✅ Security & firewall system
- ✅ Theme customization
- ✅ Analytics & monitoring

---

## 🔄 Production Database

For production deployment to Cloudflare:

```bash
# Apply migrations to production
npx wrangler d1 migrations apply webapp-production

# Note: Remove --local flag for production
```

⚠️ **Warning:** Never run migrations directly on production without testing locally first!

---

## 📞 Need Help?

If you're still having issues:

1. Check that all dependencies are installed: `npm install`
2. Verify Node.js version: `node --version` (should be 18+)
3. Check wrangler config: `cat wrangler.jsonc`
4. View migration files: `ls -la migrations/`
5. Check error logs: `cat .wrangler/state/v3/d1/*.log`

---

**Developer:** ODAI ILBA | TargoNIX  
**Project:** SOFTWAREKING24 WebApp  
**Last Updated:** 2026-03-09
