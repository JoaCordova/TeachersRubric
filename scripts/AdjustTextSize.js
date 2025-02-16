window.addEventListener('load', function() {
  updateTextOnResize(); // Asegúrate de cambiar el texto cuando la página se carga
  window.addEventListener('resize', updateTextOnResize); // Para actualizar el texto al cambiar el tamaño de la ventana
});

// Función que cambia el texto en función del tamaño del contenedor
function updateTextOnResize() {
  const rectangles = document.querySelectorAll('.rectangle'); // Seleccionamos todos los elementos con la clase 'rectangle'
  
  rectangles.forEach(rectangle => {
    const width = rectangle.offsetWidth; // Obtenemos el ancho de cada 'rectangle'
    
    if (width < 200) { // Si el ancho es menor que 100px, cambiar el texto
      if (rectangle.innerText === "Ortografía") {
        rectangle.innerText = "O";
      } else if (rectangle.innerText === "Redacción") {
        rectangle.innerText = "R";
      } else if (rectangle.innerText === "Contenido") {
        rectangle.innerText = "C";
      } else if (rectangle.innerText === "Presentación") {
        rectangle.innerText = "P";
      }
    } else {
      // Si el ancho es mayor o igual a 100px, devolver al texto original
      if (rectangle.innerText === "O") {
        rectangle.innerText = "Ortografía";
      } else if (rectangle.innerText === "R") {
        rectangle.innerText = "Redacción";
      } else if (rectangle.innerText === "C") {
        rectangle.innerText = "Contenido";
      } else if (rectangle.innerText === "P") {
        rectangle.innerText = "Presentación";
      }
    }
  });
}
