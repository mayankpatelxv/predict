@echo off
echo ========================================
echo  Push AI Health Assistant to GitHub
echo ========================================
echo.

echo Step 1: Creating repository on GitHub...
echo Please go to: https://github.com/new
echo.
echo Repository name: pridict
echo Description: AI Health Assistant - Disease prediction using custom ML model
echo Make it Public
echo DO NOT initialize with README
echo.
pause

echo.
echo Step 2: Enter your GitHub username:
set /p username="GitHub Username: "

echo.
echo Step 3: Removing old remote...
git remote remove origin 2>nul

echo.
echo Step 4: Adding new remote...
git remote add origin https://github.com/%username%/pridict.git

echo.
echo Step 5: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo  Done! Check your repository at:
echo  https://github.com/%username%/pridict
echo ========================================
pause