# 🚀 Deployment Guide

Complete guide to deploy your AI Health Assistant to production.

## 📋 Prerequisites

- GitHub account (already have it!)
- Vercel account (free)
- Render/Railway account (free tier available)
- Supabase account (free tier available)

## 🎯 Deployment Steps

### Step 1: Deploy Backend (ML API)

#### Option A: Render (Recommended)

1. **Go to [Render](https://render.com)**
2. **Sign up/Login** with GitHub
3. **New → Web Service**
4. **Connect Repository**: `mayankpatelxv/predict`
5. **Configure:**
   ```
   Name: ai-health-ml-api
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: ml-backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: python app.py
   ```
6. **Click "Create Web Service"**
7. **Wait for deployment** (5-10 minutes)
8. **Copy your backend URL**: `https://ai-health-ml-api.onrender.com`

#### Option B: Railway

1. **Go to [Railway](https://railway.app)**
2. **New Project → Deploy from GitHub**
3. **Select your repository**
4. **Configure:**
   ```
   Root Directory: ml-backend
   Start Command: python app.py
   ```
5. **Deploy!**
6. **Copy your backend URL**

### Step 2: Deploy Frontend (React App)

#### Using Vercel (Recommended)

1. **Go to [Vercel](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **New Project → Import Git Repository**
4. **Select**: `mayankpatelxv/predict`
5. **Configure:**
   ```
   Framework Preset: Create React App
   Root Directory: ./
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```
6. **Add Environment Variables:**
   ```
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   REACT_APP_ML_API_URL=https://your-backend-url.onrender.com
   ```
7. **Click "Deploy"**
8. **Wait for deployment** (2-3 minutes)
9. **Your site is live!** `https://predict-xyz.vercel.app`

#### Using Netlify

1. **Go to [Netlify](https://netlify.com)**
2. **New site from Git**
3. **Connect GitHub** and select your repo
4. **Configure:**
   ```
   Build command: npm run build
   Publish directory: build
   ```
5. **Add Environment Variables** (same as Vercel)
6. **Deploy!**

### Step 3: Set Up Supabase

1. **Go to [Supabase](https://supabase.com)**
2. **Create new project**
3. **Go to SQL Editor**
4. **Run the schema** from `supabase-setup/schema.sql`
5. **Get credentials** from Settings → API
6. **Update environment variables** in Vercel/Netlify

### Step 4: Update Configuration

1. **Update Backend URL** in Vercel environment variables
2. **Redeploy frontend** if needed
3. **Test the complete flow!**

## 🔧 Environment Variables

### Frontend (.env)
```env
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
REACT_APP_ML_API_URL=https://your-backend.onrender.com
```

### Backend (No env needed for basic setup)

## 📝 Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend loads correctly
- [ ] Can submit symptoms
- [ ] ML predictions work
- [ ] Supabase connection works
- [ ] Doctor recommendations show
- [ ] Mobile responsive
- [ ] Update README with live URL

## 🌐 Your Live URLs

After deployment, update these in README.md:

```markdown
- **Live Demo**: https://your-app.vercel.app
- **API Endpoint**: https://your-api.onrender.com
- **GitHub**: https://github.com/mayankpatelxv/predict
```

## 🐛 Troubleshooting

### Frontend Issues

**Build fails:**
- Check Node.js version (use 18.x)
- Clear cache and rebuild
- Check environment variables

**API connection fails:**
- Verify REACT_APP_ML_API_URL is correct
- Check CORS settings in backend
- Ensure backend is running

### Backend Issues

**Deployment fails:**
- Check Python version (3.11)
- Verify requirements.txt
- Check logs in Render/Railway

**Model not loading:**
- Model files (.pkl) are not in Git
- Users need to train model locally first
- Or upload pre-trained model to backend

**Predictions fail:**
- Check if dataset is available
- Verify model training completed
- Check backend logs

## 💡 Tips

1. **Free Tier Limits:**
   - Render: 750 hours/month (enough for 24/7)
   - Vercel: Unlimited bandwidth
   - Supabase: 500MB database

2. **Performance:**
   - Backend may sleep after inactivity (Render free tier)
   - First request might be slow (cold start)
   - Consider paid tier for production

3. **Custom Domain:**
   - Add custom domain in Vercel settings
   - Update DNS records
   - SSL is automatic!

## 🎉 Success!

Your AI Health Assistant is now live and accessible worldwide!

Share your link:
- **Live Site**: https://your-app.vercel.app
- **GitHub**: https://github.com/mayankpatelxv/predict

---

Need help? Check the [README](README.md) or [SETUP-GUIDE](SETUP-GUIDE.md)