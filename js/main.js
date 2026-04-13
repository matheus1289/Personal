/** main.js - JavaScript principal do projeto */
function initAOS() {
  if (!window.AOS) return;

  window.AOS.init({
    once: true,
    duration: 700,
    easing: 'ease-out-cubic'
  });
}

/**
 * Animação de Reveal ao scroll
 * Elementos com classe .reveal ganham animação ao entrar na viewport
 */
function initReveals() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), parseInt(e.target.dataset.d) || 0);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.d = (i % 4) * 100;
    obs.observe(el);
  });
}

/**
 * Highlight de navegação ativa
 * Marca o link nav como ativo de acordo com seção visualizada
 */
function initNavHighlight() {
  const secs = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-links a');
  
  window.addEventListener('scroll', () => {
    let cur = '';
    
    secs.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) cur = s.id;
    });

    navLinks.forEach(a => {
      if (a.closest('.nav-mobile-links')) {
        a.style.color = a.getAttribute('href') === '#' + cur ? '#FFFFFF' : '';
        return;
      }

      a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--blue)' : '';
    });
  });
}

/**
 * Comportamento da navbar
 * - Alterna estado visual no scroll
 * - Controla abertura/fechamento do menu mobile
 */
function initNavbar() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  const mobileLinks = document.querySelectorAll('.nav-mobile-links a, .nav-cta-mobile');

  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };

  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    }
  };

  const openMenu = () => {
    document.body.classList.add('menu-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll);

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('menu-open');
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/**
 * Botão de scroll ao topo
 */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Inicializa o site
 */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initReveals();
  initNavbar();
  initNavHighlight();
  initScrollTop();
});
