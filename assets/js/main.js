/* ============================================================
   Travel Trips — main.js
   Lenis smooth scroll + GSAP ScrollTrigger reveals + counters + nav
   ============================================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Lenis smooth scroll ---------- */
  let lenis;
  if (window.Lenis && !prefersReducedMotion) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
    }
  }

  /* ---------- Nav: scroll state + mobile drawer ---------- */
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');

  if (nav) {
    const onScroll = function () {
      if (window.scrollY > 40) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      const isOpen = nav.classList.contains('is-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (lenis) {
        if (isOpen) lenis.stop(); else lenis.start();
      }
    });

    // Close drawer when a link is clicked
    document.querySelectorAll('.nav__drawer a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      });
    });
  }

  /* ---------- Smooth-scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const href = a.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (lenis) lenis.scrollTo(target, { offset: -80 });
        else target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---------- GSAP reveal animations ---------- */
  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    // Fade-up reveal
    document.querySelectorAll('.reveal').forEach(function (el) {
      window.gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    });

    // Stagger groups
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      const items = group.querySelectorAll('.reveal-item');
      window.gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          once: true,
        },
      });
    });

    // Hero parallax
    const heroImg = document.querySelector('.hero__media img');
    if (heroImg) {
      window.gsap.to(heroImg, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroImg,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Animated counters
    document.querySelectorAll('[data-counter]').forEach(function (el) {
      const target = parseFloat(el.getAttribute('data-counter'));
      const obj = { val: 0 };
      window.gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: function () {
          el.textContent = Math.round(obj.val).toString();
        },
      });
    });
  } else {
    // No GSAP / reduced motion — make .reveal visible
    document.querySelectorAll('.reveal, .reveal-item, .reveal-x').forEach(function (el) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    document.querySelectorAll('[data-counter]').forEach(function (el) {
      el.textContent = el.getAttribute('data-counter');
    });
  }

  /* ---------- Active nav link based on current path ---------- */
  const path = window.location.pathname.replace(/\\/g, '/');
  document.querySelectorAll('.nav__links a, .nav__drawer a').forEach(function (a) {
    const href = a.getAttribute('href') || '';
    if (!href || href.startsWith('#')) return;
    const normalized = href.replace(/^\.\//, '').replace(/^\.\.\//, '');
    if (path.endsWith('/' + normalized) || path.endsWith(normalized) ||
        (normalized === 'index.html' && (path.endsWith('/') || path === ''))) {
      a.classList.add('is-active');
    }
  });

  /* ---------- Year in footer ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Wrap heading text in .brush so the SVG underline
       clones onto every wrapped line via box-decoration-break ---------- */
  document.querySelectorAll(
    '.hero h1, .page-hero h1, .section-head h2, .split__text h2, .cta-card h2'
  ).forEach(function (h) {
    if (h.querySelector('.brush')) return;
    const span = document.createElement('span');
    span.className = 'brush';
    while (h.firstChild) span.appendChild(h.firstChild);
    h.appendChild(span);
  });
})();
