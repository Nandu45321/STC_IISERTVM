// Universal Path Fixer for STC IISER TVM Website
// Fixes CSS, JS, and other resource paths for reverse proxy compatibility
(function() {
    'use strict';
    
    console.log('🔧 Universal Path Fixer loaded');
    
    // Detect site base path for reverse proxy compatibility
    const currentPath = window.location.pathname;
    let siteBasePath = '';
    
    if (currentPath.includes('/pages/')) {
        const beforePages = currentPath.split('/pages/')[0];
        siteBasePath = beforePages === '' ? '' : beforePages;
    }
    
    const isSubdirectory = siteBasePath !== '';
    
    console.log('Path detection:', {
        currentPath,
        siteBasePath,
        isSubdirectory
    });
    
    // Function to fix a relative path
    function fixPath(originalPath) {
        if (!originalPath || originalPath.startsWith('http') || !originalPath.startsWith('../')) {
            return originalPath;
        }
        
        if (isSubdirectory) {
            const relativePath = originalPath.substring(3); // Remove '../'
            return siteBasePath + '/' + relativePath;
        }
        
        return originalPath;
    }
    
    // Fix paths immediately if document is already loaded
    function fixExistingPaths() {
        // Fix CSS links
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"][href^="../"]');
        cssLinks.forEach(link => {
            const originalHref = link.getAttribute('href');
            const newHref = fixPath(originalHref);
            if (newHref !== originalHref) {
                link.setAttribute('href', newHref);
                console.log(`✅ Fixed CSS: ${originalHref} -> ${newHref}`);
            }
        });
        
        // Fix script sources
        const scripts = document.querySelectorAll('script[src^="../"]');
        scripts.forEach(script => {
            const originalSrc = script.getAttribute('src');
            const newSrc = fixPath(originalSrc);
            if (newSrc !== originalSrc) {
                script.setAttribute('src', newSrc);
                console.log(`✅ Fixed JS: ${originalSrc} -> ${newSrc}`);
            }
        });
        
        // Fix image sources
        const images = document.querySelectorAll('img[src^="../"]');
        images.forEach(img => {
            const originalSrc = img.getAttribute('src');
            const newSrc = fixPath(originalSrc);
            if (newSrc !== originalSrc) {
                img.setAttribute('src', newSrc);
                console.log(`✅ Fixed IMG: ${originalSrc} -> ${newSrc}`);
            }
        });
    }
    
    // Helper functions for HTML document.write (for use in head section)
    window.writeFixedCSS = function(originalPath) {
        const newPath = fixPath(originalPath);
        document.write('<link rel="stylesheet" href="' + newPath + '">');
        if (newPath !== originalPath) {
            console.log(`✅ Wrote CSS: ${originalPath} -> ${newPath}`);
        }
    };
    
    window.writeFixedJS = function(originalPath) {
        const newPath = fixPath(originalPath);
        document.write('<script src="' + newPath + '"><\/script>');
        if (newPath !== originalPath) {
            console.log(`✅ Wrote JS: ${originalPath} -> ${newPath}`);
        }
    };
    
    // Fix paths when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixExistingPaths);
    } else {
        fixExistingPaths();
    }
    
    // Also try to fix paths immediately for early-loaded elements
    if (document.head) {
        fixExistingPaths();
    }
    
    console.log('🚀 Path fixer initialized');
    
})();