from django.contrib import admin
from RestAPI.models import Flower, Basket
# Register your models here.

class FlowerAdmin(admin.ModelAdmin):
    list_display = ('id','name','price','stock')

class BasketAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'display_flowers')
    def display_flowers(self, obj):
        return ', '.join([flower.name for flower in obj.flowers.all()])



admin.site.register(Flower,FlowerAdmin)
admin.site.register(Basket,BasketAdmin)


