from django.db import models
from django.contrib.auth.models import User

class Flower(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    img = models.URLField()  
    price = models.IntegerField()
    stock = models.IntegerField()

    def __str__(self):
        return self.name

class Basket(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flowers = models.ManyToManyField(Flower)

    def __str__(self):
        return f"Basket of {self.user.username}"

class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)

    def __str__(self):
        return self.email