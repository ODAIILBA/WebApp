#!/bin/bash
echo "=== ROUND 10: DEEP CODE QUALITY & OPTIMIZATION ==="
echo ""
echo "Focus: Actually implement fixes, not just create tools"
echo ""

# 1. Check current build size and analyze
echo "1. BUILD SIZE ANALYSIS"
if [ -d "dist" ]; then
  echo "   Current dist/ size:"
  du -sh dist/
  echo ""
  echo "   Largest files in dist/:"
  find dist -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10
else
  echo "   dist/ not found - need to build first"
fi
echo ""

# 2. Find unused imports
echo "2. UNUSED IMPORTS CHECK"
echo "   Checking for unused imports in components..."
for file in src/components/*.tsx src/api/*.tsx; do
  if [ -f "$file" ]; then
    # Check for imports that are never used
    imports=$(grep "^import.*from" "$file" 2>/dev/null | grep -v "type" | wc -l)
    if [ "$imports" -gt 10 ]; then
      echo "   $file: $imports imports (may have unused ones)"
    fi
  fi
done | head -10
echo ""

# 3. Find files missing TypeScript types
echo "3. MISSING TYPE ANNOTATIONS"
echo "   Functions without return types..."
grep -rn "function.*(" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | \
  grep -v ": void\|: string\|: number\|: boolean\|: Promise\|: any\|JSX.Element" | \
  wc -l
echo "   functions without explicit return types"
echo ""

# 4. Check for console statements still present
echo "4. CONSOLE STATEMENTS"
grep -rn "console\." src/ --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l
echo "   console.* statements remaining"
echo ""

# 5. Find complex functions (>50 lines)
echo "5. COMPLEX FUNCTIONS (>50 lines)"
for file in src/index.tsx src/api/*.tsx src/components/*.tsx; do
  if [ -f "$file" ]; then
    awk '
      /^(export )?(async )?(function|const.*=.*\(|const.*=.*async)/ {
        start=NR; name=$0; file=FILENAME
      }
      /^}/ {
        if (start > 0 && NR - start > 50) {
          printf "%s:%d (%d lines)\n", file, start, NR - start
        }
        start=0
      }
    ' "$file"
  fi
done | head -15
echo ""

# 6. SQL queries without proper error handling
echo "6. DATABASE ERROR HANDLING"
echo "   DB prepare statements..."
grep -rn "\.prepare(" src/ --include="*.tsx" 2>/dev/null | wc -l
echo "   total prepare statements"
grep -rn "try.*prepare\|prepare.*catch" src/ --include="*.tsx" 2>/dev/null | wc -l
echo "   wrapped in try-catch"
echo ""

# 7. Check for proper HTTP status codes
echo "7. HTTP STATUS CODES"
echo "   Using proper status codes..."
grep -rn "\.json({" src/ --include="*.tsx" 2>/dev/null | grep -c "404\|401\|403\|500\|400"
echo "   responses with explicit status codes"
grep -rn "\.json({" src/ --include="*.tsx" 2>/dev/null | wc -l
echo "   total JSON responses"
echo ""

# 8. Find hardcoded credentials or tokens
echo "8. SECURITY SCAN"
echo "   Looking for potential secrets..."
grep -rn "password.*=.*['\"].\|api.*key.*=.*['\"].\|secret.*=.*['\"].\|token.*=.*['\"]." src/ \
  --include="*.tsx" --include="*.ts" 2>/dev/null | \
  grep -v "placeholder\|example\|TODO\|FIXME" | wc -l
echo "   potential hardcoded credentials found"
echo ""

# 9. Check for proper validation
echo "9. INPUT VALIDATION COVERAGE"
echo "   POST/PUT handlers..."
grep -rn "app\.post\|app\.put\|\.post(\|\.put(" src/index.tsx src/api/ 2>/dev/null | wc -l
echo "   total POST/PUT endpoints"
echo ""
echo "   Validation usage..."
grep -rn "validate\|schema\|parse\|safeParse" src/index.tsx src/api/ 2>/dev/null | wc -l
echo "   endpoints with validation"
echo ""

# 10. Memory leak indicators
echo "10. MEMORY LEAK INDICATORS"
echo "    Event listeners..."
grep -rn "addEventListener" src/ --include="*.tsx" 2>/dev/null | wc -l
echo "    addEventListener calls"
grep -rn "removeEventListener" src/ --include="*.tsx" 2>/dev/null | wc -l
echo "    removeEventListener calls"
echo ""

echo "=== ANALYSIS COMPLETE ==="
echo ""
echo "Priority Actions:"
echo "1. Remove console statements (133 found)"
echo "2. Add error handling to DB queries"
echo "3. Add validation to POST/PUT endpoints"
echo "4. Add proper HTTP status codes"
echo "5. Refactor complex functions"
