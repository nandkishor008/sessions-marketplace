from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLE_CHOICES = (
        ('user', 'User'),
        ('creator', 'Creator'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='user'
    )

    bio = models.TextField(blank=True, null=True)

    profile_picture = models.ImageField(
        upload_to='profiles/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username