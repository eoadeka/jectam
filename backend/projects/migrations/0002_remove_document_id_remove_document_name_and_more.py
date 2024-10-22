# Generated by Django 4.1.13 on 2024-03-06 22:18

import autoslug.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='id',
        ),
        migrations.RemoveField(
            model_name='document',
            name='name',
        ),
        migrations.RemoveField(
            model_name='project',
            name='id',
        ),
        migrations.RemoveField(
            model_name='task',
            name='id',
        ),
        migrations.RemoveField(
            model_name='task',
            name='name',
        ),
        migrations.AddField(
            model_name='document',
            name='document_id',
            field=models.UUIDField(default=uuid.UUID('de8740d9-0946-4ab9-a177-f4a6581dffb5'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AddField(
            model_name='document',
            name='slug',
            field=autoslug.fields.AutoSlugField(default='', editable=False, populate_from='title'),
        ),
        migrations.AddField(
            model_name='document',
            name='title',
            field=models.CharField(default='document', max_length=255),
        ),
        migrations.AddField(
            model_name='project',
            name='created_at',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='project',
            name='is_archived',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='project',
            name='is_completed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='project',
            name='method',
            field=models.CharField(blank=True, choices=[('scrum', 'Scrum'), ('prince2', 'PRINCE2'), ('waterfall', 'Waterfall')], max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='project_id',
            field=models.UUIDField(default=uuid.UUID('b52f329f-2c6d-46a5-8a4e-217c60866839'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AddField(
            model_name='project',
            name='project_status',
            field=models.CharField(blank=True, choices=[('to_do', 'To do'), ('in_progress', 'In Progress'), ('done', 'Done')], max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='slug',
            field=autoslug.fields.AutoSlugField(default='', editable=False, populate_from='title'),
        ),
        migrations.AddField(
            model_name='project',
            name='three_word_description',
            field=models.CharField(default='description...', max_length=255),
        ),
        migrations.AddField(
            model_name='project',
            name='updated_at',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='task',
            name='assignee',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='task',
            name='category',
            field=models.CharField(blank=True, choices=[('backend_devt', 'Backend Devt'), ('frontend_devt', 'Frontend Devt'), ('ui_design', 'UI Design')], max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='priority',
            field=models.CharField(blank=True, choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')], max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='slug',
            field=autoslug.fields.AutoSlugField(default='', editable=False, populate_from='title'),
        ),
        migrations.AddField(
            model_name='task',
            name='task_id',
            field=models.UUIDField(default=uuid.UUID('352425fa-398b-4214-997a-77c47613714e'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AddField(
            model_name='task',
            name='title',
            field=models.CharField(default='task', max_length=255),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(blank=True, choices=[('to_do', 'To do'), ('in_progress', 'In Progress'), ('done', 'Done')], max_length=20, null=True),
        ),
    ]
