# 🔍 Google SEO & Search Console Setup Guide

## ✅ What's Already Been Done

### 1. Website SEO Optimization ✅
- ✅ **Favicon & Logo**: Company logo appears in browser tabs
- ✅ **Meta Tags**: Title, description, keywords optimized
- ✅ **Open Graph Tags**: Social media sharing cards
- ✅ **Structured Data**: Schema.org JSON-LD for rich snippets
- ✅ **Sitemap**: Auto-generated XML sitemap
- ✅ **Robots.txt**: Search engine crawling instructions
- ✅ **PWA Manifest**: Mobile app-like experience

### 2. SEO Features Implemented
✅ Dynamic page titles with template
✅ Optimized meta descriptions
✅ Proper favicon in all sizes (16x16, 32x32, 180x180, 192x192, 512x512)
✅ Social sharing images (1200x630 OG image)
✅ Canonical URLs
✅ Mobile-optimized viewport
✅ Structured data for:
  - Business information
  - Services offered
  - Location & contact info
  - Opening hours

---

## 🎯 What You'll See in Google Search

When someone searches **"Serenity Living of Lexington"** or **"senior living Gilbert SC"**, they'll see:

### Search Result Preview:
```
🔷 Serenity Living of Lexington — Premier Senior Living...
https://serenitylivingoflexington.com
Experience compassionate, dignified care at Serenity Living of
Lexington. Our senior living community offers assisted living,
memory care, and skilled nursing services in Gilbert, SC...

📍 120 Rice Dr, Gilbert, SC 29054
📞 (839) 329-6084
```

### With Sitelinks (after indexing):
- About Us
- Services
- Contact
- Tour Booking

---

## 📋 Google Search Console Setup (15 Minutes)

### Step 1: Verify Your Website

1. **Go to Google Search Console:**
   - Visit: https://search.google.com/search-console

2. **Add Property:**
   - Click **"Add Property"**
   - Select **"URL prefix"**
   - Enter: `https://serenitylivingoflexington.com`

3. **Verify Ownership** (choose one method):

   **Method A: HTML Tag (Recommended)**
   - Copy the verification meta tag provided by Google
   - Run this command:
   ```bash
   vercel env add NEXT_PUBLIC_GOOGLE_VERIFICATION production
   ```
   - Paste the verification code (just the code, not the whole tag)
   - I'll update the layout with it
   - Redeploy: `vercel --prod`
   - Click "Verify" in Google Search Console

   **Method B: HTML File**
   - Download the HTML verification file
   - Place it in the `/public` folder
   - Deploy
   - Click "Verify"

   **Method C: DNS (if you control domain)**
   - Add TXT record to your domain's DNS
   - Value: provided by Google
   - Wait 24 hours
   - Click "Verify"

### Step 2: Submit Sitemap

1. In Google Search Console, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**
4. Google will start crawling your site!

### Step 3: Request Indexing

1. Go to **URL Inspection** (left sidebar)
2. Enter: `https://serenitylivingoflexington.com`
3. Click **"Request Indexing"**
4. Repeat for important pages:
   - `https://serenitylivingoflexington.com/#about`
   - `https://serenitylivingoflexington.com/#services`
   - `https://serenitylivingoflexington.com/#contact`

---

## 🚀 Bing Webmaster Tools (Optional, 5 Minutes)

1. Visit: https://www.bing.com/webmasters
2. Click **"Add a Site"**
3. Enter: `https://serenitylivingoflexington.com`
4. Import from Google Search Console (easiest)
5. Submit sitemap: `sitemap.xml`

---

## 📊 What Happens Next?

### Immediate (1-7 Days):
- ✅ Google starts crawling your website
- ✅ Sitemap indexed
- ✅ Basic search results appear

### Short Term (1-4 Weeks):
- ✅ Full site indexed
- ✅ Rich snippets start showing
- ✅ Sitelinks appear under main result
- ✅ Business info shows in Knowledge Panel

### Long Term (1-3 Months):
- ✅ Rankings improve for keywords
- ✅ Local SEO kicks in (Google Maps)
- ✅ Reviews integration (if added)
- ✅ Higher search visibility

---

## 🗺️ Local SEO - Google Business Profile

### Why It's Important:
When people search "senior living near me" or "nursing homes in Gilbert SC", you'll appear on Google Maps!

### Setup Steps:

1. **Create Google Business Profile:**
   - Go to: https://business.google.com
   - Click **"Manage now"**
   - Search: `Serenity Living of Lexington`
   - If not found, click **"Add your business"**

2. **Enter Business Information:**
   ```
   Business Name: Serenity Living of Lexington
   Category: Assisted Living Facility
   Address: 120 Rice Dr, Gilbert, SC 29054
   Phone: (839) 329-6084
   Website: https://serenitylivingoflexington.com
   Hours: 24/7 (or your visiting hours)
   ```

3. **Verify Your Business:**
   - Google will send a postcard with verification code
   - Enter code when received (7-14 days)

4. **Complete Your Profile:**
   - Add photos of facility
   - Write description
   - Add services offered
   - Enable messaging
   - Set up booking button (links to tour form)

---

## 🔧 SEO Best Practices

### Content Updates:
- **Blog Posts**: Add a blog with senior care tips (boosts SEO)
- **Testimonials**: Add client reviews
- **FAQ Page**: Common questions about services
- **Staff Profiles**: About your care team

### Technical:
- ✅ All done automatically by Next.js
- ✅ Fast loading times (Vercel CDN)
- ✅ Mobile-friendly (responsive design)
- ✅ HTTPS enabled
- ✅ Structured data
- ✅ Sitemap updated automatically

### Keywords to Target:
- "senior living gilbert sc"
- "assisted living lexington sc"
- "memory care south carolina"
- "nursing home gilbert"
- "senior care near me"
- "elderly care gilbert sc"
- "rehabilitation services lexington"

---

## 📈 Monitor Your SEO Performance

### Google Search Console Metrics:
1. **Performance**: See search queries, clicks, impressions
2. **Coverage**: Check indexed pages
3. **Enhancements**: Monitor rich results
4. **Mobile Usability**: Ensure mobile-friendly

### What to Check Weekly:
- [ ] Total clicks increasing?
- [ ] Impressions growing?
- [ ] New keywords ranking?
- [ ] Any crawl errors?

---

## 🎯 Social Media Integration

### Update Your Social Profiles:

**Facebook** (https://facebook.com/serenitylivingoflexington)
- Add website URL
- Use og-image.jpg as cover photo
- Link to tour booking

**Instagram** (@serenity_living_2025)
- Add website to bio
- Use #seniorliving #assistedliving #gilbertsc

**X/Twitter** (@serenitylex)
- Pin tweet with website link
- Use OG image

---

## ✅ SEO Checklist

### Completed Automatically:
- [x] Favicon and logo in all sizes
- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] Structured data (Schema.org)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] PWA manifest
- [x] Mobile optimization
- [x] Fast loading (Vercel)
- [x] HTTPS enabled
- [x] Canonical URLs

### Your Action Items:
- [ ] Set up Google Search Console (15 min)
- [ ] Submit sitemap
- [ ] Request indexing
- [ ] Set up Google Business Profile (30 min)
- [ ] Add business photos
- [ ] Verify business address
- [ ] Set up Bing Webmaster Tools (5 min)
- [ ] Share website on social media
- [ ] Ask clients for Google reviews

---

## 🆘 Troubleshooting

### Website Not Showing in Google?
- **Wait 1-7 days** after submitting to Search Console
- Request indexing manually
- Check robots.txt isn't blocking Google
- Ensure website is live and accessible

### Logo Not Showing in Browser Tab?
- Clear browser cache (Ctrl + Shift + R)
- Check favicon files exist in `/public`
- Wait for CDN to update (few minutes)

### Search Result Wrong Description?
- Google takes time to re-crawl
- Can take 2-4 weeks for updates
- Use URL Inspection tool to force re-crawl

---

## 📞 Resources

- **Google Search Console**: https://search.google.com/search-console
- **Google Business**: https://business.google.com
- **Bing Webmaster**: https://www.bing.com/webmasters
- **Schema Validator**: https://validator.schema.org
- **Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev

---

## 🎉 Summary

Your website is **100% SEO-optimized** and ready to appear in Google search results!

✅ Logo appears in browser tabs
✅ Professional search result appearance
✅ Rich snippets ready
✅ Mobile-optimized
✅ Social sharing ready
✅ Fast loading
✅ Structured data for services

**Next Steps:**
1. Set up Google Search Console (15 min)
2. Submit sitemap
3. Set up Google Business Profile (30 min)
4. Wait 1-7 days for Google to index
5. Monitor search performance weekly

---

*Your website will start appearing in Google searches within 1-7 days after submitting to Search Console!*
