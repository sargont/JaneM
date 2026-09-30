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

