# 🚀 Deployment Guide - SecureSight Dashboard

This guide will help you deploy your SecureSight dashboard to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository pushed to GitHub
- Account on your chosen platform

---

## 🎯 **Recommended: Vercel Deployment**

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your `securesight` repository

### Step 2: Configure Environment Variables
In the Vercel dashboard, add these environment variables:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-random-secret-key"
NEXTAUTH_URL="https://your-project.vercel.app"
```

### Step 3: Deploy
1. Click "Deploy"
2. Vercel will automatically detect Next.js settings
3. Build should complete successfully

### Step 4: Post-Deployment Setup
After deployment, you need to set up the database:

1. **Open Vercel Functions** (in your project dashboard)
2. **Visit the seed API**: `https://your-project.vercel.app/api/seed`
3. This will create the database and populate it with sample data

---

## 🌐 **Alternative: Netlify Deployment**

### Step 1: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with your GitHub account
3. Click "New site from Git"
4. Choose your `securesight` repository

### Step 2: Configure Build Settings
```
Build command: npm run build
Publish directory: .next
```

### Step 3: Environment Variables
Add in Netlify dashboard:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-random-secret-key"
NEXTAUTH_URL="https://your-site.netlify.app"
```

### Step 4: Deploy
1. Click "Deploy site"
2. Wait for build to complete
3. Visit the seed API: `https://your-site.netlify.app/api/seed`

---

## ⚡ **Alternative: Render Deployment**

### Step 1: Connect to Render
1. Go to [render.com](https://render.com)
2. Sign up/Login with your GitHub account
3. Click "New Web Service"
4. Connect your `securesight` repository

### Step 2: Configure Service
```
Name: securesight-dashboard
Environment: Node
Build Command: npm install && npx prisma generate && npm run build
Start Command: npm start
```

### Step 3: Environment Variables
Add in Render dashboard:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-random-secret-key"
NEXTAUTH_URL="https://your-service.onrender.com"
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment
3. Visit the seed API: `https://your-service.onrender.com/api/seed`

---

## 🔧 **Troubleshooting**

### Common Issues:

1. **Database Connection Error**
   - Ensure `DATABASE_URL` is set correctly
   - Check that the seed API was called

2. **Build Failures**
   - Verify Node.js version is 18+
   - Check that all dependencies are in `package.json`

3. **404 Errors**
   - Ensure the seed API was called after deployment
   - Check that the database file was created

### Verification Steps:

1. **Check Database**: Visit `/api/incidents` - should return JSON data
2. **Check Seed**: Visit `/api/seed` - should return success message
3. **Check UI**: Main page should load with incidents

---

## 📞 **Support**

If you encounter issues:
1. Check the platform's deployment logs
2. Verify environment variables are set correctly
3. Ensure the seed API was called after deployment

---

**🎉 Your SecureSight dashboard will be live and ready for submission!** 