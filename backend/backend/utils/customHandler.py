from accounts.serializers import UserDetailsSerializer

def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserDetailsSerializer(user, context={'request': request}).data
    }