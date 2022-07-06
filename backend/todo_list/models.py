from tokenize import blank_re
from django.db import models
import datetime


class TodoTask(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=False)
    start = models.DateTimeField(auto_now_add=True)
    limit = models.DateField(default=datetime.date.today(), blank=True)

    def _str_(self):
        return self.name

    class Meta:
        ordering = ('-start',)
