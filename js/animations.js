/**
 * GULNAAR ATELIER — Animations & Scroll Dynamics
 * Editorial Luxury Animation System
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initHeaderScroll();
  initKineticTypography();
  initScrollObserver();
});

/**
 * 01. Vertical Reading Progress Indicator
 */
function initScrollProgressBar() {
  const progressBar = document.querySelector('.vertical-progress-bar');
  const progressTooltip = document.querySelector('.vertical-progress-tooltip');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    const rounded = Math.min(100, Math.max(0, Math.round(scrolled)));
    progressBar.style.height = `${rounded}%`;
    if (progressTooltip) {
      progressTooltip.textContent = `${rounded}%`;
    }
  }, { passive: true });
}

/**
 * 02. Header Scroll Transition
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 03. Kinetic Word Sequence Highlight on Scroll
 */
function initKineticTypography() {
  const words = document.querySelectorAll('.kinetic-word');
  if (!words.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        words.forEach((word, index) => {
          setTimeout(() => {
            word.classList.add('active-word');
          }, index * 160);
        });
      }
    });
  }, { threshold: 0.3 });

  const journeySec = document.querySelector('.journey-section');
  if (journeySec) {
    observer.observe(journeySec);
  }
}

/**
 * 04. Intersection Observer for Subtle Editorial Fade-Ins
 */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
}
