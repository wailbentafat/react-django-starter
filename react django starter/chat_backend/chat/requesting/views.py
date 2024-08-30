from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.contrib.auth import login
from django.contrib.auth.hashers import make_password
from django.conf import settings
from datetime import datetime, timedelta
import jwt
from django.contrib.auth import authenticate


from .serializers import UsercreateSerializer
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated 

@api_view(['POST'])
def authentification(request):
    serializer = UsercreateSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.data['email']
        password = serializer.data['password']
        
        auth = authenticate(email=email, password=password )
        
        if auth:
            print("auth")
            login(request, auth)
            payload = {
                'id': auth.id,
                'exp': datetime.utcnow() + timedelta(hours=90),  
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            
            response = Response({"token": token})
           
            response.set_cookie('authToken', token, httponly=True)
            return response
        
        else:
            print("not auth")
            
            user = {
                'username': email,
                'email': email,
                'password': password,
                'first_name': serializer.data['first_name'],
                'second_name': serializer.data['second_name']
            }
            cred = CustomUser.objects.create(**user)
            user = authenticate(email=email, password=password)
            login(request, cred,backend='chat.core.backend.EmailBackend')
            payload = {
                'id': cred.id,
                'exp': datetime.utcnow() + timedelta(hours=90),  # Changed to 1 hour
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            
            response = Response({"authtoken": token})
           
           
            return response
    
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=400)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_auth(request):
     print(request.user)
     user= request.user
     userd = {'authenticated': True,'id': user.id,'email': user.email, 'first_name': user.first_name, 'second_name': user.second_name}
     return Response(userd)