window.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const btn = document.getElementById('btnToggle');
    const elementos = document.querySelectorAll('.darkmode');
    const STORAGE_KEY = "darkmode-activo";
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function setDarkOn() {
        elementos.forEach(el => el.classList.add('invertido'));
    }
    function setDarkOff() {
        elementos.forEach(el => el.classList.remove('invertido'));
    }

    function applyPreference(pref) {
        if (pref === 'dark') setDarkOn();
        else setDarkOff();
    }

    function toggleDarkMode() {
        if (!elementos.length) return;
        const activo = elementos[0].classList.contains("invertido");
        if (activo) {
            setDarkOff();
            localStorage.setItem(STORAGE_KEY, "no");
        } else {
            setDarkOn();
            localStorage.setItem(STORAGE_KEY, "sí");
        }
    }

    if (btn) btn.addEventListener('click', toggleDarkMode);

    // Inicialización:
    // 1) Si el usuario ya eligió (localStorage) -> respetar
    // 2) Si no, usar la preferencia del sistema
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "sí") {
        applyPreference('dark');
    } else if (stored === "no") {
        applyPreference('light');
    } else {
        applyPreference(prefersDark.matches ? 'dark' : 'light');
    }

    // Si el usuario no seleccionó manualmente, actualizar según cambios del sistema
    prefersDark.addEventListener('change', (e) => {
        const storedNow = localStorage.getItem(STORAGE_KEY);
        if (!storedNow) {
            applyPreference(e.matches ? 'dark' : 'light');
        }
    });

    // Scroll a una sección
    document.getElementById('scroll1')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('scroll1')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('btn-scroll2')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('scroll2')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('btn-scroll3')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('scroll3')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('btn-scroll4')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('scroll3')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('link-changelog')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('changes')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Nav toggle responsive
    document.getElementById('nav-toggle')?.addEventListener('click', function() {
        document.getElementById('nav-links')?.classList.toggle('active');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href === '#!') return;
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            // altura de la barra fija
            const nav = document.getElementById('nav-bar');
            const navHeight = nav ? nav.getBoundingClientRect().height : 0;

            const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8; // pequeño margen

            window.scrollTo({
                top: Math.max(0, top),
                behavior: 'smooth'
            });

            // accesibilidad: mover foco al elemento destino
            const prevTab = target.getAttribute('tabindex');
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            if (prevTab === null) target.removeAttribute('tabindex');
            else target.setAttribute('tabindex', prevTab);

            // si el menú móvil está abierto, ciérralo
            document.getElementById('nav-links')?.classList.remove('active');
        });
    });
});