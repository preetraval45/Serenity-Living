# Serenity Living - Coming Soon Website

A modern Next.js application with FastAPI backend for a senior living facility website.

## 🚀 Features

- **Next.js Frontend**: Modern React-based frontend with JavaScript
- **FastAPI Backend**: High-performance Python API
- **PostgreSQL Database**: Robust database for user management
- **Docker Setup**: Complete containerized deployment
- **Authentication System**: JWT-based auth with social login support
- **3D Animations**: Three.js background animations
- **Responsive Design**: Mobile-first responsive layout

## 📋 Prerequisites

- Docker & Docker Compose
- Node.js 18+ (if running without Docker)
- Python 3.11+ (if running backend without Docker)
- PostgreSQL (if running without Docker)

## 🐳 Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Serenity-Living
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs
   - Database: localhost:5432

## 💻 Local Development Setup

### Frontend (Next.js)

1. **Install Node.js dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Update the values in `.env.local` as needed.

3. **Run the development server**
   ```bash
   npm run dev
   ```

### Backend (FastAPI)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

5. **Run the FastAPI server**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Database Setup

1. **Install PostgreSQL** (if not using Docker)

2. **Create database**
   ```sql
   CREATE DATABASE serenity_living;
   CREATE USER postgres WITH PASSWORD 'postgres';
   GRANT ALL PRIVILEGES ON DATABASE serenity_living TO postgres;
   ```

3. **Database will auto-create tables** when the FastAPI server starts

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/serenity_living"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

#### Backend (.env)
```bash
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/serenity_living"
JWT_SECRET="your-jwt-secret-key"
```

## 📚 API Documentation

Once the FastAPI server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Available Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/reset-password` - Password reset request
- `GET /api/users` - Get all users (authenticated)

## 🏗️ Project Structure

```
Serenity-Living/
├── backend/                 # FastAPI backend
│   ├── main.py             # FastAPI application
│   ├── database.py         # Database configuration
│   ├── models.py           # SQLAlchemy models
│   ├── schemas.py          # Pydantic schemas
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile         # Backend Docker config
├── src/
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   └── lib/              # Utility libraries
├── docker-compose.yml     # Docker composition
├── Dockerfile            # Frontend Docker config
├── package.json          # Node.js dependencies
└── README.md
```

## 🎨 Frontend Components

- **ComingSoon**: Main landing page with countdown
- **LoadingScreen**: Animated loading component
- **ThreeBackground**: 3D animated background
- **Authentication**: Login/Signup forms with validation

## 🔐 Authentication

The application supports:
- Email/password authentication
- JWT token-based sessions
- Social login (Google, Apple) - requires API keys
- Password reset functionality
- Protected routes

## 🐋 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild specific service
docker-compose build frontend
docker-compose build backend

# Run database migrations
docker-compose exec backend python -c "from database import engine; from models import Base; Base.metadata.create_all(engine)"
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000/8000
   npx kill-port 3000
   npx kill-port 8000
   ```

2. **Database connection issues**
   - Check PostgreSQL is running
   - Verify connection string in environment variables
   - Ensure database exists

3. **Module resolution issues**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

4. **TailwindCSS not loading**
   - Check `tailwind.config.js` configuration
   - Verify CSS imports in `globals.css`

5. **Python dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   pip install -r requirements.txt
   ```

## 📄 License

This project is proprietary software for Serenity Living.

## 🤝 Contributing

Please contact the development team before making contributions.

---

**Note**: This is a development setup. For production deployment, additional security measures and optimizations should be implemented.