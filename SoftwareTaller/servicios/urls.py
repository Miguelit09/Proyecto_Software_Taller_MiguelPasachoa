from . import views

from django.urls import path

urlpatterns = [
    #Menú de servicios
    path("", views.servicios, name="servicios"),
    #Registrar
    path("formulario_registrar_servicios/", views.formulario_registrar_servicios, name="formulario_registrar_servicios"),
    # path("registrar_servicio/", views.registrar_servicio, name="registrar_servicio"),
    # path("formulario_registrar_servicios/registrado", views.formulario_registrar_servicios_registrado, name="formulario_registrar_servicios_registrado"),
    # #Buscar
    # path("buscar_servicios/", views.buscar_servicios, name="buscar_servicios"),
    # #Editar
    # path("formulario_editar_servicios/<int:id>", views.formulario_editar_servicios, name="formulario_editar_servicios"), 
    # path("editar_servicio/", views.editar_servicio, name="editar_servicio"),
    # #Eliminar
    # path("eliminar_servicio/<int:id>", views.eliminar_servicio, name="eliminar_servicio"),
    # path("servicios/eliminado/", views.servicios_eliminado, name="servicios_eliminado"),
]
