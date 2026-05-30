/* ============================================================
   LYRIX — Premium Music Player Script
   Author: Lyrix Engine v1.0
   ============================================================ */

'use strict';

// ════════════════════════════════════════════════════════════
// 1. SONG LIBRARY — Royalty-free tracks from public sources
// ════════════════════════════════════════════════════════════
const SONGS = [
  {
    id: 0,
    title: "Dreaming Wide Awake",
    artist: "Neon Reverie",
    album: "Afterglow Sessions",
    cover: "https://picsum.photos/seed/lyrix0/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:42"
  },
  {
    id: 1,
    title: "Midnight Architecture",
    artist: "Parallax Drift",
    album: "City Blueprint",
    cover: "https://picsum.photos/seed/lyrix1/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "4:21"
  },
  {
    id: 2,
    title: "Velvet Cascade",
    artist: "Aurora Tone",
    album: "Soft Machines",
    cover: "https://picsum.photos/seed/lyrix2/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "5:03"
  },
  {
    id: 3,
    title: "Glass Frequency",
    artist: "Stellar Lens",
    album: "Transparent",
    cover: "https://picsum.photos/seed/lyrix3/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "3:58"
  },
  {
    id: 4,
    title: "Ember Signal",
    artist: "Haze Protocol",
    album: "Dark Warmth",
    cover: "https://picsum.photos/seed/lyrix4/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "4:14"
  },
  {
    id: 5,
    title: "Quantum Bloom",
    artist: "Prism Void",
    album: "Particle Fields",
    cover: "https://picsum.photos/seed/lyrix5/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: "3:29"
  },
  {
    id: 6,
    title: "Static Lullaby",
    artist: "Neon Reverie",
    album: "Afterglow Sessions",
    cover: "https://picsum.photos/seed/lyrix6/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: "4:47"
  },
  {
    id: 7,
    title: "Chrome Horizon",
    artist: "Parallax Drift",
    album: "City Blueprint",
    cover: "https://picsum.photos/seed/lyrix7/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    duration: "5:12"
  },
  {
    id: 8,
    title: "Soft Collision",
    artist: "Aurora Tone",
    album: "Soft Machines",
    cover: "https://picsum.photos/seed/lyrix8/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: "3:35"
  },
  {
    id: 9,
    title: "Neon Undercurrent",
    artist: "Stellar Lens",
    album: "Transparent",
    cover: "https://picsum.photos/seed/lyrix9/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: "4:01"
  },
  {
    id: 10,
    title: "Pulse Meridian",
    artist: "Haze Protocol",
    album: "Dark Warmth",
    cover: "https://picsum.photos/seed/lyrix10/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    duration: "3:50"
  },
  {
    id: 11,
    title: "Fractal Daydream",
    artist: "Prism Void",
    album: "Particle Fields",
    cover: "https://picsum.photos/seed/lyrix11/400/400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    duration: "4:28"
  }
];

// ════════════════════════════════════════════════════════════
// 2. STATE
// ════════════════════════════════════════════════════════════
const State = {
  currentIndex: 0,
  isPlaying: false,
  isShuffle: false,
  repeatMode: 0,          // 0=off, 1=all, 2=one
  isMuted: false,
  volume: 75,
  theme: localStorage.getItem('lyrix_theme') || 'dark',
  favorites: JSON.parse(localStorage.getItem('lyrix_favs') || '[]'),
  recentlyPlayed: JSON.parse(localStorage.getItem('lyrix_recent') || '[]'),
  listenSeconds: parseInt(localStorage.getItem('lyrix_listen') || '0'),
  filteredSongs: [...SONGS],
  audioCtx: null,
  analyser: null,
  source: null,
  visualizerRAF: null,
  bgRAF: null,
  seekDragging: false
};

// ════════════════════════════════════════════════════════════
// 3. DOM REFS
// ════════════════════════════════════════════════════════════
const $ = id => document.getElementById(id);
const DOM = {
  loadingScreen:  $('loading-screen'),
  audio:          $('audio-player'),
  albumCover:     $('album-cover'),
  trackTitle:     $('track-title'),
  trackArtist:    $('track-artist'),
  trackAlbum:     $('track-album'),
  currentTime:    $('current-time'),
  totalTime:      $('total-time'),
  progressBar:    $('progress-bar'),
  progressFill:   $('progress-fill'),
  btnPlay:        $('btn-play'),
  btnPrev:        $('btn-prev'),
  btnNext:        $('btn-next'),
  btnShuffle:     $('btn-shuffle'),
  btnRepeat:      $('btn-repeat'),
  btnMute:        $('btn-mute'),
  btnFav:         $('btn-fav'),
  volumeSlider:   $('volume-slider'),
  volumeDisplay:  $('volume-display'),
  playlist:       $('playlist'),
  playlistCount:  $('playlist-count'),
  favList:        $('fav-list'),
  favCount:       $('fav-count'),
  recentList:     $('recent-list'),
  searchInput:    $('search-input'),
  searchClear:    $('search-clear'),
  greetingText:   $('greeting-text'),
  themeToggle:    $('theme-toggle'),
  statsToggle:    $('stats-toggle'),
  statsPanel:     $('stats-panel'),
  statTotal:      $('stat-total'),
  statTime:       $('stat-time'),
  statFavs:       $('stat-favs'),
  statRecent:     $('stat-recent'),
  miniPlayer:     $('mini-player'),
  miniCover:      $('mini-cover'),
  miniTitle:      $('mini-title'),
  miniArtist:     $('mini-artist'),
  miniPlay:       $('mini-play'),
  miniPrev:       $('mini-prev'),
  miniNext:       $('mini-next'),
  miniProgress:   $('mini-progress-fill'),
  visualizer:     $('visualizer'),
  bgCanvas:       $('bg-canvas'),
  coverRing:      document.querySelector('.cover-ring-outer'),
  coverWrap:      document.querySelector('.cover-wrap'),
  toastContainer: $('toast-container')
};

// ════════════════════════════════════════════════════════════
// 4. LOADING SCREEN
// ════════════════════════════════════════════════════════════
function initLoadingScreen() {
  setTimeout(() => {
    DOM.loadingScreen.classList.add('fade-out');
    setTimeout(() => DOM.loadingScreen.remove(), 800);
  }, 2200);
}

// ════════════════════════════════════════════════════════════
// 5. THEME
// ════════════════════════════════════════════════════════════
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  State.theme = theme;
  localStorage.setItem('lyrix_theme', theme);
  const icon = DOM.themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}

function toggleTheme() {
  const next = State.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  showToast(`${next === 'dark' ? '🌙 Dark' : '☀️ Light'} mode enabled`, 'info');
}

// ════════════════════════════════════════════════════════════
// 6. GREETING
// ════════════════════════════════════════════════════════════
function updateGreeting() {
  const h = new Date().getHours();
  let msg = h < 12 ? 'Good Morning ☀️' : h < 17 ? 'Good Afternoon 🌤️' : h < 21 ? 'Good Evening 🌆' : 'Good Night 🌙';
  DOM.greetingText.textContent = msg;
}

// ════════════════════════════════════════════════════════════
// 7. BACKGROUND CANVAS — Floating particles
// ════════════════════════════════════════════════════════════
function initBgCanvas() {
  const canvas = DOM.bgCanvas;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.r = Math.random() * 2 + 0.5;
      this.speed = Math.random() * 0.35 + 0.1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = [260, 200, 340, 160][Math.floor(Math.random() * 4)];
    }
    update() {
      this.y -= this.speed;
      this.x += Math.sin(this.y * 0.015) * 0.4;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 90%, 75%, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    State.bgRAF = requestAnimationFrame(loop);
  }
  loop();
}

// ════════════════════════════════════════════════════════════
// 8. AUDIO CONTEXT & VISUALIZER
// ════════════════════════════════════════════════════════════
function setupAudioContext() {
  if (State.audioCtx) return;
  try {
    State.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    State.analyser = State.audioCtx.createAnalyser();
    State.analyser.fftSize = 128;
    State.source = State.audioCtx.createMediaElementSource(DOM.audio);
    State.source.connect(State.analyser);
    State.analyser.connect(State.audioCtx.destination);
  } catch (e) {
    console.warn('AudioContext setup failed:', e);
  }
}

function startVisualizer() {
  if (!State.analyser) return;
  const canvas = DOM.visualizer;
  const ctx = canvas.getContext('2d');
  const bufferLen = State.analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLen);
  const W = canvas.width;
  const H = canvas.height;

  function draw() {
    State.visualizerRAF = requestAnimationFrame(draw);
    State.analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, W, H);
    const barW = (W / bufferLen) * 2.4;
    let x = 0;

    for (let i = 0; i < bufferLen; i++) {
      const v = dataArray[i] / 255;
      const barH = v * H * 0.92;
      const hue = 240 + v * 80;
      const grad = ctx.createLinearGradient(0, H - barH, 0, H);
      grad.addColorStop(0, `hsla(${hue}, 80%, 70%, 0.9)`);
      grad.addColorStop(1, `hsla(${hue + 40}, 90%, 55%, 0.3)`);
      ctx.fillStyle = grad;
      const radius = Math.min(3, barW / 2);
      ctx.beginPath();
      ctx.roundRect(x, H - barH, barW - 1, barH, [radius, radius, 0, 0]);
      ctx.fill();
      x += barW + 1;
    }
  }
  draw();
}

function stopVisualizer() {
  if (State.visualizerRAF) {
    cancelAnimationFrame(State.visualizerRAF);
    State.visualizerRAF = null;
    const ctx = DOM.visualizer.getContext('2d');
    ctx.clearRect(0, 0, DOM.visualizer.width, DOM.visualizer.height);
  }
}

function drawIdleVisualizer() {
  const canvas = DOM.visualizer;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  let t = 0;

  function frame() {
    if (State.isPlaying) return;
    State.visualizerRAF = requestAnimationFrame(frame);
    ctx.clearRect(0, 0, W, H);
    const bars = 32;
    const bw = W / bars;
    for (let i = 0; i < bars; i++) {
      const h = (Math.sin(t + i * 0.4) * 0.5 + 0.5) * H * 0.2 + 4;
      ctx.fillStyle = `rgba(167,139,250,${0.15 + Math.sin(t + i * 0.3) * 0.05})`;
      ctx.beginPath();
      ctx.roundRect(i * bw + 2, H - h, bw - 4, h, [2, 2, 0, 0]);
      ctx.fill();
    }
    t += 0.04;
  }
  frame();
}

// ════════════════════════════════════════════════════════════
// 9. PLAYER — Load & Play
// ════════════════════════════════════════════════════════════
function loadSong(index, autoplay = false) {
  const song = SONGS[index];
  State.currentIndex = index;

  // Update UI
  DOM.trackTitle.textContent   = song.title;
  DOM.trackArtist.textContent  = song.artist;
  DOM.trackAlbum.textContent   = song.album;
  DOM.albumCover.src           = song.cover;
  DOM.miniCover.src            = song.cover;
  DOM.miniTitle.textContent    = song.title;
  DOM.miniArtist.textContent   = song.artist;
  DOM.totalTime.textContent    = song.duration;

  // Progress reset
  DOM.progressFill.style.width = '0%';
  DOM.currentTime.textContent  = '0:00';

  // Fav button
  updateFavBtn(song.id);

  // Highlight playlist
  highlightActiveTrack();

  // Audio
  DOM.audio.src = song.audio;
  DOM.audio.load();

  // Cover spin
  DOM.coverRing.classList.remove('spinning');

  if (autoplay) {
    DOM.audio.play().catch(() => {});
  }

  // Add to recently played
  addToRecent(song);
}

function togglePlay() {
  setupAudioContext();
  if (State.audioCtx && State.audioCtx.state === 'suspended') State.audioCtx.resume();

  if (State.isPlaying) {
    DOM.audio.pause();
  } else {
    DOM.audio.play().catch(() => showToast('Playback blocked — click to allow audio', 'warn'));
  }
}

function onPlay() {
  State.isPlaying = true;
  DOM.btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
  DOM.miniPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
  DOM.coverRing.classList.add('spinning');
  stopVisualizer();
  startVisualizer();
}

function onPause() {
  State.isPlaying = false;
  DOM.btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
  DOM.miniPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
  DOM.coverRing.classList.remove('spinning');
  stopVisualizer();
  drawIdleVisualizer();
}

function playNext() {
  let next;
  if (State.repeatMode === 2) {
    next = State.currentIndex; // repeat one
  } else if (State.isShuffle) {
    do { next = Math.floor(Math.random() * SONGS.length); }
    while (next === State.currentIndex && SONGS.length > 1);
  } else {
    next = (State.currentIndex + 1) % SONGS.length;
  }
  loadSong(next, true);
  showToast(`▶ ${SONGS[next].title}`, 'info');
}

function playPrev() {
  if (DOM.audio.currentTime > 3) {
    DOM.audio.currentTime = 0;
    return;
  }
  const prev = (State.currentIndex - 1 + SONGS.length) % SONGS.length;
  loadSong(prev, State.isPlaying);
  showToast(`◀ ${SONGS[prev].title}`, 'info');
}

// ════════════════════════════════════════════════════════════
// 10. PROGRESS BAR
// ════════════════════════════════════════════════════════════
function onTimeUpdate() {
  if (State.seekDragging) return;
  const { currentTime, duration } = DOM.audio;
  if (!duration) return;
  const pct = (currentTime / duration) * 100;
  DOM.progressFill.style.width = pct + '%';
  DOM.miniProgress.style.width = pct + '%';
  DOM.currentTime.textContent = formatTime(currentTime);

  // Track listen time
  State.listenSeconds++;
  if (State.listenSeconds % 10 === 0) {
    localStorage.setItem('lyrix_listen', State.listenSeconds);
    updateStats();
  }
}

function seekTo(e) {
  const rect = DOM.progressBar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  if (DOM.audio.duration) DOM.audio.currentTime = pct * DOM.audio.duration;
  DOM.progressFill.style.width = (pct * 100) + '%';
}

function formatTime(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

// ════════════════════════════════════════════════════════════
// 11. VOLUME
// ════════════════════════════════════════════════════════════
function setVolume(val) {
  State.volume = Math.max(0, Math.min(100, val));
  DOM.audio.volume = State.volume / 100;
  DOM.volumeSlider.value = State.volume;
  DOM.volumeDisplay.textContent = State.volume + '%';
  updateVolumeSliderBg();
  const icon = DOM.btnMute.querySelector('i');
  if (State.volume === 0) icon.className = 'fa-solid fa-volume-xmark';
  else if (State.volume < 40) icon.className = 'fa-solid fa-volume-low';
  else icon.className = 'fa-solid fa-volume-high';
}

function updateVolumeSliderBg() {
  DOM.volumeSlider.style.background =
    `linear-gradient(90deg, var(--accent-a) ${State.volume}%, var(--bg-input) ${State.volume}%)`;
}

function toggleMute() {
  if (State.isMuted) {
    State.isMuted = false;
    setVolume(State.volume || 75);
    DOM.audio.muted = false;
  } else {
    State.isMuted = true;
    DOM.audio.muted = true;
    DOM.btnMute.querySelector('i').className = 'fa-solid fa-volume-xmark';
  }
}

// ════════════════════════════════════════════════════════════
// 12. SHUFFLE & REPEAT
// ════════════════════════════════════════════════════════════
function toggleShuffle() {
  State.isShuffle = !State.isShuffle;
  DOM.btnShuffle.classList.toggle('active', State.isShuffle);
  showToast(State.isShuffle ? '🔀 Shuffle on' : '🔀 Shuffle off', 'info');
}

function toggleRepeat() {
  State.repeatMode = (State.repeatMode + 1) % 3;
  const icon = DOM.btnRepeat.querySelector('i');
  if (State.repeatMode === 0) {
    DOM.btnRepeat.classList.remove('active');
    icon.className = 'fa-solid fa-repeat';
    showToast('🔁 Repeat off', 'info');
  } else if (State.repeatMode === 1) {
    DOM.btnRepeat.classList.add('active');
    icon.className = 'fa-solid fa-repeat';
    showToast('🔁 Repeat all', 'info');
  } else {
    DOM.btnRepeat.classList.add('active');
    icon.className = 'fa-solid fa-1';
    showToast('🔂 Repeat one', 'info');
  }
}

// ════════════════════════════════════════════════════════════
// 13. FAVOURITES
// ════════════════════════════════════════════════════════════
function toggleFav(id) {
  const idx = State.favorites.indexOf(id);
  if (idx === -1) {
    State.favorites.push(id);
    showToast('❤️ Added to Favourites', 'success');
  } else {
    State.favorites.splice(idx, 1);
    showToast('💔 Removed from Favourites', 'warn');
  }
  localStorage.setItem('lyrix_favs', JSON.stringify(State.favorites));
  updateFavBtn(SONGS[State.currentIndex].id);
  renderFavList();
  updateStats();
}

function updateFavBtn(id) {
  const active = State.favorites.includes(id);
  DOM.btnFav.classList.toggle('active', active);
  DOM.btnFav.querySelector('i').className = active ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
}

// ════════════════════════════════════════════════════════════
// 14. RECENTLY PLAYED
// ════════════════════════════════════════════════════════════
function addToRecent(song) {
  const filtered = State.recentlyPlayed.filter(id => id !== song.id);
  filtered.unshift(song.id);
  State.recentlyPlayed = filtered.slice(0, 12);
  localStorage.setItem('lyrix_recent', JSON.stringify(State.recentlyPlayed));
  renderRecentList();
  updateStats();
}

// ════════════════════════════════════════════════════════════
// 15. RENDER FUNCTIONS
// ════════════════════════════════════════════════════════════
function renderPlaylist(songs = State.filteredSongs) {
  DOM.playlist.innerHTML = '';
  DOM.playlistCount.textContent = songs.length;

  if (songs.length === 0) {
    DOM.playlist.innerHTML = '<li class="no-results">No tracks found</li>';
    return;
  }

  songs.forEach((song, i) => {
    const li = createTrackItem(song, i, 'playlist');
    DOM.playlist.appendChild(li);
  });
}

function renderFavList() {
  DOM.favList.innerHTML = '';
  DOM.favCount.textContent = State.favorites.length;

  if (State.favorites.length === 0) {
    DOM.favList.innerHTML = '<li class="no-results">No favourites yet</li>';
    return;
  }

  State.favorites.forEach(id => {
    const song = SONGS.find(s => s.id === id);
    if (song) {
      const li = createTrackItem(song, null, 'fav');
      DOM.favList.appendChild(li);
    }
  });
}

function renderRecentList() {
  DOM.recentList.innerHTML = '';
  if (State.recentlyPlayed.length === 0) {
    DOM.recentList.innerHTML = '<li class="no-results">Nothing played yet</li>';
    return;
  }
  State.recentlyPlayed.forEach(id => {
    const song = SONGS.find(s => s.id === id);
    if (song) {
      const li = createTrackItem(song, null, 'recent');
      DOM.recentList.appendChild(li);
    }
  });
}

function createTrackItem(song, listIndex, source) {
  const li = document.createElement('li');
  li.className = 'track-item';
  li.setAttribute('data-id', song.id);
  if (song.id === SONGS[State.currentIndex].id) li.classList.add('active');

  li.innerHTML = `
    <img src="${song.cover}" alt="${song.title}" loading="lazy"/>
    <div class="ti-info">
      <div class="ti-title">${song.title}</div>
      <div class="ti-artist">${song.artist}</div>
    </div>
    ${song.id === SONGS[State.currentIndex].id && State.isPlaying
      ? `<div class="playing-dots"><span></span><span></span><span></span></div>`
      : `<span class="ti-dur">${song.duration}</span>`
    }
  `;

  li.addEventListener('click', () => {
    const globalIndex = SONGS.findIndex(s => s.id === song.id);
    if (globalIndex !== -1) {
      loadSong(globalIndex, true);
      showToast(`▶ ${song.title}`, 'info');
    }
  });

  return li;
}

function highlightActiveTrack() {
  document.querySelectorAll('.track-item').forEach(el => {
    const id = parseInt(el.getAttribute('data-id'));
    const isActive = id === SONGS[State.currentIndex].id;
    el.classList.toggle('active', isActive);

    // Swap duration/playing-dots
    const dur = el.querySelector('.ti-dur');
    const dots = el.querySelector('.playing-dots');
    if (isActive && State.isPlaying) {
      if (dur) dur.remove();
      if (!dots) {
        const d = document.createElement('div');
        d.className = 'playing-dots';
        d.innerHTML = '<span></span><span></span><span></span>';
        el.appendChild(d);
      }
    } else {
      if (dots) dots.remove();
      if (!dur) {
        const s = document.createElement('span');
        s.className = 'ti-dur';
        s.textContent = SONGS.find(sg => sg.id === id)?.duration || '';
        el.appendChild(s);
      }
    }
  });
}

// ════════════════════════════════════════════════════════════
// 16. SEARCH
// ════════════════════════════════════════════════════════════
function handleSearch(query) {
  const q = query.trim().toLowerCase();
  DOM.searchClear.classList.toggle('visible', q.length > 0);
  State.filteredSongs = q
    ? SONGS.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        s.album.toLowerCase().includes(q))
    : [...SONGS];
  renderPlaylist(State.filteredSongs);
}

// ════════════════════════════════════════════════════════════
// 17. STATS
// ════════════════════════════════════════════════════════════
function updateStats() {
  DOM.statTotal.textContent  = SONGS.length;
  const mins = Math.floor(State.listenSeconds / 60);
  DOM.statTime.textContent   = mins < 60 ? `${mins}m` : `${Math.floor(mins/60)}h ${mins%60}m`;
  DOM.statFavs.textContent   = State.favorites.length;
  DOM.statRecent.textContent = State.recentlyPlayed.length;
}

// ════════════════════════════════════════════════════════════
// 18. TOAST NOTIFICATIONS
// ════════════════════════════════════════════════════════════
function showToast(msg, type = 'info') {
  const icons = { info: 'fa-circle-info', success: 'fa-circle-check', warn: 'fa-triangle-exclamation' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fa-solid ${icons[type]} toast-icon"></i><span class="toast-msg">${msg}</span>`;
  DOM.toastContainer.appendChild(t);

  const remove = () => {
    t.classList.add('out');
    setTimeout(() => t.remove(), 400);
  };
  t.addEventListener('click', remove);
  setTimeout(remove, 3200);
}

// ════════════════════════════════════════════════════════════
// 19. MINI PLAYER (scroll-triggered)
// ════════════════════════════════════════════════════════════
function initMiniPlayer() {
  const playerSection = document.getElementById('player-section');
  const observer = new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting;
    DOM.miniPlayer.classList.toggle('hidden', visible);
  }, { threshold: 0.1 });
  observer.observe(playerSection);
}

// ════════════════════════════════════════════════════════════
// 20. KEYBOARD SHORTCUTS
// ════════════════════════════════════════════════════════════
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    switch (e.code) {
      case 'Space': e.preventDefault(); togglePlay(); break;
      case 'ArrowRight': e.preventDefault(); playNext(); break;
      case 'ArrowLeft':  e.preventDefault(); playPrev(); break;
      case 'ArrowUp':    e.preventDefault(); setVolume(State.volume + 5); break;
      case 'ArrowDown':  e.preventDefault(); setVolume(State.volume - 5); break;
      case 'KeyF': toggleFav(SONGS[State.currentIndex].id); break;
      case 'KeyS': toggleShuffle(); break;
      case 'KeyR': toggleRepeat(); break;
      case 'KeyM': toggleMute(); break;
    }
  });
}

// ════════════════════════════════════════════════════════════
// 21. PROGRESS BAR DRAG
// ════════════════════════════════════════════════════════════
function initProgressDrag() {
  let dragging = false;

  DOM.progressBar.addEventListener('mousedown', e => {
    dragging = true;
    State.seekDragging = true;
    seekTo(e);
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    seekTo(e);
  });
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    State.seekDragging = false;
  });

  // Touch support
  DOM.progressBar.addEventListener('touchstart', e => {
    State.seekDragging = true;
    seekTo(e.touches[0]);
  }, { passive: true });
  document.addEventListener('touchmove', e => {
    if (!State.seekDragging) return;
    seekTo(e.touches[0]);
  }, { passive: true });
  document.addEventListener('touchend', () => { State.seekDragging = false; });
}

// ════════════════════════════════════════════════════════════
// 22. STATS PANEL TOGGLE
// ════════════════════════════════════════════════════════════
function toggleStats() {
  DOM.statsPanel.classList.toggle('hidden');
  updateStats();
}

// ════════════════════════════════════════════════════════════
// 23. SONG END HANDLER
// ════════════════════════════════════════════════════════════
function onSongEnd() {
  if (State.repeatMode === 2) {
    DOM.audio.currentTime = 0;
    DOM.audio.play();
  } else {
    playNext();
  }
}

// ════════════════════════════════════════════════════════════
// 24. AUDIO DURATION LOADED
// ════════════════════════════════════════════════════════════
function onDurationChange() {
  if (DOM.audio.duration) {
    DOM.totalTime.textContent = formatTime(DOM.audio.duration);
  }
}

// ════════════════════════════════════════════════════════════
// 25. COVER CLICK = Play/Pause
// ════════════════════════════════════════════════════════════
function initCoverClick() {
  DOM.coverWrap.addEventListener('click', togglePlay);
}

// ════════════════════════════════════════════════════════════
// 26. BIND ALL EVENTS
// ════════════════════════════════════════════════════════════
function bindEvents() {
  // Player controls
  DOM.btnPlay.addEventListener('click', togglePlay);
  DOM.btnPrev.addEventListener('click', playPrev);
  DOM.btnNext.addEventListener('click', playNext);
  DOM.btnShuffle.addEventListener('click', toggleShuffle);
  DOM.btnRepeat.addEventListener('click', toggleRepeat);
  DOM.btnMute.addEventListener('click', toggleMute);
  DOM.btnFav.addEventListener('click', () => toggleFav(SONGS[State.currentIndex].id));

  // Mini player
  DOM.miniPlay.addEventListener('click', togglePlay);
  DOM.miniPrev.addEventListener('click', playPrev);
  DOM.miniNext.addEventListener('click', playNext);

  // Volume
  DOM.volumeSlider.addEventListener('input', e => setVolume(parseInt(e.target.value)));

  // Audio events
  DOM.audio.addEventListener('timeupdate', onTimeUpdate);
  DOM.audio.addEventListener('ended', onSongEnd);
  DOM.audio.addEventListener('play', onPlay);
  DOM.audio.addEventListener('pause', onPause);
  DOM.audio.addEventListener('durationchange', onDurationChange);

  // Search
  DOM.searchInput.addEventListener('input', e => handleSearch(e.target.value));
  DOM.searchClear.addEventListener('click', () => {
    DOM.searchInput.value = '';
    handleSearch('');
  });

  // Theme
  DOM.themeToggle.addEventListener('click', toggleTheme);

  // Stats
  DOM.statsToggle.addEventListener('click', toggleStats);
}

// ════════════════════════════════════════════════════════════
// 27. INIT
// ════════════════════════════════════════════════════════════
function init() {
  // Loading
  initLoadingScreen();

  // Theme
  applyTheme(State.theme);

  // Greeting
  updateGreeting();
  setInterval(updateGreeting, 60000);

  // Bind events
  bindEvents();
  initProgressDrag();
  initKeyboard();
  initMiniPlayer();
  initCoverClick();

  // Background
  initBgCanvas();

  // Set volume
  setVolume(State.volume);

  // Load first song
  loadSong(0, false);

  // Render lists
  renderPlaylist();
  renderFavList();
  renderRecentList();

  // Idle visualizer
  setTimeout(drawIdleVisualizer, 2400);

  // Stats
  updateStats();

  // Staggered item entrance animations
  setTimeout(() => {
    document.querySelectorAll('.track-item').forEach((el, i) => {
      el.style.animationDelay = `${i * 0.04}s`;
    });
  }, 100);
}

// ── Boot ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
