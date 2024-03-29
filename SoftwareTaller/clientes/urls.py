from . import views

from django.urls import path

urlpatterns = [
    path("", views.clientes, name="clientes"),
    path("formulario_registrar_clientes/", views.formulario_registrar_clientes, name="formulario_registrar_clientes"),
    path("registrar_cliente/", views.registrar_cliente, name="registrar_cliente"),
]
