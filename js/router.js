// Simple SPA Router
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
        this.currentView = null;
        this.init();
    }

    init() {
        // Handle browser back/forward buttons
        window.addEventListener('hashchange', () => {
            this.navigate();
        });

        // Handle initial load
        this.navigate();
    }

    addRoute(path, callback) {
        this.routes[path] = callback;
    }

    navigate() {
        // Get hash route or default to home
        const hash = window.location.hash || '#/home';
        const routeParts = hash.substring(2).split('/');
        const basePath = routeParts[0] || 'home';
        const params = {};
        
        // Extract parameters for routes that need them
        if (routeParts.length > 1) {
            params.id = routeParts[1];
        }
        
        // Update current route
        this.currentRoute = basePath;

        // Call destroy on current view if it exists
        if (this.currentView && typeof this.currentView.destroy === 'function') {
            this.currentView.destroy();
        }

        // Check if we have a view controller for this route
        if (window.viewControllers && window.viewControllers[basePath]) {
            this.currentView = window.viewControllers[basePath];
            this.currentView.init(params);
        } else if (this.routes[basePath]) {
            // Fallback to old route system
            this.routes[basePath]();
        } else {
            // Default to home if route not found
            if (window.viewControllers && window.viewControllers['home']) {
                this.currentView = window.viewControllers['home'];
                this.currentView.init();
            } else if (this.routes['home']) {
                this.routes['home']();
            }
        }

        // Update active nav link
        document.querySelectorAll('nav a[data-route]').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === '#' + hash || (hash === '#/home' && link.getAttribute('href') === '#/home')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
}

// Initialize router
const router = new Router();