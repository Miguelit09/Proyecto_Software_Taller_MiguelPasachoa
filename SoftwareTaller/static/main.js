let botonBuscar = document.getElementById('boton_buscar')
let modalBuscadorClientes = document.getElementById('buscador_clientes');

botonBuscar.addEventListener("click", function(event) {
    event.preventDefault()
    modalBuscadorClientes.style.display = "block";
})