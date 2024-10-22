# Generated by Django 4.1.13 on 2024-03-11 03:21

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0007_alter_document_document_id_alter_project_method_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='document_id',
            field=models.UUIDField(default=uuid.UUID('a1f74bdd-d63e-40ab-b922-a5b72077beda'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='project_id',
            field=models.UUIDField(default=uuid.UUID('68b3c941-2d2e-425d-8a93-ed72463380a6'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='project_status',
            field=models.CharField(blank=True, choices=[('To Do', 'To do'), ('In Progress', 'In Progress'), ('Done', 'Done')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='category',
            field=models.CharField(blank=True, choices=[('Backend Devt', 'Backend Devt'), ('Backend Devt', 'Backend Devt'), ('UI Design', 'UI Design')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='priority',
            field=models.CharField(blank=True, choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(blank=True, choices=[('To Do', 'To do'), ('In Progress', 'In Progress'), ('Done', 'Done')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='task_id',
            field=models.UUIDField(default=uuid.UUID('ce3868b0-622e-474f-89e3-620fe48905b6'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]
