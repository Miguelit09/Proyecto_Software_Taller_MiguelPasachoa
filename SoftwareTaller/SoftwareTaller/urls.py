"""
URL configuration for SoftwareTaller project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    path('', views.ingreso, name="ingreso"),
    path('admin/', admin.site.urls),
    path('cerrar_sesion/', views.cerrar_sesion, name="cerrar_sesion"),
    # path('crear_usuario/', views.crear_usuario, name="crear_usuario"),
    path('menu_opciones/', views.menu_opciones, name="menu_opciones"),
    path('clientes/', include('clientes.urls')),
    path('inventario/', include('inventario.urls')),
    path('servicios/', include('servicios.urls')),
]
