from django.db import models
from django.utils import timezone
from clientes.models import Cliente
from inventario.models import Producto
# Create your models here.
class Servicio(models.Model):
    OPCIONES_SERVICIO = [
        ("Venta", "Venta"),
        ("Engrase", "Engrase"),
        # Más servicios
    ]
    nombre_servicio = models.CharField(max_length=40, choices=OPCIONES_SERVICIO, null=False, blank=False)
    descripcion = models.CharField(max_length=200, null=True, blank=True)
    costo_total = models.IntegerField(null=False, blank=False)
    fecha = models.DateField(default=timezone.now)
    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT)

class Servicio_Productos(models.Model):
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT)
    cantidad = models.IntegerField(default=1)
