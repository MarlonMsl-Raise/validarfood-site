/* =========================================
   Validar Food — script.js V8
   ========================================= */

(function () {
  'use strict';

  const CONFIG = {
    whatsappNumber: '552126516226',
    whatsappDisplay: '(21) 2651-6226',
    email: 'validarfood@gmail.com',
    defaultMessage: 'Olá! Gostaria de saber mais sobre a Validar Food.',
    planMessages: {
      Start:   'Olá! Tenho interesse no módulo Start (R$ 249,90/mês). Pode me enviar uma proposta?',
      Control: 'Olá! Tenho interesse no módulo Control (R$ 299,90/mês). Pode me enviar uma proposta?',
      Pro:     'Olá! Tenho interesse no módulo Pro (R$ 349,90/mês). Pode me enviar uma proposta?'
    }
  };

  const buildWaUrl = (msg) =>
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  /* -----------------------------------------
     Atualiza links genéricos do WhatsApp e ano do rodapé
     ----------------------------------------- */
  function setupWhatsAndYear() {
    const url = buildWaUrl(CONFIG.defaultMessage);

    document.querySelectorAll('a[href*="wa.me"]').forEach((el) => {
      // Não sobrescreve links que já têm uma mensagem específica de plano
      if (!el.dataset.plan) el.href = url;
    });

    const y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* -----------------------------------------
     Botões de planos — manda o nome do módulo na mensagem
     ----------------------------------------- */
  function setupPlanButtons() {
    document.querySelectorAll('[data-plan]').forEach((btn) => {
      const plan = btn.getAttribute('data-plan');
      const msg = CONFIG.planMessages[plan] || CONFIG.defaultMessage;

      // Se for âncora pra #contato, ao clicar abre WhatsApp já com a mensagem
      btn.addEventListener('click', (e) => {
        // Se Ctrl/Cmd/Shift, deixa o navegador lidar (nova aba etc.)
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;

        e.preventDefault();
        window.open(buildWaUrl(msg), '_blank', 'noopener');
      });
    });
  }

  /* -----------------------------------------
     Menu mobile (hambúrguer)
     ----------------------------------------- */
  function setupMobileMenu() {
    const hamb = document.getElementById('hamb');
    const mobile = document.getElementById('mobileNav');
    if (!hamb || !mobile) return;

    const iconHamb = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    const iconClose = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    const close = () => {
      mobile.classList.remove('active');
      hamb.setAttribute('aria-expanded', 'false');
      hamb.innerHTML = iconHamb;
      document.body.style.overflow = '';
    };

    hamb.addEventListener('click', () => {
      const isOpen = mobile.classList.toggle('active');
      hamb.setAttribute('aria-expanded', String(isOpen));
      hamb.innerHTML = isOpen ? iconClose : iconHamb;
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

    // Fecha se redimensionar pra desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) close();
    });
  }

  /* -----------------------------------------
     Etiqueta interativa (hotspots ↔ texto)
     ----------------------------------------- */
  function setupLabelInteraction() {
    const hotspots = document.querySelectorAll('.hotspot');
    const infoItems = document.querySelectorAll('.info-item');
    if (!hotspots.length || !infoItems.length) return;

    const activate = (id) => {
      hotspots.forEach((el) => el.classList.toggle('active', el.dataset.target === id));
      infoItems.forEach((el) => el.classList.toggle('active', el.id === id));
    };

    const clear = () => {
      hotspots.forEach((el) => el.classList.remove('active'));
      infoItems.forEach((el) => el.classList.remove('active'));
    };

    hotspots.forEach((spot) => {
      spot.addEventListener('mouseenter', () => activate(spot.dataset.target));
      spot.addEventListener('mouseleave', clear);
      // Touch / mobile: tap pra ativar
      spot.addEventListener('click', () => activate(spot.dataset.target));
    });

    infoItems.forEach((item) => {
      item.addEventListener('mouseenter', () => activate(item.id));
      item.addEventListener('mouseleave', clear);
    });
  }

  /* -----------------------------------------
     FAQ — fecha os outros quando abre um (acordeão exclusivo)
     ----------------------------------------- */
  function setupFaq() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          items.forEach((other) => {
            if (other !== item) other.open = false;
          });
        }
      });
    });
  }

  /* -----------------------------------------
     Header: muda o estilo no scroll
     ----------------------------------------- */
  function setupHeaderScroll() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;

    const onScroll = () => {
      if (window.scrollY > 8) {
        topbar.style.boxShadow = '0 1px 3px rgba(28, 25, 23, 0.08)';
      } else {
        topbar.style.boxShadow = 'none';
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -----------------------------------------
     Reveal on scroll — sutil
     ----------------------------------------- */
  function setupReveal() {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('.step-card, .module-card, .card, .faq-item');

    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => io.observe(el));
  }

  /* -----------------------------------------
     Init
     ----------------------------------------- */
  function init() {
    setupWhatsAndYear();
    setupPlanButtons();
    setupMobileMenu();
    setupLabelInteraction();
    setupFaq();
    setupHeaderScroll();
    setupReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
