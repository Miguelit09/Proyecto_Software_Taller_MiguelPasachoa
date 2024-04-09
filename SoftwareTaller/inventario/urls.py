from . import views

from django.urls import path

urlpatterns = [
    #Menú de inventario
    path("", views.inventario, name="inventario"),
    #Registrar
    path("registrar_producto/", views.registrar_producto, name="registrar_producto"),
    #Buscar
    path("buscar_productos/", views.buscar_productos, name="buscar_productos"),
    #Editar
    path('obtener_registro_inventario/<int:producto_id>/', views.obtener_registro_inventario, name='obtener_registro_inventario'),
    path("editar_producto/", views.editar_producto, name="editar_producto"),
    #Eliminar
    path("eliminar_producto/<int:id>", views.eliminar_producto, name="eliminar_producto"),
]

