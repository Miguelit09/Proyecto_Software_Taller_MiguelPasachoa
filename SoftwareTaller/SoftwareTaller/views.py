from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password, check_password
from autenticacion.forms import UserAuthenticationForm
from autenticacion.models import Administrador

def crear_usuario(request):
    username = "Admin"
    password = make_password('lubricentromorrorico123')
    correo = "miguel.p0908@gmail.com"
    Administrador.objects.create(username=username, password=password, correo=correo)
    return HttpResponse("Se creó el usuario")


def ingreso(request):
    if request.method == 'POST':
        form = UserAuthenticationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = Administrador.objects.get(username__iexact=username)
            if check_password(password, user.password):
                print("Usuario válido")
                login(request, user)
                # Redirige al usuario a la página deseada después del inicio de sesión
                return redirect('menu_opciones')
            else:
                form = UserAuthenticationForm()
                return render(request, 'ingreso.html', {'form': form})
    else:
        form = UserAuthenticationForm()
        return render(request, 'ingreso.html', {'form': form})

def menu_opciones(request):
    return render (request, 'menu_opciones.html', {})