from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Session(models.Model):

    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sessions"
    )

    title = models.CharField(max_length=255)

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    duration = models.IntegerField()

    category = models.CharField(max_length=100)

    image = models.URLField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return self.title