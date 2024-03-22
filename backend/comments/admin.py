from django.contrib import admin
from .models import *

# Register your models here.
class CommentsAdmin(admin.ModelAdmin):
    list_display = ('commenter','task', 'comment')


admin.site.register(Comment, CommentsAdmin)