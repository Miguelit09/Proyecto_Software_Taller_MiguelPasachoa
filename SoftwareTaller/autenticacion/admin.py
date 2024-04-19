
# Register your models here.

from django.contrib import admin
from .models import Administrador

@admin.register(Administrador)
class AdministradorAdmin(admin.ModelAdmin):
    # Define los campos que deseas mostrar en el panel de administración
    list_display = ('username', 'password', 'correo')
