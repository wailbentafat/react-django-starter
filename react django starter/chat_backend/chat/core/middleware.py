
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
import jwt
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model

User = get_user_model()

class AuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith('/public/'):
            return

        auth_header = request.headers.get('Authorization')
        token = None
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]

        if token:
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                request.user = User.objects.get(id=payload['id'])
            except jwt.ExpiredSignatureError:
                request.user = AnonymousUser()
                print("Expired token")
            except jwt.InvalidTokenError:
                request.user = AnonymousUser()
                print("Invalid token")
        else:
            request.user = AnonymousUser()
