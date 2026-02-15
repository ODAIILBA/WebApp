#!/bin/bash
echo "=== ACTUAL CONSOLE STATEMENT REMOVAL ==="
echo ""

# Count before
BEFORE=$(grep -rn "console\." src/ --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l)
echo "Console statements before: $BEFORE"
echo ""

# Backup flag
CREATE_BACKUP=false

if [ "$1" == "--backup" ]; then
  CREATE_BACKUP=true
  echo "Backup mode enabled - will create .backup files"
fi

# Remove console.log only (keep error, warn, info for debugging)
echo "Removing console.log statements..."
find src/ \( -name "*.ts" -o -name "*.tsx" \) -type f | while read file; do
  if $CREATE_BACKUP; then
    cp "$file" "$file.backup"
  fi
  
  # Remove lines with only console.log
  sed -i '/^[[:space:]]*console\.log(/d' "$file"
  
  # Remove inline console.log (more aggressive)
  sed -i 's/console\.log([^)]*)[;,]*//' "$file"
done

# Count after
AFTER=$(grep -rn "console\.log" src/ --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l)
REMOVED=$((BEFORE - AFTER))

echo ""
echo "=== SUMMARY ==="
echo "Before: $BEFORE console statements"
echo "After: $AFTER console statements"  
echo "Removed: $REMOVED console.log statements"
echo ""

if $CREATE_BACKUP; then
  echo "Backups created with .backup extension"
  echo "To restore: find src/ -name '*.backup' -exec sh -c 'mv \"\$1\" \"\${1%.backup}\"' _ {} \\;"
  echo "To delete backups: find src/ -name '*.backup' -delete"
fi

echo ""
echo "Remaining console statements (error, warn, info):"
grep -rn "console\." src/ --include="*.tsx" --include="*.ts" 2>/dev/null | \
  grep -v "console\.log" | wc -l
echo "remaining (intentionally kept for debugging)"
