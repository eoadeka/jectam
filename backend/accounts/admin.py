from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import CustomUser
# from .forms import *
from django.contrib.auth import get_user_model


User = get_user_model()
# Register your models here.
class UserAdmin(BaseUserAdmin):
    """Define admin model for custom User model with no email field."""
    # add_form = UserCreationForm
    fieldsets = (
        # (None, {'fields' : ('email', 'password', 'last_login', 'created_at', 'updated_at',)}),
        (None, {'fields' : ('email', 'password', 'last_login', 'role', 'phone_number', 'birth_date', 'gender', 'profile_picture' )}),
        ('Personal Info', {'fields': (
            'first_name',
            'last_name',
            # 'avatar'
        )}),
        ('Permissions', {'fields' : (
            'is_active',
            'is_staff',
            'is_superuser',
            'groups',
            'user_permissions',
        )}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email','password1','password2'),
        }),
    )
    # readonly_fields = ('created_at', 'updated_at',)
    list_display = ('email', 'get_full_name', 'is_staff', 'last_login')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)
    ordering = ('email',)

# 


admin.site.register(User, UserAdmin)




# from django.contrib.auth.models import Group as DjangoGroup
# from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin


# class Group(DjangoGroup):
#     """Instead of trying to get new user under existing `Aunthentication and Authorization`
#     banner, create a proxy group model under our Accounts app label.
#     Refer to: https://github.com/tmm/django-username-email/blob/master/cuser/admin.py
#     """

#     class Meta:
#         verbose_name = _('group')
#         verbose_name_plural = _('groups')
#         proxy = True


# admin.site.unregister(DjangoGroup)


# @admin.register(Group)
# class GroupAdmin(BaseGroupAdmin):
#     pass