from django.db import models


class UserDetails(models.Model):
    name = models.CharField(max_length=255)  # Field for name
    dob = models.DateField()  # Field for date of birth
    email = models.EmailField(unique=True)  # Field for email with validation
    phone = models.CharField(max_length=15, unique=True)  # Field for phone number
    aadhar_no = models.CharField(max_length=12, unique=True)  # Field for Aadhar number
    aadhar_card = models.FileField(
        upload_to="aadhar_cards/"
    )  # Field for Aadhar card file path
    aadhar_verified = models.BooleanField(
        default=False
    )  # Field for Aadhar verification status
    highest_education = models.CharField(
        max_length=100
    )  
    university_name = models.CharField(max_length=255) 
    institute_name = models.CharField(max_length=255)  
    pass_out_date = models.DateField()  
    roll_number = models.CharField(max_length=50, unique=True)  
    cgpa_percentage = models.DecimalField(
        max_digits=5, decimal_places=2
    )  # CGPA or percentage
    education_doc = models.FileField(
        upload_to="education_docs/"
    )  # Path to uploaded educational document
    xMarksheet_verified = models.BooleanField(
        default=False
    )
    gate_registration_number = models.CharField(
        max_length=20, blank=True, null=True
    )  # GATE registration number
    gate_test_paper = models.CharField(
        max_length=50, blank=True, null=True
    )  # Test paper name/code
    gate_exam_date = models.DateField(blank=True, null=True)  # GATE exam date
    gate_score = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True, null=True
    )  # GATE score
    gate_air_rank = models.IntegerField(blank=True, null=True)  # GATE All India Rank
    gate_scorecard = models.FileField(
        upload_to="gate_scorecards/", blank=True, null=True
    )  # Path to GATE scorecard

    def __str__(self):
        return self.name
