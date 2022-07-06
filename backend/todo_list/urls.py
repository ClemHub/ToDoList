from django.urls import path
from .views import TodoTaskView, AddTodoTaskView, UpdateTodoTaskView, DeleteTodoTaskView

urlpatterns = [
    path("list/", TodoTaskView.as_view(), name='task_list'),
    path("add/", AddTodoTaskView.as_view(), name='add_task'),
    path("<pk>/update/", UpdateTodoTaskView.as_view(), name='update_task'),
    path("<pk>/delete/", DeleteTodoTaskView.as_view(), name='delete_task'),
]
