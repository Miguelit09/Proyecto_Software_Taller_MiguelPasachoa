// Elementos del mensaje
let modalMensajeAccion = document.getElementById('mensaje_accion')
let aceptar = document.getElementById('boton_aceptar')

//Funciones para cerrar la ventana de mensaje

aceptar.addEventListener('click', function(){
    modalMensajeAccion.style.display = 'none';
})

