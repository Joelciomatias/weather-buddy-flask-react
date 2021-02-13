from cacheout import Cache
from flask import Flask, jsonify, request

from api.integration import weather_api

app = Flask(__name__)

cache = Cache(maxsize=1000, ttl=5 * 60) # 5 minutes cache


@app.route('/weather/<city_name>', methods=["GET"])
def get_city_weather(city_name):

    city_wealth = None

    if city_name in cache:
        city_wealth = cache.get(city_name)
        print('used cache!')
    else:
        city_wealth = weather_api.search_city(city_name)
        cache.set(city_name, city_wealth)

    return city_wealth


@app.route('/weather', methods=["GET"])
def get_city_history():

    result = {}
    max_number = 5
    if request.args.get('max'):
        max_number = int(request.args.get('max'))

    items = list(cache.items())  # get all items from cache

    if len(items) and len(items) <= max_number:
        result = items
    elif len(items) > max_number:
        inverted = list(reversed(items))
        result = inverted[:max_number]  # last n items from cache

    # items = dict(items)

    return dict(result)
