from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
def verify_aadhar(request):
    data= request.data
    name = data.get('name')
    dob = data.get('dob')
    aadhar_number = data.get('aadhar_number')
    print(name,dob,aadhar_number)

    return Response('verified',status=status.HTTP_200_OK)

@api_view(['POST'])
def verify_pan(request):
    data= request.data
    name = data.get('name')
    dob = data.get('dob')
    pan_number = data.get('pan_number')
    print(name,dob,pan_number)

    return Response('not verified',status=status.HTTP_200_OK)

@api_view(['POST'])
def verify_gate(request):
    data= request.data
    name = data.get('name')
    dob = data.get('dob')
    score = data.get('score')
    print(name,dob,score)

    return Response('verified',status=status.HTTP_200_OK)


