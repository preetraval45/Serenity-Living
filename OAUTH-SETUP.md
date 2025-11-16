# OAuth Setup Guide
# Google and Apple Authentication for Serenity Living Website

## Version 4.0 | Last Updated: September 30, 2025

---

## Table of Contents
1. [Overview](#overview)
2. [Google OAuth Setup](#google-oauth-setup)
3. [Apple OAuth Setup](#apple-oauth-setup)
4. [Environment Configuration](#environment-configuration)
5. [Testing OAuth](#testing-oauth)
6. [Troubleshooting](#troubleshooting)

---

## Overview

This guide explains how to set up Google and Apple OAuth authentication for the Serenity Living website. OAuth allows users to sign in using their existing Google or Apple accounts, improving user experience and security.

**Current Status:**
- ✅ OAuth providers configured in code
- ⚠️ Requires API credentials from Google and Apple
- ⚠️ Environment variables need to be set

---

## Google OAuth Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project: "Serenity Living"
4. Click "Create"

### Step 2: Enable Google+ API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click "Enable"

### Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Configure the consent screen if prompted:
   - User Type: External
   - App name: Serenity Living
   - User support email: serenitylivingoflexington@gmail.com
   - Developer contact: serenitylivingoflexington@gmail.com
   - Scopes: email, profile, openid
   - Test users: Add your email for testing

4. Create OAuth Client ID:
   - Application type: Web application
   - Name: Serenity Living Web Client
   - Authorized JavaScript origins:
     - http://localhost:3000 (for development)
     - https://yourdomain.com (for production)
   - Authorized redirect URIs:
     - http://localhost:3000/api/auth/callback/google
     - https://yourdomain.com/api/auth/callback/google

5. Click "Create"
6. Copy your **Client ID** and **Client Secret**

### Step 4: Configure Environment Variables

Add to your `.env.local` file:

```bash
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

### Step 5: Verify Domain (Production Only)

For production:
1. Go to "OAuth consent screen"
2. Add your production domain to "Authorized domains"
3. Submit for verification if needed

---

## Apple OAuth Setup

### Prerequisites:
- Apple Developer Account ($99/year)
- Admin access to your developer account

### Step 1: Register an App ID

1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Navigate to "Certificates, Identifiers & Profiles"
3. Click "Identifiers" → "+" button
4. Select "App IDs" → "Continue"
5. Choose "App" → "Continue"
6. Configure your App ID:
   - Description: Serenity Living Web
   - Bundle ID: com.serenityliving.web
   - Capabilities: Enable "Sign In with Apple"
7. Click "Continue" → "Register"

### Step 2: Create a Services ID

1. Click "Identifiers" → "+" button
2. Select "Services IDs" → "Continue"
3. Configure:
   - Description: Serenity Living Website
   - Identifier: com.serenityliving.web.service
4. Enable "Sign In with Apple"
5. Click "Configure":
   - Primary App ID: Select the App ID you created
   - Web Domain: yourdomain.com
   - Return URLs:
     - https://yourdomain.com/api/auth/callback/apple
6. Click "Save" → "Continue" → "Register"

### Step 3: Create a Key

1. Click "Keys" → "+" button
2. Key Name: Serenity Living Sign In with Apple Key
3. Enable "Sign In with Apple"
4. Click "Configure":
   - Primary App ID: Select your App ID
5. Click "Save" → "Continue" → "Register"
6. **Download the key file (.p8)** - You can only download it once!
7. Note your **Key ID**

### Step 4: Get Team ID

1. In Apple Developer Portal, go to "Membership"
2. Copy your **Team ID**

### Step 5: Configure Environment Variables

Add to your `.env.local` file:

```bash
APPLE_ID=com.serenityliving.web.service
APPLE_TEAM_ID=your-team-id-here
APPLE_KEY_ID=your-key-id-here
APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
[Paste the entire contents of your .p8 file here]
-----END PRIVATE KEY-----"
```

**Important:**
- Keep the quotes around the private key
- Include the BEGIN and END markers
- The key must be on a single line or properly formatted

---

## Environment Configuration

### Development (.env.local)

Create a `.env.local` file in your project root:

```bash
# Email Configuration
EMAIL_USER=serenitylivingoflexington@gmail.com
EMAIL_PASS=your-gmail-app-password

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/serenity_living

# NextAuth
NEXTAUTH_SECRET=generate-a-random-secret-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Apple OAuth
APPLE_ID=com.serenityliving.web.service
APPLE_TEAM_ID=your-apple-team-id
APPLE_KEY_ID=your-apple-key-id
APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
your-private-key-content
-----END PRIVATE KEY-----"
```

### Production (.env.production)

In Vercel (or your hosting platform):

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all the variables from above
4. Update `NEXTAUTH_URL` to your production domain
5. Update redirect URIs to match production domain

---

## Testing OAuth

### Local Testing:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000/auth/signin

3. Click "Continue with Google" or "Continue with Apple"

4. Test the OAuth flow:
   - Should redirect to provider's login page
   - User authenticates
   - Redirects back to your site
   - User is logged in

### Production Testing:

1. Deploy to Vercel
2. Set all environment variables in Vercel dashboard
3. Test at your production URL
4. Verify redirect URIs match your production domain

---

## Troubleshooting

### Google OAuth Issues:

**Error: "redirect_uri_mismatch"**
- Solution: Check that your redirect URI in Google Console exactly matches your configured URL
- Format: `https://yourdomain.com/api/auth/callback/google`

**Error: "Access blocked: This app's request is invalid"**
- Solution: Configure OAuth consent screen properly
- Add test users if app is not verified

**Error: "Invalid client"**
- Solution: Verify CLIENT_ID and CLIENT_SECRET are correct
- Check that credentials are for a web application

### Apple OAuth Issues:

**Error: "invalid_client"**
- Solution: Verify all Apple credentials are correct
- Check that APPLE_ID matches your Services ID
- Ensure TEAM_ID is correct

**Error: "invalid_request"**
- Solution: Check redirect URIs in Apple Developer Portal
- Verify domain is properly configured

**Error: "invalid_grant"**
- Solution: Check that private key is properly formatted
- Ensure key file contents are complete
- Verify KEY_ID is correct

### General OAuth Issues:

**Users can't sign in**
1. Check server logs for errors
2. Verify all environment variables are set
3. Confirm redirect URIs match exactly
4. Test with different browsers
5. Clear cookies and try again

**OAuth works locally but not in production**
1. Verify production environment variables
2. Update redirect URIs to production domain
3. Check that domain is verified with providers
4. Ensure HTTPS is enabled

---

## Security Best Practices

1. **Never commit credentials to git**
   - Use .env.local for local development
   - Add .env* to .gitignore

2. **Rotate secrets regularly**
   - Change NEXTAUTH_SECRET periodically
   - Regenerate OAuth credentials annually

3. **Use different credentials for dev/prod**
   - Separate Google projects for dev and prod
   - Different Apple Services IDs if possible

4. **Monitor OAuth usage**
   - Check Google Cloud Console for usage
   - Review Apple Developer logs
   - Watch for suspicious activity

---

## Additional Resources

### Google OAuth:
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [NextAuth Google Provider Docs](https://next-auth.js.org/providers/google)

### Apple OAuth:
- [Sign in with Apple Documentation](https://developer.apple.com/sign-in-with-apple/)
- [Apple Developer Portal](https://developer.apple.com/account/)
- [NextAuth Apple Provider Docs](https://next-auth.js.org/providers/apple)

### NextAuth.js:
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Configuration Options](https://next-auth.js.org/configuration/options)
- [Callbacks](https://next-auth.js.org/configuration/callbacks)

---

## Support

If you encounter issues with OAuth setup:

1. Check this documentation
2. Review NextAuth.js documentation
3. Check provider-specific documentation
4. Contact support:
   - Email: serenitylivingoflexington@gmail.com
   - Phone: (839) 329-6084

---

## Checklist

Before going live with OAuth:

- [ ] Google Cloud project created
- [ ] Google OAuth credentials configured
- [ ] Google redirect URIs updated for production
- [ ] Apple Developer account active
- [ ] Apple App ID registered
- [ ] Apple Services ID created
- [ ] Apple Sign In with Apple key created
- [ ] All environment variables set in production
- [ ] OAuth tested locally
- [ ] OAuth tested in production
- [ ] Error handling tested
- [ ] User data properly stored
- [ ] Privacy policy updated
- [ ] Terms of service updated

---

**Document Version:** 4.0
**Last Updated:** September 30, 2025
**Next Review:** December 30, 2025
