#!/bin/bash

# Serenity Living - Complete Setup Script

echo "🏠 Serenity Living - Complete Setup"
echo "==================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📋 Creating environment file..."
    cp .env.local.example .env.local
    echo "✅ Environment file created. Please edit .env.local with your configuration."
fi

# Create SSL directory for Nginx
echo "🔐 Setting up SSL directory..."
mkdir -p nginx/ssl

# Build and start all services
echo "🐳 Building and starting Docker containers..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service health
echo "🔍 Checking service health..."

# Check Nginx
if curl -f http://localhost:80/health > /dev/null 2>&1; then
    echo "✅ Nginx reverse proxy: Healthy"
else
    echo "❌ Nginx reverse proxy: Not responding"
fi

# Check FastAPI
if curl -f http://localhost/api/health > /dev/null 2>&1; then
    echo "✅ FastAPI backend: Healthy"
else
    echo "❌ FastAPI backend: Not responding"
fi

# Check Next.js
if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ Next.js frontend: Healthy"
else
    echo "❌ Next.js frontend: Not responding"
fi

# Show access information
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo "🌐 Website: http://localhost"
echo "📚 API Docs: http://localhost/api/docs"
echo "🗄️ Database: localhost:5432"
echo "📦 Redis: localhost:6379"
echo ""
echo "📝 Logs: docker-compose logs -f"
echo "🛑 Stop: docker-compose down"
echo ""
echo "🔧 For production deployment:"
echo "1. Get SSL certificates and place them in nginx/ssl/"
echo "2. Update .env.production with your domain"
echo "3. Uncomment HTTPS configuration in nginx/nginx.conf"

# Show logs
echo ""
echo "📋 Recent logs:"
docker-compose logs --tail=10