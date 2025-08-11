// ====== VARIABLES ======
const navbarLinks = document.querySelectorAll('#navbar a');
const btnArriba = document.createElement('button');
const form = document.querySelector('#contacto form');
const modoBtn = document.createElement('button');
const body = document.body;
const proyectos = document.querySelectorAll('.proyecto');
const contadorProyectos = document.createElement('div');

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

// 4. Validación del formulario de contacto
function validarFormulario(e) {
    const nombre = form.querySelector('[name="nombre"]');
    const email = form.querySelector('[name="email"]');
    const mensaje = form.querySelector('[name="mensaje"]');
    if (!nombre.value || !email.value || !mensaje.value || !email.value.includes('@')) {
        e.preventDefault();
        alert('Por favor, completa todos los campos correctamente.');
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

// Validación de formulario
if (form) form.addEventListener('submit', validarFormulario);

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