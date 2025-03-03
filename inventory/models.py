from django.db import models

class ItemType(models.Model):
    type_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.type_name


class Item(models.Model):
    name = models.CharField(max_length=255)
    purchase_date = models.DateField()
    stock_available = models.BooleanField(default=False)
    item_type = models.ForeignKey(ItemType, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
