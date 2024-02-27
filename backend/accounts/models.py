from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser, Group, PermissionsMixin

# class CustomGroup(Group):
#     description = models.TextField(blank=True)

# # Capture user information, including details such as username, email, password, and user roles (e.g., project manager, team member).
class CustomUser(AbstractUser, PermissionsMixin):
    # User groups
    PROJECT_MANAGER = 'project_manager'
    PRODUCT_MANAGER = 'product_manager'
    FRONTEND_ENGINEER = 'frontend_engineer'
    BACKEND_ENGINEER = 'backend_engineer'
    DESIGNER = 'designer'
    QA_TESTER = 'qa_tester'
    DEVOPS_ENGINEER = 'devops_engineer'
    
    # Role choices
    ROLE_CHOICES = (
        (PROJECT_MANAGER, 'Project Manager'),
        (PRODUCT_MANAGER, 'Product Manager'),
        (FRONTEND_ENGINEER, 'Frontend Engineer'),
        (BACKEND_ENGINEER, 'Backend Engineer'),
        (DESIGNER, 'Designer'),
        (QA_TESTER, 'QA Tester'),
        (DEVOPS_ENGINEER, 'DevOps Engineer'),
    )

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    # USERNAME_FIELD = 'email'
    def __str__(self):
        return self.email


