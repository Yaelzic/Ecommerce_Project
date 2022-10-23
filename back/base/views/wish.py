from django.http import JsonResponse
from django.shortcuts import render
from ..models import Wish, WishSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def wishes(request):
    user = request.user
    wishes=[] 
    for wishObj in user.wish_set.all():
        wishes.append(WishSerializer().getWish(wishObj)) 
    return Response(wishes)

    #return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addWish(request):
    serializer = WishSerializer(data=request.data)
    if(serializer.is_valid()):
        wishId = serializer.save(user=request.user)
    else:
        return Response("data was not saved, error ....")
    wishObj= Wish.objects.get(id = wishId.id)
    wish = WishSerializer().getWish(wishObj)
    return Response(wish)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delWish(request, id):
    print(request.data)
    wish = Wish.objects.get(id=id)
    wish.delete()
    return Response (id)