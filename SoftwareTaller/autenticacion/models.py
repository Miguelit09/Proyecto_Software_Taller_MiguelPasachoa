
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils.translation import gettext as _

class Administrador(AbstractUser):
    nombre_usuario = models.CharField(max_length=50, null=False, blank=False)
    contraseña = models.CharField(max_length=120)
    correo = models.EmailField(max_length=150)

    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        related_name='administrador_groups',
        related_query_name='administrador_group',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='administrador_permissions',
        related_query_name='administrador_permission',
        help_text=_('Specific permissions for this user.'),
    )