import requests

# URL of the server
url = "http://192.168.43.188:5000/inference"

# File path to the image and the prompt text
image_path = "aadharCropped.png"
prompt = "hello"

# Prepare the request payload
files = {"image": open(image_path, "rb")}
data = {"prompt": prompt}

try:
    # Send the POST request
    response = requests.post(url, files=files, data=data)

    # Parse and print the response
    if response.status_code == 200:
        print("Response:", response.json())
    else:
        print("Error:", response.status_code, response.text)
except Exception as e:
    print("Request failed:", str(e))
