from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Producto
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Create your views here.

# MENÚ INVENTARIO
def inventario(request, productos=None, registrado=False, eliminado=False, actualizado=False, sin_coincidencias=False, campo=None, buscar=None, name_url="inventario"):
    if productos is None:
        productos = Producto.objects.all()
    paginator = Paginator(productos, 20)

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

    return render(request, 'inventario.html', {
        "registrado": registrado,
        "eliminado": eliminado,
        "actualizado": actualizado,
        "sin_coincidencias": sin_coincidencias,
        "buscar": buscar,
        "campo": campo,
        "pagina": pagina,
        "name_url": name_url,
    })

# REGISTRAR PRODUCTOS


## Recepción de formulario y creacion de registro
def registrar_producto(request):
    marca = request.POST['marca']
    referencia = request.POST['referencia']
    tipo_producto = request.POST['tipo_producto']
    precio = request.POST['precio']
    unidades_disponibles = request.POST['unidades_disponibles']

    Producto.objects.create(marca=marca, referencia=referencia, tipo_producto=tipo_producto, precio=precio, unidades_disponibles=unidades_disponibles)

    return inventario(request, registrado=True)



# # BUSCAR PRODUCTOS

def buscar_productos(request):
    campo = request.GET['campo']
    buscar = request.GET['buscar']
    filtro = request.GET.get('filtro')

    if filtro == "menor_igual":
        resultado = Producto.objects.filter(**{f'{campo}__lte': buscar}).order_by('-' + campo)
    elif filtro == "mayor_igual":
        resultado = Producto.objects.filter(**{f'{campo}__gte': buscar}).order_by(campo)
    else:
        resultado = Producto.objects.filter(**{f'{campo}__icontains': buscar})
    if (resultado.count()==0):
        no_coincidencias = True
    else:
        no_coincidencias = False
    return inventario(request, productos=resultado, sin_coincidencias=no_coincidencias, campo=campo, buscar=buscar)



# EDITAR PRODUCTOS

## Vista que recibe el id y renderiza el formulario de edicion

def obtener_registro_inventario(request, producto_id):
    producto = Producto.objects.get(id=producto_id)
    datos_producto = {
        'id': producto.id,
        'marca': producto.marca,
        'referencia': producto.referencia,
        'tipo_producto': producto.tipo_producto,
        'precio': producto.precio,
        'unidades_disponibles': producto.unidades_disponibles,
    }
    return JsonResponse(datos_producto)

def editar_producto(request):
    id = request.POST['registro_id']
    marca = request.POST['marca']
    referencia = request.POST['referencia']
    tipo_producto = request.POST['tipo_producto']
    precio = request.POST['precio']
    unidades_disponibles = request.POST['unidades_disponibles']

    producto = Producto.objects.get(id=id)
    producto.marca = marca
    producto.referencia = referencia
    producto.tipo_producto = tipo_producto
    producto.precio = precio
    producto.unidades_disponibles = unidades_disponibles

    producto.save()

    return inventario(request, actualizado=True)




# ELIMINAR PRODUCTOS

## Vista que recibe el id y elimina el producto de la base de datos
def eliminar_producto(request, id):
    producto = Producto.objects.get(id=id)

    producto.delete()
    return redirect('inventario_eliminado')

## Vista que recarga el menú de inventario con el alert de eliminación exitosa
def inventario_eliminado(request):
    return inventario(request, eliminado=True)