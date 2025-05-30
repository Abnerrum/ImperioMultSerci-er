// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Função de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(ancora => {
        ancora.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const destino = document.querySelector(this.getAttribute('href'));
                if (destino) {
                    // Ajusta o scroll para compensar o cabeçalho fixo
                    const headerOffset = document.querySelector('.header, .header-internal').offsetHeight; // Pega a altura do header
                    const elementPosition = destino.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20; // -20 para um pequeno espaçamento extra

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Lógica para o menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const menuMobile = document.querySelector('.menu-mobile');
    const menuLinks = document.querySelectorAll('.menu-mobile ul li a');

    if (menuToggle && menuMobile) {
        menuToggle.addEventListener('click', function() {
            menuMobile.classList.toggle('ativo');
        });

        // Fecha o menu mobile ao clicar em um link
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuMobile.classList.remove('ativo');
            });
        });
    }

    // Lógica de Scroll Reveal para elementos com a classe .reveal-on-scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% do elemento visível para disparar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Adiciona o menu-toggle também para a página de contato, se não estiver lá
    // Este é um ajuste para garantir que o menu mobile funcione em ambas as páginas
    // Idealmente, o menu-toggle já estaria dentro do <header> em ambas as páginas
    const headerInternal = document.querySelector('.header-internal');
    if (headerInternal && !headerInternal.querySelector('.menu-toggle')) {
        const toggle = document.createElement('div');
        toggle.classList.add('menu-toggle');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        headerInternal.appendChild(toggle);
        // Re-seleciona o menuToggle para a página de contato
        menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
             menuToggle.addEventListener('click', function() {
                menuMobile.classList.toggle('ativo');
            });
        }
    }
});