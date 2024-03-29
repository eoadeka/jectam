from django.contrib import admin
from .models import *

# Register your models here.
class CommentsAdmin(admin.ModelAdmin):
    list_display = ('comment', 'comment_id')


admin.site.register(Comment, CommentsAdmin)