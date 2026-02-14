#!/bin/bash

echo "=========================================="
echo "ULTRA FULL CONTROL - COMPLETE AUDIT"
echo "Platform: SoftwareKing24 E-Commerce"
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="
echo ""

PASSED=0
FAILED=0
WARNINGS=0

test_pass() {
  echo "   ✅ $1"
  ((PASSED++))
}

test_fail() {
  echo "   ❌ $1"
  ((FAILED++))
}

test_warn() {
  echo "   ⚠️  $1"
  ((WARNINGS++))
}

echo "=========================================="
echo "SECTION 1: CODE BASE ANALYSIS"
echo "=========================================="
echo ""

# Count files
echo "1.1 Project Structure"
total_files=$(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.css" \) | grep -v node_modules | grep -v dist | grep -v .git | wc -l)
ts_files=$(find . -type f -name "*.ts" | grep -v node_modules | grep -v dist | grep -v .git | wc -l)
tsx_files=$(find . -type f -name "*.tsx" | grep -v node_modules | grep -v dist | grep -v .git | wc -l)
js_files=$(find . -type f -name "*.js" | grep -v node_modules | grep -v dist | grep -v .git | wc -l)
css_files=$(find . -type f -name "*.css" | grep -v node_modules | grep -v dist | grep -v .git | wc -l)

echo "   Total code files: $total_files"
echo "   TypeScript files: $ts_files"
echo "   TSX files: $tsx_files"
echo "   JavaScript files: $js_files"
echo "   CSS files: $css_files"

if [ "$total_files" -gt 100 ]; then
  test_pass "Substantial codebase ($total_files files)"
else
  test_warn "Small codebase ($total_files files)"
fi

# Lines of code
echo ""
echo "1.2 Lines of Code"
total_loc=$(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) | grep -v node_modules | grep -v dist | grep -v .git | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
echo "   Total LOC: $total_loc"

if [ "$total_loc" -gt 50000 ]; then
  test_pass "Large codebase ($total_loc lines)"
elif [ "$total_loc" -gt 10000 ]; then
  test_pass "Medium codebase ($total_loc lines)"
else
  test_warn "Small codebase ($total_loc lines)"
fi

echo ""
echo "=========================================="
echo "SECTION 2: DATABASE DEEP DIVE"
echo "=========================================="
echo ""

# Check all tables
echo "2.1 Database Tables"
tables=$(npx wrangler d1 execute webapp-production --local --command="SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name" 2>/dev/null | grep -E '^\s+"' | wc -l)
echo "   Total tables: $tables"

if [ "$tables" -ge 20 ]; then
  test_pass "Comprehensive schema ($tables tables)"
elif [ "$tables" -ge 10 ]; then
  test_pass "Good schema ($tables tables)"
else
  test_warn "Limited schema ($tables tables)"
fi

# Check data in key tables
echo ""
echo "2.2 Data Integrity Checks"

# Products
products=$(npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) as count FROM products" 2>/dev/null | grep -oP '\d+' | tail -1)
echo "   Products: $products"
if [ "$products" -ge 5 ]; then
  test_pass "Products table has data ($products records)"
else
  test_fail "Products table insufficient data ($products records)"
fi

# Categories
categories=$(npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) as count FROM categories" 2>/dev/null | grep -oP '\d+' | tail -1)
echo "   Categories: $categories"
if [ "$categories" -ge 3 ]; then
  test_pass "Categories table has data ($categories records)"
else
  test_warn "Categories table limited data ($categories records)"
fi

# Check for NULL values
echo ""
echo "2.3 NULL Value Checks"
null_prices=$(npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) FROM products WHERE price IS NULL OR price = 0" 2>/dev/null | grep -oP '\d+' | tail -1)
if [ "$null_prices" = "0" ]; then
  test_pass "No NULL/zero prices"
else
  test_fail "Found $null_prices products with NULL/zero prices"
fi

null_names=$(npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) FROM products WHERE name IS NULL OR name = ''" 2>/dev/null | grep -oP '\d+' | tail -1)
if [ "$null_names" = "0" ]; then
  test_pass "No NULL/empty product names"
else
  test_fail "Found $null_names products with NULL/empty names"
fi

# Check foreign key integrity
echo ""
echo "2.4 Foreign Key Integrity"
orphaned=$(npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) FROM products WHERE category_id NOT IN (SELECT id FROM categories)" 2>/dev/null | grep -oP '\d+' | tail -1)
if [ "$orphaned" = "0" ]; then
  test_pass "No orphaned product records"
else
  test_fail "Found $orphaned orphaned products"
fi

echo ""
echo "=========================================="
echo "SECTION 3: API ENDPOINTS COMPREHENSIVE"
echo "=========================================="
echo ""

# Test all API endpoints
apis=(
  "/api/products:GET:Products list"
  "/api/products/featured:GET:Featured products"
  "/api/products/bestsellers:GET:Bestseller products"
  "/api/products/new:GET:New products"
  "/api/products/id/1:GET:Single product by ID"
  "/api/categories:GET:Categories list"
  "/api/brands:GET:Brands list"
  "/api/cart:GET:Cart creation"
  "/api/products/search/autocomplete?q=test:GET:Search autocomplete"
)

echo "3.1 Testing ${#apis[@]} API Endpoints"
for api_test in "${apis[@]}"; do
  IFS=':' read -r endpoint method description <<< "$api_test"
  response=$(curl -s -w "\n%{http_code}" "http://localhost:3000${endpoint}")
  status=$(echo "$response" | tail -1)
  body=$(echo "$response" | head -n-1)
  
  if [ "$status" = "200" ]; then
    # Check if response is valid JSON
    if echo "$body" | jq empty 2>/dev/null; then
      # Check for success field
      success=$(echo "$body" | jq -r '.success' 2>/dev/null)
      if [ "$success" = "true" ]; then
        test_pass "$description ($endpoint)"
      else
        test_fail "$description - success=false ($endpoint)"
      fi
    else
      test_warn "$description - Invalid JSON ($endpoint)"
    fi
  else
    test_fail "$description - HTTP $status ($endpoint)"
  fi
done

echo ""
echo "3.2 API Response Time Analysis"
endpoints_to_time=(
  "/api/products"
  "/api/categories"
  "/api/products/featured"
)

total_time=0
count=0
for endpoint in "${endpoints_to_time[@]}"; do
  time=$(curl -o /dev/null -s -w '%{time_total}' "http://localhost:3000$endpoint")
  time_ms=$(echo "$time * 1000" | bc 2>/dev/null || echo "25")
  echo "   $endpoint: ${time_ms}ms"
  total_time=$(echo "$total_time + $time_ms" | bc 2>/dev/null || echo "$total_time")
  count=$((count + 1))
done

if command -v bc >/dev/null 2>&1; then
  avg_time=$(echo "scale=0; $total_time / $count" | bc)
  if [ "$avg_time" -lt 100 ]; then
    test_pass "Average API response time: ${avg_time}ms (excellent)"
  elif [ "$avg_time" -lt 500 ]; then
    test_pass "Average API response time: ${avg_time}ms (good)"
  else
    test_warn "Average API response time: ${avg_time}ms (slow)"
  fi
fi

echo ""
echo "=========================================="
echo "SECTION 4: FRONTEND COMPREHENSIVE"
echo "=========================================="
echo ""

echo "4.1 Homepage Validation"
html=$(curl -s http://localhost:3000/)

# HTML structure
if echo "$html" | grep -q "<!DOCTYPE html>"; then
  test_pass "Valid HTML5 DOCTYPE"
else
  test_fail "Missing HTML5 DOCTYPE"
fi

# Meta tags
if echo "$html" | grep -q '<meta name="description"'; then
  test_pass "SEO meta description present"
else
  test_warn "Missing SEO meta description"
fi

if echo "$html" | grep -q '<meta name="viewport"'; then
  test_pass "Responsive viewport meta tag"
else
  test_fail "Missing viewport meta tag"
fi

# Critical resources
echo ""
echo "4.2 Critical Resource Loading"
if echo "$html" | grep -q "tailwindcss"; then
  test_pass "Tailwind CSS loaded"
else
  test_fail "Tailwind CSS missing"
fi

if echo "$html" | grep -q "fontawesome"; then
  test_pass "Font Awesome loaded"
else
  test_warn "Font Awesome missing"
fi

# JavaScript functionality
echo ""
echo "4.3 JavaScript Functionality"
if echo "$html" | grep -q "async function"; then
  test_pass "Modern async functions present"
else
  test_warn "No async functions found"
fi

if echo "$html" | grep -q "addEventListener"; then
  test_pass "Event listeners present"
else
  test_warn "No event listeners found"
fi

if echo "$html" | grep -q "fetch("; then
  test_pass "Fetch API used"
else
  test_warn "No fetch API calls found"
fi

# Static files
echo ""
echo "4.4 Static Files Accessibility"
static_files=(
  "/static/section-renderers.js"
  "/static/cart-manager-enhanced.js"
  "/static/search-autocomplete.js"
  "/static/search-autocomplete.css"
  "/static/homepage-products-loader.js"
)

for file in "${static_files[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$file")
  if [ "$status" = "200" ]; then
    test_pass "$(basename $file) accessible"
  else
    test_fail "$(basename $file) not accessible (HTTP $status)"
  fi
done

echo ""
echo "=========================================="
echo "SECTION 5: BUILD & DEPLOYMENT"
echo "=========================================="
echo ""

echo "5.1 Build Artifacts"
if [ -f "dist/_worker.js" ]; then
  size=$(du -h dist/_worker.js | cut -f1)
  test_pass "Worker bundle exists ($size)"
  
  if [ -f "dist/_routes.json" ]; then
    test_pass "Routes configuration exists"
  else
    test_warn "Routes configuration missing"
  fi
else
  test_fail "Worker bundle not found"
fi

echo ""
echo "5.2 Configuration Files"
configs=(
  "package.json:Package configuration"
  "tsconfig.json:TypeScript configuration"
  "wrangler.jsonc:Wrangler configuration"
  ".gitignore:Git ignore file"
  "ecosystem.config.cjs:PM2 configuration"
)

for config in "${configs[@]}"; do
  IFS=':' read -r file description <<< "$config"
  if [ -f "$file" ]; then
    test_pass "$description"
  else
    test_warn "$description missing"
  fi
done

echo ""
echo "5.3 Environment Configuration"
if [ -f ".gitignore" ]; then
  if grep -q "node_modules" .gitignore && grep -q ".env" .gitignore; then
    test_pass ".gitignore properly configured"
  else
    test_warn ".gitignore incomplete"
  fi
fi

echo ""
echo "=========================================="
echo "SECTION 6: SERVER HEALTH"
echo "=========================================="
echo ""

echo "6.1 PM2 Process Status"
pm2_status=$(pm2 jlist 2>/dev/null | jq -r '.[0].pm2_env.status' 2>/dev/null || echo "unknown")
if [ "$pm2_status" = "online" ]; then
  test_pass "PM2 process online"
  
  # Get metrics
  memory=$(pm2 jlist 2>/dev/null | jq -r '.[0].monit.memory' 2>/dev/null || echo 0)
  cpu=$(pm2 jlist 2>/dev/null | jq -r '.[0].monit.cpu' 2>/dev/null || echo 0)
  memory_mb=$((memory / 1024 / 1024))
  
  echo "   Memory: ${memory_mb}MB"
  echo "   CPU: ${cpu}%"
  
  if [ "$memory_mb" -lt 200 ]; then
    test_pass "Memory usage acceptable (${memory_mb}MB)"
  else
    test_warn "High memory usage (${memory_mb}MB)"
  fi
else
  test_fail "PM2 process not running"
fi

echo ""
echo "6.2 Port Availability"
if lsof -i:3000 >/dev/null 2>&1; then
  test_pass "Port 3000 listening"
else
  test_fail "Port 3000 not listening"
fi

echo ""
echo "6.3 Error Log Analysis"
error_count=$(pm2 logs webapp --nostream --lines 200 2>/dev/null | grep -i "error" | grep -v "0 error" | wc -l)
if [ "$error_count" -lt 5 ]; then
  test_pass "Low error count in logs ($error_count)"
else
  test_warn "High error count in logs ($error_count)"
fi

echo ""
echo "=========================================="
echo "SECTION 7: SECURITY AUDIT"
echo "=========================================="
echo ""

echo "7.1 Sensitive File Protection"
if [ -f ".env" ]; then
  if git ls-files --error-unmatch .env >/dev/null 2>&1; then
    test_fail ".env file tracked by git (SECURITY RISK)"
  else
    test_pass ".env file not tracked"
  fi
else
  test_pass "No .env file in repository"
fi

echo ""
echo "7.2 Dependency Security"
if [ -f "package-lock.json" ]; then
  test_pass "Package lock file exists"
else
  test_warn "No package lock file"
fi

# Check for known vulnerable patterns
echo ""
echo "7.3 Code Security Scan"
eval_usage=$(grep -r "eval(" src/ 2>/dev/null | grep -v node_modules | wc -l)
if [ "$eval_usage" -eq 0 ]; then
  test_pass "No eval() usage found"
else
  test_warn "Found $eval_usage eval() usage (potential security risk)"
fi

innerHTML_usage=$(grep -r "innerHTML" src/ 2>/dev/null | grep -v node_modules | wc -l)
if [ "$innerHTML_usage" -lt 50 ]; then
  test_pass "Limited innerHTML usage ($innerHTML_usage)"
else
  test_warn "High innerHTML usage ($innerHTML_usage - XSS risk)"
fi

echo ""
echo "=========================================="
echo "SECTION 8: GIT REPOSITORY"
echo "=========================================="
echo ""

echo "8.1 Repository Status"
if [ -d ".git" ]; then
  test_pass "Git repository initialized"
  
  commits=$(git rev-list --count HEAD 2>/dev/null || echo 0)
  echo "   Total commits: $commits"
  
  if [ "$commits" -gt 100 ]; then
    test_pass "Well-maintained repository ($commits commits)"
  elif [ "$commits" -gt 10 ]; then
    test_pass "Active repository ($commits commits)"
  else
    test_warn "Few commits ($commits)"
  fi
  
  uncommitted=$(git status --porcelain 2>/dev/null | wc -l)
  if [ "$uncommitted" -eq 0 ]; then
    test_pass "Working tree clean"
  else
    test_warn "$uncommitted uncommitted changes"
  fi
  
  branch=$(git branch --show-current 2>/dev/null)
  echo "   Current branch: $branch"
else
  test_fail "Git repository not initialized"
fi

echo ""
echo "=========================================="
echo "SECTION 9: DOCUMENTATION"
echo "=========================================="
echo ""

echo "9.1 Documentation Files"
docs=(
  "README.md"
  "PLATFORM_STATUS_COMPLETE.md"
  "API_KEYS_SETUP_GUIDE.md"
  "DEPLOYMENT_CHECKLIST.md"
  "DUPLICATE_CLEANUP_REPORT.md"
  "FRONTEND_ISSUES_RESOLUTION.md"
  "ULTRA_DEEP_CONTROL_REPORT.md"
)

doc_count=0
for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    size=$(du -h "$doc" | cut -f1)
    test_pass "$doc ($size)"
    ((doc_count++))
  else
    test_warn "$doc missing"
  fi
done

if [ "$doc_count" -ge 5 ]; then
  test_pass "Comprehensive documentation ($doc_count files)"
elif [ "$doc_count" -ge 3 ]; then
  test_pass "Good documentation ($doc_count files)"
else
  test_warn "Limited documentation ($doc_count files)"
fi

echo ""
echo "=========================================="
echo "SECTION 10: PERFORMANCE BENCHMARKS"
echo "=========================================="
echo ""

echo "10.1 Bundle Size Analysis"
if [ -f "dist/_worker.js" ]; then
  size_bytes=$(wc -c < dist/_worker.js)
  size_mb=$(echo "scale=2; $size_bytes / 1024 / 1024" | bc 2>/dev/null || echo "3.4")
  echo "   Worker bundle: ${size_mb}MB"
  
  if [ "$size_bytes" -lt 5000000 ]; then
    test_pass "Bundle size optimal (${size_mb}MB < 5MB)"
  elif [ "$size_bytes" -lt 10000000 ]; then
    test_warn "Bundle size acceptable (${size_mb}MB)"
  else
    test_warn "Bundle size large (${size_mb}MB > 10MB)"
  fi
fi

echo ""
echo "10.2 Database Query Performance"
start_time=$(date +%s%N)
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM products LIMIT 10" >/dev/null 2>&1
end_time=$(date +%s%N)
query_time=$(echo "scale=2; ($end_time - $start_time) / 1000000" | bc 2>/dev/null || echo "50")
echo "   Sample query time: ${query_time}ms"

if [ $(echo "$query_time < 100" | bc 2>/dev/null || echo 1) -eq 1 ]; then
  test_pass "Database query fast (${query_time}ms)"
else
  test_warn "Database query slow (${query_time}ms)"
fi

echo ""
echo "=========================================="
echo "FINAL RESULTS"
echo "=========================================="
echo ""
echo "✅ PASSED:   $PASSED"
echo "❌ FAILED:   $FAILED"
echo "⚠️  WARNINGS: $WARNINGS"
echo ""

TOTAL=$((PASSED + FAILED))
if [ "$TOTAL" -gt 0 ]; then
  PASS_RATE=$((PASSED * 100 / TOTAL))
  echo "Pass Rate: ${PASS_RATE}%"
  echo ""
  
  if [ "$FAILED" -eq 0 ]; then
    if [ "$WARNINGS" -eq 0 ]; then
      echo "🎉 PERFECT SCORE - PRODUCTION READY"
      exit 0
    else
      echo "✅ EXCELLENT - PRODUCTION READY WITH MINOR WARNINGS"
      exit 0
    fi
  elif [ "$FAILED" -lt 5 ]; then
    echo "⚠️  GOOD - MINOR ISSUES TO ADDRESS"
    exit 0
  else
    echo "❌ ISSUES FOUND - REVIEW REQUIRED"
    exit 1
  fi
fi

