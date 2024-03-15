from django.db import models
from datetime import date
from ..clientes import Cliente
# Create your models here.
class Servicio(models.Model):
    OPCIONES_SERVICIO = [
        ("Venta", "Opción 1"),
        ("Engrase", "Opción 2"),
        # Más servicios
    ]
    nombre_servicio = models.CharField(choices=OPCIONES_SERVICIO, null=False, blank=False)
    descripcion = models.CharField(max_length=200, null=True, blank=True)
    costo_total = models.IntegerField(null=False, blank=False)
    fecha = models.DateField(default = date.today())
    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT)


