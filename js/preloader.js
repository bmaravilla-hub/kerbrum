class TypingPreloader {
  constructor() {
    this.preloader = null;
    this.init();
  }

  init() {
    this.createPreloader();
    this.animatePreloader();
  }

  createPreloader() {
    this.preloader = document.createElement("div");
    this.preloader.className =
      "preloader-typing fixed inset-0 bg-gradient-to-br from-primary to-dark z-50 flex items-center justify-center";
    this.preloader.innerHTML = `
            <div class="preloader-content text-center relative">
                <!-- Líneas decorativas -->
                <div class="floating-shapes">
                    <div class="shape shape-1"></div>
                    <div class="shape shape-2"></div>
                    <div class="shape shape-3"></div>
                </div>
                
                <div class="typing-container relative z-10">
                    <div class="text-animation mb-4">
                        <span class="char">K</span>
                        <span class="char">E</span>
                        <span class="char">R</span>
                        <span class="char">B</span>
                        <span class="char">R</span>
                        <span class="char">U</span>
                        <span class="char">M</span>
                    </div>
                    
                    <div class="subtitle text-blue-200 text-sm font-light opacity-0">
                        Digital Transformation
                    </div>
                </div>
            </div>
        `;
    document.body.appendChild(this.preloader);
    document.body.style.overflow = "hidden";
  }

  animatePreloader() {
    const timeline = gsap.timeline();

    timeline
      .from(".char", {
        y: 80,
        opacity: 0,
        rotationX: -90,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.7)",
      })
      .to(
        ".subtitle",
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(this.preloader, {
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power2.out",
        onComplete: () => this.removePreloader(),
      });
  }

  removePreloader() {
    this.preloader.remove();
    document.body.style.overflow = "";
    this.initializeSite();
  }

  initializeSite() {
    if (window.gsapAnimations) window.gsapAnimations.init();
    if (typeof AOS !== "undefined") AOS.init();
  }
}

class PulsePreloader {
  constructor() {
    this.createPreloader();
  }

  createPreloader() {
    const preloader = document.createElement("div");
    preloader.className =
      "preloader-pulse fixed inset-0 bg-white dark:bg-dark z-50 flex items-center justify-center";
    preloader.innerHTML = `
            <div class="preloader-content text-center">
                <!-- Logo pulsante -->
                <div class="pulse-container mb-6">
                    <div class="pulse-ring ring-1"></div>
                    <div class="pulse-ring ring-2"></div>
                    <div class="pulse-logo w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto relative z-10">
                        <span class="text-white font-bold text-lg">K</span>
                    </div>
                </div>
                
                <div class="text-dark dark:text-white font-semibold">Kerbrum Agency</div>
                <div class="text-gray-600 dark:text-gray-400 text-sm mt-2">Loading your experience</div>
            </div>
        `;
    document.body.appendChild(preloader);
    this.animatePreloader();
  }

  animatePreloader() {
    const timeline = gsap.timeline();

    timeline
      .from(".pulse-logo", {
        scale: 0,
        rotation: -180,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
      .from(".ring-1", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .from(".ring-2", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      })
      .to(".preloader-pulse", {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
        ease: "power2.out",
        onComplete: () => {
          document.querySelector(".preloader-pulse").remove();
          document.body.style.overflow = "";
          if (window.gsapAnimations) window.gsapAnimations.init();
        },
      });
  }
}

class WavePreloader {
  constructor() {
    this.createPreloader();
  }

  createPreloader() {
    const preloader = document.createElement("div");
    preloader.className =
      "preloader-wave fixed inset-0 bg-gradient-to-br from-primary to-secondary z-50 flex items-center justify-center";
    preloader.innerHTML = `
            <div class="preloader-content text-center text-white">
                <!-- Waves -->
                <div class="waves-container w-24 h-24 relative mx-auto mb-6">
                    <div class="wave wave-1 absolute inset-0 border-2 border-white/30 rounded-full"></div>
                    <div class="wave wave-2 absolute inset-3 border-2 border-white/50 rounded-full"></div>
                    <div class="wave wave-3 absolute inset-6 border-2 border-white/70 rounded-full"></div>
                    <div class="wave-center w-4 h-4 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                <div class="font-bold text-lg mb-1">Kerbrum</div>
                <div class="text-white/80 text-sm">Building digital solutions</div>
            </div>
        `;
    document.body.appendChild(preloader);
    this.animatePreloader();
  }

  animatePreloader() {
    const timeline = gsap.timeline();

    timeline
      .from(".wave", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      })
      .from(".wave-center", {
        scale: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      })
      .to(".wave", {
        scale: 1.2,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        repeat: 1,
        ease: "power2.inOut",
      })
      .to(".preloader-wave", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          document.querySelector(".preloader-wave").remove();
          document.body.style.overflow = "";
          if (window.gsapAnimations) window.gsapAnimations.init();
        },
      });
  }
}

class GeometricPreloader {
  constructor() {
    this.createPreloader();
  }

  createPreloader() {
    const preloader = document.createElement("div");
    preloader.className =
      "preloader-geometric fixed inset-0 bg-dark z-50 flex items-center justify-center";
    preloader.innerHTML = `
            <div class="preloader-content text-center">
                <!-- Shapes geométricas -->
                <div class="geometric-container relative w-20 h-20 mx-auto mb-6">
                    <div class="shape shape-square absolute top-0 left-0 w-8 h-8 bg-secondary"></div>
                    <div class="shape shape-circle absolute top-0 right-0 w-8 h-8 bg-accent rounded-full"></div>
                    <div class="shape shape-triangle absolute bottom-0 left-0 w-8 h-8 bg-gradientStart"></div>
                    <div class="shape shape-diamond absolute bottom-0 right-0 w-8 h-8 bg-gradientEnd transform rotate-45"></div>
                </div>
                
                <div class="text-white font-bold">KERBRUM</div>
                <div class="text-gray-400 text-sm mt-1">Innovation in progress</div>
            </div>
        `;
    document.body.appendChild(preloader);
    this.animatePreloader();
  }

  animatePreloader() {
    const timeline = gsap.timeline();

    timeline
      .from(".shape", {
        scale: 0,
        rotation: 180,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      })
      .to(".shape", {
        rotation: 360,
        duration: 1,
        stagger: 0.1,
        ease: "power2.inOut",
      })
      .to(".preloader-geometric", {
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power2.out",
        onComplete: () => {
          document.querySelector(".preloader-geometric").remove();
          document.body.style.overflow = "";
          if (window.gsapAnimations) window.gsapAnimations.init();
        },
      });
  }
}

class ModernPreloader {
  constructor() {
    this.createPreloader();
  }

  createPreloader() {
    const preloader = document.createElement("div");
    preloader.className =
      "preloader-modern fixed inset-0 bg-gray-50 dark:bg-gray-900 z-50 flex items-center justify-center";
    preloader.innerHTML = `
            <div class="preloader-content text-center">
                <!-- Barra de progreso moderna -->
                <div class="modern-container w-64 mx-auto mb-6">
                    <div class="progress-track h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div class="progress-bar h-full bg-gradient-to-r from-secondary to-accent rounded-full"></div>
                    </div>
                </div>
                
                <div class="flex items-center justify-center space-x-3">
                    <div class="logo-mini w-6 h-6 bg-secondary rounded"></div>
                    <div class="text-dark dark:text-white font-semibold">Kerbrum Agency</div>
                </div>
                <div class="text-gray-500 dark:text-gray-400 text-sm mt-2">Preparing digital experience</div>
            </div>
        `;
    document.body.appendChild(preloader);
    this.animatePreloader();
  }

  animatePreloader() {
    const timeline = gsap.timeline();

    timeline
      .from(".logo-mini", {
        scale: 0,
        rotation: -180,
        duration: 0.6,
        ease: "back.out(1.7)",
      })
      .to(".progress-bar", {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      })
      .to(".preloader-modern", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          document.querySelector(".preloader-modern").remove();
          document.body.style.overflow = "";
          if (window.gsapAnimations) window.gsapAnimations.init();
        },
      });
  }
}

// Factory con 5 preloaders diferentes
class PreloaderFactory {
  static createRandomPreloader() {
    const preloaders = [
      () => new TypingPreloader(),
      () => new PulsePreloader(),
      () => new WavePreloader(),
      () => new GeometricPreloader(),
      () => new ModernPreloader(),
    ];

    const randomIndex = Math.floor(Math.random() * preloaders.length);
    return preloaders[randomIndex]();
  }
}

// Inicializar preloader aleatorio
document.addEventListener("DOMContentLoaded", () => {
  PreloaderFactory.createRandomPreloader();
});
