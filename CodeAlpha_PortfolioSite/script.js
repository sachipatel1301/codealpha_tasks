/* ===== SACHI PATEL PORTFOLIO — SCRIPT.JS ===== */

/* --- NAVBAR SCROLL --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* --- HAMBURGER MENU --- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

/* --- SMOOTH ACTIVE NAV LINK --- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activateNavLink = () => {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
};

window.addEventListener('scroll', activateNavLink, { passive: true });

/* --- TYPED TEXT EFFECT --- */
const roles = [
  'MERN Stack Developer',
  'Frontend Engineer',
  'Problem Solver',
  'Computer Engineering Student',
  'Open to Opportunities'
];

let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');
const typingSpeed = 80;
const deletingSpeed = 45;
const pauseDelay = 1800;

function typeEffect() {
  const current = roles[roleIdx];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseDelay);
      return;
    }
    setTimeout(typeEffect, typingSpeed);
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, deletingSpeed);
  }
}

setTimeout(typeEffect, 900);

/* --- SCROLL REVEAL --- */
const revealElements = document.querySelectorAll('[data-reveal], [data-reveal-right]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling items
      const siblings = Array.from(entry.target.parentElement.children).filter(
        el => el.hasAttribute('data-reveal') || el.hasAttribute('data-reveal-right')
      );
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* --- ANIMATED COUNTERS --- */
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const isDecimal = target % 1 !== 0;
  const duration = 1800;
  const step = 16;
  const steps = duration / step;
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal ? current.toFixed(2) + suffix : Math.floor(current) + suffix;
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* --- CONTACT FORM (simulated send) --- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      formNote.textContent = "Thanks for reaching out! I'll get back to you within 24 hours.";
      formNote.style.color = '#22c55e';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.disabled = false;
        formNote.textContent = '';
      }, 4000);
    }, 1200);
  });
}

/* --- SKILL PILL HOVER ripple (subtle) --- */
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mouseenter', function() {
    this.style.transition = 'transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s';
  });
});

/* --- CURSOR CUSTOM (desktop only) --- */
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 10px; height: 10px;
    background: rgba(108,99,255,0.8);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transition: transform 0.1s, opacity 0.2s;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(cursor);

  const cursorRing = document.createElement('div');
  cursorRing.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 36px; height: 36px;
    border: 1.5px solid rgba(108,99,255,0.3);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99998;
    transition: transform 0.25s, opacity 0.25s;
  `;
  document.body.appendChild(cursorRing);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    cursorRing.style.transform = `translate(${mx - 18}px, ${my - 18}px)`;
  });

  document.querySelectorAll('a, button, .skill-pill, .project-card, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.8)';
      cursorRing.style.transform += ' scale(1.4)';
      cursorRing.style.borderColor = 'rgba(108,99,255,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.borderColor = 'rgba(108,99,255,0.3)';
    });
  });
}

/* --- PAGE LOAD FADE IN --- */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
