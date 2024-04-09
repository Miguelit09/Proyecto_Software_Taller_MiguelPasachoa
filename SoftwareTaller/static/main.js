let baseURL = "http://127.0.0.1:8000/";
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
let cancelarEditar = document.getElementById('cancelar_editar');

// MODAL CONFIRMAR ELIMINACION --> ELEMENTOS
let modalConfirmarEliminar = document.getElementById('confirmar_eliminar');
// Obtener botones de clientes.html
let botonesEliminar = document.getElementsByClassName('boton_eliminar');
// Elementos de confirmar_eliminar.html
let closeModalConfirmarEliminar = document.getElementById('close_confirmar_eliminar');
let mensajeModal = document.getElementById("mensaje_modal")
let eliminar = document.getElementById("eliminar_registro")
let cancelar = document.getElementById("cancelar_eliminacion")

// ASIGNAR CLIENTE AL SERVICIO --> ELEMENTOS

let botonCliente = document.getElementById('boton_cliente');
let inputCliente = document.getElementById('input_cliente');
let modalAsignarCliente = document.getElementById('modal_asignar_cliente');
let closeModalAsignarCliente = document.getElementById('close_modal_asignar_cliente');
let campoBuscarDI = document.getElementById('campo_buscar_di');
let modalRegistrarClienteDesdeServicios = document.getElementById('modal_registrar_cliente_desde_servicios');
let closeModalRegistrarClienteDesdeServicios = document.getElementById('close_modal_registrar_cliente_desde_servicios');

// ASIGNAR PRODUCTOS AL SERVICIO --> ELEMENTOS

let botonProductos = document.getElementById('boton_productos');
let inputProductos = document.getElementById('input_productos');
let modalAsignarProductos = document.getElementById('modal_asignar_productos');
let closeModalAsignarProductos = document.getElementById('close_modal_asignar_productos');
let campoBuscarReferencia = document.getElementById('campo_buscar_referencia');
let modalRegistrarProductosDesdeServicios = document.getElementById('modal_registrar_productos_desde_servicios');
let closeModalRegistrarProductosDesdeServicios = document.getElementById('close_modal_registrar_productos_desde_servicios');

// REGISTRAR --> FUNCIONES

botonRegistrar.addEventListener("click", function (event) {
  event.preventDefault()
  modalRegistrar.style.display = "block";
})

closeRegistrar.onclick = function () {
  modalRegistrar.style.display = 'none';
}

// EDITAR --> FUNCIONES

if (botonesEditar.length != 0) {
  for (let i = 0; i < botonesEditar.length; i++) {
    botonesEditar[i].addEventListener('click', function (event) { //Añadir el escuchar evento a todos los botones de la plantilla
      let registroId = this.getAttribute('data-registro-id');
      let appRegistro = this.getAttribute('data-app-registro');
      let url = `${baseURL}${appRegistro}/obtener_registro_${appRegistro}/${registroId}/`;
      fetch(url)
        .then(response => response.json())
        .then(datosRegistro => {
          document.getElementById('registro_id').value = datosRegistro.id
          // Aquí puedes acceder a los detalles del cliente en datosCliente
          if (appRegistro === "clientes") {
            let inputs_nombre_cliente = document.getElementsByClassName('nombre_cliente');
            let inputs_documento_identidad = document.getElementsByClassName('documento_identidad');
            let inputs_correo_electronico = document.getElementsByClassName('correo_electronico');
            let inputs_telefono = document.getElementsByClassName('telefono');
            for (let i = 0; i < inputs_nombre_cliente.length; i++) {
              inputs_nombre_cliente[i].value = datosRegistro.nombre_cliente;
              inputs_documento_identidad[i].value = datosRegistro.documento_identidad;
              inputs_correo_electronico[i].value = datosRegistro.correo_electronico;
              inputs_telefono[i].value = datosRegistro.telefono;
            }
          } else if (appRegistro == "inventario") {
            let inputs_marca = document.getElementsByClassName('marca');
            let inputs_referencia = document.getElementsByClassName('referencia');
            let inputs_tipo_producto = document.getElementsByClassName('tipo_producto');
            let inputs_precio = document.getElementsByClassName('precio');
            let inputs_unidades_disponibles = document.getElementsByClassName('unidades_disponibles');
            for (let i = 0; i < inputs_marca.length; i++) {
              inputs_marca[i].value = datosRegistro.marca;
              inputs_referencia[i].value = datosRegistro.referencia;
              inputs_tipo_producto[i].value = datosRegistro.tipo_producto;
              inputs_precio[i].value = datosRegistro.precio;
              inputs_unidades_disponibles[i].value = datosRegistro.unidades_disponibles;
            }
          }
          event.preventDefault(); // Detenemos el envío de la etiqueta a
          modalEditar.style.display = 'block';
        })
        .catch(error => console.error('Error al obtener detalles del cliente:', error));

    })
  }

  closeEditar.onclick = function () {
    modalEditar.style.display = 'none';
  }
  cancelarEditar.onclick = function (event) {
    event.preventDefault();
    modalEditar.style.display = 'none';
  }
}


// BUSCADOR --> FUNCIONES

//Aparecer el buscador al presionar el botón
botonBuscar.addEventListener("click", function (event) {
  event.preventDefault()
  modalBuscador.style.display = "block";
});

if (campo != null) {
  campo.addEventListener("change", function () {
    generarInput(campo, contenedorBuscar);
  });
  closeBuscador.onclick = function () {
    modalBuscador.style.display = 'none';
  };
};

// Cerrar buscador al darle a la X

// Función para que el input de buscar varíe entre select e input dependiendo del campo a buscar

function generarInput(campo, contenedorBuscar) {
  let campoSeleccionado = campo.value;
  contenedorBuscar.innerHTML = '';

  if (campoSeleccionado === "tipo_producto") {
    let select = document.createElement("select");
    let opciones = ["Llanta", "Aceite", "Filtro", "Grasa"];
    for (let i = 0; i < opciones.length; i++) {
      let opcion = document.createElement("option");
      opcion.textContent = opciones[i]
      select.classList.add("card__input_form", "heigth_input_18");
      select.id = "buscar";
      select.name = "buscar";
      select.type = "text";
      select.appendChild(opcion)
    }

    contenedorBuscar.appendChild(select);
  } else if (campoSeleccionado === "precio" || campoSeleccionado === "unidades_disponibles") {
    let divMenorIgual = document.createElement("div");
    let divMayorIgual = document.createElement("div");
    let labelMenorIgual = document.createElement("label");
    let labelMayorIgual = document.createElement("label");
    let menorIgual = document.createElement("input");
    let input = document.createElement("input")
    let mayorIgual = document.createElement("input");
    divMenorIgual.className = "div_radio_inputs";
    divMayorIgual.className = "div_radio_inputs";
    labelMenorIgual.textContent = "Menores";
    labelMayorIgual.textContent = "Mayores";
    labelMenorIgual.setAttribute("for", "menor_igual");
    labelMayorIgual.setAttribute("for", "mayor_igual");
    labelMenorIgual.classList.add("card__input_form", "heigth_input_18")
    input.classList.add("card__input_form", "heigth_input_18");
    labelMayorIgual.classList.add("card__input_form", "heigth_input_18")
    menorIgual.value = "menor_igual";
    mayorIgual.value = "mayor_igual";
    menorIgual.type = "radio";
    input.id = "buscar";
    input.name = "buscar";
    input.type = "text";
    mayorIgual.type = "radio";
    menorIgual.name = "filtro";
    mayorIgual.name = "filtro";
    menorIgual.id = "menor_igual";
    mayorIgual.id = "mayor_igual";
    menorIgual.className = "input_oculto";
    mayorIgual.className = "input_oculto";
    menorIgual.checked = true
    divMenorIgual.appendChild(menorIgual);
    divMenorIgual.appendChild(labelMenorIgual);
    divMayorIgual.appendChild(mayorIgual);
    divMayorIgual.appendChild(labelMayorIgual);
    contenedorBuscar.appendChild(divMenorIgual);
    contenedorBuscar.appendChild(input);
    contenedorBuscar.appendChild(divMayorIgual);
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
if (botonesEliminar.length != 0) {
  for (let i = 0; i < botonesEliminar.length; i++) {
    botonesEliminar[i].addEventListener('click', function (event) { //Añadir el escuchar evento a todos los botones de la plantilla
      event.preventDefault() // Detenemos el envío de la etiqueta a
      let mensaje = this.getAttribute('data-mensaje') // Obtenemos el mensaje asociado al botón
      mensajeModal.textContent = "¿Estás seguro que deseas eliminar el registro del " + mensaje + "?"
      let url = this.getAttribute('data-url'); // Obtenemos el url relacionado al botón presionado
      eliminar.setAttribute('data-url', url); // Le seteamos el url al boton eliminar de la ventana emergente
      modalConfirmarEliminar.style.display = 'block'; // Mostramos la ventana emergente
    })
  }
  // Eliminar registro al clickear en el botón Eliminar
  eliminar.addEventListener('click', function () {
    let url = this.getAttribute('data-url'); // Obtenemos la url que nos seteó el botón de la tabla
    window.location.href = url; // Asignamos la url al botón de eliminar de la ventana emergente
    modalConfirmarEliminar.style.display = 'none';
  })

  //Ocultar modal de eliminar al clickear el botón Cancelar

  cancelar.addEventListener('click', function () {
    eliminar.removeAttribute('data-url'); // Eliminamos la url seteada si se cancela la eliminación 
    modalConfirmarEliminar.style.display = 'none';
  })

  // Ocultar modal de eliminar al clickear la X
  closeModalConfirmarEliminar.onclick = function () {
    eliminar.removeAttribute('data-url');
    modalConfirmarEliminar.style.display = 'none';
  }
}
// Mostrar la ventana emergente cuando se hace clic en el botón de eliminar


// Ocultar cualquiera de los modales clickeando por fuera de ellos
window.onclick = function (event) {
  if (event.target == modalBuscador) {
    modalBuscador.style.display = 'none';
  } else if (event.target == modalConfirmarEliminar) {
    eliminar.removeAttribute('data-url');
    modalConfirmarEliminar.style.display = 'none';
  } else if (event.target == modalRegistrar) {
    modalRegistrar.style.display = 'none';
  } else if (event.target == modalEditar) {
    modalEditar.style.display = 'none';
  }else if(event.target == modalAsignarCliente) {
    modalAsignarCliente.style.display = 'none';
  } else if(event.target == modalRegistrarClienteDesdeServicios) {
    modalRegistrarClienteDesdeServicios.style.display = 'none';
  } else if(event.target == modalAsignarProductos) {
    modalAsignarProductos.style.display = 'none';
  } else if(event.target == modalRegistrarProductosDesdeServicios) {
    modalRegistrarProductosDesdeServicios.style.display = 'none';
  }
}

// ASIGNAR CLIENTE AL SERVICIO --> FUNCIONES


if (botonCliente != null) {
  // Cerrar modal de asignar cliente al clickear fuera de él
  closeModalAsignarCliente.onclick = function () {
    modalAsignarCliente.style.display = 'none';
  };

  // Ocultar cualquiera de los modales clickeando por fuera de ellos

  botonCliente.addEventListener("click", function (event) {
    event.preventDefault();
    modalAsignarCliente.style.display = 'block';
  });

  campoBuscarDI.addEventListener('input', function() {
    const valorBuscar = campoBuscarDI.value.trim(); // Obtener el valor del campo y eliminar espacios en blanco al principio y al final
    if (valorBuscar.length >=4) {
      buscarAsignacionCliente();
    }
  });
}

function buscarAsignacionCliente() {
  const valorBuscar = campoBuscarDI.value;
  const urlBuscarAsignacionCliente = `${baseURL}/servicios/buscar_asignacion_cliente/?buscar=${valorBuscar}`;
  fetch(urlBuscarAsignacionCliente)
        .then(response => response.json())
        .then(data => {
            // Obtener la tabla y las celdas de encabezado
            const tablaRegistros = document.getElementById('tabla_registros__tabla_modal_clientes');
            const celdasEncabezado = tablaRegistros.querySelector('.celdas_encabezado');

            // Limpiar las filas de datos
            const filasDatos = tablaRegistros.querySelectorAll('.celdas_datos');
            filasDatos.forEach(fila => fila.remove());
            if (data.length > 0) {
              data.forEach(cliente => { // Recorrer los datos obtenidos y agregar filas de datos a la tabla
                const nuevaFila = `
                    <tr class="celdas_datos">
                        <td class="celda tabla_registros__celda_id_modal">${cliente.id}</td>
                        <td class="celda tabla_registros__celda_nombre_modal">${cliente.nombre_cliente}</td>
                        <td class="celda tabla_registros__celda_numero_di_modal">${cliente.documento_identidad}</td>
                        <td class="celda tabla_registros__celda_asignar"><a href="#" data-numero-di="${cliente.documento_identidad}" class="tabla_registros__boton boton_asignar"><img src="/static/images/logo_mas.png" alt="asignar" class="tabla_registros__logo_boton tabla_registros__asignar"></a></td>
                    </tr>
                `;
                tablaRegistros.insertAdjacentHTML('beforeend', nuevaFila);
            });
            const botonesAsignar = document.querySelectorAll('.boton_asignar');
            botonesAsignar.forEach(boton => {
              boton.addEventListener('click', function(event){
                event.preventDefault();
                inputCliente.value = boton.getAttribute('data-numero-di');
                modalAsignarCliente.style.display = 'none';
              })
            })
            
            // Reinsertar las celdas de encabezado
            tablaRegistros.insertBefore(celdasEncabezado, tablaRegistros.firstChild);
          } else {
            // Crea una fila para el mensaje
            const filaMensaje = document.createElement('tr');
            filaMensaje.classList.add('celdas_datos');
            // Crea una celda que ocupe todo el ancho de la tabla
            const celdaMensaje = document.createElement('td');
            celdaMensaje.setAttribute('colspan', '3'); // Ajusta el número de columnas según tu tabla
            celdaMensaje.textContent = 'No se encontraron resultados de clientes. ';
            const enlaceAgregarCliente = document.createElement('a');
            enlaceAgregarCliente.href = '#'; // Agrega aquí la URL a la que quieres que el enlace redirija
            enlaceAgregarCliente.textContent = 'Click aquí para registrar cliente.'; // Texto del enlace
            celdaMensaje.appendChild(enlaceAgregarCliente); // Agrega el enlace al párrafo
            // Agrega la celda al fila
            filaMensaje.appendChild(celdaMensaje);
            // Inserta la fila en la tabla
            tablaRegistros.appendChild(filaMensaje);
            enlaceAgregarCliente.addEventListener("click", function (event) {
              event.preventDefault();
              modalRegistrarClienteDesdeServicios.style.display = "block";
            })
            
            closeModalRegistrarClienteDesdeServicios.onclick = function () {
              modalRegistrarClienteDesdeServicios.style.display = 'none';
            }
          }
        })
        .catch(error => console.error('Error al buscar clientes:', error));
}

// ASIGNAR PRODUCTOS AL SERVICIO --> FUNCIONES

if (botonProductos != null) {
  // Cerrar modal de asignar productos al clickear fuera de él
  closeModalAsignarProductos.onclick = function () {
    modalAsignarProductos.style.display = 'none';
  };

  // Ocultar cualquiera de los modales clickeando por fuera de ellos

  botonProductos.addEventListener("click", function (event) {
    event.preventDefault();
    modalAsignarProductos.style.display = 'block';
  });


  campoBuscarReferencia.addEventListener('input', function() {
    const valorBuscar = campoBuscarReferencia.value.trim();
    if (valorBuscar.length >=3) {
      buscarAsignacionProductos();
    }
  });
}

function buscarAsignacionProductos() {
  const valorBuscar = campoBuscarReferencia.value;
  const urlBuscarAsignacionProductos = `${baseURL}/servicios/buscar_asignacion_productos/?buscar=${valorBuscar}`;
  fetch(urlBuscarAsignacionProductos)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Obtener la tabla y las celdas de encabezado
            const tablaRegistros = document.getElementById('tabla_registros__tabla_modal_productos');
            console.log(tablaRegistros)
            const celdasEncabezado = tablaRegistros.querySelector('.celdas_encabezado');

            // Limpiar las filas de datos
            const filasDatos = tablaRegistros.querySelectorAll('.celdas_datos');
            filasDatos.forEach(fila => fila.remove());
            if (data.length > 0) {
              console.log(tablaRegistros)
              data.forEach(producto => { // Recorrer los datos obtenidos y agregar filas de datos a la tabla
                const nuevaFila = `
                    <tr class="celdas_datos">
                        <td class="celda tabla_registros__celda_id_modal">${producto.id}</td>
                        <td class="celda tabla_registros__celda_referencia_modal">${producto.referencia}</td>
                        <td class="celda tabla_registros__celda_tipo_producto_modal">${producto.tipo_producto}</td>
                        <td class="celda tabla_registros__celda_precio_modal">${producto.precio}</td>
                        <td class="celda tabla_registros__celda_asignar"><a href="#" data-id= ${producto.id} data-referencia="${producto.referencia}" class="tabla_registros__boton boton_asignar"><img src="/static/images/logo_mas.png" alt="asignar" class="tabla_registros__logo_boton tabla_registros__asignar"></a></td>
                    </tr>
                `;
                tablaRegistros.insertAdjacentHTML('beforeend', nuevaFila);
            });
            const botonesAsignar = document.querySelectorAll('.boton_asignar');
            botonesAsignar.forEach(boton => {
              boton.addEventListener('click', function(event){
                event.preventDefault();
                agregarProductoAlServicio(boton.getAttribute('data-id'), boton.getAttribute('data-referencia'));
                modalAsignarProductos.style.display = 'none';
              })
            })
            
            // Reinsertar las celdas de encabezado
            tablaRegistros.insertBefore(celdasEncabezado, tablaRegistros.firstChild);
          } else {
            // Crea una fila para el mensaje
            const filaMensaje = document.createElement('tr');
            filaMensaje.classList.add('celdas_datos');
            // Crea una celda que ocupe todo el ancho de la tabla
            const celdaMensaje = document.createElement('td');
            celdaMensaje.setAttribute('colspan', '4'); // Ajusta el número de columnas según tu tabla
            celdaMensaje.textContent = 'No se encontraron resultados de Productos. ';
            const enlaceAgregarProducto = document.createElement('a');
            enlaceAgregarProducto.href = '#'; // Agrega aquí la URL a la que quieres que el enlace redirija
            enlaceAgregarProducto.textContent = 'Click aquí para registrar producto.'; // Texto del enlace
            celdaMensaje.appendChild(enlaceAgregarProducto); // Agrega el enlace al párrafo
            // Agrega la celda al fila
            filaMensaje.appendChild(celdaMensaje);
            // Inserta la fila en la tabla
            tablaRegistros.appendChild(filaMensaje);
            enlaceAgregarProducto.addEventListener("click", function (event) {
              event.preventDefault();
              modalRegistrarProductosDesdeServicios.style.display = "block";
            })
            
            closeModalRegistrarProductosDesdeServicios.onclick = function () {
              modalRegistrarProductosDesdeServicios.style.display = 'none';
            }
          }
        })
        .catch(error => console.error('Error al buscar productos:', error));
}

function agregarProductoAlServicio(idProducto, referenciaProducto) {
  // Crear un nuevo elemento de opción
  const opcionProducto = document.createElement('option');
  opcionProducto.value = idProducto;
  opcionProducto.textContent = referenciaProducto;

  // Establecer la opción como seleccionada
  opcionProducto.selected = true;

  // Crear un botón de eliminación
  const botonEliminarProducto = document.createElement('a');
  botonEliminarProducto.textContent = 'x';
  botonEliminarProducto.addEventListener('click', function() {
      opcionProducto.remove(); // Eliminar la opción al hacer clic en el botón
  });

  // Agregar el botón de eliminación junto a la opción
  opcionProducto.appendChild(botonEliminarProducto);

  // Agregar la opción al input de productos
  inputProductos.appendChild(opcionProducto);
}