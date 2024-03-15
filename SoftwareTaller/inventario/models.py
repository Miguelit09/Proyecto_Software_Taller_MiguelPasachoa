from django.db import models

# Create your models here.

class Producto(models.Model):
    OPCIONES_TIPO = [
        ("Llanta", "Opción 1"),
        ("Aceite", "Opción 2"),
        ("Filtro", "Opción 3"),
        ("Grasa", "Opción 4")
    ]
    marca = models.CharField(max_length=60,null=False, blank=False)
    referencia = models.CharField(max_length=40, null=False, blank=False)
    tipo_producto = models.CharField(choices=OPCIONES_TIPO, null=False, blank=False)
    precio = models.IntegerField(null=False, blank=False)
    unidades_disponibles = models.IntegerField(null=False, blank=False)