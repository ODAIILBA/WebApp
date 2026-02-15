#!/bin/bash
# Find actual JSX .map() calls without keys
echo "=== Searching for JSX .map() calls without keys ==="

# Look for files that actually return JSX (have "return (" patterns)
for file in src/components/*.tsx src/api/*.tsx; do
  if [ -f "$file" ]; then
    # Check if file has JSX patterns
    if grep -q "return (" "$file" 2>/dev/null; then
      # Find .map calls in JSX context
      grep -n "\.map(" "$file" 2>/dev/null | grep -v "innerHTML" | grep -v "key=" | head -5
    fi
  fi
done

echo ""
echo "=== Checking specific components ==="

# Check a few common patterns
grep -rn "{.*\.map(" src/components/*.tsx 2>/dev/null | grep -v "key=" | grep -v "innerHTML" | head -10
