from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Cliente, Servicio, Producto, Servicio_Productos, NombreServicio
from inventario.models import TipoProducto
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
# Create your views here.

# MENÚ SERVICIOS


@login_required
def servicios(request, servicios=None, registrado=False, eliminado=False, actualizado=False, sin_coincidencias=False, campo=None, buscar=None, error=False, mensaje_error=None, name_url="servicios"):
    if servicios is None:
        servicios = Servicio.objects.all()
    paginator = Paginator(servicios, 20)

    numero_pagina = request.GET.get('pagina')

    try:
        # Obtener la página solicitada
        pagina = paginator.page(numero_pagina)
    except PageNotAnInteger:
        # Si el número de página no es un entero, mostrar la primera página
        pagina = paginator.page(1)
    except EmptyPage:
        # Si la página está fuera de rango (página vacía), mostrar la última página
        pagina = paginator.page(paginator.num_pages)
    nombres_servicios = NombreServicio.objects.all()
    tipos_productos = TipoProducto.objects.all()
    lista_nombres_servicios = list(NombreServicio.objects.values())

    return render(request, 'servicios.html', {
        "registrado": registrado,
        "eliminado": eliminado,
        "actualizado": actualizado,
        "sin_coincidencias": sin_coincidencias,
        "buscar": buscar,
        "campo": campo,
        "pagina": pagina,
        "error": error,
        "mensaje_error": mensaje_error,
        "name_url": name_url,
        'nombres_servicios': nombres_servicios,
        'lista_nombres_servicios': lista_nombres_servicios,
        'tipos_productos': tipos_productos,
    })

# REGISTRAR servicios

def buscar_asignacion_cliente(request):
    valor_buscar = request.GET.get('buscar', '')
    clientes = Cliente.objects.filter(documento_identidad__icontains=valor_buscar)
    data = [{'id':cliente.id, 'nombre_cliente':cliente.nombre_cliente, 'documento_identidad':cliente.documento_identidad} for cliente in clientes]
    return JsonResponse(data, safe=False)


def buscar_asignacion_productos(request):
    valor_buscar = request.GET.get('buscar', '')
    productos = Producto.objects.filter(referencia__icontains=valor_buscar)
    data = [{'id':producto.id, 'referencia':producto.referencia, 'tipo_producto':producto.tipo_producto.tipo, 'precio': producto.precio, 'unidades_disponibles': producto.unidades_disponibles} for producto in productos]
    return JsonResponse(data, safe=False)



## Recepción de formulario y creacion de registro
def registrar_servicio(request):
    try:
        nombre_servicio = request.POST['nombre_servicio']
        descripcion = request.POST['descripcion']
        precio_adicional = request.POST['input_precio_adicional']
        costo_total = request.POST['costo_total']
        fecha = request.POST['fecha']
        cliente = Cliente.objects.get(id=request.POST['input_cliente_id_hidden'])
        productos_seleccionados = request.POST.get('productos_seleccionados', '')
        productos_lista = productos_seleccionados.split(',') if productos_seleccionados else []  # Convertir la cadena de texto en una lista de IDs de productos
        nombre_servicio_seleccionado = NombreServicio.objects.get(id=nombre_servicio)
        nuevo_servicio = Servicio.objects.create(nombre_servicio=nombre_servicio_seleccionado, descripcion=descripcion, precio_adicional=precio_adicional, costo_total=costo_total, fecha=fecha, cliente=cliente)

        for producto_item in productos_lista:
            producto_id, cantidad = producto_item.split(':')
            producto = Producto.objects.get(id=producto_id)
            cantidad = int(cantidad)
            nuevo_servicio_producto = Servicio_Productos.objects.create(
                servicio=nuevo_servicio,
                producto=producto,
                cantidad=cantidad
            )
            producto.unidades_disponibles -= cantidad
            producto.save()

        cliente_email = cliente.correo_electronico
        informacion_servicio = nuevo_servicio.descripcion
        lista_servicio_producto_asociados = Servicio_Productos.objects.filter(servicio=nuevo_servicio)
        for registro in lista_servicio_producto_asociados:
            informacion_servicio += f'\n{registro.producto.tipo_producto.tipo} marca {registro.producto.marca} (Unidades: {registro.cantidad}) =  ${registro.producto.precio * registro.cantidad}'
        informacion_servicio += f'\nCosto total: ${nuevo_servicio.costo_total}'

        send_mail(
            f'Factura Servicio {nuevo_servicio.nombre_servicio.nombre_servicio} Lubricentro Morrorico',
            informacion_servicio,
            'lubricentromorrorico@gmail.com', #Remitente
            [cliente_email],
            fail_silently=False,
        )

        return servicios(request, registrado=True)
    except:
            return servicios(request, error=True, mensaje_error="No se está accediendo adecuadamente a la funcionalidad.")


# # BUSCAR servicios

def buscar_servicios(request):
    campo = request.GET['campo']
    buscar = request.GET['buscar']
    filtro = request.GET.get('filtro')

    if campo == "costo_total" or campo == "fecha":
        if filtro == "menor_igual":
            resultado = Servicio.objects.filter(**{f'{campo}__lte': buscar}).order_by('-' + campo)
        elif filtro == "mayor_igual":
            resultado = Servicio.objects.filter(**{f'{campo}__gte': buscar}).order_by(campo)
    elif campo == "nombre_servicio":
        resultado = Servicio.objects.filter(nombre_servicio = buscar)
    elif campo == "cliente":
        resultado = Servicio.objects.filter(cliente_id = buscar)
    elif campo == "producto":
        resultado = Servicio.objects.filter(servicio_productos__producto_id=buscar)
    else:
        resultado = Servicio.objects.filter(**{f'{campo}__icontains': buscar})
    if (resultado.count()==0):
        no_coincidencias = True
    else:
        no_coincidencias = False
    return servicios(request, servicios=resultado, sin_coincidencias=no_coincidencias, campo=campo, buscar=buscar)

# # EDITAR servicios

def obtener_registro_servicios(request, servicio_id):
    servicio = Servicio.objects.get(id=servicio_id)

    # Convertir los productos a una lista de diccionarios
    productos_ids = []
    productos_referencias = []
    productos_precios = []
    productos_unidades = []
    cantidad_productos = []
    for servicio_producto in servicio.servicio_productos_set.all():
        producto = servicio_producto.producto
        productos_ids.append(producto.id)
        productos_referencias.append(producto.referencia)
        productos_precios.append(producto.precio)
        cantidad_productos.append(servicio_producto.cantidad)


    datos_servicio = {
        'id': servicio.id,
        'nombre_servicio': servicio.nombre_servicio.id,
        'descripcion': servicio.descripcion,
        'precio_adicional': servicio.precio_adicional,
        'costo_total': servicio.costo_total,
        'fecha': servicio.fecha,
        'cliente_id': servicio.cliente.id,
        'cliente_documento_identidad': servicio.cliente.documento_identidad,
        'productos_ids': productos_ids,
        'productos_referencias': productos_referencias,
        'productos_precios': productos_precios,
        'productos_unidades': productos_unidades,
        'cantidad_productos': cantidad_productos,
    }
    return JsonResponse(datos_servicio)

def editar_servicio(request):
    id = request.POST.get('registro_id', None)
    nombre_servicio = request.POST.get('nombre_servicio', None)
    precio_adicional = request.POST.get('input_precio_adicional', None)
    descripcion = request.POST.get('descripcion', None)
    costo_total = request.POST.get('costo_total', None)
    fecha = request.POST.get('fecha', None)
    id_cliente_editar = request.POST.get('input_cliente_id_hidden_editar', None)
    productos_seleccionados = request.POST.get('productos_seleccionados_editar', '')
    try:
        nombre_servicio_seleccionado = NombreServicio.objects.get(id=nombre_servicio)

        servicio = Servicio.objects.get(id=id)
        servicio.nombre_servicio = nombre_servicio_seleccionado
        servicio.descripcion = descripcion
        servicio.precio_adicional = precio_adicional
        servicio.costo_total = costo_total
        servicio.fecha = fecha
        cliente = Cliente.objects.get(id=id_cliente_editar)
        servicio.cliente = cliente

        # Eliminar todos los productos asociados al servicio
        consulta_productos_en_eliminacion = Servicio_Productos.objects.filter(servicio=servicio)
        for producto_en_eliminacion in consulta_productos_en_eliminacion:
            item = producto_en_eliminacion.producto
            item.unidades_disponibles += producto_en_eliminacion.cantidad
            item.save()
        consulta_productos_en_eliminacion.delete()

        productos_lista = productos_seleccionados.split(',') if productos_seleccionados else []  # Convertir la cadena de texto en una lista de IDs de productos
        for producto_item in productos_lista:
            producto_id, cantidad = producto_item.split(':')
            producto = Producto.objects.get(id=producto_id)
            cantidad = int(cantidad)
            Servicio_Productos.objects.create(
                servicio = servicio,
                producto=producto,
                cantidad=cantidad,
            )
            producto.unidades_disponibles -= cantidad
            producto.save()
        servicio.save()
        return servicios(request, actualizado=True)
    except Servicio.DoesNotExist:
        return servicios(request, error=True, mensaje_error="El servicio especificado no existe.")
    except Producto.DoesNotExist:
        return servicios(request, error=True, mensaje_error="Uno o más productos seleccionados no existen.")
    except Exception as e:
        return servicios(request, error=True, mensaje_error="No se está accediendo adecuadamente a esta funcionalidad.")





# ELIMINAR servicios

## Vista que recibe el id y elimina el servicio de la base de datos
def eliminar_servicio(request, id):
    try:
        servicio = Servicio.objects.get(id=id)

        servicio.delete()
        return servicios(request, eliminado=True)
    except:
        return servicios(request, error=True, mensaje_error="No se está accediendo adecuadamente a esta funcionalidad.")