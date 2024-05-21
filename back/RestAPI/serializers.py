from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Flower, Order, Category, Contact
from django.contrib.auth.models import User


class FlowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flower
        fields = ['id', 'name', 'img', 'price', 'stock']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'flowers']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'firstName', 'lastName']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

    def create(self, validated_data):
        contact = Contact.objects.create(**validated_data)
        contact.save()
        return contact


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create_user(email=validated_data['email'],
                                        username=validated_data['email'],
                                        first_name=validated_data['firstName'],
                                        last_name=validated_data['lastName'])
        user.set_password(validated_data['password'])

        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, validated_data):
        print(validated_data['email'])
        print(validated_data['password'])

        user = authenticate(username=validated_data['email'], password=validated_data['password'])
        print(user)
        if not user:
            raise ValidationError('Invalid credentials')
        return user
