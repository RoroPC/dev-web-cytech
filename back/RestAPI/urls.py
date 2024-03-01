from django.urls import path
from . import views

urlpatterns = [
    path('flowers/rosiers', views.FlowerListView.as_view(), name='rosiers'),
    path('flowers/bulbes', views.BulbListView.as_view(), name='bulbes'),
   
]