from django.shortcuts import render
from rest_framework import generics
from .models import Flower, Basket
from django.contrib.auth.models import User
from .serializers import FlowerSerializer, BasketSerializer, UserSerializer

class FlowerListView(generics.ListAPIView):
    queryset = Flower.objects.all()
    serializer_class = FlowerSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned flowers to a given type,
        by filtering against a `type` attribute in the URL.
        """
        flower_type = self.kwargs['type']
        return self.queryset.filter(flower_type=flower_type)

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BasketDetailView(generics.RetrieveUpdateAPIView):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer
