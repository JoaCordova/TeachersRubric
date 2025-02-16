// Mostrar el contenedor de mensajes al hacer clic en el ícono de información
document.querySelector('.info-icon').addEventListener('click', function() {
  document.querySelector('.message-container').style.display = 'block';
});

// Cerrar el contenedor de mensajes al hacer clic en el botón de cierre
document.querySelector('.close-button').addEventListener('click', function() {
  document.querySelector('.message-container').style.display = 'none';
});
