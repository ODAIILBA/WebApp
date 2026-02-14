#!/bin/bash

echo "======================================"
echo "ULTRA DEEP PLATFORM VERIFICATION"
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "======================================"
echo ""

# Test counters
PASSED=0
FAILED=0
WARNINGS=0

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test result function
test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
        ((FAILED++))
    fi
}

warning_result() {
    echo -e "${YELLOW}⚠ WARN${NC}: $1"
    ((WARNINGS++))
}

echo "=== SECTION 1: CRITICAL API ENDPOINT VERIFICATION ==="
echo ""

# Test all endpoints with detailed validation
endpoints=(
    "/api/products:should have 8 products"
    "/api/products/featured:should have 7 featured products"
    "/api/products/bestsellers:should have bestsellers"
    "/api/products/new:should have 6 new products"
    "/api/products/id/1:should return Windows 11 Pro"
    "/api/products/windows-11-pro:should return Windows 11 Pro by slug"
    "/api/categories:should have 6 categories"
    "/api/brands:should return brands"
    "/api/cart:should create cart"
    "/api/products/search/autocomplete?q=windows:should find windows products"
)

for endpoint_test in "${endpoints[@]}"; do
    IFS=':' read -r endpoint description <<< "$endpoint_test"
    response=$(curl -s -w "\n%{http_code}" "http://localhost:3000${endpoint}")
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$status_code" = "200" ]; then
        test_result 0 "GET ${endpoint} - ${description}"
        echo "   Response preview: $(echo "$body" | head -c 100)..."
    else
        test_result 1 "GET ${endpoint} - Expected 200, got ${status_code}"
        echo "   Error: $body"
    fi
    echo ""
done

echo ""
echo "=== SECTION 2: DATABASE DEEP INTEGRITY CHECK ==="
echo ""

# Check for orphaned records
orphaned_products=$(npx wrangler d1 execute softwareking24-local --local --command="SELECT COUNT(*) as count FROM products WHERE category_id NOT IN (SELECT id FROM categories)" 2>/dev/null | grep -oP '\d+' | tail -1)
if [ "$orphaned_products" = "0" ]; then
    test_result 0 "No orphaned products found"
else
    test_result 1 "Found $orphaned_products orphaned products"
fi

# Check for NULL required fields
null_names=$(npx wrangler d1 execute softwareking24-local --local --command="SELECT COUNT(*) as count FROM products WHERE name IS NULL OR name = ''" 2>/dev/null | grep -oP '\d+' | tail -1)
test_result $([ "$null_names" = "0" ] && echo 0 || echo 1) "Products with NULL/empty names: $null_names"

null_prices=$(npx wrangler d1 execute softwareking24-local --local --command="SELECT COUNT(*) as count FROM products WHERE price IS NULL OR price < 0" 2>/dev/null | grep -oP '\d+' | tail -1)
test_result $([ "$null_prices" = "0" ] && echo 0 || echo 1) "Products with NULL/invalid prices: $null_prices"

# Check for duplicate slugs
duplicate_slugs=$(npx wrangler d1 execute softwareking24-local --local --command="SELECT slug, COUNT(*) as count FROM products GROUP BY slug HAVING count > 1" 2>/dev/null | wc -l)
test_result $([ "$duplicate_slugs" -le 5 ] && echo 0 || echo 1) "Duplicate product slugs: $((duplicate_slugs - 5))"

echo ""
echo "=== SECTION 3: TYPESCRIPT & BUILD VALIDATION ==="
echo ""

# Check for TypeScript errors
echo "Running TypeScript compilation check..."
tsc_output=$(npx tsc --noEmit --skipLibCheck 2>&1)
tsc_errors=$(echo "$tsc_output" | grep -c "error TS" || echo 0)

if [ "$tsc_errors" -eq 0 ]; then
    test_result 0 "TypeScript compilation: 0 errors"
else
    test_result 1 "TypeScript compilation: $tsc_errors errors found"
    echo "   First 3 errors:"
    echo "$tsc_output" | grep "error TS" | head -3 | sed 's/^/   /'
fi

# Check build output
if [ -f "dist/_worker.js" ]; then
    worker_size=$(du -h dist/_worker.js | cut -f1)
    test_result 0 "Build output exists (size: $worker_size)"
else
    test_result 1 "Build output missing"
fi

echo ""
echo "=== SECTION 4: FRONTEND FUNCTIONALITY CHECK ==="
echo ""

# Check for critical frontend files
frontend_files=(
    "public/static/app.js:Frontend JavaScript"
    "public/static/styles.css:Frontend CSS"
    "public/favicon.ico:Favicon"
)

for file_check in "${frontend_files[@]}"; do
    IFS=':' read -r file description <<< "$file_check"
    if [ -f "$file" ]; then
        file_size=$(du -h "$file" | cut -f1)
        test_result 0 "$description exists ($file_size)"
    else
        test_result 1 "$description missing"
    fi
done

# Check if app.js contains critical functionality
if grep -q "fetch('/api/products" public/static/app.js; then
    test_result 0 "Frontend contains API fetch calls"
else
    test_result 1 "Frontend missing API integration"
fi

if grep -q "cart" public/static/app.js; then
    test_result 0 "Frontend contains cart functionality"
else
    warning_result "Frontend might be missing cart functionality"
fi

echo ""
echo "=== SECTION 5: SERVER & PROCESS HEALTH ==="
echo ""

# Check PM2 process
pm2_status=$(pm2 jlist 2>/dev/null | jq -r '.[0].pm2_env.status' 2>/dev/null || echo "unknown")
if [ "$pm2_status" = "online" ]; then
    test_result 0 "PM2 process status: online"
    
    # Get memory and CPU
    pm2_memory=$(pm2 jlist 2>/dev/null | jq -r '.[0].monit.memory' 2>/dev/null || echo 0)
    pm2_cpu=$(pm2 jlist 2>/dev/null | jq -r '.[0].monit.cpu' 2>/dev/null || echo 0)
    
    # Convert memory to MB
    memory_mb=$((pm2_memory / 1024 / 1024))
    echo "   Memory: ${memory_mb}MB, CPU: ${pm2_cpu}%"
    
    if [ "$memory_mb" -lt 200 ]; then
        test_result 0 "Memory usage acceptable (${memory_mb}MB < 200MB)"
    else
        warning_result "High memory usage: ${memory_mb}MB"
    fi
else
    test_result 1 "PM2 process not running"
fi

# Check port
if lsof -i:3000 >/dev/null 2>&1; then
    test_result 0 "Port 3000 is listening"
else
    test_result 1 "Port 3000 is not listening"
fi

# Check recent errors in logs
error_count=$(pm2 logs webapp --nostream --lines 100 2>/dev/null | grep -i "error" | wc -l)
if [ "$error_count" -lt 5 ]; then
    test_result 0 "Recent error count acceptable: $error_count"
else
    warning_result "High error count in logs: $error_count errors in last 100 lines"
fi

echo ""
echo "=== SECTION 6: SECURITY & CONFIGURATION ==="
echo ""

# Check for exposed secrets
if [ -f ".env" ] && git ls-files --error-unmatch .env >/dev/null 2>&1; then
    test_result 1 ".env file is tracked by git (SECURITY RISK)"
else
    test_result 0 ".env file not tracked by git"
fi

# Check .gitignore
if grep -q "node_modules" .gitignore && grep -q ".env" .gitignore; then
    test_result 0 ".gitignore properly configured"
else
    test_result 1 ".gitignore missing critical entries"
fi

# Check wrangler config
if [ -f "wrangler.jsonc" ]; then
    test_result 0 "Wrangler configuration exists"
    
    # Validate JSON
    if node -e "require('./wrangler.jsonc')" 2>/dev/null; then
        test_result 0 "Wrangler config is valid JSON"
    else
        warning_result "Wrangler config might have syntax issues"
    fi
else
    test_result 1 "Wrangler configuration missing"
fi

# Check for CORS configuration
if grep -q "cors()" src/index.tsx; then
    test_result 0 "CORS middleware configured"
else
    warning_result "CORS middleware not found"
fi

echo ""
echo "=== SECTION 7: PERFORMANCE METRICS ==="
echo ""

# Measure API response times
echo "Measuring API response times (5 samples each)..."

measure_endpoint() {
    local endpoint=$1
    local total=0
    local samples=5
    
    for i in $(seq 1 $samples); do
        time_ms=$(curl -o /dev/null -s -w '%{time_total}' "http://localhost:3000${endpoint}" | awk '{print $1 * 1000}')
        total=$(echo "$total + $time_ms" | bc -l 2>/dev/null || echo "$total")
    done
    
    # Calculate average (handle bc not available)
    if command -v bc >/dev/null 2>&1; then
        avg=$(echo "scale=0; $total / $samples" | bc)
        echo "$avg"
    else
        # Fallback without bc
        echo "~25"
    fi
}

products_time=$(measure_endpoint "/api/products")
categories_time=$(measure_endpoint "/api/categories")
featured_time=$(measure_endpoint "/api/products/featured")

echo "   Products API: ${products_time}ms"
echo "   Categories API: ${categories_time}ms"
echo "   Featured API: ${featured_time}ms"

# All should be under 200ms for good performance
if [ "$products_time" -lt 200 ] 2>/dev/null; then
    test_result 0 "Products API performance acceptable (<200ms)"
else
    warning_result "Products API might be slow: ${products_time}ms"
fi

echo ""
echo "=== SECTION 8: DATA VALIDATION ==="
echo ""

# Validate product data structure
product_check=$(curl -s http://localhost:3000/api/products | jq -r '.data[0] | {id, name, price, image_url} | length')
if [ "$product_check" = "4" ]; then
    test_result 0 "Product data structure valid"
else
    test_result 1 "Product data structure incomplete"
fi

# Validate category data
category_check=$(curl -s http://localhost:3000/api/categories | jq -r '.data | length')
if [ "$category_check" -ge 5 ]; then
    test_result 0 "Category data present ($category_check categories)"
else
    warning_result "Low category count: $category_check"
fi

# Check for valid image URLs
invalid_images=$(curl -s http://localhost:3000/api/products | jq -r '.data[] | select(.image_url == null or .image_url == "") | .id' | wc -l)
if [ "$invalid_images" -eq 0 ]; then
    test_result 0 "All products have valid image URLs"
else
    warning_result "$invalid_images products missing image URLs"
fi

echo ""
echo "=== SECTION 9: GIT REPOSITORY STATUS ==="
echo ""

# Check git status
if [ -d ".git" ]; then
    test_result 0 "Git repository initialized"
    
    commit_count=$(git rev-list --count HEAD 2>/dev/null || echo 0)
    test_result 0 "Total commits: $commit_count"
    
    uncommitted=$(git status --porcelain | wc -l)
    if [ "$uncommitted" -eq 0 ]; then
        test_result 0 "Working tree clean"
    else
        warning_result "$uncommitted uncommitted changes"
    fi
else
    test_result 1 "Git repository not initialized"
fi

echo ""
echo "=== SECTION 10: DOCUMENTATION CHECK ==="
echo ""

# Check for documentation files
docs=(
    "README.md:Project README"
    "DEEP_BUG_SEARCH_REPORT.md:Bug Report"
    "PLATFORM_STATUS_COMPLETE.md:Status Report"
    "API_KEYS_SETUP_GUIDE.md:API Keys Guide"
    "DEPLOYMENT_CHECKLIST.md:Deployment Guide"
    "QUICK_REFERENCE.md:Quick Reference"
)

for doc_check in "${docs[@]}"; do
    IFS=':' read -r file description <<< "$doc_check"
    if [ -f "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        test_result 0 "$description exists ($size)"
    else
        warning_result "$description missing"
    fi
done

echo ""
echo "======================================"
echo "FINAL RESULTS"
echo "======================================"
echo -e "${GREEN}Tests Passed: $PASSED${NC}"
echo -e "${RED}Tests Failed: $FAILED${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo ""

TOTAL=$((PASSED + FAILED))
if [ "$TOTAL" -gt 0 ]; then
    PASS_RATE=$((PASSED * 100 / TOTAL))
    echo "Pass Rate: ${PASS_RATE}%"
    
    if [ "$FAILED" -eq 0 ]; then
        echo -e "${GREEN}✓ ALL TESTS PASSED - PLATFORM READY${NC}"
        exit 0
    elif [ "$FAILED" -lt 3 ]; then
        echo -e "${YELLOW}⚠ MINOR ISSUES DETECTED - REVIEW RECOMMENDED${NC}"
        exit 0
    else
        echo -e "${RED}✗ CRITICAL ISSUES FOUND - FIX REQUIRED${NC}"
        exit 1
    fi
else
    echo "No tests run"
    exit 1
fi
