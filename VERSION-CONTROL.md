# Version Control Document
# Serenity Living Website

## Current Version: 4.0
**Release Date:** September 30, 2025
**Status:** Production Ready

---

## Version History

### Version 4.0 (September 30, 2025) - CURRENT
**Major Update: Enhanced UI, Email Integration & Security**

#### New Features:
- ✅ Added complementary color palette (Teal/Accent, Warm/Orange, Coral/Red)
- ✅ Enhanced visual design with gradient effects
- ✅ Implemented Book Tour email functionality
- ✅ Verified Contact Form email integration
- ✅ Added comprehensive security policies
- ✅ Created OAuth setup documentation
- ✅ Implemented proper loading states on forms
- ✅ Added form submission status messages

#### Improvements:
- Improved color scheme for better visual appeal
- Enhanced form user experience
- Better error handling and user feedback
- Professional gradient text effects
- Improved button styling with new colors

#### Bug Fixes:
- Fixed book tour form not sending emails
- Resolved white space issues between navbar and hero image
- Fixed pre-booking text removal
- Corrected image carousel order (2.jpg then 1.jpg)

#### Security Updates:
- Documented all security measures
- Created security incident response protocol
- Added environment variable security guidelines
- Documented OAuth setup requirements

---

### Version 3.0 (September 2025)
**Major Update: Content & Layout Refinements**

#### Changes:
- Removed "Coming Soon" banner from hero image
- Removed white space between navbar and image
- Changed service page cards to 2-column layout
- Made all 4 service tiers display in one line
- Updated About page with accurate information:
  - Changed from 75+ to 32 suites
  - Updated status to "Opening Soon"
  - Added full address: 120 Rice Dr, Gilbert, SC 29054
  - Specified 24/7 facility
- Removed Twitter social media links
- Added email links to social media sections
- Removed all pricing information from service tiers
- Added working button links to tour/visit pages

---

### Version 2.0 (September 2025)
**Major Update: Initial Production Release**

#### Features:
- Full Next.js 14 implementation
- NextAuth.js authentication system
- PostgreSQL database integration
- Email contact form with nodemailer
- Responsive design for all devices
- Image carousel on home page
- About, Services, Contact, Gallery pages
- Book Tour functionality
- User authentication (Sign In/Sign Up)
- Dashboard for authenticated users

#### Components:
- Navigation with responsive mobile menu
- Footer with social links
- 3D background effects
- Animated elements with Framer Motion
- Service cards with pricing tiers
- Contact form with validation
- Tour booking system

---

### Version 1.0 (August 2025)
**Initial Development**

#### Features:
- Basic HTML/CSS structure
- Static pages
- Contact information
- Basic navigation

---

## Technology Stack

### Frontend:
- **Framework:** Next.js 14.0.4
- **React:** 18.x
- **Styling:** Tailwind CSS 3.3.6
- **Animations:** Framer Motion 10.16.16
- **Icons:** Lucide React 0.300.0
- **3D Graphics:** Three.js 0.159.0

### Backend:
- **API:** Next.js API Routes
- **Authentication:** NextAuth.js 4.24.5
- **Database:** PostgreSQL (pg 8.11.3)
- **Email:** Nodemailer 6.9.7
- **Password Hashing:** bcryptjs 2.4.3
- **Validation:** Zod 3.22.4, React Hook Form 7.48.2

### Deployment:
- **Platform:** Vercel
- **Domain:** Custom domain ready
- **SSL:** Automatic HTTPS
- **CDN:** Vercel Edge Network

---

## File Structure

```
serenity-living/
├── src/
│   ├── app/
│   │   ├── page.jsx                 # Home page
│   │   ├── about/page.jsx           # About Us
│   │   ├── services/page.jsx        # Services
│   │   ├── contact/page.jsx         # Contact Form
│   │   ├── book-tour/page.jsx       # Book Tour
│   │   ├── gallery/page.jsx         # Photo Gallery
│   │   ├── auth/
│   │   │   ├── signin/page.jsx      # Sign In
│   │   │   └── signup/page.jsx      # Sign Up
│   │   ├── dashboard/page.jsx       # User Dashboard
│   │   └── api/
│   │       ├── contact/route.js     # Contact API
│   │       ├── book-tour/route.js   # Tour Booking API
│   │       └── auth/
│   │           └── [...nextauth]/route.js
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── ImageCarousel.jsx
│   │   └── ThreeBackground.jsx
│   └── lib/
│       ├── auth.jsx                 # Auth configuration
│       └── database.jsx             # Database utilities
├── public/
│   ├── 1.jpg                        # Carousel image
│   ├── 2.jpg                        # Carousel image
│   └── logo.jpg                     # Logo
├── .env.local                       # Environment variables (local)
├── .env.production                  # Production variables
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind configuration
├── package.json                     # Dependencies
├── DEPLOYMENT.md                    # Deployment guide
├── SECURITY-POLICIES.md             # Security documentation
├── VERSION-CONTROL.md               # This file
└── OAUTH-SETUP.md                   # OAuth configuration guide
```

---

## Environment Configuration

### Required Environment Variables:

```bash
# Email Configuration
EMAIL_USER=serenitylivingoflexington@gmail.com
EMAIL_PASS=[Gmail App Password]

# Database
DATABASE_URL=[PostgreSQL Connection String]

# Authentication
NEXTAUTH_SECRET=[Random Secret Key]
NEXTAUTH_URL=https://yourdomain.com

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=[Google OAuth Client ID]
GOOGLE_CLIENT_SECRET=[Google OAuth Secret]
APPLE_ID=[Apple OAuth ID]
APPLE_TEAM_ID=[Apple Team ID]
APPLE_PRIVATE_KEY=[Apple Private Key]
APPLE_KEY_ID=[Apple Key ID]
```

---

## Deployment History

### Production Deployments:

1. **v4.0** - September 30, 2025
   - URL: https://serenity-living-[hash].vercel.app
   - Status: Active
   - Features: Email integration, enhanced UI, security docs

2. **v3.0** - September 2025
   - URL: https://serenity-living-[hash].vercel.app
   - Status: Superseded
   - Features: Content updates, layout fixes

3. **v2.0** - September 2025
   - URL: https://serenity-living-[hash].vercel.app
   - Status: Superseded
   - Features: Initial production release

---

## Known Issues & Future Enhancements

### Known Issues:
- OAuth providers (Google/Apple) require additional API credentials setup
- Database connection requires valid PostgreSQL credentials

### Planned Features (v5.0):
- [ ] Online payment integration
- [ ] Virtual tour feature
- [ ] Resident portal
- [ ] Staff management system
- [ ] Blog/News section
- [ ] Testimonials section
- [ ] FAQ page
- [ ] Accessibility improvements
- [ ] Multi-language support
- [ ] Mobile app

---

## Change Management Process

### Making Changes:
1. Create a new branch from `main`
2. Make changes and test locally
3. Update version number if applicable
4. Update this VERSION-CONTROL.md file
5. Create pull request
6. Review and merge to `main`
7. Deploy to production via Vercel

### Version Numbering:
- **Major (X.0.0)**: Breaking changes, major feature additions
- **Minor (0.X.0)**: New features, non-breaking changes
- **Patch (0.0.X)**: Bug fixes, minor updates

---

## Contributors

- **Development Team:** Serenity Living Development
- **Security Audit:** Completed September 2025
- **Design:** Custom design for senior living facility

---

## Support & Maintenance

### Contact Information:
- **Email:** serenitylivingoflexington@gmail.com
- **Phone:** (839) 329-6084
- **Address:** 120 Rice Dr, Gilbert, SC 29054

### Maintenance Schedule:
- **Daily:** Automated monitoring
- **Weekly:** Log review
- **Monthly:** Dependency updates
- **Quarterly:** Security audit
- **Annually:** Full system review

---

## Changelog Summary

**Version 4.0 (Current):**
- Enhanced UI with complementary colors
- Email integration for forms
- Security documentation
- OAuth setup guides

**Version 3.0:**
- Content accuracy updates
- Layout improvements
- Social media updates

**Version 2.0:**
- Initial production release
- Full feature set
- Authentication system

**Version 1.0:**
- Initial development
- Basic structure

---

**Document Version:** 4.0
**Last Updated:** September 30, 2025
**Next Review:** December 30, 2025
