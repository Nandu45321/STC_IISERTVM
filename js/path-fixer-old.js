// Universal Path Fixer for STC IISER TVM Website
// Handles GitHub Pages, STC domain (students.iisertvm.ac.in/stc/), and other deployments

(function() {
    'use strict';
    
    console.log('🔧 Universal Path Fixer loaded');
    
    // Detect current deployment context
    const currentPath = window.location.pathname;
    const currentHost = window.location.host;
    const currentURL = window.location.href;
    
    // Specific detection for different deployments
    const isSTCDomain = currentHost === "students.iisertvm.ac.in" && currentPath.startsWith("/stc/");
    const isGitHubPages = currentHost.includes("github.io");
    const isLocalDev = currentHost === "localhost" || currentHost === "127.0.0.1";
    const isSubdirectoryDeployment = currentPath.includes("/STC_IISERTVM/");
    
    // Determine the base path based on deployment
    let siteBasePath = "/";
    if (isSTCDomain) {
        siteBasePath = "/stc/";
    } else if (isSubdirectoryDeployment) {
        siteBasePath = "/STC_IISERTVM/";
    }
    
    console.log('Deployment detection:', {
        host: currentHost,
        path: currentPath,
        isSTCDomain,
        isGitHubPages,
        isLocalDev,
        isSubdirectoryDeployment,
        siteBasePath
    });
    
    // Universal path fixing function
    function fixPath(originalPath) {
        if (!originalPath || originalPath.startsWith('http://') || originalPath.startsWith('https://') || originalPath.startsWith('//')) {
            return originalPath; // Already absolute or protocol-relative
        }
        
        // Handle different path types
        if (originalPath.startsWith('../')) {
            // Relative path going up from pages directory
            if (isSTCDomain || isSubdirectoryDeployment) {
                const relativePath = originalPath.substring(3); // Remove '../'
                return siteBasePath + relativePath;
            } else {
                return originalPath; // Keep as-is for GitHub Pages root deployment
            }
        } else if (originalPath.startsWith('./') || (!originalPath.startsWith('/') && !originalPath.includes(':'))) {
            // Relative path in current directory (pages/)
            if (isSTCDomain || isSubdirectoryDeployment) {
                const cleanPath = originalPath.replace('./', '');
                return siteBasePath + 'pages/' + cleanPath;
            } else {
                return originalPath; // Keep as-is for GitHub Pages root deployment
            }
        }
        
        return originalPath;
    }
    
    // Dynamic CSS loader
    window.writeFixedCSS = function(originalPath) {
        const newPath = fixPath(originalPath);
        document.write('<link rel="stylesheet" href="' + newPath + '">');
        console.log('✅ CSS:', originalPath, '->', newPath);
    };
    
    // Dynamic JS loader
    window.writeFixedJS = function(originalPath) {
        const newPath = fixPath(originalPath);
        document.write('<script src="' + newPath + '"><\/script>');
        console.log('✅ JS:', originalPath, '->', newPath);
    };
    
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
    
    // Export the fixPath function globally for other scripts to use
    window.fixPath = fixPath;
    
    // Apply fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixExistingPaths);
    } else {
        fixExistingPaths();
    }
    
    console.log('🔧 Path fixer configured for deployment:', isSTCDomain ? 'STC Domain' : isGitHubPages ? 'GitHub Pages' : isSubdirectoryDeployment ? 'Subdirectory' : 'Root');
    
})();
        
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