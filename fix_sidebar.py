#!/usr/bin/env python3
import re

# Read the file
with open('src/index.tsx', 'r') as f:
    content = f.read()

# Define the pattern to find AdminSidebarAdvanced in JSX
pattern = r'\{AdminSidebarAdvanced\((.*?)\)\}'
replacement = r'<div dangerouslySetInnerHTML={{__html: AdminSidebarAdvanced(\1)}} />'

# Replace all occurrences
new_content = re.sub(pattern, replacement, content)

# Write back
with open('src/index.tsx', 'w') as f:
    f.write(new_content)

print("✅ Fixed all AdminSidebarAdvanced calls")
