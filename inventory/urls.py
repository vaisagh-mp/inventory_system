from django.urls import path
from .views import (
    ItemListCreateView, ItemRetrieveUpdateDestroyView,
    ItemTypeListCreateView, ItemTypeRetrieveUpdateDestroyView,BulkItemCreateView
)

urlpatterns = [
    path('item-types/', ItemTypeListCreateView.as_view(), name='itemtype-list-create'),
    path('item-types/<int:pk>/', ItemTypeRetrieveUpdateDestroyView.as_view(), name='itemtype-detail'),

    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
    path('items/<int:pk>/', ItemRetrieveUpdateDestroyView.as_view(), name='item-detail'),
    path("items/bulk-create/", BulkItemCreateView.as_view(), name="bulk-item-create"),
]
