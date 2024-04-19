from django.db import models

# Create your models here.


class TipoProducto(models.Model):
    tipo = models.CharField(max_length=40, null=False, blank=False)

class Producto(models.Model):
    marca = models.CharField(max_length=60,null=False, blank=False)
    referencia = models.CharField(max_length=40, null=False, blank=False)
    tipo_producto = models.ForeignKey(TipoProducto, on_delete=models.PROTECT)
    precio = models.IntegerField(null=False, blank=False)
    unidades_disponibles = models.IntegerField(null=False, blank=False)

