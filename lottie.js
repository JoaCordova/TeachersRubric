  // Función para alternar entre el modo claro y oscuro
  function darkMode() {
    const body = document.body; // Obtener el elemento body

    // Alternar la clase 'darkMode' en el body
    body.classList.toggle('darkMode');

    // Detener la animación actual
    animation.destroy();

    // Cambiar la animación dependiendo del modo
    if (body.classList.contains('darkMode')) {
      // Si está activado el modo oscuro, carga la animación de la luna
      animation = lottie.loadAnimation({
        container: document.getElementById('lottieContainer'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/lottie/moon.json' // Animación de luna (modo oscuro)
      });
    } else {
      // Si no está activado el modo oscuro, carga la animación del sol
      animation = lottie.loadAnimation({
        container: document.getElementById('lottieContainer'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/lottie/sun.json' // Animación de sol (modo claro)
      });
    }
  }

  // Hacer que el contenedor Lottie actúe como el botón de cambio de modo
  document.getElementById('lottieContainer').onclick = darkMode;
};
