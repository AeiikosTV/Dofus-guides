/* ── Navbar scroll ───────────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── Mobile menu ─────────────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  // Animate burger
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
function closeMobile() {
  mobileMenu.classList.remove('open');
  burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

/* ── Particles ───────────────────────────────────────────── */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 25;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = '100%';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    p.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(p);
  }
}
createParticles();

/* ── Preview tabs ────────────────────────────────────────── */
document.querySelectorAll('.preview-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.preview-screen').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.preview-screen[data-screen="${target}"]`).classList.add('active');
  });
});

/* ── FAQ accordion ───────────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    // Ferme tous
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // Ouvre si pas déjà ouvert
    if (!wasOpen) item.classList.add('open');
  });
});

/* ── Scroll animations ───────────────────────────────────── */
const animObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Délai en cascade pour les groupes
      const delay = entry.target.closest('.features-grid, .steps, .faq-list')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-anim]').forEach(el => animObserver.observe(el));

/* ── Smooth scroll nav links ─────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Compteur animé (stats hero) ─────────────────────────── */
function animateCounter(el, end, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  const startVal = 0;
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const current = Math.round(startVal + (end - startVal) * ease);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      const values = [150, 1800, 100, 0];
      const suffixes = ['+', '+', '%', ''];
      nums.forEach((el, i) => animateCounter(el, values[i], suffixes[i]));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ── Download button (remplace '#' par la vraie URL) ─────── */
// Pour activer le téléchargement, mets la vraie URL ici :
document.getElementById('dl-btn').href = 'https://github.com/AeiikosTV/Dofus-guides/releases/latest/download/DofusGuides-v1.0-Windows.zip';
