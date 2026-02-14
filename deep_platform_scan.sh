#!/bin/bash
echo "============================================"
echo "DEEP PLATFORM SCAN - Finding All Issues"
echo "============================================"
echo ""

echo "1. Testing ALL API Endpoints..."
echo "---"
endpoints=(
  "/api/products"
  "/api/products/featured"
  "/api/products/new"
  "/api/products/bestsellers"
  "/api/products/id/9"
  "/api/products/microsoft-office-2021-pro"
  "/api/categories"
  "/api/categories/office-software/products"
  "/api/brands"
  "/api/brands/featured"
  "/api/cart"
  "/api/products/search/autocomplete?q=office"
  "/admin/categories"
)

failed_endpoints=0
for endpoint in "${endpoints[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$endpoint")
  if [ "$status" -eq 200 ]; then
    echo "✅ $endpoint - $status"
  else
    echo "❌ $endpoint - $status"
    ((failed_endpoints++))
  fi
done
echo "Failed endpoints: $failed_endpoints"
echo ""

echo "2. Checking for JavaScript errors in frontend..."
echo "---"
# Check if frontend files exist and are valid
frontend_files=(
  "public/static/section-renderers.js"
  "public/static/cart-manager-enhanced.js"
  "public/static/search-autocomplete.js"
  "public/static/homepage-products-loader.js"
)

missing_files=0
for file in "${frontend_files[@]}"; do
  if [ -f "$file" ]; then
    size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    echo "✅ $file ($size bytes)"
  else
    echo "❌ $file - MISSING"
    ((missing_files++))
  fi
done
echo "Missing frontend files: $missing_files"
echo ""

echo "3. Checking database integrity..."
echo "---"
npx wrangler d1 execute webapp-production --local --command="
SELECT 
  'Products with NULL prices' as check_name,
  COUNT(*) as count 
FROM products 
WHERE base_price IS NULL OR base_price = 0;
" 2>&1 | grep -A 5 "results" | grep "count"

npx wrangler d1 execute webapp-production --local --command="
SELECT 
  'Products with NULL category_id' as check_name,
  COUNT(*) as count 
FROM products 
WHERE category_id IS NULL;
" 2>&1 | grep -A 5 "results" | grep "count"

npx wrangler d1 execute webapp-production --local --command="
SELECT 
  'Categories without translations' as check_name,
  COUNT(DISTINCT c.id) as count
FROM categories c
LEFT JOIN category_translations ct ON c.id = ct.category_id
WHERE ct.id IS NULL;
" 2>&1 | grep -A 5 "results" | grep "count"

echo ""

echo "4. Checking for TypeScript compilation errors..."
echo "---"
npm run build 2>&1 | grep -i "error" | head -5 || echo "✅ No TypeScript errors"
echo ""

echo "5. Checking PM2 logs for recent errors..."
echo "---"
pm2 logs webapp --nostream --lines 50 | grep -i "error\|fail\|exception" | tail -10 || echo "✅ No recent errors"
echo ""

echo "6. Testing database queries performance..."
echo "---"
start=$(date +%s%3N)
curl -s "http://localhost:3000/api/products" > /dev/null
end=$(date +%s%3N)
products_time=$((end - start))
echo "Products API: ${products_time}ms"

start=$(date +%s%3N)
curl -s "http://localhost:3000/api/categories" > /dev/null
end=$(date +%s%3N)
categories_time=$((end - start))
echo "Categories API: ${categories_time}ms"

echo ""
echo "7. Checking for missing indexes..."
echo "---"
npx wrangler d1 execute webapp-production --local --command="
SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='products';
" 2>&1 | grep -A 20 "results" | grep "name" | wc -l | xargs -I {} echo "Products table indexes: {}"

echo ""
echo "8. Checking for orphaned records..."
echo "---"
npx wrangler d1 execute webapp-production --local --command="
SELECT COUNT(*) as count FROM products p 
LEFT JOIN categories c ON p.category_id = c.id 
WHERE p.category_id IS NOT NULL AND c.id IS NULL;
" 2>&1 | grep -A 5 "results" | grep "count"

echo ""
echo "============================================"
echo "SCAN COMPLETE"
echo "============================================"
