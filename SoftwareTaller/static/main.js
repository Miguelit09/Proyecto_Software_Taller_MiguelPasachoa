
// BOTON REGISTRAR --> ELEMENTOS

let botonRegistrar = document.getElementById('boton_registrar');
let modalRegistrar = document.getElementById('modal_registrar');
let closeRegistrar = document.getElementById('close_registrar');

// BOTON BUSCAR --> ELEMENTOS
let botonBuscar = document.getElementById('boton_buscar');
let modalBuscador = document.getElementById('modal_buscador');
let closeBuscador = document.getElementById('close_buscador');
let campo = document.getElementById('campo');
let contenedorBuscar = document.getElementById('contenedor_buscar');

// BOTON EDITAR --> ELEMENTOS

let botonesEditar = document.getElementsByClassName('boton_editar');
let modalEditar = document.getElementById('modal_editar');
let closeEditar = document.getElementById('close_editar');


// MODAL CONFIRMAR ELIMINACION --> ELEMENTOS
let modalConfirmarEliminar = document.getElementById('confirmar_eliminar');
// Obtener botones de clientes.html
let botonesEliminar = document.getElementsByClassName('boton_eliminar');
// Elementos de confirmar_eliminar.html
let closeModalConfirmarEliminar = document.getElementById('close_confirmar_eliminar');
let mensajeModal = document.getElementById("mensaje_modal")
let eliminar = document.getElementById("eliminar_registro")
let cancelar = document.getElementById("cancelar_eliminacion")


// REGISTRAR --> FUNCIONES

botonRegistrar.addEventListener("click", function(event) {
    event.preventDefault()
    modalRegistrar.style.display = "block";
})

closeRegistrar.onclick = function() {
    modalRegistrar.style.display = 'none';
}

// EDITAR --> FUNCIONES

for(let i = 0; i<botonesEditar.length; i++) {
    botonesEditar[i].addEventListener('click', function(event){ //Añadir el escuchar evento a todos los botones de la plantilla
        let registroId = this.getAttribute('data-registro-id');
        let tipoRegistro = this.getAttribute('data-tipo-registro');
        let url = `/obtener_cliente/${registroId}/`;
        fetch(url)
            .then(response => response.json())
            .then(datosRegistro => {
                document.getElementById('registro_id').value = datosRegistro.id
                // Aquí puedes acceder a los detalles del cliente en datosCliente
                if (tipoRegistro === "cliente"){
                    let inputs_nombre_cliente = document.getElementsByClassName('nombre_cliente');
                    let inputs_documento_identidad = document.getElementsByClassName('documento_identidad');
                    let inputs_correo_electronico = document.getElementsByClassName('correo_electronico');
                    let inputs_telefono = document.getElementsByClassName('telefono');
                    for (let i=0; i<inputs_nombre_cliente.length; i++) {
                        inputs_nombre_cliente[i].value = datosRegistro.nombre_cliente
                        inputs_documento_identidad[i].value = datosRegistro.documento_identidad
                        inputs_correo_electronico[i].value = datosRegistro.correo_electronico
                        inputs_telefono[i].value = datosRegistro.telefono
                    }
                }
                event.preventDefault(); // Detenemos el envío de la etiqueta a
                modalEditar.style.display = 'block';
            })
            .catch(error => console.error('Error al obtener detalles del cliente:', error));
        
    })
}

closeEditar.onclick = function() {
    modalEditar.style.display = 'none';
}

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
for (let i=0; i<botonesEliminar.length; i++) {
    botonesEliminar[i].addEventListener('click', function(event){ //Añadir el escuchar evento a todos los botones de la plantilla
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
    } else if (event.target == modalRegistrar) {
        modalRegistrar.style.display = 'none';
    } else if (event.target == modalEditar) {
        modalEditar.style.display = 'none';
    } 
}