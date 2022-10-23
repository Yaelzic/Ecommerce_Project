from django.urls import path
from .views.login import MyTokenObtainPairView
from .views import product, index, order, login, categories, wish
from rest_framework_simplejwt.views import (TokenRefreshView)
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index.index),
    path('token/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', login.register),
    path('logout/', login.logOut),
    path('products/',product.products, name='getall'),
    path('products/<id>',product.delProduct),
    path('categories/',categories.categories, name='getall'),
    path('categories/<id>',categories.delCategory),
    path('addCategory/',categories.addCategory),
    path('wish/',wish.wishes),
    path('wish/<id>',wish.delWish),
    path('addWish/',wish.addWish),
    path('addOrder/',order.addOrder),
    path('orders/',order.orders),
    path('orderDetails/',order.orderDetails),

]
