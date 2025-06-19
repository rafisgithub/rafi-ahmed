// Main JavaScript file for the portfolio website
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeSkills();
    initializeProjects();
    initializeBlog();
    initializeAnimations();
    initializeContactForm();
    initializeTypingEffect();
    initializeScrollEffects();
}

// Typing effect for hero section
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const texts = [
        'Hello, I\'m a Developer',
        'I Build Web Applications',
        'I Create Digital Solutions',
        'I Love Clean Code'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeText() {
        const currentText = texts[currentTextIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 75;
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && currentCharIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next text
        }

        setTimeout(typeText, typingSpeed);
    }

    typeText();
}

// Scroll effects and animations
function initializeScrollEffects() {
    const sections = document.querySelectorAll('.section');

    // Crystal navbar scroll effect
    const crystalNav = document.getElementById('crystal-nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            if (crystalNav) crystalNav.classList.add('scrolled');
        } else {
            if (crystalNav) crystalNav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for active nav links
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveNavLink(id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    function updateActiveNavLink(activeId) {
        const crystalNavItems = document.querySelectorAll('.crystal-nav-item');
        crystalNavItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    // Fade in animation for elements
    const fadeElements = document.querySelectorAll('.project-card, .blog-card, .skill-category, .timeline-item');
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Initialize timeline scroll animation
    initializeTimelineScrollAnimation();
}

function initializeTimelineScrollAnimation() {
    const timelineSection = document.getElementById('experience');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timeline = document.querySelector('.timeline');
    
    if (!timelineSection || !timeline || timelineItems.length === 0) return;

    // Create dynamic timeline progress line
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-progress';
    timeline.appendChild(timelineLine);

    function updateTimelineProgress() {
        const sectionRect = timelineSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the section is visible
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        
        // Calculate progress based on scroll position within the section
        let progress = 0;
        if (sectionTop <= 0 && sectionTop + sectionHeight >= 0) {
            // Section is in viewport
            const visibleHeight = Math.min(windowHeight, sectionHeight + sectionTop);
            const scrolledInSection = Math.max(0, -sectionTop);
            progress = Math.min(100, (scrolledInSection / sectionHeight) * 100);
        } else if (sectionTop > 0) {
            // Section is below viewport
            progress = 0;
        } else {
            // Section is above viewport
            progress = 100;
        }
        
        // Update timeline progress line
        timelineLine.style.height = `${progress}%`;
        
        // Animate timeline items based on their position
        timelineItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const itemTop = itemRect.top;
            const itemHeight = itemRect.height;
            const itemCenter = itemTop + itemHeight / 2;
            
            // Check if item center is in viewport
            if (itemCenter < windowHeight * 0.8 && itemCenter > windowHeight * 0.2) {
                item.classList.add('timeline-active');
                
                // Stagger animation for smoother effect
                setTimeout(() => {
                    item.classList.add('timeline-animated');
                }, index * 100);
            } else if (itemCenter > windowHeight * 0.8) {
                item.classList.remove('timeline-active', 'timeline-animated');
            }
        });
    }

    // Throttled scroll handler for performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateTimelineProgress();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    updateTimelineProgress(); // Initial call
}

// Gaming-style skills section initialization
function initializeSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    const skillCounter = document.querySelector('.skill-counter');
    
    if (!skillsGrid || typeof skillsData === 'undefined') return;

    skillsGrid.innerHTML = '';
    
    // Count total skills
    const totalSkills = skillsData.reduce((total, category) => total + category.skills.length, 0);
    
    // Update skill counter with animation
    let currentCount = 0;
    const countAnimation = setInterval(() => {
        currentCount += Math.ceil(totalSkills / 50);
        if (currentCount >= totalSkills) {
            currentCount = totalSkills;
            clearInterval(countAnimation);
        }
        if (skillCounter) {
            skillCounter.textContent = `Skills Loaded: ${currentCount}/${totalSkills}`;
        }
    }, 50);

    // Create gaming-style skill categories
    skillsData.forEach((category, index) => {
        setTimeout(() => {
            const skillCategory = document.createElement('div');
            skillCategory.className = 'skill-category-gaming';
            
            // Calculate skill level (mock data for visual effect)
            const skillLevel = Math.floor(Math.random() * 20) + 80; // 80-100%
            
            const skillIcon = getSkillIcon(category.category);
            
            const skillsList = category.skills.map(skill => 
                `<span class="gaming-skill-tag">${skill}</span>`
            ).join('');

            skillCategory.innerHTML = `
                <div class="skill-category-title">
                    <span class="skill-icon">${skillIcon}</span>
                    <span>${category.category}</span>
                </div>
                <div class="skill-level-bar">
                    <div class="skill-level-fill" style="width: 0%" data-width="${skillLevel}%"></div>
                </div>
                <div class="gaming-skills-list">
                    ${skillsList}
                </div>
            `;

            skillsGrid.appendChild(skillCategory);
            
            // Animate skill bar
            setTimeout(() => {
                const skillBar = skillCategory.querySelector('.skill-level-fill');
                if (skillBar) {
                    skillBar.style.width = skillBar.dataset.width;
                }
            }, 200);
            
        }, index * 200);
    });
}

function getSkillIcon(category) {
    const iconMap = {
        'Frontend Development': '🎨',
        'Backend Development': '⚙️',
        'Database & Storage': '🗄️',
        'Cloud & DevOps': '☁️',
        'Mobile Development': '📱',
        'Tools & Workflow': '🔧',
        'Testing & Quality': '🧪',
        'Design & UX': '🎯'
    };
    return iconMap[category] || '💻';
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });

    function validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        
        // Remove existing error styling
        input.classList.remove('error');
        
        // Basic validation
        if (input.hasAttribute('required') && !value) {
            showInputError(input, 'This field is required');
            return false;
        }
        
        if (input.type === 'email' && value && !isValidEmail(value)) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    function clearValidationError(e) {
        const input = e.target;
        input.classList.remove('error');
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function showInputError(input, message) {
        input.classList.add('error');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--primary-color)';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(errorElement);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// General animations
function initializeAnimations() {
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('no-hover-effect')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = 'var(--shadow-lg)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Add click animation to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.5);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth scrolling for navigation links
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformance();

// Export functions for use in other modules
window.portfolioApp = {
    smoothScrollTo,
    debounce,
    throttle,
    initializeAnimations
};
