from django.urls import path
from .views import FlowerListView, FlowerListViewByCategory

urlpatterns = [
    path('flowers/', FlowerListView.as_view(), name='flowers'),
    path('flowers/category/<int:category_id>/', FlowerListViewByCategory.as_view(), name='flower-list-by-category')
]
