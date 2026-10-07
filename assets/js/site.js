/* Aman Kumar — site.js
   Two behaviours, both optional and both guarded:
   1. The masthead starfield (only runs when #particle-canvas exists)
   2. Reveal-on-scroll for .reveal elements
   Everything degrades to fully visible content when JS or motion is off. */

(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* --- 1. Masthead starfield -------------------------------------------------
     Sparse, slow, low-alpha drift. No particle web, no connecting lines. */
  function initStarfield() {
    var canvas = document.getElementById('particle-canvas');
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var stars = [];
    var frame = 0;
    var w = 0;
    var h = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function size() {
      var rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      var count = Math.round(Math.min(72, Math.max(28, (w * h) / 16000)));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.35 + Math.random() * 0.85,
          a: 0.12 + Math.random() * 0.34,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(226, 214, 194, ' + s.a + ')';
        ctx.fill();
      }
    }

    function step() {
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -2) s.x = w + 2; else if (s.x > w + 2) s.x = -2;
        if (s.y < -2) s.y = h + 2; else if (s.y > h + 2) s.y = -2;
      }
      draw();
      frame = requestAnimationFrame(step);
    }

    function start() {
      cancelAnimationFrame(frame);
      size();
      seed();
      if (motionQuery.matches) {
        draw();
        return;
      }
      step();
    }

    start();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(start, 150);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else if (!motionQuery.matches) {
        step();
      }
    });
  }

  /* --- 2. Reveal on scroll --------------------------------------------------- */
  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    function showAll() {
      Array.prototype.forEach.call(targets, function (el) {
        el.classList.add('is-visible');
      });
    }

    if (motionQuery.matches || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty('--d', (i * 40) + 'ms');
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(targets, function (el) {
      observer.observe(el);
    });
  }

  initStarfield();
  initReveal();
})();
