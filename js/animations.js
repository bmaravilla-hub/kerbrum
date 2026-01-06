class AdvancedAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupParallaxEffects();
    this.setupHoverAnimations();
    this.setupPageTransitions();
    this.setupLoadingAnimations();
    this.setupBlogAnimations();
    this.setupContactAnimations();
  }

  setupScrollAnimations() {
    // Inicializar AOS
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: "ease-out-cubic",
      });
    }

    // Custom scroll animations
    this.setupScrollReveal();
  }

  setupScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observar elementos para animación personalizada
    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });
  }

  animateElement(element) {
    const animationType = element.getAttribute("data-animate");

    switch (animationType) {
      case "fade-up":
        element.style.animation = "fade-in-up 0.8s ease-out forwards";
        break;
      case "slide-left":
        element.style.animation = "slide-in-left 0.8s ease-out forwards";
        break;
      case "slide-right":
        element.style.animation = "slide-in-right 0.8s ease-out forwards";
        break;
      case "zoom-in":
        element.style.animation = "zoom-in 0.6s ease-out forwards";
        break;
      case "bounce-in":
        element.style.animation = "bounce-in 0.8s ease-out forwards";
        break;
    }
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll(".count-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  animateCounter(counter) {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent =
        Math.floor(current) + (counter.getAttribute("data-suffix") || "");
    }, 16);
  }

  setupParallaxEffects() {
    // Efecto parallax para elementos de fondo
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll("[data-parallax]");

      parallaxElements.forEach((element) => {
        const speed = element.getAttribute("data-parallax-speed") || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  setupHoverAnimations() {
    // Efectos hover mejorados para tarjetas
    const cards = document.querySelectorAll(".service-card, .blog-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });

    // Efectos hover para elementos de contacto
    const contactItems = document.querySelectorAll(".contact-item");
    contactItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const icon = item.querySelector(".contact-icon");
        if (icon) {
          icon.style.transform = "scale(1.1) rotate(5deg)";
        }
      });

      item.addEventListener("mouseleave", () => {
        const icon = item.querySelector(".contact-icon");
        if (icon) {
          icon.style.transform = "scale(1) rotate(0deg)";
        }
      });
    });
  }

  setupPageTransitions() {
    // Transiciones suaves entre secciones
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Efecto de highlight en la sección destino
          this.highlightSection(target);
        }
      });
    });
  }

  highlightSection(section) {
    section.style.boxShadow = "0 0 0 3px rgba(26, 99, 227, 0.3)";
    setTimeout(() => {
      section.style.boxShadow = "none";
    }, 2000);
  }

  setupLoadingAnimations() {
    // Animaciones de carga para imágenes
    const img = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          img.style.opacity = "0";
          img.style.transform = "scale(0.8)";

          setTimeout(() => {
            img.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            img.style.opacity = "1";
            img.style.transform = "scale(1)";
          }, 100);

          imageObserver.unobserve(img);
        }
      });
    });

    img.forEach((img) => imageObserver.observe(img));
  }

  setupBlogAnimations() {
    // Animaciones específicas para la sección de blog
    const blogCards = document.querySelectorAll(".blog-card");

    blogCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // Efecto de lectura de tiempo
    const readTimes = document.querySelectorAll(
      ".blog-image .flex.items-center"
    );
    readTimes.forEach((time) => {
      time.addEventListener("mouseenter", () => {
        time.style.transform = "translateX(5px)";
      });

      time.addEventListener("mouseleave", () => {
        time.style.transform = "translateX(0)";
      });
    });
  }

  setupContactAnimations() {
    // Animaciones específicas para la sección de contacto
    const formInputs = document.querySelectorAll(
      ".contact-form input, .contact-form textarea, .contact-form select"
    );

    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused");
        }
      });
    });

    // Animación de envío de formulario
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.animateFormSubmission(contactForm);
      });
    }
  }

  animateFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    // Simular envío
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
      submitBtn.style.background = "#10B981";

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        form.reset();
      }, 2000);
    }, 1500);
  }

  // Efectos de partículas interactivas
  createParticles(event) {
    const particlesContainer = document.querySelector(".particles-container");
    if (!particlesContainer) return;

    const particle = document.createElement("div");
    particle.className = "interactive-particle";
    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;

    particlesContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// Efectos de cursor personalizado
class CustomCursor {
  constructor() {
    this.cursor = null;
    this.init();
  }

  init() {
    if (window.matchMedia("(pointer: fine)").matches) {
      this.createCursor();
      this.setupCursorMovement();
      this.setupCursorEffects();
    }
  }

  createCursor() {
    this.cursor = document.createElement("div");
    this.cursor.className = "custom-cursor";
    document.body.appendChild(this.cursor);
    document.body.classList.add("custom-cursor-enabled");
  }

  setupCursorMovement() {
    document.addEventListener("mousemove", (e) => {
      if (this.cursor) {
        this.cursor.style.left = `${e.clientX}px`;
        this.cursor.style.top = `${e.clientY}px`;
      }
    });
  }

  setupCursorEffects() {
    const interactiveElements = document.querySelectorAll(
      "a, button, .service-card, .blog-card, .cta-primary, .cta-ebook"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.cursor.classList.add("cursor-hover");
      });

      el.addEventListener("mouseleave", () => {
        this.cursor.classList.remove("cursor-hover");
      });
    });
  }
}

// Funcionalidad del botón de IA
class AIChatManager {
  constructor() {
    this.chatButton = document.getElementById("ai-chat-button");
    this.chatContainer = document.getElementById("ai-chat-container");
    this.closeChat = document.getElementById("close-chat");
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupChatAnimations();
  }

  setupEventListeners() {
    // Abrir/cerrar chat
    this.chatButton.addEventListener("click", (e) => {
      if (e.target.closest(".ai-chat-btn")) {
        this.toggleChat();
      }
    });

    // Cerrar chat
    this.closeChat.addEventListener("click", () => {
      this.closeChatContainer();
    });

    // Cerrar chat al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (
        !this.chatContainer.contains(e.target) &&
        !this.chatButton.contains(e.target) &&
        this.chatContainer.classList.contains("scale-100")
      ) {
        this.closeChatContainer();
      }
    });

    // Enviar mensaje
    const chatInput = this.chatContainer.querySelector("input");
    const sendBtn = this.chatContainer.querySelector(".chat-input button");

    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (message) {
        this.addUserMessage(message);
        chatInput.value = "";

        // Simular respuesta de IA
        setTimeout(() => {
          this.addAIMessage(this.generateResponse(message));
        }, 1000);
      }
    };

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  setupChatAnimations() {
    // Animación de entrada del chat
    this.chatContainer.style.transition =
      "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }

  toggleChat() {
    if (this.chatContainer.classList.contains("scale-0")) {
      this.openChatContainer();
    } else {
      this.closeChatContainer();
    }
  }

  openChatContainer() {
    this.chatContainer.classList.remove("scale-0", "opacity-0", "invisible");
    this.chatContainer.classList.add("scale-100", "opacity-100", "visible");
  }

  closeChatContainer() {
    this.chatContainer.classList.add("scale-0", "opacity-0", "invisible");
    this.chatContainer.classList.remove("scale-100", "opacity-100", "visible");
  }

  addUserMessage(message) {
    const messagesContainer =
      this.chatContainer.querySelector(".chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message user-message mb-4";
    messageDiv.innerHTML = `
            <div class="flex items-start space-x-3 justify-end">
                <div class="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                    <p class="text-dark dark:text-white">${message}</p>
                </div>
                <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-white text-sm"></i>
                </div>
            </div>
        `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  addAIMessage(message) {
    const messagesContainer =
      this.chatContainer.querySelector(".chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message ai-message mb-4";
    messageDiv.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-white text-sm"></i>
                </div>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <p class="text-dark dark:text-white">${message}</p>
                </div>
            </div>
        `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  generateResponse(userMessage) {
    const responses = [
      "¡Excelente pregunta! En Kerbrum Agency nos especializamos en transformación digital. ¿Te gustaría saber más sobre nuestros servicios específicos?",
      "Interesante consulta. Podemos ayudarte con estrategias de transformación digital, desarrollo de software a medida o soluciones de IA. ¿Cuál te interesa más?",
      "Gracias por tu mensaje. Nuestro equipo de expertos puede asesorarte sobre la mejor manera de implementar tecnología en tu negocio. ¿Podrías contarme más sobre tus objetivos?",
      "¡Hola! Basándome en tu consulta, creo que nuestros servicios de consultoría tecnológica podrían ser perfectos para ti. ¿Te gustaría agendar una consulta gratuita?",
      "Excelente punto. La transformación digital requiere un enfoque estratégico. En Kerbrum desarrollamos planes personalizados para cada cliente. ¿En qué industria te encuentras?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new AdvancedAnimations();
  new CustomCursor();
  new AIChatManager();

  // Efectos de partículas en clics
  document.addEventListener("click", (e) => {
    new AdvancedAnimations().createParticles(e);
  });

  // Actualizar año en footer
  const currentYear = document.getElementById("current-year");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});

// Efectos de sonido opcionales (solo si el usuario lo permite)
class SoundEffects {
  constructor() {
    this.enabled = false;
    this.init();
  }

  init() {
    // Solo activar si el usuario ha interactuado con la página
    document.addEventListener(
      "click",
      () => {
        if (!this.enabled) {
          this.enabled = true;
          this.setupSounds();
        }
      },
      { once: true }
    );
  }

  setupSounds() {
    // Implementar efectos de sonido sutiles para interacciones
    console.log("Sound effects enabled");
  }
}

// En la clase AdvancedAnimations, agregar:
setupPortfolioFilter();
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remover active de todos los botones
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Agregar active al botón clickeado
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 100);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});
