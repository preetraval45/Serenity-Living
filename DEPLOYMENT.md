# Deployment Guide for Serenity Living Website

## Overview
This guide will help you deploy the Serenity Living website to your domain `theserenityliving.com` with HTTPS support.

## Prerequisites
- A hosting provider that supports Node.js (Vercel, Netlify, or VPS)
- Domain configured with your hosting provider
- SSL certificate for HTTPS (most providers offer free SSL)

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy from your project directory
```bash
vercel
```

### Step 3: Configure Domain
1. Go to your Vercel dashboard
2. Add your custom domain `theserenityliving.com`
3. Configure your GoDaddy DNS to point to Vercel:
   - Add CNAME record: `www` -> `cname.vercel-dns.com`
   - Add A record: `@` -> `76.76.19.61`

### Step 4: Environment Variables
Set these in your Vercel dashboard:
- `EMAIL_USER`: serenitylivingoflexington@gmail.com
- `EMAIL_PASS`: (your Gmail app password)

## Option 2: Deploy to VPS with Docker

### Step 1: Build and run with Docker
```bash
# Build the Docker image
docker build -t serenity-living .

# Run the container
docker run -p 3000:3000 \
  -e EMAIL_USER=serenitylivingoflexington@gmail.com \
  -e EMAIL_PASS=your-gmail-app-password \
  serenity-living
```

### Step 2: Set up Nginx for HTTPS
Create nginx configuration:
```nginx
server {
    listen 443 ssl;
    server_name theserenityliving.com;

    ssl_certificate /path/to/ssl/cert;
    ssl_certificate_key /path/to/ssl/key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name theserenityliving.com;
    return 301 https://$server_name$request_uri;
}
```

## Gmail Setup for Contact Form

1. Enable 2-factor authentication on your Gmail account
2. Generate an app password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
3. Use this app password as EMAIL_PASS environment variable

## Domain Configuration (GoDaddy)

### DNS Records to add:
- A Record: `@` points to your hosting IP
- CNAME Record: `www` points to your hosting provider
- MX Records: (if you want to use email with your domain)

## SSL Certificate
Most hosting providers offer free SSL certificates. Make sure to:
1. Enable HTTPS
2. Force HTTPS redirects
3. Enable HSTS (already configured in next.config.js)

## Environment Variables Needed:
- `EMAIL_USER`: serenitylivingoflexington@gmail.com
- `EMAIL_PASS`: Gmail app password
- `NEXT_PUBLIC_API_URL`: https://theserenityliving.com

## Testing
1. Visit `https://theserenityliving.com`
2. Test the contact form
3. Check that all pages load correctly
4. Verify HTTPS is working

## Features Included:
- ✅ Auto-changing image carousel on homepage
- ✅ Removed gallery and team pages
- ✅ Removed AI chatbot
- ✅ Updated About page with your content
- ✅ Contact form sends to serenitylivingoflexington@gmail.com
- ✅ HTTPS configuration
- ✅ Responsive design
- ✅ SEO optimized

## Ongoing Maintenance:
- Monitor contact form submissions
- Update content as needed
- Keep dependencies updated
- Monitor website performance

For any issues during deployment, check the logs and ensure all environment variables are set correctly.