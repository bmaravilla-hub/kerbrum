document.addEventListener("DOMContentLoaded", function () {
  // Cargar el idioma guardado o usar español por defecto
  const savedLanguage = localStorage.getItem("language") || "es";
  setLanguage(savedLanguage);

  // Configurar event listeners para los switchers
  setupLanguageSwitchers();
});

function setupLanguageSwitchers() {
  // Switcher de escritorio
  const desktopSwitcher = document.querySelector(".language-switcher");
  if (desktopSwitcher) {
    const toggle = desktopSwitcher.querySelector("#language-toggle");
    const dropdown = desktopSwitcher.querySelector(".language-dropdown");
    const options = desktopSwitcher.querySelectorAll(".language-option");

    toggle.addEventListener("click", function () {
      dropdown.classList.toggle("active");
    });

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        setLanguage(lang);
        dropdown.classList.remove("active");
      });
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener("click", function (e) {
      if (!desktopSwitcher.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  }

  // Switcher móvil
  const mobileSwitcher = document.querySelector(".language-switcher-mobile");
  if (mobileSwitcher) {
    const toggle = mobileSwitcher.querySelector("button");
    const optionsContainer = mobileSwitcher.querySelector(
      ".language-options-mobile"
    );
    const options = mobileSwitcher.querySelectorAll(".language-option");

    toggle.addEventListener("click", function () {
      optionsContainer.classList.toggle("hidden");
    });

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        setLanguage(lang);
        optionsContainer.classList.add("hidden");
      });
    });
  }
}

function setLanguage(language) {
  // Guardar preferencia
  localStorage.setItem("language", language);

  // Actualizar todos los elementos con atributos de idioma
  document.querySelectorAll("[data-es], [data-en]").forEach((element) => {
    if (language === "es") {
      if (element.hasAttribute("data-es")) {
        element.textContent = element.getAttribute("data-es");
      }
      // Actualizar placeholders
      if (element.hasAttribute("data-placeholder-es")) {
        element.setAttribute(
          "placeholder",
          element.getAttribute("data-placeholder-es")
        );
      }
    } else if (language === "en") {
      if (element.hasAttribute("data-en")) {
        element.textContent = element.getAttribute("data-en");
      }
      // Actualizar placeholders
      if (element.hasAttribute("data-placeholder-en")) {
        element.setAttribute(
          "placeholder",
          element.getAttribute("data-placeholder-en")
        );
      }
    }
  });

  // Actualizar etiquetas de los switchers
  document.querySelectorAll(".language-label").forEach((label) => {
    if (language === "es") {
      label.textContent = "ES";
    } else if (language === "en") {
      label.textContent = "EN";
    }
  });

  // Actualizar atributo lang del HTML
  document.documentElement.lang = language;

  console.log(`Idioma cambiado a: ${language}`);
}

// Función para forzar la recarga de traducciones
function reloadTranslations() {
  const savedLanguage = localStorage.getItem("language") || "es";
  setLanguage(savedLanguage);
}

// Hacer la función disponible globalmente
window.reloadTranslations = reloadTranslations;
