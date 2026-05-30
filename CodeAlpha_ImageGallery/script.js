/* ═══════════════════════════════════════════════
   FRAME. — Image Gallery · script.js
   ═══════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const IMAGES = [
  { id:1,  title:"Misty Peaks",       author:"Alex Rivera",       cat:"Nature",        tags:["mountain","mist","landscape"],   src:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4" },
  { id:2,  title:"Glass Tower",       author:"Sarah Kim",         cat:"Architecture",  tags:["building","glass","urban"],      src:"https://images.unsplash.com/photo-1486325212027-8081e485255e" },
  { id:3,  title:"Code & Coffee",     author:"Dev Patel",         cat:"Technology",    tags:["laptop","tech","desk"],          src:"https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
  { id:4,  title:"Golden Portrait",   author:"Maya Chen",         cat:"People",        tags:["portrait","golden","light"],     src:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" },
  { id:5,  title:"Chromatic Dream",   author:"Neo Arts",          cat:"Abstract",      tags:["abstract","color","art"],        src:"https://images.unsplash.com/photo-1541701494587-cb58502866ab" },
  { id:6,  title:"Bali Temple",       author:"Chris Park",        cat:"Travel",        tags:["bali","temple","indonesia"],     src:"https://images.unsplash.com/photo-1537996194471-e657df975ab4" },
  { id:7,  title:"Sushi Art",         author:"Yuki Tanaka",       cat:"Food",          tags:["sushi","japanese","cuisine"],    src:"https://images.unsplash.com/photo-1553621042-f6e147245754" },
  { id:8,  title:"City at Night",     author:"Tom Brown",         cat:"Architecture",  tags:["city","night","lights"],         src:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df" },
  { id:9,  title:"Forest Canopy",     author:"Lisa Green",        cat:"Nature",        tags:["forest","trees","green"],        src:"https://images.unsplash.com/photo-1448375240586-882707db888b" },
  { id:10, title:"Circuit Board",     author:"TechVis Studio",    cat:"Technology",    tags:["circuit","electronic","tech"],   src:"https://images.unsplash.com/photo-1518770660439-4636190af475" },
  { id:11, title:"Paris at Dawn",     author:"Marie Dubois",      cat:"Travel",        tags:["paris","france","eiffel"],       src:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
  { id:12, title:"Desert Dunes",      author:"Amir Hassan",       cat:"Nature",        tags:["desert","sand","dunes"],         src:"https://images.unsplash.com/photo-1509316785289-025f5b846b35" },
  { id:13, title:"Latte Art",         author:"Barista Jo",        cat:"Food",          tags:["coffee","latte","cafe"],         src:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { id:14, title:"Nebula Core",       author:"StarGaze Collective",cat:"Abstract",     tags:["galaxy","space","nebula"],       src:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564" },
  { id:15, title:"Street Soul",       author:"Marcus Lane",       cat:"People",        tags:["portrait","street","candid"],    src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
  { id:16, title:"Tokyo Neon",        author:"Ken Suzuki",        cat:"Travel",        tags:["tokyo","neon","japan"],          src:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf" },
  { id:17, title:"Steel Bridge",      author:"Drone Eye",         cat:"Architecture",  tags:["bridge","aerial","steel"],       src:"https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084" },
  { id:18, title:"Monsoon Petals",    author:"Flora Williams",    cat:"Nature",        tags:["flowers","petals","rain"],       src:"https://images.unsplash.com/photo-1490750967868-88df5691cc2e" },
  { id:19, title:"Night Watch",       author:"Eve Torres",        cat:"People",        tags:["portrait","dark","dramatic"],    src:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" },
  { id:20, title:"Winter Abstract",   author:"8bit Arts",         cat:"Abstract",      tags:["snow","abstract","winter"],      src:"https://images.unsplash.com/photo-1519681393784-d120267933ba" },
  { id:21, title:"Ramen Bowl",        author:"Hana Sato",         cat:"Food",          tags:["ramen","japanese","noodles"],    src:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624" },
  { id:22, title:"VR Frontier",       author:"Pixel Labs",        cat:"Technology",    tags:["vr","virtual","tech","future"],  src:"https://images.unsplash.com/photo-1592478411213-6153e4ebc07d" },
  { id:23, title:"Santorini Blue",    author:"Nico Papadakis",    cat:"Travel",        tags:["santorini","greece","sea"],      src:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff" },
  { id:24, title:"Geometric Void",    author:"Form Studio",       cat:"Abstract",      tags:["geometric","pattern","abstract"],src:"https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d" },
];

const CATEGORIES = ["All","Nature","Architecture","People","Technology","Abstract","Travel","Food"];

/* ══════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════ */
let state = {
  view:     'explore',   // 'explore' | 'favs' | 'saved'
  category: 'All',
  query:    '',
  lbIndex:  0,           // current lightbox index in filtered list
  lbList:   [],          // currently shown list
  authTab:  'login',
  passVisible: false,
};

/* ══════════════════════════════════════════════════════
   AUTH — localStorage
══════════════════════════════════════════════════════ */
const Auth = {
  _key:  'frame_users',
  _sess: 'frame_session',

  getUsers() {
    try {
      const raw = localStorage.getItem(this._key);
      if (!raw) return {};
      const obj = JSON.parse(raw);
      Object.keys(obj).forEach(e => {
        obj[e].favs  = new Set(obj[e].favs  || []);
        obj[e].saved = new Set(obj[e].saved || []);
      });
      return obj;
    } catch { return {}; }
  },

  saveUsers(users) {
    try {
      const s = {};
      Object.keys(users).forEach(e => {
        s[e] = { ...users[e], favs: [...users[e].favs], saved: [...users[e].saved] };
      });
      localStorage.setItem(this._key, JSON.stringify(s));
    } catch {}
  },

  currentUser() {
    try {
      const email = localStorage.getItem(this._sess);
      if (!email) return null;
      return this.getUsers()[email] || null;
    } catch { return null; }
  },

  signup({ name, email, pass }) {
    if (!name.trim() || !email.trim() || !pass.trim()) return 'Please fill in all fields.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.';
    if (pass.length < 6) return 'Password must be at least 6 characters.';
    const users = this.getUsers();
    const key = email.toLowerCase().trim();
    if (users[key]) return 'An account with this email already exists.';
    users[key] = { name: name.trim(), email: key, pass, favs: new Set(), saved: new Set() };
    this.saveUsers(users);
    localStorage.setItem(this._sess, key);
    return null;
  },

  login({ email, pass }) {
    if (!email.trim() || !pass.trim()) return 'Please fill in all fields.';
    const users = this.getUsers();
    const key = email.toLowerCase().trim();
    const u = users[key];
    if (!u || u.pass !== pass) return 'Invalid email or password.';
    localStorage.setItem(this._sess, key);
    return null;
  },

  logout() { localStorage.removeItem(this._sess); },

  toggleFav(id) {
    const users = this.getUsers();
    const key = localStorage.getItem(this._sess);
    if (!key || !users[key]) return false;
    const u = users[key];
    u.favs.has(id) ? u.favs.delete(id) : u.favs.add(id);
    this.saveUsers(users);
    return true;
  },

  toggleSave(id) {
    const users = this.getUsers();
    const key = localStorage.getItem(this._sess);
    if (!key || !users[key]) return false;
    const u = users[key];
    u.saved.has(id) ? u.saved.delete(id) : u.saved.add(id);
    this.saveUsers(users);
    return true;
  },
};

/* ══════════════════════════════════════════════════════
   DOM REFS
══════════════════════════════════════════════════════ */
const $  = id => document.getElementById(id);
const $$ = s  => document.querySelectorAll(s);

const dom = {
  scrollBar:   $('scroll-bar'),
  navbar:      $('navbar'),
  logo:        $('logo-btn'),
  searchInp:   $('search-input'),
  srchClear:   $('srch-clear'),
  navTabs:     $$('.ntab'),
  favCount:    $('fav-count'),
  saveCount:   $('save-count'),
  navAuth:     $('nav-auth'),
  hamburger:   $('hamburger'),
  mobMenu:     $('mob-menu'),
  mobBtns:     $$('.mob-btn'),
  mobAuthWrap: $('mob-auth-wrap'),
  hero:        $('hero'),
  heroCta:     $('hero-cta'),
  filtersBar:  $('filters-bar'),
  catsRow:     $('cats-row'),
  filterMeta:  $('filter-meta'),
  sectionHead: $('section-head'),
  searchLabel: $('search-label'),
  gallery:     $('gallery'),
  // Lightbox
  lightbox:    $('lightbox'),
  lbBg:        $('lb-bg'),
  lbClose:     $('lb-close'),
  lbPrev:      $('lb-prev'),
  lbNext:      $('lb-next'),
  lbImg:       $('lb-img'),
  lbLoading:   $('lb-loading'),
  lbCounter:   $('lb-counter'),
  lbCat:       $('lb-cat'),
  lbTitle:     $('lb-title'),
  lbAuthor:    $('lb-author'),
  lbTags:      $('lb-tags'),
  lbFav:       $('lb-fav'),
  lbSav:       $('lb-sav'),
  lbHint:      $('lb-hint'),
  lbHintLink:  $('lb-hint-link'),
  // Auth
  authModal:   $('auth-modal'),
  authBg:      $('auth-bg'),
  authClose:   $('auth-close'),
  authTagline: $('auth-tagline'),
  atabs:       $$('.atab'),
  fieldName:   $('field-name'),
  inpName:     $('inp-name'),
  inpEmail:    $('inp-email'),
  inpPass:     $('inp-pass'),
  passEye:     $('pass-eye'),
  authErr:     $('auth-err'),
  authSubmit:  $('auth-submit'),
  submitTxt:   $('submit-txt'),
  submitSpin:  $('submit-spin'),
  authFootTxt: $('auth-foot-txt'),
  authFootBtn: $('auth-foot-btn'),
  // Toast
  toastStack:  $('toast-stack'),
};

/* ══════════════════════════════════════════════════════
   SCROLL PROGRESS + NAVBAR SHADOW
══════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  dom.scrollBar.style.width = pct + '%';
  dom.navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ══════════════════════════════════════════════════════
   INTERSECTION OBSERVER — Card reveal on scroll
══════════════════════════════════════════════════════ */
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = (e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('visible'), delay);
      cardObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

/* ══════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════ */
function toast(msg, icon = '✓', duration = 2800) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="toast-icon">${icon}</span>${msg}`;
  dom.toastStack.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    el.addEventListener('animationend', () => el.remove());
  }, duration);
}

/* ══════════════════════════════════════════════════════
   FILTER LOGIC
══════════════════════════════════════════════════════ */
function getFiltered() {
  const me = Auth.currentUser();
  let list =
    state.view === 'favs'  ? IMAGES.filter(i => me?.favs?.has(i.id))  :
    state.view === 'saved' ? IMAGES.filter(i => me?.saved?.has(i.id)) :
    IMAGES;

  if (state.category !== 'All')
    list = list.filter(i => i.cat === state.category);

  if (state.query.trim()) {
    const q = state.query.toLowerCase();
    list = list.filter(i =>
      i.title.toLowerCase().includes(q) ||
      i.author.toLowerCase().includes(q) ||
      i.cat.toLowerCase().includes(q) ||
      i.tags.some(t => t.includes(q))
    );
  }
  return list;
}

/* ══════════════════════════════════════════════════════
   RENDER — Category Pills
══════════════════════════════════════════════════════ */
function renderPills() {
  dom.catsRow.innerHTML = '';
  CATEGORIES.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'cat-pill' + (state.category === c ? ' active' : '');
    const count = c === 'All' ? IMAGES.length : IMAGES.filter(i => i.cat === c).length;
    btn.innerHTML = `${c}<span class="pill-count">${c !== 'All' ? count : ''}</span>`;
    btn.addEventListener('click', () => {
      if (state.category === c) return;
      state.category = c;
      renderAll();
    });
    dom.catsRow.appendChild(btn);
  });
}

/* ══════════════════════════════════════════════════════
   RENDER — Nav badges + auth area
══════════════════════════════════════════════════════ */
function renderNav() {
  const me = Auth.currentUser();
  // Active tab
  dom.navTabs.forEach(t => t.classList.toggle('active', t.dataset.view === state.view));
  dom.mobBtns.forEach(b => b.classList.toggle('active', b.dataset.view === state.view));

  // Badges
  const fc = me ? me.favs.size  : 0;
  const sc = me ? me.saved.size : 0;
  dom.favCount.textContent  = fc;
  dom.saveCount.textContent = sc;
  dom.favCount.classList.toggle('hidden',  fc === 0);
  dom.saveCount.classList.toggle('hidden', sc === 0);
  // Update mobile badges if present
  const mfb = $('mob-fav-badge');
  const msb = $('mob-save-badge');
  if (mfb) { mfb.textContent = fc; mfb.classList.toggle('hidden', fc === 0); }
  if (msb) { msb.textContent = sc; msb.classList.toggle('hidden', sc === 0); }

  // Auth area
  dom.navAuth.innerHTML = '';
  dom.mobAuthWrap.innerHTML = '';
  if (me) {
    const initials = me.name.split(' ').map(p => p[0]).slice(0,2).join('').toUpperCase();
    const row = document.createElement('div');
    row.className = 'user-row';
    row.innerHTML = `
      <div class="avatar">${initials}</div>
      <span class="user-name">${me.name.split(' ')[0]}</span>
      <button class="btn-logout" id="btn-logout-nav">Logout</button>
    `;
    dom.navAuth.appendChild(row);
    $('btn-logout-nav').addEventListener('click', doLogout);

    const mobRow = row.cloneNode(true);
    mobRow.querySelector('.btn-logout').addEventListener('click', doLogout);
    dom.mobAuthWrap.appendChild(mobRow);
  } else {
    const btn = document.createElement('button');
    btn.className = 'btn-signin';
    btn.textContent = 'Sign In';
    btn.addEventListener('click', openAuth);
    dom.navAuth.appendChild(btn);

    const mobBtn = btn.cloneNode(true);
    mobBtn.addEventListener('click', () => { openAuth(); closeMobileMenu(); });
    dom.mobAuthWrap.appendChild(mobBtn);
  }
}

/* ══════════════════════════════════════════════════════
   RENDER — Gallery
══════════════════════════════════════════════════════ */
function renderGallery() {
  const filtered = getFiltered();
  state.lbList = filtered;
  dom.gallery.innerHTML = '';

  // Filter meta
  if (state.view === 'explore') {
    dom.filtersBar.classList.remove('hidden');
    dom.sectionHead.classList.add('hidden');
    if (!state.query && state.category === 'All') {
      dom.filterMeta.textContent = `${IMAGES.length} photos`;
    } else {
      dom.filterMeta.textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;
    }
  } else {
    dom.filtersBar.classList.add('hidden');
    dom.sectionHead.classList.remove('hidden');
    const icon = state.view === 'favs' ? '♥' : '⊟';
    const label = state.view === 'favs' ? 'Favourites' : 'Saved';
    dom.sectionHead.innerHTML = `
      <span class="sh-icon" style="color:${state.view === 'favs' ? '#e85555' : '#f09060'}">${icon}</span>
      <h2>${label}</h2>
      <span class="sh-count">${filtered.length} photo${filtered.length !== 1 ? 's' : ''}</span>
    `;
  }

  // Search label
  if (state.query.trim()) {
    dom.searchLabel.classList.remove('hidden');
    dom.searchLabel.innerHTML = `
      <span>${filtered.length} result${filtered.length !== 1 ? 's' : ''} for </span>
      <strong>"${escHtml(state.query)}"</strong>
      <button class="sl-clear">Clear</button>
    `;
    dom.searchLabel.querySelector('.sl-clear').addEventListener('click', () => {
      dom.searchInp.value = '';
      state.query = '';
      dom.srchClear.classList.add('hidden');
      renderAll();
    });
  } else {
    dom.searchLabel.classList.add('hidden');
  }

  // Empty state
  if (filtered.length === 0) {
    const me = Auth.currentUser();
    const div = document.createElement('div');
    div.className = 'empty-state';
    div.innerHTML = `
      <div class="empty-icon">${state.view === 'favs' ? '♡' : state.view === 'saved' ? '⊞' : '◎'}</div>
      <div class="empty-text">
        ${state.query
          ? `No photos match "<strong>${escHtml(state.query)}</strong>"`
          : state.view === 'favs'
          ? 'Heart some photos and they\'ll appear here'
          : state.view === 'saved'
          ? 'Save photos to your personal collection'
          : 'No photos found in this category'}
      </div>
      ${(state.view !== 'explore' && !me) ? `<button class="empty-cta" id="empty-signin">Sign in to get started</button>` : ''}
    `;
    dom.gallery.appendChild(div);
    const esc = $('empty-signin');
    if (esc) esc.addEventListener('click', openAuth);
    return;
  }

  // Cards
  const me = Auth.currentUser();
  filtered.forEach((img, idx) => {
    const card = createCard(img, idx, me);
    dom.gallery.appendChild(card);
  });
}

/* ── createCard ─────────────────────────────────────────────────────────── */
function createCard(img, idx, me) {
  const isFav   = me?.favs?.has(img.id)  || false;
  const isSaved = me?.saved?.has(img.id) || false;

  const div = document.createElement('div');
  div.className = 'card';
  div.dataset.delay = Math.min(idx, 8) * 60; // stagger up to 8 cards
  div.innerHTML = `
    <img
      src="${img.src}?w=520&q=75&auto=format&fit=crop"
      alt="${escHtml(img.title)}"
      loading="lazy"
    />
    <div class="card-cat">${img.cat}</div>
    <div class="card-overlay">
      <div class="card-top">
        <button class="card-icon fav-icon${isFav ? ' fav-on' : ''}"
          title="${isFav ? 'Remove from favourites' : 'Add to favourites'}">
          ${isFav ? '♥' : '♡'}
        </button>
        <button class="card-icon save-icon${isSaved ? ' save-on' : ''}"
          title="${isSaved ? 'Remove from saved' : 'Save photo'}">
          ${isSaved ? '⊟' : '⊞'}
        </button>
      </div>
      <div class="card-bottom">
        <div class="card-title">${escHtml(img.title)}</div>
        <div class="card-author">${escHtml(img.author)}</div>
      </div>
    </div>
  `;

  // Fav button
  div.querySelector('.fav-icon').addEventListener('click', e => {
    e.stopPropagation();
    if (!Auth.currentUser()) { openAuth(); return; }
    Auth.toggleFav(img.id);
    const me2 = Auth.currentUser();
    const on = me2.favs.has(img.id);
    const btn = e.currentTarget;
    btn.textContent = on ? '♥' : '♡';
    btn.classList.toggle('fav-on', on);
    btn.title = on ? 'Remove from favourites' : 'Add to favourites';
    // Pulse animation
    btn.style.animation = 'none';
    requestAnimationFrame(() => {
      btn.style.animation = 'pulse 0.3s ease';
    });
    toast(on ? 'Added to Favourites' : 'Removed from Favourites', on ? '♥' : '♡');
    renderNav();
    if (state.view === 'favs') renderGallery();
  });

  // Save button
  div.querySelector('.save-icon').addEventListener('click', e => {
    e.stopPropagation();
    if (!Auth.currentUser()) { openAuth(); return; }
    Auth.toggleSave(img.id);
    const me2 = Auth.currentUser();
    const on = me2.saved.has(img.id);
    const btn = e.currentTarget;
    btn.textContent = on ? '⊟' : '⊞';
    btn.classList.toggle('save-on', on);
    btn.title = on ? 'Remove from saved' : 'Save photo';
    btn.style.animation = 'none';
    requestAnimationFrame(() => { btn.style.animation = 'pulse 0.3s ease'; });
    toast(on ? 'Photo Saved' : 'Removed from Saved', on ? '⊟' : '⊞');
    renderNav();
    if (state.view === 'saved') renderGallery();
  });

  // Open lightbox
  div.addEventListener('click', () => openLightbox(idx));

  // Scroll reveal
  cardObserver.observe(div);

  return div;
}

/* ══════════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════════ */
function openLightbox(idx) {
  state.lbIndex = idx;
  dom.lightbox.classList.remove('hidden');
  dom.lightbox.classList.add('anim-in');
  document.body.style.overflow = 'hidden';
  populateLightbox(idx, null);
}

function closeLightbox() {
  dom.lightbox.classList.add('anim-out');
  dom.lightbox.addEventListener('animationend', () => {
    dom.lightbox.classList.add('hidden');
    dom.lightbox.classList.remove('anim-out', 'anim-in');
    document.body.style.overflow = '';
  }, { once: true });
}

function populateLightbox(idx, direction) {
  const list = state.lbList;
  const img  = list[idx];
  if (!img) return;

  // Loading state
  dom.lbLoading.style.display = 'flex';
  dom.lbImg.classList.add('loading');

  // Slide animation
  if (direction) {
    dom.lbImg.classList.remove('lb-slide-left', 'lb-slide-right');
    void dom.lbImg.offsetWidth; // reflow
    dom.lbImg.classList.add(direction === 'next' ? 'lb-slide-left' : 'lb-slide-right');
  }

  // Load image
  const tempImg = new Image();
  tempImg.src = `${img.src}?w=1200&q=85&auto=format&fit=crop`;
  tempImg.onload = () => {
    dom.lbImg.src = tempImg.src;
    dom.lbImg.alt = img.title;
    dom.lbImg.classList.remove('loading');
    dom.lbLoading.style.display = 'none';
  };
  tempImg.onerror = () => {
    dom.lbImg.src = img.src;
    dom.lbImg.classList.remove('loading');
    dom.lbLoading.style.display = 'none';
  };

  // Info panel
  dom.lbCat.textContent    = img.cat;
  dom.lbTitle.textContent  = img.title;
  dom.lbAuthor.textContent = `by ${img.author}`;

  // Tags
  dom.lbTags.innerHTML = img.tags.map(t => `<span class="lb-tag">#${t}</span>`).join('');

  // Counter
  dom.lbCounter.textContent = `${idx + 1} / ${list.length}`;

  // Arrows
  dom.lbPrev.disabled = idx === 0;
  dom.lbNext.disabled = idx === list.length - 1;

  // Fav/save buttons
  const me = Auth.currentUser();
  if (me) {
    dom.lbHint.classList.add('hidden');
    const isFav   = me.favs.has(img.id);
    const isSaved = me.saved.has(img.id);
    dom.lbFav.innerHTML  = `<span class="lb-icon">${isFav   ? '♥' : '♡'}</span> ${isFav   ? 'Favourited' : 'Favourite'}`;
    dom.lbSav.innerHTML  = `<span class="lb-icon">${isSaved ? '⊟' : '⊞'}</span> ${isSaved ? 'Saved'      : 'Save'}`;
    dom.lbFav.classList.toggle('active', isFav);
    dom.lbSav.classList.toggle('active', isSaved);
  } else {
    dom.lbFav.innerHTML = `<span class="lb-icon">♡</span> Favourite`;
    dom.lbSav.innerHTML = `<span class="lb-icon">⊞</span> Save`;
    dom.lbFav.classList.remove('active');
    dom.lbSav.classList.remove('active');
    dom.lbHint.classList.remove('hidden');
  }
}

function lbNavigate(direction) {
  const list = state.lbList;
  const newIdx = state.lbIndex + (direction === 'next' ? 1 : -1);
  if (newIdx < 0 || newIdx >= list.length) return;
  state.lbIndex = newIdx;
  populateLightbox(newIdx, direction);
}

/* Lightbox events */
dom.lbClose.addEventListener('click', closeLightbox);
dom.lbBg.addEventListener('click', closeLightbox);
dom.lbPrev.addEventListener('click', () => lbNavigate('prev'));
dom.lbNext.addEventListener('click', () => lbNavigate('next'));

dom.lbFav.addEventListener('click', () => {
  if (!Auth.currentUser()) { closeLightbox(); openAuth(); return; }
  Auth.toggleFav(state.lbList[state.lbIndex].id);
  populateLightbox(state.lbIndex, null);
  renderNav();
  refreshCardIcons(state.lbList[state.lbIndex].id);
  const me = Auth.currentUser();
  const on = me.favs.has(state.lbList[state.lbIndex].id);
  toast(on ? 'Added to Favourites' : 'Removed from Favourites', on ? '♥' : '♡');
});

dom.lbSav.addEventListener('click', () => {
  if (!Auth.currentUser()) { closeLightbox(); openAuth(); return; }
  Auth.toggleSave(state.lbList[state.lbIndex].id);
  populateLightbox(state.lbIndex, null);
  renderNav();
  refreshCardIcons(state.lbList[state.lbIndex].id);
  const me = Auth.currentUser();
  const on = me.saved.has(state.lbList[state.lbIndex].id);
  toast(on ? 'Photo Saved' : 'Removed from Saved', on ? '⊟' : '⊞');
});

dom.lbHintLink.addEventListener('click', () => { closeLightbox(); openAuth(); });

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!dom.lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lbNavigate('prev');
    if (e.key === 'ArrowRight') lbNavigate('next');
  }
  if (!dom.authModal.classList.contains('hidden') && e.key === 'Escape') closeAuth();
});

// Touch/swipe support for lightbox
let touchStartX = 0;
dom.lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
dom.lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) lbNavigate(dx < 0 ? 'next' : 'prev');
}, { passive: true });

/* Refresh card icons after lightbox toggle */
function refreshCardIcons(imgId) {
  const me = Auth.currentUser();
  $$('.card').forEach(card => {
    const fi = card.querySelector('.fav-icon');
    const si = card.querySelector('.save-icon');
    if (!fi || !si) return;
    // Match by position in filtered list
    const cards = [...$$('.card')];
    const cIdx  = cards.indexOf(card);
    const img   = state.lbList[cIdx];
    if (!img || img.id !== imgId) return;
    const isFav   = me?.favs?.has(img.id)  || false;
    const isSaved = me?.saved?.has(img.id) || false;
    fi.textContent = isFav   ? '♥' : '♡';
    fi.classList.toggle('fav-on',  isFav);
    si.textContent = isSaved ? '⊟' : '⊞';
    si.classList.toggle('save-on', isSaved);
  });
}

/* ══════════════════════════════════════════════════════
   AUTH MODAL
══════════════════════════════════════════════════════ */
function openAuth() {
  dom.authModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => dom.inpEmail.focus(), 200);
}
function closeAuth() {
  dom.authModal.classList.add('hidden');
  if (dom.lightbox.classList.contains('hidden')) {
    document.body.style.overflow = '';
  }
  clearAuthForm();
}

function clearAuthForm() {
  dom.inpName.value = '';
  dom.inpEmail.value = '';
  dom.inpPass.value = '';
  dom.authErr.classList.add('hidden');
  dom.authErr.textContent = '';
  state.passVisible = false;
  dom.inpPass.type = 'password';
}

function setAuthTab(tab) {
  state.authTab = tab;
  dom.atabs.forEach(t => t.classList.toggle('active', t.dataset.atab === tab));
  dom.fieldName.classList.toggle('hidden', tab !== 'signup');
  dom.authTagline.textContent = tab === 'login'
    ? 'Welcome back — sign in to your collection'
    : 'Join and start curating your gallery';
  dom.submitTxt.textContent  = tab === 'login' ? 'Sign In →' : 'Create Account →';
  dom.authFootTxt.textContent = tab === 'login' ? 'New to frame?' : 'Already have an account?';
  dom.authFootBtn.textContent = tab === 'login' ? 'Create account' : 'Sign in';
  clearAuthForm();
}

async function submitAuth() {
  const tab = state.authTab;
  dom.submitTxt.classList.add('hidden');
  dom.submitSpin.classList.remove('hidden');
  await sleep(350);
  dom.submitTxt.classList.remove('hidden');
  dom.submitSpin.classList.add('hidden');

  const err = tab === 'login'
    ? Auth.login({ email: dom.inpEmail.value, pass: dom.inpPass.value })
    : Auth.signup({ name: dom.inpName.value, email: dom.inpEmail.value, pass: dom.inpPass.value });

  if (err) {
    dom.authErr.textContent = err;
    dom.authErr.classList.remove('hidden');
    // Shake animation
    dom.authErr.style.animation = 'none';
    requestAnimationFrame(() => { dom.authErr.style.animation = 'fadeUp 0.3s ease'; });
    return;
  }

  closeAuth();
  const me = Auth.currentUser();
  toast(`Welcome, ${me.name.split(' ')[0]}! 👋`, '✓');
  renderAll();
}

dom.authClose.addEventListener('click', closeAuth);
dom.authBg.addEventListener('click', closeAuth);
dom.atabs.forEach(t => t.addEventListener('click', () => setAuthTab(t.dataset.atab)));
dom.authSubmit.addEventListener('click', submitAuth);
dom.authFootBtn.addEventListener('click', () => setAuthTab(state.authTab === 'login' ? 'signup' : 'login'));
dom.inpPass.addEventListener('keydown', e => { if (e.key === 'Enter') submitAuth(); });
dom.inpEmail.addEventListener('keydown', e => { if (e.key === 'Enter') dom.inpPass.focus(); });

// Password toggle
dom.passEye.addEventListener('click', () => {
  state.passVisible = !state.passVisible;
  dom.inpPass.type = state.passVisible ? 'text' : 'password';
  dom.passEye.style.color = state.passVisible ? 'var(--accent)' : '';
});

function doLogout() {
  Auth.logout();
  toast('Signed out. See you soon!', '👋');
  if (state.view !== 'explore') state.view = 'explore';
  renderAll();
  closeMobileMenu();
}

/* ══════════════════════════════════════════════════════
   SEARCH
══════════════════════════════════════════════════════ */
let searchTimer;
dom.searchInp.addEventListener('input', e => {
  state.query = e.target.value;
  dom.srchClear.classList.toggle('hidden', !state.query);
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderAll, 280);
});
dom.srchClear.addEventListener('click', () => {
  dom.searchInp.value = '';
  state.query = '';
  dom.srchClear.classList.add('hidden');
  renderAll();
  dom.searchInp.focus();
});

/* ══════════════════════════════════════════════════════
   NAV TABS
══════════════════════════════════════════════════════ */
dom.navTabs.forEach(t => {
  t.addEventListener('click', () => {
    const view = t.dataset.view;
    if (!Auth.currentUser() && (view === 'favs' || view === 'saved')) {
      openAuth();
      return;
    }
    state.view = view;
    state.category = 'All';
    if (view !== 'explore') dom.hero.style.display = 'none';
    else dom.hero.style.display = '';
    renderAll();
  });
});

dom.mobBtns.forEach(b => {
  b.addEventListener('click', () => {
    const view = b.dataset.view;
    if (!Auth.currentUser() && (view === 'favs' || view === 'saved')) {
      openAuth(); closeMobileMenu(); return;
    }
    state.view = view;
    state.category = 'All';
    if (view !== 'explore') dom.hero.style.display = 'none';
    else dom.hero.style.display = '';
    closeMobileMenu();
    renderAll();
  });
});

/* ══════════════════════════════════════════════════════
   HAMBURGER / MOBILE MENU
══════════════════════════════════════════════════════ */
dom.hamburger.addEventListener('click', () => {
  const open = !dom.mobMenu.classList.contains('hidden');
  if (open) closeMobileMenu();
  else      openMobileMenu();
});

function openMobileMenu() {
  dom.mobMenu.classList.remove('hidden');
  dom.hamburger.classList.add('open');
}
function closeMobileMenu() {
  dom.mobMenu.classList.add('hidden');
  dom.hamburger.classList.remove('open');
}

/* ══════════════════════════════════════════════════════
   LOGO + HERO CTA
══════════════════════════════════════════════════════ */
dom.logo.addEventListener('click', () => {
  state.view = 'explore';
  state.category = 'All';
  state.query = '';
  dom.searchInp.value = '';
  dom.srchClear.classList.add('hidden');
  dom.hero.style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderAll();
});

dom.heroCta.addEventListener('click', () => {
  dom.filtersBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ══════════════════════════════════════════════════════
   OPEN AUTH from nav (non-authed user)
══════════════════════════════════════════════════════ */
function openAuthFromNav() { openAuth(); }
dom.navAuth.addEventListener('click', e => {
  if (e.target.classList.contains('btn-signin')) openAuth();
});

/* ══════════════════════════════════════════════════════
   RENDER ALL
══════════════════════════════════════════════════════ */
function renderAll() {
  renderNav();
  renderPills();
  renderGallery();
}

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
renderAll();
