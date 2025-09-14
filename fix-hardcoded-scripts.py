#!/usr/bin/env python3
"""
Fix hardcoded script src paths in club pages to use writeFixedJS()
"""

import os
import re
import glob

def fix_hardcoded_scripts(file_path):
    """Fix hardcoded script src paths"""
    print(f"Processing: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Replace hardcoded script tags with writeFixedJS calls
    # Pattern: <script src="../js/something.js" defer></script>
    pattern = r'<script\s+src="(\.\./js/[^"]+\.js)"([^>]*)></script>'
    
    def replace_script(match):
        src_path = match.group(1)  # ../js/mobile-enhancements.js
        attributes = match.group(2)  # defer, etc.
        
        # For now, just use writeFixedJS - we'll handle defer separately if needed
        return f'<script>writeFixedJS("{src_path}");</script>'
    
    content = re.sub(pattern, replace_script, content)
    
    # Write back if changed
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Fixed hardcoded scripts in {file_path}")
        return True
    else:
        print(f"  - No hardcoded scripts found in {file_path}")
        return False

def main():
    # Get all club HTML files
    club_files = glob.glob('pages/club-*.html')
    
    fixed_count = 0
    
    for file_path in club_files:
        if fix_hardcoded_scripts(file_path):
            fixed_count += 1
    
    print(f"\nFixed hardcoded scripts in {fixed_count} files.")

if __name__ == "__main__":
    main()