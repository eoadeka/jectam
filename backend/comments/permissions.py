from rest_framework.permissions import BasePermission

class IsCommenterOrReadOnly(BasePermission):
    """
    Custom permission to allow only the commenter to edit their own comments.
    """
    def has_object_permission(self, request, view, obj):
        # Allow GET, HEAD, or OPTIONS requests (read-only)
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # Allow the original commenter to edit their own comment
        return obj.commenter == request.user
