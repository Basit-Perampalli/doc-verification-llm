import os
import base64
import json
import time
from pydantic import BaseModel, Field
from together import Together

# Function to encode image as base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')



TESTINGVISIONMODEL = "meta-llama/Llama-Vision-Free"
TRAININGVISIONMODEL = "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo"
JSONOUTPUTMODEL = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"


# Function to validate JSON string
def validate_json(client, json_string):
    try:
        return json.loads(json_string)
    except json.JSONDecodeError as e:
        print("Calling llama turbo instruct")
        return main(client, json_string)


def correctvisionoutput(client, transcript):
    class JSONOUTPUT(BaseModel):
        name: str = Field(description="The name of the person")
        dob: str = Field(description="date of birth in format dd/mm/yyyy")
        aadhar: str = Field(description="It is a 12 digit number")

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


def extract_clean_data(client, response, prompt):
    try:
        # Directly access the content attribute of the message object
        response_content = response.choices[0].message.content

        # Extract only the JSON part
        first_brace = response_content.find("{")
        last_brace = response_content.rfind("}")
        if first_brace == -1 or last_brace == -1:
            print("Calling llama turbo instruct", "not able to find braces", response_content)
            return main(client, response_content, prompt["backup_query"])
        
        json_string = response_content[first_brace:last_brace + 1]
        json_string = json_string.lower()
        
        # json_string = validate_json(client, json_string)

        return json_string
    except (AttributeError, KeyError, IndexError) as e:
        return {"error": f"Failed to parse response: {str(e)}"}

def process_image(client, prompt, image_path):
    if prompt["query"] is None:
        raise Exception("Query not provided")
    try:
        base64_image = encode_image(image_path)

        # Send request to the model with the query and image
        response = client.chat.completions.create(
            # model=TESTINGVISIONMODEL,
            model=TRAININGVISIONMODEL,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt["query"]},  # User query input
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
        return extract_clean_data(client, response, prompt)

    except Exception as e:
        return {"error": str(e)}


def main(client, transcript, JSONOUTPUT):
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

class GateOutput(BaseModel):
    name: str = Field(description="The name of the person")
    gate_score: str = Field(description="This is a 3 digit number")
    out_of_100_marks: str = Field(description="mostly decimal number, out of 100")
    registration_number: str = Field(description="This is alphnumeric sequence")
    air: str = Field(description="")
class Marksheet(BaseModel):
    name: str = Field(description="The name of the person")
    parent: str = Field(description="Gardian name")
    dob: str = Field(description="Date of birth in format dd/mm/yyyy")
    school: str = Field(description="name of the school")
    result: str = Field(description="cant be pass or fail")
class CasteOutput(BaseModel):
    name: str = Field(description="The name of the person")
    caste: str = Field(description="Caste name")
    category: str = Field(description="sub caste category")
    result: str = Field(description="cant be pass or fail")
class DegreeOutput(BaseModel):
    name: str = Field(description="The name of the person")
    mother_name: str = Field(description="person mothers name")
    degree: str = Field(description="field of stude")
    university: str = Field(description="affilication university")
    year: str = Field(description="This is year(yyyy) of passing")

prompt = {
    "gate" : {
        "query": "Extract candidate name ,Registration Number  As RegNo, Gate score ,Marks out of 100 and all india ranking in Json format",
        "backup_query": GateOutput
    },
    "marksheet" : {
        "query": "Extract card holder name as name,card holders fathers name,Date Of birth,The School Name  ,result status (pass/fail) in CSV",
        "backup_query": Marksheet
    },
    "caste" : {
        "query": "Extract in following format. {\"Name\":<name>,\"Caste\":<Caste name>,\"Category\":<cast category>}",
        "backup_query": CasteOutput
    },
    "degree" : {
        "query": "Extract in following format. {\"Name\":<Full name of degree holder>,\"Mother\":<Mother name>,\"Degree\":<Degree name>,\"university\":<name of university>,\"Year\":<year>} in JSON",
        "backup_query": DegreeOutput
    }
}

if __name__ == "__main__":
    results = {}
    output_file = "output.json"
    

    if os.path.exists(output_file):
        with open(output_file, "r", encoding="utf-8") as f:
            try:
                results = json.load(f)
            except json.JSONDecodeError:
                print("Existing output file contains invalid JSON. Overwriting.")

    source_folder = "../preprocessed"

    query = "Extract the name, gate score, all india rank from the image in json format"
    backup_query = "Extract the name, gate score, all india rank from the image in json format"

    processed_files = set(results.keys())
    
    
    clients = [
        Together(api_key="770eedd0ceda2fa35a9ac7b7fdf7cae17a277301f5ebb9c19afb000a7ef79f18"),
    ]
    round = 0
    while True:
        time.sleep(5)
        for filename in os.listdir(source_folder):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')) and filename not in processed_files:
                file_path = os.path.join(source_folder, filename)
                print(f"Processing: {filename}")

                file_type = filename.split("@")[0]
        
                start_time = time.time()
                result = process_image(clients[round%len(clients)], prompt[file_type], file_path)
                results[filename] = {
                    "data": result,
                    "timetaken": time.time() - start_time,
                }
                print(f"Processing completed in {time.time() - start_time:.2f} seconds for {filename}")
                # Write the results to an output JSON file
                with open(output_file, "w", encoding="utf-8") as f:
                    json.dump(results, f, indent=4, ensure_ascii=False)
                processed_files.add(filename)
                round += 1

