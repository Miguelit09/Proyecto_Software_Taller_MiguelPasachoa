from . import views

from django.urls import path

urlpatterns = [
    #Menú de inventario
    path("", views.inventario, name="inventario"),
    #Registrar
    path("formulario_registrar_productos/", views.formulario_registrar_productos, name="formulario_registrar_productos"),
    path("registrar_producto/", views.registrar_producto, name="registrar_producto"),
    path("formulario_registrar_productos/registrado", views.formulario_registrar_productos_registrado, name="formulario_registrar_productos_registrado"),
    # #Buscar
    # path("buscar_clientes/", views.buscar_clientes, name="buscar_clientes"),
    #Editar
    path("formulario_editar_productos/<int:id>", views.formulario_editar_productos, name="formulario_editar_productos"), 
    path("editar_producto/", views.editar_producto, name="editar_producto"),
    #Eliminar
    path("eliminar_producto/<int:id>", views.eliminar_producto, name="eliminar_producto"),
    path("inventario/eliminado/", views.inventario_eliminado, name="inventario_eliminado"),
]

