from rest_framework import generics
from .models import Item, ItemType
from .serializers import ItemSerializer, ItemTypeSerializer

# CRUD for Item Types
class ItemTypeListCreateView(generics.ListCreateAPIView):
    queryset = ItemType.objects.all()
    serializer_class = ItemTypeSerializer

class ItemTypeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ItemType.objects.all()
    serializer_class = ItemTypeSerializer

# CRUD for Items
class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.select_related('item_type').all()
    serializer_class = ItemSerializer

class ItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
