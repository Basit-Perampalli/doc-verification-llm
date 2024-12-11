from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage


@csrf_exempt
def upload_image(request):
    if request.method == "POST" and request.FILES.get("image"):
        # Access the uploaded file
        uploaded_file = request.FILES["image"]

        # Save the file temporarily
        fs = FileSystemStorage(location="temp/")
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_path = fs.path(filename)

        # Return the file path as a response
        return JsonResponse({"file_path": file_path}, status=200)

    return JsonResponse({"error": "Invalid request"}, status=400)


@api_view(["POST"])
def verify_aadhar(request):
    data = request.data
    name = data.get("name")
    dob = data.get("dob")
    aadhar_number = data.get("aadhar")
    print(name, dob, aadhar_number)

    return Response("verified", status=status.HTTP_200_OK)


@api_view(["POST"])
def verify_pan(request):
    data = request.data
    name = data.get("name")
    dob = data.get("dob")
    pan_number = data.get("pan_number")
    print(name, dob, pan_number)

    return Response("not verified", status=status.HTTP_200_OK)


@api_view(["POST"])
def verify_gate(request):
    data = request.data
    name = data.get("name")
    dob = data.get("dob")
    score = data.get("score")
    print(name, dob, score)

    return Response("verified", status=status.HTTP_200_OK)
