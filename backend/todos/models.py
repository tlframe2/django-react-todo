import uuid
from django.db import models

class Todo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.task