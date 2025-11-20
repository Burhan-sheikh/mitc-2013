# 🎯 MITC Store - Premium Laptop Showcase Application

**Mateen IT Corp., Maisuma, Srinagar**

A premium glassmorphic web application for showcasing laptops and computers with admin dashboard, real-time chat, and complete product management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [User Roles](#user-roles)
- [Documentation](#documentation)

## ✨ Features

### Public Features
- 🏪 **Product Showcase**: Browse laptops with advanced filtering and search
- 🔍 **Product Details**: Comprehensive specs, price ranges, stock status
- ⭐ **Store Reviews**: Read and submit reviews (authenticated users)
- 💬 **Real-time Chat**: Contact seller instantly
- 📱 **Responsive Design**: Works on all devices (320px → 4K)
- 🌓 **Dark/Light Mode**: Beautiful glassmorphic UI in both themes

### User Dashboard
- ❤️ **Favorites**: Save and manage liked products
- 📝 **My Reviews**: View and edit submitted reviews
- 👤 **Profile Management**: Update profile, upload photo
- 🗑️ **Account Deletion**: Full data purge option

### Admin Dashboard
- 📊 **Analytics**: Product views, user stats, visitor analytics
- 📦 **Product Management**: Complete CRUD with image upload
- 💬 **Chat Management**: Monitor and respond to all chats
- ⭐ **Review Moderation**: Approve, hide, or delete reviews
- 👥 **User Management**: Manage roles and permissions
- ⚙️ **Settings**: Cloudinary integration, business info

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Firebase**
  - Firestore (database)
  - Realtime Database (chat)
  - Authentication (Email + Google OAuth)
  - Cloud Functions (Node.js)
- **Cloudinary** for image storage

### Development Tools
- ESLint for code quality
- PostCSS + Autoprefixer
- Browser Image Compression

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### 1. Clone Repository

```bash
git clone https://github.com/Burhan-sheikh/mitc-2013.git
cd mitc-2013
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install functions dependencies
cd functions
npm install
cd ..
```

### 3. Configure Environment

Create `.env` file in root:

```bash
cp .env.example .env
```

Edit `.env` with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_ADMIN_EMAIL=your-admin@email.com
```

### 4. Firebase Setup

#### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project: "MITC Store"
3. Enable services:
   - ✅ Firestore Database
   - ✅ Realtime Database
   - ✅ Authentication (Email/Password + Google)
   - ✅ Cloud Functions

#### Deploy Security Rules

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy RTDB rules
firebase deploy --only database

# Deploy indexes
firebase deploy --only firestore:indexes
```

#### Configure Cloudinary

```bash
# Set Cloudinary credentials in Functions
firebase functions:config:set cloudinary.name="your_cloud_name"
firebase functions:config:set cloudinary.key="your_api_key"
firebase functions:config:set cloudinary.secret="your_api_secret"
```

#### Deploy Functions

```bash
cd functions
npm install
firebase deploy --only functions
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 6. Create Admin Account

1. Sign up with your admin email (specified in `.env`)
2. Go to Firebase Console → Firestore
3. Find your user document in `users` collection
4. Change `role` field from `"user"` to `"admin"`
5. Reload app - you now have admin access!

## 📁 Project Structure

```
mitc-2013/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── common/       # Reusable components (Button, Card, etc.)
│   │   ├── layout/       # Layout components (Header, Footer, etc.)
│   │   ├── products/     # Product-related components
│   │   ├── chat/         # Chat components
│   │   ├── reviews/      # Review components
│   │   └── analytics/    # Analytics components
│   ├── pages/            # Page components
│   │   ├── public/       # Public pages (Home, Products, etc.)
│   │   ├── user/         # User dashboard pages
│   │   └── admin/        # Admin dashboard pages
│   ├── lib/              # Library configurations
│   │   ├── firebase.js   # Firebase config
│   │   ├── rtdb.js       # RTDB helpers
│   │   ├── cloudinary.js # Cloudinary helpers
│   │   └── api.js        # Cloud Functions API
│   ├── hooks/            # Custom React hooks
│   ├── contexts/         # React contexts (Auth, Theme, Chat)
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── functions/            # Firebase Cloud Functions
│   ├── index.js         # Functions implementation
│   └── package.json     # Functions dependencies
├── firestore.rules      # Firestore security rules
├── database.rules.json  # RTDB security rules
├── firestore.indexes.json # Firestore indexes
├── firebase.json        # Firebase configuration
├── .env.example         # Environment variables template
├── package.json         # Dependencies
└── README.md           # This file
```

## ⚙️ Configuration

### Firestore Collections

- **products**: Product catalog
- **users**: User profiles and roles
- **reviews**: Store reviews
- **leads**: Contact form submissions
- **images**: Cloudinary image metadata
- **visitors**: Analytics data (grouped by date)
- **settings**: App configuration

### Realtime Database Structure

```
chats/
  {chatId}/
    participants: {userId: true}
    lastMessage: {...}
    status: "open" | "closed" | "important"
    messages/
      {messageId}/
        senderId: "uid"
        text: "message"
        timestamp: 1234567890
```

## 👥 User Roles

### Guest (Unauthenticated)
- ✅ Browse products
- ✅ View product details
- ✅ Read approved reviews
- ✅ Submit contact forms
- ✅ Start guest chat
- ❌ Submit reviews
- ❌ Save favorites
- ❌ Access dashboards

### User (Authenticated)
- All Guest permissions +
- ✅ Submit store reviews
- ✅ Save/like products
- ✅ Persistent chat history
- ✅ Profile management
- ✅ Delete account
- ❌ Access admin panel

### Admin (Superuser)
- All User permissions +
- ✅ Product CRUD operations
- ✅ Upload images to Cloudinary
- ✅ Approve/hide/delete reviews
- ✅ Monitor all chats
- ✅ View analytics
- ✅ Manage users
- ✅ Configure settings

## 🚀 Deployment

### Option 1: Firebase Hosting

```bash
# Build production bundle
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Option 2: Netlify

1. Connect GitHub repo to Netlify
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add environment variables in Netlify dashboard
4. Deploy!

### Option 3: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📚 Documentation

- [Setup Guide](./SETUP.md) - Detailed setup instructions
- [Development Guide](./DEVELOPMENT.md) - Component structure and workflow
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment checklist
- [API Reference](./API.md) - Cloud Functions documentation

## 🎨 Design System

### Colors

- **Primary**: Purple gradient (`#a855f7` → `#9333ea`)
- **Accent**: Pink (`#ec4899`)
- **Glassmorphism**: Backdrop blur with transparency

### Components

All components follow the glassmorphic design system with:
- 🌊 Backdrop blur effects
- ✨ Smooth animations
- 🎯 Accessibility features (WCAG 2.1 AA)
- 📱 Mobile-first responsive design

## 🔐 Security

### Firestore Rules
- Role-based access control
- User can only modify own data
- Admin has full access
- Public read for published products

### RTDB Rules
- Users can only access their own chats
- Admins can access all chats
- Message validation enforced

### Cloud Functions
- Admin verification for image uploads
- Secure Cloudinary integration
- Proper error handling

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build test
npm run build

# Preview production build
npm run preview
```

## 📝 TODO / Remaining Components

### Common Components
- [ ] Button.jsx
- [ ] Card.jsx
- [ ] Input.jsx
- [ ] Modal.jsx
- [ ] ProductCard.jsx
- [ ] LoadingSpinner.jsx
- [ ] ThemeToggle.jsx

### Layout Components
- [ ] Header.jsx
- [ ] Footer.jsx
- [ ] Sidebar.jsx (admin)
- [ ] MobileNav.jsx

### Page Components
- [ ] Public pages (Home, Products, ProductDetails, Reviews, About, Contact, Auth)
- [ ] User dashboard pages
- [ ] Admin dashboard pages

**Note**: All component specifications are detailed in the project requirements. Follow the glassmorphic design system and ensure mobile responsiveness.

## 🤝 Contributing

This is a private project for Mateen IT Corp. Internal contributions only.

## 📄 License

Proprietary - © 2024 Mateen IT Corp. All rights reserved.

## 📞 Support

For issues or questions:
- **Email**: admin@mitcstore.com
- **Location**: Maisuma, Srinagar, Kashmir

---

**Built with ❤️ for Mateen IT Corp.**
