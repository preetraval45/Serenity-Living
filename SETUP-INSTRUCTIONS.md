# 🚀 Final Setup Instructions

## ✅ What's Already Done
- ✅ Forms are coded and working
- ✅ Database schema created
- ✅ Email notifications configured
- ✅ Code deployed to Vercel
- ✅ All code committed and pushed to GitHub

## 📋 What You Need to Do Now (5-10 minutes)

### Step 1: Set Up Database Tables in Neon

1. **Go to Neon Console:**
   - Visit: https://console.neon.tech
   - Select your project (the one with the connection string you provided)

2. **Open SQL Editor:**
   - Click **SQL Editor** in the left sidebar
   - Copy and paste this SQL code:

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

3. **Run the SQL:**
   - Click **Run** button
   - You should see: "CREATE TABLE" success message twice

---

### Step 2: Update Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/serenitylivingoflexington-7478s-projects/serenity-living

2. **Navigate to Settings:**
   - Click **Settings** tab
   - Click **Environment Variables** in the left sidebar

3. **Update/Add DATABASE_URL:**
   - If `DATABASE_URL` exists, click **Edit** (or delete and re-add)
   - If it doesn't exist, click **Add New**

   **Name:** `DATABASE_URL`

   **Value:** Your Neon connection string (the one you provided):
   ```
   postgresql://neondb_owner:npg_5juoyGFh8wSe@ep-jolly-rain-a-dorw5ys-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

   **Note:** Make sure to get the FULL connection string from Neon if this one doesn't work. The format should be:
   ```
   postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
   ```

   - Select: **Production**, **Preview**, **Development** (all three)
   - Click **Save**

4. **Add Other Required Variables (if not already there):**

   **Name:** `NEXTAUTH_SECRET`
   **Value:** (Generate a secure random string)
   ```bash
   # Run this in terminal to generate:
   openssl rand -base64 32
   ```

   **Name:** `NEXTAUTH_URL`
   **Value:** `https://serenitylivingoflexington.com` (or your Vercel URL for now)

5. **Optional - Add Email Variables (for notifications):**

   **Name:** `EMAIL_SERVER_HOST`
   **Value:** `smtp.gmail.com`

   **Name:** `EMAIL_SERVER_PORT`
   **Value:** `587`

   **Name:** `EMAIL_SERVER_USER`
   **Value:** `serenitylivingoflexington@gmail.com`

   **Name:** `EMAIL_SERVER_PASSWORD`
   **Value:** (Your Gmail App Password - see EMAIL-SETUP.md)

   **Name:** `EMAIL_FROM`
   **Value:** `serenitylivingoflexington@gmail.com`

---

### Step 3: Redeploy Vercel

After adding/updating environment variables:

**Option A - Via Vercel Dashboard:**
1. Go to **Deployments** tab
2. Click on the most recent deployment
3. Click **...** (three dots) → **Redeploy**
4. Check **Use existing Build Cache**: ✅
5. Click **Redeploy**

**Option B - Via Command Line:**
```bash
vercel --prod
```

---

### Step 4: Test Your Forms

1. **Visit your site:**
   - https://serenity-living-nwdbu6xx7.vercel.app
   - Or your custom domain once configured

2. **Test Contact Form:**
   - Scroll to Contact section
   - Fill out and submit the form
   - You should see success message

3. **Test Tour Booking:**
   - Click "Schedule Tour" button
   - Fill out the form
   - Select date and time
   - Submit and check for success message

4. **Verify Submissions:**
   - Go back to Neon SQL Editor
   - Run: `SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5;`
   - Run: `SELECT * FROM tour_bookings ORDER BY created_at DESC LIMIT 5;`
   - You should see your test submissions

---

## 🔍 Troubleshooting

### Forms Not Working?

1. **Check Vercel Logs:**
   - Go to Vercel → Deployments → Click latest deployment
   - Click **Functions** → Select `/api/contact` or `/api/book-tour`
   - Look for error messages

2. **Check Database Connection:**
   - Make sure DATABASE_URL is set correctly
   - Connection string should be the **pooled connection** from Neon
   - Should end with `?sslmode=require`

3. **Common Issues:**
   - ❌ Wrong connection string format
   - ❌ Tables not created in database
   - ❌ Environment variables not saved
   - ❌ Forgot to redeploy after adding variables

### Get Correct Neon Connection String

1. Go to: https://console.neon.tech
2. Select your project
3. Click **Dashboard**
4. Look for **Connection Details** or **Connection String**
5. **IMPORTANT:** Use the **Pooled connection** string, NOT the direct connection
6. Format should be: `postgresql://USER:PASSWORD@HOST-pooler.region.aws.neon.tech/DATABASE?sslmode=require`

---

## 📧 Email Setup (Optional but Recommended)

Forms will work without email, but you won't get notifications. To set up email:

1. Read **EMAIL-SETUP.md** for detailed instructions
2. Generate Gmail App Password
3. Add email environment variables to Vercel (listed above)
4. Redeploy

---

## ✅ Verification Checklist

- [ ] SQL tables created in Neon database
- [ ] DATABASE_URL added to Vercel environment variables
- [ ] NEXTAUTH_SECRET added to Vercel
- [ ] Site redeployed after adding variables
- [ ] Contact form tested and working
- [ ] Tour booking form tested and working
- [ ] Submissions visible in Neon database
- [ ] (Optional) Email notifications working

---

## 🎉 Once Everything Works

Your forms will:
1. ✅ Save all submissions to your Neon PostgreSQL database
2. ✅ Show success/error messages to users
3. ✅ Send email notifications (if configured)
4. ✅ Log all submissions to Vercel logs
5. ✅ Work on your live website

---

## 📞 Need Help?

- **Neon Issues:** https://neon.tech/docs
- **Vercel Issues:** https://vercel.com/docs
- **Check Vercel Logs:** Deployments → Functions → View logs
- **Database SQL File:** See `database-setup.sql` in project root
