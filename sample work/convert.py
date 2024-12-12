import os
from pdf2image import convert_from_path

def convert_image_to_pdf(source_folder, saving_folder):
    # Loop through all PDF files in the source folder
    for filename in os.listdir(source_folder):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(source_folder, filename)
            
            # Convert PDF to images
            pages = convert_from_path(pdf_path=pdf_path, poppler_path="C:/Users/IRFAN/Downloads/Release-24.08.0-0/poppler-24.08.0/Library/bin")
            
            # Save images
            c = 1
            for page in pages:
                img_name = f"{os.path.splitext(filename)[0]}_img-{c}.jpeg"  # Naming based on original PDF file
                page.save(os.path.join(saving_folder, img_name), "JPEG")
                c += 1

    print("Conversion complete!")
    
convert_image_to_pdf("C:/Users/IRFAN/Downloads/Best Docs/Best Docs/gate", "./gate")