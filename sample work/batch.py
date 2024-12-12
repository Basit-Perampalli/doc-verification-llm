import os
import base64
import json
import time
from pydantic import BaseModel, Field
from together import Together

# Initialize Together client with your API key
client = Together(api_key="364ae5d1e5c3e2f5e300ea5004c4bc5b7faef1ba96d31e2b8c636de78261e8bd")


DATA = {
    "img10_img-1.jpeg": {"name": "gaukaran", "gate_score": 337},
    "img3_img-1.jpeg": {"name":"yamini mittal","gate_score":625},
    "img4_img-1.jpeg": {"name": "subhobrata paul", "gate_score": 731},
    "img5_img-1.jpeg": {"name": "ankur agrawal", "gate_score": 902},
    "img6_img-1.jpeg": {"name": "mohd danish", "gate_score": 540},
    "img7_img-1.jpeg": {"name": "shakir ahmad bhat", "gate_score": 352},
    "img8_img-1.jpeg": {"name": "y. yoshi", "gate_score": 361},
    "img9_img-1.jpeg": {"name": "shruti umarvaish", "gate_score": 541}
}

# Function to encode image as base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Function to validate JSON string
def validate_json(json_string):
    try:
        return json.loads(json_string)
    except json.JSONDecodeError as e:
        print("Calling llama turbo instruct")
        return main(json_string)


class JSONOUTPUT(BaseModel):
    name: str = Field(description="The name of the person")
    dob: str = Field(description="date of birth in format dd/mm/yyyy")
    aadhar: str = Field(description="It is a 12 digit number ")

def main(transcript):
    extract = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "The following is a ocr output message transcript. Only answer in JSON.",
            },
            {
                "role": "user",
                "content": transcript,
            },
        ],
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        response_format={
            "type": "json_object",
            "schema": JSONOUTPUT.model_json_schema(),
        },
    )

    output = json.loads(extract.choices[0].message.content)
    print(json.dumps(output, indent=2))
    return output


# Function to extract and clean up data from the response
def extract_clean_data(response):
    try:
        # Directly access the content attribute of the message object
        response_content = response.choices[0].message.content  # Accessing the content attribute

        # Extract only the JSON part
        first_brace = response_content.find("{")
        last_brace = response_content.rfind("}")
        if first_brace == -1 or last_brace == -1:
            print("Calling llama turbo instruct", "not able to find braces", response_content)
            return main(json_string)
        
        json_string = response_content[first_brace:last_brace + 1]
        json_string = json_string.lower()
        # Validate the JSON content
        # json_string = validate_json(json_string)

        return json_string  # Return parsed JSON content for further processing
    except (AttributeError, KeyError, IndexError) as e:
        return {"error": f"Failed to parse response: {str(e)}"}

# Function to process a single image and extract data
def process_image(query, image_path):
    try:
        base64_image = encode_image(image_path)

        # Send request to the model with the query and image
        response = client.chat.completions.create(
            # model="meta-llama/Llama-Vision-Free",
            model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
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
        return extract_clean_data(response)

    except Exception as e:
        return {"error": str(e)}

# Function to process all images in a folder
def process_folder(query, folder_path, output_file):
    results = {}
    start_time = time.time()

    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            file_path = os.path.join(folder_path, filename)
            print(f"Processing: {filename}")

            # Process the image and store the result
            result = process_image(query, file_path)
            results[filename] = result
            print(filename, DATA[filename]['name'],"Name verfied" if DATA[filename]['name'] in result else "Name not verfied")
            print(filename, DATA[filename]['gate_score'],"Gate Scored Card verfied" if str(DATA[filename]['gate_score']) in result else "Gate Scored not verfied")

    # Write the results to an output JSON file
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=4, ensure_ascii=False)

    print(f"Processing completed in {time.time() - start_time:.2f} seconds. Results saved to {output_file}")



# Main script execution
query = "Extract only name, gate score(three digit number) in json"
folder_path = r"./gate" 
output_file = "output_results.json"
process_folder(query, folder_path, output_file)



class JSONOUTPUT(BaseModel):
    name: str = Field(description="The name of the person")
    dob: str = Field(description="date of birth in format dd/mm/yyyy")
    aadhar: str = Field(description="It is a 12 digit number ")

def main(transcript):
    extract = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "The following is a ocr output message transcript. Only answer in JSON.",
            },
            {
                "role": "user",
                "content": transcript,
            },
        ],
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        response_format={
            "type": "json_object",
            "schema": JSONOUTPUT.model_json_schema(),
        },
    )

    output = json.loads(extract.choices[0].message.content)
    print(json.dumps(output, indent=2))
    return output


