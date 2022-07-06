from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoTaskSerializer
from .models import TodoTask
from rest_framework.generics import (ListAPIView, CreateAPIView,
                                     UpdateAPIView, DestroyAPIView)


class TodoTaskView(ListAPIView):
    queryset = TodoTask.objects.all()
    serializer_class = TodoTaskSerializer


class AddTodoTaskView(CreateAPIView):
    queryset = TodoTask.objects.all()
    serializer_class = TodoTaskSerializer


class UpdateTodoTaskView(UpdateAPIView):
    queryset = TodoTask.objects.all()
    serializer_class = TodoTaskSerializer


class DeleteTodoTaskView(DestroyAPIView):
    queryset = TodoTask.objects.all()
    serializer_class = TodoTaskSerializer
