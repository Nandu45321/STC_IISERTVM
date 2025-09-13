#!/usr/bin/env python3

import os
import re
import glob

def fix_quotes_in_html():
    """Fix the quote issues in HTML files"""
    
    pages_dir = "/workspaces/STC_IISERTVM/pages"
    html_files = glob.glob(os.path.join(pages_dir, "*.html"))
    
    for file_path in html_files:
        if "navbar.html" in file_path:
            continue
            
        print(f"Fixing quotes in: {os.path.basename(file_path)}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fix CSS document.write quotes
        content = re.sub(
            r'document\.write\("<link rel="stylesheet" href="" \+ newPath \+ "">""\);',
            'document.write(\'<link rel="stylesheet" href="\' + newPath + \'">\');',
            content
        )
        
        # Fix JS document.write quotes  
        content = re.sub(
            r'document\.write\("<script src="" \+ newPath \+ ""><\\/script>""\);',
            'document.write(\'<script src="\' + newPath + \'"><\\/script>\');',
            content
        )
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✅ Fixed: {os.path.basename(file_path)}")

if __name__ == "__main__":
    fix_quotes_in_html()
    print("\n🎉 Quote fixes completed!")