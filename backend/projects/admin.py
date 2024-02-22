from django.contrib import admin
from .models import *

# Register your models here.
class ProjectsAdmin(admin.ModelAdmin):
    list_display = ('title','description','start_date', 'end_date')


admin.site.register(Project, ProjectsAdmin)