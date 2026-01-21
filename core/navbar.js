// Vyom Cloud Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // MOBILE NAVIGATION FUNCTIONALITY
    // ============================================
    
    // DOM Elements
    const mobileHamburger = document.getElementById('mobileHamburger');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileDropdownHeaders = document.querySelectorAll('.mobile-dropdown-header');
    
    // Toggle Mobile Sidebar
    function toggleMobileSidebar() {
        mobileHamburger.classList.toggle('active');
        mobileSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    }
    
    // Close Mobile Sidebar
    function closeMobileSidebar() {
        mobileHamburger.classList.remove('active');
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
        
        // Close all mobile dropdowns
        mobileDropdownHeaders.forEach(header => {
            header.parentElement.classList.remove('active');
        });
    }
    
    // Toggle Mobile Dropdown
    function toggleMobileDropdown(dropdown) {
        dropdown.classList.toggle('active');
        
        // Close other dropdowns
        mobileDropdownHeaders.forEach(otherHeader => {
            const otherDropdown = otherHeader.parentElement;
            if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                otherDropdown.classList.remove('active');
            }
        });
    }
    
    // Event Listeners for Mobile
    if (mobileHamburger) {
        mobileHamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileSidebar();
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }
    
    // Mobile Dropdown Functionality
    mobileDropdownHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileDropdown(this.parentElement);
        });
    });
    
    // ============================================
    // DESKTOP DROPDOWN FUNCTIONALITY
    // ============================================
    
    // Desktop dropdown elements
    const desktopDropdowns = document.querySelectorAll('.dropdown');
    const desktopDropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    const topSupportDropdown = document.querySelector('.top-support-dropdown');
    const topDropdownToggle = document.querySelector('.top-dropdown-toggle');
    
    // Close all desktop dropdowns
    function closeAllDesktopDropdowns() {
        desktopDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        if (topSupportDropdown) {
            topSupportDropdown.classList.remove('active');
        }
    }
    
    // Toggle desktop dropdown
    function toggleDesktopDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        closeAllDesktopDropdowns();
        if (!isActive) {
            dropdown.classList.add('active');
        }
    }
    
    // Desktop dropdown event listeners
    desktopDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = this.closest('.dropdown');
            toggleDesktopDropdown(dropdown);
        });
    });
    
    // Top support dropdown
    if (topDropdownToggle) {
        topDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isActive = topSupportDropdown.classList.contains('active');
            closeAllDesktopDropdowns();
            if (!isActive) {
                topSupportDropdown.classList.add('active');
            }
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.top-support-dropdown')) {
            closeAllDesktopDropdowns();
        }
    });
    
    // Close dropdowns on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDesktopDropdowns();
            closeMobileSidebar();
        }
    });
    
    // ============================================
    // ANNOUNCEMENT BAR ANIMATION
    // ============================================
    const toggleText = document.getElementById('toggleText');
    const messages = [
        "Advertise your business with Vyom Cloud",
        "Get 20% off on annual plans",
        "24/7 Customer Support Available",
        "New Data Centers in Europe & Asia"
    ];
    
    let currentMessageIndex = 0;
    
    function rotateAnnouncement() {
        if (toggleText) {
            toggleText.classList.add('slide-out');
            
            setTimeout(() => {
                currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                toggleText.textContent = messages[currentMessageIndex];
                toggleText.classList.remove('slide-out');
                toggleText.classList.add('slide-in');
                
                setTimeout(() => {
                    toggleText.classList.remove('slide-in');
                }, 500);
            }, 500);
        }
    }
    
    // Rotate announcement every 5 seconds
    if (toggleText) {
        setInterval(rotateAnnouncement, 5000);
    }
    
    // ============================================
    // WINDOW RESIZE HANDLER
    // ============================================
    function handleResize() {
        // Close mobile sidebar on resize to desktop
        if (window.innerWidth > 930) {
            closeMobileSidebar();
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('#')) {
                e.preventDefault();
                closeMobileSidebar();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        });
    });
    
    // ============================================
    // ACTIVE LINK HIGHLIGHTING
    // ============================================
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const allLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .mobile-dropdown-item');
        
        allLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            if (linkPath && currentPath.includes(linkPath.replace('/', ''))) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial setup
    setActiveLink();
    
    // ============================================
    // PERFORMANCE OPTIMIZATIONS
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            closeAllDesktopDropdowns();
        }, 250);
    });
});