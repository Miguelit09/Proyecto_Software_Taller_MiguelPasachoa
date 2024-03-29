from . import views

from django.urls import path

urlpatterns = [
    path("", views.inventario, name="inventario"),
]
