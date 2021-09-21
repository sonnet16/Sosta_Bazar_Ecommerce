from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .serializer import ProductSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer

from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import datetime
from django.contrib.auth.hashers import make_password
from rest_framework import status
# Create your views here.

# GET ALL PRODUCT
@api_view(['GET'])
@permission_classes([ IsAdminUser ])
def getAllProduct(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# ADD PRODUCT BY ADMIN
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user = user,
        name = 'sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0,
        description = 'Sample Description'
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# Update PRODUCT BY ADMIN
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):

    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer =  ProductSerializer(product, many=False)
    return Response(serializer.data)



@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id = product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image Upload Successfull')



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer( orders, many=True)
    return Response(serializer.data)