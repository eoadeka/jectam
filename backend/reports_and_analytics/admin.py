from django.contrib import admin
from .models import *

# Register your models here.
class ProjectReportAdmin(admin.ModelAdmin):
    list_display = ('project','creator','title', 'description', 'created_at')

class TaskReportAdmin(admin.ModelAdmin):
    list_display = ('task','creator','title', 'description', 'created_at')

class AnalyticsDataAdmin(admin.ModelAdmin):
    list_display = ('project','timestamp','data')


admin.site.register(ProjectReport, ProjectReportAdmin)
admin.site.register(TaskReport, TaskReportAdmin)
admin.site.register(AnalyticsData, AnalyticsDataAdmin)