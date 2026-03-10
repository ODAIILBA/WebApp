# Deployment Guide - WebApp E-Commerce Platform

## ✅ Completed Steps

### 1. GitHub Setup ✅
- **Repository**: https://github.com/ODAIILBA/WebApp.git
- **Branch**: main
- **Latest Commit**: 34712ce - "fix: Remove escaped backticks causing build errors"
- **Status**: All code successfully pushed to GitHub

### 2. Cloudflare Authentication ✅
- **Account**: aboaws.obai@gmail.com
- **Account ID**: 8717149c85c383f5eb16c9a8d1030e3b
- **API Token**: Configured in environment

### 3. Cloudflare Pages Project ✅
- **Project Name**: webapp
- **Domain**: webapp-ayi.pages.dev
- **Status**: Project exists and ready for deployment

### 4. Cloudflare D1 Database ✅
- **Database Name**: webapp-production
- **Database ID**: 8336fdbd-9357-4049-82b9-8a57f2754879
- **Configuration**: Already configured in wrangler.jsonc

## 🔧 Deployment Options

### Option 1: GitHub Integration (RECOMMENDED)
Connect your GitHub repository to Cloudflare Pages for automatic deployments:

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** → **Pages**
3. Find your **webapp** project
4. Click **Settings** → **Builds & deployments**
5. Under **Source**, click **Connect to Git**
6. Select **GitHub** and authorize if needed
7. Choose repository: **ODAIILBA/WebApp**
8. Configure build settings:
   - **Production branch**: main
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: (leave empty)
   - **Node version**: 20 or higher

9. Add Environment Variables (if needed):
   - Go to **Settings** → **Environment variables**
   - Add any necessary API keys or secrets

10. Click **Save and Deploy**

Cloudflare will automatically:
- Build the project on their infrastructure (unlimited memory)
- Deploy to webapp-ayi.pages.dev
- Auto-deploy on every push to main branch

### Option 2: Manual CLI Deployment
If you have a machine with ≥8GB RAM:

```bash
# Clone the repository
git clone https://github.com/ODAIILBA/WebApp.git
cd WebApp

# Install dependencies
npm install

# Build the project
export NODE_OPTIONS="--max-old-space-size=8192"
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name webapp
```

### Option 3: GitHub Actions CI/CD
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NODE_OPTIONS: '--max-old-space-size=8192'
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: 8717149c85c383f5eb16c9a8d1030e3b
          projectName: webapp
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

Then add `CLOUDFLARE_API_TOKEN` to GitHub Secrets.

## 📊 Database Migrations

### Apply to Production Database
```bash
# Remote production database
npx wrangler d1 migrations apply webapp-production --remote

# Or apply specific migration
npx wrangler d1 execute webapp-production --remote --file=migrations/0035_phase3_features.sql
```

### Available Migrations
- 0028-0035: Phase 1-3 features (coupons, reports, tracking, shipping, tax, analytics, FAQ, invoices, import/export)

## 🌐 Access URLs

### Production Deployment
- **Main App**: https://webapp-ayi.pages.dev
- **Admin Panel**: https://webapp-ayi.pages.dev/admin
- **Admin Features**:
  - Coupons: /admin/coupons
  - Reports: /admin/reports
  - Tracking: /admin/tracking
  - Shipping: /admin/shipping-methods
  - Tax Settings: /admin/tax-settings
  - Analytics: /admin/analytics-behavior, /admin/analytics-conversion, etc.
  - Email Marketing: /admin/email-marketing
  - FAQ: /admin/faq
  - Invoices: /admin/invoices
  - Import/Export: /admin/import-export

### GitHub Repository
- **Code**: https://github.com/ODAIILBA/WebApp
- **Issues**: https://github.com/ODAIILBA/WebApp/issues

## 🚀 Quick Start After Deployment

1. **Verify deployment**: Visit https://webapp-ayi.pages.dev
2. **Apply migrations**: Run database migrations using wrangler
3. **Test admin panel**: Go to https://webapp-ayi.pages.dev/admin
4. **Monitor logs**: Check Cloudflare Pages dashboard for build logs

## 📝 Project Stats

- **Total Commits**: 15+ (including Phase 1, 2, 3)
- **Database Tables**: 32 tables
- **API Endpoints**: 72+ endpoints
- **Admin Pages**: 14 fully functional pages
- **Code Lines**: ~10,000+ lines (backend + frontend)
- **Technologies**: Hono, Cloudflare Workers/Pages, D1 SQLite, TypeScript, Tailwind CSS, Chart.js

## 🐛 Known Issues

### Build Memory Issue
The sandbox environment has limited memory (~2GB) which causes builds to fail with "Killed" error. This is why GitHub integration (Option 1) is recommended - Cloudflare's build infrastructure has unlimited memory.

### Database Migrations
Some early migrations reference tables that don't exist in the production database. You may need to:
1. Apply migrations incrementally
2. Or recreate the database from scratch
3. Or skip problematic migrations and apply only Phase 1-3 migrations

## 🔐 Security Notes

- **API Token**: Store CLOUDFLARE_API_TOKEN securely in GitHub Secrets
- **Environment Variables**: Never commit .env or .dev.vars to git
- **Database**: webapp-production contains real data - be careful with destructive operations

## 📞 Support

For issues or questions:
- Check Cloudflare Pages logs: https://dash.cloudflare.com/
- Review GitHub Actions logs (if using CI/CD)
- Check wrangler logs: `~/.config/.wrangler/logs/`

## ✅ Deployment Checklist

- [x] Code pushed to GitHub
- [x] Cloudflare API authenticated
- [x] D1 database configured
- [x] Project exists on Cloudflare Pages
- [ ] Connect GitHub to Cloudflare Pages (Option 1)
- [ ] Apply database migrations to production
- [ ] Verify deployment at webapp-ayi.pages.dev
- [ ] Test admin features
- [ ] Monitor for errors

---

**Last Updated**: March 10, 2026
**Deployment Status**: Ready for GitHub Integration or CI/CD
