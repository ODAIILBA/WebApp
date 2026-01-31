#!/bin/bash
echo "Testing all admin pages..."
echo ""

PAGES=(
  "/admin/categories"
  "/admin/brands"
  "/admin/attributes"
  "/admin/bundles"
  "/admin/volume-products"
  "/admin/inventory"
  "/admin/products/seo"
)

for page in "${PAGES[@]}"; do
  echo -n "Testing $page ... "
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$page")
  if [ "$status" = "200" ]; then
    echo "✅ $status"
  else
    echo "❌ $status"
  fi
done

echo ""
echo "All tests complete!"
