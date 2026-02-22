#!/bin/bash

BASE_URL="https://3000-iajr1uzogojd35ozgn244-ea026bf9.sandbox.novita.ai"

echo "Testing Enterprise Feature Pages..."
echo ""

# Array of routes to test
routes=(
    "/admin/form-editor"
    "/admin/workflow-automation"
    "/admin/api-management"
    "/admin/data-migration"
    "/admin/system-logs"
    "/admin/performance-monitor"
    "/admin/database-manager"
    "/admin/file-manager"
    "/admin/cdn-management"
    "/admin/cache-management"
    "/admin/queue-management"
    "/admin/rate-limiting"
    "/admin/load-balancer"
    "/admin/security-audit"
    "/admin/compliance"
    "/admin/multi-tenant"
    "/admin/white-label"
    "/admin/api-gateway"
    "/admin/service-mesh"
    "/admin/container-orchestration"
    "/admin/infrastructure-code"
    "/admin/cicd-pipeline"
    "/admin/monitoring-stack"
    "/admin/log-aggregation"
    "/admin/distributed-tracing"
    "/admin/feature-flags"
    "/admin/ab-testing"
    "/admin/machine-learning"
    "/admin/data-warehouse"
    "/admin/business-intelligence"
    "/admin/advanced-search"
    "/admin/graphql-api"
    "/admin/websocket-manager"
)

passed=0
failed=0

for route in "${routes[@]}"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${route}")
    if [ "$status" = "200" ]; then
        echo "✅  $route"
        ((passed++))
    else
        echo "❌  $route (Status: $status)"
        ((failed++))
    fi
done

echo ""
echo "============================================"
echo "Test Results:"
echo "  ✅ Passed: $passed"
echo "  ❌ Failed: $failed"
echo "  📊 Total:  $((passed + failed))"
echo "============================================"
