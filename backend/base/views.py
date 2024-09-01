from django.shortcuts import render
from django.http import JsonResponse
import requests
import datetime
import os


# Function to get current weather based on city name and temperature unit
def get_weather(city, unit='metric'):
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    api_key = os.getenv('WEATHER_API_KEY')
    parameters = {
        'q': city,
        'appid': api_key,
        'units': unit
    }
    response = requests.get(base_url, params=parameters, verify=False)
    if response.status_code == 200:
        return response.json()
    else:
        return None


# Function to get weather forecast for the next 3 days
# Function to get weather forecast for the next 3 days
def get_weather_forecast(city, unit='metric'):
    base_url = "https://api.openweathermap.org/data/2.5/forecast"
    api_key = os.getenv('WEATHER_API_KEY')
    parameters = {
        'q': city,
        'appid': api_key,
        'units': unit,
        'cnt': 24  # 3 days of data
    }
    response = requests.get(base_url, params=parameters, verify=False)  # Bypass SSL verification  # noqa: E501
    if response.status_code == 200:
        forecast_data = response.json()
        
        # Process the 3-day forecast
        forecast = {}
        for item in forecast_data['list']:
            forecast_date = datetime.datetime.strptime(item['dt_txt'], '%Y-%m-%d %H:%M:%S').date()
            
            if str(forecast_date) not in forecast and len(forecast) < 3:  # Use string format for the date  # noqa: E501
                forecast[str(forecast_date)] = {  # Convert date object to string # noqa: E501
                    'date': forecast_date.strftime('%A, %d %B %Y'),
                    'temp_min': item['main']['temp_min'],
                    'temp_max': item['main']['temp_max'],
                    'description': item['weather'][0]['description'],
                    'icon': f"https://openweathermap.org/img/wn/{item['weather'][0]['icon']}@2x.png"  # noqa: E501
                }
        
        return forecast
    else:
        return None


def weather_api(request):
    city = request.GET.get('city')
    unit = request.GET.get('unit', 'metric')
    weather_data = get_weather(city, unit)
    forecast_data = get_weather_forecast(city, unit)
    return JsonResponse({'weather': weather_data, 'forecast': forecast_data})


# home view for the root URL
def home(request):
    return render(request, 'index.html')