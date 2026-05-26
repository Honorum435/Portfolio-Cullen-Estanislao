// ============================================================
// CODEX — Portfolio Estanislao Cullen
// ============================================================

// ---------- Segmented progress bars ----------
document.querySelectorAll('.progress').forEach((bar) => {
    const filled = parseInt(bar.dataset.filled || '0', 10);
    const total = parseInt(bar.dataset.total || '10', 10);
    const variant = bar.dataset.variant || '';
    for (let i = 0; i < total; i++) {
        const seg = document.createElement('span');
        seg.className = 'seg' + (i < filled ? ' on' : '') + (variant ? ' ' + variant : '');
        bar.appendChild(seg);
    }
});

// ---------- Typewriter ----------
const typewriterEl = document.getElementById('typewriter');
const ROLES = [
    'Full Stack Developer',
    'Game Designer en formación',
    'Unity & React enthusiast',
    'Worldbuilder de profesión',
];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typewriterEl) {
    if (reduceMotion) {
        typewriterEl.textContent = ROLES[0];
    } else {
        let roleIdx = 0, charIdx = 0, deleting = false;
        const tick = () => {
            const full = ROLES[roleIdx];
            if (!deleting) {
                typewriterEl.textContent = full.slice(0, ++charIdx);
                if (charIdx === full.length) {
                    deleting = true;
                    return setTimeout(tick, 1800);
                }
            } else {
                typewriterEl.textContent = full.slice(0, --charIdx);
                if (charIdx === 0) {
                    deleting = false;
                    roleIdx = (roleIdx + 1) % ROLES.length;
                }
            }
            setTimeout(tick, deleting ? 30 : 55);
        };
        tick();
    }
}

// ---------- Smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            nav.classList.remove('open');
        }
    });
});

// ---------- Mobile nav ----------
const nav = document.querySelector('.nav');
const burger = document.getElementById('nav-burger');
if (burger) {
    burger.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
}

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.section-head, .about-grid, .inv-card, .skill-school, .entry, .contact-grid');
revealEls.forEach((el) => el.classList.add('reveal'));
if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add('in'));
}

// ---------- Toast ----------
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
let toastTimer;
function showToast(msg, isError) {
    if (!toast) return;
    toastMsg.textContent = msg;
    toast.classList.toggle('error', !!isError);
    toast.querySelector('.toast-icon').textContent = isError ? '▲' : '✓';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
}

// ---------- Contact form (validation + EmailJS) ----------
const EMAILJS_PUBLIC_KEY  = 'RvtJo3rMlTqeOwoXo';
const EMAILJS_SERVICE_ID  = 'service_ts5t32f';
const EMAILJS_TEMPLATE_ID = 'template_5fjsjgi';

if (window.emailjs) emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const form = document.getElementById('raven-form');
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function setFieldError(name, msg) {
    const field = form.querySelector(`.field[data-field="${name}"]`);
    if (!field) return;
    field.classList.toggle('error', !!msg);
    if (msg) field.querySelector('.err span').textContent = msg;
}

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();

        let ok = true;
        if (!nombre) { setFieldError('nombre', 'Falta el nombre'); ok = false; } else setFieldError('nombre', '');
        if (!EMAIL_RE.test(email)) { setFieldError('email', 'Correo inválido'); ok = false; } else setFieldError('email', '');
        if (mensaje.length < 10) { setFieldError('mensaje', 'Mínimo 10 caracteres'); ok = false; } else setFieldError('mensaje', '');

        if (!ok) return;

        const btn = document.getElementById('btn-enviar');
        btn.disabled = true;
        btn.textContent = '◌ Enviando...';

        try {
            if (window.emailjs) {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    from_name: nombre,
                    reply_to: email,
                    message: mensaje,
                });
            }
            form.reset();
            showToast('El cuervo levantó vuelo · respondo en 24h', false);
        } catch (err) {
            showToast('El cuervo no pudo partir · intentá de nuevo', true);
        } finally {
            btn.disabled = false;
            btn.textContent = '▸ Enviar pergamino';
        }
    });

    // Clear error on input
    form.querySelectorAll('input, textarea').forEach((el) => {
        el.addEventListener('input', () => setFieldError(el.name, ''));
    });
}

// ---------- Carousels ----------
document.querySelectorAll('.thumb-carousel').forEach((thumb) => {
    const track = thumb.querySelector('.carousel-track');
    const slides = thumb.querySelectorAll('.carousel-slide');
    const dots   = thumb.querySelectorAll('.carousel-dot');
    const prev   = thumb.querySelector('.carousel-prev');
    const next   = thumb.querySelector('.carousel-next');
    if (!track || slides.length < 2) return;

    let current = 0;

    const goTo = (idx) => {
        current = (idx + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    prev?.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
    next?.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });

    // Auto-advance (pausa al hacer hover)
    let autoTimer = setInterval(() => goTo(current + 1), 3200);
    thumb.addEventListener('mouseenter', () => clearInterval(autoTimer));
    thumb.addEventListener('mouseleave', () => {
        autoTimer = setInterval(() => goTo(current + 1), 3200);
    });
});
