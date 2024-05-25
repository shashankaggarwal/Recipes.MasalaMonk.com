from rest_framework import serializers
from .models import User, Recipe

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'ingredients', 'instructions', 'public', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def validate_title(self, value):
        if not value:
            raise serializers.ValidationError("Title is required.")
        return value

    def validate_description(self, value):
        if not value:
            raise serializers.ValidationError("Description is required.")
        return value

    def validate_ingredients(self, value):
        if not value:
            raise serializers.ValidationError("Ingredients are required.")
        return value

    def validate_instructions(self, value):
        if not value:
            raise serializers.ValidationError("Instructions are required.")
        return value
