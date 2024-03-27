
from django.shortcuts import render

def ingreso(request):
    return render(request, 'ingreso.html', {})

def menu_opciones(request):
    return render (request, 'menu_opciones.html', {})