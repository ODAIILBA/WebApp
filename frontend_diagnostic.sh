#!/bin/bash

echo "======================================="
echo "FRONTEND ISSUES DIAGNOSTIC"
echo "======================================="
echo ""

# Check 1: Homepage access
echo "1. Testing homepage..."
response=$(curl -s -w "\n%{http_code}" http://localhost:3000/)
status=$(echo "$response" | tail -1)
if [ "$status" = "200" ]; then
  echo "   ✅ Homepage loads (HTTP 200)"
else
  echo "   ❌ Homepage failed (HTTP $status)"
fi

# Check 2: Static files
echo ""
echo "2. Testing critical static files..."
files=(
  "/static/section-renderers.js"
  "/static/homepage-products-loader.js"
  "/static/cart-manager-enhanced.js"
  "/static/search-autocomplete.js"
  "/static/search-autocomplete.css"
)

for file in "${files[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$file")
  if [ "$status" = "200" ]; then
    echo "   ✅ $file (HTTP 200)"
  else
    echo "   ❌ $file (HTTP $status)"
  fi
done

# Check 3: API endpoints for frontend
echo ""
echo "3. Testing API endpoints used by frontend..."
apis=(
  "/api/products"
  "/api/products/featured"
  "/api/categories"
  "/api/brands"
)

for api in "${apis[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$api")
  if [ "$status" = "200" ]; then
    echo "   ✅ $api (HTTP 200)"
  else
    echo "   ❌ $api (HTTP $status)"
  fi
done

# Check 4: Check for 404s in recent logs
echo ""
echo "4. Checking for 404 errors in logs..."
not_found=$(pm2 logs webapp --nostream --lines 100 2>/dev/null | grep "404" | wc -l)
if [ "$not_found" -eq 0 ]; then
  echo "   ✅ No 404 errors found"
else
  echo "   ⚠️  Found $not_found 404 errors:"
  pm2 logs webapp --nostream --lines 100 2>/dev/null | grep "404" | tail -5
fi

# Check 5: Check for JavaScript errors
echo ""
echo "5. Checking for JavaScript errors in logs..."
js_errors=$(pm2 logs webapp --nostream --lines 100 2>/dev/null | grep -i "javascript\|syntax error\|unexpected token" | wc -l)
if [ "$js_errors" -eq 0 ]; then
  echo "   ✅ No JavaScript errors found"
else
  echo "   ⚠️  Found $js_errors JavaScript-related errors"
fi

# Check 6: Test if homepage contains expected elements
echo ""
echo "6. Checking homepage HTML structure..."
html=$(curl -s http://localhost:3000/)

checks=(
  "<!DOCTYPE html>:Document type"
  "<title>:Page title"
  "tailwindcss:Tailwind CSS"
  "fontawesome:Font Awesome"
  "axios:Axios library"
)

for check in "${checks[@]}"; do
  IFS=':' read -r pattern description <<< "$check"
  if echo "$html" | grep -q "$pattern"; then
    echo "   ✅ $description found"
  else
    echo "   ❌ $description MISSING"
  fi
done

# Check 7: Verify section-renderers.js
echo ""
echo "7. Checking section-renderers.js content..."
if [ -f "public/static/section-renderers.js" ]; then
  size=$(wc -c < public/static/section-renderers.js)
  lines=$(wc -l < public/static/section-renderers.js)
  echo "   ✅ File exists ($size bytes, $lines lines)"
  
  # Check if it has key functions
  if grep -q "renderHomepageSections\|loadHomepageProducts" public/static/section-renderers.js; then
    echo "   ✅ Contains expected functions"
  else
    echo "   ⚠️  Missing expected functions"
  fi
else
  echo "   ❌ File NOT FOUND"
fi

# Check 8: Console errors simulation
echo ""
echo "8. Testing JavaScript loading..."
html=$(curl -s http://localhost:3000/)
script_tags=$(echo "$html" | grep -o "<script" | wc -l)
link_tags=$(echo "$html" | grep -o "<link" | wc -l)
echo "   ℹ️  Found $script_tags <script> tags"
echo "   ℹ️  Found $link_tags <link> tags"

echo ""
echo "======================================="
echo "DIAGNOSTIC COMPLETE"
echo "======================================="

