(function () {
  const CONFIG = {
    // Ajuste aqui:
    whatsappNumberE164: "55XXXXXXXXXXX", // ex: 5511999999999
    whatsappDisplay: "(11) 99999-9999",
    email: "contato@validarfood.com.br",
    whatsappMessage: "Olá! Quero agendar uma demonstração da Validar Food."
  };

  function buildWhatsUrl() {
    const msg = encodeURIComponent(CONFIG.whatsappMessage);
    return `https://wa.me/${CONFIG.whatsappNumberE164}?text=${msg}`;
  }

  function setWhatsLinks() {
    const url = buildWhatsUrl();
    const ids = ["btnWhatsTop", "btnWhatsHero", "btnWhatsContact", "btnWhatsFloat", "btnWhatsMobile"];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = url;
    });

    const display = document.getElementById("whatsDisplay");
    if (display) display.textContent = CONFIG.whatsappDisplay;

    const emailLink = document.getElementById("emailLink");
    if (emailLink) {
      emailLink.textContent = CONFIG.email;
      emailLink.href = `mailto:${CONFIG.email}`;
    }
  }

  function setupMobileMenu() {
    const hamb = document.getElementById("hamb");
    const mobile = document.getElementById("mobileNav");
    if (!hamb || !mobile) return;

    hamb.addEventListener("click", () => {
      const open = hamb.getAttribute("aria-expanded") === "true";
      hamb.setAttribute("aria-expanded", String(!open));
      mobile.hidden = open;
    });

    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        hamb.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
      });
    });
  }

  function year() {
    const y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  // Form: por padrão não envia para lugar nenhum.
  // Você pode trocar para Formspree/Google Forms depois.
  window.VALIDAR = {
    onFormSubmit: function (event) {
      event.preventDefault();
      const note = document.getElementById("formNote");
      if (note) {
        note.textContent = "Recebido! Agora é só clicar em WhatsApp para falar direto com a gente 🙂";
      }
      return false;
    }
  };

  setWhatsLinks();
  setupMobileMenu();
  year();
})();
