// ====== PARTICLE CANVAS ======
(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const COUNT = 70;
    const CONNECT = 130;
    let particles = [];
    let raf;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function mkParticle(init) {
        return {
            x: Math.random() * canvas.width,
            y: init ? Math.random() * canvas.height : canvas.height + 10,
            r: Math.random() * 1.6 + 0.4,
            vx: (Math.random() - 0.5) * 0.25,
            vy: -(Math.random() * 0.35 + 0.1),
            o: Math.random() * 0.45 + 0.15,
        };
    }

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x, dy = p.y - q.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < CONNECT) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(20,255,236,${(1 - d / CONNECT) * 0.1})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(20,255,236,${p.o})`;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < -10 || p.x < -20 || p.x > canvas.width + 20) {
                Object.assign(p, mkParticle(false));
                p.x = Math.random() * canvas.width;
            }
        }
        raf = requestAnimationFrame(frame);
    }

    function init() {
        resize();
        particles = Array.from({ length: COUNT }, () => mkParticle(true));
        frame();
    }

    window.addEventListener('resize', () => {
        cancelAnimationFrame(raf);
        resize();
        frame();
    });

    init();
})();

// ====== SCROLL PROGRESS ======
(function () {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    function update() {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
})();

// ====== CUSTOM CURSOR ======
(function () {
    const dot = document.getElementById('custom-cursor');
    const ring = document.getElementById('custom-cursor-ring');
    if (!dot || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

    (function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animRing);
    })();

    document.addEventListener('mouseover', e => {
        if (e.target.closest('a, button, input, textarea, label, [role="button"]')) {
            dot.style.width = '18px'; dot.style.height = '18px';
            ring.style.width = '52px'; ring.style.height = '52px';
            ring.style.borderColor = 'rgba(20,255,236,0.9)';
        }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest('a, button, input, textarea, label, [role="button"]')) {
            dot.style.width = '10px'; dot.style.height = '10px';
            ring.style.width = '36px'; ring.style.height = '36px';
            ring.style.borderColor = 'rgba(20,255,236,0.5)';
        }
    });
})();

// ====== ACTIVE NAV SECTION ======
(function () {
    const secs = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('#navbar a[href^="#"]');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
            }
        });
    }, { threshold: 0.35 });
    secs.forEach(s => obs.observe(s));
})();

// ====== VARIABLES ======
const navbarLinks = document.querySelectorAll('#navbar a');
const btnArriba = document.createElement('button');
const form = document.querySelector('#contacto form');
const modoBtn = document.createElement('button');
const body = document.body;
const proyectos = document.querySelectorAll('.proyecto');
const contadorProyectos = document.createElement('div');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

// ====== TYPEWRITER ======
const typewriterEl = document.getElementById('typewriter');
const roles = [
    'Desarrollador Fullstack',
    'Desarrollador de Videojuegos',
    'Analista en Sistemas',
    'Estudiante en Da Vinci',
    'Apasionado por la IA'
];
let roleIndex = 0, charIndex = 0, deleting = false;

function typeWriter() {
    const current = roles[roleIndex];
    if (!deleting) {
        typewriterEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeWriter, 1800);
            return;
        }
    } else {
        typewriterEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeWriter, deleting ? 50 : 90);
}

if (typewriterEl) typeWriter();

// ====== FUNCIONES ======

// 1. Scroll suave para navbar
function scrollSuave(e) {
    if (this.hash) {
        e.preventDefault();
        const seccion = document.querySelector(this.hash);
        seccion.scrollIntoView({ behavior: 'smooth' });
    }
}

// 2. Botón "Volver arriba"
function mostrarBtnArriba() {
    if (window.scrollY > 300) {
        btnArriba.style.display = 'block';
    } else {
        btnArriba.style.display = 'none';
    }
}
function volverArriba() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Animaciones al hacer scroll (básico)
function animarAlScroll() {
    document.querySelectorAll('.proyecto, #experiencia, #habilidades').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}

// 4. Envío del formulario con EmailJS
// TODO: Reemplazá estos valores con los de tu cuenta en emailjs.com
const EMAILJS_PUBLIC_KEY  = 'RvtJo3rMlTqeOwoXo';   // Account > API Keys
const EMAILJS_SERVICE_ID  = 'service_ts5t32f';   // Email Services
const EMAILJS_TEMPLATE_ID = 'template_5fjsjgi';  // Email Templates

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

async function enviarFormulario(e) {
    e.preventDefault();
    const nombre  = form.querySelector('[name="nombre"]');
    const email   = form.querySelector('[name="email"]');
    const mensaje = form.querySelector('[name="mensaje"]');
    const msgDiv  = document.getElementById('form-msg');
    const btn     = document.getElementById('btn-enviar');

    if (!nombre.value || !email.value || !mensaje.value || !email.value.includes('@')) {
        msgDiv.textContent = 'Por favor, completá todos los campos correctamente.';
        msgDiv.className = 'form-msg error';
        return;
    }

    btn.textContent = 'Enviando...';
    btn.disabled = true;
    msgDiv.textContent = '';
    msgDiv.className = 'form-msg';

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name:  nombre.value,
            reply_to:   email.value,
            message:    mensaje.value,
        });
        msgDiv.textContent = '¡Mensaje enviado! Te respondo a la brevedad.';
        msgDiv.className = 'form-msg success';
        form.reset();
    } catch (err) {
        msgDiv.textContent = 'Hubo un error al enviar. Intentá de nuevo.';
        msgDiv.className = 'form-msg error';
    } finally {
        btn.textContent = 'Enviar';
        btn.disabled = false;
    }
}

// 5. Modo oscuro/claro
function alternarModo() {
    body.classList.toggle('modo-claro');
    modoBtn.textContent = body.classList.contains('modo-claro') ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
}

// 6. Contador de proyectos
function mostrarContadorProyectos() {
    contadorProyectos.textContent = `Proyectos: ${proyectos.length}`;
    contadorProyectos.className = 'contador-proyectos';
    document.querySelector('#proyectos').prepend(contadorProyectos);
}

// ====== EVENTOS ======

// Scroll suave
navbarLinks.forEach(link => link.addEventListener('click', scrollSuave));

// Lightbox
document.querySelectorAll('.proyecto-gallery img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function cerrarLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', cerrarLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) cerrarLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarLightbox(); });

// Botón volver arriba
btnArriba.textContent = '↑';
btnArriba.className = 'btn-arriba';
btnArriba.style.display = 'none';
btnArriba.style.position = 'fixed';
btnArriba.style.bottom = '30px';
btnArriba.style.right = '30px';
btnArriba.style.padding = '12px 18px';
btnArriba.style.fontSize = '1.5rem';
btnArriba.style.borderRadius = '50%';
btnArriba.style.background = '#14FFEC';
btnArriba.style.color = '#232931';
btnArriba.style.border = 'none';
btnArriba.style.cursor = 'pointer';
document.body.appendChild(btnArriba);
btnArriba.addEventListener('click', volverArriba);
window.addEventListener('scroll', mostrarBtnArriba);

// Animaciones al hacer scroll
window.addEventListener('scroll', animarAlScroll);
window.addEventListener('DOMContentLoaded', animarAlScroll);

// Envío de formulario
if (form) form.addEventListener('submit', enviarFormulario);

// Modo oscuro/claro
modoBtn.textContent = '☀️ Modo Claro';
modoBtn.className = 'modo-btn';
modoBtn.style.position = 'fixed';
modoBtn.style.top = '30px';
modoBtn.style.right = '30px';
modoBtn.style.padding = '10px 18px';
modoBtn.style.borderRadius = '20px';
modoBtn.style.background = '#14FFEC';
modoBtn.style.color = '#232931';
modoBtn.style.border = 'none';
modoBtn.style.cursor = 'pointer';
document.body.appendChild(modoBtn);
modoBtn.addEventListener('click', alternarModo);

// Contador de proyectos
mostrarContadorProyectos();