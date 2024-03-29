from django.shortcuts import render
from django.http import HttpResponse
from .models import Cliente
# Create your views here.

def clientes(request):
    clientes = Cliente.objects.all()
    return render(request, 'clientes.html', {
        "clientes": clientes
    })

def formulario_registrar_clientes(request):
    return render(request, 'registrar_clientes.html', {})


def registrar_cliente(request):
    nombre_cliente = request.POST['nombre_cliente']
    documento_identidad = request.POST['documento_identidad']
    correo_electronico = request.POST['correo_electronico']
    telefono = request.POST['telefono']

    Cliente.objects.create(nombre_cliente=nombre_cliente, documento_identidad=documento_identidad, correo_electronico=correo_electronico, telefono=telefono)

    return formulario_registrar_clientes(request)