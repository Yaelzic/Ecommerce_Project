from django.http import JsonResponse
from django.shortcuts import render
from ..models import Category, CategorySerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated

@api_view(['GET'])
def categories(request):
    categories= Category.objects.all()
    serializer = CategorySerializer(categories,many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCategory(request):
    serializer = CategorySerializer(data=request.data)
    if( serializer.is_valid()):
       serializer.save()
    else:
        return Response("data was not saved, error ....")
    return Response("category was create successfully")


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delCategory(request, id):
    category = Category.objects.get(id=id)
    category.delete()
    return Response ({'DELETE': 'SUCCESS'})