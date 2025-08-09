(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const contactForm = document.getElementById('contactForm');
  const heroCanvas = document.getElementById('heroCanvas');
  const confettiCanvas = document.getElementById('confettiCanvas');
  let confettiTimerId;

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // single-theme (light) — removed theme toggler

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Set active nav item on scroll
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const menuLinks = Array.from(navLinks ? navLinks.querySelectorAll('a[href^="#"]') : []);
  function setActive(hash) {
    menuLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === hash));
  }
  if (sections.length && menuLinks.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive('#' + entry.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach((s) => io.observe(s));
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      alert(`Thank you, ${name || 'friend'}! We will be in touch soon.`);
      contactForm.reset();
    });
  }

  // Remove 3D shapes; use lightweight 2D particle fallback only
  if (heroCanvas && heroCanvas.getContext) {
    // fallback: 2D particles
    const ctx = heroCanvas.getContext('2d');
    let width = (heroCanvas.width = heroCanvas.offsetWidth);
    let height = (heroCanvas.height = heroCanvas.offsetHeight);
    const particleCount = Math.min(120, Math.floor((width * height) / 12000));
    const particles = new Array(particleCount).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (0.2 + Math.random() * 0.6),
      vy: (Math.random() - 0.5) * (0.2 + Math.random() * 0.6),
      size: 0.6 + Math.random() * 1.8,
      depth: Math.random(),
      hue: 210 + Math.random() * 40,
    }));
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx * (1 + p.depth);
        p.y += p.vy * (1 + p.depth);
        if (p.x < -10) p.x = width + 10; if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10; if (p.y > height + 10) p.y = -10;
        const alpha = 0.35 + p.depth * 0.35;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 40%, ${alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 60%, 0.35)`;
        ctx.shadowBlur = 8 + p.depth * 12;
        ctx.arc(p.x, p.y, p.size + p.depth * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      requestAnimationFrame(draw);
    }
    function resize2D() {
      width = heroCanvas.width = heroCanvas.offsetWidth;
      height = heroCanvas.height = heroCanvas.offsetHeight;
    }
    window.addEventListener('resize', resize2D);
    resize2D();
    draw();
  }

  function launchConfetti() {
    const count = 160;
    const defaults = { spread: 70, ticks: 300, gravity: 0.8 };
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    resizeCanvas();

    const pieces = Array.from({ length: count }).map(() => createPiece());
    let raf;
    step();

    function createPiece() {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: canvas.width / 2,
        y: canvas.height / 3,
        vx: Math.cos(angle) * (2 + Math.random() * 4),
        vy: Math.sin(angle) * (2 + Math.random() * 4) - 6,
        size: 5 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
        color: `hsl(${200 + Math.random() * 60} 90% ${50 + Math.random() * 30}%)`,
        life: defaults.ticks,
      };
    }

    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        p.life -= 1;
        if (p.life <= 0) continue;
        p.vy += 0.04 * defaults.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      if (pieces.some((p) => p.life > 0 && p.y < canvas.height + 50)) {
        raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
        canvas.remove();
      }
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas, { once: true });
  }

  window.addEventListener('load', () => {
    confettiTimerId = setTimeout(launchConfetti, 600);
  });
  // no theme toggle confetti restart

  // Confetti overlay in hero — continuous, colorful
  if (confettiCanvas && confettiCanvas.getContext) {
    // Only render confetti on the home hero section
    const heroSection = document.querySelector('.hero');
    function inView() {
      if (!heroSection) return false;
      const r = heroSection.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    }
    const ctx = confettiCanvas.getContext('2d');
    let width, height, pieces, raf;
    function resize() {
      width = confettiCanvas.width = confettiCanvas.offsetWidth;
      height = confettiCanvas.height = confettiCanvas.offsetHeight;
      pieces = Array.from({ length: 160 }, () => newPiece());
    }
    function newPiece() {
      const size = 4 + Math.random() * 6;
      const hue = 190 + Math.random() * 160; // multi-color range
      return {
        x: Math.random() * width,
        y: Math.random() * -height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 1.2 + Math.random() * 1.8,
        size,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.12,
        color: `hsl(${hue} 90% ${50 + Math.random() * 25}%)`,
        shape: Math.random() < 0.5 ? 'rect' : 'circle',
      };
    }
    function step() {
      ctx.clearRect(0, 0, width, height);
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > height + 20) {
          // reset to top
          const idx = pieces.indexOf(p);
          pieces[idx] = newPiece();
          pieces[idx].y = -10;
          pieces[idx].x = Math.random() * width;
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(step);
    }
    window.addEventListener('resize', resize);
    resize();
    function loop() {
      if (inView()) { step(); }
      else { ctx.clearRect(0, 0, width, height); requestAnimationFrame(loop); }
    }
    loop();
  }

  // Contact form inline validation + toast
  const toast = document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.setAttribute('aria-hidden', 'false');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 2600);
  }
  if (contactForm) {
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const messageEl = document.getElementById('message');
    const consentEl = document.getElementById('consent');
    const inquiryEl = document.getElementById('inquiry');

    function validateField(input, type) {
      const field = input.closest('.field');
      const error = field.querySelector('.error-text') || document.createElement('div');
      error.className = 'error-text';
      let valid = true;
      let msg = '';
      if (!input.value.trim()) { valid = false; msg = 'Required'; }
      if (valid && type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) { valid = false; msg = 'Enter a valid email'; }
      field.classList.toggle('invalid', !valid);
      if (!error.parentNode) field.appendChild(error);
      error.textContent = valid ? '' : msg;
      return valid;
    }

    [nameEl, emailEl, messageEl, inquiryEl, consentEl].forEach((el) => {
      if (!el) return;
      const type = el.type || el.tagName.toLowerCase();
      el.addEventListener('blur', () => validateField(el, type));
      el.addEventListener('input', () => validateField(el, type));
      if (type === 'checkbox' || type === 'select-one') el.addEventListener('change', () => validateField(el, type));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok =
        validateField(nameEl, 'text') &
        validateField(emailEl, 'email') &
        validateField(messageEl, 'text') &
        validateField(inquiryEl, 'select-one') &
        validateField(consentEl, 'checkbox');
      if (!ok) return;
      showToast('Thanks! We’ll be in touch.');
      contactForm.reset();
      // clear errors
      contactForm.querySelectorAll('.field').forEach((f) => f.classList.remove('invalid'));
      contactForm.querySelectorAll('.error-text').forEach((n) => (n.textContent = ''));
    });
  }

  // Sticky header shadow
  const header = document.querySelector('header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top button
  const toTop = document.querySelector('.to-top');
  function onScrollToTop() {
    if (!toTop) return;
    toTop.classList.toggle('show', window.scrollY > 450);
  }
  window.addEventListener('scroll', onScrollToTop, { passive: true });
  onScrollToTop();

  // Tour modal open/close and validation
  const tourModal = document.getElementById('tourModal');
  const openTourModalBtn = document.getElementById('openTourModal');
  const tourForm = document.getElementById('tourForm');
  function openModal() {
    if (!tourModal) return;
    tourModal.classList.add('show');
    tourModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!tourModal) return;
    tourModal.classList.remove('show');
    tourModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (openTourModalBtn) openTourModalBtn.addEventListener('click', openModal);
  if (tourModal) {
    tourModal.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeModal));
  }
  if (tourForm) {
    const tName = document.getElementById('tourName');
    const tEmail = document.getElementById('tourEmail');
    const tResidents = document.getElementById('tourResidents');
    const tDate = document.getElementById('tourDate');
    const tTime = document.getElementById('tourTime');
    const tConsent = document.getElementById('tourConsent');

    function validateField(input, type) {
      const field = input.closest('.field') || input.closest('.consent-field');
      const error = field.querySelector('.error-text') || document.createElement('div');
      error.className = 'error-text';
      let valid = true; let msg = '';
      const value = (input.value || '').toString().trim();
      if ((type === 'text' || type === 'date' || type === 'time' || type === 'select-one') && !value) { valid = false; msg = 'Required'; }
      if (type === 'email') { valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); msg = valid ? '' : 'Enter a valid email'; }
      if (type === 'checkbox') { valid = input.checked; msg = valid ? '' : 'Required'; }
      field.classList.toggle('invalid', !valid);
      if (!error.parentNode) field.appendChild(error);
      error.textContent = valid ? '' : msg;
      return valid;
    }

    [tName, tEmail, tResidents, tDate, tTime, tConsent].forEach((el) => {
      const type = el.type || el.tagName.toLowerCase();
      el.addEventListener('blur', () => validateField(el, type));
      el.addEventListener('input', () => validateField(el, type));
      if (type === 'checkbox' || type === 'select-one') el.addEventListener('change', () => validateField(el, type));
    });

    tourForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = [
        validateField(tName, 'text'),
        validateField(tEmail, 'email'),
        validateField(tResidents, 'select-one'),
        validateField(tDate, 'date'),
        validateField(tTime, 'time'),
        validateField(tConsent, 'checkbox'),
      ].every(Boolean);
      if (!ok) return;
      showToast('Tour request sent! We’ll contact you shortly.');
      tourForm.reset();
      tourForm.querySelectorAll('.field, .consent-field').forEach((f) => f.classList.remove('invalid'));
      tourForm.querySelectorAll('.error-text').forEach((n) => (n.textContent = ''));
      closeModal();
    });
  }
  // Remove stat counters for new business

  // Scroll reveal animations
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (window.IntersectionObserver && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // stagger children if present
          const stagger = entry.target.querySelectorAll('.stagger-item');
          stagger.forEach((el, i) => {
            setTimeout(() => el.classList.add('in'), i * 80);
          });
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Interactive card tilt
  const tiltCards = Array.from(document.querySelectorAll('.card'));
  tiltCards.forEach((card) => {
    card.setAttribute('data-tilt', 'true');
    let rect;
    function updateRect() { rect = card.getBoundingClientRect(); }
    updateRect();
    window.addEventListener('resize', updateRect);
    card.addEventListener('mousemove', (e) => {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (y * -12).toFixed(2);
      const rotateY = (x * 12).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  });
})();


