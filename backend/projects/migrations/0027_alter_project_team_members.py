# Generated by Django 4.1.13 on 2024-04-02 22:04

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0026_project_team_members'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='team_members',
            field=models.ManyToManyField(blank=True, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
