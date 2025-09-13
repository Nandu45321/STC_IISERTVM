#!/bin/bash

# Universal HTML Page Fixer for STC Website
# Applies path-fixing functionality to all HTML pages

echo "🔧 Starting universal HTML page fix for STC website..."

# The inline path-fixer script to inject into each page
INLINE_PATH_FIXER='    <script>
    (function() {
        const currentPath = window.location.pathname;
        const currentHost = window.location.host;
        
        // Specific detection for different deployments
        const isSTCDomain = currentHost === "students.iisertvm.ac.in" && currentPath.startsWith("/stc/");
        const isGitHubPages = currentHost.includes("github.io");
        const isSubdirectoryDeployment = currentPath.includes("/STC_IISERTVM/");
        
        // Determine the base path based on deployment
        let siteBasePath = "/";
        if (isSTCDomain) {
            siteBasePath = "/stc/";
        } else if (isSubdirectoryDeployment) {
            siteBasePath = "/STC_IISERTVM/";
        }
        
        function fixPath(originalPath) {
            if (!originalPath || originalPath.startsWith("http://") || originalPath.startsWith("https://") || originalPath.startsWith("//")) {
                return originalPath;
            }
            
            if (originalPath.startsWith("../")) {
                if (isSTCDomain || isSubdirectoryDeployment) {
                    const relativePath = originalPath.substring(3);
                    return siteBasePath + relativePath;
                } else {
                    return originalPath;
                }
            } else if (originalPath.startsWith("./") || (!originalPath.startsWith("/") && !originalPath.includes(":"))) {
                if (isSTCDomain || isSubdirectoryDeployment) {
                    const cleanPath = originalPath.replace("./", "");
                    return siteBasePath + "pages/" + cleanPath;
                } else {
                    return originalPath;
                }
            }
            
            return originalPath;
        }
        
        window.writeFixedCSS = function(originalPath) {
            const newPath = fixPath(originalPath);
            document.write("<link rel=\"stylesheet\" href=\"" + newPath + "\">");
        };
        
        window.writeFixedJS = function(originalPath) {
            const newPath = fixPath(originalPath);
            document.write("<script src=\"" + newPath + "\"><\/script>");
        };
    })();
    </script>'

# Get all HTML files in the pages directory (excluding navbar.html)
echo "📁 Finding HTML files to process..."
cd /workspaces/STC_IISERTVM/pages

# Create backups
echo "💾 Creating backups..."
for file in *.html; do
    if [[ "$file" != "navbar.html" && -f "$file" ]]; then
        cp "$file" "$file.backup-$(date +%Y%m%d-%H%M%S)"
    fi
done

# Process each HTML file
echo "🔄 Processing HTML files..."
for file in *.html; do
    if [[ "$file" != "navbar.html" && -f "$file" ]]; then
        echo "  Processing: $file"
        
        # Create a temporary file for processing
        temp_file="$file.temp"
        
        # Process the file line by line
        python3 -c "
import re
import sys

file_path = '$file'
temp_path = '$temp_file'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove any existing path-fixer scripts to avoid duplication
content = re.sub(r'<script>\s*\(function\(\)\s*\{.*?writeFixedJS.*?\}\)\(\);\s*</script>', '', content, flags=re.DOTALL)

# Add the inline path-fixer script after <head>
path_fixer = '''$INLINE_PATH_FIXER'''

# Insert after <head> tag
content = re.sub(r'(<head[^>]*>)', r'\1\n' + path_fixer, content)

# Convert CSS links to writeFixedCSS calls
content = re.sub(r'<link\s+rel=[\"\\']stylesheet[\"\\'][^>]*href=[\"\\']([^\"\\'>]+)[\"\\'][^>]*>', 
                lambda m: '<script>writeFixedCSS(\"' + m.group(1) + '\");</script>', content)

# Convert script tags to writeFixedJS calls (but preserve defer scripts and those without src)
content = re.sub(r'<script\s+src=[\"\\']([^\"\\'>]+)[\"\\'](?!\s+defer)[^>]*></script>', 
                lambda m: '<script>writeFixedJS(\"' + m.group(1) + '\");</script>', content)

# Write the processed content
with open(temp_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Processed {file_path}')
"
        
        # Replace the original file with the processed one
        if [[ -f "$temp_file" ]]; then
            mv "$temp_file" "$file"
            echo "    ✅ Updated: $file"
        else
            echo "    ❌ Error processing: $file"
        fi
    fi
done

echo ""
echo "🎉 Universal HTML page fix completed!"
echo "📊 Summary:"
echo "   - All HTML pages now have STC domain detection"
echo "   - CSS and JS paths will be automatically corrected"
echo "   - Backup files created with timestamp"
echo ""
echo "🌐 Supported deployments:"
echo "   ✅ GitHub Pages (github.io)"
echo "   ✅ STC Domain (students.iisertvm.ac.in/stc/)"
echo "   ✅ Subdirectory deployments (/STC_IISERTVM/)"
echo "   ✅ Root deployments"
echo ""
echo "🔍 Test your pages on: https://students.iisertvm.ac.in/stc/"