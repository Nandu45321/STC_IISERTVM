#!/usr/bin/env python3
"""
Fix remaining hardcoded page links and add page-link class for proper path resolution
"""

import os
import re
import glob

def fix_page_links(file_path):
    """Fix hardcoded page links by adding page-link class"""
    print(f"Processing: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # List of patterns to fix - links that should use page-link class
    fixes = [
        # Links to specific pages that should be in pages directory
        (r'<a href="(anvesha\.html|gallery\.html|clubs\.html|events\.html|leadership\.html|about\.html|credits\.html|club-[^"]+\.html)"([^>]*class="[^"]*)"', 
         r'<a href="\1"\2 page-link"'),
        
        # Links without existing class
        (r'<a href="(anvesha\.html|gallery\.html|clubs\.html|events\.html|leadership\.html|about\.html|credits\.html|club-[^"]+\.html)"([^>]*(?!class=)[^>]*)>', 
         r'<a href="\1" class="page-link"\2>'),
    ]
    
    changes_made = False
    
    for pattern, replacement in fixes:
        old_content = content
        content = re.sub(pattern, replacement, content)
        if content != old_content:
            changes_made = True
            print(f"  ✓ Applied pattern fix")
    
    # Write back if changed
    if changes_made:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Fixed page links in {file_path}")
        return True
    else:
        print(f"  - No page links to fix in {file_path}")
        return False

def main():
    # Get all page HTML files (excluding navbar which is handled separately)
    page_files = glob.glob('pages/*.html')
    page_files = [f for f in page_files if 'navbar.html' not in f]
    
    fixed_count = 0
    
    for file_path in page_files:
        if fix_page_links(file_path):
            fixed_count += 1
    
    print(f"\nFixed page links in {fixed_count} files.")

if __name__ == "__main__":
    main()