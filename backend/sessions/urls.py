from django.urls import path

from .views import *

urlpatterns = [

    path(
        '',
        get_sessions,
        name='get_sessions'
    ),

    path(
        'my-sessions/',
        my_sessions,
        name='my_sessions'
    ),

    path(
        'create/',
        create_session,
        name='create_session'
    ),

    path(
        '<int:pk>/',
        get_single_session,
        name='get_single_session'
    ),

    path(
        'update/<int:pk>/',
        update_session,
        name='update_session'
    ),

    path(
        'delete/<int:pk>/',
        delete_session,
        name='delete_session'
    ),
]