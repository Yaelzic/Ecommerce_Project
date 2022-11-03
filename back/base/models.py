from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers

class Category(models.Model):
    id = models.AutoField(primary_key=True,editable=False)
    desc = models.CharField(max_length=50,null=True,blank=True)
     
    def __str__(self):
     	return self.desc 

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
 
class Product(models.Model):
    id = models.AutoField(primary_key=True,editable=False)
    desc = models.CharField(max_length=50,null=True,blank=True)
    price = models.DecimalField(max_digits=5,decimal_places=2)
    company = models.CharField(max_length=50,null=True,blank=True)
    image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    category_id =models.ForeignKey(Category,on_delete=models.SET_NULL,null=True)

    def __str__(self):
     	return self.desc 

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
        
    def getProduct(self,obj):
       return {
           "id" : obj.id,
           "desc" : obj.desc,
           "price" : obj.price,
           "company" : obj.company,
           "category_name" : str(obj.category_id.desc),
           "category_id" : str(obj.category_id.id),
           "image" : str(obj.image)
            }

class Wish(models.Model):
    id = models.AutoField(primary_key=True,editable=False)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)

class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wish
        fields = '__all__'

    def getWish(self,obj):
       return {
           "id" : obj.id,
           "desc" : str(obj.product.desc),
           "price" : str(obj.product.price),
           "company" : str(obj.product.company),
           "image" : str(obj.product.image)
            }


class Order(models.Model):
    id = models.AutoField(primary_key=True,editable=False)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    createdTime = models.DateField(auto_now_add=True)
    total = models.DecimalField(max_digits=5,decimal_places=2,null=True)

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class Order_Details(models.Model):
    id = models.AutoField(primary_key=True,editable=False)
    order_id = models.ForeignKey(Order,on_delete=models.CASCADE,null=True, related_name='orders')
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    amount = models.IntegerField(null=True)
    total = models.DecimalField(max_digits=5,decimal_places=2,null=True)

class OrderDetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_Details
        fields = '__all__'

    def getOrderDet(self,obj):
       return {
           "id" : obj.id,
           "order_id" : str(obj.order_id.id),
           "desc" : str(obj.product.desc),
           "price" : str(obj.product.price),
           "company" : str(obj.product.company),
           "image" : str(obj.product.image),
           "amount": obj.amount,
           "total": obj.total
            }
    
    