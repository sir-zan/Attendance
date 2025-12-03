# Quick Start Guide

## What You Have ✨

A complete, modern **Attendance Calculator** web application with:

### Features
- 📊 **Dark Modern UI** - Professional, student-friendly design
- 📅 **Interactive Calendar** - Click to plan absences for December
- 🎓 **Stream-Specific** - Different rules for IT vs Other streams
- 📈 **Real-time Calculation** - Instant feedback on attendance impact
- 📱 **Fully Responsive** - Works on phones, tablets, laptops
- ⚡ **Lightning Fast** - No server needed, runs entirely in browser
- 💾 **Works Offline** - No internet needed after first load

---

## Rules Built In ✅

1. **Half-day absence** = -0.5% attendance
   - Either 8 AM - 12 PM OR 12 PM - 2 PM

2. **Full-day absence** = -0.8% attendance

3. **Special Events Bonus** = +2% attendance
   - Attend on 18th, 19th, AND 21st
   - Career Counseling + CEO Summit + Annual Day

4. **Stream-Specific Mandatory Days**
   - **IT Students**: Must attend 15, 16, 17 (IT practicals)
   - **Other Streams**: Can skip 15-17 (unless below 75%)

5. **Attendance Requirements**
   - **Below 75%**: Must attend till end of month (21st)
   - **75-85%**: Must attend till 11th December
   - **Above 85%**: More flexibility

6. **Other Important Dates**
   - PTM: 6th December
   - Pre-board Exams: 24th, 27th, 30th (attendance tracked separately)
   - School Closed: 22, 23, 25, 26, 28, 29, 31

---

## How to Use

### Local Testing (Before Deploying)

1. **Open in browser directly:**
   - Double-click `Index.html`
   - OR right-click → Open with → Browser

2. **Using local server (better):**
   ```powershell
   # In the folder, run:
   python -m http.server 8000
   
   # Then visit: http://localhost:8000
   ```

### Using the Calculator

1. **Enter Your Info:**
   - Total days: `137` (or whatever your school has)
   - Current attendance %: Enter your current percentage
   - Stream: Select IT or Other
   - Check if you'll attend 18/19/21

2. **Interact with Calendar:**
   - Blue highlighted days = Days you planned to attend
   - Click any weekday (4-20) to toggle attendance plan
   - See your projected attendance instantly

3. **Read Results:**
   - **Current Attendance**: Your percentage right now
   - **Keep ≥ 85%**: How many days you can safely miss
   - **Keep ≥ 75%**: Maximum flexibility allowed

---

## Deployment Options (Easiest to Hardest)

### ⭐ Option 1: Netlify (EASIEST - 1 minute)
1. Go to https://app.netlify.com
2. Click **"Deploy manually"**
3. Drag & drop this folder
4. Done! Live immediately

**Get:** Free subdomain like `attendance-calc-2024.netlify.app`

---

### ⭐⭐ Option 2: GitHub Pages (FREE - 5 minutes)
1. Create GitHub account (if needed)
2. Create new repository: `attendance-calculator`
3. Upload all files
4. Enable Pages in Settings
5. Done! Live at `https://yourusername.github.io/attendance-calculator`

**Benefit:** Looks professional, easy to share

---

### ⭐⭐⭐ Option 3: Custom Domain (PROFESSIONAL - 10 minutes)
1. Deploy to GitHub Pages (Option 2)
2. Buy domain: Namecheap.com (~$1-3/year)
3. Connect in GitHub settings
4. Done! Live at `attendance.yourschool.com` (or similar)

---

## File Explanations

| File | Purpose |
|------|---------|
| `Index.html` | The web page structure and UI |
| `styles.css` | Colors, fonts, layout (dark theme) |
| `script.js` | Main calculator logic & calendar |
| `calc.js` | Shared calculation utilities |
| `README.md` | Original documentation |
| `DEPLOY.md` | Detailed deployment guide |
| `deploy-github.ps1` | Automated GitHub setup (Windows) |

---

## Customization Ideas

Want to modify it? Easy!

### Change school name:
- Edit line 1 in `Index.html`: `<h1>📚 Attendance Absence Calculator</h1>`

### Change dark theme colors:
- Edit `:root` section in `styles.css`
- Change `--bg`, `--card`, `--accent`, etc.

### Modify attendance rules:
- Edit `mandatoryDates`, `itDates`, etc. in `script.js`

### Add more fields:
- Add new HTML inputs
- Update `script.js` to use them

---

## Troubleshooting

**Calendar not showing?**
- Check browser console (F12)
- Make sure all 4 JS/CSS files are in same folder

**Calculations seem wrong?**
- Clear browser cache (Ctrl+Shift+Del)
- Make sure you entered both total days AND attendance %

**Deploy failing?**
- Use Netlify instead (simpler)
- Or check DEPLOY.md for detailed steps

---

## Next Steps

### To Deploy Today:
1. **Quickest:** Netlify (drag & drop)
2. **Best Free:** GitHub Pages
3. **Professional:** GitHub + Custom Domain

### To Customize:
1. Edit the files as needed
2. Test locally first
3. Deploy new version

### To Share:
1. Deploy
2. Copy the live URL
3. Share with students
4. They can plan their absences!

---

## Support

This is a **static website** - no server, no database, no logins needed.
All calculations happen in the browser. Completely private & fast.

For questions about the logic, check `script.js` - it's well-commented.

---

**Status:** ✅ Complete and ready to deploy!
**Last Updated:** December 3, 2024
