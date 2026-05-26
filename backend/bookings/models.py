from django.db import models

from django.contrib.auth import get_user_model

from sessions.models import Session

User = get_user_model()


class Booking(models.Model):

    STATUS_CHOICES = [
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    booked_at = models.DateTimeField(
        auto_now_add=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="confirmed"
    )

    class Meta:

        ordering = ['-booked_at']

        unique_together = ['user', 'session']

    def __str__(self):

        return f"{self.user.username} booked {self.session.title}"