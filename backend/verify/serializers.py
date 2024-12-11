from rest_framework import serializers


class FileUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()
