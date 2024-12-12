from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
import json
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
    aadhar_number = data.get("aadhar_number")
    aadhar = data.get("aadhar")
    with open("./verify/prompt.json") as f:
        content = f.read()
        prompt = json.loads(content)['aadhar']
    result, time = model_inference(aadhar, prompt)
    return Response({"result":result,"time": time, "size": os.path.getsize(aadhar)}, status=status.HTTP_200_OK)


@api_view(["POST"])
def verify_pan(request):
    data = request.data
    name = data.get("name")
    dob = data.get("dob")
    pan_number = data.get("pan_number")
    pan = data.get("pan")

    with open("./verify/prompt.json") as f:
        content = f.read()
        prompt = json.loads(content)['pan']
    result, time = model_inference(pan, prompt)
    return Response({"result":result,"time": time, "size": os.path.getsize(pan)}, status=status.HTTP_200_OK)



@api_view(["POST"])
def verify_gate(request):
    data = request.data
    name = data.get("name")
    dob = data.get("dob")
    score = data.get("score")
    gate = data.get("gate")

    with open("./verify/prompt.json") as f:
        content = f.read()
        prompt = json.loads(content)['gate']
    result, time = model_inference(gate, prompt)
    return Response({"result":result,"time": time, "size": os.path.getsize(gate)}, status=status.HTTP_200_OK)

