# Complete Setup Guide - AI Health Assistant

Follow these steps exactly to get your AI Health Assistant running.

## Step 1: Install Node.js Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase Database

### 2.1 Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/login and click "New Project"
3. Name it "ai-health-assistant"
4. Set a strong database password
5. Wait for project creation (2-3 minutes)

### 2.2 Get Credentials
1. Go to Settings > API in your Supabase dashboard
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (long JWT token)

### 2.3 Set Up Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Copy ALL content from `supabase-setup/schema.sql`
3. Paste and click "Run"
4. Verify tables were created successfully

## Step 3: Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env file with your Supabase credentials:
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_ML_API_URL=http://localhost:5000
```

## Step 4: Set Up Python ML Backend

### 4.1 Install Python Dependencies
```bash
cd ml-backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4.2 Train the Model (Optional)
```bash
python train_model.py
```

## Step 5: Start the Application

### 5.1 Start ML Backend (Terminal 1)
```bash
cd ml-backend
python app.py
```
You should see: "Model loaded from file" or "Model trained and saved"

### 5.2 Start React Frontend (Terminal 2)
```bash
# In project root
npm start
```
Browser should open to `http://localhost:3000`

## Step 6: Test the Application

1. Click "Check Your Symptoms"
2. Enter age (e.g., 30) and select gender
3. Select symptoms like "Fever", "Cough", "Fatigue"
4. Click "Get Health Prediction"
5. You should see results with disease prediction and doctor recommendations

## Verification Checklist

- [ ] Supabase project created and schema loaded
- [ ] Environment variables configured
- [ ] Python backend running on port 5000
- [ ] React frontend running on port 3000
- [ ] Can submit symptoms and get predictions
- [ ] Results show disease, confidence, and doctors
- [ ] Data is saved to Supabase (check symptom_logs table)

## Troubleshooting

### Issue: "Failed to get prediction"
- Check if Python backend is running
- Verify ML API URL in .env file
- Check browser console for errors

### Issue: "Supabase connection error"
- Verify Supabase URL and key in .env
- Check if schema was loaded correctly
- Ensure Supabase project is active

### Issue: "No doctors found"
- Verify schema.sql ran completely
- Check doctors table has data in Supabase dashboard

### Issue: Python errors
- Ensure virtual environment is activated
- Reinstall requirements: `pip install -r requirements.txt`
- Check Python version (3.8+ required)

## Quick Test Commands

Test ML API directly:
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["Fever", "Cough"], "age": 30, "gender": "male"}'
```

Check Supabase data:
```sql
-- Run in Supabase SQL Editor
SELECT COUNT(*) FROM diseases;  -- Should return 20
SELECT COUNT(*) FROM doctors;   -- Should return 19
```

## Success Indicators

✅ ML backend shows "Model loaded" message
✅ React app loads without console errors  
✅ Can complete full symptom-to-result flow
✅ Data appears in Supabase symptom_logs table
✅ Doctor recommendations display correctly

Your AI Health Assistant is now ready to use! 🎉