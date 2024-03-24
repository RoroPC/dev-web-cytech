from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import generics, status

from .models import Flower, Basket, Category
from django.contrib.auth.models import User
from .serializers import FlowerSerializer, BasketSerializer, UserSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class FlowerListView(APIView):
    """
        Get list of all the flowers
    """
    def get(self, request, format=None):
        queryset = Flower.objects.all()
        serializer_class = FlowerSerializer(queryset, many=True)
        return Response(serializer_class.data)


class FlowerDetailView(APIView):
    """
        Get flowers details
    """
    def get(self, request, flower_id, format=None):
        try:
            Flower.objects.get(id=flower_id)
        except Flower.DoesNotExist:
            return Response({"error": "Flower not found"}, status=status.HTTP_404_NOT_FOUND)
        queryset = Flower.objects.filter(id=flower_id)
        serializer = FlowerSerializer(queryset, many=True)
        return Response(serializer.data)

    def patch(self, request, flower_id, format=None):
        try:
            flower = Flower.objects.get(id=flower_id)
        except Flower.DoesNotExist:
            return Response({"error": "Flower not found"}, status=status.HTTP_404_NOT_FOUND)

        new_stock = request.data.get('stock')

        if new_stock is None:
            return Response({"error": "New stock is required"}, status=status.HTTP_400_BAD_REQUEST)

        if new_stock < 0:
            return Response({"error": "New stock should be superior than 0"}, status=status.HTTP_400_BAD_REQUEST)

        flower.stock = new_stock
        flower.save()

        serializer = FlowerSerializer(flower)
        return Response(serializer.data)


class FlowerListViewByCategory(generics.ListAPIView):
    """
        Get flowers from a category
    """
    serializer_class = FlowerSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        try:
            Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        return Flower.objects.filter(category_id=category_id)


class CategoryListView(APIView):
    """
        Get List of all categories
    """
    def get(self, request):
        queryset = Category.objects.all()
        serializer_class = CategorySerializer(queryset, many=True)
        return Response(serializer_class.data)


class UserDetailView(APIView):
    """
        Get users details
    """
    def get(self, request, format=None):
        data = {
            "username": request.user.username,
            "email": request.user.email,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name
        }
        return Response(data)


class BasketDetailView(APIView):
    """
        Get current user basket
    """
    def get(self, request, format=None):
        current_user = request.user.id
        queryset = Basket.objects.filter(user=current_user)
        serializer_class = BasketSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def post(self, request, format=None):
        user = request.user
        flowers_data = request.data.get(
            'flowers')

        try:
            basket = Basket.objects.get(user=user)
            basket.flowers.clear()
        except Basket.DoesNotExist:
            basket = Basket.objects.create(user=user)

        for flower_id in flowers_data:
            try:
                flower = Flower.objects.get(id=flower_id)
                basket.flowers.add(flower)
            except Flower.DoesNotExist:
                return Response({"error": f"Flower with id {flower_id} does not exist"},
                                status=status.HTTP_400_BAD_REQUEST)

        serializer = BasketSerializer(basket)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
