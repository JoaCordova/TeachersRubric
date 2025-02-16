document.addEventListener('keydown', function(event) {
  const actions = {
    'q': 0.5,  
    'w': 0.5,  
    'e': 0.5,  
    'r': 0.5,  
    'a': -0.5, 
    's': -0.5, 
    'd': -0.5, 
    'f': -0.5, 
    'c': 'copy' 
  };

  if (actions[event.key] !== undefined) {
    let sound;

    // Si la tecla presionada es 'c', reproducir un sonido diferente
    if (actions[event.key] === 'copy') {
      sound = new Audio('assets/sounds/copy.mp3');
      sound.play();
      copyToClipboard(); 
    } else {
      sound = new Audio('assets/sounds/sound.mp3');
      sound.play();
      
      const change = actions[event.key];
      let operation = change > 0 ? 'increase' : 'decrease';
      let index;
      if (event.key === 'q' || event.key === 'a') index = 0;
      else if (event.key === 'w' || event.key === 's') index = 1;
      else if (event.key === 'e' || event.key === 'd') index = 2;
      else if (event.key === 'r' || event.key === 'f') index = 3;

      updateRectangle(index, operation, change);
    }
  }

  if (event.key === 'x' || event.key === 'X') {
    location.reload();
  }
});

// Array para almacenar los valores de cada rectángulo (textarea)
let values = [2, 3, 3, 2]; 

// Definir el rango de cada rectángulo
const ranges = [
  { min: 0, max: 2 }, 
  { min: 0, max: 3 }, 
  { min: 0, max: 3 }, 
  { min: 0, max: 2 }
];

// Función para actualizar el valor de los rectángulos
function updateRectangle(index, operation, change) {
  values[index] = Math.min(Math.max(values[index] + change, ranges[index].min), ranges[index].max);

  for (let i = 0; i < 4; i++) {
    document.getElementById('rectangle' + (i + 1)).value = formatValue(values[i]);
  }

  updateRubro();
}

// Función para formatear los valores de los rectángulos
function formatValue(value) {
  if (value === 1 || value === 2 || value === 3) {
    return value.toFixed(0);
  }
  return value.toFixed(1);
}

// Función para actualizar la cadena de resultados de la rúbrica
function updateRubro() {
  const results = values.map((value) => formatValue(value));
  const nota = results.reduce((sum, value) => sum + parseFloat(value), 0);
  const rubricaString = `Rúbrica: O(${results[0]})R(${results[1]})C(${results[2]})P(${results[3]}). Nota: ${nota}.`;

  const finalMessage = values[0] === 0 ? " Mejorar ortografía." : "";
  
  document.querySelector('.centered-textarea').value = rubricaString + finalMessage;
}

// Inicializar los valores y la rúbrica al cargar la página
window.addEventListener('load', function() {
  for (let i = 0; i < 4; i++) {
    document.getElementById('rectangle' + (i + 1)).value = formatValue(values[i]);
  }
  updateRubro();
});

// Función para copiar al portapapeles
function copyToClipboard() {
  const rubricaText = document.querySelector('.centered-textarea').value;
  navigator.clipboard.writeText(rubricaText).then(function() {
    // Mostrar la notificación
    const notification = document.getElementById('notification');
    notification.style.display = 'block';  // Asegúrate de que se muestre
    notification.classList.add('show');    // Añadir la clase que hace visible la notificación

    // Ocultar la notificación después de 2 segundos (tiempo de visualización)
    setTimeout(function() {
      notification.classList.remove('show');  // Remover la clase que hace visible
      setTimeout(() => notification.style.display = 'none', 500);  // Ocultar después de la transición de opacidad
    }, 2000);  // 2 segundos para que esté visible antes de desaparecer
  }).catch(function(error) {
    console.error('Error al copiar el texto: ', error);
  });
}


// Event listener para el clic en el ícono de copiar
document.querySelector('.copy-icon').addEventListener('click', copyToClipboard);

