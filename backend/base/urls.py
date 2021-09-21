
from django.urls import path, re_path
from . import views
from . import adminProduct

urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'), 

    path('users/register',views.registerUser, name='register'),
    
    path('users/profile',views.getUserProfile, name='user-profile'),
    path('users/profile/update', views.updateUserProfile, name='user-profile-update'),
    path('users/', views.getUsers, name='users'),
    path('users/<str:pk>',views.getUserById, name='user-by-id'),
    path('users/update/<str:pk>',views.updateUser, name='user-update'),
    path('users/delete/<str:pk>', views.deleteUser, name = 'delete-user'),

    path('orders/add', views.addOrderItems, name='orders-add'),
    path('orders/myorders', views.getMyOrders, name='myorders'),
    path('orders/<str:pk>',views.getOrderById, name='user-order'),
    path('order/<str:pk>/pay',views.updateOrderToPaid, name='pay'),
    
    path('order/<str:pk>/deliver', views.updateOrderToDelivered,name ='delivered'),


    path('admin/orders',adminProduct.getAllOrders, name='all-orders'),


    path('products/',views.getProducts, name='products'),
    path('products/admin',adminProduct.getAllProduct, name='all-products'),
    path('products/latest', views.getLatestProducts, name='latest'),
    path('product/create', adminProduct.createProduct, name= 'create-product'),
    path('product/upload', adminProduct.uploadImage, name = 'upload-image'),
    path('products/<str:pk>',views.getProduct, name= 'product'),
    

   
  
    path('product/update/<str:pk>',adminProduct.updateProduct, name='update-product'),
    path('product/delete/<str:pk>', views.deleteProduct, name='delete-product'),
] 
