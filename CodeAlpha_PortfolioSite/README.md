# Sachi Patel — Portfolio Website

## 📁 Folder Structure
```
sachi-portfolio/
├── index.html       ← Main HTML file
├── style.css        ← All styles
├── script.js        ← Animations & interactions
├── resume.pdf       ← Add your actual resume here
└── README.md        ← This file
```

## ⚡ Quick Start (Local)
1. Download / unzip this folder
2. Add your **resume.pdf** inside the folder
3. Open `index.html` in any browser — done!

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub Repo
- Go to github.com → New repository
- Name it: `yourusername.github.io` (for root domain)
  OR any name like `portfolio` (for subdomain)

### Step 2 — Push files
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/sachipatel1301/sachipatel1301.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
- Go to repo → Settings → Pages
- Source: `main` branch, `/root` folder
- Save → your site will be live at:
  `https://sachipatel1301.github.io`

---

## 🌐 Deploy to Netlify

### Option A — Drag & Drop (easiest)
1. Go to app.netlify.com → Log in
2. Drag the entire `sachi-portfolio/` folder onto the deploy area
3. Done! You get a live URL like `xyz.netlify.app`
4. Optionally set a custom subdomain in Site Settings → Domain Management

### Option B — GitHub Integration
1. Push to GitHub (steps above)
2. Go to app.netlify.com → New site from Git
3. Connect GitHub → pick your repo → Deploy
4. Auto-deploys on every push!

---

## 🛠 Customization Checklist
- [ ] Replace `resume.pdf` with your actual resume
- [ ] Update GitHub/LinkedIn URLs throughout `index.html`
- [ ] Update email and phone if needed
- [ ] Add more projects when built
- [ ] Add real profile photo (replace SVG illustration if desired)

## 📱 Responsive
Tested and optimized for:
- Mobile (320px+)
- Tablet (768px+)
- Laptop (1024px+)
- Desktop (1200px+)

## ✨ Features
- Custom animated SVG illustration (professional dev character)
- Typed text animation cycling through roles
- Scroll-triggered reveal animations
- Animated stat counters
- Floating tech badges
- Custom cursor (desktop)
- Mobile hamburger menu
- Contact form with feedback
- Dark mode by default
- No frameworks — pure HTML/CSS/JS
