from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
import json
from together import Together
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
import time
import base64
# import lmdeploy
# from lmdeploy.vl import load_image
import timeit
import torch
import datetime

# Initialize Together client with your API key
client = Together(api_key="")


# Function to encode image as base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Function to extract and clean up data from the response
def extract_clean_data(response):
    try:
        # Directly access the content attribute of the message object
        response_content = response.choices[0].message.content  # Accessing the content attribute
        return response_content  # Return raw content for further processing
    except (json.JSONDecodeError, AttributeError, KeyError, IndexError) as e:
        return {"error": f"Failed to parse response: {str(e)}"}

# Function to handle the Gradio interface
def extract_data_from_image(query, image):
    start=time.time()
    # Gradio passes the image path as a string when type="filepath"
    base64_image = encode_image(image)  # Directly pass the string path to encode_image

    # Send request to the model with the query and image
    response = client.chat.completions.create(
        model="meta-llama/Llama-Vision-Free",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": query},  # User query input
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                ],
            }
        ],
        stream=False,
    )
    
    # Extract and clean the data from the response
    clean_data = extract_clean_data(response)
    print(time.time()-start)
    print(clean_data)
    return clean_data

# pipe = lmdeploy.pipeline("OpenGVLab/Mini-InternVL-Chat-2B-V1-5", generation_config={
#     "max_new_tokens": 256,
#     "temperature": 1.0,
#     "stop_token_ids": [2]
# })

# def model_inference(image_path, prompt):
#     start = timeit.default_timer()
#     image = load_image(image_path)
#     res = pipe((prompt, image))
#     return res.text, timeit.default_timer() - start


@csrf_exempt
def upload_image(request):
    if request.method == "POST" and request.FILES.get("image"):
        # Access the uploaded file
        uploaded_file = request.FILES["image"]

        # Save the file temporarily
        fs = FileSystemStorage(location="temp/")
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_path = fs.path(filename)
        
        if "@" in filename:
            fs = FileSystemStorage(location="not_preprocessed/")
            file_path = fs.save(uploaded_file.name, uploaded_file)
            
        return JsonResponse({"file_path": file_path}, status=200)

    return JsonResponse({"error": "Invalid request"}, status=400)


@api_view(["POST"])
def verify_aadhar(request):
    data = request.data
    name = data.get("name")
    aadhar_number = data.get("aadhar_number")
    aadhar = data.get("aadhar")
    query = "Extract only Card Holder name ,Date of birth and adhar number from the image in json format"
    result = extract_data_from_image(query, aadhar)
    print("DOne")
    result_str = result
    res = {}
    if name in result_str:
        res["name"] = "verified"
    else:
        res["name"] = "not verified"
    aadhar_number = str(aadhar_number)
    aadhar_num = ""
    for i in range(3):
        aadhar_num += aadhar_number[i * 4 : i * 4 + 4] + " "

    if aadhar_num[0:14] in result_str or aadhar_number in result_str:
        res["aadhar_number"] = "verified"
    else:
        res["aadhar_number"] = "not verified"
    print(res)
    verified = True if res["name"] == res["aadhar_number"] == "verified" else False
    return Response(
        {"result": res, "verified": verified, "size": os.path.getsize(aadhar)},
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_extracted_batch_data(request):
    output = {}
    try:
        with open("./batchscript/output.json") as f:
            output = json.loads(f.read())
    except:
        pass
    return Response(output, status=status.HTTP_200_OK)

@api_view(["POST"])
def x_marksheet(request):
    data = request.data
    name = data.get("name")
    marks = data.get("marks")
    sheet = data.get("sheet")
    query='Extract only Card Holder name ,calculate total marks obtained  from the image in json format'
    result=extract_data_from_image(query, sheet)
    print("DOne")
    result_str = result
    print(result_str)
    res = {}
    if(name in result_str):
        res['name'] = 'verified'
    else:
        res['name'] = 'not verified'
    if marks in result_str:
        res['marks'] = 'verified'
    else:
        res['marks'] = 'not verfied'
    verified = True if res['name']==res['marks']=='verified' else False
    return Response({"result":res,'verified':verified,"size": os.path.getsize(sheet)}, status=status.HTTP_200_OK)

@api_view(["POST"])
def verify_pan(request):
    data = request.data
    name = data.get("name")
    dob = data.get("dob")
    pan_number = data.get("pan_number")
    pan = data.get("pan")
    result = pan
    # with open("./verify/prompt.json") as f:
    #     content = f.read()
    #     prompt = json.loads(content)['pan']
    # result, time = model_inference(pan, prompt)
    return Response({"result":result, "size": os.path.getsize(pan)}, status=status.HTTP_200_OK)


@api_view(["POST"])
def verify_gate(request):
    data = request.data
    name = data.get("name")
    dob = data.get("dob")
    score = data.get("score")
    gate = data.get("gate")
    result = gate
    # with open("./verify/prompt.json") as f:
    #     content = f.read()
    #     prompt = json.loads(content)['gate']
    # result, time = model_inference(gate, prompt)
    return Response({"result":result,"size": os.path.getsize(gate)}, status=status.HTTP_200_OK)
