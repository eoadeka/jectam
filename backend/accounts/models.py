from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission



class CustomGroup(Group):
    description = models.TextField(blank=True)

# # Capture user information, including details such as username, email, password, and user roles (e.g., project manager, team member).
# class CustomUser(AbstractUser):
    # User groups
    PM = 1
    FRONTEND_ENGINEER = 2
    BACKEND_ENGINEER = 3
    DESIGNER = 4
    QA_TESTER = 5
    DEVOPS_ENGINEER = 6
    
    # Role choices
    ROLE_CHOICES = (
        (PM, 'PM'),
        (FRONTEND_ENGINEER, 'frontend_engineer'),
        (BACKEND_ENGINEER, 'backend_engineer'),
        (DESIGNER, 'designer'),
        (QA_TESTER, 'qa_tester'),
        (DEVOPS_ENGINEER, 'devops_engineer'),
    )

    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True)