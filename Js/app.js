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