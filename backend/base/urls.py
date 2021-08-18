
from django.urls import path, re_path
from . import views

urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'), 

    path('users/register',views.registerUser, name='register'),
    
    path('users/profile',views.getUserProfile, name='user-profile'),
    path('users/profile/update', views.updateUserProfile, name='user-profile-update'),
    path('users/', views.getUsers, name='users'),

    path('orders/add', views.addOrderItems, name='orders-add'),
    path('orders/myorders', views.getMyOrders, name='myorders'),
    path('orders/<str:pk>',views.getOrderById, name='user-order'),
    path('orders/<str:pk>/pay',views.updateOrderToPaid, name='pay'),
    


    path('products/',views.getProducts, name='products'),
    path('products/latest', views.getLatestProducts, name='latest'),
    path('products/<str:pk>',views.getProduct, name= 'product'),
] 
