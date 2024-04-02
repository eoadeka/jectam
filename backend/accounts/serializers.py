from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as JwtTokenObtainPairSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model, authenticate
from allauth.account.adapter import get_adapter
from django.db import transaction
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



# class TokenObtainPairSerializer(JwtTokenObtainPairSerializer):
#     username_field = get_user_model().USERNAME_FIELD

class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension


class UserSerializer(RegisterSerializer):
    username = None
    role = serializers.ChoiceField(choices=CustomUser.ROLE_CHOICES)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    phone_number = serializers.CharField(max_length=20)
    otp = serializers.IntegerField(default=0)
    birth_date = serializers.DateField()
    gender = serializers.ChoiceField(choices=CustomUser.GENDER_CHOICES)
    accepted_terms = serializers.BooleanField(default=False)
    profile_picture = Base64ImageField(
        max_length=None, use_url=True,
    )
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = get_user_model()
        # fields =  '__all__' #password2
        fields =  [
            'role', 
            'email', 
            'password1', 
            'password2', 
            'accepted_terms', 
            'phone_number',
            'otp',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'profile_picture'
        ] #password2
        extra_kwargs = {
            'password': {
                'write_only':True
            }
        }

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =  []

    objects = CustomUser()

    def get_cleaned_data(self):
        return {
            "email": self.validated_data.get("email", ""),
            "first_name": self.validated_data.get("first_name", ""),
            "last_name": self.validated_data.get("last_name", ""),
            "phone_number": self.validated_data.get("phone_number", ""),
            "otp": self.validated_data.get("otp", ""),
            "birth_date": self.validated_data.get("birth_date", ""),
            "gender": self.validated_data.get("gender", ""),
            "role": self.validated_data.get("role", ""),
            "profile_picture": self.validated_data.get("profile_picture", ""),
            "accepted_terms": self.validated_data.get("accepted_terms", ""),
            "password1": self.validated_data.get("password1", ""),
            "password2": self.validated_data.get("password2", ""),
        }

    def save(self, request, commit=True):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.first_name = self.cleaned_data.get("first_name")
        user.last_name = self.cleaned_data.get("last_name")
        user.phone_number = self.cleaned_data.get("phone_number")
        user.otp = self.cleaned_data.get("otp")
        user.birth_date = self.cleaned_data.get("birth_date")
        user.gender = self.cleaned_data.get("gender")
        user.role = self.cleaned_data.get("role")
        user.accepted_terms = self.cleaned_data.get("accepted_terms")
        # user.profile_picture = request.FILES.get('profile_picture')
        if 'profile_picture' in request.FILES:
            user.profile_picture = request.FILES['profile_picture']
        else:
            user.profile_picture = ['']
        user.save()
        adapter.save_user(request, user, self)
        return user

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            validated_data['email'], 
            validated_data['password1'],
            validated_data['password2'], 
            validated_data['first_name'], 
            validated_data['last_name'], 
            validated_data['birth_date'], 
            validated_data['phone_number'], 
            validated_data['otp'], 
            validated_data['gender'], 
            validated_data['role'], 
            validated_data['profile_picture'], 
            validated_data['accepted_terms'], 
            )
        return user

# UserModel = get_user_model()

    # def get_cleaned_data(self):
    #     data_dict = super().get_cleaned_data()
    #     data_dict['email'] = self.validated_data.get('email', '')
    #     data_dict['first_name'] = self.validated_data.get('first_name', '')
    #     data_dict['last_name'] = self.validated_data.get('last_name', '')
    #     data_dict['phone_number'] = self.validated_data.get('phone_number', '')
    #     data_dict['otp'] = self.validated_data.get('otp', '')
    #     data_dict['birth_date'] = self.validated_data.get('birth_date', '')
    #     data_dict['gender'] = self.validated_data.get('gender', '')
    #     data_dict['accepted_terms'] = self.validated_data.get('accepted_terms', '')
    #     data_dict['profile_picture'] = self.validated_data.get('profile_picture', '')
    #     return data_dict
    
    # def custom_signup(self, request, user):
    #     user.phone_number = self.validated_data['phone_number']
    #     user.email = self.validated_data['email']
    #     user.gender = self.validated_data['gender']
    #     user.password1 = self.validated_data['password1']
    #     user.password2 = self.validated_data['password2']
    #     user.save()
        # return user

    # def __str__(self):
    #     return self.email

    # def get_full_name(self):
    #     return "{} {}".format(self.first_name, self.last_name)

    # def create(self, validated_data):
    #     return CustomUser(**validated_data)

class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['id', 'email','get_full_name', 'role', 'gender', 'profile_picture']
        # fields = ('__all__', )
        # fields = '__all__'
        # model = get_user_model()

class UserDetailsSerializer(serializers.ModelSerializer):

    # user_profile = UserProfileSerializer(source='userprofile')

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'role',
            'gender',
            'profile_picture',
            'is_active',
            'is_staff',
            # 'user_profile',
        ]
        read_only_field = [
            'is_active',
        ]

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    # password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email = validated_data['email'], 
            password1 = validated_data['password1'],
            password2 = validated_data['password2'], 
            first_name = validated_data['first_name'], 
            last_name = validated_data['last_name'], 
            birth_date = validated_data['birth_date'], 
            phone_number = validated_data['phone_number'], 
            otp = validated_data['otp'], 
            gender = validated_data['gender'], 
            role = validated_data['role'], 
            profile_picture = validated_data['profile_picture'], 
            accepted_terms = validated_data['accepted_terms'], 
        )
        user.save()
        return user

    class Meta:
        model = CustomUser
        fields = ('token', 'email', 'password1', 'password2', 'role')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['role'] = user.role
        # token['profile_picture'] = user.profile_picture
        # ...

        return token