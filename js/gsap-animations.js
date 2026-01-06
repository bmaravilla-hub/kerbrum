class GSAPAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.registerGSAPPlugins();
    this.setupHeroAnimations();
    this.setupScrollAnimations();
    this.setupHoverAnimations();
    this.setupPageTransitions();
    this.setupCustomCursors();
    this.setupParallaxEffects();
  }

  registerGSAPPlugins() {
    // Registrar plugins de GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    console.log(" GSAP Animations inicializadas");
  }

  setupHeroAnimations() {
    // Animación del Hero Section
    const heroTimeline = gsap.timeline();

    heroTimeline
      .from(".hero-section h1 span", {
        duration: 1.2,
        y: 100,
        opacity: 0,
        stagger: 0.3,
        ease: "power4.out",
      })
      .from(
        ".hero-section p",
        {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        ".cta-primary, .cta-ebook",
        {
          duration: 0.8,
          y: 30,
          opacity: 0,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      .from(
        ".hero-visual",
        {
          duration: 1.2,
          x: 100,
          opacity: 0,
          rotationY: 15,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .from(
        ".floating-shape",
        {
          duration: 1.5,
          scale: 0,
          opacity: 0,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)",
        },
        "-=1"
      );

    // Animación de partículas
    gsap.to(".particle", {
      y: -100,
      x: "random(-50, 50)",
      rotation: "random(-180, 180)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 2,
        from: "random",
      },
      ease: "sine.inOut",
    });
  }

  setupScrollAnimations() {
    // Animaciones al hacer scroll con ScrollTrigger

    // Service Cards
    gsap.utils.toArray(".service-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          rotationX: -15,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Portfolio Items
    gsap.utils.toArray(".portfolio-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Stats Counters
    gsap.utils.toArray(".count-up").forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));

      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => this.animateCounterGSAP(counter, target),
      });
    });

    // Text Reveal Animations
    gsap.utils.toArray("[data-text-reveal]").forEach((text) => {
      gsap.fromTo(
        text,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
          },
        }
      );
    });
  }

  animateCounterGSAP(counter, target) {
    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        counter.textContent = Math.floor(obj.value);
      },
    });
  }

  setupHoverAnimations() {
    // Hover effects para cards
    gsap.utils
      .toArray(".service-card, .blog-card, .portfolio-card")
      .forEach((card) => {
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
          .to(card, {
            y: -15,
            rotationX: 5,
            rotationY: 2,
            duration: 0.4,
            ease: "power2.out",
          })
          .to(
            card.querySelector(".service-icon, .blog-image, .portfolio-image"),
            {
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
            },
            0
          );

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });

    // Hover effects para botones
    gsap.utils
      .toArray(".cta-primary, .cta-ebook, .cta-button")
      .forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            y: -2,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

    // Hover effects para nav links
    gsap.utils.toArray(".nav-link").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          y: -2,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    });
  }

  setupPageTransitions() {
    // Smooth scrolling mejorado
    gsap.utils.toArray('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: {
              y: target,
              offsetY: 80,
            },
            ease: "power3.inOut",
          });
        }
      });
    });

    // Page transitions entre páginas
    document.addEventListener("DOMContentLoaded", () => {
      gsap.from("body", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
    });
  }

  setupCustomCursors() {
    // Cursor personalizado con GSAP
    if (window.matchMedia("(pointer: fine)").matches) {
      const cursor = document.createElement("div");
      cursor.className = "custom-cursor-gsap";
      document.body.appendChild(cursor);

      // Seguir cursor
      document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      });

      // Efectos hover
      const interactiveElements = document.querySelectorAll(
        "a, button, .service-card, .blog-card"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(cursor, {
            scale: 2,
            backgroundColor: "rgba(26, 99, 227, 0.5)",
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(cursor, {
            scale: 1,
            backgroundColor: "rgba(26, 99, 227, 0.2)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }
  }

  setupParallaxEffects() {
    // Efectos parallax avanzados
    gsap.utils.toArray("[data-parallax]").forEach((element) => {
      const speed = element.getAttribute("data-parallax-speed") || 0.5;

      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Parallax para elementos de fondo
    gsap.to(".floating-shape", {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: true,
      },
    });
  }

  // Animaciones específicas para el carrusel de clientes
  setupClientsCarousel() {
    const carousel = document.querySelector(".clients-carousel");
    if (!carousel) return;

    const scrollContent = carousel.querySelector(".animate-scroll-left");
    const contentWidth = scrollContent.scrollWidth / 2;

    gsap.to(scrollContent, {
      x: -contentWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    // Pausar/reanudar al hover
    carousel.addEventListener("mouseenter", () => {
      gsap.to(scrollContent, { timeScale: 0 });
    });

    carousel.addEventListener("mouseleave", () => {
      gsap.to(scrollContent, { timeScale: 1 });
    });
  }

  // Animación de texto typewriter
  setupTypewriterEffect() {
    const typewriterElements = document.querySelectorAll("[data-typewriter]");

    typewriterElements.forEach((element) => {
      const text = element.textContent;
      element.textContent = "";

      const tl = gsap.timeline();
      tl.to(element, {
        duration: text.length * 0.05,
        text: {
          value: text,
        },
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        animation: tl,
      });
    });
  }

  // Efectos de partículas avanzados
  setupAdvancedParticles() {
    const particles = document.querySelectorAll(".particle");

    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        rotation: "random(-360, 360)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5,
      });
    });
  }

  // Animación de carga inicial
  setupLoadingAnimation() {
    const loader = document.createElement("div");
    loader.className =
      "fixed inset-0 bg-white dark:bg-dark z-50 flex items-center justify-center";
    loader.innerHTML = `
            <div class="loader-content text-center">
                <div class="loader-spinner w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <div class="text-xl font-semibold text-dark dark:text-white">Kerbrum Agency</div>
            </div>
        `;

    document.body.appendChild(loader);

    const loadingTl = gsap.timeline();

    loadingTl
      .to(".loader-spinner", {
        rotation: 360,
        duration: 1,
        repeat: 2,
        ease: "power2.inOut",
      })
      .to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          document.body.removeChild(loader);
          this.init(); // Iniciar resto de animaciones
        },
      });
  }
}

// Nuevas animaciones para el index
setupFloatingElements();
// Elementos flotantes en el hero
gsap.utils.toArray(".floating-element").forEach((element, index) => {
  gsap.to(element, {
    y: -20,
    rotation: "random(-5, 5)",
    duration: "random(2, 4)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: index * 0.5,
  });
});

setupTextRevealEffects();
// Efecto de revelado de texto más avanzado
gsap.utils.toArray(".text-reveal").forEach((text) => {
  const split = new SplitType(text, { types: "chars,words" });

  gsap.from(split.chars, {
    scrollTrigger: {
      trigger: text,
      start: "top 80%",
    },
    y: 100,
    rotationX: -90,
    opacity: 0,
    duration: 1,
    stagger: 0.02,
    ease: "back.out(1.7)",
  });
});

setupMagneticButtons();
// Botones magnéticos que siguen el cursor
gsap.utils.toArray(".magnetic-btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  });
});

setupImageParallax();
// Parallax para imágenes de fondo
gsap.utils.toArray(".parallax-image").forEach((image) => {
  gsap.to(image, {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: image,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});

setupStaggeredGrid();
// Animación escalonada para grids
gsap.utils.toArray(".stagger-grid > *").forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    delay: index * 0.1,
    ease: "power2.out",
  });
});

// Inicializar GSAP cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.gsapAnimations = new GSAPAnimations();
});

// Exportar para uso global
window.GSAPAnimations = GSAPAnimations;
