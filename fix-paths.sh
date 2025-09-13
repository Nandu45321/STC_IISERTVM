#!/bin/bash

# Script to add path-fixer functionality to all HTML pages

# Path to the universal path-fixer script content
PATH_FIXER_SCRIPT='    <script>
    (function() {
        const currentPath = window.location.pathname;
        const isSubdirectory = currentPath.includes("/STC_IISERTVM/") || currentPath.includes("/pages/");
        const siteBasePath = isSubdirectory ? "/STC_IISERTVM/" : "/";
        
        function fixPath(originalPath) {
            if (originalPath.startsWith("http://") || originalPath.startsWith("https://") || originalPath.startsWith("//")) {
                return originalPath;
            }
            
            if (originalPath.startsWith("../")) {
                if (isSubdirectory) {
                    return siteBasePath + originalPath.substring(3);
                } else {
                    return originalPath;
                }
            } else if (originalPath.startsWith("./") || !originalPath.startsWith("/")) {
                if (isSubdirectory) {
                    return siteBasePath + "pages/" + originalPath.replace("./", "");
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

# List of files to process (excluding about.html and leadership.html which are already done)
FILES=(
    "/workspaces/STC_IISERTVM/pages/anvesha.html"
    "/workspaces/STC_IISERTVM/pages/club-ccit.html"
    "/workspaces/STC_IISERTVM/pages/club-cmit.html"
    "/workspaces/STC_IISERTVM/pages/club-compass.html"
    "/workspaces/STC_IISERTVM/pages/club-csit.html"
    "/workspaces/STC_IISERTVM/pages/club-esi.html"
    "/workspaces/STC_IISERTVM/pages/club-exhibita.html"
    "/workspaces/STC_IISERTVM/pages/club-parsec.html"
    "/workspaces/STC_IISERTVM/pages/club-proteus.html"
    "/workspaces/STC_IISERTVM/pages/club-psit.html"
    "/workspaces/STC_IISERTVM/pages/club-qsi.html"
    "/workspaces/STC_IISERTVM/pages/clubs.html"
    "/workspaces/STC_IISERTVM/pages/contact.html"
    "/workspaces/STC_IISERTVM/pages/credits.html"
    "/workspaces/STC_IISERTVM/pages/events.html"
    "/workspaces/STC_IISERTVM/pages/faq.html"
    "/workspaces/STC_IISERTVM/pages/gallery.html"
    "/workspaces/STC_IISERTVM/pages/updates.html"
)

echo "Processing ${#FILES[@]} HTML files..."

for file in "${FILES[@]}"; do
    echo "Processing: $file"
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Process the file with sed
    # 1. Add path-fixer script after <head> tag
    # 2. Convert <link rel="stylesheet" href="..."> to writeFixedCSS calls
    # 3. Convert <script src="..."> to writeFixedJS calls (but not the defer ones in head)
    
    sed -i '/<head>/a\
'"$PATH_FIXER_SCRIPT"'' "$file"
    
    # Convert CSS links to writeFixedCSS calls
    sed -i 's|<link rel="stylesheet" href="\([^"]*\)">|<script>writeFixedCSS('\''\1'\'');</script>|g' "$file"
    
    # Convert script tags to writeFixedJS calls, but be careful about defer scripts in head
    # We'll only convert script tags that don't have defer attribute and are simple src includes
    sed -i 's|<script src="\([^"]*\)"></script>|<script>writeFixedJS('\''\1'\'');</script>|g' "$file"
    
    echo "Completed: $file"
done

echo "All files processed successfully!"
echo "Backup files created with .backup extension"