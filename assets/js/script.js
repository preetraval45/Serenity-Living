
// Serenity Living - Enhanced JavaScript with Error Fixes
(function () {
  'use strict';

  // Utility functions
  const utils = {
    // Safe DOM element selection
    querySelector: (selector) => document.querySelector(selector),
    querySelectorAll: (selector) => document.querySelectorAll(selector),
    
    // Safe string conversion
    safeString: (value) => {
      if (value === null || value === undefined) return '';
      return String(value);
    },
    
    // Debounce function for performance
    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };

  // DOM elements cache
  const elements = {
    navToggle: utils.querySelector('.nav-toggle'),
    navLinks: utils.querySelector('.nav-links'),
    contactForm: utils.querySelector('#contactForm'),
    heroCanvas: utils.querySelector('#heroCanvas'),
    confettiCanvas: utils.querySelector('#confettiCanvas'),
    toast: utils.querySelector('#toast'),
    header: utils.querySelector('header'),
    toTop: utils.querySelector('.to-top'),
    tourModal: utils.querySelector('#tourModal'),
    openTourModalBtn: utils.querySelector('#openTourModal'),
    tourForm: utils.querySelector('#tourForm'),
    lightbox: utils.querySelector('#lightbox'),
    lightboxImg: utils.querySelector('#lightbox-img'),
    lightboxClose: utils.querySelector('.lightbox-close'),
    chatbot: utils.querySelector('#chatbot'),
    chatbotToggle: utils.querySelector('#chatbot-toggle'),
    chatbotMinimize: utils.querySelector('.chatbot-minimize'),
    chatbotInput: utils.querySelector('#chatbot-input'),
    chatbotSend: utils.querySelector('#chatbot-send'),
    chatbotMessages: utils.querySelector('#chatbot-messages'),
    chatbotNotification: utils.querySelector('#chatbot-notification'),
    newsletterForm: utils.querySelector('.newsletter-form'),
    newsletterInput: utils.querySelector('.newsletter-input'),
    newsletterBtn: utils.querySelector('.newsletter-btn')
  };

  // Initialize year display
  function initializeYear() {
    const yearEl = utils.querySelector('#year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // Navigation functionality
  function initializeNavigation() {
    if (!elements.navToggle || !elements.navLinks) return;

    elements.navToggle.addEventListener('click', () => {
      const isOpen = elements.navLinks.classList.toggle('open');
      elements.navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    const navLinksArray = elements.navLinks.querySelectorAll('a');
    navLinksArray.forEach((link) => {
      link.addEventListener('click', () => {
        elements.navLinks.classList.remove('open');
        elements.navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active navigation highlighting
  function initializeActiveNavigation() {
    const sections = Array.from(utils.querySelectorAll('main section[id]'));
    const menuLinks = Array.from(elements.navLinks?.querySelectorAll('a[href^="#"]') || []);
    
    if (!sections.length || !menuLinks.length) return;

    function setActive(hash) {
      menuLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === hash));
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive('#' + entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach((s) => observer.observe(s));
  }

  // Contact form handling
  function initializeContactForm() {
    if (!elements.contactForm) return;

    elements.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(elements.contactForm);
      const name = utils.safeString(formData.get('name')) || 'friend';
      showToast(`Thank you, ${name}! We will be in touch soon.`);
      elements.contactForm.reset();
    });
  }

  // Canvas animations - simplified and optimized
  function initializeHeroCanvas() {
    if (!elements.heroCanvas?.getContext) return;

    const ctx = elements.heroCanvas.getContext('2d');
    let width, height, particles;

    function initCanvas() {
      width = elements.heroCanvas.width = elements.heroCanvas.offsetWidth;
      height = elements.heroCanvas.height = elements.heroCanvas.offsetHeight;
      const particleCount = Math.min(120, Math.floor((width * height) / 12000));
      
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: 0.6 + Math.random() * 1.8,
        depth: Math.random(),
        hue: 200 + Math.random() * 50,
      }));
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        // Update position
        p.x += p.vx * (1 + p.depth);
        p.y += p.vy * (1 + p.depth);
        
        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        
        // Draw particle
        const alpha = 0.35 + p.depth * 0.35;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 40%, ${alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 60%, 0.35)`;
        ctx.shadowBlur = 8 + p.depth * 12;
        ctx.arc(p.x, p.y, p.size + p.depth * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      requestAnimationFrame(animate);
    }

    const resizeHandler = utils.debounce(initCanvas, 250);
    window.addEventListener('resize', resizeHandler);
    
    initCanvas();
    animate();
  }

  // Confetti animation
  function launchConfetti() {
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      pointerEvents: 'none',
      zIndex: '10'
    });
    
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();

    const pieces = Array.from({ length: 160 }, () => {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: canvas.width / 2,
        y: canvas.height / 3,
        vx: Math.cos(angle) * (2 + Math.random() * 4),
        vy: Math.sin(angle) * (2 + Math.random() * 4) - 6,
        size: 5 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
        color: `hsl(${200 + Math.random() * 40} 85% ${60 + Math.random() * 25}%)`,
        life: 300,
      };
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      pieces.forEach(p => {
        p.life -= 1;
        if (p.life <= 0) return;
        
        p.vy += 0.04 * 0.8;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      
      if (pieces.some(p => p.life > 0 && p.y < canvas.height + 50)) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    
    animate();
  }

  // Confetti overlay for hero section
  function initializeConfettiCanvas() {
    if (!elements.confettiCanvas?.getContext) return;

    const heroSection = utils.querySelector('.hero');
    if (!heroSection) return;

    const ctx = elements.confettiCanvas.getContext('2d');
    let width, height, pieces;

    function inView() {
      const rect = heroSection.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function resize() {
      width = elements.confettiCanvas.width = elements.confettiCanvas.offsetWidth;
      height = elements.confettiCanvas.height = elements.confettiCanvas.offsetHeight;
      pieces = Array.from({ length: 160 }, () => createPiece());
    }

    function createPiece() {
      return {
        x: Math.random() * width,
        y: Math.random() * -height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 1.2 + Math.random() * 1.8,
        size: 4 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.12,
        color: `hsl(${200 + Math.random() * 60} 85% ${60 + Math.random() * 25}%)`,
        shape: Math.random() < 0.5 ? 'rect' : 'circle',
      };
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      pieces.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        
        if (p.y > height + 20) {
          pieces[idx] = createPiece();
          pieces[idx].y = -10;
          pieces[idx].x = Math.random() * width;
          return;
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
      });
      
      requestAnimationFrame(animate);
    }

    const resizeHandler = utils.debounce(resize, 250);
    window.addEventListener('resize', resizeHandler);
    resize();

    function loop() {
      if (inView()) {
        animate();
      } else {
        ctx.clearRect(0, 0, width, height);
        requestAnimationFrame(loop);
      }
    }
    loop();
  }

  // Toast notification system
  function showToast(message) {
    if (!elements.toast) return;
    
    elements.toast.textContent = message;
    elements.toast.setAttribute('aria-hidden', 'false');
    elements.toast.classList.add('show');
    
    setTimeout(() => {
      elements.toast.classList.remove('show');
      elements.toast.setAttribute('aria-hidden', 'true');
    }, 2600);
  }

  // Form validation helper
  function validateField(input, type) {
    const field = input.closest('.field') || input.closest('.consent-field');
    if (!field) return false;
    
    let error = field.querySelector('.error-text');
    if (!error) {
      error = document.createElement('div');
      error.className = 'error-text';
      field.appendChild(error);
    }
    
    const value = utils.safeString(input.value).trim();
    let isValid = true;
    let message = '';
    
    // Validation logic
    if (['text', 'date', 'time', 'select-one'].includes(type) && !value) {
      isValid = false;
      message = 'Required';
    } else if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      message = isValid ? '' : 'Enter a valid email';
    } else if (type === 'checkbox') {
      isValid = input.checked;
      message = isValid ? '' : 'Required';
    }
    
    field.classList.toggle('invalid', !isValid);
    error.textContent = isValid ? '' : message;
    
    return isValid;
  }

  // Contact form validation
  function initializeContactFormValidation() {
    if (!elements.contactForm) return;

    const fields = [
      { element: utils.querySelector('#name'), type: 'text' },
      { element: utils.querySelector('#email'), type: 'email' },
      { element: utils.querySelector('#message'), type: 'text' },
      { element: utils.querySelector('#inquiry'), type: 'select-one' },
      { element: utils.querySelector('#consent'), type: 'checkbox' }
    ].filter(field => field.element);

    // Add event listeners
    fields.forEach(({ element, type }) => {
      const events = ['blur', 'input'];
      if (['checkbox', 'select-one'].includes(type)) {
        events.push('change');
      }
      
      events.forEach(eventType => {
        element.addEventListener(eventType, () => validateField(element, type));
      });
    });

    // Form submission
    elements.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const validationResults = fields.map(({ element, type }) => validateField(element, type));
      const allValid = validationResults.every(Boolean);
      
      if (allValid) {
        showToast('Thanks! We'll be in touch.');
        elements.contactForm.reset();
        clearFormErrors(elements.contactForm);
      }
    });
  }

  // Clear form validation errors
  function clearFormErrors(form) {
    const fields = form.querySelectorAll('.field, .consent-field');
    fields.forEach(field => field.classList.remove('invalid'));
    
    const errors = form.querySelectorAll('.error-text');
    errors.forEach(error => error.textContent = '');
  }

  // Scroll effects
  function initializeScrollEffects() {
    const scrollHandler = utils.debounce(() => {
      const scrollY = window.scrollY;
      
      // Header scroll effect
      if (elements.header) {
        elements.header.classList.toggle('is-scrolled', scrollY > 8);
      }
      
      // Back to top button
      if (elements.toTop) {
        elements.toTop.classList.toggle('show', scrollY > 450);
      }
    }, 10);
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler(); // Initial call
  }

  // Modal functionality
  function initializeModals() {
    if (!elements.tourModal) return;

    function openModal() {
      elements.tourModal.classList.add('show');
      elements.tourModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      elements.tourModal.classList.remove('show');
      elements.tourModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Open modal button
    elements.openTourModalBtn?.addEventListener('click', openModal);

    // Close modal buttons
    const closeButtons = elements.tourModal.querySelectorAll('[data-close-modal]');
    closeButtons.forEach(button => button.addEventListener('click', closeModal));

    // Tour form validation
    if (elements.tourForm) {
      initializeTourFormValidation(closeModal);
    }
  }

  // Tour form validation
  function initializeTourFormValidation(closeModal) {
    const fields = [
      { element: utils.querySelector('#tourName'), type: 'text' },
      { element: utils.querySelector('#tourEmail'), type: 'email' },
      { element: utils.querySelector('#tourResidents'), type: 'select-one' },
      { element: utils.querySelector('#tourDate'), type: 'date' },
      { element: utils.querySelector('#tourTime'), type: 'time' },
      { element: utils.querySelector('#tourConsent'), type: 'checkbox' }
    ].filter(field => field.element);

    // Add validation event listeners
    fields.forEach(({ element, type }) => {
      const events = ['blur', 'input'];
      if (['checkbox', 'select-one'].includes(type)) {
        events.push('change');
      }
      
      events.forEach(eventType => {
        element.addEventListener(eventType, () => validateField(element, type));
      });
    });

    // Form submission
    elements.tourForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const validationResults = fields.map(({ element, type }) => validateField(element, type));
      const allValid = validationResults.every(Boolean);
      
      if (allValid) {
        showToast('Tour request sent! We'll contact you shortly.'),
        elements.tourForm.reset(),
        clearFormErrors(elements.tourForm);
        closeModal();
      }
    });
  }

  // Scroll reveal animations
  function initializeScrollReveal() {
    const reveals = Array.from(utils.querySelectorAll('.reveal'));
    
    if (!window.IntersectionObserver || !reveals.length) {
      reveals.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Stagger children if present
          const staggerItems = entry.target.querySelectorAll('.stagger-item');
          staggerItems.forEach((el, i) => {
            setTimeout(() => el.classList.add('in'), i * 80);
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  }

  // Interactive card tilt effects
  function initializeCardTilt() {
    const tiltCards = Array.from(utils.querySelectorAll('.card'));
    
    tiltCards.forEach((card) => {
      card.setAttribute('data-tilt', 'true');
      let rect;
      
      const updateRect = () => {
        rect = card.getBoundingClientRect();
      };
      
      updateRect();
      window.addEventListener('resize', utils.debounce(updateRect, 250));
      
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
  }

  // Lightbox functionality
  function initializeLightbox() {
    const galleryImages = utils.querySelectorAll('.gallery-item img');
    
    if (!elements.lightbox || !elements.lightboxImg || !galleryImages.length) return;

    function closeLightbox() {
      elements.lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Image click handlers
    galleryImages.forEach((img) => {
      img.addEventListener('click', () => {
        elements.lightboxImg.src = img.src;
        elements.lightboxImg.alt = img.alt;
        elements.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close button
    elements.lightboxClose?.addEventListener('click', closeLightbox);

    // Click outside to close
    elements.lightbox.addEventListener('click', (e) => {
      if (e.target === elements.lightbox) closeLightbox();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // Parallax effects
  function initializeParallax() {
    const parallaxElements = utils.querySelectorAll('.parallax-bg');
    const gallerySection = utils.querySelector('#gallery');
    
    if (!parallaxElements.length || !gallerySection) return;

    const updateParallax = utils.debounce(() => {
      const scrollY = window.scrollY;
      const galleryRect = gallerySection.getBoundingClientRect();
      const galleryTop = gallerySection.offsetTop;
      const galleryHeight = gallerySection.offsetHeight;
      
      // Only apply parallax when gallery is in view
      if (galleryRect.bottom >= 0 && galleryRect.top <= window.innerHeight) {
        const progress = (scrollY - galleryTop) / galleryHeight;
        
        parallaxElements.forEach((element, index) => {
          const speed = (index + 1) * 0.5;
          const yPos = progress * speed * 100;
          element.style.transform = `translateY(${yPos}px) translateZ(0)`;
        });
      }
    }, 10);

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  // Chatbot functionality
  let isChatbotOpen = false;

  const botResponses = {
    'tell me about your services': 'We offer comprehensive services including Assisted Living, Skilled Nursing, Memory Care, Respite Care, Rehabilitation & Therapy, and Dining & Nutrition. Each service is tailored to meet individual resident needs with compassionate, professional care.',
    'how do i schedule a tour': 'You can schedule a tour by clicking the "Schedule Tour" button above, calling us at (855) 555-1234, or filling out our contact form. We offer tours daily from 10:00 AM to 7:00 PM.',
    'what are your visiting hours': 'Our visiting hours are 10:00 AM to 7:00 PM daily. We welcome family and friends to visit anytime during these hours. For special circumstances, please call us at (855) 555-1234.',
    'how much does care cost': 'Our pricing varies based on the level of care needed and specific services required. We offer personalized care plans to ensure you only pay for what you need. Please contact us at (855) 555-1234 for detailed pricing information.',
    'default': 'Thank you for your question! For specific information about our services, pricing, or to schedule a visit, please call us at (855) 555-1234 or email serenitylivingoflexington@gmail.com.'
  };

  function initializeChatbot() {
    if (!elements.chatbot) return;

    function toggleChatbot() {
      isChatbotOpen = !isChatbotOpen;
      elements.chatbot.classList.toggle('active', isChatbotOpen);
      elements.chatbot.setAttribute('aria-hidden', !isChatbotOpen);
      
      if (isChatbotOpen) {
        elements.chatbotInput?.focus();
        elements.chatbotNotification?.classList.add('hidden');
      }
    }

    function addMessage(content, isUser = false) {
      if (!elements.chatbotMessages) return;
      
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
      
      messageDiv.innerHTML = `
        <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
        <div class="message-content">
          <p>${content}</p>
        </div>
      `;
      
      elements.chatbotMessages.appendChild(messageDiv);
      elements.chatbotMessages.scrollTop = elements.chatbotMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
      const lowerMessage = userMessage.toLowerCase().trim();
      
      for (const key in botResponses) {
        if (key !== 'default' && lowerMessage.includes(key)) {
          return botResponses[key];
        }
      }
      
      return botResponses.default;
    }

    function sendMessage() {
      if (!elements.chatbotInput) return;
      
      const message = elements.chatbotInput.value.trim();
      if (!message) return;
      
      addMessage(message, true);
      elements.chatbotInput.value = '';
      
      setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response);
      }, 500 + Math.random() * 1000);
    }

    // Event listeners
    elements.chatbotToggle?.addEventListener('click', toggleChatbot);
    elements.chatbotMinimize?.addEventListener('click', toggleChatbot);
    elements.chatbotSend?.addEventListener('click', sendMessage);
    
    elements.chatbotInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    // Quick action buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-action')) {
        const message = e.target.getAttribute('data-message');
        if (message) {
          addMessage(message, true);
          setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response);
          }, 500);
        }
      }
    });

    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
      if (isChatbotOpen && 
          !elements.chatbot.contains(e.target) && 
          !elements.chatbotToggle?.contains(e.target)) {
        toggleChatbot();
      }
    });

    // Escape key to close chatbot
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isChatbotOpen) {
        toggleChatbot();
      }
    });
  }

  // Newsletter functionality
  function initializeNewsletter() {
    if (!elements.newsletterForm || !elements.newsletterInput || !elements.newsletterBtn) return;

    function handleNewsletterSubmit(e) {
      e.preventDefault();
      const email = elements.newsletterInput.value.trim();
      
      if (!email) {
        showToast('Please enter your email address');
        elements.newsletterInput.focus();
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address');
        elements.newsletterInput.focus();
        return;
      }
      
      // Simulate newsletter signup
      elements.newsletterBtn.classList.add('loading');
      elements.newsletterBtn.textContent = 'Subscribing...';
      
      setTimeout(() => {
        showToast('🎉 Thank you for subscribing to our newsletter!');
        elements.newsletterInput.value = '';
        elements.newsletterBtn.classList.remove('loading');
        elements.newsletterBtn.textContent = 'Subscribe';
      }, 1500);
    }

    elements.newsletterBtn.addEventListener('click', handleNewsletterSubmit);
    elements.newsletterInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleNewsletterSubmit(e);
    });
  }

  // Enhanced interaction effects
  function initializeInteractionEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Enhanced button loading states
    const buttons = utils.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        if (!this.classList.contains('no-loading')) {
          const originalText = this.textContent;
          this.style.pointerEvents = 'none';
          this.textContent = 'Loading...';
          
          setTimeout(() => {
            this.textContent = originalText;
            this.style.pointerEvents = 'auto';
          }, 800);
        }
      });
    });

    // Map embed loading state
    const mapEmbed = utils.querySelector('.map-embed iframe');
    if (mapEmbed) {
      mapEmbed.style.opacity = '0.7';
      mapEmbed.addEventListener('load', () => {
        mapEmbed.style.opacity = '1';
        mapEmbed.style.transition = 'opacity 0.5s ease';
      });
    }

    // Emergency link confirmation
    const emergencyLink = utils.querySelector('.emergency-link');
    if (emergencyLink) {
      emergencyLink.addEventListener('click', (e) => {
        if (!confirm('You are about to call our 24/7 emergency line. Continue?')) {
          e.preventDefault();
        }
      });
    }
  }

  // Page load animations
  function initializePageAnimations() {
    // Set initial state for page load animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    // Fade in on load
    window.addEventListener('load', () => {
      document.body.style.opacity = '1';
      document.body.style.transform = 'translateY(0)';
      
      // Launch confetti after page load
      setTimeout(launchConfetti, 600);
    });
  }

  // Initialize all functionality
  function init() {
    // Core functionality
    initializeYear();
    initializeNavigation();
    initializeActiveNavigation();
    initializeContactForm();
    initializeContactFormValidation();
    
    // Visual effects
    initializeHeroCanvas();
    initializeConfettiCanvas();
    initializeScrollEffects();
    initializeScrollReveal();
    initializeCardTilt();
    initializeLightbox();
    initializeParallax();
    
    // Interactive components
    initializeModals();
    initializeChatbot();
    initializeNewsletter();
    initializeInteractionEffects();
    initializePageAnimations();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global scope exposure for debugging
  window.SerenityLiving = {
    showToast,
    launchConfetti,
    utils
  };

})();