---
name: Order items and orders schema constraints
description: DB column names and CHECK constraints for orders/order_items tables
---

## orders table CHECK constraints
- `payment_status`: only `pending`, `completed`, `failed`, `refunded` (NOT `paid`)
- `order_status`: only `pending`, `processing`, `completed`, `cancelled`

## order_items table columns
- Uses `price` and `subtotal` — NOT `unit_price` and `total_price`
- Full schema: `id, order_id, product_id, product_name, product_sku, quantity, price, subtotal, license_key, created_at`

**Why:** Several attempted seeds failed silently because `payment_status='paid'` violated the CHECK constraint. The display template also used wrong column names (`unit_price`/`total_price`).

**How to apply:** Always check PRAGMA table_info or CREATE TABLE sql before seeding or reading from these tables.
