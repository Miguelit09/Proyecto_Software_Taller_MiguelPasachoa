from django.shortcuts import render
from django.http import JsonResponse
from django.core.serializers import serialize
from .models import Cliente, Servicio, Producto
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Create your views here.

# MENÚ SERVICIOS
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
    data = [{'id':producto.id, 'referencia':producto.referencia, 'tipo_producto':producto.tipo_producto, 'precio': producto.precio} for producto in productos]
    return JsonResponse(data, safe=False)



## Recepción de formulario y creacion de registro
def registrar_servicio(request):
    nombre_servicio = request.POST['nombre_servicio']
    descripcion = request.POST['descripcion']
    costo_total = request.POST['costo_total']
    fecha = request.POST['fecha']
    cliente = Cliente.objects.get(id=request.POST['input_cliente_id_hidden'])
    productos_seleccionados = request.POST.get('productos_seleccionados', '')
    ids_productos = productos_seleccionados.split(',') if productos_seleccionados else []  # Convertir la cadena de texto en una lista de IDs de productos

    nuevo_servicio = Servicio.objects.create(nombre_servicio=nombre_servicio, descripcion=descripcion, costo_total=costo_total, fecha=fecha, cliente=cliente)

    for id_producto in ids_productos:
        producto = Producto.objects.get(id=id_producto)
        nuevo_servicio.productos.add(producto)
    
    return servicios(request, registrado=True)

# ## Vista del formulario con el alert de registro exitoso
# def formulario_registrar_servicios_registrado(request):
#     return formulario_registrar_servicios(request, registrado=True)

# # BUSCAR servicios

# def buscar_servicios(request):
#     campo = request.GET['campo']
#     buscar = request.GET['buscar']
#     resultado = Servicio.objects.filter(**{f'{campo}__icontains': buscar})
#     if (resultado.count()==0):
#         no_coincidencias = True
#     else:
#         no_coincidencias = False
#     return servicios(request, servicios=resultado, sin_coincidencias=no_coincidencias, campo=campo, buscar=buscar)



# # EDITAR servicios

def obtener_registro_servicios(request, servicio_id):
    servicio = Servicio.objects.get(id=servicio_id)

    # Convertir los productos a una lista de diccionarios
    productos = serialize('json', servicio.productos.all())


    datos_servicio = {
        'id': servicio.id,
        'nombre_servicio': servicio.nombre_servicio,
        'descripcion': servicio.descripcion,
        'costo_total': servicio.costo_total,
        'fecha': servicio.fecha,
        'cliente_id': servicio.cliente.id,
        'cliente_documento_identidad': servicio.cliente.documento_identidad,
        'productos': productos,
    }
    return JsonResponse(datos_servicio)

def editar_servicio(request):
    id = request.POST.get('registro_id', None)
    nombre_servicio = request.POST.get('nombre_servicio', None)
    descripcion = request.POST.get('descripcion', None)
    costo_total = request.POST.get('costo_total', None)
    fecha = request.POST.get('fecha', None)
    cliente = Cliente.objects.get(id=request.POST('input_cliente_id_hidden'))
    productos_seleccionados = request.POST.get('productos_seleccionados', '')
    
    if id and nombre_servicio and descripcion and costo_total and fecha and cliente is not None:
        try:
            servicio = Servicio.objects.get(id=id)
            servicio.nombre_servicio = nombre_servicio
            servicio.descripcion = descripcion
            servicio.costo_total = costo_total
            servicio.fecha = fecha
            servicio.cliente = cliente

            # Eliminar todos los productos asociados al servicio
            servicio.productos.clear()
            ids_productos = productos_seleccionados.split(',') if productos_seleccionados else []  # Convertir la cadena de texto en una lista de IDs de productos
            for id_producto in ids_productos:
                producto = Producto.objects.get(id=id_producto)
                servicio.productos.add(producto)
            servicio.save()
            return servicios(request, actualizado=True)
        except Servicio.DoesNotExist:
            return servicios(request, error=True, mensaje_error="El servicio especificado no existe.")
        except Producto.DoesNotExist:
            return servicios(request, error=True, mensaje_error="Uno o más productos seleccionados no existen.")
        except Exception as e:
            return servicios(request, error=True, mensaje_error=str(e))
    else:
        return servicios(request, error=True, mensaje_error="Faltan campos requeridos para editar el servicio.")





# ELIMINAR servicios

## Vista que recibe el id y elimina el servicio de la base de datos
def eliminar_servicio(request, id):
    servicio = Servicio.objects.get(id=id)

    servicio.delete()
    return servicios(request, eliminado=True)
