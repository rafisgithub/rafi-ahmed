// Crystal Navigation functionality
function initializeNavigation() {
    const crystalMenuToggle = document.getElementById('crystal-menu-toggle');
    const crystalNavMenu = document.getElementById('crystal-nav-menu');
    const crystalNavItems = document.querySelectorAll('.crystal-nav-item');

    // Crystal menu toggle
    if (crystalMenuToggle && crystalNavMenu) {
        crystalMenuToggle.addEventListener('click', function() {
            crystalNavMenu.classList.toggle('active');
            crystalMenuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (crystalNavMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close crystal menu when clicking on links
    crystalNavItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close crystal menu
            crystalNavMenu.classList.remove('active');
            crystalMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            
            // Smooth scroll to section
            smoothScrollToSection(targetId);
            
            // Update active link
            updateActiveLink(this);
        });
    });

    // Close crystal menu when clicking outside or on backdrop
    document.addEventListener('click', function(e) {
        if (crystalMenuToggle && crystalNavMenu) {
            const navContent = crystalNavMenu.querySelector('.crystal-nav-content');
            if (!crystalMenuToggle.contains(e.target) && navContent && !navContent.contains(e.target)) {
                crystalNavMenu.classList.remove('active');
                crystalMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Handle escape key to close crystal menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && crystalNavMenu.classList.contains('active')) {
            crystalNavMenu.classList.remove('active');
            crystalMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling function
    function smoothScrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        const crystalNav = document.getElementById('crystal-nav');
        const navbarHeight = crystalNav ? crystalNav.offsetHeight : 80;
        const targetPosition = targetSection.offsetTop - navbarHeight - 10;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Update active navigation link
    function updateActiveLink(activeLink) {
        crystalNavItems.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // Initialize keyboard navigation
    initializeKeyboardNavigation();
}

// Keyboard navigation for accessibility
function initializeKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = (index + 1) % navLinks.length;
                    navLinks[targetIndex].focus();
                    break;
                    
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = index === 0 ? navLinks.length - 1 : index - 1;
                    navLinks[targetIndex].focus();
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    navLinks[0].focus();
                    break;
                    
                case 'End':
                    e.preventDefault();
                    navLinks[navLinks.length - 1].focus();
                    break;
            }
        });
    });
}

// Navigation state management
class NavigationState {
    constructor() {
        this.currentSection = 'home';
        this.previousSection = null;
        this.isNavigating = false;
    }

    updateSection(newSection) {
        this.previousSection = this.currentSection;
        this.currentSection = newSection;
        this.broadcastChange();
    }

    broadcastChange() {
        // Dispatch custom event for section change
        const event = new CustomEvent('sectionChanged', {
            detail: {
                current: this.currentSection,
                previous: this.previousSection
            }
        });
        document.dispatchEvent(event);
    }

    setNavigating(isNavigating) {
        this.isNavigating = isNavigating;
    }
}

// Initialize navigation state
const navigationState = new NavigationState();

// Listen for section changes
document.addEventListener('sectionChanged', function(e) {
    console.log(`Section changed from ${e.detail.previous} to ${e.detail.current}`);
    
    // You can add section-specific logic here
    handleSectionChange(e.detail.current, e.detail.previous);
});

function handleSectionChange(currentSection, previousSection) {
    // Add section-specific animations or logic
    switch(currentSection) {
        case 'projects':
            // Trigger project animations if needed
            break;
        case 'blog':
            // Ensure blog posts are loaded
            if (window.blogManager) {
                window.blogManager.ensurePostsLoaded();
            }
            break;
        case 'skills':
            // Animate skill bars if needed
            animateSkillBars();
            break;
    }
}

// Animate skill bars when skills section is visible
function animateSkillBars() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            
            requestAnimationFrame(() => {
                tag.style.transition = 'all 0.3s ease-out';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            });
        }, index * 50);
    });
}

// Breadcrumb navigation (if needed for blog posts)
class BreadcrumbNavigation {
    constructor() {
        this.breadcrumbContainer = this.createBreadcrumbContainer();
    }

    createBreadcrumbContainer() {
        const container = document.createElement('nav');
        container.className = 'breadcrumb-nav';
        container.setAttribute('aria-label', 'Breadcrumb');
        container.innerHTML = '<ol class="breadcrumb-list"></ol>';
        return container;
    }

    updateBreadcrumb(items) {
        const list = this.breadcrumbContainer.querySelector('.breadcrumb-list');
        list.innerHTML = '';

        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'breadcrumb-item';

            if (index === items.length - 1) {
                // Last item (current page)
                listItem.innerHTML = `<span aria-current="page">${item.text}</span>`;
            } else {
                // Navigation item
                listItem.innerHTML = `
                    <a href="${item.href}" class="breadcrumb-link">${item.text}</a>
                    <span class="breadcrumb-separator">/</span>
                `;
            }

            list.appendChild(listItem);
        });
    }

    show(parentElement) {
        if (parentElement && !parentElement.contains(this.breadcrumbContainer)) {
            parentElement.insertBefore(this.breadcrumbContainer, parentElement.firstChild);
        }
    }

    hide() {
        if (this.breadcrumbContainer.parentNode) {
            this.breadcrumbContainer.parentNode.removeChild(this.breadcrumbContainer);
        }
    }
}

// Initialize breadcrumb navigation
const breadcrumbNav = new BreadcrumbNavigation();

// Navigation analytics (optional)
function trackNavigation(section) {
    // Track navigation for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: section,
            page_location: window.location.href + '#' + section
        });
    }
    
    // Console logging for development
    console.log(`Navigated to section: ${section}`);
}

// Export navigation functions
window.navigationUtils = {
    navigationState,
    breadcrumbNav,
    trackNavigation,
    smoothScrollToSection: function(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight - 10;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};
