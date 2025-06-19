// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Building Scalable Web Applications with Modern JavaScript",
        author: "Developer",
        date: "2025-01-15",
        category: "javascript",
        tags: ["JavaScript", "Web Development", "Performance", "Architecture"],
        icon: "js",
        excerpt: "Learn how to build scalable web applications using modern JavaScript frameworks and best practices for performance optimization.",
        content: `
Building scalable web applications requires careful consideration of architecture, performance, and maintainability. In this comprehensive guide, we'll explore the essential patterns and practices that make modern web applications robust and scalable.

## Understanding Scalability

Scalability in web applications refers to the ability to handle increased load gracefully. This includes both technical scalability (handling more users and data) and development scalability (maintaining code quality as the team and codebase grows).

## Modern JavaScript Frameworks

Modern frameworks like React, Vue, and Angular provide excellent foundations for scalable applications. They offer:

- Component-based architecture for better code organization
- Virtual DOM for optimized rendering
- Built-in state management solutions
- Strong ecosystem and community support

## Performance Optimization Strategies

### Code Splitting
Implement dynamic imports to split your code into smaller chunks:

\`\`\`javascript
const LazyComponent = lazy(() => import('./LazyComponent'));
\`\`\`

### Caching Strategies
Implement effective caching at multiple levels:
- Browser caching with proper HTTP headers
- Service worker caching for offline functionality
- Memory caching for frequently accessed data

### Bundle Optimization
Use tools like Webpack or Vite to optimize your bundles:
- Tree shaking to remove unused code
- Minification for smaller file sizes
- Compression (gzip/brotli) for faster transfers

## Architecture Patterns

### Module Pattern
Organize code into self-contained modules with clear interfaces.

### Observer Pattern
Implement event-driven architecture for loose coupling between components.

### State Management
Use centralized state management for complex applications:
- Redux for React applications
- Vuex for Vue applications
- NgRx for Angular applications

## Testing Strategies

Implement comprehensive testing:
- Unit tests for individual functions
- Integration tests for component interactions
- End-to-end tests for user workflows

## Monitoring and Analytics

Set up proper monitoring:
- Performance monitoring with tools like Lighthouse
- Error tracking with services like Sentry
- User analytics to understand usage patterns

## Conclusion

Building scalable web applications is an ongoing process that requires attention to architecture, performance, and development practices. By following these guidelines and staying updated with modern tools and techniques, you can create applications that grow with your needs.
        `
    },
    {
        id: 2,
        title: "The Complete Guide to CSS Grid and Flexbox",
        author: "Developer",
        date: "2025-01-10",
        category: "css",
        tags: ["CSS", "Layout", "Responsive Design", "Grid", "Flexbox"],
        icon: "palette",
        excerpt: "Master modern CSS layout techniques with this comprehensive guide to CSS Grid and Flexbox, including practical examples and use cases.",
        content: `
CSS Grid and Flexbox are powerful layout tools that have revolutionized how we create layouts on the web. Understanding when and how to use each one is crucial for modern web development.

## CSS Flexbox: One-Dimensional Layouts

Flexbox is perfect for one-dimensional layouts - either rows or columns. It excels at:

### Centering Content
\`\`\`css
.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
\`\`\`

### Equal Height Columns
\`\`\`css
.flex-container {
    display: flex;
}

.flex-item {
    flex: 1; /* Equal width distribution */
}
\`\`\`

### Navigation Bars
Flexbox is ideal for creating responsive navigation:

\`\`\`css
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
\`\`\`

## CSS Grid: Two-Dimensional Layouts

CSS Grid excels at complex, two-dimensional layouts:

### Basic Grid Setup
\`\`\`css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}
\`\`\`

### Complex Layouts
\`\`\`css
.layout {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
}
\`\`\`

## When to Use Which

### Use Flexbox for:
- Navigation bars
- Centering content
- Equal height columns
- Small component layouts

### Use Grid for:
- Page layouts
- Card layouts
- Complex positioning
- Overlapping elements

## Responsive Design with Grid and Flexbox

### Mobile-First Approach
\`\`\`css
/* Mobile first */
.container {
    display: flex;
    flex-direction: column;
}

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }
}
\`\`\`

## Browser Support and Fallbacks

Modern browsers have excellent support for both Grid and Flexbox. For older browsers, consider:

- Progressive enhancement
- Feature queries with @supports
- Graceful fallbacks using older layout methods

## Conclusion

CSS Grid and Flexbox are complementary tools. Use Flexbox for one-dimensional layouts and Grid for two-dimensional layouts. Understanding both will make you a more effective frontend developer.
        `
    },
    {
        id: 3,
        title: "API Design Best Practices for Modern Web Applications",
        author: "Developer",
        date: "2025-01-05",
        category: "backend",
        tags: ["API", "REST", "GraphQL", "Backend", "Node.js"],
        icon: "server",
        excerpt: "Learn the essential principles of API design, including RESTful conventions, GraphQL implementation, and security best practices.",
        content: `
Well-designed APIs are the backbone of modern web applications. They enable seamless communication between frontend and backend systems and provide the foundation for scalable, maintainable applications.

## RESTful API Design Principles

### Resource-Based URLs
Design URLs around resources, not actions:

\`\`\`
Good: GET /api/users/123
Bad:  GET /api/getUserById/123
\`\`\`

### HTTP Methods
Use appropriate HTTP methods:
- GET: Retrieve data
- POST: Create new resources
- PUT: Update entire resources
- PATCH: Partial updates
- DELETE: Remove resources

### Status Codes
Return meaningful HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## API Documentation

### OpenAPI/Swagger
Use OpenAPI specification for comprehensive documentation:

\`\`\`yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get all users
      responses:
        '200':
          description: List of users
\`\`\`

### Interactive Documentation
Provide interactive documentation that allows developers to test endpoints directly.

## Authentication and Security

### JWT Tokens
Implement secure authentication with JSON Web Tokens:

\`\`\`javascript
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};
\`\`\`

### Rate Limiting
Protect your API from abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api', limiter);
\`\`\`

## Error Handling

### Consistent Error Format
Maintain consistent error response format:

\`\`\`javascript
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid email format",
        "details": {
            "field": "email",
            "value": "invalid-email"
        }
    }
}
\`\`\`

### Error Middleware
Implement centralized error handling:

\`\`\`javascript
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        error: {
            code: err.code || 'INTERNAL_ERROR',
            message: message
        }
    });
});
\`\`\`

## Pagination and Filtering

### Cursor-Based Pagination
For large datasets, use cursor-based pagination:

\`\`\`javascript
GET /api/users?limit=20&cursor=eyJpZCI6MTIzfQ
\`\`\`

### Filtering and Sorting
Support flexible filtering:

\`\`\`javascript
GET /api/users?filter[status]=active&sort=-createdAt
\`\`\`

## API Versioning

### URL Versioning
Include version in the URL:

\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

### Header Versioning
Use custom headers for versioning:

\`\`\`
Accept: application/vnd.api+json;version=1
\`\`\`

## Testing

### Unit Tests
Test individual API endpoints:

\`\`\`javascript
describe('GET /api/users', () => {
    it('should return list of users', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect(200);
        
        expect(response.body).toHaveProperty('users');
    });
});
\`\`\`

### Integration Tests
Test complete user flows and API interactions.

## Monitoring and Analytics

### Logging
Implement comprehensive logging:

\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});
\`\`\`

### Performance Monitoring
Track API performance metrics:
- Response times
- Error rates
- Request volumes
- Database query performance

## Conclusion

Good API design is crucial for building maintainable and scalable applications. Focus on consistency, security, and developer experience. Document everything and monitor performance to ensure your APIs serve their purpose effectively.
        `
    },
    {
        id: 4,
        title: "Responsive Web Design: Mobile-First Approach",
        author: "Developer",
        date: "2024-12-28",
        category: "design",
        tags: ["Responsive Design", "Mobile First", "UX", "CSS", "Media Queries"],
        icon: "mobile-alt",
        excerpt: "Explore the mobile-first approach to responsive web design and learn how to create websites that work beautifully on all devices.",
        content: `
Mobile-first responsive design has become the standard approach for modern web development. With mobile traffic accounting for over 50% of web usage, designing for mobile devices first ensures optimal user experience across all screen sizes.

## Understanding Mobile-First Design

Mobile-first design means starting with the mobile experience and progressively enhancing for larger screens. This approach offers several advantages:

### Benefits of Mobile-First
- Forces prioritization of essential content
- Improves performance on slower connections
- Ensures core functionality works on all devices
- Simplifies the design process

### Progressive Enhancement
Start with a solid foundation and add enhancements:

\`\`\`css
/* Base mobile styles */
.container {
    width: 100%;
    padding: 1rem;
}

/* Tablet enhancement */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop enhancement */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        padding: 2rem;
    }
}
\`\`\`

## Media Query Strategy

### Breakpoint Selection
Choose breakpoints based on content, not specific devices:

\`\`\`css
/* Common breakpoints */
@media (min-width: 576px) { /* Small devices */ }
@media (min-width: 768px) { /* Medium devices */ }
@media (min-width: 992px) { /* Large devices */ }
@media (min-width: 1200px) { /* Extra large devices */ }
\`\`\`

### Content-First Breakpoints
Add breakpoints when your content needs them:

\`\`\`css
.navigation {
    /* Mobile: stacked menu */
    flex-direction: column;
}

@media (min-width: 640px) {
    .navigation {
        /* When space allows: horizontal menu */
        flex-direction: row;
    }
}
\`\`\`

## Flexible Grid Systems

### CSS Grid for Layouts
\`\`\`css
.grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr; /* Mobile: single column */
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr); /* Tablet: two columns */
    }
}

@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr); /* Desktop: three columns */
    }
}
\`\`\`

### Flexbox for Components
\`\`\`css
.card {
    display: flex;
    flex-direction: column; /* Mobile: stacked */
}

@media (min-width: 768px) {
    .card {
        flex-direction: row; /* Tablet+: side by side */
    }
}
\`\`\`

## Typography and Spacing

### Fluid Typography
Use relative units for scalable text:

\`\`\`css
html {
    font-size: 16px; /* Base size */
}

h1 {
    font-size: 1.75rem; /* 28px on mobile */
}

@media (min-width: 768px) {
    h1 {
        font-size: 2.5rem; /* 40px on larger screens */
    }
}
\`\`\`

### Responsive Spacing
Scale spacing with screen size:

\`\`\`css
.section {
    padding: 2rem 1rem; /* Mobile */
}

@media (min-width: 768px) {
    .section {
        padding: 4rem 2rem; /* Tablet+ */
    }
}
\`\`\`

## Images and Media

### Responsive Images
\`\`\`html
<img 
    src="small.jpg"
    srcset="
        small.jpg 400w,
        medium.jpg 800w,
        large.jpg 1200w
    "
    sizes="
        (max-width: 768px) 100vw,
        (max-width: 1024px) 50vw,
        25vw
    "
    alt="Responsive image"
>
\`\`\`

### CSS for Responsive Media
\`\`\`css
img, video {
    max-width: 100%;
    height: auto;
}
\`\`\`

## Touch-Friendly Design

### Touch Targets
Ensure interactive elements are large enough:

\`\`\`css
.button {
    min-height: 44px; /* iOS guideline */
    min-width: 44px;
    padding: 12px 16px;
}
\`\`\`

### Touch Gestures
Consider touch interactions:
- Swipe for navigation
- Pinch to zoom
- Long press for context menus

## Performance Considerations

### Critical CSS
Inline critical CSS for above-the-fold content:

\`\`\`html
<style>
    /* Critical CSS for immediate rendering */
    .header { /* styles */ }
    .hero { /* styles */ }
</style>
\`\`\`

### Lazy Loading
Load images as needed:

\`\`\`html
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy">
\`\`\`

## Testing on Real Devices

Test your responsive design on actual devices:
- Use browser developer tools for initial testing
- Test on real phones and tablets when possible
- Consider using cloud testing services for comprehensive coverage

## Conclusion

Mobile-first responsive design is essential for modern web development. By starting with mobile constraints and progressively enhancing for larger screens, you create better user experiences across all devices. Focus on content hierarchy, touch interactions, and performance to ensure your designs work beautifully everywhere.
        `
    }
];