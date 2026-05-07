/**
 * Global Dreamers - Premium Animations
 * Sistema de animaciones tipo Webflow
 */

// ========================================
// 1. INTERSECTION OBSERVER (Animaciones de Scroll)
// ========================================

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Animar contadores si es necesario
        const counters = entry.target.querySelectorAll('.counter-value');
        counters.forEach(counter => animateCounter(counter));
        
        // Una sola vez (no re-animar al volver a scroll)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos con clases de animación
  const animatedElements = document.querySelectorAll([
    '.animate-fade-up',
    '.animate-scale-in',
    '.animate-slide-left',
    '.animate-slide-right',
    '.image-reveal'
  ].join(', '));

  animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// 2. ANIMACIÓN DE CONTADORES
// ========================================

function animateCounter(element) {
  const target = parseInt(element.dataset.value) || parseInt(element.textContent);
  const duration = 2000; // 2 segundos
  const start = 0;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing ease-out
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);
    
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(updateCounter);
}

// ========================================
// 3. GSAP ANIMATIONS (Si está disponible)
// ========================================

function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.log('GSAP no disponible, usando Intersection Observer');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Stagger grids
  gsap.utils.toArray('.gsap-stagger').forEach(container => {
    const children = container.children;
    gsap.fromTo(children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%'
        }
      }
    );
  });

  // Parallax elements
  gsap.utils.toArray('.gsap-parallax').forEach(elem => {
    gsap.to(elem, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: elem,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  console.log('✅ GSAP animations initialized');
}

// ========================================
// 4. NAVBAR SCROLL BEHAVIOR
// ========================================

function initNavbarScroll() {
  const navbar = document.querySelector('header');
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.classList.add('navbar-hidden');
      navbar.classList.remove('navbar-visible');
    } else {
      navbar.classList.remove('navbar-hidden');
      navbar.classList.add('navbar-visible');
    }

    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
}

// ========================================
// 5. TILT EFFECT (Cards 3D)
// ========================================

function initTiltEffect() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach(card => {
    const container = card.closest('.perspective-1000') || card.parentElement;
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// ========================================
// 6. MAGNETIC BUTTONS
// ========================================

function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-button');
  
  // Solo en dispositivos no-táctiles
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ========================================
// 7. SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// 8. HERO ANIMATIONS (On Load)
// ========================================

function initHeroAnimations() {
  const heroTitle = document.querySelector('.hero-title-animate');
  const heroSubtitle = document.querySelector('.hero-subtitle-animate');
  const heroCta = document.querySelector('.hero-cta-animate');
  
  if (!heroTitle) return;

  // Stagger animation para elementos del hero
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 100);
  }
  
  if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    }, 300);
  }
  
  if (heroCta) {
    heroCta.style.opacity = '0';
    heroCta.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroCta.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroCta.style.opacity = '1';
      heroCta.style.transform = 'translateY(0)';
    }, 500);
  }
}

// ========================================
// 9. DROPDOWN ANIMATIONS
// ========================================

function initDropdownAnimations() {
  const dropdowns = document.querySelectorAll('.group');
  
  dropdowns.forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown-animate, [class*="dropdown"]');
    if (!menu) return;
    
    dropdown.addEventListener('mouseenter', () => {
      menu.classList.add('is-open');
    });
    
    dropdown.addEventListener('mouseleave', () => {
      menu.classList.remove('is-open');
    });
  });
}

// ========================================
// 10. LAZY LOAD IMAGES
// ========================================

function initLazyImages() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// 11. REVEAL ON SCROLL (Helper)
// ========================================

function initRevealOnScroll() {
  // Elementos que se revelan progresivamente
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  reveals.forEach(el => revealObserver.observe(el));
}

// ========================================
// INITIALIZE ALL
// ========================================

function initAnimations() {
  // Verificar reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Reduced motion preferred, skipping animations');
    return;
  }

  // Inicializar todo
  initScrollAnimations();
  initNavbarScroll();
  initTiltEffect();
  initMagneticButtons();
  initSmoothScroll();
  initHeroAnimations();
  initDropdownAnimations();
  initLazyImages();
  initRevealOnScroll();
  
  // GSAP si está disponible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAPAnimations);
  } else {
    initGSAPAnimations();
  }

  console.log('✨ Global Dreamers animations initialized');
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

// Export for manual use
window.GlobalDreamersAnimations = {
  init: initAnimations,
  animateCounter
};
