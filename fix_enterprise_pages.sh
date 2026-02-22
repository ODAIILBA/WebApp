#!/bin/bash

# Function name mapping
declare -A func_names=(
    ["admin-api-management"]="AdminApiManagement"
    ["admin-data-migration"]="AdminDataMigration"
    ["admin-system-logs"]="AdminSystemLogs"
    ["admin-performance-monitor"]="AdminPerformanceMonitor"
    ["admin-database-manager"]="AdminDatabaseManager"
    ["admin-file-manager"]="AdminFileManager"
    ["admin-cdn-management"]="AdminCdnManagement"
    ["admin-cache-management"]="AdminCacheManagement"
    ["admin-queue-management"]="AdminQueueManagement"
    ["admin-rate-limiting"]="AdminRateLimiting"
    ["admin-load-balancer"]="AdminLoadBalancer"
    ["admin-security-audit"]="AdminSecurityAudit"
    ["admin-compliance"]="AdminCompliance"
    ["admin-multi-tenant"]="AdminMultiTenant"
    ["admin-white-label"]="AdminWhiteLabel"
    ["admin-api-gateway"]="AdminApiGateway"
    ["admin-service-mesh"]="AdminServiceMesh"
    ["admin-container-orchestration"]="AdminContainerOrchestration"
    ["admin-infrastructure-code"]="AdminInfrastructureCode"
    ["admin-cicd-pipeline"]="AdminCicdPipeline"
    ["admin-monitoring-stack"]="AdminMonitoringStack"
    ["admin-log-aggregation"]="AdminLogAggregation"
    ["admin-distributed-tracing"]="AdminDistributedTracing"
    ["admin-feature-flags"]="AdminFeatureFlags"
    ["admin-ab-testing"]="AdminAbTesting"
    ["admin-machine-learning"]="AdminMachineLearning"
    ["admin-data-warehouse"]="AdminDataWarehouse"
    ["admin-business-intelligence"]="AdminBusinessIntelligence"
    ["admin-advanced-search"]="AdminAdvancedSearch"
    ["admin-graphql-api"]="AdminGraphqlApi"
    ["admin-websocket-manager"]="AdminWebsocketManager"
)

echo "Fixing enterprise page components..."

for filename in "${!func_names[@]}"; do
    funcname="${func_names[$filename]}"
    filepath="src/components/${filename}.tsx"
    
    if [ ! -f "$filepath" ]; then
        echo "⚠️  File not found: $filepath"
        continue
    fi
    
    # Fix the broken export line
    sed -i "s/^export function \$(echo \${filename}.*$/export function ${funcname}() {/" "$filepath"
    
    # Also fix the title comment
    sed -i "1s/.*/\/\/ Admin ${funcname} Module/" "$filepath"
    
    echo "✅  Fixed $filepath"
done

echo ""
echo "✅ All enterprise pages fixed!"
