from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    RegisterSerializer,
    CustomTokenObtainPairSerializer
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer

    permission_classes = [AllowAny]


class LoginView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer