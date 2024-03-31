
let close = document.getElementById('close');

close.onclick = function() {
    modalBuscadorClientes.style.display = 'none';
}

// También puedes ocultar la ventana emergente haciendo clic fuera de ella
window.onclick = function(event) {
    if (event.target == modalBuscadorClientes) {
    modalBuscadorClientes.style.display = 'none';
    }
}
