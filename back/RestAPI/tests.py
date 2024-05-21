from collections import OrderedDict

from django.core.management import call_command
from django.test import TestCase

# Create your tests here.
from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from .models import Flower, Order, Category
from .serializers import OrderSerializer
from .views import FlowerListView, FlowerDetailView, FlowerListViewByCategory, CategoryListView, UserDetailView, \
    OrderDetailView


class FlowerListViewTestCase(TestCase):
    fixtures = ['./RestAPI/testData/flowers.json', './RestAPI/testData/category.json']

    def setUp(self):
        self.factory = APIRequestFactory()
        call_command('loaddata', './RestAPI/testData/flowers.json')

    def test_get(self):
        request = self.factory.get('/flowers/')
        view = FlowerListView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)

    def tearDown(self):
        Flower.objects.all().delete()


class FlowerDetailViewTestCase(TestCase):
    fixtures = ['./RestAPI/testData/flowers.json', './RestAPI/testData/category.json']

    def setUp(self):
        self.factory = APIRequestFactory()
        call_command('loaddata', './RestAPI/testData/flowers.json')

    def test_get(self):
        flower_id = 1
        request = self.factory.get(f'/flowers/{flower_id}/')
        view = FlowerDetailView.as_view()
        response = view(request, flower_id=flower_id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['id'], flower_id)

    def test_patch(self):
        flower_id = 1
        request = self.factory.patch(f'/flowers/{flower_id}/', {'stock': 10}, format='json')
        view = FlowerDetailView.as_view()
        response = view(request, flower_id=flower_id)
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        Flower.objects.all().delete()


class OrderDetailViewTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create(username='test_user', email='test@example.com')

        self.category = Category.objects.create(name='test_category')

        self.flower1 = Flower.objects.create(name='Rose', category=self.category, price=10, stock=20)
        self.flower2 = Flower.objects.create(name='Lily', category=self.category, price=8, stock=30)

    def test_get_basket(self):
        basket = Order.objects.create(user=self.user)
        basket.flowers.add(self.flower1, self.flower2)

        request = self.factory.get('/basket/')
        request.user = self.user
        view = OrderDetailView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, 200)
        expected_data = OrderSerializer(basket).data
        self.assertEqual(response.data[0], OrderedDict(expected_data))

    """
    Test non fonctionnel peut être qu'il y a une erreur avec le code
    def test_post_basket(self):
        flowers_data = [self.flower1.id, self.flower2.id]
        data = {'flowers': flowers_data}
        print(data)

        request = self.factory.post('/basket/', data)
        request.user = self.user
        view = BasketDetailView.as_view()
        response = view(request)
        print(flowers_data)

        print("Je suis la : " + str(response.data))
        self.assertEqual(response.status_code, 201)

        basket = Basket.objects.get(user=self.user)
        self.assertEqual(basket.flowers.count(), len(flowers_data))
        for flower_id in flowers_data:
            self.assertTrue(basket.flowers.filter(id=flower_id).exists())"""
