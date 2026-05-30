# LYRIX — Premium Music Player

> *Where Sound Lives* — A fully original, production-quality music player web application built with pure HTML, CSS, and JavaScript.

---

## 📁 Folder Structure

```
lyrix/
├── index.html       ← Main HTML file (structure & layout)
├── style.css        ← All styles (glassmorphism, animations, responsive)
├── script.js        ← Full player logic, visualizer, Web Audio API
└── README.md        ← This file
```

---

## ⚡ Quick Start (Local)

1. Download / unzip the `lyrix` folder
2. Open `index.html` in any modern browser — done!

> **💡 For the Audio Visualizer** to work fully, serve via a local server (browsers block Web Audio API on raw `file://`):
> ```bash
> npx serve .
> # then open http://localhost:3000
> ```

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub Repo
- Go to [github.com](https://github.com) → New repository
- Name it: `yourusername.github.io` (for root domain)
  OR any name like `lyrix` (for subdomain path)

### Step 2 — Push Files
```bash
git init
git add .
git commit -m "Initial Lyrix commit"
git branch -M main
git remote add origin https://github.com/yourusername/lyrix.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
- Go to repo → **Settings** → **Pages**
- Source: `main` branch, `/root` folder
- Save → your site will be live at:
  `https://yourusername.github.io/lyrix`

---

## 🌐 Deploy to Netlify

### Option A — Drag & Drop (easiest)
1. Go to [app.netlify.com](https://app.netlify.com) → Log in
2. Drag the entire `lyrix/` folder onto the deploy area
3. Done! You get a live URL like `xyz.netlify.app`
4. Optionally set a custom subdomain in **Site Settings → Domain Management**

### Option B — GitHub Integration
1. Push to GitHub (steps above)
2. Go to [app.netlify.com](https://app.netlify.com) → **New site from Git**
3. Connect GitHub → pick your repo → Deploy
4. Auto-deploys on every push!

---

## 🎵 Adding Your Own Songs

Open `script.js` and find the `SONGS` array at the top. Add entries in this format:

```js
{
  id: 12,                                          // unique number
  title: "Your Song Title",
  artist: "Artist Name",
  album: "Album Name",
  cover: "https://link-to-cover-image.jpg",        // 400×400 recommended
  audio: "https://link-to-audio-file.mp3",         // direct MP3 URL
  duration: "3:45"                                 // display only
}
```

> Use royalty-free sources like [SoundHelix](https://www.soundhelix.com), [Free Music Archive](https://freemusicarchive.org), or [Pixabay Music](https://pixabay.com/music/).

---

## 🛠 Customization Checklist

- [ ] Replace songs in the `SONGS` array in `script.js`
- [ ] Update brand name / tagline in `index.html` if desired
- [ ] Swap cover images with real album art URLs
- [ ] Adjust color palette via CSS variables in `:root` in `style.css`
- [ ] Add your own logo SVG in place of the existing brand SVG
- [ ] Update footer credits in `index.html`

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` | Play / Pause |
| `→` | Next track |
| `←` | Previous track |
| `↑` | Volume up |
| `↓` | Volume down |
| `F` | Toggle favourite |
| `S` | Toggle shuffle |
| `R` | Cycle repeat mode |
| `M` | Toggle mute |

---

## 📱 Responsive Breakpoints

Tested and optimized for:
- Mobile (320px+)
- Tablet (768px+)
- Laptop (1024px+)
- Desktop (1280px+)
- Wide (1920px+)

---

## ✨ Features

### 🎛 Core Player
- Play / Pause / Previous / Next
- Click-to-seek & drag-to-seek progress bar
- Volume slider with live percentage display
- Mute / unmute toggle
- Auto-play next song on end

### 🎨 Design
- Original brand identity — **LYRIX**
- Glassmorphism cards with backdrop blur
- Animated aurora blobs & multi-layer gradients
- Floating particle canvas background (Web Canvas API)
- Spinning conic-gradient album ring animation
- Smooth entrance & hover animations throughout
- Premium loading screen with audio bar animation

### 🔊 Audio
- Real-time frequency visualizer (Web Audio API + Canvas)
- Idle breathing visualizer when paused
- Supports any direct-link MP3/audio source

### 📋 Playlist
- Full scrollable playlist panel
- Real-time search / filter by title, artist, album
- Active track highlighting with animated sound bars
- Click any track to jump instantly

### ❤️ Library
- Favourites system (persisted in LocalStorage)
- Recently Played history (persisted in LocalStorage)
- Statistics dashboard — total tracks, listening time, favourites count

### 🔁 Playback Modes
- Shuffle (true random, avoids repeat)
- Repeat All
- Repeat One

### 🖥 UX
- Scroll-triggered sticky Mini Player
- Dark / Light theme toggle (persisted in LocalStorage)
- Toast notifications for all key actions
- Dynamic time-based greeting
- Full keyboard shortcut support
- No frameworks — pure HTML / CSS / ES6 JavaScript

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3 (Custom Properties, Grid, Flexbox, Animations) |
| Logic | Vanilla ES6+ JavaScript (modules pattern) |
| Audio | Web Audio API |
| Graphics | Canvas API (visualizer + particles) |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts — Syne, DM Sans, Space Mono |
| Storage | Browser LocalStorage |

---

## 🖼 CDN Dependencies (no install needed)

Already linked in `index.html` — no npm or build step required:

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

<!-- Font Awesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
```

---

## 📄 License

This project is built for educational / internship submission purposes.  
All audio tracks used are royalty-free from [SoundHelix](https://www.soundhelix.com).  
Cover images sourced from [Picsum Photos](https://picsum.photos) (free to use).

---

*Built with 🎵 and pure code — no frameworks, no shortcuts.*