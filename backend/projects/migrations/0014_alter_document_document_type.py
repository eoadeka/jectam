# Generated by Django 4.1.13 on 2024-03-16 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0013_documenttype_remove_document_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='document_type',
            field=models.CharField(choices=[('business_case', 'Business Case'), ('benefits_management_approach', 'Benefits Management Approach')], max_length=50),
        ),
    ]
