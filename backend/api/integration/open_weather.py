import requests

class WeatherApi(object):
    """"""
    
    def __init__(self, api_url, api_token):
        
        if not api_token or not api_url:
            raise ValueError('Api data is needed!')
        
        self._api_token = api_token
        self._api_url = api_url
    
    def search_city(self, query):

        headers = {
            'Accept': 'application/json; charset=UTF-8'
        }

        params=[('q', query),
            ('appid', self._api_token)]

        try:
            r = requests.get(url=self._api_url, headers=headers, params=params)
            print(r)
            return r.content

        except Exception as ex:
            print("eRROR!",ex)

