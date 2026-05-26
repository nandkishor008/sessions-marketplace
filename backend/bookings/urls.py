from django.urls import path

from .views import *

urlpatterns = [

    path(
        'create/<int:session_id>/',
        create_booking,
        name='create_booking'
    ),

    path(
        'my-bookings/',
        my_bookings,
        name='my_bookings'
    ),

    path(
        'creator-bookings/',
        creator_bookings,
        name='creator_bookings'
    ),

    path(
        'cancel/<int:booking_id>/',
        cancel_booking,
        name='cancel_booking'
    ),

    path(
        'creator-stats/',
        creator_stats,
        name='creator_stats'
    ),
    path(
    'creator-bookings/',
    creator_bookings,
    name='creator_bookings'
),
]