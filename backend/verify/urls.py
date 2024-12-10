from django.urls import path
from .views import verify_pan,verify_aadhar,verify_gate

urlpatterns = [
    path("aadhar/", verify_aadhar, name="aadhar"),
    path("pan/", verify_pan, name="pan"),
    path("gate/", verify_gate, name="gate"),
]
