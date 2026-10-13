/*=============== MAIN JS ===============*/
document.addEventListener("DOMContentLoaded", async () => {
    // 1. Component Loading System
    
    // Base path for global components (navbar, footer, etc.)
    const globalPath = '/includes/';

    const defaultGlobalSections = [
        { id: 'navbar-container', url: `${globalPath}navbar.html` },
        { id: 'footer-container', url: `${globalPath}footer.html` },

        { id: 'switcher-container', url: `${globalPath}switcher.html` }
    ];

    let sections = [];
    if (window.PAGE_SECTIONS) {
        // Subpage mode: Combine global sections with custom subpage sections
        sections = defaultGlobalSections.concat(window.PAGE_SECTIONS);
    } else {
        // Homepage mode: Load all default sections
        sections = defaultGlobalSections.concat([
            { id: 'hero-container', url: `${globalPath}hero.html` },
            { id: 'projects-container', url: `${globalPath}projects.html` },
            { id: 'services-container', url: `${globalPath}services.html` },
            { id: 'resume-container', url: `${globalPath}resume.html` },
            { id: 'skills-container', url: `${globalPath}skills.html` },
            { id: 'contact-container', url: `${globalPath}contact.html` }
        ]);
    }

    async function loadSection(id, url) {
        try {
            const container = document.getElementById(id);
            if (!container) return;

            // Skip sections that are already present in the static HTML (crawler-friendly
            // server output). Re-loading them only wastes bandwidth and double-initialises
            // their scripts/Swiper instances.
            if (container.children.length > 0) return;

            // Cloudflare Pages 308-redirects ".html" URLs to their extensionless
            // equivalent ("clean URLs"). Fetch the redirect-free path directly so a
            // fragment load can never produce a redirection error.
            const fetchUrl = url.endsWith('.html') ? url.slice(0, -'.html'.length) : url;

            const response = await fetch(fetchUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            let html = await response.text();

            const baseUrl = fetchUrl.substring(0, fetchUrl.lastIndexOf('/') + 1);

            // Extract CSS links
            const styles = [];
            html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href=["']([^"']+)["'][^>]*>/gi, (match, href) => {
                styles.push(href);
                return '';
            });

            // Extract JS scripts
            const scripts = [];
            html = html.replace(/<script\b[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?<\/script>/gi, (match, src) => {
                scripts.push(src);
                return '';
            });

            // Replace container with cleaned HTML
            container.outerHTML = html;

            window._loadingStyles = window._loadingStyles || {};
            // Inject CSS
            styles.forEach(href => {
                const finalHref = href.startsWith('http') || href.startsWith('/') ? href : baseUrl + href;
                if (window._loadingStyles[finalHref]) return;
                window._loadingStyles[finalHref] = true;
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = finalHref;
                document.head.appendChild(link);
            });

            window._loadingScripts = window._loadingScripts || {};
            // Inject JS and wait for them to load
            const scriptPromises = scripts.map(src => {
                const finalSrc = src.startsWith('http') || src.startsWith('/') ? src : baseUrl + src;
                
                if (window._loadingScripts[finalSrc]) {
                    return window._loadingScripts[finalSrc]; // Return the existing promise
                }

                const promise = new Promise(resolve => {
                    const script = document.createElement('script');
                    script.src = finalSrc;
                    script.onload = resolve;
                    script.onerror = () => {
                        console.error(`Failed to load script: ${script.src}`);
                        resolve();
                    };
                    document.body.appendChild(script);
                });
                
                window._loadingScripts[finalSrc] = promise;
                return promise;
            });

            await Promise.all(scriptPromises);

        } catch (error) {
            console.error(`Failed to load section ${url} into ${id}:`, error);
        }
    }

    // Load all sections in parallel
    await Promise.all(sections.map(sec => loadSection(sec.id, sec.url)));

    // 2. Dispatch event for other scripts to initialize
    const event = new Event('componentsLoaded');
    document.dispatchEvent(event);
    window.__mskAppReady = true;

    // 3. Site Loader UI Logic
    const loader = document.getElementById('site-loader');
    const loaderProgress = document.getElementById('loader-progress');
    const loaderBar = document.getElementById('loader-bar');
    const logoWrapper = document.getElementById('loader-logo-wrapper');
    const navLogo = document.querySelector('.nav-logo');
    
    if (!loader || !loaderProgress || !logoWrapper) return;

    let progress = 0;
    let isWindowLoaded = false;
    
    // If window is already loaded by the time we get here (due to async await)
    if (document.readyState === 'complete') {
        isWindowLoaded = true;
    } else {
        window.addEventListener('load', () => {
            isWindowLoaded = true;
        });
    }

    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
        if (isWindowLoaded && progress >= 75) {
            progress += 5; // Finish faster if loaded
        } else {
            progress += Math.floor(Math.random() * 8) + 2;
        }

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(finishLoading, 200);
        }
        
        loaderProgress.textContent = `${progress}%`;
        if (loaderBar) loaderBar.style.width = `${progress}%`;
    }, 120);

    function finishLoading() {
        loader.classList.add('loaded');
        document.body.style.overflow = '';
        
        if (navLogo && logoWrapper) {
            const navRect = navLogo.getBoundingClientRect();
            const wrapperRect = logoWrapper.getBoundingClientRect();
            
            const wrapperCenterX = wrapperRect.left + wrapperRect.width / 2;
            const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2;
            
            // Target the center of the nav logo image
            const targetX = navRect.left + navRect.width / 2;
            const targetY = navRect.top + navRect.height / 2;
            
            const deltaX = targetX - wrapperCenterX;
            const deltaY = targetY - wrapperCenterY;
            
            const scale = 0.333; // Shrink it to 40px to perfectly match the navbar logo

            logoWrapper.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
            logoWrapper.style.opacity = '0';
        }

        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }
});


/*=============== BREADCRUMBS LOGIC ===============*/
document.addEventListener('componentsLoaded', () => {
    // Optionally dynamically inject breadcrumbs based on URL if not hardcoded
});


/*=============== SUBPAGES LOGIC ===============*/
document.addEventListener('componentsLoaded', () => {
    // General subpage initialization logic
    // Add any animations or specific observers for page content
});


/*=============== SIDEBAR LOGIC ===============*/
document.addEventListener('componentsLoaded', () => {
    // Add active class to current page in sidebar links
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.style.color = 'var(--first-color)';
            link.style.fontWeight = 'var(--font-bold)';
        }
    });
});


/*=============== GLOBAL SCRIPTS ===============*/
document.addEventListener('componentsLoaded', () => {
    /*=============== CATCH INVALID LINKS (404) ===============*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#' && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (!targetElement) {
                    // Target section doesn't exist on this page, redirect to 404
                    // (clean URL: /404.html 308-redirects to /404 on Cloudflare Pages)
                    e.preventDefault();
                    window.location.href = '/404';
                }
            }
        });
    });

    /*=============== SCROLL REVEAL ANIMATION ===============*/
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers or if reduced motion
        revealElements.forEach(el => el.classList.add('reveal-active'));
    }


});