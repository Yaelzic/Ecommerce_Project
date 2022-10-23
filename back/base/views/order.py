from django.shortcuts import render
from ..models import Order, Product, OrderSerializer, Order_Details, OrderDetSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def orders(request):
    user = request.user
    orders= Order.objects.all().filter(user = user)
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)
    #user = request.user
    #orders=[]
    #orders = Order_Details.objects.select_related('order_id').filter(order_id__user = user)
    #for ord in orders:
    #    print (ord.order_id.user, ord.product.price)
    #return Response("orders")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def orderDetails(request):
    user = request.user
    #orderDet = Order_Details.objects.all().filter(user = user)
    #serializer = OrderDetSerializer(orderDet,many=True)
    #print(serializer.data)
    #return Response(serializer.data)
    orderDet=[] 
    for ordDet in user.order_details_set.all():
        orderDet.append(OrderDetSerializer().getOrderDet(ordDet)) 
    return Response(orderDet)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    orders=request.data
    total = 0
    for x in orders:
        newProd=Product.objects.get(id= x["id"])
        total+=newProd.price * x["amount"]
    # create a single oreder
    newOrder= Order.objects.create(user=request.user,total=total)
    # create new order details
    for x in orders:
        newProd=Product.objects.get(id= x["id"])
        prodTotal=newProd.price * x["amount"]
        Order_Details.objects.create(order_id=newOrder,product=newProd,amount=x["amount"],total=prodTotal,user=request.user)
    return Response("product was create successfully")