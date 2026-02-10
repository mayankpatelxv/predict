# AI Health Assistant

A complete web application that uses AI to predict diseases based on symptoms and recommends appropriate doctors.

## 🌐 Live Demo

**[Visit Live Site →](https://mayankpatelxv.github.io/predict/)** 

> **Note:** The frontend is hosted on GitHub Pages. The ML backend needs to be running locally or deployed separately for full functionality.

## 🚀 Features

- **Modern React Frontend** with responsive design
- **AI-Powered Predictions** using scikit-learn
- **Supabase Backend** for data storage
- **Doctor Recommendations** based on predicted diseases
- **Real-time Symptom Analysis**
- **Professional Healthcare UI**

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, Modern CSS
- **Backend**: Supabase (PostgreSQL)
- **ML Model**: Python Flask API with scikit-learn
- **Styling**: Custom CSS with modern design patterns

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- Supabase account

## 🔧 Installation & Setup

### 1. Clone and Install Frontend Dependencies

```bash
# Install React dependencies
npm install
```

### 2. Set Up Supabase Database

1. Follow the detailed instructions in `supabase-setup/setup-instructions.md`
2. Create your Supabase project
3. Run the SQL schema from `supabase-setup/schema.sql`
4. Get your project URL and API key

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual Supabase credentials
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_ML_API_URL=http://localhost:5000
```

### 4. Set Up Python ML Backend

```bash
# Navigate to ML backend directory
cd ml-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Train the ML model (optional - model will auto-train on first run)
python train_model.py
```

## 🚀 Running the Application

### 1. Start the ML Backend Server

```bash
cd ml-backend
python app.py
```

The ML API will be available at `http://localhost:5000`

### 2. Start the React Frontend

```bash
# In the project root directory
npm start
```

The web application will open at `http://localhost:3000`

## 📱 How to Use

1. **Home Page**: Click "Check Your Symptoms"
2. **Symptom Form**: 
   - Enter your age and gender
   - Select symptoms from the comprehensive list
   - Click "Get Health Prediction"
3. **Results Page**: 
   - View predicted disease with confidence level
   - See disease description and common symptoms
   - Get recommended doctors and specialists
   - Review your input summary

## 🏗️ Project Structure

```
ai-health-assistant/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   └── styles/           # CSS files
├── ml-backend/           # Python ML API
│   ├── app.py           # Flask application
│   ├── train_model.py   # Model training script
│   └── requirements.txt # Python dependencies
├── supabase-setup/      # Database setup files
│   ├── schema.sql       # Database schema
│   └── setup-instructions.md
└── README.md
```

## 🔍 API Endpoints

### ML Backend (`http://localhost:5000`)

- `POST /predict` - Get disease prediction
- `GET /health` - Health check
- `GET /symptoms` - Get available symptoms

### Supabase Tables

- `diseases` - Disease information and descriptions
- `doctors` - Doctor profiles and specialties
- `symptom_logs` - User symptom submissions and predictions
- `users` - User accounts (optional)

## 🎯 Sample Diseases Covered

- Common Cold, Flu, Pneumonia
- Migraine, Tension Headache
- Gastroenteritis, Gastritis
- Heart Disease, Hypertension
- Allergic Reactions, Dermatitis
- UTI, Back Strain, Arthritis
- Eye Strain, Ear Infections
- Depression, Hypothyroidism
- And more...

## 🏥 Doctor Specialties

- General Practice
- Cardiology
- Neurology
- Gastroenterology
- Pulmonology
- Dermatology
- Allergy & Immunology
- Urology
- Orthopedics
- Rheumatology
- Ophthalmology
- ENT
- Psychiatry
- Endocrinology

## ⚠️ Important Disclaimer

This application is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for proper medical care.

## 🐛 Troubleshooting

### Common Issues:

1. **ML API Connection Error**: 
   - Ensure Python backend is running on port 5000
   - Check if all Python dependencies are installed

2. **Supabase Connection Error**:
   - Verify environment variables are correct
   - Check Supabase project status

3. **Build Errors**:
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

### Testing the ML Model:

```bash
# Test the ML API directly
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["Fever", "Cough", "Fatigue"], "age": 30, "gender": "male"}'
```

## 📈 Future Enhancements

- User authentication and profiles
- Symptom history tracking
- More sophisticated ML models
- Integration with real medical APIs
- Telemedicine features
- Multi-language support

## 🚀 Deployment

### Deploy Frontend (Vercel - Recommended)

1. **Push to GitHub** (already done!)
2. **Go to [Vercel](https://vercel.com)**
3. **Import your repository**: `mayankpatelxv/predict`
4. **Configure:**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
5. **Add Environment Variables:**
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
   REACT_APP_ML_API_URL=your_backend_url
   ```
6. **Deploy!**

### Deploy Backend (Render/Railway)

**Option 1: Render**
1. Go to [Render](https://render.com)
2. New → Web Service
3. Connect your GitHub repo
4. Configure:
   - Root Directory: `ml-backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python app.py`
5. Deploy!

**Option 2: Railway**
1. Go to [Railway](https://railway.app)
2. New Project → Deploy from GitHub
3. Select `ml-backend` directory
4. Deploy!

### Quick Deploy Commands

```bash
# Deploy frontend to Vercel
npm install -g vercel
vercel

# Deploy backend to Render (using render.yaml)
# Just connect your GitHub repo to Render
```

### After Deployment

1. Update `REACT_APP_ML_API_URL` in Vercel with your backend URL
2. Update the live demo link in README
3. Test the complete flow!

## 🔗 Links

- **GitHub Repository**: https://github.com/mayankpatelxv/predict
- **Live Demo**: *(Add your deployed URL here)*
- **Documentation**: See [SETUP-GUIDE.md](SETUP-GUIDE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please ensure compliance with healthcare regulations in your jurisdiction before any commercial use.