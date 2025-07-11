// Variables funcionales
let baseURL = "http://127.0.0.1:8000/";
let modalMensajeInputNoValido = document.getElementById('mensaje_input_no_valido');
let botonAceptarInputNoValido = document.getElementById('boton_aceptar_input_no_valido');
let textoMensajeInputError = document.getElementById('texto_mensaje_input_error');
const fechaActual = new Date();
const formatoFecha = fechaActual.toISOString().split('T')[0]; // toISOString() convierte la fecha en una cadena en formato ISO (por ejemplo, "2023-04-10T07:00:00.000Z").


// PATRONES REGEX // 

// Formulario Clientes
const reNombreCliente = /^[a-zA-Z\s]{2,50}$/;
const reCorreo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
const reDocumentoIdentidad = /^\d{5,20}$/;
const reTelefono = /^\d{5,15}$/;

// Formulario Productos

const reMarca = /^[a-zA-Z0-9\s.,]{3,60}$/;
const reReferencia =  /^[a-zA-Z0-9\s.,]{2,40}$/;
const rePrecio = /^\d{2,10}$/;
const reUnidadesDisponibles = /^\d{1,10}$/;

// Formulario Servicios

const reDescripcion = /^[a-zA-Z0-9\s.,]{1,200}$/;


// Cerrar modal de AceptarInputNoValido
if (botonAceptarInputNoValido != null) {
  botonAceptarInputNoValido.addEventListener("click", function (event) {
    event.preventDefault()
    modalMensajeInputNoValido.style.display = "none";
  })
}



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

let tiposProductos = null
let existeTiposProductos = document.getElementById('tipos_productos')
if (existeTiposProductos != null){
  tiposProductos = JSON.parse(document.getElementById('tipos_productos').textContent);
}
let nombresServicios = null
let existeNombresServicios = document.getElementById('nombres_servicios')
if (existeNombresServicios != null){
  nombresServicios = JSON.parse(document.getElementById('nombres_servicios').textContent);
}

let inputPrecioProductosRegistrar = document.getElementById('input_precio_productos');
let inputPrecioAdicionalRegistrar = document.getElementById('input_precio_adicional');

let inputPrecioProductosEditar = document.getElementById('input_precio_productos_editar');
let inputPrecioAdicionalEditar = document.getElementById('input_precio_adicional_editar');



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

let registrarEditarBuscar = "registrar";

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
  costoTotal.value = 0;
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
// Modal cantidad no valida

let mensajeCantidadNoValida = document.getElementById('mensaje_cantidad_no_valida');

let botonAceptarCantidadNoValida = document.getElementById('boton_aceptar_cantidad_no_valida');

if (botonAceptarCantidadNoValida != null){
  botonAceptarCantidadNoValida.addEventListener("click", function (event) {
    event.preventDefault()
    mensajeCantidadNoValida.style.display = "none";
  })
}

// FUNCIONES DE VALIDACION


const entradaValida = function (campo) {
  if (campo.classList.contains("borde_azul")) {
    campo.classList.remove("borde_azul");
  }
  campo.classList.add("borde_verde");
}

const entradaInvalida = function (campo) {
  if (campo.classList.contains("borde_verde")) {
    campo.classList.remove("borde_verde");
  }
  campo.classList.add("borde_azul");
}

const letras = function (e) { // Permite solo escribir LETRAS
  const key = e.keyCode || e.which;
  const tecla = String.fromCharCode(key).toLowerCase();
  const letras = "áéíóúabcdefghijklmnopqrstuvwxyz";
  const especiales = ['8', '32', '37', '39', '46'];
  let tecla_especial = false
  for (const i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial) {
    e.preventDefault()
  }
}

const numeros = (e) => { // Permite solo escribir NÚMEROS
  //Validamos que el keyCode corresponda a las teclas de los números
  if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode) {
    e.preventDefault()
  }
}



// REGISTRAR --> FUNCIONES


const validarFormularioClientes = function(nombreCliente, documentoIdentidad, correoElectronico, telefono){
  if (reNombreCliente.test(nombreCliente.value)){
    entradaValida(nombreCliente);
    if (reDocumentoIdentidad.test(documentoIdentidad.value)){
      entradaValida(documentoIdentidad);
      if (reCorreo.test(correoElectronico.value)){
        entradaValida(correoElectronico);
        if (reTelefono.test(telefono.value)) {
          entradaValida(telefono);
          return true;
        } else {
          entradaInvalida(telefono);
          modalMensajeInputNoValido.style.display = 'block';
          textoMensajeInputError.textContent = "Teléfono no válido. Solo números. Extensión entre 5 y 15 dígitos."
          telefono.focus();
          return false;
        }
      } else {
        entradaInvalida(correoElectronico);
        modalMensajeInputNoValido.style.display = 'block'
        textoMensajeInputError.textContent = "Correo Electrónico no válido. No se cumple el formato de un correo electrónico."
        correoElectronico.focus();
        return false;
      }
    } else {
      entradaInvalida(documentoIdentidad);
      modalMensajeInputNoValido.style.display = 'block'
      textoMensajeInputError.textContent = "Documento Identidad no válido. Solo números. Extensión entre 5 y 20 dígitos."
      documentoIdentidad.focus();
      return false;
    }
  } else {
    entradaInvalida(nombreCliente);
    modalMensajeInputNoValido.style.display = 'block'
    textoMensajeInputError.textContent = "Nombre Cliente no válido. Solo letras y espacios en blanco. Extensión entre 2 y 50 caracteres."
    nombreCliente.focus();
    return false;
  }
}

const validarFormularioProductos = function(marca, referencia, tipoProducto, precio, unidadesDisponibles){
  if (reMarca.test(marca.value)){
    entradaValida(marca);
    if (reReferencia.test(referencia.value)){
      entradaValida(referencia);
      if ((tipoProducto.value) != ''){
        entradaValida(tipoProducto);
        if (rePrecio.test(precio.value)) {
          entradaValida(precio);
          if (reUnidadesDisponibles.test(unidadesDisponibles.value)){
            entradaValida(unidadesDisponibles);
            return true;
          } else {
            entradaInvalida(unidadesDisponibles);
            modalMensajeInputNoValido.style.display = 'block';
            textoMensajeInputError.textContent = "Unidades Disponibles no válido. Solo números. Extensión entre 1 y 10 dígitos."
            unidadesDisponibles.focus();
            return false;
          }
        } else {
          entradaInvalida(precio);
          modalMensajeInputNoValido.style.display = 'block';
          textoMensajeInputError.textContent = "Precio no válido. Solo números. Extensión entre 2 y 10 dígitos."
          precio.focus();
          return false;
        }
      } else {
        entradaInvalida(tipoProducto);
        modalMensajeInputNoValido.style.display = 'block'
        textoMensajeInputError.textContent = "Tipo Producto no válido. No se ha seleccionado un tipo."
        tipoProducto.focus();
        return false;
      }
    } else {
      entradaInvalida(referencia);
      modalMensajeInputNoValido.style.display = 'block'
      textoMensajeInputError.textContent = "Referencia no válida. Extensión entre 2 y 40 caracteres."
      referencia.focus();
      return false;
    }
  } else {
    entradaInvalida(marca);
    modalMensajeInputNoValido.style.display = 'block'
    textoMensajeInputError.textContent = "Marca no válida. Extensión entre 3 y 60 caracteres."
    marca.focus();
    return false;
  }
}

const validarFormularioServicios = function(nombreServicio, descripcion, fecha, clienteVisual, clienteHidden, productosVisual, productosHidden){
  if ((nombreServicio.value) != ''){
    entradaValida(nombreServicio);
    if (reDescripcion.test(descripcion.value)){
      entradaValida(descripcion);
      if ((fecha.value) <= formatoFecha){
        entradaValida(fecha);
        if ((clienteHidden.value) != '') {
          entradaValida(clienteVisual);
          if ((productosHidden.value) != ''){
            entradaValida(productosVisual);
            return true;
          } else {
            entradaInvalida(productosVisual);
            modalMensajeInputNoValido.style.display = 'block';
            textoMensajeInputError.textContent = "Productos no válido. No se ha asignado ningún producto."
            productosVisual.focus();
            return false;
          }
        } else {
          entradaInvalida(clienteVisual);
          modalMensajeInputNoValido.style.display = 'block';
          textoMensajeInputError.textContent = "Cliente no válido. No se ha asignado ningún cliente."
          clienteVisual.focus();
          return false;
        }
      } else {
        entradaInvalida(fecha);
        modalMensajeInputNoValido.style.display = 'block'
        textoMensajeInputError.textContent = "Fecha no válida. No se puede seleccionar una fecha futura."
        fecha.focus();
        return false;
      }
    } else {
      entradaInvalida(descripcion);
      modalMensajeInputNoValido.style.display = 'block'
      textoMensajeInputError.textContent = "Descripción no válida. Extensión entre 1 y 200 caracteres."
      descripcion.focus();
      return false;
    }
  } else {
    entradaInvalida(nombreServicio);
    modalMensajeInputNoValido.style.display = 'block'
    textoMensajeInputError.textContent = "Servicio no válido. No se ha seleccionado ningún nombre de servicio."
    nombreServicio.focus();
    return false;
  }
}


botonRegistrar.addEventListener("click", function (event) {
  event.preventDefault()
  registrarEditarBuscar = "registrar";
  modalRegistrar.style.display = "block";


  // Validaciones Formularios
  // Formulario registrar cliente
  let nombreCliente = document.getElementById('nombre_cliente');
  if (nombreCliente !=null) {
    let documentoIdentidad = document.getElementById('documento_identidad');
    let correoElectronico = document.getElementById('correo_electronico');
    let telefono = document.getElementById('telefono');
    let registrarCliente = document.getElementById('registrar_cliente');
  
  
    nombreCliente.addEventListener('keypress', letras);
    documentoIdentidad.addEventListener('keypress', numeros);
    telefono.addEventListener('keypress', numeros);
  
    registrarCliente.addEventListener("click", function(e) {
      if (!validarFormularioClientes(nombreCliente, documentoIdentidad, correoElectronico, telefono)){
        e.preventDefault();
      }
    });
  }
  // Formulario registrar producto
  let marca = document.getElementById('marca');
  if (marca !=null) {
    let referencia = document.getElementById('referencia');
    let tipoProducto = document.getElementById('tipo_producto');
    let precio = document.getElementById('precio');
    let unidadesDisponibles = document.getElementById('unidades_disponibles');
    let registrarProducto = document.getElementById('registrar_producto');

    precio.addEventListener('keypress', numeros);
    unidadesDisponibles.addEventListener('keypress', numeros);

    registrarProducto.addEventListener("click", function(e) {
      if (!validarFormularioProductos(marca, referencia, tipoProducto, precio, unidadesDisponibles)){
        e.preventDefault();
      }
    });
  }

  // Formulario registrar servicio
  let nombreServicio = document.getElementById('nombre_servicio');

  let registrarServicio = document.getElementById('registrar_servicio');
  if (nombreServicio !=null) {
    let descripcion = document.getElementById('descripcion');
    let noPrecioAdicionalRadio = document.getElementById('no_precio_adicional_radio');
    let siPrecioAdicionalRadio = document.getElementById('si_precio_adicional_radio');
    let fecha = document.getElementById('fecha');
    let clienteVisual = document.getElementById('input_cliente_di_visual');
    let clienteHidden = document.getElementById('input_cliente_id_hidden');
    let productosVisual = document.getElementById('contenedor_productos_asociados');
    let productosHidden = document.getElementById('productos_seleccionados');
    fecha.value = formatoFecha; // Asigna al input de fecha por defecto la fecha actual

    registrarServicio.addEventListener("click", function(e) {
      if (!validarFormularioServicios(nombreServicio, descripcion, fecha, clienteVisual, clienteHidden, productosVisual, productosHidden)){
        e.preventDefault();
      }
    });
    inputPrecioAdicionalRegistrar.addEventListener('keypress', numeros);
    noPrecioAdicionalRadio.addEventListener('click', function() {
      inputPrecioAdicionalRegistrar.style.display = 'none';
      costoTotal.value = parseInt(inputPrecioProductosRegistrar.value);
      inputPrecioAdicionalRegistrar.value = 0;
    })
    siPrecioAdicionalRadio.addEventListener('click', function() {
      inputPrecioAdicionalRegistrar.style.display = 'block';
    })
    inputPrecioAdicionalRegistrar.addEventListener('change', function(){
      if (inputPrecioAdicionalRegistrar.value == ''){
        inputPrecioAdicionalRegistrar.value = 0;
        costoTotal.value = parseInt(inputPrecioProductosRegistrar.value);
      } else {
        costoTotal.value = parseInt(inputPrecioProductosRegistrar.value) + parseInt(inputPrecioAdicionalRegistrar.value);
      }
    });
  }
})





closeRegistrar.onclick = function () {
  modalRegistrar.style.display = 'none';
  location.reload();
}



// EDITAR --> FUNCIONES

if (botonesEditar.length != 0) {
  for (let i = 0; i < botonesEditar.length; i++) {
    botonesEditar[i].addEventListener('click', function (event) { //Añadir el escuchar evento a todos los botones de la plantilla
      registrarEditarBuscar = "editar";
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
            let inputsPrecioAdicional = document.getElementsByClassName('precio_adicional');
            let inputsCostoTotal = document.getElementsByClassName('costo_total');
            let inputsFecha = document.getElementsByClassName('fecha');
            let inputsClienteDi = document.getElementsByClassName('cliente_di');
            let inputsProductos = document.getElementsByClassName('productos');
            let inputClienteIdHiddenEditar = document.getElementById('input_cliente_id_hidden_editar');
            let inputPrecioProductosEditar = document.getElementById('input_precio_productos_editar');
            let noPrecioAdicionalRadioEditar = document.getElementById('no_precio_adicional_radio_editar');
            let siPrecioAdicionalRadioEditar = document.getElementById('si_precio_adicional_radio_editar');

            inputClienteIdHiddenEditar.value = datosRegistro.cliente_id;
            inputPrecioProductosEditar.value = 0;
            for (let i = 0; i < inputsNombreServicio.length; i++) {
              inputsNombreServicio[i].value = datosRegistro.nombre_servicio;
              inputsDescripcion[i].value = datosRegistro.descripcion;
              inputsFecha[i].value = datosRegistro.fecha;
              inputsClienteDi[i].value = datosRegistro.cliente_documento_identidad;
              inputsPrecioAdicional[i].value = datosRegistro.precio_adicional;
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
                  agregarValorProductoAlInput(datosRegistro.productos_ids[t], datosRegistro.productos_referencias[t], datosRegistro.productos_precios[t], contenedorProductosAsociadosEditar, costoTotalEditar, registrarEditarBuscar, datosRegistro.cantidad_productos[t], inputPrecioProductosEditar, inputPrecioAdicionalEditar);
                }
                inputsPrecioAdicional[i].addEventListener('keypress', numeros);
                noPrecioAdicionalRadioEditar.addEventListener('click', function() {
                  inputsPrecioAdicional[i].readOnly = true;
                  inputsPrecioAdicional[i].classList.add('card_input_form_disabled')
                  inputsCostoTotal[i].value = parseInt(inputPrecioProductosEditar.value);
                  inputsPrecioAdicional[i].value = 0;
                })
                siPrecioAdicionalRadioEditar.addEventListener('click', function() {
                  inputsPrecioAdicional[i].readOnly = false;
                  inputsPrecioAdicional[i].classList.remove('card_input_form_disabled')
                })
                inputsPrecioAdicional[i].addEventListener('change', function(){
                  if (inputsPrecioAdicional[i].value == ''){
                    inputsPrecioAdicional[i].value = 0;
                    inputsCostoTotal[i].value = parseInt(inputPrecioProductosEditar.value);
                  } else {
                    inputsCostoTotal[i].value = parseInt(inputPrecioProductosEditar.value) + parseInt(inputsPrecioAdicional[i].value);
                  }
                });
              }
            }
          }
          event.preventDefault(); // Detenemos el envío de la etiqueta a
          modalEditar.style.display = 'block';
        })
        .catch(error => console.error('Error al obtener detalles del servicio:', error));

        // Validaciones de la edición
        // Formulario editar clientes
        let nombreCliente = document.getElementById('nombre_cliente_editar');
        if (nombreCliente !=null) {
          let documentoIdentidad = document.getElementById('documento_identidad_editar');
          let correoElectronico = document.getElementById('correo_electronico_editar');
          let telefono = document.getElementById('telefono_editar');
          let actualizarCliente = document.getElementById('actualizar_cliente');

            nombreCliente.addEventListener('keypress', letras);
            documentoIdentidad.addEventListener('keypress', numeros);
            telefono.addEventListener('keypress', numeros);

          actualizarCliente.addEventListener("click", function(e) {
            if (!validarFormularioClientes(nombreCliente, documentoIdentidad, correoElectronico, telefono)){
              e.preventDefault();
            }
          });
        }
      // Formulario editar productos
        let marca = document.getElementById('marca_editar');
        if (marca !=null) {
          let referencia = document.getElementById('referencia_editar');
          let tipoProducto = document.getElementById('tipo_producto_editar');
          let precio = document.getElementById('precio_editar');
          let unidadesDisponibles = document.getElementById('unidades_disponibles_editar');
          let actualizarProducto = document.getElementById('actualizar_producto');

          precio.addEventListener('keypress', numeros);
          unidadesDisponibles.addEventListener('keypress', numeros);

          actualizarProducto.addEventListener("click", function(e) {
            if (!validarFormularioProductos(marca, referencia, tipoProducto, precio, unidadesDisponibles)){
              e.preventDefault();
            }
          });
        }
      // Formulario editar servicios
      let nombreServicio = document.getElementById('nombre_servicio_editar');
      if (nombreServicio !=null) {
        let descripcion = document.getElementById('descripcion_editar');
        let fecha = document.getElementById('fecha_editar');
        let clienteVisual = document.getElementById('input_cliente_di_visual_editar');
        let clienteHidden = document.getElementById('input_cliente_id_hidden_editar');
        let productosVisual = document.getElementById('contenedor_productos_asociados_editar');
        let productosHidden = document.getElementById('productos_seleccionados_editar');
        let actualizarServicio = document.getElementById('actualizar_servicio');

        actualizarServicio.addEventListener("click", function(e) {
          if (!validarFormularioServicios(nombreServicio, descripcion, fecha, clienteVisual, clienteHidden, productosVisual, productosHidden)){
            e.preventDefault();
          }
        });
      }
    })
  }

  closeEditar.onclick = function () {
    modalEditar.style.display = 'none';
    location.reload();
  }
  cancelarEditar.onclick = function (event) {
    event.preventDefault();
    modalEditar.style.display = 'none';
    location.reload();
  }
}


// BUSCADOR --> FUNCIONES

//Aparecer el buscador al presionar el botón
botonBuscar.addEventListener("click", function (event) {
  event.preventDefault()
  modalBuscador.style.display = "block";
  registrarEditarBuscar = "buscar";
});

if (campo != null) {
  campo.addEventListener("change", function () {
    generarInput(campo, contenedorBuscar);
  });
  closeBuscador.onclick = function () {
    modalBuscador.style.display = 'none';
    location.reload();
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
      opciones = tiposProductos; // Opciones de tipo_producto
    } else {
      opciones = nombresServicios;
      console.log(nombresServicios) // Opciones de nombre_servicio
    }
    for (let i = 0; i < opciones.length; i++) {
      let opcion = document.createElement("option");
      opcion.value = opciones[i].id
      if (campoSeleccionado === "tipo_producto"){
        opcion.textContent = opciones[i].tipo
      } else {
        opcion.textContent = opciones[i].nombre_servicio
      }
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
    botonCliente.classList.add('texto_clickeable');
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
  } else if (campoSeleccionado === "producto") {
    let botonProducto = document.createElement("a");
    let inputVisualBuscar = document.createElement("input");
    let inputHiddenBuscar = document.createElement("input");
    botonProducto.href = "#";
    botonProducto.id = "boton_productos";
    botonProducto.textContent = "Producto:";
    botonProducto.classList.add('texto_clickeable');
    inputVisualBuscar.classList.add("card__input_form", "heigth_input_18");
    inputVisualBuscar.id = "input_producto_visual_buscar";
    inputVisualBuscar.name = "input_producto_visual_buscar";
    inputVisualBuscar.type = "text";
    inputVisualBuscar.disabled = true;
    inputHiddenBuscar.id = "input_producto_hidden_buscar";
    inputHiddenBuscar.name = "buscar";
    inputHiddenBuscar.type = "hidden";
    contenedorBuscar.appendChild(botonProducto);
    contenedorBuscar.appendChild(inputVisualBuscar);
    contenedorBuscar.appendChild(inputHiddenBuscar);
    if (botonProducto != null) {
      // Cerrar modal de asignar cliente al clickear la X
      botonProducto.addEventListener("click", function (event) {
        event.preventDefault();
        modalAsignarProductos.style.display = 'block';
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
    location.reload();
  } else if (event.target == modalConfirmarEliminar) {
    eliminar.removeAttribute('data-url');
    modalConfirmarEliminar.style.display = 'none';
  } else if (event.target == modalRegistrar) {
    modalRegistrar.style.display = 'none';
    location.reload();
  } else if (event.target == modalEditar) {
    modalEditar.style.display = 'none';
    location.reload();
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
      buscarAsignacionCliente(registrarEditarBuscar);
    }
  });
}

if (botonClienteEditar != null) {
  botonClienteEditar.addEventListener("click", function (event) {
    event.preventDefault();
    modalAsignarCliente.style.display = 'block';
  });
}

function buscarAsignacionCliente(registrarEditarBuscar=registrarEditarBuscar) {
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
                if (registrarEditarBuscar === "registrar") {
                  inputClienteIdHidden.value = boton.getAttribute('data-id');
                  inputClienteDiVisual.value = boton.getAttribute('data-numero-di');
                } else if (registrarEditarBuscar === "editar"){
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
            enlaceAgregarCliente.classList.add('texto_clickeable');
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
      buscarAsignacionProductos(registrarEditarBuscar);
    }
  });
}

if (botonProductosEditar != null) {
  botonProductosEditar.addEventListener("click", function (event) {
    event.preventDefault();
    modalAsignarProductos.style.display = 'block';
  });
}


function buscarAsignacionProductos(registrarEditarBuscar) {
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
                let nuevaFila = null
                if (registrarEditarBuscar != "buscar") {
                  nuevaFila = `
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
                } else {
                  nuevaFila = `
                    <tr class="celdas_datos">
                        <td class="celda tabla_registros__celda_id_modal">${producto.id}</td>
                        <td class="celda tabla_registros__celda_referencia_modal">${producto.referencia}</td>
                        <td class="celda tabla_registros__celda_tipo_producto_modal">${producto.tipo_producto}</td>
                        <td class="celda tabla_registros__celda_precio_modal">${producto.precio}</td>
                      <td class="celda tabla_registros__celda_asignar"><a href="#" id="asignar_valor_range_id_${producto.id}" data-id= ${producto.id} data-referencia="${producto.referencia}" data-precio="${producto.precio}" class="tabla_registros__boton boton_asignar"><img src="/static/images/logo_mas.png" alt="asignar" class="tabla_registros__logo_boton tabla_registros__asignar"></a></td>
                    </tr>
                `;
                }
                tablaRegistros.insertAdjacentHTML('beforeend', nuevaFila);
                const inputRango = document.getElementById("unidades_asignar_id_" + producto.id);
                if (inputRango != null) {
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
                }
            });
            let inputPrecioProductos = null
            let inputPrecioAdicional = null
            const botonesAsignar = document.querySelectorAll('.boton_asignar');
            botonesAsignar.forEach(boton => {
              boton.addEventListener('click', function(event){
                event.preventDefault();
                if (registrarEditarBuscar === "registrar"){
                  contenedor = contenedorProductosAsociados;
                  total = costoTotal;
                  inputPrecioProductos = inputPrecioProductosRegistrar
                  inputPrecioAdicional = inputPrecioAdicionalRegistrar
                } else if (registrarEditarBuscar === "editar"){
                  contenedor = contenedorProductosAsociadosEditar;
                  inputPrecioProductos = inputPrecioProductosEditar
                  inputPrecioAdicional = inputPrecioAdicionalEditar
                  total = costoTotalEditar;
                } else {
                  let inputHiddenBuscar = document.getElementById('input_producto_hidden_buscar')
                  let inputVisualBuscar = document.getElementById('input_producto_visual_buscar')
                  inputHiddenBuscar.value = boton.getAttribute('data-id');
                  inputVisualBuscar.value = boton.getAttribute('data-referencia');
                }
                if (registrarEditarBuscar != "buscar"){
                  agregarValorProductoAlInput(boton.getAttribute('data-id'), boton.getAttribute('data-referencia'), boton.getAttribute('data-precio'), contenedor, total, registrarEditarBuscar, boton.getAttribute('data-unidades-añadir'), inputPrecioProductos, inputPrecioAdicional);
                }
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
            enlaceAgregarProducto.classList.add('texto_clickeable');
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

function agregarValorProductoAlInput(idProducto,referenciaProducto, precioProducto, contenedor, total, registrarEditarBuscar, unidades_asignar, inputPrecioProductos, inputPrecioAdicional) {
  let inputProductos = null;

  // Obtener el input de productos
  if (registrarEditarBuscar === "registrar"){
    inputProductos = document.getElementById('productos_seleccionados');
  } else if (registrarEditarBuscar === "editar"){
    inputProductos = document.getElementById('productos_seleccionados_editar');
  }
  // Obtener el valor actual del input
  let valorActual = inputProductos.value.trim();
  const productos = valorActual.split(',');
  const idsProductos = productos.map(producto => producto.split(':')[0]);
  if (unidades_asignar == 0) {
    mensajeCantidadNoValida.style.display = 'block';
  } else if (idsProductos.includes(idProducto)){
    for (let i = 0; i<productos.length; i++){
      const [id, unidades] = productos[i].split(':');
      if (id == idProducto) {
        const nuevasUnidades = parseInt(unidades_asignar);
        const referenciaElemento = document.getElementById(`referencia_elemento_id_${idProducto}`);
        productos[i] = `${idProducto}:${nuevasUnidades}`;
        valorActual = productos.join(',');
        inputProductos.value = valorActual;
        referenciaElemento.textContent = referenciaProducto + " (" + unidades_asignar + ")";
        inputPrecioProductos.value = parseInt(inputPrecioProductos.value) + (nuevasUnidades - parseInt(unidades)) * parseInt(precioProducto);
        total.value = parseInt(inputPrecioProductos.value) + parseInt(inputPrecioAdicional.value);
      }
    }
  } else {
      // Agregar el ID del producto al valor del input, separado por comas
    valorActual += (valorActual ? ',' : '') + idProducto + ':' + unidades_asignar;
    const nuevoProducto = document.createElement('div');
    nuevoProducto.classList.add('producto');

    // Crear un elemento para mostrar la referencia del producto
    const referenciaElemento = document.createElement('span');
    referenciaElemento.textContent = referenciaProducto + " (" + unidades_asignar + ")";
    referenciaElemento.id = `referencia_elemento_id_${idProducto}`;
    nuevoProducto.appendChild(referenciaElemento);

  // Crear un botón de eliminación
    const botonEliminarProducto = document.createElement('a');

    botonEliminarProducto.textContent = 'X';
    botonEliminarProducto.classList.add('botonEliminarProducto');
    botonEliminarProducto.addEventListener('click', function() {
      nuevoProducto.remove(); // Eliminar el producto al hacer clic en el botón

    //Eliminar el valor correspondiente del input
      eliminarValorProductoDelInput(idProducto, precioProducto, total, registrarEditarBuscar, unidades_asignar, inputPrecioProductos, inputPrecioAdicional);
    });
    nuevoProducto.appendChild(botonEliminarProducto);

    // Agregar el producto al contenedor de productos
    contenedor.appendChild(nuevoProducto);
    // Asignar el nuevo valor al input
    inputProductos.value = valorActual;
    inputPrecioProductos.value = parseInt(inputPrecioProductos.value) + (parseInt(precioProducto)*parseInt(unidades_asignar));
    total.value = parseInt(inputPrecioProductos.value) + parseInt(inputPrecioAdicional.value);
  }
}

function eliminarValorProductoDelInput(idProducto, precioProducto, total, registrarEditarBuscar, unidades_asignar, inputPrecioProductos, inputPrecioAdicional) {
  let inputProductos = null;
  // Obtener el input de productos
  if (registrarEditarBuscar === "registrar"){
    inputProductos = document.getElementById('productos_seleccionados');
  } else if (registrarEditarBuscar === "editar"){
    inputProductos = document.getElementById('productos_seleccionados_editar');
  }
  // Obtener el valor actual del input
  let valorActual = inputProductos.value.trim();
  // Separar los IDs de productos en un arreglo
  const productos = valorActual.split(',');
  // Filtrar los IDs para eliminar el ID del producto que se está eliminando
  const nuevosProductos = productos.filter(producto => {
    const [id, unidades] = producto.split(':');
    return id != idProducto.toString();
  });

  // Construir nuevamente el valor del input
  const nuevoValor = nuevosProductos.join(',');
  // Asignar el nuevo valor al input
  inputProductos.value = nuevoValor;
  inputPrecioProductos.value = parseInt(inputPrecioProductos.value) - (parseInt(precioProducto)*parseInt(unidades_asignar));
  total.value = parseInt(inputPrecioProductos.value) + parseInt(inputPrecioAdicional.value);
}

// function sobreescribirValorProductoDelInput(idProducto, precioProducto, total, registrarEditarBuscar, unidades_asignar) {
//   let inputProductos = null;
//   // Obtener el input de productos
//   if (registrarEditarBuscar === "registrar"){
//     inputProductos = document.getElementById('productos_seleccionados');
//   } else if (registrarEditarBuscar === "editar"){
//     inputProductos = document.getElementById('productos_seleccionados_editar');
//   }
//   // Obtener el valor actual del input
//   let valorActual = inputProductos.value.trim();
//   // Separar los IDs de productos en un arreglo
//   const productos = valorActual.split(',');
//   // Filtrar los IDs para eliminar el ID del producto que se está eliminando
//   const nuevosProductos = productos.filter(producto => {
//     const [id, unidades] = producto.split(':');
//     return id != idProducto.toString();
//   });

//   // Construir nuevamente el valor del input
//   const nuevoValor = nuevosProductos.join(',');
//   // Asignar el nuevo valor al input
//   inputProductos.value = nuevoValor;

//   total.value = parseInt(total.value) + (parseInt(precioProducto)*parseInt(unidades_asignar));
// }