from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


@api_view(["POST"])
def register(request):
    data = request.data

    # Check if email already exists
    if User.objects.filter(username=data.get("email")).exists():
        return Response(
            {"error": "User with this email already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create user
    user = User.objects.create(
        first_name=data.get("first_name"),
        last_name=data.get("last_name"),
        username=data.get("email"),
        email=data.get("email"),
        password=data.get("password"),
        is_staff=False if data.get("role") == "recruiter" else True,
    )

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "role": "recruiter" if user.is_staff == False else True,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    # Authenticate user
    user = authenticate(username=email, password=password)

    if user is not None:
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "role": "recruiter" if user.is_staff == False else "admin",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
