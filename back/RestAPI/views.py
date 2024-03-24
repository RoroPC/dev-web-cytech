from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import generics

from .models import Flower, Basket, Category
from django.contrib.auth.models import User
from .serializers import FlowerSerializer, BasketSerializer, UserSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class FlowerListView(APIView):

    def get(self, request, format=None):
        queryset = Flower.objects.all()
        serializer_class = FlowerSerializer(queryset, many=True)
        return Response(serializer_class.data)


class FlowerListViewByCategory(generics.ListAPIView):
    serializer_class = FlowerSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Flower.objects.filter(category_id=category_id)


class CategoryListView(APIView):
    def get(self, request):
        queryset = Category.objects.all()
        serializer_class = CategorySerializer(queryset, many=True)
        return Response(serializer_class.data)


class UserDetailView(APIView):
    def get(self, request, format=None):
        data = {
            "username": request.user.username,
            "email": request.user.email,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name
        }
        return Response(data)


class BasketDetailView(APIView):
    def get(self, request, format=None):
        current_user = request.user.id
        queryset = Basket.objects.filter(user=current_user)
        serializer_class = BasketSerializer(queryset, many=True)
        return Response(serializer_class.data)
