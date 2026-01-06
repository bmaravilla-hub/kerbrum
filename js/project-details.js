class ProjectDetails {
  constructor() {
    this.init();
  }

  init() {
    this.setupVideoDemo();
    this.setupImageGallery();
    this.setupScrollAnimations();
  }

  setupVideoDemo() {
    const videoButton = document.querySelector(".video-demo-container button");
    if (videoButton) {
      videoButton.addEventListener("click", () => {
        // Aquí iría la lógica para reproducir el video
        console.log("Reproduciendo demo del proyecto...");
        // En una implementación real, esto cargaría un video
      });
    }
  }

  setupImageGallery() {
    // Lógica para galería de imágenes del proyecto
    const img = document.querySelectorAll(".project-image");
    img.forEach((img, index) => {
      img.addEventListener("click", () => {
        this.openLightbox(img.src, index);
      });
    });
  }

  setupScrollAnimations() {
    // Animaciones específicas para páginas de proyecto
    const features = document.querySelectorAll(".feature-item");
    features.forEach((feature, index) => {
      feature.style.animationDelay = `${index * 0.1}s`;
    });
  }

  openLightbox(src, index) {
    // Implementación de lightbox para imágenes
    console.log("Abrir lightbox para imagen:", src);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ProjectDetails();
});
