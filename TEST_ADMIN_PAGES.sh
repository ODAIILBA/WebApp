#!/bin/bash

BASE_URL="https://3000-iajr1uzogojd35ozgn244-ea026bf9.sandbox.novita.ai"

echo "🧪 Testing Admin Panel Pages..."
echo ""

# Test key admin pages
PAGES=(
  "/admin/dashboard"
  "/admin/products"
  "/admin/orders"
  "/admin/customers"
  "/admin/licenses"
  "/admin/form-editor"
  "/admin/api-management"
  "/admin/system-logs"
)

PASSED=0
FAILED=0

for page in "${PAGES[@]}"; do
  echo -n "Testing $page ... "
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${page}")
  
  if [ "$STATUS" = "200" ]; then
    echo "✅ PASSED ($STATUS)"
    ((PASSED++))
  else
    echo "❌ FAILED ($STATUS)"
    ((FAILED++))
  fi
done

echo ""
echo "Test Summary:"
echo "  Passed: $PASSED"
echo "  Failed: $FAILED"
echo "  Total: $((PASSED + FAILED))"
