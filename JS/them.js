console.log("Archivo theme.js cargado correctamente");

const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

if (!toggleBtn) {
    console.error("ERROR: No se encontró el botón con ID 'theme-toggle'");
} else {
    // 1. Cargar tema inicial con transición suave
    const savedTheme = localStorage.getItem("theme") || "light";
    
    // Agregar clase sin transición para evitar flash
    body.style.transition = 'none';
    body.classList.add(savedTheme);
    toggleBtn.textContent = savedTheme === "light" ? "☀️" : "🌙";
    
    // Restaurar transiciones después de un frame
    requestAnimationFrame(() => {
        body.style.transition = '';
    });
    
    console.log("Tema inicial cargado:", savedTheme);

    // 2. Evento Click con animación del botón
    toggleBtn.addEventListener("click", () => {
        console.log("Botón presionado");
        
        // Animación del botón
        toggleBtn.style.transform = "rotate(360deg) scale(0.9)";
        
        setTimeout(() => {
            toggleBtn.style.transform = "";
            
            if (body.classList.contains("light")) {
                body.classList.remove("light");
                body.classList.add("dark");
                localStorage.setItem("theme", "dark");
                toggleBtn.textContent = "🌙";
                console.log("Cambiado a dark");
            } else {
                body.classList.remove("dark");
                body.classList.add("light");
                localStorage.setItem("theme", "light");
                toggleBtn.textContent = "☀️";
                console.log("Cambiado a light");
            }
        }, 150);
    });
}

// 3. Agregar efecto de scroll al navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 4. Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observar todas las secciones
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section.section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    
    // Animar cards de skills
    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        setTimeout(() => {
            skill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0)';
        }, index * 50);
    });
    
    // Animar cards de proyectos
    const projects = document.querySelectorAll('.project');
    projects.forEach((project, index) => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(30px)';
        setTimeout(() => {
            project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// 5. Smooth scroll para los enlaces del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#navcol') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar navbar en móvil
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        }
    });
});

// 6. Marcar el link activo en el navbar según la sección visible
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});