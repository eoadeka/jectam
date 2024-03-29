from rest_framework import serializers
from .models import *


class NotificationsSerializer(serializers.ModelSerializer):
    task = serializers.CharField(source='task.title', read_only=True)
    project = serializers.CharField(source='project.title', read_only=True)
    comment = serializers.CharField(source='comment.comment', read_only=True)
    recipient = serializers.SerializerMethodField()
    sender = serializers.SerializerMethodField()

    # recipient_full_name = serializers.CharField(source='recipient.first_name', read_only=True)
    # recipient_full_name = serializers.CharField(source='recipient.get_full_name', read_only=True)
    # sender = serializers.CharField(source='sender.customuser.first_name', read_only=True)

    # recipient = serializers.SerializerMethodField("get_recipient")
    
    def get_recipient(self, obj):
        try:
            user = CustomUser.objects.using('default').get(pk=obj.recipient_id)
            return user.get_full_name()
        except CustomUser.DoesNotExist:
            return None
        
    def get_sender(self, obj):
        try:
            user = CustomUser.objects.using('default').get(pk=obj.sender_id)
            return user.get_full_name()
        except CustomUser.DoesNotExist:
            return None

    class Meta:
        model = Notifications
        fields = '__all__'
        # fields = ['task', 'project','comment','recipient', 'recipient_full_name']


        