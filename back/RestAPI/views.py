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


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BasketDetailView(generics.RetrieveUpdateAPIView):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer
