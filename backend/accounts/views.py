from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib import auth
# from user_profile.models import UserProfile
from .serializers import *
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from .models import *
from dj_rest_auth.registration.views import SocialLoginView, RegisterView
# from .forms import *
from .admin import UserCreationForm
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
import base64
import pyotp
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.generics import RetrieveAPIView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request):
    user = request.user
    serializer = UserDetailsSerializer(user, many=False)
    return Response(serializer.data)

def accounts(request):
    return HttpResponse("<h1>Accounts</h1>")

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

def ping(request):
    return JsonResponse({'result': 'OK'})

class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    #  authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    # authentication_class = (TokenAuthentication)
    serializer_class = UserDetailsSerializer

    def get_object(self):
        return self.request.user

    def patch(self, request, format=None):
        user = self.get_object()
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserProfileSerializer

class UserDetailView(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'id'  # Assuming user_id is the field used to lookup users

class UserDetailWithEmailView(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserProfileSerializer
    
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        # Assuming you pass email as a query parameter named 'email'
        email = self.request.query_params.get('email', None)
        if email:
            queryset = queryset.filter(email=email)
            obj = queryset.first()  # Assuming email is unique
            self.check_object_permissions(self.request, obj)
            return obj
        else:
            return None

class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })

@api_view(['POST'])
class RegisterView(RegisterView):
    serializer_class = User
    form = UserCreationForm

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        email = data['email']
        password = data['password']

        try:
            user = auth.authenticate(email=email, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({ 'success': 'User authenticated' })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in' })

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
    
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })

class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response({ 'success': 'User deleted successfully' })
        except:
            return Response({ 'error': 'Something went wrong when trying to delete user' })


# phone number
# This class returns the string needed to generate the key
class generateKey:
    @staticmethod
    def returnValue(phone):
        return str(phone) + str(datetime.date(datetime.now())) + "Some Random Secret Key"


class getPhoneNumberRegistered(APIView):
    # Get to Create a call for OTP
    @staticmethod
    def get(request, phone):
        try:
            phone_number = CustomUser.objects.get(phone_number=phone)  # if phone_number already exists the take this else create New One
        except ObjectDoesNotExist:
            CustomUser.objects.create(
                phone_number=phone,
            )
            phone_number = CustomUser.objects.get(phone_number=phone)  # user Newly created Model
        phone_number.otp += 1  # Update otp At every Call
        phone_number.save()  # Save the data
        keygen = generateKey()
        key = base64.b32encode(keygen.returnValue(phone).encode())  # Key is generated
        OTP = pyotp.HOTP(key)  # HOTP Model for OTP is created
        print(OTP.at(phone_number.otp))
        # Using Multi-Threading send the OTP Using Messaging Services like Twilio or Fast2sms
        return Response({"OTP": OTP.at(phone_number.otp)}, status=200)  # Just for demonstration

    # This Method verifies the OTP
    @staticmethod
    def post(request, phone):
        try:
            phone_number = CustomUser.objects.get(phone_number=phone)
        except ObjectDoesNotExist:
            return Response("User does not exist", status=404)  # False Call

        keygen = generateKey()
        key = base64.b32encode(keygen.returnValue(phone).encode())  # Generating Key
        OTP = pyotp.HOTP(key)  # HOTP Model
        if OTP.verify(request.data["otp"], phone_number.otp):  # Verifying the OTP
            phone_number.isVerified = True
            phone_number.save()
            return Response("You are authorised", status=200)
        return Response("OTP is wrong", status=400)


# Time after which OTP will expire
EXPIRY_TIME = 50 # seconds

class getPhoneNumberRegistered_TimeBased(APIView):
    # Get to Create a call for OTP
    @staticmethod
    def get(request, phone):
        try:
            phone_number = CustomUser.objects.get(phone_number=phone)  # if phone_number already exists the take this else create New One
        except ObjectDoesNotExist:
            CustomUser.objects.create(
                phone_number=phone,
            )
            phone_number = CustomUser.objects.get(phone_number=phone)  # user Newly created Model
        phone_number.save()  # Save the data
        keygen = generateKey()
        key = base64.b32encode(keygen.returnValue(phone).encode())  # Key is generated
        OTP = pyotp.TOTP(key,interval = EXPIRY_TIME)  # TOTP Model for OTP is created
        print(OTP.now())
        # Using Multi-Threading send the OTP Using Messaging Services like Twilio or Fast2sms
        return Response({"OTP": OTP.now()}, status=200)  # Just for demonstration

    # This Method verifies the OTP
    @staticmethod
    def post(request, phone):
        try:
            phone_number = CustomUser.objects.get(phone_number=phone)
        except ObjectDoesNotExist:
            return Response("User does not exist", status=404)  # False Call

        keygen = generateKey()
        key = base64.b32encode(keygen.returnValue(phone).encode())  # Generating Key
        OTP = pyotp.TOTP(key,interval = EXPIRY_TIME)  # TOTP Model 
        if OTP.verify(request.data["otp"]):  # Verifying the OTP
            phone_number.isVerified = True
            phone_number.save()
            return Response("You are authorised", status=200)
        return Response("OTP is wrong/expired", status=400) 