# frame. — Image Gallery

> CodeAlpha Frontend Development Internship · Task 1

## 📁 Folder Structure

```
frame-html/
├── index.html     ← Main HTML structure
├── style.css      ← All styles, animations & responsive layout
├── script.js      ← Gallery logic, lightbox, auth & interactions
└── README.md      ← This file
```

---

## ⚡ Quick Start (Local)

1. Download / unzip the `frame-html` folder
2. Open `index.html` in any browser — done!
3. No server, no npm, no setup needed — works straight away

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub Repo
- Go to [github.com](https://github.com) → **New repository**
- Name it anything, e.g. `frame-gallery` or `codeAlpha-task1`

### Step 2 — Push your files
```bash
git init
git add .
git commit -m "CodeAlpha Task 1 — Image Gallery"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/frame-gallery.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
- Go to your repo → **Settings** → **Pages**
- Source: `main` branch, `/root` folder
- Click **Save** → your site will be live at:
  `https://YOUR_USERNAME.github.io/frame-gallery`

---

## 🌐 Deploy to Netlify

### Option A — Drag & Drop *(easiest, recommended)*
1. Go to [app.netlify.com](https://app.netlify.com) → Log in
2. Drag the entire `frame-html/` folder onto the deploy area
3. Done! You get a live URL like `xyz.netlify.app`
4. Optionally set a custom subdomain under **Site Settings → Domain Management**

### Option B — GitHub Integration
1. Push to GitHub (steps above)
2. Go to [app.netlify.com](https://app.netlify.com) → **New site from Git**
3. Connect GitHub → pick your repo → **Deploy**
4. Auto-deploys on every push — no manual updates needed!

---

## ✅ Task Requirements Checklist

- [x] Image gallery using **HTML & CSS** layout (masonry grid)
- [x] **JavaScript navigation** — next/prev buttons in lightbox
- [x] **Lightbox view** — fullscreen with slide animation
- [x] **Hover effects** — card lift, zoom, overlay fade-in
- [x] **Smooth transitions** — all state changes animated
- [x] **Responsive design** — 4-col → 3-col → 2-col → 1-col
- [x] **Bonus: Image filters / categories** — 8 category pills with photo counts

---

## 🛠 Customization Checklist

- [ ] Replace Unsplash images with your own photos (update `src` in `script.js`)
- [ ] Change colour accent from orange `#f09060` to your preferred brand colour in `style.css` (`--accent` variable)
- [ ] Add or remove image categories in the `CATEGORIES` array in `script.js`
- [ ] Update footer text in `index.html` with your name
- [ ] Add more photos to the `IMAGES` array in `script.js`

---

## 📱 Responsive Breakpoints

Tested and optimized for:

- **Mobile** (380px+) — single column
- **Large Mobile** (480px+) — 2 columns
- **Tablet** (640px+) — 3 columns
- **Laptop** (960px+) — 4 columns
- **Desktop** (1200px+) — 4+ columns masonry

---

## ✨ Features

- **Masonry grid layout** — Pinterest-style dynamic columns
- **Scroll reveal animations** — cards fade + slide up on scroll (IntersectionObserver)
- **Scroll progress bar** — gradient line tracking page position at the top
- **Lightbox with prev/next navigation** — keyboard (← →) + touch swipe supported
- **Slide transition** — left/right animation when navigating between images
- **8 category filter pills** — with photo count badges
- **Live search** — filters by title, author, category or tag in real time
- **Favourites & Saved collections** — heart/bookmark on every card and in lightbox
- **Sign Up / Login system** — per-user data stored in `localStorage`, persists on refresh
- **Toast notifications** — bottom-right popups for every user action
- **Animated hero section** — floating ambient orbs with drift animation
- **Mobile hamburger menu** — smooth open/close with CSS transform
- **Sticky filter bar** — category pills stay visible while scrolling
- **Password show/hide toggle** — in the auth modal
- **No frameworks** — pure HTML, CSS, JavaScript only

---

## 🔑 How the Auth Works

> Since this is a frontend-only project, auth data is stored in the browser's `localStorage`.

- Signing up creates a user entry saved to `localStorage`
- Logging in reads and validates that entry
- Favourites and Saved photos are tied to the logged-in user
- Data **persists across page refreshes** in the same browser
- Data is **per browser** — not shared across devices (no backend)

---

## 📦 Tech Stack

| Layer      | Technology           |
|------------|----------------------|
| Structure  | HTML5 (semantic)     |
| Styling    | CSS3 (custom properties, grid, animations) |
| Logic      | Vanilla JavaScript (ES6+) |
| Fonts      | Google Fonts — Outfit |
| Images     | Unsplash (CDN)       |
| Storage    | Browser localStorage |

---

*Built for CodeAlpha Frontend Development Internship · Task 1 — Image Gallery*