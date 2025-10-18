/* ===== Scroll reveal bằng IntersectionObserver (CSS3-friendly) ===== */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

/* ===== Smooth scroll cho anchor (tăng UX nhỏ) ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // đóng menu mobile nếu đang mở
      const navCheckbox = document.getElementById('nav-toggle');
      if (navCheckbox) navCheckbox.checked = false;
    }
  });
});

/* ===== Scrollspy cho navbar ===== */
const sections = document.querySelectorAll('main .section[id]');
const navLinks = Array.from(document.querySelectorAll('.p-nav__link'))
  .filter(a => a.getAttribute('href')?.startsWith('#'));

const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    const id = e.target.id;
    const link = navLinks.find(a => a.getAttribute('href') === `#${id}`);
    if (!link) return;
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('is-active'));
      link.classList.add('is-active');
    }
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });

sections.forEach(s => spy.observe(s));


/* Marquee tự nhân đôi + tự tính tốc độ */
(() => {
  const track = document.querySelector('.hobby-marquee__track');
  const list  = document.querySelector('.hobby-list');
  if (!track || !list) return;

  const clone = list.cloneNode(true);
  track.appendChild(clone);

  const updateSpeed = () => {
    const w = list.scrollWidth;          // rộng 1 vòng
    const seconds = Math.max(16, w / 100); // 100px/s, tối thiểu 16s
    track.style.animationDuration = `${seconds}s`;
  };
  updateSpeed();
  window.addEventListener('resize', updateSpeed);
})();


