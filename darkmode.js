function detectSystemMode() {
    const body = document.body;
    const darkModePreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (darkModePreferred) {
        body.classList.add('darkmode');
    } else {
        body.classList.remove('darkmode');
    }
}

// Cambiar manualmente
function darkmode() {
    const body = document.body;
    body.classList.toggle('darkmode');
}

// Detectar la preferencia del sistema cuando se carga la página
window.addEventListener('load', detectSystemMode);

// Detectar si el usuario cambia la preferencia del sistema (en tiempo real)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectSystemMode);
