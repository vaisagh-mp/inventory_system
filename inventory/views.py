from rest_framework import generics
from .models import Item, ItemType
from .serializers import ItemSerializer, ItemTypeSerializer, BulkItemSerializer

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

class BulkItemCreateView(generics.CreateAPIView):
    serializer_class = BulkItemSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        items = serializer.save()
        return Response({"message": "Items added successfully!", "items": ItemSerializer(items, many=True).data}, status=status.HTTP_201_CREATED)
