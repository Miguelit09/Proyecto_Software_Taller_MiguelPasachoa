from . import views

from django.urls import path

urlpatterns = [
    path("", views.inicio, name="inicio_inventario")
]
