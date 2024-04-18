from django import forms
from .models import Administrador


class UserAuthenticationForm(forms.Form):
    username = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={'id': 'nombre_usuario', 'class': 'card__input_form heigth_input_32', 'placeholder': 'Nombre de usuario', 'required': True}),
    )
    password = forms.CharField(
            max_length=100,
            widget=forms.PasswordInput(attrs={'id': 'contraseña', 'class': 'card__input_form heigth_input_32', 'placeholder': 'Contraseña', 'required': True}),
    )

    def __init__(self, *args, **kwargs):
        super(UserAuthenticationForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['placeholder'] = 'Nombre de usuario'
        self.fields['password'].widget.attrs['placeholder'] = 'Contraseña'
        # Agregar cualquier otra personalización de widgets o campos aquí si es necesario

