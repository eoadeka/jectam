from rest_framework import serializers
from .models import *
from accounts.serializers import *

class CommentSerializer(serializers.ModelSerializer):

    commenter_full_name = serializers.SerializerMethodField()
    commenter_profile_picture = serializers.SerializerMethodField()

    def get_commenter_full_name(self, obj):
        try:
            user = CustomUser.objects.using('default').get(pk=obj.commenter_id)
            return user.get_full_name()
        except CustomUser.DoesNotExist:
            return None
        
    def get_commenter_profile_picture(self, obj):
        try:
            # Retrieve the custom user model
            CustomUser = get_user_model()
            # Get the user object
            user = CustomUser.objects.using('default').get(pk=obj.commenter_id)
            # Return the profile picture URL of the user
            return user.profile_picture.url if user.profile_picture else None
        except CustomUser.DoesNotExist:
            return None
    
    # commenter = UserProfileSerializer()
    # commenter = serializers.StringRelatedField()
    # commenter = serializers.CharField(source="customuser.email")

    class Meta:
        model = Comment
        fields = '__all__'
        # fields = ['comment_id', 'comment', 'commenter', 'commenter_full_name','is_read']

        