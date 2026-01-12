document.addEventListener('DOMContentLoaded', () => {
    
    // --- Menú Móvil ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer click en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Scroll Suave (Smooth Scroll) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Compensar la altura del navbar fijo
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Animaciones al hacer Scroll (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll('.service-card, .section-title, .lead-text, .col-image, .col-text, .testimonial-box');
    
    // Agregar clase inicial para CSS
    animatedElements.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});

// Agregar estilos para la animación JS dinámicamente o en CSS
// Lo añadiré aquí como un style tag inyectado para asegurar que funcione sin editar CSS de nuevo,
// o confiar en que el usuario ya tiene clases de animación. 
// Mejor inyecto un pequeño estilo extra para 'fade-in-section'.

const style = document.createElement('style');
style.innerHTML = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(100px);
        transition: opacity 0.5s ease-out, transform 1s ease-out;
    }
    .fade-in-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
