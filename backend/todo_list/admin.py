from django.contrib import admin
from .models import TodoTask


class TodoAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'status', 'start', 'limit')


admin.site.register(TodoTask, TodoAdmin)
