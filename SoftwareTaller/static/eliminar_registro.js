// Obtener botones de clientes.html
let botones = document.getElementsByClassName('boton_eliminar');

// Elementos de confirmar_eliminar.html
let modalConfirmarEliminar = document.getElementById('confirmar_eliminar');
let closeModalConfirmarEliminar = document.getElementById('close_confirmar_eliminar');
let mensajeModal = document.getElementById("mensaje_modal")
let eliminar = document.getElementById("eliminar_registro")
let cancelar = document.getElementById("cancelar_eliminacion")


// Mostrar la ventana emergente cuando se hace clic en el botón
for (let i=0; i<botones.length; i++) {
    botones[i].addEventListener('click', function(event){
        event.preventDefault() // Detenemos el envío de la etiqueta a
        let mensaje = this.getAttribute('data-mensaje') // Obtenemos el mensaje asociado al botón
        mensajeModal.textContent = "¿Estás seguro que deseas eliminar el registro del " + mensaje + "?"
        let url = this.getAttribute('data-url'); // Obtenemos el url relacionado al botón presionado
        eliminar.setAttribute('data-url', url); // Le seteamos el url al boton eliminar de la ventana emergente
        modalConfirmarEliminar.style.display = 'block'; // Mostramos la ventana emergente
    })
}

eliminar.addEventListener('click', function(){
    let url = this.getAttribute('data-url'); // Obtenemos la url que nos seteó el botón de la tabla
    window.location.href = url; // Asignamos la url al botón de eliminar de la ventana emergente
    modalConfirmarEliminar.style.display = 'none';
})

//Funciones para cerrar la ventana de confirmar_eliminar.html

cancelar.addEventListener('click', function(){
    eliminar.removeAttribute('data-url'); // Eliminamos la url seteada si se cancela la eliminación 
    modalConfirmarEliminar.style.display = 'none';
})

// Ocultar la ventana emergente cuando se hace clic en el botón de cierre
closeModalConfirmarEliminar.onclick = function() {
    eliminar.removeAttribute('data-url');
    modalConfirmarEliminar.style.display = 'none';
}

// También puedes ocultar la ventana emergente haciendo clic fuera de ella
window.onclick = function(event) {
    if (event.target == modalConfirmarEliminar) {
    eliminar.removeAttribute('data-url');
    modalConfirmarEliminar.style.display = 'none';
    }
}


