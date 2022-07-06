from django.contrib import admin
from django.urls import path, include
from todo_list.views import TodoTaskView
# from rest_framework import routers


# router = routers.DefaultRouter()
# router.register(r'todo_list', views.TodoTaskView, 'todo_task')


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('todo', include('todo_list.urls')),
    path("todo/", include('todo_list.urls')),
    # path('todo_list/', include(router.urls))
]
