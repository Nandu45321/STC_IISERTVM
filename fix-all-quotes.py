#!/usr/bin/env python3

import glob
import re

def fix_all_html_files():
    """Fix writeFixedCSS and writeFixedJS functions in all HTML files"""
    
    pages_dir = "/workspaces/STC_IISERTVM/pages"
    
    for file_path in glob.glob(f"{pages_dir}/*.html"):
        if "navbar.html" in file_path:
            continue
            
        print(f"Fixing: {file_path}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fix writeFixedCSS function
        content = re.sub(
            r'window\.writeFixedCSS = function\(originalPath\) \{\s*const newPath = fixPath\(originalPath\);\s*document\.write\([^}]+\}',
            '''window.writeFixedCSS = function(originalPath) {
            const newPath = fixPath(originalPath);
            document.write('<link rel="stylesheet" href="' + newPath + '">');
        }''',
            content,
            flags=re.DOTALL
        )
        
        # Fix writeFixedJS function
        content = re.sub(
            r'window\.writeFixedJS = function\(originalPath\) \{\s*const newPath = fixPath\(originalPath\);\s*document\.write\([^}]+\}',
            '''window.writeFixedJS = function(originalPath) {
            const newPath = fixPath(originalPath);
            document.write('<script src="' + newPath + '"><\\/script>');
        }''',
            content,
            flags=re.DOTALL
        )
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✅ Fixed")

if __name__ == "__main__":
    fix_all_html_files()
    print("\n🎉 All HTML files fixed!")