"""Integration with Open Weather api module"""
import requests


class WeatherApi(object):
    """Main class, manages and delivery a method for a city"""

    def __init__(self, api_url, api_token):

        if not api_token or not api_url:
            raise ValueError('Api data is needed!')

        self._api_token = api_token
        self._api_url = api_url

    def search_city(self, query):
        """Search in weather api api, by requested city"""
        headers = {
            'Accept': 'application/json; charset=UTF-8'
        }

        params = [('q', query),
                  ('units', 'metric'),  # celsius
                  ('appid', self._api_token),
                  ]

        try:
            return requests.get(url=self._api_url, headers=headers, params=params)

        except Exception as ex:
            print("An error ocurred in search city :", query, ex)
