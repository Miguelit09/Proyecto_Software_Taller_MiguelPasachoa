from . import views

from django.urls import path

urlpatterns = [
    #Menú de servicios
    path("", views.servicios, name="servicios"),
    path("buscar_asignacion_cliente/", views.buscar_asignacion_cliente, name="buscar_asignacion_cliente"),
    path("buscar_asignacion_productos/", views.buscar_asignacion_productos, name="buscar_asignacion_productos"),
    #Registrar
    path("registrar_servicio/", views.registrar_servicio, name="registrar_servicio"),
    # path("formulario_registrar_servicios/registrado", views.formulario_registrar_servicios_registrado, name="formulario_registrar_servicios_registrado"),
    # #Buscar
    path("buscar_servicios/", views.buscar_servicios, name="buscar_servicios"),
    # #Editar
    path('obtener_registro_servicios/<int:servicio_id>/', views.obtener_registro_servicios, name='obtener_registro_servicios'),
    path("editar_servicio/", views.editar_servicio, name="editar_servicio"),
    # #Eliminar
    path("eliminar_servicio/<int:id>", views.eliminar_servicio, name="eliminar_servicio"),

]
