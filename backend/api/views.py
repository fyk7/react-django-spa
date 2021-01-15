from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from . import serializers
from .models import Profile, FinancialNews


class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny,)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(userProfile=self.request.user)


class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def get_queryset(self):
        return self.queryset.filter(userProfile=self.request.user)


# TODO memcacheを用いて配信する。
# TODO article_timestamp or createdがある時刻以降のニュースに絞る
class NewsListView(generics.ListAPIView):
    queryset = FinancialNews.objects.all()
    serializer_class = NewsSerializer

    def get_queryset(self):
        queryset = FinancialNews.objects.filter()
        return queryset
