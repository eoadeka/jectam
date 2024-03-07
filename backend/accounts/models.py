from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser, Group, PermissionsMixin, BaseUserManager, AbstractBaseUser

# class CustomGroup(Group):
#     description = models.TextField(blank=True)
class MyUserManager(BaseUserManager):
    def create_user(self, email, date_of_birth, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            date_of_birth=date_of_birth,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, date_of_birth, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            date_of_birth=date_of_birth,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

# # Capture user information, including details such as username, email, password, and user roles (e.g., project manager, team member).
class CustomUser(AbstractUser):
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
    
    username = None
    email = models.EmailField(verbose_name="email address", max_length=255, unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    objects = MyUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    # USERNAME_FIELD = 'email'
    def __str__(self):
        return self.email


