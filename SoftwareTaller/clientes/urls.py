from . import views

from django.urls import path

urlpatterns = [
    #Menú de clientes
    path("", views.clientes, name="clientes"),
    #Registrar
    path("formulario_registrar_clientes/", views.formulario_registrar_clientes, name="formulario_registrar_clientes"),
    path("registrar_cliente/", views.registrar_cliente, name="registrar_cliente"),
    path("formulario_registrar_clientes/registrado", views.formulario_registrar_clientes_registrado, name="formulario_registrar_clientes_registrado"),
    #Buscar
    path("buscar_clientes/", views.buscar_clientes, name="buscar_clientes"),
    #Editar
    path("formulario_editar_clientes/<int:id>", views.formulario_editar_clientes, name="formulario_editar_clientes"), 
    path("editar_cliente/", views.editar_cliente, name="editar_cliente"),
    #Eliminar
    path("eliminar_cliente/<int:id>", views.eliminar_cliente, name="eliminar_cliente"),
    path("clientes/eliminado/", views.clientes_eliminado, name="clientes_eliminado"),
]
