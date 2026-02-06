# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - Name: `ai-health-assistant`
   - Database Password: (create a strong password)
   - Region: Choose closest to your location
6. Click "Create new project"
7. Wait for the project to be created (2-3 minutes)

## 2. Get Project Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the entire content from `schema.sql` file
3. Paste it into the SQL Editor
4. Click "Run" to execute the SQL commands
5. Verify that all tables were created successfully

## 4. Configure Environment Variables

1. In your React project root, create a `.env` file
2. Add the following variables with your actual values:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_ML_API_URL=http://localhost:5000
```

## 5. Enable Row Level Security (Optional but Recommended)

1. In Supabase dashboard, go to Authentication > Settings
2. Enable Row Level Security for better security
3. You can create policies later as needed

## 6. Test Database Connection

1. Start your React application
2. Try to submit a symptom form
3. Check the `symptom_logs` table in Supabase to see if data is being saved

## 7. Verify Sample Data

After running the schema, you should have:
- 20 diseases in the `diseases` table
- 19 doctors in the `doctors` table
- Empty `users` and `symptom_logs` tables (will be populated when users interact with the app)

## Troubleshooting

### Common Issues:

1. **Connection Error**: Make sure your environment variables are correct
2. **CORS Error**: Supabase should handle CORS automatically, but check your project settings
3. **SQL Errors**: Make sure all SQL commands ran successfully in the SQL Editor
4. **Missing Data**: Verify that the INSERT statements completed successfully

### Checking Data:

You can verify your data by running these queries in the SQL Editor:

```sql
-- Check diseases
SELECT COUNT(*) FROM diseases;

-- Check doctors
SELECT COUNT(*) FROM doctors;

-- Check symptom logs (should be empty initially)
SELECT COUNT(*) FROM symptom_logs;
```

## Next Steps

Once Supabase is set up:
1. Start the ML backend server
2. Start the React frontend
3. Test the complete flow from symptom input to results display