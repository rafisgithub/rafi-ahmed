// Projects functionality and management
class ProjectsManager {
    constructor() {
        this.allProjects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.isAnimating = false;
        
        this.projectsGrid = document.getElementById('projects-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        this.init();
    }

    init() {
        this.loadProjects();
        this.setupFilterButtons();
        this.setupProjectInteractions();
    }

    loadProjects() {
        if (typeof projectsData === 'undefined') {
            console.error('Projects data not found');
            return;
        }

        this.allProjects = projectsData;
        this.filteredProjects = [...this.allProjects];
        this.renderProjects();
    }

    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.dataset.filter;
                this.filterProjects(filter);
                this.updateActiveFilter(button);
            });
        });
    }

    setupProjectInteractions() {
        // Setup project card interactions will be called after rendering
    }

    renderProjects() {
        if (!this.projectsGrid) return;

        if (this.filteredProjects.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.projectsGrid.innerHTML = this.filteredProjects.map(project => 
            this.createProjectCard(project)
        ).join('');

        // Setup interactions for new cards
        this.setupCardInteractions();
        
        // Add staggered animation
        this.animateProjectCards();
    }

    createProjectCard(project) {
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const projectLinks = this.createProjectLinks(project);

        return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <i class="fas fa-${project.icon || 'code'}"></i>
                    <div class="project-overlay">
                        <div class="project-overlay-content">
                            <h4>${project.title}</h4>
                            <p>${project.shortDescription}</p>
                            ${projectLinks}
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${techTags}
                    </div>
                    <div class="project-links">
                        ${this.createProjectLinks(project, true)}
                    </div>
                </div>
            </div>
        `;
    }

    createProjectLinks(project, isBottom = false) {
        let links = '';
        
        if (project.demoUrl) {
            links += `
                <a href="${project.demoUrl}" target="_blank" class="project-link demo-link" rel="noopener">
                    <i class="fas fa-external-link-alt"></i> ${isBottom ? 'Live Demo' : 'Demo'}
                </a>
            `;
        }
        
        if (project.githubUrl) {
            links += `
                <a href="${project.githubUrl}" target="_blank" class="project-link github-link" rel="noopener">
                    <i class="fab fa-github"></i> ${isBottom ? 'View Code' : 'Code'}
                </a>
            `;
        }

        if (project.caseStudyUrl) {
            links += `
                <a href="${project.caseStudyUrl}" target="_blank" class="project-link case-study-link" rel="noopener">
                    <i class="fas fa-book-open"></i> Case Study
                </a>
            `;
        }

        return links;
    }

    renderEmptyState() {
        this.projectsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <h3>No projects found</h3>
                <p>No projects match the selected filter</p>
            </div>
        `;
    }

    filterProjects(filter) {
        if (this.isAnimating) return;
        
        this.currentFilter = filter;
        this.isAnimating = true;

        // Fade out current projects
        const currentCards = this.projectsGrid.querySelectorAll('.project-card');
        currentCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }, index * 50);
        });

        // Filter and render new projects after fade out
        setTimeout(() => {
            if (filter === 'all') {
                this.filteredProjects = [...this.allProjects];
            } else {
                this.filteredProjects = this.allProjects.filter(project => 
                    project.category === filter
                );
            }

            this.renderProjects();
            this.isAnimating = false;
        }, currentCards.length * 50 + 200);
    }

    updateActiveFilter(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    animateProjectCards() {
        const cards = this.projectsGrid.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupCardInteractions() {
        const projectCards = this.projectsGrid.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Hover effects
            card.addEventListener('mouseenter', () => {
                this.onCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.onCardHover(card, false);
            });

            // Click to expand functionality
            card.addEventListener('click', (e) => {
                // Only expand if not clicking on links
                if (!e.target.closest('.project-link')) {
                    this.expandProjectCard(card);
                }
            });

            // Setup link tracking
            const links = card.querySelectorAll('.project-link');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent card expansion
                    this.trackProjectLinkClick(link);
                });
            });
        });
    }

    onCardHover(card, isHovering) {
        const overlay = card.querySelector('.project-overlay');
        if (!overlay) return;

        if (isHovering) {
            overlay.style.opacity = '1';
            card.style.transform = 'translateY(-10px) scale(1.02)';
        } else {
            overlay.style.opacity = '0';
            card.style.transform = 'translateY(0) scale(1)';
        }
    }

    expandProjectCard(card) {
        // Create expanded modal or navigate to detailed view
        const projectTitle = card.querySelector('.project-title').textContent;
        const project = this.allProjects.find(p => p.title === projectTitle);
        
        if (project) {
            this.showProjectModal(project);
        }
    }

    showProjectModal(project) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('project-modal');
        if (!modal) {
            modal = this.createProjectModal();
            document.body.appendChild(modal);
        }

        // Populate modal content
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = this.createProjectModalContent(project);

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Setup modal close handlers
        this.setupModalCloseHandlers(modal);
    }

    createProjectModal() {
        const modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content project-modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-body">
                    <!-- Project content will be inserted here -->
                </div>
            </div>
        `;
        return modal;
    }

    createProjectModalContent(project) {
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const features = project.features ? project.features.map(feature => 
            `<li>${feature}</li>`
        ).join('') : '';

        const challenges = project.challenges ? project.challenges.map(challenge => 
            `<li>${challenge}</li>`
        ).join('') : '';

        return `
            <div class="project-detail">
                <header class="project-detail-header">
                    <h2>${project.title}</h2>
                    <div class="project-detail-meta">
                        <span class="project-status">${project.status || 'Completed'}</span>
                        <span class="project-date">${project.completedDate || 'Recent'}</span>
                    </div>
                </header>
                
                <div class="project-detail-image">
                    <i class="fas fa-${project.icon || 'code'}"></i>
                </div>
                
                <div class="project-detail-content">
                    <section class="project-overview">
                        <h3>Overview</h3>
                        <p>${project.fullDescription || project.description}</p>
                    </section>
                    
                    <section class="project-technologies">
                        <h3>Technologies Used</h3>
                        <div class="tech-tags">
                            ${techTags}
                        </div>
                    </section>
                    
                    ${features ? `
                        <section class="project-features">
                            <h3>Key Features</h3>
                            <ul>${features}</ul>
                        </section>
                    ` : ''}
                    
                    ${challenges ? `
                        <section class="project-challenges">
                            <h3>Challenges & Solutions</h3>
                            <ul>${challenges}</ul>
                        </section>
                    ` : ''}
                    
                    <section class="project-links-section">
                        <h3>Project Links</h3>
                        <div class="project-links-detailed">
                            ${this.createProjectLinks(project, true)}
                        </div>
                    </section>
                </div>
            </div>
        `;
    }

    setupModalCloseHandlers(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => {
            this.closeProjectModal(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal(modal);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeProjectModal(modal);
            }
        });
    }

    closeProjectModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    trackProjectLinkClick(link) {
        const linkType = link.classList.contains('demo-link') ? 'demo' : 
                        link.classList.contains('github-link') ? 'github' : 'other';
        
        console.log(`Project link clicked: ${linkType} - ${link.href}`);
        
        // Add analytics tracking here if needed
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'project_link',
                event_label: linkType,
                value: link.href
            });
        }
    }

    // Public methods
    getProjectsByCategory(category) {
        if (category === 'all') {
            return this.allProjects;
        }
        return this.allProjects.filter(project => project.category === category);
    }

    getProjectById(id) {
        return this.allProjects.find(project => project.id === id);
    }

    getTotalProjects() {
        return this.allProjects.length;
    }

    getCurrentFilter() {
        return this.currentFilter;
    }
}

// Initialize projects functionality
function initializeProjects() {
    window.projectsManager = new ProjectsManager();
}

// Export for external use
window.ProjectsManager = ProjectsManager;
