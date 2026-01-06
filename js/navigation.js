// Navigation JavaScript - Mobile Menu and Dropdowns
// Can be initialized multiple times for dynamic loading
window.initNavigation = function () {
    'use strict';

    // Mobile Menu Elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        if (!mobileMenu) return;

        const isOpen = !mobileMenu.classList.contains('translate-x-full');

        if (isOpen) {
            // Close menu
            mobileMenu.classList.add('translate-x-full');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('invisible', 'opacity-0');
            if (mobileMenuIcon) {
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        } else {
            // Open menu
            mobileMenu.classList.remove('translate-x-full');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('invisible', 'opacity-0');
            if (mobileMenuIcon) {
                mobileMenuIcon.classList.remove('fa-bars');
                mobileMenuIcon.classList.add('fa-times');
            }
            document.body.style.overflow = 'hidden';
        }
    }

    // Event Listeners for Mobile Menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }

    // Mobile Dropdown Accordions
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');

            // Toggle this dropdown
            if (content) content.classList.toggle('hidden');
            if (icon) icon.classList.toggle('rotate-180');
        });
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Close menu when clicking any link
            if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
                toggleMobileMenu();
            }
        });
    });

    // Smooth Scroll for all anchor links (only on index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Don't prevent default for just "#" or empty hrefs
                if (href === '#' || href === '') {
                    return;
                }

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navbar = document.getElementById('navbar');
                    const navHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                navbar.classList.remove('shadow-lg');
            } else {
                navbar.classList.add('shadow-lg');
            }

            lastScroll = currentScroll;
        });
    }

    // Highlight active section in navigation (only on index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        function highlightActiveSection() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            let current = '';
            const navHeight = navbar ? navbar.offsetHeight : 0;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionHeight = section.offsetHeight;

                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-secondary', 'dark:text-accent');
                const href = link.getAttribute('href');

                if (href && href === `#${current}`) {
                    link.classList.add('text-secondary', 'dark:text-accent');
                }
            });
        }

        // Throttle scroll event for performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    highlightActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial highlight
        highlightActiveSection();
    }
};

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initNavigation);
} else {
    window.initNavigation();
}
