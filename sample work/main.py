# from together import Together
# import base64
# import json

# # Initialize Together client with your API key
# client = Together(api_key="f5768fe361d19904facb1ecc05f9bf26e847d4fa2556f703ec6fab79537edc09")

# # Define the prompt and image path
# getDescriptionPrompt = "Extract only the fields: name, date of birth (dob), gender ,id and issue date in JSON format."
# imagePath = "C:\\Users\\Admin\\Downloads\\Best Docs\\Best Docs\\Adhaar\\Cropped\\88.jpg"

# # Function to encode image as base64
# def encode_image(image_path):
#     with open(image_path, "rb") as image_file:
#         return base64.b64encode(image_file.read()).decode('utf-8')

# # Encode the image to base64
# base64_image = encode_image(imagePath)

# # Send request to the model
# response = client.chat.completions.create(
#     model="meta-llama/Llama-Vision-Free",
#     messages=[
#         {
#             "role": "user",
#             "content": [
#                 {"type": "text", "text": getDescriptionPrompt},
#                 {
#                     "type": "image_url",
#                     "image_url": {
#                         "url": f"data:image/jpeg;base64,{base64_image}",
#                     },
#                 },
#             ],
#         }
#     ],
#     stream=False,
# )

# # Debugging: Check the response structure
# print("Response Structure:")
# print(dir(response))  # List all available attributes and methods
# print("Full Response:")
# print(response)  # Print the entire response to inspect

# # Function to extract and clean up data from the response
# def extract_clean_data(response):
#     try:
#         # Directly access the content attribute of the message object
#         response_content = response.choices[0].message.content  # Accessing the content attribute
#         print("Response Content:", response_content)  # Debug: print content
#     except (json.JSONDecodeError, AttributeError, KeyError, IndexError) as e:
#         # Handle any errors (e.g., invalid JSON, missing attributes)
#         return {"error": f"Failed to parse response: {str(e)}"}

# # Extract and clean the data from the response
# clean_data = extract_clean_data(response)

import gradio as gr
from together import Together
import base64
import json
import time

# Initialize Together client with your API key
client = Together(api_key="f5768fe361d19904facb1ecc05f9bf26e847d4fa2556f703ec6fab79537edc09")

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
    return clean_data

# Set up the Gradio interface
iface = gr.Interface(
    fn=extract_data_from_image,  # Function to call when user interacts with the UI
    inputs=[
        gr.Textbox(label="Query", placeholder="Enter the fields you want to extract (e.g., 'name, dob, address')"),  # User query input
        gr.Image(type="filepath", label="Upload Image")  # Use type="filepath" for the file path
    ],
    outputs=gr.Textbox(label="Extracted Data"),  # Output will be shown in a textbox
    title="Image Data Extractor",
    description="Upload an image and specify the query fields (e.g., 'name, dob, address'). The model will extract and display the relevant data.",
)

# Launch the Gradio interface
iface.launch()