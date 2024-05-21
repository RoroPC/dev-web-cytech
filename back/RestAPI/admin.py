from django.contrib import admin
from RestAPI.models import Flower, Order, Category, Contact


# Register your models here.

class FlowerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'stock')
    list_editable = ['stock','name','price']
    def display_category(self, obj):
        return obj.Category.name if obj.category else '-'


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'display_flowers')

    def display_flowers(self, obj):
        return ', '.join([flower.name for flower in obj.flowers.all()])


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class ContactAdmin(admin.ModelAdmin):
    list_display = ('id','firstName','lastName','email','birthdate','gender','function','subject','content')


admin.site.register(Flower, FlowerAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Contact, ContactAdmin)
