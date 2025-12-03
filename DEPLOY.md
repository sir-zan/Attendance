# 🚀 Deployment Guide

Your attendance calculator is ready to deploy! Choose any of these free hosting options:

---

## Option 1: GitHub Pages (Recommended - Easiest)

**Prerequisites:** GitHub account

### Steps:
1. Create a new GitHub repository named `attendance-calculator`
2. Clone it locally
3. Copy all files from this folder into the cloned repo
4. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit: Attendance Calculator"
   git push origin main
   ```
5. Go to repo Settings → Pages → Select "main" branch → Save
6. Your site will be live at: `https://yourusername.github.io/attendance-calculator`

**File Structure for GitHub:**
```
attendance-calculator/
├── Index.html
├── styles.css
├── script.js
├── calc.js
└── README.md
```

---

## Option 2: Netlify (Very Easy)

**Prerequisites:** None needed!

### Steps:
1. Visit https://app.netlify.com
2. Click **"Deploy manually"**
3. Drag and drop this entire folder
4. Your site is live instantly!
5. Get a URL like: `https://[random-id].netlify.app`

**To get a custom domain:**
- Domain Name → Add Netlify Domain (paid) or use subdomain (free)

---

## Option 3: Vercel (Very Easy)

**Prerequisites:** None needed!

### Steps:
1. Visit https://vercel.com
2. Click **"Deploy"** and select this folder
3. Site goes live immediately
4. Get a URL like: `https://attendance-calculator-[id].vercel.app`

---

## Option 4: Firebase Hosting (Free Tier)

### Steps:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`
5. Site live at: `https://[project-id].web.app`

---

## Option 5: Surge.sh (Simplest for Quick Deploy)

### Steps:
```bash
npm install -g surge
surge
```
Then pick a domain (surge gives you one free like `yourdomain.surge.sh`)

---

## Quickest Option: PowerShell Script for GitHub Pages

**Copy `deploy-github.ps1` into your repo folder and run:**
```powershell
.\deploy-github.ps1
```

This automates the entire GitHub Pages setup!

---

## Testing Locally Before Deploying

Open `Index.html` directly in your browser or run a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have it)
npx http-server
```

Then visit: `http://localhost:8000`

---

## Features Your Site Has ✅

- ✅ Dark modern UI (professional look)
- ✅ Interactive December calendar
- ✅ Real-time calculations
- ✅ Mobile responsive
- ✅ No backend needed (pure static HTML/CSS/JS)
- ✅ Works offline
- ✅ Instant loading

---

## Recommended: GitHub Pages + Custom Domain

For a truly professional setup:
1. Deploy to GitHub Pages (free)
2. Add custom domain from Namecheap/GoDaddy (~$1-3/year)
3. Connect in GitHub Settings

Your students can access: `attendance.yourdomain.com`

---

## Support

If you need any changes:
- Edit `Index.html` - add content/change text
- Edit `styles.css` - change colors/fonts
- Edit `script.js` - change calculations/logic
- Redeploy!

All changes take effect within seconds on GitHub Pages, Netlify, or Vercel.
