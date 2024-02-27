from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import *



class UserRegisterForm(UserCreationForm):
    first_name = forms.CharField(max_length=32, help_text='First Name')
    last_name = forms.CharField(max_length=32, help_text='Last Name')
    profile_picture = forms.FileField(required=False)
    username = None
    email = forms.EmailField(required=True, max_length=64, help_text='Enter a valid email address')
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ('email','first_name','last_name','password1', 'password2', 'profile_picture')
        help_texts = {
            'username': None,
            'email': None,            
        }
        

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super(UserRegisterForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        user.avatar = self.cleaned_data.get('avatar')
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user