const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: false // Temporarily disable CSP to test CSS loading
}));

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Sample project data (can be moved to a database later)
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
        image: "🛒",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        category: "Full Stack"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        technologies: ["React", "Socket.io", "Node.js", "PostgreSQL", "Redux"],
        image: "📋",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        category: "Full Stack"
    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with interactive charts and maps.",
        technologies: ["JavaScript", "API Integration", "Chart.js", "CSS3", "HTML5"],
        image: "🌤️",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        category: "Frontend"
    },
    {
        id: 4,
        title: "Blog Platform",
        description: "A modern blog platform with markdown support, comment system, and admin dashboard for content management.",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
        image: "📝",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        category: "Full Stack"
    },
    {
        id: 5,
        title: "Social Media Analytics",
        description: "A data visualization tool for social media analytics with interactive dashboards and real-time data processing.",
        technologies: ["Python", "Django", "D3.js", "Redis", "Celery"],
        image: "📊",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        category: "Data Science"
    },
    {
        id: 6,
        title: "Mobile Banking App",
        description: "A secure mobile banking application with biometric authentication, transaction history, and money transfer capabilities.",
        technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Stripe"],
        image: "🏦",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        category: "Mobile"
    }
];

// Sample skills data
const skills = {
    frontend: [
        { name: "HTML5", level: 90, icon: "fab fa-html5" },
        { name: "CSS3", level: 85, icon: "fab fa-css3-alt" },
        { name: "JavaScript", level: 80, icon: "fab fa-js-square" },
        { name: "React", level: 75, icon: "fab fa-react" },
        { name: "Vue.js", level: 70, icon: "fab fa-vuejs" },
        { name: "TypeScript", level: 65, icon: "fab fa-js-square" }
    ],
    backend: [
        { name: "Node.js", level: 80, icon: "fab fa-node-js" },
        { name: "Python", level: 75, icon: "fab fa-python" },
        { name: "Express.js", level: 70, icon: "fas fa-server" },
        { name: "Django", level: 65, icon: "fab fa-python" },
        { name: "MongoDB", level: 70, icon: "fas fa-database" },
        { name: "PostgreSQL", level: 65, icon: "fas fa-database" }
    ],
    tools: [
        { name: "Git", level: 85, icon: "fab fa-git-alt" },
        { name: "GitHub", level: 80, icon: "fab fa-github" },
        { name: "Docker", level: 60, icon: "fab fa-docker" },
        { name: "AWS", level: 55, icon: "fab fa-aws" },
        { name: "VS Code", level: 90, icon: "fas fa-code" },
        { name: "Figma", level: 70, icon: "fab fa-figma" }
    ]
};

// Routes

// API Routes

// Get all projects
app.get('/api/projects', (req, res) => {
    try {
        const { category, featured } = req.query;
        let filteredProjects = projects;

        if (category) {
            filteredProjects = filteredProjects.filter(project => 
                project.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (featured === 'true') {
            filteredProjects = filteredProjects.filter(project => project.featured);
        }

        res.json({
            success: true,
            data: filteredProjects,
            count: filteredProjects.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching projects',
            error: error.message
        });
    }
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
    try {
        const projectId = parseInt(req.params.id);
        const project = projects.find(p => p.id === projectId);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching project',
            error: error.message
        });
    }
});

// Get skills
app.get('/api/skills', (req, res) => {
    try {
        const { category } = req.query;
        
        if (category && skills[category]) {
            res.json({
                success: true,
                data: skills[category]
            });
        } else {
            res.json({
                success: true,
                data: skills
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching skills',
            error: error.message
        });
    }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Create transporter (configure with your email service)
        const transporter = nodemailer.createTransporter({
            service: 'gmail', // or your preferred service
            auth: {
                user: process.env.EMAIL_USER || 'your-email@gmail.com',
                pass: process.env.EMAIL_PASS || 'your-app-password'
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: process.env.CONTACT_EMAIL || 'your-email@gmail.com',
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // Send email (only if email is configured)
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
        } else {
            console.log('Email not configured. Contact form data:', { name, email, subject, message });
        }

        res.json({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending message. Please try again later.',
            error: error.message
        });
    }
});

// Get portfolio statistics
app.get('/api/stats', (req, res) => {
    try {
        const stats = {
            totalProjects: projects.length,
            featuredProjects: projects.filter(p => p.featured).length,
            categories: [...new Set(projects.map(p => p.category))],
            totalTechnologies: [...new Set(projects.flatMap(p => p.technologies))].length,
            skillsCount: Object.values(skills).flat().length
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Portfolio API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files for any other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Portfolio server running on port ${PORT}`);
    console.log(`📱 Local: http://localhost:${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️  Email not configured. Contact form will log to console.');
        console.log('   Set EMAIL_USER and EMAIL_PASS environment variables to enable email.');
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

module.exports = app;
