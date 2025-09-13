// Universal Path Fixer - Run this script in the HTML head before any CSS/JS loads
(function() {
    'use strict';
    
    // Detect site base path for reverse proxy compatibility
    const currentPath = window.location.pathname;
    let siteBasePath = '';
    
    if (currentPath.includes('/pages/')) {
        const beforePages = currentPath.split('/pages/')[0];
        siteBasePath = beforePages === '' ? '' : beforePages;
    }
    
    // Only proceed if we detected a base path (meaning we're in a subdirectory)
    if (siteBasePath) {
        console.log('Path fixer: Detected subdirectory deployment, base path:', siteBasePath);
        
        // Fix CSS links
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"][href^="../"]');
        cssLinks.forEach(link => {
            const originalHref = link.getAttribute('href');
            const newHref = siteBasePath + '/' + originalHref.substring(3); // Remove '../' and add base
            link.setAttribute('href', newHref);
            console.log(`Fixed CSS: ${originalHref} -> ${newHref}`);
        });
        
        // Fix script sources
        const scripts = document.querySelectorAll('script[src^="../"]');
        scripts.forEach(script => {
            const originalSrc = script.getAttribute('src');
            const newSrc = siteBasePath + '/' + originalSrc.substring(3); // Remove '../' and add base
            script.setAttribute('src', newSrc);
            console.log(`Fixed JS: ${originalSrc} -> ${newSrc}`);
        });
    } else {
        console.log('Path fixer: Standard deployment detected, no path fixes needed');
    }
})();