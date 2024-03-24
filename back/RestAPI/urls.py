from django.urls import path
from .views import FlowerListView

urlpatterns = [
    path('flowers/', FlowerListView.as_view(), name='flowers'),
]