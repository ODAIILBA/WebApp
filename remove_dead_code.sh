#!/bin/bash
echo "=== Round 8: Removing Commented Code ==="
echo ""

# Backup count
BACKUP_COUNT=0

# Process each TypeScript file
for file in $(find src -name "*.ts" -o -name "*.tsx"); do
  if [ -f "$file" ]; then
    # Count commented lines before
    BEFORE=$(grep -c "^[[:space:]]*//[[:space:]]*[a-zA-Z]" "$file" 2>/dev/null || echo 0)
    
    if [ "$BEFORE" -gt 0 ]; then
      # Create backup
      cp "$file" "$file.backup"
      BACKUP_COUNT=$((BACKUP_COUNT + 1))
      
      # Remove commented code lines (keep TODO, FIXME, NOTE, HACK, XXX comments)
      sed -i '/^[[:space:]]*\/\/[[:space:]]*[a-zA-Z]/!b; /TODO\|FIXME\|NOTE\|HACK\|XXX/!d' "$file"
      
      # Count after
      AFTER=$(grep -c "^[[:space:]]*//[[:space:]]*[a-zA-Z]" "$file" 2>/dev/null || echo 0)
      REMOVED=$((BEFORE - AFTER))
      
      if [ "$REMOVED" -gt 0 ]; then
        echo "✓ $file: Removed $REMOVED commented lines"
      fi
    fi
  fi
done

echo ""
echo "=== Summary ==="
echo "Files processed: $BACKUP_COUNT"
echo "Backups created in: *.backup"
echo ""
echo "To restore backups if needed:"
echo "  for f in src/**/*.backup; do mv \"\$f\" \"\${f%.backup}\"; done"
echo ""
echo "To delete backups:"
echo "  find src -name \"*.backup\" -delete"
