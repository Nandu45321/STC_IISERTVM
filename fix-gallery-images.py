#!/usr/bin/env python3
"""
Script to fix hardcoded image paths in gallery.html specifically.
"""

import re

def fix_gallery_images(content):
    """Convert hardcoded img tags with relative paths to use writeFixedImg."""
    # Pattern to match img tags with ../images/ paths in gallery.html
    pattern = r'<img\s+src="(\.\./images/[^"]+)"\s*(?:\n\s*)?(?:alt="([^"]*)")?(?:\s+[^>]*)?>'
    
    def replace_img(match):
        path = match.group(1)
        alt_text = match.group(2) if match.group(2) else 'Gallery Image'
        
        return f'<script>writeFixedImg(\'{path}\', \'{alt_text}\');</script>'
    
    return re.sub(pattern, replace_img, content, flags=re.MULTILINE)

def main():
    """Process gallery.html file."""
    filepath = "pages/gallery.html"
    
    print(f"Processing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Fix hardcoded img tags
    content = fix_gallery_images(content)
    
    # Only write if content changed
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Updated {filepath}")
        return True
    else:
        print(f"  - No changes needed for {filepath}")
        return False

if __name__ == "__main__":
    main()