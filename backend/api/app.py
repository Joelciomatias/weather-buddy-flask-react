"""Main api module"""

from flask import Flask, request
from flask_cors import CORS, cross_origin

from api import cache
from api.config import last_searched_cities
from api.integration import weather_api

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


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
        
        city_wealth = response.json()
        cache.set(city_name, city_wealth)

    return city_wealth


@app.route('/weather', methods=["GET"])
def city_history():
    """Get list of n cached cities"""

    result = []
    max_number = last_searched_cities # default 5
    if request.args.get('max'):
        max_number = int(request.args.get('max'))

    items = list(cache.items())  # get all items from cache

    if len(items) and len(items) > max_number:
        inverted = list(reversed(items))
        items = inverted[:max_number]  # last n items from cache

    for item in items:  # list of tuples
        if item[1].get('id'):
            result.append(item[1]) 

    return {'history': result}
