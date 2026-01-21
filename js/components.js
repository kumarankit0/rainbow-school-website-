/* ============================================
   Rainbow Montessori School - Component Loader
   ============================================
   This script dynamically loads the navbar and
   footer components into any page.
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // Load Navbar
    loadComponent('navbar-placeholder', 'core/navbar.html');

    // Load Footer
    loadComponent('footer-placeholder', 'core/footer.html');

});

/**
 * Loads an HTML component into a placeholder element
 * @param {string} placeholderId - The ID of the placeholder element
 * @param {string} componentPath - The path to the HTML component file
 */
function loadComponent(placeholderId, componentPath) {
    const placeholder = document.getElementById(placeholderId);

    if (!placeholder) {
        console.warn(`Placeholder element #${placeholderId} not found`);
        return;
    }

    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${componentPath}: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            placeholder.innerHTML = html;

            // Dispatch custom event when component is loaded
            const event = new CustomEvent('componentLoaded', {
                detail: { component: placeholderId }
            });
            document.dispatchEvent(event);
        })
        .catch(error => {
            console.error(`Error loading component: ${error.message}`);
            // Optionally show fallback content
            placeholder.innerHTML = `<p style="color: red; text-align: center;">Failed to load component</p>`;
        });
}

/**
 * Listen for component load events (useful for initializing
 * component-specific functionality after loading)
 */
document.addEventListener('componentLoaded', function(e) {
    const componentName = e.detail.component;

    // Initialize mobile menu functionality when navbar loads
    if (componentName === 'navbar-placeholder') {
        initMobileMenu();
    }
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.navbar-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Toggle icon between menu and close
            const icon = menuBtn.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
            }
        });
    }
}
