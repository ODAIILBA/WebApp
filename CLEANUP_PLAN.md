# Project Cleanup Plan

## 📋 Summary
Found **65+ unnecessary files** totaling ~560MB that can be safely deleted.

## 🗑️ Files to Delete

### 1. Core Dump File (560MB!)
```
core                      # 560MB core dump - SAFE TO DELETE
```

### 2. Old Debug/Test Scripts (30 files)
```
*.sh files:
- DATABASE_DEEP_AUDIT.sh
- FINAL_CONTROL_CHECK.sh
- FINAL_DATABASE_VERIFICATION.sh
- ROUND10_DEEP_DIVE.sh
- ROUND11_FINAL_IMPLEMENTATION.sh
- ROUND13_DEEP_SCAN.sh
- ROUND5_ADDITIONAL_FIXES.sh
- ROUND6_EXTREME_AUDIT.sh
- ROUND7_FINAL_SWEEP.sh
- ROUND8_ANALYSIS.sh
- ROUND9_ANALYSIS.sh
- TEST_ADMIN_PAGES.sh
- actual_console_cleanup.sh
- check_sql_safety.sh
- cleanup_docs.sh
- deduplicate_functions.sh
- deep_code_analysis.sh
- deep_platform_scan.sh
- fix_product_translations.sh
- fix_react_keys.sh
- frontend_diagnostic.sh
- identify_admin_pages.sh
- identify_placeholder_pages.sh
- init-db-local.sh
- remove_console_logs.sh
- remove_dead_code.sh
- setup-almalinux-vps.sh
- setup-kali.sh
- test-all-admin.sh
- test-flow.sh
- test_frontend_complete.sh
- ultra_comprehensive_scan.sh
- ultra_deep_verification.sh
- ultra_full_control.sh
```

### 3. Old SQL Seed/Debug Files (15 files)
```
*.sql files (root directory):
- add_brand_is_featured.sql
- add_german_translations.sql
- add_missing_columns.sql
- add_new_tables.sql
- add_performance_indexes.sql
- add_performance_indexes_v2.sql
- create_cart_reviews_tables.sql
- create_missing_tables.sql
- create_notifications_table.sql
- create_security_tables.sql
- fix-categories.sql
- fix_final_issues.sql
- fix_missing_tables.sql
- recreate_coupons.sql
- seed-homepage.sql
- seed.sql
- seed_brands.sql
- update_product_brands.sql
```

### 4. Documentation/Banner Files (10 files)
```
*.txt files:
- BRANDING_FIX_BANNER.txt
- CLEANUP_SUMMARY.txt
- COMPLETION_BANNER.txt
- FINAL_STATUS.txt
- FULL_WIDTH_SECTIONS_BANNER.txt
- HOMEPAGE_BANNER.txt
- ISSUE_RESOLVED.txt
- cart_api.txt
- review_api.txt
```

### 5. Test HTML Files in public/ (7 files)
```
public/*.html (except index.html):
- debug.html
- init-db.html
- language-demo.html
- modern-preview.html
- test-cart.html
- test-products.html
- test-sections.html
- test-render.html
```

### 6. Other Files
```
- console_cleanup.log
- fix_sidebar.py
```

### 7. Skipped Migration Files (3 files)
```
migrations/*.skip:
- 0017_admin_missing_tables.sql.skip
- 0024_add_missing_indexes.sql.skip
- 0027_admin_tables_simplified.sql.skip
```

### 8. Wrangler Cache (.wrangler/ - 246MB)
Can be safely deleted - will be regenerated on next build.

## ✅ Files to KEEP

### Essential Configuration
- package.json, tsconfig.json, vite.config.ts
- wrangler.jsonc
- .gitignore
- ecosystem.config.cjs

### Essential Documentation
- README.md
- DEPLOYMENT_GUIDE.md
- PHASE1_COMPLETE.md
- ADMIN_PAGES_STATUS_REPORT.md

### Essential Code
- src/ directory (all source code)
- migrations/ directory (*.sql files, NOT *.skip)
- public/index.html (main entry point)
- public/static/ directory (static assets)

### Templates
- .env.example
- .dev.vars.template

## 🚀 Cleanup Commands

### Safe Cleanup (Recommended)
```bash
cd /home/user/webapp

# Remove core dump
rm -f core

# Remove old test/debug scripts
rm -f *.sh

# Remove old SQL files (root only, NOT migrations/)
rm -f *.sql

# Remove banner/documentation txt files
rm -f *_BANNER.txt *_STATUS.txt *_SUMMARY.txt ISSUE_RESOLVED.txt
rm -f cart_api.txt review_api.txt

# Remove test HTML files
rm -f public/debug.html public/init-db.html public/language-demo.html
rm -f public/modern-preview.html public/test-*.html

# Remove log files
rm -f *.log

# Remove Python scripts
rm -f *.py

# Remove skipped migrations
rm -f migrations/*.skip

# Remove wrangler cache (will regenerate)
rm -rf .wrangler/
```

### Aggressive Cleanup (Optional)
```bash
# Also remove dist (will rebuild)
rm -rf dist/

# Clean npm cache
npm cache clean --force
```

## 📊 Space Savings

| Category | Size | Files |
|----------|------|-------|
| Core dump | 560MB | 1 |
| .wrangler cache | 246MB | many |
| Test scripts | ~1MB | 30 |
| SQL files | ~100KB | 18 |
| Test HTML | ~50KB | 7 |
| Other | ~50KB | 15 |
| **TOTAL** | **~807MB** | **71** |

## ⚠️ Important Notes

1. **Backup First**: All code is already on GitHub, so safe to delete
2. **Migrations**: Keep ALL .sql files in migrations/ directory - these are essential!
3. **.wrangler**: Will regenerate on next `wrangler dev` or `npm run build`
4. **node_modules**: Don't delete - needed for development
5. **.git**: Don't delete - contains version history

## 🔄 After Cleanup

1. Test build: `npm run build`
2. Test locally: `npm run dev`
3. Commit changes: `git add -A && git commit -m "chore: Clean up old debug files"`
4. Push to GitHub: `git push origin main`

## ✅ Verification

After cleanup, your project structure should be:
```
webapp/
├── src/                    # Source code
├── migrations/             # Database migrations (*.sql only)
├── public/
│   ├── index.html          # Main entry
│   └── static/             # Static assets
├── node_modules/           # Dependencies
├── .git/                   # Git history
├── package.json            # Config
├── wrangler.jsonc          # Cloudflare config
├── README.md               # Documentation
├── DEPLOYMENT_GUIDE.md     # Deployment docs
└── Other essential configs
```

Total size after cleanup: ~284MB (down from ~1.1GB)
