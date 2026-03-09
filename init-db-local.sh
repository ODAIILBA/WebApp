#!/bin/bash

# ============================================
# Local Database Initialization Script
# For: SOFTWAREKING24 WebApp
# ============================================

set -e  # Exit on error

echo "🗄️  Initializing Local D1 Database..."
echo "=================================="
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Check if wrangler is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npm/npx not found. Please install Node.js first."
    exit 1
fi

echo "📋 Step 1: Checking database configuration..."
if [ -f "wrangler.jsonc" ]; then
    echo "✅ Found wrangler.jsonc"
else
    echo "❌ Error: wrangler.jsonc not found"
    exit 1
fi

echo ""
echo "📋 Step 2: Checking migrations directory..."
if [ -d "migrations" ]; then
    MIGRATION_COUNT=$(ls -1 migrations/*.sql 2>/dev/null | grep -v ".skip" | wc -l)
    echo "✅ Found $MIGRATION_COUNT migration files"
else
    echo "❌ Error: migrations directory not found"
    exit 1
fi

echo ""
echo "📋 Step 3: Applying migrations to local database..."
echo "This will create all tables in .wrangler/state/v3/d1/"
echo ""

# Apply migrations
npx wrangler d1 migrations apply webapp-production --local

echo ""
echo "📋 Step 4: Verifying database tables..."

# Create a test SQL file to verify tables
cat > /tmp/verify_db.sql << 'EOF'
-- List all tables
SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
EOF

echo ""
echo "Running verification query..."
npx wrangler d1 execute webapp-production --local --file=/tmp/verify_db.sql

echo ""
echo "✅ Database initialization complete!"
echo ""
echo "📝 Next steps:"
echo "1. Start the development server:"
echo "   npm run dev"
echo ""
echo "2. Or start with PM2:"
echo "   pm2 start ecosystem.config.cjs"
echo ""
echo "3. Access the application:"
echo "   http://localhost:5173"
echo ""
echo "4. Check database location:"
echo "   .wrangler/state/v3/d1/miniflare-D1DatabaseObject/"
echo ""

# Cleanup
rm -f /tmp/verify_db.sql
