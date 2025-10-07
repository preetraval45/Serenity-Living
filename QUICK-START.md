# ⚡ Quick Start - Make Forms Work in 5 Minutes

## What I've Built For You

✅ **Contact Form** - Saves to PostgreSQL database
✅ **Tour Booking Form** - Saves to PostgreSQL database
✅ **Email Notifications** - Sends to serenitylivingoflexington@gmail.com
✅ **Deployed to Vercel** - Already live

## What You Need to Do (3 Simple Steps)

---

### 🗄️ Step 1: Create Database Tables (2 minutes)

1. Go to: **https://console.neon.tech**
2. Click **SQL Editor** (left sidebar)
3. Copy & paste this and click **Run**:

```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  inquiry VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tour_bookings (
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

✅ Done! You should see "CREATE TABLE" twice.

---

### ⚙️ Step 2: Add Database URL to Vercel (2 minutes)

1. Go to: **https://vercel.com/serenitylivingoflexington-7478s-projects/serenity-living**
2. Click **Settings** → **Environment Variables**
3. Find `DATABASE_URL` (or click **Add New** if it doesn't exist)
4. Set value to your Neon connection string:

```
postgresql://neondb_owner:npg_5juoyGFh8wSe@ep-jolly-rain-a-dorw5ys-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Note:** If this doesn't work, get the FULL connection string from Neon:
- Go to Neon Dashboard → Connection Details
- Copy the **"Pooled connection"** string

5. Also add (if not already there):

**NEXTAUTH_SECRET**
```
Run in terminal: openssl rand -base64 32
Then paste the result here
```

**NEXTAUTH_URL**
```
https://serenitylivingoflexington.com
```

6. Click **Save**

---

### 🚀 Step 3: Redeploy (1 minute)

1. In Vercel, go to **Deployments** tab
2. Click on the top deployment
3. Click **...** (three dots) → **Redeploy**
4. Click **Redeploy** to confirm

✅ Done! Wait 1-2 minutes for deployment to complete.

---

## 🧪 Test Your Forms

Visit: **https://serenity-living-nwdbu6xx7.vercel.app**

1. **Test Contact Form:**
   - Scroll to Contact section
   - Fill out and submit
   - Should see success message ✅

2. **Test Tour Booking:**
   - Click "Schedule Tour"
   - Fill out and submit
   - Should see success message ✅

3. **Check Database:**
   - Go back to Neon SQL Editor
   - Run: `SELECT * FROM contact_submissions;`
   - Run: `SELECT * FROM tour_bookings;`
   - You should see your test submissions! 🎉

---

## 📧 Email Notifications (Optional - 5 minutes)

To receive email alerts when forms are submitted:

1. **Generate Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Sign in with: **serenitylivingoflexington@gmail.com**
   - Create app password for "Mail"
   - Save the 16-character password

2. **Add to Vercel:**
   - Settings → Environment Variables
   - Add these 5 variables:

   ```
   EMAIL_SERVER_HOST = smtp.gmail.com
   EMAIL_SERVER_PORT = 587
   EMAIL_SERVER_USER = serenitylivingoflexington@gmail.com
   EMAIL_SERVER_PASSWORD = (your 16-char app password)
   EMAIL_FROM = serenitylivingoflexington@gmail.com
   ```

3. **Redeploy again**

✅ Now you'll get emails for every submission!

---

## ❓ Not Working? Quick Fixes

**Forms show error message:**
- Check that DATABASE_URL is set in Vercel
- Make sure tables were created in Neon
- Redeploy after adding environment variables

**Can't connect to database:**
- Make sure you're using the **pooled connection** string from Neon
- Should end with: `-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require`

**Check logs:**
- Vercel → Deployments → Latest → Functions → Select API route
- You'll see detailed error messages here

---

## 🎯 Summary

Your forms are **ready to go**! Just:
1. ✅ Create tables in Neon (run SQL)
2. ✅ Add DATABASE_URL to Vercel
3. ✅ Redeploy
4. ✅ Test!

**That's it!** Your contact and tour booking forms will be fully functional on your live website.

All submissions go to:
- 💾 Neon PostgreSQL database
- 📧 serenitylivingoflexington@gmail.com (when configured)
- 📊 Vercel logs

---

For detailed instructions, see: **SETUP-INSTRUCTIONS.md**
