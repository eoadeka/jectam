from rest_framework import serializers
from .models import *
from accounts.serializers import *

class CommentSerializer(serializers.ModelSerializer):
    
    # commenter = UserProfileSerializer()
    # commenter = serializers.StringRelatedField()
    # commenter = serializers.CharField(source="customuser.email")

    class Meta:
        model = Comment
        fields = '__all__'

        