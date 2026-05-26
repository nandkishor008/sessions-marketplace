from django.core.paginator import Paginator

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import (
    Response
)

from rest_framework import status

from .models import Booking

from .serializers import (
    BookingSerializer
)

from sessions.models import Session


# CREATE BOOKING

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request, session_id):

    try:

        session = Session.objects.get(
            id=session_id
        )

    except Session.DoesNotExist:

        return Response(
            {
                "error":
                "Session not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    # PREVENT CREATOR FROM BOOKING OWN SESSION

    if session.creator == request.user:

        return Response(
            {
                "error":
                "Creators cannot book their own sessions"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # PREVENT DUPLICATE BOOKINGS

    existing_booking = (
        Booking.objects.filter(
            user=request.user,
            session=session
        ).first()
    )

    if existing_booking:

        return Response(
            {
                "error":
                "You already booked this session"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    booking = Booking.objects.create(
        user=request.user,
        session=session
    )

    serializer = BookingSerializer(
        booking
    )

    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED
    )


# USER BOOKINGS

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_bookings(request):

    bookings = Booking.objects.filter(
        user=request.user
    ).order_by('-booked_at')

    paginator = Paginator(
        bookings,
        10
    )

    page_number = request.GET.get(
        'page',
        1
    )

    page_obj = paginator.get_page(
        page_number
    )

    serializer = BookingSerializer(
        page_obj,
        many=True
    )

    return Response({

        "bookings":
        serializer.data,

        "has_next":
        page_obj.has_next(),

        "total_pages":
        paginator.num_pages,

        "current_page":
        page_obj.number,
    })


# CREATOR BOOKINGS
# GROUPED SESSION-WISE
# TABLE FRIENDLY
# PAGINATION READY

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def creator_bookings(request):

    sessions = Session.objects.filter(
        creator=request.user
    )

    result = []

    for session in sessions:

        bookings = Booking.objects.filter(
            session=session
        ).order_by('-booked_at')

        paginator = Paginator(
            bookings,
            5
        )

        page_number = request.GET.get(
            f'page_{session.id}',
            1
        )

        page_obj = paginator.get_page(
            page_number
        )

        serializer = BookingSerializer(
            page_obj,
            many=True
        )

        result.append({

            "session_id":
                session.id,

            "session_title":
                session.title,

            "session_image":
                session.image,

            "session_price":
                session.price,

            "total_bookings":
                bookings.count(),

            "total_earnings":
                sum(

                    booking.session.price

                    for booking in bookings.filter(
                        status="confirmed"
                    )
                ),

            "bookings":
                serializer.data,

            "has_next":
                page_obj.has_next(),

            "total_pages":
                paginator.num_pages,

            "current_page":
                page_obj.number,
        })

    return Response(result)


# CANCEL BOOKING

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cancel_booking(request, booking_id):

    try:

        booking = Booking.objects.get(
            id=booking_id,
            user=request.user
        )

    except Booking.DoesNotExist:

        return Response(
            {
                "error":
                "Booking not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    booking.status = "cancelled"

    booking.save()

    return Response(
        {
            "message":
            "Booking cancelled successfully"
        },
        status=status.HTTP_200_OK
    )


# CREATOR DASHBOARD STATS

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def creator_stats(request):

    total_sessions = (
        Session.objects.filter(
            creator=request.user
        ).count()
    )

    total_students = (
        Booking.objects.filter(
            session__creator=request.user
        )
        .values('user')
        .distinct()
        .count()
    )

    total_bookings = (
        Booking.objects.filter(
            session__creator=request.user
        ).count()
    )

    total_earnings = sum(

        booking.session.price

        for booking in Booking.objects.filter(
            session__creator=request.user,
            status="confirmed"
        )
    )

    recent_bookings = Booking.objects.filter(
        session__creator=request.user
    ).order_by('-booked_at')[:5]

    recent_serializer = BookingSerializer(
        recent_bookings,
        many=True
    )

    return Response({

        "name":
        request.user.username,

        "role":
        request.user.role,

        "total_sessions":
        total_sessions,

        "total_students":
        total_students,

        "total_bookings":
        total_bookings,

        "total_earnings":
        total_earnings,

        "recent_bookings":
        recent_serializer.data,
    })