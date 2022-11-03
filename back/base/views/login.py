
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout
from rest_framework.response import Response

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
            print(user)
            token = super().get_token(user)
            token['username'] = user.username
            token['email'] = user.email
            token['admin'] = user.is_superuser
            return token
        
#login
class MyTokenObtainPairView(TokenObtainPairView):

    serializer_class = MyTokenObtainPairSerializer
    

# logout
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logOut(request):
    logout(request)
    return Response("success")


# register
@api_view(['POST'])
def register(request):
    if User.objects.filter(username=request.data['username']).exists():
        return Response("User already exists")
    User.objects.create_user(username=request.data['username'], email=request.data['email'],
    password=request.data['password'],is_staff=0,is_superuser=False)
    return Response("")

