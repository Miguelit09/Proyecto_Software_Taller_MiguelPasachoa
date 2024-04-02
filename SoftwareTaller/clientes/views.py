from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Cliente
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Create your views here.

# MENÚ CLIENTES
def clientes(request, clientes=None, eliminado=False, actualizado=False, sin_coincidencias=False, campo=None, buscar=None, name_url="clientes"):
    if clientes is None:
        clientes = Cliente.objects.all()
    paginator = Paginator(clientes, 20)

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

    return render(request, 'clientes.html', {
        "eliminado": eliminado,
        "actualizado": actualizado,
        "sin_coincidencias": sin_coincidencias,
        "buscar": buscar,
        "campo": campo,
        "pagina": pagina,
        "name_url": name_url,
    })

# REGISTRAR CLIENTES

## Formulario
def formulario_registrar_clientes(request, registrado=False, name_url="formulario_registrar_clientes", nombre_seccion="Clientes"):
    return render(request, 'registrar_clientes.html', {
        'registrado': registrado,
        'name_url': name_url,
        'nombre_seccion': nombre_seccion,
    })

## Recepción de formulario y creacion de registro
def registrar_cliente(request):
    nombre_cliente = request.POST['nombre_cliente']
    documento_identidad = request.POST['documento_identidad']
    correo_electronico = request.POST['correo_electronico']
    telefono = request.POST['telefono']

    Cliente.objects.create(nombre_cliente=nombre_cliente, documento_identidad=documento_identidad, correo_electronico=correo_electronico, telefono=telefono)

    return redirect('formulario_registrar_clientes_registrado')

## Vista del formulario con el alert de registro exitoso
def formulario_registrar_clientes_registrado(request):
    return formulario_registrar_clientes(request, registrado=True)

# BUSCAR CLIENTES

def buscar_clientes(request):
    campo = request.GET['campo']
    buscar = request.GET['buscar']
    resultado = Cliente.objects.filter(**{f'{campo}__icontains': buscar})
    if (resultado.count()==0):
        no_coincidencias = True
    else:
        no_coincidencias = False
    return clientes(request, clientes=resultado, sin_coincidencias=no_coincidencias, campo=campo, buscar=buscar)



# EDITAR CLIENTES

## Vista que recibe el id y renderiza el formulario de edicion
def formulario_editar_clientes(request, id):
    cliente = Cliente.objects.get(id=id)
    return render(request, 'editar_clientes.html', {
        'cliente': cliente
    })

def editar_cliente(request):
    id = request.POST['id']
    nombre_cliente = request.POST['nombre_cliente']
    documento_identidad = request.POST['documento_identidad']
    correo_electronico = request.POST['correo_electronico']
    telefono = request.POST['telefono']

    cliente = Cliente.objects.get(id=id)
    cliente.nombre_cliente = nombre_cliente
    cliente.documento_identidad = documento_identidad
    cliente.correo_electronico = correo_electronico
    cliente.telefono = telefono

    cliente.save()

    return clientes(request, actualizado=True)




# ELIMINAR CLIENTES

## Vista que recibe el id y elimina el cliente de la base de datos
def eliminar_cliente(request, id):
    cliente = Cliente.objects.get(id=id)

    cliente.delete()
    return redirect('clientes_eliminado')

## Vista que recarga el menú de clientes con el alert de eliminación exitosa
def clientes_eliminado(request):
    return clientes(request, eliminado=True)