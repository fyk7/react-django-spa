from django.contrib.auth import get_user_model
from rest_framework import serializers, generics
from .models import Profile, FinancialNews


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password')
        # passwordは書き込み専用(DBから読み出すことはできない)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'nickName', 'userProfile', 'created_on', 'img')
        extra_kwargs = {'userProfile': {'read_only': True}}


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialNews
        fields = ('id', 'publisher', 'title', 'detail',
                  'detail_url', 'article_timestamp')
