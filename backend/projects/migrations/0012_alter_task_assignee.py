# Generated by Django 4.1.13 on 2024-03-15 21:56

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0011_task_created_at_remove_task_assignee_task_assignee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='assignee',
            field=models.ManyToManyField(related_name='tasks_assignees', to=settings.AUTH_USER_MODEL),
        ),
    ]