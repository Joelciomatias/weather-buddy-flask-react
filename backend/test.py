"Main testing module"

import unittest

import requests

from api import cache
from api.app import app, city_history, city_weather


class TestApi(unittest.TestCase):
    """Test all endpoints"""
    def setUp(self):
        self.app = app.test_client()

    def test_city_not_found(self):
        """
        Test a not found city and history is empty
        """

        cache.clear() # clear all object in cache

        data = 'xxxxxxxxxxxxxxxxxx'
        response = self.app.get(
            '/weather/'+data, headers={"Content-Type": "application/json"})
        result = response.json

        history_response = self.app.get(
            '/weather', headers={"Content-Type": "application/json"})
        history = history_response.json

        self.assertEqual(result.get('id'), None)  # check if the id exists
        # check if there are cached cities
        self.assertEqual(len(history.get('history')), 0)

        self.assertEqual(200, response.status_code)
        self.assertEqual(200, history_response.status_code)

    def test_city_weather(self):
        """
        Test that it can return a city
        """
        data = 'curitiba'
        response = self.app.get(
            '/weather/'+data, headers={"Content-Type": "application/json"})
        result = response.json

        # check if the id is same of requested city
        self.assertEqual(result['id'], 6322752)
        self.assertEqual(200, response.status_code)

    def test_city_history(self):
        """
        Test if the city is cached!
        """
        data = 'curitiba'
        city_weather(data)  # put a city in cache

        response = self.app.get(
            '/weather', headers={"Content-Type": "application/json"})
        result = response.json
        # check if there are object in cache
        self.assertEqual(result['history'][0]['id'], 6322752)
        self.assertEqual(200, response.status_code)


if __name__ == '__main__':
    unittest.main()
