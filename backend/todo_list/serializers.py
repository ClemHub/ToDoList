from rest_framework import serializers
from .models import TodoTask


class TodoTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoTask
        fields = ('id', 'name', 'description', 'status', 'start', 'limit')