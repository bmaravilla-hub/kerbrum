// Component Loader - Carga nav y footer dinámicamente
(function () {
    'use strict';

    // Detectar la profundidad del directorio actual
    function getBasePath() {
        const path = window.location.pathname;

        if (path.includes('/blogs/') || path.includes('/productos/')) {
            return '../';
        }
        return '';
    }

    const basePath = getBasePath();
    console.log('Component Loader - Base Path:', basePath);

    // Cargar navegación
    fetch(basePath + 'includes/nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Reemplazar rutas relativas
            html = html.replace(/href="index\.html"/g, `href="${basePath}index.html"`);
            html = html.replace(/href="#/g, `href="${basePath}index.html#`);
            html = html.replace(/src="img\//g, `src="${basePath}img/`);

            const navContainer = document.getElementById('nav-container');
            if (navContainer) {
                navContainer.innerHTML = html;
                console.log('✓ Navigation loaded successfully');

                // Reinicializar el script de navegación después de cargar
                if (window.initNavigation) {
                    window.initNavigation();
                }
            } else {
                console.error('✗ nav-container element not found');
            }
        })
        .catch(error => {
            console.error('✗ Error loading navigation:', error);
            console.error('Attempted path:', basePath + 'includes/nav.html');
        });

    // Cargar footer
    fetch(basePath + 'includes/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Reemplazar rutas relativas
            html = html.replace(/href="index\.html"/g, `href="${basePath}index.html"`);
            html = html.replace(/href="#/g, `href="${basePath}index.html#`);
            html = html.replace(/src="img\//g, `src="${basePath}img/`);

            // También necesitamos actualizar el año actual
            html = html.replace(/<span id="current-year">2024<\/span>/, `<span id="current-year">${new Date().getFullYear()}</span>`);

            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = html;
                console.log('✓ Footer loaded successfully');
            } else {
                console.error('✗ footer-container element not found');
            }
        })
        .catch(error => {
            console.error('✗ Error loading footer:', error);
            console.error('Attempted path:', basePath + 'includes/footer.html');
        });
})();
