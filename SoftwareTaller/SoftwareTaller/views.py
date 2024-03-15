from django.http import HttpResponse
from django.shortcuts import render

def inicio(response):
    return HttpResponse("Inicio")

def ingreso(request):
    return render(request, 'ingreso.html', {})