document.addEventListener('keydown', function(event) {
    const validKeys = ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f'];

    if (validKeys.includes(event.key.toLowerCase())) {
        const sound = new Audio('assets/sounds/sound.mp3');
        sound.play();
    }

    // X para recargar la página
    if (event.key === 'x' || event.key === 'X') {
        location.reload();
    }
});

// Array para almacenar los valores de cada rectángulo (textarea)
let values = [2, 3, 3, 2];  // [Rectángulo 1, Rectángulo 2, Rectángulo 3, Rectángulo 4]

// Definir el rango de cada rectángulo
const ranges = [
  { min: 0, max: 2 }, // Rectángulo 1 (O)
  { min: 0, max: 3 }, // Rectángulo 2 (R)
  { min: 0, max: 3 }, // Rectángulo 3 (C)
  { min: 0, max: 2 }  // Rectángulo 4 (P)
];

// Función para actualizar el valor de los rectángulos
function updateRectangle(index, operation) {
  const change = operation === 'increase' ? 0.5 : -0.5; // Definir el cambio según la operación (incremento o decremento)
  
  // Limitar el valor de cada rectángulo
  values[index] = Math.min(Math.max(values[index] + change, ranges[index].min), ranges[index].max);

  // Actualizar los valores de los rectángulos en la interfaz
  for (let i = 0; i < 4; i++) {
    document.getElementById('rectangle' + (i + 1)).value = formatValue(values[i]);
  }

  // Actualizar la cadena con los nuevos resultados
  updateRubro();
}

// Función para formatear los valores de los rectángulos
function formatValue(value) {
  // Si el valor es entero (1, 2, o 3), se muestra sin decimales
  if (value === 1 || value === 2 || value === 3) {
    return value.toFixed(0);
  }
  // Si no es entero, mostrar un decimal (por ejemplo, 0.5)
  return value.toFixed(1);
}

// Función para actualizar la cadena de resultados de la rúbrica
function updateRubro() {
  // Usar los valores directamente de los rectángulos para la rúbrica
  const results = values.map((value) => formatValue(value));

  // Calcular la nota (puedes ajustarla como necesites, aquí sumo los valores)
  const nota = results.reduce((sum, value) => sum + parseFloat(value), 0);

  // Crear la cadena con los resultados y la nota
  const rubricaString = `Rúbrica: O(${results[0]})R(${results[1]})C(${results[2]})P(${results[3]}). Nota: ${nota}.`;

  // Mostrar la cadena en el textarea con la clase 'centered-textarea'
  document.querySelector('.centered-textarea').value = rubricaString;
}

// TECLAS
document.addEventListener('keydown', function(event) {
  const actions = {
    'q': 0, 'w': 1, 'e': 2, 'r': 3,  // Incrementar
    'a': 0, 's': 1, 'd': 2, 'f': 3,  // Decrementar
    'c': 'copy' // Tecla C para copiar
  };

  if (actions[event.key] !== undefined) {
    if (actions[event.key] === 'copy') {
      copyToClipboard(); // Si la tecla es C, copiar
    } else {
      const operation = event.key === 'a' || event.key === 's' || event.key === 'd' || event.key === 'f' ? 'decrease' : 'increase';
      updateRectangle(actions[event.key], operation);
    }
  }
});

// Inicializar los valores y la rúbrica al cargar la página
window.addEventListener('load', function() {
  // Mostrar los valores iniciales en los rectángulos
  for (let i = 0; i < 4; i++) {
    document.getElementById('rectangle' + (i + 1)).value = formatValue(values[i]);
  }
  // Actualizar la rúbrica con los valores iniciales
  updateRubro();
});

function copyToClipboard() {
  const rubricaText = document.querySelector('.centered-textarea').value; // Obtener el texto de la rúbrica
  navigator.clipboard.writeText(rubricaText).then(function() {
    alert('Texto copiado al portapapeles'); // Mensaje de éxito (puedes personalizarlo)
  }).catch(function(error) {
    console.error('Error al copiar el texto: ', error); // Manejo de error
  });
}

// Event listener para el clic en el ícono de copiar
document.querySelector('.copy-icon').addEventListener('click', copyToClipboard);
