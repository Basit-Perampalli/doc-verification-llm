import os
from pdf2image import convert_from_path
import time
from PIL import Image
import json

if __name__ == "__main__":
    with open("env.json", "r") as f:
        env = json.loads(f.read())
        poppler_path = env["poppler_path"]
    if not poppler_path:
        raise Exception("Poppler path not found in env.json")
    if not os.path.exists("../not_preprocessed"):
        os.mkdir("../not_preprocessed")
    if not os.path.exists("../preprocessed"):
        os.mkdir("../preprocessed")
    source_folder = "../not_preprocessed"
    saving_folder = "../preprocessed"
    while True:
        time.sleep(5)
        for file in os.listdir(source_folder):
            if f"{os.path.splitext(file)[0]}.jpeg" not in os.listdir(saving_folder):
                if file.endswith(".pdf"):
                    pdf_path = os.path.join(source_folder, file)
                    pages = convert_from_path(pdf_path=pdf_path, poppler_path=poppler_path)

                    img_name = f"{os.path.splitext(file)[0]}.jpeg"
                    pages[0].save(os.path.join(saving_folder, img_name), "JPEG")
                    print(f"Processing {file}")
                elif file.endswith(('.png', '.jpg', '.jpeg')):
                    img_path = os.path.join(source_folder, file)
                    img_name = f"{os.path.splitext(file)[0]}.jpeg"
                    img = Image.open(img_path)
                    img.save(os.path.join(saving_folder, img_name), "JPEG")
                    print(f"copying {file}")