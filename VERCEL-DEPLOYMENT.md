# Vercel Deployment Instructions

## Prerequisites
1. Vercel account (sign up at https://vercel.com)
2. PostgreSQL database (recommended: Vercel Postgres or Neon.tech)

## Step 1: Set up PostgreSQL Database on Vercel

### Option A: Using Vercel Postgres (Recommended)
1. Go to your project on Vercel Dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → Select **Postgres**
4. Choose a database name (e.g., `serenity-living-db`)
5. Select a region close to your users
6. Click **Create**
7. Vercel will automatically add `DATABASE_URL` to your environment variables

### Option B: Using External PostgreSQL (Neon, Supabase, etc.)
1. Create a PostgreSQL database on your provider
2. Get the connection string (format: `postgresql://user:password@host:port/database`)
3. Make sure to use the **pooled connection string** for serverless

## Step 2: Initialize Database Tables

After creating your database, run the initialization script:

```bash
# Set your production database URL temporarily
export DATABASE_URL="your-production-database-url"

# Run the initialization
node scripts/init-db-production.js
```

Or manually run these SQL commands in your database console:

```sql
-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  inquiry VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tour bookings table
CREATE TABLE IF NOT EXISTS tour_bookings (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(50) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Step 3: Configure Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

### Required Variables:
```
DATABASE_URL = your-postgres-connection-string
NEXTAUTH_SECRET = generate-a-long-random-string
NEXTAUTH_URL = https://serenitylivingoflexington.com
```

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### Optional Variables (for OAuth):
```
GOOGLE_CLIENT_ID = your-google-client-id
GOOGLE_CLIENT_SECRET = your-google-client-secret
```

## Step 4: Deploy to Vercel

### Method 1: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Method 2: Using Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to Vercel Dashboard
3. Click **Import Project**
4. Select your repository
5. Vercel will auto-detect Next.js and deploy

### Method 3: Manual Deploy
```bash
# Build the project
npm run build

# Deploy using Vercel CLI
vercel --prod
```

## Step 5: Verify Deployment

1. Visit your deployed site: https://serenitylivingoflexington.com
2. Navigate to the Contact page
3. Test the contact form
4. Test the tour booking modal
5. Check Vercel logs for any errors:
   - Go to project dashboard → **Deployments** → Click on latest deployment → **Logs**

## Step 6: Monitor Form Submissions

To view form submissions, you can:

### Option A: Direct Database Access
Connect to your database using a PostgreSQL client:
```bash
psql "your-database-connection-string"

# View contact submissions
SELECT * FROM contact_submissions ORDER BY created_at DESC;

# View tour bookings
SELECT * FROM tour_bookings ORDER BY created_at DESC;
```

### Option B: Add Admin Dashboard (Future Enhancement)
Create an admin panel in your app to view submissions.

## Troubleshooting

### Database Connection Issues
- Make sure you're using the **pooled connection string** for Vercel
- For Neon: Use the pooled connection (ends with `?sslmode=require`)
- For Supabase: Use the connection pooler URL
- Check that SSL is configured correctly in production

### Environment Variables Not Working
- Redeploy after adding new environment variables
- Make sure variables are set for **Production** environment
- Check variable names are exactly correct (case-sensitive)

### Forms Not Submitting
- Check browser console for errors
- Check Vercel function logs
- Verify API routes are deployed correctly
- Test API endpoints directly: `curl https://your-site.com/api/contact`

## Database Connection Strings Examples

### Vercel Postgres:
```
postgresql://username:password@host.postgres.vercel.com:5432/verceldb?sslmode=require
```

### Neon (Pooled):
```
postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech:5432/neondb?sslmode=require
```

### Supabase (Pooler):
```
postgresql://postgres:password@db.xxx.supabase.co:6543/postgres
```

## Post-Deployment Checklist

- [ ] Database tables created successfully
- [ ] All environment variables configured
- [ ] Site deployed and accessible
- [ ] Contact form working and saving to database
- [ ] Tour booking form working and saving to database
- [ ] No errors in Vercel logs
- [ ] SSL certificate active (https://)
- [ ] Domain configured correctly

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Neon Documentation: https://neon.tech/docs
- Check Vercel logs for detailed error messages
