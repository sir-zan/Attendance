# GitHub Deployment Guide - Attendance Calculator

## Quick Start

Your attendance calculator is ready to deploy to GitHub Pages! Follow these steps:

### Step 1: Install Git (if not already installed)
- Download Git from https://git-scm.com
- Run the installer and follow the prompts

### Step 2: Create a GitHub Repository
1. Go to https://github.com/new
2. Enter these details:
   - Repository name: `attendance-calculator`
   - Description: `Attendance Absence Calculator`
   - Visibility: **Public** (required for GitHub Pages)
   - Click "Create repository"

### Step 3: Setup Git on Your Computer
Open PowerShell and run these commands (replace with your info):

```powershell
cd D:\project\attendance-calculator

git config --global user.email "your@email.com"
git config --global user.name "Your Name"

git init
git add .
git commit -m "Initial commit: Attendance Calculator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/attendance-calculator.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Build and deployment", set:
   - Source: **Deploy from a branch**
   - Branch: **main** and **(root)**
4. Click **Save**

### Step 5: Access Your Website
After 1-2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/attendance-calculator
```

## What Files Are Deployed?
- `Index.html` - Main HTML file
- `styles.css` - Styling
- `script.js` - Main JavaScript logic
- `calc.js` - Calculation utilities
- `.gitignore` - Git configuration

## Features
✅ Enter current attendance percentage
✅ Simulate full day and half day absences
✅ View projected attendance in real-time
✅ Interactive December calendar
✅ Select attendance stream (IT/Other)
✅ Track mandatory events (18, 19, 21)
✅ Responsive design for all devices

## Support
For issues with Git or GitHub, visit:
- Git Help: https://git-scm.com/doc
- GitHub Help: https://docs.github.com/en/pages
