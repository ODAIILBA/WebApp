#!/bin/bash

echo "======================================="
echo "COMPLETE FRONTEND FUNCTIONALITY TEST"
echo "======================================="
echo ""

PASSED=0
FAILED=0

test_result() {
  if [ $1 -eq 0 ]; then
    echo "   ✅ $2"
    ((PASSED++))
  else
    echo "   ❌ $2"
    ((FAILED++))
  fi
}

# Test 1: Homepage loads
echo "1. Homepage Loading"
html=$(curl -s http://localhost:3000/)
test_result $([ -n "$html" ] && echo 0 || echo 1) "Homepage HTML received"
test_result $(echo "$html" | grep -q "<!DOCTYPE html>" && echo 0 || echo 1) "Valid HTML structure"
test_result $(echo "$html" | grep -q "SoftwareKing24" && echo 0 || echo 1) "Brand name present"

# Test 2: Critical CDN resources
echo ""
echo "2. CDN Resources"
test_result $(echo "$html" | grep -q "tailwindcss" && echo 0 || echo 1) "Tailwind CSS CDN"
test_result $(echo "$html" | grep -q "fontawesome" && echo 0 || echo 1) "Font Awesome CDN"

# Test 3: Static files
echo ""
echo "3. Static Files"
files=(
  "/static/section-renderers.js"
  "/static/cart-manager-enhanced.js"
  "/static/search-autocomplete.js"
  "/static/search-autocomplete.css"
)

for file in "${files[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$file")
  test_result $([ "$status" = "200" ] && echo 0 || echo 1) "$file accessible"
done

# Test 4: API endpoints
echo ""
echo "4. API Endpoints"
apis=(
  "/api/products"
  "/api/products/featured"
  "/api/categories"
)

for api in "${apis[@]}"; do
  response=$(curl -s "http://localhost:3000$api")
  status=$(echo "$response" | jq -r '.success' 2>/dev/null)
  test_result $([ "$status" = "true" ] && echo 0 || echo 1) "$api returns success"
done

# Test 5: Dynamic content elements
echo ""
echo "5. Dynamic Content Elements"
test_result $(echo "$html" | grep -q "all-products-container" && echo 0 || echo 1) "All products container exists"
test_result $(echo "$html" | grep -q "addToCart" && echo 0 || echo 1) "Add to cart function present"
test_result $(echo "$html" | grep -q "loadAllProducts" && echo 0 || echo 1) "Product loader function present"

# Test 6: Navigation elements
echo ""
echo "6. Navigation Elements"
test_result $(echo "$html" | grep -q "shopping-cart" && echo 0 || echo 1) "Shopping cart icon present"
test_result $(echo "$html" | grep -q "search" && echo 0 || echo 1) "Search functionality present"

# Test 7: Check for broken images
echo ""
echo "7. Image Loading"
images=$(echo "$html" | grep -o 'src="[^"]*"' | wc -l)
echo "   ℹ️  Found $images image references"

# Test 8: JavaScript functionality
echo ""
echo "8. JavaScript Functions"
test_result $(echo "$html" | grep -q "addEventListener" && echo 0 || echo 1) "Event listeners present"
test_result $(echo "$html" | grep -q "async function" && echo 0 || echo 1) "Async functions present"

echo ""
echo "======================================="
echo "RESULTS: $PASSED passed, $FAILED failed"
if [ "$FAILED" -eq 0 ]; then
  echo "STATUS: ✅ ALL TESTS PASSED"
else
  echo "STATUS: ⚠️  $FAILED ISSUES FOUND"
fi
echo "======================================="

exit $FAILED

