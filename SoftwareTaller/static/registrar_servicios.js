let botonCliente = document.getElementById('boton_cliente');

let modalAsignarCliente = document.getElementById('modal_asignar_cliente');
let closeModalAsignarCliente = document.getElementById('close_modal_asignar_cliente');

// Cerrar modal de asignar cliente al clickear fuera de él
closeModalAsignarCliente.onclick = function() {
    modalAsignarCliente.style.display = 'none';
};

// Ocultar cualquiera de los modales clickeando por fuera de ellos
window.onclick = function(event) {
    if (event.target == modalAsignarCliente) {
        modalAsignarCliente.style.display = 'none';
    } // else if (event.target == modalConfirmarEliminar) {
    //     eliminar.removeAttribute('data-url');
    //     modalConfirmarEliminar.style.display = 'none';
    // }
};

botonCliente.addEventListener("click", function(event) {
    event.preventDefault();
    modalAsignarCliente.style.display = 'block';
});