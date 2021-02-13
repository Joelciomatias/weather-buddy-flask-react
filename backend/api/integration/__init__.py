from .open_weather import WeatherApi
from api.config import WEATHER_API_KEY, WEATHER_API_URL

weather_api = WeatherApi(WEATHER_API_URL, WEATHER_API_KEY)