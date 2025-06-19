// Blog functionality and management
class BlogManager {
    constructor() {
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.allPosts = [];
        this.filteredPosts = [];
        this.currentCategory = 'all';
        this.isLoading = false;
        
        this.blogGrid = document.getElementById('blog-grid');
        this.blogModal = document.getElementById('blog-modal');
        this.modalBody = document.getElementById('modal-body');
        this.modalClose = document.getElementById('modal-close');
        
        this.init();
    }

    init() {
        this.loadBlogPosts();
        this.setupEventListeners();
        this.setupModal();
    }

    loadBlogPosts() {
        if (typeof blogPosts === 'undefined') {
            console.error('Blog posts data not found');
            return;
        }

        this.allPosts = blogPosts;
        this.filteredPosts = [...this.allPosts];
        this.renderBlogPosts();
        this.renderPagination();
    }

    setupEventListeners() {
        // Search functionality (if search input exists)
        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.searchPosts(e.target.value);
            }, 300));
        }

        // Category filter (if category filter exists)
        const categoryFilters = document.querySelectorAll('.blog-category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByCategory(e.target.dataset.category);
            });
        });
    }

    setupModal() {
        if (!this.blogModal || !this.modalClose) return;

        // Close modal on close button click
        this.modalClose.addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal on overlay click
        this.blogModal.addEventListener('click', (e) => {
            if (e.target === this.blogModal) {
                this.closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.blogModal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    renderBlogPosts() {
        if (!this.blogGrid) return;

        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

        if (postsToShow.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.blogGrid.innerHTML = postsToShow.map(post => this.createBlogCard(post)).join('');
        
        // Add click listeners to blog cards
        const blogCards = this.blogGrid.querySelectorAll('.blog-card');
        blogCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const postIndex = startIndex + index;
                this.openPost(this.filteredPosts[postIndex]);
            });
        });

        // Add fade-in animation
        requestAnimationFrame(() => {
            blogCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100);
            });
        });
    }

    createBlogCard(post) {
        const readTime = this.calculateReadTime(post.content);
        const excerpt = this.createExcerpt(post.content, 150);

        return `
            <article class="blog-card" data-post-id="${post.id}">
                <div class="blog-image">
                    <i class="fas fa-${post.icon || 'newspaper'}"></i>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date">${this.formatDate(post.date)}</span>
                        <span class="blog-read-time">${readTime} min read</span>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${excerpt}</p>
                    <div class="blog-tags">
                        ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `;
    }

    renderEmptyState() {
        this.blogGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
    }

    renderPagination() {
        const paginationContainer = document.getElementById('blog-pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '<div class="pagination">';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `
                <button class="pagination-btn" data-page="${this.currentPage - 1}">
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
            `;
        }

        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);

        if (startPage > 1) {
            paginationHTML += '<button class="pagination-btn" data-page="1">1</button>';
            if (startPage > 2) {
                paginationHTML += '<span class="pagination-dots">...</span>';
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const activeClass = i === this.currentPage ? 'active' : '';
            paginationHTML += `
                <button class="pagination-btn ${activeClass}" data-page="${i}">${i}</button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += '<span class="pagination-dots">...</span>';
            }
            paginationHTML += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `
                <button class="pagination-btn" data-page="${this.currentPage + 1}">
                    Next <i class="fas fa-chevron-right"></i>
                </button>
            `;
        }

        paginationHTML += '</div>';
        paginationContainer.innerHTML = paginationHTML;

        // Add event listeners to pagination buttons
        const paginationBtns = paginationContainer.querySelectorAll('.pagination-btn');
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page);
                this.goToPage(page);
            });
        });
    }

    openPost(post) {
        if (!this.blogModal || !this.modalBody) return;

        const readTime = this.calculateReadTime(post.content);
        
        this.modalBody.innerHTML = `
            <article class="blog-post-full">
                <header class="blog-post-header">
                    <div class="blog-post-meta">
                        <span class="blog-date">${this.formatDate(post.date)}</span>
                        <span class="blog-read-time">${readTime} min read</span>
                        <span class="blog-author">By ${post.author}</span>
                    </div>
                    <h1 class="blog-post-title">${post.title}</h1>
                    <div class="blog-post-tags">
                        ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                </header>
                <div class="blog-post-content">
                    ${this.formatContent(post.content)}
                </div>
                <footer class="blog-post-footer">
                    <div class="blog-post-share">
                        <h4>Share this post:</h4>
                        <div class="share-buttons">
                            <a href="${this.getTwitterShareUrl(post)}" target="_blank" class="share-btn twitter">
                                <i class="fab fa-twitter"></i> Twitter
                            </a>
                            <a href="${this.getLinkedInShareUrl(post)}" target="_blank" class="share-btn linkedin">
                                <i class="fab fa-linkedin"></i> LinkedIn
                            </a>
                            <a href="#" onclick="navigator.clipboard.writeText('${window.location.href}'); alert('Link copied!')" class="share-btn copy">
                                <i class="fas fa-link"></i> Copy Link
                            </a>
                        </div>
                    </div>
                </footer>
            </article>
        `;

        this.blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add navigation breadcrumb
        if (window.navigationUtils && window.navigationUtils.breadcrumbNav) {
            window.navigationUtils.breadcrumbNav.updateBreadcrumb([
                { text: 'Home', href: '#home' },
                { text: 'Blog', href: '#blog' },
                { text: post.title, href: '#' }
            ]);
            window.navigationUtils.breadcrumbNav.show(this.modalBody);
        }
    }

    closeModal() {
        if (!this.blogModal) return;

        this.blogModal.classList.remove('active');
        document.body.style.overflow = '';

        // Hide breadcrumb
        if (window.navigationUtils && window.navigationUtils.breadcrumbNav) {
            window.navigationUtils.breadcrumbNav.hide();
        }
    }

    searchPosts(query) {
        if (!query.trim()) {
            this.filteredPosts = [...this.allPosts];
        } else {
            const lowercaseQuery = query.toLowerCase();
            this.filteredPosts = this.allPosts.filter(post =>
                post.title.toLowerCase().includes(lowercaseQuery) ||
                post.content.toLowerCase().includes(lowercaseQuery) ||
                post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
            );
        }
        
        this.currentPage = 1;
        this.renderBlogPosts();
        this.renderPagination();
    }

    filterByCategory(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredPosts = [...this.allPosts];
        } else {
            this.filteredPosts = this.allPosts.filter(post =>
                post.category === category
            );
        }
        
        this.currentPage = 1;
        this.renderBlogPosts();
        this.renderPagination();
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderBlogPosts();
        this.renderPagination();
        
        // Scroll to top of blog section
        const blogSection = document.getElementById('blog');
        if (blogSection) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            window.scrollTo({
                top: blogSection.offsetTop - navbarHeight - 20,
                behavior: 'smooth'
            });
        }
    }

    // Utility methods
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    calculateReadTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    }

    createExcerpt(content, maxLength) {
        const strippedContent = content.replace(/<[^>]*>/g, '');
        if (strippedContent.length <= maxLength) {
            return strippedContent;
        }
        return strippedContent.substring(0, maxLength).trim() + '...';
    }

    formatContent(content) {
        // Convert line breaks to paragraphs
        return content
            .split('\n\n')
            .map(paragraph => `<p>${paragraph.trim()}</p>`)
            .join('');
    }

    getTwitterShareUrl(post) {
        const text = encodeURIComponent(`Check out "${post.title}" - ${post.excerpt || ''}`);
        const url = encodeURIComponent(window.location.href);
        return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    }

    getLinkedInShareUrl(post) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(post.title);
        const summary = encodeURIComponent(post.excerpt || '');
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;
    }

    debounce(func, wait) {
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

    // Public methods for external access
    ensurePostsLoaded() {
        if (this.allPosts.length === 0) {
            this.loadBlogPosts();
        }
    }

    getPostById(id) {
        return this.allPosts.find(post => post.id === id);
    }

    getTotalPosts() {
        return this.allPosts.length;
    }
}

// Initialize blog functionality
function initializeBlog() {
    window.blogManager = new BlogManager();
}

// Export for external use
window.BlogManager = BlogManager;
