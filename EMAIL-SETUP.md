# Email Configuration Guide

## Overview
The contact and tour booking forms will:
1. ✅ Save submissions to PostgreSQL database
2. ✅ Log all submissions to console/logs
3. 📧 Send email notifications to **serenitylivingoflexington@gmail.com** (when configured)

Email notifications are **optional** - forms will work without email configuration, but you won't receive email alerts.

---

## How to Set Up Gmail for Email Notifications

### Step 1: Enable 2-Factor Authentication (if not already enabled)
1. Go to your Google Account: https://myaccount.google.com
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

### Step 2: Generate Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with your Gmail account (**serenitylivingoflexington@gmail.com**)
3. Under "Select app", choose **Mail**
4. Under "Select device", choose **Other (Custom name)**
5. Enter a name: **Serenity Living Website**
6. Click **Generate**
7. Google will show you a 16-character password like: `abcd efgh ijkl mnop`
8. **SAVE THIS PASSWORD** - you'll need it for the next step

### Step 3: Configure Environment Variables

#### For Local Development (.env.local)
Update the file `.env.local` with your App Password:

```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=serenitylivingoflexington@gmail.com
EMAIL_SERVER_PASSWORD=abcdefghijklmnop    # Your 16-char app password (no spaces)
EMAIL_FROM=serenitylivingoflexington@gmail.com
```

#### For Vercel Production
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

| Name | Value |
|------|-------|
| `EMAIL_SERVER_HOST` | `smtp.gmail.com` |
| `EMAIL_SERVER_PORT` | `587` |
| `EMAIL_SERVER_USER` | `serenitylivingoflexington@gmail.com` |
| `EMAIL_SERVER_PASSWORD` | Your 16-character App Password |
| `EMAIL_FROM` | `serenitylivingoflexington@gmail.com` |

4. Make sure to set these for **Production** environment
5. Redeploy your site after adding variables

---

## Testing Email Functionality

### Test Locally
1. Make sure PostgreSQL is running
2. Update `.env.local` with your Gmail App Password
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Visit http://localhost:3000
5. Fill out the contact form
6. Check:
   - ✅ Console logs show the submission
   - ✅ Email sent confirmation in console
   - 📧 Email received at serenitylivingoflexington@gmail.com

### Check Vercel Logs
After deploying to Vercel:
1. Go to your Vercel project dashboard
2. Click on **Deployments**
3. Click on the latest deployment
4. Click on **Functions** → Select the API route (e.g., `/api/contact`)
5. View logs to see:
   - Form submission data
   - Email sending status
   - Any errors

---

## What Emails Will You Receive?

### Contact Form Submission Email
**To:** serenitylivingoflexington@gmail.com
**Subject:** New Contact Form Submission - [Inquiry Type]

**Contains:**
- Name, Email, Phone
- Inquiry Type
- Message
- Timestamp

### Tour Booking Email
**To:** serenitylivingoflexington@gmail.com
**Subject:** New Tour Booking - [Name] on [Date]

**Contains:**
- Name, Email, Phone
- Preferred Date & Time
- Additional Message (if any)
- Action Required: Call to confirm

---

## Important Notes

### Email is Optional
- Forms will work WITHOUT email configuration
- Submissions are ALWAYS saved to the database
- Submissions are ALWAYS logged to console
- Email is just an additional notification layer

### Security
- ⚠️ **NEVER commit your App Password to Git**
- ⚠️ The `.env.local` file is git-ignored for security
- ✅ Store passwords in environment variables only
- ✅ Use different App Passwords for dev and production

### Troubleshooting

#### "Email sending failed" in logs but form works
- ✅ This is okay! Form submission succeeded and saved to database
- Check if environment variables are set correctly
- Verify App Password is valid (no spaces, 16 characters)
- Check Gmail security settings

#### Emails not being received
1. Check spam/junk folder
2. Verify App Password is correct
3. Check Vercel environment variables are set
4. View Vercel function logs for errors
5. Ensure 2FA is enabled on Gmail account

#### "Invalid credentials" error
- Generate a new App Password
- Make sure you're using the App Password, not your regular Gmail password
- Remove any spaces from the password string

---

## Alternative: View Submissions Without Email

If you prefer not to set up email, you can view submissions by:

### Option 1: Check Database Directly
```bash
# Connect to your database
psql "your-database-connection-string"

# View contact submissions
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 10;

# View tour bookings
SELECT * FROM tour_bookings ORDER BY created_at DESC LIMIT 10;
```

### Option 2: Check Vercel Logs
All submissions are logged to Vercel function logs with full details.

### Option 3: Build Admin Dashboard (Future)
You can create an admin page in your Next.js app to view submissions.

---

## Complete Environment Variables Summary

### Local (.env.local)
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/serenity_living

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production

# Email (Optional)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=serenitylivingoflexington@gmail.com
EMAIL_SERVER_PASSWORD=your-gmail-app-password
EMAIL_FROM=serenitylivingoflexington@gmail.com
```

### Vercel Production
```env
# Database (from Vercel Postgres or external provider)
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require

# NextAuth
NEXTAUTH_URL=https://serenitylivingoflexington.com
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Email (Optional)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=serenitylivingoflexington@gmail.com
EMAIL_SERVER_PASSWORD=your-gmail-app-password
EMAIL_FROM=serenitylivingoflexington@gmail.com
```

---

## Questions?

- Gmail App Passwords: https://support.google.com/accounts/answer/185833
- Vercel Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables
- SMTP Troubleshooting: Check Vercel function logs for detailed error messages
