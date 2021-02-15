"""Main api module"""
from cacheout import Cache
from flask import Flask, request
from flask_cors import CORS, cross_origin

from api.integration import weather_api

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cache = Cache(maxsize=1000, ttl=5 * 60)  # 5 minutes cache


@app.route('/')
def hello_world():
    return 'This is a weather api'


@app.route('/weather/<city_name>', methods=["GET"])
def city_weather(city_name):
    """Get the city wealth object by city name"""
    city_wealth = None

    if city_name in cache:
        city_wealth = cache.get(city_name)

    if city_wealth is None:
        response = weather_api.search_city(city_name)
        if response.status_code == 404:
            return response.json()

        city_wealth = response.json()
        cache.set(city_name, city_wealth)

    return city_wealth


@app.route('/weather', methods=["GET"])
def city_history():
    """Get list of n cached cities"""

    result = []
    max_number = 5
    if request.args.get('max'):
        max_number = int(request.args.get('max'))

    items = list(cache.items())  # get all items from cache

    if len(items) and len(items) > max_number:
        inverted = list(reversed(items))
        items = inverted[:max_number]  # last n items from cache

    for item in items:  # list of tuples
        result.append(item[1])

    return {'history': result}
