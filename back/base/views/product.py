from django.http import JsonResponse
from django.shortcuts import render
from ..models import Product, ProductSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated


@api_view(['GET'])
def products(request,id=-1):
    if request.method == 'GET':    #method get all
        if int(id) > -1: #get single product
            if int(id)> Product.objects.count(): return JsonResponse({"out of bounds array":"1111"})
            product= Product.objects.get(id = id)
            res = ProductSerializer().getProduct(product)
            return Response (res)  
        else: # return all
            res=[] #create an empty list
            for productObj in Product.objects.all(): #run on every row in the table...
                res.append(ProductSerializer().getProduct(productObj)) #append row by to row to res list
            return Response(res) #return array as json response



@api_view(['POST'])
@permission_classes([IsAdminUser])
def addProduct(request):
    serializer = ProductSerializer(data=request.data)
    if( serializer.is_valid()):
        serializer.save()
    else:
        return Response("data was not saved, error ....")
    return Response("product was create successfully")


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delProduct(request, id):
    product = Product.objects.get(id=id)
    product.delete()
    return Response ({'DELETE': 'SUCCESS'})

    #if request.method == 'PUT': #method delete a row
     #   temp=Product.objects.get(id = id)
     #   temp.price =request.data['price']
     #   temp.desc =request.data['desc']
      #  temp.save()
      #  return Response ({'PUT': id})