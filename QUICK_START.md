# Quick Start Guide - MITC Store

## 🚀 Get Running in 5 Minutes

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
git
```

### 1. Clone Repository

```bash
git clone https://github.com/Burhan-sheikh/mitc-2013.git
cd mitc-2013
```

### 2. Install Dependencies

```bash
# Frontend dependencies
npm install

# Functions dependencies
cd functions
npm install
cd ..
```

### 3. Firebase Setup

#### Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "mitc-store"
4. Disable Google Analytics (optional)
5. Create project

#### Enable Services

1. **Firestore Database**
   - Build → Firestore Database → Create database
   - Start in production mode
   - Choose location (asia-south1 for India)

2. **Realtime Database**
   - Build → Realtime Database → Create database
   - Start in locked mode

3. **Authentication**
   - Build → Authentication → Get started
   - Enable Email/Password
   - Enable Google

4. **Cloud Functions**
   - Build → Functions → Get started
   - Upgrade to Blaze plan (pay-as-you-go)

#### Get Firebase Config

1. Project Settings (gear icon) → General
2. Scroll to "Your apps"
3. Click "Web" icon (</>) 
4. Register app: "mitc-store-web"
5. Copy the config object

### 4. Environment Configuration

```bash
# Copy example env file
cp .env.example .env
```

Edit `.env` with your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=mitc-store.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mitc-store
VITE_FIREBASE_STORAGE_BUCKET=mitc-store.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_DATABASE_URL=https://mitc-store-default-rtdb.firebaseio.com
VITE_ADMIN_EMAIL=your-email@gmail.com
```

### 5. Deploy Firebase Rules

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not done)
firebase init
# Select: Firestore, Database, Functions, Hosting
# Choose existing project
# Accept defaults

# Deploy security rules
firebase deploy --only firestore:rules
firebase deploy --only database
firebase deploy --only firestore:indexes
```

### 6. Configure Cloudinary

1. Sign up at https://cloudinary.com
2. Get your credentials from Dashboard
3. Configure in Firebase Functions:

```bash
firebase functions:config:set cloudinary.name="your_cloud_name"
firebase functions:config:set cloudinary.key="your_api_key"
firebase functions:config:set cloudinary.secret="your_api_secret"
```

### 7. Deploy Cloud Functions

```bash
cd functions
npm install
firebase deploy --only functions
cd ..
```

### 8. Start Development Server

```bash
npm run dev
```

App will open at http://localhost:5173

### 9. Create Admin Account

1. Open app in browser
2. Click "Sign In"
3. Sign up with the email you set in `VITE_ADMIN_EMAIL`
4. Go to Firebase Console → Firestore Database
5. Open `users` collection
6. Find your user document (by email)
7. Click on it
8. Change `role` field from `"user"` to `"admin"`
9. Save
10. Reload the app

You now have admin access! 🎉

## ✅ Verify Installation

### Test Guest Features
- [ ] Browse to homepage
- [ ] Navigate to Products page
- [ ] Click on a product (will show placeholder until you add products)
- [ ] View Reviews page
- [ ] Check About page
- [ ] Test Contact page
- [ ] Toggle dark/light theme

### Test User Features
- [ ] Sign up with new email
- [ ] Login
- [ ] Access Dashboard
- [ ] Update profile
- [ ] Logout

### Test Admin Features
- [ ] Login as admin
- [ ] Access Admin Dashboard (should redirect from home)
- [ ] View all admin menu items
- [ ] Navigate to Products management
- [ ] Try to add a product (upload will work after adding product pages)

## 🐛 Common Issues

### Issue: "Firebase config not found"
**Solution**: Check `.env` file exists and has correct values

### Issue: "Permission denied" in Firestore
**Solution**: Deploy security rules: `firebase deploy --only firestore:rules`

### Issue: "Functions not working"
**Solution**: 
1. Check Functions deployed: `firebase deploy --only functions`
2. Verify Cloudinary config: `firebase functions:config:get`
3. Check Functions logs: `firebase functions:log`

### Issue: "Can't upload images"
**Solution**: 
1. Verify Cloudinary credentials
2. Check you're logged in as admin
3. Check Functions logs for errors

### Issue: "Build errors"
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📚 Next Steps

1. **Complete Remaining Pages**
   - See `STATUS.md` for list of missing files
   - Use templates in `COMPONENTS.md`
   - Follow patterns in `DEVELOPMENT.md`

2. **Add Sample Data**
   - Create products via admin panel
   - Add test reviews
   - Test chat functionality

3. **Customize Branding**
   - Update logo in Header
   - Change color scheme in `tailwind.config.js`
   - Update business info in Footer
   - Add real contact details

4. **Deploy to Production**
   - Follow `DEPLOYMENT.md`
   - Choose Firebase Hosting, Netlify, or Vercel
   - Set up custom domain

## 📞 Need Help?

Refer to:
- **README.md** - Complete documentation
- **DEVELOPMENT.md** - Component development guide
- **STATUS.md** - Implementation checklist
- **COMPONENTS.md** - Ready-to-use templates

## 🎉 Success!

You now have a working foundation for MITC Store. The core infrastructure is complete - just add the remaining page components following the established patterns!

---

**Repository**: https://github.com/Burhan-sheikh/mitc-2013
**Built with ❤️ for Mateen IT Corp.**
