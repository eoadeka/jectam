from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from .models import CustomUser, CustomGroup


class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    role = forms.ChoiceField(choices=CustomUser.ROLE_CHOICES)
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=255)
    last_name = forms.CharField(max_length=255)
    phone_number = forms.CharField(max_length=20)
    otp = forms.IntegerField()
    birth_date = forms.DateField(widget=admin.widgets.AdminDateWidget())
    gender = forms.ChoiceField(choices=CustomUser.GENDER_CHOICES)
    accepted_terms = forms.BooleanField()
    profile_picture = forms.ImageField(
        max_length=None
    )
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Password confirmation", widget=forms.PasswordInput
    )

    class Meta:
        model = CustomUser
        # field = '__all__'
        fields = ["role", "email", "first_name", "last_name", "birth_date", "phone_number", "otp", "is_verified", "gender", "profile_picture", "accepted_terms"]

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    disabled password hash display field.
    """

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = CustomUser
        fields = ["email", "password", "birth_date"]


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["email", "first_name", "last_name"]
    # list_filter = ["is_admin"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["role", "first_name", "last_name", "birth_date", "phone_number", "otp", "is_verified", "gender", "profile_picture", "accepted_terms"]}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 
        'user_permissions')}), 
        # ('Important dates', {'fields': ('last_login', 'date_joined')})
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "birth_date", "password1", "password2", "role","first_name", "last_name", "phone_number", "otp", "is_verified", "gender", "profile_picture", "accepted_terms"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email"]
    filter_horizontal = []


# Now register the new UserAdmin...
admin.site.register(CustomUser, UserAdmin)
admin.site.register(CustomGroup)
# ... and, since we're not using Django's built-in permissions,
# unregister the Group model from admin.
# admin.site.register(Group)
# admin.site.unregister(Group)