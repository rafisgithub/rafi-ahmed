// Projects data for the portfolio website
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "web",
        description: "A full-stack e-commerce platform with advanced features including real-time inventory management, payment processing, and admin dashboard.",
        shortDescription: "Modern e-commerce solution with React and Node.js",
        fullDescription: "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, inventory tracking, and a powerful admin dashboard for managing products, orders, and customers.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Redux", "Material-UI", "JWT"],
        icon: "shopping-cart",
        status: "Completed",
        completedDate: "December 2024",
        demoUrl: "https://demo-ecommerce.example.com",
        githubUrl: "https://github.com/developer/ecommerce-platform",
        features: [
            "User authentication and authorization",
            "Product catalog with advanced filtering",
            "Shopping cart and wishlist functionality",
            "Secure payment processing with Stripe",
            "Order tracking and history",
            "Admin dashboard for inventory management",
            "Real-time notifications",
            "Responsive design for all devices"
        ],
        challenges: [
            "Implementing real-time inventory updates across multiple users",
            "Ensuring secure payment processing and PCI compliance",
            "Optimizing database queries for large product catalogs",
            "Creating a responsive design that works on all devices"
        ]
    },
    {
        id: 2,
        title: "Task Management App",
        category: "web",
        description: "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.",
        shortDescription: "Collaborative project management tool",
        fullDescription: "A comprehensive task management application designed for teams and individuals. Built with Vue.js and Firebase, it offers real-time collaboration, project organization, deadline tracking, and detailed analytics.",
        technologies: ["Vue.js", "Firebase", "Vuex", "Vue Router", "Chart.js", "PWA", "CSS Grid"],
        icon: "tasks",
        status: "Completed",
        completedDate: "November 2024",
        demoUrl: "https://taskmanager-demo.example.com",
        githubUrl: "https://github.com/developer/task-manager",
        features: [
            "Real-time task updates and collaboration",
            "Project organization with boards and lists",
            "Deadline tracking and notifications",
            "Team member assignment and permissions",
            "Progress analytics and reporting",
            "File attachment support",
            "Progressive Web App capabilities",
            "Dark/light theme toggle"
        ],
        challenges: [
            "Implementing real-time synchronization across team members",
            "Designing intuitive drag-and-drop interfaces",
            "Optimizing performance for large project datasets",
            "Creating offline functionality with PWA features"
        ]
    },
    {
        id: 3,
        title: "Weather Forecast App",
        category: "mobile",
        description: "A React Native weather application with location-based forecasts, interactive maps, and weather alerts.",
        shortDescription: "Cross-platform weather app with detailed forecasts",
        fullDescription: "A feature-rich weather application built with React Native that provides accurate weather forecasts, interactive weather maps, severe weather alerts, and location-based recommendations.",
        technologies: ["React Native", "Redux", "OpenWeather API", "Google Maps API", "Async Storage", "Push Notifications"],
        icon: "cloud-sun",
        status: "Completed",
        completedDate: "October 2024",
        demoUrl: null,
        githubUrl: "https://github.com/developer/weather-app",
        features: [
            "Current weather conditions and 7-day forecast",
            "Location-based weather detection",
            "Interactive weather maps with radar",
            "Severe weather alerts and notifications",
            "Weather-based activity recommendations",
            "Favorite locations management",
            "Offline data caching",
            "Beautiful animations and transitions"
        ],
        challenges: [
            "Handling location permissions across iOS and Android",
            "Implementing smooth map interactions with weather overlays",
            "Managing offline data storage and synchronization",
            "Creating accurate weather-based recommendations"
        ]
    },
    {
        id: 4,
        title: "Blog CMS Platform",
        category: "web",
        description: "A headless CMS built with Next.js and Strapi for content creators, featuring markdown support, SEO optimization, and multi-author collaboration.",
        shortDescription: "Modern headless CMS for content creators",
        fullDescription: "A powerful content management system designed for bloggers and content creators. Built as a headless CMS with Next.js frontend and Strapi backend, offering markdown editing, SEO tools, and collaborative features.",
        technologies: ["Next.js", "Strapi", "PostgreSQL", "Markdown", "Cloudinary", "SEO", "TypeScript"],
        icon: "blog",
        status: "Completed",
        completedDate: "September 2024",
        demoUrl: "https://blog-cms-demo.example.com",
        githubUrl: "https://github.com/developer/blog-cms",
        caseStudyUrl: "https://developer.example.com/case-studies/blog-cms",
        features: [
            "Rich markdown editor with live preview",
            "SEO optimization tools and meta tag management",
            "Multi-author collaboration and role management",
            "Image upload and optimization with Cloudinary",
            "Comment system with moderation",
            "Tag and category management",
            "Analytics integration",
            "Custom themes and layouts"
        ],
        challenges: [
            "Creating a user-friendly markdown editor with advanced features",
            "Implementing granular user permissions and roles",
            "Optimizing SEO for dynamic content generation",
            "Building a flexible theming system"
        ]
    },
    {
        id: 5,
        title: "Fitness Tracking API",
        category: "api",
        description: "A RESTful API for fitness applications with user management, workout tracking, progress analytics, and social features.",
        shortDescription: "Comprehensive fitness tracking backend API",
        fullDescription: "A robust RESTful API designed for fitness applications, providing endpoints for user management, workout tracking, nutrition logging, progress analytics, and social features like challenges and leaderboards.",
        technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Bcrypt", "Joi", "Jest", "Swagger"],
        icon: "dumbbell",
        status: "Completed",
        completedDate: "August 2024",
        demoUrl: "https://fitness-api-docs.example.com",
        githubUrl: "https://github.com/developer/fitness-api",
        features: [
            "User authentication and profile management",
            "Workout logging and exercise database",
            "Nutrition tracking and calorie counting",
            "Progress analytics and goal setting",
            "Social features including challenges and leaderboards",
            "Integration with wearable devices",
            "Comprehensive API documentation",
            "Rate limiting and security measures"
        ],
        challenges: [
            "Designing scalable database schemas for complex fitness data",
            "Implementing secure authentication with refresh tokens",
            "Creating flexible analytics system for various metrics",
            "Ensuring API performance with large datasets"
        ]
    },
    {
        id: 6,
        title: "Real Estate Platform",
        category: "web",
        description: "A comprehensive real estate platform with property listings, virtual tours, mortgage calculators, and agent management.",
        shortDescription: "Full-featured real estate marketplace",
        fullDescription: "A complete real estate platform connecting buyers, sellers, and agents. Features advanced property search, virtual tour integration, mortgage calculations, and comprehensive agent tools for managing listings and clients.",
        technologies: ["Angular", "Node.js", "PostgreSQL", "Google Maps API", "Stripe", "Socket.io", "TypeScript"],
        icon: "home",
        status: "Completed",
        completedDate: "July 2024",
        demoUrl: "https://realestate-demo.example.com",
        githubUrl: "https://github.com/developer/realestate-platform",
        features: [
            "Advanced property search with filters and maps",
            "Virtual tour integration and 360° photos",
            "Mortgage calculator and financing tools",
            "Agent dashboard for listing management",
            "Real-time messaging between users and agents",
            "Saved searches and property alerts",
            "Market analytics and price trends",
            "Mobile-responsive design"
        ],
        challenges: [
            "Integrating multiple map services for property visualization",
            "Implementing real-time messaging with proper notifications",
            "Creating accurate mortgage calculation algorithms",
            "Handling large amounts of property data efficiently"
        ]
    },
    {
        id: 7,
        title: "Video Streaming App",
        category: "mobile",
        description: "A cross-platform video streaming application with offline downloads, live streaming capabilities, and social features.",
        shortDescription: "Netflix-like streaming app with social features",
        fullDescription: "A comprehensive video streaming application built with Flutter, offering on-demand content, live streaming, offline downloads, and social interaction features like comments, ratings, and watch parties.",
        technologies: ["Flutter", "Dart", "Firebase", "Video Players", "HLS", "Push Notifications", "BLoC Pattern"],
        icon: "play-circle",
        status: "In Progress",
        completedDate: "Expected: March 2025",
        demoUrl: null,
        githubUrl: "https://github.com/developer/video-streaming-app",
        features: [
            "High-quality video streaming with adaptive bitrate",
            "Offline download functionality",
            "Live streaming capabilities",
            "User profiles and watch history",
            "Content recommendations based on viewing habits",
            "Social features including comments and ratings",
            "Chromecast and AirPlay support",
            "Parental controls and content filtering"
        ],
        challenges: [
            "Implementing adaptive bitrate streaming for various network conditions",
            "Managing offline content storage and encryption",
            "Creating smooth video playback across different devices",
            "Building real-time social features for live content"
        ]
    },
    {
        id: 8,
        title: "Inventory Management System",
        category: "web",
        description: "An enterprise-grade inventory management system with barcode scanning, automated reordering, and comprehensive reporting.",
        shortDescription: "Enterprise inventory management solution",
        fullDescription: "A sophisticated inventory management system designed for businesses of all sizes. Features include barcode scanning, automated reordering, supplier management, and detailed analytics with customizable reports.",
        technologies: ["React", "Python", "Django", "PostgreSQL", "Redis", "Celery", "Chart.js", "Docker"],
        icon: "warehouse",
        status: "Completed",
        completedDate: "June 2024",
        demoUrl: "https://inventory-demo.example.com",
        githubUrl: "https://github.com/developer/inventory-system",
        features: [
            "Barcode scanning for quick item identification",
            "Automated reordering based on stock levels",
            "Supplier management and purchase orders",
            "Multi-location inventory tracking",
            "Comprehensive reporting and analytics",
            "Low stock alerts and notifications",
            "Integration with accounting software",
            "Role-based access control"
        ],
        challenges: [
            "Implementing real-time inventory updates across multiple locations",
            "Creating flexible reporting system for various business needs",
            "Integrating barcode scanning with web application",
            "Designing automated reordering algorithms"
        ]
    }
];
