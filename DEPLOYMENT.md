# Deployment Guide - MITC Store

## 📋 Pre-Deployment Checklist

### 1. Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix

# Build production bundle
npm run build

# Test production build locally
npm run preview
```

### 2. Environment Variables

Ensure all production environment variables are set:

- ✅ Firebase credentials
- ✅ Cloudinary settings (in Firebase Functions)
- ✅ Admin email

### 3. Firebase Configuration

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy RTDB rules
firebase deploy --only database

# Deploy indexes
firebase deploy --only firestore:indexes

# Deploy Cloud Functions
cd functions
npm install --production
firebase deploy --only functions
```

### 4. Security Audit

- ✅ Firestore rules tested
- ✅ RTDB rules tested
- ✅ No exposed API keys in client
- ✅ Admin verification in Cloud Functions
- ✅ Input validation implemented

### 5. Performance Audit

```bash
# Run Lighthouse
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

Target scores:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## 🚀 Deployment Options

### Option 1: Firebase Hosting (Recommended)

#### Initial Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (if not done)
firebase init hosting
```

#### Deploy

```bash
# Build
npm run build

# Deploy hosting only
firebase deploy --only hosting

# Or deploy everything
firebase deploy
```

#### Custom Domain

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. Wait for SSL provisioning (can take 24-48 hours)

### Option 2: Netlify

#### Via GitHub Integration

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variables
7. Deploy!

#### Environment Variables (Netlify)

In Netlify dashboard:
- Site settings → Build & deploy → Environment
- Add all `VITE_*` variables from `.env`

#### Custom Domain (Netlify)

1. Domain settings → Add custom domain
2. Configure DNS:
   - Type: `A` Record
   - Host: `@`
   - Value: `75.2.60.5`
3. SSL will auto-provision

### Option 3: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
# Vercel auto-detects Vite projects
```

#### Environment Variables (Vercel)

```bash
# Via CLI
vercel env add VITE_FIREBASE_API_KEY

# Or via dashboard:
# Project Settings → Environment Variables
```

## 🔧 Post-Deployment

### 1. Create Admin Account

```bash
# 1. Sign up at your deployed URL with admin email
# 2. Go to Firebase Console → Firestore
# 3. Navigate to users/{your-uid}
# 4. Change role from "user" to "admin"
# 5. Reload app
```

### 2. Configure Cloudinary

1. Login as admin
2. Go to Settings → Cloudinary
3. Enter credentials
4. Test connection
5. Save

### 3. Add Sample Products

1. Go to Admin → Products
2. Click "Add New Product"
3. Fill in all fields
4. Upload images (auto-compressed to <700KB)
5. Publish

### 4. Test All Features

#### Guest User Testing
- [ ] Browse products
- [ ] View product details
- [ ] Read reviews
- [ ] Submit contact form
- [ ] Start guest chat

#### User Testing
- [ ] Sign up / Login
- [ ] Submit review
- [ ] Like products
- [ ] Chat with seller
- [ ] Update profile

#### Admin Testing
- [ ] Create product
- [ ] Upload images
- [ ] Approve reviews
- [ ] Respond to chats
- [ ] View analytics
- [ ] Manage users

### 5. Monitor Performance

#### Firebase Console
- Monitor Firestore usage
- Check RTDB connections
- Review Functions logs
- Track Authentication users

#### Analytics
- Set up Google Analytics (optional)
- Monitor visitor stats in Admin dashboard
- Track product views
- Review conversion funnel

## 🔄 Continuous Deployment

### GitHub Actions (Firebase)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

### Netlify (Auto-Deploy)

Netlify automatically deploys on every push to main branch.

Configure in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📊 Monitoring

### Error Tracking

Consider integrating:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay

### Uptime Monitoring

- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)

## 🔐 Security Hardening

### Content Security Policy

Add to hosting provider headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;
```

### Rate Limiting

Configure in Firebase Functions:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## 🆘 Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check for dependency conflicts
npm audit
```

### Firebase Deployment Issues

```bash
# Re-login
firebase login --reauth

# Check project
firebase use --list
firebase use <project-id>
```

### Environment Variable Issues

```bash
# Verify variables are set
echo $VITE_FIREBASE_API_KEY

# Re-deploy with fresh environment
```

## 📝 Maintenance

### Regular Tasks

#### Weekly
- Check error logs
- Review analytics
- Monitor storage usage

#### Monthly
- Update dependencies
- Review security alerts
- Backup Firestore data
- Optimize images

#### Quarterly
- Performance audit
- Security audit
- User feedback review
- Feature planning

## 🎉 Launch Checklist

- [ ] All features tested
- [ ] Security rules deployed
- [ ] SSL certificate active
- [ ] Admin account created
- [ ] Sample products added
- [ ] Business info configured
- [ ] Error tracking set up
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Documentation complete
- [ ] Team trained

---

**Ready to launch! 🚀**
