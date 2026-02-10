# 🏠 Local Usage Guide

Your AI Health Assistant is running locally on your computer!

## 🚀 Quick Start

### Start the Application

**Terminal 1 - Backend (ML API):**
```bash
cd ml-backend
python app.py
```
✅ Backend running at: http://localhost:5000

**Terminal 2 - Frontend (React App):**
```bash
npm start
```
✅ Frontend running at: http://localhost:3000

## 🌐 Access Your App

**Open in browser:** http://localhost:3000

**Or from other devices on your network:** http://192.168.1.216:3000

## ✅ What's Working

- ✅ Custom ML model (NumPy/Pandas only)
- ✅ 377 symptoms recognition
- ✅ 727 disease predictions
- ✅ Beautiful, responsive UI
- ✅ Real-time predictions
- ✅ Confidence scoring

## 📊 Your ML Model

- **Algorithm**: Custom K-Nearest Neighbors
- **Training Data**: 246,945 patient cases
- **No scikit-learn**: Pure NumPy/Pandas implementation
- **Model Location**: `ml-backend/custom_health_model.pkl`

## 🎯 How to Use

1. Open http://localhost:3000
2. Click "Check Your Symptoms"
3. Enter age and gender
4. Select symptoms from the list
5. Click "Get Health Prediction"
6. View results with confidence score!

## 🔧 Troubleshooting

**If backend stops:**
```bash
cd ml-backend
python app.py
```

**If frontend stops:**
```bash
npm start
```

**If you get errors:**
- Check both terminals are running
- Restart both servers
- Clear browser cache

## 💾 Your Code on GitHub

**Repository**: https://github.com/mayankpatelxv/predict

Anyone can:
- Clone your repository
- Run it locally on their computer
- See your code and ML implementation

## 🎓 What You Built

✅ Full-stack web application
✅ Custom ML algorithm from scratch
✅ React frontend with modern UI
✅ Flask backend API
✅ Real medical dataset integration
✅ Production-ready code

## 📝 Notes

- **No deployment needed** - works perfectly locally
- **Free to use** - no hosting costs
- **Private** - only accessible on your network
- **Fast** - no internet latency

---

**Your AI Health Assistant is ready to use!** 🎉

Access it at: http://localhost:3000