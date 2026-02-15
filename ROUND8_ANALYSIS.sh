#!/bin/bash
echo "=== ROUND 8: TARGETED FIXES ANALYSIS ==="
echo ""
echo "Analyzing remaining actionable issues from all audit rounds..."
echo ""

# High Priority Issues from Previous Rounds
echo "=== HIGH PRIORITY ISSUES ==="
echo ""

echo "1. React .map() without keys (270 occurrences)"
grep -rn "\.map(\|\.map ((.*) =>" src/ --include="*.tsx" --include="*.ts" | \
  grep -v "key=" | head -20
echo ""

echo "2. Promises without .catch() (18-25 occurrences)"
grep -rn "fetch(\|axios\.\|\.then(" src/ --include="*.tsx" --include="*.ts" | \
  grep -v "\.catch(" | head -20
echo ""

echo "3. Loading states missing for HTTP requests"
grep -rn "fetch(\|axios\." src/ --include="*.tsx" --include="*.ts" | wc -l
echo "Total HTTP requests found"
grep -rn "loading\|isLoading\|setLoading" src/ --include="*.tsx" --include="*.ts" | wc -l
echo "Loading state implementations found"
echo ""

echo "=== MEDIUM PRIORITY ISSUES ==="
echo ""

echo "4. Commented code (459 lines) - Sample locations"
grep -rn "^[[:space:]]*//.*[a-zA-Z]" src/ --include="*.tsx" --include="*.ts" | \
  grep -v "^[[:space:]]*//" | head -10
echo ""

echo "5. Large functions (>100 lines)"
for file in $(find src -name "*.tsx" -o -name "*.ts"); do
  awk '/^(export )?(async )?(function|const.*=.*\(|const.*=.*async)/ {
    start=NR
    name=$0
  }
  /^}/ {
    if (start > 0 && NR - start > 100) {
      print FILENAME ":" start " - Function length: " (NR - start) " lines - " name
      start=0
    }
  }' "$file"
done | head -10
echo ""

echo "=== QUICK WINS ==="
echo ""

echo "6. Duplicate Tailwind classes - Top 10"
grep -roh 'className="[^"]*"' src/ --include="*.tsx" | \
  sed 's/className="//;s/"//' | sort | uniq -c | sort -rn | head -10
echo ""

echo "=== ANALYSIS COMPLETE ==="
