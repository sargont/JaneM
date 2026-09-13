
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

if (!prefersReducedMotion) document.querySelectorAll('.section-heading, .look-card, .promo-card, .steps li').forEach(el => observer.observe(el));

function closeNavigation(restoreFocus=false) { if (!nav?.classList.contains('open')) return; nav.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); if (restoreFocus) toggle?.focus(); }
document.addEventListener('keydown', e=>{if(e.key==='Escape')closeNavigation(true);});
document.addEventListener('click', e=>{if(!nav?.contains(e.target)&&!toggle?.contains(e.target))closeNavigation();});
