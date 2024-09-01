from django.urls import path
from . import views

urlpatterns = [
    path('api/weather/', views.weather_api, name='weather_api'),  # Existing API route
    path('', views.home, name='home'),  # New root URL route
]
