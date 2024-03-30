let modal = document.getElementById('modal');
let closeBtn = document.getElementsByClassName('close')[0];
let botones = document.getElementsByClassName('boton_eliminar');

let eliminar = document.getElementById("eliminar_registro")
let cancelar = document.getElementById("cancelar_eliminacion")
// Mostrar la ventana emergente cuando se hace clic en el botón
// (Supongamos que el botón tiene la clase "eliminarRegistro")
for (let i=0; i<botones.length; i++) {
    botones[i].addEventListener('click', function(event){
        event.preventDefault() // Detenemos el envío de la etiqueta a
        let id = this.getAttribute('data-id'); // Obtenemos el id relacionado al botón presionado
        let urlBase = this.getAttribute('data-urlBase') // Obtenemos la urlBase
        eliminar.setAttribute('data-id', id); // Le seteamos el id y la urlBase al botón de eliminar de la ventana emergente
        eliminar.setAttribute('data-urlBase', urlBase);
        modal.style.display = 'block'; // Mostramos la ventana emergente
    })
}

eliminar.addEventListener('click', function(){
    let id = this.getAttribute('data-id'); // Obtenemos el id que nos seteó el botón de la tabla
    let urlBase = this.getAttribute('data-urlBase') // Obtenemos la url que nos seteó el botón de la tabla
    let url = urlBase + id; // Juntamos la url que de eliminación y el parámetro id
    window.location.href = url; // Asignamos la url al botón de eliminar de la ventana emergente
    modal.style.display = 'none';
})

cancelar.addEventListener('click', function(){
    eliminar.removeAttribute('data-id');
    eliminar.removeAttribute('data-urlBase'); // Eliminamos la URL y el ID seteados si se cancela la eliminación 
    modal.style.display = 'none';
})

// Ocultar la ventana emergente cuando se hace clic en el botón de cierre
closeBtn.onclick = function() {
    eliminar.removeAttribute('data-id');
    eliminar.removeAttribute('data-urlBase');
    modal.style.display = 'none';
}

// También puedes ocultar la ventana emergente haciendo clic fuera de ella
window.onclick = function(event) {
    if (event.target == modal) {
    eliminar.removeAttribute('data-id');
    eliminar.removeAttribute('data-urlBase');
    modal.style.display = 'none';
    }
}

