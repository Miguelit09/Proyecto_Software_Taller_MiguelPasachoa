from . import views

from django.urls import path

urlpatterns = [
    #Menú de clientes
    path("", views.clientes, name="clientes"),
    #Registrar
    path("registrar_cliente/", views.registrar_cliente, name="registrar_cliente"),
    #Buscar
    path("buscar_clientes/", views.buscar_clientes, name="buscar_clientes"),
    #Editar
    path('obtener_registro_clientes/<int:cliente_id>/', views.obtener_registro_clientes, name='obtener_registro_clientes'),
    path("editar_cliente/", views.editar_cliente, name="editar_cliente"),
    #Eliminar
    path("eliminar_cliente/<int:id>", views.eliminar_cliente, name="eliminar_cliente"),
]
