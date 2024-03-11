from django.contrib import admin
from .models import *

# Register your models here.
class ProjectsAdmin(admin.ModelAdmin):
    list_display = ('title','description','start_date', 'end_date' )

    def save_model(self, request, obj, form, change):
        if getattr(obj, 'created_by', None) is None:
            obj.created_by = request.user
        obj.save()

class TasksAdmin(admin.ModelAdmin):
    list_display = ('title','project','due_date', 'category')

class DocumentsAdmin(admin.ModelAdmin):
    list_display = ('title','project','upload_date')


admin.site.register(Project, ProjectsAdmin)
admin.site.register(Task, TasksAdmin)
admin.site.register(Document, DocumentsAdmin)