@echo off
echo 🏠 Serenity Living - Complete Setup
echo ===================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

REM Create environment file if it doesn't exist
if not exist .env.local (
    echo 📋 Creating environment file...
    copy .env.local.example .env.local
    echo ✅ Environment file created. Please edit .env.local with your configuration.
)

REM Create SSL directory for Nginx
echo 🔐 Setting up SSL directory...
if not exist nginx\ssl mkdir nginx\ssl

REM Build and start all services
echo 🐳 Building and starting Docker containers...
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

echo ⏳ Waiting for services to be ready...
timeout 30 >nul

echo 🎉 Setup Complete!
echo ==================
echo 🌐 Website: http://localhost:9080
echo 📚 API Docs: http://localhost:9080/api/docs
echo 🗄️ Database: localhost:9001
echo 📦 Redis: localhost:9002
echo.
echo 📝 Logs: docker-compose logs -f
echo 🛑 Stop: docker-compose down
echo.
echo 🔧 For production deployment:
echo 1. Get SSL certificates and place them in nginx\ssl\
echo 2. Update .env.production with your domain
echo 3. Uncomment HTTPS configuration in nginx\nginx.conf

echo.
echo 📋 Recent logs:
docker-compose logs --tail=10

pause