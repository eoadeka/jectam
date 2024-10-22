# Generated by Django 4.1.13 on 2024-04-13 00:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0028_alter_project_team_members_alter_task_assignee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='category',
            field=models.CharField(blank=True, choices=[('Planning', 'Planning'), ('Review', 'Review'), ('Backend', 'Backend'), ('Frontend', 'Frontend'), ('UI', 'UI'), ('QA', 'QA'), ('DevOps', 'DevOps')], max_length=20, null=True),
        ),
    ]
