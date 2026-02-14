#!/bin/bash
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║          ROUND 6: EXTREME DEPTH AUDIT                      ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Going even deeper to find every possible issue..."
echo ""

echo "1. CHECKING FOR HARDCODED CREDENTIALS..."
echo "-----------------------------------------"
grep -rn "password.*=.*['\"]" src/ --include="*.ts" --include="*.tsx" | grep -v "process.env\|placeholder\|example\|TODO\|FIXME\|password_hash\|passwordField\|passwordInput\|passwordHint" | wc -l
echo "Potential hardcoded passwords (excluding safe patterns)"

echo ""
echo "2. CHECKING FOR BROKEN IMPORTS..."
echo "---------------------------------"
grep -rn "from ['\"]\..*['\"]" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Relative imports found"
echo "Checking for missing files..."
# This would need file existence checks

echo ""
echo "3. CHECKING FOR RACE CONDITIONS..."
echo "----------------------------------"
grep -rn "let.*=.*await" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Potential race condition patterns (mutable variables with await)"

echo ""
echo "4. CHECKING FOR MISSING ERROR BOUNDARIES..."
echo "-------------------------------------------"
grep -rn "class.*extends.*Component" src/ --include="*.tsx" | wc -l
echo "React class components"
grep -rn "componentDidCatch\|getDerivedStateFromError" src/ --include="*.tsx" | wc -l
echo "Error boundary implementations"

echo ""
echo "5. CHECKING FOR UNHANDLED PROMISE REJECTIONS..."
echo "-----------------------------------------------"
grep -rn "new Promise" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Promise creations"
grep -rn "\.catch(" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Catch handlers"

echo ""
echo "6. CHECKING FOR CIRCULAR DEPENDENCIES..."
echo "----------------------------------------"
echo "Analyzing import structure..."
grep -rn "^import.*from" src/ --include="*.ts" --include="*.tsx" | head -20
echo "(Sample imports shown - full analysis requires dependency graph)"

echo ""
echo "7. CHECKING FOR UNUSED EXPORTS..."
echo "---------------------------------"
grep -rn "^export.*function\|^export.*const\|^export.*class" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Total exports"

echo ""
echo "8. CHECKING FOR MISSING TYPES..."
echo "--------------------------------"
grep -rn ": any\[\]" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "any[] arrays"
grep -rn "as any" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Type assertions to 'any'"

echo ""
echo "9. CHECKING FOR PERFORMANCE ANTI-PATTERNS..."
echo "--------------------------------------------"
grep -rn "useEffect.*\[\]" src/ --include="*.tsx" | wc -l
echo "useEffect with empty deps (runs every render if not fixed)"
grep -rn "\.map.*\.map" src/ --include="*.tsx" | wc -l
echo "Nested .map() calls"
grep -rn "for.*for" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Nested for loops"

echo ""
echo "10. CHECKING FOR SECURITY HEADERS..."
echo "------------------------------------"
grep -rn "Content-Security-Policy\|X-Frame-Options\|X-Content-Type-Options" src/index.tsx | wc -l
echo "Security headers set"

echo ""
echo "11. CHECKING FOR CORS ISSUES..."
echo "-------------------------------"
grep -rn "cors()" src/index.tsx | wc -l
echo "CORS middleware usage"
grep -rn "Access-Control-Allow-Origin" src/index.tsx | wc -l
echo "CORS headers set"

echo ""
echo "12. CHECKING FOR DATABASE CONNECTION LEAKS..."
echo "---------------------------------------------"
grep -rn "\.prepare(" src/index.tsx | wc -l
echo "Database prepare statements"
grep -rn "\.finalize()\|\.close()" src/index.tsx | wc -l
echo "Explicit connection cleanup"

echo ""
echo "13. CHECKING FOR REGEX DOS VULNERABILITIES..."
echo "---------------------------------------------"
grep -rn "new RegExp\|\/.*\/" src/ --include="*.ts" --include="*.tsx" | grep -E "\*\+|\+\*|\{.*\}\+|\{\d+,\}" | wc -l
echo "Potentially vulnerable regex patterns"

echo ""
echo "14. CHECKING FOR XSS VULNERABILITIES..."
echo "---------------------------------------"
grep -rn "dangerouslySetInnerHTML\|innerHTML\|outerHTML" src/ --include="*.tsx" | wc -l
echo "Dangerous HTML operations"
grep -rn "eval(" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "eval() usage (dangerous)"

echo ""
echo "15. CHECKING FOR FILE UPLOAD SECURITY..."
echo "----------------------------------------"
grep -rn "multer\|formidable\|upload" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "File upload handling"

echo ""
echo "16. CHECKING FOR API RATE LIMITING..."
echo "-------------------------------------"
grep -rn "app\.get\|app\.post\|app\.put\|app\.delete" src/index.tsx | wc -l
echo "Total API endpoints"
grep -rn "rateLimit\|rate-limit" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Rate limiting implementations"

echo ""
echo "17. CHECKING FOR MISSING INDEXES..."
echo "-----------------------------------"
echo "Checking queries without indexed columns..."
grep -rn "WHERE.*=" src/index.tsx | grep -v "id = " | wc -l
echo "WHERE clauses on potentially non-indexed columns"

echo ""
echo "18. CHECKING FOR N+1 QUERY PROBLEMS..."
echo "--------------------------------------"
grep -rn "for.*of\|forEach" src/index.tsx | wc -l
echo "Loops in API handlers"
grep -rn "await.*prepare.*SELECT" src/index.tsx | wc -l
echo "SELECT queries"
echo "(Check for queries inside loops)"

echo ""
echo "19. CHECKING FOR MISSING PAGINATION..."
echo "--------------------------------------"
grep -rn "SELECT.*FROM" src/index.tsx | wc -l
echo "Total SELECT queries"
grep -rn "LIMIT\|OFFSET" src/index.tsx | wc -l
echo "Queries with pagination"

echo ""
echo "20. CHECKING FOR TIMEZONE ISSUES..."
echo "-----------------------------------"
grep -rn "new Date()\|Date\.now()" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Date operations"
grep -rn "toISOString\|toUTCString\|getTimezoneOffset" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Timezone-aware operations"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "              ROUND 6 EXTREME AUDIT COMPLETE"
echo "═══════════════════════════════════════════════════════════"
