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

from .models import Session

from .serializers import (
    SessionSerializer
)


# GET ALL SESSIONS
# PAGINATION + SEARCH + FILTER

@api_view(['GET'])
def get_sessions(request):

    sessions = Session.objects.all().order_by(
        '-created_at'
    )

    # SEARCH

    search = request.GET.get(
        'search'
    )

    if search:

        sessions = sessions.filter(
            title__icontains=search
        )

    # CATEGORY FILTER

    category = request.GET.get(
        'category'
    )

    if category:

        sessions = sessions.filter(
            category=category
        )

    # PAGINATION

    paginator = Paginator(
        sessions,
        6
    )

    page_number = request.GET.get(
        'page',
        1
    )

    page_obj = paginator.get_page(
        page_number
    )

    serializer = SessionSerializer(
        page_obj,
        many=True
    )

    return Response({

        "sessions":
        serializer.data,

        "has_next":
        page_obj.has_next(),

        "total_pages":
        paginator.num_pages,

        "current_page":
        page_obj.number,
    })


# CREATE SESSION

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_session(request):

    serializer = SessionSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            creator=request.user
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# GET SINGLE SESSION

@api_view(['GET'])
def get_single_session(request, pk):

    try:

        session = Session.objects.get(
            id=pk
        )

    except Session.DoesNotExist:

        return Response(
            {
                "error":
                "Session not found"
            },
            status=404
        )

    serializer = SessionSerializer(
        session
    )

    return Response(serializer.data)


# DELETE SESSION

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_session(request, pk):

    try:

        session = Session.objects.get(
            id=pk,
            creator=request.user
        )

    except Session.DoesNotExist:

        return Response(
            {
                "error":
                "Not found"
            },
            status=404
        )

    session.delete()

    return Response({
        "message":
        "Deleted successfully"
    })


# UPDATE SESSION

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_session(request, pk):

    try:

        session = Session.objects.get(
            id=pk,
            creator=request.user
        )

    except Session.DoesNotExist:

        return Response(
            {
                "error":
                "Session not found"
            },
            status=404
        )

    serializer = SessionSerializer(
        session,
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data
        )

    return Response(
        serializer.errors,
        status=400
    )


# CREATOR MY SESSIONS

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_sessions(request):

    sessions = Session.objects.filter(
        creator=request.user
    ).order_by('-created_at')

    paginator = Paginator(
        sessions,
        6
    )

    page_number = request.GET.get(
        'page',
        1
    )

    page_obj = paginator.get_page(
        page_number
    )

    serializer = SessionSerializer(
        page_obj,
        many=True
    )

    return Response({

        "sessions":
        serializer.data,

        "has_next":
        page_obj.has_next(),

        "total_pages":
        paginator.num_pages,

        "current_page":
        page_obj.number,
    })