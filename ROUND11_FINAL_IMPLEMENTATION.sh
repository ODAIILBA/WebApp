#!/bin/bash
echo "=== ROUND 11: ACTUALLY APPLY THE FIXES ==="
echo ""
echo "Previous rounds created tools. Now we USE them."
echo ""

# Phase 1: Run console cleanup
echo "Phase 1: Console Cleanup"
echo "========================"
echo ""
echo "Running actual console cleanup..."
./actual_console_cleanup.sh --backup 2>&1 | tee console_cleanup.log

echo ""
echo "Checking results..."
REMAINING=$(grep -rn "console\.log" src/ --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l)
echo "Remaining console.log statements: $REMAINING"
echo ""

# Phase 2: Check which files have most DB queries
echo "Phase 2: Database Error Analysis"
echo "================================="
echo ""
echo "Files with most database queries:"
for file in src/index.tsx src/api/*.tsx; do
  if [ -f "$file" ]; then
    count=$(grep -c "\.prepare(" "$file" 2>/dev/null || echo 0)
    if [ "$count" -gt 10 ]; then
      echo "  $file: $count queries"
    fi
  fi
done | sort -t: -k2 -rn | head -10
echo ""

# Phase 3: Check build health
echo "Phase 3: Build Health Check"
echo "============================"
echo ""
if [ -d "dist" ]; then
  echo "Current build exists:"
  echo "  Size: $(du -sh dist/ | cut -f1)"
  echo "  Worker: $(du -sh dist/_worker.js 2>/dev/null | cut -f1 || echo 'N/A')"
else
  echo "No build found. Run: npm run build"
fi
echo ""

# Phase 4: Security check
echo "Phase 4: Quick Security Scan"
echo "============================"
echo ""
echo "Checking for common security issues..."
echo ""

echo "1. Hardcoded passwords:"
grep -rn "password.*=.*['\"].\{8,\}" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | \
  grep -v "placeholder\|example\|type\|TODO" | wc -l
echo "   potential hardcoded passwords"

echo ""
echo "2. API keys:"
grep -rn "api.*key.*=.*['\"].\{20,\}" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | \
  grep -v "placeholder\|example\|YOUR_\|XXX" | wc -l
echo "   potential hardcoded API keys"

echo ""
echo "3. Secrets/tokens:"
grep -rn "secret.*=.*['\"].\{10,\}\|token.*=.*['\"].\{10,\}" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | \
  grep -v "placeholder\|example\|YOUR_\|XXX\|type" | wc -l
echo "   potential secrets/tokens"

echo ""
echo "4. Checking .env.example exists:"
if [ -f ".env.example" ]; then
  echo "   ✓ .env.example exists"
  lines=$(wc -l < .env.example)
  echo "   ($lines environment variables documented)"
else
  echo "   ✗ .env.example missing"
fi

echo ""
echo "=== Phase 5: File Size Analysis ==="
echo ""
echo "Largest source files (potential refactor targets):"
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  lines=$(wc -l < "$file" 2>/dev/null || echo 0)
  if [ "$lines" -gt 500 ]; then
    echo "$lines $file"
  fi
done | sort -rn | head -10

echo ""
echo "=== ROUND 11 ANALYSIS COMPLETE ==="
echo ""
echo "Summary:"
echo "  Console cleanup: Check console_cleanup.log"
echo "  Database queries: See analysis above"
echo "  Security: Review findings above"
echo "  Large files: Consider refactoring"
