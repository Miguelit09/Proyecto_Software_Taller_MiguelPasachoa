from django.db import models

# Create your models here.

class Productos(models.Model):
    OPCIONES_TIPO = [
        
    ]
    marca = models.CharField(max_length=60,null=False, blank=False)
    referencia = models.CharField(max_length=40, null=False, blank=False)
    tipo_producto = models