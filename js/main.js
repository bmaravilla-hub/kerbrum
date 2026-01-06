class MainApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupAnimations();
    this.setupIntersectionObserver();
    this.setupPerformanceOptimizations();
    this.setupFormHandlers();
    this.setupAIChat();
    this.setupClientsCarousel();
  }

  setupAnimations() {
    // Inicializar animaciones cuando sean necesarias
    console.log("Animaciones inicializadas");
    
    // Esperar a que GSAP esté listo
    if (typeof gsap !== "undefined") {
      this.setupGSAPAnimations();
    } else {
      this.setupFallbackAnimations();
    }
  }

  setupGSAPAnimations() {
    console.log("🎬 Usando animaciones GSAP");
    // GSAP manejará las animaciones principales
    // Las animaciones específicas están en gsap-animations.js
  }

  setupFallbackAnimations() {
    console.log(" Usando animaciones CSS fallback");
  }

  setupClientsCarousel() {
    const carousels = document.querySelectorAll(".clients-carousel");
    
    if (carousels.length === 0) {
      console.log("No se encontraron carruseles de clientes");
      return;
    }

    carousels.forEach((carousel) => {
      const scrollContent = carousel.querySelector(".animate-scroll-left");
      
      if (!scrollContent) {
        console.log("No se encontró contenido de carrusel");
        return;
      }

      scrollContent.style.animationDuration = "30s";

      // Pausar animación al hover
      carousel.addEventListener("mouseenter", () => {
        scrollContent.style.animationPlayState = "paused";
      });

      carousel.addEventListener("mouseleave", () => {
        scrollContent.style.animationPlayState = "running";
      });

      const items = scrollContent.querySelectorAll('.client-logo');
      if (items.length <= 21) { 
        console.log("Duplicando contenido del carrusel para efecto infinito");
        const originalContent = scrollContent.innerHTML;
        scrollContent.innerHTML += originalContent;
      }
    });
  }

  setupIntersectionObserver() {
    // Observer para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    });

    // Observar elementos que necesitan animación
    document
      .querySelectorAll(".service-card, .blog-card, .contact-item")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
      });
  }

  setupPerformanceOptimizations() {
    // Lazy loading para imágenes
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }

    // Preload critical resources
    this.preloadCriticalResources();
  }

  preloadCriticalResources() {
    // Preload critical CSS and fonts
    const criticalResources = [
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource;
      link.as = "style";
      document.head.appendChild(link);
    });
  }

  setupFormHandlers() {
    // Manejar envío de formularios
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmission(form);
      });
    });

    // Validación en tiempo real
    this.setupRealTimeValidation();
  }

  setupRealTimeValidation() {
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        this.clearFieldError(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    switch (field.type) {
      case "email":
        if (value && !this.isValidEmail(value)) {
          isValid = false;
          errorMessage = "Por favor ingresa un email válido";
        }
        break;
      case "text":
        if (field.required && !value) {
          isValid = false;
          errorMessage = "Este campo es requerido";
        }
        break;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showFieldError(field, message) {
    this.clearFieldError(field);

    field.classList.add("border-red-500");

    const errorDiv = document.createElement("div");
    errorDiv.className = "text-red-500 text-sm mt-1";
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.classList.remove("border-red-500");

    const existingError = field.parentNode.querySelector(".text-red-500");
    if (existingError) {
      existingError.remove();
    }
  }

  handleFormSubmission(form) {
    const allFieldsValid = this.validateForm(form);

    if (allFieldsValid) {
      // Para formularios que usan FormSubmit.co, permitir el envío normal
      if (form.action.includes('formsubmit.co')) {
        form.submit();
      } else {
        this.showSuccessMessage("¡Formulario enviado correctamente!");
        form.reset();
      }
    }
  }

  validateForm(form) {
    const fields = form.querySelectorAll("input, textarea, select");
    let allValid = true;

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        allValid = false;
      }
    });

    return allValid;
  }

  showSuccessMessage(message) {
    // Crear notificación de éxito
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300";
    notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-check-circle text-xl"></i>
                <div>
                    <div class="font-semibold">¡Éxito!</div>
                    <div class="text-sm">${message}</div>
                </div>
            </div>
        `;

    document.body.appendChild(notification);

    // Animación de entrada
    setTimeout(() => {
      notification.classList.remove("translate-x-full");
    }, 100);

    // Animación de salida
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  setupAIChat() {
    console.log("Sistema de chat IA listo");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.mainApp = new MainApp();

  // Actualizar año en footer
  const currentYear = document.getElementById("current-year");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});