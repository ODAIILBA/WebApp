#!/bin/bash
echo "=========================================="
echo "FINAL DATABASE VERIFICATION"
echo "=========================================="
echo ""

echo "1. Products Count:"
curl -s http://localhost:3000/api/products | jq '.data | length, .[0] | {name, price, category_name, brand_name}'
echo ""

echo "2. Featured Products Count:"
curl -s http://localhost:3000/api/products/featured | jq '.data | length'
echo ""

echo "3. New Products Count:"
curl -s http://localhost:3000/api/products/new | jq '.data | length'
echo ""

echo "4. Bestsellers Count:"
curl -s http://localhost:3000/api/products/bestsellers | jq '.data | length'
echo ""

echo "5. Categories Count:"
curl -s http://localhost:3000/api/categories | jq '.data | length, .[0] | {name, slug}'
echo ""

echo "6. Brands Count:"
curl -s http://localhost:3000/api/brands | jq '.brands | length, .[0] | {name, product_count}'
echo ""

echo "=========================================="
echo "✅ DATABASE VERIFICATION COMPLETE"
echo "=========================================="
