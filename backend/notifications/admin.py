from django.contrib import admin
from .models import *

# Register your models here.
class NotificationsAdmin(admin.ModelAdmin):
    list_display = ('recipient','sender','message', 'notification_type')


admin.site.register(Notifications, NotificationsAdmin)