from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserSerializer(serializers.ModelSerializer):
    username = None
    email = models.EmailField(db_index=True, unique=True, null=True, blank=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    # avatar = models.ImageField(default="default.png", upload_to="images/profile_pics")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =  []

    objects = CustomUser()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return "{} {}".format(self.first_name, self.last_name)