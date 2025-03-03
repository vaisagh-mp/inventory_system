from rest_framework import serializers
from .models import Item, ItemType

class ItemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemType
        fields = ['id', 'type_name']

class ItemSerializer(serializers.ModelSerializer):
    item_type = serializers.PrimaryKeyRelatedField(queryset=ItemType.objects.all())

    class Meta:
        model = Item
        fields = ["id", "name", "purchase_date", "stock_available", "item_type"]
