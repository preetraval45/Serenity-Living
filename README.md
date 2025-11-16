# Serenity Living - Coming Soon Website

A modern Next.js application with FastAPI backend for a senior living facility website.

## 🚀 Features

- **Next.js Frontend**: Modern React-based frontend with SSR
- **FastAPI Backend**: High-performance Python API
- **PostgreSQL Database**: Robust database for user management
- **Docker Setup**: Complete containerized deployment
- **Authentication System**: JWT-based auth with social login support
- **3D Animations**: Three.js background animations
- **Responsive Design**: Mobile-first responsive layout

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Nginx Proxy   │────│   Next.js App    │────│  FastAPI Backend │
│   (Port 80/443) │    │   (Port 3000)    │    │   (Port 8000)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                │                        │
                         ┌──────────────────┐    ┌─────────────────┐
                         │     Redis        │    │   PostgreSQL    │
                         │   (Caching)      │    │   (Database)    │
                         └──────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Using Docker (Recommended)

1. **Clone and Navigate**
   ```bash
   cd serenity-living
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Build and Run**
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**
   - Website: http://localhost
   - API Documentation: http://localhost/api/docs
   - Database Admin: http://localhost:5432

### Local Development

1. **Frontend Setup**
   ```bash
   npm install
   npm run dev
   ```

2. **Backend Setup**
   ```bash
   cd api
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Database Setup**
   ```bash
   docker run --name serenity-db -e POSTGRES_PASSWORD=serenity_password -p 5432:5432 -d postgres:15
   ```

## 📁 Project Structure

```
serenity-living/
├── src/
│   ├── app/                    # Next.js 13+ app directory
│   │   ├── globals.css        # Global styles with TailwindCSS
│   │   ├── layout.tsx         # Root layout component
│   │   ├── page.tsx           # Home page
│   │   └── not-found.tsx      # 404 page
│   └── components/            # Reusable React components
│       ├── Navigation.tsx     # Site navigation
│       ├── Hero.tsx          # Hero section
│       ├── About.tsx         # About section
│       ├── Services.tsx      # Services section
│       ├── Gallery.tsx       # Photo gallery
│       ├── Contact.tsx       # Contact form
│       └── Footer.tsx        # Site footer
├── public/                    # Static assets
│   └── images/               # Optimized images
├── api/                      # FastAPI backend
│   ├── main.py              # Main API application
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile          # Backend container
├── db/                       # Database configuration
│   └── init.sql             # Database schema
├── nginx/                    # Nginx configuration
│   └── nginx.conf           # Reverse proxy config
├── docker-compose.yml        # Multi-container setup
└── tailwind.config.ts       # TailwindCSS configuration
```

## 🎨 Design System

### Color Palette (Greenish-Blue Theme)
- **Primary**: Green tones (#10b981 to #022c22)
- **Secondary**: Teal tones (#14b8a6 to #042f2e)
- **Accent**: Cyan tones (#06b6d4 to #083344)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Poppins (serif-style)
- **Body**: Nunito (sans-serif)
- **Base Size**: 1.125rem (18px) for better readability

### Accessibility Features
- High contrast ratios (WCAG AA compliant)
- Focus indicators for keyboard navigation
- Screen reader optimized
- Semantic HTML structure
- Skip navigation links

## 🔌 API Endpoints

### Public Endpoints
- `GET /` - API health check
- `GET /health` - System health status
- `GET /api/services` - Available services
- `POST /api/contact` - Submit contact form
- `POST /api/tour-request` - Request facility tour
- `POST /api/newsletter` - Newsletter subscription

### Database Schema
- **contact_forms** - Contact form submissions
- **tour_requests** - Tour scheduling requests
- **newsletter_subscriptions** - Email subscriptions
- **services** - Available care services
- **residents** - Future CRM functionality

## 🚀 Deployment

### Docker Production Deployment

1. **Environment Setup**
   ```bash
   cp .env.example .env.production
   # Configure production values
   ```

2. **SSL Certificates**
   ```bash
   # Place SSL certificates in nginx/ssl/
   # Uncomment HTTPS server block in nginx.conf
   ```

3. **Deploy**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

### Environment Variables

Key environment variables for production:

```bash
# Database
DATABASE_URL=postgresql://user:pass@db:5432/serenity_db

# API Security
SECRET_KEY=your-256-bit-secret
CORS_ORIGINS=https://yourdomain.com

# Email Service
MAIL_SERVER=your-smtp-server
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
```

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend:**
- `uvicorn main:app --reload` - Start development server
- `pytest` - Run tests
- `alembic upgrade head` - Run database migrations

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind for consistent styling

## 📞 Support & Contact

For technical support or questions about this implementation:
- Review the API documentation at `/api/docs`
- Check Docker logs: `docker-compose logs`
- Verify database connectivity: `docker-compose exec db psql -U serenity_user serenity_db`

## 📄 License

This project is proprietary software for Serenity Living of Lexington.

---

**Serenity Living** - Where Compassionate Care Meets Comfortable Living  
120 Rice Dr, Gilbert, SC 29054 | (855) 555-1234