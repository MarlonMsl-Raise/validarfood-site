(function () {
  const CONFIG = {
    whatsappNumberE164: "552126516226", 
    whatsappDisplay: "(21) 2651-6226",
    email: "validarfood@gmail.com",
    whatsappMessage: "Olá! Gostaria de saber mais sobre a Validar Food."
  };

  // Atualiza links automaticamente
  function setWhatsLinks() {
    const msg = encodeURIComponent(CONFIG.whatsappMessage);
    const url = `https://wa.me/${CONFIG.whatsappNumberE164}?text=${msg}`;
    
    // Pega todos os links que devem ir pro Whats
    const links = document.querySelectorAll('a[href*="wa.me"]');
    links.forEach(el => {
      el.href = url;
    });

    // Ano do rodapé
    const y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  // Lógica do Menu Mobile
  function setupMobileMenu() {
    const hamb = document.getElementById("hamb");
    const mobile = document.getElementById("mobileNav");
    
    if (!hamb || !mobile) return;

    hamb.addEventListener("click", () => {
      // Toggle da classe 'active'
      const isOpen = mobile.classList.toggle("active");
      
      // Ajusta acessibilidade e ícone
      hamb.setAttribute("aria-expanded", String(isOpen));
      
      // Troca ícone (Hambúrguer <-> X)
      if (isOpen) {
        hamb.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        document.body.style.overflow = "hidden"; // Trava rolagem do fundo
      } else {
        hamb.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        document.body.style.overflow = ""; // Destrava rolagem
      }
    });

    // Fecha ao clicar em um link do menu
    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobile.classList.remove("active");
        hamb.setAttribute("aria-expanded", "false");
        hamb.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        document.body.style.overflow = "";
      });
    });
  }

  // --- INTERAÇÃO DA ETIQUETA ---
  function setupLabelInteraction() {
    const hotspots = document.querySelectorAll('.hotspot');
    const infoItems = document.querySelectorAll('.info-item');

    // Função para ativar o par (Hotspot + Texto)
    function activatePair(id) {
      // Remove ativos anteriores
      hotspots.forEach(el => el.classList.remove('active'));
      infoItems.forEach(el => el.classList.remove('active'));

      // Ativa o hotspot correspondente
      const targetHotspot = document.querySelector(`.hotspot[data-target="${id}"]`);
      if (targetHotspot) targetHotspot.classList.add('active');

      // Ativa o item de texto correspondente
      const targetItem = document.getElementById(id);
      if (targetItem) targetItem.classList.add('active');
    }

    // Função para limpar tudo
    function clearAll() {
      hotspots.forEach(el => el.classList.remove('active'));
      infoItems.forEach(el => el.classList.remove('active'));
    }

    // Eventos nos Hotspots (Imagem)
    hotspots.forEach(spot => {
      spot.addEventListener('mouseenter', () => {
        const targetId = spot.getAttribute('data-target');
        activatePair(targetId);
      });
      spot.addEventListener('mouseleave', clearAll);
    });

    // Eventos na Lista (Texto) - Bidirecional
    infoItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        activatePair(item.id);
      });
      item.addEventListener('mouseleave', clearAll);
    });
  }

  // Inicializa tudo
  setWhatsLinks();
  setupMobileMenu();
  setupLabelInteraction();
})();
