from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, CustomGroup


@receiver(post_save, sender=CustomUser)
def assign_user_to_group(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'default':
            group_name = 'Default'
        elif instance.role in ['project_manager', 'product_manager']:
            group_name = 'Manager'
        elif instance.role in ['frontend_engineer', 'backend_engineer', 'designer', 'qa_tester', 'devops_engineer']:
            group_name = 'Team Member'

        group, _ = CustomGroup.objects.get_or_create(name=group_name)
        instance.groups.add(group)
