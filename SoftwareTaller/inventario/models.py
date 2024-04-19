from django.db import models

# Create your models here.

class Producto(models.Model):
    OPCIONES_TIPO = [
        ("Llanta", "Llanta"),
        ("Aceite", "Aceite"),
        ("Filtro", "Filtro"),
        ("Grasa", "Grasa")
    ]
    marca = models.CharField(max_length=60,null=False, blank=False)
    referencia = models.CharField(max_length=40, null=False, blank=False)
    tipo_producto = models.CharField(max_length=40, choices=OPCIONES_TIPO, null=False, blank=False)
    precio = models.IntegerField(null=False, blank=False)
    unidades_disponibles = models.IntegerField(null=False, blank=False)

# class TipoProducto(models.Model):
#     tipo = 