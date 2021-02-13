from api.integration import weather_api
from api.app import app

res = weather_api.search_city('curitiba')
print(res)


if __name__ == '__main__':
    app.run()