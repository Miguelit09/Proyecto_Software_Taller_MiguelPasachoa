from django.db import models

# Create your models here.

class Cliente(models.Model):
    nombre_cliente = models.CharField(max_length=50, null=False, blank=False)
    documento_identidad = models.CharField(max_length=20, null=False, blank=False)
    correo_electronico = models.EmailField(max_length=100, null=True, blank=True)
    telefono = models.CharField(max_length=15, null=True, blank=True)