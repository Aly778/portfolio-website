# Portfolio Website

A professional portfolio website for a software engineering student, built with HTML, CSS, JavaScript, and Node.js.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Dynamic navigation, scroll animations, and hover effects
- **Project Showcase**: Display your software projects with detailed information
- **Contact Form**: Functional contact form with email integration
- **API Endpoints**: RESTful API for dynamic content management
- **Performance Optimized**: Fast loading times and smooth user experience

## Technologies Used

### Frontend
- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Inter)

### Backend
- Node.js
- Express.js
- Nodemailer (for contact form)
- CORS, Helmet, Morgan (middleware)

## Project Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Node.js server
├── package.json        # Dependencies and scripts
├── env.example         # Environment variables template
└── README.md           # This file
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Deployment

1. **Build for production**
   ```bash
   npm start
   ```

2. **Deploy to your preferred platform**
   - Heroku
   - Vercel
   - Netlify
   - DigitalOcean
   - AWS

## Customization

### Personal Information
1. **Update HTML content** in `index.html`:
   - Replace "Your Name" with your actual name
   - Update the hero section description
   - Modify contact information

2. **Update project data** in `script.js`:
   - Replace sample projects with your actual projects
   - Update project descriptions, technologies, and links
   - Add or remove projects as needed

3. **Update skills** in `server.js`:
   - Modify the skills array to match your expertise
   - Add or remove skill categories
   - Update skill levels and icons

### Styling
- **Colors**: Modify CSS custom properties in `styles.css`
- **Fonts**: Change Google Fonts import in `index.html`
- **Layout**: Adjust grid and flexbox properties
- **Animations**: Customize keyframe animations

### Contact Form
- **Email Service**: Configure Nodemailer with your email provider
- **Form Fields**: Add or remove form fields in HTML and server
- **Validation**: Customize form validation rules

## API Endpoints

The server provides the following API endpoints:

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `GET /api/skills` - Get skills data
- `POST /api/contact` - Submit contact form
- `GET /api/stats` - Get portfolio statistics
- `GET /api/health` - Health check

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading**: Images and content load as needed
- **Smooth Scrolling**: Native CSS smooth scrolling
- **Optimized Assets**: Minified CSS and JavaScript
- **Responsive Images**: Adaptive image sizing
- **Caching**: Proper cache headers for static assets

## Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Form data validation
- **XSS Protection**: Content Security Policy
- **Rate Limiting**: (Can be added for production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help customizing the portfolio:

1. Check the documentation
2. Review the code comments
3. Open an issue on GitHub
4. Contact the developer

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Admin dashboard for content management
- [ ] Blog section
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced animations
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Progressive Web App (PWA) features

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Express.js community for excellent documentation
- All open-source contributors who made this possible

---

**Happy coding! 🚀**
