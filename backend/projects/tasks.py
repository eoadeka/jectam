# To define background tasks

from celery import shared_task
from datetime import datetime, timedelta
from .models import Project, Task


@shared_task
def create_weekly_status_tasks():
    active_projects = Project.objects.filter(end_date__gte=datetime.now().date())

    for project in active_projects:
        start_date = project.start_date
        end_date = project.end_date

        # Iterate through each Monday between project start and end date
        current_date = start_date
        while current_date <= end_date:
            # Check if the current date is a Monday (weekday() returns 0 for Monday)
            if current_date.weekday() == 0:
                # Create a new task for the current Monday
                task_due_date = current_date + timedelta(days=7)  # Next Monday
                task_name = f"Weekly Status Update for {project.title}"
                task_description = "Review and update project status."
                Task.objects.create(project=project, name=task_name, description=task_description, due_date=task_due_date, status="To Do")
            current_date += timedelta(days=1)
