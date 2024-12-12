from django.urls import path
from .views import UserDetailsListCreateAPIView, UserDetailsDetailAPIView

urlpatterns = [
    path("users/", UserDetailsListCreateAPIView.as_view(), name="user_list_create"),
    path("users/<int:pk>/", UserDetailsDetailAPIView.as_view(), name="user_detail"),
]
