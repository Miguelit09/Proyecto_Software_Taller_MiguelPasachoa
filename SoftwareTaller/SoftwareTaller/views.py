
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from django.contrib.auth.hashers import make_password, check_password
from autenticacion.forms import UserAuthenticationForm
from autenticacion.models import Administrador

# def crear_usuario(request):
#     username = "Admin"
#     password = make_password('lubricentromorrorico123')
#     correo = "miguel.p0908@gmail.com"
#     Administrador.objects.create(username=username, password=password, correo=correo)
#     return HttpResponse("Se creó el usuario")



def ingreso(request, credenciales_equivocadas=False):
    if request.method == 'POST':
        form = UserAuthenticationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            try:
                user = Administrador.objects.get(username__iexact=username)
            except:
                credenciales_equivocadas = True
                return render(request, 'ingreso.html', {'form': form, 'credenciales_equivocadas': credenciales_equivocadas})
            if check_password(password, user.password):
                print("Usuario válido")
                login(request, user)
                next_url = request.POST.get('next', '')  # Obtener la URL de redirección desde el formulario
                if next_url:
                    return redirect(next_url)
                else:
                    return redirect('menu_opciones')
            else:
                credenciales_equivocadas = True
                return render(request, 'ingreso.html', {'form': form, 'credenciales_equivocadas': credenciales_equivocadas})
    else:
        form = UserAuthenticationForm()
        return render(request, 'ingreso.html', {'form': form, 'credenciales_equivocadas': credenciales_equivocadas})

@login_required
def menu_opciones(request):
    return render (request, 'menu_opciones.html', {})

def cerrar_sesion(request):
    logout(request)
    return redirect('ingreso')  # Redirige a la página de inicio de sesión después de cerrar sesión