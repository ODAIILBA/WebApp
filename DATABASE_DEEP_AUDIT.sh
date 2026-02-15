#!/bin/bash
echo "=== DATABASE DEEP AUDIT - Round 12 ==="
echo ""
echo "Focus: Find and fix actual database issues"
echo ""

# Check if we can access the database
if [ ! -d ".wrangler" ]; then
  echo "⚠️  No .wrangler directory found. Need to run migrations first."
  echo ""
fi

# 1. Check migration files
echo "1. MIGRATION FILES ANALYSIS"
echo "==========================="
echo ""
if [ -d "migrations" ]; then
  echo "Migration files:"
  ls -lh migrations/*.sql 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'
  echo ""
  echo "Total migrations: $(ls migrations/*.sql 2>/dev/null | wc -l)"
else
  echo "⚠️  No migrations directory found"
fi
echo ""

# 2. Check for foreign key issues in migrations
echo "2. FOREIGN KEY VALIDATION"
echo "========================="
echo ""
if [ -d "migrations" ]; then
  echo "Checking foreign key definitions..."
  grep -n "FOREIGN KEY\|REFERENCES" migrations/*.sql 2>/dev/null | head -20
  echo ""
  echo "Total foreign keys: $(grep -c "FOREIGN KEY\|REFERENCES" migrations/*.sql 2>/dev/null)"
else
  echo "No migrations to check"
fi
echo ""

# 3. Check for missing indexes on foreign keys
echo "3. INDEX ANALYSIS"
echo "================="
echo ""
if [ -d "migrations" ]; then
  echo "Existing indexes:"
  grep -n "CREATE INDEX" migrations/*.sql 2>/dev/null | wc -l
  echo "indexes found in migrations"
  echo ""
  
  echo "Foreign keys without indexes:"
  # This is a rough check - would need actual DB to be precise
  grep "FOREIGN KEY" migrations/*.sql 2>/dev/null | grep -v "CREATE INDEX" | wc -l
  echo "potential missing indexes"
fi
echo ""

# 4. Check database queries in code
echo "4. DATABASE QUERY PATTERNS"
echo "=========================="
echo ""

echo "4.1 SELECT queries without WHERE clause (potential full table scans):"
grep -rn "SELECT.*FROM" src/index.tsx 2>/dev/null | \
  grep -v "WHERE\|LIMIT\|JOIN" | \
  head -10
echo ""

echo "4.2 Queries without LIMIT (potential large result sets):"
grep -rn "SELECT.*FROM.*WHERE" src/index.tsx 2>/dev/null | \
  grep -v "LIMIT\|OFFSET" | \
  wc -l
echo "queries without pagination"
echo ""

echo "4.3 N+1 query patterns (queries inside loops):"
grep -rn "for.*{" src/index.tsx -A 10 2>/dev/null | \
  grep -c "prepare\|SELECT"
echo "potential N+1 queries"
echo ""

# 5. Check for proper transactions
echo "5. TRANSACTION USAGE"
echo "===================="
echo ""
echo "Multi-statement operations that should use transactions:"
grep -rn "INSERT\|UPDATE\|DELETE" src/index.tsx 2>/dev/null | \
  grep -c "await.*prepare"
echo "write operations found"

echo ""
echo "BEGIN/COMMIT transaction usage:"
grep -rn "BEGIN\|COMMIT\|ROLLBACK" src/index.tsx 2>/dev/null | wc -l
echo "transaction statements found"
echo ""

# 6. Check table structure issues
echo "6. TABLE STRUCTURE VALIDATION"
echo "=============================="
echo ""
if [ -d "migrations" ]; then
  echo "Tables created:"
  grep "CREATE TABLE" migrations/*.sql 2>/dev/null | \
    sed 's/.*CREATE TABLE \([^ ]*\).*/\1/' | sort -u | wc -l
  echo "unique tables"
  echo ""
  
  echo "Sample table definitions:"
  grep "CREATE TABLE" migrations/*.sql 2>/dev/null | head -5
fi
echo ""

# 7. Check for data type issues
echo "7. DATA TYPE ANALYSIS"
echo "====================="
echo ""
if [ -d "migrations" ]; then
  echo "TEXT columns that might should be INTEGER:"
  grep -n "price.*TEXT\|amount.*TEXT\|quantity.*TEXT\|id.*TEXT" migrations/*.sql 2>/dev/null
  echo ""
  
  echo "Missing NOT NULL constraints:"
  grep "CREATE TABLE" migrations/*.sql -A 20 2>/dev/null | \
    grep -v "NOT NULL\|PRIMARY KEY" | \
    grep -c "INTEGER\|TEXT\|REAL"
  echo "columns without NOT NULL"
fi
echo ""

# 8. Check for missing timestamps
echo "8. TIMESTAMP AUDIT"
echo "=================="
echo ""
if [ -d "migrations" ]; then
  echo "Tables with created_at:"
  grep -l "created_at" migrations/*.sql 2>/dev/null | wc -l
  echo "migration files"
  
  echo ""
  echo "Tables with updated_at:"
  grep -l "updated_at" migrations/*.sql 2>/dev/null | wc -l
  echo "migration files"
  
  echo ""
  echo "Tables missing timestamps:"
  grep "CREATE TABLE" migrations/*.sql 2>/dev/null | \
    grep -v "created_at" | wc -l
  echo "tables potentially without timestamps"
fi
echo ""

# 9. Check for cascade delete issues
echo "9. CASCADE DELETE ANALYSIS"
echo "=========================="
echo ""
if [ -d "migrations" ]; then
  echo "Foreign keys with ON DELETE:"
  grep "ON DELETE" migrations/*.sql 2>/dev/null | wc -l
  echo "cascade rules defined"
  
  echo ""
  echo "Foreign keys WITHOUT cascade rules:"
  grep "FOREIGN KEY" migrations/*.sql 2>/dev/null | \
    grep -v "ON DELETE" | wc -l
  echo "foreign keys without cascade"
fi
echo ""

# 10. Check seed data
echo "10. SEED DATA CHECK"
echo "==================="
echo ""
if [ -f "seed.sql" ]; then
  echo "✓ seed.sql exists"
  echo "  Size: $(wc -l < seed.sql) lines"
  echo "  INSERT statements: $(grep -c "INSERT" seed.sql)"
else
  echo "⚠️  No seed.sql found"
fi
echo ""

echo "=== AUDIT COMPLETE ==="
echo ""
echo "Priority Issues to Fix:"
echo "1. Add indexes for foreign keys"
echo "2. Add pagination to queries without LIMIT"
echo "3. Add transactions for multi-statement operations"
echo "4. Add cascade delete rules"
echo "5. Verify data types are correct"
