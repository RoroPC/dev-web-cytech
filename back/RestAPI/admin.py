from django.contrib import admin
from RestAPI.models import Flower, Basket, Category


# Register your models here.

class FlowerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'stock')
    list_editable = ['stock','name','price']
    def display_category(self, obj):
        return obj.Category.name if obj.category else '-'


class BasketAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'display_flowers')

    def display_flowers(self, obj):
        return ', '.join([flower.name for flower in obj.flowers.all()])


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


admin.site.register(Flower, FlowerAdmin)
admin.site.register(Basket, BasketAdmin)
admin.site.register(Category, CategoryAdmin)
