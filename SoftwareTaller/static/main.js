
// BOTON BUSCAR --> ELEMENTOS
let botonBuscar = document.getElementById('boton_buscar')
let modalBuscador = document.getElementById('modal_buscador');
let closeBuscador = document.getElementById('close_buscador');
let campo = document.getElementById('campo');
let contenedorBuscar = document.getElementById('contenedor_buscar');

// MODAL CONFIRMAR ELIMINACION --> ELEMENTOS
let modalConfirmarEliminar = document.getElementById('confirmar_eliminar');
// Obtener botones de clientes.html
let botones = document.getElementsByClassName('boton_eliminar');
// Elementos de confirmar_eliminar.html
let closeModalConfirmarEliminar = document.getElementById('close_confirmar_eliminar');
let mensajeModal = document.getElementById("mensaje_modal")
let eliminar = document.getElementById("eliminar_registro")
let cancelar = document.getElementById("cancelar_eliminacion")


// BUSCADOR --> FUNCIONES

//Aparecer el buscador al presionar el botón
botonBuscar.addEventListener("click", function(event) {
    event.preventDefault()
    modalBuscador.style.display = "block";
})

campo.addEventListener("change", function(){
    generarInput(campo, contenedorBuscar);
});

// Cerrar buscador al darle a la X
closeBuscador.onclick = function() {
    modalBuscador.style.display = 'none';
}
// Función para que el input de buscar varíe entre select e input dependiendo del campo a buscar

function generarInput(campo, contenedorBuscar) {
    let campoSeleccionado = campo.value;
    contenedorBuscar.innerHTML = '';

    if (campoSeleccionado === "tipo_producto") {
        let select = document.createElement("select");
        let opciones = ["Llanta", "Aceite", "Filtro", "Grasa"];
        for (let i=0; i<opciones.length; i++) {
            let opcion = document.createElement("option");
            opcion.textContent = opciones[i]
            select.classList.add("card__input_form", "heigth_input_18");
            select.id = "buscar";
            select.name = "buscar";
            select.type = "text";
            select.appendChild(opcion)
        }

        contenedorBuscar.appendChild(select);
    } else {
        let input = document.createElement("input")
        input.classList.add("card__input_form", "heigth_input_18");
        input.id = "buscar";
        input.name = "buscar";
        input.type = "text";
        contenedorBuscar.appendChild(input);
    }
}

if (contenedorBuscar != null) {
    generarInput(campo, contenedorBuscar)
}



// MODAL CONFIRMAR ELIMINACIÓN --> FUNCIONES

// Mostrar la ventana emergente cuando se hace clic en el botón de eliminar
for (let i=0; i<botones.length; i++) {
    botones[i].addEventListener('click', function(event){ //Añadir el escuchar evento a todos los botones de la plantilla
        event.preventDefault() // Detenemos el envío de la etiqueta a
        let mensaje = this.getAttribute('data-mensaje') // Obtenemos el mensaje asociado al botón
        mensajeModal.textContent = "¿Estás seguro que deseas eliminar el registro del " + mensaje + "?"
        let url = this.getAttribute('data-url'); // Obtenemos el url relacionado al botón presionado
        eliminar.setAttribute('data-url', url); // Le seteamos el url al boton eliminar de la ventana emergente
        modalConfirmarEliminar.style.display = 'block'; // Mostramos la ventana emergente
    })
}
// Eliminar registro al clickear en el botón Eliminar
eliminar.addEventListener('click', function(){
    let url = this.getAttribute('data-url'); // Obtenemos la url que nos seteó el botón de la tabla
    window.location.href = url; // Asignamos la url al botón de eliminar de la ventana emergente
    modalConfirmarEliminar.style.display = 'none';
})

//Ocultar modal de eliminar al clickear el botón Cancelar

cancelar.addEventListener('click', function(){
    eliminar.removeAttribute('data-url'); // Eliminamos la url seteada si se cancela la eliminación 
    modalConfirmarEliminar.style.display = 'none';
})

// Ocultar modal de eliminar al clickear la X
closeModalConfirmarEliminar.onclick = function() {
    eliminar.removeAttribute('data-url');
    modalConfirmarEliminar.style.display = 'none';
}

// Ocultar cualquiera de los modales clickeando por fuera de ellos
window.onclick = function(event) {
    if (event.target == modalBuscador) {
        modalBuscador.style.display = 'none';
    } else if (event.target == modalConfirmarEliminar) {
        eliminar.removeAttribute('data-url');
        modalConfirmarEliminar.style.display = 'none';
    }
}