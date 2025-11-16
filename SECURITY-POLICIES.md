# Security Policies for Serenity Living Website
## Version 4.0 | Last Updated: September 2025

## Table of Contents
1. [Overview](#overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [Data Protection](#data-protection)
4. [Email Security](#email-security)
5. [API Security](#api-security)
6. [Frontend Security](#frontend-security)
7. [Environment Variables](#environment-variables)
8. [Password Policies](#password-policies)
9. [Session Management](#session-management)
10. [Security Headers](#security-headers)
11. [Incident Response](#incident-response)

---

## Overview

This document outlines the security measures implemented in the Serenity Living website to protect user data, prevent unauthorized access, and ensure compliance with industry standards.

**Security Measures Applied:**
- ✅ Authentication with NextAuth.js
- ✅ Password hashing with bcryptjs
- ✅ JWT-based session management
- ✅ HTTPS enforcement
- ✅ XSS protection
- ✅ CSRF protection
- ✅ SQL injection prevention
- ✅ Rate limiting
- ✅ Secure headers
- ✅ Input validation
- ✅ Email sanitization

---

## Authentication & Authorization

### Implemented Security Measures:

1. **Multi-Provider Authentication**
   - Credentials-based login with email/password
   - OAuth integration ready for Google and Apple
   - Session-based authentication using JWT tokens

2. **Password Security**
   - All passwords are hashed using bcryptjs with salt rounds
   - Minimum password requirements enforced on signup
   - Passwords never stored in plain text
   - Password reset functionality with token expiration

3. **Session Management**
   - JWT-based sessions with configurable expiration
   - Secure token storage
   - Auto-logout on token expiration
   - Session validation on every request

4. **Authorization Controls**
   - Role-based access control (RBAC) ready
   - Protected routes with middleware
   - API endpoint authentication
   - User-specific data isolation

---

## Data Protection

### Personal Information Protection:

1. **User Data Encryption**
   - Passwords encrypted using bcryptjs (10 salt rounds)
   - Sensitive data encrypted at rest
   - HTTPS for data in transit

2. **Database Security**
   - PostgreSQL with parameterized queries
   - SQL injection prevention through prepared statements
   - Database connection pooling with secure credentials
   - Regular backup procedures

3. **PII (Personally Identifiable Information) Handling**
   - Names, emails, phone numbers securely stored
   - Limited access to PII based on roles
   - Data retention policies
   - GDPR/CCPA compliance ready

---

## Email Security

### Email Communication Protection:

1. **Nodemailer Configuration**
   - Gmail OAuth2 or App-specific passwords
   - TLS/SSL for email transmission
   - SPF and DKIM records configured
   - Rate limiting on email sending

2. **Email Content Security**
   - HTML sanitization in email templates
   - No sensitive data in email subject lines
   - Auto-reply emails with limited information
   - Unsubscribe functionality (if applicable)

3. **Form Submission Security**
   - Input validation on all form fields
   - XSS prevention in user-submitted content
   - CSRF tokens on forms
   - Rate limiting to prevent spam

---

## API Security

### API Endpoint Protection:

1. **Request Validation**
   - Input sanitization on all endpoints
   - Type checking with Zod schemas
   - Request size limits
   - Content-Type validation

2. **Error Handling**
   - Generic error messages to prevent information leakage
   - Detailed error logging (server-side only)
   - No stack traces exposed to clients
   - Proper HTTP status codes

3. **Rate Limiting**
   - API call rate limiting per IP
   - Brute force attack prevention
   - DDoS mitigation strategies

---

## Frontend Security

### Client-Side Protection:

1. **XSS Prevention**
   - React's built-in XSS protection
   - Content Security Policy (CSP) headers
   - Input sanitization before rendering
   - No dangerouslySetInnerHTML usage without sanitization

2. **CSRF Protection**
   - CSRF tokens on all state-changing operations
   - SameSite cookie attributes
   - Origin verification

3. **Secure Dependencies**
   - Regular dependency updates
   - Vulnerability scanning with npm audit
   - Vetted third-party libraries only

---

## Environment Variables

### Secure Configuration Management:

**Environment Variables Used:**
```
EMAIL_USER=serenitylivingoflexington@gmail.com
EMAIL_PASS=[App-specific password - NEVER commit to version control]
GOOGLE_CLIENT_ID=[OAuth Client ID]
GOOGLE_CLIENT_SECRET=[OAuth Secret]
APPLE_ID=[Apple OAuth ID]
APPLE_TEAM_ID=[Apple Team ID]
APPLE_PRIVATE_KEY=[Apple Private Key]
APPLE_KEY_ID=[Apple Key ID]
DATABASE_URL=[PostgreSQL connection string]
NEXTAUTH_SECRET=[Random secret for NextAuth]
NEXTAUTH_URL=[Production URL]
```

**Security Practices:**
- ✅ .env files in .gitignore
- ✅ Different secrets for dev/prod
- ✅ Encrypted secrets in CI/CD
- ✅ Regular secret rotation
- ✅ No secrets in client-side code

---

## Password Policies

### Password Requirements:

1. **Minimum Requirements:**
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character (recommended)

2. **Password Storage:**
   - Bcryptjs with 10 salt rounds
   - Never stored in plain text
   - Separate salt for each password

3. **Password Reset:**
   - Time-limited reset tokens (15 minutes)
   - Single-use tokens
   - Email verification required

---

## Session Management

### JWT Session Security:

1. **Token Configuration:**
   - JWT signing with HS256 algorithm
   - Configurable token expiration
   - Secure token storage in httpOnly cookies
   - Token refresh mechanism

2. **Session Validation:**
   - Validate on every protected route
   - Check token expiration
   - Verify token signature
   - User existence validation

---

## Security Headers

### HTTP Security Headers Configured:

```javascript
// next.config.js security headers
{
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}
```

---

## Incident Response

### Security Incident Protocol:

1. **Detection**
   - Monitor error logs
   - Watch for unusual activity
   - Alert on failed login attempts

2. **Response**
   - Isolate affected systems
   - Identify attack vector
   - Document incident details
   - Notify affected users (if applicable)

3. **Recovery**
   - Patch vulnerabilities
   - Reset compromised credentials
   - Review and update security measures
   - Post-incident analysis

4. **Contact Information**
   - Security issues: serenitylivingoflexington@gmail.com
   - Emergency contact: (839) 329-6084

---

## Compliance

### Standards & Regulations:

- **HIPAA Considerations**: While not a covered entity, we handle health-related information with care
- **GDPR Compliance**: Data protection for EU residents
- **CCPA Compliance**: California privacy rights
- **ADA Compliance**: Website accessibility standards

---

## Security Audit Log

### Version 4.0 Security Updates:
- ✅ Implemented NextAuth.js authentication
- ✅ Added bcryptjs password hashing
- ✅ Configured secure email sending with nodemailer
- ✅ Set up JWT session management
- ✅ Added input validation on all forms
- ✅ Implemented rate limiting preparation
- ✅ Configured security headers
- ✅ Added environment variable management
- ✅ Implemented OAuth providers (Google, Apple)
- ✅ Added HTTPS enforcement
- ✅ Database connection security
- ✅ XSS and CSRF protection

---

## Regular Security Tasks

### Maintenance Schedule:

**Monthly:**
- Review access logs
- Check for dependency vulnerabilities
- Verify backup integrity

**Quarterly:**
- Security audit
- Update dependencies
- Review and rotate secrets

**Annually:**
- Full security assessment
- Penetration testing (if applicable)
- Update security policies

---

## Reporting Security Issues

If you discover a security vulnerability, please email us at:
**serenitylivingoflexington@gmail.com**

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work to resolve the issue promptly.

---

**Document Version:** 4.0
**Last Updated:** September 30, 2025
**Next Review:** December 30, 2025
