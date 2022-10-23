from django.contrib import admin

from .models import Category, Product, Order, Order_Details, Wish
 
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Wish)
admin.site.register(Order)
admin.site.register(Order_Details)