from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Cliente, Servicio
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Create your views here.

# MENÚ SERVICIOS
def servicios(request, servicios=None, registrado=False, eliminado=False, actualizado=False, sin_coincidencias=False, campo=None, buscar=None, name_url="servicios"):
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
        "name_url": name_url,
    })

# REGISTRAR servicios

## Formulario
def formulario_registrar_servicios(request, registrado=False, name_url="formulario_registrar_servicios"):
    clientes = Cliente.objects.all()
    paginator = Paginator(clientes, 5)

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

    return render(request, 'registrar_servicios.html', {
        'registrado': registrado,
        'name_url': name_url,
        "pagina": pagina,
    })

# ## Recepción de formulario y creacion de registro
# def registrar_servicio(request):
#     nombre_servicio = request.POST['nombre_servicio']
#     documento_identidad = request.POST['documento_identidad']
#     correo_electronico = request.POST['correo_electronico']
#     telefono = request.POST['telefono']

#     Servicio.objects.create(nombre_servicio=nombre_servicio, documento_identidad=documento_identidad, correo_electronico=correo_electronico, telefono=telefono)

#     return redirect('formulario_registrar_servicios_registrado')

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

# ## Vista que recibe el id y renderiza el formulario de edicion
# def formulario_editar_servicios(request, id):
#     servicio = Servicio.objects.get(id=id)
#     return render(request, 'editar_servicios.html', {
#         'servicio': servicio
#     })

# def editar_servicio(request):
#     id = request.POST['id']
#     nombre_servicio = request.POST['nombre_servicio']
#     documento_identidad = request.POST['documento_identidad']
#     correo_electronico = request.POST['correo_electronico']
#     telefono = request.POST['telefono']

#     servicio = Servicio.objects.get(id=id)
#     servicio.nombre_servicio = nombre_servicio
#     servicio.documento_identidad = documento_identidad
#     servicio.correo_electronico = correo_electronico
#     servicio.telefono = telefono

#     servicio.save()

#     return servicios(request, actualizado=True)




# # ELIMINAR servicios

# ## Vista que recibe el id y elimina el servicio de la base de datos
# def eliminar_servicio(request, id):
#     servicio = Servicio.objects.get(id=id)

#     servicio.delete()
#     return redirect('servicios_eliminado')

# ## Vista que recarga el menú de servicios con el alert de eliminación exitosa
# def servicios_eliminado(request):
#     return servicios(request, eliminado=True)