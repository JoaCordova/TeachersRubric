let animation; // Variable para almacenar la animación actual

// ============================================
// Función para cargar la animación Lottie
// ============================================
function loadLottie(path) {
    if (animation) {
        animation.destroy(); // Destruir la animación previa si existe
    }
    animation = bodymovin.loadAnimation({
        container: document.getElementById('animation-container'), 
        path: path,
        renderer: 'svg', 
        loop: true, 
        autoplay: true,
        name: 'demo animation' // Asignamos el nombre de la animación
    });
}

// ============================================
// Función para detectar el modo del sistema
// ============================================
function detectSystemMode() {
    const darkModePreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Si el sistema tiene preferencia por el modo oscuro, cargamos la animación correspondiente
    if (darkModePreferred) {
        document.body.classList.add('darkmode');
        loadLottie('assets/lottie/moon.json'); // Cargar la animación para el modo oscuro
    } else {
        document.body.classList.remove('darkmode');
        loadLottie('assets/lottie/sun.json'); // Cargar la animación para el modo claro
    }
}

// ============================================
// Función para cambiar el modo manualmente
// ============================================
function darkmode() {
    const body = document.body;
    body.classList.toggle('darkmode'); 
    if (body.classList.contains('darkmode')) {
        loadLottie('assets/lottie/moon.json'); // Cargar la animación de la luna (modo oscuro)
    } else {
        loadLottie('assets/lottie/sun.json'); // Cargar la animación del sol (modo claro)
    }
}

// ============================================
// Detectar la preferencia del sistema cuando se carga la página
// ============================================
window.addEventListener('load', function() {
    detectSystemMode(); // Detectar el modo del sistema
});

// ============================================
// Detectar si el usuario cambia la preferencia del sistema en tiempo real
// ============================================
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectSystemMode);

// ============================================
// Iniciar la animación con el modo inicial
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadLottie('assets/lottie/sun.json'); // Por defecto, se carga el modo claro
});
