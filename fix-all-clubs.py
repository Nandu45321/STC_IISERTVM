#!/usr/bin/env python3
"""
Fix all club pages by adding writeFixedImg function and converting hardcoded image paths
"""

import os
import re
import glob

def fix_club_page(file_path):
    """Fix a club page by adding writeFixedImg and converting images"""
    print(f"Fixing: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Add writeFixedImg function if missing
    if 'window.writeFixedImg = function' not in content:
        # Find the writeFixedJS function and add writeFixedImg after it
        pattern = r'(window\.writeFixedJS = function\(originalPath\) \{[^}]+\};\s*\)\(\);)'
        replacement = r'''window.writeFixedJS = function(originalPath) {
            const newPath = fixPath(originalPath);
            document.write('<script src="' + newPath + '"><\\/script>');
        };
        
        window.writeFixedImg = function(originalPath, altText) {
            const newPath = fixPath(originalPath);
            document.write('<img src="' + newPath + '" alt="' + altText + '">');
        };
    })();'''
        
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        print(f"  ✓ Added writeFixedImg function")
    
    # 2. Convert hardcoded img tags to writeFixedImg calls
    # Pattern to match img tags with src="../images/..." 
    img_pattern = r'<img\s+src="(\.\./images/[^"]+)"\s+alt="([^"]*)"([^>]*)>'
    
    def replace_img_tag(match):
        src_path = match.group(1)  # ../images/path/to/image.ext
        alt_text = match.group(2)  # alt text
        other_attrs = match.group(3)  # any other attributes
        
        # Create the replacement script tag
        return f'<script>writeFixedImg("{src_path}", "{alt_text}");</script>'
    
    # Replace img tags
    content = re.sub(img_pattern, replace_img_tag, content)
    
    # Write back if changed
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Fixed {file_path}")
        return True
    else:
        print(f"  - No changes needed in {file_path}")
        return False

def main():
    # Get all club HTML files
    club_files = glob.glob('pages/club-*.html')
    
    fixed_count = 0
    
    for file_path in club_files:
        if fix_club_page(file_path):
            fixed_count += 1
    
    print(f"\nFixed {fixed_count} club pages.")

if __name__ == "__main__":
    main()