from django.contrib.auth.decorators import login_required
from django.urls import path
from .views import FlowerListView, FlowerListViewByCategory, BasketDetailView, UserDetailView, FlowerDetailView, \
    UserRegister, UserLogin, UserLogout

urlpatterns = [
    path('flowers/', FlowerListView.as_view(), name='flowers'),
    path('flowers/category/<int:category_id>/', FlowerListViewByCategory.as_view(), name='flower-list-by-category'),
    path('flowers/<int:flower_id>/', login_required(FlowerDetailView.as_view()), name='flower-detail'),
    path('basket/', login_required(BasketDetailView.as_view()), name='user-basket'),
    path('me/', login_required(UserDetailView.as_view()), name='user-detail'),
    path('register', UserRegister.as_view(), name='register'),
    path('login', UserLogin.as_view(), name='login'),
    path('logout', UserLogout.as_view(), name='logout'),
]
