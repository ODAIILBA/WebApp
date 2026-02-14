#!/bin/bash
echo "=== ROUND 5: ADDITIONAL DEEP FIXES ==="
echo ""
echo "Searching for more issues to fix..."
echo ""

echo "1. CHECKING FOR BROKEN LINKS IN CODE..."
echo "----------------------------------------"
grep -r "href=\"#\"" src/ --include="*.tsx" --include="*.ts" | wc -l
echo "Placeholder links found (href='#')"

echo ""
echo "2. CHECKING FOR EMPTY FUNCTIONS..."
echo "----------------------------------"
grep -rn "{\s*}\s*$" src/ --include="*.tsx" --include="*.ts" | wc -l
echo "Potential empty functions found"

echo ""
echo "3. CHECKING FOR MISSING ALT TAGS ON IMAGES..."
echo "---------------------------------------------"
grep -r "<img" src/ --include="*.tsx" | grep -v "alt=" | wc -l
echo "Images without alt tags (accessibility issue)"

echo ""
echo "4. CHECKING FOR INLINE STYLES..."
echo "--------------------------------"
grep -r "style={{" src/ --include="*.tsx" | wc -l
echo "Inline styles found (should use Tailwind classes)"

echo ""
echo "5. CHECKING FOR MAGIC NUMBERS..."
echo "--------------------------------"
echo "Checking for hardcoded numbers that should be constants..."
grep -rn "\s[0-9]{3,}" src/ --include="*.tsx" --include="*.ts" | grep -v "//\|/\*\|px-\|py-\|text-\|w-\|h-" | head -5
echo "Sample magic numbers found"

echo ""
echo "6. CHECKING API ERROR HANDLING..."
echo "---------------------------------"
grep -rn "\.json()" src/index.tsx | wc -l
echo "API endpoints found"

grep -rn "try {" src/index.tsx | wc -l
echo "Try-catch blocks"

echo ""
echo "7. CHECKING FOR UNUSED VARIABLES..."
echo "-----------------------------------"
echo "This requires static analysis - checking for obvious cases..."
grep -rn "const .* =" src/ --include="*.ts" --include="*.tsx" | grep -v "=" | wc -l

echo ""
echo "8. CHECKING DATABASE TRANSACTION SAFETY..."
echo "-----------------------------------------"
echo "Checking for operations that should be in transactions..."
grep -rn "INSERT INTO" src/index.tsx | wc -l
echo "INSERT statements found"

grep -rn "BEGIN TRANSACTION\|db.batch" src/index.tsx | wc -l
echo "Transaction blocks found"

echo ""
echo "9. CHECKING FOR RATE LIMITING..."
echo "--------------------------------"
grep -rn "rate.limit\|rateLimit" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Rate limiting implementations found"

echo ""
echo "10. CHECKING FOR INPUT VALIDATION..."
echo "-----------------------------------"
grep -rn "req.json()" src/index.tsx | wc -l
echo "Request body parsing operations"

grep -rn "validate\|schema\|zod" src/index.tsx | wc -l
echo "Validation operations found"

echo ""
echo "11. CHECKING FOR MEMORY LEAKS..."
echo "--------------------------------"
echo "Checking for potential memory leak patterns..."
grep -rn "setInterval\|setTimeout" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Timer operations (check for cleanup)"

grep -rn "addEventListener" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Event listeners (check for removal)"

echo ""
echo "12. CHECKING FOR DEPRECATED PATTERNS..."
echo "---------------------------------------"
grep -rn "var " src/ --include="*.ts" --include="*.tsx" | wc -l
echo "'var' declarations (should use const/let)"

echo ""
echo "=== ROUND 5 SCAN COMPLETE ==="
