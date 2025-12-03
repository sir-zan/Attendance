# 📚 Attendance Absence Calculator

A modern, interactive web application to help students **plan their absences wisely** and maintain healthy attendance percentages.

> **Made for:** School students • **Status:** ✅ Production Ready • **Hosting:** Free & Fast

---

## 🎯 What It Does

Enter your **current attendance %** and the app instantly calculates:
- ✅ How many **full days** you can miss while staying above 75%
- ✅ How many **half days** you can miss while staying above 85%
- ✅ Your **projected attendance** based on planned absences
- ✅ **Visual calendar** to plan which days to miss

### The Math

- **Half-day miss** = -0.5% attendance (8 AM-12 PM OR 12 PM-2 PM)
- **Full-day miss** = -0.8% attendance
- **Special events** = +2% (attend 18th, 19th, 21st together)
- **Mandatory days** = Cannot be missed (18, 19, 21, IT: 15-17)

---

## 💡 Key Features

| Feature | Details |
|---------|---------|
| 🎨 **Modern Dark UI** | Professional, easy on the eyes |
| 📅 **Interactive Calendar** | Click to plan absences |
| 🎓 **Stream-Aware** | Different rules for IT vs Other |
| 📊 **Real-Time Calculation** | See results instantly |
| 📱 **Mobile Responsive** | Works on all devices |
| ⚡ **No Backend Needed** | 100% client-side, super fast |
| 🔒 **Private** | No data sent anywhere |
| 💾 **Works Offline** | No internet after initial load |

---

## 🚀 Quick Start

### Option 1: Test Locally (Right Now)

```powershell
cd d:\project\attendance-calculator
python -m http.server 8000
```

Then open: http://localhost:8000

### Option 2: Deploy to Netlify (1 minute)

1. Visit https://app.netlify.com
2. Click **"Deploy manually"**
3. Drag & drop this folder
4. **Done!** Site is live

### Option 3: Deploy to GitHub Pages (5 minutes)

1. Create GitHub repo: `attendance-calculator`
2. Push all files
3. Enable Pages in Settings
4. Live at: `https://yourusername.github.io/attendance-calculator`

👉 **Full deployment guide:** See `DEPLOY.md`

---

## 📋 School Rules Implemented

### Mandatory Days (Cannot Miss)
- **18th**: Career Counseling + Parents
- **19th**: CEO Summit
- **21st**: Annual Day (Sunday, but mandatory)
- **IT Stream**: 15th-17th (IT practicals)

### Important Dates
- **6th**: PTM (Parent-Teacher Meeting)
- **24th, 27th, 30th**: Pre-board Exams
- **22, 23, 25, 26, 28, 29, 31**: School Closed
- **7th, 14th**: Sundays (no classes)

### Attendance Thresholds
- **Below 75%**: Must attend till end of month
- **75-85%**: Must attend till 11th December
- **Above 85%**: More flexibility (see calculator)

---

## 📖 How to Use

### Step 1: Enter Your Info
- **Total Days**: How many working days so far (default: 137)
- **Attendance %**: Your current attendance percentage
- **Stream**: Select IT or Other
- **Special Events**: Check if you'll attend 18/19/21

### Step 2: Plan Absences
- Click calendar days to toggle attendance
- Blue outline = Planned to attend
- See results update in real-time

### Step 3: Read Results
- **Current Attendance**: Your percentage right now
- **Keep ≥ 85%**: Safe miss allowance
- **Keep ≥ 75%**: Maximum miss allowance

---

## 📁 Project Structure

```
attendance-calculator/
├── Index.html          # Main web page
├── styles.css          # Styling (dark theme)
├── script.js           # Main logic & calendar
├── calc.js             # Calculation utilities
├── README.md           # This file
├── QUICKSTART.md       # Quick reference
├── DEPLOY.md           # Deployment guide
└── deploy-github.ps1   # GitHub setup script (Windows)
```

---

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Architecture**: Pure client-side (no backend)
- **Compatibility**: All modern browsers + IE 11
- **Performance**: <100KB total, instant load

---

## 🎨 Customization

### Change Theme Colors
Edit `styles.css` `:root` variables:
```css
:root {
    --bg: #0f172a;        /* Dark background */
    --card: #1e293b;      /* Card color */
    --accent: #3b82f6;    /* Blue accent */
}
```

### Change School Rules
Edit `script.js` arrays:
```javascript
const mandatoryDates = [18, 19, 21];  // Days that cannot be missed
const itDates = [15, 16, 17];         // IT mandatory days
```

### Add School Logo
Add to `Index.html` after `<h1>`:
```html
<img src="school-logo.png" style="max-width:100px;margin:10px 0;">
```

---

## 📊 Algorithm Details

The calculator uses **margin-based computation**:

1. **For ≥85%**: 
   - Margin = (Your % - 85%)
   - Days allowed = Margin ÷ 0.8

2. **For ≥75%**:
   - Margin = (Your % - 75%)
   - Days allowed = Margin ÷ 0.8

3. **Projected %**:
   - `(attended + planned) / total × 100`
   - Then subtract 0.8% per missed day
   - Add 2% if special events attended

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Calendar doesn't show | Refresh browser (Ctrl+F5) |
| Calculations wrong | Clear cache, re-enter data |
| UI looks broken | Browser too old, use Chrome/Firefox |
| Deploy failed | Use Netlify instead (simpler) |

---

## 🚀 Deployment Options

| Platform | Ease | Cost | Time | Setup |
|----------|------|------|------|-------|
| **Netlify** | ⭐⭐⭐⭐⭐ | Free | 1 min | Drag & drop |
| **GitHub Pages** | ⭐⭐⭐⭐ | Free | 5 min | Git push |
| **Vercel** | ⭐⭐⭐⭐⭐ | Free | 1 min | Drag & drop |
| **Firebase** | ⭐⭐⭐ | Free | 10 min | CLI commands |
| **Surge.sh** | ⭐⭐⭐ | Free | 2 min | Terminal |

**Recommended:** Netlify for simplicity, GitHub Pages if you want professional URL.

👉 See `DEPLOY.md` for step-by-step instructions for each platform.

---

## 📞 Support & Contribution

### If You Find Issues:
1. Check `DEPLOY.md` for common problems
2. Look at browser console (F12) for errors
3. Try clearing cache and refreshing

### To Customize:
1. Edit files as needed
2. Test locally first (use `python -m http.server 8000`)
3. Deploy new version
4. Changes live in seconds!

---

## 📋 Features Roadmap

- ✅ Core calculator (DONE)
- ✅ Interactive calendar (DONE)
- ✅ Dark theme UI (DONE)
- ✅ Stream-specific rules (DONE)
- ⏳ Export attendance plan as PDF (future)
- ⏳ Share attendance link with parents (future)
- ⏳ Attendance history tracking (future)

---

## 📄 License

This project is open source and free to use, modify, and distribute.

---

## 🙏 Credits

**Created for:** Students managing attendance
**Built with:** HTML, CSS, JavaScript
**Hosted on:** Netlify / GitHub Pages / Your choice!

---

## 📢 Quick Deployment

**Choose one:**

### 🟢 Easiest: Netlify
```
1. Go to https://app.netlify.com
2. Drag & drop this folder
3. Done! 🎉
```

### 🔵 Best Free: GitHub Pages
```
1. Create GitHub repo
2. Push files
3. Enable Pages
4. Done! 🎉
```

### 🟡 Most Professional: Custom Domain
```
1. Deploy to GitHub Pages
2. Buy domain (~$3/year)
3. Connect in GitHub
4. Done! 🎉
```

---

**Status:** ✅ Production Ready
**Last Updated:** December 3, 2024
**Version:** 1.0.0


