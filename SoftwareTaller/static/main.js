// Background encabezado

window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    var bodyBackground = getComputedStyle(document.body).backgroundColor; // Obtiene el color de fondo del body
    header.style.backgroundColor = bodyBackground; // Aplica el color de fondo al header
});



// Boton buscar
let botonBuscar = document.getElementById('boton_buscar')
let modalBuscadorClientes = document.getElementById('buscador_clientes');

botonBuscar.addEventListener("click", function(event) {
    event.preventDefault()
    modalBuscadorClientes.style.display = "block";
})