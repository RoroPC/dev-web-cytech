from django.core.validators import MinValueValidator
from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class Flower(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    img = models.URLField()
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    stock = models.IntegerField(validators=[MinValueValidator(0)])

    def __str__(self):
        return self.name


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flowers = models.ManyToManyField(Flower)

    def __str__(self):
        return f"Basket of {self.user.username}"
