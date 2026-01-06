class ThemeSwitcher {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.themeIcon = document.getElementById("theme-icon");
    this.currentTheme = localStorage.getItem("theme") || "light";

    this.init();
  }

  init() {
    // Aplicar tema guardado
    this.applyTheme(this.currentTheme);

    // Event listener para el botón (solo si existe)
    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
    }

    this.watchSystemPreference();
  }

  applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      if (this.themeIcon) {
        this.themeIcon.classList.remove("fa-moon");
        this.themeIcon.classList.add("fa-sun");
      }
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      if (this.themeIcon) {
        this.themeIcon.classList.remove("fa-sun");
        this.themeIcon.classList.add("fa-moon");
      }
      localStorage.setItem("theme", "light");
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(this.currentTheme);

    // Animación del icono
    this.themeToggle.classList.add("scale-90");
    setTimeout(() => {
      this.themeToggle.classList.remove("scale-90");
    }, 150);
  }

  watchSystemPreference() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Solo aplicar si no hay tema guardado
    if (!localStorage.getItem("theme")) {
      mediaQuery.addEventListener("change", (e) => {
        this.currentTheme = e.matches ? "dark" : "light";
        this.applyTheme(this.currentTheme);
      });
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new ThemeSwitcher();
});
