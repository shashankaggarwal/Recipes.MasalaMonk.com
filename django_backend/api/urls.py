from django.urls import path
from .views import register_user, login_user, recipes_list, recipe_detail

urlpatterns = [
    path('register/', register_user),
    path('login/', login_user),
    path('recipes/', recipes_list),
    path('recipes/<int:pk>/', recipe_detail),
]
# test