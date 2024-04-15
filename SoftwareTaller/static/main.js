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

// BANDERA REGISTRAR O EDITAR

let registrar_editar_buscar = "registrar";

// ASIGNAR CLIENTE AL SERVICIO --> ELEMENTOS

let botonCliente = document.getElementById('boton_cliente');
let inputClienteDiVisual = document.getElementById('input_cliente_di_visual'); // Este muestra el DI del cliente seleccionado
let inputClienteIdHidden = document.getElementById('input_cliente_id_hidden'); // Este se envía a la vista para obtener el cliente
let modalAsignarCliente = document.getElementById('modal_asignar_cliente');
let closeModalAsignarCliente = document.getElementById('close_modal_asignar_cliente');
let campoBuscarDI = document.getElementById('campo_buscar_di');
let modalRegistrarClienteDesdeServicios = document.getElementById('modal_registrar_cliente_desde_servicios');
let closeModalRegistrarClienteDesdeServicios = document.getElementById('close_modal_registrar_cliente_desde_servicios');
// Elementos editar cliente del servicio
let inputClienteDiVisualEditar = document.getElementById('input_cliente_di_visual_editar');
let inputClienteIdHiddenEditar = document.getElementById('input_cliente_id_hidden_editar');
let botonClienteEditar = document.getElementById('boton_cliente_editar');



// ASIGNAR PRODUCTOS AL SERVICIO --> ELEMENTOS
let costoTotal = document.getElementById('costo_total');
if (costoTotal != null){ 
  costoTotal.value = 0
}
let botonProductos = document.getElementById('boton_productos');
let contenedorProductosAsociados = document.getElementById('contenedor_productos_asociados');
let modalAsignarProductos = document.getElementById('modal_asignar_productos');
let closeModalAsignarProductos = document.getElementById('close_modal_asignar_productos');
let campoBuscarReferencia = document.getElementById('campo_buscar_referencia');
let modalRegistrarProductosDesdeServicios = document.getElementById('modal_registrar_productos_desde_servicios');
let closeModalRegistrarProductosDesdeServicios = document.getElementById('close_modal_registrar_productos_desde_servicios');
// Elementos editar productos del servicio
let botonProductosEditar = document.getElementById('boton_productos_editar');
let costoTotalEditar = document.getElementById('costo_total_editar');
let contenedorProductosAsociadosEditar = document.getElementById('contenedor_productos_asociados_editar');


// REGISTRAR --> FUNCIONES

botonRegistrar.addEventListener("click", function (event) {
  event.preventDefault()
  registrar_editar_buscar = "registrar";
  modalRegistrar.style.display = "block";
})

closeRegistrar.onclick = function () {
  modalRegistrar.style.display = 'none';
}

// EDITAR --> FUNCIONES

if (botonesEditar.length != 0) {
  for (let i = 0; i < botonesEditar.length; i++) {
    botonesEditar[i].addEventListener('click', function (event) { //Añadir el escuchar evento a todos los botones de la plantilla
      registrar_editar_buscar = "editar";
      let registroId = this.getAttribute('data-registro-id');
      let appRegistro = this.getAttribute('data-app-registro');
      let url = `${baseURL}${appRegistro}/obtener_registro_${appRegistro}/${registroId}/`;
      fetch(url)
        .then(response => response.json())
        .then(datosRegistro => {
          document.getElementById('registro_id').value = datosRegistro.id
          // Aquí puedes acceder a los detalles del registro en la datosRegistro
          if (appRegistro === "clientes") {
            let inputsNombreCliente = document.getElementsByClassName('nombre_cliente');
            let inputsDocumentoIdentidad = document.getElementsByClassName('documento_identidad');
            let inputsCorreoElectronico = document.getElementsByClassName('correo_electronico');
            let inputsTelefono = document.getElementsByClassName('telefono');
            for (let i = 0; i < inputsNombreCliente.length; i++) {
              inputsNombreCliente[i].value = datosRegistro.nombre_cliente;
              inputsDocumentoIdentidad[i].value = datosRegistro.documento_identidad;
              inputsCorreoElectronico[i].value = datosRegistro.correo_electronico;
              inputsTelefono[i].value = datosRegistro.telefono;
            }
          } else if (appRegistro == "inventario") {
            let inputsMarca = document.getElementsByClassName('marca');
            let inputsReferencia = document.getElementsByClassName('referencia');
            let inputsTipoProducto = document.getElementsByClassName('tipo_producto');
            let inputsPrecio = document.getElementsByClassName('precio');
            let inputsUnidadesDisponibles = document.getElementsByClassName('unidades_disponibles');
            for (let i = 0; i < inputsMarca.length; i++) {
              inputsMarca[i].value = datosRegistro.marca;
              inputsReferencia[i].value = datosRegistro.referencia;
              inputsTipoProducto[i].value = datosRegistro.tipo_producto;
              inputsPrecio[i].value = datosRegistro.precio;
              inputsUnidadesDisponibles[i].value = datosRegistro.unidades_disponibles;
            }
          } else if (appRegistro == "servicios") {
            let inputsNombreServicio = document.getElementsByClassName('nombre_servicio');
            let inputsDescripcion = document.getElementsByClassName('descripcion');
            let inputsCostoTotal = document.getElementsByClassName('costo_total');
            let inputsFecha = document.getElementsByClassName('fecha');
            let inputsClienteDi = document.getElementsByClassName('cliente_di');
            let inputsProductos = document.getElementsByClassName('productos');
            let inputClienteIdHiddenEditar = document.getElementById('input_cliente_id_hidden_editar');

            inputClienteIdHiddenEditar.value = datosRegistro.cliente_id;

            for (let i = 0; i < inputsNombreServicio.length; i++) {
              inputsNombreServicio[i].value = datosRegistro.nombre_servicio;
              inputsDescripcion[i].value = datosRegistro.descripcion;
              inputsFecha[i].value = datosRegistro.fecha;
              inputsClienteDi[i].value = datosRegistro.cliente_documento_identidad;
              if (i=== 0){
                inputsCostoTotal[i].value = datosRegistro.costo_total;
                inputsProductos[i].innerHTML = '';
                for (let t = 0; t < datosRegistro.productos_referencias.length; t++){
                  const nuevoProducto = document.createElement('div');
                  nuevoProducto.classList.add('producto');

                  // Crear un elemento para mostrar la referencia del producto
                  const referenciaElemento = document.createElement('span');
                  referenciaElemento.textContent = datosRegistro.productos_referencias[t];
                  nuevoProducto.appendChild(referenciaElemento);
                  inputsProductos[i].appendChild(nuevoProducto);
                }
              } else {
                inputsCostoTotal[i].value = 0;
                contenedorProductosAsociadosEditar.innerHTML = '';
                for (let t = 0; t < datosRegistro.productos_referencias.length; t++){
                  agregarValorProductoAlInput(datosRegistro.productos_ids[t], datosRegistro.productos_referencias[t], datosRegistro.productos_precios[t], contenedorProductosAsociadosEditar, costoTotalEditar, registrar_editar_buscar, datosRegistro.cantidad_productos[t]);
                }
              }
            }
          }
          event.preventDefault(); // Detenemos el envío de la etiqueta a
          modalEditar.style.display = 'block';
        })
        .catch(error => console.error('Error al obtener detalles del servicio:', error));

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
  registrar_editar_buscar = "buscar";
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

  if (campoSeleccionado === "tipo_producto" || campoSeleccionado === "nombre_servicio") {
    let select = document.createElement("select");
    let opciones = [];
    if (campoSeleccionado === "tipo_producto") {
      opciones = ["Llanta", "Aceite", "Filtro", "Grasa"]; // Opciones de tipo_producto
    } else {
      opciones = ["Venta", "Engrase", "Servicio3", "Servicio4"]; // Opciones de nombre_servicio
    }
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
  } else if (campoSeleccionado === "precio" || campoSeleccionado === "unidades_disponibles" || campoSeleccionado === "costo_total" || campoSeleccionado === "fecha") {
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
  } else if (campoSeleccionado === "cliente") {
    let botonCliente = document.createElement("a");
    let inputVisualBuscar = document.createElement("input");
    let inputHiddenBuscar = document.createElement("input");
    botonCliente.href = "#";
    botonCliente.id = "boton_cliente";
    botonCliente.textContent = "Cliente:";
    inputVisualBuscar.classList.add("card__input_form", "heigth_input_18");
    inputVisualBuscar.id = "input_cliente_di_visual_buscar";
    inputVisualBuscar.name = "input_cliente_di_visual_buscar";
    inputVisualBuscar.type = "text";
    inputVisualBuscar.disabled = true;
    inputHiddenBuscar.id = "input_cliente_di_hidden_buscar";
    inputHiddenBuscar.name = "buscar";
    inputHiddenBuscar.type = "hidden";
    contenedorBuscar.appendChild(botonCliente);
    contenedorBuscar.appendChild(inputVisualBuscar);
    contenedorBuscar.appendChild(inputHiddenBuscar);
    if (botonCliente != null) {
      // Cerrar modal de asignar cliente al clickear la X
      botonCliente.addEventListener("click", function (event) {
        event.preventDefault();
        modalAsignarCliente.style.display = 'block';
      });
    }
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
  // Cerrar modal de asignar cliente al clickear la X
  closeModalAsignarCliente.onclick = function () {
    modalAsignarCliente.style.display = 'none';
  };


  botonCliente.addEventListener("click", function (event) {
    event.preventDefault();
    modalAsignarCliente.style.display = 'block';
  });

  campoBuscarDI.addEventListener('input', function() {
    const valorBuscar = campoBuscarDI.value.trim(); // Obtener el valor del campo y eliminar espacios en blanco al principio y al final
    if (valorBuscar.length >=4) {
      buscarAsignacionCliente(registrar_editar_buscar);
    }
  });
}

if (botonClienteEditar != null) {
  botonClienteEditar.addEventListener("click", function (event) {
    event.preventDefault();
    modalAsignarCliente.style.display = 'block';
  });
}

function buscarAsignacionCliente(registrar_editar_buscar=registrar_editar_buscar) {
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
                        <td class="celda tabla_registros__celda_asignar"><a href="#" data-id="${cliente.id}" data-numero-di="${cliente.documento_identidad}" class="tabla_registros__boton boton_asignar"><img src="/static/images/logo_mas.png" alt="asignar" class="tabla_registros__logo_boton tabla_registros__asignar"></a></td>
                    </tr>
                `;
                tablaRegistros.insertAdjacentHTML('beforeend', nuevaFila);
            });
            const botonesAsignar = document.querySelectorAll('.boton_asignar');
            botonesAsignar.forEach(boton => {
              boton.addEventListener('click', function(event){
                event.preventDefault();
                if (registrar_editar_buscar === "registrar") {
                  inputClienteIdHidden.value = boton.getAttribute('data-id');
                  inputClienteDiVisual.value = boton.getAttribute('data-numero-di');
                } else if (registrar_editar_buscar === "editar"){
                  inputClienteIdHiddenEditar.value = boton.getAttribute('data-id');
                  inputClienteDiVisualEditar.value = boton.getAttribute('data-numero-di');
                } else {
                  let inputHiddenBuscar = document.getElementById('input_cliente_di_hidden_buscar')
                  let inputVisualBuscar = document.getElementById('input_cliente_di_visual_buscar')
                  inputHiddenBuscar.value = boton.getAttribute('data-id');
                  inputVisualBuscar.value = boton.getAttribute('data-numero-di');
                }
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
  // Cerrar modal de asignar productos al clickear la X
  closeModalAsignarProductos.onclick = function () {
    modalAsignarProductos.style.display = 'none';
  };


  botonProductos.addEventListener("click", function (event) {
    event.preventDefault();
    modalAsignarProductos.style.display = 'block';
  });


  campoBuscarReferencia.addEventListener('input', function() {
    const valorBuscar = campoBuscarReferencia.value.trim();
    if (valorBuscar.length >=3) {
      buscarAsignacionProductos(registrar_editar_buscar);
    }
  });
}

if (botonProductosEditar != null) {
  botonProductosEditar.addEventListener("click", function (event) {
    event.preventDefault();
    modalAsignarProductos.style.display = 'block';
  });
}


function buscarAsignacionProductos(registrar_editar_buscar=registrar_editar_buscar) {
  const valorBuscar = campoBuscarReferencia.value;
  const urlBuscarAsignacionProductos = `${baseURL}/servicios/buscar_asignacion_productos/?buscar=${valorBuscar}`;
  fetch(urlBuscarAsignacionProductos)
        .then(response => response.json())
        .then(data => {
            // Obtener la tabla y las celdas de encabezado
            const tablaRegistros = document.getElementById('tabla_registros__tabla_modal_productos');
            const celdasEncabezado = tablaRegistros.querySelector('.celdas_encabezado');

            // Limpiar las filas de datos
            const filasDatos = tablaRegistros.querySelectorAll('.celdas_datos');
            filasDatos.forEach(fila => fila.remove());
            if (data.length > 0) {
              data.forEach(producto => { // Recorrer los datos obtenidos y agregar filas de datos a la tabla
                const nuevaFila = `
                    <tr class="celdas_datos">
                        <td class="celda tabla_registros__celda_id_modal">${producto.id}</td>
                        <td class="celda tabla_registros__celda_referencia_modal">${producto.referencia}</td>
                        <td class="celda tabla_registros__celda_tipo_producto_modal">${producto.tipo_producto}</td>
                        <td class="celda tabla_registros__celda_precio_modal">${producto.precio}</td>
                        <td class="celda tabla_registros__celda_unidades_asignar">
                        <div class="div_celda_unidades_asignar">
                          <div>
                            <span class="min_range range_valor">0</span>
                            <input type="range" name="unidades_asignar" id="unidades_asignar_id_${producto.id}" min="0" max="${producto.unidades_disponibles}" value="0"  step="1" class="tabla_registros__input_unidades_agregar input_unidades_agregar"/>
                            <span id="max_range_${producto.id}" class="max_range range_valor"></span>
                          </div>
                          <div class="div_unidades_asignar">
                            <a href="#" id="disminuir_unidades_asignar_id_${producto.id}" class="boton_input_range letra_negra">-</a>
                            <p id="parrafo_valor_range_id_${producto.id}" class="parrafo_valor_range">Valor: 0</p>
                            <a href="#" id="aumentar_unidades_asignar_id_${producto.id}" class="boton_input_range letra_negra">+</a>
                          </div>
                        </div>
                      </td>
                      <td class="celda tabla_registros__celda_asignar"><a href="#" id="asignar_valor_range_id_${producto.id}" data-id= ${producto.id} data-referencia="${producto.referencia}" data-precio="${producto.precio}" class="tabla_registros__boton boton_asignar"><img src="/static/images/logo_mas.png" alt="asignar" class="tabla_registros__logo_boton tabla_registros__asignar"></a></td>
                    </tr>
                `;
                tablaRegistros.insertAdjacentHTML('beforeend', nuevaFila);
                const inputRango = document.getElementById("unidades_asignar_id_" + producto.id);
                let maxSpan = document.getElementById("max_range_" + producto.id);
                maxSpan.textContent = inputRango.max;
                const asignarValorRange = document.getElementById("asignar_valor_range_id_" + producto.id);
                const parrafoUnidadesAsignar = document.getElementById("parrafo_valor_range_id_" + producto.id);
                const disminuirUnidadesAsignar = document.getElementById("disminuir_unidades_asignar_id_" + producto.id);
                const aumentarUnidadesAsignar = document.getElementById("aumentar_unidades_asignar_id_" + producto.id);
                asignarValorRange.setAttribute('data-unidades-añadir', inputRango.value);
                if (producto.unidades_disponibles == 0){
                  disminuirUnidadesAsignar.style.visibility = 'hidden';
                  aumentarUnidadesAsignar.style.visibility = 'hidden';
                } else if (inputRango.value == 0){
                  disminuirUnidadesAsignar.style.visibility = 'hidden';
                } 
                inputRango.addEventListener('input', function() {
                  parrafoUnidadesAsignar.textContent = "Valor: " + inputRango.value;
                  asignarValorRange.setAttribute('data-unidades-añadir', inputRango.value);
                  if (inputRango.value == 0) {
                    disminuirUnidadesAsignar.style.visibility = 'hidden';
                  }
                  if ((aumentarUnidadesAsignar.style.visibility == 'hidden') && (inputRango.value < producto.unidades_disponibles)) {
                    aumentarUnidadesAsignar.style.visibility = 'visible';
                  }
                  if (inputRango.value == producto.unidades_disponibles) {
                    aumentarUnidadesAsignar.style.visibility = 'hidden';
                  }
                  if ((disminuirUnidadesAsignar.style.visibility == 'hidden') && (inputRango.value > 1)) {
                    disminuirUnidadesAsignar.style.visibility = 'visible';
                  }
                })

                disminuirUnidadesAsignar.addEventListener('click', function() {
                  inputRango.value = parseInt(inputRango.value) - 1;
                  parrafoUnidadesAsignar.textContent = "Valor: " + inputRango.value;
                  asignarValorRange.setAttribute('data-unidades-añadir', inputRango.value);
                  if (inputRango.value == 0) {
                    disminuirUnidadesAsignar.style.visibility = 'hidden';
                  }
                  if (aumentarUnidadesAsignar.style.visibility == 'hidden' && inputRango.value != 0) {
                    aumentarUnidadesAsignar.style.visibility = 'visible';
                  }
                })

                aumentarUnidadesAsignar.addEventListener('click', function() {
                  inputRango.value = parseInt(inputRango.value) + 1;
                  parrafoUnidadesAsignar.textContent = "Valor: " + inputRango.value;
                  asignarValorRange.setAttribute('data-unidades-añadir', inputRango.value);
                  if (inputRango.value == producto.unidades_disponibles) {
                    aumentarUnidadesAsignar.style.visibility = 'hidden';
                  }
                  if (disminuirUnidadesAsignar.style.visibility == 'hidden' && inputRango.value != 0) {
                    disminuirUnidadesAsignar.style.visibility = 'visible';
                  }
                })
            });
            const botonesAsignar = document.querySelectorAll('.boton_asignar');
            botonesAsignar.forEach(boton => {
              boton.addEventListener('click', function(event){
                event.preventDefault();
                let inputRango = document.getElementById("unidades_asignar_id_" + boton.getAttribute('data-id'));
                let maxSpan = document.getElementById("max_range_" + boton.getAttribute('data-id'));
                if (registrar_editar_buscar === "registrar"){
                  contenedor = contenedorProductosAsociados;
                  total = costoTotal;
                } else if (registrar_editar_buscar === "editar"){
                  contenedor = contenedorProductosAsociadosEditar;
                  total = costoTotalEditar;
                } else {
                  contenedor = contenedorProductosAsociadosBuscar;
                }
                agregarValorProductoAlInput(boton.getAttribute('data-id'), boton.getAttribute('data-referencia'), boton.getAttribute('data-precio'), contenedor, total, registrar_editar_buscar, boton.getAttribute('data-unidades-añadir'), inputRango, maxSpan);
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

function agregarValorProductoAlInput(idProducto,referenciaProducto, precioProducto, contenedor, total, registrar_editar_buscar, unidades_asignar, inputRango, maxSpan) {
  let inputProductos = null;

  // Obtener el input de productos
  if (registrar_editar_buscar === "registrar"){
    inputProductos = document.getElementById('productos_seleccionados');
  } else if (registrar_editar_buscar === "editar"){
    inputProductos = document.getElementById('productos_seleccionados_editar');
  }
  // Obtener el valor actual del input
  let valorActual = inputProductos.value.trim();
  const productos = valorActual.split(',');
  const idsProductos = productos.map(producto => producto.split(':')[0]);
  if (idsProductos.includes(idProducto)) {
    // El idProducto ya está presente, puedes manejar esta situación aquí
    alert('Lo sentimos. El producto ya está agregado.');
  } else if(unidades_asignar == 0){
    alert('Lo sentimos. No se están agregando unidades.')
  } else {
      // Agregar el ID del producto al valor del input, separado por comas
  valorActual += (valorActual ? ',' : '') + idProducto + ':' + unidades_asignar;
  const nuevoProducto = document.createElement('div');
  nuevoProducto.classList.add('producto');

  // Crear un elemento para mostrar la referencia del producto
  const referenciaElemento = document.createElement('span');
  referenciaElemento.textContent = referenciaProducto + " (" + unidades_asignar + ")";
  nuevoProducto.appendChild(referenciaElemento);

  // Crear un botón de eliminación
  const botonEliminarProducto = document.createElement('a');

  botonEliminarProducto.textContent = 'X';
  botonEliminarProducto.classList.add('botonEliminarProducto');
  botonEliminarProducto.addEventListener('click', function() {
    nuevoProducto.remove(); // Eliminar el producto al hacer clic en el botón

    //Eliminar el valor correspondiente del input
    eliminarValorProductoDelInput(idProducto, precioProducto, total, registrar_editar_buscar, unidades_asignar, inputRango, maxSpan);
  });
  nuevoProducto.appendChild(botonEliminarProducto);

  // Agregar el producto al contenedor de productos
  contenedor.appendChild(nuevoProducto);
  // Asignar el nuevo valor al input
  if (inputRango != null) {
    inputRango.max = parseInt(inputRango.max) - parseInt(unidades_asignar);
    maxSpan.textContent = inputRango.max;
  }
  inputProductos.value = valorActual;
  total.value = parseInt(total.value) + (parseInt(precioProducto)*parseInt(unidades_asignar));
  }
}

function eliminarValorProductoDelInput(idProducto, precioProducto, total, registrar_editar_buscar, unidades_asignar, inputRango, maxSpan) {
  let inputProductos = null;
  // Obtener el input de productos
  if (registrar_editar_buscar === "registrar"){
    inputProductos = document.getElementById('productos_seleccionados');
  } else if (registrar_editar_buscar === "editar"){
    inputProductos = document.getElementById('productos_seleccionados_editar');
  }
  // Obtener el valor actual del input
  let valorActual = inputProductos.value.trim();
  // Separar los IDs de productos en un arreglo
  const productos = valorActual.split(',');
  // Filtrar los IDs para eliminar el ID del producto que se está eliminando
  const nuevosProductos = productos.filter(producto => {
    const [id, unidades] = producto.split(':');
    if (inputRango != null){
      inputRango.max = parseInt(inputRango.max) + parseInt(unidades);
      maxSpan.textContent = inputRango.max;
    }
    return id != idProducto.toString();
  });

  // Construir nuevamente el valor del input
  const nuevoValor = nuevosProductos.join(',');
  // Asignar el nuevo valor al input
  inputProductos.value = nuevoValor;

  total.value = parseInt(total.value) - (parseInt(precioProducto)*parseInt(unidades_asignar));
}