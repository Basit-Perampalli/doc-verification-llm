from django.urls import path
from .views import verify_pan, verify_aadhar, verify_gate, upload_image,x_marksheet,get_extracted_batch_data

urlpatterns = [
    path("aadhar/", verify_aadhar, name="aadhar"),
    path("pan/", verify_pan, name="pan"),
    path("gate/", verify_gate, name="gate"),
    path("xmark/", x_marksheet, name="xmark"),
    path("batchdata/", get_extracted_batch_data, name="batchdata"),
    path("upload-image/", upload_image, name="upload image temporary"),
]
