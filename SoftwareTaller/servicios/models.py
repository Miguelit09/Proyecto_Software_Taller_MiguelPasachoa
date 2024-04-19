from django.db import models
from django.utils import timezone
from clientes.models import Cliente
from inventario.models import Producto
# Create your models here.

class NombreServicio(models.Model):
    nombre_servicio = models.CharField(max_length=40, null=False, blank=False)

class Servicio(models.Model):
    nombre_servicio = models.ForeignKey(NombreServicio, on_delete=models.PROTECT)
    descripcion = models.CharField(max_length=200, null=True, blank=True)
    costo_total = models.IntegerField(null=False, blank=False)
    fecha = models.DateField(default=timezone.now)
    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT)

class Servicio_Productos(models.Model):
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT)
    cantidad = models.IntegerField(default=1)
