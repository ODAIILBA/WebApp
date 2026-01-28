# Security Implementation - Testing & Verification Guide

## Overview
This document provides comprehensive testing procedures for all security enhancements implemented in the Premium Software eCommerce Platform.

## Test Environment Setup

### 1. Local Development
```bash
# Build the project
npm run build

# Start development server
npm run dev:sandbox

# Or with PM2
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs
```

### 2. Database Setup
```bash
# Create D1 database (production)
npx wrangler d1 create webapp-production

# Apply migrations locally
npx wrangler d1 migrations apply webapp-production --local

# Seed test data
npx wrangler d1 execute webapp-production --local --file=./seed.sql
```

## Security Features Testing

### 1. CSRF Protection

#### Test 1.1: Valid CSRF Token
```bash
# Get CSRF token
TOKEN=$(curl -s http://localhost:3000/api/csrf-token | jq -r '.token')

# Make API request with token
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{"test": "data"}'

# Expected: 200 OK or valid response
```

#### Test 1.2: Missing CSRF Token
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Expected: 403 Forbidden - "CSRF token required"
```

#### Test 1.3: Invalid CSRF Token
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: invalid-token-12345" \
  -d '{"test": "data"}'

# Expected: 403 Forbidden - "Invalid CSRF token"
```

### 2. Rate Limiting

#### Test 2.1: Login Rate Limit (5 requests/15min)
```bash
# Rapid login attempts
for i in {1..6}; do
  echo "Attempt $i"
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
  echo ""
done

# Expected: First 5 succeed, 6th returns 429 Too Many Requests
```

#### Test 2.2: API Rate Limit (100 requests/min)
```bash
# Rapid API requests
for i in {1..102}; do
  curl -s http://localhost:3000/api/products > /dev/null
  echo -n "."
done
echo ""

# Expected: First 100 succeed, remaining return 429
```

#### Test 2.3: Admin Rate Limit (50 requests/min)
```bash
# Get admin token first
TOKEN="your-admin-bearer-token"

# Rapid admin requests
for i in {1..52}; do
  curl -s -H "Authorization: Bearer $TOKEN" \
    http://localhost:3000/api/admin/dashboard > /dev/null
  echo -n "."
done

# Expected: First 50 succeed, remaining return 429
```

### 3. Input Validation

#### Test 3.1: User Registration - Valid Data
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{
    "email": "newuser@example.com",
    "password": "StrongPass123!",
    "first_name": "John",
    "last_name": "Doe"
  }'

# Expected: 201 Created
```

#### Test 3.2: User Registration - Invalid Email
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{
    "email": "invalid-email",
    "password": "StrongPass123!",
    "first_name": "John",
    "last_name": "Doe"
  }'

# Expected: 400 Bad Request - "Invalid email format"
```

#### Test 3.3: User Registration - Weak Password
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{
    "email": "user@example.com",
    "password": "weak",
    "first_name": "John",
    "last_name": "Doe"
  }'

# Expected: 400 Bad Request - "Password must be at least 8 characters"
```

#### Test 3.4: SQL Injection Attempt
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{
    "email": "admin@test.com OR 1=1--",
    "password": "anything"
  }'

# Expected: 400 Bad Request or 401 Unauthorized (not SQL error)
```

#### Test 3.5: XSS Attempt
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{
    "name": "<script>alert(1)</script>",
    "email": "test@test.com",
    "subject": "Test",
    "message": "Test message"
  }'

# Expected: 400 Bad Request - "Invalid input" (XSS filtered)
```

### 4. Webhook Security

#### Test 4.1: Stripe Webhook - Valid Signature
```bash
# Generate valid Stripe signature (use Stripe CLI for real test)
PAYLOAD='{"type":"payment_intent.succeeded","data":{"object":{"id":"pi_test123"}}}'
TIMESTAMP=$(date +%s)
SECRET="whsec_test_secret"
SIGNATURE="t=$TIMESTAMP,v1=$(echo -n "$TIMESTAMP.$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" | cut -d' ' -f2)"

curl -X POST http://localhost:3000/api/payments/stripe/webhook \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: $SIGNATURE" \
  -d "$PAYLOAD"

# Expected: 200 OK - {"received": true}
```

#### Test 4.2: Stripe Webhook - Invalid Signature
```bash
curl -X POST http://localhost:3000/api/payments/stripe/webhook \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: t=1234567890,v1=invalidsignature" \
  -d '{"type":"payment_intent.succeeded","data":{}}'

# Expected: 401 Unauthorized - "Invalid signature"
```

#### Test 4.3: Stripe Webhook - Old Timestamp (Replay Attack)
```bash
# Use timestamp older than 5 minutes
OLD_TIMESTAMP=$(( $(date +%s) - 400 ))
PAYLOAD='{"type":"payment_intent.succeeded","data":{}}'
SIGNATURE="t=$OLD_TIMESTAMP,v1=$(echo -n "$OLD_TIMESTAMP.$PAYLOAD" | openssl dgst -sha256 -hmac "whsec_test_secret" | cut -d' ' -f2)"

curl -X POST http://localhost:3000/api/payments/stripe/webhook \
  -H "Stripe-Signature: $SIGNATURE" \
  -d "$PAYLOAD"

# Expected: 401 Unauthorized - "Webhook timestamp too old"
```

### 5. Payment Amount Validation

#### Test 5.1: Server-Side Amount Recalculation
```bash
# Create order (returns order_id)
ORDER_ID=$(curl -s -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{"items":[{"product_id":1,"quantity":1}]}' | jq -r '.order_id')

# Create payment intent (server recalculates amount)
curl -X POST http://localhost:3000/api/payments/stripe/create-intent \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d "{\"order_id\": $ORDER_ID}"

# Expected: Returns correct calculated amount
```

#### Test 5.2: Client-Side Amount Tampering (should fail)
```bash
# Try to create payment with fake amount (server ignores this)
curl -X POST http://localhost:3000/api/payments/stripe/create-intent \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{"order_id": 1, "amount": 100}'

# Expected: Server uses DB amount, not client amount
```

### 6. License Management

#### Test 6.1: License Assignment - Single Key
```bash
# Create admin session first
ADMIN_TOKEN="your-admin-token"

curl -X POST http://localhost:3000/api/admin/licenses/assign \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{
    "product_id": 1,
    "order_id": 1,
    "quantity": 1
  }'

# Expected: Returns assigned license key
```

#### Test 6.2: License Assignment - Concurrent Race Condition
```bash
# Simulate race condition (run 5 parallel requests)
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/admin/licenses/assign \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "X-CSRF-Token: $TOKEN" \
    -d '{"product_id":1,"order_id":1,"quantity":1}' &
done
wait

# Expected: Only one succeeds, others fail gracefully
```

#### Test 6.3: License Revocation
```bash
curl -X POST http://localhost:3000/api/admin/licenses/1/revoke \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{"reason": "User requested refund"}'

# Expected: License marked as revoked
```

#### Test 6.4: License Expiration Check
```bash
# Trigger expiration check manually
curl -X POST http://localhost:3000/api/admin/maintenance \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "X-CSRF-Token: $TOKEN"

# Expected: Expired licenses updated
```

### 7. VAT Calculation

#### Test 7.1: EU VAT - Germany (19%)
```bash
curl -X POST http://localhost:3000/api/orders/calculate \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{
    "country": "DE",
    "items": [{"product_id": 1, "quantity": 1, "price": 100}]
  }'

# Expected: VAT 19.00
```

#### Test 7.2: EU VAT - Valid VAT Number (0%)
```bash
curl -X POST http://localhost:3000/api/orders/calculate \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{
    "country": "FR",
    "vat_number": "FR12345678901",
    "items": [{"product_id": 1, "quantity": 1, "price": 100}]
  }'

# Expected: VAT 0.00 (reverse charge)
```

#### Test 7.3: EU VAT - Invalid VAT Number
```bash
curl -X POST http://localhost:3000/api/orders/calculate \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{
    "country": "FR",
    "vat_number": "INVALID",
    "items": [{"product_id": 1, "quantity": 1, "price": 100}]
  }'

# Expected: VAT 20.00 (French rate, VAT number rejected)
```

### 8. Audit Logging

#### Test 8.1: Check Audit Logs
```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:3000/api/admin/audit-logs?limit=10

# Expected: Returns recent audit log entries
```

#### Test 8.2: Security Events
```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:3000/api/admin/security-events?severity=high

# Expected: Returns high-severity security events
```

### 9. Session Management

#### Test 9.1: Session Cleanup
```bash
# Manually trigger cleanup
curl -X POST http://localhost:3000/api/admin/maintenance \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "X-CSRF-Token: $TOKEN"

# Check database
npx wrangler d1 execute webapp-production --local \
  --command="SELECT COUNT(*) FROM sessions WHERE expires_at < datetime('now')"

# Expected: 0 expired sessions
```

#### Test 9.2: Session Expiration
```bash
# Login
LOGIN_RESP=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{"email":"test@test.com","password":"password"}')

TOKEN=$(echo $LOGIN_RESP | jq -r '.token')

# Wait for expiration (or manually update DB to expire)
# Then try to use expired token
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/account/profile

# Expected: 401 Unauthorized - "Session expired"
```

### 10. Error Handling

#### Test 10.1: Generic Error (Production Mode)
```bash
# Trigger internal error
curl http://localhost:3000/api/trigger-error

# Expected: User-friendly message, no stack trace
```

#### Test 10.2: Development Mode Errors
```bash
# Set ENVIRONMENT=development
# Trigger error
curl http://localhost:3000/api/trigger-error

# Expected: Detailed error with stack trace
```

## Performance Testing

### 1. Load Test - License Assignment
```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Test concurrent license assignments
ab -n 100 -c 10 -p order.json -T application/json \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:3000/api/admin/licenses/assign
```

### 2. Load Test - Product Listing
```bash
ab -n 1000 -c 50 http://localhost:3000/api/products
```

### 3. Database Query Performance
```bash
# Check slow queries
npx wrangler d1 execute webapp-production --local \
  --command="EXPLAIN QUERY PLAN SELECT * FROM products WHERE is_active = 1"
```

## Security Checklist

- [ ] CSRF Protection working
- [ ] Rate limiting enforced
- [ ] Input validation preventing SQL injection
- [ ] Input validation preventing XSS
- [ ] Webhook signatures verified
- [ ] Payment amounts recalculated server-side
- [ ] License race conditions handled
- [ ] VAT calculations correct
- [ ] Audit logging capturing all events
- [ ] Session cleanup working
- [ ] Error messages sanitized (no info disclosure)
- [ ] Security headers present
- [ ] Brute force protection active

## Automated Testing

### Run All Tests
```bash
# Install test dependencies
npm install --save-dev @cloudflare/vitest-pool-workers

# Run tests
npm test
```

### Continuous Monitoring
```bash
# Set up cron for health checks
*/5 * * * * curl -s http://localhost:3000/health > /dev/null || echo "Service down"

# Monitor logs
pm2 logs webapp --nostream
```

## Production Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables set
- [ ] CLOUDFLARE_API_TOKEN configured
- [ ] STRIPE_WEBHOOK_SECRET set
- [ ] PAYPAL_WEBHOOK_ID set
- [ ] D1 database created and migrated
- [ ] Cron triggers configured
- [ ] Rate limits tuned for production load
- [ ] Audit logs enabled
- [ ] Error tracking configured
- [ ] Backup strategy in place

## Support & Monitoring

### Health Check
```bash
curl http://localhost:3000/health
```

### Metrics Endpoint
```bash
curl http://localhost:3000/api/admin/metrics \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Database Stats
```bash
npx wrangler d1 execute webapp-production --local \
  --command="SELECT 
    (SELECT COUNT(*) FROM users) as users,
    (SELECT COUNT(*) FROM orders) as orders,
    (SELECT COUNT(*) FROM license_keys) as licenses,
    (SELECT COUNT(*) FROM audit_logs) as audit_logs"
```

---

**Last Updated**: 2026-01-28  
**Version**: 2.0.0  
**Status**: Production-Ready
