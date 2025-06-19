// Terminal Command System for Portfolio
class TerminalSystem {
    constructor() {
        this.commands = {
            help: this.showHelp.bind(this),
            whoami: this.whoAmI.bind(this),
            skills: this.showSkills.bind(this),
            experience: this.showExperience.bind(this),
            projects: this.showProjects.bind(this),
            contact: this.showContact.bind(this),
            education: this.showEducation.bind(this),
            about: this.showAbout.bind(this),
            clear: this.clearTerminal.bind(this),
            github: this.showGithub.bind(this),
            linkedin: this.showLinkedIn.bind(this),
            tech: this.showTechStack.bind(this),
            certifications: this.showCertifications.bind(this),
            achievements: this.showAchievements.bind(this)
        };

        this.commandHistory = [];
        this.historyIndex = -1;
        this.isProcessing = false;

        this.init();
    }

    init() {
        this.terminalInput = document.getElementById('terminal-input');
        this.terminalOutput = document.getElementById('terminal-output');

        if (this.terminalInput) {
            this.terminalInput.addEventListener('keydown', this.handleKeydown.bind(this));
            this.terminalInput.addEventListener('input', this.handleInput.bind(this));
            this.terminalInput.focus();
        }

        // Auto-focus on terminal when clicked
        const terminalContainer = document.querySelector('.terminal-container');
        if (terminalContainer) {
            terminalContainer.addEventListener('click', () => {
                this.terminalInput.focus();
            });
        }
    }

    handleKeydown(e) {
        if (this.isProcessing) return;

        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                this.processCommand();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
            case 'Tab':
                e.preventDefault();
                this.autoComplete();
                break;
        }
    }

    handleInput(e) {
        // Real-time command suggestions could be added here
    }

    async processCommand() {
        const input = this.terminalInput.value.trim();
        if (!input) return;

        this.isProcessing = true;
        this.addToHistory(input);
        this.displayCommand(input);

        const [command, ...args] = input.toLowerCase().split(' ');

        // Simulate typing delay for realistic terminal feel
        await this.typewriterResponse(await this.executeCommand(command, args));

        this.terminalInput.value = '';
        this.isProcessing = false;
        this.scrollToBottom();
    }

    async executeCommand(command, args) {
        if (this.commands[command]) {
            return await this.commands[command](args);
        } else {
            // AI-like search functionality
            return this.searchAboutMe(command, args);
        }
    }

    displayCommand(input) {
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `
            <span class="prompt">developer@portfolio:~$</span>
            <span class="command">${input}</span>
        `;
        this.terminalOutput.appendChild(commandLine);
    }

    async typewriterResponse(response) {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'terminal-response';
        this.terminalOutput.appendChild(responseDiv);

        for (let i = 0; i < response.length; i++) {
            responseDiv.innerHTML = response.substring(0, i + 1);
            await new Promise(resolve => setTimeout(resolve, 20));
            this.scrollToBottom();
        }
    }

    addToHistory(command) {
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
    }

    navigateHistory(direction) {
        if (direction === -1 && this.historyIndex > 0) {
            this.historyIndex--;
        } else if (direction === 1 && this.historyIndex < this.commandHistory.length) {
            this.historyIndex++;
        }

        this.terminalInput.value = this.commandHistory[this.historyIndex] || '';
    }

    autoComplete() {
        const input = this.terminalInput.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));

        if (matches.length === 1) {
            this.terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            this.displayCommand(input);
            this.typewriterResponse(`Available commands: ${matches.join(', ')}`);
        }
    }

    scrollToBottom() {
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }

    // Command implementations
    showHelp() {
        return `
<span class="text-accent">Available Commands:</span><br>
• help - Show this help message<br>
• whoami - Basic information about me<br>
• skills - Display technical skills<br>
• experience - Work experience details<br>
• projects - Recent projects<br>
• contact - Contact information<br>
• education - Educational background<br>
• about - Detailed about section<br>
• github - GitHub profile<br>
• linkedin - LinkedIn profile<br>
• tech - Current tech stack<br>
• certifications - Professional certifications<br>
• achievements - Career achievements<br>
• clear - Clear terminal<br><br>
<span class="text-accent">Tip:</span> You can also ask me anything! Try: "tell me about your JavaScript experience"
        `;
    }

    whoAmI() {
        return `
<span class="text-accent">Developer Profile:</span><br>
Name: Rafi Ahmed<br>
Role: Backend Developer (Python)<br>
Experience: 2+ years in web development<br>
Location: Available for remote work<br>
Specialization: Modern web technologies & scalable applications<br>
Status: Open to new opportunities<br><br>
<span class="text-accent">Quick Stats:</span><br>
• 50+ completed projects<br>
• 2+ years of professional experience<br>
• 8+ technologies mastered<br>
• Multiple successful deployments
        `;
    }

    showSkills() {
        return `
<span class="text-accent">Technical Skills Overview:</span><br><br>
<span class="text-accent">Frontend:</span> React, Vue.js, Angular, TypeScript, HTML5, CSS3<br>
<span class="text-accent">Backend:</span> Node.js, Python, PHP, Java, C#<br>
<span class="text-accent">Databases:</span> MongoDB, PostgreSQL, MySQL, Redis<br>
<span class="text-accent">Cloud:</span> AWS, Google Cloud, Azure, Docker, Kubernetes<br>
<span class="text-accent">Tools:</span> Git, VS Code, Figma, Postman<br><br>
Use 'tech' for current tech stack details.
        `;
    }

    showExperience() {
        return `
<span class="text-accent">Work Experience:</span><br><br>
<span class="text-accent">Senior Full Stack Developer</span> | Digital Agency (Betopiragropu) (2024 - Present)<br>
• Leading development of scalable web applications<br>
• Mentoring junior developers<br>
• Architecting cloud-native solutions<br><br>
<span class="text-accent">Frontend Developer</span> | Digital Agency (2022 - 2023)<br>
• Developed responsive web applications<br>
• Collaborated with design teams<br>
• Implemented modern UI/UX patterns<br><br>
<span class="text-accent">Junior Laravel Developer</span> | Startup (2023 - 2024)<br>
• Built and maintained web applications<br>
• Learned agile development practices<br>
• Contributed to product development
        `;
    }

    showProjects() {
        return `
<span class="text-accent">Recent Projects:</span><br><br>
<span class="text-accent">1. E-Commerce Platform</span><br>
   Full-stack solution with React & Node.js<br>
   Features: Payment integration, inventory management<br><br>
<span class="text-accent">2. Task Management App</span><br>
   Collaborative tool with real-time updates<br>
   Tech: Vue.js, Firebase, PWA capabilities<br><br>
<span class="text-accent">3. Weather Forecast App</span><br>
   Cross-platform mobile app<br>
   Built with React Native & API integrations<br><br>
Visit the Projects section for more details!
        `;
    }

    showContact() {
        return `
<span class="text-accent">Contact Information:</span><br><br>
📧 Email: hello@developer.com<br>
📱 Phone: +1 (555) 123-4567<br>
🌍 Location: San Francisco, CA<br>
💼 LinkedIn: linkedin.com/in/developer<br>
🔗 GitHub: github.com/developer<br>
🌐 Portfolio: developer.portfolio.com<br><br>
<span class="text-accent">Availability:</span> Open to new opportunities<br>
<span class="text-accent">Response Time:</span> Usually within 24 hours
        `;
    }

    showEducation() {
        return `
<span class="text-accent">Educational Background:</span><br><br>
<span class="text-accent">Bachelor of Computer Science</span><br>
University of Technology (2017-2021)<br>
• Focus: Software Engineering & Web Development<br>
• GPA: 3.8/4.0<br>
• Relevant Coursework: Data Structures, Algorithms, Database Systems<br><br>
<span class="text-accent">Continuous Learning:</span><br>
• AWS Certified Solutions Architect<br>
• Google Cloud Professional Developer<br>
• Multiple Udemy & Coursera certifications<br>
• Active participation in developer communities
        `;
    }

    showAbout() {
        return `
<span class="text-accent">About Me:</span><br><br>
I'm a passionate full-stack developer with expertise in modern web technologies. 
I love creating efficient, scalable, and user-friendly applications that solve 
real-world problems.<br><br>
With a strong foundation in both frontend and backend development, I enjoy 
working with cutting-edge technologies and continuously learning new skills 
to stay current with industry trends.<br><br>
<span class="text-accent">What drives me:</span><br>
• Building innovative solutions<br>
• Continuous learning and improvement<br>
• Collaborating with talented teams<br>
• Creating positive user experiences<br>
• Contributing to open-source projects
        `;
    }

    showGithub() {
        return `
<span class="text-accent">GitHub Profile:</span><br><br>
🔗 github.com/developer<br><br>
<span class="text-accent">Stats:</span><br>
• 50+ public repositories<br>
• 1000+ contributions in the last year<br>
• Multiple starred projects<br>
• Active in open-source community<br><br>
<span class="text-accent">Popular Repositories:</span><br>
• react-dashboard-template (⭐ 245)<br>
• vue-component-library (⭐ 189)<br>
• node-api-boilerplate (⭐ 156)<br>
• css-animation-toolkit (⭐ 123)
        `;
    }

    showLinkedIn() {
        return `
<span class="text-accent">LinkedIn Profile:</span><br><br>
🔗 linkedin.com/in/developer<br><br>
<span class="text-accent">Professional Network:</span><br>
• 500+ connections<br>
• Regular posts about web development<br>
• Recommendations from colleagues<br>
• Active in developer groups<br><br>
<span class="text-accent">Recent Activity:</span><br>
• Shared insights on React best practices<br>
• Posted about modern CSS techniques<br>
• Engaged with tech community discussions<br>
• Published articles on development trends
        `;
    }

    showTechStack() {
        return `
<span class="text-accent">Current Tech Stack:</span><br><br>
<span class="text-accent">Frontend Framework:</span> React 18 with TypeScript<br>
<span class="text-accent">State Management:</span> Redux Toolkit / Zustand<br>
<span class="text-accent">Styling:</span> Tailwind CSS / Styled Components<br>
<span class="text-accent">Backend:</span> Node.js with Express / Next.js API routes<br>
<span class="text-accent">Database:</span> PostgreSQL with Prisma ORM<br>
<span class="text-accent">Authentication:</span> NextAuth.js / Auth0<br>
<span class="text-accent">Deployment:</span> Vercel / AWS / Docker<br>
<span class="text-accent">Testing:</span> Jest, React Testing Library, Cypress<br>
<span class="text-accent">Version Control:</span> Git with GitHub Actions CI/CD
        `;
    }

    showCertifications() {
        return `
<span class="text-accent">Professional Certifications:</span><br><br>
<span class="text-accent">Cloud Platforms:</span><br>
• AWS Certified Solutions Architect - Associate (2023)<br>
• Google Cloud Professional Developer (2023)<br>
• Microsoft Azure Fundamentals (2022)<br><br>
<span class="text-accent">Development:</span><br>
• Meta Frontend Developer Professional Certificate<br>
• Google UX Design Certificate<br>
• MongoDB Developer Certification<br><br>
<span class="text-accent">Project Management:</span><br>
• Scrum Master Certification (CSM)<br>
• Agile Development Practices Certificate
        `;
    }

    showAchievements() {
        return `
<span class="text-accent">Career Achievements:</span><br><br>
🏆 <span class="text-accent">Technical Excellence Award</span> - Tech Company (2023)<br>
   Recognized for outstanding performance in system architecture<br><br>
🌟 <span class="text-accent">Best Innovation Project</span> - Digital Agency (2022)<br>
   Led development of award-winning client solution<br><br>
📈 <span class="text-accent">Performance Metrics:</span><br>
• Improved application performance by 40%<br>
• Reduced deployment time by 60%<br>
• Mentored 5+ junior developers<br>
• Led 10+ successful project deliveries<br><br>
🎯 <span class="text-accent">Open Source Contributions:</span><br>
• Contributor to popular React libraries<br>
• Maintainer of CSS animation toolkit<br>
• 500+ GitHub stars across projects
        `;
    }

    clearTerminal() {
        this.terminalOutput.innerHTML = `
            <div class="terminal-line">
                <span class="prompt">developer@portfolio:~$</span> 
                <span class="command">clear</span>
            </div>
            <div class="terminal-response">
                Terminal cleared. Type 'help' for available commands.
            </div>
        `;
        return '';
    }

    searchAboutMe(query, args) {
        const allText = query + ' ' + args.join(' ');
        const lowerQuery = allText.toLowerCase();

        // Simple keyword matching for AI-like responses
        if (lowerQuery.includes('javascript') || lowerQuery.includes('js')) {
            return `
<span class="text-accent">JavaScript Expertise:</span><br><br>
I have extensive experience with JavaScript, including:<br>
• 5+ years of vanilla JavaScript development<br>
• Expert in ES6+ features and modern syntax<br>
• Deep understanding of async/await, promises, closures<br>
• Proficient in React, Vue.js, and Angular frameworks<br>
• Node.js backend development experience<br>
• TypeScript for type-safe development<br><br>
Recent projects include building SPAs with React and creating APIs with Node.js.
            `;
        } else if (lowerQuery.includes('react')) {
            return `
<span class="text-accent">React Development:</span><br><br>
React is one of my core specializations:<br>
• 3+ years of professional React development<br>
• Expert in hooks, context, and modern patterns<br>
• Experience with Next.js for full-stack applications<br>
• State management with Redux and Zustand<br>
• Testing with Jest and React Testing Library<br>
• Performance optimization and code splitting<br><br>
I've built several production React applications serving thousands of users.
            `;
        } else if (lowerQuery.includes('backend') || lowerQuery.includes('api')) {
            return `
<span class="text-accent">Backend Development:</span><br><br>
Strong backend development skills include:<br>
• Node.js with Express for RESTful APIs<br>
• Python with Django and Flask<br>
• Database design with PostgreSQL and MongoDB<br>
• Authentication and authorization systems<br>
• Microservices architecture<br>
• Docker containerization and deployment<br><br>
I focus on building scalable, secure, and well-documented APIs.
            `;
        } else if (lowerQuery.includes('cloud') || lowerQuery.includes('aws') || lowerQuery.includes('deployment')) {
            return `
<span class="text-accent">Cloud & Deployment:</span><br><br>
Extensive cloud development experience:<br>
• AWS: EC2, S3, Lambda, RDS, CloudFormation<br>
• Google Cloud Platform: Compute Engine, Cloud Functions<br>
• Docker containerization and Kubernetes orchestration<br>
• CI/CD pipelines with GitHub Actions<br>
• Infrastructure as Code with Terraform<br>
• Monitoring with CloudWatch and Prometheus<br><br>
I specialize in scalable, cloud-native application architecture.
            `;
        } else if (lowerQuery.includes('mobile') || lowerQuery.includes('app')) {
            return `
<span class="text-accent">Mobile Development:</span><br><br>
Mobile application development experience:<br>
• React Native for cross-platform mobile apps<br>
• Progressive Web Apps (PWA) development<br>
• Flutter for native performance<br>
• iOS and Android deployment experience<br>
• Mobile-first responsive design<br>
• App store optimization and publishing<br><br>
Built several mobile apps with thousands of downloads.
            `;
        } else if (lowerQuery.includes('salary') || lowerQuery.includes('rate') || lowerQuery.includes('cost')) {
            return `
<span class="text-accent">Compensation Discussion:</span><br><br>
I'm open to discussing compensation based on:<br>
• Project scope and complexity<br>
• Timeline and deliverables<br>
• Technology stack requirements<br>
• Long-term vs. short-term engagement<br><br>
Let's schedule a call to discuss your specific needs and budget.
Use the contact command for my details.
            `;
        } else if (lowerQuery.includes('hire') || lowerQuery.includes('available') || lowerQuery.includes('work')) {
            return `
<span class="text-accent">Availability & Hiring:</span><br><br>
Current Status: <span style="color: #00ff41;">AVAILABLE</span><br><br>
I'm currently open to:<br>
• Full-time remote positions<br>
• Contract/freelance projects<br>
• Part-time consulting<br>
• Technical mentoring<br><br>
Preferred engagement: 3-6 month projects with possibility of extension<br>
Response time: Within 24 hours<br><br>
Ready to start: Immediately after project agreement
            `;
        } else {
            return `
<span class="text-accent">Search Results:</span><br><br>
I didn't find specific information about "${allText}".<br><br>
Try these commands for detailed information:<br>
• 'skills' - Technical capabilities<br>
• 'experience' - Work history<br>
• 'projects' - Recent work<br>
• 'about' - Personal background<br>
• 'help' - All available commands<br><br>
Or ask me something specific like:<br>
• "tell me about your React experience"<br>
• "what's your backend expertise"<br>
• "are you available for hire"
            `;
        }
    }
}

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', function () {
    new TerminalSystem();
});