from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.db.migrations import serializer
from django.shortcuts import render
from rest_framework import generics, status, permissions, authentication
from rest_framework.authentication import SessionAuthentication

from .Validation import custom_validation, validate_email, validate_password, contact_validation
from .models import Flower, Order, Category
from django.contrib.auth.models import User
from .serializers import FlowerSerializer, OrderSerializer, UserSerializer, CategorySerializer, UserRegisterSerializer, \
    UserLoginSerializer, ContactSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.middleware.csrf import get_token


class FlowerListView(APIView):
    """
        Get list of all the flowers
    """
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request, format=None):
        queryset = Flower.objects.all()
        serializer_class = FlowerSerializer(queryset, many=True)
        return Response(serializer_class.data)


class FlowerDetailView(APIView):
    """
        Get flowers details
    """
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

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
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

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
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        queryset = Category.objects.all()
        serializer_class = CategorySerializer(queryset, many=True)
        return Response(serializer_class.data)


class UserDetailView(APIView):
    """
        Get users details
    """
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request, format=None):
        data = {
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "isAdmin": request.user.is_staff
        }
        return Response(data)


class OrderDetailView(APIView):
    """
        Get current user basket
    """
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request, format=None):
        current_user = request.user.id
        queryset = Order.objects.filter(user=current_user)
        serializer_class = OrderSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def post(self, request, format=None):
        user = request.user
        flowers_data = request.data.get(
            'flowers')

        try:
            basket = Order.objects.get(user=user)
            basket.flowers.clear()
        except Order.DoesNotExist:
            basket = Order.objects.create(user=user)

        for flower_id in flowers_data:
            try:
                flower = Flower.objects.get(id=flower_id)
                basket.flowers.add(flower)
            except Flower.DoesNotExist:
                return Response({"error": f"Flower with id {flower_id} does not exist"},
                                status=status.HTTP_400_BAD_REQUEST)

        serializer = OrderSerializer(basket)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            # serializer.create(clean_data)
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (authentication.SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class CsrfTokenView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({'csrfToken': get_token(request)})


class ContactView(APIView):
    def post(self, request, *args, **kwargs):
        if contact_validation(request.data):
            contactSerializer = ContactSerializer(data=request.data)
            if contactSerializer.is_valid(raise_exception=True):
                contactSerializer.create(request.data)
                return Response(contactSerializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response("Error with the fields", status=status.HTTP_400_BAD_REQUEST)
