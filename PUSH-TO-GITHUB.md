# Push to GitHub Instructions

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: **pridict**
3. Description: "AI Health Assistant - Disease prediction using custom ML model"
4. Choose Public or Private
5. **DO NOT** check "Initialize this repository with a README"
6. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, run these commands:

```bash
# Push to GitHub
git push -u origin main
```

If you get authentication errors, you may need to:

### Option A: Use Personal Access Token
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate new token with 'repo' scope
3. Use token as password when pushing

### Option B: Use GitHub CLI
```bash
gh auth login
git push -u origin main
```

## What's Being Pushed

✅ Complete React frontend
✅ Custom ML backend (NumPy/Pandas only)
✅ Python ML model code
✅ Supabase setup files
✅ Documentation (README, SETUP-GUIDE, etc.)
✅ All source code

❌ node_modules (excluded)
❌ .env file (excluded)
❌ ML model files (.pkl) - too large
❌ Large CSV dataset (optional)

## After Pushing

Your repository will be available at:
https://github.com/YOUR_USERNAME/pridict

## Note About Large Files

The ML model (.pkl files) and dataset CSV are excluded because they're too large for Git.

Users will need to:
1. Clone the repository
2. Download the dataset separately (or you can provide it)
3. Run `python custom_model.py` to train the model

## Alternative: Include Dataset

If you want to include the large CSV file, you can use Git LFS:

```bash
git lfs install
git lfs track "*.csv"
git add .gitattributes
git add Final_Augmented_dataset_Diseases_and_Symptoms.csv
git commit -m "Add dataset with Git LFS"
git push
```