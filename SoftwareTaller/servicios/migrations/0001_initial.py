# Generated by Django 5.0.3 on 2024-04-12 19:17

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clientes', '0001_initial'),
        ('inventario', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Servicio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_servicio', models.CharField(choices=[('Venta', 'Venta'), ('Engrase', 'Engrase')], max_length=40)),
                ('descripcion', models.CharField(blank=True, max_length=200, null=True)),
                ('costo_total', models.IntegerField()),
                ('fecha', models.DateField(default=django.utils.timezone.now)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='clientes.cliente')),
            ],
        ),
        migrations.CreateModel(
            name='Servicio_Productos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField(default=1)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='inventario.producto')),
                ('servicio', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='servicios.servicio')),
            ],
        ),
    ]
